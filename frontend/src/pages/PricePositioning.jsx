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
  { id: 'uk', label: 'UK', currency: '\u00a3' },
  { id: 'us', label: 'US', currency: '$' },
  { id: 'eu', label: 'EU', currency: '\u20ac' },
]

// Price tiers with competitor benchmarks per category (UK prices)
const PRICE_BENCHMARKS = {
  tequila: {
    tiers: [
      { name: 'Value', min: 15, max: 22, brands: ['Olmeca Blanco (\u00a318)', 'Jose Cuervo (\u00a320)'] },
      { name: 'Premium', min: 25, max: 38, brands: ['Altos Plata (\u00a326)', '1800 Silver (\u00a328)', 'Casamigos (\u00a338)'] },
      { name: 'Super-Premium', min: 40, max: 65, brands: ['Patr\u00f3n Silver (\u00a345)', 'Don Julio Blanco (\u00a342)', 'Clase Azul Plata (\u00a360)'] },
      { name: 'Ultra-Premium', min: 70, max: 200, brands: ['Don Julio 1942 (\u00a3125)', 'Patr\u00f3n Gran Piedra (\u00a3160)', 'Clase Azul A\u00f1ejo (\u00a3180)'] },
    ],
    avgOnTrade: 9.50,
    insight: 'Super-premium tequila is the fastest-growing tier. Entry below \u00a325 faces fierce competition from established value brands.',
  },
  vodka: {
    tiers: [
      { name: 'Value', min: 12, max: 18, brands: ['Smirnoff (\u00a315)', 'Russian Standard (\u00a316)'] },
      { name: 'Premium', min: 20, max: 30, brands: ['Absolut (\u00a320)', 'Stolichnaya (\u00a322)', 'Tito\u2019s (\u00a325)'] },
      { name: 'Super-Premium', min: 32, max: 50, brands: ['Grey Goose (\u00a335)', 'Belvedere (\u00a332)', 'Ciroc (\u00a330)'] },
      { name: 'Ultra-Premium', min: 55, max: 150, brands: ['Crystal Head (\u00a355)', 'Beluga Noble (\u00a345)', 'Royal Dragon (\u00a3120)'] },
    ],
    avgOnTrade: 7.50,
    insight: 'Vodka differentiation comes from packaging and brand story, not liquid. Premium positioning requires exceptional design.',
  },
  gin: {
    tiers: [
      { name: 'Value', min: 12, max: 20, brands: ['Gordon\u2019s (\u00a314)', 'Beefeater (\u00a318)'] },
      { name: 'Premium', min: 22, max: 32, brands: ['Tanqueray (\u00a322)', 'Bombay Sapphire (\u00a320)', 'Sipsmith (\u00a328)'] },
      { name: 'Super-Premium', min: 32, max: 50, brands: ['Hendrick\u2019s (\u00a330)', 'Monkey 47 (\u00a338)', 'KI NO BI (\u00a342)'] },
      { name: 'Ultra-Premium', min: 55, max: 120, brands: ['The Botanist Islay (\u00a335)', 'Gin Mare Capri (\u00a340)', 'Cambridge Distillery (\u00a380)'] },
    ],
    avgOnTrade: 8.00,
    insight: '900+ brands in UK market. New entrants must position at \u00a328+ to be taken seriously in premium on-trade.',
  },
  whisky: {
    tiers: [
      { name: 'Value', min: 18, max: 25, brands: ['Famous Grouse (\u00a320)', 'Bell\u2019s (\u00a318)', 'Grant\u2019s (\u00a319)'] },
      { name: 'Premium', min: 25, max: 40, brands: ['Johnnie Walker Black (\u00a330)', 'Jameson (\u00a325)', 'Monkey Shoulder (\u00a328)'] },
      { name: 'Super-Premium', min: 42, max: 80, brands: ['Glenfiddich 12 (\u00a335)', 'Macallan 12 (\u00a348)', 'Oban 14 (\u00a350)'] },
      { name: 'Ultra-Premium', min: 85, max: 500, brands: ['Macallan 18 (\u00a3180)', 'JW Blue (\u00a3160)', 'Glenfiddich 21 (\u00a3140)'] },
    ],
    avgOnTrade: 9.00,
    insight: 'Age statements still command premiums but NAS (No Age Statement) is growing. Scotch, Irish, Japanese, and American segments have different dynamics.',
  },
  rum: {
    tiers: [
      { name: 'Value', min: 14, max: 20, brands: ['Bacardi Carta Blanca (\u00a316)', 'Captain Morgan (\u00a316)'] },
      { name: 'Premium', min: 22, max: 35, brands: ['Havana Club 7 (\u00a325)', 'Kraken (\u00a325)', 'Plantation 5 (\u00a328)'] },
      { name: 'Super-Premium', min: 35, max: 60, brands: ['Diplomatico Reserva (\u00a338)', 'Appleton Estate 12 (\u00a335)', 'Foursquare (\u00a345)'] },
      { name: 'Ultra-Premium', min: 65, max: 200, brands: ['Ron Zacapa XO (\u00a380)', 'Diplomatico SFE (\u00a370)', 'Appleton 21 (\u00a3100)'] },
    ],
    avgOnTrade: 8.00,
    insight: 'Premium aged rum is the growth engine. Spiced dominates volume but premium dark/aged drives value growth and margin.',
  },
  cognac: {
    tiers: [
      { name: 'VS', min: 25, max: 35, brands: ['Hennessy VS (\u00a332)', 'R\u00e9my Martin VSOP (\u00a338)', 'Courvoisier VS (\u00a325)'] },
      { name: 'VSOP', min: 35, max: 55, brands: ['Hennessy VSOP (\u00a348)', 'R\u00e9my Martin VSOP (\u00a340)', 'Martell VSOP (\u00a335)'] },
      { name: 'XO', min: 90, max: 180, brands: ['Hennessy XO (\u00a3150)', 'R\u00e9my Martin XO (\u00a3140)', 'Courvoisier XO (\u00a390)'] },
      { name: 'Prestige', min: 200, max: 1000, brands: ['Hennessy Paradis (\u00a3500)', 'R\u00e9my Martin Louis XIII (\u00a32,500)', 'Martell L\u2019Or (\u00a3300)'] },
    ],
    avgOnTrade: 12.00,
    insight: 'Big four houses dominate 85%+ of market. Estate/grower cognacs gaining interest from cocktail bartenders.',
  },
  champagne: {
    tiers: [
      { name: 'Value', min: 20, max: 30, brands: ['Nicolas Feuillatte (\u00a322)', 'Piper-Heidsieck (\u00a328)'] },
      { name: 'Premium', min: 30, max: 50, brands: ['Mo\u00ebt Imp\u00e9rial (\u00a335)', 'Veuve Clicquot (\u00a340)', 'Laurent-Perrier (\u00a335)'] },
      { name: 'Prestige Cuv\u00e9e', min: 55, max: 150, brands: ['Dom P\u00e9rignon (\u00a3150)', 'Krug Grande Cuv\u00e9e (\u00a3140)', 'Bollinger (\u00a340)'] },
      { name: 'Ultra-Prestige', min: 150, max: 500, brands: ['Cristal (\u00a3200)', 'Salon (\u00a3400)', 'Krug Clos du Mesnil (\u00a3500)'] },
    ],
    avgOnTrade: 14.00,
    insight: 'Grower Champagnes (RM) trending in top bars and restaurants. Gift occasions drive 40% of sales.',
  },
  wine: {
    tiers: [
      { name: 'Value', min: 5, max: 8, brands: ['Blossom Hill (\u00a35.50)', 'Hardy\u2019s (\u00a36)', 'Echo Falls (\u00a35.50)'] },
      { name: 'Premium', min: 8, max: 15, brands: ['Casillero del Diablo (\u00a38)', 'Meiomi (\u00a315)', 'Kim Crawford (\u00a312)'] },
      { name: 'Super-Premium', min: 15, max: 30, brands: ['Cloudy Bay (\u00a320)', 'Chablis Premier Cru (\u00a325)', 'Nyetimber (\u00a328)'] },
      { name: 'Fine Wine', min: 30, max: 200, brands: ['Opus One (\u00a3200)', 'Dom P\u00e9rignon Ros\u00e9 (\u00a3300)', 'Ch\u00e2teau Margaux (\u00a3400+)'] },
    ],
    avgOnTrade: 9.00,
    insight: 'UK duty increase (Aug 2023) hit wine hard. English sparkling is the standout growth story at 30% CAGR.',
  },
  beer: {
    tiers: [
      { name: 'Value', min: 1, max: 2, brands: ['Carling (\u00a31.20)', 'Foster\u2019s (\u00a31.30)'] },
      { name: 'Premium', min: 2, max: 3.5, brands: ['Peroni (\u00a32.20)', 'Heineken (\u00a32.00)', 'Estrella Damm (\u00a32.50)'] },
      { name: 'Craft', min: 3, max: 6, brands: ['BrewDog Punk IPA (\u00a32.50)', 'Camden Hells (\u00a32.80)', 'Beavertown Neck Oil (\u00a33.50)'] },
      { name: 'Premium Craft', min: 5, max: 15, brands: ['Cloudwater (\u00a35.50)', 'Deya (\u00a35.00)', 'Verdant (\u00a34.50)'] },
    ],
    avgOnTrade: 6.00,
    insight: 'World lager is the dominant trend. Craft consolidation continues. No/lo beer is fastest-growing sub-segment.',
  },
  nolo: {
    tiers: [
      { name: 'Value', min: 2, max: 5, brands: ['Heineken 0.0 (\u00a31.20)', 'Beck\u2019s Blue (\u00a31.00)'] },
      { name: 'Premium', min: 5, max: 15, brands: ['Seedlip (\u00a322)', 'Lucky Saint (\u00a32.50)', 'Lyre\u2019s (\u00a318)'] },
      { name: 'Super-Premium', min: 15, max: 30, brands: ['Three Spirit (\u00a325)', 'Monday Gin (\u00a318)', 'Caleno (\u00a315)'] },
      { name: 'Ultra-Premium', min: 25, max: 50, brands: ['Aecorn Aperitifs (\u00a315)', 'Everleaf (\u00a320)'] },
    ],
    avgOnTrade: 6.50,
    insight: 'Zero duty = margin advantage. 75% purchases are first-time. Invest in sampling. Category grew 31% in 2025.',
  },
  rtd: {
    tiers: [
      { name: 'Value', min: 1.5, max: 2.5, brands: ['Smirnoff Ice (\u00a31.80)', 'WKD (\u00a31.50)'] },
      { name: 'Premium', min: 2.5, max: 4, brands: ['White Claw (\u00a32.50)', 'Gordon\u2019s G&T (\u00a32.20)', 'JD & Cola (\u00a32.50)'] },
      { name: 'Super-Premium', min: 4, max: 6, brands: ['NIO Cocktails (\u00a35)', 'Moth (\u00a34.50)', 'Served (\u00a34)'] },
      { name: 'Ultra-Premium', min: 6, max: 12, brands: ['On The Rocks (\u00a36)', 'Tip Top (\u00a37)'] },
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

  return (
    <div className="max-w-7xl mx-auto">
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
                  ({selectedMarket?.currency}{tier.min}\u2013{selectedMarket?.currency}{tier.max})
                </p>
              </div>
            </div>

            {tier.position === 'below' && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg flex gap-2 mb-4">
                <AlertTriangle size={14} className="text-red-600 mt-0.5 flex-shrink-0" />
                <span className="text-red-800 text-xs">Your price is below the lowest tier. You may face perception issues \u2014 consumers often associate very low prices with poor quality in premium spirits categories.</span>
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
            <h3 className="text-sm font-bold text-navy mb-4">Price Tier Map \u2014 {CATEGORIES.find(c => c.id === category)?.label}</h3>
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
                      <span className="text-xs text-gray-400">{selectedMarket?.currency}{t.min}\u2013{selectedMarket?.currency}{t.max}</span>
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
                  At {selectedMarket?.currency}{numPrice.toFixed(2)} RRP, your on-trade price should be approximately {selectedMarket?.currency}{(numPrice * 0.3).toFixed(2)}\u2013{selectedMarket?.currency}{(numPrice * 0.4).toFixed(2)} per serve to maintain standard margins.
                </span>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg flex gap-2">
                <Target size={14} className="text-navy mt-0.5 flex-shrink-0" />
                <span className="text-sm text-gray-700">
                  Off-trade margin at this price: approximately {selectedMarket?.currency}{(numPrice * 0.35).toFixed(2)}\u2013{selectedMarket?.currency}{(numPrice * 0.45).toFixed(2)} per unit (35\u201345% gross margin after duty and distribution).
                </span>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Always show full benchmark table */}
      <Card className="p-6">
        <h3 className="text-sm font-bold text-navy mb-4">Full Price Benchmarks \u2014 {CATEGORIES.find(c => c.id === category)?.label}</h3>
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
                  <td className="py-2 text-gray-600">{selectedMarket?.currency}{t.min}\u2013{selectedMarket?.currency}{t.max}</td>
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
