import React, { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { DOSSIER_MANIFEST } from '../data/dossiers/index.js'
import { Search, ArrowRight, Building2, Wine, TrendingUp, FileStack, ChevronRight } from 'lucide-react'

/* ----------------------------------------------------------------------- */
/* Display-name helpers                                                     */
/* ----------------------------------------------------------------------- */

function titleCase(str) {
  return str
    .split('-')
    .map(w => (w.length <= 2 && w !== 's' ? w : w.charAt(0).toUpperCase() + w.slice(1)))
    .join(' ')
}

function groupName(slug) {
  const overrides = {
    'lvmh-moet-hennessy': 'LVMH Moët Hennessy',
    'brown-forman': 'Brown-Forman',
    'campari-group': 'Campari Group',
    'pernod-ricard': 'Pernod Ricard',
    'bacardi': 'Bacardi',
    'diageo': 'Diageo',
  }
  return overrides[slug] || titleCase(slug)
}

function brandName(slug) {
  // slug = "campari-group_aperol" -> "Aperol"
  const overrides = {
    'lvmh-moet-hennessy_moet-chandon': 'Moët & Chandon',
    'lvmh-moet-hennessy_dom-perignon': 'Dom Pérignon',
    'lvmh-moet-hennessy_veuve-clicquot': 'Veuve Clicquot',
    'campari-group_wray-nephew': 'Wray & Nephew',
    'campari-group_grand-marnier': 'Grand Marnier',
    'bacardi_st-germain': 'St-Germain',
    'bacardi_william-lawson-s': "William Lawson's",
    'bacardi_dewar-s': "Dewar's",
    'brown-forman_jack-daniel-s': "Jack Daniel's",
    'diageo_buchanan-s': "Buchanan's",
    'pernod-ricard_ballantine-s': "Ballantine's",
    'brown-forman_diplomatico': 'Diplomático',
    'campari-group_espolon': 'Espolòn',
    'diageo_don-julio': 'Don Julio',
    'lvmh-moet-hennessy_volcan-de-mi-tierra': 'Volcán de Mi Tierra',
  }
  if (overrides[slug]) return overrides[slug]
  const tail = slug.includes('_') ? slug.split('_').slice(1).join(' ') : slug
  return tail
    .split('-')
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ')
}

function categoryName(slug) {
  // the-global-tequila-market -> Tequila
  // the-global-whisky-market-all-styles -> Whisky (All Styles)
  const map = {
    'the-global-bourbon-whiskey-market': 'Bourbon Whiskey',
    'the-global-gin-market': 'Gin',
    'the-global-irish-whiskey-market': 'Irish Whiskey',
    'the-global-japanese-whisky-market': 'Japanese Whisky',
    'the-global-rum-market': 'Rum',
    'the-global-scotch-whisky-market': 'Scotch Whisky',
    'the-global-tequila-market': 'Tequila',
    'the-global-whisky-market-all-styles': 'Whisky — All Styles',
  }
  return map[slug] || titleCase(slug.replace(/^the-global-/, '').replace(/-market$/, ''))
}

/* First sentence / teaser from the synthesis prose (stripped of markdown). */
function teaser(prose, max = 150) {
  if (!prose) return ''
  let t = prose
    .replace(/\*\*/g, '')
    .replace(/\[[^\]]*\]\([^)]*\)/g, '')   // markdown links
    .replace(/https?:\/\/\S+/g, '')         // bare urls
    .replace(/^\s*[\*\-#]+\s*/gm, '')
    .replace(/\s+/g, ' ')
    .trim()
  // Skip boilerplate "note on method" / "strategic purpose" openers
  if (/^(A note on method|This dossier is compiled|STRATEGIC PURPOSE|This strategic dossier|This is the section|This is the costed)/i.test(t)) {
    return ''
  }
  if (t.length > max) t = t.slice(0, max).replace(/\s+\S*$/, '') + '…'
  return t
}

/* ----------------------------------------------------------------------- */
/* Data assembly                                                            */
/* ----------------------------------------------------------------------- */

const GROUP_ORDER = ['diageo', 'pernod-ricard', 'lvmh-moet-hennessy', 'bacardi', 'campari-group', 'brown-forman']

function buildModel() {
  const categories = DOSSIER_MANIFEST.filter(e => e.type === 'category')
  const groups = DOSSIER_MANIFEST.filter(e => e.type === 'group')
  const brands = DOSSIER_MANIFEST.filter(e => e.type === 'brand')
  const marketing = DOSSIER_MANIFEST.find(e => e.type === 'marketing')

  const orderedGroups = [...groups].sort(
    (a, b) => GROUP_ORDER.indexOf(a.slug) - GROUP_ORDER.indexOf(b.slug)
  )

  const groupModels = orderedGroups.map(g => ({
    slug: g.slug,
    name: groupName(g.slug),
    route: `/group/${g.slug}`,
    brands: brands
      .filter(b => b.group === g.slug)
      .map(b => ({
        slug: b.slug,
        name: brandName(b.slug),
        route: `/brand/${b.slug}`,
        flagship: b.dossierTier === 'flagship',
        teaser: teaser(b.synthesisProse),
      }))
      .sort((a, b) => a.name.localeCompare(b.name)),
  }))

  const categoryModels = categories
    .map(c => ({
      slug: c.slug,
      name: categoryName(c.slug),
      route: `/category/${c.slug}/dossier`,
      teaser: teaser(c.synthesisProse),
    }))
    .sort((a, b) => a.name.localeCompare(b.name))

  return { categoryModels, groupModels, marketing }
}

/* ----------------------------------------------------------------------- */
/* Component                                                                */
/* ----------------------------------------------------------------------- */

export default function DossiersIndex() {
  const [query, setQuery] = useState('')
  const { categoryModels, groupModels, marketing } = useMemo(buildModel, [])

  const total = DOSSIER_MANIFEST.length

  const q = query.trim().toLowerCase()
  const match = (s) => !q || s.toLowerCase().includes(q)

  // Filtered views
  const filteredCategories = categoryModels.filter(c => match(c.name) || match('category'))
  const filteredGroups = groupModels
    .map(g => {
      const groupHit = match(g.name)
      const brands = g.brands.filter(b => groupHit || match(b.name) || match(g.name))
      return { ...g, brands, groupHit }
    })
    .filter(g => g.groupHit || g.brands.length > 0)

  const marketingVisible = match('marketing') || match('thesis') || (marketing && match('marketing thesis'))

  const visibleCount =
    (q
      ? filteredCategories.length +
        filteredGroups.reduce((n, g) => n + 1 + g.brands.length, 0) +
        (marketingVisible ? 1 : 0)
      : total)

  return (
    <div className="min-h-screen bg-surface p-3 sm:p-4 lg:p-6 max-w-7xl mx-auto pb-24">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-2.5 mb-1.5">
          <div className="w-8 h-8 bg-navy rounded-lg flex items-center justify-center shrink-0">
            <FileStack size={16} className="text-white" />
          </div>
          <h1 className="font-display text-2xl sm:text-3xl text-navy font-bold">Intelligence Dossiers</h1>
        </div>
        <p className="text-sm text-gray-500 ml-[42px]">
          <span className="font-semibold text-navy">{total} intelligence reports</span>
          {' '}&middot; categories, owner groups &amp; brands &mdash; every report is a full, source-cited dossier.
        </p>
      </div>

      {/* Search */}
      <div className="relative mb-7 max-w-xl">
        <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search brands, groups or categories…"
          className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-gold/40 focus:border-gold transition-colors"
        />
        {q && (
          <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-gray-400">
            {visibleCount} match{visibleCount === 1 ? '' : 'es'}
          </span>
        )}
      </div>

      {/* Marketing thesis — featured */}
      {marketingVisible && marketing && (
        <Link
          to="/marketing"
          className="block mb-8 rounded-2xl border border-gold/40 bg-gradient-to-br from-gold/5 to-white p-5 hover:border-gold hover:shadow-sm transition-all group"
        >
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-lg bg-gold/15 flex items-center justify-center shrink-0">
                <TrendingUp size={17} className="text-[#9a7d45]" />
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-[#9a7d45] mb-0.5">Cross-category thesis</p>
                <h2 className="font-display text-lg text-navy font-semibold leading-tight">The Marketing Thesis</h2>
                <p className="text-sm text-gray-600 mt-1 max-w-2xl">
                  {teaser(marketing.synthesisProse, 200) ||
                    'Where spend is deployed without measurement — the category’s defining inefficiency.'}
                </p>
              </div>
            </div>
            <ArrowRight size={18} className="text-gray-400 group-hover:text-navy group-hover:translate-x-0.5 transition-all shrink-0 mt-1" />
          </div>
        </Link>
      )}

      {/* Categories */}
      {filteredCategories.length > 0 && (
        <section className="mb-10">
          <div className="flex items-center gap-2 mb-3">
            <Wine size={15} className="text-navy" />
            <h2 className="font-display text-base text-navy font-semibold">Market Categories</h2>
            <span className="text-xs text-gray-400">({filteredCategories.length})</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {filteredCategories.map(c => (
              <Link
                key={c.slug}
                to={c.route}
                className="block rounded-xl border border-gray-200 bg-white p-4 hover:border-navy/25 hover:shadow-sm transition-all group"
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-display text-[15px] text-navy font-semibold">{c.name}</h3>
                  <ArrowRight size={14} className="text-gray-300 group-hover:text-navy group-hover:translate-x-0.5 transition-all" />
                </div>
                {c.teaser && <p className="text-xs text-gray-500 mt-1.5 leading-relaxed">{c.teaser}</p>}
                <p className="text-[10px] uppercase tracking-wider text-gray-400 mt-2">Category dossier</p>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Groups + nested brands */}
      {filteredGroups.length > 0 && (
        <section>
          <div className="flex items-center gap-2 mb-3">
            <Building2 size={15} className="text-navy" />
            <h2 className="font-display text-base text-navy font-semibold">Owner Groups &amp; Brands</h2>
            <span className="text-xs text-gray-400">({filteredGroups.length} groups)</span>
          </div>

          <div className="space-y-5">
            {filteredGroups.map(g => (
              <div key={g.slug} className="rounded-2xl border border-gray-200 bg-white overflow-hidden">
                {/* Group header row -> group dossier */}
                <Link
                  to={g.route}
                  className="flex items-center justify-between px-4 sm:px-5 py-3.5 bg-navy/[0.03] hover:bg-navy/[0.06] border-b border-gray-100 transition-colors group"
                >
                  <div className="flex items-center gap-2.5">
                    <Building2 size={16} className="text-navy/70" />
                    <span className="font-display text-[15px] text-navy font-semibold">{g.name}</span>
                    <span className="text-[11px] text-gray-400">
                      {g.brands.length} brand{g.brands.length === 1 ? '' : 's'}
                    </span>
                  </div>
                  <span className="flex items-center gap-1 text-xs font-medium text-navy/70 group-hover:text-navy">
                    Group dossier
                    <ChevronRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
                  </span>
                </Link>

                {/* Brand grid */}
                {g.brands.length > 0 && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-gray-100">
                    {g.brands.map(b => (
                      <Link
                        key={b.slug}
                        to={b.route}
                        className={`flex items-start justify-between gap-2 px-4 py-3 bg-white hover:bg-gray-50 transition-colors group ${
                          b.flagship ? 'bg-gold/[0.04]' : ''
                        }`}
                      >
                        <div className="min-w-0">
                          <div className="flex items-center gap-1.5">
                            <span className="text-sm font-semibold text-navy truncate">{b.name}</span>
                            {b.flagship && (
                              <span className="text-[8px] font-bold uppercase tracking-wider text-[#9a7d45] bg-gold/15 px-1 py-0.5 rounded">
                                Flagship
                              </span>
                            )}
                          </div>
                          {b.teaser && (
                            <p className="text-[11px] text-gray-500 mt-0.5 leading-snug line-clamp-2">{b.teaser}</p>
                          )}
                        </div>
                        <ArrowRight size={13} className="text-gray-300 group-hover:text-navy shrink-0 mt-0.5 transition-colors" />
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Empty state */}
      {visibleCount === 0 && (
        <div className="text-center py-16">
          <p className="text-gray-400 text-sm">No dossiers match &quot;{query}&quot;.</p>
          <button onClick={() => setQuery('')} className="text-navy text-sm font-medium mt-2 hover:underline">
            Clear search
          </button>
        </div>
      )}

      {/* Footer */}
      <div className="mt-12 pt-6 border-t border-gray-100 text-center">
        <p className="text-[11px] text-gray-400">Powered by Liquid Agency &middot; Drinks Industry Intelligence</p>
      </div>
    </div>
  )
}
