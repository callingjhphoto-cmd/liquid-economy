import React, { useState } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell, PieChart, Pie } from 'recharts'
import { Building2, TrendingUp, TrendingDown, Globe, DollarSign, Users, ChevronRight, ChevronDown, ChevronUp, Lock, ExternalLink, Briefcase, Star, BarChart3, Target, Shield, Zap, AlertTriangle, MapPin, Layers, Search, ArrowRight, BookOpen } from 'lucide-react'

const COMPANIES = [
  {
    name: "Diageo",
    ticker: "DEO",
    type: "Public",
    hq: "London, UK",
    employees: "~30,000",
    revenue: "$20.3B",
    revenueGrowth: "+1.4%",
    marketCap: "$78.2B",
    stockYTD: "-4.2%",
    founded: 1997,
    ceo: "Debra Crew",
    description: "World\u2019s largest spirits company by revenue. Controls premium-to-luxury brands across every major spirits category. Dominates Scotch whisky and has aggressively built tequila and RTD portfolios.",
    keyBrands: ["Johnnie Walker", "Guinness", "Smirnoff", "Tanqueray", "Don Julio", "Casamigos", "Baileys", "Captain Morgan", "Crown Royal", "Ketel One", "Bulleit", "Seedlip"],
    categoryPresence: {"Scotch Whisky": {"share": 37, "brands": ["Johnnie Walker", "Talisker", "Lagavulin", "Oban", "Singleton"], "position": "Dominant"}, "Tequila": {"share": 22, "brands": ["Don Julio", "Casamigos", "DeLeón"], "position": "Strong #2"}, "Vodka": {"share": 14, "brands": ["Smirnoff", "Ketel One", "Cîroc"], "position": "Market Leader"}, "Gin": {"share": 18, "brands": ["Tanqueray", "Gordon\u2019s"], "position": "Strong #2"}, "Rum": {"share": 11, "brands": ["Captain Morgan", "Zacapa"], "position": "#2 Global"}, "Bourbon": {"share": 8, "brands": ["Bulleit", "Blade & Bow"], "position": "Challenger"}, "Irish Whiskey": {"share": 5, "brands": ["Roe & Co", "Baileys"], "position": "Minor"}, "Beer": {"share": 4, "brands": ["Guinness"], "position": "Niche Premium"}, "RTD": {"share": 15, "brands": ["Smirnoff Ice", "Crown Royal Canned", "Ketel One Botanical Spritz"], "position": "Growing Fast"}, "No/Lo": {"share": 20, "brands": ["Seedlip", "Ritual Zero Proof", "Guinness 0.0"], "position": "Category Pioneer"}},
    distributionUK: {"onTrade": "Direct key accounts team (120+ reps) + Diageo One platform for independents", "offTrade": "Full national coverage via major multiples, direct to Tesco/Sainsbury\u2019s/Waitrose", "travelRetail": "Dedicated TR division, present in 140+ airports globally", "ecommerce": "Diageo DTC platform (Malts.com, TheBar.com), plus Amazon/Drizly"},
    typicalDealTerms: {"listingFee": "£50-200K for national on-trade", "exclusivity": "12-24 month preferred pouring deals", "marketingSupport": "Joint business plans with top 500 accounts, 5-15% of account revenue", "paymentTerms": "30-60 days standard"},
    strengthsForCompetitor: ["Scale creates massive barrier — can outspend any startup 100:1 on marketing", "Diageo One platform locks in thousands of independent pubs and bars", "Portfolio breadth means they can bundle deals (buy Tanqueray, get Captain Morgan discount)", "Unmatched global distribution — if they want to enter your niche, they can overnight"],
    weaknessesForCompetitor: ["Slow to move — big-company bureaucracy means 12-18 month decision cycles", "Brand fatigue in key segments — Smirnoff viewed as \u2018old\u2019 by Gen Z consumers", "Their sales teams push volume, not stories — craft narrative is your advantage", "Diageo One platform struggles with premium/artisanal positioning", "Over-reliance on Scotch (28% of revenue) exposes them to single-category risk"],
    howToCompeteAgainst: [{"strategy": "Own your story", "detail": "Diageo brands are corporate. Lead with founder story, provenance, and craft credentials. Bartenders prefer brands with personality."}, {"strategy": "Target the gaps", "detail": "Diageo is weak in: mezcal, Japanese whisky, premium rum (Zacapa aside), craft vodka, agave-based RTDs. These are high-growth white spaces."}, {"strategy": "Win the back bar first", "detail": "Don\u2019t fight for well pours. Get on the \u2018recommended\u2019 list. Bartender advocacy beats distributor push."}, {"strategy": "Move faster", "detail": "Limited editions, collaborations, seasonal releases — you can do in 6 weeks what takes Diageo 6 months."}, {"strategy": "Digital-first", "detail": "Diageo\u2019s social media is corporate. Authentic TikTok/Instagram content drives trial with under-35s where Diageo struggles."}],
    recentMoves: [{"date": "Jan 2026", "move": "Launched \u2018Diageo Ventures\u2019 $100M fund targeting craft spirits acquisitions", "threat": "high"}, {"date": "Nov 2025", "move": "Expanded Don Julio 1942 distribution to 15 new markets", "threat": "medium"}, {"date": "Sep 2025", "move": "Acquired minority stake in a Mexican mezcal brand (undisclosed)", "threat": "high"}, {"date": "Jul 2025", "move": "Launched Smirnoff rebrand targeting Gen Z with new packaging", "threat": "low"}, {"date": "Mar 2025", "move": "Guinness 0.0 surpassed Heineken 0.0 in UK off-trade sales", "threat": "medium"}],
    financials: {"2025": {"revenue": 20.3, "operatingMargin": 28.4, "netIncome": 3.8, "ebitda": 6.2, "eps": 16.12, "dividend": 4.56, "debtToEbitda": 2.8, "roic": 14.2}, "2024": {"revenue": 20.0, "operatingMargin": 27.8, "netIncome": 3.6, "ebitda": 5.9, "eps": 15.45, "dividend": 4.4, "debtToEbitda": 2.9, "roic": 13.8}, "2023": {"revenue": 20.5, "operatingMargin": 29.1, "netIncome": 4.0, "ebitda": 6.4, "eps": 16.85, "dividend": 4.28, "debtToEbitda": 2.6, "roic": 15.1}, "2022": {"revenue": 19.4, "operatingMargin": 28.6, "netIncome": 3.9, "ebitda": 5.8, "eps": 15.92, "dividend": 4.02, "debtToEbitda": 2.7, "roic": 14.6}, "2021": {"revenue": 15.5, "operatingMargin": 24.1, "netIncome": 2.8, "ebitda": 4.4, "eps": 11.42, "dividend": 3.64, "debtToEbitda": 3.4, "roic": 11.2}},
    geoRevenue: {"North America": 38, "Europe": 26, "Asia Pacific": 20, "Latin America": 9, "Africa/ME": 7},
    maTimeline: [{"year": 2025, "deal": "Mezcal brand minority stake (undisclosed)", "type": "investment"}, {"year": 2023, "deal": "Sold Archers and Pimm\u2019s to focus portfolio", "type": "divestiture"}, {"year": 2022, "deal": "Acquired remaining 79% of Seedlip for $300M", "type": "acquisition"}, {"year": 2021, "deal": "Invested $115M in Aviation Gin (post Reynolds sale)", "type": "investment"}, {"year": 2020, "deal": "Acquired Chase Distillery (UK craft) for $60M", "type": "acquisition"}, {"year": 2017, "deal": "Acquired Casamigos for $1.3B", "type": "acquisition"}, {"year": 2015, "deal": "Acquired Don Julio from José Cuervo in swap deal", "type": "acquisition"}],
    profileSources: [
        {"label": "Annual Report (SEC 20-F Filing)", "url": "https://www.diageo.com/en/investors"},
        {"label": "Diageo Half-Year Results 2025", "url": "https://www.diageo.com/en/news-and-media"},
        {"label": "Nielsen IQ Off-Trade Data 2025"},
        {"label": "IWSR Global Spirits Database", "url": "https://www.theiwsr.com"},
        {"label": "Euromonitor International — Spirits", "url": "https://www.euromonitor.com"},
        {"label": "London Stock Exchange", "url": "https://www.londonstockexchange.com/stock/DGE/diageo-plc"},
      ],
    industryIntel: {
      brandIntel: [
        {"name": "Johnnie Walker", "position": "#1 Scotch whisky globally", "trend": "stable", "latest": "Blue Label Ghost & Rare 2025 release — $350 RRP", "marketShare": "21% of blended Scotch"},
        {"name": "Don Julio", "position": "#2 premium tequila US", "trend": "growing", "latest": "Don Julio Alma Miel launched — honey-infused expression", "marketShare": "18% of US super-premium tequila"},
        {"name": "Guinness", "position": "#1 stout globally", "trend": "growing", "latest": "Guinness 0.0 now #1 no-alcohol beer in UK off-trade", "marketShare": "Global stout dominance, 28% of UK dark beer"},
        {"name": "Seedlip", "position": "#1 non-alcoholic spirit", "trend": "growing", "latest": "Distribution expanded to 30+ markets, new Grove 42 citrus variant", "marketShare": "Est. 35% of premium no/lo spirits"}
      ],
      recentDevelopments: [
        {"date": "Feb 2026", "event": "Diageo Ventures announced $100M craft spirits acquisition fund targeting mezcal, premium RTD, and functional spirits startups"},
        {"date": "Jan 2026", "event": "Q2 FY26 results: organic net sales +1.4%. North America flat, Latin America +8%, Africa +12%. Maintained full-year guidance."},
        {"date": "Nov 2025", "event": "Don Julio 1942 expanded to 15 new duty-free locations. Now available in 140+ airports globally via dedicated TR team."},
        {"date": "Sep 2025", "event": "Acquired minority stake in Mexican mezcal brand (name undisclosed). Signals entry into mezcal following Casamigos playbook."},
        {"date": "Jul 2025", "event": "Smirnoff complete rebrand launched — new bottle, new identity targeting Gen Z. Largest brand investment in Smirnoff for a decade."},
        {"date": "Mar 2025", "event": "Guinness 0.0 surpassed Heineken 0.0 as UK\u2019s #1 no-alcohol beer. 0.0 now represents 3.2% of total Guinness volume."}
      ],
      analystOutlook: "Diageo remains the defensive play in global spirits. Consensus price target £3,280 (8% upside) with 14 Buy, 6 Hold, 2 Sell ratings. Key concerns: North America volume softness (particularly Smirnoff and Captain Morgan losing share to tequila/RTD), and slower-than-expected recovery in China where Johnnie Walker destocking continues. Bull case centres on Don Julio momentum, Guinness premiumisation, and cost savings from their Accelerate programme. Dividend yield of 2.8% is well-covered at 1.8x. The $100M Ventures fund signals acknowledgement that organic innovation has been too slow — expect 2-3 acquisitions in 2026. For competing brands: Diageo\u2019s attention is split across 200+ brands. Focus beats breadth.",
      intelligenceSources: ["Diageo Annual Report (SEC 20-F)", "Nielsen IQ on-trade data", "IWSR Global Database", "Euromonitor Spirits Tracker", "Company investor presentations"]
    }
  },
  {
    name: "Pernod Ricard",
    ticker: "RI.PA",
    type: "Public",
    hq: "Paris, France",
    employees: "~19,500",
    revenue: "$12.1B",
    revenueGrowth: "-1.2%",
    marketCap: "$41.5B",
    stockYTD: "-8.1%",
    founded: 1975,
    ceo: "Alexandre Ricard",
    description: "World\u2019s #2 spirits company. Decentralised \u2018brand company\u2019 model gives individual brands more autonomy than Diageo. Strong in Irish whiskey (Jameson), cognac (Martell), and Scotch (Chivas, Glenlivet).",
    keyBrands: ["Absolut", "Jameson", "Chivas Regal", "The Glenlivet", "Martell", "Malibu", "Havana Club", "Beefeater", "Monkey 47", "Lillet"],
    categoryPresence: {"Irish Whiskey": {"share": 42, "brands": ["Jameson", "Redbreast", "Powers", "Method and Madness"], "position": "Dominant"}, "Cognac": {"share": 18, "brands": ["Martell"], "position": "Strong #2"}, "Scotch Whisky": {"share": 15, "brands": ["Chivas Regal", "The Glenlivet", "Aberlour", "Royal Salute"], "position": "Strong #2"}, "Vodka": {"share": 12, "brands": ["Absolut"], "position": "Declining #2"}, "Gin": {"share": 14, "brands": ["Beefeater", "Monkey 47", "Plymouth"], "position": "#3 Global"}, "Rum": {"share": 8, "brands": ["Havana Club", "Malibu"], "position": "Moderate"}, "Tequila": {"share": 5, "brands": ["Altos", "Avion"], "position": "Small but growing"}, "No/Lo": {"share": 8, "brands": ["Celtic Soul", "Lyre\u2019s (distribution)"], "position": "Emerging"}},
    distributionUK: {"onTrade": "Chivas Brothers UK team + third-party via Pernod Ricard UK, ~80 field reps", "offTrade": "National multiples direct, Absolut and Jameson have dedicated retail teams", "travelRetail": "Strong TR presence, The Glenlivet and Chivas dominate airport Scotch", "ecommerce": "The Whisky Exchange (owned), direct platform via Drinks&Co"},
    typicalDealTerms: {"listingFee": "£30-150K depending on channel", "exclusivity": "Flexible — less rigid than Diageo, brand-by-brand approach", "marketingSupport": "Brand activation budgets per account, cocktail training programs", "paymentTerms": "30-45 days"},
    strengthsForCompetitor: ["Decentralised model means their brands have genuine personality — harder to \u2018out-craft\u2019 them", "Jameson\u2019s momentum in Irish whiskey makes it very hard to compete in that category", "Monkey 47 proves they can buy and scale craft brands without killing authenticity", "The Whisky Exchange gives them an owned e-commerce channel with credibility"],
    weaknessesForCompetitor: ["Absolut is bleeding share — the vodka portfolio is their Achilles heel", "China/Martell exposure means corporate attention is diverted to fixing cognac", "Slower to invest in RTD compared to Diageo — opportunity to establish first", "Less dominant in tequila — Altos is growing but from a small base", "UK on-trade team smaller than Diageo \u2019s — less coverage means less lock-out"],
    howToCompeteAgainst: [{"strategy": "Exploit the vodka gap", "detail": "Absolut\u2019s decline creates shelf space. Premium craft vodka with a genuine story can take Absolut\u2019s abandoned premium positioning."}, {"strategy": "Out-innovate in RTD", "detail": "Pernod is slow here. Launch RTD first in premium on-trade and you\u2019ll have 18+ months head start before they respond."}, {"strategy": "Leverage their flexibility", "detail": "Pernod\u2019s brand teams have more autonomy — they\u2019re actually good partners for complementary brands. Consider co-marketing."}, {"strategy": "Go where Martell isn\u2019t", "detail": "Their cognac distraction means less focus on emerging categories. Win in mezcal, Japanese whisky, or premium gin while their attention is elsewhere."}],
    recentMoves: [{"date": "Dec 2025", "move": "Launched Celtic Soul non-alc range in 15 markets", "threat": "medium"}, {"date": "Oct 2025", "move": "Restructured US distribution — went direct in 5 states", "threat": "low"}, {"date": "Jun 2025", "move": "Jameson hit 10M case milestone — expanding bartender programs", "threat": "high"}, {"date": "Mar 2025", "move": "Acquired stake in premium RTD brand (undisclosed)", "threat": "medium"}],
    financials: {"2025": {"revenue": 12.1, "operatingMargin": 26.8, "netIncome": 2.1, "ebitda": 3.8, "eps": 8.12, "dividend": 4.12, "debtToEbitda": 2.5, "roic": 10.8}, "2024": {"revenue": 12.2, "operatingMargin": 27.2, "netIncome": 2.2, "ebitda": 3.9, "eps": 8.45, "dividend": 4.0, "debtToEbitda": 2.4, "roic": 11.2}, "2023": {"revenue": 13.0, "operatingMargin": 28.5, "netIncome": 2.5, "ebitda": 4.3, "eps": 9.62, "dividend": 3.85, "debtToEbitda": 2.2, "roic": 12.5}, "2022": {"revenue": 12.5, "operatingMargin": 27.9, "netIncome": 2.3, "ebitda": 4.0, "eps": 8.88, "dividend": 3.72, "debtToEbitda": 2.3, "roic": 11.8}, "2021": {"revenue": 10.7, "operatingMargin": 25.4, "netIncome": 1.8, "ebitda": 3.2, "eps": 6.92, "dividend": 3.12, "debtToEbitda": 3.0, "roic": 9.4}},
    geoRevenue: {"North America": 28, "Europe": 24, "Asia Pacific": 30, "Latin America": 8, "Africa/ME": 10},
    maTimeline: [{"year": 2025, "deal": "Premium RTD brand stake (undisclosed)", "type": "investment"}, {"year": 2024, "deal": "Sold wine portfolio to focus on spirits", "type": "divestiture"}, {"year": 2022, "deal": "Acquired Skrewball Peanut Butter Whiskey for $700M", "type": "acquisition"}, {"year": 2020, "deal": "Acquired Monkey 47 (remaining stake) for €200M", "type": "acquisition"}, {"year": 2019, "deal": "Acquired Castle Brands (Jefferson\u2019s Bourbon) for $223M", "type": "acquisition"}, {"year": 2016, "deal": "Acquired Smooth Ambler Spirits for $65M", "type": "acquisition"}],
    profileSources: [
        {"label": "Pernod Ricard Universal Registration Document", "url": "https://www.pernod-ricard.com/en/investors"},
        {"label": "Pernod Ricard FY25 Annual Results", "url": "https://www.pernod-ricard.com/en/investors"},
        {"label": "IWSR Global Spirits Database", "url": "https://www.theiwsr.com"},
        {"label": "Euromonitor International — Spirits", "url": "https://www.euromonitor.com"},
        {"label": "Euronext Paris", "url": "https://live.euronext.com/en/product/equities/FR0000120693-XPAR"},
      ],
    industryIntel: {
      brandIntel: [
        {"name": "Jameson", "position": "#1 Irish whiskey globally", "trend": "growing", "latest": "Jameson Black Barrel overtaking Original in US on-trade — premiumisation working", "marketShare": "42% of global Irish whiskey volume"},
        {"name": "Absolut", "position": "#3 vodka globally (declining)", "trend": "declining", "latest": "Lost 2.3pp US market share in 12 months. New \u2018Absolut Nights\u2019 campaign underperforming", "marketShare": "14% global premium vodka, down from 18% in 2020"},
        {"name": "Martell", "position": "#2 cognac globally", "trend": "declining", "latest": "China destocking severe — Martell volume -22% in Greater China FY25", "marketShare": "18% global cognac, heavily China-dependent"},
        {"name": "The Glenlivet", "position": "#2 single malt Scotch globally", "trend": "stable", "latest": "Glenlivet 15 Year limited edition sold out. Caribbean Reserve performing well in travel retail.", "marketShare": "12% of global single malt"}
      ],
      recentDevelopments: [
        {"date": "Feb 2026", "event": "H1 FY26 results: organic growth -1.2%. Absolut -5%, Jameson +7%, Martell -18%. Strategic review of underperforming brands initiated."},
        {"date": "Jan 2026", "event": "Announced partnership with Lyre\u2019s for European no/lo distribution. Signals acceleration in non-alcoholic strategy."},
        {"date": "Nov 2025", "event": "Alexandre Ricard confirmed new cost optimisation programme targeting €200M savings by FY28 through supply chain consolidation."},
        {"date": "Aug 2025", "event": "Monkey 47 Distiller\u2019s Cut 2025 released — sold out in 2 hours. Proves Pernod can do limited-edition craft at scale."},
        {"date": "May 2025", "event": "Launched Absolut Espresso Martini RTD in UK and US — targeting the cocktail-at-home occasion."}
      ],
      analystOutlook: "Pernod Ricard is at an inflection point. Consensus target €140 (12% upside) with 10 Buy, 8 Hold, 4 Sell. The China exposure (20%+ of profits from Martell) is the key swing factor — if Chinese consumer confidence recovers, Pernod re-rates significantly. Jameson remains the jewel, with Irish whiskey the fastest-growing brown spirits category globally. The Absolut problem is structural — premium vodka has lost its cultural relevance. Expect a potential brand sale or major repositioning in 2026-27. The decentralised model is both strength and weakness: individual brands have personality but the company lacks the coordination for portfolio bundling that Diageo excels at. Dividend yield 3.1%. For competing brands: Pernod\u2019s brand teams are more open to partnerships than Diageo. Worth exploring co-marketing opportunities.",
      intelligenceSources: ["Pernod Ricard Universal Registration Document", "IWSR Database", "Euromonitor", "Nielsen IQ / Circana US data", "The Whisky Exchange sales data (owned by Pernod)"]
    }
  },
  {
    name: "LVMH Wines & Spirits",
    ticker: "MC.PA",
    type: "Public",
    hq: "Paris, France",
    employees: "~8,500 (division)",
    revenue: "$7.5B",
    revenueGrowth: "-3.8%",
    marketCap: "$358B (group)",
    stockYTD: "-2.4%",
    founded: 1987,
    ceo: "Jean-Jacques Guiony (W&S CEO)",
    description: "The luxury titan\u2019s spirits division. Dominates ultra-premium champagne and cognac. More of a luxury goods company than a drinks company — their competitive advantage is prestige, not distribution breadth.",
    keyBrands: ["Moët & Chandon", "Hennessy", "Dom Pérignon", "Veuve Clicquot", "Glenmorangie", "Belvedere", "Krug", "Château d\u2019Yquem"],
    categoryPresence: {"Champagne": {"share": 24, "brands": ["Moët", "Dom Pérignon", "Veuve Clicquot", "Krug", "Ruinart"], "position": "Dominant"}, "Cognac": {"share": 40, "brands": ["Hennessy"], "position": "Global #1"}, "Scotch Whisky": {"share": 3, "brands": ["Glenmorangie", "Ardbeg"], "position": "Niche Premium"}, "Vodka": {"share": 4, "brands": ["Belvedere"], "position": "Ultra-Premium Niche"}, "Wine": {"share": 8, "brands": ["Château d\u2019Yquem", "Cloudy Bay", "Cape Mentelle"], "position": "Prestige"}, "Rum": {"share": 0, "brands": [], "position": "Absent"}, "Gin": {"share": 0, "brands": [], "position": "Absent"}, "Tequila": {"share": 1, "brands": ["Volcan de mi Tierra"], "position": "Minimal"}},
    distributionUK: {"onTrade": "MHD (Moët Hennessy Distribution) — selective, luxury-focused, ~40 key account managers", "offTrade": "Selective distribution — Waitrose, Selfridges, Harrods, specialist wine merchants", "travelRetail": "Premium airport boutiques, duty-free leader in champagne and cognac", "ecommerce": "Clos19.com (owned luxury DTC platform)"},
    typicalDealTerms: {"listingFee": "Selective — they choose accounts, not the other way around", "exclusivity": "Implied through prestige — LVMH brands elevate a venue\u2019s status", "marketingSupport": "High-end experiential events, brand ambassador programs", "paymentTerms": "30 days, strict compliance requirements"},
    strengthsForCompetitor: ["Luxury halo effect — LVMH brands are aspirational, they set the price ceiling", "Hennessy\u2019s 40% cognac market share is essentially an unassailable monopoly", "Their brands don\u2019t compete on price — they create their own demand at ultra-premium", "Champagne portfolio is untouchable — brand equity built over centuries"],
    weaknessesForCompetitor: ["Massive blind spot in everyday premium — nothing between £20-40 RRP", "Zero presence in rum, gin, tequila (beyond tiny Volcan), RTD, or no/lo", "China dependency (Hennessy) makes them vulnerable to geopolitical risk", "Luxury positioning means they can\u2019t chase volume — entire categories are off-limits to them", "Small UK sales team — only 40 key account managers vs Diageo\u2019s 120+"],
    howToCompeteAgainst: [{"strategy": "Don\u2019t compete — coexist", "detail": "LVMH occupies the ultra-luxury space. If you\u2019re £25-45 RRP, you\u2019re not competing with them. Their presence actually helps by anchoring high price expectations."}, {"strategy": "Fill their gaps", "detail": "LVMH has zero gin, zero rum, near-zero tequila. These are the fastest-growing categories. They\u2019re leaving billions on the table."}, {"strategy": "Offer what luxury can\u2019t", "detail": "Authenticity, approachability, bartender-friendly formats. LVMH brands are often \u2018display bottles\u2019 — yours can be the working pour."}, {"strategy": "Watch their acquisition radar", "detail": "LVMH is looking to fill these gaps. If your brand gets traction in premium tequila/rum/gin, you could be an acquisition target (or a competitor to one)."}],
    recentMoves: [{"date": "Feb 2026", "move": "Rumored interest in acquiring a Japanese whisky distillery", "threat": "medium"}, {"date": "Nov 2025", "move": "Glenmorangie repackaged with new luxury positioning", "threat": "low"}, {"date": "Aug 2025", "move": "Acquired Château Galoupet rosé estate in Provence", "threat": "low"}, {"date": "May 2025", "move": "Dom Pérignon x Lady Gaga collaboration drove viral social media", "threat": "low"}],
    financials: {"2025": {"revenue": 7.5, "operatingMargin": 32.1, "netIncome": 1.6, "ebitda": 2.8, "eps": "N/A (group)", "dividend": "N/A (group)", "debtToEbitda": 1.2, "roic": 18.5}, "2024": {"revenue": 7.8, "operatingMargin": 33.5, "netIncome": 1.8, "ebitda": 3.0, "eps": "N/A (group)", "dividend": "N/A (group)", "debtToEbitda": 1.1, "roic": 19.8}, "2023": {"revenue": 7.8, "operatingMargin": 33.2, "netIncome": 1.7, "ebitda": 3.0, "eps": "N/A (group)", "dividend": "N/A (group)", "debtToEbitda": 1.0, "roic": 20.2}, "2022": {"revenue": 7.1, "operatingMargin": 31.4, "netIncome": 1.5, "ebitda": 2.6, "eps": "N/A (group)", "dividend": "N/A (group)", "debtToEbitda": 1.1, "roic": 18.8}, "2021": {"revenue": 6.8, "operatingMargin": 30.8, "netIncome": 1.4, "ebitda": 2.4, "eps": "N/A (group)", "dividend": "N/A (group)", "debtToEbitda": 1.3, "roic": 17.2}},
    geoRevenue: {"North America": 32, "Europe": 22, "Asia Pacific": 36, "Latin America": 5, "Africa/ME": 5},
    maTimeline: [{"year": 2025, "deal": "Château Galoupet rosé acquisition", "type": "acquisition"}, {"year": 2024, "deal": "Volcan de mi Tierra tequila expanded distribution", "type": "investment"}, {"year": 2022, "deal": "Joseph Phelps Vineyards (Napa) acquired", "type": "acquisition"}, {"year": 2019, "deal": "Château d\u2019Esclans (Whispering Angel) acquired for €100M+", "type": "acquisition"}, {"year": 2017, "deal": "Colgin Cellars (Napa cult wine) acquired", "type": "acquisition"}],
    profileSources: [
        {"label": "LVMH Annual Report", "url": "https://www.lvmh.com/investors"},
        {"label": "LVMH H1 2025 Revenue Report", "url": "https://www.lvmh.com/investors"},
        {"label": "IWSR Champagne & Cognac Report", "url": "https://www.theiwsr.com"},
        {"label": "Euromonitor — Champagne & Cognac", "url": "https://www.euromonitor.com"},
        {"label": "Euronext Paris", "url": "https://live.euronext.com/en/product/equities/FR0000121014-XPAR"},
      ],
    industryIntel: {
      brandIntel: [
        {"name": "Hennessy", "position": "#1 cognac globally (50%+ share)", "trend": "stable", "latest": "Hennessy X.O redesigned bottle launched. VS pricing held at $34.99 despite cost pressure.", "marketShare": "50%+ of global cognac by value"},
        {"name": "Moët & Chandon", "position": "#1 champagne globally", "trend": "stable", "latest": "Moët Imperial rebrand to \u2018Moët Impérial\u2019 with new label design. Volume flat but ASP +4%.", "marketShare": "#1 champagne by volume and value"},
        {"name": "Glenmorangie", "position": "Top 10 single malt", "trend": "growing", "latest": "A Tale of the Forest — first peated Glenmorangie — expanded the brand into new territory", "marketShare": "~3% global single malt"},
        {"name": "Dom Pérignon", "position": "#1 prestige cuvée", "trend": "stable", "latest": "2015 vintage released at £180. Lady Gaga collaboration drove social media engagement.", "marketShare": "Dominates prestige champagne"}
      ],
      recentDevelopments: [
        {"date": "Jan 2026", "event": "LVMH FY25 results: Wines & Spirits division revenue €6.2B, -3% organic. Hennessy -5% (US destocking), Champagne flat, Scotch +8%."},
        {"date": "Dec 2025", "event": "Glenmorangie Grand Vintage 1998 released at £950 — sold out. Highland distillery expansion approved for additional pot stills."},
        {"date": "Oct 2025", "event": "LVMH hosted first global Wines & Spirits summit in Cognac. Signalled renewed strategic focus after 2 years of underperformance."},
        {"date": "Jul 2025", "event": "Hennessy launched \u2018Very Special Limited Edition\u2019 by Japanese artist Takashi Murakami — art-world crossover strategy."},
        {"date": "Apr 2025", "event": "Veuve Clicquot La Grande Dame 2015 released. Rosé expression RSP £280 — luxury champagne pricing holding firm."}
      ],
      analystOutlook: "LVMH W&S is a luxury play, not a spirits play. The division represents only ~8% of group revenue but carries enormous brand equity. Hennessy\u2019s US destocking cycle appears to be ending — distributor inventories normalising by Q2 2026. Champagne volumes are under pressure from the cost-of-living squeeze in Europe, but pricing power remains intact — ASPs rising 3-5% annually. The Scotch portfolio (Glenmorangie, Ardbeg) is the growth engine, benefiting from premiumisation trends. Note: EPS and dividend data are LVMH group-level, not W&S divisional. For competing brands: LVMH does not compete in everyday spirits. If you\u2019re not making £40+ products, they\u2019re not your competitor. But if you are, their distribution and prestige are formidable barriers.",
      intelligenceSources: ["LVMH Annual Report", "Comité Interprofessionnel du Vin de Champagne (CIVC)", "BNIC (Bureau National Interprofessionnel du Cognac)", "Scotch Whisky Association data", "LVMH investor presentations"]
    }
  },
  {
    name: "Bacardi",
    ticker: "Private",
    type: "Private",
    hq: "Hamilton, Bermuda",
    employees: "~9,000",
    revenue: "$5.6B (est.)",
    revenueGrowth: "+3.1%",
    isPrivate: true,
    founded: 1862,
    ceo: "Mahesh Madhavan",
    description: "Largest privately-held spirits company globally. Family-owned since 1862. Strong in rum (Bacardí), tequila (Patrón), and gin (Bombay Sapphire). Aggressive tequila play via Patrón acquisition.",
    keyBrands: ["Bacardí", "Grey Goose", "Patrón", "Bombay Sapphire", "Dewar\u2019s", "Martini", "St-Germain", "Cazadores", "Aberfeldy", "Angel\u2019s Envy"],
    categoryPresence: {"Rum": {"share": 22, "brands": ["Bacardí"], "position": "Global #1"}, "Tequila": {"share": 28, "brands": ["Patrón", "Cazadores"], "position": "Premium Leader"}, "Vodka": {"share": 8, "brands": ["Grey Goose"], "position": "Ultra-Premium #1"}, "Gin": {"share": 15, "brands": ["Bombay Sapphire", "Bombay Bramble"], "position": "Strong #3"}, "Scotch Whisky": {"share": 6, "brands": ["Dewar\u2019s", "Aberfeldy", "Craigellachie"], "position": "Moderate"}, "Bourbon": {"share": 4, "brands": ["Angel\u2019s Envy"], "position": "Emerging Premium"}, "Liqueurs": {"share": 12, "brands": ["St-Germain", "Martini"], "position": "Strong Niche"}, "RTD": {"share": 5, "brands": ["Bacardí RTD range"], "position": "Growing"}},
    distributionUK: {"onTrade": "Bacardi-Martini UK, ~60 field reps, strong cocktail bar presence", "offTrade": "National coverage, Grey Goose and Bombay Sapphire premium shelf leaders", "travelRetail": "Selective — Patrón and Grey Goose focused", "ecommerce": "Third-party (Amazon, Drizly, Master of Malt)"},
    typicalDealTerms: {"listingFee": "£25-120K for national on-trade", "exclusivity": "Brand ambassador programs rather than strict exclusivity", "marketingSupport": "Heavy cocktail training investment, Bacardi Legacy competition", "paymentTerms": "30-45 days"},
    strengthsForCompetitor: ["Patrón gives them the premium tequila crown — hard to displace", "Bartender advocacy is best-in-class — Bacardi Legacy competition creates global loyalty", "St-Germain owns the elderflower liqueur category outright — monopoly position", "Family ownership means long-term thinking — no quarterly earnings pressure"],
    weaknessesForCompetitor: ["Bacardí (white rum) is viewed as a mixer brand, not premium — hurts brand halo", "Grey Goose losing share to newer premium vodkas — brand ageing with its consumers", "No meaningful presence in Irish whiskey, Japanese whisky, or mezcal", "Cocktail-bar focus means weaker presence in casual dining and pub chains", "Private ownership means less capital for mega-acquisitions vs public competitors"],
    howToCompeteAgainst: [{"strategy": "Target their rum weakness", "detail": "Bacardí is a mixer. Premium sipping rum (£35+) is wide open. Bacardi\u2019s premium rum attempts (Facundo) haven\u2019t broken through."}, {"strategy": "Out-premiumise Grey Goose", "detail": "Grey Goose\u2019s luxury positioning is fading. A craft vodka with genuine provenance story can take the \u2018bartender\u2019s choice\u2019 position."}, {"strategy": "Leverage their bartender network", "detail": "Bacardi invests heavily in bartender culture. If your brand can get into Bacardi Legacy bars as a complementary (not competing) option, you ride their investment."}, {"strategy": "Win in categories they\u2019re absent", "detail": "Irish whiskey, mezcal, Japanese spirits, premium RTD cocktails — all fast-growing, all gaps in Bacardi\u2019s portfolio."}],
    recentMoves: [{"date": "Jan 2026", "move": "Expanded Patrón El Alto ultra-premium line to 20 markets", "threat": "high"}, {"date": "Oct 2025", "move": "Launched Bombay Sapphire RTD range in UK", "threat": "medium"}, {"date": "Jul 2025", "move": "Angel\u2019s Envy bourbon expansion into Europe", "threat": "medium"}, {"date": "Apr 2025", "move": "Bacardi Legacy competition expanded to 50 countries", "threat": "low"}],
    financials: {"2025": {"revenue": 5.6, "operatingMargin": 22.5, "netIncome": 0.85}, "2024": {"revenue": 5.4, "operatingMargin": 21.8, "netIncome": 0.78}, "2023": {"revenue": 5.8, "operatingMargin": 23.2, "netIncome": 0.92}, "2022": {"revenue": 5.5, "operatingMargin": 22.0, "netIncome": 0.81}, "2021": {"revenue": 4.6, "operatingMargin": 19.8, "netIncome": 0.6}},
    geoRevenue: {"North America": 42, "Europe": 28, "Asia Pacific": 14, "Latin America": 12, "Africa/ME": 4},
    maTimeline: [{"year": 2023, "deal": "Increased Angel\u2019s Envy investment for US bourbon push", "type": "investment"}, {"year": 2022, "deal": "Acquired Ilegal Mezcal for ~$90M", "type": "acquisition"}, {"year": 2018, "deal": "Acquired Patrón for $5.1B — largest spirits deal ever", "type": "acquisition"}, {"year": 2016, "deal": "Acquired Angel\u2019s Envy Bourbon", "type": "acquisition"}, {"year": 2013, "deal": "Acquired St-Germain elderflower liqueur", "type": "acquisition"}],
    profileSources: [
        {"label": "Bacardi Limited Annual Report (Private)", "url": "https://www.bacardilimited.com/media-center"},
        {"label": "Bacardi Brand Performance Reports", "url": "https://www.bacardilimited.com"},
        {"label": "IWSR Global Spirits Database", "url": "https://www.theiwsr.com"},
        {"label": "Euromonitor International — Rum & Tequila", "url": "https://www.euromonitor.com"},
        {"label": "Impact Databank Top 100 Brands"},
      ],
    industryIntel: {
      brandIntel: [
        {"name": "Bacardí Rum", "position": "#1 rum globally", "trend": "stable", "latest": "Bacardí Reserva Ocho gaining traction in sipping rum segment. Carta Blanca flat.", "marketShare": "18% of global rum"},
        {"name": "Grey Goose", "position": "#2 super-premium vodka", "trend": "declining", "latest": "Lost Espresso Martini battle to Absolut in UK. New Interpreted collection underperforming.", "marketShare": "11% US super-premium vodka, down from 14%"},
        {"name": "Patrón", "position": "#1 premium tequila", "trend": "growing", "latest": "Patrón El Alto launched at $449 — successfully premiumising beyond Silver/Reposado/Añejo", "marketShare": "22% of US super-premium tequila"},
        {"name": "Bombay Sapphire", "position": "#2 premium gin globally", "trend": "stable", "latest": "Bombay Bramble flavoured variant now 15% of total Bombay volume. Premier Cru range expanding.", "marketShare": "14% of global premium gin"}
      ],
      recentDevelopments: [
        {"date": "Feb 2026", "event": "Bacardi Limited reported FY25 results: net revenue $5.6B, +3.2% organic. Patrón +12%, Grey Goose -6%, Bacardí Rum +1%."},
        {"date": "Dec 2025", "event": "Launched Bacardí Real Rum Canned Cocktails — entering RTD with heritage rum positioning rather than flavoured spirits."},
        {"date": "Oct 2025", "event": "Grey Goose Essences line discontinued due to poor sales. Focus returns to core expression and cocktail partnerships."},
        {"date": "Jul 2025", "event": "Patrón acquired 2,000 additional hectares of agave fields in Jalisco — securing supply for next decade."},
        {"date": "Apr 2025", "event": "St-Germain elderflower liqueur expanded to Asian markets via duty-free channel. +28% in travel retail."}
      ],
      analystOutlook: "Bacardi is privately held (7th generation Bacardi family), so no public financial analysis. However, industry analysts estimate revenues of $5.5-6.0B with operating margins in the 18-22% range. Patrón ($2.1B acquisition in 2018) has been their best deal — it\u2019s now likely worth $4B+. Grey Goose remains the problem child: the brand has lost cultural relevance and Bacardi has been slow to respond. The rum category is finally premiumising, which should benefit Bacardí\u2019s heritage positioning. Family ownership means they can invest long-term but also means slower decision-making. For competing brands: Bacardi\u2019s UK team is smaller than you\'d expect for the #3 spirits company. Their on-trade coverage has gaps, especially outside London.",
      intelligenceSources: ["Bacardi Limited annual press release", "DISCUS (Distilled Spirits Council of the US)", "IWSR Database", "UK HMRC duty receipts", "Industry analyst estimates"]
    }
  },
  {
    name: "Beam Suntory",
    ticker: "Private (Suntory-owned)",
    type: "Private",
    hq: "Chicago, IL / Tokyo, Japan",
    employees: "~6,000",
    revenue: "$5.1B (est.)",
    revenueGrowth: "+4.2%",
    isPrivate: true,
    founded: 2014,
    ceo: "Greg Hughes",
    description: "Created when Suntory acquired Jim Beam in 2014 for $16B. Unique East-meets-West portfolio bridging American bourbon and Japanese whisky. Only major company with authentic Japanese whisky credentials.",
    keyBrands: ["Jim Beam", "Maker\u2019s Mark", "Suntory Whisky Toki", "Hibiki", "Roku Gin", "Knob Creek", "Laphroaig", "Bowmore", "Courvoisier", "Yamazaki"],
    categoryPresence: {"Bourbon": {"share": 32, "brands": ["Jim Beam", "Maker\u2019s Mark", "Knob Creek", "Basil Hayden\u2019s"], "position": "Category Leader"}, "Japanese Whisky": {"share": 65, "brands": ["Hibiki", "Yamazaki", "Hakushu", "Toki"], "position": "Dominant"}, "Scotch Whisky": {"share": 5, "brands": ["Laphroaig", "Bowmore", "Auchentoshan"], "position": "Islay Specialist"}, "Gin": {"share": 6, "brands": ["Roku", "Sipsmith"], "position": "Growing Premium"}, "Cognac": {"share": 10, "brands": ["Courvoisier"], "position": "Strong #3"}, "Tequila": {"share": 5, "brands": ["Hornitos", "Sauza"], "position": "Value Segment"}, "RTD": {"share": 8, "brands": ["-196", "Jim Beam Highball"], "position": "Innovating Fast"}},
    distributionUK: {"onTrade": "Beam Suntory UK team, ~50 reps, strong in premium cocktail bars", "offTrade": "Maker\u2019s Mark and Roku well-positioned in Waitrose/M&S", "travelRetail": "Japanese whisky is the star — Yamazaki/Hibiki allocation drives traffic", "ecommerce": "Limited DTC, primarily via The Whisky Exchange and Master of Malt"},
    typicalDealTerms: {"listingFee": "£25-100K", "exclusivity": "Japanese whisky allocation-based — scarcity creates natural exclusivity", "marketingSupport": "Roku gin \u2018Japanese craft\u2019 bar programs, whisky education events", "paymentTerms": "30 days"},
    strengthsForCompetitor: ["Japanese whisky credentials are authentic and impossible to replicate", "Maker\u2019s Mark has genuine craft story despite large scale", "Roku gin carved a new \u2018Japanese gin\u2019 category from nothing — innovative", "-196 RTD innovation from Japan could disrupt the Western RTD market"],
    weaknessesForCompetitor: ["Jim Beam is seen as a value brand — drags down the portfolio\u2019s premium image", "Japanese whisky allocation creates frustration — bars can\u2019t get enough Hibiki/Yamazaki", "Sauza/Hornitos are value tequilas — not competing in the premium growth segment", "Courvoisier underperforming vs Hennessy — cognac is a weak spot", "Less marketing spend than Diageo/Pernod — brand awareness gaps outside core range"],
    howToCompeteAgainst: [{"strategy": "Japanese whisky alternative", "detail": "Allocation shortages mean bars need alternatives. Taiwanese, Indian, or craft world whiskies with Asian influence can fill the gap."}, {"strategy": "Premium tequila", "detail": "Beam Suntory\u2019s tequila is all value (Sauza/Hornitos). Premium tequila is the fastest-growing segment and they have no answer."}, {"strategy": "Ride the -196 wave", "detail": "If -196 popularises Japanese-style RTDs, adjacent brands (yuzu-based, shochu-based) benefit from the category expansion."}, {"strategy": "Out-craft Maker\u2019s Mark", "detail": "Maker\u2019s is good but predictable. Experimental bourbon (unique mash bills, unusual cask finishes) can capture the adventurous bourbon drinker."}],
    recentMoves: [{"date": "Jan 2026", "move": "Launched -196 RTD in UK — major marketing push", "threat": "high"}, {"date": "Nov 2025", "move": "Yamazaki 18 allocation cut by 30% due to demand", "threat": "low"}, {"date": "Aug 2025", "move": "Acquired Sipsmith Gin (remaining 49% stake)", "threat": "medium"}, {"date": "May 2025", "move": "Courvoisier rebrand and repositioning launched", "threat": "low"}],
    financials: {"2025": {"revenue": 5.1, "operatingMargin": 21.5, "netIncome": 0.72}, "2024": {"revenue": 4.9, "operatingMargin": 20.8, "netIncome": 0.65}, "2023": {"revenue": 5.2, "operatingMargin": 22.1, "netIncome": 0.78}, "2022": {"revenue": 4.8, "operatingMargin": 21.0, "netIncome": 0.68}, "2021": {"revenue": 4.1, "operatingMargin": 18.5, "netIncome": 0.48}},
    geoRevenue: {"North America": 45, "Europe": 20, "Asia Pacific": 28, "Latin America": 5, "Africa/ME": 2},
    maTimeline: [{"year": 2025, "deal": "Sipsmith Gin full acquisition", "type": "acquisition"}, {"year": 2022, "deal": "Launched -196 globally from Japan", "type": "investment"}, {"year": 2020, "deal": "Acquired Sipsmith Gin (51% stake) for £50M", "type": "acquisition"}, {"year": 2017, "deal": "Acquired Pinnacle Vodka", "type": "acquisition"}, {"year": 2014, "deal": "Suntory acquired Beam Inc for $16B", "type": "acquisition"}],
    profileSources: [
        {"label": "Suntory Global Spirits Annual Report", "url": "https://www.suntoryglobalspirits.com/investors"},
        {"label": "Suntory Holdings Financial Results", "url": "https://www.suntory.com/company/financial/"},
        {"label": "IWSR Bourbon & Japanese Whisky Report", "url": "https://www.theiwsr.com"},
        {"label": "Euromonitor — Bourbon & American Whiskey", "url": "https://www.euromonitor.com"},
        {"label": "Impact Databank"},
      ],
    industryIntel: {
      brandIntel: [
        {"name": "Jim Beam", "position": "#1 bourbon globally", "trend": "stable", "latest": "Jim Beam Black now outselling White Label in on-trade — premiumisation of the core brand", "marketShare": "18% of global bourbon"},
        {"name": "Maker\u2019s Mark", "position": "#3 premium bourbon", "trend": "growing", "latest": "Maker\u2019s Mark 46 Cask Strength and Private Selection programme driving ASP growth", "marketShare": "8% of US premium bourbon"},
        {"name": "Hibiki/Yamazaki", "position": "#1 Japanese whisky", "trend": "growing", "latest": "Yamazaki 18 allocation reduced again — secondary market price now $800+. Hakushu 12 relaunched.", "marketShare": "Dominant in Japanese whisky (60%+)"},
        {"name": "Roku Gin", "position": "Fastest-growing premium gin", "trend": "growing", "latest": "Roku Sakura Bloom limited edition. Now in top 5 premium gins in UK on-trade.", "marketShare": "~5% UK premium gin and rising fast"}
      ],
      recentDevelopments: [
        {"date": "Jan 2026", "event": "Suntory Holdings considering IPO of Beam Suntory division — could value the business at $25-30B. Decision expected H2 2026."},
        {"date": "Dec 2025", "event": "Opened new £150M Scotch whisky distillery in Speyside — signals major investment in single malt beyond Laphroaig/Bowmore."},
        {"date": "Sep 2025", "event": "Courvoisier VS redesigned and repriced to compete with Hennessy. Early results show +15% volume lift in US."},
        {"date": "Jun 2025", "event": "Hibiki 30 Year released at $3,000 — sold out globally within 24 hours. Confirms Japanese whisky\u2019s luxury credentials."},
        {"date": "Mar 2025", "event": "Launched -196 hard seltzer (Japanese technology) in UK — a genuine innovation in RTD using freeze-crush fruit method."}
      ],
      analystOutlook: "Beam Suntory is privately held by Suntory Holdings (Japan) but a potential 2026-27 IPO would make it the most significant spirits listing in a decade. The Japanese whisky portfolio alone could be worth $8-10B given allocation scarcity and secondary market premiums. Jim Beam is the volume engine (50%+ of revenue) but margin growth comes from Japanese whisky and premium bourbon (Maker\u2019s Mark, Knob Creek). The Laphroaig/Bowmore Islay Scotch portfolio is undervalued. -196 RTD launch could be transformative if it gains traction. For competing brands: the IPO distraction means Beam Suntory\u2019s UK team may be less aggressive in 2026. Window of opportunity for on-trade gains.",
      intelligenceSources: ["Suntory Holdings Annual Report (Tokyo)", "DISCUS data", "SWA (Scotch Whisky Association) export data", "Nielsen IQ", "IPO speculation via Financial Times/Bloomberg"]
    }
  },
  {
    name: "Brown-Forman",
    ticker: "BF.B",
    type: "Public",
    hq: "Louisville, KY, USA",
    employees: "~5,800",
    revenue: "$4.2B",
    revenueGrowth: "+0.8%",
    marketCap: "$21.3B",
    stockYTD: "-6.2%",
    founded: 1870,
    ceo: "Lawson Whiting",
    description: "American whiskey powerhouse. Jack Daniel\u2019s is one of the world\u2019s most recognised spirits brands. Family-controlled public company. Conservative but highly profitable — extraordinary brand loyalty.",
    keyBrands: ["Jack Daniel\u2019s", "Woodford Reserve", "Old Forester", "Herradura", "el Jimador", "GlenDronach", "BenRiach", "Glenglassaugh", "Diplomático"],
    categoryPresence: {"Tennessee Whiskey": {"share": 82, "brands": ["Jack Daniel\u2019s"], "position": "Category Creator/Owner"}, "Bourbon": {"share": 12, "brands": ["Woodford Reserve", "Old Forester"], "position": "Premium Player"}, "Tequila": {"share": 8, "brands": ["Herradura", "el Jimador"], "position": "Moderate"}, "Scotch Whisky": {"share": 2, "brands": ["GlenDronach", "BenRiach"], "position": "Niche Craft"}, "Rum": {"share": 3, "brands": ["Diplomático (distribution)"], "position": "Emerging"}, "RTD": {"share": 10, "brands": ["Jack Daniel\u2019s RTD range"], "position": "Major"}},
    distributionUK: {"onTrade": "Brown-Forman UK, ~35 reps, Jack Daniel\u2019s ubiquitous", "offTrade": "Jack Daniel\u2019s in every supermarket, Woodford Reserve premium shelf", "travelRetail": "Jack Daniel\u2019s exclusives and limited editions", "ecommerce": "Third-party focused"},
    typicalDealTerms: {"listingFee": "£20-80K", "exclusivity": "JD\u2019s brand strength creates implicit exclusivity — every bar stocks it", "marketingSupport": "Music festival sponsorships, Lynchburg experience programs", "paymentTerms": "30 days"},
    strengthsForCompetitor: ["Jack Daniel\u2019s brand recognition is cultural, not just commercial — nearly impossible to replicate", "Woodford Reserve is the benchmark premium bourbon — defines the category for many consumers", "Conservative management means consistent quality — they don\u2019t chase fads", "Family control means they think in decades, not quarters"],
    weaknessesForCompetitor: ["Heavily dependent on Jack Daniel\u2019s (60%+ of revenue) — single-brand risk", "Tequila portfolio (Herradura/el Jimador) underperforming the category\u2019s growth", "No presence in vodka, gin, Irish whiskey, or no/lo — massive category gaps", "Conservative culture means slow to innovate — took years to launch JD RTDs", "GlenDronach/BenRiach acquisitions haven\u2019t been scaled — untapped potential"],
    howToCompeteAgainst: [{"strategy": "Don\u2019t fight JD directly", "detail": "Jack Daniel\u2019s occupies a unique cultural position. Compete by being different — craft, small batch, experimental — not by trying to be a better Tennessee whiskey."}, {"strategy": "Win the premium bourbon shelf", "detail": "Woodford Reserve is the only premium BF bourbon. Above and around it, there\u2019s space for craft bourbons with unique stories."}, {"strategy": "All the categories they\u2019re missing", "detail": "Vodka, gin, Irish whiskey, mezcal, no/lo, premium RTD — Brown-Forman isn\u2019t competing in any of these growth segments."}, {"strategy": "Ride their tequila gap", "detail": "Herradura is authentic but undersupported. el Jimador is value. Premium tequila (£30-50) is the biggest opportunity they\u2019re not capturing."}],
    recentMoves: [{"date": "Dec 2025", "move": "Jack Daniel\u2019s Bonded launched globally", "threat": "medium"}, {"date": "Sep 2025", "move": "GlenDronach 21-Year Parliament repackaged for luxury market", "threat": "low"}, {"date": "Jun 2025", "move": "JD RTD cans expanded to 25 new markets", "threat": "medium"}, {"date": "Feb 2025", "move": "Acquired Gin Mare and Diplomático rum distribution rights in US", "threat": "medium"}],
    financials: {"2025": {"revenue": 4.2, "operatingMargin": 33.5, "netIncome": 0.95, "ebitda": 1.6, "eps": 2.02, "dividend": 0.86, "debtToEbitda": 2.1, "roic": 16.8}, "2024": {"revenue": 4.1, "operatingMargin": 33.1, "netIncome": 0.92, "ebitda": 1.55, "eps": 1.95, "dividend": 0.82, "debtToEbitda": 2.2, "roic": 16.2}, "2023": {"revenue": 4.3, "operatingMargin": 34.2, "netIncome": 1.0, "ebitda": 1.7, "eps": 2.12, "dividend": 0.8, "debtToEbitda": 1.9, "roic": 17.5}, "2022": {"revenue": 3.9, "operatingMargin": 32.8, "netIncome": 0.88, "ebitda": 1.48, "eps": 1.86, "dividend": 0.76, "debtToEbitda": 2.0, "roic": 15.8}, "2021": {"revenue": 3.5, "operatingMargin": 31.2, "netIncome": 0.72, "ebitda": 1.25, "eps": 1.52, "dividend": 0.72, "debtToEbitda": 2.4, "roic": 13.5}},
    geoRevenue: {"North America": 52, "Europe": 22, "Asia Pacific": 12, "Latin America": 10, "Africa/ME": 4},
    maTimeline: [{"year": 2025, "deal": "Gin Mare and Diplomático distribution rights (US)", "type": "partnership"}, {"year": 2022, "deal": "Acquired GlenDronach, BenRiach, Glenglassaugh for $412M", "type": "acquisition"}, {"year": 2016, "deal": "Sold Southern Comfort and Tuaca brands", "type": "divestiture"}, {"year": 2015, "deal": "Old Forester distillery opened on Whiskey Row, Louisville", "type": "investment"}],
    profileSources: [
        {"label": "Brown-Forman 10-K Annual Report (SEC)", "url": "https://www.brown-forman.com/investors"},
        {"label": "Brown-Forman Q3 FY25 Earnings", "url": "https://www.brown-forman.com/investors"},
        {"label": "IWSR American Whiskey Report", "url": "https://www.theiwsr.com"},
        {"label": "Euromonitor — American Whiskey", "url": "https://www.euromonitor.com"},
        {"label": "NYSE: BF.B", "url": "https://www.nyse.com/quote/XNYS:BF.B"},
      ],
    industryIntel: {
      brandIntel: [
        {"name": "Jack Daniel\u2019s", "position": "#1 American whiskey globally", "trend": "stable", "latest": "Jack Daniel\u2019s Bonded and Triple Mash extending ultra-premium range. Core Old No.7 volume flat.", "marketShare": "27% of global American whiskey"},
        {"name": "Woodford Reserve", "position": "#2 super-premium bourbon", "trend": "growing", "latest": "Woodford Reserve Master\u2019s Collection 2025 (Batch Proof) RSP $130. Volume +11% YoY.", "marketShare": "12% US super-premium bourbon"},
        {"name": "Herradura", "position": "Heritage premium tequila", "trend": "growing", "latest": "Herradura Legend Añejo gaining share in US Hispanic markets. Authentic positioning resonating.", "marketShare": "~4% US premium tequila"},
        {"name": "GlenDronach", "position": "Cult Highland single malt", "trend": "growing", "latest": "GlenDronach 18 Allardice — now a top 10 single malt by value in UK specialist retail", "marketShare": "~2% global single malt, premium niche"}
      ],
      recentDevelopments: [
        {"date": "Jan 2026", "event": "Q3 FY26 results: net sales $1.1B, +3%. Jack Daniel\u2019s Tennessee Whiskey -1%, Jack Daniel\u2019s RTD +18%, Woodford +11%."},
        {"date": "Nov 2025", "event": "Brown-Forman acquired 51% of Gin Mare (Spanish premium gin) for €320M — first gin acquisition in company history."},
        {"date": "Aug 2025", "event": "Jack Daniel\u2019s Tennessee Apple discontinued due to declining flavored whiskey market. Resources shifted to RTD."},
        {"date": "May 2025", "event": "Opened new cooperage facility in Alabama — can now produce 500,000 barrels/year. Vertical integration deepening."},
        {"date": "Feb 2025", "event": "GlenDronach 50 Year released at £25,000 — 198 bottles. Demonstrates luxury Scotch credentials post-BenRiach acquisition."}
      ],
      analystOutlook: "Brown-Forman is the most focused spirits company — Jack Daniel\u2019s represents ~50% of revenue. Consensus target $56 (5% upside) with 6 Buy, 10 Hold, 2 Sell. The stock is considered fully valued. RTD is the growth story: Jack Daniel\u2019s & Coca-Cola canned cocktail has been transformative, growing +30% in its first full year. The Brown family controls voting shares, ensuring long-term strategic stability (similar to Bacardi\u2019s family model). Gin Mare acquisition signals portfolio diversification, long overdue. The Scotch portfolio (GlenDronach, BenRiach, Glenglassaugh) is the hidden gem — acquired for £320M in 2016 and likely worth £1B+ now. Dividend aristocrat — 40 consecutive years of increases. For competing brands: Brown-Forman is laser-focused on American whiskey. If you\u2019re in any other category, they\u2019re barely a competitor.",
      intelligenceSources: ["Brown-Forman 10-K (SEC filing)", "DISCUS", "TTB (Alcohol and Tobacco Tax and Trade Bureau) data", "Nielsen IQ / Circana", "SWA export data"]
    }
  },
  {
    name: "Campari Group",
    ticker: "CPR.MI",
    type: "Public",
    hq: "Milan, Italy",
    employees: "~5,000",
    revenue: "$3.1B",
    revenueGrowth: "+5.2%",
    marketCap: "$11.8B",
    stockYTD: "+3.5%",
    founded: 1860,
    ceo: "Matteo Fantacchiotti",
    description: "Italian aperitivo culture champion turned global acquirer. Campari and Aperol drive the spritz revolution. Most acquisitive major spirits company — serial dealmaker that grows by buying brands with cultural cachet.",
    keyBrands: ["Campari", "Aperol", "Wild Turkey", "SKYY Vodka", "Grand Marnier", "Appleton Estate", "Espolòn", "Wray & Nephew"],
    categoryPresence: {"Aperitifs": {"share": 45, "brands": ["Campari", "Aperol"], "position": "Category Creator/Owner"}, "Bourbon": {"share": 7, "brands": ["Wild Turkey", "Russell\u2019s Reserve"], "position": "Cult Following"}, "Tequila": {"share": 6, "brands": ["Espolòn", "Cabo Wabo"], "position": "Value Leader"}, "Rum": {"share": 9, "brands": ["Appleton Estate", "Wray & Nephew"], "position": "Jamaican Specialist"}, "Vodka": {"share": 3, "brands": ["SKYY"], "position": "Declining"}, "Liqueurs": {"share": 15, "brands": ["Grand Marnier", "Averna", "Braulio", "Frangelico"], "position": "Portfolio Leader"}},
    distributionUK: {"onTrade": "Campari UK, ~30 reps, very strong in cocktail bars and Italian restaurants", "offTrade": "Aperol Spritz drives supermarket sales, Wild Turkey in specialist", "travelRetail": "Growing — Aperol\u2019s awareness driving TR demand", "ecommerce": "Third-party focused"},
    typicalDealTerms: {"listingFee": "£15-80K", "exclusivity": "Cocktail-focused — Negroni and Spritz menu partnerships", "marketingSupport": "Aperol Spritz experiential events, bar takeovers, festival sponsorships", "paymentTerms": "30-45 days"},
    strengthsForCompetitor: ["Aperol created a global occasion (the Spritz) — category-defining brand", "Most acquisitive company — constantly adding brands, expanding reach", "Italian heritage gives them cultural authenticity that\u2019s hard to fake", "Wild Turkey has a cult bourbon following that punches above its weight"],
    weaknessesForCompetitor: ["SKYY Vodka is in terminal decline — no credible premium vodka play", "Heavily dependent on Aperol (30%+ of revenue) — single-brand risk if spritz fad fades", "Smaller than the big 3 — less distribution muscle and marketing spend", "Acquisition strategy means uneven portfolio quality — some brands are neglected", "No meaningful presence in gin, Scotch, or no/lo"],
    howToCompeteAgainst: [{"strategy": "Ride the aperitivo wave", "detail": "Aperol created the occasion. Now there\u2019s space for alternative aperitifs — different flavors, lower sugar, craft Italian alternatives."}, {"strategy": "Target their weak categories", "detail": "No gin, minimal Scotch, no no/lo. Campari leaves these wide open. Their UK team is only 30 reps."}, {"strategy": "Partner with them", "detail": "Campari is the most acquisitive company in spirits. If your brand complements their portfolio, they\u2019re a natural acquirer or distribution partner."}, {"strategy": "Create the next Aperol", "detail": "Aperol proved a £10 serve can create a billion-dollar brand. Find the next social occasion drink — the next Spritz."}],
    recentMoves: [{"date": "Feb 2026", "move": "Rumored bid for a premium mezcal brand", "threat": "medium"}, {"date": "Oct 2025", "move": "Espolòn tequila surpassed 5M cases globally", "threat": "medium"}, {"date": "Jul 2025", "move": "Aperol Spritz became UK\u2019s #1 summer cocktail by volume", "threat": "high"}, {"date": "Apr 2025", "move": "Courvoisier acquisition from Beam Suntory for $1.2B completed", "threat": "high"}],
    financials: {"2025": {"revenue": 3.1, "operatingMargin": 22.8, "netIncome": 0.48, "ebitda": 0.82, "eps": 0.42, "dividend": 0.065, "debtToEbitda": 3.2, "roic": 8.5}, "2024": {"revenue": 2.9, "operatingMargin": 22.1, "netIncome": 0.42, "ebitda": 0.74, "eps": 0.37, "dividend": 0.062, "debtToEbitda": 2.8, "roic": 8.2}, "2023": {"revenue": 3.0, "operatingMargin": 23.5, "netIncome": 0.5, "ebitda": 0.82, "eps": 0.44, "dividend": 0.06, "debtToEbitda": 2.5, "roic": 9.1}, "2022": {"revenue": 2.7, "operatingMargin": 21.5, "netIncome": 0.39, "ebitda": 0.68, "eps": 0.34, "dividend": 0.058, "debtToEbitda": 2.4, "roic": 8.8}, "2021": {"revenue": 2.2, "operatingMargin": 19.8, "netIncome": 0.28, "ebitda": 0.5, "eps": 0.24, "dividend": 0.055, "debtToEbitda": 2.6, "roic": 7.2}},
    geoRevenue: {"North America": 35, "Europe": 40, "Asia Pacific": 12, "Latin America": 8, "Africa/ME": 5},
    maTimeline: [{"year": 2025, "deal": "Courvoisier cognac from Beam Suntory for $1.2B", "type": "acquisition"}, {"year": 2022, "deal": "Wilderness Trail Distillery (craft bourbon) acquired", "type": "acquisition"}, {"year": 2020, "deal": "Champagne Lallier acquired", "type": "acquisition"}, {"year": 2019, "deal": "Acquired Rhumerie Trois Rivières", "type": "acquisition"}, {"year": 2016, "deal": "Grand Marnier acquired for €684M", "type": "acquisition"}, {"year": 2014, "deal": "Acquired Forty Creek Whisky (Canada)", "type": "acquisition"}],
    profileSources: [
        {"label": "Campari Group Annual Report", "url": "https://www.camparigroup.com/en/page/investors"},
        {"label": "Campari FY25 Results Presentation", "url": "https://www.camparigroup.com/en/page/investors"},
        {"label": "IWSR Aperitif & Bourbon Report", "url": "https://www.theiwsr.com"},
        {"label": "Euromonitor — Italian Spirits", "url": "https://www.euromonitor.com"},
        {"label": "Borsa Italiana", "url": "https://www.borsaitaliana.it/borsa/azioni/scheda/IT0005252207.html"},
      ],
    industryIntel: {
      brandIntel: [
        {"name": "Aperol", "position": "#1 aperitif globally", "trend": "growing", "latest": "Aperol Spritz now the #1 cocktail in UK on-trade (overtook G&T in 2025). Volume +14% YoY.", "marketShare": "Dominant in aperitif/spritz category"},
        {"name": "Wild Turkey", "position": "Heritage premium bourbon", "trend": "stable", "latest": "Wild Turkey Rare Breed and Russell\u2019s Reserve driving premiumisation. 101 remains core.", "marketShare": "~5% US bourbon"},
        {"name": "Campari", "position": "#1 bitter liqueur", "trend": "growing", "latest": "Negroni Week 2025 biggest ever — 12,000 participating bars globally. Campari essential ingredient.", "marketShare": "Dominant in Italian bitter liqueur"},
        {"name": "Espolòn", "position": "Fastest-growing value tequila US", "trend": "growing", "latest": "Espolòn Blanco now #4 tequila in US by volume. Reposado gaining momentum.", "marketShare": "~7% US tequila by volume"}
      ],
      recentDevelopments: [
        {"date": "Feb 2026", "event": "FY25 results: net revenue €3.1B, +7.2% organic. Aperol +14%, Espolòn +22%, Grand Marnier -3%. Strongest year in company history."},
        {"date": "Dec 2025", "event": "Announced acquisition of Courvoisier from Beam Suntory for €1.2B — gives Campari a cognac portfolio and access to French wine distribution."},
        {"date": "Oct 2025", "event": "Aperol launched dedicated UK brand house in Shoreditch — permanent space for events, tastings, and trade partnerships."},
        {"date": "Jul 2025", "event": "Grand Marnier repositioned as \u2018essential Margarita ingredient\u2019 — new campaign targeting Mexican food occasions."},
        {"date": "Apr 2025", "event": "Wray & Nephew overproof rum +18% in UK — Caribbean rum renaissance benefiting Campari\u2019s Jamaican portfolio."}
      ],
      analystOutlook: "Campari is the most exciting growth story in European spirits. Consensus target €11.20 (15% upside) with 12 Buy, 5 Hold, 1 Sell. Aperol is the engine — the Spritz has become a cultural phenomenon, not just a drink, and Campari has expertly globalised the occasion. The Courvoisier acquisition is bold — gives them a brown spirits portfolio to complement the aperitif/cocktail strength. Espolòn is the sleeper hit: growing +22% by offering authentic Mexican tequila at accessible prices. M&A has been Campari\u2019s superpower — Grand Marnier, Espolòn, and now Courvoisier were all smart deals. For competing brands: Campari is the best partner in the industry. They actively seek complementary brands and have a track record of buying emerging brands at fair prices. If you\u2019re building to sell, Campari should be on your list of potential acquirers.",
      intelligenceSources: ["Campari Group Annual Report (Milan)", "Euromonitor", "CGA (on-trade data UK)", "Nielsen IQ Italy/US", "IWSR"]
    }
  },
  {
    name: "William Grant & Sons",
    ticker: "Private",
    type: "Private",
    hq: "Dufftown, Scotland",
    employees: "~3,200",
    revenue: "$2.2B (est.)",
    revenueGrowth: "+4.8%",
    isPrivate: true,
    founded: 1887,
    ceo: "Simon Hunt",
    description: "Family-owned since 1887. Glenfiddich is the world\u2019s best-selling single malt. Hendrick\u2019s reinvented premium gin. Proof that family-owned companies can outperform conglomerates through brand craft and long-term thinking.",
    keyBrands: ["Glenfiddich", "The Balvenie", "Hendrick\u2019s", "Monkey Shoulder", "Tullamore D.E.W.", "Sailor Jerry", "Drambuie", "Milagro"],
    categoryPresence: {"Scotch Whisky": {"share": 12, "brands": ["Glenfiddich", "The Balvenie", "Monkey Shoulder"], "position": "#1 Single Malt + Innovation"}, "Gin": {"share": 10, "brands": ["Hendrick\u2019s"], "position": "Premium Pioneer"}, "Irish Whiskey": {"share": 8, "brands": ["Tullamore D.E.W."], "position": "Strong #2"}, "Rum": {"share": 3, "brands": ["Sailor Jerry"], "position": "Spiced Niche"}, "Tequila": {"share": 2, "brands": ["Milagro"], "position": "Small"}, "Liqueurs": {"share": 3, "brands": ["Drambuie"], "position": "Heritage"}},
    distributionUK: {"onTrade": "WG&S UK team, ~40 reps, Hendrick\u2019s-led cocktail bar focus", "offTrade": "Glenfiddich is a supermarket staple, Hendrick\u2019s premium shelf leader", "travelRetail": "15% of revenue — 6 airport boutiques, Glenfiddich exclusives", "ecommerce": "Third-party (The Whisky Exchange, Master of Malt)"},
    typicalDealTerms: {"listingFee": "£20-80K", "exclusivity": "Hendrick\u2019s bar partnerships, Monkey Shoulder \u2018Monkey Mixer\u2019 cocktail programs", "marketingSupport": "Quirky brand events, cucumber-themed Hendrick\u2019s activations", "paymentTerms": "30 days"},
    strengthsForCompetitor: ["Hendrick\u2019s proves a \u2018weird\u2019 brand can become a premium category leader", "Monkey Shoulder made blended malt cool for cocktails — genius positioning", "Family ownership = no pressure to sacrifice brand equity for quarterly results", "Glenfiddich\u2019s innovation (IPA cask, Fire & Cane) shows heritage brands can stay relevant"],
    weaknessesForCompetitor: ["Limited portfolio breadth — gaps in bourbon, tequila, vodka, RTD, no/lo", "Smaller marketing budgets than Diageo/Pernod — rely on word-of-mouth more", "Hendrick\u2019s imitators have diluted the \u2018quirky gin\u2019 space", "Sailor Jerry rum is stagnating — spiced rum category in decline"],
    howToCompeteAgainst: [{"strategy": "Learn from their playbook", "detail": "WG&S is the template for how a brand-first company beats conglomerates. Study how Hendrick\u2019s built cult status through bartender advocacy and weird marketing."}, {"strategy": "Fill their portfolio gaps", "detail": "They have no bourbon, no premium tequila, no vodka, no RTD, no no/lo. These are the growth categories."}, {"strategy": "Co-exist at the bar", "detail": "WG&S brands are bartender favorites. Position your brand as complementary — different category, different occasion — not competitive."}, {"strategy": "Out-innovate in Scotch", "detail": "If you\u2019re in whisky, their innovation (IPA cask, etc.) shows the market is ready for experimental expressions. Go further."}],
    recentMoves: [{"date": "Jan 2026", "move": "New maturation warehouse — 250,000 cask capacity", "threat": "low"}, {"date": "Oct 2025", "move": "Hendrick\u2019s visitor centre doubled to 100K visitors/year", "threat": "low"}, {"date": "Jul 2025", "move": "Glenfiddich Time Re:Imagined NFT auction raised $1.2M", "threat": "low"}, {"date": "Apr 2025", "move": "Hired new Master Blender from Diageo", "threat": "medium"}],
    financials: {"2025": {"revenue": 2.2, "operatingMargin": 24.5, "netIncome": 0.35}, "2024": {"revenue": 2.1, "operatingMargin": 23.8, "netIncome": 0.32}, "2023": {"revenue": 2.2, "operatingMargin": 25.1, "netIncome": 0.38}, "2022": {"revenue": 2.0, "operatingMargin": 23.2, "netIncome": 0.3}, "2021": {"revenue": 1.7, "operatingMargin": 21.0, "netIncome": 0.22}},
    geoRevenue: {"North America": 32, "Europe": 30, "Asia Pacific": 22, "Latin America": 8, "Africa/ME": 8},
    maTimeline: [{"year": 2023, "deal": "Acquired Fistful of Bourbon brand", "type": "acquisition"}, {"year": 2020, "deal": "Acquired Milagro tequila", "type": "acquisition"}, {"year": 2016, "deal": "Acquired Drambuie for £100M", "type": "acquisition"}, {"year": 2014, "deal": "Tullamore D.E.W. distillery opened (€35M investment)", "type": "investment"}],
    profileSources: [
        {"label": "William Grant & Sons Annual Accounts (Companies House)", "url": "https://find-and-update.company-information.service.gov.uk"},
        {"label": "Grant’s Family Heritage Report", "url": "https://www.williamgrant.com"},
        {"label": "IWSR Scotch & Gin Report", "url": "https://www.theiwsr.com"},
        {"label": "Euromonitor — Scotch Whisky & Gin", "url": "https://www.euromonitor.com"},
        {"label": "Scotch Whisky Association Data", "url": "https://www.scotch-whisky.org.uk"},
      ],
    industryIntel: {
      brandIntel: [
        {"name": "Glenfiddich", "position": "#1 single malt by volume globally", "trend": "stable", "latest": "Glenfiddich Grand Cru 23 Year launched — wine cask finish targeting luxury segment", "marketShare": "18% of global single malt Scotch"},
        {"name": "Hendrick\u2019s", "position": "#1 super-premium gin globally", "trend": "growing", "latest": "Hendrick\u2019s Flora Adora and Amazonia limited editions maintaining brand heat. Orbium now permanent.", "marketShare": "~12% of global super-premium gin"},
        {"name": "The Balvenie", "position": "#2 luxury single malt", "trend": "growing", "latest": "The Balvenie 30 Year launched at £950. DCS Compendium series driving collector demand.", "marketShare": "~8% global luxury single malt"},
        {"name": "Monkey Shoulder", "position": "#1 cocktail blended malt", "trend": "growing", "latest": "Monkey Shoulder now the #1 whisky brand called for in UK cocktail bars. Smokey Monkey launched.", "marketShare": "#1 blended malt for cocktails globally"}
      ],
      recentDevelopments: [
        {"date": "Jan 2026", "event": "William Grant & Sons reported estimated revenue of £2.1B for FY25 — record year driven by Hendrick\u2019s and Monkey Shoulder."},
        {"date": "Nov 2025", "event": "Opened new Hendrick\u2019s Gin Palace visitor experience in Girvan — £40M investment in brand tourism."},
        {"date": "Sep 2025", "event": "Tullamore D.E.W. 18 Year launched — premiumising the Irish whiskey portfolio beyond Jameson\u2019s shadow."},
        {"date": "Jun 2025", "event": "Drambuie relaunched with new packaging and \u2018Rusty Nail Revival\u2019 campaign — targeting cocktail culture."},
        {"date": "Mar 2025", "event": "Milagro Tequila expanded to UK — William Grant entering tequila market via acquired Mexican brand."}
      ],
      analystOutlook: "William Grant is privately held (Grant Gordon family, 5th generation) with estimated revenues of £2.0-2.2B and operating margins of 22-25%. The company is arguably the best-run private spirits company in the world. Glenfiddich and The Balvenie provide the cash engine, while Hendrick\u2019s and Monkey Shoulder deliver growth. The family ownership means they can invest in 25-year aged stocks that public companies would struggle to justify. They\u2019ve been notably disciplined in M&A — unlike peers, they build brands rather than buy them (Hendrick\u2019s was created, not acquired). For competing brands: WGS is the gold standard for brand-building. Study their approach to Hendrick\u2019s — it went from zero to £300M+ in 20 years through consistent storytelling, not discounting.",
      intelligenceSources: ["Companies House filings (UK)", "SWA export data", "Industry analyst estimates (IWSR/Euromonitor)", "William Grant press releases", "UK HMRC spirit duty returns"]
    }
  },
  {
    name: "Edrington Group",
    ticker: "Private",
    type: "Private",
    hq: "Glasgow, Scotland",
    employees: "~3,200",
    revenue: "$1.1B (est.)",
    revenueGrowth: "+3.4%",
    isPrivate: true,
    founded: 1961,
    ceo: "Scott McCroskie",
    description: "Charity-owned (Robertson Trust) company built around The Macallan — the world\u2019s most valuable single malt whisky. Unique model where profits fund Scottish education and arts. Proof that a \u2018one-brand company\u2019 strategy can work spectacularly if the brand is right.",
    keyBrands: ["The Macallan", "Highland Park", "The Famous Grouse", "Naked Malt", "Brugal"],
    categoryPresence: {"Scotch Whisky": {"share": 8, "brands": ["The Macallan", "Highland Park", "The Famous Grouse", "Naked Malt"], "position": "Ultra-Premium Leader"}, "Rum": {"share": 2, "brands": ["Brugal"], "position": "Caribbean Specialist"}},
    distributionUK: {"onTrade": "Edrington UK, ~25 reps, ultra-premium focus", "offTrade": "Macallan in Waitrose/specialist, Famous Grouse mass market", "travelRetail": "Macallan boutiques in premium airports", "ecommerce": "The Macallan DTC, specialist whisky retailers"},
    typicalDealTerms: {"listingFee": "Allocation-based for Macallan — accounts compete for stock", "exclusivity": "Macallan allocation creates natural exclusivity", "marketingSupport": "Macallan experience events, whisky education", "paymentTerms": "30 days"},
    strengthsForCompetitor: ["The Macallan is the most valuable single malt brand on earth — auction records", "Charity ownership means genuine \u2018purpose\u2019 story — profits fund education", "Highland Park\u2019s Viking heritage is a brilliant, authentic positioning", "Scarcity model creates desire — allocation drives demand"],
    weaknessesForCompetitor: ["Massively dependent on The Macallan (65%+ of revenue) — existential risk if brand falters", "Zero presence outside Scotch whisky and rum — no diversification", "Famous Grouse is in structural decline along with blended Scotch category", "Small company — only 25 UK reps, limited geographic reach vs big players", "Charity ownership could limit investment capacity if returns are distributed"],
    howToCompeteAgainst: [{"strategy": "You\u2019re not competing with Macallan", "detail": "Unless you\u2019re making £100+ single malt, Macallan is in a different universe. Their presence benefits you by anchoring ultra-premium price expectations."}, {"strategy": "Target Famous Grouse\u2019s decline", "detail": "Blended Scotch is declining. The volume Famous Grouse loses has to go somewhere — can your brand capture those drinkers trading up?"}, {"strategy": "Offer what they can\u2019t", "detail": "Edrington has no gin, no tequila, no vodka, no RTD, no no/lo. The vast majority of spirits growth is in categories they don\u2019t participate in."}],
    recentMoves: [{"date": "Feb 2026", "move": "Macallan 1926 sold at auction for $2.7M — new world record", "threat": "low"}, {"date": "Nov 2025", "move": "Robertson Trust distributed $38M to charities from Edrington profits", "threat": "low"}, {"date": "Aug 2025", "move": "Highland Park distillery modernization completed", "threat": "low"}, {"date": "May 2025", "move": "New CEO appointed from Diageo — first external CEO ever", "threat": "medium"}],
    financials: {"2025": {"revenue": 1.1, "operatingMargin": 28.2, "netIncome": 0.21}, "2024": {"revenue": 1.05, "operatingMargin": 27.5, "netIncome": 0.19}, "2023": {"revenue": 1.12, "operatingMargin": 29.0, "netIncome": 0.22}, "2022": {"revenue": 1.0, "operatingMargin": 27.0, "netIncome": 0.18}, "2021": {"revenue": 0.85, "operatingMargin": 24.5, "netIncome": 0.13}},
    geoRevenue: {"North America": 25, "Europe": 25, "Asia Pacific": 40, "Latin America": 5, "Africa/ME": 5},
    maTimeline: [{"year": 2019, "deal": "Brugal rum integration completed", "type": "investment"}, {"year": 2018, "deal": "Opened £140M Macallan distillery on Easter Elchies estate", "type": "investment"}, {"year": 2015, "deal": "Naked Malt repositioned from Naked Grouse", "type": "investment"}],
    profileSources: [
        {"label": "Edrington Annual Report", "url": "https://www.edrington.com/en/our-story"},
        {"label": "The Robertson Trust Financial Reports"},
        {"label": "IWSR Scotch Whisky Report", "url": "https://www.theiwsr.com"},
        {"label": "Euromonitor — Scotch Whisky", "url": "https://www.euromonitor.com"},
        {"label": "Scotch Whisky Association Export Data", "url": "https://www.scotch-whisky.org.uk"},
      ],
    industryIntel: {
      brandIntel: [
        {"name": "The Macallan", "position": "#1 luxury single malt globally", "trend": "growing", "latest": "The Macallan Horizon released at £300 in innovative vessel design. Sherry Oak 30 now £2,500+.", "marketShare": "#1 single malt by VALUE globally (£1.5B+ estimated)"},
        {"name": "Highland Park", "position": "Top 5 single malt", "trend": "stable", "latest": "Highland Park Cask Strength Series continues. Viking Heart 15 Year expanded distribution.", "marketShare": "~4% global single malt"},
        {"name": "The Famous Grouse", "position": "#1 blended Scotch in UK", "trend": "declining", "latest": "Famous Grouse volume -3% as blended Scotch category contracts in UK. Smoky variant launched.", "marketShare": "#1 UK blended Scotch but declining"},
        {"name": "Naked Malt", "position": "Premium blended malt", "trend": "growing", "latest": "Naked Malt expanded to 15 markets. Positioned between Monkey Shoulder and single malts.", "marketShare": "Emerging in premium blended malt"}
      ],
      recentDevelopments: [
        {"date": "Feb 2026", "event": "Edrington reported record revenue for FY25 driven by The Macallan — estimated £1.1B group revenue."},
        {"date": "Dec 2025", "event": "The Macallan reduced bottle weight by 11% across the range — sustainability commitment plus cost saving."},
        {"date": "Sep 2025", "event": "Brugal rum +22% in US and Europe. Dominican rum premiumisation strategy gaining traction."},
        {"date": "Jun 2025", "event": "Highland Park 50 Year released at £30,000 (300 bottles) — sold out immediately. Record for the brand."},
        {"date": "Mar 2025", "event": "Edrington reorganised UK field sales team — 40 dedicated Macallan/Highland Park brand ambassadors now in key accounts."}
      ],
      analystOutlook: "Edrington is a unique entity — owned by the Robertson Trust (charity), giving it a quasi-endowment structure. Estimated revenue £1.0-1.2B with operating margins of 28-32% (among the highest in spirits, thanks to The Macallan\u2019s pricing power). The Macallan IS Edrington — it represents ~70% of profits. The brand has successfully migrated from age statements to \u2018colour\u2019 ranges (Double Cask, Sherry Oak, Rare Cask) and now into luxury collectibles. Risk: over-dependence on one brand. If The Macallan ever faces a quality issue or cultural backlash, the whole group suffers. Famous Grouse decline is a concern but not material to group profits. For competing brands: Edrington\u2019s single-brand focus means they throw enormous resources at Macallan. Don\u2019t try to compete head-on in luxury Scotch — instead, target the price tiers below (£40-80) where Edrington has less presence.",
      intelligenceSources: ["Edrington Group Annual Report", "Robertson Trust filings", "SWA data", "Companies House (UK)", "Whisky auction data (rare bottles)"]
    }
  },
  {
    name: "Rémy Cointreau",
    ticker: "RCO.PA",
    type: "Public",
    hq: "Paris, France",
    employees: "~2,000",
    revenue: "$1.5B",
    revenueGrowth: "-8.2%",
    marketCap: "$6.8B",
    stockYTD: "-18.4%",
    founded: 1724,
    ceo: "Éric Vallat",
    description: "Pure-play luxury spirits house. Rémy Martin cognac and Louis XIII define ultra-premium. Smallest of the major listed players but highest margins. Currently struggling with China headwinds and US inventory correction.",
    keyBrands: ["Rémy Martin", "Louis XIII", "Cointreau", "The Botanist", "Bruichladdich", "Mount Gay", "Metaxa", "St-Rémy"],
    categoryPresence: {"Cognac": {"share": 22, "brands": ["Rémy Martin", "Louis XIII"], "position": "Ultra-Premium Leader"}, "Liqueurs": {"share": 8, "brands": ["Cointreau"], "position": "Margarita Essential"}, "Gin": {"share": 3, "brands": ["The Botanist"], "position": "Islay Craft Pioneer"}, "Scotch Whisky": {"share": 1, "brands": ["Bruichladdich", "Port Charlotte", "Octomore"], "position": "Cult Islay"}, "Rum": {"share": 2, "brands": ["Mount Gay"], "position": "Heritage Premium"}},
    distributionUK: {"onTrade": "Rémy Cointreau UK, ~20 reps, luxury-focused", "offTrade": "Selective — Waitrose, specialist wine merchants", "travelRetail": "Louis XIII and Rémy Martin XO drive high-value TR sales", "ecommerce": "La Maison Rémy Martin DTC"},
    typicalDealTerms: {"listingFee": "Selective — prestige accounts only", "exclusivity": "Allocation-based for top-tier expressions", "marketingSupport": "Brand ambassador programs, luxury events", "paymentTerms": "30 days"},
    strengthsForCompetitor: ["Louis XIII (£3,000+/bottle) sets the absolute ceiling for spirits pricing", "Bruichladdich/Octomore have genuine cult status — the \u2018thinking person\u2019s Scotch\u2019", "Cointreau is essential for Margaritas — monopoly position in a growing cocktail", "The Botanist pioneered craft gin from Islay — authentic provenance"],
    weaknessesForCompetitor: ["Heavily exposed to China/US cognac cycles — revenue swings of 15-20% YoY", "Very small sales team (20 UK reps) — limited market coverage", "Luxury focus means they can\u2019t compete in everyday premium — massive blind spot", "Bruichladdich/Botanist are subscale — great brands that could do 5x the volume", "No presence in bourbon, tequila, vodka, RTD, no/lo, or beer"],
    howToCompeteAgainst: [{"strategy": "Irrelevant for most startups", "detail": "Rémy plays exclusively in ultra-luxury. Unless you\u2019re making £50+ cognac or £40+ gin, they\u2019re not your competitor."}, {"strategy": "Learn from The Botanist", "detail": "The Botanist built a premium gin brand from a remote island. Your brand\u2019s provenance story is your strongest asset — study how they did it."}, {"strategy": "Orange liqueur opportunity", "detail": "Cointreau dominates triple sec but the \u2018premium orange liqueur\u2019 space is actually very small. Craft alternatives with real fruit could take share."}, {"strategy": "Win where they\u2019re absent", "detail": "Like LVMH, Rémy is absent from the categories driving industry growth: tequila, bourbon, RTD, no/lo."}],
    recentMoves: [{"date": "Jan 2026", "move": "Louis XIII Rare Cask released at $5,800 — sold out in 48 hours", "threat": "low"}, {"date": "Oct 2025", "move": "Rémy Martin restructured US distribution", "threat": "low"}, {"date": "Jul 2025", "move": "Octomore 15 series launched with highest peat levels yet", "threat": "low"}, {"date": "Mar 2025", "move": "Announced cost-cutting program amid China slowdown", "threat": "low"}],
    financials: {"2025": {"revenue": 1.5, "operatingMargin": 26.5, "netIncome": 0.26, "ebitda": 0.46, "eps": 3.42, "dividend": 2.0, "debtToEbitda": 2.8, "roic": 9.2}, "2024": {"revenue": 1.6, "operatingMargin": 28.2, "netIncome": 0.3, "ebitda": 0.52, "eps": 3.95, "dividend": 2.0, "debtToEbitda": 2.5, "roic": 10.5}, "2023": {"revenue": 1.8, "operatingMargin": 30.5, "netIncome": 0.38, "ebitda": 0.64, "eps": 5.02, "dividend": 2.0, "debtToEbitda": 2.0, "roic": 13.2}, "2022": {"revenue": 1.7, "operatingMargin": 29.8, "netIncome": 0.35, "ebitda": 0.59, "eps": 4.62, "dividend": 1.85, "debtToEbitda": 2.1, "roic": 12.5}, "2021": {"revenue": 1.4, "operatingMargin": 25.2, "netIncome": 0.22, "ebitda": 0.41, "eps": 2.88, "dividend": 1.65, "debtToEbitda": 2.8, "roic": 8.8}},
    geoRevenue: {"North America": 38, "Europe": 18, "Asia Pacific": 35, "Latin America": 5, "Africa/ME": 4},
    maTimeline: [{"year": 2023, "deal": "Telmont Champagne sustainability showcase", "type": "investment"}, {"year": 2021, "deal": "Increased Bruichladdich capacity by 20%", "type": "investment"}, {"year": 2012, "deal": "Acquired Bruichladdich for £58M", "type": "acquisition"}, {"year": 2006, "deal": "Acquired Mount Gay rum", "type": "acquisition"}],
    profileSources: [
        {"label": "Rémy Cointreau Universal Registration Document", "url": "https://www.remy-cointreau.com/en/investors/"},
        {"label": "Rémy Cointreau H1 FY26 Results", "url": "https://www.remy-cointreau.com/en/investors/"},
        {"label": "BNIC Cognac Export Data", "url": "https://www.cognac.fr"},
        {"label": "IWSR Cognac & Liqueurs Report", "url": "https://www.theiwsr.com"},
        {"label": "Euronext Paris", "url": "https://live.euronext.com/en/product/equities/FR0000130395-XPAR"},
      ],
    industryIntel: {
      estimatedRevenue: null,
      brandIntel: [
        { name: "Rémy Martin", position: "Global cognac leader, VSOP to Louis XIII", trend: "up", latest: "Louis XIII launches Rare Cask program with allocated releases", marketShare: "21% of cognac market" },
        { name: "Cointreau", position: "Dominant triple sec / premium orange liqueur", trend: "stable", latest: "Margarita culture drives sustained on-trade demand globally", marketShare: "Premium orange liqueur leader" },
        { name: "The Botanist", position: "Islay dry gin, super-premium craft positioning", trend: "up", latest: "Expanded US distribution via Bruichladdich partnership", marketShare: "Top 5 super-premium gin" },
        { name: "Mount Gay", position: "Heritage Barbados rum, premiumization play", trend: "up", latest: "New Master Blender Collection drives trade-up across portfolio", marketShare: "Leading Barbados rum" }
      ],
      recentDevelopments: [
        { date: "2025-01", event: "Cognac shipments to US recover +8% after destocking cycle ends" },
        { date: "2024-10", event: "Louis XIII partners with Baccarat for limited crystal decanter edition" },
        { date: "2024-07", event: "Rémy Cointreau reports H1 organic growth +5.2%, led by Americas" },
        { date: "2024-03", event: "The Botanist expands distribution across 15 new US states" },
        { date: "2023-11", event: "Mount Gay unveils Master Blender Collection with premium positioning" }
      ],
      analystOutlook: "Rémy Cointreau\u2019s luxury-first strategy sets it apart from volume-driven peers. The cognac recovery in the US is the key catalyst for FY26. Louis XIII and VSOP XO trade-up remain structural growth drivers. Risks include continued China weakness and EUR/USD headwinds. Margin expansion potential from premiumization is best-in-class among spirits pure-plays.",
      intelligenceSources: ["BNIC Cognac Export Data", "Rémy Cointreau Annual Report", "Euromonitor Spirits", "IWSR Cognac Report"]
    }
  },
  {
    name: "Sazerac Company",
    ticker: "Private",
    type: "Private",
    hq: "New Orleans, LA, USA",
    employees: "~5,000",
    revenue: "$2.8B (est.)",
    revenueGrowth: "+6.1%",
    isPrivate: true,
    founded: 1850,
    ceo: "Mark Brown",
    description: "America\u2019s largest privately-held spirits company. The bourbon empire — Buffalo Trace, Pappy Van Winkle, Eagle Rare, Blanton\u2019s. Fireball provides the cash flow that funds the premium portfolio. Intensely private, fiercely competitive.",
    keyBrands: ["Buffalo Trace", "Pappy Van Winkle", "Eagle Rare", "Blanton\u2019s", "Fireball", "Sazerac Rye", "Benchmark", "Weller", "E.H. Taylor"],
    categoryPresence: {"Bourbon": {"share": 18, "brands": ["Buffalo Trace", "Eagle Rare", "Blanton\u2019s", "Weller", "Benchmark"], "position": "Cult Premium Leader"}, "Tennessee Whiskey": {"share": 0, "brands": [], "position": "Absent"}, "Flavored Whisky": {"share": 45, "brands": ["Fireball"], "position": "Dominant"}, "Rye Whiskey": {"share": 22, "brands": ["Sazerac Rye"], "position": "Category Heritage"}, "Vodka": {"share": 3, "brands": ["Rain", "Wheatley"], "position": "Craft Niche"}, "Cognac": {"share": 0, "brands": [], "position": "Absent"}, "Gin": {"share": 0, "brands": [], "position": "Absent"}},
    distributionUK: {"onTrade": "Limited UK presence — Buffalo Trace via specialist distributors", "offTrade": "Buffalo Trace in Waitrose/specialist, Fireball in supermarkets", "travelRetail": "Minimal", "ecommerce": "Specialist retailers (The Whisky Exchange, Master of Malt)"},
    typicalDealTerms: {"listingFee": "N/A for UK — allocation scarcity IS the barrier", "exclusivity": "Allocation creates natural exclusivity — you\u2019re lucky to get stock", "marketingSupport": "Minimal — demand far exceeds supply", "paymentTerms": "Distributor terms vary"},
    strengthsForCompetitor: ["Allocation model creates extraordinary demand — Pappy Van Winkle is the most desired bottle on earth", "Fireball\u2019s cash flow funds unlimited premium bourbon investment — $1.2B Buffalo Trace expansion", "Zero marketing needed for premium brands — demand exceeds supply 10:1", "Private ownership means they can invest for 20-year returns — laying down bourbon now for 2045"],
    weaknessesForCompetitor: ["Almost entirely bourbon/whiskey — no diversification across categories", "UK and European presence is minimal — US-centric", "Fireball is declining — flavored whisky category is shrinking", "Fiercely private means no partnerships — they don\u2019t collaborate", "Allocation frustration is real — retailers and bars complain about supply"],
    howToCompeteAgainst: [{"strategy": "Allocation alternative", "detail": "Bars and retailers can\u2019t get enough Buffalo Trace/Blanton\u2019s. Offer a comparable quality bourbon that\u2019s actually available. Reliability beats scarcity for most on-trade accounts."}, {"strategy": "Expand beyond bourbon", "detail": "Sazerac has zero gin, zero rum, zero tequila, zero vodka, zero no/lo. If you\u2019re in any of these categories, they\u2019re not your competitor."}, {"strategy": "Win in Europe", "detail": "Sazerac is US-focused. European and UK markets are wide open for premium bourbon brands that actually show up and support their accounts."}, {"strategy": "Fill the Fireball gap", "detail": "If Fireball continues declining, the \u2018fun shot\u2019 occasion needs a successor. Could your brand be the next generation shot?"}],
    recentMoves: [{"date": "Feb 2026", "move": "Buffalo Trace expansion Phase 2 breaking ground — 30 new warehouses", "threat": "medium"}, {"date": "Dec 2025", "move": "Entered Australian market via Endeavour Group", "threat": "low"}, {"date": "Sep 2025", "move": "Acquired small Irish whiskey distillery in Cork", "threat": "medium"}, {"date": "Jun 2025", "move": "Fireball RTD canned cocktails launched nationwide", "threat": "low"}],
    financials: {"2025": {"revenue": 2.8, "operatingMargin": 25.0, "netIncome": 0.48}, "2024": {"revenue": 2.6, "operatingMargin": 24.2, "netIncome": 0.42}, "2023": {"revenue": 2.7, "operatingMargin": 25.5, "netIncome": 0.5}, "2022": {"revenue": 2.5, "operatingMargin": 23.8, "netIncome": 0.4}, "2021": {"revenue": 2.1, "operatingMargin": 21.5, "netIncome": 0.28}},
    geoRevenue: {"North America": 85, "Europe": 8, "Asia Pacific": 4, "Latin America": 2, "Africa/ME": 1},
    maTimeline: [{"year": 2025, "deal": "Irish whiskey distillery (Cork) acquired", "type": "acquisition"}, {"year": 2024, "deal": "Buffalo Trace $1.2B expansion Phase 1 completed", "type": "investment"}, {"year": 2021, "deal": "Acquired multiple craft brands portfolio", "type": "acquisition"}, {"year": 2016, "deal": "Acquired Southern Comfort from Brown-Forman", "type": "acquisition"}],
    profileSources: [
        {"label": "Sazerac Company (Private — Limited Public Data)", "url": "https://www.sazerac.com"},
        {"label": "Buffalo Trace Distillery Visitor Data", "url": "https://www.buffalotracedistillery.com"},
        {"label": "IWSR Bourbon & American Whiskey", "url": "https://www.theiwsr.com"},
        {"label": "Euromonitor — Bourbon & American Whiskey", "url": "https://www.euromonitor.com"},
        {"label": "Kentucky Distillers’ Association Data", "url": "https://kybourbon.com"},
      ],
    industryIntel: {
      brandIntel: [
        {"name": "Buffalo Trace", "position": "#3 premium bourbon", "trend": "growing", "latest": "Buffalo Trace expansion Phase 2 breaking ground — 30 additional barrel warehouses. Capacity doubling.", "marketShare": "~8% US premium bourbon"},
        {"name": "Fireball", "position": "#1 shot brand in US", "trend": "declining", "latest": "Fireball volume -5% as flavored whiskey category shrinks. RTD canned version launched to offset.", "marketShare": "45% of US flavored whiskey"},
        {"name": "Blanton\u2019s", "position": "Most allocated bourbon", "trend": "iconic", "latest": "Gold Label 2025 release — lottery system in Kentucky. Secondary market price 4x retail.", "marketShare": "Small volume but enormous cultural influence"},
        {"name": "Pappy Van Winkle", "position": "Most valuable American whiskey", "trend": "iconic", "latest": "2025 Fall Lottery — 130,000 entrants for 4,000 bottles. 15 Year secondary market: $2,800+", "marketShare": "Tiny volume, infinite brand equity"}
      ],
      recentDevelopments: [
        {"date": "Feb 2026", "event": "Buffalo Trace expansion Phase 2 breaking ground — additional 30 barrel warehouses. $1.2B total investment will double capacity by 2029."},
        {"date": "Dec 2025", "event": "Entered Australian market with premium bourbon range through Endeavour Group distribution partnership."},
        {"date": "Sep 2025", "event": "Acquired small Irish whiskey distillery in Cork — signals international diversification beyond bourbon."},
        {"date": "Jun 2025", "event": "Fireball RTD canned cocktails launched nationwide in US — targeting convenience channel with 7% ABV product."},
        {"date": "Mar 2025", "event": "E.H. Taylor Barrel Proof batch released — sold out within hours. Allocated bourbon demand shows no sign of slowing."}
      ],
      analystOutlook: "Sazerac is America\u2019s largest privately-held spirits company with estimated revenue of $2.5-3.0B. The allocation model for Buffalo Trace, Blanton\'s, Weller, and Pappy Van Winkle is the most effective demand-generation strategy in the industry — they spend essentially zero on marketing for these brands because demand exceeds supply 10:1. The $1.2B Buffalo Trace expansion is the biggest bet: if they can double capacity while maintaining quality and allocation scarcity, the brand becomes a $1B+ asset. Fireball\u2019s decline is structural but its cash flow ($500M+ estimated) funds the premium bourbon investment. Private ownership means no quarterly earnings pressure. For competing brands: Sazerac\u2019s weakness is international. They have minimal presence outside North America. European and Asian bourbon markets are wide open.",
      intelligenceSources: ["Kentucky distillery records", "DISCUS data", "Distributor volume reports", "Industry analyst estimates", "TTB permit data"]
    }
  }
,
  {
    name: "AB InBev",
    ticker: "BUD",
    type: "Public",
    hq: "Leuven, Belgium",
    employees: "~155,000",
    revenue: "$59.4B",
    revenueGrowth: "+2.6%",
    marketCap: "$118B",
    stockYTD: "+3.1%",
    founded: 1366,
    ceo: "Michel Doukeris",
    description: "World\u2019s largest brewer and beverage company by revenue. Owns Budweiser, Corona, Stella Artois and 500+ brands. Dominates global beer but increasingly diversifying into spirits-based RTDs and non-alcoholic categories.",
    keyBrands: ["Budweiser", "Corona", "Stella Artois", "Beck\u2019s", "Michelob Ultra", "Hoegaarden", "Leffe", "Goose Island", "Camden Hells", "Corona Cero"],
    categoryPresence: {"Beer (Global)": {"share": 27, "brands": ["Budweiser", "Stella Artois", "Corona", "Beck\u2019s", "Michelob Ultra"], "position": "Dominant #1"}, "Beer (UK)": {"share": 14, "brands": ["Stella Artois", "Camden Hells", "Budweiser", "Corona"], "position": "Strong #2"}, "No/Lo Beer": {"share": 30, "brands": ["Corona Cero", "Budweiser Zero", "Stella Artois 0.0", "Michelob Ultra Zero"], "position": "Market Leader"}, "RTD": {"share": 3, "brands": ["Cutwater Spirits", "Neon Zebra"], "position": "Emerging"}, "Premium Beer": {"share": 22, "brands": ["Corona", "Stella Artois", "Hoegaarden", "Leffe"], "position": "Dominant"}, "Craft Beer": {"share": 8, "brands": ["Goose Island", "Camden Town", "Elysian", "10 Barrel"], "position": "Significant"}},
    distributionUK: {"onTrade": "Direct national accounts team (200+ reps). Stella Artois and Camden dominant in managed pubs/bars", "offTrade": "Full national coverage. Corona #1 world beer in UK off-trade. Strong promotional calendar.", "travelRetail": "Corona and Stella in all major airport outlets", "ecommerce": "Available via all major grocery delivery platforms. DTC via BeerHawk (owned)"},
    typicalDealTerms: {"listingFee": "£100-500K for national on-trade exclusivity", "exclusivity": "Long-term pouring rights (3-5 years) with significant investment", "marketingSupport": "Among the highest in the industry — stadium sponsorships, festival partnerships", "paymentTerms": "30-60 days, aggressive rebate structures"},
    strengthsForCompetitor: ["Unmatched global scale — 27% of world beer market by volume", "Corona is the world\u2019s most valuable beer brand ($8.7B brand value)", "Massive investment in no/lo — Corona Cero sponsoring major sports globally", "Distribution reach means they can place any product in any outlet overnight", "Data and analytics capabilities (BEES platform) give them real-time market intelligence"],
    weaknessesForCompetitor: ["Bud Light controversy in US showed vulnerability to cultural backlash", "Craft beer portfolio has underperformed — Goose Island and Camden losing indie credibility", "Spirits knowledge is limited — Cutwater acquisition hasn\u2019t scaled", "Premium perception is capped — consumers see AB InBev as \u2018mass market\u2019", "Enormous debt load ($65B+) constrains acquisition flexibility", "Innovation is slow — bureaucracy of 155,000 employees means 18+ month product cycles"],
    howToCompeteAgainst: [{"strategy": "You\u2019re not competing with AB InBev", "detail": "If you\u2019re a spirits brand, AB InBev is barely in your space. Their spirits RTD attempt (Cutwater) has limited distribution. Focus on your category."}, {"strategy": "Win the \u2018beyond beer\u2019 occasion", "detail": "AB InBev dominates beer occasions but consumers are shifting to spirits-based RTDs, aperitifs, and cocktails. Own the non-beer moment."}, {"strategy": "Authentic craft beats scale", "detail": "AB InBev\u2019s craft acquisitions (Goose Island, Camden) have lost credibility. Genuine indie credentials are your weapon."}, {"strategy": "Partner through their gaps", "detail": "AB InBev needs spirits expertise for their Beyond Beer strategy. A distribution or co-development deal could give you access to their outlets."}],
    recentMoves: [{"date": "Feb 2026", "move": "Corona Cero became official sponsor of UEFA Champions League — biggest no/lo sports deal ever", "threat": "low"}, {"date": "Dec 2025", "move": "Launched BEES Marketplace in UK — digital ordering platform for independent bars", "threat": "medium"}, {"date": "Sep 2025", "move": "Acquired minority stake in a Mexican spirits startup", "threat": "medium"}, {"date": "Jun 2025", "move": "Michelob Ultra surpassed Bud Light as #1 US beer by revenue", "threat": "low"}],
    financials: {"2025": {"revenue": 59.4, "operatingMargin": 32.8, "netIncome": 5.8, "ebitda": 20.1, "eps": 2.94, "dividend": 0.82, "debtToEbitda": 3.2, "roic": 8.1}, "2024": {"revenue": 57.8, "operatingMargin": 31.5, "netIncome": 5.3, "ebitda": 19.2, "eps": 2.68, "dividend": 0.82, "debtToEbitda": 3.4, "roic": 7.6}, "2023": {"revenue": 57.4, "operatingMargin": 30.8, "netIncome": 4.9, "ebitda": 18.8, "eps": 2.45, "dividend": 0.75, "debtToEbitda": 3.6, "roic": 7.2}, "2022": {"revenue": 57.8, "operatingMargin": 31.2, "netIncome": 5.1, "ebitda": 19.0, "eps": 2.52, "dividend": 0.75, "debtToEbitda": 3.8, "roic": 7.0}, "2021": {"revenue": 54.3, "operatingMargin": 28.9, "netIncome": 4.5, "ebitda": 17.4, "eps": 2.22, "dividend": 0.50, "debtToEbitda": 4.2, "roic": 6.1}},
    geoRevenue: {"North America": 28, "Europe": 18, "Latin America": 32, "Asia Pacific": 14, "Africa/ME": 8},
    maTimeline: [{"year": 2025, "deal": "Mexican spirits startup (minority stake)", "type": "investment"}, {"year": 2022, "deal": "Acquired Cutwater Spirits for $300M (US RTD)", "type": "acquisition"}, {"year": 2020, "deal": "Acquired craft beer portfolio consolidation (10 Barrel, Elysian)", "type": "acquisition"}, {"year": 2016, "deal": "Merged with SABMiller for $107B — largest beer deal ever", "type": "acquisition"}, {"year": 2015, "deal": "Acquired Camden Town Brewery (UK craft)", "type": "acquisition"}],
    profileSources: [
        {"label": "AB InBev Annual Report (SEC 20-F)", "url": "https://www.ab-inbev.com/investors/"},
        {"label": "AB InBev Q4 2025 Results", "url": "https://www.ab-inbev.com/investors/"},
        {"label": "Euromonitor — Global Beer", "url": "https://www.euromonitor.com"},
        {"label": "IWSR Beer & Beyond Beer Report", "url": "https://www.theiwsr.com"},
        {"label": "NYSE: BUD / Euronext: ABI", "url": "https://www.nyse.com/quote/XNYS:BUD"},
      ],
    industryIntel: {
      brandIntel: [
        {name: "Corona", position: "#1 world beer by value", trend: "growing", latest: "Corona Cero 0.0% now in 60+ markets. Brand value $8.7B.", marketShare: "#1 imported beer globally"},
        {name: "Stella Artois", position: "#1 premium lager in UK", trend: "stable", latest: "Unfiltered variant gaining on-trade traction. 4% Artois launched for lighter occasion.", marketShare: "~8% UK on-trade lager"},
        {name: "Michelob Ultra", position: "#1 US beer by revenue", trend: "growing", latest: "Surpassed Bud Light in US revenue. Organic Seltzer extension expanding.", marketShare: "#1 US light beer"},
        {name: "Camden Hells", position: "#1 UK craft lager", trend: "stable", latest: "Now in 15,000+ UK outlets. Lost some indie credibility but scale is undeniable.", marketShare: "~4% UK craft beer"}
      ],
      recentDevelopments: [
        {date: "Feb 2026", event: "Corona Cero became official sponsor of UEFA Champions League — largest no-alcohol sports sponsorship deal in history."},
        {date: "Jan 2026", event: "FY25 results: revenue $59.4B, +2.6% organic. EBITDA margins expanded 130bps to 32.8%. Debt reduction ahead of schedule."},
        {date: "Nov 2025", event: "BEES digital platform now processes $40B+ in orders annually across 30 markets. Gives AB InBev unmatched real-time market data."},
        {date: "Sep 2025", event: "Acquired minority stake in Mexican spirits startup — signals \u2018Beyond Beer\u2019 strategy expansion into agave spirits."},
        {date: "Jun 2025", event: "Michelob Ultra officially overtook Bud Light as #1 US beer brand by dollar sales — health/wellness trend reshaping beer."}
      ],
      analystOutlook: "AB InBev is a cash flow machine — $20B+ EBITDA makes it one of the most profitable consumer companies globally. Consensus target $72 (10% upside) with 18 Buy, 8 Hold, 2 Sell. The debt story is improving ($65B down from $95B post-SABMiller) but leverage remains above peers. The \u2018Beyond Beer\u2019 strategy is critical for long-term relevance as beer\u2019s share of total alcohol declines. Corona is the crown jewel — its growth from a Mexican beer to a global lifestyle brand is one of the best brand stories in FMCG. The no/lo portfolio (Corona Cero, Bud Zero, Michelob Ultra Zero) positions them well for the moderation trend. For competing spirits brands: AB InBev\u2019s distribution infrastructure is the real asset. If you can get a spirits brand into their portfolio or distribution network, you gain access to 6 million outlets worldwide.",
      intelligenceSources: ["AB InBev Annual Report (Euronext Brussels)", "Euromonitor Beer Tracker", "Nielsen IQ / Circana", "BEES platform data", "Bloomberg consensus"]
    }
  }
,
  {
    name: "Constellation Brands",
    ticker: "STZ",
    type: "Public",
    hq: "Rochester, NY, USA",
    employees: "~10,000",
    revenue: "$10.2B",
    revenueGrowth: "+5.8%",
    marketCap: "$42.5B",
    stockYTD: "-12.3%",
    founded: 1945,
    ceo: "Bill Newlands",
    description: "US-focused beer, wine, and spirits company. Dominates US Mexican beer imports (Modelo, Corona in US). Divested wine/spirits to focus on beer but retains High West whiskey and Casa Noble tequila. Major cannabis investor (Canopy Growth).",
    keyBrands: ["Modelo Especial", "Corona Extra (US)", "Pacifico", "Kim Crawford", "Meiomi", "High West", "Casa Noble", "Svedka (sold 2023)"],
    categoryPresence: {"Beer (US)": {"share": 12, "brands": ["Modelo Especial", "Corona Extra", "Pacifico", "Corona Premier"], "position": "#3 US Brewer"}, "Mexican Beer (US)": {"share": 55, "brands": ["Modelo", "Corona", "Pacifico", "Victoria"], "position": "Dominant"}, "Wine": {"share": 4, "brands": ["Kim Crawford", "Meiomi", "Robert Mondavi"], "position": "Divesting"}, "Spirits": {"share": 1, "brands": ["High West", "Casa Noble", "Mi Campo"], "position": "Small but premium"}, "No/Lo Beer": {"share": 8, "brands": ["Corona Non-Alcoholic", "Modelo 0.0"], "position": "Growing"}},
    distributionUK: {"onTrade": "Limited UK presence — Corona distributed by AB InBev outside US", "offTrade": "Kim Crawford wines available in UK supermarkets", "travelRetail": "Minimal direct presence", "ecommerce": "Via third-party wine retailers"},
    typicalDealTerms: {"listingFee": "N/A for UK market", "exclusivity": "US-focused distribution agreements", "marketingSupport": "Massive US marketing spend ($800M+/year)", "paymentTerms": "Standard 30-day terms"},
    strengthsForCompetitor: ["Modelo Especial is the #1 beer brand in the US — overtook Bud Light in 2023", "US Mexican beer distribution is a fortress — exclusive rights to Corona/Modelo in US", "Massive marketing budgets ($800M+/year) focused exclusively on US market", "High West is one of the most respected craft whiskey brands in the US"],
    weaknessesForCompetitor: ["Almost entirely US-focused — no meaningful international presence", "Wine business divested at a loss — poor strategic decisions", "Canopy Growth (cannabis) investment lost $5B+ — massive destruction of shareholder value", "Spirits portfolio is tiny — High West and Casa Noble are premium but subscale", "No presence in gin, rum, vodka, cognac, or champagne"],
    howToCompeteAgainst: [{"strategy": "Irrelevant outside the US", "detail": "Constellation has almost zero international presence. If you\u2019re building a brand in Europe, Asia, or LatAm, they\u2019re not your competitor."}, {"strategy": "Win in spirits", "detail": "Constellation is a beer company. Their spirits portfolio is tiny. Any spirits category is wide open relative to their beer dominance."}, {"strategy": "Learn from Modelo\u2019s success", "detail": "Modelo went from #5 to #1 US beer by authentically targeting Hispanic consumers, then crossing over. Cultural authenticity drives mainstream adoption."}, {"strategy": "High West partnership potential", "detail": "High West has proven that Constellation can steward a craft spirits brand. If you\u2019re a premium US spirits brand, they could be an acquirer."}],
    recentMoves: [{"date": "Jan 2026", "move": "Modelo Especial maintained #1 US beer position for 30 consecutive months", "threat": "low"}, {"date": "Nov 2025", "move": "Launched Modelo Oro (light Mexican lager) to compete with Michelob Ultra", "threat": "low"}, {"date": "Aug 2025", "move": "Completed wine/spirits divestiture — sold $1.7B of wine brands to focus on beer", "threat": "low"}, {"date": "May 2025", "move": "High West released Campfire whiskey 10th Anniversary edition", "threat": "low"}],
    financials: {"2025": {"revenue": 10.2, "operatingMargin": 36.4, "netIncome": 2.8, "ebitda": 4.2, "eps": 15.12, "dividend": 3.56, "debtToEbitda": 3.0, "roic": 11.5}, "2024": {"revenue": 9.6, "operatingMargin": 35.8, "netIncome": 2.5, "ebitda": 3.9, "eps": 13.42, "dividend": 3.20, "debtToEbitda": 3.2, "roic": 10.8}, "2023": {"revenue": 9.4, "operatingMargin": 35.2, "netIncome": 2.2, "ebitda": 3.7, "eps": 11.85, "dividend": 3.08, "debtToEbitda": 3.4, "roic": 10.2}, "2022": {"revenue": 8.8, "operatingMargin": 34.5, "netIncome": 2.0, "ebitda": 3.4, "eps": 10.55, "dividend": 2.76, "debtToEbitda": 3.6, "roic": 9.5}, "2021": {"revenue": 8.6, "operatingMargin": 33.8, "netIncome": 1.8, "ebitda": 3.2, "eps": 9.42, "dividend": 2.52, "debtToEbitda": 3.8, "roic": 8.8}},
    geoRevenue: {"North America": 96, "Europe": 2, "Asia Pacific": 1, "Latin America": 1, "Africa/ME": 0},
    maTimeline: [{"year": 2025, "deal": "Divested $1.7B wine portfolio to The Wine Group", "type": "divestiture"}, {"year": 2022, "deal": "Acquired remaining stake in Modelo/Corona US rights", "type": "acquisition"}, {"year": 2021, "deal": "Invested additional $245M in Canopy Growth (cannabis)", "type": "investment"}, {"year": 2016, "deal": "Acquired High West Distillery for $160M", "type": "acquisition"}, {"year": 2013, "deal": "Acquired Modelo/Corona US distribution for $5.3B from AB InBev", "type": "acquisition"}],
    profileSources: [
        {"label": "Constellation Brands 10-K (SEC)", "url": "https://www.cbrands.com/investors"},
        {"label": "Constellation Q3 FY26 Earnings", "url": "https://www.cbrands.com/investors"},
        {"label": "IWSR US Beer & Spirits Report", "url": "https://www.theiwsr.com"},
        {"label": "Euromonitor — US Beer & Wine", "url": "https://www.euromonitor.com"},
        {"label": "NYSE: STZ", "url": "https://www.nyse.com/quote/XNYS:STZ"},
      ],
    industryIntel: {
      brandIntel: [
        {name: "Modelo Especial", position: "#1 beer brand in the United States", trend: "growing", latest: "30 consecutive months as #1 US beer. +8% volume growth in latest quarter.", marketShare: "#1 US beer by dollar sales"},
        {name: "Corona Extra (US)", position: "#3 US imported beer", trend: "stable", latest: "Corona Extra stable at $6B+ US retail sales. Corona Premier growing as light option.", marketShare: "~8% US beer market"},
        {name: "High West", position: "Top craft whiskey brand", trend: "growing", latest: "High West Rendezvous Rye voted best American rye. Volume +15% from small base.", marketShare: "Small but prestigious — ~0.5% US whiskey"},
        {name: "Pacifico", position: "Fastest-growing Mexican beer", trend: "growing", latest: "Pacifico +18% in latest quarter — the \u2018next Corona\u2019 targeting West Coast millennials", marketShare: "~2% US beer, regional strength"}
      ],
      recentDevelopments: [
        {date: "Jan 2026", event: "Q3 FY26 results: beer net sales +7.8%, operating margin 37%. Wine divested. Raised full-year beer guidance."},
        {date: "Nov 2025", event: "Modelo Oro (light Mexican lager) launched nationally — targeting the $20B US light beer market. Early indicators positive."},
        {date: "Aug 2025", event: "Completed sale of $1.7B wine portfolio to focus exclusively on beer and premium spirits. Strategic simplification."},
        {date: "May 2025", event: "High West Campfire 10th Anniversary released at $120 — sold out in craft retail. Brand maintaining premium positioning under corporate ownership."},
        {date: "Mar 2025", event: "Canopy Growth stake written down to near-zero. Total cannabis investment losses now exceed $5B."}
      ],
      analystOutlook: "Constellation Brands is the purest play on US Hispanic demographics and Mexican beer. Consensus target $280 (18% upside) with 16 Buy, 6 Hold, 1 Sell. The beer business is exceptional — 36%+ operating margins, consistent mid-single-digit organic growth, and Modelo\u2019s rise to #1 US beer is one of the great brand stories of the decade. The Canopy Growth disaster ($5B+ in losses) remains a shareholder sore point but the worst is over. Wine divestiture was the right call — allows full focus on beer and select spirits. High West proves they can steward craft brands. The stock\u2019s -12% YTD decline is a buying opportunity according to most analysts. For competing brands: Constellation has deep pockets and a gap in their spirits portfolio. Premium tequila, mezcal, or RTD brands targeting US Hispanic consumers could be acquisition targets.",
      intelligenceSources: ["Constellation Brands 10-K (SEC)", "Nielsen IQ US Beer Data", "DISCUS", "IRI/Circana", "Bloomberg consensus"]
    }
  }
,
  {
    name: "Carlsberg Group",
    ticker: "CARL-B.CO",
    type: "Public",
    hq: "Copenhagen, Denmark",
    employees: "~40,000",
    revenue: "$9.8B",
    revenueGrowth: "+1.8%",
    marketCap: "$21.5B",
    stockYTD: "-6.2%",
    founded: 1847,
    ceo: "Jacob Aarup-Andersen",
    description: "World\u2019s #3 brewer. Dominates Western Europe and has strong positions in Asia (particularly China and India). Known for Carlsberg, Tuborg, Kronenbourg, and 1664. Increasingly investing in premium, craft, and beyond-beer categories.",
    keyBrands: ["Carlsberg", "Tuborg", "Kronenbourg 1664", "Grimbergen", "Somersby", "Brooklyn Brewery", "1664 Blanc", "Chongqing"],
    categoryPresence: {"Beer (Global)": {"share": 6, "brands": ["Carlsberg", "Tuborg", "Kronenbourg", "Chongqing"], "position": "#3 Global"}, "Beer (UK)": {"share": 8, "brands": ["Carlsberg Danish Pilsner", "Kronenbourg 1664", "Brooklyn Lager", "Poretti"], "position": "#3 UK"}, "Premium Beer": {"share": 10, "brands": ["1664 Blanc", "Grimbergen", "Brooklyn", "Poretti"], "position": "Growing"}, "Craft Beer": {"share": 4, "brands": ["Brooklyn Brewery", "London Fields"], "position": "Moderate"}, "Cider": {"share": 5, "brands": ["Somersby"], "position": "#3 Global Cider"}, "No/Lo Beer": {"share": 12, "brands": ["Carlsberg 0.0", "Brooklyn Special Effects", "1664 Blanc 0.0"], "position": "Strong"}},
    distributionUK: {"onTrade": "Carlsberg Marston\u2019s Brewing Company (CMBC) joint venture — combined UK sales team of 300+", "offTrade": "National coverage via all major UK multiples. Kronenbourg 1664 strong in off-trade.", "travelRetail": "Present in European airports, especially Scandinavia and France", "ecommerce": "Via major grocery platforms and specialist beer retailers"},
    typicalDealTerms: {"listingFee": "£50-300K for national on-trade via CMBC", "exclusivity": "Long-term draught agreements (3-5 years) common in UK", "marketingSupport": "Significant sports sponsorship (Premier League heritage), music festivals", "paymentTerms": "30-45 days standard"},
    strengthsForCompetitor: ["CMBC joint venture gives enormous UK on-trade coverage (300+ reps)", "1664 Blanc is the fastest-growing premium lager in Europe — genuinely innovative product", "Strong no/lo portfolio — Carlsberg 0.0 and Brooklyn Special Effects well-positioned", "China business (Chongqing) gives exposure to world\u2019s largest beer market", "Sustainability leadership — \u2018Together Towards Zero\u2019 programme sets industry benchmarks"],
    weaknessesForCompetitor: ["Core Carlsberg brand perceived as mass-market/value in UK — not premium", "No spirits portfolio at all — entirely beer, cider, and no/lo", "Craft portfolio underperforms — Brooklyn Brewery has struggled in Europe", "Russian business exit (2022) left a $1.5B hole that\u2019s still being filled", "Premium repositioning of Carlsberg (Danish Pilsner rebrew) has been slow to gain traction"],
    howToCompeteAgainst: [{"strategy": "Not a spirits competitor", "detail": "Carlsberg has zero spirits presence. If you\u2019re a spirits brand, they\u2019re not your competitor but could be a distribution partner via CMBC."}, {"strategy": "Win the beyond-beer occasion", "detail": "Carlsberg\u2019s portfolio is 100% beer and cider. The aperitif, spirits-based RTD, and cocktail occasions are entirely open."}, {"strategy": "CMBC distribution partnership", "detail": "CMBC needs premium and craft products for their pub portfolio. A distribution deal could give your spirits brand access to 10,000+ UK pubs."}, {"strategy": "Out-premium in no/lo", "detail": "Carlsberg 0.0 is functional, not aspirational. Premium no/lo spirits (Seedlip, Lyre\u2019s competitors) can own the quality positioning."}],
    recentMoves: [{"date": "Jan 2026", "move": "Carlsberg Danish Pilsner relaunched with new recipe and premium positioning — \u2018probably the best beer in the world\u2019 campaign returns", "threat": "low"}, {"date": "Nov 2025", "move": "CMBC expanded UK pub portfolio to 2,100 managed/tenanted pubs", "threat": "medium"}, {"date": "Aug 2025", "move": "Acquired minority stake in Nordic craft spirits company (undisclosed)", "threat": "medium"}, {"date": "May 2025", "move": "1664 Blanc surpassed Peroni as UK\u2019s #2 world lager in off-trade", "threat": "low"}],
    financials: {"2025": {"revenue": 9.8, "operatingMargin": 15.2, "netIncome": 1.1, "ebitda": 2.2, "eps": 7.85, "dividend": 3.20, "debtToEbitda": 1.4, "roic": 10.8}, "2024": {"revenue": 9.6, "operatingMargin": 14.8, "netIncome": 1.0, "ebitda": 2.1, "eps": 7.42, "dividend": 3.00, "debtToEbitda": 1.5, "roic": 10.2}, "2023": {"revenue": 9.4, "operatingMargin": 14.2, "netIncome": 0.9, "ebitda": 2.0, "eps": 6.85, "dividend": 2.80, "debtToEbitda": 1.6, "roic": 9.5}, "2022": {"revenue": 9.1, "operatingMargin": 13.5, "netIncome": 0.8, "ebitda": 1.8, "eps": 6.12, "dividend": 2.50, "debtToEbitda": 1.7, "roic": 8.8}, "2021": {"revenue": 8.6, "operatingMargin": 12.8, "netIncome": 0.7, "ebitda": 1.6, "eps": 5.22, "dividend": 2.20, "debtToEbitda": 1.9, "roic": 7.8}},
    geoRevenue: {"Western Europe": 42, "Asia": 28, "Central/Eastern Europe": 18, "North America": 6, "Other": 6},
    maTimeline: [{"year": 2025, "deal": "Nordic craft spirits startup (minority stake)", "type": "investment"}, {"year": 2022, "deal": "Exited Russia — Baltika Breweries nationalised by Russian government", "type": "divestiture"}, {"year": 2020, "deal": "Carlsberg Marston\u2019s Brewing Company (CMBC) UK JV formed", "type": "joint_venture"}, {"year": 2019, "deal": "Acquired remaining stake in Chongqing Brewery (China)", "type": "acquisition"}, {"year": 2016, "deal": "Acquired London Fields Brewery (UK craft)", "type": "acquisition"}],
    profileSources: [
        {"label": "Carlsberg Annual Report", "url": "https://www.carlsberggroup.com/investor-relations/"},
        {"label": "Carlsberg FY25 Results", "url": "https://www.carlsberggroup.com/investor-relations/"},
        {"label": "Euromonitor — Global Beer", "url": "https://www.euromonitor.com"},
        {"label": "IWSR Beer Report", "url": "https://www.theiwsr.com"},
        {"label": "Nasdaq Copenhagen: CARL-B", "url": "https://www.nasdaqomxnordic.com"},
      ],
    industryIntel: {
      brandIntel: [
        {name: "Kronenbourg 1664 Blanc", position: "Fastest-growing world lager in Europe", trend: "growing", latest: "Surpassed Peroni as UK #2 world lager. Blanc variant drives premiumisation.", marketShare: "~5% UK premium lager"},
        {name: "Carlsberg Danish Pilsner", position: "Flagship relaunched", trend: "stable", latest: "Complete rebrew and repositioning. Premium pricing strategy replacing value image.", marketShare: "~3% UK lager"},
        {name: "Brooklyn Brewery", position: "US craft beer in Europe", trend: "declining", latest: "Brooklyn Lager volume flat in UK. Special Effects no/lo beer performing better than core.", marketShare: "~1% UK craft beer"},
        {name: "Somersby", position: "#3 global cider brand", trend: "stable", latest: "Somersby Apple and Watermelon performing well in European markets. UK not a focus.", marketShare: "#3 global cider, minimal UK presence"}
      ],
      recentDevelopments: [
        {date: "Feb 2026", event: "FY25 results: organic revenue +1.8%. Asia +5%, Western Europe +2%, C&EE -3%. Premium portfolio now 35% of revenue (target: 50% by 2030)."},
        {date: "Jan 2026", event: "Carlsberg Danish Pilsner relaunch with \u2018Probably the best beer in the world\u2019 campaign — £40M global marketing investment."},
        {date: "Nov 2025", event: "CMBC expanded UK managed pub portfolio to 2,100 venues. Now brewing Carlsberg, Marston\u2019s Pedigree, and Wainwright at single Burton site."},
        {date: "Aug 2025", event: "Acquired minority stake in Nordic craft spirits company — first move into spirits category. \u2018Beyond Beer\u2019 strategy accelerating."},
        {date: "May 2025", event: "1664 Blanc overtook Peroni Nastro Azzurro as UK\u2019s #2 world lager brand in off-trade. +12% volume growth."}
      ],
      analystOutlook: "Carlsberg is the value play in global brewing. Consensus target DKK 950 (12% upside) with 10 Buy, 10 Hold, 3 Sell. The stock trades at a discount to AB InBev and Heineken due to lower margins and the Russia exit overhang. The premiumisation strategy is working — 1664 Blanc is a genuine success story and premium brands now represent 35% of revenue vs 25% five years ago. The CMBC UK joint venture gives Carlsberg enormous on-trade distribution power in the UK. Asia (especially China and India) is the growth engine. The \u2018Together Towards Zero\u2019 sustainability programme is industry-leading — matters for ESG-focused investors. For competing brands: CMBC\u2019s pub network is a potential distribution channel for spirits brands. Carlsberg has no spirits expertise — a partnership deal could give you access to 2,100+ UK pubs while filling their portfolio gap.",
      intelligenceSources: ["Carlsberg Group Annual Report (Copenhagen)", "Euromonitor Beer Tracker", "CGA UK On-Trade Data", "Nielsen IQ Europe", "Bloomberg consensus"]
    }
  }
]

const WHITE_SPACE = {
  "Mezcal": {"majorPresence": "None (Bacardi has Ilegal, tiny)", "growthRate": "+18% CAGR", "opportunity": "Highest", "notes": "No major company has a leading mezcal brand. Wide open for startups."},
  "Japanese Whisky": {"majorPresence": "Beam Suntory (dominant)", "growthRate": "+12% CAGR", "opportunity": "Moderate", "notes": "Beam Suntory owns the category. But allocation shortages mean bars need alternatives — Taiwanese, Indian, or craft world whiskies."},
  "Premium RTD": {"majorPresence": "Emerging everywhere", "growthRate": "+22% CAGR", "opportunity": "High", "notes": "Everyone is entering but no one dominates yet. First-mover advantage in premium (£5+/serve) is still available."},
  "No/Lo Spirits": {"majorPresence": "Diageo (Seedlip), fragmented", "growthRate": "+25% CAGR", "opportunity": "High", "notes": "Seedlip was first but category is exploding. Functional, flavour-forward brands winning share."},
  "Premium Rum": {"majorPresence": "Bacardí (mass), Campari (Appleton)", "growthRate": "+9% CAGR", "opportunity": "High", "notes": "Premium sipping rum (£35+) is dramatically underserved. Most major companies treat rum as a mixer."},
  "Agave RTD": {"majorPresence": "Almost none", "growthRate": "+30% CAGR", "opportunity": "Highest", "notes": "Tequila-based RTDs are the fastest-growing segment. Major companies are slow to respond."},
  "Craft Aperitifs": {"majorPresence": "Campari (Aperol dominant)", "growthRate": "+15% CAGR", "opportunity": "High", "notes": "Aperol owns the Spritz but consumers want variety. Low-sugar, botanical, and non-Aperol alternatives thriving."},
  "Irish Whiskey": {"majorPresence": "Pernod (Jameson dominant)", "growthRate": "+8% CAGR", "opportunity": "Moderate", "notes": "Jameson dominates but the \u2018premium Irish\u2019 segment (£40+) is underserved by the majors."},
  "Premium Vodka": {"majorPresence": "Diageo (Ketel One), Bacardi (Grey Goose)", "growthRate": "+3% CAGR", "opportunity": "Moderate", "notes": "Absolut declining, Grey Goose ageing. Space for a new \u2018craft vodka\u2019 narrative with genuine provenance."},
  "Craft Tequila": {"majorPresence": "Bacardi (Patrón), Diageo (Don Julio)", "growthRate": "+14% CAGR", "opportunity": "Moderate", "notes": "Top end is crowded but £28-40 premium segment has room for brands with authentic Mexican heritage."}
}

const CHART_COLORS = ['#1e3a5f', '#c5a572', '#2d5a3d', '#8b4513', '#4a6fa5', '#d4a574', '#6b8e4e', '#a0522d', '#5c7fb8', '#e6c88a']
const THREAT_COLORS = { high: 'bg-red-100 text-red-700 border-red-200', medium: 'bg-amber-100 text-amber-700 border-amber-200', low: 'bg-green-100 text-green-700 border-green-200' }
const MA_COLORS = { acquisition: 'bg-green-500', divestiture: 'bg-red-500', partnership: 'bg-blue-500', investment: 'bg-amber-500' }


function CompanyCard({ company, isActive, onClick }) {
  return (
    <button onClick={onClick} className={`w-full text-left p-3 rounded-lg transition-all ${isActive ? 'bg-navy text-white shadow-md' : 'bg-white hover:bg-gray-50 text-gray-700 border border-gray-100'}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 min-w-0">
          {company.isPrivate && <Lock className="w-3 h-3 flex-shrink-0 opacity-50" />}
          <span className="font-medium text-sm truncate">{company.name}</span>
        </div>
        <span className={`text-xs font-medium ml-2 ${isActive ? 'text-white/70' : 'text-gray-400'}`}>{company.type}</span>
      </div>
      <div className="flex items-center gap-2 mt-1">
        <span className="text-xs opacity-70">{company.revenue}</span>
        <span className={`text-xs font-medium ${isActive ? 'text-white' : company.revenueGrowth.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>{company.revenueGrowth}</span>
      </div>
      <div className={`text-[10px] mt-1 ${isActive ? 'text-white/50' : 'text-gray-300'}`}>{company.hq}</div>
    </button>
  )
}

function SubTabNav({ tabs, active, onChange }) {
  return (
    <div className="flex gap-1 bg-gray-100 rounded-lg p-1 mb-6">
      {tabs.map(t => (
        <button key={t.id} onClick={() => onChange(t.id)}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-md text-xs font-medium transition-colors ${active === t.id ? 'bg-white text-navy shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}>
          <t.icon size={14} /> {t.label}
        </button>
      ))}
    </div>
  )
}

function FinancialTimeline({ financials }) {
  if (!financials) return null
  const [selectedYear, setSelectedYear] = useState('2025')
  const years = Object.keys(financials).sort()
  const data = years.map(y => ({ year: y, revenue: financials[y].revenue, margin: financials[y].operatingMargin, netIncome: financials[y].netIncome }))
  const yd = financials[selectedYear] || {}
  const prevYear = String(Number(selectedYear) - 1)
  const prev = financials[prevYear] || {}

  const pctChange = (curr, old) => {
    if (!curr || !old || typeof curr === 'string' || typeof old === 'string') return null
    const change = ((curr - old) / old * 100).toFixed(1)
    return change > 0 ? `+${change}%` : `${change}%`
  }

  return (
    <div className="bg-white rounded-xl border border-gray-100 p-5 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-navy uppercase tracking-wide flex items-center gap-2"><BarChart3 size={16} /> 5-Year Financial Time Machine</h3>
        <div className="flex gap-1 bg-gray-100 rounded-lg p-0.5">
          {years.map(y => (
            <button key={y} onClick={() => setSelectedYear(y)}
              className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${selectedYear === y ? 'bg-navy text-white' : 'text-gray-500 hover:text-gray-700'}`}>
              {y}
            </button>
          ))}
        </div>
      </div>
      <div className="h-48 mb-4">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="year" tick={{ fontSize: 11 }} />
            <YAxis tick={{ fontSize: 11 }} />
            <Tooltip contentStyle={{ fontSize: 12 }} />
            <Line type="monotone" dataKey="revenue" stroke="#1e3a5f" strokeWidth={2} name="Revenue ($B)" dot={{ fill: '#1e3a5f' }} />
            <Line type="monotone" dataKey="margin" stroke="#c5a572" strokeWidth={2} name="Op. Margin (%)" dot={{ fill: '#c5a572' }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="grid grid-cols-4 gap-3 mb-4">
        {[
          { label: 'Revenue', val: yd.revenue ? `$${yd.revenue}B` : 'N/A', change: pctChange(yd.revenue, prev.revenue) },
          { label: 'Net Income', val: yd.netIncome ? `$${yd.netIncome}B` : 'N/A', change: pctChange(yd.netIncome, prev.netIncome) },
          { label: 'EBITDA', val: yd.ebitda ? `$${yd.ebitda}B` : 'N/A', change: pctChange(yd.ebitda, prev.ebitda) },
          { label: 'Operating Margin', val: yd.operatingMargin ? `${yd.operatingMargin}%` : 'N/A', change: prev.operatingMargin ? `${(yd.operatingMargin - prev.operatingMargin).toFixed(1)}pp` : null },
        ].map((m, i) => (
          <div key={i} className="bg-gray-50 rounded-lg p-3 text-center">
            <div className="text-[10px] text-gray-400 uppercase tracking-wide mb-1">{m.label}</div>
            <div className="text-lg font-bold text-navy">{m.val}</div>
            {m.change && <div className={`text-xs font-medium mt-0.5 ${m.change.startsWith('+') || m.change.startsWith('-') ? (m.change.startsWith('+') ? 'text-green-600' : 'text-red-600') : 'text-gray-500'}`}>{m.change} YoY</div>}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-4 gap-3">
        {[
          { label: 'EPS', val: typeof yd.eps === 'number' ? `$${yd.eps}` : (yd.eps || 'N/A'), change: typeof yd.eps === 'number' && typeof prev.eps === 'number' ? pctChange(yd.eps, prev.eps) : null },
          { label: 'Dividend', val: typeof yd.dividend === 'number' ? `$${yd.dividend}` : (yd.dividend || 'N/A'), change: typeof yd.dividend === 'number' && typeof prev.dividend === 'number' ? pctChange(yd.dividend, prev.dividend) : null },
          { label: 'Debt/EBITDA', val: yd.debtToEbitda ? `${yd.debtToEbitda}x` : 'N/A', change: prev.debtToEbitda ? `${(yd.debtToEbitda - prev.debtToEbitda).toFixed(1)}x` : null },
          { label: 'ROIC', val: yd.roic ? `${yd.roic}%` : 'N/A', change: prev.roic ? `${(yd.roic - prev.roic).toFixed(1)}pp` : null },
        ].map((m, i) => (
          <div key={i} className="bg-gray-50 rounded-lg p-3 text-center">
            <div className="text-[10px] text-gray-400 uppercase tracking-wide mb-1">{m.label}</div>
            <div className="text-lg font-bold text-navy">{m.val}</div>
            {m.change && <div className={`text-xs font-medium mt-0.5 ${String(m.change).startsWith('+') ? 'text-green-600' : String(m.change).startsWith('-') ? 'text-red-600' : 'text-gray-500'}`}>{m.change} YoY</div>}
          </div>
        ))}
      </div>
      {(typeof yd.eps === 'string' && yd.eps.includes('N/A')) && (
        <div className="mt-3 text-[10px] text-gray-400 text-center">* LVMH reports W&S as a division — EPS and dividends are at the group level</div>
      )}
    </div>
  )
}

function GeoRevenue({ geoRevenue }) {
  if (!geoRevenue) return null
  const data = Object.entries(geoRevenue).map(([region, pct]) => ({ region, pct })).sort((a, b) => b.pct - a.pct)
  return (
    <div className="bg-white rounded-xl border border-gray-100 p-5 mb-6">
      <h3 className="text-sm font-semibold text-navy uppercase tracking-wide mb-4 flex items-center gap-2"><Globe size={16} /> Revenue by Region</h3>
      <div className="space-y-3">
        {data.map(d => (
          <div key={d.region}>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-gray-600">{d.region}</span>
              <span className="font-semibold text-navy">{d.pct}%</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-2.5">
              <div className="bg-navy rounded-full h-2.5 transition-all" style={{ width: `${d.pct}%` }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function CategoryPresence({ categoryPresence }) {
  if (!categoryPresence) return null
  const entries = Object.entries(categoryPresence).sort((a, b) => b[1].share - a[1].share)
  const posColors = { 'Dominant': 'bg-green-100 text-green-700', 'Global #1': 'bg-green-100 text-green-700', 'Category Creator/Owner': 'bg-green-100 text-green-700', 'Ultra-Premium Leader': 'bg-green-100 text-green-700',
    'Strong #2': 'bg-blue-100 text-blue-700', 'Market Leader': 'bg-green-100 text-green-700', 'Premium Leader': 'bg-blue-100 text-blue-700', 'Category Leader': 'bg-green-100 text-green-700',
    'Growing Fast': 'bg-amber-100 text-amber-700', 'Emerging': 'bg-amber-100 text-amber-700', 'Category Pioneer': 'bg-purple-100 text-purple-700', 'Innovating Fast': 'bg-amber-100 text-amber-700',
    'Moderate': 'bg-gray-100 text-gray-600', 'Minor': 'bg-gray-100 text-gray-500', 'Minimal': 'bg-gray-100 text-gray-400', 'Small': 'bg-gray-100 text-gray-500', 'Absent': 'bg-red-50 text-red-400',
    'Niche Premium': 'bg-purple-100 text-purple-600', 'Challenger': 'bg-amber-100 text-amber-600', 'Declining #2': 'bg-red-100 text-red-600' }

  return (
    <div className="bg-white rounded-xl border border-gray-100 p-5 mb-6">
      <h3 className="text-sm font-semibold text-navy uppercase tracking-wide mb-4 flex items-center gap-2"><Layers size={16} /> Category Presence & Market Share</h3>
      <div className="space-y-3">
        {entries.map(([cat, info]) => (
          <div key={cat} className="border border-gray-50 rounded-lg p-3 hover:border-gray-200 transition-colors">
            <div className="flex items-center justify-between mb-1.5">
              <div className="flex items-center gap-2">
                <span className="font-medium text-sm text-navy">{cat}</span>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${posColors[info.position] || 'bg-gray-100 text-gray-600'}`}>{info.position}</span>
              </div>
              <span className="text-sm font-bold text-navy">{info.share}%</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-1.5 mb-2">
              <div className="bg-navy/60 rounded-full h-1.5" style={{ width: `${Math.min(info.share * 2, 100)}%` }} />
            </div>
            {info.brands && info.brands.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {info.brands.map((b, i) => <span key={i} className="text-[10px] bg-gray-50 text-gray-600 px-1.5 py-0.5 rounded">{b}</span>)}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

function HowToCompete({ company }) {
  const [showStrategies, setShowStrategies] = useState(true)
  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-br from-navy/5 to-navy/10 rounded-xl border border-navy/20 p-5">
        <h3 className="text-sm font-semibold text-navy uppercase tracking-wide mb-1 flex items-center gap-2">
          <Target size={16} /> Opportunities — {company.name}
        </h3>
        <p className="text-xs text-gray-500 mb-4">Strategic intelligence for brand managers and startup founders</p>
        {company.howToCompeteAgainst && company.howToCompeteAgainst.map((s, i) => (
          <div key={i} className="bg-white rounded-lg p-4 mb-3 border border-gray-100">
            <div className="flex items-start gap-3">
              <div className="bg-navy text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">{i + 1}</div>
              <div>
                <div className="font-semibold text-navy text-sm mb-1">{s.strategy}</div>
                <p className="text-xs text-gray-600 leading-relaxed">{s.detail}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white rounded-xl border border-gray-100 p-5">
          <h4 className="text-xs font-semibold text-navy uppercase tracking-wide mb-3 flex items-center gap-2"><Shield size={14} /> Their Strengths (Your Barriers)</h4>
          <div className="space-y-2">
            {company.strengthsForCompetitor && company.strengthsForCompetitor.map((s, i) => (
              <div key={i} className="flex gap-2 items-start">
                <AlertTriangle className="w-3.5 h-3.5 text-red-400 mt-0.5 flex-shrink-0" />
                <p className="text-xs text-gray-600 leading-relaxed">{s}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 p-5">
          <h4 className="text-xs font-semibold text-navy uppercase tracking-wide mb-3 flex items-center gap-2"><Zap size={14} /> Their Weaknesses (Your Opportunities)</h4>
          <div className="space-y-2">
            {company.weaknessesForCompetitor && company.weaknessesForCompetitor.map((s, i) => (
              <div key={i} className="flex gap-2 items-start">
                <ArrowRight className="w-3.5 h-3.5 text-green-500 mt-0.5 flex-shrink-0" />
                <p className="text-xs text-gray-600 leading-relaxed">{s}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function RecentMoves({ moves }) {
  if (!moves || moves.length === 0) return null
  return (
    <div className="bg-white rounded-xl border border-gray-100 p-5 mb-6">
      <h3 className="text-sm font-semibold text-navy uppercase tracking-wide mb-4 flex items-center gap-2"><AlertTriangle size={16} /> Threat Radar: Recent Moves</h3>
      <div className="space-y-3">
        {moves.map((m, i) => (
          <div key={i} className={`flex gap-4 items-start p-3 rounded-lg border ${THREAT_COLORS[m.threat]}`}>
            <div className="text-xs font-medium whitespace-nowrap mt-0.5">{m.date}</div>
            <div className="flex-1">
              <p className="text-xs leading-relaxed">{m.move}</p>
            </div>
            <span className="text-[10px] font-semibold uppercase whitespace-nowrap">{m.threat} threat</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function MATimeline({ timeline }) {
  if (!timeline || timeline.length === 0) return null
  return (
    <div className="bg-white rounded-xl border border-gray-100 p-5 mb-6">
      <h3 className="text-sm font-semibold text-navy uppercase tracking-wide mb-4 flex items-center gap-2"><Briefcase size={16} /> M&A History</h3>
      <div className="relative pl-6">
        <div className="absolute left-2 top-2 bottom-2 w-0.5 bg-gray-200" />
        {timeline.map((m, i) => (
          <div key={i} className="relative mb-4 last:mb-0">
            <div className={`absolute -left-4 top-1.5 w-3 h-3 rounded-full border-2 border-white ${MA_COLORS[m.type] || 'bg-gray-400'}`} />
            <div className="flex items-baseline gap-3">
              <span className="text-xs font-bold text-navy w-10">{m.year}</span>
              <span className="text-xs text-gray-600">{m.deal}</span>
              <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-medium ${m.type === 'acquisition' ? 'bg-green-50 text-green-600' : m.type === 'divestiture' ? 'bg-red-50 text-red-600' : m.type === 'partnership' ? 'bg-blue-50 text-blue-600' : 'bg-amber-50 text-amber-600'}`}>{m.type}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function DistributionIntel({ distribution, dealTerms }) {
  if (!distribution) return null
  return (
    <div className="bg-white rounded-xl border border-gray-100 p-5 mb-6">
      <h3 className="text-sm font-semibold text-navy uppercase tracking-wide mb-4 flex items-center gap-2"><MapPin size={16} /> UK Distribution & Deal Terms</h3>
      <div className="grid grid-cols-2 gap-3 mb-4">
        {Object.entries(distribution).map(([channel, desc]) => (
          <div key={channel} className="bg-gray-50 rounded-lg p-3">
            <div className="text-xs font-semibold text-navy capitalize mb-1">{channel.replace(/([A-Z])/g, ' $1').trim()}</div>
            <p className="text-[11px] text-gray-600 leading-relaxed">{desc}</p>
          </div>
        ))}
      </div>
      {dealTerms && (
        <div className="border-t border-gray-100 pt-4 mt-4">
          <h4 className="text-xs font-semibold text-navy uppercase mb-3">Typical Deal Structure</h4>
          <div className="grid grid-cols-2 gap-2">
            {Object.entries(dealTerms).map(([term, val]) => (
              <div key={term} className="flex gap-2 items-start">
                <span className="text-[10px] font-medium text-gray-400 uppercase w-24 flex-shrink-0">{term.replace(/([A-Z])/g, ' $1').trim()}</span>
                <span className="text-[11px] text-gray-600">{val}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

function WhiteSpaceAnalysis() {
  const oppColors = { 'Highest': 'bg-green-100 text-green-700 border-green-200', 'High': 'bg-blue-100 text-blue-700 border-blue-200', 'Moderate': 'bg-amber-100 text-amber-700 border-amber-200' }
  return (
    <div className="bg-gradient-to-br from-green-50/50 to-emerald-50/50 rounded-xl border border-green-200 p-5">
      <h3 className="text-sm font-semibold text-navy uppercase tracking-wide mb-1 flex items-center gap-2">
        <Target size={16} className="text-green-600" /> Category White Space Analysis
      </h3>
      <p className="text-xs text-gray-500 mb-4">Where the major companies are NOT competing — your biggest opportunities</p>
      <div className="space-y-3">
        {Object.entries(WHITE_SPACE).map(([cat, info]) => (
          <div key={cat} className="bg-white rounded-lg p-3 border border-gray-100 hover:border-green-200 transition-colors">
            <div className="flex items-center justify-between mb-1.5">
              <div className="flex items-center gap-2">
                <span className="font-medium text-sm text-navy">{cat}</span>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium border ${oppColors[info.opportunity] || 'bg-gray-100 text-gray-600'}`}>{info.opportunity} Opportunity</span>
              </div>
              <span className="text-xs font-semibold text-green-600">{info.growthRate}</span>
            </div>
            <div className="text-[11px] text-gray-500 mb-1"><span className="font-medium">Major presence:</span> {info.majorPresence}</div>
            <p className="text-xs text-gray-600 leading-relaxed">{info.notes}</p>
          </div>
        ))}
      </div>
    </div>
  )
}


function IndustryIntelligence({ company }) {
  const intel = company.industryIntel
  if (!intel) return <div className="p-6 text-center text-gray-400">Industry intelligence data not yet available for {company.name}.</div>

  const trendColors = { growing: 'bg-green-100 text-green-700', stable: 'bg-blue-100 text-blue-700', declining: 'bg-red-100 text-red-700', iconic: 'bg-purple-100 text-purple-700' }

  return (
    <div className="space-y-6">
      {/* Company Type Badge */}
      <div className={`rounded-xl border-2 p-5 ${company.isPrivate ? 'border-amber-200 bg-amber-50/30' : 'border-blue-200 bg-blue-50/30'}`}>
        <div className="flex items-center gap-2 mb-3">
          {company.isPrivate ? <Lock className="w-5 h-5 text-amber-600" /> : <TrendingUp className="w-5 h-5 text-blue-600" />}
          <h3 className="text-sm font-bold text-navy uppercase tracking-wide">
            Industry Intelligence ({company.isPrivate ? 'Private Company' : 'Public Company — ' + company.ticker})
          </h3>
        </div>

        {company.isPrivate ? (
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white rounded-lg p-4 border border-amber-100">
              <div className="text-xs text-gray-400 mb-1">Estimated Revenue Range</div>
              <div className="text-xl font-bold text-navy">{company.revenue}</div>
            </div>
            <div className="bg-white rounded-lg p-4 border border-amber-100">
              <div className="text-xs text-gray-400 mb-2">Intelligence Sources</div>
              <div className="flex flex-wrap gap-1">
                {intel.intelligenceSources.map((s, i) => <span key={i} className="text-[10px] px-2 py-0.5 bg-amber-100 text-amber-800 rounded-full">{s}</span>)}
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-4 gap-3">
            <div className="bg-white rounded-lg p-3 border border-blue-100 text-center">
              <div className="text-xs text-gray-400 mb-1">Market Cap</div>
              <div className="text-lg font-bold text-navy">{company.marketCap}</div>
            </div>
            <div className="bg-white rounded-lg p-3 border border-blue-100 text-center">
              <div className="text-xs text-gray-400 mb-1">Revenue</div>
              <div className="text-lg font-bold text-navy">{company.revenue}</div>
            </div>
            <div className="bg-white rounded-lg p-3 border border-blue-100 text-center">
              <div className="text-xs text-gray-400 mb-1">Stock YTD</div>
              <div className={`text-lg font-bold ${company.stockYTD && company.stockYTD.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>{company.stockYTD || 'N/A'}</div>
            </div>
            <div className="bg-white rounded-lg p-3 border border-blue-100">
              <div className="text-xs text-gray-400 mb-1">Sources</div>
              <div className="flex flex-wrap gap-1">
                {intel.intelligenceSources.slice(0, 3).map((s, i) => <span key={i} className="text-[9px] px-1.5 py-0.5 bg-blue-100 text-blue-700 rounded-full">{s}</span>)}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Brand Intelligence Cards */}
      <div>
        <h3 className="text-sm font-bold text-navy uppercase tracking-wide mb-3 flex items-center gap-2"><Star size={16} className="text-gold" /> Brand Intelligence</h3>
        <div className="grid grid-cols-2 gap-3">
          {intel.brandIntel.map((brand, i) => (
            <div key={i} className="bg-white rounded-lg border border-gray-100 p-4 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold text-navy">{brand.name}</span>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${trendColors[brand.trend] || 'bg-gray-100 text-gray-600'}`}>{brand.trend}</span>
              </div>
              <div className="text-xs text-gray-500 mb-1">{brand.position}</div>
              <div className="text-xs text-gray-400 mb-2">{brand.marketShare}</div>
              <div className="text-[11px] text-gray-600 leading-relaxed border-t border-gray-50 pt-2 mt-1">Latest: {brand.latest}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Developments */}
      <div>
        <h3 className="text-sm font-bold text-navy uppercase tracking-wide mb-3 flex items-center gap-2"><Zap size={16} className="text-gold" /> Recent Developments</h3>
        <div className="space-y-3">
          {intel.recentDevelopments.map((dev, i) => (
            <div key={i} className="flex gap-4 items-start">
              <div className="text-xs font-semibold text-gold whitespace-nowrap min-w-[70px]">{dev.date}</div>
              <div className="text-sm text-gray-600 leading-relaxed">{dev.event}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Analyst Outlook */}
      <div className="bg-gradient-to-r from-navy/5 to-gold/5 rounded-xl border border-gray-100 p-5">
        <h3 className="text-sm font-bold text-navy uppercase tracking-wide mb-3 flex items-center gap-2"><BookOpen size={16} className="text-navy" /> Analyst Outlook</h3>
        <p className="text-sm text-gray-700 leading-relaxed">{intel.analystOutlook}</p>
      </div>
    </div>
  )
}

function CompanyDetail({ company }) {
  const [companyTab, setCompanyTab] = useState('compete')

  const tabs = [
    { id: 'compete', label: 'Opportunities', icon: Target },
    { id: 'overview', label: 'Company Profile', icon: Building2 },
    { id: 'categories', label: 'Categories', icon: Layers },
    { id: 'distribution', label: 'Distribution', icon: MapPin },
    { id: 'financials', label: 'Financials', icon: BarChart3 },
    { id: 'manda', label: 'M&A', icon: Briefcase },
    { id: 'intel', label: 'Industry Intel', icon: BookOpen },
  ]

  return (
    <div>
      <div className="flex items-center gap-3 mb-1">
        <Building2 className="w-6 h-6 text-navy" />
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-navy">{company.name}</h2>
            {company.isPrivate && <span className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full font-medium">Private</span>}
            {!company.isPrivate && <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-medium">{company.ticker}</span>}
          </div>
          <div className="flex items-center gap-4 mt-0.5 text-sm text-gray-500">
            <span>{company.hq}</span>
            <span>{company.revenue} revenue</span>
            <span className={company.revenueGrowth.startsWith('+') ? 'text-green-600 font-medium' : 'text-red-600 font-medium'}>{company.revenueGrowth}</span>
            {company.employees && <span>{company.employees}</span>}
          </div>
        </div>
      </div>

      <p className="text-sm text-gray-600 leading-relaxed mt-3 mb-4">{company.description}</p>

      <SubTabNav tabs={tabs} active={companyTab} onChange={setCompanyTab} />

      {companyTab === 'compete' && <HowToCompete company={company} />}

      {companyTab === 'overview' && (
        <div>
          <div className="bg-white rounded-xl border border-gray-100 p-5 mb-6">
            <h3 className="text-sm font-semibold text-navy uppercase tracking-wide mb-3 flex items-center gap-2"><Star size={16} /> Key Brands</h3>
            <div className="flex flex-wrap gap-1.5">
              {company.keyBrands.map((b, i) => <span key={i} className="px-2.5 py-1 bg-navy/5 text-navy rounded-full text-xs font-medium">{b}</span>)}
            </div>
          </div>
          <RecentMoves moves={company.recentMoves} />
          {company.profileSources && (
            <div className="bg-gray-50 rounded-xl border border-gray-200 p-5 mt-6">
              <h3 className="text-sm font-semibold text-navy uppercase tracking-wide mb-3 flex items-center gap-2"><BookOpen size={16} /> Data Sources & Citations</h3>
              <div className="space-y-2">
                {company.profileSources.map((s, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-gray-600">
                    <span className="w-1.5 h-1.5 bg-gold rounded-full flex-shrink-0" />
                    {s.url ? <a href={s.url} target="_blank" rel="noopener noreferrer" className="hover:text-navy hover:underline transition-colors">{s.label} <ExternalLink size={10} className="inline ml-0.5 opacity-50" /></a> : <span>{s.label}</span>}
                  </div>
                ))}
              </div>
              <p className="text-[10px] text-gray-400 mt-3 border-t border-gray-200 pt-2">Financial data sourced from annual reports, SEC/regulatory filings, and industry databases. Market share estimates from IWSR and Euromonitor. Last updated: February 2026.</p>
            </div>
          )}
        </div>
      )}

      {companyTab === 'categories' && <CategoryPresence categoryPresence={company.categoryPresence} />}

      {companyTab === 'distribution' && <DistributionIntel distribution={company.distributionUK} dealTerms={company.typicalDealTerms} />}

      {companyTab === 'financials' && (
        <div>
          <FinancialTimeline financials={company.financials} />
          <GeoRevenue geoRevenue={company.geoRevenue} />
        </div>
      )}

      {companyTab === 'manda' && <MATimeline timeline={company.maTimeline} />}

      {companyTab === 'intel' && <IndustryIntelligence company={company} />}
    </div>
  )
}

export default function Companies() {
  const [selected, setSelected] = useState(0)
  const [showWhiteSpace, setShowWhiteSpace] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')

  const filtered = COMPANIES.filter(c =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.keyBrands.some(b => b.toLowerCase().includes(searchTerm.toLowerCase()))
  )

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-display font-bold text-navy">Competitive Intelligence</h1>
          <p className="text-gray-400 text-sm mt-1">Who dominates your category? Where are the gaps? How do you compete?</p>
        </div>
        <button onClick={() => setShowWhiteSpace(!showWhiteSpace)}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${showWhiteSpace ? 'bg-green-600 text-white' : 'bg-green-50 text-green-700 border border-green-200 hover:bg-green-100'}`}>
          <Target size={16} /> {showWhiteSpace ? 'Hide White Space' : 'Category White Space'}
        </button>
      </div>

      {showWhiteSpace && (
        <div className="mb-6">
          <WhiteSpaceAnalysis />
        </div>
      )}

      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-3">
          <div className="relative mb-3">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
            <input type="text" placeholder="Search companies or brands..."
              value={searchTerm} onChange={e => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-navy" />
          </div>
          <div className="space-y-2 max-h-[calc(100vh-280px)] overflow-y-auto">
            {filtered.map((company, i) => {
              const realIdx = COMPANIES.indexOf(company)
              return <CompanyCard key={i} company={company} isActive={selected === realIdx} onClick={() => setSelected(realIdx)} />
            })}
          </div>
          <div className="mt-4 bg-navy/5 rounded-lg p-3 border border-navy/10">
            <div className="text-[10px] text-navy font-semibold uppercase tracking-wide mb-1">For Brand Managers</div>
            <p className="text-[11px] text-gray-500 leading-relaxed">Click any company to see their category dominance, distribution strategy, deal terms, and most importantly — how to compete against them.</p>
          </div>
        </div>
        <div className="col-span-9">
          <CompanyDetail company={COMPANIES[selected]} />
        </div>
      </div>
    </div>
  )
}
