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
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs'
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

// Live feed: array of intelligence items (newest first, max 200)
let feedItems = loadJSON(FEED_FILE, [])

// Seed with default items if empty
if (feedItems.length === 0) {
  feedItems = [
    // CRITICAL
    { id: randomUUID(), severity: 'critical', category: 'tequila', title: 'Mexican agave surplus reaches 2.3M tons \u2014 5-year high', body: 'CRT reports record agave plantings; tequila input costs expected to fall 18-22% through H2 2026. Benefits Becle, Jose Cuervo.', source: 'CRT Mexico', url: 'https://www.crt.org.mx', timestamp: new Date(Date.now() - 1000 * 60 * 3).toISOString() },
    { id: randomUUID(), severity: 'critical', category: 'ma', title: 'Diageo confirms \u00a33B share buyback program', body: 'Signals confidence in cash generation amid China headwinds. May pressure peers to return capital.', source: 'Financial Times', url: 'https://www.ft.com/companies/diageo', timestamp: new Date(Date.now() - 1000 * 60 * 12).toISOString() },
    { id: randomUUID(), severity: 'critical', category: 'vodka', title: 'Absolut parent Pernod Ricard warns on US vodka volumes \u2014 down 7%', body: 'US vodka category under pressure from tequila substitution and RTD growth. Absolut and Smirnoff losing share to flavored spirits.', source: 'Bloomberg', url: 'https://www.bloomberg.com/news', timestamp: new Date(Date.now() - 1000 * 60 * 25).toISOString() },
    { id: randomUUID(), severity: 'critical', category: 'wine', title: 'French wine production hits 62-year low on frost damage', body: 'Bordeaux and Burgundy yields down 30%. Global wine supply deficit projected at 2.8B litres for 2026 vintage.', source: 'OIV', url: 'https://www.oiv.int', timestamp: new Date(Date.now() - 1000 * 60 * 40).toISOString() },

    // ALERTS
    { id: randomUUID(), severity: 'alert', category: 'regulatory', title: 'EU alcohol labeling enforcement begins June 2026', body: 'Mandatory calorie and ingredient labels required for all spirits sold in EU. Estimated compliance cost $2-5 per SKU.', source: 'European Commission', url: 'https://ec.europa.eu/food/safety/labelling-nutrition', timestamp: new Date(Date.now() - 1000 * 60 * 8).toISOString() },
    { id: randomUUID(), severity: 'alert', category: 'nolo', title: 'Athletic Brewing hits $250M revenue run rate', body: 'Non-alcoholic beer category growing +25% YoY. AB InBev exploring acquisition at ~$800M valuation.', source: 'Bloomberg', url: 'https://www.bloomberg.com/news', timestamp: new Date(Date.now() - 1000 * 60 * 18).toISOString() },
    { id: randomUUID(), severity: 'alert', category: 'market', title: 'GLP-1 drugs reducing dining-out occasions by 23%', body: '7% of UK adults now on GLP-1 drugs (Ozempic, Wegovy). Structural headwind for on-trade consumption patterns.', source: 'The Lancet', url: 'https://www.thelancet.com', timestamp: new Date(Date.now() - 1000 * 60 * 35).toISOString() },
    { id: randomUUID(), severity: 'alert', category: 'gin', title: 'UK gin sales decline 6% YoY \u2014 category fatigue deepens', body: 'WSTA data shows UK gin market peaked in 2023. Premiumisation still holding but volume declining. Craft distillery closures accelerating.', source: 'WSTA', url: 'https://www.wsta.co.uk', timestamp: new Date(Date.now() - 1000 * 60 * 50).toISOString() },
    { id: randomUUID(), severity: 'alert', category: 'champagne', title: 'LVMH: Champagne shipments fall 8.2% in Q4 as luxury demand softens', body: 'Mo\u00ebt Hennessy division reports declining volumes across Dom P\u00e9rignon and Veuve Clicquot. China -22%, US -5%. Prosecco gaining share.', source: 'Financial Times', url: 'https://www.ft.com/content/lvmh-champagne', timestamp: new Date(Date.now() - 1000 * 60 * 65).toISOString() },
    { id: randomUUID(), severity: 'alert', category: 'beer', title: 'Heineken raises price 5.2% \u2014 largest increase in decade', body: 'Input cost inflation (barley +18%, energy +12%) forces industry-wide price action. AB InBev and Carlsberg expected to follow within 30 days.', source: 'Reuters', url: 'https://www.reuters.com/business', timestamp: new Date(Date.now() - 1000 * 60 * 75).toISOString() },
    { id: randomUUID(), severity: 'alert', category: 'rum', title: 'Bacardi announces premium rum push \u2014 Fac\u00e9ra range at $85+ RRP', body: 'Super-premium rum category growing +18% globally. Bacardi, Diplomatico, and Appleton Estate leading premiumisation wave.', source: 'Spirits Business', url: 'https://www.thespiritsbusiness.com', timestamp: new Date(Date.now() - 1000 * 60 * 85).toISOString() },

    // WATCH
    { id: randomUUID(), severity: 'watch', category: 'cognac', title: 'China maintains 30% import duty on EU spirits', body: 'R\u00e9my Cointreau most exposed. Cognac exports to China remain depressed for third consecutive quarter.', source: 'Reuters', url: 'https://www.reuters.com/business/retail-consumer', timestamp: new Date(Date.now() - 1000 * 60 * 22).toISOString() },
    { id: randomUUID(), severity: 'watch', category: 'rtd', title: 'RTD growth decelerates to +8.2% (was +15% in 2023)', body: 'Market maturing; winners emerging: BuzzBallz, High Noon, Cutwater. Consolidation expected in H2 2026.', source: 'IWSR', url: 'https://www.theiwsr.com', timestamp: new Date(Date.now() - 1000 * 60 * 55).toISOString() },
    { id: randomUUID(), severity: 'watch', category: 'whisky', title: 'Japanese whisky supply constraints easing', body: 'New distilleries from Suntory and Nikka coming online in 2026. Premium positioning still holds with 30-40% price premiums.', source: 'Spirits Business', url: 'https://www.thespiritsbusiness.com', timestamp: new Date(Date.now() - 1000 * 60 * 95).toISOString() },
    { id: randomUUID(), severity: 'watch', category: 'tequila', title: 'Mezcal DO expansion: 3 new Mexican states gain protected status', body: 'Oaxaca dominance diluting as Guerrero, Puebla, Michoac\u00e1n gain formal DO. Volume could double by 2028. Artisanal pricing under pressure.', source: 'CRT Mexico', url: 'https://www.crt.org.mx', timestamp: new Date(Date.now() - 1000 * 60 * 110).toISOString() },
    { id: randomUUID(), severity: 'watch', category: 'vodka', title: 'Tito\'s Handmade surpasses Smirnoff as #1 US vodka by value', body: 'American-made craft narrative resonating. Tito\'s now 12.4% value share vs Smirnoff 11.8%. First time since Smirnoff took lead in 1997.', source: 'Nielsen IQ', url: 'https://nielseniq.com', timestamp: new Date(Date.now() - 1000 * 60 * 125).toISOString() },
    { id: randomUUID(), severity: 'watch', category: 'wine', title: 'Natural wine segment grows 32% but still <3% of market', body: 'Gen Z driving low-intervention wine trend. Orange wine and p\u00e9tillant naturel seeing strongest growth. Distribution still fragmented.', source: 'Wine Intelligence', url: 'https://www.wineintelligence.com', timestamp: new Date(Date.now() - 1000 * 60 * 140).toISOString() },
    { id: randomUUID(), severity: 'watch', category: 'beer', title: 'Craft beer M&A: 23 acquisitions in Q1 2026', body: 'Consolidation accelerating as small brewers face margin pressure. Average multiple: 1.2x revenue. Largest: Stone Brewing restructure.', source: 'Brewers Association', url: 'https://www.brewersassociation.org', timestamp: new Date(Date.now() - 1000 * 60 * 155).toISOString() },

    // INFO
    { id: randomUUID(), severity: 'info', category: 'gin', title: 'Tanqueray 0.0% launches across 14 European markets', body: 'Diageo expanding no-alcohol gin portfolio. 0.0% variants now available for 6 major gin brands across the industry.', source: 'Diageo PLC', url: 'https://www.diageo.com', timestamp: new Date(Date.now() - 1000 * 60 * 100).toISOString() },
    { id: randomUUID(), severity: 'info', category: 'champagne', title: 'Comit\u00e9 Champagne releases 2025 harvest data', body: 'Yields slightly above 5-year average. Grower-champagne segment (+14%) outpacing grandes maisons (+2%). Direct shipping trend continuing.', source: 'Comit\u00e9 Champagne', url: 'https://www.champagne.fr', timestamp: new Date(Date.now() - 1000 * 60 * 130).toISOString() },
    { id: randomUUID(), severity: 'info', category: 'rum', title: 'Caribbean rum GI: Jamaica seeks protected origin status', body: 'Following cognac and tequila models. Jamaican pot-still rum differentiation strategy. Would impact Appleton, Hampden, Worthy Park.', source: 'Jamaica Gleaner', url: 'https://jamaica-gleaner.com', timestamp: new Date(Date.now() - 1000 * 60 * 150).toISOString() },
    { id: randomUUID(), severity: 'info', category: 'nolo', title: 'Seedlip founder launches new venture: adaptogenic spirits', body: 'Functional beverages crossing into spirits. Ashwagandha and lion\'s mane-infused spirits targeting wellness consumer. $12M seed round.', source: 'TechCrunch', url: 'https://techcrunch.com', timestamp: new Date(Date.now() - 1000 * 60 * 165).toISOString() },
    { id: randomUUID(), severity: 'info', category: 'market', title: 'ProWein 2026: record 6,800 exhibitors from 65 countries', body: 'D\u00fcsseldorf trade show sees largest attendance since 2019. Key themes: premiumisation, sustainability credentials, DTC channels.', source: 'ProWein', url: 'https://www.prowein.com', timestamp: new Date(Date.now() - 1000 * 60 * 180).toISOString() },
    { id: randomUUID(), severity: 'info', category: 'cognac', title: 'Hennessy opens direct-to-consumer experience in London Mayfair', body: 'LVMH expanding DTC footprint beyond Cognac region. Tasting rooms, personalisation, and NFT-linked bottle releases. Membership waitlist 4,000+.', source: 'Luxury Daily', url: 'https://www.luxurydaily.com', timestamp: new Date(Date.now() - 1000 * 60 * 200).toISOString() },
    { id: randomUUID(), severity: 'info', category: 'whisky', title: 'Scotch Whisky Association: exports recover to \u00a36.1B in 2025', body: 'US remains largest market (\u00a31.2B). India overtakes France as #3 by value. Taiwan and South Korea fastest growth.', source: 'SWA', url: 'https://www.scotch-whisky.org.uk', timestamp: new Date(Date.now() - 1000 * 60 * 220).toISOString() },
    { id: randomUUID(), severity: 'info', category: 'rtd', title: 'Diageo launches Tanqueray RTD cans in US \u2014 targets Cutwater gap', body: 'Diageo strengthening RTD portfolio after slower-than-expected Cutwater integration. Tanqueray G&T cans at $12.99/4-pack.', source: 'Beverage Daily', url: 'https://www.beveragedaily.com', timestamp: new Date(Date.now() - 1000 * 60 * 240).toISOString() },
  ]
  saveJSON(FEED_FILE, feedItems)
}

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
