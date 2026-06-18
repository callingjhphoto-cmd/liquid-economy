import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, ExternalLink } from 'lucide-react'
import { CredibilityChip } from './CredibilityChip'

/**
 * LeftOnTheTable
 * THE HOOK screen. Renders the flagship brand's "left on the table" findings.
 *
 * Props:
 *   brandName    — display name (e.g. "Aperol")
 *   groupName    — display name for parent group (e.g. "Campari Group")
 *   heroFindings — array from flagshipConfig / manifest
 *   brandSlug    — e.g. 'campari-group_aperol' (for proposal CTA)
 *   relatedDossiers — [{slug, label}] for cross-links
 *   dossierTier  — 'flagship' | 'standard'
 *   synthesisProse — fallback prose for standard tier
 *   requestAnalysisHref — mailto CTA for standard tier
 */
export function LeftOnTheTable({
  brandName = 'Aperol',
  groupName = 'Campari Group',
  heroFindings = [],
  brandSlug = 'campari-group_aperol',
  relatedDossiers = [],
  dossierTier = 'flagship',
  synthesisProse = '',
  requestAnalysisHref = 'mailto:james@huertas.co.uk?subject=Full Analysis Request',
}) {
  const isFlagship = dossierTier === 'flagship'

  return (
    <div className="mb-10">
      {/* Headline band */}
      <div className="mb-6">
        <p className="text-label text-gray-400 uppercase tracking-widest mb-2">
          {groupName}
        </p>
        <h2 className="font-display text-[28px] lg:text-[36px] text-navy leading-tight">
          What {brandName} left on the table
        </h2>
        <div className="w-10 h-0.5 bg-gold mt-3" />
      </div>

      {isFlagship ? (
        <>
          {/* Finding cards — 1 col mobile, 2-3 col lg */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-8">
            {heroFindings.map((finding, i) => (
              <FindingCard key={i} finding={finding} index={i} brandSlug={brandSlug} />
            ))}
          </div>

          {/* Cross-link chips for relatedDossiers */}
          {relatedDossiers.length > 0 && (
            <div className="mb-6">
              <p className="text-label text-gray-400 uppercase tracking-wider mb-2">Also relevant</p>
              <div className="flex flex-wrap gap-2">
                {relatedDossiers.map((rel, i) => (
                  <RelatedChip key={i} slug={rel.slug || rel} label={rel.label || rel} />
                ))}
              </div>
            </div>
          )}

          {/* CTA */}
          <Link
            to={`/proposal/${brandSlug}`}
            className="inline-flex items-center gap-2 bg-navy text-white font-semibold px-6 py-3 rounded-xl hover:bg-navy-light transition-colors text-sm"
          >
            So this is the work
            <ArrowRight size={16} />
          </Link>
        </>
      ) : (
        /* Standard tier: prose + request CTA + flagship pointer */
        <div className="p-6 bg-navy/5 rounded-bento border border-navy/10">
          <p className="text-label text-gray-400 uppercase tracking-wider mb-3">Research summary</p>
          <p className="text-body text-gray-700 leading-relaxed mb-5">{synthesisProse || 'Strategic intelligence available on request.'}</p>
          <div className="flex flex-wrap gap-3">
            <a
              href={requestAnalysisHref}
              className="inline-flex items-center gap-2 bg-navy text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-navy-light transition-colors"
            >
              Request full analysis
              <ArrowRight size={14} />
            </a>
            <Link
              to="/brand/campari-group_aperol"
              className="inline-flex items-center gap-2 border border-navy/20 text-navy text-sm font-medium px-4 py-2 rounded-lg hover:bg-navy/5 transition-colors"
            >
              See a flagship example
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}

function FindingCard({ finding, index, brandSlug }) {
  const {
    headline = '',
    body = '',
    dollarChip,
    dollarUnit = '',
    derivationBasis = '',
    confidenceLevel = 'MEDIUM',
    confidenceBasis = [],
    synthesisVerifiedSourceCount = 0,
    relatedDossiers = [],
  } = finding

  return (
    <div className="bg-white border border-gray-200 rounded-bento p-5 flex flex-col gap-3 hover:shadow-sm transition-shadow">
      {/* Dollar figure — gold, prominent */}
      {dollarChip && (
        <div className="flex items-baseline gap-2">
          <span className="font-display text-[22px] text-gold font-bold leading-none">
            {dollarChip}
          </span>
          {dollarUnit && (
            <span className="text-[11px] text-gray-400 leading-tight max-w-[120px]">{dollarUnit}</span>
          )}
        </div>
      )}

      {/* Headline */}
      <p className="text-body font-semibold text-navy leading-snug">{headline}</p>

      {/* Body */}
      {body && (
        <p className="text-small text-gray-600 leading-relaxed">{body}</p>
      )}

      {/* Derivation basis — always visible, self-verifying */}
      {derivationBasis && (
        <p className="text-[11px] text-gray-400 italic leading-snug border-t border-gray-100 pt-2">
          {derivationBasis}
        </p>
      )}

      {/* Footer: confidence chip + related chips */}
      <div className="flex flex-wrap items-center gap-2 mt-auto pt-2">
        <CredibilityChip
          level={confidenceLevel}
          count={synthesisVerifiedSourceCount}
          domains={confidenceBasis}
        />
        {relatedDossiers.map((rel, i) => (
          <SmallRelatedChip key={i} slug={rel} />
        ))}
      </div>
    </div>
  )
}

function SmallRelatedChip({ slug }) {
  const labelMap = {
    'marketing': 'Marketing thesis',
    'group/campari-group': 'Campari Group',
    'campari-group_aperol': 'Aperol',
    'pernod-ricard_lillet': 'Lillet',
    'bacardi_havana-club': 'Havana Club',
  }
  const routeMap = {
    'marketing': '/marketing',
    'group/campari-group': '/group/campari-group',
  }
  const label = labelMap[slug] || slug
  const to = routeMap[slug] || (slug.includes('/') ? `/${slug}` : `/brand/${slug}`)

  return (
    <Link
      to={to}
      className="inline-flex items-center gap-1 text-[10px] text-gray-400 border border-gray-200 px-2 py-0.5 rounded-full hover:text-navy hover:border-navy/30 transition-colors"
    >
      {label}
      <ExternalLink size={9} />
    </Link>
  )
}

function RelatedChip({ slug, label }) {
  const routeMap = {
    'marketing': '/marketing',
    'group/campari-group': '/group/campari-group',
  }
  const to = routeMap[slug] || (slug.startsWith('group/') ? `/${slug}` : `/brand/${slug}`)

  return (
    <Link
      to={to}
      className="inline-flex items-center gap-1.5 text-[12px] font-medium text-navy border border-navy/25 bg-white px-3 py-1.5 rounded-full hover:bg-navy hover:text-white transition-all"
    >
      {label}
      <ArrowRight size={11} />
    </Link>
  )
}
