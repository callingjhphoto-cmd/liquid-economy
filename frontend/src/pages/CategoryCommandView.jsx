import React, { useState, useMemo } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import {
  ArrowLeft, TrendingUp, TrendingDown, Package, DollarSign, Globe,
  CloudRain, MapPin, ShoppingBag, AlertTriangle, Target, Zap,
  BarChart3, ArrowUpRight, ArrowDownRight, ChevronRight
} from 'lucide-react'
import {
  AreaChart, Area, BarChart, Bar, LineChart, Line, ResponsiveContainer,
  XAxis, YAxis, Tooltip, CartesianGrid, Cell
} from 'recharts'
import { CATEGORY_DATA, CATEGORY_KEYS } from '../data/categoryCommandData'
import {
  Card, AccentCard,
  MetricCard,
  PageHeader,
  SectionHeader, SectionLabel,
  BentoGrid,
  DrillDown,
  DataTable,
  SourceList,
  Badge,
  TabGroup,
  EntityLink,
} from '../components/ui'

/* ================================================================
   MICRO COMPONENTS
   ================================================================ */

function Sparkline({ data, color = '#22c55e', height = 40 }) {
  const chartData = data.map((v, i) => ({ i, v: typeof v === 'object' ? v.v : v }))
  return (
    <ResponsiveContainer width="100%" height={height}>
      <AreaChart data={chartData} margin={{ top: 2, right: 2, bottom: 0, left: 2 }}>
        <defs>
          <linearGradient id={`sg-${color.replace('#', '')}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity={0.2} />
            <stop offset="100%" stopColor={color} stopOpacity={0.02} />
          </linearGradient>
        </defs>
        <Area type="monotone" dataKey="v" stroke={color} strokeWidth={1.5} fill={`url(#sg-${color.replace('#', '')})`} dot={false} isAnimationActive={false} />
      </AreaChart>
    </ResponsiveContainer>
  )
}

function AlertDot({ level }) {
  const colors = { red: 'bg-red-500', amber: 'bg-amber-400', green: 'bg-green-500' }
  return <span className={`inline-block w-2 h-2 rounded-full ${colors[level] || 'bg-gray-300'}`} />
}

function ChannelBar({ channels }) {
  const items = [
    { key: 'onTrade', label: 'On-Trade', color: '#1e3a5f', pct: channels.onTrade },
    { key: 'offTrade', label: 'Off-Trade', color: '#C9A96E', pct: channels.offTrade },
    { key: 'eCommerce', label: 'E-Commerce', color: '#3b82f6', pct: channels.eCommerce },
    { key: 'travelRetail', label: 'Travel Retail', color: '#8b5cf6', pct: channels.travelRetail },
  ]
  return (
    <div>
      <div className="flex h-3 rounded-full overflow-hidden mb-1.5">
        {items.map(it => <div key={it.key} style={{ width: `${it.pct}%`, backgroundColor: it.color }} />)}
      </div>
      <div className="flex flex-wrap gap-3">
        {items.map(it => (
          <div key={it.key} className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: it.color }} />
            <span className="text-[9px] text-gray-500">{it.label} {it.pct}%</span>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ================================================================
   TIER 2 SECTION COMPONENTS (Expanded via DrillDown)
   ================================================================ */

function SupplyChainSection({ cat }) {
  return (
    <div className="space-y-3">
      <div className="space-y-2">
        {cat.supplyChain.map((item, i) => (
          <div key={i} className="flex items-center gap-3 p-2 bg-gray-50 rounded-lg">
            <AlertDot level={item.alert} />
            <div className="flex-1 min-w-0">
              <div className="text-xs font-medium text-navy">{item.input}</div>
              <div className="text-[10px] text-gray-500">{item.value}</div>
            </div>
            <div className="w-20 h-5 flex-shrink-0">
              <Sparkline data={item.trend} color={item.dir === 'up' ? '#ef4444' : '#22c55e'} height={20} />
            </div>
            <span className={`text-[10px] font-bold flex-shrink-0 w-12 text-right ${item.dir === 'up' ? 'text-red-500' : 'text-emerald-600'}`}>{item.change}</span>
          </div>
        ))}
      </div>
      <Card className="bg-navy/5 border-navy/10">
        <SectionLabel>COGS Estimate (per bottle, UK off-trade)</SectionLabel>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-2">
          {[
            { label: 'Raw Material', val: cat.cogsEstimate.raw },
            { label: 'Glass', val: cat.cogsEstimate.glass },
            { label: 'Freight', val: cat.cogsEstimate.freight },
            { label: 'Duty', val: cat.cogsEstimate.duty },
            { label: 'Production', val: cat.cogsEstimate.production },
            { label: 'Overheads', val: cat.cogsEstimate.overheads },
            { label: 'Closure', val: cat.cogsEstimate.closure },
          ].map((c, i) => (
            <div key={i} className="text-center p-1.5 bg-white rounded-lg">
              <div className="text-xs font-bold text-navy">{'\u00a3'}{c.val.toFixed(2)}</div>
              <div className="text-[8px] text-gray-500">{c.label}</div>
            </div>
          ))}
        </div>
        <div className="text-center mt-2 pt-2 border-t border-gray-200">
          <span className="text-sm font-bold text-navy">Total: {'\u00a3'}{cat.cogsEstimate.total.toFixed(2)}</span>
          <span className="text-xs text-gray-500 ml-3">Gross Margin: {cat.cogsEstimate.margin}%</span>
        </div>
      </Card>
    </div>
  )
}

function PricingSection({ cat }) {
  const tiers = [
    { label: 'High-End / Ultra-Premium', data: cat.pricing.highEnd, accent: 'border-l-gold' },
    { label: 'Mid-Tier / Premium', data: cat.pricing.midTier, accent: 'border-l-blue-400' },
    { label: 'Value / Standard', data: cat.pricing.value, accent: 'border-l-gray-400' },
  ]
  return (
    <div className="space-y-4">
      {tiers.map((tier, i) => (
        <div key={i}>
          <SectionLabel>{tier.label}</SectionLabel>
          <div className="space-y-1">
            {tier.data.map((b, j) => (
              <div key={j} className={`flex items-center justify-between p-2 bg-gray-50 rounded border-l-2 ${tier.accent}`}>
                <div>
                  <span className="text-xs font-medium text-navy">{b.brand}</span>
                  <span className="text-[9px] text-gray-400 ml-2">{b.segment}</span>
                </div>
                <span className="text-xs font-bold text-navy">{b.price}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
      <div className="p-3 bg-emerald-50 rounded-lg border border-emerald-100">
        <div className="text-[9px] font-bold text-emerald-700 uppercase">White Space Opportunity</div>
        <p className="text-xs text-emerald-800 mt-1">{cat.pricing.whiteSpace}</p>
      </div>
    </div>
  )
}

function MarketsSection({ cat }) {
  return (
    <div className="space-y-1.5">
      {cat.topMarkets.map((m, i) => (
        <div key={i} className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
          <div className="w-5 text-center text-[10px] font-bold text-gray-400">#{i + 1}</div>
          <div className="flex-1 min-w-0">
            <div className="text-xs font-medium text-navy">{m.country}</div>
            <div className="text-[10px] text-gray-500 truncate">{m.note}</div>
          </div>
          <div className="text-right flex-shrink-0">
            <div className={`text-xs font-bold ${parseFloat(m.growth) > 0 ? 'text-emerald-600' : 'text-red-500'}`}>{m.growth}</div>
            <div className="text-[9px] text-gray-400">{m.share} share</div>
          </div>
        </div>
      ))}
    </div>
  )
}

function ClimateRiskSection({ cat }) {
  if (!cat.climate.historicalYield.length) {
    return (
      <div>
        <p className="text-xs text-gray-500">{cat.climate.note}</p>
        <div className="mt-2 inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-1 rounded-full">
          Risk Level: {cat.climate.riskLevel}
        </div>
      </div>
    )
  }
  const riskColor = cat.climate.riskLevel === 'High' ? 'text-red-700 bg-red-50' : cat.climate.riskLevel === 'Medium' ? 'text-amber-700 bg-amber-50' : 'text-emerald-700 bg-emerald-50'
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
        <div className="p-2 bg-gray-50 rounded-lg">
          <div className="text-[9px] text-gray-500">Region</div>
          <div className="text-[11px] font-medium text-navy">{cat.climate.region}</div>
        </div>
        <div className="p-2 bg-gray-50 rounded-lg">
          <div className="text-[9px] text-gray-500">Crop</div>
          <div className="text-[11px] font-medium text-navy">{cat.climate.crop}</div>
        </div>
        <div className={`p-2 rounded-lg ${riskColor}`}>
          <div className="text-[9px]">Risk Level</div>
          <div className="text-xs font-bold">{cat.climate.riskLevel}</div>
        </div>
      </div>
      <div className="h-20">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={cat.climate.historicalYield} margin={{ top: 2, right: 5, bottom: 0, left: 5 }}>
            <XAxis dataKey="yr" tick={{ fontSize: 8 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 8 }} axisLine={false} tickLine={false} width={25} />
            <Tooltip contentStyle={{ fontSize: 10 }} />
            <Line type="monotone" dataKey="v" stroke="#0ea5e9" strokeWidth={2} dot={{ r: 2 }} isAnimationActive={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <p className="text-[10px] text-gray-500">{cat.climate.note}</p>
    </div>
  )
}

function VenueSignalsSection({ cat }) {
  if (!cat.venueSignals.length) return <p className="text-xs text-gray-500">No venue signals available for this category.</p>
  return (
    <div className="space-y-1.5">
      {cat.venueSignals.map((v, i) => (
        <div key={i} className="p-2 bg-gray-50 rounded-lg">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-navy">{v.venue}</span>
            <span className="text-[9px] font-bold text-gold">{v.rank}</span>
          </div>
          <p className="text-[10px] text-gray-500 mt-0.5">{v.signal}</p>
        </div>
      ))}
    </div>
  )
}

/* ================================================================
   TIER 3 — Full Data Tables
   ================================================================ */

function FullPricingTable({ cat }) {
  const allBrands = [
    ...cat.pricing.highEnd.map(b => ({ ...b, tier: 'High-End' })),
    ...cat.pricing.midTier.map(b => ({ ...b, tier: 'Mid-Tier' })),
    ...cat.pricing.value.map(b => ({ ...b, tier: 'Value' })),
  ]
  return (
    <DataTable
      columns={[
        { key: 'brand', label: 'Brand' },
        { key: 'tier', label: 'Tier' },
        { key: 'segment', label: 'Segment' },
        { key: 'price', label: 'Price', align: 'right' },
      ]}
      data={allBrands}
      searchable
      searchPlaceholder="Search brands\u2026"
      searchKey="brand"
    />
  )
}

function FullSupplyChainTable({ cat }) {
  return (
    <DataTable
      columns={[
        { key: 'input', label: 'Input' },
        { key: 'value', label: 'Current Value' },
        { key: 'change', label: 'Change', align: 'right', render: (v, row) => (
          <span className={`font-semibold ${row.dir === 'up' ? 'text-red-500' : 'text-emerald-600'}`}>{v}</span>
        )},
        { key: 'alert', label: 'Status', render: v => <AlertDot level={v} /> },
      ]}
      data={cat.supplyChain}
    />
  )
}

/* ================================================================
   MAIN PAGE — Three-Tier Progressive Disclosure
   NOTE: Heavy overlap with CategoryIntelligence.jsx. Future merge
   consideration recommended for consolidation.
   ================================================================ */

export default function CategoryCommandView() {
  const { categoryId } = useParams()
  const navigate = useNavigate()
  const cat = CATEGORY_DATA[categoryId]

  if (!cat) {
    return (
      <div className="text-center py-20">
        <h2 className="font-display text-xl font-bold text-navy mb-4">Category not found</h2>
        <p className="text-gray-500 mb-4">Select a category from the Command Centre</p>
        <Link to="/" className="text-navy hover:underline">Back to Command Centre</Link>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* HEADER */}
      <PageHeader
        title={cat.name}
        subtitle="Unified Intelligence View \u2014 Cross-page composite"
        breadcrumbs={[
          { label: 'Command Centre', to: '/' },
          { label: 'Categories', to: '/categories' },
          { label: cat.name }
        ]}
        action={
          <div className="flex items-center gap-2">
            <button onClick={() => navigate(-1)} className="p-2 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors touch-manipulation">
              <ArrowLeft size={16} className="text-navy" />
            </button>
            {/* Category quick-nav pills */}
            <div className="hidden lg:flex gap-1">
              {CATEGORY_KEYS.map(k => {
                const d = CATEGORY_DATA[k]
                return (
                  <Link key={k} to={`/category/${k}`}
                    className={`text-[9px] font-medium px-2 py-1 rounded-full transition-colors ${k === categoryId ? 'bg-navy text-white' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}>
                    {d.emoji}
                  </Link>
                )
              })}
            </div>
          </div>
        }
      />

      {/* TIER 1: Hero Insight + KPI Cards */}
      <BentoGrid>
        <BentoGrid.Hero>
          <Card className="h-full bg-gradient-to-br from-navy/5 to-gold/5 border-navy/10">
            <SectionLabel>Strategic Insight</SectionLabel>
            <p className="text-sm text-navy leading-relaxed">{cat.keyInsight}</p>
          </Card>
        </BentoGrid.Hero>
        <MetricCard
          label="Market Size"
          value={cat.marketSize}
          icon={BarChart3}
          sparkData={cat.fiveYear.map(d => ({ v: d.v }))}
          direction={cat.dir}
          change={cat.growth}
        />
        <MetricCard
          label="Volume"
          value={cat.volume}
          icon={Package}
          direction={cat.dir}
        />
        <MetricCard
          label="Est. Gross Margin"
          value={`${cat.cogsEstimate.margin}%`}
          subtitle={`Total COGS: \u00a3${cat.cogsEstimate.total.toFixed(2)}/bottle`}
          icon={DollarSign}
          direction="up"
        />
        <MetricCard
          label="Growth Rate"
          value={cat.growth}
          icon={cat.dir === 'up' ? TrendingUp : TrendingDown}
          direction={cat.dir}
        />
      </BentoGrid>

      {/* TIER 1: Channel Distribution (always visible) */}
      <Card>
        <SectionLabel>Channel Distribution</SectionLabel>
        <ChannelBar channels={cat.channels} />
        <div className="mt-3 h-24">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={cat.fiveYear} margin={{ top: 5, right: 5, bottom: 0, left: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
              <XAxis dataKey="yr" tick={{ fontSize: 9 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 9 }} axisLine={false} tickLine={false} width={30} />
              <Tooltip contentStyle={{ fontSize: 10 }} />
              <Area type="monotone" dataKey="v" stroke={cat.dir === 'up' ? '#22c55e' : '#ef4444'} fill={cat.dir === 'up' ? '#22c55e15' : '#ef444415'} strokeWidth={2} dot={{ r: 3 }} isAnimationActive={false} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* TIER 2: Expandable Detail Sections */}
      <DrillDown
        title="Supply Chain Pressure"
        summary={`${cat.supplyChain.filter(s => s.alert === 'red').length} red alerts, ${cat.supplyChain.filter(s => s.alert === 'amber').length} amber \u2014 Total COGS \u00a3${cat.cogsEstimate.total.toFixed(2)}/bottle`}
      >
        <SupplyChainSection cat={cat} />
      </DrillDown>

      <DrillDown
        title="Competitive Pricing Landscape"
        summary={`${cat.pricing.highEnd.length + cat.pricing.midTier.length + cat.pricing.value.length} brands across 3 tiers`}
      >
        <PricingSection cat={cat} />
      </DrillDown>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <DrillDown
          title="Top Markets"
          summary={`${cat.topMarkets.length} markets \u2014 highest growth: ${cat.topMarkets.reduce((a, b) => parseFloat(a.growth) > parseFloat(b.growth) ? a : b).country}`}
        >
          <MarketsSection cat={cat} />
        </DrillDown>

        <DrillDown
          title="Climate & Yield Risk"
          summary={`Risk: ${cat.climate.riskLevel} \u2014 ${cat.climate.region}`}
        >
          <ClimateRiskSection cat={cat} />
        </DrillDown>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <DrillDown
          title="Venue Signals"
          summary={`${cat.venueSignals.length} signals from World 50 Best Bars`}
        >
          <VenueSignalsSection cat={cat} />
        </DrillDown>

        <DrillDown
          title="POS Quick-Start"
          summary={`Starter from ${cat.posEstimate.starterKit} \u2014 ${cat.posEstimate.leadTime} lead time`}
        >
          <BentoGrid>
            <MetricCard label="Starter Kit" value={cat.posEstimate.starterKit} icon={ShoppingBag} />
            <MetricCard label="Premium Kit" value={cat.posEstimate.premiumKit} icon={ShoppingBag} />
            <MetricCard label="Factory Direct" value={cat.posEstimate.factoryDirect} subtitle="Source locations" icon={Globe} />
            <MetricCard label="Lead Time" value={cat.posEstimate.leadTime} icon={Target} />
          </BentoGrid>
        </DrillDown>
      </div>

      {/* TIER 3: Full Data Tables */}
      <DrillDown
        title="Full Pricing Data"
        summary="Complete brand pricing table \u2014 searchable and sortable"
      >
        <FullPricingTable cat={cat} />
      </DrillDown>

      <DrillDown
        title="Full Supply Chain Data"
        summary="All input costs with trend direction and alert status"
      >
        <FullSupplyChainTable cat={cat} />
      </DrillDown>
    </div>
  )
}
