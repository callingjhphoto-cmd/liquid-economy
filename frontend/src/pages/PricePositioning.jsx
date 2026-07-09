import React, { useState, useMemo } from 'react'
import {
  DollarSign, Target, TrendingUp, AlertTriangle, Zap
} from 'lucide-react'
import {
  Card, PageHeader, SubPageNav, Badge, DataFreshness
} from '../components/ui'

const CATEGORIES = [
  { id: 'tequila', label: 'Tequila' },
  { id: 'vodka', label: 'Vodka' },
  { id: 'gin', label: 'Gin' },
  { id: 'whisky', label: 'Whisky' },
  { id: 'rum', label: 'Rum' },
  { id: 'cognac', label: 'Cognac' },
  { id: 'champagne', label: 'Champagne' },
  { id: 'wine', label: 'Wine' },
  { id: 'beer', label: 'Beer' },
  { id: 'nolo', label: 'No/Lo' },
  { id: 'rtd', label: 'RTD' },
]

const MARKETS = [
  { id: 'uk', label: 'UK', currency: '£' },
  { id: 'us', label: 'US', currency: '$' },
  { id: 'eu', label: 'EU', currency: '€' },
]

// Price tiers with competitor benchmarks per category (UK prices)
const PRICE_BENCHMARKS = {
  tequila: {
    tiers: [
      { name: 'Value', min: 15, max: 22, brands: ['Olmeca Blanco (£18)', 'Jose Cuervo (£20)'] },
      { name: 'Premium', min: 25, max: 38, brands: ['Altos Plata (£26)', '1800 Silver (£28)', 'Casamigos (£38)'] },
      { name: 'Super-Premium', min: 40, max: 65, brands: ['Patrón Silver (£45)', 'Don Julio Blanco (£42)', 'Clase Azul Plata (£60)'] },
      { name: 'Ultra-Premium', min: 70, max: 200, brands: ['Don Julio 1942 (£125)', 'Patrón Gran Piedra (£160)', 'Clase Azul Añejo (£180)'] },
    ],
    avgOnTrade: 9.50,
    insight: 'Super-premium tequila is the fastest-growing tier. Entry below £25 faces fierce competition from established value brands.',
  },
  vodka: {
    tiers: [
      { name: 'Value', min: 12, max: 18, brands: ['Smirnoff (£15)', 'Russian Standard (£16)'] },
      { name: 'Premium', min: 20, max: 30, brands: ['Absolut (£20)', 'Stolichnaya (£22)', 'Tito’s (£25)'] },
      { name: 'Super-Premium', min: 32, max: 50, brands: ['Grey Goose (£35)', 'Belvedere (£32)', 'Ciroc (£30)'] },
      { name: 'Ultra-Premium', min: 55, max: 150, brands: ['Crystal Head (£55)', 'Beluga Noble (£45)', 'Royal Dragon (£120)'] },
    ],
    avgOnTrade: 7.50,
    insight: 'Vodka differentiation comes from packaging and brand story, not liquid. Premium positioning requires exceptional design.',
  },
  gin: {
    tiers: [
      { name: 'Value', min: 12, max: 20, brands: ['Gordon’s (£14)', 'Beefeater (£18)'] },
      { name: 'Premium', min: 22, max: 32, brands: ['Tanqueray (£22)', 'Bombay Sapphire (£20)', 'Sipsmith (£28)'] },
      { name: 'Super-Premium', min: 32, max: 50, brands: ['Hendrick’s (£30)', 'Monkey 47 (£38)', 'KI NO BI (£42)'] },
      { name: 'Ultra-Premium', min: 55, max: 120, brands: ['The Botanist Islay (£35)', 'Gin Mare Capri (£40)', 'Cambridge Distillery (£80)'] },
    ],
    avgOnTrade: 8.00,
    insight: '900+ brands in UK market. New entrants must position at £28+ to be taken seriously in premium on-trade.',
  },
  whisky: {
    tiers: [
      { name: 'Value', min: 18, max: 25, brands: ['Famous Grouse (£20)', 'Bell’s (£18)', 'Grant’s (£19)'] },
      { name: 'Premium', min: 25, max: 40, brands: ['Johnnie Walker Black (£30)', 'Jameson (£25)', 'Monkey Shoulder (£28)'] },
      { name: 'Super-Premium', min: 42, max: 80, brands: ['Glenfiddich 12 (£35)', 'Macallan 12 (£48)', 'Oban 14 (£50)'] },
      { name: 'Ultra-Premium', min: 85, max: 500, brands: ['Macallan 18 (£180)', 'JW Blue (£160)', 'Glenfiddich 21 (£140)'] },
    ],
    avgOnTrade: 9.00,
    insight: 'Age statements still command premiums but NAS (No Age Statement) is growing. Scotch, Irish, Japanese, and American segments have different dynamics.',
  },
  rum: {
    tiers: [
      { name: 'Value', min: 14, max: 20, brands: ['Bacardi Carta Blanca (£16)', 'Captain Morgan (£16)'] },
      { name: 'Premium', min: 22, max: 35, brands: ['Havana Club 7 (£25)', 'Kraken (£25)', 'Plantation 5 (£28)'] },
      { name: 'Super-Premium', min: 35, max: 60, brands: ['Diplomatico Reserva (£38)', 'Appleton Estate 12 (£35)', 'Foursquare (£45)'] },
      { name: 'Ultra-Premium', min: 65, max: 200, brands: ['Ron Zacapa XO (£80)', 'Diplomatico SFE (£70)', 'Appleton 21 (£100)'] },
    ],
    avgOnTrade: 8.00,
    insight: 'Premium aged rum is the growth engine. Spiced dominates volume but premium dark/aged drives value growth and margin.',
  },
  cognac: {
    tiers: [
      { name: 'VS', min: 25, max: 35, brands: ['Hennessy VS (£32)', 'Rémy Martin VSOP (£38)', 'Courvoisier VS (£25)'] },
      { name: 'VSOP', min: 35, max: 55, brands: ['Hennessy VSOP (£48)', 'Rémy Martin VSOP (£40)', 'Martell VSOP (£35)'] },
      { name: 'XO', min: 90, max: 180, brands: ['Hennessy XO (£150)', 'Rémy Martin XO (£140)', 'Courvoisier XO (£90)'] },
      { name: 'Prestige', min: 200, max: 1000, brands: ['Hennessy Paradis (£500)', 'Rémy Martin Louis XIII (£2,500)', 'Martell L’Or (£300)'] },
    ],
    avgOnTrade: 12.00,
    insight: 'Big four houses dominate 85%+ of market. Estate/grower cognacs gaining interest from cocktail bartenders.',
  },
  champagne: {
    tiers: [
      { name: 'Value', min: 20, max: 30, brands: ['Nicolas Feuillatte (£22)', 'Piper-Heidsieck (£28)'] },
      { name: 'Premium', min: 30, max: 50, brands: ['Moët Impérial (£35)', 'Veuve Clicquot (£40)', 'Laurent-Perrier (£35)'] },
      { name: 'Prestige Cuvée', min: 55, max: 150, brands: ['Dom Pérignon (£150)', 'Krug Grande Cuvée (£140)', 'Bollinger (£40)'] },
      { name: 'Ultra-Prestige', min: 150, max: 500, brands: ['Cristal (£200)', 'Salon (£400)', 'Krug Clos du Mesnil (£500)'] },
    ],
    avgOnTrade: 14.00,
    insight: 'Grower Champagnes (RM) trending in top bars and restaurants. Gift occasions drive 40% of sales.',
  },
  wine: {
    tiers: [
      { name: 'Value', min: 5, max: 8, brands: ['Blossom Hill (£5.50)', 'Hardy’s (£6)', 'Echo Falls (£5.50)'] },
      { name: 'Premium', min: 8, max: 15, brands: ['Casillero del Diablo (£8)', 'Meiomi (£15)', 'Kim Crawford (£12)'] },
      { name: 'Super-Premium', min: 15, max: 30, brands: ['Cloudy Bay (£20)', 'Chablis Premier Cru (£25)', 'Nyetimber (£28)'] },
      { name: 'Fine Wine', min: 30, max: 200, brands: ['Opus One (£200)', 'Dom Pérignon Rosé (£300)', 'Château Margaux (£400+)'] },
    ],
    avgOnTrade: 9.00,
    insight: 'UK duty increase (Aug 2023) hit wine hard. English sparkling is the standout growth story at 30% CAGR.',
  },
  beer: {
    tiers: [
      { name: 'Value', min: 1, max: 2, brands: ['Carling (£1.20)', 'Foster’s (£1.30)'] },
      { name: 'Premium', min: 2, max: 3.5, brands: ['Peroni (£2.20)', 'Heineken (£2.00)', 'Estrella Damm (£2.50)'] },
      { name: 'Craft', min: 3, max: 6, brands: ['BrewDog Punk IPA (£2.50)', 'Camden Hells (£2.80)', 'Beavertown Neck Oil (£3.50)'] },
      { name: 'Premium Craft', min: 5, max: 15, brands: ['Cloudwater (£5.50)', 'Deya (£5.00)', 'Verdant (£4.50)'] },
    ],
    avgOnTrade: 6.00,
    insight: 'World lager is the dominant trend. Craft consolidation continues. No/lo beer is fastest-growing sub-segment.',
  },
  nolo: {
    tiers: [
      { name: 'Value', min: 2, max: 5, brands: ['Heineken 0.0 (£1.20)', 'Beck’s Blue (£1.00)'] },
      { name: 'Premium', min: 5, max: 15, brands: ['Seedlip (£22)', 'Lucky Saint (£2.50)', 'Lyre’s (£18)'] },
      { name: 'Super-Premium', min: 15, max: 30, brands: ['Three Spirit (£25)', 'Monday Gin (£18)', 'Caleno (£15)'] },
      { name: 'Ultra-Premium', min: 25, max: 50, brands: ['Aecorn Aperitifs (£15)', 'Everleaf (£20)'] },
    ],
    avgOnTrade: 6.50,
    insight: 'Zero duty = margin advantage. 75% purchases are first-time. Invest in sampling. Category grew 31% in 2025.',
  },
  rtd: {
    tiers: [
      { name: 'Value', min: 1.5, max: 2.5, brands: ['Smirnoff Ice (£1.80)', 'WKD (£1.50)'] },
      { name: 'Premium', min: 2.5, max: 4, brands: ['White Claw (£2.50)', 'Gordon’s G&T (£2.20)', 'JD & Cola (£2.50)'] },
      { name: 'Super-Premium', min: 4, max: 6, brands: ['NIO Cocktails (£5)', 'Moth (£4.50)', 'Served (£4)'] },
      { name: 'Ultra-Premium', min: 6, max: 12, brands: ['On The Rocks (£6)', 'Tip Top (£7)'] },
    ],
    avgOnTrade: 8.00,
    insight: 'Spirits-based RTDs outpacing hard seltzers. Premium cocktail cans trending. Can format preferred over glass.',
  },
}

function getTierForPrice(category, price) {
  const benchmarks = PRICE_BENCHMARKS[category]
  if (!benchmarks) return null
  for (const tier of benchmarks.tiers) {
    if (price >= tier.min && price <= tier.max) return tier
  }
  if (price < benchmarks.tiers[0].min) return { ...benchmarks.tiers[0], position: 'below' }
  return { ...benchmarks.tiers[benchmarks.tiers.length - 1], position: 'above' }
}

export default function PricePositioning() {
  const [category, setCategory] = useState('gin')
  const [market, setMarket] = useState('uk')
  const [price, setPrice] = useState('')

  const benchmarks = PRICE_BENCHMARKS[category]
  const selectedMarket = MARKETS.find(m => m.id === market)
  const numPrice = parseFloat(price)
  const tier = !isNaN(numPrice) && numPrice > 0 ? getTierForPrice(category, numPrice) : null

  const chartData = benchmarks?.tiers.map(t => ({
    name: t.name,
    min: t.min,
    max: t.max,
    range: t.max - t.min,
  })) || []

  // Liquid Intelligence signals (category-level, always visible)
  const catLabel = CATEGORIES.find(c => c.id === category)?.label || category
  const lowestTier = benchmarks?.tiers[0]
  const highestTier = benchmarks?.tiers[benchmarks.tiers.length - 1]
  const tierCount = benchmarks?.tiers.length || 0
  const avgOnTrade = benchmarks?.avgOnTrade || 0
  const curr = selectedMarket?.currency || '£'

  const liSig1 = tierCount >= 4
    ? { dot: 'bg-amber-500', color: 'text-amber-600', label: 'Complex Pricing Landscape', copy: `${catLabel} has ${tierCount} price tiers spanning ${curr}${lowestTier?.min}–${curr}${highestTier?.max}. Each tier has established incumbents — strong brand story and distinctive packaging are essential to carve a position.` }
    : tierCount === 3
    ? { dot: 'bg-blue-500', color: 'text-blue-600', label: 'Structured Market Tiers', copy: `${catLabel} has ${tierCount} clear price tiers from ${curr}${lowestTier?.min} to ${curr}${highestTier?.max}. Entry above ${curr}${lowestTier?.max} signals premium intent and unlocks on-trade placement opportunities.` }
    : { dot: 'bg-blue-500', color: 'text-blue-600', label: 'Defined Price Architecture', copy: `${catLabel} operates in ${tierCount} tier bands from ${curr}${lowestTier?.min} to ${curr}${highestTier?.max}. Pricing at or above the mid-tier floor is the minimum threshold for serious on-premise listings.` }

  const liSig2 = avgOnTrade >= 12
    ? { dot: 'bg-emerald-500', color: 'text-emerald-600', label: 'Premium On-Trade Economics', copy: `Average on-trade pour price for ${catLabel} is ${curr}${avgOnTrade.toFixed(2)}. Category economics reward premium positioning with above-average serve margins and stronger venue listing priority.` }
    : avgOnTrade >= 8
    ? { dot: 'bg-blue-500', color: 'text-blue-600', label: 'Standard On-Trade Economics', copy: `Average ${catLabel} on-trade pour is ${curr}${avgOnTrade.toFixed(2)}. Standard margins apply — premium brands can negotiate better placement by demonstrating category growth credentials and consumer demand.` }
    : { dot: 'bg-amber-500', color: 'text-amber-600', label: 'Volume-Led On-Trade', copy: `Average ${catLabel} on-trade pour is ${curr}${avgOnTrade.toFixed(2)}. Category economics favour rate-of-sale over margin — robust distribution network and listed accounts are the primary value drivers.` }

  const liSig3 = { dot: 'bg-blue-500', color: 'text-blue-600', label: 'Category Signal', copy: benchmarks?.insight || `${catLabel} market intelligence unavailable.` }

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <SubPageNav group="intelligence" />
      <DataFreshness date="April 2026" source="IWSR, Euromonitor, Nielsen, Mintel" />
      <PageHeader
        title="Price Positioning Tool"
        subtitle="See where your product sits in the competitive landscape"
        icon={<DollarSign size={20} />}
      />

      {/* Input Section */}
      <Card className="p-6 mb-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold text-navy mb-1">Spirit Category</label>
            <select
              value={category}
              onChange={e => setCategory(e.target.value)}
              className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm"
            >
              {CATEGORIES.map(c => <option key={c.id} value={c.id}>{c.label}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold text-navy mb-1">Target Market</label>
            <select
              value={market}
              onChange={e => setMarket(e.target.value)}
              className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm"
            >
              {MARKETS.map(m => <option key={m.id} value={m.id}>{m.label}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold text-navy mb-1">Your RRP ({selectedMarket?.currency})</label>
            <input
              type="number"
              placeholder="e.g. 35"
              value={price}
              onChange={e => setPrice(e.target.value)}
              className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-gold/50 focus:border-gold"
            />
          </div>
        </div>
      </Card>

      {/* Liquid Intelligence Signals */}
      <div className="border border-gold/30 rounded-xl bg-gradient-to-r from-amber-50/60 to-white p-4">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-7 h-7 rounded-lg bg-gold/10 flex items-center justify-center">
            <Zap size={14} className="text-gold" />
          </div>
          <span className="text-xs font-bold text-gold uppercase tracking-wider">Liquid Intelligence</span>
          <span className="text-xs text-gray-400 ml-auto">Pricing Signals {'·'} {catLabel}</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {[liSig1, liSig2, liSig3].map((sig, i) => (
            <div key={i} className="bg-white/70 rounded-lg p-3 border border-gold/10">
              <div className="flex items-center gap-1.5 mb-1.5">
                <div className={`w-2 h-2 rounded-full flex-shrink-0 ${sig.dot}`} />
                <span className={`text-xs font-bold uppercase tracking-wide ${sig.color}`}>{sig.label}</span>
              </div>
              <p className="text-xs text-gray-600 leading-relaxed">{sig.copy}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Results */}
      {tier && (
        <div className="space-y-4 mb-6">
          {/* Position card */}
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-navy/5 rounded-xl flex items-center justify-center">
                <Target size={24} className="text-navy" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-navy">
                  {tier.position === 'below' ? 'Below ' : tier.position === 'above' ? 'Above ' : ''}{tier.name} Tier
                </h3>
                <p className="text-sm text-gray-500">
                  {selectedMarket?.currency}{numPrice.toFixed(2)} positions you in the {tier.name.toLowerCase()} segment
                  ({selectedMarket?.currency}{tier.min}–{selectedMarket?.currency}{tier.max})
                </p>
              </div>
            </div>

            {tier.position === 'below' && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg flex gap-2 mb-4">
                <AlertTriangle size={14} className="text-red-600 mt-0.5 flex-shrink-0" />
                <span className="text-red-800 text-xs">Your price is below the lowest tier. You may face perception issues {'—'} consumers often associate very low prices with poor quality in premium spirits categories.</span>
              </div>
            )}

            {/* Direct competitors at this price */}
            <div className="mt-4">
              <div className="text-xs font-semibold text-navy uppercase tracking-wider mb-2">Direct Competitors at This Price</div>
              <div className="flex flex-wrap gap-2">
                {tier.brands.map((b, i) => <Badge key={i}>{b}</Badge>)}
              </div>
            </div>
          </Card>

          {/* All tiers visual */}
          <Card className="p-6">
            <h3 className="text-sm font-bold text-navy mb-4">Price Tier Map {'—'} {CATEGORIES.find(c => c.id === category)?.label}</h3>
            <div className="space-y-3">
              {benchmarks.tiers.map((t, i) => {
                const isActive = t.name === tier.name && !tier.position
                const maxWidth = benchmarks.tiers[benchmarks.tiers.length - 1].max
                const leftPct = (t.min / maxWidth) * 100
                const widthPct = ((t.max - t.min) / maxWidth) * 100
                const pricePct = (numPrice / maxWidth) * 100

                return (
                  <div key={i}>
                    <div className="flex items-center justify-between mb-1">
                      <span className={`text-xs font-medium ${isActive ? 'text-navy' : 'text-gray-500'}`}>{t.name}</span>
                      <span className="text-xs text-gray-400">{selectedMarket?.currency}{t.min}{'–'}{selectedMarket?.currency}{t.max}</span>
                    </div>
                    <div className="relative h-6 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className={`absolute h-full rounded-full ${isActive ? 'bg-navy' : 'bg-gray-300'}`}
                        style={{ left: `${leftPct}%`, width: `${widthPct}%` }}
                      />
                      {isActive && (
                        <div
                          className="absolute top-0 h-full w-0.5 bg-gold"
                          style={{ left: `${pricePct}%` }}
                        >
                          <div className="absolute -top-5 left-1/2 -translate-x-1/2 text-xs font-bold text-gold whitespace-nowrap">
                            {selectedMarket?.currency}{numPrice.toFixed(0)}
                          </div>
                        </div>
                      )}
                    </div>
                    {isActive && (
                      <div className="mt-1 flex flex-wrap gap-1">
                        {t.brands.map((b, j) => (
                          <span key={j} className="text-xs text-gray-500">{b}</span>
                        ))}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </Card>

          {/* Recommendations */}
          <Card className="p-6">
            <h3 className="text-sm font-bold text-navy mb-3">Positioning Recommendations</h3>
            <div className="space-y-2">
              <div className="p-3 bg-navy/5 rounded-lg flex gap-2">
                <Zap size={14} className="text-navy mt-0.5 flex-shrink-0" />
                <span className="text-sm text-gray-700">{benchmarks.insight}</span>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg flex gap-2">
                <TrendingUp size={14} className="text-navy mt-0.5 flex-shrink-0" />
                <span className="text-sm text-gray-700">
                  Average on-trade pour price: {selectedMarket?.currency}{benchmarks.avgOnTrade.toFixed(2)}.
                  At {selectedMarket?.currency}{numPrice.toFixed(2)} RRP, your on-trade price should be approximately {selectedMarket?.currency}{(numPrice * 0.3).toFixed(2)}–{selectedMarket?.currency}{(numPrice * 0.4).toFixed(2)} per serve to maintain standard margins.
                </span>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg flex gap-2">
                <Target size={14} className="text-navy mt-0.5 flex-shrink-0" />
                <span className="text-sm text-gray-700">
                  Off-trade margin at this price: approximately {selectedMarket?.currency}{(numPrice * 0.35).toFixed(2)}–{selectedMarket?.currency}{(numPrice * 0.45).toFixed(2)} per unit (35–45% gross margin after duty and distribution).
                </span>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Always show full benchmark table */}
      <Card className="p-6">
        <h3 className="text-sm font-bold text-navy mb-4">Full Price Benchmarks {'—'} {CATEGORIES.find(c => c.id === category)?.label}</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-2 text-xs font-semibold text-gray-500">Tier</th>
                <th className="text-left py-2 text-xs font-semibold text-gray-500">Price Range</th>
                <th className="text-left py-2 text-xs font-semibold text-gray-500">Key Brands</th>
              </tr>
            </thead>
            <tbody>
              {benchmarks?.tiers.map((t, i) => (
                <tr key={i} className={`border-b border-gray-100 ${tier && t.name === tier.name && !tier.position ? 'bg-navy/5' : ''}`}>
                  <td className="py-2 font-medium text-navy">{t.name}</td>
                  <td className="py-2 text-gray-600">{selectedMarket?.currency}{t.min}{'–'}{selectedMarket?.currency}{t.max}</td>
                  <td className="py-2 text-gray-600">{t.brands.join(', ')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}
