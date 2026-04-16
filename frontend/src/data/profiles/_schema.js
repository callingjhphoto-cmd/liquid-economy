/**
 * _schema.js
 * Shared schema definition for Liquid Economy client profiles.
 * Each profile file exports a default object conforming to this shape.
 *
 * ARCHETYPES
 *   'use-case'    — experience buyer (e.g. Chorus: luxury events lens)
 *   'brand-owner' — gin/whisky/spirits producer (e.g. Eden Mill: category lens)
 *   'regional'    — regional producer (e.g. Cava bodega: sparkling + market lens)
 *
 * MODULE TYPES (ClientProfile renderer registry)
 *   TopCocktails       — cocktail ranking table (use-case)
 *   FlavourRadar       — flavour family cards (use-case)
 *   LuxuryVenues       — luxury venue intel cards (use-case)
 *   Presentation       — ice/glassware/theatre cards (use-case)
 *   TrendArc           — multi-era trend timeline (use-case)
 *   CategorySnapshot   — sub-category share + CAGR (brand-owner)
 *   CompetitorWatch    — competitor set cards (brand-owner)
 *   MarketIntel        — market entry signals per region (brand-owner/regional)
 *   DemographicsLens   — demographic breakdown filtered to category (brand-owner)
 *   OpportunityRadar   — 3-5 commercial narrative cards (all archetypes)
 *
 * SCHEMA
 * {
 *   slug: string,
 *   name: string,
 *   archetype: 'use-case' | 'brand-owner' | 'regional',
 *   client: {
 *     name: string,
 *     website: string,
 *     primaryContact: string,
 *   },
 *   scope: {
 *     categories: string[],
 *     skus: string[],
 *     markets: string[],
 *     competitorSet: string[],
 *   },
 *   meta: {
 *     profileTitle: string,
 *     subtitle: string,
 *     lastUpdated: string,
 *     dataFreshness: string,
 *     sourcedFrom: string,
 *     contactEmail: string,
 *   },
 *   modules: Array<{ type: string, data: object }>,
 *   narratives: Array<OpportunityNarrative>,
 * }
 *
 * OPPORTUNITY NARRATIVE SHAPE
 * {
 *   id: string,
 *   signal: string,         — bold headline
 *   signalDetail: string,   — 1-2 sentences
 *   adjacency: string,      — what demographic migrates to
 *   demographic: string,    — target age/gender/income/region
 *   product: string,        — specific SKU or proposed NPD
 *   brief: string,          — 1-para creative brief
 *   reallocation: string,   — budget shift in % terms
 *   urgency: string,
 *   colour: string,         — hex accent
 * }
 */

// Helper: build a nav item list from a module array
export function buildNav(modules) {
  const labelMap = {
    TopCocktails: 'Top Cocktails',
    FlavourRadar: 'Flavours',
    LuxuryVenues: 'Venues',
    Presentation: 'Theatre',
    TrendArc: 'Trend Arc',
    CategorySnapshot: 'Category',
    CompetitorWatch: 'Competitors',
    MarketIntel: 'Markets',
    DemographicsLens: 'Demographics',
    OpportunityRadar: 'Radar',
  }
  return modules.map((m, i) => ({
    id: `module-${i}`,
    label: labelMap[m.type] || m.type,
  }))
}
