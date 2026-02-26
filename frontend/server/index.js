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
