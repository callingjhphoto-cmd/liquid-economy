import React, { useState } from 'react'
import {
  top20Cocktails, flavourFamilies, luxuryVenueIntel,
  presentationTheatre, opportunityRadar, profileMeta, twentyYearArc
} from '../data/profileKhorusCocktails'

// ---- Shared primitives -------------------------------------------------------

const Badge = ({ label, colour }) => (
  <span
    className="inline-block text-xs font-medium px-2 py-0.5 rounded-full"
    style={{ background: colour + '22', color: colour, border: `1px solid ${colour}44` }}
  >{label}</span>
)

const SectionHeader = ({ title, sub }) => (
  <div className="mb-5">
    <h2 className="text-lg font-semibold text-slate-100">{title}</h2>
    {sub && <p className="text-xs text-slate-400 mt-0.5">{sub}</p>}
  </div>
)

const Card = ({ children, className = '' }) => (
  <div className={`bg-slate-800/60 border border-slate-700/50 rounded-xl p-5 ${className}`}>
    {children}
  </div>
)

const trendColour = (t) => {
  if (t === 'rising' || t === 'fast-rising') return '#34d399'
  if (t === 'stable-dominant' || t === 'dominant' || t === 'dominant-consumer') return '#60a5fa'
  if (t === 'stable') return '#94a3b8'
  if (t === 'fatigue') return '#f87171'
  if (t === 'resurgent' || t === 'established-growing') return '#a78bfa'
  return '#94a3b8'
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
        title="Top 20 Cocktails \u2014 Global Ranking 2024\u20132026"
        sub="Sources: Drinks International World\u2019s 50 Best Bars Brand Report \u00b7 Difford\u2019s Guide (700k+ monthly searches) \u00b7 IWSR"
      />
      <Card className="overflow-x-auto p-0">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-700 text-left text-xs text-slate-400 uppercase tracking-wide">
              <th className="px-4 py-3">#</th>
              <th className="px-4 py-3">Cocktail</th>
              <th className="px-4 py-3 hidden sm:table-cell">Spirit Base</th>
              <th className="px-4 py-3 hidden md:table-cell">DI Rank</th>
              <th className="px-4 py-3 hidden lg:table-cell">Difford\u2019s</th>
              <th className="px-4 py-3">Trend</th>
              <th className="px-4 py-3 hidden md:table-cell">Move</th>
            </tr>
          </thead>
          <tbody>
            {top20Cocktails.map((c) => (
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
                  <td className="px-4 py-3 text-slate-400 hidden lg:table-cell text-xs">{c.diffordsRank}</td>
                  <td className="px-4 py-3">
                    <Badge label={trendLabel(c.trend)} colour={trendColour(c.trend)} />
                  </td>
                  <td className="px-4 py-3 text-slate-400 hidden md:table-cell text-xs">{c.rankMove}</td>
                </tr>
                {expanded === c.rank && (
                  <tr className="bg-slate-900/40">
                    <td colSpan={7} className="px-4 py-3 text-xs text-slate-300 italic">{c.note}</td>
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

// ---- Module 2: Flavour Family Cards -----------------------------------------

const Module2 = () => (
  <section id="flavours">
    <SectionHeader
      title="Flavour Families \u2014 2025\u20132026 Intelligence"
      sub="Sources: Bacardi Cocktail Trends Report \u00b7 Tales of the Cocktail 2025 \u00b7 W50B menu analysis"
    />
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
      {flavourFamilies.map((f) => (
        <Card key={f.id}>
          <div className="flex items-start justify-between mb-3">
            <div>
              <span className="text-lg mr-2">{f.icon}</span>
              <span className="font-semibold text-slate-100">{f.name}</span>
            </div>
            <Badge
              label={f.trend.replace('-', ' ').replace(/^\w/, c => c.toUpperCase())}
              colour={trendColour(f.trend)}
            />
          </div>
          <p className="text-xs text-emerald-400 font-medium mb-1">{f.growthSignal}</p>
          <p className="text-xs text-slate-400 mb-3">{f.penetration}</p>
          <div className="mb-3">
            <p className="text-xs font-medium text-slate-300 mb-1">Key ingredients</p>
            <div className="flex flex-wrap gap-1">
              {f.ingredients.slice(0, 5).map((i) => (
                <span key={i} className="text-xs bg-slate-700/60 text-slate-300 px-2 py-0.5 rounded">{i}</span>
              ))}
            </div>
          </div>
          <div className="border-t border-slate-700 pt-3 mt-3">
            <p className="text-xs font-medium text-sky-400 mb-1">Khorus application</p>
            <p className="text-xs text-slate-300 leading-relaxed">{f.eventApplication}</p>
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
              <span className="hidden sm:inline">Vintage: <span className="text-slate-200">{v.vintageOption}</span></span>
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
      <p className="text-xs text-slate-500 mt-2">Tap any card for full detail including dominant brand &amp; theatre format.</p>
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
        <h3 className="text-sm font-semibold text-slate-200 mb-3">Ice Programme</h3>
        <div className="space-y-3">
          {presentationTheatre.iceProgramme.map((ice, i) => (
            <div key={i} className="border-b border-slate-700/50 pb-3 last:border-0 last:pb-0">
              <p className="text-sm font-medium text-slate-200">{ice.format}</p>
              <p className="text-xs text-slate-400 mt-0.5">{ice.specialist}</p>
              <p className="text-xs text-slate-300 mt-1">{ice.why}</p>
              <p className="text-xs mt-1"><span className="text-amber-400">Luxury signal:</span> <span className="text-slate-300">{ice.luxurySignal}</span></p>
            </div>
          ))}
        </div>
      </Card>

      {/* Glassware */}
      <Card>
        <h3 className="text-sm font-semibold text-slate-200 mb-3">Glassware Hierarchy</h3>
        <div className="space-y-3">
          {presentationTheatre.glassware.map((g, i) => (
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

      {/* Theatre Formats */}
      <Card>
        <h3 className="text-sm font-semibold text-slate-200 mb-3">Activation Formats</h3>
        <div className="space-y-3">
          {presentationTheatre.theatreFormats.map((t, i) => (
            <div key={i} className="border-b border-slate-700/50 pb-3 last:border-0 last:pb-0">
              <p className="text-sm font-medium text-slate-200">{t.name}</p>
              <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">{t.description}</p>
              <p className="text-xs mt-1.5">
                <span className="text-sky-400 font-medium">For Khorus: </span>
                <span className="text-slate-300">{t.suitabilityForKhorus}</span>
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
      title="20-Year Cocktail Trend Arc \u2014 2006\u20132026"
      sub="Six eras of luxury on-premise evolution \u00b7 Source: Drinks International, Difford\u2019s Guide, IWSR, World\u2019s 50 Best Bars, Tales of the Cocktail, CGA by NIQ"
    />

    {/* Era timeline cards */}
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 mb-8">
      {twentyYearArc.eras.map((era) => (
        <Card key={era.id} style={{ borderTopColor: era.accentColour, borderTopWidth: '2px' }}>
          <div className="mb-3">
            <span className="text-xs font-bold uppercase tracking-wider" style={{ color: era.accentColour }}>{era.label}</span>
            <p className="text-sm font-semibold text-slate-100 mt-0.5">{era.subtitle}</p>
          </div>
          <div className="mb-3">
            <p className="text-xs font-medium text-slate-400 mb-1.5">Dominant cocktails</p>
            <div className="flex flex-wrap gap-1">
              {era.dominantCocktails.slice(0, 5).map((c) => (
                <span key={c} className="text-xs bg-slate-700/70 text-slate-300 px-2 py-0.5 rounded-full">{c}</span>
              ))}
            </div>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed mb-2">{era.culturalMoment}</p>
          <div className="border-t border-slate-700 pt-2 mt-2">
            <p className="text-xs font-medium text-sky-400 mb-0.5">Luxury behaviour</p>
            <p className="text-xs text-slate-300 leading-relaxed">{era.luxuryBehaviour}</p>
          </div>
          <p className="text-xs text-slate-500 mt-2 italic">{era.flavourProfile}</p>
        </Card>
      ))}
    </div>

    {/* Three surprising findings */}
    <div className="mb-3">
      <h3 className="text-sm font-semibold text-slate-300 mb-3">Three Surprising Findings</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {twentyYearArc.surprisingFindings.map((f) => (
          <Card key={f.id} style={{ borderLeftColor: f.colour, borderLeftWidth: '3px' }}>
            <p className="text-sm font-semibold mb-2" style={{ color: f.colour }}>{f.headline}</p>
            <p className="text-xs text-slate-300 leading-relaxed">{f.detail}</p>
          </Card>
        ))}
      </div>
    </div>
  </section>
)

// ---- Module 6: Opportunity Radar --------------------------------------------

const Module6 = () => (
  <section id="opportunity-radar">
    <SectionHeader
      title="Opportunity Radar"
      sub="Three actionable signals \u2014 each with migration path, product, brief, and reallocation logic"
    />
    <div className="space-y-4">
      {opportunityRadar.map((o) => (
        <Card key={o.id} style={{ borderLeftColor: o.colour, borderLeftWidth: '3px' }}>
          <div className="flex items-start justify-between mb-3">
            <h3 className="text-base font-semibold text-slate-100">{o.signal}</h3>
            <span className="text-xs text-red-400 font-medium shrink-0 ml-3">{o.urgency.split(' \u2014')[0]}</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-300 leading-relaxed">
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-1">Signal</p>
              <p>{o.signalDetail}</p>
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-1">Migration</p>
              <p>{o.migration}</p>
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-1">Product</p>
              <p>{o.product}</p>
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-1">Brief</p>
              <p>{o.brief}</p>
            </div>
          </div>
          <div className="mt-3 pt-3 border-t border-slate-700">
            <p className="text-xs font-semibold text-amber-400 mb-1">Reallocation logic</p>
            <p className="text-xs text-slate-300 leading-relaxed">{o.reallocation}</p>
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

export default function ProfileKhorusCocktails() {
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-100">
      {/* Header */}
      <header className="border-b border-slate-800 bg-[#0f172a]/95 sticky top-0 z-30 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium text-sky-400 uppercase tracking-wider">Liquid Economy</span>
              <span className="text-slate-600">/</span>
              <span className="text-xs text-slate-500">Client Intelligence</span>
            </div>
            <h1 className="text-xl font-bold text-slate-100 mt-0.5">
              {profileMeta.clientName} \u2014 {profileMeta.profileTitle}
            </h1>
            <p className="text-xs text-slate-400 mt-0.5">{profileMeta.subtitle}</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-500">Data: {profileMeta.dataFreshness}</span>
            <a
              href={`mailto:${profileMeta.contactEmail}?subject=Khorus%20Cocktail%20Intelligence%20%E2%80%94%20Follow-up`}
              className="text-xs bg-sky-600 hover:bg-sky-500 text-white px-3 py-1.5 rounded-lg transition-colors"
            >
              Contact Liquid
            </a>
          </div>
        </div>
        {/* Section nav */}
        <nav className="max-w-7xl mx-auto px-4 pb-3 flex gap-4 overflow-x-auto">
          {NAV_ITEMS.map((n) => (
            <button
              key={n.id}
              onClick={() => scrollTo(n.id)}
              className="text-xs text-slate-400 hover:text-slate-200 whitespace-nowrap transition-colors"
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
        <footer className="border-t border-slate-800 pt-6 pb-10 text-center">
          <p className="text-xs text-slate-500">
            Sources: {profileMeta.sourcedFrom}
          </p>
          <p className="text-xs text-slate-600 mt-2">
            Prepared by Liquid Economy \u00b7 {profileMeta.lastUpdated} \u00b7{' '}
            <a href={`mailto:${profileMeta.contactEmail}`} className="underline hover:text-slate-400">
              {profileMeta.contactEmail}
            </a>
          </p>
        </footer>
      </main>
    </div>
  )
}
