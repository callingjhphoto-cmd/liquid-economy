"""OECD economic indicators collector."""

import logging
from datetime import date
import httpx
from sqlalchemy.orm import Session
from database.models import Indicator
from .base import BaseCollector

logger = logging.getLogger(__name__)

# OECD SDMX API endpoint
OECD_API = "https://sdmx.oecd.org/public/rest/data"

# OECD indicators for household expenditure and consumer confidence
DATASETS = {
    "SNA_TABLE1": "Household expenditure by function",
    "KEI": "Key economic indicators",
}


class OECDCollector(BaseCollector):
    name = "oecd"

    async def collect(self):
        """Fetch household expenditure and consumer confidence indicators from OECD."""
        today = date.today()
        year = today.year

        async with httpx.AsyncClient(timeout=30) as client:
            for dataset_code, dataset_name in DATASETS.items():
                try:
                    await self._fetch_dataset(client, dataset_code, dataset_name, year)
                except Exception as e:
                    logger.warning(f"Failed to fetch {dataset_name}: {e}")

    async def _fetch_dataset(self, client, dataset_code: str, dataset_name: str, year: int):
        """Fetch a single OECD dataset."""
        endpoint = f"{OECD_API}/{dataset_code}"

        # OECD SDMX filter parameters
        params = {
            "format": "json",
            "startTime": f"{year-2}",
            "endTime": f"{year}",
        }

        try:
            resp = await client.get(endpoint, params=params)
            resp.raise_for_status()
            data = resp.json()

            # Parse OECD SDMX JSON structure
            observations = data.get("data", {}).get("observations", {})
            if not observations:
                logger.debug(f"No data for {dataset_name}")
                return

            for obs_key, obs_value in observations.items():
                try:
                    # Extract value and period from observation
                    if isinstance(obs_value, list) and len(obs_value) > 0:
                        value = obs_value[0]
                    else:
                        value = obs_value

                    if value is None:
                        continue

                    value = float(value)

                    # Period extraction (OECD uses various formats)
                    period_parts = obs_key.split(":")
                    period = period_parts[-1] if period_parts else str(year)

                    series_id = f"OECD_{dataset_code}"
                    series_name = dataset_name

                    existing = (
                        self.session.query(Indicator)
                        .filter(
                            Indicator.source == "OECD",
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
                            source="OECD",
                            series_id=series_id,
                            series_name=series_name,
                            period=period,
                            value=value,
                            unit="Index or amount varies",
                        ))
                        self.records_added += 1

                except (TypeError, ValueError, IndexError) as e:
                    logger.debug(f"Failed to parse observation for {dataset_name}: {e}")
                    continue

            logger.info(f"  {dataset_name}: processed data")

        except httpx.HTTPError as e:
            logger.warning(f"OECD API error for {dataset_name}: {e}")
