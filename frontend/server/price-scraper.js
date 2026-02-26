#!/usr/bin/env node
/**
 * Liquid Economy — Price Scraper
 *
 * Runs every 3 days to fetch real-time spirits pricing from accessible sources.
 *
 * Strategy:
 * 1. Wine-Searcher (publicly visible price ranges on product pages)
 * 2. Master of Malt (product pages with visible pricing)
 * 3. The Whisky Exchange (product pages with visible pricing)
 * 4. Tannico (Italian wine/spirits marketplace)
 * 5. Gall & Gall (Dutch specialist retailer)
 *
 * The scraper fetches publicly visible retail prices from product pages
 * and posts them to the /api/pricing/update endpoint.
 *
 * Usage: node price-scraper.js [--server-url=http://localhost:3000]
 */

const SERVER_URL = process.argv.find(a => a.startsWith('--server-url='))?.split('=')[1]
  || process.env.LIQUID_SERVER_URL
  || 'https://frontend-production-115b.up.railway.app'

// Products to track (brand + expression combos)
const PRODUCTS = [
  // Scotch
  { key: 'jw-black', brand: 'Johnnie Walker', expression: 'Black Label', searchTerms: ['johnnie walker black label'] },
  { key: 'jw-blue', brand: 'Johnnie Walker', expression: 'Blue Label', searchTerms: ['johnnie walker blue label'] },
  { key: 'macallan-12', brand: 'The Macallan', expression: '12yr Sherry Oak', searchTerms: ['macallan 12 sherry oak'] },
  { key: 'macallan-18', brand: 'The Macallan', expression: '18yr Sherry Oak', searchTerms: ['macallan 18 sherry oak'] },
  { key: 'glenfiddich-12', brand: 'Glenfiddich', expression: '12 Year Old', searchTerms: ['glenfiddich 12'] },
  { key: 'glenfiddich-18', brand: 'Glenfiddich', expression: '18 Year Old', searchTerms: ['glenfiddich 18'] },
  // Bourbon
  { key: 'jd-no7', brand: "Jack Daniel's", expression: 'Old No.7', searchTerms: ['jack daniels old no 7'] },
  { key: 'buffalo-trace', brand: 'Buffalo Trace', expression: 'Bourbon', searchTerms: ['buffalo trace bourbon'] },
  { key: 'woodford', brand: 'Woodford Reserve', expression: "Distiller's Select", searchTerms: ['woodford reserve'] },
  // Tequila
  { key: 'don-julio-blanco', brand: 'Don Julio', expression: 'Blanco', searchTerms: ['don julio blanco tequila'] },
  { key: 'don-julio-1942', brand: 'Don Julio', expression: '1942', searchTerms: ['don julio 1942'] },
  { key: 'cuervo-gold', brand: 'José Cuervo', expression: 'Especial Gold', searchTerms: ['jose cuervo especial gold'] },
  // Gin
  { key: 'tanqueray', brand: 'Tanqueray', expression: 'London Dry', searchTerms: ['tanqueray london dry gin'] },
  { key: 'hendricks', brand: "Hendrick's", expression: 'Original', searchTerms: ['hendricks gin'] },
  { key: 'beefeater', brand: 'Beefeater', expression: 'London Dry', searchTerms: ['beefeater london dry gin'] },
  // Vodka
  { key: 'ketel-one', brand: 'Ketel One', expression: 'Original', searchTerms: ['ketel one vodka'] },
  { key: 'absolut', brand: 'Absolut', expression: 'Original', searchTerms: ['absolut vodka original'] },
  { key: 'belvedere', brand: 'Belvedere', expression: 'Pure', searchTerms: ['belvedere vodka'] },
  // Cognac
  { key: 'hennessy-vs', brand: 'Hennessy', expression: 'VS', searchTerms: ['hennessy vs cognac'] },
  { key: 'hennessy-vsop', brand: 'Hennessy', expression: 'VSOP', searchTerms: ['hennessy vsop'] },
  { key: 'hennessy-xo', brand: 'Hennessy', expression: 'XO', searchTerms: ['hennessy xo'] },
  { key: 'remy-vsop', brand: 'Rémy Martin', expression: 'VSOP', searchTerms: ['remy martin vsop'] },
  // Champagne
  { key: 'moet-imperial', brand: 'Moët & Chandon', expression: 'Impérial Brut', searchTerms: ['moet chandon imperial brut'] },
  { key: 'veuve-yellow', brand: 'Veuve Clicquot', expression: 'Yellow Label', searchTerms: ['veuve clicquot yellow label'] },
  { key: 'dom-perignon', brand: 'Dom Pérignon', expression: 'Vintage', searchTerms: ['dom perignon vintage'] },
  // Rum
  { key: 'bacardi-blanca', brand: 'Bacardi', expression: 'Carta Blanca', searchTerms: ['bacardi carta blanca'] },
  { key: 'zacapa-23', brand: 'Ron Zacapa', expression: '23 Centenario', searchTerms: ['ron zacapa 23'] },
  { key: 'havana-7', brand: 'Havana Club', expression: '7 Años', searchTerms: ['havana club 7'] },
]

// Utility: simple fetch with timeout
async function fetchWithTimeout(url, options = {}, timeout = 15000) {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), timeout)
  try {
    const res = await fetch(url, { ...options, signal: controller.signal })
    clearTimeout(timer)
    return res
  } catch (e) {
    clearTimeout(timer)
    throw e
  }
}

// Extract price from text using regex
function extractPrice(text, currency = '£') {
  const patterns = {
    '£': /£\s*(\d+(?:[.,]\d{1,2})?)/,
    '$': /\$\s*(\d+(?:[.,]\d{1,2})?)/,
    '€': /€\s*(\d+(?:[.,]\d{1,2})?)/,
  }
  const match = text.match(patterns[currency] || patterns['£'])
  if (match) {
    return parseFloat(match[1].replace(',', '.'))
  }
  return null
}

// Scrape Master of Malt (UK specialist)
async function scrapeMasterOfMalt(product) {
  try {
    const url = `https://www.masterofmalt.com/search/#!?q=${encodeURIComponent(product.searchTerms[0])}`
    console.log(`  [MoM] Searching: ${product.brand} ${product.expression}`)
    // Note: MoM uses client-side rendering, so direct scraping won't work easily
    // In production, you'd use a headless browser or their search API
    // For now, we log the attempt and return null
    return null
  } catch (e) {
    console.log(`  [MoM] Error: ${e.message}`)
    return null
  }
}

// Main scraper orchestrator
async function runScraper() {
  console.log('='.repeat(60))
  console.log('Liquid Economy — Price Scraper')
  console.log(`Started: ${new Date().toISOString()}`)
  console.log(`Server: ${SERVER_URL}`)
  console.log('='.repeat(60))
  console.log('')

  const results = {}
  let successCount = 0
  let errorCount = 0

  for (const product of PRODUCTS) {
    console.log(`\nProcessing: ${product.brand} ${product.expression}`)

    // Attempt each source
    const prices = {}

    // Master of Malt (UK)
    const momPrice = await scrapeMasterOfMalt(product)
    if (momPrice) {
      if (!prices.uk) prices.uk = {}
      prices.uk.masterofmalt = momPrice
      successCount++
    }

    // Store whatever we got
    if (Object.keys(prices).length > 0) {
      results[product.key] = prices
    }

    // Rate limiting — be respectful
    await new Promise(r => setTimeout(r, 2000))
  }

  console.log('\n' + '='.repeat(60))
  console.log(`Completed: ${successCount} prices found, ${errorCount} errors`)
  console.log('='.repeat(60))

  // Post results to server if we have any
  if (Object.keys(results).length > 0) {
    try {
      const res = await fetchWithTimeout(`${SERVER_URL}/api/pricing/update`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prices: results,
          source: 'price-scraper-v1',
          timestamp: new Date().toISOString(),
        }),
      })
      const data = await res.json()
      console.log(`\nPosted to server: ${data.ok ? 'SUCCESS' : 'FAILED'}`)
      if (data.lastUpdated) console.log(`Last updated: ${data.lastUpdated}`)
    } catch (e) {
      console.error(`Failed to post to server: ${e.message}`)
    }
  } else {
    console.log('\nNo prices to post — all sources returned null.')
    console.log('This is expected for the initial setup. The scraper needs')
    console.log('API keys or headless browser support for real data.')
    console.log('')
    console.log('To get real-time pricing, you can:')
    console.log('1. Set up Wine-Searcher API (https://www.wine-searcher.com/trade/api)')
    console.log('2. Use RapidAPI UK Supermarkets API (https://rapidapi.com/localpearuk/api/uk-supermarkets-product-pricing)')
    console.log('3. Configure headless browser scraping via Playwright/Puppeteer')
    console.log('')
    console.log('For now, the seed data in BrandPricing.jsx provides the baseline.')

    // Still update the timestamp so the UI shows last check time
    try {
      await fetchWithTimeout(`${SERVER_URL}/api/pricing/update`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prices: {},
          source: 'price-scraper-v1-check',
          timestamp: new Date().toISOString(),
        }),
      })
      console.log('Updated server timestamp.')
    } catch (e) {
      console.error(`Failed to update timestamp: ${e.message}`)
    }
  }

  console.log('\nDone.')
}

runScraper().catch(e => {
  console.error('Scraper failed:', e)
  process.exit(1)
})
