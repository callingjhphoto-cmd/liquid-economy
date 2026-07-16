import React, { useState, useMemo } from 'react'
import {
  Calendar, MapPin, ChevronDown, Zap
} from 'lucide-react'
import {
  Card, PageHeader, SubPageNav, Badge, DataFreshness
} from '../components/ui'
import { TRADE_SHOWS, MONTHS } from '../data/tradeShowData'

// LI signals — computed from full TRADE_SHOWS dataset at module level
const liH2Count = TRADE_SHOWS.filter(s => s.month >= 7).length
const liVeryHighROI = TRADE_SHOWS.filter(s => typeof s.roiEstimate === 'string' && s.roiEstimate.startsWith('Very High')).length
const liCatSet = new Set(TRADE_SHOWS.flatMap(s => s.mustAttendFor || []))
const liCatCount = liCatSet.size

const liH2Signal = liH2Count >= 6
  ? { dot: 'bg-emerald-500', color: 'text-emerald-600', label: 'ACTIVE H2 CALENDAR', copy: `${liH2Count} events from July onwards — strong second-half pipeline for brand activations, new market launches, and distributor relationship-building.` }
  : liH2Count >= 4
  ? { dot: 'bg-blue-500', color: 'text-blue-600', label: 'MODERATE H2 DENSITY', copy: `${liH2Count} events in the second half of the year. Selective attendance strategy recommended — prioritise by market and ROI tier.` }
  : { dot: 'bg-amber-500', color: 'text-amber-600', label: 'LIGHT H2 CALENDAR', copy: `Only ${liH2Count} events from July onwards. Front-load activation and distributor meetings into H1 shows; supplementary digital engagement for H2.` }

const liROISignal = liVeryHighROI >= 4
  ? { dot: 'bg-emerald-500', color: 'text-emerald-600', label: 'MULTIPLE TOP-TIER EVENTS', copy: `${liVeryHighROI} events rated Very High ROI — strong return potential across the calendar. Budget for all four to maximise brand visibility and listing velocity.` }
  : liVeryHighROI >= 2
  ? { dot: 'bg-blue-500', color: 'text-blue-600', label: 'STRONG ROI OPTIONS', copy: `${liVeryHighROI} Very High ROI events identified. Anchor your spend here and supplement with targeted category shows to extend reach.` }
  : { dot: 'bg-amber-500', color: 'text-amber-600', label: 'LIMITED TOP-ROI SHOWS', copy: `${liVeryHighROI} Very High ROI event${liVeryHighROI === 1 ? '' : 's'} in the calendar. Evaluate High ROI events carefully — cost-per-contact metrics become critical at this density.` }

const liCatSignal = liCatCount >= 10
  ? { dot: 'bg-emerald-500', color: 'text-emerald-600', label: 'FULL CATEGORY REPRESENTATION', copy: `${liCatCount} spirit categories covered across the event calendar — every major drinks segment has at least one dedicated or relevant show.` }
  : liCatCount >= 7
  ? { dot: 'bg-blue-500', color: 'text-blue-600', label: 'BROAD CATEGORY COVERAGE', copy: `${liCatCount} categories represented. Core spirits, wine, and champagne all covered. Niche categories may need supplementary outreach beyond the calendar.` }
  : { dot: 'bg-amber-500', color: 'text-amber-600', label: 'SPECIALIST FOCUS', copy: `${liCatCount} categories on the calendar. Curated but narrow — check that your specific category has a dedicated event before committing budget.` }

function ShowCard({ show, expanded, onToggle }) {
  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden hover:border-gray-300 transition-colors">
      <button onClick={onToggle} className="w-full p-4 text-left flex items-start gap-3">
        <div className="w-10 h-10 bg-navy/5 rounded-lg flex items-center justify-center flex-shrink-0">
          <Calendar size={18} className="text-navy" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="text-sm font-bold text-navy">{show.name}</h3>
            <Badge>{show.category}</Badge>
          </div>
          <div className="flex items-center gap-3 text-xs text-gray-500 mt-1">
            <span className="flex items-center gap-1"><MapPin size={10} /> {show.location}</span>
            <span className="flex items-center gap-1"><Calendar size={10} /> {show.dates['2026'] || show.dates['2025']}</span>
          </div>
          <div className="flex flex-wrap gap-1 mt-1.5">
            {(show.mustAttendFor || []).slice(0, 4).map(c => (
              <span key={c} className="text-xs bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded">{c}</span>
            ))}
            {(show.mustAttendFor || []).length > 4 && <span className="text-xs text-gray-400">+{(show.mustAttendFor || []).length - 4}</span>}
          </div>
        </div>
        <ChevronDown size={14} className={`text-gray-400 transition-transform mt-1 ${expanded ? '' : '-rotate-90'}`} />
      </button>
      {expanded && (
        <div className="px-4 pb-4 border-t border-gray-100">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-3">
            <div>
              <div className="text-xs font-semibold text-navy mb-1">Cost to Exhibit</div>
              <div className="text-xs text-gray-600">{show.costToExhibit}</div>
            </div>
            <div>
              <div className="text-xs font-semibold text-navy mb-1">Expected Visitors</div>
              <div className="text-xs text-gray-600">{show.expectedVisitors}</div>
            </div>
            <div>
              <div className="text-xs font-semibold text-navy mb-1">Exhibitors</div>
              <div className="text-xs text-gray-600">{show.exhibitors}</div>
            </div>
            <div>
              <div className="text-xs font-semibold text-navy mb-1">Key Audience</div>
              <div className="text-xs text-gray-600">{show.keyAudience}</div>
            </div>
            <div>
              <div className="text-xs font-semibold text-navy mb-1">ROI Estimate</div>
              <div className="text-xs text-gray-600">{show.roiEstimate}</div>
            </div>
            <div>
              <div className="text-xs font-semibold text-navy mb-1">Website</div>
              <div className="text-xs text-navy font-medium">{show.website}</div>
            </div>
          </div>
          <div className="mt-3 p-3 bg-amber-50 border border-amber-200 rounded-lg flex gap-2">
            <Zap size={14} className="text-amber-600 mt-0.5 flex-shrink-0" />
            <span className="text-xs text-amber-800">{show.tip}</span>
          </div>
          {show.dates['2025'] && show.dates['2026'] && (
            <div className="mt-2 text-xs text-gray-500">
              <span className="font-medium">2025:</span> {show.dates['2025']} {'•'} <span className="font-medium">2026:</span> {show.dates['2026']}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default function TradeShows() {
  const [view, setView] = useState('list')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [expandedIdx, setExpandedIdx] = useState(null)

  const allCategories = useMemo(() => {
    const cats = new Set()
    TRADE_SHOWS.forEach(s => (s.mustAttendFor || []).forEach(c => cats.add(c)))
    return [...cats].sort()
  }, [])

  const filtered = useMemo(() => {
    if (categoryFilter === 'all') return TRADE_SHOWS
    return TRADE_SHOWS.filter(s => (s.mustAttendFor || []).includes(categoryFilter) || (s.mustAttendFor || []).includes('all') || (s.mustAttendFor || []).includes('all spirits'))
  }, [categoryFilter])

  const calendarData = useMemo(() => {
    return MONTHS.map((month, i) => ({
      month,
      shows: filtered.filter(s => s.month === i + 1),
    }))
  }, [filtered])

  return (
    <div className="max-w-7xl mx-auto">
      <SubPageNav group="tools" />
      <PageHeader
        title="Trade Show Calendar"
        subtitle={`${TRADE_SHOWS.length} global drinks industry events`}
        icon={<Calendar size={20} />}
      />
      <DataFreshness date="April 2026" source="Event organisers, WSWA, Vinexpo, Prowein, Tales of the Cocktail" />

      {/* Liquid Intelligence */}
      <div className="border border-gold/30 rounded-xl bg-gradient-to-r from-amber-50/60 to-white p-4 mb-4">
        <div className="flex items-center gap-2 mb-3">
          <Zap size={14} className="text-gold" />
          <span className="text-xs font-bold text-gold uppercase tracking-wider">Liquid Intelligence</span>
          <span className="text-xs text-gray-400 ml-auto">{TRADE_SHOWS.length} global events analysed</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            { sig: liH2Signal, header: 'H2 Event Density' },
            { sig: liROISignal, header: 'ROI Tier' },
            { sig: liCatSignal, header: 'Category Breadth' },
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

      {/* Controls */}
      <Card className="p-4 mb-6">
        <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
          <div className="flex gap-2">
            <button
              onClick={() => setView('list')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium ${view === 'list' ? 'bg-navy text-white' : 'bg-gray-100 text-gray-600'}`}
            >
              List View
            </button>
            <button
              onClick={() => setView('calendar')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium ${view === 'calendar' ? 'bg-navy text-white' : 'bg-gray-100 text-gray-600'}`}
            >
              Calendar View
            </button>
          </div>
          <select
            value={categoryFilter}
            onChange={e => setCategoryFilter(e.target.value)}
            className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm"
          >
            <option value="all">All Categories</option>
            {allCategories.map(c => <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>)}
          </select>
        </div>
      </Card>

      {view === 'list' ? (
        <div className="space-y-3">
          {filtered.sort((a, b) => a.month - b.month).map((show, i) => (
            <ShowCard
              key={i}
              show={show}
              expanded={expandedIdx === i}
              onToggle={() => setExpandedIdx(expandedIdx === i ? null : i)}
            />
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {calendarData.map((monthData, i) => (
            <div key={i}>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-sm font-bold text-navy">{monthData.month}</span>
                {monthData.shows.length > 0 && (
                  <Badge>{monthData.shows.length} event{monthData.shows.length > 1 ? 's' : ''}</Badge>
                )}
              </div>
              {monthData.shows.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {monthData.shows.map((show, j) => (
                    <Card key={j} className="p-3">
                      <div className="text-sm font-bold text-navy mb-1">{show.name}</div>
                      <div className="text-xs text-gray-500 mb-1">{show.location}</div>
                      <div className="text-xs text-gray-500">{show.dates['2026'] || show.dates['2025']}</div>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {(show.mustAttendFor || []).slice(0, 3).map(c => (
                          <span key={c} className="text-xs bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded">{c}</span>
                        ))}
                      </div>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="h-8 border-l-2 border-gray-200 ml-4" />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
