import React from 'react'
import { Calendar } from 'lucide-react'

/**
 * YearSelector — Year tab selector for year-keyed data.
 * Pill-style tabs matching the design system. Defaults to 2021-2025.
 *
 * @param {number} activeYear - Currently selected year
 * @param {function} onChange - Callback with selected year (number)
 * @param {number[]} [years=[2021,2022,2023,2024,2025]] - Available years
 * @param {boolean} [showIcon=true] - Show calendar icon
 * @param {'sm'|'md'|'lg'} [size='md'] - Size variant
 * @param {string} [className] - Additional classes
 */
export function YearSelector({
  activeYear,
  onChange,
  years = [2021, 2022, 2023, 2024, 2025],
  showIcon = true,
  size = 'md',
  className = '',
}) {
  const sizes = {
    sm: 'text-xs px-2 py-1 min-h-[32px]',
    md: 'text-xs px-3 py-1.5 min-h-[36px]',
    lg: 'text-sm px-4 py-2 min-h-[44px]',
  }

  return (
    <div className={`inline-flex items-center gap-2 overflow-x-auto ${className}`}>
      {showIcon && <Calendar size={14} className="text-gray-400 flex-shrink-0" />}
      <div className="inline-flex items-center gap-1 bg-gray-100 rounded-lg p-1 whitespace-nowrap">
        {years.map(year => (
          <button
            key={year}
            onClick={() => onChange(year)}
            className={`${sizes[size]} rounded-md font-medium transition-colors touch-manipulation ${
              year === activeYear
                ? 'bg-white text-navy shadow-sm'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {year}
          </button>
        ))}
      </div>
    </div>
  )
}
