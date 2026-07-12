import React, { useState, useMemo } from 'react'
import {
  FileText, TrendingUp, DollarSign, Users, Globe, Target,
  Package, AlertTriangle, Zap, ChevronDown, ChevronRight,
  Download, Copy, Check, Banknote, BarChart3
} from 'lucide-react'
import {
  Card, PageHeader, SubPageNav, Badge, SectionHeader, DataFreshness
} from '../components/ui'
import {
  PITCH_SECTIONS, CATEGORY_MARKET_DATA, FINANCIAL_TEMPLATES,
  FUNDING_ROUNDS, DISTRIBUTION_MODELS
} from '../data/pitchGeneratorData'

function PitchSection({ section, content, index }) {
  const [open, setOpen] = useState(true)
  const icons = {
    AlertTriangle, Zap, TrendingUp, Package, Target,
    Users, Globe, DollarSign, Banknote, BarChart3,
  }
  const Icon = icons[section.icon] || FileText

  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center gap-3 px-4 py-3 bg-gray-50 text-left hover:bg-gray-100 transition-colors">
        <div className="w-6 h-6 bg-navy text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">
          {index + 1}
        </div>
        <Icon size={16} className="text-navy" />
        <span className="text-sm font-bold text-navy flex-1">{section.title}</span>
        <ChevronDown size={14} className={`text-gray-400 transition-transform ${open ? '' : '-rotate-90'}`} />
      </button>
      {open && <div className="p-4">{content}</div>}
    </div>
  )
}

export default function PitchGenerator() {
  const [brandName, setBrandName] = useState('')
  const [category, setCategory] = useState('gin')
  const [targetMarket, setTargetMarket] = useState('UK')
  const [rrp, setRrp] = useState('35')
  const [scenario, setScenario] = useState('moderate')
  const [fundingStage, setFundingStage] = useState('seed')
  const [distModel, setDistModel] = useState('hybrid')
  const [copied, setCopied] = useState(false)

  const catData = CATEGORY_MARKET_DATA[category]
  const finTemplate = FINANCIAL_TEMPLATES[scenario]
  const funding = FUNDING_ROUNDS[fundingStage]
  const dist = DISTRIBUTION_MODELS[distModel]
  const numRRP = parseFloat(rrp) || 35

  const yearlyRevenue = useMemo(() => {
    const base = numRRP * 12 * 150 // base calculation
    return {
      year1: Math.round(base * finTemplate.year1Revenue),
      year2: Math.round(base * finTemplate.year2Revenue),
      year3: Math.round(base * finTemplate.year3Revenue),
    }
  }, [numRRP, finTemplate])

  // Liquid Intelligence signals — reactive to category, fundingStage, scenario
  const liSignals = useMemo(() => {
    const cagrNum = parseFloat((catData.cagr || '0').replace('%', '')) || 0
    const catLabel = category.charAt(0).toUpperCase() + category.slice(1)
    const grossMarginPct = Math.round(finTemplate.grossMargin * 100)

    const momentum = cagrNum >= 8
      ? { dot: 'bg-emerald-500', color: 'text-emerald-600', label: 'EXPLOSIVE GROWTH', copy: `${catLabel} is growing at ${catData.cagr} CAGR — investor appetite for this category is at peak. Lead with market size and category tailwinds; the macro story almost writes itself.` }
      : cagrNum >= 4
      ? { dot: 'bg-blue-500', color: 'text-blue-600', label: 'STEADY EXPANSION', copy: `${catLabel} at ${catData.cagr} CAGR is a proven growth market, not a speculative bet. Investors want clear differentiation and path to category leadership rather than macro alone.` }
      : { dot: 'bg-amber-500', color: 'text-amber-600', label: 'MATURE CATEGORY', copy: `${catLabel} at ${catData.cagr} CAGR means the market is established, not exploding. Your differentiation story and gross margin must carry the pitch — category tailwind alone won’t close the round.` }

    const stageSignal = fundingStage === 'preSeed'
      ? { dot: 'bg-amber-500', color: 'text-amber-600', label: 'CONCEPT STAGE', copy: `Pre-seed investors fund people, not products. Lead with founder credentials and market insight. Revenue not expected — evidence of consumer demand (surveys, letters of intent) is your strongest asset.` }
      : fundingStage === 'seed'
      ? { dot: 'bg-blue-500', color: 'text-blue-600', label: 'VALIDATION STAGE', copy: `Seed investors want proof-of-market-fit: first sales, key account wins, and a repeatable acquisition cost. Your opening three pitch slides should answer “why now, why you, why this category.”` }
      : fundingStage === 'seriesA'
      ? { dot: 'bg-blue-500', color: 'text-blue-600', label: 'SCALING PHASE', copy: `Series A investors expect proven PMF, positive gross margin, and a clear distribution roadmap. Unit economics and path to profitability must appear in the financials slide. Show the machine, not just the vision.` }
      : { dot: 'bg-emerald-500', color: 'text-emerald-600', label: 'GROWTH & EXIT STAGE', copy: `Series B investors are buying a category leadership story and a credible exit path. Lead with international expansion potential, M&A comparables, and strategic acquirer interest. Financial rigour is assumed.` }

    const marginSignal = grossMarginPct >= 55
      ? { dot: 'bg-emerald-500', color: 'text-emerald-600', label: 'STRONG MARGIN PROFILE', copy: `${grossMarginPct}% gross margin in the ${scenario} scenario is above-sector average. Highlight in your financials slide — premium spirits investors benchmark 50–55% as the floor for a credible premium brand.` }
      : grossMarginPct >= 45
      ? { dot: 'bg-blue-500', color: 'text-blue-600', label: 'VIABLE MARGINS', copy: `${grossMarginPct}% gross margin meets the minimum threshold for a serious spirits investor conversation. Verify your RRP and channel mix are optimal — moving to hybrid or DTC model can add 5–10pts.` }
      : { dot: 'bg-amber-500', color: 'text-amber-600', label: 'MARGIN PRESSURE', copy: `${grossMarginPct}% gross margin is below the premium-spirits benchmark. Consider revising RRP upward or shifting distribution mix before presenting financials — this number will be the first flag investors raise.` }

    return [momentum, stageSignal, marginSignal]
  }, [catData, category, fundingStage, scenario, finTemplate])

  const pitchContent = useMemo(() => {
    const name = brandName || '[Your Brand]'
    const catLabel = category.charAt(0).toUpperCase() + category.slice(1)

    return [
      // Problem
      <div key="problem" className="space-y-2 text-sm text-gray-700">
        <p>The global {catLabel.toLowerCase()} market is worth {catData.globalMarketSize}, yet small-to-medium brands face significant barriers to entry:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Complex regulatory landscapes across target markets</li>
          <li>Distribution gatekeepers favouring established brands</li>
          <li>High marketing costs with uncertain ROI</li>
          <li>Limited access to market intelligence (IWSR reports cost {'£'}10,000+)</li>
        </ul>
        <p className="font-medium text-navy">New brands need a smarter approach to compete with the giants.</p>
      </div>,

      // Solution
      <div key="solution" className="space-y-2 text-sm text-gray-700">
        <p><strong>{name}</strong> is a {catLabel.toLowerCase()} brand built for the modern consumer, combining exceptional liquid with a data-driven go-to-market strategy.</p>
        <p>Our approach:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Category-specific market intelligence to identify underserved segments</li>
          <li>Direct-to-consumer and on-trade seeding before scaling distribution</li>
          <li>Authentic brand storytelling that resonates with target demographics</li>
          <li>Lean operations with focus on gross margin over volume</li>
        </ul>
      </div>,

      // Market
      <div key="market" className="space-y-3 text-sm text-gray-700">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="p-3 bg-navy/5 rounded-lg text-center">
            <div className="text-xs text-gray-500">Global Market</div>
            <div className="text-lg font-bold text-navy">{catData.globalMarketSize}</div>
          </div>
          <div className="p-3 bg-navy/5 rounded-lg text-center">
            <div className="text-xs text-gray-500">CAGR</div>
            <div className="text-lg font-bold text-navy">{catData.cagr}</div>
          </div>
          <div className="p-3 bg-navy/5 rounded-lg text-center">
            <div className="text-xs text-gray-500">Target Market</div>
            <div className="text-lg font-bold text-navy">{targetMarket}</div>
          </div>
        </div>
        <p>{catData.keyInsight}</p>
        <p className="font-medium text-navy">The {catLabel.toLowerCase()} category is growing at {catData.cagr} CAGR, creating a {catData.globalMarketSize} addressable market.</p>
      </div>,

      // Product
      <div key="product" className="space-y-2 text-sm text-gray-700">
        <p><strong>{name}</strong> is positioned at {'£'}{numRRP.toFixed(0)} RRP in the {targetMarket} market, targeting the premium segment.</p>
        <div className="p-3 bg-gray-50 rounded-lg">
          <div className="text-xs font-semibold text-navy mb-1">Positioning</div>
          <p>At {'£'}{numRRP.toFixed(0)}, {name} sits in the premium tier, competing with established brands while offering clear differentiation through [your unique proposition].</p>
        </div>
        <p className="italic text-gray-500">[Add: your liquid story, production method, unique ingredients, provenance narrative, packaging innovation]</p>
      </div>,

      // Traction
      <div key="traction" className="space-y-2 text-sm text-gray-700">
        <p className="italic text-gray-500">[Customise with your actual traction data:]</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Product development: [completed/in progress]</li>
          <li>First sales: [date, volume, revenue]</li>
          <li>Key account wins: [list notable on-trade/off-trade listings]</li>
          <li>Awards: [competition results]</li>
          <li>Press coverage: [notable mentions]</li>
          <li>Social following: [follower count, engagement rate]</li>
        </ul>
      </div>,

      // Competition
      <div key="competition" className="space-y-2 text-sm text-gray-700">
        <p>The {catLabel.toLowerCase()} competitive landscape in {targetMarket}:</p>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b">
                <th className="text-left py-1">Competitor</th>
                <th className="text-left py-1">Position</th>
                <th className="text-left py-1">{name} Advantage</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-50"><td className="py-1">[Competitor 1]</td><td>Market leader</td><td>[Your differentiation]</td></tr>
              <tr className="border-b border-gray-50"><td className="py-1">[Competitor 2]</td><td>Premium challenger</td><td>[Your advantage]</td></tr>
              <tr className="border-b border-gray-50"><td className="py-1">[Competitor 3]</td><td>Emerging brand</td><td>[Your edge]</td></tr>
            </tbody>
          </table>
        </div>
        <p className="text-xs text-gray-500">Use the Competitor Monitor page for real-time competitive intelligence.</p>
      </div>,

      // Distribution
      <div key="distribution" className="space-y-3 text-sm text-gray-700">
        <div className="p-3 bg-navy/5 rounded-lg">
          <div className="text-xs font-semibold text-navy mb-1">Distribution Model: {dist.name}</div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs mt-2">
            <div><span className="text-gray-500">Margin:</span> <span className="font-medium">{dist.margin}</span></div>
            <div><span className="text-gray-500">Control:</span> <span className="font-medium">{dist.control}</span></div>
            <div><span className="text-gray-500">Scale:</span> <span className="font-medium">{dist.scalability}</span></div>
          </div>
        </div>
        <p>Best for: {dist.bestFor}</p>
        <p className="italic text-gray-500">[Customise: your distribution partnerships, target accounts, channel strategy]</p>
      </div>,

      // Financials
      <div key="financials" className="space-y-3 text-sm text-gray-700">
        <div className="p-3 bg-navy/5 rounded-lg">
          <div className="text-xs font-semibold text-navy mb-2">3-Year Revenue Projection ({scenario})</div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="text-center">
              <div className="text-xs text-gray-500">Year 1</div>
              <div className="text-lg font-bold text-navy">{'£'}{yearlyRevenue.year1.toLocaleString()}</div>
            </div>
            <div className="text-center">
              <div className="text-xs text-gray-500">Year 2</div>
              <div className="text-lg font-bold text-navy">{'£'}{yearlyRevenue.year2.toLocaleString()}</div>
            </div>
            <div className="text-center">
              <div className="text-xs text-gray-500">Year 3</div>
              <div className="text-lg font-bold text-navy">{'£'}{yearlyRevenue.year3.toLocaleString()}</div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="p-2 bg-gray-50 rounded-lg text-center text-xs">
            <div className="text-gray-500">Gross Margin</div>
            <div className="font-bold text-navy">{(finTemplate.grossMargin * 100).toFixed(0)}%</div>
          </div>
          <div className="p-2 bg-gray-50 rounded-lg text-center text-xs">
            <div className="text-gray-500">Net Margin (Y1)</div>
            <div className="font-bold text-navy">{(finTemplate.netMargin * 100).toFixed(0)}%</div>
          </div>
          <div className="p-2 bg-gray-50 rounded-lg text-center text-xs">
            <div className="text-gray-500">Break-Even</div>
            <div className="font-bold text-navy">{finTemplate.breakEven}</div>
          </div>
        </div>
        <p className="text-xs text-gray-500">Projections based on {scenario} scenario. Adjust inputs for conservative/aggressive models.</p>
      </div>,

      // Team
      <div key="team" className="space-y-2 text-sm text-gray-700">
        <p className="italic text-gray-500">[Add your team members:]</p>
        <div className="space-y-2">
          <div className="p-3 bg-gray-50 rounded-lg">
            <div className="font-medium text-navy">[Founder/CEO] {'—'} [Background]</div>
            <div className="text-xs text-gray-500">[Previous experience, industry connections, relevant skills]</div>
          </div>
          <div className="p-3 bg-gray-50 rounded-lg">
            <div className="font-medium text-navy">[Co-Founder/COO] {'—'} [Background]</div>
            <div className="text-xs text-gray-500">[Operations, supply chain, distribution experience]</div>
          </div>
          <div className="p-3 bg-gray-50 rounded-lg">
            <div className="font-medium text-navy">[Advisor] {'—'} [Background]</div>
            <div className="text-xs text-gray-500">[Industry veteran, investor connections, brand-building track record]</div>
          </div>
        </div>
      </div>,

      // The Ask
      <div key="ask" className="space-y-3 text-sm text-gray-700">
        <div className="p-4 bg-navy/5 rounded-lg">
          <div className="text-xs font-semibold text-navy mb-2">Funding Stage: {fundingStage.replace(/([A-Z])/g, ' $1').trim()}</div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <div className="text-xs text-gray-500">Typical Range</div>
              <div className="text-lg font-bold text-navy">{funding.range}</div>
            </div>
            <div>
              <div className="text-xs text-gray-500">Typical Equity</div>
              <div className="text-lg font-bold text-navy">{funding.equity}</div>
            </div>
          </div>
          <div className="mt-2 text-xs text-gray-500">
            <span className="font-medium">Stage:</span> {funding.stage} {'•'} <span className="font-medium">Typical investors:</span> {funding.typical}
          </div>
        </div>
        <p className="italic text-gray-500">[Customise: your specific ask amount, use of funds breakdown, investor proposition]</p>
        <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg flex gap-2">
          <Zap size={14} className="text-amber-600 mt-0.5 flex-shrink-0" />
          <span className="text-xs text-amber-800">Tip: Be specific about use of funds. Break it into: product development (X%), marketing (X%), distribution (X%), working capital (X%).</span>
        </div>
      </div>,
    ]
  }, [brandName, category, targetMarket, numRRP, scenario, fundingStage, distModel, catData, finTemplate, funding, dist, yearlyRevenue])

  const handleCopy = () => {
    const text = `${brandName || '[Your Brand]'} — Investor Pitch Outline\n\nCategory: ${category}\nMarket: ${targetMarket}\nRRP: £${numRRP}\nMarket Size: ${catData.globalMarketSize}\nCAGR: ${catData.cagr}\n\n${PITCH_SECTIONS.map((s, i) => `${i + 1}. ${s.title}`).join('\n')}\n\nGenerated by Liquid Economy Intelligence Platform`
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  return (
    <div className="max-w-7xl mx-auto">
      <SubPageNav group="reports" />
      <DataFreshness date="April 2026" source="IWSR, Euromonitor, Rabobank, DISCUS, NielsenIQ" />
      <PageHeader
        title="Investor Pitch Generator"
        subtitle="Auto-generate a pitch deck outline from platform data"
        icon={<FileText size={20} />}
      />

      {/* Inputs */}
      <Card className="p-6 mb-6">
        <h3 className="text-sm font-bold text-navy mb-4">Configure Your Pitch</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <div>
            <label className="block text-xs font-semibold text-navy mb-1">Brand Name</label>
            <input type="text" value={brandName} onChange={e => setBrandName(e.target.value)} placeholder="Your Brand" className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-navy mb-1">Category</label>
            <select value={category} onChange={e => setCategory(e.target.value)} className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm">
              {Object.keys(CATEGORY_MARKET_DATA).map(c => <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold text-navy mb-1">Target Market</label>
            <input type="text" value={targetMarket} onChange={e => setTargetMarket(e.target.value)} placeholder="UK" className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-navy mb-1">RRP ({'£'})</label>
            <input type="number" value={rrp} onChange={e => setRrp(e.target.value)} placeholder="35" className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-navy mb-1">Scenario</label>
            <select value={scenario} onChange={e => setScenario(e.target.value)} className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm">
              <option value="conservative">Conservative</option>
              <option value="moderate">Moderate</option>
              <option value="aggressive">Aggressive</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold text-navy mb-1">Funding Stage</label>
            <select value={fundingStage} onChange={e => setFundingStage(e.target.value)} className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm">
              <option value="preSeed">Pre-Seed</option>
              <option value="seed">Seed</option>
              <option value="seriesA">Series A</option>
              <option value="seriesB">Series B</option>
            </select>
          </div>
        </div>
        <div className="mt-4">
          <label className="block text-xs font-semibold text-navy mb-1">Distribution Model</label>
          <div className="flex flex-wrap gap-2">
            {Object.entries(DISTRIBUTION_MODELS).map(([key, model]) => (
              <button
                key={key}
                onClick={() => setDistModel(key)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${distModel === key ? 'bg-navy text-white' : 'bg-gray-100 text-gray-600'}`}
              >
                {model.name}
              </button>
            ))}
          </div>
        </div>
      </Card>

      {/* Liquid Intelligence */}
      <div className="border border-gold/30 rounded-xl bg-gradient-to-r from-amber-50/60 to-white p-4 mb-4">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-7 h-7 rounded-lg bg-gold/10 flex items-center justify-center">
            <Zap size={14} className="text-gold" />
          </div>
          <span className="text-xs font-bold text-gold uppercase tracking-wider">Liquid Intelligence</span>
          <span className="text-xs text-gray-400 ml-auto">Pitch signals {'·'} {category.charAt(0).toUpperCase() + category.slice(1)} {'·'} {fundingStage.replace(/([A-Z])/g, ' $1').trim()}</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {[
            { sig: liSignals[0], header: 'Category Market Momentum' },
            { sig: liSignals[1], header: 'Funding Stage Readiness' },
            { sig: liSignals[2], header: 'Gross Margin Health' },
          ].map(({ sig, header }, i) => (
            <div key={i} className="bg-white/70 rounded-lg p-3 border border-gold/10">
              <div className="flex items-center gap-1.5 mb-1.5">
                <div className={`w-2 h-2 rounded-full flex-shrink-0 ${sig.dot}`} />
                <span className={`text-xs font-bold uppercase tracking-wide ${sig.color}`}>{sig.label}</span>
              </div>
              <p className="text-[11px] text-gray-500 font-medium mb-1">{header}</p>
              <p className="text-xs text-gray-600 leading-relaxed">{sig.copy}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Copy button */}
      <div className="flex justify-end mb-4">
        <button onClick={handleCopy} className="flex items-center gap-2 px-4 py-2 bg-navy text-white rounded-lg text-sm font-medium hover:bg-navy/90 transition-colors">
          {copied ? <Check size={14} /> : <Copy size={14} />}
          {copied ? 'Copied!' : 'Copy Outline'}
        </button>
      </div>

      {/* Pitch sections */}
      <div className="space-y-4">
        {PITCH_SECTIONS.map((section, i) => (
          <PitchSection
            key={section.id}
            section={section}
            content={pitchContent[i]}
            index={i}
          />
        ))}
      </div>
    </div>
  )
}
