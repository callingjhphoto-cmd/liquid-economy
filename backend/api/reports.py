"""FastAPI router for report generation and history."""

from fastapi import APIRouter, HTTPException, Depends
from fastapi.responses import FileResponse
from pydantic import BaseModel
from typing import Optional, List
import logging
import json
from datetime import datetime

from config import get_settings
from database.models import (
    Company, Brand, BrandPrice, Valuation, ArbitrageSignal,
    DisclosureEvent, KeyMetric, Report
)
from reports.pdf_generator import generate_brief_pdf, generate_portfolio_pdf
from reports.narratives import generate_section_narrative

logger = logging.getLogger(__name__)
router = APIRouter(tags=["reports"])

# Dependency for database session
def get_db():
    """This will be patched by main.py"""
    pass


# Request/Response models
class GenerateBriefRequest(BaseModel):
    title: str
    sections: List[str]  # e.g., ["Market Overview", "Valuations", "Signals"]
    company_ids: Optional[List[int]] = None
    signal_ids: Optional[List[int]] = None


class GeneratePortfolioRequest(BaseModel):
    title: str
    scope: str = "all"  # "all", "public", "private"
    include_sections: Optional[List[str]] = None


class ReportHistoryItem(BaseModel):
    id: int
    report_type: str
    title: str
    created_by: Optional[str]
    created_at: str


def _compile_section_data(section_name: str, db, company_ids=None, signal_ids=None) -> str:
    """Compile data context for a report section."""
    context_parts = []

    try:
        if section_name == "Market Overview":
            # Get all companies or specific ones
            query = db.query(Company)
            if company_ids:
                query = query.filter(Company.id.in_(company_ids))
            companies = query.limit(20).all()

            if companies:
                companies_text = "\n".join([
                    f"- {c.name} ({'Public' if c.is_public else 'Private'}): {c.market_cap_tier or 'N/A'} | {c.key_brands or 'N/A'}"
                    for c in companies
                ])
                context_parts.append(f"Tracked Companies:\n{companies_text}")

        elif section_name == "Valuations":
            # Get latest valuations
            latest_val = db.query(Valuation).order_by(Valuation.date.desc()).first()
            if latest_val:
                vals = db.query(Valuation).filter(
                    Valuation.date == latest_val.date
                ).limit(15).all()

                if vals:
                    val_text = "\n".join([
                        f"- {v.company.name}: Price ${v.share_price:.2f}, PE {v.pe_ttm:.1f}x, Div Yield {v.dividend_yield*100:.2f}%" if v.pe_ttm else f"- {v.company.name}: ${v.share_price:.2f}"
                        for v in vals if v.share_price
                    ])
                    context_parts.append(f"Latest Valuations (as of {latest_val.date}):\n{val_text}")

        elif section_name == "Arbitrage Signals":
            # Get active signals
            query = db.query(ArbitrageSignal).filter(ArbitrageSignal.is_active == True)
            if signal_ids:
                query = query.filter(ArbitrageSignal.id.in_(signal_ids))
            signals = query.limit(15).all()

            if signals:
                sig_text = "\n".join([
                    f"- {s.signal_type} ({s.severity}): {s.company_or_brand} - {s.signal_description}"
                    for s in signals
                ])
                context_parts.append(f"Active Arbitrage Signals:\n{sig_text}")

        elif section_name == "Brand Pricing":
            # Get recent brand prices
            prices = db.query(BrandPrice).order_by(
                BrandPrice.effective_date.desc()
            ).limit(15).all()

            if prices:
                price_text = "\n".join([
                    f"- {p.brand.brand_name} ({p.brand.category}): USA ${p.price_usa:.0f}" if p.price_usa else f"- {p.brand.brand_name}"
                    for p in prices
                ])
                context_parts.append(f"Brand Pricing:\n{price_text}")

        elif section_name == "Disclosure Calendar":
            # Get upcoming events
            upcoming = db.query(DisclosureEvent).filter(
                DisclosureEvent.event_date.isnot(None)
            ).order_by(DisclosureEvent.event_date).limit(15).all()

            if upcoming:
                events_text = "\n".join([
                    f"- {e.event_date}: {e.company.name} - {e.event_type}"
                    for e in upcoming
                ])
                context_parts.append(f"Upcoming Disclosure Events:\n{events_text}")

        elif section_name == "Key Metrics":
            # Get key metrics
            metrics = db.query(KeyMetric).limit(15).all()

            if metrics:
                metrics_text = "\n".join([
                    f"- {m.metric_name}: {m.current_value} (Prior: {m.prior_period}) Trend: {m.trend}"
                    for m in metrics
                ])
                context_parts.append(f"Key Industry Metrics:\n{metrics_text}")

    except Exception as e:
        logger.error(f"Error compiling section data for {section_name}: {e}")

    return "\n\n".join(context_parts) if context_parts else f"No data available for {section_name}"


@router.post("/brief")
async def generate_brief(request: GenerateBriefRequest, db=Depends(get_db)):
    """Generate a quick intelligence brief PDF."""

    if not request.sections:
        raise HTTPException(status_code=400, detail="At least one section is required")

    settings = get_settings()
    if not settings.anthropic_api_key:
        raise HTTPException(status_code=500, detail="AI service not configured")

    try:
        # Compile data for each section
        sections_data = {}
        narratives = {}

        for section in request.sections:
            logger.info(f"Compiling data for section: {section}")
            section_data = _compile_section_data(
                section, db,
                company_ids=request.company_ids,
                signal_ids=request.signal_ids
            )
            sections_data[section] = section_data

            # Generate narrative
            logger.info(f"Generating narrative for section: {section}")
            narrative = generate_section_narrative(
                section,
                section_data,
                settings.anthropic_api_key
            )
            narratives[section] = narrative

        # Generate PDF
        logger.info(f"Generating PDF for brief: {request.title}")
        pdf_bytes = generate_brief_pdf(request.title, sections_data, narratives)

        # Save to database
        report = Report(
            report_type="brief",
            title=request.title,
            created_by="system",
            sections_json=json.dumps(request.sections)
        )
        db.add(report)
        db.commit()

        return FileResponse(
            iter([pdf_bytes]),
            media_type="application/pdf",
            filename=f"brief_{request.title.replace(' ', '_')}.pdf"
        )

    except Exception as e:
        logger.error(f"Error generating brief: {e}")
        raise HTTPException(status_code=500, detail=f"Error generating report: {str(e)}")


@router.post("/portfolio")
async def generate_portfolio(request: GeneratePortfolioRequest, db=Depends(get_db)):
    """Generate a comprehensive portfolio report PDF."""

    settings = get_settings()
    if not settings.anthropic_api_key:
        raise HTTPException(status_code=500, detail="AI service not configured")

    try:
        # Default sections if not specified
        sections = request.include_sections or [
            "Market Overview",
            "Valuations",
            "Arbitrage Signals",
            "Brand Pricing",
            "Disclosure Calendar",
            "Key Metrics"
        ]

        # Filter companies by scope
        company_query = db.query(Company)
        if request.scope == "public":
            company_query = company_query.filter(Company.is_public == True)
        elif request.scope == "private":
            company_query = company_query.filter(Company.is_public == False)
        company_ids = [c.id for c in company_query.all()]

        # Compile data for each section
        sections_data = {}
        narratives = {}

        for section in sections:
            logger.info(f"Compiling data for section: {section}")
            section_data = _compile_section_data(section, db, company_ids=company_ids)
            sections_data[section] = section_data

            # Generate narrative
            logger.info(f"Generating narrative for section: {section}")
            narrative = generate_section_narrative(
                section,
                section_data,
                settings.anthropic_api_key
            )
            narratives[section] = narrative

        # Generate PDF
        logger.info(f"Generating PDF for portfolio: {request.title}")
        pdf_bytes = generate_portfolio_pdf(request.title, sections_data, narratives)

        # Save to database
        report = Report(
            report_type="portfolio",
            title=request.title,
            created_by="system",
            sections_json=json.dumps(sections)
        )
        db.add(report)
        db.commit()

        return FileResponse(
            iter([pdf_bytes]),
            media_type="application/pdf",
            filename=f"portfolio_{request.title.replace(' ', '_')}.pdf"
        )

    except Exception as e:
        logger.error(f"Error generating portfolio: {e}")
        raise HTTPException(status_code=500, detail=f"Error generating report: {str(e)}")


@router.get("/history")
async def get_report_history(db=Depends(get_db)):
    """Get list of previously generated reports."""

    try:
        reports = db.query(Report).order_by(Report.created_at.desc()).limit(50).all()

        history = [
            ReportHistoryItem(
                id=r.id,
                report_type=r.report_type,
                title=r.title,
                created_by=r.created_by,
                created_at=r.created_at.isoformat() if r.created_at else ""
            )
            for r in reports
        ]

        return history

    except Exception as e:
        logger.error(f"Error fetching report history: {e}")
        raise HTTPException(status_code=500, detail=f"Error fetching history: {str(e)}")
