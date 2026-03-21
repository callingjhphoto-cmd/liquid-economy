import React from 'react'

const VARIANTS = {
  default: 'bg-gray-100 text-gray-600',
  navy: 'bg-navy/10 text-navy',
  gold: 'bg-gold/10 text-gold',
  green: 'bg-emerald-50 text-emerald-700',
  red: 'bg-red-50 text-red-700',
  orange: 'bg-orange-50 text-orange-700',
  blue: 'bg-blue-50 text-blue-700',
}

const SIZES = {
  sm: 'text-xs px-1.5 py-0.5',
  md: 'text-xs px-2 py-0.5',
  lg: 'text-sm px-3 py-1',
}

export function Badge({ children, variant = 'default', size = 'md', className = '' }) {
  return (
    <span className={`inline-flex items-center font-medium rounded-full ${VARIANTS[variant] || VARIANTS.default} ${SIZES[size]} ${className}`}>
      {children}
    </span>
  )
}

export function StatusDot({ status = 'default', label }) {
  const colors = {
    live: 'bg-emerald-500',
    warning: 'bg-orange-500',
    critical: 'bg-red-500',
    default: 'bg-gray-400',
  }
  return (
    <span className="inline-flex items-center gap-1.5">
      <span className={`w-3 h-3 rounded-full ${colors[status] || colors.default}`} />
      {label && <span className="text-xs text-gray-600">{label}</span>}
    </span>
  )
}
