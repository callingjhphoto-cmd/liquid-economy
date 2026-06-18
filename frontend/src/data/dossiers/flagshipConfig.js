/**
 * flagshipConfig.js
 * Single source of truth for which brands are "flagship" (full LeftOnTheTable treatment).
 * FLAGSHIP_BRANDS[0] = canonical self-serve aha shown from CommandCentre CTA.
 *
 * To promote a new flagship:
 *   1. Add slug to FLAGSHIP_BRANDS
 *   2. Author its relatedDossiers + relatedTools + heroFindings here
 *   3. Run: npm run build-dossiers
 */

export const FLAGSHIP_BRANDS = ['campari-group_aperol']

/**
 * Per-flagship authored config.
 * relatedDossiers: slug path fragments (brand, group/, marketing)
 * relatedTools: static deep-link buttons shown on proposal + brand dossier
 * heroFindings: tight objects for LeftOnTheTable cards (parsed + authored)
 * tiers: engagement proposal tiers (authored, never machine-computed)
 */
export const FLAGSHIP_CONFIG = {
  'campari-group_aperol': {
    relatedDossiers: ['marketing', 'group/campari-group'],
    relatedTools: [
      { label: 'Valuations', href: '/valuations?company=campari-group' },
      { label: 'Brand Health', href: '/brand-health?brand=aperol' },
      { label: 'Financials', href: '/financials?company=campari-group' },
    ],
    // heroFindings: authored tightly from synthesis. confidenceBasis = real domains verified.
    heroFindings: [
      {
        headline: 'US aperitif occasion is 50% underdeveloped',
        body: 'CEO confirmed: "one in two US consumers have never heard of Aperol" (2024). The US represents <0.5% of Aperol global volume vs Europe\'s 40%+. No mainstream US pre-dinner ritual exists yet.',
        dollarChip: 'USD 50-100M',
        dollarUnit: 'revenue capture over 3-5 years',
        derivationBasis: 'Based on CEO Q4 2024 earnings call + US market share <0.5% of 10.4M global cases at 2024 average price',
        confidenceLevel: 'HIGH',
        confidenceBasis: ['investing.com', 'beveragedaily.com', 'camparigroup.com'],
        synthesisVerifiedSourceCount: 3,
        relatedDossiers: ['marketing', 'group/campari-group'],
      },
      {
        headline: 'Winter occasions locked at <10% annual volume despite 3-year campaign',
        body: "Aperolidays, apr\u00e8s-ski, Coachella activations are not breaking through narrative inertia. \"Fireside aperitivo,\" \"weeknight wind-down,\" \"post-gym recovery\" remain ritual-less across Northern Hemisphere markets.",
        dollarChip: 'USD 70-105M',
        dollarUnit: 'annual uplift at full channel penetration',
        derivationBasis: 'Seasonality data from Campari 2024 annual report + +10-15% off-season volume potential modelled against EUR 704M base',
        confidenceLevel: 'MEDIUM',
        confidenceBasis: ['warc.com', 'prnewswire.com', 'sherwood.news'],
        synthesisVerifiedSourceCount: 3,
        relatedDossiers: ['marketing'],
      },
      {
        headline: 'RTD canned format margin drag unquantified after April 2026 launch',
        body: "Aperol Spritz to Go (250ml, 5% ABV, April 2026) carries 50-55% margin vs 60-65% bottle. RTD growing +23% YoY in the UK. Optimal SKU architecture, co-packing strategy, and geographic sequencing remain undefined.",
        dollarChip: 'USD 25-50M',
        dollarUnit: '3-year EBITDA leakage to prevent',
        derivationBasis: 'RTD margin from spirits industry benchmarks; UK RTD market +23.1% from NIQ CGA via Grocery Trader (Sept 2025)',
        confidenceLevel: 'MEDIUM',
        confidenceBasis: ['thespiritsbusiness.com', 'grocerytrader.co.uk', 'talkingretail.com'],
        synthesisVerifiedSourceCount: 3,
        relatedDossiers: ['marketing', 'group/campari-group'],
      },
    ],
    // Engagement proposal tiers (authored, never computed)
    tiers: [
      {
        tier: 'Tier 1',
        scope: 'US Occasion Sentiment + Winter Deseasonalization Sizing',
        priceGBP: 75000,
        mappedFindingIndex: 0,
        roiRatioLabel: 'USD 50-100M opportunity -> GBP 75K diagnostic sprint = sub-0.1% of the prize',
        roiNumerator: 'USD 50-100M',
      },
      {
        tier: 'Tier 2',
        scope: 'Year-Round Occasion Architecture + RTD Format Optimisation',
        priceGBP: 225000,
        mappedFindingIndex: 1,
        roiRatioLabel: 'USD 70-105M uplift opportunity -> GBP 225K strategy programme = sub-0.3% of the prize',
        roiNumerator: 'USD 70-105M',
      },
      {
        tier: 'Tier 3',
        scope: 'Quarterly Market Monitoring + Brand Health Tracking (8-12 markets)',
        priceGBP: 420000,
        mappedFindingIndex: 2,
        roiRatioLabel: 'USD 25-50M EBITDA leakage risk -> GBP 420K/yr retainer = 1-2% of the downside protected',
        roiNumerator: 'USD 25-50M',
      },
    ],
  },
}

/**
 * /marketing page outbound chips (authored once here).
 * These are the brands whose dossiers the Marketing mega-dossier most cites.
 */
export const MARKETING_RELATED_DOSSIERS = [
  { slug: 'campari-group_aperol', label: 'Aperol' },
  { slug: 'pernod-ricard_lillet', label: 'Lillet' },
  { slug: 'bacardi_havana-club', label: 'Havana Club' },
]
