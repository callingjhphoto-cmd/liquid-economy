import React, { useState, useMemo } from 'react'
import {
  Activity, TrendingUp, TrendingDown, Minus, Search, BarChart3,
  Heart, MessageCircle, Eye, Share2, ChevronDown, Zap, Star
} from 'lucide-react'
import {
  LineChart, Line, ResponsiveContainer, XAxis, YAxis, Tooltip,
  CartesianGrid, BarChart, Bar, Cell, PieChart, Pie
} from 'recharts'
import {
  Card, PageHeader, SubPageNav, Badge, SectionHeader
} from '../components/ui'
import { TRACKABLE_BRANDS, BRAND_HEALTH_DATA, DEFAULT_BRAND_DATA } from '../data/brandHealthData'
import { CHART_COLORS, CATEGORICAL } from '../data/chartColors'

function MetricBox({ label, value, subValue, trend, color }) {
  const TrendIcon = trend === 'up' ? TrendingUp : trend === 'down' ? TrendingDown : Minus
  const trendColor = trend === 'up' ? 'text-green-600' : trend === 'down' ? 'text-red-500' : 'text-gray-500'
  return (
    <Card className="p-4">
      <div className="text-xs text-gray-500 mb-1">{label}</div>
      <div className="text-xl font-bold text-navy">{value}</div>
      <div className="flex items-center gap-1 mt-1">
        <TrendIcon size={12} className={trendColor} />
        <span className={`text-xs font-medium ${trendColor}`}>{subValue}</span>
      </div>
    </Card>
  )
}

function SentimentGauge({ value }) {
  const color = value >= 80 ? '#22c55e' : value >= 60 ? '#C9A96E' : value >= 40 ? '#f59e0b' : '#ef4444'
  const label = value >= 80 ? 'Very Positive' : value >= 60 ? 'Positive' : value >= 40 ? 'Neutral' : 'Negative'
  return (
    <div className="text-center">
      <div className="relative w-20 h-20 mx-auto">
        <svg viewBox="0 0 36 36" className="w-full h-full">
          <path d="M18 2.0845a 15.9155 15.9155 0 0 1 0 31.831a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#e5e7eb" strokeWidth="3" />
          <path d="M18 2.0845a 15.9155 15.9155 0 0 1 0 31.831a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke={color} strokeWidth="3" strokeDasharray={`${value}, 100`} strokeLinecap="round" />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-lg font-bold" style={{ color }}>{value}</span>
        </div>
      </div>
      <div className="text-xs font-medium mt-1" style={{ color }}>{label}</div>
    </div>
  )
}

export default function BrandHealth() {
  const [selectedBrand, setSelectedBrand] = useState('patron')
  const [searchQuery, setSearchQuery] = useState('')
  const [chartMetric, setChartMetric] = useState('socialMentions')

  const brand = TRACKABLE_BRANDS.find(b => b.id === selectedBrand) || TRACKABLE_BRANDS[0]
  const data = BRAND_HEALTH_DATA[selectedBrand] || DEFAULT_BRAND_DATA

  const filteredBrands = useMemo(() => {
    if (!searchQuery) return TRACKABLE_BRANDS
    return TRACKABLE_BRANDS.filter(b =>
      b.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.parent.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }, [searchQuery])

  const chartLabels = { socialMentions: 'Social Mentions', searchTrend: 'Search Trend Index', reviewSentiment: 'Review Sentiment' }

  return (
    <div className="max-w-7xl mx-auto">
      <SubPageNav group="intelligence" />
      <PageHeader
        title="Brand Health Monitor"
        subtitle="Track brand performance across social, search, and reviews"
        icon={<Activity size={20} />}
      />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Brand selector sidebar */}
        <div className="lg:col-span-1">
          <Card className="p-4">
            <div className="relative mb-3">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search brands..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm"
              />
            </div>
            <div className="space-y-1 max-h-[500px] overflow-y-auto">
              {filteredBrands.map(b => (
                <button
                  key={b.id}
                  onClick={() => setSelectedBrand(b.id)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${selectedBrand === b.id ? 'bg-navy/5 text-navy font-medium' : 'text-gray-600 hover:bg-gray-50'}`}
                >
                  <div className="font-medium">{b.name}</div>
                  <div className="text-xs text-gray-400">{b.category} {'\u2022'} {b.parent}</div>
                </button>
              ))}
            </div>
          </Card>
        </div>

        {/* Main content */}
        <div className="lg:col-span-3 space-y-4">
          {/* Header */}
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-navy rounded-xl flex items-center justify-center">
                <Star size={20} className="text-white" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-navy">{brand.name}</h2>
                <p className="text-sm text-gray-500">{brand.parent} {'\u2022'} {brand.category.charAt(0).toUpperCase() + brand.category.slice(1)}</p>
              </div>
            </div>
          </Card>

          {/* Key metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <MetricBox label="Total Mentions" value={data.totalMentions} subValue="12-month total" trend={data.trendDirection} />
            <MetricBox label="Avg Sentiment" value={`${data.avgSentiment}/100`} subValue={data.avgSentiment >= 80 ? 'Very Positive' : 'Positive'} trend={data.avgSentiment >= 80 ? 'up' : 'stable'} />
            <MetricBox label="Share of Voice" value={`${data.shareOfVoice}%`} subValue="vs category" trend={data.shareOfVoice >= 25 ? 'up' : 'stable'} />
            <MetricBox label="Trend" value={data.trendDirection === 'up' ? 'Growing' : 'Stable'} subValue="12-month direction" trend={data.trendDirection} />
          </div>

          {/* Line chart */}
          <Card className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-navy">{chartLabels[chartMetric]} \u2014 12 Month Trend</h3>
              <div className="flex gap-1">
                {Object.entries(chartLabels).map(([key, label]) => (
                  <button
                    key={key}
                    onClick={() => setChartMetric(key)}
                    className={`px-2 py-1 rounded text-xs font-medium ${chartMetric === key ? 'bg-navy text-white' : 'bg-gray-100 text-gray-600'}`}
                  >
                    {label.split(' ')[0]}
                  </button>
                ))}
              </div>
            </div>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={data[chartMetric]}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip contentStyle={{ background: '#1e293b', border: 'none', borderRadius: 8, fontSize: 11 }} labelStyle={{ color: '#f1f5f9' }} itemStyle={{ color: '#f1f5f9' }} />
                <Line type="monotone" dataKey="value" stroke={CHART_COLORS.primary} strokeWidth={2} dot={{ r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </Card>

          {/* Source breakdown */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Card className="p-4">
              <h3 className="text-sm font-bold text-navy mb-3">Mention Sources</h3>
              <div className="space-y-2">
                {data.topMentionSources.map((s, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-20 text-xs font-medium text-gray-600">{s.source}</div>
                    <div className="flex-1 h-5 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full"
                        style={{ width: `${s.share}%`, backgroundColor: CATEGORICAL[i % CATEGORICAL.length] }}
                      />
                    </div>
                    <div className="w-10 text-xs text-right font-medium text-navy">{s.share}%</div>
                    <div className={`w-10 text-xs text-right font-medium ${s.trend.startsWith('+') ? 'text-green-600' : 'text-red-500'}`}>{s.trend}</div>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-4">
              <h3 className="text-sm font-bold text-navy mb-3">Sentiment Analysis</h3>
              <SentimentGauge value={data.avgSentiment} />
              <div className="mt-4 space-y-2">
                <h4 className="text-xs font-semibold text-navy">Recent Highlights</h4>
                {data.recentHighlights.map((h, i) => (
                  <div key={i} className="flex gap-2">
                    <Zap size={12} className="text-gold mt-0.5 flex-shrink-0" />
                    <span className="text-xs text-gray-600">{h}</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Data notice */}
          <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg text-xs text-amber-800">
            <strong>Note:</strong> Brand health data shown is mock/demonstration data generated for platform preview purposes. Live data integration via social listening APIs and Google Trends is planned for Pro tier.
          </div>
        </div>
      </div>
    </div>
  )
}
