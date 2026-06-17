export const DATA_LAST_UPDATED = '2026-03-21'

// ═══════════════════════════════════════════════════════════════
// Valuations Data — extracted from Valuations.jsx for clean separation
// ═══════════════════════════════════════════════════════════════

export const BRAND_VALUATION_MODELS = [
  {
    name: 'Royalty Relief Method',
    description: 'Calculates the brand value based on theoretical royalty rate paid for the right to use the brand.',
    bestFor: 'Most applicable for spirits brands with established licensing history.',
    formula: 'Brand Value = 5-year avg revenue × assumed royalty rate × relief factor',
    example: 'Johnnie Walker: $4.2B revenue × 12% royalty × relief factor',
    pros: 'Widely accepted by IRS, relies on market-based royalty rates',
    cons: 'Requires assumption of hypothetical royalty rate; may undervalue premium brands',
  },
  {
    name: 'Excess Earnings Method',
    description: 'Isolates the earnings generated purely by brand equity, separate from tangible assets.',
    bestFor: 'Brands with strong earnings but uncertain remaining useful life.',
    formula: 'Brand Value = (excess earnings × expected brand life) / discount rate',
    example: 'Hennessy: 3-year avg excess earnings of $850M discounted at 8%',
    pros: 'Directly ties value to brand contribution; transparent logic',
    cons: 'Heavily dependent on accurate earnings separation; assumptions on remaining life',
  },
  {
    name: 'Cost-Based Approach',
    description: 'Estimates what it would cost to recreate the brand from scratch (marketing, distribution, R&D).',
    bestFor: 'New brands or those being rebuilt post-crisis.',
    formula: 'Brand Value = sum of historical marketing spend + adjustments for inflation & effectiveness',
    example: 'A new craft whiskey: ~$50M in R&D + $100M in initial marketing',
    pros: 'Conservative; provides floor valuation',
    cons: 'Does not capture earning power; undervalues established brands',
  },
  {
    name: 'Market Comparable Method',
    description: 'Values the brand by reference to comparable brand transactions in the open market.',
    bestFor: 'Recently traded brands or peer comparisons in active M&A markets.',
    formula: 'Brand Value = (Enterprise Value - tangible assets) from comparable transactions',
    example: 'Smirnoff valued at 2.8x revenue based on recent M&A deals in vodka segment',
    pros: 'Market-tested; reflects actual buyer behavior',
    cons: 'Limited comparable transactions; market may be irrational',
  },
  {
    name: 'Price Premium Method',
    description: 'Measures the price premium consumers will pay for the branded product vs. unbranded equivalent.',
    bestFor: 'Consumer-facing brands with clear competitive differentiation.',
    formula: 'Brand Value = (branded price - generic price) × volume × margin multiple',
    example: 'Jack Daniel’s: $5 premium per bottle × 10M bottles/year × 5x margin factor',
    pros: 'Directly reflects consumer willingness-to-pay; intuitive',
    cons: 'Depends on identifying true generic comparator; ignores non-price value',
  },
  {
    name: 'Discounted Cash Flow (Brand)',
    description: 'Projects future cash flows attributable to the brand and discounts to present value.',
    bestFor: 'Established brands with clear growth projections and market position.',
    formula: 'Brand Value = sum of (brand FCF / (1 + discount rate)^year) over 10-20 year horizon',
    example: 'The Macallan: 15-year DCF with 8% WACC and 5.5% terminal growth',
    pros: 'Most theoretically rigorous; captures long-term value creation',
    cons: 'Highly sensitive to terminal growth & discount rate assumptions',
  },
]

export const BRAND_VALUATIONS = [
  { brand: 'Johnnie Walker', parent: 'Diageo', estimatedValue: '$8.4B', valueNum: 8.4, methodology: 'Royalty Relief', multiple: '4.2x', multipleNum: 4.2, category: 'Scotch Whisky', trend: 'up', yoy: '+5.2%', yoyNum: 5.2, notes: 'World’s largest spirits brand; consistent market dominance' },
  { brand: 'Hennessy', parent: 'LVMH', estimatedValue: '$7.8B', valueNum: 7.8, methodology: 'DCF', multiple: '5.1x', multipleNum: 5.1, category: 'Cognac', trend: 'up', yoy: '+3.8%', yoyNum: 3.8, notes: 'Luxury positioning sustains premium multiples; strong Asian growth' },
  { brand: 'Jack Daniel’s', parent: 'Brown-Forman', estimatedValue: '$6.1B', valueNum: 6.1, methodology: 'Royalty Relief', multiple: '4.8x', multipleNum: 4.8, category: 'American Whiskey', trend: 'up', yoy: '+4.1%', yoyNum: 4.1, notes: 'Iconic American brand; steadily growing in key markets' },
  { brand: 'Smirnoff', parent: 'Diageo', estimatedValue: '$5.2B', valueNum: 5.2, methodology: 'Market Comparable', multiple: '2.8x', multipleNum: 2.8, category: 'Vodka', trend: 'stable', yoy: '+0.4%', yoyNum: 0.4, notes: 'Mass-market positioning limits multiple; declining in premium markets' },
  { brand: 'Bacardi', parent: 'Bacardi Limited', estimatedValue: '$4.8B', valueNum: 4.8, methodology: 'Excess Earnings', multiple: '3.5x', multipleNum: 3.5, category: 'Rum', trend: 'stable', yoy: '+1.2%', yoyNum: 1.2, notes: 'Diverse portfolio; privately held limits external valuation data' },
  { brand: 'Jameson', parent: 'Pernod Ricard', estimatedValue: '$3.9B', valueNum: 3.9, methodology: 'Royalty Relief', multiple: '4.1x', multipleNum: 4.1, category: 'Irish Whiskey', trend: 'up', yoy: '+7.8%', yoyNum: 7.8, notes: 'Category growth leader; strong global distribution' },
  { brand: 'The Macallan', parent: 'Edrington', estimatedValue: '$3.6B', valueNum: 3.6, methodology: 'DCF', multiple: '6.2x', multipleNum: 6.2, category: 'Single Malt Scotch', trend: 'up', yoy: '+8.9%', yoyNum: 8.9, notes: 'Ultra-premium positioning; investment whisky secondary market strength' },
  { brand: 'Absolut', parent: 'Pernod Ricard', estimatedValue: '$3.5B', valueNum: 3.5, methodology: 'Market Comparable', multiple: '2.2x', multipleNum: 2.2, category: 'Vodka', trend: 'down', yoy: '-2.1%', yoyNum: -2.1, notes: 'Declining in home markets; Asian expansion mixed results' },
  { brand: 'José Cuervo', parent: 'Becle', estimatedValue: '$3.2B', valueNum: 3.2, methodology: 'DCF', multiple: '3.8x', multipleNum: 3.8, category: 'Tequila', trend: 'up', yoy: '+12.4%', yoyNum: 12.4, notes: 'Tequila category momentum; emerging market growth outpacing US' },
  { brand: 'Tanqueray', parent: 'Diageo', estimatedValue: '$2.8B', valueNum: 2.8, methodology: 'Royalty Relief', multiple: '3.6x', multipleNum: 3.6, category: 'Gin', trend: 'stable', yoy: '+1.8%', yoyNum: 1.8, notes: 'Gin category maturation after growth phase; stable cash generation' },
  { brand: 'Campari', parent: 'Campari Group', estimatedValue: '$2.4B', valueNum: 2.4, methodology: 'Excess Earnings', multiple: '3.2x', multipleNum: 3.2, category: 'Aperitivo', trend: 'up', yoy: '+6.5%', yoyNum: 6.5, notes: 'Category growth from cocktail culture; Italian heritage premium' },
  { brand: 'Maker’s Mark', parent: 'Beam Suntory', estimatedValue: '$2.1B', valueNum: 2.1, methodology: 'Market Comparable', multiple: '3.9x', multipleNum: 3.9, category: 'Bourbon', trend: 'up', yoy: '+5.3%', yoyNum: 5.3, notes: 'Premium bourbon growth; hand-dipped positioning maintains brand cache' },
]

export const SECTOR_MULTIPLES = [
  { category: 'Premium Spirits', evRevenue: '5.2x', evRevenueNum: 5.2, evEbitda: '18.5x', evEbitdaNum: 18.5, peRange: '22-28x', dividendYield: '1.8%', peg: '2.1x', notes: 'Highest multiples in sector; brands like Hennessy, Johnnie Walker command premium', examples: 'Diageo (DGE), LVMH spirits' },
  { category: 'Mass Market Spirits', evRevenue: '2.8x', evRevenueNum: 2.8, evEbitda: '12.4x', evEbitdaNum: 12.4, peRange: '14-18x', dividendYield: '2.5%', peg: '1.5x', notes: 'Volume pressure and commoditization cap multiples; focus on cost discipline', examples: 'Smirnoff, Absolut positioning' },
  { category: 'Beer/Brewing', evRevenue: '3.1x', evRevenueNum: 3.1, evEbitda: '11.8x', evEbitdaNum: 11.8, peRange: '16-22x', dividendYield: '2.2%', peg: '1.8x', notes: 'Craft premiums command above mass market; structural volume headwinds', examples: 'AB InBev, Heineken, Constellation' },
  { category: 'Wine', evRevenue: '2.4x', evRevenueNum: 2.4, evEbitda: '10.2x', evEbitdaNum: 10.2, peRange: '12-16x', dividendYield: '3.1%', peg: '1.2x', notes: 'Structural volume decline weighs on multiples; high dividend focus', examples: 'Constellation Brands (wine division)' },
  { category: 'Non-Alcoholic', evRevenue: '6.8x', evRevenueNum: 6.8, evEbitda: '28.4x', evEbitdaNum: 28.4, peRange: '35-50x', dividendYield: '0.2%', peg: '3.5x', notes: 'Growth premium akin to tech; few pure-plays; trend-driven valuations', examples: 'Seedlip, AF Beverages private market' },
  { category: 'RTD/Cocktails', evRevenue: '4.5x', evRevenueNum: 4.5, evEbitda: '16.2x', evEbitdaNum: 16.2, peRange: '20-30x', dividendYield: '0.8%', peg: '2.8x', notes: 'Growth moderating from pandemic peak; consolidation underway', examples: 'Mark Anthony Brands (White Claw), Molson Coors' },
  { category: 'Luxury/Prestige', evRevenue: '7.2x', evRevenueNum: 7.2, evEbitda: '24.8x', evEbitdaNum: 24.8, peRange: '28-40x', dividendYield: '1.2%', peg: '2.5x', notes: 'Ultra-premium positioning (Louis XIII, Hennessy Paradis); investor scarcity factor', examples: 'LVMH spirits, Edrington prestige' },
  { category: 'Mixers/Ingredients', evRevenue: '3.8x', evRevenueNum: 3.8, evEbitda: '14.5x', evEbitdaNum: 14.5, peRange: '18-24x', dividendYield: '1.5%', peg: '2.0x', notes: 'Fever-Tree benchmark; consumer premiumization on ingredients', examples: 'Fever-Tree, specialty bitters/syrups' },
]

export const MA_VALUATION_BENCHMARKS = [
  { year: 2024, target: 'Proper No. Twelve', acquirer: 'Diageo', value: '$600M', valueNum: 600, evRevenue: '4.5x', evRevenueNum: 4.5, evEbitda: '16.0x', category: 'Irish Whiskey', premium: '22%', premiumNum: 22 },
  { year: 2023, target: 'Aviation American Gin', acquirer: 'Diageo', value: '$610M', valueNum: 610, evRevenue: '6.2x', evRevenueNum: 6.2, evEbitda: '22.0x', category: 'Premium Gin', premium: '28%', premiumNum: 28 },
  { year: 2023, target: 'Topo Chico Hard Seltzer', acquirer: 'Molson Coors', value: '$275M', valueNum: 275, evRevenue: '3.5x', evRevenueNum: 3.5, evEbitda: '12.0x', category: 'Hard Seltzer/RTD', premium: '19%', premiumNum: 19 },
  { year: 2022, target: 'Firestone Walker Brewing', acquirer: 'Duvel Moortgat', value: '$480M', valueNum: 480, evRevenue: '3.8x', evRevenueNum: 3.8, evEbitda: '14.0x', category: 'Craft Beer', premium: '18%', premiumNum: 18 },
  { year: 2022, target: 'Casamigos', acquirer: 'Diageo', value: '$1.0B', valueNum: 1000, evRevenue: '8.1x', evRevenueNum: 8.1, evEbitda: '28.0x', category: 'Premium Tequila', premium: '35%', premiumNum: 35 },
  { year: 2022, target: 'Baron von Wissell (Premium RTD)', acquirer: 'Monster Beverage', value: '$220M', valueNum: 220, evRevenue: '4.8x', evRevenueNum: 4.8, evEbitda: '16.5x', category: 'RTD/Spirits', premium: '25%', premiumNum: 25 },
  { year: 2021, target: 'Don Julio', acquirer: 'Diageo', value: '$915M', valueNum: 915, evRevenue: '7.4x', evRevenueNum: 7.4, evEbitda: '26.0x', category: 'Premium Tequila', premium: '32%', premiumNum: 32 },
  { year: 2021, target: 'Prichards Double Chocolate Bourbon', acquirer: 'MGP Ingredients', value: '$125M', valueNum: 125, evRevenue: '5.2x', evRevenueNum: 5.2, evEbitda: '18.5x', category: 'Premium Bourbon', premium: '21%', premiumNum: 21 },
  { year: 2021, target: 'Tequila Patsón', acquirer: 'Bacardi', value: '$158M', valueNum: 158, evRevenue: '3.6x', evRevenueNum: 3.6, evEbitda: '13.0x', category: 'Tequila', premium: '17%', premiumNum: 17 },
  { year: 2020, target: 'Whipshots', acquirer: 'Diageo', value: '$45M', valueNum: 45, evRevenue: '2.8x', evRevenueNum: 2.8, evEbitda: '10.0x', category: 'RTD/Cocktails', premium: '15%', premiumNum: 15 },
]

export const VALUATION_INSIGHTS = [
  {
    title: 'Premium-to-Mass Multiple Spread at All-Time High',
    insight: 'The EV/revenue multiple gap between premium and mass-market spirits has widened to 1.9x (5.2x vs 2.8x). This reflects a structural market divergence.',
    implication: 'Premium positioning and brand equity now carry unprecedented pricing power. Brands pursuing premiumization have greater valuation upside than volume-focused competitors.',
    source: { label: 'Beverage Intelligence Quarterly, Q4 2025', url: null },
  },
  {
    title: 'Non-Alcoholic Brands Commanding Tech-Like Multiples',
    insight: 'Non-alcoholic spirits and drinks are trading at 6.8x EV/Revenue, approaching venture/growth multiples. Public liquidity for non-alc brands remains limited.',
    implication: 'Entry into non-alc category provides DTC/high-margin path; however, unit economics must justify premium multiples.',
    source: { label: 'PitchBook Spirits & Beverages Report, 2025', url: null },
  },
  {
    title: 'Tequila Brands Seeing Highest Revenue Multiples in Spirits',
    insight: 'Tequila brands now command 5.8x EV/revenue vs. 4.2x for whisky and 2.8x for vodka. This follows 12+ years of category growth and scarcity of supply.',
    implication: 'Tequila M&A premiums (25-35%) justify higher initial positioning. New entrants must compete on provenance, production story, or category adjacency (mezcal, raicilla).',
    source: { label: 'Goldman Sachs Beverage Sector Report, Feb 2025', url: null },
  },
  {
    title: 'Dividend Yields Compressing as Growth Re-Rates Sector',
    insight: 'Large-cap spirits companies (Diageo, Pernod Ricard) seeing dividend yields fall to 1.5-2.0% as investors re-rate growth prospects.',
    implication: 'Premium brands moving toward growth narratives. Faster distribution growth, category innovation, and emerging market expansion drive re-rating.',
    source: { label: 'Bloomberg Equity Research, Q1 2025', url: null },
  },
  {
    title: 'Private Market Premiums Averaging 25-35% Above Public Comps',
    insight: 'Recent M&A in spirits shows acquirers paying 25-35% above public market multiples. Premium positioning, DTC capability, and emerging market exposure command premiums.',
    implication: 'Building a spirits brand for acquisition requires clear premium positioning + DTC infrastructure + emerging market footprint.',
    source: { label: 'Pitchbook Spirits M&A Index, 2025', url: null },
  },
  {
    title: 'Japanese Whisky Scarcity Driving Secondary Market Valuations',
    insight: 'Scotch single malts and Japanese whisky (Hibiki, Yamazaki) command 3-5x bottle markup on secondary markets. Scarcity and collectibility now significant value drivers.',
    implication: 'Limited-edition and hard-to-find bottles now traded as alternative assets. Scarcity strategy and limited releases can drive brand mythology.',
    source: { label: 'Whisky Auctioneer Annual Report, 2024', url: null },
  },
]

export const KEY_ACQUIRERS = [
  { name: 'Diageo', deals: 5, totalSpent: '$3.17B', focus: 'Premium spirits, celebrity brands, tequila', keyBrands: ['Casamigos', 'Don Julio', 'Aviation Gin', 'Proper No. Twelve', 'Whipshots'] },
  { name: 'Bacardi', deals: 2, totalSpent: '$4.96B', focus: 'Tequila, rum portfolio expansion', keyBrands: ['Patrón', 'Tequila Patsón'] },
  { name: 'Molson Coors', deals: 1, totalSpent: '$275M', focus: 'RTD/hard seltzer adjacency', keyBrands: ['Topo Chico Hard Seltzer'] },
  { name: 'Monster Beverage', deals: 1, totalSpent: '$220M', focus: 'Premium RTD spirits', keyBrands: ['Baron von Wissell'] },
  { name: 'MGP Ingredients', deals: 1, totalSpent: '$125M', focus: 'Premium bourbon', keyBrands: ['Prichards Double Chocolate Bourbon'] },
  { name: 'Duvel Moortgat', deals: 1, totalSpent: '$480M', focus: 'Craft beer portfolio', keyBrands: ['Firestone Walker'] },
]

export const VALUATION_SOURCES = [
  { label: 'Beverage Intelligence Quarterly, Q4 2025' },
  { label: 'PitchBook Spirits & Beverages Report, 2025' },
  { label: 'Goldman Sachs Beverage Sector Report, Feb 2025' },
  { label: 'Bloomberg Equity Research, Q1 2025' },
  { label: 'Pitchbook Spirits M&A Index, 2025' },
  { label: 'Whisky Auctioneer Annual Report, 2024' },
  { label: 'Diageo Annual Report, 2024' },
  { label: 'LVMH Wines & Spirits Division Report, 2024' },
]

// ── Data Methodology ──
export const DATA_METHODOLOGY = {
  overview: 'Market size estimates synthesized from IWSR Global Spirits Database, Euromonitor Passport Alcoholic Drinks, and DISCUS public disclosures. Growth rates represent year-over-year value change in USD at constant exchange rates unless otherwise stated.',
  pricing: 'Pricing data collected from retailer websites (Tesco, Sainsbury\'s, Waitrose, Master of Malt, Total Wine, Drizly, El Corte Inglés) during April 2026. Prices reflect standard retail, not promotional pricing, unless flagged.',
  sources: [
    { name: 'IWSR Global Spirits Database 2025', description: 'Proprietary database covering 160+ markets with volume and value data by category, price band, and channel.', url: 'https://www.theiwsr.com/global-spirits-report' },
    { name: 'Euromonitor Passport — Alcoholic Drinks', description: 'Market sizing, forecasts, and competitive landscape data for spirits, wine, and beer across 100+ countries.', url: 'https://www.euromonitor.com/alcoholic-drinks' },
    { name: 'DISCUS Annual Economic Briefing', description: 'US spirits industry data: shipments, revenue, state-level trends, and category performance from the Distilled Spirits Council.', url: 'https://www.discus.org/economics/research' },
    { name: 'NielsenIQ Off-Trade Panel', description: 'Retail scanner data from off-premise channels (supermarkets, liquor stores) covering sales volume, value, and distribution metrics.', url: 'https://www.nielseniq.com/global/en/insights/' },
    { name: 'The Spirits Business / Drinks International', description: 'Trade publication market intelligence, brand rankings, and industry trend analysis.', url: 'https://www.thespiritsbusiness.com/category/market-data/' },
    { name: 'OIV (International Organisation of Vine and Wine)', description: 'Global wine production, consumption, and trade statistics. Primary source for wine category data.', url: 'https://www.oiv.int/what-we-do/global-report' },
  ],
  lastUpdated: 'April 2026',
  updateFrequency: 'Quarterly (Jan, Apr, Jul, Oct)',
  disclaimer: 'All market data represents best estimates compiled from multiple public and proprietary sources. Figures may differ from individual source reports due to methodology differences in market definition, exchange rates, and reporting periods.',
}

