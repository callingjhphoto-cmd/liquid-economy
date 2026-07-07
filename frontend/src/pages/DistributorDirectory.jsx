import React, { useState, useMemo } from 'react'
import {
  Building2, Search, ChevronDown, Zap
} from 'lucide-react'
import {
  Card, PageHeader, SubPageNav, Badge, DataFreshness
} from '../components/ui'
import { DISTRIBUTORS, COUNTRIES, ALL_CATEGORIES } from '../data/distributorData'

// LI signals — computed from full DISTRIBUTORS dataset at module level
const liMarketCount = new Set(DISTRIBUTORS.map(d => d.country)).size
const liIndepCount = DISTRIBUTORS.filter(d => d.parentCompany === 'Independent').length
const liIndepPct = Math.round(liIndepCount / DISTRIBUTORS.length * 100)
const liDualChCount = DISTRIBUTORS.filter(d => d.onTrade && d.offTrade).length
const liDualChPct = Math.round(liDualChCount / DISTRIBUTORS.length * 100)

const liMarketSignal = liMarketCount >= 8
  ? { dot: 'bg-emerald-500', color: 'text-emerald-600', label: 'WIDE GLOBAL REACH', copy: `${liMarketCount} markets covered — strong options across North America, Europe, APAC, Middle East, and LatAm. Multi-market launch feasible from day one.` }
  : liMarketCount >= 5
  ? { dot: 'bg-blue-500', color: 'text-blue-600', label: 'SOLID REGIONAL COVERAGE', copy: `${liMarketCount} markets represented. Core priority markets well-served; frontier and emerging markets will need supplementary partner identification.` }
  : { dot: 'bg-amber-500', color: 'text-amber-600', label: 'LIMITED COVERAGE', copy: `${liMarketCount} markets listed. Directory is focused on primary markets — validate distributor landscape independently before committing to any unlisted territory.` }

const liIndepSignal = liIndepPct >= 40
  ? { dot: 'bg-emerald-500', color: 'text-emerald-600', label: 'STRONG INDEPENDENT OPTIONS', copy: `${liIndepPct}% of listed distributors are independently owned — healthy choice of partners not beholden to a single supplier's category priorities.` }
  : liIndepPct >= 20
  ? { dot: 'bg-blue-500', color: 'text-blue-600', label: 'MIXED LANDSCAPE', copy: `${liIndepPct}% independents, ${100 - liIndepPct}% corporate-owned. Evaluate whether a corporate parent's existing portfolio conflicts with your brand before signing.` }
  : { dot: 'bg-amber-500', color: 'text-amber-600', label: 'CORPORATE-DOMINATED CHANNEL', copy: `Only ${liIndepPct}% independently owned. Most distributors are subsidiaries of major drinks groups — expect category conflicts and volume-minimum requirements to be significant.` }

const liDualChSignal = liDualChPct >= 60
  ? { dot: 'bg-emerald-500', color: 'text-emerald-600', label: 'FULL-CHANNEL FLEXIBILITY', copy: `${liDualChPct}% of distributors cover both on- and off-trade — most partners can support a full launch strategy without needing separate route-to-market for each channel.` }
  : liDualChPct >= 40
  ? { dot: 'bg-blue-500', color: 'text-blue-600', label: 'GOOD CHANNEL MIX', copy: `${liDualChPct}% dual-channel. Some distributors are channel-specialist — clarify on-trade vs off-trade focus in early conversations to match your go-to-market.` }
  : { dot: 'bg-amber-500', color: 'text-amber-600', label: 'CHANNEL FRAGMENTATION RISK', copy: `${liDualChPct}% dual-channel. Many listed distributors are single-channel — budget for two separate partner relationships if you need both on- and off-trade in a single market.` }

function DistributorCard({ d, expanded, onToggle }) {
  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden hover:border-gray-300 transition-colors">
      <button onClick={onToggle} className="w-full p-4 text-left flex items-start gap-3">
        <div className="w-10 h-10 bg-navy/5 rounded-lg flex items-center justify-center flex-shrink-0">
          <Building2 size={18} className="text-navy" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="text-sm font-bold text-navy">{d.name}</h3>
            <Badge>{d.country}</Badge>
            {d.parentCompany !== 'Independent' && d.parentCompany !== d.name && (
              <span className="text-xs text-gray-500">({d.parentCompany})</span>
            )}
          </div>
          <div className="text-xs text-gray-500 mt-0.5">{d.speciality} {'•'} {d.region}</div>
          <div className="flex flex-wrap gap-1 mt-1.5">
            {d.categories.slice(0, 5).map(c => (
              <span key={c} className="text-xs bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded">{c}</span>
            ))}
            {d.categories.length > 5 && <span className="text-xs text-gray-400">+{d.categories.length - 5}</span>}
          </div>
        </div>
        <ChevronDown size={14} className={`text-gray-400 transition-transform mt-1 ${expanded ? '' : '-rotate-90'}`} />
      </button>
      {expanded && (
        <div className="px-4 pb-4 pt-0 border-t border-gray-100 space-y-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
            <div>
              <div className="text-xs font-semibold text-navy mb-1">Typical Terms</div>
              <div className="text-xs text-gray-600">{d.typicalTerms}</div>
            </div>
            <div>
              <div className="text-xs font-semibold text-navy mb-1">Minimum Order</div>
              <div className="text-xs text-gray-600">{d.minOrder}</div>
            </div>
            <div>
              <div className="text-xs font-semibold text-navy mb-1">Key Brands</div>
              <div className="text-xs text-gray-600">{Array.isArray(d.keyBrands) ? d.keyBrands.join(', ') : d.keyBrands}</div>
            </div>
            <div>
              <div className="text-xs font-semibold text-navy mb-1">Channels</div>
              <div className="text-xs text-gray-600">
                {d.onTrade && <span className="mr-2">On-Trade {'✓'}</span>}
                {d.offTrade && <span>Off-Trade {'✓'}</span>}
              </div>
            </div>
          </div>
          {d.notes && (
            <div className="p-2 bg-gray-50 rounded-lg text-xs text-gray-600">{d.notes}</div>
          )}
          {d.contact && d.contact !== 'Through broker' && d.contact !== 'Through agent' && d.contact !== 'Through parent' && (
            <div className="text-xs text-navy font-medium">{d.contact}</div>
          )}
        </div>
      )}
    </div>
  )
}

export default function DistributorDirectory() {
  const [search, setSearch] = useState('')
  const [countryFilter, setCountryFilter] = useState('all')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [channelFilter, setChannelFilter] = useState('all')
  const [expandedId, setExpandedId] = useState(null)

  const filtered = useMemo(() => {
    return DISTRIBUTORS.filter(d => {
      const matchSearch = search === '' ||
        d.name.toLowerCase().includes(search.toLowerCase()) ||
        d.speciality.toLowerCase().includes(search.toLowerCase()) ||
        (Array.isArray(d.keyBrands) ? d.keyBrands.join(' ') : d.keyBrands).toLowerCase().includes(search.toLowerCase())
      const matchCountry = countryFilter === 'all' || d.country === countryFilter
      const matchCategory = categoryFilter === 'all' || d.categories.includes(categoryFilter)
      const matchChannel = channelFilter === 'all' ||
        (channelFilter === 'on-trade' && d.onTrade) ||
        (channelFilter === 'off-trade' && d.offTrade)
      return matchSearch && matchCountry && matchCategory && matchChannel
    })
  }, [search, countryFilter, categoryFilter, channelFilter])

  return (
    <div className="max-w-7xl mx-auto">
      <SubPageNav group="planning" />
      <DataFreshness date="April 2026" source="Company filings, industry directories, direct outreach" />
      <PageHeader
        title="Distributor Directory"
        subtitle={`${DISTRIBUTORS.length} distributors across ${COUNTRIES.length} markets`}
        icon={<Building2 size={20} />}
      />

      {/* Liquid Intelligence */}
      <div className="border border-gold/30 rounded-xl bg-gradient-to-r from-amber-50/60 to-white p-4 mb-4">
        <div className="flex items-center gap-2 mb-3">
          <Zap size={14} className="text-gold" />
          <span className="text-xs font-bold text-gold uppercase tracking-wider">Liquid Intelligence</span>
          <span className="text-xs text-gray-400 ml-auto">{DISTRIBUTORS.length} distributors analysed</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            { sig: liMarketSignal, header: 'Global Market Access' },
            { sig: liIndepSignal, header: 'Independent Availability' },
            { sig: liDualChSignal, header: 'Dual-Channel Flexibility' },
          ].map(({ sig, header }, i) => (
            <div key={i} className="bg-white rounded-lg p-3 border border-gray-100">
              <div className="flex items-center gap-1.5 mb-1.5">
                <span className={`w-2 h-2 rounded-full shrink-0 ${sig.dot}`} />
                <span className={`text-[10px] font-bold uppercase tracking-wider ${sig.color}`}>{sig.label}</span>
              </div>
              <p className="text-[11px] text-gray-500 leading-snug">{header}</p>
              <p className="text-xs text-gray-700 leading-snug mt-1">{sig.copy}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Filters */}
      <Card className="p-4 mb-6">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search distributors, brands..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-gold/50 focus:border-gold"
            />
          </div>
          <select
            value={countryFilter}
            onChange={e => setCountryFilter(e.target.value)}
            className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm"
          >
            <option value="all">All Countries</option>
            {COUNTRIES.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
          <select
            value={categoryFilter}
            onChange={e => setCategoryFilter(e.target.value)}
            className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm"
          >
            <option value="all">All Categories</option>
            {ALL_CATEGORIES.map(c => <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>)}
          </select>
          <select
            value={channelFilter}
            onChange={e => setChannelFilter(e.target.value)}
            className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm"
          >
            <option value="all">All Channels</option>
            <option value="on-trade">On-Trade</option>
            <option value="off-trade">Off-Trade</option>
          </select>
        </div>
      </Card>

      {/* Results count */}
      <div className="text-sm text-gray-500 mb-4">
        Showing {filtered.length} of {DISTRIBUTORS.length} distributors
      </div>

      {/* Distributor list */}
      <div className="space-y-3">
        {filtered.map(d => (
          <DistributorCard
            key={d.id}
            d={d}
            expanded={expandedId === d.id}
            onToggle={() => setExpandedId(expandedId === d.id ? null : d.id)}
          />
        ))}
        {filtered.length === 0 && (
          <Card className="p-8 text-center">
            <Search size={24} className="mx-auto text-gray-300 mb-2" />
            <div className="text-sm text-gray-500">No distributors match your filters</div>
          </Card>
        )}
      </div>
    </div>
  )
}
