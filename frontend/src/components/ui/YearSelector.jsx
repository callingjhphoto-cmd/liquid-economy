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
    sm: 'text-[10px] px-2 py-1',
    md: 'text-xs px-3 py-1.5',
    lg: 'text-sm px-4 py-2',
  }

  return (
    <div className={`inline-flex items-center gap-2 ${className}`}>
      {showIcon && <Calendar size={14} className="text-gray-400" />}
      <div className="inline-flex items-center gap-1 bg-gray-100 rounded-lg p-1">
        {years.map(year => (
          <button
            key={year}
            onClick={() => onChange(year)}
            className={`${sizes[size]} rounded-md font-medium transition-colors ${
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
