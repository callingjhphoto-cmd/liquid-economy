import React from 'react'

/**
 * SkeletonCard — placeholder shimmer matching MetricCard dimensions.
 */
export function SkeletonCard({ className = '' }) {
  return (
    <div className={`bg-white rounded-xl shadow-sm border border-gray-100 p-5 ${className}`}>
      <div className="animate-pulse space-y-3">
        <div className="h-3 w-24 bg-gray-200 rounded" />
        <div className="h-8 w-32 bg-gray-200 rounded" />
        <div className="h-3 w-16 bg-gray-200 rounded" />
      </div>
    </div>
  )
}

/**
 * SkeletonTable — placeholder shimmer matching DataTable dimensions.
 */
export function SkeletonTable({ rows = 5, cols = 4, className = '' }) {
  return (
    <div className={`bg-white rounded-xl shadow-sm border border-gray-100 p-5 ${className}`}>
      <div className="animate-pulse space-y-3">
        {/* Header row */}
        <div className="flex gap-4">
          {Array.from({ length: cols }).map((_, i) => (
            <div key={`h-${i}`} className="h-3 bg-gray-300 rounded flex-1" />
          ))}
        </div>
        {/* Data rows */}
        {Array.from({ length: rows }).map((_, r) => (
          <div key={`r-${r}`} className="flex gap-4">
            {Array.from({ length: cols }).map((_, c) => (
              <div key={`r-${r}-c-${c}`} className="h-3 bg-gray-200 rounded flex-1" />
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

/**
 * SkeletonChart — placeholder shimmer matching ChartCard dimensions.
 */
export function SkeletonChart({ height = 240, className = '' }) {
  return (
    <div className={`bg-white rounded-xl shadow-sm border border-gray-100 p-5 ${className}`}>
      <div className="animate-pulse">
        <div className="h-4 w-40 bg-gray-200 rounded mb-4" />
        <div className="bg-gray-100 rounded" style={{ height }} />
      </div>
    </div>
  )
}
