import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, X, LayoutDashboard, Wine, MapPin, DollarSign, Building2, Globe, TrendingUp, Package, CloudRain, ShoppingBag, Crosshair, Target, FileText, ArrowRight, Tag } from 'lucide-react'

/* ──────────────────────────────────────────────────────────
   SEARCH INDEX — Pages, Categories, Brands, Venues, Companies
   ────────────────────────────────────────────────────────── */

const PAGES = [
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
]

const CATEGORIES = [
  { type: 'category', label: 'Tequila & Mezcal', path: '/category/tequila', keywords: ['tequila', 'mezcal', 'agave', 'jose cuervo', 'patron', 'don julio', 'casamigos'] },
  { type: 'category', label: 'Vodka', path: '/category/vodka', keywords: ['vodka', 'grey goose', 'belvedere', 'absolut', 'smirnoff', 'ketel one'] },
  { type: 'category', label: 'Gin', path: '/category/gin', keywords: ['gin', 'hendricks', 'tanqueray', 'bombay', 'beefeater', 'monkey 47'] },
  { type: 'category', label: 'Whisky', path: '/category/whisky', keywords: ['whisky', 'whiskey', 'scotch', 'bourbon', 'japanese', 'johnnie walker', 'macallan', 'glenfiddich'] },
  { type: 'category', label: 'Rum', path: '/category/rum', keywords: ['rum', 'bacardi', 'havana club', 'diplomatico', 'appleton', 'mount gay'] },
  { type: 'category', label: 'Cognac & Brandy', path: '/category/cognac', keywords: ['cognac', 'brandy', 'hennessy', 'remy martin', 'courvoisier', 'martell'] },
  { type: 'category', label: 'Champagne & Sparkling', path: '/category/champagne', keywords: ['champagne', 'sparkling', 'prosecco', 'cava', 'moet', 'veuve clicquot', 'dom perignon'] },
  { type: 'category', label: 'Wine', path: '/category/wine', keywords: ['wine', 'red', 'white', 'rose', 'natural', 'organic', 'bordeaux', 'burgundy'] },
  { type: 'category', label: 'Beer & Cider', path: '/category/beer', keywords: ['beer', 'cider', 'craft', 'lager', 'ale', 'ipa', 'stout'] },
  { type: 'category', label: 'No & Low Alcohol', path: '/category/nolo', keywords: ['nolo', 'no alcohol', 'low alcohol', 'non alcoholic', 'seedlip', 'lyre'] },
  { type: 'category', label: 'RTD & Hard Seltzer', path: '/category/rtd', keywords: ['rtd', 'ready to drink', 'hard seltzer', 'white claw', 'high noon'] },
]

const BRANDS = [
  // Scotch Whisky
  { type: 'brand', label: 'Johnnie Walker', sub: 'Scotch Whisky \u00b7 Diageo', path: '/pricing', keywords: ['johnnie walker', 'black label', 'blue label', 'green label', 'diageo', 'scotch'] },
  { type: 'brand', label: 'The Macallan', sub: 'Scotch Whisky \u00b7 Edrington', path: '/pricing', keywords: ['macallan', 'edrington', 'scotch', 'double cask', 'sherry oak'] },
  { type: 'brand', label: 'Glenfiddich', sub: 'Scotch Whisky \u00b7 William Grant', path: '/pricing', keywords: ['glenfiddich', 'william grant', 'scotch', 'speyside', 'single malt'] },
  { type: 'brand', label: 'Monkey Shoulder', sub: 'Scotch Whisky \u00b7 William Grant', path: '/pricing', keywords: ['monkey shoulder', 'william grant', 'blended malt', 'scotch'] },
  { type: 'brand', label: 'Highland Park', sub: 'Scotch Whisky \u00b7 Edrington', path: '/pricing', keywords: ['highland park', 'edrington', 'scotch', 'orkney'] },
  // Bourbon
  { type: 'brand', label: 'Jack Daniel\u2019s', sub: 'Bourbon \u00b7 Brown-Forman', path: '/pricing', keywords: ['jack daniels', 'brown forman', 'bourbon', 'tennessee'] },
  { type: 'brand', label: 'Buffalo Trace', sub: 'Bourbon \u00b7 Sazerac', path: '/pricing', keywords: ['buffalo trace', 'sazerac', 'bourbon'] },
  { type: 'brand', label: 'Woodford Reserve', sub: 'Bourbon \u00b7 Brown-Forman', path: '/pricing', keywords: ['woodford reserve', 'brown forman', 'bourbon', 'premium'] },
  { type: 'brand', label: 'Blanton\u2019s', sub: 'Bourbon \u00b7 Sazerac', path: '/pricing', keywords: ['blantons', 'sazerac', 'bourbon', 'single barrel'] },
  { type: 'brand', label: 'Maker\u2019s Mark', sub: 'Bourbon \u00b7 Beam Suntory', path: '/pricing', keywords: ['makers mark', 'beam suntory', 'bourbon', 'wheated'] },
  // Tequila
  { type: 'brand', label: 'Don Julio', sub: 'Tequila \u00b7 Diageo', path: '/pricing', keywords: ['don julio', 'diageo', 'tequila', '1942', 'blanco', 'anejo'] },
  { type: 'brand', label: 'Jos\u00e9 Cuervo', sub: 'Tequila \u00b7 Becle', path: '/pricing', keywords: ['jose cuervo', 'becle', 'tequila', 'especial'] },
  { type: 'brand', label: 'Patr\u00f3n', sub: 'Tequila \u00b7 Bacardi', path: '/pricing', keywords: ['patron', 'bacardi', 'tequila', 'silver', 'anejo'] },
  { type: 'brand', label: 'Casamigos', sub: 'Tequila \u00b7 Diageo', path: '/pricing', keywords: ['casamigos', 'diageo', 'tequila', 'blanco', 'reposado'] },
  { type: 'brand', label: 'Altos', sub: 'Tequila \u00b7 Pernod Ricard', path: '/pricing', keywords: ['altos', 'pernod ricard', 'tequila', 'plata'] },
  // Gin
  { type: 'brand', label: 'Tanqueray', sub: 'Gin \u00b7 Diageo', path: '/pricing', keywords: ['tanqueray', 'diageo', 'gin', 'london dry'] },
  { type: 'brand', label: 'Beefeater', sub: 'Gin \u00b7 Pernod Ricard', path: '/pricing', keywords: ['beefeater', 'pernod ricard', 'gin', 'london dry'] },
  { type: 'brand', label: 'Hendrick\u2019s', sub: 'Gin \u00b7 William Grant', path: '/pricing', keywords: ['hendricks', 'william grant', 'gin', 'cucumber', 'rose'] },
  { type: 'brand', label: 'Bombay Sapphire', sub: 'Gin \u00b7 Bacardi', path: '/pricing', keywords: ['bombay sapphire', 'bacardi', 'gin'] },
  { type: 'brand', label: 'Monkey 47', sub: 'Gin \u00b7 Pernod Ricard', path: '/pricing', keywords: ['monkey 47', 'pernod ricard', 'gin', 'schwarzwald'] },
  // Vodka
  { type: 'brand', label: 'Grey Goose', sub: 'Vodka \u00b7 Bacardi', path: '/pricing', keywords: ['grey goose', 'bacardi', 'vodka', 'french'] },
  { type: 'brand', label: 'Absolut', sub: 'Vodka \u00b7 Pernod Ricard', path: '/pricing', keywords: ['absolut', 'pernod ricard', 'vodka', 'swedish'] },
  { type: 'brand', label: 'Belvedere', sub: 'Vodka \u00b7 LVMH', path: '/pricing', keywords: ['belvedere', 'lvmh', 'vodka', 'polish'] },
  { type: 'brand', label: 'Ketel One', sub: 'Vodka \u00b7 Diageo', path: '/pricing', keywords: ['ketel one', 'diageo', 'vodka', 'dutch'] },
  { type: 'brand', label: 'Smirnoff', sub: 'Vodka \u00b7 Diageo', path: '/pricing', keywords: ['smirnoff', 'diageo', 'vodka'] },
  // Rum
  { type: 'brand', label: 'Bacardi', sub: 'Rum \u00b7 Bacardi', path: '/pricing', keywords: ['bacardi', 'rum', 'carta blanca', 'ocho'] },
  { type: 'brand', label: 'Havana Club', sub: 'Rum \u00b7 Pernod Ricard', path: '/pricing', keywords: ['havana club', 'pernod ricard', 'rum', 'cuban'] },
  { type: 'brand', label: 'Ron Zacapa', sub: 'Rum \u00b7 Diageo', path: '/pricing', keywords: ['ron zacapa', 'diageo', 'rum', 'guatemalan', 'centenario'] },
  { type: 'brand', label: 'Diplomático', sub: 'Rum \u00b7 DUSA', path: '/pricing', keywords: ['diplomatico', 'rum', 'venezuelan', 'reserva exclusiva'] },
  { type: 'brand', label: 'Appleton Estate', sub: 'Rum \u00b7 Campari', path: '/pricing', keywords: ['appleton', 'campari', 'rum', 'jamaican'] },
  // Cognac
  { type: 'brand', label: 'Hennessy', sub: 'Cognac \u00b7 LVMH', path: '/pricing', keywords: ['hennessy', 'lvmh', 'cognac', 'vs', 'vsop', 'xo'] },
  { type: 'brand', label: 'R\u00e9my Martin', sub: 'Cognac \u00b7 R\u00e9my Cointreau', path: '/pricing', keywords: ['remy martin', 'remy cointreau', 'cognac', 'vsop', 'louis xiii'] },
  { type: 'brand', label: 'Martell', sub: 'Cognac \u00b7 Pernod Ricard', path: '/pricing', keywords: ['martell', 'pernod ricard', 'cognac', 'vs', 'cordon bleu'] },
  { type: 'brand', label: 'Courvoisier', sub: 'Cognac \u00b7 Campari', path: '/pricing', keywords: ['courvoisier', 'campari', 'cognac', 'vs', 'vsop'] },
  // Champagne
  { type: 'brand', label: 'Mo\u00ebt & Chandon', sub: 'Champagne \u00b7 LVMH', path: '/pricing', keywords: ['moet', 'chandon', 'lvmh', 'champagne', 'imperial'] },
  { type: 'brand', label: 'Veuve Clicquot', sub: 'Champagne \u00b7 LVMH', path: '/pricing', keywords: ['veuve clicquot', 'lvmh', 'champagne', 'yellow label'] },
  { type: 'brand', label: 'Dom P\u00e9rignon', sub: 'Champagne \u00b7 LVMH', path: '/pricing', keywords: ['dom perignon', 'lvmh', 'champagne', 'vintage', 'prestige'] },
  { type: 'brand', label: 'Krug', sub: 'Champagne \u00b7 LVMH', path: '/pricing', keywords: ['krug', 'lvmh', 'champagne', 'grande cuvee'] },
  { type: 'brand', label: 'Laurent-Perrier', sub: 'Champagne', path: '/pricing', keywords: ['laurent perrier', 'champagne', 'rose', 'grand siecle'] },
  // Wine
  { type: 'brand', label: 'Campo Viejo', sub: 'Wine \u00b7 Pernod Ricard', path: '/pricing', keywords: ['campo viejo', 'pernod ricard', 'wine', 'rioja', 'tempranillo'] },
  // No/Lo
  { type: 'brand', label: 'Seedlip', sub: 'No/Lo \u00b7 Diageo', path: '/pricing', keywords: ['seedlip', 'diageo', 'non alcoholic', 'nolo', 'garden 108'] },
  { type: 'brand', label: 'Lyre\u2019s', sub: 'No/Lo', path: '/pricing', keywords: ['lyres', 'non alcoholic', 'nolo', 'spirit alternatives'] },
  // Beer
  { type: 'brand', label: 'Stella Artois', sub: 'Beer \u00b7 AB InBev', path: '/pricing', keywords: ['stella artois', 'ab inbev', 'beer', 'lager', 'belgian'] },
  { type: 'brand', label: 'Guinness', sub: 'Beer \u00b7 Diageo', path: '/pricing', keywords: ['guinness', 'diageo', 'beer', 'stout', 'irish'] },
  // RTD
  { type: 'brand', label: 'Smirnoff Ice', sub: 'RTD \u00b7 Diageo', path: '/pricing', keywords: ['smirnoff ice', 'diageo', 'rtd', 'ready to drink'] },
  { type: 'brand', label: 'White Claw', sub: 'RTD \u00b7 Mark Anthony', path: '/pricing', keywords: ['white claw', 'hard seltzer', 'rtd'] },
]

const VENUES = [
  { type: 'venue', label: 'Bar Leone', sub: 'Hong Kong \u00b7 #1 (2025)', path: '/venues', keywords: ['bar leone', 'hong kong', 'asia'] },
  { type: 'venue', label: 'Handshake Speakeasy', sub: 'Mexico City \u00b7 #1 (2024)', path: '/venues', keywords: ['handshake speakeasy', 'mexico city', 'speakeasy'] },
  { type: 'venue', label: 'Sips', sub: 'Barcelona \u00b7 #1 (2023)', path: '/venues', keywords: ['sips', 'barcelona', 'spain'] },
  { type: 'venue', label: 'Paradiso', sub: 'Barcelona \u00b7 #1 (2022)', path: '/venues', keywords: ['paradiso', 'barcelona', 'spain', 'speakeasy'] },
  { type: 'venue', label: 'Connaught Bar', sub: 'London \u00b7 #1 (2021)', path: '/venues', keywords: ['connaught', 'london', 'hotel bar', 'mayfair'] },
  { type: 'venue', label: 'Tay\u0113r + Elementary', sub: 'London \u00b7 Top 5', path: '/venues', keywords: ['tayer', 'elementary', 'london', 'dalston'] },
  { type: 'venue', label: 'Jigger & Pony', sub: 'Singapore \u00b7 Top 10', path: '/venues', keywords: ['jigger', 'pony', 'singapore'] },
  { type: 'venue', label: 'Tres Monos', sub: 'Buenos Aires \u00b7 Top 10', path: '/venues', keywords: ['tres monos', 'buenos aires', 'argentina'] },
  { type: 'venue', label: 'Alqu\u00edmico', sub: 'Cartagena \u00b7 Top 15', path: '/venues', keywords: ['alquimico', 'cartagena', 'colombia'] },
  { type: 'venue', label: 'Himkok', sub: 'Oslo \u00b7 Top 15', path: '/venues', keywords: ['himkok', 'oslo', 'norway', 'scandinavian'] },
  { type: 'venue', label: 'Line', sub: 'Athens \u00b7 Top 10', path: '/venues', keywords: ['line', 'athens', 'greece'] },
  { type: 'venue', label: 'Moebius Milano', sub: 'Milan \u00b7 Top 10', path: '/venues', keywords: ['moebius', 'milan', 'italy'] },
  { type: 'venue', label: 'Double Chicken Please', sub: 'New York \u00b7 Top 15', path: '/venues', keywords: ['double chicken please', 'new york', 'nyc'] },
  { type: 'venue', label: 'Superbueno', sub: 'New York \u00b7 Top 15', path: '/venues', keywords: ['superbueno', 'new york', 'nyc'] },
  { type: 'venue', label: 'Lady Bee', sub: 'Lima \u00b7 Top 15', path: '/venues', keywords: ['lady bee', 'lima', 'peru'] },
  { type: 'venue', label: 'Zest', sub: 'Seoul \u00b7 Top 20', path: '/venues', keywords: ['zest', 'seoul', 'south korea'] },
  { type: 'venue', label: 'Bar Nouveau', sub: 'Paris \u00b7 Top 20', path: '/venues', keywords: ['bar nouveau', 'paris', 'france'] },
  { type: 'venue', label: 'Bar Benfiddich', sub: 'Tokyo \u00b7 Top 20', path: '/venues', keywords: ['benfiddich', 'tokyo', 'japan'] },
  { type: 'venue', label: 'Satan\u2019s Whiskers', sub: 'London \u00b7 Top 25', path: '/venues', keywords: ['satans whiskers', 'london', 'bethnal green'] },
  { type: 'venue', label: 'Scarfes Bar', sub: 'London \u00b7 Top 35', path: '/venues', keywords: ['scarfes', 'london', 'hotel bar', 'rosewood'] },
  { type: 'venue', label: 'Panda & Sons', sub: 'Edinburgh \u00b7 Top 35', path: '/venues', keywords: ['panda', 'sons', 'edinburgh', 'scotland'] },
  { type: 'venue', label: 'Salmon Guru', sub: 'Madrid \u00b7 Top 40', path: '/venues', keywords: ['salmon guru', 'madrid', 'spain'] },
  { type: 'venue', label: 'Drink Kong', sub: 'Rome \u00b7 Top 40', path: '/venues', keywords: ['drink kong', 'rome', 'italy'] },
  { type: 'venue', label: 'Mimi Kakushi', sub: 'Dubai \u00b7 Top 40', path: '/venues', keywords: ['mimi kakushi', 'dubai', 'uae'] },
  { type: 'venue', label: 'Coa', sub: 'Hong Kong \u00b7 Top 40', path: '/venues', keywords: ['coa', 'hong kong', 'agave bar'] },
  { type: 'venue', label: 'Licorer\u00eda Limantour', sub: 'Mexico City \u00b7 Top 50', path: '/venues', keywords: ['limantour', 'licoreria', 'mexico city'] },
  { type: 'venue', label: 'Maybe Sammy', sub: 'Sydney \u00b7 Top 45', path: '/venues', keywords: ['maybe sammy', 'sydney', 'australia'] },
  { type: 'venue', label: 'Baba au Rum', sub: 'Athens \u00b7 Top 30', path: '/venues', keywords: ['baba au rum', 'athens', 'greece', 'rum bar'] },
  { type: 'venue', label: 'Danico', sub: 'Paris \u00b7 Top 30', path: '/venues', keywords: ['danico', 'paris', 'france'] },
  { type: 'venue', label: 'The Cambridge Public House', sub: 'Paris \u00b7 Top 20', path: '/venues', keywords: ['cambridge', 'public house', 'paris'] },
]

const COMPANIES = [
  { type: 'company', label: 'Diageo', sub: '\u00a358B market cap \u00b7 London', path: '/companies', keywords: ['diageo', 'johnnie walker', 'guinness', 'smirnoff', 'tanqueray', 'don julio', 'casamigos'] },
  { type: 'company', label: 'LVMH (Mo\u00ebt Hennessy)', sub: '\u20ac380B market cap \u00b7 Paris', path: '/companies', keywords: ['lvmh', 'moet', 'hennessy', 'dom perignon', 'veuve clicquot', 'glenmorangie', 'belvedere'] },
  { type: 'company', label: 'Pernod Ricard', sub: '\u20ac38B market cap \u00b7 Paris', path: '/companies', keywords: ['pernod ricard', 'absolut', 'jameson', 'beefeater', 'havana club', 'martell', 'altos'] },
  { type: 'company', label: 'Bacardi', sub: 'Private \u00b7 Hamilton', path: '/companies', keywords: ['bacardi', 'grey goose', 'bombay sapphire', 'dewar', 'patron'] },
  { type: 'company', label: 'Brown-Forman', sub: '$22B market cap \u00b7 Louisville', path: '/companies', keywords: ['brown forman', 'jack daniels', 'woodford reserve', 'old forester'] },
  { type: 'company', label: 'Beam Suntory', sub: 'Private \u00b7 Tokyo/Chicago', path: '/companies', keywords: ['beam suntory', 'jim beam', 'makers mark', 'roku', 'hibiki', 'yamazaki'] },
  { type: 'company', label: 'Campari Group', sub: '\u20ac12B market cap \u00b7 Milan', path: '/companies', keywords: ['campari', 'aperol', 'wild turkey', 'grand marnier', 'appleton'] },
  { type: 'company', label: 'R\u00e9my Cointreau', sub: '\u20ac7B market cap \u00b7 Paris', path: '/companies', keywords: ['remy cointreau', 'remy martin', 'cointreau', 'mount gay', 'bruichladdich'] },
  { type: 'company', label: 'William Grant & Sons', sub: 'Private \u00b7 Dufftown', path: '/companies', keywords: ['william grant', 'glenfiddich', 'hendricks', 'monkey shoulder', 'balvenie'] },
  { type: 'company', label: 'Edrington', sub: 'Private \u00b7 Glasgow', path: '/companies', keywords: ['edrington', 'macallan', 'highland park', 'famous grouse'] },
  { type: 'company', label: 'AB InBev', sub: '$115B market cap \u00b7 Leuven', path: '/companies', keywords: ['ab inbev', 'budweiser', 'stella artois', 'corona', 'beer'] },
  { type: 'company', label: 'Heineken', sub: '\u20ac45B market cap \u00b7 Amsterdam', path: '/companies', keywords: ['heineken', 'beer', 'amstel', 'tiger'] },
]

const ALL_ITEMS = [...PAGES, ...CATEGORIES, ...BRANDS, ...VENUES, ...COMPANIES]

/* ──────────────────────────────────────────────────────────
   Type config for display
   ────────────────────────────────────────────────────────── */
const TYPE_CONFIG = {
  page: { label: 'Pages', icon: LayoutDashboard, color: 'text-gray-500' },
  category: { label: 'Categories', icon: Wine, color: 'text-amber-600' },
  brand: { label: 'Brands', icon: Tag, color: 'text-blue-600' },
  venue: { label: 'Venues', icon: MapPin, color: 'text-emerald-600' },
  company: { label: 'Companies', icon: Building2, color: 'text-purple-600' },
}

const TYPE_ORDER = ['page', 'category', 'brand', 'venue', 'company']

export default function GlobalSearch({ isOpen, onClose }) {
  const [query, setQuery] = useState('')
  const [activeIndex, setActiveIndex] = useState(0)
  const inputRef = useRef(null)
  const listRef = useRef(null)
  const navigate = useNavigate()

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
      setQuery('')
      setActiveIndex(0)
    }
  }, [isOpen])

  /* Filter results */
  const results = useMemo(() => {
    if (!query.trim()) return PAGES
    const q = query.toLowerCase()
    return ALL_ITEMS.filter(item => {
      if (item.label.toLowerCase().includes(q)) return true
      if (item.sub && item.sub.toLowerCase().includes(q)) return true
      return item.keywords.some(k => k.includes(q))
    }).slice(0, 20)
  }, [query])

  /* Group results by type */
  const grouped = useMemo(() => {
    const groups = {}
    const flatList = []
    for (const type of TYPE_ORDER) {
      const items = results.filter(r => r.type === type)
      if (items.length > 0) {
        groups[type] = items
        flatList.push(...items)
      }
    }
    return { groups, flatList }
  }, [results])

  /* Reset active index when results change */
  useEffect(() => { setActiveIndex(0) }, [results])

  const handleSelect = useCallback((item) => {
    onClose()
    navigate(item.path)
  }, [onClose, navigate])

  /* Keyboard navigation */
  const handleKeyDown = useCallback((e) => {
    const { flatList } = grouped
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActiveIndex(i => Math.min(i + 1, flatList.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActiveIndex(i => Math.max(i - 1, 0))
    } else if (e.key === 'Enter') {
      e.preventDefault()
      if (flatList[activeIndex]) handleSelect(flatList[activeIndex])
    } else if (e.key === 'Escape') {
      e.preventDefault()
      onClose()
    }
  }, [grouped, activeIndex, handleSelect, onClose])

  /* Scroll active item into view */
  useEffect(() => {
    if (listRef.current) {
      const active = listRef.current.querySelector('[data-active="true"]')
      if (active) active.scrollIntoView({ block: 'nearest' })
    }
  }, [activeIndex])

  if (!isOpen) return null

  let flatIndex = 0

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[12vh] sm:pt-[15vh] px-4" onClick={onClose}>
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" />
      <div
        className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden border border-gray-200/60"
        onClick={e => e.stopPropagation()}
      >
        {/* Search input */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-gray-100">
          <Search size={18} className="text-gray-400 shrink-0" />
          <input
            ref={inputRef}
            value={query}
            onChange={e => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search categories, brands, venues, companies\u2026"
            className="flex-1 text-sm text-gray-900 placeholder-gray-400 outline-none bg-transparent"
            autoComplete="off"
            spellCheck="false"
          />
          {query && (
            <button onClick={() => { setQuery(''); inputRef.current?.focus() }} className="text-gray-300 hover:text-gray-500 transition-colors">
              <X size={14} />
            </button>
          )}
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 ml-1">
            <X size={16} />
          </button>
        </div>

        {/* Results */}
        <div ref={listRef} className="max-h-[60vh] overflow-y-auto py-1">
          {grouped.flatList.length === 0 && (
            <div className="px-5 py-10 text-center">
              <p className="text-sm text-gray-400">No results for &ldquo;{query}&rdquo;</p>
              <p className="text-[11px] text-gray-300 mt-1">Try searching for a brand, category, venue, or company</p>
            </div>
          )}

          {TYPE_ORDER.map(type => {
            const items = grouped.groups[type]
            if (!items) return null
            const cfg = TYPE_CONFIG[type]

            return (
              <div key={type}>
                {/* Section header */}
                <div className="px-5 pt-3 pb-1.5">
                  <span className="text-[10px] font-semibold uppercase tracking-widest text-gray-400">{cfg.label}</span>
                </div>
                {items.map((item) => {
                  const idx = flatIndex++
                  const isActive = idx === activeIndex
                  const Icon = item.icon || cfg.icon
                  return (
                    <button
                      key={`${type}-${item.label}-${idx}`}
                      data-active={isActive}
                      onClick={() => handleSelect(item)}
                      onMouseEnter={() => setActiveIndex(idx)}
                      className={`flex items-center gap-3 w-full px-5 py-2.5 transition-colors text-left ${isActive ? 'bg-gray-50' : 'hover:bg-gray-50/60'}`}
                    >
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${isActive ? 'bg-navy/5' : 'bg-gray-50'}`}>
                        <Icon size={15} className={isActive ? 'text-navy' : cfg.color} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className={`text-sm font-medium truncate ${isActive ? 'text-navy' : 'text-gray-900'}`}>{item.label}</div>
                        {item.sub && (
                          <div className="text-[11px] text-gray-400 truncate">{item.sub}</div>
                        )}
                        {!item.sub && (
                          <div className="text-[11px] text-gray-400 capitalize">{type}</div>
                        )}
                      </div>
                      <ArrowRight size={13} className={`shrink-0 transition-colors ${isActive ? 'text-navy/40' : 'text-gray-200'}`} />
                    </button>
                  )
                })}
              </div>
            )
          })}
        </div>

        {/* Footer */}
        <div className="px-5 py-2.5 border-t border-gray-100 flex items-center justify-between bg-gray-50/40">
          <div className="flex items-center gap-3">
            <span className="text-[11px] text-gray-400">
              <kbd className="px-1 py-0.5 bg-white border border-gray-200 rounded text-[10px] font-mono shadow-sm">{'\u2191'}</kbd>
              <kbd className="px-1 py-0.5 bg-white border border-gray-200 rounded text-[10px] font-mono shadow-sm ml-0.5">{'\u2193'}</kbd>
              <span className="ml-1">navigate</span>
            </span>
            <span className="text-[11px] text-gray-400">
              <kbd className="px-1.5 py-0.5 bg-white border border-gray-200 rounded text-[10px] font-mono shadow-sm">{'\u21B5'}</kbd>
              <span className="ml-1">select</span>
            </span>
          </div>
          <span className="text-[11px] text-gray-400">
            <kbd className="px-1.5 py-0.5 bg-white border border-gray-200 rounded text-[10px] font-mono shadow-sm">ESC</kbd>
            <span className="ml-1">close</span>
          </span>
        </div>
      </div>
    </div>
  )
}
