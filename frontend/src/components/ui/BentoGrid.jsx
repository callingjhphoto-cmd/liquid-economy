import React from 'react'

/**
 * BentoGrid — responsive grid container for bento box card layouts.
 * Desktop: 4 columns, Tablet: 2 columns, Mobile: 1 column.
 */
export function BentoGrid({ children, className = '' }) {
  return (
    <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 ${className}`}>
      {children}
    </div>
  )
}

/**
 * Hero card span — 2 cols + 2 rows on desktop, full width on mobile.
 */
BentoGrid.Hero = function BentoHero({ children, className = '' }) {
  return (
    <div className={`sm:col-span-2 sm:row-span-2 ${className}`}>
      {children}
    </div>
  )
}

/**
 * Wide card span — 2 cols on desktop, full width on mobile.
 */
BentoGrid.Wide = function BentoWide({ children, className = '' }) {
  return (
    <div className={`sm:col-span-2 ${className}`}>
      {children}
    </div>
  )
}

/**
 * Full-width card span — spans all columns at every breakpoint.
 */
BentoGrid.Full = function BentoFull({ children, className = '' }) {
  return (
    <div className={`col-span-full ${className}`}>
      {children}
    </div>
  )
}
