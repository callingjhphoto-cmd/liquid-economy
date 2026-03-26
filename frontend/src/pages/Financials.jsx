import React, { useState, useMemo, useEffect } from 'react'
import {
  LineChart, Line, BarChart, Bar, AreaChart, Area,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  Legend, ReferenceLine, ComposedChart
} from 'recharts'
import {
  DollarSign, TrendingUp, TrendingDown, ExternalLink, FileText,
  Building2, AlertTriangle, Package, BarChart3, ChevronDown, ChevronUp,
  Calendar, BookOpen, ArrowUpRight
} from 'lucide-react'
import {
  Card, MetricCard, PageHeader, SectionHeader, BentoGrid, ChartCard,
  Badge, SkeletonCard, SubPageNav, BottomSheet
} from '../components/ui'
import { CHART_COLORS, CATEGORICAL } from '../data/chartColors'
import {
  FINANCIAL_COMPANIES, COMBINED_INVENTORY, AGGREGATE_DEPLETION_GAP
} from '../data/financialsData'

/* ── Helpers ── */
const fmtB = (v, cur) => {
  if (v == null) return '\u2014'
  if (v >= 1) return `${cur}${v.toFixed(1)}B`
  return `${cur}${(v * 1000).toFixed(0)}M`
}

/* ── Aggregate Stats ── */
const totalInventory = FINANCIAL_COMPANIES.reduce((s, c) => s + c.metrics.inventory.totalNum, 0)
const totalMarketCap = '\u00a3125B+'
const avgDividend = (FINANCIAL_COMPANIES.reduce((s, c) => s + parseFloat(c.metrics.dividendYield), 0) / FINANCIAL_COMPANIES.length).toFixed(1)

/* ══════════════════════════════════════
   COMPANY CARD
   ══════════════════════════════════════ */
function CompanyCard({ company, isExpanded, onToggle }) {
  const m = company.metrics
  const isGrowing = m.organicGrowthDir === 'up'

  return (
    <Card className="overflow-hidden">
      {/* Header */}
      <button
        onClick={onToggle}
        className="w-full text-left touch-manipulation"
      >
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
              style={{ backgroundColor: company.color }}
            >
              {company.name.charAt(0)}
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-sm text-navy">{company.name}</span>
                <Badge variant="blue" size="sm">{company.ticker}</Badge>
              </div>
              <span className="text-xs text-gray-500">FY ends {company.fyEnd} | {company.exchange}</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {isExpanded ? <ChevronUp size={16} className="text-gray-400" /> : <ChevronDown size={16} className="text-gray-400" />}
          </div>
        </div>

        {/* Quick metrics row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div>
            <span className="text-label text-gray-500 uppercase tracking-wide block">Stock Price</span>
            <span className="text-sm font-bold text-navy">{company.stockPrice}</span>
          </div>
          <div>
            <span className="text-label text-gray-500 uppercase tracking-wide block">Market Cap</span>
            <span className="text-sm font-bold text-navy">{company.marketCap}</span>
          </div>
          <div>
            <span className="text-label text-gray-500 uppercase tracking-wide block">Last Report</span>
            <span className="text-sm font-semibold text-navy">{company.lastReportDate}</span>
          </div>
          <div>
            <span className="text-label text-gray-500 uppercase tracking-wide block">Organic Growth</span>
            <span className={`text-sm font-bold flex items-center gap-0.5 ${isGrowing ? 'text-emerald-600' : 'text-red-500'}`}>
              {isGrowing ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
              {m.organicGrowth}
            </span>
          </div>
        </div>
      </button>

      {/* Expanded Content */}
      {isExpanded && (
        <div className="mt-4 pt-4 border-t border-gray-100 animate-fadeIn space-y-5">
          {/* Reports Timeline */}
          <div>
            <SectionHeader size="sm">Earnings Timeline</SectionHeader>
            <div className="flex flex-wrap gap-2">
              {company.reports.map((r, i) => (
                <a
                  key={i}
                  href={company.irUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors no-underline touch-manipulation ${
                    r.type === 'annual'
                      ? 'bg-navy/5 border-navy/20 text-navy hover:bg-navy/10'
                      : r.type === 'half'
                      ? 'bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100'
                      : 'bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <FileText size={11} />
                  <span>{r.label}</span>
                  <span className="text-[10px] opacity-60">{r.date}</span>
                  <ExternalLink size={9} className="opacity-40" />
                </a>
              ))}
            </div>
          </div>

          {/* Key Metrics Grid */}
          <div>
            <SectionHeader size="sm">Key Metrics</SectionHeader>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              <MetricMini label="Revenue (Last 4)" value={company.quarterlyRevenue.map(q => `${q.period}: ${fmtB(q.value, company.currency)}`).join(' | ')} wide />
              <MetricMini label="Inventory (Total)" value={m.inventory.total} />
              <MetricMini label="Ageing Stock" value={m.inventory.ageing} />
              <MetricMini label="Finished Goods" value={m.inventory.finishedGoods} />
              <MetricMini
                label="Volume vs Value"
                value={`Vol ${m.volumeSplit.volume > 0 ? '+' : ''}${m.volumeSplit.volume}% / Val +${m.volumeSplit.value}%`}
              />
              <MetricMini label="Net Debt" value={m.netDebt} />
              <MetricMini label="Net Debt/EBITDA" value={m.netDebtToEbitda} />
              <MetricMini label="Dividend Yield" value={m.dividendYield} />
            </div>
          </div>

          {/* Revenue Chart */}
          <div>
            <SectionHeader size="sm">Revenue Trend</SectionHeader>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={company.quarterlyRevenue} accessibilityLayer>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="period" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} tickFormatter={v => `${company.currency}${v}B`} />
                  <Tooltip
                    formatter={(v) => [`${company.currency}${v}B`, 'Revenue']}
                    contentStyle={{ borderRadius: 8, border: '1px solid #e5e7eb', fontSize: 12 }}
                  />
                  <Bar dataKey="value" fill={company.color} radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* IR Link */}
          <a
            href={company.irUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs text-navy hover:text-navy-light font-medium no-underline"
          >
            <BookOpen size={12} />
            View Investor Relations
            <ArrowUpRight size={10} />
          </a>
        </div>
      )}
    </Card>
  )
}

/* Mini Metric for the expanded grid */
function MetricMini({ label, value, wide = false }) {
  return (
    <div className={`bg-gray-50 rounded-lg px-3 py-2 ${wide ? 'col-span-2 sm:col-span-3 lg:col-span-6' : ''}`}>
      <span className="text-label text-gray-500 uppercase tracking-wide block mb-0.5">{label}</span>
      <span className="text-xs font-semibold text-navy break-words">{value}</span>
    </div>
  )
}

/* ══════════════════════════════════════
   INVENTORY TRACKER CHART (Hero)
   ══════════════════════════════════════ */
function InventoryTrackerChart() {
  // Build combined data with per-company breakdowns
  const data = COMBINED_INVENTORY.map(row => {
    const entry = { year: row.year, total: row.total, dangerZone: row.dangerZone }
    FINANCIAL_COMPANIES.forEach(c => {
      const hist = c.inventoryHistory.find(h => h.year === row.year)
      if (hist) entry[c.id] = hist.value
    })
    return entry
  })

  return (
    <ChartCard
      title="Global Spirits Inventory Tracker"
      subtitle="Combined inventory across 5 major public companies (2020\u20132025). The $22B overhang."
      height={320}
      source="Company annual reports, FT analysis"
      sourceUrl="https://www.ft.com"
    >
      <ComposedChart data={data} accessibilityLayer>
        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
        <XAxis dataKey="year" tick={{ fontSize: 11 }} />
        <YAxis tick={{ fontSize: 11 }} tickFormatter={v => `$${v}B`} domain={[0, 25]} />
        <Tooltip
          contentStyle={{ borderRadius: 8, border: '1px solid #e5e7eb', fontSize: 12 }}
          formatter={(v, name) => {
            if (name === 'dangerZone') return [`$${v}B`, 'Danger Threshold']
            if (name === 'total') return [`$${v}B`, 'Total Inventory']
            const company = FINANCIAL_COMPANIES.find(c => c.id === name)
            return [`$${v}B`, company ? company.name : name]
          }}
        />
        <Legend wrapperStyle={{ fontSize: 11 }} />

        {/* Danger zone reference */}
        <ReferenceLine y={18} stroke="#DC2626" strokeDasharray="8 4" strokeWidth={2} label={{ value: 'Danger Zone: $18B', position: 'right', fill: '#DC2626', fontSize: 11 }} />

        {/* Stacked area for each company */}
        {FINANCIAL_COMPANIES.map((c, i) => (
          <Area
            key={c.id}
            type="monotone"
            dataKey={c.id}
            stackId="1"
            stroke={c.color}
            fill={c.color}
            fillOpacity={0.15 + (i * 0.05)}
            strokeWidth={1.5}
            name={c.name}
          />
        ))}

        {/* Total line overlay */}
        <Line
          type="monotone"
          dataKey="total"
          stroke="#1B2A4A"
          strokeWidth={3}
          dot={{ fill: '#1B2A4A', r: 4 }}
          name="Total"
        />
      </ComposedChart>
    </ChartCard>
  )
}

/* ══════════════════════════════════════
   DEPLETION VS SHIPMENT CHART
   ══════════════════════════════════════ */
function DepletionShipmentChart() {
  const [selectedCompany, setSelectedCompany] = useState('aggregate')

  const data = selectedCompany === 'aggregate'
    ? AGGREGATE_DEPLETION_GAP
    : FINANCIAL_COMPANIES.find(c => c.id === selectedCompany)?.depletionVsShipment || []

  const gapData = data.map(d => ({
    ...d,
    gap: d.shipments - d.depletions,
  }))

  return (
    <ChartCard
      title="Depletion vs Shipment Gap"
      subtitle="When shipments exceed depletions, inventory builds. Indexed to 2020 = 100."
      height={280}
      source="Company reports, IWSR, Nielsen IQ"
      action={
        <select
          value={selectedCompany}
          onChange={e => setSelectedCompany(e.target.value)}
          className="text-xs border border-gray-200 rounded-lg px-2 py-1.5 bg-white text-navy font-medium focus:ring-2 focus:ring-gold/50"
        >
          <option value="aggregate">All Companies</option>
          {FINANCIAL_COMPANIES.map(c => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>
      }
    >
      <ComposedChart data={gapData} accessibilityLayer>
        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
        <XAxis dataKey="year" tick={{ fontSize: 11 }} />
        <YAxis tick={{ fontSize: 11 }} domain={[85, 125]} />
        <Tooltip
          contentStyle={{ borderRadius: 8, border: '1px solid #e5e7eb', fontSize: 12 }}
          formatter={(v, name) => {
            if (name === 'gap') return [v > 0 ? `+${v} pts` : `${v} pts`, 'Gap (Overshipping)']
            return [v, name === 'shipments' ? 'Shipments' : 'Depletions']
          }}
        />
        <Legend wrapperStyle={{ fontSize: 11 }} />

        {/* Gap area (danger zone) */}
        <Area
          type="monotone"
          dataKey="gap"
          fill="#FEE2E2"
          stroke="transparent"
          name="Inventory Build"
          fillOpacity={0.6}
        />

        <Line type="monotone" dataKey="shipments" stroke={CHART_COLORS.rose} strokeWidth={2.5} dot={{ fill: CHART_COLORS.rose, r: 4 }} name="Shipments" />
        <Line type="monotone" dataKey="depletions" stroke={CHART_COLORS.emerald} strokeWidth={2.5} dot={{ fill: CHART_COLORS.emerald, r: 4 }} name="Depletions" />

        <ReferenceLine y={100} stroke="#94a3b8" strokeDasharray="4 4" strokeWidth={1} />
      </ComposedChart>
    </ChartCard>
  )
}

/* ══════════════════════════════════════
   MAIN PAGE
   ══════════════════════════════════════ */
export default function Financials() {
  const [expandedCompany, setExpandedCompany] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 300)
    return () => clearTimeout(timer)
  }, [])

  const toggleCompany = (id) => {
    setExpandedCompany(prev => prev === id ? null : id)
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="h-12 bg-gray-100 rounded-xl animate-pulse w-1/3" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => <SkeletonCard key={i} />)}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <PageHeader
        title="Financial Reports"
        subtitle="Earnings, inventory tracking, and financial intelligence across 5 publicly traded spirits companies."
        action={
          <Badge variant="blue" size="sm">
            <Calendar size={10} className="mr-1" />
            Updated Mar 2026
          </Badge>
        }
      />
      <SubPageNav group="reports" />

      {/* ── Hero Metrics ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          label="Combined Inventory"
          value={`$${totalInventory.toFixed(1)}B`}
          change="The $22B overhang"
          direction="down"
          icon={Package}
          subtitle="Across 5 major public companies"
        />
        <MetricCard
          label="Companies Tracked"
          value={FINANCIAL_COMPANIES.length}
          icon={Building2}
          subtitle="Diageo, Pernod, Campari, BF, R\u00e9my"
        />
        <MetricCard
          label="Avg Dividend Yield"
          value={`${avgDividend}%`}
          direction="up"
          icon={DollarSign}
          subtitle="Sector average"
        />
        <MetricCard
          label="Inventory Alert"
          value="Elevated"
          icon={AlertTriangle}
          subtitle="Above $18B danger threshold since 2022"
          change="4 yrs above threshold"
          direction="down"
        />
      </div>

      {/* ── Inventory Tracker (Hero Chart) ── */}
      <InventoryTrackerChart />

      {/* ── Depletion vs Shipment ── */}
      <DepletionShipmentChart />

      {/* ── Company Cards ── */}
      <div>
        <SectionHeader size="lg" subtitle="Click any company to view earnings timeline, key metrics, and revenue trends.">
          Company Financial Profiles
        </SectionHeader>
        <div className="space-y-4">
          {FINANCIAL_COMPANIES.map(company => (
            <CompanyCard
              key={company.id}
              company={company}
              isExpanded={expandedCompany === company.id}
              onToggle={() => toggleCompany(company.id)}
            />
          ))}
        </div>
      </div>

      {/* ── Sources ── */}
      <Card className="bg-gray-50 border-gray-200">
        <SectionHeader size="sm">Sources & Methodology</SectionHeader>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-gray-600">
          <div>
            <p className="font-medium text-navy mb-1">Financial Data</p>
            <ul className="space-y-0.5 list-disc list-inside">
              <li>Diageo plc Annual Report & SEC 20-F Filing</li>
              <li>Pernod Ricard Universal Registration Document</li>
              <li>Campari Group Annual Report & Investor Presentations</li>
              <li>Brown-Forman 10-K and 10-Q SEC Filings</li>
              <li>R{'\u00e9'}my Cointreau Document de R{'\u00e9'}f{'\u00e9'}rence</li>
            </ul>
          </div>
          <div>
            <p className="font-medium text-navy mb-1">Market Intelligence</p>
            <ul className="space-y-0.5 list-disc list-inside">
              <li>IWSR Global Spirits Database</li>
              <li>Nielsen IQ Off-Trade Panel Data</li>
              <li>Financial Times — Spirits Inventory Analysis</li>
              <li>Euromonitor International — Alcoholic Drinks</li>
              <li>Company investor presentations & earnings calls</li>
            </ul>
          </div>
        </div>
        <p className="text-[10px] text-gray-400 mt-3">
          Stock prices and market caps are indicative and may not reflect real-time values.
          Inventory figures converted to USD at prevailing exchange rates for comparability.
          Depletion vs shipment data indexed to 2020 baseline = 100.
        </p>
      </Card>
    </div>
  )
}
