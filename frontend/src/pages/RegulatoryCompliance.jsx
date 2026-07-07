import React, { useState } from 'react'
import {
  ShieldAlert, Globe, ChevronDown, Check, Clock,
  DollarSign, FileText, AlertTriangle, Package, Tag, Zap
} from 'lucide-react'
import {
  Card, PageHeader, SubPageNav, DataFreshness
} from '../components/ui'
import {
  MARKET_REGULATIONS, TARGET_MARKETS_WIZARD
} from '../data/marketEntryData'
import {
  LABELLING_REQUIREMENTS, IMPORT_PROCESS_STEPS
} from '../data/regulatoryData'

function Section({ title, icon: Icon, children, defaultOpen = true }) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center gap-3 px-4 py-3 bg-gray-50 text-left hover:bg-gray-100 transition-colors">
        <Icon size={16} className="text-navy" />
        <span className="text-sm font-bold text-navy flex-1">{title}</span>
        <ChevronDown size={14} className={`text-gray-400 transition-transform ${open ? '' : '-rotate-90'}`} />
      </button>
      {open && <div className="p-4">{children}</div>}
    </div>
  )
}

export default function RegulatoryCompliance() {
  const [selectedMarket, setSelectedMarket] = useState('uk')

  const market = TARGET_MARKETS_WIZARD.find(m => m.id === selectedMarket)
  const reg = MARKET_REGULATIONS[selectedMarket] || {}
  const labelling = LABELLING_REQUIREMENTS[selectedMarket] || {}
  const importSteps = IMPORT_PROCESS_STEPS[selectedMarket] || []

  // LI signals — reactive to selectedMarket
  const liStepCount = importSteps.length
  const liUpcomingCount = labelling.upcoming ? labelling.upcoming.length : 0
  const liTimelineMonths = reg.timeline
    ? parseInt(reg.timeline.match(/(\d+)/)?.[1] || '6', 10)
    : 6

  const liComplexitySignal = liStepCount <= 3
    ? { dot: 'bg-emerald-500', color: 'text-emerald-600', label: 'STREAMLINED PROCESS', copy: `${liStepCount} import steps — one of the simpler compliance pathways. Lean teams can manage in-house; broker optional.` }
    : liStepCount <= 5
    ? { dot: 'bg-blue-500', color: 'text-blue-600', label: 'STANDARD COMPLEXITY', copy: `${liStepCount} steps to clear import approval. Engage a local compliance agent to manage excise, label, and customs concurrently.` }
    : { dot: 'bg-amber-500', color: 'text-amber-600', label: 'HIGH COMPLIANCE BURDEN', copy: `${liStepCount} distinct import steps — this market demands specialist local counsel. Budget an additional 2–3 months for approval cycles.` }

  const liLabelSignal = liUpcomingCount === 0
    ? { dot: 'bg-emerald-500', color: 'text-emerald-600', label: 'STABLE REQUIREMENTS', copy: 'No upcoming labelling changes flagged. Current label artwork is future-proof for the near term — no reprint risk.' }
    : liUpcomingCount <= 2
    ? { dot: 'bg-blue-500', color: 'text-blue-600', label: 'MINOR UPDATES INCOMING', copy: `${liUpcomingCount} upcoming labelling change${liUpcomingCount > 1 ? 's' : ''} — low disruption but plan for artwork revisions before the next print run.` }
    : { dot: 'bg-amber-500', color: 'text-amber-600', label: 'SIGNIFICANT LABEL OVERHAUL', copy: `${liUpcomingCount} upcoming changes including EU-wide ingredient and calorie labelling from June 2026. New artwork mandatory — build label redesign into your launch timeline.` }

  const liTimelineSignal = liTimelineMonths <= 3
    ? { dot: 'bg-emerald-500', color: 'text-emerald-600', label: 'FAST-TRACK MARKET', copy: `${reg.timeline || '1–3 months'} to approve. Among the fastest-entry markets — achievable within one quarter from application to first shipment.` }
    : liTimelineMonths <= 6
    ? { dot: 'bg-blue-500', color: 'text-blue-600', label: 'STANDARD TIMELINE', copy: `${reg.timeline || '3–6 months'} estimated. Allow one full quarter of pre-launch compliance work. Engage local counsel in month one.` }
    : { dot: 'bg-amber-500', color: 'text-amber-600', label: 'EXTENDED TIMELINE', copy: `${reg.timeline || '6+ months'} to full approval. Start regulatory groundwork well ahead of commercial launch — permits, COLAs, and licences run in parallel but queue behind each other.` }

  return (
    <div className="max-w-7xl mx-auto">
      <SubPageNav group="tools" />
      <DataFreshness date="April 2026" source="HMRC, TTB, EU Spirits Regulation, national trade bodies" />
      <PageHeader
        title="Regulatory Compliance Checker"
        subtitle="Market-specific import, labelling, and compliance requirements"
        icon={<ShieldAlert size={20} />}
      />

      {/* Market selector */}
      <Card className="p-4 mb-6">
        <label className="block text-xs font-semibold text-navy mb-2">Select Market</label>
        <div className="flex flex-wrap gap-2">
          {TARGET_MARKETS_WIZARD.map(m => (
            <button
              key={m.id}
              onClick={() => setSelectedMarket(m.id)}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${selectedMarket === m.id ? 'bg-navy text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
            >
              {m.flag} {m.name}
            </button>
          ))}
        </div>
      </Card>

      {/* Liquid Intelligence */}
      <div className="border border-gold/30 rounded-xl bg-gradient-to-r from-amber-50/60 to-white p-4 mb-4">
        <div className="flex items-center gap-2 mb-3">
          <Zap size={14} className="text-gold" />
          <span className="text-xs font-bold text-gold uppercase tracking-wider">Liquid Intelligence</span>
          <span className="text-xs text-gray-400 ml-auto">{market ? `${market.flag} ${market.name}` : 'Market'} compliance signals</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            { sig: liComplexitySignal, header: 'Import Process Complexity' },
            { sig: liLabelSignal, header: 'Labelling Change Risk' },
            { sig: liTimelineSignal, header: 'Market Entry Timeline' },
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

      {/* Market header */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        <Card className="p-3 text-center">
          <div className="text-xs text-gray-500 mb-1">Timeline</div>
          <div className="text-sm font-bold text-navy">{reg.timeline || 'N/A'}</div>
        </Card>
        <Card className="p-3 text-center">
          <div className="text-xs text-gray-500 mb-1">Est. Setup Cost</div>
          <div className="text-sm font-bold text-navy">{reg.estimatedCost || 'N/A'}</div>
        </Card>
        <Card className="p-3 text-center">
          <div className="text-xs text-gray-500 mb-1">Age Restriction</div>
          <div className="text-sm font-bold text-navy">{reg.ageRestriction || '18+'}</div>
        </Card>
        <Card className="p-3 text-center">
          <div className="text-xs text-gray-500 mb-1">Tax Stamps</div>
          <div className="text-sm font-bold text-navy">{reg.taxStamps ? (reg.taxStamps.includes('Not required') ? 'Not Required' : 'Required') : 'N/A'}</div>
        </Card>
      </div>

      <div className="space-y-4">
        {/* Import licence */}
        <Section title="Import Licence & Registration" icon={FileText}>
          <p className="text-sm text-gray-600">{reg.importLicence}</p>
        </Section>

        {/* Labelling */}
        <Section title="Labelling Requirements" icon={Tag}>
          <div className="space-y-4">
            <div>
              <h4 className="text-xs font-semibold text-navy uppercase tracking-wider mb-2">Mandatory Fields</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1">
                {(labelling.mandatory || []).map((item, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm text-gray-600">
                    <Check size={12} className="text-green-500 flex-shrink-0" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
            {labelling.upcoming && labelling.upcoming.length > 0 && (
              <div>
                <h4 className="text-xs font-semibold text-amber-600 uppercase tracking-wider mb-2">Upcoming Changes</h4>
                <div className="grid grid-cols-1 gap-1">
                  {labelling.upcoming.map((item, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm text-amber-700">
                      <AlertTriangle size={12} className="text-amber-500 flex-shrink-0" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            )}
            {labelling.format && (
              <div className="p-3 bg-gray-50 rounded-lg text-xs text-gray-600">
                <span className="font-semibold text-navy">Format: </span>{labelling.format}
              </div>
            )}
            {labelling.deadline && (
              <div className="p-3 bg-navy/5 rounded-lg text-xs text-navy">
                <span className="font-semibold">Key Deadline: </span>{labelling.deadline}
              </div>
            )}
          </div>
        </Section>

        {/* Duty rates */}
        <Section title="Duty & Tax Rates" icon={DollarSign}>
          <div className="space-y-2">
            {reg.dutyRates && Object.entries(reg.dutyRates).map(([category, rate]) => (
              <div key={category} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-sm font-medium text-navy capitalize">{category}</span>
                <span className="text-sm text-gray-600">{rate}</span>
              </div>
            ))}
          </div>
        </Section>

        {/* Advertising rules */}
        <Section title="Advertising & Marketing Rules" icon={Globe}>
          <p className="text-sm text-gray-600">{reg.advertisingRules}</p>
        </Section>

        {/* Import process steps */}
        {importSteps.length > 0 && (
          <Section title="Import Process (Step by Step)" icon={Clock}>
            <div className="space-y-3">
              {importSteps.map((step, i) => (
                <div key={i} className="flex gap-3">
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 bg-navy text-white rounded-full flex items-center justify-center text-xs font-bold">
                      {step.step}
                    </div>
                    {i < importSteps.length - 1 && <div className="w-px flex-1 bg-gray-200 my-1" />}
                  </div>
                  <div className="flex-1 pb-4">
                    <div className="text-sm font-semibold text-navy">{step.title}</div>
                    <div className="flex gap-4 text-xs text-gray-500 mt-0.5">
                      <span className="flex items-center gap-1"><Clock size={10} /> {step.duration}</span>
                      <span className="flex items-center gap-1"><DollarSign size={10} /> {step.cost}</span>
                    </div>
                    <p className="text-xs text-gray-600 mt-1">{step.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </Section>
        )}

        {/* Tax stamps */}
        <Section title="Tax Stamps & Fiscal Requirements" icon={Package} defaultOpen={false}>
          <p className="text-sm text-gray-600">{reg.taxStamps}</p>
        </Section>
      </div>
    </div>
  )
}
