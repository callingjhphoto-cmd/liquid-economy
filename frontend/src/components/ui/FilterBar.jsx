import React from 'react'
import { Filter, X } from 'lucide-react'

/**
 * FilterBar — Horizontal filter bar with dropdown selects and toggle pills.
 * Pattern used across Geographic, Venue, Category, and Companies pages.
 *
 * @param {Array<{key: string, label: string, options: Array<{value: string, label: string}>, value: string}>} filters - Dropdown filters
 * @param {function} onFilterChange - Called with (filterKey, newValue)
 * @param {function} [onClear] - Called to reset all filters
 * @param {boolean} [showClearButton=true] - Show clear-all button when filters active
 * @param {React.ReactNode} [children] - Extra content to render after filters (e.g. search)
 * @param {string} [className] - Additional classes
 */
export function FilterBar({
  filters = [],
  onFilterChange,
  onClear,
  showClearButton = true,
  children,
  className = '',
}) {
  const hasActiveFilters = filters.some(f => f.value && f.value !== 'all' && f.value !== '')

  return (
    <div className={`flex flex-wrap items-center gap-3 bg-white rounded-xl shadow-sm border border-gray-100 px-4 py-3 ${className}`}>
      <div className="flex items-center gap-1.5 text-gray-500">
        <Filter size={14} />
        <span className="text-[10px] font-medium uppercase tracking-wider hidden sm:inline">Filters</span>
      </div>

      <div className="h-4 w-px bg-gray-200 hidden sm:block" />

      {filters.map(filter => (
        <div key={filter.key} className="flex items-center gap-1.5">
          <label className="text-xs text-gray-500 font-medium whitespace-nowrap hidden sm:inline">
            {filter.label}
          </label>
          <select
            value={filter.value}
            onChange={e => onFilterChange(filter.key, e.target.value)}
            className="text-xs bg-gray-50 border border-gray-200 rounded-lg px-2 py-2 min-h-[36px] text-navy focus:outline-none focus:border-navy/30 focus:bg-white transition-colors cursor-pointer touch-manipulation"
          >
            {filter.options.map(opt => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      ))}

      {children}

      {showClearButton && hasActiveFilters && onClear && (
        <>
          <div className="h-4 w-px bg-gray-200" />
          <button
            onClick={onClear}
            className="inline-flex items-center gap-1 text-xs font-medium text-gray-500 hover:text-red-500 transition-colors"
          >
            <X size={10} />
            Clear all
          </button>
        </>
      )}
    </div>
  )
}
