/**
 * LiveFeed \u2014 Real-time intelligence feed
 *
 * Information-dense but visually integrated with the white/navy/gold
 * design system used across the rest of the dashboard.
 */

import React, { useState, useRef, useEffect } from 'react'
import { Radio, WifiOff, ExternalLink, Filter, ChevronRight } from 'lucide-react'
import { useLiveData } from '../context/LiveDataContext'

const SEVERITY_CONFIG = {
  critical: { dot: 'bg-red-500', text: 'text-red-700', badge: 'bg-red-50 text-red-700 border-red-200', border: 'border-l-red-500', label: 'Critical' },
  alert:    { dot: 'bg-amber-500', text: 'text-amber-700', badge: 'bg-amber-50 text-amber-700 border-amber-200', border: 'border-l-amber-400', label: 'Alert' },
  watch:    { dot: 'bg-blue-500', text: 'text-blue-700', badge: 'bg-blue-50 text-blue-700 border-blue-200', border: 'border-l-blue-400', label: 'Watch' },
  info:     { dot: 'bg-gray-400', text: 'text-gray-600', badge: 'bg-gray-50 text-gray-600 border-gray-200', border: 'border-l-gray-300', label: 'Info' },
}

const CATEGORY_COLORS = {
  tequila: 'bg-amber-50 text-amber-700',
  vodka: 'bg-sky-50 text-sky-700',
  gin: 'bg-emerald-50 text-emerald-700',
  whisky: 'bg-orange-50 text-orange-700',
  rum: 'bg-red-50 text-red-700',
  cognac: 'bg-purple-50 text-purple-700',
  champagne: 'bg-yellow-50 text-yellow-700',
  wine: 'bg-rose-50 text-rose-700',
  beer: 'bg-amber-50 text-amber-700',
  nolo: 'bg-teal-50 text-teal-700',
  rtd: 'bg-indigo-50 text-indigo-700',
  general: 'bg-gray-50 text-gray-600',
  market: 'bg-navy/5 text-navy',
  regulatory: 'bg-slate-50 text-slate-700',
  ma: 'bg-violet-50 text-violet-700',
  sustainability: 'bg-green-50 text-green-700',
  trade: 'bg-cyan-50 text-cyan-700',
  tech: 'bg-blue-50 text-blue-700',
}

function timeAgo(ts) {
  const diff = Date.now() - new Date(ts).getTime()
  const secs = Math.floor(diff / 1000)
  if (secs < 60) return 'now'
  const mins = Math.floor(secs / 60)
  if (mins < 60) return `${mins}m`
  const hrs = Math.floor(mins / 60)
  if (hrs < 24) return `${hrs}h`
  return `${Math.floor(hrs / 24)}d`
}

function ConnectionBadge({ connected, mode, clientCount }) {
  if (connected) {
    return (
      <div className="flex items-center gap-1.5 text-xs">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
        </span>
        <span className="text-green-700 font-medium">
          LIVE{mode === 'sse' ? '' : ' (polling)'}
        </span>
        {clientCount > 1 && <span className="text-gray-400">{'\u00b7'} {clientCount} viewers</span>}
      </div>
    )
  }
  if (mode === 'offline') {
    return (
      <div className="flex items-center gap-1.5 text-xs text-gray-500">
        <WifiOff size={10} />
        <span>Offline {'\u2014'} backend not connected</span>
      </div>
    )
  }
  return (
    <div className="flex items-center gap-1.5 text-xs text-gray-500">
      <WifiOff size={10} />
      <span>Connecting{'\u2026'}</span>
    </div>
  )
}

// Compact feed item — single row with expand-on-click
function FeedItem({ item, expanded, onToggle }) {
  const sev = SEVERITY_CONFIG[item.severity] || SEVERITY_CONFIG.info
  const catColor = CATEGORY_COLORS[item.category] || CATEGORY_COLORS.general

  return (
    <div
      className={`border-l-2 ${sev.border} cursor-pointer transition-colors ${expanded ? 'bg-gray-50/80' : 'hover:bg-gray-50/50'}`}
      onClick={onToggle}
    >
      {/* Compressed row */}
      <div className="flex items-center gap-1.5 px-2.5 py-1.5">
        <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${sev.dot}`} />
        <span className="text-xs text-gray-500 w-5 flex-shrink-0 text-right tabular-nums">{timeAgo(item.timestamp)}</span>
        <span className={`text-xs font-medium px-1.5 py-0 rounded ${catColor} flex-shrink-0`}>{item.category}</span>
        <span className="text-xs text-navy font-medium truncate flex-1 leading-tight">{item.title}</span>
        <div className="flex items-center gap-1 flex-shrink-0">
          {item.url && (
            <a href={item.url} target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-navy transition-colors" onClick={e => e.stopPropagation()}>
              <ExternalLink size={10} />
            </a>
          )}
          <ChevronRight size={10} className={`text-gray-300 transition-transform ${expanded ? 'rotate-90' : ''}`} />
        </div>
      </div>

      {/* Expanded detail */}
      {expanded && (
        <div className="px-2.5 pb-2 ml-[30px] border-t border-gray-100 pt-1.5">
          {item.body && <p className="text-xs text-gray-600 leading-relaxed">{item.body}</p>}
          <div className="flex items-center gap-3 mt-1.5">
            {item.source && (
              <span className="text-xs text-gray-500 italic">{item.source}</span>
            )}
            {item.url && (
              <a href={item.url} target="_blank" rel="noopener noreferrer" className="text-xs text-gold hover:text-navy font-medium flex items-center gap-0.5 transition-colors" onClick={e => e.stopPropagation()}>
                Read article <ExternalLink size={8} />
              </a>
            )}
            <span className={`text-xs font-semibold px-1.5 py-0.5 rounded border ${sev.badge}`}>{sev.label}</span>
          </div>
        </div>
      )}
    </div>
  )
}

export default function LiveFeed({ maxItems = 30, compact = false }) {
  const { feedItems, connected, mode, clientCount, lastUpdate } = useLiveData()
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [severityFilter, setSeverityFilter] = useState('all')
  const [expandedId, setExpandedId] = useState(null)
  const [showFilters, setShowFilters] = useState(false)
  const feedRef = useRef(null)

  const categories = ['all', ...new Set(feedItems.map(i => i.category))]

  let filtered = feedItems
  if (categoryFilter !== 'all') filtered = filtered.filter(i => i.category === categoryFilter)
  if (severityFilter !== 'all') filtered = filtered.filter(i => i.severity === severityFilter)
  filtered = filtered.slice(0, maxItems)

  const critCount = feedItems.filter(i => i.severity === 'critical').length
  const alertCount = feedItems.filter(i => i.severity === 'alert').length

  useEffect(() => {
    if (feedRef.current && filtered.length > 0) {
      feedRef.current.scrollTop = 0
    }
  }, [filtered.length])

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="px-3 py-2.5 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-navy/10 rounded-lg">
              <Radio size={12} className="text-navy" />
            </div>
            <div>
              <h3 className="text-xs font-semibold text-navy">Intelligence Feed</h3>
              <ConnectionBadge connected={connected} mode={mode} clientCount={clientCount} />
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            {critCount > 0 && (
              <span className="text-xs font-bold bg-red-50 text-red-600 border border-red-200 px-1.5 py-0.5 rounded-full">{critCount} critical</span>
            )}
            {alertCount > 0 && (
              <span className="text-xs font-bold bg-amber-50 text-amber-600 border border-amber-200 px-1.5 py-0.5 rounded-full">{alertCount} alert</span>
            )}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`p-1 rounded transition-colors ${showFilters ? 'bg-navy/10 text-navy' : 'text-gray-400 hover:text-gray-600'}`}
            >
              <Filter size={11} />
            </button>
          </div>
        </div>

        {/* Filters — severity + category */}
        {showFilters && (
          <div className="mt-2 space-y-1.5">
            {/* Severity row */}
            <div className="flex gap-1">
              {['all', 'critical', 'alert', 'watch', 'info'].map(sev => (
                <button
                  key={sev}
                  onClick={() => setSeverityFilter(sev)}
                  className={`px-2 py-0.5 rounded-full text-xs font-medium transition-all ${
                    severityFilter === sev
                      ? 'bg-navy text-white'
                      : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                  }`}
                >
                  {sev === 'all' ? 'All' : SEVERITY_CONFIG[sev]?.label || sev}
                </button>
              ))}
            </div>
            {/* Category row */}
            <div className="flex gap-1 flex-wrap">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setCategoryFilter(cat)}
                  className={`px-2 py-0.5 rounded-full text-xs font-medium transition-all ${
                    categoryFilter === cat
                      ? 'bg-navy text-white'
                      : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Feed Items */}
      <div
        ref={feedRef}
        className="divide-y divide-gray-100 overflow-y-auto"
        style={{ maxHeight: compact ? '380px' : '520px' }}
      >
        {filtered.length === 0 ? (
          <div className="py-10 text-center">
            <Radio size={20} className="text-gray-300 mx-auto mb-2" />
            <p className="text-xs text-gray-500">
              {connected ? 'No intelligence items match filters' : mode === 'offline' ? 'Live feed requires backend deployment' : 'Connecting to live feed\u2026'}
            </p>
          </div>
        ) : (
          filtered.map(item => (
            <FeedItem
              key={item.id}
              item={item}
              expanded={expandedId === item.id}
              onToggle={() => setExpandedId(expandedId === item.id ? null : item.id)}
            />
          ))
        )}
      </div>

      {/* Footer */}
      <div className="px-3 py-1.5 border-t border-gray-100 bg-gray-50/50 flex items-center justify-between">
        <span className="text-xs text-gray-500">
          {lastUpdate ? `Updated ${lastUpdate.toLocaleTimeString()}` : 'Waiting for data'}
        </span>
        <span className="text-xs text-gray-500">
          {filtered.length} of {feedItems.length}
        </span>
      </div>
    </div>
  )
}

export { ConnectionBadge }
