import React, { useState, useEffect } from 'react'
import { useParams, useLocation, Link } from 'react-router-dom'
import { DOSSIER_MANIFEST, getDossierEntry, CATEGORY_ID_TO_SLUG } from '../data/dossiers/index.js'
import { DossierLayout } from '../components/dossier/DossierLayout'
import { MarkdownSection } from '../components/dossier/MarkdownSection'
import { ArrowRight } from 'lucide-react'

/**
 * CategoryDossier  -  /category/:slug/dossier
 * Renders category-level dossier with full section content.
 * Accepts either a bare category id (e.g. "tequila") or the full
 * dossier slug (e.g. "the-global-tequila-market").
 */
export default function CategoryDossier() {
  const { slug: rawSlug } = useParams()
  const location = useLocation()
  const isColdNav = !location.state?.fromApp

  // Resolve bare ids (tequila) -> full slug (the-global-tequila-market)
  const slug = CATEGORY_ID_TO_SLUG[rawSlug] || rawSlug
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

  if (!entry || entry.type !== 'category') {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <p className="font-display text-section text-navy mb-3">Category dossier not found</p>
        <p className="text-body text-gray-500 mb-6">No dossier exists for &quot;{rawSlug}&quot; yet.</p>
        <Link to="/dossiers" className="text-editorial hover:text-navy underline">Browse all dossiers</Link>
      </div>
    )
  }

  // Friendly display title from the slug, e.g.
  // the-global-tequila-market -> The Global Tequila Market
  const displayName = slug
    .split('-')
    .map(w => (w === 'all' || w === 'the' || w === 'of' ? w : w.charAt(0).toUpperCase() + w.slice(1)))
    .join(' ')
    .replace(/^the /, 'The ')

  // Brands referenced inside this category dossier
  const brandSlugs = entry.brandsInCategory || []
  const crossLinks = brandSlugs
    .map(bs => getDossierEntry(bs))
    .filter(Boolean)
    .map(b => ({
      slug: b.slug,
      label: b.slug.split('_').slice(1).join(' ').split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
      type: 'brand',
    }))

  const breadcrumbs = [
    { label: 'Dashboard', to: '/' },
    { label: 'Intelligence' },
    { label: 'Dossiers', to: '/dossiers' },
    { label: displayName },
  ]

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
      subtitle="Category market dossier"
      breadcrumbs={breadcrumbs}
      crossLinks={crossLinks}
      relatedTools={[
        { label: 'Category Intelligence', href: '/categories' },
        { label: 'Geographic', href: '/geographic' },
      ]}
      isColdNav={isColdNav}
    >
      {/* Notable brands roster */}
      {crossLinks.length > 0 && (
        <div className="mb-8">
          <p className="text-label text-gray-400 uppercase tracking-wider mb-3">Brands referenced</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {crossLinks.map((b, i) => (
              <Link
                key={i}
                to={`/brand/${b.slug}`}
                className="flex items-center justify-between p-3 rounded-bento border border-gray-200 bg-white hover:border-navy/20 hover:bg-gray-50 transition-all"
              >
                <span className="text-small font-semibold text-navy">{b.label}</span>
                <ArrowRight size={11} className="text-gray-400" />
              </Link>
            ))}
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
