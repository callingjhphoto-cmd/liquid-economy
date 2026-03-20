import React, { useState, useMemo, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts'
import {
  Search, ArrowUpDown, Filter, TrendingUp, TrendingDown, Minus,
  ChevronDown, ChevronUp, DollarSign, Globe, Info, Store,
  Clock, RefreshCw, MapPin, ShoppingCart, ExternalLink, AlertCircle,
  Eye, BarChart3, Columns, Package, Edit3
} from 'lucide-react'
import { PageHeader } from '../components/ui/PageHeader'
import { TabGroup } from '../components/ui/TabGroup'
import { FilterPills } from '../components/ui/TabGroup'

import { SEGMENT_INFO, MARKET_CONFIG, RETAILERS, BRAND_DATABASE } from '../data/brandData'

// ── Editable Prices Hook ──
function useEditablePrices() {
  const [editedPrices, setEditedPrices] = useState(() => {
    try {
      const saved = localStorage.getItem('le_edited_prices')
      return saved ? JSON.parse(saved) : {}
    } catch { return {} }
  })

  const updatePrice = useCallback((productIdx, market, retailerId, newPrice) => {
    setEditedPrices(prev => {
      const key = `${productIdx}-${market}-${retailerId}`
      const next = { ...prev, [key]: parseFloat(newPrice) || null }
      try { localStorage.setItem('le_edited_prices', JSON.stringify(next)) } catch {}
      return next
    })
  }, [])

  const clearEdits = useCallback(() => {
    setEditedPrices({})
    try { localStorage.removeItem('le_edited_prices') } catch {}
  }, [])

  const hasEdits = Object.keys(editedPrices).length > 0

  return { editedPrices, updatePrice, clearEdits, hasEdits }
}

// ── Process data ──
const PRICING = BRAND_DATABASE.map(item => {
  const marketAvgs = {}
  const allMarketKeys = Object.keys(MARKET_CONFIG)
  allMarketKeys.forEach(mkt => {
    if (item.prices[mkt]) {
      const vals = Object.values(item.prices[mkt]).filter(v => v !== null && v !== undefined)
      marketAvgs[mkt] = vals.length > 0 ? Math.round(vals.reduce((a, b) => a + b, 0) / vals.length * 100) / 100 : null
    }
  })
  const euCountries = ['spain', 'france', 'germany', 'italy', 'netherlands']
  const euVals = euCountries.map(c => marketAvgs[c]).filter(v => v !== null && v !== undefined)
  const euAvg = euVals.length > 0 ? Math.round(euVals.reduce((a, b) => a + b, 0) / euVals.length) : null
  const allPrices = Object.values(marketAvgs).filter(v => v !== null && v !== undefined)
  const maxP = allPrices.length > 0 ? Math.max(...allPrices) : 0
  const minP = allPrices.length > 0 ? Math.min(...allPrices) : 0
  return { ...item, usa: marketAvgs.us, uk: marketAvgs.uk, eu: euAvg, me: marketAvgs.me, marketAvgs, differential: Math.round((maxP - minP) * 100) / 100, premium_index: minP > 0 ? (maxP - minP) / minP : 0 }
})

const CATEGORIES = ['all', ...new Set(PRICING.map(p => p.category))]
const SEGMENTS = ['all', ...new Set(PRICING.map(p => p.segment))]

// ── Sub-Components ──

function SegmentInfoPanel() {
  const [open, setOpen] = useState(false)
  return (
    <div className="bg-white rounded-xl border border-gray-100 p-4">
      <button onClick={() => setOpen(!open)} className="flex items-center gap-2 text-sm font-medium text-navy hover:text-gold transition-colors w-full text-left">
        <Info size={14} />
        <span>What do the segments mean?</span>
        {open ? <ChevronUp size={14} className="ml-auto" /> : <ChevronDown size={14} className="ml-auto" />}
      </button>
      {open && (
        <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
          {Object.entries(SEGMENT_INFO).map(([seg, info]) => (
            <div key={seg} className="p-3 rounded-lg bg-gray-50 border border-gray-100">
              <div className="flex items-center gap-2 mb-1">
                <span className={`text-[10px] px-2 py-0.5 rounded font-medium ${info.color}`}>{seg}</span>
                <span className="text-[10px] text-gray-400">{info.range}</span>
              </div>
              <p className="text-[11px] text-gray-500 leading-relaxed">{info.desc}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// --- RETAILER DIRECTORY: always-visible list of retailers per market ---
function RetailerDirectory({ selectedMarket }) {
  const retailers = RETAILERS[selectedMarket] || []
  const config = MARKET_CONFIG[selectedMarket]
  return (
    <div className="bg-white rounded-xl border border-gray-100 p-5">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Store size={16} className="text-navy" />
          <h2 className="font-display text-section text-navy">Tracked Retailers</h2>
        </div>
        <div className="flex items-center gap-1 text-[10px] text-gray-400">
          <Package size={10} />
          <span>Bottle size: <strong className="text-navy">{config.bottleSize}</strong> ({config.bottleMl}ml)</span>
        </div>
      </div>
      <div className="flex gap-1 flex-wrap mb-4">
        {Object.entries(MARKET_CONFIG).map(([key, cfg]) => (
          <span key={key} className={`px-2 py-1 rounded text-[10px] font-medium ${key === selectedMarket ? 'bg-navy text-white' : 'bg-gray-50 text-gray-500'}`}>
            {cfg.flag} {cfg.label}
          </span>
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-5 gap-2">
        {retailers.map(r => (
          <div key={r.id} className="flex items-center gap-2 p-2.5 rounded-lg bg-gray-50 border border-gray-100">
            <span className="text-lg">{r.logo}</span>
            <div className="min-w-0">
              <p className="text-xs font-medium text-navy truncate">{r.name}</p>
              <p className="text-[10px] text-gray-400">{r.type}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// Helper: build product URL for a retailer (search URL + product name)
// When scraper provides actual product page URLs, those override this default.
function buildProductUrl(retailer, product) {
  if (!retailer.url) return null
  const searchTerm = product.brand + ' ' + product.expression
  return retailer.url + encodeURIComponent(searchTerm)
}

// Price Comparison Links component
function PriceComparisonLinks({ market, product }) {
  const searchTerm = encodeURIComponent(product.brand + ' ' + product.expression)

  const links = {
    uk: [
      { name: 'Trolley', url: `https://www.trolley.co.uk/search/?q=${searchTerm}` },
      { name: 'Google Shopping', url: `https://www.google.co.uk/search?tbm=shop&q=${searchTerm}` }
    ],
    us: [
      { name: 'Google Shopping', url: `https://www.google.com/search?tbm=shop&q=${searchTerm}` },
      { name: 'Wine-Searcher', url: `https://www.wine-searcher.com/find/${searchTerm}` }
    ],
    spain: [
      { name: 'idealo', url: `https://www.idealo.es/` },
      { name: 'Google Shopping', url: `https://www.google.es/search?tbm=shop&q=${searchTerm}` }
    ],
    france: [
      { name: 'idealo', url: `https://www.idealo.fr/` },
      { name: 'Google Shopping', url: `https://www.google.fr/search?tbm=shop&q=${searchTerm}` }
    ],
    germany: [
      { name: 'idealo', url: `https://www.idealo.de/` },
      { name: 'Google Shopping', url: `https://www.google.de/search?tbm=shop&q=${searchTerm}` }
    ],
    italy: [
      { name: 'idealo', url: `https://www.idealo.it/` },
      { name: 'Google Shopping', url: `https://www.google.it/search?tbm=shop&q=${searchTerm}` }
    ],
    netherlands: [
      { name: 'idealo', url: `https://www.idealo.nl/` },
      { name: 'Google Shopping', url: `https://www.google.nl/search?tbm=shop&q=${searchTerm}` }
    ],
    me: [
      { name: 'Google Shopping', url: `https://www.google.com/search?tbm=shop&q=${searchTerm}` }
    ]
  }

  const marketLinks = links[market] || []

  return (
    <div className="flex items-center gap-2 text-[10px]">
      <span className="text-gray-500">Price comparison:</span>
      {marketLinks.map((link, i) => (
        <a key={i} href={link.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
          {link.name}
        </a>
      ))}
    </div>
  )
}

// --- RETAILER COMPARISON VIEW: primary feature for brand managers ---
function RetailerComparisonView({ productUrls }) {
  const [market, setMarket] = useState('uk')
  const [compareSearch, setCompareSearch] = useState('')
  const [editMode, setEditMode] = useState(false)
  const { editedPrices, updatePrice, clearEdits, hasEdits } = useEditablePrices()

  const config = MARKET_CONFIG[market]
  const retailers = RETAILERS[market] || []

  const filtered = useMemo(() => {
    if (!compareSearch) return BRAND_DATABASE
    const q = compareSearch.toLowerCase()
    return BRAND_DATABASE.filter(p =>
      p.brand.toLowerCase().includes(q) ||
      p.expression.toLowerCase().includes(q) ||
      p.company.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q)
    )
  }, [compareSearch])

  // Get product URL: first check scraped URLs from API, then fall back to search URL
  const getProductUrl = (product, retailer) => {
    // Scraped URLs keyed: productUrls[brand-expression][market][retailerId]
    const productKey = product.brand.toLowerCase().replace(/[^a-z0-9]/g, '-') + '-' + product.expression.toLowerCase().replace(/[^a-z0-9]/g, '-')
    if (productUrls && productUrls[productKey] && productUrls[productKey][market] && productUrls[productKey][market][retailer.id]) {
      return productUrls[productKey][market][retailer.id]
    }
    return buildProductUrl(retailer, product)
  }

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-xl border border-gray-100 p-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="font-display text-section text-navy flex items-center gap-2"><Columns size={16} /> Retailer Price Comparison</h2>
            <p className="text-[11px] text-gray-500 mt-0.5">Compare prices across all retailers in a market. Click any price to view the product on that retailer{'\u2019'}s website.</p>
          </div>
          <div className="flex items-center gap-1 text-[10px] bg-amber-50 text-amber-700 px-2 py-1 rounded">
            <Package size={10} />
            <span>All prices per {config.bottleSize} ({config.bottleMl}ml)</span>
          </div>
        </div>

        {/* Market selector */}
        <div className="flex gap-1 flex-wrap mb-4">
          {Object.entries(MARKET_CONFIG).map(([key, cfg]) => (
            <button key={key} onClick={() => setMarket(key)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${market === key ? 'bg-navy text-white' : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'}`}>
              {cfg.flag} {cfg.label}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative mb-4">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input type="text" placeholder="Search product (e.g. Smirnoff Ice, Hennessy, Tanqueray)..." value={compareSearch} onChange={e => setCompareSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-navy/20" />
        </div>

        {/* Link indicator */}
        <div className="flex items-center gap-2 mb-3 text-[10px] text-gray-500">
          <ExternalLink size={10} className="text-blue-500" />
          <span>Click any price to visit the retailer{'\u2019'}s product page. URLs update automatically every 3 days via the price scraper.</span>
        </div>

        {/* Indicative Pricing banner */}
        <div className="bg-amber-50 border border-amber-200 rounded-lg px-4 py-3 mb-4 flex items-start gap-3">
          <AlertCircle size={14} className="text-amber-700 mt-0.5 flex-shrink-0" />
          <p className="text-[11px] text-amber-700 leading-relaxed">Prices shown are indicative and sourced Feb 2026. Click any price to verify on the retailer{'\u2019'}s website, or toggle Edit Mode to update prices manually. Your edits are saved locally.</p>
        </div>

        {/* Edit mode controls and comparison table */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <button onClick={() => setEditMode(!editMode)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${editMode ? 'bg-yellow-400 text-white' : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'}`}>
              <Edit3 size={12} />
              <span>{editMode ? 'Done Editing' : 'Edit Prices'}</span>
            </button>
            {hasEdits && !editMode && (
              <button onClick={clearEdits}
                className="flex items-center gap-1 px-2 py-1 rounded text-[10px] text-red-500 hover:bg-red-50 transition-colors">
                <span>Clear edits ({Object.keys(editedPrices).length})</span>
              </button>
            )}
          </div>
        </div>

        {/* Comparison table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-navy border-b border-gray-200">
              <tr>
                <th className="text-left px-3 py-2.5 font-medium text-xs">Brand</th>
                <th className="text-left px-3 py-2.5 font-medium text-xs">Expression</th>
                <th className="text-left px-3 py-2.5 font-medium text-xs">Segment</th>
                {retailers.map(r => (
                  <th key={r.id} className="text-right px-2 py-2.5 font-medium text-xs whitespace-nowrap">
                    <div className="flex flex-col items-end gap-0.5">
                      <span>{r.logo} {r.name}</span>
                      <span className="text-[9px] font-normal text-gray-300">{r.type}</span>
                    </div>
                  </th>
                ))}
                <th className="text-right px-3 py-2.5 font-medium text-xs">Avg</th>
                <th className="text-right px-3 py-2.5 font-medium text-xs">Spread</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((product, idx) => {
                const prices = product.prices[market] || {}
                const vals = retailers.map(r => prices[r.id]).filter(v => v !== null && v !== undefined)
                const avg = vals.length > 0 ? vals.reduce((a, b) => a + b, 0) / vals.length : null
                const min = vals.length > 0 ? Math.min(...vals) : null
                const max = vals.length > 0 ? Math.max(...vals) : null
                const spread = min !== null && max !== null ? max - min : null
                const segInfo = SEGMENT_INFO[product.segment] || { color: 'bg-gray-50 text-gray-500' }

                return (
                  <tr key={idx} className={`${idx % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'} hover:bg-blue-50/30 transition-colors`}>
                    <td className="px-3 py-2 font-medium text-navy text-xs">{product.brand}</td>
                    <td className="px-3 py-2 text-gray-600 text-xs">{product.expression}</td>
                    <td className="px-3 py-2"><span className={`text-[10px] px-1.5 py-0.5 rounded font-medium ${segInfo.color}`}>{product.segment}</span></td>
                    {retailers.map(r => {
                      const price = prices[r.id]
                      const editKey = `${idx}-${market}-${r.id}`
                      const editedPrice = editedPrices[editKey]
                      const displayPrice = editedPrice !== undefined && editedPrice !== null ? editedPrice : price
                      const isEdited = editedPrice !== undefined && editedPrice !== null
                      const isMin = displayPrice === min && displayPrice !== null && vals.length > 1
                      const isMax = displayPrice === max && displayPrice !== null && vals.length > 1
                      const productUrl = displayPrice != null && !editMode ? getProductUrl(product, r) : null
                      const offer = product.offers && product.offers[market] && product.offers[market][r.id]
                      return (
                        <td key={r.id} className="text-right px-2 py-2">
                          {displayPrice !== null && displayPrice !== undefined ? (
                            <div className="flex flex-col items-end">
                              {editMode ? (
                                <input
                                  type="number"
                                  step="0.01"
                                  defaultValue={displayPrice || ''}
                                  onBlur={(e) => updatePrice(idx, market, r.id, e.target.value)}
                                  className="w-16 text-right text-xs font-mono border border-gray-300 rounded px-1 py-0.5 focus:border-yellow-400 focus:outline-none focus:ring-1 focus:ring-yellow-400"
                                  placeholder="\u2014"
                                />
                              ) : (
                                <>
                                  {productUrl ? (
                                    <a href={productUrl} target="_blank" rel="noopener noreferrer"
                                      className="group flex flex-col items-end cursor-pointer hover:opacity-80 transition-opacity">
                                      <span className={`text-xs font-mono font-bold ${isMin ? 'text-green-600' : isMax ? 'text-red-600' : 'text-navy'} group-hover:underline ${isEdited ? 'underline decoration-dashed decoration-1' : ''}`}>
                                        {config.currency}{typeof displayPrice === 'number' ? displayPrice.toFixed(2) : displayPrice}
                                        <ExternalLink size={8} className="inline ml-0.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                                      </span>
                                    </a>
                                  ) : (
                                    <span className={`text-xs font-mono font-bold ${isMin ? 'text-green-600' : isMax ? 'text-red-600' : 'text-navy'} ${isEdited ? 'underline decoration-dashed decoration-1' : ''}`}>
                                      {config.currency}{typeof displayPrice === 'number' ? displayPrice.toFixed(2) : displayPrice}
                                    </span>
                                  )}
                                  {isEdited && (
                                    <Edit3 size={8} className="text-amber-600 mt-0.5" />
                                  )}
                                </>
                              )}
                              {!editMode && offer && (
                                <span className="text-[9px] text-green-600 font-medium mt-0.5">
                                  {config.currency}{offer.price.toFixed(2)} {offer.label}
                                </span>
                              )}
                              {!editMode && isMin && <span className="text-[8px] text-green-600 font-medium">BEST</span>}
                              {!editMode && isMax && <span className="text-[8px] text-red-500 font-medium">HIGH</span>}
                            </div>
                          ) : (
                            <span className="text-[10px] text-gray-300">{'\u2014'}</span>
                          )}
                        </td>
                      )
                    })}
                    <td className="text-right px-3 py-2">
                      {avg !== null ? <span className="text-xs font-mono font-bold text-navy">{config.currency}{avg.toFixed(2)}</span> : <span className="text-gray-300">{'\u2014'}</span>}
                    </td>
                    <td className="text-right px-3 py-2">
                      {spread !== null ? (
                        <span className={`text-xs font-mono font-medium ${spread > 5 ? 'text-red-500' : spread > 2 ? 'text-amber-500' : 'text-green-500'}`}>
                          {config.currency}{spread.toFixed(2)}
                        </span>
                      ) : <span className="text-gray-300">{'\u2014'}</span>}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && (
          <div className="text-center py-8 text-gray-400 text-sm">No products match your search.</div>
        )}
      </div>
    </div>
  )
}

// --- MARKET OVERVIEW TABLE (original compact view) ---
function MarketOverviewTable({ data, handleSort, sortBy, sortDir }) {
  const SortIcon = ({ col }) => {
    if (sortBy !== col) return <ArrowUpDown size={12} className="text-gray-300" />
    return sortDir === 'desc' ? <ChevronDown size={12} /> : <ChevronUp size={12} />
  }

  return (
    <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-navy border-b border-gray-200">
            <tr>
              <th className="text-left px-4 py-3 font-medium">Company</th>
              <th className="text-left px-4 py-3 font-medium">Brand</th>
              <th className="text-left px-4 py-3 font-medium">Expression</th>
              <th className="text-left px-4 py-3 font-medium">Category</th>
              <th className="text-left px-4 py-3 font-medium">Segment</th>
              <th className="text-right px-4 py-3 font-medium cursor-pointer hover:text-gold select-none" onClick={() => handleSort('usa')}>
                <span className="inline-flex items-center gap-1 text-blue-300">{'\ud83c\uddfa\ud83c\uddf8'} USA (750ml) <SortIcon col="usa" /></span>
              </th>
              <th className="text-right px-4 py-3 font-medium cursor-pointer hover:text-gold select-none" onClick={() => handleSort('uk')}>
                <span className="inline-flex items-center gap-1 text-red-300">{'\ud83c\uddec\ud83c\udde7'} UK (70cl) <SortIcon col="uk" /></span>
              </th>
              <th className="text-right px-4 py-3 font-medium cursor-pointer hover:text-gold select-none" onClick={() => handleSort('eu')}>
                <span className="inline-flex items-center gap-1 text-green-300">{'\ud83c\uddea\ud83c\uddfa'} EU (70cl) <SortIcon col="eu" /></span>
              </th>
              <th className="text-right px-4 py-3 font-medium cursor-pointer hover:text-gold select-none" onClick={() => handleSort('me')}>
                <span className="inline-flex items-center gap-1 text-yellow-300">{'\ud83c\udde6\ud83c\uddea'} ME (750ml) <SortIcon col="me" /></span>
              </th>
              <th className="text-right px-4 py-3 font-medium cursor-pointer hover:text-gold select-none" onClick={() => handleSort('differential')}>
                <span className="inline-flex items-center gap-1">Spread <SortIcon col="differential" /></span>
              </th>
              <th className="text-right px-4 py-3 font-medium cursor-pointer hover:text-gold select-none" onClick={() => handleSort('premium_index')}>
                <span className="inline-flex items-center gap-1">Premium % <SortIcon col="premium_index" /></span>
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, i) => {
              const segInfo = SEGMENT_INFO[row.segment] || { color: 'bg-gray-50 text-gray-500' }
              return (
                <tr key={i} className={`${i % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'} hover:bg-blue-50/30 transition-colors`}>
                  <td className="px-4 py-2.5 text-xs"><Link to="/companies" className="text-gray-500 hover:text-navy hover:underline">{row.company}</Link></td>
                  <td className="px-4 py-2.5 font-medium text-navy">{row.brand}</td>
                  <td className="px-4 py-2.5 text-gray-600 text-xs">{row.expression}</td>
                  <td className="px-4 py-2.5"><Link to="/categories" className="text-[10px] bg-gray-100 text-gray-600 px-2 py-0.5 rounded hover:bg-blue-50 hover:text-navy transition-colors">{row.category}</Link></td>
                  <td className="px-4 py-2.5"><span className={`text-[10px] px-2 py-0.5 rounded font-medium ${segInfo.color}`}>{row.segment}</span></td>
                  <td className="px-4 py-2.5 text-right text-sm font-mono">{row.usa ? `$${row.usa}` : '\u2014'}</td>
                  <td className="px-4 py-2.5 text-right text-sm font-mono">{row.uk ? `\u00a3${row.uk}` : '\u2014'}</td>
                  <td className="px-4 py-2.5 text-right text-sm font-mono">{row.eu ? `\u20ac${row.eu}` : '\u2014'}</td>
                  <td className="px-4 py-2.5 text-right text-sm font-mono">{row.me ? `$${row.me}` : '\u2014'}</td>
                  <td className="px-4 py-2.5 text-right">
                    <span className={`text-xs font-medium ${row.differential > 30 ? 'text-red-500' : row.differential > 15 ? 'text-amber-500' : 'text-green-500'}`}>
                      ${row.differential}
                    </span>
                  </td>
                  <td className="px-4 py-2.5 text-right">
                    <span className="text-xs font-medium text-navy">{Math.round((row.premium_index || 0) * 100)}%</span>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function CategoryOverview() {
  const categoryData = useMemo(() => {
    const cats = [...new Set(PRICING.map(p => p.category))]
    const colors = ['#DC2626', '#2563EB', '#059669', '#D97706', '#7C3AED', '#EC4899', '#14B8A6', '#F59E0B', '#6366F1', '#EF4444', '#8B5CF6', '#10B981']
    return cats.map((cat, i) => {
      const items = PRICING.filter(p => p.category === cat)
      const usPrices = items.map(p => p.usa).filter(Boolean)
      return { category: cat, count: items.length, minPrice: usPrices.length > 0 ? Math.min(...usPrices) : 0, maxPrice: usPrices.length > 0 ? Math.max(...usPrices) : 0, avgPrice: usPrices.length > 0 ? Math.round(usPrices.reduce((a, b) => a + b, 0) / usPrices.length) : 0, color: colors[i % colors.length] }
    })
  }, [])

  return (
    <div className="bg-white rounded-xl border border-gray-100 p-6">
      <h2 className="font-display text-section text-navy mb-4">Category Price Ranges (US avg)</h2>
      <div className="space-y-3">
        {categoryData.map((d, i) => {
          const maxWidth = Math.max(...categoryData.map(x => x.maxPrice))
          return (
            <div key={i} className="flex items-center gap-3">
              <div className="text-xs font-medium text-gray-600 w-32 text-right">{d.category}</div>
              <div className="flex-1 relative h-6 bg-gray-50 rounded-full overflow-hidden">
                <div className="absolute h-full rounded-full opacity-20" style={{ width: `${(d.maxPrice / maxWidth) * 100}%`, backgroundColor: d.color }} />
                <div className="absolute h-full rounded-full opacity-60" style={{ width: `${(d.avgPrice / maxWidth) * 100}%`, backgroundColor: d.color }} />
                <div className="absolute h-full rounded-full" style={{ width: `${(d.minPrice / maxWidth) * 100}%`, backgroundColor: d.color, opacity: 0.9 }} />
                <div className="absolute inset-0 flex items-center px-2">
                  <span className="text-[10px] font-bold text-white drop-shadow">${d.minPrice}{'\u2013'}${d.avgPrice}{'\u2013'}${d.maxPrice}</span>
                </div>
              </div>
              <div className="text-xs text-gray-400 w-16 text-right">{d.count} items</div>
            </div>
          )
        })}
      </div>
      <div className="text-[10px] text-gray-400 mt-3">Range: entry {'\u2014'} average {'\u2014'} top expression. US 750ml prices shown.</div>
    </div>
  )
}

function PricingUpdateBanner({ lastUpdated }) {
  return (
    <div className="bg-gradient-to-r from-navy/5 to-gold/5 rounded-xl border border-gold/20 p-4 flex items-center justify-between flex-wrap gap-3">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-gold/10 flex items-center justify-center">
          <RefreshCw size={14} className="text-gold" />
        </div>
        <div>
          <p className="text-xs font-medium text-navy">Real-Time Pricing Monitor</p>
          <p className="text-[10px] text-gray-500">
            Prices sourced from {Object.values(RETAILERS).flat().length} retailers across {Object.keys(MARKET_CONFIG).length} markets.
            {lastUpdated ? ` Last updated: ${new Date(lastUpdated).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}` : ' Seed data \u2014 live scraping every 3 days.'}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-3 text-[10px]">
        <span className="flex items-center gap-1 text-green-600"><span className="w-1.5 h-1.5 rounded-full bg-green-500" /> {PRICING.length} expressions</span>
        <span className="text-gray-300">|</span>
        <span className="flex items-center gap-1 text-blue-600"><Store size={10} /> {Object.values(RETAILERS).flat().length} retailers</span>
        <span className="text-gray-300">|</span>
        <span className="flex items-center gap-1 text-gray-500"><Package size={10} /> Bottle sizes vary by market</span>
      </div>
    </div>
  )
}

// ── Main Component ──
export default function BrandPricing() {
  const [viewMode, setViewMode] = useState('compare') // 'compare' = retailer comparison (default), 'overview' = market overview
  const [filter, setFilter] = useState('all')
  const [segmentFilter, setSegmentFilter] = useState('all')
  const [sortBy, setSortBy] = useState('premium_index')
  const [sortDir, setSortDir] = useState('desc')
  const [search, setSearch] = useState('')
  const [showCount, setShowCount] = useState(50)
  const [lastUpdated, setLastUpdated] = useState(null)
  const [retailerMarket, setRetailerMarket] = useState('uk')
  const [productUrls, setProductUrls] = useState({})

  useEffect(() => {
    fetch('/api/pricing/latest')
      .then(r => r.ok ? r.json() : null)
      .then(data => {
        if (data && data.lastUpdated) setLastUpdated(data.lastUpdated)
        if (data && data.productUrls) setProductUrls(data.productUrls)
      })
      .catch(() => {})
  }, [])

  const filtered = useMemo(() => {
    let data = PRICING
    if (filter !== 'all') data = data.filter(p => p.category === filter)
    if (segmentFilter !== 'all') data = data.filter(p => p.segment === segmentFilter)
    if (search) {
      const q = search.toLowerCase()
      data = data.filter(p => p.brand.toLowerCase().includes(q) || p.expression.toLowerCase().includes(q) || p.company.toLowerCase().includes(q))
    }
    data = [...data].sort((a, b) => { const av = a[sortBy] || 0; const bv = b[sortBy] || 0; return sortDir === 'desc' ? bv - av : av - bv })
    return data
  }, [filter, segmentFilter, search, sortBy, sortDir])

  const displayed = filtered.slice(0, showCount)

  const handleSort = (col) => {
    if (sortBy === col) setSortDir(d => d === 'desc' ? 'asc' : 'desc')
    else { setSortBy(col); setSortDir('desc') }
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Brand Pricing Monitor"
        subtitle={`Retailer-level RRP comparison across ${Object.keys(MARKET_CONFIG).length} markets \u2014 ${PRICING.length} expressions tracked across ${Object.values(RETAILERS).flat().length} retailers`}
        breadcrumbs={[
          { label: 'Command Centre', to: '/' },
          { label: 'Brand Pricing' },
        ]}
        action={
          <TabGroup
            tabs={[
              { key: 'compare', label: 'Retailer Comparison' },
              { key: 'overview', label: 'Market Overview' },
            ]}
            active={viewMode}
            onChange={setViewMode}
          />
        }
      />

      <PricingUpdateBanner lastUpdated={lastUpdated} />

      {/* Retailer Directory — always visible */}
      <RetailerDirectory selectedMarket={viewMode === 'compare' ? 'uk' : retailerMarket} />

      {viewMode === 'compare' ? (
        <RetailerComparisonView productUrls={productUrls} />
      ) : (
        <>
          <SegmentInfoPanel />
          <CategoryOverview />

          {/* Filters */}
          <div className="space-y-3">
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input type="text" placeholder="Search brand, expression, or company..." value={search} onChange={e => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy" />
            </div>
            <div className="flex gap-2 flex-wrap items-center">
              <Filter size={14} className="text-gray-400" />
              <FilterPills
                options={CATEGORIES.map(cat => ({ key: cat, label: cat === 'all' ? 'All Categories' : cat }))}
                active={filter}
                onChange={(val) => { setFilter(val); setShowCount(50) }}
                size="sm"
              />
            </div>
            <div className="flex gap-2 flex-wrap items-center">
              <span className="text-xs text-gray-400">Segment:</span>
              <FilterPills
                options={SEGMENTS.map(seg => ({ key: seg, label: seg === 'all' ? 'All Segments' : seg }))}
                active={segmentFilter}
                onChange={(val) => { setSegmentFilter(val); setShowCount(50) }}
                size="sm"
              />
            </div>
          </div>

          <div className="text-xs text-gray-400">
            Showing {displayed.length} of {filtered.length} expressions. Column headers show bottle sizes per market.
          </div>

          <MarketOverviewTable data={displayed} handleSort={handleSort} sortBy={sortBy} sortDir={sortDir} />

          {filtered.length > showCount && (
            <div className="text-center">
              <button onClick={() => setShowCount(c => c + 50)} className="px-6 py-2 rounded-lg bg-navy text-white text-sm font-medium hover:bg-navy-light transition-colors">
                Show More ({filtered.length - showCount} remaining)
              </button>
            </div>
          )}
        </>
      )}

      {/* Methodology */}
      <div className="bg-white rounded-xl border border-gray-100 p-4">
        <h3 className="text-xs font-semibold text-navy mb-2 flex items-center gap-2"><AlertCircle size={12} /> Pricing Methodology</h3>
        <p className="text-[11px] text-gray-500 leading-relaxed">
          Prices represent recommended retail prices (RRP). <strong>Bottle sizes vary by market:</strong> UK and EU markets use the standard 70cl (700ml) bottle; US and Middle East markets use 750ml (25.4 fl oz).
          UK prices in GBP ({'\u00a3'}), EU prices in EUR ({'\u20ac'}), US and Middle East in USD ($).
          Market averages are calculated from available retailer prices. EU average aggregates Spain, France, Germany, Italy, and Netherlands.
          Null values indicate the product is not stocked at that retailer. Prices updated via automated scraping every 3 days.
        </p>
        <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 sm:grid-cols-4 gap-2">
          {Object.entries(MARKET_CONFIG).map(([key, cfg]) => (
            <div key={key} className="flex items-center gap-2 text-[10px] bg-gray-50 text-gray-600 px-2.5 py-1.5 rounded-lg border border-gray-100">
              <span className="text-sm">{cfg.flag}</span>
              <div>
                <p className="font-medium">{cfg.label}</p>
                <p className="text-gray-400">{(RETAILERS[key] || []).length} retailers {'\u00b7'} {cfg.bottleSize} bottle {'\u00b7'} {cfg.currency}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
