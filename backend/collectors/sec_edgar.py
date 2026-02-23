"""SEC EDGAR collector — monitor filings for tracked public companies."""

import logging
from datetime import date, datetime, timedelta
import httpx
from sqlalchemy.orm import Session
from database.models import Company, Filing, Alert
from .base import BaseCollector

logger = logging.getLogger(__name__)

EDGAR_BASE = "https://efts.sec.gov/LATEST/search-index"
EDGAR_SUBMISSIONS = "https://data.sec.gov/submissions"

# CIK numbers for our US-listed companies (SEC uses CIK, not ticker)
COMPANY_CIKS = {
    "Constellation Brands": "0000016918",
    "Brown-Forman": "0000014693",
    "Molson Coors": "0000024545",
    "MGP Ingredients": "0000803649",
}

# For ADR/foreign filers
COMPANY_CIKS_FOREIGN = {
    "Diageo": "0001004258",      # Diageo plc (SEC filer via ADR)
    "AB InBev": "0001668717",    # Anheuser-Busch InBev SA/NV
}

# Filing types we care about
RELEVANT_FILINGS = {
    "10-K", "10-Q", "8-K", "6-K",  # Annual, quarterly, current events, foreign
    "20-F", "SC 13D", "SC 13G",    # Foreign annual, ownership stakes
    "DEF 14A", "DEFA14A",           # Proxy statements
}


class SECEdgarCollector(BaseCollector):
    name = "sec_edgar"

    def __init__(self, session: Session, user_agent: str = ""):
        super().__init__(session)
        self.user_agent = user_agent or "Palmer Liquid Studios james@huertas.co.uk"
        self.headers = {
            "User-Agent": self.user_agent,
            "Accept": "application/json",
        }

    async def collect(self):
        """Pull recent filings for all tracked US-listed companies."""
        all_ciks = {**COMPANY_CIKS, **COMPANY_CIKS_FOREIGN}
        companies = {c.name: c.id for c in self.session.query(Company).all()}

        async with httpx.AsyncClient(timeout=30, headers=self.headers) as client:
            for company_name, cik in all_ciks.items():
                if company_name not in companies:
                    continue

                try:
                    await self._collect_company(
                        client, company_name, companies[company_name], cik
                    )
                except Exception as e:
                    logger.warning(f"Failed to collect {company_name}: {e}")
                    continue

    async def _collect_company(self, client, company_name, company_id, cik):
        """Fetch recent filings for a single company."""
        # Use the submissions endpoint (no rate limit issues, JSON format)
        url = f"{EDGAR_SUBMISSIONS}/CIK{cik}.json"

        resp = await client.get(url)
        resp.raise_for_status()
        data = resp.json()

        recent = data.get("filings", {}).get("recent", {})
        forms = recent.get("form", [])
        dates = recent.get("filingDate", [])
        descriptions = recent.get("primaryDocDescription", [])
        accessions = recent.get("accessionNumber", [])
        primary_docs = recent.get("primaryDocument", [])

        # Only look at filings from last 90 days
        cutoff = (date.today() - timedelta(days=90)).isoformat()

        for i in range(min(len(forms), 50)):  # Cap at 50 recent filings
            form_type = forms[i]
            filing_date_str = dates[i]

            if filing_date_str < cutoff:
                break  # Sorted newest first; stop once we're past cutoff

            if form_type not in RELEVANT_FILINGS:
                continue

            filing_date = date.fromisoformat(filing_date_str)
            title = descriptions[i] if i < len(descriptions) else form_type
            accession = accessions[i].replace("-", "") if i < len(accessions) else ""
            doc = primary_docs[i] if i < len(primary_docs) else ""

            filing_url = (
                f"https://www.sec.gov/Archives/edgar/data/{cik}/{accession}/{doc}"
                if accession and doc else ""
            )

            # Check if already recorded
            existing = (
                self.session.query(Filing)
                .filter(
                    Filing.company_id == company_id,
                    Filing.source == "SEC",
                    Filing.filing_type == form_type,
                    Filing.filing_date == filing_date,
                )
                .first()
            )

            if not existing:
                self.session.add(Filing(
                    company_id=company_id,
                    source="SEC",
                    filing_type=form_type,
                    filing_date=filing_date,
                    title=f"{company_name} — {form_type}: {title}",
                    url=filing_url,
                ))
                self.records_added += 1

                # Generate alert for significant filings
                if form_type in ("10-K", "10-Q", "8-K", "20-F"):
                    self.session.add(Alert(
                        alert_type="new_filing",
                        severity="info" if form_type == "8-K" else "warning",
                        title=f"{company_name} filed {form_type}",
                        message=f"New {form_type} filing: {title}. Filed {filing_date_str}.",
                        data_source="sec_edgar",
                    ))

        logger.info(f"  {company_name} (CIK {cik}): checked")
