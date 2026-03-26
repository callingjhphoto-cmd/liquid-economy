import React, { useState } from 'react'
import {
  Target, ChevronRight, ChevronDown, ChevronLeft, Check,
  Globe, DollarSign, ShieldAlert, Clock, Package, MapPin,
  AlertTriangle, Building2, TrendingUp, ArrowRight, Zap, FileText
} from 'lucide-react'
import {
  BarChart, Bar, ResponsiveContainer, XAxis, YAxis, Tooltip, Cell, CartesianGrid
} from 'recharts'
import {
  Card, PageHeader, SubPageNav, SectionHeader, Badge
} from '../components/ui'
import {
  TARGET_MARKETS_WIZARD, SPIRIT_CATEGORIES_WIZARD, MARKET_REGULATIONS,
  KEY_DISTRIBUTORS, COMPETITOR_LANDSCAPE, PRICING_STRATEGY,
  ENTRY_TIMELINE, COST_BREAKDOWN_WIZARD
} from '../data/marketEntryData'
import { CHART_COLORS } from '../data/chartColors'

const STEPS = [
  { id: 1, label: 'Category', icon: Package },
  { id: 2, label: 'Market', icon: Globe },
  { id: 3, label: 'Playbook', icon: FileText },
]

function StepIndicator({ current }) {
  return (
    <div className="flex items-center gap-2 mb-6">
      {STEPS.map((step, i) => (
        <React.Fragment key={step.id}>
          {i > 0 && <div className={`h-px flex-1 ${current > step.id ? 'bg-navy' : 'bg-gray-200'}`} />}
          <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium ${current === step.id ? 'bg-navy text-white' : current > step.id ? 'bg-navy/10 text-navy' : 'bg-gray-100 text-gray-500'}`}>
            {current > step.id ? <Check size={12} /> : <step.icon size={12} />}
            <span className="hidden sm:inline">{step.label}</span>
            <span className="sm:hidden">{step.id}</span>
          </div>
        </React.Fragment>
      ))}
    </div>
  )
}

function CategorySelect({ selected, onSelect }) {
  return (
    <div>
      <h2 className="text-lg font-bold text-navy mb-1">Select Your Spirit Category</h2>
      <p className="text-sm text-gray-500 mb-4">What are you bringing to market?</p>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {SPIRIT_CATEGORIES_WIZARD.map(cat => (
          <button
            key={cat.id}
            onClick={() => onSelect(cat.id)}
            className={`p-4 rounded-xl border text-left transition-all ${selected === cat.id ? 'border-navy bg-navy/5 ring-2 ring-navy/20' : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'}`}
          >
            <div className="text-sm font-semibold text-navy">{cat.label}</div>
          </button>
        ))}
      </div>
    </div>
  )
}

function MarketSelect({ selected, onSelect }) {
  return (
    <div>
      <h2 className="text-lg font-bold text-navy mb-1">Select Your Target Market</h2>
      <p className="text-sm text-gray-500 mb-4">Where do you want to sell?</p>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {TARGET_MARKETS_WIZARD.map(m => (
          <button
            key={m.id}
            onClick={() => onSelect(m.id)}
            className={`p-4 rounded-xl border text-left transition-all ${selected === m.id ? 'border-navy bg-navy/5 ring-2 ring-navy/20' : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'}`}
          >
            <div className="text-lg mb-1">{m.flag}</div>
            <div className="text-sm font-semibold text-navy">{m.name}</div>
            <div className="text-xs text-gray-500">{m.region}</div>
          </button>
        ))}
      </div>
    </div>
  )
}

function PlaybookSection({ title, icon: Icon, children, defaultOpen = true }) {
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

function Playbook({ category, market }) {
  const reg = MARKET_REGULATIONS[market] || {}
  const distributors = KEY_DISTRIBUTORS[market] || []
  const pricing = PRICING_STRATEGY[market] || {}
  const competitors = COMPETITOR_LANDSCAPE[market]?.[category] || COMPETITOR_LANDSCAPE['uk']?.[category] || {}
  const costs = COST_BREAKDOWN_WIZARD
  const marketCosts = costs.estimates[market] || costs.estimates['uk']
  const currency = costs.currency[market] || '\u00a3'
  const totalCost = marketCosts.reduce((a, b) => a + b, 0)
  const marketName = TARGET_MARKETS_WIZARD.find(m => m.id === market)?.name || market
  const catName = SPIRIT_CATEGORIES_WIZARD.find(c => c.id === category)?.label || category

  const costChartData = costs.categories.map((cat, i) => ({
    name: cat.length > 20 ? cat.substring(0, 18) + '...' : cat,
    value: marketCosts[i],
  }))

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-lg font-bold text-navy">{catName} {'\u2192'} {marketName}</h2>
        <p className="text-sm text-gray-500">Your complete market entry playbook</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        <Card className="p-3 text-center">
          <div className="text-xs text-gray-500 mb-1">Timeline</div>
          <div className="text-sm font-bold text-navy">{reg.timeline || '3\u20136 months'}</div>
        </Card>
        <Card className="p-3 text-center">
          <div className="text-xs text-gray-500 mb-1">Est. Cost</div>
          <div className="text-sm font-bold text-navy">{currency}{totalCost.toLocaleString()}</div>
        </Card>
        <Card className="p-3 text-center">
          <div className="text-xs text-gray-500 mb-1">Age Restriction</div>
          <div className="text-sm font-bold text-navy">{reg.ageRestriction || '18+'}</div>
        </Card>
        <Card className="p-3 text-center">
          <div className="text-xs text-gray-500 mb-1">Distributors</div>
          <div className="text-sm font-bold text-navy">{distributors.length} listed</div>
        </Card>
      </div>

      <div className="space-y-4">
        <PlaybookSection title="Regulatory Requirements" icon={ShieldAlert}>
          <div className="space-y-3 text-sm">
            <div><span className="font-semibold text-navy">Import Licence:</span> <span className="text-gray-600">{reg.importLicence}</span></div>
            <div><span className="font-semibold text-navy">Labelling:</span> <span className="text-gray-600">{reg.labelling}</span></div>
            <div><span className="font-semibold text-navy">Tax Stamps:</span> <span className="text-gray-600">{reg.taxStamps}</span></div>
            <div><span className="font-semibold text-navy">Advertising:</span> <span className="text-gray-600">{reg.advertisingRules}</span></div>
            {reg.dutyRates && (
              <div>
                <span className="font-semibold text-navy">Duty Rates:</span>
                <div className="mt-1 space-y-1 pl-4">
                  {Object.entries(reg.dutyRates).map(([k, v]) => (
                    <div key={k} className="text-gray-600"><span className="capitalize">{k}:</span> {v}</div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </PlaybookSection>

        <PlaybookSection title="Key Distributors" icon={Building2}>
          <div className="space-y-3">
            {distributors.map((d, i) => (
              <div key={i} className="p-3 bg-gray-50 rounded-lg">
                <div className="flex items-start justify-between mb-1">
                  <div className="font-semibold text-sm text-navy">{d.name}</div>
                  <Badge>{d.minOrder} min</Badge>
                </div>
                <div className="text-xs text-gray-500 mb-1">{d.categories.join(', ')}</div>
                <div className="text-xs text-gray-600 mb-1"><span className="font-medium">Terms:</span> {d.terms}</div>
                <div className="text-xs text-gray-600 mb-1"><span className="font-medium">Key brands:</span> {d.keyBrands}</div>
                <div className="text-xs text-gray-500">{d.notes}</div>
              </div>
            ))}
          </div>
        </PlaybookSection>

        <PlaybookSection title="Pricing Strategy" icon={DollarSign}>
          <div className="space-y-3 text-sm">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-2 bg-gray-50 rounded-lg text-center">
                <div className="text-xs text-gray-500">Value</div>
                <div className="font-semibold text-navy">{pricing.valueRange}</div>
              </div>
              <div className="p-2 bg-gray-50 rounded-lg text-center">
                <div className="text-xs text-gray-500">Premium</div>
                <div className="font-semibold text-navy">{pricing.premiumRange}</div>
              </div>
              <div className="p-2 bg-gray-50 rounded-lg text-center">
                <div className="text-xs text-gray-500">Super-Premium</div>
                <div className="font-semibold text-navy">{pricing.superPremiumRange}</div>
              </div>
              <div className="p-2 bg-gray-50 rounded-lg text-center">
                <div className="text-xs text-gray-500">Ultra-Premium</div>
                <div className="font-semibold text-navy">{pricing.ultraPremiumRange}</div>
              </div>
            </div>
            <div><span className="font-semibold text-navy">Avg On-Trade Pour:</span> {pricing.avgOnTradePour}</div>
            <div><span className="font-semibold text-navy">Typical Markup:</span> {pricing.avgMarkup}</div>
            <div><span className="font-semibold text-navy">Key Channels:</span> {pricing.keyChannels}</div>
            <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg flex gap-2">
              <Zap size={14} className="text-amber-600 mt-0.5 flex-shrink-0" />
              <span className="text-amber-800 text-xs">{pricing.tip}</span>
            </div>
          </div>
        </PlaybookSection>

        <PlaybookSection title="Competitor Landscape" icon={Target}>
          <div className="space-y-3 text-sm">
            {competitors.leader && (
              <div className="p-3 bg-navy/5 rounded-lg">
                <div className="font-semibold text-navy mb-1">Market Leader: {competitors.leader}</div>
                <div className="text-gray-600 text-xs">{competitors.insight}</div>
              </div>
            )}
            {competitors.challengers && (
              <div>
                <div className="font-semibold text-navy text-xs uppercase tracking-wider mb-2">Challengers</div>
                <div className="flex flex-wrap gap-2">
                  {competitors.challengers.map((c, i) => <Badge key={i}>{c}</Badge>)}
                </div>
              </div>
            )}
            {competitors.emerging && (
              <div>
                <div className="font-semibold text-navy text-xs uppercase tracking-wider mb-2">Emerging Brands</div>
                <div className="flex flex-wrap gap-2">
                  {competitors.emerging.map((c, i) => <Badge key={i}>{c}</Badge>)}
                </div>
              </div>
            )}
          </div>
        </PlaybookSection>

        <PlaybookSection title="Entry Timeline" icon={Clock}>
          <div className="space-y-3">
            {ENTRY_TIMELINE.map((milestone, i) => (
              <div key={i} className="flex gap-3">
                <div className="flex flex-col items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${milestone.month <= 0 ? 'bg-navy text-white' : 'bg-gray-200 text-gray-600'}`}>
                    {milestone.month === 0 ? 'GO' : `M${milestone.month}`}
                  </div>
                  {i < ENTRY_TIMELINE.length - 1 && <div className="w-px flex-1 bg-gray-200 my-1" />}
                </div>
                <div className="flex-1 pb-4">
                  <div className="text-sm font-semibold text-navy">{milestone.label}</div>
                  <ul className="mt-1 space-y-0.5">
                    {milestone.tasks.map((task, j) => (
                      <li key={j} className="text-xs text-gray-600 flex items-start gap-1.5">
                        <ChevronRight size={10} className="mt-0.5 text-gray-400 flex-shrink-0" />
                        {task}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </PlaybookSection>

        <PlaybookSection title="Estimated Costs" icon={DollarSign}>
          <div className="mb-4">
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={costChartData} layout="vertical" margin={{ left: 10, right: 20, top: 5, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                <XAxis type="number" tickFormatter={v => `${currency}${(v/1000).toFixed(0)}k`} tick={{ fontSize: 11 }} />
                <YAxis type="category" dataKey="name" width={130} tick={{ fontSize: 10 }} />
                <Tooltip formatter={v => `${currency}${v.toLocaleString()}`} />
                <Bar dataKey="value" fill={CHART_COLORS.primary} radius={[0, 4, 4, 0]}>
                  {costChartData.map((_, i) => (
                    <Cell key={i} fill={i === costChartData.length - 1 ? CHART_COLORS.accent : CHART_COLORS.primary} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="text-right">
            <span className="text-sm text-gray-500">Total estimated: </span>
            <span className="text-lg font-bold text-navy">{currency}{totalCost.toLocaleString()}</span>
          </div>
        </PlaybookSection>
      </div>
    </div>
  )
}

export default function MarketEntryWizard() {
  const [step, setStep] = useState(1)
  const [category, setCategory] = useState(null)
  const [market, setMarket] = useState(null)

  const handleCategorySelect = (cat) => {
    setCategory(cat)
    setStep(2)
  }
  const handleMarketSelect = (mkt) => {
    setMarket(mkt)
    setStep(3)
  }

  return (
    <div className="max-w-7xl mx-auto">
      <SubPageNav group="planning" />
      <PageHeader
        title="Market Entry Wizard"
        subtitle="Step-by-step playbook for entering new markets"
        icon={<Target size={20} />}
      />

      <StepIndicator current={step} />

      <Card className="p-6">
        {step > 1 && (
          <button
            onClick={() => setStep(step - 1)}
            className="flex items-center gap-1 text-sm text-gray-500 hover:text-navy mb-4 transition-colors"
          >
            <ChevronLeft size={14} /> Back
          </button>
        )}

        {step === 1 && <CategorySelect selected={category} onSelect={handleCategorySelect} />}
        {step === 2 && <MarketSelect selected={market} onSelect={handleMarketSelect} />}
        {step === 3 && category && market && <Playbook category={category} market={market} />}
      </Card>
    </div>
  )
}
