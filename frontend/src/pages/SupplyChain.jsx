import React, { useState, useMemo, useEffect } from 'react'
import { AreaChart, Area, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts'
import { Package, Factory, Truck, AlertTriangle, TrendingUp, TrendingDown, ExternalLink, DollarSign, Globe, Shield, Droplets, ChevronDown, ChevronUp, ArrowUpDown, Zap } from 'lucide-react'
import {
  PageHeader, Card, MetricCard, BentoGrid, DrillDown, DataTable,
  ChartCard, SourceList, FilterPills, EntityLink, BottomSheet,
  SkeletonCard, SubPageNav, MethodologyTooltip, DataFreshness
} from '../components/ui'

import {
  COGS_DATA, CATEGORY_COGS, GLASS_SUPPLIERS, CLOSURE_SUPPLIERS, LABEL_SUPPLIERS,
  DISRUPTION_SCENARIOS, CURRENCY_PAIRS, MARGIN_ALERTS, CLIMATE_RISKS, PIPELINE_STAGES,
  GROUP_LABELS, CATEGORY_ANALYSIS, parseChange, getAlertLevel, ALERT_COLORS
} from '../data/supplyChainData'
import { CHART_COLORS } from '../data/chartColors'

// ===== SPARKLINE =====

function Sparkline({ data, positive, uid }) {
  const entries = Object.entries(data).sort(([a], [b]) => a.localeCompare(b))
  const chartData = entries.map(([date, value]) => ({ date: date.slice(5), value }))
  const color = positive ? '#16a34a' : '#dc2626'
  const gradId = `sg_${uid}`
  return (
    <ResponsiveContainer width={100} height={28}>
      <AreaChart data={chartData} margin={{ top: 2, right: 2, bottom: 2, left: 2 }} accessibilityLayer={true}>
        <defs>
          <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity={0.3} />
            <stop offset="100%" stopColor={color} stopOpacity={0.05} />
          </linearGradient>
        </defs>
        <Area type="monotone" dataKey="value" stroke={color} strokeWidth={1.5} fill={`url(#${gradId})`} dot={false} isAnimationActive={false} />
      </AreaChart>
    </ResponsiveContainer>
  )
}

// ===== MAIN COMPONENT =====

export default function SupplyChain() {
  const [expandedMetric, setExpandedMetric] = useState(null)
  const [groupFilter, setGroupFilter] = useState('all')
  const [showFullTable, setShowFullTable] = useState(false)
  const [showFullMarginTable, setShowFullMarginTable] = useState(false)
  const [expandedStage, setExpandedStage] = useState(null)
  const [mobileDetail, setMobileDetail] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 300)
    return () => clearTimeout(timer)
  }, [])

  // Computed stats
  const totalCommodities = Object.keys(COGS_DATA).length
  const criticalCount = Object.values(COGS_DATA).filter(d => Math.abs(parseChange(d.change)) >= 15).length
  const highCount = Object.values(COGS_DATA).filter(d => { const a = Math.abs(parseChange(d.change)); return a >= 8 && a < 15 }).length
  const fallingCount = Object.values(COGS_DATA).filter(d => typeof d.change === 'string' && d.change.startsWith('-')).length
  const highestRisk = useMemo(() => {
    return Object.values(COGS_DATA).reduce((max, d) => {
      const v = Math.abs(parseChange(d.change))
      return v > max.val ? { label: d.label, change: d.change, val: v } : max
    }, { label: '', change: '', val: 0 })
  }, [])

  // Supply Chain Liquid Intelligence signals
  const liPressureIndex = 7.2
  const liRetailRise = 3.1
  const liCompressionPp = 4.1

  const liSig1 = criticalCount >= 5
    ? { dot: 'bg-red-500', color: 'text-red-600', label: 'Acute Input Pressure', copy: `${criticalCount} commodities tracking ≥15% YoY inflation. Immediate pricing review recommended. Highest exposure: ${highestRisk.label} at ${highestRisk.change}.` }
    : criticalCount >= 2
    ? { dot: 'bg-amber-500', color: 'text-amber-600', label: 'Elevated Input Costs', copy: `${criticalCount} commodities in critical range (≥15% YoY). Monitor COGS buffer and review supplier contracts. Highest risk: ${highestRisk.label} at ${highestRisk.change}.` }
    : { dot: 'bg-blue-500', color: 'text-blue-600', label: 'Contained Pressure', copy: `Critical commodity alerts are limited. ${highCount} inputs in elevated range (8–14% YoY). Standard monitoring protocols apply.` }

  const liSig2 = liCompressionPp >= 4
    ? { dot: 'bg-red-500', color: 'text-red-600', label: 'Significant Margin Squeeze', copy: `Input costs rising ${liPressureIndex}% vs ${liRetailRise}% average retail pass-through. Estimated −4.1pp gross margin compression in 2025. Price uplift and cost recovery strategies are material.` }
    : liCompressionPp >= 2
    ? { dot: 'bg-amber-500', color: 'text-amber-600', label: 'Moderate Margin Pressure', copy: `Input cost inflation (${liPressureIndex}%) partially offset by ${liRetailRise}% retail price increases. Monitor gross margin buffers closely.` }
    : { dot: 'bg-blue-500', color: 'text-blue-600', label: 'Manageable Spread', copy: `Input cost rise (${liPressureIndex}%) broadly matched by retail price increases (${liRetailRise}%). Margin resilience intact.` }

  const liSig3 = fallingCount >= 6
    ? { dot: 'bg-emerald-500', color: 'text-emerald-600', label: 'Meaningful Offset Available', copy: `${fallingCount} tracked commodities declining, providing partial COGS relief. Agave and rum categories best positioned to capture input deflation this cycle.` }
    : fallingCount >= 3
    ? { dot: 'bg-blue-500', color: 'text-blue-600', label: 'Partial Relief', copy: `${fallingCount} commodities show falling prices, offering limited offset against broader inflation. Prioritise agave and grain sourcing windows.` }
    : { dot: 'bg-amber-500', color: 'text-amber-600', label: 'Minimal Commodity Relief', copy: `Only ${fallingCount} tracked commodities are declining. Input inflation is broad-based — no significant commodity-level offset available this cycle.` }

  // Sorted & filtered commodity keys
  const sortedKeys = useMemo(() => {
    let keys = Object.keys(COGS_DATA)
    if (groupFilter !== 'all') {
      keys = keys.filter(k => COGS_DATA[k].group === groupFilter)
    }
    return keys.sort((a, b) => {
      const aVal = Math.abs(parseChange(COGS_DATA[a].change))
      const bVal = Math.abs(parseChange(COGS_DATA[b].change))
      return bVal - aVal
    })
  }, [groupFilter])

  // DataTable columns for Tier 3
  const commodityTableColumns = useMemo(() => [
    { key: 'label', label: 'Commodity', sortable: true, render: (val, row) => {
      const alert = getAlertLevel(Math.abs(parseChange(row.change)))
      return (
        <div className="flex items-center gap-2">
          <div className={`w-3 h-3 rounded-full flex-shrink-0 ${ALERT_COLORS[alert].dot}`} />
          <div>
            <span className="font-medium text-navy">{val}</span>
            <span className="text-xs text-gray-500 block">{row.source}</span>
          </div>
        </div>
      )
    }},
    { key: 'value', label: 'Current', sortable: true, align: 'right', render: (val, row) => (
      <span className="font-bold text-navy tabular-nums">{typeof val === 'number' ? val.toLocaleString() : val}{row.unit ? ` ${row.unit}` : ''}</span>
    )},
    { key: 'change', label: 'YoY', sortable: true, align: 'right', render: (val) => {
      const num = parseChange(val)
      return (
        <span className={`inline-flex items-center gap-0.5 text-xs font-bold px-1.5 py-0.5 rounded-full ${
          num > 0 ? 'bg-red-50 text-red-700' : num < 0 ? 'bg-green-50 text-green-700' : 'bg-gray-100 text-gray-600'
        }`}>
          {num > 0 ? <TrendingUp className="w-3 h-3" /> : num < 0 ? <TrendingDown className="w-3 h-3" /> : null}
          {val}
        </span>
      )
    }},
    { key: 'group', label: 'Group', sortable: true, render: (val) => GROUP_LABELS[val] || val },
    { key: 'updated', label: 'Updated', sortable: true, align: 'right' },
  ], [])

  const commodityTableData = useMemo(() =>
    Object.entries(COGS_DATA).map(([key, d]) => ({ id: key, ...d })),
    []
  )

  // Margin alerts DataTable
  const marginColumns = useMemo(() => [
    { key: 'brand', label: 'Brand', sortable: true, render: (val) => <span className="font-medium text-navy">{val}</span> },
    { key: 'company', label: 'Company', sortable: true },
    { key: 'category', label: 'Category', sortable: true },
    { key: 'severity', label: 'Severity', sortable: true, render: (val) => {
      const badges = { high: 'bg-red-100 text-red-700', medium: 'bg-amber-100 text-amber-700', low: 'bg-blue-100 text-blue-700' }
      return <span className={`text-xs font-medium px-1.5 py-0.5 rounded-full ${badges[val]}`}>{val}</span>
    }},
    { key: 'message', label: 'Alert Detail', sortable: false },
  ], [])

  if (loading) {
    return (
      <div className="min-h-screen bg-surface p-3 sm:p-4 lg:p-6 max-w-7xl mx-auto space-y-6">
        <PageHeader title="Supply Chain & COGS Matrix" subtitle="Loading supply chain data…" />
        <BentoGrid>
          <BentoGrid.Hero><SkeletonCard className="h-40" /></BentoGrid.Hero>
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
        </BentoGrid>
        <SkeletonCard className="h-24" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-surface p-3 sm:p-4 lg:p-6 max-w-7xl mx-auto space-y-6">
      <PageHeader
        title="Supply Chain & COGS Matrix"
        subtitle={`${totalCommodities} commodities tracked · ${Object.keys(CATEGORY_COGS).length} category breakdowns · 2025 data`}
        breadcrumbs={[
          { label: 'Command Centre', to: '/' },
          { label: 'Supply Chain' },
        ]}
      />
      <SubPageNav group="planning" />
      <DataFreshness date="April 2026" source="BLS PPI, USITC, Eurostat, supplier intelligence" />

      {/* ═══════ TIER 1: BENTO GRID SUMMARY ═══════ */}
      <BentoGrid>
        {/* Hero: Pipeline visual */}
        <BentoGrid.Hero>
          <Card className="h-full">
            <div className="flex items-start justify-between mb-3">
              <div>
                <p className="text-label text-gray-500">Composite Pressure Index (2025)<MethodologyTooltip text="Weighted average of 8 commodity input costs: 60% raw materials, 30% freight indices, 10% energy. Updated quarterly from IWSR, S&P GSCI, and Drewry WCI." /></p>
                <p className="text-xl sm:text-3xl font-bold text-red-600 mt-1">7.2%</p>
                <p className="text-sm text-gray-500 mt-0.5">Weighted input cost rise</p>
              </div>
              <DollarSign size={24} className="text-gold" />
            </div>
            <div className="space-y-2 mt-3">
              <div className="flex justify-between text-xs">
                <span className="text-gray-500">Avg retail price increase</span>
                <span className="font-semibold text-amber-600">3.1%</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-gray-500">Est. margin compression</span>
                <span className="font-semibold text-red-600">-4.1pp</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-gray-500">Weighting</span>
                <span className="text-gray-500">60% raw, 30% freight, 10% energy</span>
              </div>
            </div>
          </Card>
        </BentoGrid.Hero>

        {/* KPI cards */}
        <Card hover onClick={() => setExpandedStage('sourcing')}>
          <MetricCard
            label="Commodities Tracked"
            value={totalCommodities}
            subtitle={`${fallingCount} prices falling`}
            icon={Package}
          />
        </Card>

        <Card hover onClick={() => {}}>
          <div className="flex items-center gap-2 mb-1">
            <AlertTriangle size={16} className="text-red-500" />
            <p className="text-label text-gray-500">Critical Alerts</p>
          </div>
          <p className="text-xl sm:text-2xl font-bold text-red-600">{criticalCount}</p>
          <p className="text-xs text-gray-500">{'≥'}15% YoY change</p>
        </Card>

        <Card hover onClick={() => {}}>
          <div className="flex items-center gap-2 mb-1">
            <TrendingUp size={16} className="text-orange-500" />
            <p className="text-label text-gray-500">High Alert</p>
          </div>
          <p className="text-xl sm:text-2xl font-bold text-orange-600">{highCount}</p>
          <p className="text-xs text-gray-500">8-14% YoY change</p>
        </Card>

        <Card hover onClick={() => {}}>
          <div className="flex items-center gap-2 mb-1">
            <AlertTriangle size={16} className="text-red-500" />
            <p className="text-label text-gray-500">Highest Risk</p>
          </div>
          <p className="text-lg font-bold text-red-600">{highestRisk.change}</p>
          <p className="text-xs text-gray-500">{highestRisk.label}</p>
        </Card>
      </BentoGrid>

      {/* ═══════ LIQUID INTELLIGENCE SIGNALS ═══════ */}
      <div className="border border-gold/30 rounded-xl bg-gradient-to-r from-amber-50/60 to-white p-4">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-7 h-7 rounded-lg bg-gold/10 flex items-center justify-center">
            <Zap size={14} className="text-gold" />
          </div>
          <span className="text-xs font-bold text-gold uppercase tracking-wider">Liquid Intelligence</span>
          <span className="text-xs text-gray-400 ml-auto">Supply Chain Signals {'·'} 2025</span>
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

      {/* ═══════ PIPELINE STAGE CARDS ═══════ */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {PIPELINE_STAGES.map(stage => {
          const statusColors = {
            critical: 'border-red-300 bg-red-50',
            alert: 'border-orange-300 bg-orange-50',
            warning: 'border-amber-300 bg-amber-50',
            moderate: 'border-blue-300 bg-blue-50',
          }
          const IconMap = { Droplets, Factory, Package, Truck }
          const Icon = IconMap[stage.icon] || Package
          return (
            <Card
              key={stage.id}
              hover
              onClick={() => setExpandedStage(expandedStage === stage.id ? null : stage.id)}
              className={`border-l-4 ${statusColors[stage.status] || 'border-gray-200 bg-white'}`}
              padding="p-3"
            >
              <div className="flex items-center gap-2 mb-1.5">
                <Icon size={16} className="text-navy" />
                <h4 className="text-xs font-semibold text-navy">{stage.label}</h4>
              </div>
              <p className="text-xs text-gray-500 mb-1">{stage.summary}</p>
              <p className="text-sm font-bold text-navy">{stage.kpi}</p>
              <p className="text-xs text-gray-500 mt-1">Click to explore {'→'}</p>
            </Card>
          )
        })}
      </div>

      {/* ═══════ TIER 2: DRILL-DOWN SECTIONS ═══════ */}

      {/* --- Input Costs Heatmap --- */}
      <DrillDown
        title="Commodity Input Costs"
        summary={`${totalCommodities} commodities · ${criticalCount} critical · ${highCount} high alert`}
        defaultOpen={expandedStage === 'sourcing'}
      >
        <div className="space-y-4">
          {/* Filter */}
          <div className="flex items-center gap-2">
            <FilterPills
              options={[
                { key: 'all', label: 'All' },
                { key: 'agricultural', label: 'Agricultural' },
                { key: 'packaging', label: 'Packaging' },
                { key: 'freight', label: 'Freight' },
                { key: 'energy', label: 'Energy' },
                { key: 'premium', label: 'Premium' },
                { key: 'metals', label: 'Metals' },
              ]}
              active={groupFilter}
              onChange={setGroupFilter}
              size="sm"
            />
          </div>

          {/* Commodity cards */}
          <div className="space-y-2">
            {sortedKeys.map(key => {
              const data = COGS_DATA[key]
              const changeNum = parseChange(data.change)
              const alert = getAlertLevel(changeNum)
              const colors = ALERT_COLORS[alert]
              const isExpanded = expandedMetric === key

              return (
                <Card key={key} hover={!isExpanded} onClick={() => {
                  if (window.innerWidth < 1024) {
                    setMobileDetail({
                      title: data.label,
                      content: (
                        <div className="space-y-3">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            <div className="bg-gray-50 rounded-lg p-2.5 text-center">
                              <div className="text-xs text-gray-500 uppercase">Current</div>
                              <div className="text-sm font-bold text-navy">{typeof data.value === 'number' ? data.value.toLocaleString() : data.value}{data.unit && <span className="text-xs text-gray-500 ml-0.5">{data.unit}</span>}</div>
                            </div>
                            <div className="bg-gray-50 rounded-lg p-2.5 text-center">
                              <div className="text-xs text-gray-500 uppercase">YoY Change</div>
                              <div className={`text-sm font-bold ${changeNum > 0 ? 'text-red-600' : changeNum < 0 ? 'text-green-600' : 'text-gray-600'}`}>{data.change}</div>
                            </div>
                          </div>
                          <p className="text-xs text-gray-600 leading-relaxed">{data.description}</p>
                          <div className="flex items-center gap-2 text-xs text-gray-500">
                            <span>Source: {data.source}</span>
                            <span>{'·'}</span>
                            <span>Updated: {data.updated}</span>
                          </div>
                          {data.relevantCategories && (
                            <div>
                              <p className="text-micro font-semibold text-gray-500 uppercase mb-1">Relevant Categories</p>
                              <div className="flex flex-wrap gap-1">
                                {data.relevantCategories[0] === 'all'
                                  ? <span className="text-micro bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">All categories</span>
                                  : data.relevantCategories.map(c => (
                                    <span key={c} className="text-micro bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">{c}</span>
                                  ))
                                }
                              </div>
                            </div>
                          )}
                        </div>
                      )
                    })
                    return
                  }
                  setExpandedMetric(isExpanded ? null : key)
                }}
                  className={`cursor-pointer transition-all ${isExpanded ? 'border-navy shadow-md' : ''}`} padding="p-3">
                  <div className="flex items-center gap-3">
                    <div className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${colors.dot}`} />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-navy">{data.label}</span>
                        <span className="text-xs text-gray-500">{data.source}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-bold text-navy tabular-nums">
                        {typeof data.value === 'number' ? data.value.toLocaleString() : data.value}
                        {data.unit && <span className="text-xs text-gray-500 ml-0.5">{data.unit}</span>}
                      </span>
                      <span className={`inline-flex items-center gap-0.5 text-xs font-bold px-1.5 py-0.5 rounded-full ${
                        changeNum > 0 ? 'bg-red-50 text-red-700' : changeNum < 0 ? 'bg-green-50 text-green-700' : 'bg-gray-100 text-gray-600'
                      }`}>
                        {changeNum > 0 ? <TrendingUp className="w-3 h-3" /> : changeNum < 0 ? <TrendingDown className="w-3 h-3" /> : null}
                        {data.change}
                      </span>
                      {data.historicalData && <Sparkline data={data.historicalData} positive={changeNum <= 0} uid={key} />}
                      <span className="text-xs text-gray-500 hidden sm:inline">{data.updated}</span>
                      {isExpanded ? <ChevronUp className="w-4 h-4 text-gray-500" /> : <ChevronDown className="w-4 h-4 text-gray-500" />}
                    </div>
                  </div>

                  {isExpanded && (
                    <div className="mt-3 pt-3 border-t border-gray-100">
                      <p className="text-xs text-gray-600 leading-relaxed mb-3">{data.description}</p>
                      <div className="flex flex-col sm:flex-row sm:items-end gap-3 sm:gap-6">
                        {data.historicalData && (
                        <ChartCard
                          title="12-Month Trend"
                          height={120}
                          className="flex-1 shadow-none border-0 p-0"
                          tableData={Object.entries(data.historicalData).sort(([a], [b]) => a.localeCompare(b)).map(([d, v]) => ({ date: d.slice(5), value: v }))}
                          tableColumns={[
                            { key: 'date', label: 'Date' },
                            { key: 'value', label: 'Price' },
                          ]}
                        >
                          <AreaChart data={Object.entries(data.historicalData).sort(([a], [b]) => a.localeCompare(b)).map(([d, v]) => ({ date: d.slice(5), value: v }))} accessibilityLayer={true}>
                            <defs>
                              <linearGradient id={`eg_${key}`} x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#1B2A4A" stopOpacity={0.18} />
                                <stop offset="100%" stopColor="#1B2A4A" stopOpacity={0.02} />
                              </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                            <XAxis dataKey="date" tick={{ fontSize: 10, fill: '#9ca3af' }} tickLine={false} axisLine={false} />
                            <YAxis tick={{ fontSize: 10, fill: '#9ca3af' }} tickLine={false} axisLine={false} width={54} domain={['auto', 'auto']} tickFormatter={v => data.unit && data.unit.length <= 8 ? `${v} ${data.unit}` : String(v)} />
                            <Tooltip contentStyle={{ background: '#1e293b', border: 'none', borderRadius: 8, fontSize: 11 }} labelStyle={{ color: '#f1f5f9' }} itemStyle={{ color: '#f1f5f9' }} formatter={v => [`${v}${data.unit ? ' ' + data.unit : ''}`, data.label]} />
                            <Area type="monotone" dataKey="value" stroke={CHART_COLORS.primary} strokeWidth={2} fill={`url(#eg_${key})`} dot={{ fill: CHART_COLORS.primary, r: 3, strokeWidth: 1, stroke: '#fff' }} />
                          </AreaChart>
                        </ChartCard>
                      )}
                        <div className="sm:text-right space-y-1.5 sm:min-w-[140px]">
                          {data.sourceUrl && (
                            <a href={data.sourceUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-xs font-medium text-blue-600 hover:text-blue-800">
                              View source <ExternalLink className="w-3 h-3" />
                            </a>
                          )}
                          {data.group && <div className="text-xs text-gray-500 uppercase tracking-wide">{GROUP_LABELS[data.group]}</div>}
                          {data.relevantCategories && (
                            <div className="text-xs text-gray-500">
                              {data.relevantCategories[0] === 'all' ? 'All categories' :
                                data.relevantCategories.map(c => (
                                  <EntityLink key={c} type="category" id={c} label={c} className="text-xs mr-1" />
                                ))
                              }
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </Card>
              )
            })}
          </div>

          {/* Tier 3 CTA */}
          <div className="flex justify-center">
            <button
              onClick={() => setShowFullTable(!showFullTable)}
              className="px-4 py-2 min-h-[44px] text-xs font-medium text-navy border border-navy/20 rounded-lg hover:bg-navy hover:text-white transition-colors touch-manipulation"
            >
              {showFullTable ? 'Hide Full Data Table' : 'View Full Commodity Table'}
            </button>
          </div>

          {showFullTable && (
            <DataTable
              columns={commodityTableColumns}
              data={commodityTableData}
              searchable
              searchPlaceholder="Search commodities…"
              searchKey="label"
              exportable
            />
          )}
        </div>
      </DrillDown>

      {/* --- Category COGS Breakdown --- */}
      <DrillDown
        title="Category COGS Breakdown"
        summary={`${Object.keys(CATEGORY_COGS).length} categories · Cost structure analysis · Key input trends`}
        defaultOpen={expandedStage === 'production'}
      >
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {Object.entries(CATEGORY_COGS).map(([cat, data]) => {
              const segments = [
                { label: 'Raw Material', value: data.rawMaterial, color: '#dc2626' },
                { label: 'Packaging', value: data.packaging, color: '#f59e0b' },
                { label: 'Labor', value: data.labor, color: '#3b82f6' },
                { label: 'Energy', value: data.energy, color: '#8b5cf6' },
                { label: 'Logistics', value: data.logistics, color: '#06b6d4' },
                { label: 'Duty/Tax', value: data.duty, color: '#ec4899' },
                { label: 'Other', value: data.other, color: '#6b7280' },
              ]
              return (
                <Card key={cat} padding="p-3">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-xs text-navy capitalize">
                      <EntityLink type="category" id={cat.replace('_', '-')} label={cat.replace('_', ' ')} className="font-semibold text-xs" />
                    </h4>
                    <div className="flex items-center gap-1">
                      <span className="text-xs text-gray-500">{data.keyInput}</span>
                      {data.inputTrend === 'rising' && <TrendingUp className="w-3 h-3 text-red-500" />}
                      {data.inputTrend === 'falling' && <TrendingDown className="w-3 h-3 text-green-500" />}
                      {data.inputTrend === 'stable' && <span className="text-xs font-bold text-gray-500">{'—'}</span>}
                    </div>
                  </div>
                  {/* Stacked bar */}
                  <div className="flex h-5 rounded overflow-hidden mb-2">
                    {segments.map((s, i) => (
                      <div key={i} style={{ width: `${s.value}%`, backgroundColor: s.color }} title={`${s.label}: ${s.value}%`} />
                    ))}
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-1 text-xs">
                    {segments.map((seg, i) => (
                      <div key={i} className="flex items-center gap-0.5">
                        <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: seg.color }} />
                        <span className="text-gray-600 truncate">{seg.label} {seg.value}%</span>
                      </div>
                    ))}
                  </div>
                  {CATEGORY_ANALYSIS[cat] && (
                    <p className="text-xs text-gray-500 mt-2 border-t border-gray-50 pt-1.5">{CATEGORY_ANALYSIS[cat]}</p>
                  )}
                </Card>
              )
            })}
          </div>
        </div>
      </DrillDown>

      {/* --- Suppliers --- */}
      <DrillDown
        title="Supplier Intelligence"
        summary={`${GLASS_SUPPLIERS.length + CLOSURE_SUPPLIERS.length + LABEL_SUPPLIERS.length} suppliers · Glass, closures, labels`}
        defaultOpen={expandedStage === 'packaging'}
      >
        <div className="space-y-6">
          {/* Glass */}
          <div>
            <h4 className="text-xs font-semibold text-navy uppercase tracking-wider mb-2 flex items-center gap-1.5"><Package size={14} className="text-gold" /> Glass Container Suppliers</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {GLASS_SUPPLIERS.map(s => (
                <Card key={s.name} padding="p-3">
                  <div className="flex items-start justify-between mb-1.5">
                    <div><h5 className="font-semibold text-xs text-navy">{s.name}</h5><p className="text-xs text-gray-500">{s.hq}</p></div>
                    <span className="text-xs font-bold text-gold">{s.marketShare}%</span>
                  </div>
                  <div className="space-y-0.5 text-xs text-gray-600">
                    <div><strong>Lead time:</strong> {s.leadTime}</div>
                    <div><strong>Min order:</strong> {s.minimumOrder}</div>
                    <div><strong>Capacity:</strong> {s.capacity}</div>
                    <div><strong>Key clients:</strong> {s.keyClients.join(', ')}</div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Closures */}
          <div>
            <h4 className="text-xs font-semibold text-navy uppercase tracking-wider mb-2 flex items-center gap-1.5"><Shield size={14} className="text-gold" /> Closure & Stopper Suppliers</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {CLOSURE_SUPPLIERS.map(s => (
                <Card key={s.name} padding="p-3">
                  <h5 className="font-semibold text-xs text-navy">{s.name}</h5>
                  <p className="text-xs text-gray-500 mb-1">{s.hq} {'·'} {s.marketShare}% market share</p>
                  <div className="space-y-0.5 text-xs text-gray-600">
                    <div><strong>Product:</strong> {s.product}</div>
                    <div><strong>Lead time:</strong> {s.leadTime}</div>
                    <div><strong>Quality:</strong> {s.quality}</div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Labels */}
          <div>
            <h4 className="text-xs font-semibold text-navy uppercase tracking-wider mb-2 flex items-center gap-1.5"><Truck size={14} className="text-gold" /> Label & Packaging</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {LABEL_SUPPLIERS.map(s => (
                <Card key={s.name} padding="p-3">
                  <h5 className="font-semibold text-xs text-navy">{s.name}</h5>
                  <p className="text-xs text-gray-500 mb-1">{s.hq}</p>
                  <div className="space-y-0.5 text-xs text-gray-600">
                    <div><strong>Tech:</strong> {s.technology}</div>
                    <div><strong>Lead time:</strong> {s.leadTime}</div>
                    <div><strong>Min run:</strong> {s.minimumRun}</div>
                    <div><strong>Specialty:</strong> {s.specialty}</div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Startup notes */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
            <h4 className="text-xs font-semibold text-navy mb-1.5">Supplier Notes for Startups</h4>
            <ul className="text-xs text-gray-600 space-y-0.5">
              <li>{'•'} <strong>Glass:</strong> Min orders 100k units typical. Premium (Saverglass) 50k at premium pricing. Lead times 12-20 weeks.</li>
              <li>{'•'} <strong>Closures:</strong> Cork has ~3% defect rate. Synthetic/screw dominates modern wine. Multi-year contracts save 5-10%.</li>
              <li>{'•'} <strong>Labels:</strong> Digital printing offers short runs (5k) at 3-4 week turnaround. Gravure more efficient at 10k+.</li>
              <li>{'•'} <strong>Freight:</strong> Drewry WCI now 3,421 (+110%). Lock annual contracts now. Asia-Europe 4-6 weeks.</li>
            </ul>
          </div>
        </div>
      </DrillDown>

      {/* --- Margin Alerts --- */}
      <DrillDown
        title="Net Revenue Management Alerts"
        summary={`${MARGIN_ALERTS.length} active alerts · ${MARGIN_ALERTS.filter(a => a.severity === 'high').length} high severity`}
      >
        <div className="space-y-4">
          {/* Alert summary */}
          <BentoGrid>
            <Card>
              <p className="text-label text-gray-500">Brands Monitored</p>
              <p className="text-xl sm:text-2xl font-bold text-navy mt-1">32</p>
            </Card>
            <Card>
              <p className="text-label text-gray-500">Active Alerts</p>
              <p className="text-xl sm:text-2xl font-bold text-red-600 mt-1">{MARGIN_ALERTS.length}</p>
            </Card>
            <Card>
              <p className="text-label text-gray-500">Avg Price Increase Needed</p>
              <p className="text-xl sm:text-2xl font-bold text-green-600 mt-1">$2.80</p>
            </Card>
          </BentoGrid>

          {/* Alert cards */}
          <div className="space-y-2">
            {MARGIN_ALERTS.map((alert, i) => {
              const colors = { high: 'border-l-red-500 bg-red-50/30', medium: 'border-l-amber-500 bg-amber-50/30', low: 'border-l-blue-500 bg-blue-50/30' }
              const badges = { high: 'bg-red-100 text-red-700', medium: 'bg-amber-100 text-amber-700', low: 'bg-blue-100 text-blue-700' }
              return (
                <div key={i} className={`border-l-4 rounded-r-lg p-3 ${colors[alert.severity]}`}>
                  <div className="flex items-center justify-between mb-0.5">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-navy text-xs">{alert.brand}</span>
                      <EntityLink type="company" id={alert.company.toLowerCase().replace(/\s+/g, '-')} label={alert.company} className="text-xs" />
                    </div>
                    <div className="flex items-center gap-2">
                      <EntityLink type="category" id={alert.category.toLowerCase().replace(/\s+/g, '-')} label={alert.category} className="text-micro bg-gray-100 px-1.5 py-0.5 rounded no-underline" />
                      <span className={`text-xs font-medium px-1.5 py-0.5 rounded-full ${badges[alert.severity]}`}>{alert.severity}</span>
                    </div>
                  </div>
                  <p className="text-xs text-gray-600">{alert.message}</p>
                </div>
              )
            })}
          </div>

          {/* Tier 3 CTA */}
          <div className="flex justify-center">
            <button
              onClick={() => setShowFullMarginTable(!showFullMarginTable)}
              className="px-4 py-2 min-h-[44px] text-xs font-medium text-navy border border-navy/20 rounded-lg hover:bg-navy hover:text-white transition-colors touch-manipulation"
            >
              {showFullMarginTable ? 'Hide Table View' : 'View as Sortable Table'}
            </button>
          </div>

          {showFullMarginTable && (
            <DataTable
              columns={marginColumns}
              data={MARGIN_ALERTS}
              searchable
              searchPlaceholder="Search brands…"
              searchKey="brand"
              exportable
            />
          )}
        </div>
      </DrillDown>

      {/* --- Disruption & Risk Scenarios --- */}
      <DrillDown
        title="Disruption Scenarios & Risk Monitor"
        summary={`${DISRUPTION_SCENARIOS.length} scenarios · ${CURRENCY_PAIRS.length} currency pairs · ${CLIMATE_RISKS.length} climate risks`}
        defaultOpen={expandedStage === 'logistics'}
      >
        <div className="space-y-6">
          {/* Disruption scenarios */}
          <div>
            <h4 className="text-xs font-semibold text-navy uppercase tracking-wider mb-2">Strategic Disruption Scenarios</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {DISRUPTION_SCENARIOS.map((s, i) => {
                const probColor = s.probability === 'High' ? 'bg-red-100 text-red-700' : s.probability === 'Medium' ? 'bg-amber-100 text-amber-700' : 'bg-yellow-100 text-yellow-700'
                return (
                  <Card key={i} padding="p-3">
                    <div className="flex items-start justify-between mb-1.5">
                      <h5 className="font-semibold text-xs text-navy pr-2">{s.scenario}</h5>
                      <span className={`text-xs font-bold px-1.5 py-0.5 rounded flex-shrink-0 ${probColor}`}>{s.probability}</span>
                    </div>
                    <div className="space-y-1 text-xs text-gray-600">
                      <div><strong>Timeline:</strong> {s.impactWeeks} weeks</div>
                      <div><strong>Categories:</strong> {s.affectedCategories}</div>
                      <div><strong>COGS impact:</strong> <span className="text-red-600 font-bold">{s.cogsImpact}</span></div>
                      <div><strong>Mitigation:</strong> {s.mitigation}</div>
                      <div><strong>Precedent:</strong> {s.precedent}</div>
                    </div>
                  </Card>
                )
              })}
            </div>
          </div>

          {/* Stress testing */}
          <Card>
            <h4 className="text-xs font-semibold text-navy uppercase tracking-wider mb-2">Stress Testing Framework</h4>
            <div className="text-xs text-gray-600 space-y-1.5">
              <p><strong className="text-red-600">Bear case (2026):</strong> US-EU tariffs (+15-25%), extended Red Sea closure (+8-12% freight), poor EU harvest. Combined: ~18-35% COGS rise; margin compression 5-8pp.</p>
              <p><strong className="text-amber-600">Base case (2026):</strong> Current trajectory; moderate tariff increases, normal disruptions, climate impacts regional. Margin pressure 3-4pp; tequila/rum benefit from commodity deflation.</p>
              <p><strong className="text-green-600">Bull case (2026):</strong> Tariff resolution, shipping normalises, agave oversupply sustains. Margin expansion 2-3pp; RTD and premium categories benefit.</p>
            </div>
          </Card>

          {/* Currency */}
          <div>
            <h4 className="text-xs font-semibold text-navy uppercase tracking-wider mb-2 flex items-center gap-1.5"><Globe size={14} className="text-gold" /> Currency Impact</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {CURRENCY_PAIRS.map(pair => {
                const isUp = pair.change12m > 0
                return (
                  <Card key={pair.pair} padding="p-3">
                    <div className="flex items-start justify-between mb-1.5">
                      <h5 className="font-semibold text-xs text-navy">{pair.pair}</h5>
                      <div className="flex items-center gap-1">
                        <span className="text-base font-bold">{pair.rate}</span>
                        <div className={`flex items-center gap-0.5 ${isUp ? 'text-green-600' : 'text-red-600'}`}>
                          {isUp ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                          <span className="text-xs font-bold">{Math.abs(pair.change12m)}%</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-xs text-gray-600 mb-1">{pair.impact}</p>
                    <p className="text-xs text-gray-500"><strong>Categories:</strong> {pair.affectedCategories}</p>
                  </Card>
                )
              })}
            </div>
          </div>

          {/* Climate risks */}
          <div>
            <h4 className="text-xs font-semibold text-navy uppercase tracking-wider mb-2 flex items-center gap-1.5"><AlertTriangle size={14} className="text-orange-500" /> Climate & Agricultural Risk</h4>
            <div className="space-y-2">
              {CLIMATE_RISKS.map((risk, i) => {
                const colors = { critical: 'border-l-red-500 bg-red-50/30', high: 'border-l-orange-500 bg-orange-50/30', medium: 'border-l-amber-500 bg-amber-50/30', low: 'border-l-green-500 bg-green-50/30' }
                const badges = { critical: 'bg-red-100 text-red-700', high: 'bg-orange-100 text-orange-700', medium: 'bg-amber-100 text-amber-700', low: 'bg-green-100 text-green-700' }
                return (
                  <div key={i} className={`border-l-4 rounded-r-lg p-3 ${colors[risk.severity]}`}>
                    <div className="flex items-center justify-between mb-0.5">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-navy text-xs">{risk.region}</span>
                        <span className="text-xs text-gray-500">{risk.commodity}</span>
                      </div>
                      <span className={`text-xs font-medium px-1.5 py-0.5 rounded-full ${badges[risk.severity]}`}>{risk.severity}</span>
                    </div>
                    <p className="text-xs text-gray-600 mb-0.5">{risk.impact}</p>
                    <p className="text-xs text-gray-500">{risk.detail}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </DrillDown>

      {/* Data Source Footer */}
      <SourceList sources={[
        { label: 'BLS PPI', url: 'https://data.bls.gov' },
        { label: 'Drewry WCI', url: 'https://www.drewry.co.uk' },
        { label: 'Euronext', url: 'https://live.euronext.com' },
        { label: 'LME', url: 'https://www.lme.com' },
        { label: 'ICE Futures', url: 'https://www.ice.com' },
        { label: 'EU ETS', url: 'https://ec.europa.eu/clima' },
      ]} />

      {/* Mobile BottomSheet for detail views */}
      <BottomSheet
        open={!!mobileDetail}
        onClose={() => setMobileDetail(null)}
        title={mobileDetail?.title || 'Detail'}
      >
        {mobileDetail?.content}
      </BottomSheet>
    </div>
  )
}
