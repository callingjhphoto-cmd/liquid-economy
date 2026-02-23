"""WHO Global Health Observatory collector — Alcohol consumption data."""

import logging
from datetime import date
import httpx
from sqlalchemy.orm import Session
from database.models import Indicator
from .base import BaseCollector

logger = logging.getLogger(__name__)

# WHO GHO API endpoint
WHO_API = "https://ghoapi.azureedge.net/api"

# WHO indicators for alcohol consumption
INDICATORS = {
    "SA_0000001688": "Total Alcohol Consumption Per Capita",
    "SA_0000001687": "Recorded Alcohol Consumption Per Capita",
    "SA_0000001686": "Unrecorded Alcohol Consumption Per Capita",
}


class WHOGHOCollector(BaseCollector):
    name = "who_gho"

    async def collect(self):
        """Fetch alcohol consumption per capita indicators from WHO GHO."""
        today = date.today()
        year = today.year

        async with httpx.AsyncClient(timeout=30) as client:
            for indicator_code, indicator_name in INDICATORS.items():
                try:
                    await self._fetch_indicator(client, indicator_code, indicator_name, year)
                except Exception as e:
                    logger.warning(f"Failed to fetch {indicator_name}: {e}")

    async def _fetch_indicator(self, client, indicator_code: str, indicator_name: str, year: int):
        """Fetch a single WHO indicator."""
        endpoint = f"{WHO_API}/Indicator/{indicator_code}"

        try:
            resp = await client.get(endpoint)
            resp.raise_for_status()
            data = resp.json()

            records = data.get("value", [])
            if not records:
                logger.debug(f"No data for {indicator_name}")
                return

            for record in records:
                try:
                    period = record.get("Year")
                    if not period:
                        continue

                    value = record.get("Value")
                    if value is None:
                        continue

                    value = float(value)
                    period_str = str(period)

                    series_id = f"WHO_{indicator_code}"

                    existing = (
                        self.session.query(Indicator)
                        .filter(
                            Indicator.source == "WHO",
                            Indicator.series_id == series_id,
                            Indicator.period == period_str,
                        )
                        .first()
                    )

                    if existing:
                        if existing.value != value:
                            existing.value = value
                            self.records_updated += 1
                    else:
                        self.session.add(Indicator(
                            source="WHO",
                            series_id=series_id,
                            series_name=indicator_name,
                            period=period_str,
                            value=value,
                            unit="litres per capita",
                        ))
                        self.records_added += 1

                except (TypeError, ValueError) as e:
                    logger.debug(f"Failed to parse record for {indicator_name}: {e}")
                    continue

            logger.info(f"  {indicator_name}: processed data")

        except httpx.HTTPError as e:
            logger.warning(f"WHO GHO API error for {indicator_name}: {e}")
