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
    colour: '#0ea5e9',
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
    colour: '#10b981',
  },
]

const archetypeLabel = {
  'use-case': 'Use-Case Buyer',
  'brand-owner': 'Brand Owner',
  'regional': 'Regional Producer',
}

const archetypeColour = {
  'use-case': '#0ea5e9',
  'brand-owner': '#10b981',
  'regional': '#a78bfa',
}

export default function ProfilesIndex() {
  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-100 px-4 py-12">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-3">
            <Link to="/" className="text-xs font-medium text-sky-400 uppercase tracking-wider hover:text-sky-300 transition-colors">
              Liquid Economy
            </Link>
            <span className="text-slate-600">/</span>
            <span className="text-xs text-slate-500">Client Profiles</span>
          </div>
          <h1 className="text-3xl font-bold text-slate-100 mb-2">Client Profiles</h1>
          <p className="text-slate-400 text-sm max-w-xl">
            Each profile is a personalised lens over Liquid Economy\u2019s full category intelligence. Curated for a specific client, archetype, and scope \u2014 linking through to the underlying data at every point.
          </p>
        </div>

        {/* Archetype legend */}
        <div className="flex flex-wrap gap-3 mb-8">
          {Object.entries(archetypeLabel).map(([key, label]) => (
            <span
              key={key}
              className="inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full"
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
              className="block bg-slate-800/60 border border-slate-700/50 rounded-xl p-6 hover:border-slate-600 hover:bg-slate-800/80 transition-all group"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h2 className="text-lg font-bold text-slate-100 group-hover:text-white transition-colors">{p.name}</h2>
                  <p className="text-xs text-slate-400 mt-0.5">{p.title}</p>
                </div>
                <span
                  className="text-xs font-medium px-2 py-0.5 rounded-full shrink-0 ml-3"
                  style={{ background: archetypeColour[p.archetype] + '18', color: archetypeColour[p.archetype], border: `1px solid ${archetypeColour[p.archetype]}40` }}
                >
                  {archetypeLabel[p.archetype]}
                </span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed mb-4">{p.subtitle}</p>
              <div className="flex flex-wrap gap-1.5 mb-3">
                {p.categories.map((c) => (
                  <span key={c} className="text-xs bg-slate-700/60 text-slate-300 px-2 py-0.5 rounded">{c}</span>
                ))}
              </div>
              <div className="flex items-center justify-between text-xs text-slate-500">
                <span>{p.markets.join(' \u00b7 ')}</span>
                <span>Updated {p.updated}</span>
              </div>
              <div className="mt-3 text-xs text-sky-400 group-hover:text-sky-300 transition-colors">
                Open profile \u2192
              </div>
            </Link>
          ))}
        </div>

        {/* Request a profile */}
        <div className="mt-10 p-6 bg-slate-800/40 border border-slate-700/30 rounded-xl text-center">
          <p className="text-sm text-slate-300 mb-2">Need a profile for your brand or use case?</p>
          <a
            href="mailto:callingjhphoto@gmail.com?subject=Liquid%20Economy%20%E2%80%94%20Profile%20Request"
            className="text-sm text-sky-400 hover:text-sky-300 transition-colors"
          >
            Request a custom profile \u2192
          </a>
        </div>

        <div className="mt-8 text-center">
          <Link to="/" className="text-xs text-slate-600 hover:text-slate-400 transition-colors">
            \u2190 Back to Liquid Economy dashboard
          </Link>
        </div>
      </div>
    </div>
  )
}
