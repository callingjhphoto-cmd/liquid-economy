import React from 'react'
import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'

/**
 * PageHeader — Consistent page-level header with title, subtitle,
 * breadcrumb trail, and optional action buttons.
 *
 * @param {string} title - Page title (renders in display font)
 * @param {string} [subtitle] - Description text below title
 * @param {Array<{label: string, to?: string}>} [breadcrumbs] - Breadcrumb trail
 * @param {React.ReactNode} [action] - Top-right action slot (buttons, filters, etc.)
 * @param {string} [className] - Additional classes
 */
export function PageHeader({
  title,
  subtitle,
  breadcrumbs,
  action,
  className = '',
}) {
  return (
    <div className={`mb-6 ${className}`}>
      {/* Breadcrumbs */}
      {breadcrumbs && breadcrumbs.length > 0 && (
        <nav className="flex items-center gap-1 mb-3">
          {breadcrumbs.map((crumb, i) => (
            <React.Fragment key={i}>
              {i > 0 && <ChevronRight size={12} className="text-gray-300" />}
              {crumb.to ? (
                <Link
                  to={crumb.to}
                  className="text-[11px] text-gray-500 hover:text-navy transition-colors no-underline"
                >
                  {crumb.label}
                </Link>
              ) : (
                <span className="text-[11px] text-navy font-medium">{crumb.label}</span>
              )}
            </React.Fragment>
          ))}
        </nav>
      )}

      {/* Title Row */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
        <div>
          <h1 className="font-display text-page text-navy">{title}</h1>
          {subtitle && (
            <p className="text-caption text-gray-500 mt-1 max-w-2xl">{subtitle}</p>
          )}
        </div>
        {action && <div className="flex-shrink-0">{action}</div>}
      </div>
    </div>
  )
}
