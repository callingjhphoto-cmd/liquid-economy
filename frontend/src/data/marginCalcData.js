/**
 * Margin Calculator data — extracted from MarginCalculator.jsx
 * COGS defaults per category (GBP per 700ml bottle), launch readiness scores,
 * bottle sizes, channels, and industry benchmark data.
 */

// ── COGS defaults per category (GBP per 700ml bottle) ──
export const CATEGORY_COGS = {
  tequila: {
    label: 'Tequila & Mezcal',
    rawMaterial: { name: 'Agave', base: 2.40, unit: '\u00a3' },
    glass: 1.80, closure: 0.60, freight: 3.20, duty: 8.05,
    production: 2.10, overheads: 2.00,
    scenarios: {
      freightUp: { label: 'Freight rises +20%', field: 'freight', multiplier: 1.2 },
      lightweight: { label: 'Switch to lightweight glass', field: 'glass', saving: 0.35 },
      rawDrop: { label: 'Agave falls to 6 MXN/kg', field: 'rawMaterial', newValue: 1.60 },
      altClosure: { label: 'Switch to synthetic closure', field: 'closure', newValue: 0.35 },
    },
    avgRRP: { onTrade: 42, offTrade: 35, eCommerce: 33, travelRetail: 38 },
  },
  vodka: {
    label: 'Vodka',
    rawMaterial: { name: 'Grain/Potato', base: 0.80, unit: '\u00a3' },
    glass: 1.60, closure: 0.50, freight: 2.80, duty: 8.05,
    production: 1.40, overheads: 1.80,
    scenarios: {
      freightUp: { label: 'Freight rises +20%', field: 'freight', multiplier: 1.2 },
      lightweight: { label: 'Switch to lightweight glass', field: 'glass', saving: 0.30 },
      rawDrop: { label: 'Grain prices fall 15%', field: 'rawMaterial', newValue: 0.68 },
      altClosure: { label: 'Premium closure upgrade', field: 'closure', newValue: 0.85 },
    },
    avgRRP: { onTrade: 38, offTrade: 28, eCommerce: 26, travelRetail: 32 },
  },
  gin: {
    label: 'Gin',
    rawMaterial: { name: 'Botanicals & GNS', base: 1.60, unit: '\u00a3' },
    glass: 2.10, closure: 0.65, freight: 2.60, duty: 8.05,
    production: 1.80, overheads: 1.90,
    scenarios: {
      freightUp: { label: 'Freight rises +20%', field: 'freight', multiplier: 1.2 },
      lightweight: { label: 'Switch to lightweight glass', field: 'glass', saving: 0.40 },
      rawDrop: { label: 'Juniper prices stabilise', field: 'rawMaterial', newValue: 1.35 },
      premiumBottle: { label: 'Upgrade to premium bottle', field: 'glass', newValue: 3.20 },
    },
    avgRRP: { onTrade: 40, offTrade: 32, eCommerce: 30, travelRetail: 35 },
  },
  whisky: {
    label: 'Whisky',
    rawMaterial: { name: 'Malt/Grain + Ageing', base: 4.50, unit: '\u00a3' },
    glass: 2.20, closure: 0.80, freight: 3.00, duty: 8.05,
    production: 2.50, overheads: 2.20,
    scenarios: {
      freightUp: { label: 'Freight rises +20%', field: 'freight', multiplier: 1.2 },
      lightweight: { label: 'Switch to lightweight glass', field: 'glass', saving: 0.35 },
      oakSwitch: { label: 'American oak vs French oak', field: 'rawMaterial', saving: 0.80 },
      longerAge: { label: 'Add 3yr extra ageing', field: 'rawMaterial', newValue: 6.20 },
    },
    avgRRP: { onTrade: 48, offTrade: 38, eCommerce: 36, travelRetail: 42 },
  },
  rum: {
    label: 'Rum',
    rawMaterial: { name: 'Molasses/Cane', base: 1.20, unit: '\u00a3' },
    glass: 1.70, closure: 0.55, freight: 3.40, duty: 8.05,
    production: 1.90, overheads: 1.80,
    scenarios: {
      freightUp: { label: 'Freight rises +20%', field: 'freight', multiplier: 1.2 },
      lightweight: { label: 'Switch to lightweight glass', field: 'glass', saving: 0.30 },
      rawDrop: { label: 'Sugar prices fall 10%', field: 'rawMaterial', newValue: 1.08 },
      premiumAge: { label: 'Move to 12yr aged', field: 'rawMaterial', newValue: 2.80 },
    },
    avgRRP: { onTrade: 40, offTrade: 30, eCommerce: 28, travelRetail: 34 },
  },
  cognac: {
    label: 'Cognac & Brandy',
    rawMaterial: { name: 'Ugni Blanc + Ageing', base: 6.50, unit: '\u00a3' },
    glass: 2.80, closure: 1.00, freight: 2.40, duty: 8.05,
    production: 3.00, overheads: 2.50,
    scenarios: {
      freightUp: { label: 'Freight rises +20%', field: 'freight', multiplier: 1.2 },
      lightweight: { label: 'Switch to lightweight glass', field: 'glass', saving: 0.45 },
      grapeYield: { label: 'Good harvest reduces grape cost', field: 'rawMaterial', newValue: 5.50 },
      premiumPackaging: { label: 'Luxury gift box', field: 'overheads', newValue: 4.00 },
    },
    avgRRP: { onTrade: 55, offTrade: 42, eCommerce: 40, travelRetail: 48 },
  },
  champagne: {
    label: 'Champagne & Sparkling',
    rawMaterial: { name: 'Grapes + M\u00e9thode', base: 5.80, unit: '\u00a3' },
    glass: 2.50, closure: 1.20, freight: 2.80, duty: 3.81,
    production: 2.80, overheads: 2.40,
    scenarios: {
      freightUp: { label: 'Freight rises +20%', field: 'freight', multiplier: 1.2 },
      crownCap: { label: 'Crown cap vs muselet', field: 'closure', newValue: 0.60 },
      proseccoSwitch: { label: 'Charmat method (Prosecco)', field: 'rawMaterial', newValue: 2.20 },
      rawDrop: { label: 'Grape surplus year', field: 'rawMaterial', newValue: 4.80 },
    },
    avgRRP: { onTrade: 52, offTrade: 38, eCommerce: 35, travelRetail: 42 },
  },
  wine: {
    label: 'Wine (Still)',
    rawMaterial: { name: 'Grapes', base: 2.00, unit: '\u00a3' },
    glass: 1.40, closure: 0.40, freight: 2.20, duty: 2.67,
    production: 1.50, overheads: 1.60,
    scenarios: {
      freightUp: { label: 'Freight rises +20%', field: 'freight', multiplier: 1.2 },
      screwcap: { label: 'Screwcap vs cork', field: 'closure', newValue: 0.20 },
      bagInBox: { label: 'Bag-in-box format', field: 'glass', newValue: 0.60 },
      premiumGrape: { label: 'Single vineyard grapes', field: 'rawMaterial', newValue: 4.50 },
    },
    avgRRP: { onTrade: 32, offTrade: 12, eCommerce: 10, travelRetail: 15 },
  },
  beer: {
    label: 'Beer & Craft',
    rawMaterial: { name: 'Malt/Hops/Yeast', base: 0.40, unit: '\u00a3' },
    glass: 0.35, closure: 0.10, freight: 1.20, duty: 0.54,
    production: 0.60, overheads: 0.50,
    scenarios: {
      freightUp: { label: 'Freight rises +20%', field: 'freight', multiplier: 1.2 },
      canSwitch: { label: 'Switch to cans', field: 'glass', newValue: 0.20 },
      hopsUp: { label: 'Hop shortage (+30%)', field: 'rawMaterial', newValue: 0.52 },
      localSource: { label: 'Local sourcing saves freight', field: 'freight', newValue: 0.60 },
    },
    avgRRP: { onTrade: 6.50, offTrade: 3.50, eCommerce: 3.20, travelRetail: 4.50 },
  },
  nolo: {
    label: 'No/Low Alcohol',
    rawMaterial: { name: 'Base + Dealcoholisation', base: 1.80, unit: '\u00a3' },
    glass: 1.50, closure: 0.50, freight: 2.40, duty: 0.00,
    production: 2.20, overheads: 1.80,
    scenarios: {
      freightUp: { label: 'Freight rises +20%', field: 'freight', multiplier: 1.2 },
      lightweight: { label: 'Switch to lightweight glass', field: 'glass', saving: 0.30 },
      dutyFree: { label: 'Duty advantage vs spirits', field: 'duty', newValue: 0.00 },
      techImprove: { label: 'New dealc tech (-15%)', field: 'rawMaterial', newValue: 1.53 },
    },
    avgRRP: { onTrade: 30, offTrade: 22, eCommerce: 20, travelRetail: 25 },
  },
  rtd: {
    label: 'RTD / Ready-to-Drink',
    rawMaterial: { name: 'Spirit base + mixer', base: 0.60, unit: '\u00a3' },
    glass: 0.25, closure: 0.08, freight: 1.80, duty: 2.01,
    production: 0.80, overheads: 0.70,
    scenarios: {
      freightUp: { label: 'Freight rises +20%', field: 'freight', multiplier: 1.2 },
      canSwitch: { label: 'Slim can format', field: 'glass', newValue: 0.18 },
      baseSpirit: { label: 'Switch to malt base', field: 'rawMaterial', newValue: 0.35 },
      volumeScale: { label: 'Scale to 10K+ units', field: 'overheads', newValue: 0.45 },
    },
    avgRRP: { onTrade: 8, offTrade: 4, eCommerce: 3.50, travelRetail: 5 },
  },
}

// ── Launch Readiness scoring per category ──
export const LAUNCH_READINESS = {
  tequila: { categoryGrowth: 88, cogsTrend: 72, competitiveDensity: 55, geographicOpportunity: 82, posAvailability: 70, risks: ['High brand saturation in US', 'Agave price volatility cycles', 'DOP regulation complexity'], opportunities: ['European market underpenetrated', 'Mezcal sub-category booming', 'Premiumization headroom above $50'] },
  vodka: { categoryGrowth: 35, cogsTrend: 80, competitiveDensity: 30, geographicOpportunity: 65, posAvailability: 85, risks: ['Declining volume globally', 'Extreme competitive pressure', 'Low brand loyalty in category'], opportunities: ['Premium/craft segment growing', 'Flavored vodka innovation', 'Eastern European domestic demand'] },
  gin: { categoryGrowth: 52, cogsTrend: 75, competitiveDensity: 40, geographicOpportunity: 68, posAvailability: 80, risks: ['Post-boom growth plateau', 'Market oversaturation in UK', 'Consumer fatigue with botanicals'], opportunities: ['Asia-Pacific growth untapped', 'RTD gin cocktails', 'Non-alcoholic gin segment'] },
  whisky: { categoryGrowth: 75, cogsTrend: 55, competitiveDensity: 45, geographicOpportunity: 80, posAvailability: 65, risks: ['Long ageing capital lock-up', 'Supply constraints (Japanese)', 'High barrier to entry'], opportunities: ['Indian whisky global expansion', 'American single malt recognition', 'Collector/auction market growth'] },
  rum: { categoryGrowth: 72, cogsTrend: 78, competitiveDensity: 60, geographicOpportunity: 75, posAvailability: 72, risks: ['Perception as cheap mixer', 'Complex regional regulations', 'Sugar price volatility'], opportunities: ['Premium dark rum renaissance', 'Rhumiculture trend (terroir)', 'African & Asian markets opening'] },
  cognac: { categoryGrowth: 40, cogsTrend: 50, competitiveDensity: 65, geographicOpportunity: 58, posAvailability: 55, risks: ['China tariff headwinds', 'Long production timeline', 'Dominated by 4 major houses'], opportunities: ['US hip-hop culture alignment', 'Travel retail premiumization', 'Brandy de Jerez alternative'] },
  champagne: { categoryGrowth: 62, cogsTrend: 48, competitiveDensity: 50, geographicOpportunity: 70, posAvailability: 60, risks: ['Appellation price floor', 'Prosecco/Cava competition', 'Climate change yield risk'], opportunities: ['Direct-to-consumer models', 'Grower Champagne trend', 'English sparkling credibility'] },
  wine: { categoryGrowth: 30, cogsTrend: 82, competitiveDensity: 25, geographicOpportunity: 60, posAvailability: 90, risks: ['Structural volume decline', 'Gen Z lower consumption', 'Oversupply in bulk market'], opportunities: ['Natural/organic wine premiums', 'Wine-in-can innovation', 'Chinese domestic market growth'] },
  beer: { categoryGrowth: 55, cogsTrend: 70, competitiveDensity: 35, geographicOpportunity: 72, posAvailability: 88, risks: ['Craft consolidation by macro', 'Tap-handle competition', 'Commodity cost sensitivity'], opportunities: ['Hard seltzer crossover', 'Non-alc beer boom', 'Microbrewery tourism/taproom'] },
  nolo: { categoryGrowth: 95, cogsTrend: 65, competitiveDensity: 70, geographicOpportunity: 85, posAvailability: 60, risks: ['Rapidly evolving consumer taste', 'No established distribution', 'Technology cost barriers'], opportunities: ['Fastest-growing segment globally', 'Zero duty advantage', 'Health & wellness mega-trend'] },
  rtd: { categoryGrowth: 90, cogsTrend: 72, competitiveDensity: 50, geographicOpportunity: 80, posAvailability: 75, risks: ['Regulatory classification varies', 'Sugar tax exposure', 'Flavor fatigue risk'], opportunities: ['Convenience mega-trend', 'Spirit-brand RTD premiumization', 'Emerging market adoption'] },
}

export const BOTTLE_SIZES = [
  { label: '700ml', factor: 1.0 },
  { label: '750ml', factor: 1.07 },
  { label: '1L', factor: 1.35 },
  { label: '500ml', factor: 0.72 },
  { label: '330ml (can)', factor: 0.48 },
]

export const CHANNELS = ['onTrade', 'offTrade', 'eCommerce', 'travelRetail']
export const CHANNEL_LABELS = { onTrade: 'On-Trade', offTrade: 'Off-Trade', eCommerce: 'E-Commerce', travelRetail: 'Travel Retail' }

// ── Industry benchmark data for Tier 3 ──
export const INDUSTRY_BENCHMARKS = {
  tequila: { avgMargin: 42.5, highEndMargin: 55, midTierMargin: 38, valueMargin: 28, distributorCut: '25-35%', retailerCut: '30-45%', source: 'IWSR / Drinks International 2025' },
  vodka: { avgMargin: 35.2, highEndMargin: 48, midTierMargin: 32, valueMargin: 22, distributorCut: '20-30%', retailerCut: '28-40%', source: 'IWSR / Nielsen 2025' },
  gin: { avgMargin: 40.8, highEndMargin: 52, midTierMargin: 36, valueMargin: 26, distributorCut: '22-32%', retailerCut: '30-42%', source: 'IWSR / CGA 2025' },
  whisky: { avgMargin: 38.5, highEndMargin: 58, midTierMargin: 34, valueMargin: 24, distributorCut: '25-35%', retailerCut: '30-45%', source: 'IWSR / Scotch Whisky Association 2025' },
  rum: { avgMargin: 39.0, highEndMargin: 50, midTierMargin: 35, valueMargin: 25, distributorCut: '22-30%', retailerCut: '28-40%', source: 'IWSR / West India Rum & Spirits 2025' },
  cognac: { avgMargin: 45.2, highEndMargin: 62, midTierMargin: 40, valueMargin: 30, distributorCut: '28-38%', retailerCut: '32-48%', source: 'BNIC / IWSR 2025' },
  champagne: { avgMargin: 36.5, highEndMargin: 55, midTierMargin: 32, valueMargin: 20, distributorCut: '25-35%', retailerCut: '30-45%', source: 'CIVC / IWSR 2025' },
  wine: { avgMargin: 28.5, highEndMargin: 45, midTierMargin: 25, valueMargin: 15, distributorCut: '20-28%', retailerCut: '25-38%', source: 'OIV / Wine Intelligence 2025' },
  beer: { avgMargin: 32.0, highEndMargin: 42, midTierMargin: 28, valueMargin: 18, distributorCut: '18-25%', retailerCut: '22-35%', source: 'BBPA / IWSR 2025' },
  nolo: { avgMargin: 44.0, highEndMargin: 55, midTierMargin: 40, valueMargin: 32, distributorCut: '20-30%', retailerCut: '28-40%', source: 'IWSR No/Low Report 2025' },
  rtd: { avgMargin: 38.5, highEndMargin: 48, midTierMargin: 35, valueMargin: 25, distributorCut: '18-25%', retailerCut: '25-35%', source: 'IWSR / Distill Ventures 2025' },
}

// ── Cost component labels for tables ──
export const COST_ENTRIES = [
  { key: 'rawMaterial', label: 'Raw Material', color: '#1e3a5f' },
  { key: 'glass', label: 'Glass/Packaging', color: '#3b82f6' },
  { key: 'closure', label: 'Closure & Label', color: '#8b5cf6' },
  { key: 'freight', label: 'Freight (to UK)', color: '#f59e0b' },
  { key: 'duty', label: 'Duty & Tax', color: '#ef4444' },
  { key: 'production', label: 'Production & Fill', color: '#22c55e' },
  { key: 'overheads', label: 'Overheads', color: '#6b7280' },
]
