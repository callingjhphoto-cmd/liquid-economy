import React, { useState, useCallback, useMemo, useEffect } from 'react'
import {
  Target, Calendar, Sliders, BarChart3,
  ChevronRight, ChevronLeft, ChevronDown, ChevronUp,
  DollarSign, TrendingUp, Globe, Package, Zap, Users,
  Megaphone, Wine, ShoppingCart, MapPin, Clock, CheckCircle,
  Download, Sparkles, Star, Sun
} from 'lucide-react'
import {
  PageHeader, MetricCard, Card, Section, BentoGrid, DrillDown,
  BottomSheet, SubPageNav, ErrorBoundary
} from '../components/ui'
import {
  BRANDS_BY_CATEGORY, CATEGORIES, SEGMENTS, BASE_SPIRITS,
  COCKTAIL_OCCASIONS, SERVES, MARKETS, MONTHS, OBJECTIVES,
  CAMPAIGN_TYPES, CATEGORY_COMPETITORS, SPIRIT_COMPETITORS,
  CULTURAL_CALENDARS, OCCASIONS, CATEGORY_SUPPLY_CHAIN
} from '../data/campaignData'

// ─── ICON MAP ────────────────────────────────────────────────────────────────
const ICON_MAP = {
  Wine, Package, Zap, Clock, Users, MapPin, Sun, Target
}

// ─── CAMPAIGN PLANNER COMPONENT ──────────────────────────────────────────────
const CampaignPlanner = () => {
  const [currentStep, setCurrentStep] = useState(0) // 0 = overview, 1-5 = wizard steps
  const [expandedOccasion, setExpandedOccasion] = useState(null)
  const [expandedEvent, setExpandedEvent] = useState(null)
  const [isMobile, setIsMobile] = useState(typeof window !== 'undefined' && window.innerWidth < 1024)
  const [mobileStep, setMobileStep] = useState(0) // 0 = overview, 1 = brief, 2 = budget & timing, 3 = review & export
  const [templateSheet, setTemplateSheet] = useState(null) // holds template data for BottomSheet

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const [campaignData, setCampaignData] = useState({
    campaignType: 'existing',
    brand: '',
    serve: '',
    customBrandName: '',
    category: '',
    segment: '',
    productDescription: '',
    cocktailName: '',
    baseSpirit: '',
    ingredients: '',
    targetOccasion: '',
    market: '',
    startMonth: 'January',
    endMonth: 'December',
    budget: '',
    objective: '',
    digital: 30,
    onTrade: 25,
    offTrade: 30,
    travelRetail: 15,
    metaInstagram: 50,
    tiktok: 30,
    youtube: 20,
    influencer: 0,
    barActivations: 50,
    restaurantPartnerships: 30,
    festivalSponsorship: 20,
    supermarketPromo: 40,
    specialistRetailer: 35,
    ecommerce: 25,
  })

  // ─── HELPER FUNCTIONS ────────────────────────────────────────────────────
  const getCurrency = () => {
    const market = MARKETS.find(m => m.code === campaignData.market)
    return market ? market.currency : '£'
  }

  const getBrandDisplay = () => {
    if (campaignData.campaignType === 'existing') return campaignData.brand
    if (campaignData.campaignType === 'newProduct') return `${campaignData.customBrandName} (New ${CATEGORIES.find(c => c.id === campaignData.category)?.label || ''})`
    return `${campaignData.cocktailName} (${campaignData.baseSpirit}-based)`
  }

  const getCompetitors = useCallback(() => {
    const brand = campaignData.brand || campaignData.customBrandName || ''
    const cat = campaignData.category
    const cocktailBase = campaignData.baseSpirit
    const type = campaignData.campaignType

    if (type === 'cocktail') {
      const cocktailName = (campaignData.cocktailName || '').toLowerCase()
      if (cocktailName.includes('spritz')) {
        return [
          { name: 'Aperol Spritz', position: 'Market leader in spritz category, 62% share of UK spritz serves', threat: 'high' },
          { name: 'Lillet Spritz', position: 'Fast-growing premium alternative, +34% YoY in on-trade', threat: 'medium' },
          { name: 'Hugo Spritz', position: 'Elderflower-based spritz gaining traction in summer months', threat: 'medium' },
          { name: 'St-Germain Spritz', position: 'Ultra-premium positioning, strong in cocktail bars', threat: 'low' },
        ]
      }
      if (cocktailName.includes('margarita')) {
        return [
          { name: 'Tommy’s Margarita (Patrón)', position: 'Premium margarita benchmark, dominant in cocktail bars', threat: 'high' },
          { name: 'Classic Margarita (Cuervo)', position: 'Volume leader at value-mid tier, strong off-trade RTD', threat: 'high' },
          { name: 'Casamigos Margarita', position: 'Celebrity-backed, strong social media presence 25-35 demo', threat: 'medium' },
        ]
      }
      return SPIRIT_COMPETITORS[cocktailBase] || [{ name: 'Market leaders in category', position: 'Select a base spirit for specific competitors', threat: 'medium' }]
    }

    const comps = CATEGORY_COMPETITORS[cat] || []
    return comps.filter(c => !brand || !c.name.toLowerCase().includes(brand.toLowerCase().split(' ')[0]))
  }, [campaignData.brand, campaignData.customBrandName, campaignData.category, campaignData.baseSpirit, campaignData.campaignType, campaignData.cocktailName])

  const getSupplyChainData = useCallback(() => {
    const cat = campaignData.category
    const budget = parseFloat(campaignData.budget) || 0
    const projectedVolume = (budget / 1000) * 2.5
    const data = CATEGORY_SUPPLY_CHAIN[cat] || CATEGORY_SUPPLY_CHAIN.gin
    let volumeStatus = 'green'
    let volumeMessage = 'Supply chain capacity adequate for projected volume'
    if (projectedVolume > 500) { volumeStatus = 'red'; volumeMessage = 'High volume campaign — confirm production allocation 16+ weeks in advance' }
    else if (projectedVolume > 200) { volumeStatus = 'amber'; volumeMessage = 'Moderate volume — confirm stock allocation with distributor 12 weeks prior' }
    return { ...data, volumeStatus, volumeMessage, projectedVolume }
  }, [campaignData.category, campaignData.budget])

  const getContentDeliverables = useCallback(() => {
    const budget = parseFloat(campaignData.budget) || 0
    const digital = campaignData.digital
    const onTrade = campaignData.onTrade
    const offTrade = campaignData.offTrade
    const deliverables = []
    if (digital > 10) {
      deliverables.push({ type: 'Hero Campaign Video', quantity: '1x 30s + 1x 15s cutdown', format: 'MP4 16:9 + 9:16', purpose: 'YouTube pre-roll, Instagram Reels, TikTok', timeline: '4-6 weeks production' })
      deliverables.push({ type: 'Social Static Assets', quantity: `${Math.max(6, Math.round(budget / 5000))}x variants`, format: '1080x1080 + 1080x1920', purpose: 'Instagram feed, Stories, Facebook', timeline: '2-3 weeks design' })
      deliverables.push({ type: 'Short-Form Video Content', quantity: `${Math.max(4, Math.round(budget / 8000))}x pieces`, format: '9:16 vertical, 15-60s', purpose: 'TikTok, Reels, YouTube Shorts', timeline: '2-4 weeks production' })
    }
    if (digital > 20 && budget > 30000) {
      deliverables.push({ type: 'Influencer Content Briefs', quantity: `${Math.max(3, Math.round(budget / 15000))}x briefs`, format: 'Brief document + mood board', purpose: 'Influencer/KOL partnerships', timeline: '1-2 weeks briefing, 2-4 weeks creation' })
    }
    if (onTrade > 10) {
      deliverables.push({ type: 'Point of Sale Materials', quantity: '3-5 variants', format: 'A4 tent cards, A3 posters, bar runners', purpose: 'On-trade venue visibility', timeline: '2-3 weeks design + 2 weeks print' })
      deliverables.push({ type: 'Menu Inserts / Table Talkers', quantity: 'Per-venue (50-200 units)', format: 'A5/A6 printed cards', purpose: 'Serve recommendation at table', timeline: '2 weeks design + 2 weeks print' })
    }
    if (offTrade > 10) {
      deliverables.push({ type: 'Shelf Talkers / Wobblers', quantity: 'Per-store (100-500 units)', format: 'Standard retail POS sizes', purpose: 'Off-trade shelf visibility', timeline: '2 weeks design + 3 weeks print' })
      deliverables.push({ type: 'Promotional Neck Tags', quantity: 'Per-bottle (1000-5000 units)', format: 'Hang tag with recipe/offer', purpose: 'On-pack promotion', timeline: '2 weeks design + 3 weeks print' })
    }
    if (budget > 50000) {
      deliverables.push({ type: 'Brand Photography', quantity: '1x shoot day, 30-50 selects', format: 'Hi-res JPEG/TIFF', purpose: 'All channels, PR, website', timeline: '1 day shoot + 1 week post-production' })
    }
    return deliverables
  }, [campaignData.budget, campaignData.digital, campaignData.onTrade, campaignData.offTrade])

  const getROIData = useCallback(() => {
    const budget = parseFloat(campaignData.budget) || 0
    const isAwareness = campaignData.objective === 'awareness'
    if (isAwareness) {
      const impressions = budget * 120
      const reach = impressions * 0.6
      return [
        { scenario: 'Conservative', impressions: impressions * 0.7, reach: reach * 0.7, cpm: (budget / (impressions * 0.7 / 1000)).toFixed(2), awarenessLift: '+4%' },
        { scenario: 'Base Case', impressions, reach, cpm: (budget / (impressions / 1000)).toFixed(2), awarenessLift: '+7%' },
        { scenario: 'Optimistic', impressions: impressions * 1.3, reach: reach * 1.3, cpm: (budget / (impressions * 1.3 / 1000)).toFixed(2), awarenessLift: '+11%' },
      ]
    }
    const avgCasePrice = 60
    const projectedVolume = (budget / 1000) * 2.5
    const baseROAS = (projectedVolume * avgCasePrice) / budget
    return [
      { scenario: 'Conservative', volume: projectedVolume * 0.8, revenue: projectedVolume * 0.8 * avgCasePrice, roas: baseROAS * 0.8 },
      { scenario: 'Base Case', volume: projectedVolume, revenue: projectedVolume * avgCasePrice, roas: baseROAS },
      { scenario: 'Optimistic', volume: projectedVolume * 1.2, revenue: projectedVolume * 1.2 * avgCasePrice, roas: baseROAS * 1.2 },
    ]
  }, [campaignData.budget, campaignData.objective])

  // ─── STEP VALIDATION ─────────────────────────────────────────────────────
  const canAdvance = (step) => {
    if (step === 1) {
      // Step 1 → 2: category, brand name, and market must be selected
      const hasCategory = !!campaignData.category
      const hasBrandName = campaignData.campaignType === 'existing'
        ? !!campaignData.brand
        : campaignData.campaignType === 'newProduct'
        ? !!campaignData.customBrandName
        : !!campaignData.cocktailName
      const hasMarket = !!campaignData.market
      return hasCategory && hasBrandName && hasMarket
    }
    if (step === 2) {
      // Step 2 → 3: always allow (occasion mapping is optional)
      return true
    }
    if (step === 3) {
      // Step 3 → 4: budget must be > 0
      return parseFloat(campaignData.budget) > 0
    }
    return true
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setCampaignData(prev => ({ ...prev, [name]: value }))
  }

  const handleSliderChange = (channel, newValue) => {
    const adjustedValue = Math.max(0, Math.min(100, newValue))
    const otherChannels = ['digital', 'onTrade', 'offTrade', 'travelRetail'].filter(c => c !== channel)
    const sumOthers = otherChannels.reduce((sum, c) => sum + campaignData[c], 0)
    const available = 100 - adjustedValue
    if (sumOthers === 0) {
      const equal = available / otherChannels.length
      const updated = { [channel]: adjustedValue }
      otherChannels.forEach(c => { updated[c] = equal })
      setCampaignData(prev => ({ ...prev, ...updated }))
    } else {
      const ratio = available / sumOthers
      const updated = { [channel]: adjustedValue }
      otherChannels.forEach(c => { updated[c] = campaignData[c] * ratio })
      setCampaignData(prev => ({ ...prev, ...updated }))
    }
  }

  const handleSubSliderChange = (group, subChannel, newValue) => {
    const adjValue = Math.max(0, Math.min(100, newValue))
    const subChannels = group === 'digital'
      ? ['metaInstagram', 'tiktok', 'youtube', 'influencer']
      : group === 'onTrade'
      ? ['barActivations', 'restaurantPartnerships', 'festivalSponsorship']
      : ['supermarketPromo', 'specialistRetailer', 'ecommerce']
    const others = subChannels.filter(c => c !== subChannel)
    const sumOthers = others.reduce((sum, c) => sum + campaignData[c], 0)
    const available = 100 - adjValue
    if (sumOthers === 0) {
      const equal = available / others.length
      const updated = { [subChannel]: adjValue }
      others.forEach(c => { updated[c] = equal })
      setCampaignData(prev => ({ ...prev, ...updated }))
    } else {
      const ratio = available / sumOthers
      const updated = { [subChannel]: adjValue }
      others.forEach(c => { updated[c] = campaignData[c] * ratio })
      setCampaignData(prev => ({ ...prev, ...updated }))
    }
  }

  const channelMetrics = useMemo(() => {
    const budget = parseFloat(campaignData.budget) || 0
    return [
      { channel: 'Digital/Social', allocation: campaignData.digital, spent: Math.round(budget * (campaignData.digital / 100)), cpm: 8, reach: Math.round((budget * (campaignData.digital / 100)) * 125), volumeImpact: Math.round((budget * (campaignData.digital / 100)) / 400) },
      { channel: 'On-Trade', allocation: campaignData.onTrade, spent: Math.round(budget * (campaignData.onTrade / 100)), cpm: 15, reach: Math.round((budget * (campaignData.onTrade / 100)) * 67), volumeImpact: Math.round((budget * (campaignData.onTrade / 100)) / 300) },
      { channel: 'Off-Trade', allocation: campaignData.offTrade, spent: Math.round(budget * (campaignData.offTrade / 100)), cpm: 5, reach: Math.round((budget * (campaignData.offTrade / 100)) * 200), volumeImpact: Math.round((budget * (campaignData.offTrade / 100)) / 500) },
      { channel: 'Travel Retail', allocation: campaignData.travelRetail, spent: Math.round(budget * (campaignData.travelRetail / 100)), cpm: 12, reach: Math.round((budget * (campaignData.travelRetail / 100)) * 85), volumeImpact: Math.round((budget * (campaignData.travelRetail / 100)) / 400) },
    ]
  }, [campaignData.budget, campaignData.digital, campaignData.onTrade, campaignData.offTrade, campaignData.travelRetail])

  const allocationData = [
    { name: 'Digital/Social', value: campaignData.digital, color: '#1A1F36' },
    { name: 'On-Trade', value: campaignData.onTrade, color: '#C9A96E' },
    { name: 'Off-Trade', value: campaignData.offTrade, color: '#8B6F47' },
    { name: 'Travel Retail', value: campaignData.travelRetail, color: '#D4AF96' },
  ]

  const handleExport = () => {
    const objective = OBJECTIVES.find(o => o.id === campaignData.objective)
    const deliverables = getContentDeliverables()
    const competitors = getCompetitors()
    const summary = `CAMPAIGN BRIEF\n${'='.repeat(50)}\n\nBrand: ${getBrandDisplay()}\nMarket: ${campaignData.market}\nPeriod: ${campaignData.startMonth} – ${campaignData.endMonth}\nBudget: ${getCurrency()}${Number(campaignData.budget).toLocaleString()}\nObjective: ${objective?.label}\n\nCHANNEL ALLOCATION\n- Digital/Social: ${campaignData.digital.toFixed(0)}%\n- On-Trade: ${campaignData.onTrade.toFixed(0)}%\n- Off-Trade: ${campaignData.offTrade.toFixed(0)}%\n- Travel Retail: ${campaignData.travelRetail.toFixed(0)}%\n\nCOMPETITIVE LANDSCAPE\n${competitors.map(c => `- ${c.name}: ${c.position}`).join('\n')}\n\nCONTENT DELIVERABLES\n${deliverables.map(d => `- ${d.quantity} ${d.type} (${d.format})`).join('\n')}\n\nPLATFORM SPLIT (of Digital Budget)\n- Meta/Instagram: ${campaignData.metaInstagram.toFixed(0)}%\n- TikTok: ${campaignData.tiktok.toFixed(0)}%\n- YouTube: ${campaignData.youtube.toFixed(0)}%\n- Influencer/KOL: ${campaignData.influencer.toFixed(0)}%`
    const blob = new Blob([summary], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url; a.download = `campaign-brief-${getBrandDisplay().replace(/\s+/g, '-').toLowerCase()}.txt`
    a.click(); URL.revokeObjectURL(url)
  }

  // ─── TIER 1: OVERVIEW (default landing) ──────────────────────────────────
  const renderOverview = () => {
    const budget = parseFloat(campaignData.budget) || 50000
    return (
      <div className="space-y-6">
        {/* Hero Card */}
        <Card className="bg-gradient-to-r from-navy to-blue-800 border-0">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-xl bg-white/10">
              <Target size={24} className="text-gold" />
            </div>
            <div className="flex-1">
              <h2 className="font-display text-lg text-white mb-1">Campaign Planning Wizard</h2>
              <p className="text-blue-200 text-sm mb-4">5-step guided process to turn market intelligence into actionable campaign plans. Configure your brand, map cultural occasions, allocate budget, validate supply chain, and generate an agency-ready brief.</p>
              <button
                onClick={() => setCurrentStep(1)}
                className="inline-flex items-center gap-2 bg-gold text-navy px-4 py-2 rounded-lg text-sm font-semibold hover:bg-gold/90 transition-colors"
              >
                Start New Campaign <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </Card>

        {/* Quick-Start Templates */}
        <Section>
          <h3 className="text-sm font-semibold text-navy mb-3">Quick-Start Templates</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {[
              { label: 'On-Trade Activation', desc: 'Bar activations, tasting events, venue partnerships', icon: Wine, preset: { onTrade: 60, digital: 25, offTrade: 5, travelRetail: 10, objective: 'trial' } },
              { label: 'Digital-First Launch', desc: 'Social media, influencer partnerships, e-commerce', icon: Sparkles, preset: { digital: 55, onTrade: 15, offTrade: 20, travelRetail: 10, objective: 'awareness' } },
              { label: 'Festival Season', desc: 'Multi-festival activations, sampling, experiential', icon: MapPin, preset: { onTrade: 45, digital: 30, offTrade: 15, travelRetail: 10, objective: 'trial' } },
              { label: 'Off-Trade Push', desc: 'Supermarket promos, specialist retailers, gifting', icon: ShoppingCart, preset: { offTrade: 50, digital: 25, onTrade: 15, travelRetail: 10, objective: 'volume' } },
              { label: 'Premium Launch', desc: 'High-end positioning, cocktail bars, press events', icon: Star, preset: { onTrade: 40, digital: 30, offTrade: 15, travelRetail: 15, objective: 'premium' } },
              { label: 'Travel Retail Focus', desc: 'Duty-free activations, airport displays, gifting', icon: Globe, preset: { travelRetail: 45, digital: 20, offTrade: 20, onTrade: 15, objective: 'volume' } },
            ].map((template, i) => {
              const Icon = template.icon
              return (
                <Card
                  key={i}
                  hover
                  onClick={() => {
                    setCampaignData(prev => ({ ...prev, ...template.preset }))
                    setCurrentStep(1)
                  }}
                >
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-gray-50">
                      <Icon size={18} className="text-navy" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-navy">{template.label}</h4>
                      <p className="text-xs text-gray-500 mt-0.5">{template.desc}</p>
                    </div>
                  </div>
                </Card>
              )
            })}
          </div>
        </Section>

        {/* KPI Reference Cards */}
        <Section>
          <h3 className="text-sm font-semibold text-navy mb-3">Campaign Benchmarks</h3>
          <BentoGrid>
            <MetricCard label="Avg Campaign ROI" value="2.4x" icon={TrendingUp} subtitle="ROAS for spirits campaigns" direction="up" change="+0.3x vs 2024" />
            <MetricCard label="Avg Budget" value="£50,000" icon={DollarSign} subtitle="UK market mid-tier brand" />
            <MetricCard label="Most Effective Channel" value="On-Trade" icon={Wine} subtitle="For trial generation" />
            <MetricCard label="Cultural Events" value={Object.values(CULTURAL_CALENDARS).flat().length} icon={Calendar} subtitle="Across 8 markets" />
          </BentoGrid>
        </Section>
      </div>
    )
  }

  // ─── STEP RENDERERS ───────────────────────────────────────────────────────

  const renderStep1 = () => (
    <div className="space-y-6">
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-100">
        <div className="flex items-start gap-3">
          <Target className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
          <div>
            <h3 className="font-display font-bold text-sm text-blue-900 mb-1">Campaign DNA & True Objective</h3>
            <p className="text-xs text-blue-700">Define your brand, market, budget, and primary goal. This drives everything that follows.</p>
          </div>
        </div>
      </Card>

      <div>
        <label className="block text-xs font-semibold text-gray-700 mb-3">Campaign Type</label>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {CAMPAIGN_TYPES.map(type => {
            const IconComponent = ICON_MAP[type.iconName] || Target
            return (
              <div key={type.id} onClick={() => setCampaignData(prev => ({ ...prev, campaignType: type.id }))}
                className={`p-4 rounded-xl border-2 cursor-pointer transition flex flex-col items-center gap-2 ${
                  campaignData.campaignType === type.id ? 'border-gold bg-gold/5' : 'border-gray-200 bg-white hover:border-gold/50'
                }`}>
                <IconComponent className={`w-5 h-5 ${campaignData.campaignType === type.id ? 'text-gold' : 'text-gray-600'}`} />
                <p className="font-semibold text-xs text-gray-900 text-center">{type.label}</p>
              </div>
            )
          })}
        </div>
      </div>

      {campaignData.campaignType === 'existing' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-2">Category</label>
            <select name="category" value={campaignData.category} onChange={handleInputChange}
              className="w-full px-3 py-2 text-xs border border-gray-200 rounded-lg bg-white text-gray-900 focus:outline-none focus:border-gold">
              <option value="">Select Category</option>
              {CATEGORIES.map(c => <option key={c.id} value={c.id}>{c.label}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-2">Brand</label>
            <select name="brand" value={campaignData.brand} onChange={handleInputChange}
              className="w-full px-3 py-2 text-xs border border-gray-200 rounded-lg bg-white text-gray-900 focus:outline-none focus:border-gold">
              <option value="">Select Brand</option>
              {campaignData.category && BRANDS_BY_CATEGORY[campaignData.category]?.map(b => <option key={b} value={b}>{b}</option>)}
            </select>
          </div>
        </div>
      )}

      {campaignData.campaignType === 'newProduct' && (
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-2">Brand Name</label>
            <input type="text" name="customBrandName" value={campaignData.customBrandName} onChange={handleInputChange}
              placeholder="e.g., Aurora Spirits" className="w-full px-3 py-2 text-xs border border-gray-200 rounded-lg bg-white text-gray-900 focus:outline-none focus:border-gold" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-2">Category</label>
              <select name="category" value={campaignData.category} onChange={handleInputChange}
                className="w-full px-3 py-2 text-xs border border-gray-200 rounded-lg bg-white text-gray-900 focus:outline-none focus:border-gold">
                <option value="">Select Category</option>
                {CATEGORIES.map(c => <option key={c.id} value={c.id}>{c.label}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-2">Segment</label>
              <select name="segment" value={campaignData.segment} onChange={handleInputChange}
                className="w-full px-3 py-2 text-xs border border-gray-200 rounded-lg bg-white text-gray-900 focus:outline-none focus:border-gold">
                <option value="">Select Segment</option>
                {SEGMENTS.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-2">Product Description</label>
            <textarea name="productDescription" value={campaignData.productDescription} onChange={handleInputChange}
              placeholder="Describe the product, key features, and positioning..."
              className="w-full px-3 py-2 text-xs border border-gray-200 rounded-lg bg-white text-gray-900 focus:outline-none focus:border-gold h-20 resize-none" />
          </div>
        </div>
      )}

      {campaignData.campaignType === 'cocktail' && (
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-2">Cocktail Name</label>
            <input type="text" name="cocktailName" value={campaignData.cocktailName} onChange={handleInputChange}
              placeholder="e.g., Fino Spritz, Tropical Sunset" className="w-full px-3 py-2 text-xs border border-gray-200 rounded-lg bg-white text-gray-900 focus:outline-none focus:border-gold" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-2">Base Spirit</label>
              <select name="baseSpirit" value={campaignData.baseSpirit} onChange={handleInputChange}
                className="w-full px-3 py-2 text-xs border border-gray-200 rounded-lg bg-white text-gray-900 focus:outline-none focus:border-gold">
                <option value="">Select Base Spirit</option>
                {BASE_SPIRITS.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-2">Target Occasion</label>
              <select name="targetOccasion" value={campaignData.targetOccasion} onChange={handleInputChange}
                className="w-full px-3 py-2 text-xs border border-gray-200 rounded-lg bg-white text-gray-900 focus:outline-none focus:border-gold">
                <option value="">Select Occasion</option>
                {COCKTAIL_OCCASIONS.map(o => <option key={o} value={o}>{o}</option>)}
              </select>
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-2">Key Ingredients</label>
            <textarea name="ingredients" value={campaignData.ingredients} onChange={handleInputChange}
              placeholder="e.g., Fino sherry, tonic water, orange peel, olive..."
              className="w-full px-3 py-2 text-xs border border-gray-200 rounded-lg bg-white text-gray-900 focus:outline-none focus:border-gold h-16 resize-none" />
          </div>
        </div>
      )}

      {campaignData.campaignType !== 'cocktail' && (
        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-2">Serve Style</label>
          <select name="serve" value={campaignData.serve} onChange={handleInputChange}
            className="w-full px-3 py-2 text-xs border border-gray-200 rounded-lg bg-white text-gray-900 focus:outline-none focus:border-gold">
            <option value="">Select Serve</option>
            {SERVES.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-2">Market</label>
          <select name="market" value={campaignData.market} onChange={handleInputChange}
            className="w-full px-3 py-2 text-xs border border-gray-200 rounded-lg bg-white text-gray-900 focus:outline-none focus:border-gold">
            <option value="">Select Market</option>
            {MARKETS.map(m => <option key={m.code} value={m.code}>{m.code}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-2">Budget ({getCurrency()})</label>
          <input type="number" name="budget" value={campaignData.budget} onChange={handleInputChange}
            placeholder="e.g., 50000" className="w-full px-3 py-2 text-xs border border-gray-200 rounded-lg bg-white text-gray-900 focus:outline-none focus:border-gold" />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-2">Campaign Start</label>
          <select name="startMonth" value={campaignData.startMonth} onChange={handleInputChange}
            className="w-full px-3 py-2 text-xs border border-gray-200 rounded-lg bg-white text-gray-900 focus:outline-none focus:border-gold">
            {MONTHS.map(m => <option key={m} value={m}>{m}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-2">Campaign End</label>
          <select name="endMonth" value={campaignData.endMonth} onChange={handleInputChange}
            className="w-full px-3 py-2 text-xs border border-gray-200 rounded-lg bg-white text-gray-900 focus:outline-none focus:border-gold">
            {MONTHS.map(m => <option key={m} value={m}>{m}</option>)}
          </select>
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-gray-700 mb-3">Primary Objective</label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {OBJECTIVES.map(obj => (
            <div key={obj.id} onClick={() => setCampaignData(prev => ({ ...prev, objective: obj.id }))}
              className={`p-3 rounded-lg border-2 cursor-pointer transition ${
                campaignData.objective === obj.id ? 'border-gold bg-gold/5' : 'border-gray-200 bg-white hover:border-gold/50'
              }`}>
              <p className="font-semibold text-xs text-gray-900">{obj.label}</p>
              <p className="text-xs text-gray-600">{obj.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  const renderStep2 = () => {
    const calendar = CULTURAL_CALENDARS[campaignData.market] || []
    const competitors = getCompetitors()
    return (
      <div className="space-y-6">
        <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border-purple-100">
          <div className="flex items-start gap-3">
            <Calendar className="w-5 h-5 text-purple-600 mt-1 flex-shrink-0" />
            <div>
              <h3 className="font-display font-bold text-sm text-purple-900 mb-1">Occasion & Cultural Mapping</h3>
              <p className="text-xs text-purple-700">Align your campaign with cultural moments and drinking occasions in {campaignData.market || 'your market'}.</p>
            </div>
          </div>
        </Card>

        {/* Competitive Landscape (collapsed by default to reduce step complexity) */}
        <DrillDown title="Show Competitive Analysis" summary={`${competitors.length} competitors identified in ${CATEGORIES.find(c => c.id === campaignData.category)?.label || 'category'}`}>
          {competitors.length > 0 ? (
            <div className="space-y-2">
              {competitors.map((comp, idx) => (
                <div key={idx} className={`border rounded-lg p-3 ${
                  comp.threat === 'high' ? 'border-red-200 bg-red-50' : comp.threat === 'medium' ? 'border-amber-200 bg-amber-50' : 'border-green-200 bg-green-50'
                }`}>
                  <div className="flex items-center justify-between mb-1">
                    <p className="font-semibold text-xs text-gray-900">{comp.name}</p>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${
                      comp.threat === 'high' ? 'bg-red-200 text-red-800' : comp.threat === 'medium' ? 'bg-amber-200 text-amber-800' : 'bg-green-200 text-green-800'
                    }`}>{comp.threat} threat</span>
                  </div>
                  <p className="text-xs text-gray-700">{comp.position}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-xs text-gray-500">Select a category and brand to see competitive landscape</p>
          )}
        </DrillDown>

        {/* Cultural Calendar */}
        <DrillDown title={`Cultural Calendar (${campaignData.market || 'Select Market'})`} summary={`${calendar.length} events mapped`}>
          <div className="space-y-2">
            {calendar.length > 0 ? calendar.map((event, idx) => (
              <div key={idx} className="border border-gray-200 rounded-lg overflow-hidden">
                <div className="p-3 cursor-pointer hover:bg-gray-50 transition" onClick={() => setExpandedEvent(expandedEvent === idx ? null : idx)}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <p className="font-semibold text-xs text-gray-900">{event.name}</p>
                      <span className="text-xs text-gray-500">{event.date}</span>
                    </div>
                    {expandedEvent === idx ? <ChevronUp className="w-3 h-3 text-gray-500" /> : <ChevronDown className="w-3 h-3 text-gray-500" />}
                  </div>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {event.serves.map((s, i) => <span key={i} className="inline-block bg-blue-100 text-blue-700 px-2 py-0.5 rounded text-micro">{s}</span>)}
                    {event.channels.map((c, i) => <span key={i} className="inline-block bg-green-100 text-green-700 px-2 py-0.5 rounded text-micro">{c}</span>)}
                  </div>
                </div>
                {expandedEvent === idx && (
                  <div className="px-3 pb-3 border-t border-gray-100 bg-gold/5">
                    <p className="text-xs text-gray-800 mt-2 leading-relaxed">
                      <span className="font-semibold text-gold">Campaign Opportunity: </span>
                      {event.campaign}
                    </p>
                  </div>
                )}
              </div>
            )) : <p className="text-gray-500 text-xs">Select a market to see cultural events</p>}
          </div>
        </DrillDown>

        {/* Drinking Occasions */}
        <DrillDown title="Drinking Occasions" summary="Click to see campaign ideas per occasion">
          <div className="space-y-2">
            {OCCASIONS.map((occ, idx) => {
              const Icon = ICON_MAP[occ.iconName] || Clock
              const isExpanded = expandedOccasion === idx
              return (
                <div key={idx} className="border border-gray-200 rounded-lg overflow-hidden">
                  <div className="p-3 cursor-pointer hover:bg-gray-50 transition flex items-center justify-between"
                    onClick={() => setExpandedOccasion(isExpanded ? null : idx)}>
                    <div className="flex items-center gap-3">
                      <Icon className="w-4 h-4 text-gray-700" />
                      <div>
                        <p className="font-semibold text-xs text-gray-900">{occ.name}</p>
                        <p className="text-xs text-gray-600">{occ.serve} | {occ.channels.join(', ')}</p>
                      </div>
                    </div>
                    {isExpanded ? <ChevronUp className="w-3 h-3 text-gray-500" /> : <ChevronDown className="w-3 h-3 text-gray-500" />}
                  </div>
                  {isExpanded && (
                    <div className="px-3 pb-3 border-t border-gray-100 bg-blue-50">
                      <p className="text-xs font-semibold text-blue-800 mt-2 mb-2">Actionable Campaign Ideas:</p>
                      <ul className="space-y-1.5">
                        {occ.campaignIdeas.map((idea, i) => (
                          <li key={i} className="text-xs text-gray-800 flex items-start gap-2">
                            <span className="text-blue-500 mt-0.5 flex-shrink-0">{'•'}</span>
                            {idea}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </DrillDown>
      </div>
    )
  }

  const renderStep3 = () => (
    <div className="space-y-6">
      <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-100">
        <div className="flex items-start gap-3">
          <Sliders className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
          <div>
            <h3 className="font-display font-bold text-sm text-green-900 mb-1">Omnichannel Allocation Sandbox</h3>
            <p className="text-xs text-green-700">Drag sliders to allocate budget across channels. All channels auto-balance to 100%.</p>
          </div>
        </div>
      </Card>

      {/* Recommended Allocation — read-only progress bars (default view, fits one viewport) */}
      <Card>
        <h4 className="font-semibold text-xs text-gray-900 mb-1">Recommended Channel Split</h4>
        <p className="text-xs text-gray-500 mb-4">Based on your selections. Use the controls below to fine-tune.</p>
        <div className="space-y-3">
          {allocationData.map((entry, index) => {
            const budget = parseFloat(campaignData.budget) || 0
            const spend = Math.round(budget * (entry.value / 100))
            return (
              <div key={index}>
                <div className="flex items-center justify-between text-xs mb-1">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: entry.color }} />
                    <span className="font-semibold text-gray-800">{entry.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {budget > 0 && <span className="text-gray-500">{getCurrency()}{spend.toLocaleString()}</span>}
                    <span className="font-bold text-navy w-12 text-right">{entry.value.toFixed(0)}%</span>
                  </div>
                </div>
                <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full rounded-full transition-all duration-300" style={{ width: `${entry.value}%`, backgroundColor: entry.color }} />
                </div>
              </div>
            )
          })}
        </div>
      </Card>

      {/* Adjust allocation sliders — collapsed DrillDown */}
      <DrillDown title="Adjust Channel Allocation" summary="Drag sliders to customise the split (auto-balances to 100%)">
        <div className="space-y-4">
          {['digital', 'onTrade', 'offTrade', 'travelRetail'].map(channel => {
            const labels = { digital: 'Digital/Social', onTrade: 'On-Trade', offTrade: 'Off-Trade', travelRetail: 'Travel Retail' }
            const value = campaignData[channel]
            const budget = parseFloat(campaignData.budget) || 0
            return (
              <div key={channel} className="space-y-1">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold text-gray-900">{labels[channel]}</label>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-500">{getCurrency()}{Math.round(budget * (value / 100)).toLocaleString()}</span>
                    <span className="text-xs font-bold text-gray-900 w-12 text-right">{value.toFixed(1)}%</span>
                  </div>
                </div>
                <div className="py-1">
                  <input type="range" min="0" max="100" step="0.1" value={value}
                    onChange={(e) => handleSliderChange(channel, parseFloat(e.target.value))}
                    className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-gold touch-action-none" />
                </div>
              </div>
            )
          })}
        </div>
      </DrillDown>

      <DrillDown title="Channel Metrics & Impact" summary="Estimated reach and volume by channel">
        <div className="relative">
          <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-2 py-2 text-left font-semibold text-gray-700">Channel</th>
                <th className="px-2 py-2 text-right font-semibold text-gray-700">Budget</th>
                <th className="px-2 py-2 text-right font-semibold text-gray-700">Est. Reach</th>
                <th className="px-2 py-2 text-right font-semibold text-gray-700">Vol. Cases</th>
              </tr>
            </thead>
            <tbody>
              {channelMetrics.map((metric, idx) => (
                <tr key={idx} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="px-2 py-2 font-semibold text-gray-900">{metric.channel}</td>
                  <td className="px-2 py-2 text-right text-gray-700">{getCurrency()}{metric.spent.toLocaleString()}</td>
                  <td className="px-2 py-2 text-right text-gray-700">{metric.reach.toLocaleString()}</td>
                  <td className="px-2 py-2 text-right text-gray-700">{metric.volumeImpact}</td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
          <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white to-transparent sm:hidden" />
        </div>
      </DrillDown>

      {/* Fine-tune Digital Split — collapsed DrillDown */}
      <DrillDown title="Fine-tune Digital Split" summary="Adjust Meta/TikTok/YouTube/Influencer allocation">
        <div className="space-y-6">
          {campaignData.digital > 0 && (
            <div>
              <h5 className="text-xs font-semibold text-navy mb-3">Digital/Social Split</h5>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { key: 'metaInstagram', label: 'Meta/IG' },
                  { key: 'tiktok', label: 'TikTok' },
                  { key: 'youtube', label: 'YouTube' },
                  { key: 'influencer', label: 'Influencer' },
                ].map(({ key, label }) => (
                  <div key={key} className="bg-blue-50 rounded-lg p-2 text-center">
                    <p className="text-xs font-bold text-blue-900">{campaignData[key].toFixed(0)}%</p>
                    <p className="text-xs text-blue-700">{label}</p>
                    <div className="py-2">
                      <input type="range" min="0" max="100" step="1" value={campaignData[key]}
                        onChange={(e) => handleSubSliderChange('digital', key, parseFloat(e.target.value))}
                        className="w-full h-3 mt-1 bg-blue-200 rounded-lg appearance-none cursor-pointer accent-blue-600 touch-action-none" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          {campaignData.onTrade > 0 && (
            <div>
              <h5 className="text-xs font-semibold text-navy mb-3">On-Trade Split</h5>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { key: 'barActivations', label: 'Bar Activations' },
                  { key: 'restaurantPartnerships', label: 'Restaurant' },
                  { key: 'festivalSponsorship', label: 'Festival' },
                ].map(({ key, label }) => (
                  <div key={key} className="bg-gold/10 rounded-lg p-2 text-center">
                    <p className="text-xs font-bold text-navy">{campaignData[key].toFixed(0)}%</p>
                    <p className="text-xs text-gray-600">{label}</p>
                    <div className="py-2">
                      <input type="range" min="0" max="100" step="1" value={campaignData[key]}
                        onChange={(e) => handleSubSliderChange('onTrade', key, parseFloat(e.target.value))}
                        className="w-full h-3 mt-1 bg-gold/30 rounded-lg appearance-none cursor-pointer accent-gold touch-action-none" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          {campaignData.offTrade > 0 && (
            <div>
              <h5 className="text-xs font-semibold text-navy mb-3">Off-Trade Split</h5>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { key: 'supermarketPromo', label: 'Supermarket' },
                  { key: 'specialistRetailer', label: 'Specialist' },
                  { key: 'ecommerce', label: 'E-commerce' },
                ].map(({ key, label }) => (
                  <div key={key} className="bg-green-50 rounded-lg p-2 text-center">
                    <p className="text-xs font-bold text-green-900">{campaignData[key].toFixed(0)}%</p>
                    <p className="text-xs text-green-700">{label}</p>
                    <div className="py-2">
                      <input type="range" min="0" max="100" step="1" value={campaignData[key]}
                        onChange={(e) => handleSubSliderChange('offTrade', key, parseFloat(e.target.value))}
                        className="w-full h-3 mt-1 bg-green-200 rounded-lg appearance-none cursor-pointer accent-green-600 touch-action-none" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </DrillDown>
    </div>
  )

  const renderStep4 = () => {
    const supply = getSupplyChainData()
    const deliverables = getContentDeliverables()
    const statusColors = { green: 'bg-green-50 border-green-200 text-green-900', amber: 'bg-amber-50 border-amber-200 text-amber-900', red: 'bg-red-50 border-red-200 text-red-900' }
    const statusIcons = { green: '✓', amber: '!', red: '×' }

    return (
      <div className="space-y-6">
        <Card className="bg-gradient-to-r from-orange-50 to-red-50 border-orange-100">
          <div className="flex items-start gap-3">
            <Package className="w-5 h-5 text-orange-600 mt-1 flex-shrink-0" />
            <div>
              <h3 className="font-display font-bold text-sm text-orange-900 mb-1">Supply Chain & Content Production</h3>
              <p className="text-xs text-orange-700">Product-specific supply chain intelligence and content deliverables for {getBrandDisplay() || 'your brand'}.</p>
            </div>
          </div>
        </Card>

        {/* Volume Feasibility */}
        <Card className={statusColors[supply.volumeStatus]}>
          <div className="flex items-start gap-3">
            <span className="font-bold text-lg">{statusIcons[supply.volumeStatus]}</span>
            <div>
              <h4 className="font-semibold text-xs mb-1">Volume Feasibility ({supply.projectedVolume.toFixed(0)} projected cases)</h4>
              <p className="text-xs">{supply.volumeMessage}</p>
            </div>
          </div>
        </Card>

        {/* Raw Materials */}
        <DrillDown title={`Raw Materials & Logistics ${campaignData.category ? '— ' + (CATEGORIES.find(c => c.id === campaignData.category)?.label || '') : ''}`} summary={`${supply.materials.length} materials tracked`} defaultOpen>
          <div className="space-y-2">
            {supply.materials.map((mat, idx) => (
              <div key={idx} className={`border rounded-lg p-3 ${statusColors[mat.status]}`}>
                <p className="text-xs font-semibold">{mat.name}</p>
                <p className="text-xs mt-1">{mat.detail}</p>
              </div>
            ))}
          </div>
          <div className="mt-4 space-y-2 text-xs">
            <div className="flex items-center justify-between pb-2 border-b border-gray-200">
              <span className="font-semibold text-gray-700">Production / Bottling</span>
              <span className="text-gray-600">{supply.production}</span>
            </div>
            <div className="flex items-center justify-between pb-2 border-b border-gray-200">
              <span className="font-semibold text-gray-700">Shipping to Market</span>
              <span className="text-gray-600">{supply.shipping}</span>
            </div>
            <div className="flex items-center justify-between pb-2 border-b border-gray-200">
              <span className="font-semibold text-gray-700">Distribution to Retail</span>
              <span className="text-gray-600">{supply.distribution}</span>
            </div>
          </div>
        </DrillDown>

        {/* Content Deliverables — summary card by default, full list in DrillDown */}
        {deliverables.length > 0 && (
          <Card padding="p-4">
            <div className="flex items-start gap-3 mb-3">
              <div className="p-2 rounded-lg bg-purple-50 flex-shrink-0">
                <Package className="w-4 h-4 text-purple-600" />
              </div>
              <div>
                <p className="text-xs font-bold text-navy">Content Production Summary</p>
                <p className="text-xs text-gray-500">{deliverables.length} deliverables required based on your budget and channel allocation</p>
              </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {deliverables.slice(0, 3).map((d, idx) => (
                <div key={idx} className="bg-gray-50 rounded-lg p-2.5 text-center">
                  <p className="text-xs font-bold text-navy">{d.quantity.split(' ')[0]}</p>
                  <p className="text-xs text-gray-600 truncate">{d.type}</p>
                  <p className="text-micro text-gray-500">{d.timeline}</p>
                </div>
              ))}
            </div>
            {deliverables.length > 3 && (
              <p className="text-xs text-gray-500 mt-2 text-center">+{deliverables.length - 3} more deliverables</p>
            )}
          </Card>
        )}
        <DrillDown title="Full Content Deliverables List" summary={`${deliverables.length} items — expand for formats, quantities, and timelines`}>
          {deliverables.length > 0 ? (
            <div className="space-y-2">
              {deliverables.map((d, idx) => (
                <div key={idx} className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                  <div className="flex items-center justify-between mb-1">
                    <p className="font-semibold text-xs text-gray-900">{d.type}</p>
                    <span className="text-xs text-purple-700 font-semibold">{d.timeline}</span>
                  </div>
                  <p className="text-xs text-gray-700"><span className="font-semibold">Quantity:</span> {d.quantity}</p>
                  <p className="text-xs text-gray-600"><span className="font-semibold">Format:</span> {d.format}</p>
                  <p className="text-xs text-gray-500"><span className="font-semibold">Purpose:</span> {d.purpose}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-xs text-gray-500">Set budget and channel allocation to see required content deliverables</p>
          )}
        </DrillDown>

        {/* Margin Impact */}
        <DrillDown title={campaignData.objective === 'awareness' ? 'Investment Profile (Awareness Campaign)' : 'Margin Impact Analysis'} summary="Financial viability assessment">
          {campaignData.objective === 'awareness' ? (
            <div className="space-y-2 text-xs">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <p className="font-semibold text-blue-900">This is a brand-building investment, not a direct revenue campaign.</p>
                <p className="text-blue-700 mt-1">Awareness campaigns build long-term brand equity. ROI is measured in impressions, reach, and awareness lift rather than immediate case sales. Budget should be viewed as marketing investment with 12-18 month payback horizon.</p>
              </div>
              <div className="flex items-center justify-between pb-2 border-b border-gray-200">
                <span className="text-gray-700">Estimated Cost Per Thousand Impressions</span>
                <span className="font-semibold text-gray-900">{getCurrency()}6-12</span>
              </div>
              <div className="flex items-center justify-between pb-2 border-b border-gray-200">
                <span className="text-gray-700">Estimated Total Reach</span>
                <span className="font-semibold text-gray-900">{((parseFloat(campaignData.budget) || 0) * 72).toLocaleString()} people</span>
              </div>
            </div>
          ) : (
            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between pb-2 border-b border-gray-200">
                <span className="text-gray-700">Typical {CATEGORIES.find(c => c.id === campaignData.category)?.label || 'category'} margin (Off-Trade)</span>
                <span className="font-semibold text-gray-900">{campaignData.category === 'champagne' ? '42%' : campaignData.category === 'whisky' ? '40%' : campaignData.category === 'nolo' ? '35%' : '38%'}</span>
              </div>
              <div className="flex items-center justify-between pb-2 border-b border-gray-200">
                <span className="text-gray-700">With 15% promotional discount</span>
                <span className="font-semibold text-red-600">{campaignData.category === 'champagne' ? '32%' : campaignData.category === 'whisky' ? '30%' : '28%'}</span>
              </div>
              <div className="flex items-center justify-between bg-gold/5 p-2 rounded-lg">
                <span className="font-semibold text-navy">Volume required to offset promo</span>
                <span className="font-bold text-navy">+36-42% incremental cases</span>
              </div>
            </div>
          )}
        </DrillDown>
      </div>
    )
  }

  const renderStep5 = () => {
    const roiData = getROIData()
    const budget = parseFloat(campaignData.budget) || 0
    const objective = OBJECTIVES.find(o => o.id === campaignData.objective)
    const isAwareness = campaignData.objective === 'awareness'
    const competitors = getCompetitors()
    const deliverables = getContentDeliverables()

    const getRisks = () => {
      const risks = []
      const cat = campaignData.category
      if (competitors.length > 0 && competitors[0].threat === 'high') {
        risks.push({ severity: 'high', title: `${competitors[0].name} Competitive Response`, detail: `${competitors[0].name} holds strong market position. Expect potential counter-activation within 2-4 weeks of your campaign launch.` })
      }
      if (budget < 20000) {
        risks.push({ severity: 'high', title: 'Budget Limitation', detail: `${getCurrency()}${budget.toLocaleString()} is below typical effective threshold for multi-channel campaigns. Consider concentrating on 1-2 channels.` })
      }
      if (campaignData.startMonth === 'January' && cat !== 'nolo') {
        risks.push({ severity: 'medium', title: 'Dry January Headwind', detail: 'January sees reduced alcohol consumption. Consider delayed launch to February or pivoting messaging to moderation/premium occasions.' })
      }
      if (campaignData.market === 'UK' && (campaignData.startMonth === 'June' || campaignData.startMonth === 'July')) {
        risks.push({ severity: 'medium', title: 'Summer Competition Peak', detail: 'June-July is peak activation season in UK. Media costs rise 20-30%. Ensure creative stands out.' })
      }
      if (campaignData.travelRetail > 30) {
        risks.push({ severity: 'medium', title: 'Travel Retail Dependency', detail: 'Heavy travel retail allocation (>30%) exposes campaign to passenger volume fluctuations.' })
      }
      if (campaignData.campaignType === 'newProduct') {
        risks.push({ severity: 'high', title: 'New Product Trial Barrier', detail: 'New brands face significant trial barriers. Allocate minimum 20% of budget to sampling. First-purchase conversion typically takes 3-5 touchpoints.' })
      }
      if (risks.length < 2) {
        risks.push({ severity: 'low', title: 'Execution Timing', detail: `Ensure all content production is completed 4 weeks before campaign launch (${campaignData.startMonth}).` })
      }
      return risks
    }

    const risks = getRisks()

    return (
      <div className="space-y-6">
        <Card className="bg-gradient-to-r from-indigo-50 to-blue-50 border-indigo-100">
          <div className="flex items-start gap-3">
            <BarChart3 className="w-5 h-5 text-indigo-600 mt-1 flex-shrink-0" />
            <div>
              <h3 className="font-display font-bold text-sm text-indigo-900 mb-1">Predictive ROI & Agency Handoff</h3>
              <p className="text-xs text-indigo-700">Campaign projections and complete agency brief for {getBrandDisplay() || 'your brand'}.</p>
            </div>
          </div>
        </Card>

        {/* Forecasted Metrics */}
        <BentoGrid>
          {isAwareness ? (<>
            <MetricCard label="Total Impressions" value={`${(roiData[1].impressions / 1000000).toFixed(1)}M`} icon={BarChart3} />
            <MetricCard label="Unique Reach" value={`${(roiData[1].reach / 1000000).toFixed(1)}M`} icon={Users} />
            <MetricCard label="Avg CPM" value={`${getCurrency()}${roiData[1].cpm}`} icon={DollarSign} />
            <MetricCard label="Awareness Lift" value={roiData[1].awarenessLift} icon={TrendingUp} direction="up" />
          </>) : (<>
            <MetricCard label="Incremental Volume" value={`${roiData[1].volume.toFixed(0)} cases`} icon={Package} />
            <MetricCard label="Revenue Uplift" value={`${getCurrency()}${(roiData[1].revenue / 1000).toFixed(0)}k`} icon={TrendingUp} direction="up" />
            <MetricCard label="ROAS" value={`${roiData[1].roas.toFixed(2)}x`} icon={BarChart3} />
            <MetricCard label="Cost per Case" value={`${getCurrency()}${(budget / roiData[1].volume).toFixed(0)}`} icon={DollarSign} />
          </>)}
        </BentoGrid>

        {/* Risk Factors */}
        <DrillDown title="Campaign-Specific Risk Factors" summary={`${risks.length} risks identified`} defaultOpen>
          <div className="space-y-2">
            {risks.map((risk, idx) => {
              const riskColors = { high: 'bg-red-50 border-red-200', medium: 'bg-amber-50 border-amber-200', low: 'bg-gold/5 border-gold/30' }
              const textColors = { high: 'text-red-900', medium: 'text-amber-900', low: 'text-navy' }
              const subColors = { high: 'text-red-700', medium: 'text-amber-700', low: 'text-gray-600' }
              return (
                <div key={idx} className={`border rounded-lg p-3 ${riskColors[risk.severity]}`}>
                  <div className="flex items-center justify-between mb-1">
                    <p className={`font-semibold text-xs ${textColors[risk.severity]}`}>{risk.title}</p>
                    <span className={`text-xs font-semibold uppercase ${subColors[risk.severity]}`}>{risk.severity}</span>
                  </div>
                  <p className={`text-xs ${subColors[risk.severity]}`}>{risk.detail}</p>
                </div>
              )
            })}
          </div>
        </DrillDown>

        {/* Liquid Intelligence — Campaign Signals */}
        {(() => {
          const budget = parseFloat(campaignData.budget) || 0
          const maxChannel = Math.max(campaignData.digital, campaignData.onTrade, campaignData.offTrade, campaignData.travelRetail)
          const dominantChannelName = (() => {
            if (campaignData.digital === maxChannel) return 'Digital/Social'
            if (campaignData.onTrade === maxChannel) return 'On-Trade'
            if (campaignData.offTrade === maxChannel) return 'Off-Trade'
            return 'Travel Retail'
          })()
          const obj = campaignData.objective
          const isAwareness = obj === 'awareness'
          const isPremium = obj === 'premium'
          const isTrial = obj === 'trial'
          // Signal 1: Budget adequacy vs. objective
          const budgetBand = budget >= 100000 ? 'high' : budget >= 30000 ? 'mid' : budget > 0 ? 'low' : 'none'
          // Signal 2: Channel concentration risk
          const concHi = maxChannel >= 50
          const concMid = maxChannel >= 35
          // Signal 3: Timing risk (Dry January, Summer peak UK)
          const month = campaignData.startMonth
          const market = campaignData.market
          const dryJan = month === 'January' && obj !== 'nolo'
          const ukSummerPeak = (market === 'UK') && (month === 'June' || month === 'July')
          const timingRisk = dryJan ? 'high' : ukSummerPeak ? 'medium' : 'low'

          if (budget === 0 && !obj) return null

          return (
            <div className="border-l-4 border-gold bg-gradient-to-r from-gold/5 to-transparent rounded-xl p-5">
              <div className="flex items-center gap-2 mb-4">
                <Zap size={16} className="text-gold" />
                <span className="text-sm font-bold text-navy">Liquid Intelligence</span>
                <span className="text-xs text-gray-400 ml-auto">Campaign signals</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

                {/* Signal 1: Budget adequacy */}
                {budget > 0 && (
                  <div className={`p-3 rounded-lg border ${
                    budgetBand === 'high' ? 'bg-emerald-50 border-emerald-200'
                    : budgetBand === 'mid' ? 'bg-blue-50 border-blue-200'
                    : 'bg-amber-50 border-amber-200'
                  }`}>
                    <div className={`text-xs font-semibold mb-1 ${
                      budgetBand === 'high' ? 'text-emerald-700'
                      : budgetBand === 'mid' ? 'text-blue-700'
                      : 'text-amber-700'
                    }`}>
                      Budget: {getCurrency()}{budget.toLocaleString()}
                    </div>
                    <p className={`text-xs leading-relaxed ${
                      budgetBand === 'high' ? 'text-emerald-600'
                      : budgetBand === 'mid' ? 'text-blue-600'
                      : 'text-amber-600'
                    }`}>
                      {budgetBand === 'high'
                        ? (isAwareness
                          ? 'Sufficient for a multi-market awareness push with TV/video and influencer layers.'
                          : isPremium
                          ? 'Premium launch budget — room for high-production creative and sampling at scale.'
                          : 'Full-funnel budget — supports concurrent trial, volume, and retention mechanics.')
                        : budgetBand === 'mid'
                        ? (isTrial
                          ? 'Viable for a focused trial campaign — concentrate on 1-2 high-conversion channels.'
                          : 'Workable mid-range budget — prioritise channels that best match your objective.')
                        : 'Lean budget — focus on a single channel for maximum concentration and measurability.'
                      }
                    </p>
                  </div>
                )}

                {/* Signal 2: Channel concentration */}
                <div className={`p-3 rounded-lg border ${
                  concHi ? 'bg-amber-50 border-amber-200'
                  : concMid ? 'bg-gold/10 border-gold/30'
                  : 'bg-emerald-50 border-emerald-200'
                }`}>
                  <div className={`text-xs font-semibold mb-1 ${
                    concHi ? 'text-amber-700' : concMid ? 'text-amber-800' : 'text-emerald-700'
                  }`}>
                    {dominantChannelName}: {maxChannel.toFixed(0)}%
                  </div>
                  <p className={`text-xs leading-relaxed ${
                    concHi ? 'text-amber-600' : concMid ? 'text-amber-700' : 'text-emerald-600'
                  }`}>
                    {concHi
                      ? `Heavy concentration in ${dominantChannelName}. Single-channel dependency increases execution risk — ensure backup tactics.`
                      : concMid
                      ? `Moderate ${dominantChannelName} weighting — healthy lead channel with meaningful diversification.`
                      : 'Well-diversified channel mix — reduces single-point-of-failure risk and broadens reach.'}
                  </p>
                </div>

                {/* Signal 3: Timing */}
                <div className={`p-3 rounded-lg border ${
                  timingRisk === 'high' ? 'bg-red-50 border-red-200'
                  : timingRisk === 'medium' ? 'bg-amber-50 border-amber-200'
                  : 'bg-emerald-50 border-emerald-200'
                }`}>
                  <div className={`text-xs font-semibold mb-1 ${
                    timingRisk === 'high' ? 'text-red-700'
                    : timingRisk === 'medium' ? 'text-amber-700'
                    : 'text-emerald-700'
                  }`}>
                    Launch: {month || 'not set'}{market ? ` · ${market}` : ''}
                  </div>
                  <p className={`text-xs leading-relaxed ${
                    timingRisk === 'high' ? 'text-red-600'
                    : timingRisk === 'medium' ? 'text-amber-600'
                    : 'text-emerald-600'
                  }`}>
                    {dryJan
                      ? 'January headwind — alcohol demand dips significantly. Delay launch to Feb or pivot to moderation/premium messaging.'
                      : ukSummerPeak
                      ? 'UK summer peak season — media costs 20–30% higher. Ensure creative is outstanding and brief is locked 6+ weeks ahead.'
                      : month
                      ? 'Timing looks clear of major headwinds. Confirm distributor stock is allocated 8–12 weeks before launch.'
                      : 'Set a launch month to receive timing intelligence.'}
                  </p>
                </div>
              </div>
            </div>
          )
        })()}

        {/* Agency Handoff Brief (Tier 3) */}
        <Card className="bg-gradient-to-r from-gold/10 to-gold/5 border-2 border-gold/30">
          <h4 className="font-semibold text-sm text-navy flex items-center gap-2 mb-4">
            <Megaphone className="w-5 h-5" />
            Agency Handoff Brief
          </h4>
          <div className="bg-white rounded-lg p-4 space-y-3 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <p className="font-semibold text-gray-500 uppercase text-micro">Brand</p>
                <p className="font-bold text-gray-900">{getBrandDisplay() || '—'}</p>
              </div>
              <div>
                <p className="font-semibold text-gray-500 uppercase text-micro">Objective</p>
                <p className="font-bold text-gray-900">{objective?.label || '—'}</p>
              </div>
              <div>
                <p className="font-semibold text-gray-500 uppercase text-micro">Market & Timeline</p>
                <p className="font-bold text-gray-900">{campaignData.market || '—'} | {campaignData.startMonth} – {campaignData.endMonth}</p>
              </div>
              <div>
                <p className="font-semibold text-gray-500 uppercase text-micro">Total Budget</p>
                <p className="font-bold text-gray-900">{getCurrency()}{Number(campaignData.budget || 0).toLocaleString()}</p>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-3">
              <p className="font-semibold text-gray-500 uppercase text-micro mb-2">Channel Budget Allocation</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
                {[
                  { label: 'Digital', pct: campaignData.digital },
                  { label: 'On-Trade', pct: campaignData.onTrade },
                  { label: 'Off-Trade', pct: campaignData.offTrade },
                  { label: 'Travel Retail', pct: campaignData.travelRetail },
                ].map(ch => (
                  <div key={ch.label} className="bg-gray-50 rounded-lg p-2 text-center">
                    <p className="font-bold text-gray-900">{ch.pct.toFixed(0)}%</p>
                    <p className="text-gray-600 text-xs">{ch.label}</p>
                    <p className="text-gray-500 text-xs">{getCurrency()}{Math.round((parseFloat(campaignData.budget) || 0) * (ch.pct / 100)).toLocaleString()}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t border-gray-200 pt-3">
              <p className="font-semibold text-gray-500 uppercase text-micro mb-2">Digital Platform Split</p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { label: 'Meta/IG', pct: campaignData.metaInstagram },
                  { label: 'TikTok', pct: campaignData.tiktok },
                  { label: 'YouTube', pct: campaignData.youtube },
                  { label: 'Influencer', pct: campaignData.influencer },
                ].map(p => (
                  <div key={p.label} className="bg-blue-50 rounded-lg p-2 text-center">
                    <p className="font-bold text-blue-900">{p.pct.toFixed(0)}%</p>
                    <p className="text-blue-700 text-xs">{p.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {deliverables.length > 0 && (
              <div className="border-t border-gray-200 pt-3">
                <p className="font-semibold text-gray-500 uppercase text-micro mb-2">Content Deliverables</p>
                <div className="space-y-1">
                  {deliverables.map((d, idx) => (
                    <div key={idx} className="flex items-center justify-between py-1 border-b border-gray-100 last:border-0">
                      <span className="text-gray-900">{d.quantity} {d.type}</span>
                      <span className="text-gray-500">{d.format}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {competitors.length > 0 && (
              <div className="border-t border-gray-200 pt-3">
                <p className="font-semibold text-gray-500 uppercase text-micro mb-2">Key Competitors to Monitor</p>
                <p className="text-gray-700">{competitors.map(c => c.name).join(', ')}</p>
              </div>
            )}

            <div className="border-t border-gray-200 pt-3">
              <p className="font-semibold text-gray-500 uppercase text-micro mb-2">Key Insight for Creative</p>
              <p className="text-gray-700 italic">
                {campaignData.objective === 'awareness'
                  ? `This is a brand-building campaign. Creative should prioritise memorability and brand association over direct response. Aim for high-impact visual storytelling that positions ${getBrandDisplay()} distinctively within ${CATEGORIES.find(c => c.id === campaignData.category)?.label || 'the category'}.`
                  : campaignData.objective === 'trial'
                  ? 'Focus creative on lowering the trial barrier. Show the serve, make it approachable, and include a clear call-to-action. Sampling and “first drink free” mechanics should be central.'
                  : campaignData.objective === 'premium'
                  ? 'Creative should elevate the brand perception. Use premium production values, aspirational settings, and emphasise craftsmanship/heritage. Avoid price messaging.'
                  : 'Drive urgency and volume. Promotional mechanics, limited-time offers, and clear value propositions should be front and centre in all creative.'
                }
              </p>
            </div>
          </div>

          <button onClick={handleExport}
            className="w-full flex items-center justify-center gap-2 bg-navy hover:bg-navy/90 text-white font-semibold text-xs py-3 rounded-lg transition mt-4">
            <Download className="w-4 h-4" />
            Export Campaign Brief (.txt)
          </button>
        </Card>
      </div>
    )
  }

  // ─── MOBILE TEMPLATES DATA ─────────────────────────────────────────────────
  const mobileTemplates = [
    { label: 'On-Trade Activation', desc: 'Bar activations, tasting events, venue partnerships', icon: Wine, preset: { onTrade: 60, digital: 25, offTrade: 5, travelRetail: 10, objective: 'trial' } },
    { label: 'Digital-First Launch', desc: 'Social media, influencer partnerships, e-commerce', icon: Sparkles, preset: { digital: 55, onTrade: 15, offTrade: 20, travelRetail: 10, objective: 'awareness' } },
    { label: 'Festival Season', desc: 'Multi-festival activations, sampling, experiential', icon: MapPin, preset: { onTrade: 45, digital: 30, offTrade: 15, travelRetail: 10, objective: 'trial' } },
    { label: 'Off-Trade Push', desc: 'Supermarket promos, specialist retailers, gifting', icon: ShoppingCart, preset: { offTrade: 50, digital: 25, onTrade: 15, travelRetail: 10, objective: 'volume' } },
    { label: 'Premium Launch', desc: 'High-end positioning, cocktail bars, press events', icon: Star, preset: { onTrade: 40, digital: 30, offTrade: 15, travelRetail: 15, objective: 'premium' } },
    { label: 'Travel Retail Focus', desc: 'Duty-free activations, airport displays, gifting', icon: Globe, preset: { travelRetail: 45, digital: 20, offTrade: 20, onTrade: 15, objective: 'volume' } },
  ]

  // ─── MOBILE WIZARD RENDERERS ─────────────────────────────────────────────

  const renderMobileOverview = () => (
    <div className="space-y-6">
      <Card className="bg-gradient-to-r from-navy to-blue-800 border-0">
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-xl bg-white/10">
            <Target size={24} className="text-gold" />
          </div>
          <div className="flex-1">
            <h2 className="font-display text-lg text-white mb-1">Campaign Planner</h2>
            <p className="text-blue-200 text-sm mb-4">3-step mobile flow: choose your campaign, set budget, then review and export.</p>
            <button
              onClick={() => setMobileStep(1)}
              className="inline-flex items-center gap-2 bg-gold text-navy px-4 py-3 rounded-lg text-sm font-semibold hover:bg-gold/90 transition-colors touch-manipulation"
            >
              Start Campaign <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </Card>

      <Section>
        <h3 className="text-sm font-semibold text-navy mb-3">Quick-Start Templates</h3>
        <div className="grid grid-cols-1 gap-3">
          {mobileTemplates.map((template, i) => {
            const Icon = template.icon
            return (
              <Card
                key={i}
                hover
                onClick={() => setTemplateSheet(template)}
              >
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-lg bg-gray-50">
                    <Icon size={20} className="text-navy" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-semibold text-navy">{template.label}</h4>
                    <p className="text-xs text-gray-500 mt-0.5 truncate">{template.desc}</p>
                  </div>
                  <ChevronRight size={16} className="text-gray-500 flex-shrink-0" />
                </div>
              </Card>
            )
          })}
        </div>
      </Section>

      <Section>
        <h3 className="text-sm font-semibold text-navy mb-3">Campaign Benchmarks</h3>
        <div className="grid grid-cols-2 gap-3">
          <MetricCard label="Avg ROI" value="2.4x" icon={TrendingUp} subtitle="Spirits campaigns" direction="up" />
          <MetricCard label="Avg Budget" value="£50k" icon={DollarSign} subtitle="UK mid-tier" />
          <MetricCard label="Best Channel" value="On-Trade" icon={Wine} subtitle="For trial" />
          <MetricCard label="Events" value={Object.values(CULTURAL_CALENDARS).flat().length} icon={Calendar} subtitle="8 markets" />
        </div>
      </Section>
    </div>
  )

  const renderMobileStep1 = () => (
    <div className="space-y-5">
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-100">
        <div className="flex items-start gap-3">
          <Target className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
          <div>
            <h3 className="font-display font-bold text-sm text-blue-900 mb-1">Step 1: Campaign Brief</h3>
            <p className="text-xs text-blue-700">Choose your category, market, and campaign type.</p>
          </div>
        </div>
      </Card>

      {/* Campaign Type - simplified card selection */}
      <div>
        <label className="block text-xs font-semibold text-gray-700 mb-3">Campaign Type</label>
        <div className="grid grid-cols-1 gap-2">
          {CAMPAIGN_TYPES.map(type => {
            const IconComponent = ICON_MAP[type.iconName] || Target
            return (
              <div key={type.id} onClick={() => setCampaignData(prev => ({ ...prev, campaignType: type.id }))}
                className={`p-4 rounded-xl border-2 cursor-pointer transition flex items-center gap-3 touch-manipulation ${
                  campaignData.campaignType === type.id ? 'border-gold bg-gold/5' : 'border-gray-200 bg-white'
                }`}>
                <IconComponent className={`w-5 h-5 flex-shrink-0 ${campaignData.campaignType === type.id ? 'text-gold' : 'text-gray-500'}`} />
                <p className="font-semibold text-sm text-gray-900">{type.label}</p>
                {campaignData.campaignType === type.id && <CheckCircle className="w-4 h-4 text-gold ml-auto flex-shrink-0" />}
              </div>
            )
          })}
        </div>
      </div>

      {/* Category */}
      <div>
        <label className="block text-xs font-semibold text-gray-700 mb-2">Category</label>
        <select name="category" value={campaignData.category} onChange={handleInputChange}
          className="w-full px-3 py-3 text-sm border border-gray-200 rounded-lg bg-white text-gray-900 focus:outline-none focus:border-gold touch-manipulation">
          <option value="">Select Category</option>
          {CATEGORIES.map(c => <option key={c.id} value={c.id}>{c.label}</option>)}
        </select>
      </div>

      {/* Brand (existing) */}
      {campaignData.campaignType === 'existing' && campaignData.category && (
        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-2">Brand</label>
          <select name="brand" value={campaignData.brand} onChange={handleInputChange}
            className="w-full px-3 py-3 text-sm border border-gray-200 rounded-lg bg-white text-gray-900 focus:outline-none focus:border-gold touch-manipulation">
            <option value="">Select Brand</option>
            {BRANDS_BY_CATEGORY[campaignData.category]?.map(b => <option key={b} value={b}>{b}</option>)}
          </select>
        </div>
      )}

      {/* New Product fields */}
      {campaignData.campaignType === 'newProduct' && (
        <div className="space-y-3">
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-2">Brand Name</label>
            <input type="text" name="customBrandName" value={campaignData.customBrandName} onChange={handleInputChange}
              placeholder="e.g., Aurora Spirits" className="w-full px-3 py-3 text-sm border border-gray-200 rounded-lg bg-white text-gray-900 focus:outline-none focus:border-gold touch-manipulation" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-2">Segment</label>
            <select name="segment" value={campaignData.segment} onChange={handleInputChange}
              className="w-full px-3 py-3 text-sm border border-gray-200 rounded-lg bg-white text-gray-900 focus:outline-none focus:border-gold touch-manipulation">
              <option value="">Select Segment</option>
              {SEGMENTS.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
        </div>
      )}

      {/* Cocktail fields */}
      {campaignData.campaignType === 'cocktail' && (
        <div className="space-y-3">
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-2">Cocktail Name</label>
            <input type="text" name="cocktailName" value={campaignData.cocktailName} onChange={handleInputChange}
              placeholder="e.g., Fino Spritz" className="w-full px-3 py-3 text-sm border border-gray-200 rounded-lg bg-white text-gray-900 focus:outline-none focus:border-gold touch-manipulation" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-2">Base Spirit</label>
            <select name="baseSpirit" value={campaignData.baseSpirit} onChange={handleInputChange}
              className="w-full px-3 py-3 text-sm border border-gray-200 rounded-lg bg-white text-gray-900 focus:outline-none focus:border-gold touch-manipulation">
              <option value="">Select Base Spirit</option>
              {BASE_SPIRITS.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
        </div>
      )}

      {/* Market */}
      <div>
        <label className="block text-xs font-semibold text-gray-700 mb-2">Market</label>
        <select name="market" value={campaignData.market} onChange={handleInputChange}
          className="w-full px-3 py-3 text-sm border border-gray-200 rounded-lg bg-white text-gray-900 focus:outline-none focus:border-gold touch-manipulation">
          <option value="">Select Market</option>
          {MARKETS.map(m => <option key={m.code} value={m.code}>{m.code}</option>)}
        </select>
      </div>

      {/* Objective */}
      <div>
        <label className="block text-xs font-semibold text-gray-700 mb-3">Primary Objective</label>
        <div className="grid grid-cols-1 gap-2">
          {OBJECTIVES.map(obj => (
            <div key={obj.id} onClick={() => setCampaignData(prev => ({ ...prev, objective: obj.id }))}
              className={`p-3 rounded-lg border-2 cursor-pointer transition touch-manipulation flex items-center gap-3 ${
                campaignData.objective === obj.id ? 'border-gold bg-gold/5' : 'border-gray-200 bg-white'
              }`}>
              <div className="flex-1">
                <p className="font-semibold text-sm text-gray-900">{obj.label}</p>
                <p className="text-xs text-gray-600">{obj.desc}</p>
              </div>
              {campaignData.objective === obj.id && <CheckCircle className="w-4 h-4 text-gold flex-shrink-0" />}
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  const renderMobileStep2 = () => {
    const budget = parseFloat(campaignData.budget) || 0
    const channelLabels = { digital: 'Digital/Social', onTrade: 'On-Trade', offTrade: 'Off-Trade', travelRetail: 'Travel Retail' }
    const channelColors = { digital: '#1A1F36', onTrade: '#C9A96E', offTrade: '#8B6F47', travelRetail: '#D4AF96' }

    return (
      <div className="space-y-5">
        <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-100">
          <div className="flex items-start gap-3">
            <DollarSign className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="font-display font-bold text-sm text-green-900 mb-1">Step 2: Budget & Timing</h3>
              <p className="text-xs text-green-700">Set your total budget and date range. We{'’'}ll show the recommended channel split.</p>
            </div>
          </div>
        </Card>

        {/* Budget Input */}
        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-2">Total Budget ({getCurrency()})</label>
          <input type="number" name="budget" value={campaignData.budget} onChange={handleInputChange}
            placeholder="e.g., 50000" className="w-full px-3 py-3 text-sm border border-gray-200 rounded-lg bg-white text-gray-900 focus:outline-none focus:border-gold touch-manipulation" />
        </div>

        {/* Date Range */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-2">Start</label>
            <select name="startMonth" value={campaignData.startMonth} onChange={handleInputChange}
              className="w-full px-3 py-3 text-sm border border-gray-200 rounded-lg bg-white text-gray-900 focus:outline-none focus:border-gold touch-manipulation">
              {MONTHS.map(m => <option key={m} value={m}>{m}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-2">End</label>
            <select name="endMonth" value={campaignData.endMonth} onChange={handleInputChange}
              className="w-full px-3 py-3 text-sm border border-gray-200 rounded-lg bg-white text-gray-900 focus:outline-none focus:border-gold touch-manipulation">
              {MONTHS.map(m => <option key={m} value={m}>{m}</option>)}
            </select>
          </div>
        </div>

        {/* Recommended Allocation — read-only progress bars */}
        <Card>
          <h4 className="font-semibold text-xs text-navy mb-1">Recommended Channel Split</h4>
          <p className="text-xs text-gray-500 mb-4">Based on your template selection. Adjust on desktop for fine-tuning.</p>
          <div className="space-y-3">
            {['digital', 'onTrade', 'offTrade', 'travelRetail'].map(ch => {
              const pct = campaignData[ch]
              const spend = Math.round(budget * (pct / 100))
              return (
                <div key={ch}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-semibold text-gray-800">{channelLabels[ch]}</span>
                    <div className="flex items-center gap-2">
                      {budget > 0 && <span className="text-xs text-gray-500">{getCurrency()}{spend.toLocaleString()}</span>}
                      <span className="text-xs font-bold text-navy w-10 text-right">{pct.toFixed(0)}%</span>
                    </div>
                  </div>
                  <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full rounded-full transition-all duration-300" style={{ width: `${pct}%`, backgroundColor: channelColors[ch] }} />
                  </div>
                </div>
              )
            })}
          </div>
        </Card>

        {/* Digital Sub-Split — read-only */}
        {campaignData.digital > 0 && (
          <Card>
            <h4 className="font-semibold text-xs text-navy mb-3">Digital Platform Split</h4>
            <div className="grid grid-cols-2 gap-2">
              {[
                { key: 'metaInstagram', label: 'Meta/Instagram' },
                { key: 'tiktok', label: 'TikTok' },
                { key: 'youtube', label: 'YouTube' },
                { key: 'influencer', label: 'Influencer' },
              ].map(({ key, label }) => (
                <div key={key} className="bg-blue-50 rounded-lg p-3 text-center">
                  <p className="text-sm font-bold text-blue-900">{campaignData[key].toFixed(0)}%</p>
                  <p className="text-xs text-blue-700 mt-0.5">{label}</p>
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* Advanced Options — collapsed DrillDown for users who want to tweak on mobile */}
        <DrillDown title="Advanced: Adjust Sliders" summary="Fine-tune allocation manually">
          <div className="space-y-4">
            {['digital', 'onTrade', 'offTrade', 'travelRetail'].map(channel => {
              const value = campaignData[channel]
              return (
                <div key={channel} className="space-y-1">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-semibold text-gray-900">{channelLabels[channel]}</label>
                    <span className="text-xs font-bold text-gray-900">{value.toFixed(0)}%</span>
                  </div>
                  <div className="py-2">
                    <input type="range" min="0" max="100" step="1" value={value}
                      onChange={(e) => handleSliderChange(channel, parseFloat(e.target.value))}
                      className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-gold touch-action-none" />
                  </div>
                </div>
              )
            })}
          </div>
        </DrillDown>
      </div>
    )
  }

  const renderMobileStep3 = () => {
    const budget = parseFloat(campaignData.budget) || 0
    const objective = OBJECTIVES.find(o => o.id === campaignData.objective)
    const competitors = getCompetitors()
    const deliverables = getContentDeliverables()
    const roiData = getROIData()
    const isAwareness = campaignData.objective === 'awareness'

    return (
      <div className="space-y-5">
        <Card className="bg-gradient-to-r from-indigo-50 to-blue-50 border-indigo-100">
          <div className="flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-indigo-600 mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="font-display font-bold text-sm text-indigo-900 mb-1">Step 3: Review & Export</h3>
              <p className="text-xs text-indigo-700">Review your campaign plan and export the brief.</p>
            </div>
          </div>
        </Card>

        {/* Campaign Summary */}
        <Card>
          <h4 className="font-semibold text-sm text-navy mb-3">Campaign Summary</h4>
          <div className="space-y-2.5 text-xs">
            <div className="flex justify-between py-1.5 border-b border-gray-100">
              <span className="text-gray-600">Brand</span>
              <span className="font-semibold text-gray-900 text-right">{getBrandDisplay() || '—'}</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-gray-100">
              <span className="text-gray-600">Objective</span>
              <span className="font-semibold text-gray-900">{objective?.label || '—'}</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-gray-100">
              <span className="text-gray-600">Market</span>
              <span className="font-semibold text-gray-900">{campaignData.market || '—'}</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-gray-100">
              <span className="text-gray-600">Timeline</span>
              <span className="font-semibold text-gray-900">{campaignData.startMonth} – {campaignData.endMonth}</span>
            </div>
            <div className="flex justify-between py-1.5">
              <span className="text-gray-600">Total Budget</span>
              <span className="font-bold text-navy text-sm">{getCurrency()}{Number(campaignData.budget || 0).toLocaleString()}</span>
            </div>
          </div>
        </Card>

        {/* Channel Allocation Summary */}
        <Card>
          <h4 className="font-semibold text-xs text-navy mb-3">Channel Allocation</h4>
          <div className="grid grid-cols-2 gap-2">
            {[
              { label: 'Digital', pct: campaignData.digital },
              { label: 'On-Trade', pct: campaignData.onTrade },
              { label: 'Off-Trade', pct: campaignData.offTrade },
              { label: 'Travel Retail', pct: campaignData.travelRetail },
            ].map(ch => (
              <div key={ch.label} className="bg-gray-50 rounded-lg p-3 text-center">
                <p className="font-bold text-navy text-sm">{ch.pct.toFixed(0)}%</p>
                <p className="text-gray-600 text-xs mt-0.5">{ch.label}</p>
                {budget > 0 && <p className="text-gray-500 text-xs">{getCurrency()}{Math.round(budget * (ch.pct / 100)).toLocaleString()}</p>}
              </div>
            ))}
          </div>
        </Card>

        {/* Forecasted ROI */}
        <Card>
          <h4 className="font-semibold text-xs text-navy mb-3">Forecasted Performance (Base Case)</h4>
          <div className="grid grid-cols-2 gap-2">
            {isAwareness ? (<>
              <div className="bg-blue-50 rounded-lg p-3 text-center">
                <p className="font-bold text-blue-900 text-sm">{(roiData[1].impressions / 1000000).toFixed(1)}M</p>
                <p className="text-blue-700 text-xs">Impressions</p>
              </div>
              <div className="bg-blue-50 rounded-lg p-3 text-center">
                <p className="font-bold text-blue-900 text-sm">{roiData[1].awarenessLift}</p>
                <p className="text-blue-700 text-xs">Awareness Lift</p>
              </div>
            </>) : (<>
              <div className="bg-green-50 rounded-lg p-3 text-center">
                <p className="font-bold text-green-900 text-sm">{roiData[1].volume.toFixed(0)}</p>
                <p className="text-green-700 text-xs">Cases</p>
              </div>
              <div className="bg-green-50 rounded-lg p-3 text-center">
                <p className="font-bold text-green-900 text-sm">{roiData[1].roas.toFixed(2)}x</p>
                <p className="text-green-700 text-xs">ROAS</p>
              </div>
            </>)}
          </div>
        </Card>

        {/* Competitors */}
        {competitors.length > 0 && (
          <DrillDown title="Key Competitors" summary={`${competitors.length} identified`}>
            <div className="space-y-2">
              {competitors.map((c, idx) => (
                <div key={idx} className={`border rounded-lg p-3 ${
                  c.threat === 'high' ? 'border-red-200 bg-red-50' : c.threat === 'medium' ? 'border-amber-200 bg-amber-50' : 'border-green-200 bg-green-50'
                }`}>
                  <div className="flex items-center justify-between mb-1">
                    <p className="font-semibold text-xs text-gray-900">{c.name}</p>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${
                      c.threat === 'high' ? 'bg-red-200 text-red-800' : c.threat === 'medium' ? 'bg-amber-200 text-amber-800' : 'bg-green-200 text-green-800'
                    }`}>{c.threat}</span>
                  </div>
                  <p className="text-xs text-gray-700">{c.position}</p>
                </div>
              ))}
            </div>
          </DrillDown>
        )}

        {/* Content Deliverables */}
        {deliverables.length > 0 && (
          <DrillDown title="Content Deliverables" summary={`${deliverables.length} items`}>
            <div className="space-y-2">
              {deliverables.map((d, idx) => (
                <div key={idx} className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                  <p className="font-semibold text-xs text-gray-900">{d.type}</p>
                  <p className="text-xs text-gray-600 mt-0.5">{d.quantity} · {d.timeline}</p>
                </div>
              ))}
            </div>
          </DrillDown>
        )}

        {/* Export Button */}
        <button onClick={handleExport}
          className="w-full flex items-center justify-center gap-2 bg-navy hover:bg-navy/90 text-white font-semibold text-sm py-4 rounded-lg transition touch-manipulation">
          <Download className="w-5 h-5" />
          Export Campaign Brief
        </button>
      </div>
    )
  }

  // ─── MAIN RENDER ──────────────────────────────────────────────────────────
  const steps = [
    { label: 'Overview', render: renderOverview },
    { label: 'Campaign DNA', render: renderStep1 },
    { label: 'Occasion Map', render: renderStep2 },
    { label: 'Budget Sandbox', render: renderStep3 },
    { label: 'Supply & Content', render: renderStep4 },
    { label: 'ROI & Handoff', render: renderStep5 },
  ]

  // ─── MOBILE RENDER ────────────────────────────────────────────────────────
  const mobileSteps = [
    { label: 'Overview', render: renderMobileOverview },
    { label: 'Brief', render: renderMobileStep1 },
    { label: 'Budget & Timing', render: renderMobileStep2 },
    { label: 'Review & Export', render: renderMobileStep3 },
  ]

  if (isMobile) {
    return (
      <div className="space-y-6 max-w-7xl mx-auto">
        <PageHeader
          title="Campaign Planner"
          subtitle="3-step mobile flow · Data as of April 2026"
          breadcrumbs={[
            { label: 'Command Centre', to: '/' },
            { label: 'Campaign Planner' }
          ]}
        />
        <SubPageNav group="planning" />

        {/* Mobile Step Indicator */}
        {mobileStep > 0 && (
          <Card>
            <div className="flex items-center justify-between mb-2">
              {[1, 2, 3].map((step, idx) => (
                <React.Fragment key={step}>
                  <button onClick={() => setMobileStep(step)}
                    className={`flex items-center justify-center w-11 h-11 rounded-full font-semibold text-xs transition touch-manipulation ${
                      step === mobileStep ? 'bg-gold text-navy'
                      : step < mobileStep ? 'bg-emerald-500 text-white'
                      : 'bg-gray-200 text-gray-500'
                    }`}>
                    {step < mobileStep ? <CheckCircle className="w-5 h-5" /> : step}
                  </button>
                  {idx < 2 && <div className={`flex-1 h-1 mx-3 rounded ${step < mobileStep ? 'bg-emerald-500' : 'bg-gray-200'}`} />}
                </React.Fragment>
              ))}
            </div>
            <div className="flex items-center justify-between text-xs text-gray-500 px-2">
              <span>Brief</span>
              <span>Budget</span>
              <span>Review</span>
            </div>
          </Card>
        )}

        {/* Mobile Content */}
        <div className="min-h-[400px]">
          {mobileSteps[mobileStep].render()}
        </div>

        {/* Mobile Navigation */}
        {mobileStep > 0 && (
          <div className="flex items-center justify-between gap-4">
            <button onClick={() => setMobileStep(Math.max(0, mobileStep - 1))}
              className="flex items-center gap-2 px-4 py-3 min-h-[44px] bg-gray-100 text-gray-700 font-semibold text-sm rounded-lg hover:bg-gray-200 transition touch-manipulation">
              <ChevronLeft className="w-4 h-4" /> {mobileStep === 1 ? 'Overview' : 'Back'}
            </button>
            <div className="text-xs text-gray-500">Step {mobileStep} of 3</div>
            {mobileStep < 3 ? (() => {
              const mobileCanAdvance = mobileStep === 1 ? canAdvance(1) : mobileStep === 2 ? (parseFloat(campaignData.budget) > 0) : true
              return (
                <div className="text-right">
                  <button onClick={() => mobileCanAdvance && setMobileStep(mobileStep + 1)} disabled={!mobileCanAdvance}
                    className={`flex items-center gap-2 px-4 py-3 min-h-[44px] bg-navy text-white font-semibold text-sm rounded-lg transition touch-manipulation ${
                      !mobileCanAdvance ? 'opacity-50 cursor-not-allowed' : 'hover:bg-navy/90'
                    }`}>
                    Next <ChevronRight className="w-4 h-4" />
                  </button>
                  {!mobileCanAdvance && (
                    <p className="text-xs text-red-500 mt-1">Complete required fields to continue</p>
                  )}
                </div>
              )
            })() : (
              <button onClick={handleExport}
                className="flex items-center gap-2 px-4 py-3 min-h-[44px] bg-navy hover:bg-navy/90 text-white font-semibold text-sm rounded-lg transition touch-manipulation">
                <Download className="w-4 h-4" /> Export
              </button>
            )}
          </div>
        )}

        {/* Template BottomSheet */}
        <BottomSheet
          open={!!templateSheet}
          onClose={() => setTemplateSheet(null)}
          title={templateSheet?.label || ''}
        >
          {templateSheet && (() => {
            const Icon = templateSheet.icon
            return (
              <div className="space-y-5">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-xl bg-gray-50">
                    <Icon size={24} className="text-navy" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-base text-navy">{templateSheet.label}</h3>
                    <p className="text-xs text-gray-600 mt-0.5">{templateSheet.desc}</p>
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-semibold text-gray-700 mb-3">Recommended Channel Split</h4>
                  <div className="space-y-2.5">
                    {[
                      { label: 'Digital/Social', key: 'digital', color: '#1A1F36' },
                      { label: 'On-Trade', key: 'onTrade', color: '#C9A96E' },
                      { label: 'Off-Trade', key: 'offTrade', color: '#8B6F47' },
                      { label: 'Travel Retail', key: 'travelRetail', color: '#D4AF96' },
                    ].map(ch => {
                      const pct = templateSheet.preset[ch.key] || 0
                      return (
                        <div key={ch.key}>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs text-gray-800">{ch.label}</span>
                            <span className="text-xs font-bold text-navy">{pct}%</span>
                          </div>
                          <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                            <div className="h-full rounded-full" style={{ width: `${pct}%`, backgroundColor: ch.color }} />
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>

                <div className="bg-blue-50 rounded-lg p-3">
                  <p className="text-xs text-blue-800">
                    <span className="font-semibold">Objective: </span>
                    {OBJECTIVES.find(o => o.id === templateSheet.preset.objective)?.label || templateSheet.preset.objective}
                  </p>
                </div>

                <button
                  onClick={() => {
                    setCampaignData(prev => ({ ...prev, ...templateSheet.preset }))
                    setTemplateSheet(null)
                    setMobileStep(1)
                  }}
                  className="w-full flex items-center justify-center gap-2 bg-gold text-navy font-semibold text-sm py-4 rounded-lg transition touch-manipulation"
                >
                  Use This Template <ChevronRight size={16} />
                </button>
              </div>
            )
          })()}
        </BottomSheet>

        {/* Footer */}
        <div className="text-center py-4 text-xs text-gray-500">
          Campaign Planner • Liquid Economy Platform • Palmer Liquid Studios
        </div>
      </div>
    )
  }

  // ─── DESKTOP RENDER ──────────────────────────────────────────────────────
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <PageHeader
        title="Campaign Planner"
        subtitle="5-step wizard to turn market intelligence into actionable campaign plans · Data as of April 2026"
        breadcrumbs={[
          { label: 'Command Centre', to: '/' },
          { label: 'Campaign Planner' }
        ]}
      />
      <SubPageNav group="planning" />

      {/* Step Indicator (only show when in wizard) */}
      {currentStep > 0 && (
        <Card>
          <div className="flex items-center justify-between mb-2">
            {[1, 2, 3, 4, 5].map((step, idx) => (
              <React.Fragment key={step}>
                <button onClick={() => setCurrentStep(step)}
                  className={`flex items-center justify-center w-11 h-11 rounded-full font-semibold text-xs transition touch-manipulation ${
                    step === currentStep ? 'bg-gold text-navy'
                    : step < currentStep ? 'bg-emerald-500 text-white'
                    : 'bg-gray-200 text-gray-500'
                  }`}>
                  {step < currentStep ? <CheckCircle className="w-5 h-5" /> : step}
                </button>
                {idx < 4 && <div className={`flex-1 h-1 mx-2 rounded ${step < currentStep ? 'bg-emerald-500' : 'bg-gray-200'}`} />}
              </React.Fragment>
            ))}
          </div>
          <div className="flex items-center justify-between text-xs text-gray-500 px-1">
            <span>Campaign DNA</span>
            <span>Occasion Map</span>
            <span>Budget Sandbox</span>
            <span>Supply & Content</span>
            <span>ROI & Handoff</span>
          </div>
        </Card>
      )}

      {/* Content */}
      <div className="min-h-[400px]">
        <ErrorBoundary message="Campaign planner step failed to load.">
          {steps[currentStep].render()}
        </ErrorBoundary>
      </div>

      {/* Navigation (only show when in wizard) */}
      {currentStep > 0 && (
        <div className="flex items-center justify-between gap-4">
          <button onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
            className="flex items-center gap-2 px-4 py-3 min-h-[44px] bg-gray-100 text-gray-700 font-semibold text-sm rounded-lg hover:bg-gray-200 transition touch-manipulation">
            <ChevronLeft className="w-4 h-4" /> {currentStep === 1 ? 'Overview' : 'Back'}
          </button>
          <div className="text-xs text-gray-500">Step {currentStep} of 5</div>
          <div className="text-right">
            <button onClick={() => setCurrentStep(Math.min(5, currentStep + 1))} disabled={currentStep === 5 || !canAdvance(currentStep)}
              className={`flex items-center gap-2 px-4 py-3 min-h-[44px] bg-navy text-white font-semibold text-sm rounded-lg transition touch-manipulation ${
                currentStep === 5 || !canAdvance(currentStep) ? 'opacity-50 cursor-not-allowed' : 'hover:bg-navy/90'
              }`}>
              Next <ChevronRight className="w-4 h-4" />
            </button>
            {!canAdvance(currentStep) && currentStep < 5 && (
              <p className="text-xs text-red-500 mt-1">Complete required fields to continue</p>
            )}
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="text-center py-4 text-xs text-gray-500">
        Campaign Planner • Liquid Economy Platform • Palmer Liquid Studios
      </div>
    </div>
  )
}

export default CampaignPlanner
