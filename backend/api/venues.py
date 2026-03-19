"""Venue Intelligence API endpoints — bars, restaurants, venue data with filters."""

from datetime import datetime
from fastapi import APIRouter, Depends, Query
from typing import Optional

router = APIRouter(prefix="/api/venues", tags=["venues"])


def get_db():
    """Dependency — injected by main app."""
    pass


# ── Static venue intelligence data ──
# Sourced from World's 50 Best Bars, London venue profiles, etc.
# This will be migrated to DB tables in a future iteration.

VENUE_DATA = [
    # World's 50 Best Bars 2025 (Top 10)
    {"name": "Sips", "city": "Barcelona", "country": "Spain", "category": "cocktail_bar",
     "ranking": 1, "ranking_year": 2025, "ranking_list": "50_best_bars",
     "parent_company": None, "notes": "Marc Alvarez & Simone Caporale"},
    {"name": "Bar Leone", "city": "Hong Kong", "country": "China", "category": "cocktail_bar",
     "ranking": 2, "ranking_year": 2025, "ranking_list": "50_best_bars",
     "parent_company": None, "notes": "Lorenzo Antinori"},
    {"name": "Handshake Speakeasy", "city": "Mexico City", "country": "Mexico", "category": "cocktail_bar",
     "ranking": 3, "ranking_year": 2025, "ranking_list": "50_best_bars",
     "parent_company": None, "notes": "Eric van Beek"},
    {"name": "Tayēr + Elementary", "city": "London", "country": "UK", "category": "cocktail_bar",
     "ranking": 4, "ranking_year": 2025, "ranking_list": "50_best_bars",
     "parent_company": None, "notes": "Monica Berg & Alex Kratena"},
    {"name": "Jigger & Pony", "city": "Singapore", "country": "Singapore", "category": "cocktail_bar",
     "ranking": 5, "ranking_year": 2025, "ranking_list": "50_best_bars",
     "parent_company": "Indenne Group", "notes": "Indra Kantono"},
    {"name": "Line", "city": "Athens", "country": "Greece", "category": "cocktail_bar",
     "ranking": 6, "ranking_year": 2025, "ranking_list": "50_best_bars",
     "parent_company": None, "notes": "Vasilis Kyritsis"},
    {"name": "Connaught Bar", "city": "London", "country": "UK", "category": "hotel_bar",
     "ranking": 7, "ranking_year": 2025, "ranking_list": "50_best_bars",
     "parent_company": "Maybourne Hotel Group", "notes": "Agostino Perrone & Giorgio Bargiani"},
    {"name": "Licorería Limantour", "city": "Mexico City", "country": "Mexico", "category": "cocktail_bar",
     "ranking": 8, "ranking_year": 2025, "ranking_list": "50_best_bars",
     "parent_company": None, "notes": "Jose Luis Leon"},
    {"name": "Paradiso", "city": "Barcelona", "country": "Spain", "category": "cocktail_bar",
     "ranking": 9, "ranking_year": 2025, "ranking_list": "50_best_bars",
     "parent_company": None, "notes": "Giacomo Giannotti"},
    {"name": "Salmon Guru", "city": "Madrid", "country": "Spain", "category": "cocktail_bar",
     "ranking": 10, "ranking_year": 2025, "ranking_list": "50_best_bars",
     "parent_company": None, "notes": "Diego Cabrera"},

    # London venue profiles
    {"name": "Artesian at The Langham", "city": "London", "country": "UK", "category": "hotel_bar",
     "ranking": None, "ranking_year": None, "ranking_list": None,
     "parent_company": "Langham Hospitality Group", "notes": "Former #1 World's Best Bar"},
    {"name": "American Bar at The Savoy", "city": "London", "country": "UK", "category": "hotel_bar",
     "ranking": None, "ranking_year": None, "ranking_list": None,
     "parent_company": "Accor/FRHI", "notes": "Oldest surviving cocktail bar in London"},
    {"name": "Nightjar", "city": "London", "country": "UK", "category": "cocktail_bar",
     "ranking": None, "ranking_year": None, "ranking_list": None,
     "parent_company": "Speakeasy Group", "notes": "Prohibition-era themed"},
    {"name": "Swift", "city": "London", "country": "UK", "category": "cocktail_bar",
     "ranking": None, "ranking_year": None, "ranking_list": None,
     "parent_company": None, "notes": "Bobby Hiddleston & Mia Johansson"},
    {"name": "Three Sheets", "city": "London", "country": "UK", "category": "cocktail_bar",
     "ranking": None, "ranking_year": None, "ranking_list": None,
     "parent_company": None, "notes": "Max Venning"},
    {"name": "Scarfes Bar", "city": "London", "country": "UK", "category": "hotel_bar",
     "ranking": None, "ranking_year": None, "ranking_list": None,
     "parent_company": "Rosewood Hotel Group", "notes": "Gerald Scarfe artwork"},
    {"name": "Dandelyan (now Lyaness)", "city": "London", "country": "UK", "category": "hotel_bar",
     "ranking": None, "ranking_year": None, "ranking_list": None,
     "parent_company": "Mondrian London / Accor", "notes": "Ryan Chetiyawardana (Mr Lyan)"},
    {"name": "Coupette", "city": "London", "country": "UK", "category": "cocktail_bar",
     "ranking": None, "ranking_year": None, "ranking_list": None,
     "parent_company": None, "notes": "Chris Moore, Bethnal Green"},
    {"name": "Satan's Whiskers", "city": "London", "country": "UK", "category": "cocktail_bar",
     "ranking": None, "ranking_year": None, "ranking_list": None,
     "parent_company": None, "notes": "Bethnal Green"},
    {"name": "Kwānt", "city": "London", "country": "UK", "category": "cocktail_bar",
     "ranking": None, "ranking_year": None, "ranking_list": None,
     "parent_company": None, "notes": "Erik Lorincz, Mayfair"},
]


@router.get("/")
async def list_venues(
    city: Optional[str] = Query(None, description="Filter by city"),
    country: Optional[str] = Query(None, description="Filter by country"),
    category: Optional[str] = Query(None, description="Filter by category: cocktail_bar, hotel_bar"),
    ranking_list: Optional[str] = Query(None, description="Filter by ranking list: 50_best_bars"),
    year: Optional[int] = Query(None, description="Filter by ranking year"),
):
    """Return venue data with optional filters."""
    now = datetime.utcnow()
    filtered = VENUE_DATA

    if city:
        filtered = [v for v in filtered if v["city"].lower() == city.lower()]
    if country:
        filtered = [v for v in filtered if v["country"].lower() == country.lower()]
    if category:
        filtered = [v for v in filtered if v["category"] == category]
    if ranking_list:
        filtered = [v for v in filtered if v.get("ranking_list") == ranking_list]
    if year:
        filtered = [v for v in filtered if v.get("ranking_year") == year]

    return {
        "data": filtered,
        "total": len(filtered),
        "updated_at": now.isoformat(),
    }


@router.get("/cities")
async def list_venue_cities():
    """List all unique cities in venue data."""
    cities = sorted(set(v["city"] for v in VENUE_DATA))
    return {"data": cities, "total": len(cities)}


@router.get("/rankings")
async def get_rankings(
    list_name: str = Query("50_best_bars", description="Ranking list name"),
    year: Optional[int] = Query(None, description="Ranking year"),
):
    """Return ranked venues from a specific list."""
    now = datetime.utcnow()
    filtered = [
        v for v in VENUE_DATA
        if v.get("ranking_list") == list_name and v.get("ranking") is not None
    ]

    if year:
        filtered = [v for v in filtered if v.get("ranking_year") == year]

    filtered.sort(key=lambda v: (v.get("ranking_year", 0), v.get("ranking", 999)))

    return {
        "data": filtered,
        "total": len(filtered),
        "updated_at": now.isoformat(),
    }
