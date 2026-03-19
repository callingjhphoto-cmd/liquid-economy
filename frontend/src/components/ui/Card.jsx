import React from 'react'

/**
 * Bento Box card — white bg, rounded corners, subtle shadow.
 * The foundational layout primitive for the Liquid Economy design system.
 */
export function Card({ children, className = '', padding = 'p-5', onClick, hover = false }) {
  return (
    <div
      onClick={onClick}
      className={`bg-white rounded-xl shadow-sm border border-gray-100 ${padding} ${hover ? 'hover:shadow-md hover:border-gray-200 transition-shadow cursor-pointer' : ''} ${className}`}
    >
      {children}
    </div>
  )
}

/**
 * Card with a subtle gold left-border accent — for highlighted/featured content.
 */
export function AccentCard({ children, className = '', padding = 'p-5' }) {
  return (
    <div className={`bg-white rounded-xl shadow-sm border border-gray-100 border-l-3 border-l-gold ${padding} ${className}`}>
      {children}
    </div>
  )
}

/**
 * Full-width section wrapper with optional max-width constraint.
 */
export function Section({ children, className = '' }) {
  return (
    <section className={`mb-6 ${className}`}>
      {children}
    </section>
  )
}
