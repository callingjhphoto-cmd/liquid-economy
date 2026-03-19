"""Market Intelligence API endpoint — aggregate KPIs across all categories."""

from datetime import datetime
from fastapi import APIRouter, Depends
from sqlalchemy import func
from sqlalchemy.orm import Session
from database.models import Company, Brand, Valuation, BrandPrice, Alert
from api.categories import CATEGORY_INTELLIGENCE

router = APIRouter(prefix="/api/market-intelligence", tags=["market-intelligence"])


def get_db():
    """Dependency — injected by main app."""
    pass


@router.get("/")
async def get_market_intelligence(db: Session = Depends(get_db)):
    """Aggregate KPIs: total market size, top categories, growth leaders."""
    now = datetime.utcnow()

    # Calculate aggregate market data from category intelligence
    total_market_size = sum(c["market_size_usd"] for c in CATEGORY_INTELLIGENCE.values())
    total_volume = sum(c["volume_cases_m"] for c in CATEGORY_INTELLIGENCE.values())

    # Sort categories by growth rate for growth leaders
    growth_leaders = sorted(
        [
            {"slug": slug, "name": info["name"], "growth_rate": info["growth_rate"],
             "market_size_usd": info["market_size_usd"]}
            for slug, info in CATEGORY_INTELLIGENCE.items()
        ],
        key=lambda x: x["growth_rate"],
        reverse=True,
    )

    # Sort by market size for top categories
    top_by_size = sorted(
        [
            {"slug": slug, "name": info["name"], "market_size_usd": info["market_size_usd"],
             "growth_rate": info["growth_rate"]}
            for slug, info in CATEGORY_INTELLIGENCE.items()
        ],
        key=lambda x: x["market_size_usd"],
        reverse=True,
    )

    # Database metrics
    companies_tracked = db.query(func.count(Company.id)).scalar()
    brands_tracked = db.query(func.count(Brand.id)).scalar()

    # Active alerts count
    active_alerts = (
        db.query(func.count(Alert.id))
        .filter(Alert.acknowledged == False)
        .scalar()
    )

    # Weighted average growth rate (weighted by market size)
    weighted_growth = sum(
        c["growth_rate"] * c["market_size_usd"]
        for c in CATEGORY_INTELLIGENCE.values()
    ) / total_market_size if total_market_size > 0 else 0

    # Channel split aggregates (weighted by market size)
    channel_agg = {"on_trade": 0, "off_trade": 0, "e_commerce": 0, "travel_retail": 0}
    for info in CATEGORY_INTELLIGENCE.values():
        weight = info["market_size_usd"] / total_market_size
        for channel, share in info["channel_split"].items():
            channel_agg[channel] += share * weight

    return {
        "data": {
            "total_market_size_usd": total_market_size,
            "total_volume_cases_m": total_volume,
            "weighted_avg_growth": round(weighted_growth, 4),
            "categories_tracked": len(CATEGORY_INTELLIGENCE),
            "companies_tracked": companies_tracked,
            "brands_tracked": brands_tracked,
            "active_alerts": active_alerts,
            "top_categories_by_size": top_by_size[:5],
            "growth_leaders": growth_leaders[:5],
            "global_channel_split": {k: round(v, 4) for k, v in channel_agg.items()},
        },
        "total": 1,
        "updated_at": now.isoformat(),
    }
