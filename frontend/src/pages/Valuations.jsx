import React, { useState, useMemo, useEffect } from 'react'
import {
  BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Cell
} from 'recharts'
import {
  TrendingUp, TrendingDown, DollarSign, Scale, Building2, Layers,
  ArrowUpRight, ArrowDownRight, Info, Target, Briefcase, BarChart3
} from 'lucide-react'
import {
  Card, MetricCard, PageHeader, BentoGrid, DataTable, ChartCard, DrillDown,
  Badge, SectionHeader, SourceList, TabGroup, EntityLink, YearSelector, BottomSheet,
  SkeletonCard, SubPageNav
} from '../components/ui'
import {
  BRAND_VALUATION_MODELS, BRAND_VALUATIONS, SECTOR_MULTIPLES,
  MA_VALUATION_BENCHMARKS, VALUATION_INSIGHTS, KEY_ACQUIRERS,
  VALUATION_SOURCES
} from '../data/valuationsData'

/* \u2500\u2500 Design tokens \u2500\u2500 */
const COLORS = ['#1A1F36', '#C9A96E', '#2563EB', '#059669', '#DC2626', '#7C3AED', '#F59E0B', '#0EA5E9']

/* \u2500\u2500 Derived metrics \u2500\u2500 */
const totalBrandValue = BRAND_VALUATIONS.reduce((s, b) => s + b.valueNum, 0)
const avgMultiple = (BRAND_VALUATIONS.reduce((s, b) => s + b.multipleNum, 0) / BRAND_VALUATIONS.length).toFixed(1)
const highestBrand = [...BRAND_VALUATIONS].sort((a, b) => b.valueNum - a.valueNum)[0]
const biggestDeal = [...MA_VALUATION_BENCHMARKS].sort((a, b) => b.valueNum - a.valueNum)[0]
const totalMaDeals = MA_VALUATION_BENCHMARKS.length
const avgMaPremium = (MA_VALUATION_BENCHMARKS.reduce((s, d) => s + d.premiumNum, 0) / totalMaDeals).toFixed(0)
const highestYoy = [...BRAND_VALUATIONS].sort((a, b) => b.yoyNum - a.yoyNum)[0]

/* \u2500\u2500 Chart data: sector multiples comparison \u2500\u2500 */
const sectorChartData = SECTOR_MULTIPLES.map(s => ({
  name: s.category.length > 12 ? s.category.slice(0, 12) + '\u2026' : s.category,
  fullName: s.category,
  'EV/Revenue': s.evRevenueNum,
  'EV/EBITDA': s.evEbitdaNum,
}))

/* \u2500\u2500 Chart data: M&A deals by year \u2500\u2500 */
const maByYear = MA_VALUATION_BENCHMARKS.reduce((acc, d) => {
  acc[d.year] = (acc[d.year] || 0) + d.valueNum
  return acc
}, {})
const maYearChart = Object.entries(maByYear).sort(([a], [b]) => Number(a) - Number(b)).map(([year, val]) => ({
  year,
  value: val,
}))

export default function Valuations() {
  const [expandedInsight, setExpandedInsight] = useState(null)
  const [selectedYear, setSelectedYear] = useState(2025)
  const [mobileDetail, setMobileDetail] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 300)
    return () => clearTimeout(timer)
  }, [])

  // Filter M&A deals by selected year (show selected year and earlier)
  const filteredDeals = useMemo(() => {
    return MA_VALUATION_BENCHMARKS.filter(d => d.year <= selectedYear)
      .sort((a, b) => b.year - a.year)
  }, [selectedYear])

  const filteredDealCount = filteredDeals.length
  const filteredDealValue = filteredDeals.reduce((s, d) => s + d.valueNum, 0)
  const filteredAvgPremium = filteredDealCount > 0
    ? (filteredDeals.reduce((s, d) => s + d.premiumNum, 0) / filteredDealCount).toFixed(0)
    : 0

  // M&A chart filtered by year
  const filteredMaByYear = filteredDeals.reduce((acc, d) => {
    acc[d.year] = (acc[d.year] || 0) + d.valueNum
    return acc
  }, {})
  const filteredMaYearChart = Object.entries(filteredMaByYear)
    .sort(([a], [b]) => Number(a) - Number(b))
    .map(([year, val]) => ({ year, value: val }))

  if (loading) {
    return (
      <div className="space-y-6">
        <PageHeader title="Valuations & M&A Intelligence" subtitle="Loading valuation data\u2026" />
        <BentoGrid>
          <BentoGrid.Hero><SkeletonCard className="h-40" /></BentoGrid.Hero>
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
        </BentoGrid>
        <SkeletonCard className="h-24" />
        <SkeletonCard className="h-24" />
      </div>
    )
  }

  /* \u2550\u2550\u2550\u2550\u2550 TIER 1: EXECUTIVE SUMMARY \u2550\u2550\u2550\u2550\u2550 */
  return (
    <div className="space-y-6">
      <PageHeader
        title="Valuations & M&A Intelligence"
        subtitle="Brand valuations, sector multiples, deal benchmarks, and methodology analysis \u00b7 Data as of March 2026"
        breadcrumbs={[
          { label: 'Command Centre', to: '/' },
          { label: 'Valuations' },
        ]}
      />
      <SubPageNav group="reports" />

      {/* Year Selector */}
      <div className="flex items-center justify-between">
        <YearSelector activeYear={selectedYear} onChange={setSelectedYear} />
      </div>

      {/* \u2500\u2500 Tier 1: Bento Grid \u2500\u2500 */}
      <BentoGrid>
        {/* Hero card */}
        <BentoGrid.Hero>
          <Card className="h-full" padding="p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-label text-gray-500 uppercase tracking-wide mb-1">Total Tracked Brand Value</p>
                <p className="text-3xl font-bold text-navy">${totalBrandValue.toFixed(1)}B</p>
                <p className="text-xs text-gray-500 mt-1">{BRAND_VALUATIONS.length} brands across {[...new Set(BRAND_VALUATIONS.map(b => b.category))].length} categories</p>
              </div>
              <div className="p-3 rounded-xl bg-gold/10">
                <DollarSign size={24} className="text-gold" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 mt-auto">
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-[10px] text-gray-500 uppercase">Avg Multiple</p>
                <p className="text-lg font-bold text-navy">{avgMultiple}x</p>
                <p className="text-[10px] text-gray-500">EV/Revenue</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-[10px] text-gray-500 uppercase">Avg M&A Premium</p>
                <p className="text-lg font-bold text-gold">{avgMaPremium}%</p>
                <p className="text-[10px] text-gray-500">vs public comps</p>
              </div>
            </div>
          </Card>
        </BentoGrid.Hero>

        {/* KPI cards */}
        <MetricCard
          label="Highest Valued"
          value={highestBrand.brand}
          subtitle={`${highestBrand.estimatedValue} \u00b7 ${highestBrand.category}`}
          icon={Target}
          change={highestBrand.yoy}
          direction="up"
        />
        <MetricCard
          label="Biggest Deal"
          value={biggestDeal.target}
          subtitle={`${biggestDeal.value} \u00b7 ${biggestDeal.category} \u00b7 ${biggestDeal.year}`}
          icon={Briefcase}
        />
        <MetricCard
          label="Fastest Growing"
          value={highestYoy.brand}
          subtitle={`${highestYoy.category} \u00b7 ${highestYoy.estimatedValue}`}
          icon={TrendingUp}
          change={highestYoy.yoy}
          direction="up"
        />
        <MetricCard
          label="M&A Activity"
          value={`${filteredDealCount} deals`}
          subtitle={`Up to ${selectedYear} \u2014 $${(filteredDealValue / 1000).toFixed(1)}B total`}
          icon={Building2}
        />
      </BentoGrid>

      {/* \u2550\u2550\u2550\u2550\u2550 TIER 2: EXPANDABLE SECTIONS \u2550\u2550\u2550\u2550\u2550 */}

      {/* Category multiples chart */}
      <DrillDown
        title="Sector Trading Multiples"
        summary={`${SECTOR_MULTIPLES.length} segments tracked \u2014 Luxury/Prestige leads at 7.2x EV/Revenue`}
      >
        <div className="space-y-4">
          <ChartCard
            title="EV/Revenue by Segment"
            subtitle="Current valuation multiples across beverage alcohol categories"
            height={280}
          >
            <BarChart data={sectorChartData} margin={{ top: 5, right: 20, bottom: 5, left: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="name" tick={{ fontSize: 9 }} interval={0} angle={-15} textAnchor="end" height={50} />
              <YAxis tick={{ fontSize: 10 }} tickFormatter={v => `${v}x`} />
              <Tooltip
                formatter={(v, name) => [`${v}x`, name]}
                contentStyle={{ fontSize: 11, borderRadius: 8 }}
              />
              <Bar dataKey="EV/Revenue" radius={[4, 4, 0, 0]}>
                {sectorChartData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ChartCard>

          <DataTable
            columns={[
              { key: 'category', label: 'Segment', sortable: true },
              { key: 'evRevenue', label: 'EV/Revenue', align: 'right', sortable: true },
              { key: 'evEbitda', label: 'EV/EBITDA', align: 'right', sortable: true },
              { key: 'peRange', label: 'P/E Range', align: 'right' },
              { key: 'dividendYield', label: 'Div Yield', align: 'right' },
              { key: 'peg', label: 'PEG', align: 'right' },
              { key: 'notes', label: 'Notes', render: (v) => <span className="text-[10px] text-gray-500 line-clamp-2">{v}</span> },
            ]}
            data={SECTOR_MULTIPLES}
            compact
          />
        </div>
      </DrillDown>

      {/* Brand valuations */}
      <DrillDown
        title="Brand Valuations"
        summary={`${BRAND_VALUATIONS.length} spirits brands \u2014 $${totalBrandValue.toFixed(1)}B total tracked value`}
      >
        <div className="space-y-4">
          {/* Visual cards for top brands */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {BRAND_VALUATIONS.slice(0, 6).map((b) => (
              <Card key={b.brand} padding="p-4">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <p className="text-sm font-semibold text-navy">{b.brand}</p>
                    <p className="text-[10px] text-gray-500">{b.parent} \u00b7 {b.category}</p>
                  </div>
                  {b.trend === 'up' ? (
                    <TrendingUp size={14} className="text-emerald-500" />
                  ) : b.trend === 'down' ? (
                    <TrendingDown size={14} className="text-red-500" />
                  ) : (
                    <span className="text-[10px] text-gray-500">\u2014</span>
                  )}
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-xl font-bold text-gold">{b.estimatedValue}</span>
                  <span className={`text-xs font-semibold ${b.yoyNum > 0 ? 'text-emerald-600' : b.yoyNum < 0 ? 'text-red-500' : 'text-gray-500'}`}>{b.yoy}</span>
                </div>
                <div className="flex items-center gap-3 mt-2 text-[10px] text-gray-500">
                  <span>{b.multiple} EV/Rev</span>
                  <span>\u00b7</span>
                  <span>{b.methodology}</span>
                </div>
              </Card>
            ))}
          </div>

          {/* Tier 3 trigger: full table */}
          <FullBrandTable />
        </div>
      </DrillDown>

      {/* M&A benchmarks */}
      <DrillDown
        title="M&A Valuation Benchmarks"
        summary={`${filteredDealCount} transactions (up to ${selectedYear}) \u2014 $${(filteredDealValue / 1000).toFixed(1)}B total \u2014 avg premium ${filteredAvgPremium}%`}
      >
        <div className="space-y-4">
          <ChartCard
            title={`M&A Deal Volume by Year (up to ${selectedYear})`}
            subtitle="Total transaction value ($M) by year"
            height={220}
          >
            <BarChart data={filteredMaYearChart} margin={{ top: 5, right: 20, bottom: 5, left: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="year" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 10 }} tickFormatter={v => `$${v}M`} />
              <Tooltip
                formatter={(v) => [`$${v}M`, 'Total Value']}
                contentStyle={{ fontSize: 11, borderRadius: 8 }}
              />
              <Bar dataKey="value" fill="#C9A96E" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ChartCard>

          <DataTable
            columns={[
              { key: 'year', label: 'Year', sortable: true, align: 'right' },
              { key: 'target', label: 'Target', sortable: true, render: (v) => <span className="font-medium text-gold">{v}</span> },
              { key: 'acquirer', label: 'Acquirer', sortable: true },
              { key: 'value', label: 'Deal Value', align: 'right', sortable: true },
              { key: 'evRevenue', label: 'EV/Rev', align: 'right' },
              { key: 'evEbitda', label: 'EV/EBITDA', align: 'right' },
              { key: 'category', label: 'Category' },
              { key: 'premium', label: 'Premium', align: 'right', render: (v) => <span className="font-semibold text-emerald-600">{v}</span> },
            ]}
            data={filteredDeals}
            searchable
            searchPlaceholder="Search deals\u2026"
            searchKey="target"
            compact
          />
        </div>
      </DrillDown>

      {/* Key acquirers */}
      <DrillDown
        title="Key Acquirers & Portfolios"
        summary={`${KEY_ACQUIRERS.length} active acquirers tracked \u2014 Diageo leads with 5 deals`}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {KEY_ACQUIRERS.map((acq) => (
            <Card key={acq.name} padding="p-4">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-semibold text-navy">{acq.name}</p>
                <Badge variant="default">{acq.deals} deals</Badge>
              </div>
              <p className="text-lg font-bold text-gold mb-1">{acq.totalSpent}</p>
              <p className="text-[10px] text-gray-500 mb-2">{acq.focus}</p>
              <div className="flex flex-wrap gap-1">
                {acq.keyBrands.map((b) => (
                  <span key={b} className="text-[11px] bg-gray-50 text-gray-600 px-1.5 py-0.5 rounded border border-gray-100">{b}</span>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </DrillDown>

      {/* Valuation insights */}
      <DrillDown
        title="Valuation Insights & Trends"
        summary={`${VALUATION_INSIGHTS.length} key insights for brand positioning and investment strategy`}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {VALUATION_INSIGHTS.map((insight, i) => (
            <Card key={i} padding="p-4" hover onClick={() => {
              if (window.innerWidth < 1024) {
                setMobileDetail({
                  title: insight.title,
                  content: (
                    <div className="space-y-3">
                      <p className="text-xs text-gray-600 leading-relaxed">{insight.insight}</p>
                      <div className="bg-blue-50 border border-blue-100 rounded-lg p-3">
                        <p className="text-[10px] font-medium text-blue-900 mb-1">Implication for new brands:</p>
                        <p className="text-[10px] text-blue-800">{insight.implication}</p>
                      </div>
                      <p className="text-[10px] text-gray-500 italic">Source: {insight.source.label}</p>
                    </div>
                  )
                })
                return
              }
              setExpandedInsight(expandedInsight === i ? null : i)
            }}>
              <div className="flex gap-3 mb-2">
                <Info size={16} className="text-gold flex-shrink-0 mt-0.5" />
                <p className="text-sm font-semibold text-navy">{insight.title}</p>
              </div>
              <p className="text-xs text-gray-600 mb-2">{insight.insight}</p>
              {expandedInsight === i && (
                <div className="animate-fadeIn">
                  <div className="bg-blue-50 border border-blue-100 rounded-lg p-3 mb-2">
                    <p className="text-[10px] font-medium text-blue-900 mb-1">Implication for new brands:</p>
                    <p className="text-[10px] text-blue-800">{insight.implication}</p>
                  </div>
                  <p className="text-[10px] text-gray-500 italic">Source: {insight.source.label}</p>
                </div>
              )}
            </Card>
          ))}
        </div>
      </DrillDown>

      {/* Valuation methodologies */}
      <DrillDown
        title="Brand Valuation Methodologies"
        summary={`${BRAND_VALUATION_MODELS.length} standard approaches \u2014 tap to explore formulas and use cases`}
      >
        <MethodologyGrid />
      </DrillDown>

      {/* Sources */}
      <SourceList sources={VALUATION_SOURCES} />

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

/* \u2550\u2550\u2550\u2550\u2550 TIER 3: DEEP DIVE COMPONENTS \u2550\u2550\u2550\u2550\u2550 */

function FullBrandTable() {
  return (
    <DataTable
      columns={[
        { key: 'brand', label: 'Brand', sortable: true, render: (v) => <span className="font-medium text-navy">{v}</span> },
        { key: 'parent', label: 'Parent', sortable: true },
        { key: 'estimatedValue', label: 'Est. Value', align: 'right', sortable: true },
        { key: 'methodology', label: 'Method' },
        { key: 'multiple', label: 'Multiple', align: 'right' },
        { key: 'category', label: 'Category' },
        { key: 'yoy', label: 'YoY', align: 'right', render: (v, row) => (
          <span className={`font-semibold ${row.yoyNum > 0 ? 'text-emerald-600' : row.yoyNum < 0 ? 'text-red-500' : ''}`}>{v}</span>
        )},
        { key: 'notes', label: 'Notes', render: (v) => <span className="text-[10px] text-gray-500 line-clamp-1">{v}</span> },
      ]}
      data={BRAND_VALUATIONS}
      searchable
      searchPlaceholder="Search brands\u2026"
      searchKey="brand"
    />
  )
}

function MethodologyGrid() {
  const [expanded, setExpanded] = useState(null)

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
      {BRAND_VALUATION_MODELS.map((method, i) => (
        <Card
          key={i}
          hover={expanded !== i}
          onClick={() => setExpanded(expanded === i ? null : i)}
          padding="p-0"
        >
          <div className="p-4 bg-gradient-to-r from-navy to-navy/90 rounded-t-xl">
            <div className="flex justify-between items-start gap-3">
              <p className="font-semibold text-white text-sm">{method.name}</p>
              {expanded === i ? (
                <ArrowUpRight size={14} className="text-gold flex-shrink-0" />
              ) : (
                <ArrowDownRight size={14} className="text-gold flex-shrink-0" />
              )}
            </div>
          </div>
          <div className="p-4">
            <p className="text-xs text-gray-600 mb-2">{method.description}</p>
            {expanded === i && (
              <div className="space-y-3 animate-fadeIn">
                <div className="pb-3 border-b border-gray-100">
                  <p className="text-[10px] font-semibold text-gray-500 uppercase mb-1">Best For</p>
                  <p className="text-xs text-gray-700">{method.bestFor}</p>
                </div>
                <div className="pb-3 border-b border-gray-100">
                  <p className="text-[10px] font-semibold text-gray-500 uppercase mb-1">Formula</p>
                  <p className="text-[10px] text-gray-700 font-mono bg-gray-50 p-2 rounded">{method.formula}</p>
                </div>
                <div className="pb-3 border-b border-gray-100">
                  <p className="text-[10px] font-semibold text-gray-500 uppercase mb-1">Example</p>
                  <p className="text-[10px] text-gray-700">{method.example}</p>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <p className="text-[10px] font-semibold text-emerald-600 mb-1">Pros</p>
                    <p className="text-[10px] text-gray-600">{method.pros}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-semibold text-red-500 mb-1">Cons</p>
                    <p className="text-[10px] text-gray-600">{method.cons}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </Card>
      ))}
    </div>
  )
}
