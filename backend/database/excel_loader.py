"""Load additional data into the database (Disclosure Calendar, Key Metrics, HS Codes)."""

from datetime import datetime, date
from dateutil.parser import parse as parse_date
from .models import Company, DisclosureEvent, KeyMetric, HSCode


def parse_event_date(date_text):
    """
    Parse event date from text like '7 Jan', '~mid-Apr', 'N/A'.
    Returns (event_date, event_date_text) tuple.
    - Exact dates (e.g., '7 Jan') → parse as 2026 dates
    - Approximate dates (starting with ~) → store as event_date_text, None for event_date
    - 'N/A' → (None, None)
    """
    if not date_text or date_text.strip() == '' or date_text.strip() == 'N/A':
        return None, None

    date_text = date_text.strip()

    if date_text.startswith('~'):
        # Approximate date like "~mid-Apr" or "~late Jul"
        return None, date_text

    try:
        # Try to parse as a date in 2026
        parsed = parse_date(date_text, default=date(2026, 1, 1))
        return parsed.date(), None
    except:
        # If parsing fails, treat as approximate
        return None, date_text


def extract_company_name(full_name):
    """
    Extract base company name from full name like 'Becle (Jose Cuervo)' or 'Edrington (The Macallan)'.
    Returns the base company name.
    """
    if '(' in full_name:
        return full_name.split('(')[0].strip()
    return full_name.strip()


def load_additional_data(session):
    """
    Seed Disclosure Calendar events, Key Metrics, and HS Codes into the database.
    This function is idempotent - it checks before inserting.
    """

    # Load company mapping (by name)
    companies = {c.name: c for c in session.query(Company).all()}

    # ─────────────────────────────────────────
    # SEED HS CODES
    # ─────────────────────────────────────────
    hs_code_data = [
        {
            "code": "2203",
            "description": "Beer made from malt",
            "category": "Beer",
            "sub_codes": "2203.00 (all malt beer)",
            "tracking_use": "Track total beer import volumes by origin",
            "primary_database": "USITC, Eurostat"
        },
        {
            "code": "2204",
            "description": "Wine of fresh grapes (incl. fortified)",
            "category": "Wine",
            "sub_codes": "2204.10 (Sparkling), 2204.21 (≤2L containers)",
            "tracking_use": "Sparkling vs. still wine split; container size = premium proxy",
            "primary_database": "USITC, Eurostat"
        },
        {
            "code": "2206",
            "description": "Other fermented beverages (cider, perry, mead)",
            "category": "RTD / Cider",
            "sub_codes": "2206.00.90.15 (aluminum cans)",
            "tracking_use": "Hard seltzer / RTD growth quantification",
            "primary_database": "USITC"
        },
        {
            "code": "2208",
            "description": "Spirits & liqueurs (<80% ABV)",
            "category": "Spirits",
            "sub_codes": "2208.30 (Whisky), .40 (Rum), .70 (Liqueurs), .90 (Tequila/Mezcal)",
            "tracking_use": "Category-level spirits tracking; agave import surge",
            "primary_database": "USITC, Eurostat"
        },
        {
            "code": "2202",
            "description": "Non-alcoholic beverages",
            "category": "No/Low",
            "sub_codes": "2202.91 (NA beer), 2202.99 (NA spirits, functional)",
            "tracking_use": "No/Low category growth; functional beverage penetration",
            "primary_database": "USITC, Eurostat"
        },
    ]

    for hs_data in hs_code_data:
        # Check if already exists
        existing = session.query(HSCode).filter_by(code=hs_data["code"]).first()
        if not existing:
            session.add(HSCode(**hs_data))

    session.flush()
    print(f"  Loaded {len(hs_code_data)} HS codes")

    # ─────────────────────────────────────────
    # SEED KEY METRICS
    # ─────────────────────────────────────────
    key_metrics_data = [
        {"metric_name": "Global TBA Volume Change", "source_body": "IWSR / Industry consensus", "current_value": "-1% (2024)", "prior_period": "-0.5% (2023)", "trend": "Declining", "notes": "Total beverage alcohol"},
        {"metric_name": "Global TBA Revenue Change", "source_body": "IWSR / Industry consensus", "current_value": "+1% (2024)", "prior_period": "+2% (2023)", "trend": "Slowing growth", "notes": "Volume down, value up = premiumization"},
        {"metric_name": "Diageo Organic Net Sales Growth", "source_body": "Diageo FY2025", "current_value": "+1.7%", "prior_period": "+0.6% (FY2024)", "trend": "Recovering", "notes": "Driven by Don Julio, Guinness"},
        {"metric_name": "Diageo Price/Mix", "source_body": "Diageo FY2025", "current_value": "+0.8%", "prior_period": "+4.8% (FY2024)", "trend": "Normalizing", "notes": "Still positive = premiumization holds"},
        {"metric_name": "US Wine Volume Growth", "source_body": "SVB Report", "current_value": "-1% to -3%", "prior_period": "-2% (2023)", "trend": "Structural decline", "notes": "Demographic shift away from wine"},
        {"metric_name": "US Spirits Volume Growth", "source_body": "DISCUS", "current_value": "+0.3%", "prior_period": "+3.1% (2022)", "trend": "Slowing sharply", "notes": "First year of near-zero growth since 2003"},
        {"metric_name": "US Beer Volume Growth", "source_body": "NBWA / Beer Institute", "current_value": "-1.5%", "prior_period": "-3.1% (2023)", "trend": "Decline moderating", "notes": "Craft and imports hold; mainstream declining"},
        {"metric_name": "Total US Alcohol Tax Revenue", "source_body": "TTB / IRS", "current_value": "~$37B (est. 2025)", "prior_period": "$35.9B (2023)", "trend": "Stable", "notes": "Federal excise tax"},
        {"metric_name": "China Baijiu Market Growth", "source_body": "Kweichow Moutai / NBS", "current_value": "+3.2% (2024)", "prior_period": "+6% (2022)", "trend": "Cooling", "notes": "$180B market"},
        {"metric_name": "India IMFL Growth Rate", "source_body": "ISWAI / CIABC", "current_value": "+7% (2024)", "prior_period": "+8% (2023)", "trend": "Strong", "notes": "World's 2nd largest spirits market by volume"},
        {"metric_name": "Pernod India Net Sales Growth", "source_body": "Pernod Ricard India", "current_value": "+11% (H1 FY26)", "prior_period": "+14% (FY2025)", "trend": "Cooling", "notes": "India is 10% of group revenue"},
        {"metric_name": "Heineken Volume Growth", "source_body": "Heineken NV", "current_value": "+0.6% (FY2025)", "prior_period": "+0.3% (FY2024)", "trend": "Flat", "notes": "Organic beer volume growth was flat"},
        {"metric_name": "No/Low Alcohol Growth", "source_body": "IWSR / BMC", "current_value": "+13% volume (2024)", "prior_period": "+10% (2023)", "trend": "Accelerating", "notes": "61M new consumers tried NA in 2024"},
        {"metric_name": "GLP-1 Impact on Alcohol", "source_body": "UCL / Zepbound data", "current_value": "7% UK adults on GLP-1", "prior_period": "N/A", "trend": "New risk", "notes": "23% reduction in drinking frequency"},
        {"metric_name": "Agave Spot Price", "source_body": "CRT / Reuters", "current_value": "3.2 MXN/kg (2025)", "prior_period": "32 MXN/kg (2022)", "trend": "Collapsed 90%", "notes": "Historic oversupply"},
        {"metric_name": "BLS PPI: Glass Containers", "source_body": "BLS PCU327213327213", "current_value": "124.1 (Dec 2024)", "prior_period": "120.4 (Dec 2023)", "trend": "+3.1% YoY", "notes": "Input cost pressure for bottles"},
        {"metric_name": "BLS PPI: Distillery Products", "source_body": "BLS PCU312140312140", "current_value": "117.5 (Dec 2024)", "prior_period": "114.4 (Dec 2023)", "trend": "+2.7% YoY", "notes": "Spirits input cost tracking"},
        {"metric_name": "BLS PPI: Winery Products", "source_body": "BLS PCU312130312130", "current_value": "108.1 (Jan 2025)", "prior_period": "108.2 (Dec 2024)", "trend": "Flat MoM", "notes": "Stable wine production costs"},
        {"metric_name": "BLS PPI: Aluminum Sheet", "source_body": "BLS PCU331315331315", "current_value": "142.8 (Jan 2025)", "prior_period": "145.4 (Dec 2024)", "trend": "-1.8% MoM", "notes": "Cans cost moderating"},
        {"metric_name": "BLS PPI: Barley", "source_body": "BLS WPU01230101", "current_value": "112.1 (Dec 2024)", "prior_period": "116.5 (Dec 2023)", "trend": "-3.8% YoY", "notes": "Beer input cost falling"},
        {"metric_name": "BLS PPI: Malt Beverage", "source_body": "BLS PCU312120312120", "current_value": "122.1 (Dec 2024)", "prior_period": "121.2 (Dec 2023)", "trend": "+0.7% YoY", "notes": "Moderate beer cost inflation"},
        {"metric_name": "France Wine Production", "source_body": "OIV / FranceAgriMer", "current_value": "-16% (2024 vs 2023)", "prior_period": "46M hl (2023)", "trend": "Severe drop", "notes": "Frost + drought in Bordeaux"},
        {"metric_name": "California Wine Production", "source_body": "USDA NASS", "current_value": "-23% (2024 grape crush)", "prior_period": "3.4M tons (2023)", "trend": "Historic decline", "notes": "2nd year of major decline"},
        {"metric_name": "Global Wine Production", "source_body": "OIV", "current_value": "229 Mhl (2024 est.)", "prior_period": "244 Mhl (2023)", "trend": "-6.2%", "notes": "Lowest since 1960"},
        {"metric_name": "Barley Production (Global)", "source_body": "FAO / USDA", "current_value": "~140M tons (2024)", "prior_period": "147M tons (2023)", "trend": "-4.8%", "notes": "Weather disruption"},
        {"metric_name": "UK Alcohol Duty Receipts", "source_body": "HMRC", "current_value": "£12.3B (FY2024-25 est.)", "prior_period": "£12.0B (FY2023-24)", "trend": "+2.5%", "notes": "New progressive duty system"},
        {"metric_name": "US Spirits Imports (HS 2208)", "source_body": "USITC", "current_value": "$12.1B (2024)", "prior_period": "$11.7B (2023)", "trend": "+3.4%", "notes": "Value up despite flat volume"},
        {"metric_name": "US Wine Imports (HS 2204)", "source_body": "USITC", "current_value": "$5.9B (2024)", "prior_period": "$6.2B (2023)", "trend": "-4.8%", "notes": "Declining wine imports"},
        {"metric_name": "US Beer Imports (HS 2203)", "source_body": "USITC", "current_value": "$7.1B (2024)", "prior_period": "$6.8B (2023)", "trend": "+4.4%", "notes": "Modelo/Corona strong"},
        {"metric_name": "EU Spirits Exports", "source_body": "Eurostat / spiritsEUROPE", "current_value": "€14.1B (2024)", "prior_period": "€14.4B (2023)", "trend": "-2.1%", "notes": "Cognac to US -18% (tariff fears)"},
        {"metric_name": "Sector Avg P/E (TTM)", "source_body": "Palmer Liquid Studios", "current_value": "18.3x", "prior_period": "19.1x (Dec 2024)", "trend": "Contracting", "notes": "Excluding negative EPS (Molson, MGP)"},
        {"metric_name": "Sector Avg Dividend Yield", "source_body": "Palmer Liquid Studios", "current_value": "2.7%", "prior_period": "2.5% (Dec 2024)", "trend": "Expanding", "notes": "Diageo 3.4%, Pernod 5.4%"},
        {"metric_name": "TTB New COLA Approvals", "source_body": "TTB", "current_value": "195,000 (CY2024 est.)", "prior_period": "189,000 (CY2023)", "trend": "+3.2%", "notes": "New product launches"},
        {"metric_name": "Dubai Duty Free Alcohol Sales", "source_body": "DDF Annual Report", "current_value": "$590M (2024)", "prior_period": "$565M (2023)", "trend": "+4.4%", "notes": "Travel retail bellwether"},
        {"metric_name": "Sotheby's Wine/Spirits Auction", "source_body": "Sotheby's", "current_value": "$127.5M (2024)", "prior_period": "$142M (2023)", "trend": "-10.2%", "notes": "Asian collectors cautious"},
        {"metric_name": "RW101 Apex 1000 Index", "source_body": "RW101", "current_value": "403% (10yr return)", "prior_period": "370% (2023)", "trend": "Still strong", "notes": "Ultra-premium whisky"},
        {"metric_name": "MGP Ingredients Revenue", "source_body": "MGPI", "current_value": "-18% (FY2024)", "prior_period": "$748M (FY2023)", "trend": "Severe decline", "notes": "Aged whiskey inventory write-down"},
        {"metric_name": "Constellation Brands Beer Depletion Growth", "source_body": "STZ", "current_value": "+5.2% (Q2 FY26)", "prior_period": "+6.4% (Q1 FY26)", "trend": "Slowing", "notes": "Modelo still #1 US beer"},
    ]

    for metric_data in key_metrics_data:
        # Check if already exists (by metric_name, to avoid duplicates)
        existing = session.query(KeyMetric).filter_by(metric_name=metric_data["metric_name"]).first()
        if not existing:
            session.add(KeyMetric(**metric_data))

    session.flush()
    print(f"  Loaded {len(key_metrics_data)} key metrics")

    # ─────────────────────────────────────────
    # SEED DISCLOSURE CALENDAR EVENTS
    # ─────────────────────────────────────────
    disclosure_calendar_data = [
        # Format: (date_text, company_name, event_type, description, details, ir_url)
        ("7 Jan", "Diageo", "Trading Update", "Q3 FY2025 Trading Update", "Mid-year trading update", "https://www.diageo.com/investors"),
        ("25 Feb", "Diageo", "Earnings", "Full Year 2025 Results", "FY2025 earnings & guidance", "https://www.diageo.com/investors"),
        ("~mid-Apr", "Diageo", "AGM", "Annual General Meeting", "Shareholder AGM", "https://www.diageo.com/investors"),
        ("~late May", "Diageo", "Trading Update", "Q1 FY2026 Trading Update", "First quarter FY2026 update", "https://www.diageo.com/investors"),

        ("15 Feb", "LVMH", "Earnings", "FY2024 Full Year Results", "Annual results announcement", "https://www.lvmh.com/en/investors"),
        ("~early May", "LVMH", "AGM", "Annual General Meeting", "Shareholder AGM", "https://www.lvmh.com/en/investors"),
        ("~late Jul", "LVMH", "Trading Update", "H1 2025 Trading Update", "Mid-year results", "https://www.lvmh.com/en/investors"),

        ("16 May", "Pernod Ricard", "Earnings", "FY2025 Full Year Results", "Year ended 30 June 2024", "https://www.pernod-ricard.com/en/investors"),
        ("~mid-Jul", "Pernod Ricard", "AGM", "Annual General Meeting", "Shareholder meeting", "https://www.pernod-ricard.com/en/investors"),
        ("18 Nov", "Pernod Ricard", "Trading Update", "H1 FY2026 Results", "Half-year update", "https://www.pernod-ricard.com/en/investors"),

        ("27 Mar", "Constellation Brands", "Earnings", "Q2 FY2026 Results", "Quarterly earnings", "https://ir.cbrands.com/"),
        ("~mid-May", "Constellation Brands", "AGM", "Annual General Meeting", "Shareholder meeting", "https://ir.cbrands.com/"),
        ("25 Sep", "Constellation Brands", "Earnings", "Q4 FY2026 & Full Year Results", "Year-end earnings", "https://ir.cbrands.com/"),

        ("27 Mar", "Brown-Forman", "Earnings", "Q4 FY2025 & Full Year Results", "Year ended 30 April 2025", "https://investors.brown-forman.com/"),
        ("~late Jun", "Brown-Forman", "AGM", "Annual General Meeting", "Shareholder meeting", "https://investors.brown-forman.com/"),
        ("28 Aug", "Brown-Forman", "Trading Update", "Q1 FY2026 Results", "Quarterly update", "https://investors.brown-forman.com/"),

        ("19 Nov", "Rémy Cointreau", "Earnings", "H1 FY2025 Results", "Half-year results", "https://www.remy-cointreau.com/en/finance/"),
        ("~early Jun", "Rémy Cointreau", "AGM", "Annual General Meeting", "Shareholder meeting", "https://www.remy-cointreau.com/en/finance/"),
        ("N/A", "Rémy Cointreau", "Earnings", "FY2025 Full Year Results", "Full year results (TBD)", "https://www.remy-cointreau.com/en/finance/"),

        ("20 Feb", "Campari Group", "Earnings", "FY2024 Full Year Results", "Annual results", "https://www.camparigroup.com/en/page/investors"),
        ("~mid-May", "Campari Group", "AGM", "Annual General Meeting", "Shareholder meeting", "https://www.camparigroup.com/en/page/investors"),
        ("~late Jul", "Campari Group", "Trading Update", "H1 2025 Results", "Mid-year update", "https://www.camparigroup.com/en/page/investors"),

        ("13 Feb", "AB InBev", "Earnings", "FY2024 Full Year Results", "Annual earnings", "https://www.ab-inbev.com/investors/"),
        ("~late Apr", "AB InBev", "AGM", "Annual General Meeting", "Shareholder meeting", "https://www.ab-inbev.com/investors/"),
        ("~mid-Aug", "AB InBev", "Trading Update", "H1 2025 Results", "Mid-year results", "https://www.ab-inbev.com/investors/"),

        ("21 Feb", "Heineken", "Earnings", "FY2024 Full Year Results", "Annual results", "https://www.theheinekencompany.com/investors"),
        ("~early May", "Heineken", "AGM", "Annual General Meeting", "Shareholder meeting", "https://www.theheinekencompany.com/investors"),
        ("~late Jul", "Heineken", "Trading Update", "H1 2025 Results", "Mid-year update", "https://www.theheinekencompany.com/investors"),

        ("31 Jan", "Molson Coors", "Earnings", "Q4 2024 & Full Year Results", "Year ended 31 Dec 2024", "https://ir.molsoncoors.com/"),
        ("~mid-Apr", "Molson Coors", "AGM", "Annual General Meeting", "Shareholder meeting", "https://ir.molsoncoors.com/"),
        ("31 Jul", "Molson Coors", "Earnings", "Q2 2025 Results", "Quarterly earnings", "https://ir.molsoncoors.com/"),

        ("14 Feb", "Becle", "Earnings", "Q4 2024 & Full Year Results", "Year ended 31 Dec 2024", "https://www.ircuervo.com/investors/"),
        ("~late Apr", "Becle", "AGM", "Annual General Meeting", "Shareholder meeting", "https://www.ircuervo.com/investors/"),
        ("15 Aug", "Becle", "Earnings", "H1 2025 Results", "Mid-year earnings", "https://www.ircuervo.com/investors/"),

        ("31 Oct", "Treasury Wine Estates", "Earnings", "FY2025 Full Year Results", "Year ended 30 June 2025", "https://www.tweglobal.com/investors"),
        ("~mid-Aug", "Treasury Wine Estates", "AGM", "Annual General Meeting", "Shareholder meeting", "https://www.tweglobal.com/investors"),
        ("30 Jan", "Treasury Wine Estates", "Trading Update", "H1 FY2026 Results", "Half-year update", "https://www.tweglobal.com/investors"),

        ("27 Feb", "Suntory Beverage & Food", "Earnings", "FY2024 Full Year Results", "Year ended 31 Dec 2024", "https://www.suntory.com/softdrink/ir/"),
        ("~mid-Jun", "Suntory Beverage & Food", "AGM", "Annual General Meeting", "Shareholder meeting", "https://www.suntory.com/softdrink/ir/"),
        ("31 Aug", "Suntory Beverage & Food", "Trading Update", "H1 2025 Results", "Mid-year update", "https://www.suntory.com/softdrink/ir/"),

        ("13 Mar", "MGP Ingredients", "Earnings", "FY2024 Full Year Results", "Year ended 31 Dec 2024", "https://ir.mgpingredients.com/"),
        ("~late May", "MGP Ingredients", "AGM", "Annual General Meeting", "Shareholder meeting", "https://ir.mgpingredients.com/"),
        ("14 Aug", "MGP Ingredients", "Earnings", "Q2 2025 Results", "Quarterly earnings", "https://ir.mgpingredients.com/"),

        ("~mid-Jul", "Edrington", "Trading Update", "H1 Results (Private)", "Private company update (TBD)", "https://www.edrington.com/en/reporting"),

        ("N/A", "Bacardi", "Trading Update", "Annual Results (Private)", "Bacardi privately held (TBD)", None),

        ("~late Jun", "William Grant & Sons", "Trading Update", "H1 Results (Private)", "Private company update (TBD)", None),

        ("~mid-Aug", "Suntory Holdings", "Trading Update", "H1 Results (Private)", "Private parent company update (TBD)", None),

        ("~late Sep", "Proximo Spirits", "Trading Update", "Annual Results (Private)", "Private company update (TBD)", None),

        ("~late Oct", "Sazerac", "Trading Update", "Annual Results (Private)", "Sazerac privately held (TBD)", None),

        # Additional strategic events for enhanced coverage
        ("~early Mar", "Diageo", "Investor Conference", "CAGNY Consumer Analyst Group", "Industry conference presentation", "https://www.diageo.com/investors"),
        ("~late Oct", "LVMH", "Investor Conference", "Luxury Industry Summit", "Investor presentation", "https://www.lvmh.com/en/investors"),
        ("~early Sep", "Pernod Ricard", "Trading Update", "Trading Statement", "Mid-quarter update", "https://www.pernod-ricard.com/en/investors"),
        ("~mid-Oct", "Constellation Brands", "Trading Update", "Q3 FY2026 Results", "Q3 quarterly update", "https://ir.cbrands.com/"),
        ("~early Dec", "Brown-Forman", "Investor Conference", "Goldman Sachs Conference", "Industry conference", "https://investors.brown-forman.com/"),
        ("~early Oct", "Heineken", "Investor Conference", "Morgan Stanley Conference", "Industry forum", "https://www.theheinekencompany.com/investors"),
        ("~mid-Nov", "Becle", "Trading Update", "Q3 2025 Results", "Quarterly update", "https://www.ircuervo.com/investors/"),
    ]

    events_created = 0
    for date_text, company_name, event_type, description, details, ir_url in disclosure_calendar_data:
        # Extract base company name
        company_name_clean = extract_company_name(company_name)

        # Find matching company
        if company_name_clean not in companies:
            print(f"  Warning: Company '{company_name_clean}' not found in database, skipping event")
            continue

        company = companies[company_name_clean]
        event_date, event_date_text = parse_event_date(date_text)

        # Check if event already exists (by company, type, and description)
        existing = session.query(DisclosureEvent).filter_by(
            company_id=company.id,
            event_type=event_type,
            description=description
        ).first()

        if not existing:
            session.add(DisclosureEvent(
                company_id=company.id,
                event_date=event_date,
                event_date_text=event_date_text,
                event_type=event_type,
                description=description,
                details=details,
                ir_url=ir_url,
            ))
            events_created += 1

    session.flush()
    print(f"  Loaded {events_created} disclosure calendar events")


if __name__ == "__main__":
    # For manual testing
    from models import get_engine, get_session_factory
    from config import get_settings

    settings = get_settings()
    engine = get_engine(settings.database_url)
    Session = get_session_factory(engine)
    session = Session()

    try:
        load_additional_data(session)
        session.commit()
        print("Additional data loaded successfully!")
    except Exception as e:
        session.rollback()
        print(f"Error: {e}")
        raise
    finally:
        session.close()
