import React from 'react'
import { Link } from 'react-router-dom'

const ENTITY_ROUTES = {
  category: '/categories',
  'category-detail': '/category',
  company: '/companies',
  brand: '/pricing',
  venue: '/venues',
  market: '/geographic',
}

/**
 * EntityLink — cross-page navigation component for entity references.
 * Renders a react-router Link with appropriate route and query params.
 *
 * Usage:
 *   <EntityLink type="category" id="tequila" label="Tequila" />
 *   <EntityLink type="company" id="diageo" label="Diageo" context={{ tab: 'brands' }} />
 *   <EntityLink type="brand" id="patron" label="Patrón" context={{ category: 'tequila' }} />
 */
export function EntityLink({ type, id, label, context = {}, className = '' }) {
  if (!ENTITY_ROUTES[type]) {
    if (process.env.NODE_ENV !== 'production') {
      console.warn(`EntityLink: unknown type "${type}"`)
    }
    return <span className={className}>{label}</span>
  }

  // category-detail uses path params
  if (type === 'category-detail') {
    return (
      <Link
        to={`${ENTITY_ROUTES[type]}/${id}`}
        className={`text-editorial hover:text-navy underline decoration-editorial/30 hover:decoration-editorial transition-colors ${className}`}
      >
        {label}
      </Link>
    )
  }

  // Everything else uses query params
  const params = new URLSearchParams({ [type]: id, ...context })

  return (
    <Link
      to={`${ENTITY_ROUTES[type]}?${params.toString()}`}
      className={`text-editorial hover:text-navy underline decoration-editorial/30 hover:decoration-editorial transition-colors ${className}`}
    >
      {label}
    </Link>
  )
}
