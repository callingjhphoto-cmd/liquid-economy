"""BLS PPI collector — Glass and beverage input cost indices."""

import logging
from datetime import date
import httpx
from sqlalchemy.orm import Session
from database.models import Indicator, Alert
from .base import BaseCollector

logger = logging.getLogger(__name__)

# BLS Series IDs for relevant PPIs
SERIES = {
    # Glass Container Manufacturing (NAICS 327213)
    "PCU327213327213": "Glass Container Manufacturing PPI",
    # Malt beverages (NAICS 312120)
    "PCU312120312120": "Malt Beverage Manufacturing PPI",
    # Distilleries (NAICS 312140)
    "PCU312140312140": "Distillery Products PPI",
    # Wineries (NAICS 312130)
    "PCU312130312130": "Winery Products PPI",
    # Aluminum (for cans — NAICS 331315)
    "PCU331315331315": "Aluminum Sheet/Strip PPI",
    # Barley (WPU01230101)
    "WPU01230101": "Barley PPI",
}

BLS_API_URL = "https://api.bls.gov/publicAPI/v2/timeseries/data/"

# Alert thresholds (% change month-over-month)
MOM_ALERT_THRESHOLD = 0.03  # 3% MoM change


class BLSPPICollector(BaseCollector):
    name = "bls_ppi"

    def __init__(self, session: Session, api_key: str = ""):
        super().__init__(session)
        self.api_key = api_key

    async def collect(self):
        """Pull latest PPI data for glass, spirits, wine, beer inputs."""
        series_ids = list(SERIES.keys())

        payload = {
            "seriesid": series_ids,
            "startyear": "2024",
            "endyear": "2026",
            "calculations": True,
        }

        if self.api_key:
            payload["registrationkey"] = self.api_key

        async with httpx.AsyncClient(timeout=30) as client:
            resp = await client.post(BLS_API_URL, json=payload)
            resp.raise_for_status()
            data = resp.json()

        if data.get("status") != "REQUEST_SUCCEEDED":
            raise ValueError(f"BLS API error: {data.get('message', 'Unknown error')}")

        for series in data.get("Results", {}).get("series", []):
            series_id = series["seriesID"]
            series_name = SERIES.get(series_id, series_id)

            for point in series.get("data", []):
                year = point["year"]
                period = point["period"]  # M01-M12

                if not period.startswith("M"):
                    continue  # Skip annual averages

                month = int(period[1:])
                period_str = f"{year}-{month:02d}"
                value = float(point["value"])

                # Check if exists
                existing = (
                    self.session.query(Indicator)
                    .filter(
                        Indicator.source == "BLS",
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
                        source="BLS",
                        series_id=series_id,
                        series_name=series_name,
                        period=period_str,
                        value=value,
                        unit="Index (base 100)",
                    ))
                    self.records_added += 1

                # Check for MoM alerts using BLS calculations
                pct_changes = point.get("calculations", {}).get("pct_changes", {})
                mom = pct_changes.get("1")
                if mom is not None:
                    mom_pct = float(mom) / 100
                    if abs(mom_pct) >= MOM_ALERT_THRESHOLD:
                        direction = "up" if mom_pct > 0 else "down"
                        self.session.add(Alert(
                            alert_type="ppi_move",
                            severity="warning",
                            title=f"{series_name} {direction} {abs(mom_pct)*100:.1f}% MoM",
                            message=f"{series_name} moved {mom}% month-over-month in {period_str}. Index value: {value}.",
                            data_source="bls_ppi",
                        ))

            logger.info(f"  Processed {series_name} ({series_id})")
