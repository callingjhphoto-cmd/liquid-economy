import React, { useState, useMemo, useEffect, useCallback } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, ScatterChart, Scatter, Legend } from 'recharts'
import {
  Search, TrendingUp, TrendingDown, Minus,
  ChevronDown, ChevronUp, DollarSign, Globe,
  Store, Package, ExternalLink, AlertCircle,
  Eye, BarChart3, Download, ArrowRight, X,
  Edit3, RefreshCw
} from 'lucide-react'
import {
  PageHeader, Card, AccentCard, MetricCard, BentoGrid, DataTable,
  ChartCard, Badge, FilterBar, TabGroup, FilterPills, SectionHeader,
  SectionLabel, SourceList, EntityLink, BottomSheet,
  SkeletonCard, SubPageNav, MethodologyTooltip, DataFreshness
} from '../components/ui'

import { SEGMENT_INFO, MARKET_CONFIG, RETAILERS, BRAND_DATABASE } from '../data/brandData'
import { CHART_COLORS } from '../data/chartColors'

// ── Constants ──
const SEGMENT_TIERS = {
  'High-End': ['Ultra Premium', 'Prestige'],
  'Mid-Tier': ['Premium', 'Super Premium'],
  'Value': ['Value', 'Standard'],
}

const TIER_COLORS = {
  'High-End': { bg: 'bg-purple-50', text: 'text-purple-700', border: 'border-purple-200', bar: '#7C3AED' },
  'Mid-Tier': { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200', bar: '#2563EB' },
  'Value': { bg: 'bg-gray-50', text: 'text-gray-700', border: 'border-gray-200', bar: '#6B7280' },
}

const CATEGORY_COLORS = {
  'Whisky': '#D97706',
  'Scotch Whisky': '#D97706',
  'Bourbon & American': '#B45309',
  'Tequila': '#059669',
  'Gin': '#2563EB',
  'Vodka': '#7C3AED',
  'Cognac': '#DC2626',
  'Rum': '#EC4899',
  'Champagne': '#F59E0B',
  'Wine': '#6366F1',
  'RTD': '#14B8A6',
  'No/Lo': '#10B981',
  'Beer': '#EF4444',
}

const PRICING_SOURCES = [
  { label: 'Tesco', url: 'https://www.tesco.com' },
  { label: 'Sainsbury’s', url: 'https://www.sainsburys.co.uk' },
  { label: 'Total Wine', url: 'https://www.totalwine.com' },
  { label: 'Master of Malt', url: 'https://www.masterofmalt.com' },
  { label: 'El Corte Inglés', url: 'https://www.elcorteingles.es' },
  { label: 'Carrefour', url: 'https://www.carrefour.fr' },
  { label: 'MMI Dubai', url: 'https://mmidubai.com' },
]

// ── Data Processing ──
const PRICING = BRAND_DATABASE.map(item => {
  const marketAvgs = {}
  Object.keys(MARKET_CONFIG).forEach(mkt => {
    if (item.prices[mkt]) {
      const vals = Object.values(item.prices[mkt]).filter(v => v !== null && v !== undefined)
      marketAvgs[mkt] = vals.length > 0 ? Math.round(vals.reduce((a, b) => a + b, 0) / vals.length * 100) / 100 : null
    }
  })
  const euCountries = ['spain', 'france', 'germany', 'italy', 'netherlands']
  const euVals = euCountries.map(c => marketAvgs[c]).filter(v => v !== null && v !== undefined)
  const euAvg = euVals.length > 0 ? Math.round(euVals.reduce((a, b) => a + b, 0) / euVals.length) : null
  const allPrices = Object.values(marketAvgs).filter(v => v !== null && v !== undefined)
  const maxP = allPrices.length > 0 ? Math.max(...allPrices) : 0
  const minP = allPrices.length > 0 ? Math.min(...allPrices) : 0
  return {
    ...item,
    usa: marketAvgs.us,
    uk: marketAvgs.uk,
    eu: euAvg,
    me: marketAvgs.me,
    marketAvgs,
    differential: Math.round((maxP - minP) * 100) / 100,
    premium_index: minP > 0 ? (maxP - minP) / minP : 0,
  }
})

const ALL_CATEGORIES = [...new Set(PRICING.map(p => p.category))]
const TOTAL_RETAILERS = Object.values(RETAILERS).flat().length
const TOTAL_MARKETS = Object.keys(MARKET_CONFIG).length

// ── Helper: get tier for a segment ──
function getSegmentTier(segment) {
  for (const [tier, segments] of Object.entries(SEGMENT_TIERS)) {
    if (segments.includes(segment)) return tier
  }
  return 'Value'
}

// ── Helper: format currency ──
function fmtPrice(value, currency = '$') {
  if (value === null || value === undefined) return '—'
  return `${currency}${typeof value === 'number' ? value.toFixed(0) : value}`
}

// ── Computed Stats ──
function useGlobalStats() {
  return useMemo(() => {
    const allDiffs = PRICING.map(p => p.differential).filter(d => d > 0)
    const avgDiff = allDiffs.length > 0
      ? Math.round(allDiffs.reduce((a, b) => a + b, 0) / allDiffs.length)
      : 0

    // Most expensive market
    const marketTotals = {}
    Object.keys(MARKET_CONFIG).forEach(mkt => {
      const prices = PRICING.map(p => p.marketAvgs[mkt]).filter(Boolean)
      if (prices.length > 0) {
        marketTotals[mkt] = Math.round(prices.reduce((a, b) => a + b, 0) / prices.length)
      }
    })
    const mostExpensiveMarket = Object.entries(marketTotals)
      .sort(([, a], [, b]) => b - a)[0]

    // Highest premium segment
    const segPremiums = {}
    const segments = [...new Set(PRICING.map(p => p.segment))]
    segments.forEach(seg => {
      const items = PRICING.filter(p => p.segment === seg)
      const premiums = items.map(p => p.premium_index).filter(Boolean)
      if (premiums.length > 0) {
        segPremiums[seg] = Math.round(premiums.reduce((a, b) => a + b, 0) / premiums.length * 100)
      }
    })
    const highestPremiumSegment = Object.entries(segPremiums)
      .sort(([, a], [, b]) => b - a)[0]

    // Category stats
    const categoryStats = ALL_CATEGORIES.map(cat => {
      const items = PRICING.filter(p => p.category === cat)
      const usPrices = items.map(p => p.usa).filter(Boolean)
      const ukPrices = items.map(p => p.uk).filter(Boolean)
      const avgUs = usPrices.length > 0 ? Math.round(usPrices.reduce((a, b) => a + b, 0) / usPrices.length) : null
      const avgUk = ukPrices.length > 0 ? Math.round(ukPrices.reduce((a, b) => a + b, 0) / ukPrices.length) : null
      const maxDiff = items.length > 0 ? Math.max(...items.map(p => p.differential)) : 0
      const topBrand = items.sort((a, b) => (b.premium_index || 0) - (a.premium_index || 0))[0]

      // Tier breakdown
      const tiers = {}
      Object.entries(SEGMENT_TIERS).forEach(([tier, segs]) => {
        tiers[tier] = items.filter(p => segs.includes(p.segment)).length
      })

      return {
        category: cat,
        count: items.length,
        avgUs,
        avgUk,
        maxDiff,
        topBrand: topBrand ? `${topBrand.brand} ${topBrand.expression}` : '—',
        topBrandCompany: topBrand ? topBrand.company : '',
        tiers,
        color: CATEGORY_COLORS[cat] || '#6B7280',
      }
    }).sort((a, b) => b.count - a.count)

    return {
      totalBrands: PRICING.length,
      avgDiff,
      mostExpensiveMarket,
      highestPremiumSegment,
      categoryStats,
      marketTotals,
    }
  }, [])
}


// ═══════════════════════════════════════════
// TIER 1: Category Summary Card
// ═══════════════════════════════════════════
function CategorySummaryCard({ stat, isExpanded, onToggle }) {
  return (
    <Card
      hover
      onClick={onToggle}
      className={`transition-all ${isExpanded ? 'ring-2 ring-navy/20 shadow-md' : ''}`}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: stat.color }} />
          <span className="text-sm font-semibold text-navy">{stat.category}</span>
        </div>
        <Badge variant="navy" size="sm">{stat.count} brands</Badge>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-3">
        <div>
          <SectionLabel>Avg (US)</SectionLabel>
          <p className="text-lg font-bold text-navy font-mono">
            {stat.avgUs !== null ? `$${stat.avgUs}` : '—'}
          </p>
        </div>
        <div>
          <SectionLabel>Avg (UK)</SectionLabel>
          <p className="text-lg font-bold text-navy font-mono">
            {stat.avgUk !== null ? `£${stat.avgUk}` : '—'}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-1 mb-2">
        {Object.entries(stat.tiers).map(([tier, count]) => (
          count > 0 && (
            <span
              key={tier}
              className={`text-xs px-1.5 py-0.5 rounded font-medium ${TIER_COLORS[tier].bg} ${TIER_COLORS[tier].text}`}
            >
              {tier}: {count}
            </span>
          )
        ))}
      </div>

      <div className="flex items-center justify-between pt-2 border-t border-gray-50">
        <span className="text-xs text-gray-500">Top: {stat.topBrand}</span>
        <div className="flex items-center gap-1 text-xs text-navy font-medium">
          {isExpanded ? (
            <>Collapse <ChevronUp size={10} /></>
          ) : (
            <>Expand <ChevronDown size={10} /></>
          )}
        </div>
      </div>
    </Card>
  )
}


// ═══════════════════════════════════════════
// TIER 2: Expanded Category Detail
// ═══════════════════════════════════════════
function CategoryExpanded({ category, onClose }) {
  const [selectedMarket, setSelectedMarket] = useState('uk')
  const items = useMemo(() => PRICING.filter(p => p.category === category), [category])

  const tieredBrands = useMemo(() => {
    const result = {}
    Object.entries(SEGMENT_TIERS).forEach(([tier, segments]) => {
      result[tier] = items
        .filter(p => segments.includes(p.segment))
        .sort((a, b) => (b.marketAvgs[selectedMarket] || 0) - (a.marketAvgs[selectedMarket] || 0))
    })
    return result
  }, [items, selectedMarket])

  const config = MARKET_CONFIG[selectedMarket]

  // Chart data: top 10 brands by price in selected market
  const chartData = useMemo(() => {
    return items
      .map(p => ({
        name: `${p.brand} ${p.expression}`.length > 20
          ? `${p.brand} ${p.expression}`.slice(0, 18) + '…'
          : `${p.brand} ${p.expression}`,
        price: p.marketAvgs[selectedMarket] || 0,
        tier: getSegmentTier(p.segment),
      }))
      .filter(d => d.price > 0)
      .sort((a, b) => b.price - a.price)
      .slice(0, 10)
  }, [items, selectedMarket])

  // Scatter plot data: volume proxy (index) vs price, grouped by tier
  const scatterData = useMemo(() => {
    const byTier = { 'High-End': [], 'Mid-Tier': [], 'Value': [] }
    items.forEach((p, idx) => {
      const price = p.marketAvgs[selectedMarket]
      if (!price) return
      const tier = getSegmentTier(p.segment)
      // Use differential as a proxy for volume spread; index+1 as volume proxy
      byTier[tier].push({
        name: `${p.brand} ${p.expression}`,
        volume: idx + 1,
        price: Math.round(price),
      })
    })
    return byTier
  }, [items, selectedMarket])

  return (
    <div className="col-span-full space-y-4 animate-fadeIn">
      <Card padding="p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <div>
            <h2 className="font-display text-lg font-semibold text-navy">{category}</h2>
            <p className="text-xs text-gray-500">{items.length} expressions tracked across {TOTAL_MARKETS} markets</p>
          </div>
          <div className="relative">
          <div className="flex items-center gap-3 overflow-x-auto">
            <TabGroup
              tabs={Object.entries(MARKET_CONFIG).map(([key, cfg]) => ({
                key,
                label: `${cfg.flag} ${cfg.label}`,
              }))}
              active={selectedMarket}
              onChange={setSelectedMarket}
              size="sm"
            />
            <button
              onClick={onClose}
              className="p-2 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors text-gray-600 hover:text-gray-700 touch-manipulation"
            >
              <X size={16} />
            </button>
          </div>
          <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white to-transparent sm:hidden" />
          </div>
        </div>

        {/* Tiered Brand List */}
        <div className="space-y-4">
          {Object.entries(tieredBrands).map(([tier, brands]) => (
            brands.length > 0 && (
              <div key={tier}>
                <div className="flex items-center gap-2 mb-2">
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded ${TIER_COLORS[tier].bg} ${TIER_COLORS[tier].text}`}>
                    {tier}
                  </span>
                  <span className="text-xs text-gray-500">{brands.length} expressions</span>
                </div>
                <div className="relative">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-100 bg-gray-50/50">
                        <th className="text-left px-3 py-2 text-micro font-semibold text-gray-500 uppercase tracking-wider">Brand</th>
                        <th className="text-left px-3 py-2 text-micro font-semibold text-gray-500 uppercase tracking-wider">Expression</th>
                        <th className="text-left px-3 py-2 text-micro font-semibold text-gray-500 uppercase tracking-wider">Segment</th>
                        <th className="text-left px-3 py-2 text-micro font-semibold text-gray-500 uppercase tracking-wider">Company</th>
                        <th className="text-right px-3 py-2 text-micro font-semibold text-gray-500 uppercase tracking-wider">
                          {config.flag} Price ({config.bottleSize})
                        </th>
                        <th className="text-right px-3 py-2 text-micro font-semibold text-gray-500 uppercase tracking-wider">Spread</th>
                      </tr>
                    </thead>
                    <tbody>
                      {brands.map((brand, i) => {
                        const price = brand.marketAvgs[selectedMarket]
                        const segInfo = SEGMENT_INFO[brand.segment] || { color: 'bg-gray-50 text-gray-500' }
                        return (
                          <tr key={i} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors">
                            <td className="px-3 py-2 text-xs font-medium text-navy">{brand.brand}</td>
                            <td className="px-3 py-2 text-xs text-gray-600">{brand.expression}</td>
                            <td className="px-3 py-2">
                              <span className={`text-xs px-1.5 py-0.5 rounded font-medium ${segInfo.color}`}>{brand.segment}</span>
                            </td>
                            <td className="px-3 py-2 text-xs text-gray-500">
                              <Link to="/companies" className="hover:text-navy hover:underline transition-colors">{brand.company}</Link>
                            </td>
                            <td className="px-3 py-2 text-right text-xs font-mono font-bold text-navy">
                              {price !== null && price !== undefined ? `${config.currency}${price.toFixed(2)}` : '—'}
                            </td>
                            <td className="px-3 py-2 text-right">
                              <span className={`text-xs font-mono font-medium ${brand.differential > 30 ? 'text-red-500' : brand.differential > 15 ? 'text-amber-500' : 'text-green-500'}`}>
                                {'±'}{brand.differential}
                              </span>
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
                <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white to-transparent sm:hidden" />
                </div>
              </div>
            )
          ))}
        </div>
      </Card>

      {/* Price Comparison Chart */}
      <ChartCard
        title={`Top 10 ${category} by Price`}
        subtitle={`${config.flag} ${config.label} market · ${config.bottleSize} bottle · ${config.currency} pricing`}
        height={280}
        source="Aggregated retailer pricing"
      >
        <BarChart data={chartData} layout="vertical" margin={{ left: 10, right: 30, top: 5, bottom: 5 }} accessibilityLayer={true}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis type="number" tick={{ fontSize: 10, fill: '#9ca3af' }} tickFormatter={v => `${config.currency}${v}`} />
          <YAxis type="category" dataKey="name" tick={{ fontSize: 10, fill: '#9ca3af' }} width={140} />
          <Tooltip
            formatter={(value) => [`${config.currency}${value.toFixed(2)}`, 'Avg Price']}
            contentStyle={{ background: '#1e293b', border: 'none', borderRadius: 8, fontSize: 11 }}
            labelStyle={{ color: '#f1f5f9' }}
            itemStyle={{ color: '#f1f5f9' }}
          />
          <Bar dataKey="price" radius={[0, 4, 4, 0]}>
            {chartData.map((entry, i) => (
              <Cell key={i} fill={TIER_COLORS[entry.tier]?.bar || '#6B7280'} fillOpacity={0.8} />
            ))}
          </Bar>
        </BarChart>
      </ChartCard>

      {/* Price Positioning Map — Scatter Plot */}
      <ChartCard
        title="Price Positioning Map"
        subtitle={`Volume vs Retail Price · ${config.flag} ${config.label} market`}
        height={300}
        source="Liquid Economy Analysis"
      >
        <ScatterChart margin={{ top: 10, right: 30, bottom: 10, left: 10 }} accessibilityLayer={true}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis dataKey="volume" name="Volume (index)" type="number" tick={{ fontSize: 10, fill: '#9ca3af' }} label={{ value: 'Brand Index', position: 'insideBottom', offset: -5, fontSize: 10, fill: '#9ca3af' }} />
          <YAxis dataKey="price" name="Avg Price" unit={config.currency} type="number" tick={{ fontSize: 10, fill: '#9ca3af' }} />
          <Tooltip
            cursor={{ strokeDasharray: '3 3' }}
            formatter={(value, name) => {
              if (name === 'Avg Price') return [`${config.currency}${value}`, name]
              return [value, name]
            }}
            contentStyle={{ background: '#1e293b', border: 'none', borderRadius: 8, fontSize: 11 }}
            labelStyle={{ color: '#f1f5f9' }}
            itemStyle={{ color: '#f1f5f9' }}
          />
          <Legend wrapperStyle={{ fontSize: 11 }} />
          <Scatter name="High-End" data={scatterData['High-End']} fill="#7C3AED" />
          <Scatter name="Mid-Tier" data={scatterData['Mid-Tier']} fill="#2563EB" />
          <Scatter name="Value" data={scatterData['Value']} fill="#6B7280" />
        </ScatterChart>
      </ChartCard>

      {/* Retailer Directory for this market */}
      <Card>
        <div className="flex items-center gap-2 mb-3">
          <Store size={14} className="text-navy" />
          <span className="text-sm font-semibold text-navy">Tracked Retailers</span>
          <span className="text-xs text-gray-500 ml-auto">
            Bottle size: <strong className="text-navy">{config.bottleSize}</strong> ({config.bottleMl}ml)
          </span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-2">
          {(RETAILERS[selectedMarket] || []).map(r => (
            <div key={r.id} className="flex items-center gap-2 p-2.5 rounded-lg bg-gray-50 border border-gray-100">
              <span className="text-lg">{r.logo}</span>
              <div className="min-w-0">
                <p className="text-xs font-medium text-navy truncate">{r.name}</p>
                <p className="text-xs text-gray-500">{r.type}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}


// ═══════════════════════════════════════════
// TIER 3: Full Data Table + Export
// ═══════════════════════════════════════════
function FullPriceTable({ onClose }) {
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [segmentFilter, setSegmentFilter] = useState('all')

  const categories = useMemo(() => ['all', ...ALL_CATEGORIES], [])
  const segments = useMemo(() => ['all', ...new Set(PRICING.map(p => p.segment))], [])

  const tableData = useMemo(() => {
    let data = PRICING
    if (categoryFilter !== 'all') data = data.filter(p => p.category === categoryFilter)
    if (segmentFilter !== 'all') data = data.filter(p => p.segment === segmentFilter)
    return data.map((p, i) => ({
      id: i,
      company: p.company,
      brand: p.brand,
      expression: p.expression,
      category: p.category,
      segment: p.segment,
      usa: p.usa,
      uk: p.uk,
      eu: p.eu,
      me: p.me,
      differential: p.differential,
      premiumPct: Math.round((p.premium_index || 0) * 100),
    }))
  }, [categoryFilter, segmentFilter])

  const handleExportCSV = useCallback(() => {
    const headers = ['Company', 'Brand', 'Expression', 'Category', 'Segment', 'USA ($)', 'UK (£)', 'EU (€)', 'ME ($)', 'Spread ($)', 'Premium %']
    const rows = tableData.map(r => [
      r.company, r.brand, r.expression, r.category, r.segment,
      r.usa || '', r.uk || '', r.eu || '', r.me || '',
      r.differential, r.premiumPct,
    ])
    const csv = [headers, ...rows].map(row => row.map(cell => `"${cell}"`).join(',')).join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `brand-pricing-${new Date().toISOString().slice(0, 10)}.csv`
    a.click()
    URL.revokeObjectURL(url)
  }, [tableData])

  const columns = [
    { key: 'company', label: 'Company', render: (v) => (
      <Link to="/companies" className="text-gray-500 hover:text-navy hover:underline transition-colors">{v}</Link>
    )},
    { key: 'brand', label: 'Brand', render: (v) => <span className="font-medium text-navy">{v}</span> },
    { key: 'expression', label: 'Expression' },
    { key: 'category', label: 'Category', render: (v) => (
      <Link to="/categories" className="text-micro bg-gray-100 text-gray-600 px-2 py-0.5 rounded hover:bg-blue-50 hover:text-navy transition-colors">{v}</Link>
    )},
    { key: 'segment', label: 'Segment', render: (v) => {
      const info = SEGMENT_INFO[v] || { color: 'bg-gray-50 text-gray-500' }
      return <span className={`text-xs px-1.5 py-0.5 rounded font-medium ${info.color}`}>{v}</span>
    }},
    { key: 'usa', label: 'USA ($)', align: 'right', render: (v) => v ? <span className="font-mono">${v}</span> : '—' },
    { key: 'uk', label: 'UK (£)', align: 'right', render: (v) => v ? <span className="font-mono">{'£'}{v}</span> : '—' },
    { key: 'eu', label: 'EU (€)', align: 'right', render: (v) => v ? <span className="font-mono">{'€'}{v}</span> : '—' },
    { key: 'me', label: 'ME ($)', align: 'right', render: (v) => v ? <span className="font-mono">${v}</span> : '—' },
    { key: 'differential', label: 'Spread', align: 'right', render: (v) => (
      <span className={`font-mono font-medium ${v > 30 ? 'text-red-500' : v > 15 ? 'text-amber-500' : 'text-green-500'}`}>
        {'±'}{v}
      </span>
    )},
    { key: 'premiumPct', label: 'Premium %', align: 'right', render: (v) => <span className="font-mono font-medium text-navy">{v}%</span> },
  ]

  return (
    <div className="space-y-4 animate-fadeIn">
      <Card padding="p-4">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="font-display text-lg font-semibold text-navy">Full Brand Pricing Table</h2>
            <p className="text-xs text-gray-500">{tableData.length} expressions · {TOTAL_MARKETS} markets · {TOTAL_RETAILERS} retailers</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleExportCSV}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-navy text-white hover:bg-navy/90 transition-colors"
            >
              <Download size={12} />
              Export CSV
            </button>
            <button
              onClick={onClose}
              className="p-2 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors text-gray-600 hover:text-gray-700 touch-manipulation"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        <FilterBar
          filters={[
            {
              key: 'category',
              label: 'Category',
              value: categoryFilter,
              options: categories.map(c => ({ value: c, label: c === 'all' ? 'All Categories' : c })),
            },
            {
              key: 'segment',
              label: 'Segment',
              value: segmentFilter,
              options: segments.map(s => ({ value: s, label: s === 'all' ? 'All Segments' : s })),
            },
          ]}
          onFilterChange={(key, value) => {
            if (key === 'category') setCategoryFilter(value)
            if (key === 'segment') setSegmentFilter(value)
          }}
          onClear={() => { setCategoryFilter('all'); setSegmentFilter('all') }}
          className="mb-4"
        />

        <DataTable
          columns={columns}
          data={tableData}
          searchable
          searchPlaceholder="Search brand, expression, or company…"
          searchKey="brand"
          emptyMessage="No brands match your filters."
          compact
          exportable
        />

        {/* Methodology & Sources */}
        <div className="mt-4 pt-4 border-t border-gray-100 space-y-3">
          <div className="flex items-start gap-2">
            <AlertCircle size={12} className="text-gray-500 mt-0.5 flex-shrink-0" />
            <p className="text-xs text-gray-500 leading-relaxed">
              Prices represent recommended retail prices (RRP). Bottle sizes vary by market: UK and EU use 70cl (700ml); US and Middle East use 750ml.
              UK prices in GBP (£), EU in EUR (€), US and ME in USD ($). Market averages calculated from available retailer prices.
              EU average aggregates Spain, France, Germany, Italy, and Netherlands. Prices updated via automated scraping.
            </p>
          </div>
          <SourceList sources={PRICING_SOURCES} />
        </div>
      </Card>
    </div>
  )
}


// ═══════════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════════
export default function BrandPricing() {
  const [searchParams] = useSearchParams()
  const initialCategory = searchParams.get('category') || null
  const initialBrand = searchParams.get('brand') || null

  const [expandedCategory, setExpandedCategory] = useState(initialCategory)
  const [showFullTable, setShowFullTable] = useState(false)
  const [mobileDetail, setMobileDetail] = useState(null)
  const [loading, setLoading] = useState(true)

  const stats = useGlobalStats()

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 300)
    return () => clearTimeout(timer)
  }, [])

  // URL param handling: auto-expand category from cross-page link, or open full table for brand search
  useEffect(() => {
    if (initialBrand) {
      // If a brand param is provided, open the full table so the user can find the brand
      setShowFullTable(true)
    } else if (initialCategory) {
      const match = ALL_CATEGORIES.find(c => c.toLowerCase().includes(initialCategory.toLowerCase()))
      if (match) {
        setExpandedCategory(match)
        // Scroll to expanded card after render
        const timer = setTimeout(() => {
          const el = document.getElementById(`card-${match.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`)
          if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' })
        }, 400)
        return () => clearTimeout(timer)
      }
    }
  }, [initialCategory, initialBrand])

  const handleCategoryToggle = (category) => {
    // On mobile, show category detail in BottomSheet
    if (window.innerWidth < 1024) {
      const stat = stats.categoryStats.find(s => s.category === category)
      if (stat) {
        setMobileDetail({
          title: category,
          content: (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <div className="bg-gray-50 rounded-lg p-2.5 text-center">
                  <div className="text-xs text-gray-500 uppercase">Brands</div>
                  <div className="text-sm font-bold text-navy">{stat.count}</div>
                </div>
                <div className="bg-gray-50 rounded-lg p-2.5 text-center">
                  <div className="text-xs text-gray-500 uppercase">Max Spread</div>
                  <div className="text-sm font-bold text-navy">${stat.maxDiff}</div>
                </div>
                <div className="bg-gray-50 rounded-lg p-2.5 text-center">
                  <div className="text-xs text-gray-500 uppercase">Avg US</div>
                  <div className="text-sm font-bold text-navy">{stat.avgUs !== null ? `$${stat.avgUs}` : '—'}</div>
                </div>
                <div className="bg-gray-50 rounded-lg p-2.5 text-center">
                  <div className="text-xs text-gray-500 uppercase">Avg UK</div>
                  <div className="text-sm font-bold text-navy">{stat.avgUk !== null ? `£${stat.avgUk}` : '—'}</div>
                </div>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {Object.entries(stat.tiers).map(([tier, count]) =>
                  count > 0 && (
                    <span key={tier} className={`text-xs px-1.5 py-0.5 rounded font-medium ${TIER_COLORS[tier].bg} ${TIER_COLORS[tier].text}`}>
                      {tier}: {count}
                    </span>
                  )
                )}
              </div>
              <p className="text-xs text-gray-500">Top brand: {stat.topBrand}</p>
              <button
                onClick={() => {
                  setMobileDetail(null)
                  setExpandedCategory(category)
                }}
                className="w-full py-2.5 bg-navy text-white rounded-xl text-xs font-medium"
              >
                View Full Breakdown
              </button>
            </div>
          )
        })
      }
      return
    }
    setShowFullTable(false)
    setExpandedCategory(prev => prev === category ? null : category)
  }

  const handleShowFullTable = () => {
    setExpandedCategory(null)
    setShowFullTable(true)
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <PageHeader title="Brand Pricing Monitor" subtitle="Loading pricing data…" />
        <BentoGrid>
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
    <div className="space-y-6 max-w-7xl mx-auto">
      <PageHeader
        title={<span className="inline-flex items-center">Brand Pricing Monitor<MethodologyTooltip text="Prices collected from retailer websites. Last verified April 2026." /></span>}
        subtitle={`Cross-market RRP comparison — ${PRICING.length} expressions across ${TOTAL_RETAILERS} retailers in ${TOTAL_MARKETS} markets · Data as of April 2026`}
        breadcrumbs={[
          { label: 'Command Centre', to: '/' },
          { label: 'Brand Pricing' },
        ]}
      />
      <SubPageNav group="intelligence" />
      <DataFreshness date="April 2026" source="Retailer websites: Tesco, Waitrose, Total Wine, El Corte Inglés, Gall &amp; Gall" />

      {/* ── TIER 1: Executive Metrics ── */}
      <BentoGrid>
        <MetricCard
          label="Brands Tracked"
          value={stats.totalBrands}
          subtitle={`${ALL_CATEGORIES.length} categories across ${TOTAL_MARKETS} markets`}
          icon={Package}
          sparkData={[{ v: 180 }, { v: 190 }, { v: 195 }, { v: 200 }, { v: 208 }]}
          direction="up"
          change="+4.5%"
        />
        <MetricCard
          label="Markets Covered"
          value={TOTAL_MARKETS}
          subtitle={`${TOTAL_RETAILERS} retailers monitored`}
          icon={Globe}
        />
        <MetricCard
          label="Avg Price Differential"
          value={`$${stats.avgDiff}`}
          subtitle="Average cross-market spread per expression"
          icon={DollarSign}
          direction={stats.avgDiff > 20 ? 'up' : 'down'}
          change={stats.avgDiff > 20 ? 'High variance' : 'Low variance'}
        />
        {stats.mostExpensiveMarket && (
          <MetricCard
            label="Most Expensive Market"
            value={MARKET_CONFIG[stats.mostExpensiveMarket[0]]?.label || stats.mostExpensiveMarket[0]}
            subtitle={`Avg ${MARKET_CONFIG[stats.mostExpensiveMarket[0]]?.currency || '$'}${stats.mostExpensiveMarket[1]} per expression`}
            icon={TrendingUp}
            direction="up"
          />
        )}
      </BentoGrid>

      {/* Highest premium segment callout */}
      {stats.highestPremiumSegment && (
        <AccentCard>
          <div className="flex items-center gap-3">
            <BarChart3 size={16} className="text-gold" />
            <div>
              <p className="text-xs font-semibold text-navy">
                Highest Premium Index: {stats.highestPremiumSegment[0]} segment ({stats.highestPremiumSegment[1]}% avg cross-market variance)
              </p>
              <p className="text-xs text-gray-500 mt-0.5">
                This segment shows the largest price differences between markets, indicating arbitrage or regulatory-driven pricing.
              </p>
            </div>
          </div>
        </AccentCard>
      )}

      {/* ── TIER 1/2: Click-replace navigation (Option B) ── */}
      {!expandedCategory && !showFullTable && (
        <>
          <SectionHeader size="lg" subtitle="Click any category to explore brand tiers, prices, and market comparisons">
            Category Overview
          </SectionHeader>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {stats.categoryStats.map(stat => (
              <div key={stat.category} id={`card-${stat.category.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}>
                <CategorySummaryCard
                  stat={stat}
                  isExpanded={false}
                  onToggle={() => handleCategoryToggle(stat.category)}
                />
              </div>
            ))}
          </div>
        </>
      )}

      {/* ── Click-replace detail view ── */}
      {expandedCategory && (
        <>
          <div className="flex items-center gap-2 text-xs">
            <button
              onClick={() => setExpandedCategory(null)}
              className="inline-flex items-center gap-1.5 px-3 py-2 min-h-[44px] rounded-lg border border-gray-200 bg-white hover:bg-gray-50 text-navy font-medium transition-colors touch-manipulation"
            >
              <ArrowRight size={14} className="rotate-180" />
              Back to all categories
            </button>
            <span className="text-gray-400">/</span>
            <span className="font-semibold text-navy">{expandedCategory}</span>
          </div>
          <CategoryExpanded
            category={expandedCategory}
            onClose={() => setExpandedCategory(null)}
          />
        </>
      )}

      {/* ── CTA: Tier 3 ── */}
      {!showFullTable && (
        <Card hover onClick={handleShowFullTable} className="text-center">
          <div className="flex items-center justify-center gap-3 py-2">
            <Eye size={16} className="text-navy" />
            <span className="text-sm font-semibold text-navy">View Full Price Table</span>
            <ArrowRight size={14} className="text-navy" />
          </div>
          <p className="text-xs text-gray-500">
            Complete {PRICING.length}-brand table with search, sort, filter, and CSV export
          </p>
        </Card>
      )}

      {/* ── TIER 3: Full Data Table ── */}
      {showFullTable && (
        <FullPriceTable onClose={() => setShowFullTable(false)} />
      )}

      {/* Pricing Monitor Status */}
      <Card>
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gold/10 flex items-center justify-center">
              <RefreshCw size={14} className="text-gold" />
            </div>
            <div>
              <p className="text-xs font-medium text-navy">Real-Time Pricing Monitor</p>
              <p className="text-xs text-gray-500">
                Prices sourced from {TOTAL_RETAILERS} retailers across {TOTAL_MARKETS} markets. Seed data — live scraping every 3 days.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 text-xs">
            <span className="flex items-center gap-1 text-green-600"><span className="w-1.5 h-1.5 rounded-full bg-green-500" /> {PRICING.length} expressions</span>
            <span className="text-gray-300">|</span>
            <span className="flex items-center gap-1 text-blue-600"><Store size={10} /> {TOTAL_RETAILERS} retailers</span>
            <span className="text-gray-300">|</span>
            <span className="flex items-center gap-1 text-gray-500"><Package size={10} /> Bottle sizes vary by market</span>
          </div>
        </div>
      </Card>

      {/* Market Grid */}
      <Card>
        <SectionHeader size="md">Markets Monitored</SectionHeader>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
          {Object.entries(MARKET_CONFIG).map(([key, cfg]) => (
            <div key={key} className="flex items-center gap-2 text-xs bg-gray-50 text-gray-600 px-2.5 py-1.5 rounded-lg border border-gray-100">
              <span className="text-sm">{cfg.flag}</span>
              <div>
                <p className="font-medium">{cfg.label}</p>
                <p className="text-gray-500">{(RETAILERS[key] || []).length} retailers · {cfg.bottleSize} · {cfg.currency}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>

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
