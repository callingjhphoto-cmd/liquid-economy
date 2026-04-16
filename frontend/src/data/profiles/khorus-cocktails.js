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
  modules: [
    { type: 'TopCocktails', data: { cocktails: top20Cocktails } },
    { type: 'FlavourRadar', data: { families: flavourFamilies } },
    { type: 'LuxuryVenues', data: { venues: luxuryVenueIntel } },
    { type: 'Presentation', data: presentationTheatre },
    { type: 'TrendArc', data: twentyYearArc },
    { type: 'OpportunityRadar', data: { narratives: opportunityRadar } },
  ],
  narratives: opportunityRadar,
}

export default khorusProfile
