import React from 'react'
import { useParams, useLocation, Link } from 'react-router-dom'
import { DOSSIER_MANIFEST, getDossierEntry } from '../data/dossiers/index.js'
import { DossierLayout } from '../components/dossier/DossierLayout'
import { LeftOnTheTable } from '../components/dossier/LeftOnTheTable'
import { ArrowRight } from 'lucide-react'

/**
 * GroupDossier  -  /group/:slug
 * Renders group-level dossier. Shows brand roster as cross-link chips.
 */
export default function GroupDossier() {
  const { slug } = useParams()
  const location = useLocation()
  const isColdNav = !location.state?.fromApp

  const entry = getDossierEntry(slug)

  if (!entry) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <p className="font-display text-section text-navy mb-3">Group not found</p>
        <p className="text-body text-gray-500 mb-6">No dossier exists for "{slug}" yet.</p>
        <Link to="/companies" className="text-editorial hover:text-navy underline">Browse all companies</Link>
      </div>
    )
  }

  const displayName = slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')

  // Brands in this group (from manifest)
  const groupBrands = DOSSIER_MANIFEST.filter(e => e.type === 'brand' && e.group === slug)

  const breadcrumbs = [
    { label: 'Dashboard', to: '/' },
    { label: 'Intelligence' },
    { label: 'Companies', to: '/companies' },
    { label: displayName },
  ]

  // Cross-links: group brands as chips
  const crossLinks = groupBrands.map(b => ({
    slug: b.slug,
    label: b.slug.split('_').slice(1).join(' ').split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
    type: 'brand',
  }))

  return (
    <DossierLayout
      entry={entry}
      title={displayName}
      subtitle={`Group dossier  -  ${entry.synthesisVerifiedSourceCount} verified sources`}
      breadcrumbs={breadcrumbs}
      crossLinks={crossLinks}
      relatedTools={[
        { label: 'Financials', href: `/financials?company=${slug}` },
        { label: 'Valuations', href: `/valuations?company=${slug}` },
      ]}
      isColdNav={isColdNav}
    >
      {/* Group brand roster */}
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
    </DossierLayout>
  )
}
