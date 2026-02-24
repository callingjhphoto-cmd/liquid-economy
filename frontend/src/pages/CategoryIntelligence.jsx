import React, { useState } from 'react'
import { Wine, Beer, Martini, Flame, Grape, Leaf, Zap, TrendingUp, TrendingDown, Minus, Globe, BarChart3, ShoppingCart, Users, Star, ChevronRight } from 'lucide-react'

const CATEGORIES = [
  {
    key: 'tequila', label: 'Tequila & Mezcal', emoji: 'ðµ',
    marketSize: '$4.8B', growth: '+7.8%', growthDir: 'up',
    trajectory: 'Fastest-growing spirits category globally. Premium and ultra-premium segments now represent 45% of volume, up from 28% five years ago. Mezcal emerging as artisanal subcategory with 18% CAGR.',
    topMarkets: [{ name: 'United States', growth: '+9.2%' }, { name: 'Mexico', growth: '+4.1%' }, { name: 'Spain', growth: '+12.8%' }, { name: 'Germany', growth: '+15.3%' }, { name: 'UK', growth: '+11.4%' }],
    brands: ['PatrÃ³n', 'Don Julio', 'Clase Azul', 'Casamigos', 'EspolÃ²n', 'Del Maguey', 'Fortaleza', 'Casa Noble'],
    channels: { onTrade: 42, offTrade: 48, ecommerce: 10 },
    trends: [
      'Agave shortage easing â 4-year planting cycle from 2020 boom now maturing, prices down 22% from peak',
      'Celebrity brands saturating market â over 40 celebrity-backed tequilas launched since 2020',
      'Additive-free certification becoming table stakes for premium positioning',
      'Mezcal denominations of origin expanding beyond Oaxaca to 9 Mexican states',
      'Cristalino (filtered aÃ±ejo) fastest-growing sub-segment at +24% YoY'
    ]
  },
  {
    key: 'vodka', label: 'Vodka', emoji: 'ð§',
    marketSize: '$40.1B', growth: '-0.8%', growthDir: 'down',
    trajectory: 'Mature category experiencing volume decline but value growth through premiumization. Flavored vodka declining while premium unflavored and craft vodka gaining share. RTD cannibalization a key headwind.',
    topMarkets: [{ name: 'United States', growth: '-1.2%' }, { name: 'Russia', growth: '+0.4%' }, { name: 'Poland', growth: '+1.8%' }, { name: 'India', growth: '+6.2%' }, { name: 'UK', growth: '-2.1%' }],
    brands: ['Smirnoff', 'Absolut', 'Grey Goose', 'Tito\'s', 'Belvedere', 'Ketel One', 'Stolichnaya', 'New Amsterdam'],
    channels: { onTrade: 35, offTrade: 55, ecommerce: 10 },
    trends: [
      'Tito\'s now #1 spirit brand in US by volume â category-defining success in craft positioning',
      'Premiumization driving value growth despite volume decline â average price per bottle up 4.7%',
      'Flavored variants declining at -6% while premium unflavored grows at +3%',
      'RTD cocktails cannibalizing entry-level vodka occasion â Moscow Mule kits especially impacted',
      'Sustainability messaging becoming differentiator â carbon-neutral distilling and organic grain sourcing'
    ]
  },
  {
    key: 'gin', label: 'Gin', emoji: 'ð«',
    marketSize: '$14.2B', growth: '+1.2%', growthDir: 'up',
    trajectory: 'Post-boom plateau after explosive 2015-2021 growth. UK market saturated with 900+ brands. Growth now shifting to Southern Europe and Asia-Pacific. Pink gin declining, classic London Dry resurgent.',
    topMarkets: [{ name: 'Spain', growth: '+2.8%' }, { name: 'Philippines', growth: '+5.1%' }, { name: 'UK', growth: '-0.4%' }, { name: 'South Africa', growth: '+7.2%' }, { name: 'India', growth: '+9.8%' }],
    brands: ['Tanqueray', 'Hendrick\'s', 'Bombay Sapphire', 'Beefeater', 'Monkey 47', 'The Botanist', 'Roku', 'Sipsmith'],
    channels: { onTrade: 45, offTrade: 45, ecommerce: 10 },
    trends: [
      'UK market consolidating â 120+ gin brands exited in 2025, down from peak of 930 active brands',
      'Japanese gin (Roku, Ki No Bi) fastest-growing origin category at +14% globally',
      'Non-alcoholic gin now 8% of UK gin sales â Seedlip and Lyre\'s leading',
      'Pink gin declining at -11% â consumers returning to botanical-forward classic styles',
      'Gin tourism established in Scotland and Spain â 200+ distillery visitor centers globally'
    ]
  },
  {
    key: 'whisky', label: 'Whisky', emoji: 'ð¥',
    marketSize: '$6.3B exports', growth: '+4.2%', growthDir: 'up',
    trajectory: 'Resilient global growth driven by premiumization and geographic expansion. American whiskey surpassing Scotch in key markets. Japanese whisky supply constraints easing. Irish whiskey maintaining double-digit growth.',
    topMarkets: [{ name: 'United States', growth: '+5.1%' }, { name: 'India', growth: '+8.4%' }, { name: 'France', growth: '+2.2%' }, { name: 'Japan', growth: '+3.8%' }, { name: 'Taiwan', growth: '+6.7%' }],
    brands: ['Johnnie Walker', 'Jack Daniel\'s', 'Jameson', 'Maker\'s Mark', 'Glenfiddich', 'Suntory Yamazaki', 'Macallan', 'Bulleit', 'Woodford Reserve'],
    channels: { onTrade: 40, offTrade: 50, ecommerce: 10 },
    trends: [
      'Bourbon and American whiskey now outselling Scotch in 6 European markets â cultural shift accelerating',
      'Japanese whisky supply improving â Suntory and Nikka both expanded distillery capacity 30% since 2022',
      'Indian single malt whisky (Amrut, Paul John) gaining international recognition and shelf space',
      'Age-statement premiums increasing â 12-year+ expressions commanding 3.5x price vs. NAS',
      'Whisky investment market cooling â rare bottle index down 8% from 2024 peak'
    ]
  },
  {
    key: 'rum', label: 'Rum', emoji: 'ðï¸',
    marketSize: '$15.8B', growth: '+3.1%', growthDir: 'up',
    trajectory: 'Renaissance category driven by premium dark and aged rum. Caribbean provenance and terroir storytelling gaining traction. Spiced rum stable. White rum declining as RTD cocktails grow.',
    topMarkets: [{ name: 'India', growth: '+4.8%' }, { name: 'United States', growth: '+3.2%' }, { name: 'Philippines', growth: '+2.1%' }, { name: 'UK', growth: '+4.5%' }, { name: 'Germany', growth: '+5.8%' }],
    brands: ['Bacardi', 'Captain Morgan', 'Havana Club', 'Diplomatico', 'Mount Gay', 'Appleton Estate', 'Ron Zacapa', 'Plantation'],
    channels: { onTrade: 38, offTrade: 52, ecommerce: 10 },
    trends: [
      'Premium aged rum (+$40) fastest-growing sub-segment at +12% â borrowing whisky\'s premiumization playbook',
      'Rhum agricole gaining recognition outside traditional French Caribbean markets',
      'Spiced rum plateau â Captain Morgan flat, Kraken declining as novelty fades',
      'Caribbean climate risk to sugarcane supply â Hurricane season 2025 caused 6% yield reduction',
      'Rum bars and tasting rooms proliferating in London, Berlin, and NYC â 40+ specialty venues opened 2025'
    ]
  },
  {
    key: 'cognac', label: 'Cognac & Brandy', emoji: 'ð·',
    marketSize: '$4.1B', growth: '-2.4%', growthDir: 'down',
    trajectory: 'Challenged by China tariff headwinds and generational shift in US urban markets. Hennessy and RÃ©my Martin dominating with 80%+ market share. VS/VSOP declining, XO holding. Brandy diversification emerging.',
    topMarkets: [{ name: 'United States', growth: '-1.8%' }, { name: 'China', growth: '-12.4%' }, { name: 'Singapore', growth: '+3.2%' }, { name: 'Nigeria', growth: '+5.1%' }, { name: 'UK', growth: '+1.4%' }],
    brands: ['Hennessy', 'RÃ©my Martin', 'Martell', 'Courvoisier', 'D\'UssÃ©', 'Camus', 'Torres (Brandy)', 'St-RÃ©my'],
    channels: { onTrade: 35, offTrade: 55, ecommerce: 10 },
    trends: [
      'China 35% tariff on EU brandy devastating â RÃ©my Martin China revenue down 28% in H1 2025',
      'US hip-hop cultural association weakening as younger demographics shift to tequila and RTDs',
      'XO and prestige cuvÃ©es holding value â average price up 6% while VS declines 3%',
      'African markets (Nigeria, Ghana, South Africa) emerging as next growth frontier',
      'Non-Cognac brandy (Armagnac, Calvados, pisco) gaining bartender mindshare'
    ]
  },
  {
    key: 'champagne', label: 'Champagne & Sparkling', emoji: 'ð¥',
    marketSize: '$7.2B', growth: '+2.8%', growthDir: 'up',
    trajectory: 'Prosecco now outselling Champagne by volume globally. Champagne houses pivoting to prestige cuvÃ©es as margin play. English sparkling and CrÃ©mant gaining credibility. Cava restructuring quality tiers.',
    topMarkets: [{ name: 'France', growth: '+1.2%' }, { name: 'United States', growth: '+4.1%' }, { name: 'UK', growth: '+3.5%' }, { name: 'Japan', growth: '+5.8%' }, { name: 'Italy (Prosecco)', growth: '+6.2%' }],
    brands: ['MoÃ«t & Chandon', 'Veuve Clicquot', 'Dom PÃ©rignon', 'Prosecco DOC', 'Freixenet', 'Nyetimber', 'Laurent-Perrier', 'Bollinger'],
    channels: { onTrade: 48, offTrade: 42, ecommerce: 10 },
    trends: [
      'Prosecco DOC volume now 2.5x Champagne globally â price accessibility driving everyday occasion capture',
      'English sparkling wine production doubled since 2020 â Nyetimber, Chapel Down, Gusbourne gaining Michelin placement',
      'Champagne grower-producer (RM) movement growing â 15% of US imports now non-grande marque',
      'Climate change improving English/Scandinavian vineyards while stressing traditional Champagne yields',
      'Zero-dosage and low-sugar sparklings trending with health-conscious consumers'
    ]
  },
  {
    key: 'wine', label: 'Wine', emoji: 'ð',
    marketSize: '$38.2B', growth: '-1.2%', growthDir: 'down',
    trajectory: 'Structural decline in volume offset partially by premiumization. Younger demographics drinking less wine and more spirits/RTDs. Bulk wine market contracting. Premium ($15+) segment growing. Natural wine movement reshaping indie retail.',
    topMarkets: [{ name: 'United States', growth: '-0.8%' }, { name: 'France', growth: '-2.1%' }, { name: 'UK', growth: '-1.5%' }, { name: 'China', growth: '-4.2%' }, { name: 'Germany', growth: '-1.8%' }],
    brands: ['Yellow Tail', 'Barefoot', 'Penfolds', 'Opus One', 'ChÃ¢teau Margaux', 'Cloudy Bay', 'Meiomi', 'Josh Cellars'],
    channels: { onTrade: 35, offTrade: 52, ecommerce: 13 },
    trends: [
      'Gen Z and Millennial wine consumption 23% lower than Boomers at same age â existential category threat',
      'Premium wines ($15-25) growing at +4% while sub-$10 wines declining at -6%',
      'Natural wine now 4% of total market, up from 1% in 2019 â driving indie retail foot traffic',
      'Direct-to-consumer (DTC) channel growing at +8% â wineries bypassing traditional distribution',
      'EU vine-pull scheme paying growers to uproot 8% of vineyards to reduce structural surplus'
    ],
    varietals: [
      { name: 'Chardonnay', volumeShare: '14.2%', growth: '-0.5%', topRegions: 'Burgundy, California, Australia' },
      { name: 'Pinot Noir', volumeShare: '8.8%', growth: '+2.1%', topRegions: 'Burgundy, Oregon, New Zealand' },
      { name: 'Cabernet Sauvignon', volumeShare: '12.5%', growth: '-1.8%', topRegions: 'Bordeaux, Napa, Chile' },
      { name: 'Merlot', volumeShare: '7.2%', growth: '-3.2%', topRegions: 'Bordeaux, Chile, Italy' },
      { name: 'Sauvignon Blanc', volumeShare: '9.1%', growth: '+1.4%', topRegions: 'Marlborough, Loire, South Africa' },
      { name: 'Riesling', volumeShare: '3.8%', growth: '+0.8%', topRegions: 'Germany, Alsace, Australia' }
    ],
    countries: [
      { name: 'France', value: '$11.2B', growth: '-2.1%', regions: 'Bordeaux, Burgundy, RhÃ´ne, Loire, Champagne' },
      { name: 'Italy', value: '$8.1B', growth: '-0.4%', regions: 'Tuscany, Piedmont, Veneto, Sicily' },
      { name: 'Spain', value: '$3.8B', growth: '-1.8%', regions: 'Rioja, Ribera del Duero, Priorat, RÃ­as Baixas' },
      { name: 'United States', value: '$5.2B', growth: '+0.8%', regions: 'Napa, Sonoma, Oregon, Washington' },
      { name: 'Argentina', value: '$1.4B', growth: '+2.2%', regions: 'Mendoza, Salta, Patagonia' },
      { name: 'Australia', value: '$2.1B', growth: '-3.4%', regions: 'Barossa, McLaren Vale, Hunter Valley' },
      { name: 'Chile', value: '$1.8B', growth: '+0.6%', regions: 'Maipo, Colchagua, Casablanca' },
      { name: 'South Africa', value: '$1.1B', growth: '+3.8%', regions: 'Stellenbosch, Swartland, Walker Bay' }
    ]
  },
  {
    key: 'beer', label: 'Beer & Craft', emoji: 'ðº',
    marketSize: '$623B', growth: '+1.4%', growthDir: 'up',
    trajectory: 'Macro lager stable through emerging market volume. Craft beer consolidating in mature markets â US craft count peaked at 9,700 and declining. Mexican beer (Modelo, Corona) dominant US growth story. Non-alc beer fastest-growing segment.',
    topMarkets: [{ name: 'China', growth: '+0.8%' }, { name: 'United States', growth: '+1.2%' }, { name: 'Brazil', growth: '+2.4%' }, { name: 'Mexico', growth: '+3.1%' }, { name: 'Germany', growth: '-0.6%' }],
    brands: ['Budweiser', 'Heineken', 'Corona', 'Modelo Especial', 'Stella Artois', 'Guinness', 'Asahi', 'BrewDog'],
    channels: { onTrade: 42, offTrade: 52, ecommerce: 6 },
    trends: [
      'Modelo Especial now #1 selling beer in the US â surpassed Bud Light in 2023 and extending lead',
      'US craft brewery count declining for first time â 340 closures in 2025, consolidation accelerating',
      'Non-alcoholic beer fastest-growing beer segment at +18% â Athletic Brewing valued at $800M',
      'African beer market growing at +5% â Nigeria, Ethiopia, and Kenya driving new capacity investment',
      'Hard seltzer market contracted 15% from 2022 peak â White Claw and Truly both losing share'
    ]
  },
  {
    key: 'nolow', label: 'No & Low Alcohol', emoji: 'ð¿',
    marketSize: '$13B', growth: '+7.5%', growthDir: 'up',
    trajectory: 'Fastest-growing macro category in beverage alcohol. No longer niche â mainstream retailers dedicating permanent shelf space. Beer leads volume. Spirits alternatives growing fastest. Dry January now a year-round moderation movement.',
    topMarkets: [{ name: 'Germany', growth: '+6.2%' }, { name: 'United States', growth: '+12.4%' }, { name: 'UK', growth: '+8.8%' }, { name: 'Australia', growth: '+9.1%' }, { name: 'Japan', growth: '+5.4%' }],
    brands: ['Athletic Brewing', 'Seedlip', 'Lyre\'s', 'Heineken 0.0', 'Guinness 0.0', 'Ritual Zero Proof', 'Monday', 'Free AF'],
    channels: { onTrade: 25, offTrade: 55, ecommerce: 20 },
    trends: [
      'Sober-curious movement now mainstream â 35% of US adults reducing alcohol consumption',
      'Athletic Brewing revenues exceeded $200M â proving NoLo can be a scale business',
      'On-premise NoLo menus expanding â 62% of UK restaurants now offer dedicated non-alc cocktail section',
      'Major spirits companies all investing â Diageo (Seedlip), Pernod (Celtic Soul), LVMH (French Bloom)',
      'Regulatory clarity improving â EU and US standardizing "non-alcoholic" labeling below 0.5% ABV'
    ]
  },
  {
    key: 'rtd', label: 'RTD / Ready-to-Drink', emoji: 'ð¥«',
    marketSize: '$40B', growth: '+8.2%', growthDir: 'up',
    trajectory: 'Maturing from explosive pandemic growth but still outpacing all traditional categories. Spirits-based RTDs overtaking malt-based. Premiumization underway with $5+ single-serve formats. Cannibalization of entry-level spirits increasingly evident.',
    topMarkets: [{ name: 'Japan', growth: '+3.2%' }, { name: 'United States', growth: '+11.4%' }, { name: 'Australia', growth: '+8.8%' }, { name: 'UK', growth: '+9.2%' }, { name: 'Brazil', growth: '+14.1%' }],
    brands: ['High Noon', 'NUTRL', 'Cutwater', 'Fever-Tree (mixers)', 'Suntory -196', 'On The Rocks', 'Crown Royal RTD', 'Absolut & Sprite'],
    channels: { onTrade: 15, offTrade: 70, ecommerce: 15 },
    trends: [
      'Spirits-based RTDs growing at +22% while malt-based declining at -4% â regulatory clarity helping spirits RTDs',
      'Japan\'s chu-hai/chuhai culture influencing Western markets â Suntory -196 US launch reaching $100M year 1',
      'Premiumization wave â $5+ single-serve cocktails fastest-growing price segment',
      'Big spirits pivoting hard â Diageo, Beam Suntory, Brown-Forman all launched 3+ new RTD lines in 2025',
      'Convenience store and gas station channel now 28% of RTD volume â impulse purchase driving trial'
    ]
  }
]

function CategoryCard({ cat, isActive, onClick }) {
  return (
    <button onClick={onClick} className={`w-full text-left p-3 rounded-lg transition-colors flex items-center gap-3 ${isActive ? 'bg-blue-900 text-white' : 'bg-white hover:bg-gray-50 text-gray-700 border border-gray-100'}`}>
      <span className="text-xl">{cat.emoji}</span>
      <div className="flex-1 min-w-0">
        <div className="font-medium text-sm truncate">{cat.label}</div>
        <div className="flex items-center gap-2 mt-0.5">
          <span className="text-xs opacity-70">{cat.marketSize}</span>
          <span className={`text-xs font-medium ${isActive ? 'text-white' : cat.growthDir === 'up' ? 'text-green-600' : cat.growthDir === 'down' ? 'text-red-600' : 'text-gray-500'}`}>{cat.growth}</span>
        </div>
      </div>
    </button>
  )
}

function ChannelBar({ channels }) {
  return (
    <div>
      <div className="flex rounded-full overflow-hidden h-4 mb-2">
        <div className="bg-blue-900" style={{ width: `${channels.onTrade}%` }} />
        <div className="bg-amber-400" style={{ width: `${channels.offTrade}%` }} />
        <div className="bg-emerald-500" style={{ width: `${channels.ecommerce}%` }} />
      </div>
      <div className="flex justify-between text-xs text-gray-500">
        <span>On-trade {channels.onTrade}%</span>
        <span>Off-trade {channels.offTrade}%</span>
        <span>E-com {channels.ecommerce}%</span>
      </div>
    </div>
  )
}

function WineBreakdown({ cat }) {
  const [view, setView] = useState('varietal')
  return (
    <div className="mt-6 bg-white rounded-xl border border-gray-100 p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-blue-900 uppercase tracking-wide">Wine Deep Dive</h3>
        <div className="flex gap-1 bg-gray-100 rounded-lg p-1">
          <button onClick={() => setView('varietal')} className={`px-3 py-1 rounded-md text-xs font-medium ${view === 'varietal' ? 'bg-white text-blue-900 shadow-sm' : 'text-gray-500'}`}>By Varietal</button>
          <button onClick={() => setView('country')} className={`px-3 py-1 rounded-md text-xs font-medium ${view === 'country' ? 'bg-white text-blue-900 shadow-sm' : 'text-gray-500'}`}>By Country</button>
        </div>
      </div>
      {view === 'varietal' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {cat.varietals.map((v, i) => (
            <div key={i} className="border border-gray-100 rounded-lg p-3">
              <div className="flex items-center justify-between mb-1">
                <span className="font-medium text-sm text-gray-800">{v.name}</span>
                <span className={`text-xs font-medium ${v.growth.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>{v.growth}</span>
              </div>
              <div className="text-xs text-gray-400 mb-1">Volume share: {v.volumeShare}</div>
              <div className="text-xs text-gray-500">Top regions: {v.topRegions}</div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {cat.countries.map((c, i) => (
            <div key={i} className="border border-gray-100 rounded-lg p-3">
              <div className="flex items-center justify-between mb-1">
                <span className="font-medium text-sm text-gray-800">{c.name}</span>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-500">{c.value}</span>
                  <span className={`text-xs font-medium ${c.growth.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>{c.growth}</span>
                </div>
              </div>
              <div className="text-xs text-gray-500">{c.regions}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function CategoryDetail({ cat }) {
  const GrowthIcon = cat.growthDir === 'up' ? TrendingUp : cat.growthDir === 'down' ? TrendingDown : Minus
  const growthColor = cat.growthDir === 'up' ? 'text-green-600' : cat.growthDir === 'down' ? 'text-red-600' : 'text-gray-500'
  return (
    <div>
      <div className="flex items-center gap-3 mb-2">
        <span className="text-3xl">{cat.emoji}</span>
        <div>
          <h2 className="text-xl font-bold text-blue-900">{cat.label}</h2>
          <div className="flex items-center gap-3 mt-1">
            <span className="text-lg font-semibold text-gray-700">{cat.marketSize}</span>
            <div className={`flex items-center gap-1 ${growthColor}`}>
              <GrowthIcon className="w-4 h-4" />
              <span className="font-semibold">{cat.growth} YoY</span>
            </div>
          </div>
        </div>
      </div>
      <p className="text-sm text-gray-600 leading-relaxed mb-6">{cat.trajectory}</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-xl border border-gray-100 p-5">
          <div className="flex items-center gap-2 mb-3">
            <Globe className="w-4 h-4 text-blue-900" />
            <h3 className="text-sm font-semibold text-blue-900 uppercase tracking-wide">Top Growth Markets</h3>
          </div>
          <div className="space-y-2">
            {cat.topMarkets.map((m, i) => (
              <div key={i} className="flex items-center justify-between py-1.5 border-b border-gray-50 last:border-0">
                <span className="text-sm text-gray-700">{m.name}</span>
                <span className={`text-sm font-medium ${m.growth.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>{m.growth}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 p-5">
          <div className="flex items-center gap-2 mb-3">
            <ShoppingCart className="w-4 h-4 text-blue-900" />
            <h3 className="text-sm font-semibold text-blue-900 uppercase tracking-wide">Channel Split</h3>
          </div>
          <ChannelBar channels={cat.channels} />
          <div className="mt-4">
            <div className="flex items-center gap-2 mb-2">
              <Star className="w-4 h-4 text-blue-900" />
              <h4 className="text-sm font-semibold text-blue-900 uppercase tracking-wide">Key Brands</h4>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {cat.brands.map((b, i) => (
                <span key={i} className="px-2 py-0.5 bg-blue-50 text-blue-800 rounded-full text-xs font-medium">{b}</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 p-5 mb-6">
        <div className="flex items-center gap-2 mb-3">
          <Zap className="w-4 h-4 text-blue-900" />
          <h3 className="text-sm font-semibold text-blue-900 uppercase tracking-wide">Trend Insights</h3>
        </div>
        <div className="space-y-3">
          {cat.trends.map((t, i) => (
            <div key={i} className="flex gap-3">
              <ChevronRight className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-gray-600 leading-relaxed">{t}</p>
            </div>
          ))}
        </div>
      </div>

      {cat.key === 'wine' && <WineBreakdown cat={cat} />}
    </div>
  )
}

export default function CategoryIntelligence() {
  const [selected, setSelected] = useState('tequila')
  const activeCat = CATEGORIES.find(c => c.key === selected)
  return (
    <div className="grid grid-cols-12 gap-6">
      <div className="col-span-3 space-y-2">
        <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wide px-2 mb-3">Categories</h2>
        {CATEGORIES.map(cat => (
          <CategoryCard key={cat.key} cat={cat} isActive={selected === cat.key} onClick={() => setSelected(cat.key)} />
        ))}
      </div>
      <div className="col-span-9">
        {activeCat && <CategoryDetail cat={activeCat} />}
      </div>
    </div>
  )
}
