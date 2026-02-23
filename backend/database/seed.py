"""Seed database with existing Liquid Economy tracker data."""

from datetime import date, datetime
from .models import (
    Company, Brand, BrandPrice, Valuation, ArbitrageSignal,
    DataSource, DisclosureEvent, create_tables, get_engine, get_session_factory
)
from .excel_loader import load_additional_data


def seed_companies(session):
    """Seed the 20 tracked companies."""
    companies = [
        {"name": "Diageo", "ticker": "DGE.L", "is_public": True, "market_cap_tier": "Mega-Cap",
         "hq_country": "UK", "fiscal_year_end": "30 June",
         "key_brands": "Johnnie Walker, Don Julio, Guinness, Tanqueray, Smirnoff, Casamigos, Baileys",
         "ir_url": "https://www.diageo.com/investors"},
        {"name": "LVMH", "ticker": "MC.PA", "is_public": True, "market_cap_tier": "Mega-Cap",
         "hq_country": "France", "fiscal_year_end": "31 December",
         "key_brands": "Hennessy, Moët & Chandon, Dom Pérignon, Veuve Clicquot, Glenmorangie, Ardbeg",
         "ir_url": "https://www.lvmh.com/en/investors"},
        {"name": "Pernod Ricard", "ticker": "RI.PA", "is_public": True, "market_cap_tier": "Large-Cap",
         "hq_country": "France", "fiscal_year_end": "30 June",
         "key_brands": "Absolut, Jameson, Chivas Regal, The Glenlivet, Martell, Havana Club",
         "ir_url": "https://www.pernod-ricard.com/en/investors"},
        {"name": "Constellation Brands", "ticker": "STZ", "is_public": True, "market_cap_tier": "Large-Cap",
         "hq_country": "USA", "fiscal_year_end": "28 February",
         "key_brands": "Modelo, Corona, Pacifico, Casa Noble, Kim Crawford",
         "ir_url": "https://ir.cbrands.com/"},
        {"name": "Brown-Forman", "ticker": "BF.B", "is_public": True, "market_cap_tier": "Mid-Cap",
         "hq_country": "USA", "fiscal_year_end": "30 April",
         "key_brands": "Jack Daniel's, Woodford Reserve, Old Forester, Herradura, Diplomático",
         "ir_url": "https://investors.brown-forman.com/"},
        {"name": "Rémy Cointreau", "ticker": "RCO.PA", "is_public": True, "market_cap_tier": "Mid-Cap",
         "hq_country": "France", "fiscal_year_end": "31 March",
         "key_brands": "Rémy Martin, Louis XIII, Cointreau, The Botanist, Bruichladdich",
         "ir_url": "https://www.remy-cointreau.com/en/finance/"},
        {"name": "Campari Group", "ticker": "CPR.MI", "is_public": True, "market_cap_tier": "Mid-Cap",
         "hq_country": "Italy", "fiscal_year_end": "31 December",
         "key_brands": "Campari, Aperol, Wild Turkey, Grand Marnier, SKYY Vodka, Espolòn",
         "ir_url": "https://www.camparigroup.com/en/page/investors"},
        {"name": "AB InBev", "ticker": "ABI.BR", "is_public": True, "market_cap_tier": "Mega-Cap",
         "hq_country": "Belgium", "fiscal_year_end": "31 December",
         "key_brands": "Budweiser, Corona (ex-US), Stella Artois, Michelob Ultra, Beck's",
         "ir_url": "https://www.ab-inbev.com/investors/"},
        {"name": "Heineken", "ticker": "HEIA.AS", "is_public": True, "market_cap_tier": "Mega-Cap",
         "hq_country": "Netherlands", "fiscal_year_end": "31 December",
         "key_brands": "Heineken, Heineken 0.0, Desperados, Birra Moretti, Tiger, Amstel",
         "ir_url": "https://www.theheinekencompany.com/investors"},
        {"name": "Molson Coors", "ticker": "TAP", "is_public": True, "market_cap_tier": "Large-Cap",
         "hq_country": "USA", "fiscal_year_end": "31 December",
         "key_brands": "Coors Light, Miller Lite, Blue Moon, Madri Excepcional",
         "ir_url": "https://ir.molsoncoors.com/"},
        {"name": "Becle", "ticker": "CUERVO.MX", "is_public": True, "market_cap_tier": "Mid-Cap",
         "hq_country": "Mexico", "fiscal_year_end": "31 December",
         "key_brands": "Jose Cuervo, 1800, Bushmills, Kraken, Pendleton",
         "ir_url": "https://www.ircuervo.com/investors/"},
        {"name": "Treasury Wine Estates", "ticker": "TWE.AX", "is_public": True, "market_cap_tier": "Mid-Cap",
         "hq_country": "Australia", "fiscal_year_end": "30 June",
         "key_brands": "Penfolds, 19 Crimes, Wolf Blass, DAOU, Frank Family",
         "ir_url": "https://www.tweglobal.com/investors"},
        {"name": "Suntory Beverage & Food", "ticker": "2587.T", "is_public": True, "market_cap_tier": "Large-Cap",
         "hq_country": "Japan", "fiscal_year_end": "31 December",
         "key_brands": "Boss Coffee, Orangina, Lucozade (spirits under private parent)",
         "ir_url": "https://www.suntory.com/softdrink/ir/"},
        {"name": "MGP Ingredients", "ticker": "MGPI", "is_public": True, "market_cap_tier": "Small-Cap",
         "hq_country": "USA", "fiscal_year_end": "31 December",
         "key_brands": "George Remus, Rossville Union, Luxco portfolio, contract distilling",
         "ir_url": "https://ir.mgpingredients.com/"},
        # Private companies
        {"name": "Edrington", "ticker": None, "is_public": False, "market_cap_tier": None,
         "hq_country": "UK", "fiscal_year_end": "31 March",
         "key_brands": "The Macallan, Highland Park, The Glenrothes, Brugal, Famous Grouse",
         "ir_url": "https://www.edrington.com/en/reporting"},
        {"name": "Bacardi", "ticker": None, "is_public": False, "market_cap_tier": None,
         "hq_country": "Bermuda", "fiscal_year_end": "31 March",
         "key_brands": "Bacardi, Grey Goose, Patrón, Bombay Sapphire, Dewar's",
         "ir_url": None},
        {"name": "William Grant & Sons", "ticker": None, "is_public": False, "market_cap_tier": None,
         "hq_country": "UK", "fiscal_year_end": "31 December",
         "key_brands": "Glenfiddich, The Balvenie, Hendrick's, Monkey Shoulder, Sailor Jerry",
         "ir_url": None},
        {"name": "Suntory Holdings", "ticker": None, "is_public": False, "market_cap_tier": None,
         "hq_country": "Japan", "fiscal_year_end": "31 December",
         "key_brands": "Yamazaki, Hibiki, Roku Gin, Jim Beam, Maker's Mark, Knob Creek",
         "ir_url": None},
        {"name": "Proximo Spirits", "ticker": None, "is_public": False, "market_cap_tier": None,
         "hq_country": "USA", "fiscal_year_end": "31 December",
         "key_brands": "Jose Cuervo (US dist.), 1800, Bushmills, Three Olives, Kraken",
         "ir_url": None},
        {"name": "Sazerac", "ticker": None, "is_public": False, "market_cap_tier": None,
         "hq_country": "USA", "fiscal_year_end": "31 December",
         "key_brands": "Buffalo Trace, Pappy Van Winkle, Fireball, Southern Comfort",
         "ir_url": None},
    ]

    for c in companies:
        session.add(Company(**c))
    session.flush()
    print(f"  Seeded {len(companies)} companies")


def seed_brands_and_prices(session):
    """Seed brand pricing data from our tracker."""
    # Map company names to IDs
    companies = {c.name: c.id for c in session.query(Company).all()}

    brand_data = [
        # (company, brand, expression, category, size, usa, uk, eu, me, notes)
        ("Diageo", "Johnnie Walker", "Black Label 12yr", "Blended Scotch", "70cl", 41, 25, 28, 32, ""),
        ("Diageo", "Johnnie Walker", "Blue Label", "Blended Scotch", "70cl", 185, 140, 155, 130, "Dubai DF cheapest"),
        ("Diageo", "Don Julio", "Blanco", "Tequila", "70cl", 52, 50, 58, 48, ""),
        ("Diageo", "Don Julio", "Reposado", "Tequila", "70cl", 72, 55, 63, 50, ""),
        ("Diageo", "Don Julio", "1942", "Tequila Añejo", "70cl", 155, 130, 145, 120, "Ultra-premium"),
        ("Diageo", "Tanqueray", "London Dry Gin", "Gin", "70cl", 22, 18, 20, 18, ""),
        ("Diageo", "Smirnoff", "No. 21 Vodka", "Vodka", "70cl", 15, 14, 13, 12, "Value tier"),
        ("Diageo", "Guinness", "Draught Stout (6pk)", "Beer/Stout", "6x440ml", 11, 7, 8, 14, "UAE import premium"),
        ("Diageo", "Casamigos", "Blanco", "Tequila", "70cl", 48, 42, 50, 40, "Celebrity brand"),
        ("LVMH", "Hennessy", "VS", "Cognac", "70cl", 44, 40, 48, 40, ""),
        ("LVMH", "Hennessy", "VSOP", "Cognac", "70cl", 66, 52, 70, 65, ""),
        ("LVMH", "Hennessy", "XO", "Cognac", "70cl", 225, 165, 185, 155, "Ultra-premium; Dubai DF best value"),
        ("LVMH", "Moët & Chandon", "Impérial Brut NV", "Champagne", "75cl", 52, 37, 45, 42, "UK £35-40; EU ~€45"),
        ("LVMH", "Dom Pérignon", "Vintage 2015", "Champagne", "75cl", 300, 195, 225, 195, "US $290-320 retail"),
        ("LVMH", "Glenmorangie", "Original 10yr", "Single Malt", "70cl", 38, 32, 35, 30, ""),
        ("LVMH", "Ardbeg", "Ten", "Islay Single Malt", "70cl", 55, 48, 52, 42, "Cult following"),
        ("Pernod Ricard", "Absolut", "Original Vodka", "Vodka", "70cl", 22, 18, 17, 18, ""),
        ("Pernod Ricard", "Jameson", "Original", "Irish Whiskey", "70cl", 24, 23, 22, 20, "Flat global pricing"),
        ("Pernod Ricard", "Chivas Regal", "12yr", "Blended Scotch", "70cl", 32, 25, 28, 24, ""),
        ("Pernod Ricard", "The Glenlivet", "12yr", "Single Malt", "70cl", 42, 30, 35, 28, ""),
        ("Pernod Ricard", "Martell", "VS", "Cognac", "70cl", 30, 28, 30, 26, "Competes with Hennessy VS"),
        ("Constellation Brands", "Modelo Especial", "Lager (12pk)", "Beer", "12x355ml", 18, 22, 20, 28, "US #1 beer"),
        ("Constellation Brands", "Corona Extra", "Lager (6pk)", "Beer", "6x330ml", 10, 7, 9, 12, ""),
        ("Brown-Forman", "Jack Daniel's", "Old No. 7", "Tennessee Whiskey", "70cl", 26, 22, 27, 34, "UAE import premium"),
        ("Brown-Forman", "Woodford Reserve", "Distiller's Select", "Bourbon", "70cl", 35, 30, 33, 35, ""),
        ("Rémy Cointreau", "Rémy Martin", "VSOP", "Cognac", "70cl", 52, 40, 45, 40, ""),
        ("Rémy Cointreau", "Cointreau", "Original", "Orange Liqueur", "70cl", 32, 22, 25, 22, "Cocktail staple"),
        ("Campari Group", "Aperol", "Aperitivo", "Aperitif", "70cl", 28, 16, 15, 24, "Italy cheapest"),
        ("Campari Group", "Campari", "Bitter", "Bitter", "70cl", 28, 22, 15, 22, ""),
        ("Campari Group", "Wild Turkey", "101 Bourbon", "Bourbon", "70cl", 26, 28, 30, 28, ""),
        ("Campari Group", "Espolòn", "Blanco", "Tequila", "70cl", 28, 25, 28, 24, "Fast-growing"),
        ("Edrington", "The Macallan", "12yr Sherry Oak", "Single Malt", "70cl", 100, 80, 115, 95, "EUR highest"),
        ("Edrington", "Highland Park", "12yr Viking Honour", "Single Malt", "70cl", 48, 35, 40, 35, ""),
        ("Suntory Holdings", "Jim Beam", "White Label", "Bourbon", "70cl", 16, 17, 16, 14, "Value bourbon"),
        ("Suntory Holdings", "Maker's Mark", "Original", "Bourbon", "70cl", 30, 28, 30, 26, ""),
        ("Suntory Holdings", "Roku", "Gin", "Japanese Gin", "70cl", 28, 26, 25, 24, "Growing category"),
        ("Bacardi", "Bacardi", "Superior White", "Rum", "70cl", 14, 15, 13, 12, "Entry-level"),
        ("Bacardi", "Grey Goose", "Original", "Vodka", "70cl", 33, 33, 38, 32, "Premium vodka"),
        ("Bacardi", "Patrón", "Silver", "Tequila", "70cl", 42, 38, 42, 35, "Competes with Don Julio"),
        ("Becle", "Jose Cuervo", "Especial Gold", "Tequila", "70cl", 22, 20, 22, 18, "Mass-market"),
        ("Becle", "1800", "Reposado", "Tequila", "70cl", 32, 30, 34, 28, "Mid-premium"),
    ]

    for row in brand_data:
        co, brand_name, expr, cat, size, usa, uk, eu, me, notes = row
        brand = Brand(
            company_id=companies[co],
            brand_name=brand_name,
            expression=expr,
            category=cat,
            size=size,
        )
        session.add(brand)
        session.flush()

        price = BrandPrice(
            brand_id=brand.id,
            price_usa=usa, price_uk=uk, price_eu=eu, price_me=me,
            source="Liquid Economy Tracker v2",
            notes=notes,
            effective_date=date(2026, 2, 1),
        )
        session.add(price)

    print(f"  Seeded {len(brand_data)} brands with pricing")


def seed_valuations(session):
    """Seed baseline Feb 2026 valuations."""
    companies = {c.name: c.id for c in session.query(Company).all()}

    vals = [
        # (company, price, currency, eps_ttm, pe_ttm, pe_fwd, div_yield, mcap)
        ("Diageo", 2638, "GBp", 118.7, 16.8, 15.4, 0.034, 55.8e9),
        ("LVMH", 592, "EUR", 30.3, 19.5, 18.2, 0.022, 334e9),
        ("Pernod Ricard", 89.5, "EUR", 5.93, 15.1, 14.3, 0.054, 21.5e9),
        ("Constellation Brands", 185, "USD", 7.23, 25.6, 20.1, 0.018, 27.1e9),
        ("Brown-Forman", 33.8, "USD", 2.0, 16.9, 18.5, 0.034, 13.9e9),
        ("Rémy Cointreau", 52.6, "EUR", 2.52, 20.9, 19.0, 0.028, 2.3e9),
        ("Campari Group", 5.88, "EUR", 0.241, 24.4, 20.8, 0.012, 8.9e9),
        ("AB InBev", 54.3, "EUR", 2.84, 19.1, 18.6, 0.013, 153e9),
        ("Heineken", 72.8, "EUR", 3.47, 21.0, 15.0, 0.026, 50e9),
        ("Molson Coors", 54.2, "USD", -2.58, None, 8.8, 0.034, 10e9),
        ("Becle", 21.5, "MXN", 2.53, 8.5, 12.2, 0.028, 4.2e9),
        ("Treasury Wine Estates", 10.2, "AUD", 0.42, 24.3, 17.9, 0.032, 4.1e9),
        ("Suntory Beverage & Food", 4850, "JPY", 222, 21.8, 19.5, 0.021, 9.8e9),
        ("MGP Ingredients", 25.9, "USD", -1.2, None, None, 0.031, 550e6),
    ]

    for row in vals:
        co, price, curr, eps, pe, pe_fwd, div_y, mcap = row
        if co in companies:
            session.add(Valuation(
                company_id=companies[co],
                date=date(2026, 2, 1),
                share_price=price,
                currency=curr,
                eps_ttm=eps,
                pe_ttm=pe,
                pe_forward=pe_fwd,
                dividend_yield=div_y,
                market_cap=mcap,
            ))

    print(f"  Seeded {len(vals)} baseline valuations")


def seed_data_sources(session):
    """Seed the data source registry."""
    sources = [
        ("USITC DataWeb", "Trade", "https://dataweb.usitc.gov/", "Monthly", 1),
        ("SEC EDGAR", "Financial", "https://www.sec.gov/cgi-bin/browse-edgar", "Daily", 1),
        ("BLS PPI (Glass)", "Supply Chain", "https://data.bls.gov/", "Monthly", 1),
        ("UK Companies House", "Financial", "https://find-and-update.company-information.service.gov.uk/", "Weekly", 1),
        ("Yahoo Finance", "Financial", "https://finance.yahoo.com/", "Daily", 1),
        ("Eurostat Comext", "Trade", "https://ec.europa.eu/eurostat/comext/", "Monthly", 1),
        ("HMRC Alcohol Bulletin", "Trade", "https://www.gov.uk/government/statistics/alcohol-bulletin", "Quarterly", 2),
        ("TTB Production Reports", "Regulatory", "https://www.ttb.gov/statistics", "Monthly", 2),
        ("TTB COLA Registry", "Regulatory", "https://www.ttb.gov/cola/", "Weekly", 2),
        ("FAOSTAT", "Macro", "https://www.fao.org/faostat/", "Annual", 2),
        ("ImportYeti", "Supply Chain", "https://www.importyeti.com/", "Weekly", 2),
        ("Sotheby's Wine/Spirits", "Auction", "https://www.sothebys.com/", "Monthly", 3),
        ("Christie's Wine/Spirits", "Auction", "https://www.christies.com/", "Monthly", 3),
        ("Dubai Duty Free", "Travel Retail", "https://www.dubaidutyfree.com/", "Annual", 3),
        ("OIV", "Macro", "https://www.oiv.int/", "Annual", 3),
        ("Moodie Davitt Report", "Travel Retail", "https://www.moodiereport.com/", "Weekly", 3),
        ("RW101 Apex Index", "Auction", "https://www.rw101.com/", "Monthly", 3),
        ("WSTA", "Trade", "https://www.wsta.co.uk/", "Quarterly", 3),
        ("spiritsEUROPE", "Trade", "https://spirits.eu/", "Annual", 3),
        ("Bayanat.ae", "Trade", "https://bayanat.ae/", "Quarterly", 2),
        ("ZATCA (Saudi)", "Trade", "https://zatca.gov.sa/", "Quarterly", 2),
    ]

    for name, cat, url, freq, tier in sources:
        session.add(DataSource(
            name=name, category=cat, url=url,
            update_frequency=freq, automation_tier=tier,
        ))

    print(f"  Seeded {len(sources)} data sources")


def seed_arbitrage_signals(session):
    """Seed the 20 arbitrage signals from our tracker."""
    signals = [
        ("Valuation Gap", "Becle (CUERVO.MX)", "P/E of 8.5x vs sector avg ~20x", "high"),
        ("Valuation Gap", "Brown-Forman (BF.B)", "P/E of 16.9x — lowest US spirits", "medium"),
        ("Valuation Gap", "Pernod Ricard (RI.PA)", "P/E of 15.1x — cheapest major EU spirits", "medium"),
        ("Valuation Gap", "Molson Coors (TAP)", "Fwd P/E 8.8x — cheapest in coverage", "high"),
        ("Price Arbitrage", "Hennessy XO", "Dubai DF $155 vs USA $225 (31% cheaper)", "medium"),
        ("Price Arbitrage", "Jack Daniel's Old No.7", "Dubai $34 vs USA $26 (31% premium)", "low"),
        ("Price Arbitrage", "Aperol", "Italy €15 vs USA $28 (87% premium)", "medium"),
        ("Price Arbitrage", "Don Julio Blanco", "Narrow spread across 4 markets", "low"),
        ("Earnings Signal", "Diageo (DGE.L)", "H1 results 25 Feb — catalyst imminent", "high"),
        ("Earnings Signal", "Heineken (HEIA.AS)", "6,000 job cuts + CEO departure", "medium"),
        ("Earnings Signal", "MGP Ingredients (MGPI)", "Negative EPS; stock down 57% in 12m", "high"),
        ("Category Signal", "No/Low Alcohol", "+13% volume growth; 61M new consumers", "medium"),
        ("Category Signal", "Tequila/Agave", "Agave oversupply depressing input costs", "medium"),
        ("Distribution Signal", "Proximo Spirits", "Left RNDC nationwide Jan 2026", "high"),
        ("Health Disruptor", "GLP-1 / Semaglutide", "7% UK adults on GLP-1; 23% drink less", "critical"),
        ("Regulatory Disruptor", "EU PPWR Packaging", "Binding 12 Aug 2026 — compliance deadline", "critical"),
        ("Climate Supply Risk", "Wine, Barley, Sugarcane", "France wine -16%; California -23%; barley -40%", "high"),
        ("Brand Equity Signal", "Secondary Auction Market", "Sotheby's $127.5M; RW101 Apex +403%", "medium"),
        ("Creator Brand Shift", "Teremana, Wolfie's", "Spirits VIT avg 26,000 vs Beauty 687K", "medium"),
        ("Tech Disruptor", "AI + Blockchain", "AI in F&B market: $29.94B by 2026", "medium"),
    ]

    for stype, company, desc, severity in signals:
        session.add(ArbitrageSignal(
            signal_type=stype,
            company_or_brand=company,
            signal_description=desc,
            severity=severity,
        ))

    print(f"  Seeded {len(signals)} arbitrage signals")


def run_seed(database_url: str):
    """Run the full seed."""
    engine = get_engine(database_url)
    create_tables(engine)
    Session = get_session_factory(engine)
    session = Session()

    try:
        # Check if already seeded
        if session.query(Company).count() > 0:
            print("Database already seeded. Loading additional data if needed...")
            load_additional_data(session)
            session.commit()
            return

        print("Seeding Liquid Economy database...")
        seed_companies(session)
        seed_brands_and_prices(session)
        seed_valuations(session)
        seed_data_sources(session)
        seed_arbitrage_signals(session)
        load_additional_data(session)
        session.commit()
        print("Seed complete!")
    except Exception as e:
        session.rollback()
        print(f"Seed failed: {e}")
        raise
    finally:
        session.close()


if __name__ == "__main__":
    from config import get_settings
    settings = get_settings()
    run_seed(settings.database_url)
