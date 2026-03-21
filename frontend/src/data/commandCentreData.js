export const DATA_LAST_UPDATED = '2026-03-21'

// ══════════════════════════════════════════════════════════
// Command Centre Data — extracted from inline JSX
// ══════════════════════════════════════════════════════════

// ── KPI Sparkline Data (5-point micro-charts) ──
export const KPI_TRENDS = {
  market:    [{ v: 580 }, { v: 598 }, { v: 612 }, { v: 623 }, { v: 635 }],
  pe:        [{ v: 24.1 }, { v: 23.8 }, { v: 23.2 }, { v: 22.9 }, { v: 22.4 }],
  premium:   [{ v: 4.2 }, { v: 4.8 }, { v: 5.6 }, { v: 6.1 }, { v: 6.8 }],
  nolo:      [{ v: 5.1 }, { v: 5.8 }, { v: 6.4 }, { v: 7.1 }, { v: 7.5 }],
  ecomm:     [{ v: 8.5 }, { v: 10.1 }, { v: 11.8 }, { v: 12.9 }, { v: 14.2 }],
  cogs:      [{ v: 48 }, { v: 52 }, { v: 55 }, { v: 58 }, { v: 62 }],
}

// ── Category Snapshot with mini-trend data ──
export const CATEGORY_SNAPSHOT = [
  { key: 'tequila', name: 'Tequila & Mezcal', size: '$4.8B', growth: '+7.8%', dir: 'up', signal: 'Agave surplus may ease costs', trend: [{ v: 3.2 }, { v: 3.6 }, { v: 4.0 }, { v: 4.4 }, { v: 4.8 }], channels: { onTrade: 35, offTrade: 42, eCommerce: 12, travelRetail: 11 } },
  { key: 'vodka', name: 'Vodka', size: '$40.1B', growth: '-0.8%', dir: 'down', signal: 'Premiumization offsetting volume decline', trend: [{ v: 41.5 }, { v: 41.2 }, { v: 40.8 }, { v: 40.4 }, { v: 40.1 }], channels: { onTrade: 30, offTrade: 52, eCommerce: 10, travelRetail: 8 } },
  { key: 'whisky', name: 'Whisky (Global)', size: '$6.3B', growth: '+4.2%', dir: 'up', signal: 'Japanese whisky supply constraints', trend: [{ v: 5.1 }, { v: 5.4 }, { v: 5.7 }, { v: 6.0 }, { v: 6.3 }], channels: { onTrade: 33, offTrade: 40, eCommerce: 14, travelRetail: 13 } },
  { key: 'gin', name: 'Gin', size: '$14.2B', growth: '+1.2%', dir: 'up', signal: 'Growth plateauing post-boom', trend: [{ v: 12.8 }, { v: 13.5 }, { v: 13.9 }, { v: 14.0 }, { v: 14.2 }], channels: { onTrade: 38, offTrade: 40, eCommerce: 13, travelRetail: 9 } },
  { key: 'rum', name: 'Rum', size: '$15.8B', growth: '+3.1%', dir: 'up', signal: 'Premium dark rum accelerating', trend: [{ v: 13.8 }, { v: 14.2 }, { v: 14.8 }, { v: 15.3 }, { v: 15.8 }], channels: { onTrade: 34, offTrade: 44, eCommerce: 11, travelRetail: 11 } },
  { key: 'cognac', name: 'Cognac & Brandy', size: '$4.1B', growth: '-2.4%', dir: 'down', signal: 'China tariff impact persists', trend: [{ v: 4.8 }, { v: 4.6 }, { v: 4.4 }, { v: 4.2 }, { v: 4.1 }], channels: { onTrade: 28, offTrade: 38, eCommerce: 12, travelRetail: 22 } },
  { key: 'champagne', name: 'Champagne & Sparkling', size: '$7.2B', growth: '+2.8%', dir: 'up', signal: 'Prosecco growth offsetting Champagne softness', trend: [{ v: 6.2 }, { v: 6.5 }, { v: 6.8 }, { v: 7.0 }, { v: 7.2 }], channels: { onTrade: 40, offTrade: 35, eCommerce: 10, travelRetail: 15 } },
  { key: 'wine', name: 'Wine (Still)', size: '$38.2B', growth: '-1.2%', dir: 'down', signal: 'Structural volume decline continues', trend: [{ v: 40.1 }, { v: 39.5 }, { v: 39.0 }, { v: 38.6 }, { v: 38.2 }], channels: { onTrade: 32, offTrade: 50, eCommerce: 12, travelRetail: 6 } },
  { key: 'beer', name: 'Beer & Craft', size: '$623B', growth: '+1.4%', dir: 'up', signal: 'Craft consolidation wave', trend: [{ v: 590 }, { v: 600 }, { v: 608 }, { v: 615 }, { v: 623 }], channels: { onTrade: 45, offTrade: 42, eCommerce: 8, travelRetail: 5 } },
  { key: 'nolo', name: 'No/Low Alcohol', size: '$13B', growth: '+9.5%', dir: 'up', signal: 'Fastest-growing segment globally', trend: [{ v: 7.5 }, { v: 8.8 }, { v: 10.2 }, { v: 11.5 }, { v: 13 }], channels: { onTrade: 25, offTrade: 48, eCommerce: 20, travelRetail: 7 } },
  { key: 'rtd', name: 'RTD / Ready-to-Drink', size: '$40B', growth: '+8.2%', dir: 'up', signal: 'Maturing from explosive growth phase', trend: [{ v: 25 }, { v: 29 }, { v: 33 }, { v: 37 }, { v: 40 }], channels: { onTrade: 20, offTrade: 55, eCommerce: 18, travelRetail: 7 } },
]

// ── Regional Pulse ──
export const REGIONAL_PULSE = [
  { region: 'North America', flag: '\ud83c\uddfa\ud83c\uddf8', value: '$98B', growth: '+2.8%', dir: 'up', note: 'Premium spirits + RTD driving', trend: [{ v: 88 }, { v: 91 }, { v: 93 }, { v: 96 }, { v: 98 }] },
  { region: 'Europe', flag: '\ud83c\uddea\ud83c\uddfa', value: '$142B', growth: '+0.9%', dir: 'up', note: 'Labeling regulation headwinds', trend: [{ v: 137 }, { v: 138 }, { v: 139 }, { v: 141 }, { v: 142 }] },
  { region: 'Asia-Pacific', flag: '\ud83c\uddef\ud83c\uddf5', value: '$210B', growth: '+4.1%', dir: 'up', note: 'India & SE Asia fastest', trend: [{ v: 178 }, { v: 188 }, { v: 196 }, { v: 203 }, { v: 210 }] },
  { region: 'Latin America', flag: '\ud83c\udde7\ud83c\uddf7', value: '$52B', growth: '+3.5%', dir: 'up', note: 'Tequila export boom', trend: [{ v: 43 }, { v: 45 }, { v: 48 }, { v: 50 }, { v: 52 }] },
  { region: 'Middle East & Africa', flag: '\ud83c\udde6\ud83c\uddea', value: '$18B', growth: '+5.2%', dir: 'up', note: 'Travel retail & non-alc growth', trend: [{ v: 13 }, { v: 14 }, { v: 15.5 }, { v: 17 }, { v: 18 }] },
]

// ── Market Signals ──
export const MARKET_SIGNALS = [
  { type: 'M&A', urgency: 'high', headline: 'Diageo announces \u00a33B share buyback program', date: 'Feb 20, 2026', source: 'FT', impact: 'Signals confidence in cash generation; may pressure peers to return capital' },
  { type: 'Regulation', urgency: 'high', headline: 'EU alcohol labeling regulation enters enforcement phase', date: 'Feb 18, 2026', source: 'European Commission', impact: 'Mandatory calorie/ingredient labels from June 2026; compliance costs for importers' },
  { type: 'Supply', urgency: 'medium', headline: 'Mexican agave surplus reaches 5-year high', date: 'Feb 15, 2026', source: 'CRT', impact: 'Tequila input costs may decline 15-20%; benefits Becle, Cuervo brands' },
  { type: 'Trade', urgency: 'high', headline: 'China maintains 30% import duty on EU spirits', date: 'Feb 12, 2026', source: 'Reuters', impact: 'Cognac exports to China remain depressed; R\u00e9my Cointreau most exposed' },
  { type: 'M&A', urgency: 'medium', headline: 'Craft distillery consolidation accelerates \u2014 47 acquisitions in Q4', date: 'Feb 10, 2026', source: 'Spirits Business', impact: 'Mid-tier brands being absorbed; entry multiples averaging 8-12x EBITDA' },
  { type: 'Category', urgency: 'low', headline: 'RTD category growth decelerates to +8.2% (was +15% in 2023)', date: 'Feb 8, 2026', source: 'IWSR Global Spirits Report', impact: 'Market maturing; winners emerging (BuzzBallz, High Noon, Cutwater)' },
]

// ── Market Pulse (progressive disclosure items) ──
export const MARKET_PULSE = [
  { category: 'Tequila & Mezcal', event: 'Agave surplus hits 5-year high', impact: 'Input costs down 18-22%; margin expansion for producers', change: '+2.1%', dir: 'up', date: 'Feb 25', detail: 'The CRT reports Mexican agave surplus of 2.3M tons, the highest since 2020. This is driving a significant reduction in raw material costs for tequila producers. Brands sourcing agave directly can expect 18-22% savings on input costs through H2 2026. However, the surplus is also encouraging new entrants, which may increase competitive pressure in the value segment.', link: '/categories', linkLabel: 'View Tequila Intelligence' },
  { category: 'No/Low Alcohol', event: 'Seedlip reformulation gains traction in EU', impact: 'Category legitimacy strengthening; regulatory clarity improving', change: '+9.5%', dir: 'up', date: 'Feb 24', detail: 'Diageo\'s Seedlip has completed its EU-compliant reformulation, meeting new labeling requirements ahead of the June 2026 deadline. The no/lo segment continues to accelerate at +9.5% globally, with the UK and Germany leading adoption. Health-conscious consumers and GLP-1 medication users are driving structural demand shifts.', link: '/categories', linkLabel: 'View No/Lo Intelligence' },
  { category: 'Cognac & Brandy', event: 'China maintains 30% import duty through H1', impact: 'Export volumes remain depressed; R\u00e9my Cointreau most exposed', change: '-2.4%', dir: 'down', date: 'Feb 23', detail: 'Beijing has confirmed the 30% retaliatory tariff on EU spirits imports will remain through at least H1 2026. Cognac houses with >25% China revenue exposure (R\u00e9my Cointreau, Hennessy) face continued headwinds. Some brands are pivoting to India and Southeast Asia, but these markets cannot absorb the volume loss in the near term.', link: '/categories', linkLabel: 'View Cognac Intelligence' },
  { category: 'RTD / Ready-to-Drink', event: 'BuzzBallz acquisition rumours intensify', impact: 'Consolidation wave accelerating; shelf space competition heating up', change: '+8.2%', dir: 'up', date: 'Feb 22', detail: 'Constellation Brands is reportedly in due diligence for BuzzBallz/Southern Champion at an estimated $1.1B valuation. The RTD category, while still growing at +8.2%, is decelerating from its +15% peak in 2023. The major players are consolidating to secure shelf space and manufacturing capacity.', link: '/categories', linkLabel: 'View RTD Intelligence' },
  { category: 'Whisky (Global)', event: 'Japanese distillery capacity expansion announced', impact: 'Supply constraints easing for 2028+; premiums may compress', change: '+4.2%', dir: 'up', date: 'Feb 21', detail: 'Three major Japanese distilleries (Suntory Yamazaki, Nikka Yoichi, and Mars Shinshu) have announced capacity expansions totaling \u00a512B in investment. While new-make spirit won\'t be available as aged whisky until 2030+, the signal suggests supply constraints will ease. Current 30-40% premiums over equivalent Scotch may compress by 10-15% as supply normalizes.', link: '/categories', linkLabel: 'View Whisky Intelligence' },
  { category: 'Wine (Still)', event: 'French production down 16% vs 5-year avg', impact: 'Structural volume decline continues; fine wine values rising', change: '-1.2%', dir: 'down', date: 'Feb 20', detail: 'Heat and drought have reduced French wine production by 16% versus the 5-year average. Bordeaux and Burgundy are hardest hit. While this is negative for volume, it\'s positive for fine wine valuations as scarcity drives collector interest. Still wine overall continues its structural decline as younger consumers shift to spirits, RTDs, and no/lo alternatives.', link: '/categories', linkLabel: 'View Wine Intelligence' },
]

// ── Price Alerts ──
export const PRICE_ALERTS = [
  { product: 'Don Julio 1942', category: 'Tequila', pricePoint: '$159', change: '+$12', pctChange: '+8.2%', period: '6mo', direction: 'up', channel: 'Off-Trade', reason: 'Supply allocation tightening; Diageo restricting distribution', severity: 'watch', link: '/pricing' },
  { product: 'Fever-Tree Tonic (24pk)', category: 'Mixers', pricePoint: '\u00a318.50', change: '-\u00a31.20', pctChange: '-6.1%', period: '3mo', direction: 'down', channel: 'Off-Trade', reason: 'Promotional pricing as share price drops; acquisition rumours', severity: 'opportunity', link: '/pricing' },
  { product: 'Hennessy VS', category: 'Cognac', pricePoint: '$38', change: '+$4', pctChange: '+11.8%', period: '12mo', direction: 'up', channel: 'Travel Retail', reason: 'China tariff pass-through; duty-free margin protection', severity: 'alert', link: '/pricing' },
  { product: 'Athletic Brewing IPA', category: 'No/Lo Beer', pricePoint: '$10.99', change: '-$1.00', pctChange: '-8.3%', period: '3mo', direction: 'down', channel: 'E-Commerce', reason: 'Category competition intensifying; market share grab', severity: 'watch', link: '/pricing' },
  { product: 'Clase Azul Reposado', category: 'Ultra-Premium Tequila', pricePoint: '$179', change: '+$20', pctChange: '+12.6%', period: '6mo', direction: 'up', channel: 'On-Trade', reason: 'Bacardi minority stake driving brand repositioning upward', severity: 'alert', link: '/pricing' },
  { product: 'High Noon Sun Sips (8pk)', category: 'RTD', pricePoint: '$19.99', change: '+$2.00', pctChange: '+11.1%', period: '6mo', direction: 'up', channel: 'Off-Trade', reason: 'Supply chain cost pass-through; aluminium + spirits input', severity: 'watch', link: '/pricing' },
  { product: 'Monkey 47 Gin', category: 'Premium Gin', pricePoint: '\u20ac42', change: '-\u20ac3', pctChange: '-6.7%', period: '3mo', direction: 'down', channel: 'E-Commerce', reason: 'Pernod full ownership enabling aggressive distribution pricing', severity: 'opportunity', link: '/pricing' },
  { product: 'Dalmore 18yr', category: 'Scotch Whisky', pricePoint: '\u00a3210', change: '+\u00a325', pctChange: '+13.5%', period: '12mo', direction: 'up', channel: 'Travel Retail', reason: 'Ultra-premium positioning; Emperador revaluation effect', severity: 'alert', link: '/pricing' },
]

// ── Insight Briefings (expanded detail per KPI) ──
export const INSIGHT_BRIEFINGS = {
  'Global Spirits Market': {
    title: 'Global Spirits Market Intelligence Brief',
    summary: 'The global spirits market reached $635B in 2025, growing at 3.1% despite macroeconomic headwinds. This figure covers distilled spirits only (excluding beer at $623B, wine at $38.2B, and cider). Premiumisation continues to be the dominant theme, with super-premium and above segments growing at 6.8% versus mainstream at just 1.2%.',
    methodology: 'Methodology: $635B represents the global distilled spirits market (IWSR 2025). Category pages include beer, wine, and non-alcoholic segments for full drinks industry coverage. Totals should not be summed across category types.',
    keyPoints: [
      'Asia-Pacific remains the largest region ($210B) growing at 4.1%, driven by India and Southeast Asia',
      'North America ($98B) seeing RTD cannibalisation of traditional spirits volume but value growth continues',
      'EU regulation (labeling enforcement June 2026) creating compliance costs estimated at $2-5 per SKU',
      'GLP-1 drugs reducing dining-out occasions by 23% in UK; potential structural headwind for on-trade'
    ],
    actionable: 'For a new brand entering market: target premium positioning ($35-55 RRP) in growth categories (tequila/mezcal, RTD, no/lo). Avoid value segments where large incumbents have scale advantages.',
    sources: ['IWSR 2025 Global Report', 'Euromonitor Spirits Tracker', 'FT Lex Column Feb 2026']
  },
  'Sector Avg P/E': {
    title: 'Spirits Sector Valuation Analysis',
    summary: 'The sector average P/E has compressed from 24.1x to 22.4x over 12 months, reflecting investor caution around China tariff exposure and volume softness in developed markets.',
    keyPoints: [
      'Diageo trades at 19.8x (discount to 5yr avg of 24x) on China/India execution concerns',
      'Constellation Brands premium at 25.2x reflects beer segment strength (15 consecutive growth quarters)',
      'Craft/startup exits averaging 8-12x EBITDA; slight compression from 2023 peak of 10-14x',
      'Private equity dry powder in spirits estimated at $4.5B looking for deployment'
    ],
    actionable: 'Valuation compression creates acquisition opportunities. If raising capital, anchor to EBITDA multiples not P/E. Comparable transactions (Proper No. Twelve at ~15x) still above public market averages.',
    sources: ['Bloomberg Terminal', 'PitchBook Spirits M&A Report', 'Spirits Business Annual Review']
  },
  'Premium Segment Growth': {
    title: 'Premium Spirits Growth Deep Dive',
    summary: 'The premium segment (+6.8%) continues to outpace mainstream (+1.2%), creating a bifurcated market. Ultra-premium (>$50 RRP) growing fastest at +9.2%, driven by gift culture and experiential consumption.',
    keyPoints: [
      'Japanese whisky leads premium growth with 30-40% price premiums over equivalent Scotch',
      'Premium tequila (Clase Azul, Don Julio 1942) now a $2.1B sub-segment growing at +12%',
      'Travel retail driving premiumisation with duty-free exclusives averaging 35% higher margins',
      'Celebrity/creator brands capturing 8% of premium shelf space, up from 2% in 2021'
    ],
    actionable: 'Position any new brand at premium price point minimum. Invest in origin story, packaging, and limited editions. On-trade seeding in top-50 bars provides disproportionate brand halo effect.',
    sources: ['IWSR Premium+ Report', 'The Spirits Business', 'Distill Ventures Trends']
  },
  'COGS Pressure Index': {
    title: 'Supply Chain Cost Pressure Analysis',
    summary: 'The COGS Pressure Index has risen to 62/100, driven primarily by freight costs (Baltic Dry Index +110% YoY), glass container costs (PPI 216.38), and energy prices affecting European distillers.',
    keyPoints: [
      'Glass bottle costs up 18% since 2023; some brands shifting to lighter weight bottles or alternative formats',
      'Agave surplus (2.3M tons) is a bright spot \u2014 tequila input costs falling 18-22%',
      'Barley prices (\u20ac224/t) adding \u00a30.15-0.20 per bottle to whisky production costs',
      'Aluminium for RTD cans relatively stable; RTD COGS advantage widening vs glass-bottled spirits'
    ],
    actionable: 'Negotiate 12-month fixed glass contracts now before Q3 price adjustments. Consider RTD format as lower-COGS entry point. Source agave-based products while surplus depresses prices.',
    sources: ['Baltic Exchange', 'US Bureau of Labor Statistics', 'CRT Mexico Agave Report']
  },
}

// ── Upcoming Events ──
export const UPCOMING_EVENTS = [
  { date: 'Feb 27', company: 'Diageo', event: 'H1 FY2026 Results', type: 'Earnings' },
  { date: 'Mar 5', company: 'Pernod Ricard', event: 'H1 FY2026 Results', type: 'Earnings' },
  { date: 'Mar 12', company: 'Brown-Forman', event: 'Q3 FY2026 Results', type: 'Earnings' },
  { date: 'Mar 15-17', company: 'Industry', event: 'ProWein D\u00fcsseldorf', type: 'Trade Show' },
  { date: 'Mar 20', company: 'R\u00e9my Cointreau', event: 'FY2026 Annual Results', type: 'Earnings' },
  { date: 'Apr 2', company: 'Constellation Brands', event: 'Q4 FY2026 Results', type: 'Earnings' },
  { date: 'Apr 8', company: 'LVMH', event: 'Q1 2026 Revenue', type: 'Earnings' },
  { date: 'Apr 15-17', company: 'Industry', event: 'Vinexpo Paris', type: 'Trade Show' },
]

// ── Recently Updated Feed ──
export const RECENTLY_UPDATED = [
  { section: 'Categories', item: 'Tequila & Mezcal 2025 data', timestamp: '2h ago', type: 'data', link: '/categories', description: 'Updated market size ($4.8B), growth rates, and brand tiering with Q4 2025 actuals' },
  { section: 'Companies', item: 'Diageo H1 FY2026 preview', timestamp: '4h ago', type: 'analysis', link: '/companies', description: 'Pre-earnings analysis ahead of Feb 27 results; DTC platform metrics added' },
  { section: 'Venues', item: '50 Best Bars 2025 list published', timestamp: '1d ago', type: 'data', link: '/venues', description: 'Full 2025 rankings with brand stocking data, sponsor analysis, and trend extraction' },
  { section: 'Pricing', item: 'Travel retail price index updated', timestamp: '1d ago', type: 'data', link: '/pricing', description: 'Duty-free pricing across 12 major airports; average premium vs domestic calculated' },
  { section: 'Supply Chain', item: 'Baltic Dry Index spike analysis', timestamp: '2d ago', type: 'alert', link: '/supply-chain', description: 'BDI +110% YoY analysis with impact modelling on per-bottle shipping costs' },
  { section: 'Geographic', item: 'India market deep dive added', timestamp: '2d ago', type: 'analysis', link: '/geographic', description: 'State-by-state regulatory landscape, growth hotspots, and distribution requirements' },
  { section: 'Reports', item: 'M&A Pipeline Q1 2026 refresh', timestamp: '3d ago', type: 'data', link: '/reports', description: '8 active deals tracked with likelihood scores, deal values, and strategic significance' },
  { section: 'Categories', item: 'No/Lo Alcohol segment update', timestamp: '3d ago', type: 'data', link: '/categories', description: '+9.5% growth confirmed; Seedlip reformulation data; Athletic Brewing revenue milestone' },
]

// ── Recent Movers (biggest changes this period) ──
export const RECENT_MOVERS = [
  { name: 'No/Low Alcohol', type: 'category', change: '+9.5%', dir: 'up', context: 'Fastest segment globally; GLP-1 tailwind', link: '/categories', entityType: 'category', entityId: 'nolo' },
  { name: 'RTD / Ready-to-Drink', type: 'category', change: '+8.2%', dir: 'up', context: 'Consolidation accelerating; BuzzBallz $1.1B deal', link: '/categories', entityType: 'category', entityId: 'rtd' },
  { name: 'Tequila & Mezcal', type: 'category', change: '+7.8%', dir: 'up', context: 'Agave surplus driving margin expansion', link: '/categories', entityType: 'category', entityId: 'tequila' },
  { name: 'Cognac & Brandy', type: 'category', change: '-2.4%', dir: 'down', context: 'China 30% duty persists through H1', link: '/categories', entityType: 'category', entityId: 'cognac' },
  { name: 'Wine (Still)', type: 'category', change: '-1.2%', dir: 'down', context: 'Structural decline; French production -16%', link: '/categories', entityType: 'category', entityId: 'wine' },
  { name: 'Clase Azul Reposado', type: 'brand', change: '+12.6%', dir: 'up', context: 'Bacardi stake driving repositioning', link: '/pricing', entityType: 'brand', entityId: 'clase-azul' },
  { name: 'Dalmore 18yr', type: 'brand', change: '+13.5%', dir: 'up', context: 'Ultra-premium Emperador effect', link: '/pricing', entityType: 'brand', entityId: 'dalmore' },
  { name: 'Fever-Tree Tonic', type: 'brand', change: '-6.1%', dir: 'down', context: 'Promotional pricing; acquisition rumours', link: '/pricing', entityType: 'brand', entityId: 'fever-tree' },
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

