import React, { useState, useEffect } from 'react'
import { useParams, useLocation, Link } from 'react-router-dom'
import { DOSSIER_MANIFEST, getDossierEntry } from '../data/dossiers/index.js'
import { DossierLayout } from '../components/dossier/DossierLayout'
import { MarkdownSection } from '../components/dossier/MarkdownSection'
import { ArrowRight } from 'lucide-react'

/**
 * GroupDossier  -  /group/:slug
 * Renders group-level dossier with full section content.
 * Dynamically imports content/${slug}.js emitted by build-dossiers.mjs.
 */
export default function GroupDossier() {
  const { slug } = useParams()
  const location = useLocation()
  const isColdNav = !location.state?.fromApp

  const entry = getDossierEntry(slug)

  const [sections, setSections] = useState(null)
  const [loadError, setLoadError] = useState(false)

  useEffect(() => {
    setSections(null)
    setLoadError(false)
    if (!entry) return
    import(`../data/dossiers/content/${slug}.js`)
      .then(mod => setSections(mod.SECTIONS || []))
      .catch(() => setLoadError(true))
  }, [slug, entry])

  if (!entry) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <p className="font-display text-section text-navy mb-3">Group not found</p>
        <p className="text-body text-gray-500 mb-6">No dossier exists for &quot;{slug}&quot; yet.</p>
        <Link to="/companies" className="text-editorial hover:text-navy underline">Browse all companies</Link>
      </div>
    )
  }

  const displayName = slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')

  // Brands in this group
  const groupBrands = DOSSIER_MANIFEST.filter(e => e.type === 'brand' && e.group === slug)

  const breadcrumbs = [
    { label: 'Dashboard', to: '/' },
    { label: 'Intelligence' },
    { label: 'Companies', to: '/companies' },
    { label: displayName },
  ]

  const crossLinks = groupBrands.map(b => ({
    slug: b.slug,
    label: b.slug.split('_').slice(1).join(' ').split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
    type: 'brand',
  }))

  const SKIP_TITLES = /document metadata/i
  const renderableSections = sections
    ? sections.filter((s, i) => {
        if (i === 0 && s.level === 1) return false
        if (SKIP_TITLES.test(s.title)) return false
        return true
      })
    : []

  return (
    <DossierLayout
      entry={entry}
      title={displayName}
      subtitle={`Group dossier — ${entry.synthesisVerifiedSourceCount} verified sources`}
      breadcrumbs={breadcrumbs}
      crossLinks={crossLinks}
      relatedTools={[
        { label: 'Financials', href: `/financials?company=${slug}` },
        { label: 'Valuations', href: `/valuations?company=${slug}` },
      ]}
      isColdNav={isColdNav}
    >
      {/* Brand roster */}
      {groupBrands.length > 0 && (
        <div className="mb-8">
          <p className="text-label text-gray-400 uppercase tracking-wider mb-3">Brand roster</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {groupBrands.map((brand, i) => {
              const brandName = brand.slug.split('_').slice(1).join(' ')
                .split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
              const isFlagship = brand.dossierTier === 'flagship'
              return (
                <Link
                  key={i}
                  to={`/brand/${brand.slug}`}
                  className={`flex items-center justify-between p-3 rounded-bento border transition-all ${
                    isFlagship
                      ? 'border-gold/50 bg-gold/5 hover:bg-gold/10'
                      : 'border-gray-200 bg-white hover:border-navy/20 hover:bg-gray-50'
                  }`}
                >
                  <span className="text-small font-semibold text-navy">{brandName}</span>
                  <div className="flex items-center gap-1">
                    {isFlagship && (
                      <span className="text-[9px] font-bold uppercase tracking-wider text-gold">Flagship</span>
                    )}
                    <ArrowRight size={11} className="text-gray-400" />
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      )}

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
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-4 bg-gray-100 rounded animate-pulse" style={{ width: `${70 + (i % 3) * 10}%` }} />
          ))}
        </div>
      )}
    </DossierLayout>
  )
}
