import React from 'react'
import { Link } from 'react-router-dom'
import { resolveEntityLink } from '../../data/dossiers/index.js'

/**
 * EntityLink — cross-page navigation component for entity references.
 * Now routes through the dossier resolver first; falls back cleanly to legacy routes.
 *
 * Usage:
 *   <EntityLink type="category" id="tequila" label="Tequila" />
 *   <EntityLink type="company" id="campari-group" label="Campari Group" />
 *   <EntityLink type="brand" id="aperol" label="Aperol" />
 *
 * Resolution priority:
 *   1. resolveEntityLink(type, id) from dossier index → dossier route if built
 *   2. Clean fallback to legacy query-param route (/ pricing, /companies, /categories)
 */
export function EntityLink({ type, id, label, context = {}, className = '' }) {
  const { route, status } = resolveEntityLink(type, id)

  const linkClass = `text-editorial hover:text-navy underline decoration-editorial/30 hover:decoration-editorial transition-colors ${className}`

  // If resolved to a dossier route, use path-based Link
  if (status === 'dossier') {
    return (
      <Link to={route} className={linkClass}>
        {label}
      </Link>
    )
  }

  // Legacy fallback: query-param route
  // If there's additional context, merge into the query string
  if (Object.keys(context).length > 0) {
    const base = route.includes('?') ? route + '&' : route + '?'
    const params = new URLSearchParams(context)
    return (
      <Link to={`${base}${params.toString()}`} className={linkClass}>
        {label}
      </Link>
    )
  }

  return (
    <Link to={route} className={linkClass}>
      {label}
    </Link>
  )
}
