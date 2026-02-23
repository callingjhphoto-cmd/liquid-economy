import React, { useState, useEffect } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts'
import { api } from '../lib/api'

const COLORS = { usa: '#2B6CB0', uk: '#C53030', eu: '#38A169', me: '#C9A96E' }

export default function BrandPricing() {
  const [pricing, setPricing] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')
  const [sortBy, setSortBy] = useState('premium_index')

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      const data = await api.getPricing()
      setPricing(data || [])
    } catch (e) {
      console.error('Failed to load pricing:', e)
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

  const categories = ['all', ...new Set(pricing.map(p => p.category))]

  let filtered = filter === 'all' ? pricing : pricing.filter(p => p.category === filter)
  filtered = [...filtered].sort((a, b) => (b[sortBy] || 0) - (a[sortBy] || 0))

  // Top 10 by premium index for chart
  const chartData = [...pricing]
    .sort((a, b) => (b.premium_index || 0) - (a.premium_index || 0))
    .slice(0, 12)
    .map(p => ({
      name: `${p.brand} ${p.expression}`.slice(0, 25),
      index: Math.round((p.premium_index || 0) * 100),
    }))

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-2xl text-navy">Brand Pricing Monitor</h1>
        <p className="text-gray-500 text-sm mt-1">RRP comparison across USA, UK, Europe, and Middle East</p>
      </div>

      {/* Premium Index Chart */}
      {chartData.length > 0 && (
        <div className="bg-white rounded-xl border border-gray-100 p-6">
          <h2 className="font-display text-lg text-navy mb-4">Highest Premium Index (price spread %)</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData} layout="vertical" margin={{ left: 120 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
              <XAxis type="number" tick={{ fontSize: 11 }} unit="%" />
              <YAxis type="category" dataKey="name" tick={{ fontSize: 11 }} width={120} />
              <Tooltip formatter={(v) => `${v}%`} contentStyle={{ fontSize: 12, borderRadius: 8 }} />
              <Bar dataKey="index" radius={[0, 4, 4, 0]}>
                {chartData.map((_, i) => (
                  <Cell key={i} fill={i < 3 ? '#C53030' : i < 6 ? '#DD6B20' : '#C9A96E'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Filters */}
      <div className="flex gap-2 flex-wrap">
        {categories.map(cat => (
          <button key={cat} onClick={() => setFilter(cat)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors capitalize
              ${filter === cat ? 'bg-navy text-white' : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'}`}>
            {cat}
          </button>
        ))}
      </div>

      {/* Pricing Table */}
      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-navy text-white">
              <tr>
                <th className="text-left px-4 py-3 font-medium">Company</th>
                <th className="text-left px-4 py-3 font-medium">Brand</th>
                <th className="text-left px-4 py-3 font-medium">Expression</th>
                <th className="text-left px-4 py-3 font-medium">Category</th>
                <th className="text-right px-4 py-3 font-medium">
                  <span className="text-blue-300">USA ($)</span>
                </th>
                <th className="text-right px-4 py-3 font-medium">
                  <span className="text-red-300">UK (£)</span>
                </th>
                <th className="text-right px-4 py-3 font-medium">
                  <span className="text-green-300">EU (€)</span>
                </th>
                <th className="text-right px-4 py-3 font-medium">
                  <span className="text-yellow-300">ME ($)</span>
                </th>
                <th className="text-right px-4 py-3 font-medium cursor-pointer hover:text-gold"
                  onClick={() => setSortBy('differential')}>
                  Spread
                </th>
                <th className="text-right px-4 py-3 font-medium cursor-pointer hover:text-gold"
                  onClick={() => setSortBy('premium_index')}>
                  Premium %
                </th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((row, i) => (
                <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <td className="px-4 py-3 text-gray-500 text-xs">{row.company}</td>
                  <td className="px-4 py-3 font-medium text-navy">{row.brand}</td>
                  <td className="px-4 py-3 text-gray-600">{row.expression}</td>
                  <td className="px-4 py-3">
                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">{row.category}</span>
                  </td>
                  <td className="px-4 py-3 text-right font-mono">{row.usa ? `$${row.usa}` : '—'}</td>
                  <td className="px-4 py-3 text-right font-mono">{row.uk ? `£${row.uk}` : '—'}</td>
                  <td className="px-4 py-3 text-right font-mono">{row.eu ? `€${row.eu}` : '—'}</td>
                  <td className="px-4 py-3 text-right font-mono">{row.me ? `$${row.me}` : '—'}</td>
                  <td className="px-4 py-3 text-right font-semibold">${row.differential || 0}</td>
                  <td className="px-4 py-3 text-right">
                    <span className={`font-semibold ${row.premium_index > 0.5 ? 'text-accent-red' : row.premium_index > 0.2 ? 'text-accent-orange' : 'text-gray-600'}`}>
                      {row.premium_index ? `${Math.round(row.premium_index * 100)}%` : '—'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
