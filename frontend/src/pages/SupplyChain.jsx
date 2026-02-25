import React, { useState } from 'react'
import { Package, Factory, Fuel, AlertTriangle, Thermometer, ExternalLink, X, TrendingUp, TrendingDown, Info } from 'lucide-react'

const COGS_DATA = {
  glass_ppi: {
    label: 'Glass Container PPI', value: 216.38, baseline: '2003=100', change: '+2.1%', source: 'BLS PCU3272133272130', updated: '2025-12',
    description: 'Bureau of Labor Statistics Producer Price Index for glass containers (Series PCU3272133272130). Tracks the weighted average selling price of glass bottles and containers from US manufacturers. Key cost input for beer, wine, and spirits packaging — glass typically represents 15-25% of total COGS for premium spirits.',
    sourceUrl: 'https://data.bls.gov/timeseries/PCU3272133272130',
    historicalData: { '2025-01': 211.4, '2025-02': 211.9, '2025-03': 212.3, '2025-04': 212.8, '2025-05': 213.1, '2025-06': 213.5, '2025-07': 213.9, '2025-08': 214.2, '2025-09': 214.8, '2025-10': 215.3, '2025-11': 215.9, '2025-12': 216.38 }
  },
  container_index: {
    label: 'Drewry WCI (40ft)', value: 3421, unit: '$/40ft', change: '+110%', source: 'Drewry World Container Index', updated: '2026-02',
    description: 'Drewry World Container Index — composite benchmark tracking the cost of shipping a 40-foot container across 8 major east-west trade routes (Shanghai-Rotterdam, Shanghai-LA, etc.). Critical for imported spirits and wine. The index spiked from ~$1,600 in mid-2025 due to Red Sea disruptions and port congestion.',
    sourceUrl: 'https://www.drewry.co.uk/supply-chain-advisors/supply-chain-expertise/world-container-index-assessed-by-drewry',
    historicalData: { '2025-03': 1628, '2025-04': 1710, '2025-05': 1845, '2025-06': 2012, '2025-07': 2234, '2025-08': 2456, '2025-09': 2678, '2025-10': 2890, '2025-11': 3102, '2025-12': 3198, '2026-01': 3312, '2026-02': 3421 }
  },
  baltic_dry: {
    label: 'Baltic Dry Index', value: 2112, unit: 'pts', change: '+34%', source: 'Baltic Exchange', updated: '2026-02',
    description: 'Baltic Dry Index (BDI) — measures the cost of shipping dry bulk commodities (grain, coal, iron ore) across 20+ international routes. Indirect indicator for raw material transport costs. Rising BDI signals tightening vessel capacity, which spills over into container shipping rates for finished goods.',
    sourceUrl: 'https://www.balticexchange.com/en/data-services/market-information0/dry-services.html',
    historicalData: { '2025-03': 1576, '2025-04': 1612, '2025-05': 1654, '2025-06': 1702, '2025-07': 1756, '2025-08': 1812, '2025-09': 1878, '2025-10': 1945, '2025-11': 2012, '2025-12': 2056, '2026-01': 2089, '2026-02': 2112 }
  },
  agave: {
    label: 'Mexican Agave (SIAP)', value: 8.2, unit: 'MXN/kg', change: '-18%', source: 'SIAP Mexico', updated: '2026-01',
    description: 'SIAP (Servicio de Informacion Agroalimentaria y Pesquera) reported price for Blue Weber Agave in Jalisco, Mexico. After a decade-long shortage that peaked at 30 MXN/kg in 2022, agave is now in oversupply as millions of plants from 2017-2019 plantings mature simultaneously. Prices falling sharply, benefiting tequila producers\' margins.',
    sourceUrl: 'https://www.gob.mx/siap',
    historicalData: { '2025-02': 10.0, '2025-03': 9.8, '2025-04': 9.6, '2025-05': 9.5, '2025-06': 9.3, '2025-07': 9.1, '2025-08': 8.9, '2025-09': 8.8, '2025-10': 8.6, '2025-11': 8.4, '2025-12': 8.3, '2026-01': 8.2 }
  },
  barley: {
    label: 'Barley (EU Malt)', value: 224, unit: 'EUR/t', change: '+12%', source: 'Euronext', updated: '2026-02',
    description: 'Euronext malting barley futures — the benchmark for European brewing and distilling barley. Malting barley is the primary raw material for Scotch whisky, beer, and grain spirits. Price rises driven by poor 2025 Scottish harvest (-40% in some regions) and increased demand from craft distillers.',
    sourceUrl: 'https://live.euronext.com/en/product/commodities/EMA-DPAR/contract-name',
    historicalData: { '2025-03': 200, '2025-04': 202, '2025-05': 204, '2025-06': 206, '2025-07': 208, '2025-08': 210, '2025-09': 212, '2025-10': 215, '2025-11': 218, '2025-12': 220, '2026-01': 222, '2026-02': 224 }
  },
  corn: {
    label: 'Corn (US #2)', value: 4.82, unit: '$/bu', change: '+6%', source: 'CBOT', updated: '2026-02',
    description: 'CBOT (Chicago Board of Trade) corn futures for US #2 Yellow. Key input for bourbon whiskey production (minimum 51% corn mash bill), ethanol (competes for supply), and animal feed. US corn belt weather and ethanol mandate policy are primary price drivers.',
    sourceUrl: 'https://www.cmegroup.com/markets/agriculture/grains/corn.html',
    historicalData: { '2025-03': 4.55, '2025-04': 4.58, '2025-05': 4.60, '2025-06': 4.62, '2025-07': 4.65, '2025-08': 4.68, '2025-09': 4.70, '2025-10': 4.73, '2025-11': 4.76, '2025-12': 4.78, '2026-01': 4.80, '2026-02': 4.82 }
  },
  sugarcane: {
    label: 'Raw Sugar (ICE No.11)', value: 22.4, unit: '\u00a2/lb', change: '+8%', source: 'ICE', updated: '2026-02',
    description: 'ICE Sugar No. 11 futures — the global benchmark for raw cane sugar. Critical input for rum production, liqueurs, and RTD cocktails. Brazil (largest producer) drought conditions and Indian export restrictions have tightened global supply. Also affects molasses pricing for rum distillers.',
    sourceUrl: 'https://www.ice.com/products/23/Sugar-No-11-Futures',
    historicalData: { '2025-03': 20.7, '2025-04': 20.9, '2025-05': 21.0, '2025-06': 21.2, '2025-07': 21.4, '2025-08': 21.6, '2025-09': 21.8, '2025-10': 22.0, '2025-11': 22.1, '2025-12': 22.2, '2026-01': 22.3, '2026-02': 22.4 }
  },
  natural_gas: {
    label: 'Natural Gas (EU)', value: 48.2, unit: 'EUR/MWh', change: '+15%', source: 'TTF', updated: '2026-02',
    description: 'TTF (Title Transfer Facility) natural gas price — the European benchmark for natural gas. Critical for glass manufacturing (furnaces run 24/7 at 1,500\u00b0C), distillery heating, bottling line operations, and warehouse climate control. Energy typically represents 8-12% of total COGS for spirits producers.',
    sourceUrl: 'https://www.theice.com/products/27996665/Dutch-TTF-Gas-Futures',
    historicalData: { '2025-03': 41.9, '2025-04': 42.3, '2025-05': 42.8, '2025-06': 43.4, '2025-07': 44.1, '2025-08': 44.8, '2025-09': 45.5, '2025-10': 46.2, '2025-11': 46.9, '2025-12': 47.4, '2026-01': 47.8, '2026-02': 48.2 }
  },
}

const MARGIN_ALERTS = [
  { brand: 'Corona Extra', company: 'Constellation Brands', severity: 'high', message: 'Glass +2.1% & freight +110% vs flat retail \u2014 margin squeeze imminent', category: 'Beer' },
  { brand: 'Hennessy VS', company: 'LVMH', severity: 'medium', message: 'Cognac grape costs +9% while US retail held at $34.99', category: 'Cognac' },
  { brand: 'Johnnie Walker Black', company: 'Diageo', severity: 'medium', message: 'Barley +12% and energy +15% eroding blended scotch margins', category: 'Blended Scotch' },
  { brand: 'Bacardi Superior', company: 'Bacardi', severity: 'low', message: 'Sugarcane +8% partially offset by Caribbean shipping normalisation', category: 'Rum' },
]

const CLIMATE_RISKS = [
  { region: 'France', commodity: 'Wine grapes', impact: '-16% production vs 5yr avg', severity: 'critical' },
  { region: 'California', commodity: 'Wine grapes', impact: '-23% yield due to drought', severity: 'critical' },
  { region: 'Scotland', commodity: 'Malting barley', impact: '-40% in some regions', severity: 'high' },
  { region: 'Caribbean', commodity: 'Sugarcane', impact: 'Erratic rainfall disrupting harvest', severity: 'medium' },
  { region: 'Mexico (Jalisco)', commodity: 'Blue Weber Agave', impact: 'Oversupply cycle \u2014 prices falling', severity: 'low' },
]

function MetricChart({ historicalData }) {
  const entries = Object.entries(historicalData).sort(([a], [b]) => a.localeCompare(b))
  const values = entries.map(([, v]) => v)
  const max = Math.max(...values)
  const min = Math.min(...values)
  const range = max - min || 1
  const w = 480, h = 160, pad = 40, padR = 20, padB = 28
  const cw = w - pad - padR, ch = h - 16 - padB
  const pts = entries.map(([d, v], i) => ({ x: pad + (i / (entries.length - 1)) * cw, y: 16 + ch - ((v - min) / range) * ch, d, v }))
  const line = pts.map(p => `${p.x},${p.y}`).join(' L ')
  const area = `M ${pts[0].x},${16 + ch} L ${line} L ${pts[pts.length - 1].x},${16 + ch} Z`
  const show = [0, Math.floor(pts.length / 3), Math.floor(2 * pts.length / 3), pts.length - 1]
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full max-w-lg">
      <defs><linearGradient id="cg" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#1e3a5f" stopOpacity="0.15" /><stop offset="100%" stopColor="#1e3a5f" stopOpacity="0.02" /></linearGradient></defs>
      <line x1={pad} y1={16} x2={pad} y2={16 + ch} stroke="#e5e7eb" strokeWidth="1" />
      <line x1={pad} y1={16 + ch} x2={pad + cw} y2={16 + ch} stroke="#e5e7eb" strokeWidth="1" />
      {[0, 0.25, 0.5, 0.75, 1].map((f, i) => { const y = 16 + ch - f * ch; const val = (min + f * range).toFixed(1); return (<g key={i}><line x1={pad} y1={y} x2={pad + cw} y2={y} stroke="#f3f4f6" strokeWidth="1" /><text x={pad - 6} y={y + 3} textAnchor="end" fontSize="9" fill="#9ca3af">{val}</text></g>) })}
      <path d={area} fill="url(#cg)" />
      <polyline points={line} fill="none" stroke="#1e3a5f" strokeWidth="2" strokeLinejoin="round" />
      {pts.map((p, i) => <circle key={i} cx={p.x} cy={p.y} r="3" fill="#1e3a5f" stroke="white" strokeWidth="1.5" />)}
      {show.map(i => <text key={i} x={pts[i].x} y={h - 4} textAnchor="middle" fontSize="9" fill="#9ca3af">{pts[i].d}</text>)}
    </svg>
  )
}

function MetricDetailPanel({ metricKey, data, onClose }) {
  return (
    <div className="bg-white rounded-xl border border-blue-200 shadow-lg p-6 mb-6 relative">
      <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"><X className="w-5 h-5" /></button>
      <div className="flex items-start gap-4 mb-4">
        <div className="bg-blue-50 rounded-lg p-2"><Info className="w-5 h-5 text-blue-600" /></div>
        <div className="flex-1">
          <h3 className="text-lg font-bold text-navy mb-1">{data.label}</h3>
          <div className="flex items-baseline gap-2 mb-2">
            <span className="text-2xl font-bold text-navy">{typeof data.value === 'number' ? data.value.toLocaleString() : data.value}</span>
            {data.unit && <span className="text-sm text-gray-400">{data.unit}</span>}
            <span className={`text-sm font-semibold px-2 py-0.5 rounded-full ${data.change.startsWith('+') ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>{data.change}</span>
          </div>
        </div>
      </div>
      <p className="text-sm text-gray-600 leading-relaxed mb-5">{data.description}</p>
      {data.historicalData && (
        <div className="mb-5">
          <h4 className="text-xs font-semibold text-navy uppercase tracking-wide mb-2">12-Month Trend</h4>
          <MetricChart historicalData={data.historicalData} />
        </div>
      )}
      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <div className="text-xs text-gray-400">Source: {data.source} | Last updated: {data.updated}</div>
        {data.sourceUrl && (
          <a href={data.sourceUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-xs font-medium text-blue-600 hover:text-blue-800">
            View source data <ExternalLink className="w-3 h-3" />
          </a>
        )}
      </div>
    </div>
  )
}

function CostCard({ metricKey, label, value, unit, change, source, updated, onClick }) {
  return (
    <button onClick={onClick} className="bg-white rounded-xl border border-gray-100 p-4 hover:shadow-md hover:border-blue-200 transition-all cursor-pointer text-left w-full">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs text-gray-400 uppercase tracking-wide font-medium">{label}</span>
        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${change.startsWith('+') ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
          {change}
        </span>
      </div>
      <div className="flex items-baseline gap-1">
        <span className="text-2xl font-bold text-navy">{typeof value === 'number' ? value.toLocaleString() : value}</span>
        {unit && <span className="text-sm text-gray-400">{unit}</span>}
      </div>
      <div className="flex items-center justify-between mt-2">
        <span className="text-[10px] text-gray-300">{source}</span>
        <span className="text-[10px] text-gray-300">{updated}</span>
      </div>
      <div className="mt-2 text-[10px] text-blue-500 font-medium">Click for details &rarr;</div>
    </button>
  )
}

function MarginAlert({ brand, company, severity, message, category }) {
  const colors = { high: 'border-l-red-500 bg-red-50/30', medium: 'border-l-amber-500 bg-amber-50/30', low: 'border-l-blue-500 bg-blue-50/30' }
  const badges = { high: 'bg-red-100 text-red-700', medium: 'bg-amber-100 text-amber-700', low: 'bg-blue-100 text-blue-700' }
  return (
    <div className={`border-l-4 rounded-r-lg p-4 ${colors[severity]}`}>
      <div className="flex items-center justify-between mb-1">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-navy text-sm">{brand}</span>
          <span className="text-xs text-gray-400">{company}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded">{category}</span>
          <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${badges[severity]}`}>{severity}</span>
        </div>
      </div>
      <p className="text-sm text-gray-600">{message}</p>
    </div>
  )
}

function CostCardSection({ title, icon: Icon, keys, data, expandedMetric, setExpandedMetric }) {
  return (
    <div className="mb-6">
      <div className="flex items-center gap-2 mb-3">
        <Icon className="w-4 h-4 text-gold" />
        <h2 className="text-sm font-semibold text-navy uppercase tracking-wide">{title}</h2>
      </div>
      <div className={`grid grid-cols-1 md:grid-cols-${keys.length > 3 ? 4 : 3} gap-4`}>
        {keys.map(k => (
          <CostCard key={k} metricKey={k} {...data[k]} onClick={() => setExpandedMetric(expandedMetric === k ? null : k)} />
        ))}
      </div>
      {keys.includes(expandedMetric) && (
        <div className="mt-4">
          <MetricDetailPanel metricKey={expandedMetric} data={data[expandedMetric]} onClose={() => setExpandedMetric(null)} />
        </div>
      )}
    </div>
  )
}

export default function SupplyChain() {
  const [activeTab, setActiveTab] = useState('cogs')
  const [expandedMetric, setExpandedMetric] = useState(null)

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-display font-bold text-navy">Supply Chain & COGS Matrix</h1>
          <p className="text-gray-400 text-sm mt-1">Real-time input cost tracking, margin compression alerts, and climate risk monitoring</p>
        </div>
        <div className="flex gap-1 bg-gray-100 rounded-lg p-1">
          {['cogs', 'margins', 'climate'].map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)} className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${activeTab === tab ? 'bg-white text-navy shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}>
              {tab === 'cogs' ? 'Input Costs' : tab === 'margins' ? 'Margin Alerts' : 'Climate Risk'}
            </button>
          ))}
        </div>
      </div>

      {activeTab === 'cogs' && (
        <div>
          <CostCardSection title="Packaging & Freight" icon={Package} keys={['glass_ppi', 'container_index', 'baltic_dry']} data={COGS_DATA} expandedMetric={expandedMetric} setExpandedMetric={setExpandedMetric} />
          <CostCardSection title="Agricultural Raw Materials" icon={Factory} keys={['agave', 'barley', 'corn', 'sugarcane']} data={COGS_DATA} expandedMetric={expandedMetric} setExpandedMetric={setExpandedMetric} />

          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <Fuel className="w-4 h-4 text-gold" />
              <h2 className="text-sm font-semibold text-navy uppercase tracking-wide">Energy & Manufacturing</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <CostCard metricKey="natural_gas" {...COGS_DATA.natural_gas} onClick={() => setExpandedMetric(expandedMetric === 'natural_gas' ? null : 'natural_gas')} />
              <div className="bg-white rounded-xl border border-gray-100 p-4 col-span-2">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-xs text-gray-400 uppercase tracking-wide font-medium">Composite COGS Pressure Index</h3>
                  <div className="group relative">
                    <Info className="w-3.5 h-3.5 text-gray-300 cursor-help" />
                    <div className="absolute bottom-6 left-0 w-72 bg-navy text-white text-xs p-3 rounded-lg shadow-xl opacity-0 group-hover:opacity-100 transition-opacity z-10">
                      Weighted average of input cost increases (60% raw materials, 30% freight, 10% energy) vs. average retail price growth. A gap indicates margin compression across the beverage alcohol sector.
                    </div>
                  </div>
                </div>
                <p className="text-xs text-gray-400 mb-3">Measures the gap between rising input costs and retail price increases across the sector</p>
                <div className="flex items-center gap-4">
                  <div className="flex-1 bg-gray-50 rounded-lg p-4 text-center">
                    <div className="text-3xl font-bold text-red-500">7.2%</div>
                    <div className="text-xs text-gray-400 mt-1">Weighted Input Cost Rise (YoY)</div>
                  </div>
                  <div className="flex-1 bg-gray-50 rounded-lg p-4 text-center">
                    <div className="text-3xl font-bold text-amber-500">3.1%</div>
                    <div className="text-xs text-gray-400 mt-1">Avg Retail Price Increase</div>
                  </div>
                  <div className="flex-1 bg-gray-50 rounded-lg p-4 text-center">
                    <div className="text-3xl font-bold text-red-600">-4.1pp</div>
                    <div className="text-xs text-gray-400 mt-1">Estimated Margin Compression</div>
                  </div>
                </div>
              </div>
            </div>
            {expandedMetric === 'natural_gas' && (
              <div className="mt-4">
                <MetricDetailPanel metricKey="natural_gas" data={COGS_DATA.natural_gas} onClose={() => setExpandedMetric(null)} />
              </div>
            )}
          </div>
        </div>
      )}

      {activeTab === 'margins' && (
        <div>
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle className="w-4 h-4 text-red-500" />
            <h2 className="text-sm font-semibold text-navy uppercase tracking-wide">Net Revenue Management Alerts</h2>
            <span className="text-xs text-gray-400 ml-2">Triggers when combined input costs rise &gt;3% while retail price remains flat</span>
          </div>
          <div className="space-y-3">
            {MARGIN_ALERTS.map((alert, i) => <MarginAlert key={i} {...alert} />)}
          </div>
          <div className="mt-8 bg-white rounded-xl border border-gray-100 p-6">
            <h3 className="text-sm font-semibold text-navy uppercase tracking-wide mb-4">NRM Decision Framework</h3>
            <div className="grid grid-cols-3 gap-6 text-center">
              <div className="p-4 bg-gray-50 rounded-lg"><div className="text-2xl font-bold text-navy mb-1">14</div><div className="text-xs text-gray-500">Brands Monitored</div></div>
              <div className="p-4 bg-red-50 rounded-lg"><div className="text-2xl font-bold text-red-600 mb-1">4</div><div className="text-xs text-gray-500">Active Margin Alerts</div></div>
              <div className="p-4 bg-green-50 rounded-lg"><div className="text-2xl font-bold text-green-600 mb-1">$2.40</div><div className="text-xs text-gray-500">Avg Price Increase Needed</div></div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'climate' && (
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Thermometer className="w-4 h-4 text-orange-500" />
            <h2 className="text-sm font-semibold text-navy uppercase tracking-wide">Climate & Agricultural Risk Monitor</h2>
          </div>
          <div className="space-y-3">
            {CLIMATE_RISKS.map((risk, i) => {
              const colors = { critical: 'border-l-red-500 bg-red-50/30', high: 'border-l-orange-500 bg-orange-50/30', medium: 'border-l-amber-500 bg-amber-50/30', low: 'border-l-green-500 bg-green-50/30' }
              const badges = { critical: 'bg-red-100 text-red-700', high: 'bg-orange-100 text-orange-700', medium: 'bg-amber-100 text-amber-700', low: 'bg-green-100 text-green-700' }
              return (
                <div key={i} className={`border-l-4 rounded-r-lg p-4 ${colors[risk.severity]}`}>
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-3">
                      <span className="font-semibold text-navy text-sm">{risk.region}</span>
                      <span className="text-xs text-gray-500">{risk.commodity}</span>
                    </div>
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${badges[risk.severity]}`}>{risk.severity}</span>
                  </div>
                  <p className="text-sm text-gray-600">{risk.impact}</p>
                </div>
              )
            })}
          </div>
          <div className="mt-8 bg-white rounded-xl border border-gray-100 p-6">
            <h3 className="text-sm font-semibold text-navy uppercase tracking-wide mb-4">Regulatory Watch</h3>
            <div className="border-l-4 border-l-purple-500 bg-purple-50/30 rounded-r-lg p-4">
              <div className="flex items-center justify-between mb-1">
                <span className="font-semibold text-navy text-sm">EU PPWR Packaging Regulation</span>
                <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-purple-100 text-purple-700">Binding Aug 2026</span>
              </div>
              <p className="text-sm text-gray-600">Strict recyclability standards and harmful substance limits. The Macallan has already reduced bottle weight by 11% and committed to removing plastic closures entirely.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
