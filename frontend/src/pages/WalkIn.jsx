import React from 'react'
import { useParams, useLocation, Link } from 'react-router-dom'
import { DOSSIER_MANIFEST, getDossierEntry } from '../data/dossiers/index.js'
import { FLAGSHIP_CONFIG } from '../data/dossiers/flagshipConfig.js'
import { LeftOnTheTable } from '../components/dossier/LeftOnTheTable'
import { ChevronRight, ArrowRight } from 'lucide-react'

/**
 * WalkIn — /walk-in/:slug
 * Demo cold-open. Full-viewport on lg:.
 * Chrome CONDITIONAL: suppressed in-app (fromApp nav state), minimal 36px bar cold-nav.
 * Slug can be a group (campari-group) or brand (campari-group_aperol).
 */
function slugToName(s) {
  if (!s) return ''
  return s.split(/[_-]/).map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
}

export default function WalkIn() {
  const { slug } = useParams()
  const location = useLocation()

  const isInApp = !!location.state?.fromApp
  const showChromeBar = !isInApp

  const entry = getDossierEntry(slug)

  const isGroup = entry?.type === 'group'
  const isBrand = entry?.type === 'brand'

  // For groups: find the flagship brand in this group
  let effectiveBrandSlug = isBrand ? slug : null
  if (isGroup) {
    // Look for a flagship brand in this group
    const flagshipInGroup = DOSSIER_MANIFEST.find(
      e => e.type === 'brand' && e.group === slug && e.dossierTier === 'flagship'
    )
    if (flagshipInGroup) {
      effectiveBrandSlug = flagshipInGroup.slug
    } else {
      // Fall back to first brand in group
      const firstBrand = DOSSIER_MANIFEST.find(e => e.type === 'brand' && e.group === slug)
      effectiveBrandSlug = firstBrand?.slug || null
    }
  }

  const effectiveFlagshipCfg = effectiveBrandSlug ? FLAGSHIP_CONFIG[effectiveBrandSlug] : null
  const effectiveFlagshipEntry = effectiveBrandSlug ? getDossierEntry(effectiveBrandSlug) : null

  // Names
  const brandName = effectiveBrandSlug
    ? effectiveBrandSlug.split('_').slice(1).join(' ')
        .split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
    : slugToName(slug)

  const groupName = isGroup
    ? slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
    : (entry?.group
        ? entry.group.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
        : '')

  const dossierTier = effectiveFlagshipCfg ? 'flagship' : 'standard'

  const relatedDossierChips = effectiveFlagshipCfg?.relatedDossiers
    ? effectiveFlagshipCfg.relatedDossiers.map(rel => ({
        slug: rel,
        label: rel === 'marketing' ? 'Marketing thesis'
          : rel.startsWith('group/') ? (groupName || 'Group') + ' dossier'
          : slugToName(rel),
      }))
    : []

  const synthesisProse = effectiveFlagshipEntry?.synthesisProse || entry?.synthesisProse || ''

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

      {/* Main content */}
      <div className="flex-1 px-4 lg:px-8 py-8 lg:py-10 max-w-5xl mx-auto w-full">
        {/* Group context + drill link */}
        {isGroup && effectiveBrandSlug && (
          <div className="mb-5 flex items-center gap-2 text-small text-gray-500">
            <span className="font-medium text-navy">{groupName}</span>
            <ChevronRight size={12} />
            <Link
              to={`/brand/${effectiveBrandSlug}`}
              state={{ fromApp: true }}
              className="text-editorial font-medium hover:text-navy transition-colors flex items-center gap-1"
            >
              Drill into {brandName}
              <ArrowRight size={12} />
            </Link>
          </div>
        )}

        {effectiveFlagshipCfg ? (
          <LeftOnTheTable
            brandName={brandName}
            groupName={groupName || 'Campari Group'}
            heroFindings={effectiveFlagshipCfg.heroFindings || []}
            brandSlug={effectiveBrandSlug || slug}
            relatedDossiers={relatedDossierChips}
            dossierTier="flagship"
          />
        ) : (
          <div className="py-12 text-center max-w-xl mx-auto">
            <p className="font-display text-section text-navy mb-3">
              {entry ? `${slugToName(slug)}` : 'Walk-in not found'}
            </p>
            {synthesisProse && (
              <p className="text-body text-gray-600 mb-6 leading-relaxed">{synthesisProse.slice(0, 250)}</p>
            )}
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="mailto:james@huertas.co.uk?subject=Full Analysis Request"
                className="inline-flex items-center gap-2 bg-navy text-white text-sm font-medium px-4 py-2.5 rounded-lg hover:bg-navy-light transition-colors"
              >
                Request full analysis
                <ArrowRight size={14} />
              </a>
              <Link
                to="/walk-in/campari-group"
                state={{ fromApp: true }}
                className="inline-flex items-center gap-2 border border-navy/20 text-navy text-sm font-medium px-4 py-2.5 rounded-lg hover:bg-navy/5 transition-colors"
              >
                See a flagship example
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
