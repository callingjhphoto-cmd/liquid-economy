import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, ExternalLink, ChevronRight } from 'lucide-react'
import { CredibilityChip } from './CredibilityChip'

/**
 * EngagementProposal  --  THE PAYOFF screen.
 * Two-column on lg: (findings LEFT / tiers RIGHT). Below lg: findings-then-tiers vertical stack.
 * Each tier price maps to its finding via roiRatioLabel (authored string, never computed).
 * "Structural shift" framing: lead with shared category context, not "you missed this".
 *
 * Props:
 *   brandName      --  "Aperol"
 *   groupName      --  "Campari Group"
 *   brandSlug      --  'campari-group_aperol'
 *   heroFindings   --  from flagshipConfig
 *   tiers          --  from flagshipConfig
 *   relatedTools   --  [{label, href}]
 */
export function EngagementProposal({
  brandName = 'Aperol',
  groupName = 'Campari Group',
  brandSlug = 'campari-group_aperol',
  heroFindings = [],
  tiers = [],
  relatedTools = [],
}) {
  return (
    <div className="mb-10">
      {/* Headline */}
      <div className="mb-8">
        <p className="text-label text-gray-400 uppercase tracking-widest mb-2">{groupName}</p>
        <h2 className="font-display text-[26px] lg:text-[32px] text-navy leading-tight">
          A structural shift we can move on together
        </h2>
        <div className="w-10 h-0.5 bg-gold mt-3 mb-4" />
        <p className="text-body text-gray-600 max-w-2xl">
          The aperitif category is reshaping global drinking occasions faster than most brand strategies have adjusted.
          Below are three specific points where we can create measurable value for {brandName} -- each mapped to a
          scoped engagement.
        </p>
      </div>

      {/* Two-column layout: findings LEFT, tiers RIGHT */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
        {/* Left: condensed findings */}
        <div>
          <p className="text-label text-gray-400 uppercase tracking-wider mb-4">The three findings</p>
          <div className="space-y-4">
            {heroFindings.map((finding, i) => (
              <CondensedFinding key={i} finding={finding} index={i} />
            ))}
          </div>

          <Link
            to={`/brand/${brandSlug}`}
            className="inline-flex items-center gap-1.5 text-small text-navy hover:text-editorial mt-4 transition-colors"
          >
            <ChevronRight size={13} />
            Full brand dossier
          </Link>
        </div>

        {/* Right: engagement tiers */}
        <div>
          <p className="text-label text-gray-400 uppercase tracking-wider mb-4">Engagement tiers</p>
          <div className="space-y-4">
            {tiers.map((tier, i) => (
              <TierCard key={i} tier={tier} finding={heroFindings[tier.mappedFindingIndex]} />
            ))}
          </div>
        </div>
      </div>

      {/* CTA block */}
      <div className="bg-navy rounded-bento p-6 text-white">
        <p className="font-display text-subsection mb-2">Ready to begin?</p>
        <p className="text-white/70 text-body mb-4 max-w-xl">
          We tailor the scope to your immediate priorities. Start with Tier 1 and expand as findings compound.
        </p>
        <a
          href="mailto:james@huertas.co.uk?subject=Liquid Economy Proposal - Aperol"
          className="inline-flex items-center gap-2 bg-gold text-navy font-semibold px-5 py-2.5 rounded-lg hover:bg-gold-light transition-colors text-sm"
        >
          Start the conversation
          <ArrowRight size={14} />
        </a>
      </div>

      {/* relatedTools footer */}
      {relatedTools.length > 0 && (
        <div className="mt-8 pt-5 border-t border-gray-100">
          <p className="text-label text-gray-400 mb-3 uppercase tracking-wider">Platform tools for this brand</p>
          <div className="flex flex-wrap gap-3">
            {relatedTools.map((tool, i) => (
              <Link
                key={i}
                to={tool.href}
                className="inline-flex items-center gap-1.5 text-sm text-navy border border-navy/20 px-3 py-1.5 rounded-lg hover:bg-navy/5 transition-colors"
              >
                {tool.label}
                <ExternalLink size={12} className="opacity-50" />
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

function CondensedFinding({ finding, index }) {
  const {
    headline = '',
    dollarChip,
    derivationBasis = '',
    confidenceLevel = 'MEDIUM',
    confidenceBasis = [],
    synthesisVerifiedSourceCount = 0,
  } = finding

  return (
    <div className="flex gap-3 p-4 bg-gray-50 rounded-bento border border-gray-100">
      <div className="shrink-0 w-6 h-6 rounded-full bg-navy/10 flex items-center justify-center text-[11px] font-bold text-navy mt-0.5">
        {index + 1}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-small font-semibold text-navy leading-snug mb-1">{headline}</p>
        {dollarChip && (
          <span className="text-[13px] font-bold text-gold">{dollarChip}</span>
        )}
        {derivationBasis && (
          <p className="text-[10px] text-gray-400 italic mt-1 leading-snug">{derivationBasis}</p>
        )}
        <div className="mt-2">
          <CredibilityChip
            level={confidenceLevel}
            count={synthesisVerifiedSourceCount}
            domains={confidenceBasis}
          />
        </div>
      </div>
    </div>
  )
}

function TierCard({ tier, finding }) {
  const {
    tier: tierLabel = '',
    scope = '',
    priceGBP = 0,
    roiRatioLabel = '',
    roiNumerator = '',
  } = tier

  const formattedPrice = new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
    maximumFractionDigits: 0,
  }).format(priceGBP)

  return (
    <div className="bg-white border border-gray-200 rounded-bento p-5 hover:border-navy/30 transition-colors">
      <div className="flex items-start justify-between gap-3 mb-3">
        <span className="text-[11px] font-bold uppercase tracking-widest text-navy/50">{tierLabel}</span>
        <div className="text-right">
          <p className="font-display text-[22px] text-navy leading-none">{formattedPrice}</p>
          {roiNumerator && (
            <p className="text-[10px] text-gray-400 mt-0.5">{roiNumerator} opportunity</p>
          )}
        </div>
      </div>

      <p className="text-small font-medium text-navy mb-2">{scope}</p>

      {roiRatioLabel && (
        <p className="text-[11px] text-gold font-medium leading-snug mt-2 pt-2 border-t border-gray-100">
          {roiRatioLabel}
        </p>
      )}
    </div>
  )
}
