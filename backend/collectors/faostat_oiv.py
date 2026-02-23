"""FAOSTAT/OIV collector — Agricultural production data."""

import logging
from datetime import date
import httpx
from sqlalchemy.orm import Session
from database.models import Indicator
from .base import BaseCollector

logger = logging.getLogger(__name__)

# FAOSTAT API endpoint for production data
FAOSTAT_API = "https://fenixservices.fao.org/faostat/api/v1/en/data/QCL"

# Items: grape, barley, sugarcane production
# Item codes: Grapes (561), Barley (52), Sugarcane (156)
ITEMS = {
    "561": "Grapes",
    "52": "Barley",
    "156": "Sugarcane",
}


class FAOSTATCollector(BaseCollector):
    name = "faostat_oiv"

    async def collect(self):
        """Fetch annual production data for key agricultural inputs."""
        today = date.today()
        year = today.year

        async with httpx.AsyncClient(timeout=30) as client:
            for item_code, item_name in ITEMS.items():
                try:
                    await self._fetch_production(client, item_code, item_name, year)
                except Exception as e:
                    logger.warning(f"Failed to fetch {item_name} production: {e}")

    async def _fetch_production(self, client, item_code: str, item_name: str, year: int):
        """Fetch production data for a single item."""
        params = {
            "format": "json",
            "Item": item_code,
            "Element": "5510",  # Production (tonnes)
            "Year": f"{year-1},{year}",  # Last 2 years
        }

        try:
            resp = await client.get(FAOSTAT_API, params=params)
            resp.raise_for_status()
            data = resp.json()

            records = data.get("data", [])
            if not records:
                logger.debug(f"No production data for {item_name}")
                return

            for record in records:
                try:
                    period_year = record.get("Year")
                    period = str(period_year)
                    value = record.get("Value")

                    if value is None:
                        continue

                    value = float(value)

                    series_id = f"FAOSTAT_{item_code}"
                    series_name = f"{item_name} Production (Global)"

                    existing = (
                        self.session.query(Indicator)
                        .filter(
                            Indicator.source == "FAOSTAT",
                            Indicator.series_id == series_id,
                            Indicator.period == period,
                        )
                        .first()
                    )

                    if existing:
                        if existing.value != value:
                            existing.value = value
                            self.records_updated += 1
                    else:
                        self.session.add(Indicator(
                            source="FAOSTAT",
                            series_id=series_id,
                            series_name=series_name,
                            period=period,
                            value=value,
                            unit="million tonnes",
                        ))
                        self.records_added += 1

                except (TypeError, ValueError) as e:
                    logger.debug(f"Failed to parse record for {item_name}: {e}")
                    continue

            logger.info(f"  {item_name}: processed production data")

        except httpx.HTTPError as e:
            logger.warning(f"FAOSTAT API error for {item_name}: {e}")
