import React, { useState, useMemo } from 'react'
import {
  BarChart3, TrendingUp, Package, DollarSign, Calendar,
  ChevronRight, Zap, AlertTriangle, RefreshCw
} from 'lucide-react'
import {
  LineChart, Line, BarChart, Bar, ResponsiveContainer, XAxis, YAxis,
  Tooltip, CartesianGrid, Legend, ComposedChart, Area
} from 'recharts'
import {
  Card, PageHeader, SubPageNav, Badge
} from '../components/ui'
import { CHART_COLORS } from '../data/chartColors'

const SEASONALITY_PROFILES = {
  standard: { label: 'Standard Spirits', factors: [0.75, 0.70, 0.85, 0.90, 0.95, 1.05, 1.10, 1.00, 0.95, 1.05, 1.30, 1.40] },
  summer: { label: 'Summer Spirits (Gin, Tequila, RTD)', factors: [0.65, 0.70, 0.85, 1.00, 1.20, 1.35, 1.40, 1.30, 1.05, 0.85, 0.80, 0.85] },
  winter: { label: 'Winter Spirits (Whisky, Cognac)', factors: [0.90, 0.80, 0.75, 0.70, 0.75, 0.80, 0.85, 0.85, 0.90, 1.10, 1.40, 1.50] },
  champagne: { label: 'Champagne & Sparkling', factors: [0.60, 0.70, 0.80, 0.85, 0.90, 1.00, 1.10, 0.90, 0.85, 0.95, 1.50, 1.85] },
  flat: { label: 'No Seasonality', factors: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1] },
}

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

function InputGroup({ label, value, onChange, type = 'number', placeholder, suffix, min }) {
  return (
    <div>
      <label className="block text-xs font-semibold text-navy mb-1">{label}</label>
      <div className="relative">
        <input
          type={type}
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder={placeholder}
          min={min}
          className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-gold/50 focus:border-gold"
        />
        {suffix && <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400">{suffix}</span>}
      </div>
    </div>
  )
}

export default function DepletionForecasting() {
  const [distPoints, setDistPoints] = useState('150')
  const [rateOfSale, setRateOfSale] = useState('2.5')
  const [seasonality, setSeasonality] = useState('standard')
  const [pricePerCase, setPricePerCase] = useState('120')
  const [casesPerReorder, setCasesPerReorder] = useState('50')
  const [growthRate, setGrowthRate] = useState('5')

  const numDist = parseInt(distPoints) || 0
  const numROS = parseFloat(rateOfSale) || 0
  const numPrice = parseFloat(pricePerCase) || 0
  const numReorder = parseInt(casesPerReorder) || 50
  const numGrowth = parseFloat(growthRate) || 0
  const profile = SEASONALITY_PROFILES[seasonality]

  const forecast = useMemo(() => {
    if (!numDist || !numROS) return []

    const monthlyBase = numDist * numROS
    return MONTHS.map((month, i) => {
      const seasonFactor = profile.factors[i]
      const growthFactor = 1 + (numGrowth / 100) * (i / 12)
      const depletions = Math.round(monthlyBase * seasonFactor * growthFactor)
      const revenue = depletions * numPrice
      const reordersNeeded = Math.ceil(depletions / numReorder)

      return {
        month,
        depletions,
        revenue,
        reordersNeeded,
        cumulativeDepletions: 0,
        cumulativeRevenue: 0,
      }
    })
  }, [numDist, numROS, numPrice, numReorder, numGrowth, profile])

  // Calculate cumulative
  let cumDep = 0, cumRev = 0
  forecast.forEach(f => {
    cumDep += f.depletions
    cumRev += f.revenue
    f.cumulativeDepletions = cumDep
    f.cumulativeRevenue = cumRev
  })

  const annualDepletions = forecast.reduce((s, f) => s + f.depletions, 0)
  const annualRevenue = forecast.reduce((s, f) => s + f.revenue, 0)
  const avgMonthly = Math.round(annualDepletions / 12)
  const peakMonth = forecast.reduce((max, f) => f.depletions > max.depletions ? f : max, forecast[0] || { month: '-', depletions: 0 })
  const totalReorders = forecast.reduce((s, f) => s + f.reordersNeeded, 0)

  return (
    <div className="max-w-7xl mx-auto">
      <SubPageNav group="planning" />
      <PageHeader
        title="Depletion Forecasting"
        subtitle="Project annual depletions, revenue, and reorder schedules"
        icon={<BarChart3 size={20} />}
      />

      {/* Inputs */}
      <Card className="p-6 mb-6">
        <h3 className="text-sm font-bold text-navy mb-4">Forecast Parameters</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          <InputGroup label="Distribution Points" value={distPoints} onChange={setDistPoints} placeholder="150" suffix="outlets" min="1" />
          <InputGroup label="Rate of Sale" value={rateOfSale} onChange={setRateOfSale} placeholder="2.5" suffix="cases/mo" min="0.1" />
          <div>
            <label className="block text-xs font-semibold text-navy mb-1">Seasonality</label>
            <select
              value={seasonality}
              onChange={e => setSeasonality(e.target.value)}
              className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm"
            >
              {Object.entries(SEASONALITY_PROFILES).map(([key, p]) => (
                <option key={key} value={key}>{p.label}</option>
              ))}
            </select>
          </div>
          <InputGroup label="Price Per Case" value={pricePerCase} onChange={setPricePerCase} placeholder="120" suffix="\u00a3" min="1" />
          <InputGroup label="Cases Per Reorder" value={casesPerReorder} onChange={setCasesPerReorder} placeholder="50" suffix="cases" min="1" />
          <InputGroup label="Annual Growth" value={growthRate} onChange={setGrowthRate} placeholder="5" suffix="%" />
        </div>
      </Card>

      {/* Key metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        <Card className="p-4 text-center">
          <div className="text-xs text-gray-500 mb-1">Annual Depletions</div>
          <div className="text-xl font-bold text-navy">{annualDepletions.toLocaleString()}</div>
          <div className="text-xs text-gray-400">cases</div>
        </Card>
        <Card className="p-4 text-center">
          <div className="text-xs text-gray-500 mb-1">Annual Revenue</div>
          <div className="text-xl font-bold text-navy">{'\u00a3'}{annualRevenue.toLocaleString()}</div>
          <div className="text-xs text-gray-400">forecast</div>
        </Card>
        <Card className="p-4 text-center">
          <div className="text-xs text-gray-500 mb-1">Peak Month</div>
          <div className="text-xl font-bold text-navy">{peakMonth.month}</div>
          <div className="text-xs text-gray-400">{peakMonth.depletions.toLocaleString()} cases</div>
        </Card>
        <Card className="p-4 text-center">
          <div className="text-xs text-gray-500 mb-1">Total Reorders</div>
          <div className="text-xl font-bold text-navy">{totalReorders}</div>
          <div className="text-xs text-gray-400">per year</div>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
        <Card className="p-4">
          <h3 className="text-sm font-bold text-navy mb-3">Monthly Depletions</h3>
          <ResponsiveContainer width="100%" height={250}>
            <ComposedChart data={forecast}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} />
              <YAxis yAxisId="left" tick={{ fontSize: 11 }} />
              <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 11 }} />
              <Tooltip formatter={(v, name) => name === 'revenue' ? `\u00a3${v.toLocaleString()}` : v.toLocaleString()} />
              <Legend wrapperStyle={{ fontSize: 11 }} />
              <Bar yAxisId="left" dataKey="depletions" name="Cases" fill={CHART_COLORS.primary} radius={[4, 4, 0, 0]} />
              <Line yAxisId="right" type="monotone" dataKey="revenue" name="Revenue" stroke={CHART_COLORS.accent} strokeWidth={2} dot={false} />
            </ComposedChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-4">
          <h3 className="text-sm font-bold text-navy mb-3">Cumulative Depletions</h3>
          <ResponsiveContainer width="100%" height={250}>
            <ComposedChart data={forecast}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip formatter={v => v.toLocaleString()} />
              <Area type="monotone" dataKey="cumulativeDepletions" fill={CHART_COLORS.primary + '20'} stroke="none" legendType="none" />
              <Line type="monotone" dataKey="cumulativeDepletions" name="Cumulative Cases" stroke={CHART_COLORS.primary} strokeWidth={2} dot={{ r: 3 }} />
            </ComposedChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Reorder schedule */}
      <Card className="p-4 mb-6">
        <h3 className="text-sm font-bold text-navy mb-3">Reorder Schedule</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-2 text-xs font-semibold text-gray-500">Month</th>
                <th className="text-right py-2 text-xs font-semibold text-gray-500">Depletions</th>
                <th className="text-right py-2 text-xs font-semibold text-gray-500">Revenue</th>
                <th className="text-right py-2 text-xs font-semibold text-gray-500">Reorders</th>
                <th className="text-right py-2 text-xs font-semibold text-gray-500">Cumulative</th>
              </tr>
            </thead>
            <tbody>
              {forecast.map((f, i) => (
                <tr key={i} className="border-b border-gray-50">
                  <td className="py-2 font-medium text-navy">{f.month}</td>
                  <td className="py-2 text-right text-gray-600">{f.depletions.toLocaleString()}</td>
                  <td className="py-2 text-right text-gray-600">{'\u00a3'}{f.revenue.toLocaleString()}</td>
                  <td className="py-2 text-right">
                    <Badge>{f.reordersNeeded}x {numReorder} cases</Badge>
                  </td>
                  <td className="py-2 text-right text-gray-600">{f.cumulativeDepletions.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="border-t border-gray-300 font-bold">
                <td className="py-2 text-navy">Total</td>
                <td className="py-2 text-right text-navy">{annualDepletions.toLocaleString()}</td>
                <td className="py-2 text-right text-navy">{'\u00a3'}{annualRevenue.toLocaleString()}</td>
                <td className="py-2 text-right text-navy">{totalReorders} reorders</td>
                <td className="py-2 text-right text-navy">{annualDepletions.toLocaleString()}</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </Card>

      <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg text-xs text-amber-800">
        <strong>Note:</strong> Forecasts are estimates based on inputs provided. Actual depletions depend on marketing spend, distribution quality, competition, and market conditions. Use as a planning tool, not a guarantee.
      </div>
    </div>
  )
}
