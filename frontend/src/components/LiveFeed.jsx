/**
 * LiveFeed — Real-time intelligence feed component
 *
 * Shows live-updating intelligence items with severity badges,
 * category filters, and auto-scroll for new items.
 */

import React, { useState, useRef, useEffect } from 'react'
import { Radio, Wifi, WifiOff, ExternalLink, AlertTriangle, Info, Eye, Zap, Filter } from 'lucide-react'
import { useLiveData } from '../context/LiveDataContext'

const SEVERITY_CONFIG = {
  critical: { bg: 'bg-red-100', border: 'border-red-400', text: 'text-red-800', dot: 'bg-red-500', label: 'CRITICAL' },
  alert:    { bg: 'bg-amber-50', border: 'border-amber-400', text: 'text-amber-800', dot: 'bg-amber-500', label: 'ALERT' },
  watch:    { bg: 'bg-blue-50', border: 'border-blue-400', text: 'text-blue-800', dot: 'bg-blue-500', label: 'WATCH' },
  info:     { bg: 'bg-gray-50', border: 'border-gray-300', text: 'text-gray-700', dot: 'bg-gray-400', label: 'INFO' },
}

const CATEGORY_COLORS = {
  tequila: 'bg-amber-100 text-amber-800',
  vodka: 'bg-sky-100 text-sky-800',
  gin: 'bg-emerald-100 text-emerald-800',
  whisky: 'bg-orange-100 text-orange-800',
  rum: 'bg-red-100 text-red-800',
  cognac: 'bg-purple-100 text-purple-800',
  champagne: 'bg-yellow-100 text-yellow-800',
  wine: 'bg-rose-100 text-rose-800',
  beer: 'bg-amber-100 text-amber-800',
  nolo: 'bg-teal-100 text-teal-800',
  rtd: 'bg-indigo-100 text-indigo-800',
  general: 'bg-gray-100 text-gray-700',
  market: 'bg-navy/10 text-navy',
  regulatory: 'bg-slate-100 text-slate-800',
  ma: 'bg-violet-100 text-violet-800',
}

function timeAgo(ts) {
  const diff = Date.now() - new Date(ts).getTime()
  const secs = Math.floor(diff / 1000)
  if (secs < 60) return 'just now'
  const mins = Math.floor(secs / 60)
  if (mins < 60) return `${mins}m ago`
  const hrs = Math.floor(mins / 60)
  if (hrs < 24) return `${hrs}h ago`
  return `${Math.floor(hrs / 24)}d ago`
}

function ConnectionBadge({ connected, mode, clientCount }) {
  if (connected) {
    return (
      <div className="flex items-center gap-1.5 text-[10px]">
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
  return (
    <div className="flex items-center gap-1.5 text-[10px] text-gray-400">
      <WifiOff size={10} />
      <span>Connecting{'\u2026'}</span>
    </div>
  )
}

function FeedItem({ item }) {
  const sev = SEVERITY_CONFIG[item.severity] || SEVERITY_CONFIG.info
  const catColor = CATEGORY_COLORS[item.category] || CATEGORY_COLORS.general

  return (
    <div className={`${sev.bg} ${sev.border} border-l-3 rounded-r-lg p-3 transition-all duration-300 animate-fadeIn`}>
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <span className={`inline-flex items-center px-1.5 py-0.5 rounded text-[9px] font-bold ${sev.text} ${sev.bg} border ${sev.border}`}>
              {sev.label}
            </span>
            <span className={`inline-flex items-center px-1.5 py-0.5 rounded text-[9px] font-medium ${catColor}`}>
              {item.category}
            </span>
            <span className="text-[9px] text-gray-400">{timeAgo(item.timestamp)}</span>
          </div>
          <h4 className={`text-xs font-semibold ${sev.text} leading-tight`}>{item.title}</h4>
          {item.body && <p className="text-[11px] text-gray-600 mt-1 leading-relaxed line-clamp-2">{item.body}</p>}
        </div>
        <div className="flex items-center gap-1 shrink-0">
          {item.source && <span className="text-[9px] text-gray-400 italic">{item.source}</span>}
          {item.url && (
            <a href={item.url} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-navy">
              <ExternalLink size={11} />
            </a>
          )}
        </div>
      </div>
    </div>
  )
}

export default function LiveFeed({ maxItems = 20, compact = false }) {
  const { feedItems, connected, mode, clientCount, lastUpdate } = useLiveData()
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [showFilters, setShowFilters] = useState(false)
  const feedRef = useRef(null)

  // Get unique categories from feed
  const categories = ['all', ...new Set(feedItems.map(i => i.category))]

  const filtered = categoryFilter === 'all'
    ? feedItems.slice(0, maxItems)
    : feedItems.filter(i => i.category === categoryFilter).slice(0, maxItems)

  // Auto-scroll to top when new items arrive
  useEffect(() => {
    if (feedRef.current && filtered.length > 0) {
      feedRef.current.scrollTop = 0
    }
  }, [filtered.length])

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="px-4 py-3 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-navy/10 rounded-lg">
              <Radio size={14} className="text-navy" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-navy">Live Intelligence Feed</h3>
              <div className="flex items-center gap-2">
                <ConnectionBadge connected={connected} mode={mode} clientCount={clientCount} />
                {lastUpdate && (
                  <span className="text-[9px] text-gray-400">
                    {'\u00b7'} updated {timeAgo(lastUpdate.toISOString())}
                  </span>
                )}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] text-gray-400 bg-gray-50 px-2 py-0.5 rounded-full">
              {feedItems.length} items
            </span>
            {feedItems.length > 0 && (
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`p-1 rounded ${showFilters ? 'bg-navy/10 text-navy' : 'text-gray-400 hover:text-gray-600'}`}
              >
                <Filter size={12} />
              </button>
            )}
          </div>
        </div>

        {/* Category filters */}
        {showFilters && categories.length > 2 && (
          <div className="flex gap-1 mt-2 flex-wrap">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setCategoryFilter(cat)}
                className={`px-2 py-0.5 rounded-full text-[9px] font-medium transition-all ${
                  categoryFilter === cat
                    ? 'bg-navy text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Feed Items */}
      <div
        ref={feedRef}
        className="divide-y divide-gray-50 overflow-y-auto"
        style={{ maxHeight: compact ? '300px' : '480px' }}
      >
        {filtered.length === 0 ? (
          <div className="py-12 text-center">
            <Radio size={24} className="text-gray-300 mx-auto mb-2" />
            <p className="text-xs text-gray-400">
              {connected ? 'No intelligence items yet' : 'Connecting to live feed\u2026'}
            </p>
            <p className="text-[10px] text-gray-300 mt-1">
              New data will appear here automatically
            </p>
          </div>
        ) : (
          <div className="p-3 space-y-2">
            {filtered.map(item => (
              <FeedItem key={item.id} item={item} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export { ConnectionBadge }
