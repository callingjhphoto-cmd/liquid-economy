import React, { useState, useEffect } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import { api } from '../lib/api'
import { SignalCard } from '../components/MetricCard'

const COLORS = ['#2B6CB0', '#C9A96E', '#38A169', '#C53030', '#DD6B20', '#6B46C1',
  '#2D3142', '#D69E2E', '#3182CE', '#E53E3E', '#38B2AC', '#805AD5', '#1A1F36', '#ED8936']

export default function Valuations() {
  const [data, setData] = useState(null)
  const [signals, setSignals] = useState([])
  const [loading, setLoading] = useState(true)
  const [days, setDays] = useState(90)

  useEffect(() => {
    loadData()
  }, [days])

  const loadData = async () => {
    setLoading(true)
    try {
      const [vals, arb] = await Promise.all([
        api.getValuations(days),
        api.getArbitrage(),
      ])
      setData(vals)
      setSignals(arb)
    } catch (e) {
      console.error('Failed to load valuations:', e)
    }
    setLoading(false)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-navy" />
      </div>
    )
  }

  // Build P/E comparison table from latest data point per company
  const latestPE = data ? Object.entries(data).map(([name, info]) => {
    const latest = info.data[info.data.length - 1]
    return {
      name, ticker: info.ticker, ...latest,
    }
  }).sort((a, b) => (a.pe_ttm || 999) - (b.pe_ttm || 999)) : []

  // Build chart data for P/E over time
  const chartData = []
  if (data) {
    const allDates = new Set()
    Object.values(data).forEach(info => info.data.forEach(d => allDates.add(d.date)))
    const sortedDates = [...allDates].sort()

    for (const dt of sortedDates) {
      const point = { date: dt }
      Object.entries(data).forEach(([name, info]) => {
        const match = info.data.find(d => d.date === dt)
        if (match?.pe_ttm) point[name] = match.pe_ttm
      })
      chartData.push(point)
    }
  }

  const companyNames = data ? Object.keys(data) : []

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl text-navy">Valuations & Arbitrage</h1>
          <p className="text-gray-500 text-sm mt-1">P/E ratios, valuation gaps, and arbitrage signals</p>
        </div>
        <div className="flex gap-2">
          {[30, 90, 180, 365].map(d => (
            <button key={d} onClick={() => setDays(d)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors
                ${days === d ? 'bg-navy text-white' : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'}`}>
              {d}d
            </button>
          ))}
        </div>
      </div>

      {/* P/E Ratio Chart */}
      {chartData.length > 1 && (
        <div className="bg-white rounded-xl border border-gray-100 p-6">
          <h2 className="font-display text-lg text-navy mb-4">P/E Ratio Trend</h2>
          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
              <XAxis dataKey="date" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} domain={[0, 'auto']} />
              <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} />
              <Legend wrapperStyle={{ fontSize: 11 }} />
              {companyNames.map((name, i) => (
                <Line key={name} type="monotone" dataKey={name} stroke={COLORS[i % COLORS.length]}
                  strokeWidth={2} dot={false} connectNulls />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* P/E Comparison Table */}
      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
        <div className="p-5 border-b border-gray-100">
          <h2 className="font-display text-lg text-navy">Valuation Comparison</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-navy text-white">
              <tr>
                <th className="text-left px-4 py-3 font-medium">Company</th>
                <th className="text-left px-4 py-3 font-medium">Ticker</th>
                <th className="text-right px-4 py-3 font-medium">Price</th>
                <th className="text-right px-4 py-3 font-medium">P/E (TTM)</th>
                <th className="text-right px-4 py-3 font-medium">P/E (Fwd)</th>
                <th className="text-right px-4 py-3 font-medium">Div Yield</th>
                <th className="text-right px-4 py-3 font-medium">Mkt Cap</th>
              </tr>
            </thead>
            <tbody>
              {latestPE.map((row, i) => (
                <tr key={row.name} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <td className="px-4 py-3 font-medium text-navy">{row.name}</td>
                  <td className="px-4 py-3 text-gray-500">{row.ticker}</td>
                  <td className="px-4 py-3 text-right">{row.currency} {row.price?.toLocaleString()}</td>
                  <td className="px-4 py-3 text-right font-semibold">
                    <span className={row.pe_ttm && row.pe_ttm < 12 ? 'text-accent-green' : row.pe_ttm && row.pe_ttm > 25 ? 'text-accent-red' : ''}>
                      {row.pe_ttm ? `${row.pe_ttm.toFixed(1)}x` : '—'}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">{row.pe_forward ? `${row.pe_forward.toFixed(1)}x` : '—'}</td>
                  <td className="px-4 py-3 text-right">{row.dividend_yield ? `${(row.dividend_yield * 100).toFixed(1)}%` : '—'}</td>
                  <td className="px-4 py-3 text-right text-gray-500">
                    {row.market_cap ? `$${(row.market_cap / 1e9).toFixed(1)}B` : '—'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Arbitrage Signals */}
      <div>
        <h2 className="font-display text-lg text-navy mb-4">Arbitrage & Intelligence Signals</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {signals.map((s, i) => (
            <SignalCard key={i} signal={s} />
          ))}
        </div>
      </div>
    </div>
  )
}
