import React, { useState, useEffect } from 'react'
import { useParams, useLocation, Link } from 'react-router-dom'
import { DOSSIER_MANIFEST, getDossierEntry } from '../data/dossiers/index.js'
import { FLAGSHIP_CONFIG } from '../data/dossiers/flagshipConfig.js'
import { DossierLayout } from '../components/dossier/DossierLayout'
import { LeftOnTheTable } from '../components/dossier/LeftOnTheTable'
import { MarkdownSection } from '../components/dossier/MarkdownSection'

/**
 * BrandDossier — /brand/:slug
 * Renders flagship or standard brand dossier.
 * Full section rendering: dynamically imports content/${slug}.js (emitted by build-dossiers.mjs).
 * Flagship: LeftOnTheTable hero + all sections below.
 * Standard: prose synthesis block + all sections + CTA.
 */
export default function BrandDossier() {
  const { slug } = useParams()
  const location = useLocation()
  const isColdNav = !location.state?.fromApp

  const entry = getDossierEntry(slug)
  const flagshipCfg = FLAGSHIP_CONFIG[slug]

  const [sections, setSections] = useState(null)
  const [loadError, setLoadError] = useState(false)

  useEffect(() => {
    setSections(null)
    setLoadError(false)
    if (!entry) return
    // Dynamic import of the per-dossier content chunk
    import(`../data/dossiers/content/${slug}.js`)
      .then(mod => setSections(mod.SECTIONS || []))
      .catch(() => setLoadError(true))
  }, [slug, entry])

  if (!entry) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <p className="font-display text-section text-navy mb-3">Brand not found</p>
        <p className="text-body text-gray-500 mb-6">No dossier exists for &quot;{slug}&quot; yet.</p>
        <Link to="/companies" className="text-editorial hover:text-navy underline">Browse all companies</Link>
      </div>
    )
  }

  // Human-readable names from slug (group_brand)
  const parts = slug.split('_')
  const brandPart = parts.slice(1).join(' ').split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
  const groupPart = parts[0].split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')

  const breadcrumbs = [
    { label: 'Dashboard', to: '/' },
    { label: 'Intelligence' },
    { label: 'Companies', to: '/companies' },
    { label: groupPart, to: entry.group ? `/group/${entry.group}` : '/companies' },
    { label: brandPart },
  ]

  // Cross-links chip row
  const crossLinks = []
  if (entry.dossierTier === 'flagship' && flagshipCfg?.relatedDossiers) {
    flagshipCfg.relatedDossiers.forEach(rel => {
      if (rel === 'marketing') {
        crossLinks.push({ slug: 'marketing', label: 'Marketing thesis', type: 'marketing' })
      } else if (rel.startsWith('group/')) {
        crossLinks.push({ slug: rel.replace('group/', ''), label: groupPart + ' Group', type: 'group' })
      } else {
        crossLinks.push({ slug: rel, label: rel, type: 'brand' })
      }
    })
  } else if (entry.relatedSlugs) {
    entry.relatedSlugs.forEach(rel => {
      if (rel.startsWith('group/')) {
        crossLinks.push({ slug: rel.replace('group/', ''), label: rel.replace('group/', ''), type: 'group' })
      } else if (rel === 'marketing') {
        crossLinks.push({ slug: 'marketing', label: 'Marketing thesis', type: 'marketing' })
      } else {
        crossLinks.push({ slug: rel, label: rel, type: 'brand' })
      }
    })
  }

  const relatedDossierChips = flagshipCfg?.relatedDossiers
    ? flagshipCfg.relatedDossiers.map(rel => ({
        slug: rel,
        label: rel === 'marketing' ? 'Marketing thesis'
          : rel.startsWith('group/') ? groupPart + ' Group'
          : rel,
      }))
    : []

  // Skip the title-only h1 section (index 0) and the document metadata trailer sections
  const SKIP_TITLES = /document metadata|about this dossier/i
  const renderableSections = sections
    ? sections.filter((s, i) => {
        // Skip the very first h1 title block (it's the doc title, shown in hero already)
        if (i === 0 && s.level === 1) return false
        if (SKIP_TITLES.test(s.title)) return false
        return true
      })
    : []

  return (
    <DossierLayout
      entry={entry}
      title={brandPart}
      subtitle={groupPart}
      breadcrumbs={breadcrumbs}
      crossLinks={crossLinks}
      relatedTools={flagshipCfg?.relatedTools || []}
      isColdNav={isColdNav}
    >
      {/* Flagship: LeftOnTheTable hero */}
      {entry.dossierTier === 'flagship' && flagshipCfg && (
        <LeftOnTheTable
          brandName={brandPart}
          groupName={groupPart}
          heroFindings={flagshipCfg.heroFindings || []}
          brandSlug={slug}
          relatedDossiers={relatedDossierChips}
          dossierTier="flagship"
        />
      )}

      {/* Standard: synthesis prose + CTA (above sections) */}
      {entry.dossierTier === 'standard' && entry.synthesisProse && !sections && (
        <div className="mb-8 p-5 bg-navy/5 rounded-bento border border-navy/10">
          <p className="text-label text-gray-400 mb-3 uppercase tracking-wider">Research summary</p>
          <p className="text-body text-gray-700 leading-relaxed">{entry.synthesisProse}</p>
        </div>
      )}

      {/* Full dossier sections — all content */}
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

      {sections && renderableSections.length === 0 && !loadError && (
        <div className="mb-6 p-5 bg-navy/5 rounded-bento border border-navy/10">
          <p className="text-body text-gray-500 italic">No sections found in this dossier.</p>
        </div>
      )}

      {/* Loading state */}
      {!sections && !loadError && (
        <div className="space-y-4 mb-8">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-4 bg-gray-100 rounded animate-pulse" style={{ width: `${70 + (i % 3) * 10}%` }} />
          ))}
        </div>
      )}

      {/* Standard CTA below sections */}
      {entry.dossierTier === 'standard' && (
        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href="mailto:james@huertas.co.uk?subject=Full Analysis Request"
            className="inline-flex items-center gap-2 bg-navy text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-navy-light transition-colors"
          >
            Request full analysis
          </a>
          <Link
            to="/brand/campari-group_aperol"
            className="inline-flex items-center gap-2 border border-navy/20 text-navy text-sm font-medium px-4 py-2 rounded-lg hover:bg-navy/5 transition-colors"
          >
            See a flagship example
          </Link>
        </div>
      )}
    </DossierLayout>
  )
}
