import React, { useState, useMemo, useCallback, useEffect } from 'react'
import {
  Factory, Globe, ChevronDown, ChevronRight, ExternalLink,
  AlertTriangle, Target, Users, Lightbulb, DollarSign, Clock, Shield,
  Zap, MapPin, TrendingUp, Search, BookOpen, Building2
} from 'lucide-react'
import {
  PageHeader, MetricCard, Card, Section, BentoGrid,
  TabGroup, FilterPills, DataTable, BottomSheet,
  SkeletonCard, SkeletonChart, SubPageNav, DataFreshness
} from '../components/ui'
import {
  MATERIAL_CATEGORIES, POS_COMPANIES, TRADE_PLATFORMS,
  DISRUPTION_STRATEGIES, CLIENT_SEGMENTS, COST_BENCHMARKS, POS_TABS
} from '../data/posData'

// ─── ICON MAP ────────────────────────────────────────────────────────────────
const ICON_MAP = {
  BookOpen, Users, Shield, Zap, Lightbulb, Factory, TrendingUp, Building2,
  Globe, DollarSign, Target, Clock
}

// ─── COMPUTED STATS ──────────────────────────────────────────────────────────
const totalFactories = MATERIAL_CATEGORIES.reduce((sum, c) => sum + c.factories.length, 0)
const avgLeadDays = Math.round(
  MATERIAL_CATEGORIES.reduce((sum, c) => {
    const low = parseInt(c.avgLeadTime)
    return sum + low
  }, 0) / MATERIAL_CATEGORIES.length
)
const topHub = 'Guangdong Province'

// ─── SUB-COMPONENTS ──────────────────────────────────────────────────────────

function FactoryCard({ factory, onMobileTap }) {
  const [expanded, setExpanded] = useState(false)
  const handleClick = () => {
    if (onMobileTap && window.innerWidth < 1024) {
      onMobileTap(factory)
    } else {
      setExpanded(!expanded)
    }
  }
  return (
    <div className="bg-gray-50 rounded-lg border border-gray-100 overflow-hidden">
      <button onClick={handleClick} className="w-full text-left p-4 min-h-[44px] hover:bg-gray-100 transition-colors touch-manipulation">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-semibold text-navy text-sm">{factory.name}</h4>
            <div className="flex items-center gap-3 mt-1 text-xs text-gray-500">
              <span className="flex items-center gap-1"><MapPin size={10} />{factory.location}</span>
              <span>Est. {factory.founded}</span>
              <span>{factory.employees} staff</span>
            </div>
          </div>
          {expanded ? <ChevronDown size={16} className="text-gray-500" /> : <ChevronRight size={16} className="text-gray-500" />}
        </div>
      </button>
      {expanded && (
        <div className="px-4 pb-4 space-y-3 border-t border-gray-200 pt-3">
          <div>
            <span className="text-xs font-medium text-gray-500">Capabilities</span>
            <p className="text-sm text-gray-700 mt-1">{factory.capabilities}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <span className="text-xs font-medium text-gray-500">MOQ</span>
              <p className="text-sm font-semibold text-navy">{factory.moq} units</p>
            </div>
            <div>
              <span className="text-xs font-medium text-gray-500">Export Markets</span>
              <p className="text-sm text-gray-700">{factory.exportMarkets}</p>
            </div>
          </div>
          <div>
            <span className="text-xs font-medium text-gray-500">Certifications</span>
            <div className="flex flex-wrap gap-1 mt-1">
              {factory.certifications.map((c, i) => (
                <span key={i} className="px-2 py-0.5 bg-blue-50 text-blue-700 text-xs rounded-full">{c}</span>
              ))}
            </div>
          </div>
          {factory.notableClients && (
            <div>
              <span className="text-xs font-medium text-gray-500">Notable Clients / Sectors</span>
              <p className="text-sm text-gray-700 mt-1">{factory.notableClients}</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

function MaterialSection({ category, onFactoryTap }) {
  const [expanded, setExpanded] = useState(false)
  return (
    <Card>
      <button
        className="w-full flex items-center justify-between text-left"
        onClick={() => setExpanded(prev => !prev)}
      >
        <div className="flex items-center gap-4">
          <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${category.color} flex items-center justify-center text-xl`}>
            {category.icon}
          </div>
          <div>
            <h3 className="text-sm font-semibold text-navy">{category.name}</h3>
            <p className="text-xs text-gray-500 mt-0.5">{category.description}</p>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <div className="text-right hidden md:block">
            <div className="text-xs text-gray-500 uppercase">Lead Time</div>
            <div className="text-xs font-semibold text-navy">{category.avgLeadTime}</div>
          </div>
          <div className="text-right hidden md:block">
            <div className="text-xs text-gray-500 uppercase">MOQ Range</div>
            <div className="text-xs font-semibold text-navy">{category.moqRange}</div>
          </div>
          <div className="text-right hidden md:block">
            <div className="text-xs text-gray-500 uppercase">Price Range</div>
            <div className="text-xs font-semibold text-gold">{category.priceRange}</div>
          </div>
          <ChevronDown size={20} className={`text-gray-500 transition-transform duration-300 ${expanded ? 'rotate-180' : ''}`} />
        </div>
      </button>
      {expanded && (
        <div className="mt-4 pt-4 border-t border-gray-100">
          <div className="flex items-center gap-2 mb-3">
            <MapPin size={14} className="text-gold" />
            <span className="text-sm font-medium text-gray-600">Key Manufacturing Hub: <span className="text-navy font-semibold">{category.keyHub}</span></span>
          </div>
          <div className="space-y-2">
            {category.factories.map((f, i) => (
              <FactoryCard key={i} factory={f} onMobileTap={onFactoryTap} />
            ))}
          </div>
        </div>
      )}
    </Card>
  )
}

function DisruptionCard({ strategy }) {
  const [expanded, setExpanded] = useState(false)
  const Icon = ICON_MAP[strategy.iconName] || Target
  return (
    <Card>
      <button
        className="w-full flex items-center justify-between text-left"
        onClick={() => setExpanded(prev => !prev)}
      >
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-lg bg-navy flex items-center justify-center">
            <Icon size={20} className="text-gold" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-navy">{strategy.title}</h3>
            <p className="text-xs text-gold font-medium mt-0.5">{strategy.impact}</p>
          </div>
        </div>
        <ChevronDown size={20} className={`text-gray-500 transition-transform duration-300 ${expanded ? 'rotate-180' : ''}`} />
      </button>
      {expanded && (
        <div className="mt-4 pt-4 border-t border-gray-100 space-y-4">
          <div>
            <h4 className="text-micro font-bold text-red-500 uppercase tracking-wider mb-1">The Problem</h4>
            <p className="text-sm text-gray-700">{strategy.problem}</p>
          </div>
          <div>
            <h4 className="text-micro font-bold text-emerald-600 uppercase tracking-wider mb-1">Our Strategy</h4>
            <p className="text-sm text-gray-700">{strategy.strategy}</p>
          </div>
          <div>
            <h4 className="text-micro font-bold text-navy uppercase tracking-wider mb-2">Tactical Execution</h4>
            <div className="space-y-1.5">
              {strategy.tactics.map((t, i) => (
                <div key={i} className="flex items-start gap-2">
                  <div className="w-5 h-5 rounded-full bg-gold/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-gold text-xs font-bold">{i + 1}</span>
                  </div>
                  <span className="text-sm text-gray-700">{t}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </Card>
  )
}

function ClientSegmentCard({ segment }) {
  const [expanded, setExpanded] = useState(false)
  const Icon = ICON_MAP[segment.iconName] || Users
  return (
    <Card>
      <button
        className="w-full flex items-center justify-between text-left"
        onClick={() => setExpanded(prev => !prev)}
      >
        <div className="flex items-center gap-4">
          <div className={`w-10 h-10 rounded-lg ${segment.color} flex items-center justify-center`}>
            <Icon size={20} className="text-white" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-navy">{segment.segment}</h3>
            <p className="text-xs text-gray-500">Budget: <span className="text-gold font-semibold">{segment.budget}</span></p>
          </div>
        </div>
        <ChevronDown size={20} className={`text-gray-500 transition-transform duration-300 ${expanded ? 'rotate-180' : ''}`} />
      </button>
      {expanded && (
        <div className="mt-4 pt-4 border-t border-gray-100 space-y-4">
          <div>
            <h4 className="text-micro font-bold text-navy uppercase tracking-wider mb-1">Key Needs</h4>
            <p className="text-sm text-gray-700">{segment.needs}</p>
          </div>
          <div>
            <h4 className="text-micro font-bold text-red-500 uppercase tracking-wider mb-2">Pain Points</h4>
            <div className="space-y-1">
              {segment.painPoints.map((p, i) => (
                <div key={i} className="flex items-start gap-2">
                  <AlertTriangle size={12} className="text-red-400 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-700">{p}</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-micro font-bold text-emerald-600 uppercase tracking-wider mb-1">Our Solution</h4>
            <p className="text-sm text-gray-700">{segment.solution}</p>
          </div>
          <div>
            <h4 className="text-micro font-bold text-gold uppercase tracking-wider mb-2">Packages</h4>
            <div className="space-y-2">
              {segment.packages.map((pkg, i) => (
                <div key={i} className="bg-gray-50 rounded-lg p-3">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-semibold text-navy text-sm">{pkg.name}</span>
                    <span className="text-gold font-bold text-sm">{pkg.price}</span>
                  </div>
                  <p className="text-xs text-gray-600">{pkg.includes}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </Card>
  )
}

// ─── COST BENCHMARK TABLE COLUMNS ────────────────────────────────────────────
const COST_TABLE_COLUMNS = [
  { key: 'item', label: 'POS Item', sortable: true },
  { key: 'factoryDirect', label: 'Factory Direct', align: 'right', sortable: false,
    render: (v) => <span className="text-emerald-600 font-semibold">{v}</span> },
  { key: 'intermediary', label: 'Via Intermediary', align: 'right', sortable: false,
    render: (v) => <span className="text-orange-500">{v}</span> },
  { key: 'retail', label: 'Retail / Agency', align: 'right', sortable: false,
    render: (v) => <span className="text-red-500">{v}</span> },
  { key: 'markup', label: 'Markup', align: 'right', sortable: false,
    render: (v) => <span className="text-gray-500 text-xs">{v}</span> },
]

// ─── FACTORY TABLE COLUMNS (Tier 3) ─────────────────────────────────────────
const allFactories = MATERIAL_CATEGORIES.flatMap(cat =>
  cat.factories.map(f => ({
    ...f,
    material: cat.name,
    materialId: cat.id,
    priceRange: cat.priceRange,
    leadTime: cat.avgLeadTime,
  }))
)

const FACTORY_TABLE_COLUMNS = [
  { key: 'name', label: 'Factory', sortable: true },
  { key: 'material', label: 'Material', sortable: true },
  { key: 'location', label: 'Location', sortable: true },
  { key: 'moq', label: 'MOQ', align: 'right', sortable: true },
  { key: 'leadTime', label: 'Lead Time', sortable: false },
  { key: 'priceRange', label: 'Price Range', sortable: false,
    render: (v) => <span className="text-gold font-semibold">{v}</span> },
  { key: 'employees', label: 'Team', align: 'right', sortable: false },
]

// ─── MAIN COMPONENT ──────────────────────────────────────────────────────────
export default function POSIntelligence() {
  const [activeTab, setActiveTab] = useState('directory')
  const [searchTerm, setSearchTerm] = useState('')
  const [materialFilter, setMaterialFilter] = useState('all')
  const [showFullTable, setShowFullTable] = useState(false)
  const [mobileDetail, setMobileDetail] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 300)
    return () => clearTimeout(timer)
  }, [])

  const handleFactoryTap = useCallback((factory) => {
    if (window.innerWidth < 1024) {
      setMobileDetail({
        title: factory.name,
        content: (
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <MapPin size={14} />{factory.location} &middot; Est. {factory.founded} &middot; {factory.employees} staff
            </div>
            <div>
              <h4 className="text-xs font-semibold text-navy mb-1">Capabilities</h4>
              <p className="text-sm text-gray-700">{factory.capabilities}</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <span className="text-xs font-medium text-gray-500">MOQ</span>
                <p className="text-sm font-semibold text-navy">{factory.moq} units</p>
              </div>
              <div>
                <span className="text-xs font-medium text-gray-500">Export Markets</span>
                <p className="text-sm text-gray-700">{factory.exportMarkets}</p>
              </div>
            </div>
            <div>
              <span className="text-xs font-medium text-gray-500">Certifications</span>
              <div className="flex flex-wrap gap-1 mt-1">
                {factory.certifications.map((c, i) => (
                  <span key={i} className="px-2 py-0.5 bg-blue-50 text-blue-700 text-xs rounded-full">{c}</span>
                ))}
              </div>
            </div>
            {factory.notableClients && (
              <div>
                <span className="text-xs font-medium text-gray-500">Notable Clients / Sectors</span>
                <p className="text-sm text-gray-700 mt-1">{factory.notableClients}</p>
              </div>
            )}
          </div>
        )
      })
    }
  }, [])

  const filteredCategories = useMemo(() =>
    MATERIAL_CATEGORIES.filter(c =>
      (materialFilter === 'all' || c.id === materialFilter) &&
      (c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
       c.description.toLowerCase().includes(searchTerm.toLowerCase()))
    ),
    [materialFilter, searchTerm]
  )

  const filteredCompanies = useMemo(() =>
    POS_COMPANIES.filter(c =>
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.speciality.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.hq.toLowerCase().includes(searchTerm.toLowerCase())
    ),
    [searchTerm]
  )

  const materialFilterOptions = [
    { key: 'all', label: 'All Materials' },
    ...MATERIAL_CATEGORIES.map(c => ({ key: c.id, label: c.name }))
  ]

  // Liquid Intelligence signals
  const liSig1POS = { dot: 'bg-emerald-500', color: 'text-emerald-600', label: 'Direct Sourcing Advantage', copy: `Factory-direct pricing eliminates a 2.5–4× intermediary markup. A glorifier at £10 factory-gate typically reaches brands at £35–45 via agency — a recoverable cost that funds additional campaign spend or margin.` }
  const liSig2POS = avgLeadDays <= 40
    ? { dot: 'bg-emerald-500', color: 'text-emerald-600', label: 'Manageable Lead Times', copy: `Average factory lead time is ${avgLeadDays} days. With 8–12 weeks forward planning, direct sourcing is operationally viable for most campaign cycles without compromising launch timelines.` }
    : avgLeadDays <= 60
    ? { dot: 'bg-amber-500', color: 'text-amber-600', label: 'Lead Time Planning Required', copy: `Average factory lead time is ${avgLeadDays} days. POS orders require commitment 10–14 weeks before campaign launch. Brief changes after order placement will incur significant cost and delay.` }
    : { dot: 'bg-red-500', color: 'text-red-600', label: 'Extended Lead Times', copy: `Average lead time is ${avgLeadDays} days across material categories. Plan POS orders a minimum of 16 weeks ahead. Premium glass and custom closures carry the longest individual lead times.` }
  const liSig3POS = { dot: 'bg-amber-500', color: 'text-amber-600', label: 'Geographic Concentration Risk', copy: `The majority of ${totalFactories} verified factories are China-based, centred on ${topHub}. Geopolitical risk, Drewry freight cost volatility (+110% WCI), and QC requirements make dual-source strategies advisable for critical POS items.` }

  if (loading) {
    return (
      <div className="space-y-6">
        <PageHeader title="POS Manufacturing Intelligence" subtitle="Loading data…" />
        <BentoGrid>
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
        </BentoGrid>
        <SkeletonChart />
        <SkeletonCard className="h-24" />
      </div>
    )
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* ─── TIER 1: Hero + KPIs ─────────────────────────────────────────── */}
      <PageHeader
        title="POS Manufacturing Intelligence"
        subtitle="Factory directory, sourcing strategy & market disruption for spirits POS · Data as of April 2026"
        breadcrumbs={[
          { label: 'Command Centre', to: '/' },
          { label: 'POS Intelligence' }
        ]}
      />
      <SubPageNav group="tools" />
      <DataFreshness date="April 2026" source="Trade directories, manufacturer listings, Drewry WCI, IWSR" />

      <BentoGrid>
        <MetricCard
          label="Verified Factories"
          value={totalFactories}
          icon={Factory}
          subtitle="Across 9 material categories"
          change={`${MATERIAL_CATEGORIES.length} materials`}
          direction="up"
        />
        <MetricCard
          label="POS Companies Tracked"
          value={POS_COMPANIES.length}
          icon={Building2}
          subtitle="UK, US, EU & Asia"
        />
        <MetricCard
          label="Avg Lead Time"
          value={`${avgLeadDays} days`}
          icon={Clock}
          subtitle="Factory to shipment"
        />
        <MetricCard
          label="Avg Intermediary Markup"
          value="250-350%"
          icon={AlertTriangle}
          subtitle="vs factory-direct pricing"
          change="Disruptable"
          direction="down"
        />
      </BentoGrid>

      {/* ─── LIQUID INTELLIGENCE SIGNALS ─────────────────────────────────── */}
      <div className="border border-gold/30 rounded-xl bg-gradient-to-r from-amber-50/60 to-white p-4">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-7 h-7 rounded-lg bg-gold/10 flex items-center justify-center">
            <Zap size={14} className="text-gold" />
          </div>
          <span className="text-xs font-bold text-gold uppercase tracking-wider">Liquid Intelligence</span>
          <span className="text-xs text-gray-400 ml-auto">POS Supply Chain Signals · 2026</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {[liSig1POS, liSig2POS, liSig3POS].map((sig, i) => (
            <div key={i} className="bg-white/70 rounded-lg p-3 border border-gold/10">
              <div className="flex items-center gap-1.5 mb-1.5">
                <div className={`w-2 h-2 rounded-full flex-shrink-0 ${sig.dot}`} />
                <span className={`text-xs font-bold uppercase tracking-wide ${sig.color}`}>{sig.label}</span>
              </div>
              <p className="text-xs text-gray-600 leading-relaxed">{sig.copy}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ─── TIER 2: Tab Navigation + Expandable Content ─────────────────── */}
      <Section>
        <TabGroup
          tabs={POS_TABS.map(tab => ({ key: tab.id, label: tab.label }))}
          active={activeTab}
          onChange={(id) => { setActiveTab(id); setMaterialFilter('all') }}
          size="sm"
        />
      </Section>

      {/* Search + Filter (directory & companies tabs) */}
      {(activeTab === 'directory' || activeTab === 'companies') && (
        <div className="space-y-3">
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder={activeTab === 'directory' ? 'Search materials, capabilities...' : 'Search companies, specialities...'}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:ring-2 focus:ring-gold focus:border-transparent"
            />
          </div>
          {activeTab === 'directory' && (
            <FilterPills
              options={materialFilterOptions}
              active={materialFilter}
              onChange={setMaterialFilter}
              size="sm"
            />
          )}
        </div>
      )}

      {/* ─── TAB: Factory Directory ──────────────────────────────────────── */}
      {activeTab === 'directory' && (
        <div className="space-y-3">
          <Card className="bg-gradient-to-r from-navy to-blue-800 border-0">
            <h2 className="font-display text-lg text-white mb-2">Factory Directory by Material</h2>
            <p className="text-blue-200 text-sm">Direct-to-factory contacts across {MATERIAL_CATEGORIES.length} material categories. Click any category to see individual factories, capabilities, MOQs, and certifications.</p>
          </Card>
          {filteredCategories.map(cat => (
            <MaterialSection key={cat.id} category={cat} onFactoryTap={handleFactoryTap} />
          ))}

          {/* Tier 3: Full DataTable */}
          <div className="pt-2">
            <button
              onClick={() => setShowFullTable(!showFullTable)}
              className="text-sm font-medium text-navy hover:text-gold transition-colors flex items-center gap-1"
            >
              {showFullTable ? 'Hide' : 'View'} Full Factory Table ({totalFactories} factories)
              <ChevronDown size={14} className={`transition-transform ${showFullTable ? 'rotate-180' : ''}`} />
            </button>
          </div>
          {showFullTable && (
            <DataTable
              columns={FACTORY_TABLE_COLUMNS}
              data={allFactories}
              searchable
              searchPlaceholder="Search all factories..."
              searchKey="name"
              compact
              exportable
            />
          )}
        </div>
      )}

      {/* ─── TAB: POS Companies ──────────────────────────────────────────── */}
      {activeTab === 'companies' && (
        <div className="space-y-4">
          <Card className="bg-gradient-to-r from-navy to-blue-800 border-0">
            <h2 className="font-display text-lg text-white mb-2">POS Companies in Spirits</h2>
            <p className="text-blue-200 text-sm">The current competitive landscape of companies providing POS solutions to alcohol brands. Most are intermediaries adding 40-60% markup while guarding supplier contacts.</p>
          </Card>
          <div className="grid md:grid-cols-2 gap-3">
            {filteredCompanies.map((company, i) => (
              <Card key={i} hover>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-bold text-navy">{company.name}</h4>
                  <span className={`px-2 py-0.5 text-xs rounded-full ${
                    company.size === 'Large' ? 'bg-purple-100 text-purple-700' :
                    company.size === 'Medium' ? 'bg-blue-100 text-blue-700' :
                    company.size === 'Association' ? 'bg-gray-100 text-gray-700' :
                    'bg-green-100 text-green-700'
                  }`}>{company.size}</span>
                </div>
                <div className="space-y-1.5 text-sm">
                  <div className="flex items-center gap-2 text-gray-500">
                    <Globe size={12} />
                    <span>{company.hq} • Est. {company.yearFounded}</span>
                  </div>
                  <p className="text-gray-600">{company.speciality}</p>
                  <div>
                    <span className="text-xs font-medium text-gray-500">Key Clients:</span>
                    <span className="text-xs text-gray-600 ml-1">{company.clients}</span>
                  </div>
                  <div>
                    <span className="text-xs font-medium text-gray-500">Business Model:</span>
                    <span className="text-xs text-gray-600 ml-1">{company.model}</span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* ─── TAB: Sourcing Platforms ──────────────────────────────────────── */}
      {activeTab === 'sourcing' && (
        <div className="space-y-4">
          <Card className="bg-gradient-to-r from-navy to-blue-800 border-0">
            <h2 className="font-display text-lg text-white mb-2">Sourcing Platforms & Trade Shows</h2>
            <p className="text-blue-200 text-sm">Direct access to Chinese manufacturers through B2B platforms and trade exhibitions. These are the same channels that POS intermediaries use.</p>
          </Card>
          <div className="space-y-3">
            {TRADE_PLATFORMS.map((platform, i) => (
              <Card key={i}>
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h3 className="text-sm font-semibold text-navy">{platform.name}</h3>
                    <span className="text-xs text-gray-500">{platform.type}</span>
                  </div>
                  <a href={`https://${platform.url}`} target="_blank" rel="noopener noreferrer" className="text-gold hover:text-gold/80 flex items-center gap-1 text-sm">
                    Visit <ExternalLink size={12} />
                  </a>
                </div>
                <div className="space-y-2">
                  <div>
                    <span className="text-xs font-medium text-gray-500">Best For</span>
                    <p className="text-sm text-gray-700">{platform.bestFor}</p>
                  </div>
                  <div>
                    <span className="text-xs font-medium text-gray-500">Pro Tips</span>
                    <p className="text-sm text-gray-700">{platform.tips}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-medium text-gray-500">Risk Level:</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      platform.risk.startsWith('Low') ? 'bg-green-100 text-green-700' :
                      platform.risk.startsWith('Medium') ? 'bg-yellow-100 text-yellow-700' :
                      'bg-red-100 text-red-700'
                    }`}>{platform.risk}</span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* ─── TAB: Cost Benchmarks ────────────────────────────────────────── */}
      {activeTab === 'costs' && (
        <div className="space-y-4">
          <Card className="bg-gradient-to-r from-navy to-blue-800 border-0">
            <h2 className="font-display text-lg text-white mb-2">Cost Benchmarks: Factory vs Intermediary vs Retail</h2>
            <p className="text-blue-200 text-sm">The true cost of POS materials at each stage of the supply chain. These benchmarks reveal why intermediaries guard their supplier contacts so fiercely.</p>
          </Card>
          <DataTable
            columns={COST_TABLE_COLUMNS}
            data={COST_BENCHMARKS}
            searchable
            searchPlaceholder="Search POS items..."
            searchKey="item"
            exportable
          />
          <Card className="bg-amber-50 border-amber-200">
            <div className="flex items-start gap-3">
              <AlertTriangle size={20} className="text-amber-500 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-bold text-amber-800 mb-1">Key Insight: The Markup Structure</h3>
                <p className="text-sm text-amber-700">POS intermediaries typically apply a 2.5-4x markup over factory-gate pricing. A branded acrylic glorifier that costs £10 from the factory in Dongguan reaches the brand at £35-45 via an intermediary, and £60-80 if sourced through a full-service POS agency. This markup structure is only possible because brands lack direct factory access. By providing transparent pricing benchmarks and direct sourcing capability, we collapse the intermediary margin and deliver significant savings to brands of all sizes.</p>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* ─── TAB: Disruption Strategy ────────────────────────────────────── */}
      {activeTab === 'disruption' && (
        <div className="space-y-4">
          <Card className="bg-gradient-to-r from-navy to-blue-800 border-0">
            <h2 className="font-display text-lg text-white mb-2">Market Disruption Strategy</h2>
            <p className="text-blue-200 text-sm">Four strategic pillars for disrupting the spirits POS industry. The market relies on information asymmetry, relationship gatekeeping, and artificial scarcity.</p>
          </Card>
          {DISRUPTION_STRATEGIES.map(strategy => (
            <DisruptionCard key={strategy.id} strategy={strategy} />
          ))}
        </div>
      )}

      {/* ─── TAB: Client Value ────────────────────────────────────────────── */}
      {activeTab === 'clients' && (
        <div className="space-y-4">
          <Card className="bg-gradient-to-r from-navy to-blue-800 border-0">
            <h2 className="font-display text-lg text-white mb-2">Client Value Framework</h2>
            <p className="text-blue-200 text-sm">Tailored POS solutions for every stage of brand growth. From startup launch kits to enterprise innovation partnerships.</p>
          </Card>
          {CLIENT_SEGMENTS.map((segment, i) => (
            <ClientSegmentCard key={i} segment={segment} />
          ))}
        </div>
      )}

      {/* Footer */}
      <div className="text-center py-4 text-xs text-gray-500">
        POS Manufacturing Intelligence • Liquid Economy Platform • Palmer Liquid Studios • Data compiled from trade directories, manufacturer listings, and industry research
      </div>

      {/* Mobile BottomSheet for factory detail */}
      <BottomSheet
        open={!!mobileDetail}
        onClose={() => setMobileDetail(null)}
        title={mobileDetail?.title || 'Factory Detail'}
      >
        {mobileDetail?.content}
      </BottomSheet>
    </div>
  )
}
