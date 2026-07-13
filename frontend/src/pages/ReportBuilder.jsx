import React, { useState } from 'react'
import {
  FileText, Check, BarChart3, Globe, TrendingUp, DollarSign,
  Package, AlertTriangle, Target, Calendar, Briefcase,
  Eye, Users, Layers, X, Mail, Zap
} from 'lucide-react'
import {
  REPORT_TEMPLATES, AVAILABLE_CATEGORIES, AVAILABLE_MARKETS,
  DATA_SOURCES, DASHBOARD_WIDGETS
} from '../data/reportBuilderData'
import {
  Card, AccentCard, MetricCard, PageHeader, BentoGrid, DrillDown,
  Badge, SubPageNav, BottomSheet, DataFreshness
} from '../components/ui'

// LI signals — computed from report builder configuration options at module level
const liTemplateCount = REPORT_TEMPLATES.length
const liSourceCount = DATA_SOURCES.length
const liIntelScope = AVAILABLE_CATEGORIES.length * AVAILABLE_MARKETS.length

const liTemplateSignal = liTemplateCount >= 6
  ? { dot: 'bg-emerald-500', color: 'text-emerald-600', label: 'COMPREHENSIVE LIBRARY', copy: `${liTemplateCount} report templates covering market overview, category deep-dive, competitor analysis, pricing, and market entry. Every major intelligence need is mapped to a format.` }
  : liTemplateCount >= 4
  ? { dot: 'bg-blue-500', color: 'text-blue-600', label: 'SOLID TEMPLATE RANGE', copy: `${liTemplateCount} templates available — the core intelligence report types are covered. Request a custom brief for niche category or frontier-market scenarios outside the template set.` }
  : { dot: 'bg-amber-500', color: 'text-amber-600', label: 'TEMPLATE LIBRARY GROWING', copy: `${liTemplateCount} templates currently available. New formats are added regularly — if your specific use case isn't listed, submit a custom report request for a bespoke brief.` }

const liSourceSignal = liSourceCount >= 5
  ? { dot: 'bg-emerald-500', color: 'text-emerald-600', label: 'MULTI-SOURCE TRIANGULATION', copy: `${liSourceCount} independent data sources — IWSR, Euromonitor, NielsenIQ, CGA, and more. Cross-source triangulation is the industry standard for high-confidence market sizing.` }
  : liSourceCount >= 3
  ? { dot: 'bg-blue-500', color: 'text-blue-600', label: 'SOLID DATA FOUNDATION', copy: `${liSourceCount} primary data sources underpin all reports. IWSR and Euromonitor provide global market coverage; NielsenIQ and CGA add retail and on-trade precision.` }
  : { dot: 'bg-amber-500', color: 'text-amber-600', label: 'LIMITED DATA SOURCES', copy: `${liSourceCount} sources available. Single-source data carries methodology risk — validate key metrics against secondary sources before making strategic decisions.` }

const liScopeSignal = liIntelScope >= 100
  ? { dot: 'bg-emerald-500', color: 'text-emerald-600', label: 'BROAD INTELLIGENCE SCOPE', copy: `${AVAILABLE_CATEGORIES.length} categories across ${AVAILABLE_MARKETS.length} markets — ${liIntelScope} configurable intelligence intersections. Any major drinks brand can find its specific market-category profile in the platform.` }
  : liIntelScope >= 50
  ? { dot: 'bg-blue-500', color: 'text-blue-600', label: 'GOOD COVERAGE', copy: `${AVAILABLE_CATEGORIES.length} categories and ${AVAILABLE_MARKETS.length} markets configurable. Covers all priority markets for Western spirits brands; frontier markets may require supplementary research.` }
  : { dot: 'bg-amber-500', color: 'text-amber-600', label: 'FOCUSED SCOPE', copy: `${liIntelScope} category-market configurations available. Focused on core markets — contact for coverage in non-listed territories.` }
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
  const [selectedTemplate, setSelectedTemplate] = useState(null)
  const [mobileDetail, setMobileDetail] = useState(null)

  // Selected template object
  const activeTemplate = REPORT_TEMPLATES.find(t => t.id === selectedTemplate)

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* ══════ PAGE HEADER ══════ */}
      <PageHeader
        title="Report Builder"
        subtitle="Build custom intelligence reports from templates, data sources, and dashboard widgets"
        breadcrumbs={[{ label: 'Command Centre', to: '/' }, { label: 'Report Builder' }]}
      />
      <SubPageNav group="reports" />
      <DataFreshness date="April 2026" source="IWSR, Euromonitor, NielsenIQ, CGA, DISCUS" />

      {/* ══════ REQUEST A CUSTOM REPORT CTA ══════ */}
      <AccentCard>
        <div className="flex flex-col items-center text-center py-6">
          <div className="p-4 rounded-2xl bg-gradient-to-br from-navy/5 to-gold/5 mb-4">
            <FileText size={32} className="text-navy" />
          </div>
          <h2 className="font-display text-lg text-navy mb-2">Request a Custom Report</h2>
          <p className="text-sm text-gray-500 max-w-md mb-1">
            Select a template below and configure your parameters. Our team will produce a bespoke
            intelligence report {'—'} category entry analysis, competitive landscape, pricing benchmarks,
            and go-to-market recommendations {'—'} delivered within 5 business days.
          </p>
          <p className="text-xs text-gray-500 mb-6">
            Typical reports: 20{'–'}40 pages. Starting from {'£'}2,500.
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

      {/* Liquid Intelligence */}
      <div className="border border-gold/30 rounded-xl bg-gradient-to-r from-amber-50/60 to-white p-4">
        <div className="flex items-center gap-2 mb-3">
          <Zap size={14} className="text-gold" />
          <span className="text-xs font-bold text-gold uppercase tracking-wider">Liquid Intelligence</span>
          <span className="text-xs text-gray-400 ml-auto">Report platform signals</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            { sig: liTemplateSignal, header: 'Template Library' },
            { sig: liSourceSignal, header: 'Data Source Depth' },
            { sig: liScopeSignal, header: 'Intelligence Scope' },
          ].map(({ sig, header }, i) => (
            <div key={i} className="bg-white rounded-lg p-3 border border-gray-100">
              <div className="flex items-center gap-1.5 mb-1.5">
                <span className={`w-2 h-2 rounded-full shrink-0 ${sig.dot}`} />
                <span className={`text-[10px] font-bold uppercase tracking-wider ${sig.color}`}>{sig.label}</span>
              </div>
              <p className="text-[11px] text-gray-500 leading-snug">{header}</p>
              <p className="text-xs text-gray-700 leading-snug mt-1">{sig.copy}</p>
            </div>
          ))}
        </div>
      </div>

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
