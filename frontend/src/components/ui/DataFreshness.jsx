import React from 'react'
import { Clock } from 'lucide-react'

/**
 * DataFreshness — Small indicator showing when data was last updated.
 * Displays a green dot, timestamp, and optional source label.
 *
 * @param {string} [date] - Data date (e.g. "March 2026")
 * @param {string} [source] - Data source (e.g. "IWSR, Euromonitor")
 * @param {string} [className] - Additional classes
 */
export function DataFreshness({ date = 'March 2026', source, className = '' }) {
  return (
    <div className={`inline-flex items-center gap-1.5 text-[10px] text-gray-500 font-medium ${className}`}>
      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 flex-shrink-0" />
      <Clock size={10} className="text-gray-400" />
      <span>Data as of {date}</span>
      {source && (
        <>
          <span className="text-gray-300">&bull;</span>
          <span className="text-gray-400">{source}</span>
        </>
      )}
    </div>
  )
}
