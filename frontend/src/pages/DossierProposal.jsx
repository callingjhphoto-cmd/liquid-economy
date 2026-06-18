import React from 'react'
import { useParams, useLocation, Link } from 'react-router-dom'
import { getDossierEntry } from '../data/dossiers/index.js'
import { FLAGSHIP_CONFIG } from '../data/dossiers/flagshipConfig.js'
import { EngagementProposal } from '../components/dossier/EngagementProposal'
import { ArrowRight } from 'lucide-react'

/**
 * DossierProposal — /proposal/:slug
 * THE PAYOFF screen. Brand-locked engagement proposal.
 * Chrome CONDITIONAL: suppressed in-app, minimal bar cold-nav.
 */
export default function DossierProposal() {
  const { slug } = useParams()
  const location = useLocation()
  const isInApp = !!location.state?.fromApp
  const showChromeBar = !isInApp

  const entry = getDossierEntry(slug)
  const flagshipCfg = FLAGSHIP_CONFIG[slug]

  const brandName = slug
    ? slug.split('_').slice(1).join(' ')
        .split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
    : 'Brand'
  const groupName = entry?.group
    ? entry.group.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
    : ''

  if (!entry || !flagshipCfg) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <p className="font-display text-section text-navy mb-3">Proposal not available</p>
        <p className="text-body text-gray-500 mb-6">
          A full engagement proposal for "{brandName}" is not yet authored.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to={`/brand/${slug}`}
            className="inline-flex items-center gap-2 bg-navy text-white text-sm font-medium px-4 py-2.5 rounded-lg hover:bg-navy-light transition-colors"
          >
            View brand dossier
            <ArrowRight size={14} />
          </Link>
          <Link
            to="/proposal/campari-group_aperol"
            className="inline-flex items-center gap-2 border border-navy/20 text-navy text-sm font-medium px-4 py-2.5 rounded-lg hover:bg-navy/5 transition-colors"
          >
            See a flagship proposal (Aperol)
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div style={{ minHeight: 'calc(100dvh - var(--chrome-h, 0px))' }} className="flex flex-col">
      {/* Conditional chrome bar */}
      {showChromeBar && (
        <div
          className="shrink-0 bg-navy text-white flex items-center justify-between px-4 lg:px-8"
          style={{ height: '36px', '--chrome-h': '36px' }}
        >
          <Link to="/" className="font-display text-white text-sm font-semibold tracking-wide">
            Liquid Economy
          </Link>
          <Link
            to="/"
            className="text-white/70 hover:text-white text-xs font-medium flex items-center gap-1 transition-colors"
          >
            Explore the platform
            <ArrowRight size={12} />
          </Link>
        </div>
      )}

      <div className="flex-1 px-4 lg:px-8 py-8 lg:py-10 max-w-4xl mx-auto w-full">
        <EngagementProposal
          brandName={brandName}
          groupName={groupName}
          brandSlug={slug}
          heroFindings={flagshipCfg.heroFindings || []}
          tiers={flagshipCfg.tiers || []}
          relatedTools={flagshipCfg.relatedTools || []}
        />
      </div>
    </div>
  )
}
