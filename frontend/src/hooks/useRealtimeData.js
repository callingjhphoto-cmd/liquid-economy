/**
 * useRealtimeData — SSE hook for live intelligence feed
 *
 * Connects to the server's SSE endpoint and provides:
 * - feedItems: array of live intelligence items (newest first)
 * - liveMetrics: object of metric overrides
 * - connected: boolean connection status
 * - clientCount: number of connected clients
 *
 * Auto-reconnects on disconnect with exponential backoff.
 * Falls back to polling if SSE is unavailable.
 */

import { useState, useEffect, useRef, useCallback } from 'react'

const SSE_URL = '/api/live/stream'
const POLL_URL = '/api/live/feed'
const METRICS_URL = '/api/live/metrics'
const MAX_FEED_ITEMS = 100
const RECONNECT_BASE_MS = 1000
const RECONNECT_MAX_MS = 30000
const POLL_INTERVAL_MS = 15000

export default function useRealtimeData() {
  const [feedItems, setFeedItems] = useState([])
  const [liveMetrics, setLiveMetrics] = useState({})
  const [connected, setConnected] = useState(false)
  const [clientCount, setClientCount] = useState(0)
  const [lastUpdate, setLastUpdate] = useState(null)
  const [mode, setMode] = useState('connecting') // connecting | sse | polling | offline

  const esRef = useRef(null)
  const reconnectTimer = useRef(null)
  const pollTimer = useRef(null)
  const reconnectDelay = useRef(RECONNECT_BASE_MS)
  const mountedRef = useRef(true)

  // ── Add a single feed item (deduplicated) ──
  const addFeedItem = useCallback((item) => {
    setFeedItems(prev => {
      if (prev.some(i => i.id === item.id)) return prev
      const next = [item, ...prev]
      return next.slice(0, MAX_FEED_ITEMS)
    })
    setLastUpdate(new Date())
  }, [])

  // ── Add bulk feed items ──
  const addBulkItems = useCallback((items) => {
    setFeedItems(prev => {
      const ids = new Set(prev.map(i => i.id))
      const newItems = items.filter(i => !ids.has(i.id))
      if (newItems.length === 0) return prev
      return [...newItems, ...prev].slice(0, MAX_FEED_ITEMS)
    })
    setLastUpdate(new Date())
  }, [])

  // ── Polling fallback ──
  const startPolling = useCallback(() => {
    if (pollTimer.current) return
    setMode('polling')

    const poll = async () => {
      if (!mountedRef.current) return
      try {
        const [feedRes, metricsRes] = await Promise.all([
          fetch(POLL_URL + '?limit=50'),
          fetch(METRICS_URL),
        ])
        if (feedRes.ok) {
          const { items } = await feedRes.json()
          if (items?.length) {
            setFeedItems(prev => {
              const ids = new Set(prev.map(i => i.id))
              const newItems = items.filter(i => !ids.has(i.id))
              if (newItems.length === 0) return prev
              return [...newItems, ...prev].slice(0, MAX_FEED_ITEMS)
            })
          }
        }
        if (metricsRes.ok) {
          const metrics = await metricsRes.json()
          setLiveMetrics(metrics)
        }
        setConnected(true)
        setLastUpdate(new Date())
      } catch {
        setConnected(false)
        setMode('offline')
      }
    }

    poll()
    pollTimer.current = setInterval(poll, POLL_INTERVAL_MS)
  }, [])

  const stopPolling = useCallback(() => {
    if (pollTimer.current) {
      clearInterval(pollTimer.current)
      pollTimer.current = null
    }
  }, [])

  // ── SSE Connection ──
  const connect = useCallback(() => {
    if (!mountedRef.current) return
    if (esRef.current) {
      esRef.current.close()
      esRef.current = null
    }
    stopPolling()
    setMode('connecting')

    try {
      const es = new EventSource(SSE_URL)
      esRef.current = es

      es.addEventListener('connected', (e) => {
        const data = JSON.parse(e.data)
        setConnected(true)
        setMode('sse')
        setClientCount(data.clientCount || 1)
        reconnectDelay.current = RECONNECT_BASE_MS
        console.log('[Live] SSE connected', data)
      })

      es.addEventListener('feed-snapshot', (e) => {
        const items = JSON.parse(e.data)
        setFeedItems(items)
        setLastUpdate(new Date())
      })

      es.addEventListener('metrics-snapshot', (e) => {
        setLiveMetrics(JSON.parse(e.data))
      })

      es.addEventListener('feed-item', (e) => {
        addFeedItem(JSON.parse(e.data))
      })

      es.addEventListener('feed-bulk', (e) => {
        addBulkItems(JSON.parse(e.data))
      })

      es.addEventListener('metrics-update', (e) => {
        setLiveMetrics(JSON.parse(e.data))
        setLastUpdate(new Date())
      })

      es.addEventListener('feed-cleared', () => {
        setFeedItems([])
      })

      es.onerror = () => {
        console.warn('[Live] SSE error, will reconnect...')
        es.close()
        esRef.current = null
        setConnected(false)

        // Exponential backoff reconnect
        const delay = Math.min(reconnectDelay.current, RECONNECT_MAX_MS)
        reconnectDelay.current = delay * 2

        reconnectTimer.current = setTimeout(() => {
          if (mountedRef.current) connect()
        }, delay)

        // Fall back to polling while SSE reconnects
        startPolling()
      }
    } catch {
      // SSE not supported — use polling
      startPolling()
    }
  }, [addFeedItem, addBulkItems, startPolling, stopPolling])

  // ── Lifecycle ──
  useEffect(() => {
    mountedRef.current = true
    connect()

    return () => {
      mountedRef.current = false
      if (esRef.current) esRef.current.close()
      if (reconnectTimer.current) clearTimeout(reconnectTimer.current)
      stopPolling()
    }
  }, [connect, stopPolling])

  return {
    feedItems,
    liveMetrics,
    connected,
    clientCount,
    lastUpdate,
    mode, // 'sse' | 'polling' | 'connecting' | 'offline'
  }
}
