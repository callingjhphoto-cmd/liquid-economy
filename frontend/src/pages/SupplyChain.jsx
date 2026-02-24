import React, { useState, useEffect } from 'react'
import { Package, Ship, Factory, TrendingUp, TrendingDown, AlertTriangle, Thermometer, BarChart3, Fuel } from 'lucide-react'
import { api } from '../lib/api'

const COGS_DATA = {
  glass_ppi: { label: 'Glass Container PPI', value: 216.38, baseline: '2003=100', change: '+2.1%', trend: 'up', source: 'BLS PCU3272133272130', updated: '2025-12' },
  container_index: { label: 'Drewry WCI (40ft)', value: 3421, unit: '$/40ft', change: '+110%', trend: 'up', source: 'Drewry World Container Index', updated: '2026-02' },
  baltic_dry: { label: 'Baltic Dry Index', value: 2112, unit: 'pts', change: '+34%', trend: 'up', source: 'Baltic Exchange', updated: '2026-02' },
  agave: { label: 'Mexican Agave (SIAP)', value: 8.2, unit: 'MXN/kg', change: '-18%', trend: 'down', source: 'SIAP Mexico', updated: '2026-01' },
  barley: { label: 'Barley (EU Malt)', value: 224, unit: '€/t', change: '+12%', trend: 'up', source: 'Euronext', updated: '2026-02' },
  corn: { label: 'Corn (US #2)', value: 4.82, unit: '$/bu', change: '+6%', trend: 'up', source: 'CBOT', updated: '2026-02' },
  sugarcane: { label: 'Raw Sugar', value: 22.4, unit: '¢/lb', change: '+8%', trend: 'up', source: 'ICE', updated: '2026-02' },
  natural_gas: { label: 'Natural Gas (EU)', value: 48.2, unit: '€/MWh', change: '+15%', trend: 'up', source: 'TTF', updated: '2026-02' },
}

const MARGIN_ALERTS = [
  { brand: 'Corona Extra', company: 'Constellation Brands', severity: 'high', message: 'Glass +2.1% & freight +110% vs flat retail — margin squeeze imminent', category: 'Beer' },
  { brand: 'Hennessy VS', company: 'LVMH', severity: 'medium', message: 'Cognac grape costs +9% while US retail held at $34.99', category: 'Cognac' },
  { brand: 'Johnnie Walker Black', company: 'Diageo', severity: 'medium', message: 'Barley +12% and energy +15% eroding blended scotch margins', category: 'Blended Scotch' },
  { brand: 'Bacardi Superior', company: 'Bacardi', severity: 'low', message: 'Sugarcane +8% partially offset by Caribbean shipping normalisation', category: 'Rum' },
]

const CLIMATE_RISKS = [
  { region: 'France', commodity: 'Wine grapes', impact: '-16% production vs 5yr avg', severity: 'critical' },
  { region: 'California', commodity: 'Wine grapes', impact: '-23% yield due to drought', severity: 'critical' },
  { region: 'Scotland', commodity: 'Malting barley', impact: '-40% in some regions', severity: 'high' },
  { region: 'Caribbean', commodity: 'Sugarcane', impact: 'Erratic rainfall disrupting harvest', severity: 'medium' },
  { region: 'Mexico (Jalisco)', commodity: 'Blue Weber Agave', impact: 'Oversupply cycle — prices falling', severity: 'low' },
]

function CostCard({ label, value, unit, change, trend, source, updated }) {
  const isUp = trend === 'up'
  return (
    <div className="bg-white rounded-xl border border-gray-100 p-4 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs text-gray-400 uppercase tracking-wide font-medium">{label}</span>
        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${isUp ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-600'}`}>
          {change}
        </span>
      </div>
      <div className="flex items-baseline gap-1">
        <span className="text-2xl font-bold text-navy">{typeof value === 'number' ? value.toLocaleString() : value}</span>
        {unit && <span className="text-sm text-gray-400">{unit}</span>}
      </div>
      <div className="flex items-center justify-between mt-2">
        <span className="text-[10px] text-gray-300">{source}</span>
        <span className="text-[10px] text-gray-300">{updated}</span>
      </div>
    </div>
  )
}

function MarginAlert({ brand, company, severity, message, category }) {
  const colors = {
    high: 'border-l-red-500 bg-red-50/30',
    medium: 'border-l-amber-500 bg-amber-50/30',
    low: 'border-l-blue-500 bg-blue-50/30',
  }
  const badges = {
    high: 'bg-red-100 text-red-700',
    medium: 'bg-amber-100 text-amber-700',
    low: 'bg-blue-100 text-blue-700',
  }
  return (
    <div className={`border-l-4 rounded-r-lg p-4 ${colors[severity]}`}>
      <div className="flex items-center justify-between mb-1">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-navy text-sm">{brand}</span>
          <span className="text-xs text-gray-400">{company}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded">{category}</span>
          <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${badges[severity]}`}>{severity}</span>
        </div>
      </div>
      <p className="text-sm text-gray-600">{message}</p>
    </div>
  )
}

export default function SupplyChain() {
  const [activeTab, setActiveTab] = useState('cogs')

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-display font-bold text-navy">Supply Chain & COGS Matrix</h1>
          <p className="text-gray-400 text-sm mt-1">Real-time input cost tracking, margin compression alerts, and climate risk monitoring</p>
        </div>
        <div className="flex gap-1 bg-gray-100 rounded-lg p-1">
          {['cogs', 'margins', 'climate'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${activeTab === tab ? 'bg-white text-navy shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
            >
              {tab === 'cogs' ? 'Input Costs' : tab === 'margins' ? 'Margin Alerts' : 'Climate Risk'}
            </button>
          ))}
        </div>
      </div>

      {activeTab === 'cogs' && (
        <div>
          {/* Packaging & Freight */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <Package className="w-4 h-4 text-gold" />
              <h2 className="text-sm font-semibold text-navy uppercase tracking-wide">Packaging & Freight</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <CostCard {...COGS_DATA.glass_ppi} />
              <CostCard {...COGS_DATA.container_index} />
              <CostCard {...COGS_DATA.baltic_dry} />
            </div>
          </div>

          {/* Agricultural Inputs */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <Factory className="w-4 h-4 text-gold" />
              <h2 className="text-sm font-semibold text-navy uppercase tracking-wide">Agricultural Raw Materials</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <CostCard {...COGS_DATA.agave} />
              <CostCard {...COGS_DATA.barley} />
              <CostCard {...COGS_DATA.corn} />
              <CostCard {...COGS_DATA.sugarcane} />
            </div>
          </div>

          {/* Energy */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <Fuel className="w-4 h-4 text-gold" />
              <h2 className="text-sm font-semibold text-navy uppercase tracking-wide">Energy & Manufacturing</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <CostCard {...COGS_DATA.natural_gas} />
              <div className="bg-white rounded-xl border border-gray-100 p-4 col-span-2">
                <h3 className="text-xs text-gray-400 uppercase tracking-wide font-medium mb-3">Composite COGS Pressure Index</h3>
                <div className="flex items-center gap-4">
                  <div className="flex-1 bg-gray-50 rounded-lg p-4 text-center">
                    <div className="text-3xl font-bold text-red-500">7.2%</div>
                    <div className="text-xs text-gray-400 mt-1">Weighted Input Cost Rise (YoY)</div>
                  </div>
                  <div className="flex-1 bg-gray-50 rounded-lg p-4 text-center">
                    <div className="text-3xl font-bold text-amber-500">3.1%</div>
                    <div className="text-xs text-gray-400 mt-1">Avg Retail Price Increase</div>
                  </div>
                  <div className="flex-1 bg-gray-50 rounded-lg p-4 text-center">
                    <div className="text-3xl font-bold text-red-600">-4.1pp</div>
                    <div className="text-xs text-gray-400 mt-1">Estimated Margin Compression</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'margins' && (
        <div>
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle className="w-4 h-4 text-red-500" />
            <h2 className="text-sm font-semibold text-navy uppercase tracking-wide">Net Revenue Management Alerts</h2>
            <span className="text-xs text-gray-400 ml-2">Triggers when combined input costs rise &gt;3% while retail price remains flat</span>
          </div>
          <div className="space-y-3">
            {MARGIN_ALERTS.map((alert, i) => (
              <MarginAlert key={i} {...alert} />
            ))}
          </div>

          <div className="mt-8 bg-white rounded-xl border border-gray-100 p-6">
            <h3 className="text-sm font-semibold text-navy uppercase tracking-wide mb-4">NRM Decision Framework</h3>
            <div className="grid grid-cols-3 gap-6 text-center">
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-navy mb-1">14</div>
                <div className="text-xs text-gray-500">Brands Monitored</div>
              </div>
              <div className="p-4 bg-red-50 rounded-lg">
                <div className="text-2xl font-bold text-red-600 mb-1">4</div>
                <div className="text-xs text-gray-500">Active Margin Alerts</div>
              </div>
              <div className="p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600 mb-1">$2.40</div>
                <div className="text-xs text-gray-500">Avg Price Increase Needed</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'climate' && (
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Thermometer className="w-4 h-4 text-orange-500" />
            <h2 className="text-sm font-semibold text-navy uppercase tracking-wide">Climate & Agricultural Risk Monitor</h2>
          </div>
          <div className="space-y-3">
            {CLIMATE_RISKS.map((risk, i) => {
              const colors = {
                critical: 'border-l-red-500 bg-red-50/30',
                high: 'border-l-orange-500 bg-orange-50/30',
                medium: 'border-l-amber-500 bg-amber-50/30',
                low: 'border-l-green-500 bg-green-50/30',
              }
              const badges = {
                critical: 'bg-red-100 text-red-700',
                high: 'bg-orange-100 text-orange-700',
                medium: 'bg-amber-100 text-amber-700',
                low: 'bg-green-100 text-green-700',
              }
              return (
                <div key={i} className={`border-l-4 rounded-r-lg p-4 ${colors[risk.severity]}`}>
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-3">
                      <span className="font-semibold text-navy text-sm">{risk.region}</span>
                      <span className="text-xs text-gray-500">{risk.commodity}</span>
                    </div>
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${badges[risk.severity]}`}>{risk.severity}</span>
                  </div>
                  <p className="text-sm text-gray-600">{risk.impact}</p>
                </div>
              )
            })}
          </div>

          <div className="mt-8 bg-white rounded-xl border border-gray-100 p-6">
            <h3 className="text-sm font-semibold text-navy uppercase tracking-wide mb-4">Regulatory Watch</h3>
            <div className="border-l-4 border-l-purple-500 bg-purple-50/30 rounded-r-lg p-4">
              <div className="flex items-center justify-between mb-1">
                <span className="font-semibold text-navy text-sm">EU PPWR Packaging Regulation</span>
                <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-purple-100 text-purple-700">Binding Aug 2026</span>
              </div>
              <p className="text-sm text-gray-600">Strict recyclability standards and harmful substance limits. The Macallan has already reduced bottle weight by 11% and committed to removing plastic closures entirely.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
