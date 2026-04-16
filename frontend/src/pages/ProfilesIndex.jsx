/**
 * ProfilesIndex.jsx
 * Internal index of all registered client profiles.
 * Route: /profiles
 * Internal-only for now \u2014 not in main nav.
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
    colour: '#2B6CB0',
  },
  {
    slug: 'eden-mill',
    name: 'Eden Mill',
    title: 'Gin & Whisky Intelligence Profile',
    archetype: 'brand-owner',
    subtitle: 'Category snapshot, competitor watch, three commercial narratives for media reallocation',
    markets: ['UK', 'Japan', 'Germany'],
    categories: ['Gin', 'Scotch Whisky'],
    updated: 'April 2026',
    colour: '#38A169',
  },
]

const archetypeLabel = {
  'use-case': 'Use-Case Buyer',
  'brand-owner': 'Brand Owner',
  'regional': 'Regional Producer',
}

const archetypeColour = {
  'use-case': '#2B6CB0',
  'brand-owner': '#38A169',
  'regional': '#C9A96E',
}

export default function ProfilesIndex() {
  return (
    <div className="min-h-screen bg-surface text-navy font-body">
      {/* Navy editorial hero */}
      <div className="bg-navy">
        <div className="max-w-4xl mx-auto px-4 py-10">
          <div className="flex items-center gap-2 mb-3">
            <Link to="/" className="text-label text-gold uppercase tracking-wider hover:text-gold-light transition-colors">
              Liquid Economy
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-label text-gray-300 uppercase tracking-wider">Client Profiles</span>
          </div>
          <h1 className="text-page font-display text-white mb-2">Client Profiles</h1>
          <p className="text-body text-gray-300 max-w-xl leading-relaxed">
            Each profile is a personalised lens over Liquid Economy\u2019s full category intelligence. Curated for a specific client, archetype, and scope \u2014 linking through to the underlying data at every point.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-10">
        {/* Archetype legend */}
        <div className="flex flex-wrap gap-3 mb-8">
          {Object.entries(archetypeLabel).map(([key, label]) => (
            <span
              key={key}
              className="inline-flex items-center gap-1.5 text-caption font-medium px-2.5 py-1 rounded-full"
              style={{ background: archetypeColour[key] + '18', color: archetypeColour[key], border: `1px solid ${archetypeColour[key]}40` }}
            >
              {label}
            </span>
          ))}
        </div>

        {/* Profile cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {PROFILES.map((p) => (
            <Link
              key={p.slug}
              to={`/p/${p.slug}`}
              className="block bg-white border border-gray-200 rounded-bento p-6 shadow-sm hover:shadow-md hover:border-gold transition-all group"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h2 className="text-subsection font-display text-navy group-hover:text-editorial transition-colors">{p.name}</h2>
                  <p className="text-caption text-gray-600 mt-0.5">{p.title}</p>
                </div>
                <span
                  className="text-caption font-medium px-2 py-0.5 rounded-full shrink-0 ml-3"
                  style={{ background: archetypeColour[p.archetype] + '18', color: archetypeColour[p.archetype], border: `1px solid ${archetypeColour[p.archetype]}40` }}
                >
                  {archetypeLabel[p.archetype]}
                </span>
              </div>
              <p className="text-caption text-gray-700 leading-relaxed mb-4">{p.subtitle}</p>
              <div className="flex flex-wrap gap-1.5 mb-3">
                {p.categories.map((c) => (
                  <span key={c} className="text-caption bg-surface border border-gray-200 text-gray-700 px-2 py-0.5 rounded">{c}</span>
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
        </div>

        {/* Request a profile */}
        <div className="mt-10 p-6 bg-white border border-gray-200 rounded-bento shadow-sm text-center">
          <p className="text-body text-navy font-display mb-2">Need a profile for your brand or use case?</p>
          <a
            href="mailto:callingjhphoto@gmail.com?subject=Liquid%20Economy%20%E2%80%94%20Profile%20Request"
            className="text-body font-medium text-editorial hover:text-navy transition-colors"
          >
            Request a custom profile \u2192
          </a>
        </div>

        <div className="mt-8 text-center">
          <Link to="/" className="text-caption text-gray-500 hover:text-navy transition-colors">
            \u2190 Back to Liquid Economy dashboard
          </Link>
        </div>

        <div className="mt-10 border-t border-gray-200 pt-6 text-center">
          <p className="text-caption text-gray-400">Powered by Liquid Agency \u00b7 Drinks Industry Intelligence</p>
        </div>
      </div>
    </div>
  )
}
