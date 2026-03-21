import React, { useState, useEffect } from 'react'
import {
  FileText, Plus, Check, BarChart3, Globe, TrendingUp, DollarSign,
  Package, AlertTriangle, Target, Calendar, Briefcase, Download,
  ChevronRight, Eye, Users, Settings, Clock, Layers, X, Search,
  CheckCircle2, ArrowRight, FileDown
} from 'lucide-react'
import { api } from '../lib/api'
import {
  REPORT_TEMPLATES, AVAILABLE_CATEGORIES, AVAILABLE_MARKETS,
  METRIC_OPTIONS, DATA_SOURCES, DASHBOARD_WIDGETS
} from '../data/reportBuilderData'
import {
  Card, AccentCard, MetricCard, PageHeader, BentoGrid, DrillDown,
  DataTable, TabGroup, Badge, EntityLink
} from '../components/ui'

// Icon resolver for data-driven widget rendering
const ICON_MAP = {
  BarChart3, Globe, TrendingUp, DollarSign, Package, AlertTriangle,
  Target, Calendar, Briefcase, Users, FileText,
}
const resolveIcon = (name) => ICON_MAP[name] || FileText

// ══════════════════════════════════════════
// MAIN COMPONENT
// ══════════════════════════════════════════
export default function ReportBuilder() {
  // ── State ──
  const [selectedTemplate, setSelectedTemplate] = useState(null)
  const [showTier3, setShowTier3] = useState(false)

  // Config state (Tier 2)
  const [reportTitle, setReportTitle] = useState('')
  const [selectedCategories, setSelectedCategories] = useState([])
  const [selectedMarkets, setSelectedMarkets] = useState([])
  const [selectedMetrics, setSelectedMetrics] = useState([])
  const [selectedSources, setSelectedSources] = useState(['iwsr', 'euromonitor'])
  const [dateRange, setDateRange] = useState({ from: '2021', to: '2025' })

  // Report generation state
  const [generating, setGenerating] = useState(false)
  const [generatingMessage, setGeneratingMessage] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  // History
  const [history, setHistory] = useState([])
  const [loading, setLoading] = useState(true)

  // Widget selection
  const [selectedWidgets, setSelectedWidgets] = useState([])
  const [widgetCopied, setWidgetCopied] = useState(null)

  useEffect(() => {
    loadHistory()
  }, [])

  const loadHistory = async () => {
    try {
      setLoading(true)
      const reports = await api.getReportHistory()
      setHistory(reports || [])
    } catch (err) {
      console.error('Error loading history:', err)
    } finally {
      setLoading(false)
    }
  }

  const toggleCategory = (key) => {
    setSelectedCategories(prev => prev.includes(key) ? prev.filter(k => k !== key) : [...prev, key])
  }

  const toggleMarket = (key) => {
    setSelectedMarkets(prev => prev.includes(key) ? prev.filter(k => k !== key) : [...prev, key])
  }

  const toggleMetric = (key) => {
    setSelectedMetrics(prev => prev.includes(key) ? prev.filter(k => k !== key) : [...prev, key])
  }

  const toggleSource = (key) => {
    setSelectedSources(prev => prev.includes(key) ? prev.filter(k => k !== key) : [...prev, key])
  }

  const addWidgetToReport = (widget) => {
    if (!selectedWidgets.includes(widget.id)) {
      setSelectedWidgets(prev => [...prev, widget.id])
    }
    setWidgetCopied(widget.id)
    setTimeout(() => setWidgetCopied(null), 1500)
  }

  const handleGenerate = async () => {
    if (!reportTitle.trim()) {
      setError('Please enter a report title')
      return
    }
    if (!selectedTemplate) {
      setError('Please select a report template')
      return
    }

    setError('')
    setGenerating(true)
    setGeneratingMessage('Compiling data...')

    try {
      setGeneratingMessage('Generating report...')
      const template = REPORT_TEMPLATES.find(t => t.id === selectedTemplate)

      const response = await api.generateBrief({
        title: reportTitle,
        sections: template.sections,
        company_ids: null,
        signal_ids: null,
        template: selectedTemplate,
        categories: selectedCategories,
        markets: selectedMarkets,
        metrics: selectedMetrics,
        sources: selectedSources,
        dateRange,
      })

      if (response && response.blob) {
        const blob = await response.blob()
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `${selectedTemplate}_${reportTitle.replace(/\s+/g, '_')}.pdf`
        a.click()
        URL.revokeObjectURL(url)
      }

      setSuccess('Report generated successfully!')
      setReportTitle('')
      await loadHistory()
      setTimeout(() => setSuccess(''), 5000)
    } catch (err) {
      setError(`Error: ${err.message}`)
    } finally {
      setGenerating(false)
      setGeneratingMessage('')
    }
  }

  const formatDate = (dateStr) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString('en-US', {
      month: 'short', day: 'numeric', year: 'numeric',
      hour: '2-digit', minute: '2-digit'
    })
  }

  // Selected template object
  const activeTemplate = REPORT_TEMPLATES.find(t => t.id === selectedTemplate)

  // Preview sections count
  const configuredSections = (activeTemplate ? activeTemplate.sections.length : 0) +
    selectedCategories.length + selectedMarkets.length + selectedWidgets.length

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* ══════ PAGE HEADER ══════ */}
      <PageHeader
        title="Report Builder"
        subtitle="Build custom intelligence reports from templates, data sources, and dashboard widgets"
        breadcrumbs={[{ label: 'Command Centre', to: '/' }, { label: 'Report Builder' }]}
      />

      {/* Messages */}
      {error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm flex items-center gap-2">
          <AlertTriangle size={14} />
          {error}
          <button onClick={() => setError('')} className="ml-auto"><X size={14} /></button>
        </div>
      )}
      {success && (
        <div className="p-3 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm flex items-center gap-2">
          <CheckCircle2 size={14} />
          {success}
        </div>
      )}

      {/* ══════ TIER 1: HERO + TEMPLATE CARDS + RECENT ══════ */}
      <BentoGrid>
        {/* Hero card */}
        <BentoGrid.Wide>
          <Card padding="p-6">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-xl bg-gradient-to-br from-navy/5 to-gold/5">
                <FileText size={24} className="text-navy" />
              </div>
              <div className="flex-1">
                <h2 className="font-display text-lg text-navy">Build a Custom Report</h2>
                <p className="text-xs text-gray-400 mt-1 max-w-lg">
                  Select a template below to get started. Configure categories, markets, and metrics,
                  then generate a professional intelligence report in seconds.
                </p>
              </div>
            </div>
            {/* Quick stats */}
            <div className="flex items-center gap-6 mt-4 pt-3 border-t border-gray-100">
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <Layers size={14} className="text-gold" />
                <span><strong className="text-navy">{REPORT_TEMPLATES.length}</strong> templates</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <Globe size={14} className="text-gold" />
                <span><strong className="text-navy">11</strong> categories</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <Target size={14} className="text-gold" />
                <span><strong className="text-navy">{AVAILABLE_MARKETS.length}</strong> markets</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <Clock size={14} className="text-gold" />
                <span><strong className="text-navy">{history.length}</strong> reports generated</span>
              </div>
            </div>
          </Card>
        </BentoGrid.Wide>

        {/* KPI cards */}
        <MetricCard
          label="Reports Generated"
          value={String(history.length)}
          subtitle={history.length > 0 ? 'Latest: ' + (history[0]?.title || 'N/A') : 'None yet'}
          icon={FileText}
        />
        <MetricCard
          label="Available Templates"
          value={String(REPORT_TEMPLATES.length)}
          subtitle="Market, category, competitive, entry"
          icon={Layers}
        />
      </BentoGrid>

      {/* Template selector cards */}
      <div>
        <h2 className="font-display text-section text-navy mb-3">Select a Template</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {REPORT_TEMPLATES.map(template => {
            const Icon = resolveIcon(template.icon)
            const isActive = selectedTemplate === template.id
            return (
              <button
                key={template.id}
                onClick={() => setSelectedTemplate(isActive ? null : template.id)}
                className={`text-left rounded-xl border p-4 transition-all ${
                  isActive
                    ? 'border-gold bg-gold/5 shadow-md ring-1 ring-gold/20'
                    : 'border-gray-100 bg-white hover:border-gray-200 hover:shadow-sm'
                }`}
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className={`p-2 rounded-lg ${isActive ? 'bg-gold/10' : 'bg-gray-50'}`}>
                    <Icon size={16} className={isActive ? 'text-gold' : 'text-navy'} />
                  </div>
                  <h3 className="text-sm font-semibold text-navy">{template.label}</h3>
                </div>
                <p className="text-[11px] text-gray-400 leading-relaxed">{template.description}</p>
                <div className="flex items-center gap-3 mt-3 pt-2 border-t border-gray-50">
                  <span className="text-[10px] text-gray-400">{template.sections.length} sections</span>
                  <span className="text-[10px] text-gray-400">\u2022</span>
                  <span className="text-[10px] text-gray-400">~{template.estimatedPages} pages</span>
                  {isActive && (
                    <span className="ml-auto text-[10px] font-semibold text-gold flex items-center gap-0.5">
                      Selected <Check size={10} />
                    </span>
                  )}
                </div>
              </button>
            )
          })}
        </div>
      </div>

      {/* Recent reports list */}
      {history.length > 0 && (
        <DrillDown
          title="Recent Reports"
          summary={history.length + ' report' + (history.length !== 1 ? 's' : '') + ' generated'}
        >
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50/50">
                  <th className="px-3 py-2 text-[10px] font-semibold text-gray-500 uppercase tracking-wider">Title</th>
                  <th className="px-3 py-2 text-[10px] font-semibold text-gray-500 uppercase tracking-wider">Type</th>
                  <th className="px-3 py-2 text-[10px] font-semibold text-gray-500 uppercase tracking-wider">Generated</th>
                  <th className="px-3 py-2 text-[10px] font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody>
                {history.slice(0, 5).map((report, idx) => (
                  <tr key={idx} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                    <td className="px-3 py-2.5 text-xs font-medium text-navy">{report.title}</td>
                    <td className="px-3 py-2.5">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${
                        report.report_type === 'brief' ? 'bg-blue-50 text-blue-700' : 'bg-gold/10 text-gold'
                      }`}>
                        {report.report_type === 'brief' ? 'Brief' : 'Portfolio'}
                      </span>
                    </td>
                    <td className="px-3 py-2.5 text-xs text-gray-500">{formatDate(report.created_at)}</td>
                    <td className="px-3 py-2.5">
                      <button
                        onClick={() => api.downloadReport(report.id)}
                        className="text-xs text-gold hover:text-gold-dark font-medium transition-colors flex items-center gap-1"
                      >
                        <Download size={12} /> Download
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </DrillDown>
      )}

      {/* ══════ TIER 2: CONFIGURATION (shown when template selected) ══════ */}
      {selectedTemplate && (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <h2 className="font-display text-section text-navy">Configure Report</h2>
            <span className="text-[10px] bg-gold/10 text-gold px-2 py-0.5 rounded-full font-medium">
              {activeTemplate?.label}
            </span>
          </div>

          {/* Report Title */}
          <Card>
            <label className="text-xs font-medium text-navy block mb-2">Report Title</label>
            <input
              type="text"
              value={reportTitle}
              onChange={e => setReportTitle(e.target.value)}
              placeholder={'e.g., ' + (activeTemplate?.label || 'Report') + ' \u2014 Q1 2025'}
              disabled={generating}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-gold focus:border-transparent outline-none disabled:bg-gray-50"
            />
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Categories selection */}
            <Card>
              <h3 className="text-xs font-semibold text-navy mb-3 flex items-center gap-2">
                <Globe size={14} className="text-gold" />
                Categories
                {selectedCategories.length > 0 && (
                  <span className="text-[10px] bg-navy/10 text-navy px-1.5 py-0.5 rounded-full">{selectedCategories.length}</span>
                )}
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {AVAILABLE_CATEGORIES.map(cat => {
                  const isActive = selectedCategories.includes(cat.key)
                  return (
                    <button
                      key={cat.key}
                      onClick={() => toggleCategory(cat.key)}
                      className={`flex items-center gap-2 px-3 py-2 rounded-lg border text-left text-xs transition-all ${
                        isActive ? 'border-gold bg-gold/5 text-navy font-medium' : 'border-gray-100 text-gray-600 hover:border-gray-200'
                      }`}
                    >
                      {isActive && <Check size={12} className="text-gold flex-shrink-0" />}
                      <span className="truncate">{cat.label}</span>
                    </button>
                  )
                })}
              </div>
            </Card>

            {/* Markets selection */}
            <Card>
              <h3 className="text-xs font-semibold text-navy mb-3 flex items-center gap-2">
                <Target size={14} className="text-gold" />
                Markets
                {selectedMarkets.length > 0 && (
                  <span className="text-[10px] bg-navy/10 text-navy px-1.5 py-0.5 rounded-full">{selectedMarkets.length}</span>
                )}
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {AVAILABLE_MARKETS.map(market => {
                  const isActive = selectedMarkets.includes(market.key)
                  return (
                    <button
                      key={market.key}
                      onClick={() => toggleMarket(market.key)}
                      className={`flex items-center gap-2 px-3 py-2 rounded-lg border text-left text-xs transition-all ${
                        isActive ? 'border-gold bg-gold/5 text-navy font-medium' : 'border-gray-100 text-gray-600 hover:border-gray-200'
                      }`}
                    >
                      {isActive && <Check size={12} className="text-gold flex-shrink-0" />}
                      <span className="truncate">{market.label}</span>
                    </button>
                  )
                })}
              </div>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Date Range */}
            <Card>
              <h3 className="text-xs font-semibold text-navy mb-3 flex items-center gap-2">
                <Calendar size={14} className="text-gold" />
                Date Range
              </h3>
              <div className="flex items-center gap-3">
                <select
                  value={dateRange.from}
                  onChange={e => setDateRange(prev => ({ ...prev, from: e.target.value }))}
                  className="flex-1 text-xs border border-gray-200 rounded-lg px-3 py-2 bg-white focus:ring-2 focus:ring-gold focus:border-transparent"
                >
                  {['2021', '2022', '2023', '2024', '2025'].map(y => (
                    <option key={y} value={y}>{y}</option>
                  ))}
                </select>
                <ArrowRight size={14} className="text-gray-300 flex-shrink-0" />
                <select
                  value={dateRange.to}
                  onChange={e => setDateRange(prev => ({ ...prev, to: e.target.value }))}
                  className="flex-1 text-xs border border-gray-200 rounded-lg px-3 py-2 bg-white focus:ring-2 focus:ring-gold focus:border-transparent"
                >
                  {['2021', '2022', '2023', '2024', '2025'].map(y => (
                    <option key={y} value={y}>{y}</option>
                  ))}
                </select>
              </div>
            </Card>

            {/* Metrics */}
            <Card>
              <h3 className="text-xs font-semibold text-navy mb-3 flex items-center gap-2">
                <BarChart3 size={14} className="text-gold" />
                Metrics to Include
                {selectedMetrics.length > 0 && (
                  <span className="text-[10px] bg-navy/10 text-navy px-1.5 py-0.5 rounded-full">{selectedMetrics.length}</span>
                )}
              </h3>
              <div className="space-y-1.5">
                {METRIC_OPTIONS.map(metric => {
                  const isActive = selectedMetrics.includes(metric.key)
                  return (
                    <button
                      key={metric.key}
                      onClick={() => toggleMetric(metric.key)}
                      className={`flex items-center gap-2 w-full px-2.5 py-1.5 rounded text-left text-[11px] transition-all ${
                        isActive ? 'bg-gold/5 text-navy font-medium' : 'text-gray-500 hover:bg-gray-50'
                      }`}
                    >
                      <div className={`w-3.5 h-3.5 rounded border flex items-center justify-center ${isActive ? 'border-gold bg-gold' : 'border-gray-300'}`}>
                        {isActive && <Check size={8} className="text-white" />}
                      </div>
                      {metric.label}
                    </button>
                  )
                })}
              </div>
            </Card>

            {/* Data Sources */}
            <Card>
              <h3 className="text-xs font-semibold text-navy mb-3 flex items-center gap-2">
                <Package size={14} className="text-gold" />
                Data Sources
                {selectedSources.length > 0 && (
                  <span className="text-[10px] bg-navy/10 text-navy px-1.5 py-0.5 rounded-full">{selectedSources.length}</span>
                )}
              </h3>
              <div className="space-y-1.5">
                {DATA_SOURCES.map(src => {
                  const isActive = selectedSources.includes(src.key)
                  return (
                    <button
                      key={src.key}
                      onClick={() => toggleSource(src.key)}
                      className={`flex items-start gap-2 w-full px-2.5 py-1.5 rounded text-left transition-all ${
                        isActive ? 'bg-gold/5' : 'hover:bg-gray-50'
                      }`}
                    >
                      <div className={`w-3.5 h-3.5 rounded border flex items-center justify-center mt-0.5 ${isActive ? 'border-gold bg-gold' : 'border-gray-300'}`}>
                        {isActive && <Check size={8} className="text-white" />}
                      </div>
                      <div>
                        <div className={`text-[11px] ${isActive ? 'text-navy font-medium' : 'text-gray-500'}`}>{src.label}</div>
                        <div className="text-[9px] text-gray-400">{src.description}</div>
                      </div>
                    </button>
                  )
                })}
              </div>
            </Card>
          </div>

          {/* Preview pane */}
          <AccentCard>
            <h3 className="text-xs font-semibold text-navy mb-3 flex items-center gap-2">
              <Eye size={14} className="text-gold" />
              Report Preview
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
              <div className="bg-gray-50 rounded-lg p-2.5">
                <div className="text-[10px] text-gray-400">Template</div>
                <div className="text-xs font-semibold text-navy">{activeTemplate?.label || '\u2014'}</div>
              </div>
              <div className="bg-gray-50 rounded-lg p-2.5">
                <div className="text-[10px] text-gray-400">Sections</div>
                <div className="text-xs font-semibold text-navy">{activeTemplate?.sections.length || 0}</div>
              </div>
              <div className="bg-gray-50 rounded-lg p-2.5">
                <div className="text-[10px] text-gray-400">Categories</div>
                <div className="text-xs font-semibold text-navy">{selectedCategories.length || 'All'}</div>
              </div>
              <div className="bg-gray-50 rounded-lg p-2.5">
                <div className="text-[10px] text-gray-400">Est. Pages</div>
                <div className="text-xs font-semibold text-navy">~{activeTemplate?.estimatedPages || 0}</div>
              </div>
            </div>

            {/* Section list */}
            <div className="text-[10px] text-gray-400 mb-2">Report structure:</div>
            <div className="flex flex-wrap gap-1.5">
              {activeTemplate?.sections.map((section, i) => (
                <span key={i} className="px-2 py-1 bg-white border border-gray-100 rounded text-[10px] text-navy font-medium">
                  {i + 1}. {section}
                </span>
              ))}
            </div>

            {/* Generate button */}
            <button
              onClick={handleGenerate}
              disabled={generating || !reportTitle.trim()}
              className="mt-4 w-full bg-navy text-white py-3 rounded-lg font-medium text-sm hover:bg-navy/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {generating ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  {generatingMessage}
                </>
              ) : (
                <>
                  <FileDown size={16} />
                  Generate Report
                </>
              )}
            </button>
          </AccentCard>

          {/* Quick Add Widgets */}
          <DrillDown
            title="Quick Add Dashboard Widgets"
            summary={'Include live dashboard blocks in your report \u2014 ' + DASHBOARD_WIDGETS.length + ' available'}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
              {DASHBOARD_WIDGETS.map(widget => {
                const Icon = resolveIcon(widget.icon)
                const isSelected = selectedWidgets.includes(widget.id)
                const justAdded = widgetCopied === widget.id
                return (
                  <button
                    key={widget.id}
                    onClick={() => addWidgetToReport(widget)}
                    className={`relative group flex items-start gap-2 p-3 rounded-lg border text-left transition-all ${
                      isSelected
                        ? 'bg-navy/5 border-navy/20 ring-1 ring-navy/10'
                        : 'bg-white border-gray-100 hover:border-gold/40 hover:shadow-sm'
                    }`}
                  >
                    <div className={`p-1 rounded ${isSelected ? 'bg-navy/10' : 'bg-gray-50 group-hover:bg-gold/10'}`}>
                      <Icon size={12} className={isSelected ? 'text-navy' : 'text-gray-400 group-hover:text-gold'} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-[11px] font-semibold text-navy">{widget.label}</div>
                      <div className="text-[9px] text-gray-400 leading-tight mt-0.5">{widget.desc}</div>
                    </div>
                    {justAdded ? (
                      <span className="absolute top-1.5 right-1.5 text-green-500"><Check size={12} /></span>
                    ) : isSelected ? (
                      <span className="absolute top-1.5 right-1.5 w-4 h-4 flex items-center justify-center rounded-full bg-navy text-white text-[8px] font-bold">{'\u2713'}</span>
                    ) : (
                      <span className="absolute top-1.5 right-1.5 opacity-0 group-hover:opacity-100 transition-opacity text-gold"><Plus size={10} /></span>
                    )}
                  </button>
                )
              })}
            </div>
            {selectedWidgets.length > 0 && (
              <div className="mt-3 pt-3 border-t border-gray-100 flex items-center gap-2">
                <span className="text-[10px] font-bold bg-gold/10 text-gold px-2 py-0.5 rounded-full">
                  {selectedWidgets.length} widget{selectedWidgets.length !== 1 ? 's' : ''} selected
                </span>
                <button
                  onClick={() => setSelectedWidgets([])}
                  className="text-[10px] text-gray-400 hover:text-red-500 transition-colors"
                >
                  Clear all
                </button>
              </div>
            )}
          </DrillDown>
        </div>
      )}

      {/* ══════ TIER 3: FULL REPORT VIEW + EXPORT ══════ */}
      {selectedTemplate && !showTier3 && (
        <div className="text-center">
          <button
            onClick={() => setShowTier3(true)}
            className="inline-flex items-center gap-2 px-6 py-3 bg-navy text-white rounded-lg font-medium text-sm hover:bg-navy/90 transition-colors"
          >
            <Eye size={16} />
            View Full Report History & Archive
          </button>
          <p className="text-[10px] text-gray-400 mt-2">Complete report history, export options, and sharing</p>
        </div>
      )}

      {showTier3 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-section text-navy">Full Report Archive</h2>
            <button
              onClick={() => setShowTier3(false)}
              className="text-xs text-gray-400 hover:text-navy transition-colors"
            >
              Collapse
            </button>
          </div>

          {/* Full report history table */}
          {loading ? (
            <Card>
              <div className="text-center py-8 text-gray-400 text-sm">Loading report history...</div>
            </Card>
          ) : history.length === 0 ? (
            <Card>
              <div className="text-center py-8">
                <FileText size={32} className="text-gray-200 mx-auto mb-3" />
                <div className="text-sm text-gray-400">No reports generated yet</div>
                <div className="text-[10px] text-gray-300 mt-1">Select a template above to create your first report</div>
              </div>
            </Card>
          ) : (
            <DataTable
              columns={[
                { key: 'title', label: 'Title' },
                { key: 'report_type', label: 'Type', render: (v) => (
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${v === 'brief' ? 'bg-blue-50 text-blue-700' : 'bg-gold/10 text-gold'}`}>
                    {v === 'brief' ? 'Brief' : 'Portfolio'}
                  </span>
                )},
                { key: 'created_at', label: 'Generated', render: (v) => formatDate(v) },
                { key: 'id', label: 'Actions', sortable: false, render: (v) => (
                  <button
                    onClick={() => api.downloadReport(v)}
                    className="text-xs text-gold hover:text-gold-dark font-medium transition-colors flex items-center gap-1"
                  >
                    <Download size={12} /> Download
                  </button>
                )},
              ]}
              data={history}
              searchable
              searchPlaceholder="Search reports\u2026"
              searchKey="title"
            />
          )}

          {/* Export options */}
          <Card>
            <h3 className="text-xs font-semibold text-navy mb-3">Export Options</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <button className="flex items-center gap-3 p-3 rounded-lg border border-gray-100 hover:border-gold/40 hover:shadow-sm transition-all text-left">
                <div className="p-2 rounded-lg bg-red-50">
                  <FileDown size={16} className="text-red-500" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-navy">PDF Export</div>
                  <div className="text-[10px] text-gray-400">Full formatted report</div>
                </div>
              </button>
              <button className="flex items-center gap-3 p-3 rounded-lg border border-gray-100 hover:border-gold/40 hover:shadow-sm transition-all text-left">
                <div className="p-2 rounded-lg bg-green-50">
                  <Download size={16} className="text-green-600" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-navy">CSV Data</div>
                  <div className="text-[10px] text-gray-400">Raw data tables</div>
                </div>
              </button>
              <button className="flex items-center gap-3 p-3 rounded-lg border border-gray-100 hover:border-gold/40 hover:shadow-sm transition-all text-left">
                <div className="p-2 rounded-lg bg-blue-50">
                  <Briefcase size={16} className="text-blue-500" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-navy">Share Link</div>
                  <div className="text-[10px] text-gray-400">Copy sharable URL</div>
                </div>
              </button>
            </div>
          </Card>
        </div>
      )}
    </div>
  )
}
