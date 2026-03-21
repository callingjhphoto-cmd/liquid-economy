import React from 'react'

/**
 * Reusable tab selector — clean pill-style tabs.
 * Used for year selectors, view modes, category filters, etc.
 */
export function TabGroup({ tabs, active, onChange, size = 'md', className = '' }) {
  const sizes = {
    sm: 'text-xs px-2 py-1 min-h-[32px]',
    md: 'text-xs px-3 py-1.5 min-h-[36px]',
    lg: 'text-sm px-4 py-2 min-h-[44px]',
  }

  return (
    <div className={`inline-flex items-center gap-1 bg-gray-100 rounded-lg p-1 overflow-x-auto whitespace-nowrap ${className}`}>
      {tabs.map(tab => {
        const key = typeof tab === 'object' ? tab.key : tab
        const label = typeof tab === 'object' ? tab.label : tab
        const isActive = key === active

        return (
          <button
            key={key}
            onClick={() => onChange(key)}
            className={`${sizes[size]} rounded-md font-medium transition-colors touch-manipulation flex-shrink-0 ${
              isActive
                ? 'bg-white text-navy shadow-sm'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {label}
          </button>
        )
      })}
    </div>
  )
}

/**
 * Pill-style filter buttons — for filtering lists/tables.
 */
export function FilterPills({ options, active, onChange, size = 'md' }) {
  const sizes = {
    sm: 'text-xs px-2 py-1 min-h-[32px]',
    md: 'text-xs px-3 py-1.5 min-h-[36px]',
    lg: 'text-sm px-4 py-2 min-h-[44px]',
  }

  return (
    <div className="flex flex-wrap gap-1.5">
      {options.map(opt => {
        const key = typeof opt === 'object' ? opt.key : opt
        const label = typeof opt === 'object' ? opt.label : opt
        const isActive = key === active

        return (
          <button
            key={key}
            onClick={() => onChange(key)}
            className={`${sizes[size]} rounded-lg font-medium transition-colors border touch-manipulation ${
              isActive
                ? 'bg-navy text-white border-navy'
                : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
            }`}
          >
            {label}
          </button>
        )
      })}
    </div>
  )
}
