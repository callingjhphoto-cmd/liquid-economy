/**
 * ClientProfile.jsx
 * Generic profile renderer for Liquid Economy client profiles.
 * Iterates profile.modules and renders via a component registry.
 *
 * Visually identical to the main app — uses ONLY shared UI primitives
 * from src/components/ui. No bespoke card/hero/chip styling.
 *
 * Routes: /p/:slug (rendered inside main Layout so sidebar appears)
 */

import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronRight, ArrowRight, Mail } from 'lucide-react'
import {
  PageHeader,
  Card,
  AccentCard,
  SectionHeader,
  Badge,
  BentoGrid,
} from '../components/ui'

// ---- Tone mapping (maps free-form profile data to shared Badge variants) ----

const trendVariant = (t = '') => {
  if (t === 'rising' || t === 'fast-rising' || t.includes('rising') || t.includes('+')) return 'green'
  if (t === 'stable-dominant' || t === 'dominant' || t === 'dominant-consumer' || t === 'leading' || t.includes('dominant')) return 'blue'
  if (t === 'fatigue' || t === 'decline' || t.includes('decline') || t.includes('caution') || t.includes('\u2212')) return 'red'
  if (t.includes('watch')) return 'orange'
  if (t === 'resurgent' || t === 'established-growing') return 'gold'
  return 'default'
}

const trendLabel = (t) => {
  const map = {
    'rising': 'Rising', 'fast-rising': 'Fast Rising', 'stable-dominant': 'Dominant',
    'dominant': 'Dominant', 'dominant-consumer': 'Consumer #1', 'stable': 'Stable',
    'fatigue': 'Fatigue', 'resurgent': 'Resurgent', 'established-growing': 'Established',
    'leading': 'Leading',
  }
  return map[t] || t
}

// ---- Shared local helpers (section header with optional "see full data" link) ---

function ModuleHeader({ title, subtitle, linkTo }) {
  return (
    <SectionHeader
      size="lg"
      subtitle={subtitle}
      action={linkTo ? (
        <Link
          to={linkTo}
          className="text-caption font-medium text-editorial hover:text-navy whitespace-nowrap flex items-center gap-1 transition-colors no-underline"
        >
          See full data
          <ArrowRight size={12} />
        </Link>
      ) : null}
    >
      {title}
    </SectionHeader>
  )
}

// ---- MODULE: TopCocktails ---------------------------------------------------

function TopCocktailsModule({ data }) {
  const [expanded, setExpanded] = useState(null)
  const cocktails = data.cocktails || []
  return (
    <section id="module-top-cocktails">
      <ModuleHeader
        title="Top 20 Cocktails \u2014 Global Ranking 2024\u20132026"
        subtitle="Drinks International World\u2019s 50 Best Bars Brand Report \u00b7 Difford\u2019s Guide \u00b7 IWSR"
        linkTo="/categories?category=cocktails"
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
        {cocktails.map((c) => {
          const isOpen = expanded === c.rank
          return (
            <Card
              key={c.rank}
              padding="p-5"
              hover
              onClick={() => setExpanded(isOpen ? null : c.rank)}
            >
              <div className="flex items-baseline justify-between mb-3">
                <span className="text-label text-gray-500 font-mono">#{c.rank}</span>
                {c.diRank && <span className="text-label text-gray-400">DI {c.diRank}</span>}
              </div>
              <h3 className="text-subsection font-display text-navy leading-tight">{c.name}</h3>
              <p className="text-caption text-gray-500 mt-1">{c.spiritBase}</p>
              <div className="flex items-center gap-1.5 mt-3 flex-wrap">
                <Badge variant={trendVariant(c.trend)}>{trendLabel(c.trend)}</Badge>
                {c.type && (
                  <Badge variant={c.type.toLowerCase().includes('classic') ? 'gold' : 'blue'}>
                    {c.type}
                  </Badge>
                )}
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
      <ModuleHeader
        title="Flavour Families \u2014 2025\u20132026 Intelligence"
        subtitle="Bacardi Cocktail Trends Report \u00b7 Tales of the Cocktail 2025 \u00b7 W50B menu analysis"
        linkTo="/categories"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
        {families.map((f) => (
          <AccentCard key={f.id} padding="p-5">
            <div className="flex items-start justify-between mb-3">
              <div>
                <span className="text-lg mr-2">{f.icon}</span>
                <span className="font-semibold text-navy">{f.name}</span>
              </div>
              <Badge variant={trendVariant(f.trend)}>
                {f.trend.replace('-', ' ').replace(/^\w/, c => c.toUpperCase())}
              </Badge>
            </div>
            {f.growthSignal && (
              <p className="text-caption font-semibold mb-1 text-navy">{f.growthSignal}</p>
            )}
            <p className="text-caption text-gray-700 mb-3">{f.penetration}</p>
            <div className="mb-3">
              <p className="text-label text-gray-500 uppercase tracking-wider mb-1.5">Key ingredients</p>
              <div className="flex flex-wrap gap-1">
                {(f.ingredients || []).slice(0, 5).map((i) => (
                  <Badge key={i} variant="default">{i}</Badge>
                ))}
              </div>
            </div>
            {f.eventApplication && (
              <div className="border-t border-gray-100 pt-3 mt-3">
                <p className="text-label text-editorial uppercase tracking-wider mb-1">Application</p>
                <p className="text-caption text-gray-700 leading-relaxed">{f.eventApplication}</p>
              </div>
            )}
          </AccentCard>
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
      <ModuleHeader
        title="Luxury Venue Intelligence"
        subtitle="Signature cocktails, pricing bands and theatre at elite global venues"
        linkTo="/venues"
      />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
        {venues.map((v, i) => (
          <Card
            key={i}
            padding="p-5"
            hover
            onClick={() => setExpanded(expanded === i ? null : i)}
          >
            <div className="flex items-start justify-between mb-2">
              <div>
                <p className="font-semibold text-navy">{v.venue}</p>
                <p className="text-caption text-gray-500">{v.location}</p>
              </div>
              <Badge variant="navy">{v.tier}</Badge>
            </div>
            <p className="text-body text-gray-700 mb-2">{v.signatureCocktail}</p>
            <div className="flex gap-4 text-caption text-gray-500">
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
      <ModuleHeader
        title="Presentation and Theatre Library"
        subtitle="Ice programme, glassware specs, and activation formats"
      />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
        <Card padding="p-5">
          <h3 className="text-subsection font-display text-navy mb-3">Ice Programme</h3>
          <div className="space-y-3">
            {(data.iceProgramme || []).map((ice, i) => (
              <div key={i} className="border-b border-gray-100 pb-3 last:border-0 last:pb-0">
                <p className="text-body font-semibold text-navy">{ice.format}</p>
                <p className="text-caption text-gray-500 mt-0.5">{ice.specialist}</p>
                <p className="text-caption text-gray-700 mt-1">{ice.why}</p>
                <p className="text-caption mt-1"><span className="text-editorial font-semibold">Luxury signal:</span> <span className="text-gray-700">{ice.luxurySignal}</span></p>
              </div>
            ))}
          </div>
        </Card>
        <Card padding="p-5">
          <h3 className="text-subsection font-display text-navy mb-3">Glassware Hierarchy</h3>
          <div className="space-y-3">
            {(data.glassware || []).map((g, i) => (
              <div key={i} className="border-b border-gray-100 pb-3 last:border-0 last:pb-0">
                <div className="flex items-start justify-between">
                  <p className="text-body font-semibold text-navy">{g.name}</p>
                  <Badge variant="gold">{g.signalLevel}</Badge>
                </div>
                <p className="text-caption text-gray-500 mt-0.5">{g.maker}</p>
                <p className="text-caption text-gray-700 mt-1">{g.notes}</p>
              </div>
            ))}
          </div>
        </Card>
        <Card padding="p-5">
          <h3 className="text-subsection font-display text-navy mb-3">Activation Formats</h3>
          <div className="space-y-3">
            {(data.theatreFormats || []).map((t, i) => (
              <div key={i} className="border-b border-gray-100 pb-3 last:border-0 last:pb-0">
                <p className="text-body font-semibold text-navy">{t.name}</p>
                <p className="text-caption text-gray-500 mt-0.5 leading-relaxed">{t.description}</p>
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
      <ModuleHeader
        title="20-Year Cocktail Trend Arc \u2014 2006\u20132026"
        subtitle="Six eras of luxury on-premise evolution \u00b7 Drinks International, Difford\u2019s Guide, IWSR, W50B"
        linkTo="/categories"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 mb-10">
        {eras.map((era) => (
          <AccentCard key={era.id} padding="p-5">
            <div className="mb-3">
              <span className="text-label text-editorial uppercase tracking-wider">{era.label}</span>
              <p className="text-subsection font-display text-navy mt-0.5 leading-tight">{era.subtitle}</p>
            </div>
            <div className="mb-3">
              <p className="text-label text-gray-500 uppercase tracking-wider mb-1.5">Dominant cocktails</p>
              <div className="flex flex-wrap gap-1">
                {(era.dominantCocktails || []).slice(0, 5).map((c) => (
                  <Badge key={c} variant="default">{c}</Badge>
                ))}
              </div>
            </div>
            <p className="text-caption text-gray-700 leading-relaxed mb-2">{era.culturalMoment}</p>
            <div className="border-t border-gray-100 pt-2 mt-2">
              <p className="text-label text-editorial uppercase tracking-wider mb-0.5">Luxury behaviour</p>
              <p className="text-caption text-gray-700 leading-relaxed">{era.luxuryBehaviour}</p>
            </div>
          </AccentCard>
        ))}
      </div>
      {findings.length > 0 && (
        <div>
          <SectionHeader size="md">Three Surprising Findings</SectionHeader>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
            {findings.map((f) => (
              <AccentCard key={f.id} padding="p-5">
                <p className="text-body font-semibold mb-2 text-navy">{f.headline}</p>
                <p className="text-caption text-gray-700 leading-relaxed">{f.detail}</p>
              </AccentCard>
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
      <ModuleHeader
        title={`Category Snapshot \u2014 ${data.category || 'Category'}`}
        subtitle={`${data.marketSize || ''} \u00b7 ${data.cagr || ''} \u00b7 ${data.source || ''}`}
        linkTo={data.linkTo}
      />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6 mb-6">
        {(data.subCategories || []).map((sc, i) => (
          <AccentCard key={i} padding="p-5">
            <div className="flex items-start justify-between mb-2">
              <p className="font-semibold text-navy">{sc.name}</p>
              <Badge variant={trendVariant(sc.trend)}>{sc.share}</Badge>
            </div>
            <p className="text-caption font-semibold text-editorial mb-1">{sc.trend}</p>
            <p className="text-caption text-gray-700 leading-relaxed">{sc.notes}</p>
          </AccentCard>
        ))}
      </div>
      {(data.regionalSignals || []).length > 0 && (
        <div>
          <SectionHeader size="md">Regional Signals</SectionHeader>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {data.regionalSignals.map((r, i) => (
              <Card key={i} padding="p-5">
                <p className="font-semibold text-navy mb-1">{r.market}</p>
                <p className="text-caption text-gray-700 leading-relaxed">{r.signal}</p>
              </Card>
            ))}
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
      <ModuleHeader
        title="Competitor Watch"
        subtitle="Brand-level positioning and threat signals \u00b7 Volume data gap flagged"
        linkTo="/competitors"
      />
      {data.note && (
        <Card padding="p-4" className="mb-4 bg-amber-50 border-amber-100">
          <p className="text-caption text-amber-800">{data.note}</p>
        </Card>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
        {(data.competitors || []).map((c) => (
          <Card key={c.name} padding="p-5">
            <div className="flex items-start justify-between mb-2">
              <p className="font-semibold text-navy">{c.name}</p>
              <span className="text-caption text-gray-500">{c.owner}</span>
            </div>
            <p className="text-caption text-gray-700 mb-2 leading-relaxed">{c.positioning}</p>
            <p className="text-caption text-gray-700 mb-1"><span className="font-semibold text-navy">Threat:</span> {c.threat}</p>
            <p className="text-caption text-gray-700"><span className="text-editorial font-semibold">Signal:</span> {c.signal}</p>
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
      <ModuleHeader
        title="Market Intelligence"
        subtitle="Entry signals and channel recommendations per priority market"
        linkTo="/geographic"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
        {(data.markets || []).map((m) => (
          <AccentCard key={m.name} padding="p-5">
            <div className="flex items-start justify-between mb-3">
              <div>
                <p className="font-semibold text-navy">{m.name}</p>
                <p className="text-caption font-semibold text-editorial mt-0.5">{m.signal}</p>
              </div>
            </div>
            <div className="space-y-1.5 mb-3">
              {(m.metrics || []).map((metric, j) => (
                <div key={j} className="flex items-start justify-between text-caption">
                  <span className="text-gray-500">{metric.label}</span>
                  <span className="text-navy font-medium text-right ml-2">{metric.value}</span>
                </div>
              ))}
            </div>
            <div className="border-t border-gray-100 pt-3">
              <p className="text-label text-editorial uppercase tracking-wider mb-1">Recommendation</p>
              <p className="text-caption text-gray-700 leading-relaxed">{m.recommendation}</p>
            </div>
            {m.linkTo && (
              <Link
                to={m.linkTo}
                className="text-caption text-gray-600 hover:text-editorial mt-2 flex items-center gap-1 transition-colors no-underline"
              >
                Full geographic data
                <ArrowRight size={10} />
              </Link>
            )}
          </AccentCard>
        ))}
      </div>
    </section>
  )
}

// ---- MODULE: DemographicsLens -----------------------------------------------

function DemographicsLensModule({ data }) {
  return (
    <section id="module-demographics-lens">
      <ModuleHeader
        title={`Demographics Lens \u2014 ${data.category || 'Category'}`}
        subtitle={data.source}
        linkTo={data.linkTo}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
        {(data.highlights || []).map((h) => (
          <AccentCard key={h.segment} padding="p-5">
            <p className="font-semibold text-navy mb-1">{h.segment}</p>
            <p className="text-caption font-semibold text-editorial mb-2">{h.signal}</p>
            <p className="text-caption text-gray-700 leading-relaxed mb-2">{h.detail}</p>
            <div className="border-t border-gray-100 pt-2">
              <p className="text-label text-editorial uppercase tracking-wider mb-0.5">Relevance</p>
              <p className="text-caption text-gray-700 leading-relaxed">{h.relevance}</p>
            </div>
          </AccentCard>
        ))}
      </div>
    </section>
  )
}

// ---- MODULE: OpportunityRadar -----------------------------------------------

function CommercialNarrativeCard({ o }) {
  const [open, setOpen] = useState(false)
  return (
    <AccentCard padding="p-5">
      <div
        className="flex items-start justify-between cursor-pointer"
        onClick={() => setOpen(!open)}
      >
        <div className="flex-1">
          <Badge variant="default" className="mb-1.5">Signal</Badge>
          <h3 className="text-subsection font-display text-navy mt-1">{o.signal}</h3>
          {o.urgency && (
            <p className="text-caption text-red-700 font-semibold mt-0.5">{o.urgency.split(' \u2014')[0]}</p>
          )}
        </div>
        <ChevronRight
          size={16}
          className={`text-gray-400 ml-3 mt-1 shrink-0 transition-transform duration-200 ${open ? 'rotate-90' : ''}`}
        />
      </div>
      <p className="text-caption text-gray-700 leading-relaxed mt-2">{o.signalDetail}</p>

      {open && (
        <div className="mt-4 space-y-4 border-t border-gray-100 pt-4">
          {o.adjacency && (
            <div>
              <Badge variant="default" className="mb-1.5">Adjacency</Badge>
              <p className="text-caption text-gray-700 leading-relaxed">{o.adjacency}</p>
            </div>
          )}
          {o.demographic && (
            <div>
              <Badge variant="default" className="mb-1.5">Demographic</Badge>
              <p className="text-caption text-gray-700 leading-relaxed">{o.demographic}</p>
            </div>
          )}
          {(o.product || o.migration) && (
            <div>
              <Badge variant="default" className="mb-1.5">Product</Badge>
              <p className="text-caption text-gray-700 leading-relaxed">{o.product || o.migration}</p>
            </div>
          )}
          {o.brief && (
            <div>
              <Badge variant="default" className="mb-1.5">Brief</Badge>
              <p className="text-caption text-gray-700 leading-relaxed">{o.brief}</p>
            </div>
          )}
          {o.reallocation && (
            <div className="border-t border-gray-100 pt-3">
              <Badge variant="gold" className="mb-1.5">Reallocation</Badge>
              <p className="text-caption text-gray-700 leading-relaxed">{o.reallocation}</p>
            </div>
          )}
        </div>
      )}
    </AccentCard>
  )
}

function OpportunityRadarModule({ data }) {
  const narratives = data.narratives || []
  return (
    <section id="module-opportunity-radar">
      <ModuleHeader
        title="Opportunity Radar"
        subtitle="Commercial narratives \u2014 signal, adjacency, demographic, product, brief, and media reallocation"
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

// ---- In-page module tab nav -------------------------------------------------

function ModuleTabs({ modules }) {
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  const labelMap = {
    TopCocktails: 'Top Cocktails', FlavourRadar: 'Flavours', LuxuryVenues: 'Venues',
    Presentation: 'Theatre', TrendArc: 'Trend Arc', CategorySnapshot: 'Category',
    CompetitorWatch: 'Competitors', MarketIntel: 'Markets', DemographicsLens: 'Demographics',
    OpportunityRadar: 'Radar',
  }
  return (
    <div className="overflow-x-auto whitespace-nowrap mb-6 -mx-4 px-4 lg:mx-0 lg:px-0">
      <div className="flex gap-2">
        {modules.map((m, i) => {
          const id = `module-${m.type.toLowerCase().replace(/([A-Z])/g, '-$1').replace(/^-/, '').toLowerCase()}`
          return (
            <button
              key={i}
              onClick={() => scrollTo(id)}
              className="px-3 py-1.5 rounded-full text-[12px] font-medium bg-gray-100 text-gray-600 hover:bg-navy hover:text-white transition-colors flex-shrink-0"
            >
              {labelMap[m.type] || m.type}
            </button>
          )
        })}
      </div>
    </div>
  )
}

// ---- 404 fallback -----------------------------------------------------------

function ProfileNotFound({ slug }) {
  return (
    <div className="max-w-7xl mx-auto">
      <Card padding="p-12" className="text-center">
        <p className="text-6xl font-display text-gray-300 mb-4">404</p>
        <p className="text-section font-display text-navy mb-2">Profile not found</p>
        <p className="text-body text-gray-500 mb-6">No profile registered for &ldquo;{slug}&rdquo;</p>
        <div className="flex gap-4 justify-center">
          <Link to="/profiles" className="text-body text-editorial hover:text-navy no-underline">
            View all profiles \u2192
          </Link>
          <Link to="/" className="text-body text-gray-500 hover:text-navy no-underline">
            Back to dashboard
          </Link>
        </div>
      </Card>
    </div>
  )
}

// ---- Main exported component ------------------------------------------------

export default function ClientProfile({ profile, slug }) {
  if (!profile) {
    return <ProfileNotFound slug={slug} />
  }

  const modules = profile.modules || []
  const clientName = profile.client?.name || 'Profile'
  const title = `${clientName} \u2014 ${profile.meta?.profileTitle || ''}`
  const archetype = (profile.archetype || 'profile').replace('-', ' ')

  return (
    <div className="max-w-7xl mx-auto">
      <PageHeader
        title={title}
        subtitle={profile.meta?.subtitle}
        breadcrumbs={[
          { label: 'Dashboard', to: '/' },
          { label: 'Client Profiles', to: '/profiles' },
          { label: clientName },
        ]}
        action={
          <div className="flex items-center gap-3">
            <Badge variant="navy" size="lg">{archetype}</Badge>
            {profile.meta?.contactEmail && (
              <a
                href={`mailto:${profile.meta.contactEmail}?subject=${encodeURIComponent(clientName + ' \u2014 Follow-up')}`}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white bg-navy hover:bg-navy-light rounded-lg transition-colors no-underline"
              >
                <Mail size={12} />
                Contact Liquid
              </a>
            )}
          </div>
        }
      />

      {profile.meta?.dataFreshness && (
        <p className="text-caption text-gray-500 mb-4">Data: {profile.meta.dataFreshness}</p>
      )}

      <ModuleTabs modules={modules} />

      <div className="space-y-10">
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
          <p className="text-caption text-gray-500">
            Sources: {profile.meta?.sourcedFrom}
          </p>
          <p className="text-caption text-gray-500 mt-2">
            Prepared by Liquid Economy \u00b7 {profile.meta?.lastUpdated} \u00b7{' '}
            <a href={`mailto:${profile.meta?.contactEmail}`} className="underline hover:text-navy">
              {profile.meta?.contactEmail}
            </a>
          </p>
          <p className="text-caption text-gray-400 mt-1">
            <Link to="/profiles" className="hover:text-navy transition-colors no-underline">All profiles</Link>
            {' \u00b7 '}
            <Link to="/" className="hover:text-navy transition-colors no-underline">Liquid Economy dashboard</Link>
          </p>
          <p className="text-caption text-gray-400 mt-3">Powered by Liquid Agency \u00b7 Drinks Industry Intelligence</p>
        </footer>
      </div>
    </div>
  )
}
