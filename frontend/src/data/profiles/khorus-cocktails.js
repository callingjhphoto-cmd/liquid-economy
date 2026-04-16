/**
 * khorus-cocktails.js
 * Khorus Cocktail Intelligence \u2014 use-case archetype
 * Migrated from src/data/profileKhorusCocktails.js (April 2026)
 *
 * Sources: 9 deep research reports in ~/Documents/Claude/research/chloe_khorus_cocktails/
 * All data unchanged from original. Thin wrapper pointing ClientProfile at existing arrays.
 */

import {
  top20Cocktails,
  flavourFamilies,
  luxuryVenueIntel,
  presentationTheatre,
  opportunityRadar,
  twentyYearArc,
} from '../profileKhorusCocktails'

// Source registry \u2014 every data point cites back into here.
// Keys are stable; labels + URLs render in the Methodology section and inline.
export const KHORUS_SOURCES = {
  DI: {
    key: 'DI',
    label: 'Drinks International \u2014 Brand & Bar Reports',
    shortLabel: 'Drinks International',
    url: 'https://drinksint.com/news/brands-reports',
    snippet: 'Annual survey of the world\u2019s 100 best bars. Rankings reflect list placement at elite on-premise venues, not consumer search volume.',
    coverage: '2013\u20132025 (annual)',
    methodology: 'Bartender survey across 100 nominated elite bars. Measures supply-side prestige \u2014 what top bars actually pour and list.',
  },
  DIFFORDS: {
    key: 'DIFFORDS',
    label: 'Difford\u2019s Guide \u2014 Top 100 Cocktails',
    shortLabel: 'Difford\u2019s Guide',
    url: 'https://www.diffordsguide.com/encyclopedia/288/bws/top-100-cocktails',
    snippet: '700k+ monthly page-view cocktail search platform. Rankings reflect real-world consumer intent.',
    coverage: '2015\u20132025 (monthly)',
    methodology: 'Rank derived from aggregated consumer page-views. Signals demand-side appetite rather than elite bar prestige.',
  },
  IWSR: {
    key: 'IWSR',
    label: 'IWSR Drinks Market Analysis',
    shortLabel: 'IWSR',
    url: 'https://www.theiwsr.com',
    snippet: 'Category-level volume and value data for global beverage alcohol and no/low-alcohol markets.',
    coverage: '2024\u20132028 forecast horizon',
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
    label: 'World\u2019s 50 Best Bars',
    shortLabel: 'World\u2019s 50 Best Bars',
    url: 'https://www.worlds50bestbars.com',
    snippet: 'Academy-voted ranking of the world\u2019s top 50 bars \u2014 a primary luxury on-premise reference.',
    coverage: '2013\u20132025 annual lists + menus',
    methodology: 'Secondary menu & signature-cocktail analysis across each year\u2019s top-50 venue list.',
  },
  TOTC: {
    key: 'TOTC',
    label: 'Tales of the Cocktail \u2014 Industry Reports',
    shortLabel: 'Tales of the Cocktail',
    url: 'https://talesofthecocktail.org',
    snippet: 'New Orleans industry conference \u2014 editorial round-ups capture seminar consensus on emerging directions.',
    coverage: '2024 & 2025 editions',
    methodology: 'Editorial synthesis of seminars, dinners and bartender interviews at TOTC.',
  },
  CGA: {
    key: 'CGA',
    label: 'CGA by NIQ \u2014 On-Premise Measurement',
    shortLabel: 'CGA by NIQ',
    url: 'https://cgastrategy.com',
    snippet: 'On-premise sales measurement \u2014 tracks actual drink-by-drink pour data in the USA and UK.',
    coverage: 'Rolling 52-week US/UK on-premise panel',
    methodology: 'EPOS-integrated sales tracking at panel venues. Used here for velocity (e.g. Espresso Martini +116%).',
  },
  R1: {
    key: 'R1',
    label: 'Liquid Economy \u2014 Khorus Internal Data Audit',
    shortLabel: 'Liquid Economy (R1)',
    url: null,
    snippet: 'Internal research audit \u2014 available on request to Khorus stakeholders.',
    coverage: 'April 2026',
    methodology: 'Cross-reference of primary sources against Khorus\u2019s own live event data.',
  },
  R4: {
    key: 'R4',
    label: 'Liquid Economy \u2014 Luxury Events Deep Research',
    shortLabel: 'Liquid Economy (R4)',
    url: null,
    snippet: 'Internal deep-dive on Connaught, F1, Fashion Week, Emirates Palace and peer venues.',
    coverage: 'April 2026',
    methodology: 'Venue-by-venue signature cocktail, pricing and theatre capture, triangulated from public menus, press and industry interviews.',
  },
  R5: {
    key: 'R5',
    label: 'Liquid Economy \u2014 Pricing Intelligence',
    shortLabel: 'Liquid Economy (R5)',
    url: null,
    snippet: 'Internal pricing intelligence across super-prime, members club, Gulf and F1 hospitality tiers.',
    coverage: 'April 2026',
    methodology: 'Direct pricing capture from venue menus + trade interviews. GBP / USD / AED conversion at April 2026 rates.',
  },
  R6: {
    key: 'R6',
    label: 'Liquid Economy \u2014 Middle East Luxury Cocktail Report',
    shortLabel: 'Liquid Economy (R6)',
    url: null,
    snippet: 'Gulf & Saudi-specific programme research including licensed venues and zero-proof innovation.',
    coverage: 'April 2026',
    methodology: 'Primary research with Gulf operators + IWSR Middle East data layer.',
  },
  R7: {
    key: 'R7',
    label: 'Liquid Economy \u2014 Zero-Proof Luxury Research',
    shortLabel: 'Liquid Economy (R7)',
    url: null,
    snippet: 'Zero-proof luxury programme research drawing on IWSR no/low data + operator interviews.',
    coverage: 'April 2026',
    methodology: 'IWSR no/low data, LVMH / Soho House / Rosewood public statements, and operator interviews.',
  },
  R8: {
    key: 'R8',
    label: 'Liquid Economy \u2014 Presentation & Theatre Report',
    shortLabel: 'Liquid Economy (R8)',
    url: null,
    snippet: 'Research pass on ice, glassware and activation formats at luxury venues.',
    coverage: 'April 2026',
    methodology: 'Supplier interviews (Gl\u00e4ce, Okamoto, Kold-Draft), venue capture, W50B menu review.',
  },
  R9: {
    key: 'R9',
    label: 'Liquid Economy \u2014 20-Year Cocktail Trend Arc',
    shortLabel: 'Liquid Economy (R9)',
    url: null,
    snippet: 'Longitudinal synthesis across DI, Difford\u2019s, IWSR, TOTC, W50B, CGA, Bacardi and Synthesis Research.',
    coverage: '2006\u20132026',
    methodology: 'Era-by-era triangulation: primary source figures per era, cross-checked against at least two independent sources.',
  },
}

// Per-module source mapping \u2014 which source keys back which module.
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
  if (c.diRank && !c.diRank.includes('\u2014')) rowSources.push('DI')
  if (c.diffordsRank && !c.diffordsRank.includes('\u2014')) rowSources.push('DIFFORDS')
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
  // source field on existing data is like '[R4][R5]' \u2014 parse to keys
  sources: (v.source || '')
    .match(/R\d/g)
    ?.map((s) => s.toUpperCase())
    .filter((k) => KHORUS_SOURCES[k]) || ['R4'],
}))

const annotatedOpportunities = opportunityRadar.map((o) => ({
  ...o,
  sources: o.id === 'zero-proof-weddings' ? ['R7', 'IWSR', 'DIFFORDS']
    : o.id === 'spritz-fatigue' ? ['DIFFORDS', 'DI']
    : ['R4', 'DI', 'CGA'],
}))

const khorusProfile = {
  slug: 'khorus-cocktails',
  name: 'Khorus Cocktail Intelligence',
  archetype: 'use-case',
  client: {
    name: 'Khorus',
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
    subtitle: 'Global ranking, flavour trends, luxury event intel \u2014 tailored for luxury events programming',
    lastUpdated: 'April 2026',
    dataFreshness: 'April 2026',
    sourcedFrom: 'DI World\u2019s 50 Best Bars Brand Report, Difford\u2019s Guide analytics, IWSR 2024\u20132026, Bacardi Cocktail Trends Report, W50B menu analysis, Tales of the Cocktail 2024\u20132025',
    contactEmail: 'callingjhphoto@gmail.com',
  },
  sources: KHORUS_SOURCES,
  modules: [
    { type: 'TopCocktails', data: { cocktails: annotatedCocktails, sourceKeys: moduleSources.topCocktails } },
    { type: 'FlavourRadar', data: { families: annotatedFlavours, sourceKeys: moduleSources.flavourRadar } },
    { type: 'LuxuryVenues', data: { venues: annotatedVenues, sourceKeys: moduleSources.luxuryVenues } },
    { type: 'Presentation', data: { ...presentationTheatre, sourceKeys: moduleSources.presentation } },
    { type: 'TrendArc', data: { ...twentyYearArc, sourceKeys: moduleSources.trendArc } },
    { type: 'OpportunityRadar', data: { narratives: annotatedOpportunities, sourceKeys: moduleSources.opportunityRadar } },
  ],
  narratives: annotatedOpportunities,
}

export default khorusProfile
