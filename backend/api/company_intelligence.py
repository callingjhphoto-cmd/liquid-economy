"""Company Intelligence API endpoint — scraped company data and entity resolution."""

import json
import os
from datetime import datetime
from pathlib import Path
from fastapi import APIRouter, Query
from typing import Optional

router = APIRouter(prefix="/api/companies/intelligence", tags=["company-intelligence"])

# Directory where company intelligence JSON files are stored
INTELLIGENCE_DIR = Path.home() / "Documents" / "Claude" / "scrapers" / "company_intelligence"


def _load_json(filename: str) -> dict:
    """Load a JSON file from the intelligence directory."""
    filepath = INTELLIGENCE_DIR / filename
    if filepath.exists():
        with open(filepath, "r") as f:
            return json.load(f)
    return {}


def _load_golden_records() -> list:
    """Load entity resolution golden records."""
    filepath = INTELLIGENCE_DIR / "golden_records.json"
    if filepath.exists():
        with open(filepath, "r") as f:
            return json.load(f)
    return []


def _list_company_files() -> list:
    """List all company JSON files in the intelligence directory."""
    if not INTELLIGENCE_DIR.exists():
        return []
    return [
        f.stem for f in INTELLIGENCE_DIR.iterdir()
        if f.suffix == ".json"
        and f.name != "golden_records.json"
        and not f.name.endswith("_research.md")
    ]


@router.get("/")
async def get_company_intelligence(
    company: Optional[str] = Query(None, description="Filter by company slug (e.g. 'diageo')"),
):
    """Return company intelligence data from scraped sources."""
    now = datetime.utcnow()

    if company:
        # Load specific company
        data = _load_json(f"{company}.json")
        if not data:
            return {"error": f"No intelligence data found for: {company}", "updated_at": now.isoformat()}
        return {
            "data": [data],
            "total": 1,
            "updated_at": now.isoformat(),
        }

    # Load all company files
    company_slugs = _list_company_files()
    companies = []
    for slug in company_slugs:
        data = _load_json(f"{slug}.json")
        if data:
            companies.append({
                "slug": slug,
                "canonical_name": data.get("canonical_name", slug),
                "ticker": data.get("ticker"),
                "hq_country": data.get("hq_country"),
                "sector": data.get("sector"),
                "market_cap": data.get("market_cap"),
                "revenue": data.get("revenue"),
                "brand_portfolio": data.get("brand_portfolio", [])[:10],  # First 10 brands
            })

    return {
        "data": companies,
        "total": len(companies),
        "updated_at": now.isoformat(),
    }


@router.get("/golden-records")
async def get_golden_records():
    """Return entity resolution golden records for company name matching."""
    now = datetime.utcnow()
    records = _load_golden_records()
    return {
        "data": records,
        "total": len(records),
        "updated_at": now.isoformat(),
    }


@router.get("/research")
async def list_research_files():
    """List available research markdown files."""
    now = datetime.utcnow()
    files = []

    if INTELLIGENCE_DIR.exists():
        for f in sorted(INTELLIGENCE_DIR.iterdir()):
            if f.name.endswith("_research.md"):
                files.append({
                    "filename": f.name,
                    "company": f.stem.replace("_research", ""),
                    "size_bytes": f.stat().st_size,
                    "modified": datetime.fromtimestamp(f.stat().st_mtime).isoformat(),
                })

    return {
        "data": files,
        "total": len(files),
        "updated_at": now.isoformat(),
    }
