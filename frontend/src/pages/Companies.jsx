import React, { useState, useMemo, useCallback, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import {
  Building2, TrendingUp, TrendingDown, Globe, DollarSign, Search, Target,
  Shield, Zap, AlertTriangle, MapPin, Layers, ArrowRight, BookOpen,
  Briefcase, Star, BarChart3, Lock, ChevronRight, ChevronDown, X
} from 'lucide-react'
import {
  Card, MetricCard, PageHeader, BentoGrid, FilterBar, Badge, DataTable,
  DrillDown, EntityLink, SourceList, BottomSheet, SectionHeader,
  SkeletonCard, SubPageNav
} from '../components/ui'
import { COMPANIES, WHITE_SPACE } from '../data/companyData'

/* ── Helpers ── */
const fmt = (n) => {
  if (n == null) return '\u2014'
  if (typeof n === 'string') return n
  if (n >= 1000) return `$${(n / 1).toFixed(1)}B`
  if (n >= 1) return `$${n.toFixed(1)}B`
  return `$${(n * 1000).toFixed(0)}M`
}

const pctChange = (curr, prev) => {
  if (curr == null || prev == null || typeof curr === 'string' || typeof prev === 'string') return null
  const change = ((curr - prev) / prev * 100).toFixed(1)
  return Number(change) > 0 ? `+${change}%` : `${change}%`
}

const parseRevenue = (str) => {
  if (!str) return 0
  const match = String(str).match(/([\d.]+)/)
  return match ? parseFloat(match[1]) : 0
}

const slugify = (name) => name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')

const THREAT_COLORS = {
  high: 'bg-red-50 text-red-700 border-red-200',
  medium: 'bg-amber-50 text-amber-700 border-amber-200',
  low: 'bg-emerald-50 text-emerald-700 border-emerald-200',
}

const MA_TYPE_COLORS = {
  acquisition: 'bg-emerald-500',
  divestiture: 'bg-red-500',
  partnership: 'bg-blue-500',
  investment: 'bg-amber-500',
  merger: 'bg-purple-500',
  restructure: 'bg-gray-500',
  joint_venture: 'bg-blue-400',
}

const OPP_VARIANTS = { Highest: 'green', High: 'blue', Moderate: 'orange' }

/* ── Derived Stats ── */
const totalCompanies = COMPANIES.length
const totalRevenue = COMPANIES.reduce((s, c) => s + parseRevenue(c.revenue), 0)
const avgMargin = (COMPANIES.reduce((s, c) => {
  const f = c.financials && c.financials['2025']
  return s + (f ? f.operatingMargin : 0)
}, 0) / COMPANIES.length).toFixed(1)
const highestGrowth = [...COMPANIES].sort((a, b) => {
  const ag = parseFloat(String(a.revenueGrowth).replace(/[^-\d.]/g, '')) || 0
  const bg = parseFloat(String(b.revenueGrowth).replace(/[^-\d.]/g, '')) || 0
  return bg - ag
})[0]
const mostMACompany = [...COMPANIES].sort((a, b) =>
  (b.maTimeline ? b.maTimeline.filter(m => m.type === 'acquisition').length : 0) -
  (a.maTimeline ? a.maTimeline.filter(m => m.type === 'acquisition').length : 0)
)[0]

/* ── Category & HQ filter options ── */
const allCategories = [...new Set(COMPANIES.flatMap(c =>
  c.categoryPresence ? Object.keys(c.categoryPresence) : []
))].sort()

const allRegions = [...new Set(COMPANIES.map(c => {
  const hq = c.hq || ''
  if (hq.includes('UK') || hq.includes('Scotland') || hq.includes('France') || hq.includes('Italy') || hq.includes('Denmark') || hq.includes('Paris')) return 'Europe'
  if (hq.includes('USA') || hq.includes('Bermuda')) return 'Americas'
  if (hq.includes('Japan') || hq.includes('Tokyo')) return 'Asia Pacific'
  return 'Other'
}))].sort()

const revenueRanges = [
  { value: 'all', label: 'All Revenue' },
  { value: '0-5', label: 'Under $5B' },
  { value: '5-20', label: '$5B \u2013 $20B' },
  { value: '20+', label: '$20B+' },
]

function getRegion(hq) {
  if (!hq) return 'Other'
  if (hq.includes('UK') || hq.includes('Scotland') || hq.includes('France') || hq.includes('Italy') || hq.includes('Denmark') || hq.includes('Paris')) return 'Europe'
  if (hq.includes('USA') || hq.includes('Bermuda')) return 'Americas'
  if (hq.includes('Japan') || hq.includes('Tokyo')) return 'Asia Pacific'
  return 'Other'
}


/* ════════════════════════════════════════════
   TIER 1 — Company Card (Bento Grid)
   ════════════════════════════════════════════ */
function CompanyCardTier1({ company, onClick, isHighlighted }) {
  const revenue = parseRevenue(company.revenue)
  const isGrowing = company.revenueGrowth && company.revenueGrowth.startsWith('+')
  const brandCount = company.keyBrands ? company.keyBrands.length : 0
  const categoryCount = company.categoryPresence ? Object.keys(company.categoryPresence).length : 0

  return (
    <Card
      hover
      onClick={onClick}
      data-company-slug={slugify(company.name)}
      className={`transition-all ${isHighlighted ? 'ring-2 ring-navy/30 shadow-md' : ''}`}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-xl bg-navy/5 flex items-center justify-center text-navy font-bold text-sm flex-shrink-0">
            {company.name.charAt(0)}
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="font-semibold text-sm text-navy truncate">{company.name}</span>
              {company.isPrivate && <Lock size={10} className="text-amber-500 flex-shrink-0" />}
            </div>
            <span className="text-xs text-gray-500">{company.hq}</span>
          </div>
        </div>
        <Badge variant={company.isPrivate ? 'orange' : 'blue'} size="sm">
          {company.isPrivate ? 'Private' : company.ticker}
        </Badge>
      </div>

      <div className="flex items-baseline justify-between mb-2">
        <span className="text-lg font-bold text-navy tabular-nums">{company.revenue}</span>
        <span className={`text-xs font-semibold flex items-center gap-0.5 ${isGrowing ? 'text-emerald-600' : 'text-red-500'}`}>
          {isGrowing ? <TrendingUp size={11} /> : <TrendingDown size={11} />}
          {company.revenueGrowth}
        </span>
      </div>

      <div className="flex items-center gap-3 text-xs text-gray-500">
        <span>{brandCount} brands</span>
        <span>\u00b7</span>
        <span>{categoryCount} categories</span>
        {company.employees && (
          <>
            <span>\u00b7</span>
            <span>{company.employees}</span>
          </>
        )}
      </div>
    </Card>
  )
}


/* ════════════════════════════════════════════
   TIER 2 — Expanded Company Panel
   ════════════════════════════════════════════ */
function CompanyTier2({ company, onViewFull, onClose }) {
  const [activeSection, setActiveSection] = useState('overview')
  const fin2025 = company.financials && company.financials['2025']
  const fin2024 = company.financials && company.financials['2024']

  const sections = [
    { id: 'overview', label: 'Overview' },
    { id: 'brands', label: 'Brands' },
    { id: 'compete', label: 'Compete' },
    { id: 'recent', label: 'Activity' },
  ]

  return (
    <Card className="col-span-full" padding="p-0">
      {/* Header */}
      <div className="p-5 border-b border-gray-100">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-navy/5 flex items-center justify-center text-navy font-bold text-lg">
              {company.name.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <EntityLink type="company" id={slugify(company.name)} label={company.name} className="font-display text-section text-navy no-underline" />
                <Badge variant={company.isPrivate ? 'orange' : 'blue'} size="sm">
                  {company.isPrivate ? 'Private' : company.ticker}
                </Badge>
              </div>
              <div className="flex items-center gap-3 mt-0.5 text-xs text-gray-500">
                <span>{company.hq}</span>
                <span className="font-semibold text-navy">{company.revenue}</span>
                <span className={company.revenueGrowth && company.revenueGrowth.startsWith('+') ? 'text-emerald-600 font-medium' : 'text-red-500 font-medium'}>
                  {company.revenueGrowth}
                </span>
              </div>
            </div>
          </div>
          <button onClick={onClose} className="p-2 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors touch-manipulation">
            <X size={16} />
          </button>
        </div>
        <p className="text-xs text-gray-600 leading-relaxed mt-3">{company.description}</p>

        {/* Quick metrics row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
          {fin2025 && (
            <>
              <div className="bg-gray-50 rounded-lg p-2.5 text-center">
                <div className="text-xs text-gray-500 uppercase tracking-wide">Op. Margin</div>
                <div className="text-sm font-bold text-navy tabular-nums">{fin2025.operatingMargin}%</div>
              </div>
              <div className="bg-gray-50 rounded-lg p-2.5 text-center">
                <div className="text-xs text-gray-500 uppercase tracking-wide">Net Income</div>
                <div className="text-sm font-bold text-navy tabular-nums">${fin2025.netIncome}B</div>
              </div>
            </>
          )}
          {!company.isPrivate && company.marketCap && (
            <div className="bg-gray-50 rounded-lg p-2.5 text-center">
              <div className="text-xs text-gray-500 uppercase tracking-wide">Mkt Cap</div>
              <div className="text-sm font-bold text-navy tabular-nums">{company.marketCap}</div>
            </div>
          )}
          {!company.isPrivate && company.stockYTD && (
            <div className="bg-gray-50 rounded-lg p-2.5 text-center">
              <div className="text-xs text-gray-500 uppercase tracking-wide">Stock YTD</div>
              <div className={`text-sm font-bold tabular-nums ${company.stockYTD.startsWith('+') ? 'text-emerald-600' : 'text-red-500'}`}>
                {company.stockYTD}
              </div>
            </div>
          )}
          {company.isPrivate && (
            <div className="bg-gray-50 rounded-lg p-2.5 text-center col-span-2">
              <div className="text-xs text-gray-500 uppercase tracking-wide">Founded</div>
              <div className="text-sm font-bold text-navy">{company.founded}</div>
            </div>
          )}
        </div>
      </div>

      {/* Section tabs */}
      <div className="relative">
      <div className="flex gap-1 px-5 pt-3 pb-0 overflow-x-auto whitespace-nowrap">
        {sections.map(s => (
          <button
            key={s.id}
            onClick={() => setActiveSection(s.id)}
            className={`px-3 py-2 min-h-[44px] rounded-t-lg text-xs font-medium whitespace-nowrap transition-colors touch-manipulation ${
              activeSection === s.id
                ? 'bg-gray-50 text-navy border-b-2 border-navy'
                : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>
      <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white to-transparent sm:hidden" />
      </div>

      {/* Section content */}
      <div className="p-5 bg-gray-50/30">
        {/* Overview — Category presence + geo revenue */}
        {activeSection === 'overview' && (
          <div className="space-y-4">
            {company.categoryPresence && (
              <div>
                <SectionHeader size="sm">Category Presence</SectionHeader>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                  {Object.entries(company.categoryPresence)
                    .sort((a, b) => b[1].share - a[1].share)
                    .slice(0, 6)
                    .map(([cat, info]) => (
                    <div key={cat} className="flex items-center justify-between bg-white rounded-lg p-2.5 border border-gray-100">
                      <div className="flex items-center gap-2 min-w-0">
                        <EntityLink type="category" id={cat.toLowerCase().replace(/\s+/g, '-')} label={cat} className="text-xs font-medium truncate" />
                        <Badge variant={info.position.includes('Leader') || info.position.includes('#1') || info.position.includes('Dominant') ? 'green' : info.position.includes('Growing') ? 'gold' : 'default'} size="sm">
                          {info.position}
                        </Badge>
                      </div>
                      <span className="text-xs font-bold text-navy tabular-nums ml-2">{info.share}%</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {company.geoRevenue && (
              <div>
                <SectionHeader size="sm">Revenue by Region</SectionHeader>
                <div className="space-y-2 mt-2">
                  {Object.entries(company.geoRevenue)
                    .sort((a, b) => b[1] - a[1])
                    .map(([region, pct]) => (
                    <div key={region}>
                      <div className="flex justify-between text-xs mb-0.5">
                        <EntityLink type="market" id={region.toLowerCase().replace(/[\s/]+/g, '-')} label={region} className="text-gray-600 no-underline" />
                        <span className="font-semibold text-navy tabular-nums">{pct}%</span>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-1.5">
                        <div className="bg-navy/60 rounded-full h-1.5 transition-all" style={{ width: `${pct}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Brands */}
        {activeSection === 'brands' && company.keyBrands && (
          <div>
            <SectionHeader size="sm">Key Brands ({company.keyBrands.length})</SectionHeader>
            <div className="flex flex-wrap gap-1.5 mt-2">
              {company.keyBrands.map((b, i) => (
                <EntityLink
                  key={i}
                  type="brand"
                  id={slugify(b)}
                  label={b}
                  className="px-2.5 py-1 bg-white border border-gray-200 rounded-full text-xs font-medium hover:bg-navy/5 hover:border-navy/20 transition-colors no-underline"
                />
              ))}
            </div>

            {company.industryIntel && company.industryIntel.brandIntel && (
              <div className="mt-4 space-y-2">
                <SectionHeader size="sm">Brand Intelligence</SectionHeader>
                {company.industryIntel.brandIntel.map((brand, i) => (
                  <div key={i} className="bg-white rounded-lg border border-gray-100 p-3">
                    <div className="flex items-center justify-between mb-1">
                      <EntityLink type="brand" id={slugify(brand.name)} label={brand.name} className="font-semibold text-sm" />
                      <Badge
                        variant={brand.trend === 'growing' ? 'green' : brand.trend === 'declining' ? 'red' : brand.trend === 'iconic' ? 'navy' : 'blue'}
                        size="sm"
                      >
                        {brand.trend}
                      </Badge>
                    </div>
                    <div className="text-xs text-gray-500 mb-1">{brand.position} \u00b7 {brand.marketShare}</div>
                    <p className="text-xs text-gray-600 leading-relaxed">{brand.latest}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Compete */}
        {activeSection === 'compete' && (
          <div className="space-y-4">
            {company.howToCompeteAgainst && (
              <div>
                <SectionHeader size="sm">How to Compete Against {company.name}</SectionHeader>
                <div className="space-y-2 mt-2">
                  {company.howToCompeteAgainst.map((s, i) => (
                    <div key={i} className="bg-white rounded-lg p-3 border border-gray-100">
                      <div className="flex items-start gap-2.5">
                        <div className="bg-navy text-white rounded-full w-5 h-5 flex items-center justify-center text-[10px] font-bold flex-shrink-0 mt-0.5">
                          {i + 1}
                        </div>
                        <div>
                          <div className="font-semibold text-navy text-xs mb-0.5">{s.strategy}</div>
                          <p className="text-xs text-gray-600 leading-relaxed">{s.detail}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {company.strengthsForCompetitor && (
                <div className="bg-white rounded-lg border border-gray-100 p-3">
                  <h4 className="text-[10px] font-semibold text-navy uppercase tracking-wide mb-2 flex items-center gap-1">
                    <Shield size={12} /> Their Strengths
                  </h4>
                  <div className="space-y-1.5">
                    {company.strengthsForCompetitor.slice(0, 3).map((s, i) => (
                      <div key={i} className="flex gap-1.5 items-start">
                        <AlertTriangle size={10} className="text-red-400 mt-0.5 flex-shrink-0" />
                        <p className="text-xs text-gray-600 leading-relaxed">{s}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {company.weaknessesForCompetitor && (
                <div className="bg-white rounded-lg border border-gray-100 p-3">
                  <h4 className="text-[10px] font-semibold text-navy uppercase tracking-wide mb-2 flex items-center gap-1">
                    <Zap size={12} /> Their Weaknesses
                  </h4>
                  <div className="space-y-1.5">
                    {company.weaknessesForCompetitor.slice(0, 3).map((s, i) => (
                      <div key={i} className="flex gap-1.5 items-start">
                        <ArrowRight size={10} className="text-emerald-500 mt-0.5 flex-shrink-0" />
                        <p className="text-xs text-gray-600 leading-relaxed">{s}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Activity — Recent moves + developments */}
        {activeSection === 'recent' && (
          <div className="space-y-4">
            {company.recentMoves && (
              <div>
                <SectionHeader size="sm">Recent Moves</SectionHeader>
                <div className="space-y-2 mt-2">
                  {company.recentMoves.map((m, i) => (
                    <div key={i} className={`flex gap-3 items-start p-2.5 rounded-lg border ${THREAT_COLORS[m.threat] || 'border-gray-200'}`}>
                      <div className="text-xs font-medium whitespace-nowrap mt-0.5">{m.date}</div>
                      <p className="text-xs leading-relaxed flex-1">{m.move || m.event}</p>
                      <Badge variant={m.threat === 'high' ? 'red' : m.threat === 'medium' ? 'orange' : 'green'} size="sm">
                        {m.threat}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {company.industryIntel && company.industryIntel.recentDevelopments && (
              <div>
                <SectionHeader size="sm">Industry Developments</SectionHeader>
                <div className="space-y-2 mt-2">
                  {company.industryIntel.recentDevelopments.slice(0, 4).map((dev, i) => (
                    <div key={i} className="flex gap-3 items-start">
                      <div className="text-xs font-semibold text-navy/60 whitespace-nowrap min-w-[60px]">{dev.date}</div>
                      <p className="text-xs text-gray-600 leading-relaxed">{dev.event}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Footer CTA for Tier 3 */}
      <div className="px-5 py-3 border-t border-gray-100 flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs text-gray-500">
          {company.profileSources && (
            <span>{company.profileSources.length} sources</span>
          )}
          {company.maTimeline && (
            <>
              <span>\u00b7</span>
              <span>{company.maTimeline.length} M&A events</span>
            </>
          )}
        </div>
        <button
          onClick={onViewFull}
          className="flex items-center gap-1 text-xs font-medium text-navy hover:text-navy/70 transition-colors"
        >
          Full company profile
          <ChevronRight size={14} />
        </button>
      </div>
    </Card>
  )
}


/* ════════════════════════════════════════════
   TIER 3 — Full Company Deep Dive
   ════════════════════════════════════════════ */
function CompanyTier3({ company, onClose }) {
  const [deepTab, setDeepTab] = useState('financials')

  const tabs = [
    { id: 'financials', label: 'Financials' },
    { id: 'manda', label: 'M&A History' },
    { id: 'distribution', label: 'Distribution' },
    { id: 'intel', label: 'Analyst View' },
    { id: 'sources', label: 'Sources' },
  ]

  const financials = company.financials || {}
  const years = Object.keys(financials).sort()
  const chartData = years.map(y => ({
    year: y,
    revenue: financials[y].revenue,
    margin: financials[y].operatingMargin,
    netIncome: financials[y].netIncome,
  }))

  const finColumns = [
    { key: 'year', label: 'Year', sortable: true, width: 'w-16' },
    { key: 'revenue', label: 'Revenue ($B)', sortable: true, align: 'right', render: (v) => v ? `$${v}B` : '\u2014' },
    { key: 'operatingMargin', label: 'Op. Margin', sortable: true, align: 'right', render: (v) => v ? `${v}%` : '\u2014' },
    { key: 'netIncome', label: 'Net Income ($B)', sortable: true, align: 'right', render: (v) => v ? `$${v}B` : '\u2014' },
    { key: 'ebitda', label: 'EBITDA ($B)', sortable: true, align: 'right', render: (v) => v ? `$${v}B` : '\u2014' },
    { key: 'eps', label: 'EPS', sortable: true, align: 'right', render: (v) => v != null ? (typeof v === 'number' ? `$${v}` : v) : '\u2014' },
    { key: 'roic', label: 'ROIC', sortable: true, align: 'right', render: (v) => v ? `${v}%` : '\u2014' },
  ]

  const finData = years.map(y => ({ year: y, ...financials[y] }))

  const maColumns = [
    { key: 'year', label: 'Year', sortable: true, width: 'w-16' },
    { key: 'type', label: 'Type', sortable: true, render: (v) => (
      <Badge variant={v === 'acquisition' ? 'green' : v === 'divestiture' ? 'red' : v === 'merger' ? 'navy' : 'gold'} size="sm">{v}</Badge>
    )},
    { key: 'deal', label: 'Deal', sortable: false },
  ]

  return (
    <div className="fixed inset-0 z-40 bg-black/20 flex items-start justify-center pt-8 pb-8 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-5xl mx-4 overflow-hidden">
        {/* Header */}
        <div className="sticky top-0 bg-white z-10 px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-navy/5 flex items-center justify-center text-navy font-bold">
              {company.name.charAt(0)}
            </div>
            <div>
              <h2 className="font-display text-lg text-navy">{company.name}</h2>
              <div className="text-xs text-gray-500">{company.hq} \u00b7 {company.revenue} \u00b7 Est. {company.founded}</div>
            </div>
          </div>
          <button onClick={onClose} className="p-2 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors touch-manipulation">
            <X size={18} />
          </button>
        </div>

        {/* Tab nav */}
        <div className="relative">
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
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white to-transparent sm:hidden" />
        </div>

        {/* Tab content */}
        <div className="p-6 max-h-[70vh] overflow-y-auto">
          {deepTab === 'financials' && (
            <div className="space-y-6">
              {chartData.length > 0 && (
                <div>
                  <SectionHeader size="md">5-Year Financial Trend</SectionHeader>
                  <div className="h-56 mt-3">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={chartData} accessibilityLayer>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                        <XAxis dataKey="year" tick={{ fontSize: 11 }} />
                        <YAxis tick={{ fontSize: 11 }} />
                        <Tooltip contentStyle={{ fontSize: 12 }} />
                        <Line type="monotone" dataKey="revenue" stroke="#1e3a5f" strokeWidth={2} name="Revenue ($B)" dot={{ fill: '#1e3a5f' }} />
                        <Line type="monotone" dataKey="margin" stroke="#c5a572" strokeWidth={2} name="Op. Margin (%)" dot={{ fill: '#c5a572' }} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              )}

              <DataTable
                columns={finColumns}
                data={finData}
                compact
                emptyMessage="No financial data available"
              />
            </div>
          )}

          {deepTab === 'manda' && (
            <div>
              <SectionHeader size="md">M&A Timeline ({company.maTimeline ? company.maTimeline.length : 0} Events)</SectionHeader>
              {company.maTimeline && company.maTimeline.length > 0 ? (
                <DataTable
                  columns={maColumns}
                  data={company.maTimeline}
                  searchable
                  searchPlaceholder="Search M&A history\u2026"
                  searchKey="deal"
                  compact
                  className="mt-3"
                />
              ) : (
                <p className="text-xs text-gray-500 mt-3">No M&A data available.</p>
              )}
            </div>
          )}

          {deepTab === 'distribution' && (
            <div className="space-y-4">
              <SectionHeader size="md">UK Distribution & Deal Terms</SectionHeader>
              {company.distributionUK && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
                  {Object.entries(company.distributionUK).map(([channel, desc]) => (
                    <div key={channel} className="bg-gray-50 rounded-lg p-3">
                      <div className="text-[10px] font-semibold text-navy uppercase tracking-wide mb-1">
                        {channel.replace(/([A-Z])/g, ' $1').trim()}
                      </div>
                      <p className="text-xs text-gray-600 leading-relaxed">{desc}</p>
                    </div>
                  ))}
                </div>
              )}
              {company.typicalDealTerms && (
                <div className="mt-4">
                  <SectionHeader size="sm">Typical Deal Structure</SectionHeader>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                    {Object.entries(company.typicalDealTerms).map(([term, val]) => (
                      <div key={term} className="flex gap-2 items-start bg-gray-50 rounded-lg p-2.5">
                        <span className="text-xs font-medium text-gray-500 uppercase w-24 flex-shrink-0">
                          {term.replace(/([A-Z])/g, ' $1').trim()}
                        </span>
                        <span className="text-xs text-gray-600">{val}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {deepTab === 'intel' && (
            <div className="space-y-4">
              <SectionHeader size="md">Analyst Outlook</SectionHeader>
              {company.industryIntel && company.industryIntel.analystOutlook && (
                <div className="bg-gradient-to-r from-navy/5 to-gold/5 rounded-xl border border-gray-100 p-5 mt-3">
                  <p className="text-sm text-gray-700 leading-relaxed">{company.industryIntel.analystOutlook}</p>
                </div>
              )}

              {company.strengthsForCompetitor && (
                <div className="mt-4">
                  <SectionHeader size="sm">Full Strengths Analysis</SectionHeader>
                  <div className="space-y-2 mt-2">
                    {company.strengthsForCompetitor.map((s, i) => (
                      <div key={i} className="flex gap-2 items-start">
                        <Shield size={12} className="text-red-400 mt-0.5 flex-shrink-0" />
                        <p className="text-xs text-gray-600 leading-relaxed">{s}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {company.weaknessesForCompetitor && (
                <div className="mt-4">
                  <SectionHeader size="sm">Full Weaknesses Analysis</SectionHeader>
                  <div className="space-y-2 mt-2">
                    {company.weaknessesForCompetitor.map((s, i) => (
                      <div key={i} className="flex gap-2 items-start">
                        <Zap size={12} className="text-emerald-500 mt-0.5 flex-shrink-0" />
                        <p className="text-xs text-gray-600 leading-relaxed">{s}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {deepTab === 'sources' && (
            <div>
              <SectionHeader size="md">Data Sources & Citations</SectionHeader>
              {company.profileSources && (
                <div className="mt-3">
                  <SourceList sources={company.profileSources} />
                </div>
              )}
              {company.industryIntel && company.industryIntel.intelligenceSources && (
                <div className="mt-4">
                  <SectionHeader size="sm">Intelligence Sources</SectionHeader>
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {company.industryIntel.intelligenceSources.map((s, i) => (
                      <Badge key={i} variant="default" size="sm">{s}</Badge>
                    ))}
                  </div>
                </div>
              )}
              <p className="text-xs text-gray-500 mt-4 border-t border-gray-100 pt-3">
                Financial data sourced from annual reports, SEC/regulatory filings, and industry databases.
                Market share estimates from IWSR and Euromonitor. Last updated: February 2026.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}


/* ════════════════════════════════════════════
   White Space Analysis (DrillDown)
   ════════════════════════════════════════════ */
function WhiteSpaceSection() {
  return (
    <DrillDown title="Category White Space Analysis" summary="Where the major companies are NOT competing \u2014 your biggest opportunities">
      <div className="space-y-2">
        {Object.entries(WHITE_SPACE).map(([cat, info]) => (
          <div key={cat} className="bg-white rounded-lg p-3 border border-gray-100 hover:border-emerald-200 transition-colors">
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-2">
                <EntityLink type="category" id={cat.toLowerCase().replace(/\s+/g, '-')} label={cat} className="font-medium text-sm" />
                <Badge variant={OPP_VARIANTS[info.opportunity] || 'default'} size="sm">
                  {info.opportunity}
                </Badge>
              </div>
              <span className="text-xs font-semibold text-emerald-600 tabular-nums">{info.growthRate}</span>
            </div>
            <div className="text-xs text-gray-500 mb-0.5">
              <span className="font-medium">Major presence:</span> {info.majorPresence}
            </div>
            <p className="text-xs text-gray-600 leading-relaxed">{info.notes}</p>
          </div>
        ))}
      </div>
    </DrillDown>
  )
}


/* ════════════════════════════════════════════
   MAIN PAGE COMPONENT
   ════════════════════════════════════════════ */
export default function Companies() {
  const [searchParams] = useSearchParams()
  const [searchTerm, setSearchTerm] = useState('')
  const [expandedCompany, setExpandedCompany] = useState(null)
  const [tier3Company, setTier3Company] = useState(null)
  const [mobileSheet, setMobileSheet] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 300)
    return () => clearTimeout(timer)
  }, [])

  // Filters
  const [filterCategory, setFilterCategory] = useState('all')
  const [filterRegion, setFilterRegion] = useState('all')
  const [filterRevenue, setFilterRevenue] = useState('all')

  // URL param highlighting
  const highlightedCompany = searchParams.get('company')

  // Auto-expand and scroll to deep-linked company
  useEffect(() => {
    if (!highlightedCompany || loading) return
    setExpandedCompany(highlightedCompany)
    // Wait for render then scroll
    const timer = setTimeout(() => {
      const el = document.querySelector(`[data-company-slug="${highlightedCompany}"]`)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }
    }, 100)
    return () => clearTimeout(timer)
  }, [highlightedCompany, loading])

  // Filter logic
  const filtered = useMemo(() => {
    return COMPANIES.filter(c => {
      // Search
      if (searchTerm) {
        const q = searchTerm.toLowerCase()
        const nameMatch = c.name.toLowerCase().includes(q)
        const brandMatch = c.keyBrands && c.keyBrands.some(b => b.toLowerCase().includes(q))
        const hqMatch = c.hq && c.hq.toLowerCase().includes(q)
        if (!nameMatch && !brandMatch && !hqMatch) return false
      }

      // Category filter
      if (filterCategory !== 'all') {
        if (!c.categoryPresence || !c.categoryPresence[filterCategory]) return false
      }

      // Region filter
      if (filterRegion !== 'all') {
        if (getRegion(c.hq) !== filterRegion) return false
      }

      // Revenue filter
      if (filterRevenue !== 'all') {
        const rev = parseRevenue(c.revenue)
        if (filterRevenue === '0-5' && rev >= 5) return false
        if (filterRevenue === '5-20' && (rev < 5 || rev >= 20)) return false
        if (filterRevenue === '20+' && rev < 20) return false
      }

      return true
    })
  }, [searchTerm, filterCategory, filterRegion, filterRevenue])

  const handleCardClick = useCallback((company) => {
    const slug = slugify(company.name)
    if (expandedCompany === slug) {
      setExpandedCompany(null)
    } else {
      setExpandedCompany(slug)
    }
    // On mobile, use bottom sheet
    if (window.innerWidth < 1024) {
      setMobileSheet(company)
    }
  }, [expandedCompany])

  const handleClearFilters = useCallback(() => {
    setFilterCategory('all')
    setFilterRegion('all')
    setFilterRevenue('all')
    setSearchTerm('')
  }, [])

  const filters = [
    {
      key: 'category',
      label: 'Category',
      value: filterCategory,
      options: [{ value: 'all', label: 'All Categories' }, ...allCategories.map(c => ({ value: c, label: c }))],
    },
    {
      key: 'region',
      label: 'HQ Region',
      value: filterRegion,
      options: [{ value: 'all', label: 'All Regions' }, ...allRegions.map(r => ({ value: r, label: r }))],
    },
    {
      key: 'revenue',
      label: 'Revenue',
      value: filterRevenue,
      options: revenueRanges,
    },
  ]

  const handleFilterChange = useCallback((key, value) => {
    if (key === 'category') setFilterCategory(value)
    if (key === 'region') setFilterRegion(value)
    if (key === 'revenue') setFilterRevenue(value)
  }, [])

  return (
    loading ? (
      <div className="min-h-screen bg-surface p-3 sm:p-4 lg:p-6 max-w-7xl mx-auto space-y-6">
        <PageHeader title="Competitive Intelligence" subtitle="Loading companies\u2026" />
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
    ) : (
    <div className="min-h-screen bg-surface p-3 sm:p-4 lg:p-6 max-w-7xl mx-auto">
      {/* Page Header */}
      <PageHeader
        title="Competitive Intelligence"
        subtitle={`${totalCompanies} companies tracked \u00b7 $${totalRevenue.toFixed(0)}B+ combined revenue \u00b7 Data as of March 2026`}
        breadcrumbs={[
          { label: 'Command Centre', to: '/' },
          { label: 'Companies' },
        ]}
      />
      <SubPageNav group="intelligence" />

      {/* ── TIER 1: Executive Metrics ── */}
      <BentoGrid className="mb-6">
        <BentoGrid.Hero>
          <MetricCard
            label="Companies Tracked"
            value={String(totalCompanies)}
            subtitle={`$${totalRevenue.toFixed(0)}B+ combined revenue \u00b7 Data as of March 2026`}
            icon={Building2}
            sparkData={COMPANIES.slice(0, 5).map((c, i) => ({ v: parseRevenue(c.revenue) }))}
          />
        </BentoGrid.Hero>
        <MetricCard
          label="Avg Operating Margin"
          value={`${avgMargin}%`}
          subtitle="FY 2025 average"
          icon={BarChart3}
          direction="up"
        />
        <MetricCard
          label="Highest Growth"
          value={highestGrowth ? highestGrowth.revenueGrowth : '\u2014'}
          subtitle={highestGrowth ? highestGrowth.name : ''}
          icon={TrendingUp}
          direction="up"
          onClick={() => highestGrowth && handleCardClick(highestGrowth)}
        />
        <MetricCard
          label="Most Acquisitive"
          value={mostMACompany ? `${mostMACompany.maTimeline.filter(m => m.type === 'acquisition').length} deals` : '\u2014'}
          subtitle={mostMACompany ? mostMACompany.name : ''}
          icon={Briefcase}
          onClick={() => mostMACompany && handleCardClick(mostMACompany)}
        />
        <MetricCard
          label="White Space Categories"
          value={String(Object.keys(WHITE_SPACE).length)}
          subtitle="Categories with low major-company presence"
          icon={Target}
          direction="up"
        />
      </BentoGrid>

      {/* Search bar — prominent */}
      <div className="relative mb-4">
        <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search companies, brands, or headquarters\u2026"
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

      {/* Filter bar */}
      <FilterBar
        filters={filters}
        onFilterChange={handleFilterChange}
        onClear={handleClearFilters}
        className="mb-6"
      />

      {/* ── Company Cards Grid (Tier 1) ── */}
      <BentoGrid className="mb-6">
        {filtered.map((company) => {
          const slug = slugify(company.name)
          const isExpanded = expandedCompany === slug
          const isHighlighted = highlightedCompany === slug

          return (
            <React.Fragment key={slug}>
              <CompanyCardTier1
                company={company}
                onClick={() => handleCardClick(company)}
                isHighlighted={isHighlighted}
              />

              {/* Tier 2 — expanded inline (desktop only) */}
              {isExpanded && (
                <BentoGrid.Full>
                  <CompanyTier2
                    company={company}
                    onClose={() => setExpandedCompany(null)}
                    onViewFull={() => {
                      setTier3Company(company)
                      setExpandedCompany(null)
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
          <Building2 size={32} className="mx-auto text-gray-300 mb-3" />
          <p className="text-sm text-gray-400">No companies match your search.</p>
          <button
            onClick={handleClearFilters}
            className="mt-2 text-xs text-navy hover:text-navy/70 font-medium"
          >
            Clear all filters
          </button>
        </div>
      )}

      {/* ── White Space Analysis (DrillDown) ── */}
      <WhiteSpaceSection />

      {/* ── TIER 3: Full Deep Dive Modal ── */}
      {tier3Company && (
        <CompanyTier3
          company={tier3Company}
          onClose={() => setTier3Company(null)}
        />
      )}

      {/* ── Mobile Bottom Sheet (Tier 2) ── */}
      <BottomSheet
        open={!!mobileSheet}
        onClose={() => setMobileSheet(null)}
        title={mobileSheet ? mobileSheet.name : ''}
      >
        {mobileSheet && (
          <div className="space-y-4">
            <p className="text-xs text-gray-600 leading-relaxed">{mobileSheet.description}</p>

            <div className="grid grid-cols-2 gap-2">
              <div className="bg-gray-50 rounded-lg p-2.5 text-center">
                <div className="text-xs text-gray-500 uppercase">Revenue</div>
                <div className="text-sm font-bold text-navy">{mobileSheet.revenue}</div>
              </div>
              <div className="bg-gray-50 rounded-lg p-2.5 text-center">
                <div className="text-xs text-gray-500 uppercase">Growth</div>
                <div className={`text-sm font-bold ${mobileSheet.revenueGrowth && mobileSheet.revenueGrowth.startsWith('+') ? 'text-emerald-600' : 'text-red-500'}`}>
                  {mobileSheet.revenueGrowth}
                </div>
              </div>
            </div>

            {mobileSheet.keyBrands && (
              <div>
                <SectionHeader size="sm">Key Brands</SectionHeader>
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {mobileSheet.keyBrands.slice(0, 8).map((b, i) => (
                    <EntityLink
                      key={i}
                      type="brand"
                      id={slugify(b)}
                      label={b}
                      className="px-2 py-0.5 bg-gray-100 rounded-full text-[10px] font-medium no-underline"
                    />
                  ))}
                </div>
              </div>
            )}

            {mobileSheet.howToCompeteAgainst && (
              <div>
                <SectionHeader size="sm">How to Compete</SectionHeader>
                <div className="space-y-2 mt-2">
                  {mobileSheet.howToCompeteAgainst.slice(0, 3).map((s, i) => (
                    <div key={i} className="bg-gray-50 rounded-lg p-2.5">
                      <div className="font-semibold text-navy text-xs mb-0.5">{s.strategy}</div>
                      <p className="text-xs text-gray-600 leading-relaxed">{s.detail}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <button
              onClick={() => {
                setMobileSheet(null)
                setTier3Company(mobileSheet)
              }}
              className="w-full py-2.5 bg-navy text-white rounded-xl text-xs font-medium"
            >
              View Full Profile
            </button>
          </div>
        )}
      </BottomSheet>
    </div>
    )
  )
}
