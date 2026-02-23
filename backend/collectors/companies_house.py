"""Companies House API collector — UK regulatory filings."""

import logging
from datetime import date
import httpx
from sqlalchemy.orm import Session
from database.models import Company, Filing
from .base import BaseCollector

logger = logging.getLogger(__name__)

# Tracked UK companies with Companies House numbers
TRACKED_COMPANIES = {
    "Diageo": "02437734",           # Main UK entity
    "Edrington": "00197845",        # Private company
    "William Grant & Sons": "00001547",  # Private company
}

COMPANIES_HOUSE_API = "https://api.companieshouse.gov.uk"


class CompaniesHouseCollector(BaseCollector):
    name = "companies_house"

    def __init__(self, session: Session, api_key: str = ""):
        super().__init__(session)
        self.api_key = api_key

    async def collect(self):
        """Fetch filing history for tracked UK companies."""
        if not self.api_key:
            logger.warning("Companies House API key not configured")
            return

        async with httpx.AsyncClient(auth=(self.api_key, ""), timeout=30) as client:
            for company_name, company_number in TRACKED_COMPANIES.items():
                try:
                    await self._fetch_company_filings(client, company_name, company_number)
                except Exception as e:
                    logger.warning(f"Failed to fetch filings for {company_name}: {e}")

    async def _fetch_company_filings(self, client, company_name: str, company_number: str):
        """Fetch filing history for a single company."""
        # Get or create company record
        company = (
            self.session.query(Company)
            .filter(Company.name == company_name)
            .first()
        )

        if not company:
            company = Company(
                name=company_name,
                is_public=False,
                hq_country="United Kingdom",
            )
            self.session.add(company)
            self.session.flush()

        # Fetch filings from Companies House API
        endpoint = f"{COMPANIES_HOUSE_API}/company/{company_number}/filing-history"
        params = {
            "items_per_page": 100,
            "category": "accounts",  # Focus on financial filings
        }

        try:
            resp = await client.get(endpoint, params=params)
            resp.raise_for_status()
            data = resp.json()

            for filing in data.get("items", []):
                filing_date_str = filing.get("date")
                if not filing_date_str:
                    continue

                filing_date = date.fromisoformat(filing_date_str)

                # Check if already exists
                existing = (
                    self.session.query(Filing)
                    .filter(
                        Filing.company_id == company.id,
                        Filing.source == "CompaniesHouse",
                        Filing.filing_date == filing_date,
                        Filing.filing_type == filing.get("type"),
                    )
                    .first()
                )

                if not existing:
                    self.session.add(Filing(
                        company_id=company.id,
                        source="CompaniesHouse",
                        filing_type=filing.get("type", "Unknown"),
                        filing_date=filing_date,
                        title=filing.get("description", ""),
                        url=f"https://beta.companieshouse.gov.uk{filing.get('links', {}).get('filing_history_document', {}).get('href', '')}",
                        summary=filing.get("description", ""),
                    ))
                    self.records_added += 1

            logger.info(f"  {company_name}: processed {len(data.get('items', []))} filings")

        except httpx.HTTPError as e:
            logger.warning(f"Companies House API error for {company_number}: {e}")
