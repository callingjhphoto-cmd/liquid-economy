"""Yahoo Finance collector — daily stock prices and P/E ratios."""

import logging
from datetime import date, datetime
import yfinance as yf
from sqlalchemy.orm import Session
from database.models import Company, Valuation, Alert
from .base import BaseCollector

logger = logging.getLogger(__name__)

# Map our tickers to Yahoo Finance symbols
TICKER_MAP = {
    "DGE.L": "DGE.L",        # Diageo (London)
    "MC.PA": "MC.PA",         # LVMH (Paris)
    "RI.PA": "RI.PA",         # Pernod Ricard (Paris)
    "STZ": "STZ",             # Constellation Brands (NYSE)
    "BF.B": "BF-B",           # Brown-Forman (NYSE, dash in Yahoo)
    "RCO.PA": "RCO.PA",       # Rémy Cointreau (Paris)
    "CPR.MI": "CPR.MI",       # Campari (Milan)
    "ABI.BR": "ABI.BR",       # AB InBev (Brussels)
    "HEIA.AS": "HEIA.AS",     # Heineken (Amsterdam)
    "TAP": "TAP",             # Molson Coors (NYSE)
    "CUERVO.MX": "CUERVO.MX", # Becle (Mexico)
    "TWE.AX": "TWE.AX",       # Treasury Wine Estates (ASX)
    "2587.T": "2587.T",       # Suntory B&F (Tokyo)
    "MGPI": "MGPI",           # MGP Ingredients (NASDAQ)
}

# P/E alert thresholds
PE_LOW_THRESHOLD = 10.0   # Potentially undervalued
PE_HIGH_THRESHOLD = 30.0  # Potentially overvalued
PRICE_CHANGE_ALERT = 0.05  # 5% daily move


class YahooFinanceCollector(BaseCollector):
    name = "yahoo_finance"

    async def collect(self):
        """Pull current prices and valuations for all public companies."""
        today = date.today()

        companies = (
            self.session.query(Company)
            .filter(Company.is_public == True, Company.ticker.isnot(None))
            .all()
        )

        for company in companies:
            try:
                yahoo_ticker = TICKER_MAP.get(company.ticker, company.ticker)
                await self._collect_company(company, yahoo_ticker, today)
            except Exception as e:
                logger.warning(f"Failed to collect {company.name}: {e}")
                continue

    async def _collect_company(self, company: Company, yahoo_ticker: str, today: date):
        """Collect data for a single company."""
        ticker = yf.Ticker(yahoo_ticker)
        info = ticker.info

        if not info or "currentPrice" not in info:
            logger.warning(f"No data for {yahoo_ticker}")
            return

        share_price = info.get("currentPrice") or info.get("regularMarketPrice")
        eps_ttm = info.get("trailingEps")
        pe_ttm = info.get("trailingPE")
        pe_forward = info.get("forwardPE")
        dividend_yield = info.get("dividendYield")
        market_cap = info.get("marketCap")
        volume = info.get("volume")

        # Determine currency from exchange
        currency = info.get("currency", "USD")

        # Check if we already have today's data
        existing = (
            self.session.query(Valuation)
            .filter(Valuation.company_id == company.id, Valuation.date == today)
            .first()
        )

        if existing:
            existing.share_price = share_price
            existing.eps_ttm = eps_ttm
            existing.pe_ttm = pe_ttm
            existing.pe_forward = pe_forward
            existing.dividend_yield = dividend_yield
            existing.market_cap = market_cap
            existing.volume = volume
            existing.currency = currency
            self.records_updated += 1
        else:
            self.session.add(Valuation(
                company_id=company.id,
                date=today,
                share_price=share_price,
                currency=currency,
                eps_ttm=eps_ttm,
                pe_ttm=pe_ttm,
                pe_forward=pe_forward,
                dividend_yield=dividend_yield,
                market_cap=market_cap,
                volume=volume,
            ))
            self.records_added += 1

        # Generate alerts
        await self._check_alerts(company, share_price, pe_ttm, pe_forward, today)

        logger.info(
            f"  {company.name}: {currency} {share_price}, "
            f"P/E={pe_ttm or 'N/A'}, Fwd={pe_forward or 'N/A'}"
        )

    async def _check_alerts(self, company, price, pe_ttm, pe_forward, today):
        """Generate alerts when thresholds are breached."""
        # Check for extreme P/E
        pe = pe_ttm or pe_forward
        if pe and pe < PE_LOW_THRESHOLD:
            self.session.add(Alert(
                alert_type="valuation_low",
                severity="warning",
                title=f"{company.name} P/E below {PE_LOW_THRESHOLD}x",
                message=f"Current P/E: {pe:.1f}x. May indicate deep undervaluation or earnings issues.",
                data_source="yahoo_finance",
            ))

        if pe and pe > PE_HIGH_THRESHOLD:
            self.session.add(Alert(
                alert_type="valuation_high",
                severity="info",
                title=f"{company.name} P/E above {PE_HIGH_THRESHOLD}x",
                message=f"Current P/E: {pe:.1f}x. Premium valuation — verify growth justification.",
                data_source="yahoo_finance",
            ))

        # Check for significant daily price move
        prev = (
            self.session.query(Valuation)
            .filter(Valuation.company_id == company.id, Valuation.date < today)
            .order_by(Valuation.date.desc())
            .first()
        )

        if prev and prev.share_price and price:
            change = (price - prev.share_price) / prev.share_price
            if abs(change) >= PRICE_CHANGE_ALERT:
                direction = "up" if change > 0 else "down"
                self.session.add(Alert(
                    alert_type="price_move",
                    severity="warning",
                    title=f"{company.name} {direction} {abs(change)*100:.1f}%",
                    message=f"Price moved from {prev.share_price} to {price} ({direction} {abs(change)*100:.1f}%).",
                    data_source="yahoo_finance",
                ))
