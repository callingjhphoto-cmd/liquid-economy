import React, { useState, useEffect } from 'react'
import { useParams, useLocation, Link } from 'react-router-dom'
import { DOSSIER_MANIFEST, getDossierEntry, SLUG_OVERRIDE_MAP } from '../data/dossiers/index.js'
import { FLAGSHIP_CONFIG } from '../data/dossiers/flagshipConfig.js'
import { DossierLayout } from '../components/dossier/DossierLayout'
import { LeftOnTheTable } from '../components/dossier/LeftOnTheTable'

// Lazy-load react-markdown only within this chunk (per spec: absent from / and /walk-in bundles)

/**
 * BrandDossier — /brand/:slug
 * Renders flagship or standard brand dossier.
 * Flagship: LeftOnTheTable + DossierLayout with authored cross-edges.
 * Standard: DossierLayout with prose synthesis + relatedSlugs chips.
 */
export default function BrandDossier() {
  const { slug } = useParams()
  const location = useLocation()
  const isColdNav = !location.state?.fromApp

  const entry = getDossierEntry(slug)
  const flagshipCfg = FLAGSHIP_CONFIG[slug]

  // Load dossier content from markdown (via dynamic import of a pre-processed module)
  // For this proof, we use the manifest's synthesisProse for standard tier
  // and the authored heroFindings for flagship
  const [content, setContent] = useState('')

  useEffect(() => {
    // In future: load full parsed markdown. For proof: use synthesisProse.
    if (entry) {
      setContent(entry.synthesisProse || '')
    }
  }, [slug, entry])

  if (!entry) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <p className="font-display text-section text-navy mb-3">Brand not found</p>
        <p className="text-body text-gray-500 mb-6">No dossier exists for "{slug}" yet.</p>
        <Link to="/companies" className="text-editorial hover:text-navy underline">Browse all companies</Link>
      </div>
    )
  }

  // Human-readable names from slug (group_brand → Group Brand)
  const parts = slug.split('_')
  const brandPart = parts.slice(1).join(' ').split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
  const groupPart = parts[0].split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')

  // Breadcrumbs
  const breadcrumbs = [
    { label: 'Dashboard', to: '/' },
    { label: 'Intelligence' },
    { label: 'Companies', to: '/companies' },
    { label: groupPart, to: entry.group ? `/group/${entry.group}` : '/companies' },
    { label: brandPart },
  ]

  // Cross-links for DossierLayout chip row
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

  return (
    <DossierLayout
      entry={entry}
      content={entry.dossierTier === 'standard' ? entry.synthesisProse : ''}
      title={brandPart}
      subtitle={groupPart}
      breadcrumbs={breadcrumbs}
      crossLinks={crossLinks}
      relatedTools={flagshipCfg?.relatedTools || []}
      isColdNav={isColdNav}
    >
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
    </DossierLayout>
  )
}
