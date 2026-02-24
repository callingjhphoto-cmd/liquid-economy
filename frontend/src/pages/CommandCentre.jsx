import React, { useState, useEffect } from 'react'
import { TrendingUp, Activity, AlertTriangle, Calendar, FileText, Play } from 'lucide-react'
import { api } from '../lib/api'
import { MetricCard, AlertCard, SignalCard } from '../components/MetricCard'
import KeyMetricsWatchlist from '../components/KeyMetricsWatchlist'

export default function CommandCentre() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [collecting, setCollecting] = useState(null)

  useEffect(() => { loadData() }, [])

  const loadData = async () => {
    try {
      const summary = await api.getSummary()
      setData(summary)
    } catch (err) {
      console.error('Failed to load dashboard:', err)
    }
    setLoading(false)
  }

  const handleCollect = async (name) => {
    setCollecting(name)
    try {
      await api.runCollector(name)
      await loadData()
    } catch (err) {
      console.error(`Collector failed:`, name, err)
    }
    setCollecting(null)
  }

  const handleAcknowledge = async (id) => {
    await api.acknowledgeAlert(id)
    loadData()
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
      {/* Header */}
      <div>
        <h1 className="font-display text-2xl text-navy">Command Centre</h1>
        <p className="text-gray-500 text-sm mt-1">Beverage alcohol market intelligence at a glance</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          label="Sector Avg P/E"
          value={data?.sector_avg_pe ? `${data.sector_avg_pe}x` : '—'}
          sublabel="Across 14 public companies"
          icon={TrendingUp}
          color="text-editorial"
          bgColor="bg-blue-50"
        />
        <MetricCard
          label="Companies Tracked"
          value={data?.companies_tracked}
          sublabel="14 public + 6 private"
          icon={Activity}
          color="text-accent-green"
          bgColor="bg-green-50"
        />
        <MetricCard
          label="Glass PPI"
          value={data?.glass_ppi?.value || '—'}
          sublabel={data?.glass_ppi?.period ? `Period: ${data.glass_ppi.period}` : 'No data yet'}
          icon={TrendingUp}
          color="text-accent-orange"
          bgColor="bg-orange-50"
        />
        <MetricCard
          label="Active Alerts"
          value={data?.alerts?.length}
          sublabel="Unacknowledged"
          icon={AlertTriangle}
          color={data?.alerts?.length > 0 ? 'text-accent-red' : 'text-gray-400'}
          bgColor={data?.alerts?.length > 0 ? 'bg-red-50' : 'bg-gray-50'}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Alerts */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="font-display text-lg text-navy flex items-center gap-2">
            <AlertTriangle size={18} className="text-accent-orange" />
            Active Alerts
          </h2>
          {data?.alerts?.length > 0 ? (
            <div className="space-y-3">
              {data.alerts.map((alert) => (
                <AlertCard key={alert.id} alert={alert} onAcknowledge={handleAcknowledge} />
              ))}
            </div>
          ) : (
            <div className="bg-green-50 border border-green-100 rounded-lg p-4 text-sm text-green-700">
              No active alerts. All clear.
            </div>
          )}

          {/* Critical Signals */}
          <h2 className="font-display text-lg text-navy flex items-center gap-2 mt-6">
            <Activity size={18} className="text-accent-red" />
            High-Priority Signals
          </h2>
          {data?.critical_signals?.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {data.critical_signals.map((signal) => (
                <SignalCard key={signal.id} signal={signal} />
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-400">No high-priority signals at this time.</p>
          )}
        </div>

        {/* Right column */}
        <div className="space-y-6">
          {/* Upcoming Events */}
          <div>
            <h2 className="font-display text-lg text-navy flex items-center gap-2 mb-3">
              <Calendar size={18} className="text-gold" />
              Upcoming Events
            </h2>
            <div className="bg-white rounded-xl border border-gray-100 divide-y divide-gray-50">
              {data?.upcoming_events?.length > 0 ? (
                data.upcoming_events.map((evt, i) => (
                  <div key={i} className="p-3">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-gold bg-gold/10 px-2 py-0.5 rounded">{evt.date}</span>
                      <span className="text-xs text-gray-400">{evt.type}</span>
                    </div>
                    <div className="text-sm font-medium text-navy mt-1">{evt.company}</div>
                    <p className="text-xs text-gray-500">{evt.description}</p>
                  </div>
                ))
              ) : (
                <p className="p-3 text-sm text-gray-400">No upcoming events in the next 30 days.</p>
              )}
            </div>
          </div>

          {/* Recent Filings */}
          <div>
            <h2 className="font-display text-lg text-navy flex items-center gap-2 mb-3">
              <FileText size={18} className="text-editorial" />
              Recent Filings
            </h2>
            <div className="bg-white rounded-xl border border-gray-100 divide-y divide-gray-50">
              {data?.recent_filings?.length > 0 ? (
                data.recent_filings.map((filing, i) => (
                  <div key={i} className="p-3">
                    <div className="text-sm font-medium text-navy">{filing.company}</div>
                    <p className="text-xs text-gray-500">{filing.type} — {filing.date}</p>
                    {filing.url && (
                      <a href={filing.url} target="_blank" rel="noopener noreferrer" className="text-xs text-editorial hover:underline">View filing</a>
                    )}
                  </div>
                ))
              ) : (
                <p className="p-3 text-sm text-gray-400">No recent filings. Run SEC collector to fetch.</p>
              )}
            </div>
          </div>

          {/* Collector Controls */}
          <div>
            <h2 className="font-display text-lg text-navy mb-3">Data Collectors (12)</h2>
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {['yahoo_finance', 'bls_ppi', 'sec_edgar', 'usitc', 'eurostat_comext', 'hmrc_bulletin', 'companies_house', 'ir_feeds', 'ttb_cola', 'faostat_oiv', 'who_gho', 'oecd'].map((name) => (
                <button
                  key={name}
                  onClick={() => handleCollect(name)}
                  disabled={collecting === name}
                  className="flex items-center gap-2 w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm hover:border-gold hover:shadow-sm transition-all disabled:opacity-50"
                >
                  <Play size={14} className={collecting === name ? 'animate-spin text-editorial' : 'text-gray-400'} />
                  <span className="font-medium text-navy">
                    {name.replace(/_/g, ' ').split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                  </span>
                  <span className="text-xs text-gray-400 ml-auto">
                    {collecting === name ? 'Running...' : 'Run now'}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Key Metrics Watchlist — 4-pillar consolidated view */}
      <KeyMetricsWatchlist />
    </div>
  )
}
