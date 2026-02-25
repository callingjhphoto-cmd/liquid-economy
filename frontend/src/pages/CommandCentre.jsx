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
    </div>
  )
}
