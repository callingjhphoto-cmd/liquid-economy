export const DATA_LAST_UPDATED = '2026-03-21'

// ═══════════════════════════════════════════════════════════════
// Scenario Modeling Data — extracted from ScenarioModeling.jsx
// ═══════════════════════════════════════════════════════════════

export const PRODUCT_CATEGORIES = [
  { id: 'rtd', label: 'RTD / Canned Cocktails' },
  { id: 'tequila', label: 'Tequila / Mezcal' },
  { id: 'gin', label: 'Gin' },
  { id: 'vodka', label: 'Vodka' },
  { id: 'whisky', label: 'Whisky' },
  { id: 'rum', label: 'Rum' },
  { id: 'wine', label: 'Wine / Sparkling' },
  { id: 'beer', label: 'Beer / Craft' },
  { id: 'nolo', label: 'No/Low Alcohol' },
  { id: 'cognac', label: 'Cognac / Brandy' },
  { id: 'champagne', label: 'Champagne' },
]

export const TARGET_MARKETS = [
  { id: 'uk', label: 'United Kingdom', flag: '\u{1F1EC}\u{1F1E7}', pop: '67M', spiritsMarket: '\u00a313.2B', channels: { onTrade: 38, offTrade: 45, eComm: 12, travelRetail: 5 } },
  { id: 'eu', label: 'Europe (EU27)', flag: '\u{1F1EA}\u{1F1FA}', pop: '447M', spiritsMarket: '\u20ac98B', channels: { onTrade: 42, offTrade: 40, eComm: 10, travelRetail: 8 } },
  { id: 'us', label: 'United States', flag: '\u{1F1FA}\u{1F1F8}', pop: '335M', spiritsMarket: '$98B', channels: { onTrade: 30, offTrade: 52, eComm: 14, travelRetail: 4 } },
  { id: 'uae', label: 'UAE / Middle East', flag: '\u{1F1E6}\u{1F1EA}', pop: '10M', spiritsMarket: '$2.8B', channels: { onTrade: 55, offTrade: 15, eComm: 8, travelRetail: 22 } },
  { id: 'asia', label: 'Asia-Pacific', flag: '\u{1F30F}', pop: '4.3B', spiritsMarket: '$210B', channels: { onTrade: 48, offTrade: 35, eComm: 12, travelRetail: 5 } },
]

export const MANUFACTURING_ORIGINS = [
  { id: 'uk', label: 'UK-manufactured', duties: { uk: 0, eu: 0, us: 'TBC (tariff dependent)', uae: '50% import duty', asia: '15-150% varies' }, leadTime: '2-4 weeks', minOrder: '500 cases', avgCost: '\u00a34.20/unit' },
  { id: 'mexico', label: 'Mexico (tequila/mezcal)', duties: { uk: '0% (FTA)', eu: '0% (FTA)', us: '0% (USMCA)', uae: '50%', asia: '15-40%' }, leadTime: '8-12 weeks', minOrder: '1,000 cases', avgCost: '$3.80/unit' },
  { id: 'us', label: 'US-manufactured', duties: { uk: '2.5%', eu: '2.5%', us: 0, uae: '50%', asia: '20-60%' }, leadTime: '6-10 weeks', minOrder: '800 cases', avgCost: '$4.50/unit' },
  { id: 'eu', label: 'EU-manufactured', duties: { uk: '0% (TCA)', eu: 0, us: '25% (current)', uae: '50%', asia: '15-40%' }, leadTime: '3-6 weeks', minOrder: '600 cases', avgCost: '\u20ac3.90/unit' },
  { id: 'caribbean', label: 'Caribbean (rum)', duties: { uk: '0% (GSP)', eu: '0% (EPA)', us: '0% (CBI)', uae: '50%', asia: '20-40%' }, leadTime: '10-14 weeks', minOrder: '1,200 cases', avgCost: '$3.20/unit' },
]

export const BRAND_ARCHETYPES = [
  { id: 'celebrity', label: 'Celebrity-Led', examples: 'Teremana, Aviation, Casamigos', premiumMultiple: '1.8x', marketingWeight: 'Heavy influencer/PR', riskLevel: 'Medium-High', successRate: '18%' },
  { id: 'craft', label: 'Craft / Artisan', examples: 'Sipsmith, Monkey 47, Four Pillars', premiumMultiple: '1.4x', marketingWeight: 'Story & provenance', riskLevel: 'Medium', successRate: '22%' },
  { id: 'heritage', label: 'Heritage / Legacy', examples: 'Tanqueray, Bacardi, Hennessy', premiumMultiple: '1.2x', marketingWeight: 'Brand equity', riskLevel: 'Low-Medium', successRate: '35%' },
  { id: 'disruptor', label: 'Category Disruptor', examples: 'White Claw, Athletic Brewing, Seedlip', premiumMultiple: '2.2x', marketingWeight: 'Category creation', riskLevel: 'High', successRate: '12%' },
  { id: 'wellness', label: 'Wellness / Functional', examples: 'Kin Euphorics, Three Spirit, TRIP', premiumMultiple: '2.0x', marketingWeight: 'Education & sampling', riskLevel: 'High', successRate: '15%' },
]

export const COST_BREAKDOWN = {
  rtd: { liquid: 0.38, packaging: 0.52, labeling: 0.08, filling: 0.22, duty: 0.28, logistics: 0.35, margin_distributor: 0.80, margin_retailer: 1.20, marketing_per_unit: 0.45, total_cogs: 1.48, rrp_low: 2.99, rrp_mid: 3.49, rrp_high: 4.99 },
  gin: { liquid: 1.80, packaging: 1.40, labeling: 0.12, filling: 0.35, duty: 7.74, logistics: 0.60, margin_distributor: 3.50, margin_retailer: 6.00, marketing_per_unit: 1.20, total_cogs: 4.27, rrp_low: 25.00, rrp_mid: 32.00, rrp_high: 45.00 },
  tequila: { liquid: 3.20, packaging: 1.60, labeling: 0.15, filling: 0.40, duty: 7.74, logistics: 1.20, margin_distributor: 4.00, margin_retailer: 7.00, marketing_per_unit: 1.50, total_cogs: 6.55, rrp_low: 30.00, rrp_mid: 38.00, rrp_high: 55.00 },
  vodka: { liquid: 0.60, packaging: 1.20, labeling: 0.10, filling: 0.30, duty: 7.74, logistics: 0.55, margin_distributor: 3.00, margin_retailer: 5.00, marketing_per_unit: 1.00, total_cogs: 2.75, rrp_low: 18.00, rrp_mid: 24.00, rrp_high: 35.00 },
  whisky: { liquid: 4.50, packaging: 1.80, labeling: 0.15, filling: 0.40, duty: 7.74, logistics: 0.65, margin_distributor: 5.00, margin_retailer: 8.00, marketing_per_unit: 1.80, total_cogs: 7.50, rrp_low: 35.00, rrp_mid: 45.00, rrp_high: 65.00 },
  rum: { liquid: 1.50, packaging: 1.30, labeling: 0.12, filling: 0.35, duty: 7.74, logistics: 0.80, margin_distributor: 3.50, margin_retailer: 5.50, marketing_per_unit: 1.10, total_cogs: 4.07, rrp_low: 22.00, rrp_mid: 30.00, rrp_high: 42.00 },
  wine: { liquid: 1.20, packaging: 0.90, labeling: 0.10, filling: 0.25, duty: 2.67, logistics: 0.50, margin_distributor: 2.50, margin_retailer: 4.00, marketing_per_unit: 0.80, total_cogs: 2.95, rrp_low: 8.00, rrp_mid: 12.00, rrp_high: 18.00 },
  beer: { liquid: 0.25, packaging: 0.35, labeling: 0.05, filling: 0.15, duty: 0.18, logistics: 0.30, margin_distributor: 0.50, margin_retailer: 0.80, marketing_per_unit: 0.20, total_cogs: 0.98, rrp_low: 1.80, rrp_mid: 2.50, rrp_high: 4.00 },
  nolo: { liquid: 0.80, packaging: 0.60, labeling: 0.10, filling: 0.20, duty: 0.00, logistics: 0.35, margin_distributor: 1.50, margin_retailer: 2.50, marketing_per_unit: 0.60, total_cogs: 1.70, rrp_low: 5.00, rrp_mid: 8.00, rrp_high: 12.00 },
  cognac: { liquid: 8.00, packaging: 2.50, labeling: 0.20, filling: 0.45, duty: 7.74, logistics: 0.70, margin_distributor: 6.00, margin_retailer: 10.00, marketing_per_unit: 2.00, total_cogs: 11.85, rrp_low: 40.00, rrp_mid: 55.00, rrp_high: 85.00 },
  champagne: { liquid: 5.00, packaging: 2.00, labeling: 0.18, filling: 0.40, duty: 2.67, logistics: 0.65, margin_distributor: 5.00, margin_retailer: 8.50, marketing_per_unit: 1.60, total_cogs: 8.23, rrp_low: 28.00, rrp_mid: 38.00, rrp_high: 60.00 },
}

export const GO_TO_MARKET_PITFALLS = [
  { category: 'Regulatory', items: [
    { risk: 'Duty miscalculation on import', impact: 'High', detail: 'UK spirits duty is \u00a328.74/litre of pure alcohol. Miscalculating ABV or volume can destroy margins. RTDs at 5% ABV pay far less than 40% spirits.' },
    { risk: 'Missing AWRS registration', impact: 'Critical', detail: 'Alcohol Wholesaler Registration Scheme (AWRS) is mandatory in UK. Trading without it is a criminal offence. Apply 45 days before launch.' },
    { risk: 'EU labeling non-compliance', impact: 'High', detail: 'From June 2026, all spirits sold in EU must display calories, ingredients, and allergens. Non-compliant stock cannot be sold.' },
    { risk: 'Health claim restrictions', impact: 'Medium', detail: 'Cannot make health claims on alcoholic beverages. \u201cLow calorie\u201d claims must meet specific thresholds. Functional ingredients claims heavily restricted.' },
  ]},
  { category: 'Financial', items: [
    { risk: 'Undercapitalised launch', impact: 'Critical', detail: 'Most new brands need 18-24 months of runway. \u00a3150K minimum for UK-only; \u00a3400K+ for UK+EU. 70% of failures are cash-flow related, not product quality.' },
    { risk: 'Distributor margin squeeze', impact: 'High', detail: 'Distributors take 25-35% margin. Retailers another 30-40%. Your ex-works price must leave room after COGS + duty. Many brands discover margins too late.' },
    { risk: 'Listing fees & promotional spend', impact: 'High', detail: 'Major UK grocers charge \u00a35K-25K per SKU for listing. Promotional spend (gondola ends, price promotions) can add 15-20% to costs.' },
    { risk: 'FX exposure', impact: 'Medium', detail: 'If manufacturing abroad, currency fluctuations can erode margins. GBP/USD and GBP/EUR moves of 5-10% are common annually.' },
  ]},
  { category: 'Distribution', items: [
    { risk: 'Route-to-market complexity', impact: 'High', detail: 'UK has consolidated distribution (Matthew Clark, LWC, Bibendum). Getting listed requires proven velocity or significant marketing commitment.' },
    { risk: 'On-trade vs off-trade conflict', impact: 'Medium', detail: 'Pricing for on-trade (bars) and off-trade (retail) must be managed carefully. Deep discounting in supermarkets undermines on-trade partnerships.' },
    { risk: 'Cold chain requirements', impact: 'Medium', detail: 'RTDs and beer require temperature-controlled logistics. Adds 15-25% to distribution costs. Champagne and wine also sensitive.' },
    { risk: 'Minimum order quantities', impact: 'Medium', detail: 'Contract packers require MOQs (typically 500-2000 cases). Overproduction ties up capital; underproduction means stock-outs.' },
  ]},
  { category: 'Marketing', items: [
    { risk: 'Celebrity attachment risk', impact: 'High', detail: 'Celebrity scandals can destroy brand value overnight. Insurance (if available) is expensive. 40% of celebrity spirits brands fail within 3 years.' },
    { risk: 'Social media advertising restrictions', impact: 'Medium', detail: 'ASA/CAP rules restrict alcohol advertising. Must not appeal to under-18s. Age-gating required. Instagram/TikTok enforcement inconsistent.' },
    { risk: 'Sampling & events cost overruns', impact: 'Medium', detail: 'Budget \u00a35-15 per consumer trial. Events ROI typically 60-90 days to materialise. Festival sponsorship: \u00a320K-100K+ for meaningful presence.' },
    { risk: 'Oversaturated influencer space', impact: 'Medium', detail: 'Spirits influencer engagement rates have declined 35% since 2023. Micro-influencers (5K-50K followers) now outperform macro on conversion.' },
  ]},
]

export const TIMELINE_MILESTONES = [
  { month: -12, label: 'Concept & R&D', tasks: ['Product formulation', 'Brand identity & design', 'Legal entity setup', 'AWRS application'] },
  { month: -9, label: 'Production Setup', tasks: ['Contract packer selection', 'Packaging procurement', 'First production run', 'Quality testing & certification'] },
  { month: -6, label: 'Distribution & Compliance', tasks: ['Distributor negotiations', 'Retailer buyer meetings', 'EU compliance documentation', 'Import/export licensing'] },
  { month: -3, label: 'Pre-Launch Marketing', tasks: ['PR campaign activation', 'Social media build-up', 'Trade show presence', 'Sampling programme'] },
  { month: 0, label: 'LAUNCH', tasks: ['First deliveries to trade', 'Launch event(s)', 'Press coverage push', 'POS material deployment'] },
  { month: 3, label: 'Post-Launch', tasks: ['Rate-of-sale monitoring', 'Reorder management', 'Consumer feedback loop', 'Second market planning'] },
  { month: 6, label: 'Scale & Optimise', tasks: ['Expand distribution points', 'International market entry', 'Range extension planning', 'Investor/growth capital raise'] },
]

export const UK_REGIONS = [
  { id: 'london', name: 'London', pop: '9.0M', avgSpend: '\u00a348.20', cocktailIndex: 142, spritzAffinity: 'Very High', socialDensity: 'Very High',
    zones: [
      { name: 'Soho / West End', bars: 320, terraces: 85, engagement: 'Very High', demographic: '25-45 professionals, tourists', bestFor: 'Launch events, press nights' },
      { name: 'Shoreditch / Hackney', bars: 180, terraces: 45, engagement: 'High', demographic: '22-38 creatives, early adopters', bestFor: 'Influencer activations, pop-ups' },
      { name: 'South Bank / Bermondsey', bars: 95, terraces: 30, engagement: 'High', demographic: '28-50 food/drink enthusiasts', bestFor: 'Terrace sampling, food pairing events' },
      { name: 'Notting Hill / Chelsea', bars: 75, terraces: 35, engagement: 'Medium-High', demographic: '30-55 affluent residents', bestFor: 'Premium positioning, private events' },
      { name: 'Canary Wharf / City', bars: 110, terraces: 25, engagement: 'Medium', demographic: '25-50 finance professionals', bestFor: 'Corporate activations, afterwork events' },
    ]
  },
  { id: 'manchester', name: 'Manchester', pop: '2.8M', avgSpend: '\u00a335.40', cocktailIndex: 118, spritzAffinity: 'High', socialDensity: 'High',
    zones: [
      { name: 'Northern Quarter', bars: 95, terraces: 30, engagement: 'Very High', demographic: '22-40 creatives, students', bestFor: 'Trend-setting activations, music venues' },
      { name: 'Deansgate / Spinningfields', bars: 65, terraces: 20, engagement: 'High', demographic: '28-45 professionals', bestFor: 'Premium launches, corporate events' },
      { name: 'Ancoats / New Islington', bars: 35, terraces: 15, engagement: 'High', demographic: '25-38 foodies, young professionals', bestFor: 'Experiential pop-ups, food markets' },
    ]
  },
  { id: 'brighton', name: 'Brighton', pop: '0.3M', avgSpend: '\u00a338.80', cocktailIndex: 128, spritzAffinity: 'Very High', socialDensity: 'High',
    zones: [
      { name: 'North Laine / The Lanes', bars: 65, terraces: 40, engagement: 'Very High', demographic: '22-45 creative professionals', bestFor: 'Summer activations, terrace takeovers' },
      { name: 'Seafront / Hove', bars: 30, terraces: 25, engagement: 'High', demographic: '28-55 residents, tourists', bestFor: 'Seasonal campaigns, festival tie-ins' },
    ]
  },
  { id: 'edinburgh', name: 'Edinburgh', pop: '0.5M', avgSpend: '\u00a340.20', cocktailIndex: 125, spritzAffinity: 'High', socialDensity: 'High',
    zones: [
      { name: 'New Town / George St', bars: 55, terraces: 20, engagement: 'High', demographic: '28-50 professionals, tourists', bestFor: 'Premium positioning, festival season' },
      { name: 'Grassmarket / Old Town', bars: 45, terraces: 15, engagement: 'High', demographic: '22-40 students, tourists', bestFor: 'High footfall sampling, Fringe activations' },
    ]
  },
  { id: 'bristol', name: 'Bristol', pop: '0.5M', avgSpend: '\u00a336.50', cocktailIndex: 122, spritzAffinity: 'High', socialDensity: 'Medium-High',
    zones: [
      { name: 'Harbourside / Clifton', bars: 50, terraces: 25, engagement: 'High', demographic: '25-45 creative professionals', bestFor: 'Terrace activations, food/drink festivals' },
      { name: 'Stokes Croft / Gloucester Rd', bars: 35, terraces: 10, engagement: 'High', demographic: '22-35 students, creatives', bestFor: 'Grassroots activations, local influencers' },
    ]
  },
  { id: 'birmingham', name: 'Birmingham', pop: '1.1M', avgSpend: '\u00a332.80', cocktailIndex: 108, spritzAffinity: 'Medium', socialDensity: 'Medium',
    zones: [
      { name: 'Colmore Row / Brindleyplace', bars: 45, terraces: 15, engagement: 'Medium-High', demographic: '28-50 professionals', bestFor: 'Corporate events, professional networking' },
      { name: 'Digbeth / Jewellery Quarter', bars: 40, terraces: 10, engagement: 'High', demographic: '22-38 creatives, foodies', bestFor: 'Street food markets, emerging venue activations' },
    ]
  },
  { id: 'leeds', name: 'Leeds', pop: '0.8M', avgSpend: '\u00a333.20', cocktailIndex: 112, spritzAffinity: 'Medium-High', socialDensity: 'Medium',
    zones: [
      { name: 'Call Lane / Merrion', bars: 55, terraces: 12, engagement: 'High', demographic: '22-38 students, young professionals', bestFor: 'Volume activations, nightlife integration' },
    ]
  },
  { id: 'liverpool', name: 'Liverpool', pop: '0.5M', avgSpend: '\u00a331.50', cocktailIndex: 110, spritzAffinity: 'Medium', socialDensity: 'Medium-High',
    zones: [
      { name: 'Bold Street / Ropewalks', bars: 50, terraces: 15, engagement: 'High', demographic: '22-40 creatives, nightlife enthusiasts', bestFor: 'Cultural activations, festival tie-ins' },
    ]
  },
]

export const VENUE_TYPES = [
  { type: 'Cocktail Bars', avgCover: '\u00a345+', spritzFit: 95, reachPer: 'High', costPer: '\u00a3800-2500/activation', bestSeason: 'Year-round', notes: 'Premium positioning. Staff advocacy critical. Backbar visibility drives 3x reorders.' },
  { type: 'Rooftop / Terrace Bars', avgCover: '\u00a350+', spritzFit: 98, reachPer: 'Very High', costPer: '\u00a31500-5000/activation', bestSeason: 'Apr-Sep', notes: 'Perfect for Spritz format. Instagram-driven. Terrace takeovers deliver 5x ROI vs indoor.' },
  { type: 'Wine Bars', avgCover: '\u00a338+', spritzFit: 85, reachPer: 'Medium-High', costPer: '\u00a3600-1800/activation', bestSeason: 'Year-round', notes: 'Natural fit for Fino Spritz. Educated clientele. Staff training essential for sherry advocacy.' },
  { type: 'Gastropubs', avgCover: '\u00a332+', spritzFit: 70, reachPer: 'Medium', costPer: '\u00a3400-1200/activation', bestSeason: 'Apr-Oct', notes: 'Beer garden/terrace focus. Food-pairing opportunity. Larger volume but lower price point.' },
  { type: 'Hotel Bars', avgCover: '\u00a355+', spritzFit: 88, reachPer: 'Medium', costPer: '\u00a31000-3500/activation', bestSeason: 'Year-round', notes: 'Aspirational setting. Tourist + business clientele. Menu placement fees apply. Long decision cycles.' },
  { type: 'Beach / Lido Bars', avgCover: '\u00a328+', spritzFit: 96, reachPer: 'High', costPer: '\u00a3500-2000/activation', bestSeason: 'May-Sep', notes: 'Seasonal but extremely high Spritz affinity. UK lidos and coastal bars trending strongly.' },
  { type: 'Festival / Events', avgCover: '\u00a360+', spritzFit: 80, reachPer: 'Very High', costPer: '\u00a35000-50000/event', bestSeason: 'Jun-Sep', notes: 'Mass sampling opportunity. Brand immersion. Average cost per trial: \u00a38-15. Best for awareness.' },
]

export const SOCIAL_MEDIA_TARGETING = {
  instagram: {
    platform: 'Instagram',
    bestFormats: ['Reels (15-30s)', 'Stories with swipe-up', 'Carousel posts', 'Collab posts'],
    avgCPM: '\u00a35.80-12.40',
    bestAudiences: ['Food & drink enthusiasts', 'Cocktail lovers', 'Summer lifestyle', 'Wine & aperitivo'],
    geoTargets: [
      { area: 'London SW/W postcodes', reach: '1.2M', cpm: '\u00a38.50', affinity: 'Very High' },
      { area: 'London E/EC postcodes', reach: '0.8M', cpm: '\u00a37.20', affinity: 'High' },
      { area: 'Manchester M1-M4', reach: '0.3M', cpm: '\u00a35.80', affinity: 'High' },
      { area: 'Brighton BN1-BN3', reach: '0.15M', cpm: '\u00a36.40', affinity: 'Very High' },
      { area: 'Edinburgh EH1-EH8', reach: '0.18M', cpm: '\u00a36.10', affinity: 'High' },
      { area: 'Bristol BS1-BS8', reach: '0.12M', cpm: '\u00a35.50', affinity: 'Medium-High' },
    ],
    peakTimes: { weekday: '6-9pm', weekend: '11am-2pm, 5-9pm' },
    hashtags: ['#SpritzSeason', '#FiNoSpritz', '#SherrySpritz', '#AperitivoHour', '#TerraceVibes', '#SummerDrinks'],
  },
  tiktok: {
    platform: 'TikTok',
    bestFormats: ['15s recipe videos', 'Bartender POV', 'ASMR pouring', 'Day-in-the-life'],
    avgCPM: '\u00a33.20-7.80',
    bestAudiences: ['Gen Z cocktail curious', 'Food trends', 'Summer vibes', 'UK nightlife'],
    geoTargets: [
      { area: 'London (all)', reach: '3.5M', cpm: '\u00a34.80', affinity: 'High' },
      { area: 'Manchester', reach: '1.1M', cpm: '\u00a33.60', affinity: 'High' },
      { area: 'Brighton', reach: '0.3M', cpm: '\u00a34.20', affinity: 'Very High' },
      { area: 'UK 18-34 nationwide', reach: '12M', cpm: '\u00a33.40', affinity: 'Medium' },
    ],
    peakTimes: { weekday: '7-10pm', weekend: '12-3pm, 7-11pm' },
    hashtags: ['#SpritzTok', '#SummerCocktails', '#DrinkTok', '#AperitivoTime', '#SherryRevival'],
  },
  meta: {
    platform: 'Facebook / Meta',
    bestFormats: ['Video ads (15-30s)', 'Carousel (venues/serves)', 'Event promotions', 'Lookalike audiences'],
    avgCPM: '\u00a34.50-9.80',
    bestAudiences: ['30-55 wine & spirits buyers', 'Food & drink groups', 'Local events attendees'],
    geoTargets: [
      { area: 'London (25-55, interests: wine/spirits)', reach: '2.1M', cpm: '\u00a36.20', affinity: 'High' },
      { area: 'UK cities (top 8)', reach: '5.5M', cpm: '\u00a34.80', affinity: 'Medium-High' },
      { area: 'UK nationwide', reach: '18M', cpm: '\u00a34.20', affinity: 'Medium' },
    ],
    peakTimes: { weekday: '12-2pm, 7-9pm', weekend: '10am-1pm, 6-9pm' },
    hashtags: ['#SherryRenaissance', '#SpanishDrinks', '#SummerAperitivo'],
  },
}

export const CAMPAIGN_BUDGET_TIERS = [
  { tier: 'Seed', budget: '\u00a315K-30K', duration: '8 weeks', reach: '50K-150K', bestFor: 'Single city launch, grassroots activation',
    allocation: { digital: 35, sampling: 30, pr: 20, trade: 15 },
    activities: ['2-3 venue activations', 'Micro-influencer partnerships (5-10)', 'Targeted Instagram/TikTok geo-ads', 'Local press outreach'],
    expectedROI: '2.5-4x over 6 months',
  },
  { tier: 'Growth', budget: '\u00a350K-120K', duration: '12 weeks', reach: '300K-800K', bestFor: 'Multi-city campaign, summer season push',
    allocation: { digital: 30, sampling: 25, pr: 20, trade: 15, events: 10 },
    activities: ['8-12 venue activations across 3-4 cities', 'Mid-tier influencer partnerships (15-25)', 'Multi-platform paid social', 'Trade press & consumer PR', '1-2 festival activations'],
    expectedROI: '3.5-5x over 6 months',
  },
  { tier: 'Scale', budget: '\u00a3150K-350K', duration: '16-20 weeks', reach: '1M-3M', bestFor: 'National campaign, category-defining moment',
    allocation: { digital: 28, sampling: 20, pr: 18, trade: 14, events: 12, ooh: 8 },
    activities: ['20+ venue activations nationwide', 'Celebrity/macro-influencer partnership', 'OOH in key transport hubs', 'National PR campaign', '3-5 festival/event activations', 'Retailer promotional support'],
    expectedROI: '4-7x over 12 months',
  },
]

export const SCENARIO_SOURCES = [
  { label: 'HMRC Alcohol Duty Rates, 2025' },
  { label: 'WSTA Market Report, 2025' },
  { label: 'CGA Nielsen On-Trade Data, Q4 2025' },
  { label: 'IWSR Spirits Market Report, 2025' },
  { label: 'PitchBook Spirits & Beverages, 2025' },
]

// ── Data Methodology ──
export const DATA_METHODOLOGY = {
  overview: 'Market size estimates synthesized from IWSR Global Spirits Database, Euromonitor Passport Alcoholic Drinks, and DISCUS public disclosures. Growth rates represent year-over-year value change in USD at constant exchange rates unless otherwise stated.',
  pricing: 'Pricing data collected from retailer websites (Tesco, Sainsbury\'s, Waitrose, Master of Malt, Total Wine, Drizly, El Corte Ingl\u00e9s) during March 2026. Prices reflect standard retail, not promotional pricing, unless flagged.',
  sources: [
    { name: 'IWSR Global Spirits Database 2025', description: 'Proprietary database covering 160+ markets with volume and value data by category, price band, and channel.', url: 'https://www.theiwsr.com/global-spirits-report' },
    { name: 'Euromonitor Passport \u2014 Alcoholic Drinks', description: 'Market sizing, forecasts, and competitive landscape data for spirits, wine, and beer across 100+ countries.', url: 'https://www.euromonitor.com/alcoholic-drinks' },
    { name: 'DISCUS Annual Economic Briefing', description: 'US spirits industry data: shipments, revenue, state-level trends, and category performance from the Distilled Spirits Council.', url: 'https://www.discus.org/economics/research' },
    { name: 'NielsenIQ Off-Trade Panel', description: 'Retail scanner data from off-premise channels (supermarkets, liquor stores) covering sales volume, value, and distribution metrics.', url: 'https://www.nielseniq.com/global/en/insights/' },
    { name: 'The Spirits Business / Drinks International', description: 'Trade publication market intelligence, brand rankings, and industry trend analysis.', url: 'https://www.thespiritsbusiness.com/category/market-data/' },
    { name: 'OIV (International Organisation of Vine and Wine)', description: 'Global wine production, consumption, and trade statistics. Primary source for wine category data.', url: 'https://www.oiv.int/what-we-do/global-report' },
  ],
  lastUpdated: 'March 2026',
  updateFrequency: 'Quarterly (Jan, Apr, Jul, Oct)',
  disclaimer: 'All market data represents best estimates compiled from multiple public and proprietary sources. Figures may differ from individual source reports due to methodology differences in market definition, exchange rates, and reporting periods.',
}

