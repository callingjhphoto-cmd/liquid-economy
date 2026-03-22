import React, { useState } from 'react'
import { TrendingUp, TrendingDown, Copy, Check } from 'lucide-react'
import { AreaChart, Area, ResponsiveContainer } from 'recharts'

/**
 * Hero KPI metric card — Bento Box style.
 * Shows label, value, change indicator, optional sparkline.
 * Clickable → routes to relevant page.
 */
export function MetricCard({
  label,
  value,
  change,
  direction = 'up',
  subtitle,
  icon: Icon,
  sparkData,
  onClick,
  className = '',
}) {
  const [copied, setCopied] = useState(false)
  const isUp = direction === 'up'
  const changeColor = isUp ? 'text-emerald-600' : 'text-red-500'
  const TrendIcon = isUp ? TrendingUp : TrendingDown
  const sparkColor = isUp ? '#059669' : '#DC2626'

  const handleCopy = (e) => {
    e.stopPropagation()
    const text = `${label}: ${value}${change ? ` (${change})` : ''}`
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    })
  }

  return (
    <div
      onClick={onClick}
      className={`bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-5 relative group ${onClick ? 'hover:shadow-md hover:border-gray-200 transition-all cursor-pointer touch-manipulation' : ''} ${className}`}
    >
      <button
        onClick={handleCopy}
        className="absolute top-2 right-2 p-1.5 rounded-md opacity-0 group-hover:opacity-100 hover:bg-gray-100 text-gray-400 hover:text-navy transition-all z-10"
        title={copied ? 'Copied!' : 'Copy metric'}
        aria-label="Copy metric to clipboard"
      >
        {copied ? <Check size={12} className="text-emerald-500" /> : <Copy size={12} />}
      </button>

      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          {Icon && (
            <div className="p-2 rounded-lg bg-gray-50">
              <Icon size={16} className="text-navy" />
            </div>
          )}
          <span className="text-label text-gray-500 uppercase tracking-wide">{label}</span>
        </div>
        {sparkData && sparkData.length > 0 && (
          <div className="w-16 h-8">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={sparkData} accessibilityLayer>
                <Area
                  type="monotone"
                  dataKey="v"
                  stroke={sparkColor}
                  fill={sparkColor}
                  fillOpacity={0.1}
                  strokeWidth={1.5}
                  dot={false}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>

      <div className="flex items-baseline gap-2 mb-1">
        <span className="text-2xl font-bold text-navy">{value}</span>
        {change && (
          <span className={`flex items-center gap-0.5 text-xs font-semibold ${changeColor}`}>
            <TrendIcon size={12} />
            {change}
          </span>
        )}
      </div>

      {subtitle && (
        <p className="text-xs text-gray-500">{subtitle}</p>
      )}
    </div>
  )
}

/**
 * Compact metric — for inline/row displays.
 */
export function MetricInline({ label, value, change, direction = 'up' }) {
  const isUp = direction === 'up'
  return (
    <div className="flex items-center justify-between py-2">
      <span className="text-sm text-gray-600">{label}</span>
      <div className="flex items-center gap-2">
        <span className="text-sm font-semibold text-navy">{value}</span>
        {change && (
          <span className={`text-xs font-medium ${isUp ? 'text-emerald-600' : 'text-red-500'}`}>
            {change}
          </span>
        )}
      </div>
    </div>
  )
}
