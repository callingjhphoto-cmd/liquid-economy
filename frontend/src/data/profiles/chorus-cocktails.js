/**
 * chorus-cocktails.js
 * Chorus Cocktail Intelligence — use-case archetype
 * Migrated from src/data/profileChorusCocktails.js (April 2026)
 *
 * Sources: 9 deep research reports in ~/Documents/Claude/research/chloe_chorus_cocktails/
 * All data unchanged from original. Thin wrapper pointing ClientProfile at existing arrays.
 */

import {
  top20Cocktails,
  flavourFamilies,
  luxuryVenueIntel,
  presentationTheatre,
  opportunityRadar,
  twentyYearArc,
} from '../profileChorusCocktails'

import { drinksAuthorities } from './sources/drinksAuthorities'

// Source registry — every data point cites back into here.
// Keys are stable; labels + URLs render in the Methodology section and inline.
export const CHORUS_SOURCES = {
  DI: {
    key: 'DI',
    label: 'Drinks International — Brand & Bar Reports',
    shortLabel: 'Drinks International',
    url: 'https://drinksint.com/news/brands-reports',
    snippet: 'Annual survey of the world’s 100 best bars. Rankings reflect list placement at elite on-premise venues, not consumer search volume.',
    coverage: '2013–2025 (annual)',
    methodology: 'Bartender survey across 100 nominated elite bars. Measures supply-side prestige — what top bars actually pour and list.',
  },
  DIFFORDS: {
    key: 'DIFFORDS',
    label: 'Difford’s Guide — Top 100 Cocktails',
    shortLabel: 'Difford’s Guide',
    url: 'https://www.diffordsguide.com/encyclopedia/288/bws/top-100-cocktails',
    snippet: '700k+ monthly page-view cocktail search platform. Rankings reflect real-world consumer intent.',
    coverage: '2015–2025 (monthly)',
    methodology: 'Rank derived from aggregated consumer page-views. Signals demand-side appetite rather than elite bar prestige.',
  },
  IWSR: {
    key: 'IWSR',
    label: 'IWSR Drinks Market Analysis',
    shortLabel: 'IWSR',
    url: 'https://www.theiwsr.com',
    snippet: 'Category-level volume and value data for global beverage alcohol and no/low-alcohol markets.',
    coverage: '2024–2028 forecast horizon',
    methodology: 'Trade-channel survey + on/off-trade depletions. Figures cited are IWSR-published headline numbers (CAGR, value growth).',
  },
  BACARDI: {
    key: 'BACARDI',
    label: 'Bacardi Cocktail Trends Report 2025',
    shortLabel: 'Bacardi Trends',
    url: 'https://newsroom.bacardilimited.com/media-assets/bacardi-cocktail-trends-report',
    snippet: 'Annual global trends report surveying bartenders and consumers on flavour directions.',
    coverage: '2025 edition',
    methodology: 'Qualitative + quantitative survey of 2,000+ bartenders and 6,500 consumers across 12 markets.',
  },
  W50B: {
    key: 'W50B',
    label: 'World’s 50 Best Bars',
    shortLabel: 'World’s 50 Best Bars',
    url: 'https://www.worlds50bestbars.com',
    snippet: 'Academy-voted ranking of the world’s top 50 bars — a primary luxury on-premise reference.',
    coverage: '2013–2025 annual lists + menus',
    methodology: 'Secondary menu & signature-cocktail analysis across each year’s top-50 venue list.',
  },
  TOTC: {
    key: 'TOTC',
    label: 'Tales of the Cocktail — Industry Reports',
    shortLabel: 'Tales of the Cocktail',
    url: 'https://talesofthecocktail.org',
    snippet: 'New Orleans industry conference — editorial round-ups capture seminar consensus on emerging directions.',
    coverage: '2024 & 2025 editions',
    methodology: 'Editorial synthesis of seminars, dinners and bartender interviews at TOTC.',
  },
  CGA: {
    key: 'CGA',
    label: 'CGA by NIQ — On-Premise Measurement',
    shortLabel: 'CGA by NIQ',
    url: 'https://cgastrategy.com',
    snippet: 'On-premise sales measurement — tracks actual drink-by-drink pour data in the USA and UK.',
    coverage: 'Rolling 52-week US/UK on-premise panel',
    methodology: 'EPOS-integrated sales tracking at panel venues. Used here for velocity (e.g. Espresso Martini +116%).',
  },
  R1: {
    key: 'R1',
    label: 'Liquid Economy — Chorus Internal Data Audit',
    shortLabel: 'Liquid Economy (R1)',
    url: null,
    snippet: 'Internal research audit — available on request to Chorus stakeholders.',
    coverage: 'April 2026',
    methodology: 'Cross-reference of primary sources against Chorus’s own live event data.',
  },
  R4: {
    key: 'R4',
    label: 'Liquid Economy — Luxury Events Deep Research',
    shortLabel: 'Liquid Economy (R4)',
    url: null,
    snippet: 'Internal deep-dive on Connaught, F1, Fashion Week, Emirates Palace and peer venues.',
    coverage: 'April 2026',
    methodology: 'Venue-by-venue signature cocktail, pricing and theatre capture, triangulated from public menus, press and industry interviews.',
  },
  R5: {
    key: 'R5',
    label: 'Liquid Economy — Pricing Intelligence',
    shortLabel: 'Liquid Economy (R5)',
    url: null,
    snippet: 'Internal pricing intelligence across super-prime, members club, Gulf and F1 hospitality tiers.',
    coverage: 'April 2026',
    methodology: 'Direct pricing capture from venue menus + trade interviews. GBP / USD / AED conversion at April 2026 rates.',
  },
  R6: {
    key: 'R6',
    label: 'Liquid Economy — Middle East Luxury Cocktail Report',
    shortLabel: 'Liquid Economy (R6)',
    url: null,
    snippet: 'Gulf & Saudi-specific programme research including licensed venues and zero-proof innovation.',
    coverage: 'April 2026',
    methodology: 'Primary research with Gulf operators + IWSR Middle East data layer.',
  },
  R7: {
    key: 'R7',
    label: 'Liquid Economy — Zero-Proof Luxury Research',
    shortLabel: 'Liquid Economy (R7)',
    url: null,
    snippet: 'Zero-proof luxury programme research drawing on IWSR no/low data + operator interviews.',
    coverage: 'April 2026',
    methodology: 'IWSR no/low data, LVMH / Soho House / Rosewood public statements, and operator interviews.',
  },
  R8: {
    key: 'R8',
    label: 'Liquid Economy — Presentation & Theatre Report',
    shortLabel: 'Liquid Economy (R8)',
    url: null,
    snippet: 'Research pass on ice, glassware and activation formats at luxury venues.',
    coverage: 'April 2026',
    methodology: 'Supplier interviews (Gläce, Okamoto, Kold-Draft), venue capture, W50B menu review.',
  },
  R9: {
    key: 'R9',
    label: 'Liquid Economy — 20-Year Cocktail Trend Arc',
    shortLabel: 'Liquid Economy (R9)',
    url: null,
    snippet: 'Longitudinal synthesis across DI, Difford’s, IWSR, TOTC, W50B, CGA, Bacardi and Synthesis Research.',
    coverage: '2006–2026',
    methodology: 'Era-by-era triangulation: primary source figures per era, cross-checked against at least two independent sources.',
  },
}

// Per-module source mapping — which source keys back which module.
const moduleSources = {
  topCocktails: ['DI', 'DIFFORDS', 'IWSR', 'CGA'],
  flavourRadar: ['BACARDI', 'TOTC', 'W50B', 'DIFFORDS'],
  luxuryVenues: ['R4', 'R5', 'R6'],
  presentation: ['R8', 'W50B'],
  trendArc: ['R9', 'DI', 'DIFFORDS', 'IWSR', 'TOTC', 'W50B', 'CGA', 'BACARDI'],
  opportunityRadar: ['R7', 'IWSR', 'DIFFORDS', 'DI', 'CGA', 'R4'],
}

// Annotate top cocktails rows with a specific source key (DI vs DIFFORDS) so each
// rank cell can be cited individually.
const annotatedCocktails = top20Cocktails.map((c) => {
  const rowSources = []
  if (c.diRank && !c.diRank.includes('—')) rowSources.push('DI')
  if (c.diffordsRank && !c.diffordsRank.includes('—')) rowSources.push('DIFFORDS')
  // Espresso Martini explicitly references CGA velocity data
  if (c.note && c.note.includes('CGA')) rowSources.push('CGA')
  return { ...c, sources: rowSources.length ? rowSources : ['DI'] }
})

const annotatedFlavours = flavourFamilies.map((f) => ({
  ...f,
  sources: ['BACARDI', 'TOTC', 'W50B'],
}))

const annotatedVenues = luxuryVenueIntel.map((v) => ({
  ...v,
  // source field on existing data is like '[R4][R5]' — parse to keys
  sources: (v.source || '')
    .match(/R\d/g)
    ?.map((s) => s.toUpperCase())
    .filter((k) => CHORUS_SOURCES[k]) || ['R4'],
}))

const annotatedOpportunities = opportunityRadar.map((o) => ({
  ...o,
  sources: o.id === 'zero-proof-weddings' ? ['R7', 'IWSR', 'DIFFORDS']
    : o.id === 'spritz-fatigue' ? ['DIFFORDS', 'DI']
    : ['R4', 'DI', 'CGA'],
}))

const chorusProfile = {
  slug: 'chorus-cocktails',
  name: 'Chorus Cocktail Intelligence',
  archetype: 'use-case',
  client: {
    name: 'Chorus',
    website: null,
    primaryContact: 'Chloe',
  },
  scope: {
    categories: ['cocktails', 'spirits', 'liqueurs'],
    skus: [],
    markets: ['UK', 'UAE', 'USA', 'France'],
    competitorSet: ['Quintessentially', 'Banana Split', 'Bruce Russell'],
  },
  meta: {
    profileTitle: 'Cocktail Intelligence Profile',
    subtitle: 'Global ranking, flavour trends, luxury event intel — tailored for luxury events programming',
    lastUpdated: 'April 2026',
    dataFreshness: 'April 2026',
    sourcedFrom: 'DI World’s 50 Best Bars Brand Report, Difford’s Guide analytics, IWSR 2024–2026, Bacardi Cocktail Trends Report, W50B menu analysis, Tales of the Cocktail 2024–2025',
    contactEmail: 'callingjhphoto@gmail.com',
  },
  sources: CHORUS_SOURCES,
  modules: [
    { type: 'TopCocktails', data: { cocktails: annotatedCocktails, sourceKeys: moduleSources.topCocktails } },
    { type: 'FlavourRadar', data: { families: annotatedFlavours, sourceKeys: moduleSources.flavourRadar } },
    { type: 'FlavourDemographicAggregator', data: { sourceKeys: ['DI', 'DIFFORDS', 'IWSR', 'CGA', 'BACARDI'] } },
    { type: 'LuxuryVenues', data: { venues: annotatedVenues, sourceKeys: moduleSources.luxuryVenues } },
    { type: 'Presentation', data: { ...presentationTheatre, sourceKeys: moduleSources.presentation } },
    { type: 'TrendArc', data: { ...twentyYearArc, sourceKeys: moduleSources.trendArc } },
    { type: 'W50BMenuIntel', data: { sourceKeys: ['W50B', 'DI', 'DIFFORDS', 'BACARDI'] } },
    { type: 'SourcesAuthorities', title: 'Sources & Authorities', anchor: 'sources', data: { sources: drinksAuthorities } },
    { type: 'OpportunityRadar', data: { narratives: annotatedOpportunities, sourceKeys: moduleSources.opportunityRadar } },
  ],
  narratives: annotatedOpportunities,
}

export default chorusProfile
