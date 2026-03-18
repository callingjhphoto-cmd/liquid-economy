import React, { useState, useMemo, useCallback } from 'react'
import { Link } from 'react-router-dom'
import {
  TrendingUp, TrendingDown, Activity, AlertTriangle, Calendar,
  Globe, BarChart3, Zap, ArrowUpRight, ArrowDownRight, ExternalLink,
  Clock, Target, DollarSign, Percent, ChevronDown, ChevronUp,
  ArrowUpDown, Filter, Package, Building2, Gem, ChevronRight,
  X, FileText, Briefcase, ShieldAlert, Lightbulb, Copy, BookOpen
} from 'lucide-react'
import {
  AreaChart, Area, BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid
} from 'recharts'
import LiveFeed from '../components/LiveFeed'

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

// ── Persona-Specific KPIs (Task 2) ──
const PERSONA_KPIS = {
  all: MARKET_KPIS,
  ceo: [
    { label: 'Global Spirits Market', value: '$635B', change: '+3.1%', dir: 'up', sub: 'IWSR 2025 estimate', icon: Globe, sparkKey: 'market' },
    { label: 'Sector Avg P/E', value: '22.4x', change: '-0.8x', dir: 'down', sub: 'Across 14 public companies', icon: BarChart3, sparkKey: 'pe' },
    { label: 'Active M&A Pipeline', value: '$3.6B', change: '+8 deals', dir: 'up', sub: '3 in due diligence phase', icon: Building2, sparkKey: 'market' },
    { label: 'Portfolio Valuation', value: '14.2x', change: '+0.6x', dir: 'up', sub: 'EV/EBITDA median', icon: TrendingUp, sparkKey: 'premium' },
    { label: 'Dividend Yield Avg', value: '2.8%', change: '+0.2pp', dir: 'up', sub: 'Top 10 spirits companies', icon: DollarSign, sparkKey: 'ecomm' },
    { label: 'Capital Returns', value: '$8.2B', change: '+15%', dir: 'up', sub: 'Buybacks + dividends YTD', icon: Target, sparkKey: 'premium' },
  ],
  brand: [
    { label: 'Premium Segment Growth', value: '+6.8%', change: '+1.2pp', dir: 'up', sub: 'Super-premium & above', icon: TrendingUp, sparkKey: 'premium' },
    { label: 'Category Leaders ROI', value: '4.2x', change: '+0.8x', dir: 'up', sub: 'Marketing spend efficiency', icon: Target, sparkKey: 'premium' },
    { label: 'On-Trade Placement Rate', value: '34%', change: '+3pp', dir: 'up', sub: 'Top 50 bars coverage', icon: BarChart3, sparkKey: 'market' },
    { label: 'Brand Search Volume', value: '+18%', change: '+5pp', dir: 'up', sub: 'Google Trends spirits index', icon: Zap, sparkKey: 'nolo' },
    { label: 'Channel Mix Shift', value: '14.2%', change: '+2.1pp', dir: 'up', sub: 'E-commerce penetration', icon: Globe, sparkKey: 'ecomm' },
    { label: 'Competitor Price Index', value: '108', change: '+3pts', dir: 'up', sub: 'vs category average (100)', icon: DollarSign, sparkKey: 'cogs' },
  ],
  supply: [
    { label: 'COGS Pressure Index', value: '62/100', change: '+4pts', dir: 'up', sub: 'Freight & glass driving', icon: DollarSign, sparkKey: 'cogs' },
    { label: 'Baltic Dry Index', value: '2,112', change: '+110%', dir: 'up', sub: 'Shipping cost surge', icon: Package, sparkKey: 'cogs' },
    { label: 'Glass PPI (US)', value: '216.38', change: '+8%', dir: 'up', sub: 'Energy-driven inflation', icon: BarChart3, sparkKey: 'cogs' },
    { label: 'Agave Surplus', value: '2.3M t', change: '+40%', dir: 'up', sub: '5-year high; costs down 18%', icon: TrendingUp, sparkKey: 'market' },
    { label: 'EU Nat Gas (TTF)', value: '\u20ac48.2', change: '+12%', dir: 'up', sub: 'MWh; furnace cost driver', icon: Zap, sparkKey: 'cogs' },
    { label: 'Container Rate (40ft)', value: '$3,421', change: '+22%', dir: 'up', sub: 'Drewry WCI global avg', icon: Globe, sparkKey: 'cogs' },
  ],
  startup: [
    { label: 'Entry EBITDA Multiple', value: '8-12x', change: 'stable', dir: 'up', sub: 'Craft acquisition range', icon: TrendingUp, sparkKey: 'premium' },
    { label: 'Category Growth (Avg)', value: '+3.8%', change: '+0.4pp', dir: 'up', sub: 'Across 11 categories', icon: BarChart3, sparkKey: 'market' },
    { label: 'Launch Capital Required', value: '$150K+', change: 'varies', dir: 'up', sub: 'For viable market entry', icon: DollarSign, sparkKey: 'market' },
    { label: 'Target Gross Margin', value: '55-68%', change: 'range', dir: 'up', sub: 'Industry top quartile', icon: Target, sparkKey: 'premium' },
    { label: 'Distribution Points/SKU', value: '2,400', change: 'avg', dir: 'up', sub: 'Industry benchmark', icon: Globe, sparkKey: 'ecomm' },
    { label: 'No/Lo Opportunity', value: '+9.5%', change: '+0.3pp', dir: 'up', sub: 'Fastest-growing entry', icon: Zap, sparkKey: 'nolo' },
  ],
  agency: [
    { label: 'Brand Activation ROI', value: '4.2x', change: '+0.8x', dir: 'up', sub: 'Experiential marketing avg', icon: Target, sparkKey: 'premium' },
    { label: 'Social Sentiment Index', value: '+72', change: '+8pts', dir: 'up', sub: 'Net positive across spirits', icon: Zap, sparkKey: 'nolo' },
    { label: 'Venue Sponsorship Spend', value: '$2.1B', change: '+18%', dir: 'up', sub: 'Global on-trade marketing', icon: DollarSign, sparkKey: 'premium' },
    { label: 'Creator Brand Velocity', value: '23M', change: '+45%', dir: 'up', sub: 'Consumers reached (Teremana model)', icon: Globe, sparkKey: 'market' },
    { label: 'Festival Circuit Impact', value: '$340M', change: '+22%', dir: 'up', sub: 'Coachella/Glastonbury tier', icon: BarChart3, sparkKey: 'ecomm' },
    { label: 'Gen Z Spirits Adoption', value: '34%', change: '+5pp', dir: 'up', sub: 'Weekly consumption rate', icon: TrendingUp, sparkKey: 'nolo' },
  ],
}

// ── Insight Briefing Data (Task 3: contextual slide-out) ──
const INSIGHT_BRIEFINGS = {
  'Global Spirits Market': {
    title: 'Global Spirits Market Intelligence Brief',
    summary: 'The global spirits market reached $635B in 2025, growing at 3.1% despite macroeconomic headwinds. Premiumisation continues to be the dominant theme, with super-premium and above segments growing at 6.8% versus mainstream at just 1.2%.',
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
  { key: 'tequila', name: 'Tequila & Mezcal', size: '$4.8B', growth: '+7.8%', dir: 'up', signal: 'Agave surplus may ease costs', trend: [{ v: 3.2 }, { v: 3.6 }, { v: 4.0 }, { v: 4.4 }, { v: 4.8 }], channels: { onTrade: 35, offTrade: 42, eComm: 12, travelRetail: 11 } },
  { key: 'vodka', name: 'Vodka', size: '$40.1B', growth: '-0.8%', dir: 'down', signal: 'Premiumization offsetting volume decline', trend: [{ v: 41.5 }, { v: 41.2 }, { v: 40.8 }, { v: 40.4 }, { v: 40.1 }], channels: { onTrade: 30, offTrade: 52, eComm: 10, travelRetail: 8 } },
  { key: 'whisky', name: 'Whisky (Global)', size: '$6.3B', growth: '+4.2%', dir: 'up', signal: 'Japanese whisky supply constraints', trend: [{ v: 5.1 }, { v: 5.4 }, { v: 5.7 }, { v: 6.0 }, { v: 6.3 }], channels: { onTrade: 33, offTrade: 40, eComm: 14, travelRetail: 13 } },
  { key: 'gin', name: 'Gin', size: '$14.2B', growth: '+1.2%', dir: 'up', signal: 'Growth plateauing post-boom', trend: [{ v: 12.8 }, { v: 13.5 }, { v: 13.9 }, { v: 14.0 }, { v: 14.2 }], channels: { onTrade: 38, offTrade: 40, eComm: 13, travelRetail: 9 } },
  { key: 'rum', name: 'Rum', size: '$15.8B', growth: '+3.1%', dir: 'up', signal: 'Premium dark rum accelerating', trend: [{ v: 13.8 }, { v: 14.2 }, { v: 14.8 }, { v: 15.3 }, { v: 15.8 }], channels: { onTrade: 34, offTrade: 44, eComm: 11, travelRetail: 11 } },
  { key: 'cognac', name: 'Cognac & Brandy', size: '$4.1B', growth: '-2.4%', dir: 'down', signal: 'China tariff impact persists', trend: [{ v: 4.8 }, { v: 4.6 }, { v: 4.4 }, { v: 4.2 }, { v: 4.1 }], channels: { onTrade: 28, offTrade: 38, eComm: 12, travelRetail: 22 } },
  { key: 'champagne', name: 'Champagne & Sparkling', size: '$7.2B', growth: '+2.8%', dir: 'up', signal: 'Prosecco growth offsetting Champagne softness', trend: [{ v: 6.2 }, { v: 6.5 }, { v: 6.8 }, { v: 7.0 }, { v: 7.2 }], channels: { onTrade: 40, offTrade: 35, eComm: 10, travelRetail: 15 } },
  { key: 'wine', name: 'Wine (Still)', size: '$38.2B', growth: '-1.2%', dir: 'down', signal: 'Structural volume decline continues', trend: [{ v: 40.1 }, { v: 39.5 }, { v: 39.0 }, { v: 38.6 }, { v: 38.2 }], channels: { onTrade: 32, offTrade: 50, eComm: 12, travelRetail: 6 } },
  { key: 'beer', name: 'Beer & Craft', size: '$623B', growth: '+1.4%', dir: 'up', signal: 'Craft consolidation wave', trend: [{ v: 590 }, { v: 600 }, { v: 608 }, { v: 615 }, { v: 623 }], channels: { onTrade: 45, offTrade: 42, eComm: 8, travelRetail: 5 } },
  { key: 'nolo', name: 'No/Low Alcohol', size: '$13B', growth: '+9.5%', dir: 'up', signal: 'Fastest-growing segment globally', trend: [{ v: 7.5 }, { v: 8.8 }, { v: 10.2 }, { v: 11.5 }, { v: 13 }], channels: { onTrade: 25, offTrade: 48, eComm: 20, travelRetail: 7 } },
  { key: 'rtd', name: 'RTD / Ready-to-Drink', size: '$40B', growth: '+8.2%', dir: 'up', signal: 'Maturing from explosive growth phase', trend: [{ v: 25 }, { v: 29 }, { v: 33 }, { v: 37 }, { v: 40 }], channels: { onTrade: 20, offTrade: 55, eComm: 18, travelRetail: 7 } },
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

// ── M&A Pipeline (forward-looking Q1-Q3 2026) ──
const MA_PIPELINE = [
  { target: 'Casamigos Expansion (new NOM)', acquirer: 'Diageo', dealValue: '~$350M', stage: 'Due Diligence', category: 'Tequila', likelihood: '80%', expectedClose: 'Q2 2026', significance: 'New production facility in Jalisco for Casamigos volume growth; vertical integration of agave supply during surplus' },
  { target: 'Lyre\'s Spirit Co (majority stake)', acquirer: 'Pernod Ricard', dealValue: '~$280M', stage: 'LOI Signed', category: 'Non-Alcoholic', likelihood: '75%', expectedClose: 'Q2 2026', significance: 'No/lo segment accelerating; Lyre\'s is category leader with 18 SKUs across 65 markets. Strategic hedge against alcohol moderation trend' },
  { target: 'Fever-Tree (remaining 71% stake)', acquirer: 'Diageo', dealValue: '~$2.8B', stage: 'Exploratory', category: 'Mixers & RTD', likelihood: '35%', expectedClose: 'H2 2026', significance: 'Vertical integration play; mixer + spirits bundling for DTC; Fever-Tree trading at 52-week low' },
  { target: 'BuzzBallz / Southern Champion', acquirer: 'Constellation Brands', dealValue: '~$1.1B', stage: 'Due Diligence', category: 'RTD', likelihood: '70%', expectedClose: 'Q3 2026', significance: 'RTD consolidation continues; BuzzBallz at $500M revenue run rate; fills gap in Constellation RTD portfolio' },
  { target: 'Kavalan Distillery (minority)', acquirer: 'LVMH Wines & Spirits', dealValue: '~$450M', stage: 'Exploratory', category: 'Whisky (Asian)', likelihood: '40%', expectedClose: 'H2 2026', significance: 'Asian whisky premiumisation; Kavalan winning world whisky awards; luxury portfolio expansion into Taiwan' },
  { target: 'East London Liquor Company', acquirer: 'Brown-Forman', dealValue: '~$85M', stage: 'LOI Signed', category: 'Craft Gin/Vodka', likelihood: '85%', expectedClose: 'Q1 2026', significance: 'UK craft acquisition; production facility in Bow; established on-trade presence in London top venues' },
  { target: 'Volcan De Mi Tierra (full acq.)', acquirer: 'LVMH (Mo\u00ebt Hennessy)', dealValue: '~$220M', stage: 'Due Diligence', category: 'Tequila', likelihood: '75%', expectedClose: 'Q2 2026', significance: 'LVMH deepening tequila portfolio; premium positioning ($65+ RRP); agave terroir narrative strengthening' },
  { target: 'Athletic Brewing Co', acquirer: 'AB InBev', dealValue: '~$800M', stage: 'Exploratory', category: 'Non-Alcoholic Beer', likelihood: '45%', expectedClose: 'H2 2026', significance: 'Non-alc beer segment growing +25% YoY; Athletic at $250M revenue; AB InBev needs to counter Heineken 0.0 momentum' },
]

// ── Historical M&A (completed deals 2020\u20132025) ──
const MA_HISTORY = {
  2025: [
    { target: 'Skrewball Peanut Butter Whiskey', acquirer: 'Pernod Ricard (completed full acq.)', dealValue: '~$700M', category: 'Flavored Whiskey', status: 'Closed Q1 2025', significance: 'Pernod expands US flavored spirits portfolio; validates flavored whiskey category at scale' },
    { target: 'Clase Azul (minority stake)', acquirer: 'Bacardi', dealValue: '~$500M', category: 'Ultra-Premium Tequila', status: 'Closed Q2 2025', significance: 'Bacardi enters ultra-premium tequila; luxury spirits valuations remain elevated' },
    { target: 'Hendrick\'s Gin (expanded distillery)', acquirer: 'William Grant & Sons', dealValue: '~$150M', category: 'Gin', status: 'Closed Q1 2025', significance: 'Internal expansion; doubled distilling capacity at Girvan site to meet Asian demand' },
    { target: 'Cano Water', acquirer: 'AG Barr', dealValue: '~$45M', category: 'Non-Alcoholic', status: 'Closed Q3 2025', significance: 'Mixer/hydration adjacency; sustainability branding premium; aluminium can format' },
    { target: 'Silent Pool Distillers', acquirer: 'Pernod Ricard', dealValue: '~$60M', category: 'Craft Gin', status: 'Closed Q2 2025', significance: 'UK craft gin consolidation continues; Surrey-based distillery with strong DTC channel' },
    { target: 'Elijah Craig (brand licensing)', acquirer: 'Heaven Hill (restructure)', dealValue: '~$320M', category: 'Bourbon', status: 'Closed Q4 2025', significance: 'Internal restructure; bourbon brand portfolio rationalisation amid inventory build-up' },
  ],
  2024: [
    { target: 'Proper No. Twelve Irish Whiskey', acquirer: 'Proximo Spirits', dealValue: '~$600M', category: 'Irish Whiskey', status: 'Closed Q1 2024', significance: 'Celebrity brand exits; Conor McGregor sells remaining stake; validates celebrity spirit model at exit' },
    { target: 'Aviation American Gin (full)', acquirer: 'Diageo (via Reynolds)', dealValue: '~$610M', category: 'Craft Gin', status: 'Closed Q2 2024', significance: 'Ryan Reynolds completes earn-out; Diageo now full owner; US craft gin market anchor brand' },
    { target: 'Monkey 47 (remaining stake)', acquirer: 'Pernod Ricard', dealValue: '~$180M', category: 'Premium Gin', status: 'Closed Q1 2024', significance: 'Full ownership after initial 2016 investment; Black Forest gin brand premium validated' },
    { target: 'Starward Whisky', acquirer: 'Diageo', dealValue: '~$120M', category: 'Australian Whisky', status: 'Closed Q3 2024', significance: 'Diageo expands New World whisky portfolio; Melbourne-based; wine barrel maturation IP' },
    { target: 'Howler Head Banana Bourbon', acquirer: 'Campari Group', dealValue: '~$95M', category: 'Flavored Bourbon', status: 'Closed Q2 2024', significance: 'Flavored spirits segment hot; UFC sponsorship tie-in drives volume in US on-trade' },
    { target: 'Fords Gin', acquirer: 'Brown-Forman', dealValue: '~$55M', category: 'London Dry Gin', status: 'Closed Q4 2024', significance: 'Bartender-credible brand; Simon Ford partnership; strong on-trade pull in US/UK' },
  ],
  2023: [
    { target: 'Skrewball Peanut Butter Whiskey (majority)', acquirer: 'Pernod Ricard', dealValue: '~$600M', category: 'Flavored Whiskey', status: 'Closed Q2 2023', significance: 'First major flavored whiskey acquisition; validates category potential; US volumes 1M+ cases' },
    { target: 'Código 1530 Tequila', acquirer: 'Diageo (from George Strait partnership)', dealValue: '~$400M', category: 'Premium Tequila', status: 'Closed Q3 2023', significance: 'Diageo tequila portfolio expansion; celebrity partnership model; rosa variant driving growth' },
    { target: 'Courvoisier Cognac', acquirer: 'Campari Group (from Beam Suntory)', dealValue: '$1.2B', category: 'Cognac', status: 'Closed Q1 2023', significance: 'Landmark cognac deal; Campari enters prestige brown spirits; US market dominance play' },
    { target: 'Diplomatico Rum', acquirer: 'Brown-Forman', dealValue: '~$800M', category: 'Premium Rum', status: 'Closed Q2 2023', significance: 'Super-premium rum category leader; Venezuelan provenance; 120+ markets distribution' },
    { target: 'Gin Mare', acquirer: 'Brown-Forman', dealValue: '~$200M', category: 'Mediterranean Gin', status: 'Closed Q1 2023', significance: 'Spanish origin gin; Mediterranean botanical profile; strong Southern Europe + LatAm presence' },
    { target: 'Sea Shepherd Conservation Rum', acquirer: 'Isle of Wight Distillery', dealValue: '~$8M', category: 'Craft Rum', status: 'Closed Q4 2023', significance: 'Sustainability-branded spirits micro-deal; signals cause-marketing in spirits sector' },
  ],
  2022: [
    { target: 'The Dalmore & Jura (revaluation)', acquirer: 'Whyte & Mackay / Philippines Emperador', dealValue: '$1.4B', category: 'Scotch Whisky', status: 'Closed Q1 2022', significance: 'Ultra-premium Scotch revaluation; Dalmore pricing power validated at $200+ per bottle' },
    { target: 'Rabbit Hole Bourbon (remaining)', acquirer: 'Pernod Ricard', dealValue: '~$250M', category: 'Craft Bourbon', status: 'Closed Q2 2022', significance: 'Pernod completes Kentucky bourbon portfolio; founder exits; craft-to-corporate transition' },
    { target: 'Grand Marnier (integration complete)', acquirer: 'Campari Group', dealValue: 'N/A (integration)', category: 'Liqueur', status: 'Completed 2022', significance: 'Full integration 6 years post-acquisition; synergies realised; brand repositioning complete' },
    { target: 'Cuervo (asset swap with Becle)', acquirer: 'Various portfolio swaps', dealValue: '~$300M', category: 'Tequila', status: 'Closed Q3 2022', significance: 'Distribution rights restructuring; Mexican tequila supply chain consolidation' },
    { target: 'Firestone & Robertson Distilling', acquirer: 'Pernod Ricard', dealValue: '~$130M', category: 'Texas Whiskey', status: 'Closed Q2 2022', significance: 'US regional whiskey play; Fort Worth distillery capacity; TX Blended Whiskey brand' },
    { target: 'Waterford Distillery (minority)', acquirer: 'Private Equity (Cathay Capital)', dealValue: '~$40M', category: 'Irish Whiskey', status: 'Closed Q4 2022', significance: 'Terroir-focused Irish whisky; single farm origin; PE backing for scale' },
  ],
  2021: [
    { target: 'Patr\u00f3n Tequila (integration complete)', acquirer: 'Bacardi', dealValue: 'N/A (2018 deal; integration)', category: 'Ultra-Premium Tequila', status: 'Integration completed 2021', significance: '$5.1B acquisition fully integrated; Bacardi now #1 in ultra-premium tequila globally' },
    { target: 'Chase Distillery', acquirer: 'Diageo', dealValue: '~$70M', category: 'Craft Vodka/Gin', status: 'Closed Q2 2021', significance: 'UK potato vodka pioneer; English terroir story; vertical integration (farm-to-bottle)' },
    { target: 'Fernet-Branca (US distribution rights)', acquirer: 'Sazerac Company', dealValue: '~$150M', category: 'Amaro/Bitters', status: 'Closed Q3 2021', significance: 'US bartender culture icon; amaro category growth +15%; distribution consolidation' },
    { target: 'Heaven\'s Door Whiskey', acquirer: 'Moët Hennessy (majority)', dealValue: '~$100M', category: 'Celebrity Whiskey', status: 'Closed Q1 2021', significance: 'Bob Dylan partnership; LVMH celebrity spirits strategy; Tennessee/straight bourbon blend' },
    { target: 'Belsazar Vermouth', acquirer: 'Diageo', dealValue: '~$45M', category: 'Vermouth/Aperitif', status: 'Closed Q2 2021', significance: 'German vermouth brand; aperitivo culture trend; Spritz serve growth in Northern Europe' },
    { target: 'BrewDog Distilling Co (minority)', acquirer: 'Private Equity', dealValue: '~$25M', category: 'Craft Spirits', status: 'Closed Q4 2021', significance: 'Craft beer brand extending to spirits; Lone Wolf gin/vodka; cross-category disruption model' },
  ],
  2020: [
    { target: 'Aviation Gin (initial)', acquirer: 'Diageo', dealValue: '~$335M', category: 'Celebrity Craft Gin', status: 'Closed Q3 2020', significance: 'Ryan Reynolds deal; established celebrity-spirit partnership template; up to $610M earn-out' },
    { target: 'Seedlip (majority)', acquirer: 'Diageo', dealValue: '~$100M', category: 'Non-Alcoholic Spirits', status: 'Closed Q1 2020', significance: 'First major no/lo acquisition; validated non-alcoholic spirits as legitimate category' },
    { target: 'Suntory (Beam Suntory restructure)', acquirer: 'Suntory Holdings', dealValue: 'N/A (restructure)', category: 'Japanese Whisky', status: 'Completed 2020', significance: 'Global spirits division restructured; Japanese whisky distribution overhauled; premium focus' },
    { target: 'De Kuyper (family buyback)', acquirer: 'De Kuyper Family', dealValue: '~$200M', category: 'Liqueurs/Genever', status: 'Closed Q2 2020', significance: 'Family regains full control; oldest distillery in Netherlands; cocktail culture revival play' },
    { target: 'Italicus Rosolio di Bergamotto', acquirer: 'Pernod Ricard', dealValue: '~$30M', category: 'Italian Liqueur', status: 'Closed Q4 2020', significance: 'Italian aperitivo trend; bartender-created brand; Calabrian bergamot provenance story' },
    { target: 'Empress 1908 Gin', acquirer: 'Diageo (via investment)', dealValue: '~$15M', category: 'Craft Gin', status: 'Closed Q3 2020', significance: 'Colour-changing butterfly pea gin; Instagram-driven brand; Canadian craft category entry' },
  ],
}

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

// ── KPI Card with Micro-Chart (Task 3: clickable for briefing) ──
function KpiCard({ kpi, onBriefingClick }) {
  const Icon = kpi.icon
  const isUp = kpi.dir === 'up'
  const sparkData = KPI_TRENDS[kpi.sparkKey] || []
  const hasBriefing = !!INSIGHT_BRIEFINGS[kpi.label]
  return (
    <div
      onClick={() => hasBriefing && onBriefingClick && onBriefingClick(kpi.label)}
      className={`bg-white rounded-xl border border-gray-100 p-3 hover:shadow-md transition-shadow relative overflow-hidden ${hasBriefing ? 'cursor-pointer group' : ''}`}
    >
      {hasBriefing && (
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
          <BookOpen size={10} className="text-gold" />
        </div>
      )}
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
    <Link to={`/category/${cat.key}`} className="flex items-center gap-2 px-3 py-2 border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors cursor-pointer group no-underline">
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
    </Link>
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
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 mb-2 pt-2 border-t border-gray-100 text-[10px]">
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

// \u2500\u2500 M&A Pipeline + Historical (with year tabs) \u2500\u2500
function MAPipeline() {
  const [activeTab, setActiveTab] = useState('pipeline')
  const [historyYear, setHistoryYear] = useState(2025)
  const historyYears = [2025, 2024, 2023, 2022, 2021, 2020]
  const historyDeals = MA_HISTORY[historyYear] || []

  return (
    <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
      <div className="px-3 py-2 border-b border-gray-100">
        <div className="flex items-center justify-between mb-2">
          <div>
            <h3 className="font-semibold text-sm text-navy">M&A Intelligence</h3>
            <p className="text-[10px] text-gray-500">Pipeline, completed deals & strategic consolidation</p>
          </div>
          <span className="text-[10px] font-bold bg-purple-50 text-purple-600 px-2 py-0.5 rounded-full">
            {activeTab === 'pipeline' ? `${MA_PIPELINE.length} active` : `${historyDeals.length} deals`}
          </span>
        </div>
        <div className="flex gap-1">
          <button onClick={() => setActiveTab('pipeline')} className={`px-2.5 py-1 rounded text-[10px] font-semibold transition-colors ${activeTab === 'pipeline' ? 'bg-navy text-white' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}>
            2026 Pipeline
          </button>
          <button onClick={() => setActiveTab('history')} className={`px-2.5 py-1 rounded text-[10px] font-semibold transition-colors ${activeTab === 'history' ? 'bg-navy text-white' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}>
            Completed Deals
          </button>
        </div>
        {activeTab === 'history' && (
          <div className="flex gap-1 mt-2">
            {historyYears.map(yr => (
              <button key={yr} onClick={() => setHistoryYear(yr)} className={`px-2 py-0.5 rounded text-[10px] font-medium transition-colors ${historyYear === yr ? 'bg-gold text-white' : 'bg-gray-50 text-gray-500 hover:bg-gray-100'}`}>
                {yr}
              </button>
            ))}
          </div>
        )}
      </div>

      {activeTab === 'pipeline' && (
        <div className="divide-y divide-gray-50">
          {MA_PIPELINE.map((deal, i) => {
            const pct = parseInt(deal.likelihood)
            const color = pct > 70 ? 'text-green-600' : pct >= 40 ? 'text-amber-600' : 'text-red-500'
            return (
              <div key={i} className="px-3 py-2 hover:bg-gray-50/50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-xs text-navy truncate">{deal.target}</div>
                    <div className="text-[10px] text-gray-400">{deal.acquirer} {'\\u2022'} {deal.dealValue}</div>
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
                {deal.significance && <p className="text-[10px] text-gray-500 mt-1 leading-relaxed">{deal.significance}</p>}
              </div>
            )
          })}
        </div>
      )}

      {activeTab === 'history' && (
        <div className="divide-y divide-gray-50">
          {historyDeals.map((deal, i) => (
            <div key={i} className="px-3 py-2 hover:bg-gray-50/50 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-xs text-navy truncate">{deal.target}</div>
                  <div className="text-[10px] text-gray-400">{deal.acquirer} {'\\u2022'} {deal.dealValue}</div>
                </div>
                <span className="text-[9px] bg-green-50 text-green-700 px-1.5 py-0.5 rounded font-medium">{deal.status}</span>
              </div>
              <div className="flex gap-2 mt-1">
                <span className="text-[9px] bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded">{deal.category}</span>
              </div>
              {deal.significance && <p className="text-[10px] text-gray-500 mt-1 leading-relaxed">{deal.significance}</p>}
            </div>
          ))}
          {historyDeals.length === 0 && (
            <div className="py-6 text-center text-xs text-gray-400">No deals recorded for {historyYear}</div>
          )}
          <div className="px-3 py-2 bg-gray-50 text-center">
            <span className="text-[9px] text-gray-400">
              Total {historyYear}: {historyDeals.length} deals {'\\u2022'} ~${(historyDeals.reduce((s, d) => s + (parseFloat(d.dealValue.replace(/[^0-9.]/g, '')) || 0), 0) / 1000).toFixed(1)}B+ aggregate value
            </span>
          </div>
        </div>
      )}
    </div>
  )
}

// \u2500\u2500 Competitor Alerts (compact) \u2500\u2500 ──
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
              {alert.actionRequired && <AgencyCounterCTA alert={alert} />}
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
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-1.5 mb-3">
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
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
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
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 md:grid-cols-6 gap-2">
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

// ── Insight Briefing Slide-Out (Task 3) ──
function InsightBriefing({ briefing, onClose }) {
  if (!briefing) return null
  return (
    <>
      <div className="fixed inset-0 bg-black/30 z-50" onClick={onClose} />
      <div className="fixed right-0 top-0 bottom-0 w-full max-w-lg bg-white z-50 shadow-2xl overflow-y-auto animate-fadeIn">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-5 py-4 flex items-center justify-between z-10">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-navy/10 rounded-lg">
              <BookOpen size={16} className="text-navy" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-navy">Intelligence Brief</h3>
              <p className="text-[10px] text-gray-400">Auto-generated executive summary</p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <button onClick={() => { navigator.clipboard.writeText(`${briefing.title}\n\n${briefing.summary}\n\n${briefing.keyPoints.join('\n')}\n\n${briefing.actionable}`) }} className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-navy transition-colors" title="Copy to clipboard">
              <Copy size={14} />
            </button>
            <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-navy transition-colors">
              <X size={16} />
            </button>
          </div>
        </div>
        <div className="p-5 space-y-5">
          <div>
            <h2 className="font-display text-lg text-navy mb-2">{briefing.title}</h2>
            <p className="text-sm text-gray-700 leading-relaxed">{briefing.summary}</p>
          </div>
          <div>
            <h4 className="text-xs font-bold text-navy mb-2 flex items-center gap-1.5">
              <Lightbulb size={12} className="text-gold" />
              Key Intelligence Points
            </h4>
            <div className="space-y-2">
              {briefing.keyPoints.map((point, i) => (
                <div key={i} className="flex gap-2 text-xs text-gray-700 bg-gray-50 rounded-lg p-3">
                  <span className="text-gold font-bold mt-0.5">{i + 1}.</span>
                  <span className="leading-relaxed">{point}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-gold/5 border border-gold/20 rounded-xl p-4">
            <h4 className="text-xs font-bold text-navy mb-1.5 flex items-center gap-1.5">
              <Target size={12} className="text-gold" />
              Actionable Recommendation
            </h4>
            <p className="text-xs text-navy leading-relaxed">{briefing.actionable}</p>
          </div>
          <div>
            <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-wide mb-1.5">Sources</h4>
            <div className="flex flex-wrap gap-1.5">
              {briefing.sources.map((src, i) => (
                <span key={i} className="text-[10px] bg-gray-100 text-gray-600 px-2 py-1 rounded-full">{src}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

// ── Agency CTA Button (Task 4) ──
function AgencyCounterCTA({ alert }) {
  const [showBrief, setShowBrief] = useState(false)
  return (
    <>
      <button
        onClick={() => setShowBrief(true)}
        className="flex items-center gap-1 text-[9px] font-bold text-white bg-navy hover:bg-navy-light px-2 py-1 rounded-md transition-colors mt-1"
      >
        <ShieldAlert size={10} />
        Commission Counter-Strategy
      </button>
      {showBrief && (
        <>
          <div className="fixed inset-0 bg-black/30 z-50" onClick={() => setShowBrief(false)} />
          <div className="fixed right-0 top-0 bottom-0 w-full max-w-lg bg-white z-50 shadow-2xl overflow-y-auto animate-fadeIn">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-5 py-4 flex items-center justify-between z-10">
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-red-100 rounded-lg">
                  <ShieldAlert size={16} className="text-red-600" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-navy">Counter-Strategy Brief</h3>
                  <p className="text-[10px] text-gray-400">Competitive response framework</p>
                </div>
              </div>
              <button onClick={() => setShowBrief(false)} className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-navy transition-colors">
                <X size={16} />
              </button>
            </div>
            <div className="p-5 space-y-4">
              <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                <div className="text-[10px] font-bold text-red-600 uppercase mb-1">Threat</div>
                <h2 className="text-sm font-bold text-navy mb-1">{alert.company}: {alert.alert}</h2>
                <p className="text-xs text-gray-700">{alert.impact}</p>
              </div>
              <div>
                <h4 className="text-xs font-bold text-navy mb-2">Recommended Counter-Moves</h4>
                <div className="space-y-2">
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="text-[10px] font-bold text-gold mb-0.5">Immediate (0-30 days)</div>
                    <p className="text-xs text-gray-700">Audit your exposure in affected markets. Map which of your accounts, territories, or channels overlap with {alert.company}{"'"}s move. Brief your sales team on the competitive shift.</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="text-[10px] font-bold text-gold mb-0.5">Tactical (30-90 days)</div>
                    <p className="text-xs text-gray-700">Develop differentiated positioning that {alert.company} cannot replicate at scale. Consider exclusive partnerships, limited editions, or channel-specific activations that play to agility over scale.</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="text-[10px] font-bold text-gold mb-0.5">Strategic (90+ days)</div>
                    <p className="text-xs text-gray-700">Evaluate whether this competitive shift opens adjacent opportunities. Large player moves often create vacuums in underserved segments. Position for the rebalancing.</p>
                  </div>
                </div>
              </div>
              <div className="bg-navy/5 border border-navy/10 rounded-xl p-4">
                <div className="text-[10px] font-bold text-navy mb-1 flex items-center gap-1">
                  <Briefcase size={10} className="text-gold" />
                  Liquid Creative Services
                </div>
                <p className="text-xs text-gray-700">Need a full competitive response campaign? Our strategy team can build a bespoke counter-positioning deck, activation plan, and media strategy. Contact us at <a href="mailto:palmer.liquid.studio@gmail.com" className="text-navy font-semibold underline">palmer.liquid.studio@gmail.com</a></p>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  )
}

// ══════════════════════════════════════════════════════════
// MAIN PAGE
// ══════════════════════════════════════════════════════════
// \u2500\u2500 Persona Definitions \u2500\u2500
const PERSONAS = {
  all: { label: 'Full Dashboard', icon: '\ud83c\udf0d', desc: 'All sections visible', sections: ['summary', 'live-feed', 'kpis', 'signals-categories-regions', 'watchlist', 'opportunities', 'digest', 'ma-alerts', 'benchmarks'] },
  ceo: { label: 'CEO / Investor', icon: '\ud83d\udcc8', desc: 'Market KPIs, M&A, valuations', sections: ['summary', 'live-feed', 'kpis', 'ma-alerts', 'signals-categories-regions', 'benchmarks', 'watchlist', 'opportunities', 'digest'] },
  brand: { label: 'Brand Manager', icon: '\ud83c\udfaf', desc: 'Categories, pricing, venues', sections: ['summary', 'live-feed', 'signals-categories-regions', 'kpis', 'opportunities', 'watchlist', 'digest', 'ma-alerts', 'benchmarks'] },
  supply: { label: 'Supply Chain', icon: '\ud83d\udce6', desc: 'COGS, freight, climate risk', sections: ['summary', 'live-feed', 'kpis', 'watchlist', 'benchmarks', 'signals-categories-regions', 'ma-alerts', 'opportunities', 'digest'] },
  startup: { label: 'Startup Founder', icon: '\ud83d\ude80', desc: 'Launch readiness, margins, POS', sections: ['summary', 'live-feed', 'kpis', 'opportunities', 'signals-categories-regions', 'digest', 'watchlist', 'ma-alerts', 'benchmarks'] },
  agency: { label: 'Agency Strategist', icon: '\ud83c\udfa8', desc: 'Venues, trends, brand positioning', sections: ['summary', 'live-feed', 'signals-categories-regions', 'opportunities', 'kpis', 'digest', 'watchlist', 'ma-alerts', 'benchmarks'] },
}

function PersonaSelector({ persona, onChange }) {
  return (
    <div className="flex gap-1.5 flex-wrap">
      {Object.entries(PERSONAS).map(([key, p]) => (
        <button key={key} onClick={() => onChange(key)}
          className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[10px] font-medium transition-all border ${
            persona === key
              ? 'bg-navy text-white border-navy shadow-sm'
              : 'bg-white text-gray-500 border-gray-200 hover:border-navy/30 hover:text-navy'
          }`}>
          <span className="text-sm">{p.icon}</span>
          <span>{p.label}</span>
        </button>
      ))}
    </div>
  )
}

export default function CommandCentre() {
  const [signalsExpanded, setSignalsExpanded] = useState(false)
  const [activeBriefing, setActiveBriefing] = useState(null)
  const [persona, setPersona] = useState(() => {
    try { return localStorage.getItem('le_persona') || 'all' } catch { return 'all' }
  })
  const displaySignals = signalsExpanded ? MARKET_SIGNALS : MARKET_SIGNALS.slice(0, 3)

  const handlePersonaChange = (p) => {
    setPersona(p)
    try { localStorage.setItem('le_persona', p) } catch {}
  }

  const handleBriefingClick = useCallback((label) => {
    const briefing = INSIGHT_BRIEFINGS[label]
    if (briefing) setActiveBriefing(briefing)
  }, [])

  const currentPersona = PERSONAS[persona] || PERSONAS.all
  const personaKpis = PERSONA_KPIS[persona] || MARKET_KPIS

  const sectionMap = {
    'summary': <SummaryStrip key="summary" />,
    'live-feed': null, // Rendered separately as sidebar
    'kpis': (
      <div key="kpis">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-[10px] font-bold text-gold uppercase tracking-wide">{currentPersona.label} KPIs</h2>
          <span className="text-[9px] text-gray-400">Click any metric for detailed brief</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {personaKpis.map((kpi, i) => <KpiCard key={`${persona}-${i}`} kpi={kpi} onBriefingClick={handleBriefingClick} />)}
        </div>
      </div>
    ),
    'signals-categories-regions': (
      <div key="scr" className="grid grid-cols-1 lg:grid-cols-12 gap-4">
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
    ),
    'watchlist': <KeyMetricsWatchlist key="watchlist" />,
    'opportunities': (
      <div key="opps">
        <h2 className="font-display text-sm text-navy flex items-center gap-1.5 mb-3">
          <Target size={14} className="text-gold" />
          Strategic Opportunities
        </h2>
        <StrategicOpportunities />
      </div>
    ),
    'digest': <WeeklyDigestSection key="digest" />,
    'ma-alerts': (
      <div key="ma-alerts" className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <MAPipeline />
        <CompetitorAlerts />
      </div>
    ),
    'benchmarks': <PerformanceBenchmarks key="benchmarks" />,
  }

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl text-navy">Command Centre</h1>
          <p className="text-gray-500 text-xs mt-0.5">Global beverage alcohol intelligence {'\u2014'} curated daily</p>
        </div>
        <div className="text-right">
          <div className="text-[10px] text-gray-400">Last updated</div>
          <div className="text-xs font-medium text-navy">Feb 26, 2026 14:30 GMT</div>
        </div>
      </div>

      {/* Persona Selector */}
      <div className="flex items-center gap-3">
        <span className="text-[10px] font-medium text-gray-400 flex-shrink-0">View as:</span>
        <PersonaSelector persona={persona} onChange={handlePersonaChange} />
      </div>

      {/* Main content with live feed sidebar */}
      <div className="flex gap-4">
        {/* Primary content */}
        <div className="flex-1 min-w-0 space-y-5">
          {currentPersona.sections.filter(id => id !== 'live-feed').map(sectionId => sectionMap[sectionId])}
        </div>
        {/* Live Feed sidebar — right side */}
        {currentPersona.sections.includes('live-feed') && (
          <div className="hidden xl:block w-80 flex-shrink-0">
            <div className="sticky top-6">
              <LiveFeed maxItems={12} compact={true} />
            </div>
          </div>
        )}
      </div>

      {/* Insight Briefing Slide-Out (Task 3) */}
      <InsightBriefing briefing={activeBriefing} onClose={() => setActiveBriefing(null)} />
    </div>
  )
}
