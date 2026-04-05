export const DATA_LAST_UPDATED = '2026-03-21'

// Supply Chain & COGS Data
// Extracted from SupplyChain.jsx for progressive disclosure rebuild

export const COGS_DATA = {
  glass_ppi: {
    label: 'Glass Container PPI', value: 216.38, baseline: '2003=100', change: '+2.1%', source: 'BLS PCU3272133272130', updated: '2025-12',
    description: 'Bureau of Labor Statistics Producer Price Index for glass containers (Series PCU3272133272130). Tracks the weighted average selling price of glass bottles and containers from US manufacturers. Key cost input for beer, wine, and spirits packaging \u2014 glass typically represents 15-25% of total COGS for premium spirits.',
    sourceUrl: 'https://data.bls.gov/timeseries/PCU3272133272130',
    historicalData: { '2025-01': 211.4, '2025-02': 211.9, '2025-03': 212.3, '2025-04': 212.8, '2025-05': 213.1, '2025-06': 213.5, '2025-07': 213.9, '2025-08': 214.2, '2025-09': 214.8, '2025-10': 215.3, '2025-11': 215.9, '2025-12': 216.38 },
    group: 'packaging', relevantCategories: ['all']
  },
  container_index: {
    label: 'Drewry WCI (40ft)', value: 3421, unit: '$/40ft', change: '+110%', source: 'Drewry World Container Index', updated: '2026-02',
    description: 'Drewry World Container Index \u2014 composite benchmark tracking the cost of shipping a 40-foot container across 8 major east-west trade routes (Shanghai-Rotterdam, Shanghai-LA, etc.). Critical for imported spirits and wine. The index spiked from ~$1,600 in mid-2025 due to Red Sea disruptions and port congestion.',
    sourceUrl: 'https://www.drewry.co.uk/supply-chain-advisors/supply-chain-expertise/world-container-index-assessed-by-drewry',
    historicalData: { '2025-03': 1628, '2025-04': 1710, '2025-05': 1845, '2025-06': 2012, '2025-07': 2234, '2025-08': 2456, '2025-09': 2678, '2025-10': 2890, '2025-11': 3102, '2025-12': 3198, '2026-01': 3312, '2026-02': 3421 },
    group: 'freight', relevantCategories: ['all']
  },
  baltic_dry: {
    label: 'Baltic Dry Index', value: 2112, unit: 'pts', change: '+34%', source: 'Baltic Exchange', updated: '2026-02',
    description: 'Baltic Dry Index (BDI) \u2014 measures the cost of shipping dry bulk commodities (grain, coal, iron ore) across 20+ international routes. Indirect indicator for raw material transport costs. Rising BDI signals tightening vessel capacity, which spills over into container shipping rates for finished goods.',
    sourceUrl: 'https://www.balticexchange.com/en/data-services/market-information0/dry-services.html',
    historicalData: { '2025-03': 1576, '2025-04': 1612, '2025-05': 1654, '2025-06': 1702, '2025-07': 1756, '2025-08': 1812, '2025-09': 1878, '2025-10': 1945, '2025-11': 2012, '2025-12': 2056, '2026-01': 2089, '2026-02': 2112 },
    group: 'freight', relevantCategories: ['all']
  },
  agave: {
    label: 'Mexican Agave (SIAP)', value: 8.2, unit: 'MXN/kg', change: '-18%', source: 'SIAP Mexico', updated: '2026-01',
    description: 'SIAP reported price for Blue Weber Agave in Jalisco, Mexico. After a decade-long shortage that peaked at 30 MXN/kg in 2022, agave is now in oversupply as millions of plants from 2017-2019 plantings mature simultaneously. Prices falling sharply, benefiting tequila producers\u2019 margins.',
    sourceUrl: 'https://www.gob.mx/siap',
    historicalData: { '2025-02': 10.0, '2025-03': 9.8, '2025-04': 9.6, '2025-05': 9.5, '2025-06': 9.3, '2025-07': 9.1, '2025-08': 8.9, '2025-09': 8.8, '2025-10': 8.6, '2025-11': 8.4, '2025-12': 8.3, '2026-01': 8.2 },
    group: 'agricultural', relevantCategories: ['tequila', 'mezcal']
  },
  barley: {
    label: 'Barley (EU Malt)', value: 224, unit: 'EUR/t', change: '+12%', source: 'Euronext', updated: '2026-02',
    description: 'Euronext malting barley futures \u2014 the benchmark for European brewing and distilling barley. Malting barley is the primary raw material for Scotch whisky, beer, and grain spirits. Price rises driven by poor 2025 Scottish harvest (-40% in some regions) and increased demand from craft distillers.',
    sourceUrl: 'https://live.euronext.com/en/product/commodities/EMA-DPAR/contract-name',
    historicalData: { '2025-03': 200, '2025-04': 202, '2025-05': 204, '2025-06': 206, '2025-07': 208, '2025-08': 210, '2025-09': 212, '2025-10': 215, '2025-11': 218, '2025-12': 220, '2026-01': 222, '2026-02': 224 },
    group: 'agricultural', relevantCategories: ['whisky', 'beer']
  },
  corn: {
    label: 'Corn (US #2)', value: 4.82, unit: '$/bu', change: '+6%', source: 'CBOT', updated: '2026-02',
    description: 'CBOT corn futures for US #2 Yellow. Key input for bourbon whiskey production (minimum 51% corn mash bill), ethanol, and animal feed. US corn belt weather and ethanol mandate policy are primary price drivers.',
    sourceUrl: 'https://www.cmegroup.com/markets/agriculture/grains/corn.html',
    historicalData: { '2025-03': 4.55, '2025-04': 4.58, '2025-05': 4.60, '2025-06': 4.62, '2025-07': 4.65, '2025-08': 4.68, '2025-09': 4.70, '2025-10': 4.73, '2025-11': 4.76, '2025-12': 4.78, '2026-01': 4.80, '2026-02': 4.82 },
    group: 'agricultural', relevantCategories: ['bourbon', 'rtd']
  },
  sugarcane: {
    label: 'Raw Sugar (ICE No.11)', value: 22.4, unit: '\u00a2/lb', change: '+8%', source: 'ICE', updated: '2026-02',
    description: 'ICE Sugar No. 11 futures \u2014 the global benchmark for raw cane sugar. Critical input for rum production, liqueurs, and RTD cocktails. Brazil drought and Indian export restrictions have tightened global supply.',
    sourceUrl: 'https://www.ice.com/products/23/Sugar-No-11-Futures',
    historicalData: { '2025-03': 20.7, '2025-04': 20.9, '2025-05': 21.0, '2025-06': 21.2, '2025-07': 21.4, '2025-08': 21.6, '2025-09': 21.8, '2025-10': 22.0, '2025-11': 22.1, '2025-12': 22.2, '2026-01': 22.3, '2026-02': 22.4 },
    group: 'agricultural', relevantCategories: ['rum', 'rtd']
  },
  natural_gas: {
    label: 'Natural Gas (EU TTF)', value: 48.2, unit: 'EUR/MWh', change: '+15%', source: 'TTF', updated: '2026-02',
    description: 'TTF natural gas price \u2014 the European benchmark. Critical for glass manufacturing (furnaces at 1,500\u00b0C), distillery heating, bottling operations, and warehouse climate control. Energy typically represents 8-12% of total COGS.',
    sourceUrl: 'https://www.theice.com/products/27996665/Dutch-TTF-Gas-Futures',
    historicalData: { '2025-03': 41.9, '2025-04': 42.3, '2025-05': 42.8, '2025-06': 43.4, '2025-07': 44.1, '2025-08': 44.8, '2025-09': 45.5, '2025-10': 46.2, '2025-11': 46.9, '2025-12': 47.4, '2026-01': 47.8, '2026-02': 48.2 },
    group: 'energy', relevantCategories: ['all']
  },
  wheat: {
    label: 'UK Wheat Futures', value: 210, unit: '\u00a3/t', change: '+3%', source: 'NYSE Liffe', updated: '2026-02',
    description: 'LIFFE wheat futures for UK-grown wheat. Primary input for UK grain spirits, craft distillers, and breweries. UK harvest cycles and European price arbitrage drive volatility.',
    sourceUrl: 'https://www.theice.com/products/550/Wheat',
    historicalData: { '2025-03': 204, '2025-04': 204, '2025-05': 205, '2025-06': 206, '2025-07': 207, '2025-08': 208, '2025-09': 208, '2025-10': 208, '2025-11': 209, '2025-12': 210, '2026-01': 210, '2026-02': 210 },
    group: 'agricultural', relevantCategories: ['vodka', 'gin', 'beer']
  },
  grapes_champagne: {
    label: 'Champagne Grapes', value: 7.50, unit: '\u20ac/kg', change: '+9%', source: 'Institut Champagne', updated: '2026-01',
    description: 'Average price for hand-picked Chardonnay, Pinot Noir, and Meunier grapes (AOC). Highest grape prices in the global wine industry. 2025 frost damage reduced yields, driving prices higher.',
    sourceUrl: 'https://www.champagne.fr/en',
    historicalData: { '2025-03': 6.88, '2025-04': 6.95, '2025-05': 7.02, '2025-06': 7.08, '2025-07': 7.15, '2025-08': 7.22, '2025-09': 7.30, '2025-10': 7.38, '2025-11': 7.45, '2025-12': 7.48, '2026-01': 7.50, '2026-02': 7.50 },
    group: 'agricultural', relevantCategories: ['champagne']
  },
  grapes_bordeaux: {
    label: 'Bordeaux Grapes', value: 1.80, unit: '\u20ac/kg', change: '+2%', source: 'Conseil Interprofessionnel', updated: '2026-01',
    description: 'Average price for premium Bordeaux blending varieties (Cabernet Sauvignon, Merlot, Petit Verdot). Climate variability and fungal pressure drive year-to-year volatility.',
    sourceUrl: 'https://www.vins-bordeaux.fr/en',
    historicalData: { '2025-03': 1.76, '2025-04': 1.76, '2025-05': 1.77, '2025-06': 1.78, '2025-07': 1.78, '2025-08': 1.79, '2025-09': 1.79, '2025-10': 1.80, '2025-11': 1.80, '2025-12': 1.80, '2026-01': 1.80, '2026-02': 1.80 },
    group: 'agricultural', relevantCategories: ['wine']
  },
  oak_barrels: {
    label: 'French Oak Barrels', value: 900, unit: '\u20ac/barrel', change: '+1%', source: 'Cooperages Guild', updated: '2026-02',
    description: 'Average price for new French oak barrels (225L). French oak imparts premium flavor complexity preferred for cognac, armagnac, and prestige bourbon. American oak costs ~$450/barrel.',
    sourceUrl: 'https://www.tonellerie.fr',
    historicalData: { '2025-03': 885, '2025-04': 886, '2025-05': 887, '2025-06': 888, '2025-07': 889, '2025-08': 891, '2025-09': 892, '2025-10': 894, '2025-11': 896, '2025-12': 898, '2026-01': 899, '2026-02': 900 },
    group: 'premium', relevantCategories: ['cognac', 'whisky', 'wine']
  },
  aluminum: {
    label: 'LME Aluminum', value: 2350, unit: '$/t', change: '+8%', source: 'London Metal Exchange', updated: '2026-02',
    description: 'LME aluminum price. Critical for RTD cans (aluminum ~70% of can cost). Also relevant for crown caps and decorative elements. A $100/t swing = $0.02-0.03 per can.',
    sourceUrl: 'https://www.lme.com/en/metals/aluminium',
    historicalData: { '2025-03': 2174, '2025-04': 2186, '2025-05': 2204, '2025-06': 2223, '2025-07': 2245, '2025-08': 2268, '2025-09': 2291, '2025-10': 2316, '2025-11': 2332, '2025-12': 2341, '2026-01': 2346, '2026-02': 2350 },
    group: 'metals', relevantCategories: ['rtd', 'beer']
  },
  cardboard: {
    label: 'Corrugated Board Index', value: 850, unit: '$/short ton', change: '+4%', source: 'PPPC', updated: '2026-02',
    description: 'Paperboard Price Comparison Index for corrugated containerboard. Directly impacts shipping case costs. A $50/t increase translates to ~$0.15 per case.',
    sourceUrl: 'https://www.ppc-online.com/pulp-paper-prices',
    historicalData: { '2025-03': 817, '2025-04': 818, '2025-05': 822, '2025-06': 827, '2025-07': 832, '2025-08': 837, '2025-09': 841, '2025-10': 844, '2025-11': 847, '2025-12': 848, '2026-01': 849, '2026-02': 850 },
    group: 'packaging', relevantCategories: ['all']
  },
  co2: {
    label: 'EU ETS Carbon Price', value: 68, unit: '\u20ac/t CO2e', change: '+18%', source: 'EU ETS Registry', updated: '2026-02',
    description: 'EU Emissions Trading System carbon allowance price. Impacts glass melting, shipping, and distillery/brewery operations. Adds ~\u20ac0.10-0.15 to a bottle cost at current levels.',
    sourceUrl: 'https://ec.europa.eu/clima/eu-action/eu-emissions-trading-system-eu-ets_en',
    historicalData: { '2025-03': 57, '2025-04': 58, '2025-05': 60, '2025-06': 62, '2025-07': 64, '2025-08': 65, '2025-09': 66, '2025-10': 67, '2025-11': 67, '2025-12': 68, '2026-01': 68, '2026-02': 68 },
    group: 'energy', relevantCategories: ['all']
  },
  ethanol: {
    label: 'European Ethanol Price', value: 0.68, unit: '\u20ac/L', change: '+4%', source: 'CBOT/European brokers', updated: '2026-02',
    description: 'Benchmark price for industrial ethanol in Europe. Used by rectifiers, neutral spirit producers, and RTD manufacturers.',
    sourceUrl: 'https://www.cmegroup.com/markets/agriculture/grains/ethanol.html',
    historicalData: { '2025-03': 0.65, '2025-04': 0.65, '2025-05': 0.66, '2025-06': 0.66, '2025-07': 0.66, '2025-08': 0.67, '2025-09': 0.67, '2025-10': 0.67, '2025-11': 0.68, '2025-12': 0.68, '2026-01': 0.68, '2026-02': 0.68 },
    group: 'premium', relevantCategories: ['vodka', 'gin', 'rtd']
  },
  copper: {
    label: 'LME Copper', value: 9200, unit: '$/t', change: '+12%', source: 'London Metal Exchange', updated: '2026-02',
    description: 'LME copper (cash/Grade A). Input for distillery stills, piping, and heat exchangers. Craft distillers scaling operations face copper supply constraints.',
    sourceUrl: 'https://www.lme.com/en/metals/copper',
    historicalData: { '2025-03': 8194, '2025-04': 8304, '2025-05': 8451, '2025-06': 8598, '2025-07': 8745, '2025-08': 8891, '2025-09': 9038, '2025-10': 9109, '2025-11': 9154, '2025-12': 9176, '2026-01': 9188, '2026-02': 9200 },
    group: 'metals', relevantCategories: ['whisky', 'gin', 'cognac']
  },
}

export const CATEGORY_COGS = {
  tequila: { rawMaterial: 22, packaging: 28, labor: 12, energy: 8, logistics: 15, duty: 10, other: 5, keyInput: 'Blue Weber Agave', inputTrend: 'falling' },
  scotch_whisky: { rawMaterial: 18, packaging: 24, labor: 14, energy: 10, logistics: 12, duty: 15, other: 7, keyInput: 'Malting Barley', inputTrend: 'rising' },
  vodka: { rawMaterial: 16, packaging: 26, labor: 11, energy: 7, logistics: 14, duty: 18, other: 8, keyInput: 'Grain/Potatoes', inputTrend: 'stable' },
  gin: { rawMaterial: 19, packaging: 25, labor: 13, energy: 8, logistics: 13, duty: 16, other: 6, keyInput: 'Botanicals', inputTrend: 'rising' },
  rum: { rawMaterial: 20, packaging: 27, labor: 12, energy: 9, logistics: 14, duty: 12, other: 6, keyInput: 'Sugarcane', inputTrend: 'rising' },
  cognac: { rawMaterial: 21, packaging: 30, labor: 15, energy: 11, logistics: 11, duty: 8, other: 4, keyInput: 'Wine Grapes', inputTrend: 'rising' },
  champagne: { rawMaterial: 25, packaging: 28, labor: 16, energy: 9, logistics: 10, duty: 7, other: 5, keyInput: 'Champagne Grapes', inputTrend: 'rising' },
  wine: { rawMaterial: 18, packaging: 26, labor: 13, energy: 8, logistics: 15, duty: 12, other: 8, keyInput: 'Wine Grapes', inputTrend: 'stable' },
  beer: { rawMaterial: 14, packaging: 24, labor: 11, energy: 6, logistics: 16, duty: 22, other: 7, keyInput: 'Barley/Hops', inputTrend: 'rising' },
  nolo: { rawMaterial: 17, packaging: 29, labor: 10, energy: 7, logistics: 13, duty: 16, other: 8, keyInput: 'Natural Extract', inputTrend: 'stable' },
  rtd: { rawMaterial: 19, packaging: 31, labor: 9, energy: 8, logistics: 15, duty: 14, other: 4, keyInput: 'Spirits/Mixers', inputTrend: 'rising' },
}

export const GLASS_SUPPLIERS = [
  { name: 'O-I Glass', hq: 'US', marketShare: 21, keyClients: ['Diageo', 'Pernod Ricard'], leadTime: '12-16 weeks', minimumOrder: '100k units', capacity: 'Near full' },
  { name: 'Verallia', hq: 'France', marketShare: 14, keyClients: ['LVMH', 'R\u00e9my Cointreau'], leadTime: '10-14 weeks', minimumOrder: '75k units', capacity: 'Available' },
  { name: 'Ardagh Group', hq: 'Luxembourg', marketShare: 12, keyClients: ['Heineken', 'AB InBev'], leadTime: '14-18 weeks', minimumOrder: '100k units', capacity: 'Constrained' },
  { name: 'Saverglass', hq: 'France', marketShare: 5, keyClients: ['Luxury brands'], leadTime: '16-20 weeks', minimumOrder: '50k units', capacity: 'Premium boutique' },
  { name: 'Vetropack', hq: 'Switzerland', marketShare: 4, keyClients: ['Premium wine'], leadTime: '12-14 weeks', minimumOrder: '60k units', capacity: 'Available' },
]

export const CLOSURE_SUPPLIERS = [
  { name: 'Amorim (Cork)', hq: 'Portugal', product: 'Natural cork stoppers', marketShare: 38, leadTime: '8-10 weeks', quality: 'Variable \u2014 ~3% defect rate' },
  { name: 'Nomacorc (Synthetic)', hq: 'France', product: 'Synthetic screw closures', marketShare: 22, leadTime: '6-8 weeks', quality: 'Consistent \u2014 <1% defect' },
  { name: 'Constelation (Screwcap)', hq: 'Australia', product: 'Aluminium screwcaps', marketShare: 18, leadTime: '8-10 weeks', quality: 'Premium for fine wine' },
  { name: 'Hemet (Crown Caps)', hq: 'Czech Republic', product: 'Beer crown caps', marketShare: 12, leadTime: '6-8 weeks', quality: 'Commodity standard' },
]

export const LABEL_SUPPLIERS = [
  { name: 'WS Packaging', hq: 'US', technology: 'Digital + flexo', leadTime: '3-4 weeks', minimumRun: '5k', specialty: 'Fast-turnaround short runs' },
  { name: 'Constantia Flexibles', hq: 'Germany', technology: 'Gravure + digital', leadTime: '4-6 weeks', minimumRun: '10k', specialty: 'Premium sustainability labels' },
  { name: 'Huhtamaki', hq: 'Finland', technology: 'Full range', leadTime: '3-5 weeks', minimumRun: '8k', specialty: 'Biodegradable/compostable' },
]

export const DISRUPTION_SCENARIOS = [
  { scenario: 'Suez Canal Closure (extended)', probability: 'High', impactWeeks: '4-6', affectedCategories: 'Imported spirits, European wine', cogsImpact: '+8-12%', mitigation: 'Pre-ship inventory, dual-source from US/Australia, air freight premium', precedent: '2021 Ever Given blocked Suez for 6 days, cost global trade ~$15B' },
  { scenario: 'US-EU Tariff Escalation (spirits)', probability: 'High', impactWeeks: '0 (immediate)', affectedCategories: 'Scotch, Cognac, Irish whiskey', cogsImpact: '+15-25% on duty', mitigation: 'Price increases, volume to Asia/APAC, M&A of EU producers', precedent: '2018 Bourbon tariff spike saw 3yr lag before price recovery' },
  { scenario: 'Chinese Glass Factory Shutdowns', probability: 'Low', impactWeeks: '8-12', affectedCategories: 'Beer, RTD, value wines', cogsImpact: '+6-10%', mitigation: 'Shift to European suppliers, quality upgrades, packaging innovation', precedent: '2020 COVID factory closures caused 6mo delays globally' },
  { scenario: 'French Harvest Failure (frost/hail)', probability: 'Medium', impactWeeks: 'Annual', affectedCategories: 'Champagne, Cognac, Bordeaux wine', cogsImpact: '+20-40% on base wine input', mitigation: 'Multi-year contracts, stock reserves, blending strategies', precedent: '2021 spring frost reduced Champagne supply by 30%' },
  { scenario: 'Mexican Agave Disease Outbreak', probability: 'Low', impactWeeks: '3-4', affectedCategories: 'Tequila, Mezcal', cogsImpact: '+50%+ on agave', mitigation: 'Inventory buffers, hybrid agave cultivation, blue agave alternatives', precedent: 'ToBRFV (tomato virus) affected crops 2016-2020' },
  { scenario: 'UK Duty Rate Increase (post-Brexit)', probability: 'High', impactWeeks: '0', affectedCategories: 'All alcohol categories UK-bound', cogsImpact: '+5-8%', mitigation: 'UK warehouse stock, duty deferral schemes, price increases', precedent: 'VAT increase (2010) took 12mo to fully pass through retail' },
]

export const CURRENCY_PAIRS = [
  { pair: 'GBP/EUR', rate: 1.18, change12m: -2.3, impact: 'Weaker pound increases cost of French/Italian imports by ~2%', affectedCategories: 'Champagne, Cognac, Italian wine, European gin botanicals' },
  { pair: 'GBP/USD', rate: 1.26, change12m: -4.1, impact: 'Weaker pound increases US imports (bourbon, American vodka) by ~4%', affectedCategories: 'US whiskey, imported beer, North American suppliers' },
  { pair: 'USD/MXN', rate: 17.2, change12m: +8.5, impact: 'Stronger USD lowers Mexican agave & tequila production costs', affectedCategories: 'Tequila, Mezcal (benefit: lower COGS for exporters)' },
  { pair: 'EUR/USD', rate: 1.07, change12m: -1.8, impact: 'Weaker euro benefits EU exporters to US, increases EU input costs', affectedCategories: 'EU-made spirits targeting USD market' },
]

export const MARGIN_ALERTS = [
  { brand: 'Corona Extra', company: 'Constellation Brands', severity: 'high', message: 'Glass +2.1% & freight +110% vs flat retail \u2014 margin squeeze imminent', category: 'Beer' },
  { brand: 'Hennessy VS', company: 'LVMH', severity: 'medium', message: 'Champagne grapes +9% and French oak +1% while US retail held at $34.99', category: 'Cognac' },
  { brand: 'Johnnie Walker Black', company: 'Diageo', severity: 'medium', message: 'Barley +12% and energy +15% eroding blended scotch margins', category: 'Blended Scotch' },
  { brand: 'Bacardi Superior', company: 'Bacardi', severity: 'low', message: 'Sugarcane +8% partially offset by Caribbean shipping normalisation', category: 'Rum' },
  { brand: 'Tanqueray', company: 'Diageo', severity: 'high', message: 'Glass +2.1% + botanicals (juniper/coriander) availability constraining UK gin', category: 'Gin' },
  { brand: 'Mo\u00ebt & Chandon', company: 'LVMH', severity: 'medium', message: 'Champagne grapes +9%, cardboard +4%, but brand power sustains margin', category: 'Champagne' },
  { brand: 'Stella Artois', company: 'AB InBev', severity: 'medium', message: 'Barley +12%, aluminum +8% (cans 30% of revenue), GBP weakness compounds', category: 'Beer' },
  { brand: 'Grey Goose', company: 'Bacardi', severity: 'low', message: 'Grain prices flat, premium positioning absorbs cost pressure, logistics +5%', category: 'Vodka' },
  { brand: 'Jack Daniel\u2019s', company: 'Brown-Forman', severity: 'medium', message: 'Corn +6%, barrels +1%, US tariff risk 15-25% on EU-bound supply', category: 'Bourbon' },
  { brand: 'Absolut Vodka', company: 'Pernod Ricard', severity: 'low', message: 'Swedish grain stable, glass normal, container freight up 110% impacts Asia export', category: 'Vodka' },
  { brand: 'Veuve Clicquot', company: 'LVMH', severity: 'medium', message: 'Grapes +9%, glass +2.1%, but prestige brand can raise prices; 2026 harvest forecast grim', category: 'Champagne' },
  { brand: 'Guinness', company: 'Diageo', severity: 'high', message: 'Barley +12% (65% of stout cost), labor rising in Ireland, glass constraint in EU', category: 'Beer' },
]

export const CLIMATE_RISKS = [
  { region: 'Champagne, France', commodity: 'Pinot Noir grapes', impact: '-16% production vs 5yr avg (2025 frost)', severity: 'critical', detail: 'Spring frost Feb 2025 damaged buds across ~30% of region' },
  { region: 'California', commodity: 'Cabernet/Pinot grapes', impact: '-23% yield due to drought, high temps', severity: 'critical', detail: 'Extreme 2024-2025 drought and heat stress on Napa/Sonoma vines' },
  { region: 'Scotland', commodity: 'Malting barley', impact: '-40% in some regions (2025 harvest)', severity: 'high', detail: 'Poor weather, late planted, late harvest, low quality grain' },
  { region: 'Caribbean', commodity: 'Sugarcane', impact: 'Erratic rainfall disrupting harvest cycles', severity: 'medium', detail: 'Climate volatility (dry spells then floods) reducing yields 5-15%' },
  { region: 'Mexico (Jalisco)', commodity: 'Blue Weber Agave', impact: 'Oversupply cycle \u2014 prices falling, but disease monitoring needed', severity: 'low', detail: 'Mature plantings from 2017-2019 flood market; phytophthora risk modest' },
  { region: 'Bordeaux, France', commodity: 'Merlot, Cabernet', impact: '-8% yield, fungal pressure (mildew)', severity: 'medium', detail: '2025 wet spring raised mildew; increased sulfur/copper treatments cost' },
  { region: 'South Africa', commodity: 'Wine grapes', impact: 'Water stress in Stellenbosch/Paarl regions', severity: 'medium', detail: 'Cape Town Day Zero risk; irrigation restrictions possible by 2027' },
  { region: 'Australia', commodity: 'Barossa/Margaret River grapes', impact: 'Heat waves pushing ripeness, alcohol % rising', severity: 'low', detail: 'Warmer seasons shift vintage profiles; some vintages harder to sell' },
  { region: 'Italy (Piedmont)', commodity: 'Nebbiolo grapes', impact: 'Erratic flowering, lower density', severity: 'medium', detail: '2024-2025 cool/wet spring pushed flowering late, stressed set' },
  { region: 'Kenya/Uganda', commodity: 'Barley (emerging source)', impact: 'Rainfall variability, new pest pressures', severity: 'low', detail: 'Small scale; future risk if Europe supply contracts' },
  { region: 'Brazil', commodity: 'Sugarcane', impact: 'Drought stress on plantations reducing yields', severity: 'medium', detail: '2024-2025 drought in S\u00e3o Paulo affected ~10M tonnes output' },
  { region: 'Spain', commodity: 'Tempranillo (Rioja)', impact: 'Heat stress, early ripening, lower acidity', severity: 'low', detail: 'Warmer vintages change winemaking protocols' },
]

// Pipeline stages for visual summary
export const PIPELINE_STAGES = [
  { id: 'sourcing', label: 'Raw Material Sourcing', icon: 'Droplets', summary: 'Agricultural inputs, grapes, grains, agave', kpi: '7.2% avg cost rise', status: 'warning', detail: 'Barley +12%, champagne grapes +9%, agave -18% (oversupply)' },
  { id: 'production', label: 'Production & Distilling', icon: 'Factory', summary: 'Energy, labour, equipment, barrels', kpi: '+15% energy costs', status: 'alert', detail: 'EU TTF gas +15%, EU ETS carbon +18%, copper +12% (stills)' },
  { id: 'packaging', label: 'Packaging', icon: 'Package', summary: 'Glass, closures, labels, cases', kpi: '+2.1% glass PPI', status: 'moderate', detail: 'Glass +2.1%, aluminum +8%, cardboard +4%' },
  { id: 'logistics', label: 'Distribution & Logistics', icon: 'Truck', summary: 'Freight, warehousing, last mile', kpi: '+110% container rates', status: 'critical', detail: 'Drewry WCI +110%, Baltic Dry +34%, Red Sea disruptions' },
]

export const GROUP_LABELS = {
  packaging: 'Packaging & Board',
  freight: 'Freight & Shipping',
  agricultural: 'Agricultural Inputs',
  energy: 'Energy & Carbon',
  premium: 'Premium Inputs',
  metals: 'Metals',
}

// Category COGS analysis text
export const CATEGORY_ANALYSIS = {
  tequila: 'Agave prices falling (-18% YoY) \u2014 margin expansion. Packaging remains elevated (+2.1% glass, +4% cardboard).',
  scotch_whisky: 'Barley malting costs rising (+12% YoY) \u2014 watch energy (EU ETS +18%). Oak for whiskeys stable, duties high (15%).',
  rum: 'Sugarcane +8%, molasses availability tight. Caribbean logistics normalising. Labor rising in Barbados/Jamaica (2-3% annually).',
  gin: 'Botanicals (juniper, coriander, cardamom) tightening. Glass +2.1%, but premium positioning allows price pass-through. Craft gin struggling.',
  cognac: 'Premium grapes +9% YoY, French oak +1%. EU ETS carbon impacts glass furnaces. Multi-year contracts cushion short-term swings.',
  champagne: 'Premium grapes +9% YoY, French oak +1%. EU ETS carbon impacts glass furnaces. Multi-year contracts cushion short-term swings.',
  beer: 'Barley +12% (65% of stout cost), aluminum +8% (cans), glass +2.1%. Margin squeeze acute for large breweries. Craft brewers better positioned.',
  wine: 'Grape supply fragmented by region. Bordeaux stable. Packaging 26% of costs. Currency shifts (GBP/EUR, USD/EUR) impact EU producers.',
  vodka: 'Grain prices relatively flat. Glass +2.1%. Premium brands absorb cost pressure; value segment squeezed.',
  nolo: 'Natural extracts stable. Packaging complexity high (29% of COGS). Labor-light (automation). Growth category absorbs cost.',
  rtd: 'Aluminum cans critical cost driver (+8% LME). Labor-light (automation). Mixers (citrus/flavors) commodity stable. High packaging complexity.',
}

// Helper functions
export function parseChange(change) {
  const num = parseFloat(change.replace('%', '').replace('+', ''))
  return isNaN(num) ? 0 : num
}

export function getAlertLevel(changeNum) {
  const abs = Math.abs(changeNum)
  if (abs >= 15) return 'critical'
  if (abs >= 8) return 'high'
  if (abs >= 4) return 'medium'
  return 'low'
}

export const ALERT_COLORS = {
  critical: { bg: 'bg-red-500', text: 'text-white', dot: 'bg-red-500', ring: 'ring-red-200' },
  high: { bg: 'bg-orange-500', text: 'text-white', dot: 'bg-orange-500', ring: 'ring-orange-200' },
  medium: { bg: 'bg-amber-400', text: 'text-amber-900', dot: 'bg-amber-400', ring: 'ring-amber-200' },
  low: { bg: 'bg-green-400', text: 'text-green-900', dot: 'bg-green-500', ring: 'ring-green-200' },
}

// ── Data Methodology ──
export const DATA_METHODOLOGY = {
  overview: 'Market size estimates synthesized from IWSR Global Spirits Database, Euromonitor Passport Alcoholic Drinks, and DISCUS public disclosures. Growth rates represent year-over-year value change in USD at constant exchange rates unless otherwise stated.',
  pricing: 'Pricing data collected from retailer websites (Tesco, Sainsbury\'s, Waitrose, Master of Malt, Total Wine, Drizly, El Corte Ingl\u00e9s) during April 2026. Prices reflect standard retail, not promotional pricing, unless flagged.',
  sources: [
    { name: 'IWSR Global Spirits Database 2025', description: 'Proprietary database covering 160+ markets with volume and value data by category, price band, and channel.', url: 'https://www.theiwsr.com/global-spirits-report' },
    { name: 'Euromonitor Passport \u2014 Alcoholic Drinks', description: 'Market sizing, forecasts, and competitive landscape data for spirits, wine, and beer across 100+ countries.', url: 'https://www.euromonitor.com/alcoholic-drinks' },
    { name: 'DISCUS Annual Economic Briefing', description: 'US spirits industry data: shipments, revenue, state-level trends, and category performance from the Distilled Spirits Council.', url: 'https://www.discus.org/economics/research' },
    { name: 'NielsenIQ Off-Trade Panel', description: 'Retail scanner data from off-premise channels (supermarkets, liquor stores) covering sales volume, value, and distribution metrics.', url: 'https://www.nielseniq.com/global/en/insights/' },
    { name: 'The Spirits Business / Drinks International', description: 'Trade publication market intelligence, brand rankings, and industry trend analysis.', url: 'https://www.thespiritsbusiness.com/category/market-data/' },
    { name: 'OIV (International Organisation of Vine and Wine)', description: 'Global wine production, consumption, and trade statistics. Primary source for wine category data.', url: 'https://www.oiv.int/what-we-do/global-report' },
  ],
  lastUpdated: 'April 2026',
  updateFrequency: 'Quarterly (Jan, Apr, Jul, Oct)',
  disclaimer: 'All market data represents best estimates compiled from multiple public and proprietary sources. Figures may differ from individual source reports due to methodology differences in market definition, exchange rates, and reporting periods.',
}

