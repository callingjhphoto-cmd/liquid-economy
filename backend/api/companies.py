"""Company and brand API endpoints."""

from datetime import date, timedelta
from fastapi import APIRouter, Depends
from sqlalchemy import desc
from sqlalchemy.orm import Session, joinedload
from database.models import Company, Brand, BrandPrice, Valuation, Filing

router = APIRouter(prefix="/api/companies", tags=["companies"])


def get_db():
    pass


@router.get("/")
async def list_companies(db: Session = Depends(get_db)):
    """List all tracked companies with latest valuation."""
    companies = db.query(Company).order_by(Company.name).all()
    result = []

    for c in companies:
        latest_val = (
            db.query(Valuation)
            .filter(Valuation.company_id == c.id)
            .order_by(desc(Valuation.date))
            .first()
        )

        result.append({
            "id": c.id,
            "name": c.name,
            "ticker": c.ticker,
            "is_public": c.is_public,
            "market_cap_tier": c.market_cap_tier,
            "hq_country": c.hq_country,
            "fiscal_year_end": c.fiscal_year_end,
            "key_brands": c.key_brands,
            "ir_url": c.ir_url,
            "latest_valuation": {
                "date": latest_val.date.isoformat() if latest_val else None,
                "price": latest_val.share_price if latest_val else None,
                "currency": latest_val.currency if latest_val else None,
                "pe_ttm": latest_val.pe_ttm if latest_val else None,
                "market_cap": latest_val.market_cap if latest_val else None,
                "dividend_yield": latest_val.dividend_yield if latest_val else None,
            } if latest_val else None,
        })

    return result


@router.get("/{company_id}")
async def get_company(company_id: int, db: Session = Depends(get_db)):
    """Detailed company profile with brands, valuations, filings."""
    company = db.query(Company).filter(Company.id == company_id).first()
    if not company:
        return {"error": "Company not found"}

    # Get brands with latest prices
    brands = (
        db.query(Brand)
        .options(joinedload(Brand.prices))
        .filter(Brand.company_id == company_id)
        .all()
    )

    # Get valuation history (last 180 days)
    cutoff = date.today() - timedelta(days=180)
    valuations = (
        db.query(Valuation)
        .filter(Valuation.company_id == company_id, Valuation.date >= cutoff)
        .order_by(Valuation.date)
        .all()
    )

    # Get recent filings
    filings = (
        db.query(Filing)
        .filter(Filing.company_id == company_id)
        .order_by(desc(Filing.filing_date))
        .limit(20)
        .all()
    )

    return {
        "company": {
            "id": company.id,
            "name": company.name,
            "ticker": company.ticker,
            "is_public": company.is_public,
            "market_cap_tier": company.market_cap_tier,
            "hq_country": company.hq_country,
            "fiscal_year_end": company.fiscal_year_end,
            "key_brands": company.key_brands,
            "reporting_cadence": company.reporting_cadence,
            "ir_url": company.ir_url,
        },
        "brands": [
            {
                "id": b.id,
                "name": b.brand_name,
                "expression": b.expression,
                "category": b.category,
                "size": b.size,
                "brand_owner": b.brand_owner,
                "distributor": b.distributor,
                "line": b.line,
                "latest_price": {
                    "usa": b.prices[-1].price_usa if b.prices else None,
                    "uk": b.prices[-1].price_uk if b.prices else None,
                    "eu": b.prices[-1].price_eu if b.prices else None,
                    "me": b.prices[-1].price_me if b.prices else None,
                    "date": b.prices[-1].effective_date.isoformat() if b.prices else None,
                } if b.prices else None,
            }
            for b in brands
        ],
        "valuations": [
            {
                "date": v.date.isoformat(),
                "price": v.share_price,
                "pe_ttm": v.pe_ttm,
                "pe_forward": v.pe_forward,
                "market_cap": v.market_cap,
            }
            for v in valuations
        ],
        "filings": [
            {
                "type": f.filing_type,
                "date": f.filing_date.isoformat(),
                "title": f.title,
                "url": f.url,
            }
            for f in filings
        ],
    }


@router.get("/pricing/all")
async def get_all_pricing(db: Session = Depends(get_db)):
    """All brand pricing across markets — for the pricing monitor page."""
    brands = (
        db.query(Brand, Company.name)
        .join(Company)
        .options(joinedload(Brand.prices))
        .order_by(Company.name, Brand.brand_name)
        .all()
    )

    result = []
    for brand, company_name in brands:
        if not brand.prices:
            continue
        latest = brand.prices[-1]
        prices = [latest.price_usa, latest.price_uk, latest.price_eu, latest.price_me]
        valid_prices = [p for p in prices if p and p > 0]

        result.append({
            "company": company_name,
            "brand": brand.brand_name,
            "expression": brand.expression,
            "category": brand.category,
            "size": brand.size,
            "usa": latest.price_usa,
            "uk": latest.price_uk,
            "eu": latest.price_eu,
            "me": latest.price_me,
            "differential": max(valid_prices) - min(valid_prices) if len(valid_prices) >= 2 else 0,
            "premium_index": (max(valid_prices) / min(valid_prices) - 1) if len(valid_prices) >= 2 and min(valid_prices) > 0 else 0,
            "date": latest.effective_date.isoformat(),
        })

    return result
