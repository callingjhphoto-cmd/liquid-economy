import React, { useState, useCallback } from 'react'
import {
  FileText, Check, BarChart3, Globe, TrendingUp, DollarSign,
  Package, AlertTriangle, Target, Calendar, Briefcase,
  ChevronRight, Eye, Users, Settings, Clock, Layers, X,
  CheckCircle2, ArrowRight, Mail
} from 'lucide-react'
import {
  REPORT_TEMPLATES, AVAILABLE_CATEGORIES, AVAILABLE_MARKETS,
  METRIC_OPTIONS, DATA_SOURCES, DASHBOARD_WIDGETS
} from '../data/reportBuilderData'
import {
  Card, AccentCard, MetricCard, PageHeader, BentoGrid, DrillDown,
  DataTable, TabGroup, Badge, EntityLink, SubPageNav, BottomSheet, StatusNotice
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
  const [mobileDetail, setMobileDetail] = useState(null)

  // Config state (Tier 2)
  const [selectedCategories, setSelectedCategories] = useState([])
  const [selectedMarkets, setSelectedMarkets] = useState([])
  const [selectedMetrics, setSelectedMetrics] = useState([])
  const [selectedSources, setSelectedSources] = useState(['iwsr', 'euromonitor'])
  const [dateRange, setDateRange] = useState({ from: '2021', to: '2025' })

  // Widget selection
  const [selectedWidgets, setSelectedWidgets] = useState([])
  const [widgetCopied, setWidgetCopied] = useState(null)

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

  // Selected template object
  const activeTemplate = REPORT_TEMPLATES.find(t => t.id === selectedTemplate)

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* ══════ PAGE HEADER ══════ */}
      <PageHeader
        title="Report Builder"
        subtitle="Build custom intelligence reports from templates, data sources, and dashboard widgets \u00b7 Data as of March 2026"
        breadcrumbs={[{ label: 'Command Centre', to: '/' }, { label: 'Report Builder' }]}
      />
      <SubPageNav group="reports" />

      {/* ══════ COMING SOON — WAITLIST CARD ══════ */}
      <AccentCard>
        <div className="flex flex-col items-center text-center py-6">
          <div className="p-4 rounded-2xl bg-gradient-to-br from-navy/5 to-gold/5 mb-4">
            <FileText size={32} className="text-navy" />
          </div>
          <h2 className="font-display text-lg text-navy mb-2">Automated Report Generation</h2>
          <p className="text-sm text-gray-500 max-w-md mb-1">
            AI-powered report generation is coming soon. Configure templates, select categories and markets,
            and receive professional intelligence briefs delivered to your inbox.
          </p>
          <p className="text-xs text-gray-500 mb-6">
            Currently in development. Join the waitlist to be notified when this feature launches.
          </p>
          <a
            href="mailto:james@huertas.co.uk?subject=Liquid%20Economy%20%E2%80%94%20Report%20Builder%20Waitlist&body=I%27d%20like%20to%20join%20the%20waitlist%20for%20the%20Report%20Builder%20feature."
            className="inline-flex items-center gap-2 px-6 py-3 bg-navy text-white rounded-lg font-medium text-sm hover:bg-navy/90 transition-colors"
          >
            <Mail size={16} />
            Join Waitlist
          </a>
          <p className="text-xs text-gray-500 mt-3">james@huertas.co.uk</p>
        </div>
      </AccentCard>

      <StatusNotice
        type="info"
        title="Backend Required"
        message="Report generation requires a backend connection. Join the waitlist to be notified when this feature launches."
      />

      {/* ══════ TIER 1: HERO + TEMPLATE CARDS ══════ */}
      <BentoGrid>
        {/* Hero card */}
        <BentoGrid.Wide>
          <Card padding="p-6">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-xl bg-gradient-to-br from-navy/5 to-gold/5">
                <FileText size={24} className="text-navy" />
              </div>
              <div className="flex-1">
                <h2 className="font-display text-lg text-navy">Report Templates</h2>
                <p className="text-xs text-gray-500 mt-1 max-w-lg">
                  Browse available report templates below. When automated generation launches,
                  you will be able to configure categories, markets, and metrics to produce
                  professional intelligence reports in seconds.
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
            </div>
          </Card>
        </BentoGrid.Wide>

        {/* KPI cards */}
        <MetricCard
          label="Available Templates"
          value={String(REPORT_TEMPLATES.length)}
          subtitle="Market, category, competitive, entry"
          icon={Layers}
        />
        <MetricCard
          label="Data Sources"
          value={String(DATA_SOURCES.length)}
          subtitle="IWSR, Euromonitor, and more"
          icon={Package}
        />
      </BentoGrid>

      {/* Template selector cards */}
      <div>
        <h2 className="font-display text-section text-navy mb-3">Available Templates</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {REPORT_TEMPLATES.map(template => {
            const Icon = resolveIcon(template.icon)
            const isActive = selectedTemplate === template.id
            return (
              <button
                key={template.id}
                onClick={() => {
                  if (window.innerWidth < 1024) {
                    setMobileDetail({
                      title: template.label,
                      content: (
                        <div className="space-y-4">
                          <p className="text-sm text-gray-600">{template.description}</p>
                          <div className="grid grid-cols-2 gap-3">
                            <div className="bg-gray-50 rounded-lg p-2.5">
                              <div className="text-xs text-gray-500">Sections</div>
                              <div className="text-xs font-semibold text-navy">{template.sections.length}</div>
                            </div>
                            <div className="bg-gray-50 rounded-lg p-2.5">
                              <div className="text-xs text-gray-500">Est. Pages</div>
                              <div className="text-xs font-semibold text-navy">~{template.estimatedPages}</div>
                            </div>
                          </div>
                          <div>
                            <div className="text-xs text-gray-500 mb-2">Report structure:</div>
                            <div className="flex flex-wrap gap-1.5">
                              {template.sections.map((section, i) => (
                                <span key={i} className="px-2 py-1 bg-white border border-gray-100 rounded text-micro text-navy font-medium">
                                  {i + 1}. {section}
                                </span>
                              ))}
                            </div>
                          </div>
                          <div className="w-full bg-gray-100 text-gray-500 py-3 rounded-lg font-medium text-sm flex items-center justify-center gap-2">
                            <Clock size={16} />
                            Generate Report \u2014 Coming Soon
                          </div>
                        </div>
                      )
                    })
                  } else {
                    setSelectedTemplate(isActive ? null : template.id)
                  }
                }}
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
                <p className="text-xs text-gray-500 leading-relaxed">{template.description}</p>
                <div className="flex items-center gap-3 mt-3 pt-2 border-t border-gray-50">
                  <span className="text-xs text-gray-500">{template.sections.length} sections</span>
                  <span className="text-xs text-gray-500">{'\u2022'}</span>
                  <span className="text-xs text-gray-500">~{template.estimatedPages} pages</span>
                  {isActive && (
                    <span className="ml-auto text-xs font-semibold text-gold flex items-center gap-0.5">
                      Selected <Check size={10} />
                    </span>
                  )}
                </div>
              </button>
            )
          })}
        </div>
      </div>

      {/* ══════ TIER 2: CONFIGURATION PREVIEW (shown when template selected) ══════ */}
      {selectedTemplate && (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <h2 className="font-display text-section text-navy">Template Preview</h2>
            <span className="text-micro bg-gold/10 text-gold px-2 py-0.5 rounded-full font-medium">
              {activeTemplate?.label}
            </span>
          </div>

          {/* Preview pane */}
          <AccentCard>
            <h3 className="text-xs font-semibold text-navy mb-3 flex items-center gap-2">
              <Eye size={14} className="text-gold" />
              Report Structure
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
              <div className="bg-gray-50 rounded-lg p-2.5">
                <div className="text-xs text-gray-500">Template</div>
                <div className="text-xs font-semibold text-navy">{activeTemplate?.label || '\u2014'}</div>
              </div>
              <div className="bg-gray-50 rounded-lg p-2.5">
                <div className="text-xs text-gray-500">Sections</div>
                <div className="text-xs font-semibold text-navy">{activeTemplate?.sections.length || 0}</div>
              </div>
              <div className="bg-gray-50 rounded-lg p-2.5">
                <div className="text-xs text-gray-500">Categories Available</div>
                <div className="text-xs font-semibold text-navy">{AVAILABLE_CATEGORIES.length}</div>
              </div>
              <div className="bg-gray-50 rounded-lg p-2.5">
                <div className="text-xs text-gray-500">Est. Pages</div>
                <div className="text-xs font-semibold text-navy">~{activeTemplate?.estimatedPages || 0}</div>
              </div>
            </div>

            {/* Section list */}
            <div className="text-xs text-gray-500 mb-2">Report structure:</div>
            <div className="flex flex-wrap gap-1.5">
              {activeTemplate?.sections.map((section, i) => (
                <span key={i} className="px-2 py-1 bg-white border border-gray-100 rounded text-micro text-navy font-medium">
                  {i + 1}. {section}
                </span>
              ))}
            </div>

            {/* Coming Soon note instead of Generate button */}
            <div className="mt-4 w-full bg-gray-100 text-gray-500 py-3 rounded-lg font-medium text-sm flex items-center justify-center gap-2 cursor-not-allowed">
              <Clock size={16} />
              Generate Report \u2014 Coming Soon
            </div>
          </AccentCard>

          {/* Quick Add Widgets preview */}
          <DrillDown
            title="Dashboard Widgets Available"
            summary={DASHBOARD_WIDGETS.length + ' widgets will be includable in generated reports'}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
              {DASHBOARD_WIDGETS.map(widget => {
                const Icon = resolveIcon(widget.icon)
                return (
                  <div
                    key={widget.id}
                    className="flex items-start gap-2 p-3 rounded-lg border bg-white border-gray-100"
                  >
                    <div className="p-1 rounded bg-gray-50">
                      <Icon size={12} className="text-gray-500" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-semibold text-navy">{widget.label}</div>
                      <div className="text-xs text-gray-500 leading-tight mt-0.5">{widget.desc}</div>
                    </div>
                  </div>
                )
              })}
            </div>
          </DrillDown>
        </div>
      )}

      {/* Mobile BottomSheet for template detail */}
      <BottomSheet
        open={!!mobileDetail}
        onClose={() => setMobileDetail(null)}
        title={mobileDetail?.title || 'Template Detail'}
      >
        {mobileDetail?.content}
      </BottomSheet>
    </div>
  )
}
