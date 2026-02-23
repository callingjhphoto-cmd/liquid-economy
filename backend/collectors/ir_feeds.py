"""IR RSS feeds collector — Company investor relations updates."""

import logging
from datetime import date, datetime
import feedparser
import httpx
from sqlalchemy.orm import Session
from database.models import Company, Filing
from .base import BaseCollector

logger = logging.getLogger(__name__)

# Tracked companies with IR RSS feed URLs
IR_FEEDS = {
    "Diageo": "https://www.diageo.com/en-gb/news-and-media/news/rss.xml",
    "LVMH": "https://www.lvmh.com/en/news-articles/lvmh-press-releases/rss/",
    "Pernod Ricard": "https://www.pernod-ricard.com/en/news-and-media/news-releases/rss",
    "Constellation Brands": "https://www.constellationbrands.com/api/news/feeds/rss",
    "Brown-Forman": "https://investors.brown-forman.com/news-releases",
    "AB InBev": "https://www.ab-inbev.com/en/news-and-media/news/rss.xml",
    "Heineken": "https://www.theheinekencompany.com/news-media/press-releases/rss",
}


class IRFeedsCollector(BaseCollector):
    name = "ir_feeds"

    async def collect(self):
        """Parse IR RSS feeds and store significant announcements as filings."""
        async with httpx.AsyncClient(timeout=30) as client:
            for company_name, feed_url in IR_FEEDS.items():
                try:
                    await self._fetch_feed(client, company_name, feed_url)
                except Exception as e:
                    logger.warning(f"Failed to fetch IR feed for {company_name}: {e}")

    async def _fetch_feed(self, client, company_name: str, feed_url: str):
        """Fetch and parse a single RSS feed."""
        # Get or create company record
        company = (
            self.session.query(Company)
            .filter(Company.name == company_name)
            .first()
        )

        if not company:
            company = Company(
                name=company_name,
                is_public=True,
            )
            self.session.add(company)
            self.session.flush()

        try:
            resp = await client.get(feed_url)
            resp.raise_for_status()

            # Parse RSS feed
            feed = feedparser.parse(resp.text)

            if not feed.entries:
                logger.debug(f"No entries in {company_name} feed")
                return

            for entry in feed.entries[:20]:  # Limit to last 20 entries
                try:
                    # Extract publish date
                    published = entry.get("published_parsed")
                    if published:
                        filing_date = date(published.tm_year, published.tm_mon, published.tm_mday)
                    else:
                        filing_date = date.today()

                    # Check if already exists
                    existing = (
                        self.session.query(Filing)
                        .filter(
                            Filing.company_id == company.id,
                            Filing.source == "IR_Feed",
                            Filing.filing_date == filing_date,
                            Filing.title == entry.get("title", ""),
                        )
                        .first()
                    )

                    if not existing:
                        self.session.add(Filing(
                            company_id=company.id,
                            source="IR_Feed",
                            filing_type="Press Release",
                            filing_date=filing_date,
                            title=entry.get("title", ""),
                            url=entry.get("link", ""),
                            summary=entry.get("summary", ""),
                        ))
                        self.records_added += 1

                except Exception as e:
                    logger.debug(f"Failed to process entry for {company_name}: {e}")
                    continue

            logger.info(f"  {company_name}: processed {len(feed.entries)} feed entries")

        except Exception as e:
            logger.warning(f"Failed to fetch IR feed for {company_name}: {e}")
