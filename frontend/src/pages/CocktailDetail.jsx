/**
 * CocktailDetail.jsx
 * Full drill-down page for a single cocktail.
 * Route: /p/chorus-cocktails/cocktail/:cocktailSlug
 *
 * Modules (updated April 2026 -- honesty pass):
 *   1. Methodology banner
 *   2. Hero
 *   3. Demographics (cited-quote list -- NO fabricated bar charts)
 *   4. Geographics (key markets list -- NO percentage chart)
 *   5. Persona cards (with illustrative disclaimer)
 *   6. Flavour profile (RadarChart + tag cloud -- bartender-calibrated)
 *   7. How to make at home (collapsible recipe)
 *   8. Commercial context (price range only -- volume trend REMOVED)
 *   9. Adjacent cocktails (cross-ordered with -- NO overlap scores)
 *   10. Aggregate profile
 *   11. Methodology detail
 *   12. Sources
 *
 * REMOVED vs prior version:
 *   - ConsumptionModule (donut chart) -- fabricated channel-split percentages
 *   - Geographics bar chart -- fabricated market share percentages
 *   - Demographics bar chart (age/gender/income pct) -- fabricated
 *   - CommercialModule volume trend line -- fabricated indexed series
 *   - AdjacentsModule overlap-score chips and bar -- invented numbers
 */

import React, { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import {
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  Tooltip,
} from 'recharts'
import { ResponsiveContainer } from 'recharts'
import { ArrowLeft, ChevronDown, ChevronUp, ExternalLink, AlertCircle, BookOpen } from 'lucide-react'
import {
  Card,
  AccentCard,
  SectionHeader,
  Badge,
} from '../components/ui'
import { getCocktailDetail, FLAVOUR_KEYS, TREND_COLORS } from '../data/cocktailDetails'

function trendVariant(t = '') {
  if (t === 'fast-rising' || t === 'rising') return 'green'
  if (t === 'stable-dominant' || t === 'dominant-consumer') return 'blue'
  if (t === 'fatigue') return 'red'
  if (t === 'resurgent') return 'gold'
  return 'default'
}

function trendLabel(t = '') {
  const map = {
    'fast-rising': 'Fast Rising',
    'stable-dominant': 'Dominant',
    'dominant-consumer': 'Consumer #1',
    rising: 'Rising',
    resurgent: 'Resurgent',
    fatigue: 'Fatigue',
  }
  return map[t] || t
}

function difficultyLabel(n) {
  if (n <= 1) return 'Easy'
  if (n === 2) return 'Moderate'
  return 'Advanced'
}

// ---- MODULE: Methodology banner (top of page) -------------------------------
function MethodologyBanner({ baseSpirit }) {
  return (
    <div className="rounded-lg border border-blue-200 bg-blue-50 p-4 flex gap-3">
      <AlertCircle size={16} className="text-blue-500 shrink-0 mt-0.5" />
      <div>
        <p className="text-caption font-semibold text-blue-800 mb-1">Data transparency</p>
        <p className="text-caption text-blue-700 leading-relaxed">
          Demographic and market context shown here is sourced at the <strong>{baseSpirit}</strong> category
          level via IWSR-cited research. Per-cocktail channel splits, market shares, and volume trends are
          not yet underwritten by per-cocktail licensed data -- currently represented qualitatively.
          See Methodology section at the bottom of this page for full detail.
        </p>
      </div>
    </div>
  )
}

// ---- MODULE: Hero -----------------------------------------------------------
function HeroModule({ cocktail }) {
  return (
    <div className="mb-8">
      <div className="flex items-start justify-between flex-wrap gap-4 mb-4">
        <div>
          <h1 className="text-display font-display text-navy leading-none">{cocktail.name}</h1>
          <p className="text-body text-gray-500 mt-1">{cocktail.created}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Badge variant={trendVariant(cocktail.trendState)}>{trendLabel(cocktail.trendState)}</Badge>
          <Badge variant={cocktail.type === 'Classic' ? 'gold' : 'blue'}>{cocktail.type}</Badge>
          <Badge variant="default">{cocktail.baseSpirit}</Badge>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
        {cocktail.diRank && (
          <Card padding="p-4">
            <p className="text-label text-gray-500 uppercase tracking-wider mb-1">Drinks International</p>
            <p className="text-display font-display text-navy">#{cocktail.diRank}</p>
            <p className="text-caption text-gray-500">World's Best Bars 2025</p>
          </Card>
        )}
        {cocktail.diffordsRank && (
          <Card padding="p-4">
            <p className="text-label text-gray-500 uppercase tracking-wider mb-1">Difford's Guide</p>
            <p className="text-display font-display text-navy">#{cocktail.diffordsRank}</p>
            <p className="text-caption text-gray-500">Consumer search ranking 2025</p>
          </Card>
        )}
        <Card padding="p-4">
          <p className="text-label text-gray-500 uppercase tracking-wider mb-1">Base Spirit</p>
          <p className="text-subsection font-display text-navy">{cocktail.baseSpirit}</p>
          <p className="text-caption text-gray-500">Primary ingredient category</p>
        </Card>
      </div>
      <AccentCard padding="p-4">
        <p className="text-body text-navy font-medium leading-relaxed">{cocktail.oneLiner}</p>
      </AccentCard>
    </div>
  )
}

// ---- MODULE: Demographics (cited-quote list, no percentage charts) ----------
function DemographicsModule({ data }) {
  const [view, setView] = useState('age')
  const items = data[view] || []
  return (
    <section>
      <SectionHeader size="lg" subtitle="Category-level consumer profile -- qualitative, cited from research files">
        Demographics
      </SectionHeader>
      <div className="flex gap-2 mb-4 flex-wrap">
        {['age', 'gender', 'income'].map((v) => (
          <button
            key={v}
            onClick={() => setView(v)}
            className={`px-3 py-1 rounded text-caption font-medium transition-colors ${view === v ? 'bg-navy text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
          >
            {v.charAt(0).toUpperCase() + v.slice(1)}
          </button>
        ))}
      </div>
      <Card padding="p-5">
        <div className="space-y-3">
          {items.map((item, i) => {
            const bracket = item.bracket || item.segment
            const label = item.label
            const note = item.note
            return (
              <div key={i} className="border-b border-gray-50 pb-3 last:border-0 last:pb-0">
                <div className="flex items-center gap-3 mb-1">
                  <span className="text-body font-semibold text-navy w-28 shrink-0">{bracket}</span>
                  <span className={`px-2 py-0.5 rounded text-caption font-medium ${
                    label && label.toLowerCase().includes('dominant')
                      ? 'bg-navy text-white'
                      : label && label.toLowerCase().includes('strong')
                      ? 'bg-blue-100 text-blue-800'
                      : label && label.toLowerCase().includes('moderate')
                      ? 'bg-gray-100 text-gray-700'
                      : label && label.toLowerCase().includes('minimal')
                      ? 'bg-gray-50 text-gray-400'
                      : 'bg-gray-100 text-gray-600'
                  }`}>{label}</span>
                </div>
                {note && <p className="text-caption text-gray-500 leading-relaxed pl-1">{note}</p>}
              </div>
            )
          })}
        </div>
        {data.note && (
          <p className="text-caption text-gray-400 mt-4 pt-3 border-t border-gray-100 italic">{data.note}</p>
        )}
      </Card>
    </section>
  )
}

// ---- MODULE: Geographics (key markets list, no percentage chart) ------------
function GeographicsModule({ data }) {
  return (
    <section>
      <SectionHeader size="lg" subtitle="Key markets -- qualitative presence notes, no percentage breakdown">
        Key Markets
      </SectionHeader>
      <Card padding="p-5">
        <div className="space-y-2">
          {data.map((d, i) => (
            <div key={i} className="flex items-start gap-3 py-2 border-b border-gray-50 last:border-0">
              <span className="text-body font-semibold text-navy w-28 shrink-0">{d.market}</span>
              <p className="text-caption text-gray-600 leading-relaxed">{d.note}</p>
            </div>
          ))}
        </div>
        <p className="text-caption text-gray-400 mt-4 pt-3 border-t border-gray-100">
          Market presence shown qualitatively. Per-cocktail market share data is not currently licensed -- percentage breakdowns removed.
        </p>
      </Card>
    </section>
  )
}

// ---- MODULE: Persona cards (with illustrative disclaimer) ------------------
function PersonasModule({ personas }) {
  return (
    <section>
      <SectionHeader size="lg" subtitle="Drinker archetypes -- illustrative, not survey-validated">
        Drinker Profiles
      </SectionHeader>
      <div className="rounded-lg border border-amber-200 bg-amber-50 p-3 mb-4 flex gap-2">
        <AlertCircle size={14} className="text-amber-500 shrink-0 mt-0.5" />
        <p className="text-caption text-amber-700">
          <strong>Illustrative archetypes only.</strong> These personas are editorial constructs based on category-level research, not survey-validated consumer data. They should not be cited as primary research.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {personas.map((p, i) => (
          <AccentCard key={i} padding="p-5">
            <h3 className="font-display text-subsection text-navy mb-1">{p.name}</h3>
            <div className="flex flex-wrap gap-1.5 mb-3">
              <Badge variant="default">{p.ageRange}</Badge>
              <Badge variant="default">{p.income}</Badge>
            </div>
            <p className="text-label text-gray-500 uppercase tracking-wider mb-1">Occasion</p>
            <p className="text-caption text-gray-700 mb-3">{p.occasion}</p>
            <p className="text-caption text-gray-700 leading-relaxed mb-3">{p.description}</p>
            {p.adjacents && p.adjacents.length > 0 && (
              <div className="border-t border-gray-100 pt-3">
                <p className="text-label text-gray-500 uppercase tracking-wider mb-1.5">Also orders</p>
                <div className="flex flex-wrap gap-1">
                  {p.adjacents.map((a) => (
                    <Badge key={a} variant="default">{a}</Badge>
                  ))}
                </div>
              </div>
            )}
          </AccentCard>
        ))}
      </div>
    </section>
  )
}

// ---- MODULE: Flavour Radar --------------------------------------------------
function FlavourModule({ flavour }) {
  const radarData = FLAVOUR_KEYS.map((key) => ({
    axis: key.charAt(0).toUpperCase() + key.slice(1),
    value: flavour.radar[key] || 0,
  }))
  return (
    <section>
      <SectionHeader size="lg" subtitle="Bartender-calibrated flavour estimate + descriptor tags">
        Flavour Profile
      </SectionHeader>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card padding="p-5">
          <p className="text-caption text-gray-400 mb-3 italic">Bartender-calibrated estimate -- not instrument-measured</p>
          <ResponsiveContainer width="100%" height={260}>
            <RadarChart data={radarData} cx="50%" cy="50%" outerRadius={90}>
              <PolarGrid stroke="#e2e8f0" />
              <PolarAngleAxis dataKey="axis" tick={{ fontSize: 11, fill: '#475569' }} />
              <PolarRadiusAxis angle={30} domain={[0, 10]} tick={{ fontSize: 9, fill: '#94a3b8' }} tickCount={3} />
              <Radar name="Flavour" dataKey="value" stroke="#1e3a5f" fill="#1e3a5f" fillOpacity={0.35} />
              <Tooltip content={({ active, payload }) => {
                if (!active || !payload?.length) return null
                return (
                  <div style={{ background: '#1e293b', borderRadius: 8, padding: '8px 12px' }}>
                    <p style={{ color: '#f1f5f9', fontWeight: 600, fontSize: 12 }}>{payload[0]?.payload?.axis}</p>
                    <p style={{ color: '#94a3b8', fontSize: 11 }}>{payload[0]?.value} / 10</p>
                  </div>
                )
              }} />
            </RadarChart>
          </ResponsiveContainer>
        </Card>
        <Card padding="p-5">
          <p className="text-label text-gray-500 uppercase tracking-wider mb-3">Flavour descriptors</p>
          <div className="flex flex-wrap gap-2">
            {(flavour.tags || []).map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-1 rounded-full text-caption bg-navy/8 text-navy font-medium"
              >
                {tag}
              </span>
            ))}
          </div>
          <div className="mt-5 space-y-2">
            {FLAVOUR_KEYS.map((key) => {
              const val = flavour.radar[key] || 0
              return (
                <div key={key} className="flex items-center gap-3">
                  <span className="text-label text-gray-500 w-16 capitalize">{key}</span>
                  <div className="flex-1 bg-gray-100 rounded-full h-2">
                    <div
                      className="h-2 rounded-full bg-navy transition-all"
                      style={{ width: `${val * 10}%` }}
                    />
                  </div>
                  <span className="text-label text-gray-400 w-6 text-right">{val}</span>
                </div>
              )
            })}
          </div>
        </Card>
      </div>
    </section>
  )
}

// ---- MODULE: Recipe ---------------------------------------------------------
function RecipeModule({ recipe }) {
  const [open, setOpen] = useState(false)
  return (
    <section>
      <SectionHeader size="lg" subtitle="Full recipe with brand suggestions, method and difficulty">
        How to Make at Home
      </SectionHeader>
      <Card padding="p-5">
        <button
          className="w-full flex items-center justify-between text-left"
          onClick={() => setOpen(!open)}
        >
          <div className="flex items-center gap-3">
            <Badge variant={recipe.difficulty <= 1 ? 'green' : recipe.difficulty === 2 ? 'gold' : 'red'}>
              {difficultyLabel(recipe.difficulty)}
            </Badge>
            <span className="text-body font-semibold text-navy">{recipe.glass} &middot; {recipe.serveTemp}</span>
          </div>
          {open ? <ChevronUp size={16} className="text-gray-400" /> : <ChevronDown size={16} className="text-gray-400" />}
        </button>
        {open && (
          <div className="mt-4 pt-4 border-t border-gray-100 space-y-5">
            <div>
              <p className="text-label text-gray-500 uppercase tracking-wider mb-2">Ingredients</p>
              <div className="space-y-2">
                {recipe.ingredients.map((ing, i) => (
                  <div key={i} className="flex items-start justify-between gap-2 py-1.5 border-b border-gray-50 last:border-0">
                    <div>
                      <span className="text-body font-medium text-navy">{ing.item}</span>
                      {ing.brand && <span className="text-caption text-gray-500 ml-2">({ing.brand})</span>}
                    </div>
                    <span className="text-body font-mono text-editorial shrink-0">{ing.qty}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <p className="text-label text-gray-500 uppercase tracking-wider mb-2">Method</p>
              <p className="text-body text-gray-700 leading-relaxed">{recipe.method}</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-label text-gray-500 uppercase tracking-wider mb-1">Glass</p>
                <p className="text-body text-navy font-medium">{recipe.glass}</p>
              </div>
              <div>
                <p className="text-label text-gray-500 uppercase tracking-wider mb-1">Garnish</p>
                <p className="text-body text-navy font-medium">{recipe.garnish}</p>
              </div>
            </div>
          </div>
        )}
        {!open && (
          <p className="text-caption text-gray-400 mt-2">Tap to expand full recipe</p>
        )}
      </Card>
    </section>
  )
}

// ---- MODULE: Commercial Context (price range only -- no volume trend) -------
function CommercialModule({ commercial }) {
  return (
    <section>
      <SectionHeader size="lg" subtitle="Estimated price range by channel -- volume trend removed pending licensed data">
        Commercial Context
      </SectionHeader>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card padding="p-5">
          <p className="text-label text-gray-500 uppercase tracking-wider mb-3">Price range (GBP) -- estimated</p>
          <div className="space-y-3">
            <div className="flex items-center justify-between py-2 border-b border-gray-100">
              <span className="text-caption text-gray-600">At home (ingredients)</span>
              <span className="text-body font-semibold text-navy">&pound;{commercial.priceHome[0]} &ndash; &pound;{commercial.priceHome[1]}</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-gray-100">
              <span className="text-caption text-gray-600">On-trade (bar)</span>
              <span className="text-body font-semibold text-navy">&pound;{commercial.priceOnTrade[0]} &ndash; &pound;{commercial.priceOnTrade[1]}</span>
            </div>
            {commercial.priceOnTradeLuxury && (
              <div className="flex items-center justify-between py-2">
                <span className="text-caption text-gray-600">Luxury / event</span>
                <span className="text-body font-semibold text-editorial">&pound;{commercial.priceOnTradeLuxury[0]} &ndash; &pound;{commercial.priceOnTradeLuxury[1]}</span>
              </div>
            )}
          </div>
        </Card>
        <Card padding="p-5">
          <p className="text-label text-gray-500 uppercase tracking-wider mb-3">Category forecast</p>
          <p className="text-body text-gray-700 leading-relaxed">{commercial.forecast}</p>
          <p className="text-caption text-gray-400 mt-3 pt-3 border-t border-gray-100 italic">
            Per-cocktail volume trend index has been removed. A fabricated indexed series (2021=100) previously appeared here and has been deleted. Category-level growth data cited above where available.
          </p>
        </Card>
      </div>
    </section>
  )
}

// ---- MODULE: Adjacent cocktails (no overlap scores) ------------------------
function AdjacentsModule({ adjacents }) {
  return (
    <section>
      <SectionHeader size="lg" subtitle="Frequently cross-ordered -- click to explore">
        Cross-Ordered With
      </SectionHeader>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {adjacents.map((a) => (
          <Link
            key={a.slug}
            to={`/p/chorus-cocktails/cocktail/${a.slug}`}
            className="no-underline"
          >
            <Card padding="p-4" hover>
              <div className="flex items-center justify-between">
                <span className="text-body font-semibold text-navy">{a.name}</span>
                <ExternalLink size={14} className="text-gray-400" />
              </div>
              <p className="text-caption text-gray-500 mt-1">Tap to explore</p>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  )
}

// ---- MODULE: Aggregate profile ----------------------------------------------
function AggregateProfileModule({ text }) {
  return (
    <section>
      <SectionHeader size="lg" subtitle="Flavour proximity + demographic crossover analysis">
        Cocktail Profile Summary
      </SectionHeader>
      <AccentCard padding="p-5">
        <p className="text-body text-navy leading-relaxed">{text}</p>
      </AccentCard>
    </section>
  )
}

// ---- MODULE: Methodology detail (bottom of page) ----------------------------
function MethodologyModule({ cocktail }) {
  return (
    <section>
      <SectionHeader size="lg" subtitle="What is sourced, what is estimated, what is illustrative">
        Methodology
      </SectionHeader>
      <Card padding="p-6">
        <div className="flex gap-3 mb-4">
          <BookOpen size={18} className="text-editorial shrink-0 mt-0.5" />
          <h3 className="text-body font-semibold text-navy">Data sourcing approach</h3>
        </div>
        <div className="space-y-4 text-caption text-gray-700 leading-relaxed">
          <p>
            <strong className="text-navy">What is sourced:</strong> Rankings from Drinks International Brand &amp; Bar Report 2025 and Difford's Guide Top 100 Cocktails 2025 are published primary sources. Category-level demographic data (age index, gender split, income profile) is drawn from IWSR-cited research held in Liquid Economy's internal intelligence files (spirits_01 through spirits_05). Any direct quotes from IWSR, CGA, SWA, CRT or DISCUS are identified in the note field of each demographic entry.
          </p>
          <p>
            <strong className="text-navy">What is estimated:</strong> Price ranges are market estimates based on observed UK on-trade and retail pricing as of April 2026. The flavour radar is a bartender-calibrated qualitative estimate on a 0-10 scale -- it is not derived from sensory analysis instruments. These are defensible editorial judgements, not claimed data.
          </p>
          <p>
            <strong className="text-navy">What is illustrative:</strong> Drinker persona archetypes are editorial constructs built from category-level research patterns. They are not derived from cocktail-level survey data and should not be presented to clients as primary research findings.
          </p>
          <p>
            <strong className="text-navy">What was removed (April 2026):</strong> This page previously displayed per-cocktail channel split percentages (on-trade/off-trade/RTD/home), per-cocktail market share by country, a 2021--2025 indexed volume trend line, and flavour "overlap scores" between cocktails. All of these were fabricated from category-level proxies and presented without adequate disclosure. They have been deleted. They will be reinstated only when underwritten by licensed per-cocktail IWSR data.
          </p>
          {cocktail.methodology && (
            <p className="italic text-gray-500 border-t border-gray-100 pt-4 mt-2">{cocktail.methodology}</p>
          )}
        </div>
      </Card>
    </section>
  )
}

// ---- MODULE: Sources --------------------------------------------------------
function SourcesModule({ sources }) {
  return (
    <section>
      <SectionHeader size="lg" subtitle="Data sources cited across all fields on this page">
        Sources
      </SectionHeader>
      <Card padding="p-5">
        <ul className="space-y-2">
          {sources.map((s, i) => (
            <li key={i} className="flex items-start gap-2">
              <span className="text-label text-gray-400 font-mono mt-0.5 shrink-0">{i + 1}.</span>
              {s.url ? (
                <a
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-caption text-editorial hover:text-navy inline-flex items-center gap-1 transition-colors no-underline"
                >
                  {s.label}
                  <ExternalLink size={10} />
                </a>
              ) : (
                <span className="text-caption text-gray-600">{s.label}</span>
              )}
            </li>
          ))}
        </ul>
      </Card>
    </section>
  )
}

// ---- Main page component ---------------------------------------------------
export default function CocktailDetail() {
  const { cocktailSlug } = useParams()
  const cocktail = getCocktailDetail(cocktailSlug)

  if (!cocktail) {
    return (
      <div className="max-w-3xl mx-auto py-12 px-4">
        <Link to="/p/chorus-cocktails" className="inline-flex items-center gap-1 text-caption text-gray-500 hover:text-navy mb-6 no-underline transition-colors">
          <ArrowLeft size={14} />
          Back to Chorus
        </Link>
        <div className="text-center py-16">
          <p className="text-subsection font-display text-navy mb-2">Cocktail not found</p>
          <p className="text-body text-gray-500 mb-6">Data for <strong>{cocktailSlug}</strong> will be added in Phase 2.</p>
          <Link to="/p/chorus-cocktails" className="text-editorial hover:text-navy transition-colors text-body font-medium no-underline">
            View all cocktails
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-5xl mx-auto py-8 px-4 space-y-10">
      {/* Breadcrumb */}
      <Link to="/p/chorus-cocktails" className="inline-flex items-center gap-1.5 text-caption text-gray-500 hover:text-navy mb-2 no-underline transition-colors">
        <ArrowLeft size={14} />
        Chorus Cocktail Intelligence
      </Link>

      {/* 1. Methodology banner */}
      <MethodologyBanner baseSpirit={cocktail.baseSpirit} />

      {/* 2. Hero */}
      <HeroModule cocktail={cocktail} />

      {/* 3. Demographics */}
      {cocktail.demographics && <DemographicsModule data={cocktail.demographics} />}

      {/* 4. Geographics */}
      {cocktail.geographics && <GeographicsModule data={cocktail.geographics} />}

      {/* 5. Personas */}
      {cocktail.personas && <PersonasModule personas={cocktail.personas} />}

      {/* 6. Flavour profile */}
      {cocktail.flavour && <FlavourModule flavour={cocktail.flavour} />}

      {/* 7. Recipe */}
      {cocktail.recipe && <RecipeModule recipe={cocktail.recipe} />}

      {/* 8. Commercial context */}
      {cocktail.commercial && <CommercialModule commercial={cocktail.commercial} />}

      {/* 9. Aggregate profile */}
      {cocktail.aggregateProfile && <AggregateProfileModule text={cocktail.aggregateProfile} />}

      {/* 10. Adjacent cocktails */}
      {cocktail.adjacents && cocktail.adjacents.length > 0 && (
        <AdjacentsModule adjacents={cocktail.adjacents} />
      )}

      {/* 11. Methodology detail */}
      <MethodologyModule cocktail={cocktail} />

      {/* 12. Sources */}
      {cocktail.sources && <SourcesModule sources={cocktail.sources} />}
    </div>
  )
}
