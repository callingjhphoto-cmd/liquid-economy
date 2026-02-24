import React, { useState, useEffect } from 'react'
import { Building2, TrendingUp, TrendingDown, ChevronRight, BarChart3, DollarSign, Activity, Globe, Lock, Search } from 'lucide-react'
import { api } from '../lib/api'

// 5-Year Financial Time Machine Data (2020-2025)
const FINANCIAL_DATA = {
  'constellation-brands': {
    name: 'Constellation Brands',
    ticker: 'STZ',
    type: 'public',
    hq: 'Rochester, NY',
    ceo: 'Bill Newlands',
    keyBrands: ['Modelo Especial', 'Corona Extra', 'Kim Crawford', 'Meiomi', 'Casa Noble'],
    narrative: 'Beer-first strategy delivering 15 consecutive years of volume growth. Modelo Especial now #1 beer brand in US by dollar sales. Wine & spirits divestiture sharpened focus.',
    financials: {
      revenue: { '2020': 8.615, '2021': 8.82, '2022': 9.0, '2023': 9.45, '2024': 10.2, '2025': 10.65 },
      operatingMargin: { '2020': 33.8, '2021': 34.2, '2022': 35.1, '2023': 37.4, '2024': 38.9, '2025': 39.7 },
      netDebtEbitda: { '2020': 3.8, '2021': 3.5, '2022': 3.3, '2023': 3.1, '2024': 2.9, '2025': 2.7 },
      organicGrowth: { '2020': 1.2, '2021': 5.3, '2022': 7.1, '2023': 9.2, '2024': 8.4, '2025': 7.8 },
    },
    keyMetric: { label: 'Beer Operating Margin', value: '39.7%', note: 'Best-in-class for US beer' },
    outlook: 'Modelo momentum intact. Mexico brewery expansion on track. Wine exit complete — pure-play premium beer.',
  },
  'ab-inbev': {
    name: 'AB InBev',
    ticker: 'ABI.BR',
    type: 'public',
    hq: 'Leuven, Belgium',
    ceo: 'Michel Doukeris',
    keyBrands: ['Budweiser', 'Corona', 'Stella Artois', 'Michelob Ultra', 'Brahma'],
    narrative: 'Deleveraging story largely complete — Net Debt/EBITDA from 4.8x (2020) to 2.87x (2025). Digital transformation via BEES marketplace reaching $40B+ GMV.',
    financials: {
      revenue: { '2020': 46.88, '2021': 54.3, '2022': 57.8, '2023': 59.4, '2024': 57.5, '2025': 58.8 },
      operatingMargin: { '2020': 26.8, '2021': 27.4, '2022': 28.1, '2023': 30.2, '2024': 31.5, '2025': 32.1 },
      netDebtEbitda: { '2020': 4.8, '2021': 3.96, '2022': 3.52, '2023': 3.21, '2024': 3.02, '2025': 2.87 },
      organicGrowth: { '2020': -3.7, '2021': 15.6, '2022': 11.2, '2023': 7.8, '2024': 2.6, '2025': 3.1 },
    },
    keyMetric: { label: 'Net Debt/EBITDA', value: '2.87x', note: 'Down from 4.8x in 2020' },
    outlook: 'BEES platform scaling. Premium portfolio driving margin expansion. Bud Light US recovery ongoing.',
  },
  'diageo': {
    name: 'Diageo',
    ticker: 'DGE.L',
    type: 'public',
    hq: 'London, UK',
    ceo: 'Debra Crew',
    keyBrands: ['Johnnie Walker', 'Guinness', 'Tanqueray', 'Don Julio', 'Casamigos'],
    narrative: 'Tequila portfolio (Don Julio, Casamigos) carrying growth. Guinness experiencing global renaissance. Inventory destocking cycle weighing on near-term.',
    financials: {
      revenue: { '2020': 11.75, '2021': 12.73, '2022': 15.45, '2023': 17.1, '2024': 15.8, '2025': 16.2 },
      operatingMargin: { '2020': 28.2, '2021': 29.4, '2022': 30.1, '2023': 31.2, '2024': 30.8, '2025': 31.0 },
      netDebtEbitda: { '2020': 3.2, '2021': 2.9, '2022': 2.7, '2023': 2.6, '2024': 2.8, '2025': 2.7 },
      organicGrowth: { '2020': -8.4, '2021': 16.0, '2022': 21.4, '2023': 6.5, '2024': -1.4, '2025': 1.8 },
    },
    keyMetric: { label: 'Debt/Equity', value: '185%', note: 'Stable range 181-189%' },
    outlook: 'Destocking headwinds easing. Tequila and Guinness as twin growth engines. India market accelerating.',
  },
  'lvmh-wines-spirits': {
    name: 'LVMH Wines & Spirits',
    ticker: 'MC.PA',
    type: 'public',
    hq: 'Paris, France',
    ceo: 'Bernard Arnault (Group)',
    keyBrands: ['Hennessy', 'Moët & Chandon', 'Dom Pérignon', 'Veuve Clicquot', 'Glenmorangie'],
    narrative: 'Cognac division hit hard by US/China tariff escalation. Champagne brands resilient in luxury. W&S organic revenue -5% FY25.',
    financials: {
      revenue: { '2020': 4.76, '2021': 5.97, '2022': 7.1, '2023': 6.6, '2024': 5.91, '2025': 5.63 },
      operatingMargin: { '2020': 28.5, '2021': 31.2, '2022': 33.4, '2023': 31.8, '2024': 30.2, '2025': 28.9 },
      netDebtEbitda: { '2020': 1.1, '2021': 0.8, '2022': 0.6, '2023': 0.9, '2024': 1.2, '2025': 1.4 },
      organicGrowth: { '2020': -15.0, '2021': 26.0, '2022': 12.0, '2023': -4.0, '2024': -8.0, '2025': -5.0 },
    },
    keyMetric: { label: 'W&S Organic Revenue', value: '-5%', note: 'Cognac tariff drag' },
    outlook: 'Hennessy facing tariff headwinds in both US and China. Champagne portfolio holding value. Japanese whisky expansion.',
  },
  'pernod-ricard': {
    name: 'Pernod Ricard',
    ticker: 'RI.PA',
    type: 'public',
    hq: 'Paris, France',
    ceo: 'Alexandre Ricard',
    keyBrands: ['Absolut', 'Jameson', 'Chivas Regal', 'Martell', 'The Glenlivet'],
    narrative: 'India (Royal Stag, Blenders Pride) now largest market. China weakness on Martell cognac. Jameson global roll-out progressing.',
    financials: {
      revenue: { '2020': 8.45, '2021': 8.82, '2022': 10.7, '2023': 12.14, '2024': 11.6, '2025': 11.1 },
      operatingMargin: { '2020': 25.4, '2021': 26.8, '2022': 28.2, '2023': 27.5, '2024': 26.1, '2025': 25.8 },
      netDebtEbitda: { '2020': 3.4, '2021': 3.1, '2022': 2.6, '2023': 2.8, '2024': 3.0, '2025': 3.2 },
      organicGrowth: { '2020': -6.1, '2021': 17.0, '2022': 17.0, '2023': 4.0, '2024': -5.0, '2025': -3.0 },
    },
    keyMetric: { label: 'Organic NSG', value: '-3.0%', note: 'China & US drag' },
    outlook: 'India growth story intact. Martell China recovery key. Cost savings program yielding results.',
  },
  'carlsberg': {
    name: 'Carlsberg',
    ticker: 'CARL-B.CO',
    type: 'public',
    hq: 'Copenhagen, Denmark',
    ceo: 'Jacob Aarup-Andersen',
    keyBrands: ['Carlsberg', 'Tuborg', '1664 Blanc', 'Grimbergen', 'Britvic'],
    narrative: 'Britvic acquisition transforming into total beverage company. Premium portfolio +5% organic. Alcohol-free brews +4% organic.',
    financials: {
      revenue: { '2020': 58.5, '2021': 60.4, '2022': 68.8, '2023': 72.3, '2024': 75.0, '2025': 89.1 },
      operatingMargin: { '2020': 15.2, '2021': 15.8, '2022': 14.6, '2023': 15.1, '2024': 15.4, '2025': 14.8 },
      netDebtEbitda: { '2020': 1.4, '2021': 1.2, '2022': 1.1, '2023': 0.9, '2024': 1.8, '2025': 2.4 },
      organicGrowth: { '2020': -2.1, '2021': 10.2, '2022': 14.8, '2023': 9.2, '2024': 4.1, '2025': 3.8 },
    },
    keyMetric: { label: 'Reported Revenue', value: 'DKK 89.1B', note: '+18.8% (Britvic acquisition)' },
    outlook: 'Britvic integration on track. Asian markets (Laos, India) growing strongly. Zero-alcohol portfolio expanding.',
  },
  // Private companies
  'sazerac': {
    name: 'Sazerac Company',
    ticker: null,
    type: 'private',
    hq: 'Louisville, KY',
    ceo: 'Mark Brown',
    keyBrands: ['Buffalo Trace', 'Pappy Van Winkle', 'Fireball', 'Paddy', "Southern Comfort"],
    narrative: 'Largest privately-held spirits company in the US. Buffalo Trace demand far exceeds supply — allocation-only. Fireball remains top-selling shot.',
    financials: null,
    keyMetric: { label: 'Est. Revenue', value: '~$3.5B', note: 'Private — estimated' },
    outlook: 'Bourbon demand supercycle. New distillery expansions at Buffalo Trace and Barton 1792. Allocated bourbon as luxury asset.',
  },
  'william-grant': {
    name: 'William Grant & Sons',
    ticker: null,
    type: 'private',
    hq: 'Dufftown, Scotland',
    ceo: 'Simon Hunt',
    keyBrands: ["Glenfiddich", "The Balvenie", "Hendrick's Gin", "Monkey Shoulder", "Tullamore D.E.W."],
    narrative: "Family-owned since 1887. Glenfiddich world's most awarded single malt. Hendrick's leading super-premium gin category.",
    financials: null,
    keyMetric: { label: 'Est. Revenue', value: '~£1.8B', note: 'Private — Companies House' },
    outlook: "Hendrick's innovation pipeline strong. Single malt premiumization tailwind. Travel retail recovery benefiting portfolio.",
  },
  'edrington': {
    name: 'Edrington Group',
    ticker: null,
    type: 'private',
    hq: 'Glasgow, Scotland',
    ceo: 'Scott McCroskie',
    keyBrands: ['The Macallan', 'Highland Park', 'The Famous Grouse', 'Naked Grouse', 'Brugal'],
    narrative: 'The Macallan is the crown jewel — dominant in luxury whisky and auction markets. Highland Park cult following growing.',
    financials: null,
    keyMetric: { label: 'Est. Revenue', value: '~£900M', note: 'Private — estimated' },
    outlook: 'Macallan scarcity driving auction values. Age-stated whiskies becoming rarer. Asia-Pacific luxury demand resilient.',
  },
  'mast-jagermeister': {
    name: 'Mast-Jägermeister',
    ticker: null,
    type: 'private',
    hq: 'Wolfenbüttel, Germany',
    ceo: 'Michael Volke',
    keyBrands: ['Jägermeister', 'Jägermeister Cold Brew Coffee', 'Teremana (distribution)'],
    narrative: 'Single-brand powerhouse. Jägermeister #1 herbal liqueur globally. Teremana distribution partnership scaling creator-brand model.',
    financials: null,
    keyMetric: { label: 'Creator Brand Reach', value: '23M consumers', note: 'Teremana in 16 GTR markets yr 1' },
    outlook: 'Nightlife recovery boosting on-trade volumes. Cold Brew Coffee variant gaining traction. Teremana GTR rollout accelerating.',
  },
}

const YEARS = ['2020', '2021', '2022', '2023', '2024', '2025']

function MiniChart({ data, color = 'blue', suffix = '' }) {
  if (!data) return <span className="text-xs text-gray-300 italic">Private</span>
  const values = YEARS.map(y => data[y])
  const max = Math.max(...values)
  const min = Math.min(...values)
  const range = max - min || 1

  return (
    <div className="flex items-end gap-px h-8">
      {values.map((v, i) => {
        const height = ((v - min) / range) * 100
        const isLast = i === values.length - 1
        return (
          <div key={i} className="flex flex-col items-center gap-0.5 flex-1">
            <div
              className={`w-full rounded-t-sm ${isLast ? `bg-${color}-500` : `bg-${color}-200`}`}
              style={{ height: `${Math.max(height, 8)}%` }}
              title={`${YEARS[i]}: ${v}${suffix}`}
            />
          </div>
        )
      })}
    </div>
  )
}

function FinancialRow({ label, data, suffix = '', format }) {
  if (!data) return null
  return (
    <div className="flex items-center gap-4 py-2 border-b border-gray-50 last:border-0">
      <div className="w-36 text-xs text-gray-500 font-medium">{label}</div>
      <div className="flex-1 grid grid-cols-6 gap-2 text-center">
        {YEARS.map(y => (
          <div key={y} className="text-xs font-mono text-navy">
            {format ? format(data[y]) : data[y]}{suffix}
          </div>
        ))}
      </div>
      <div className="w-16">
        <MiniChart data={data} color={parseFloat(data['2025']) >= parseFloat(data['2024']) ? 'green' : 'red'} suffix={suffix} />
      </div>
    </div>
  )
}

function CompanyProfile({ companyId }) {
  const c = FINANCIAL_DATA[companyId]
  if (!c) return null

  return (
    <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center justify-between mb-3">
          <div>
            <div className="flex items-center gap-3">
              <h2 className="text-xl font-display font-bold text-navy">{c.name}</h2>
              {c.ticker ? (
                <span className="text-xs font-mono bg-navy/5 text-navy px-2 py-0.5 rounded">{c.ticker}</span>
              ) : (
                <span className="flex items-center gap-1 text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded">
                  <Lock className="w-3 h-3" /> Private
                </span>
              )}
            </div>
            <div className="flex items-center gap-4 mt-1 text-xs text-gray-400">
              <span>{c.hq}</span>
              <span>CEO: {c.ceo}</span>
            </div>
          </div>
          <div className="text-right">
            <div className="text-xs text-gray-400">{c.keyMetric.label}</div>
            <div className="text-2xl font-bold text-navy">{c.keyMetric.value}</div>
            <div className="text-xs text-gray-400">{c.keyMetric.note}</div>
          </div>
        </div>
        <p className="text-sm text-gray-600 leading-relaxed">{c.narrative}</p>
      </div>

      {/* Brands */}
      <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50">
        <div className="text-xs font-semibold text-navy uppercase tracking-wide mb-2">Key Brands</div>
        <div className="flex flex-wrap gap-2">
          {c.keyBrands.map((b, i) => (
            <span key={i} className="px-3 py-1 bg-white text-navy text-xs font-medium rounded-full border border-gray-100">{b}</span>
          ))}
        </div>
      </div>

      {/* 5-Year Financial Table */}
      {c.financials ? (
        <div className="p-6">
          <div className="text-xs font-semibold text-navy uppercase tracking-wide mb-3">5-Year Financial Overview</div>
          {/* Year headers */}
          <div className="flex items-center gap-4 pb-2 border-b border-gray-200 mb-1">
            <div className="w-36 text-xs text-gray-400 font-medium">Metric</div>
            <div className="flex-1 grid grid-cols-6 gap-2 text-center">
              {YEARS.map(y => (
                <div key={y} className="text-xs font-semibold text-gray-500">{y}</div>
              ))}
            </div>
            <div className="w-16 text-xs text-gray-400 text-center">Trend</div>
          </div>
          <FinancialRow
            label="Revenue ($B)"
            data={c.financials.revenue}
            format={v => v.toFixed(1)}
          />
          <FinancialRow
            label="Operating Margin"
            data={c.financials.operatingMargin}
            suffix="%"
          />
          <FinancialRow
            label="Net Debt/EBITDA"
            data={c.financials.netDebtEbitda}
            suffix="x"
          />
          <FinancialRow
            label="Organic Growth"
            data={c.financials.organicGrowth}
            suffix="%"
          />
        </div>
      ) : (
        <div className="p-6">
          <div className="text-xs font-semibold text-navy uppercase tracking-wide mb-3">Financial Overview</div>
          <div className="bg-gray-50 rounded-lg p-6 text-center">
            <Lock className="w-6 h-6 text-gray-300 mx-auto mb-2" />
            <p className="text-sm text-gray-400">Private company — limited financial data available</p>
            <p className="text-xs text-gray-300 mt-1">Revenue estimated from industry sources and Companies House filings</p>
          </div>
        </div>
      )}

      {/* Outlook */}
      <div className="px-6 py-4 bg-navy/3 border-t border-gray-100">
        <div className="text-xs font-semibold text-navy uppercase tracking-wide mb-1">Analyst Outlook</div>
        <p className="text-sm text-gray-600">{c.outlook}</p>
      </div>
    </div>
  )
}

export default function Companies() {
  const [activeCompany, setActiveCompany] = useState('constellation-brands')
  const [filter, setFilter] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')

  const companyList = Object.entries(FINANCIAL_DATA)
    .filter(([_, c]) => {
      if (filter === 'public' && c.type !== 'public') return false
      if (filter === 'private' && c.type !== 'private') return false
      if (searchTerm && !c.name.toLowerCase().includes(searchTerm.toLowerCase())) return false
      return true
    })

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-display font-bold text-navy">Company Intelligence</h1>
        <p className="text-gray-400 text-sm mt-1">5-year financial analysis, balance sheet health, and strategic outlook for major beverage alcohol companies</p>
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* Company Selector */}
        <div className="col-span-3">
          {/* Search */}
          <div className="relative mb-3">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
            <input
              type="text"
              placeholder="Search companies..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-sm bg-white border border-gray-100 rounded-lg focus:outline-none focus:border-gold"
            />
          </div>

          {/* Filter */}
          <div className="flex gap-1 mb-3">
            {['all', 'public', 'private'].map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`flex-1 text-xs font-medium py-1.5 rounded-md transition-colors ${filter === f ? 'bg-navy text-white' : 'bg-gray-50 text-gray-500 hover:bg-gray-100'}`}
              >
                {f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>

          {/* Company List */}
          <div className="space-y-1.5 max-h-[600px] overflow-y-auto">
            {companyList.map(([key, c]) => (
              <button
                key={key}
                onClick={() => setActiveCompany(key)}
                className={`w-full text-left p-3 rounded-lg border transition-all ${activeCompany === key ? 'bg-navy text-white border-navy shadow-md' : 'bg-white border-gray-100 hover:border-gray-200 hover:shadow-sm'}`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className={`font-semibold text-sm ${activeCompany === key ? 'text-white' : 'text-navy'}`}>{c.name}</div>
                    <div className={`text-xs ${activeCompany === key ? 'text-gray-300' : 'text-gray-400'}`}>
                      {c.ticker || 'Private'} · {c.hq}
                    </div>
                  </div>
                  {c.type === 'private' && (
                    <Lock className={`w-3 h-3 ${activeCompany === key ? 'text-gray-300' : 'text-gray-300'}`} />
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Company Detail */}
        <div className="col-span-9">
          <CompanyProfile companyId={activeCompany} />
        </div>
      </div>
    </div>
  )
}
