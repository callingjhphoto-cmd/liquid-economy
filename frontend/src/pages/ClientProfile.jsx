/**
 * ClientProfile.jsx
 * Generic profile renderer for Liquid Economy client profiles.
 * Iterates profile.modules and renders via a component registry.
 *
 * Supports archetypes: use-case, brand-owner, regional
 * Routes: /p/:slug
 */

import React, { useState, lazy, Suspense } from 'react'
import { Link } from 'react-router-dom'

// ---- Primitive components ----------------------------------------------------

const Badge = ({ label, colour }) => (
  <span
    className="inline-block text-xs font-medium px-2 py-0.5 rounded-full"
    style={{ background: colour + '22', color: colour, border: `1px solid ${colour}44` }}
  >{label}</span>
)

const Card = ({ children, className = '', style = {} }) => (
  <div
    className={`bg-slate-800/60 border border-slate-700/50 rounded-xl p-5 ${className}`}
    style={style}
  >
    {children}
  </div>
)

const SectionHeader = ({ title, sub, linkTo }) => (
  <div className="mb-5 flex items-start justify-between gap-4">
    <div>
      <h2 className="text-lg font-semibold text-slate-100">{title}</h2>
      {sub && <p className="text-xs text-slate-400 mt-0.5">{sub}</p>}
    </div>
    {linkTo && (
      <Link
        to={linkTo}
        className="text-xs text-sky-400 hover:text-sky-300 whitespace-nowrap shrink-0 mt-0.5 transition-colors"
      >
        See full data \u2192
      </Link>
    )}
  </div>
)

const trendColour = (t = '') => {
  if (t.includes('rising') || t.includes('+')) return '#34d399'
  if (t.includes('dominant') || t.includes('stable')) return '#60a5fa'
  if (t.includes('decline') || t.includes('caution') || t.includes('\u2212')) return '#f87171'
  if (t.includes('watch')) return '#fbbf24'
  return '#94a3b8'
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
    if (t === 'rising' || t === 'fast-rising') return '#34d399'
    if (t === 'stable-dominant' || t === 'dominant' || t === 'dominant-consumer') return '#60a5fa'
    if (t === 'stable') return '#94a3b8'
    if (t === 'fatigue') return '#f87171'
    if (t === 'resurgent' || t === 'established-growing') return '#a78bfa'
    return '#94a3b8'
  }
  return (
    <section id="module-top-cocktails">
      <SectionHeader
        title="Top 20 Cocktails \u2014 Global Ranking 2024\u20132026"
        sub="Sources: Drinks International World\u2019s 50 Best Bars Brand Report \u00b7 Difford\u2019s Guide (700k+ monthly searches) \u00b7 IWSR"
        linkTo="/categories?category=cocktails"
      />
      <Card className="overflow-x-auto p-0">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-700 text-left text-xs text-slate-400 uppercase tracking-wide">
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
                  className="border-b border-slate-700/50 hover:bg-slate-700/30 cursor-pointer transition-colors"
                  onClick={() => setExpanded(expanded === c.rank ? null : c.rank)}
                >
                  <td className="px-4 py-3 text-slate-300 font-mono text-xs">{c.rank}</td>
                  <td className="px-4 py-3">
                    <span className="font-medium text-slate-100">{c.name}</span>
                    <span className="ml-2 text-xs text-slate-500">{c.type}</span>
                  </td>
                  <td className="px-4 py-3 text-slate-300 hidden sm:table-cell text-xs">{c.spiritBase}</td>
                  <td className="px-4 py-3 text-slate-400 hidden md:table-cell text-xs">{c.diRank}</td>
                  <td className="px-4 py-3">
                    <Badge label={trendLabel(c.trend)} colour={tc(c.trend)} />
                  </td>
                  <td className="px-4 py-3 text-slate-400 hidden md:table-cell text-xs">{c.rankMove}</td>
                </tr>
                {expanded === c.rank && (
                  <tr className="bg-slate-900/40">
                    <td colSpan={6} className="px-4 py-3 text-xs text-slate-300 italic">{c.note}</td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </Card>
      <p className="text-xs text-slate-500 mt-2">Tap any row for analyst note. DI = Drinks International survey of 100 elite bars.</p>
    </section>
  )
}

// ---- MODULE: FlavourRadar ---------------------------------------------------

function FlavourRadarModule({ data }) {
  const families = data.families || []
  const tc = (t) => {
    if (t === 'rising' || t === 'fast-rising') return '#34d399'
    if (t === 'stable-dominant' || t === 'dominant' || t === 'dominant-consumer' || t === 'dominant') return '#60a5fa'
    if (t === 'fatigue') return '#f87171'
    if (t === 'resurgent' || t === 'established-growing' || t === 'leading') return '#a78bfa'
    return '#94a3b8'
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
                <span className="font-semibold text-slate-100">{f.name}</span>
              </div>
              <Badge label={f.trend.replace('-', ' ').replace(/^\w/, c => c.toUpperCase())} colour={tc(f.trend)} />
            </div>
            <p className="text-xs text-emerald-400 font-medium mb-1">{f.growthSignal}</p>
            <p className="text-xs text-slate-400 mb-3">{f.penetration}</p>
            <div className="mb-3">
              <p className="text-xs font-medium text-slate-300 mb-1">Key ingredients</p>
              <div className="flex flex-wrap gap-1">
                {(f.ingredients || []).slice(0, 5).map((i) => (
                  <span key={i} className="text-xs bg-slate-700/60 text-slate-300 px-2 py-0.5 rounded">{i}</span>
                ))}
              </div>
            </div>
            {f.eventApplication && (
              <div className="border-t border-slate-700 pt-3 mt-3">
                <p className="text-xs font-medium text-sky-400 mb-1">Application</p>
                <p className="text-xs text-slate-300 leading-relaxed">{f.eventApplication}</p>
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
          <Card key={i} className="cursor-pointer hover:border-slate-600 transition-colors" onClick={() => setExpanded(expanded === i ? null : i)}>
            <div className="flex items-start justify-between mb-2">
              <div>
                <p className="font-semibold text-slate-100">{v.venue}</p>
                <p className="text-xs text-slate-400">{v.location}</p>
              </div>
              <Badge label={v.tier} colour="#60a5fa" />
            </div>
            <p className="text-sm text-slate-300 mb-2">{v.signatureCocktail}</p>
            <div className="flex gap-4 text-xs text-slate-400">
              <span>Standard: <span className="text-slate-200">{v.avgCostPerServe}</span></span>
            </div>
            {expanded === i && (
              <div className="mt-3 border-t border-slate-700 pt-3 space-y-1.5">
                <p className="text-xs text-slate-400"><span className="text-slate-300 font-medium">Dominant brand:</span> {v.dominantBrand}</p>
                <p className="text-xs text-slate-400"><span className="text-slate-300 font-medium">Theatre:</span> {v.theatre}</p>
                <p className="text-xs text-slate-500">{v.source}</p>
              </div>
            )}
          </Card>
        ))}
      </div>
      <p className="text-xs text-slate-500 mt-2">Tap any card for full detail.</p>
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
          <h3 className="text-sm font-semibold text-slate-200 mb-3">Ice Programme</h3>
          <div className="space-y-3">
            {(data.iceProgramme || []).map((ice, i) => (
              <div key={i} className="border-b border-slate-700/50 pb-3 last:border-0 last:pb-0">
                <p className="text-sm font-medium text-slate-200">{ice.format}</p>
                <p className="text-xs text-slate-400 mt-0.5">{ice.specialist}</p>
                <p className="text-xs text-slate-300 mt-1">{ice.why}</p>
                <p className="text-xs mt-1"><span className="text-amber-400">Luxury signal:</span> <span className="text-slate-300">{ice.luxurySignal}</span></p>
              </div>
            ))}
          </div>
        </Card>
        <Card>
          <h3 className="text-sm font-semibold text-slate-200 mb-3">Glassware Hierarchy</h3>
          <div className="space-y-3">
            {(data.glassware || []).map((g, i) => (
              <div key={i} className="border-b border-slate-700/50 pb-3 last:border-0 last:pb-0">
                <div className="flex items-start justify-between">
                  <p className="text-sm font-medium text-slate-200">{g.name}</p>
                  <Badge label={g.signalLevel} colour="#a78bfa" />
                </div>
                <p className="text-xs text-slate-400 mt-0.5">{g.maker}</p>
                <p className="text-xs text-slate-300 mt-1">{g.notes}</p>
              </div>
            ))}
          </div>
        </Card>
        <Card>
          <h3 className="text-sm font-semibold text-slate-200 mb-3">Activation Formats</h3>
          <div className="space-y-3">
            {(data.theatreFormats || []).map((t, i) => (
              <div key={i} className="border-b border-slate-700/50 pb-3 last:border-0 last:pb-0">
                <p className="text-sm font-medium text-slate-200">{t.name}</p>
                <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">{t.description}</p>
                {t.suitabilityForKhorus && (
                  <p className="text-xs mt-1.5">
                    <span className="text-sky-400 font-medium">Application: </span>
                    <span className="text-slate-300">{t.suitabilityForKhorus}</span>
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
          <Card key={era.id} style={{ borderTopColor: era.accentColour, borderTopWidth: '2px' }}>
            <div className="mb-3">
              <span className="text-xs font-bold uppercase tracking-wider" style={{ color: era.accentColour }}>{era.label}</span>
              <p className="text-sm font-semibold text-slate-100 mt-0.5">{era.subtitle}</p>
            </div>
            <div className="mb-3">
              <p className="text-xs font-medium text-slate-400 mb-1.5">Dominant cocktails</p>
              <div className="flex flex-wrap gap-1">
                {(era.dominantCocktails || []).slice(0, 5).map((c) => (
                  <span key={c} className="text-xs bg-slate-700/70 text-slate-300 px-2 py-0.5 rounded-full">{c}</span>
                ))}
              </div>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed mb-2">{era.culturalMoment}</p>
            <div className="border-t border-slate-700 pt-2 mt-2">
              <p className="text-xs font-medium text-sky-400 mb-0.5">Luxury behaviour</p>
              <p className="text-xs text-slate-300 leading-relaxed">{era.luxuryBehaviour}</p>
            </div>
          </Card>
        ))}
      </div>
      {findings.length > 0 && (
        <div className="mb-3">
          <h3 className="text-sm font-semibold text-slate-300 mb-3">Three Surprising Findings</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {findings.map((f) => (
              <Card key={f.id} style={{ borderLeftColor: f.colour, borderLeftWidth: '3px' }}>
                <p className="text-sm font-semibold mb-2" style={{ color: f.colour }}>{f.headline}</p>
                <p className="text-xs text-slate-300 leading-relaxed">{f.detail}</p>
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
              <p className="font-semibold text-slate-100">{sc.name}</p>
              <Badge label={sc.share} colour={trendColour(sc.trend)} />
            </div>
            <p className="text-xs text-emerald-400 font-medium mb-1">{sc.trend}</p>
            <p className="text-xs text-slate-400 leading-relaxed">{sc.notes}</p>
          </Card>
        ))}
      </div>
      {(data.regionalSignals || []).length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-slate-300 mb-3">Regional Signals</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3">
            {data.regionalSignals.map((r, i) => {
              const col = r.direction === 'opportunity' ? '#34d399' : r.direction === 'caution' ? '#f87171' : '#fbbf24'
              return (
                <Card key={i} style={{ borderTopColor: col, borderTopWidth: '2px' }}>
                  <p className="font-semibold text-slate-100 mb-1">{r.market}</p>
                  <p className="text-xs text-slate-400 leading-relaxed">{r.signal}</p>
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
        <div className="mb-4 px-4 py-3 rounded-lg bg-amber-900/20 border border-amber-700/40">
          <p className="text-xs text-amber-300">{data.note}</p>
        </div>
      )}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {(data.competitors || []).map((c) => (
          <Card key={c.name} style={{ borderLeftColor: c.colour, borderLeftWidth: '3px' }}>
            <div className="flex items-start justify-between mb-2">
              <p className="font-semibold text-slate-100">{c.name}</p>
              <span className="text-xs text-slate-500">{c.owner}</span>
            </div>
            <p className="text-xs text-slate-300 mb-2">{c.positioning}</p>
            <p className="text-xs text-slate-500 mb-1"><span className="text-amber-400 font-medium">Threat:</span> {c.threat}</p>
            <p className="text-xs text-slate-500"><span className="text-sky-400 font-medium">Signal:</span> {c.signal}</p>
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
          <Card key={m.name} style={{ borderTopColor: m.colour, borderTopWidth: '2px' }}>
            <div className="flex items-start justify-between mb-3">
              <div>
                <p className="font-semibold text-slate-100">{m.name}</p>
                <p className="text-xs text-emerald-400 font-medium mt-0.5">{m.signal}</p>
              </div>
            </div>
            <div className="space-y-1.5 mb-3">
              {(m.metrics || []).map((metric, i) => (
                <div key={i} className="flex items-start justify-between text-xs">
                  <span className="text-slate-500">{metric.label}</span>
                  <span className="text-slate-200 text-right ml-2">{metric.value}</span>
                </div>
              ))}
            </div>
            <div className="border-t border-slate-700 pt-3">
              <p className="text-xs text-sky-400 font-medium mb-1">Recommendation</p>
              <p className="text-xs text-slate-300 leading-relaxed">{m.recommendation}</p>
            </div>
            {m.linkTo && (
              <Link to={m.linkTo} className="text-xs text-slate-500 hover:text-sky-400 mt-2 block transition-colors">
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
            <p className="font-semibold text-slate-100 mb-1">{h.segment}</p>
            <p className="text-xs text-emerald-400 font-medium mb-2">{h.signal}</p>
            <p className="text-xs text-slate-400 leading-relaxed mb-2">{h.detail}</p>
            <div className="border-t border-slate-700 pt-2">
              <p className="text-xs font-medium text-sky-400 mb-0.5">Eden Mill relevance</p>
              <p className="text-xs text-slate-300 leading-relaxed">{h.relevance}</p>
            </div>
          </Card>
        ))}
      </div>
    </section>
  )
}

// ---- MODULE: OpportunityRadar (CommercialNarrativeCard) ---------------------

function CommercialNarrativeCard({ o }) {
  const [open, setOpen] = useState(false)
  return (
    <Card style={{ borderLeftColor: o.colour, borderLeftWidth: '3px' }}>
      <div
        className="flex items-start justify-between cursor-pointer"
        onClick={() => setOpen(!open)}
      >
        <div className="flex-1">
          <h3 className="text-base font-semibold text-slate-100">{o.signal}</h3>
          <p className="text-xs text-red-400 font-medium mt-0.5">{o.urgency && o.urgency.split(' \u2014')[0]}</p>
        </div>
        <span className="text-slate-500 ml-3 mt-1 text-sm">{open ? '\u25b2' : '\u25bc'}</span>
      </div>

      {/* Always-visible summary */}
      <p className="text-xs text-slate-400 leading-relaxed mt-2">{o.signalDetail}</p>

      {/* Expanded: full six-step template */}
      {open && (
        <div className="mt-4 space-y-4 border-t border-slate-700 pt-4">
          {o.adjacency && (
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-1">Adjacency</p>
              <p className="text-xs text-slate-300 leading-relaxed">{o.adjacency}</p>
            </div>
          )}
          {o.demographic && (
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-1">Demographic</p>
              <p className="text-xs text-slate-300 leading-relaxed">{o.demographic}</p>
            </div>
          )}
          {(o.product || o.migration) && (
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-1">Product Angle</p>
              <p className="text-xs text-slate-300 leading-relaxed">{o.product || o.migration}</p>
            </div>
          )}
          {o.brief && (
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-1">Creative Brief</p>
              <p className="text-xs text-slate-300 leading-relaxed">{o.brief}</p>
            </div>
          )}
          {o.reallocation && (
            <div className="border-t border-slate-700 pt-3">
              <p className="text-xs font-semibold text-amber-400 mb-1">Media Reallocation</p>
              <p className="text-xs text-slate-300 leading-relaxed">{o.reallocation}</p>
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
    <header className="border-b border-slate-800 bg-[#0f172a]/95 sticky top-0 z-30 backdrop-blur">
      <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <Link to="/" className="text-xs font-medium text-sky-400 uppercase tracking-wider hover:text-sky-300 transition-colors">
              Liquid Economy
            </Link>
            <span className="text-slate-600">/</span>
            <span className="text-xs text-slate-500">Client Intelligence</span>
          </div>
          <h1 className="text-xl font-bold text-slate-100 mt-0.5">
            {profile.client?.name} \u2014 {profile.meta?.profileTitle}
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">{profile.meta?.subtitle}</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs text-slate-500">Data: {profile.meta?.dataFreshness}</span>
          <a
            href={`mailto:${profile.meta?.contactEmail}?subject=${encodeURIComponent(profile.name + ' \u2014 Follow-up')}`}
            className="text-xs bg-sky-600 hover:bg-sky-500 text-white px-3 py-1.5 rounded-lg transition-colors"
          >
            Contact Liquid
          </a>
        </div>
      </div>
      {/* Section nav */}
      <nav className="max-w-7xl mx-auto px-4 pb-3 flex gap-4 overflow-x-auto">
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
              className="text-xs text-slate-400 hover:text-slate-200 whitespace-nowrap transition-colors"
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
    <div className="min-h-screen bg-[#0f172a] text-slate-100 flex items-center justify-center px-4">
      <div className="text-center">
        <p className="text-6xl font-bold text-slate-700 mb-4">404</p>
        <p className="text-xl text-slate-400 mb-2">Profile not found</p>
        <p className="text-sm text-slate-600 mb-6">No profile registered for &ldquo;{slug}&rdquo;</p>
        <div className="flex gap-4 justify-center">
          <Link to="/profiles" className="text-sm text-sky-400 hover:text-sky-300">
            View all profiles \u2192
          </Link>
          <Link to="/" className="text-sm text-slate-400 hover:text-slate-300">
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
    <div className="min-h-screen bg-[#0f172a] text-slate-100">
      <ProfileHeader profile={profile} />
      <main className="max-w-7xl mx-auto px-4 py-8 space-y-14">
        {modules.map((mod, i) => {
          const id = `module-${mod.type.toLowerCase().replace(/([A-Z])/g, '-$1').replace(/^-/, '').toLowerCase()}`
          const ModuleComponent = MODULE_REGISTRY[mod.type]
          if (!ModuleComponent) {
            return (
              <section key={i} id={id}>
                <p className="text-xs text-slate-500">Module type &ldquo;{mod.type}&rdquo; not registered.</p>
              </section>
            )
          }
          return (
            <div key={i} id={id}>
              <ModuleComponent data={mod.data} profile={profile} />
            </div>
          )
        })}

        <footer className="border-t border-slate-800 pt-6 pb-10 text-center">
          <p className="text-xs text-slate-500">
            Sources: {profile.meta?.sourcedFrom}
          </p>
          <p className="text-xs text-slate-600 mt-2">
            Prepared by Liquid Economy \u00b7 {profile.meta?.lastUpdated} \u00b7{' '}
            <a href={`mailto:${profile.meta?.contactEmail}`} className="underline hover:text-slate-400">
              {profile.meta?.contactEmail}
            </a>
          </p>
          <p className="text-xs text-slate-700 mt-1">
            <Link to="/profiles" className="hover:text-slate-500 transition-colors">All profiles</Link>
            {' \u00b7 '}
            <Link to="/" className="hover:text-slate-500 transition-colors">Liquid Economy dashboard</Link>
          </p>
        </footer>
      </main>
    </div>
  )
}
