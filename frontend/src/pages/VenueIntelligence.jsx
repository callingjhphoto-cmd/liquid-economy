import React, { useState, useMemo, useEffect } from 'react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, LineChart, Line, Legend, Cell } from 'recharts'
import { MapPin, TrendingUp, Wine, Search, ChevronDown, ChevronUp, ExternalLink, Award, Users, DollarSign, Building2, Briefcase, Target, Shield, Zap, BookOpen, Check, X, ArrowRight } from 'lucide-react'
import {
  PageHeader, Card, MetricCard, BentoGrid, DrillDown, DataTable,
  ChartCard, SourceList, YearSelector,
  EntityLink, BottomSheet, SkeletonCard, SkeletonChart, SubPageNav, ErrorBoundary, DataFreshness
} from '../components/ui'

import {
  FIFTY_BEST_BARS, LONDON_VENUES, AWARD_SPONSORS, SPONSOR_TO_PARENT,
  BAR_AFFILIATIONS, BUDGET_BENCHMARKS, PARENT_COMPANIES, COMPANY_PROFILES,
  DISTRIBUTORS, BRAND_VENUE_MAP, CATEGORY_DENSITY, ENTRY_PLAYBOOKS,
  COMPETITIVE_HEAT, YEARS
} from '../data/venueData'
import { CATEGORICAL, CHART_COLORS } from '../data/chartColors'

// ===== COMPUTED DATA HOOKS =====

function useVenueMetrics(selectedYear) {
  const londonCount = useMemo(() =>
    FIFTY_BEST_BARS[selectedYear]?.filter(b => b.city === 'London').length || 0,
    [selectedYear]
  )
  const ukCount = useMemo(() =>
    FIFTY_BEST_BARS[selectedYear]?.filter(b => b.country === 'UK').length || 0,
    [selectedYear]
  )
  const citiesCount = useMemo(() =>
    new Set(FIFTY_BEST_BARS[selectedYear]?.map(b => b.city) || []).size,
    [selectedYear]
  )
  const topCity = useMemo(() => {
    const cityCount = {}
    ;(FIFTY_BEST_BARS[selectedYear] || []).forEach(b => {
      cityCount[b.city] = (cityCount[b.city] || 0) + 1
    })
    const sorted = Object.entries(cityCount).sort((a, b) => b[1] - a[1])
    return sorted[0] ? `${sorted[0][0]} (${sorted[0][1]})` : '—'
  }, [selectedYear])

  const topParentCompany = useMemo(() => {
    const counts = {}
    LONDON_VENUES.forEach(v => {
      (v.parentCompanies || []).forEach(pc => {
        if (pc === 'Independent') return
        counts[pc] = (counts[pc] || 0) + 1
      })
    })
    const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1])
    return sorted[0] ? sorted[0][0] : '—'
  }, [])

  const perennialBars = useMemo(() => {
    const barYearMap = {}
    YEARS.forEach(year => {
      ;(FIFTY_BEST_BARS[year] || []).forEach(bar => {
        if (!barYearMap[bar.name]) barYearMap[bar.name] = { name: bar.name, city: bar.city, years: [], ranks: {} }
        barYearMap[bar.name].years.push(year)
        barYearMap[bar.name].ranks[year] = bar.rank
      })
    })
    return Object.values(barYearMap)
      .filter(b => b.years.length >= 4)
      .sort((a, b) => b.years.length - a.years.length || (a.ranks[2025] || 99) - (b.ranks[2025] || 99))
  }, [])

  return { londonCount, ukCount, citiesCount, topCity, topParentCompany, perennialBars }
}

function useCityData(selectedYear) {
  return useMemo(() => {
    const cityCount = {}
    ;(FIFTY_BEST_BARS[selectedYear] || []).forEach(b => {
      cityCount[b.city] = (cityCount[b.city] || 0) + 1
    })
    return Object.entries(cityCount)
      .map(([city, count]) => ({ city, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 12)
  }, [selectedYear])
}

function useRegionAnalysis(selectedYear) {
  return useMemo(() => {
    const regionMap = {}
    ;(FIFTY_BEST_BARS[selectedYear] || []).forEach(bar => {
      regionMap[bar.region] = (regionMap[bar.region] || 0) + 1
    })
    return Object.entries(regionMap)
      .map(([name, value]) => ({ name, value, pct: Math.round(value / 50 * 100) }))
      .sort((a, b) => b.value - a.value)
  }, [selectedYear])
}

function useParentPenetration() {
  return useMemo(() => {
    const result = {}
    YEARS.forEach(year => {
      const bars = FIFTY_BEST_BARS[year] || []
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
}

function useIndependentVsCorporate() {
  return useMemo(() => {
    return YEARS.map(year => {
      const bars = FIFTY_BEST_BARS[year] || []
      let corporate = 0, independent = 0
      bars.forEach(bar => {
        const affiliations = BAR_AFFILIATIONS[bar.name] || []
        const nonIndependent = affiliations.filter(a => a !== 'Independent')
        if (nonIndependent.length > 0) corporate++
        else independent++
      })
      return { year: year.toString(), 'Corporate-Backed': corporate, Independent: independent, corpPct: Math.round(corporate / 50 * 100) }
    })
  }, [])
}

function useOverallDominance() {
  return useMemo(() => {
    const parentBars = {}
    const totalUniqueBars = new Set()
    YEARS.forEach(year => {
      ;(FIFTY_BEST_BARS[year] || []).forEach(bar => {
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
}

function useSponsorAnalysis() {
  return useMemo(() => {
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
}

function useRegionalTrend() {
  return useMemo(() => {
    return YEARS.map(year => {
      const regions = {}
      ;(FIFTY_BEST_BARS[year] || []).forEach(bar => {
        regions[bar.region] = (regions[bar.region] || 0) + 1
      })
      return { year: year.toString(), ...regions }
    })
  }, [])
}

function usePenetrationTrend(parentPenetration) {
  return useMemo(() => {
    return YEARS.map(year => {
      const entry = { year: year.toString() }
      const data = parentPenetration[year] || []
      data.forEach(d => { entry[d.name] = d.pct })
      return entry
    })
  }, [parentPenetration])
}

function useCityDominance() {
  return useMemo(() => {
    const cityMap = {}
    YEARS.forEach(year => {
      ;(FIFTY_BEST_BARS[year] || []).forEach(bar => {
        if (!cityMap[bar.city]) cityMap[bar.city] = {}
        if (!cityMap[bar.city][year]) cityMap[bar.city][year] = 0
        cityMap[bar.city][year]++
      })
    })
    return Object.entries(cityMap)
      .map(([city, years]) => ({ city, ...years, total: Object.values(years).reduce((a, b) => a + b, 0) }))
      .sort((a, b) => b.total - a.total)
      .slice(0, 15)
  }, [])
}

function useParentCompanyPresence() {
  return useMemo(() => {
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
}

// ===== MAIN COMPONENT =====

export default function VenueIntelligence() {
  // State
  const [selectedYear, setSelectedYear] = useState(2025)
  const [venueSearch, setVenueSearch] = useState('')
  const [expandedSection, setExpandedSection] = useState(null)
  // showMoreAnalysis state removed — DrillDowns are now flat peers
  const [expandedVenue, setExpandedVenue] = useState(null)
  const [selectedCompany, setSelectedCompany] = useState(null)
  const [showFullList, setShowFullList] = useState(false)
  const [showFullVenueTable, setShowFullVenueTable] = useState(false)
  const [accountFilter, setAccountFilter] = useState('All')
  const [brandFilterCompany, setBrandFilterCompany] = useState('All')
  const [entryCategory, setEntryCategory] = useState(null)
  const [expandedDistributor, setExpandedDistributor] = useState(null)
  const [mobileDetail, setMobileDetail] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 300)
    return () => clearTimeout(timer)
  }, [])

  // Data hooks
  const { londonCount, ukCount, citiesCount, topCity, topParentCompany, perennialBars } = useVenueMetrics(selectedYear)
  const cityData = useCityData(selectedYear)
  const regionAnalysis = useRegionAnalysis(selectedYear)
  const parentPenetration = useParentPenetration()
  const independentVsCorporate = useIndependentVsCorporate()
  const overallDominance = useOverallDominance()
  const sponsorAnalysis = useSponsorAnalysis()
  const regionalTrend = useRegionalTrend()
  const penetrationTrend = usePenetrationTrend(parentPenetration)
  const cityDominance = useCityDominance()
  const parentCompanyPresence = useParentCompanyPresence()

  // Filtered London venues
  const filteredVenues = useMemo(() => {
    return LONDON_VENUES.filter(v => {
      const q = venueSearch.toLowerCase()
      const matchSearch = !q ||
        v.name.toLowerCase().includes(q) ||
        v.area.toLowerCase().includes(q) ||
        (v.knownBrands || []).some(b => b.toLowerCase().includes(q))
      const matchAccount = accountFilter === 'All' || v.accountType === accountFilter
      return matchSearch && matchAccount
    })
  }, [venueSearch, accountFilter])

  // DataTable columns for Tier 3 venue table
  const venueTableColumns = useMemo(() => [
    { key: 'name', label: 'Venue', sortable: true, render: (val) => <span className="font-medium text-navy">{val}</span> },
    { key: 'area', label: 'Area', sortable: true },
    { key: 'type', label: 'Type', sortable: true },
    { key: 'accountType', label: 'Account', sortable: true, render: (val) => {
      const colors = { Luxury: 'bg-purple-100 text-purple-700', Volume: 'bg-green-100 text-green-700', Both: 'bg-amber-100 text-amber-700' }
      return <span className={`px-1.5 py-0.5 rounded text-micro font-medium ${colors[val] || 'bg-gray-100 text-gray-600'}`}>{val}</span>
    }},
    { key: 'estRevenue', label: 'Est. Revenue', sortable: true, align: 'right' },
    { key: 'parentCompanies', label: 'Parent Cos', sortable: false, render: (val) => (val || []).join(', ') },
  ], [])

  // DataTable columns for full 50 Best list
  const fiftyBestColumns = useMemo(() => [
    { key: 'rank', label: '#', sortable: true, align: 'right', width: 'w-12', render: (val) => <span className={`font-bold ${val <= 10 ? 'text-gold' : 'text-gray-500'}`}>{val}</span> },
    { key: 'name', label: 'Bar', sortable: true, render: (val) => <span className="font-medium text-navy">{val}</span> },
    { key: 'city', label: 'City', sortable: true },
    { key: 'country', label: 'Country', sortable: true },
    { key: 'region', label: 'Region', sortable: true },
  ], [])

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section)
  }

  // Mobile: show venue detail in BottomSheet instead of inline expand
  const handleVenueToggle = (venue, index) => {
    if (window.innerWidth < 1024) {
      setMobileDetail({
        title: venue.name,
        content: (
          <div className="space-y-3">
            <div className="flex items-center gap-2 flex-wrap">
              <span className={`px-1.5 py-0.5 rounded text-micro font-medium ${venue.accountType === 'Luxury' ? 'bg-purple-100 text-purple-700' : venue.accountType === 'Volume' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                {venue.accountType}
              </span>
              <span className="px-1.5 py-0.5 bg-gray-100 text-gray-600 rounded text-micro">{venue.type}</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <div className="bg-gray-50 rounded-lg p-2.5 text-center">
                <div className="text-xs text-gray-500 uppercase">Area</div>
                <div className="text-xs font-bold text-navy">{venue.area}</div>
              </div>
              <div className="bg-gray-50 rounded-lg p-2.5 text-center">
                <div className="text-xs text-gray-500 uppercase">Est. Revenue</div>
                <div className="text-xs font-bold text-navy">{venue.estRevenue}/yr</div>
              </div>
            </div>
            {venue.fiftyBest && venue.fiftyBest.some(r => r) && (
              <div>
                <p className="text-micro font-semibold text-gray-500 uppercase mb-1">50 Best Rankings (2021→2025)</p>
                <div className="flex gap-1.5 flex-wrap">
                  {YEARS.map((y, idx) => (
                    <span key={y} className={`px-1.5 py-0.5 rounded text-micro ${venue.fiftyBest[idx] ? (venue.fiftyBest[idx] <= 10 ? 'bg-green-100 text-green-700 font-bold' : 'bg-blue-100 text-blue-700') : 'bg-gray-100 text-gray-500'}`}>
                      {y}: {venue.fiftyBest[idx] ? `#${venue.fiftyBest[idx]}` : '—'}
                    </span>
                  ))}
                </div>
              </div>
            )}
            {venue.knownBrands && venue.knownBrands.length > 0 && (
              <div>
                <p className="text-micro font-semibold text-gray-500 uppercase mb-1">Brands / Partnerships</p>
                <div className="flex flex-wrap gap-1">
                  {venue.knownBrands.map(brand => <span key={brand} className="px-1.5 py-0.5 bg-white border border-gray-200 rounded text-micro text-gray-700">{brand}</span>)}
                </div>
              </div>
            )}
            {venue.parentCompanies && venue.parentCompanies.length > 0 && (
              <div>
                <p className="text-micro font-semibold text-gray-500 uppercase mb-1">Parent Companies</p>
                <div className="flex flex-wrap gap-1">
                  {venue.parentCompanies.map(pc => (
                    <span key={pc} className="px-1.5 py-0.5 bg-gold/10 text-navy rounded text-micro font-medium">{pc}</span>
                  ))}
                </div>
              </div>
            )}
            {venue.founders && <p className="text-xs text-gray-600"><span className="font-semibold">Key People:</span> {venue.founders}</p>}
            <p className="text-xs text-gray-600"><span className="font-semibold">Intel:</span> {venue.notes}</p>
          </div>
        )
      })
      return
    }
    setExpandedVenue(expandedVenue === index ? null : index)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-surface p-3 sm:p-4 lg:p-6 max-w-7xl mx-auto space-y-6">
        <PageHeader title="Venue & On-Trade Intelligence" subtitle="Loading venue data…" />
        <BentoGrid>
          <BentoGrid.Hero><SkeletonCard className="h-40" /></BentoGrid.Hero>
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
        </BentoGrid>
        <SkeletonChart />
        <SkeletonCard className="h-24" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-surface p-3 sm:p-4 lg:p-6 max-w-7xl mx-auto space-y-6">
      <PageHeader
        title="Venue & On-Trade Intelligence"
        subtitle={`${LONDON_VENUES.length} London venues · World’s 50 Best Bars 2021–2025 · ${Object.keys(COMPANY_PROFILES).length} company profiles · Data as of April 2026`}
        breadcrumbs={[
          { label: 'Command Centre', to: '/' },
          { label: 'Venue Intelligence' },
        ]}
        action={<YearSelector activeYear={selectedYear} onChange={setSelectedYear} years={YEARS} />}
      />
      <SubPageNav group="intelligence" />
      <DataFreshness date="April 2026" source="World’s 50 Best Bars, Imbibe, Difford’s Guide, venue intel" />

      {/* ═══════ SEARCH BAR (Search-First UX) ═══════ */}
      <div className="relative">
        <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search venues, areas, brands, or companies…"
          value={venueSearch}
          onChange={e => setVenueSearch(e.target.value)}
          className="w-full pl-12 pr-4 py-3.5 bg-white border border-gray-200 rounded-xl text-sm shadow-sm focus:ring-2 focus:ring-navy/20 focus:border-navy transition-all"
        />
        {venueSearch && (
          <button onClick={() => setVenueSearch('')} className="absolute right-2 top-1/2 -translate-y-1/2 p-2 min-h-[44px] min-w-[44px] flex items-center justify-center text-gray-600 hover:text-gray-700 touch-manipulation">
            <X size={16} />
          </button>
        )}
      </div>

      {/* Show search results if searching */}
      {venueSearch ? (
        <div className="space-y-3">
          <p className="text-xs text-gray-500">{filteredVenues.length} venue{filteredVenues.length !== 1 ? 's' : ''} matching &ldquo;{venueSearch}&rdquo;</p>
          {filteredVenues.map((venue, i) => (
            <VenueCard key={i} venue={venue} index={i} expanded={expandedVenue === i}
              onToggle={() => handleVenueToggle(venue, i)} />
          ))}
        </div>
      ) : (
        <>
          {/* ═══════ TIER 1: BENTO GRID SUMMARY ═══════ */}
          <BentoGrid>
            {/* Hero card */}
            <BentoGrid.Hero>
              <Card className="h-full" hover onClick={() => toggleSection('50best')}>
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="text-label text-gray-500">World{'’'}s 50 Best Bars {selectedYear}</p>
                    <p className="text-3xl font-bold text-navy mt-1">{londonCount}</p>
                    <p className="text-sm text-gray-500 mt-0.5">London bars in Top 50</p>
                  </div>
                  <Award size={24} className="text-gold" />
                </div>
                <div className="space-y-2 mt-4">
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-500">Total UK bars</span>
                    <span className="font-semibold text-navy">{ukCount}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-500">Cities represented</span>
                    <span className="font-semibold text-navy">{citiesCount}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-500">Top city</span>
                    <span className="font-semibold text-navy">{topCity}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-500">Perennial bars (4+ yrs)</span>
                    <span className="font-semibold text-navy">{perennialBars.length}</span>
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-3">Click to explore rankings {'→'}</p>
              </Card>
            </BentoGrid.Hero>

            {/* KPI cards */}
            <Card hover onClick={() => toggleSection('venues')}>
              <MetricCard
                label="London Venue Profiles"
                value={LONDON_VENUES.length}
                subtitle="Key on-trade accounts"
                icon={MapPin}
              />
            </Card>

            <Card hover onClick={() => toggleSection('companies')}>
              <MetricCard
                label="Top Parent Company"
                value={topParentCompany}
                subtitle={`${Object.keys(COMPANY_PROFILES).length} companies profiled`}
                icon={Building2}
              />
            </Card>

            <Card hover onClick={() => toggleSection('venues')}>
              <MetricCard
                label="Avg Budget Range"
                value={BUDGET_BENCHMARKS?.luxury?.marketingSpend || '£15-50k'}
                subtitle="Luxury account marketing/yr"
                icon={DollarSign}
              />
            </Card>

            <Card hover onClick={() => toggleSection('entry')}>
              <MetricCard
                label="Entry Playbooks"
                value={Object.keys(ENTRY_PLAYBOOKS).length}
                subtitle="Category-specific strategies"
                icon={Target}
              />
            </Card>
          </BentoGrid>

          {/* ═══════ VENUE INTELLIGENCE — Liquid Intelligence ═══════ */}
          <div className="border-l-4 border-gold bg-gradient-to-r from-gold/5 to-transparent rounded-xl p-5">
            <div className="flex items-center gap-2 mb-4">
              <Zap size={16} className="text-gold" />
              <span className="text-sm font-bold text-navy">Venue Intelligence Signals</span>
              <span className="text-xs text-gray-400 ml-auto">{selectedYear}</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* Signal 1: London presence window */}
              {(() => {
                const hi = londonCount >= 4
                const lo = londonCount <= 1
                return (
                  <div className={`p-3 rounded-lg border ${hi ? 'bg-emerald-50 border-emerald-200' : lo ? 'bg-amber-50 border-amber-200' : 'bg-blue-50 border-blue-200'}`}>
                    <div className={`text-xs font-semibold mb-1 ${hi ? 'text-emerald-700' : lo ? 'text-amber-700' : 'text-blue-700'}`}>
                      London Access: {londonCount} bars in Top 50
                    </div>
                    <p className={`text-xs leading-relaxed ${hi ? 'text-emerald-600' : lo ? 'text-amber-600' : 'text-blue-600'}`}>
                      {hi
                        ? 'Strong London window — multiple tier-1 venues available for on-trade entry and perennial brand partnerships.'
                        : lo
                        ? 'Thin London footprint — single flagship raises dependency risk; consider Edinburgh or Bristol as complementary markets.'
                        : 'Selective access — viable entry routes exist; focus on perennial bars for resilient long-term on-trade positioning.'}
                    </p>
                  </div>
                )
              })()}

              {/* Signal 2: Corporate lock-in */}
              {(() => {
                const corp = independentVsCorporate.find(d => d.year === selectedYear.toString())?.corpPct || 0
                const lo = corp < 40
                const hi = corp >= 55
                return (
                  <div className={`p-3 rounded-lg border ${lo ? 'bg-emerald-50 border-emerald-200' : hi ? 'bg-amber-50 border-amber-200' : 'bg-blue-50 border-blue-200'}`}>
                    <div className={`text-xs font-semibold mb-1 ${lo ? 'text-emerald-700' : hi ? 'text-amber-700' : 'text-blue-700'}`}>
                      Corporate Lock-in: {corp}% of Top 50
                    </div>
                    <p className={`text-xs leading-relaxed ${lo ? 'text-emerald-600' : hi ? 'text-amber-600' : 'text-blue-600'}`}>
                      {lo
                        ? 'Independent-friendly landscape — bartender community open to quality-led brands; credibility-first entry is the winning play.'
                        : hi
                        ? 'High corporate lock-in — majority of top bars tied to major groups; target independent accounts and 50 Best perennial venues.'
                        : 'Mixed environment — significant corporate presence but independent placement is achievable for differentiated products.'}
                    </p>
                  </div>
                )
              })()}

              {/* Signal 3: Market leader concentration */}
              {(() => {
                const topPct = parentPenetration[selectedYear]?.[0]?.pct || 0
                const topName = parentPenetration[selectedYear]?.[0]?.name || '—'
                const lo = topPct < 25
                const hi = topPct >= 40
                return (
                  <div className={`p-3 rounded-lg border ${lo ? 'bg-emerald-50 border-emerald-200' : hi ? 'bg-gold/10 border-gold/30' : 'bg-blue-50 border-blue-200'}`}>
                    <div className={`text-xs font-semibold mb-1 ${lo ? 'text-emerald-700' : hi ? 'text-amber-800' : 'text-blue-700'}`}>
                      Top Company: {topName} ({topPct}%)
                    </div>
                    <p className={`text-xs leading-relaxed ${lo ? 'text-emerald-600' : hi ? 'text-amber-700' : 'text-blue-600'}`}>
                      {lo
                        ? 'Fragmented field — no dominant lock; well-positioned quality brands can self-select into multiple venues without displacement risk.'
                        : hi
                        ? `Dominant concentration — ${topName} controls ${topPct}% of top bars; back-bar space is contested. Focus on 5–10 independent flagship accounts.`
                        : `Strong player present — ${topName} leads but the field remains contestable; 5–8 key account relationships build credible on-trade presence.`}
                    </p>
                  </div>
                )
              })()}
            </div>
          </div>

          {/* ═══════ TIER 2: DRILL-DOWN SECTIONS ═══════ */}

          {/* --- 50 Best Bars Analysis --- */}
          <ErrorBoundary message="50 Best Bars section failed to load.">
          <DrillDown
            title="50 Best Bars Rankings"
            summary={`London: ${londonCount} bars · ${citiesCount} cities · ${perennialBars.length} perennial bars`}
            defaultOpen={false}
          >
            <div className="space-y-6">
              {/* Region + City charts */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <ChartCard title={`Regional Distribution — ${selectedYear}`} height={240}>
                  <BarChart data={regionAnalysis} layout="vertical" accessibilityLayer={true}>
                    <XAxis type="number" tick={{ fontSize: 11, fill: '#9ca3af' }} />
                    <YAxis dataKey="name" type="category" width={120} tick={{ fontSize: 11, fill: '#9ca3af' }} />
                    <Tooltip formatter={(val) => [`${val} bars (${Math.round(val / 50 * 100)}%)`]} contentStyle={{ background: '#1e293b', border: 'none', borderRadius: 8, fontSize: 11 }} labelStyle={{ color: '#f1f5f9' }} itemStyle={{ color: '#f1f5f9' }} />
                    <Bar dataKey="value" fill={CHART_COLORS.primary} radius={[0, 4, 4, 0]}>
                      {regionAnalysis.map((_, i) => <Cell key={i} fill={CATEGORICAL[i % CATEGORICAL.length]} />)}
                    </Bar>
                  </BarChart>
                </ChartCard>

                <ChartCard title={`Top Cities by Entries — ${selectedYear}`} height={240}>
                  <BarChart data={cityData} layout="vertical" accessibilityLayer={true}>
                    <XAxis type="number" tick={{ fontSize: 11, fill: '#9ca3af' }} />
                    <YAxis dataKey="city" type="category" width={100} tick={{ fontSize: 11, fill: '#9ca3af' }} />
                    <Tooltip contentStyle={{ background: '#1e293b', border: 'none', borderRadius: 8, fontSize: 11 }} labelStyle={{ color: '#f1f5f9' }} itemStyle={{ color: '#f1f5f9' }} />
                    <Bar dataKey="count" fill={CHART_COLORS.primary} radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ChartCard>
              </div>

              {/* Perennial bars */}
              <Card>
                <h4 className="text-sm font-semibold text-navy mb-1">Perennial Bars {'—'} Appeared 4+ Years</h4>
                <p className="text-xs text-gray-500 mb-3">Key accounts for brand partnerships</p>
                <div className="max-h-72 overflow-y-auto overflow-x-auto">
                  <div className="min-w-[480px]">
                  {perennialBars.map(bar => (
                    <div key={bar.name} className="flex items-center gap-3 py-1.5 border-b border-gray-50 last:border-0">
                      <div className="w-36 font-medium text-xs text-navy truncate">{bar.name}</div>
                      <div className="w-20 text-xs text-gray-500">{bar.city}</div>
                      <span className={`px-1.5 py-0.5 rounded text-micro font-bold ${bar.years.length === 5 ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>
                        {bar.years.length}/5
                      </span>
                      <div className="flex gap-1.5 flex-1">
                        {YEARS.map(y => (
                          <span key={y} className={`text-micro w-10 text-center ${bar.ranks[y] ? (bar.ranks[y] <= 10 ? 'font-bold text-green-600' : 'text-gray-600') : 'text-gray-300'}`}>
                            {bar.ranks[y] ? `#${bar.ranks[y]}` : '—'}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                  </div>
                </div>
              </Card>

              {/* Tier 3 CTA */}
              <div className="flex justify-center">
                <button
                  onClick={() => setShowFullList(!showFullList)}
                  className="px-4 py-2 min-h-[44px] text-xs font-medium text-navy border border-navy/20 rounded-lg hover:bg-navy hover:text-white transition-colors touch-manipulation"
                >
                  {showFullList ? 'Hide Full Rankings' : `View Full ${selectedYear} Rankings (50 bars)`}
                </button>
              </div>

              {/* Tier 3: Full DataTable */}
              {showFullList && (
                <DataTable
                  columns={fiftyBestColumns}
                  data={FIFTY_BEST_BARS[selectedYear] || []}
                  searchable
                  searchPlaceholder="Search bars…"
                  searchKey="name"
                  compact
                  exportable
                />
              )}

              <SourceList sources={[
                { label: "World’s 50 Best Bars", url: 'https://www.worlds50bestbars.com/' },
              ]} />
            </div>
          </DrillDown>
          </ErrorBoundary>

          {/* --- London Venue Profiles --- */}
          <ErrorBoundary message="London venues section failed to load.">
          <DrillDown
            title="London Key Accounts"
            summary={`${LONDON_VENUES.length} venues profiled · Search by name, area, or brand`}
          >
            <div className="space-y-4">
              {/* Filter pills */}
              <div className="flex gap-2 flex-wrap">
                {['All', 'Luxury', 'Volume', 'Both'].map(f => (
                  <button key={f} onClick={() => setAccountFilter(f)}
                    className={`px-3 py-2 min-h-[44px] rounded-lg text-xs font-medium border transition-colors touch-manipulation ${accountFilter === f ? 'bg-navy text-white border-navy' : 'bg-white text-gray-500 border-gray-200 hover:border-gray-400'}`}>
                    {f}
                  </button>
                ))}
              </div>

              {/* Account Type Legend */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-gray-600">
                <div><span className="font-bold text-purple-600">Luxury:</span> Notoriety-driven, marketing spend, menu placement</div>
                <div><span className="font-bold text-green-600">Volume:</span> High-throughput, retros, aggressive pricing</div>
                <div><span className="font-bold text-amber-600">Both:</span> Rare — high volume AND prestige (e.g. Annabel’s)</div>
              </div>

              {/* Venue cards */}
              <div className="space-y-2">
                {filteredVenues.slice(0, 10).map((venue, i) => (
                  <VenueCard key={i} venue={venue} index={i} expanded={expandedVenue === i}
                    onToggle={() => handleVenueToggle(venue, i)} />
                ))}
              </div>

              {/* Tier 3 CTA */}
              <div className="flex justify-center">
                <button
                  onClick={() => setShowFullVenueTable(!showFullVenueTable)}
                  className="px-4 py-2 min-h-[44px] text-xs font-medium text-navy border border-navy/20 rounded-lg hover:bg-navy hover:text-white transition-colors touch-manipulation"
                >
                  {showFullVenueTable ? 'Hide Full Venue Table' : `View All ${LONDON_VENUES.length} Venues in Table`}
                </button>
              </div>

              {showFullVenueTable && (
                <DataTable
                  columns={venueTableColumns}
                  data={LONDON_VENUES}
                  searchable
                  searchPlaceholder="Search venues…"
                  searchKey="name"
                  compact
                  exportable
                />
              )}

              <SourceList sources={[
                { label: 'Companies House', url: 'https://www.gov.uk/government/organisations/companies-house' },
                { label: 'Venue menus & press releases' },
              ]} />
            </div>
          </DrillDown>
          </ErrorBoundary>

          {/* --- Corporate Penetration --- */}
          <ErrorBoundary message="Corporate penetration section failed to load.">
          <DrillDown
            title="Corporate Penetration"
            summary={`${Object.keys(COMPANY_PROFILES).length} companies profiled · Corporate vs independent trends`}
          >
            <div className="space-y-6">
              {/* Headline stats */}
              <BentoGrid>
                <Card>
                  <p className="text-label text-gray-500">Corporate-Backed ({selectedYear})</p>
                  <p className="text-2xl font-bold text-navy mt-1">{independentVsCorporate.find(d => d.year === selectedYear.toString())?.corpPct || 0}%</p>
                  <p className="text-xs text-gray-500">of Top 50 have major company presence</p>
                </Card>
                <Card>
                  <p className="text-label text-gray-500">Top Company ({selectedYear})</p>
                  <p className="text-lg font-bold mt-1" style={{ color: PARENT_COMPANIES[parentPenetration[selectedYear]?.[0]?.name]?.color || '#333' }}>
                    {parentPenetration[selectedYear]?.[0]?.name || '—'}
                  </p>
                  <p className="text-xs text-gray-500">{parentPenetration[selectedYear]?.[0]?.pct}% penetration</p>
                </Card>
                <Card>
                  <p className="text-label text-gray-500">Independent Bars ({selectedYear})</p>
                  <p className="text-2xl font-bold text-green-600 mt-1">{independentVsCorporate.find(d => d.year === selectedYear.toString())?.Independent || 0}</p>
                  <p className="text-xs text-gray-500">not tied to a major parent</p>
                </Card>
                <Card>
                  <p className="text-label text-gray-500">Companies Profiled</p>
                  <p className="text-2xl font-bold text-navy mt-1">{Object.keys(COMPANY_PROFILES).length}</p>
                  <p className="text-xs text-gray-500">major parent companies</p>
                </Card>
              </BentoGrid>

              {/* Penetration chart */}
              <ChartCard title={`Parent Company Penetration: % of Top 50 Bars (${selectedYear})`} subtitle="Click a company bar for their full profile" height={280}>
                <BarChart data={parentPenetration[selectedYear] || []} layout="vertical" accessibilityLayer={true}>
                  <XAxis type="number" domain={[0, 70]} tickFormatter={v => `${v}%`} tick={{ fontSize: 11, fill: '#9ca3af' }} />
                  <YAxis dataKey="name" type="category" width={140} tick={{ fontSize: 11, fill: '#9ca3af' }} />
                  <Tooltip formatter={(val) => [`${val}%`, 'Penetration']} contentStyle={{ background: '#1e293b', border: 'none', borderRadius: 8, fontSize: 11 }} labelStyle={{ color: '#f1f5f9' }} itemStyle={{ color: '#f1f5f9' }} />
                  <Bar dataKey="pct" radius={[0, 4, 4, 0]} cursor="pointer" onClick={(data) => setSelectedCompany(data?.name || null)}>
                    {(parentPenetration[selectedYear] || []).map((entry, i) => (
                      <Cell key={i} fill={PARENT_COMPANIES[entry.name]?.color || '#666'} />
                    ))}
                  </Bar>
                </BarChart>
              </ChartCard>

              {/* Company cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {Object.entries(COMPANY_PROFILES).map(([name, profile]) => (
                  <CompanyCard
                    key={name}
                    name={name}
                    profile={profile}
                    expanded={selectedCompany === name}
                    onToggle={() => setSelectedCompany(selectedCompany === name ? null : name)}
                  />
                ))}
              </div>

              {/* Sponsor analysis */}
              <Card>
                <h4 className="text-sm font-semibold text-navy mb-1">Award Sponsor Intelligence</h4>
                <p className="text-xs text-gray-500 mb-3">Brands sponsoring 50 Best Bar awards gain bartender community visibility</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {sponsorAnalysis.map(s => (
                    <div key={s.brand} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg border border-gray-100">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-semibold text-navy">{s.brand}</span>
                          <EntityLink type="company" id={s.parent.toLowerCase().replace(/\s+/g, '-')} label={s.parent} className="text-xs" />
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
              </Card>
            </div>
          </DrillDown>
          </ErrorBoundary>

          {/* --- Brand & Venue Mapping --- */}
          <ErrorBoundary message="Brand venue mapping failed to load.">
          <DrillDown
            title="Brand & Venue Mapping"
            summary={`${Object.keys(BRAND_VENUE_MAP).length}+ brands mapped · Category density across London venues`}
          >
            <div className="space-y-6">
              {/* Brand-to-Venue Mapping */}
              <Card>
                <h4 className="text-sm font-semibold text-navy mb-2">Brand-to-Venue Mapping</h4>
                <p className="text-xs text-gray-500 mb-3">Filter by parent company to see their venue footprint</p>
                <div className="flex gap-1.5 flex-wrap mb-4">
                  {['All', ...Object.keys(PARENT_COMPANIES)].map(co => (
                    <button key={co} onClick={() => setBrandFilterCompany(co)}
                      className={`px-2.5 py-1.5 min-h-[36px] rounded text-micro font-medium border transition-colors touch-manipulation ${brandFilterCompany === co ? 'bg-navy text-white border-navy' : 'bg-white text-gray-500 border-gray-200 hover:border-gray-400'}`}>
                      {co}
                    </button>
                  ))}
                </div>
                <div className="space-y-2 max-h-96 overflow-y-auto">
                  {Object.entries(BRAND_VENUE_MAP)
                    .filter(([brand]) => {
                      if (brandFilterCompany === 'All') return true
                      const companyBrands = PARENT_COMPANIES[brandFilterCompany]?.brands || []
                      return companyBrands.some(b => b.toLowerCase() === brand.toLowerCase() || brand.toLowerCase().includes(b.toLowerCase()))
                    })
                    .sort((a, b) => b[1].length - a[1].length)
                    .map(([brand, venues]) => {
                      const parentMatch = Object.entries(PARENT_COMPANIES).find(([, data]) =>
                        data.brands.some(b => b.toLowerCase() === brand.toLowerCase() || brand.toLowerCase().includes(b.toLowerCase()))
                      )
                      return (
                        <div key={brand} className="p-2.5 rounded-lg border border-gray-100">
                          <div className="flex items-center gap-2 mb-1.5">
                            <span className="font-medium text-xs text-navy">{brand}</span>
                            {parentMatch && <span className="text-xs px-1.5 py-0.5 rounded font-medium" style={{ backgroundColor: (parentMatch[1].color || '#666') + '15', color: parentMatch[1].color }}>{parentMatch[0]}</span>}
                            <span className="ml-auto text-micro font-bold text-navy bg-navy/10 px-1.5 py-0.5 rounded">{venues.length}</span>
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {venues.map(v => <span key={v} className="px-1.5 py-0.5 text-micro rounded bg-gray-50 text-gray-600 border border-gray-100">{v}</span>)}
                          </div>
                        </div>
                      )
                    })}
                </div>
              </Card>

              {/* Category Density */}
              <Card>
                <h4 className="text-sm font-semibold text-navy mb-2">Category Density Across London Venues</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {Object.entries(CATEGORY_DENSITY).map(([cat, data]) => (
                    <div key={cat} className="p-3 rounded-lg border border-gray-100">
                      <div className="flex items-center gap-2 mb-2">
                        <Wine size={14} className="text-navy" />
                        <h5 className="text-xs font-semibold text-navy">{cat}</h5>
                      </div>
                      <div className="space-y-1 text-xs">
                        <div className="flex justify-between"><span className="text-gray-500">Total listings:</span><span className="font-bold text-navy">{data.totalListings}</span></div>
                        <div className="flex justify-between"><span className="text-gray-500">Avg per venue:</span><span className="font-bold text-navy">{data.avgPerVenue}</span></div>
                        <div className="flex justify-between"><span className="text-gray-500">Dominant:</span>
                          <EntityLink type="company" id={data.dominantCompany?.toLowerCase().replace(/\s+/g, '-')} label={data.dominantCompany} className="font-bold text-xs" />
                        </div>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {(data.topBrands || []).map(b => <span key={b} className="px-1 py-0.5 rounded bg-gray-50 text-gray-700 border border-gray-100">{b}</span>)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </DrillDown>
          </ErrorBoundary>

          {/* --- Competitive Heat Map --- */}
          <ErrorBoundary message="Competitive heat map failed to load.">
          <DrillDown
            title="Competitive Heat Map"
            summary="Which company dominates which category in each venue tier"
          >
            <div className="space-y-4">
              {Object.entries(COMPETITIVE_HEAT).map(([category, tiers]) => (
                <div key={category} className="mb-4 last:mb-0">
                  <h5 className="text-xs font-semibold text-navy mb-2 border-b border-gray-100 pb-1">{category}</h5>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
                    {Object.entries(tiers).map(([tier, data]) => {
                      const dominantColor = PARENT_COMPANIES[data.dominant]?.color || '#666'
                      return (
                        <div key={tier} className="rounded-lg p-2.5 border" style={{ borderColor: dominantColor + '30', backgroundColor: dominantColor + '05' }}>
                          <p className="text-micro text-gray-500 uppercase tracking-wider mb-1">{tier.replace(/([A-Z])/g, ' $1').trim()}</p>
                          <p className="text-xs font-bold" style={{ color: dominantColor }}>{data.dominant}</p>
                          <p className="text-xs text-gray-500">{(data.brands || []).join(', ')}</p>
                          <div className="border-t border-gray-100 pt-1 mt-1">
                            <p className="text-xs text-gray-500">Challenger: <span className="font-medium" style={{ color: PARENT_COMPANIES[data.challenger]?.color || '#999' }}>{data.challenger}</span></p>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              ))}
            </div>
          </DrillDown>
          </ErrorBoundary>

          {/* --- Longitudinal Trends --- */}
          <ErrorBoundary message="Longitudinal trends failed to load.">
          <DrillDown
            title="Longitudinal Trends (2021–2025)"
            summary="Regional shifts, city dominance heatmap, geographic trends"
          >
            <div className="space-y-6">
              <ChartCard title="Regional Representation in 50 Best Bars" height={300}>
                <LineChart data={regionalTrend} accessibilityLayer={true}>
                  <XAxis dataKey="year" tick={{ fontSize: 11, fill: '#9ca3af' }} />
                  <YAxis tick={{ fontSize: 11, fill: '#9ca3af' }} />
                  <Tooltip contentStyle={{ background: '#1e293b', border: 'none', borderRadius: 8, fontSize: 11 }} labelStyle={{ color: '#f1f5f9' }} itemStyle={{ color: '#f1f5f9' }} />
                  <Legend />
                  <Line type="monotone" dataKey="Europe" stroke={CATEGORICAL[0]} strokeWidth={2} dot={{ r: 4 }} />
                  <Line type="monotone" dataKey="Asia" stroke={CATEGORICAL[1]} strokeWidth={2} dot={{ r: 4 }} />
                  <Line type="monotone" dataKey="North America" stroke={CATEGORICAL[2]} strokeWidth={2} dot={{ r: 4 }} />
                  <Line type="monotone" dataKey="South America" stroke={CATEGORICAL[3]} strokeWidth={2} dot={{ r: 4 }} />
                  <Line type="monotone" dataKey="Australasia" stroke={CATEGORICAL[4]} strokeWidth={2} dot={{ r: 4 }} />
                  <Line type="monotone" dataKey="Middle East & Africa" stroke={CATEGORICAL[5]} strokeWidth={2} dot={{ r: 4 }} />
                </LineChart>
              </ChartCard>

              {/* City dominance heatmap */}
              <Card>
                <h4 className="text-sm font-semibold text-navy mb-3">City Representation Heatmap</h4>
                <div className="relative">
                  <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
                  <table className="w-full text-xs min-w-[500px]">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-2 text-gray-500 font-medium">City</th>
                        {YEARS.map(y => <th key={y} className="text-center py-2 text-gray-500 font-medium">{y}</th>)}
                        <th className="text-center py-2 text-gray-500 font-medium">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cityDominance.map(row => (
                        <tr key={row.city} className="border-b border-gray-50">
                          <td className="py-1.5 font-medium text-navy">{row.city}</td>
                          {YEARS.map(y => (
                            <td key={y} className="py-1.5 text-center">
                              {row[y] ? (
                                <span className={`inline-block w-7 h-5 leading-5 rounded text-micro font-bold ${row[y] >= 4 ? 'bg-green-500 text-white' : row[y] >= 3 ? 'bg-green-300 text-green-900' : row[y] >= 2 ? 'bg-blue-200 text-blue-800' : 'bg-gray-100 text-gray-600'}`}>
                                  {row[y]}
                                </span>
                              ) : <span className="text-gray-300">{'—'}</span>}
                            </td>
                          ))}
                          <td className="py-1.5 text-center font-bold text-navy">{row.total}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  </div>
                  <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white to-transparent sm:hidden" />
                </div>
              </Card>
            </div>
          </DrillDown>
          </ErrorBoundary>

          {/* --- Market Entry Playbooks & Budget Benchmarks --- */}
          <ErrorBoundary message="Market entry playbooks failed to load.">
          <DrillDown
            title="Market Entry Playbooks & Budget Benchmarks"
            summary={`${Object.keys(ENTRY_PLAYBOOKS).length} category playbooks · ${Object.keys(DISTRIBUTORS).length} distributors · On-trade spend benchmarks`}
          >
            <div className="space-y-6">
              {/* Budget Benchmarks */}
              <Card>
                <h4 className="text-sm font-semibold text-navy mb-1 flex items-center gap-2"><DollarSign size={14} /> Budget Benchmarks</h4>
                <p className="text-xs text-gray-500 mb-3">On-trade spend benchmarks by account tier</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {Object.entries(BUDGET_BENCHMARKS).map(([key, data]) => (
                    <div key={key} className="p-4 rounded-lg border" style={{ borderColor: data.color + '40', backgroundColor: data.color + '08' }}>
                      <h4 className="text-sm font-semibold mb-2" style={{ color: data.color }}>{data.label}</h4>
                      <div className="space-y-1.5 text-xs">
                        <div className="flex justify-between"><span className="text-gray-500">Retro Range:</span><span className="font-semibold text-gray-700">{data.retro}</span></div>
                        <div className="flex justify-between"><span className="text-gray-500">Marketing Spend/Yr:</span><span className="font-semibold text-gray-700">{data.marketingSpend}</span></div>
                        <div><span className="text-gray-500">Features:</span><p className="text-gray-700 mt-0.5">{data.features}</p></div>
                        <div><span className="text-gray-500">Examples:</span><p className="font-medium text-gray-700 mt-0.5">{data.examples}</p></div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Corporate vs Independent + Penetration charts */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <ChartCard title="Corporate vs Independent (2021–2025)" height={250}>
                  <BarChart data={independentVsCorporate} accessibilityLayer={true}>
                    <XAxis dataKey="year" tick={{ fontSize: 11, fill: '#9ca3af' }} />
                    <YAxis domain={[0, 50]} tick={{ fontSize: 11, fill: '#9ca3af' }} />
                    <Tooltip contentStyle={{ background: '#1e293b', border: 'none', borderRadius: 8, fontSize: 11 }} labelStyle={{ color: '#f1f5f9' }} itemStyle={{ color: '#f1f5f9' }} />
                    <Legend />
                    <Bar dataKey="Corporate-Backed" stackId="a" fill={CHART_COLORS.primary} radius={[4, 4, 0, 0]} />
                    <Bar dataKey="Independent" stackId="a" fill={CHART_COLORS.emerald} radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ChartCard>

                <ChartCard title="Top 5 Penetration Trend (%)" height={250}>
                  <LineChart data={penetrationTrend} accessibilityLayer={true}>
                    <XAxis dataKey="year" tick={{ fontSize: 11, fill: '#9ca3af' }} />
                    <YAxis tickFormatter={v => `${v}%`} tick={{ fontSize: 11, fill: '#9ca3af' }} />
                    <Tooltip formatter={(val) => [`${val}%`]} contentStyle={{ background: '#1e293b', border: 'none', borderRadius: 8, fontSize: 11 }} labelStyle={{ color: '#f1f5f9' }} itemStyle={{ color: '#f1f5f9' }} />
                    <Legend />
                    {overallDominance.slice(0, 5).map(d => (
                      <Line key={d.name} type="monotone" dataKey={d.name} stroke={d.color} strokeWidth={2} dot={{ r: 3 }} />
                    ))}
                  </LineChart>
                </ChartCard>
              </div>

              {/* 5-Year Dominance bars */}
              <Card>
                <h4 className="text-sm font-semibold text-navy mb-3">5-Year Cumulative Dominance</h4>
                <div className="space-y-2">
                  {overallDominance.map(d => (
                    <div key={d.name} className="flex items-center gap-3">
                      <div className="w-28 text-xs font-medium text-navy truncate">{d.name}</div>
                      <div className="flex-1 bg-gray-100 rounded-full h-5 relative overflow-hidden">
                        <div className="h-full rounded-full flex items-center" style={{ width: `${d.pct}%`, backgroundColor: d.color }}>
                          <span className="text-white text-micro font-bold pl-2">{d.pct}%</span>
                        </div>
                      </div>
                      <div className="text-xs text-gray-500 w-20 text-right">{d.bars}/{d.total} bars</div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Distribution Landscape */}
              <Card>
                <h4 className="text-sm font-semibold text-navy mb-1 flex items-center gap-2"><Briefcase size={14} /> UK Distribution Landscape</h4>
                <p className="text-xs text-gray-500 mb-3">Key distributors for the UK on-trade</p>
                <div className="space-y-2">
                  {Object.entries(DISTRIBUTORS).map(([name, dist]) => (
                    <div key={name} className="border border-gray-100 rounded-lg overflow-hidden">
                      <div className="p-2.5 flex items-center gap-3 cursor-pointer hover:bg-gray-50 transition-colors"
                        onClick={() => setExpandedDistributor(expandedDistributor === name ? null : name)}>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-xs text-navy">{name}</span>
                            <span className="text-micro px-1.5 py-0.5 rounded bg-blue-50 text-blue-700">{dist.type}</span>
                            {dist.parent && <span className="text-xs text-gray-500">({dist.parent})</span>}
                          </div>
                        </div>
                        {expandedDistributor === name ? <ChevronUp size={14} className="text-gray-500" /> : <ChevronDown size={14} className="text-gray-500" />}
                      </div>
                      {expandedDistributor === name && (
                        <div className="border-t border-gray-100 p-2.5 bg-gray-50 space-y-1 text-xs">
                          <div><span className="font-semibold text-gray-500">Coverage:</span> <span className="text-gray-700">{dist.coverage}</span></div>
                          <div><span className="font-semibold text-gray-500">Key Clients:</span> <span className="text-gray-700">{(dist.keyClients || []).join(', ')}</span></div>
                          <div><span className="font-semibold text-gray-500">Min Order:</span> <span className="text-gray-700">{dist.minOrder}</span></div>
                          <div><span className="font-semibold text-gray-500">Strengths:</span> <span className="text-gray-700">{dist.strengths}</span></div>
                          <div className="bg-green-50 border border-green-100 rounded p-1.5">
                            <span className="font-semibold text-green-800">Best For:</span> <span className="text-green-700">{dist.bestFor}</span>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </Card>

              {/* Entry Playbooks */}
              <Card>
                <h4 className="text-sm font-semibold text-navy mb-1 flex items-center gap-2"><BookOpen size={14} /> Category Entry Playbooks</h4>
                <p className="text-xs text-gray-500 mb-3">Phased strategies by spirit category</p>
                <div className="space-y-2">
                  {Object.entries(ENTRY_PLAYBOOKS).map(([key, pb]) => (
                    <div key={key} className="border border-gray-100 rounded-lg overflow-hidden">
                      <div className="p-3 flex items-center gap-3 cursor-pointer hover:bg-gray-50 transition-colors"
                        onClick={() => setEntryCategory(entryCategory === key ? null : key)}>
                        <div className="flex-1">
                          <h5 className="font-medium text-xs text-navy">{pb.title}</h5>
                          <div className="flex gap-4 mt-0.5 text-xs text-gray-500">
                            <span>Budget: {pb.estimatedBudget}</span>
                            <span>Timeline: {pb.timeline}</span>
                          </div>
                        </div>
                        {entryCategory === key ? <ChevronUp size={14} className="text-gray-500" /> : <ChevronDown size={14} className="text-gray-500" />}
                      </div>
                      {entryCategory === key && (
                        <div className="border-t border-gray-100 p-3 bg-gray-50 space-y-3">
                          <div className="bg-red-50 border border-red-100 rounded-lg p-2.5">
                            <h6 className="text-xs font-bold text-red-800 mb-0.5">Competitive Landscape</h6>
                            <p className="text-xs text-red-700">{pb.competition}</p>
                          </div>
                          <div className="space-y-2">
                            {['phase1', 'phase2', 'phase3'].map(phaseKey => {
                              const phase = pb[phaseKey]
                              if (!phase) return null
                              return (
                                <div key={phaseKey} className="bg-white rounded-lg p-2.5 border border-gray-200">
                                  <div className="flex items-center gap-2 mb-1.5">
                                    <span className={`w-5 h-5 rounded-full flex items-center justify-center text-micro font-bold text-white ${phaseKey === 'phase1' ? 'bg-blue-500' : phaseKey === 'phase2' ? 'bg-amber-500' : 'bg-green-500'}`}>
                                      {phaseKey.slice(-1)}
                                    </span>
                                    <h6 className="text-xs font-bold text-navy">{phase.name}</h6>
                                    <span className="text-xs text-gray-500 ml-auto">{phase.duration}</span>
                                  </div>
                                  <div className="space-y-0.5 mb-1.5">
                                    {(phase.actions || []).map((a, ai) => (
                                      <p key={ai} className="text-xs text-gray-700 flex items-start gap-1"><ArrowRight size={8} className="text-navy mt-0.5 flex-shrink-0" /> {a}</p>
                                    ))}
                                  </div>
                                  {phase.targetVenues && phase.targetVenues.length > 0 && (
                                    <div className="flex flex-wrap gap-1">
                                      <span className="text-xs text-gray-500">Target:</span>
                                      {phase.targetVenues.map(v => <span key={v} className="px-1 py-0.5 text-micro rounded bg-navy/10 text-navy font-medium">{v}</span>)}
                                    </div>
                                  )}
                                </div>
                              )
                            })}
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            <div className="bg-blue-50 rounded-lg p-2.5 border border-blue-100">
                              <h6 className="text-xs font-bold text-blue-800 mb-0.5 flex items-center gap-1"><Users size={10} /> Key People</h6>
                              <p className="text-xs text-blue-700">{pb.keyPeople}</p>
                            </div>
                            <div className="bg-amber-50 rounded-lg p-2.5 border border-amber-100">
                              <h6 className="text-xs font-bold text-amber-800 mb-0.5 flex items-center gap-1"><Shield size={10} /> Pitfalls</h6>
                              <div className="space-y-0.5">
                                {(pb.pitfalls || []).map((p, pi) => (
                                  <p key={pi} className="text-xs text-amber-700 flex items-start gap-1"><X size={8} className="text-amber-600 mt-0.5 flex-shrink-0" /> {p}</p>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </Card>

              {/* Strategic Insights */}
              <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl p-5 border border-amber-200">
                <h4 className="font-semibold text-navy text-sm mb-3 flex items-center gap-2"><Building2 size={16} /> Strategic Insights for SMBs</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-gray-700">
                  <div className="space-y-2">
                    <div>
                      <h5 className="font-semibold text-navy">Entry Strategy {'—'} Luxury Accounts</h5>
                      <p>Target independent-minded bars like Satan’s Whiskers, Tayēr + Elementary, and Lyaness. These venues select on quality, not corporate spend.</p>
                    </div>
                    <div>
                      <h5 className="font-semibold text-navy">Visibility {'—'} 50 Best Bars</h5>
                      <p>Perennial bars (Tayēr, Connaught, Jigger & Pony, Paradiso) offer global bartender community visibility through long-term partnerships.</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div>
                      <h5 className="font-semibold text-navy">Volume vs. Marketing Budget</h5>
                      <p>Avoid competing with LVMH/Diageo in volume accounts. Focus on 5-10 key luxury accounts where quality trumps spend.</p>
                    </div>
                    <div>
                      <h5 className="font-semibold text-navy">Geographic Trend</h5>
                      <p>Asia{'’'}s share has grown to match Europe. London remains the strongest single-city hub for on-trade credibility globally.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </DrillDown>
          </ErrorBoundary>
        </>
      )}

      {/* Data Source Footer */}
      <SourceList sources={[
        { label: "World’s 50 Best Bars (2021–2025)", url: 'https://www.worlds50bestbars.com/' },
        { label: 'Companies House UK', url: 'https://www.gov.uk/government/organisations/companies-house' },
        { label: 'Venue menus & industry sources' },
      ]} />

      {/* Mobile BottomSheet for venue detail */}
      <BottomSheet
        open={!!mobileDetail}
        onClose={() => setMobileDetail(null)}
        title={mobileDetail?.title || 'Detail'}
      >
        {mobileDetail?.content}
      </BottomSheet>
    </div>
  )
}

// ===== SUB-COMPONENTS =====

function VenueCard({ venue, index, expanded, onToggle }) {
  return (
    <Card hover={!expanded} onClick={!expanded ? onToggle : undefined} className="overflow-hidden">
      <div className="flex items-start gap-3 cursor-pointer" onClick={expanded ? onToggle : undefined}>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h4 className="font-semibold text-sm text-navy">{venue.name}</h4>
            <span className={`px-1.5 py-0.5 rounded text-micro font-medium ${venue.accountType === 'Luxury' ? 'bg-purple-100 text-purple-700' : venue.accountType === 'Volume' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
              {venue.accountType}
            </span>
            <span className="px-1.5 py-0.5 bg-gray-100 text-gray-600 rounded text-micro">{venue.type}</span>
          </div>
          <div className="flex items-center gap-3 mt-1 text-xs text-gray-500 flex-wrap">
            <span className="flex items-center gap-0.5"><MapPin size={10} /> {venue.area}</span>
            <span className="flex items-center gap-0.5"><DollarSign size={10} /> {venue.estRevenue}/yr</span>
            {venue.fiftyBest && venue.fiftyBest.some(r => r) && (
              <span className="flex items-center gap-0.5"><Award size={10} /> 50 Best: {venue.fiftyBest.filter(r => r).length}x</span>
            )}
            {venue.menuUrl && (
              <a href={venue.menuUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-0.5 text-blue-500 hover:text-blue-700" onClick={e => e.stopPropagation()}>
                <ExternalLink size={10} /> Menu
              </a>
            )}
          </div>
        </div>
        {expanded ? <ChevronUp size={16} className="text-gray-500 flex-shrink-0" /> : <ChevronDown size={16} className="text-gray-500 flex-shrink-0" />}
      </div>

      {expanded && (
        <div className="border-t border-gray-100 mt-3 pt-3 space-y-2.5">
          {venue.fiftyBest && venue.fiftyBest.some(r => r) && (
            <div>
              <p className="text-micro font-semibold text-gray-500 uppercase mb-1">50 Best Rankings (2021→2025)</p>
              <div className="flex gap-1.5">
                {YEARS.map((y, idx) => (
                  <span key={y} className={`px-1.5 py-0.5 rounded text-micro ${venue.fiftyBest[idx] ? (venue.fiftyBest[idx] <= 10 ? 'bg-green-100 text-green-700 font-bold' : 'bg-blue-100 text-blue-700') : 'bg-gray-100 text-gray-500'}`}>
                    {y}: {venue.fiftyBest[idx] ? `#${venue.fiftyBest[idx]}` : '—'}
                  </span>
                ))}
              </div>
            </div>
          )}
          {venue.knownBrands && venue.knownBrands.length > 0 && (
            <div>
              <p className="text-micro font-semibold text-gray-500 uppercase mb-1">Brands / Partnerships</p>
              <div className="flex flex-wrap gap-1">
                {venue.knownBrands.map(brand => <span key={brand} className="px-1.5 py-0.5 bg-white border border-gray-200 rounded text-micro text-gray-700">{brand}</span>)}
              </div>
            </div>
          )}
          {venue.parentCompanies && venue.parentCompanies.length > 0 && (
            <div>
              <p className="text-micro font-semibold text-gray-500 uppercase mb-1">Parent Companies</p>
              <div className="flex flex-wrap gap-1">
                {venue.parentCompanies.map(pc => (
                  <EntityLink key={pc} type="company" id={pc.toLowerCase().replace(/\s+/g, '-')} label={pc}
                    className="px-1.5 py-0.5 rounded text-xs font-medium" />
                ))}
              </div>
            </div>
          )}
          {venue.founders && <p className="text-xs text-gray-600"><span className="font-semibold">Key People:</span> {venue.founders}</p>}
          <p className="text-xs text-gray-600"><span className="font-semibold">Intel:</span> {venue.notes}</p>
          {venue.revenueSource && (
            <div className="bg-amber-50 border border-amber-100 rounded p-1.5">
              <p className="text-xs text-amber-800"><span className="font-semibold">Revenue Source:</span> {venue.revenueSource}</p>
            </div>
          )}
        </div>
      )}
    </Card>
  )
}

function CompanyCard({ name, profile, expanded, onToggle }) {
  return (
    <Card hover={!expanded} onClick={onToggle} className={`cursor-pointer transition-all ${expanded ? 'border-navy shadow-lg' : ''}`}>
      <div className="flex items-center gap-3 mb-1.5">
        <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: PARENT_COMPANIES[name]?.color || '#666' }} />
        <h4 className="text-xs font-bold text-navy">{name}</h4>
        <span className="text-xs text-gray-500 ml-auto">{profile.revenue}</span>
        {expanded ? <ChevronUp size={14} className="text-gray-500" /> : <ChevronDown size={14} className="text-gray-500" />}
      </div>
      <p className="text-xs text-gray-500">{profile.headquarters} {'·'} CEO: {profile.ceo}</p>
      <p className="text-xs text-gray-500 mt-0.5">On-trade share: {profile.onTradeShare}</p>

      {expanded && (
        <div className="border-t border-gray-100 mt-3 pt-3 space-y-3">
          <div>
            <h5 className="text-micro font-bold text-navy uppercase tracking-wider mb-0.5 flex items-center gap-1"><Target size={10} /> On-Trade Strategy</h5>
            <p className="text-xs text-gray-700 leading-relaxed">{profile.strategy}</p>
          </div>

          <div>
            <h5 className="text-micro font-bold text-navy uppercase tracking-wider mb-1 flex items-center gap-1"><Wine size={10} /> Key On-Trade Brands</h5>
            <div className="space-y-1">
              {(profile.keyBrandsOnTrade || []).map((brand, bi) => (
                <div key={bi} className="flex items-center gap-2 text-xs bg-white rounded px-2 py-1 border border-gray-100">
                  <EntityLink type="brand" id={brand.name?.toLowerCase().replace(/\s+/g, '-')} label={brand.name} className="font-semibold w-28 truncate text-xs" />
                  <span className="text-gray-500">{brand.category}</span>
                  <span className="ml-auto text-gray-500">{brand.pricePoint}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <div>
              <h5 className="text-micro font-bold text-green-700 uppercase tracking-wider mb-0.5 flex items-center gap-1"><Shield size={10} /> Strengths</h5>
              <div className="space-y-0.5">
                {(profile.strengths || []).map((s, si) => (
                  <p key={si} className="text-xs text-gray-700 flex items-start gap-1"><Check size={8} className="text-green-500 mt-0.5 flex-shrink-0" /> {s}</p>
                ))}
              </div>
            </div>
            <div>
              <h5 className="text-micro font-bold text-red-700 uppercase tracking-wider mb-0.5 flex items-center gap-1"><Zap size={10} /> Vulnerabilities</h5>
              <div className="space-y-0.5">
                {(profile.weaknesses || []).map((w, wi) => (
                  <p key={wi} className="text-xs text-gray-700 flex items-start gap-1"><X size={8} className="text-red-500 mt-0.5 flex-shrink-0" /> {w}</p>
                ))}
              </div>
            </div>
          </div>

          <div>
            <h5 className="text-micro font-bold text-navy uppercase tracking-wider mb-0.5 flex items-center gap-1"><MapPin size={10} /> London Presence</h5>
            <p className="text-xs text-gray-700">{profile.londonPresence}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <div className="bg-white rounded-lg p-2.5 border border-gray-100">
              <h5 className="text-xs font-bold text-navy mb-0.5">UK Distribution</h5>
              <p className="text-xs text-gray-600">{profile.distributionUK}</p>
            </div>
            <div className="bg-white rounded-lg p-2.5 border border-gray-100">
              <h5 className="text-xs font-bold text-navy mb-0.5">Deal Structure</h5>
              <p className="text-xs text-gray-600">{profile.typicalDealStructure}</p>
            </div>
          </div>

          <div>
            <h5 className="text-micro font-bold text-navy uppercase tracking-wider mb-0.5 flex items-center gap-1"><TrendingUp size={10} /> Recent Moves (2024-25)</h5>
            <div className="space-y-0.5">
              {(profile.recentMoves || []).map((m, mi) => (
                <p key={mi} className="text-xs text-gray-700 flex items-start gap-1"><ArrowRight size={8} className="text-navy mt-0.5 flex-shrink-0" /> {m}</p>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <div className="bg-red-50 rounded-lg p-2.5 border border-red-100">
              <h5 className="text-xs font-bold text-red-800 mb-0.5">Threat to Small Brands</h5>
              <p className="text-xs text-red-700">{profile.threatToSmallBrands}</p>
            </div>
            <div className="bg-green-50 rounded-lg p-2.5 border border-green-100">
              <h5 className="text-xs font-bold text-green-800 mb-0.5">Opportunity for Small Brands</h5>
              <p className="text-xs text-green-700">{profile.opportunityForSmallBrands}</p>
            </div>
          </div>
        </div>
      )}
    </Card>
  )
}
