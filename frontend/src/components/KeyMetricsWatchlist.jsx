import React, { useState } from 'react'
import { TrendingUp, TrendingDown, Globe, Package, Building2, Gem, ChevronRight } from 'lucide-react'

const PILLARS = [
  {
    id: 'macro',
    label: 'Global Macro & Category',
    icon: Globe,
    color: 'blue',
    metrics: [
      { name: 'Global TBA Volume Change', value: '-1.0%', period: '2024', note: 'Volume softness persists', trend: 'down' },
      { name: 'Global TBA Revenue Change', value: '+1.0%', period: '2024', note: 'Premiumization holding', trend: 'up' },
      { name: 'No/Low Category Growth', value: '+13%', period: '2024 vol.', note: 'Accelerating beyond niche', trend: 'up' },
      { name: 'Fine Wine Value Share', value: '11%', period: 'of global wine value', note: 'From only 1.5% of volume', trend: 'up' },
      { name: 'RTD Category Growth', value: '+8.2%', period: '2024', note: 'BuzzBallz, Cutwater driving', trend: 'up' },
      { name: 'GLP-1 Impact on Consumption', value: '-23%', period: 'UK dining out', note: '7% UK adults on GLP-1 drugs', trend: 'down' },
    ]
  },
  {
    id: 'supply',
    label: 'Supply Chain & Input Costs',
    icon: Package,
    color: 'red',
    metrics: [
      { name: 'Baltic Dry Index', value: '2,112', period: 'pts', note: '+110% YoY — shipping cost surge', trend: 'up' },
      { name: 'Glass Container PPI (US)', value: '216.38', period: 'Index (2003=100)', note: 'Historically high — energy-driven', trend: 'up' },
      { name: 'Drewry WCI (40ft)', value: '$3,421', period: 'per container', note: 'Global freight remains elevated', trend: 'up' },
      { name: 'EU Natural Gas (TTF)', value: '€48.2/MWh', period: 'Feb 2026', note: 'Glass furnace cost driver', trend: 'up' },
      { name: 'French Wine Production', value: '-16%', period: 'vs 5yr avg', note: 'Heat and drought impact', trend: 'down' },
      { name: 'Barley (EU)', value: '€224/t', period: '+12% YoY', note: 'Whisky input cost pressure', trend: 'up' },
    ]
  },
  {
    id: 'corporate',
    label: 'Corporate Financial Health',
    icon: Building2,
    color: 'green',
    metrics: [
      { name: 'AB InBev Net Debt/EBITDA', value: '2.87x', period: 'FY25', note: 'Down from 3.96x in FY21', trend: 'down' },
      { name: 'Diageo Debt/Equity', value: '185%', period: 'FY25', note: 'Stable leverage range 181-189%', trend: 'up' },
      { name: 'Pernod Ricard Organic NSG', value: '-3.0%', period: 'FY25', note: 'China & US drag', trend: 'down' },
      { name: 'Constellation Beer Margin', value: '39.7%', period: 'Operating', note: '15th consecutive volume growth yr', trend: 'up' },
      { name: 'LVMH W&S Organic Revenue', value: '-5%', period: 'FY25', note: 'Cognac hit by US/China tariffs', trend: 'down' },
      { name: 'Carlsberg Reported Revenue', value: '+18.8%', period: 'DKK 89.1bn', note: 'Britvic acquisition driving', trend: 'up' },
    ]
  },
  {
    id: 'luxury',
    label: 'Alternative Assets & Luxury',
    icon: Gem,
    color: 'purple',
    metrics: [
      { name: "Sotheby's Wine & Spirits Sales", value: '$127.5M', period: '2025', note: '+12% YoY rebound', trend: 'up' },
      { name: 'Rare Whisky 101 Apex 1000', value: 'Tracking', period: '1,000 bottles', note: 'Passion asset class vitality', trend: 'up' },
      { name: 'Dubai Duty Free Sales', value: '$2.4B', period: '2025 annual', note: 'Record-breaking GTR performance', trend: 'up' },
      { name: 'Glenlivet SPIRA 60yr (lot)', value: '$864,825', period: 'Oct 2025', note: 'Most expensive lot of the year', trend: 'up' },
      { name: 'Saudi Vision 2030 Zones', value: '~600', period: 'planned', note: 'Alcohol zones in tourist/luxury hotels', trend: 'up' },
      { name: 'Creator Brand Velocity', value: '23M', period: 'consumers reached', note: "Teremana in 16 GTR markets yr 1", trend: 'up' },
    ]
  },
]

export default function KeyMetricsWatchlist() {
  const [activePillar, setActivePillar] = useState('macro')
  const pillar = PILLARS.find(p => p.id === activePillar)

  const colorMap = {
    blue: { bg: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-700', badge: 'bg-blue-100 text-blue-700', icon: 'text-blue-500' },
    red: { bg: 'bg-red-50', border: 'border-red-200', text: 'text-red-700', badge: 'bg-red-100 text-red-700', icon: 'text-red-500' },
    green: { bg: 'bg-green-50', border: 'border-green-200', text: 'text-green-700', badge: 'bg-green-100 text-green-700', icon: 'text-green-500' },
    purple: { bg: 'bg-purple-50', border: 'border-purple-200', text: 'text-purple-700', badge: 'bg-purple-100 text-purple-700', icon: 'text-purple-500' },
  }

  return (
    <div className="mt-8">
      <div className="flex items-center gap-2 mb-4">
        <TrendingUp className="w-5 h-5 text-gold" />
        <h2 className="text-lg font-display font-bold text-navy">Key Metrics Watchlist</h2>
      </div>

      {/* Pillar Tabs */}
      <div className="grid grid-cols-4 gap-2 mb-4">
        {PILLARS.map(p => {
          const Icon = p.icon
          const c = colorMap[p.color]
          const isActive = activePillar === p.id
          return (
            <button
              key={p.id}
              onClick={() => setActivePillar(p.id)}
              className={`flex items-center gap-2 p-3 rounded-lg border text-left transition-all ${isActive ? `${c.bg} ${c.border} ${c.text}` : 'bg-white border-gray-100 text-gray-500 hover:bg-gray-50'}`}
            >
              <Icon className={`w-4 h-4 ${isActive ? c.icon : 'text-gray-400'}`} />
              <span className="text-xs font-semibold">{p.label}</span>
            </button>
          )
        })}
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {pillar.metrics.map((m, i) => (
          <div key={i} className="bg-white rounded-lg border border-gray-100 p-3 hover:shadow-sm transition-shadow">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs text-gray-400 font-medium">{m.name}</span>
              {m.trend === 'up' ? (
                <TrendingUp className="w-3 h-3 text-green-500" />
              ) : (
                <TrendingDown className="w-3 h-3 text-red-500" />
              )}
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-bold text-navy">{m.value}</span>
              <span className="text-xs text-gray-400">{m.period}</span>
            </div>
            <p className="text-xs text-gray-400 mt-1">{m.note}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
