"""Dashboard API endpoints — command centre data."""

from datetime import date, timedelta
from fastapi import APIRouter, Depends
from sqlalchemy import func, desc
from sqlalchemy.orm import Session
from database.models import (
    Company, Valuation, Indicator, Alert, Filing,
    CollectionLog, DataSource, ArbitrageSignal, DisclosureEvent
)

router = APIRouter(prefix="/api/dashboard", tags=["dashboard"])


def get_db():
    """Dependency — injected by main app."""
    pass  # Overridden in main.py


@router.get("/summary")
async def get_summary(db: Session = Depends(get_db)):
    """Command centre summary: key metrics at a glance."""
    today = date.today()
    thirty_days = today + timedelta(days=30)

    # Latest valuations for all public companies
    latest_vals = (
        db.query(Valuation)
        .filter(Valuation.date >= today - timedelta(days=7))
        .order_by(desc(Valuation.date))
        .all()
    )

    # Calculate sector average P/E
    pe_values = [v.pe_ttm for v in latest_vals if v.pe_ttm]
    avg_pe = sum(pe_values) / len(pe_values) if pe_values else None

    # Latest Glass PPI
    glass_ppi = (
        db.query(Indicator)
        .filter(Indicator.series_id == "PCU327213327213")
        .order_by(desc(Indicator.period))
        .first()
    )

    # Recent alerts (unacknowledged)
    recent_alerts = (
        db.query(Alert)
        .filter(Alert.acknowledged == False)
        .order_by(desc(Alert.created_at))
        .limit(10)
        .all()
    )

    # Upcoming events (next 30 days)
    upcoming_events = (
        db.query(DisclosureEvent)
        .filter(
            DisclosureEvent.event_date >= today,
            DisclosureEvent.event_date <= thirty_days
        )
        .order_by(DisclosureEvent.event_date)
        .limit(10)
        .all()
    )

    # Recent filings
    recent_filings = (
        db.query(Filing)
        .order_by(desc(Filing.filing_date))
        .limit(5)
        .all()
    )

    # Active high-severity arbitrage signals
    critical_signals = (
        db.query(ArbitrageSignal)
        .filter(ArbitrageSignal.is_active == True)
        .filter(ArbitrageSignal.severity.in_(["high", "critical"]))
        .all()
    )

    # Collection status
    last_runs = (
        db.query(CollectionLog)
        .order_by(desc(CollectionLog.started_at))
        .limit(10)
        .all()
    )

    return {
        "sector_avg_pe": round(avg_pe, 1) if avg_pe else None,
        "companies_tracked": db.query(Company).count(),
        "glass_ppi": {
            "value": glass_ppi.value if glass_ppi else None,
            "period": glass_ppi.period if glass_ppi else None,
        },
        "alerts": [
            {
                "id": a.id, "type": a.alert_type, "severity": a.severity,
                "title": a.title, "message": a.message,
                "created_at": a.created_at.isoformat() if a.created_at else None,
            }
            for a in recent_alerts
        ],
        "upcoming_events": [
            {
                "company": e.company.name if e.company else None,
                "date": e.event_date.isoformat() if e.event_date else e.event_date_text,
                "type": e.event_type,
                "description": e.description,
            }
            for e in upcoming_events
        ],
        "recent_filings": [
            {
                "company": f.company.name if f.company else None,
                "type": f.filing_type, "date": f.filing_date.isoformat(),
                "title": f.title, "url": f.url,
            }
            for f in recent_filings
        ],
        "critical_signals": [
            {
                "type": s.signal_type, "company": s.company_or_brand,
                "description": s.signal_description, "severity": s.severity,
            }
            for s in critical_signals
        ],
        "last_collection_runs": [
            {
                "collector": r.collector_name, "status": r.status,
                "records": r.records_added,
                "at": r.completed_at.isoformat() if r.completed_at else None,
            }
            for r in last_runs
        ],
    }


@router.get("/valuations")
async def get_valuations(days: int = 90, db: Session = Depends(get_db)):
    """Valuation data for all public companies over time."""
    cutoff = date.today() - timedelta(days=days)

    vals = (
        db.query(Valuation, Company.name, Company.ticker)
        .join(Company)
        .filter(Valuation.date >= cutoff)
        .order_by(Company.name, Valuation.date)
        .all()
    )

    # Group by company
    result = {}
    for val, name, ticker in vals:
        if name not in result:
            result[name] = {"ticker": ticker, "data": []}
        result[name]["data"].append({
            "date": val.date.isoformat(),
            "price": val.share_price,
            "currency": val.currency,
            "pe_ttm": val.pe_ttm,
            "pe_forward": val.pe_forward,
            "dividend_yield": val.dividend_yield,
            "market_cap": val.market_cap,
        })

    return result


@router.get("/arbitrage")
async def get_arbitrage_signals(db: Session = Depends(get_db)):
    """Active arbitrage and intelligence signals."""
    signals = (
        db.query(ArbitrageSignal)
        .filter(ArbitrageSignal.is_active == True)
        .order_by(
            desc(ArbitrageSignal.severity == "critical"),
            desc(ArbitrageSignal.severity == "high"),
            desc(ArbitrageSignal.last_updated),
        )
        .all()
    )

    return [
        {
            "id": s.id,
            "type": s.signal_type,
            "company": s.company_or_brand,
            "description": s.signal_description,
            "current_data": s.current_data,
            "benchmark": s.benchmark,
            "insight": s.insight,
            "action": s.action,
            "severity": s.severity,
            "updated": s.last_updated.isoformat() if s.last_updated else None,
        }
        for s in signals
    ]


@router.post("/alerts/{alert_id}/acknowledge")
async def acknowledge_alert(alert_id: int, db: Session = Depends(get_db)):
    """Mark an alert as acknowledged."""
    from datetime import datetime
    alert = db.query(Alert).filter(Alert.id == alert_id).first()
    if not alert:
        return {"error": "Alert not found"}
    alert.acknowledged = True
    alert.acknowledged_at = datetime.utcnow()
    db.commit()
    return {"status": "acknowledged"}
