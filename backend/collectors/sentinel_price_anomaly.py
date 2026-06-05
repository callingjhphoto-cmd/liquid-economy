"""Price-Anomaly Sentinel — the first data→creative agent.

Move #2 of the data-platform extension (2026-06-05). Scans brand_prices for
significant moves between a brand's two most recent price snapshots and, when
one is found, writes a CreativeBrief — the database link between "Know it"
(data) and "Make it" (the studio). Designed to run on the existing APScheduler.

Run standalone:  python -m collectors.sentinel_price_anomaly
"""

import json
from datetime import datetime

from config import get_settings
from database.models import (
    get_engine, get_session_factory, create_tables,
    Brand, BrandPrice, BrandCategory, CreativeBrief,
)

# a move this large or larger in any market triggers a brief
THRESHOLD_PCT = 8.0
MARKETS = {"price_usa": "US", "price_uk": "UK", "price_eu": "EU", "price_me": "Middle East"}


def _pct(old, new):
    if not old or old == 0 or new is None:
        return None
    return round((new - old) / old * 100.0, 1)


def run():
    settings = get_settings()
    engine = get_engine(settings.database_url)
    create_tables(engine)
    Session = get_session_factory(engine)
    db = Session()

    created = 0
    try:
        for brand in db.query(Brand).all():
            rows = (
                db.query(BrandPrice)
                .filter(BrandPrice.brand_id == brand.id)
                .order_by(BrandPrice.effective_date.desc())
                .limit(2)
                .all()
            )
            if len(rows) < 2:
                continue
            latest, prior = rows[0], rows[1]

            for col, label in MARKETS.items():
                change = _pct(getattr(prior, col), getattr(latest, col))
                if change is None or abs(change) < THRESHOLD_PCT:
                    continue

                # skip if we already raised this exact signal for this brand today
                dup = (
                    db.query(CreativeBrief)
                    .filter(
                        CreativeBrief.brand_id == brand.id,
                        CreativeBrief.source_signal == "price_anomaly",
                        CreativeBrief.created_at >= datetime.utcnow().replace(hour=0, minute=0, second=0, microsecond=0),
                    )
                    .first()
                )
                if dup:
                    continue

                direction = "rose" if change > 0 else "fell"
                name = f"{brand.brand_name} {brand.expression or ''}".strip()
                bc = db.query(BrandCategory).filter_by(brand_id=brand.id, is_primary=True).first()

                brief = CreativeBrief(
                    status="new_signal",
                    source_signal="price_anomaly",
                    brand_id=brand.id,
                    category_id=bc.category_id if bc else None,
                    triggering_data=json.dumps({
                        "table": "brand_prices",
                        "ids": [prior.id, latest.id],
                        "market": label,
                        "metric": col,
                        "from": getattr(prior, col),
                        "to": getattr(latest, col),
                        "change_pct": change,
                    }),
                    headline=f"{name}: {label} price {direction} {abs(change)}%",
                    analyst_summary=(
                        f"{name} ({brand.category or 'category n/a'}) {label} RRP moved from "
                        f"{getattr(prior, col)} to {getattr(latest, col)} "
                        f"({change:+}%) between {prior.effective_date} and {latest.effective_date}."
                    ),
                    creative_challenge=(
                        f"A {abs(change)}% {label} price {direction} changes how {name} should be "
                        f"positioned at that price point. What's the creative response that protects "
                        f"premium perception and converts the move into a reason to choose the brand?"
                    ),
                    severity="high" if abs(change) >= 15 else "medium",
                )
                db.add(brief)
                created += 1

        db.commit()
        print(f"[sentinel_price_anomaly] creative briefs raised: {created}")
        return created
    except Exception as exc:  # noqa: BLE001
        db.rollback()
        print(f"[sentinel_price_anomaly] ERROR: {exc}")
        raise
    finally:
        db.close()


if __name__ == "__main__":
    run()
