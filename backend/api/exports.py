"""Export endpoints — generate Excel tracker and PDF briefs."""

import io
from datetime import date, timedelta
from fastapi import APIRouter, Depends
from fastapi.responses import StreamingResponse
from sqlalchemy import desc
from sqlalchemy.orm import Session
from database.models import (
    Company, Brand, BrandPrice, Valuation, TradeData,
    Indicator, ArbitrageSignal, DataSource
)
from reports.excel_export import generate_tracker_excel

router = APIRouter(prefix="/api/exports", tags=["exports"])


def get_db():
    pass


@router.get("/excel")
async def export_excel(db: Session = Depends(get_db)):
    """Generate and download the full Liquid Economy Tracker as Excel."""
    buffer = generate_tracker_excel(db)

    return StreamingResponse(
        buffer,
        media_type="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        headers={
            "Content-Disposition": f"attachment; filename=liquid_economy_tracker_{date.today().isoformat()}.xlsx"
        },
    )
