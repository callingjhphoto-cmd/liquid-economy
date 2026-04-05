import React, { useState, useCallback, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  TrendingUp, Globe, BarChart3, Zap, ArrowUpRight,
  ArrowDownRight, ChevronRight, ChevronDown, ChevronUp, DollarSign,
  AlertTriangle, Target, X, BookOpen, Copy, Lightbulb,
  Activity, FileText, Building2
} from 'lucide-react'
import {
  AreaChart, Area, ResponsiveContainer
} from 'recharts'
import LiveFeed from '../components/LiveFeed'
import {
  PageHeader, Card, SectionHeader, BentoGrid, DrillDown,
  SkeletonCard, SkeletonChart, BottomSheet, MethodologyTooltip, DataFreshness
} from '../components/ui'
import { CHART_COLORS } from '../data/chartColors'
import {
  KPI_TRENDS, CATEGORY_SNAPSHOT, REGIONAL_PULSE, MARKET_SIGNALS,
  MARKET_PULSE, PRICE_ALERTS, INSIGHT_BRIEFINGS, UPCOMING_EVENTS,
  RECENTLY_UPDATED, RECENT_MOVERS
} from '../data/commandCentreData'


// ══════════════════════════════════════════════════════════
// TIER 1 COMPONENTS — Executive Dashboard (Default View)
// ══════════════════════════════════════════════════════════

// ── Hero Card: Total Industry Market Size with sparkline ──
function HeroMarketCard() {
  const navigate = useNavigate()
  const sparkData = KPI_TRENDS.market
  const totalMarket = CATEGORY_SNAPSHOT.reduce((sum, c) => {
    const val = parseFloat(c.size.replace(/[$B]/g, ''))
    return sum + (val > 100 ? val : val) // keep as-is for B values
  }, 0)

  return (
    <div
      onClick={() => navigate('/categories')}
      className="bg-gradient-to-br from-navy/[0.04] to-transparent bg-white rounded-xl border border-gray-100 p-6 hover:shadow-lg hover:border-gold/30 transition-all cursor-pointer relative overflow-hidden group"
    >
      {/* Background sparkline */}
      <div className="absolute bottom-0 left-0 right-0 h-20 opacity-30">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={sparkData} margin={{ top: 0, right: 0, bottom: 0, left: 0 }} accessibilityLayer={true}>
            <defs>
              <linearGradient id="hero-grad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={CHART_COLORS.emerald} stopOpacity={0.2} />
                <stop offset="100%" stopColor={CHART_COLORS.emerald} stopOpacity={0.02} />
              </linearGradient>
            </defs>
            <Area type="monotone" dataKey="v" stroke={CHART_COLORS.emerald} strokeWidth={1.5} fill="url(#hero-grad)" dot={false} isAnimationActive={false} />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-4">
          <div className="p-2.5 rounded-xl bg-navy/[0.06]">
            <Globe size={20} className="text-navy" />
          </div>
          <div>
            <span className="text-label text-gray-500 uppercase tracking-wider">Global Spirits Market
              <MethodologyTooltip text="Distilled spirits market size, excluding beer, wine & cider. Source: IWSR 2025." />
            </span>
            <p className="text-micro text-gray-500">Distilled spirits excl. beer, wine & cider \u00b7 IWSR 2025</p>
          </div>
        </div>

        <div className="flex items-baseline gap-3 mb-2">
          <span className="text-4xl font-bold text-navy">$635B</span>
          <span className="inline-flex items-center gap-0.5 text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
            <ArrowUpRight size={12} />
            +3.1% YoY
          </span>
        </div>

        <p className="text-sm text-gray-500 leading-relaxed max-w-md">
          Premiumisation continues to drive value growth. Super-premium segments up 6.8% while mainstream grows just 1.2%.
        </p>

        <div className="flex items-center gap-1 mt-4 text-xs text-navy/60 group-hover:text-gold transition-colors">
          <span className="font-medium">Explore categories</span>
          <ChevronRight size={12} />
        </div>
      </div>
    </div>
  )
}

// ── Micro Sparkline (tiny area chart) ──
function MicroSparkline({ data, positive = true }) {
  const color = positive ? '#22c55e' : '#ef4444'
  return (
    <ResponsiveContainer width="100%" height={28}>
      <AreaChart data={data} margin={{ top: 2, right: 0, bottom: 0, left: 0 }} accessibilityLayer={true}>
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

// ── KPI Summary Cards (4 compact cards) ──
function KpiSummaryCards() {
  const navigate = useNavigate()

  // Derive KPIs from data
  const fastestGrowing = [...CATEGORY_SNAPSHOT].sort((a, b) => {
    const ag = parseFloat(a.growth)
    const bg = parseFloat(b.growth)
    return bg - ag
  })[0]

  const fastestRegion = [...REGIONAL_PULSE].sort((a, b) => {
    const ag = parseFloat(a.growth)
    const bg = parseFloat(b.growth)
    return bg - ag
  })[0]

  const kpis = [
    {
      label: 'Top Growing Category',
      value: fastestGrowing.name,
      change: `${fastestGrowing.growth} YoY`,
      dir: 'up',
      sub: fastestGrowing.signal,
      icon: TrendingUp,
      sparkData: fastestGrowing.trend,
      onClick: () => navigate('/categories'),
    },
    {
      label: 'Top Growing Market',
      value: fastestRegion.region,
      change: `${fastestRegion.growth} YoY`,
      dir: 'up',
      sub: fastestRegion.note,
      icon: Globe,
      sparkData: fastestRegion.trend,
      onClick: () => navigate('/geographic'),
    },
    {
      label: 'Avg Price Change',
      value: '+4.8%',
      change: '+1.2pp YoY',
      dir: 'up',
      sub: 'Across 208 tracked expressions',
      icon: DollarSign,
      sparkData: KPI_TRENDS.premium,
      onClick: () => navigate('/pricing'),
    },
    {
      label: 'Brands Tracked',
      value: '208',
      change: '+12 this quarter',
      dir: 'up',
      sub: 'Across 11 categories',
      icon: BarChart3,
      sparkData: KPI_TRENDS.market,
      onClick: () => navigate('/pricing'),
    },
  ]

  return (
    <>
      {kpis.map((kpi, i) => (
        <div
          key={i}
          onClick={kpi.onClick}
          className="bg-white rounded-xl border border-gray-100 p-4 hover:shadow-md hover:border-gray-200 transition-all cursor-pointer relative overflow-hidden group"
        >
          {/* Background sparkline */}
          <div className="absolute bottom-0 left-0 right-0 h-7 opacity-30">
            <MicroSparkline data={kpi.sparkData} positive={kpi.dir === 'up'} />
          </div>

          <div className="relative z-10">
            <div className="flex items-start justify-between mb-2">
              <div className="p-1.5 rounded-lg bg-gray-50">
                <kpi.icon size={14} className="text-navy" />
              </div>
              <span className={`inline-flex items-center gap-0.5 text-xs font-semibold px-1.5 py-0.5 rounded-full ${
                kpi.dir === 'up' ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-500'
              }`}>
                {kpi.dir === 'up' ? <ArrowUpRight size={10} /> : <ArrowDownRight size={10} />}
                {kpi.change}
              </span>
            </div>
            <div className="text-lg font-bold text-navy leading-tight">{kpi.value}</div>
            <div className="text-label text-gray-500 uppercase tracking-wider mt-1">{kpi.label}</div>
            <p className="text-xs text-gray-500 mt-1">{kpi.sub}</p>
          </div>
        </div>
      ))}
    </>
  )
}

// ── Market Pulse Summary (1-2 sentence overview) ──
function MarketPulseBanner() {
  return (
    <div className="bg-gradient-to-r from-navy/[0.03] to-gold/[0.04] rounded-xl border border-gray-100 px-5 py-4">
      <div className="flex items-start gap-3">
        <div className="p-2 rounded-lg bg-gold/10 flex-shrink-0">
          <Zap size={16} className="text-gold" />
        </div>
        <div>
          <h3 className="text-xs font-bold text-navy mb-1">Market Pulse</h3>
          <p className="text-sm text-gray-600 leading-relaxed">
            Premiumisation thesis holds as super-premium spirits grow 5.6x faster than mainstream. Tequila input costs falling on agave surplus while cognac faces continued China tariff headwinds. RTD consolidation wave accelerating with $1.1B BuzzBallz deal in pipeline.
          </p>
        </div>
      </div>
    </div>
  )
}


// ══════════════════════════════════════════════════════════
// TIER 2 COMPONENTS — Expandable Sections
// ══════════════════════════════════════════════════════════

// ── Channel Mini-Bar ──
function ChannelMiniBar({ channels }) {
  const colors = { onTrade: '#1e3a5f', offTrade: '#C9A96E', eCommerce: '#3b82f6', travelRetail: '#8b5cf6' }
  return (
    <div className="flex h-1.5 rounded-full overflow-hidden w-full" title={`On: ${channels.onTrade}% | Off: ${channels.offTrade}% | E-Commerce: ${channels.eCommerce}% | TR: ${channels.travelRetail}%`}>
      <div style={{ width: `${channels.onTrade}%`, backgroundColor: colors.onTrade }} />
      <div style={{ width: `${channels.offTrade}%`, backgroundColor: colors.offTrade }} />
      <div style={{ width: `${channels.eCommerce}%`, backgroundColor: colors.eCommerce }} />
      <div style={{ width: `${channels.travelRetail}%`, backgroundColor: colors.travelRetail }} />
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
    <div className="flex gap-3 items-center flex-wrap">
      {items.map((it, i) => (
        <div key={i} className="flex items-center gap-1">
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: it.color }} />
          <span className="text-xs text-gray-500">{it.label}</span>
        </div>
      ))}
    </div>
  )
}

// ── Category Performance (horizontal scroll mini-cards) ──
function CategoryPerformance() {
  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <SectionHeader size="md">Category Performance</SectionHeader>
        <ChannelLegend />
      </div>
      <div className="relative">
      <div className="flex gap-3 overflow-x-auto pb-2 -mx-1 px-1 scrollbar-thin">
        {CATEGORY_SNAPSHOT.map((cat) => {
          const isUp = cat.dir === 'up'
          return (
            <Link
              key={cat.key}
              to={`/categories`}
              className="flex-shrink-0 w-44 bg-white rounded-xl border border-gray-100 p-3 hover:shadow-md hover:border-gray-200 transition-all group no-underline"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-navy group-hover:text-gold transition-colors truncate">{cat.name}</span>
                <span className={`text-xs font-bold ${isUp ? 'text-emerald-600' : 'text-red-500'}`}>{cat.growth} YoY</span>
              </div>
              <div className="text-lg font-bold text-navy mb-1">{cat.size}</div>
              <div className="w-full h-6 mb-2">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={cat.trend} margin={{ top: 0, right: 0, bottom: 0, left: 0 }} accessibilityLayer={true}>
                    <Area type="monotone" dataKey="v" stroke={isUp ? '#22c55e' : '#ef4444'} strokeWidth={1.2} fill={isUp ? '#22c55e10' : '#ef444410'} dot={false} isAnimationActive={false} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              <ChannelMiniBar channels={cat.channels} />
              <p className="text-xs text-gray-500 mt-1.5 truncate">{cat.signal}</p>
            </Link>
          )
        })}
      </div>
      <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white to-transparent sm:hidden" />
      </div>
    </div>
  )
}

// ── Recent Movers ──
function RecentMovers() {
  return (
    <div>
      <SectionHeader size="md" subtitle="Biggest changes this period">Recent Movers</SectionHeader>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {RECENT_MOVERS.map((mover, i) => {
          const isUp = mover.dir === 'up'
          return (
            <Link key={i} to={mover.link} className="no-underline">
              <div className="bg-white rounded-xl border border-gray-100 p-3 hover:shadow-md hover:border-gray-200 transition-all group">
                <div className="flex items-start justify-between mb-1">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className={`text-micro font-bold uppercase px-1.5 py-0.5 rounded-full ${
                        mover.type === 'category' ? 'bg-blue-50 text-blue-600' : 'bg-purple-50 text-purple-600'
                      }`}>{mover.type}</span>
                    </div>
                    <div className="text-xs font-semibold text-navy mt-1 group-hover:text-gold transition-colors">{mover.name}</div>
                  </div>
                  <span className={`text-sm font-bold flex-shrink-0 ${isUp ? 'text-emerald-600' : 'text-red-500'}`}>
                    {isUp ? <ArrowUpRight size={12} className="inline" /> : <ArrowDownRight size={12} className="inline" />}
                    {mover.change}
                  </span>
                </div>
                <p className="text-xs text-gray-500">{mover.context}</p>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

// ── Price Alerts Section ──
function PriceAlertsSummary() {
  const alerts = PRICE_ALERTS.filter(a => a.severity === 'alert')
  const opportunities = PRICE_ALERTS.filter(a => a.severity === 'opportunity')
  const top4 = [...alerts, ...opportunities, ...PRICE_ALERTS.filter(a => a.severity === 'watch')].slice(0, 4)

  const severityConfig = {
    alert: { bg: 'bg-red-50', text: 'text-red-600', label: 'Alert' },
    watch: { bg: 'bg-amber-50', text: 'text-amber-600', label: 'Watch' },
    opportunity: { bg: 'bg-emerald-50', text: 'text-emerald-600', label: 'Opportunity' },
  }

  return (
    <div>
      <SectionHeader size="md" subtitle={`${alerts.length} alerts \u00b7 ${opportunities.length} opportunities`}>
        Price Alerts
      </SectionHeader>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {top4.map((alert, i) => {
          const sev = severityConfig[alert.severity]
          const isUp = alert.direction === 'up'
          return (
            <Link key={i} to={alert.link} className="no-underline">
              <div className="bg-white rounded-xl border border-gray-100 p-3 hover:shadow-md transition-all group">
                <div className="flex items-start justify-between mb-1">
                  <div className="flex-1 min-w-0">
                    <span className={`text-micro font-bold uppercase px-1.5 py-0.5 rounded-full ${sev.bg} ${sev.text}`}>{sev.label}</span>
                    <div className="text-xs font-semibold text-navy mt-1 group-hover:text-gold transition-colors">{alert.product}</div>
                    <div className="text-xs text-gray-500">{alert.category} \u00b7 {alert.channel}</div>
                  </div>
                  <div className="text-right flex-shrink-0 ml-2">
                    <div className="text-sm font-bold text-navy">{alert.pricePoint}</div>
                    <span className={`text-xs font-semibold ${isUp ? 'text-emerald-600' : 'text-red-500'}`}>
                      {alert.change} ({alert.pctChange})
                    </span>
                    <div className="text-micro text-gray-400">vs {alert.period} ago</div>
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-1">{alert.reason}</p>
              </div>
            </Link>
          )
        })}
      </div>
      <Link to="/pricing" className="inline-flex items-center gap-1 text-xs font-semibold text-editorial hover:text-navy transition-colors mt-2 no-underline">
        View all {PRICE_ALERTS.length} price movements
        <ChevronRight size={10} />
      </Link>
    </div>
  )
}

// ── Geographic Highlights ──
function GeographicHighlights() {
  return (
    <div>
      <SectionHeader size="md">Geographic Highlights</SectionHeader>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2">
        {REGIONAL_PULSE.map((r, i) => {
          const isUp = r.dir === 'up'
          return (
            <Link key={i} to="/geographic" className="no-underline">
              <div className="bg-white rounded-xl border border-gray-100 p-3 hover:shadow-md hover:border-gray-200 transition-all group">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg">{r.flag}</span>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-semibold text-navy group-hover:text-gold transition-colors truncate">{r.region}</div>
                  </div>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-lg font-bold text-navy">{r.value}</span>
                  <span className={`text-xs font-semibold ${isUp ? 'text-emerald-600' : 'text-red-500'}`}>{r.growth} YoY</span>
                </div>
                <div className="w-full h-5 mt-1">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={r.trend} margin={{ top: 0, right: 0, bottom: 0, left: 0 }} accessibilityLayer={true}>
                      <Area type="monotone" dataKey="v" stroke={isUp ? '#22c55e' : '#ef4444'} strokeWidth={1} fill={isUp ? '#22c55e10' : '#ef444410'} dot={false} isAnimationActive={false} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
                <p className="text-xs text-gray-500 mt-1">{r.note}</p>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

// ── Market Signals (compact) ──
function MarketSignalsFeed() {
  const [expanded, setExpanded] = useState(false)
  const visible = expanded ? MARKET_SIGNALS : MARKET_SIGNALS.slice(0, 3)
  const urgencyColors = { high: 'bg-red-100 text-red-700', medium: 'bg-amber-100 text-amber-700', low: 'bg-blue-100 text-blue-700' }
  const typeColors = { 'M&A': 'bg-purple-50 text-purple-600', 'Regulation': 'bg-orange-50 text-orange-600', 'Supply': 'bg-green-50 text-green-600', 'Trade': 'bg-red-50 text-red-600', 'Category': 'bg-blue-50 text-blue-600' }

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <SectionHeader size="md" className="mb-0">Market Signals</SectionHeader>
        <span className="text-xs font-semibold bg-red-50 text-red-600 px-2 py-0.5 rounded-full">
          {MARKET_SIGNALS.filter(s => s.urgency === 'high').length} high priority
        </span>
      </div>
      <div className="space-y-2">
        {visible.map((signal, i) => (
          <div key={i} className="bg-white rounded-lg border border-gray-100 p-3 hover:shadow-sm transition-shadow">
            <div className="flex items-center gap-2 mb-1.5">
              <span className={`text-xs font-bold uppercase px-1.5 py-0.5 rounded-full ${urgencyColors[signal.urgency]}`}>{signal.urgency}</span>
              <span className={`text-xs font-semibold px-1.5 py-0.5 rounded-full ${typeColors[signal.type] || 'bg-gray-50 text-gray-600'}`}>{signal.type}</span>
              <span className="text-xs text-gray-500 ml-auto">{signal.date}</span>
            </div>
            <h4 className="text-xs font-semibold text-navy leading-snug">{signal.headline}</h4>
            <p className="text-xs text-gray-500 mt-1 leading-relaxed">{signal.impact}</p>
            <div className="text-xs text-gray-500 mt-1">Source: {signal.source}</div>
          </div>
        ))}
      </div>
      {MARKET_SIGNALS.length > 3 && (
        <button onClick={() => setExpanded(!expanded)} className="text-xs text-editorial hover:underline flex items-center gap-0.5 mt-2 min-h-[44px] touch-manipulation">
          {expanded ? 'Show less' : `View all ${MARKET_SIGNALS.length} signals`}
          {expanded ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
        </button>
      )}
    </div>
  )
}

// ── Market Pulse (expandable detail items) ──
function MarketPulseExpanded() {
  const [expandedIdx, setExpandedIdx] = useState(null)
  const [showAll, setShowAll] = useState(false)
  const visible = showAll ? MARKET_PULSE : MARKET_PULSE.slice(0, 3)

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <SectionHeader size="md" className="mb-0">Intelligence Feed</SectionHeader>
        <span className="text-xs text-gray-500">{MARKET_PULSE.length} movements tracked</span>
      </div>
      <div className="space-y-2">
        {visible.map((item, i) => {
          const isExpanded = expandedIdx === i
          const isUp = item.dir === 'up'
          return (
            <div key={i} className="bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-sm transition-shadow">
              <button
                onClick={() => setExpandedIdx(isExpanded ? null : i)}
                className="w-full text-left px-4 py-3 flex items-center gap-3"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-xs font-bold bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded">{item.category}</span>
                    <span className="text-xs text-gray-500">{item.date}</span>
                  </div>
                  <div className="text-xs font-semibold text-navy">{item.event}</div>
                  <p className="text-xs text-gray-500 mt-0.5">{item.impact}</p>
                </div>
                <span className={`text-xs font-bold flex-shrink-0 ${isUp ? 'text-emerald-600' : 'text-red-500'}`}>
                  {item.change} YoY
                </span>
                {isExpanded ? <ChevronUp size={14} className="text-gray-500 flex-shrink-0" /> : <ChevronDown size={14} className="text-gray-500 flex-shrink-0" />}
              </button>
              {isExpanded && (
                <div className="px-4 pb-4 border-t border-gray-50">
                  <p className="text-xs text-gray-700 leading-relaxed mt-3">{item.detail}</p>
                  <Link to={item.link} className="inline-flex items-center gap-1 text-xs font-semibold text-navy hover:text-gold transition-colors mt-2 no-underline">
                    {item.linkLabel}
                    <ChevronRight size={10} />
                  </Link>
                </div>
              )}
            </div>
          )
        })}
      </div>
      {MARKET_PULSE.length > 3 && (
        <button onClick={() => setShowAll(!showAll)} className="text-xs text-editorial hover:underline flex items-center gap-0.5 mt-2 min-h-[44px] touch-manipulation">
          {showAll ? 'Show less' : `View all ${MARKET_PULSE.length} movements`}
          {showAll ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
        </button>
      )}
    </div>
  )
}

// ── Upcoming Events ──
function UpcomingEventsMini() {
  return (
    <div>
      <SectionHeader size="md">Upcoming Events</SectionHeader>
      <div className="bg-white rounded-xl border border-gray-100 divide-y divide-gray-50">
        {UPCOMING_EVENTS.slice(0, 5).map((evt, i) => {
          const typeColor = evt.type === 'Earnings' ? 'text-editorial bg-blue-50' : 'text-gold bg-gold/10'
          return (
            <div key={i} className="flex items-center gap-2 px-3 py-2">
              <span className={`text-xs font-bold px-1.5 py-0.5 rounded ${typeColor} whitespace-nowrap`}>{evt.date}</span>
              <div className="flex-1 min-w-0">
                <div className="text-xs font-medium text-navy truncate">{evt.company}</div>
                <div className="text-xs text-gray-500">{evt.event}</div>
              </div>
              <span className={`text-xs font-medium px-1.5 py-0.5 rounded-full flex-shrink-0 ${evt.type === 'Earnings' ? 'bg-blue-50 text-blue-600' : 'bg-amber-50 text-amber-600'}`}>{evt.type}</span>
            </div>
          )
        })}
      </div>
      {UPCOMING_EVENTS.length > 5 && (
        <Link to="/reports" className="inline-flex items-center gap-1 text-xs font-semibold text-editorial hover:text-navy transition-colors mt-2 no-underline">
          View all {UPCOMING_EVENTS.length} events
          <ChevronRight size={10} />
        </Link>
      )}
    </div>
  )
}

// ── Recently Updated Feed ──
function RecentlyUpdatedFeed() {
  const typeConfig = {
    data: { bg: 'bg-blue-50', text: 'text-blue-600', icon: BarChart3 },
    analysis: { bg: 'bg-purple-50', text: 'text-purple-600', icon: FileText },
    alert: { bg: 'bg-red-50', text: 'text-red-600', icon: AlertTriangle },
  }

  return (
    <div>
      <SectionHeader size="md" subtitle="Across all sections">Recently Updated</SectionHeader>
      <div className="space-y-1.5">
        {RECENTLY_UPDATED.slice(0, 5).map((item, i) => {
          const tc = typeConfig[item.type]
          const TypeIcon = tc.icon
          return (
            <Link key={i} to={item.link} className="no-underline">
              <div className="bg-white rounded-lg border border-gray-100 px-3 py-2.5 hover:shadow-sm hover:border-gray-200 transition-all flex items-start gap-3 group">
                <div className={`p-1.5 rounded-lg ${tc.bg} flex-shrink-0 mt-0.5`}>
                  <TypeIcon size={12} className={tc.text} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-xs font-bold bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded">{item.section}</span>
                    <span className="text-xs text-gray-500">{item.timestamp}</span>
                  </div>
                  <div className="text-xs font-medium text-navy group-hover:text-gold transition-colors">{item.item}</div>
                  <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{item.description}</p>
                </div>
                <ChevronRight size={12} className="text-gray-300 group-hover:text-gold transition-colors flex-shrink-0 mt-1" />
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}


// ══════════════════════════════════════════════════════════
// TIER 3 COMPONENTS — Deep Dive CTAs
// ══════════════════════════════════════════════════════════

function DeepDiveCTAs() {
  const ctas = [
    { label: 'View Full Category Data', sub: '11 categories with 5-year trends', to: '/categories', icon: BarChart3 },
    { label: 'View All Companies', sub: '14 public + 47 craft tracked', to: '/companies', icon: Activity },
    { label: 'Explore Pricing', sub: '208 brand expressions monitored', to: '/pricing', icon: DollarSign },
    { label: 'Geographic Intelligence', sub: '5 regions with market breakdowns', to: '/geographic', icon: Globe },
    { label: 'Venue Intelligence', sub: '50 Best Bars + 28 London venues', to: '/venues', icon: Target },
    { label: 'Generate Report', sub: 'Custom intelligence briefings', to: '/reports', icon: FileText },
  ]

  return (
    <div>
      <SectionHeader size="md" subtitle="Navigate to detailed intelligence">Explore Platform</SectionHeader>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {ctas.map((cta, i) => (
          <Link key={i} to={cta.to} className="no-underline">
            <div className="bg-white rounded-xl border border-gray-100 p-4 hover:shadow-md hover:border-gold/30 transition-all text-center group h-full flex flex-col items-center justify-center">
              <div className="p-2.5 rounded-xl bg-navy/[0.04] mb-3 group-hover:bg-gold/10 transition-colors">
                <cta.icon size={18} className="text-navy group-hover:text-gold transition-colors" />
              </div>
              <div className="text-xs font-semibold text-navy group-hover:text-gold transition-colors">{cta.label}</div>
              <p className="text-xs text-gray-500 mt-1">{cta.sub}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}


// ══════════════════════════════════════════════════════════
// INSIGHT BRIEFING SLIDE-OUT
// ══════════════════════════════════════════════════════════

function InsightBriefing({ briefing, onClose, triggerRef }) {
  const panelRef = useRef(null)
  const closeRef = useRef(null)
  const [visible, setVisible] = useState(false)
  const [animating, setAnimating] = useState(false)

  // Two-phase mount/unmount for exit animation
  useEffect(() => {
    if (briefing) {
      setVisible(true)
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setAnimating(true))
      })
    } else if (visible) {
      setAnimating(false)
      const timer = setTimeout(() => setVisible(false), 300)
      return () => clearTimeout(timer)
    }
  }, [briefing])

  // Animated close handler
  const handleClose = useCallback(() => {
    if (!animating) return
    setAnimating(false)
    setTimeout(() => {
      setVisible(false)
      onClose()
    }, 300)
  }, [animating, onClose])

  // Focus trap + Escape key
  useEffect(() => {
    if (!visible || !animating) return
    // Focus the panel on open
    const timer = setTimeout(() => {
      if (panelRef.current) panelRef.current.focus()
    }, 50)

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        handleClose()
        return
      }
      // Focus trap: cycle Tab within the panel
      if (e.key === 'Tab' && panelRef.current) {
        const focusable = panelRef.current.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        )
        if (focusable.length === 0) return
        const first = focusable[0]
        const last = focusable[focusable.length - 1]
        if (e.shiftKey) {
          if (document.activeElement === first) { e.preventDefault(); last.focus() }
        } else {
          if (document.activeElement === last) { e.preventDefault(); first.focus() }
        }
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      clearTimeout(timer)
      document.removeEventListener('keydown', handleKeyDown)
      // Return focus to trigger on close
      if (triggerRef && triggerRef.current) triggerRef.current.focus()
    }
  }, [visible, animating, handleClose, triggerRef])

  if (!visible) return null
  return (
    <>
      <div
        className={`fixed inset-0 bg-black z-50 transition-opacity duration-300 ${animating ? 'opacity-30' : 'opacity-0'}`}
        onClick={handleClose}
        aria-hidden="true"
      />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="briefing-title"
        tabIndex={-1}
        className={`fixed right-0 top-0 bottom-0 w-full max-w-lg bg-white z-50 shadow-2xl overflow-y-auto outline-none transition-transform duration-300 ease-out ${animating ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="sticky top-0 bg-white border-b border-gray-200 px-5 py-4 flex items-center justify-between z-10">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-navy/10 rounded-lg">
              <BookOpen size={16} className="text-navy" />
            </div>
            <div>
              <h3 id="briefing-title" className="text-sm font-bold text-navy">Intelligence Brief</h3>
              <p className="text-xs text-gray-500">Auto-generated executive summary</p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <button onClick={() => { navigator.clipboard.writeText(`${briefing.title}\n\n${briefing.summary}\n\n${briefing.keyPoints.join('\n')}\n\n${briefing.actionable}`) }} className="p-2 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-lg hover:bg-gray-100 text-gray-600 hover:text-navy transition-colors touch-manipulation" title="Copy to clipboard" aria-label="Copy briefing to clipboard">
              <Copy size={14} />
            </button>
            <button ref={closeRef} onClick={handleClose} className="p-2 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-lg hover:bg-gray-100 text-gray-600 hover:text-navy transition-colors touch-manipulation" aria-label="Close briefing panel">
              <X size={16} />
            </button>
          </div>
        </div>
        <div className="p-5 space-y-5">
          <div>
            <h2 className="font-display text-section text-navy mb-2">{briefing.title}</h2>
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
            <h4 className="text-micro font-bold text-gray-500 uppercase tracking-wide mb-1.5">Sources</h4>
            <div className="flex flex-wrap gap-1.5">
              {briefing.sources.map((src, i) => (
                <span key={i} className="text-micro bg-gray-100 text-gray-600 px-2 py-1 rounded-full">{src}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}


// ══════════════════════════════════════════════════════════
// MAIN PAGE — Three-Tier Progressive Disclosure
// ══════════════════════════════════════════════════════════

export default function CommandCentre() {
  const [activeBriefing, setActiveBriefing] = useState(null)
  const [loading, setLoading] = useState(true)
  const [mobileDetail, setMobileDetail] = useState(null)
  const [fabOpen, setFabOpen] = useState(false)
  const briefingTriggerRef = useRef(null)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 300)
    return () => clearTimeout(timer)
  }, [])

  const handleBriefingClick = useCallback((label) => {
    const briefing = INSIGHT_BRIEFINGS[label]
    if (!briefing) return
    // On mobile, show briefing in BottomSheet instead of slide-out panel
    if (window.innerWidth < 1024) {
      setMobileDetail({
        title: briefing.title,
        content: (
          <div className="space-y-4">
            <p className="text-xs text-gray-700 leading-relaxed">{briefing.summary}</p>
            <div>
              <p className="text-xs font-bold text-navy mb-1.5">Key Intelligence Points</p>
              <div className="space-y-1.5">
                {briefing.keyPoints.map((point, i) => (
                  <div key={i} className="flex gap-2 text-xs text-gray-700 bg-gray-50 rounded-lg p-2.5">
                    <span className="text-gold font-bold">{i + 1}.</span>
                    <span className="leading-relaxed">{point}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-gold/5 border border-gold/20 rounded-xl p-3">
              <p className="text-xs font-bold text-navy mb-1">Actionable Recommendation</p>
              <p className="text-xs text-navy leading-relaxed">{briefing.actionable}</p>
            </div>
            <div className="flex flex-wrap gap-1">
              {briefing.sources.map((src, i) => (
                <span key={i} className="text-micro bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">{src}</span>
              ))}
            </div>
          </div>
        )
      })
      return
    }
    setActiveBriefing(briefing)
  }, [])

  if (loading) {
    return (
      <div className="space-y-6">
        <PageHeader
          title="Command Centre"
          subtitle="Loading intelligence\u2026"
        />
        <BentoGrid>
          <BentoGrid.Hero><SkeletonCard className="h-40" /></BentoGrid.Hero>
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
        </BentoGrid>
        <SkeletonChart />
        <SkeletonCard className="h-24" />
        <SkeletonCard className="h-24" />
      </div>
    )
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* ── Page Header ── */}
      <PageHeader
        title="Command Centre"
        subtitle={`Global beverage alcohol intelligence ${'\u2014'} real-time market monitoring`}
        action={
          <div className="text-right space-y-1">
            <DataFreshness date="March 2026" source="IWSR, Euromonitor, Industry" />
            <div className="text-[10px] text-gray-400">Last refreshed: 26 Mar 2026 14:30 GMT</div>
          </div>
        }
      />

      {/* ══════════════════════════════════════════════════════
          TIER 1 — Executive Dashboard Bento Grid
          F-pattern: Hero top-left, KPIs right + below
         ══════════════════════════════════════════════════════ */}
      <div className="flex gap-6">
        {/* Primary content column */}
        <div className="flex-1 min-w-0 space-y-6">

          {/* Bento Grid: Hero + 4 KPI cards */}
          <BentoGrid>
            <BentoGrid.Hero>
              <HeroMarketCard />
            </BentoGrid.Hero>
            <KpiSummaryCards />
          </BentoGrid>

          {/* Market Pulse Banner */}
          <MarketPulseBanner />

          {/* ══════════════════════════════════════════════════════
              TIER 2 — Expandable Sections (DrillDown panels)
             ══════════════════════════════════════════════════════ */}

          <DrillDown
            title="Category Performance"
            summary={`${CATEGORY_SNAPSHOT.length} categories tracked \u2014 ${CATEGORY_SNAPSHOT.filter(c => c.dir === 'up').length} growing`}
            defaultOpen={true}
          >
            <CategoryPerformance />
          </DrillDown>

          <DrillDown
            title="Recent Movers"
            summary={`${RECENT_MOVERS.length} significant movements this period`}
          >
            <RecentMovers />
          </DrillDown>

          <DrillDown
            title="Price Alerts"
            summary={`${PRICE_ALERTS.filter(a => a.severity === 'alert').length} alerts \u00b7 ${PRICE_ALERTS.filter(a => a.severity === 'opportunity').length} opportunities`}
          >
            <PriceAlertsSummary />
          </DrillDown>

          <DrillDown
            title="Geographic Highlights"
            summary="Top performing regions with sparkline trends"
          >
            <GeographicHighlights />
          </DrillDown>

          <DrillDown
            title="Market Signals"
            summary={`${MARKET_SIGNALS.filter(s => s.urgency === 'high').length} high priority signals`}
          >
            <MarketSignalsFeed />
          </DrillDown>

          <DrillDown
            title="Intelligence Feed"
            summary="Category movements with detailed analysis"
          >
            <MarketPulseExpanded />
          </DrillDown>

          <DrillDown
            title="Upcoming Events"
            summary={`${UPCOMING_EVENTS.length} earnings calls and trade shows`}
          >
            <UpcomingEventsMini />
          </DrillDown>

          <DrillDown
            title="Recently Updated"
            summary="Latest data changes across the platform"
          >
            <RecentlyUpdatedFeed />
          </DrillDown>

          {/* ══════════════════════════════════════════════════════
              TIER 3 — Deep Dive Navigation CTAs
             ══════════════════════════════════════════════════════ */}
          <DeepDiveCTAs />

        </div>

        {/* Live Feed sidebar — right side (desktop only) */}
        <div className="hidden xl:block w-80 flex-shrink-0">
          <div className="sticky top-6">
            <LiveFeed maxItems={12} compact={true} />
          </div>
        </div>
      </div>

      {/* Insight Briefing Slide-Out (desktop) */}
      <InsightBriefing briefing={activeBriefing} onClose={() => setActiveBriefing(null)} triggerRef={briefingTriggerRef} />

      {/* Mobile BottomSheet for briefing detail */}
      <BottomSheet
        open={!!mobileDetail}
        onClose={() => setMobileDetail(null)}
        title={mobileDetail?.title || 'Detail'}
      >
        {mobileDetail?.content}
      </BottomSheet>

      {/* Quick Action FAB */}
      <div className="fixed bottom-20 right-4 lg:bottom-6 lg:right-6 z-40">
        {fabOpen && (
          <div className="mb-3 flex flex-col gap-2 animate-fadeIn">
            <Link to="/pricing" className="flex items-center gap-2 bg-white shadow-lg rounded-full px-4 py-2 text-small font-medium text-navy hover:bg-gray-50 min-h-[44px]">
              <DollarSign size={16} /> Check Pricing
            </Link>
            <Link to="/categories" className="flex items-center gap-2 bg-white shadow-lg rounded-full px-4 py-2 text-small font-medium text-navy hover:bg-gray-50 min-h-[44px]">
              <BarChart3 size={16} /> Category Deep Dive
            </Link>
            <Link to="/companies" className="flex items-center gap-2 bg-white shadow-lg rounded-full px-4 py-2 text-small font-medium text-navy hover:bg-gray-50 min-h-[44px]">
              <Building2 size={16} /> Company Intel
            </Link>
          </div>
        )}
        <button
          onClick={() => setFabOpen(!fabOpen)}
          className="w-14 h-14 bg-navy text-white rounded-full shadow-lg flex items-center justify-center hover:bg-navy/90 transition-all"
          aria-label="Quick actions"
        >
          {fabOpen ? <X size={24} /> : <Zap size={24} />}
        </button>
      </div>
    </div>
  )
}
