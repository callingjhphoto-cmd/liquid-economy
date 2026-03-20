import React, { useState } from 'react'
import { TrendingUp, TrendingDown, Minus, Globe, BarChart3, ShoppingCart, Users, Star, ChevronRight, ChevronDown, ExternalLink, Calendar, Award, Package, Layers, ArrowLeft } from 'lucide-react'
import { CATEGORIES } from '../data/categoryData'

// ============================================
// HELPER: Year Selector
// ============================================
const YearSelector = ({ selectedYear, onChange }) => (
  <div className="flex gap-1 bg-gray-100 rounded-lg p-1">
    {[2025, 2024, 2023, 2022, 2021].map(y => (
      <button key={y} onClick={() => onChange(y)}
        className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all ${selectedYear === y ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}>
        {y}
      </button>
    ))}
  </div>
)

// ============================================
// HELPER: Growth Arrow
// ============================================
const GrowthIndicator = ({ dir, value }) => {
  if (dir === 'up') return <span className="flex items-center gap-1 text-emerald-600 font-semibold text-sm"><TrendingUp size={14} />{value}</span>
  if (dir === 'down') return <span className="flex items-center gap-1 text-red-500 font-semibold text-sm"><TrendingDown size={14} />{value}</span>
  return <span className="flex items-center gap-1 text-gray-500 font-semibold text-sm"><Minus size={14} />{value}</span>
}

// ============================================
// HELPER: Source Link
// ============================================
const SourceLink = ({ name, url }) => (
  <a href={url} target="_blank" rel="noopener noreferrer"
    className="inline-flex items-center gap-1 text-xs text-blue-600 hover:text-blue-800 hover:underline">
    <ExternalLink size={10} />{name}
  </a>
)

// ============================================
// COMPONENT: Category Hero Card (App Store "Today" style)
// ============================================
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

const CategoryHeroCard = ({ cat, selectedYear, onClick }) => {
  const yd = cat.yearData[selectedYear]
  if (!yd) return null
  const gradient = HERO_GRADIENTS[cat.key] || 'from-gray-50 to-gray-100'
  return (
    <button onClick={onClick}
      className="group w-full text-left rounded-2xl overflow-hidden bg-white border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300">
      <div className={`bg-gradient-to-br ${gradient} p-6 sm:p-8`}>
        <div className="flex items-start justify-between mb-4">
          <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-xl font-bold ${cat.iconBg} ${cat.iconColor} shadow-sm`}>
            {cat.icon}
          </div>
          <ChevronRight size={20} className="text-gray-400 group-hover:text-gray-600 group-hover:translate-x-1 transition-all" />
        </div>
        <h3 className="font-display text-xl sm:text-2xl font-bold text-navy mb-2">{cat.label}</h3>
        <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed mb-5">{cat.trajectory}</p>
        <div className="flex items-center gap-6">
          <div>
            <div className="text-xs text-gray-500 uppercase tracking-wider font-medium">Market Size</div>
            <div className="text-xl font-bold text-navy">{yd.marketSize}</div>
          </div>
          <div>
            <div className="text-xs text-gray-500 uppercase tracking-wider font-medium">Growth</div>
            <div className="text-xl font-bold"><GrowthIndicator dir={yd.growthDir} value={yd.growth} /></div>
          </div>
          <div>
            <div className="text-xs text-gray-500 uppercase tracking-wider font-medium">Volume</div>
            <div className="text-xl font-bold text-navy">{yd.volumeCases}</div>
          </div>
        </div>
      </div>
      <div className="px-6 sm:px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-xs text-gray-500">{yd.topMarkets.length} markets</span>
          <span className="text-xs text-gray-300">\u2022</span>
          <span className="text-xs text-gray-500">{(yd.brands.highEnd.length + yd.brands.midTier.length + yd.brands.value.length)} brands tracked</span>
          <span className="text-xs text-gray-300">\u2022</span>
          <span className="text-xs text-gray-500">{yd.trends.length} trends</span>
        </div>
        <span className="text-xs font-semibold text-gold group-hover:underline">Explore \u2192</span>
      </div>
    </button>
  )
}

// ============================================
// COMPONENT: Market Drill-Down
// ============================================
const MarketDrillDown = ({ market }) => {
  const [expanded, setExpanded] = useState(false)
  return (
    <div className="border border-gray-100 rounded-xl overflow-hidden">
      <button onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between p-3 hover:bg-gray-50 transition-colors">
        <div className="flex items-center gap-3">
          <Globe size={16} className="text-gray-400" />
          <span className="font-semibold text-sm text-gray-900">{market.name}</span>
          <GrowthIndicator dir={market.growth.startsWith('+') ? 'up' : market.growth.startsWith('-') ? 'down' : 'flat'} value={market.growth} />
        </div>
        {expanded ? <ChevronDown size={16} className="text-gray-400" /> : <ChevronRight size={16} className="text-gray-400" />}
      </button>
      {expanded && (
        <div className="px-4 pb-4 space-y-4 border-t border-gray-100 bg-gray-50/50">
          <div className="pt-3">
            <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Top Brands in Market</h4>
            <div className="flex flex-wrap gap-1.5">
              {market.brands.map((b, i) => (
                <span key={i} className="px-2.5 py-1 bg-white border border-gray-200 rounded-full text-xs font-medium text-gray-700">{b}</span>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Regional Breakdown</h4>
            <div className="space-y-2">
              {market.regions.map((r, i) => (
                <div key={i} className="flex items-center gap-3">
                  <span className="text-xs text-gray-700 w-24 font-medium">{r.name}</span>
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: r.share }} />
                  </div>
                  <span className="text-xs text-gray-500 w-12 text-right">{r.share}</span>
                  <span className="text-xs text-emerald-600 w-14 text-right font-medium">{r.growth}</span>
                </div>
              ))}
            </div>
          </div>
          {market.sources && market.sources.length > 0 && (
            <div>
              <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Sources</h4>
              <div className="flex flex-wrap gap-2">
                {market.sources.map((s, i) => <SourceLink key={i} name={s.name} url={s.url} />)}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

// ============================================
// COMPONENT: Tiered Brands
// ============================================
const TieredBrands = ({ brands }) => {
  const tiers = [
    { key: 'highEnd', label: 'Ultra-Premium / Luxury', color: 'bg-amber-50 border-amber-200 text-amber-800', icon: <Award size={14} className="text-amber-600" /> },
    { key: 'midTier', label: 'Premium', color: 'bg-blue-50 border-blue-200 text-blue-800', icon: <Star size={14} className="text-blue-600" /> },
    { key: 'value', label: 'Value / Entry-Level', color: 'bg-gray-50 border-gray-200 text-gray-700', icon: <Package size={14} className="text-gray-500" /> }
  ]
  return (
    <div className="space-y-3">
      {tiers.map(tier => (
        <div key={tier.key}>
          <div className="flex items-center gap-2 mb-2">
            {tier.icon}
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">{tier.label}</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {(brands[tier.key] || []).map((b, i) => (
              <span key={i} className={`px-2.5 py-1 border rounded-full text-xs font-medium ${tier.color}`}>{b}</span>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

// ============================================
// COMPONENT: Channel Split (with Travel Retail)
// ============================================
const ChannelSplit = ({ channels }) => {
  const items = [
    { key: 'onTrade', label: 'On-Trade', color: 'bg-blue-500' },
    { key: 'offTrade', label: 'Off-Trade', color: 'bg-emerald-500' },
    { key: 'eCommerce', label: 'E-Commerce', color: 'bg-purple-500' },
    { key: 'travelRetail', label: 'Travel Retail', color: 'bg-amber-500' }
  ]
  return (
    <div className="space-y-2">
      {items.map(item => (
        <div key={item.key} className="flex items-center gap-3">
          <span className="text-xs text-gray-600 w-24 font-medium">{item.label}</span>
          <div className="flex-1 bg-gray-100 rounded-full h-3">
            <div className={`${item.color} h-3 rounded-full transition-all`} style={{ width: `${channels[item.key]}%` }} />
          </div>
          <span className="text-xs font-semibold text-gray-700 w-10 text-right">{channels[item.key]}%</span>
        </div>
      ))}
    </div>
  )
}

// ============================================
// COMPONENT: Trade KPIs (Brand Manager Metrics)
// ============================================
const TradeKPIs = ({ kpis }) => {
  if (!kpis) return null
  const items = [
    { key: 'acvDistribution', label: 'ACV Distribution', unit: '%', desc: 'Weighted store coverage' },
    { key: 'ceDepletions', label: 'CE Depletions', unit: 'K cases', desc: 'Cases shipped to retail' },
    { key: 'billback', label: 'Billback', unit: '$', desc: 'Promo spend recouped' },
    { key: 'grossMarginPct', label: 'Gross Margin', unit: '%', desc: '(Revenue - COGS) / Revenue' },
    { key: 'cac', label: 'CAC', unit: '$', desc: 'Cost per new retail account' },
    { key: 'itr', label: 'ITR', unit: 'x', desc: 'Inventory turnover ratio' },
  ]
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
      {items.map(item => (
        <div key={item.key} className="p-3 bg-amber-50/50 border border-amber-100 rounded-xl">
          <div className="text-[10px] text-amber-700 font-medium uppercase tracking-wide">{item.label}</div>
          <div className="text-lg font-bold text-gray-900 mt-0.5">
            {kpis[item.key] !== null ? `${kpis[item.key]}${item.unit}` : <span className="text-gray-300 text-sm italic">Pending</span>}
          </div>
          <div className="text-[10px] text-gray-400 mt-0.5">{item.desc}</div>
        </div>
      ))}
    </div>
  )
}

// ============================================
// COMPONENT: Yearly Report (Deep Analysis)
// ============================================
const YearlyReport = ({ report, year }) => {
  if (!report) return null
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {report.keyEvents.map((e, i) => (
          <span key={i} className="px-3 py-1.5 bg-blue-50 border border-blue-100 rounded-lg text-xs font-medium text-blue-800">{e}</span>
        ))}
      </div>
      <div className="flex items-center gap-2 py-2 px-3 bg-amber-50 border border-amber-100 rounded-lg">
        <Award size={16} className="text-amber-600" />
        <span className="text-sm font-semibold text-amber-900">Top Performer: {report.topPerformer}</span>
      </div>
      <div className="prose prose-sm max-w-none">
        {report.analysis.split('\n').filter(p => p.trim()).map((para, i) => (
          <p key={i} className="text-sm text-gray-700 leading-relaxed mb-3">{para}</p>
        ))}
      </div>
      {report.conclusion && (
        <div className="p-4 bg-navy/5 border border-navy/10 rounded-xl">
          <h4 className="text-xs font-bold text-navy uppercase tracking-wider mb-2">Conclusion</h4>
          <p className="text-sm text-gray-700 leading-relaxed">{report.conclusion}</p>
        </div>
      )}
    </div>
  )
}

// ============================================
// COMPONENT: Trends List
// ============================================
const TrendsList = ({ trends }) => (
  <div className="space-y-3">
    {trends.map((t, i) => (
      <div key={i} className="p-3 bg-white border border-gray-100 rounded-xl">
        <p className="text-sm text-gray-800 leading-relaxed">{t.text}</p>
        <div className="mt-2">
          <SourceLink name={t.source} url={t.url} />
        </div>
      </div>
    ))}
  </div>
)

// ============================================
// COMPONENT: Category Detail Panel
// ============================================
const CategoryDetail = ({ cat, selectedYear }) => {
  const [activeTab, setActiveTab] = useState('overview')
  const yd = cat.yearData[selectedYear]
  if (!yd) return <div className="p-8 text-center text-gray-500">No data for {selectedYear}</div>

  const tabs = [
    { key: 'overview', label: 'Overview' },
    { key: 'markets', label: 'Markets' },
    { key: 'brands', label: 'Brands' },
    { key: 'trends', label: 'Trends' },
    { key: 'report', label: 'Analysis' }
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-3">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-lg font-bold ${cat.iconBg} ${cat.iconColor}`}>
              {cat.icon}
            </div>
            <div>
              <h2 className="font-display text-section text-navy">{cat.label}</h2>
              <div className="flex items-center gap-4 mt-1">
                <span className="text-lg font-semibold text-gray-700">{yd.marketSize}</span>
                <GrowthIndicator dir={yd.growthDir} value={yd.growth} />
                <span className="text-sm text-gray-500">{yd.volumeCases} 9L cases</span>
              </div>
            </div>
          </div>
          <p className="mt-3 text-sm text-gray-600 leading-relaxed max-w-2xl">{cat.trajectory}</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 border-b border-gray-200">
        {tabs.map(tab => (
          <button key={tab.key} onClick={() => setActiveTab(tab.key)}
            className={`px-4 py-2.5 text-sm font-medium border-b-2 transition-colors ${
              activeTab === tab.key
                ? 'border-gray-900 text-gray-900'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}>
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Tier 1: Executive Summary — 4 Primary Metrics */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            <div className="bg-white border border-gray-100 rounded-2xl p-5 sm:p-6">
              <div className="text-xs text-gray-400 uppercase tracking-wider font-medium mb-2">Market Size</div>
              <div className="text-2xl sm:text-3xl font-bold text-navy">{yd.marketSize}</div>
              <div className="text-xs text-gray-400 mt-1">{selectedYear} global value</div>
            </div>
            <div className="bg-white border border-gray-100 rounded-2xl p-5 sm:p-6">
              <div className="text-xs text-gray-400 uppercase tracking-wider font-medium mb-2">YoY Growth</div>
              <div className="text-2xl sm:text-3xl font-bold">
                <GrowthIndicator dir={yd.growthDir} value={yd.growth} />
              </div>
              <div className="text-xs text-gray-400 mt-1">vs. {selectedYear - 1}</div>
            </div>
            <div className="bg-white border border-gray-100 rounded-2xl p-5 sm:p-6">
              <div className="text-xs text-gray-400 uppercase tracking-wider font-medium mb-2">Volume</div>
              <div className="text-2xl sm:text-3xl font-bold text-navy">{yd.volumeCases}</div>
              <div className="text-xs text-gray-400 mt-1">9L cases</div>
            </div>
            <div className="bg-white border border-gray-100 rounded-2xl p-5 sm:p-6">
              <div className="text-xs text-gray-400 uppercase tracking-wider font-medium mb-2">Market Leader</div>
              <div className="text-lg sm:text-xl font-bold text-navy leading-tight">{yd.report.topPerformer}</div>
              <div className="text-xs text-gray-400 mt-1">{selectedYear} top performer</div>
            </div>
          </div>

          {/* Category Trajectory */}
          <div className="bg-white border border-gray-100 rounded-2xl p-5 sm:p-6">
            <h3 className="text-xs text-gray-400 uppercase tracking-wider font-medium mb-3">Category Trajectory</h3>
            <p className="text-sm text-gray-700 leading-relaxed">{cat.trajectory}</p>
          </div>

          {/* Quick glance: Top Markets + Channel Split */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-white border border-gray-100 rounded-2xl p-5 sm:p-6">
              <h3 className="text-xs text-gray-400 uppercase tracking-wider font-medium mb-3">Top Growth Markets</h3>
              <div className="space-y-2">
                {yd.topMarkets.slice(0, 3).map((m, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-800">{m.name}</span>
                    <GrowthIndicator dir={m.growth.startsWith('+') ? 'up' : 'down'} value={m.growth} />
                  </div>
                ))}
              </div>
              <button onClick={() => setActiveTab('markets')}
                className="mt-3 text-xs font-semibold text-gold hover:underline">
                View all {yd.topMarkets.length} markets \u2192
              </button>
            </div>
            <div className="bg-white border border-gray-100 rounded-2xl p-5 sm:p-6">
              <h3 className="text-xs text-gray-400 uppercase tracking-wider font-medium mb-3">Channel Distribution</h3>
              <ChannelSplit channels={yd.channels} />
            </div>
          </div>
        </div>
      )}

      {activeTab === 'markets' && (
        <div className="space-y-2">
          <p className="text-xs text-gray-500 mb-3">Click a market to see brand performance, regional breakdown, and data sources.</p>
          {yd.topMarkets.map((m, i) => <MarketDrillDown key={i} market={m} />)}
        </div>
      )}

      {activeTab === 'brands' && (
        <TieredBrands brands={yd.brands} />
      )}

      {activeTab === 'trends' && (
        <TrendsList trends={yd.trends} />
      )}

      {activeTab === 'report' && (
        <YearlyReport report={yd.report} year={selectedYear} />
      )}
    </div>
  )
}

// ============================================
// MAIN COMPONENT
// ============================================
export default function CategoryIntelligence() {
  const [activeCat, setActiveCat] = useState(null)
  const [selectedYear, setSelectedYear] = useState(2025)

  const active = activeCat ? CATEGORIES.find(c => c.key === activeCat) : null

  // Gallery view — App Store "Today" style
  if (!active) {
    return (
      <div className="min-h-screen bg-surface p-3 sm:p-4 lg:p-6 max-w-6xl mx-auto">
        {/* Page Header */}
        <div className="mb-6 lg:mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <p className="text-xs font-semibold text-gold uppercase tracking-widest mb-1">{selectedYear} Edition</p>
              <h1 className="font-display text-3xl sm:text-4xl font-bold text-navy">Category Intelligence</h1>
              <p className="text-body text-gray-500 mt-2">Deep market analysis across 11 beverage categories. Tap any category to explore.</p>
            </div>
            <YearSelector selectedYear={selectedYear} onChange={setSelectedYear} />
          </div>
        </div>

        {/* Hero Grid — App Store "Today" cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
          {CATEGORIES.map(cat => (
            <CategoryHeroCard
              key={cat.key}
              cat={cat}
              selectedYear={selectedYear}
              onClick={() => setActiveCat(cat.key)}
            />
          ))}
        </div>

        <div className="mt-8 text-center">
          <p className="text-xs text-gray-400">Data sourced from IWSR, Euromonitor, DISCUS, OIV, and trade publications</p>
        </div>
      </div>
    )
  }

  // Detail view — drill-down into a single category
  return (
    <div className="min-h-screen bg-surface p-3 sm:p-4 lg:p-6 max-w-6xl mx-auto">
      {/* Back + Header */}
      <div className="mb-4 lg:mb-6">
        <button onClick={() => setActiveCat(null)}
          className="flex items-center gap-2 text-sm text-gray-500 hover:text-navy transition-colors mb-3 group">
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          All Categories
        </button>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <h1 className="font-display text-page text-navy">Category Intelligence</h1>
          <YearSelector selectedYear={selectedYear} onChange={setSelectedYear} />
        </div>
      </div>

      {/* Quick nav for switching categories without going back */}
      <div className="flex gap-1.5 overflow-x-auto pb-3 mb-4 scrollbar-hide">
        {CATEGORIES.map(cat => (
          <button
            key={cat.key}
            onClick={() => setActiveCat(cat.key)}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium whitespace-nowrap shrink-0 transition-colors ${
              activeCat === cat.key
                ? 'bg-navy text-white'
                : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
            }`}
          >
            <span className={`w-5 h-5 rounded flex items-center justify-center text-[10px] font-bold ${cat.iconBg} ${cat.iconColor}`}>{cat.icon}</span>
            {cat.label}
          </button>
        ))}
      </div>

      {/* Detail Panel */}
      <CategoryDetail cat={active} selectedYear={selectedYear} />
    </div>
  )
}
