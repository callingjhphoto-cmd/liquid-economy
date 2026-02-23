"""USITC DataWeb collector — monthly trade data by HS code."""

import logging
from datetime import date
import httpx
from sqlalchemy.orm import Session
from database.models import TradeData, Alert
from .base import BaseCollector

logger = logging.getLogger(__name__)

# HS codes relevant to beverage alcohol
HS_CODES = {
    "2203": "Beer made from malt",
    "2204": "Wine of fresh grapes",
    "220410": "Sparkling wine",
    "220421": "Wine in containers ≤2L",
    "2205": "Vermouth and flavoured wine",
    "2206": "Other fermented beverages (cider, mead)",
    "2207": "Ethyl alcohol (undenatured, ≥80%)",
    "2208": "Spirits, liqueurs and other spirituous beverages",
    "220830": "Whiskies",
    "220840": "Rum and other spirits from cane",
    "220850": "Gin and Geneva",
    "220860": "Vodka",
    "220870": "Liqueurs and cordials",
    "220890": "Other spirits (tequila, brandy, etc.)",
}

# USITC API endpoint
USITC_API = "https://dataweb.usitc.gov/api/data"


class USITCCollector(BaseCollector):
    name = "usitc"

    async def collect(self):
        """Pull monthly import/export data for beverage alcohol HS codes."""
        # Determine the period to fetch (last 3 months to catch revisions)
        today = date.today()
        year = today.year
        months = []
        for offset in range(3):
            m = today.month - offset
            y = year
            if m <= 0:
                m += 12
                y -= 1
            months.append(f"{y}{m:02d}")

        async with httpx.AsyncClient(timeout=60) as client:
            for hs_code, description in HS_CODES.items():
                for period in months:
                    try:
                        await self._fetch_trade(client, hs_code, description, period)
                    except Exception as e:
                        logger.warning(f"Failed {hs_code} for {period}: {e}")

    async def _fetch_trade(self, client, hs_code, description, period):
        """Fetch trade data for a single HS code and period."""
        # USITC API parameters
        params = {
            "classification": "HTS",
            "commodity": hs_code,
            "startperiod": period,
            "endperiod": period,
            "tradeflow": "IMP",  # Imports
            "country": "ALL",
            "format": "json",
        }

        try:
            resp = await client.get(USITC_API, params=params)

            if resp.status_code == 200:
                data = resp.json()
                await self._process_response(data, hs_code, description, period, "import")

            # Also fetch exports
            params["tradeflow"] = "EXP"
            resp = await client.get(USITC_API, params=params)

            if resp.status_code == 200:
                data = resp.json()
                await self._process_response(data, hs_code, description, period, "export")

        except httpx.HTTPError as e:
            # Graceful fallback — API may require auth for some queries
            logger.debug(f"USITC API returned error for {hs_code}/{period}: {e}")

    async def _process_response(self, data, hs_code, description, period, flow):
        """Process USITC API response and store trade records."""
        period_formatted = f"{period[:4]}-{period[4:]}"

        records = data if isinstance(data, list) else data.get("data", data.get("results", []))

        if not isinstance(records, list):
            return

        for record in records:
            partner = record.get("partner", record.get("country", "World"))
            value = record.get("value", record.get("customs_value"))
            qty = record.get("quantity", record.get("qty"))

            if value is None:
                continue

            try:
                value = float(value)
            except (TypeError, ValueError):
                continue

            try:
                qty = float(qty) if qty else None
            except (TypeError, ValueError):
                qty = None

            existing = (
                self.session.query(TradeData)
                .filter(
                    TradeData.source == "USITC",
                    TradeData.hs_code == hs_code,
                    TradeData.reporter_country == "United States",
                    TradeData.partner_country == partner,
                    TradeData.period == period_formatted,
                    TradeData.flow == flow,
                )
                .first()
            )

            if existing:
                if existing.value_usd != value:
                    existing.value_usd = value
                    existing.quantity = qty
                    self.records_updated += 1
            else:
                self.session.add(TradeData(
                    source="USITC",
                    hs_code=hs_code,
                    hs_description=description,
                    reporter_country="United States",
                    partner_country=partner,
                    period=period_formatted,
                    flow=flow,
                    value_usd=value,
                    quantity=qty,
                    quantity_unit="litres",
                ))
                self.records_added += 1

        logger.info(f"  HS {hs_code} ({flow}) {period_formatted}: processed")
