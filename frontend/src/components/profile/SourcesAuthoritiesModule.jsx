/**
 * SourcesAuthoritiesModule.jsx
 * "Sources & Authorities" module for client profiles.
 * Renders 4-tier drinks intelligence source grid.
 * Uses ONLY shared UI primitives from src/components/ui.
 */

import React from 'react'
import { ExternalLink } from 'lucide-react'
import { Card, AccentCard, SectionHeader, Badge } from '../ui'

const TIER_CONFIG = {
  1: { label: 'Tier 1 — Global Syndicated Data', badgeVariant: 'gold', description: 'Enterprise syndicated research — $10k-200k/year. The sources every major producer cites in their annual report.' },
  2: { label: 'Tier 2 — Specialist Trade Press', badgeVariant: 'blue', description: 'Trade publishers and specialist databases covering regulatory, M&A and distribution intelligence.' },
  3: { label: 'Tier 3 — London Niche Specialists', badgeVariant: 'green', description: 'London-based consultancies with deep on-premise, luxury and consumer trend specialism.' },
  4: { label: 'Tier 4 — Academic & Regulatory', badgeVariant: 'default', description: 'Public health bodies, industry associations and academic institutions providing population-level benchmarks.' },
}

const ACCESS_LABELS = {
  paywall: 'Subscription',
  freemium: 'Free + paid',
  free: 'Open access',
}

function SourceCard({ source }) {
  const accessLabel = ACCESS_LABELS[source.access] || source.access

  return (
    <AccentCard padding="p-5">
      <div className="flex items-start justify-between mb-2">
        <div className="min-w-0 flex-1">
          <h3 className="text-subsection font-display text-navy leading-tight">{source.name}</h3>
          <p className="text-label text-gray-500 mt-0.5">{source.hq}</p>
        </div>
        <Badge variant="default" className="ml-2 flex-shrink-0 text-[10px]">{accessLabel}</Badge>
      </div>

      <p className="text-caption text-gray-700 mb-3 leading-relaxed">{source.focus}</p>

      {source.keyReports && source.keyReports.length > 0 && (
        <div className="mb-3">
          <p className="text-label text-gray-500 uppercase tracking-wider mb-1.5">Key reports</p>
          <div className="flex flex-wrap gap-1">
            {source.keyReports.map((r) => (
              <Badge key={r} variant="default">{r}</Badge>
            ))}
          </div>
        </div>
      )}

      <div className="border-t border-gray-100 pt-3 mt-3">
        <p className="text-caption text-gray-600 leading-relaxed italic mb-2">{source.credibility}</p>
        <div className="flex items-center justify-between">
          {source.subscription && (
            <span className="text-label text-gray-500">{source.subscription}</span>
          )}
          {source.url && (
            <a
              href={source.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-label text-editorial hover:text-navy transition-colors no-underline ml-auto"
            >
              Visit
              <ExternalLink size={10} />
            </a>
          )}
        </div>
      </div>
    </AccentCard>
  )
}

function TierSection({ tierNum, sources }) {
  const config = TIER_CONFIG[tierNum]
  if (!sources || sources.length === 0) return null

  return (
    <div className="mb-10">
      <div className="flex items-start gap-3 mb-2">
        <SectionHeader size="md">
          {config.label}
        </SectionHeader>
        <Badge variant={config.badgeVariant} className="mt-1 flex-shrink-0">{sources.length} sources</Badge>
      </div>
      <p className="text-caption text-gray-500 mb-4">{config.description}</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
        {sources.map((s) => (
          <SourceCard key={s.id} source={s} />
        ))}
      </div>
    </div>
  )
}

export default function SourcesAuthoritiesModule({ data }) {
  const sources = data?.sources || []
  const total = sources.length

  const byTier = {
    1: sources.filter((s) => s.tier === 1),
    2: sources.filter((s) => s.tier === 2),
    3: sources.filter((s) => s.tier === 3),
    4: sources.filter((s) => s.tier === 4),
  }

  return (
    <section id="module-sources-authorities">
      <SectionHeader
        size="lg"
        subtitle="Where Khorus intelligence comes from"
      >
        Sources &amp; Authorities
      </SectionHeader>

      <Card padding="p-5" className="mb-8 bg-navy/5 border-navy/10">
        <p className="text-body text-navy leading-relaxed">
          Aggregated from <span className="font-semibold">{total}+ authoritative sources</span> across global syndicated data, specialist trade press, niche London consultancies, and academic research. Every data point on this profile links to its primary source.
        </p>
        <p className="text-caption text-gray-500 mt-2">
          Data freshness: Q1 2026 &middot; Last sync: April 2026 &middot; Updated quarterly
        </p>
      </Card>

      <TierSection tierNum={1} sources={byTier[1]} />
      <TierSection tierNum={2} sources={byTier[2]} />
      <TierSection tierNum={3} sources={byTier[3]} />
      <TierSection tierNum={4} sources={byTier[4]} />
    </section>
  )
}
