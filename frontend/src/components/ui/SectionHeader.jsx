import React from 'react'

/**
 * Page-level header — Georgia serif, large size.
 * Consistent across all 15 pages.
 */
export function PageTitle({ children, subtitle, action }) {
  return (
    <div className="flex items-start justify-between mb-6">
      <div>
        <h1 className="font-display text-page text-navy">{children}</h1>
        {subtitle && <p className="text-caption text-gray-500 mt-1">{subtitle}</p>}
      </div>
      {action && <div>{action}</div>}
    </div>
  )
}

/**
 * Section header — Georgia serif for lg/md, Inter for sm labels.
 * 3-tier hierarchy: lg (section title), md (subsection), sm (label).
 */
export function SectionHeader({ children, subtitle, action, size = 'md', className = '' }) {
  const sizes = {
    lg: 'font-display text-section text-navy',
    md: 'font-display text-subsection text-navy',
    sm: 'text-label text-gray-400 uppercase tracking-wider',
  }

  return (
    <div className={`flex items-center justify-between mb-4 ${className}`}>
      <div>
        <h2 className={sizes[size]}>{children}</h2>
        {subtitle && <p className="text-micro text-gray-400 mt-0.5">{subtitle}</p>}
      </div>
      {action && <div>{action}</div>}
    </div>
  )
}

/**
 * Tiny uppercase label — for card sub-sections, table group headers, etc.
 */
export function SectionLabel({ children, className = '' }) {
  return (
    <h3 className={`text-label text-gray-400 uppercase tracking-wider mb-2 ${className}`}>{children}</h3>
  )
}
