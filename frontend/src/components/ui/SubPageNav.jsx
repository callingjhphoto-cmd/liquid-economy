import React from 'react'
import { Link, useLocation } from 'react-router-dom'

const groups = {
  intelligence: [
    { label: 'Categories', to: '/categories' },
    { label: 'Companies', to: '/companies' },
    { label: 'Pricing', to: '/pricing' },
    { label: 'Venues', to: '/venues' },
    { label: 'Geographic', to: '/geographic' },
  ],
  planning: [
    { label: 'Supply Chain', to: '/supply-chain' },
    { label: 'Market Entry', to: '/scenario' },
    { label: 'Margin Calculator', to: '/margin' },
    { label: 'Campaign Planner', to: '/campaigns' },
  ],
  reports: [
    { label: 'Report Builder', to: '/reports' },
    { label: 'Valuations', to: '/valuations' },
  ],
}

export function SubPageNav({ group }) {
  const location = useLocation()
  const pages = groups[group]
  if (!pages) return null

  return (
    <div className="lg:hidden overflow-x-auto whitespace-nowrap px-4 py-2 border-b border-gray-100 bg-white sticky top-[56px] z-30 -mx-4 -mt-4 mb-4">
      <div className="flex gap-2">
        {pages.map(page => {
          const active = location.pathname === page.to ||
            (page.to === '/categories' && location.pathname.startsWith('/category/'))
          return (
            <Link
              key={page.to}
              to={page.to}
              className={`px-3 py-1.5 rounded-full text-[12px] font-medium min-h-[36px] flex items-center shrink-0 transition-colors ${active ? 'bg-navy text-white' : 'bg-gray-100 text-gray-600'}`}
            >
              {page.label}
            </Link>
          )
        })}
      </div>
    </div>
  )
}
