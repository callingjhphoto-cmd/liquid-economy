import React from 'react'

/**
 * LoadingSpinner — Consistent loading state component.
 * Full-page or inline variants with navy-themed spinner.
 *
 * @param {'full'|'inline'|'overlay'} [variant='inline'] - Display mode
 * @param {string} [message] - Optional loading message
 * @param {'sm'|'md'|'lg'} [size='md'] - Spinner size
 * @param {string} [className] - Additional classes
 */
export function LoadingSpinner({
  variant = 'inline',
  message,
  size = 'md',
  className = '',
}) {
  const sizes = {
    sm: 'w-5 h-5 border-[1.5px]',
    md: 'w-8 h-8 border-2',
    lg: 'w-12 h-12 border-[3px]',
  }

  const spinner = (
    <div className={`${sizes[size]} border-navy/20 border-t-navy rounded-full animate-spin`} />
  )

  if (variant === 'full') {
    return (
      <div className={`flex flex-col items-center justify-center min-h-[60vh] gap-3 ${className}`}>
        {spinner}
        {message && <p className="text-xs text-gray-500">{message}</p>}
      </div>
    )
  }

  if (variant === 'overlay') {
    return (
      <div className={`absolute inset-0 bg-white/80 flex flex-col items-center justify-center gap-3 z-50 rounded-xl ${className}`}>
        {spinner}
        {message && <p className="text-xs text-gray-500">{message}</p>}
      </div>
    )
  }

  // inline (default)
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {spinner}
      {message && <span className="text-xs text-gray-500">{message}</span>}
    </div>
  )
}
