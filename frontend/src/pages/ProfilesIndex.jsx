/**
 * ProfilesIndex.jsx
 * Internal index of all registered client profiles.
 * Route: /profiles  (rendered inside main Layout)
 */

import React from 'react'
import { Link } from 'react-router-dom'

const PROFILES = [
  {
    slug: 'khorus-cocktails',
    name: 'Khorus',
    title: 'Cocktail Intelligence Profile',
    archetype: 'use-case',
    subtitle: 'Global ranking, flavour trends, luxury event intel for luxury events programming',
    markets: ['UK', 'UAE', 'USA', 'France'],
    categories: ['Cocktails', 'Spirits', 'Liqueurs'],
    updated: 'April 2026',
    tintIdx: 2, // blue
  },
  {
    slug: 'eden-mill',
    name: 'Eden Mill',
    title: 'Gin and Whisky Intelligence Profile',
    archetype: 'brand-owner',
    subtitle: 'Category snapshot, competitor watch, three commercial narratives for media reallocation',
    markets: ['UK', 'Japan', 'Germany'],
    categories: ['Gin', 'Scotch Whisky'],
    updated: 'April 2026',
    tintIdx: 1, // emerald
  },
]

const archetypeLabel = {
  'use-case': 'Use-Case Buyer',
  'brand-owner': 'Brand Owner',
  'regional': 'Regional Producer',
}

const archetypeChipClass = {
  'use-case': 'bg-blue-50 text-blue-700',
  'brand-owner': 'bg-emerald-50 text-emerald-700',
  'regional': 'bg-amber-50 text-amber-700',
}

export default function ProfilesIndex() {
  return (
    <div className="text-navy font-body">
      {/* Navy editorial hero */}
      <div className="bg-navy rounded-bento overflow-hidden shadow-sm mb-10">
        <div className="px-6 py-7 sm:px-8 sm:py-8">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-label text-gold uppercase tracking-wider">Liquid Economy</span>
            <span className="text-gray-400">/</span>
            <span className="text-label text-gray-300 uppercase tracking-wider">Client Profiles</span>
          </div>
          <h1 className="text-page font-display text-white leading-tight">Client Profiles</h1>
          <p className="text-body text-gray-300 mt-2 max-w-2xl leading-relaxed">
            Each profile is a personalised lens over Liquid Economy\u2019s full category intelligence. Curated for a specific client, archetype, and scope \u2014 linking through to the underlying data at every point.
          </p>
        </div>
      </div>

      {/* Archetype legend */}
      <div className="flex flex-wrap gap-2 mb-6">
        {Object.entries(archetypeLabel).map(([key, label]) => (
          <span
            key={key}
            className={`inline-flex items-center gap-1.5 text-caption font-medium px-2.5 py-1 rounded-full ${archetypeChipClass[key]}`}
          >
            {label}
          </span>
        ))}
      </div>

      {/* Profile cards \u2014 main-app bento grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {PROFILES.map((p) => (
          <Link
            key={p.slug}
            to={`/p/${p.slug}`}
            className="group block bg-white border border-gray-200 rounded-bento p-6 shadow-sm hover:shadow-md hover:border-gold/40 transition-all"
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <h2 className="text-subsection font-display text-navy group-hover:text-editorial transition-colors">{p.name}</h2>
                <p className="text-caption text-gray-600 mt-0.5">{p.title}</p>
              </div>
              <span
                className={`text-caption font-medium px-2 py-0.5 rounded-full shrink-0 ml-3 ${archetypeChipClass[p.archetype]}`}
              >
                {archetypeLabel[p.archetype]}
              </span>
            </div>
            <p className="text-caption text-gray-700 leading-relaxed mb-4">{p.subtitle}</p>
            <div className="flex flex-wrap gap-1.5 mb-3">
              {p.categories.map((c) => (
                <span key={c} className="text-caption bg-gray-50 border border-gray-200 text-gray-700 px-2 py-0.5 rounded">{c}</span>
              ))}
            </div>
            <div className="flex items-center justify-between text-caption text-gray-500">
              <span>{p.markets.join(' \u00b7 ')}</span>
              <span>Updated {p.updated}</span>
            </div>
            <div className="mt-3 text-caption font-semibold text-editorial group-hover:text-navy transition-colors">
              Open profile \u2192
            </div>
          </Link>
        ))}

        {/* Request a profile \u2014 muted bento card matching main-app palette */}
        <div className="bg-amber-50 border border-amber-100 rounded-bento p-6 flex flex-col justify-center">
          <p className="text-subsection font-display text-navy mb-2">Need a profile for your brand or use case?</p>
          <p className="text-caption text-gray-700 mb-3 leading-relaxed">Custom profiles built around a specific archetype, market or category brief.</p>
          <a
            href="mailto:callingjhphoto@gmail.com?subject=Liquid%20Economy%20%E2%80%94%20Profile%20Request"
            className="text-caption font-semibold text-editorial hover:text-navy transition-colors"
          >
            Request a custom profile \u2192
          </a>
        </div>
      </div>

      <div className="mt-10 border-t border-gray-200 pt-6 text-center">
        <p className="text-caption text-gray-400">Powered by Liquid Agency \u00b7 Drinks Industry Intelligence</p>
      </div>
    </div>
  )
}
