import React, { useState } from 'react'
import {
  FileText, Check, BarChart3, Globe, TrendingUp, DollarSign,
  Package, AlertTriangle, Target, Calendar, Briefcase,
  Eye, Users, Layers, X, Mail
} from 'lucide-react'
import {
  REPORT_TEMPLATES, AVAILABLE_CATEGORIES, AVAILABLE_MARKETS,
  METRIC_OPTIONS, DATA_SOURCES, DASHBOARD_WIDGETS
} from '../data/reportBuilderData'
import {
  Card, AccentCard, MetricCard, PageHeader, BentoGrid, DrillDown,
  Badge, SubPageNav, BottomSheet
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
        subtitle="Build custom intelligence reports from templates, data sources, and dashboard widgets · Data as of April 2026"
        breadcrumbs={[{ label: 'Command Centre', to: '/' }, { label: 'Report Builder' }]}
      />
      <SubPageNav group="reports" />

      {/* ══════ REQUEST A CUSTOM REPORT CTA ══════ */}
      <AccentCard>
        <div className="flex flex-col items-center text-center py-6">
          <div className="p-4 rounded-2xl bg-gradient-to-br from-navy/5 to-gold/5 mb-4">
            <FileText size={32} className="text-navy" />
          </div>
          <h2 className="font-display text-lg text-navy mb-2">Request a Custom Report</h2>
          <p className="text-sm text-gray-500 max-w-md mb-1">
            Select a template below and configure your parameters. Our team will produce a bespoke
            intelligence report — category entry analysis, competitive landscape, pricing benchmarks,
            and go-to-market recommendations — delivered within 5 business days.
          </p>
          <p className="text-xs text-gray-500 mb-6">
            Typical reports: 20–40 pages. Starting from £2,500.
          </p>
          <a
            href="mailto:callingjhphoto@gmail.com?subject=Liquid%20Economy%20%E2%80%94%20Custom%20Report%20Request&body=Hi%2C%0A%0AI%27d%20like%20to%20request%20a%20custom%20intelligence%20report.%0A%0ATemplate%3A%20%5Be.g.%20Category%20Entry%20Report%5D%0ACategories%3A%20%5Be.g.%20Gin%2C%20Tequila%5D%0AMarkets%3A%20%5Be.g.%20UK%2C%20US%5D%0ABrief%3A%20%5BDescribe%20your%20specific%20question%20or%20objective%5D%0A%0AThanks"
            className="inline-flex items-center gap-2 px-6 py-3 bg-navy text-white rounded-lg font-medium text-sm hover:bg-navy/90 transition-colors"
          >
            <Mail size={16} />
            Request a Custom Report
          </a>
          <p className="text-xs text-gray-500 mt-3">callingjhphoto@gmail.com {'·'} Response within 24 hours</p>
        </div>
      </AccentCard>

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
                          <a
                            href="mailto:callingjhphoto@gmail.com?subject=Liquid%20Economy%20%E2%80%94%20Custom%20Report%20Request"
                            className="w-full bg-navy text-white py-3 rounded-lg font-medium text-sm flex items-center justify-center gap-2 hover:bg-navy/90 transition-colors"
                          >
                            <Mail size={16} />
                            Request This Report
                          </a>
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
                  <span className="text-xs text-gray-500">{'•'}</span>
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
                <div className="text-xs font-semibold text-navy">{activeTemplate?.label || '—'}</div>
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

            {/* Request report CTA */}
            <a
              href="mailto:callingjhphoto@gmail.com?subject=Liquid%20Economy%20%E2%80%94%20Custom%20Report%20Request"
              className="mt-4 w-full bg-navy text-white py-3 rounded-lg font-medium text-sm flex items-center justify-center gap-2 hover:bg-navy/90 transition-colors"
            >
              <Mail size={16} />
              Request This Report
            </a>
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
