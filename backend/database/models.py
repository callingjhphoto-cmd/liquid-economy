"""SQLAlchemy models for Liquid Economy Intelligence Platform."""

from datetime import datetime, date
from sqlalchemy import (
    create_engine, Column, Integer, String, Float, Boolean, Date, DateTime,
    Text, ForeignKey, UniqueConstraint, Index, Enum as SAEnum
)
from sqlalchemy.orm import declarative_base, relationship, sessionmaker
from sqlalchemy.sql import func

Base = declarative_base()


# ───────────────────────────────────────────
# CORE ENTITIES
# ───────────────────────────────────────────

class Company(Base):
    __tablename__ = "companies"

    id = Column(Integer, primary_key=True)
    name = Column(String(200), nullable=False, unique=True)
    ticker = Column(String(50))
    is_public = Column(Boolean, default=True)
    market_cap_tier = Column(String(20))  # Mega-Cap, Large-Cap, Mid-Cap, Small-Cap
    hq_country = Column(String(100))
    fiscal_year_end = Column(String(50))
    key_brands = Column(Text)
    reporting_cadence = Column(Text)
    ir_url = Column(String(500))
    created_at = Column(DateTime, server_default=func.now())

    # Relationships
    valuations = relationship("Valuation", back_populates="company", cascade="all, delete-orphan")
    brands = relationship("Brand", back_populates="company", cascade="all, delete-orphan")
    filings = relationship("Filing", back_populates="company", cascade="all, delete-orphan")
    events = relationship("DisclosureEvent", back_populates="company", cascade="all, delete-orphan")


class Brand(Base):
    __tablename__ = "brands"

    id = Column(Integer, primary_key=True)
    company_id = Column(Integer, ForeignKey("companies.id"), nullable=False)
    brand_name = Column(String(200), nullable=False)
    expression = Column(String(200))  # e.g. "Black Label 12yr", "Impérial Brut NV"
    category = Column(String(100))  # Blended Scotch, Champagne, Tequila, etc.
    size = Column(String(50))  # 70cl/750ml, 75cl, etc.
    brand_owner = Column(String(200), nullable=True)  # Parent company name, e.g. "Diageo"
    distributor = Column(String(200), nullable=True)  # Primary distributor
    line = Column(String(200), nullable=True)  # Product line, e.g. "Black Label" within Johnnie Walker
    created_at = Column(DateTime, server_default=func.now())

    company = relationship("Company", back_populates="brands")
    prices = relationship("BrandPrice", back_populates="brand", cascade="all, delete-orphan")

    __table_args__ = (
        UniqueConstraint("company_id", "brand_name", "expression", name="uq_brand_expression"),
    )


# ───────────────────────────────────────────
# VALUATIONS & MARKET DATA
# ───────────────────────────────────────────

class Valuation(Base):
    """Daily stock valuation snapshot for public companies."""
    __tablename__ = "valuations"

    id = Column(Integer, primary_key=True)
    company_id = Column(Integer, ForeignKey("companies.id"), nullable=False)
    date = Column(Date, nullable=False)
    share_price = Column(Float)
    currency = Column(String(10), default="USD")
    eps_ttm = Column(Float)
    pe_ttm = Column(Float)
    pe_forward = Column(Float)
    dividend_yield = Column(Float)  # as decimal, e.g. 0.034 = 3.4%
    market_cap = Column(Float)  # in USD
    volume = Column(Float)
    created_at = Column(DateTime, server_default=func.now())

    company = relationship("Company", back_populates="valuations")

    __table_args__ = (
        UniqueConstraint("company_id", "date", name="uq_valuation_date"),
        Index("ix_valuation_date", "date"),
    )


class BrandPrice(Base):
    """RRP pricing for brands across markets."""
    __tablename__ = "brand_prices"

    id = Column(Integer, primary_key=True)
    brand_id = Column(Integer, ForeignKey("brands.id"), nullable=False)
    price_usa = Column(Float)  # USD
    price_uk = Column(Float)  # GBP
    price_eu = Column(Float)  # EUR
    price_me = Column(Float)  # USD (Middle East/Dubai)
    source = Column(String(200))
    notes = Column(Text)
    effective_date = Column(Date, nullable=False)
    created_at = Column(DateTime, server_default=func.now())

    brand = relationship("Brand", back_populates="prices")

    __table_args__ = (
        Index("ix_brand_price_date", "brand_id", "effective_date"),
    )


# ───────────────────────────────────────────
# TRADE DATA
# ───────────────────────────────────────────

class TradeData(Base):
    """Monthly trade statistics from USITC, Eurostat, etc."""
    __tablename__ = "trade_data"

    id = Column(Integer, primary_key=True)
    source = Column(String(50), nullable=False)  # USITC, Eurostat, HMRC
    hs_code = Column(String(20), nullable=False)
    hs_description = Column(String(300))
    reporter_country = Column(String(100), nullable=False)
    partner_country = Column(String(100))  # null = world total
    period = Column(String(10), nullable=False)  # YYYY-MM format
    flow = Column(String(10), nullable=False)  # "import" or "export"
    value_usd = Column(Float)
    quantity = Column(Float)
    quantity_unit = Column(String(50))  # litres, kg, etc.
    created_at = Column(DateTime, server_default=func.now())

    __table_args__ = (
        UniqueConstraint("source", "hs_code", "reporter_country", "partner_country",
                         "period", "flow", name="uq_trade_record"),
        Index("ix_trade_period", "period"),
        Index("ix_trade_hs", "hs_code"),
    )


# ───────────────────────────────────────────
# ECONOMIC INDICATORS
# ───────────────────────────────────────────

class Indicator(Base):
    """Economic indicators: BLS PPI, FAOSTAT production, etc."""
    __tablename__ = "indicators"

    id = Column(Integer, primary_key=True)
    source = Column(String(50), nullable=False)  # BLS, FAOSTAT, OIV
    series_id = Column(String(100), nullable=False)
    series_name = Column(String(300))
    period = Column(String(10), nullable=False)  # YYYY-MM or YYYY
    value = Column(Float, nullable=False)
    unit = Column(String(50))
    created_at = Column(DateTime, server_default=func.now())

    __table_args__ = (
        UniqueConstraint("source", "series_id", "period", name="uq_indicator"),
        Index("ix_indicator_series", "series_id", "period"),
    )


# ───────────────────────────────────────────
# REGULATORY & FILINGS
# ───────────────────────────────────────────

class Filing(Base):
    """SEC EDGAR, Companies House, TTB filings."""
    __tablename__ = "filings"

    id = Column(Integer, primary_key=True)
    company_id = Column(Integer, ForeignKey("companies.id"))
    source = Column(String(50), nullable=False)  # SEC, CompaniesHouse, TTB
    filing_type = Column(String(50))  # 10-K, 10-Q, 8-K, Annual Return, COLA
    filing_date = Column(Date, nullable=False)
    title = Column(String(500))
    url = Column(String(1000))
    summary = Column(Text)
    created_at = Column(DateTime, server_default=func.now())

    company = relationship("Company", back_populates="filings")

    __table_args__ = (
        Index("ix_filing_date", "filing_date"),
        Index("ix_filing_company", "company_id", "filing_date"),
    )


# ───────────────────────────────────────────
# DISCLOSURE CALENDAR
# ───────────────────────────────────────────

class DisclosureEvent(Base):
    """Corporate disclosure calendar events."""
    __tablename__ = "disclosure_events"

    id = Column(Integer, primary_key=True)
    company_id = Column(Integer, ForeignKey("companies.id"), nullable=False)
    event_date = Column(Date)
    event_date_text = Column(String(50))  # for approximate dates like "~mid-Apr"
    event_type = Column(String(100))  # Earnings, AGM, Trading Update, etc.
    description = Column(Text)
    details = Column(Text)
    ir_url = Column(String(500))
    created_at = Column(DateTime, server_default=func.now())

    company = relationship("Company", back_populates="events")


class HSCode(Base):
    """HS codes for trade data tracking."""
    __tablename__ = "hs_codes"

    id = Column(Integer, primary_key=True)
    code = Column(String(20), nullable=False, unique=True)
    description = Column(String(500), nullable=False)
    category = Column(String(100))
    sub_codes = Column(Text)  # comma-separated or JSON
    tracking_use = Column(Text)
    primary_database = Column(String(200))
    created_at = Column(DateTime, server_default=func.now())


class KeyMetric(Base):
    """Industry key metrics tracking."""
    __tablename__ = "key_metrics"

    id = Column(Integer, primary_key=True)
    metric_name = Column(String(300), nullable=False)
    source_body = Column(String(300))
    current_value = Column(String(300))
    prior_period = Column(String(300))
    trend = Column(String(200))
    last_updated = Column(DateTime)
    notes = Column(Text)
    created_at = Column(DateTime, server_default=func.now())


class Report(Base):
    """Generated report metadata."""
    __tablename__ = "reports"

    id = Column(Integer, primary_key=True)
    report_type = Column(String(50), nullable=False)  # "brief" or "portfolio"
    title = Column(String(500), nullable=False)
    created_by = Column(String(100))
    sections_json = Column(Text)  # JSON of section configs
    created_at = Column(DateTime, server_default=func.now())


# ───────────────────────────────────────────
# ARBITRAGE SIGNALS & ALERTS
# ───────────────────────────────────────────

class ArbitrageSignal(Base):
    """Tracked arbitrage and intelligence signals."""
    __tablename__ = "arbitrage_signals"

    id = Column(Integer, primary_key=True)
    signal_type = Column(String(100), nullable=False)
    company_or_brand = Column(String(200))
    signal_description = Column(Text, nullable=False)
    current_data = Column(Text)
    benchmark = Column(Text)
    insight = Column(Text)
    action = Column(Text)
    severity = Column(String(20), default="medium")  # low, medium, high, critical
    is_active = Column(Boolean, default=True)
    last_updated = Column(DateTime, server_default=func.now(), onupdate=func.now())
    created_at = Column(DateTime, server_default=func.now())


class Alert(Base):
    """System-generated alerts when thresholds are breached."""
    __tablename__ = "alerts"

    id = Column(Integer, primary_key=True)
    alert_type = Column(String(100), nullable=False)
    severity = Column(String(20), default="info")  # info, warning, critical
    title = Column(String(300), nullable=False)
    message = Column(Text)
    data_source = Column(String(100))
    acknowledged = Column(Boolean, default=False)
    acknowledged_at = Column(DateTime)
    created_at = Column(DateTime, server_default=func.now())

    __table_args__ = (
        Index("ix_alert_created", "created_at"),
    )


# ───────────────────────────────────────────
# COLLECTION AUDIT LOG
# ───────────────────────────────────────────

class CollectionLog(Base):
    """Audit trail for data collection runs."""
    __tablename__ = "collection_log"

    id = Column(Integer, primary_key=True)
    collector_name = Column(String(100), nullable=False)
    started_at = Column(DateTime, nullable=False)
    completed_at = Column(DateTime)
    status = Column(String(20), nullable=False)  # running, success, error
    records_added = Column(Integer, default=0)
    records_updated = Column(Integer, default=0)
    error_message = Column(Text)
    created_at = Column(DateTime, server_default=func.now())


# ───────────────────────────────────────────
# DATA SOURCES REGISTRY
# ───────────────────────────────────────────

class DataSource(Base):
    """Registry of all tracked data sources and their status."""
    __tablename__ = "data_sources"

    id = Column(Integer, primary_key=True)
    name = Column(String(200), nullable=False, unique=True)
    category = Column(String(100))  # Trade, Regulatory, Financial, etc.
    url = Column(String(500))
    update_frequency = Column(String(50))  # Daily, Weekly, Monthly, Quarterly, Annual
    automation_tier = Column(Integer)  # 1=full auto, 2=semi-auto, 3=manual
    last_collected = Column(DateTime)
    next_expected = Column(DateTime)
    status = Column(String(20), default="active")  # active, paused, error
    notes = Column(Text)


# ───────────────────────────────────────────
# CATEGORY GRAPH (vertical analysis) — added 2026-06-05
# ───────────────────────────────────────────

class Category(Base):
    """Drinks category as a first-class entity (vodka, gin, tequila…)."""
    __tablename__ = "categories"

    id = Column(Integer, primary_key=True)
    name = Column(String(120), nullable=False, unique=True)
    slug = Column(String(120), unique=True)
    parent = Column(String(120))  # optional super-category, e.g. "Scotch" -> "Whisky"
    description = Column(Text)
    created_at = Column(DateTime, server_default=func.now())


class BrandCategory(Base):
    """Many-to-many link: a brand/expression belongs to one or more categories."""
    __tablename__ = "brand_categories"

    brand_id = Column(Integer, ForeignKey("brands.id"), primary_key=True)
    category_id = Column(Integer, ForeignKey("categories.id"), primary_key=True)
    is_primary = Column(Boolean, default=True)
    created_at = Column(DateTime, server_default=func.now())


# ───────────────────────────────────────────
# DATA → CREATIVE LINK (the keystone) — added 2026-06-05
# ───────────────────────────────────────────

class CreativeBrief(Base):
    """A market signal auto-converted into a creative trigger. Links Know-it → Make-it."""
    __tablename__ = "creative_briefs"

    id = Column(Integer, primary_key=True)
    status = Column(String(40), default="new_signal")  # new_signal, under_review, briefed, archived
    source_signal = Column(String(120))  # e.g. "price_anomaly", "trade_surge"
    brand_id = Column(Integer, ForeignKey("brands.id"))
    category_id = Column(Integer, ForeignKey("categories.id"))
    triggering_data = Column(Text)  # JSON: {"table": [ids], "metric": ..., "change": ...}
    headline = Column(String(300))  # the one-line story
    analyst_summary = Column(Text)
    creative_challenge = Column(Text)  # the brief handed to the studio
    severity = Column(String(20), default="medium")
    created_at = Column(DateTime, server_default=func.now())
    updated_at = Column(DateTime, server_default=func.now(), onupdate=func.now())

    __table_args__ = (Index("ix_brief_status", "status", "created_at"),)


# ───────────────────────────────────────────
# PER-BRAND PRODUCT LAYER (bespoke terminal) — added 2026-06-05
# ───────────────────────────────────────────

class Client(Base):
    """A Liquid client/prospect brand that gets a bespoke terminal view."""
    __tablename__ = "clients"

    id = Column(Integer, primary_key=True)
    name = Column(String(200), nullable=False, unique=True)
    status = Column(String(40), default="prospect")  # prospect, pilot, active
    created_at = Column(DateTime, server_default=func.now())

    template = relationship("BrandTemplate", back_populates="client",
                            uselist=False, cascade="all, delete-orphan")


class BrandTemplate(Base):
    """Config that renders the same platform as a bespoke terminal for one client."""
    __tablename__ = "brand_templates"

    id = Column(Integer, primary_key=True)
    client_id = Column(Integer, ForeignKey("clients.id"), nullable=False, unique=True)
    focus_brand_id = Column(Integer, ForeignKey("brands.id"))
    focus_category_id = Column(Integer, ForeignKey("categories.id"))
    competitor_brand_ids = Column(Text)  # JSON array of brand ids
    focus_markets = Column(Text)  # JSON array, e.g. ["USA","UK","Spain"]
    config = Column(Text)  # JSON: arbitrary view config
    created_at = Column(DateTime, server_default=func.now())

    client = relationship("Client", back_populates="template")


# ───────────────────────────────────────────
# ENGINE & SESSION FACTORY
# ───────────────────────────────────────────

def get_engine(database_url: str):
    return create_engine(database_url, echo=False, pool_pre_ping=True)


def get_session_factory(engine):
    return sessionmaker(bind=engine)


def create_tables(engine):
    Base.metadata.create_all(engine)
