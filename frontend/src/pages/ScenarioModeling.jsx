import React, { useState } from 'react'
import {
  BarChart, Bar, Cell,
  XAxis, YAxis, Tooltip, CartesianGrid
} from 'recharts'
import {
  Target, DollarSign, TrendingUp, Package, Building2,
  ShieldAlert, Clock, Star, ChevronDown, ChevronUp, ChevronRight,
  ArrowRight, Check, MapPin, Share2, Megaphone, Layers
} from 'lucide-react'
import {
  Card, MetricCard, PageHeader, BentoGrid, DataTable, ChartCard,
  DrillDown, Badge, SectionHeader, SourceList,
  BottomSheet, SubPageNav
} from '../components/ui'
import {
  PRODUCT_CATEGORIES, TARGET_MARKETS, MANUFACTURING_ORIGINS,
  BRAND_ARCHETYPES, COST_BREAKDOWN, GO_TO_MARKET_PITFALLS,
  TIMELINE_MILESTONES, UK_REGIONS, VENUE_TYPES, SOCIAL_MEDIA_TARGETING,
  CAMPAIGN_BUDGET_TIERS, SCENARIO_SOURCES
} from '../data/scenarioData'

/* \u2500\u2500 Design tokens \u2500\u2500 */
const GOLD = '#C9A96E'
const NAVY = '#1A1F36'
const PIE_COLORS = [NAVY, GOLD, '#2563EB', '#059669', '#F59E0B']

/* \u2500\u2500 Helpers \u2500\u2500 */
const gbp = (v) => `\u00a3${v.toFixed(2)}`

/* \u2500\u2500 Pre-built scenario templates \u2500\u2500 */
const SCENARIO_TEMPLATES = [
  {
    id: 'market-entry',
    label: 'UK Market Entry',
    icon: Target,
    desc: 'Launch a new spirits brand into the UK on-trade and off-trade',
    defaults: { category: 'gin', markets: ['uk'], archetype: 'craft' },
  },
  {
    id: 'expansion',
    label: 'Multi-Market Expansion',
    icon: Layers,
    desc: 'Expand an existing UK brand into EU and US markets',
    defaults: { category: 'tequila', markets: ['uk', 'eu', 'us'], archetype: 'celebrity' },
  },
  {
    id: 'nolo-launch',
    label: 'No/Low Alcohol Launch',
    icon: TrendingUp,
    desc: 'DTC-first no/low alcohol brand targeting wellness consumers',
    defaults: { category: 'nolo', markets: ['uk'], archetype: 'wellness' },
  },
  {
    id: 'campaign',
    label: 'Summer Campaign',
    icon: Megaphone,
    desc: 'UK regional activation campaign for an existing product',
    defaults: { mode: 'campaign' },
  },
]


export default function ScenarioModeling() {
  /* \u2500\u2500 Mode: 'overview' | 'brand' | 'campaign' \u2500\u2500 */
  const [mode, setMode] = useState('overview')

  /* \u2500\u2500 Brand scenario state \u2500\u2500 */
  const [selectedCategory, setSelectedCategory] = useState('gin')
  const [selectedMarkets, setSelectedMarkets] = useState(['uk'])
  const [selectedArchetype, setSelectedArchetype] = useState('craft')

  /* \u2500\u2500 Brand mode step flow \u2500\u2500 */
  const [brandStep, setBrandStep] = useState(0) // 0=Select, 1=Economics, 2=Timeline, 3=Risks

  /* \u2500\u2500 Campaign state \u2500\u2500 */
  const [campaignStep, setCampaignStep] = useState(0)
  const [expandedRegion, setExpandedRegion] = useState(null)
  const [socialPlatform, setSocialPlatform] = useState('instagram')
  const [sheetTemplate, setSheetTemplate] = useState(null)

  /* \u2500\u2500 Derived \u2500\u2500 */
  const costs = COST_BREAKDOWN[selectedCategory] || COST_BREAKDOWN.gin
  const margin = ((1 - costs.total_cogs / costs.rrp_mid) * 100).toFixed(0)
  const archetype = BRAND_ARCHETYPES.find(a => a.id === selectedArchetype) || BRAND_ARCHETYPES[0]
  const totalRisks = GO_TO_MARKET_PITFALLS.reduce((s, c) => s + c.items.length, 0)
  const criticalRisks = GO_TO_MARKET_PITFALLS.reduce((s, c) => s + c.items.filter(i => i.impact === 'Critical').length, 0)

  const selectTemplate = (template) => {
    if (template.defaults.mode === 'campaign') {
      setMode('campaign')
      return
    }
    setSelectedCategory(template.defaults.category)
    setSelectedMarkets(template.defaults.markets)
    setSelectedArchetype(template.defaults.archetype)
    setMode('brand')
  }

  /* \u2550\u2550\u2550\u2550\u2550 RENDER \u2550\u2550\u2550\u2550\u2550 */
  return (
    <div className="space-y-6">
      <PageHeader
        title="Scenario Modeling"
        subtitle="Go-to-market planning, unit economics, campaign intelligence & financial modeling \u00b7 Data as of March 2026"
        breadcrumbs={[
          { label: 'Command Centre', to: '/' },
          { label: 'Scenarios' },
        ]}
        action={
          mode !== 'overview' && (
            <button
              onClick={() => setMode('overview')}
              className="flex items-center gap-1 px-3 py-1.5 text-xs text-gray-500 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <ChevronRight size={12} className="rotate-180" /> Back to overview
            </button>
          )
        }
      />
      <SubPageNav group="planning" />

      {/* \u2550\u2550\u2550\u2550\u2550 TIER 1: OVERVIEW (DEFAULT) \u2550\u2550\u2550\u2550\u2550 */}
      {mode === 'overview' && (
        <>
          {/* Hero + KPIs */}
          <BentoGrid>
            <BentoGrid.Hero>
              <Card className="h-full" padding="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="text-label text-gray-500 uppercase tracking-wide mb-1">Scenario Builder</p>
                    <p className="text-2xl font-bold text-navy">Plan Your Market Entry</p>
                    <p className="text-xs text-gray-500 mt-2 max-w-md">
                      Model unit economics, assess go-to-market risks, compare manufacturing origins,
                      and plan regional activation campaigns \u2014 all from the perspective of a new-to-market brand.
                    </p>
                  </div>
                  <div className="p-3 rounded-xl bg-gold/10">
                    <Target size={24} className="text-gold" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3 mt-auto">
                  <div className="bg-gray-50 rounded-lg p-3">
                    <p className="text-xs text-gray-500 uppercase">Categories</p>
                    <p className="text-lg font-bold text-navy">{PRODUCT_CATEGORIES.length}</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3">
                    <p className="text-xs text-gray-500 uppercase">Markets</p>
                    <p className="text-lg font-bold text-navy">{TARGET_MARKETS.length}</p>
                  </div>
                </div>
              </Card>
            </BentoGrid.Hero>

            <MetricCard
              label="Brand Archetypes"
              value={`${BRAND_ARCHETYPES.length} types`}
              subtitle="Celebrity, Craft, Heritage, Disruptor, Wellness"
              icon={Star}
            />
            <MetricCard
              label="Risk Register"
              value={`${totalRisks} risks`}
              subtitle={`${criticalRisks} critical \u00b7 4 categories`}
              icon={ShieldAlert}
              change={`${criticalRisks} critical`}
              direction="down"
            />
            <MetricCard
              label="UK Regions"
              value={`${UK_REGIONS.length} cities`}
              subtitle="Zone-level targeting data"
              icon={MapPin}
            />
            <MetricCard
              label="Venue Types"
              value={`${VENUE_TYPES.length} types`}
              subtitle="Activation cost & fit scoring"
              icon={Building2}
            />
          </BentoGrid>

          {/* Quick-start scenario templates */}
          <SectionHeader size="md">Quick-Start Scenarios</SectionHeader>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {SCENARIO_TEMPLATES.map((t) => (
              <Card key={t.id} hover padding="p-4"
                onClick={() => {
                  if (window.innerWidth < 1024) {
                    setSheetTemplate(t)
                  } else {
                    selectTemplate(t)
                  }
                }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className="p-2 rounded-lg bg-gold/10">
                    <t.icon size={16} className="text-gold" />
                  </div>
                  <p className="text-sm font-semibold text-navy">{t.label}</p>
                </div>
                <p className="text-xs text-gray-500 leading-relaxed">{t.desc}</p>
                <div className="flex items-center gap-1 mt-3 text-xs text-gold font-medium">
                  Start scenario <ArrowRight size={10} />
                </div>
              </Card>
            ))}
          </div>

          {/* Mobile BottomSheet for template detail */}
          <BottomSheet
            open={!!sheetTemplate}
            onClose={() => setSheetTemplate(null)}
            title={sheetTemplate?.label}
          >
            {sheetTemplate && (
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-xl bg-gold/10">
                    <sheetTemplate.icon size={20} className="text-gold" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-navy">{sheetTemplate.label}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{sheetTemplate.desc}</p>
                  </div>
                </div>
                {sheetTemplate.defaults.category && (
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-gray-50 rounded-lg p-3">
                      <p className="text-xs text-gray-500 uppercase">Category</p>
                      <p className="text-sm font-bold text-navy">{sheetTemplate.defaults.category}</p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3">
                      <p className="text-xs text-gray-500 uppercase">Markets</p>
                      <p className="text-sm font-bold text-navy">{sheetTemplate.defaults.markets?.join(', ').toUpperCase()}</p>
                    </div>
                  </div>
                )}
                <button
                  onClick={() => { selectTemplate(sheetTemplate); setSheetTemplate(null) }}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 min-h-[44px] bg-navy text-white font-medium text-sm rounded-lg hover:bg-navy/90 transition touch-manipulation"
                >
                  Launch Scenario <ArrowRight size={14} />
                </button>
              </div>
            )}
          </BottomSheet>

          {/* Key assumptions summary */}
          <DrillDown
            title="Key Assumptions & Methodology"
            summary="Cost models, duty rates, and market sizing data sources"
          >
            <div className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                <Card padding="p-3">
                  <p className="text-[10px] font-semibold text-gray-500 uppercase mb-1">Duty Basis</p>
                  <p className="text-xs text-gray-700">UK spirits duty: \u00a328.74/litre of pure alcohol (2025 rates). RTD duty calculated at 5% ABV unless specified.</p>
                </Card>
                <Card padding="p-3">
                  <p className="text-[10px] font-semibold text-gray-500 uppercase mb-1">Cost Models</p>
                  <p className="text-xs text-gray-700">Unit economics based on 70cl bottles (spirits) or 250ml cans (RTD). COGS exclude warehousing and insurance.</p>
                </Card>
                <Card padding="p-3">
                  <p className="text-[10px] font-semibold text-gray-500 uppercase mb-1">Market Data</p>
                  <p className="text-xs text-gray-700">Market sizes from IWSR 2025. Channel splits from CGA Nielsen. Social media CPMs from Meta/TikTok Business Manager.</p>
                </Card>
              </div>
              <SourceList sources={SCENARIO_SOURCES} />
            </div>
          </DrillDown>
        </>
      )}

      {/* \u2550\u2550\u2550\u2550\u2550 TIER 2: BRAND-TO-MARKET SCENARIO (stepped flow) \u2550\u2550\u2550\u2550\u2550 */}
      {mode === 'brand' && (
        <div className="space-y-6">
          {/* Step progress indicator */}
          <StepProgress
            steps={[
              { label: 'Category & Market', icon: Target },
              { label: 'Cost Breakdown', icon: DollarSign },
              { label: 'Timeline & GTM', icon: Clock },
              { label: 'Risk Assessment', icon: ShieldAlert },
            ]}
            current={brandStep}
            onChange={setBrandStep}
          />

          {/* STEP 0: Select Category + Market + Archetype */}
          {brandStep === 0 && (
            <>
              <Card padding="p-4">
                <div className="space-y-4">
                  <div>
                    <p className="text-[10px] font-semibold text-gray-500 uppercase mb-2">Product Category</p>
                    <div className="flex flex-wrap gap-1.5">
                      {PRODUCT_CATEGORIES.map(cat => (
                        <button
                          key={cat.id}
                          onClick={() => setSelectedCategory(cat.id)}
                          className={`px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all border ${
                            selectedCategory === cat.id
                              ? 'bg-navy text-white border-navy'
                              : 'bg-white text-gray-500 border-gray-200 hover:border-navy/30'
                          }`}
                        >
                          {cat.label}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-[10px] font-semibold text-gray-500 uppercase mb-2">Target Markets</p>
                    <div className="flex flex-wrap gap-1.5">
                      {TARGET_MARKETS.map(m => {
                        const active = selectedMarkets.includes(m.id)
                        return (
                          <button
                            key={m.id}
                            onClick={() => setSelectedMarkets(active ? selectedMarkets.filter(s => s !== m.id) : [...selectedMarkets, m.id])}
                            className={`px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all border ${
                              active ? 'bg-navy text-white border-navy' : 'bg-white text-gray-500 border-gray-200 hover:border-navy/30'
                            }`}
                          >
                            {m.flag} {m.label}
                          </button>
                        )
                      })}
                    </div>
                  </div>
                  <div>
                    <p className="text-[10px] font-semibold text-gray-500 uppercase mb-2">Brand Archetype</p>
                    <div className="flex flex-wrap gap-1.5">
                      {BRAND_ARCHETYPES.map(a => (
                        <button
                          key={a.id}
                          onClick={() => setSelectedArchetype(a.id)}
                          className={`px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all border ${
                            selectedArchetype === a.id
                              ? 'bg-navy text-white border-navy'
                              : 'bg-white text-gray-500 border-gray-200 hover:border-navy/30'
                          }`}
                        >
                          {a.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>

              <BentoGrid>
                <MetricCard label="COGS per Unit" value={gbp(costs.total_cogs)} subtitle={`${PRODUCT_CATEGORIES.find(c => c.id === selectedCategory)?.label || selectedCategory}`} icon={DollarSign} />
                <MetricCard label="RRP Range" value={`${gbp(costs.rrp_low)}\u2013${gbp(costs.rrp_high)}`} subtitle={`Mid: ${gbp(costs.rrp_mid)}`} icon={Package} />
                <MetricCard label="Gross Margin" value={`${margin}%`} subtitle="At mid-range RRP" icon={TrendingUp} direction={Number(margin) > 50 ? 'up' : 'down'} />
                <MetricCard label="Risk Level" value={archetype.riskLevel} subtitle={`Success rate: ${archetype.successRate}`} icon={ShieldAlert} />
              </BentoGrid>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {BRAND_ARCHETYPES.map(a => (
                  <Card key={a.id} hover onClick={() => setSelectedArchetype(a.id)} padding="p-3" className={selectedArchetype === a.id ? 'ring-2 ring-gold' : ''}>
                    <p className="text-xs font-semibold text-navy">{a.label}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{a.examples}</p>
                    <div className="grid grid-cols-2 gap-x-3 mt-2 text-xs">
                      <div><span className="text-gray-400">Premium:</span> <span className="font-medium text-navy">{a.premiumMultiple}</span></div>
                      <div><span className="text-gray-400">Risk:</span> <span className="font-medium text-navy">{a.riskLevel}</span></div>
                      <div><span className="text-gray-400">Success:</span> <span className="font-medium text-emerald-600">{a.successRate}</span></div>
                      <div><span className="text-gray-400">Marketing:</span> <span className="font-medium text-navy">{a.marketingWeight}</span></div>
                    </div>
                  </Card>
                ))}
              </div>
            </>
          )}

          {/* STEP 1: Cost Breakdown + Economics */}
          {brandStep === 1 && (
            <>
              <CostWaterfall costs={costs} />

              {selectedMarkets.length > 0 && (
                <div className="space-y-4">
                  <SectionHeader size="md">Market Channel Analysis</SectionHeader>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {selectedMarkets.map(mId => {
                      const m = TARGET_MARKETS.find(t => t.id === mId)
                      if (!m) return null
                      const channelData = [
                        { name: 'On-Trade', value: m.channels.onTrade, fill: NAVY },
                        { name: 'Off-Trade', value: m.channels.offTrade, fill: GOLD },
                        { name: 'E-Commerce', value: m.channels.eCommerce, fill: '#2563EB' },
                        { name: 'Travel Retail', value: m.channels.travelRetail, fill: '#059669' },
                      ]
                      return (
                        <Card key={mId} padding="p-3">
                          <p className="text-xs font-semibold text-navy mb-0.5">{m.flag} {m.label}</p>
                          <p className="text-xs text-gray-500 mb-2">Pop: {m.pop} \u00b7 Market: {m.spiritsMarket}</p>
                          <div className="space-y-1.5">
                            {channelData.map((c, j) => (
                              <div key={j}>
                                <div className="flex items-center justify-between text-xs mb-0.5">
                                  <div className="flex items-center gap-1">
                                    <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: c.fill }} />
                                    <span className="text-gray-500">{c.name}</span>
                                  </div>
                                  <span className="font-medium text-navy">{c.value}%</span>
                                </div>
                                <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                  <div className="h-full rounded-full" style={{ width: `${c.value}%`, backgroundColor: c.fill }} />
                                </div>
                              </div>
                            ))}
                          </div>
                        </Card>
                      )
                    })}
                  </div>
                </div>
              )}

              <DrillDown title="Manufacturing Origin Comparison" summary={`${MANUFACTURING_ORIGINS.length} production origins \u2014 duty rates, lead times & costs`}>
                <DataTable
                  columns={[
                    { key: 'label', label: 'Origin', sortable: true, render: (v) => <span className="font-medium text-navy">{v}</span> },
                    { key: 'leadTime', label: 'Lead Time' },
                    { key: 'minOrder', label: 'Min Order' },
                    { key: 'avgCost', label: 'Avg Cost', align: 'right' },
                    ...selectedMarkets.map(mId => {
                      const market = TARGET_MARKETS.find(t => t.id === mId)
                      return {
                        key: `duty_${mId}`,
                        label: `${market?.label || mId} Duty`,
                        render: (_, row) => {
                          const duty = row.duties[mId]
                          const isFree = duty === 0 || (typeof duty === 'string' && duty.includes('0%'))
                          return <span className={`text-xs font-medium ${isFree ? 'text-emerald-600' : 'text-red-600'}`}>
                            {duty === 0 ? '0% (duty free)' : duty}
                          </span>
                        }
                      }
                    }),
                  ]}
                  data={MANUFACTURING_ORIGINS}
                  compact
                />
              </DrillDown>
            </>
          )}

          {/* STEP 2: Timeline + Go-to-Market */}
          {brandStep === 2 && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <LaunchTimeline />
              <Card padding="p-4">
                <p className="text-xs font-semibold text-navy mb-3">Scenario Summary</p>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between border-b border-gray-100 pb-2"><span className="text-gray-500">Category</span><span className="font-medium text-navy">{PRODUCT_CATEGORIES.find(c => c.id === selectedCategory)?.label}</span></div>
                  <div className="flex justify-between border-b border-gray-100 pb-2"><span className="text-gray-500">Archetype</span><span className="font-medium text-navy">{archetype.label}</span></div>
                  <div className="flex justify-between border-b border-gray-100 pb-2"><span className="text-gray-500">Markets</span><span className="font-medium text-navy">{selectedMarkets.map(m => TARGET_MARKETS.find(t => t.id === m)?.label).join(', ')}</span></div>
                  <div className="flex justify-between border-b border-gray-100 pb-2"><span className="text-gray-500">COGS / Unit</span><span className="font-medium text-navy">{gbp(costs.total_cogs)}</span></div>
                  <div className="flex justify-between border-b border-gray-100 pb-2"><span className="text-gray-500">Gross Margin</span><span className="font-medium text-emerald-600">{margin}%</span></div>
                  <div className="flex justify-between"><span className="text-gray-500">Success Rate</span><span className="font-medium text-navy">{archetype.successRate}</span></div>
                </div>
              </Card>
            </div>
          )}

          {/* STEP 3: Risk Assessment + Pitfalls */}
          {brandStep === 3 && (
            <>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <PitfallsPanel />
                <Card padding="p-4">
                  <p className="text-xs font-semibold text-navy mb-1">Risk Summary</p>
                  <p className="text-xs text-gray-500 mb-3">{totalRisks} risks across {GO_TO_MARKET_PITFALLS.length} categories</p>
                  <div className="space-y-2">
                    <div className="bg-red-50 rounded-lg p-3 border border-red-100">
                      <p className="text-xs font-semibold text-red-800">{criticalRisks} Critical Risks</p>
                      <p className="text-xs text-red-700 mt-0.5">Require immediate mitigation before launch</p>
                    </div>
                    <div className="bg-amber-50 rounded-lg p-3 border border-amber-100">
                      <p className="text-xs font-semibold text-amber-800">{totalRisks - criticalRisks} Non-Critical Risks</p>
                      <p className="text-xs text-amber-700 mt-0.5">Monitor and plan contingencies</p>
                    </div>
                  </div>
                </Card>
              </div>
              <SourceList sources={SCENARIO_SOURCES} />
            </>
          )}

          {/* Step navigation */}
          <StepNav
            current={brandStep}
            total={4}
            onPrev={() => setBrandStep(Math.max(0, brandStep - 1))}
            onNext={() => setBrandStep(Math.min(3, brandStep + 1))}
            onReset={() => { setMode('overview') }}
          />
        </div>
      )}

      {/* \u2550\u2550\u2550\u2550\u2550 TIER 2: CAMPAIGN PLANNER \u2550\u2550\u2550\u2550\u2550 */}
      {mode === 'campaign' && (
        <div className="space-y-6">
          {/* Campaign step progress */}
          <StepProgress
            steps={[
              { label: 'Overview & KPIs', icon: Target },
              { label: 'Region Analysis', icon: MapPin },
              { label: 'Venues & Social', icon: Building2 },
              { label: 'Budgets & ROI', icon: DollarSign },
            ]}
            current={campaignStep}
            onChange={setCampaignStep}
          />

          {/* STEP 0: Campaign overview + KPIs */}
          {campaignStep === 0 && (
            <>
              <Card padding="p-4" className="border-l-3 border-l-gold">
                <p className="text-sm font-semibold text-navy mb-1">UK Regional Campaign Planner</p>
                <p className="text-xs text-gray-500 leading-relaxed">
                  Optimal regions, venues, and digital activation zones ranked by engagement potential and ROI.
                  Data covers {UK_REGIONS.length} UK cities with zone-level targeting.
                </p>
              </Card>

              <BentoGrid>
                <MetricCard
                  label="Cities Covered"
                  value={`${UK_REGIONS.length}`}
                  subtitle="Zone-level activation data"
                  icon={MapPin}
                />
                <MetricCard
                  label="Venue Types"
                  value={`${VENUE_TYPES.length}`}
                  subtitle="With fit scoring & cost data"
                  icon={Building2}
                />
                <MetricCard
                  label="Social Platforms"
                  value="3"
                  subtitle="Instagram, TikTok, Meta"
                  icon={Share2}
                />
                <MetricCard
                  label="Budget Tiers"
                  value={`${CAMPAIGN_BUDGET_TIERS.length}`}
                  subtitle="\u00a315K to \u00a3350K"
                  icon={DollarSign}
                />
              </BentoGrid>

              <DrillDown
                title="Key Assumptions & Methodology"
                summary="Cost models, duty rates, and market sizing data sources"
              >
                <SourceList sources={SCENARIO_SOURCES} />
              </DrillDown>
            </>
          )}

          {/* STEP 1: Region targeting */}
          {campaignStep === 1 && (
            <>
              <DrillDown
                title="UK Region Analysis"
                summary={`${UK_REGIONS.length} cities \u2014 ranked by cocktail index and activation potential`}
                defaultOpen
              >
                <RegionAnalysis regions={UK_REGIONS} expanded={expandedRegion} setExpanded={setExpandedRegion} />
              </DrillDown>

              <DrillDown
                title="Full Region Data"
                summary="Searchable table of all UK regions and zones"
              >
                <DataTable
                  columns={[
                    { key: 'name', label: 'City', sortable: true, render: (v) => <span className="font-medium text-navy">{v}</span> },
                    { key: 'pop', label: 'Population', sortable: true },
                    { key: 'avgSpend', label: 'Avg Spend', align: 'right', sortable: true },
                    { key: 'cocktailIndex', label: 'Cocktail Index', align: 'right', sortable: true, render: (v) => (
                      <span className={`font-semibold ${v > 120 ? 'text-emerald-600' : v > 100 ? 'text-gold' : 'text-gray-500'}`}>{v}</span>
                    )},
                    { key: 'spritzAffinity', label: 'Affinity', render: (v) => (
                      <Badge variant={v === 'Very High' ? 'success' : v === 'High' ? 'default' : 'warning'}>{v}</Badge>
                    )},
                    { key: 'zones', label: 'Zones', align: 'right', render: (v) => v?.length || 0, sortable: false },
                  ]}
                  data={UK_REGIONS}
                  searchable
                  searchPlaceholder="Search cities\u2026"
                  searchKey="name"
                />
              </DrillDown>
            </>
          )}

          {/* STEP 2: Venues & Social */}
          {campaignStep === 2 && (
            <>
              <DrillDown
                title="Venue Type Strategy"
                summary={`${VENUE_TYPES.length} venue types with suitability scoring and activation costs`}
                defaultOpen
              >
                <VenueTypeGrid />
              </DrillDown>

              <DrillDown
                title="Social Media Geo-Targeting"
                summary="Platform-specific audience data, CPM ranges, and geo-targets"
                defaultOpen
              >
                <SocialTargetingPanel platform={socialPlatform} setPlatform={setSocialPlatform} />
              </DrillDown>
            </>
          )}

          {/* STEP 3: Budget tiers */}
          {campaignStep === 3 && (
            <>
              <DrillDown
                title="Campaign Budget Tiers & ROI"
                summary={`${CAMPAIGN_BUDGET_TIERS.length} tiers from \u00a315K to \u00a3350K with projected ROI`}
                defaultOpen
              >
                <BudgetTierCards />
              </DrillDown>

              <SourceList sources={SCENARIO_SOURCES} />
            </>
          )}

          {/* Campaign step navigation */}
          <StepNav
            current={campaignStep}
            total={4}
            onPrev={() => setCampaignStep(Math.max(0, campaignStep - 1))}
            onNext={() => setCampaignStep(Math.min(3, campaignStep + 1))}
            onReset={() => { setMode('overview') }}
          />
        </div>
      )}
    </div>
  )
}


/* \u2550\u2550\u2550\u2550\u2550 SUB-COMPONENTS \u2550\u2550\u2550\u2550\u2550 */

function StepProgress({ steps, current, onChange }) {
  return (
    <Card padding="p-3">
      {/* Mobile: simple text indicator */}
      <div className="flex sm:hidden items-center justify-between">
        <span className="text-xs font-medium text-navy">
          Step {current + 1} of {steps.length} &mdash; {steps[current].label}
        </span>
        <div className="flex items-center gap-1">
          {steps.map((_, idx) => (
            <button
              key={idx}
              onClick={() => onChange(idx)}
              className={`w-2 h-2 rounded-full transition-all touch-manipulation ${
                current === idx ? 'bg-navy' : current > idx ? 'bg-gold' : 'bg-gray-200'
              }`}
            />
          ))}
        </div>
      </div>
      {/* Desktop: full horizontal stepper */}
      <div className="hidden sm:flex items-center gap-0 overflow-x-auto">
        {steps.map((step, idx) => {
          const StepIcon = step.icon
          const isActive = current === idx
          const isComplete = current > idx
          return (
            <React.Fragment key={idx}>
              {idx > 0 && (
                <div className={`flex-shrink-0 w-6 sm:w-10 h-0.5 ${isComplete ? 'bg-gold' : 'bg-gray-200'}`} />
              )}
              <button
                onClick={() => onChange(idx)}
                className={`flex items-center gap-1.5 px-3 py-2 min-h-[44px] rounded-lg text-xs font-medium whitespace-nowrap transition-all touch-manipulation flex-shrink-0 ${
                  isActive
                    ? 'bg-navy text-white'
                    : isComplete
                    ? 'bg-gold/10 text-gold hover:bg-gold/20'
                    : 'bg-gray-50 text-gray-500 hover:bg-gray-100'
                }`}
              >
                <div className={`flex items-center justify-center w-5 h-5 rounded-full text-[10px] font-bold flex-shrink-0 ${
                  isActive ? 'bg-white/20 text-white' : isComplete ? 'bg-gold text-white' : 'bg-gray-200 text-gray-500'
                }`}>
                  {isComplete ? <Check size={10} /> : idx + 1}
                </div>
                <StepIcon size={14} />
                <span>{step.label}</span>
              </button>
            </React.Fragment>
          )
        })}
      </div>
    </Card>
  )
}

function StepNav({ current, total, onPrev, onNext, onReset }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <button
        onClick={onPrev}
        disabled={current === 0}
        className="flex items-center gap-1.5 px-4 py-2.5 min-h-[44px] w-full sm:w-auto bg-gray-100 text-gray-700 font-medium text-xs rounded-lg hover:bg-gray-200 disabled:opacity-40 disabled:cursor-not-allowed transition touch-manipulation"
      >
        <ChevronRight size={14} className="rotate-180" /> Previous
      </button>
      <span className="text-xs text-gray-500 flex-shrink-0">Step {current + 1} of {total}</span>
      {current === total - 1 ? (
        onReset ? (
          <button
            onClick={onReset}
            className="flex items-center gap-1.5 px-4 py-2.5 min-h-[44px] w-full sm:w-auto bg-gold text-white font-medium text-xs rounded-lg hover:bg-gold/90 transition touch-manipulation"
          >
            Start Over
          </button>
        ) : null
      ) : (
        <button
          onClick={onNext}
          className="flex items-center gap-1.5 px-4 py-2.5 min-h-[44px] w-full sm:w-auto bg-navy text-white font-medium text-xs rounded-lg hover:bg-navy/90 transition touch-manipulation"
        >
          Next <ChevronRight size={14} />
        </button>
      )}
    </div>
  )
}

function CostWaterfall({ costs }) {
  const items = [
    { name: 'Liquid', value: costs.liquid, fill: GOLD },
    { name: 'Packaging', value: costs.packaging, fill: NAVY },
    { name: 'Label', value: costs.labeling, fill: '#6B7280' },
    { name: 'Filling', value: costs.filling, fill: '#9CA3AF' },
    { name: 'Duty', value: costs.duty, fill: '#DC2626' },
    { name: 'Logistics', value: costs.logistics, fill: '#2563EB' },
    { name: 'Dist. Margin', value: costs.margin_distributor, fill: '#7C3AED' },
    { name: 'Retail Margin', value: costs.margin_retailer, fill: '#059669' },
    { name: 'Marketing', value: costs.marketing_per_unit, fill: '#F59E0B' },
  ]
  return (
    <div className="space-y-4">
      <ChartCard title="Unit Economics Breakdown" subtitle="Cost waterfall from production to shelf (per unit, GBP)" height={220}>
        <BarChart data={items} margin={{ top: 5, right: 5, bottom: 5, left: 5 }} accessibilityLayer>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis dataKey="name" tick={{ fontSize: 9 }} />
          <YAxis tick={{ fontSize: 9 }} tickFormatter={v => `\u00a3${v.toFixed(2)}`} />
          <Tooltip formatter={(v) => [`\u00a3${v.toFixed(2)}`, 'Cost']} contentStyle={{ fontSize: 11, borderRadius: 8 }} />
          <Bar dataKey="value" radius={[4, 4, 0, 0]}>
            {items.map((entry, i) => <Cell key={i} fill={entry.fill} />)}
          </Bar>
        </BarChart>
      </ChartCard>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <Card padding="p-3" className="text-center">
          <p className="text-xs text-gray-500">Total COGS</p>
          <p className="text-lg font-bold text-navy">\u00a3{costs.total_cogs.toFixed(2)}</p>
        </Card>
        <Card padding="p-3" className="text-center">
          <p className="text-xs text-gray-500">RRP Range</p>
          <p className="text-lg font-bold text-gold">\u00a3{costs.rrp_low}\u2013\u00a3{costs.rrp_high}</p>
        </Card>
        <Card padding="p-3" className="text-center">
          <p className="text-xs text-gray-500">Gross Margin</p>
          <p className="text-lg font-bold text-emerald-600">{((1 - costs.total_cogs / costs.rrp_mid) * 100).toFixed(0)}%</p>
        </Card>
      </div>
    </div>
  )
}

function PitfallsPanel() {
  const [expanded, setExpanded] = useState(null)
  return (
    <Card padding="p-0">
      <div className="px-4 py-3 border-b border-gray-100">
        <p className="text-xs font-semibold text-navy flex items-center gap-1.5">
          <ShieldAlert size={14} className="text-red-500" />
          Pitfalls & Risk Register
        </p>
        <p className="text-xs text-gray-500">Common failure points when bringing a product to market</p>
      </div>
      {GO_TO_MARKET_PITFALLS.map((cat, ci) => (
        <div key={ci}>
          <button
            onClick={() => setExpanded(expanded === ci ? null : ci)}
            className="w-full flex items-center justify-between px-4 py-2.5 border-b border-gray-50 hover:bg-gray-50/50 transition-colors"
          >
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold bg-red-50 text-red-600 px-2 py-0.5 rounded">{cat.category}</span>
              <span className="text-xs text-gray-500">{cat.items.length} risks</span>
            </div>
            {expanded === ci ? <ChevronUp size={14} className="text-gray-400" /> : <ChevronDown size={14} className="text-gray-400" />}
          </button>
          {expanded === ci && (
            <div className="divide-y divide-gray-50">
              {cat.items.map((item, ii) => (
                <div key={ii} className="px-4 py-2.5 bg-gray-50/30">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-semibold text-navy">{item.risk}</span>
                    <span className={`text-xs font-bold px-1.5 py-0.5 rounded ${
                      item.impact === 'Critical' ? 'bg-red-100 text-red-700'
                        : item.impact === 'High' ? 'bg-orange-100 text-orange-700'
                        : 'bg-amber-50 text-amber-600'
                    }`}>{item.impact}</span>
                  </div>
                  <p className="text-xs text-gray-600 leading-relaxed">{item.detail}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </Card>
  )
}

function LaunchTimeline() {
  return (
    <Card padding="p-4">
      <p className="text-xs font-semibold text-navy flex items-center gap-1.5 mb-3">
        <Clock size={14} className="text-gold" />
        Go-to-Market Timeline
      </p>
      <div className="relative">
        <div className="absolute left-3 top-0 bottom-0 w-0.5 bg-gray-200" />
        {TIMELINE_MILESTONES.map((m, i) => (
          <div key={i} className="relative pl-8 pb-4 last:pb-0">
            <div
              className={`absolute left-1.5 w-3 h-3 rounded-full border-2 ${
                m.month === 0 ? 'bg-gold border-gold' : m.month < 0 ? 'bg-white border-navy' : 'bg-white border-gray-300'
              }`}
              style={{ top: '2px' }}
            />
            <div className="flex items-center gap-2 mb-1">
              <span className={`text-xs font-bold px-1.5 py-0.5 rounded ${
                m.month === 0 ? 'bg-gold text-white' : 'bg-gray-100 text-gray-600'
              }`}>
                {m.month === 0 ? 'LAUNCH' : m.month > 0 ? `+${m.month}mo` : `${m.month}mo`}
              </span>
              <span className="text-xs font-semibold text-navy">{m.label}</span>
            </div>
            <div className="flex flex-wrap gap-1">
              {m.tasks.map((t, ti) => (
                <span key={ti} className="text-xs bg-gray-50 text-gray-600 px-1.5 py-0.5 rounded border border-gray-100">{t}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}

function RegionAnalysis({ regions, expanded, setExpanded }) {
  return (
    <div className="space-y-2">
      {regions.map((region, ri) => (
        <Card key={ri} padding="p-0">
          <button
            onClick={() => setExpanded(expanded === ri ? null : ri)}
            className="w-full flex items-center justify-between px-4 py-3 hover:bg-gray-50/50 transition-colors"
          >
            <div>
              <p className="text-xs font-semibold text-navy text-left">{region.name}</p>
              <p className="text-xs text-gray-500">Pop: {region.pop} \u00b7 Avg spend: {region.avgSpend}/head</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-right">
                <p className="text-xs text-gray-500">Cocktail Index</p>
                <p className={`text-xs font-bold ${region.cocktailIndex > 120 ? 'text-emerald-600' : region.cocktailIndex > 100 ? 'text-gold' : 'text-gray-500'}`}>
                  {region.cocktailIndex}
                </p>
              </div>
              <span className={`text-xs font-bold px-1.5 py-0.5 rounded ${
                region.spritzAffinity === 'Very High' ? 'bg-green-100 text-green-700'
                  : region.spritzAffinity === 'High' ? 'bg-green-50 text-green-600'
                  : 'bg-amber-50 text-amber-600'
              }`}>{region.spritzAffinity}</span>
              {expanded === ri ? <ChevronUp size={14} className="text-gray-400" /> : <ChevronDown size={14} className="text-gray-400" />}
            </div>
          </button>
          {expanded === ri && (
            <div className="border-t border-gray-100 divide-y divide-gray-50">
              {region.zones.map((zone, zi) => (
                <div key={zi} className="px-4 py-2.5">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-medium text-navy">{zone.name}</span>
                    <div className="flex gap-2">
                      <span className="text-xs bg-blue-50 text-blue-600 px-1.5 py-0.5 rounded">{zone.bars} bars</span>
                      <span className="text-xs bg-green-50 text-green-600 px-1.5 py-0.5 rounded">{zone.terraces} terraces</span>
                      <span className={`text-xs px-1.5 py-0.5 rounded font-medium ${
                        zone.engagement === 'Very High' ? 'bg-green-100 text-green-700' : 'bg-amber-50 text-amber-600'
                      }`}>{zone.engagement}</span>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500"><span className="text-gray-500">Demographic:</span> {zone.demographic}</p>
                  <p className="text-xs text-gray-500 mt-0.5"><span className="text-gray-500">Best for:</span> <span className="text-gold font-medium">{zone.bestFor}</span></p>
                </div>
              ))}
            </div>
          )}
        </Card>
      ))}
    </div>
  )
}

function VenueTypeGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
      {VENUE_TYPES.map((v, i) => (
        <Card key={i} padding="p-3">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs font-semibold text-navy">{v.type}</p>
            <div className="flex items-center gap-1.5">
              <span className="text-xs bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded">{v.avgCover} avg cover</span>
              <span className="text-xs bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded">{v.bestSeason}</span>
            </div>
          </div>
          <div className="flex items-center gap-2 mb-2">
            <div className="flex-1 bg-gray-100 rounded-full h-1.5">
              <div className="h-1.5 rounded-full bg-gold" style={{ width: `${v.spritzFit}%` }} />
            </div>
            <span className="text-xs font-bold text-gold">{v.spritzFit}%</span>
            <span className="text-xs text-gray-500">fit</span>
          </div>
          <p className="text-xs text-gray-600 leading-relaxed">{v.notes}</p>
          <div className="mt-2 flex justify-between text-xs">
            <span className="text-gray-400">Cost: <span className="text-navy font-medium">{v.costPer}</span></span>
            <span className="text-gray-400">Reach: <span className="text-navy font-medium">{v.reachPer}</span></span>
          </div>
        </Card>
      ))}
    </div>
  )
}

function SocialTargetingPanel({ platform, setPlatform }) {
  const data = SOCIAL_MEDIA_TARGETING[platform]
  return (
    <div className="space-y-4">
      <div className="flex gap-1">
        {['instagram', 'tiktok', 'meta'].map(p => (
          <button
            key={p}
            onClick={() => setPlatform(p)}
            className={`px-2.5 py-1 rounded text-xs font-semibold transition-colors ${
              platform === p ? 'bg-navy text-white' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
            }`}
          >
            {p === 'meta' ? 'Facebook/Meta' : p.charAt(0).toUpperCase() + p.slice(1)}
          </button>
        ))}
      </div>

      <div>
        <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wide mb-2">Best Formats</p>
        <div className="flex flex-wrap gap-1">
          {data.bestFormats.map((f, i) => (
            <span key={i} className="text-xs bg-blue-50 text-blue-600 px-2 py-0.5 rounded">{f}</span>
          ))}
        </div>
      </div>

      <div>
        <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wide mb-2">Geo-Targets by ROI Potential</p>
        <div className="space-y-1.5">
          {data.geoTargets.map((g, i) => (
            <div key={i} className="flex items-center justify-between py-1.5 border-b border-gray-50 last:border-0">
              <div className="flex items-center gap-2">
                <MapPin size={10} className="text-gold" />
                <span className="text-xs text-navy font-medium">{g.area}</span>
              </div>
              <div className="flex items-center gap-3 text-xs">
                <span className="text-gray-400">Reach: <span className="font-medium text-navy">{g.reach}</span></span>
                <span className="text-gray-400">CPM: <span className="font-medium text-navy">{g.cpm}</span></span>
                <span className={`font-bold px-1.5 py-0.5 rounded ${
                  g.affinity === 'Very High' ? 'bg-green-100 text-green-700'
                    : g.affinity === 'High' ? 'bg-green-50 text-green-600'
                    : 'bg-amber-50 text-amber-600'
                }`}>{g.affinity}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wide mb-1">Peak Posting Times</p>
          <p className="text-xs text-gray-600">Weekday: <span className="font-medium text-navy">{data.peakTimes.weekday}</span></p>
          <p className="text-xs text-gray-600">Weekend: <span className="font-medium text-navy">{data.peakTimes.weekend}</span></p>
        </div>
        <div>
          <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wide mb-1">Avg CPM Range</p>
          <p className="text-sm font-bold text-gold">{data.avgCPM}</p>
        </div>
      </div>

      <div>
        <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wide mb-1">Recommended Hashtags</p>
        <div className="flex flex-wrap gap-1">
          {data.hashtags.map((h, i) => (
            <span key={i} className="text-xs text-gold font-medium">{h}</span>
          ))}
        </div>
      </div>
    </div>
  )
}

function BudgetTierCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
      {CAMPAIGN_BUDGET_TIERS.map((tier, i) => {
        const allocEntries = Object.entries(tier.allocation)
        const pieData = allocEntries.map(([k, v]) => ({ name: k, value: v }))
        return (
          <Card key={i} padding="p-4">
            <div className="flex items-center justify-between mb-2">
              <div>
                <Badge variant="default">{tier.tier}</Badge>
                <p className="text-lg font-bold text-navy mt-1">{tier.budget}</p>
                <p className="text-xs text-gray-500">{tier.duration} campaign</p>
              </div>
              <div className="w-[70px] space-y-1">
                {pieData.map((entry, j) => (
                  <div key={j} className="flex items-center gap-1 text-xs">
                    <div className="w-1.5 h-1.5 rounded-sm flex-shrink-0" style={{ backgroundColor: PIE_COLORS[j % PIE_COLORS.length] }} />
                    <span className="text-gray-500 truncate">{entry.name}</span>
                    <span className="font-medium text-navy ml-auto">{entry.value}%</span>
                  </div>
                ))}
              </div>
            </div>
            <p className="text-xs text-gray-500 mb-2">{tier.bestFor}</p>
            <div className="text-xs text-gray-500 mb-1">Reach: <span className="font-medium text-navy">{tier.reach}</span></div>
            <div className="text-xs text-gray-500 mb-2">Expected ROI: <span className="font-bold text-emerald-600">{tier.expectedROI}</span></div>
            <div className="border-t border-gray-100 pt-2">
              <p className="text-xs font-bold text-gray-500 uppercase mb-1">Key Activities</p>
              <ul className="space-y-0.5">
                {tier.activities.map((a, ai) => (
                  <li key={ai} className="text-xs text-gray-600 flex items-start gap-1">
                    <Check size={8} className="text-emerald-500 mt-0.5 flex-shrink-0" />
                    {a}
                  </li>
                ))}
              </ul>
            </div>
          </Card>
        )
      })}
    </div>
  )
}
