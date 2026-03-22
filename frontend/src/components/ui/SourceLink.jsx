import React, { useState } from 'react'
import { ExternalLink } from 'lucide-react'

/**
 * SourceLink — Interactive citation component with hover popover.
 * Shows favicon, domain, and optional snippet on hover.
 *
 * @param {string} label - Source name / description
 * @param {string} [url] - Optional URL (renders as plain text if absent)
 * @param {string} [snippet] - Optional preview text shown in hover card
 * @param {string} [className] - Additional classes
 */
export function SourceLink({ label, url, snippet, className = '' }) {
  const [showCard, setShowCard] = useState(false)

  if (!url) {
    return (
      <span className={`text-xs text-gray-500 ${className}`}>{label}</span>
    )
  }

  // Extract domain for favicon
  let domain = ''
  let favicon = null
  try {
    domain = new URL(url).hostname
    favicon = `https://www.google.com/s2/favicons?domain=${domain}&sz=16`
  } catch {
    // Invalid URL — skip favicon
  }

  return (
    <span
      className="relative inline-block"
      onMouseEnter={() => setShowCard(true)}
      onMouseLeave={() => setShowCard(false)}
    >
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className={`inline-flex items-center gap-1 text-xs text-navy/60 hover:text-navy transition-colors no-underline ${className}`}
      >
        {favicon && <img src={favicon} alt="" className="w-4 h-4 rounded-sm" />}
        <span className="hover:underline">{label}</span>
        <ExternalLink size={10} className="flex-shrink-0" />
      </a>

      {/* Hover citation card */}
      {showCard && url && (
        <div className="absolute left-0 bottom-full mb-2 w-72 bg-white rounded-xl shadow-lg border border-gray-200 p-4 z-50 animate-fadeIn pointer-events-none">
          <div className="flex items-start gap-3">
            {favicon && <img src={favicon} alt="" className="w-5 h-5 rounded-sm mt-0.5 flex-shrink-0" />}
            <div className="min-w-0">
              <p className="text-small font-medium text-navy truncate">{label}</p>
              <p className="text-caption text-gray-500 truncate">{domain}</p>
              {snippet && <p className="text-caption text-gray-500 mt-1 line-clamp-2">{snippet}</p>}
            </div>
          </div>
        </div>
      )}
    </span>
  )
}

/**
 * SourceList — Renders a row of SourceLink citations.
 *
 * @param {Array<{label: string, url?: string, snippet?: string}>} sources
 * @param {string} [className]
 */
export function SourceList({ sources, className = '' }) {
  if (!sources || sources.length === 0) return null

  return (
    <div className={`flex flex-wrap items-center gap-x-3 gap-y-1 pt-2 border-t border-gray-50 ${className}`}>
      <span className="text-xs text-gray-500 font-medium">Sources:</span>
      {sources.map((src, i) => (
        <SourceLink key={i} label={src.label} url={src.url} snippet={src.snippet} />
      ))}
    </div>
  )
}
