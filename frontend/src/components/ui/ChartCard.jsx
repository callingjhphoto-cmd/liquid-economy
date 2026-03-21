import React from 'react'
import { ResponsiveContainer } from 'recharts'
import { ExternalLink } from 'lucide-react'

/**
 * ChartCard — Consistent wrapper for Recharts visualizations.
 * Provides title, subtitle, optional source attribution, and loading state.
 *
 * @param {string} title - Chart title
 * @param {string} [subtitle] - Optional subtitle / description
 * @param {number} [height=240] - Chart container height in px
 * @param {string} [source] - Data source label
 * @param {string} [sourceUrl] - Clickable source URL
 * @param {boolean} [loading=false] - Show skeleton loader
 * @param {React.ReactNode} [action] - Optional top-right action slot
 * @param {React.ReactNode} children - Recharts chart component(s)
 */
export function ChartCard({
  title,
  subtitle,
  height = 240,
  source,
  sourceUrl,
  loading = false,
  action,
  children,
  className = '',
}) {
  return (
    <div className={`bg-white rounded-xl shadow-sm border border-gray-100 p-5 ${className}`}>
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="font-display text-sm font-semibold text-navy">{title}</h3>
          {subtitle && <p className="text-[11px] text-gray-500 mt-0.5">{subtitle}</p>}
        </div>
        {action && <div>{action}</div>}
      </div>

      {/* Chart Area */}
      {loading ? (
        <div className="flex items-center justify-center" style={{ height: Math.min(height, 200) }}>
          <div className="flex flex-col items-center gap-2">
            <div className="w-8 h-8 border-2 border-navy/20 border-t-navy rounded-full animate-spin" />
            <span className="text-[10px] text-gray-500">Loading chart data\u2026</span>
          </div>
        </div>
      ) : (
        <div style={{ height }}>
          <ResponsiveContainer width="100%" height="100%">
            {children}
          </ResponsiveContainer>
        </div>
      )}

      {/* Source Attribution */}
      {source && (
        <div className="mt-3 pt-2 border-t border-gray-50 flex items-center gap-1">
          <span className="text-[10px] text-gray-500">Source:</span>
          {sourceUrl ? (
            <a
              href={sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[10px] text-navy/60 hover:text-navy flex items-center gap-0.5 no-underline"
            >
              {source}
              <ExternalLink size={8} />
            </a>
          ) : (
            <span className="text-[10px] text-gray-500">{source}</span>
          )}
        </div>
      )}
    </div>
  )
}
