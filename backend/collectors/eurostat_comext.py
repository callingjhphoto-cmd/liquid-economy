"""Eurostat Comext API collector — EU trade data by HS code."""

import logging
from datetime import date
import httpx
from sqlalchemy.orm import Session
from database.models import TradeData
from .base import BaseCollector

logger = logging.getLogger(__name__)

# HS codes relevant to beverage alcohol (EU classifications)
HS_CODES = {
    "2203": "Beer made from malt",
    "2204": "Wine of fresh grapes",
    "2206": "Other fermented beverages (cider, mead)",
    "2208": "Spirits, liqueurs and other spirituous beverages",
    "2202": "Waters (including mineral and aerated waters)",
}

# Eurostat Comext API endpoint
EUROSTAT_API = "https://ec.europa.eu/eurostat/api/dissemination/statistics/1.0/data/DS-045409"


class EurostatComextCollector(BaseCollector):
    name = "eurostat_comext"

    async def collect(self):
        """Pull monthly import/export data for beverage alcohol HS codes from Eurostat."""
        today = date.today()
        year = today.year
        month = today.month

        # Get last 3 months to catch revisions
        periods = []
        for offset in range(3):
            m = month - offset
            y = year
            if m <= 0:
                m += 12
                y -= 1
            periods.append(f"{y}{m:02d}")

        async with httpx.AsyncClient(timeout=60) as client:
            for hs_code, description in HS_CODES.items():
                for period in periods:
                    try:
                        await self._fetch_trade(client, hs_code, description, period)
                    except Exception as e:
                        logger.warning(f"Failed {hs_code} for {period}: {e}")

    async def _fetch_trade(self, client, hs_code, description, period):
        """Fetch trade data for a single HS code and period."""
        # Eurostat Comext API parameters
        params = {
            "HS_CODE": hs_code,
            "TIME_PERIOD": period,
            "FLOW": "X",  # Export and import both fetched separately
            "format": "JSON",
        }

        try:
            # Fetch imports
            params["FLOW"] = "I"
            resp = await client.get(EUROSTAT_API, params=params)
            if resp.status_code == 200:
                data = resp.json()
                await self._process_response(data, hs_code, description, period, "import")

            # Fetch exports
            params["FLOW"] = "X"
            resp = await client.get(EUROSTAT_API, params=params)
            if resp.status_code == 200:
                data = resp.json()
                await self._process_response(data, hs_code, description, period, "export")

        except httpx.HTTPError as e:
            logger.debug(f"Eurostat API error for {hs_code}/{period}: {e}")

    async def _process_response(self, data, hs_code, description, period, flow):
        """Process Eurostat API response and store trade records."""
        period_formatted = f"{period[:4]}-{period[4:]}"

        # Parse Eurostat JSON structure
        try:
            records = data.get("value", {})
            dimensions = data.get("dimension", {})

            if not records or not dimensions:
                return

            # Iterate through records
            for record_key, value in records.items():
                if value is None:
                    continue

                try:
                    value_float = float(value)
                except (TypeError, ValueError):
                    continue

                # Extract country info from dimensions if available
                reporter = "European Union"
                partner = "World"

                existing = (
                    self.session.query(TradeData)
                    .filter(
                        TradeData.source == "Eurostat",
                        TradeData.hs_code == hs_code,
                        TradeData.reporter_country == reporter,
                        TradeData.partner_country == partner,
                        TradeData.period == period_formatted,
                        TradeData.flow == flow,
                    )
                    .first()
                )

                if existing:
                    if existing.value_usd != value_float:
                        existing.value_usd = value_float
                        self.records_updated += 1
                else:
                    self.session.add(TradeData(
                        source="Eurostat",
                        hs_code=hs_code,
                        hs_description=description,
                        reporter_country=reporter,
                        partner_country=partner,
                        period=period_formatted,
                        flow=flow,
                        value_usd=value_float,
                        quantity=None,
                        quantity_unit="EUR",
                    ))
                    self.records_added += 1

        except Exception as e:
            logger.debug(f"Error processing Eurostat response for {hs_code}/{period}: {e}")

        logger.info(f"  HS {hs_code} ({flow}) {period_formatted}: processed")
