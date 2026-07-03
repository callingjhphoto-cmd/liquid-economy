import React, { useState, useMemo, useRef } from 'react'
import {
  Calculator, TrendingUp,
  ToggleLeft, ToggleRight, Target, AlertTriangle,
  Zap, Package, BarChart3, Gauge, Download, Eye
} from 'lucide-react'
import {
  BarChart, Bar, ResponsiveContainer, XAxis, YAxis, Tooltip,
  Cell, RadarChart, Radar, PolarGrid,
  PolarAngleAxis, PolarRadiusAxis, CartesianGrid
} from 'recharts'
import {
  CATEGORY_COGS, LAUNCH_READINESS, BOTTLE_SIZES, CHANNELS,
  CHANNEL_LABELS, INDUSTRY_BENCHMARKS, COST_ENTRIES
} from '../data/marginCalcData'
import {
  Card, MetricCard, PageHeader, BentoGrid, DrillDown,
  ChartCard, DataTable, SubPageNav, BottomSheet, DataFreshness
} from '../components/ui'
import { CHART_COLORS } from '../data/chartColors'

// ── Helpers ──
const fmt = (v) => '£' + v.toFixed(2)
const pct = (v) => (v * 100).toFixed(1) + '%'

// ── Margin Gauge (donut) ──
function MarginGauge({ margin, label, size = 'md' }) {
  const color = margin >= 45 ? '#22c55e' : margin >= 35 ? '#C9A96E' : margin >= 25 ? '#f59e0b' : '#ef4444'
  const descriptor = margin >= 45 ? 'Excellent' : margin >= 35 ? 'Healthy' : margin >= 25 ? 'Tight' : 'Critical'
  const dim = size === 'lg' ? 'w-24 h-24' : 'w-16 h-16'
  const textSize = size === 'lg' ? 'text-base' : 'text-sm'
  return (
    <div className="text-center">
      {label && <div className="text-xs text-gray-500 mb-1">{label}</div>}
      <div className={`relative ${dim} mx-auto`}>
        <svg viewBox="0 0 36 36" className="w-full h-full">
          <path d="M18 2.0845a 15.9155 15.9155 0 0 1 0 31.831a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#e5e7eb" strokeWidth="3" />
          <path d="M18 2.0845a 15.9155 15.9155 0 0 1 0 31.831a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke={color} strokeWidth="3" strokeDasharray={`${Math.max(0, margin)}, 100`} strokeLinecap="round" />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className={`${textSize} font-bold`} style={{ color }}>{margin.toFixed(1)}%</span>
        </div>
      </div>
      <div className="text-xs font-medium mt-1" style={{ color }}>{descriptor}</div>
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
        <div className={`text-xs ${impact > 0 ? 'text-green-600' : impact < 0 ? 'text-red-500' : 'text-gray-500'}`}>
          {impact > 0 ? '+' : ''}{impact.toFixed(1)}% margin impact
        </div>
      </div>
    </button>
  )
}

// ── Cost Waterfall Bar ──
function CostBar({ label, value, max, color, highlight }) {
  const w = Math.min((value / max) * 100, 100)
  return (
    <div className={`flex items-center gap-2 py-1 ${highlight ? 'bg-gold/5 -mx-2 px-2 rounded' : ''}`}>
      <div className="w-28 text-xs text-gray-500 truncate">{label}</div>
      <div className="flex-1 bg-gray-100 rounded-full h-3 overflow-hidden">
        <div className="h-full rounded-full transition-all duration-500" style={{ width: w + '%', backgroundColor: color || '#1e3a5f' }} />
      </div>
      <div className="w-14 text-right text-xs font-semibold text-navy">{fmt(value)}</div>
    </div>
  )
}

// ══════════════════════════════════════════
// MAIN COMPONENT
// ══════════════════════════════════════════
export default function MarginCalculator() {
  // ── State ──
  const [category, setCategory] = useState('tequila')
  const [bottleSize, setBottleSize] = useState(0)
  const [channel, setChannel] = useState('offTrade')
  const [targetRRP, setTargetRRP] = useState(35)
  const [scenarios, setScenarios] = useState({})
  const [showTier3, setShowTier3] = useState(false)
  const [mobileDetail, setMobileDetail] = useState(null)
  const [advancedMode, setAdvancedMode] = useState(false)
  const cogsRef = useRef(null)

  const cat = CATEGORY_COGS[category]
  const sizeFactor = BOTTLE_SIZES[bottleSize].factor
  const benchmarks = INDUSTRY_BENCHMARKS[category]

  const handleCategoryChange = (newCat) => {
    setCategory(newCat)
    setScenarios({})
    const c = CATEGORY_COGS[newCat]
    if (c) setTargetRRP(c.avgRRP[channel] || c.avgRRP.offTrade)
  }

  // ── Compute COGS with scenarios ──
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

    Object.entries(cat.scenarios).forEach(([key, sc]) => {
      if (!scenarios[key]) return
      if (sc.multiplier) costs[sc.field] = costs[sc.field] * sc.multiplier
      else if (sc.saving) costs[sc.field] = Math.max(0, costs[sc.field] - sc.saving)
      else if (sc.newValue !== undefined) costs[sc.field] = sc.newValue
    })

    Object.keys(costs).forEach(k => {
      if (k !== 'duty') costs[k] = costs[k] * sizeFactor
    })

    const total = Object.values(costs).reduce((a, b) => a + b, 0)
    const margin = targetRRP > 0 ? ((targetRRP - total) / targetRRP) * 100 : 0

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

    // Channel margins
    const channelMargins = {}
    CHANNELS.forEach(ch => {
      const rrp = cat.avgRRP[ch] || 0
      const chMargin = rrp > 0 ? ((rrp - baseTotal) / rrp) * 100 : 0
      channelMargins[ch] = { rrp, margin: chMargin }
    })

    return { costs, total, margin, baseTotal, baseMargin, scenarioImpacts, baseCosts, channelMargins }
  }, [cat, scenarios, bottleSize, targetRRP, sizeFactor, channel])

  if (!cat || !computed) return <div className="p-8 text-gray-500">Loading...</div>

  const costLabels = COST_ENTRIES.map(e => ({
    ...e,
    label: e.key === 'rawMaterial' ? cat.rawMaterial.name : e.label
  }))

  const pieData = costLabels.map(e => ({ name: e.label, value: parseFloat(computed.costs[e.key].toFixed(2)), color: e.color }))

  // Find biggest cost component
  const biggestCost = costLabels.reduce((max, e) => computed.costs[e.key] > (max.value || 0) ? { label: e.label, value: computed.costs[e.key] } : max, {})

  // Best scenario improvement
  const bestScenario = Object.entries(computed.scenarioImpacts).reduce((best, [key, impact]) => impact > (best.impact || -999) ? { key, impact, label: cat.scenarios[key].label } : best, {})

  // Waterfall data for Tier 2 chart
  const waterfallData = costLabels.map(e => ({
    name: e.label.length > 12 ? e.label.substring(0, 12) + '…' : e.label,
    cost: parseFloat(computed.costs[e.key].toFixed(2)),
    fill: e.color,
  }))
  waterfallData.push({ name: 'Margin', cost: parseFloat(Math.max(0, targetRRP - computed.total).toFixed(2)), fill: '#22c55e' })

  // Channel comparison data
  const channelChartData = CHANNELS.map(ch => ({
    name: CHANNEL_LABELS[ch],
    margin: parseFloat(computed.channelMargins[ch].margin.toFixed(1)),
    rrp: computed.channelMargins[ch].rrp,
    current: ch === channel,
  }))

  // Comparison vs industry
  const comparisonData = [
    { name: 'Your Product', margin: parseFloat(computed.margin.toFixed(1)) },
    { name: 'Category Avg', margin: benchmarks.avgMargin },
    { name: 'High-End Avg', margin: benchmarks.highEndMargin },
    { name: 'Mid-Tier Avg', margin: benchmarks.midTierMargin },
    { name: 'Value Avg', margin: benchmarks.valueMargin },
  ]

  // Launch readiness radar
  const readiness = LAUNCH_READINESS[category]
  const readinessScore = Math.round((readiness.categoryGrowth + readiness.cogsTrend + readiness.competitiveDensity + readiness.geographicOpportunity + readiness.posAvailability) / 5)
  const readinessColor = readinessScore >= 70 ? '#22c55e' : readinessScore >= 50 ? '#C9A96E' : '#ef4444'
  const radarData = [
    { metric: 'Growth', value: readiness.categoryGrowth },
    { metric: 'COGS', value: readiness.cogsTrend },
    { metric: 'Competition', value: readiness.competitiveDensity },
    { metric: 'Geography', value: readiness.geographicOpportunity },
    { metric: 'POS', value: readiness.posAvailability },
  ]

  // DataTable columns for Tier 3
  const cogsTableColumns = [
    { key: 'component', label: 'Component' },
    { key: 'baseCost', label: 'Base Cost', align: 'right', render: (v) => fmt(v) },
    { key: 'scenarioCost', label: 'With Scenarios', align: 'right', render: (v) => fmt(v) },
    { key: 'pctOfTotal', label: '% of COGS', align: 'right', render: (v) => v.toFixed(1) + '%' },
    { key: 'pctOfRRP', label: '% of RRP', align: 'right', render: (v) => v.toFixed(1) + '%' },
  ]
  const cogsTableData = costLabels.map(e => ({
    component: e.label,
    baseCost: computed.baseCosts[e.key],
    scenarioCost: computed.costs[e.key],
    pctOfTotal: computed.total > 0 ? (computed.costs[e.key] / computed.total) * 100 : 0,
    pctOfRRP: targetRRP > 0 ? (computed.costs[e.key] / targetRRP) * 100 : 0,
  }))
  cogsTableData.push({
    component: 'Total COGS',
    baseCost: computed.baseTotal,
    scenarioCost: computed.total,
    pctOfTotal: 100,
    pctOfRRP: targetRRP > 0 ? (computed.total / targetRRP) * 100 : 0,
  })
  cogsTableData.push({
    component: 'Gross Profit',
    baseCost: Math.max(0, targetRRP - computed.baseTotal),
    scenarioCost: Math.max(0, targetRRP - computed.total),
    pctOfTotal: 0,
    pctOfRRP: targetRRP > 0 ? (Math.max(0, targetRRP - computed.total) / targetRRP) * 100 : 0,
  })

  // Cross-category comparison for Tier 3
  const crossCatColumns = [
    { key: 'category', label: 'Category' },
    { key: 'avgMargin', label: 'Avg Margin', align: 'right', render: (v) => v + '%' },
    { key: 'highEndMargin', label: 'High-End', align: 'right', render: (v) => v + '%' },
    { key: 'midTierMargin', label: 'Mid-Tier', align: 'right', render: (v) => v + '%' },
    { key: 'valueMargin', label: 'Value', align: 'right', render: (v) => v + '%' },
    { key: 'source', label: 'Source', render: (v) => <span className="text-xs text-gray-500">{v}</span> },
  ]
  const crossCatData = Object.entries(INDUSTRY_BENCHMARKS).map(([key, bm]) => ({
    category: CATEGORY_COGS[key].label,
    ...bm,
  }))

  // Liquid Intelligence signals
  const marginAbove = (computed.margin - benchmarks.avgMargin).toFixed(1)
  const marginBelow = (benchmarks.avgMargin - computed.margin).toFixed(1)
  const liSig1 = computed.margin >= 45
    ? { dot: 'bg-emerald-500', color: 'text-emerald-600', label: 'Strong Margin Position', copy: `Your ${computed.margin.toFixed(1)}% margin is ${marginAbove}pp above the ${cat.label} category average (${benchmarks.avgMargin}%). Well-positioned to absorb input cost shocks or increase marketing investment.` }
    : computed.margin >= 35
    ? { dot: 'bg-blue-500', color: 'text-blue-600', label: 'Healthy Margin', copy: `At ${computed.margin.toFixed(1)}%, you are ${computed.margin > benchmarks.avgMargin ? marginAbove + 'pp above' : marginBelow + 'pp below'} the ${cat.label} average (${benchmarks.avgMargin}%). Adequate buffer for commodity volatility at current RRP.` }
    : computed.margin >= 25
    ? { dot: 'bg-amber-500', color: 'text-amber-600', label: 'Tight Margin', copy: `Your ${computed.margin.toFixed(1)}% is ${marginBelow}pp below the ${cat.label} average (${benchmarks.avgMargin}%). Limited headroom — review RRP or focus on reducing the highest input cost component.` }
    : { dot: 'bg-red-500', color: 'text-red-600', label: 'Critical Margin', copy: `At ${computed.margin.toFixed(1)}%, you are significantly below the ${cat.label} average (${benchmarks.avgMargin}%). A pricing or cost structure review is required before a viable commercial launch.` }
  const liSig2 = bestScenario.impact > 0
    ? { dot: 'bg-emerald-500', color: 'text-emerald-600', label: `Best Lever: ${bestScenario.label}`, copy: `Activating “${bestScenario.label}” adds +${bestScenario.impact.toFixed(1)}pp, bringing gross margin to ${(computed.baseMargin + bestScenario.impact).toFixed(1)}%. Use Advanced Mode to stack multiple scenarios and model the combined impact.` }
    : { dot: 'bg-gray-400', color: 'text-gray-500', label: 'No Positive Scenarios', copy: `No available scenario improves this category’s margin at the current RRP. Consider raising the RRP target or exploring direct sourcing to reduce input costs before launch.` }
  const liSig3 = readinessScore >= 70
    ? { dot: 'bg-emerald-500', color: 'text-emerald-600', label: 'Strong Launch Timing', copy: `${cat.label} scores ${readinessScore}/100 on launch readiness. Category growth, COGS trajectory, and geographic opportunity all support a market entry in the next 12 months.` }
    : readinessScore >= 50
    ? { dot: 'bg-blue-500', color: 'text-blue-600', label: 'Viable with Positioning', copy: `${cat.label} scores ${readinessScore}/100. Conditions are viable but competitive density is elevated — a clear brand point of difference is essential to justify the price tier.` }
    : { dot: 'bg-amber-500', color: 'text-amber-600', label: 'Challenging Timing', copy: `${cat.label} scores ${readinessScore}/100. Adverse COGS trends or high competitive density make this a difficult launch window. A phased entry with limited SKU focus is recommended.` }

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* ══════ PAGE HEADER ══════ */}
      <PageHeader
        title="Margin Calculator"
        subtitle="Model COGS, test scenarios, and benchmark margins across 11 drinks categories · Data as of April 2026"
        breadcrumbs={[{ label: 'Command Centre', to: '/' }, { label: 'Margin Calculator' }]}
      />
      <SubPageNav group="planning" />
      <DataFreshness date="April 2026" source="IWSR, NielsenIQ, trade body reports, UK HMRC duty tables" />

      {/* ══════ TIER 1: HERO + KPI BENTO ══════ */}
      <BentoGrid>
        {/* Hero card — quick calculator */}
        <BentoGrid.Wide>
          <Card padding="p-6">
            <div className="flex items-start gap-4 mb-4">
              <div className="p-3 rounded-xl bg-gradient-to-br from-navy/5 to-gold/5">
                <Calculator size={24} className="text-navy" />
              </div>
              <div className="flex-1">
                <h2 className="font-display text-lg text-navy">Quick Margin Calculator</h2>
                <p className="text-xs text-gray-500 mt-1">Select category, set your target RRP, and see instant margin results</p>
              </div>
              <button
                onClick={() => setAdvancedMode(prev => !prev)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all whitespace-nowrap ${advancedMode ? 'bg-gold/10 border-gold text-gold' : 'bg-gray-50 border-gray-200 text-gray-500 hover:border-gray-400'}`}
              >
                {advancedMode ? <ToggleRight size={14} /> : <ToggleLeft size={14} />}
                Advanced
              </button>
            </div>
            {/* Quick inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 mb-4">
              <div>
                <label className="text-xs font-medium text-gray-500 block mb-1">Category</label>
                <select value={category} onChange={e => handleCategoryChange(e.target.value)}
                  className="w-full text-xs border border-gray-200 rounded-lg px-3 py-2 bg-white text-navy font-medium focus:ring-2 focus:ring-gold focus:border-transparent">
                  {Object.entries(CATEGORY_COGS).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs font-medium text-gray-500 block mb-1">Bottle Size</label>
                <select value={bottleSize} onChange={e => setBottleSize(Number(e.target.value))}
                  className="w-full text-xs border border-gray-200 rounded-lg px-3 py-2 bg-white text-navy font-medium focus:ring-2 focus:ring-gold focus:border-transparent">
                  {BOTTLE_SIZES.map((s, i) => <option key={i} value={i}>{s.label}</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs font-medium text-gray-500 block mb-1">Channel</label>
                <select value={channel} onChange={e => { setChannel(e.target.value); setTargetRRP(cat.avgRRP[e.target.value] || targetRRP) }}
                  className="w-full text-xs border border-gray-200 rounded-lg px-3 py-2 bg-white text-navy font-medium focus:ring-2 focus:ring-gold focus:border-transparent">
                  {CHANNELS.map(c => <option key={c} value={c}>{CHANNEL_LABELS[c]}</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs font-medium text-gray-500 block mb-1">Target RRP (£)</label>
                <input type="number" value={targetRRP} onChange={e => setTargetRRP(Number(e.target.value))}
                  className="w-full text-xs border border-gray-200 rounded-lg px-3 py-2 bg-white text-navy font-medium focus:ring-2 focus:ring-gold focus:border-transparent"
                  min={0} step={0.5} />
              </div>
            </div>
            {/* Quick result preview — tap for detail on mobile */}
            <div
              className="flex items-center gap-6 p-3 bg-gray-50 rounded-lg cursor-pointer"
              onClick={() => {
                if (window.innerWidth < 1024) {
                  setMobileDetail({
                    title: cat.label + ' Margin Results',
                    content: (
                      <div className="space-y-4">
                        <div className="flex justify-center"><MarginGauge margin={computed.margin} size="lg" /></div>
                        <div className="grid grid-cols-2 gap-3">
                          <div className="bg-gray-50 rounded-lg p-3"><div className="text-xs text-gray-500">Total COGS</div><div className="text-lg font-bold text-navy">{fmt(computed.total)}</div></div>
                          <div className="bg-gray-50 rounded-lg p-3"><div className="text-xs text-gray-500">Gross Profit</div><div className="text-lg font-bold text-green-600">{fmt(Math.max(0, targetRRP - computed.total))}</div></div>
                          <div className="bg-gray-50 rounded-lg p-3"><div className="text-xs text-gray-500">RRP</div><div className="text-sm font-semibold text-navy">{fmt(targetRRP)}</div></div>
                          <div className="bg-gray-50 rounded-lg p-3"><div className="text-xs text-gray-500">Margin</div><div className={'text-sm font-semibold ' + (computed.margin >= 35 ? 'text-green-600' : computed.margin >= 25 ? 'text-amber-500' : 'text-red-500')}>{computed.margin.toFixed(1)}%</div></div>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-3">
                          <div className="text-xs text-gray-500 mb-1">Base Margin vs Scenario</div>
                          <div className="flex items-center justify-around">
                            <div className="text-center"><div className="text-xs text-gray-500">Base</div><div className="text-sm font-bold text-navy">{computed.baseMargin.toFixed(1)}%</div></div>
                            <div className="text-center"><div className="text-xs text-gray-500">With Scenarios</div><div className={'text-sm font-bold ' + (computed.margin >= computed.baseMargin ? 'text-green-600' : 'text-red-500')}>{computed.margin.toFixed(1)}%</div></div>
                          </div>
                        </div>
                        <div className="text-xs text-gray-500 text-center">Industry avg margin for {cat.label}: {benchmarks.avgMargin}%</div>
                      </div>
                    )
                  })
                } else {
                  cogsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                }
              }}
            >
              <MarginGauge margin={computed.margin} size="lg" />
              <div className="flex-1 grid grid-cols-2 gap-3">
                <div>
                  <div className="text-xs text-gray-500">Total COGS</div>
                  <div className="text-lg font-bold text-navy">{fmt(computed.total)}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500">Gross Profit</div>
                  <div className="text-lg font-bold text-green-600">{fmt(Math.max(0, targetRRP - computed.total))}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500">RRP</div>
                  <div className="text-sm font-semibold text-navy">{fmt(targetRRP)}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500">Margin</div>
                  <div className={`text-sm font-semibold ${computed.margin >= 35 ? 'text-green-600' : computed.margin >= 25 ? 'text-amber-500' : 'text-red-500'}`}>{computed.margin.toFixed(1)}%</div>
                </div>
              </div>
            </div>
          </Card>
        </BentoGrid.Wide>

        {/* KPI cards */}
        <MetricCard
          label="Industry Avg Margin"
          value={benchmarks.avgMargin + '%'}
          subtitle={cat.label}
          icon={BarChart3}
          change={computed.margin > benchmarks.avgMargin ? '+' + (computed.margin - benchmarks.avgMargin).toFixed(1) + 'pp above' : (computed.margin - benchmarks.avgMargin).toFixed(1) + 'pp below'}
          direction={computed.margin >= benchmarks.avgMargin ? 'up' : 'down'}
        />
        <MetricCard
          label="Biggest Cost"
          value={biggestCost.label}
          subtitle={fmt(biggestCost.value) + ' (' + (computed.total > 0 ? ((biggestCost.value / computed.total) * 100).toFixed(0) : 0) + '% of COGS)'}
          icon={Package}
        />
        <MetricCard
          label="Highest Margin Category"
          value={(() => {
            const best = Object.entries(INDUSTRY_BENCHMARKS).reduce((b, [k, v]) => v.avgMargin > (b.margin || 0) ? { key: k, margin: v.avgMargin } : b, {})
            return CATEGORY_COGS[best.key]?.label || '—'
          })()}
          subtitle={(() => {
            const best = Object.entries(INDUSTRY_BENCHMARKS).reduce((b, [k, v]) => v.avgMargin > (b.margin || 0) ? { key: k, margin: v.avgMargin } : b, {})
            return best.margin + '% avg margin'
          })()}
          icon={TrendingUp}
          direction="up"
        />
      </BentoGrid>

      {/* ══════ LIQUID INTELLIGENCE SIGNALS ══════ */}
      <div className="border border-gold/30 rounded-xl bg-gradient-to-r from-amber-50/60 to-white p-4">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-7 h-7 rounded-lg bg-gold/10 flex items-center justify-center">
            <Zap size={14} className="text-gold" />
          </div>
          <span className="text-xs font-bold text-gold uppercase tracking-wider">Liquid Intelligence</span>
          <span className="text-xs text-gray-400 ml-auto">Margin Signals {'·'} {cat.label}</span>
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

      {/* ══════ TIER 2: EXPANDABLE DETAIL PANELS (Advanced Mode) ══════ */}
      {advancedMode && (<>

      {/* Full Calculator with Scenarios */}
      <div ref={cogsRef}>
      <DrillDown
        title="Full COGS Breakdown & Scenarios"
        summary={'Adjust costs with what-if scenarios — ' + Object.keys(cat.scenarios).length + ' available for ' + cat.label}
        defaultOpen={true}
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          {/* COGS waterfall */}
          <div className="lg:col-span-5 space-y-3">
            <h4 className="text-xs font-semibold text-navy flex items-center gap-2">
              <Package size={14} /> Cost Breakdown ({BOTTLE_SIZES[bottleSize].label})
            </h4>
            <div className="space-y-1">
              {costLabels.map(e => (
                <CostBar key={e.key} label={e.label} value={computed.costs[e.key]} max={computed.total} color={e.color} />
              ))}
            </div>
            <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
              <div>
                <div className="text-xs text-gray-500">Total COGS</div>
                <div className="text-lg font-bold text-navy">{fmt(computed.total)}</div>
              </div>
              <div className="text-right">
                <div className="text-xs text-gray-500">Gross Profit</div>
                <div className="text-lg font-bold text-green-600">{fmt(Math.max(0, targetRRP - computed.total))}</div>
              </div>
            </div>
          </div>

          {/* Pie + Gauges */}
          <div className="lg:col-span-3 space-y-4">
            <div className="bg-gray-50 rounded-xl p-4">
              <h4 className="text-xs font-semibold text-navy mb-2">Cost Split</h4>
              <div className="space-y-1.5">
                {pieData.map((entry, i) => {
                  const total = pieData.reduce((s, e) => s + e.value, 0)
                  const pctVal = total > 0 ? ((entry.value / total) * 100).toFixed(1) : '0.0'
                  return (
                    <div key={i}>
                      <div className="flex items-center justify-between text-xs mb-0.5">
                        <span className="text-gray-600">{entry.name}</span>
                        <span className="font-medium text-navy">{fmt(entry.value)} ({pctVal}%)</span>
                      </div>
                      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full rounded-full transition-all" style={{ width: `${pctVal}%`, backgroundColor: entry.color }} />
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
            <div className="bg-gray-50 rounded-xl p-4">
              <div className="flex items-center justify-around">
                <MarginGauge margin={computed.baseMargin} label="Base" />
                <MarginGauge margin={computed.margin} label="Scenario" />
              </div>
              {computed.margin !== computed.baseMargin && (
                <div className={`text-center text-xs font-medium mt-2 ${computed.margin > computed.baseMargin ? 'text-green-600' : 'text-red-500'}`}>
                  {computed.margin > computed.baseMargin ? '▲' : '▼'} {(computed.margin - computed.baseMargin).toFixed(1)}pp vs base
                </div>
              )}
            </div>
          </div>

          {/* Scenarios */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-xs font-semibold text-navy flex items-center gap-2">
              <Zap size={14} className="text-gold" /> What-If Scenarios
            </h4>
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
            <div className="pt-3 border-t border-gray-100">
              <div className="text-xs text-gray-500 mb-2">Scenario range</div>
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-green-50 rounded-lg p-2 text-center">
                  <div className="text-xs text-green-600">Best case</div>
                  <div className="text-sm font-bold text-green-700">
                    {(computed.baseMargin + Object.values(computed.scenarioImpacts).filter(v => v > 0).reduce((a,b) => a+b, 0)).toFixed(1)}%
                  </div>
                </div>
                <div className="bg-red-50 rounded-lg p-2 text-center">
                  <div className="text-xs text-red-500">Worst case</div>
                  <div className="text-sm font-bold text-red-600">
                    {(computed.baseMargin + Object.values(computed.scenarioImpacts).filter(v => v < 0).reduce((a,b) => a+b, 0)).toFixed(1)}%
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DrillDown>
      </div>

      {/* Margin Comparison: Your Product vs Category */}
      <DrillDown
        title="Margin vs Industry Benchmarks"
        summary={'Compare your ' + computed.margin.toFixed(1) + '% margin against ' + cat.label + ' industry averages'}
      >
        <div className="mb-4">
          <MetricCard
            label="Best Scenario"
            value={bestScenario.label ? '+' + bestScenario.impact.toFixed(1) + 'pp' : 'N/A'}
            subtitle={bestScenario.label || 'No positive scenarios'}
            icon={Zap}
            direction={bestScenario.impact > 0 ? 'up' : 'down'}
          />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <ChartCard title="Your Product vs Category Benchmarks" height={220}>
            <BarChart data={comparisonData} layout="vertical" accessibilityLayer={true}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis type="number" domain={[0, 70]} tick={{ fontSize: 10, fill: '#9ca3af' }} tickFormatter={v => v + '%'} />
              <YAxis type="category" dataKey="name" width={80} tick={{ fontSize: 10, fill: '#9ca3af' }} />
              <Tooltip formatter={(v) => v + '%'} contentStyle={{ background: '#1e293b', border: 'none', borderRadius: 8, fontSize: 11 }} labelStyle={{ color: '#f1f5f9' }} itemStyle={{ color: '#f1f5f9' }} />
              <Bar dataKey="margin" radius={[0, 4, 4, 0]}>
                {comparisonData.map((entry, i) => (
                  <Cell key={i} fill={i === 0 ? '#C9A96E' : '#1e3a5f'} fillOpacity={i === 0 ? 1 : 0.6} />
                ))}
              </Bar>
            </BarChart>
          </ChartCard>

          <ChartCard title="Channel-Specific Margins" subtitle="Using category average RRP per channel" height={220}>
            <BarChart data={channelChartData} accessibilityLayer={true}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="name" tick={{ fontSize: 10, fill: '#9ca3af' }} />
              <YAxis tick={{ fontSize: 10, fill: '#9ca3af' }} tickFormatter={v => v + '%'} />
              <Tooltip formatter={(v, name) => name === 'margin' ? v + '%' : '£' + v} contentStyle={{ background: '#1e293b', border: 'none', borderRadius: 8, fontSize: 11 }} labelStyle={{ color: '#f1f5f9' }} itemStyle={{ color: '#f1f5f9' }} />
              <Bar dataKey="margin" name="Margin %" radius={[4, 4, 0, 0]}>
                {channelChartData.map((entry, i) => (
                  <Cell key={i} fill={entry.current ? '#C9A96E' : '#1e3a5f'} />
                ))}
              </Bar>
            </BarChart>
          </ChartCard>
        </div>

        {/* Channel detail table */}
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
          {CHANNELS.map(ch => {
            const cm = computed.channelMargins[ch]
            const isActive = ch === channel
            return (
              <div key={ch} className={`rounded-lg p-3 border ${isActive ? 'border-gold bg-gold/5' : 'border-gray-100 bg-gray-50'}`}>
                <div className="text-xs text-gray-500">{CHANNEL_LABELS[ch]}</div>
                <div className="text-sm font-bold text-navy mt-1">{fmt(cm.rrp)} RRP</div>
                <div className={`text-xs font-semibold mt-0.5 ${cm.margin >= 35 ? 'text-green-600' : cm.margin >= 25 ? 'text-amber-500' : 'text-red-500'}`}>
                  {cm.margin.toFixed(1)}% margin
                </div>
              </div>
            )
          })}
        </div>
      </DrillDown>

      {/* Cost Waterfall Chart */}
      <DrillDown
        title="Cost Waterfall (Production to Shelf)"
        summary="Visualise how costs stack from raw material to final margin"
      >
        <ChartCard title={'Cost Waterfall — ' + cat.label + ' (' + BOTTLE_SIZES[bottleSize].label + ')'} subtitle={'Target RRP: ' + fmt(targetRRP)} height={260}>
          <BarChart data={waterfallData} accessibilityLayer={true}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="name" tick={{ fontSize: 9, fill: '#9ca3af' }} interval={0} angle={-20} textAnchor="end" height={50} />
            <YAxis tick={{ fontSize: 10, fill: '#9ca3af' }} tickFormatter={v => '£' + v} />
            <Tooltip formatter={(v) => fmt(v)} contentStyle={{ background: '#1e293b', border: 'none', borderRadius: 8, fontSize: 11 }} labelStyle={{ color: '#f1f5f9' }} itemStyle={{ color: '#f1f5f9' }} />
            <Bar dataKey="cost" radius={[4, 4, 0, 0]}>
              {waterfallData.map((entry, i) => (
                <Cell key={i} fill={entry.fill} />
              ))}
            </Bar>
          </BarChart>
        </ChartCard>
      </DrillDown>

      {/* Launch Readiness */}
      <DrillDown
        title="Launch Readiness Scorecard"
        summary={cat.label + ' — Score: ' + readinessScore + '/100'}
      >
        <div className="mb-4">
          <MetricCard
            label="Launch Readiness"
            value={readinessScore + '/100'}
            subtitle={readinessScore >= 70 ? 'Strong launch conditions' : readinessScore >= 50 ? 'Viable with positioning' : 'Challenging timing'}
            icon={Target}
            direction={readinessScore >= 50 ? 'up' : 'down'}
          />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="text-3xl font-bold" style={{ color: readinessColor }}>{readinessScore}</div>
              <div>
                <div className="text-xs font-medium" style={{ color: readinessColor }}>
                  {readinessScore >= 70 ? 'Strong launch conditions' : readinessScore >= 50 ? 'Viable with careful positioning' : 'Challenging — consider timing'}
                </div>
                <div className="text-xs text-gray-500">{cat.label} category readiness</div>
              </div>
            </div>
            <div className="h-52" role="figure" aria-label={`Chart: Launch Readiness Radar — ${cat.label}`}>
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={radarData} accessibilityLayer={true}>
                  <PolarGrid stroke="#e5e7eb" />
                  <PolarAngleAxis dataKey="metric" tick={{ fontSize: 10, fill: '#6b7280' }} />
                  <PolarRadiusAxis angle={90} domain={[0, 100]} tick={false} axisLine={false} />
                  <Radar dataKey="value" stroke={CHART_COLORS.primary} fill={CHART_COLORS.primary} fillOpacity={0.15} strokeWidth={2} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <div className="text-xs font-semibold text-red-500 mb-2 flex items-center gap-1"><AlertTriangle size={10} /> Key Risks</div>
              {readiness.risks.map((r, i) => (
                <div key={i} className="text-xs text-gray-600 py-1.5 border-l-2 border-red-200 pl-2 mb-1">{r}</div>
              ))}
            </div>
            <div>
              <div className="text-xs font-semibold text-green-600 mb-2 flex items-center gap-1"><Zap size={10} /> Key Opportunities</div>
              {readiness.opportunities.map((o, i) => (
                <div key={i} className="text-xs text-gray-600 py-1.5 border-l-2 border-green-200 pl-2 mb-1">{o}</div>
              ))}
            </div>
          </div>
        </div>
      </DrillDown>

      </>)}
      {/* ══════ TIER 3: DEEP DIVE CTA ══════ */}
      {!showTier3 && (
        <div className="text-center">
          <button
            onClick={() => setShowTier3(true)}
            className="inline-flex items-center gap-2 px-6 py-3 min-h-[44px] bg-navy text-white rounded-lg font-medium text-sm hover:bg-navy/90 transition-colors touch-manipulation"
          >
            <Eye size={16} />
            View Full Data & Export
          </button>
          <p className="text-xs text-gray-500 mt-2">Detailed cost tables, cross-category benchmarks, and export options</p>
        </div>
      )}

      {showTier3 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-section text-navy">Full Analysis</h2>
            <button
              onClick={() => setShowTier3(false)}
              className="text-xs text-gray-500 hover:text-navy transition-colors"
            >
              Collapse
            </button>
          </div>

          {/* Detailed COGS table */}
          <DataTable
            columns={cogsTableColumns}
            data={cogsTableData}
            searchable={false}
            emptyMessage="No cost data available"
          />

          {/* Cross-category comparison */}
          <div>
            <h3 className="font-display text-subsection text-navy mb-3">Cross-Category Margin Benchmarks</h3>
            <DataTable
              columns={crossCatColumns}
              data={crossCatData}
              searchable
              searchPlaceholder="Search categories…"
              searchKey="category"
            />
          </div>

          {/* Export button */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                const csvRows = ['Component,Base Cost,With Scenarios,% of COGS,% of RRP']
                cogsTableData.forEach(row => {
                  csvRows.push(`${row.component},${row.baseCost.toFixed(2)},${row.scenarioCost.toFixed(2)},${row.pctOfTotal.toFixed(1)},${row.pctOfRRP.toFixed(1)}`)
                })
                const blob = new Blob([csvRows.join('\n')], { type: 'text/csv' })
                const url = URL.createObjectURL(blob)
                const a = document.createElement('a')
                a.href = url
                a.download = `margin_analysis_${category}_${new Date().toISOString().slice(0,10)}.csv`
                a.click()
                URL.revokeObjectURL(url)
              }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-gold/10 text-gold rounded-lg text-xs font-medium hover:bg-gold/20 transition-colors"
            >
              <Download size={14} />
              Export Margin Analysis (CSV)
            </button>
            <button
              onClick={() => {
                const csvRows = ['Category,Avg Margin,High-End,Mid-Tier,Value,Source']
                crossCatData.forEach(row => {
                  csvRows.push(`${row.category},${row.avgMargin},${row.highEndMargin},${row.midTierMargin},${row.valueMargin},"${row.source}"`)
                })
                const blob = new Blob([csvRows.join('\n')], { type: 'text/csv' })
                const url = URL.createObjectURL(blob)
                const a = document.createElement('a')
                a.href = url
                a.download = `industry_benchmarks_${new Date().toISOString().slice(0,10)}.csv`
                a.click()
                URL.revokeObjectURL(url)
              }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-navy/10 text-navy rounded-lg text-xs font-medium hover:bg-navy/20 transition-colors"
            >
              <Download size={14} />
              Export Benchmarks (CSV)
            </button>
          </div>
        </div>
      )}

      {/* Methodology footer */}
      <div className="bg-navy/5 rounded-xl p-3 text-xs text-gray-600">
        <span className="font-medium text-navy">Methodology:</span> COGS estimates use category-average commodity prices, standard UK duty rates (Feb 2025), and typical freight-to-UK costs. Actual costs vary by supplier, volume, and contract terms. Duty calculated per 700ml equivalent at category ABV. Industry benchmarks sourced from IWSR, NielsenIQ, and trade body reports.
      </div>

      {/* Mobile BottomSheet for margin results */}
      <BottomSheet
        open={!!mobileDetail}
        onClose={() => setMobileDetail(null)}
        title={mobileDetail?.title || 'Margin Detail'}
      >
        {mobileDetail?.content}
      </BottomSheet>
    </div>
  )
}
