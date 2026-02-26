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
    description: "World\\u2019s largest spirits company by revenue. Controls premium-to-luxury brands across every major spirits category. Dominates Scotch whisky and has aggressively built tequila and RTD portfolios.",
    keyBrands: ["Johnnie Walker", "Guinness", "Smirnoff", "Tanqueray", "Don Julio", "Casamigos", "Baileys", "Captain Morgan", "Crown Royal", "Ketel One", "Bulleit", "Seedlip"],
    categoryPresence: {"Scotch Whisky": {"share": 37, "brands": ["Johnnie Walker", "Talisker", "Lagavulin", "Oban", "Singleton"], "position": "Dominant"}, "Tequila": {"share": 22, "brands": ["Don Julio", "Casamigos", "DeLe\u00f3n"], "position": "Strong #2"}, "Vodka": {"share": 14, "brands": ["Smirnoff", "Ketel One", "C\u00eeroc"], "position": "Market Leader"}, "Gin": {"share": 18, "brands": ["Tanqueray", "Gordon\\u2019s"], "position": "Strong #2"}, "Rum": {"share": 11, "brands": ["Captain Morgan", "Zacapa"], "position": "#2 Global"}, "Bourbon": {"share": 8, "brands": ["Bulleit", "Blade & Bow"], "position": "Challenger"}, "Irish Whiskey": {"share": 5, "brands": ["Roe & Co", "Baileys"], "position": "Minor"}, "Beer": {"share": 4, "brands": ["Guinness"], "position": "Niche Premium"}, "RTD": {"share": 15, "brands": ["Smirnoff Ice", "Crown Royal Canned", "Ketel One Botanical Spritz"], "position": "Growing Fast"}, "No/Lo": {"share": 20, "brands": ["Seedlip", "Ritual Zero Proof", "Guinness 0.0"], "position": "Category Pioneer"}},
    distributionUK: {"onTrade": "Direct key accounts team (120+ reps) + Diageo One platform for independents", "offTrade": "Full national coverage via major multiples, direct to Tesco/Sainsbury\\u2019s/Waitrose", "travelRetail": "Dedicated TR division, present in 140+ airports globally", "ecommerce": "Diageo DTC platform (Malts.com, TheBar.com), plus Amazon/Drizly"},
    typicalDealTerms: {"listingFee": "\\u00a350-200K for national on-trade", "exclusivity": "12-24 month preferred pouring deals", "marketingSupport": "Joint business plans with top 500 accounts, 5-15% of account revenue", "paymentTerms": "30-60 days standard"},
    strengthsForCompetitor: ["Scale creates massive barrier \\u2014 can outspend any startup 100:1 on marketing", "Diageo One platform locks in thousands of independent pubs and bars", "Portfolio breadth means they can bundle deals (buy Tanqueray, get Captain Morgan discount)", "Unmatched global distribution \\u2014 if they want to enter your niche, they can overnight"],
    weaknessesForCompetitor: ["Slow to move \\u2014 big-company bureaucracy means 12-18 month decision cycles", "Brand fatigue in key segments \\u2014 Smirnoff viewed as \\u2018old\\u2019 by Gen Z consumers", "Their sales teams push volume, not stories \\u2014 craft narrative is your advantage", "Diageo One platform struggles with premium/artisanal positioning", "Over-reliance on Scotch (28% of revenue) exposes them to single-category risk"],
    howToCompeteAgainst: [{"strategy": "Own your story", "detail": "Diageo brands are corporate. Lead with founder story, provenance, and craft credentials. Bartenders prefer brands with personality."}, {"strategy": "Target the gaps", "detail": "Diageo is weak in: mezcal, Japanese whisky, premium rum (Zacapa aside), craft vodka, agave-based RTDs. These are high-growth white spaces."}, {"strategy": "Win the back bar first", "detail": "Don\\u2019t fight for well pours. Get on the \\u2018recommended\\u2019 list. Bartender advocacy beats distributor push."}, {"strategy": "Move faster", "detail": "Limited editions, collaborations, seasonal releases \\u2014 you can do in 6 weeks what takes Diageo 6 months."}, {"strategy": "Digital-first", "detail": "Diageo\\u2019s social media is corporate. Authentic TikTok/Instagram content drives trial with under-35s where Diageo struggles."}],
    recentMoves: [{"date": "Jan 2026", "move": "Launched \\u2018Diageo Ventures\\u2019 $100M fund targeting craft spirits acquisitions", "threat": "high"}, {"date": "Nov 2025", "move": "Expanded Don Julio 1942 distribution to 15 new markets", "threat": "medium"}, {"date": "Sep 2025", "move": "Acquired minority stake in a Mexican mezcal brand (undisclosed)", "threat": "high"}, {"date": "Jul 2025", "move": "Launched Smirnoff rebrand targeting Gen Z with new packaging", "threat": "low"}, {"date": "Mar 2025", "move": "Guinness 0.0 surpassed Heineken 0.0 in UK off-trade sales", "threat": "medium"}],
    financials: {"2025": {"revenue": 20.3, "operatingMargin": 28.4, "netIncome": 3.8, "ebitda": 6.2, "eps": 16.12, "dividend": 4.56, "debtToEbitda": 2.8, "roic": 14.2}, "2024": {"revenue": 20.0, "operatingMargin": 27.8, "netIncome": 3.6, "ebitda": 5.9, "eps": 15.45, "dividend": 4.4, "debtToEbitda": 2.9, "roic": 13.8}, "2023": {"revenue": 20.5, "operatingMargin": 29.1, "netIncome": 4.0, "ebitda": 6.4, "eps": 16.85, "dividend": 4.28, "debtToEbitda": 2.6, "roic": 15.1}, "2022": {"revenue": 19.4, "operatingMargin": 28.6, "netIncome": 3.9, "ebitda": 5.8, "eps": 15.92, "dividend": 4.02, "debtToEbitda": 2.7, "roic": 14.6}, "2021": {"revenue": 15.5, "operatingMargin": 24.1, "netIncome": 2.8, "ebitda": 4.4, "eps": 11.42, "dividend": 3.64, "debtToEbitda": 3.4, "roic": 11.2}},
    geoRevenue: {"North America": 38, "Europe": 26, "Asia Pacific": 20, "Latin America": 9, "Africa/ME": 7},
    maTimeline: [{"year": 2025, "deal": "Mezcal brand minority stake (undisclosed)", "type": "investment"}, {"year": 2023, "deal": "Sold Archers and Pimm\\u2019s to focus portfolio", "type": "divestiture"}, {"year": 2022, "deal": "Acquired remaining 79% of Seedlip for $300M", "type": "acquisition"}, {"year": 2021, "deal": "Invested $115M in Aviation Gin (post Reynolds sale)", "type": "investment"}, {"year": 2020, "deal": "Acquired Chase Distillery (UK craft) for $60M", "type": "acquisition"}, {"year": 2017, "deal": "Acquired Casamigos for $1.3B", "type": "acquisition"}, {"year": 2015, "deal": "Acquired Don Julio from Jos\u00e9 Cuervo in swap deal", "type": "acquisition"}]
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
    description: "World\\u2019s #2 spirits company. Decentralised \\u2018brand company\\u2019 model gives individual brands more autonomy than Diageo. Strong in Irish whiskey (Jameson), cognac (Martell), and Scotch (Chivas, Glenlivet).",
    keyBrands: ["Absolut", "Jameson", "Chivas Regal", "The Glenlivet", "Martell", "Malibu", "Havana Club", "Beefeater", "Monkey 47", "Lillet"],
    categoryPresence: {"Irish Whiskey": {"share": 42, "brands": ["Jameson", "Redbreast", "Powers", "Method and Madness"], "position": "Dominant"}, "Cognac": {"share": 18, "brands": ["Martell"], "position": "Strong #2"}, "Scotch Whisky": {"share": 15, "brands": ["Chivas Regal", "The Glenlivet", "Aberlour", "Royal Salute"], "position": "Strong #2"}, "Vodka": {"share": 12, "brands": ["Absolut"], "position": "Declining #2"}, "Gin": {"share": 14, "brands": ["Beefeater", "Monkey 47", "Plymouth"], "position": "#3 Global"}, "Rum": {"share": 8, "brands": ["Havana Club", "Malibu"], "position": "Moderate"}, "Tequila": {"share": 5, "brands": ["Altos", "Avion"], "position": "Small but growing"}, "No/Lo": {"share": 8, "brands": ["Celtic Soul", "Lyre\\u2019s (distribution)"], "position": "Emerging"}},
    distributionUK: {"onTrade": "Chivas Brothers UK team + third-party via Pernod Ricard UK, ~80 field reps", "offTrade": "National multiples direct, Absolut and Jameson have dedicated retail teams", "travelRetail": "Strong TR presence, The Glenlivet and Chivas dominate airport Scotch", "ecommerce": "The Whisky Exchange (owned), direct platform via Drinks&Co"},
    typicalDealTerms: {"listingFee": "\\u00a330-150K depending on channel", "exclusivity": "Flexible \\u2014 less rigid than Diageo, brand-by-brand approach", "marketingSupport": "Brand activation budgets per account, cocktail training programs", "paymentTerms": "30-45 days"},
    strengthsForCompetitor: ["Decentralised model means their brands have genuine personality \\u2014 harder to \\u2018out-craft\\u2019 them", "Jameson\\u2019s momentum in Irish whiskey makes it very hard to compete in that category", "Monkey 47 proves they can buy and scale craft brands without killing authenticity", "The Whisky Exchange gives them an owned e-commerce channel with credibility"],
    weaknessesForCompetitor: ["Absolut is bleeding share \\u2014 the vodka portfolio is their Achilles heel", "China/Martell exposure means corporate attention is diverted to fixing cognac", "Slower to invest in RTD compared to Diageo \\u2014 opportunity to establish first", "Less dominant in tequila \\u2014 Altos is growing but from a small base", "UK on-trade team smaller than Diageo \\u2019s \\u2014 less coverage means less lock-out"],
    howToCompeteAgainst: [{"strategy": "Exploit the vodka gap", "detail": "Absolut\\u2019s decline creates shelf space. Premium craft vodka with a genuine story can take Absolut\\u2019s abandoned premium positioning."}, {"strategy": "Out-innovate in RTD", "detail": "Pernod is slow here. Launch RTD first in premium on-trade and you\\u2019ll have 18+ months head start before they respond."}, {"strategy": "Leverage their flexibility", "detail": "Pernod\\u2019s brand teams have more autonomy \\u2014 they\\u2019re actually good partners for complementary brands. Consider co-marketing."}, {"strategy": "Go where Martell isn\\u2019t", "detail": "Their cognac distraction means less focus on emerging categories. Win in mezcal, Japanese whisky, or premium gin while their attention is elsewhere."}],
    recentMoves: [{"date": "Dec 2025", "move": "Launched Celtic Soul non-alc range in 15 markets", "threat": "medium"}, {"date": "Oct 2025", "move": "Restructured US distribution \\u2014 went direct in 5 states", "threat": "low"}, {"date": "Jun 2025", "move": "Jameson hit 10M case milestone \\u2014 expanding bartender programs", "threat": "high"}, {"date": "Mar 2025", "move": "Acquired stake in premium RTD brand (undisclosed)", "threat": "medium"}],
    financials: {"2025": {"revenue": 12.1, "operatingMargin": 26.8, "netIncome": 2.1, "ebitda": 3.8, "eps": 8.12, "dividend": 4.12, "debtToEbitda": 2.5, "roic": 10.8}, "2024": {"revenue": 12.2, "operatingMargin": 27.2, "netIncome": 2.2, "ebitda": 3.9, "eps": 8.45, "dividend": 4.0, "debtToEbitda": 2.4, "roic": 11.2}, "2023": {"revenue": 13.0, "operatingMargin": 28.5, "netIncome": 2.5, "ebitda": 4.3, "eps": 9.62, "dividend": 3.85, "debtToEbitda": 2.2, "roic": 12.5}, "2022": {"revenue": 12.5, "operatingMargin": 27.9, "netIncome": 2.3, "ebitda": 4.0, "eps": 8.88, "dividend": 3.72, "debtToEbitda": 2.3, "roic": 11.8}, "2021": {"revenue": 10.7, "operatingMargin": 25.4, "netIncome": 1.8, "ebitda": 3.2, "eps": 6.92, "dividend": 3.12, "debtToEbitda": 3.0, "roic": 9.4}},
    geoRevenue: {"North America": 28, "Europe": 24, "Asia Pacific": 30, "Latin America": 8, "Africa/ME": 10},
    maTimeline: [{"year": 2025, "deal": "Premium RTD brand stake (undisclosed)", "type": "investment"}, {"year": 2024, "deal": "Sold wine portfolio to focus on spirits", "type": "divestiture"}, {"year": 2022, "deal": "Acquired Skrewball Peanut Butter Whiskey for $700M", "type": "acquisition"}, {"year": 2020, "deal": "Acquired Monkey 47 (remaining stake) for \\u20ac200M", "type": "acquisition"}, {"year": 2019, "deal": "Acquired Castle Brands (Jefferson\\u2019s Bourbon) for $223M", "type": "acquisition"}, {"year": 2016, "deal": "Acquired Smooth Ambler Spirits for $65M", "type": "acquisition"}]
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
    description: "The luxury titan\\u2019s spirits division. Dominates ultra-premium champagne and cognac. More of a luxury goods company than a drinks company \\u2014 their competitive advantage is prestige, not distribution breadth.",
    keyBrands: ["Mo\\u00ebt & Chandon", "Hennessy", "Dom P\\u00e9rignon", "Veuve Clicquot", "Glenmorangie", "Belvedere", "Krug", "Cha\\u0302teau d\\u2019Yquem"],
    categoryPresence: {"Champagne": {"share": 24, "brands": ["Mo\\u00ebt", "Dom P\\u00e9rignon", "Veuve Clicquot", "Krug", "Ruinart"], "position": "Dominant"}, "Cognac": {"share": 40, "brands": ["Hennessy"], "position": "Global #1"}, "Scotch Whisky": {"share": 3, "brands": ["Glenmorangie", "Ardbeg"], "position": "Niche Premium"}, "Vodka": {"share": 4, "brands": ["Belvedere"], "position": "Ultra-Premium Niche"}, "Wine": {"share": 8, "brands": ["Ch\\u00e2teau d\\u2019Yquem", "Cloudy Bay", "Cape Mentelle"], "position": "Prestige"}, "Rum": {"share": 0, "brands": [], "position": "Absent"}, "Gin": {"share": 0, "brands": [], "position": "Absent"}, "Tequila": {"share": 1, "brands": ["Volcan de mi Tierra"], "position": "Minimal"}},
    distributionUK: {"onTrade": "MHD (Mo\\u00ebt Hennessy Distribution) \\u2014 selective, luxury-focused, ~40 key account managers", "offTrade": "Selective distribution \\u2014 Waitrose, Selfridges, Harrods, specialist wine merchants", "travelRetail": "Premium airport boutiques, duty-free leader in champagne and cognac", "ecommerce": "Clos19.com (owned luxury DTC platform)"},
    typicalDealTerms: {"listingFee": "Selective \\u2014 they choose accounts, not the other way around", "exclusivity": "Implied through prestige \\u2014 LVMH brands elevate a venue\\u2019s status", "marketingSupport": "High-end experiential events, brand ambassador programs", "paymentTerms": "30 days, strict compliance requirements"},
    strengthsForCompetitor: ["Luxury halo effect \\u2014 LVMH brands are aspirational, they set the price ceiling", "Hennessy\\u2019s 40% cognac market share is essentially an unassailable monopoly", "Their brands don\\u2019t compete on price \\u2014 they create their own demand at ultra-premium", "Champagne portfolio is untouchable \\u2014 brand equity built over centuries"],
    weaknessesForCompetitor: ["Massive blind spot in everyday premium \\u2014 nothing between \\u00a320-40 RRP", "Zero presence in rum, gin, tequila (beyond tiny Volcan), RTD, or no/lo", "China dependency (Hennessy) makes them vulnerable to geopolitical risk", "Luxury positioning means they can\\u2019t chase volume \\u2014 entire categories are off-limits to them", "Small UK sales team \\u2014 only 40 key account managers vs Diageo\\u2019s 120+"],
    howToCompeteAgainst: [{"strategy": "Don\\u2019t compete \\u2014 coexist", "detail": "LVMH occupies the ultra-luxury space. If you\\u2019re \\u00a325-45 RRP, you\\u2019re not competing with them. Their presence actually helps by anchoring high price expectations."}, {"strategy": "Fill their gaps", "detail": "LVMH has zero gin, zero rum, near-zero tequila. These are the fastest-growing categories. They\\u2019re leaving billions on the table."}, {"strategy": "Offer what luxury can\\u2019t", "detail": "Authenticity, approachability, bartender-friendly formats. LVMH brands are often \\u2018display bottles\\u2019 \\u2014 yours can be the working pour."}, {"strategy": "Watch their acquisition radar", "detail": "LVMH is looking to fill these gaps. If your brand gets traction in premium tequila/rum/gin, you could be an acquisition target (or a competitor to one)."}],
    recentMoves: [{"date": "Feb 2026", "move": "Rumored interest in acquiring a Japanese whisky distillery", "threat": "medium"}, {"date": "Nov 2025", "move": "Glenmorangie repackaged with new luxury positioning", "threat": "low"}, {"date": "Aug 2025", "move": "Acquired Ch\\u00e2teau Galoupet ros\\u00e9 estate in Provence", "threat": "low"}, {"date": "May 2025", "move": "Dom P\\u00e9rignon x Lady Gaga collaboration drove viral social media", "threat": "low"}],
    financials: {"2025": {"revenue": 7.5, "operatingMargin": 32.1, "netIncome": 1.6, "ebitda": 2.8, "eps": "N/A (group)", "dividend": "N/A (group)", "debtToEbitda": 1.2, "roic": 18.5}, "2024": {"revenue": 7.8, "operatingMargin": 33.5, "netIncome": 1.8, "ebitda": 3.0, "eps": "N/A (group)", "dividend": "N/A (group)", "debtToEbitda": 1.1, "roic": 19.8}, "2023": {"revenue": 7.8, "operatingMargin": 33.2, "netIncome": 1.7, "ebitda": 3.0, "eps": "N/A (group)", "dividend": "N/A (group)", "debtToEbitda": 1.0, "roic": 20.2}, "2022": {"revenue": 7.1, "operatingMargin": 31.4, "netIncome": 1.5, "ebitda": 2.6, "eps": "N/A (group)", "dividend": "N/A (group)", "debtToEbitda": 1.1, "roic": 18.8}, "2021": {"revenue": 6.8, "operatingMargin": 30.8, "netIncome": 1.4, "ebitda": 2.4, "eps": "N/A (group)", "dividend": "N/A (group)", "debtToEbitda": 1.3, "roic": 17.2}},
    geoRevenue: {"North America": 32, "Europe": 22, "Asia Pacific": 36, "Latin America": 5, "Africa/ME": 5},
    maTimeline: [{"year": 2025, "deal": "Ch\\u00e2teau Galoupet ros\\u00e9 acquisition", "type": "acquisition"}, {"year": 2024, "deal": "Volcan de mi Tierra tequila expanded distribution", "type": "investment"}, {"year": 2022, "deal": "Joseph Phelps Vineyards (Napa) acquired", "type": "acquisition"}, {"year": 2019, "deal": "Ch\u00e2teau d\\u2019Esclans (Whispering Angel) acquired for \\u20ac100M+", "type": "acquisition"}, {"year": 2017, "deal": "Colgin Cellars (Napa cult wine) acquired", "type": "acquisition"}]
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
    description: "Largest privately-held spirits company globally. Family-owned since 1862. Strong in rum (Bacard\\u00ed), tequila (Patr\\u00f3n), and gin (Bombay Sapphire). Aggressive tequila play via Patr\\u00f3n acquisition.",
    keyBrands: ["Bacard\\u00ed", "Grey Goose", "Patr\\u00f3n", "Bombay Sapphire", "Dewar\\u2019s", "Martini", "St-Germain", "Cazadores", "Aberfeldy", "Angel\\u2019s Envy"],
    categoryPresence: {"Rum": {"share": 22, "brands": ["Bacard\\u00ed"], "position": "Global #1"}, "Tequila": {"share": 28, "brands": ["Patr\\u00f3n", "Cazadores"], "position": "Premium Leader"}, "Vodka": {"share": 8, "brands": ["Grey Goose"], "position": "Ultra-Premium #1"}, "Gin": {"share": 15, "brands": ["Bombay Sapphire", "Bombay Bramble"], "position": "Strong #3"}, "Scotch Whisky": {"share": 6, "brands": ["Dewar\\u2019s", "Aberfeldy", "Craigellachie"], "position": "Moderate"}, "Bourbon": {"share": 4, "brands": ["Angel\\u2019s Envy"], "position": "Emerging Premium"}, "Liqueurs": {"share": 12, "brands": ["St-Germain", "Martini"], "position": "Strong Niche"}, "RTD": {"share": 5, "brands": ["Bacard\\u00ed RTD range"], "position": "Growing"}},
    distributionUK: {"onTrade": "Bacardi-Martini UK, ~60 field reps, strong cocktail bar presence", "offTrade": "National coverage, Grey Goose and Bombay Sapphire premium shelf leaders", "travelRetail": "Selective \\u2014 Patr\\u00f3n and Grey Goose focused", "ecommerce": "Third-party (Amazon, Drizly, Master of Malt)"},
    typicalDealTerms: {"listingFee": "\\u00a325-120K for national on-trade", "exclusivity": "Brand ambassador programs rather than strict exclusivity", "marketingSupport": "Heavy cocktail training investment, Bacardi Legacy competition", "paymentTerms": "30-45 days"},
    strengthsForCompetitor: ["Patr\\u00f3n gives them the premium tequila crown \\u2014 hard to displace", "Bartender advocacy is best-in-class \\u2014 Bacardi Legacy competition creates global loyalty", "St-Germain owns the elderflower liqueur category outright \\u2014 monopoly position", "Family ownership means long-term thinking \\u2014 no quarterly earnings pressure"],
    weaknessesForCompetitor: ["Bacard\\u00ed (white rum) is viewed as a mixer brand, not premium \\u2014 hurts brand halo", "Grey Goose losing share to newer premium vodkas \\u2014 brand ageing with its consumers", "No meaningful presence in Irish whiskey, Japanese whisky, or mezcal", "Cocktail-bar focus means weaker presence in casual dining and pub chains", "Private ownership means less capital for mega-acquisitions vs public competitors"],
    howToCompeteAgainst: [{"strategy": "Target their rum weakness", "detail": "Bacard\\u00ed is a mixer. Premium sipping rum (\\u00a335+) is wide open. Bacardi\\u2019s premium rum attempts (Facundo) haven\\u2019t broken through."}, {"strategy": "Out-premiumise Grey Goose", "detail": "Grey Goose\\u2019s luxury positioning is fading. A craft vodka with genuine provenance story can take the \\u2018bartender\\u2019s choice\\u2019 position."}, {"strategy": "Leverage their bartender network", "detail": "Bacardi invests heavily in bartender culture. If your brand can get into Bacardi Legacy bars as a complementary (not competing) option, you ride their investment."}, {"strategy": "Win in categories they\\u2019re absent", "detail": "Irish whiskey, mezcal, Japanese spirits, premium RTD cocktails \\u2014 all fast-growing, all gaps in Bacardi\\u2019s portfolio."}],
    recentMoves: [{"date": "Jan 2026", "move": "Expanded Patr\\u00f3n El Alto ultra-premium line to 20 markets", "threat": "high"}, {"date": "Oct 2025", "move": "Launched Bombay Sapphire RTD range in UK", "threat": "medium"}, {"date": "Jul 2025", "move": "Angel\\u2019s Envy bourbon expansion into Europe", "threat": "medium"}, {"date": "Apr 2025", "move": "Bacardi Legacy competition expanded to 50 countries", "threat": "low"}],
    financials: {"2025": {"revenue": 5.6, "operatingMargin": 22.5, "netIncome": 0.85}, "2024": {"revenue": 5.4, "operatingMargin": 21.8, "netIncome": 0.78}, "2023": {"revenue": 5.8, "operatingMargin": 23.2, "netIncome": 0.92}, "2022": {"revenue": 5.5, "operatingMargin": 22.0, "netIncome": 0.81}, "2021": {"revenue": 4.6, "operatingMargin": 19.8, "netIncome": 0.6}},
    geoRevenue: {"North America": 42, "Europe": 28, "Asia Pacific": 14, "Latin America": 12, "Africa/ME": 4},
    maTimeline: [{"year": 2023, "deal": "Increased Angel\\u2019s Envy investment for US bourbon push", "type": "investment"}, {"year": 2022, "deal": "Acquired Ilegal Mezcal for ~$90M", "type": "acquisition"}, {"year": 2018, "deal": "Acquired Patr\\u00f3n for $5.1B \\u2014 largest spirits deal ever", "type": "acquisition"}, {"year": 2016, "deal": "Acquired Angel\\u2019s Envy Bourbon", "type": "acquisition"}, {"year": 2013, "deal": "Acquired St-Germain elderflower liqueur", "type": "acquisition"}]
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
    keyBrands: ["Jim Beam", "Maker\\u2019s Mark", "Suntory Whisky Toki", "Hibiki", "Roku Gin", "Knob Creek", "Laphroaig", "Bowmore", "Courvoisier", "Yamazaki"],
    categoryPresence: {"Bourbon": {"share": 32, "brands": ["Jim Beam", "Maker\\u2019s Mark", "Knob Creek", "Basil Hayden\\u2019s"], "position": "Category Leader"}, "Japanese Whisky": {"share": 65, "brands": ["Hibiki", "Yamazaki", "Hakushu", "Toki"], "position": "Dominant"}, "Scotch Whisky": {"share": 5, "brands": ["Laphroaig", "Bowmore", "Auchentoshan"], "position": "Islay Specialist"}, "Gin": {"share": 6, "brands": ["Roku", "Sipsmith"], "position": "Growing Premium"}, "Cognac": {"share": 10, "brands": ["Courvoisier"], "position": "Strong #3"}, "Tequila": {"share": 5, "brands": ["Hornitos", "Sauza"], "position": "Value Segment"}, "RTD": {"share": 8, "brands": ["-196", "Jim Beam Highball"], "position": "Innovating Fast"}},
    distributionUK: {"onTrade": "Beam Suntory UK team, ~50 reps, strong in premium cocktail bars", "offTrade": "Maker\\u2019s Mark and Roku well-positioned in Waitrose/M&S", "travelRetail": "Japanese whisky is the star \\u2014 Yamazaki/Hibiki allocation drives traffic", "ecommerce": "Limited DTC, primarily via The Whisky Exchange and Master of Malt"},
    typicalDealTerms: {"listingFee": "\\u00a325-100K", "exclusivity": "Japanese whisky allocation-based \\u2014 scarcity creates natural exclusivity", "marketingSupport": "Roku gin \\u2018Japanese craft\\u2019 bar programs, whisky education events", "paymentTerms": "30 days"},
    strengthsForCompetitor: ["Japanese whisky credentials are authentic and impossible to replicate", "Maker\\u2019s Mark has genuine craft story despite large scale", "Roku gin carved a new \\u2018Japanese gin\\u2019 category from nothing \\u2014 innovative", "-196 RTD innovation from Japan could disrupt the Western RTD market"],
    weaknessesForCompetitor: ["Jim Beam is seen as a value brand \\u2014 drags down the portfolio\\u2019s premium image", "Japanese whisky allocation creates frustration \\u2014 bars can\\u2019t get enough Hibiki/Yamazaki", "Sauza/Hornitos are value tequilas \\u2014 not competing in the premium growth segment", "Courvoisier underperforming vs Hennessy \\u2014 cognac is a weak spot", "Less marketing spend than Diageo/Pernod \\u2014 brand awareness gaps outside core range"],
    howToCompeteAgainst: [{"strategy": "Japanese whisky alternative", "detail": "Allocation shortages mean bars need alternatives. Taiwanese, Indian, or craft world whiskies with Asian influence can fill the gap."}, {"strategy": "Premium tequila", "detail": "Beam Suntory\\u2019s tequila is all value (Sauza/Hornitos). Premium tequila is the fastest-growing segment and they have no answer."}, {"strategy": "Ride the -196 wave", "detail": "If -196 popularises Japanese-style RTDs, adjacent brands (yuzu-based, shochu-based) benefit from the category expansion."}, {"strategy": "Out-craft Maker\\u2019s Mark", "detail": "Maker\\u2019s is good but predictable. Experimental bourbon (unique mash bills, unusual cask finishes) can capture the adventurous bourbon drinker."}],
    recentMoves: [{"date": "Jan 2026", "move": "Launched -196 RTD in UK \\u2014 major marketing push", "threat": "high"}, {"date": "Nov 2025", "move": "Yamazaki 18 allocation cut by 30% due to demand", "threat": "low"}, {"date": "Aug 2025", "move": "Acquired Sipsmith Gin (remaining 49% stake)", "threat": "medium"}, {"date": "May 2025", "move": "Courvoisier rebrand and repositioning launched", "threat": "low"}],
    financials: {"2025": {"revenue": 5.1, "operatingMargin": 21.5, "netIncome": 0.72}, "2024": {"revenue": 4.9, "operatingMargin": 20.8, "netIncome": 0.65}, "2023": {"revenue": 5.2, "operatingMargin": 22.1, "netIncome": 0.78}, "2022": {"revenue": 4.8, "operatingMargin": 21.0, "netIncome": 0.68}, "2021": {"revenue": 4.1, "operatingMargin": 18.5, "netIncome": 0.48}},
    geoRevenue: {"North America": 45, "Europe": 20, "Asia Pacific": 28, "Latin America": 5, "Africa/ME": 2},
    maTimeline: [{"year": 2025, "deal": "Sipsmith Gin full acquisition", "type": "acquisition"}, {"year": 2022, "deal": "Launched -196 globally from Japan", "type": "investment"}, {"year": 2020, "deal": "Acquired Sipsmith Gin (51% stake) for \\u00a350M", "type": "acquisition"}, {"year": 2017, "deal": "Acquired Pinnacle Vodka", "type": "acquisition"}, {"year": 2014, "deal": "Suntory acquired Beam Inc for $16B", "type": "acquisition"}]
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
    description: "American whiskey powerhouse. Jack Daniel\\u2019s is one of the world\\u2019s most recognised spirits brands. Family-controlled public company. Conservative but highly profitable \\u2014 extraordinary brand loyalty.",
    keyBrands: ["Jack Daniel\\u2019s", "Woodford Reserve", "Old Forester", "Herradura", "el Jimador", "GlenDronach", "BenRiach", "Glenglassaugh", "Diplom\u00e1tico"],
    categoryPresence: {"Tennessee Whiskey": {"share": 82, "brands": ["Jack Daniel\\u2019s"], "position": "Category Creator/Owner"}, "Bourbon": {"share": 12, "brands": ["Woodford Reserve", "Old Forester"], "position": "Premium Player"}, "Tequila": {"share": 8, "brands": ["Herradura", "el Jimador"], "position": "Moderate"}, "Scotch Whisky": {"share": 2, "brands": ["GlenDronach", "BenRiach"], "position": "Niche Craft"}, "Rum": {"share": 3, "brands": ["Diplom\u00e1tico (distribution)"], "position": "Emerging"}, "RTD": {"share": 10, "brands": ["Jack Daniel\\u2019s RTD range"], "position": "Major"}},
    distributionUK: {"onTrade": "Brown-Forman UK, ~35 reps, Jack Daniel\\u2019s ubiquitous", "offTrade": "Jack Daniel\\u2019s in every supermarket, Woodford Reserve premium shelf", "travelRetail": "Jack Daniel\\u2019s exclusives and limited editions", "ecommerce": "Third-party focused"},
    typicalDealTerms: {"listingFee": "\\u00a320-80K", "exclusivity": "JD\\u2019s brand strength creates implicit exclusivity \\u2014 every bar stocks it", "marketingSupport": "Music festival sponsorships, Lynchburg experience programs", "paymentTerms": "30 days"},
    strengthsForCompetitor: ["Jack Daniel\\u2019s brand recognition is cultural, not just commercial \\u2014 nearly impossible to replicate", "Woodford Reserve is the benchmark premium bourbon \\u2014 defines the category for many consumers", "Conservative management means consistent quality \\u2014 they don\\u2019t chase fads", "Family control means they think in decades, not quarters"],
    weaknessesForCompetitor: ["Heavily dependent on Jack Daniel\\u2019s (60%+ of revenue) \\u2014 single-brand risk", "Tequila portfolio (Herradura/el Jimador) underperforming the category\\u2019s growth", "No presence in vodka, gin, Irish whiskey, or no/lo \\u2014 massive category gaps", "Conservative culture means slow to innovate \\u2014 took years to launch JD RTDs", "GlenDronach/BenRiach acquisitions haven\\u2019t been scaled \\u2014 untapped potential"],
    howToCompeteAgainst: [{"strategy": "Don\\u2019t fight JD directly", "detail": "Jack Daniel\\u2019s occupies a unique cultural position. Compete by being different \\u2014 craft, small batch, experimental \\u2014 not by trying to be a better Tennessee whiskey."}, {"strategy": "Win the premium bourbon shelf", "detail": "Woodford Reserve is the only premium BF bourbon. Above and around it, there\\u2019s space for craft bourbons with unique stories."}, {"strategy": "All the categories they\\u2019re missing", "detail": "Vodka, gin, Irish whiskey, mezcal, no/lo, premium RTD \\u2014 Brown-Forman isn\\u2019t competing in any of these growth segments."}, {"strategy": "Ride their tequila gap", "detail": "Herradura is authentic but undersupported. el Jimador is value. Premium tequila (\\u00a330-50) is the biggest opportunity they\\u2019re not capturing."}],
    recentMoves: [{"date": "Dec 2025", "move": "Jack Daniel\\u2019s Bonded launched globally", "threat": "medium"}, {"date": "Sep 2025", "move": "GlenDronach 21-Year Parliament repackaged for luxury market", "threat": "low"}, {"date": "Jun 2025", "move": "JD RTD cans expanded to 25 new markets", "threat": "medium"}, {"date": "Feb 2025", "move": "Acquired Gin Mare and Diplom\u00e1tico rum distribution rights in US", "threat": "medium"}],
    financials: {"2025": {"revenue": 4.2, "operatingMargin": 33.5, "netIncome": 0.95, "ebitda": 1.6, "eps": 2.02, "dividend": 0.86, "debtToEbitda": 2.1, "roic": 16.8}, "2024": {"revenue": 4.1, "operatingMargin": 33.1, "netIncome": 0.92, "ebitda": 1.55, "eps": 1.95, "dividend": 0.82, "debtToEbitda": 2.2, "roic": 16.2}, "2023": {"revenue": 4.3, "operatingMargin": 34.2, "netIncome": 1.0, "ebitda": 1.7, "eps": 2.12, "dividend": 0.8, "debtToEbitda": 1.9, "roic": 17.5}, "2022": {"revenue": 3.9, "operatingMargin": 32.8, "netIncome": 0.88, "ebitda": 1.48, "eps": 1.86, "dividend": 0.76, "debtToEbitda": 2.0, "roic": 15.8}, "2021": {"revenue": 3.5, "operatingMargin": 31.2, "netIncome": 0.72, "ebitda": 1.25, "eps": 1.52, "dividend": 0.72, "debtToEbitda": 2.4, "roic": 13.5}},
    geoRevenue: {"North America": 52, "Europe": 22, "Asia Pacific": 12, "Latin America": 10, "Africa/ME": 4},
    maTimeline: [{"year": 2025, "deal": "Gin Mare and Diplom\u00e1tico distribution rights (US)", "type": "partnership"}, {"year": 2022, "deal": "Acquired GlenDronach, BenRiach, Glenglassaugh for $412M", "type": "acquisition"}, {"year": 2016, "deal": "Sold Southern Comfort and Tuaca brands", "type": "divestiture"}, {"year": 2015, "deal": "Old Forester distillery opened on Whiskey Row, Louisville", "type": "investment"}]
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
    description: "Italian aperitivo culture champion turned global acquirer. Campari and Aperol drive the spritz revolution. Most acquisitive major spirits company \\u2014 serial dealmaker that grows by buying brands with cultural cachet.",
    keyBrands: ["Campari", "Aperol", "Wild Turkey", "SKYY Vodka", "Grand Marnier", "Appleton Estate", "Espol\u00f2n", "Wray & Nephew"],
    categoryPresence: {"Aperitifs": {"share": 45, "brands": ["Campari", "Aperol"], "position": "Category Creator/Owner"}, "Bourbon": {"share": 7, "brands": ["Wild Turkey", "Russell\\u2019s Reserve"], "position": "Cult Following"}, "Tequila": {"share": 6, "brands": ["Espol\u00f2n", "Cabo Wabo"], "position": "Value Leader"}, "Rum": {"share": 9, "brands": ["Appleton Estate", "Wray & Nephew"], "position": "Jamaican Specialist"}, "Vodka": {"share": 3, "brands": ["SKYY"], "position": "Declining"}, "Liqueurs": {"share": 15, "brands": ["Grand Marnier", "Averna", "Braulio", "Frangelico"], "position": "Portfolio Leader"}},
    distributionUK: {"onTrade": "Campari UK, ~30 reps, very strong in cocktail bars and Italian restaurants", "offTrade": "Aperol Spritz drives supermarket sales, Wild Turkey in specialist", "travelRetail": "Growing \\u2014 Aperol\\u2019s awareness driving TR demand", "ecommerce": "Third-party focused"},
    typicalDealTerms: {"listingFee": "\\u00a315-80K", "exclusivity": "Cocktail-focused \\u2014 Negroni and Spritz menu partnerships", "marketingSupport": "Aperol Spritz experiential events, bar takeovers, festival sponsorships", "paymentTerms": "30-45 days"},
    strengthsForCompetitor: ["Aperol created a global occasion (the Spritz) \\u2014 category-defining brand", "Most acquisitive company \\u2014 constantly adding brands, expanding reach", "Italian heritage gives them cultural authenticity that\\u2019s hard to fake", "Wild Turkey has a cult bourbon following that punches above its weight"],
    weaknessesForCompetitor: ["SKYY Vodka is in terminal decline \\u2014 no credible premium vodka play", "Heavily dependent on Aperol (30%+ of revenue) \\u2014 single-brand risk if spritz fad fades", "Smaller than the big 3 \\u2014 less distribution muscle and marketing spend", "Acquisition strategy means uneven portfolio quality \\u2014 some brands are neglected", "No meaningful presence in gin, Scotch, or no/lo"],
    howToCompeteAgainst: [{"strategy": "Ride the aperitivo wave", "detail": "Aperol created the occasion. Now there\\u2019s space for alternative aperitifs \\u2014 different flavors, lower sugar, craft Italian alternatives."}, {"strategy": "Target their weak categories", "detail": "No gin, minimal Scotch, no no/lo. Campari leaves these wide open. Their UK team is only 30 reps."}, {"strategy": "Partner with them", "detail": "Campari is the most acquisitive company in spirits. If your brand complements their portfolio, they\\u2019re a natural acquirer or distribution partner."}, {"strategy": "Create the next Aperol", "detail": "Aperol proved a \\u00a310 serve can create a billion-dollar brand. Find the next social occasion drink \\u2014 the next Spritz."}],
    recentMoves: [{"date": "Feb 2026", "move": "Rumored bid for a premium mezcal brand", "threat": "medium"}, {"date": "Oct 2025", "move": "Espol\u00f2n tequila surpassed 5M cases globally", "threat": "medium"}, {"date": "Jul 2025", "move": "Aperol Spritz became UK\\u2019s #1 summer cocktail by volume", "threat": "high"}, {"date": "Apr 2025", "move": "Courvoisier acquisition from Beam Suntory for $1.2B completed", "threat": "high"}],
    financials: {"2025": {"revenue": 3.1, "operatingMargin": 22.8, "netIncome": 0.48, "ebitda": 0.82, "eps": 0.42, "dividend": 0.065, "debtToEbitda": 3.2, "roic": 8.5}, "2024": {"revenue": 2.9, "operatingMargin": 22.1, "netIncome": 0.42, "ebitda": 0.74, "eps": 0.37, "dividend": 0.062, "debtToEbitda": 2.8, "roic": 8.2}, "2023": {"revenue": 3.0, "operatingMargin": 23.5, "netIncome": 0.5, "ebitda": 0.82, "eps": 0.44, "dividend": 0.06, "debtToEbitda": 2.5, "roic": 9.1}, "2022": {"revenue": 2.7, "operatingMargin": 21.5, "netIncome": 0.39, "ebitda": 0.68, "eps": 0.34, "dividend": 0.058, "debtToEbitda": 2.4, "roic": 8.8}, "2021": {"revenue": 2.2, "operatingMargin": 19.8, "netIncome": 0.28, "ebitda": 0.5, "eps": 0.24, "dividend": 0.055, "debtToEbitda": 2.6, "roic": 7.2}},
    geoRevenue: {"North America": 35, "Europe": 40, "Asia Pacific": 12, "Latin America": 8, "Africa/ME": 5},
    maTimeline: [{"year": 2025, "deal": "Courvoisier cognac from Beam Suntory for $1.2B", "type": "acquisition"}, {"year": 2022, "deal": "Wilderness Trail Distillery (craft bourbon) acquired", "type": "acquisition"}, {"year": 2020, "deal": "Champagne Lallier acquired", "type": "acquisition"}, {"year": 2019, "deal": "Acquired Rhumerie Trois Rivi\\u00e8res", "type": "acquisition"}, {"year": 2016, "deal": "Grand Marnier acquired for \\u20ac684M", "type": "acquisition"}, {"year": 2014, "deal": "Acquired Forty Creek Whisky (Canada)", "type": "acquisition"}]
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
    description: "Family-owned since 1887. Glenfiddich is the world\\u2019s best-selling single malt. Hendrick\\u2019s reinvented premium gin. Proof that family-owned companies can outperform conglomerates through brand craft and long-term thinking.",
    keyBrands: ["Glenfiddich", "The Balvenie", "Hendrick\\u2019s", "Monkey Shoulder", "Tullamore D.E.W.", "Sailor Jerry", "Drambuie", "Milagro"],
    categoryPresence: {"Scotch Whisky": {"share": 12, "brands": ["Glenfiddich", "The Balvenie", "Monkey Shoulder"], "position": "#1 Single Malt + Innovation"}, "Gin": {"share": 10, "brands": ["Hendrick\\u2019s"], "position": "Premium Pioneer"}, "Irish Whiskey": {"share": 8, "brands": ["Tullamore D.E.W."], "position": "Strong #2"}, "Rum": {"share": 3, "brands": ["Sailor Jerry"], "position": "Spiced Niche"}, "Tequila": {"share": 2, "brands": ["Milagro"], "position": "Small"}, "Liqueurs": {"share": 3, "brands": ["Drambuie"], "position": "Heritage"}},
    distributionUK: {"onTrade": "WG&S UK team, ~40 reps, Hendrick\\u2019s-led cocktail bar focus", "offTrade": "Glenfiddich is a supermarket staple, Hendrick\\u2019s premium shelf leader", "travelRetail": "15% of revenue \\u2014 6 airport boutiques, Glenfiddich exclusives", "ecommerce": "Third-party (The Whisky Exchange, Master of Malt)"},
    typicalDealTerms: {"listingFee": "\\u00a320-80K", "exclusivity": "Hendrick\\u2019s bar partnerships, Monkey Shoulder \\u2018Monkey Mixer\\u2019 cocktail programs", "marketingSupport": "Quirky brand events, cucumber-themed Hendrick\\u2019s activations", "paymentTerms": "30 days"},
    strengthsForCompetitor: ["Hendrick\\u2019s proves a \\u2018weird\\u2019 brand can become a premium category leader", "Monkey Shoulder made blended malt cool for cocktails \\u2014 genius positioning", "Family ownership = no pressure to sacrifice brand equity for quarterly results", "Glenfiddich\\u2019s innovation (IPA cask, Fire & Cane) shows heritage brands can stay relevant"],
    weaknessesForCompetitor: ["Limited portfolio breadth \\u2014 gaps in bourbon, tequila, vodka, RTD, no/lo", "Smaller marketing budgets than Diageo/Pernod \\u2014 rely on word-of-mouth more", "Hendrick\\u2019s imitators have diluted the \\u2018quirky gin\\u2019 space", "Sailor Jerry rum is stagnating \\u2014 spiced rum category in decline"],
    howToCompeteAgainst: [{"strategy": "Learn from their playbook", "detail": "WG&S is the template for how a brand-first company beats conglomerates. Study how Hendrick\\u2019s built cult status through bartender advocacy and weird marketing."}, {"strategy": "Fill their portfolio gaps", "detail": "They have no bourbon, no premium tequila, no vodka, no RTD, no no/lo. These are the growth categories."}, {"strategy": "Co-exist at the bar", "detail": "WG&S brands are bartender favorites. Position your brand as complementary \\u2014 different category, different occasion \\u2014 not competitive."}, {"strategy": "Out-innovate in Scotch", "detail": "If you\\u2019re in whisky, their innovation (IPA cask, etc.) shows the market is ready for experimental expressions. Go further."}],
    recentMoves: [{"date": "Jan 2026", "move": "New maturation warehouse \\u2014 250,000 cask capacity", "threat": "low"}, {"date": "Oct 2025", "move": "Hendrick\\u2019s visitor centre doubled to 100K visitors/year", "threat": "low"}, {"date": "Jul 2025", "move": "Glenfiddich Time Re:Imagined NFT auction raised $1.2M", "threat": "low"}, {"date": "Apr 2025", "move": "Hired new Master Blender from Diageo", "threat": "medium"}],
    financials: {"2025": {"revenue": 2.2, "operatingMargin": 24.5, "netIncome": 0.35}, "2024": {"revenue": 2.1, "operatingMargin": 23.8, "netIncome": 0.32}, "2023": {"revenue": 2.2, "operatingMargin": 25.1, "netIncome": 0.38}, "2022": {"revenue": 2.0, "operatingMargin": 23.2, "netIncome": 0.3}, "2021": {"revenue": 1.7, "operatingMargin": 21.0, "netIncome": 0.22}},
    geoRevenue: {"North America": 32, "Europe": 30, "Asia Pacific": 22, "Latin America": 8, "Africa/ME": 8},
    maTimeline: [{"year": 2023, "deal": "Acquired Fistful of Bourbon brand", "type": "acquisition"}, {"year": 2020, "deal": "Acquired Milagro tequila", "type": "acquisition"}, {"year": 2016, "deal": "Acquired Drambuie for \\u00a3100M", "type": "acquisition"}, {"year": 2014, "deal": "Tullamore D.E.W. distillery opened (\\u20ac35M investment)", "type": "investment"}]
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
    description: "Charity-owned (Robertson Trust) company built around The Macallan \\u2014 the world\\u2019s most valuable single malt whisky. Unique model where profits fund Scottish education and arts. Proof that a \\u2018one-brand company\\u2019 strategy can work spectacularly if the brand is right.",
    keyBrands: ["The Macallan", "Highland Park", "The Famous Grouse", "Naked Malt", "Brugal"],
    categoryPresence: {"Scotch Whisky": {"share": 8, "brands": ["The Macallan", "Highland Park", "The Famous Grouse", "Naked Malt"], "position": "Ultra-Premium Leader"}, "Rum": {"share": 2, "brands": ["Brugal"], "position": "Caribbean Specialist"}},
    distributionUK: {"onTrade": "Edrington UK, ~25 reps, ultra-premium focus", "offTrade": "Macallan in Waitrose/specialist, Famous Grouse mass market", "travelRetail": "Macallan boutiques in premium airports", "ecommerce": "The Macallan DTC, specialist whisky retailers"},
    typicalDealTerms: {"listingFee": "Allocation-based for Macallan \\u2014 accounts compete for stock", "exclusivity": "Macallan allocation creates natural exclusivity", "marketingSupport": "Macallan experience events, whisky education", "paymentTerms": "30 days"},
    strengthsForCompetitor: ["The Macallan is the most valuable single malt brand on earth \\u2014 auction records", "Charity ownership means genuine \\u2018purpose\\u2019 story \\u2014 profits fund education", "Highland Park\\u2019s Viking heritage is a brilliant, authentic positioning", "Scarcity model creates desire \\u2014 allocation drives demand"],
    weaknessesForCompetitor: ["Massively dependent on The Macallan (65%+ of revenue) \\u2014 existential risk if brand falters", "Zero presence outside Scotch whisky and rum \\u2014 no diversification", "Famous Grouse is in structural decline along with blended Scotch category", "Small company \\u2014 only 25 UK reps, limited geographic reach vs big players", "Charity ownership could limit investment capacity if returns are distributed"],
    howToCompeteAgainst: [{"strategy": "You\\u2019re not competing with Macallan", "detail": "Unless you\\u2019re making \\u00a3100+ single malt, Macallan is in a different universe. Their presence benefits you by anchoring ultra-premium price expectations."}, {"strategy": "Target Famous Grouse\\u2019s decline", "detail": "Blended Scotch is declining. The volume Famous Grouse loses has to go somewhere \\u2014 can your brand capture those drinkers trading up?"}, {"strategy": "Offer what they can\\u2019t", "detail": "Edrington has no gin, no tequila, no vodka, no RTD, no no/lo. The vast majority of spirits growth is in categories they don\\u2019t participate in."}],
    recentMoves: [{"date": "Feb 2026", "move": "Macallan 1926 sold at auction for $2.7M \\u2014 new world record", "threat": "low"}, {"date": "Nov 2025", "move": "Robertson Trust distributed $38M to charities from Edrington profits", "threat": "low"}, {"date": "Aug 2025", "move": "Highland Park distillery modernization completed", "threat": "low"}, {"date": "May 2025", "move": "New CEO appointed from Diageo \\u2014 first external CEO ever", "threat": "medium"}],
    financials: {"2025": {"revenue": 1.1, "operatingMargin": 28.2, "netIncome": 0.21}, "2024": {"revenue": 1.05, "operatingMargin": 27.5, "netIncome": 0.19}, "2023": {"revenue": 1.12, "operatingMargin": 29.0, "netIncome": 0.22}, "2022": {"revenue": 1.0, "operatingMargin": 27.0, "netIncome": 0.18}, "2021": {"revenue": 0.85, "operatingMargin": 24.5, "netIncome": 0.13}},
    geoRevenue: {"North America": 25, "Europe": 25, "Asia Pacific": 40, "Latin America": 5, "Africa/ME": 5},
    maTimeline: [{"year": 2019, "deal": "Brugal rum integration completed", "type": "investment"}, {"year": 2018, "deal": "Opened \\u00a3140M Macallan distillery on Easter Elchies estate", "type": "investment"}, {"year": 2015, "deal": "Naked Malt repositioned from Naked Grouse", "type": "investment"}]
  },
  {
    name: "R\\u00e9my Cointreau",
    ticker: "RCO.PA",
    type: "Public",
    hq: "Paris, France",
    employees: "~2,000",
    revenue: "$1.5B",
    revenueGrowth: "-8.2%",
    marketCap: "$6.8B",
    stockYTD: "-18.4%",
    founded: 1724,
    ceo: "\\u00c9ric Vallat",
    description: "Pure-play luxury spirits house. R\\u00e9my Martin cognac and Louis XIII define ultra-premium. Smallest of the major listed players but highest margins. Currently struggling with China headwinds and US inventory correction.",
    keyBrands: ["R\\u00e9my Martin", "Louis XIII", "Cointreau", "The Botanist", "Bruichladdich", "Mount Gay", "Metaxa", "St-R\\u00e9my"],
    categoryPresence: {"Cognac": {"share": 22, "brands": ["R\\u00e9my Martin", "Louis XIII"], "position": "Ultra-Premium Leader"}, "Liqueurs": {"share": 8, "brands": ["Cointreau"], "position": "Margarita Essential"}, "Gin": {"share": 3, "brands": ["The Botanist"], "position": "Islay Craft Pioneer"}, "Scotch Whisky": {"share": 1, "brands": ["Bruichladdich", "Port Charlotte", "Octomore"], "position": "Cult Islay"}, "Rum": {"share": 2, "brands": ["Mount Gay"], "position": "Heritage Premium"}},
    distributionUK: {"onTrade": "R\\u00e9my Cointreau UK, ~20 reps, luxury-focused", "offTrade": "Selective \\u2014 Waitrose, specialist wine merchants", "travelRetail": "Louis XIII and R\\u00e9my Martin XO drive high-value TR sales", "ecommerce": "La Maison R\\u00e9my Martin DTC"},
    typicalDealTerms: {"listingFee": "Selective \\u2014 prestige accounts only", "exclusivity": "Allocation-based for top-tier expressions", "marketingSupport": "Brand ambassador programs, luxury events", "paymentTerms": "30 days"},
    strengthsForCompetitor: ["Louis XIII (\\u00a33,000+/bottle) sets the absolute ceiling for spirits pricing", "Bruichladdich/Octomore have genuine cult status \\u2014 the \\u2018thinking person\\u2019s Scotch\\u2019", "Cointreau is essential for Margaritas \\u2014 monopoly position in a growing cocktail", "The Botanist pioneered craft gin from Islay \\u2014 authentic provenance"],
    weaknessesForCompetitor: ["Heavily exposed to China/US cognac cycles \\u2014 revenue swings of 15-20% YoY", "Very small sales team (20 UK reps) \\u2014 limited market coverage", "Luxury focus means they can\\u2019t compete in everyday premium \\u2014 massive blind spot", "Bruichladdich/Botanist are subscale \\u2014 great brands that could do 5x the volume", "No presence in bourbon, tequila, vodka, RTD, no/lo, or beer"],
    howToCompeteAgainst: [{"strategy": "Irrelevant for most startups", "detail": "R\\u00e9my plays exclusively in ultra-luxury. Unless you\\u2019re making \\u00a350+ cognac or \\u00a340+ gin, they\\u2019re not your competitor."}, {"strategy": "Learn from The Botanist", "detail": "The Botanist built a premium gin brand from a remote island. Your brand\\u2019s provenance story is your strongest asset \\u2014 study how they did it."}, {"strategy": "Orange liqueur opportunity", "detail": "Cointreau dominates triple sec but the \\u2018premium orange liqueur\\u2019 space is actually very small. Craft alternatives with real fruit could take share."}, {"strategy": "Win where they\\u2019re absent", "detail": "Like LVMH, R\\u00e9my is absent from the categories driving industry growth: tequila, bourbon, RTD, no/lo."}],
    recentMoves: [{"date": "Jan 2026", "move": "Louis XIII Rare Cask released at $5,800 \\u2014 sold out in 48 hours", "threat": "low"}, {"date": "Oct 2025", "move": "R\\u00e9my Martin restructured US distribution", "threat": "low"}, {"date": "Jul 2025", "move": "Octomore 15 series launched with highest peat levels yet", "threat": "low"}, {"date": "Mar 2025", "move": "Announced cost-cutting program amid China slowdown", "threat": "low"}],
    financials: {"2025": {"revenue": 1.5, "operatingMargin": 26.5, "netIncome": 0.26, "ebitda": 0.46, "eps": 3.42, "dividend": 2.0, "debtToEbitda": 2.8, "roic": 9.2}, "2024": {"revenue": 1.6, "operatingMargin": 28.2, "netIncome": 0.3, "ebitda": 0.52, "eps": 3.95, "dividend": 2.0, "debtToEbitda": 2.5, "roic": 10.5}, "2023": {"revenue": 1.8, "operatingMargin": 30.5, "netIncome": 0.38, "ebitda": 0.64, "eps": 5.02, "dividend": 2.0, "debtToEbitda": 2.0, "roic": 13.2}, "2022": {"revenue": 1.7, "operatingMargin": 29.8, "netIncome": 0.35, "ebitda": 0.59, "eps": 4.62, "dividend": 1.85, "debtToEbitda": 2.1, "roic": 12.5}, "2021": {"revenue": 1.4, "operatingMargin": 25.2, "netIncome": 0.22, "ebitda": 0.41, "eps": 2.88, "dividend": 1.65, "debtToEbitda": 2.8, "roic": 8.8}},
    geoRevenue: {"North America": 38, "Europe": 18, "Asia Pacific": 35, "Latin America": 5, "Africa/ME": 4},
    maTimeline: [{"year": 2023, "deal": "Telmont Champagne sustainability showcase", "type": "investment"}, {"year": 2021, "deal": "Increased Bruichladdich capacity by 20%", "type": "investment"}, {"year": 2012, "deal": "Acquired Bruichladdich for \\u00a358M", "type": "acquisition"}, {"year": 2006, "deal": "Acquired Mount Gay rum", "type": "acquisition"}]
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
    description: "America\\u2019s largest privately-held spirits company. The bourbon empire \\u2014 Buffalo Trace, Pappy Van Winkle, Eagle Rare, Blanton\\u2019s. Fireball provides the cash flow that funds the premium portfolio. Intensely private, fiercely competitive.",
    keyBrands: ["Buffalo Trace", "Pappy Van Winkle", "Eagle Rare", "Blanton\\u2019s", "Fireball", "Sazerac Rye", "Benchmark", "Weller", "E.H. Taylor"],
    categoryPresence: {"Bourbon": {"share": 18, "brands": ["Buffalo Trace", "Eagle Rare", "Blanton\\u2019s", "Weller", "Benchmark"], "position": "Cult Premium Leader"}, "Tennessee Whiskey": {"share": 0, "brands": [], "position": "Absent"}, "Flavored Whisky": {"share": 45, "brands": ["Fireball"], "position": "Dominant"}, "Rye Whiskey": {"share": 22, "brands": ["Sazerac Rye"], "position": "Category Heritage"}, "Vodka": {"share": 3, "brands": ["Rain", "Wheatley"], "position": "Craft Niche"}, "Cognac": {"share": 0, "brands": [], "position": "Absent"}, "Gin": {"share": 0, "brands": [], "position": "Absent"}},
    distributionUK: {"onTrade": "Limited UK presence \\u2014 Buffalo Trace via specialist distributors", "offTrade": "Buffalo Trace in Waitrose/specialist, Fireball in supermarkets", "travelRetail": "Minimal", "ecommerce": "Specialist retailers (The Whisky Exchange, Master of Malt)"},
    typicalDealTerms: {"listingFee": "N/A for UK \\u2014 allocation scarcity IS the barrier", "exclusivity": "Allocation creates natural exclusivity \\u2014 you\\u2019re lucky to get stock", "marketingSupport": "Minimal \\u2014 demand far exceeds supply", "paymentTerms": "Distributor terms vary"},
    strengthsForCompetitor: ["Allocation model creates extraordinary demand \\u2014 Pappy Van Winkle is the most desired bottle on earth", "Fireball\\u2019s cash flow funds unlimited premium bourbon investment \\u2014 $1.2B Buffalo Trace expansion", "Zero marketing needed for premium brands \\u2014 demand exceeds supply 10:1", "Private ownership means they can invest for 20-year returns \\u2014 laying down bourbon now for 2045"],
    weaknessesForCompetitor: ["Almost entirely bourbon/whiskey \\u2014 no diversification across categories", "UK and European presence is minimal \\u2014 US-centric", "Fireball is declining \\u2014 flavored whisky category is shrinking", "Fiercely private means no partnerships \\u2014 they don\\u2019t collaborate", "Allocation frustration is real \\u2014 retailers and bars complain about supply"],
    howToCompeteAgainst: [{"strategy": "Allocation alternative", "detail": "Bars and retailers can\\u2019t get enough Buffalo Trace/Blanton\\u2019s. Offer a comparable quality bourbon that\\u2019s actually available. Reliability beats scarcity for most on-trade accounts."}, {"strategy": "Expand beyond bourbon", "detail": "Sazerac has zero gin, zero rum, zero tequila, zero vodka, zero no/lo. If you\\u2019re in any of these categories, they\\u2019re not your competitor."}, {"strategy": "Win in Europe", "detail": "Sazerac is US-focused. European and UK markets are wide open for premium bourbon brands that actually show up and support their accounts."}, {"strategy": "Fill the Fireball gap", "detail": "If Fireball continues declining, the \\u2018fun shot\\u2019 occasion needs a successor. Could your brand be the next generation shot?"}],
    recentMoves: [{"date": "Feb 2026", "move": "Buffalo Trace expansion Phase 2 breaking ground \\u2014 30 new warehouses", "threat": "medium"}, {"date": "Dec 2025", "move": "Entered Australian market via Endeavour Group", "threat": "low"}, {"date": "Sep 2025", "move": "Acquired small Irish whiskey distillery in Cork", "threat": "medium"}, {"date": "Jun 2025", "move": "Fireball RTD canned cocktails launched nationwide", "threat": "low"}],
    financials: {"2025": {"revenue": 2.8, "operatingMargin": 25.0, "netIncome": 0.48}, "2024": {"revenue": 2.6, "operatingMargin": 24.2, "netIncome": 0.42}, "2023": {"revenue": 2.7, "operatingMargin": 25.5, "netIncome": 0.5}, "2022": {"revenue": 2.5, "operatingMargin": 23.8, "netIncome": 0.4}, "2021": {"revenue": 2.1, "operatingMargin": 21.5, "netIncome": 0.28}},
    geoRevenue: {"North America": 85, "Europe": 8, "Asia Pacific": 4, "Latin America": 2, "Africa/ME": 1},
    maTimeline: [{"year": 2025, "deal": "Irish whiskey distillery (Cork) acquired", "type": "acquisition"}, {"year": 2024, "deal": "Buffalo Trace $1.2B expansion Phase 1 completed", "type": "investment"}, {"year": 2021, "deal": "Acquired multiple craft brands portfolio", "type": "acquisition"}, {"year": 2016, "deal": "Acquired Southern Comfort from Brown-Forman", "type": "acquisition"}]
  }
]

const WHITE_SPACE = {
  "Mezcal": {"majorPresence": "None (Bacardi has Ilegal, tiny)", "growthRate": "+18% CAGR", "opportunity": "Highest", "notes": "No major company has a leading mezcal brand. Wide open for startups."},
  "Japanese Whisky": {"majorPresence": "Beam Suntory (dominant)", "growthRate": "+12% CAGR", "opportunity": "Moderate", "notes": "Beam Suntory owns the category. But allocation shortages mean bars need alternatives \\u2014 Taiwanese, Indian, or craft world whiskies."},
  "Premium RTD": {"majorPresence": "Emerging everywhere", "growthRate": "+22% CAGR", "opportunity": "High", "notes": "Everyone is entering but no one dominates yet. First-mover advantage in premium (\\u00a35+/serve) is still available."},
  "No/Lo Spirits": {"majorPresence": "Diageo (Seedlip), fragmented", "growthRate": "+25% CAGR", "opportunity": "High", "notes": "Seedlip was first but category is exploding. Functional, flavour-forward brands winning share."},
  "Premium Rum": {"majorPresence": "Bacard\\u00ed (mass), Campari (Appleton)", "growthRate": "+9% CAGR", "opportunity": "High", "notes": "Premium sipping rum (\\u00a335+) is dramatically underserved. Most major companies treat rum as a mixer."},
  "Agave RTD": {"majorPresence": "Almost none", "growthRate": "+30% CAGR", "opportunity": "Highest", "notes": "Tequila-based RTDs are the fastest-growing segment. Major companies are slow to respond."},
  "Craft Aperitifs": {"majorPresence": "Campari (Aperol dominant)", "growthRate": "+15% CAGR", "opportunity": "High", "notes": "Aperol owns the Spritz but consumers want variety. Low-sugar, botanical, and non-Aperol alternatives thriving."},
  "Irish Whiskey": {"majorPresence": "Pernod (Jameson dominant)", "growthRate": "+8% CAGR", "opportunity": "Moderate", "notes": "Jameson dominates but the \\u2018premium Irish\\u2019 segment (\\u00a340+) is underserved by the majors."},
  "Premium Vodka": {"majorPresence": "Diageo (Ketel One), Bacardi (Grey Goose)", "growthRate": "+3% CAGR", "opportunity": "Moderate", "notes": "Absolut declining, Grey Goose ageing. Space for a new \\u2018craft vodka\\u2019 narrative with genuine provenance."},
  "Craft Tequila": {"majorPresence": "Bacardi (Patr\\u00f3n), Diageo (Don Julio)", "growthRate": "+14% CAGR", "opportunity": "Moderate", "notes": "Top end is crowded but \\u00a328-40 premium segment has room for brands with authentic Mexican heritage."}
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
          <Target size={16} /> How to Compete Against {company.name}
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

function CompanyDetail({ company }) {
  const [companyTab, setCompanyTab] = useState('compete')

  const tabs = [
    { id: 'compete', label: 'How to Compete', icon: Target },
    { id: 'overview', label: 'Company Profile', icon: Building2 },
    { id: 'categories', label: 'Categories', icon: Layers },
    { id: 'distribution', label: 'Distribution', icon: MapPin },
    { id: 'financials', label: 'Financials', icon: BarChart3 },
    { id: 'manda', label: 'M&A', icon: Briefcase },
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
