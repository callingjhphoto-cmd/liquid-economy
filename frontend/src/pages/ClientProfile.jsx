/**
 * ClientProfile.jsx
 * Generic profile renderer for Liquid Economy client profiles.
 * Iterates profile.modules and renders via a component registry.
 *
 * Supports archetypes: use-case, brand-owner, regional
 * Routes: /p/:slug (rendered inside main Layout so sidebar appears)
 */

import React, { useState } from 'react'
import { Link } from 'react-router-dom'

// ---- Tint palette (muted main-app palette only) ------------------------------
// Map any incoming colour hint to a small set of subtle tints.
// Order matches main-app cards: amber, emerald, blue, pink, orange.
const TINT_BG = ['bg-amber-50', 'bg-emerald-50', 'bg-blue-50', 'bg-pink-50', 'bg-orange-50']
const TINT_TEXT = ['text-amber-700', 'text-emerald-700', 'text-blue-700', 'text-pink-700', 'text-orange-700']
const tintFor = (i) => TINT_BG[i % TINT_BG.length]
const tintTextFor = (i) => TINT_TEXT[i % TINT_TEXT.length]

const trendTintIndex = (t = '') => {
  if (t.includes('rising') || t.includes('+')) return 1 // emerald
  if (t.includes('dominant') || t.includes('stable')) return 2 // blue
  if (t.includes('decline') || t.includes('caution') || t.includes('\u2212')) return 3 // pink
  if (t.includes('watch')) return 4 // orange
  return 0 // amber default
}

// ---- Primitive components ----------------------------------------------------

const Chip = ({ label, tone = 'default' }) => {
  const toneClass = {
    default: 'bg-gray-100 text-gray-700',
    rising: 'bg-emerald-50 text-emerald-700',
    dominant: 'bg-blue-50 text-blue-700',
    stable: 'bg-gray-100 text-gray-700',
    caution: 'bg-pink-50 text-pink-700',
    watch: 'bg-orange-50 text-orange-700',
    classic: 'bg-amber-50 text-amber-700',
    modern: 'bg-blue-50 text-blue-700',
  }[tone] || 'bg-gray-100 text-gray-700'
  return (
    <span className={`inline-block text-caption font-medium px-2 py-0.5 rounded-full ${toneClass}`}>
      {label}
    </span>
  )
}

const trendTone = (t) => {
  if (t === 'rising' || t === 'fast-rising') return 'rising'
  if (t === 'stable-dominant' || t === 'dominant' || t === 'dominant-consumer' || t === 'leading') return 'dominant'
  if (t === 'stable') return 'stable'
  if (t === 'fatigue') return 'caution'
  if (t === 'resurgent' || t === 'established-growing') return 'classic'
  return 'default'
}

const Card = ({ children, className = '', ...rest }) => (
  <div
    className={`bg-white border border-gray-200 rounded-bento p-6 shadow-sm ${className}`}
    {...rest}
  >
    {children}
  </div>
)

const TintCard = ({ tintIdx = 0, children, className = '', ...rest }) => (
  <div
    className={`${tintFor(tintIdx)} border border-gray-200/70 rounded-bento p-6 ${className}`}
    {...rest}
  >
    {children}
  </div>
)

const SectionHeader = ({ title, sub, linkTo }) => (
  <div className="mb-6 flex items-start justify-between gap-4">
    <div>
      <h2 className="text-section font-display text-navy">{title}</h2>
      {sub && <p className="text-caption text-gray-600 mt-1">{sub}</p>}
    </div>
    {linkTo && (
      <Link
        to={linkTo}
        className="text-caption font-medium text-editorial hover:text-navy whitespace-nowrap shrink-0 mt-1 transition-colors"
      >
        See full data \u2192
      </Link>
    )}
  </div>
)

// ---- MODULE: TopCocktails (BENTO GRID, no table) ----------------------------

function TopCocktailsModule({ data }) {
  const [expanded, setExpanded] = useState(null)
  const cocktails = data.cocktails || []
  const trendLabel = (t) => {
    const map = {
      'rising': 'Rising', 'fast-rising': 'Fast Rising', 'stable-dominant': 'Dominant',
      'dominant': 'Dominant', 'dominant-consumer': 'Consumer #1', 'stable': 'Stable',
      'fatigue': 'Fatigue', 'resurgent': 'Resurgent', 'established-growing': 'Established',
      'leading': 'Leading',
    }
    return map[t] || t
  }
  return (
    <section id="module-top-cocktails">
      <SectionHeader
        title="Top 20 Cocktails \u2014 Global Ranking 2024\u20132026"
        sub="Drinks International World\u2019s 50 Best Bars Brand Report \u00b7 Difford\u2019s Guide (700k+ monthly searches) \u00b7 IWSR"
        linkTo="/categories?category=cocktails"
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {cocktails.map((c) => {
          const isOpen = expanded === c.rank
          return (
            <Card
              key={c.rank}
              className="cursor-pointer hover:border-gold/40 hover:shadow-md transition-all flex flex-col"
              onClick={() => setExpanded(isOpen ? null : c.rank)}
            >
              <div className="flex items-baseline justify-between mb-3">
                <span className="text-label uppercase tracking-wider text-gray-500 font-mono">#{c.rank}</span>
                {c.diRank && <span className="text-label text-gray-400">DI {c.diRank}</span>}
              </div>
              <h3 className="text-subsection font-display text-navy leading-tight">{c.name}</h3>
              <p className="text-caption text-gray-500 mt-1">{c.spiritBase}</p>
              <div className="flex items-center gap-2 mt-3 flex-wrap">
                <Chip label={trendLabel(c.trend)} tone={trendTone(c.trend)} />
                {c.type && <Chip label={c.type} tone={c.type.toLowerCase().includes('classic') ? 'classic' : 'modern'} />}
              </div>
              {c.rankMove && (
                <p className="text-caption text-gray-500 mt-3 font-mono">{c.rankMove}</p>
              )}
              {isOpen && c.note && (
                <div className="mt-3 pt-3 border-t border-gray-100">
                  <p className="text-caption text-gray-700 leading-relaxed italic">{c.note}</p>
                </div>
              )}
            </Card>
          )
        })}
      </div>
      <p className="text-caption text-gray-500 mt-3">Tap any card for the analyst note. DI = Drinks International survey of 100 elite bars.</p>
    </section>
  )
}

// ---- MODULE: FlavourRadar ---------------------------------------------------

function FlavourRadarModule({ data }) {
  const families = data.families || []
  return (
    <section id="module-flavour-radar">
      <SectionHeader
        title="Flavour Families \u2014 2025\u20132026 Intelligence"
        sub="Bacardi Cocktail Trends Report \u00b7 Tales of the Cocktail 2025 \u00b7 W50B menu analysis"
        linkTo="/categories"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {families.map((f, i) => (
          <TintCard key={f.id} tintIdx={trendTintIndex(f.trend)}>
            <div className="flex items-start justify-between mb-3">
              <div>
                <span className="text-lg mr-2">{f.icon}</span>
                <span className="font-semibold text-navy">{f.name}</span>
              </div>
              <Chip label={f.trend.replace('-', ' ').replace(/^\w/, c => c.toUpperCase())} tone={trendTone(f.trend)} />
            </div>
            {f.growthSignal && (
              <p className={`text-caption font-semibold mb-1 ${tintTextFor(trendTintIndex(f.trend))}`}>{f.growthSignal}</p>
            )}
            <p className="text-caption text-gray-700 mb-3">{f.penetration}</p>
            <div className="mb-3">
              <p className="text-label uppercase tracking-wider font-semibold text-gray-600 mb-1.5">Key ingredients</p>
              <div className="flex flex-wrap gap-1">
                {(f.ingredients || []).slice(0, 5).map((i) => (
                  <span key={i} className="text-caption bg-white/70 text-gray-700 border border-gray-200/60 px-2 py-0.5 rounded">{i}</span>
                ))}
              </div>
            </div>
            {f.eventApplication && (
              <div className="border-t border-gray-200/60 pt-3 mt-3">
                <p className="text-label uppercase tracking-wider font-semibold text-editorial mb-1">Application</p>
                <p className="text-caption text-gray-700 leading-relaxed">{f.eventApplication}</p>
              </div>
            )}
          </TintCard>
        ))}
      </div>
    </section>
  )
}

// ---- MODULE: LuxuryVenues --------------------------------------------------

function LuxuryVenuesModule({ data }) {
  const [expanded, setExpanded] = useState(null)
  const venues = data.venues || []
  return (
    <section id="module-luxury-venues">
      <SectionHeader
        title="Luxury Venue Intelligence"
        sub="Signature cocktails, pricing bands and theatre at elite global venues"
        linkTo="/venues"
      />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {venues.map((v, i) => (
          <Card key={i} className="cursor-pointer hover:border-gold/40 hover:shadow-md transition-all" onClick={() => setExpanded(expanded === i ? null : i)}>
            <div className="flex items-start justify-between mb-2">
              <div>
                <p className="font-semibold text-navy">{v.venue}</p>
                <p className="text-caption text-gray-600">{v.location}</p>
              </div>
              <Chip label={v.tier} tone="dominant" />
            </div>
            <p className="text-body text-gray-700 mb-2">{v.signatureCocktail}</p>
            <div className="flex gap-4 text-caption text-gray-600">
              <span>Standard: <span className="text-navy font-medium">{v.avgCostPerServe}</span></span>
            </div>
            {expanded === i && (
              <div className="mt-3 border-t border-gray-100 pt-3 space-y-1.5">
                <p className="text-caption text-gray-600"><span className="text-navy font-semibold">Dominant brand:</span> {v.dominantBrand}</p>
                <p className="text-caption text-gray-600"><span className="text-navy font-semibold">Theatre:</span> {v.theatre}</p>
                <p className="text-caption text-gray-500 italic">{v.source}</p>
              </div>
            )}
          </Card>
        ))}
      </div>
      <p className="text-caption text-gray-500 mt-3">Tap any card for full detail.</p>
    </section>
  )
}

// ---- MODULE: Presentation --------------------------------------------------

function PresentationModule({ data }) {
  return (
    <section id="module-presentation">
      <SectionHeader
        title="Presentation and Theatre Library"
        sub="Ice programme, glassware specs, and activation formats"
      />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card>
          <h3 className="text-subsection font-display text-navy mb-3">Ice Programme</h3>
          <div className="space-y-3">
            {(data.iceProgramme || []).map((ice, i) => (
              <div key={i} className="border-b border-gray-100 pb-3 last:border-0 last:pb-0">
                <p className="text-body font-semibold text-navy">{ice.format}</p>
                <p className="text-caption text-gray-600 mt-0.5">{ice.specialist}</p>
                <p className="text-caption text-gray-700 mt-1">{ice.why}</p>
                <p className="text-caption mt-1"><span className="text-editorial font-semibold">Luxury signal:</span> <span className="text-gray-700">{ice.luxurySignal}</span></p>
              </div>
            ))}
          </div>
        </Card>
        <Card>
          <h3 className="text-subsection font-display text-navy mb-3">Glassware Hierarchy</h3>
          <div className="space-y-3">
            {(data.glassware || []).map((g, i) => (
              <div key={i} className="border-b border-gray-100 pb-3 last:border-0 last:pb-0">
                <div className="flex items-start justify-between">
                  <p className="text-body font-semibold text-navy">{g.name}</p>
                  <Chip label={g.signalLevel} tone="classic" />
                </div>
                <p className="text-caption text-gray-600 mt-0.5">{g.maker}</p>
                <p className="text-caption text-gray-700 mt-1">{g.notes}</p>
              </div>
            ))}
          </div>
        </Card>
        <Card>
          <h3 className="text-subsection font-display text-navy mb-3">Activation Formats</h3>
          <div className="space-y-3">
            {(data.theatreFormats || []).map((t, i) => (
              <div key={i} className="border-b border-gray-100 pb-3 last:border-0 last:pb-0">
                <p className="text-body font-semibold text-navy">{t.name}</p>
                <p className="text-caption text-gray-600 mt-0.5 leading-relaxed">{t.description}</p>
                {t.suitabilityForKhorus && (
                  <p className="text-caption mt-1.5">
                    <span className="text-editorial font-semibold">Application: </span>
                    <span className="text-gray-700">{t.suitabilityForKhorus}</span>
                  </p>
                )}
              </div>
            ))}
          </div>
        </Card>
      </div>
    </section>
  )
}

// ---- MODULE: TrendArc -------------------------------------------------------

function TrendArcModule({ data }) {
  const eras = data.eras || []
  const findings = data.surprisingFindings || []
  return (
    <section id="module-trend-arc">
      <SectionHeader
        title="20-Year Cocktail Trend Arc \u2014 2006\u20132026"
        sub="Six eras of luxury on-premise evolution \u00b7 Drinks International, Difford\u2019s Guide, IWSR, W50B"
        linkTo="/categories"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        {eras.map((era, i) => (
          <TintCard key={era.id} tintIdx={i}>
            <div className="mb-3">
              <span className={`text-label uppercase tracking-wider font-semibold ${tintTextFor(i)}`}>{era.label}</span>
              <p className="text-subsection font-display text-navy mt-0.5 leading-tight">{era.subtitle}</p>
            </div>
            <div className="mb-3">
              <p className="text-label uppercase tracking-wider font-semibold text-gray-600 mb-1.5">Dominant cocktails</p>
              <div className="flex flex-wrap gap-1">
                {(era.dominantCocktails || []).slice(0, 5).map((c) => (
                  <span key={c} className="text-caption bg-white/70 text-gray-700 border border-gray-200/60 px-2 py-0.5 rounded-full">{c}</span>
                ))}
              </div>
            </div>
            <p className="text-caption text-gray-700 leading-relaxed mb-2">{era.culturalMoment}</p>
            <div className="border-t border-gray-200/60 pt-2 mt-2">
              <p className="text-label uppercase tracking-wider font-semibold text-editorial mb-0.5">Luxury behaviour</p>
              <p className="text-caption text-gray-700 leading-relaxed">{era.luxuryBehaviour}</p>
            </div>
          </TintCard>
        ))}
      </div>
      {findings.length > 0 && (
        <div>
          <h3 className="text-subsection font-display text-navy mb-4">Three Surprising Findings</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {findings.map((f, i) => (
              <TintCard key={f.id} tintIdx={i}>
                <p className={`text-body font-semibold mb-2 ${tintTextFor(i)}`}>{f.headline}</p>
                <p className="text-caption text-gray-700 leading-relaxed">{f.detail}</p>
              </TintCard>
            ))}
          </div>
        </div>
      )}
    </section>
  )
}

// ---- MODULE: CategorySnapshot -----------------------------------------------

function CategorySnapshotModule({ data }) {
  return (
    <section id="module-category-snapshot">
      <SectionHeader
        title={`Category Snapshot \u2014 ${data.category || 'Category'}`}
        sub={`${data.marketSize || ''} \u00b7 ${data.cagr || ''} \u00b7 ${data.source || ''}`}
        linkTo={data.linkTo}
      />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {(data.subCategories || []).map((sc, i) => (
          <TintCard key={i} tintIdx={trendTintIndex(sc.trend)}>
            <div className="flex items-start justify-between mb-2">
              <p className="font-semibold text-navy">{sc.name}</p>
              <Chip label={sc.share} tone={trendTone(sc.trend)} />
            </div>
            <p className={`text-caption font-semibold mb-1 ${tintTextFor(trendTintIndex(sc.trend))}`}>{sc.trend}</p>
            <p className="text-caption text-gray-700 leading-relaxed">{sc.notes}</p>
          </TintCard>
        ))}
      </div>
      {(data.regionalSignals || []).length > 0 && (
        <div>
          <h3 className="text-subsection font-display text-navy mb-4">Regional Signals</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {data.regionalSignals.map((r, i) => {
              const tIdx = r.direction === 'opportunity' ? 1 : r.direction === 'caution' ? 3 : 4
              return (
                <TintCard key={i} tintIdx={tIdx}>
                  <p className="font-semibold text-navy mb-1">{r.market}</p>
                  <p className="text-caption text-gray-700 leading-relaxed">{r.signal}</p>
                </TintCard>
              )
            })}
          </div>
        </div>
      )}
    </section>
  )
}

// ---- MODULE: CompetitorWatch ------------------------------------------------

function CompetitorWatchModule({ data }) {
  return (
    <section id="module-competitor-watch">
      <SectionHeader
        title="Competitor Watch"
        sub="Brand-level positioning and threat signals \u00b7 Volume data gap flagged"
        linkTo="/competitors"
      />
      {data.note && (
        <div className="mb-4 px-4 py-3 rounded-bento bg-amber-50 border border-amber-100">
          <p className="text-caption text-amber-800">{data.note}</p>
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {(data.competitors || []).map((c, i) => (
          <TintCard key={c.name} tintIdx={i}>
            <div className="flex items-start justify-between mb-2">
              <p className="font-semibold text-navy">{c.name}</p>
              <span className="text-caption text-gray-600">{c.owner}</span>
            </div>
            <p className="text-caption text-gray-700 mb-2 leading-relaxed">{c.positioning}</p>
            <p className="text-caption text-gray-700 mb-1"><span className={`font-semibold ${tintTextFor(i)}`}>Threat:</span> {c.threat}</p>
            <p className="text-caption text-gray-700"><span className="text-editorial font-semibold">Signal:</span> {c.signal}</p>
          </TintCard>
        ))}
      </div>
    </section>
  )
}

// ---- MODULE: MarketIntel ----------------------------------------------------

function MarketIntelModule({ data }) {
  return (
    <section id="module-market-intel">
      <SectionHeader
        title="Market Intelligence"
        sub="Entry signals and channel recommendations per priority market"
        linkTo="/geographic"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {(data.markets || []).map((m, i) => (
          <TintCard key={m.name} tintIdx={i}>
            <div className="flex items-start justify-between mb-3">
              <div>
                <p className="font-semibold text-navy">{m.name}</p>
                <p className={`text-caption font-semibold mt-0.5 ${tintTextFor(i)}`}>{m.signal}</p>
              </div>
            </div>
            <div className="space-y-1.5 mb-3">
              {(m.metrics || []).map((metric, j) => (
                <div key={j} className="flex items-start justify-between text-caption">
                  <span className="text-gray-600">{metric.label}</span>
                  <span className="text-navy font-medium text-right ml-2">{metric.value}</span>
                </div>
              ))}
            </div>
            <div className="border-t border-gray-200/60 pt-3">
              <p className="text-label uppercase tracking-wider text-editorial font-semibold mb-1">Recommendation</p>
              <p className="text-caption text-gray-700 leading-relaxed">{m.recommendation}</p>
            </div>
            {m.linkTo && (
              <Link to={m.linkTo} className="text-caption text-gray-600 hover:text-editorial mt-2 block transition-colors">
                Full geographic data \u2192
              </Link>
            )}
          </TintCard>
        ))}
      </div>
    </section>
  )
}

// ---- MODULE: DemographicsLens -----------------------------------------------

function DemographicsLensModule({ data }) {
  return (
    <section id="module-demographics-lens">
      <SectionHeader
        title={`Demographics Lens \u2014 ${data.category || 'Category'}`}
        sub={data.source}
        linkTo={data.linkTo}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {(data.highlights || []).map((h, i) => (
          <TintCard key={h.segment} tintIdx={i}>
            <p className="font-semibold text-navy mb-1">{h.segment}</p>
            <p className={`text-caption font-semibold mb-2 ${tintTextFor(i)}`}>{h.signal}</p>
            <p className="text-caption text-gray-700 leading-relaxed mb-2">{h.detail}</p>
            <div className="border-t border-gray-200/60 pt-2">
              <p className="text-label uppercase tracking-wider font-semibold text-editorial mb-0.5">Relevance</p>
              <p className="text-caption text-gray-700 leading-relaxed">{h.relevance}</p>
            </div>
          </TintCard>
        ))}
      </div>
    </section>
  )
}

// ---- MODULE: OpportunityRadar (CommercialNarrativeCard) ---------------------

const STEP_CHIP = "inline-block text-label uppercase tracking-wider px-2 py-0.5 rounded-full bg-gray-100 text-gray-700 mb-1.5 font-semibold"

function CommercialNarrativeCard({ o }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="bg-white border border-gray-200 rounded-bento p-6 shadow-sm border-l-4 border-l-editorial">
      <div
        className="flex items-start justify-between cursor-pointer"
        onClick={() => setOpen(!open)}
      >
        <div className="flex-1">
          <span className={STEP_CHIP}>Signal</span>
          <h3 className="text-subsection font-display text-navy mt-1">{o.signal}</h3>
          {o.urgency && (
            <p className="text-caption text-pink-700 font-semibold mt-0.5">{o.urgency.split(' \u2014')[0]}</p>
          )}
        </div>
        <span className="text-gray-400 ml-3 mt-1 text-body">{open ? '\u25b2' : '\u25bc'}</span>
      </div>

      {/* Always-visible summary */}
      <p className="text-caption text-gray-700 leading-relaxed mt-2">{o.signalDetail}</p>

      {/* Expanded: full six-step template */}
      {open && (
        <div className="mt-4 space-y-4 border-t border-gray-100 pt-4">
          {o.adjacency && (
            <div>
              <span className={STEP_CHIP}>Adjacency</span>
              <p className="text-caption text-gray-700 leading-relaxed">{o.adjacency}</p>
            </div>
          )}
          {o.demographic && (
            <div>
              <span className={STEP_CHIP}>Demographic</span>
              <p className="text-caption text-gray-700 leading-relaxed">{o.demographic}</p>
            </div>
          )}
          {(o.product || o.migration) && (
            <div>
              <span className={STEP_CHIP}>Product</span>
              <p className="text-caption text-gray-700 leading-relaxed">{o.product || o.migration}</p>
            </div>
          )}
          {o.brief && (
            <div>
              <span className={STEP_CHIP}>Brief</span>
              <p className="text-caption text-gray-700 leading-relaxed">{o.brief}</p>
            </div>
          )}
          {o.reallocation && (
            <div className="border-t border-gray-100 pt-3">
              <span className={STEP_CHIP}>Reallocation</span>
              <p className="text-caption text-gray-700 leading-relaxed">{o.reallocation}</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

function OpportunityRadarModule({ data }) {
  const narratives = data.narratives || []
  return (
    <section id="module-opportunity-radar">
      <SectionHeader
        title="Opportunity Radar"
        sub="Commercial narratives \u2014 signal, adjacency, demographic, product, brief, and media reallocation"
      />
      <div className="space-y-4">
        {narratives.map((o) => (
          <CommercialNarrativeCard key={o.id} o={o} />
        ))}
      </div>
    </section>
  )
}

// ---- Module registry --------------------------------------------------------

const MODULE_REGISTRY = {
  TopCocktails: TopCocktailsModule,
  FlavourRadar: FlavourRadarModule,
  LuxuryVenues: LuxuryVenuesModule,
  Presentation: PresentationModule,
  TrendArc: TrendArcModule,
  CategorySnapshot: CategorySnapshotModule,
  CompetitorWatch: CompetitorWatchModule,
  MarketIntel: MarketIntelModule,
  DemographicsLens: DemographicsLensModule,
  OpportunityRadar: OpportunityRadarModule,
}

// ---- Profile hero (sits inside main Layout content area) --------------------

function ProfileHero({ profile }) {
  const modules = profile.modules || []
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })

  return (
    <div className="mb-10">
      {/* Navy editorial hero card */}
      <div className="bg-navy rounded-bento overflow-hidden shadow-sm">
        <div className="px-6 py-7 sm:px-8 sm:py-8 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-label text-gold uppercase tracking-wider">Client Intelligence</span>
              <span className="text-gray-400">/</span>
              <span className="text-label text-gray-300 uppercase tracking-wider">{profile.archetype || 'Profile'}</span>
            </div>
            <h1 className="text-page font-display text-white leading-tight">
              {profile.client?.name} \u2014 {profile.meta?.profileTitle}
            </h1>
            <p className="text-body text-gray-300 mt-2 max-w-2xl leading-relaxed">{profile.meta?.subtitle}</p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <span className="text-caption text-gray-300">Data: {profile.meta?.dataFreshness}</span>
            <a
              href={`mailto:${profile.meta?.contactEmail}?subject=${encodeURIComponent((profile.client?.name || '') + ' \u2014 Follow-up')}`}
              className="text-caption bg-gold hover:bg-gold-light text-navy font-semibold px-3 py-1.5 rounded-bento transition-colors"
            >
              Contact Liquid
            </a>
          </div>
        </div>
      </div>

      {/* In-page section nav */}
      <nav className="mt-4 flex gap-5 overflow-x-auto pb-1">
        {modules.map((m, i) => {
          const labelMap = {
            TopCocktails: 'Top Cocktails', FlavourRadar: 'Flavours', LuxuryVenues: 'Venues',
            Presentation: 'Theatre', TrendArc: 'Trend Arc', CategorySnapshot: 'Category',
            CompetitorWatch: 'Competitors', MarketIntel: 'Markets', DemographicsLens: 'Demographics',
            OpportunityRadar: 'Radar',
          }
          const id = `module-${m.type.toLowerCase().replace(/([A-Z])/g, '-$1').replace(/^-/, '').toLowerCase()}`
          return (
            <button
              key={i}
              onClick={() => scrollTo(id)}
              className="text-caption font-medium text-gray-600 hover:text-navy whitespace-nowrap transition-colors"
            >
              {labelMap[m.type] || m.type}
            </button>
          )
        })}
      </nav>
    </div>
  )
}

// ---- 404 fallback -----------------------------------------------------------

function ProfileNotFound({ slug }) {
  return (
    <div className="text-navy flex items-center justify-center py-20 px-4">
      <div className="text-center">
        <p className="text-6xl font-display text-gray-300 mb-4">404</p>
        <p className="text-section font-display text-navy mb-2">Profile not found</p>
        <p className="text-body text-gray-600 mb-6">No profile registered for &ldquo;{slug}&rdquo;</p>
        <div className="flex gap-4 justify-center">
          <Link to="/profiles" className="text-body text-editorial hover:text-navy">
            View all profiles \u2192
          </Link>
          <Link to="/" className="text-body text-gray-600 hover:text-navy">
            Back to dashboard
          </Link>
        </div>
      </div>
    </div>
  )
}

// ---- Main exported component ------------------------------------------------

/**
 * ClientProfile receives a `profile` prop (the default export from a profile data file).
 * App.jsx passes this after lazy-loading the correct profile module.
 * Rendered inside the main Layout — so sidebar appears automatically.
 */
export default function ClientProfile({ profile, slug }) {
  if (!profile) {
    return <ProfileNotFound slug={slug} />
  }

  const modules = profile.modules || []

  return (
    <div className="text-navy font-body">
      <ProfileHero profile={profile} />
      <div className="space-y-12">
        {modules.map((mod, i) => {
          const id = `module-${mod.type.toLowerCase().replace(/([A-Z])/g, '-$1').replace(/^-/, '').toLowerCase()}`
          const ModuleComponent = MODULE_REGISTRY[mod.type]
          if (!ModuleComponent) {
            return (
              <section key={i} id={id}>
                <p className="text-caption text-gray-500">Module type &ldquo;{mod.type}&rdquo; not registered.</p>
              </section>
            )
          }
          return (
            <div key={i} id={id}>
              <ModuleComponent data={mod.data} profile={profile} />
            </div>
          )
        })}

        <footer className="border-t border-gray-200 pt-6 pb-2 text-center">
          <p className="text-caption text-gray-600">
            Sources: {profile.meta?.sourcedFrom}
          </p>
          <p className="text-caption text-gray-500 mt-2">
            Prepared by Liquid Economy \u00b7 {profile.meta?.lastUpdated} \u00b7{' '}
            <a href={`mailto:${profile.meta?.contactEmail}`} className="underline hover:text-navy">
              {profile.meta?.contactEmail}
            </a>
          </p>
          <p className="text-caption text-gray-400 mt-1">
            <Link to="/profiles" className="hover:text-navy transition-colors">All profiles</Link>
            {' \u00b7 '}
            <Link to="/" className="hover:text-navy transition-colors">Liquid Economy dashboard</Link>
          </p>
          <p className="text-caption text-gray-400 mt-3">Powered by Liquid Agency \u00b7 Drinks Industry Intelligence</p>
        </footer>
      </div>
    </div>
  )
}
