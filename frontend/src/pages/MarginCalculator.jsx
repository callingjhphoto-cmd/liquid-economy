import React, { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import {
  Calculator, TrendingUp, TrendingDown, ArrowLeft, ChevronDown,
  ToggleLeft, ToggleRight, Target, AlertTriangle, CheckCircle2,
  Zap, Globe, Package, DollarSign, ShoppingBag, BarChart3, Gauge
} from 'lucide-react'
import {
  BarChart, Bar, ResponsiveContainer, XAxis, YAxis, Tooltip,
  PieChart, Pie, Cell, RadarChart, Radar, PolarGrid,
  PolarAngleAxis, PolarRadiusAxis
} from 'recharts'

// ── COGS defaults per category (GBP per 700ml bottle) ──
const CATEGORY_COGS = {
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
const LAUNCH_READINESS = {
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

const BOTTLE_SIZES = [
  { label: '700ml', factor: 1.0 },
  { label: '750ml', factor: 1.07 },
  { label: '1L', factor: 1.35 },
  { label: '500ml', factor: 0.72 },
  { label: '330ml (can)', factor: 0.48 },
]

const CHANNELS = ['onTrade', 'offTrade', 'eCommerce', 'travelRetail']
const CHANNEL_LABELS = { onTrade: 'On-Trade', offTrade: 'Off-Trade', eCommerce: 'E-Commerce', travelRetail: 'Travel Retail' }

// ── Helpers ──
const fmt = (v) => '\u00a3' + v.toFixed(2)
const pct = (v) => (v * 100).toFixed(1) + '%'

// ── Margin Bar ──
function MarginBar({ label, value, max, color, highlight }) {
  const w = Math.min((value / max) * 100, 100)
  return (
    <div className={`flex items-center gap-2 py-1 ${highlight ? 'bg-gold/5 -mx-2 px-2 rounded' : ''}`}>
      <div className="w-32 text-[10px] text-gray-500 truncate">{label}</div>
      <div className="flex-1 bg-gray-100 rounded-full h-3 overflow-hidden">
        <div className="h-full rounded-full transition-all duration-500" style={{ width: w + '%', backgroundColor: color || '#1e3a5f' }} />
      </div>
      <div className="w-14 text-right text-xs font-semibold text-navy">{fmt(value)}</div>
      <div className="w-10 text-right text-[10px] text-gray-400">{max > 0 ? ((value/max)*100).toFixed(0) + '%' : ''}</div>
    </div>
  )
}

// ── Margin Gauge ──
function MarginGauge({ margin, label }) {
  const color = margin >= 45 ? '#22c55e' : margin >= 35 ? '#C9A96E' : margin >= 25 ? '#f59e0b' : '#ef4444'
  const descriptor = margin >= 45 ? 'Excellent' : margin >= 35 ? 'Healthy' : margin >= 25 ? 'Tight' : 'Critical'
  return (
    <div className="text-center">
      <div className="text-[10px] text-gray-400 mb-1">{label}</div>
      <div className="relative w-20 h-20 mx-auto">
        <svg viewBox="0 0 36 36" className="w-full h-full">
          <path d="M18 2.0845a 15.9155 15.9155 0 0 1 0 31.831a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#e5e7eb" strokeWidth="3" />
          <path d="M18 2.0845a 15.9155 15.9155 0 0 1 0 31.831a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke={color} strokeWidth="3" strokeDasharray={`${margin}, 100`} strokeLinecap="round" />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-sm font-bold" style={{ color }}>{margin.toFixed(1)}%</span>
        </div>
      </div>
      <div className="text-[10px] font-medium mt-1" style={{ color }}>{descriptor}</div>
    </div>
  )
}

// ── Scenario Toggle ──
function ScenarioToggle({ label, active, onChange, impact }) {
  return (
    <button onClick={onChange} className={`flex items-center gap-2 px-3 py-2 rounded-lg border text-left w-full transition-all ${active ? 'border-gold bg-gold/5' : 'border-gray-200 hover:border-gray-300'}`}>
      {active ? <ToggleRight size={16} className="text-gold flex-shrink-0" /> : <ToggleLeft size={16} className="text-gray-300 flex-shrink-0" />}
      <div className="flex-1 min-w-0">
        <div className="text-xs font-medium text-navy">{label}</div>
        <div className={`text-[10px] ${impact > 0 ? 'text-green-600' : impact < 0 ? 'text-red-500' : 'text-gray-400'}`}>
          {impact > 0 ? '+' : ''}{impact.toFixed(1)}% margin impact
        </div>
      </div>
    </button>
  )
}

// ── Launch Readiness Radar ──
function ReadinessRadar({ data }) {
  const radarData = [
    { metric: 'Growth', value: data.categoryGrowth },
    { metric: 'COGS', value: data.cogsTrend },
    { metric: 'Competition', value: data.competitiveDensity },
    { metric: 'Geography', value: data.geographicOpportunity },
    { metric: 'POS', value: data.posAvailability },
  ]
  const score = Math.round((data.categoryGrowth + data.cogsTrend + data.competitiveDensity + data.geographicOpportunity + data.posAvailability) / 5)
  const color = score >= 70 ? '#22c55e' : score >= 50 ? '#C9A96E' : '#ef4444'
  const verdict = score >= 70 ? 'Strong launch conditions' : score >= 50 ? 'Viable with careful positioning' : 'Challenging \u2014 consider timing'

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-navy flex items-center gap-2"><Target size={14} /> Launch Readiness Scorecard</h3>
        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold" style={{ color }}>{score}</span>
          <span className="text-[10px] text-gray-400">/100</span>
        </div>
      </div>
      <div className="text-xs font-medium mb-3 px-2 py-1 rounded text-center" style={{ color, backgroundColor: color + '10' }}>{verdict}</div>
      <div className="h-48">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart data={radarData}>
            <PolarGrid stroke="#e5e7eb" />
            <PolarAngleAxis dataKey="metric" tick={{ fontSize: 10, fill: '#6b7280' }} />
            <PolarRadiusAxis angle={90} domain={[0, 100]} tick={false} axisLine={false} />
            <Radar dataKey="value" stroke="#1e3a5f" fill="#1e3a5f" fillOpacity={0.15} strokeWidth={2} />
          </RadarChart>
        </ResponsiveContainer>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
        <div>
          <div className="text-[10px] font-medium text-red-500 mb-1 flex items-center gap-1"><AlertTriangle size={10} /> Top Risks</div>
          {data.risks.map((r, i) => <div key={i} className="text-[10px] text-gray-600 py-0.5 border-l-2 border-red-200 pl-2 mb-1">{r}</div>)}
        </div>
        <div>
          <div className="text-[10px] font-medium text-green-600 mb-1 flex items-center gap-1"><Zap size={10} /> Top Opportunities</div>
          {data.opportunities.map((o, i) => <div key={i} className="text-[10px] text-gray-600 py-0.5 border-l-2 border-green-200 pl-2 mb-1">{o}</div>)}
        </div>
      </div>
    </div>
  )
}

// ── Competitor Price Gap ──
function CompetitorPriceGap({ category, channel, userRRP }) {
  const cat = CATEGORY_COGS[category]
  if (!cat) return null
  const avgRRP = cat.avgRRP[channel] || cat.avgRRP.offTrade
  const gap = userRRP - avgRRP
  const premium = ((userRRP - avgRRP) / avgRRP * 100).toFixed(1)
  const bands = [
    { label: 'Value', min: avgRRP * 0.5, max: avgRRP * 0.75, color: '#94a3b8' },
    { label: 'Mid-tier', min: avgRRP * 0.75, max: avgRRP * 1.0, color: '#3b82f6' },
    { label: 'Premium', min: avgRRP * 1.0, max: avgRRP * 1.5, color: '#C9A96E' },
    { label: 'Ultra-premium', min: avgRRP * 1.5, max: avgRRP * 2.5, color: '#1e3a5f' },
  ]
  const barData = bands.map(b => ({ name: b.label, range: b.max - b.min, base: b.min, color: b.color }))

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4">
      <h3 className="text-sm font-semibold text-navy flex items-center gap-2 mb-3"><BarChart3 size={14} /> Competitive Price Positioning</h3>
      <div className="flex items-center gap-4 mb-3">
        <div className="text-center">
          <div className="text-[10px] text-gray-400">Your RRP</div>
          <div className="text-lg font-bold text-navy">{fmt(userRRP)}</div>
        </div>
        <div className="text-center">
          <div className="text-[10px] text-gray-400">Category Avg</div>
          <div className="text-lg font-bold text-gray-500">{fmt(avgRRP)}</div>
        </div>
        <div className="text-center">
          <div className="text-[10px] text-gray-400">Gap</div>
          <div className={`text-lg font-bold ${gap > 0 ? 'text-gold' : 'text-blue-500'}`}>{gap > 0 ? '+' : ''}{fmt(gap)}</div>
        </div>
        <div className="text-center">
          <div className="text-[10px] text-gray-400">Premium</div>
          <div className={`text-lg font-bold ${parseFloat(premium) > 0 ? 'text-gold' : 'text-blue-500'}`}>{premium}%</div>
        </div>
      </div>
      <div className="relative h-8 bg-gray-50 rounded-full overflow-hidden flex">
        {bands.map((b, i) => {
          const totalRange = avgRRP * 2.5 - avgRRP * 0.5
          const w = ((b.max - b.min) / totalRange) * 100
          return <div key={i} className="h-full relative" style={{ width: w + '%', backgroundColor: b.color + '30' }}>
            <div className="absolute inset-x-0 bottom-0 text-[8px] text-center font-medium" style={{ color: b.color }}>{b.label}</div>
          </div>
        })}
        {/* User position marker */}
        <div className="absolute top-0 bottom-0 w-0.5 bg-red-500" style={{ left: `${Math.min(Math.max(((userRRP - avgRRP * 0.5) / (avgRRP * 2.0)) * 100, 0), 100)}%` }}>
          <div className="absolute -top-1 -translate-x-1/2 w-2 h-2 rounded-full bg-red-500" />
        </div>
      </div>
      <div className="text-[10px] text-gray-500 mt-2 text-center">
        {gap > avgRRP * 0.3 ? 'Positioned in ultra-premium \u2014 ensure brand story justifies price point' :
         gap > 0 ? 'Premium positioning \u2014 competitive but needs differentiation' :
         gap > -avgRRP * 0.25 ? 'Mid-tier positioning \u2014 high volume potential' :
         'Value positioning \u2014 margin pressure likely, focus on volume'}
      </div>
    </div>
  )
}

// ══════════════════════════════════════════
// MAIN COMPONENT
// ══════════════════════════════════════════
export default function MarginCalculator() {
  const [category, setCategory] = useState('tequila')
  const [bottleSize, setBottleSize] = useState(0) // index into BOTTLE_SIZES
  const [channel, setChannel] = useState('offTrade')
  const [targetRRP, setTargetRRP] = useState(35)
  const [scenarios, setScenarios] = useState({})
  const [tab, setTab] = useState('margin') // margin | readiness | pricing

  const cat = CATEGORY_COGS[category]
  const sizeFactor = BOTTLE_SIZES[bottleSize].factor

  // When category changes, reset scenarios and set default RRP
  const handleCategoryChange = (newCat) => {
    setCategory(newCat)
    setScenarios({})
    const c = CATEGORY_COGS[newCat]
    if (c) setTargetRRP(c.avgRRP[channel] || c.avgRRP.offTrade)
  }

  // Compute COGS with scenarios applied
  const computed = useMemo(() => {
    if (!cat) return null
    let costs = {
      rawMaterial: cat.rawMaterial.base,
      glass: cat.glass,
      closure: cat.closure,
      freight: cat.freight,
      duty: cat.duty,
      production: cat.production,
      overheads: cat.overheads,
    }

    // Apply active scenarios
    Object.entries(cat.scenarios).forEach(([key, sc]) => {
      if (!scenarios[key]) return
      if (sc.multiplier) {
        costs[sc.field] = costs[sc.field] * sc.multiplier
      } else if (sc.saving) {
        costs[sc.field] = Math.max(0, costs[sc.field] - sc.saving)
      } else if (sc.newValue !== undefined) {
        costs[sc.field] = sc.newValue
      }
    })

    // Apply bottle size factor
    Object.keys(costs).forEach(k => {
      if (k !== 'duty') costs[k] = costs[k] * sizeFactor
    })

    const total = Object.values(costs).reduce((a, b) => a + b, 0)
    const margin = targetRRP > 0 ? ((targetRRP - total) / targetRRP) * 100 : 0

    // Compute base (no scenarios) for comparison
    let baseCosts = {
      rawMaterial: cat.rawMaterial.base * sizeFactor,
      glass: cat.glass * sizeFactor,
      closure: cat.closure * sizeFactor,
      freight: cat.freight * sizeFactor,
      duty: cat.duty,
      production: cat.production * sizeFactor,
      overheads: cat.overheads * sizeFactor,
    }
    const baseTotal = Object.values(baseCosts).reduce((a, b) => a + b, 0)
    const baseMargin = targetRRP > 0 ? ((targetRRP - baseTotal) / targetRRP) * 100 : 0

    // Compute per-scenario impact
    const scenarioImpacts = {}
    Object.entries(cat.scenarios).forEach(([key, sc]) => {
      let testCosts = { ...baseCosts }
      if (sc.multiplier) testCosts[sc.field] = testCosts[sc.field] * sc.multiplier
      else if (sc.saving) testCosts[sc.field] = Math.max(0, testCosts[sc.field] - sc.saving * sizeFactor)
      else if (sc.newValue !== undefined) testCosts[sc.field] = sc.field === 'duty' ? sc.newValue : sc.newValue * sizeFactor
      const testTotal = Object.values(testCosts).reduce((a, b) => a + b, 0)
      const testMargin = targetRRP > 0 ? ((targetRRP - testTotal) / targetRRP) * 100 : 0
      scenarioImpacts[key] = testMargin - baseMargin
    })

    return { costs, total, margin, baseTotal, baseMargin, scenarioImpacts }
  }, [cat, scenarios, bottleSize, targetRRP, sizeFactor, channel])

  if (!cat || !computed) return <div className="p-8 text-gray-500">Loading...</div>

  const costEntries = [
    { key: 'rawMaterial', label: cat.rawMaterial.name, color: '#1e3a5f' },
    { key: 'glass', label: 'Glass bottle', color: '#3b82f6' },
    { key: 'closure', label: 'Closure & label', color: '#8b5cf6' },
    { key: 'freight', label: 'Freight (to UK)', color: '#f59e0b' },
    { key: 'duty', label: 'Duty & tax', color: '#ef4444' },
    { key: 'production', label: 'Production & fill', color: '#22c55e' },
    { key: 'overheads', label: 'Overheads', color: '#6b7280' },
  ]

  const pieData = costEntries.map(e => ({ name: e.label, value: parseFloat(computed.costs[e.key].toFixed(2)), color: e.color }))

  const tabs = [
    { id: 'margin', label: 'Margin Modeller', icon: Calculator },
    { id: 'readiness', label: 'Launch Readiness', icon: Target },
    { id: 'pricing', label: 'Price Positioning', icon: BarChart3 },
  ]

  return (
    <div className="space-y-4 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-xl text-navy flex items-center gap-2">
            <Gauge size={20} className="text-gold" /> Scenario Modelling
          </h1>
          <p className="text-xs text-gray-400 mt-1">Margin calculator, launch readiness & competitive positioning</p>
        </div>
        <Link to="/" className="text-xs text-gray-400 hover:text-navy flex items-center gap-1"><ArrowLeft size={12} /> Command Centre</Link>
      </div>

      {/* Tab bar */}
      <div className="flex gap-1 bg-gray-100 rounded-lg p-1">
        {tabs.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)}
            className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-md text-xs font-medium transition-colors ${tab === t.id ? 'bg-white text-navy shadow-sm' : 'text-gray-500 hover:text-navy'}`}>
            <t.icon size={14} /> {t.label}
          </button>
        ))}
      </div>

      {/* Category + Controls */}
      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
          <div>
            <label className="text-[10px] font-medium text-gray-400 block mb-1">Category</label>
            <select value={category} onChange={e => handleCategoryChange(e.target.value)}
              className="w-full text-xs border border-gray-200 rounded-lg px-3 py-2 bg-white text-navy font-medium focus:ring-2 focus:ring-gold focus:border-transparent">
              {Object.entries(CATEGORY_COGS).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
            </select>
          </div>
          <div>
            <label className="text-[10px] font-medium text-gray-400 block mb-1">Bottle Size</label>
            <select value={bottleSize} onChange={e => setBottleSize(Number(e.target.value))}
              className="w-full text-xs border border-gray-200 rounded-lg px-3 py-2 bg-white text-navy font-medium focus:ring-2 focus:ring-gold focus:border-transparent">
              {BOTTLE_SIZES.map((s, i) => <option key={i} value={i}>{s.label}</option>)}
            </select>
          </div>
          <div>
            <label className="text-[10px] font-medium text-gray-400 block mb-1">Channel</label>
            <select value={channel} onChange={e => { setChannel(e.target.value); setTargetRRP(cat.avgRRP[e.target.value] || targetRRP) }}
              className="w-full text-xs border border-gray-200 rounded-lg px-3 py-2 bg-white text-navy font-medium focus:ring-2 focus:ring-gold focus:border-transparent">
              {CHANNELS.map(c => <option key={c} value={c}>{CHANNEL_LABELS[c]}</option>)}
            </select>
          </div>
          <div>
            <label className="text-[10px] font-medium text-gray-400 block mb-1">Target RRP (\u00a3)</label>
            <input type="number" value={targetRRP} onChange={e => setTargetRRP(Number(e.target.value))}
              className="w-full text-xs border border-gray-200 rounded-lg px-3 py-2 bg-white text-navy font-medium focus:ring-2 focus:ring-gold focus:border-transparent"
              min={0} step={0.5} />
          </div>
        </div>
      </div>

      {/* ═══ TAB: MARGIN MODELLER ═══ */}
      {tab === 'margin' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          {/* COGS Breakdown */}
          <div className="lg:col-span-5 bg-white rounded-xl border border-gray-200 p-4">
            <h3 className="text-sm font-semibold text-navy mb-3 flex items-center gap-2"><Package size={14} /> COGS Breakdown ({BOTTLE_SIZES[bottleSize].label})</h3>
            <div className="space-y-1">
              {costEntries.map(e => (
                <MarginBar key={e.key} label={e.label} value={computed.costs[e.key]} max={computed.total} color={e.color} />
              ))}
            </div>
            <div className="mt-3 pt-3 border-t border-gray-100 flex items-center justify-between">
              <div>
                <div className="text-xs text-gray-400">Total COGS</div>
                <div className="text-lg font-bold text-navy">{fmt(computed.total)}</div>
              </div>
              <div className="text-right">
                <div className="text-xs text-gray-400">Gross Profit</div>
                <div className="text-lg font-bold text-green-600">{fmt(Math.max(0, targetRRP - computed.total))}</div>
              </div>
            </div>
          </div>

          {/* COGS Pie + Margin Gauges */}
          <div className="lg:col-span-3 space-y-4">
            <div className="bg-white rounded-xl border border-gray-200 p-4">
              <h3 className="text-sm font-semibold text-navy mb-2">Cost Split</h3>
              <div className="h-40">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={55} innerRadius={30} strokeWidth={1}>
                      {pieData.map((e, i) => <Cell key={i} fill={e.color} />)}
                    </Pie>
                    <Tooltip formatter={(v) => fmt(v)} contentStyle={{ fontSize: 11 }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 p-4">
              <div className="flex items-center justify-around">
                <MarginGauge margin={computed.baseMargin} label="Base" />
                <MarginGauge margin={computed.margin} label="Scenario" />
              </div>
              {computed.margin !== computed.baseMargin && (
                <div className={`text-center text-xs font-medium mt-2 ${computed.margin > computed.baseMargin ? 'text-green-600' : 'text-red-500'}`}>
                  {computed.margin > computed.baseMargin ? '\u25b2' : '\u25bc'} {(computed.margin - computed.baseMargin).toFixed(1)}pp vs base
                </div>
              )}
            </div>
          </div>

          {/* What-If Scenarios */}
          <div className="lg:col-span-4 bg-white rounded-xl border border-gray-200 p-4">
            <h3 className="text-sm font-semibold text-navy mb-3 flex items-center gap-2"><Zap size={14} className="text-gold" /> What-If Scenarios</h3>
            <div className="space-y-2">
              {Object.entries(cat.scenarios).map(([key, sc]) => (
                <ScenarioToggle
                  key={key}
                  label={sc.label}
                  active={!!scenarios[key]}
                  onChange={() => setScenarios(prev => ({ ...prev, [key]: !prev[key] }))}
                  impact={computed.scenarioImpacts[key]}
                />
              ))}
            </div>
            <div className="mt-4 pt-3 border-t border-gray-100">
              <div className="text-[10px] text-gray-400 mb-2">Quick scenario summary</div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <div className="bg-green-50 rounded-lg p-2 text-center">
                  <div className="text-[10px] text-green-600">Best case</div>
                  <div className="text-sm font-bold text-green-700">
                    {(() => {
                      const positives = Object.values(computed.scenarioImpacts).filter(v => v > 0)
                      return (computed.baseMargin + positives.reduce((a,b) => a+b, 0)).toFixed(1) + '%'
                    })()}
                  </div>
                </div>
                <div className="bg-red-50 rounded-lg p-2 text-center">
                  <div className="text-[10px] text-red-500">Worst case</div>
                  <div className="text-sm font-bold text-red-600">
                    {(() => {
                      const negatives = Object.values(computed.scenarioImpacts).filter(v => v < 0)
                      return (computed.baseMargin + negatives.reduce((a,b) => a+b, 0)).toFixed(1) + '%'
                    })()}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ═══ TAB: LAUNCH READINESS ═══ */}
      {tab === 'readiness' && (
        <ReadinessRadar data={LAUNCH_READINESS[category]} />
      )}

      {/* ═══ TAB: PRICE POSITIONING ═══ */}
      {tab === 'pricing' && (
        <CompetitorPriceGap category={category} channel={channel} userRRP={targetRRP} />
      )}

      {/* Footer insight */}
      <div className="bg-navy/5 rounded-xl p-3 text-xs text-gray-600">
        <span className="font-medium text-navy">Methodology:</span> COGS estimates use category-average commodity prices, standard UK duty rates (Feb 2025), and typical freight-to-UK costs. Actual costs vary by supplier, volume, and contract terms. Duty calculated per 700ml equivalent at category ABV.
      </div>
    </div>
  )
}
