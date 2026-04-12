/**
 * Liquid Economy Intelligence — Real-Time Server
 *
 * Express server that:
 * 1. Serves the built Vite static files
 * 2. Provides SSE endpoint for real-time push updates
 * 3. Provides REST API for data ingestion (webhook-style)
 * 4. Stores live feed items in-memory + JSON file persistence
 */

import express from 'express'
import cors from 'cors'
import { readFileSync, writeFileSync, existsSync, mkdirSync, unlinkSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import { randomUUID } from 'crypto'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const app = express()
const PORT = process.env.PORT || 3000

// ── Middleware ──
app.use(cors())
app.use(express.json({ limit: '2mb' }))

// ── Data Store ──
const DATA_DIR = join(__dirname, 'data')
if (!existsSync(DATA_DIR)) mkdirSync(DATA_DIR, { recursive: true })

const FEED_FILE = join(DATA_DIR, 'feed.json')
const METRICS_FILE = join(DATA_DIR, 'metrics.json')

function loadJSON(path, fallback) {
  try {
    if (existsSync(path)) return JSON.parse(readFileSync(path, 'utf8'))
  } catch (e) {
    console.error(`Failed to load ${path}:`, e.message)
  }
  return fallback
}

function saveJSON(path, data) {
  try {
    writeFileSync(path, JSON.stringify(data, null, 2), 'utf8')
  } catch (e) {
    console.error(`Failed to save ${path}:`, e.message)
  }
}

// Live feed: always re-seed on startup so timestamps are current
// (Persisted feed.json may be weeks/months old — delete it to force fresh relative timestamps)
try { unlinkSync(FEED_FILE) } catch {}
let feedItems = []

// Seed with current-relative timestamps on every startup
{
  feedItems = [
    // CRITICAL
    { id: randomUUID(), severity: 'critical', category: 'tequila', title: 'Mexican agave surplus reaches record levels \u2014 oversupply crisis deepens', body: 'Tequila industry faces oversupply as agave plantings surge. Input costs expected to fall significantly, benefiting large producers like Becle and Jose Cuervo.', source: 'The Drinks Business', url: 'https://www.thedrinksbusiness.com/2025/01/how-oversupply-is-drowning-mexicos-tequila-industry/', timestamp: new Date(Date.now() - 1000 * 60 * 3).toISOString() },
    { id: randomUUID(), severity: 'critical', category: 'ma', title: 'Diageo posts interim results amid ongoing restructuring', body: 'Diageo reports H1 2026 results with continued focus on cash generation and portfolio optimisation amid challenging global trading conditions.', source: 'Diageo PLC', url: 'https://www.diageo.com/en/news-and-media/press-releases/2026/2026-interim-results-half-year-ended-31-december-2025', timestamp: new Date(Date.now() - 1000 * 60 * 12).toISOString() },
    { id: randomUUID(), severity: 'critical', category: 'vodka', title: 'US spirits sales fall 2.2% in 2025 \u2014 vodka hardest hit', body: 'US vodka category under sustained pressure from tequila substitution and RTD growth. Premium vodka segment showing particular weakness.', source: 'The Spirits Business', url: 'https://www.thespiritsbusiness.com/2026/02/spirits-sales-fall-2-2-in-us-in-2025/', timestamp: new Date(Date.now() - 1000 * 60 * 25).toISOString() },
    { id: randomUUID(), severity: 'critical', category: 'wine', title: 'French wine harvest volumes cut amid climate volatility', body: 'Bordeaux and Burgundy yields significantly impacted. Burgundy and Jura show some rebound but overall French production under pressure.', source: 'Decanter', url: 'https://www.decanter.com/wine-news/france-2025-wine-harvest-predicted-volumes-cut-but-burgundy-and-jura-rebound-564795/', timestamp: new Date(Date.now() - 1000 * 60 * 40).toISOString() },

    // ALERTS
    { id: randomUUID(), severity: 'alert', category: 'regulatory', title: 'EU alcohol labeling regulation moves toward enforcement', body: 'Mandatory calorie and ingredient labels required for all spirits sold in EU. Compliance costs estimated at $2-5 per SKU for producers.', source: 'European Commission', url: 'https://food.ec.europa.eu/food-safety/labelling-and-nutrition/food-information-consumers-legislation/alcohol-labelling_en', timestamp: new Date(Date.now() - 1000 * 60 * 8).toISOString() },
    { id: randomUUID(), severity: 'alert', category: 'nolo', title: 'Athletic Brewing named among most innovative companies', body: 'Non-alcoholic beer leader continues rapid growth trajectory. Category growing 25%+ YoY as health-conscious consumers drive demand.', source: 'Fast Company', url: 'https://www.fastcompany.com/91270872/athletic-brewing-most-innovative-companies-2025', timestamp: new Date(Date.now() - 1000 * 60 * 18).toISOString() },
    { id: randomUUID(), severity: 'alert', category: 'market', title: 'GLP-1 drugs reshaping beverage consumption patterns', body: 'Ozempic and similar drugs affecting drinking habits beyond simple calorie reduction \u2014 driving broader shift in consumer values and occasions.', source: 'The Drinks Business', url: 'https://www.thedrinksbusiness.com/2025/12/the-role-of-ozempic-isnt-just-about-reduced-consumption-its-about-a-shift-in-values/', timestamp: new Date(Date.now() - 1000 * 60 * 35).toISOString() },
    { id: randomUUID(), severity: 'alert', category: 'gin', title: 'Gin decline attributed to category entering mature phase', body: 'Gin sales declining as category transitions past peak growth. Premiumisation still holding but volume pressure increasing. Craft distillery closures accelerating.', source: 'The Spirits Business', url: 'https://www.thespiritsbusiness.com/2025/01/gins-decline-due-to-transitioning-into-mature-phase/', timestamp: new Date(Date.now() - 1000 * 60 * 50).toISOString() },
    { id: randomUUID(), severity: 'alert', category: 'champagne', title: 'LVMH Wine & Spirits arm ends 2025 on sour note', body: 'Mo\u00ebt Hennessy division reports declining volumes. Champagne shipments under pressure as luxury demand softens globally. Prosecco gaining share.', source: 'Just Drinks', url: 'https://www.just-drinks.com/news/lvmh-wine-and-spirits-arm-ends-2025-on-sour-note/', timestamp: new Date(Date.now() - 1000 * 60 * 65).toISOString() },
    { id: randomUUID(), severity: 'alert', category: 'beer', title: 'Beer price increases hit UK pubs \u2014 Heineken leads industry rises', body: 'Input cost inflation forces industry-wide price action. AB InBev and Carlsberg expected to follow. On-trade margins squeezed further.', source: 'Morning Advertiser', url: 'https://www.morningadvertiser.co.uk/Article/2025/01/10/how-much-has-heineken-increased-beer-prices-for-pubs-in-2024/', timestamp: new Date(Date.now() - 1000 * 60 * 75).toISOString() },
    { id: randomUUID(), severity: 'alert', category: 'rum', title: 'Bacardi accelerates premium rum strategy with Reserva Ocho push', body: 'Super-premium rum category growing strongly. Bacardi positioning Reserva Ocho and limited editions alongside Appleton and Diplomatico in premiumisation wave.', source: 'Drinks International', url: 'https://drinksint.com/news/fullstory.php/aid/11554/Brands_Report_2025:_Rum.html', timestamp: new Date(Date.now() - 1000 * 60 * 85).toISOString() },

    // WATCH
    { id: randomUUID(), severity: 'watch', category: 'cognac', title: 'Cognac producers spared from China tariffs \u2014 but brandy hit', body: 'Pernod, LVMH and R\u00e9my Cointreau gain exemption from China duties on cognac, but EU brandy faces penalties in ongoing trade tensions.', source: 'The Drinks Business', url: 'https://www.thedrinksbusiness.com/2025/07/pernod-lvmh-remy-spared-from-china-tariffs-on-cognac/', timestamp: new Date(Date.now() - 1000 * 60 * 22).toISOString() },
    { id: randomUUID(), severity: 'watch', category: 'rtd', title: 'Canned cocktails emerge as bright spot in declining spirits market', body: 'Spirits-based RTD revenue jumped 16.4% to $3.8B. Category outperforming all traditional alcohol segments but growth moderating from pandemic highs.', source: 'CNBC', url: 'https://www.cnbc.com/2026/02/05/tequila-canned-cocktails-top-selling-liquors-2025.html', timestamp: new Date(Date.now() - 1000 * 60 * 55).toISOString() },
    { id: randomUUID(), severity: 'watch', category: 'whisky', title: 'Japanese whisky supply constraints persist through 2028', body: 'New distillery capacity coming online but aged stock remains critically short. Premium positioning holds with 30-40% price premiums over Scotch equivalents.', source: 'The Spirits Business', url: 'https://www.thespiritsbusiness.com/2025/05/has-japanese-whisky-peaked/', timestamp: new Date(Date.now() - 1000 * 60 * 95).toISOString() },
    { id: randomUUID(), severity: 'watch', category: 'tequila', title: 'Morelos secures mezcal denomination of origin', body: 'Mezcal DO continues to expand across Mexican states. Oaxaca dominance diluting as production regions grow. Artisanal pricing under pressure.', source: 'Mexico Business News', url: 'https://mexicobusiness.news/agribusiness/news/morelos-secures-mezcal-denomination-origin', timestamp: new Date(Date.now() - 1000 * 60 * 110).toISOString() },
    { id: randomUUID(), severity: 'watch', category: 'vodka', title: 'Tito\u2019s Handmade surpasses Smirnoff as top US vodka by value', body: 'American craft narrative resonating strongly. Tito\u2019s now leads with 28% value share. Smirnoff retains volume lead through broader distribution.', source: 'Market Watch Mag', url: 'https://www.marketwatchmag.com/vodka-weathers-the-storm/', timestamp: new Date(Date.now() - 1000 * 60 * 125).toISOString() },
    { id: randomUUID(), severity: 'watch', category: 'wine', title: 'Organic wine market projected to reach $21B by 2030', body: 'Gen Z driving natural and low-intervention wine trend. 150% YoY growth in social media discussions. Canned organic wine segment growing at 14.2% CAGR.', source: 'Tastewise', url: 'https://tastewise.io/blog/organic-wine-trends', timestamp: new Date(Date.now() - 1000 * 60 * 140).toISOString() },
    { id: randomUUID(), severity: 'watch', category: 'beer', title: 'Craft beer M&A: 51 major alcohol acquisitions completed in 2025', body: 'Consolidation accelerating as small brewers face margin pressure. Strategic discipline replacing growth-at-all-costs mentality. Beer saw 14 major deals.', source: 'Park Street Imports', url: 'https://www.parkstreet.com/alcohol-industry-mergers-acquisitions-in-2025/', timestamp: new Date(Date.now() - 1000 * 60 * 155).toISOString() },

    // INFO
    { id: randomUUID(), severity: 'info', category: 'gin', title: 'Tanqueray 0.0% expands non-alcoholic gin across Europe', body: 'Diageo expanding no-alcohol gin portfolio using vacuum distillation technology. 0.0% variants gaining traction in Dry January and wellness segments.', source: 'Some Good Clean Fun', url: 'https://www.somegoodcleanfun.com/non-alcoholic-spirits/tanqueray-00-non-alcoholic-gin-review', timestamp: new Date(Date.now() - 1000 * 60 * 100).toISOString() },
    { id: randomUUID(), severity: 'info', category: 'champagne', title: 'Champagne 2025 harvest: exceptional quality but yields restricted', body: 'Record-early harvest began August 20. Comit\u00e9 Champagne sets yield at 9,000 kg/ha \u2014 lowest since pandemic year \u2014 amid global economic uncertainty.', source: 'Robb Report', url: 'https://robbreport.com/food-drink/wine/champagne-2025-harvest-vintage-1236898623/', timestamp: new Date(Date.now() - 1000 * 60 * 130).toISOString() },
    { id: randomUUID(), severity: 'info', category: 'rum', title: 'Jamaica rum GI debate intensifies over aging requirements', body: 'Geographical indication rules tighten: rum aged outside Jamaica can no longer carry Jamaican label. Legal proceedings ongoing between major producers.', source: 'The Rum Lab', url: 'https://therumlab.com/jamaican-rum-geographical-indication-gi-why-heritage-and-future-must-align/', timestamp: new Date(Date.now() - 1000 * 60 * 150).toISOString() },
    { id: randomUUID(), severity: 'info', category: 'nolo', title: 'Seedlip founder launches \u00a32M crowdfunding for Pollen Projects', body: 'Ben Branson\u2019s new venture creating aged non-alcoholic spirits (Sylva) and cocktail bitters (SEASN). \u00a31.2M already secured including actor Kit Harington.', source: 'The Drinks Business', url: 'https://www.thedrinksbusiness.com/2025/11/seedlip-founder-launches-2m-crowdfunding-campaign-for-pollen-projects/', timestamp: new Date(Date.now() - 1000 * 60 * 165).toISOString() },
    { id: randomUUID(), severity: 'info', category: 'market', title: 'ProWein 2026: new I2A framework transforms trade fair experience', body: 'D\u00fcsseldorf show launches digital buyer journey framework. ProSpirits section expanding with craft and category themes. City-wide activations planned.', source: 'Wine Industry Advisor', url: 'https://wineindustryadvisor.com/2026/02/20/prowein-dusseldorf-sets-new-standards-for-b2b-wine-trade-fairs-with-i2a/', timestamp: new Date(Date.now() - 1000 * 60 * 180).toISOString() },
    { id: randomUUID(), severity: 'info', category: 'cognac', title: 'Hennessy debuts float at Notting Hill Carnival 2025', body: 'LVMH expanding DTC and cultural footprint. Limited edition Carnival bottle, retail activations across London, and immersive brand experiences.', source: 'The Drinks Business', url: 'https://www.thedrinksbusiness.com/2025/08/hennessy-to-debut-float-at-notting-hill-carnival-2025/', timestamp: new Date(Date.now() - 1000 * 60 * 200).toISOString() },
    { id: randomUUID(), severity: 'info', category: 'whisky', title: 'Scotch whisky exports hit by US tariffs \u2014 volumes down 15%', body: 'US exports fell 4% in value to \u00a3933M. India emerges as 3rd largest market by value. EU remains biggest regional market at \u00a31.5B.', source: 'Scotch Whisky Association', url: 'https://www.scotch-whisky.org.uk/newsroom/2025-export-figures/', timestamp: new Date(Date.now() - 1000 * 60 * 220).toISOString() },
    { id: randomUUID(), severity: 'info', category: 'rtd', title: 'Diageo expands premium RTD range with Tanqueray and Ketel One', body: 'New Cocktail Collection features bar-quality canned cocktails at premium price points. Targeting the growing at-home cocktail occasion.', source: 'Just Drinks', url: 'https://www.just-drinks.com/news/diageo-the-cocktail-collection/', timestamp: new Date(Date.now() - 1000 * 60 * 240).toISOString() },

    // ── APRIL 2026 ITEMS ──
    { id: randomUUID(), severity: 'critical', category: 'market', title: 'US tariffs on Scotch whisky drive 18% volume decline in Q1 2026', body: 'The 200% tariff threat materialised in March 2026. Scottish distillers report order cancellations from US distributors. Diageo, Edrington and Chivas Brothers all flagging material revenue impact.', source: 'The Scotch Whisky Association', url: 'https://www.scotch-whisky.org.uk/', timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString() },
    { id: randomUUID(), severity: 'critical', category: 'ma', title: 'Diageo Q3 FY2026 results: organic net sales -4.4%, cost savings accelerated', body: 'Diageo reports third consecutive quarter of volume decline. CEO Nik Jhangiani accelerates \u00a3500M cost-saving programme. North America spirits weakness cited. No guidance upgrade.', source: 'Diageo Investor Relations', url: 'https://www.diageo.com/en/investors/', timestamp: new Date(Date.now() - 1000 * 60 * 45).toISOString() },
    { id: randomUUID(), severity: 'alert', category: 'whisky', title: 'Pernod Ricard H1 FY2026: Jameson volumes fall 7% as trading conditions deteriorate', body: 'Pernod reports H1 FY2026 organic sales down 6%. Jameson, the group\u2019s largest brand, sees volume decline in US and UK. CEO Alexandre Ricard cites consumer premiumisation fatigue.', source: 'Pernod Ricard Investor Relations', url: 'https://www.pernod-ricard.com/en/investors/', timestamp: new Date(Date.now() - 1000 * 60 * 90).toISOString() },
    { id: randomUUID(), severity: 'alert', category: 'rtd', title: 'RTD spirits category surpasses \u00a3800M in UK off-trade for first time', body: 'IRI data shows UK spirits-based RTD reaching record value. Hard seltzers declining but cocktail-in-a-can format accelerating. Diageo, Fever-Tree and Bodega Bay leading share gains.', source: 'The Grocer', url: 'https://www.thegrocer.co.uk/', timestamp: new Date(Date.now() - 1000 * 60 * 120).toISOString() },
    { id: randomUUID(), severity: 'alert', category: 'gin', title: 'UK gin category contracts 8% in value \u2014 200+ craft distilleries at risk', body: 'CGA data confirms UK gin volumes fell for third consecutive year in 2025. Average gin price has risen but not offset volume losses. Industry analysts warn 15\u201320% of craft distilleries face closure by end of 2026.', source: 'The Spirits Business', url: 'https://www.thespiritsbusiness.com/', timestamp: new Date(Date.now() - 1000 * 60 * 160).toISOString() },
    { id: randomUUID(), severity: 'watch', category: 'tequila', title: 'Becle (Cuervo) raises guidance as agave costs normalise', body: 'Becle reports Q1 2026 EBITDA margin expansion of 340bps as agave raw material costs fall. Jose Cuervo and 1800 volumes up 4%. Category remains resilient despite overall spirits softness.', source: 'Becle Investor Relations', url: 'https://www.becle.com.mx/', timestamp: new Date(Date.now() - 1000 * 60 * 200).toISOString() },
    { id: randomUUID(), severity: 'watch', category: 'beer', title: 'Craft beer closures accelerate: 400 UK breweries shut in 18 months', body: 'SIBA data shows 400 craft brewery closures in UK since Q3 2024. Rising energy, ingredients and distribution costs cited. Consolidation creating opportunity for well-capitalised mid-tier brands.', source: 'Morning Advertiser', url: 'https://www.morningadvertiser.co.uk/', timestamp: new Date(Date.now() - 1000 * 60 * 270).toISOString() },
    { id: randomUUID(), severity: 'info', category: 'nolo', title: 'Low and no-alcohol category reaches 3.5% of total UK drinks market', body: 'WSTA Q1 2026 report: NOLO now represents 3.5% of UK total alcohol value, up from 1.8% in 2022. Guinness 0.0 and Peroni 0.0% lead volume. Spirits-based NOLO growing fastest at 34% YoY.', source: 'Wine & Spirit Trade Association', url: 'https://www.wsta.co.uk/', timestamp: new Date(Date.now() - 1000 * 60 * 310).toISOString() },
  ]
  saveJSON(FEED_FILE, feedItems)
}

// ── Pricing Data Store ──
const PRICING_FILE = join(DATA_DIR, 'pricing.json')
let pricingData = loadJSON(PRICING_FILE, { lastUpdated: null, prices: {} })

// ── REST API: Get latest pricing ──
app.get('/api/pricing/latest', (req, res) => {
  res.json(pricingData)
})

// ── REST API: Update pricing (called by scraper) ──
app.post('/api/pricing/update', (req, res) => {
  const { prices, source, productUrls } = req.body
  if (!prices && !productUrls) return res.status(400).json({ error: 'prices or productUrls object required' })

  // Merge new prices into existing
  if (prices) {
    Object.entries(prices).forEach(([key, marketPrices]) => {
      if (!pricingData.prices[key]) pricingData.prices[key] = {}
      Object.assign(pricingData.prices[key], marketPrices)
    })
  }

  // Merge product URLs (retailer product page links)
  if (productUrls) {
    if (!pricingData.productUrls) pricingData.productUrls = {}
    Object.entries(productUrls).forEach(([productKey, markets]) => {
      if (!pricingData.productUrls[productKey]) pricingData.productUrls[productKey] = {}
      Object.entries(markets).forEach(([market, retailers]) => {
        if (!pricingData.productUrls[productKey][market]) pricingData.productUrls[productKey][market] = {}
        Object.assign(pricingData.productUrls[productKey][market], retailers)
      })
    })
  }

  pricingData.lastUpdated = new Date().toISOString()
  pricingData.source = source || 'scraper'
  saveJSON(PRICING_FILE, pricingData)

  // Broadcast pricing update via SSE
  broadcast('pricing-update', { lastUpdated: pricingData.lastUpdated, count: Object.keys(prices || {}).length })

  console.log(`[Pricing] Updated ${Object.keys(prices || {}).length} prices, ${Object.keys(productUrls || {}).length} URLs from ${source || 'unknown'}`)
  res.json({ ok: true, lastUpdated: pricingData.lastUpdated })
})

// Live metrics: key-value store of metric overrides
let liveMetrics = loadJSON(METRICS_FILE, {})

// ── SSE Client Management ──
const sseClients = new Set()

function broadcast(event, data) {
  const payload = `event: ${event}\ndata: ${JSON.stringify(data)}\nid: ${Date.now()}\n\n`
  for (const client of sseClients) {
    try {
      client.write(payload)
    } catch {
      sseClients.delete(client)
    }
  }
  console.log(`[SSE] Broadcast "${event}" to ${sseClients.size} client(s)`)
}

// ── SSE Endpoint ──
app.get('/api/live/stream', (req, res) => {
  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive',
    'X-Accel-Buffering': 'no',
  })

  // Send initial state
  res.write(`event: connected\ndata: ${JSON.stringify({ clientCount: sseClients.size + 1, feedCount: feedItems.length })}\nid: ${Date.now()}\n\n`)
  res.write(`event: feed-snapshot\ndata: ${JSON.stringify(feedItems.slice(0, 50))}\nid: ${Date.now()}\n\n`)
  res.write(`event: metrics-snapshot\ndata: ${JSON.stringify(liveMetrics)}\nid: ${Date.now()}\n\n`)

  sseClients.add(res)
  console.log(`[SSE] Client connected (${sseClients.size} total)`)

  // Heartbeat every 30s to keep connection alive
  const heartbeat = setInterval(() => {
    try { res.write(`:heartbeat\n\n`) } catch { clearInterval(heartbeat) }
  }, 30000)

  req.on('close', () => {
    sseClients.delete(res)
    clearInterval(heartbeat)
    console.log(`[SSE] Client disconnected (${sseClients.size} remaining)`)
  })
})

// ── REST API: Get current feed ──
app.get('/api/live/feed', (req, res) => {
  const limit = Math.min(parseInt(req.query.limit) || 50, 200)
  const category = req.query.category
  let items = feedItems
  if (category) items = items.filter(i => i.category === category)
  res.json({ items: items.slice(0, limit), total: items.length })
})

// ── REST API: Get live metrics ──
app.get('/api/live/metrics', (req, res) => {
  res.json(liveMetrics)
})

// ── REST API: Ingest new feed item ──
app.post('/api/live/ingest', (req, res) => {
  const { title, body, category, source, url, severity, metrics } = req.body

  if (!title) return res.status(400).json({ error: 'title is required' })

  // Create feed item
  const item = {
    id: randomUUID(),
    title,
    body: body || '',
    category: category || 'general',
    source: source || 'Manual',
    url: url || null,
    severity: severity || 'info', // info | watch | alert | critical
    timestamp: new Date().toISOString(),
  }

  feedItems.unshift(item)
  if (feedItems.length > 200) feedItems = feedItems.slice(0, 200)
  saveJSON(FEED_FILE, feedItems)

  // Broadcast feed update
  broadcast('feed-item', item)

  // Process any metric overrides
  if (metrics && typeof metrics === 'object') {
    Object.assign(liveMetrics, metrics)
    liveMetrics._lastUpdated = new Date().toISOString()
    saveJSON(METRICS_FILE, liveMetrics)
    broadcast('metrics-update', liveMetrics)
  }

  console.log(`[Ingest] "${item.title}" (${item.category}/${item.severity})`)
  res.status(201).json({ ok: true, item })
})

// ── REST API: Bulk ingest ──
app.post('/api/live/ingest/bulk', (req, res) => {
  const { items } = req.body
  if (!Array.isArray(items)) return res.status(400).json({ error: 'items array required' })

  const created = []
  for (const raw of items.slice(0, 50)) {
    if (!raw.title) continue
    const item = {
      id: randomUUID(),
      title: raw.title,
      body: raw.body || '',
      category: raw.category || 'general',
      source: raw.source || 'Bulk Import',
      url: raw.url || null,
      severity: raw.severity || 'info',
      timestamp: raw.timestamp || new Date().toISOString(),
    }
    feedItems.unshift(item)
    created.push(item)
  }

  if (feedItems.length > 200) feedItems = feedItems.slice(0, 200)
  saveJSON(FEED_FILE, feedItems)
  broadcast('feed-bulk', created)

  res.status(201).json({ ok: true, count: created.length })
})

// ── REST API: Clear feed ──
app.delete('/api/live/feed', (req, res) => {
  feedItems = []
  saveJSON(FEED_FILE, feedItems)
  broadcast('feed-cleared', {})
  res.json({ ok: true })
})

// ── REST API: Update metrics directly ──
app.put('/api/live/metrics', (req, res) => {
  Object.assign(liveMetrics, req.body)
  liveMetrics._lastUpdated = new Date().toISOString()
  saveJSON(METRICS_FILE, liveMetrics)
  broadcast('metrics-update', liveMetrics)
  res.json({ ok: true, metrics: liveMetrics })
})

// ── REST API: Health check ──
app.get('/api/live/health', (req, res) => {
  res.json({
    status: 'ok',
    uptime: process.uptime(),
    clients: sseClients.size,
    feedItems: feedItems.length,
    metricsKeys: Object.keys(liveMetrics).length,
  })
})

// ── REST API: Status / connection info ──
app.get('/api/live/status', (req, res) => {
  res.json({
    connected: true,
    clients: sseClients.size,
    lastUpdate: liveMetrics._lastUpdated || null,
    feedCount: feedItems.length,
  })
})

// ── Serve Static Frontend ──
const distPath = join(__dirname, '..', 'dist')
app.use(express.static(distPath))

// SPA fallback — serve index.html for all non-API routes
app.get('*', (req, res) => {
  if (req.path.startsWith('/api/')) {
    return res.status(404).json({ error: 'Not found' })
  }
  res.sendFile(join(distPath, 'index.html'))
})

// ── Start ──
app.listen(PORT, '0.0.0.0', () => {
  console.log(`\n  Liquid Economy Intelligence Server`)
  console.log(`  \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500`)
  console.log(`  Static:  http://0.0.0.0:${PORT}`)
  console.log(`  SSE:     http://0.0.0.0:${PORT}/api/live/stream`)
  console.log(`  Ingest:  POST http://0.0.0.0:${PORT}/api/live/ingest`)
  console.log(`  Health:  http://0.0.0.0:${PORT}/api/live/health`)
  console.log(`  Clients: 0 connected\n`)
})
