import React from 'react'
import { AlertTriangle, Info, WifiOff, AlertCircle } from 'lucide-react'

const ICON_MAP = {
  info: Info,
  warning: AlertTriangle,
  error: AlertCircle,
  offline: WifiOff,
}

const STYLES = {
  info: 'bg-blue-50 border-blue-200 text-blue-800',
  warning: 'bg-amber-50 border-amber-200 text-amber-800',
  error: 'bg-red-50 border-red-200 text-red-800',
  offline: 'bg-gray-50 border-gray-200 text-gray-600',
}

export function StatusNotice({ type = 'info', title, message, actions }) {
  const Icon = ICON_MAP[type] || Info

  return (
    <div className={`border rounded-xl p-4 ${STYLES[type]} flex items-start gap-3`}>
      <Icon size={18} className="flex-shrink-0 mt-0.5" />
      <div>
        {title && <p className="font-medium text-small">{title}</p>}
        <p className="text-caption">{message}</p>
        {actions && <div className="mt-2 flex gap-2">{actions}</div>}
      </div>
    </div>
  )
}
