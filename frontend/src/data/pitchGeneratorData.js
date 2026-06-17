// Investor Pitch Generator — template data and market references

export const PITCH_SECTIONS = [
  { id: 'problem', title: 'The Problem', icon: 'AlertTriangle' },
  { id: 'solution', title: 'Our Solution', icon: 'Zap' },
  { id: 'market', title: 'Market Opportunity', icon: 'TrendingUp' },
  { id: 'product', title: 'Product & Positioning', icon: 'Package' },
  { id: 'traction', title: 'Traction & Milestones', icon: 'Target' },
  { id: 'competition', title: 'Competitive Landscape', icon: 'Users' },
  { id: 'distribution', title: 'Distribution Strategy', icon: 'Globe' },
  { id: 'financials', title: 'Financial Projections', icon: 'DollarSign' },
  { id: 'team', title: 'Team', icon: 'Users' },
  { id: 'ask', title: 'The Ask', icon: 'Banknote' },
]

export const CATEGORY_MARKET_DATA = {
  tequila: { globalMarketSize: '$12.8B', cagr: '6.2%', keyInsight: 'Tequila surpassed vodka in US revenue in 2025. Premiumisation is the primary growth driver, with 100% agave expressions now accounting for 65% of value.' },
  vodka: { globalMarketSize: '$42.1B', cagr: '2.1%', keyInsight: 'Volume declining but value growing through premiumisation. Flavoured vodka seeing resurgence through RTD crossover. Still the largest global spirits category by volume.' },
  gin: { globalMarketSize: '$16.5B', cagr: '4.8%', keyInsight: 'Post-gin boom maturation. Market moving from flavoured to provenance-led positioning. Over 900 brands in UK alone — differentiation critical.' },
  whisky: { globalMarketSize: '$68.2B', cagr: '5.5%', keyInsight: 'Scotch exports £6.1B in 2025. Japanese whisky commands premium prices. Irish whisky fastest growing sub-category. American whiskey faces tariff headwinds in EU.' },
  rum: { globalMarketSize: '$15.3B', cagr: '4.2%', keyInsight: 'Premium dark/aged rum is the growth engine. Caribbean origin provides duty advantages in UK/EU. Spiced remains volume leader but value growth is in premium.' },
  cognac: { globalMarketSize: '$10.1B', cagr: '3.8%', keyInsight: 'US and China account for 75% of global demand. Highest liquid cost of any spirit. Asia recovery post-2024 driving optimism. VS/VSOP most accessible for new entrants.' },
  champagne: { globalMarketSize: '$7.2B', cagr: '2.5%', keyInsight: 'Appellation-controlled. Grower Champagnes trending vs négociant houses. Gift occasions drive 40% of sales. UK is largest export market.' },
  wine: { globalMarketSize: '$340B', cagr: '3.1%', keyInsight: 'UK is world’s 2nd largest importer. Duty increase hit margins. English sparkling growing 30% CAGR. Bag-in-box and canned formats gaining share.' },
  beer: { globalMarketSize: '$623B', cagr: '3.4%', keyInsight: 'Craft consolidation accelerating. World lager dominating trends. No/lo beer fastest growing sub-segment. Canned format preferred by 62% of craft consumers.' },
  nolo: { globalMarketSize: '$13.5B', cagr: '8.5%', keyInsight: 'Grew 31% in 2025. Zero duty is margin advantage. 75% of purchases are first-time — sampling is critical. Health/wellness positioning wins.' },
  rtd: { globalMarketSize: '$40.2B', cagr: '11.3%', keyInsight: 'Fastest-growing drinks category. Spirits-based RTDs outpacing hard seltzers. Premium cocktail cans trending. Can format reduces logistics cost 30% vs glass.' },
}

export const FINANCIAL_TEMPLATES = {
  conservative: { year1Revenue: 0.3, year2Revenue: 0.65, year3Revenue: 1.0, grossMargin: 0.45, netMargin: -0.15, breakEven: 'Year 3' },
  moderate: { year1Revenue: 0.5, year2Revenue: 1.0, year3Revenue: 1.8, grossMargin: 0.50, netMargin: -0.08, breakEven: 'Year 2.5' },
  aggressive: { year1Revenue: 0.8, year2Revenue: 1.8, year3Revenue: 3.5, grossMargin: 0.55, netMargin: 0.05, breakEven: 'Year 2' },
}

export const FUNDING_ROUNDS = {
  preSeed: { range: '£50K–£250K', stage: 'Concept/prototype', typical: 'Friends & family, angels', equity: '5–15%' },
  seed: { range: '£250K–£1M', stage: 'First sales, market validation', typical: 'Angel investors, micro-VCs', equity: '10–20%' },
  seriesA: { range: '£1M–£5M', stage: 'Scaling distribution, proven PMF', typical: 'VCs, strategic investors (drinks cos)', equity: '15–30%' },
  seriesB: { range: '£5M–£20M', stage: 'International expansion', typical: 'Growth VCs, PE, strategic acquirers', equity: '15–25%' },
}

export const DISTRIBUTION_MODELS = {
  direct: { name: 'Direct to Consumer', margin: '60–70%', control: 'Full', scalability: 'Low–Medium', bestFor: 'Premium/luxury, niche categories, DTC brands' },
  distributor: { name: 'Traditional Distribution', margin: '30–45%', control: 'Partial', scalability: 'High', bestFor: 'Volume brands, national reach, multi-channel' },
  hybrid: { name: 'Hybrid (DTC + Distributor)', margin: '40–55%', control: 'Mixed', scalability: 'Medium–High', bestFor: 'Premium brands, building awareness pre-distribution' },
  marketplace: { name: 'Online Marketplace', margin: '35–50%', control: 'Limited', scalability: 'Medium', bestFor: 'Testing markets, low-commitment entry, niche audiences' },
}
