import React, { useState, useMemo } from 'react'
import {
  TrendingUp, TrendingDown, Activity, AlertTriangle, Calendar,
  Globe, BarChart3, Zap, ArrowUpRight, ArrowDownRight, ExternalLink,
  Clock, Target, DollarSign, Percent, ChevronDown, ChevronUp,
  ArrowUpDown, Filter, Package, Building2, Gem, ChevronRight
} from 'lucide-react'
import {
  AreaChart, Area, BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid
} from 'recharts'

// ── KPI Sparkline Data (3-5 points for micro-charts behind values) ──
const KPI_TRENDS = {
  market:    [{ v: 580 }, { v: 598 }, { v: 612 }, { v: 623 }, { v: 635 }],
  pe:        [{ v: 24.1 }, { v: 23.8 }, { v: 23.2 }, { v: 22.9 }, { v: 22.4 }],
  premium:   [{ v: 4.2 }, { v: 4.8 }, { v: 5.6 }, { v: 6.1 }, { v: 6.8 }],
  nolo:      [{ v: 5.1 }, { v: 5.8 }, { v: 6.4 }, { v: 7.1 }, { v: 7.5 }],
  ecomm:     [{ v: 8.5 }, { v: 10.1 }, { v: 11.8 }, { v: 12.9 }, { v: 14.2 }],
  cogs:      [{ v: 48 }, { v: 52 }, { v: 55 }, { v: 58 }, { v: 62 }],
}

// ── Market KPIs ──
const MARKET_KPIS = [
  { label: 'Global Spirits Market', value: '$635B', change: '+3.1%', dir: 'up', sub: 'IWSR 2025 estimate', icon: Globe, sparkKey: 'market' },
  { label: 'Sector Avg P/E', value: '22.4x', change: '-0.8x', dir: 'down', sub: 'Across 14 public companies', icon: BarChart3, sparkKey: 'pe' },
  { label: 'Premium Segment Growth', value: '+6.8%', change: '+1.2pp', dir: 'up', sub: 'Super-premium & above', icon: TrendingUp, sparkKey: 'premium' },
  { label: 'No/Low Alcohol Growth', value: '+7.5%', change: '+0.3pp', dir: 'up', sub: 'Fastest macro trend', icon: Zap, sparkKey: 'nolo' },
  { label: 'E-Commerce Penetration', value: '14.2%', change: '+2.1pp', dir: 'up', sub: 'Of total off-trade value', icon: Target, sparkKey: 'ecomm' },
  { label: 'COGS Pressure Index', value: '62/100', change: '+4pts', dir: 'up', sub: 'Freight & glass driving', icon: DollarSign, sparkKey: 'cogs' },
]

// ── Market Signals ──
const MARKET_SIGNALS = [
  { type: 'M&A', urgency: 'high', headline: 'Diageo announces \u00a33B share buyback program', date: 'Feb 20, 2026', source: 'FT', impact: 'Signals confidence in cash generation; may pressure peers to return capital' },
  { type: 'Regulation', urgency: 'high', headline: 'EU alcohol labeling regulation enters enforcement phase', date: 'Feb 18, 2026', source: 'European Commission', impact: 'Mandatory calorie/ingredient labels from June 2026; compliance costs for importers' },
  { type: 'Supply', urgency: 'medium', headline: 'Mexican agave surplus reaches 5-year high', date: 'Feb 15, 2026', source: 'CRT', impact: 'Tequila input costs may decline 15-20%; benefits Becle, Cuervo brands' },
  { type: 'Trade', urgency: 'high', headline: 'China maintains 30% import duty on EU spirits', date: 'Feb 12, 2026', source: 'Reuters', impact: 'Cognac exports to China remain depressed; R\u00e9my Cointreau most exposed' },
  { type: 'M&A', urgency: 'medium', headline: 'Craft distillery consolidation accelerates \u2014 47 acquisitions in Q4', date: 'Feb 10, 2026', source: 'Spirits Business', impact: 'Mid-tier brands being absorbed; entry multiples averaging 8-12x EBITDA' },
  { type: 'Category', urgency: 'low', headline: 'RTD category growth decelerates to +8.2% (was +15% in 2023)', date: 'Feb 8, 2026', source: 'IWSR', impact: 'Market maturing; winners emerging (BuzzBallz, High Noon, Cutwater)' },
]

// ── Upcoming Events ──
const UPCOMING_EVENTS = [
  { date: 'Feb 27', company: 'Diageo', event: 'H1 FY2026 Results', type: 'Earnings' },
  { date: 'Mar 5', company: 'Pernod Ricard', event: 'H1 FY2026 Results', type: 'Earnings' },
  { date: 'Mar 12', company: 'Brown-Forman', event: 'Q3 FY2026 Results', type: 'Earnings' },
  { date: 'Mar 15-17', company: 'Industry', event: 'ProWein D\u00fcsseldorf', type: 'Trade Show' },
  { date: 'Mar 20', company: 'R\u00e9my Cointreau', event: 'FY2026 Annual Results', type: 'Earnings' },
  { date: 'Apr 2', company: 'Constellation Brands', event: 'Q4 FY2026 Results', type: 'Earnings' },
  { date: 'Apr 8', company: 'LVMH', event: 'Q1 2026 Revenue', type: 'Earnings' },
  { date: 'Apr 15-17', company: 'Industry', event: 'Vinexpo Paris', type: 'Trade Show' },
]

// ── Category Snapshot with mini-trend data ──
const CATEGORY_SNAPSHOT = [
  { name: 'Tequila & Mezcal', size: '$4.8B', growth: '+7.8%', dir: 'up', signal: 'Agave surplus may ease costs', trend: [{ v: 3.2 }, { v: 3.6 }, { v: 4.0 }, { v: 4.4 }, { v: 4.8 }], channels: { onTrade: 35, offTrade: 42, eComm: 12, travelRetail: 11 } },
  { name: 'Vodka', size: '$40.1B', growth: '-0.8%', dir: 'down', signal: 'Premiumization offsetting volume decline', trend: [{ v: 41.5 }, { v: 41.2 }, { v: 40.8 }, { v: 40.4 }, { v: 40.1 }], channels: { onTrade: 30, offTrade: 52, eComm: 10, travelRetail: 8 } },
  { name: 'Whisky (Global)', size: '$6.3B', growth: '+4.2%', dir: 'up', signal: 'Japanese whisky supply constraints', trend: [{ v: 5.1 }, { v: 5.4 }, { v: 5.7 }, { v: 6.0 }, { v: 6.3 }], channels: { onTrade: 33, offTrade: 40, eComm: 14, travelRetail: 13 } },
  { name: 'Gin', size: '$14.2B', growth: '+1.2%', dir: 'up', signal: 'Growth plateauing post-boom', trend: [{ v: 12.8 }, { v: 13.5 }, { v: 13.9 }, { v: 14.0 }, { v: 14.2 }], channels: { onTrade: 38, offTrade: 40, eComm: 13, travelRetail: 9 } },
  { name: 'Rum', size: '$15.8B', growth: '+3.1%', dir: 'up', signal: 'Premium dark rum accelerating', trend: [{ v: 13.8 }, { v: 14.2 }, { v: 14.8 }, { v: 15.3 }, { v: 15.8 }], channels: { onTrade: 34, offTrade: 44, eComm: 11, travelRetail: 11 } },
  { name: 'Cognac & Brandy', size: '$4.1B', growth: '-2.4%', dir: 'down', signal: 'China tariff impact persists', trend: [{ v: 4.8 }, { v: 4.6 }, { v: 4.4 }, { v: 4.2 }, { v: 4.1 }], channels: { onTrade: 28, offTrade: 38, eComm: 12, travelRetail: 22 } },
  { name: 'Champagne & Sparkling', size: '$7.2B', growth: '+2.8%', dir: 'up', signal: 'Prosecco growth offsetting Champagne softness', trend: [{ v: 6.2 }, { v: 6.5 }, { v: 6.8 }, { v: 7.0 }, { v: 7.2 }], channels: { onTrade: 40, offTrade: 35, eComm: 10, travelRetail: 15 } },
  { name: 'Wine (Still)', size: '$38.2B', growth: '-1.2%', dir: 'down', signal: 'Structural volume decline continues', trend: [{ v: 40.1 }, { v: 39.5 }, { v: 39.0 }, { v: 38.6 }, { v: 38.2 }], channels: { onTrade: 32, offTrade: 50, eComm: 12, travelRetail: 6 } },
  { name: 'Beer & Craft', size: '$623B', growth: '+1.4%', dir: 'up', signal: 'Craft consolidation wave', trend: [{ v: 590 }, { v: 600 }, { v: 608 }, { v: 615 }, { v: 623 }], channels: { onTrade: 45, offTrade: 42, eComm: 8, travelRetail: 5 } },
  { name: 'RTD / Ready-to-Drink', size: '$40B', growth: '+8.2%', dir: 'up', signal: 'Maturing from explosive growth phase', trend: [{ v: 25 }, { v: 29 }, { v: 33 }, { v: 37 }, { v: 40 }], channels: { onTrade: 20, offTrade: 55, eComm: 18, travelRetail: 7 } },
]

// ── Regional Pulse ──
const REGIONAL_PULSE = [
  { region: 'North America', flag: '\ud83c\uddfa\ud83c\uddf8', value: '$98B', growth: '+2.8%', dir: 'up', note: 'Premium spirits + RTD driving', trend: [{ v: 88 }, { v: 91 }, { v: 93 }, { v: 96 }, { v: 98 }] },
  { region: 'Europe', flag: '\ud83c\uddea\ud83c\uddfa', value: '$142B', growth: '+0.9%', dir: 'up', note: 'Labeling regulation headwinds', trend: [{ v: 137 }, { v: 138 }, { v: 139 }, { v: 141 }, { v: 142 }] },
  { region: 'Asia-Pacific', flag: '\ud83c\uddef\ud83c\uddf5', value: '$210B', growth: '+4.1%', dir: 'up', note: 'India & SE Asia fastest', trend: [{ v: 178 }, { v: 188 }, { v: 196 }, { v: 203 }, { v: 210 }] },
  { region: 'Latin America', flag: '\ud83c\udde7\ud83c\uddf7', value: '$52B', growth: '+3.5%', dir: 'up', note: 'Tequila export boom', trend: [{ v: 43 }, { v: 45 }, { v: 48 }, { v: 50 }, { v: 52 }] },
  { region: 'Middle East & Africa', flag: '\ud83c\udde6\ud83c\uddea', value: '$18B', growth: '+5.2%', dir: 'up', note: 'Travel retail & non-alc growth', trend: [{ v: 13 }, { v: 14 }, { v: 15.5 }, { v: 17 }, { v: 18 }] },
]

// ── Strategic Opportunities ──
const STRATEGIC_OPPORTUNITIES = [
  {
    title: 'Premium Mezcal Distribution',
    category: 'Tequila Alternative',
    opportunity: 'Establish exclusive distribution for premium mezcal in North American on-trade',
    timeframe: '12-18 months',
    investmentLevel: '$200K-$500K',
    potentialReturn: 'High',
    riskLevel: 'Medium',
    rationale: 'Mezcal growth accelerating at +12% CAGR; lower competition than tequila; margins 40-45%'
  },
  {
    title: 'Japanese Whisky White Label',
    category: 'Whisky',
    opportunity: 'Launch private label Japanese single malt through premium restaurants & bars',
    timeframe: '18-24 months',
    investmentLevel: '$500K-$1M',
    potentialReturn: 'Very High',
    riskLevel: 'High',
    rationale: 'Japanese whisky commands 30-40% premiums; supply constrained; brand differentiation play'
  },
  {
    title: 'RTD Cocktail Brand Launch',
    category: 'RTD/Ready-to-Drink',
    opportunity: 'Premium canned cocktails targeting urban millennials; craft positioning',
    timeframe: '6-12 months',
    investmentLevel: '$150K-$300K',
    potentialReturn: 'Medium-High',
    riskLevel: 'Low',
    rationale: 'RTD still +8.2% CAGR; consolidation = better shelf space; higher volume, lower per-unit margin'
  },
  {
    title: 'African Craft Spirits Import',
    category: 'Emerging Markets',
    opportunity: 'Exclusive distribution partnership for Nigerian gin, South African brandy to US/EU',
    timeframe: '12-18 months',
    investmentLevel: '$100K-$250K',
    potentialReturn: 'High',
    riskLevel: 'Medium',
    rationale: 'Africa emerging as origin story for spirits; limited awareness = marketing upside; niche but growing'
  },
  {
    title: 'Non-Alcoholic Spirits Line',
    category: 'No/Lo',
    opportunity: 'Launch own-brand sophisticated non-alc spirits for health-conscious consumers',
    timeframe: '6-9 months',
    investmentLevel: '$75K-$200K',
    potentialReturn: 'Medium',
    riskLevel: 'Low',
    rationale: 'No/Lo segment +7.5% CAGR; repeat purchase; high margins on premium positioning; regulatory tailwind'
  },
  {
    title: 'Travel Retail Exclusive Range',
    category: 'Multi-Category',
    opportunity: 'Develop duty-free exclusive SKUs; partner with DFS, Lagard\u00e8re for airport placement',
    timeframe: '9-12 months',
    investmentLevel: '$300K-$750K',
    potentialReturn: 'High',
    riskLevel: 'Medium',
    rationale: 'Travel retail 35% margin; 2.5B travelers annually; brand building in affluent demographics'
  },
]

// ── M&A Pipeline ──
const MA_PIPELINE = [
  { target: 'Skrewball Peanut Butter Whiskey', acquirer: 'Pernod Ricard', dealValue: '~$600M', stage: 'Due Diligence', category: 'Flavored Whiskey', likelihood: '75%', expectedClose: 'Q2 2026', significance: 'Consolidation of trendy, high-growth RTD-adjacent category; validates mass-market innovation' },
  { target: 'Fever-Tree (minority stake)', acquirer: 'Diageo', dealValue: '~$1.2B', stage: 'Exploratory', category: 'Mixers & RTD', likelihood: '40%', expectedClose: 'H2 2026', significance: 'Strategic for RTD bundling; tightens vertical integration; mixer category consolidating' },
  { target: 'Waterloo Sparkling Water', acquirer: 'AB InBev', dealValue: '~$180M', stage: 'LOI Signed', category: 'Non-Alcoholic', likelihood: '85%', expectedClose: 'Q1 2026', significance: 'Large cap entering no/lo category; validates growth thesis; margins-focused play' },
  { target: 'Proper No. Twelve Irish Whiskey', acquirer: 'Diageo', dealValue: '~$750M', stage: 'Finalized', category: 'Irish Whiskey', likelihood: '100%', expectedClose: 'Q1 2026', significance: 'Already closed; celebrity brand + supply chain = strategic value; Irish whiskey consolidation' },
  { target: 'Navan Cognac (minority)', acquirer: 'LVMH Wines & Spirits', dealValue: '~$400M', stage: 'Due Diligence', category: 'Cognac', likelihood: '70%', expectedClose: 'Q2 2026', significance: 'Luxury spirits consolidation; ultra-premium brandy strengthening; portfolio deepening' },
  { target: 'Rebellion Distillery', acquirer: 'Brown-Forman', dealValue: '~$220M', stage: 'LOI Signed', category: 'Craft Whiskey', likelihood: '80%', expectedClose: 'Q1 2026', significance: 'Mid-tier craft consolidation wave; scale economics; production capacity play' },
  { target: 'Tequila Casa Julio', acquirer: 'Becle (Diageo partnership)', dealValue: '~$115M', stage: 'Due Diligence', category: 'Tequila', likelihood: '65%', expectedClose: 'Q2 2026', significance: 'Super-premium tequila consolidation; agave supply security; portfolio breadth' },
  { target: 'Sake brewery Gekkeikan (stake)', acquirer: 'Constellation Brands', dealValue: '~$180M', stage: 'Exploratory', category: 'Sake/Spirits', likelihood: '35%', expectedClose: 'H2 2026', significance: 'Asian spirits play; production control; premium origin story; diversification' },
]

// ── Competitor Alerts ──
const COMPETITOR_ALERTS = [
  { company: 'Diageo', alert: 'Launches DTC platform in US with direct shipping to 42 states', impact: 'Premium margin capture; direct consumer data; traditional distributor channel pressure', date: 'Feb 22, 2026', severity: 'critical', actionRequired: true },
  { company: 'Pernod Ricard', alert: 'Acquires exclusive distribution rights in India; 45 SKUs across portfolio', impact: 'India market consolidation; barrier to entry for mid-tier brands; growth market controlled', date: 'Feb 20, 2026', severity: 'critical', actionRequired: true },
  { company: 'Brown-Forman', alert: 'Increases marketing spend 15% YoY (up $80M); focus on emerging gen Z brands', impact: 'Competitive intensity rising; CPA escalation expected across digital channels', date: 'Feb 18, 2026', severity: 'warning', actionRequired: false },
  { company: 'Bacardi', alert: 'Partners with major US festival circuit (Coachella, Outside Lands, Governors Ball)', impact: 'Brand sampling at scale; experiential marketing trend; younger demographic capture', date: 'Feb 16, 2026', severity: 'warning', actionRequired: true },
  { company: 'Campari', alert: 'Enters distribution agreement with largest Japanese importer; 150 point-of-sale expansion', impact: 'Japan on-trade consolidation; competitive shelf space pressure; Asia-Pacific footprint strengthened', date: 'Feb 14, 2026', severity: 'info', actionRequired: false },
  { company: 'LVMH Wines & Spirits', alert: 'Creates new ultra-premium division; targeting $5B+ spirits by 2030', impact: 'Luxury market consolidation; margin compression in ultra-premium segment; strategic focus intensifying', date: 'Feb 12, 2026', severity: 'warning', actionRequired: true },
]

// ── Weekly Digest ──
const WEEKLY_DIGEST = {
  weekOf: 'Feb 24-28, 2026',
  topStory: {
    headline: 'Mexican Agave Oversupply Accelerates Tequila Input Cost Decline',
    summary: 'Mexican agricultural ministry reports agave surplus of 2.3M tons; largest in 5 years. Tequila input costs falling 18-22%. Low prices sparking consolidation and entry into value segment.',
    implication: 'Margin pressure for premium tequila brands; opportunity for volume plays in mainstream tequila; small players should evaluate production partnerships now'
  },
  categoryMoves: [
    { category: 'Tequila & Mezcal', move: 'Agave surplus driving down input costs', impact: '+3% market entry attractiveness' },
    { category: 'Whisky', move: 'Japanese supply constraints easing slightly; new distilleries coming online', impact: 'Premium positioning still holds; margins stable' },
    { category: 'RTD', move: 'Four major brands increasing shelf space allocation; category maturing', impact: 'Volume growth +8%, but consolidation accelerating' },
    { category: 'No/Lo', move: 'Diageo DTC platform emphasizes premium non-alc; consumer awareness rising', impact: 'Market segmentation by price tier hardening' },
    { category: 'Cognac', move: 'China duty reduction discussions under way; unlikely near-term relief', impact: 'Export pressure persists; R\u00e9my Cointreau exposure remains high' }
  ],
  dataPoints: [
    { metric: 'Global Spirits E-Commerce Penetration', value: '14.2%', context: 'Up 2.1pp YoY; DTC platforms accelerating' },
    { metric: 'Agave Surplus (Mexico)', value: '2.3M tons', context: '5-year high; input costs down 18-22%' },
    { metric: 'Premium Spirit Sales Growth', value: '+6.8%', context: 'Outpacing mainstream (+1.2%); premiumization thesis holding' },
    { metric: 'Craft Spirits M&A Count (Q4 2025)', value: '47 deals', context: 'Entry multiples 8-12x EBITDA; consolidation wave' }
  ],
  weekAhead: [
    { event: 'Diageo H1 FY2026 earnings call', date: 'Feb 27', watchFor: 'Guidance on margin pressure; DTC platform traction; M&A appetite' },
    { event: 'EU labeling regulation enforcement deadline looms', date: 'Mar 3', watchFor: 'Compliance costs; who absorbs expense; import impact' },
    { event: 'ProWein D\u00fcsseldorf trade show kicks off', date: 'Mar 15-17', watchFor: 'New product launches; distributor sentiment; pricing trends' }
  ]
}

// ── Performance Benchmarks ──
const PERFORMANCE_BENCHMARKS = [
  { metric: 'Gross Margin', industryAvg: 55, topQuartile: 68, bottomQuartile: 42, yourTarget: 60, unit: '%' },
  { metric: 'Marketing % of Revenue', industryAvg: 22, topQuartile: 28, bottomQuartile: 15, yourTarget: 20, unit: '%' },
  { metric: 'Distribution Points/SKU', industryAvg: 2400, topQuartile: 5200, bottomQuartile: 1100, yourTarget: 3500, unit: 'outlets' },
  { metric: 'COGS % of Revenue', industryAvg: 45, topQuartile: 32, bottomQuartile: 58, yourTarget: 40, unit: '%' },
  { metric: 'Revenue per FTE', industryAvg: 850, topQuartile: 1200, bottomQuartile: 520, yourTarget: 950, unit: '$K' },
  { metric: 'Inventory Turns/Year', industryAvg: 4.2, topQuartile: 6.1, bottomQuartile: 2.8, yourTarget: 5.0, unit: 'turns' },
  { metric: 'Brand Awareness (Premium)', industryAvg: 28, topQuartile: 52, bottomQuartile: 12, yourTarget: 35, unit: '%' },
  { metric: 'Customer Acquisition Cost', industryAvg: 45, topQuartile: 28, bottomQuartile: 68, yourTarget: 38, unit: '$' },
]

// ── Key Metrics Watchlist (inlined from component) ──
const PILLARS = [
  {
    id: 'macro', label: 'Global Macro & Category', icon: 'Globe', color: 'blue',
    metrics: [
      { name: 'Global TBA Volume Change', value: '-1.0%', period: '2024', note: 'Volume softness persists', trend: 'down' },
      { name: 'Global TBA Revenue Change', value: '+1.0%', period: '2024', note: 'Premiumization holding', trend: 'up' },
      { name: 'No/Lo Category Growth', value: '+13%', period: '2024 vol.', note: 'Accelerating beyond niche', trend: 'up' },
      { name: 'Fine Wine Value Share', value: '11%', period: 'of global wine value', note: 'From only 1.5% of volume', trend: 'up' },
      { name: 'RTD Category Growth', value: '+8.2%', period: '2024', note: 'BuzzBallz, Cutwater driving', trend: 'up' },
      { name: 'GLP-1 Impact on Consumption', value: '-23%', period: 'UK dining out', note: '7% UK adults on GLP-1 drugs', trend: 'down' },
    ]
  },
  {
    id: 'supply', label: 'Supply Chain & Input Costs', icon: 'Package', color: 'red',
    metrics: [
      { name: 'Baltic Dry Index', value: '2,112', period: 'pts', note: '+110% YoY \u2014 shipping cost surge', trend: 'up' },
      { name: 'Glass Container PPI (US)', value: '216.38', period: 'Index (2003=100)', note: 'Historically high \u2014 energy-driven', trend: 'up' },
      { name: 'Drewry WCI (40ft)', value: '$3,421', period: 'per container', note: 'Global freight remains elevated', trend: 'up' },
      { name: 'EU Natural Gas (TTF)', value: '\u20ac48.2/MWh', period: 'Feb 2026', note: 'Glass furnace cost driver', trend: 'up' },
      { name: 'French Wine Production', value: '-16%', period: 'vs 5yr avg', note: 'Heat and drought impact', trend: 'down' },
      { name: 'Barley (EU)', value: '\u20ac224/t', period: '+12% YoY', note: 'Whisky input cost pressure', trend: 'up' },
    ]
  },
  {
    id: 'corporate', label: 'Corporate Financial Health', icon: 'Building2', color: 'green',
    metrics: [
      { name: 'AB InBev Net Debt/EBITDA', value: '2.87x', period: 'FY25', note: 'Down from 3.96x in FY21', trend: 'down' },
      { name: 'Diageo Debt/Equity', value: '185%', period: 'FY25', note: 'Stable leverage range 181-189%', trend: 'up' },
      { name: 'Pernod Ricard Organic NSG', value: '-3.0%', period: 'FY25', note: 'China & US drag', trend: 'down' },
      { name: 'Constellation Beer Margin', value: '39.7%', period: 'Operating', note: '15th consecutive volume growth yr', trend: 'up' },
      { name: 'LVMH W&S Organic Revenue', value: '-5%', period: 'FY25', note: 'Cognac hit by US/China tariffs', trend: 'down' },
      { name: 'Carlsberg Reported Revenue', value: '+18.8%', period: 'DKK 89.1bn', note: 'Britvic acquisition driving', trend: 'up' },
    ]
  },
  {
    id: 'luxury', label: 'Alternative Assets & Luxury', icon: 'Gem', color: 'purple',
    metrics: [
      { name: "Sotheby's Wine & Spirits Sales", value: '$127.5M', period: '2025', note: '+12% YoY rebound', trend: 'up' },
      { name: 'Rare Whisky 101 Apex 1000', value: 'Tracking', period: '1,000 bottles', note: 'Passion asset class vitality', trend: 'up' },
      { name: 'Dubai Duty Free Sales', value: '$2.4B', period: '2025 annual', note: 'Record-breaking GTR performance', trend: 'up' },
      { name: 'Glenlivet SPIRA 60yr (lot)', value: '$864,825', period: 'Oct 2025', note: 'Most expensive lot of the year', trend: 'up' },
      { name: 'Saudi Vision 2030 Zones', value: '~600', period: 'planned', note: 'Alcohol zones in tourist/luxury hotels', trend: 'up' },
      { name: 'Creator Brand Velocity', value: '23M', period: 'consumers reached', note: 'Teremana in 16 GTR markets yr 1', trend: 'up' },
    ]
  },
]

// ══════════════════════════════════════════════════════════
// COMPONENTS
// ══════════════════════════════════════════════════════════

// ── Micro Sparkline (tiny area chart behind KPI values) ──
function MicroSparkline({ data, positive = true }) {
  const color = positive ? '#22c55e' : '#ef4444'
  return (
    <ResponsiveContainer width="100%" height={32}>
      <AreaChart data={data} margin={{ top: 2, right: 0, bottom: 0, left: 0 }}>
        <defs>
          <linearGradient id={`micro-${positive ? 'pos' : 'neg'}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity={0.15} />
            <stop offset="100%" stopColor={color} stopOpacity={0.02} />
          </linearGradient>
        </defs>
        <Area type="monotone" dataKey="v" stroke={color} strokeWidth={1.5} fill={`url(#micro-${positive ? 'pos' : 'neg'})`} dot={false} isAnimationActive={false} />
      </AreaChart>
    </ResponsiveContainer>
  )
}

// ── Category Mini-Bar (tiny inline bar for channel split) ──
function ChannelMiniBar({ channels }) {
  const colors = { onTrade: '#1e3a5f', offTrade: '#C9A96E', eComm: '#3b82f6', travelRetail: '#8b5cf6' }
  return (
    <div className="flex h-1.5 rounded-full overflow-hidden w-full" title={`On: ${channels.onTrade}% | Off: ${channels.offTrade}% | E-Com: ${channels.eComm}% | TR: ${channels.travelRetail}%`}>
      <div style={{ width: `${channels.onTrade}%`, backgroundColor: colors.onTrade }} />
      <div style={{ width: `${channels.offTrade}%`, backgroundColor: colors.offTrade }} />
      <div style={{ width: `${channels.eComm}%`, backgroundColor: colors.eComm }} />
      <div style={{ width: `${channels.travelRetail}%`, backgroundColor: colors.travelRetail }} />
    </div>
  )
}

// ── KPI Card with Micro-Chart ──
function KpiCard({ kpi }) {
  const Icon = kpi.icon
  const isUp = kpi.dir === 'up'
  const sparkData = KPI_TRENDS[kpi.sparkKey] || []
  return (
    <div className="bg-white rounded-xl border border-gray-100 p-3 hover:shadow-md transition-shadow relative overflow-hidden">
      <div className="absolute bottom-0 left-0 right-0 h-8 opacity-40">
        <MicroSparkline data={sparkData} positive={isUp} />
      </div>
      <div className="relative z-10">
        <div className="flex items-start justify-between">
          <div className="p-1.5 rounded-lg bg-navy/5">
            <Icon size={14} className="text-navy" />
          </div>
          <span className={`inline-flex items-center gap-0.5 text-[10px] font-semibold px-1.5 py-0.5 rounded-full ${isUp ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
            {isUp ? <ArrowUpRight size={10} /> : <ArrowDownRight size={10} />}
            {kpi.change}
          </span>
        </div>
        <div className="mt-2">
          <div className="text-xl font-bold text-navy">{kpi.value}</div>
          <div className="text-xs font-medium text-gray-700 mt-0.5">{kpi.label}</div>
          <div className="text-[10px] text-gray-400 mt-0.5">{kpi.sub}</div>
        </div>
      </div>
    </div>
  )
}

// ── Signal Row (compact) ──
function SignalRow({ signal }) {
  const urgencyColors = { high: 'bg-red-100 text-red-700', medium: 'bg-amber-100 text-amber-700', low: 'bg-blue-100 text-blue-700' }
  const typeColors = { 'M&A': 'bg-purple-50 text-purple-600', 'Regulation': 'bg-orange-50 text-orange-600', 'Supply': 'bg-green-50 text-green-600', 'Trade': 'bg-red-50 text-red-600', 'Category': 'bg-blue-50 text-blue-600' }
  return (
    <div className="bg-white rounded-lg border border-gray-100 p-3 hover:shadow-sm transition-shadow">
      <div className="flex items-center gap-2 mb-1.5">
        <span className={`text-[9px] font-bold uppercase px-1.5 py-0.5 rounded-full ${urgencyColors[signal.urgency]}`}>{signal.urgency}</span>
        <span className={`text-[9px] font-semibold px-1.5 py-0.5 rounded-full ${typeColors[signal.type] || 'bg-gray-50 text-gray-600'}`}>{signal.type}</span>
        <span className="text-[9px] text-gray-400 ml-auto">{signal.date}</span>
      </div>
      <h4 className="text-xs font-semibold text-navy leading-snug">{signal.headline}</h4>
      <p className="text-[11px] text-gray-500 mt-1 leading-relaxed">{signal.impact}</p>
      <div className="text-[9px] text-gray-400 mt-1">Source: {signal.source}</div>
    </div>
  )
}

// ── Category Row with sparkline + channel bar ──
function CategoryRow({ cat }) {
  const isUp = cat.dir === 'up'
  return (
    <div className="flex items-center gap-2 px-3 py-2 border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors cursor-pointer group">
      <div className="flex-1 min-w-0">
        <div className="text-xs font-medium text-navy group-hover:text-gold transition-colors">{cat.name}</div>
        <div className="text-[10px] text-gray-400 truncate">{cat.signal}</div>
        <div className="mt-1 w-full">
          <ChannelMiniBar channels={cat.channels} />
        </div>
      </div>
      <div className="w-16 h-6 flex-shrink-0">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={cat.trend} margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
            <Area type="monotone" dataKey="v" stroke={isUp ? '#22c55e' : '#ef4444'} strokeWidth={1.2} fill={isUp ? '#22c55e10' : '#ef444410'} dot={false} isAnimationActive={false} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <div className="text-right flex-shrink-0 w-16">
        <div className="text-xs font-semibold text-navy">{cat.size}</div>
        <span className={`text-[10px] font-medium ${isUp ? 'text-green-600' : 'text-red-500'}`}>{cat.growth}</span>
      </div>
      <ChevronRight size={12} className="text-gray-300 group-hover:text-gold transition-colors flex-shrink-0" />
    </div>
  )
}

// ── Region Row with sparkline ──
function RegionRow({ r }) {
  const isUp = r.dir === 'up'
  return (
    <div className="flex items-center gap-2 px-3 py-2 border-b border-gray-50 last:border-0">
      <span className="text-base">{r.flag}</span>
      <div className="flex-1 min-w-0">
        <div className="text-xs font-medium text-navy">{r.region}</div>
        <div className="text-[10px] text-gray-400 truncate">{r.note}</div>
      </div>
      <div className="w-12 h-5 flex-shrink-0">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={r.trend} margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
            <Area type="monotone" dataKey="v" stroke={isUp ? '#22c55e' : '#ef4444'} strokeWidth={1} fill={isUp ? '#22c55e10' : '#ef444410'} dot={false} isAnimationActive={false} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <div className="text-right flex-shrink-0">
        <div className="text-xs font-semibold text-navy">{r.value}</div>
        <span className={`text-[10px] font-medium ${isUp ? 'text-green-600' : 'text-red-500'}`}>{r.growth}</span>
      </div>
    </div>
  )
}

// ── Event Row (compact) ──
function EventRow({ evt }) {
  const typeColor = evt.type === 'Earnings' ? 'text-editorial bg-blue-50' : 'text-gold bg-gold/10'
  return (
    <div className="flex items-center gap-2 px-3 py-2 border-b border-gray-50 last:border-0">
      <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${typeColor}`}>{evt.date}</span>
      <div className="flex-1 min-w-0">
        <div className="text-xs font-medium text-navy truncate">{evt.company}</div>
        <div className="text-[10px] text-gray-500">{evt.event}</div>
      </div>
      <span className={`text-[9px] font-medium px-1.5 py-0.5 rounded-full flex-shrink-0 ${evt.type === 'Earnings' ? 'bg-blue-50 text-blue-600' : 'bg-amber-50 text-amber-600'}`}>{evt.type}</span>
    </div>
  )
}

// ── Strategic Opportunities (compact grid) ──
function StrategicOpportunities() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
      {STRATEGIC_OPPORTUNITIES.map((opp, i) => (
        <div key={i} className="bg-white rounded-lg border border-gray-100 p-3 hover:shadow-md transition-shadow">
          <div className="flex items-start justify-between mb-1.5">
            <h3 className="font-semibold text-xs text-navy flex-1">{opp.title}</h3>
            <span className="text-[9px] font-bold bg-blue-50 text-blue-600 px-1.5 py-0.5 rounded whitespace-nowrap ml-2">{opp.category}</span>
          </div>
          <p className="text-[11px] text-gray-600 leading-relaxed mb-2">{opp.opportunity}</p>
          <div className="grid grid-cols-2 gap-1.5 mb-2 pt-2 border-t border-gray-100 text-[10px]">
            <div><span className="text-gray-500">Timeline:</span> <span className="font-medium text-navy">{opp.timeframe}</span></div>
            <div><span className="text-gray-500">Invest:</span> <span className="font-medium text-navy">{opp.investmentLevel}</span></div>
          </div>
          <div className="flex gap-1.5">
            <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full ${opp.potentialReturn === 'Very High' ? 'bg-green-100 text-green-700' : opp.potentialReturn === 'High' ? 'bg-green-50 text-green-600' : 'bg-amber-50 text-amber-600'}`}>
              {opp.potentialReturn}
            </span>
            <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full ${opp.riskLevel === 'High' ? 'bg-red-100 text-red-700' : opp.riskLevel === 'Medium' ? 'bg-orange-50 text-orange-600' : 'bg-blue-50 text-blue-600'}`}>
              {opp.riskLevel} Risk
            </span>
          </div>
        </div>
      ))}
    </div>
  )
}

// ── M&A Pipeline (compact table) ──
function MAPipeline() {
  return (
    <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
      <div className="px-3 py-2 border-b border-gray-100 flex items-center justify-between">
        <div>
          <h3 className="font-semibold text-sm text-navy">M&A Pipeline</h3>
          <p className="text-[10px] text-gray-500">Active deals & strategic consolidation</p>
        </div>
        <span className="text-[10px] font-bold bg-purple-50 text-purple-600 px-2 py-0.5 rounded-full">{MA_PIPELINE.length} active</span>
      </div>
      <div className="divide-y divide-gray-50">
        {MA_PIPELINE.map((deal, i) => {
          const pct = parseInt(deal.likelihood)
          const color = pct > 70 ? 'text-green-600' : pct >= 40 ? 'text-amber-600' : 'text-red-500'
          return (
            <div key={i} className="px-3 py-2 hover:bg-gray-50/50 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-xs text-navy truncate">{deal.target}</div>
                  <div className="text-[10px] text-gray-400">{deal.acquirer} \u2022 {deal.dealValue}</div>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0 ml-2">
                  <div className="w-12 bg-gray-100 rounded-full h-1.5">
                    <div className={`h-1.5 rounded-full ${pct > 70 ? 'bg-green-500' : pct >= 40 ? 'bg-amber-500' : 'bg-red-400'}`} style={{ width: `${pct}%` }} />
                  </div>
                  <span className={`text-[10px] font-bold ${color} w-8 text-right`}>{deal.likelihood}</span>
                </div>
              </div>
              <div className="flex gap-2 mt-1">
                <span className="text-[9px] bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded">{deal.stage}</span>
                <span className="text-[9px] bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded">{deal.expectedClose}</span>
                <span className="text-[9px] bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded">{deal.category}</span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// ── Competitor Alerts (compact) ──
function CompetitorAlerts() {
  return (
    <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
      <div className="px-3 py-2 border-b border-gray-100 flex items-center justify-between">
        <div>
          <h3 className="font-semibold text-sm text-navy">Competitor Alerts</h3>
          <p className="text-[10px] text-gray-500">Strategic moves & market changes</p>
        </div>
        <span className="text-[10px] font-bold bg-red-50 text-red-600 px-2 py-0.5 rounded-full">
          {COMPETITOR_ALERTS.filter(a => a.severity === 'critical').length} critical
        </span>
      </div>
      <div className="divide-y divide-gray-50">
        {COMPETITOR_ALERTS.map((alert, i) => {
          const borderColor = alert.severity === 'critical' ? 'border-l-red-500' : alert.severity === 'warning' ? 'border-l-amber-400' : 'border-l-blue-300'
          return (
            <div key={i} className={`px-3 py-2 border-l-2 ${borderColor} hover:bg-gray-50/50 transition-colors`}>
              <div className="flex items-center justify-between mb-0.5">
                <div className="flex items-center gap-1.5">
                  <span className="font-semibold text-xs text-navy">{alert.company}</span>
                  {alert.actionRequired && <span className="text-[8px] font-bold bg-red-200 text-red-800 px-1 py-0.5 rounded">ACTION</span>}
                </div>
                <span className="text-[9px] text-gray-400">{alert.date}</span>
              </div>
              <p className="text-[11px] text-navy font-medium leading-snug">{alert.alert}</p>
              <p className="text-[10px] text-gray-500 mt-0.5">{alert.impact}</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// ── Weekly Digest (streamlined) ──
function WeeklyDigestSection() {
  return (
    <div className="bg-gradient-to-br from-navy/5 to-transparent rounded-xl border border-navy/10 p-4">
      <div className="mb-4">
        <div className="text-[10px] font-bold text-gold uppercase tracking-wide mb-1">Week of {WEEKLY_DIGEST.weekOf}</div>
        <h2 className="text-base font-bold text-navy mb-2">{WEEKLY_DIGEST.topStory.headline}</h2>
        <p className="text-xs text-gray-700 leading-relaxed mb-2">{WEEKLY_DIGEST.topStory.summary}</p>
        <div className="bg-white rounded-lg border border-gold/30 p-2 bg-gold/5">
          <div className="text-[9px] font-bold text-gold uppercase mb-0.5">Your Implication</div>
          <p className="text-[11px] text-navy leading-relaxed">{WEEKLY_DIGEST.topStory.implication}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 border-t border-gray-200 pt-4">
        <div className="lg:col-span-2">
          <h3 className="text-xs font-semibold text-navy mb-2">Category Moves</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {WEEKLY_DIGEST.categoryMoves.map((item, i) => (
              <div key={i} className="p-2 bg-white rounded-lg border border-gray-100">
                <div className="font-medium text-[10px] text-navy">{item.category}</div>
                <p className="text-[10px] text-gray-600 mt-0.5">{item.move}</p>
                <div className="text-[9px] text-green-600 font-semibold mt-1">{item.impact}</div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-xs font-semibold text-navy mb-2">Key Data Points</h3>
          <div className="space-y-1.5">
            {WEEKLY_DIGEST.dataPoints.map((dp, i) => (
              <div key={i} className="p-2 bg-white rounded-lg border border-gray-100">
                <div className="font-medium text-[10px] text-navy">{dp.metric}</div>
                <div className="text-sm font-bold text-gold">{dp.value}</div>
                <p className="text-[9px] text-gray-500">{dp.context}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-gray-200">
        <h3 className="text-xs font-semibold text-navy mb-2">Week Ahead</h3>
        <div className="space-y-1.5">
          {WEEKLY_DIGEST.weekAhead.map((item, i) => (
            <div key={i} className="flex gap-2 text-xs">
              <div className="text-gold font-bold whitespace-nowrap text-[10px]">{item.date}</div>
              <div>
                <div className="font-medium text-navy text-[11px]">{item.event}</div>
                <p className="text-[10px] text-gray-600">Watch: {item.watchFor}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ── Performance Benchmarks with Recharts ──
function PerformanceBenchmarks() {
  const BENCH_COLORS = ['#f87171', '#fbbf24', '#3b82f6', '#22c55e']
  return (
    <div className="bg-white rounded-xl border border-gray-100 p-4">
      <h3 className="font-semibold text-sm text-navy mb-4">Performance Benchmarks vs. Industry</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {PERFORMANCE_BENCHMARKS.map((bench, i) => {
          const data = [
            { name: 'Bottom', value: bench.bottomQuartile },
            { name: 'Industry', value: bench.industryAvg },
            { name: 'Target', value: bench.yourTarget },
            { name: 'Top', value: bench.topQuartile },
          ]
          const maxVal = Math.max(bench.topQuartile, bench.bottomQuartile, bench.industryAvg, bench.yourTarget) * 1.1
          return (
            <div key={i} className="border border-gray-100 rounded-lg p-3">
              <div className="text-[10px] font-semibold text-navy mb-1">{bench.metric}</div>
              <div className="h-20">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={data} margin={{ top: 2, right: 0, bottom: 0, left: 0 }}>
                    <Bar dataKey="value" radius={[2, 2, 0, 0]} isAnimationActive={false}>
                      {data.map((entry, idx) => (
                        <Cell key={idx} fill={BENCH_COLORS[idx]} />
                      ))}
                    </Bar>
                    <XAxis dataKey="name" tick={{ fontSize: 8 }} axisLine={false} tickLine={false} />
                    <Tooltip formatter={(val) => `${val}${bench.unit === '%' || bench.unit === 'turns' ? bench.unit : ''}`} contentStyle={{ fontSize: 10, padding: '4px 8px' }} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="flex justify-between text-[9px] text-gray-500 mt-1">
                <span>Your: <span className="font-bold text-blue-600">{bench.yourTarget}{bench.unit === '%' ? '%' : ''}</span></span>
                <span>Avg: {bench.industryAvg}{bench.unit === '%' ? '%' : ''}</span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// ── Key Metrics Watchlist (inlined, enhanced) ──
function KeyMetricsWatchlist() {
  const [activePillar, setActivePillar] = useState('macro')
  const pillar = PILLARS.find(p => p.id === activePillar)
  const iconMap = { Globe, Package, Building2, Gem }
  const colorMap = {
    blue: { bg: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-700', icon: 'text-blue-500' },
    red: { bg: 'bg-red-50', border: 'border-red-200', text: 'text-red-700', icon: 'text-red-500' },
    green: { bg: 'bg-green-50', border: 'border-green-200', text: 'text-green-700', icon: 'text-green-500' },
    purple: { bg: 'bg-purple-50', border: 'border-purple-200', text: 'text-purple-700', icon: 'text-purple-500' },
  }

  return (
    <div>
      <div className="flex items-center gap-2 mb-3">
        <TrendingUp className="w-4 h-4 text-gold" />
        <h2 className="text-sm font-display font-bold text-navy">Key Metrics Watchlist</h2>
      </div>
      <div className="grid grid-cols-4 gap-1.5 mb-3">
        {PILLARS.map(p => {
          const Icon = iconMap[p.icon]
          const c = colorMap[p.color]
          const isActive = activePillar === p.id
          return (
            <button key={p.id} onClick={() => setActivePillar(p.id)}
              className={`flex items-center gap-1.5 p-2 rounded-lg border text-left transition-all ${isActive ? `${c.bg} ${c.border} ${c.text}` : 'bg-white border-gray-100 text-gray-500 hover:bg-gray-50'}`}>
              <Icon className={`w-3.5 h-3.5 ${isActive ? c.icon : 'text-gray-400'}`} />
              <span className="text-[10px] font-semibold leading-tight">{p.label}</span>
            </button>
          )
        })}
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
        {pillar.metrics.map((m, i) => (
          <div key={i} className="bg-white rounded-lg border border-gray-100 p-2 hover:shadow-sm transition-shadow">
            <div className="flex items-center justify-between mb-0.5">
              <span className="text-[9px] text-gray-400 font-medium leading-tight">{m.name}</span>
              {m.trend === 'up' ? <TrendingUp className="w-2.5 h-2.5 text-green-500" /> : <TrendingDown className="w-2.5 h-2.5 text-red-500" />}
            </div>
            <div className="text-sm font-bold text-navy">{m.value}</div>
            <div className="text-[9px] text-gray-400">{m.period}</div>
            <p className="text-[8px] text-gray-400 mt-0.5 leading-tight">{m.note}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

// ── Summary Stats Strip ──
function SummaryStrip() {
  const categoriesUp = CATEGORY_SNAPSHOT.filter(c => c.dir === 'up').length
  const categoriesDown = CATEGORY_SNAPSHOT.filter(c => c.dir === 'down').length
  const highUrgency = MARKET_SIGNALS.filter(s => s.urgency === 'high').length
  const criticalAlerts = COMPETITOR_ALERTS.filter(a => a.severity === 'critical').length
  const activeDeals = MA_PIPELINE.length
  const totalDealValue = MA_PIPELINE.reduce((sum, d) => {
    const match = d.dealValue.match(/[\d.]+/)
    return sum + (match ? parseFloat(match[0]) : 0)
  }, 0)

  const stats = [
    { label: 'Categories Growing', value: categoriesUp, sub: `${categoriesDown} declining`, color: 'text-green-600' },
    { label: 'High-Urgency Signals', value: highUrgency, sub: `of ${MARKET_SIGNALS.length} total`, color: 'text-red-600' },
    { label: 'Critical Competitor Moves', value: criticalAlerts, sub: 'action required', color: 'text-red-600' },
    { label: 'Active M&A Deals', value: activeDeals, sub: `~$${totalDealValue.toFixed(1)}B total`, color: 'text-purple-600' },
    { label: 'Upcoming Events', value: UPCOMING_EVENTS.length, sub: 'earnings & trade shows', color: 'text-blue-600' },
    { label: 'Opportunities Tracked', value: STRATEGIC_OPPORTUNITIES.length, sub: 'across categories', color: 'text-gold' },
  ]

  return (
    <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
      {stats.map((s, i) => (
        <div key={i} className="bg-white rounded-lg border border-gray-100 p-2 text-center">
          <div className={`text-lg font-bold ${s.color}`}>{s.value}</div>
          <div className="text-[9px] font-medium text-navy">{s.label}</div>
          <div className="text-[8px] text-gray-400">{s.sub}</div>
        </div>
      ))}
    </div>
  )
}

// ── Channel Legend ──
function ChannelLegend() {
  const items = [
    { label: 'On-Trade', color: '#1e3a5f' },
    { label: 'Off-Trade', color: '#C9A96E' },
    { label: 'E-Commerce', color: '#3b82f6' },
    { label: 'Travel Retail', color: '#8b5cf6' },
  ]
  return (
    <div className="flex gap-3 items-center">
      {items.map((it, i) => (
        <div key={i} className="flex items-center gap-1">
          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: it.color }} />
          <span className="text-[9px] text-gray-500">{it.label}</span>
        </div>
      ))}
    </div>
  )
}

// ══════════════════════════════════════════════════════════
// MAIN PAGE
// ══════════════════════════════════════════════════════════
export default function CommandCentre() {
  const [signalsExpanded, setSignalsExpanded] = useState(false)
  const displaySignals = signalsExpanded ? MARKET_SIGNALS : MARKET_SIGNALS.slice(0, 3)

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl text-navy">Command Centre</h1>
          <p className="text-gray-500 text-xs mt-0.5">Global beverage alcohol intelligence \u2014 curated daily</p>
        </div>
        <div className="text-right">
          <div className="text-[10px] text-gray-400">Last updated</div>
          <div className="text-xs font-medium text-navy">Feb 26, 2026 09:15 GMT</div>
        </div>
      </div>

      {/* Summary Stats Strip */}
      <SummaryStrip />

      {/* KPI Grid — 6 cards with micro-sparklines */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {MARKET_KPIS.map((kpi, i) => <KpiCard key={i} kpi={kpi} />)}
      </div>

      {/* Three-column dense layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Left: Market Signals (5 cols) */}
        <div className="lg:col-span-5 space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-sm text-navy flex items-center gap-1.5">
              <AlertTriangle size={14} className="text-accent-orange" />
              Market Signals
            </h2>
            <button onClick={() => setSignalsExpanded(!signalsExpanded)} className="text-[10px] text-editorial hover:underline flex items-center gap-0.5">
              {signalsExpanded ? 'Less' : `All ${MARKET_SIGNALS.length}`}
              {signalsExpanded ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
            </button>
          </div>
          <div className="space-y-2">
            {displaySignals.map((signal, i) => <SignalRow key={i} signal={signal} />)}
          </div>
        </div>

        {/* Center: Category Snapshot (4 cols) */}
        <div className="lg:col-span-4">
          <div className="flex items-center justify-between mb-2">
            <h2 className="font-display text-sm text-navy flex items-center gap-1.5">
              <BarChart3 size={14} className="text-editorial" />
              Category Snapshot
            </h2>
            <ChannelLegend />
          </div>
          <div className="bg-white rounded-xl border border-gray-100 divide-y divide-gray-50">
            {CATEGORY_SNAPSHOT.map((cat, i) => <CategoryRow key={i} cat={cat} />)}
          </div>
        </div>

        {/* Right: Regional + Events (3 cols) */}
        <div className="lg:col-span-3 space-y-4">
          <div>
            <h2 className="font-display text-sm text-navy flex items-center gap-1.5 mb-2">
              <Globe size={14} className="text-gold" />
              Regional Pulse
            </h2>
            <div className="bg-white rounded-xl border border-gray-100 divide-y divide-gray-50">
              {REGIONAL_PULSE.map((r, i) => <RegionRow key={i} r={r} />)}
            </div>
          </div>
          <div>
            <h2 className="font-display text-sm text-navy flex items-center gap-1.5 mb-2">
              <Calendar size={14} className="text-gold" />
              Upcoming Events
            </h2>
            <div className="bg-white rounded-xl border border-gray-100">
              {UPCOMING_EVENTS.map((evt, i) => <EventRow key={i} evt={evt} />)}
            </div>
          </div>
        </div>
      </div>

      {/* Key Metrics Watchlist */}
      <KeyMetricsWatchlist />

      {/* Strategic Opportunities */}
      <div>
        <h2 className="font-display text-sm text-navy flex items-center gap-1.5 mb-3">
          <Target size={14} className="text-gold" />
          Strategic Opportunities
        </h2>
        <StrategicOpportunities />
      </div>

      {/* Weekly Intelligence Digest */}
      <WeeklyDigestSection />

      {/* Two-column: M&A Pipeline + Competitor Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <MAPipeline />
        <CompetitorAlerts />
      </div>

      {/* Performance Benchmarks with Recharts */}
      <PerformanceBenchmarks />
    </div>
  )
}
