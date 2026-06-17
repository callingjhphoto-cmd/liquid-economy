import React from 'react'

export default function MetricCard({ label, value, sublabel, icon: Icon, color = 'text-editorial', bgColor = 'bg-blue-50' }) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">{label}</p>
          <p className={`text-2xl font-bold mt-1 ${color}`}>{value ?? '—'}</p>
          {sublabel && <p className="text-xs text-gray-500 mt-1">{sublabel}</p>}
        </div>
        {Icon && (
          <div className={`${bgColor} p-2.5 rounded-lg`}>
            <Icon size={20} className={color} />
          </div>
        )}
      </div>
    </div>
  )
}

export function AlertCard({ alert, onAcknowledge }) {
  const severityStyles = {
    critical: 'border-l-red-500 bg-red-50',
    warning: 'border-l-amber-500 bg-amber-50',
    info: 'border-l-blue-500 bg-blue-50',
  }

  return (
    <div className={`border-l-4 rounded-r-lg p-4 ${severityStyles[alert.severity] || severityStyles.info}`}>
      <div className="flex justify-between items-start">
        <div>
          <p className="font-semibold text-sm text-navy">{alert.title}</p>
          <p className="text-xs text-gray-600 mt-1">{alert.message}</p>
        </div>
        {onAcknowledge && (
          <button onClick={() => onAcknowledge(alert.id)}
            className="text-xs text-gray-500 hover:text-gray-600 ml-4 whitespace-nowrap">
            Dismiss
          </button>
        )}
      </div>
    </div>
  )
}

export function SignalCard({ signal }) {
  const sevColors = {
    critical: 'bg-red-100 text-red-700',
    high: 'bg-orange-100 text-orange-700',
    medium: 'bg-amber-100 text-amber-700',
    low: 'bg-gray-100 text-gray-600',
  }

  return (
    <div className="bg-white rounded-lg border border-gray-100 p-4">
      <div className="flex items-center gap-2 mb-2">
        <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${sevColors[signal.severity] || sevColors.medium}`}>
          {signal.severity}
        </span>
        <span className="text-xs text-gray-500">{signal.type}</span>
      </div>
      <p className="font-semibold text-sm text-navy">{signal.company}</p>
      <p className="text-xs text-gray-600 mt-1">{signal.description}</p>
    </div>
  )
}
