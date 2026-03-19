"""Category Intelligence API endpoints — market sizes, growth rates, tiered brands."""

from datetime import datetime
from fastapi import APIRouter, Depends, Query
from sqlalchemy import func, desc
from sqlalchemy.orm import Session
from typing import Optional
from database.models import Brand, BrandPrice, Company

router = APIRouter(prefix="/api/categories", tags=["categories"])


def get_db():
    """Dependency — injected by main app."""
    pass


# ── Category definitions with market intelligence ──

CATEGORY_INTELLIGENCE = {
    "tequila": {
        "name": "Tequila & Mezcal",
        "market_size_usd": 13.2e9,
        "growth_rate": 0.087,
        "volume_cases_m": 42.5,
        "key_markets": ["USA", "Mexico", "Spain", "Germany", "UK"],
        "channel_split": {"on_trade": 0.35, "off_trade": 0.40, "e_commerce": 0.10, "travel_retail": 0.15},
        "tier_definitions": {
            "high_end": {"min_price_usd": 80, "label": "Ultra-Premium / Luxury"},
            "mid_tier": {"min_price_usd": 30, "label": "Premium"},
            "value": {"min_price_usd": 0, "label": "Entry-Level / Value"},
        },
    },
    "vodka": {
        "name": "Vodka",
        "market_size_usd": 46.8e9,
        "growth_rate": 0.032,
        "volume_cases_m": 320.0,
        "key_markets": ["USA", "Russia", "Poland", "UK", "Germany"],
        "channel_split": {"on_trade": 0.30, "off_trade": 0.45, "e_commerce": 0.12, "travel_retail": 0.13},
        "tier_definitions": {
            "high_end": {"min_price_usd": 50, "label": "Ultra-Premium / Luxury"},
            "mid_tier": {"min_price_usd": 20, "label": "Premium"},
            "value": {"min_price_usd": 0, "label": "Entry-Level / Value"},
        },
    },
    "gin": {
        "name": "Gin",
        "market_size_usd": 16.5e9,
        "growth_rate": 0.065,
        "volume_cases_m": 88.0,
        "key_markets": ["UK", "Spain", "USA", "Philippines", "Germany"],
        "channel_split": {"on_trade": 0.38, "off_trade": 0.37, "e_commerce": 0.11, "travel_retail": 0.14},
        "tier_definitions": {
            "high_end": {"min_price_usd": 45, "label": "Ultra-Premium / Luxury"},
            "mid_tier": {"min_price_usd": 20, "label": "Premium"},
            "value": {"min_price_usd": 0, "label": "Entry-Level / Value"},
        },
    },
    "whisky": {
        "name": "Whisky (Scotch, Bourbon, World)",
        "market_size_usd": 68.3e9,
        "growth_rate": 0.054,
        "volume_cases_m": 480.0,
        "key_markets": ["USA", "India", "UK", "Japan", "France"],
        "channel_split": {"on_trade": 0.32, "off_trade": 0.42, "e_commerce": 0.11, "travel_retail": 0.15},
        "tier_definitions": {
            "high_end": {"min_price_usd": 75, "label": "Ultra-Premium / Luxury"},
            "mid_tier": {"min_price_usd": 30, "label": "Premium"},
            "value": {"min_price_usd": 0, "label": "Entry-Level / Value"},
        },
    },
    "rum": {
        "name": "Rum",
        "market_size_usd": 18.2e9,
        "growth_rate": 0.041,
        "volume_cases_m": 170.0,
        "key_markets": ["USA", "India", "Philippines", "UK", "France"],
        "channel_split": {"on_trade": 0.33, "off_trade": 0.42, "e_commerce": 0.10, "travel_retail": 0.15},
        "tier_definitions": {
            "high_end": {"min_price_usd": 50, "label": "Ultra-Premium / Luxury"},
            "mid_tier": {"min_price_usd": 20, "label": "Premium"},
            "value": {"min_price_usd": 0, "label": "Entry-Level / Value"},
        },
    },
    "cognac": {
        "name": "Cognac & Brandy",
        "market_size_usd": 12.8e9,
        "growth_rate": 0.038,
        "volume_cases_m": 25.0,
        "key_markets": ["USA", "China", "France", "UK", "Nigeria"],
        "channel_split": {"on_trade": 0.30, "off_trade": 0.40, "e_commerce": 0.10, "travel_retail": 0.20},
        "tier_definitions": {
            "high_end": {"min_price_usd": 100, "label": "Ultra-Premium / Luxury"},
            "mid_tier": {"min_price_usd": 35, "label": "Premium"},
            "value": {"min_price_usd": 0, "label": "Entry-Level / Value"},
        },
    },
    "champagne": {
        "name": "Champagne & Sparkling Wine",
        "market_size_usd": 7.5e9,
        "growth_rate": 0.029,
        "volume_cases_m": 35.0,
        "key_markets": ["France", "UK", "USA", "Japan", "Germany"],
        "channel_split": {"on_trade": 0.40, "off_trade": 0.35, "e_commerce": 0.08, "travel_retail": 0.17},
        "tier_definitions": {
            "high_end": {"min_price_usd": 80, "label": "Prestige Cuv\u00e9e / Luxury"},
            "mid_tier": {"min_price_usd": 35, "label": "Premium"},
            "value": {"min_price_usd": 0, "label": "Entry-Level / Value"},
        },
    },
    "wine": {
        "name": "Still Wine",
        "market_size_usd": 340.0e9,
        "growth_rate": 0.018,
        "volume_cases_m": 2800.0,
        "key_markets": ["USA", "France", "Italy", "UK", "China"],
        "channel_split": {"on_trade": 0.35, "off_trade": 0.43, "e_commerce": 0.12, "travel_retail": 0.10},
        "tier_definitions": {
            "high_end": {"min_price_usd": 30, "label": "Fine Wine / Luxury"},
            "mid_tier": {"min_price_usd": 12, "label": "Premium"},
            "value": {"min_price_usd": 0, "label": "Entry-Level / Value"},
        },
    },
    "beer": {
        "name": "Beer & Craft Beer",
        "market_size_usd": 623.0e9,
        "growth_rate": 0.035,
        "volume_cases_m": 19000.0,
        "key_markets": ["China", "USA", "Brazil", "Germany", "Mexico"],
        "channel_split": {"on_trade": 0.38, "off_trade": 0.42, "e_commerce": 0.08, "travel_retail": 0.12},
        "tier_definitions": {
            "high_end": {"min_price_usd": 15, "label": "Craft / Premium+"},
            "mid_tier": {"min_price_usd": 8, "label": "Premium Lager"},
            "value": {"min_price_usd": 0, "label": "Mainstream / Economy"},
        },
    },
    "nolo": {
        "name": "No/Low Alcohol",
        "market_size_usd": 13.0e9,
        "growth_rate": 0.11,
        "volume_cases_m": 150.0,
        "key_markets": ["Germany", "USA", "UK", "Japan", "Spain"],
        "channel_split": {"on_trade": 0.25, "off_trade": 0.50, "e_commerce": 0.15, "travel_retail": 0.10},
        "tier_definitions": {
            "high_end": {"min_price_usd": 20, "label": "Premium NoLo"},
            "mid_tier": {"min_price_usd": 8, "label": "Mid-Tier NoLo"},
            "value": {"min_price_usd": 0, "label": "Entry-Level / Value"},
        },
    },
    "rtd": {
        "name": "Ready-to-Drink",
        "market_size_usd": 40.0e9,
        "growth_rate": 0.105,
        "volume_cases_m": 600.0,
        "key_markets": ["USA", "Japan", "Australia", "UK", "Canada"],
        "channel_split": {"on_trade": 0.20, "off_trade": 0.55, "e_commerce": 0.15, "travel_retail": 0.10},
        "tier_definitions": {
            "high_end": {"min_price_usd": 15, "label": "Premium RTD"},
            "mid_tier": {"min_price_usd": 8, "label": "Mid-Tier RTD"},
            "value": {"min_price_usd": 0, "label": "Entry-Level / Value"},
        },
    },
}

# ── Mapping from category slugs to DB category strings ──

SLUG_TO_DB_CATEGORIES = {
    "tequila": ["Tequila", "Mezcal", "Tequila & Mezcal"],
    "vodka": ["Vodka"],
    "gin": ["Gin"],
    "whisky": ["Scotch", "Bourbon", "Whisky", "Blended Scotch", "Single Malt Scotch",
               "Irish Whiskey", "Japanese Whisky", "Canadian Whisky", "American Whiskey",
               "World Whisky"],
    "rum": ["Rum", "Dark Rum", "White Rum", "Spiced Rum", "Aged Rum"],
    "cognac": ["Cognac", "Brandy", "Cognac & Brandy"],
    "champagne": ["Champagne", "Sparkling Wine", "Champagne & Sparkling"],
    "wine": ["Wine", "Red Wine", "White Wine", "Ros\u00e9 Wine", "Still Wine"],
    "beer": ["Beer", "Craft Beer", "Lager", "Ale", "Stout"],
    "nolo": ["No/Low Alcohol", "Non-Alcoholic", "Low ABV", "NoLo"],
    "rtd": ["RTD", "Ready-to-Drink", "Hard Seltzer", "Canned Cocktail"],
}


def _tier_brand(brand: Brand, slug: str) -> str:
    """Determine brand tier based on latest USA price and category thresholds."""
    tiers = CATEGORY_INTELLIGENCE.get(slug, {}).get("tier_definitions", {})
    if not tiers:
        return "mid_tier"

    # Get latest USA price
    price = None
    if brand.prices:
        latest = sorted(brand.prices, key=lambda p: p.effective_date)[-1]
        price = latest.price_usa

    if price is None:
        return "mid_tier"

    if price >= tiers["high_end"]["min_price_usd"]:
        return "high_end"
    elif price >= tiers["mid_tier"]["min_price_usd"]:
        return "mid_tier"
    else:
        return "value"


@router.get("/")
async def list_categories(db: Session = Depends(get_db)):
    """Return category intelligence data — market sizes, growth rates, channels."""
    now = datetime.utcnow()
    result = []

    for slug, info in CATEGORY_INTELLIGENCE.items():
        db_cats = SLUG_TO_DB_CATEGORIES.get(slug, [])
        brand_count = (
            db.query(func.count(Brand.id))
            .filter(Brand.category.in_(db_cats))
            .scalar()
        ) if db_cats else 0

        result.append({
            "slug": slug,
            "name": info["name"],
            "market_size_usd": info["market_size_usd"],
            "growth_rate": info["growth_rate"],
            "volume_cases_m": info["volume_cases_m"],
            "key_markets": info["key_markets"],
            "channel_split": info["channel_split"],
            "brands_tracked": brand_count,
        })

    return {
        "data": result,
        "total": len(result),
        "updated_at": now.isoformat(),
    }


@router.get("/{slug}")
async def get_category(slug: str, db: Session = Depends(get_db)):
    """Detailed category profile."""
    if slug not in CATEGORY_INTELLIGENCE:
        return {"error": f"Unknown category: {slug}"}

    info = CATEGORY_INTELLIGENCE[slug]
    db_cats = SLUG_TO_DB_CATEGORIES.get(slug, [])
    now = datetime.utcnow()

    brand_count = (
        db.query(func.count(Brand.id))
        .filter(Brand.category.in_(db_cats))
        .scalar()
    ) if db_cats else 0

    return {
        "data": {
            "slug": slug,
            "name": info["name"],
            "market_size_usd": info["market_size_usd"],
            "growth_rate": info["growth_rate"],
            "volume_cases_m": info["volume_cases_m"],
            "key_markets": info["key_markets"],
            "channel_split": info["channel_split"],
            "tier_definitions": info["tier_definitions"],
            "brands_tracked": brand_count,
        },
        "updated_at": now.isoformat(),
    }


@router.get("/{slug}/brands")
async def get_category_brands(
    slug: str,
    tier: Optional[str] = Query(None, description="Filter by tier: high_end, mid_tier, value"),
    db: Session = Depends(get_db),
):
    """Return tiered brand data for a category (high-end / mid-tier / value)."""
    if slug not in CATEGORY_INTELLIGENCE:
        return {"error": f"Unknown category: {slug}"}

    db_cats = SLUG_TO_DB_CATEGORIES.get(slug, [])
    now = datetime.utcnow()

    from sqlalchemy.orm import joinedload
    brands = (
        db.query(Brand)
        .join(Company)
        .options(joinedload(Brand.prices))
        .filter(Brand.category.in_(db_cats))
        .order_by(Company.name, Brand.brand_name)
        .all()
    )

    tiered = {"high_end": [], "mid_tier": [], "value": []}

    for b in brands:
        brand_tier = _tier_brand(b, slug)

        if tier and brand_tier != tier:
            continue

        latest_price = None
        if b.prices:
            latest = sorted(b.prices, key=lambda p: p.effective_date)[-1]
            latest_price = {
                "usa": latest.price_usa,
                "uk": latest.price_uk,
                "eu": latest.price_eu,
                "me": latest.price_me,
                "date": latest.effective_date.isoformat(),
            }

        brand_data = {
            "id": b.id,
            "brand_name": b.brand_name,
            "expression": b.expression,
            "category": b.category,
            "size": b.size,
            "brand_owner": b.brand_owner or (b.company.name if b.company else None),
            "distributor": b.distributor,
            "line": b.line,
            "company": b.company.name if b.company else None,
            "tier": brand_tier,
            "latest_price": latest_price,
        }

        tiered[brand_tier].append(brand_data)

    tier_info = CATEGORY_INTELLIGENCE[slug]["tier_definitions"]

    return {
        "data": {
            "high_end": {
                "label": tier_info["high_end"]["label"],
                "min_price_usd": tier_info["high_end"]["min_price_usd"],
                "brands": tiered["high_end"],
                "count": len(tiered["high_end"]),
            },
            "mid_tier": {
                "label": tier_info["mid_tier"]["label"],
                "min_price_usd": tier_info["mid_tier"]["min_price_usd"],
                "brands": tiered["mid_tier"],
                "count": len(tiered["mid_tier"]),
            },
            "value": {
                "label": tier_info["value"]["label"],
                "min_price_usd": tier_info["value"]["min_price_usd"],
                "brands": tiered["value"],
                "count": len(tiered["value"]),
            },
        },
        "total": len(brands) if not tier else sum(len(v) for v in tiered.values()),
        "updated_at": now.isoformat(),
    }
