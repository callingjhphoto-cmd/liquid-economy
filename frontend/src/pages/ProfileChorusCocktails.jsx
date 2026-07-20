import React, { useState } from 'react'
import {
  top20Cocktails, flavourFamilies, luxuryVenueIntel,
  presentationTheatre, opportunityRadar, profileMeta, twentyYearArc
} from '../data/profileChorusCocktails'

// ---- Shared primitives -------------------------------------------------------

const Badge = ({ label, colour }) => (
  <span
    className="inline-block text-caption font-medium px-2 py-0.5 rounded-full"
    style={{ background: colour + '18', color: colour, border: `1px solid ${colour}33` }}
  >{label}</span>
)

const SectionHeader = ({ title, sub }) => (
  <div className="mb-5">
    <h2 className="text-section font-display text-navy">{title}</h2>
    {sub && <p className="text-caption text-gray-600 mt-1">{sub}</p>}
  </div>
)

const Card = ({ children, className = '', style = {} }) => (
  <div className={`bg-white border border-gray-200 rounded-bento p-5 shadow-sm ${className}`} style={style}>
    {children}
  </div>
)

const trendColour = (t) => {
  if (t === 'rising' || t === 'fast-rising') return '#38A169'
  if (t === 'stable-dominant' || t === 'dominant' || t === 'dominant-consumer') return '#2B6CB0'
  if (t === 'stable') return '#6B7280'
  if (t === 'fatigue') return '#C53030'
  if (t === 'resurgent' || t === 'established-growing') return '#C9A96E'
  return '#6B7280'
}

const trendLabel = (t) => {
  const map = {
    'rising': 'Rising', 'fast-rising': 'Fast Rising', 'stable-dominant': 'Dominant',
    'dominant': 'Dominant', 'dominant-consumer': 'Consumer #1', 'stable': 'Stable',
    'fatigue': 'Fatigue', 'resurgent': 'Resurgent', 'established-growing': 'Established'
  }
  return map[t] || t
}

// ---- Module 1: Top 20 Table --------------------------------------------------

const Module1 = () => {
  const [expanded, setExpanded] = useState(null)
  return (
    <section id="top20">
      <SectionHeader
        title={"Top 20 Cocktails — Global Ranking 2024–2026"}
        sub={"Sources: Drinks International World’s 50 Best Bars Brand Report · Difford’s Guide (700k+ monthly searches) · IWSR"}
      />
      <Card className="overflow-x-auto p-0">
        <table className="w-full text-body">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50 text-left text-label text-gray-500 uppercase tracking-wide">
              <th className="px-4 py-3">#</th>
              <th className="px-4 py-3">Cocktail</th>
              <th className="px-4 py-3 hidden sm:table-cell">Spirit Base</th>
              <th className="px-4 py-3 hidden md:table-cell">DI Rank</th>
              <th className="px-4 py-3 hidden lg:table-cell">Difford&rsquo;s</th>
              <th className="px-4 py-3">Trend</th>
              <th className="px-4 py-3 hidden md:table-cell">Move</th>
            </tr>
          </thead>
          <tbody>
            {top20Cocktails.map((c) => (
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
                  <td className="px-4 py-3 text-gray-600 hidden lg:table-cell text-caption">{c.diffordsRank}</td>
                  <td className="px-4 py-3">
                    <Badge label={trendLabel(c.trend)} colour={trendColour(c.trend)} />
                  </td>
                  <td className="px-4 py-3 text-gray-600 hidden md:table-cell text-caption">{c.rankMove}</td>
                </tr>
                {expanded === c.rank && (
                  <tr className="bg-amber-50">
                    <td colSpan={7} className="px-4 py-3 text-caption text-amber-900 italic">{c.note}</td>
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

// ---- Module 2: Flavour Family Cards -----------------------------------------

const Module2 = () => (
  <section id="flavours">
    <SectionHeader
      title={"Flavour Families — 2025–2026 Intelligence"}
      sub={"Sources: Bacardi Cocktail Trends Report · Tales of the Cocktail 2025 · W50B menu analysis"}
    />
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
      {flavourFamilies.map((f) => (
        <Card key={f.id}>
          <div className="flex items-start justify-between mb-3">
            <div>
              <span className="text-lg mr-2">{f.icon}</span>
              <span className="font-semibold text-navy">{f.name}</span>
            </div>
            <Badge
              label={(f.trend || '').replace('-', ' ').replace(/^\w/, c => c.toUpperCase())}
              colour={trendColour(f.trend)}
            />
          </div>
          <p className="text-caption text-emerald-700 font-semibold mb-1">{f.growthSignal}</p>
          <p className="text-caption text-gray-600 mb-3">{f.penetration}</p>
          <div className="mb-3">
            <p className="text-caption font-semibold text-gray-700 mb-1">Key ingredients</p>
            <div className="flex flex-wrap gap-1">
              {f.ingredients.slice(0, 5).map((i) => (
                <span key={i} className="text-caption bg-surface border border-gray-200 text-gray-700 px-2 py-0.5 rounded">{i}</span>
              ))}
            </div>
          </div>
          <div className="border-t border-gray-200 pt-3 mt-3">
            <p className="text-caption font-semibold text-editorial mb-1">Chorus application</p>
            <p className="text-caption text-gray-700 leading-relaxed">{f.eventApplication}</p>
          </div>
        </Card>
      ))}
    </div>
  </section>
)

// ---- Module 3: Luxury Venue Intel -------------------------------------------

const Module3 = () => {
  const [expanded, setExpanded] = useState(null)
  return (
    <section id="venues">
      <SectionHeader
        title="Luxury Venue Intelligence"
        sub="Signature cocktails, pricing bands &amp; theatre at elite global venues"
      />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {luxuryVenueIntel.map((v, i) => (
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
              <span className="hidden sm:inline">Vintage: <span className="text-navy font-medium">{v.vintageOption}</span></span>
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
      <p className="text-caption text-gray-500 mt-2">Tap any card for full detail including dominant brand &amp; theatre format.</p>
    </section>
  )
}

// ---- Module 4: Presentation & Theatre ---------------------------------------

const Module4 = () => (
  <section id="theatre">
    <SectionHeader
      title="Presentation &amp; Theatre Library"
      sub="Ice programme, glassware specs, and activation formats. Source: [R8] Cocktail Presentation Deep Research"
    />
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Ice */}
      <Card>
        <h3 className="text-subsection font-display text-navy mb-3">Ice Programme</h3>
        <div className="space-y-3">
          {(presentationTheatre.iceProgramme || []).map((ice, i) => (
            <div key={i} className="border-b border-gray-100 pb-3 last:border-0 last:pb-0">
              <p className="text-body font-semibold text-navy">{ice.format}</p>
              <p className="text-caption text-gray-600 mt-0.5">{ice.specialist}</p>
              <p className="text-caption text-gray-700 mt-1">{ice.why}</p>
              <p className="text-caption mt-1"><span className="text-gold font-semibold">Luxury signal:</span> <span className="text-gray-700">{ice.luxurySignal}</span></p>
            </div>
          ))}
        </div>
      </Card>

      {/* Glassware */}
      <Card>
        <h3 className="text-subsection font-display text-navy mb-3">Glassware Hierarchy</h3>
        <div className="space-y-3">
          {(presentationTheatre.glassware || []).map((g, i) => (
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

      {/* Theatre Formats */}
      <Card>
        <h3 className="text-subsection font-display text-navy mb-3">Activation Formats</h3>
        <div className="space-y-3">
          {(presentationTheatre.theatreFormats || []).map((t, i) => (
            <div key={i} className="border-b border-gray-100 pb-3 last:border-0 last:pb-0">
              <p className="text-body font-semibold text-navy">{t.name}</p>
              <p className="text-caption text-gray-600 mt-0.5 leading-relaxed">{t.description}</p>
              <p className="text-caption mt-1.5">
                <span className="text-editorial font-semibold">For Chorus: </span>
                <span className="text-gray-700">{t.suitabilityForChorus}</span>
              </p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  </section>
)

// ---- Module 5: 20-Year Trend Arc --------------------------------------------

const Module5 = () => (
  <section id="trend-arc">
    <SectionHeader
      title={"20-Year Cocktail Trend Arc — 2006–2026"}
      sub={"Six eras of luxury on-premise evolution · Source: Drinks International, Difford’s Guide, IWSR, World’s 50 Best Bars, Tales of the Cocktail, CGA by NIQ"}
    />

    {/* Era timeline cards */}
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 mb-8">
      {twentyYearArc.eras.map((era) => (
        <Card key={era.id} style={{ borderTopColor: era.accentColour, borderTopWidth: '3px' }}>
          <div className="mb-3">
            <span className="text-label uppercase tracking-wider" style={{ color: era.accentColour }}>{era.label}</span>
            <p className="text-body-lg font-display text-navy mt-0.5">{era.subtitle}</p>
          </div>
          <div className="mb-3">
            <p className="text-caption font-semibold text-gray-600 mb-1.5">Dominant cocktails</p>
            <div className="flex flex-wrap gap-1">
              {(era.dominantCocktails || []).slice(0, 5).map((c) => (
                <span key={c} className="text-caption bg-surface border border-gray-200 text-gray-700 px-2 py-0.5 rounded-full">{c}</span>
              ))}
            </div>
          </div>
          <p className="text-caption text-gray-600 leading-relaxed mb-2">{era.culturalMoment}</p>
          <div className="border-t border-gray-200 pt-2 mt-2">
            <p className="text-caption font-semibold text-editorial mb-0.5">Luxury behaviour</p>
            <p className="text-caption text-gray-700 leading-relaxed">{era.luxuryBehaviour}</p>
          </div>
          <p className="text-caption text-gray-500 mt-2 italic">{era.flavourProfile}</p>
        </Card>
      ))}
    </div>

    {/* Three surprising findings */}
    <div className="mb-3">
      <h3 className="text-subsection font-display text-navy mb-3">Three Surprising Findings</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {(twentyYearArc.surprisingFindings || []).map((f) => (
          <Card key={f.id} style={{ borderLeftColor: f.colour, borderLeftWidth: '3px' }}>
            <p className="text-body font-semibold mb-2" style={{ color: f.colour }}>{f.headline}</p>
            <p className="text-caption text-gray-700 leading-relaxed">{f.detail}</p>
          </Card>
        ))}
      </div>
    </div>
  </section>
)

// ---- Module 6: Opportunity Radar --------------------------------------------

const STEP_CHIP = "inline-block text-label uppercase tracking-wider px-2 py-0.5 rounded-full bg-navy text-white mb-1.5"

const Module6 = () => (
  <section id="opportunity-radar">
    <SectionHeader
      title="Opportunity Radar"
      sub={"Three actionable signals — each with migration path, product, brief, and reallocation logic"}
    />
    <div className="space-y-4">
      {opportunityRadar.map((o) => (
        <Card key={o.id} style={{ borderLeftColor: o.colour, borderLeftWidth: '4px' }}>
          <div className="flex items-start justify-between mb-3">
            <div>
              <span className={STEP_CHIP} style={{ background: '#C9A96E', color: '#1A1F36' }}>Signal</span>
              <h3 className="text-subsection font-display text-navy mt-1">{o.signal}</h3>
            </div>
            <span className="text-caption text-accent-red font-semibold shrink-0 ml-3">{o.urgency.split(' —')[0]}</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-caption text-gray-700 leading-relaxed">
            <div>
              <span className={STEP_CHIP}>Signal</span>
              <p>{o.signalDetail}</p>
            </div>
            <div>
              <span className={STEP_CHIP}>Migration</span>
              <p>{o.migration}</p>
            </div>
            <div>
              <span className={STEP_CHIP}>Product</span>
              <p>{o.product}</p>
            </div>
            <div>
              <span className={STEP_CHIP}>Brief</span>
              <p>{o.brief}</p>
            </div>
          </div>
          <div className="mt-3 pt-3 border-t border-gray-200">
            <span className={STEP_CHIP} style={{ background: '#C9A96E', color: '#1A1F36' }}>Reallocation</span>
            <p className="text-caption text-gray-700 leading-relaxed">{o.reallocation}</p>
          </div>
        </Card>
      ))}
    </div>
  </section>
)

// ---- Page shell -------------------------------------------------------------

const NAV_ITEMS = [
  { id: 'top20', label: 'Top 20' },
  { id: 'flavours', label: 'Flavours' },
  { id: 'venues', label: 'Venues' },
  { id: 'theatre', label: 'Theatre' },
  { id: 'trend-arc', label: 'Trend Arc' },
  { id: 'opportunity-radar', label: 'Radar' },
]

export default function ProfileChorusCocktails() {
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <div className="min-h-screen bg-surface text-navy font-body">
      {/* Header — light editorial (dark band removed to match main site) */}
      <header className="border-b border-gray-200 bg-white/95 sticky top-0 z-30 backdrop-blur">
        <div className="bg-white">
          <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-label text-gold uppercase tracking-wider">Liquid Economy</span>
                <span className="text-gray-300">/</span>
                <span className="text-label text-gray-500 uppercase tracking-wider">Client Intelligence</span>
              </div>
              <h1 className="text-page font-display text-navy mt-1">
                {profileMeta.clientName} {'—'} {profileMeta.profileTitle}
              </h1>
              <p className="text-caption text-gray-600 mt-1">{profileMeta.subtitle}</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-caption text-gray-500">Data: {profileMeta.dataFreshness}</span>
              <a
                href={`mailto:${profileMeta.contactEmail}?subject=Chorus%20Cocktail%20Intelligence%20%E2%80%94%20Follow-up`}
                className="text-caption bg-navy hover:bg-navy-light text-white font-semibold px-3 py-1.5 rounded-bento transition-colors"
              >
                Contact Liquid
              </a>
            </div>
          </div>
        </div>
        {/* Section nav */}
        <nav className="max-w-7xl mx-auto px-4 py-2 flex gap-5 overflow-x-auto">
          {NAV_ITEMS.map((n) => (
            <button
              key={n.id}
              onClick={() => scrollTo(n.id)}
              className="text-caption font-medium text-gray-600 hover:text-navy whitespace-nowrap transition-colors"
            >
              {n.label}
            </button>
          ))}
        </nav>
      </header>

      {/* Body */}
      <main className="max-w-7xl mx-auto px-4 py-8 space-y-14">
        <Module1 />
        <Module2 />
        <Module3 />
        <Module4 />
        <Module5 />
        <Module6 />

        {/* Footer */}
        <footer className="border-t border-gray-200 pt-6 pb-10 text-center">
          <p className="text-caption text-gray-600">
            Sources: {profileMeta.sourcedFrom}
          </p>
          <p className="text-caption text-gray-500 mt-2">
            Prepared by Liquid Economy {'·'} {profileMeta.lastUpdated} {'·'}{' '}
            <a href={`mailto:${profileMeta.contactEmail}`} className="underline hover:text-navy">
              {profileMeta.contactEmail}
            </a>
          </p>
          <p className="text-caption text-gray-400 mt-3">Powered by Liquid Agency {'·'} Drinks Industry Intelligence</p>
        </footer>
      </main>
    </div>
  )
}
