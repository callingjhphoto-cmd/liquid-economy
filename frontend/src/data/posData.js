export const DATA_LAST_UPDATED = '2026-03-21'

// ─── POS INTELLIGENCE DATA ─────────────────────────────────────────────────
// Extracted from POSIntelligence.jsx for data/component separation

export const MATERIAL_CATEGORIES = [
  {
    id: 'acrylic',
    name: 'Acrylic & Perspex',
    icon: '⭐',
    color: 'from-blue-500 to-cyan-500',
    description: 'LED-lit displays, countertop units, bottle glorifiers, menu holders',
    avgLeadTime: '25-35 days',
    moqRange: '200-500 units',
    priceRange: '£8-45 per unit',
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
    icon: '⚙️',
    color: 'from-gray-300 to-gray-400',
    description: 'Floor stands, shelf units, bottle racks, hanging signs, tin displays',
    avgLeadTime: '30-45 days',
    moqRange: '100-300 units',
    priceRange: '£15-120 per unit',
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
    icon: '🌳',
    color: 'from-amber-600 to-yellow-700',
    description: 'Barrel displays, wooden crates, shelf talkers, menu boards, premium gift boxes',
    avgLeadTime: '35-50 days',
    moqRange: '100-500 units',
    priceRange: '£12-80 per unit',
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
    icon: '💡',
    color: 'from-purple-500 to-pink-500',
    description: 'Illuminated displays, digital screens, edge-lit signs, neon-style units, interactive kiosks',
    avgLeadTime: '30-40 days',
    moqRange: '50-200 units',
    priceRange: '£25-200 per unit',
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
    icon: '🥂',
    color: 'from-sky-400 to-blue-500',
    description: 'Branded glassware, decanters, bottle glorifiers, display cases, awards/trophies',
    avgLeadTime: '35-50 days',
    moqRange: '500-2000 units',
    priceRange: '£3-35 per unit',
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
    icon: '📄',
    color: 'from-orange-400 to-red-500',
    description: 'Counter cards, shelf wobblers, dump bins, corrugated displays, tent cards, coasters',
    avgLeadTime: '15-25 days',
    moqRange: '500-5000 units',
    priceRange: '£0.50-8 per unit',
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
    icon: '👜',
    color: 'from-rose-700 to-red-800',
    description: 'Menu covers, bar mats, bottle cases, gift packaging, premium display pads',
    avgLeadTime: '30-45 days',
    moqRange: '200-1000 units',
    priceRange: '£5-50 per unit',
    keyHub: 'Guangzhou & Dongguan, Guangdong',
    factories: [
      { name: 'Guangzhou Boshiho Leather', location: 'Guangzhou, Guangdong', founded: 2009, employees: '150+', capabilities: 'Menu covers, wine carriers, embossed branding, PU and genuine leather', moq: 200, certifications: ['ISO 9001', 'REACH'], exportMarkets: 'EU, US, Middle East', notableClients: 'Hotel chains, premium bars', website: 'boshiho-leather.com' },
      { name: 'Dongguan Bestway Leather Goods', location: 'Dongguan, Guangdong', founded: 2006, employees: '200+', capabilities: 'Bottle cases, gift boxes, bar accessories, debossing, stitching', moq: 300, certifications: ['ISO 9001', 'BSCI'], exportMarkets: 'Global luxury', notableClients: 'Cognac and whisky brands', website: 'bestway-leather.com' }
    ]
  },
  {
    id: 'silicone',
    name: 'Silicone & Rubber',
    icon: '🧊',
    color: 'from-teal-500 to-green-600',
    description: 'Bar mats, coasters, bottle pourers, ice moulds, branded bar accessories',
    avgLeadTime: '20-30 days',
    moqRange: '500-3000 units',
    priceRange: '£1-15 per unit',
    keyHub: 'Dongguan & Shenzhen, Guangdong',
    factories: [
      { name: 'Dongguan Invotive Silicone', location: 'Dongguan, Guangdong', founded: 2010, employees: '200+', capabilities: 'Custom bar mats, branded ice moulds, PVC coasters, rubber pourers', moq: 500, certifications: ['ISO 9001', 'FDA', 'LFGB'], exportMarkets: 'Global', notableClients: 'Spirits brands, bar chains', website: 'invotive.com' },
      { name: 'Shenzhen Kean Silicone Product', location: 'Shenzhen, Guangdong', founded: 2008, employees: '300+', capabilities: 'High-precision moulds, multi-color silicone, branded accessories', moq: 1000, certifications: ['FDA', 'ISO 9001', 'BPA-free'], exportMarkets: 'EU, US, Japan', notableClients: 'Vodka and tequila brands', website: 'kean-silicone.com' }
    ]
  },
  {
    id: 'ceramic',
    name: 'Ceramic & Porcelain',
    icon: '🏺',
    color: 'from-indigo-500 to-violet-600',
    description: 'Branded bottles, decanters, pub water jugs, ceramic display pieces, awards',
    avgLeadTime: '40-60 days',
    moqRange: '300-2000 units',
    priceRange: '£5-40 per unit',
    keyHub: 'Jingdezhen, Jiangxi & Chaozhou, Guangdong',
    factories: [
      { name: 'Jingdezhen Rongshunda Ceramics', location: 'Jingdezhen, Jiangxi', founded: 2000, employees: '250+', capabilities: 'Branded decanters, ceramic bottles, hand-painted designs, gold detailing', moq: 300, certifications: ['ISO 9001', 'SGS'], exportMarkets: 'Global', notableClients: 'Scotch and baijiu brands', website: 'rongshunda-ceramics.com' },
      { name: 'Chaozhou Yuanlong Ceramics', location: 'Chaozhou, Guangdong', founded: 2005, employees: '200+', capabilities: 'Water jugs, tasting cups, display pieces, decal printing', moq: 500, certifications: ['ISO 9001', 'FDA'], exportMarkets: 'EU, US, Australia', notableClients: 'Whisky distilleries, pub chains', website: 'yuanlong-ceramics.com' }
    ]
  }
]

export const POS_COMPANIES = [
  { name: 'WOW Display', hq: 'UK', speciality: 'Premium spirits POS, glorifiers, back-bar units', clients: 'Diageo, William Grant & Sons, Bacardi', model: 'Design + source from Asia', website: 'wowdisplay.co.uk', size: 'Medium', yearFounded: 2005 },
  { name: 'Keystone Display Group', hq: 'US', speciality: 'Retail displays, floor stands, end caps', clients: 'Brown-Forman, Beam Suntory, Constellation', model: 'US design, China manufacturing', website: 'keystonedisplaygroup.com', size: 'Large', yearFounded: 1996 },
  { name: 'Ideal Sign & Display', hq: 'UK', speciality: 'LED signs, illuminated displays, menu boards', clients: 'Heineken, AB InBev, Molson Coors', model: 'Direct manufacturing + import', website: 'idealsignanddisplay.co.uk', size: 'Medium', yearFounded: 1989 },
  { name: 'MRM Global', hq: 'UK', speciality: 'Multi-channel POS, experiential, digital', clients: 'Pernod Ricard, LVMH', model: 'Full service agency + production', website: 'mrmglobal.com', size: 'Large', yearFounded: 2001 },
  { name: 'POPAI / Shop! Association', hq: 'US/Global', speciality: 'Industry body, standards, awards, sourcing network', clients: 'N/A — industry association', model: 'Membership network', website: 'shopassociation.org', size: 'Association', yearFounded: 1936 },
  { name: 'Bridgewater Studio', hq: 'US', speciality: 'Experiential displays, immersive retail environments', clients: 'Hennessy, Johnnie Walker', model: 'Full creative + fabrication', website: 'bridgewaterstudio.net', size: 'Medium', yearFounded: 2012 },
  { name: 'Array Marketing', hq: 'Canada', speciality: 'Cosmetics & spirits POS, permanents, semi-permanents', clients: 'Estée Lauder, spirits brands via distributor', model: 'Design + Asian supply chain', website: 'arraymarketing.com', size: 'Large', yearFounded: 1983 },
  { name: 'Havilinas', hq: 'UK', speciality: 'Bespoke spirits POS, brand activations', clients: 'Independent and mid-size brands', model: 'Design broker + China sourcing', website: 'havilinas.com', size: 'Small', yearFounded: 2015 },
  { name: 'InStore Group', hq: 'Sweden', speciality: 'In-store communication, shelf systems, digital screens', clients: 'Absolut, Pernod Ricard Nordic', model: 'European + Asian manufacturing', website: 'instoregroup.com', size: 'Large', yearFounded: 1999 },
  { name: 'Display Italia', hq: 'Italy', speciality: 'Premium wine & spirits displays, wooden and metal units', clients: 'Italian wine houses, grappa brands', model: 'European craftsmanship + some Asian sourcing', website: 'displayitalia.com', size: 'Medium', yearFounded: 2004 }
]

export const TRADE_PLATFORMS = [
  { name: 'Alibaba', url: 'alibaba.com', type: 'B2B Marketplace', bestFor: 'Finding factories, comparing MOQs, initial sourcing', tips: 'Use "Trade Assurance" for payment protection. Search "spirits display" or "wine POS stand"', risk: 'Medium — verify Gold Suppliers, request samples before bulk orders' },
  { name: 'Made-in-China.com', url: 'made-in-china.com', type: 'B2B Marketplace', bestFor: 'Alternative to Alibaba with strong manufacturer verification', tips: 'More manufacturer-focused than Alibaba. Good for direct factory contact', risk: 'Medium — similar verification needed as Alibaba' },
  { name: 'Global Sources', url: 'globalsources.com', type: 'B2B Marketplace + Trade Shows', bestFor: 'Verified manufacturers, trade show connections', tips: 'Hong Kong trade shows in April and October. Premium listing means verified', risk: 'Low-Medium — better verification than Alibaba' },
  { name: 'Canton Fair (Online)', url: 'cantonfair.org.cn', type: 'Trade Exhibition', bestFor: 'Largest trade fair in China, direct factory meetings', tips: 'Phase 2 covers household goods/displays. Held April and October in Guangzhou', risk: 'Low — government-backed, serious manufacturers' },
  { name: '1688.com', url: '1688.com', type: 'Domestic B2B (Chinese)', bestFor: 'Lowest prices, domestic Chinese market rates', tips: 'Alibaba\'s domestic platform. Prices 20-40% lower. Needs Chinese agent or translator', risk: 'Medium-High — less English support, needs local partner' },
  { name: 'HKTDC Sourcing', url: 'hktdc.com', type: 'Hong Kong Trade Body', bestFor: 'Premium sourcing, verified HK-based trading companies', tips: 'Hong Kong companies often manage mainland factories. Good quality control', risk: 'Low — HK trade body verification' }
]

export const DISRUPTION_STRATEGIES = [
  {
    id: 'transparency',
    title: 'Break the Black Book Model',
    iconName: 'BookOpen',
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
    iconName: 'Users',
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
    iconName: 'Shield',
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
    iconName: 'Zap',
    problem: 'Traditional POS is expensive to produce, ship, and store. Much of it gets damaged in transit or never deployed. The industry wastes an estimated 30-40% of POS materials produced. Meanwhile, digital signage costs are falling rapidly.',
    strategy: 'Build a digital POS offering that combines low-cost hardware (tablets, LED screens, e-ink displays) with a SaaS content management platform. Brands update displays remotely, eliminating waste and enabling real-time marketing.',
    tactics: [
      'Partner with Shenzhen screen manufacturers for branded tablet displays at £30-50/unit',
      'Build a simple CMS where brands upload and schedule promotional content',
      'Offer subscription model: £15/month per display vs £200+ for physical POS replacement',
      'Include analytics: impressions, dwell time, A/B testing of creative',
      'Provide hybrid kits: digital screen + physical stand combining both approaches'
    ],
    impact: 'Recurring revenue model with 80% gross margins vs one-off physical POS'
  }
]

export const CLIENT_SEGMENTS = [
  {
    segment: 'Startup Brands',
    iconName: 'Lightbulb',
    color: 'bg-emerald-500',
    budget: '£2,000 - £10,000',
    needs: 'First POS kit: counter displays, shelf talkers, bar mats, branded glassware',
    painPoints: ['No POS experience or supplier contacts', 'Cannot meet factory MOQs alone', 'Cash-constrained, need flexible payment', 'Don\'t know what works in different channels'],
    solution: 'Starter POS Package — curated kit of 5-7 essential items sourced collectively. Includes design templates, factory coordination, and deployment guide.',
    packages: [
      { name: 'Launch Kit', price: '£2,500', includes: '500 coasters, 200 counter cards, 50 bar mats, 100 shelf talkers' },
      { name: 'Premium Launch', price: '£5,000', includes: 'Launch Kit + 50 acrylic glorifiers, 200 branded glasses' },
      { name: 'Full Activation', price: '£10,000', includes: 'Premium Launch + 10 LED backbar units, 50 wooden display crates' }
    ]
  },
  {
    segment: 'Independent Distillers',
    iconName: 'Factory',
    color: 'bg-blue-500',
    budget: '£10,000 - £50,000',
    needs: 'Seasonal campaigns, on-trade activations, off-trade shelf presence, export market POS',
    painPoints: ['Overpaying intermediaries by 40-60%', 'Slow turnaround from current suppliers', 'No visibility on factory costs', 'Inconsistent quality across orders'],
    solution: 'Direct Sourcing Service — factory-direct procurement with transparent pricing, quality inspection, and consolidated shipping.',
    packages: [
      { name: 'Seasonal Campaign', price: '£8,000-15,000', includes: 'Custom POS suite for one campaign: glorifiers, counter units, branded glassware' },
      { name: 'Annual POS Program', price: '£25,000-40,000', includes: '4 seasonal refreshes, permanent back-bar units, ongoing replenishment' },
      { name: 'Export Market Kit', price: '£12,000-20,000', includes: 'Travel retail displays, duty-free glorifiers, multilingual POS materials' }
    ]
  },
  {
    segment: 'Mid-Size Brands',
    iconName: 'TrendingUp',
    color: 'bg-purple-500',
    budget: '£50,000 - £250,000',
    needs: 'Multi-market POS rollout, digital integration, premium displays for key accounts, trade show materials',
    painPoints: ['Locked into expensive agency contracts', 'Cannot justify cost of in-house POS team', 'Need consistency across markets', 'Agencies not responsive enough for fast-moving opportunities'],
    solution: 'Managed POS Partnership — act as outsourced POS department with factory relationships, design capability, and logistics management.',
    packages: [
      { name: 'Managed Service', price: '£60,000-120,000/year', includes: 'Dedicated account manager, quarterly POS refreshes, factory management, QC inspections' },
      { name: 'Innovation Sprint', price: '£15,000-30,000', includes: 'Rapid prototyping of new POS concepts, 3 design rounds, sample production in 3 weeks' },
      { name: 'Digital + Physical', price: '£80,000-150,000/year', includes: 'Hybrid program: digital screens + physical POS, CMS platform, analytics dashboard' }
    ]
  },
  {
    segment: 'Large Groups',
    iconName: 'Building2',
    color: 'bg-navy',
    budget: '£250,000+',
    needs: 'Supplementary POS for innovation brands, limited editions, regional activations outside master contracts',
    painPoints: ['Master POS contracts don\'t cover everything', 'Innovation brands need faster turnaround', 'Regional markets need localised POS', 'Procurement teams focused on cost, not creativity'],
    solution: 'Innovation POS Partner — agile supplement to master POS contracts, handling the work that large agencies won\'t prioritise.',
    packages: [
      { name: 'Innovation Brand Support', price: 'Project-based', includes: 'Full POS development for new brand launches, from design to deployment' },
      { name: 'Limited Edition Specialist', price: '£20,000-50,000 per edition', includes: 'Rapid-turnaround POS for limited releases, 3-week factory-to-market' },
      { name: 'Regional Activation', price: '£30,000-80,000', includes: 'Market-specific POS for individual countries or regions, localised design and production' }
    ]
  }
]

export const COST_BENCHMARKS = [
  { item: 'Acrylic Bottle Glorifier (LED-lit)', factoryDirect: '£8-15', intermediary: '£25-45', retail: '£40-80', markup: '200-400%' },
  { item: 'Metal Floor Stand (powder coated)', factoryDirect: '£25-50', intermediary: '£70-120', retail: '£100-200', markup: '180-300%' },
  { item: 'Wooden Barrel Display Crate', factoryDirect: '£12-25', intermediary: '£35-60', retail: '£50-90', markup: '190-260%' },
  { item: 'Branded Rocks Glass (screen printed)', factoryDirect: '£1.50-3', intermediary: '£4-8', retail: '£6-15', markup: '170-400%' },
  { item: 'Silicone Bar Mat (full colour)', factoryDirect: '£2-5', intermediary: '£8-15', retail: '£12-25', markup: '300-400%' },
  { item: 'Corrugated FSDU (floor standing)', factoryDirect: '£5-12', intermediary: '£18-30', retail: '£25-50', markup: '260-320%' },
  { item: 'LED Edge-Lit Sign (A3 size)', factoryDirect: '£15-30', intermediary: '£45-80', retail: '£70-120', markup: '200-300%' },
  { item: 'Leather Menu Cover (debossed)', factoryDirect: '£5-12', intermediary: '£18-30', retail: '£25-50', markup: '260-320%' },
  { item: 'Ceramic Water Jug (branded)', factoryDirect: '£4-8', intermediary: '£12-22', retail: '£18-35', markup: '200-340%' },
  { item: 'Counter Card Display (die-cut)', factoryDirect: '£0.80-2', intermediary: '£3-6', retail: '£5-10', markup: '275-400%' }
]

export const POS_TABS = [
  { id: 'directory', label: 'Factory Directory', iconName: 'Factory' },
  { id: 'companies', label: 'POS Companies', iconName: 'Building2' },
  { id: 'sourcing', label: 'Sourcing Platforms', iconName: 'Globe' },
  { id: 'costs', label: 'Cost Benchmarks', iconName: 'DollarSign' },
  { id: 'disruption', label: 'Disruption Strategy', iconName: 'Target' },
  { id: 'clients', label: 'Client Value', iconName: 'Users' }
]

// ── Data Methodology ──
export const DATA_METHODOLOGY = {
  overview: 'Market size estimates synthesized from IWSR Global Spirits Database, Euromonitor Passport Alcoholic Drinks, and DISCUS public disclosures. Growth rates represent year-over-year value change in USD at constant exchange rates unless otherwise stated.',
  pricing: 'Pricing data collected from retailer websites (Tesco, Sainsbury\'s, Waitrose, Master of Malt, Total Wine, Drizly, El Corte Inglés) during April 2026. Prices reflect standard retail, not promotional pricing, unless flagged.',
  sources: [
    { name: 'IWSR Global Spirits Database 2025', description: 'Proprietary database covering 160+ markets with volume and value data by category, price band, and channel.', url: 'https://www.theiwsr.com/global-spirits-report' },
    { name: 'Euromonitor Passport — Alcoholic Drinks', description: 'Market sizing, forecasts, and competitive landscape data for spirits, wine, and beer across 100+ countries.', url: 'https://www.euromonitor.com/alcoholic-drinks' },
    { name: 'DISCUS Annual Economic Briefing', description: 'US spirits industry data: shipments, revenue, state-level trends, and category performance from the Distilled Spirits Council.', url: 'https://www.discus.org/economics/research' },
    { name: 'NielsenIQ Off-Trade Panel', description: 'Retail scanner data from off-premise channels (supermarkets, liquor stores) covering sales volume, value, and distribution metrics.', url: 'https://www.nielseniq.com/global/en/insights/' },
    { name: 'The Spirits Business / Drinks International', description: 'Trade publication market intelligence, brand rankings, and industry trend analysis.', url: 'https://www.thespiritsbusiness.com/category/market-data/' },
    { name: 'OIV (International Organisation of Vine and Wine)', description: 'Global wine production, consumption, and trade statistics. Primary source for wine category data.', url: 'https://www.oiv.int/what-we-do/global-report' },
  ],
  lastUpdated: 'April 2026',
  updateFrequency: 'Quarterly (Jan, Apr, Jul, Oct)',
  disclaimer: 'All market data represents best estimates compiled from multiple public and proprietary sources. Figures may differ from individual source reports due to methodology differences in market definition, exchange rates, and reporting periods.',
}

