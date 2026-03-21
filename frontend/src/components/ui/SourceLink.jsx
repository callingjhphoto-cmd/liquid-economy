import React from 'react'
import { ExternalLink } from 'lucide-react'

/**
 * SourceLink — Standardized source citation component.
 * Renders as a subtle inline link with external icon. Can be used
 * individually or as a list via SourceList.
 *
 * @param {string} label - Source name / description
 * @param {string} [url] - Optional URL (renders as plain text if absent)
 * @param {string} [className] - Additional classes
 */
export function SourceLink({ label, url, className = '' }) {
  if (!url) {
    return (
      <span className={`text-xs text-gray-500 ${className}`}>{label}</span>
    )
  }

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-1 text-xs text-navy/60 hover:text-navy transition-colors no-underline ${className}`}
    >
      {label}
      <ExternalLink size={8} className="flex-shrink-0" />
    </a>
  )
}

/**
 * SourceList — Renders a row of SourceLink citations.
 *
 * @param {Array<{label: string, url?: string}>} sources
 * @param {string} [className]
 */
export function SourceList({ sources, className = '' }) {
  if (!sources || sources.length === 0) return null

  return (
    <div className={`flex flex-wrap items-center gap-x-3 gap-y-1 pt-2 border-t border-gray-50 ${className}`}>
      <span className="text-xs text-gray-500 font-medium">Sources:</span>
      {sources.map((src, i) => (
        <SourceLink key={i} label={src.label} url={src.url} />
      ))}
    </div>
  )
}
