import React from 'react'
import { Link } from 'react-router-dom'
import {
  PageHeader, Card, MetricCard, BentoGrid, SectionHeader, DataFreshness,
} from '../components/ui'
import { Globe, TrendingUp, Wine, Beer, Grape, Sparkles, Package, AlertTriangle, Zap } from 'lucide-react'
import { REGIONAL_PULSE_EXTENDED, CATEGORY_SNAPSHOT, MARKET_SIGNALS } from '../data/commandCentreData'
import { ResponsiveContainer, AreaChart, Area, XAxis, Tooltip } from 'recharts'

// Total drinks market as of 2025 — corrected from $1.1T headline to $1.6T
// (original number was spirits-only; drinks market includes beer, wine, nolo, RTD)
const DRINKS_MARKET_SEGMENTS = [
  {
    key: 'spirits',
    label: 'Spirits',
    value: '$635B',
    growth: '+3.1%',
    icon: Wine,
    note: 'Premiumisation driving value; tequila, whisky leading',
    link: '/categories',
    color: '#1A1F36',
  },
  {
    key: 'beer',
    label: 'Beer & Craft',
    value: '$880B',
    growth: '+1.4%',
    icon: Beer,
    note: 'Largest by value; H1 2025 saw first premium volume decline in 4yrs',
    link: '/categories',
    color: '#C9A96E',
  },
  {
    key: 'wine',
    label: 'Wine & Champagne',
    value: '$330B',
    growth: '-1.2%',
    icon: Grape,
    note: 'Structural volume decline; sparkling outperforming still',
    link: '/categories',
    color: '#722F37',
  },
  {
    key: 'nolo',
    label: 'NoLo',
    value: '$31B',
    growth: '+9.5%',
    icon: Sparkles,
    note: 'Fastest-growing segment; GLP-1, Dry Jan, Gen Z driving',
    link: '/categories',
    color: '#38A169',
  },
  {
    key: 'rtd',
    label: 'RTD',
    value: '$40B',
    growth: '+16.4%',
    icon: Package,
    note: 'Spirits-based RTDs now 47% of volume (was 8% in 2021)',
    link: '/categories',
    color: '#8B5CF6',
  },
]

/* ── Liquid Intelligence derived values (all static data, computed once at module level) ── */
const liGrowingSegCount = DRINKS_MARKET_SEGMENTS.filter(s => !s.growth.startsWith('-')).length

const liHighUrgencyCount = (MARKET_SIGNALS || []).filter(s => s.urgency === 'high').length

const liFastestSeg = DRINKS_MARKET_SEGMENTS.reduce((best, s) => {
  const pct = parseFloat(s.growth.replace(/[^-\d.]/g, ''))
  const bestPct = parseFloat(best.growth.replace(/[^-\d.]/g, ''))
  return pct > bestPct ? s : best
})
const liFastestPct = parseFloat(liFastestSeg.growth.replace(/[^-\d.]/g, ''))

const liSig1 = liGrowingSegCount >= 5
  ? { dot: 'bg-emerald-500', color: 'text-emerald-700', label: 'Full Sector Expansion', copy: 'All five market segments are growing. Broad-based momentum creates an exceptional window for launches, distributor renegotiations, and premium shelf positioning across categories.' }
  : liGrowingSegCount >= 4
  ? { dot: 'bg-blue-500', color: 'text-blue-700', label: 'Broad Sector Growth', copy: `${liGrowingSegCount} of 5 market segments advancing. Wine (-1.2% YoY) is the sole contraction — spirits, beer, NoLo, and RTD all positive. Prioritise 2026 entry into growing categories.` }
  : liGrowingSegCount >= 3
  ? { dot: 'bg-amber-500', color: 'text-amber-700', label: 'Mixed Sector Momentum', copy: 'More than one segment in decline. Concentrate investment in growing verticals and exit volume commitments in contracting categories.' }
  : { dot: 'bg-amber-500', color: 'text-amber-700', label: 'Sector Contraction', copy: 'Most market segments in decline. Defensive positioning advised — protect premium SKUs, reduce promotional spend in over-indexed channels, hold pricing discipline.' }

const liSig2 = liHighUrgencyCount === 0
  ? { dot: 'bg-emerald-500', color: 'text-emerald-700', label: 'Clear Macro Environment', copy: 'No high-urgency macro signals active. Stable backdrop supports planned investment and distributor expansion programmes through 2026.' }
  : liHighUrgencyCount <= 2
  ? { dot: 'bg-blue-500', color: 'text-blue-700', label: 'Manageable Headwinds', copy: `${liHighUrgencyCount} high-urgency market signal${liHighUrgencyCount === 1 ? '' : 's'} active. Monitor the Market Signals section — current events are material but containable within standard planning assumptions.` }
  : liHighUrgencyCount <= 3
  ? { dot: 'bg-amber-500', color: 'text-amber-700', label: 'Elevated Macro Risk', copy: `${liHighUrgencyCount} high-urgency signals active: China 30% import duty on EU spirits, EU label enforcement from June 2026, and Diageo capital signals. Cognac-exposed brands face compounding headwinds — review forward hedge positions.` }
  : { dot: 'bg-red-500', color: 'text-red-700', label: 'Critical Risk Concentration', copy: `${liHighUrgencyCount} high-urgency market signals active simultaneously. Reassess launch timelines, review distributor contract flexibility, and escalate to senior planning.` }

const liSig3 = liFastestPct >= 15
  ? { dot: 'bg-emerald-500', color: 'text-emerald-700', label: 'Exceptional Growth Window', copy: `${liFastestSeg.label} (${liFastestSeg.growth} YoY) is the standout growth opportunity. Spirits-based RTDs now hold 47% of segment volume — white space remains in premium on-premise formats and functional hybrid expressions.` }
  : liFastestPct >= 8
  ? { dot: 'bg-blue-500', color: 'text-blue-700', label: 'Strong Growth Window', copy: `${liFastestSeg.label} (${liFastestSeg.growth} YoY) leads all segments. Accelerate NPD and distribution investment in this category ahead of the next pricing cycle.` }
  : liFastestPct >= 4
  ? { dot: 'bg-blue-500', color: 'text-blue-700', label: 'Solid Growth Leader', copy: `${liFastestSeg.label} (${liFastestSeg.growth} YoY) is the fastest-growing segment. Moderate pace supports sustainable margin management without capacity over-extension.` }
  : { dot: 'bg-amber-500', color: 'text-amber-700', label: 'Subdued Growth Leader', copy: `${liFastestSeg.label} (${liFastestSeg.growth} YoY) is the strongest performer in a broadly flat market. Focus on margin preservation and channel optimisation rather than volume growth.` }

export default function MarketOverview() {
  const totalValue = '$1.6T'
  const totalGrowth = '+1.5%'
  const cagr10 = '+3.4%'

  // Global trend constructed as sum of regional values
  const globalTrend = REGIONAL_PULSE_EXTENDED && REGIONAL_PULSE_EXTENDED[0] && REGIONAL_PULSE_EXTENDED[0].trend
    ? REGIONAL_PULSE_EXTENDED[0].trend.map((_, i) => {
        const total = REGIONAL_PULSE_EXTENDED.reduce((sum, r) => sum + (r.trend[i]?.v || 0), 0)
        return { year: REGIONAL_PULSE_EXTENDED[0].trend[i].year, v: total }
      })
    : []

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <PageHeader
        title={<span className="inline-flex items-center">Global Drinks Market</span>}
        subtitle={"Total addressable market across all drinks categories — spirits, beer, wine, NoLo, RTD"}
        breadcrumbs={[
          { label: 'Command Centre', to: '/' },
          { label: 'Market Overview' },
        ]}
      />
      <DataFreshness date="April 2026" source="IWSR, Euromonitor, Rabobank, DISCUS, OIV" />

      {/* Hero card */}
      <Card className="p-5 sm:p-8 bg-gradient-to-br from-navy/5 to-gold/5 border-gold/20">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Global Total Drinks Market 2025</p>
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mt-1">
              <h1 className="text-3xl sm:text-5xl font-display font-bold text-navy">{totalValue}</h1>
              <span className="text-lg font-semibold text-emerald-600">{totalGrowth} YoY</span>
              <span className="text-sm text-gray-500">{'·'} {cagr10} 10-yr CAGR</span>
            </div>
            <p className="text-sm text-gray-600 mt-2 max-w-2xl">
              Market includes spirits ($635B), beer ($880B), wine ($330B), NoLo ($31B), and RTD ($40B).
              Growth stalled in 2021-2025 (+0.5-1.5% CAGR) due to China cognac tariffs and GLP-1 structural demand shock.
            </p>
          </div>
          {globalTrend.length > 0 && (
            <div className="w-full sm:w-64 h-20">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={globalTrend} margin={{ top: 5, right: 5, bottom: 5, left: 5 }} accessibilityLayer>
                  <XAxis dataKey="year" tick={{ fontSize: 10, fill: '#9ca3af' }} />
                  <Tooltip contentStyle={{ background: '#1e293b', border: 'none', borderRadius: 8, fontSize: 11 }} labelStyle={{ color: '#f1f5f9' }} itemStyle={{ color: '#f1f5f9' }} formatter={(v) => [`$${v}B`, 'Drinks']} />
                  <Area type="monotone" dataKey="v" stroke="#C9A96E" strokeWidth={2} fill="#C9A96E22" dot={false} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>
      </Card>

      {/* Category group breakdown */}
      <SectionHeader size="lg" subtitle="Click a category group to drill into sub-categories">
        Category Group Breakdown
      </SectionHeader>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
        {DRINKS_MARKET_SEGMENTS.map(seg => {
          const Icon = seg.icon
          const isUp = !seg.growth.startsWith('-')
          return (
            <Link key={seg.key} to={seg.link} className="no-underline">
              <div
                className="bg-white rounded-xl border border-gray-100 p-4 hover:shadow-md hover:border-gold/30 transition-all group h-full"
                style={{ borderTopColor: seg.color, borderTopWidth: 3 }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <div className="p-1.5 rounded-lg" style={{ backgroundColor: `${seg.color}15` }}>
                    <Icon size={14} style={{ color: seg.color }} />
                  </div>
                  <span className="text-xs font-semibold text-navy group-hover:text-gold transition-colors">{seg.label}</span>
                </div>
                <div className="text-2xl font-bold text-navy">{seg.value}</div>
                <div className={`text-xs font-semibold mt-0.5 ${isUp ? 'text-emerald-600' : 'text-red-500'}`}>{seg.growth} YoY</div>
                <p className="text-xs text-gray-500 mt-2 leading-relaxed">{seg.note}</p>
              </div>
            </Link>
          )
        })}
      </div>

      {/* Liquid Intelligence */}
      <div className="border border-gold/30 rounded-xl bg-gradient-to-r from-amber-50/60 to-white p-4">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-7 h-7 rounded-lg bg-gold/10 flex items-center justify-center">
            <Zap size={14} className="text-gold" />
          </div>
          <span className="text-xs font-bold text-gold uppercase tracking-wider">Liquid Intelligence</span>
          <span className="text-xs text-gray-400 ml-auto">Global Market Signals {'·'} 2025</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {[liSig1, liSig2, liSig3].map((sig, i) => (
            <div key={i} className="bg-white/70 rounded-lg p-3 border border-gold/10">
              <div className="flex items-center gap-1.5 mb-1.5">
                <div className={`w-2 h-2 rounded-full flex-shrink-0 ${sig.dot}`} />
                <span className={`text-xs font-bold uppercase tracking-wide ${sig.color}`}>{sig.label}</span>
              </div>
              <p className="text-xs text-gray-600 leading-relaxed">{sig.copy}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Regional pulse with 10yr CAGR */}
      <SectionHeader size="lg" subtitle={"Regional share of global drinks market · 10-year compound annual growth (2016-2025)"}>
        Regional Breakdown {'—'} 10 Year Trend
      </SectionHeader>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
        {(REGIONAL_PULSE_EXTENDED || []).map((r, i) => {
          const isUp = r.dir === 'up'
          const trendData = (r.trend || []).map(p => ({ v: p.v, year: p.year }))
          return (
            <Link key={i} to="/geographic" className="no-underline">
              <div className="bg-white rounded-xl border border-gray-100 p-4 hover:shadow-md hover:border-gold/30 transition-all group h-full">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl">{r.flag}</span>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-semibold text-navy group-hover:text-gold transition-colors truncate">{r.region}</div>
                  </div>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-xl font-bold text-navy">{r.value}</span>
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <span className={`text-xs font-semibold ${isUp ? 'text-emerald-600' : 'text-red-500'}`}>{r.growth} YoY</span>
                  {r.cagr10 && <span className="text-xs text-gray-500">{r.cagr10} 10yr</span>}
                </div>
                <div className="w-full h-10 mt-2">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={trendData} margin={{ top: 2, right: 2, bottom: 2, left: 2 }} accessibilityLayer>
                      <Area type="monotone" dataKey="v" stroke={isUp ? '#22c55e' : '#ef4444'} strokeWidth={1.5} fill={isUp ? '#22c55e15' : '#ef444415'} dot={false} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
                <p className="text-xs text-gray-500 mt-1 line-clamp-2">{r.note}</p>
              </div>
            </Link>
          )
        })}
      </div>

      {/* Key macro signals */}
      <SectionHeader size="lg" subtitle="High-urgency market events shaping the 2025-2026 outlook">
        Market Signals
      </SectionHeader>

      <div className="space-y-2">
        {(MARKET_SIGNALS || []).slice(0, 5).map((signal, i) => (
          <div key={i} className="bg-white rounded-lg border border-gray-100 p-3 hover:shadow-sm transition-shadow flex items-start gap-3">
            <AlertTriangle size={14} className={signal.urgency === 'high' ? 'text-red-500 mt-0.5' : 'text-amber-500 mt-0.5'} />
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className={`text-xs font-bold uppercase px-1.5 py-0.5 rounded-full ${signal.urgency === 'high' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'}`}>{signal.urgency}</span>
                <span className="text-xs font-semibold px-1.5 py-0.5 rounded-full bg-gray-100 text-gray-700">{signal.type}</span>
                <span className="text-xs text-gray-500 ml-auto">{signal.date}</span>
              </div>
              <h4 className="text-sm font-semibold text-navy leading-snug">{signal.headline}</h4>
              <p className="text-xs text-gray-500 mt-1">{signal.impact}</p>
              <div className="text-xs text-gray-400 mt-1">Source: {signal.source}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Methodology footer */}
      <Card className="p-4 bg-gray-50 border-gray-200">
        <div className="flex items-start gap-3">
          <Globe size={16} className="text-gray-500 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-xs font-semibold text-navy mb-1">Methodology</p>
            <p className="text-xs text-gray-600 leading-relaxed">
              Total market size combines IWSR Global Drinks Database 2025, Euromonitor Passport Alcoholic Drinks, Rabobank Beer Monitor, OIV Wine Report, and DISCUS Economic Briefing.
              Regional 10-year CAGR computed from 2016-2025 year-end values. Growth rates represent value change in USD at constant exchange rates.
              Category values sum to $1.6T; note beer ($880B) and spirits ($635B) together comprise 95% of total.
            </p>
          </div>
        </div>
      </Card>
    </div>
  )
}
