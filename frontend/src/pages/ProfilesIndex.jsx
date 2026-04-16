/**
 * ProfilesIndex.jsx
 * Internal index of all registered client profiles.
 * Route: /profiles (rendered inside main Layout)
 *
 * Visually identical to the main app — uses ONLY shared UI primitives
 * from src/components/ui.
 */

import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Mail } from 'lucide-react'
import { PageHeader, Card, AccentCard, Badge } from '../components/ui'

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
  },
]

const archetypeLabel = {
  'use-case': 'Use-Case Buyer',
  'brand-owner': 'Brand Owner',
  'regional': 'Regional Producer',
}

const archetypeVariant = {
  'use-case': 'blue',
  'brand-owner': 'green',
  'regional': 'gold',
}

export default function ProfilesIndex() {
  return (
    <div className="max-w-7xl mx-auto">
      <PageHeader
        title="Client Profiles"
        subtitle="Each profile is a personalised lens over Liquid Economy’s full category intelligence. Curated for a specific client, archetype, and scope — linking through to the underlying data at every point."
        breadcrumbs={[
          { label: 'Dashboard', to: '/' },
          { label: 'Client Profiles' },
        ]}
      />

      {/* Archetype legend */}
      <div className="flex flex-wrap gap-2 mb-6">
        {Object.entries(archetypeLabel).map(([key, label]) => (
          <Badge key={key} variant={archetypeVariant[key]} size="lg">{label}</Badge>
        ))}
      </div>

      {/* Profile cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
        {PROFILES.map((p) => (
          <Link key={p.slug} to={`/p/${p.slug}`} className="no-underline">
            <Card padding="p-5" hover className="h-full flex flex-col">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h2 className="text-subsection font-display text-navy">{p.name}</h2>
                  <p className="text-caption text-gray-500 mt-0.5">{p.title}</p>
                </div>
                <Badge variant={archetypeVariant[p.archetype]}>
                  {archetypeLabel[p.archetype]}
                </Badge>
              </div>
              <p className="text-caption text-gray-700 leading-relaxed mb-4 flex-1">{p.subtitle}</p>
              <div className="flex flex-wrap gap-1.5 mb-3">
                {p.categories.map((c) => (
                  <Badge key={c} variant="default">{c}</Badge>
                ))}
              </div>
              <div className="flex items-center justify-between text-caption text-gray-500 mb-3">
                <span>{p.markets.join(' · ')}</span>
                <span>Updated {p.updated}</span>
              </div>
              <div className="text-caption font-semibold text-editorial hover:text-navy flex items-center gap-1 transition-colors">
                Open profile
                <ArrowRight size={12} />
              </div>
            </Card>
          </Link>
        ))}

        {/* Request a profile */}
        <AccentCard padding="p-5" className="flex flex-col justify-center">
          <p className="text-subsection font-display text-navy mb-2">Need a profile for your brand or use case?</p>
          <p className="text-caption text-gray-700 mb-3 leading-relaxed">Custom profiles built around a specific archetype, market or category brief.</p>
          <a
            href="mailto:callingjhphoto@gmail.com?subject=Liquid%20Economy%20%E2%80%94%20Profile%20Request"
            className="text-caption font-semibold text-editorial hover:text-navy transition-colors flex items-center gap-1 no-underline"
          >
            <Mail size={12} />
            Request a custom profile
            <ArrowRight size={12} />
          </a>
        </AccentCard>
      </div>

      <div className="mt-10 border-t border-gray-200 pt-6 text-center">
        <p className="text-caption text-gray-400">Powered by Liquid Agency · Drinks Industry Intelligence</p>
      </div>
    </div>
  )
}
