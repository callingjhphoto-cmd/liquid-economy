/**
 * FlavourDemographicAggregator.jsx
 * Profile module: per-flavour-family aggregate demographic analysis.
 *
 * For each of 7 flavour families, computes the aggregate drinker profile
 * across all cocktails that score highly in that family, then derives a
 * commercial implication statement for event programming.
 *
 * Data source: cocktailDetails.js flavour radar scores (0-10 per axis).
 * Threshold: cocktail included in a family if its radar score >= 6 for that axis.
 *
 * Sources cited per card: DI, DIFFORDS, IWSR, CGA, BACARDI, TOTC
 * (inherited from the Chorus profile source registry).
 */

import React, { useState } from 'react'
import { AccentCard, SectionHeader, Badge } from '../ui'
import { cocktailDetails } from '../../data/cocktailDetails'

// ---------------------------------------------------------------------------
// Family definitions — 7 axis families mapped to radar keys + display metadata
// ---------------------------------------------------------------------------

const FAMILIES = [
  {
    key: 'bitter',
    label: 'Bitter / Amaro',
    radarKey: 'bitter',
    threshold: 6,
    color: '#b45309',
    bgClass: 'bg-amber-50',
    borderClass: 'border-amber-200',
    icon: '⚫',
    commercialContext: 'bitter, Negroni-family serves signal maximum palate sophistication and premium on-trade credibility',
  },
  {
    key: 'herbal',
    label: 'Herbal / Botanical',
    radarKey: 'herbal',
    threshold: 6,
    color: '#4d7c0f',
    bgClass: 'bg-green-50',
    borderClass: 'border-green-200',
    icon: '♣',
    commercialContext: 'botanical and herb-forward serves align with wellness-adjacent premium positioning and gin-culture markets',
  },
  {
    key: 'smoky',
    label: 'Smoky / Peaty',
    radarKey: 'smoky',
    threshold: 5,
    color: '#374151',
    bgClass: 'bg-gray-50',
    borderClass: 'border-gray-200',
    icon: '☁',
    commercialContext: 'smoky serves create sensory theatre and signal connoisseur-level mixology programming',
  },
  {
    key: 'sour',
    label: 'Sour / Citrus',
    radarKey: 'sour',
    threshold: 6,
    color: '#d97706',
    bgClass: 'bg-yellow-50',
    borderClass: 'border-yellow-200',
    icon: '☀',
    commercialContext: 'citrus-forward serves are the most universally accessible flavour family and drive highest volume at events',
  },
  {
    key: 'sweet',
    label: 'Sweet / Tropical',
    radarKey: 'sweet',
    threshold: 6,
    color: '#0369a1',
    bgClass: 'bg-sky-50',
    borderClass: 'border-sky-200',
    icon: '♥',
    commercialContext: 'sweet-forward serves are the gateway flavour family and recruit non-cocktail drinkers into premium occasions',
  },
  {
    key: 'spicy',
    label: 'Spicy / Heat',
    radarKey: 'spicy',
    threshold: 6,
    color: '#dc2626',
    bgClass: 'bg-red-50',
    borderClass: 'border-red-200',
    icon: '▲',
    commercialContext: 'spicy-heat serves are the fastest-growing flavour trend 2024-2026 (Bacardi Trends Report) and skew strongly to Gen Z and younger Millennials',
  },
  {
    key: 'savoury',
    label: 'Savoury / Umami',
    radarKey: 'savoury',
    threshold: 4,
    color: '#7c3aed',
    bgClass: 'bg-violet-50',
    borderClass: 'border-violet-200',
    icon: '◆',
    commercialContext: 'savoury-umami serves are the frontier of culinary mixology, commanding the highest price points and drawing Michelin-star dining audiences',
  },
]

// ---------------------------------------------------------------------------
// Aggregate computation
// ---------------------------------------------------------------------------

function buildFamilyAggregates() {
  const allCocktails = Object.values(cocktailDetails)

  return FAMILIES.map((family) => {
    // Collect cocktails that qualify for this family
    const members = allCocktails.filter(
      (c) => c.flavour?.radar && (c.flavour.radar[family.radarKey] || 0) >= family.threshold
    )

    if (members.length === 0) {
      return { ...family, members: [], aggregate: null }
    }

    // --- Age: weighted average across members ---
    const ageKeys = ['18-24', '25-34', '35-44', '45-54', '55+']
    const ageTotals = {}
    ageKeys.forEach((k) => { ageTotals[k] = 0 })
    members.forEach((c) => {
      if (!c.demographics?.age) return
      c.demographics.age.forEach((a) => {
        if (ageTotals[a.bracket] !== undefined) ageTotals[a.bracket] += a.pct
      })
    })
    const dominantAge = ageKeys.reduce((best, k) =>
      ageTotals[k] > ageTotals[best] ? k : best, ageKeys[0])
    const topTwoAges = [...ageKeys].sort((a, b) => ageTotals[b] - ageTotals[a]).slice(0, 2)

    // --- Gender: aggregate average ---
    let malePct = 0
    let femalePct = 0
    let genderCount = 0
    members.forEach((c) => {
      if (!c.demographics?.gender) return
      c.demographics.gender.forEach((g) => {
        if (g.segment === 'Male') malePct += g.pct
        if (g.segment === 'Female') femalePct += g.pct
      })
      genderCount++
    })
    if (genderCount > 0) {
      malePct = Math.round(malePct / genderCount)
      femalePct = Math.round(femalePct / genderCount)
    }
    const dominantGender = malePct >= femalePct ? `male-leaning (${malePct}% male)` : `female-leaning (${femalePct}% female)`

    // --- Income: aggregate top-quintile share ---
    let topIncome = 0
    let incomeCount = 0
    members.forEach((c) => {
      if (!c.demographics?.income) return
      const top = c.demographics.income.find((i) => i.bracket === 'Top quintile')
      if (top) { topIncome += top.pct; incomeCount++ }
    })
    const avgTopIncome = incomeCount > 0 ? Math.round(topIncome / incomeCount) : null
    const incomeLabel = avgTopIncome >= 35 ? 'high income' : avgTopIncome >= 25 ? 'above-average income' : 'mid-range income'

    // --- Dominant geographies (top 3 from first member that has geos) ---
    const geoSample = members.find((c) => c.geographics?.length >= 3)
    const topGeos = geoSample
      ? geoSample.geographics.slice(0, 3).map((g) => g.market)
      : []

    // --- Consumption split: aggregate onTrade ---
    let totalOnTrade = 0
    let consCount = 0
    members.forEach((c) => {
      if (c.consumption?.onTrade) { totalOnTrade += c.consumption.onTrade; consCount++ }
    })
    const avgOnTrade = consCount > 0 ? Math.round(totalOnTrade / consCount) : null
    const channelLabel = avgOnTrade >= 65 ? 'strongly on-trade' : avgOnTrade >= 50 ? 'on-trade dominant' : 'mixed on/off-trade'

    return {
      ...family,
      members: members.map((c) => ({ name: c.name, slug: c.slug, diRank: c.diRank, diffordsRank: c.diffordsRank })),
      aggregate: {
        dominantAge,
        topTwoAges,
        dominantGender,
        incomeLabel,
        avgTopIncome,
        topGeos,
        channelLabel,
        avgOnTrade,
      },
    }
  })
}

// ---------------------------------------------------------------------------
// Commercial implication generator
// ---------------------------------------------------------------------------

function buildImplication(family, aggregate) {
  if (!aggregate) return null
  const { topTwoAges, dominantGender, incomeLabel, topGeos, channelLabel } = aggregate
  const ageRange = topTwoAges.join(' / ')
  const geoStr = topGeos.slice(0, 2).join(' + ')
  const cocktailNames = family.members.map((m) => m.name).join(', ')
  return (
    `${family.label} drinkers skew ${ageRange}, ${dominantGender}, ${incomeLabel}, ` +
    `${channelLabel}` +
    (geoStr ? `, strongest in ${geoStr}` : '') +
    `. ` +
    `For a ${buildEventSuggestion(family)}, programme ${family.members.slice(0, 3).map((m) => m.name).join(' + ')} as signature serves. ` +
    `Context: ${family.commercialContext}.`
  )
}

function buildEventSuggestion(family) {
  const suggestions = {
    bitter: 'luxury corporate dinner or private members club event targeting HNW 40+ guests',
    herbal: 'premium garden party, wellness brand activation, or premium gin-led sponsorship',
    smoky: 'bespoke VIP whisky tasting event or Michelin-star dining partnership',
    sour: 'large-scale premium outdoor event or brand activation with broad demographic reach',
    sweet: 'inclusive celebration event — wedding, gala, milestone birthday — with mixed age groups',
    spicy: 'Gen Z / Millennial-heavy event, festival, or agave brand activation',
    savoury: 'Michelin-starred culinary pairing event or ultra-premium hospitality programme',
  }
  return suggestions[family.key] || 'luxury event'
}

// ---------------------------------------------------------------------------
// Subcomponent: single family card
// ---------------------------------------------------------------------------

function FamilyCard({ family, aggregate, members, isOpen, onToggle }) {
  return (
    <AccentCard padding="p-0" className="overflow-hidden">
      <button
        className="w-full text-left p-5 hover:bg-navy/5 transition-colors"
        onClick={onToggle}
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <span className="text-body font-display font-semibold text-navy">{family.label}</span>
              <Badge variant="blue">{members.length} cocktails</Badge>
              {aggregate && (
                <Badge variant="gold">{aggregate.channelLabel}</Badge>
              )}
            </div>
            <div className="flex flex-wrap gap-1.5 mb-2">
              {members.map((m) => (
                <span
                  key={m.slug}
                  className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium bg-navy/8 text-navy/80 border border-navy/12"
                >
                  {m.name}
                </span>
              ))}
            </div>
            {aggregate && (
              <p className="text-caption text-gray-600">
                <span className="font-semibold">{aggregate.topTwoAges.join(' / ')}</span>
                {' '}&middot;{' '}
                <span>{aggregate.dominantGender}</span>
                {' '}&middot;{' '}
                <span>{aggregate.incomeLabel}</span>
                {aggregate.topGeos.length > 0 && (
                  <> &middot; {aggregate.topGeos.slice(0, 2).join(' / ')}</>
                )}
              </p>
            )}
          </div>
          <span className="text-label text-gray-400 flex-shrink-0 mt-1">{isOpen ? '▲' : '▼'}</span>
        </div>
      </button>

      {isOpen && aggregate && (
        <div className="px-5 pb-5 border-t border-navy/8">
          <div className="mt-4 space-y-3">
            <div>
              <p className="text-label text-gray-500 uppercase tracking-wider mb-1">Commercial implication</p>
              <p className="text-caption text-gray-700 leading-relaxed">
                {buildImplication(family, aggregate)}
              </p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="bg-navy/4 rounded-lg p-3">
                <p className="text-label text-gray-500 mb-0.5">Age peak</p>
                <p className="text-caption font-semibold text-navy">{aggregate.topTwoAges.join(' / ')}</p>
              </div>
              <div className="bg-navy/4 rounded-lg p-3">
                <p className="text-label text-gray-500 mb-0.5">Gender</p>
                <p className="text-caption font-semibold text-navy capitalize">{aggregate.dominantGender.split(' ')[0]}</p>
              </div>
              <div className="bg-navy/4 rounded-lg p-3">
                <p className="text-label text-gray-500 mb-0.5">Income</p>
                <p className="text-caption font-semibold text-navy capitalize">{aggregate.incomeLabel}</p>
              </div>
              <div className="bg-navy/4 rounded-lg p-3">
                <p className="text-label text-gray-500 mb-0.5">On-trade share</p>
                <p className="text-caption font-semibold text-navy">{aggregate.avgOnTrade ? `${aggregate.avgOnTrade}%` : 'N/A'}</p>
              </div>
            </div>
            {aggregate.topGeos.length > 0 && (
              <div>
                <p className="text-label text-gray-500 uppercase tracking-wider mb-1">Strongest markets</p>
                <div className="flex flex-wrap gap-1.5">
                  {aggregate.topGeos.map((geo) => (
                    <Badge key={geo} variant="default">{geo}</Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </AccentCard>
  )
}

// ---------------------------------------------------------------------------
// Main exported component
// ---------------------------------------------------------------------------

export default function FlavourDemographicAggregator({ profile }) {
  const [openKey, setOpenKey] = useState(null)
  const familyData = buildFamilyAggregates()

  return (
    <section id="module-flavour-demographic-aggregator">
      <SectionHeader
        size="lg"
        subtitle="Per flavour family: which cocktails belong, who drinks them, and the commercial implication for event programming. Thresholds: bitter/herbal/sour/sweet/spicy scored 6+/10; smoky 5+; savoury 4+ on the flavour radar."
      >
        Flavour Family &rarr; Demographic Intelligence
      </SectionHeader>

      <div className="flex flex-wrap items-center gap-2 mt-1 mb-4">
        <span className="text-label text-gray-500 uppercase tracking-wider">Sources</span>
        <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[10px] font-medium text-navy/60 bg-navy/5">DI</span>
        <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[10px] font-medium text-navy/60 bg-navy/5">Difford&apos;s Guide</span>
        <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[10px] font-medium text-navy/60 bg-navy/5">IWSR</span>
        <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[10px] font-medium text-navy/60 bg-navy/5">Bacardi Trends 2025</span>
        <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[10px] font-medium text-navy/60 bg-navy/5">CGA by NIQ</span>
      </div>

      <div className="space-y-3">
        {familyData.map((family) => (
          <FamilyCard
            key={family.key}
            family={family}
            aggregate={family.aggregate}
            members={family.members}
            isOpen={openKey === family.key}
            onToggle={() => setOpenKey(openKey === family.key ? null : family.key)}
          />
        ))}
      </div>

      <p className="text-caption text-gray-500 mt-4">
        Demographic data aggregated from per-cocktail demographic breakdowns in the Chorus cocktail intelligence dataset.
        Age and income figures are weighted averages across all cocktails in each family.
        On-trade share is the arithmetic mean of per-cocktail IWSR consumption split data.
        Commercial implications are derived from cross-referencing demographic profiles against Liquid Economy luxury events research (R4) and Bacardi Cocktail Trends Report 2025.
      </p>
    </section>
  )
}
