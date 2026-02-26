/**
 * LiveFeed \u2014 Bloomberg-style real-time intelligence feed
 *
 * Compressed, information-dense display inspired by Bloomberg Terminal.
 * Shows live-updating intelligence items with severity indicators,
 * category ticker-style filtering, and auto-scroll for new items.
 */

import React, { useState, useRef, useEffect } from 'react'
import { Radio, Wifi, WifiOff, ExternalLink, AlertTriangle, Info, Eye, Zap, Filter, ChevronDown, TrendingUp, TrendingDown } from 'lucide-react'
import { useLiveData } from '../context/LiveDataContext'

const SEVERITY_CONFIG = {
  critical: { bg: 'bg-red-950', border: 'border-red-500', text: 'text-red-400', dot: 'bg-red-500', label: 'CRIT', labelBg: 'bg-red-500/20' },
  alert:    { bg: 'bg-amber-950', border: 'border-amber-500', text: 'text-amber-400', dot: 'bg-amber-500', label: 'ALRT', labelBg: 'bg-amber-500/20' },
  watch:    { bg: 'bg-blue-950', border: 'border-blue-500', text: 'text-blue-400', dot: 'bg-blue-500', label: 'WTCH', labelBg: 'bg-blue-500/20' },
  info:     { bg: 'bg-gray-900', border: 'border-gray-600', text: 'text-gray-400', dot: 'bg-gray-500', label: 'INFO', labelBg: 'bg-gray-500/20' },
}

const CATEGORY_LABELS = {
  tequila: { short: 'TEQ', color: 'text-amber-400' },
  vodka: { short: 'VOD', color: 'text-sky-400' },
  gin: { short: 'GIN', color: 'text-emerald-400' },
  whisky: { short: 'WHK', color: 'text-orange-400' },
  rum: { short: 'RUM', color: 'text-red-400' },
  cognac: { short: 'COG', color: 'text-purple-400' },
  champagne: { short: 'CHP', color: 'text-yellow-400' },
  wine: { short: 'WIN', color: 'text-rose-400' },
  beer: { short: 'BER', color: 'text-amber-300' },
  nolo: { short: 'N/L', color: 'text-teal-400' },
  rtd: { short: 'RTD', color: 'text-indigo-400' },
  general: { short: 'GEN', color: 'text-gray-400' },
  market: { short: 'MKT', color: 'text-white' },
  regulatory: { short: 'REG', color: 'text-slate-400' },
  ma: { short: 'M&A', color: 'text-violet-400' },
  sustainability: { short: 'ESG', color: 'text-green-400' },
  trade: { short: 'TRD', color: 'text-cyan-400' },
  tech: { short: 'TCH', color: 'text-blue-300' },
}

function timeAgo(ts) {
  const diff = Date.now() - new Date(ts).getTime()
  const secs = Math.floor(diff / 1000)
  if (secs < 60) return 'NOW'
  const mins = Math.floor(secs / 60)
  if (mins < 60) return `${mins}m`
  const hrs = Math.floor(mins / 60)
  if (hrs < 24) return `${hrs}h`
  return `${Math.floor(hrs / 24)}d`
}

function ConnectionBadge({ connected, mode, clientCount }) {
  if (connected) {
    return (
      <div className="flex items-center gap-1.5 text-[10px]">
        <span className="relative flex h-1.5 w-1.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-500" />
        </span>
        <span className="text-green-400 font-mono font-bold text-[9px]">
          {mode === 'sse' ? 'LIVE' : 'POLL'}
        </span>
      </div>
    )
  }
  return (
    <div className="flex items-center gap-1 text-[9px] text-gray-500 font-mono">
      <WifiOff size={9} />
      <span>OFFLINE</span>
    </div>
  )
}

// Bloomberg-style compressed feed item
function TickerItem({ item, expanded, onToggle }) {
  const sev = SEVERITY_CONFIG[item.severity] || SEVERITY_CONFIG.info
  const cat = CATEGORY_LABELS[item.category] || CATEGORY_LABELS.general

  return (
    <div
      className={`border-b border-gray-800/50 hover:bg-white/5 transition-colors cursor-pointer ${expanded ? 'bg-white/5' : ''}`}
      onClick={onToggle}
    >
      {/* Compressed row */}
      <div className="flex items-center gap-1.5 px-2 py-1.5">
        {/* Severity dot */}
        <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${sev.dot}`} />
        {/* Time */}
        <span className="text-[9px] font-mono text-gray-500 w-6 flex-shrink-0 text-right">{timeAgo(item.timestamp)}</span>
        {/* Category tag */}
        <span className={`text-[9px] font-mono font-bold ${cat.color} w-7 flex-shrink-0`}>{cat.short}</span>
        {/* Severity badge */}
        <span className={`text-[8px] font-mono font-bold px-1 py-0 rounded ${sev.labelBg} ${sev.text} flex-shrink-0`}>{sev.label}</span>
        {/* Title — truncated to single line */}
        <span className="text-[11px] text-gray-200 font-medium truncate flex-1">{item.title}</span>
        {/* Source + link */}
        <div className="flex items-center gap-1 flex-shrink-0">
          {item.source && <span className="text-[8px] text-gray-600 font-mono hidden sm:inline">{item.source.slice(0, 12)}</span>}
          {item.url && (
            <a href={item.url} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-blue-400" onClick={e => e.stopPropagation()}>
              <ExternalLink size={9} />
            </a>
          )}
        </div>
      </div>

      {/* Expanded detail */}
      {expanded && item.body && (
        <div className="px-2 pb-2 pl-[72px]">
          <p className="text-[10px] text-gray-400 leading-relaxed">{item.body}</p>
          <div className="flex items-center gap-2 mt-1">
            {item.source && <span className="text-[9px] text-gray-600">{item.source}</span>}
            {item.url && (
              <a href={item.url} target="_blank" rel="noopener noreferrer" className="text-[9px] text-blue-400 hover:text-blue-300 flex items-center gap-0.5" onClick={e => e.stopPropagation()}>
                Read full article <ExternalLink size={8} />
              </a>
            )}
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
  const feedRef = useRef(null)

  // Get unique categories from feed
  const categories = ['all', ...new Set(feedItems.map(i => i.category))]

  let filtered = feedItems
  if (categoryFilter !== 'all') filtered = filtered.filter(i => i.category === categoryFilter)
  if (severityFilter !== 'all') filtered = filtered.filter(i => i.severity === severityFilter)
  filtered = filtered.slice(0, maxItems)

  // Severity counts for header ticker
  const critCount = feedItems.filter(i => i.severity === 'critical').length
  const alertCount = feedItems.filter(i => i.severity === 'alert').length

  // Auto-scroll to top when new items arrive
  useEffect(() => {
    if (feedRef.current && filtered.length > 0) {
      feedRef.current.scrollTop = 0
    }
  }, [filtered.length])

  return (
    <div className="bg-[#0a0e17] rounded-xl border border-gray-800 overflow-hidden text-white">
      {/* Header — Bloomberg-style dark header */}
      <div className="px-2.5 py-2 border-b border-gray-800 bg-gradient-to-r from-[#0a0e17] to-[#111827]">
        <div className="flex items-center justify-between mb-1.5">
          <div className="flex items-center gap-2">
            <div className="p-1 bg-amber-500/20 rounded">
              <Radio size={10} className="text-amber-400" />
            </div>
            <div>
              <h3 className="text-[11px] font-mono font-bold text-amber-400 tracking-wide">INTELLIGENCE FEED</h3>
              <ConnectionBadge connected={connected} mode={mode} clientCount={clientCount} />
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            {critCount > 0 && (
              <span className="text-[9px] font-mono font-bold bg-red-500/20 text-red-400 px-1.5 py-0.5 rounded">{critCount} CRIT</span>
            )}
            {alertCount > 0 && (
              <span className="text-[9px] font-mono font-bold bg-amber-500/20 text-amber-400 px-1.5 py-0.5 rounded">{alertCount} ALRT</span>
            )}
            <span className="text-[9px] font-mono text-gray-600">{feedItems.length}</span>
          </div>
        </div>

        {/* Category ticker / filter row */}
        <div className="flex gap-0.5 overflow-x-auto scrollbar-none">
          <button
            onClick={() => setCategoryFilter('all')}
            className={`px-1.5 py-0.5 rounded text-[8px] font-mono font-bold flex-shrink-0 transition-colors ${categoryFilter === 'all' ? 'bg-amber-500/30 text-amber-400' : 'text-gray-600 hover:text-gray-400'}`}
          >
            ALL
          </button>
          {categories.filter(c => c !== 'all').map(cat => {
            const catInfo = CATEGORY_LABELS[cat] || CATEGORY_LABELS.general
            const count = feedItems.filter(i => i.category === cat).length
            return (
              <button
                key={cat}
                onClick={() => setCategoryFilter(cat)}
                className={`px-1.5 py-0.5 rounded text-[8px] font-mono font-bold flex-shrink-0 transition-colors ${categoryFilter === cat ? `bg-white/10 ${catInfo.color}` : 'text-gray-600 hover:text-gray-400'}`}
              >
                {catInfo.short}{count > 1 ? ` ${count}` : ''}
              </button>
            )
          })}
        </div>

        {/* Severity quick filter */}
        <div className="flex gap-0.5 mt-1">
          {['all', 'critical', 'alert', 'watch'].map(sev => (
            <button
              key={sev}
              onClick={() => setSeverityFilter(sev)}
              className={`px-1.5 py-0.5 rounded text-[8px] font-mono flex-shrink-0 transition-colors ${
                severityFilter === sev
                  ? sev === 'all' ? 'bg-white/10 text-white' : `${SEVERITY_CONFIG[sev]?.labelBg || ''} ${SEVERITY_CONFIG[sev]?.text || 'text-white'}`
                  : 'text-gray-700 hover:text-gray-500'
              }`}
            >
              {sev === 'all' ? 'ALL' : SEVERITY_CONFIG[sev]?.label || sev.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Feed Items — compressed ticker-style */}
      <div
        ref={feedRef}
        className="overflow-y-auto"
        style={{ maxHeight: compact ? '340px' : '520px' }}
      >
        {filtered.length === 0 ? (
          <div className="py-8 text-center">
            <Radio size={16} className="text-gray-700 mx-auto mb-2" />
            <p className="text-[10px] text-gray-600 font-mono">
              {connected ? 'NO ITEMS' : 'CONNECTING\u2026'}
            </p>
          </div>
        ) : (
          filtered.map(item => (
            <TickerItem
              key={item.id}
              item={item}
              expanded={expandedId === item.id}
              onToggle={() => setExpandedId(expandedId === item.id ? null : item.id)}
            />
          ))
        )}
      </div>

      {/* Footer — last update timestamp */}
      <div className="px-2.5 py-1 border-t border-gray-800 bg-[#0a0e17] flex items-center justify-between">
        <span className="text-[8px] font-mono text-gray-700">
          {lastUpdate ? `UPD ${lastUpdate.toLocaleTimeString()}` : 'WAITING'}
        </span>
        <span className="text-[8px] font-mono text-gray-700">
          {filtered.length}/{feedItems.length} shown
        </span>
      </div>
    </div>
  )
}

export { ConnectionBadge }
