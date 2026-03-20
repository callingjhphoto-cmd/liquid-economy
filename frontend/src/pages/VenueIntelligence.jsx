import React, { useState, useMemo } from 'react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, Legend } from 'recharts'
import { MapPin, TrendingUp, Star, Wine, Search, Filter, ChevronDown, ChevronUp, ExternalLink, Award, Users, DollarSign, Building2, Globe, Briefcase, Target, Layers, Shield, Zap, BookOpen, Check, X, ArrowRight, BarChart3 } from 'lucide-react'
import { PageHeader } from '../components/ui/PageHeader'
import { TabGroup } from '../components/ui/TabGroup'
import { YearSelector } from '../components/ui/YearSelector'
import { MetricCard } from '../components/ui/MetricCard'

import { FIFTY_BEST_BARS, LONDON_VENUES, AWARD_SPONSORS, SPONSOR_TO_PARENT, BAR_AFFILIATIONS, BUDGET_BENCHMARKS, PARENT_COMPANIES, COMPANY_PROFILES, DISTRIBUTORS, BRAND_VENUE_MAP, CATEGORY_DENSITY, ENTRY_PLAYBOOKS, COLORS, YEARS } from '../data/venueData'

export default function VenueIntelligence() {
  const [activeTab, setActiveTab] = useState('overview')
  const [selectedYear, setSelectedYear] = useState(2025)
  const [venueSearch, setVenueSearch] = useState('')
  const [accountFilter, setAccountFilter] = useState('All')
  const [expandedVenue, setExpandedVenue] = useState(null)
  const [selectedCompany, setSelectedCompany] = useState(null)
  const [brandSubTab, setBrandSubTab] = useState('profiles')
  const [brandFilterCompany, setBrandFilterCompany] = useState('All')
  const [entryCategory, setEntryCategory] = useState(null)
  const [expandedDistributor, setExpandedDistributor] = useState(null)

  // Compute London bars in 50 Best each year
  const londonIn50Best = useMemo(() => {
    return YEARS.map(year => {
      const bars = FIFTY_BEST_BARS[year].filter(b => b.city === 'London')
      return { year, count: bars.length, bars: bars.map(b => `#${b.rank} ${b.name}`).join(', ') }
    })
  }, [])

  // Compute UK bars in 50 Best each year (includes Edinburgh)
  const ukIn50Best = useMemo(() => {
    return YEARS.map(year => {
      const bars = FIFTY_BEST_BARS[year].filter(b => b.country === 'UK')
      return { year, count: bars.length, bars: bars.map(b => `#${b.rank} ${b.name} (${b.city})`).join(', ') }
    })
  }, [])

  // City dominance across years
  const cityDominance = useMemo(() => {
    const cityMap = {}
    YEARS.forEach(year => {
      FIFTY_BEST_BARS[year].forEach(bar => {
        if (!cityMap[bar.city]) cityMap[bar.city] = {}
        if (!cityMap[bar.city][year]) cityMap[bar.city][year] = 0
        cityMap[bar.city][year]++
      })
    })
    return Object.entries(cityMap)
      .map(([city, years]) => ({ city, ...years, total: Object.values(years).reduce((a,b) => a + b, 0) }))
      .sort((a, b) => b.total - a.total)
      .slice(0, 15)
  }, [])

  // Parent company presence across London venues
  const parentCompanyPresence = useMemo(() => {
    const counts = {}
    LONDON_VENUES.forEach(v => {
      (v.parentCompanies || []).forEach(pc => {
        if (pc === 'Independent') return
        counts[pc] = (counts[pc] || 0) + 1
      })
    })
    return Object.entries(counts)
      .map(([name, venues]) => ({ name, venues, color: PARENT_COMPANIES[name]?.color || '#666' }))
      .sort((a, b) => b.venues - a.venues)
  }, [])

  // Region analysis for selected year
  const regionAnalysis = useMemo(() => {
    const regionMap = {}
    FIFTY_BEST_BARS[selectedYear].forEach(bar => {
      regionMap[bar.region] = (regionMap[bar.region] || 0) + 1
    })
    return Object.entries(regionMap)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value)
  }, [selectedYear])

  // Perennial bars (appeared in all 5 years)
  const perennialBars = useMemo(() => {
    const barYearMap = {}
    YEARS.forEach(year => {
      FIFTY_BEST_BARS[year].forEach(bar => {
        if (!barYearMap[bar.name]) barYearMap[bar.name] = { name: bar.name, city: bar.city, years: [], ranks: {} }
        barYearMap[bar.name].years.push(year)
        barYearMap[bar.name].ranks[year] = bar.rank
      })
    })
    return Object.values(barYearMap)
      .filter(b => b.years.length >= 4)
      .sort((a, b) => b.years.length - a.years.length || (a.ranks[2025] || 99) - (b.ranks[2025] || 99))
  }, [])

  // Filtered London venues
  const filteredVenues = useMemo(() => {
    return LONDON_VENUES.filter(v => {
      const matchSearch = venueSearch === '' ||
        v.name.toLowerCase().includes(venueSearch.toLowerCase()) ||
        v.area.toLowerCase().includes(venueSearch.toLowerCase()) ||
        (v.knownBrands || []).some(b => b.toLowerCase().includes(venueSearch.toLowerCase()))
      const matchAccount = accountFilter === 'All' || v.accountType === accountFilter
      return matchSearch && matchAccount
    })
  }, [venueSearch, accountFilter])

  // Regional trend over time
  const regionalTrend = useMemo(() => {
    return YEARS.map(year => {
      const regions = {}
      FIFTY_BEST_BARS[year].forEach(bar => {
        regions[bar.region] = (regions[bar.region] || 0) + 1
      })
      return { year: year.toString(), ...regions }
    })
  }, [])

  // Parent company penetration across ALL 50 Best bars per year
  const parentPenetration = useMemo(() => {
    const result = {}
    YEARS.forEach(year => {
      const bars = FIFTY_BEST_BARS[year]
      const parentCounts = {}
      bars.forEach(bar => {
        const affiliations = BAR_AFFILIATIONS[bar.name] || []
        affiliations.forEach(parent => {
          if (parent === 'Independent') return
          parentCounts[parent] = (parentCounts[parent] || 0) + 1
        })
      })
      result[year] = Object.entries(parentCounts)
        .map(([name, count]) => ({ name, count, pct: Math.round(count / 50 * 100) }))
        .sort((a, b) => b.count - a.count)
    })
    return result
  }, [])

  // Overall 5-year parent company dominance (unique bars across all years)
  const overallDominance = useMemo(() => {
    const parentBars = {}
    const totalUniqueBars = new Set()
    YEARS.forEach(year => {
      FIFTY_BEST_BARS[year].forEach(bar => {
        totalUniqueBars.add(bar.name)
        const affiliations = BAR_AFFILIATIONS[bar.name] || []
        affiliations.forEach(parent => {
          if (parent === 'Independent') return
          if (!parentBars[parent]) parentBars[parent] = new Set()
          parentBars[parent].add(bar.name)
        })
      })
    })
    return Object.entries(parentBars)
      .map(([name, bars]) => ({ name, bars: bars.size, total: totalUniqueBars.size, pct: Math.round(bars.size / totalUniqueBars.size * 100), color: PARENT_COMPANIES[name]?.color || '#666' }))
      .sort((a, b) => b.bars - a.bars)
  }, [])

  // Award sponsor spend analysis
  const sponsorAnalysis = useMemo(() => {
    const sponsors = {}
    YEARS.forEach(year => {
      Object.entries(AWARD_SPONSORS[year] || {}).forEach(([brand, award]) => {
        const parent = SPONSOR_TO_PARENT[brand] || 'Other'
        if (!sponsors[brand]) sponsors[brand] = { brand, parent, years: [], awards: [] }
        sponsors[brand].years.push(year)
        sponsors[brand].awards.push({ year, award })
      })
    })
    return Object.values(sponsors).sort((a, b) => b.years.length - a.years.length)
  }, [])

  // Parent company penetration trend (for line chart)
  const penetrationTrend = useMemo(() => {
    return YEARS.map(year => {
      const entry = { year: year.toString() }
      const data = parentPenetration[year] || []
      data.forEach(d => { entry[d.name] = d.pct })
      return entry
    })
  }, [parentPenetration])

  // Independent vs corporate split per year
  const independentVsCorporate = useMemo(() => {
    return YEARS.map(year => {
      const bars = FIFTY_BEST_BARS[year]
      let corporate = 0, independent = 0
      bars.forEach(bar => {
        const affiliations = BAR_AFFILIATIONS[bar.name] || []
        const nonIndependent = affiliations.filter(a => a !== 'Independent')
        if (nonIndependent.length > 0) corporate++
        else independent++
      })
      return { year: year.toString(), 'Corporate-Backed': corporate, 'Independent': independent, corpPct: Math.round(corporate / 50 * 100) }
    })
  }, [])

  const tabs = [
    { id: 'overview', label: '50 Best Analysis', icon: Award },
    { id: 'venues', label: 'London Key Accounts', icon: MapPin },
    { id: 'brands', label: 'Company Intelligence', icon: Building2 },
    { id: 'entry', label: 'Market Entry', icon: Target },
    { id: 'trends', label: 'Longitudinal Trends', icon: TrendingUp },
  ]

  return (
    <div className="min-h-screen bg-surface p-3 sm:p-4 lg:p-6 max-w-7xl mx-auto space-y-6">
      <PageHeader
        title="Venue & On-Trade Intelligence"
        subtitle="World\u2019s 50 Best Bars (2021\u20132025), London key accounts, brand mapping, and on-trade analysis"
        breadcrumbs={[
          { label: 'Command Centre', to: '/' },
          { label: 'Venue Intelligence' },
        ]}
      />

      {/* Tab Navigation */}
      <TabGroup
        tabs={tabs.map(t => ({ key: t.id, label: t.label }))}
        active={activeTab}
        onChange={setActiveTab}
      />

      {/* ═══════ TAB: 50 BEST ANALYSIS ═══════ */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Year Selector */}
          <YearSelector
            activeYear={selectedYear}
            onChange={setSelectedYear}
            years={YEARS}
          />

          {/* Stats Row */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            <MetricCard
              label="London Bars in Top 50"
              value={FIFTY_BEST_BARS[selectedYear].filter(b => b.city === 'London').length}
              subtitle={`${FIFTY_BEST_BARS[selectedYear].filter(b => b.country === 'UK').length} total UK`}
              icon={MapPin}
            />
            <MetricCard
              label="Cities Represented"
              value={new Set(FIFTY_BEST_BARS[selectedYear].map(b => b.city)).size}
              icon={Globe}
            />
            <MetricCard
              label="European Bars"
              value={FIFTY_BEST_BARS[selectedYear].filter(b => b.region === 'Europe').length}
              subtitle={`${Math.round(FIFTY_BEST_BARS[selectedYear].filter(b => b.region === 'Europe').length / 50 * 100)}% of list`}
            />
            <MetricCard
              label="Asian Bars"
              value={FIFTY_BEST_BARS[selectedYear].filter(b => b.region === 'Asia').length}
              subtitle={`${Math.round(FIFTY_BEST_BARS[selectedYear].filter(b => b.region === 'Asia').length / 50 * 100)}% of list`}
            />
          </div>

          {/* Region Pie + City Bar Chart */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl p-5 border border-gray-100">
              <h3 className="text-subsection text-navy mb-4">Regional Distribution — {selectedYear}</h3>
              <ResponsiveContainer width="100%" height={280}>
                <PieChart>
                  <Pie data={regionAnalysis} cx="50%" cy="50%" outerRadius={100} dataKey="value" label={({ name, value }) => `${name}: ${value}`}>
                    {regionAnalysis.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="bg-white rounded-xl p-5 border border-gray-100">
              <h3 className="text-subsection text-navy mb-4">Top Cities by Entries — {selectedYear}</h3>
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={(() => {
                  const cityCount = {}
                  FIFTY_BEST_BARS[selectedYear].forEach(b => { cityCount[b.city] = (cityCount[b.city] || 0) + 1 })
                  return Object.entries(cityCount).map(([city, count]) => ({ city, count })).sort((a,b) => b.count - a.count).slice(0, 10)
                })()}  layout="vertical">
                  <XAxis type="number" />
                  <YAxis dataKey="city" type="category" width={120} tick={{ fontSize: 11 }} />
                  <Tooltip />
                  <Bar dataKey="count" fill="#1e293b" radius={[0,4,4,0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* London Representation Over Time */}
          <div className="bg-white rounded-xl p-5 border border-gray-100">
            <h3 className="text-subsection text-navy mb-4">London & UK Representation in 50 Best (2021–2025)</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead><tr className="border-b border-gray-100">
                  <th className="text-left py-2 text-gray-500 font-medium">Year</th>
                  <th className="text-center py-2 text-gray-500 font-medium">London Bars</th>
                  <th className="text-center py-2 text-gray-500 font-medium">Total UK</th>
                  <th className="text-left py-2 text-gray-500 font-medium">Bars</th>
                </tr></thead>
                <tbody>
                  {ukIn50Best.map(row => (
                    <tr key={row.year} className="border-b border-gray-50">
                      <td className="py-3 font-semibold text-navy">{row.year}</td>
                      <td className="py-3 text-center">
                        <span className="bg-navy text-white px-2 py-0.5 rounded-full text-xs font-bold">
                          {londonIn50Best.find(l => l.year === row.year)?.count}
                        </span>
                      </td>
                      <td className="py-3 text-center">{row.count}</td>
                      <td className="py-3 text-xs text-gray-600">{row.bars}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Perennial Bars */}
          <div className="bg-white rounded-xl p-5 border border-gray-100">
            <h3 className="text-subsection text-navy mb-1">Perennial Bars — Appeared 4+ Years (2021–2025)</h3>
            <p className="text-xs text-gray-400 mb-4">These are the most consistently ranked bars globally — key accounts for brand partnerships</p>
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {perennialBars.map(bar => (
                <div key={bar.name} className="flex items-center gap-4 py-2 border-b border-gray-50">
                  <div className="w-40 font-medium text-sm text-navy truncate">{bar.name}</div>
                  <div className="w-24 text-xs text-gray-500">{bar.city}</div>
                  <div className="flex gap-1">
                    <span className={`px-1.5 py-0.5 rounded text-xs font-bold ${bar.years.length === 5 ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>
                      {bar.years.length}/5 yrs
                    </span>
                  </div>
                  <div className="flex gap-2 flex-1">
                    {YEARS.map(y => (
                      <span key={y} className={`text-xs w-12 text-center ${bar.ranks[y] ? (bar.ranks[y] <= 10 ? 'font-bold text-green-600' : 'text-gray-600') : 'text-gray-300'}`}>
                        {bar.ranks[y] ? `#${bar.ranks[y]}` : '—'}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Full 50 Best List for Selected Year */}
          <div className="bg-white rounded-xl p-5 border border-gray-100">
            <h3 className="text-subsection text-navy mb-4">Complete List — World's 50 Best Bars {selectedYear}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-1 max-h-[500px] overflow-y-auto">
              {FIFTY_BEST_BARS[selectedYear].map(bar => (
                <div key={bar.rank} className={`flex items-center gap-3 py-1.5 text-sm ${bar.country === 'UK' ? 'bg-blue-50 rounded px-2 -mx-2' : ''}`}>
                  <span className={`w-7 text-right font-bold ${bar.rank <= 10 ? 'text-gold' : 'text-gray-400'}`}>{bar.rank}</span>
                  <span className={`font-medium ${bar.country === 'UK' ? 'text-navy' : 'text-gray-800'}`}>{bar.name}</span>
                  <span className="text-xs text-gray-400 ml-auto">{bar.city}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ═══════ TAB: LONDON KEY ACCOUNTS ═══════ */}
      {activeTab === 'venues' && (
        <div className="space-y-6">
          {/* Search & Filter */}
          <div className="flex gap-4 items-center">
            <div className="relative flex-1">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input type="text" placeholder="Search venues, areas, or brands..." value={venueSearch} onChange={e => setVenueSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-navy focus:border-transparent" />
            </div>
            <div className="flex gap-1">
              {['All','Luxury','Volume','Both'].map(f => (
                <button key={f} onClick={() => setAccountFilter(f)}
                  className={`px-3 py-2 rounded-lg text-xs font-medium ${accountFilter === f ? 'bg-navy text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
                  {f}
                </button>
              ))}
            </div>
          </div>

          {/* Revenue Methodology Note */}
          <div className="bg-green-50 border border-green-100 rounded-xl p-4 mb-4">
            <h4 className="text-sm font-semibold text-green-800 mb-1 flex items-center gap-2"><Building2 size={14} /> Revenue Data Sources</h4>
            <p className="text-xs text-green-700">Revenue figures are sourced from <span className="font-semibold">Companies House filings</span> (UK registered companies), <span className="font-semibold">SEC filings</span> (US-listed groups), and <span className="font-semibold">industry estimates</span> (for independent venues without public filings). Where a venue is part of a larger hotel or restaurant group, revenue is allocated based on standard F&B revenue splits. Click any venue to see the specific source for its revenue figure.</p>
          </div>

          {/* Account Type Explanation */}
          <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
            <h4 className="text-subsection text-navy mb-2">On-Trade Account Types</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs text-gray-700">
              <div><span className="font-bold text-purple-600">Luxury:</span> High-value, notoriety-driven accounts. Brands invest marketing spend for featuring, menu placement, and brand association. Lower volume but high visibility.</div>
              <div><span className="font-bold text-green-600">Volume:</span> High-throughput accounts. Brands offer retros (retrospective discounts) based on volume. More aggressive pricing. Think clubs, large restaurant groups.</div>
              <div><span className="font-bold text-amber-600">Both:</span> Rare accounts with both high volume AND prestige. e.g. Annabel\'s (~£55.6M revenue per Companies House), Sexy Fish (~£35M). Brands compete aggressively for these — offering retros + marketing spend + suspension pricing.</div>
            </div>
          </div>

          {/* Venue Cards */}
          <div className="space-y-3">
            {filteredVenues.map((venue, i) => (
              <div key={i} className="bg-white rounded-xl border border-gray-100 overflow-hidden">
                <div className="p-4 flex items-start gap-4 cursor-pointer" onClick={() => setExpandedVenue(expandedVenue === i ? null : i)}>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-navy">{venue.name}</h3>
                      {venue.stars && <span className="text-amber-500 text-xs">{'⭐'.repeat(venue.stars)}</span>}
                      <span className={`px-2 py-0.5 rounded text-xs font-medium ${venue.accountType === 'Luxury' ? 'bg-purple-100 text-purple-700' : venue.accountType === 'Volume' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                        {venue.accountType}
                      </span>
                      <span className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-xs">{venue.type}</span>
                    </div>
                    <div className="flex items-center gap-4 mt-1 text-xs text-gray-500">
                      <span className="flex items-center gap-1"><MapPin size={12} /> {venue.area}</span>
                      <span className="flex items-center gap-1"><DollarSign size={12} /> Est. {venue.estRevenue}/yr</span>
                      {venue.menuUrl && (
                        <a href={venue.menuUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-blue-500 hover:text-blue-700" onClick={e => e.stopPropagation()}>
                          <ExternalLink size={12} /> Menu
                        </a>
                      )}
                      {venue.fiftyBest && venue.fiftyBest.some(r => r) && (
                        <span className="flex items-center gap-1"><Award size={12} /> 50 Best: {venue.fiftyBest.filter(r => r).length} appearances</span>
                      )}
                    </div>
                  </div>
                  {expandedVenue === i ? <ChevronUp size={18} className="text-gray-400" /> : <ChevronDown size={18} className="text-gray-400" />}
                </div>
                {expandedVenue === i && (
                  <div className="border-t border-gray-100 p-4 bg-gray-50 space-y-3">
                    {venue.fiftyBest && venue.fiftyBest.some(r => r) && (
                      <div>
                        <p className="text-xs font-semibold text-gray-500 uppercase mb-1">50 Best Rankings (2021→2025)</p>
                        <div className="flex gap-2">
                          {YEARS.map((y, idx) => (
                            <span key={y} className={`px-2 py-1 rounded text-xs ${venue.fiftyBest[idx] ? (venue.fiftyBest[idx] <= 10 ? 'bg-green-100 text-green-700 font-bold' : 'bg-blue-100 text-blue-700') : 'bg-gray-100 text-gray-400'}`}>
                              {y}: {venue.fiftyBest[idx] ? `#${venue.fiftyBest[idx]}` : '—'}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    {venue.knownBrands && venue.knownBrands.length > 0 && (
                      <div>
                        <p className="text-xs font-semibold text-gray-500 uppercase mb-1">Brands on Menu / Known Partnerships</p>
                        <div className="flex flex-wrap gap-1">
                          {venue.knownBrands.map(brand => (
                            <span key={brand} className="px-2 py-0.5 bg-white border border-gray-200 rounded text-xs text-gray-700">{brand}</span>
                          ))}
                        </div>
                      </div>
                    )}
                    {venue.parentCompanies && venue.parentCompanies.length > 0 && (
                      <div>
                        <p className="text-xs font-semibold text-gray-500 uppercase mb-1">Parent Companies Present</p>
                        <div className="flex flex-wrap gap-1">
                          {venue.parentCompanies.map(pc => (
                            <span key={pc} className="px-2 py-0.5 rounded text-xs font-medium" style={{ backgroundColor: (PARENT_COMPANIES[pc]?.color || '#666') + '20', color: PARENT_COMPANIES[pc]?.color || '#666' }}>
                              {pc}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    {venue.founders && <p className="text-xs text-gray-600"><span className="font-semibold">Key People:</span> {venue.founders}</p>}
                    <p className="text-xs text-gray-600"><span className="font-semibold">Intel:</span> {venue.notes}</p>
                    {venue.menuUrl && (
                      <div className="flex items-center gap-2">
                        <p className="text-xs text-gray-600">
                          <span className="font-semibold">Menu:</span>{' '}
                          <a href={venue.menuUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline inline-flex items-center gap-1">
                            View Menu <ExternalLink size={10} />
                          </a>
                        </p>
                      </div>
                    )}
                    {venue.revenueSource && (
                      <div className="bg-amber-50 border border-amber-100 rounded-lg p-2 mt-1">
                        <p className="text-xs text-amber-800">
                          <span className="font-semibold">Revenue Source:</span> {venue.revenueSource}
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ═══════ TAB: COMPANY INTELLIGENCE ═══════ */}
      {activeTab === 'brands' && (
        <div className="space-y-6">
          {/* Sub-navigation */}
          <div className="flex gap-1 bg-gray-50 p-1 rounded-lg">
            {[
              { id: 'profiles', label: 'Company Profiles', icon: Building2 },
              { id: 'mapping', label: 'Brand Mapping', icon: Layers },
              { id: 'heatmap', label: 'Competitive Heat Map', icon: BarChart3 },
              { id: 'landscape', label: 'Category Landscape', icon: Wine },
              { id: 'benchmarks', label: 'Budget & Benchmarks', icon: DollarSign },
            ].map(sub => (
              <button key={sub.id} onClick={() => setBrandSubTab(sub.id)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium transition-colors ${brandSubTab === sub.id ? 'bg-white text-navy shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}>
                <sub.icon size={14} />
                {sub.label}
              </button>
            ))}
          </div>

          {/* ─── COMPANY PROFILES ─── */}
          {brandSubTab === 'profiles' && (
            <div className="space-y-4">
              <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
                <h4 className="text-subsection text-navy mb-1">Parent Company Deep Dives</h4>
                <p className="text-xs text-gray-600">Click any company to see their full on-trade strategy, key brands, distribution model, deal structures, and where they\u2019re vulnerable to smaller brands.</p>
              </div>

              {/* Headline Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                <div className="bg-white rounded-xl p-4 border border-gray-100">
                  <p className="text-xs text-gray-500 uppercase tracking-wider">Corporate-Backed Bars (2025)</p>
                  <p className="text-3xl font-bold text-navy mt-1">{independentVsCorporate.find(d => d.year === '2025')?.corpPct || 0}%</p>
                  <p className="text-xs text-gray-400 mt-1">of Top 50 have major company presence</p>
                </div>
                <div className="bg-white rounded-xl p-4 border border-gray-100">
                  <p className="text-xs text-gray-500 uppercase tracking-wider">Top Company (2025)</p>
                  <p className="text-xl font-bold mt-1" style={{ color: parentPenetration[2025]?.[0]?.name ? (PARENT_COMPANIES[parentPenetration[2025][0].name]?.color || '#333') : '#333' }}>{parentPenetration[2025]?.[0]?.name || '—'}</p>
                  <p className="text-xs text-gray-400 mt-1">{parentPenetration[2025]?.[0]?.pct}% penetration</p>
                </div>
                <div className="bg-white rounded-xl p-4 border border-gray-100">
                  <p className="text-xs text-gray-500 uppercase tracking-wider">Companies Profiled</p>
                  <p className="text-3xl font-bold text-navy mt-1">{Object.keys(COMPANY_PROFILES).length}</p>
                  <p className="text-xs text-gray-400 mt-1">major parent companies</p>
                </div>
                <div className="bg-white rounded-xl p-4 border border-gray-100">
                  <p className="text-xs text-gray-500 uppercase tracking-wider">Independent Bars (2025)</p>
                  <p className="text-3xl font-bold text-green-600 mt-1">{independentVsCorporate.find(d => d.year === '2025')?.['Independent'] || 0}</p>
                  <p className="text-xs text-gray-400 mt-1">not tied to a major parent company</p>
                </div>
              </div>

              {/* Penetration Chart */}
              <div className="bg-white rounded-xl p-5 border border-gray-100">
                <h3 className="text-subsection text-navy mb-1">Parent Company Penetration: % of Top 50 Bars ({selectedYear})</h3>
                <p className="text-xs text-gray-400 mb-4">Click a company name below the chart for their full profile</p>
                <ResponsiveContainer width="100%" height={280}>
                  <BarChart data={parentPenetration[selectedYear] || []} layout="vertical">
                    <XAxis type="number" domain={[0, 70]} tickFormatter={v => `${v}%`} />
                    <YAxis dataKey="name" type="category" width={140} tick={{ fontSize: 11 }} />
                    <Tooltip formatter={(val) => [`${val}%`, 'Penetration']} />
                    <Bar dataKey="pct" radius={[0,4,4,0]} cursor="pointer" onClick={(data) => setSelectedCompany(data?.name || null)}>
                      {(parentPenetration[selectedYear] || []).map((entry, i) => (
                        <Cell key={i} fill={PARENT_COMPANIES[entry.name]?.color || '#666'} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
                <div className="flex gap-2 mt-3 justify-center">
                  {YEARS.map(year => (
                    <button key={year} onClick={() => setSelectedYear(year)}
                      className={`px-3 py-1 rounded text-xs font-medium border ${selectedYear === year ? 'bg-navy text-white border-navy' : 'bg-white text-gray-500 border-gray-200 hover:border-navy'}`}>
                      {year}
                    </button>
                  ))}
                </div>
              </div>

              {/* Company Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {Object.entries(COMPANY_PROFILES).map(([name, profile]) => (
                  <div key={name} className={`bg-white rounded-xl border transition-all cursor-pointer ${selectedCompany === name ? 'border-navy shadow-lg' : 'border-gray-100 hover:border-gray-300'}`}
                    onClick={() => setSelectedCompany(selectedCompany === name ? null : name)}>
                    <div className="p-4">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-4 h-4 rounded-full" style={{ backgroundColor: PARENT_COMPANIES[name]?.color || '#666' }} />
                        <h4 className="text-sm font-bold text-navy">{name}</h4>
                        <span className="text-xs text-gray-400 ml-auto">{profile.revenue}</span>
                        {selectedCompany === name ? <ChevronUp size={16} className="text-gray-400" /> : <ChevronDown size={16} className="text-gray-400" />}
                      </div>
                      <p className="text-xs text-gray-500">{profile.headquarters} {'•'} CEO: {profile.ceo}</p>
                      <p className="text-xs text-gray-500 mt-1">On-trade share: {profile.onTradeShare}</p>
                    </div>

                    {selectedCompany === name && (
                      <div className="border-t border-gray-100 p-4 bg-gray-50 space-y-4">
                        {/* Strategy */}
                        <div>
                          <h5 className="text-xs font-bold text-navy uppercase tracking-wider mb-1 flex items-center gap-1"><Target size={12} /> On-Trade Strategy</h5>
                          <p className="text-xs text-gray-700 leading-relaxed">{profile.strategy}</p>
                        </div>

                        {/* Key Brands */}
                        <div>
                          <h5 className="text-xs font-bold text-navy uppercase tracking-wider mb-2 flex items-center gap-1"><Wine size={12} /> Key On-Trade Brands</h5>
                          <div className="grid grid-cols-1 gap-1.5">
                            {(profile.keyBrandsOnTrade || []).map((brand, bi) => (
                              <div key={bi} className="flex items-center gap-2 text-xs bg-white rounded px-2 py-1.5 border border-gray-100">
                                <span className="font-semibold text-navy w-32 truncate">{brand.name}</span>
                                <span className="text-gray-400">{brand.category}</span>
                                <span className="ml-auto text-gray-500">{brand.pricePoint}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Strengths & Weaknesses */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <h5 className="text-xs font-bold text-green-700 uppercase tracking-wider mb-1 flex items-center gap-1"><Shield size={12} /> Strengths</h5>
                            <div className="space-y-1">
                              {(profile.strengths || []).map((s, si) => (
                                <p key={si} className="text-xs text-gray-700 flex items-start gap-1"><Check size={10} className="text-green-500 mt-0.5 flex-shrink-0" /> {s}</p>
                              ))}
                            </div>
                          </div>
                          <div>
                            <h5 className="text-xs font-bold text-red-700 uppercase tracking-wider mb-1 flex items-center gap-1"><Zap size={12} /> Vulnerabilities</h5>
                            <div className="space-y-1">
                              {(profile.weaknesses || []).map((w, wi) => (
                                <p key={wi} className="text-xs text-gray-700 flex items-start gap-1"><X size={10} className="text-red-500 mt-0.5 flex-shrink-0" /> {w}</p>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* London Presence */}
                        <div>
                          <h5 className="text-xs font-bold text-navy uppercase tracking-wider mb-1 flex items-center gap-1"><MapPin size={12} /> London Presence</h5>
                          <p className="text-xs text-gray-700">{profile.londonPresence}</p>
                        </div>

                        {/* Distribution & Deal Structure */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div className="bg-white rounded-lg p-3 border border-gray-100">
                            <h5 className="text-xs font-bold text-navy mb-1">UK Distribution</h5>
                            <p className="text-xs text-gray-600">{profile.distributionUK}</p>
                          </div>
                          <div className="bg-white rounded-lg p-3 border border-gray-100">
                            <h5 className="text-xs font-bold text-navy mb-1">Typical Deal Structure</h5>
                            <p className="text-xs text-gray-600">{profile.typicalDealStructure}</p>
                          </div>
                        </div>

                        {/* UK On-Trade Team */}
                        <div>
                          <h5 className="text-xs font-bold text-navy uppercase tracking-wider mb-1 flex items-center gap-1"><Users size={12} /> UK On-Trade Team</h5>
                          <p className="text-xs text-gray-700">{profile.ukOnTradeTeam}</p>
                        </div>

                        {/* Recent Moves */}
                        <div>
                          <h5 className="text-xs font-bold text-navy uppercase tracking-wider mb-1 flex items-center gap-1"><TrendingUp size={12} /> Recent Strategic Moves (2024-25)</h5>
                          <div className="space-y-1">
                            {(profile.recentMoves || []).map((m, mi) => (
                              <p key={mi} className="text-xs text-gray-700 flex items-start gap-1"><ArrowRight size={10} className="text-navy mt-0.5 flex-shrink-0" /> {m}</p>
                            ))}
                          </div>
                        </div>

                        {/* Threat/Opportunity for SMBs */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div className="bg-red-50 rounded-lg p-3 border border-red-100">
                            <h5 className="text-xs font-bold text-red-800 mb-1">Threat to Small Brands</h5>
                            <p className="text-xs text-red-700">{profile.threatToSmallBrands}</p>
                          </div>
                          <div className="bg-green-50 rounded-lg p-3 border border-green-100">
                            <h5 className="text-xs font-bold text-green-800 mb-1">Opportunity for Small Brands</h5>
                            <p className="text-xs text-green-700">{profile.opportunityForSmallBrands}</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Award Sponsor Intelligence */}
              <div className="bg-white rounded-xl p-5 border border-gray-100">
                <h3 className="text-subsection text-navy mb-1">50 Best Bars {'—'} Award Sponsor Intelligence</h3>
                <p className="text-xs text-gray-400 mb-4">Brands that sponsor named awards gain massive bartender community visibility</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {sponsorAnalysis.map(s => (
                    <div key={s.brand} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg border border-gray-100">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="text-subsection text-navy">{s.brand}</span>
                          <span className="text-xs px-1.5 py-0.5 rounded bg-blue-50 text-blue-700 font-medium">{s.parent}</span>
                        </div>
                        <div className="mt-1 space-y-0.5">
                          {s.awards.map(a => (
                            <p key={a.year} className="text-xs text-gray-500">{a.year}: {a.award}</p>
                          ))}
                        </div>
                        <p className="text-xs font-medium text-amber-700 mt-1">{s.years.length}/5 years as sponsor</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ─── BRAND MAPPING ─── */}
          {brandSubTab === 'mapping' && (
            <div className="space-y-4">
              <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
                <h4 className="text-subsection text-navy mb-1">Brand-to-Venue Mapping</h4>
                <p className="text-xs text-gray-600">See exactly which brands appear in which London venues. Filter by parent company to understand their footprint.</p>
              </div>

              {/* Filter */}
              <div className="flex gap-2 flex-wrap">
                {['All', ...Object.keys(PARENT_COMPANIES)].map(co => (
                  <button key={co} onClick={() => setBrandFilterCompany(co)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium border ${brandFilterCompany === co ? 'bg-navy text-white border-navy' : 'bg-white text-gray-500 border-gray-200 hover:border-gray-400'}`}>
                    {co}
                  </button>
                ))}
              </div>

              {/* Brand Cards with venue listings */}
              <div className="space-y-2">
                {Object.entries(BRAND_VENUE_MAP)
                  .filter(([brand]) => {
                    if (brandFilterCompany === 'All') return true;
                    const companyBrands = PARENT_COMPANIES[brandFilterCompany]?.brands || [];
                    return companyBrands.some(b => b.toLowerCase() === brand.toLowerCase() || brand.toLowerCase().includes(b.toLowerCase()));
                  })
                  .sort((a, b) => b[1].length - a[1].length)
                  .map(([brand, venues]) => {
                    const parentMatch = Object.entries(PARENT_COMPANIES).find(([, data]) =>
                      data.brands.some(b => b.toLowerCase() === brand.toLowerCase() || brand.toLowerCase().includes(b.toLowerCase()))
                    );
                    return (
                      <div key={brand} className="bg-white rounded-lg border border-gray-100 p-3">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="font-semibold text-sm text-navy">{brand}</span>
                          {parentMatch && (
                            <span className="text-xs px-1.5 py-0.5 rounded font-medium" style={{ backgroundColor: (parentMatch[1].color || '#666') + '15', color: parentMatch[1].color || '#666' }}>
                              {parentMatch[0]}
                            </span>
                          )}
                          <span className="ml-auto text-xs font-bold text-navy bg-navy/10 px-2 py-0.5 rounded">{venues.length} venues</span>
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {venues.map(v => (
                            <span key={v} className="px-2 py-0.5 text-xs rounded bg-gray-50 text-gray-600 border border-gray-100">{v}</span>
                          ))}
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          )}

          {/* ─── COMPETITIVE HEAT MAP ─── */}
          {brandSubTab === 'heatmap' && (
            <div className="space-y-4">
              <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
                <h4 className="text-subsection text-navy mb-1">Competitive Heat Map</h4>
                <p className="text-xs text-gray-600">Which company dominates which category in each venue tier. Use this to find white space for your brand.</p>
              </div>

              {Object.entries(COMPETITIVE_HEAT).map(([category, tiers]) => (
                <div key={category} className="bg-white rounded-xl border border-gray-100 overflow-hidden">
                  <div className="bg-gray-50 px-4 py-3 border-b border-gray-100">
                    <h4 className="text-subsection text-navy">{category}</h4>
                  </div>
                  <div className="p-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                      {Object.entries(tiers).map(([tier, data]) => {
                        const dominantColor = PARENT_COMPANIES[data.dominant]?.color || '#666';
                        const challengerColor = PARENT_COMPANIES[data.challenger]?.color || '#999';
                        return (
                          <div key={tier} className="rounded-lg p-3 border" style={{ borderColor: dominantColor + '30', backgroundColor: dominantColor + '05' }}>
                            <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">{tier.replace(/([A-Z])/g, ' $1').trim()}</p>
                            <div className="space-y-1.5">
                              <div>
                                <p className="text-xs font-bold" style={{ color: dominantColor }}>{data.dominant}</p>
                                <p className="text-xs text-gray-500">{(data.brands || []).join(', ')}</p>
                              </div>
                              <div className="border-t border-gray-100 pt-1">
                                <p className="text-xs text-gray-400">Challenger:</p>
                                <p className="text-xs font-medium" style={{ color: challengerColor }}>{data.challenger}</p>
                                <p className="text-xs text-gray-500">{(data.challengerBrands || []).join(', ')}</p>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ─── CATEGORY LANDSCAPE ─── */}
          {brandSubTab === 'landscape' && (
            <div className="space-y-4">
              <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
                <h4 className="text-subsection text-navy mb-1">Category Density Across London Venues</h4>
                <p className="text-xs text-gray-600">Market saturation data showing how crowded each spirit category is and who dominates.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {Object.entries(CATEGORY_DENSITY).map(([cat, data]) => (
                  <div key={cat} className="bg-white rounded-xl p-4 border border-gray-100">
                    <div className="flex items-center gap-2 mb-3">
                      <Wine size={16} className="text-navy" />
                      <h4 className="text-subsection text-navy">{cat}</h4>
                    </div>
                    <div className="space-y-2 text-xs">
                      <div className="flex justify-between"><span className="text-gray-500">Total Listings (28 venues):</span><span className="font-bold text-navy">{data.totalListings}</span></div>
                      <div className="flex justify-between"><span className="text-gray-500">Avg. per Venue:</span><span className="font-bold text-navy">{data.avgPerVenue}</span></div>
                      <div className="flex justify-between"><span className="text-gray-500">Dominant Company:</span>
                        <span className="font-bold" style={{ color: PARENT_COMPANIES[data.dominantCompany]?.color || '#333' }}>{data.dominantCompany}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Top Brands:</span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {(data.topBrands || []).map(b => (
                            <span key={b} className="px-1.5 py-0.5 rounded bg-gray-50 text-gray-700 border border-gray-100 text-xs">{b}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* London Penetration Chart (existing) */}
              <div className="bg-white rounded-xl p-5 border border-gray-100">
                <h3 className="text-subsection text-navy mb-4">London Key Account Penetration by Parent Company</h3>
                <ResponsiveContainer width="100%" height={280}>
                  <BarChart data={parentCompanyPresence} layout="vertical">
                    <XAxis type="number" />
                    <YAxis dataKey="name" type="category" width={140} tick={{ fontSize: 11 }} />
                    <Tooltip formatter={(val) => [`${val} venues`, 'Presence']} />
                    <Bar dataKey="venues" radius={[0,4,4,0]}>
                      {parentCompanyPresence.map((entry, i) => (
                        <Cell key={i} fill={entry.color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}

          {/* ─── BUDGET & BENCHMARKS ─── */}
          {brandSubTab === 'benchmarks' && (
            <div className="space-y-4">
              {/* Budget Benchmarks */}
              <div className="bg-white rounded-xl p-5 border border-gray-100">
                <h3 className="text-subsection text-navy mb-1">On-Trade Budget Benchmarks {'—'} What Brands Actually Spend</h3>
                <p className="text-xs text-gray-400 mb-4">Industry-standard ranges for retros, marketing spend, and activation by account type</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {Object.entries(BUDGET_BENCHMARKS).map(([key, data]) => (
                    <div key={key} className="p-4 rounded-lg border" style={{ borderColor: data.color + '40', backgroundColor: data.color + '08' }}>
                      <h4 className="text-sm font-semibold mb-2" style={{ color: data.color }}>{data.label}</h4>
                      <div className="space-y-1.5 text-xs">
                        <div className="flex justify-between"><span className="text-gray-500">Retro Range:</span><span className="font-semibold text-gray-700">{data.retro}</span></div>
                        <div className="flex justify-between"><span className="text-gray-500">Marketing Spend/Yr:</span><span className="font-semibold text-gray-700">{data.marketingSpend}</span></div>
                        <div><span className="text-gray-500">Typical Features:</span><p className="text-gray-700 mt-0.5">{data.features}</p></div>
                        <div><span className="text-gray-500">Example Accounts:</span><p className="font-medium text-gray-700 mt-0.5">{data.examples}</p></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Corporate vs Independent + Penetration Trend Charts */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-white rounded-xl p-5 border border-gray-100">
                  <h3 className="text-subsection text-navy mb-4">Corporate vs Independent (2021{'–'}2025)</h3>
                  <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={independentVsCorporate}>
                      <XAxis dataKey="year" />
                      <YAxis domain={[0, 50]} />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="Corporate-Backed" stackId="a" fill="#1a237e" radius={[4,4,0,0]} />
                      <Bar dataKey="Independent" stackId="a" fill="#4caf50" radius={[4,4,0,0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div className="bg-white rounded-xl p-5 border border-gray-100">
                  <h3 className="text-subsection text-navy mb-4">Top 5 Penetration Trend (%)</h3>
                  <ResponsiveContainer width="100%" height={250}>
                    <LineChart data={penetrationTrend}>
                      <XAxis dataKey="year" />
                      <YAxis tickFormatter={v => `${v}%`} />
                      <Tooltip formatter={(val) => [`${val}%`]} />
                      <Legend />
                      {(overallDominance.slice(0, 5)).map(d => (
                        <Line key={d.name} type="monotone" dataKey={d.name} stroke={d.color} strokeWidth={2} dot={{ r: 3 }} />
                      ))}
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* 5-Year Dominance */}
              <div className="bg-white rounded-xl p-5 border border-gray-100">
                <h3 className="text-subsection text-navy mb-4">5-Year Cumulative Dominance</h3>
                <div className="space-y-2">
                  {overallDominance.map(d => (
                    <div key={d.name} className="flex items-center gap-3">
                      <div className="w-32 text-sm font-medium text-navy">{d.name}</div>
                      <div className="flex-1 bg-gray-100 rounded-full h-6 relative overflow-hidden">
                        <div className="h-full rounded-full flex items-center" style={{ width: `${d.pct}%`, backgroundColor: d.color }}>
                          <span className="text-white text-xs font-bold pl-2">{d.pct}%</span>
                        </div>
                      </div>
                      <div className="text-xs text-gray-500 w-24 text-right">{d.bars}/{d.total} bars</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Parent Company Portfolio */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {Object.entries(PARENT_COMPANIES).map(([name, data]) => (
                  <div key={name} className="bg-white rounded-xl p-4 border border-gray-100">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: data.color }} />
                      <h4 className="text-subsection text-navy">{name}</h4>
                      <span className="text-xs text-gray-400 ml-auto">{data.brands.length} brands</span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {data.brands.map(brand => (
                        <span key={brand} className="px-1.5 py-0.5 text-xs rounded bg-gray-50 text-gray-600 border border-gray-100">{brand}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Market Insight Box */}
              <div className="bg-gradient-to-r from-navy to-navy-light rounded-xl p-6 text-white">
                <h3 className="font-semibold mb-3">On-Trade Market Intelligence {'—'} Key Findings</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                  <div className="space-y-2">
                    <p className="text-white/90">{'•'} <strong>LVMH</strong> dominates the Michelin-starred restaurant circuit {'—'} Dom P{'é'}rignon and Krug feature in virtually every 2-3 star venue</p>
                    <p className="text-white/90">{'•'} <strong>Bacardi</strong> has the strongest hotel bar programme {'—'} American Bar at The Savoy is a known incubator</p>
                    <p className="text-white/90">{'•'} <strong>Beam Suntory</strong> gaining through Roku Gin partnerships and Nikka award sponsorship {'—'} only company sponsoring 2 separate 50 Best awards</p>
                    <p className="text-white/90">{'•'} <strong>Diageo</strong> covers the widest range {'—'} from volume accounts to luxury, plus Ketel One sponsors the Sustainable Bar Award</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-white/90">{'•'} <strong>Independent brands</strong> getting shelf space: Renais Gin (Scarfes Bar), Desi Daru (Tay{'ē'}r), The Lakes (American Bar, Scarfes)</p>
                    <p className="text-white/90">{'•'} <strong>No/Low</strong> is growing: Seedlip (Diageo) at Plates, Everleaf at Tay{'ē'}r, Lyre{'\u2019'}s expanding</p>
                    <p className="text-white/90">{'•'} <strong>Agave spirits</strong> are the fastest-growing backbar category {'—'} Kol driving from Michelin level</p>
                    <p className="text-white/90">{'•'} <strong>Private members clubs</strong> (Annabel{'\u2019'}s {'£'}55.6M, Arts Club {'£'}30.9M) command highest marketing spend</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ═══════ TAB: MARKET ENTRY ═══════ */}
      {activeTab === 'entry' && (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl p-5 border border-amber-200">
            <h3 className="font-semibold text-navy mb-2 flex items-center gap-2"><Target size={18} /> Market Entry Intelligence</h3>
            <p className="text-sm text-gray-700">Practical intelligence for brands entering the London on-trade. Distribution partners, phased entry playbooks, budget benchmarks, and competitive positioning {'—'} all from the perspective of a small-to-medium brand coming to market.</p>
          </div>

          {/* ─── DISTRIBUTION LANDSCAPE ─── */}
          <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
            <div className="bg-gray-50 px-5 py-3 border-b border-gray-100">
              <h3 className="text-subsection text-navy flex items-center gap-2"><Briefcase size={16} /> UK Distribution Landscape</h3>
              <p className="text-xs text-gray-500 mt-0.5">Key distributors and wholesalers for the UK on-trade {'—'} click for details</p>
            </div>
            <div className="p-5 space-y-3">
              {Object.entries(DISTRIBUTORS).map(([name, dist]) => (
                <div key={name} className="border border-gray-100 rounded-lg overflow-hidden">
                  <div className="p-3 flex items-center gap-3 cursor-pointer hover:bg-gray-50"
                    onClick={() => setExpandedDistributor(expandedDistributor === name ? null : name)}>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-sm text-navy">{name}</span>
                        <span className="text-xs px-2 py-0.5 rounded bg-blue-50 text-blue-700">{dist.type}</span>
                        {dist.parent && <span className="text-xs text-gray-400">({dist.parent})</span>}
                      </div>
                    </div>
                    {expandedDistributor === name ? <ChevronUp size={16} className="text-gray-400" /> : <ChevronDown size={16} className="text-gray-400" />}
                  </div>
                  {expandedDistributor === name && (
                    <div className="border-t border-gray-100 p-3 bg-gray-50 space-y-2 text-xs">
                      <div><span className="font-semibold text-gray-500">Coverage:</span> <span className="text-gray-700">{dist.coverage}</span></div>
                      <div><span className="font-semibold text-gray-500">Key Clients:</span> <span className="text-gray-700">{(dist.keyClients || []).join(', ')}</span></div>
                      <div><span className="font-semibold text-gray-500">Min Order:</span> <span className="text-gray-700">{dist.minOrder}</span></div>
                      <div><span className="font-semibold text-gray-500">Strengths:</span> <span className="text-gray-700">{dist.strengths}</span></div>
                      <div className="bg-green-50 border border-green-100 rounded p-2">
                        <span className="font-semibold text-green-800">Best For:</span> <span className="text-green-700">{dist.bestFor}</span>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* ─── MARKET ENTRY PLAYBOOKS ─── */}
          <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
            <div className="bg-gray-50 px-5 py-3 border-b border-gray-100">
              <h3 className="text-subsection text-navy flex items-center gap-2"><BookOpen size={16} /> Category Entry Playbooks</h3>
              <p className="text-xs text-gray-500 mt-0.5">Phased market entry strategies by spirit category {'—'} realistic timelines, budgets, and target venues</p>
            </div>
            <div className="p-5 space-y-3">
              {Object.entries(ENTRY_PLAYBOOKS).map(([key, pb]) => (
                <div key={key} className="border border-gray-100 rounded-lg overflow-hidden">
                  <div className="p-4 flex items-center gap-3 cursor-pointer hover:bg-gray-50"
                    onClick={() => setEntryCategory(entryCategory === key ? null : key)}>
                    <div className="flex-1">
                      <h4 className="font-semibold text-sm text-navy">{pb.title}</h4>
                      <div className="flex gap-4 mt-1 text-xs text-gray-500">
                        <span>Budget: {pb.estimatedBudget}</span>
                        <span>Timeline: {pb.timeline}</span>
                      </div>
                    </div>
                    {entryCategory === key ? <ChevronUp size={16} className="text-gray-400" /> : <ChevronDown size={16} className="text-gray-400" />}
                  </div>
                  {entryCategory === key && (
                    <div className="border-t border-gray-100 p-4 bg-gray-50 space-y-4">
                      {/* Competition */}
                      <div className="bg-red-50 border border-red-100 rounded-lg p-3">
                        <h5 className="text-xs font-bold text-red-800 mb-1">Competitive Landscape</h5>
                        <p className="text-xs text-red-700">{pb.competition}</p>
                      </div>

                      {/* Phases */}
                      <div className="space-y-3">
                        {['phase1', 'phase2', 'phase3'].map(phaseKey => {
                          const phase = pb[phaseKey];
                          if (!phase) return null;
                          return (
                            <div key={phaseKey} className="bg-white rounded-lg p-3 border border-gray-200">
                              <div className="flex items-center gap-2 mb-2">
                                <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white ${phaseKey === 'phase1' ? 'bg-blue-500' : phaseKey === 'phase2' ? 'bg-amber-500' : 'bg-green-500'}`}>
                                  {phaseKey.slice(-1)}
                                </span>
                                <h5 className="text-xs font-bold text-navy">{phase.name}</h5>
                                <span className="text-xs text-gray-400 ml-auto">{phase.duration}</span>
                              </div>
                              <div className="space-y-1 mb-2">
                                {(phase.actions || []).map((a, ai) => (
                                  <p key={ai} className="text-xs text-gray-700 flex items-start gap-1"><ArrowRight size={10} className="text-navy mt-0.5 flex-shrink-0" /> {a}</p>
                                ))}
                              </div>
                              {phase.targetVenues && phase.targetVenues.length > 0 && (
                                <div className="flex flex-wrap gap-1">
                                  <span className="text-xs text-gray-500">Target:</span>
                                  {phase.targetVenues.map(v => (
                                    <span key={v} className="px-1.5 py-0.5 text-xs rounded bg-navy/10 text-navy font-medium">{v}</span>
                                  ))}
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>

                      {/* Key People & Pitfalls */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="bg-blue-50 rounded-lg p-3 border border-blue-100">
                          <h5 className="text-xs font-bold text-blue-800 mb-1 flex items-center gap-1"><Users size={12} /> Key People to Know</h5>
                          <p className="text-xs text-blue-700">{pb.keyPeople}</p>
                        </div>
                        <div className="bg-amber-50 rounded-lg p-3 border border-amber-100">
                          <h5 className="text-xs font-bold text-amber-800 mb-1 flex items-center gap-1"><Shield size={12} /> Critical Pitfalls</h5>
                          <div className="space-y-1">
                            {(pb.pitfalls || []).map((p, pi) => (
                              <p key={pi} className="text-xs text-amber-700 flex items-start gap-1"><X size={10} className="text-amber-600 mt-0.5 flex-shrink-0" /> {p}</p>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Strategic Insights for Small/Medium Brands */}
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl p-6 border border-amber-200">
            <h3 className="font-semibold text-navy mb-3 flex items-center gap-2">
              <Building2 size={18} /> Strategic Insights for Small-to-Medium Brands
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm text-gray-700">
              <div className="space-y-3">
                <div>
                  <h4 className="font-semibold text-navy">Entry Strategy {'—'} Luxury Accounts</h4>
                  <p>Target independent-minded bars like Satan{'\u2019'}s Whiskers (blind tasting selection), Tay{'ē'}r + Elementary (ingredient-led menus), and Lyaness (6-month R&D cycles). These venues select on quality, not corporate spend.</p>
                </div>
                <div>
                  <h4 className="font-semibold text-navy">Visibility Strategy {'—'} 50 Best Bars</h4>
                  <p>Bars appearing 4+ years in the list (Tay{'ē'}r, Connaught, Jigger & Pony, Paradiso) are the most valuable long-term partnerships. A brand featured here gets global bartender community visibility.</p>
                </div>
                <div>
                  <h4 className="font-semibold text-navy">Sponsorship {'—'} Awards</h4>
                  <p>50 Best award sponsors: Roku (Industry Icon), Nikka (Highest Climber), Disaronno (Highest New Entry), Ketel One (Sustainable Bar). These brands get massive awareness in the bartender community.</p>
                </div>
              </div>
              <div className="space-y-3">
                <div>
                  <h4 className="font-semibold text-navy">Volume vs. Marketing Budget</h4>
                  <p>With limited budgets, avoid competing with LVMH/Diageo in volume accounts. Focus on 5-10 key luxury accounts where quality trumps spend. One listing at Connaught or Scarfes is worth more than 50 generic bar listings.</p>
                </div>
                <div>
                  <h4 className="font-semibold text-navy">Michelin Restaurant Route</h4>
                  <p>The restaurant wine list is harder to crack than the cocktail bar. Start with cocktail-forward Michelin venues (Kol, Brat) rather than wine-focused fine dining (The Ledbury, Core).</p>
                </div>
                <div>
                  <h4 className="font-semibold text-navy">Geographic Trend</h4>
                  <p>Asia{'\u2019'}s share has grown from 32% (2021) to match Europe. Latin America is rising. London remains the strongest single-city hub for on-trade credibility globally.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}


            {/* ═══════ TAB: LONGITUDINAL TRENDS ═══════ */}
      {activeTab === 'trends' && (
        <div className="space-y-6">
          {/* Regional Trend Over Time */}
          <div className="bg-white rounded-xl p-5 border border-gray-100">
            <h3 className="text-subsection text-navy mb-4">Regional Representation in 50 Best Bars (2021–2025)</h3>
            <ResponsiveContainer width="100%" height={350}>
              <LineChart data={regionalTrend}>
                <XAxis dataKey="year" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="Europe" stroke="#1a237e" strokeWidth={2} dot={{ r: 4 }} />
                <Line type="monotone" dataKey="Asia" stroke="#c41e3a" strokeWidth={2} dot={{ r: 4 }} />
                <Line type="monotone" dataKey="North America" stroke="#e65100" strokeWidth={2} dot={{ r: 4 }} />
                <Line type="monotone" dataKey="South America" stroke="#1b5e20" strokeWidth={2} dot={{ r: 4 }} />
                <Line type="monotone" dataKey="Australasia" stroke="#4a148c" strokeWidth={2} dot={{ r: 4 }} />
                <Line type="monotone" dataKey="Middle East & Africa" stroke="#bf360c" strokeWidth={2} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* City Dominance Heatmap */}
          <div className="bg-white rounded-xl p-5 border border-gray-100">
            <h3 className="text-subsection text-navy mb-4">City Representation Heatmap (2021–2025)</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead><tr className="border-b border-gray-200">
                  <th className="text-left py-2 text-gray-500 font-medium">City</th>
                  {YEARS.map(y => <th key={y} className="text-center py-2 text-gray-500 font-medium">{y}</th>)}
                  <th className="text-center py-2 text-gray-500 font-medium">Total</th>
                </tr></thead>
                <tbody>
                  {cityDominance.map(row => (
                    <tr key={row.city} className="border-b border-gray-50">
                      <td className="py-2 font-medium text-navy">{row.city}</td>
                      {YEARS.map(y => (
                        <td key={y} className="py-2 text-center">
                          {row[y] ? (
                            <span className={`inline-block w-8 h-6 leading-6 rounded text-xs font-bold ${row[y] >= 4 ? 'bg-green-500 text-white' : row[y] >= 3 ? 'bg-green-300 text-green-900' : row[y] >= 2 ? 'bg-blue-200 text-blue-800' : 'bg-gray-100 text-gray-600'}`}>
                              {row[y]}
                            </span>
                          ) : <span className="text-gray-300">—</span>}
                        </td>
                      ))}
                      <td className="py-2 text-center font-bold text-navy">{row.total}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Strategic Insights for Small/Medium Brands */}
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl p-6 border border-amber-200">
            <h3 className="font-semibold text-navy mb-3 flex items-center gap-2">
              <Building2 size={18} /> Strategic Insights for Small-to-Medium Brands
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm text-gray-700">
              <div className="space-y-3">
                <div>
                  <h4 className="font-semibold text-navy">Entry Strategy — Luxury Accounts</h4>
                  <p>Target independent-minded bars like Satan's Whiskers (blind tasting selection), Tayēr + Elementary (ingredient-led menus), and Lyaness (6-month R&D cycles). These venues select on quality, not corporate spend.</p>
                </div>
                <div>
                  <h4 className="font-semibold text-navy">Visibility Strategy — 50 Best Bars</h4>
                  <p>Bars appearing 4+ years in the list (Tayēr, Connaught, Jigger & Pony, Paradiso) are the most valuable long-term partnerships. A brand featured here gets global bartender community visibility.</p>
                </div>
                <div>
                  <h4 className="font-semibold text-navy">Sponsorship Awards</h4>
                  <p>50 Best award sponsors: Roku (Industry Icon), Nikka (Highest Climber), Disaronno (Highest New Entry), Ketel One (Sustainable Bar). These brands get massive awareness in the bartender community.</p>
                </div>
              </div>
              <div className="space-y-3">
                <div>
                  <h4 className="font-semibold text-navy">Volume vs. Marketing Budget</h4>
                  <p>With limited budgets, avoid competing with LVMH/Diageo in volume accounts. Focus on 5-10 key luxury accounts where quality trumps spend. One listing at Connaught or Scarfes is worth more than 50 generic bar listings.</p>
                </div>
                <div>
                  <h4 className="font-semibold text-navy">Michelin Restaurant Route</h4>
                  <p>The restaurant wine list is harder to crack than the cocktail bar. Start with cocktail-forward Michelin venues (Kol, Brat) rather than wine-focused fine dining (The Ledbury, Core).</p>
                </div>
                <div>
                  <h4 className="font-semibold text-navy">Geographic Trend</h4>
                  <p>Asia's share has grown from 32% (2021) to match Europe. Latin America is rising. London remains the strongest single-city hub for on-trade credibility globally.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Data Source Note */}
      <div className="text-xs text-gray-400 border-t border-gray-100 pt-4">
        <p>Data compiled from The World's 50 Best Bars (2021–2025), venue menus, press releases, and industry sources. Revenue estimates are approximate based on industry benchmarks and published reports. Brand presence data reflects published menus and known partnerships — actual backbar selection may vary.</p>
      </div>
    </div>
  )
}
