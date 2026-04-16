/**
 * ClientProfile.jsx
 * Generic profile renderer for Liquid Economy client profiles.
 * Iterates profile.modules and renders via a component registry.
 *
 * Supports archetypes: use-case, brand-owner, regional
 * Routes: /p/:slug
 */

import React, { useState } from 'react'
import { Link } from 'react-router-dom'

// ---- Primitive components ----------------------------------------------------

const Badge = ({ label, colour }) => (
  <span
    className="inline-block text-caption font-medium px-2 py-0.5 rounded-full"
    style={{ background: colour + '18', color: colour, border: `1px solid ${colour}33` }}
  >{label}</span>
)

const Card = ({ children, className = '', style = {} }) => (
  <div
    className={`bg-white border border-gray-200 rounded-bento p-5 shadow-sm ${className}`}
    style={style}
  >
    {children}
  </div>
)

const SectionHeader = ({ title, sub, linkTo }) => (
  <div className="mb-5 flex items-start justify-between gap-4">
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

const trendColour = (t = '') => {
  if (t.includes('rising') || t.includes('+')) return '#38A169'
  if (t.includes('dominant') || t.includes('stable')) return '#2B6CB0'
  if (t.includes('decline') || t.includes('caution') || t.includes('\u2212')) return '#C53030'
  if (t.includes('watch')) return '#DD6B20'
  return '#6B7280'
}

// ---- MODULE: TopCocktails ---------------------------------------------------

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
  const tc = (t) => {
    if (t === 'rising' || t === 'fast-rising') return '#38A169'
    if (t === 'stable-dominant' || t === 'dominant' || t === 'dominant-consumer') return '#2B6CB0'
    if (t === 'stable') return '#6B7280'
    if (t === 'fatigue') return '#C53030'
    if (t === 'resurgent' || t === 'established-growing') return '#C9A96E'
    return '#6B7280'
  }
  return (
    <section id="module-top-cocktails">
      <SectionHeader
        title="Top 20 Cocktails \u2014 Global Ranking 2024\u20132026"
        sub="Sources: Drinks International World\u2019s 50 Best Bars Brand Report \u00b7 Difford\u2019s Guide (700k+ monthly searches) \u00b7 IWSR"
        linkTo="/categories?category=cocktails"
      />
      <Card className="overflow-x-auto p-0">
        <table className="w-full text-body">
          <thead>
            <tr className="border-b border-gray-200 text-left text-label text-gray-500 uppercase tracking-wide bg-gray-50">
              <th className="px-4 py-3">#</th>
              <th className="px-4 py-3">Cocktail</th>
              <th className="px-4 py-3 hidden sm:table-cell">Spirit Base</th>
              <th className="px-4 py-3 hidden md:table-cell">DI Rank</th>
              <th className="px-4 py-3">Trend</th>
              <th className="px-4 py-3 hidden md:table-cell">Move</th>
            </tr>
          </thead>
          <tbody>
            {cocktails.map((c) => (
              <React.Fragment key={c.rank}>
                <tr
                  className="border-b border-gray-100 hover:bg-surface cursor-pointer transition-colors"
                  onClick={() => setExpanded(expanded === c.rank ? null : c.rank)}
                >
                  <td className="px-4 py-3 text-gray-500 font-mono text-caption">{c.rank}</td>
                  <td className="px-4 py-3">
                    <span className="font-semibold text-navy">{c.name}</span>
                    <span className="ml-2 text-caption text-gray-500">{c.type}</span>
                  </td>
                  <td className="px-4 py-3 text-gray-700 hidden sm:table-cell text-caption">{c.spiritBase}</td>
                  <td className="px-4 py-3 text-gray-600 hidden md:table-cell text-caption">{c.diRank}</td>
                  <td className="px-4 py-3">
                    <Badge label={trendLabel(c.trend)} colour={tc(c.trend)} />
                  </td>
                  <td className="px-4 py-3 text-gray-600 hidden md:table-cell text-caption">{c.rankMove}</td>
                </tr>
                {expanded === c.rank && (
                  <tr className="bg-amber-50">
                    <td colSpan={6} className="px-4 py-3 text-caption text-amber-900 italic">{c.note}</td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </Card>
      <p className="text-caption text-gray-500 mt-2">Tap any row for analyst note. DI = Drinks International survey of 100 elite bars.</p>
    </section>
  )
}

// ---- MODULE: FlavourRadar ---------------------------------------------------

function FlavourRadarModule({ data }) {
  const families = data.families || []
  const tc = (t) => {
    if (t === 'rising' || t === 'fast-rising') return '#38A169'
    if (t === 'stable-dominant' || t === 'dominant' || t === 'dominant-consumer') return '#2B6CB0'
    if (t === 'fatigue') return '#C53030'
    if (t === 'resurgent' || t === 'established-growing' || t === 'leading') return '#C9A96E'
    return '#6B7280'
  }
  return (
    <section id="module-flavour-radar">
      <SectionHeader
        title="Flavour Families \u2014 2025\u20132026 Intelligence"
        sub="Sources: Bacardi Cocktail Trends Report \u00b7 Tales of the Cocktail 2025 \u00b7 W50B menu analysis"
        linkTo="/categories"
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {families.map((f) => (
          <Card key={f.id}>
            <div className="flex items-start justify-between mb-3">
              <div>
                <span className="text-lg mr-2">{f.icon}</span>
                <span className="font-semibold text-navy">{f.name}</span>
              </div>
              <Badge label={f.trend.replace('-', ' ').replace(/^\w/, c => c.toUpperCase())} colour={tc(f.trend)} />
            </div>
            <p className="text-caption text-emerald-700 font-semibold mb-1">{f.growthSignal}</p>
            <p className="text-caption text-gray-600 mb-3">{f.penetration}</p>
            <div className="mb-3">
              <p className="text-caption font-semibold text-gray-700 mb-1">Key ingredients</p>
              <div className="flex flex-wrap gap-1">
                {(f.ingredients || []).slice(0, 5).map((i) => (
                  <span key={i} className="text-caption bg-surface text-gray-700 border border-gray-200 px-2 py-0.5 rounded">{i}</span>
                ))}
              </div>
            </div>
            {f.eventApplication && (
              <div className="border-t border-gray-200 pt-3 mt-3">
                <p className="text-caption font-semibold text-editorial mb-1">Application</p>
                <p className="text-caption text-gray-700 leading-relaxed">{f.eventApplication}</p>
              </div>
            )}
          </Card>
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
        sub="Signature cocktails, pricing bands &amp; theatre at elite global venues"
        linkTo="/venues"
      />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {venues.map((v, i) => (
          <Card key={i} className="cursor-pointer hover:border-gold hover:shadow-md transition-all" onClick={() => setExpanded(expanded === i ? null : i)}>
            <div className="flex items-start justify-between mb-2">
              <div>
                <p className="font-semibold text-navy">{v.venue}</p>
                <p className="text-caption text-gray-600">{v.location}</p>
              </div>
              <Badge label={v.tier} colour="#2B6CB0" />
            </div>
            <p className="text-body text-gray-700 mb-2">{v.signatureCocktail}</p>
            <div className="flex gap-4 text-caption text-gray-600">
              <span>Standard: <span className="text-navy font-medium">{v.avgCostPerServe}</span></span>
            </div>
            {expanded === i && (
              <div className="mt-3 border-t border-gray-200 pt-3 space-y-1.5">
                <p className="text-caption text-gray-600"><span className="text-navy font-semibold">Dominant brand:</span> {v.dominantBrand}</p>
                <p className="text-caption text-gray-600"><span className="text-navy font-semibold">Theatre:</span> {v.theatre}</p>
                <p className="text-caption text-gray-500 italic">{v.source}</p>
              </div>
            )}
          </Card>
        ))}
      </div>
      <p className="text-caption text-gray-500 mt-2">Tap any card for full detail.</p>
    </section>
  )
}

// ---- MODULE: Presentation --------------------------------------------------

function PresentationModule({ data }) {
  return (
    <section id="module-presentation">
      <SectionHeader
        title="Presentation &amp; Theatre Library"
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
                <p className="text-caption mt-1"><span className="text-gold font-semibold">Luxury signal:</span> <span className="text-gray-700">{ice.luxurySignal}</span></p>
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
                  <Badge label={g.signalLevel} colour="#C9A96E" />
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
        sub="Six eras of luxury on-premise evolution \u00b7 Source: Drinks International, Difford\u2019s Guide, IWSR, W50B"
        linkTo="/categories"
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 mb-8">
        {eras.map((era) => (
          <Card key={era.id} style={{ borderTopColor: era.accentColour, borderTopWidth: '3px' }}>
            <div className="mb-3">
              <span className="text-label uppercase tracking-wider" style={{ color: era.accentColour }}>{era.label}</span>
              <p className="text-body-lg font-display text-navy mt-0.5">{era.subtitle}</p>
            </div>
            <div className="mb-3">
              <p className="text-caption font-semibold text-gray-600 mb-1.5">Dominant cocktails</p>
              <div className="flex flex-wrap gap-1">
                {(era.dominantCocktails || []).slice(0, 5).map((c) => (
                  <span key={c} className="text-caption bg-surface text-gray-700 border border-gray-200 px-2 py-0.5 rounded-full">{c}</span>
                ))}
              </div>
            </div>
            <p className="text-caption text-gray-600 leading-relaxed mb-2">{era.culturalMoment}</p>
            <div className="border-t border-gray-200 pt-2 mt-2">
              <p className="text-caption font-semibold text-editorial mb-0.5">Luxury behaviour</p>
              <p className="text-caption text-gray-700 leading-relaxed">{era.luxuryBehaviour}</p>
            </div>
          </Card>
        ))}
      </div>
      {findings.length > 0 && (
        <div className="mb-3">
          <h3 className="text-subsection font-display text-navy mb-3">Three Surprising Findings</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {findings.map((f) => (
              <Card key={f.id} style={{ borderLeftColor: f.colour, borderLeftWidth: '3px' }}>
                <p className="text-body font-semibold mb-2" style={{ color: f.colour }}>{f.headline}</p>
                <p className="text-caption text-gray-700 leading-relaxed">{f.detail}</p>
              </Card>
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
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
        {(data.subCategories || []).map((sc, i) => (
          <Card key={i} style={{ borderLeftColor: trendColour(sc.trend), borderLeftWidth: '3px' }}>
            <div className="flex items-start justify-between mb-2">
              <p className="font-semibold text-navy">{sc.name}</p>
              <Badge label={sc.share} colour={trendColour(sc.trend)} />
            </div>
            <p className="text-caption text-emerald-700 font-semibold mb-1">{sc.trend}</p>
            <p className="text-caption text-gray-600 leading-relaxed">{sc.notes}</p>
          </Card>
        ))}
      </div>
      {(data.regionalSignals || []).length > 0 && (
        <div>
          <h3 className="text-subsection font-display text-navy mb-3">Regional Signals</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3">
            {data.regionalSignals.map((r, i) => {
              const col = r.direction === 'opportunity' ? '#38A169' : r.direction === 'caution' ? '#C53030' : '#DD6B20'
              return (
                <Card key={i} style={{ borderTopColor: col, borderTopWidth: '3px' }}>
                  <p className="font-semibold text-navy mb-1">{r.market}</p>
                  <p className="text-caption text-gray-600 leading-relaxed">{r.signal}</p>
                </Card>
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
        sub="Brand-level positioning and threat signals \u00b7 Volume data gap flagged (see fitness review Q10)"
        linkTo="/competitors"
      />
      {data.note && (
        <div className="mb-4 px-4 py-3 rounded-bento bg-amber-50 border border-amber-200">
          <p className="text-caption text-amber-800">{data.note}</p>
        </div>
      )}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {(data.competitors || []).map((c) => (
          <Card key={c.name} style={{ borderLeftColor: c.colour, borderLeftWidth: '3px' }}>
            <div className="flex items-start justify-between mb-2">
              <p className="font-semibold text-navy">{c.name}</p>
              <span className="text-caption text-gray-500">{c.owner}</span>
            </div>
            <p className="text-caption text-gray-700 mb-2">{c.positioning}</p>
            <p className="text-caption text-gray-600 mb-1"><span className="text-gold font-semibold">Threat:</span> {c.threat}</p>
            <p className="text-caption text-gray-600"><span className="text-editorial font-semibold">Signal:</span> {c.signal}</p>
          </Card>
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
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {(data.markets || []).map((m) => (
          <Card key={m.name} style={{ borderTopColor: m.colour, borderTopWidth: '3px' }}>
            <div className="flex items-start justify-between mb-3">
              <div>
                <p className="font-semibold text-navy">{m.name}</p>
                <p className="text-caption text-emerald-700 font-semibold mt-0.5">{m.signal}</p>
              </div>
            </div>
            <div className="space-y-1.5 mb-3">
              {(m.metrics || []).map((metric, i) => (
                <div key={i} className="flex items-start justify-between text-caption">
                  <span className="text-gray-500">{metric.label}</span>
                  <span className="text-navy font-medium text-right ml-2">{metric.value}</span>
                </div>
              ))}
            </div>
            <div className="border-t border-gray-200 pt-3">
              <p className="text-caption text-editorial font-semibold mb-1">Recommendation</p>
              <p className="text-caption text-gray-700 leading-relaxed">{m.recommendation}</p>
            </div>
            {m.linkTo && (
              <Link to={m.linkTo} className="text-caption text-gray-500 hover:text-editorial mt-2 block transition-colors">
                Full geographic data \u2192
              </Link>
            )}
          </Card>
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
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {(data.highlights || []).map((h) => (
          <Card key={h.segment} style={{ borderLeftColor: h.colour, borderLeftWidth: '3px' }}>
            <p className="font-semibold text-navy mb-1">{h.segment}</p>
            <p className="text-caption text-emerald-700 font-semibold mb-2">{h.signal}</p>
            <p className="text-caption text-gray-600 leading-relaxed mb-2">{h.detail}</p>
            <div className="border-t border-gray-200 pt-2">
              <p className="text-caption font-semibold text-editorial mb-0.5">Relevance</p>
              <p className="text-caption text-gray-700 leading-relaxed">{h.relevance}</p>
            </div>
          </Card>
        ))}
      </div>
    </section>
  )
}

// ---- MODULE: OpportunityRadar (CommercialNarrativeCard) ---------------------

const STEP_CHIP = "inline-block text-label uppercase tracking-wider px-2 py-0.5 rounded-full bg-navy text-white mb-1.5"

function CommercialNarrativeCard({ o }) {
  const [open, setOpen] = useState(false)
  return (
    <Card style={{ borderLeftColor: o.colour || '#1A1F36', borderLeftWidth: '4px' }}>
      <div
        className="flex items-start justify-between cursor-pointer"
        onClick={() => setOpen(!open)}
      >
        <div className="flex-1">
          <span className={STEP_CHIP} style={{ background: '#C9A96E', color: '#1A1F36' }}>Signal</span>
          <h3 className="text-subsection font-display text-navy mt-1">{o.signal}</h3>
          {o.urgency && (
            <p className="text-caption text-accent-red font-semibold mt-0.5">{o.urgency.split(' \u2014')[0]}</p>
          )}
        </div>
        <span className="text-gray-400 ml-3 mt-1 text-body">{open ? '\u25b2' : '\u25bc'}</span>
      </div>

      {/* Always-visible summary */}
      <p className="text-caption text-gray-700 leading-relaxed mt-2">{o.signalDetail}</p>

      {/* Expanded: full six-step template */}
      {open && (
        <div className="mt-4 space-y-4 border-t border-gray-200 pt-4">
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
            <div className="border-t border-gray-200 pt-3">
              <span className={STEP_CHIP} style={{ background: '#C9A96E', color: '#1A1F36' }}>Reallocation</span>
              <p className="text-caption text-gray-700 leading-relaxed">{o.reallocation}</p>
            </div>
          )}
        </div>
      )}
    </Card>
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

// ---- Profile header ---------------------------------------------------------

function ProfileHeader({ profile }) {
  const modules = profile.modules || []
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <header className="border-b border-gray-200 bg-white/95 sticky top-0 z-30 backdrop-blur">
      {/* Navy editorial strip */}
      <div className="bg-navy">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <Link to="/" className="text-label text-gold uppercase tracking-wider hover:text-gold-light transition-colors">
                Liquid Economy
              </Link>
              <span className="text-gray-400">/</span>
              <span className="text-label text-gray-300 uppercase tracking-wider">Client Intelligence</span>
            </div>
            <h1 className="text-page font-display text-white mt-1">
              {profile.client?.name} \u2014 {profile.meta?.profileTitle}
            </h1>
            <p className="text-caption text-gray-300 mt-1">{profile.meta?.subtitle}</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-caption text-gray-300">Data: {profile.meta?.dataFreshness}</span>
            <a
              href={`mailto:${profile.meta?.contactEmail}?subject=${encodeURIComponent(profile.name + ' \u2014 Follow-up')}`}
              className="text-caption bg-gold hover:bg-gold-light text-navy font-semibold px-3 py-1.5 rounded-bento transition-colors"
            >
              Contact Liquid
            </a>
          </div>
        </div>
      </div>
      {/* Section nav */}
      <nav className="max-w-7xl mx-auto px-4 py-2 flex gap-5 overflow-x-auto">
        {modules.map((m, i) => {
          const labelMap = {
            TopCocktails: 'Top Cocktails', FlavourRadar: 'Flavours', LuxuryVenues: 'Venues',
            Presentation: 'Theatre', TrendArc: 'Trend Arc', CategorySnapshot: 'Category',
            CompetitorWatch: 'Competitors', MarketIntel: 'Markets', DemographicsLens: 'Demographics',
            OpportunityRadar: 'Radar',
          }
          return (
            <button
              key={i}
              onClick={() => scrollTo(`module-${m.type.toLowerCase().replace(/([A-Z])/g, '-$1').replace(/^-/, '').toLowerCase()}`)}
              className="text-caption font-medium text-gray-600 hover:text-navy whitespace-nowrap transition-colors"
            >
              {labelMap[m.type] || m.type}
            </button>
          )
        })}
      </nav>
    </header>
  )
}

// ---- 404 fallback -----------------------------------------------------------

function ProfileNotFound({ slug }) {
  return (
    <div className="min-h-screen bg-surface text-navy flex items-center justify-center px-4">
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
 */
export default function ClientProfile({ profile, slug }) {
  if (!profile) {
    return <ProfileNotFound slug={slug} />
  }

  const modules = profile.modules || []

  return (
    <div className="min-h-screen bg-surface text-navy font-body">
      <ProfileHeader profile={profile} />
      <main className="max-w-7xl mx-auto px-4 py-8 space-y-14">
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

        <footer className="border-t border-gray-200 pt-6 pb-10 text-center">
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
      </main>
    </div>
  )
}
