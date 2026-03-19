import React, { useState, useMemo, useCallback } from 'react'
import { Link } from 'react-router-dom'
import {
  Target, Globe, DollarSign, TrendingUp, TrendingDown, BarChart3, Zap,
  MapPin, Users, Package, Truck, Building2, ShieldAlert, Lightbulb,
  ChevronDown, ChevronUp, ChevronRight, ArrowRight, Check, X, AlertTriangle,
  Percent, Clock, Star, Award, Briefcase, PieChart, Filter, Layers,
  Wine, Beer, Coffee, Sparkles, FileText, ExternalLink, Info, Settings,
  Map, Navigation, Megaphone, Share2, Eye, Heart, MessageCircle, Hash
} from 'lucide-react'
import {
  BarChart, Bar, LineChart, Line, PieChart as RechartsPie, Pie, Cell,
  ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid, RadarChart,
  Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, AreaChart, Area
} from 'recharts'

// ── Design Tokens ──
const GOLD = '#C9A96E'
const NAVY = '#1A1F36'

// ════════════════════════════════════════════════════════════════
// SECTION 1: BRAND-TO-MARKET SCENARIO DATA
// ════════════════════════════════════════════════════════════════

const PRODUCT_CATEGORIES = [
  { id: 'rtd', label: 'RTD / Canned Cocktails', icon: '\u{1F964}' },
  { id: 'tequila', label: 'Tequila / Mezcal', icon: '\u{1F52E}' },
  { id: 'gin', label: 'Gin', icon: '\u{1F33F}' },
  { id: 'vodka', label: 'Vodka', icon: '\u{2744}\uFE0F' },
  { id: 'whisky', label: 'Whisky', icon: '\u{1F943}' },
  { id: 'rum', label: 'Rum', icon: '\u{1F3DD}\uFE0F' },
  { id: 'wine', label: 'Wine / Sparkling', icon: '\u{1F377}' },
  { id: 'beer', label: 'Beer / Craft', icon: '\u{1F37A}' },
  { id: 'nolo', label: 'No/Low Alcohol', icon: '\u{1F331}' },
  { id: 'cognac', label: 'Cognac / Brandy', icon: '\u{1F947}' },
  { id: 'champagne', label: 'Champagne', icon: '\u{1F37E}' },
]

const TARGET_MARKETS = [
  { id: 'uk', label: 'United Kingdom', flag: '\u{1F1EC}\u{1F1E7}', pop: '67M', spiritsMarket: '\u00a313.2B', channels: { onTrade: 38, offTrade: 45, eComm: 12, travelRetail: 5 } },
  { id: 'eu', label: 'Europe (EU27)', flag: '\u{1F1EA}\u{1F1FA}', pop: '447M', spiritsMarket: '\u20ac98B', channels: { onTrade: 42, offTrade: 40, eComm: 10, travelRetail: 8 } },
  { id: 'us', label: 'United States', flag: '\u{1F1FA}\u{1F1F8}', pop: '335M', spiritsMarket: '$98B', channels: { onTrade: 30, offTrade: 52, eComm: 14, travelRetail: 4 } },
  { id: 'uae', label: 'UAE / Middle East', flag: '\u{1F1E6}\u{1F1EA}', pop: '10M', spiritsMarket: '$2.8B', channels: { onTrade: 55, offTrade: 15, eComm: 8, travelRetail: 22 } },
  { id: 'asia', label: 'Asia-Pacific', flag: '\u{1F30F}', pop: '4.3B', spiritsMarket: '$210B', channels: { onTrade: 48, offTrade: 35, eComm: 12, travelRetail: 5 } },
]

const MANUFACTURING_ORIGINS = [
  { id: 'uk', label: 'UK-manufactured', duties: { uk: 0, eu: 0, us: 'TBC (tariff dependent)', uae: '50% import duty', asia: '15-150% varies' }, leadTime: '2-4 weeks', minOrder: '500 cases', avgCost: '\u00a34.20/unit' },
  { id: 'mexico', label: 'Mexico (tequila/mezcal)', duties: { uk: '0% (FTA)', eu: '0% (FTA)', us: '0% (USMCA)', uae: '50%', asia: '15-40%' }, leadTime: '8-12 weeks', minOrder: '1,000 cases', avgCost: '$3.80/unit' },
  { id: 'us', label: 'US-manufactured', duties: { uk: '2.5%', eu: '2.5%', us: 0, uae: '50%', asia: '20-60%' }, leadTime: '6-10 weeks', minOrder: '800 cases', avgCost: '$4.50/unit' },
  { id: 'eu', label: 'EU-manufactured', duties: { uk: '0% (TCA)', eu: 0, us: '25% (current)', uae: '50%', asia: '15-40%' }, leadTime: '3-6 weeks', minOrder: '600 cases', avgCost: '\u20ac3.90/unit' },
  { id: 'caribbean', label: 'Caribbean (rum)', duties: { uk: '0% (GSP)', eu: '0% (EPA)', us: '0% (CBI)', uae: '50%', asia: '20-40%' }, leadTime: '10-14 weeks', minOrder: '1,200 cases', avgCost: '$3.20/unit' },
]

const BRAND_ARCHETYPES = [
  { id: 'celebrity', label: 'Celebrity-Led', examples: 'Teremana, Aviation, Casamigos', premiumMultiple: '1.8x', marketingWeight: 'Heavy influencer/PR', riskLevel: 'Medium-High', successRate: '18%' },
  { id: 'craft', label: 'Craft / Artisan', examples: 'Sipsmith, Monkey 47, Four Pillars', premiumMultiple: '1.4x', marketingWeight: 'Story & provenance', riskLevel: 'Medium', successRate: '22%' },
  { id: 'heritage', label: 'Heritage / Legacy', examples: 'Tanqueray, Bacardi, Hennessy', premiumMultiple: '1.2x', marketingWeight: 'Brand equity', riskLevel: 'Low-Medium', successRate: '35%' },
  { id: 'disruptor', label: 'Category Disruptor', examples: 'White Claw, Athletic Brewing, Seedlip', premiumMultiple: '2.2x', marketingWeight: 'Category creation', riskLevel: 'High', successRate: '12%' },
  { id: 'wellness', label: 'Wellness / Functional', examples: 'Kin Euphorics, Three Spirit, TRIP', premiumMultiple: '2.0x', marketingWeight: 'Education & sampling', riskLevel: 'High', successRate: '15%' },
]

// Cost breakdown template per unit (250ml RTD can as base)
const COST_BREAKDOWN = {
  rtd: { liquid: 0.38, packaging: 0.52, labeling: 0.08, filling: 0.22, duty: 0.28, logistics: 0.35, margin_distributor: 0.80, margin_retailer: 1.20, marketing_per_unit: 0.45, total_cogs: 1.48, rrp_low: 2.99, rrp_mid: 3.49, rrp_high: 4.99 },
  gin: { liquid: 1.80, packaging: 1.40, labeling: 0.12, filling: 0.35, duty: 7.74, logistics: 0.60, margin_distributor: 3.50, margin_retailer: 6.00, marketing_per_unit: 1.20, total_cogs: 4.27, rrp_low: 25.00, rrp_mid: 32.00, rrp_high: 45.00 },
  tequila: { liquid: 3.20, packaging: 1.60, labeling: 0.15, filling: 0.40, duty: 7.74, logistics: 1.20, margin_distributor: 4.00, margin_retailer: 7.00, marketing_per_unit: 1.50, total_cogs: 6.55, rrp_low: 30.00, rrp_mid: 38.00, rrp_high: 55.00 },
  vodka: { liquid: 0.60, packaging: 1.20, labeling: 0.10, filling: 0.30, duty: 7.74, logistics: 0.55, margin_distributor: 3.00, margin_retailer: 5.00, marketing_per_unit: 1.00, total_cogs: 2.75, rrp_low: 18.00, rrp_mid: 24.00, rrp_high: 35.00 },
  whisky: { liquid: 4.50, packaging: 1.80, labeling: 0.15, filling: 0.40, duty: 7.74, logistics: 0.65, margin_distributor: 5.00, margin_retailer: 8.00, marketing_per_unit: 1.80, total_cogs: 7.50, rrp_low: 35.00, rrp_mid: 45.00, rrp_high: 65.00 },
  rum: { liquid: 1.50, packaging: 1.30, labeling: 0.12, filling: 0.35, duty: 7.74, logistics: 0.80, margin_distributor: 3.50, margin_retailer: 5.50, marketing_per_unit: 1.10, total_cogs: 4.07, rrp_low: 22.00, rrp_mid: 30.00, rrp_high: 42.00 },
  wine: { liquid: 1.20, packaging: 0.90, labeling: 0.10, filling: 0.25, duty: 2.67, logistics: 0.50, margin_distributor: 2.50, margin_retailer: 4.00, marketing_per_unit: 0.80, total_cogs: 2.95, rrp_low: 8.00, rrp_mid: 12.00, rrp_high: 18.00 },
  beer: { liquid: 0.25, packaging: 0.35, labeling: 0.05, filling: 0.15, duty: 0.18, logistics: 0.30, margin_distributor: 0.50, margin_retailer: 0.80, marketing_per_unit: 0.20, total_cogs: 0.98, rrp_low: 1.80, rrp_mid: 2.50, rrp_high: 4.00 },
  nolo: { liquid: 0.80, packaging: 0.60, labeling: 0.10, filling: 0.20, duty: 0.00, logistics: 0.35, margin_distributor: 1.50, margin_retailer: 2.50, marketing_per_unit: 0.60, total_cogs: 1.70, rrp_low: 5.00, rrp_mid: 8.00, rrp_high: 12.00 },
  cognac: { liquid: 8.00, packaging: 2.50, labeling: 0.20, filling: 0.45, duty: 7.74, logistics: 0.70, margin_distributor: 6.00, margin_retailer: 10.00, marketing_per_unit: 2.00, total_cogs: 11.85, rrp_low: 40.00, rrp_mid: 55.00, rrp_high: 85.00 },
  champagne: { liquid: 5.00, packaging: 2.00, labeling: 0.18, filling: 0.40, duty: 2.67, logistics: 0.65, margin_distributor: 5.00, margin_retailer: 8.50, marketing_per_unit: 1.60, total_cogs: 8.23, rrp_low: 28.00, rrp_mid: 38.00, rrp_high: 60.00 },
}

const GO_TO_MARKET_PITFALLS = [
  { category: 'Regulatory', items: [
    { risk: 'Duty miscalculation on import', impact: 'High', detail: 'UK spirits duty is \u00a328.74/litre of pure alcohol. Miscalculating ABV or volume can destroy margins. RTDs at 5% ABV pay far less than 40% spirits.' },
    { risk: 'Missing AWRS registration', impact: 'Critical', detail: 'Alcohol Wholesaler Registration Scheme (AWRS) is mandatory in UK. Trading without it is a criminal offence. Apply 45 days before launch.' },
    { risk: 'EU labeling non-compliance', impact: 'High', detail: 'From June 2026, all spirits sold in EU must display calories, ingredients, and allergens. Non-compliant stock cannot be sold.' },
    { risk: 'Health claim restrictions', impact: 'Medium', detail: 'Cannot make health claims on alcoholic beverages. "Low calorie" claims must meet specific thresholds. Functional ingredients claims heavily restricted.' },
  ]},
  { category: 'Financial', items: [
    { risk: 'Undercapitalised launch', impact: 'Critical', detail: 'Most new brands need 18-24 months of runway. \u00a3150K minimum for UK-only; \u00a3400K+ for UK+EU. 70% of failures are cash-flow related, not product quality.' },
    { risk: 'Distributor margin squeeze', impact: 'High', detail: 'Distributors take 25-35% margin. Retailers another 30-40%. Your ex-works price must leave room after COGS + duty. Many brands discover margins too late.' },
    { risk: 'Listing fees & promotional spend', impact: 'High', detail: 'Major UK grocers charge \u00a35K-25K per SKU for listing. Promotional spend (gondola ends, price promotions) can add 15-20% to costs.' },
    { risk: 'FX exposure', impact: 'Medium', detail: 'If manufacturing abroad, currency fluctuations can erode margins. GBP/USD and GBP/EUR moves of 5-10% are common annually.' },
  ]},
  { category: 'Distribution', items: [
    { risk: 'Route-to-market complexity', impact: 'High', detail: 'UK has consolidated distribution (Matthew Clark, LWC, Bibendum). Getting listed requires proven velocity or significant marketing commitment.' },
    { risk: 'On-trade vs off-trade conflict', impact: 'Medium', detail: 'Pricing for on-trade (bars) and off-trade (retail) must be managed carefully. Deep discounting in supermarkets undermines on-trade partnerships.' },
    { risk: 'Cold chain requirements', impact: 'Medium', detail: 'RTDs and beer require temperature-controlled logistics. Adds 15-25% to distribution costs. Champagne and wine also sensitive.' },
    { risk: 'Minimum order quantities', impact: 'Medium', detail: 'Contract packers require MOQs (typically 500-2000 cases). Overproduction ties up capital; underproduction means stock-outs.' },
  ]},
  { category: 'Marketing', items: [
    { risk: 'Celebrity attachment risk', impact: 'High', detail: 'Celebrity scandals can destroy brand value overnight. Insurance (if available) is expensive. 40% of celebrity spirits brands fail within 3 years.' },
    { risk: 'Social media advertising restrictions', impact: 'Medium', detail: 'ASA/CAP rules restrict alcohol advertising. Must not appeal to under-18s. Age-gating required. Instagram/TikTok enforcement inconsistent.' },
    { risk: 'Sampling & events cost overruns', impact: 'Medium', detail: 'Budget \u00a35-15 per consumer trial. Events ROI typically 60-90 days to materialise. Festival sponsorship: \u00a320K-100K+ for meaningful presence.' },
    { risk: 'Oversaturated influencer space', impact: 'Medium', detail: 'Spirits influencer engagement rates have declined 35% since 2023. Micro-influencers (5K-50K followers) now outperform macro on conversion.' },
  ]},
]

const TIMELINE_MILESTONES = [
  { month: -12, label: 'Concept & R&D', tasks: ['Product formulation', 'Brand identity & design', 'Legal entity setup', 'AWRS application'] },
  { month: -9, label: 'Production Setup', tasks: ['Contract packer selection', 'Packaging procurement', 'First production run', 'Quality testing & certification'] },
  { month: -6, label: 'Distribution & Compliance', tasks: ['Distributor negotiations', 'Retailer buyer meetings', 'EU compliance documentation', 'Import/export licensing'] },
  { month: -3, label: 'Pre-Launch Marketing', tasks: ['PR campaign activation', 'Social media build-up', 'Trade show presence', 'Sampling programme'] },
  { month: 0, label: 'LAUNCH', tasks: ['First deliveries to trade', 'Launch event(s)', 'Press coverage push', 'POS material deployment'] },
  { month: 3, label: 'Post-Launch', tasks: ['Rate-of-sale monitoring', 'Reorder management', 'Consumer feedback loop', 'Second market planning'] },
  { month: 6, label: 'Scale & Optimise', tasks: ['Expand distribution points', 'International market entry', 'Range extension planning', 'Investor/growth capital raise'] },
]


// ════════════════════════════════════════════════════════════════
// SECTION 2: CAMPAIGN PLANNING SCENARIO DATA
// ════════════════════════════════════════════════════════════════

const UK_REGIONS = [
  { id: 'london', name: 'London', pop: '9.0M', avgSpend: '\u00a348.20', cocktailIndex: 142, spritzAffinity: 'Very High', socialDensity: 'Very High',
    zones: [
      { name: 'Soho / West End', bars: 320, terraces: 85, engagement: 'Very High', demographic: '25-45 professionals, tourists', bestFor: 'Launch events, press nights' },
      { name: 'Shoreditch / Hackney', bars: 180, terraces: 45, engagement: 'High', demographic: '22-38 creatives, early adopters', bestFor: 'Influencer activations, pop-ups' },
      { name: 'South Bank / Bermondsey', bars: 95, terraces: 30, engagement: 'High', demographic: '28-50 food/drink enthusiasts', bestFor: 'Terrace sampling, food pairing events' },
      { name: 'Notting Hill / Chelsea', bars: 75, terraces: 35, engagement: 'Medium-High', demographic: '30-55 affluent residents', bestFor: 'Premium positioning, private events' },
      { name: 'Canary Wharf / City', bars: 110, terraces: 25, engagement: 'Medium', demographic: '25-50 finance professionals', bestFor: 'Corporate activations, afterwork events' },
    ]
  },
  { id: 'manchester', name: 'Manchester', pop: '2.8M', avgSpend: '\u00a335.40', cocktailIndex: 118, spritzAffinity: 'High', socialDensity: 'High',
    zones: [
      { name: 'Northern Quarter', bars: 95, terraces: 30, engagement: 'Very High', demographic: '22-40 creatives, students', bestFor: 'Trend-setting activations, music venues' },
      { name: 'Deansgate / Spinningfields', bars: 65, terraces: 20, engagement: 'High', demographic: '28-45 professionals', bestFor: 'Premium launches, corporate events' },
      { name: 'Ancoats / New Islington', bars: 35, terraces: 15, engagement: 'High', demographic: '25-38 foodies, young professionals', bestFor: 'Experiential pop-ups, food markets' },
    ]
  },
  { id: 'brighton', name: 'Brighton', pop: '0.3M', avgSpend: '\u00a338.80', cocktailIndex: 128, spritzAffinity: 'Very High', socialDensity: 'High',
    zones: [
      { name: 'North Laine / The Lanes', bars: 65, terraces: 40, engagement: 'Very High', demographic: '22-45 creative professionals', bestFor: 'Summer activations, terrace takeovers' },
      { name: 'Seafront / Hove', bars: 30, terraces: 25, engagement: 'High', demographic: '28-55 residents, tourists', bestFor: 'Seasonal campaigns, festival tie-ins' },
    ]
  },
  { id: 'edinburgh', name: 'Edinburgh', pop: '0.5M', avgSpend: '\u00a340.20', cocktailIndex: 125, spritzAffinity: 'High', socialDensity: 'High',
    zones: [
      { name: 'New Town / George St', bars: 55, terraces: 20, engagement: 'High', demographic: '28-50 professionals, tourists', bestFor: 'Premium positioning, festival season' },
      { name: 'Grassmarket / Old Town', bars: 45, terraces: 15, engagement: 'High', demographic: '22-40 students, tourists', bestFor: 'High footfall sampling, Fringe activations' },
    ]
  },
  { id: 'bristol', name: 'Bristol', pop: '0.5M', avgSpend: '\u00a336.50', cocktailIndex: 122, spritzAffinity: 'High', socialDensity: 'Medium-High',
    zones: [
      { name: 'Harbourside / Clifton', bars: 50, terraces: 25, engagement: 'High', demographic: '25-45 creative professionals', bestFor: 'Terrace activations, food/drink festivals' },
      { name: 'Stokes Croft / Gloucester Rd', bars: 35, terraces: 10, engagement: 'High', demographic: '22-35 students, creatives', bestFor: 'Grassroots activations, local influencers' },
    ]
  },
  { id: 'birmingham', name: 'Birmingham', pop: '1.1M', avgSpend: '\u00a332.80', cocktailIndex: 108, spritzAffinity: 'Medium', socialDensity: 'Medium',
    zones: [
      { name: 'Colmore Row / Brindleyplace', bars: 45, terraces: 15, engagement: 'Medium-High', demographic: '28-50 professionals', bestFor: 'Corporate events, professional networking' },
      { name: 'Digbeth / Jewellery Quarter', bars: 40, terraces: 10, engagement: 'High', demographic: '22-38 creatives, foodies', bestFor: 'Street food markets, emerging venue activations' },
    ]
  },
  { id: 'leeds', name: 'Leeds', pop: '0.8M', avgSpend: '\u00a333.20', cocktailIndex: 112, spritzAffinity: 'Medium-High', socialDensity: 'Medium',
    zones: [
      { name: 'Call Lane / Merrion', bars: 55, terraces: 12, engagement: 'High', demographic: '22-38 students, young professionals', bestFor: 'Volume activations, nightlife integration' },
    ]
  },
  { id: 'liverpool', name: 'Liverpool', pop: '0.5M', avgSpend: '\u00a331.50', cocktailIndex: 110, spritzAffinity: 'Medium', socialDensity: 'Medium-High',
    zones: [
      { name: 'Bold Street / Ropewalks', bars: 50, terraces: 15, engagement: 'High', demographic: '22-40 creatives, nightlife enthusiasts', bestFor: 'Cultural activations, festival tie-ins' },
    ]
  },
]

const VENUE_TYPES = [
  { type: 'Cocktail Bars', icon: Wine, avgCover: '\u00a345+', spritzFit: 95, reachPer: 'High', costPer: '\u00a3800-2500/activation', bestSeason: 'Year-round', notes: 'Premium positioning. Staff advocacy critical. Backbar visibility drives 3x reorders.' },
  { type: 'Rooftop / Terrace Bars', icon: Sparkles, avgCover: '\u00a350+', spritzFit: 98, reachPer: 'Very High', costPer: '\u00a31500-5000/activation', bestSeason: 'Apr-Sep', notes: 'Perfect for Spritz format. Instagram-driven. Terrace takeovers deliver 5x ROI vs indoor.' },
  { type: 'Wine Bars', icon: Wine, avgCover: '\u00a338+', spritzFit: 85, reachPer: 'Medium-High', costPer: '\u00a3600-1800/activation', bestSeason: 'Year-round', notes: 'Natural fit for Fino Spritz. Educated clientele. Staff training essential for sherry advocacy.' },
  { type: 'Gastropubs', icon: Beer, avgCover: '\u00a332+', spritzFit: 70, reachPer: 'Medium', costPer: '\u00a3400-1200/activation', bestSeason: 'Apr-Oct', notes: 'Beer garden/terrace focus. Food-pairing opportunity. Larger volume but lower price point.' },
  { type: 'Hotel Bars', icon: Building2, avgCover: '\u00a355+', spritzFit: 88, reachPer: 'Medium', costPer: '\u00a31000-3500/activation', bestSeason: 'Year-round', notes: 'Aspirational setting. Tourist + business clientele. Menu placement fees apply. Long decision cycles.' },
  { type: 'Beach / Lido Bars', icon: Globe, avgCover: '\u00a328+', spritzFit: 96, reachPer: 'High', costPer: '\u00a3500-2000/activation', bestSeason: 'May-Sep', notes: 'Seasonal but extremely high Spritz affinity. UK lidos and coastal bars trending strongly.' },
  { type: 'Festival / Events', icon: Megaphone, avgCover: '\u00a360+', spritzFit: 80, reachPer: 'Very High', costPer: '\u00a35000-50000/event', bestSeason: 'Jun-Sep', notes: 'Mass sampling opportunity. Brand immersion. Average cost per trial: \u00a38-15. Best for awareness.' },
]

const SOCIAL_MEDIA_TARGETING = {
  instagram: {
    platform: 'Instagram',
    bestFormats: ['Reels (15-30s)', 'Stories with swipe-up', 'Carousel posts', 'Collab posts'],
    avgCPM: '\u00a35.80-12.40',
    bestAudiences: ['Food & drink enthusiasts', 'Cocktail lovers', 'Summer lifestyle', 'Wine & aperitivo'],
    geoTargets: [
      { area: 'London SW/W postcodes', reach: '1.2M', cpm: '\u00a38.50', affinity: 'Very High' },
      { area: 'London E/EC postcodes', reach: '0.8M', cpm: '\u00a37.20', affinity: 'High' },
      { area: 'Manchester M1-M4', reach: '0.3M', cpm: '\u00a35.80', affinity: 'High' },
      { area: 'Brighton BN1-BN3', reach: '0.15M', cpm: '\u00a36.40', affinity: 'Very High' },
      { area: 'Edinburgh EH1-EH8', reach: '0.18M', cpm: '\u00a36.10', affinity: 'High' },
      { area: 'Bristol BS1-BS8', reach: '0.12M', cpm: '\u00a35.50', affinity: 'Medium-High' },
    ],
    peakTimes: { weekday: '6-9pm', weekend: '11am-2pm, 5-9pm' },
    hashtags: ['#SpritzSeason', '#FiNoSpritz', '#SherrySpritz', '#AperitivoHour', '#TerraceVibes', '#SummerDrinks'],
  },
  tiktok: {
    platform: 'TikTok',
    bestFormats: ['15s recipe videos', 'Bartender POV', 'ASMR pouring', 'Day-in-the-life'],
    avgCPM: '\u00a33.20-7.80',
    bestAudiences: ['Gen Z cocktail curious', 'Food trends', 'Summer vibes', 'UK nightlife'],
    geoTargets: [
      { area: 'London (all)', reach: '3.5M', cpm: '\u00a34.80', affinity: 'High' },
      { area: 'Manchester', reach: '1.1M', cpm: '\u00a33.60', affinity: 'High' },
      { area: 'Brighton', reach: '0.3M', cpm: '\u00a34.20', affinity: 'Very High' },
      { area: 'UK 18-34 nationwide', reach: '12M', cpm: '\u00a33.40', affinity: 'Medium' },
    ],
    peakTimes: { weekday: '7-10pm', weekend: '12-3pm, 7-11pm' },
    hashtags: ['#SpritzTok', '#SummerCocktails', '#DrinkTok', '#AperitivoTime', '#SherryRevival'],
  },
  meta: {
    platform: 'Facebook / Meta',
    bestFormats: ['Video ads (15-30s)', 'Carousel (venues/serves)', 'Event promotions', 'Lookalike audiences'],
    avgCPM: '\u00a34.50-9.80',
    bestAudiences: ['30-55 wine & spirits buyers', 'Food & drink groups', 'Local events attendees'],
    geoTargets: [
      { area: 'London (25-55, interests: wine/spirits)', reach: '2.1M', cpm: '\u00a36.20', affinity: 'High' },
      { area: 'UK cities (top 8)', reach: '5.5M', cpm: '\u00a34.80', affinity: 'Medium-High' },
      { area: 'UK nationwide', reach: '18M', cpm: '\u00a34.20', affinity: 'Medium' },
    ],
    peakTimes: { weekday: '12-2pm, 7-9pm', weekend: '10am-1pm, 6-9pm' },
    hashtags: ['#SherryRenaissance', '#SpanishDrinks', '#SummerAperitivo'],
  },
}

const CAMPAIGN_BUDGET_TIERS = [
  { tier: 'Seed', budget: '\u00a315K-30K', duration: '8 weeks', reach: '50K-150K', bestFor: 'Single city launch, grassroots activation',
    allocation: { digital: 35, sampling: 30, pr: 20, trade: 15 },
    activities: ['2-3 venue activations', 'Micro-influencer partnerships (5-10)', 'Targeted Instagram/TikTok geo-ads', 'Local press outreach'],
    expectedROI: '2.5-4x over 6 months',
  },
  { tier: 'Growth', budget: '\u00a350K-120K', duration: '12 weeks', reach: '300K-800K', bestFor: 'Multi-city campaign, summer season push',
    allocation: { digital: 30, sampling: 25, pr: 20, trade: 15, events: 10 },
    activities: ['8-12 venue activations across 3-4 cities', 'Mid-tier influencer partnerships (15-25)', 'Multi-platform paid social', 'Trade press & consumer PR', '1-2 festival activations'],
    expectedROI: '3.5-5x over 6 months',
  },
  { tier: 'Scale', budget: '\u00a3150K-350K', duration: '16-20 weeks', reach: '1M-3M', bestFor: 'National campaign, category-defining moment',
    allocation: { digital: 28, sampling: 20, pr: 18, trade: 14, events: 12, ooh: 8 },
    activities: ['20+ venue activations nationwide', 'Celebrity/macro-influencer partnership', 'OOH in key transport hubs', 'National PR campaign', '3-5 festival/event activations', 'Retailer promotional support'],
    expectedROI: '4-7x over 12 months',
  },
]


// ════════════════════════════════════════════════════════════════
// SECTION 3: COMPONENTS
// ════════════════════════════════════════════════════════════════

// ── Mode Selector ──
function ModeSelector({ mode, onChange }) {
  const modes = [
    { id: 'brand', label: 'Brand-to-Market', icon: Package, desc: 'Launch a new product' },
    { id: 'campaign', label: 'Campaign Planner', icon: Megaphone, desc: 'Plan a marketing campaign' },
  ]
  return (
    <div className="flex gap-3">
      {modes.map(m => (
        <button key={m.id} onClick={() => onChange(m.id)}
          className={`flex-1 flex items-center gap-3 p-4 rounded-xl border-2 transition-all ${
            mode === m.id
              ? 'border-[#C9A96E] bg-[#C9A96E]/5 shadow-sm'
              : 'border-gray-200 bg-white hover:border-gray-300'
          }`}>
          <m.icon size={20} className={mode === m.id ? 'text-[#C9A96E]' : 'text-gray-400'} />
          <div className="text-left">
            <div className={`text-sm font-semibold ${mode === m.id ? 'text-navy' : 'text-gray-600'}`}>{m.label}</div>
            <div className="text-[10px] text-gray-400">{m.desc}</div>
          </div>
        </button>
      ))}
    </div>
  )
}

// ── Pill Selector (reusable) ──
function PillSelector({ options, selected, onChange, multi = false }) {
  const handleClick = (id) => {
    if (multi) {
      onChange(selected.includes(id) ? selected.filter(s => s !== id) : [...selected, id])
    } else {
      onChange(id)
    }
  }
  return (
    <div className="flex flex-wrap gap-1.5">
      {options.map(opt => {
        const active = multi ? selected.includes(opt.id) : selected === opt.id
        return (
          <button key={opt.id} onClick={() => handleClick(opt.id)}
            className={`px-2.5 py-1.5 rounded-lg text-[11px] font-medium transition-all border ${
              active ? 'bg-[#1A1F36] text-white border-[#1A1F36]' : 'bg-white text-gray-500 border-gray-200 hover:border-[#1A1F36]/30'
            }`}>
            {opt.icon && <span className="mr-1">{opt.icon}</span>}
            {opt.label || opt.name}
          </button>
        )
      })}
    </div>
  )
}

// ── Cost Waterfall Chart ──
function CostWaterfall({ category }) {
  const costs = COST_BREAKDOWN[category] || COST_BREAKDOWN.rtd
  const items = [
    { name: 'Liquid', value: costs.liquid, fill: '#C9A96E' },
    { name: 'Packaging', value: costs.packaging, fill: '#1A1F36' },
    { name: 'Label', value: costs.labeling, fill: '#6B7280' },
    { name: 'Filling', value: costs.filling, fill: '#9CA3AF' },
    { name: 'Duty', value: costs.duty, fill: '#DC2626' },
    { name: 'Logistics', value: costs.logistics, fill: '#2563EB' },
    { name: 'Dist. Margin', value: costs.margin_distributor, fill: '#7C3AED' },
    { name: 'Retail Margin', value: costs.margin_retailer, fill: '#059669' },
    { name: 'Marketing', value: costs.marketing_per_unit, fill: '#F59E0B' },
  ]
  return (
    <div className="bg-white rounded-xl border border-gray-100 p-4">
      <h4 className="text-xs font-semibold text-navy mb-1">Unit Economics Breakdown</h4>
      <p className="text-[10px] text-gray-400 mb-3">Cost waterfall from production to shelf (per unit, GBP)</p>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={items} margin={{ top: 5, right: 5, bottom: 5, left: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis dataKey="name" tick={{ fontSize: 9 }} />
          <YAxis tick={{ fontSize: 9 }} tickFormatter={v => `\u00a3${v.toFixed(2)}`} />
          <Tooltip formatter={(v) => [`\u00a3${v.toFixed(2)}`, 'Cost']} contentStyle={{ fontSize: 11 }} />
          <Bar dataKey="value" radius={[4, 4, 0, 0]}>
            {items.map((entry, i) => <Cell key={i} fill={entry.fill} />)}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 text-center border-t border-gray-100 pt-3">
        <div><div className="text-[9px] text-gray-400">Total COGS</div><div className="text-sm font-bold text-navy">{'\u00a3'}{costs.total_cogs.toFixed(2)}</div></div>
        <div><div className="text-[9px] text-gray-400">RRP Range</div><div className="text-sm font-bold text-[#C9A96E]">{'\u00a3'}{costs.rrp_low}-{'\u00a3'}{costs.rrp_high}</div></div>
        <div><div className="text-[9px] text-gray-400">Gross Margin</div><div className="text-sm font-bold text-green-600">{((1 - costs.total_cogs / costs.rrp_mid) * 100).toFixed(0)}%</div></div>
      </div>
    </div>
  )
}

// ── Pitfalls & Risks Panel ──
function PitfallsPanel() {
  const [expanded, setExpanded] = useState(null)
  return (
    <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
      <div className="px-4 py-3 border-b border-gray-100">
        <h4 className="text-xs font-semibold text-navy flex items-center gap-1.5">
          <ShieldAlert size={14} className="text-red-500" />
          Pitfalls & Risk Register
        </h4>
        <p className="text-[10px] text-gray-400">Common failure points when bringing a product to market</p>
      </div>
      {GO_TO_MARKET_PITFALLS.map((cat, ci) => (
        <div key={ci}>
          <button onClick={() => setExpanded(expanded === ci ? null : ci)}
            className="w-full flex items-center justify-between px-4 py-2.5 border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold bg-red-50 text-red-600 px-2 py-0.5 rounded">{cat.category}</span>
              <span className="text-[10px] text-gray-500">{cat.items.length} risks identified</span>
            </div>
            {expanded === ci ? <ChevronUp size={14} className="text-gray-400" /> : <ChevronDown size={14} className="text-gray-400" />}
          </button>
          {expanded === ci && (
            <div className="divide-y divide-gray-50">
              {cat.items.map((item, ii) => (
                <div key={ii} className="px-4 py-2.5 bg-gray-50/30">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[11px] font-semibold text-navy">{item.risk}</span>
                    <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${
                      item.impact === 'Critical' ? 'bg-red-100 text-red-700' : item.impact === 'High' ? 'bg-orange-100 text-orange-700' : 'bg-amber-50 text-amber-600'
                    }`}>{item.impact}</span>
                  </div>
                  <p className="text-[10px] text-gray-600 leading-relaxed">{item.detail}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

// ── Launch Timeline ──
function LaunchTimeline() {
  return (
    <div className="bg-white rounded-xl border border-gray-100 p-4">
      <h4 className="text-xs font-semibold text-navy flex items-center gap-1.5 mb-3">
        <Clock size={14} className="text-[#C9A96E]" />
        Go-to-Market Timeline
      </h4>
      <div className="relative">
        <div className="absolute left-3 top-0 bottom-0 w-0.5 bg-gray-200" />
        {TIMELINE_MILESTONES.map((m, i) => (
          <div key={i} className="relative pl-8 pb-4 last:pb-0">
            <div className={`absolute left-1.5 w-3 h-3 rounded-full border-2 ${
              m.month === 0 ? 'bg-[#C9A96E] border-[#C9A96E]' : m.month < 0 ? 'bg-white border-[#1A1F36]' : 'bg-white border-gray-300'
            }`} style={{ top: '2px' }} />
            <div className="flex items-center gap-2 mb-1">
              <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                m.month === 0 ? 'bg-[#C9A96E] text-white' : 'bg-gray-100 text-gray-600'
              }`}>
                {m.month === 0 ? 'LAUNCH' : m.month > 0 ? `+${m.month}mo` : `${m.month}mo`}
              </span>
              <span className="text-[11px] font-semibold text-navy">{m.label}</span>
            </div>
            <div className="flex flex-wrap gap-1">
              {m.tasks.map((t, ti) => (
                <span key={ti} className="text-[9px] bg-gray-50 text-gray-600 px-1.5 py-0.5 rounded border border-gray-100">{t}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ── Brand Archetype Selector ──
function ArchetypeCards({ selected, onChange }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
      {BRAND_ARCHETYPES.map(a => (
        <button key={a.id} onClick={() => onChange(a.id)}
          className={`text-left p-3 rounded-xl border-2 transition-all ${
            selected === a.id ? 'border-[#C9A96E] bg-[#C9A96E]/5' : 'border-gray-100 bg-white hover:border-gray-200'
          }`}>
          <div className="text-[11px] font-semibold text-navy">{a.label}</div>
          <div className="text-[9px] text-gray-400 mt-0.5">{a.examples}</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-3 mt-2 text-[9px]">
            <div><span className="text-gray-400">Premium:</span> <span className="font-medium text-navy">{a.premiumMultiple}</span></div>
            <div><span className="text-gray-400">Risk:</span> <span className="font-medium text-navy">{a.riskLevel}</span></div>
            <div><span className="text-gray-400">Success rate:</span> <span className="font-medium text-green-600">{a.successRate}</span></div>
            <div><span className="text-gray-400">Marketing:</span> <span className="font-medium text-navy">{a.marketingWeight}</span></div>
          </div>
        </button>
      ))}
    </div>
  )
}

// ── Region Heat Map (text-based) ──
function RegionAnalysis({ regions }) {
  const [expandedRegion, setExpandedRegion] = useState(null)
  return (
    <div className="space-y-2">
      {regions.map((region, ri) => (
        <div key={ri} className="bg-white rounded-xl border border-gray-100 overflow-hidden">
          <button onClick={() => setExpandedRegion(expandedRegion === ri ? null : ri)}
            className="w-full flex items-center justify-between px-4 py-3 hover:bg-gray-50/50 transition-colors">
            <div className="flex items-center gap-3">
              <div>
                <div className="text-[11px] font-semibold text-navy">{region.name}</div>
                <div className="text-[9px] text-gray-400">Pop: {region.pop} {'\u2022'} Avg spend: {region.avgSpend}/head</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-right">
                <div className="text-[9px] text-gray-400">Cocktail Index</div>
                <div className={`text-[11px] font-bold ${region.cocktailIndex > 120 ? 'text-green-600' : region.cocktailIndex > 100 ? 'text-[#C9A96E]' : 'text-gray-500'}`}>{region.cocktailIndex}</div>
              </div>
              <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${
                region.spritzAffinity === 'Very High' ? 'bg-green-100 text-green-700' : region.spritzAffinity === 'High' ? 'bg-green-50 text-green-600' : 'bg-amber-50 text-amber-600'
              }`}>{region.spritzAffinity}</span>
              {expandedRegion === ri ? <ChevronUp size={14} className="text-gray-400" /> : <ChevronDown size={14} className="text-gray-400" />}
            </div>
          </button>
          {expandedRegion === ri && (
            <div className="border-t border-gray-100 divide-y divide-gray-50">
              {region.zones.map((zone, zi) => (
                <div key={zi} className="px-4 py-2.5">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[11px] font-medium text-navy">{zone.name}</span>
                    <div className="flex gap-2">
                      <span className="text-[9px] bg-blue-50 text-blue-600 px-1.5 py-0.5 rounded">{zone.bars} bars</span>
                      <span className="text-[9px] bg-green-50 text-green-600 px-1.5 py-0.5 rounded">{zone.terraces} terraces</span>
                      <span className={`text-[9px] px-1.5 py-0.5 rounded font-medium ${
                        zone.engagement === 'Very High' ? 'bg-green-100 text-green-700' : 'bg-amber-50 text-amber-600'
                      }`}>{zone.engagement}</span>
                    </div>
                  </div>
                  <div className="text-[9px] text-gray-500">
                    <span className="text-gray-400">Demographic:</span> {zone.demographic}
                  </div>
                  <div className="text-[9px] text-gray-500 mt-0.5">
                    <span className="text-gray-400">Best for:</span> <span className="text-[#C9A96E] font-medium">{zone.bestFor}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

// ── Venue Type Analysis ──
function VenueTypeGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
      {VENUE_TYPES.map((v, i) => (
        <div key={i} className="bg-white rounded-xl border border-gray-100 p-3">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <v.icon size={14} className="text-[#C9A96E]" />
              <span className="text-[11px] font-semibold text-navy">{v.type}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-[9px] bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded">{v.avgCover} avg cover</span>
              <span className="text-[9px] bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded">{v.bestSeason}</span>
            </div>
          </div>
          <div className="flex items-center gap-2 mb-2">
            <div className="flex-1 bg-gray-100 rounded-full h-1.5">
              <div className="h-1.5 rounded-full bg-[#C9A96E]" style={{ width: `${v.spritzFit}%` }} />
            </div>
            <span className="text-[10px] font-bold text-[#C9A96E]">{v.spritzFit}%</span>
            <span className="text-[9px] text-gray-400">fit</span>
          </div>
          <p className="text-[10px] text-gray-600 leading-relaxed">{v.notes}</p>
          <div className="mt-2 flex justify-between text-[9px]">
            <span className="text-gray-400">Cost: <span className="text-navy font-medium">{v.costPer}</span></span>
            <span className="text-gray-400">Reach: <span className="text-navy font-medium">{v.reachPer}</span></span>
          </div>
        </div>
      ))}
    </div>
  )
}

// ── Social Media Targeting Panel ──
function SocialTargetingPanel() {
  const [platform, setPlatform] = useState('instagram')
  const data = SOCIAL_MEDIA_TARGETING[platform]
  return (
    <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
      <div className="px-4 py-3 border-b border-gray-100">
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-xs font-semibold text-navy flex items-center gap-1.5">
            <Share2 size={14} className="text-[#C9A96E]" />
            Social Media Geo-Targeting
          </h4>
        </div>
        <div className="flex gap-1">
          {['instagram', 'tiktok', 'meta'].map(p => (
            <button key={p} onClick={() => setPlatform(p)}
              className={`px-2.5 py-1 rounded text-[10px] font-semibold transition-colors ${
                platform === p ? 'bg-[#1A1F36] text-white' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
              }`}>
              {p === 'meta' ? 'Facebook/Meta' : p.charAt(0).toUpperCase() + p.slice(1)}
            </button>
          ))}
        </div>
      </div>
      <div className="p-4 space-y-4">
        <div>
          <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wide mb-2">Best Formats</div>
          <div className="flex flex-wrap gap-1">
            {data.bestFormats.map((f, i) => (
              <span key={i} className="text-[9px] bg-blue-50 text-blue-600 px-2 py-0.5 rounded">{f}</span>
            ))}
          </div>
        </div>
        <div>
          <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wide mb-2">Geo-Targets by ROI Potential</div>
          <div className="space-y-1.5">
            {data.geoTargets.map((g, i) => (
              <div key={i} className="flex items-center justify-between py-1.5 border-b border-gray-50 last:border-0">
                <div className="flex items-center gap-2">
                  <MapPin size={10} className="text-[#C9A96E]" />
                  <span className="text-[11px] text-navy font-medium">{g.area}</span>
                </div>
                <div className="flex items-center gap-3 text-[9px]">
                  <span className="text-gray-400">Reach: <span className="font-medium text-navy">{g.reach}</span></span>
                  <span className="text-gray-400">CPM: <span className="font-medium text-navy">{g.cpm}</span></span>
                  <span className={`font-bold px-1.5 py-0.5 rounded ${
                    g.affinity === 'Very High' ? 'bg-green-100 text-green-700' : g.affinity === 'High' ? 'bg-green-50 text-green-600' : 'bg-amber-50 text-amber-600'
                  }`}>{g.affinity}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wide mb-1">Peak Posting Times</div>
            <div className="text-[10px] text-gray-600">
              <div>Weekday: <span className="font-medium text-navy">{data.peakTimes.weekday}</span></div>
              <div>Weekend: <span className="font-medium text-navy">{data.peakTimes.weekend}</span></div>
            </div>
          </div>
          <div>
            <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wide mb-1">Avg CPM Range</div>
            <div className="text-sm font-bold text-[#C9A96E]">{data.avgCPM}</div>
          </div>
        </div>
        <div>
          <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wide mb-1">Recommended Hashtags</div>
          <div className="flex flex-wrap gap-1">
            {data.hashtags.map((h, i) => (
              <span key={i} className="text-[10px] text-[#C9A96E] font-medium">{h}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// ── Budget Tier Cards ──
function BudgetTierCards() {
  const COLORS = ['#C9A96E', '#1A1F36', '#2563EB', '#059669', '#F59E0B']
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
      {CAMPAIGN_BUDGET_TIERS.map((tier, i) => {
        const allocEntries = Object.entries(tier.allocation)
        const pieData = allocEntries.map(([k, v]) => ({ name: k, value: v }))
        return (
          <div key={i} className="bg-white rounded-xl border border-gray-100 p-4">
            <div className="flex items-center justify-between mb-2">
              <div>
                <span className="text-[10px] font-bold bg-[#C9A96E]/10 text-[#C9A96E] px-2 py-0.5 rounded">{tier.tier}</span>
                <div className="text-lg font-bold text-navy mt-1">{tier.budget}</div>
                <div className="text-[9px] text-gray-400">{tier.duration} campaign</div>
              </div>
              <ResponsiveContainer width={70} height={70}>
                <RechartsPie>
                  <Pie data={pieData} dataKey="value" cx="50%" cy="50%" innerRadius={18} outerRadius={30} paddingAngle={2}>
                    {pieData.map((_, j) => <Cell key={j} fill={COLORS[j % COLORS.length]} />)}
                  </Pie>
                </RechartsPie>
              </ResponsiveContainer>
            </div>
            <p className="text-[10px] text-gray-500 mb-2">{tier.bestFor}</p>
            <div className="text-[9px] text-gray-400 mb-1">Reach: <span className="font-medium text-navy">{tier.reach}</span></div>
            <div className="text-[9px] text-gray-400 mb-2">Expected ROI: <span className="font-bold text-green-600">{tier.expectedROI}</span></div>
            <div className="border-t border-gray-100 pt-2">
              <div className="text-[9px] font-bold text-gray-400 uppercase mb-1">Key Activities</div>
              <ul className="space-y-0.5">
                {tier.activities.map((a, ai) => (
                  <li key={ai} className="text-[9px] text-gray-600 flex items-start gap-1">
                    <Check size={8} className="text-green-500 mt-0.5 flex-shrink-0" />
                    {a}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )
      })}
    </div>
  )
}

// ── Manufacturing Origin Comparison ──
function ManufacturingComparison({ selectedMarkets }) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
      <div className="px-4 py-3 border-b border-gray-100">
        <h4 className="text-xs font-semibold text-navy flex items-center gap-1.5">
          <Truck size={14} className="text-[#C9A96E]" />
          Manufacturing Origin Comparison
        </h4>
        <p className="text-[10px] text-gray-400">Duty rates, lead times & costs by production origin</p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-[10px]">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-3 py-2 text-left font-semibold text-gray-500">Origin</th>
              <th className="px-3 py-2 text-left font-semibold text-gray-500">Lead Time</th>
              <th className="px-3 py-2 text-left font-semibold text-gray-500">Min Order</th>
              <th className="px-3 py-2 text-left font-semibold text-gray-500">Avg Cost</th>
              {selectedMarkets.map(m => {
                const market = TARGET_MARKETS.find(tm => tm.id === m)
                return <th key={m} className="px-3 py-2 text-left font-semibold text-gray-500">{market?.label || m} Duty</th>
              })}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {MANUFACTURING_ORIGINS.map((origin, i) => (
              <tr key={i} className="hover:bg-gray-50/50">
                <td className="px-3 py-2 font-medium text-navy">{origin.label}</td>
                <td className="px-3 py-2 text-gray-600">{origin.leadTime}</td>
                <td className="px-3 py-2 text-gray-600">{origin.minOrder}</td>
                <td className="px-3 py-2 font-medium text-navy">{origin.avgCost}</td>
                {selectedMarkets.map(m => (
                  <td key={m} className="px-3 py-2">
                    <span className={`font-medium ${
                      origin.duties[m] === 0 || origin.duties[m] === '0%' ? 'text-green-600' :
                      typeof origin.duties[m] === 'string' && origin.duties[m].includes('0%') ? 'text-green-600' :
                      'text-red-600'
                    }`}>{origin.duties[m] === 0 ? '0% (duty free)' : origin.duties[m]}</span>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}


// ════════════════════════════════════════════════════════════════
// SECTION 4: MAIN PAGE COMPONENT
// ════════════════════════════════════════════════════════════════

export default function ScenarioModeling() {
  // Mode: 'brand' or 'campaign'
  const [mode, setMode] = useState('brand')

  // Brand-to-Market state
  const [selectedCategory, setSelectedCategory] = useState('rtd')
  const [selectedMarkets, setSelectedMarkets] = useState(['uk', 'eu'])
  const [selectedArchetype, setSelectedArchetype] = useState('celebrity')
  const [brandStep, setBrandStep] = useState(0)

  // Campaign Planner state
  const [campaignStep, setCampaignStep] = useState(0)

  const brandSteps = [
    { label: 'Product & Market', icon: Package },
    { label: 'Brand Archetype', icon: Star },
    { label: 'Unit Economics', icon: DollarSign },
    { label: 'Manufacturing', icon: Truck },
    { label: 'Risks & Timeline', icon: ShieldAlert },
  ]

  const campaignSteps = [
    { label: 'Region Targeting', icon: MapPin },
    { label: 'Venue Strategy', icon: Building2 },
    { label: 'Social & Digital', icon: Share2 },
    { label: 'Budget & ROI', icon: DollarSign },
  ]

  const steps = mode === 'brand' ? brandSteps : campaignSteps
  const currentStep = mode === 'brand' ? brandStep : campaignStep
  const setStep = mode === 'brand' ? setBrandStep : setCampaignStep

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-page text-navy">Scenario Modeling</h1>
          <p className="text-caption text-gray-500 mt-0.5">Go-to-market planning, campaign intelligence & financial modeling</p>
        </div>
        <Link to="/" className="text-[10px] text-[#C9A96E] hover:underline flex items-center gap-1">
          <ChevronRight size={12} className="rotate-180" /> Command Centre
        </Link>
      </div>

      {/* Mode Selector */}
      <ModeSelector mode={mode} onChange={(m) => { setMode(m); setBrandStep(0); setCampaignStep(0) }} />

      {/* Step Navigator */}
      <div className="flex items-center gap-1 bg-white rounded-xl border border-gray-100 p-2">
        {steps.map((s, i) => (
          <button key={i} onClick={() => setStep(i)}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-[10px] font-medium transition-all flex-1 justify-center ${
              currentStep === i ? 'bg-[#1A1F36] text-white shadow-sm' : 'text-gray-500 hover:bg-gray-50'
            }`}>
            <s.icon size={12} />
            <span className="hidden sm:inline">{s.label}</span>
            <span className="sm:hidden">{i + 1}</span>
          </button>
        ))}
      </div>

      {/* ── BRAND-TO-MARKET CONTENT ── */}
      {mode === 'brand' && (
        <div className="space-y-5">
          {brandStep === 0 && (
            <>
              <div className="bg-white rounded-xl border border-gray-100 p-4">
                <h3 className="text-xs font-semibold text-navy mb-1">What are you bringing to market?</h3>
                <p className="text-[10px] text-gray-400 mb-3">Select your product category</p>
                <PillSelector options={PRODUCT_CATEGORIES} selected={selectedCategory} onChange={setSelectedCategory} />
              </div>
              <div className="bg-white rounded-xl border border-gray-100 p-4">
                <h3 className="text-xs font-semibold text-navy mb-1">Target Markets</h3>
                <p className="text-[10px] text-gray-400 mb-3">Select one or more launch markets</p>
                <PillSelector options={TARGET_MARKETS.map(m => ({ ...m, label: `${m.flag} ${m.label}` }))} selected={selectedMarkets} onChange={setSelectedMarkets} multi />
              </div>
              {selectedMarkets.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {selectedMarkets.map(mId => {
                    const m = TARGET_MARKETS.find(t => t.id === mId)
                    if (!m) return null
                    const channelData = [
                      { name: 'On-Trade', value: m.channels.onTrade, fill: '#1A1F36' },
                      { name: 'Off-Trade', value: m.channels.offTrade, fill: '#C9A96E' },
                      { name: 'E-Comm', value: m.channels.eComm, fill: '#2563EB' },
                      { name: 'Travel Retail', value: m.channels.travelRetail, fill: '#059669' },
                    ]
                    return (
                      <div key={mId} className="bg-white rounded-xl border border-gray-100 p-3">
                        <div className="text-[11px] font-semibold text-navy mb-1">{m.flag} {m.label}</div>
                        <div className="text-[9px] text-gray-400 mb-2">Pop: {m.pop} {'\u2022'} Market: {m.spiritsMarket}</div>
                        <div className="flex items-center gap-3">
                          <ResponsiveContainer width={60} height={60}>
                            <RechartsPie>
                              <Pie data={channelData} dataKey="value" cx="50%" cy="50%" innerRadius={15} outerRadius={28} paddingAngle={2}>
                                {channelData.map((c, j) => <Cell key={j} fill={c.fill} />)}
                              </Pie>
                            </RechartsPie>
                          </ResponsiveContainer>
                          <div className="flex-1 space-y-1">
                            {channelData.map((c, j) => (
                              <div key={j} className="flex items-center justify-between text-[9px]">
                                <div className="flex items-center gap-1">
                                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: c.fill }} />
                                  <span className="text-gray-500">{c.name}</span>
                                </div>
                                <span className="font-medium text-navy">{c.value}%</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
              <div className="flex justify-end">
                <button onClick={() => setBrandStep(1)} className="flex items-center gap-1.5 px-4 py-2 bg-[#1A1F36] text-white rounded-lg text-xs font-medium hover:bg-[#1A1F36]/90 transition-colors">
                  Next: Brand Archetype <ArrowRight size={14} />
                </button>
              </div>
            </>
          )}

          {brandStep === 1 && (
            <>
              <div className="bg-white rounded-xl border border-gray-100 p-4">
                <h3 className="text-xs font-semibold text-navy mb-1">Brand Archetype</h3>
                <p className="text-[10px] text-gray-400 mb-3">How will your brand be positioned? This affects marketing strategy, pricing power, and success probability.</p>
                <ArchetypeCards selected={selectedArchetype} onChange={setSelectedArchetype} />
              </div>
              <div className="flex justify-between">
                <button onClick={() => setBrandStep(0)} className="flex items-center gap-1 px-4 py-2 bg-gray-100 text-gray-600 rounded-lg text-xs font-medium hover:bg-gray-200 transition-colors">
                  <ChevronRight size={14} className="rotate-180" /> Back
                </button>
                <button onClick={() => setBrandStep(2)} className="flex items-center gap-1.5 px-4 py-2 bg-[#1A1F36] text-white rounded-lg text-xs font-medium hover:bg-[#1A1F36]/90 transition-colors">
                  Next: Unit Economics <ArrowRight size={14} />
                </button>
              </div>
            </>
          )}

          {brandStep === 2 && (
            <>
              <CostWaterfall category={selectedCategory} />
              <div className="flex justify-between">
                <button onClick={() => setBrandStep(1)} className="flex items-center gap-1 px-4 py-2 bg-gray-100 text-gray-600 rounded-lg text-xs font-medium hover:bg-gray-200 transition-colors">
                  <ChevronRight size={14} className="rotate-180" /> Back
                </button>
                <button onClick={() => setBrandStep(3)} className="flex items-center gap-1.5 px-4 py-2 bg-[#1A1F36] text-white rounded-lg text-xs font-medium hover:bg-[#1A1F36]/90 transition-colors">
                  Next: Manufacturing <ArrowRight size={14} />
                </button>
              </div>
            </>
          )}

          {brandStep === 3 && (
            <>
              <ManufacturingComparison selectedMarkets={selectedMarkets} />
              <div className="flex justify-between">
                <button onClick={() => setBrandStep(2)} className="flex items-center gap-1 px-4 py-2 bg-gray-100 text-gray-600 rounded-lg text-xs font-medium hover:bg-gray-200 transition-colors">
                  <ChevronRight size={14} className="rotate-180" /> Back
                </button>
                <button onClick={() => setBrandStep(4)} className="flex items-center gap-1.5 px-4 py-2 bg-[#1A1F36] text-white rounded-lg text-xs font-medium hover:bg-[#1A1F36]/90 transition-colors">
                  Next: Risks & Timeline <ArrowRight size={14} />
                </button>
              </div>
            </>
          )}

          {brandStep === 4 && (
            <>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <PitfallsPanel />
                <LaunchTimeline />
              </div>
              <div className="flex justify-start">
                <button onClick={() => setBrandStep(3)} className="flex items-center gap-1 px-4 py-2 bg-gray-100 text-gray-600 rounded-lg text-xs font-medium hover:bg-gray-200 transition-colors">
                  <ChevronRight size={14} className="rotate-180" /> Back
                </button>
              </div>
            </>
          )}
        </div>
      )}

      {/* ── CAMPAIGN PLANNER CONTENT ── */}
      {mode === 'campaign' && (
        <div className="space-y-5">
          {campaignStep === 0 && (
            <>
              <div className="bg-gradient-to-br from-[#C9A96E]/5 to-transparent rounded-xl border border-[#C9A96E]/20 p-4 mb-4">
                <h3 className="text-sm font-semibold text-navy mb-1">Campaign Example: UK Sherry Spritz 2026</h3>
                <p className="text-[10px] text-gray-500 leading-relaxed">
                  Running a Fino Manzanilla Spritz campaign for the Sherry Council of Jerez. Targeting UK summer 2026.
                  Below: optimal regions, venues, and digital activation zones ranked by engagement potential and ROI.
                </p>
              </div>
              <div className="bg-white rounded-xl border border-gray-100 p-4">
                <h3 className="text-xs font-semibold text-navy flex items-center gap-1.5 mb-3">
                  <MapPin size={14} className="text-[#C9A96E]" />
                  UK Region Analysis {'\u2014'} Spritz Campaign Suitability
                </h3>
                <RegionAnalysis regions={UK_REGIONS} />
              </div>
              <div className="flex justify-end">
                <button onClick={() => setCampaignStep(1)} className="flex items-center gap-1.5 px-4 py-2 bg-[#1A1F36] text-white rounded-lg text-xs font-medium hover:bg-[#1A1F36]/90 transition-colors">
                  Next: Venue Strategy <ArrowRight size={14} />
                </button>
              </div>
            </>
          )}

          {campaignStep === 1 && (
            <>
              <div className="bg-white rounded-xl border border-gray-100 p-4">
                <h3 className="text-xs font-semibold text-navy flex items-center gap-1.5 mb-3">
                  <Building2 size={14} className="text-[#C9A96E]" />
                  Venue Type Strategy {'\u2014'} Spritz Suitability Scores
                </h3>
                <VenueTypeGrid />
              </div>
              <div className="flex justify-between">
                <button onClick={() => setCampaignStep(0)} className="flex items-center gap-1 px-4 py-2 bg-gray-100 text-gray-600 rounded-lg text-xs font-medium hover:bg-gray-200 transition-colors">
                  <ChevronRight size={14} className="rotate-180" /> Back
                </button>
                <button onClick={() => setCampaignStep(2)} className="flex items-center gap-1.5 px-4 py-2 bg-[#1A1F36] text-white rounded-lg text-xs font-medium hover:bg-[#1A1F36]/90 transition-colors">
                  Next: Social & Digital <ArrowRight size={14} />
                </button>
              </div>
            </>
          )}

          {campaignStep === 2 && (
            <>
              <SocialTargetingPanel />
              <div className="flex justify-between">
                <button onClick={() => setCampaignStep(1)} className="flex items-center gap-1 px-4 py-2 bg-gray-100 text-gray-600 rounded-lg text-xs font-medium hover:bg-gray-200 transition-colors">
                  <ChevronRight size={14} className="rotate-180" /> Back
                </button>
                <button onClick={() => setCampaignStep(3)} className="flex items-center gap-1.5 px-4 py-2 bg-[#1A1F36] text-white rounded-lg text-xs font-medium hover:bg-[#1A1F36]/90 transition-colors">
                  Next: Budget & ROI <ArrowRight size={14} />
                </button>
              </div>
            </>
          )}

          {campaignStep === 3 && (
            <>
              <div className="bg-white rounded-xl border border-gray-100 p-4">
                <h3 className="text-xs font-semibold text-navy flex items-center gap-1.5 mb-3">
                  <DollarSign size={14} className="text-[#C9A96E]" />
                  Campaign Budget Tiers & ROI Projections
                </h3>
                <BudgetTierCards />
              </div>
              <div className="flex justify-start">
                <button onClick={() => setCampaignStep(2)} className="flex items-center gap-1 px-4 py-2 bg-gray-100 text-gray-600 rounded-lg text-xs font-medium hover:bg-gray-200 transition-colors">
                  <ChevronRight size={14} className="rotate-180" /> Back
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  )
}
