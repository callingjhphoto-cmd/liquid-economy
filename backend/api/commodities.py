"""Commodity Prices API endpoint — latest prices with category impact mapping."""

import json
import os
from datetime import datetime
from pathlib import Path
from fastapi import APIRouter

router = APIRouter(prefix="/api/commodities", tags=["commodities"])

# Directory where commodity price JSON files are stored
COMMODITIES_DIR = Path.home() / "Documents" / "Claude" / "data" / "commodities"

# Map commodities to category impact
COMMODITY_CATEGORY_MAP = {
    "corn": {
        "categories": ["whisky", "beer"],
        "impact": "Corn is the primary grain for bourbon production and a key ingredient in beer brewing. "
                  "Rising corn prices increase production costs for American whiskey distillers and large brewers.",
    },
    "sugar": {
        "categories": ["rum", "rtd"],
        "impact": "Sugar is the base fermentable for rum production and a sweetener in many RTD products. "
                  "Sugar price volatility directly affects rum distillery margins and RTD cost structures.",
    },
    "wheat": {
        "categories": ["whisky", "beer", "vodka"],
        "impact": "Wheat is used in grain whisky production, wheat beers, and some premium vodkas. "
                  "Price increases affect Scotch blended whisky production and craft beer costs.",
    },
    "oil_wti": {
        "categories": ["all"],
        "impact": "WTI crude oil price drives shipping costs for global spirits distribution, "
                  "glass production energy costs, and plastics used in packaging.",
    },
    "oil_brent": {
        "categories": ["all"],
        "impact": "Brent crude is the European benchmark affecting transatlantic shipping, "
                  "European glass manufacturing, and supply chain logistics costs.",
    },
    "gold": {
        "categories": [],
        "impact": "Gold serves as a macro risk indicator. Rising gold prices typically signal "
                  "risk-off sentiment which can reduce premium spirits consumption.",
    },
    "silver": {
        "categories": [],
        "impact": "Silver is a secondary macro indicator, often tracking gold but with "
                  "industrial demand component.",
    },
    "btc": {
        "categories": [],
        "impact": "Bitcoin serves as a macro liquidity indicator. High BTC prices generally "
                  "correlate with increased discretionary spending on premium spirits.",
    },
    "eur_usd": {
        "categories": ["champagne", "cognac", "wine", "gin"],
        "impact": "EUR/USD exchange rate directly affects the price competitiveness of European "
                  "spirits (Champagne, Cognac, Scotch) in the US market.",
    },
    "gbp_usd": {
        "categories": ["whisky", "gin"],
        "impact": "GBP/USD affects UK spirits exports to the US — Scotch whisky and London Dry Gin "
                  "pricing in the American market.",
    },
    "dxy": {
        "categories": ["all"],
        "impact": "US Dollar Index strength affects global spirits trade. A strong dollar makes "
                  "US spirits exports more expensive and imports cheaper.",
    },
}


def _load_latest_prices() -> dict:
    """Load the latest commodity prices from the data directory."""
    latest_file = COMMODITIES_DIR / "latest_prices.json"
    if latest_file.exists():
        with open(latest_file, "r") as f:
            return json.load(f)
    return {}


@router.get("/")
async def get_commodities():
    """Return latest commodity prices with category impact mapping."""
    now = datetime.utcnow()
    raw = _load_latest_prices()

    if not raw:
        return {
            "data": [],
            "total": 0,
            "updated_at": now.isoformat(),
            "error": "No commodity data found",
        }

    prices = raw.get("prices", {})
    result = []

    for key, price_data in prices.items():
        mapping = COMMODITY_CATEGORY_MAP.get(key, {})
        result.append({
            "commodity": key,
            "symbol": price_data.get("symbol"),
            "name": price_data.get("name"),
            "unit": price_data.get("unit"),
            "latest_value": price_data.get("latest_value"),
            "latest_date": price_data.get("latest_date"),
            "source": price_data.get("source"),
            "relevance": price_data.get("relevance"),
            "affected_categories": mapping.get("categories", []),
            "impact_description": mapping.get("impact", ""),
        })

    return {
        "data": result,
        "total": len(result),
        "updated_at": raw.get("timestamp", now.isoformat()),
    }


@router.get("/history")
async def get_commodity_history():
    """Return list of available historical price snapshots."""
    now = datetime.utcnow()
    files = []

    if COMMODITIES_DIR.exists():
        for f in sorted(COMMODITIES_DIR.iterdir()):
            if f.suffix == ".json" and f.name != "latest_prices.json":
                files.append({
                    "filename": f.name,
                    "date": f.stem.replace("prices_", ""),
                    "size_bytes": f.stat().st_size,
                })

    return {
        "data": files,
        "total": len(files),
        "updated_at": now.isoformat(),
    }
