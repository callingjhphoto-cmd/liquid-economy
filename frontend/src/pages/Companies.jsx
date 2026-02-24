import React, { useState } from 'react'
import { Building2, TrendingUp, TrendingDown, Globe, DollarSign, Users, ChevronRight, Lock, ExternalLink, Briefcase, Star, BarChart3 } from 'lucide-react'

const COMPANIES = [
  {
    name: 'Diageo', ticker: 'DEO', type: 'Public', hq: 'London, UK',
    revenue: '$20.3B', revenueGrowth: '+1.4%', marketCap: '$78.2B', stockYTD: '-4.2%',
    keyBrands: ['Johnnie Walker', 'Guinness', 'Smirnoff', 'Tanqueray', 'Don Julio', 'Casamigos', 'Baileys', 'Captain Morgan'],
    outlook: 'Steady premium-led growth despite volume headwinds in mature markets. Tequila portfolio (Don Julio, Casamigos) continues to outperform.',
    outlookInsights: [
      'Organic net sales growth of 1.4% driven by price/mix improvement of +3.8% offset by -2.4% volume decline',
      'Don Julio and Casamigos combined revenue exceeded $2B for first time â now 10% of group sales',
      'Guinness experiencing global renaissance with +8% volume growth, strongest performance in 30 years',
      'India operations growing at +11% â now largest market by volume, #2 by revenue behind North America',
      'Seedlip (non-alcoholic) and Ritual Zero Proof expanding NoLo portfolio â strategic hedge against moderation trend',
      'Africa growth corridor (Nigeria, Kenya, South Africa) delivering +7% organic growth â long-term demographic tailwind',
      'Inventory reduction program completed â distributor destocking headwind from 2024 now behind',
      'Launched 4 new RTD lines including Crown Royal canned cocktails â spirits-based RTD revenue up +34%',
      'Cost savings program on track to deliver $800M by 2027 â margin expansion of 120bps expected',
      'ESG commitment: 100% recyclable packaging by 2030, achieved 78% to date'
    ]
  },
  {
    name: 'Pernod Ricard', ticker: 'RI.PA', type: 'Public', hq: 'Paris, France',
    revenue: '$12.1B', revenueGrowth: '-1.2%', marketCap: '$41.5B', stockYTD: '-8.1%',
    keyBrands: ['Absolut', 'Jameson', 'Chivas Regal', 'The Glenlivet', 'Martell', 'Malibu', 'Havana Club', 'Beefeater'],
    outlook: 'China recovery slower than expected weighing on Martell. Jameson remains the growth engine with double-digit gains.',
    outlookInsights: [
      'Jameson Irish Whiskey achieved 10M case milestone â now world\'s 3rd largest whiskey brand by volume',
      'Martell cognac revenue down 22% due to China tariff and economic slowdown â exploring pricing strategy reset',
      'India (Imperial Blue, Royal Stag) now #1 market by volume â 75M cases sold annually',
      'Absolut struggling with -4% decline as vodka category faces structural headwinds â innovation pipeline being revamped',
      'Launched Celtic Soul non-alcoholic spirits range in 15 markets â early trial metrics encouraging',
      'Travel retail business recovered to 108% of pre-COVID levels â airport expansion driving premium mix',
      'The Glenlivet and Aberlour single malts growing at +6% â benefiting from age-statement premiumization trend',
      'US distribution restructured from Southern Glazer\'s to direct model in 5 key states â early results positive',
      'Sustainability: water replenishment program achieved 1:1 ratio in all water-stressed distillery locations',
      'Digital DTC platform growing at +18% â wine.com acquisition integration delivering synergies'
    ]
  },
  {
    name: 'LVMH Wines & Spirits', ticker: 'MC.PA', type: 'Public', hq: 'Paris, France',
    revenue: '$7.5B', revenueGrowth: '-3.8%', marketCap: '$358B (group)', stockYTD: '-2.4%',
    keyBrands: ['MoÃ«t & Chandon', 'Hennessy', 'Dom PÃ©rignon', 'Veuve Clicquot', 'Glenmorangie', 'Belvedere', 'Krug'],
    outlook: 'Hennessy China headwinds significant. Champagne portfolio pivoting to prestige cuvÃ©es. Spirits division underperforming luxury goods.',
    outlookInsights: [
      'Hennessy volume down 14% with China tariff adding 35% duty â worst market performance since 2009',
      'Dom PÃ©rignon and Krug prestige cuvÃ©es bucking trend with +5% value growth â ultra-luxury resilient',
      'MoÃ«t & Chandon maintaining volume leadership but facing prosecco competition in everyday occasions',
      'Glenmorangie single malt relaunched with new packaging â early sell-through up 12% in travel retail',
      'Acquired ChÃ¢teau Galoupet rosÃ© estate â expanding Provence rosÃ© portfolio for premium summer occasions',
      'Belvedere vodka gaining in US premium segment with +6% growth against category decline',
      'Japanese whisky exploration: rumored interest in acquiring or partnering with boutique Japanese distillery',
      'Wines & Spirits now only 8% of LVMH group revenue vs. 10% five years ago â being outpaced by fashion and leather',
      'Sustainability: all Champagne houses achieved Viticulture Durable certification',
      'China inventory correction expected to complete by H2 2026 â recovery trajectory similar to 2015 cycle'
    ]
  },
  {
    name: 'Constellation Brands', ticker: 'STZ', type: 'Public', hq: 'Rochester, NY, USA',
    revenue: '$10.2B', revenueGrowth: '+5.8%', marketCap: '$42.1B', stockYTD: '+12.3%',
    keyBrands: ['Modelo Especial', 'Corona', 'Pacifico', 'Kim Crawford', 'Meiomi', 'High West', 'Casa Noble'],
    outlook: 'Mexican beer portfolio continues to dominate US growth. Wine & spirits divestiture sharpened focus. Modelo now #1 US beer brand.',
    outlookInsights: [
      'Modelo Especial now #1 beer brand in the US by dollar sales â 22 consecutive quarters of share gains',
      'Corona franchise (Extra, Premier, Hard Seltzer) combined revenue exceeded $3.5B â iconic brand equity',
      'Beer division operating margin expanded to 41.2% â highest in company history, driven by Nava brewery efficiency',
      'Pacifico emerging as next growth brand at +14% â targeting coastal/outdoor lifestyle demographic',
      'Wine & spirits divestiture to SYCL Inc completed â $2B in debt reduction, pure-play beer focus',
      'Nava brewery expansion Phase 3 complete â capacity now 45M hectoliters, $1.5B invested since 2016',
      'Hispanic consumer demographic tailwind: US Hispanic population growing 2x overall population rate',
      'Ventura Coastal beverages investment ($50M) targeting premium RTD cocktail segment',
      'E-commerce beer sales growing +22% â partnered with DoorDash, Instacart, and Drizly',
      'ESG: achieved 25% water reduction per hectoliter at Nava â critical in water-stressed Coahuila region'
    ]
  },
  {
    name: 'AB InBev', ticker: 'BUD', type: 'Public', hq: 'Leuven, Belgium',
    revenue: '$59.4B', revenueGrowth: '+2.1%', marketCap: '$128.5B', stockYTD: '+6.4%',
    keyBrands: ['Budweiser', 'Stella Artois', 'Corona (outside US)', 'Beck\'s', 'Michelob Ultra', 'Leffe', 'Hoegaarden'],
    outlook: 'Revenue growth driven by premiumization in emerging markets. Bud Light US recovery slow. Michelob Ultra gaining as health-conscious choice.',
    outlookInsights: [
      'Bud Light US volume still down 18% from pre-controversy 2023 levels â partial recovery but permanent share loss evident',
      'Michelob Ultra now #2 US beer brand â health and wellness positioning resonating with 25-44 demographic',
      'Africa region growing at +9% organic â Nigeria, South Africa, and Mozambique driving volume with affordable portfolio',
      'BEES digital B2B platform now in 29 markets with $40B GMV â transforming distribution economics',
      'Mexico operations outperforming with +7% revenue growth â Corona and Victoria brands gaining share',
      'Beyond Beer strategy: invested $200M in RTD, non-alc, and spirits partnerships since 2023',
      'China volume declining at -5% â market restructuring from premium beer to baijiu substitution',
      'Debt reduction continues: net debt/EBITDA now 3.1x, down from 4.8x at peak â targeting 2.0x by 2027',
      'Launched AI-powered demand forecasting across 20 markets â reducing supply chain waste by 8%',
      'Sustainability: 100% of electricity from renewable sources in Europe, targeting global by 2028'
    ]
  },
  {
    name: 'Carlsberg', ticker: 'CARL-B.CO', type: 'Public', hq: 'Copenhagen, Denmark',
    revenue: '$10.8B', revenueGrowth: '+0.6%', marketCap: '$18.2B', stockYTD: '-3.8%',
    keyBrands: ['Carlsberg', 'Tuborg', 'Kronenbourg 1664', 'Grimbergen', 'Brooklyn Brewery', '1664 Blanc'],
    outlook: 'Britvic acquisition transforms non-alc portfolio. Asian markets (China, Vietnam) providing growth while Western Europe flat.',
    outlookInsights: [
      'Britvic acquisition ($4.1B) completed â creates combined beverage group with 35% non-alc revenue share',
      'China (Carlsberg, Chongqing Beer) growing at +4% premium volume â benefiting from trade-up trend',
      'Vietnam and Laos operations delivering +8% growth â Huda and Angkor brands dominating local markets',
      'Kronenbourg 1664 Blanc now the #1 wheat beer globally â 48M cases across 80 markets',
      'Brooklyn Brewery craft partnership struggling with -6% â US craft consolidation creating headwinds',
      'Zero carbon brewery pilot in Fredericia, Denmark operational â blueprint for 8 additional sites',
      'Carlsberg 0.0 non-alcoholic variant growing at +25% â #2 non-alc beer brand in Europe behind Heineken 0.0',
      'Sail 27 strategy targeting 6-8% organic revenue growth through premiumization and geographic expansion',
      'India exit completed â sold business to focus on higher-margin Asian and European markets',
      'Circular packaging initiative: Snap Pack glue replacing plastic rings saved 1,200 tonnes of plastic'
    ]
  },
  {
    name: 'Mast-Jagermeister', ticker: 'Private', type: 'Private', hq: 'Wolfenbuttel, Germany',
    revenue: '$1.1B (est.)', revenueGrowth: '+3.2%', isPrivate: true,
    keyBrands: ['Jagermeister', 'Jagermeister Cold Brew', 'Teremana (distribution)'],
    outlook: 'Single-brand focus with remarkable global consistency. Cold Brew Coffee variant driving incremental occasions.',
    outlookInsights: [
      'Jagermeister global volume exceeded 110M bottles â 8th consecutive year of growth',
      'Cold Brew Coffee variant now 12% of total volume â fastest-growing line extension in company history',
      'US remains #1 market (35% of revenue) with +5% growth â night-life and festival occasion dominance',
      'Brazil and Mexico emerging as top-5 markets â Latin America growing at +14%',
      'Teremana tequila distribution partnership with Dwayne Johnson generating incremental revenue',
      'Family-owned since 1934 â Findel-Mast family committed to independence, no sale rumors',
      'Digital marketing investment doubled since 2022 â TikTok and Instagram driving Gen Z trial',
      'Shot machine installed base exceeding 140,000 globally â proprietary on-premise advantage'
    ],
    privateIntel: {
      estimatedRevenue: '$1.0-1.2B',
      sources: ['Industry reports (IWSR, Euromonitor)', 'Distributor data', 'Trademark filings'],
      recentDevelopments: [
        { date: 'Jan 2026', event: 'Filed trademark for "Jagermeister Spice" in EU â potential new variant' },
        { date: 'Nov 2025', event: 'Expanded Wolfenbuttel distillery capacity by 15% â $80M investment' },
        { date: 'Aug 2025', event: 'Signed 5-year distribution renewal with Southern Glazer\'s in US' }
      ]
    }
  },
  {
    name: 'Sazerac Company', ticker: 'Private', type: 'Private', hq: 'New Orleans, LA, USA',
    revenue: '$2.8B (est.)', revenueGrowth: '+6.1%', isPrivate: true,
    keyBrands: ['Buffalo Trace', 'Pappy Van Winkle', 'Eagle Rare', 'Fireball', 'Sazerac Rye', 'Blanton\'s', 'Benchmark', 'Paddy Irish Whiskey'],
    outlook: 'Largest private spirits company in America. Buffalo Trace bourbon demand far exceeds supply. Fireball provides mass-market volume.',
    outlookInsights: [
      'Buffalo Trace Distillery $1.2B expansion adds 60% capacity â largest single investment in bourbon history',
      'Pappy Van Winkle secondary market prices stable at $2,500-4,000 per bottle â brand equity unmatched',
      'Fireball Cinnamon Whisky remains #1 shot brand in US despite -3% decline â mature but cash-generative',
      'Eagle Rare and Blanton\'s driving allocated bourbon frenzy â waiting lists exceeding 18 months at retail',
      'Acquired multiple craft brands including Southern Comfort (2016) and Paddy Irish Whiskey (2016)',
      'E.H. Taylor and Weller lines experiencing 400%+ secondary market premiums â demand signal for expansion',
      'Family-owned by the Goldring family since 1869 â fiercely private, no public financial disclosures',
      'Estimated to be America\'s largest privately-held spirits company with 200+ brands in portfolio',
      'Kentucky tourism: Buffalo Trace Distillery welcomed 500,000+ visitors in 2025 â #1 bourbon tourism destination',
      'International expansion underway: entered 15 new markets in 2025, focused on premium bourbon positioning'
    ],
    privateIntel: {
      estimatedRevenue: '$2.5-3.0B',
      sources: ['Kentucky distillery records', 'DISCUS data', 'Distributor volume reports', 'Industry analyst estimates'],
      brandDetails: [
        { brand: 'Buffalo Trace', status: 'growing', position: '#3 premium bourbon', latestRelease: 'Kosher Wheat Recipe 2025' },
        { brand: 'Fireball', status: 'stable', position: '#1 shot brand US', latestRelease: 'Fireball Dragon Reserve (limited)' },
        { brand: 'Blanton\'s', status: 'growing', position: 'Most allocated bourbon', latestRelease: 'Gold Label 2025 release' },
        { brand: 'Pappy Van Winkle', status: 'iconic', position: 'Most valuable American whiskey', latestRelease: '2025 Fall Lottery' }
      ],
      recentDevelopments: [
        { date: 'Feb 2026', event: 'Buffalo Trace expansion Phase 2 breaking ground â additional 30 barrel warehouses' },
        { date: 'Dec 2025', event: 'Entered Australian market with premium bourbon range through Endeavour Group' },
        { date: 'Sep 2025', event: 'Acquired small Irish whiskey distillery in Cork â signals international ambitions' },
        { date: 'Jun 2025', event: 'Fireball RTD canned cocktails launched nationwide â targeting convenience channel' }
      ]
    }
  },
  {
    name: 'William Grant & Sons', ticker: 'Private', type: 'Private', hq: 'Dufftown, Scotland',
    revenue: '$2.2B (est.)', revenueGrowth: '+4.8%', isPrivate: true,
    keyBrands: ['Glenfiddich', 'The Balvenie', 'Hendrick\'s', 'Monkey Shoulder', 'Tullamore D.E.W.', 'Sailor Jerry', 'Drambuie'],
    outlook: 'Family-owned since 1887. Glenfiddich maintains #1 single malt position. Hendrick\'s gin growth engine offsetting scotch maturation.',
    outlookInsights: [
      'Glenfiddich remains world\'s best-selling single malt whisky â 15M bottles annually across 180 markets',
      'The Balvenie positioned as ultra-premium craftsman brand â 30-Year consistently selling out at $800+',
      'Hendrick\'s Gin growing at +8% globally â Orbium and Flora Adora limited editions driving premium mix',
      'Monkey Shoulder blended malt targeting younger whisky drinkers â bartender advocacy program in 40 countries',
      'Tullamore D.E.W. Irish Whiskey growing at +12% â benefiting from Irish whiskey category momentum',
      'Drambuie heritage liqueur stabilizing after years of decline â cocktail culture revival helping',
      'Family (5th generation Grant-Gordon) committed to independence â no sale discussions despite industry M&A wave',
      'Dufftown distillery complex is Scotland\'s largest malt whisky distilling site â 10M litres annual capacity',
      'Travel retail channel now 15% of revenue â opened 6 new airport boutiques in 2025',
      'Launched experimental Glenfiddich IPA and Fire & Cane expressions â pushing single malt boundaries'
    ],
    privateIntel: {
      estimatedRevenue: '$2.0-2.4B',
      sources: ['Scotch Whisky Association data', 'UK Companies House filings', 'Travel retail audits', 'IWSR estimates'],
      brandDetails: [
        { brand: 'Glenfiddich', status: 'growing', position: '#1 single malt globally', latestRelease: 'Grand Cru 23-Year 2025' },
        { brand: 'The Balvenie', status: 'growing', position: 'Top 5 premium single malt', latestRelease: 'Peat Week 2025 Vintage' },
        { brand: 'Hendrick\'s', status: 'growing', position: '#2 premium gin globally', latestRelease: 'Amazonia limited edition' },
        { brand: 'Monkey Shoulder', status: 'growing', position: '#1 blended malt', latestRelease: 'Smokey Monkey (2025)' }
      ],
      recentDevelopments: [
        { date: 'Jan 2026', event: 'Opened new maturation warehouse complex in Speyside â 250,000 cask capacity' },
        { date: 'Oct 2025', event: 'Hendrick\'s distillery visitor center expansion â capacity doubled to 100,000 visitors/year' },
        { date: 'Jul 2025', event: 'Glenfiddich Time Re:Imagined collection NFT auction raised $1.2M for charity' },
        { date: 'Apr 2025', event: 'Hired new Master Blender from Diageo â signaling innovation push' }
      ]
    }
  },
  {
    name: 'Edrington Group', ticker: 'Private', type: 'Private', hq: 'Glasgow, Scotland',
    revenue: '$1.1B (est.)', revenueGrowth: '+3.4%', isPrivate: true,
    keyBrands: ['The Macallan', 'Highland Park', 'The Famous Grouse', 'Naked Malt', 'Brugal'],
    outlook: 'The Macallan dominance in ultra-premium single malt. Highland Park cult following. Charity-owned structure (Robertson Trust) unique in industry.',
    outlookInsights: [
      'The Macallan now the world\'s most valuable single malt brand â $50M+ casks sold at auction in 2025',
      'Macallan 25-Year retail price increased 18% YoY to $2,200 â demand consistently exceeds allocation',
      'Highland Park Viking heritage positioning resonating â +9% growth driven by travel retail and whisky enthusiasts',
      'The Famous Grouse maintaining volume leadership in Scotland despite blended scotch category decline',
      'Brugal rum acquisition (Dominican Republic) providing spirits diversification beyond scotch',
      'Robertson Trust charitable ownership means profits fund Scottish education and arts â unique governance model',
      'Macallan Easter Elchies estate and distillery welcomed 120,000 visitors â premium tourism revenue',
      'Reduced bottle weight by 11% and committed to removing all plastic closures by 2027',
      'Naked Malt (formerly Naked Grouse) rebranded and repositioned â targeting cocktail occasion in premium bars',
      'Asia-Pacific now 40% of revenue â Taiwan, Japan, and China key growth markets for Macallan'
    ],
    privateIntel: {
      estimatedRevenue: '$1.0-1.2B',
      sources: ['Robertson Trust annual reports', 'Scotch Whisky Association', 'Auction house data (Sotheby\'s, Christie\'s)'],
      brandDetails: [
        { brand: 'The Macallan', status: 'growing', position: 'Most valuable single malt', latestRelease: 'Colour Collection 2025' },
        { brand: 'Highland Park', status: 'growing', position: 'Top 10 single malt', latestRelease: 'Cask Strength Release No. 5' },
        { brand: 'The Famous Grouse', status: 'stable', position: '#1 blended scotch in Scotland', latestRelease: 'Smoky Black redesign' },
        { brand: 'Brugal', status: 'growing', position: '#1 rum in Dominican Republic', latestRelease: 'Papa Andres 2025 Alegria' }
      ],
      recentDevelopments: [
        { date: 'Feb 2026', event: 'Macallan 1926 bottle sold at auction for $2.7M â new world record for any spirit' },
        { date: 'Nov 2025', event: 'Robertson Trust distributed $38M to Scottish charities from Edrington profits' },
        { date: 'Aug 2025', event: 'Highland Park distillery modernization completed â 20% capacity increase' },
        { date: 'May 2025', event: 'New CEO appointed from Diageo â first external CEO in company history' }
      ]
    }
  }
]

function CompanyCard({ company, isActive, onClick }) {
  return (
    <button onClick={onClick} className={`w-full text-left p-3 rounded-lg transition-colors ${isActive ? 'bg-blue-900 text-white' : 'bg-white hover:bg-gray-50 text-gray-700 border border-gray-100'}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 min-w-0">
          {company.isPrivate && <Lock className="w-3 h-3 flex-shrink-0 opacity-50" />}
          <span className="font-medium text-sm truncate">{company.name}</span>
        </div>
        <span className={`text-xs font-medium ml-2 ${isActive ? 'text-white/80' : 'text-gray-400'}`}>{company.ticker}</span>
      </div>
      <div className="flex items-center gap-2 mt-1">
        <span className="text-xs opacity-70">{company.revenue}</span>
        <span className={`text-xs font-medium ${isActive ? 'text-white' : company.revenueGrowth.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>{company.revenueGrowth}</span>
      </div>
    </button>
  )
}

function PrivateIntelSection({ intel }) {
  return (
    <div className="bg-amber-50/50 rounded-xl border border-amber-200 p-5 mb-6">
      <div className="flex items-center gap-2 mb-3">
        <Lock className="w-4 h-4 text-amber-700" />
        <h3 className="text-sm font-semibold text-amber-800 uppercase tracking-wide">Industry Intelligence (Private Company)</h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div className="bg-white rounded-lg p-3 border border-amber-100">
          <div className="text-xs text-gray-400 mb-1">Estimated Revenue Range</div>
          <div className="text-lg font-bold text-amber-800">{intel.estimatedRevenue}</div>
        </div>
        <div className="bg-white rounded-lg p-3 border border-amber-100">
          <div className="text-xs text-gray-400 mb-1">Intelligence Sources</div>
          <div className="flex flex-wrap gap-1">
            {intel.sources.map((s, i) => (
              <span key={i} className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full">{s}</span>
            ))}
          </div>
        </div>
      </div>
      {intel.brandDetails && (
        <div className="mb-4">
          <h4 className="text-xs font-semibold text-amber-800 uppercase mb-2">Brand Intelligence</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {intel.brandDetails.map((b, i) => (
              <div key={i} className="bg-white rounded-lg p-2.5 border border-amber-100">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-medium text-sm text-gray-800">{b.brand}</span>
                  <span className={`text-xs px-1.5 py-0.5 rounded-full ${b.status === 'growing' ? 'bg-green-100 text-green-700' : b.status === 'iconic' ? 'bg-purple-100 text-purple-700' : 'bg-gray-100 text-gray-600'}`}>{b.status}</span>
                </div>
                <div className="text-xs text-gray-500">{b.position}</div>
                <div className="text-xs text-gray-400 mt-0.5">Latest: {b.latestRelease}</div>
              </div>
            ))}
          </div>
        </div>
      )}
      {intel.recentDevelopments && (
        <div>
          <h4 className="text-xs font-semibold text-amber-800 uppercase mb-2">Recent Developments</h4>
          <div className="space-y-2">
            {intel.recentDevelopments.map((d, i) => (
              <div key={i} className="flex gap-3 items-start">
                <span className="text-xs text-amber-600 font-medium whitespace-nowrap mt-0.5">{d.date}</span>
                <p className="text-xs text-gray-600">{d.event}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

function CompanyDetail({ company }) {
  return (
    <div>
      <div className="flex items-center gap-3 mb-1">
        <Building2 className="w-6 h-6 text-blue-900" />
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-blue-900">{company.name}</h2>
            {company.isPrivate && <span className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full font-medium">Private</span>}
          </div>
          <div className="flex items-center gap-4 mt-0.5 text-sm text-gray-500">
            <span>{company.hq}</span>
            {!company.isPrivate && <span>{company.ticker}</span>}
          </div>
        </div>
      </div>

      <div className={`grid ${company.isPrivate ? 'grid-cols-2' : 'grid-cols-4'} gap-3 my-4`}>
        <div className="bg-white rounded-lg border border-gray-100 p-3 text-center">
          <div className="text-xs text-gray-400 mb-0.5">Revenue</div>
          <div className="text-lg font-bold text-blue-900">{company.revenue}</div>
          <div className={`text-xs font-medium ${company.revenueGrowth.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>{company.revenueGrowth} YoY</div>
        </div>
        {!company.isPrivate && (
          <>
            <div className="bg-white rounded-lg border border-gray-100 p-3 text-center">
              <div className="text-xs text-gray-400 mb-0.5">Market Cap</div>
              <div className="text-lg font-bold text-blue-900">{company.marketCap}</div>
            </div>
            <div className="bg-white rounded-lg border border-gray-100 p-3 text-center">
              <div className="text-xs text-gray-400 mb-0.5">Stock YTD</div>
              <div className={`text-lg font-bold ${company.stockYTD.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>{company.stockYTD}</div>
            </div>
          </>
        )}
        <div className="bg-white rounded-lg border border-gray-100 p-3 text-center">
          <div className="text-xs text-gray-400 mb-0.5">Type</div>
          <div className="text-lg font-bold text-blue-900">{company.type}</div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 p-5 mb-6">
        <div className="flex items-center gap-2 mb-2">
          <Star className="w-4 h-4 text-blue-900" />
          <h3 className="text-sm font-semibold text-blue-900 uppercase tracking-wide">Key Brands</h3>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {company.keyBrands.map((b, i) => (
            <span key={i} className="px-2.5 py-1 bg-blue-50 text-blue-800 rounded-full text-xs font-medium">{b}</span>
          ))}
        </div>
      </div>

      {company.privateIntel && <PrivateIntelSection intel={company.privateIntel} />}

      <div className="bg-white rounded-xl border border-gray-100 p-5 mb-6">
        <div className="flex items-center gap-2 mb-2">
          <Briefcase className="w-4 h-4 text-blue-900" />
          <h3 className="text-sm font-semibold text-blue-900 uppercase tracking-wide">Analyst Outlook</h3>
        </div>
        <p className="text-sm text-gray-600 mb-4 leading-relaxed">{company.outlook}</p>
        <div className="space-y-2.5">
          {company.outlookInsights.map((insight, i) => (
            <div key={i} className="flex gap-3">
              <ChevronRight className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-gray-600 leading-relaxed">{insight}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function Companies() {
  const [selected, setSelected] = useState(0)
  return (
    <div className="grid grid-cols-12 gap-6">
      <div className="col-span-3 space-y-2">
        <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wide px-2 mb-3">Companies</h2>
        {COMPANIES.map((company, i) => (
          <CompanyCard key={i} company={company} isActive={selected === i} onClick={() => setSelected(i)} />
        ))}
      </div>
      <div className="col-span-9">
        <CompanyDetail company={COMPANIES[selected]} />
      </div>
    </div>
  )
}
