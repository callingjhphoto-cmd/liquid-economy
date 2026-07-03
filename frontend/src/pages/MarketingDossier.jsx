import React, { useState, useEffect } from 'react'
import { useLocation, Link } from 'react-router-dom'
import { getDossierEntry } from '../data/dossiers/index.js'
import { MARKETING_RELATED_DOSSIERS } from '../data/dossiers/flagshipConfig.js'
import { DossierLayout } from '../components/dossier/DossierLayout'
import { MarkdownSection } from '../components/dossier/MarkdownSection'

/**
 * MarketingDossier — /marketing
 * Renders the Alcohol Marketing mega-dossier (Alcohol_Marketing_Dossier_20x.md).
 * Pinned as "Thesis" in the Intelligence nav group.
 * Outbound relatedDossiers chips: Aperol, Lillet, Havana Club (from flagshipConfig).
 */
export default function MarketingDossier() {
  const location = useLocation()
  const isColdNav = !location.state?.fromApp

  const entry = getDossierEntry('marketing')

  const [sections, setSections] = useState(null)
  const [loadError, setLoadError] = useState(false)

  useEffect(() => {
    setSections(null)
    setLoadError(false)
    import('../data/dossiers/content/marketing.js')
      .then(mod => setSections(mod.SECTIONS || []))
      .catch(() => setLoadError(true))
  }, [])

  const breadcrumbs = [
    { label: 'Dashboard', to: '/' },
    { label: 'Intelligence' },
    { label: 'Marketing Thesis' },
  ]

  // Outbound chips to Aperol, Lillet, Havana Club
  const crossLinks = MARKETING_RELATED_DOSSIERS.map(d => ({
    slug: d.slug,
    label: d.label,
    type: 'brand',
  }))

  const SKIP_TITLES = /document metadata|a note on method/i
  const renderableSections = sections
    ? sections.filter((s, i) => {
        if (i === 0 && s.level === 1) return false
        if (SKIP_TITLES.test(s.title)) return false
        return true
      })
    : []

  // Fallback entry if marketing dossier not in manifest
  const displayEntry = entry || {
    type: 'marketing',
    dossierTier: 'standard',
    synthesisVerifiedSourceCount: 0,
    realDomains: [],
  }

  return (
    <DossierLayout
      entry={displayEntry}
      title="Alcohol Marketing Thesis"
      subtitle="How success is proven — and the campaigns that delivered it"
      breadcrumbs={breadcrumbs}
      crossLinks={crossLinks}
      relatedTools={[
        { label: 'Brand Health', href: '/brand-health' },
        { label: 'Category Intelligence', href: '/categories' },
        { label: 'Venue Intelligence', href: '/venues' },
      ]}
      isColdNav={isColdNav}
    >
      {/* Context lede */}
      <div className="mb-8 p-5 bg-navy/5 rounded-bento border border-navy/10">
        <p className="text-label text-gray-400 mb-2 uppercase tracking-wider">About this thesis</p>
        <p className="text-body text-gray-700 leading-relaxed">
          A strategic dossier mapping how premium drinks brands prove marketing ROI {'—'} the measurement systems,
          the campaign deep-dives, and the structural white spaces left on the table. The Aperol RTD finding
          and the Lillet canned format opportunity both originate here.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link
            to="/walk-in/campari-group"
            className="inline-flex items-center gap-2 bg-navy text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-navy-light transition-colors"
          >
            Walk into Campari Group
          </Link>
          <Link
            to="/brand/campari-group_aperol"
            className="inline-flex items-center gap-2 border border-navy/20 text-navy text-sm font-medium px-4 py-2 rounded-lg hover:bg-navy/5 transition-colors"
          >
            See Aperol dossier
          </Link>
        </div>
      </div>

      {/* Full dossier sections */}
      {loadError && (
        <div className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-lg text-sm text-amber-800">
          Content could not be loaded. Run <code>npm run build-dossiers</code> to regenerate.
        </div>
      )}

      {sections && renderableSections.length > 0 && (
        <div className="space-y-0 mb-8">
          {renderableSections.map((section, i) => {
            const combinedMd = `${'#'.repeat(section.level)} ${section.title}\n${section.content}`
            return (
              <div key={i} className={section.level === 2 ? 'pt-6 first:pt-0' : ''}>
                <MarkdownSection content={combinedMd} />
              </div>
            )
          })}
        </div>
      )}

      {!sections && !loadError && (
        <div className="space-y-4 mb-8">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-4 bg-gray-100 rounded animate-pulse" style={{ width: `${65 + (i % 4) * 8}%` }} />
          ))}
        </div>
      )}
    </DossierLayout>
  )
}
