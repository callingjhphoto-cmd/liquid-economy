import React, { useState } from 'react'
import { Package, Factory, Globe, ChevronDown, ChevronRight, ExternalLink, AlertTriangle, Target, Users, Lightbulb, DollarSign, Clock, Shield, Zap, MapPin, Star, TrendingUp, Search, Layers, Award, BookOpen, Building2 } from 'lucide-react'

// ─── FACTORY DIRECTORY BY MATERIAL ───────────────────────────────────────────
const MATERIAL_CATEGORIES = [
  {
    id: 'acrylic',
    name: 'Acrylic & Perspex',
    icon: '\u2B50',
    color: 'from-blue-500 to-cyan-500',
    description: 'LED-lit displays, countertop units, bottle glorifiers, menu holders',
    avgLeadTime: '25-35 days',
    moqRange: '200-500 units',
    priceRange: '\u00A38-45 per unit',
    keyHub: 'Dongguan & Shenzhen, Guangdong',
    factories: [
      { name: 'Dongguan Jingke Acrylic Products Co.', location: 'Dongguan, Guangdong', founded: 2008, employees: '150+', capabilities: 'CNC cutting, laser engraving, LED integration, UV printing', moq: 200, certifications: ['ISO 9001', 'SGS'], exportMarkets: 'EU, US, Middle East', notableClients: 'Diageo distributor projects, duty-free chains', website: 'alibaba.com/jingke-acrylic' },
      { name: 'Shenzhen Sunrise Acrylic Co.', location: 'Shenzhen, Guangdong', founded: 2005, employees: '300+', capabilities: 'Thermoforming, diamond polishing, silk screening, LED back-lit units', moq: 300, certifications: ['ISO 9001', 'BSCI'], exportMarkets: 'Europe, North America, SE Asia', notableClients: 'Multiple duty-free operators', website: 'sunrise-acrylic.en.made-in-china.com' },
      { name: 'Guangzhou Yageli Display', location: 'Guangzhou, Guangdong', founded: 2010, employees: '120+', capabilities: 'Bottle glorifiers, countertop displays, bespoke shapes', moq: 100, certifications: ['ISO 9001'], exportMarkets: 'Global', notableClients: 'Whisky and gin brands', website: 'yagelidisplay.com' },
      { name: 'Dongguan Dehui Acrylic', location: 'Dongguan, Guangdong', founded: 2012, employees: '80+', capabilities: 'Menu holders, price tags, counter displays, gift boxes', moq: 500, certifications: ['SGS'], exportMarkets: 'EU, Australia', notableClients: 'Hospitality chains', website: 'alibaba.com/dehui-acrylic' }
    ]
  },
  {
    id: 'metal',
    name: 'Metal & Wire',
    icon: '\u2699\uFE0F',
    color: 'from-gray-300 to-gray-400',
    description: 'Floor stands, shelf units, bottle racks, hanging signs, tin displays',
    avgLeadTime: '30-45 days',
    moqRange: '100-300 units',
    priceRange: '\u00A315-120 per unit',
    keyHub: 'Hangzhou & Ningbo, Zhejiang',
    factories: [
      { name: 'Hangzhou Jinding Metal Display Co.', location: 'Hangzhou, Zhejiang', founded: 2003, employees: '250+', capabilities: 'Powder coating, chrome plating, wire forming, sheet metal, welding', moq: 100, certifications: ['ISO 9001', 'ISO 14001'], exportMarkets: 'EU, US, Middle East', notableClients: 'Major FMCG brands', website: 'jinding-display.com' },
      { name: 'Ningbo Greatwall Metal Products', location: 'Ningbo, Zhejiang', founded: 2006, employees: '200+', capabilities: 'Floor stands, gondola ends, shelf systems, wire racks', moq: 150, certifications: ['ISO 9001', 'BSCI'], exportMarkets: 'Europe, Americas', notableClients: 'Retail chains, spirits distributors', website: 'greatwall-display.com' },
      { name: 'Foshan Shunde Metal Craft', location: 'Foshan, Guangdong', founded: 2009, employees: '180+', capabilities: 'Stainless steel displays, brass finishing, premium bottle stands', moq: 100, certifications: ['ISO 9001'], exportMarkets: 'Global luxury retail', notableClients: 'Premium whisky and cognac brands', website: 'shunde-metalcraft.com' },
      { name: 'Qingdao Xinmiao Metal Products', location: 'Qingdao, Shandong', founded: 2011, employees: '100+', capabilities: 'Iron wire displays, rotating stands, stackable units', moq: 200, certifications: ['SGS'], exportMarkets: 'EU, US', notableClients: 'Wine and beer producers', website: 'xinmiao-metal.com' }
    ]
  },
  {
    id: 'wood',
    name: 'Wood & Bamboo',
    icon: '\uD83C\uDF33',
    color: 'from-amber-600 to-yellow-700',
    description: 'Barrel displays, wooden crates, shelf talkers, menu boards, premium gift boxes',
    avgLeadTime: '35-50 days',
    moqRange: '100-500 units',
    priceRange: '\u00A312-80 per unit',
    keyHub: 'Cao County, Shandong & Yiwu, Zhejiang',
    factories: [
      { name: 'Cao County Shengrui Wood Products', location: 'Cao County, Shandong', founded: 2007, employees: '200+', capabilities: 'Barrel-style displays, crates, engraving, staining, branded packaging', moq: 200, certifications: ['FSC', 'ISO 9001'], exportMarkets: 'EU, US, Japan', notableClients: 'Whisky and wine brands', website: 'shengrui-wood.com' },
      { name: 'Yiwu Fumao Crafts Co.', location: 'Yiwu, Zhejiang', founded: 2010, employees: '100+', capabilities: 'Bamboo displays, wine racks, menu boards, laser cutting', moq: 300, certifications: ['FSC', 'SGS'], exportMarkets: 'Europe, Americas', notableClients: 'Gin and tequila startups', website: 'fumao-crafts.com' },
      { name: 'Xiamen Refined Wood Co.', location: 'Xiamen, Fujian', founded: 2005, employees: '150+', capabilities: 'Premium gift boxes, luxury presentation cases, walnut/oak finishing', moq: 100, certifications: ['FSC', 'ISO 9001', 'BSCI'], exportMarkets: 'Global luxury', notableClients: 'Cognac houses, Scotch brands', website: 'refined-wood.com' }
    ]
  },
  {
    id: 'led',
    name: 'LED & Digital',
    icon: '\uD83D\uDCA1',
    color: 'from-purple-500 to-pink-500',
    description: 'Illuminated displays, digital screens, edge-lit signs, neon-style units, interactive kiosks',
    avgLeadTime: '30-40 days',
    moqRange: '50-200 units',
    priceRange: '\u00A325-200 per unit',
    keyHub: 'Shenzhen, Guangdong',
    factories: [
      { name: 'Shenzhen Cosun Sign Engineering', location: 'Shenzhen, Guangdong', founded: 2004, employees: '500+', capabilities: 'LED channel letters, edge-lit displays, RGB programmable signs, neon flex', moq: 50, certifications: ['ISO 9001', 'CE', 'RoHS', 'UL'], exportMarkets: 'Global', notableClients: 'Major spirits groups, duty-free operators', website: 'cosun-sign.com' },
      { name: 'Shenzhen Oleda Technology', location: 'Shenzhen, Guangdong', founded: 2010, employees: '200+', capabilities: 'Digital shelf displays, LCD bottle glorifiers, interactive touchscreens', moq: 100, certifications: ['CE', 'FCC', 'RoHS'], exportMarkets: 'EU, US, Asia', notableClients: 'Vodka and whisky brands', website: 'oleda-display.com' },
      { name: 'Guangzhou Grandview LED', location: 'Guangzhou, Guangdong', founded: 2008, employees: '300+', capabilities: 'Backbar LED systems, bottle-base illumination, motion-sensor displays', moq: 100, certifications: ['ISO 9001', 'CE'], exportMarkets: 'Europe, Middle East', notableClients: 'Champagne houses, premium gin', website: 'grandview-led.com' }
    ]
  },
  {
    id: 'glass',
    name: 'Glass & Crystal',
    icon: '\uD83E\uDD42',
    color: 'from-sky-400 to-blue-500',
    description: 'Branded glassware, decanters, bottle glorifiers, display cases, awards/trophies',
    avgLeadTime: '35-50 days',
    moqRange: '500-2000 units',
    priceRange: '\u00A33-35 per unit',
    keyHub: 'Shanxi & Anhui provinces',
    factories: [
      { name: 'Shanxi Dahua Glass Co.', location: 'Qixian, Shanxi', founded: 1998, employees: '800+', capabilities: 'Branded tumblers, highballs, coupes, screen printing, gold rimming', moq: 1000, certifications: ['ISO 9001', 'FDA', 'SGS'], exportMarkets: 'Global', notableClients: 'Diageo, Pernod Ricard licensed programs', website: 'dahua-glass.com' },
      { name: 'Anhui Faqiang Glass', location: 'Bengbu, Anhui', founded: 2002, employees: '500+', capabilities: 'Crystal decanters, whisky nosing glasses, custom moulds, frosted finishes', moq: 500, certifications: ['ISO 9001', 'SGS'], exportMarkets: 'EU, US, Japan', notableClients: 'Scotch and bourbon brands', website: 'faqiang-glass.com' },
      { name: 'Xuzhou Hengming Glass Products', location: 'Xuzhou, Jiangsu', founded: 2006, employees: '300+', capabilities: 'Bottle displays, glass pedestals, etched branding, UV bonding', moq: 500, certifications: ['SGS', 'ISO 9001'], exportMarkets: 'Europe, Americas', notableClients: 'Wine and champagne producers', website: 'hengming-glass.com' }
    ]
  },
  {
    id: 'paper',
    name: 'Paper & Card',
    icon: '\uD83D\uDCC4',
    color: 'from-orange-400 to-red-500',
    description: 'Counter cards, shelf wobblers, dump bins, corrugated displays, tent cards, coasters',
    avgLeadTime: '15-25 days',
    moqRange: '500-5000 units',
    priceRange: '\u00A30.50-8 per unit',
    keyHub: 'Dongguan & Shenzhen, Guangdong',
    factories: [
      { name: 'Dongguan Bohao Packaging', location: 'Dongguan, Guangdong', founded: 2005, employees: '400+', capabilities: 'Corrugated floor displays, dump bins, FSDU, litho lamination, UV varnish', moq: 500, certifications: ['ISO 9001', 'FSC', 'BSCI'], exportMarkets: 'Global', notableClients: 'Major FMCG and spirits brands', website: 'bohao-packaging.com' },
      { name: 'Shenzhen Star Color Printing', location: 'Shenzhen, Guangdong', founded: 2008, employees: '250+', capabilities: 'Premium counter displays, tent cards, coasters, die-cutting, embossing', moq: 1000, certifications: ['FSC', 'ISO 9001', 'G7'], exportMarkets: 'EU, US, Australia', notableClients: 'Gin and vodka brands, bar groups', website: 'starcolor-print.com' },
      { name: 'Shanghai Xinya Printing', location: 'Shanghai', founded: 2001, employees: '600+', capabilities: 'Large format corrugated, pallet wraps, header cards, spot UV, foil stamping', moq: 300, certifications: ['ISO 9001', 'FSC', 'SGS'], exportMarkets: 'Global', notableClients: 'Luxury spirits, champagne houses', website: 'xinya-print.com' }
    ]
  },
  {
    id: 'leather',
    name: 'Leather & Fabric',
    icon: '\uD83D\uDC5C',
    color: 'from-rose-700 to-red-800',
    description: 'Menu covers, bar mats, bottle cases, gift packaging, premium display pads',
    avgLeadTime: '30-45 days',
    moqRange: '200-1000 units',
    priceRange: '\u00A35-50 per unit',
    keyHub: 'Guangzhou & Dongguan, Guangdong',
    factories: [
      { name: 'Guangzhou Boshiho Leather', location: 'Guangzhou, Guangdong', founded: 2009, employees: '150+', capabilities: 'Menu covers, wine carriers, embossed branding, PU and genuine leather', moq: 200, certifications: ['ISO 9001', 'REACH'], exportMarkets: 'EU, US, Middle East', notableClients: 'Hotel chains, premium bars', website: 'boshiho-leather.com' },
      { name: 'Dongguan Bestway Leather Goods', location: 'Dongguan, Guangdong', founded: 2006, employees: '200+', capabilities: 'Bottle cases, gift boxes, bar accessories, debossing, stitching', moq: 300, certifications: ['ISO 9001', 'BSCI'], exportMarkets: 'Global luxury', notableClients: 'Cognac and whisky brands', website: 'bestway-leather.com' }
    ]
  },
  {
    id: 'silicone',
    name: 'Silicone & Rubber',
    icon: '\uD83E\uDDCA',
    color: 'from-teal-500 to-green-600',
    description: 'Bar mats, coasters, bottle pourers, ice moulds, branded bar accessories',
    avgLeadTime: '20-30 days',
    moqRange: '500-3000 units',
    priceRange: '\u00A31-15 per unit',
    keyHub: 'Dongguan & Shenzhen, Guangdong',
    factories: [
      { name: 'Dongguan Invotive Silicone', location: 'Dongguan, Guangdong', founded: 2010, employees: '200+', capabilities: 'Custom bar mats, branded ice moulds, PVC coasters, rubber pourers', moq: 500, certifications: ['ISO 9001', 'FDA', 'LFGB'], exportMarkets: 'Global', notableClients: 'Spirits brands, bar chains', website: 'invotive.com' },
      { name: 'Shenzhen Kean Silicone Product', location: 'Shenzhen, Guangdong', founded: 2008, employees: '300+', capabilities: 'High-precision moulds, multi-color silicone, branded accessories', moq: 1000, certifications: ['FDA', 'ISO 9001', 'BPA-free'], exportMarkets: 'EU, US, Japan', notableClients: 'Vodka and tequila brands', website: 'kean-silicone.com' }
    ]
  },
  {
    id: 'ceramic',
    name: 'Ceramic & Porcelain',
    icon: '\uD83C\uDFFA',
    color: 'from-indigo-500 to-violet-600',
    description: 'Branded bottles, decanters, pub water jugs, ceramic display pieces, awards',
    avgLeadTime: '40-60 days',
    moqRange: '300-2000 units',
    priceRange: '\u00A35-40 per unit',
    keyHub: 'Jingdezhen, Jiangxi & Chaozhou, Guangdong',
    factories: [
      { name: 'Jingdezhen Rongshunda Ceramics', location: 'Jingdezhen, Jiangxi', founded: 2000, employees: '250+', capabilities: 'Branded decanters, ceramic bottles, hand-painted designs, gold detailing', moq: 300, certifications: ['ISO 9001', 'SGS'], exportMarkets: 'Global', notableClients: 'Scotch and baijiu brands', website: 'rongshunda-ceramics.com' },
      { name: 'Chaozhou Yuanlong Ceramics', location: 'Chaozhou, Guangdong', founded: 2005, employees: '200+', capabilities: 'Water jugs, tasting cups, display pieces, decal printing', moq: 500, certifications: ['ISO 9001', 'FDA'], exportMarkets: 'EU, US, Australia', notableClients: 'Whisky distilleries, pub chains', website: 'yuanlong-ceramics.com' }
    ]
  }
]

// ─── KNOWN POS COMPANIES ─────────────────────────────────────────────────────
const POS_COMPANIES = [
  { name: 'WOW Display', hq: 'UK', speciality: 'Premium spirits POS, glorifiers, back-bar units', clients: 'Diageo, William Grant & Sons, Bacardi', model: 'Design + source from Asia', website: 'wowdisplay.co.uk', size: 'Medium', yearFounded: 2005 },
  { name: 'Keystone Display Group', hq: 'US', speciality: 'Retail displays, floor stands, end caps', clients: 'Brown-Forman, Beam Suntory, Constellation', model: 'US design, China manufacturing', website: 'keystonedisplaygroup.com', size: 'Large', yearFounded: 1996 },
  { name: 'Ideal Sign & Display', hq: 'UK', speciality: 'LED signs, illuminated displays, menu boards', clients: 'Heineken, AB InBev, Molson Coors', model: 'Direct manufacturing + import', website: 'idealsignanddisplay.co.uk', size: 'Medium', yearFounded: 1989 },
  { name: 'MRM Global', hq: 'UK', speciality: 'Multi-channel POS, experiential, digital', clients: 'Pernod Ricard, LVMH', model: 'Full service agency + production', website: 'mrmglobal.com', size: 'Large', yearFounded: 2001 },
  { name: 'POPAI / Shop! Association', hq: 'US/Global', speciality: 'Industry body, standards, awards, sourcing network', clients: 'N/A \u2014 industry association', model: 'Membership network', website: 'shopassociation.org', size: 'Association', yearFounded: 1936 },
  { name: 'Bridgewater Studio', hq: 'US', speciality: 'Experiential displays, immersive retail environments', clients: 'Hennessy, Johnnie Walker', model: 'Full creative + fabrication', website: 'bridgewaterstudio.net', size: 'Medium', yearFounded: 2012 },
  { name: 'Array Marketing', hq: 'Canada', speciality: 'Cosmetics & spirits POS, permanents, semi-permanents', clients: 'Est\u00e9e Lauder, spirits brands via distributor', model: 'Design + Asian supply chain', website: 'arraymarketing.com', size: 'Large', yearFounded: 1983 },
  { name: 'Havilinas', hq: 'UK', speciality: 'Bespoke spirits POS, brand activations', clients: 'Independent and mid-size brands', model: 'Design broker + China sourcing', website: 'havilinas.com', size: 'Small', yearFounded: 2015 },
  { name: 'InStore Group', hq: 'Sweden', speciality: 'In-store communication, shelf systems, digital screens', clients: 'Absolut, Pernod Ricard Nordic', model: 'European + Asian manufacturing', website: 'instoregroup.com', size: 'Large', yearFounded: 1999 },
  { name: 'Display Italia', hq: 'Italy', speciality: 'Premium wine & spirits displays, wooden and metal units', clients: 'Italian wine houses, grappa brands', model: 'European craftsmanship + some Asian sourcing', website: 'displayitalia.com', size: 'Medium', yearFounded: 2004 }
]

// ─── TRADE PLATFORMS ─────────────────────────────────────────────────────────
const TRADE_PLATFORMS = [
  { name: 'Alibaba', url: 'alibaba.com', type: 'B2B Marketplace', bestFor: 'Finding factories, comparing MOQs, initial sourcing', tips: 'Use "Trade Assurance" for payment protection. Search "spirits display" or "wine POS stand"', risk: 'Medium \u2014 verify Gold Suppliers, request samples before bulk orders' },
  { name: 'Made-in-China.com', url: 'made-in-china.com', type: 'B2B Marketplace', bestFor: 'Alternative to Alibaba with strong manufacturer verification', tips: 'More manufacturer-focused than Alibaba. Good for direct factory contact', risk: 'Medium \u2014 similar verification needed as Alibaba' },
  { name: 'Global Sources', url: 'globalsources.com', type: 'B2B Marketplace + Trade Shows', bestFor: 'Verified manufacturers, trade show connections', tips: 'Hong Kong trade shows in April and October. Premium listing means verified', risk: 'Low-Medium \u2014 better verification than Alibaba' },
  { name: 'Canton Fair (Online)', url: 'cantonfair.org.cn', type: 'Trade Exhibition', bestFor: 'Largest trade fair in China, direct factory meetings', tips: 'Phase 2 covers household goods/displays. Held April and October in Guangzhou', risk: 'Low \u2014 government-backed, serious manufacturers' },
  { name: '1688.com', url: '1688.com', type: 'Domestic B2B (Chinese)', bestFor: 'Lowest prices, domestic Chinese market rates', tips: 'Alibaba\'s domestic platform. Prices 20-40% lower. Needs Chinese agent or translator', risk: 'Medium-High \u2014 less English support, needs local partner' },
  { name: 'HKTDC Sourcing', url: 'hktdc.com', type: 'Hong Kong Trade Body', bestFor: 'Premium sourcing, verified HK-based trading companies', tips: 'Hong Kong companies often manage mainland factories. Good quality control', risk: 'Low \u2014 HK trade body verification' }
]

// ─── MARKET DISRUPTION STRATEGY ──────────────────────────────────────────────
const DISRUPTION_STRATEGIES = [
  {
    id: 'transparency',
    title: 'Break the Black Book Model',
    icon: BookOpen,
    problem: 'POS intermediaries like Havilinas hoard supplier contacts and factory relationships, creating artificial scarcity. Brands overpay 40-60% because they cannot access manufacturers directly.',
    strategy: 'Build an open-access factory directory (this page) that democratises sourcing intelligence. Provide verified factory contacts, MOQs, pricing benchmarks, and quality ratings. Eliminate the information asymmetry that intermediaries exploit.',
    tactics: [
      'Publish factory directories with direct contact details and capabilities',
      'Provide pricing benchmarks so brands know fair market rates',
      'Offer sample coordination services at transparent flat fees',
      'Build a quality verification system with independent inspection reports',
      'Create template RFQ documents in Chinese and English'
    ],
    impact: 'Brands save 30-50% on POS procurement by going direct to factory'
  },
  {
    id: 'aggregation',
    title: 'Collective Buying Power',
    icon: Users,
    problem: 'Small and independent brands cannot meet factory MOQs individually. A single brand might need 200 custom glorifiers, but the factory minimum is 500. They end up paying inflated per-unit prices to intermediaries who aggregate orders opaquely.',
    strategy: 'Create a buying collective where multiple non-competing brands pool orders to meet MOQs and unlock volume pricing. Brands share production runs while maintaining individual designs.',
    tactics: [
      'Group 3-5 non-competing brands per production run (e.g., a gin, tequila, and whisky brand sharing an acrylic manufacturer)',
      'Coordinate order timing around factory capacity and shipping schedules',
      'Negotiate shared tooling costs across the collective',
      'Offer warehouse and distribution hub in UK/EU for consolidated shipping',
      'Provide design-to-production management at 10-15% transparent commission vs 40-60% hidden markups'
    ],
    impact: 'Brands access factory-direct pricing normally reserved for large groups'
  },
  {
    id: 'contracts',
    title: 'Disrupt Multi-Year Lock-Ins',
    icon: Shield,
    problem: 'Large spirits groups (Diageo, Pernod Ricard, LVMH) sign 2-5 year exclusive POS supply contracts with major agencies like MRM Global or WOW Display. These contracts include exclusivity clauses that prevent the supplier from working with competing brands, and prevent the brand from sourcing elsewhere.',
    strategy: 'Target the gaps: new brand launches, limited editions, seasonal campaigns, and regional activations that fall outside master POS contracts. Offer fast-turnaround, flexible solutions that complement (not replace) existing contracts.',
    tactics: [
      'Focus on limited edition and seasonal POS that falls outside master contracts',
      'Offer 2-3 week turnaround for time-sensitive activations (vs 8-12 weeks from incumbents)',
      'Provide small-batch capability (50-200 units) that large suppliers won\'t touch',
      'Target brand managers directly for innovation budgets that sit outside procurement contracts',
      'Build relationships with independent distributors who make their own POS decisions'
    ],
    impact: 'Capture high-margin niche orders that large POS companies cannot service'
  },
  {
    id: 'digital',
    title: 'Digital-First POS',
    icon: Zap,
    problem: 'Traditional POS is expensive to produce, ship, and store. Much of it gets damaged in transit or never deployed. The industry wastes an estimated 30-40% of POS materials produced. Meanwhile, digital signage costs are falling rapidly.',
    strategy: 'Build a digital POS offering that combines low-cost hardware (tablets, LED screens, e-ink displays) with a SaaS content management platform. Brands update displays remotely, eliminating waste and enabling real-time marketing.',
    tactics: [
      'Partner with Shenzhen screen manufacturers for branded tablet displays at \u00A330-50/unit',
      'Build a simple CMS where brands upload and schedule promotional content',
      'Offer subscription model: \u00A315/month per display vs \u00A3200+ for physical POS replacement',
      'Include analytics: impressions, dwell time, A/B testing of creative',
      'Provide hybrid kits: digital screen + physical stand combining both approaches'
    ],
    impact: 'Recurring revenue model with 80% gross margins vs one-off physical POS'
  }
]

// ─── CLIENT VALUE FRAMEWORK ──────────────────────────────────────────────────
const CLIENT_SEGMENTS = [
  {
    segment: 'Startup Brands',
    icon: Lightbulb,
    color: 'bg-emerald-500',
    budget: '\u00A32,000 - \u00A310,000',
    needs: 'First POS kit: counter displays, shelf talkers, bar mats, branded glassware',
    painPoints: ['No POS experience or supplier contacts', 'Cannot meet factory MOQs alone', 'Cash-constrained, need flexible payment', 'Don\'t know what works in different channels'],
    solution: 'Starter POS Package \u2014 curated kit of 5-7 essential items sourced collectively. Includes design templates, factory coordination, and deployment guide.',
    packages: [
      { name: 'Launch Kit', price: '\u00A32,500', includes: '500 coasters, 200 counter cards, 50 bar mats, 100 shelf talkers' },
      { name: 'Premium Launch', price: '\u00A35,000', includes: 'Launch Kit + 50 acrylic glorifiers, 200 branded glasses' },
      { name: 'Full Activation', price: '\u00A310,000', includes: 'Premium Launch + 10 LED backbar units, 50 wooden display crates' }
    ]
  },
  {
    segment: 'Independent Distillers',
    icon: Factory,
    color: 'bg-blue-500',
    budget: '\u00A310,000 - \u00A350,000',
    needs: 'Seasonal campaigns, on-trade activations, off-trade shelf presence, export market POS',
    painPoints: ['Overpaying intermediaries by 40-60%', 'Slow turnaround from current suppliers', 'No visibility on factory costs', 'Inconsistent quality across orders'],
    solution: 'Direct Sourcing Service \u2014 factory-direct procurement with transparent pricing, quality inspection, and consolidated shipping.',
    packages: [
      { name: 'Seasonal Campaign', price: '\u00A38,000-15,000', includes: 'Custom POS suite for one campaign: glorifiers, counter units, branded glassware' },
      { name: 'Annual POS Program', price: '\u00A325,000-40,000', includes: '4 seasonal refreshes, permanent back-bar units, ongoing replenishment' },
      { name: 'Export Market Kit', price: '\u00A312,000-20,000', includes: 'Travel retail displays, duty-free glorifiers, multilingual POS materials' }
    ]
  },
  {
    segment: 'Mid-Size Brands',
    icon: TrendingUp,
    color: 'bg-purple-500',
    budget: '\u00A350,000 - \u00A3250,000',
    needs: 'Multi-market POS rollout, digital integration, premium displays for key accounts, trade show materials',
    painPoints: ['Locked into expensive agency contracts', 'Cannot justify cost of in-house POS team', 'Need consistency across markets', 'Agencies not responsive enough for fast-moving opportunities'],
    solution: 'Managed POS Partnership \u2014 act as outsourced POS department with factory relationships, design capability, and logistics management.',
    packages: [
      { name: 'Managed Service', price: '\u00A360,000-120,000/year', includes: 'Dedicated account manager, quarterly POS refreshes, factory management, QC inspections' },
      { name: 'Innovation Sprint', price: '\u00A315,000-30,000', includes: 'Rapid prototyping of new POS concepts, 3 design rounds, sample production in 3 weeks' },
      { name: 'Digital + Physical', price: '\u00A380,000-150,000/year', includes: 'Hybrid program: digital screens + physical POS, CMS platform, analytics dashboard' }
    ]
  },
  {
    segment: 'Large Groups',
    icon: Building2,
    color: 'bg-navy',
    budget: '\u00A3250,000+',
    needs: 'Supplementary POS for innovation brands, limited editions, regional activations outside master contracts',
    painPoints: ['Master POS contracts don\'t cover everything', 'Innovation brands need faster turnaround', 'Regional markets need localised POS', 'Procurement teams focused on cost, not creativity'],
    solution: 'Innovation POS Partner \u2014 agile supplement to master POS contracts, handling the work that large agencies won\'t prioritise.',
    packages: [
      { name: 'Innovation Brand Support', price: 'Project-based', includes: 'Full POS development for new brand launches, from design to deployment' },
      { name: 'Limited Edition Specialist', price: '\u00A320,000-50,000 per edition', includes: 'Rapid-turnaround POS for limited releases, 3-week factory-to-market' },
      { name: 'Regional Activation', price: '\u00A330,000-80,000', includes: 'Market-specific POS for individual countries or regions, localised design and production' }
    ]
  }
]

// ─── COST BENCHMARKS ─────────────────────────────────────────────────────────
const COST_BENCHMARKS = [
  { item: 'Acrylic Bottle Glorifier (LED-lit)', factoryDirect: '\u00A38-15', intermediary: '\u00A325-45', retail: '\u00A340-80', markup: '200-400%' },
  { item: 'Metal Floor Stand (powder coated)', factoryDirect: '\u00A325-50', intermediary: '\u00A370-120', retail: '\u00A3100-200', markup: '180-300%' },
  { item: 'Wooden Barrel Display Crate', factoryDirect: '\u00A312-25', intermediary: '\u00A335-60', retail: '\u00A350-90', markup: '190-260%' },
  { item: 'Branded Rocks Glass (screen printed)', factoryDirect: '\u00A31.50-3', intermediary: '\u00A34-8', retail: '\u00A36-15', markup: '170-400%' },
  { item: 'Silicone Bar Mat (full colour)', factoryDirect: '\u00A32-5', intermediary: '\u00A38-15', retail: '\u00A312-25', markup: '300-400%' },
  { item: 'Corrugated FSDU (floor standing)', factoryDirect: '\u00A35-12', intermediary: '\u00A318-30', retail: '\u00A325-50', markup: '260-320%' },
  { item: 'LED Edge-Lit Sign (A3 size)', factoryDirect: '\u00A315-30', intermediary: '\u00A345-80', retail: '\u00A370-120', markup: '200-300%' },
  { item: 'Leather Menu Cover (debossed)', factoryDirect: '\u00A35-12', intermediary: '\u00A318-30', retail: '\u00A325-50', markup: '260-320%' },
  { item: 'Ceramic Water Jug (branded)', factoryDirect: '\u00A34-8', intermediary: '\u00A312-22', retail: '\u00A318-35', markup: '200-340%' },
  { item: 'Counter Card Display (die-cut)', factoryDirect: '\u00A30.80-2', intermediary: '\u00A33-6', retail: '\u00A35-10', markup: '275-400%' }
]

// ─── COMPONENTS ──────────────────────────────────────────────────────────────

function StatCard({ label, value, icon: Icon, color = 'text-gold' }) {
  return (
    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
      <div className="flex items-center gap-2 mb-1">
        {Icon && <Icon size={14} className="text-gray-400" />}
        <span className="text-xs text-gray-500 font-medium">{label}</span>
      </div>
      <div className={`text-xl font-bold ${color}`}>{value}</div>
    </div>
  )
}

function FactoryCard({ factory, materialColor }) {
  const [expanded, setExpanded] = useState(false)
  return (
    <div className="bg-gray-50 rounded-lg border border-gray-100 overflow-hidden">
      <button onClick={() => setExpanded(!expanded)} className="w-full text-left p-4 hover:bg-gray-100 transition-colors">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-semibold text-navy text-sm">{factory.name}</h4>
            <div className="flex items-center gap-3 mt-1 text-xs text-gray-500">
              <span className="flex items-center gap-1"><MapPin size={10} />{factory.location}</span>
              <span>Est. {factory.founded}</span>
              <span>{factory.employees} staff</span>
            </div>
          </div>
          {expanded ? <ChevronDown size={16} className="text-gray-400" /> : <ChevronRight size={16} className="text-gray-400" />}
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

function MaterialSection({ category }) {
  const [expanded, setExpanded] = useState(false)
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <button onClick={() => setExpanded(!expanded)} className="w-full text-left p-5 hover:bg-gray-50 transition-colors">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${category.color} flex items-center justify-center text-xl`}>
              {category.icon}
            </div>
            <div>
              <h3 className="text-subsection text-navy">{category.name}</h3>
              <p className="text-sm text-gray-500 mt-0.5">{category.description}</p>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <div className="text-right hidden md:block">
              <div className="text-xs text-gray-400">Lead Time</div>
              <div className="text-sm font-semibold text-navy">{category.avgLeadTime}</div>
            </div>
            <div className="text-right hidden md:block">
              <div className="text-xs text-gray-400">MOQ Range</div>
              <div className="text-sm font-semibold text-navy">{category.moqRange}</div>
            </div>
            <div className="text-right hidden md:block">
              <div className="text-xs text-gray-400">Price Range</div>
              <div className="text-sm font-semibold text-gold">{category.priceRange}</div>
            </div>
            {expanded ? <ChevronDown size={20} className="text-gray-400" /> : <ChevronRight size={20} className="text-gray-400" />}
          </div>
        </div>
      </button>
      {expanded && (
        <div className="px-5 pb-5 border-t border-gray-100 pt-4">
          <div className="flex items-center gap-2 mb-3">
            <MapPin size={14} className="text-gold" />
            <span className="text-sm font-medium text-gray-600">Key Manufacturing Hub: <span className="text-navy font-semibold">{category.keyHub}</span></span>
          </div>
          <div className="space-y-2">
            {category.factories.map((f, i) => (
              <FactoryCard key={i} factory={f} materialColor={category.color} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

function PosCompanyCard({ company }) {
  return (
    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-2">
        <h4 className="font-bold text-navy">{company.name}</h4>
        <span className={`px-2 py-0.5 text-xs rounded-full ${company.size === 'Large' ? 'bg-purple-100 text-purple-700' : company.size === 'Medium' ? 'bg-blue-100 text-blue-700' : company.size === 'Association' ? 'bg-gray-100 text-gray-700' : 'bg-green-100 text-green-700'}`}>{company.size}</span>
      </div>
      <div className="space-y-1.5 text-sm">
        <div className="flex items-center gap-2 text-gray-500">
          <Globe size={12} />
          <span>{company.hq} \u2022 Est. {company.yearFounded}</span>
        </div>
        <p className="text-gray-600">{company.speciality}</p>
        <div>
          <span className="text-xs font-medium text-gray-400">Key Clients:</span>
          <span className="text-xs text-gray-600 ml-1">{company.clients}</span>
        </div>
        <div>
          <span className="text-xs font-medium text-gray-400">Business Model:</span>
          <span className="text-xs text-gray-600 ml-1">{company.model}</span>
        </div>
      </div>
    </div>
  )
}

function DisruptionCard({ strategy }) {
  const [expanded, setExpanded] = useState(false)
  const Icon = strategy.icon
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <button onClick={() => setExpanded(!expanded)} className="w-full text-left p-5 hover:bg-gray-50 transition-colors">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-lg bg-navy flex items-center justify-center">
              <Icon size={20} className="text-gold" />
            </div>
            <div>
              <h3 className="text-subsection text-navy">{strategy.title}</h3>
              <p className="text-sm text-gold font-medium mt-0.5">{strategy.impact}</p>
            </div>
          </div>
          {expanded ? <ChevronDown size={20} className="text-gray-400" /> : <ChevronRight size={20} className="text-gray-400" />}
        </div>
      </button>
      {expanded && (
        <div className="px-5 pb-5 border-t border-gray-100 pt-4 space-y-4">
          <div>
            <h4 className="text-xs font-bold text-red-500 uppercase tracking-wider mb-1">The Problem</h4>
            <p className="text-sm text-gray-700">{strategy.problem}</p>
          </div>
          <div>
            <h4 className="text-xs font-bold text-emerald-600 uppercase tracking-wider mb-1">Our Strategy</h4>
            <p className="text-sm text-gray-700">{strategy.strategy}</p>
          </div>
          <div>
            <h4 className="text-xs font-bold text-navy uppercase tracking-wider mb-2">Tactical Execution</h4>
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
    </div>
  )
}

function ClientSegmentCard({ segment }) {
  const [expanded, setExpanded] = useState(false)
  const Icon = segment.icon
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <button onClick={() => setExpanded(!expanded)} className="w-full text-left p-5 hover:bg-gray-50 transition-colors">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className={`w-10 h-10 rounded-lg ${segment.color} flex items-center justify-center`}>
              <Icon size={20} className="text-white" />
            </div>
            <div>
              <h3 className="text-subsection text-navy">{segment.segment}</h3>
              <p className="text-sm text-gray-500">Budget: <span className="text-gold font-semibold">{segment.budget}</span></p>
            </div>
          </div>
          {expanded ? <ChevronDown size={20} className="text-gray-400" /> : <ChevronRight size={20} className="text-gray-400" />}
        </div>
      </button>
      {expanded && (
        <div className="px-5 pb-5 border-t border-gray-100 pt-4 space-y-4">
          <div>
            <h4 className="text-xs font-bold text-navy uppercase tracking-wider mb-1">Key Needs</h4>
            <p className="text-sm text-gray-700">{segment.needs}</p>
          </div>
          <div>
            <h4 className="text-xs font-bold text-red-500 uppercase tracking-wider mb-2">Pain Points</h4>
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
            <h4 className="text-xs font-bold text-emerald-600 uppercase tracking-wider mb-1">Our Solution</h4>
            <p className="text-sm text-gray-700">{segment.solution}</p>
          </div>
          <div>
            <h4 className="text-xs font-bold text-gold uppercase tracking-wider mb-2">Packages</h4>
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
    </div>
  )
}

function CostBenchmarkTable() {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-200">
            <th className="text-left py-3 px-4 font-semibold text-navy">POS Item</th>
            <th className="text-right py-3 px-4 font-semibold text-emerald-600">Factory Direct</th>
            <th className="text-right py-3 px-4 font-semibold text-orange-500">Via Intermediary</th>
            <th className="text-right py-3 px-4 font-semibold text-red-500">Retail / Agency</th>
            <th className="text-right py-3 px-4 font-semibold text-gray-500">Markup</th>
          </tr>
        </thead>
        <tbody>
          {COST_BENCHMARKS.map((item, i) => (
            <tr key={i} className={`border-b border-gray-100 ${i % 2 === 0 ? 'bg-gray-50/50' : ''}`}>
              <td className="py-2.5 px-4 font-medium text-navy">{item.item}</td>
              <td className="py-2.5 px-4 text-right text-emerald-600 font-semibold">{item.factoryDirect}</td>
              <td className="py-2.5 px-4 text-right text-orange-500">{item.intermediary}</td>
              <td className="py-2.5 px-4 text-right text-red-500">{item.retail}</td>
              <td className="py-2.5 px-4 text-right text-gray-500 text-xs">{item.markup}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

// ─── MAIN COMPONENT ──────────────────────────────────────────────────────────
const TABS = [
  { id: 'directory', label: 'Factory Directory', icon: Factory },
  { id: 'companies', label: 'POS Companies', icon: Building2 },
  { id: 'sourcing', label: 'Sourcing Platforms', icon: Globe },
  { id: 'costs', label: 'Cost Benchmarks', icon: DollarSign },
  { id: 'disruption', label: 'Disruption Strategy', icon: Target },
  { id: 'clients', label: 'Client Value', icon: Users }
]

export default function POSIntelligence() {
  const [activeTab, setActiveTab] = useState('directory')
  const [searchTerm, setSearchTerm] = useState('')

  const filteredCategories = MATERIAL_CATEGORIES.filter(c =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.description.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const filteredCompanies = POS_COMPANIES.filter(c =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.speciality.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.hq.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-navy to-blue-700 flex items-center justify-center">
            <Package size={20} className="text-gold" />
          </div>
          <div>
            <h1 className="font-display text-page text-navy">POS Manufacturing Intelligence</h1>
            <p className="text-caption text-gray-500">Factory directory, sourcing strategy & market disruption for spirits POS</p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
        <StatCard label="Verified Factories" value={MATERIAL_CATEGORIES.reduce((sum, c) => sum + c.factories.length, 0)} icon={Factory} />
        <StatCard label="Material Categories" value={MATERIAL_CATEGORIES.length} icon={Layers} />
        <StatCard label="POS Companies Tracked" value={POS_COMPANIES.length} icon={Building2} />
        <StatCard label="Avg Markup (Intermediary)" value="250-350%" icon={AlertTriangle} color="text-red-500" />
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2">
        {TABS.map(tab => {
          const Icon = tab.icon
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === tab.id ? 'bg-navy text-white' : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'}`}
            >
              <Icon size={16} />
              {tab.label}
            </button>
          )
        })}
      </div>

      {/* Search */}
      {(activeTab === 'directory' || activeTab === 'companies') && (
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
      )}

      {/* Tab Content */}
      {activeTab === 'directory' && (
        <div className="space-y-3">
          <div className="bg-gradient-to-r from-navy to-blue-800 rounded-xl p-5 text-white">
            <h2 className="font-display text-section text-navy mb-2">Factory Directory by Material</h2>
            <p className="text-blue-200 text-sm">Direct-to-factory contacts across 9 material categories. These are verified manufacturers in China{"'"}s key POS production hubs. Click any category to see individual factories, capabilities, MOQs, and certifications.</p>
          </div>
          {filteredCategories.map(cat => (
            <MaterialSection key={cat.id} category={cat} />
          ))}
        </div>
      )}

      {activeTab === 'companies' && (
        <div className="space-y-4">
          <div className="bg-gradient-to-r from-navy to-blue-800 rounded-xl p-5 text-white">
            <h2 className="font-display text-section text-navy mb-2">POS Companies in Spirits</h2>
            <p className="text-blue-200 text-sm">The current competitive landscape of companies providing POS solutions to alcohol brands. Understanding their business models reveals the disruption opportunity: most are intermediaries adding 40-60% markup while guarding supplier contacts.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-3">
            {filteredCompanies.map((company, i) => (
              <PosCompanyCard key={i} company={company} />
            ))}
          </div>
        </div>
      )}

      {activeTab === 'sourcing' && (
        <div className="space-y-4">
          <div className="bg-gradient-to-r from-navy to-blue-800 rounded-xl p-5 text-white">
            <h2 className="font-display text-section text-navy mb-2">Sourcing Platforms & Trade Shows</h2>
            <p className="text-blue-200 text-sm">Direct access to Chinese manufacturers through B2B platforms and trade exhibitions. These are the same channels that POS intermediaries use \u2014 there is no secret beyond knowing where to look and how to verify suppliers.</p>
          </div>
          <div className="space-y-3">
            {TRADE_PLATFORMS.map((platform, i) => (
              <div key={i} className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h3 className="text-subsection text-navy">{platform.name}</h3>
                    <span className="text-xs text-gray-500">{platform.type}</span>
                  </div>
                  <a href={`https://${platform.url}`} target="_blank" rel="noopener noreferrer" className="text-gold hover:text-gold/80 flex items-center gap-1 text-sm">
                    Visit <ExternalLink size={12} />
                  </a>
                </div>
                <div className="space-y-2">
                  <div>
                    <span className="text-xs font-medium text-gray-400">Best For</span>
                    <p className="text-sm text-gray-700">{platform.bestFor}</p>
                  </div>
                  <div>
                    <span className="text-xs font-medium text-gray-400">Pro Tips</span>
                    <p className="text-sm text-gray-700">{platform.tips}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-medium text-gray-400">Risk Level:</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${platform.risk.startsWith('Low') ? 'bg-green-100 text-green-700' : platform.risk.startsWith('Medium') ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'}`}>{platform.risk}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'costs' && (
        <div className="space-y-4">
          <div className="bg-gradient-to-r from-navy to-blue-800 rounded-xl p-5 text-white">
            <h2 className="font-display text-section text-navy mb-2">Cost Benchmarks: Factory vs Intermediary vs Retail</h2>
            <p className="text-blue-200 text-sm">The true cost of POS materials at each stage of the supply chain. These benchmarks reveal why intermediaries guard their supplier contacts so fiercely \u2014 the markups are extraordinary, often 250-400% above factory-gate pricing.</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
            <CostBenchmarkTable />
          </div>
          <div className="bg-amber-50 rounded-xl p-5 border border-amber-200">
            <div className="flex items-start gap-3">
              <AlertTriangle size={20} className="text-amber-500 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-bold text-amber-800 mb-1">Key Insight: The Markup Structure</h3>
                <p className="text-sm text-amber-700">POS intermediaries typically apply a 2.5-4x markup over factory-gate pricing. A branded acrylic glorifier that costs \u00A310 from the factory in Dongguan reaches the brand at \u00A335-45 via an intermediary, and \u00A360-80 if sourced through a full-service POS agency. This markup structure is only possible because brands lack direct factory access. By providing transparent pricing benchmarks and direct sourcing capability, we collapse the intermediary margin and deliver significant savings to brands of all sizes.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'disruption' && (
        <div className="space-y-4">
          <div className="bg-gradient-to-r from-navy to-blue-800 rounded-xl p-5 text-white">
            <h2 className="font-display text-section text-navy mb-2">Market Disruption Strategy</h2>
            <p className="text-blue-200 text-sm">Four strategic pillars for disrupting the spirits POS industry. The market relies on information asymmetry, relationship gatekeeping, and artificial scarcity \u2014 all of which can be systematically dismantled.</p>
          </div>
          {DISRUPTION_STRATEGIES.map(strategy => (
            <DisruptionCard key={strategy.id} strategy={strategy} />
          ))}
        </div>
      )}

      {activeTab === 'clients' && (
        <div className="space-y-4">
          <div className="bg-gradient-to-r from-navy to-blue-800 rounded-xl p-5 text-white">
            <h2 className="font-display text-section text-navy mb-2">Client Value Framework</h2>
            <p className="text-blue-200 text-sm">Tailored POS solutions for every stage of brand growth. From startup launch kits to enterprise innovation partnerships, each segment has distinct needs, budgets, and pain points that we can address with targeted packages.</p>
          </div>
          {CLIENT_SEGMENTS.map((segment, i) => (
            <ClientSegmentCard key={i} segment={segment} />
          ))}
        </div>
      )}

      {/* Footer */}
      <div className="text-center py-4 text-xs text-gray-400">
        POS Manufacturing Intelligence \u2022 Liquid Economy Platform \u2022 Palmer Liquid Studios \u2022 Data compiled from trade directories, manufacturer listings, and industry research
      </div>
    </div>
  )
}
