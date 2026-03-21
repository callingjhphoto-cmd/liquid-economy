import React, { useState, useMemo, useCallback, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import {
  Globe, MapPin, TrendingUp, TrendingDown, BarChart3, Shield, Ship,
  Briefcase, Target, AlertTriangle, Building2, ChevronRight, X, Search
} from 'lucide-react'
import {
  Card, MetricCard, PageHeader, BentoGrid, DrillDown, DataTable,
  EntityLink, SourceLink, SourceList, Badge, BottomSheet, SectionHeader,
  YearSelector, SkeletonCard
} from '../components/ui'
import { REGIONS, REGION_DATA } from '../data/geographicData'

/* ── Helpers ── */
const CHANNEL_NAMES = {
  onPremise: 'On-Premise',
  offPremise: 'Off-Premise',
  eCommerce: 'E-Commerce',
  travelRetail: 'Travel Retail',
}

const IMPACT_VARIANTS = {
  positive: 'green',
  negative: 'red',
  neutral: 'orange',
  mixed: 'gold',
}

/* ── Derived executive stats ── */
const totalMarkets = REGIONS.length
const fastestGrowing = (() => {
  let best = null
  let bestGrowth = -Infinity
  for (const r of REGIONS) {
    const data = REGION_DATA[r.key]
    if (data && data.kpis && data.kpis[0]) {
      const g = data.kpis[0].change || 0
      if (g > bestGrowth) { bestGrowth = g; best = r }
    }
  }
  return best
})()

const largestByValue = (() => {
  let best = null
  let bestVal = 0
  for (const r of REGIONS) {
    const data = REGION_DATA[r.key]
    if (data && data.kpis && data.kpis[0]) {
      const valStr = data.kpis[0].value || ''
      const num = parseFloat(valStr.replace(/[^0-9.]/g, '')) || 0
      if (num > bestVal) { bestVal = num; best = r }
    }
  }
  return best
})()

const ecomLeader = (() => {
  let best = null
  let bestPct = 0
  for (const r of REGIONS) {
    const data = REGION_DATA[r.key]
    if (data && data.channels && data.channels.eCommerce > bestPct) {
      bestPct = data.channels.eCommerce
      best = r
    }
  }
  return best ? { region: best, pct: bestPct } : null
})()

const regulatoryChanges = REGIONS.filter(r => {
  const data = REGION_DATA[r.key]
  return data && data.regulatory && data.regulatory.length > 0
}).length


/* ════════════════════════════════════════════
   TIER 1 — Region Card (Bento Grid)
   ════════════════════════════════════════════ */
function RegionCardTier1({ region, data, onClick, isHighlighted }) {
  const marketSize = data && data.kpis && data.kpis[0] ? data.kpis[0].value : '\u2014'
  const growth = data && data.kpis && data.kpis[0] ? data.kpis[0].change : 0
  const isGrowing = growth > 0
  const topBrand = data && data.topBrands ? data.topBrands[0] : '\u2014'
  const topCategory = data && data.kpis && data.kpis[2] ? data.kpis[2].label : ''

  return (
    <Card
      hover
      onClick={onClick}
      className={`transition-all ${isHighlighted ? 'ring-2 ring-navy/30 shadow-md' : ''}`}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2.5">
          <span className="text-2xl">{region.flag}</span>
          <div className="min-w-0">
            <span className="font-semibold text-sm text-navy truncate block">{region.name}</span>
            <span className="text-[10px] text-gray-400">{region.source}</span>
          </div>
        </div>
      </div>

      <div className="flex items-baseline justify-between mb-2">
        <span className="text-lg font-bold text-navy tabular-nums">{marketSize}</span>
        <span className={`text-xs font-semibold flex items-center gap-0.5 ${isGrowing ? 'text-emerald-600' : 'text-red-500'}`}>
          {isGrowing ? <TrendingUp size={11} /> : <TrendingDown size={11} />}
          {growth > 0 ? '+' : ''}{growth}%
        </span>
      </div>

      <p className="text-[10px] text-gray-500 leading-relaxed line-clamp-2 mb-2">{region.summary}</p>

      <div className="flex items-center gap-2 text-[10px] text-gray-400">
        <span>Top: {topBrand}</span>
        {data && data.channels && (
          <>
            <span>\u00b7</span>
            <span>E-com: {data.channels.eCommerce}%</span>
          </>
        )}
      </div>
    </Card>
  )
}


/* ════════════════════════════════════════════
   TIER 2 — Expanded Region Panel
   ════════════════════════════════════════════ */
function RegionTier2({ region, data, onClose, onViewFull }) {
  const [section, setSection] = useState('kpis')
  const [selectedYear, setSelectedYear] = useState(
    data.yearlyReports && data.yearlyReports.length > 0
      ? data.yearlyReports[data.yearlyReports.length - 1].year
      : 2025
  )

  const sections = [
    { id: 'kpis', label: 'Overview' },
    { id: 'channels', label: 'Channels' },
    { id: 'trends', label: 'Trends' },
    { id: 'timeline', label: 'Timeline' },
  ]

  const currentReport = data.yearlyReports
    ? data.yearlyReports.find(r => r.year === selectedYear)
    : null

  const years = data.yearlyReports ? data.yearlyReports.map(r => r.year).sort((a, b) => b - a) : []

  return (
    <Card className="col-span-full" padding="p-0">
      {/* Header */}
      <div className="p-5 border-b border-gray-100">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <span className="text-3xl">{region.flag}</span>
            <div>
              <EntityLink type="market" id={region.key} label={region.name} className="font-display text-section text-navy no-underline" />
              <p className="text-xs text-gray-500 mt-0.5">{region.trajectory}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors touch-manipulation">
            <X size={16} />
          </button>
        </div>

        {/* Quick KPIs row */}
        {data.kpis && (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-4">
            {data.kpis.slice(0, 3).map((kpi, i) => (
              <div key={i} className="bg-gray-50 rounded-lg p-2.5 text-center">
                <div className="text-[10px] text-gray-400 uppercase tracking-wide">{kpi.label}</div>
                <div className="text-sm font-bold text-navy tabular-nums">{kpi.value}</div>
                <div className={`text-[10px] font-medium ${kpi.changeDir === 'up' ? 'text-emerald-600' : 'text-red-500'}`}>
                  {kpi.change > 0 ? '+' : ''}{kpi.change}%
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Section tabs */}
      <div className="flex gap-1 px-5 pt-3 pb-0 overflow-x-auto whitespace-nowrap">
        {sections.map(s => (
          <button
            key={s.id}
            onClick={() => setSection(s.id)}
            className={`px-3 py-2 min-h-[44px] rounded-t-lg text-xs font-medium whitespace-nowrap transition-colors touch-manipulation ${
              section === s.id
                ? 'bg-gray-50 text-navy border-b-2 border-navy'
                : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>

      {/* Section content */}
      <div className="p-5 bg-gray-50/30">
        {/* KPIs / Overview */}
        {section === 'kpis' && data.kpis && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {data.kpis.map((kpi, i) => (
                <div key={i} className="bg-white rounded-lg border border-gray-100 p-2.5">
                  <div className="text-[10px] text-gray-400 uppercase tracking-wide mb-0.5">{kpi.label}</div>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-sm font-bold text-navy tabular-nums">{kpi.value}</span>
                    <span className={`text-[10px] font-medium ${kpi.changeDir === 'up' ? 'text-emerald-600' : kpi.changeDir === 'down' ? 'text-red-500' : 'text-gray-400'}`}>
                      {kpi.change > 0 ? '+' : ''}{kpi.change}%
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {data.topBrands && (
              <div>
                <SectionHeader size="sm">Leading Brands</SectionHeader>
                <div className="flex flex-wrap gap-1.5 mt-1">
                  {data.topBrands.map((brand, i) => (
                    <EntityLink
                      key={i}
                      type="brand"
                      id={brand.toLowerCase().replace(/[^a-z0-9]+/g, '-')}
                      label={brand}
                      className="px-2.5 py-1 bg-white border border-gray-200 rounded-full text-xs font-medium hover:bg-navy/5 transition-colors no-underline"
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Channels */}
        {section === 'channels' && data.channels && (
          <div className="space-y-3">
            <SectionHeader size="sm">Channel Split</SectionHeader>
            {Object.entries(data.channels).map(([ch, pct]) => (
              <div key={ch}>
                <div className="flex justify-between text-xs mb-0.5">
                  <span className="text-gray-600 font-medium">{CHANNEL_NAMES[ch] || ch}</span>
                  <span className="font-bold text-navy tabular-nums">{pct}%</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div className="bg-navy/60 rounded-full h-2 transition-all" style={{ width: `${pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Trends */}
        {section === 'trends' && data.trends && (
          <div className="space-y-2">
            <SectionHeader size="sm">Key Trends</SectionHeader>
            {data.trends.map((trend, i) => (
              <div key={i} className="bg-white rounded-lg border border-gray-100 p-3 flex gap-3 items-start">
                <div className="w-5 h-5 rounded-full bg-navy/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-[10px] font-bold text-navy">{i + 1}</span>
                </div>
                <div className="flex-1">
                  <p className="text-xs text-gray-700 leading-relaxed">{trend.text}</p>
                  <SourceLink label={trend.source} url={trend.url} className="mt-1" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Timeline */}
        {section === 'timeline' && data.yearlyReports && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <SectionHeader size="sm">Market Performance</SectionHeader>
              <YearSelector
                activeYear={selectedYear}
                onChange={setSelectedYear}
                years={years}
              />
            </div>
            {currentReport && (
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-white rounded-lg border border-gray-100 p-3 text-center">
                    <div className="text-[10px] text-gray-400 uppercase">Market Size</div>
                    <div className="text-lg font-bold text-navy tabular-nums">{currentReport.marketSize}</div>
                  </div>
                  <div className="bg-white rounded-lg border border-gray-100 p-3 text-center">
                    <div className="text-[10px] text-gray-400 uppercase">Growth</div>
                    <div className="flex items-center justify-center gap-1">
                      <span className="text-lg font-bold text-navy tabular-nums">{currentReport.growth}%</span>
                      {currentReport.growth > 0 ? <TrendingUp size={14} className="text-emerald-600" /> : <TrendingDown size={14} className="text-red-500" />}
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg border border-gray-100 p-3">
                  <div className="text-[10px] text-gray-400 uppercase mb-1">Top Performer</div>
                  <p className="text-xs text-navy font-semibold">{currentReport.topPerformer}</p>
                </div>

                <div className="bg-blue-50 border border-blue-100 rounded-lg p-3">
                  <div className="text-[10px] text-blue-600 font-semibold uppercase mb-0.5">Outlook</div>
                  <p className="text-xs text-blue-900">{currentReport.outlook}</p>
                </div>

                {currentReport.keyEvents && (
                  <div className="space-y-1.5">
                    {currentReport.keyEvents.map((e, i) => (
                      <div key={i} className="flex gap-2 items-start text-xs text-gray-600">
                        <ChevronRight size={12} className="text-navy mt-0.5 flex-shrink-0" />
                        <span>{e}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Footer CTA */}
      <div className="px-5 py-3 border-t border-gray-100 flex items-center justify-between">
        <div className="text-[10px] text-gray-400">
          Source: {region.source}
        </div>
        <button
          onClick={onViewFull}
          className="flex items-center gap-1 text-xs font-medium text-navy hover:text-navy/70 transition-colors"
        >
          Full market profile
          <ChevronRight size={14} />
        </button>
      </div>
    </Card>
  )
}


/* ════════════════════════════════════════════
   TIER 3 — Full Region Deep Dive
   ════════════════════════════════════════════ */
function RegionTier3({ region, data, onClose }) {
  const [deepTab, setDeepTab] = useState('regulatory')

  const tabs = [
    { id: 'regulatory', label: 'Regulatory' },
    { id: 'trade', label: 'Trade Flows' },
  ]

  // Add conditional tabs based on data availability
  if (data.marketEntry) tabs.push({ id: 'entry', label: 'Market Entry' })
  if (data.dutyTariff) tabs.push({ id: 'duty', label: 'Duty & Tariffs' })
  if (data.distributorLandscape) tabs.push({ id: 'distributors', label: 'Distributors' })
  if (data.competitiveEntry) tabs.push({ id: 'competitive', label: 'Competitive' })

  const tradeColumns = [
    { key: 'country', label: 'Country', sortable: true },
    { key: 'value', label: 'Value', sortable: false, align: 'right' },
    { key: 'share', label: 'Share', sortable: false, align: 'right' },
  ]

  const dutyColumns = [
    { key: 'category', label: 'Category', sortable: true },
    { key: 'rate', label: 'Rate', sortable: false, align: 'right' },
    { key: 'notes', label: 'Notes', sortable: false },
  ]

  const distColumns = [
    { key: 'name', label: 'Distributor', sortable: true },
    { key: 'type', label: 'Type', sortable: true },
    { key: 'categories', label: 'Categories', sortable: false },
    { key: 'minimumVolume', label: 'Min Volume', sortable: false, align: 'right' },
  ]

  return (
    <div className="fixed inset-0 z-40 bg-black/20 flex items-start justify-center pt-8 pb-8 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-5xl mx-4 overflow-hidden">
        {/* Header */}
        <div className="sticky top-0 bg-white z-10 px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-3xl">{region.flag}</span>
            <div>
              <h2 className="font-display text-lg text-navy">{region.name}</h2>
              <div className="text-xs text-gray-500">{region.source}</div>
            </div>
          </div>
          <button onClick={onClose} className="p-2 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors touch-manipulation">
            <X size={18} />
          </button>
        </div>

        {/* Tab nav */}
        <div className="flex gap-1 px-4 sm:px-6 py-2 border-b border-gray-100 overflow-x-auto whitespace-nowrap">
          {tabs.map(t => (
            <button
              key={t.id}
              onClick={() => setDeepTab(t.id)}
              className={`px-3 py-2 min-h-[44px] rounded-lg text-xs font-medium whitespace-nowrap transition-colors touch-manipulation ${
                deepTab === t.id ? 'bg-navy text-white' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <div className="p-6 max-h-[70vh] overflow-y-auto">
          {/* Regulatory */}
          {deepTab === 'regulatory' && data.regulatory && (
            <div className="space-y-3">
              <SectionHeader size="md">Regulatory Landscape</SectionHeader>
              {data.regulatory.map((item, i) => {
                const title = item.title || item.aspect || 'Regulation'
                const impact = item.impact || 'neutral'
                return (
                  <div key={i} className="bg-white rounded-lg border border-gray-200 p-4">
                    <div className="flex items-start justify-between gap-3 mb-1.5">
                      <h4 className="font-semibold text-sm text-navy">{title}</h4>
                      <Badge variant={IMPACT_VARIANTS[impact] || 'default'} size="sm">
                        {impact}
                      </Badge>
                    </div>
                    <p className="text-xs text-gray-600 leading-relaxed">{item.description}</p>
                  </div>
                )
              })}
            </div>
          )}

          {/* Trade Flows */}
          {deepTab === 'trade' && data.importExport && (
            <div className="space-y-6">
              <div>
                <SectionHeader size="md">Top Imports</SectionHeader>
                <DataTable columns={tradeColumns} data={data.importExport.topImports} compact className="mt-2" />
              </div>
              <div>
                <SectionHeader size="md">Top Exports</SectionHeader>
                <DataTable columns={tradeColumns} data={data.importExport.topExports} compact className="mt-2" />
              </div>
            </div>
          )}

          {/* Market Entry */}
          {deepTab === 'entry' && data.marketEntry && (
            <div className="space-y-4">
              <SectionHeader size="md">Market Entry Analysis</SectionHeader>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="text-[10px] text-gray-400 uppercase mb-1">Min Investment</div>
                  <div className="text-sm font-bold text-navy">{data.marketEntry.minInvestment}</div>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="text-[10px] text-gray-400 uppercase mb-1">Time to Market</div>
                  <div className="text-sm font-bold text-navy">{data.marketEntry.timeToMarket}</div>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="text-[10px] text-gray-400 uppercase mb-1">Barriers</div>
                  <div className="text-xs text-gray-600 leading-relaxed">{data.marketEntry.barriers.split(' - ')[0]}</div>
                </div>
              </div>

              <div>
                <SectionHeader size="sm">Key Partners</SectionHeader>
                <div className="flex flex-wrap gap-1.5 mt-1">
                  {data.marketEntry.keyPartners.map((p, i) => (
                    <Badge key={i} variant="navy" size="sm">{p}</Badge>
                  ))}
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
                <div className="text-[10px] text-blue-600 font-semibold uppercase mb-1">Strategic Advice</div>
                <p className="text-xs text-blue-900 leading-relaxed">{data.marketEntry.advice}</p>
              </div>
            </div>
          )}

          {/* Duty & Tariffs */}
          {deepTab === 'duty' && data.dutyTariff && (
            <div>
              <SectionHeader size="md">Duty & Tariff Structure</SectionHeader>
              <DataTable columns={dutyColumns} data={data.dutyTariff} compact className="mt-2" />
            </div>
          )}

          {/* Distributors */}
          {deepTab === 'distributors' && data.distributorLandscape && (
            <div>
              <SectionHeader size="md">Distributor Landscape</SectionHeader>
              <DataTable columns={distColumns} data={data.distributorLandscape} compact className="mt-2" />
            </div>
          )}

          {/* Competitive */}
          {deepTab === 'competitive' && data.competitiveEntry && (
            <div className="space-y-4">
              <SectionHeader size="md">Competitive Landscape</SectionHeader>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <div className="text-[10px] text-gray-400 uppercase mb-1.5">Ease of Entry</div>
                  <div className="flex items-center gap-3">
                    <div className="flex-1">
                      <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
                        <div className="h-full bg-navy/60 rounded-full" style={{ width: `${(data.competitiveEntry.easeOfEntry / 10) * 100}%` }} />
                      </div>
                    </div>
                    <span className="text-sm font-bold text-navy tabular-nums">{data.competitiveEntry.easeOfEntry}/10</span>
                  </div>
                </div>
                <div>
                  <div className="text-[10px] text-gray-400 uppercase mb-1.5">Premium Opportunity</div>
                  <div className="flex items-center gap-3">
                    <div className="flex-1">
                      <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
                        <div className="h-full bg-emerald-500/60 rounded-full" style={{ width: `${(data.competitiveEntry.premiumOpportunity / 10) * 100}%` }} />
                      </div>
                    </div>
                    <span className="text-sm font-bold text-navy tabular-nums">{data.competitiveEntry.premiumOpportunity}/10</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="text-[10px] text-gray-400 uppercase mb-1">Consolidation</div>
                  <p className="text-xs text-gray-700 leading-relaxed">{data.competitiveEntry.consolidation}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="text-[10px] text-gray-400 uppercase mb-1">White Space</div>
                  <p className="text-xs text-gray-700 leading-relaxed">{data.competitiveEntry.whitespace}</p>
                </div>
              </div>

              <div className="bg-amber-50 border border-amber-100 rounded-lg p-4">
                <div className="text-[10px] text-amber-700 font-semibold uppercase mb-1">Strategic Recommendation</div>
                <p className="text-xs text-amber-900 leading-relaxed">{data.competitiveEntry.recommendation}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}


/* ════════════════════════════════════════════
   MAIN PAGE COMPONENT
   ════════════════════════════════════════════ */
export default function GeographicIntelligence() {
  const [searchParams] = useSearchParams()
  const [expandedRegion, setExpandedRegion] = useState(null)
  const [tier3Region, setTier3Region] = useState(null)
  const [mobileSheet, setMobileSheet] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 300)
    return () => clearTimeout(timer)
  }, [])

  const highlightedCountry = searchParams.get('country')

  const filtered = useMemo(() => {
    if (!searchTerm) return REGIONS
    const q = searchTerm.toLowerCase()
    return REGIONS.filter(r =>
      r.name.toLowerCase().includes(q) ||
      r.summary.toLowerCase().includes(q)
    )
  }, [searchTerm])

  const handleCardClick = useCallback((region) => {
    if (expandedRegion === region.key) {
      setExpandedRegion(null)
    } else {
      setExpandedRegion(region.key)
    }
    if (window.innerWidth < 1024) {
      setMobileSheet(region)
    }
  }, [expandedRegion])

  if (loading) {
    return (
      <div className="min-h-screen bg-surface p-3 sm:p-4 lg:p-6 max-w-7xl mx-auto space-y-6">
        <PageHeader title="Geographic Intelligence" subtitle="Loading markets\u2026" />
        <BentoGrid>
          <BentoGrid.Hero><SkeletonCard className="h-40" /></BentoGrid.Hero>
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
        </BentoGrid>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-surface p-3 sm:p-4 lg:p-6 max-w-7xl mx-auto">
      {/* Page Header */}
      <PageHeader
        title="Geographic Intelligence"
        subtitle={`${totalMarkets} markets tracked \u00b7 Global spirits market insights \u00b7 Data as of March 2026`}
        breadcrumbs={[
          { label: 'Command Centre', to: '/' },
          { label: 'Geographic Intelligence' },
        ]}
      />

      {/* ── TIER 1: Executive Metrics ── */}
      <BentoGrid className="mb-6">
        <BentoGrid.Hero>
          <MetricCard
            label="Markets Tracked"
            value={String(totalMarkets)}
            subtitle="Key spirits markets worldwide"
            icon={Globe}
            sparkData={REGIONS.slice(0, 5).map(r => {
              const d = REGION_DATA[r.key]
              return { v: d && d.kpis && d.kpis[0] ? d.kpis[0].change : 0 }
            })}
          />
        </BentoGrid.Hero>
        <MetricCard
          label="Fastest Growing"
          value={fastestGrowing ? `+${REGION_DATA[fastestGrowing.key].kpis[0].change}%` : '\u2014'}
          subtitle={fastestGrowing ? fastestGrowing.name : ''}
          icon={TrendingUp}
          direction="up"
          onClick={() => fastestGrowing && handleCardClick(fastestGrowing)}
        />
        <MetricCard
          label="Largest Market"
          value={largestByValue ? REGION_DATA[largestByValue.key].kpis[0].value : '\u2014'}
          subtitle={largestByValue ? largestByValue.name : ''}
          icon={BarChart3}
        />
        <MetricCard
          label="E-Commerce Leader"
          value={ecomLeader ? `${ecomLeader.pct}%` : '\u2014'}
          subtitle={ecomLeader ? ecomLeader.region.name : ''}
          icon={Globe}
          direction="up"
        />
        <MetricCard
          label="Markets with Regulatory Changes"
          value={String(regulatoryChanges)}
          subtitle="Active regulatory landscapes"
          icon={Shield}
        />
      </BentoGrid>

      {/* Search */}
      <div className="relative mb-6">
        <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search markets\u2026"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="w-full pl-11 pr-4 py-3 text-sm border border-gray-200 rounded-xl bg-white focus:outline-none focus:border-navy/30 focus:shadow-sm transition-all"
        />
        {searchTerm && (
          <button
            onClick={() => setSearchTerm('')}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-400 touch-manipulation"
          >
            <X size={14} />
          </button>
        )}
      </div>

      {/* ── Region Cards Grid (Tier 1) ── */}
      <BentoGrid className="mb-6">
        {filtered.map((region) => {
          const data = REGION_DATA[region.key]
          const isExpanded = expandedRegion === region.key
          const isHighlighted = highlightedCountry === region.key

          return (
            <React.Fragment key={region.key}>
              <RegionCardTier1
                region={region}
                data={data}
                onClick={() => handleCardClick(region)}
                isHighlighted={isHighlighted}
              />

              {/* Tier 2 — expanded inline */}
              {isExpanded && data && (
                <BentoGrid.Full>
                  <RegionTier2
                    region={region}
                    data={data}
                    onClose={() => setExpandedRegion(null)}
                    onViewFull={() => {
                      setTier3Region({ region, data })
                      setExpandedRegion(null)
                    }}
                  />
                </BentoGrid.Full>
              )}
            </React.Fragment>
          )
        })}
      </BentoGrid>

      {filtered.length === 0 && (
        <div className="text-center py-12">
          <Globe size={32} className="mx-auto text-gray-300 mb-3" />
          <p className="text-sm text-gray-400">No markets match your search.</p>
          <button onClick={() => setSearchTerm('')} className="mt-2 text-xs text-navy hover:text-navy/70 font-medium">
            Clear search
          </button>
        </div>
      )}

      {/* ── TIER 3: Full Deep Dive Modal ── */}
      {tier3Region && (
        <RegionTier3
          region={tier3Region.region}
          data={tier3Region.data}
          onClose={() => setTier3Region(null)}
        />
      )}

      {/* ── Mobile Bottom Sheet (Tier 2) ── */}
      <BottomSheet
        open={!!mobileSheet}
        onClose={() => setMobileSheet(null)}
        title={mobileSheet ? mobileSheet.name : ''}
      >
        {mobileSheet && REGION_DATA[mobileSheet.key] && (
          <div className="space-y-4">
            <p className="text-xs text-gray-600 leading-relaxed">{mobileSheet.trajectory}</p>

            {REGION_DATA[mobileSheet.key].kpis && (
              <div className="grid grid-cols-2 gap-2">
                {REGION_DATA[mobileSheet.key].kpis.slice(0, 4).map((kpi, i) => (
                  <div key={i} className="bg-gray-50 rounded-lg p-2 text-center">
                    <div className="text-[11px] text-gray-400 uppercase">{kpi.label}</div>
                    <div className="text-sm font-bold text-navy tabular-nums">{kpi.value}</div>
                  </div>
                ))}
              </div>
            )}

            {REGION_DATA[mobileSheet.key].topBrands && (
              <div>
                <SectionHeader size="sm">Top Brands</SectionHeader>
                <div className="flex flex-wrap gap-1.5 mt-1">
                  {REGION_DATA[mobileSheet.key].topBrands.map((b, i) => (
                    <span key={i} className="px-2 py-0.5 bg-gray-100 rounded-full text-[10px] font-medium text-gray-600">{b}</span>
                  ))}
                </div>
              </div>
            )}

            <button
              onClick={() => {
                const data = REGION_DATA[mobileSheet.key]
                setMobileSheet(null)
                setTier3Region({ region: mobileSheet, data })
              }}
              className="w-full py-2.5 bg-navy text-white rounded-xl text-xs font-medium"
            >
              View Full Market Profile
            </button>
          </div>
        )}
      </BottomSheet>
    </div>
  )
}
