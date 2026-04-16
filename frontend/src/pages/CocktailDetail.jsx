/**
 * CocktailDetail.jsx
 * Full drill-down page for a single cocktail.
 * Route: /p/chorus-cocktails/cocktail/:cocktailSlug
 *
 * Modules:
 *   1. Hero
 *   2. Demographics (BarChart + PieChart)
 *   3. Geographics (bar chart top 10 markets)
 *   4. Consumption channel split (donut via PieChart)
 *   5. Persona cards
 *   6. Flavour profile (RadarChart + tag cloud)
 *   7. How to make at home (collapsible recipe)
 *   8. Commercial context (line chart + pricing)
 *   9. Adjacent cocktails (flavour-overlap graph-walk links)
 *   10. Sources
 */

import React, { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import {
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell,
  LineChart, Line,
} from 'recharts'
import { ArrowLeft, ChevronDown, ChevronUp, ExternalLink } from 'lucide-react'
import {
  Card,
  AccentCard,
  SectionHeader,
  Badge,
  PageHeader,
} from '../components/ui'
import { getCocktailDetail, FLAVOUR_KEYS, TREND_COLORS } from '../data/cocktailDetails'

// ---- colour palette ---------------------------------------------------------
const CHART_TOOLTIP = { contentStyle: { background: '#1e293b', border: 'none', borderRadius: '8px', color: '#f1f5f9' }, itemStyle: { color: '#94a3b8' }, labelStyle: { color: '#f1f5f9', fontWeight: 600 } }
const DEMOGRAPHIC_COLORS = ['#1e3a5f', '#2563eb', '#3b82f6', '#60a5fa', '#93c5fd']
const CHANNEL_COLORS = ['#1e3a5f', '#4ade80', '#f59e0b', '#818cf8']
const GEO_COLOR = '#2563eb'

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

// ---- Custom Recharts tooltip ------------------------------------------------
function DarkTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null
  return (
    <div style={{ background: '#1e293b', border: 'none', borderRadius: 8, padding: '8px 12px' }}>
      {label && <p style={{ color: '#f1f5f9', fontWeight: 600, marginBottom: 4, fontSize: 12 }}>{label}</p>}
      {payload.map((p, i) => (
        <p key={i} style={{ color: '#94a3b8', fontSize: 11, margin: '2px 0' }}>
          {p.name}: <span style={{ color: '#f1f5f9', fontWeight: 600 }}>{p.value}{p.name && p.name.toLowerCase().includes('pct') || typeof p.value === 'number' && p.value <= 100 ? '%' : ''}</span>
        </p>
      ))}
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

// ---- MODULE: Demographics ---------------------------------------------------
function DemographicsModule({ data }) {
  const [view, setView] = useState('age')
  const chartData = data[view] || []
  return (
    <section>
      <SectionHeader size="lg" subtitle="Consumer profile by age, gender and income — cited from category intelligence research">Demographics</SectionHeader>
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
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={chartData} margin={{ top: 4, right: 16, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
            <XAxis dataKey="bracket" tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} unit="%" />
            <Tooltip content={<DarkTooltip />} />
            <Bar dataKey="pct" name="Share" radius={[4, 4, 0, 0]}>
              {chartData.map((_, i) => (
                <Cell key={i} fill={DEMOGRAPHIC_COLORS[i % DEMOGRAPHIC_COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
        {data.note && <p className="text-caption text-gray-500 mt-3 italic">{data.note}</p>}
      </Card>
    </section>
  )
}

// ---- MODULE: Geographics ----------------------------------------------------
function GeographicsModule({ data }) {
  return (
    <section>
      <SectionHeader size="lg" subtitle="Top 10 consumption markets — indexed share of global cocktail calls at elite venues">Geographics</SectionHeader>
      <Card padding="p-5">
        <ResponsiveContainer width="100%" height={360}>
          <BarChart data={data} layout="vertical" margin={{ top: 0, right: 24, left: 8, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" horizontal={false} />
            <XAxis type="number" tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} unit="%" />
            <YAxis dataKey="market" type="category" width={120} interval={0} tick={{ fontSize: 11, fill: '#475569' }} axisLine={false} tickLine={false} />
            <Tooltip
              content={({ active, payload }) => {
                if (!active || !payload?.length) return null
                const d = payload[0]?.payload
                return (
                  <div style={{ background: '#1e293b', borderRadius: 8, padding: '10px 14px' }}>
                    <p style={{ color: '#f1f5f9', fontWeight: 600, fontSize: 13 }}>{d?.market}</p>
                    <p style={{ color: '#94a3b8', fontSize: 11 }}>Share: <span style={{ color: '#f1f5f9' }}>{d?.share}%</span></p>
                    {d?.note && <p style={{ color: '#94a3b8', fontSize: 11, marginTop: 4, maxWidth: 200 }}>{d.note}</p>}
                    {d?.source && <p style={{ color: '#475569', fontSize: 10, marginTop: 4 }}>Source: {d.source}</p>}
                  </div>
                )
              }}
            />
            <Bar dataKey="share" name="Market share" fill={GEO_COLOR} radius={[0, 4, 4, 0]} />
          </BarChart>
        </ResponsiveContainer>
        <p className="text-caption text-gray-400 mt-2">Shares are estimated percentages of global on-trade cocktail mentions at elite bars. Sources: DI, IWSR, Liquid Economy research.</p>
      </Card>
    </section>
  )
}

// ---- MODULE: Consumption split ----------------------------------------------
function ConsumptionModule({ data }) {
  const chartData = [
    { name: 'On-trade', value: data.onTrade },
    { name: 'Off-trade', value: data.offTrade },
    { name: 'RTD', value: data.rtd },
    { name: 'Home-made', value: data.home },
  ]
  const [active, setActive] = useState(null)
  return (
    <section>
      <SectionHeader size="lg" subtitle="Channel split by estimated volume share — hover for detail">Consumption Channels</SectionHeader>
      <Card padding="p-5">
        <div className="flex flex-col md:flex-row gap-6 items-center">
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={3}
                dataKey="value"
                onMouseEnter={(_, i) => setActive(i)}
                onMouseLeave={() => setActive(null)}
              >
                {chartData.map((_, i) => (
                  <Cell
                    key={i}
                    fill={CHANNEL_COLORS[i]}
                    opacity={active === null || active === i ? 1 : 0.4}
                    style={{ cursor: 'pointer' }}
                  />
                ))}
              </Pie>
              <Tooltip
                content={({ active: a, payload }) => {
                  if (!a || !payload?.length) return null
                  const d = payload[0]
                  return (
                    <div style={{ background: '#1e293b', borderRadius: 8, padding: '8px 12px' }}>
                      <p style={{ color: '#f1f5f9', fontWeight: 600, fontSize: 12 }}>{d.name}</p>
                      <p style={{ color: '#94a3b8', fontSize: 11 }}>{d.value}%</p>
                    </div>
                  )
                }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-3 min-w-[180px]">
            {chartData.map((d, i) => (
              <div
                key={d.name}
                className="flex items-center justify-between gap-4 cursor-pointer"
                onMouseEnter={() => setActive(i)}
                onMouseLeave={() => setActive(null)}
              >
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ background: CHANNEL_COLORS[i] }} />
                  <span className="text-caption text-gray-600">{d.name}</span>
                </div>
                <span className={`text-caption font-semibold ${active === i ? 'text-navy' : 'text-gray-500'}`}>{d.value}%</span>
              </div>
            ))}
          </div>
        </div>
        {data.source && (
          <p className="text-caption text-gray-400 mt-3 border-t border-gray-100 pt-3">{data.source}</p>
        )}
      </Card>
    </section>
  )
}

// ---- MODULE: Persona cards --------------------------------------------------
function PersonasModule({ personas }) {
  return (
    <section>
      <SectionHeader size="lg" subtitle="Drinker archetypes based on demographic + occasion analysis">Drinker Profiles</SectionHeader>
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
            <div className="border-t border-gray-100 pt-3">
              <p className="text-label text-gray-500 uppercase tracking-wider mb-1.5">Also orders</p>
              <div className="flex flex-wrap gap-1">
                {p.adjacents.map((a) => (
                  <Badge key={a} variant="default">{a}</Badge>
                ))}
              </div>
            </div>
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
      <SectionHeader size="lg" subtitle="Flavour profile radar + descriptor tags">Flavour Profile</SectionHeader>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card padding="p-5">
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
      <SectionHeader size="lg" subtitle="Full recipe with brand suggestions, method and difficulty">How to Make at Home</SectionHeader>
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

// ---- MODULE: Commercial Context --------------------------------------------
function CommercialModule({ commercial }) {
  return (
    <section>
      <SectionHeader size="lg" subtitle="5-year indexed volume trend + price range by channel">Commercial Context</SectionHeader>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card padding="p-5">
          <p className="text-label text-gray-500 uppercase tracking-wider mb-3">Volume trend (indexed, 2021 = 100)</p>
          <ResponsiveContainer width="100%" height={180}>
            <LineChart data={commercial.volumeTrend} margin={{ top: 4, right: 16, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
              <XAxis dataKey="year" tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} />
              <Tooltip content={<DarkTooltip />} />
              <Line type="monotone" dataKey="indexedGrowth" stroke="#1e3a5f" strokeWidth={2.5} dot={{ fill: '#1e3a5f', r: 4 }} name="Volume index" />
            </LineChart>
          </ResponsiveContainer>
        </Card>
        <Card padding="p-5">
          <p className="text-label text-gray-500 uppercase tracking-wider mb-3">Price range (GBP)</p>
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
          <div className="mt-4 pt-4 border-t border-gray-100">
            <p className="text-label text-gray-500 uppercase tracking-wider mb-1.5">Forecast</p>
            <p className="text-caption text-gray-700 leading-relaxed">{commercial.forecast}</p>
          </div>
        </Card>
      </div>
    </section>
  )
}

// ---- MODULE: Adjacent cocktails --------------------------------------------
function AdjacentsModule({ adjacents, parentSlug }) {
  return (
    <section>
      <SectionHeader size="lg" subtitle="Cocktails with highest flavour + demographic overlap &mdash; click to explore">People Who Drink This Also Drink</SectionHeader>
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
                <Badge variant="green">{a.overlapScore}% overlap</Badge>
              </div>
              <div className="mt-2 bg-gray-100 rounded-full h-1.5">
                <div className="h-1.5 rounded-full bg-navy" style={{ width: `${a.overlapScore}%` }} />
              </div>
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
      <SectionHeader size="lg" subtitle="Flavour proximity + demographic crossover analysis">Cocktails People Like You Drink</SectionHeader>
      <AccentCard padding="p-5">
        <p className="text-body text-navy leading-relaxed">{text}</p>
      </AccentCard>
    </section>
  )
}

// ---- MODULE: Sources --------------------------------------------------------
function SourcesModule({ sources }) {
  return (
    <section>
      <SectionHeader size="lg" subtitle="Data sources cited across all fields on this page">Sources</SectionHeader>
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

      {/* 1. Hero */}
      <HeroModule cocktail={cocktail} />

      {/* 2. Demographics */}
      <DemographicsModule data={cocktail.demographics} />

      {/* 3. Geographics */}
      <GeographicsModule data={cocktail.geographics} />

      {/* 4. Consumption channels */}
      <ConsumptionModule data={cocktail.consumption} />

      {/* 5. Personas */}
      <PersonasModule personas={cocktail.personas} />

      {/* 6. Flavour profile */}
      <FlavourModule flavour={cocktail.flavour} />

      {/* 7. Recipe */}
      <RecipeModule recipe={cocktail.recipe} />

      {/* 8. Commercial context */}
      <CommercialModule commercial={cocktail.commercial} />

      {/* 9. Aggregate profile */}
      <AggregateProfileModule text={cocktail.aggregateProfile} />

      {/* 10. Adjacent cocktails */}
      <AdjacentsModule adjacents={cocktail.adjacents} parentSlug={cocktailSlug} />

      {/* 11. Sources */}
      <SourcesModule sources={cocktail.sources} />
    </div>
  )
}
