import React, { useState } from 'react'
import { ResponsiveContainer } from 'recharts'
import { ExternalLink, Copy, Check } from 'lucide-react'
import { DataTable } from './DataTable'

/**
 * ChartCard — Consistent wrapper for Recharts visualizations.
 * Provides title, subtitle, optional source attribution, and loading state.
 * Optionally renders a DataTable fallback for screen readers / keyboard users.
 *
 * @param {string} title - Chart title
 * @param {string} [subtitle] - Optional subtitle / description
 * @param {number} [height=240] - Chart container height in px
 * @param {string} [source] - Data source label
 * @param {string} [sourceUrl] - Clickable source URL
 * @param {boolean} [loading=false] - Show skeleton loader
 * @param {React.ReactNode} [action] - Optional top-right action slot
 * @param {React.ReactNode} children - Recharts chart component(s)
 * @param {Array<object>} [tableData] - Data rows for accessible data table fallback
 * @param {Array<{key: string, label: string}>} [tableColumns] - Column definitions for data table
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
  'aria-label': ariaLabel,
  copyData,
  tableData,
  tableColumns,
}) {
  const [copied, setCopied] = useState(false)
  const [showDataTable, setShowDataTable] = useState(false)

  const handleCopy = () => {
    const text = copyData || `${title}${subtitle ? ' \u2014 ' + subtitle : ''}${source ? '\nSource: ' + source : ''}`
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    })
  }

  return (
    <div role="figure" aria-label={ariaLabel || title} className={`bg-white rounded-xl shadow-sm border border-gray-100 p-5 group/chart ${className}`}>
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="font-display text-sm font-semibold text-navy">{title}</h3>
          {subtitle && <p className="text-xs text-gray-500 mt-0.5">{subtitle}</p>}
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={handleCopy}
            className="p-1.5 rounded-md opacity-0 group-hover/chart:opacity-100 hover:bg-gray-100 text-gray-600 hover:text-navy transition-all"
            title={copied ? 'Copied!' : 'Copy chart info'}
            aria-label="Copy chart info to clipboard"
          >
            {copied ? <Check size={12} className="text-emerald-500" /> : <Copy size={12} />}
          </button>
          {action && <div>{action}</div>}
        </div>
      </div>

      {/* Chart Area */}
      {loading ? (
        <div className="flex items-center justify-center" style={{ height: Math.min(height, 200) }}>
          <div className="flex flex-col items-center gap-2">
            <div className="w-8 h-8 border-2 border-navy/20 border-t-navy rounded-full animate-spin" />
            <span className="text-xs text-gray-500">Loading chart data{'\u2026'}</span>
          </div>
        </div>
      ) : (
        <div style={{ height }}>
          <ResponsiveContainer width="100%" height="100%">
            {children}
          </ResponsiveContainer>
        </div>
      )}

      {/* sr-only data table for screen readers (always rendered) */}
      {tableData && tableColumns && (
        <table className="sr-only" aria-label={`Data table for ${title}`}>
          <thead>
            <tr>{tableColumns.map(c => <th key={c.key}>{c.label}</th>)}</tr>
          </thead>
          <tbody>
            {tableData.map((row, i) => (
              <tr key={i}>{tableColumns.map(c => <td key={c.key}>{row[c.key]}</td>)}</tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Data Table Toggle + Visual Fallback */}
      {tableData && tableColumns && (
        <>
          <button
            onClick={() => setShowDataTable(!showDataTable)}
            className="text-xs text-gray-500 hover:text-navy underline mt-2 min-h-[44px] flex items-center"
            aria-label={showDataTable ? 'Hide data table' : 'Show data as table'}
          >
            {showDataTable ? 'Hide Data Table' : 'Show Data Table'}
          </button>
          {showDataTable && (
            <div className="mt-2">
              <DataTable data={tableData} columns={tableColumns} compact />
            </div>
          )}
        </>
      )}

      {/* Source Attribution */}
      {source && (
        <div className="mt-3 pt-2 border-t border-gray-50 flex items-center gap-1">
          <span className="text-xs text-gray-500">Source:</span>
          {sourceUrl ? (
            <a
              href={sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-navy/60 hover:text-navy flex items-center gap-0.5 no-underline"
            >
              {source}
              <ExternalLink size={8} />
            </a>
          ) : (
            <span className="text-xs text-gray-500">{source}</span>
          )}
        </div>
      )}
    </div>
  )
}
