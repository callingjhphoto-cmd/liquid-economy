"""Claude-powered AI chatbot router for Liquid Economy Intelligence Platform."""

from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel
import logging
from typing import Optional
from datetime import datetime, timedelta

from config import get_settings
from database.models import (
    Company, Brand, BrandPrice, Valuation, ArbitrageSignal,
    DisclosureEvent, Indicator, KeyMetric
)

logger = logging.getLogger(__name__)
router = APIRouter(tags=["chat"])

# Request/Response models
class ChatMessage(BaseModel):
    message: str

class ChatResponse(BaseModel):
    response: str
    sources: list[str]

# Dependency for database session
def get_db():
    """This will be patched by main.py"""
    pass

def extract_keywords_and_entities(message: str) -> dict:
    """Extract keywords and entities from user message."""
    keywords = []
    entities = {
        "companies": [],
        "brands": [],
        "metrics": []
    }

    # Simple keyword extraction based on common patterns
    message_lower = message.lower()

    # Look for company references
    common_companies = ["diageo", "pernod", "beam", "brown-forman", "remy", "bacardi", "moet", "lvmh", "suntory", "kweichow"]
    for company in common_companies:
        if company in message_lower:
            entities["companies"].append(company)

    # Look for brand references
    common_brands = ["johnnie walker", "glenmorangie", "tanqueray", "smirnoff", "ketel one", "grey goose", "chivas", "macallan", "champagne"]
    for brand in common_brands:
        if brand in message_lower:
            entities["brands"].append(brand)

    # Look for metric keywords
    metric_keywords = ["pe ratio", "market cap", "valuation", "price", "dividend", "arbitrage", "signal", "earnings"]
    for keyword in metric_keywords:
        if keyword in message_lower:
            keywords.append(keyword)

    return {
        "keywords": keywords,
        "entities": entities
    }

def query_database_context(db, keywords: dict) -> str:
    """Query database for relevant context based on extracted keywords."""
    context_parts = []

    try:
        # Get recent companies
        companies = db.query(Company).limit(20).all()
        if companies:
            company_names = ", ".join([c.name for c in companies])
            context_parts.append(f"Tracked Companies: {company_names}")

        # Get active arbitrage signals
        signals = db.query(ArbitrageSignal).filter(
            ArbitrageSignal.is_active == True
        ).limit(10).all()
        if signals:
            signals_text = "\n".join([
                f"- {s.signal_type}: {s.company_or_brand} - {s.signal_description} (Severity: {s.severity})"
                for s in signals
            ])
            context_parts.append(f"Active Arbitrage Signals:\n{signals_text}")

        # Get latest valuations
        latest_date = db.query(Valuation).order_by(Valuation.date.desc()).first()
        if latest_date:
            valuations = db.query(Valuation).filter(
                Valuation.date == latest_date.date
            ).limit(10).all()
            if valuations:
                val_text = "\n".join([
                    f"- {v.company.name}: PE Ratio {v.pe_ttm:.2f}x, Div Yield {v.dividend_yield*100:.2f}%"
                    if v.pe_ttm and v.dividend_yield else f"- {v.company.name}: Price ${v.share_price:.2f}"
                    for v in valuations
                ])
                context_parts.append(f"Recent Valuations:\n{val_text}")

        # Get recent brand prices
        prices = db.query(BrandPrice).order_by(BrandPrice.effective_date.desc()).limit(10).all()
        if prices:
            price_text = "\n".join([
                f"- {p.brand.brand_name}: USA ${p.price_usa:.2f}, UK £{p.price_uk:.2f}, EU €{p.price_eu:.2f}, ME ${p.price_me:.2f}"
                if p.price_usa else f"- {p.brand.brand_name}: Price data available"
                for p in prices
            ])
            context_parts.append(f"Brand Pricing:\n{price_text}")

        # Get upcoming disclosure events
        upcoming = db.query(DisclosureEvent).filter(
            DisclosureEvent.event_date >= datetime.now().date(),
            DisclosureEvent.event_date <= datetime.now().date() + timedelta(days=90)
        ).order_by(DisclosureEvent.event_date).limit(10).all()
        if upcoming:
            events_text = "\n".join([
                f"- {e.event_date}: {e.company.name} - {e.event_type} - {e.description}"
                for e in upcoming
            ])
            context_parts.append(f"Upcoming Disclosure Events:\n{events_text}")

        # Get key metrics
        metrics = db.query(KeyMetric).limit(10).all()
        if metrics:
            metrics_text = "\n".join([
                f"- {m.metric_name}: {m.current_value} (Prior: {m.prior_period}) - {m.trend}"
                for m in metrics
            ])
            context_parts.append(f"Key Industry Metrics:\n{metrics_text}")

    except Exception as e:
        logger.error(f"Error querying database context: {e}")

    return "\n\n".join(context_parts)

@router.post("/message", response_model=ChatResponse)
async def chat_message(request: ChatMessage, db = Depends(get_db)):
    """Chat endpoint that uses Claude with RAG pattern."""

    if not request.message or not request.message.strip():
        raise HTTPException(status_code=400, detail="Message cannot be empty")

    settings = get_settings()

    if not settings.anthropic_api_key:
        logger.error("Anthropic API key not configured")
        raise HTTPException(status_code=500, detail="AI service not configured")

    try:
        # 1. Extract keywords and entities from message
        extracted = extract_keywords_and_entities(request.message)

        # 2. Query database for relevant context
        db_context = query_database_context(db, extracted)

        # 3. Format context and prepare prompt
        system_prompt = """You are the Palmer Liquid Studios Intelligence Analyst, an AI embedded in the Liquid Economy Intelligence Platform. You have access to a database of beverage alcohol market data covering 20 companies, 41 brands across 4 global markets (USA, UK, EU, Middle East), valuations, arbitrage signals, and key industry metrics. Answer questions using the provided database context. Cite specific data points. Be concise and analytical."""

        user_prompt = f"""Database Context:
{db_context}

User Question: {request.message}

Please provide an analytical response based on the available data above."""

        # 4. Call Claude API
        from anthropic import Anthropic

        client = Anthropic(api_key=settings.anthropic_api_key)

        message = client.messages.create(
            model="claude-sonnet-4-5-20250929",
            max_tokens=1024,
            system=system_prompt,
            messages=[
                {"role": "user", "content": user_prompt}
            ]
        )

        response_text = message.content[0].text

        # 5. Extract sources from database context
        sources = []
        if "Companies:" in db_context:
            sources.append("Companies Database")
        if "Arbitrage Signals:" in db_context:
            sources.append("Arbitrage Signals")
        if "Valuations:" in db_context:
            sources.append("Valuations")
        if "Brand Pricing:" in db_context:
            sources.append("Brand Pricing")
        if "Disclosure Events:" in db_context:
            sources.append("Disclosure Calendar")
        if "Metrics:" in db_context:
            sources.append("Industry Metrics")

        if not sources:
            sources = ["Liquid Economy Database"]

        return ChatResponse(
            response=response_text,
            sources=sources
        )

    except Exception as e:
        logger.error(f"Error in chat endpoint: {e}")
        raise HTTPException(status_code=500, detail=f"Error processing request: {str(e)}")
