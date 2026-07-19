import React, { useState, useMemo, useEffect, useCallback } from 'react'
import { useSearchParams } from 'react-router-dom'
import {
  TrendingUp, TrendingDown, Minus, Globe, BarChart3,
  ChevronRight, ChevronDown, Award, Star, Package,
  ArrowLeft, Download, FileText, Layers, Zap
} from 'lucide-react'
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis,
  CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts'
import { CATEGORIES } from '../data/categoryData'
import { CHART_COLORS, CHANNEL_COLORS, CATEGORICAL } from '../data/chartColors'
import { getCategoryDemographics } from '../data/spiritsDemographicsData'
import {
  Card, MetricCard, PageHeader, YearSelector,
  BentoGrid, SectionHeader, SectionLabel, TabGroup,
  ChartCard, DataTable, SourceLink, SourceList, EntityLink, BottomSheet,
  SkeletonCard, SkeletonChart, SubPageNav, ErrorBoundary, MethodologyTooltip, DataFreshness
} from '../components/ui'

// ============================================
// CONSTANTS
// ============================================
const YEARS = [2021, 2022, 2023, 2024, 2025]

const HERO_GRADIENTS = {
  tequila: 'from-amber-50 to-orange-50',
  vodka: 'from-sky-50 to-blue-50',
  gin: 'from-emerald-50 to-teal-50',
  whisky: 'from-amber-50 to-yellow-50',
  rum: 'from-orange-50 to-red-50',
  cognac: 'from-purple-50 to-pink-50',
  champagne: 'from-yellow-50 to-amber-50',
  wine: 'from-rose-50 to-red-50',
  beer: 'from-amber-50 to-lime-50',
  nolo: 'from-cyan-50 to-sky-50',
  rtd: 'from-violet-50 to-indigo-50'
}

const CHANNEL_CONFIG = [
  { key: 'onTrade', label: 'On-Trade', color: CHANNEL_COLORS.onTrade },
  { key: 'offTrade', label: 'Off-Trade', color: CHANNEL_COLORS.offTrade },
  { key: 'eCommerce', label: 'E-Commerce', color: CHANNEL_COLORS.eCommerce },
  { key: 'travelRetail', label: 'Travel Retail', color: CHANNEL_COLORS.travelRetail }
]

const BRAND_TIERS = [
  { key: 'highEnd', label: 'Ultra-Premium / Luxury', colorClasses: 'bg-amber-50 border-amber-200 text-amber-800', icon: Award, iconColor: 'text-amber-600' },
  { key: 'midTier', label: 'Premium', colorClasses: 'bg-blue-50 border-blue-200 text-blue-800', icon: Star, iconColor: 'text-blue-600' },
  { key: 'value', label: 'Value / Entry-Level', colorClasses: 'bg-gray-50 border-gray-200 text-gray-700', icon: Package, iconColor: 'text-gray-500' }
]

// ============================================
// HELPERS
// ============================================
function parseNumeric(str) {
  if (!str) return 0
  const cleaned = str.replace(/[^0-9.\-]/g, '')
  return parseFloat(cleaned) || 0
}

function parseMarketSize(str) {
  if (!str) return 0
  const num = parseFloat(str.replace(/[^0-9.]/g, ''))
  if (str.includes('T')) return num * 1000
  return num
}

function growthDir(val) {
  if (!val) return 'flat'
  if (val.startsWith('+')) return 'up'
  if (val.startsWith('-')) return 'down'
  return 'flat'
}

function GrowthBadge({ value, showYoY = false }) {
  const dir = growthDir(value)
  const suffix = showYoY ? ' YoY' : ''
  if (dir === 'up') return <span className="inline-flex items-center gap-0.5 text-emerald-600 font-semibold text-xs"><TrendingUp size={12} />{value}{suffix}</span>
  if (dir === 'down') return <span className="inline-flex items-center gap-0.5 text-red-500 font-semibold text-xs"><TrendingDown size={12} />{value}{suffix}</span>
  return <span className="inline-flex items-center gap-0.5 text-gray-500 font-semibold text-xs"><Minus size={12} />{value}{suffix}</span>
}

// ============================================
// AGGREGATE METRICS (computed from category data)
// ============================================
function useAggregateMetrics(year) {
  return useMemo(() => {
    let totalSize = 0
    let fastestGrowth = { cat: null, growth: -Infinity }
    let largestCat = { cat: null, size: 0 }
    let totalVolume = 0

    CATEGORIES.forEach(cat => {
      const yd = cat.yearData[year]
      if (!yd) return
      const size = parseMarketSize(yd.marketSize)
      const growth = parseNumeric(yd.growth)
      const vol = parseNumeric(yd.volumeCases)

      totalSize += size
      totalVolume += vol
      if (growth > fastestGrowth.growth) fastestGrowth = { cat, growth, label: yd.growth }
      if (size > largestCat.size) largestCat = { cat, size }
    })

    // Sparkline data for total market across years
    const sparkData = YEARS.map(y => {
      let sum = 0
      CATEGORIES.forEach(c => {
        const yd = c.yearData[y]
        if (yd) sum += parseMarketSize(yd.marketSize)
      })
      return { v: sum }
    })

    return {
      totalSize: `$${totalSize.toFixed(0)}B`,
      fastestGrowth,
      largestCat,
      totalVolume: `${(totalVolume / 1000).toFixed(1)}B`,
      categoryCount: CATEGORIES.length,
      sparkData
    }
  }, [year])
}

// Sort categories: largest market first (F-pattern: most important top-left)
function useSortedCategories(year) {
  return useMemo(() => {
    return [...CATEGORIES].sort((a, b) => {
      const sA = parseMarketSize(a.yearData[year]?.marketSize || '0')
      const sB = parseMarketSize(b.yearData[year]?.marketSize || '0')
      return sB - sA
    })
  }, [year])
}

// 5-year trend data for a category
function useTrendChartData(catKey) {
  return useMemo(() => {
    const cat = CATEGORIES.find(c => c.key === catKey)
    if (!cat) return []
    return YEARS.map(y => {
      const yd = cat.yearData[y]
      return {
        year: y,
        size: yd ? parseMarketSize(yd.marketSize) : 0,
        growth: yd ? parseNumeric(yd.growth) : 0
      }
    })
  }, [catKey])
}

// ============================================
// TIER 2: Market Drill-Down (click a market)
// ============================================
function MarketDrillDown({ market }) {
  const [expanded, setExpanded] = useState(false)
  return (
    <div className="border border-gray-100 rounded-xl overflow-hidden">
      <button onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between p-3 min-h-[44px] hover:bg-gray-50 transition-colors touch-manipulation">
        <div className="flex items-center gap-3">
          <Globe size={16} className="text-gray-500" />
          <span className="font-semibold text-sm text-gray-900">{market.name}</span>
          <GrowthBadge value={market.growth} />
        </div>
        {expanded
          ? <ChevronDown size={16} className="text-gray-500" />
          : <ChevronRight size={16} className="text-gray-500" />
        }
      </button>
      {expanded && (
        <div className="px-4 pb-4 space-y-4 border-t border-gray-100 bg-gray-50/50">
          {/* Brands in market */}
          <div className="pt-3">
            <SectionLabel>Top Brands in Market</SectionLabel>
            <div className="flex flex-wrap gap-1.5">
              {market.brands.map((b, i) => (
                <EntityLink key={i} type="brand" id={b.toLowerCase().replace(/\s+/g, '-')} label={b}
                  className="px-2.5 py-1 bg-white border border-gray-200 rounded-full text-xs font-medium text-gray-700 no-underline hover:border-navy/30" />
              ))}
            </div>
          </div>
          {/* Regional breakdown */}
          <div>
            <SectionLabel>Regional Breakdown</SectionLabel>
            <div className="space-y-2">
              {market.regions.map((r, i) => (
                <div key={i} className="flex items-center gap-3">
                  <span className="text-xs text-gray-700 w-24 font-medium truncate">{r.name}</span>
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full transition-all" style={{ width: r.share }} />
                  </div>
                  <span className="text-xs text-gray-500 w-12 text-right tabular-nums">{r.share}</span>
                  <span className="text-xs text-emerald-600 w-14 text-right font-medium tabular-nums">{r.growth}</span>
                </div>
              ))}
            </div>
          </div>
          {/* Sources */}
          {market.sources && market.sources.length > 0 && (
            <SourceList sources={market.sources.map(s => ({ label: s.name, url: s.url }))} />
          )}
        </div>
      )}
    </div>
  )
}

// ============================================
// TIER 2: Tiered Brands Display
// ============================================
function TieredBrands({ brands, categoryKey }) {
  return (
    <div className="space-y-4">
      {BRAND_TIERS.map(tier => {
        const Icon = tier.icon
        const items = brands[tier.key] || []
        if (items.length === 0) return null
        return (
          <div key={tier.key}>
            <div className="flex items-center gap-2 mb-2">
              <Icon size={14} className={tier.iconColor} />
              <SectionLabel className="mb-0">{tier.label}</SectionLabel>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {items.map((b, i) => (
                <EntityLink
                  key={i}
                  type="brand"
                  id={b.toLowerCase().replace(/\s+/g, '-')}
                  label={b}
                  context={{ category: categoryKey }}
                  className={`px-2.5 py-1 border rounded-full text-xs font-medium ${tier.colorClasses} no-underline hover:shadow-sm`}
                />
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}

// ============================================
// TIER 2: Channel Split Bars
// ============================================
function ChannelSplit({ channels }) {
  return (
    <div className="space-y-2.5">
      {CHANNEL_CONFIG.map(item => (
        <div key={item.key} className="flex items-center gap-3">
          <span className="text-xs text-gray-600 w-24 font-medium">{item.label}</span>
          <div className="flex-1 bg-gray-100 rounded-full h-3">
            <div
              className="h-3 rounded-full transition-all"
              style={{ width: `${channels[item.key]}%`, backgroundColor: item.color }}
            />
          </div>
          <span className="text-xs font-semibold text-gray-700 w-10 text-right tabular-nums">{channels[item.key]}%</span>
        </div>
      ))}
    </div>
  )
}

// ============================================
// TIER 2: Trends List
// ============================================
function TrendsList({ trends }) {
  return (
    <div className="space-y-3">
      {trends.map((t, i) => (
        <Card key={i} padding="p-3">
          <p className="text-sm text-gray-800 leading-relaxed">{t.text}</p>
          <div className="mt-2">
            <SourceLink label={t.source} url={t.url} />
          </div>
        </Card>
      ))}
    </div>
  )
}

// ============================================
// TIER 3: Deep Yearly Analysis Report
// ============================================
function YearlyReport({ report, year }) {
  if (!report) return (
    <div className="p-8 text-center text-gray-500 text-sm">No analysis available for {year}</div>
  )
  return (
    <div className="space-y-5">
      {/* Key Events */}
      <div>
        <SectionLabel>Key Events</SectionLabel>
        <div className="flex flex-wrap gap-2">
          {report.keyEvents.map((e, i) => (
            <span key={i} className="px-3 py-1.5 bg-blue-50 border border-blue-100 rounded-lg text-xs font-medium text-blue-800">{e}</span>
          ))}
        </div>
      </div>
      {/* Top Performer */}
      <div className="flex items-center gap-2 py-2 px-3 bg-amber-50 border border-amber-100 rounded-lg">
        <Award size={16} className="text-amber-600 shrink-0" />
        <span className="text-sm font-semibold text-amber-900">Top Performer: {report.topPerformer}</span>
      </div>
      {/* Analysis */}
      <div className="prose prose-sm max-w-none">
        {report.analysis.split('\n').filter(p => p.trim()).map((para, i) => (
          <p key={i} className="text-sm text-gray-700 leading-relaxed mb-3">{para}</p>
        ))}
      </div>
      {/* Conclusion */}
      {report.conclusion && (
        <Card className="bg-navy/5 border-navy/10" padding="p-4">
          <SectionLabel>Conclusion</SectionLabel>
          <p className="text-sm text-gray-700 leading-relaxed">{report.conclusion}</p>
        </Card>
      )}
    </div>
  )
}

// ============================================
// TIER 2: 5-Year Market Trend Chart
// ============================================
function MarketTrendChart({ catKey }) {
  const data = useTrendChartData(catKey)
  if (!data.length) return null
  return (
    <ChartCard
      title="5-Year Market Trend"
      subtitle={"Market size ($B) · 2021–2025"}
      source="IWSR / Euromonitor"
      tableData={data}
      tableColumns={[
        { key: 'year', label: 'Year' },
        { key: 'size', label: 'Market Size ($B)', render: v => `$${Number(v).toFixed(1)}B` },
        { key: 'growth', label: 'Growth (%)', render: v => `${v}%` },
      ]}
    >
      <AreaChart data={data} accessibilityLayer={true}>
        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
        <XAxis dataKey="year" tick={{ fontSize: 11, fill: '#9ca3af' }} />
        <YAxis tick={{ fontSize: 11, fill: '#9ca3af' }} tickFormatter={v => `$${v}B`} width={55} />
        <Tooltip
          formatter={(val) => [`$${val.toFixed(1)}B`, 'Market Size']}
          contentStyle={{ background: '#1e293b', border: 'none', borderRadius: 8, fontSize: 11 }}
          labelStyle={{ color: '#f1f5f9', fontWeight: 600 }}
          itemStyle={{ color: '#f1f5f9' }}
        />
        <Area type="monotone" dataKey="size" stroke={CHART_COLORS.primary} fill={CHART_COLORS.primary} fillOpacity={0.08} strokeWidth={2} />
      </AreaChart>
    </ChartCard>
  )
}

// ============================================
// TIER 2: Channel Split Stacked Bar Chart
// ============================================
function ChannelChart({ catKey }) {
  const data = useMemo(() => {
    const cat = CATEGORIES.find(c => c.key === catKey)
    if (!cat) return []
    return YEARS.map(y => {
      const yd = cat.yearData[y]
      if (!yd) return { year: y, onTrade: 0, offTrade: 0, eCommerce: 0, travelRetail: 0 }
      return { year: y, ...yd.channels }
    })
  }, [catKey])

  return (
    <ChartCard
      title="Channel Distribution"
      subtitle={"% share by channel · 2021–2025"}
      source="IWSR"
      tableData={data}
      tableColumns={[
        { key: 'year', label: 'Year' },
        { key: 'onTrade', label: 'On-Trade (%)', render: v => `${v}%` },
        { key: 'offTrade', label: 'Off-Trade (%)', render: v => `${v}%` },
        { key: 'eCommerce', label: 'E-Commerce (%)', render: v => `${v}%` },
        { key: 'travelRetail', label: 'Travel Retail (%)', render: v => `${v}%` },
      ]}
    >
      <BarChart data={data} accessibilityLayer={true}>
        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
        <XAxis dataKey="year" tick={{ fontSize: 11, fill: '#9ca3af' }} />
        <YAxis tick={{ fontSize: 11, fill: '#9ca3af' }} tickFormatter={v => `${v}%`} width={45} />
        <Tooltip
          formatter={(val, name) => {
            const labels = { onTrade: 'On-Trade', offTrade: 'Off-Trade', eCommerce: 'E-Commerce', travelRetail: 'Travel Retail' }
            return [val != null ? `${val}%` : '—', labels[name] || name]
          }}
          contentStyle={{ background: '#1e293b', border: 'none', borderRadius: 8, fontSize: 11 }}
          labelStyle={{ color: '#f1f5f9' }}
          itemStyle={{ color: '#f1f5f9' }}
        />
        {CHANNEL_CONFIG.map(ch => (
          <Bar key={ch.key} dataKey={ch.key} stackId="channels" fill={ch.color} radius={ch.key === 'travelRetail' ? [2, 2, 0, 0] : [0, 0, 0, 0]} />
        ))}
      </BarChart>
    </ChartCard>
  )
}

// ============================================
// TIER 1: Category Bento Card
// ============================================
function CategoryCard({ cat, year, isHero, onClick }) {
  const yd = cat.yearData[year]
  if (!yd) return null

  const gradient = HERO_GRADIENTS[cat.key] || 'from-gray-50 to-gray-100'
  const brandCount = (yd.brands?.highEnd?.length || 0) + (yd.brands?.midTier?.length || 0) + (yd.brands?.value?.length || 0)

  // Sparkline data across years
  const sparkData = YEARS.map(y => {
    const d = cat.yearData[y]
    return { v: d ? parseMarketSize(d.marketSize) : 0 }
  })

  return (
    <button onClick={onClick}
      className={`group w-full text-left rounded-2xl overflow-hidden bg-white border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 ${
        isHero ? 'sm:col-span-2 sm:row-span-2' : ''
      }`}>
      <div className={`bg-gradient-to-br ${gradient} ${isHero ? 'p-6 sm:p-8' : 'p-4 sm:p-5'}`}>
        <div className="flex items-start justify-between mb-3">
          <div className={`${isHero ? 'w-14 h-14' : 'w-10 h-10'} rounded-2xl flex items-center justify-center text-lg font-bold ${cat.iconBg} ${cat.iconColor} shadow-sm`}>
            {cat.icon}
          </div>
          <ChevronRight size={18} className="text-gray-500 group-hover:text-gray-600 group-hover:translate-x-1 transition-all" />
        </div>
        <h3 className={`font-display ${isHero ? 'text-xl sm:text-2xl' : 'text-base sm:text-lg'} font-bold text-navy mb-1.5`}>{cat.label}</h3>
        {isHero && <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed mb-4">{cat.trajectory}</p>}

        <div className={`flex items-end justify-between ${isHero ? 'gap-6' : 'gap-3'}`}>
          <div className="flex items-center gap-4 sm:gap-6">
            <div>
              <div className="text-micro text-gray-500 uppercase tracking-wider font-medium">Size</div>
              <div className={`${isHero ? 'text-xl' : 'text-lg'} font-bold text-navy tabular-nums`}>{yd.marketSize}</div>
            </div>
            <div>
              <div className="text-micro text-gray-500 uppercase tracking-wider font-medium">Growth</div>
              <div className={`${isHero ? 'text-xl' : 'text-lg'} font-bold`}>
                <GrowthBadge value={yd.growth} showYoY />
              </div>
            </div>
            {isHero && (
              <div>
                <div className="text-micro text-gray-500 uppercase tracking-wider font-medium">Volume</div>
                <div className="text-xl font-bold text-navy tabular-nums">{yd.volumeCases}</div>
              </div>
            )}
          </div>
          {/* Sparkline */}
          <div className="w-16 h-8 opacity-60">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={sparkData} accessibilityLayer={true}>
                <Area type="monotone" dataKey="v" stroke={CHART_COLORS.primary} fill={CHART_COLORS.primary} fillOpacity={0.08} strokeWidth={1.5} dot={false} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      <div className="px-4 sm:px-5 py-2.5 flex items-center justify-between">
        <span className="text-xs text-gray-500 whitespace-nowrap">{yd.topMarkets.length} markets {'·'} {brandCount} brands {'·'} {yd.trends.length} trends</span>
        <span className="text-xs font-semibold text-gold group-hover:underline flex-shrink-0 ml-2">Explore {'→'}</span>
      </div>
    </button>
  )
}

// ============================================
// TIER 2: Demographics Panel (from 5-category research pass)
// Source data: spiritsDemographicsData.js
// ============================================
function DemoBadge({ label, value }) {
  return (
    <div className="bg-gray-50 rounded-lg p-2.5 min-w-0">
      <div className="text-xs text-gray-500 truncate">{label}</div>
      <div className="text-sm font-bold text-navy mt-0.5 leading-tight">{value}</div>
    </div>
  )
}

function EstimatedBadge() {
  return (
    <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-semibold bg-amber-50 text-amber-700 border border-amber-200 ml-1 align-middle">
      Estimated
    </span>
  )
}

function DemoTable({ rows, columns }) {
  if (!rows || rows.length === 0) return null
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-xs border-collapse">
        <thead>
          <tr className="border-b border-gray-100">
            {columns.map((col, i) => (
              <th key={i} className="text-left text-gray-500 font-semibold py-2 pr-3 whitespace-nowrap">{col.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, ri) => (
            <tr key={ri} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
              {columns.map((col, ci) => (
                <td key={ci} className="py-2 pr-3 text-gray-700 align-top leading-snug">
                  {col.render ? col.render(row[col.key], row) : (row[col.key] ?? '—')}
                  {col.key === 'notes' && row.estimatedSources ? <EstimatedBadge /> : null}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function DemographicsPanel({ categoryKey }) {
  const data = getCategoryDemographics(categoryKey)
  if (!data) return (
    <Card padding="p-6">
      <div className="text-center text-gray-400 text-sm py-4">
        <p>No demographics data available for this category.</p>
        <p className="text-xs mt-1 text-gray-400">Spirits research covers: Whisky, Agave, Gin, Rum, Vodka, Cognac, NOLO.</p>
      </div>
    </Card>
  )

  const { marketSizeFigure, cagr, source, subCategories, demographics, topBrands, keyTrends, sources } = data

  return (
    <div className="space-y-5">
      {/* Hero metrics */}
      {(marketSizeFigure || cagr) && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {marketSizeFigure && <DemoBadge label="Market Size (2025)" value={marketSizeFigure} />}
          {cagr && <DemoBadge label="Growth CAGR" value={cagr} />}
        </div>
      )}

      {/* Sub-categories */}
      {subCategories && subCategories.length > 0 && (
        <Card>
          <SectionLabel>Sub-Category Breakdown</SectionLabel>
          <DemoTable
            rows={subCategories}
            columns={[
              { key: 'name', label: 'Sub-Category', render: v => <span className="font-semibold text-gray-800">{v}</span> },
              { key: 'share', label: 'Market Share' },
              { key: 'cagr', label: 'CAGR' },
              { key: 'notes', label: 'Notes', render: v => <span className="text-gray-600 text-xs">{v}</span> }
            ]}
          />
        </Card>
      )}

      {/* Age demographics */}
      {demographics?.age && demographics.age.length > 0 && (
        <Card>
          <SectionLabel>Age Demographics</SectionLabel>
          <DemoTable
            rows={demographics.age}
            columns={[
              { key: 'bracket', label: 'Age Bracket', render: v => <span className="font-semibold text-gray-800">{v}</span> },
              { key: 'share', label: 'Share / Stat' },
              { key: 'notes', label: 'Intelligence', render: v => <span className="text-gray-600 text-xs">{v}</span> }
            ]}
          />
        </Card>
      )}

      {/* Gender demographics */}
      {demographics?.gender && demographics.gender.length > 0 && (
        <Card>
          <SectionLabel>Gender Split</SectionLabel>
          <div className="space-y-3">
            {demographics.gender.map((g, i) => (
              <div key={i} className="flex items-start gap-3 pb-3 border-b border-gray-50 last:border-0 last:pb-0">
                <div className="w-24 shrink-0">
                  <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-semibold ${
                    g.segment.toLowerCase().includes('female') ? 'bg-pink-50 text-pink-700' :
                    g.segment.toLowerCase().includes('male') ? 'bg-blue-50 text-blue-700' :
                    'bg-gray-100 text-gray-700'
                  }`}>{g.segment}</span>
                </div>
                <div className="flex-1 min-w-0">
                  {g.share && <div className="text-sm font-bold text-navy mb-0.5">{g.share}</div>}
                  <p className="text-xs text-gray-600 leading-relaxed">{g.notes}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Income */}
      {demographics?.income && demographics.income.length > 0 && (
        <Card>
          <SectionLabel>Income Profile</SectionLabel>
          <div className="space-y-2.5">
            {demographics.income.map((inc, i) => (
              <div key={i} className="flex items-start gap-2.5 pb-2.5 border-b border-gray-50 last:border-0 last:pb-0">
                <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 rounded-full text-xs font-semibold shrink-0 mt-0.5">{inc.bracket}</span>
                <p className="text-xs text-gray-600 leading-relaxed">{inc.notes}</p>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Region */}
      {demographics?.region && demographics.region.length > 0 && (
        <Card>
          <SectionLabel>Regional Intelligence</SectionLabel>
          <DemoTable
            rows={demographics.region}
            columns={[
              { key: 'name', label: 'Region', render: v => <span className="font-semibold text-gray-800">{v}</span> },
              { key: 'share', label: 'Share' },
              { key: 'notes', label: 'Intelligence', render: v => <span className="text-gray-600 text-xs">{v}</span> }
            ]}
          />
        </Card>
      )}

      {/* Occasions */}
      {demographics?.occasion && demographics.occasion.length > 0 && (
        <Card>
          <SectionLabel>Consumption Occasions</SectionLabel>
          <div className="flex flex-wrap gap-2">
            {demographics.occasion.map((occ, i) => (
              <div key={i} className="group relative">
                <span className="px-3 py-1.5 bg-blue-50 border border-blue-100 text-blue-800 text-xs font-medium rounded-lg cursor-default">{occ.name}</span>
                <div className="hidden group-hover:block absolute z-10 left-0 top-7 w-64 bg-gray-900 text-white text-xs rounded-lg p-2.5 shadow-xl leading-relaxed">
                  {occ.notes}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-3 space-y-1.5">
            {demographics.occasion.map((occ, i) => (
              <div key={i} className="flex items-start gap-2">
                <span className="text-blue-500 mt-0.5 shrink-0">{'▶'}</span>
                <div>
                  <span className="text-xs font-semibold text-gray-800">{occ.name}: </span>
                  <span className="text-xs text-gray-600">{occ.notes}</span>
                  {occ.estimatedSources ? <EstimatedBadge /> : null}
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Top Brands */}
      {topBrands && topBrands.length > 0 && (
        <Card>
          <SectionLabel>Top Brands by Volume / Influence</SectionLabel>
          <DemoTable
            rows={topBrands}
            columns={[
              { key: 'rank', label: '#', render: v => <span className="text-gray-400 font-mono">{v}</span> },
              { key: 'name', label: 'Brand', render: v => <span className="font-semibold text-gray-800">{v}</span> },
              { key: 'owner', label: 'Owner', render: v => <span className="text-gray-600">{v}</span> },
              { key: 'volumeCases', label: 'Volume (9L)' },
              { key: 'notes', label: 'Notes', render: v => <span className="text-gray-600 text-xs">{v}</span> }
            ]}
          />
        </Card>
      )}

      {/* Key Trends */}
      {keyTrends && keyTrends.length > 0 && (
        <Card>
          <SectionLabel>Key Trends (2024{'–'}2026)</SectionLabel>
          <div className="space-y-2">
            {keyTrends.map((t, i) => (
              <div key={i} className="flex items-start gap-2.5 py-2 border-b border-gray-50 last:border-0 last:py-0">
                <span className="w-5 h-5 rounded-full bg-navy text-white text-micro font-bold flex items-center justify-center shrink-0 mt-0.5">{i + 1}</span>
                <p className="text-sm text-gray-700 leading-relaxed">{t}</p>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Sources */}
      {sources && sources.length > 0 && (
        <Card padding="p-4">
          <SectionLabel>Research Sources</SectionLabel>
          <div className="flex flex-wrap gap-x-3 gap-y-1">
            {sources.map((s, i) => (
              <span key={i} className="text-xs text-gray-500 italic">{s}</span>
            ))}
          </div>
          {source && (
            <p className="text-xs text-gray-400 mt-2">Data file: {source}</p>
          )}
        </Card>
      )}
    </div>
  )
}

// ============================================
// LIQUID INTELLIGENCE CARD
// ============================================
function CategoryIntelligenceCard({ yd, cat, year }) {
  if (!yd) return null

  const growthNum = parseNumeric(yd.growth)
  const channels = yd.channels || {}
  const kpis = yd.tradeKPIs

  // Signal 1: Growth momentum
  let growthColor, growthLabel, growthCopy
  if (growthNum >= 8) {
    growthColor = 'emerald'; growthLabel = 'Strong growth window'
    growthCopy = `${yd.growth} YoY — category outpacing the broader market. Accelerate distribution build and SKU launch timing to capture expanding shelf space.`
  } else if (growthNum >= 4) {
    growthColor = 'blue'; growthLabel = 'Sustainable growth phase'
    growthCopy = `${yd.growth} YoY — healthy mid-single-digit expansion. Focus on account share capture and premium mix shift rather than raw volume.`
  } else if (growthNum >= 1) {
    growthColor = 'amber'; growthLabel = 'Growth normalising'
    growthCopy = `${yd.growth} YoY — category cooling from peak. Shift strategy toward margin optimisation and key-account defence over new-door pursuit.`
  } else {
    growthColor = 'red'; growthLabel = 'Volume contraction'
    growthCopy = `${yd.growth} YoY — category in decline. Defend priority accounts, tighten promotional spend, and accelerate premium mix shift to offset volume loss.`
  }

  // Signal 2: Channel concentration
  const channelEntries = Object.entries(channels)
  const dominantEntry = channelEntries.reduce((max, e) => e[1] > max[1] ? e : max, ['', 0])
  const dominantName = { onTrade: 'On-Trade', offTrade: 'Off-Trade', eCommerce: 'E-Commerce', travelRetail: 'Travel Retail' }[dominantEntry[0]] || dominantEntry[0]
  const dominantPct = dominantEntry[1]
  let chanColor, chanLabel, chanCopy
  if (dominantPct >= 55) {
    chanColor = 'amber'; chanLabel = 'Channel concentration risk'
    chanCopy = `${dominantName} accounts for ${dominantPct}% of volume — single-channel dependency. Diversify activation spend into under-penetrated channels to reduce exposure.`
  } else if (dominantPct >= 45) {
    chanColor = 'blue'; chanLabel = 'Moderate channel weighting'
    chanCopy = `${dominantName} leads at ${dominantPct}% — manageable concentration. Secondary channels (e-commerce, travel retail) offer incremental volume without cannibalisation.`
  } else {
    chanColor = 'emerald'; chanLabel = 'Well-diversified channel mix'
    chanCopy = `No single channel exceeds 45% share — balanced distribution across on-trade, off-trade, and emerging channels. Strong structural resilience to trade disruption.`
  }

  // Signal 3: Gross margin environment (only when tradeKPIs available)
  let marginColor, marginLabel, marginCopy
  if (kpis && kpis.grossMarginPct != null) {
    const m = kpis.grossMarginPct
    if (m >= 60) {
      marginColor = 'emerald'; marginLabel = 'Premium margin environment'
      marginCopy = `${m}% gross margin — industry-leading profitability. Category economics support investment in brand-building and premium activation programmes.`
    } else if (m >= 50) {
      marginColor = 'blue'; marginLabel = 'Solid margin profile'
      marginCopy = `${m}% gross margin — competitive profitability. Standard trade terms and promotional investment are sustainable at current price points.`
    } else if (m >= 40) {
      marginColor = 'amber'; marginLabel = 'Margin pressure zone'
      marginCopy = `${m}% gross margin — below-category average. Review promotional mechanics and consider premiumisation to protect brand economics.`
    } else {
      marginColor = 'red'; marginLabel = 'Margin compression'
      marginCopy = `${m}% gross margin — structurally challenged. Renegotiate trade terms, reduce promotional depth, and exit lowest-margin accounts.`
    }
  }

  const colorMap = {
    emerald: { dot: 'bg-emerald-500', label: 'text-emerald-700', bg: 'bg-emerald-50 border-emerald-200' },
    blue:    { dot: 'bg-blue-500',    label: 'text-blue-700',    bg: 'bg-blue-50 border-blue-200'    },
    amber:   { dot: 'bg-amber-500',   label: 'text-amber-700',   bg: 'bg-amber-50 border-amber-200'  },
    red:     { dot: 'bg-red-500',     label: 'text-red-700',     bg: 'bg-red-50 border-red-200'      },
  }

  const signals = [
    { color: growthColor,  label: growthLabel,  copy: growthCopy  },
    { color: chanColor,    label: chanLabel,    copy: chanCopy    },
    ...(kpis && kpis.grossMarginPct != null ? [{ color: marginColor, label: marginLabel, copy: marginCopy }] : []),
  ]

  return (
    <div className="rounded-xl border border-gold/30 bg-gradient-to-br from-amber-50/60 to-white p-5">
      <div className="flex items-center gap-2 mb-4">
        <Zap size={16} className="text-gold" />
        <span className="text-sm font-bold text-navy">Liquid Intelligence</span>
        <span className="ml-auto text-xs text-gray-400 font-medium">{cat.label} {'·'} {year}</span>
      </div>
      <div className="space-y-3">
        {signals.map((s, i) => {
          const c = colorMap[s.color] || colorMap.blue
          return (
            <div key={i} className={`rounded-lg border p-3.5 ${c.bg}`}>
              <div className="flex items-center gap-2 mb-1">
                <div className={`w-2 h-2 rounded-full shrink-0 ${c.dot}`} />
                <span className={`text-xs font-bold uppercase tracking-wide ${c.label}`}>{s.label}</span>
              </div>
              <p className="text-xs text-gray-700 leading-relaxed pl-4">{s.copy}</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// ============================================
// TIER 2 + 3: Category Detail Panel
// ============================================
function CategoryDetail({ cat, year, onBack }) {
  const [activeTab, setActiveTab] = useState('overview')
  const [showFullReport, setShowFullReport] = useState(false)
  const yd = cat.yearData[year]

  if (!yd) return (
    <Card padding="p-8">
      <div className="text-center text-gray-500">
        <FileText size={32} className="mx-auto mb-3 opacity-50" />
        <p className="text-sm">No data available for {cat.label} in {year}</p>
        <p className="text-xs mt-1">Try selecting a different year</p>
      </div>
    </Card>
  )

  const brandCount = (yd.brands?.highEnd?.length || 0) + (yd.brands?.midTier?.length || 0) + (yd.brands?.value?.length || 0)

  const hasDemographics = !!getCategoryDemographics(cat.key)

  const tabs = [
    { key: 'overview', label: 'Overview' },
    { key: 'markets', label: `Markets (${yd.topMarkets.length})` },
    { key: 'brands', label: `Brands (${brandCount})` },
    { key: 'trends', label: `Trends (${yd.trends.length})` },
    ...(hasDemographics ? [{ key: 'demographics', label: 'Demographics' }] : [])
  ]

  // Build DataTable rows for Tier 3 full data table
  const fullDataTableColumns = [
    { key: 'year', label: 'Year', sortable: true },
    { key: 'marketSize', label: 'Market Size', sortable: false },
    { key: 'growth', label: 'Growth', sortable: false, render: (v) => <GrowthBadge value={v} /> },
    { key: 'volume', label: 'Volume (9L)', sortable: false },
    { key: 'onTrade', label: 'On-Trade', align: 'right', sortable: false, render: v => `${v}%` },
    { key: 'offTrade', label: 'Off-Trade', align: 'right', sortable: false, render: v => `${v}%` },
    { key: 'eCommerce', label: 'E-Comm', align: 'right', sortable: false, render: v => `${v}%` },
    { key: 'travelRetail', label: 'Travel Retail', align: 'right', sortable: false, render: v => `${v}%` },
  ]

  const fullDataTableRows = YEARS.map(y => {
    const d = cat.yearData[y]
    if (!d) return { year: y, marketSize: '—', growth: '—', volume: '—', onTrade: 0, offTrade: 0, eCommerce: 0, travelRetail: 0 }
    return {
      year: y,
      marketSize: d.marketSize,
      growth: d.growth,
      volume: d.volumeCases,
      onTrade: d.channels?.onTrade ?? 0,
      offTrade: d.channels?.offTrade ?? 0,
      eCommerce: d.channels?.eCommerce ?? 0,
      travelRetail: d.channels?.travelRetail ?? 0,
    }
  }).reverse()

  return (
    <div className="space-y-5">
      {/* Category Header */}
      <div className="flex items-start gap-4">
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-lg font-bold shrink-0 ${cat.iconBg} ${cat.iconColor}`}>
          {cat.icon}
        </div>
        <div className="flex-1 min-w-0">
          <h2 className="font-display text-section text-navy">{cat.label}</h2>
          <div className="flex flex-wrap items-center gap-3 mt-1">
            <span className="text-lg font-semibold text-gray-700 tabular-nums">{yd.marketSize}</span>
            <MethodologyTooltip text="Market size in USD at retail selling price. CAGR calculated on constant currency basis." />
            <GrowthBadge value={yd.growth} showYoY />
            <span className="text-sm text-gray-500 tabular-nums">{yd.volumeCases} 9L cases</span>
          </div>
          <p className="mt-2 text-sm text-gray-500 leading-relaxed max-w-2xl">{cat.trajectory}</p>
        </div>
      </div>

      {/* Tab Navigation */}
      <TabGroup
        tabs={tabs}
        active={activeTab}
        onChange={setActiveTab}
        size="md"
      />

      {/* TAB: Overview (Tier 2 summary) */}
      {activeTab === 'overview' && (
        <div className="space-y-5">
          {/* 4 KPI cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <MetricCard
              label="Market Size"
              value={yd.marketSize}
              subtitle={`${year} global value`}
              icon={BarChart3}
            />
            <MetricCard
              label="YoY Growth"
              value={yd.growth}
              direction={yd.growthDir}
              change={`vs. ${year - 1}`}
              subtitle="Year-over-year"
            />
            <MetricCard
              label="Volume"
              value={yd.volumeCases}
              subtitle="9L cases"
              icon={Layers}
            />
            <MetricCard
              label="Market Leader"
              value={yd.report?.topPerformer || '—'}
              subtitle={`${year} top performer`}
              icon={Award}
            />
          </div>

          {/* Charts row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <MarketTrendChart catKey={cat.key} />
            <ChannelChart catKey={cat.key} />
          </div>

          {/* Quick glance: Top Markets + Channel Split */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Card>
              <SectionLabel>Top Growth Markets</SectionLabel>
              <div className="space-y-2">
                {yd.topMarkets.slice(0, 3).map((m, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <EntityLink type="market" id={m.name.toLowerCase().replace(/\s+/g, '-')} label={m.name}
                      className="text-sm font-medium text-gray-800 no-underline hover:text-navy" />
                    <GrowthBadge value={m.growth} />
                  </div>
                ))}
              </div>
              <button onClick={() => setActiveTab('markets')}
                className="mt-3 text-xs font-semibold text-gold hover:underline">
                View all {yd.topMarkets.length} markets {'→'}
              </button>
            </Card>
            <Card>
              <SectionLabel>Channel Distribution ({year})</SectionLabel>
              <ChannelSplit channels={yd.channels} />
            </Card>
          </div>

          {/* Trade KPIs */}
          {yd.tradeKPIs && (
            <Card>
              <div className="flex items-center gap-2 mb-3">
                <SectionLabel>Trade KPIs ({year})</SectionLabel>
                {yd.tradeKPIs.isEstimated && (
                  <span className="px-1.5 py-0.5 bg-orange-100 text-orange-700 text-micro font-bold rounded uppercase tracking-wider">Est.</span>
                )}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3">
                <div className="bg-gray-50 rounded-lg p-2.5">
                  <div className="text-xs text-gray-500">ACV Distribution</div>
                  <div className="text-sm font-bold text-navy">{yd.tradeKPIs.acvDistribution}%</div>
                </div>
                <div className="bg-gray-50 rounded-lg p-2.5">
                  <div className="text-xs text-gray-500">CE Depletions</div>
                  <div className="text-sm font-bold text-navy">{yd.tradeKPIs.ceDepletions >= 1e9 ? (yd.tradeKPIs.ceDepletions / 1e9).toFixed(2) + 'B' : (yd.tradeKPIs.ceDepletions / 1e6).toFixed(1) + 'M'}</div>
                </div>
                <div className="bg-gray-50 rounded-lg p-2.5">
                  <div className="text-xs text-gray-500">Avg Billback</div>
                  <div className="text-sm font-bold text-navy">{yd.tradeKPIs.billback}%</div>
                </div>
                <div className="bg-gray-50 rounded-lg p-2.5">
                  <div className="text-xs text-gray-500">Gross Margin</div>
                  <div className="text-sm font-bold text-navy">{yd.tradeKPIs.grossMarginPct}%</div>
                </div>
                <div className="bg-gray-50 rounded-lg p-2.5">
                  <div className="text-xs text-gray-500">CAC</div>
                  <div className="text-sm font-bold text-navy">${yd.tradeKPIs.cac}</div>
                </div>
                <div className="bg-gray-50 rounded-lg p-2.5">
                  <div className="text-xs text-gray-500">Inventory Turnover</div>
                  <div className="text-sm font-bold text-navy">{yd.tradeKPIs.itr}x</div>
                </div>
              </div>
              {yd.tradeKPIs.isEstimated && (
                <p className="text-xs text-gray-500 mt-2 italic">{yd.tradeKPIs.methodology}</p>
              )}
            </Card>
          )}

          {/* ══════ LIQUID INTELLIGENCE ══════ */}
          <CategoryIntelligenceCard yd={yd} cat={cat} year={year} />

          {/* View Full Report CTA (Tier 3 gate) */}
          <button
            onClick={() => setShowFullReport(!showFullReport)}
            className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-navy text-white rounded-xl text-sm font-semibold hover:bg-navy-light transition-colors"
          >
            <FileText size={16} />
            {showFullReport ? 'Hide Full Analysis' : `View Full ${year} Analysis Report`}
          </button>

          {/* Tier 3: Full Report (hidden until CTA clicked) */}
          {showFullReport && (
            <div className="space-y-5 animate-fadeIn">
              <Card padding="p-6">
                <SectionHeader size="md" subtitle={`In-depth market analysis for ${cat.label}`}>
                  {year} Annual Report
                </SectionHeader>
                <YearlyReport report={yd.report} year={year} />
              </Card>

              {/* Full Data Table */}
              <SectionHeader size="sm">Historical Data (2021{'–'}2025)</SectionHeader>
              <DataTable
                columns={fullDataTableColumns}
                data={fullDataTableRows}
                compact
                exportable
              />

              {/* All sources */}
              <Card padding="p-4">
                <SectionLabel>Data Sources</SectionLabel>
                <div className="flex flex-wrap gap-x-4 gap-y-1">
                  {yd.topMarkets.flatMap(m => (m.sources || []).map(s => ({ label: s.name, url: s.url }))).filter((s, i, arr) =>
                    arr.findIndex(x => x.label === s.label) === i
                  ).map((s, i) => (
                    <SourceLink key={i} label={s.label} url={s.url} />
                  ))}
                </div>
              </Card>
            </div>
          )}
        </div>
      )}

      {/* TAB: Markets (Tier 2 drill-downs) */}
      {activeTab === 'markets' && (
        <div className="space-y-2">
          <p className="text-xs text-gray-500 mb-3">Click a market to see brand performance, regional breakdown, and data sources.</p>
          {yd.topMarkets.map((m, i) => <MarketDrillDown key={i} market={m} />)}
        </div>
      )}

      {/* TAB: Brands (Tier 2 tiered view) */}
      {activeTab === 'brands' && (
        <TieredBrands brands={yd.brands} categoryKey={cat.key} />
      )}

      {/* TAB: Trends (Tier 2 sourced trends) */}
      {activeTab === 'trends' && (
        <TrendsList trends={yd.trends} />
      )}

      {/* TAB: Demographics (from 5-category Gemini Deep Research pass, April 2026) */}
      {activeTab === 'demographics' && (
        <DemographicsPanel categoryKey={cat.key} />
      )}
    </div>
  )
}

// ============================================
// MAIN: CategoryIntelligence Page
// ============================================
export default function CategoryIntelligence() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [activeCat, setActiveCat] = useState(null)
  const [selectedYear, setSelectedYear] = useState(2025)
  const [mobileDetail, setMobileDetail] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 300)
    return () => clearTimeout(timer)
  }, [])

  // Read URL params on mount
  useEffect(() => {
    const catParam = searchParams.get('category')
    const yearParam = searchParams.get('year')
    if (catParam && CATEGORIES.find(c => c.key === catParam)) {
      setActiveCat(catParam)
    }
    if (yearParam) {
      const y = parseInt(yearParam, 10)
      if (YEARS.includes(y)) setSelectedYear(y)
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // Navigate directly to full category detail (mobile and desktop)
  const handleSelectCategory = useCallback((key) => {
    setActiveCat(key)
    const next = new URLSearchParams(searchParams)
    next.set('category', key)
    next.set('year', String(selectedYear))
    setSearchParams(next, { replace: true })
    // Scroll to top on mobile for clean entry into detail view
    if (window.innerWidth < 1024) {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }, [searchParams, setSearchParams, selectedYear])

  const handleBack = useCallback(() => {
    setActiveCat(null)
    const next = new URLSearchParams()
    next.set('year', String(selectedYear))
    setSearchParams(next, { replace: true })
  }, [setSearchParams, selectedYear])

  const handleYearChange = useCallback((y) => {
    setSelectedYear(y)
    const next = new URLSearchParams(searchParams)
    next.set('year', String(y))
    setSearchParams(next, { replace: true })
  }, [searchParams, setSearchParams])

  const active = activeCat ? CATEGORIES.find(c => c.key === activeCat) : null
  const agg = useAggregateMetrics(selectedYear)
  const sorted = useSortedCategories(selectedYear)

  if (loading) {
    return (
      <div className="min-h-screen bg-surface p-3 sm:p-4 lg:p-6 max-w-7xl mx-auto space-y-6">
        <PageHeader title="Category Intelligence" subtitle="Loading categories..." />
        <BentoGrid>
          <BentoGrid.Hero><SkeletonCard className="h-40" /></BentoGrid.Hero>
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
        </BentoGrid>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
          {Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)}
        </div>
      </div>
    )
  }

  // ---- TIER 2/3: Detail view for selected category ----
  if (active) {
    return (
      <div className="min-h-screen bg-surface p-3 sm:p-4 lg:p-6 max-w-7xl mx-auto">
        {/* Back + Header */}
        <div className="mb-4 lg:mb-6">
          <button onClick={handleBack}
            className="flex items-center gap-2 text-sm text-gray-500 hover:text-navy transition-colors mb-3 group min-h-[44px] touch-manipulation">
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            All Categories
          </button>
          <PageHeader
            title="Category Intelligence"
            subtitle={`${active.label} · ${selectedYear}`}
            action={<YearSelector activeYear={selectedYear} onChange={handleYearChange} />}
          />
        </div>

        {/* Quick category nav strip */}
        <div className="relative">
        <div className="flex gap-1.5 overflow-x-auto pb-3 mb-4 scrollbar-hide whitespace-nowrap -mx-1 px-1">
          {CATEGORIES.map(cat => (
            <button
              key={cat.key}
              onClick={() => handleSelectCategory(cat.key)}
              className={`flex items-center gap-1.5 px-3 py-2 min-h-[44px] rounded-lg text-xs font-medium whitespace-nowrap shrink-0 transition-colors touch-manipulation ${
                activeCat === cat.key
                  ? 'bg-navy text-white'
                  : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
              }`}
            >
              <span className={`w-5 h-5 rounded flex items-center justify-center text-micro font-bold ${cat.iconBg} ${cat.iconColor}`}>{cat.icon}</span>
              {cat.label}
            </button>
          ))}
        </div>
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white to-transparent sm:hidden" />
        </div>

        {/* Category Detail */}
        <ErrorBoundary message="Category detail failed to load.">
          <CategoryDetail cat={active} year={selectedYear} onBack={handleBack} />
        </ErrorBoundary>
      </div>
    )
  }

  // ---- TIER 1: Gallery / Bento Grid View ----
  return (
    <div className="min-h-screen bg-surface p-3 sm:p-4 lg:p-6 max-w-7xl mx-auto">
      {/* Page Header */}
      <PageHeader
        title="Category Intelligence"
        subtitle={`${agg.categoryCount} categories · 2021–2025 · Deep market analysis for brand managers · Data as of April 2026`}
        action={<YearSelector activeYear={selectedYear} onChange={handleYearChange} />}
      />
      <SubPageNav group="intelligence" />
      <DataFreshness date="April 2026" source="IWSR, Euromonitor, DISCUS, SWA, TTB" />

      {/* Tier 1: Aggregate Executive Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        <MetricCard
          label="Total Market"
          value={agg.totalSize}
          subtitle={`${agg.categoryCount} categories incl. beer, wine & cider`}
          icon={BarChart3}
          sparkData={agg.sparkData}
          direction="up"
          onClick={() => handleYearChange(selectedYear)}
        />
        <MetricCard
          label="Fastest Growing"
          value={agg.fastestGrowth.cat?.label || '—'}
          change={agg.fastestGrowth.label}
          direction="up"
          subtitle={`${selectedYear} YoY growth leader`}
          onClick={() => agg.fastestGrowth.cat && handleSelectCategory(agg.fastestGrowth.cat.key)}
        />
        <MetricCard
          label="Largest Category"
          value={agg.largestCat.cat?.label || '—'}
          subtitle={`$${agg.largestCat.size.toFixed(0)}B market value`}
          icon={Award}
          onClick={() => agg.largestCat.cat && handleSelectCategory(agg.largestCat.cat.key)}
        />
        <MetricCard
          label="Total Volume"
          value={agg.totalVolume}
          subtitle="9L cases across all categories"
          icon={Layers}
          onClick={() => handleYearChange(selectedYear)}
        />
      </div>

      {/* Tier 1: Category Bento Grid — F-pattern (largest first) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
        {sorted.map((cat, i) => (
          <CategoryCard
            key={cat.key}
            cat={cat}
            year={selectedYear}
            isHero={i === 0}
            onClick={() => handleSelectCategory(cat.key)}
          />
        ))}
      </div>

      {/* Footer source note */}
      <div className="mt-8 text-center">
        <p className="text-xs text-gray-500">Data sourced from IWSR, Euromonitor, DISCUS, OIV, and trade publications {'·'} Updated quarterly</p>
      </div>

      {/* Mobile BottomSheet for category detail */}
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
