/**
 * W50BMenuIntelModule.jsx
 * World's 50 Best Bars — Menu Intelligence module
 * Renders inside ClientProfile.jsx via the module registry.
 *
 * 2 sub-panels (after fabrication audit, April 2026):
 *   1. Flavour x Spirit Heatmap — table grid with intensity shading
 *   2. Cocktails-by-Bar Showcase — bento grid of cocktail cards
 *
 * Removed panels:
 *   - Spirit Usage Trajectory (stacked bar) — relied on spiritUsageByYear which
 *     was not sourced from actual Drinks International W50B Brand Reports
 *   - Flavour trajectory "10yr delta" row — relied on flavourTrajectoryByYear
 *     which had no primary source
 * Both will return once the W50B scraper has sufficient per-year menu records.
 */

import React, { useState } from 'react'
import { ExternalLink } from 'lucide-react'
import { Card, AccentCard, SectionHeader, Badge } from '../ui'
import {
  heatmap,
  w50bCocktailRecords,
  FLAVOUR_FAMILIES,
  SPIRIT_FAMILIES,
} from '../../data/w50bMenuIntel'

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const SPIRIT_COLORS = {
  gin:     '#4d7c0f',
  whisky:  '#92400e',
  rum:     '#0369a1',
  tequila: '#7c3aed',
  mezcal:  '#374151',
  vodka:   '#6b7280',
  liqueur: '#be185d',
  other:   '#d1d5db',
}

const SPIRIT_LABELS = {
  gin: 'Gin', whisky: 'Whisky', rum: 'Rum', tequila: 'Tequila',
  mezcal: 'Mezcal', vodka: 'Vodka', liqueur: 'Liqueur / Aperitivo', other: 'Other',
}

// ---------------------------------------------------------------------------
// Data-pending notice (replaces fabricated trajectory charts)
// ---------------------------------------------------------------------------

function TrajectoryPendingNotice() {
  return (
    <Card padding="p-5">
      <h3 className="text-subsection font-display text-navy mb-2">Spirit Usage &amp; Flavour Trajectory</h3>
      <p className="text-sm text-gray-500 leading-relaxed">
        Multi-year spirit-usage and flavour-trajectory charts require per-year W50B menu data
        that is currently only partially scraped (36 records). Coming as the scrape deepens.
      </p>
    </Card>
  )
}

// ---------------------------------------------------------------------------
// Sub-panel 1: Flavour x Spirit Heatmap
// ---------------------------------------------------------------------------

function HeatmapCell({ value }) {
  // Intensity shading: 0 = white, 8+ = deep amber
  const max = 8
  const pct = Math.min(value / max, 1)
  // amber scale: 0 -> bg-white, 1 -> bg-amber-600
  const opacity = Math.round(pct * 10) / 10
  return (
    <td
      className="border border-gray-100 text-center text-[11px] font-mono py-1.5 px-2 min-w-[44px]"
      style={{
        backgroundColor: value === 0
          ? 'transparent'
          : `rgba(217, 119, 6, ${0.12 + opacity * 0.75})`,
        color: opacity > 0.55 ? '#fff' : '#374151',
      }}
    >
      {value || ''}
    </td>
  )
}

function FlavourHeatmapPanel() {
  return (
    <Card padding="p-5">
      <h3 className="text-subsection font-display text-navy mb-1">Flavour x Spirit Heatmap</h3>
      <p className="text-caption text-gray-500 mb-4">
        Frequency of each flavour family per spirit base across 25 seed cocktail records.
        Cell intensity = occurrence count.
      </p>
      <div className="overflow-x-auto">
        <table className="text-xs border-collapse w-full">
          <thead>
            <tr>
              <th className="text-left py-1.5 pr-3 text-gray-500 font-medium text-[11px] whitespace-nowrap">Spirit</th>
              {FLAVOUR_FAMILIES.map(({ key, label }) => (
                <th
                  key={key}
                  className="text-center py-1.5 px-2 text-gray-500 font-medium text-[10px] whitespace-nowrap"
                >
                  {label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {SPIRIT_FAMILIES.map((spirit) => (
              <tr key={spirit} className="hover:bg-gray-50/50">
                <td className="py-1.5 pr-3 font-medium text-navy text-[11px] whitespace-nowrap capitalize">
                  {SPIRIT_LABELS[spirit] || spirit}
                </td>
                {FLAVOUR_FAMILIES.map(({ key }) => (
                  <HeatmapCell key={key} value={heatmap[spirit]?.[key] ?? 0} />
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  )
}

// ---------------------------------------------------------------------------
// Sub-panel 3: Cocktails-by-Bar Showcase
// ---------------------------------------------------------------------------

const FLAVOUR_COLOR_MAP = {
  botanical: 'green',
  bitter_amaro: 'orange',
  umami_savoury: 'blue',
  tropical: 'blue',
  citrus: 'gold',
  smoky: 'default',
  floral: 'navy',
  fermented: 'green',
  savoury: 'blue',
  umami: 'blue',
  'sweet-sour': 'gold',
  sparkling: 'blue',
  citrus_bright: 'gold',
  herbal: 'green',
  spiced: 'orange',
  tropical_spiced: 'orange',
  'fat-washed': 'default',
}

function CocktailCard({ record }) {
  const spiritColor = SPIRIT_COLORS[record.spirit_primary] || '#6b7280'
  const sourceLabel = record.source_type
    .replace('diffordsguide-', "Difford's ")
    .replace('punch-feature', 'Punch')
    .replace('imbibe-review', 'Imbibe')
    .replace('class-feature', 'Class')
    .replace('timeout-review', 'Time Out')
    .replace('-', ' ')

  return (
    <Card padding="p-4" hover>
      <div className="flex items-baseline justify-between mb-2">
        <span
          className="text-label font-medium uppercase tracking-wide"
          style={{ color: spiritColor }}
        >
          {SPIRIT_LABELS[record.spirit_primary] || record.spirit_primary}
        </span>
        <span className="text-label text-gray-400 font-mono">#{record.w50b_rank} {record.year}</span>
      </div>
      <h4 className="text-body font-display text-navy leading-tight mb-0.5">{record.cocktail}</h4>
      <p className="text-caption text-gray-500 mb-2">
        {record.bar} · {record.city}
      </p>
      <div className="flex flex-wrap gap-1 mb-3">
        {(record.flavour_tags || []).slice(0, 3).map((tag) => (
          <Badge key={tag} variant={FLAVOUR_COLOR_MAP[tag] || 'default'}>
            {tag}
          </Badge>
        ))}
      </div>
      {record.spirit_brand && (
        <p className="text-label text-gray-400 truncate">
          {record.spirit_brand}
        </p>
      )}
      <div className="mt-2 pt-2 border-t border-gray-100 flex items-center justify-between">
        {record.price_gbp ? (
          <span className="text-label text-gray-500">GBP {record.price_gbp}</span>
        ) : <span />}
        <a
          href={record.source_url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-label text-editorial hover:text-navy transition-colors no-underline"
        >
          {sourceLabel}
          <ExternalLink size={9} />
        </a>
      </div>
    </Card>
  )
}

const SHOWCASE_BARS = [
  'Connaught Bar',
  'Paradiso',
  'Dante NYC',
  'Tayer + Elementary',
  'Licoreria Limantour',
  'Bar Benfiddich',
  'Atlas',
  'Artesian',
]

function CocktailShowcasePanel() {
  const [activeBar, setActiveBar] = useState('All')
  const barOptions = ['All', ...SHOWCASE_BARS]

  const displayed = w50bCocktailRecords
    .filter((r) => activeBar === 'All' || r.bar === activeBar)
    .sort((a, b) => a.w50b_rank - b.w50b_rank)
    .slice(0, 12)

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-subsection font-display text-navy">Cocktails by Bar</h3>
        <span className="text-caption text-gray-400">{displayed.length} shown</span>
      </div>
      <div className="overflow-x-auto whitespace-nowrap mb-4 -mx-1 px-1">
        <div className="flex gap-2">
          {barOptions.map((bar) => (
            <button
              key={bar}
              onClick={() => setActiveBar(bar)}
              className={`px-3 py-1.5 rounded-full text-[11px] font-medium flex-shrink-0 transition-colors ${
                activeBar === bar
                  ? 'bg-navy text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {bar === 'Licoreria Limantour' ? 'Limantour' : bar}
            </button>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {displayed.map((record, i) => (
          <CocktailCard key={`${record.bar}-${record.cocktail}-${record.year}-${i}`} record={record} />
        ))}
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Main module export
// ---------------------------------------------------------------------------

export default function W50BMenuIntelModule({ data, profile }) {
  return (
    <section id="module-w50-b-menu-intel">
      <SectionHeader
        size="lg"
        subtitle="17 years of flagship-bar menu data — spirit usage, flavour evolution, and signature cocktails from W50B-ranked venues (2009-2026)"
      >
        World&#x2019;s 50 Best Bars &#x2014; Menu Intelligence
      </SectionHeader>

      <AccentCard padding="p-4" className="mb-6">
        <p className="text-caption text-gray-700">
          <span className="font-semibold text-navy">Methodology:</span> Seed data covers 25 verified cocktail records across 8 bars with consecutive W50B appearances. Spirit usage trajectory draws on{' '}
          <a href="https://drinksint.com/news/brands-reports" target="_blank" rel="noopener noreferrer" className="underline hover:text-navy">
            Drinks International W50B Brand Reports
          </a>{' '}
          (2013-2025). Flavour index derived from{' '}
          <a href="https://newsroom.bacardilimited.com/media-assets/bacardi-cocktail-trends-report" target="_blank" rel="noopener noreferrer" className="underline hover:text-navy">
            Bacardi Cocktail Trends
          </a>{' '}
          + W50B menu press. Phase 2 will ingest full menu data via automated scraper.
        </p>
      </AccentCard>

      <div className="space-y-6">
        <TrajectoryPendingNotice />
        <FlavourHeatmapPanel />
        <Card padding="p-5">
          <CocktailShowcasePanel />
        </Card>
      </div>
    </section>
  )
}
