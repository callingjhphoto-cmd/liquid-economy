import React, { useState } from 'react'
import {
  TrendingUp, TrendingDown, Activity, AlertTriangle, Calendar,
  Globe, BarChart3, Zap, ArrowUpRight, ArrowDownRight, ExternalLink,
  Clock, Target, DollarSign, Percent, ChevronDown, ChevronUp
} from 'lucide-react'
import KeyMetricsWatchlist from '../components/KeyMetricsWatchlist'

// ── Market KPIs ──
const MARKET_KPIS = [
  { label: 'Global Spirits Market', value: '$635B', change: '+3.1%', dir: 'up', sub: 'IWSR 2025 estimate', icon: Globe },
  { label: 'Sector Avg P/E', value: '22.4x', change: '-0.8x', dir: 'down', sub: 'Across 14 public companies', icon: BarChart3 },
  { label: 'Premium Segment Growth', value: '+6.8%', change: '+1.2pp', dir: 'up', sub: 'Super-premium & above', icon: TrendingUp },
  { label: 'No/Low Alcohol Growth', value: '+7.5%', change: '+0.3pp', dir: 'up', sub: 'Fastest macro trend', icon: Zap },
  { label: 'E-Commerce Penetration', value: '14.2%', change: '+2.1pp', dir: 'up', sub: 'Of total off-trade value', icon: Target },
  { label: 'COGS Pressure Index', value: '62/100', change: '+4pts', dir: 'up', sub: 'Freight & glass driving', icon: DollarSign },
]

// ── Market Signals ──
const MARKET_SIGNALS = [
  { type: 'M&A', urgency: 'high', headline: 'Diageo announces \u00A33B share buyback program', date: 'Feb 20, 2026', source: 'FT', impact: 'Signals confidence in cash generation; may pressure peers to return capital' },
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

// ── Category Snapshot ──
const CATEGORY_SNAPSHOT = [
  { name: 'Tequila & Mezcal', size: '$4.8B', growth: '+7.8%', dir: 'up', signal: 'Agave surplus may ease costs' },
  { name: 'Vodka', size: '$40.1B', growth: '-0.8%', dir: 'down', signal: 'Premiumization offsetting volume decline' },
  { name: 'Whisky (Global)', size: '$6.3B exports', growth: '+4.2%', dir: 'up', signal: 'Japanese whisky supply constraints' },
  { name: 'Gin', size: '$14.2B', growth: '+1.2%', dir: 'up', signal: 'Growth plateauing post-boom' },
  { name: 'Rum', size: '$15.8B', growth: '+3.1%', dir: 'up', signal: 'Premium dark rum accelerating' },
  { name: 'Cognac & Brandy', size: '$4.1B', growth: '-2.4%', dir: 'down', signal: 'China tariff impact persists' },
  { name: 'Champagne & Sparkling', size: '$7.2B', growth: '+2.8%', dir: 'up', signal: 'Prosecco growth offsetting Champagne softness' },
  { name: 'Wine (Still)', size: '$38.2B', growth: '-1.2%', dir: 'down', signal: 'Structural volume decline continues' },
  { name: 'Beer & Craft', size: '$623B', growth: '+1.4%', dir: 'up', signal: 'Craft consolidation wave' },
  { name: 'RTD / Ready-to-Drink', size: '$40B', growth: '+8.2%', dir: 'up', signal: 'Maturing from explosive growth phase' },
]

// ── Regional Pulse ──
const REGIONAL_PULSE = [
  { region: 'North America', flag: '\ud83c\uddfa\ud83c\uddf8', value: '$98B', growth: '+2.8%', dir: 'up', note: 'Premium spirits + RTD driving' },
  { region: 'Europe', flag: '\ud83c\uddea\ud83c\uddfa', value: '$142B', growth: '+0.9%', dir: 'up', note: 'Labeling regulation headwinds' },
  { region: 'Asia-Pacific', flag: '\ud83c\uddef\ud83c\uddf5', value: '$210B', growth: '+4.1%', dir: 'up', note: 'India & SE Asia fastest' },
  { region: 'Latin America', flag: '\ud83c\udde7\ud83c\uddf7', value: '$52B', growth: '+3.5%', dir: 'up', note: 'Tequila export boom' },
  { region: 'Middle East & Africa', flag: '\ud83c\udde6\ud83c\uddea', value: '$18B', growth: '+5.2%', dir: 'up', note: 'Travel retail & non-alc growth' },
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
  {
    target: 'Skrewball Peanut Butter Whiskey',
    acquirer: 'Pernod Ricard',
    dealValue: '~$600M',
    stage: 'Due Diligence',
    category: 'Flavored Whiskey',
    likelihood: '75%',
    expectedClose: 'Q2 2026',
    significance: 'Consolidation of trendy, high-growth RTD-adjacent category; validates mass-market innovation'
  },
  {
    target: 'Fever-Tree (minority stake)',
    acquirer: 'Diageo',
    dealValue: '~$1.2B',
    stage: 'Exploratory',
    category: 'Mixers & RTD',
    likelihood: '40%',
    expectedClose: 'H2 2026',
    significance: 'Strategic for RTD bundling; tightens vertical integration; mixer category consolidating'
  },
  {
    target: 'Waterloo Sparkling Water',
    acquirer: 'AB InBev',
    dealValue: '~$180M',
    stage: 'LOI Signed',
    category: 'Non-Alcoholic',
    likelihood: '85%',
    expectedClose: 'Q1 2026',
    significance: 'Large cap entering no/lo category; validates growth thesis; margins-focused play'
  },
  {
    target: 'Proper No. Twelve Irish Whiskey',
    acquirer: 'Diageo',
    dealValue: '~$750M',
    stage: 'Finalized',
    category: 'Irish Whiskey',
    likelihood: '100%',
    expectedClose: 'Q1 2026',
    significance: 'Already closed; celebrity brand + supply chain = strategic value; Irish whiskey consolidation'
  },
  {
    target: 'Navan Cognac (minority)',
    acquirer: 'LVMH Wines & Spirits',
    dealValue: '~$400M',
    stage: 'Due Diligence',
    category: 'Cognac',
    likelihood: '70%',
    expectedClose: 'Q2 2026',
    significance: 'Luxury spirits consolidation; ultra-premium brandy strengthening; portfolio deepening'
  },
  {
    target: 'Rebellion Distillery',
    acquirer: 'Brown-Forman',
    dealValue: '~$220M',
    stage: 'LOI Signed',
    category: 'Craft Whiskey',
    likelihood: '80%',
    expectedClose: 'Q1 2026',
    significance: 'Mid-tier craft consolidation wave; scale economics; production capacity play'
  },
  {
    target: 'Tequila Casa Julio',
    acquirer: 'Becle (Diageo partnership)',
    dealValue: '~$115M',
    stage: 'Due Diligence',
    category: 'Tequila',
    likelihood: '65%',
    expectedClose: 'Q2 2026',
    significance: 'Super-premium tequila consolidation; agave supply security; portfolio breadth'
  },
  {
    target: 'Sake brewery Gekkeikan (stake)',
    acquirer: 'Constellation Brands',
    dealValue: '~$180M',
    stage: 'Exploratory',
    category: 'Sake/Spirits',
    likelihood: '35%',
    expectedClose: 'H2 2026',
    significance: 'Asian spirits play; production control; premium origin story; diversification'
  },
]

// ── Competitor Alerts ──
const COMPETITOR_ALERTS = [
  {
    company: 'Diageo',
    alert: 'Launches DTC platform in US with direct shipping to 42 states',
    impact: 'Premium margin capture; direct consumer data; traditional distributor channel pressure',
    date: 'Feb 22, 2026',
    severity: 'critical',
    actionRequired: true
  },
  {
    company: 'Pernod Ricard',
    alert: 'Acquires exclusive distribution rights in India; 45 SKUs across portfolio',
    impact: 'India market consolidation; barrier to entry for mid-tier brands; growth market controlled',
    date: 'Feb 20, 2026',
    severity: 'critical',
    actionRequired: true
  },
  {
    company: 'Brown-Forman',
    alert: 'Increases marketing spend 15% YoY (up $80M); focus on emerging gen Z brands',
    impact: 'Competitive intensity rising; CPA escalation expected across digital channels',
    date: 'Feb 18, 2026',
    severity: 'warning',
    actionRequired: false
  },
  {
    company: 'Bacardi',
    alert: 'Partners with major US festival circuit (Coachella, Outside Lands, Governors Ball)',
    impact: 'Brand sampling at scale; experiential marketing trend; younger demographic capture',
    date: 'Feb 16, 2026',
    severity: 'warning',
    actionRequired: true
  },
  {
    company: 'Campari',
    alert: 'Enters distribution agreement with largest Japanese importer; 150 point-of-sale expansion',
    impact: 'Japan on-trade consolidation; competitive shelf space pressure; Asia-Pacific footprint strengthened',
    date: 'Feb 14, 2026',
    severity: 'info',
    actionRequired: false
  },
  {
    company: 'LVMH Wines & Spirits',
    alert: 'Creates new ultra-premium division; targeting $5B+ spirits by 2030',
    impact: 'Luxury market consolidation; margin compression in ultra-premium segment; strategic focus intensifying',
    date: 'Feb 12, 2026',
    severity: 'warning',
    actionRequired: true
  },
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
    { category: 'Cognac', move: 'China duty reduction discussions under way; unlikely near-term relief', impact: 'Export pressure persists; REY Cointreau exposure remains high' }
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
  {
    metric: 'Gross Margin',
    industryAvg: '55%',
    topQuartile: '68%',
    bottomQuartile: '42%',
    yourTarget: '60%',
    unit: '%'
  },
  {
    metric: 'Marketing as % of Revenue',
    industryAvg: '22%',
    topQuartile: '28%',
    bottomQuartile: '15%',
    yourTarget: '20%',
    unit: '%'
  },
  {
    metric: 'Distribution Points per SKU',
    industryAvg: '2400',
    topQuartile: '5200',
    bottomQuartile: '1100',
    yourTarget: '3500',
    unit: 'outlets'
  },
  {
    metric: 'COGS as % of Revenue',
    industryAvg: '45%',
    topQuartile: '32%',
    bottomQuartile: '58%',
    yourTarget: '40%',
    unit: '%'
  },
  {
    metric: 'Revenue per Full-Time Employee',
    industryAvg: '$850K',
    topQuartile: '$1.2M',
    bottomQuartile: '$520K',
    yourTarget: '$950K',
    unit: '$K'
  },
  {
    metric: 'Inventory Turns (per year)',
    industryAvg: '4.2x',
    topQuartile: '6.1x',
    bottomQuartile: '2.8x',
    yourTarget: '5.0x',
    unit: 'turns'
  },
  {
    metric: 'Brand Awareness (Premium Segment)',
    industryAvg: '28%',
    topQuartile: '52%',
    bottomQuartile: '12%',
    yourTarget: '35%',
    unit: '%'
  },
  {
    metric: 'Customer Acquisition Cost',
    industryAvg: '$45',
    topQuartile: '$28',
    bottomQuartile: '$68',
    yourTarget: '$38',
    unit: '$'
  },
]
// ── Components ──
function KpiCard({ kpi }) {
  const Icon = kpi.icon
  const isUp = kpi.dir === 'up'
  return (
    <div className="bg-white rounded-xl border border-gray-100 p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div className="p-2 rounded-lg bg-navy/5">
          <Icon size={18} className="text-navy" />
        </div>
        <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full ${isUp ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
          {isUp ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
          {kpi.change}
        </span>
      </div>
      <div className="mt-3">
        <div className="text-2xl font-bold text-navy">{kpi.value}</div>
        <div className="text-sm font-medium text-gray-700 mt-0.5">{kpi.label}</div>
        <div className="text-xs text-gray-400 mt-1">{kpi.sub}</div>
      </div>
    </div>
  )
}

function SignalRow({ signal }) {
  const urgencyColors = {
    high: 'bg-red-100 text-red-700',
    medium: 'bg-amber-100 text-amber-700',
    low: 'bg-blue-100 text-blue-700',
  }
  const typeColors = {
    'M&A': 'bg-purple-50 text-purple-600',
    'Regulation': 'bg-orange-50 text-orange-600',
    'Supply': 'bg-green-50 text-green-600',
    'Trade': 'bg-red-50 text-red-600',
    'Category': 'bg-blue-50 text-blue-600',
  }
  return (
    <div className="bg-white rounded-lg border border-gray-100 p-4 hover:shadow-sm transition-shadow">
      <div className="flex items-center gap-2 mb-2">
        <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${urgencyColors[signal.urgency]}`}>
          {signal.urgency}
        </span>
        <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${typeColors[signal.type] || 'bg-gray-50 text-gray-600'}`}>
          {signal.type}
        </span>
        <span className="text-[10px] text-gray-400 ml-auto">{signal.date}</span>
      </div>
      <h4 className="text-sm font-semibold text-navy leading-snug">{signal.headline}</h4>
      <p className="text-xs text-gray-500 mt-1.5 leading-relaxed">{signal.impact}</p>
      <div className="text-[10px] text-gray-400 mt-2">Source: {signal.source}</div>
    </div>
  )
}

function EventRow({ evt }) {
  const typeColor = evt.type === 'Earnings' ? 'text-editorial bg-blue-50' : 'text-gold bg-gold/10'
  return (
    <div className="flex items-center gap-3 p-3 border-b border-gray-50 last:border-0">
      <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${typeColor}`}>{evt.date}</span>
      <div className="flex-1 min-w-0">
        <div className="text-sm font-medium text-navy truncate">{evt.company}</div>
        <div className="text-xs text-gray-500">{evt.event}</div>
      </div>
      <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${evt.type === 'Earnings' ? 'bg-blue-50 text-blue-600' : 'bg-amber-50 text-amber-600'}`}>
        {evt.type}
      </span>
    </div>
  )
}

function CategoryRow({ cat }) {
  const isUp = cat.dir === 'up'
  return (
    <div className="flex items-center gap-3 p-3 border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors">
      <div className="flex-1 min-w-0">
        <div className="text-sm font-medium text-navy">{cat.name}</div>
        <div className="text-xs text-gray-400 truncate">{cat.signal}</div>
      </div>
      <div className="text-right">
        <div className="text-sm font-semibold text-navy">{cat.size}</div>
        <span className={`text-xs font-medium ${isUp ? 'text-green-600' : 'text-red-500'}`}>
          {cat.growth}
        </span>
      </div>
    </div>
  )
}

function RegionRow({ r }) {
  const isUp = r.dir === 'up'
  return (
    <div className="flex items-center gap-3 p-3 border-b border-gray-50 last:border-0">
      <span className="text-xl">{r.flag}</span>
      <div className="flex-1 min-w-0">
        <div className="text-sm font-medium text-navy">{r.region}</div>
        <div className="text-xs text-gray-400 truncate">{r.note}</div>
      </div>
      <div className="text-right">
        <div className="text-sm font-semibold text-navy">{r.value}</div>
        <span className={`text-xs font-medium ${isUp ? 'text-green-600' : 'text-red-500'}`}>
          {r.growth}
        </span>
      </div>
    </div>
  )
}


// ── Strategic Opportunities Component ──
function StrategicOpportunities() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {STRATEGIC_OPPORTUNITIES.map((opp, i) => (
        <div key={i} className="bg-white rounded-lg border border-gray-100 p-4 hover:shadow-md transition-shadow">
          <div className="flex items-start justify-between mb-2">
            <h3 className="font-semibold text-sm text-navy flex-1">{opp.title}</h3>
            <span className="text-[10px] font-bold bg-blue-50 text-blue-600 px-2 py-0.5 rounded whitespace-nowrap ml-2">{opp.category}</span>
          </div>
          <p className="text-xs text-gray-600 leading-relaxed mb-3">{opp.opportunity}</p>
          <div className="space-y-2 mb-3 pt-3 border-t border-gray-100">
            <div className="flex justify-between text-xs">
              <span className="text-gray-500">Timeframe:</span>
              <span className="font-medium text-navy">{opp.timeframe}</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-gray-500">Investment:</span>
              <span className="font-medium text-navy">{opp.investmentLevel}</span>
            </div>
          </div>
          <div className="flex gap-2 mb-3">
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${opp.potentialReturn === 'Very High' ? 'bg-green-100 text-green-700' : opp.potentialReturn === 'High' ? 'bg-green-50 text-green-600' : 'bg-amber-50 text-amber-600'}`}>
              Return: {opp.potentialReturn}
            </span>
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${opp.riskLevel === 'High' ? 'bg-red-100 text-red-700' : opp.riskLevel === 'Medium' ? 'bg-orange-50 text-orange-600' : 'bg-blue-50 text-blue-600'}`}>
              Risk: {opp.riskLevel}
            </span>
          </div>
          <p className="text-[11px] text-gray-500 italic border-t border-gray-100 pt-2">{opp.rationale}</p>
        </div>
      ))}
    </div>
  )
}

// ── M&A Pipeline Component ──
function MAPipeline() {
  return (
    <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
      <div className="p-4 border-b border-gray-100">
        <h3 className="font-semibold text-navy">M&A Pipeline</h3>
        <p className="text-xs text-gray-500 mt-1">Active deals & strategic consolidation</p>
      </div>
      <div className="divide-y divide-gray-100">
        {MA_PIPELINE.map((deal, i) => {
          const likelihoodColor = parseInt(deal.likelihood) > 70 ? 'bg-green-50 text-green-700' : parseInt(deal.likelihood) >= 40 ? 'bg-amber-50 text-amber-700' : 'bg-red-50 text-red-700'
          return (
            <div key={i} className="p-4 hover:bg-gray-50/50 transition-colors">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <div className="font-medium text-sm text-navy">{deal.target}</div>
                  <div className="text-xs text-gray-500 mt-0.5">{deal.acquirer}</div>
                </div>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${likelihoodColor}`}>
                  {deal.likelihood} likely
                </span>
              </div>
              <div className="grid grid-cols-3 gap-2 text-xs mt-2 pb-2 border-b border-gray-100">
                <div>
                  <span className="text-gray-500">Value:</span>
                  <div className="font-medium text-navy">{deal.dealValue}</div>
                </div>
                <div>
                  <span className="text-gray-500">Stage:</span>
                  <div className="font-medium text-navy">{deal.stage}</div>
                </div>
                <div>
                  <span className="text-gray-500">Close:</span>
                  <div className="font-medium text-navy">{deal.expectedClose}</div>
                </div>
              </div>
              <p className="text-[11px] text-gray-600 mt-2 leading-relaxed">{deal.significance}</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// ── Competitor Alerts Component ──
function CompetitorAlerts() {
  return (
    <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
      <div className="p-4 border-b border-gray-100">
        <h3 className="font-semibold text-navy">Competitor Alerts</h3>
        <p className="text-xs text-gray-500 mt-1">Strategic moves & market changes</p>
      </div>
      <div className="divide-y divide-gray-100">
        {COMPETITOR_ALERTS.map((alert, i) => {
          const severityColor = alert.severity === 'critical' ? 'bg-red-50 border-red-100' : alert.severity === 'warning' ? 'bg-amber-50 border-amber-100' : 'bg-blue-50 border-blue-100'
          const severityBadge = alert.severity === 'critical' ? 'bg-red-100 text-red-700' : alert.severity === 'warning' ? 'bg-amber-100 text-amber-700' : 'bg-blue-100 text-blue-700'
          return (
            <div key={i} className={`p-4 border-l-4 ${severityColor}`}>
              <div className="flex items-start justify-between mb-2">
                <div>
                  <div className="font-semibold text-navy text-sm">{alert.company}</div>
                  {alert.actionRequired && <span className="text-[10px] font-bold bg-red-200 text-red-800 px-2 py-0.5 rounded mt-1 inline-block">ACTION REQUIRED</span>}
                </div>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full whitespace-nowrap ${severityBadge}`}>
                  {alert.severity.toUpperCase()}
                </span>
              </div>
              <p className="text-sm text-navy font-medium mb-1.5">{alert.alert}</p>
              <p className="text-xs text-gray-600 leading-relaxed mb-2">{alert.impact}</p>
              <div className="text-[10px] text-gray-500">{alert.date}</div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// ── Weekly Digest Component ──
function WeeklyDigest() {
  return (
    <div className="bg-gradient-to-br from-navy/5 to-transparent rounded-xl border border-navy/10 p-6">
      <div className="mb-6">
        <div className="text-xs font-bold text-gold uppercase tracking-wide mb-2">Week of {WEEKLY_DIGEST.weekOf}</div>
        <h2 className="text-lg font-bold text-navy mb-3">{WEEKLY_DIGEST.topStory.headline}</h2>
        <p className="text-sm text-gray-700 leading-relaxed mb-3">{WEEKLY_DIGEST.topStory.summary}</p>
        <div className="bg-white rounded-lg border border-gold/30 p-3 bg-gold/5">
          <div className="text-[10px] font-bold text-gold uppercase mb-1">Your Implication</div>
          <p className="text-xs text-navy leading-relaxed">{WEEKLY_DIGEST.topStory.implication}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 border-t border-gray-200 pt-6">
        <div>
          <h3 className="text-sm font-semibold text-navy mb-3">Category Moves</h3>
          <div className="space-y-2">
            {WEEKLY_DIGEST.categoryMoves.map((item, i) => (
              <div key={i} className="p-3 bg-white rounded-lg border border-gray-100">
                <div className="font-medium text-xs text-navy">{item.category}</div>
                <p className="text-xs text-gray-600 mt-1">{item.move}</p>
                <div className="text-[10px] text-green-600 font-semibold mt-2">{item.impact}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <h3 className="text-sm font-semibold text-navy mb-3">Key Data Points</h3>
            <div className="space-y-2">
              {WEEKLY_DIGEST.dataPoints.map((dp, i) => (
                <div key={i} className="p-3 bg-white rounded-lg border border-gray-100">
                  <div className="font-medium text-xs text-navy">{dp.metric}</div>
                  <div className="text-sm font-bold text-gold mt-1">{dp.value}</div>
                  <p className="text-[10px] text-gray-500 mt-1">{dp.context}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 pt-6 border-t border-gray-200">
        <h3 className="text-sm font-semibold text-navy mb-3">Week Ahead</h3>
        <div className="space-y-2">
          {WEEKLY_DIGEST.weekAhead.map((item, i) => (
            <div key={i} className="flex gap-3 text-sm">
              <div className="text-gold font-bold whitespace-nowrap">{item.date}</div>
              <div>
                <div className="font-medium text-navy">{item.event}</div>
                <p className="text-xs text-gray-600">Watch: {item.watchFor}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ── Performance Benchmarks Component ──
function PerformanceBenchmarks() {
  return (
    <div className="bg-white rounded-xl border border-gray-100 p-6">
      <h3 className="font-semibold text-navy mb-6">Performance Benchmarks vs. Industry</h3>
      <div className="space-y-6">
        {PERFORMANCE_BENCHMARKS.map((bench, i) => (
          <div key={i}>
            <div className="flex items-center justify-between mb-2">
              <div className="font-medium text-sm text-navy">{bench.metric}</div>
              <div className="text-xs text-gray-500">{bench.unit}</div>
            </div>
            <div className="relative h-24 bg-gray-50 rounded-lg p-3">
              <div className="text-[10px] font-bold text-gray-500 absolute top-2 left-3">Bottom Quartile</div>
              <div className="flex gap-2 items-end h-16 mt-4">
                <div className="flex-1 flex flex-col items-center">
                  <div className="w-full bg-red-300 rounded-t" style={{height: "30%"}}></div>
                  <div className="text-[9px] text-gray-600 mt-1 text-center">{bench.bottomQuartile}</div>
                </div>
                <div className="flex-1 flex flex-col items-center">
                  <div className="w-full bg-amber-300 rounded-t" style={{height: "50%"}}></div>
                  <div className="text-[9px] text-gray-600 mt-1 text-center">{bench.industryAvg}</div>
                </div>
                <div className="flex-1 flex flex-col items-center">
                  <div className="w-full bg-blue-300 rounded-t" style={{height: "65%"}}></div>
                  <div className="text-[9px] text-gray-600 mt-1 text-center">{bench.yourTarget}</div>
                </div>
                <div className="flex-1 flex flex-col items-center">
                  <div className="w-full bg-green-400 rounded-t" style={{height: "80%"}}></div>
                  <div className="text-[9px] text-gray-600 mt-1 text-center">{bench.topQuartile}</div>
                </div>
              </div>
              <div className="text-[10px] font-bold text-gray-500 absolute bottom-2 right-3">Top Quartile</div>
            </div>
            <div className="flex gap-4 mt-2 text-[10px]">
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 bg-red-300 rounded"></div>
                <span className="text-gray-600">Bottom</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 bg-amber-300 rounded"></div>
                <span className="text-gray-600">Avg</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 bg-blue-300 rounded"></div>
                <span className="text-gray-600">Your Target</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 bg-green-400 rounded"></div>
                <span className="text-gray-600">Top Quartile</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ── Main Page ──
export default function CommandCentre() {
  const [signalsExpanded, setSignalsExpanded] = useState(false)
  const displaySignals = signalsExpanded ? MARKET_SIGNALS : MARKET_SIGNALS.slice(0, 3)

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="font-display text-2xl text-navy">Command Centre</h1>
        <p className="text-gray-500 text-sm mt-1">Global beverage alcohol intelligence — curated daily</p>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {MARKET_KPIS.map((kpi, i) => <KpiCard key={i} kpi={kpi} />)}
      </div>

      {/* Two-column layout: Signals + Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Market Signals */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-lg text-navy flex items-center gap-2">
              <AlertTriangle size={18} className="text-accent-orange" />
              Market Signals
            </h2>
            <button
              onClick={() => setSignalsExpanded(!signalsExpanded)}
              className="text-xs text-editorial hover:underline flex items-center gap-1"
            >
              {signalsExpanded ? 'Show less' : `Show all ${MARKET_SIGNALS.length}`}
              {signalsExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
            </button>
          </div>
          <div className="space-y-3">
            {displaySignals.map((signal, i) => <SignalRow key={i} signal={signal} />)}
          </div>

          {/* Category Snapshot */}
          <h2 className="font-display text-lg text-navy flex items-center gap-2 mt-6">
            <BarChart3 size={18} className="text-editorial" />
            Category Snapshot
          </h2>
          <div className="bg-white rounded-xl border border-gray-100 divide-y divide-gray-50">
            {CATEGORY_SNAPSHOT.map((cat, i) => <CategoryRow key={i} cat={cat} />)}
          </div>
        </div>

        {/* Right sidebar */}
        <div className="space-y-6">
          {/* Regional Pulse */}
          <div>
            <h2 className="font-display text-lg text-navy flex items-center gap-2 mb-3">
              <Globe size={18} className="text-gold" />
              Regional Pulse
            </h2>
            <div className="bg-white rounded-xl border border-gray-100 divide-y divide-gray-50">
              {REGIONAL_PULSE.map((r, i) => <RegionRow key={i} r={r} />)}
            </div>
          </div>

          {/* Upcoming Events */}
          <div>
            <h2 className="font-display text-lg text-navy flex items-center gap-2 mb-3">
              <Calendar size={18} className="text-gold" />
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
        <h2 className="font-display text-lg text-navy flex items-center gap-2 mb-4">
          <Target size={18} className="text-gold" />
          Strategic Opportunities
        </h2>
        <StrategicOpportunities />
      </div>

      {/* Weekly Intelligence Digest */}
      <WeeklyDigest />

      {/* Two-column: M&A Pipeline + Competitor Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <MAPipeline />
        <CompetitorAlerts />
      </div>

      {/* Performance Benchmarks */}
      <PerformanceBenchmarks />
    </div>
  )
}
