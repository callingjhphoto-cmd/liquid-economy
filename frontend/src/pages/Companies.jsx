import React, { useState, useEffect } from 'react'
import { api } from '../lib/api'

export default function Companies() {
  const [companies, setCompanies] = useState([])
  const [selected, setSelected] = useState(null)
  const [detail, setDetail] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadCompanies()
  }, [])

  const loadCompanies = async () => {
    try {
      const data = await api.getCompanies()
      setCompanies(data || [])
    } catch (e) {
      console.error('Failed to load companies:', e)
    }
    setLoading(false)
  }

  const loadDetail = async (id) => {
    setSelected(id)
    try {
      const data = await api.getCompany(id)
      setDetail(data)
    } catch (e) {
      console.error('Failed to load company:', e)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-navy" />
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-2xl text-navy">Company Profiles</h1>
        <p className="text-gray-500 text-sm mt-1">20 tracked companies across the beverage alcohol sector</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Company List */}
        <div className="space-y-2">
          {companies.map(co => (
            <button key={co.id} onClick={() => loadDetail(co.id)}
              className={`w-full text-left px-4 py-3 rounded-xl border transition-all
                ${selected === co.id ? 'bg-navy text-white border-navy shadow-lg' : 'bg-white border-gray-100 hover:border-gold hover:shadow-sm'}`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className={`font-semibold text-sm ${selected === co.id ? 'text-white' : 'text-navy'}`}>
                    {co.name}
                  </p>
                  <p className={`text-xs ${selected === co.id ? 'text-gray-300' : 'text-gray-500'}`}>
                    {co.ticker || 'Private'} · {co.hq_country}
                  </p>
                </div>
                {co.latest_valuation?.pe_ttm && (
                  <span className={`text-xs font-bold px-2 py-0.5 rounded-full
                    ${selected === co.id ? 'bg-white/20 text-white' : 'bg-blue-50 text-editorial'}`}>
                    {co.latest_valuation.pe_ttm.toFixed(1)}x
                  </span>
                )}
              </div>
            </button>
          ))}
        </div>

        {/* Company Detail */}
        <div className="lg:col-span-2">
          {detail ? (
            <div className="space-y-6">
              {/* Header */}
              <div className="bg-white rounded-xl border border-gray-100 p-6">
                <h2 className="font-display text-xl text-navy">{detail.company.name}</h2>
                <div className="flex flex-wrap gap-4 mt-3 text-sm text-gray-600">
                  <span>Ticker: <strong>{detail.company.ticker || 'Private'}</strong></span>
                  <span>HQ: <strong>{detail.company.hq_country}</strong></span>
                  <span>FY End: <strong>{detail.company.fiscal_year_end}</strong></span>
                  <span>Cap Tier: <strong>{detail.company.market_cap_tier || 'N/A'}</strong></span>
                </div>
                <p className="text-sm text-gray-500 mt-3">
                  <strong>Key Brands:</strong> {detail.company.key_brands}
                </p>
                {detail.company.ir_url && (
                  <a href={detail.company.ir_url} target="_blank" rel="noopener noreferrer"
                    className="text-sm text-editorial hover:underline mt-2 inline-block">
                    IR Portal →
                  </a>
                )}
              </div>

              {/* Brands & Pricing */}
              {detail.brands?.length > 0 && (
                <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
                  <div className="p-5 border-b border-gray-100">
                    <h3 className="font-display text-lg text-navy">Brand Portfolio & Pricing</h3>
                  </div>
                  <table className="w-full text-sm">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="text-left px-4 py-2.5 text-xs font-medium text-gray-500">Brand</th>
                        <th className="text-left px-4 py-2.5 text-xs font-medium text-gray-500">Expression</th>
                        <th className="text-left px-4 py-2.5 text-xs font-medium text-gray-500">Category</th>
                        <th className="text-right px-4 py-2.5 text-xs font-medium text-gray-500">USA</th>
                        <th className="text-right px-4 py-2.5 text-xs font-medium text-gray-500">UK</th>
                        <th className="text-right px-4 py-2.5 text-xs font-medium text-gray-500">EU</th>
                        <th className="text-right px-4 py-2.5 text-xs font-medium text-gray-500">ME</th>
                      </tr>
                    </thead>
                    <tbody>
                      {detail.brands.map((b, i) => (
                        <tr key={b.id} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                          <td className="px-4 py-2.5 font-medium text-navy">{b.name}</td>
                          <td className="px-4 py-2.5 text-gray-600">{b.expression}</td>
                          <td className="px-4 py-2.5">
                            <span className="text-xs bg-gray-100 px-2 py-0.5 rounded">{b.category}</span>
                          </td>
                          <td className="px-4 py-2.5 text-right font-mono">{b.latest_price?.usa ? `$${b.latest_price.usa}` : '—'}</td>
                          <td className="px-4 py-2.5 text-right font-mono">{b.latest_price?.uk ? `£${b.latest_price.uk}` : '—'}</td>
                          <td className="px-4 py-2.5 text-right font-mono">{b.latest_price?.eu ? `€${b.latest_price.eu}` : '—'}</td>
                          <td className="px-4 py-2.5 text-right font-mono">{b.latest_price?.me ? `$${b.latest_price.me}` : '—'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* Recent Filings */}
              {detail.filings?.length > 0 && (
                <div className="bg-white rounded-xl border border-gray-100 p-5">
                  <h3 className="font-display text-lg text-navy mb-3">Recent Filings</h3>
                  <div className="space-y-2">
                    {detail.filings.slice(0, 10).map((f, i) => (
                      <div key={i} className="flex items-center gap-3 py-2 border-b border-gray-50 last:border-0">
                        <span className="text-xs font-bold bg-blue-50 text-editorial px-2 py-0.5 rounded">
                          {f.type}
                        </span>
                        <span className="text-xs text-gray-400">{f.date}</span>
                        {f.url ? (
                          <a href={f.url} target="_blank" rel="noopener noreferrer"
                            className="text-xs text-editorial hover:underline ml-auto">
                            View →
                          </a>
                        ) : (
                          <span className="text-xs text-gray-300 ml-auto">{f.title}</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center justify-center h-64 text-gray-400">
              Select a company to view its profile
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
