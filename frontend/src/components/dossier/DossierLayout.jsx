import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ChevronRight, ExternalLink, ArrowRight } from 'lucide-react'
import { MarkdownSection } from './MarkdownSection'
import { CredibilityChip } from './CredibilityChip'

/**
 * DossierLayout
 * Shared layout for GroupDossier, BrandDossier, CategoryDossier, /marketing.
 * Renders: breadcrumb, hero, cross-link chip row, markdown sections, relatedTools footer.
 *
 * Props:
 *   entry         --  manifest entry (from DOSSIER_MANIFEST)
 *   content       --  full markdown content string
 *   title         --  display title override
 *   subtitle      --  subtitle / tagline
 *   breadcrumbs   --  [{label, to?}]
 *   crossLinks    --  [{slug, label, type}] for chip row
 *   relatedTools  --  [{label, href}]
 *   children      --  hero content (renders above markdown)
 *   isColdNav     --  bool: if true, show minimal chrome bar
 */
export function DossierLayout({
  entry,
  content = '',
  title,
  subtitle,
  breadcrumbs = [],
  crossLinks = [],
  relatedTools = [],
  children,
  isColdNav = false,
}) {
  const displayTitle = title || entry?.slug || 'Dossier'
  const tier = entry?.dossierTier || 'standard'

  return (
    <div className="min-h-full">
      {/* Minimal chrome bar for cold-nav (forwarded links) */}
      {isColdNav && (
        <div
          className="sticky top-0 z-20 bg-navy text-white flex items-center justify-between px-4 lg:px-8"
          style={{ height: 'var(--chrome-h, 36px)' }}
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

      <div className="max-w-4xl mx-auto px-4 lg:px-0 pb-16">
        {/* Breadcrumb */}
        {breadcrumbs.length > 0 && (
          <nav className="hidden lg:flex items-center gap-1.5 text-[12px] text-gray-500 mb-6 mt-2">
            {breadcrumbs.map((crumb, i) => (
              <React.Fragment key={i}>
                {i > 0 && <ChevronRight size={10} className="text-gray-300" />}
                {crumb.to ? (
                  <Link to={crumb.to} className="hover:text-navy transition-colors truncate max-w-[120px]">
                    {crumb.label}
                  </Link>
                ) : (
                  <span className={i === breadcrumbs.length - 1 ? 'text-navy font-medium truncate' : 'truncate'}>
                    {crumb.label}
                  </span>
                )}
              </React.Fragment>
            ))}
          </nav>
        )}

        {/* Hero band */}
        <div className="mb-8">
          <div className="flex items-start justify-between gap-4 mb-2">
            <div>
              <h1 className="font-display text-page text-navy leading-tight">{displayTitle}</h1>
              {subtitle && (
                <p className="text-body text-gray-500 mt-1">{subtitle}</p>
              )}
            </div>
            {entry && (
              <div className="flex items-center gap-2 shrink-0">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-gray-400">
                  {entry.type}
                </span>
                {entry.synthesisVerifiedSourceCount > 0 && (
                  <CredibilityChip
                    level={entry.synthesisVerifiedSourceCount >= 2 ? 'HIGH' : 'MEDIUM'}
                    count={entry.synthesisVerifiedSourceCount}
                    domains={entry.realDomains || []}
                  />
                )}
              </div>
            )}
          </div>

          {/* Gold rule */}
          <div className="w-12 h-0.5 bg-gold mt-3 mb-6" />
        </div>

        {/* Hero content slot */}
        {children}

        {/* Cross-link chip row */}
        {crossLinks.length > 0 && (
          <div className="mb-8">
            <p className="text-label text-gray-400 mb-2 uppercase tracking-wider">Related intelligence</p>
            <div className="flex flex-wrap gap-2">
              {crossLinks.map((link, i) => (
                <CrossLinkChip key={i} {...link} />
              ))}
            </div>
          </div>
        )}

        {/* Standard tier: prose synthesis + CTA */}
        {tier === 'standard' && entry?.synthesisProse && (
          <div className="mb-8 p-5 bg-navy/5 rounded-bento border border-navy/10">
            <p className="text-label text-gray-400 mb-3 uppercase tracking-wider">Research summary</p>
            <p className="text-body text-gray-700 leading-relaxed">{entry.synthesisProse}</p>
            <div className="mt-4 flex flex-wrap gap-3">
              <a
                href="mailto:james@huertas.co.uk?subject=Full Analysis Request"
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

        {/* Full markdown content */}
        {content && (
          <div className="mb-8">
            <MarkdownSection content={content} />
          </div>
        )}

        {/* relatedTools deep-link footer */}
        {relatedTools.length > 0 && (
          <div className="mt-10 pt-6 border-t border-gray-100">
            <p className="text-label text-gray-400 mb-3 uppercase tracking-wider">Platform tools</p>
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
    </div>
  )
}

function CrossLinkChip({ slug, label, type = 'brand' }) {
  const routeMap = {
    brand: `/brand/${slug}`,
    group: `/group/${slug}`,
    category: `/category/${slug}/dossier`,
    marketing: '/marketing',
  }
  const to = routeMap[type] || `/brand/${slug}`

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
