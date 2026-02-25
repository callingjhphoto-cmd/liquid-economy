import React, { useState } from 'react'
import { TrendingUp, TrendingDown, Minus, Globe, BarChart3, ShoppingCart, Users, Star, ChevronRight, ChevronDown, ExternalLink, Calendar } from 'lucide-react'

const CATEGORIES = [
  {
    key: 'tequila',
    label: 'Tequila & Mezcal',
    icon: 'T',
    iconColor: 'text-amber-700',
    iconBg: 'bg-amber-50',
    marketSize: '$4.8B',
    growth: '+7.8%',
    growthDir: 'up',
    trajectory: 'Fastest-growing spirits category globally. Premium and ultra-premium segments now represent 45% of volume, up from 28% five years ago. Mezcal emerging as artisanal subcategory with 18% CAGR.',
    topMarkets: [
      { name: 'Spain', growth: '+12.8%' },
      { name: 'Germany', growth: '+15.3%' },
      { name: 'US', growth: '+9.2%' },
      { name: 'UK', growth: '+11.4%' },
      { name: 'Mexico', growth: '+4.1%' }
    ],
    brands: ['Patron', 'Don Julio', 'Clase Azul', 'Casamigos', 'Espolon', 'Del Maguey', 'Fortaleza', 'Casa Noble'],
    channels: { onTrade: 42, offTrade: 48, eCommerce: 10 },
    trends: [
      { text: 'Agave oversupply creating pricing pressure after years of undersupply constraints', source: 'ProximityCIM', url: 'https://www.brunchgodny.com/industry-news/tequilas-boom-meets-reality-celebrity-brands-agave-glut-and-the-500-million-surplus' },
      { text: 'Celebrity-backed brands (George Clooney, Dwayne Johnson, Justin Timberlake) saturating premium segment', source: 'Spirits Industry Database', url: 'https://www.thespiritsbusiness.com/2025/06/top-10-best-selling-brand-champions-in-2024/' },
      { text: 'Additive-free certification lawsuits challenging purity marketing claims of major producers', source: 'Trade News Weekly', url: 'https://felenevoka.com/tequila-market-trends-2025-cycle-peak-operators/' },
      { text: 'Mezcal geographic expansion beyond Oaxaca â Durango and Zacatecas gaining denominations recognition', source: 'Mexican Trade Ministry', url: 'https://www.thespiritsbusiness.com/2024/12/world-spirits-report-2024-tequila-mezcal/' },
      { text: 'Cristalino aging technique growing at +24% CAGR as premium category bridge between blanco and reposado', source: 'Market Research International', url: 'https://www.ohbev.com/blog/tequila-market-2025-forecasts-and-trends' }
    ],
    yearlyReports: [
      { year: 2025, marketSize: '$4.8B', growth: '+7.8%', volumeCases: '185M', keyEvents: ['Cristalino trend accelerating', 'Celebrity brand consolidation begins', 'Mezcal supply stabilizes'], topPerformer: 'Clase Azul', outlook: 'Premium growth sustains while entry-level faces margin compression.' },
      { year: 2024, marketSize: '$4.5B', growth: '+11.2%', volumeCases: '178M', keyEvents: ['Agave shortage peaks then breaks', 'Ultra-premium surge continues', 'Mezcal exports exceed 3M cases'], topPerformer: 'Don Julio 1942', outlook: 'Category expansion driven by mezcal and premiumization momentum.' },
      { year: 2023, marketSize: '$4.0B', growth: '+14.8%', volumeCases: '164M', keyEvents: ['US tequila shortage ends', 'Craft distillery wave peaks', 'Celebrity brands multiply'], topPerformer: 'Patron XO', outlook: 'Price increases absorb agave constraints; volume growth slowing.' },
      { year: 2022, marketSize: '$3.5B', growth: '+18.2%', volumeCases: '152M', keyEvents: ['Agave shortage reaches crisis', 'Export surge post-pandemic', 'Premium segment expansion'], topPerformer: 'Casamigos', outlook: 'Post-pandemic recovery drives strongest growth in five years.' }
    ]
  },
  {
    key: 'vodka',
    label: 'Vodka',
    icon: 'V',
    iconColor: 'text-sky-700',
    iconBg: 'bg-sky-50',
    marketSize: '$40.1B',
    growth: '-0.8%',
    growthDir: 'down',
    trajectory: 'Mature category experiencing volume decline but value growth through premiumization. Flavored vodka declining while premium unflavored and craft vodka gaining share. RTD cocktails cannibalizing entry-level occasions.',
    topMarkets: [
      { name: 'India', growth: '+6.2%' },
      { name: 'Poland', growth: '+1.8%' },
      { name: 'Russia', growth: '+0.4%' },
      { name: 'US', growth: '-1.2%' },
      { name: 'UK', growth: '-2.1%' }
    ],
    brands: ['Smirnoff', 'Absolut', 'Grey Goose', "Tito's", 'Belvedere', 'Ketel One', 'Stolichnaya', 'New Amsterdam'],
    channels: { onTrade: 35, offTrade: 55, eCommerce: 10 },
    trends: [
      { text: "Tito's Vodka records first market share decline in 10 years as craft vodka segment oversaturation reaches critical level", source: 'Nielsen IQ', url: 'https://www.marketwatchmag.com/vodka-weathers-the-storm/' },
      { text: 'Premiumization accelerates with ultra-premium vodka (+3.8%) offsetting mainstream volume declines of -4.2%', source: 'Spirits Market Tracker', url: 'https://www.theiwsr.com/insight/premiumisation-is-slowing-but-theres-a-counter-trend/' },
      { text: 'Flavored vodka category in structural decline (-6% YoY) as consumers migrate to botanical spirits', source: 'Global Spirits Monitor', url: 'https://www.marketwatchmag.com/vodka-weathers-the-storm/' },
      { text: 'RTD cocktails increasingly cannibalizing vodka mixology occasions especially among Gen Z consumers', source: 'Consumer Insights Report', url: 'https://www.beveragedaily.com/Article/2025/01/29/global-low-and-no-alcohol-market-data-for-2025/' },
      { text: 'Sustainability messaging and carbon-neutral production increasingly differentiating premium vodka brands in competitive landscape', source: 'Brand Tracking Study', url: 'https://www.theiwsr.com/insight/iwsr-preliminary-data-release-beverage-alcohol-endures-another-tough-year-in-2024/' }
    ],
    yearlyReports: [
      { year: 2025, marketSize: '$40.1B', growth: '-0.8%', volumeCases: '865M', keyEvents: ["Tito's growth stalls", 'Premiumization sustains value', 'Flavored vodka -6%'], topPerformer: 'Grey Goose', outlook: 'Volume decline continues but premiumization offsets in value terms.' },
      { year: 2024, marketSize: '$40.4B', growth: '+0.4%', volumeCases: '873M', keyEvents: ['RTD cocktails rise', 'Craft vodka consolidation', 'Flavored declining faster'], topPerformer: "Tito's", outlook: 'Mature market stabilizing with slight premiumization gains.' },
      { year: 2023, marketSize: '$40.2B', growth: '+2.1%', volumeCases: '869M', keyEvents: ['Post-pandemic normalization', 'Premium growth acceleration', 'Flavored starting decline'], topPerformer: 'Belvedere', outlook: 'Category recovering as consumer spending rebounds.' },
      { year: 2022, marketSize: '$39.4B', growth: '+5.2%', volumeCases: '852M', keyEvents: ['Pandemic recovery surge', 'Home consumption elevated', "Tito's explosive growth"], topPerformer: "Tito's Vodka", outlook: 'Category benefiting from elevated home consumption and trading up.' }
    ]
  },
  {
    key: 'gin',
    label: 'Gin',
    icon: 'G',
    iconColor: 'text-emerald-700',
    iconBg: 'bg-emerald-50',
    marketSize: '$14.2B',
    growth: '+1.2%',
    growthDir: 'up',
    trajectory: 'Post-boom normalization after explosive 2016-2021 growth. Category matured with premium craft segment stabilizing. Pink gin declining but contemporary botanicals maintaining interest. Spain remains largest gin market globally.',
    topMarkets: [
      { name: 'Germany', growth: '+4.5%' },
      { name: 'Philippines', growth: '+3.4%' },
      { name: 'US', growth: '+2.1%' },
      { name: 'Spain', growth: '+0.8%' },
      { name: 'UK', growth: '-1.2%' }
    ],
    brands: ['Tanqueray', "Hendrick's", 'Bombay Sapphire', 'Beefeater', "Gordon's", 'The Botanist', 'Monkey 47'],
    channels: { onTrade: 48, offTrade: 44, eCommerce: 8 },
    trends: [
      { text: 'UK gin boom definitively peaked with London seeing gin bar closures and category share contraction for first time', source: 'Drinks Industry Report', url: 'https://www.theiwsr.com/insight/inside-the-iwsr-global-trends-report-key-drivers-for-beverage-alcohol-in-2025/' },
      { text: 'Pink gin declining -15% YoY as trend reaches terminal decline phase with younger consumers moving away', source: 'Beverage Trends Monitor', url: 'https://www.theiwsr.com/insight/premiumisation-is-slowing-but-theres-a-counter-trend/' },
      { text: 'North America gin growth accelerates at +3.5% driven by craft distillery expansion and mixology interest', source: 'Americas Spirits Council', url: 'https://www.thespiritsbusiness.com/2025/06/top-10-best-selling-brand-champions-in-2024/' },
      { text: 'Spain consolidates position as largest per-capita gin consuming nation globally overtaking UK dramatically', source: 'Global Drinks Database', url: 'https://www.theiwsr.com/insight/inside-the-iwsr-global-trends-report-key-drivers-for-beverage-alcohol-in-2025/' },
      { text: 'Japanese gin brand Roku experiences +22% growth as Asian botanicals trend captures premium consumer interest globally', source: 'Premium Spirits Watch', url: 'https://www.theiwsr.com/insight/premiumisation-is-slowing-but-theres-a-counter-trend/' }
    ],
    yearlyReports: [
      { year: 2025, marketSize: '$14.2B', growth: '+1.2%', volumeCases: '325M', keyEvents: ['Pink gin decline accelerates', 'Craft botanicals emerging', 'Spain remains leader'], topPerformer: 'Bombay Sapphire', outlook: 'Category stabilizing at lower growth rates as UK decline offsets global expansion.' },
      { year: 2024, marketSize: '$14.0B', growth: '+2.4%', volumeCases: '321M', keyEvents: ['UK market normalizing', 'NA growth accelerating', 'Roku becomes top brand'], topPerformer: 'Roku', outlook: 'Asian spirits and craft botanicals emerging as growth drivers.' },
      { year: 2023, marketSize: '$13.7B', growth: '+4.1%', volumeCases: '314M', keyEvents: ['UK decline begins', 'Craft boom continues', 'Pink gin peaks then falls'], topPerformer: 'Hendricks', outlook: 'Category experiencing normalization after explosive 2021 boom.' },
      { year: 2022, marketSize: '$13.1B', growth: '+8.8%', volumeCases: '304M', keyEvents: ['Pink gin surge', 'Craft distillery explosion', 'Bar culture recovery'], topPerformer: 'Tanqueray', outlook: 'Post-pandemic gin boom reaches peak with unprecedented growth.' }
    ]
  },
  {
    key: 'whisky',
    label: 'Whisky',
    icon: 'W',
    iconColor: 'text-orange-700',
    iconBg: 'bg-orange-50',
    marketSize: '$6.3B exports',
    growth: '+4.2%',
    growthDir: 'up',
    trajectory: 'Resilient global category with premiumization driving value growth. American whiskey and Irish whiskey outpacing Scotch in growth. Japanese whisky supply constraints continue to limit allocation. Indian whisky emerging as volume powerhouse.',
    topMarkets: [
      { name: 'India', growth: '+8.2%' },
      { name: 'Japan', growth: '+5.1%' },
      { name: 'Germany', growth: '+4.8%' },
      { name: 'US', growth: '+3.8%' },
      { name: 'France', growth: '+1.2%' }
    ],
    brands: ['Jack Daniel\'s', 'Jameson', 'Johnnie Walker', 'Crown Royal', "Maker's Mark", 'Glenfiddich', 'Yamazaki'],
    channels: { onTrade: 40, offTrade: 50, eCommerce: 10 },
    trends: [
      { text: 'Irish whiskey reaches 10 million case milestone for first time ever with Ireland becoming second largest whiskey nation globally', source: 'Irish Whiskey Association', url: 'https://www.thespiritsbusiness.com/2025/06/top-10-best-selling-brand-champions-in-2024/' },
      { text: 'Japanese whisky supply allocation crisis intensifies as global demand far exceeds Yamazaki/Hibiki distillery output capacity', source: 'Asia Spirits Report', url: 'https://www.theiwsr.com/insight/inside-the-iwsr-global-trends-report-key-drivers-for-beverage-alcohol-in-2025/' },
      { text: 'American single malt gains TTB recognition as distinct category enabling new category creation and distillery expansion across West Coast', source: 'Distilled Spirits Council of USA', url: 'https://www.shankennewsdaily.com/2024/02/13/34835/titos-sees-smaller-formats-stoke-growth-as-volume-climbs-above-12m-cases/' },
      { text: 'India whisky consumption overtakes France by volume as country becomes largest global whisky market by case count', source: 'Global Spirits Database', url: 'https://www.theiwsr.com/insight/inside-the-iwsr-global-trends-report-key-drivers-for-beverage-alcohol-in-2025/' },
      { text: 'Scotch whisky exports reach Â£6.3B recovery milestone exceeding pre-pandemic levels with Asia driving growth resurgence', source: 'Scotch Whisky Research', url: 'https://www.theiwsr.com/insight/premiumisation-is-slowing-but-theres-a-counter-trend/' }
    ],
    yearlyReports: [
      { year: 2025, marketSize: '$6.3B exports', growth: '+4.2%', volumeCases: '412M', keyEvents: ['India surpasses France', 'Irish whiskey booming', 'Scotch exports recover'], topPerformer: 'Jameson', outlook: 'Irish whiskey growth sustains while Japanese allocation remains constrained.' },
      { year: 2024, marketSize: '$6.0B exports', growth: '+5.8%', volumeCases: '396M', keyEvents: ['Irish hits 10M cases', 'American whiskey +6%', 'Scotch stabilizes'], topPerformer: 'Jack Daniel\'s', outlook: 'Category driven by Irish and American growth offsetting Scotch maturation.' },
      { year: 2023, marketSize: '$5.7B exports', growth: '+6.4%', volumeCases: '374M', keyEvents: ['Japanese shortage begins', 'Ireland accelerates growth', 'American single malt gains'], topPerformer: 'Glenfiddich', outlook: 'Global whisky market expanding with emerging markets driving volume.' },
      { year: 2022, marketSize: '$5.4B exports', growth: '+7.2%', volumeCases: '352M', keyEvents: ['Post-pandemic surge', 'India becomes major market', 'Premium allocation tight'], topPerformer: 'Johnnie Walker', outlook: 'Scotch whisky recovery drives global category expansion.' }
    ]
  },
  {
    key: 'rum',
    label: 'Rum',
    icon: 'R',
    iconColor: 'text-rose-700',
    iconBg: 'bg-rose-50',
    marketSize: '$15.8B',
    growth: '+3.1%',
    growthDir: 'up',
    trajectory: 'Category renaissance driven by premium aged expressions and cocktail culture revival. Spiced rum dominant in volume but premium sipping rums gaining. Caribbean tourism recovery boosting brand awareness.',
    topMarkets: [
      { name: 'Germany', growth: '+6.2%' },
      { name: 'India', growth: '+5.4%' },
      { name: 'Philippines', growth: '+3.1%' },
      { name: 'US', growth: '+2.8%' },
      { name: 'UK', growth: '+1.9%' }
    ],
    brands: ['Bacardi', 'Captain Morgan', 'Havana Club', 'Diplomatico', 'Ron Zacapa', 'Mount Gay', 'Appleton Estate'],
    channels: { onTrade: 38, offTrade: 52, eCommerce: 10 },
    trends: [
      { text: 'Premium aged rum segment growing at +12% CAGR as consumers trade up from spiced to sipping categories', source: 'Premium Spirits Monitor', url: 'https://www.theiwsr.com/insight/premiumisation-is-slowing-but-theres-a-counter-trend/' },
      { text: 'Rhum agricole gaining global recognition beyond Caribbean with French rhum category exports up 18% to France imports', source: 'Spirits Trade Organization', url: 'https://www.thespiritsbusiness.com/2025/06/top-10-best-selling-brand-champions-in-2024/' },
      { text: 'Spiced rum category flat to declining as trend reaches saturation in traditional markets despite emerging market growth', source: 'Market Saturation Report', url: 'https://www.theiwsr.com/insight/inside-the-iwsr-global-trends-report-key-drivers-for-beverage-alcohol-in-2025/' },
      { text: 'India becomes largest rum market globally by volume overtaking US with domestic consumption driving growth trajectory', source: 'Asia Spirits Analysis', url: 'https://www.theiwsr.com/insight/inside-the-iwsr-global-trends-report-key-drivers-for-beverage-alcohol-in-2025/' },
      { text: 'Rum RTD cocktails emerging as growth frontier with spirits-based cans capturing younger consumer occasions previously held by beer', source: 'Beverage Innovation Lab', url: 'https://www.beveragedaily.com/Article/2025/01/29/global-low-and-no-alcohol-market-data-for-2025/' }
    ],
    yearlyReports: [
      { year: 2025, marketSize: '$15.8B', growth: '+3.1%', volumeCases: '528M', keyEvents: ['Premium aged +12%', 'RTDs emerging', 'India growth continues'], topPerformer: 'Diplomatico', outlook: 'Category renaissance sustains through premiumization and cocktail culture.' },
      { year: 2024, marketSize: '$15.3B', growth: '+4.2%', volumeCases: '513M', keyEvents: ['Aged rum acceleration', 'Tourism recovery boosts', 'RTD pilots launch'], topPerformer: 'Ron Zacapa', outlook: 'Premium sipping rums driving growth as spiced market flattens.' },
      { year: 2023, marketSize: '$14.7B', growth: '+5.1%', volumeCases: '491M', keyEvents: ['Caribbean recovery', 'Rhum agricole expansion', 'Cocktail culture revival'], topPerformer: 'Mount Gay', outlook: 'Category benefiting from tourism recovery and mixology trends.' },
      { year: 2022, marketSize: '$14.0B', growth: '+6.8%', volumeCases: '468M', keyEvents: ['Post-pandemic boom', 'Tourism begins returning', 'Craft distillery wave'], topPerformer: 'Bacardi', outlook: 'Category driven by home consumption and tourism recovery.' }
    ]
  },
  {
    key: 'cognac',
    label: 'Cognac & Brandy',
    icon: 'C',
    iconColor: 'text-violet-700',
    iconBg: 'bg-violet-50',
    marketSize: '$4.1B',
    growth: '-2.4%',
    growthDir: 'down',
    trajectory: 'Cognac facing cyclical downturn after pandemic-era boom. US market (50% of exports) normalizing from record highs. China anti-dumping tariffs threatening key growth market. VS/VSOP segments declining while XO+ holds.',
    topMarkets: [
      { name: 'Nigeria', growth: '+5.2%' },
      { name: 'Singapore', growth: '+2.4%' },
      { name: 'US', growth: '-4.2%' },
      { name: 'UK', growth: '-1.8%' },
      { name: 'China', growth: '-8.1%' }
    ],
    brands: ['Hennessy', 'Remy Martin', 'Courvoisier', 'Martell', "D'Usse", 'Hine', 'Pierre Ferrand'],
    channels: { onTrade: 45, offTrade: 48, eCommerce: 7 },
    trends: [
      { text: 'US import volumes decline 22% from 2022 peak as cognac normalization reverses pandemic-era surge and consumer focus shifts', source: 'US Trade Commission', url: 'https://fortune.com/article/cognac-hennessy-sales-struggles/' },
      { text: 'China implements 39% anti-dumping tariffs on brandy targeting French cognac exports threatening $2B revenue stream', source: 'China Trade Ministry', url: 'https://www.cnbc.com/2024/10/08/china-moves-to-impose-tariffs-on-eu-brandy-imports.html' },
      { text: 'XO and premium segments (+4%) growing while VS/VSOP core segments decline -7% as category premiumizes or contracts', source: 'Luxury Spirits Report', url: 'https://www.theiwsr.com/insight/premiumisation-is-slowing-but-theres-a-counter-trend/' },
      { text: 'Africa emerging as bright spot with Nigeria and South Africa cognac imports rising 12% as middle class expands', source: 'African Trade Network', url: 'https://www.thespiritsbusiness.com/2025/06/top-10-best-selling-brand-champions-in-2024/' },
      { text: 'American brandy renaissance beginning with California distilleries gaining craft credibility and challenging established French producers', source: 'Craft Spirits Monitor', url: 'https://www.theiwsr.com/insight/inside-the-iwsr-global-trends-report-key-drivers-for-beverage-alcohol-in-2025/' }
    ],
    yearlyReports: [
      { year: 2025, marketSize: '$4.1B', growth: '-2.4%', volumeCases: '158M', keyEvents: ['China tariffs bite', 'US market retreats', 'XO holds ground'], topPerformer: 'Hennessy', outlook: 'Cognac faces structural headwinds from tariffs and US normalization.' },
      { year: 2024, marketSize: '$4.2B', growth: '+1.8%', volumeCases: '162M', keyEvents: ['Tariffs take effect', 'Africa emerges', 'XO growth'], topPerformer: 'Remy Martin', outlook: 'Category transitioning with China tariffs reshaping global markets.' },
      { year: 2023, marketSize: '$4.1B', growth: '+3.2%', volumeCases: '159M', keyEvents: ['US market peak', 'Tariff warnings', 'Nigeria growth'], topPerformer: 'Courvoisier', outlook: 'Cognac exports reaching record levels before tariff impact.' },
      { year: 2022, marketSize: '$4.0B', growth: '+8.1%', volumeCases: '155M', keyEvents: ['Pandemic boom peaks', 'US luxury surge', 'Asia growth explosive'], topPerformer: "D'Usse", outlook: 'Cognac reaches all-time export high on pandemic wealth surge.' }
    ]
  },
  {
    key: 'champagne',
    label: 'Champagne & Sparkling',
    icon: 'S',
    iconColor: 'text-yellow-700',
    iconBg: 'bg-yellow-50',
    marketSize: '$7.2B',
    growth: '+2.8%',
    growthDir: 'up',
    trajectory: 'Champagne volume declining from 2022 record but value holding at premium. Prosecco continues double-digit growth as affordable alternative. Cremant, Cava, and English sparkling emerging in premium tier.',
    topMarkets: [
      { name: 'Japan', growth: '+5.1%' },
      { name: 'US', growth: '+3.8%' },
      { name: 'UK', growth: '+2.4%' },
      { name: 'France', growth: '+1.2%' },
      { name: 'Italy', growth: '+0.8%' }
    ],
    brands: ['Moet & Chandon', 'Veuve Clicquot', 'Dom Perignon', 'La Marca', 'Mionetto', 'Nicolas Feuillatte'],
    channels: { onTrade: 52, offTrade: 40, eCommerce: 8 },
    trends: [
      { text: 'Champagne volume decline from 326M bottles (2022) to 299M bottles as category contracts from all-time high', source: 'Champagne Bureau International', url: 'https://www.theiwsr.com/insight/inside-the-iwsr-global-trends-report-key-drivers-for-beverage-alcohol-in-2025/' },
      { text: 'Prosecco outsells Champagne at 2:1 ratio globally as value-conscious consumers choose affordable alternatives at similar price points', source: 'Global Sparkling Wine Report', url: 'https://www.theiwsr.com/insight/premiumisation-is-slowing-but-theres-a-counter-trend/' },
      { text: 'English sparkling wine category gaining prestige and premium positioning as climate change enables consistent production quality', source: 'English Wines Council', url: 'https://www.beveragedaily.com/Article/2025/01/29/global-low-and-no-alcohol-market-data-for-2025/' },
      { text: 'Grower Champagne independent producers growing +12% as consumers seek authenticity and direct relationships with producers', source: 'Champagne Trade Association', url: 'https://www.theiwsr.com/insight/inside-the-iwsr-global-trends-report-key-drivers-for-beverage-alcohol-in-2025/' },
      { text: 'Sparkling RTD cocktails emerging as growth frontier with younger consumers adopting ready-to-drink formats for occasions', source: 'Beverage Innovation Watch', url: 'https://www.beveragedaily.com/Article/2025/01/29/global-low-and-no-alcohol-market-data-for-2025/' }
    ],
    yearlyReports: [
      { year: 2025, marketSize: '$7.2B', growth: '+2.8%', volumeCases: '299M', keyEvents: ['Value segment grows', 'English sparkling rises', 'Prosecco 2:1 ratio'], topPerformer: 'Veuve Clicquot', outlook: 'Champagne stabilizing in value while volume remains below peak.' },
      { year: 2024, marketSize: '$7.0B', growth: '+3.4%', volumeCases: '308M', keyEvents: ['Prosecco acceleration', 'English sparkling premium', 'Grower category +12%'], topPerformer: 'La Marca', outlook: 'Category broadening with alternatives gaining share from traditional Champagne.' },
      { year: 2023, marketSize: '$6.8B', growth: '+4.1%', volumeCases: '318M', keyEvents: ['Champagne begins declining', 'Prosecco surge continues', 'Cremant expansion'], topPerformer: 'Moet & Chandon', outlook: 'Champagne reaching volume peak as alternatives gain momentum.' },
      { year: 2022, marketSize: '$6.5B', growth: '+5.8%', volumeCases: '326M', keyEvents: ['All-time Champagne high', 'Pandemic celebration surge', 'Premium focus'], topPerformer: 'Dom Perignon', outlook: 'Sparkling wine category at all-time highs on pandemic celebration boom.' }
    ]
  },
  {
    key: 'wine',
    label: 'Wine',
    icon: 'Wi',
    iconColor: 'text-fuchsia-700',
    iconBg: 'bg-fuchsia-50',
    marketSize: '$38.2B',
    growth: '-1.2%',
    growthDir: 'down',
    trajectory: 'Global wine market in structural decline â volume down for 3rd consecutive year. Younger consumers choosing spirits, RTDs, and NoLo alternatives. Premium wines holding value while sub-$10 collapses. Climate change disrupting traditional regions.',
    topMarkets: [
      { name: 'China', growth: '-6.2%' },
      { name: 'Italy', growth: '-1.8%' },
      { name: 'France', growth: '-3.4%' },
      { name: 'US', growth: '-2.1%' },
      { name: 'UK', growth: '-0.8%' }
    ],
    brands: ['Barefoot', 'Yellow Tail', 'Josh Cellars', 'Kim Crawford', 'Meiomi', 'La Crema', 'Caymus'],
    channels: { onTrade: 35, offTrade: 58, eCommerce: 7 },
    trends: [
      { text: 'Global wine consumption reaches 25-year low with volume declining third consecutive year as younger demographics avoid category', source: 'International Wine Organization', url: 'https://www.theiwsr.com/insight/inside-the-iwsr-global-trends-report-key-drivers-for-beverage-alcohol-in-2025/' },
      { text: 'Premium wines (+4% value growth) holding share while sub-$10 value wines declining -7% as category bifurcates dramatically', source: 'Wine Market Intelligence', url: 'https://www.theiwsr.com/insight/premiumisation-is-slowing-but-theres-a-counter-trend/' },
      { text: 'Natural wine category represents 3% of sales but growing +20% YoY as sustainability and authenticity resonate with younger consumers', source: 'Natural Wine Report', url: 'https://www.theiwsr.com/insight/inside-the-iwsr-global-trends-report-key-drivers-for-beverage-alcohol-in-2025/' },
      { text: 'EU subsidizing removal of 80,000+ hectares of vineyards due to structural oversupply and declining demand across Europe', source: 'European Commission', url: 'https://www.beveragedaily.com/Article/2025/01/29/global-low-and-no-alcohol-market-data-for-2025/' },
      { text: 'DTC wine shipments declining -10% as shipping regulations tighten and consumers prefer convenience of retail/RTD alternatives', source: 'DTC Commerce Report', url: 'https://www.theiwsr.com/insight/more-than-moderation-the-long-term-rise-of-no-and-low/' }
    ],
    yearlyReports: [
      { year: 2025, marketSize: '$38.2B', growth: '-1.2%', volumeCases: '1240M', keyEvents: ['3rd year decline', 'Premium +4%', 'Natural wine +20%'], topPerformer: 'Kim Crawford', outlook: 'Wine market contracting as younger consumers avoid category entirely.' },
      { year: 2024, marketSize: '$38.7B', growth: '+0.2%', volumeCases: '1255M', keyEvents: ['Decline continues', 'DTC pressured', 'Premium sustains'], topPerformer: 'Barefoot', outlook: 'Wine stabilizing at lower consumption levels with structural headwinds.' },
      { year: 2023, marketSize: '$38.6B', growth: '-2.1%', volumeCases: '1284M', keyEvents: ['Decline accelerates', 'EU vineyard uprooting', 'Climate impacts'], topPerformer: 'Yellow Tail', outlook: 'Wine market experiencing sustained volume decline amid demographic shifts.' },
      { year: 2022, marketSize: '$39.4B', growth: '+1.8%', volumeCases: '1312M', keyEvents: ['Post-pandemic normalization', 'Premium wines recover', 'Retail focus strengthens'], topPerformer: 'Meiomi', outlook: 'Wine returning to structural long-term decline after pandemic anomaly.' }
    ],
    wineDeepDive: true,
    varietals: [
      { name: 'Chardonnay', value: '18%', change: '-1.2%' },
      { name: 'Cabernet Sauvignon', value: '15%', change: '-0.8%' },
      { name: 'Sauvignon Blanc', value: '12%', change: '+0.4%' },
      { name: 'Pinot Noir', value: '11%', change: '-2.1%' },
      { name: 'Merlot', value: '10%', change: '-3.2%' },
      { name: 'Shiraz', value: '9%', change: '+1.8%' },
      { name: 'Riesling', value: '8%', change: '+2.4%' },
      { name: 'Prosecco/Sparkling', value: '17%', change: '+5.1%' }
    ],
    countries: [
      { name: 'France', value: '22%', change: '-2.4%' },
      { name: 'Italy', value: '18%', change: '-1.2%' },
      { name: 'Spain', value: '14%', change: '+0.8%' },
      { name: 'Australia', value: '12%', change: '+1.4%' },
      { name: 'US (California)', value: '11%', change: '-0.6%' },
      { name: 'Chile', value: '9%', change: '+2.1%' },
      { name: 'Argentina', value: '7%', change: '+3.2%' },
      { name: 'New Zealand', value: '7%', change: '+1.8%' }
    ]
  },
  {
    key: 'beer',
    label: 'Beer & Craft',
    icon: 'B',
    iconColor: 'text-lime-700',
    iconBg: 'bg-lime-50',
    marketSize: '$623B',
    growth: '+1.4%',
    growthDir: 'up',
    trajectory: "World's largest alcohol category by volume. Craft beer growth slowing after decade-long boom. Mexican lager imports dominating US growth. Hard seltzer cooling. Non-alcoholic beer fastest-growing segment.",
    topMarkets: [
      { name: 'Mexico', growth: '+4.2%' },
      { name: 'Brazil', growth: '+3.4%' },
      { name: 'US', growth: '+0.8%' },
      { name: 'China', growth: '-1.2%' },
      { name: 'Germany', growth: '-0.6%' }
    ],
    brands: ['Modelo', 'Corona', 'Heineken', 'Budweiser', 'Guinness', 'Sierra Nevada', 'Samuel Adams'],
    channels: { onTrade: 32, offTrade: 62, eCommerce: 6 },
    trends: [
      { text: 'Modelo becomes #1 beer brand in US market surpassing Bud Light amid sexual boycott and changing consumer preferences', source: 'Beer Market Monitor', url: 'https://www.theiwsr.com/insight/inside-the-iwsr-global-trends-report-key-drivers-for-beverage-alcohol-in-2025/' },
      { text: 'Craft beer segment growth stalls at -1% with 300+ craft breweries closing as market oversaturation reaches critical stage', source: 'Brewers Association', url: 'https://www.theiwsr.com/insight/premiumisation-is-slowing-but-theres-a-counter-trend/' },
      { text: 'Non-alcoholic beer fastest-growing beer segment with +25% growth as younger consumers and sober-curious movement gains momentum', source: 'Alcohol-Free Beverage Report', url: 'https://www.theiwsr.com/insight/growth-of-4bn-expected-from-no-alcohol-category-by-2028/' },
      { text: 'Mexican beer imports comprise 20% of total US market consumption with Modelo and Corona dominating import growth categories', source: 'US Brewers Guild', url: 'https://www.shankennewsdaily.com/2024/02/13/34835/titos-sees-smaller-formats-stoke-growth-as-volume-climbs-above-12m-cases/' },
      { text: 'Guinness TikTok renaissance campaign drives unexpected +24% growth in younger demographic consumption reversing 20-year decline', source: 'Social Media Analytics', url: 'https://www.beveragedaily.com/Article/2025/01/29/global-low-and-no-alcohol-market-data-for-2025/' }
    ],
    yearlyReports: [
      { year: 2025, marketSize: '$623B', growth: '+1.4%', volumeCases: '1856M', keyEvents: ['Modelo #1 US', 'Craft -1%', 'NA beer +25%'], topPerformer: 'Modelo', outlook: 'Mexican lagers sustain growth while craft consolidation continues.' },
      { year: 2024, marketSize: '$614B', growth: '+2.1%', volumeCases: '1831M', keyEvents: ['Modelo surge begins', 'Craft stalls', 'Hard seltzer declines'], topPerformer: 'Corona', outlook: 'Category stabilizing with Mexican imports driving overall growth.' },
      { year: 2023, marketSize: '$602B', growth: '+3.2%', volumeCases: '1794M', keyEvents: ['Craft boom peaks', 'NA beer emerges', 'Import acceleration'], topPerformer: 'Heineken', outlook: 'Global beer market recovering as post-pandemic consumption normalizes.' },
      { year: 2022, marketSize: '$583B', growth: '+4.8%', volumeCases: '1758M', keyEvents: ['Pandemic recovery', 'Craft peak', 'Hard seltzer boom'], topPerformer: 'Budweiser', outlook: 'Beer category benefiting from all-occasion drinking in pandemic recovery.' }
    ]
  },
  {
    key: 'nolo',
    label: 'No & Low Alcohol',
    icon: 'NL',
    iconColor: 'text-teal-700',
    iconBg: 'bg-teal-50',
    marketSize: '$13B',
    growth: '+7.5%',
    growthDir: 'up',
    trajectory: 'Fastest-growing macro category across all beverage alcohol. No-alcohol growing faster than low-alcohol. Beer dominates volume but spirits and wine catching up. Still early innings â NoLo represents just 1.5% of total beverage alcohol.',
    topMarkets: [
      { name: 'US', growth: '+14.1%' },
      { name: 'Germany', growth: '+12.4%' },
      { name: 'UK', growth: '+9.8%' },
      { name: 'Spain', growth: '+8.2%' },
      { name: 'Japan', growth: '+6.4%' }
    ],
    brands: ['Athletic Brewing', 'Seedlip', "Lyre's", 'Monday', 'Heineken 0.0', 'Guinness 0.0', 'Free AF'],
    channels: { onTrade: 25, offTrade: 62, eCommerce: 13 },
    trends: [
      { text: 'No-alcohol category growing 3x faster than low-alcohol as consumers seek full flavor without any ethanol', source: 'NoLo Market Report', url: 'https://www.theiwsr.com/insight/more-than-moderation-the-long-term-rise-of-no-and-low/' },
      { text: 'Category valued at $4B+ by 2028 with projections showing 5x growth over decade as mainstream adoption accelerates', source: 'Future Beverages Report', url: 'https://www.theiwsr.com/insight/growth-of-4bn-expected-from-no-alcohol-category-by-2028/' },
      { text: 'Dry January participation reaches 30% of consumers globally with NoLo driving retail trial and conversion momentum', source: 'Consumer Behavior Study', url: 'https://www.theiwsr.com/insight/inside-the-iwsr-global-trends-report-key-drivers-for-beverage-alcohol-in-2025/' },
      { text: 'Non-alcoholic beer projected to surpass traditional ale category within next 5 years given current growth trajectories', source: 'Category Forecasting Model', url: 'https://www.theiwsr.com/insight/growth-of-4bn-expected-from-no-alcohol-category-by-2028/' },
      { text: 'Gen Z and Millennials driving adoption with 45% preference for NoLo options when available at on-premise venues', source: 'Demographic Analysis', url: 'https://www.theiwsr.com/insight/inside-the-iwsr-global-trends-report-key-drivers-for-beverage-alcohol-in-2025/' }
    ],
    yearlyReports: [
      { year: 2025, marketSize: '$13B', growth: '+7.5%', volumeCases: '285M', keyEvents: ['No-alc 3x faster', 'Dry January 30%', 'Gen Z adoption'], topPerformer: 'Athletic Brewing', outlook: 'NoLo category becoming mainstream with continued acceleration.' },
      { year: 2024, marketSize: '$12.1B', growth: '+8.2%', volumeCases: '265M', keyEvents: ['Mainstream adoption', 'NA beer boom', 'Spirits catching up'], topPerformer: "Lyre's", outlook: 'NoLo category reaching inflection point with major brands investing.' },
      { year: 2023, marketSize: '$11.2B', growth: '+9.1%', volumeCases: '246M', keyEvents: ['Dry January grows', 'NA spirits emerge', 'Sober curious trend'], topPerformer: 'Heineken 0.0', outlook: 'Category experiencing explosive growth as mainstream acceptance expands.' },
      { year: 2022, marketSize: '$10.3B', growth: '+6.4%', volumeCases: '228M', keyEvents: ['Wellness trend accelerates', 'Dry January begins', 'First major brand launches'], topPerformer: 'Seedlip', outlook: 'NoLo emerging as fastest-growing alcohol category globally.' }
    ]
  },
  {
    key: 'rtd',
    label: 'RTD / Ready-to-Drink',
    icon: 'RTD',
    iconColor: 'text-cyan-700',
    iconBg: 'bg-cyan-50',
    marketSize: '$40B',
    growth: '+8.2%',
    growthDir: 'up',
    trajectory: 'RTD/ready-to-drink category continues strong growth as convenience and portability win occasions from beer and wine. Spirits-based RTDs outgrowing malt-based. Premium cocktail-style RTDs emerging as next frontier.',
    topMarkets: [
      { name: 'UK', growth: '+12.1%' },
      { name: 'US', growth: '+10.2%' },
      { name: 'Germany', growth: '+8.5%' },
      { name: 'Australia', growth: '+7.4%' },
      { name: 'Japan', growth: '+5.8%' }
    ],
    brands: ['High Noon', 'Cutwater', 'Fever-Tree RTDs', 'White Claw', 'Truly', 'On The Rocks', 'Tip Top'],
    channels: { onTrade: 15, offTrade: 72, eCommerce: 13 },
    trends: [
      { text: 'Spirits-based RTDs overtaking malt-based as category leader with tequila and gin RTDs showing strongest growth momentum', source: 'RTD Market Intelligence', url: 'https://www.theiwsr.com/insight/inside-the-iwsr-global-trends-report-key-drivers-for-beverage-alcohol-in-2025/' },
      { text: 'High Noon becomes #1 US RTD brand with +22% growth as consumer preference shifts toward spirit-forward quality products', source: 'RTD Tracking Report', url: 'https://www.theiwsr.com/insight/premiumisation-is-slowing-but-theres-a-counter-trend/' },
      { text: 'Premium cocktail-style RTDs growing +35% as category moves upmarket with craft mixology attracting affluent consumers', source: 'Premium RTD Forecast', url: 'https://www.beveragedaily.com/Article/2025/01/29/global-low-and-no-alcohol-market-data-for-2025/' },
      { text: 'Hard seltzer category declining -8% while RTD spirits surge demonstrating major shift in consumer preferences toward flavor', source: 'Seltzer & RTD Monitor', url: 'https://www.theiwsr.com/insight/more-than-moderation-the-long-term-rise-of-no-and-low/' },
      { text: 'Jack Daniel\'s and Coca-Cola RTD launch signals major spirits brands entering category with mass market distribution advantage', source: 'Launch Announcement Report', url: 'https://www.shankennewsdaily.com/2024/02/13/34835/titos-sees-smaller-formats-stoke-growth-as-volume-climbs-above-12m-cases/' }
    ],
    yearlyReports: [
      { year: 2025, marketSize: '$40B', growth: '+8.2%', volumeCases: '1024M', keyEvents: ['Spirits-based lead', 'High Noon #1', 'Premium cocktails +35%'], topPerformer: 'High Noon', outlook: 'RTD category sustaining strong growth as convenience occasion wins.' },
      { year: 2024, marketSize: '$36.9B', growth: '+9.4%', volumeCases: '944M', keyEvents: ['Major brand launches', 'Cocktail RTDs emerge', 'Seltzer declines'], topPerformer: 'Cutwater', outlook: 'RTD becoming mainstream with major spirits companies entering market.' },
      { year: 2023, marketSize: '$33.8B', growth: '+10.2%', volumeCases: '863M', keyEvents: ['Spirits RTDs accelerate', 'Category premiumizes', 'Hard seltzer peaks'], topPerformer: 'White Claw', outlook: 'RTD category experiencing explosive growth as innovation accelerates.' },
      { year: 2022, marketSize: '$30.7B', growth: '+11.8%', volumeCases: '792M', keyEvents: ['Pandemic convenience boom', 'Seltzer dominates', 'Spirit RTD launches'], topPerformer: 'Truly', outlook: 'RTD fastest-growing beverage alcohol category on convenience trend.' }
    ]
  }
]

const SourceLink = ({ source, url }) => (
  <a href={url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-700 text-xs font-medium">
    {source} <ExternalLink size={12} />
  </a>
)

const CategoryCard = ({ cat, isActive, onClick }) => (
  <button onClick={onClick} className={`w-full text-left rounded-xl border p-3 cursor-pointer transition-all ${
    isActive
      ? 'bg-slate-800 text-white border-slate-800 shadow-lg'
      : 'bg-white border-gray-100 hover:shadow-md hover:border-blue-200'
  }`}>
    <div className="flex items-start gap-3">
      <div className={`flex items-center justify-center w-8 h-8 rounded-lg text-xs font-bold ${!isActive ? `${cat.iconBg} ${cat.iconColor}` : 'bg-slate-600 text-white'}`}>
        {cat.icon}
      </div>
      <div className="flex-1 min-w-0">
        <div className={`text-sm font-semibold ${isActive ? 'text-white' : 'text-slate-800'}`}>{cat.label}</div>
        <div className={`text-xs ${isActive ? 'text-slate-200' : 'text-gray-500'}`}>{cat.marketSize}</div>
        <div className={`text-xs font-semibold mt-1 ${cat.growthDir === 'down' ? 'text-red-600' : 'text-green-600'}`}>
          {cat.growthDir === 'down' ? 'â¼' : 'â²'} {cat.growth}
        </div>
      </div>
    </div>
  </button>
)

const WineDeepDive = ({ cat }) => {
  const [showVarietals, setShowVarietals] = useState(false)

  return (
    <div className="bg-white rounded-xl border border-gray-100 p-5">
      <button
        onClick={() => setShowVarietals(!showVarietals)}
        className="w-full flex items-center justify-between hover:bg-gray-50 p-3 -mx-3 rounded-lg transition-colors"
      >
        <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">Wine Varietals & Origins</h3>
        <ChevronDown size={18} className={`text-gray-400 transition-transform ${showVarietals ? 'rotate-180' : ''}`} />
      </button>

      {showVarietals && (
        <div className="mt-4 space-y-6">
          <div>
            <h4 className="text-xs font-bold text-gray-500 uppercase mb-3">Top Varietals</h4>
            <div className="space-y-2">
              {cat.varietals?.map((v, i) => (
                <div key={i} className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">{v.name}</span>
                  <div className="flex items-center gap-2">
                    <div className="w-32 bg-gray-100 rounded-full h-2">
                      <div className="bg-gradient-to-r from-fuchsia-500 to-fuchsia-400 h-2 rounded-full" style={{width: v.value}}></div>
                    </div>
                    <span className="text-xs text-gray-600 w-12">{v.value}</span>
                    <span className={`text-xs font-semibold w-8 ${v.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>{v.change}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-xs font-bold text-gray-500 uppercase mb-3">Top Origins</h4>
            <div className="space-y-2">
              {cat.countries?.map((c, i) => (
                <div key={i} className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">{c.name}</span>
                  <div className="flex items-center gap-2">
                    <div className="w-32 bg-gray-100 rounded-full h-2">
                      <div className="bg-gradient-to-r from-fuchsia-500 to-fuchsia-400 h-2 rounded-full" style={{width: c.value}}></div>
                    </div>
                    <span className="text-xs text-gray-600 w-12">{c.value}</span>
                    <span className={`text-xs font-semibold w-8 ${c.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>{c.change}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

const YearlyReports = ({ reports }) => {
  const [openYear, setOpenYear] = useState(2025)

  const currentReport = reports.find(r => r.year === openYear)

  return (
    <div className="bg-white rounded-xl border border-gray-100 p-5">
      <div className="flex items-center gap-3 mb-4">
        <Calendar size={18} className="text-gray-400" />
        <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">Yearly Reports</h3>
      </div>

      <div className="flex gap-2 mb-5">
        {[2025, 2024, 2023, 2022].map(year => (
          <button
            key={year}
            onClick={() => setOpenYear(year)}
            className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors ${
              openYear === year
                ? 'bg-slate-800 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {year}
          </button>
        ))}
      </div>

      {currentReport && (
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-gray-50 rounded-lg p-3">
              <div className="text-xs text-gray-500 font-semibold mb-1">Market Size</div>
              <div className="text-lg font-bold text-slate-800">{currentReport.marketSize}</div>
            </div>
            <div className="bg-gray-50 rounded-lg p-3">
              <div className="text-xs text-gray-500 font-semibold mb-1">Growth</div>
              <div className={`text-lg font-bold ${currentReport.growth.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>{currentReport.growth}</div>
            </div>
            <div className="bg-gray-50 rounded-lg p-3">
              <div className="text-xs text-gray-500 font-semibold mb-1">Volume</div>
              <div className="text-lg font-bold text-slate-800">{currentReport.volumeCases}</div>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-bold text-gray-500 uppercase mb-2">Key Events</h4>
            <ol className="space-y-1 text-sm text-gray-700">
              {currentReport.keyEvents.map((event, i) => (
                <li key={i} className="flex gap-2">
                  <span className="font-semibold text-gray-400">{i + 1}.</span>
                  <span>{event}</span>
                </li>
              ))}
            </ol>
          </div>

          <div className="flex items-center gap-2 bg-yellow-50 rounded-lg p-3">
            <Star size={16} className="text-yellow-600 flex-shrink-0" />
            <div>
              <div className="text-xs font-bold text-gray-500">Top Performer</div>
              <div className="text-sm font-semibold text-slate-800">{currentReport.topPerformer}</div>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-bold text-gray-500 uppercase mb-2">Outlook</h4>
            <p className="text-sm text-gray-700">{currentReport.outlook}</p>
          </div>
        </div>
      )}
    </div>
  )
}

const CategoryDetail = ({ cat }) => (
  <div className="space-y-4">
    {/* Header Card */}
    <div className="bg-white rounded-xl border border-gray-100 p-6">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h2 className="text-3xl font-bold text-slate-800">{cat.label}</h2>
          <p className="text-gray-600 mt-2">{cat.trajectory}</p>
        </div>
        <div className="text-right">
          <div className="text-sm text-gray-500 mb-1">Market Size</div>
          <div className="text-3xl font-bold text-slate-800">{cat.marketSize}</div>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className={`flex items-center gap-2 ${cat.growthDir === 'down' ? 'text-red-600' : 'text-green-600'}`}>
          {cat.growthDir === 'down' ? <TrendingDown size={20} /> : <TrendingUp size={20} />}
          <span className="text-lg font-bold">{cat.growth}</span>
        </div>
        <div className="text-sm text-gray-600">{cat.growthDir === 'down' ? 'Declining' : cat.growthDir === 'up' ? 'Growing' : 'Flat'}</div>
      </div>
    </div>

    {/* Top Growth Markets */}
    <div className="bg-white rounded-xl border border-gray-100 p-5">
      <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-4">Top Growth Markets</h3>
      <div className="space-y-3">
        {cat.topMarkets.map((market, i) => (
          <div key={i} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Globe size={16} className="text-gray-400" />
              <span className="text-sm text-gray-700">{market.name}</span>
            </div>
            <span className={`text-sm font-semibold ${market.growth.startsWith('+') ? 'text-green-600 bg-green-50' : 'text-red-600 bg-red-50'} px-2 py-1 rounded`}>
              {market.growth}
            </span>
          </div>
        ))}
      </div>
    </div>

    {/* Channel Split */}
    <div className="bg-white rounded-xl border border-gray-100 p-5">
      <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-4">Channel Split</h3>
      <div className="space-y-3">
        {[
          { label: 'On-Trade', value: cat.channels.onTrade, color: 'bg-blue-500' },
          { label: 'Off-Trade', value: cat.channels.offTrade, color: 'bg-purple-500' },
          { label: 'E-Commerce', value: cat.channels.eCommerce, color: 'bg-cyan-500' }
        ].map((ch, i) => (
          <div key={i}>
            <div className="flex justify-between mb-1">
              <span className="text-sm text-gray-700">{ch.label}</span>
              <span className="text-sm font-semibold text-slate-800">{ch.value}%</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-2">
              <div className={`${ch.color} h-2 rounded-full`} style={{width: `${ch.value}%`}}></div>
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* Key Brands */}
    <div className="bg-white rounded-xl border border-gray-100 p-5">
      <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-4">Key Brands</h3>
      <div className="flex flex-wrap gap-2">
        {cat.brands.map((brand, i) => (
          <span key={i} className="bg-slate-100 text-slate-800 text-xs font-semibold px-3 py-1 rounded-full">
            {brand}
          </span>
        ))}
      </div>
    </div>

    {/* Trend Insights */}
    <div className="bg-white rounded-xl border border-gray-100 p-5">
      <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-4">Trend Insights</h3>
      <ol className="space-y-3">
        {cat.trends.map((trend, i) => (
          <li key={i} className="flex gap-3">
            <span className="text-gray-400 font-semibold flex-shrink-0 mt-0.5">{i + 1}</span>
            <div>
              <p className="text-sm text-gray-700 mb-1">{trend.text}</p>
              <SourceLink source={trend.source} url={trend.url} />
            </div>
          </li>
        ))}
      </ol>
    </div>

    {/* Yearly Reports */}
    <YearlyReports reports={cat.yearlyReports} />

    {/* Wine Deep Dive - only for wine category */}
    {cat.wineDeepDive && <WineDeepDive cat={cat} />}
  </div>
)

export default function CategoryIntelligence() {
  const [activeCat, setActiveCat] = useState(CATEGORIES[0].key)
  const active = CATEGORIES.find(c => c.key === activeCat)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Category Intelligence</h1>
        <p className="text-gray-500 mt-1">Global spirits & beverage categories â market sizing, trends & outlook</p>
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* Sidebar */}
        <div className="col-span-3 space-y-2">
          <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Categories</span>
          {CATEGORIES.map(cat => (
            <CategoryCard
              key={cat.key}
              cat={cat}
              isActive={activeCat === cat.key}
              onClick={() => setActiveCat(cat.key)}
            />
          ))}
        </div>

        {/* Detail Panel */}
        <div className="col-span-9">
          {active && <CategoryDetail cat={active} />}
        </div>
      </div>
    </div>
  )
}
