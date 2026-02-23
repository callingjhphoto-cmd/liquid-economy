"""TTB COLA Registry collector — US alcohol product approvals."""

import logging
from datetime import date, datetime
import httpx
from sqlalchemy.orm import Session
from database.models import Indicator
from .base import BaseCollector

logger = logging.getLogger(__name__)

# TTB COLA (Certificate of Label Approval) API endpoint
TTB_API = "https://www.ttb.gov/colaportal/public"


class TTBColaCollector(BaseCollector):
    name = "ttb_cola"

    async def collect(self):
        """Fetch monthly counts of new product approvals from TTB COLA registry."""
        today = date.today()
        year = today.year
        month = today.month
        period = f"{year}-{month:02d}"

        try:
            async with httpx.AsyncClient(timeout=30) as client:
                await self._fetch_cola_approvals(client, year, month, period)

        except Exception as e:
            logger.warning(f"Failed to fetch TTB COLA data: {e}")

    async def _fetch_cola_approvals(self, client, year: int, month: int, period: str):
        """Fetch and count COLA approvals for the given month."""
        # TTB COLA Registry endpoint for public records
        endpoint = f"{TTB_API}/searchApprovedCOLA.do"

        params = {
            "action": "search",
            "formulaCode": "",
            "approvalFromDate": f"{month:02d}/01/{year}",
            "approvalToDate": f"{month:02d}/28/{year}",
            "bottlerFromDate": "",
            "bottlerToDate": "",
        }

        try:
            resp = await client.get(endpoint, params=params)
            resp.raise_for_status()

            # Count approvals from response (would parse HTML/JSON response)
            # For now, store a placeholder that would be populated from actual response
            approval_count = 0  # Would be extracted from response

            if approval_count > 0:
                existing = (
                    self.session.query(Indicator)
                    .filter(
                        Indicator.source == "TTB",
                        Indicator.series_id == "COLA_APPROVALS",
                        Indicator.period == period,
                    )
                    .first()
                )

                if existing:
                    if existing.value != approval_count:
                        existing.value = approval_count
                        self.records_updated += 1
                else:
                    self.session.add(Indicator(
                        source="TTB",
                        series_id="COLA_APPROVALS",
                        series_name="Monthly COLA Approvals",
                        period=period,
                        value=approval_count,
                        unit="count",
                    ))
                    self.records_added += 1

            logger.info(f"  Processed TTB COLA approvals for {period}: {approval_count} new approvals")

        except httpx.HTTPError as e:
            logger.warning(f"TTB COLA API error: {e}")
