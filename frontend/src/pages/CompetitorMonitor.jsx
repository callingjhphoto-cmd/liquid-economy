import React, { useState } from 'react'
import {
  Eye, Globe, DollarSign, Rocket, Building2, Megaphone,
  ChevronDown, AlertTriangle, Target, Bell
} from 'lucide-react'
import {
  Card, PageHeader, SubPageNav, Badge, DataFreshness
} from '../components/ui'
import { COMPETITOR_SETS, ALERT_TYPES } from '../data/competitorData'

function AlertIcon({ type }) {
  const config = ALERT_TYPES[type] || { color: '#475569', icon: 'AlertTriangle' }
  const icons = {
    Rocket: Rocket,
    DollarSign: DollarSign,
    Globe: Globe,
    Megaphone: Megaphone,
    Building2: Building2,
    AlertTriangle: AlertTriangle,
  }
  const IconComp = icons[config.icon] || AlertTriangle
  return <IconComp size={14} style={{ color: config.color }} />
}

function ImpactBadge({ impact }) {
  const colors = {
    high: 'bg-red-100 text-red-700',
    medium: 'bg-amber-100 text-amber-700',
    low: 'bg-green-100 text-green-700',
  }
  return <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${colors[impact] || colors.low}`}>{impact}</span>
}

function CompetitorCard({ brand, expanded, onToggle }) {
  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden">
      <button onClick={onToggle} className="w-full p-4 text-left flex items-center gap-3">
        <div className="w-10 h-10 bg-navy/5 rounded-lg flex items-center justify-center flex-shrink-0">
          <Building2 size={18} className="text-navy" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-navy">{brand.name}</span>
            <Badge>{brand.segment}</Badge>
          </div>
          <div className="text-xs text-gray-500">{brand.parent} {'\u2022'} {brand.avgPrice} avg {'\u2022'} {brand.marketShare} share</div>
        </div>
        <ChevronDown size={14} className={`text-gray-400 transition-transform ${expanded ? '' : '-rotate-90'}`} />
      </button>
      {expanded && (
        <div className="px-4 pb-4 border-t border-gray-100">
          <div className="grid grid-cols-3 gap-3 mt-3">
            <div className="text-center p-2 bg-gray-50 rounded-lg">
              <div className="text-xs text-gray-500">Segment</div>
              <div className="text-sm font-bold text-navy">{brand.segment}</div>
            </div>
            <div className="text-center p-2 bg-gray-50 rounded-lg">
              <div className="text-xs text-gray-500">Avg Price</div>
              <div className="text-sm font-bold text-navy">{brand.avgPrice}</div>
            </div>
            <div className="text-center p-2 bg-gray-50 rounded-lg">
              <div className="text-xs text-gray-500">Market Share</div>
              <div className="text-sm font-bold text-navy">{brand.marketShare}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default function CompetitorMonitor() {
  const [selectedCategory, setSelectedCategory] = useState('tequila')
  const [expandedBrand, setExpandedBrand] = useState(null)
  const [alertFilter, setAlertFilter] = useState('all')

  const categories = Object.keys(COMPETITOR_SETS)
  const data = COMPETITOR_SETS[selectedCategory]
  const allMoves = data?.recentMoves || []

  const filteredMoves = alertFilter === 'all'
    ? allMoves
    : allMoves.filter(m => m.type === alertFilter)

  const moveTypes = [...new Set(allMoves.map(m => m.type))]

  return (
    <div className="max-w-7xl mx-auto">
      <SubPageNav group="intelligence" />
      <PageHeader
        title="Competitor Monitor"
        subtitle="Track competitor moves, pricing, and distribution changes"
        icon={<Eye size={20} />}
      />
      <DataFreshness date="April 2026" source="IWSR, press releases, distributor intelligence" />

      {/* Category selector */}
      <Card className="p-4 mb-6">
        <div className="flex flex-wrap gap-2">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => { setSelectedCategory(cat); setExpandedBrand(null); }}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${selectedCategory === cat ? 'bg-navy text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Competitor brands */}
        <div>
          <h3 className="text-sm font-bold text-navy mb-3 flex items-center gap-2">
            <Target size={14} /> Tracked Competitors
          </h3>
          <div className="space-y-3">
            {(data?.brands || []).map((brand, i) => (
              <CompetitorCard
                key={i}
                brand={brand}
                expanded={expandedBrand === i}
                onToggle={() => setExpandedBrand(expandedBrand === i ? null : i)}
              />
            ))}
          </div>
        </div>

        {/* Recent moves / alerts */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-bold text-navy flex items-center gap-2">
              <Bell size={14} /> Recent Competitor Moves
            </h3>
            <select
              value={alertFilter}
              onChange={e => setAlertFilter(e.target.value)}
              className="px-2 py-1 bg-gray-50 border border-gray-200 rounded-lg text-xs"
            >
              <option value="all">All Types</option>
              {moveTypes.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
          <div className="space-y-3">
            {filteredMoves.map((move, i) => (
              <Card key={i} className="p-4">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5">
                    <AlertIcon type={move.type} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <span className="text-sm font-bold text-navy">{move.brand}</span>
                      <Badge>{move.type}</Badge>
                      <ImpactBadge impact={move.impact} />
                    </div>
                    <p className="text-xs text-gray-600 mb-1">{move.detail}</p>
                    <div className="text-xs text-gray-400">{move.date}</div>
                  </div>
                </div>
              </Card>
            ))}
            {filteredMoves.length === 0 && (
              <Card className="p-6 text-center">
                <Eye size={24} className="mx-auto text-gray-300 mb-2" />
                <div className="text-sm text-gray-500">No moves match this filter</div>
              </Card>
            )}
          </div>
        </div>
      </div>

      <div className="mt-6 p-3 bg-blue-50 border border-blue-200 rounded-lg text-xs text-blue-800">
        <strong>Intelligence sourced</strong> from public press releases, trade press, and regulatory filings \u2014 April 2026.{' '}
        <a href="mailto:callingjhphoto@gmail.com?subject=Liquid%20Economy%20%E2%80%94%20Competitor%20Monitor%20Live%20Data" className="underline font-medium">Contact us for real-time monitoring</a>
      </div>
    </div>
  )
}
