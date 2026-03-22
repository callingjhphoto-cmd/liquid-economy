import React, { useState, useEffect, useMemo } from 'react'
import {
  BarChart, Bar, LineChart, Line, XAxis, YAxis, Tooltip,
  ResponsiveContainer, CartesianGrid, AreaChart, Area,
  ComposedChart, Cell, ReferenceLine
} from 'recharts'
import {
  CloudRain, Sun, Thermometer, Snowflake, TrendingUp, TrendingDown,
  AlertTriangle, CheckCircle, Droplets, Wind, Sprout, Leaf, Globe,
  Calendar, RefreshCw, Download, ChevronRight
} from 'lucide-react'
import { REGIONS, FORWARD_SIGNALS, CLIMATE_SOURCES } from '../data/climateYieldData'
import {
  Card, AccentCard,
  MetricCard,
  PageHeader,
  SectionHeader, SectionLabel,
  BentoGrid,
  DrillDown,
  SourceList,
  DataTable,
  Badge,
  TabGroup,
  EntityLink,
  BottomSheet,
} from '../components/ui'

/* ================================================================
   OPEN-METEO API INTEGRATION
   ================================================================ */

const fetchRecentWeather = async (lat, lon) => {
  try {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,sunshine_duration&past_days=30&timezone=auto`
    const resp = await fetch(url)
    if (!resp.ok) throw new Error('API error')
    const data = await resp.json()
    return {
      dates: data.daily.time,
      maxTemp: data.daily.temperature_2m_max,
      minTemp: data.daily.temperature_2m_min,
      precip: data.daily.precipitation_sum,
      sunshine: data.daily.sunshine_duration?.map(s => s ? (s / 3600).toFixed(1) : 0)
    }
  } catch (e) {
    console.error('Weather fetch failed:', e)
    return null
  }
}

const fetchHistoricalComparison = async (lat, lon) => {
  try {
    const now = new Date()
    const thisYear = now.getFullYear()
    const month = String(now.getMonth() + 1).padStart(2, '0')
    const day = String(now.getDate()).padStart(2, '0')
    const results = {}
    for (let y = thisYear - 3; y <= thisYear; y++) {
      const s = `${y}-01-01`
      const e = y === thisYear ? `${y}-${month}-${day}` : `${y}-12-31`
      const url = `https://archive-api.open-meteo.com/v1/archive?latitude=${lat}&longitude=${lon}&start_date=${s}&end_date=${e}&daily=temperature_2m_mean,precipitation_sum&timezone=auto`
      const resp = await fetch(url)
      if (!resp.ok) continue
      const data = await resp.json()
      const temps = data.daily.temperature_2m_mean?.filter(t => t !== null) || []
      const precip = data.daily.precipitation_sum?.filter(p => p !== null) || []
      results[y] = {
        avgTemp: temps.length ? (temps.reduce((a, b) => a + b, 0) / temps.length).toFixed(1) : null,
        totalPrecip: precip.length ? precip.reduce((a, b) => a + b, 0).toFixed(0) : null,
        rainDays: precip.filter(p => p > 1).length,
        daysTracked: temps.length
      }
    }
    return results
  } catch (e) {
    console.error('Historical comparison failed:', e)
    return null
  }
}

/* ================================================================
   HELPER COMPONENTS
   ================================================================ */

const OutlookBadge = ({ outlook }) => {
  const styles = {
    bearish: { bg: 'bg-red-100', text: 'text-red-700', label: 'Bearish for Price', icon: TrendingUp },
    bullish: { bg: 'bg-green-100', text: 'text-green-700', label: 'Bullish Supply', icon: TrendingDown },
    neutral: { bg: 'bg-gray-100', text: 'text-gray-600', label: 'Neutral', icon: CheckCircle },
    monitoring: { bg: 'bg-amber-100', text: 'text-amber-700', label: 'Monitoring', icon: AlertTriangle }
  }
  const s = styles[outlook] || styles.neutral
  const Icon = s.icon
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold ${s.bg} ${s.text}`}>
      <Icon size={10} /> {s.label}
    </span>
  )
}

/* ================================================================
   TIER 1 \u2014 Region Summary Card (clickable \u2192 Tier 2)
   ================================================================ */

function RegionCard({ region, onClick }) {
  const years = Object.entries(region.historical).filter(([_, d]) => d.yield !== null)
  const latest = years[years.length - 1]
  const prev = years.length > 1 ? years[years.length - 2] : null
  const yieldChange = latest && prev ? (((latest[1].yield - prev[1].yield) / prev[1].yield) * 100).toFixed(1) : null
  const miniData = years.slice(-5).map(([yr, d]) => ({ year: yr, yield: d.yield }))

  return (
    <Card hover onClick={onClick} className="group">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className="text-xl">{region.icon}</span>
          <div>
            <h3 className="text-sm font-semibold text-navy group-hover:text-gold transition-colors">{region.name}</h3>
            <p className="text-xs text-gray-500">{region.spirit}</p>
          </div>
        </div>
        {latest && <OutlookBadge outlook={latest[1].outlook} />}
      </div>

      <p className="text-xs text-gray-500 mb-2">{region.crop} \u2014 {region.country}</p>

      <div className="h-16 mb-2">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={miniData} accessibilityLayer>
            <Area type="monotone" dataKey="yield" stroke={region.color} fill={region.color} fillOpacity={0.15} strokeWidth={2} dot={false} />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs text-gray-500">Latest Yield ({latest?.[0]})</p>
          <p className="text-sm font-bold text-navy">
            {typeof latest?.[1]?.yield === 'number' && latest[1].yield > 100 ? latest[1].yield.toLocaleString() : latest?.[1]?.yield}
            <span className="text-xs font-normal text-gray-500 ml-1">{region.yieldUnit}</span>
          </p>
        </div>
        {yieldChange && (
          <span className={`text-xs font-semibold ${parseFloat(yieldChange) >= 0 ? 'text-emerald-600' : 'text-red-500'}`}>
            {parseFloat(yieldChange) >= 0 ? '+' : ''}{yieldChange}% YoY
          </span>
        )}
      </div>
      <div className="flex items-center gap-1 mt-2 text-xs text-gray-500">
        <ChevronRight size={10} /> Click to explore
      </div>
    </Card>
  )
}

/* ================================================================
   TIER 2 \u2014 Region Deep Dive (expanded panel)
   ================================================================ */

function LiveWeatherPanel({ region }) {
  const [weather, setWeather] = useState(null)
  const [loading, setLoading] = useState(true)
  const [comparison, setComparison] = useState(null)

  useEffect(() => {
    setLoading(true)
    Promise.all([
      fetchRecentWeather(region.lat, region.lon),
      fetchHistoricalComparison(region.lat, region.lon)
    ]).then(([w, c]) => {
      setWeather(w)
      setComparison(c)
      setLoading(false)
    })
  }, [region.id])

  if (loading) return (
    <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200 animate-pulse">
      <div className="flex items-center gap-2 mb-3">
        <RefreshCw size={14} className="animate-spin text-blue-500" />
        <span className="text-xs text-blue-600 font-medium">Loading live weather data from Open-Meteo\u2026</span>
      </div>
      <div className="h-40 bg-blue-100 rounded-lg" />
    </Card>
  )

  if (!weather) return (
    <Card className="bg-red-50 border-red-200">
      <p className="text-xs text-red-600">Unable to fetch live weather data. Open-Meteo API may be temporarily unavailable.</p>
    </Card>
  )

  const last30Precip = weather.precip.reduce((a, b) => a + (b || 0), 0).toFixed(0)
  const avgMax = (weather.maxTemp.filter(t => t !== null).reduce((a, b) => a + b, 0) / weather.maxTemp.filter(t => t !== null).length).toFixed(1)
  const avgMin = (weather.minTemp.filter(t => t !== null).reduce((a, b) => a + b, 0) / weather.minTemp.filter(t => t !== null).length).toFixed(1)
  const frostDays30 = weather.minTemp.filter(t => t !== null && t < 0).length
  const chartData = weather.dates.map((d, i) => ({
    date: d.slice(5),
    precip: weather.precip[i] || 0,
    maxTemp: weather.maxTemp[i],
    minTemp: weather.minTemp[i]
  }))

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-200 p-5">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Globe size={14} className="text-blue-600" />
          <span className="text-xs font-semibold text-blue-800 uppercase tracking-wider">Live Weather \u2014 Last 30 Days</span>
          <span className="text-xs text-blue-500">{region.lat}\u00b0N, {region.lon}\u00b0E</span>
        </div>
        <span className="text-xs text-blue-400">Source: Open-Meteo API (real-time)</span>
      </div>

      <BentoGrid>
        <MetricCard label="30-Day Rainfall" value={`${last30Precip}mm`} icon={Droplets} />
        <MetricCard label="Avg High" value={`${avgMax}\u00b0C`} icon={Thermometer} />
        <MetricCard label="Avg Low" value={`${avgMin}\u00b0C`} icon={Thermometer} />
        <MetricCard label="Frost Days (30d)" value={String(frostDays30)} icon={Snowflake} />
      </BentoGrid>

      <div className="h-48 mt-4">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={chartData} margin={{ top: 5, right: 5, bottom: 5, left: 0 }} accessibilityLayer>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="date" tick={{ fontSize: 9 }} interval={4} />
            <YAxis yAxisId="temp" tick={{ fontSize: 9 }} domain={['auto', 'auto']} />
            <YAxis yAxisId="precip" orientation="right" tick={{ fontSize: 9 }} />
            <Tooltip contentStyle={{ fontSize: 11 }} />
            <Bar yAxisId="precip" dataKey="precip" fill="#93c5fd" opacity={0.6} name="Rainfall (mm)" />
            <Line yAxisId="temp" dataKey="maxTemp" stroke="#ef4444" dot={false} strokeWidth={1.5} name="Max Temp (\u00b0C)" />
            <Line yAxisId="temp" dataKey="minTemp" stroke="#3b82f6" dot={false} strokeWidth={1.5} name="Min Temp (\u00b0C)" />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      {comparison && (
        <div className="mt-4 pt-3 border-t border-blue-200">
          <SectionLabel>Year-to-Date Comparison</SectionLabel>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
            {Object.entries(comparison).map(([yr, d]) => (
              <div key={yr} className={`rounded-lg p-2 text-center ${parseInt(yr) === new Date().getFullYear() ? 'bg-blue-200/50 ring-1 ring-blue-300' : 'bg-white/60'}`}>
                <p className="text-xs font-bold text-navy">{yr}</p>
                <p className="text-xs text-gray-600">{d.avgTemp}\u00b0C avg</p>
                <p className="text-xs text-blue-600">{d.totalPrecip}mm rain</p>
                <p className="text-xs text-gray-500">{d.daysTracked} days</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

function YieldChart({ region }) {
  const data = Object.entries(region.historical)
    .filter(([_, d]) => d.yield !== null)
    .map(([yr, d]) => ({ year: parseInt(yr), yield: d.yield, avg: region.avgYield }))

  return (
    <Card>
      <h3 className="font-display text-sm font-semibold text-navy mb-1">10-Year Yield History</h3>
      <p className="text-xs text-gray-500 mb-3">{region.yieldUnit}</p>
      <div className="h-52">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={data} margin={{ top: 5, right: 5, bottom: 5, left: 0 }} accessibilityLayer>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="year" tick={{ fontSize: 10 }} />
            <YAxis tick={{ fontSize: 10 }} domain={['auto', 'auto']} />
            <Tooltip contentStyle={{ fontSize: 11 }} />
            <ReferenceLine y={region.avgYield} stroke="#C9A96E" strokeDasharray="5 5" label={{ value: '10yr Avg', position: 'right', fontSize: 9, fill: '#C9A96E' }} />
            <Bar dataKey="yield" name="Yield" radius={[4, 4, 0, 0]}>
              {data.map((entry, i) => (
                <Cell key={i} fill={entry.yield >= region.avgYield ? '#22c55e' : '#ef4444'} opacity={0.8} />
              ))}
            </Bar>
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </Card>
  )
}

function ClimateChart({ region }) {
  const data = Object.entries(region.historical)
    .filter(([_, d]) => d.rainfall !== null)
    .map(([yr, d]) => ({
      year: parseInt(yr),
      rainfall: d.rainfall,
      avgTemp: d.avgTemp,
      frostDays: d.frostDays,
      sunHours: d.sunHours
    }))

  return (
    <Card>
      <h3 className="font-display text-sm font-semibold text-navy mb-3">Climate Metrics (10-Year)</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {[
          { key: 'rainfall', label: 'Annual Rainfall (mm)', color: '#3b82f6' },
          { key: 'avgTemp', label: 'Avg Temperature (\u00b0C)', color: '#ef4444', isLine: true },
          { key: 'frostDays', label: 'Frost Days', color: '#06b6d4' },
          { key: 'sunHours', label: 'Sunshine Hours', color: '#eab308' },
        ].map(m => (
          <div key={m.key}>
            <SectionLabel>{m.label}</SectionLabel>
            <div className="h-36">
              <ResponsiveContainer width="100%" height="100%">
                {m.isLine ? (
                  <LineChart data={data} accessibilityLayer>
                    <XAxis dataKey="year" tick={{ fontSize: 9 }} />
                    <YAxis tick={{ fontSize: 9 }} domain={['auto', 'auto']} />
                    <Tooltip contentStyle={{ fontSize: 10 }} />
                    <Line dataKey={m.key} stroke={m.color} strokeWidth={2} dot={{ r: 3 }} />
                  </LineChart>
                ) : (
                  <BarChart data={data} accessibilityLayer>
                    <XAxis dataKey="year" tick={{ fontSize: 9 }} />
                    <YAxis tick={{ fontSize: 9 }} />
                    <Tooltip contentStyle={{ fontSize: 10 }} />
                    <Bar dataKey={m.key} fill={m.color} radius={[3, 3, 0, 0]} opacity={0.7} />
                  </BarChart>
                )}
              </ResponsiveContainer>
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}

function SeasonDetail({ region, year }) {
  const d = region.historical[year]
  if (!d) return null
  return (
    <Card>
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-display text-sm font-semibold text-navy">{year} Season Report</h3>
        <OutlookBadge outlook={d.outlook} />
      </div>
      {d.yield !== null && (
        <BentoGrid className="mb-4">
          <MetricCard label="Yield" value={typeof d.yield === 'number' && d.yield > 100 ? d.yield.toLocaleString() : String(d.yield)} subtitle={region.yieldUnit} icon={Sprout} />
          <MetricCard label="Rainfall" value={`${d.rainfall}mm`} subtitle={d.rainfall > 700 ? 'Above avg' : d.rainfall < 500 ? 'Below avg' : 'Normal'} icon={CloudRain} />
          <MetricCard label="Avg Temp" value={`${d.avgTemp}\u00b0C`} icon={Thermometer} />
          <MetricCard label="Sun Hours" value={d.sunHours.toLocaleString()} icon={Sun} />
        </BentoGrid>
      )}
      <div className="bg-gray-50 rounded-lg p-4">
        <p className="text-sm text-gray-700 leading-relaxed">{d.season}</p>
      </div>
      <div className="mt-3">
        <p className="text-xs text-gray-500"><strong>Price Link:</strong> {region.priceLink}</p>
      </div>
    </Card>
  )
}

/* ================================================================
   TIER 2 \u2014 Region Detail Panel
   ================================================================ */

function RegionDetailPanel({ region, onClose }) {
  const [selectedYear, setSelectedYear] = useState(2025)
  const yearKeys = Object.keys(region.historical).map(Number).sort()

  return (
    <div className="space-y-4">
      <button onClick={onClose} className="text-xs text-gray-500 hover:text-navy flex items-center gap-1 mb-2">
        \u2190 Back to all regions
      </button>

      <div className="flex items-center gap-3">
        <span className="text-3xl">{region.icon}</span>
        <div>
          <h2 className="font-display text-xl font-bold text-navy">{region.name}</h2>
          <p className="text-sm text-gray-500">{region.crop} \u2014 {region.spirit}</p>
        </div>
      </div>

      {/* Critical Factors */}
      <AccentCard>
        <p className="text-xs font-semibold text-amber-800 mb-1">Critical Yield Factors</p>
        <div className="flex flex-wrap gap-2">
          {region.criticalFactors.map((f, i) => (
            <span key={i} className="text-micro bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full">{f}</span>
          ))}
        </div>
      </AccentCard>

      {/* Tier 2: Charts (revealed on region click) */}
      <DrillDown title="Live Weather Data" summary="Real-time weather from Open-Meteo API" defaultOpen>
        <LiveWeatherPanel region={region} />
      </DrillDown>

      <DrillDown title="Historical Yield & Climate Charts" summary="10-year trends for yield, rainfall, temperature, frost, sunshine">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <YieldChart region={region} />
          <ClimateChart region={region} />
        </div>
      </DrillDown>

      {/* Year Selector + Season Detail */}
      <DrillDown title="Detailed Season Reports" summary={`${yearKeys.length} years of vintage analysis (${yearKeys[0]}\u2013${yearKeys[yearKeys.length - 1]})`} defaultOpen>
        <div className="mb-4">
          <TabGroup
            tabs={yearKeys.map(y => ({ key: y, label: String(y) }))}
            active={selectedYear}
            onChange={setSelectedYear}
            size="sm"
          />
        </div>
        <SeasonDetail region={region} year={selectedYear} />
      </DrillDown>

      {/* Tier 3: Full Data Table */}
      <DrillDown title="Full Climate Data Table" summary="All metrics across all years \u2014 exportable">
        <DataTable
          columns={[
            { key: 'year', label: 'Year', width: 'w-16' },
            { key: 'yield', label: `Yield (${region.yieldUnit})`, render: v => v !== null ? (typeof v === 'number' && v > 100 ? v.toLocaleString() : v) : '\u2014' },
            { key: 'rainfall', label: 'Rainfall (mm)', render: v => v !== null ? v : '\u2014' },
            { key: 'avgTemp', label: 'Avg Temp (\u00b0C)', render: v => v !== null ? v : '\u2014' },
            { key: 'frostDays', label: 'Frost Days', render: v => v !== null ? v : '\u2014' },
            { key: 'sunHours', label: 'Sun Hours', render: v => v !== null ? v?.toLocaleString() : '\u2014' },
            { key: 'outlook', label: 'Outlook', render: v => <OutlookBadge outlook={v} /> },
          ]}
          data={Object.entries(region.historical).map(([yr, d]) => ({ year: parseInt(yr), ...d })).sort((a, b) => b.year - a.year)}
          searchable={false}
        />
        <SourceList sources={CLIMATE_SOURCES} className="mt-4" />
      </DrillDown>
    </div>
  )
}

/* ================================================================
   TIER 1 \u2014 Forward-Looking Signals
   ================================================================ */

function ForwardSignals() {
  return (
    <DrillDown
      title="Forward-Looking Yield & Price Signals"
      summary={`${FORWARD_SIGNALS.filter(s => s.risk === 'high').length} high-risk, ${FORWARD_SIGNALS.filter(s => s.risk === 'medium').length} medium-risk signals across 8 regions`}
    >
      <p className="text-xs text-gray-500 mb-4">Intelligence brief: where climate and agricultural factors may impact spirits pricing over the next 12\u201336 months.</p>
      <div className="space-y-3">
        {FORWARD_SIGNALS.map((s, i) => (
          <div key={i} className={`rounded-lg border p-4 ${s.risk === 'high' ? 'border-red-200 bg-red-50/50' : s.risk === 'medium' ? 'border-amber-200 bg-amber-50/30' : 'border-gray-200 bg-gray-50/30'}`}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-navy">{s.region}</span>
              <div className="flex items-center gap-2">
                <span className={`text-micro font-semibold px-2 py-0.5 rounded-full ${s.risk === 'high' ? 'bg-red-100 text-red-700' : s.risk === 'medium' ? 'bg-amber-100 text-amber-700' : 'bg-green-100 text-green-700'}`}>
                  {s.risk.toUpperCase()} RISK
                </span>
                <span className="text-xs text-gray-500">{s.timeframe}</span>
              </div>
            </div>
            <p className="text-xs text-gray-700 mb-2">{s.signal}</p>
            <p className="text-xs text-gray-500"><strong className="text-navy">Price Impact:</strong> {s.priceImpact}</p>
          </div>
        ))}
      </div>
    </DrillDown>
  )
}

/* ================================================================
   MAIN PAGE — Three-Tier Progressive Disclosure
   ================================================================ */

export default function ClimateYield() {
  const [selectedRegion, setSelectedRegion] = useState(null)
  const [mobileDetail, setMobileDetail] = useState(null)
  const region = REGIONS.find(r => r.id === selectedRegion)

  // Mobile: show region summary in BottomSheet, desktop: full detail view
  const handleRegionClick = (regionId) => {
    if (window.innerWidth < 1024) {
      const r = REGIONS.find(reg => reg.id === regionId)
      if (r) {
        const years = Object.entries(r.historical).filter(([_, d]) => d.yield !== null)
        const latest = years[years.length - 1]
        const prev = years.length > 1 ? years[years.length - 2] : null
        const yieldChange = latest && prev ? (((latest[1].yield - prev[1].yield) / prev[1].yield) * 100).toFixed(1) : null
        setMobileDetail({
          title: r.name,
          content: (
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="text-2xl">{r.icon}</span>
                <div>
                  <p className="text-xs text-gray-500">{r.crop} \u2014 {r.spirit}</p>
                  <p className="text-xs text-gray-500">{r.country}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-gray-50 rounded-lg p-2.5 text-center">
                  <div className="text-xs text-gray-500 uppercase">Latest Yield</div>
                  <div className="text-sm font-bold text-navy">
                    {typeof latest?.[1]?.yield === 'number' && latest[1].yield > 100 ? latest[1].yield.toLocaleString() : latest?.[1]?.yield}
                    <span className="text-xs font-normal text-gray-500 ml-0.5">{r.yieldUnit}</span>
                  </div>
                </div>
                <div className="bg-gray-50 rounded-lg p-2.5 text-center">
                  <div className="text-xs text-gray-500 uppercase">YoY Change</div>
                  <div className={`text-sm font-bold ${yieldChange && parseFloat(yieldChange) >= 0 ? 'text-emerald-600' : 'text-red-500'}`}>
                    {yieldChange ? `${parseFloat(yieldChange) >= 0 ? '+' : ''}${yieldChange}%` : '\u2014'}
                  </div>
                </div>
              </div>
              {latest && <OutlookBadge outlook={latest[1].outlook} />}
              <div>
                <p className="text-micro font-semibold text-gray-500 uppercase mb-1">Critical Yield Factors</p>
                <div className="flex flex-wrap gap-1.5">
                  {r.criticalFactors.map((f, i) => (
                    <span key={i} className="text-micro bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full">{f}</span>
                  ))}
                </div>
              </div>
              {latest && (
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-xs text-gray-600 leading-relaxed">{latest[1].season}</p>
                </div>
              )}
              <button
                onClick={() => {
                  setMobileDetail(null)
                  setSelectedRegion(regionId)
                }}
                className="w-full py-2.5 bg-navy text-white rounded-xl text-xs font-medium"
              >
                View Full Detail
              </button>
            </div>
          )
        })
      }
      return
    }
    setSelectedRegion(regionId)
  }

  // Compute summary KPIs for Tier 1
  const summaryKpis = useMemo(() => {
    const highRiskCount = FORWARD_SIGNALS.filter(s => s.risk === 'high').length
    const bearishRegions = REGIONS.filter(r => {
      const years = Object.entries(r.historical).filter(([_, d]) => d.yield !== null)
      const latest = years[years.length - 1]
      return latest && latest[1].outlook === 'bearish'
    })
    const worstYieldRegion = REGIONS.reduce((worst, r) => {
      const years = Object.entries(r.historical).filter(([_, d]) => d.yield !== null)
      if (years.length < 2) return worst
      const latest = years[years.length - 1]
      const prev = years[years.length - 2]
      const change = ((latest[1].yield - prev[1].yield) / prev[1].yield) * 100
      if (!worst || change < worst.change) return { name: r.name, change }
      return worst
    }, null)

    return { highRiskCount, bearishRegions, worstYieldRegion }
  }, [])

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <PageHeader
        title="Climate & Yield Intelligence"
        subtitle="Agricultural inputs, weather patterns, and forward-looking yield analysis for every major spirits category \u00b7 Data as of March 2026"
        breadcrumbs={[
          { label: 'Command Centre', to: '/' },
          { label: 'Climate & Yield' }
        ]}
      />

      {!selectedRegion ? (
        <>
          {/* TIER 1: Executive Summary KPIs */}
          <BentoGrid>
            <BentoGrid.Hero>
              <Card className="h-full bg-gradient-to-br from-navy/5 to-gold/5 border-navy/10">
                <SectionLabel>Key Insight</SectionLabel>
                <h2 className="font-display text-lg text-navy mb-2">2025 Vintage Outlook: Mixed with Two Critical Risks</h2>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Champagne faces another potential frost catastrophe in April, and Mediterranean juniper stands remain structurally threatened by wildfire. Meanwhile, agave oversupply is creating a rare cost advantage for new tequila entrants \u2014 but the seeds of the next shortage (2030\u201332) are being sown now by farmer exits.
                </p>
              </Card>
            </BentoGrid.Hero>
            <MetricCard
              label="Regions Tracked"
              value={String(REGIONS.length)}
              subtitle="Across 8 countries"
              icon={Globe}
              sparkData={[{ v: 6 }, { v: 7 }, { v: 8 }, { v: 9 }, { v: 10 }]}
              direction="up"
            />
            <MetricCard
              label="High-Risk Signals"
              value={String(summaryKpis.highRiskCount)}
              subtitle="Champagne frost, Juniper fires"
              icon={AlertTriangle}
              direction="up"
              change="ALERT"
            />
            <MetricCard
              label="Data Depth"
              value="10 Years"
              subtitle="2016\u20132025 + live weather"
              icon={Calendar}
            />
            <MetricCard
              label="Most Affected"
              value={summaryKpis.worstYieldRegion?.name || 'N/A'}
              subtitle={summaryKpis.worstYieldRegion ? `${summaryKpis.worstYieldRegion.change.toFixed(1)}% YoY` : ''}
              icon={TrendingDown}
              direction="down"
            />
          </BentoGrid>

          {/* TIER 2: Forward Analysis (DrillDown) */}
          <ForwardSignals />

          {/* TIER 1: Region Grid (click for Tier 2) */}
          <div>
            <SectionHeader size="md" subtitle={`${REGIONS.length} regions covering every major spirits input crop`}>
              Input Regions & Crops
            </SectionHeader>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {REGIONS.map(r => (
                <RegionCard key={r.id} region={r} onClick={() => handleRegionClick(r.id)} />
              ))}
            </div>
          </div>

          {/* TIER 3: Sources (collapsed by default) */}
          <DrillDown
            title="Data Sources & Methodology"
            summary={`${CLIMATE_SOURCES.length} primary sources including Open-Meteo, CIVC, CRT, AHDB, USDA`}
          >
            <SourceList sources={CLIMATE_SOURCES} />
            <p className="text-xs text-gray-500 mt-3 pt-2 border-t border-gray-100">
              Yield figures are regional estimates based on published data. Live weather data refreshes on page load.
              Historical comparison uses year-to-date figures. Last updated: February 2026.
            </p>
          </DrillDown>
        </>
      ) : (
        /* TIER 2/3: Region Deep Dive (full detail) */
        <RegionDetailPanel region={region} onClose={() => setSelectedRegion(null)} />
      )}

      {/* Mobile BottomSheet for region detail */}
      <BottomSheet
        open={!!mobileDetail}
        onClose={() => setMobileDetail(null)}
        title={mobileDetail?.title || 'Detail'}
      >
        {mobileDetail?.content}
      </BottomSheet>
    </div>
  )
}
