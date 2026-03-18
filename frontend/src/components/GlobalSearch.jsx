import React, { useState, useEffect, useRef, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, X, LayoutDashboard, Wine, MapPin, DollarSign, Building2, Globe, TrendingUp, Package, CloudRain, ShoppingBag, Crosshair, Target, FileText, ArrowRight } from 'lucide-react'

// Static search index — pages, categories, key terms
const SEARCH_ITEMS = [
  // Pages
  { type: 'page', label: 'Command Centre', path: '/', icon: LayoutDashboard, keywords: ['home', 'dashboard', 'overview', 'hub'] },
  { type: 'page', label: 'Category Intelligence', path: '/categories', icon: Wine, keywords: ['categories', 'spirits', 'drinks', 'market'] },
  { type: 'page', label: 'Venue Intelligence', path: '/venues', icon: MapPin, keywords: ['venues', 'bars', 'restaurants', '50 best', 'london'] },
  { type: 'page', label: 'Brand Pricing', path: '/pricing', icon: DollarSign, keywords: ['pricing', 'brands', 'prices', 'retail', 'wholesale'] },
  { type: 'page', label: 'Company Intelligence', path: '/companies', icon: Building2, keywords: ['companies', 'corporate', 'conglomerates', 'lvmh', 'diageo', 'pernod'] },
  { type: 'page', label: 'Geographic Intelligence', path: '/geographic', icon: Globe, keywords: ['geographic', 'countries', 'regions', 'trade', 'export', 'import'] },
  { type: 'page', label: 'Valuations & Arbitrage', path: '/valuations', icon: TrendingUp, keywords: ['valuations', 'arbitrage', 'stocks', 'market cap', 'finance'] },
  { type: 'page', label: 'Supply Chain & COGS', path: '/supply-chain', icon: Package, keywords: ['supply chain', 'cogs', 'cost', 'raw materials', 'glass', 'agave'] },
  { type: 'page', label: 'Climate & Yield', path: '/climate', icon: CloudRain, keywords: ['climate', 'yield', 'weather', 'harvest', 'grape', 'agave'] },
  { type: 'page', label: 'POS Manufacturing', path: '/pos', icon: ShoppingBag, keywords: ['pos', 'point of sale', 'manufacturing', 'materials'] },
  { type: 'page', label: 'Scenario Modelling', path: '/scenario', icon: Crosshair, keywords: ['scenario', 'modelling', 'simulation', 'what if'] },
  { type: 'page', label: 'Campaign Planner', path: '/campaigns', icon: Target, keywords: ['campaign', 'planner', 'marketing', 'budget', 'activation'] },
  { type: 'page', label: 'Report Builder', path: '/reports', icon: FileText, keywords: ['report', 'builder', 'export', 'pdf'] },

  // Categories (deep links)
  { type: 'category', label: 'Tequila & Mezcal', path: '/categories', param: 'tequila', keywords: ['tequila', 'mezcal', 'agave', 'jose cuervo', 'patron', 'don julio', 'casamigos'] },
  { type: 'category', label: 'Vodka', path: '/categories', param: 'vodka', keywords: ['vodka', 'grey goose', 'belvedere', 'absolut', 'smirnoff', 'ketel one'] },
  { type: 'category', label: 'Gin', path: '/categories', param: 'gin', keywords: ['gin', 'hendricks', 'tanqueray', 'bombay', 'beefeater', 'monkey 47'] },
  { type: 'category', label: 'Whisky', path: '/categories', param: 'whisky', keywords: ['whisky', 'whiskey', 'scotch', 'bourbon', 'japanese', 'johnnie walker', 'macallan', 'glenfiddich'] },
  { type: 'category', label: 'Rum', path: '/categories', param: 'rum', keywords: ['rum', 'bacardi', 'havana club', 'diplomatico', 'appleton', 'mount gay'] },
  { type: 'category', label: 'Cognac & Brandy', path: '/categories', param: 'cognac', keywords: ['cognac', 'brandy', 'hennessy', 'remy martin', 'courvoisier', 'martell'] },
  { type: 'category', label: 'Champagne & Sparkling', path: '/categories', param: 'champagne', keywords: ['champagne', 'sparkling', 'prosecco', 'cava', 'moet', 'veuve clicquot', 'dom perignon'] },
  { type: 'category', label: 'Wine', path: '/categories', param: 'wine', keywords: ['wine', 'red', 'white', 'rose', 'natural', 'organic', 'bordeaux', 'burgundy'] },
  { type: 'category', label: 'Beer & Cider', path: '/categories', param: 'beer', keywords: ['beer', 'cider', 'craft', 'lager', 'ale', 'ipa', 'stout'] },
  { type: 'category', label: 'No & Low Alcohol', path: '/categories', param: 'nolo', keywords: ['nolo', 'no alcohol', 'low alcohol', 'non alcoholic', 'seedlip', 'lyre'] },
  { type: 'category', label: 'RTD & Hard Seltzer', path: '/categories', param: 'rtd', keywords: ['rtd', 'ready to drink', 'hard seltzer', 'white claw', 'high noon'] },

  // Key companies
  { type: 'company', label: 'Diageo', path: '/companies', keywords: ['diageo', 'johnnie walker', 'guinness', 'smirnoff', 'tanqueray', 'don julio'] },
  { type: 'company', label: 'LVMH (Mo\u00ebt Hennessy)', path: '/companies', keywords: ['lvmh', 'moet', 'hennessy', 'dom perignon', 'veuve clicquot', 'glenmorangie'] },
  { type: 'company', label: 'Pernod Ricard', path: '/companies', keywords: ['pernod ricard', 'absolut', 'jameson', 'beefeater', 'havana club', 'martell'] },
  { type: 'company', label: 'Bacardi', path: '/companies', keywords: ['bacardi', 'grey goose', 'bombay sapphire', 'dewar', 'patron'] },
  { type: 'company', label: 'Brown-Forman', path: '/companies', keywords: ['brown forman', 'jack daniels', 'woodford reserve', 'old forester'] },
  { type: 'company', label: 'Beam Suntory', path: '/companies', keywords: ['beam suntory', 'jim beam', 'maker mark', 'roku', 'hibiki', 'yamazaki'] },
  { type: 'company', label: 'Campari Group', path: '/companies', keywords: ['campari', 'aperol', 'wild turkey', 'grand marnier', 'appleton'] },
  { type: 'company', label: 'R\u00e9my Cointreau', path: '/companies', keywords: ['remy cointreau', 'remy martin', 'cointreau', 'mount gay', 'bruichladdich'] },
  { type: 'company', label: 'William Grant & Sons', path: '/companies', keywords: ['william grant', 'glenfiddich', 'hendricks', 'monkey shoulder', 'balvenie'] },
  { type: 'company', label: 'Edrington', path: '/companies', keywords: ['edrington', 'macallan', 'highland park', 'famous grouse'] },
]

export default function GlobalSearch({ isOpen, onClose }) {
  const [query, setQuery] = useState('')
  const inputRef = useRef(null)
  const navigate = useNavigate()

  // Cmd+K keyboard shortcut handled by parent via onClose toggle
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
      setQuery('')
    }
  }, [isOpen])

  const results = useMemo(() => {
    if (!query.trim()) return SEARCH_ITEMS.filter(i => i.type === 'page')
    const q = query.toLowerCase()
    return SEARCH_ITEMS.filter(item => {
      if (item.label.toLowerCase().includes(q)) return true
      return item.keywords.some(k => k.includes(q))
    }).slice(0, 12)
  }, [query])

  const handleSelect = (item) => {
    onClose()
    navigate(item.path)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh]" onClick={onClose}>
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden" onClick={e => e.stopPropagation()}>
        {/* Search input */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-gray-100">
          <Search size={18} className="text-gray-400 shrink-0" />
          <input
            ref={inputRef}
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search pages, categories, brands, companies..."
            className="flex-1 text-sm text-gray-900 placeholder-gray-400 outline-none bg-transparent"
          />
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X size={16} />
          </button>
        </div>

        {/* Results */}
        <div className="max-h-80 overflow-y-auto py-2">
          {results.length === 0 && (
            <div className="px-5 py-8 text-center text-sm text-gray-400">No results for &ldquo;{query}&rdquo;</div>
          )}
          {results.map((item, i) => {
            const Icon = item.icon || (item.type === 'category' ? Wine : item.type === 'company' ? Building2 : Search)
            return (
              <button
                key={i}
                onClick={() => handleSelect(item)}
                className="flex items-center gap-3 w-full px-5 py-2.5 hover:bg-gray-50 transition-colors text-left"
              >
                <Icon size={16} className="text-gray-400 shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-gray-900 truncate">{item.label}</div>
                  <div className="text-[11px] text-gray-400 capitalize">{item.type}</div>
                </div>
                <ArrowRight size={14} className="text-gray-300 shrink-0" />
              </button>
            )
          })}
        </div>

        {/* Footer */}
        <div className="px-5 py-2.5 border-t border-gray-100 flex items-center justify-between">
          <span className="text-[11px] text-gray-400">Navigate with arrow keys</span>
          <span className="text-[11px] text-gray-400">
            <kbd className="px-1.5 py-0.5 bg-gray-100 rounded text-[10px] font-mono">ESC</kbd> to close
          </span>
        </div>
      </div>
    </div>
  )
}
