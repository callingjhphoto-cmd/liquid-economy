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
      { year: 2022, marketSize: '$14.0B', growth: '+6.8%', volumeCases: '468M', keyEvents: ['Post-pandemic boom', 'Tourism begins returning', 'Cr	Ð¥ÍÑ¥±±ÉäÝÙt°Ñ½ÁAÉ½ÉµÈè	É¤°½ÕÑ±½½¬è
Ñ½ÉäÉ¥Ù¸ä¡½µ½¹ÍÕµÁÑ¥½¸¹Ñ½ÕÉ¥Í´É½ÙÉä¸ô(t(ô°(ì(­äè½¹°(±°è
½¹	É¹ä°(¥½¸è°(¥½¹
½±½ÈèÑáÐµÙ¥½±Ð´ÜÀÀ°(¥½¹	èµÙ¥½±Ð´ÔÀ°(µÉ­ÑM¥éèÐ¸Å°(É½ÝÑ è´È¸Ð°(É½ÝÑ¡¥Èè½Ý¸°(ÑÉ©Ñ½Éäè
½¹¥¹å±¥°½Ý¹ÑÕÉ¸ÑÈÁ¹µ¥µÉ½½´¸ULµÉ­Ð ÔÀ½áÁ½ÉÑÌ¤¹½Éµ±¥é¥¹É½´É½É¡¥¡Ì¸
¡¥¹¹Ñ¤µÕµÁ¥¹ÑÉ¥ÌÑ¡ÉÑ¹¥¹­äÉ½ÝÑ µÉ­Ð¸YL½YM=@Íµ¹ÑÌ±¥¹¥¹Ý¡¥±a<¬¡½±Ì¸°(Ñ½Á5É­ÑÌèl(ì¹µè9¥É¥°É½ÝÑ è¬Ô¸Èô°(ì¹µèM¥¹Á½É°É½ÝÑ è¬È¸Ðô°(ì¹µèUL°É½ÝÑ è´Ð¸Èô°(ì¹µèU,°É½ÝÑ è´Ä¸àô°(ì¹µè
¡¥¹°É½ÝÑ è´à¸Äô(t°(É¹Ìèl!¹¹ÍÍä°Iµä5ÉÑ¥¸°
½ÕÉÙ½¥Í¥È°5ÉÑ±°°UÍÍ°!¥¹°A¥ÉÉÉÉ¹t°(¡¹¹±Ìèì½¹QÉèÐÔ°½QÉèÐà°
½µµÉèÜô°(ÑÉ¹Ìèl(ìÑáÐèUL¥µÁ½ÉÐÙ½±ÕµÌ±¥¹ÈÈÉ½´ÈÀÈÈÁ¬Ì½¹¹½Éµ±¥éÑ¥½¸ÉÙÉÍÌÁ¹µ¥µÉÍÕÉ¹½¹ÍÕµÈ½ÕÌÍ¡¥ÑÌ°Í½ÕÉèULQÉ
½µµ¥ÍÍ¥½¸°ÕÉ°è¡ÑÑÁÌè¼½½ÉÑÕ¹¹½´½ÉÑ¥±½½¹µ¡¹¹ÍÍäµÍ±ÌµÍÑÉÕ±Ì¼ô°(ìÑáÐè
¡¥¹¥µÁ±µ¹ÑÌÌä¹Ñ¤µÕµÁ¥¹ÑÉ¥Ì½¸É¹äÑÉÑ¥¹É¹ ½¹áÁ½ÉÑÌÑ¡ÉÑ¹¥¹ÉÉÙ¹ÕÍÑÉ´°Í½ÕÉè
¡¥¹QÉ5¥¹¥ÍÑÉä°ÕÉ°è¡ÑÑÁÌè¼½ÝÝÜ¹¹¹½´¼ÈÀÈÐ¼ÄÀ¼Àà½¡¥¹µµ½ÙÌµÑ¼µ¥µÁ½ÍµÑÉ¥Ìµ½¸µÔµÉ¹äµ¥µÁ½ÉÑÌ¹¡Ñµ°ô°(ìÑáÐèa<¹ÁÉµ¥Õ´Íµ¹ÑÌ ¬Ð¤É½Ý¥¹Ý¡¥±YL½YM=@½ÉÍµ¹ÑÌ±¥¹´ÜÌÑ½ÉäÁÉµ¥Õµ¥éÌ½È½¹ÑÉÑÌ°Í½ÕÉè1ÕáÕÉäMÁ¥É¥ÑÌIÁ½ÉÐ°ÕÉ°è¡ÑÑÁÌè¼½ÝÝÜ¹Ñ¡¥ÝÍÈ¹½´½¥¹Í¥¡Ð½ÁÉµ¥Õµ¥ÍÑ¥½¸µ¥ÌµÍ±½Ý¥¹µÕÐµÑ¡ÉÌµµ½Õ¹ÑÈµÑÉ¹¼ô°(ìÑáÐèÉ¥µÉ¥¹ÌÉ¥¡ÐÍÁ½ÐÝ¥Ñ 9¥É¥¹M½ÕÑ É¥½¹¥µÁ½ÉÑÌÉ¥Í¥¹ÄÈÌµ¥±±ÍÌáÁ¹Ì°Í½ÕÉèÉ¥¸QÉ9ÑÝ½É¬°ÕÉ°è¡ÑÑÁÌè¼½ÝÝÜ¹Ñ¡ÍÁ¥É¥ÑÍÕÍ¥¹ÍÌ¹½´¼ÈÀÈÔ¼ÀØ½Ñ½À´ÄÀµÍÐµÍ±±¥¹µÉ¹µ¡µÁ¥½¹Ìµ¥¸´ÈÀÈÐ¼ô°(ìÑáÐèµÉ¥¸É¹äÉ¹¥ÍÍ¹¥¹¹¥¹Ý¥Ñ 
±¥½É¹¥¥ÍÑ¥±±É¥Ì¥¹¥¹ÉÐÉ¥¥±¥Ñä¹¡±±¹¥¹ÍÑ±¥Í¡É¹ ÁÉ½ÕÉÌ°Í½ÕÉè
ÉÐMÁ¥É¥ÑÌ5½¹¥Ñ½È°ÕÉ°è¡ÑÑÁÌè¼½ÝÝÜ¹Ñ¡¥ÝÍÈ¹½´½¥¹Í¥¡Ð½¥¹Í¥µÑ¡µ¥ÝÍÈµ±½°µÑÉ¹ÌµÉÁ½ÉÐµ­äµÉ¥ÙÉÌµ½ÈµÙÉµ±½¡½°µ¥¸´ÈÀÈÔ¼ô(t°(åÉ±åIÁ½ÉÑÌèl(ìåÈèÈÀÈÔ°µÉ­ÑM¥éèÐ¸Å°É½ÝÑ è´È¸Ð°Ù½±Õµ
ÍÌèÄÔá4°­åÙ¹ÑÌèl
¡¥¹ÑÉ¥Ì¥Ñ°ULµÉ­ÐÉÑÉÑÌ°a<¡½±ÌÉ½Õ¹t°Ñ½ÁAÉ½ÉµÈè!¹¹ÍÍä°½ÕÑ±½½¬è
½¹ÌÍÑÉÕÑÕÉ°¡Ý¥¹ÌÉ½´ÑÉ¥Ì¹UL¹½Éµ±¥éÑ¥½¸¸ô°(ìåÈèÈÀÈÐ°µÉ­ÑM¥éèÐ¸É°É½ÝÑ è¬Ä¸à°Ù½±Õµ
ÍÌèÄØÉ4°­åÙ¹ÑÌèlQÉ¥ÌÑ­Ð°É¥µÉÌ°a<É½ÝÑ t°Ñ½ÁAÉ½ÉµÈèIµä5ÉÑ¥¸°½ÕÑ±½½¬è
Ñ½ÉäÑÉ¹Í¥Ñ¥½¹¥¹Ý¥Ñ 
¡¥¹ÑÉ¥ÌÉÍ¡Á¥¹±½°µÉ­ÑÌ¸ô°(ìåÈèÈÀÈÌ°µÉ­ÑM¥éèÐ¸Å°É½ÝÑ è¬Ì¸È°Ù½±Õµ
ÍÌèÄÔå4°­åÙ¹ÑÌèlULµÉ­ÐÁ¬°QÉ¥ÝÉ¹¥¹Ì°9¥É¥É½ÝÑ t°Ñ½ÁAÉ½ÉµÈè
½ÕÉÙ½¥Í¥È°½ÕÑ±½½¬è
½¹áÁ½ÉÑÌÉ¡¥¹É½É±Ù±Ì½ÉÑÉ¥¥µÁÐ¸ô°(ìåÈèÈÀÈÈ°µÉ­ÑM¥éèÐ¸Á°É½ÝÑ è¬à¸Ä°Ù½±Õµ
ÍÌèÄÔÕ4°­åÙ¹ÑÌèlA¹µ¥½½´Á­Ì°UL±ÕáÕÉäÍÕÉ°Í¥É½ÝÑ áÁ±½Í¥Ùt°Ñ½ÁAÉ½ÉµÈèUÍÍ°½ÕÑ±½½¬è
½¹É¡Ì±°µÑ¥µáÁ½ÉÐ¡¥ ½¸Á¹µ¥Ý±Ñ ÍÕÉ¸ô(t(ô°(ì(­äè¡µÁ¹°(±°è
¡µÁ¹MÁÉ­±¥¹°(¥½¸èL°(¥½¹
½±½ÈèÑáÐµå±±½Ü´ÜÀÀ°(¥½¹	èµå±±½Ü´ÔÀ°(µÉ­ÑM¥éèÜ¸É°(É½ÝÑ è¬È¸à°(É½ÝÑ¡¥ÈèÕÀ°(ÑÉ©Ñ½Éäè
¡µÁ¹Ù½±Õµ±¥¹¥¹É½´ÈÀÈÈÉ½ÉÕÐÙ±Õ¡½±¥¹ÐÁÉµ¥Õ´¸AÉ½Í¼½¹Ñ¥¹ÕÌ½Õ±µ¥¥ÐÉ½ÝÑ Ì½É±±ÑÉ¹Ñ¥Ù¸
Éµ¹Ð°
Ù°¹¹±¥Í ÍÁÉ­±¥¹µÉ¥¹¥¸ÁÉµ¥Õ´Ñ¥È¸°(Ñ½Á5É­ÑÌèl(ì¹µè)Á¸°É½ÝÑ è¬Ô¸Äô°(ì¹µèUL°É½ÝÑ è¬Ì¸àô°(ì¹µèU,°É½ÝÑ è¬È¸Ðô°(ì¹µèÉ¹°É½ÝÑ è¬Ä¸Èô°(ì¹µè%Ñ±ä°É½ÝÑ è¬À¸àô(t°(É¹Ìèl5½Ð
¡¹½¸°YÕÙ
±¥ÅÕ½Ð°½´AÉ¥¹½¸°15É°5¥½¹ÑÑ¼°9¥½±ÌÕ¥±±ÑÑt°(¡¹¹±Ìèì½¹QÉèÔÈ°½QÉèÐÀ°
½µµÉèàô°(ÑÉ¹Ìèl(ìÑáÐè
¡µÁ¹Ù½±Õµ±¥¹É½´ÌÈÙ4½ÑÑ±Ì ÈÀÈÈ¤Ñ¼Èäå4½ÑÑ±ÌÌÑ½Éä½¹ÑÉÑÌÉ½´±°µÑ¥µ¡¥ °Í½ÕÉè
¡µÁ¹	ÕÉÔ%¹ÑÉ¹Ñ¥½¹°°ÕÉ°è¡ÑÑÁÌè¼½ÝÝÜ¹Ñ¡¥ÝÍÈ¹½´½¥¹Í¥¡Ð½¥¹Í¥µÑ¡µ¥ÝÍÈµ±½°µÑÉ¹ÌµÉÁ½ÉÐµ­äµÉ¥ÙÉÌµ½ÈµÙÉµ±½¡½°µ¥¸´ÈÀÈÔ¼ô°(ìÑáÐèAÉ½Í¼½ÕÑÍ±±Ì
¡µÁ¹ÐÈèÄÉÑ¥¼±½±±äÌÙ±Õµ½¹Í¥½ÕÌ½¹ÍÕµÉÌ¡½½Í½É±±ÑÉ¹Ñ¥ÙÌÐÍ¥µ¥±ÈÁÉ¥Á½¥¹ÑÌ°Í½ÕÉè±½°MÁÉ­±¥¹]¥¹IÁ½ÉÐ°ÕÉ°è¡ÑÑÁÌè¼½ÝÝÜ¹Ñ¡¥ÝÍÈ¹½´½¥¹Í¥¡Ð½ÁÉµ¥Õµ¥ÍÑ¥½¸µ¥ÌµÍ±½Ý¥¹µÕÐµÑ¡ÉÌµµ½Õ¹ÑÈµÑÉ¹¼ô°(ìÑáÐè¹±¥Í ÍÁÉ­±¥¹Ý¥¹Ñ½Éä¥¹¥¹ÁÉÍÑ¥¹ÁÉµ¥Õ´Á½Í¥Ñ¥½¹¥¹Ì±¥µÑ¡¹¹±Ì½¹Í¥ÍÑ¹ÐÁÉ½ÕÑ¥½¸ÅÕ±¥Ñä°Í½ÕÉè¹±¥Í ]¥¹Ì
½Õ¹¥°°ÕÉ°è¡ÑÑÁÌè¼½ÝÝÜ¹ÙÉ¥±ä¹½´½ÉÑ¥±¼ÈÀÈÔ¼ÀÄ¼Èä½±½°µ±½Üµ¹µ¹¼µ±½¡½°µµÉ­ÐµÑµ½È´ÈÀÈÔ¼ô°(ìÑáÐèÉ½ÝÈ
¡µÁ¹¥¹Á¹¹ÐÁÉ½ÕÉÌÉ½Ý¥¹¬ÄÈÌ½¹ÍÕµÉÌÍ¬ÕÑ¡¹Ñ¥¥Ñä¹¥ÉÐÉ±Ñ¥½¹Í¡¥ÁÌÝ¥Ñ ÁÉ½ÕÉÌ°Í½ÕÉè
¡µÁ¹QÉÍÍ½¥Ñ¥½¸°ÕÉ°è¡ÑÑÁÌè¼½ÝÝÜ¹Ñ¡¥ÝÍÈ¹½´½¥¹Í¥¡Ð½¥¹Í¥µÑ¡µ¥ÝÍÈµ±½°µÑÉ¹ÌµÉÁ½ÉÐµ­äµÉ¥ÙÉÌµ½ÈµÙÉµ±½¡½°µ¥¸´ÈÀÈÔ¼ô°(ìÑáÐèMÁÉ­±¥¹IQ½­Ñ¥±ÌµÉ¥¹ÌÉ½ÝÑ É½¹Ñ¥ÈÝ¥Ñ å½Õ¹È½¹ÍÕµÉÌ½ÁÑ¥¹ÉäµÑ¼µÉ¥¹¬½ÉµÑÌ½È½Í¥½¹Ì°Í½ÕÉè	ÙÉ%¹¹½ÙÑ¥½¸]Ñ °ÕÉ°è¡ÑÑÁÌè¼½ÝÝÜ¹ÙÉ¥±ä¹½´½ÉÑ¥±¼ÈÀÈÔ¼ÀÄ¼Èä½±½°µ±½Üµ¹µ¹¼µ±½¡½°µµÉ­ÐµÑµ½È´ÈÀÈÔ¼ô(t°(åÉ±åIÁ½ÉÑÌèl(ìåÈèÈÀÈÔ°µÉ­ÑM¥éèÜ¸É°É½ÝÑ è¬È¸à°Ù½±Õµ
ÍÌèÈäå4°­åÙ¹ÑÌèlY±ÕÍµ¹ÐÉ½ÝÌ°¹±¥Í ÍÁÉ­±¥¹É¥ÍÌ°AÉ½Í¼ÈèÄÉÑ¥¼t°Ñ½ÁAÉ½ÉµÈèYÕÙ
±¥ÅÕ½Ð°½ÕÑ±½½¬è
¡µÁ¹ÍÑ¥±¥é¥¹¥¸Ù±ÕÝ¡¥±Ù½±ÕµÉµ¥¹Ì±½ÜÁ¬¸ô°(ìåÈèÈÀÈÐ°µÉ­ÑM¥éèÜ¸Á°É½ÝÑ è¬Ì¸Ð°Ù½±Õµ
ÍÌèÌÀá4°­åÙ¹ÑÌèlAÉ½Í¼±ÉÑ¥½¸°¹±¥Í ÍÁÉ­±¥¹ÁÉµ¥Õ´°É½ÝÈÑ½Éä¬ÄÈt°Ñ½ÁAÉ½ÉµÈè15É°½ÕÑ±½½¬è
Ñ½ÉäÉ½¹¥¹Ý¥Ñ ±ÑÉ¹Ñ¥ÙÌ¥¹¥¹Í¡ÉÉ½´ÑÉ¥Ñ¥½¹°
¡µÁ¹¸ô°(ìåÈèÈÀÈÌ°µÉ­ÑM¥éèØ¸á°É½ÝÑ è¬Ð¸Ä°Ù½±Õµ
ÍÌèÌÄá4°­åÙ¹ÑÌèl
¡µÁ¹¥¹Ì±¥¹¥¹°AÉ½Í¼ÍÕÉ½¹Ñ¥¹ÕÌ°
Éµ¹ÐáÁ¹Í¥½¸t°Ñ½ÁAÉ½ÉµÈè5½Ð
¡¹½¸°½ÕÑ±½½¬è
¡µÁ¹É¡¥¹Ù½±ÕµÁ¬Ì±ÑÉ¹Ñ¥ÙÌ¥¸µ½µ¹ÑÕ´¸ô°(ìåÈèÈÀÈÈ°µÉ­ÑM¥éèØ¸Õ°É½ÝÑ è¬Ô¸à°Ù½±Õµ
ÍÌèÌÈÙ4°­åÙ¹ÑÌèl±°µÑ¥µ
¡µÁ¹¡¥ °A¹µ¥±ÉÑ¥½¸ÍÕÉ°AÉµ¥Õ´½ÕÌt°Ñ½ÁAÉ½ÉµÈè½´AÉ¥¹½¸°½ÕÑ±½½¬èMÁÉ­±¥¹Ý¥¹Ñ½ÉäÐ±°µÑ¥µ¡¥¡Ì½¸Á¹µ¥±ÉÑ¥½¸½½´¸ô(t(ô°(ì(­äèÝ¥¹°(±°è]¥¹°(¥½¸è]¤°(¥½¹
½±½ÈèÑáÐµÕ¡Í¥´ÜÀÀ°(¥½¹	èµÕ¡Í¥´ÔÀ°(µÉ­ÑM¥éèÌà¸É°(É½ÝÑ è´Ä¸È°(É½ÝÑ¡¥Èè½Ý¸°(ÑÉ©Ñ½Éäè±½°Ý¥¹µÉ­Ð¥¸ÍÑÉÕÑÕÉ°±¥¹PÙ½±Õµ½Ý¸½ÈÍÉ½¹ÍÕÑ¥ÙåÈ¸e½Õ¹È½¹ÍÕµÉÌ¡½½Í¥¹ÍÁ¥É¥ÑÌ°IQÌ°¹9½1¼±ÑÉ¹Ñ¥ÙÌ¸AÉµ¥Õ´Ý¥¹Ì¡½±¥¹Ù±ÕÝ¡¥±ÍÕ´ÄÀ½±±ÁÍÌ¸
±¥µÑ¡¹¥ÍÉÕÁÑ¥¹ÑÉ¥Ñ¥½¹°É¥½¹Ì¸°(Ñ½Á5É­ÑÌèl(ì¹µè
¡¥¹°É½ÝÑ è´Ø¸Èô°(ì¹µè%Ñ±ä°É½ÝÑ è´Ä¸àô°(ì¹µèÉ¹°É½ÝÑ è´Ì¸Ðô°(ì¹µèUL°É½ÝÑ è´È¸Äô°(ì¹µèU,°É½ÝÑ è´À¸àô(t°(É¹Ìèl	É½½Ð°e±±½ÜQ¥°°)½Í 
±±ÉÌ°-¥´
ÉÝ½É°5¥½µ¤°1
Éµ°
åµÕÌt°(¡¹¹±Ìèì½¹QÉèÌÔ°½QÉèÔà°
½µµÉèÜô°(ÑÉ¹Ìèl(ìÑáÐè±½°Ý¥¹½¹ÍÕµÁÑ¥½¸É¡ÌÈÔµåÈ±½ÜÝ¥Ñ Ù½±Õµ±¥¹¥¹Ñ¡¥É½¹ÍÕÑ¥ÙåÈÌå½Õ¹Èµ½ÉÁ¡¥ÌÙ½¥Ñ½Éä°Í½ÕÉè%¹ÑÉ¹Ñ¥½¹°]¥¹=É¹¥éÑ¥½¸°ÕÉ°è¡ÑÑÁÌè¼½ÝÝÜ¹Ñ¡¥ÝÍÈ¹½´½¥¹Í¥¡Ð½¥¹Í¥µÑ¡µ¥ÝÍÈµ±½°µÑÉ¹ÌµÉÁ½ÉÐµ­äµÉ¥ÙÉÌµ½ÈµÙÉµ±½¡½°µ¥¸´ÈÀÈÔ¼ô°(ìÑáÐèAÉµ¥Õ´Ý¥¹Ì ¬ÐÙ±ÕÉ½ÝÑ ¤¡½±¥¹Í¡ÉÝ¡¥±ÍÕ´ÄÀÙ±ÕÝ¥¹Ì±¥¹¥¹´ÜÌÑ½Éä¥ÕÉÑÌÉµÑ¥±±ä°Í½ÕÉè]¥¹5É­Ð%¹Ñ±±¥¹°ÕÉ°è¡ÑÑÁÌè¼½ÝÝÜ¹Ñ¡¥ÝÍÈ¹½´½¥¹Í¥¡Ð½ÁÉµ¥Õµ¥ÍÑ¥½¸µ¥ÌµÍ±½Ý¥¹µÕÐµÑ¡ÉÌµµ½Õ¹ÑÈµÑÉ¹¼ô°(ìÑáÐè9ÑÕÉ°Ý¥¹Ñ½ÉäÉÁÉÍ¹ÑÌÌ½Í±ÌÕÐÉ½Ý¥¹¬ÈÀe½dÌÍÕÍÑ¥¹¥±¥Ñä¹ÕÑ¡¹Ñ¥¥ÑäÉÍ½¹ÑÝ¥Ñ å½Õ¹È½¹ÍÕµÉÌ°Í½ÕÉè9ÑÕÉ°]¥¹IÁ½ÉÐ°ÕÉ°è¡ÑÑÁÌè¼½ÝÝÜ¹Ñ¡ÍÁ¥É¥ÑÍÕÍ¥¹ÍÌ¹½´¼ÈÀÈÔ¼ÀØ½Ñ½À´ÄÀµÍÐµÍ±±¥¹µÉ¹µ¡µÁ¥½¹Ìµ¥¸´ÈÀÈÐ¼ô°(ìÑáÐèTÍÕÍ¥¥é¥¹Éµ½Ù°½àÀ°ÀÀÀ¬¡ÑÉÌ½Ù¥¹åÉÌÕÑ¼ÍÑÉÕÑÕÉ°½ÙÉÍÕÁÁ±ä¹±¥¹¥¹µ¹É½ÍÌÕÉ½Á°Í½ÕÉèÕÉ½Á¸
½µµ¥ÍÍ¥½¸°ÕÉ°è¡ÑÑÁÌè¼½ÝÝÜ¹ÙÉ¥±ä¹½´½ÉÑ¥±¼ÈÀÈÔ¼ÀÄ¼Èä½±½°µ±½Üµ¹µ¹¼µ±½¡½°µµÉ­ÐµÑµ½È´ÈÀÈÔ¼ô°(ìÑáÐèQÝ¥¹Í¡¥Áµ¹ÑÌ±¥¹¥¹´ÄÀÌÍ¡¥ÁÁ¥¹ÉÕ±Ñ¥½¹ÌÑ¥¡Ñ¸¹½¹ÍÕµÉÌÁÉÈ½¹Ù¹¥¹½ÉÑ¥°½IQ±ÑÉ¹Ñ¥ÙÌ°Í½ÕÉèQ
½µµÉIÁ½ÉÐ°ÕÉ°è¡ÑÑÁÌè¼½ÝÝÜ¹Ñ¡¥ÝÍÈ¹½´½¥¹Í¥¡Ð½µ½ÉµÑ¡¸µµ½ÉÑ¥½¸µÑ¡µ±½¹µÑÉ´µÉ¥Íµ½µ¹¼µ¹µ±½Ü¼ô(t°(åÉ±åIÁ½ÉÑÌèl(ìåÈèÈÀÈÔ°µÉ­ÑM¥éèÌà¸É°É½ÝÑ è´Ä¸È°Ù½±Õµ
ÍÌèÄÈÐÁ4°­åÙ¹ÑÌèlÍÉåÈ±¥¹°AÉµ¥Õ´¬Ð°9ÑÕÉ°Ý¥¹¬ÈÀt°Ñ½ÁAÉ½ÉµÈè-¥´
ÉÝ½É°½ÕÑ±½½¬è]¥¹µÉ­Ð½¹ÑÉÑ¥¹Ìå½Õ¹È½¹ÍÕµÉÌÙ½¥Ñ½Éä¹Ñ¥É±ä¸ô°(ìåÈèÈÀÈÐ°µÉ­ÑM¥éèÌà¸Ý°É½ÝÑ è¬À¸È°Ù½±Õµ
ÍÌèÄÈÔÕ4°­åÙ¹ÑÌèl±¥¹½¹Ñ¥¹ÕÌ°QÁÉÍÍÕÉ°AÉµ¥Õ´ÍÕÍÑ¥¹Ìt°Ñ½ÁAÉ½ÉµÈè	É½½Ð°½ÕÑ±½½¬è]¥¹ÍÑ¥±¥é¥¹Ð±½ÝÈ½¹ÍÕµÁÑ¥½¸±Ù±ÌÝ¥Ñ ÍÑÉÕÑÕÉ°¡Ý¥¹Ì¸ô°(ìåÈèÈÀÈÌ°µÉ­ÑM¥éèÌà¸Ù°É½ÝÑ è´È¸Ä°Ù½±Õµ
ÍÌèÄÈàÑ4°­åÙ¹ÑÌèl±¥¹±ÉÑÌ°TÙ¥¹åÉÕÁÉ½½Ñ¥¹°
±¥µÑ¥µÁÑÌt°Ñ½ÁAÉ½ÉµÈèe±±½ÜQ¥°°½ÕÑ±½½¬è]¥¹µÉ­ÐáÁÉ¥¹¥¹ÍÕÍÑ¥¹Ù½±Õµ±¥¹µ¥µ½ÉÁ¡¥Í¡¥ÑÌ¸ô°(ìåÈèÈÀÈÈ°µÉ­ÑM¥éèÌä¸Ñ°É½ÝÑ è¬Ä¸à°Ù½±Õµ
ÍÌèÄÌÄÉ4°­åÙ¹ÑÌèlA½ÍÐµÁ¹µ¥¹½Éµ±¥éÑ¥½¸°AÉµ¥Õ´Ý¥¹ÌÉ½ÙÈ°IÑ¥°½ÕÌÍÑÉ¹Ñ¡¹Ìt°Ñ½ÁAÉ½ÉµÈè5¥½µ¤°½ÕÑ±½½¬è]¥¹ÉÑÕÉ¹¥¹Ñ¼ÍÑÉÕÑÕÉ°±½¹µÑÉ´±¥¹ÑÈÁ¹µ¥¹½µ±ä¸ô(t°(Ý¥¹Á¥ÙèÑÉÕ°(ÙÉ¥Ñ±Ìèl(ì¹µè
¡É½¹¹ä°Ù±ÕèÄà°¡¹è´Ä¸Èô°(ì¹µè
É¹ÐMÕÙ¥¹½¸°Ù±ÕèÄÔ°¡¹è´À¸àô°(ì¹µèMÕÙ¥¹½¸	±¹°Ù±ÕèÄÈ°¡¹è¬À¸Ðô°(ì¹µèA¥¹½Ð9½¥È°Ù±ÕèÄÄ°¡¹è´È¸Äô°(ì¹µè5É±½Ð°Ù±ÕèÄÀ°¡¹è´Ì¸Èô°(ì¹µèM¡¥Éè°Ù±Õèä°¡¹è¬Ä¸àô°(ì¹µèI¥Í±¥¹°Ù±Õèà°¡¹è¬È¸Ðô°(ì¹µèAÉ½Í¼½MÁÉ­±¥¹°Ù±ÕèÄÜ°¡¹è¬Ô¸Äô(t°(½Õ¹ÑÉ¥Ìèl(ì¹µèÉ¹°Ù±ÕèÈÈ°¡¹è´È¸Ðô°(ì¹µè%Ñ±ä°Ù±ÕèÄà°¡¹è´Ä¸Èô°(ì¹µèMÁ¥¸°Ù±ÕèÄÐ°¡¹è¬À¸àô°(ì¹µèÕÍÑÉ±¥°Ù±ÕèÄÈ°¡¹è¬Ä¸Ðô°(ì¹µèUL¡
±¥½É¹¥¤°Ù±ÕèÄÄ°¡¹è´À¸Øô°(ì¹µè
¡¥±°Ù±Õèä°¡¹è¬È¸Äô°(ì¹µèÉ¹Ñ¥¹°Ù±ÕèÜ°¡¹è¬Ì¸Èô°(ì¹µè9Üi±¹°Ù±ÕèÜ°¡¹è¬Ä¸àô(t(ô°(ì(­äèÈ°(±°è	È
ÉÐ°(¥½¸è°(¥½¹
½±½ÈèÑáÐµ±¥µ´ÜÀÀ°(¥½¹	èµ±¥µ´ÔÀ°(µÉ­ÑM¥éèØÈÍ°(É½ÝÑ è¬Ä¸Ð°(É½ÝÑ¡¥ÈèÕÀ°(ÑÉ©Ñ½Éäè]½É±pÌ±ÉÍÐ±½¡½°Ñ½ÉääÙ½±Õµ¸
ÉÐÈÉ½ÝÑ Í±½Ý¥¹ÑÈµ±½¹½½´¸5á¥¸±È¥µÁ½ÉÑÌ½µ¥¹Ñ¥¹ULÉ½ÝÑ ¸!ÉÍ±ÑéÈ½½±¥¹¸9½¸µ±½¡½±¥ÈÍÑÍÐµÉ½Ý¥¹Íµ¹Ð¸°(Ñ½Á5É­ÑÌèl(ì¹µè5á¥¼°É½ÝÑ è¬Ð¸Èô°(ì¹µè	Éé¥°°É½ÝÑ è¬Ì¸Ðô°(ì¹µèUL°É½ÝÑ è¬À¸àô°(ì¹µè
¡¥¹°É½ÝÑ è´Ä¸Èô°(ì¹µèÉµ¹ä°É½ÝÑ è´À¸Øô(t°(É¹Ìèl5½±¼°
½É½¹°!¥¹­¸°	ÕÝ¥ÍÈ°Õ¥¹¹ÍÌ°M¥ÉÉ9Ù°MµÕ°µÌt°(¡¹¹±Ìèì½¹QÉèÌÈ°½QÉèØÈ°
½µµÉèØô°(ÑÉ¹Ìèl(ìÑáÐè5½±¼½µÌÄÈÉ¹¥¸ULµÉ­ÐÍÕÉÁÍÍ¥¹	Õ1¥¡Ðµ¥ÍáÕ°½å½ÑÐ¹¡¹¥¹½¹ÍÕµÈÁÉÉ¹Ì°Í½ÕÉè	È5É­Ð5½¹¥Ñ½È°ÕÉ°è¡ÑÑÁÌè¼½ÝÝÜ¹Ñ¡¥ÝÍÈ¹½´½¥¹Í¥¡Ð½¥¹Í¥µÑ¡µ¥ÝÍÈµ±½°µÑÉ¹ÌµÉÁ½ÉÐµ­äµÉ¥ÙÉÌµ½ÈµÙÉµ±½¡½°µ¥¸´ÈÀÈÔ¼ô°(ìÑáÐè
ÉÐÈÍµ¹ÐÉ½ÝÑ ÍÑ±±ÌÐ´ÄÝ¥Ñ ÌÀÀ¬ÉÐÉÝÉ¥Ì±½Í¥¹ÌµÉ­Ð½ÙÉÍÑÕÉÑ¥½¸É¡ÌÉ¥Ñ¥°ÍÑ°Í½ÕÉè	ÉÝÉÌÍÍ½¥Ñ¥½¸°ÕÉ°è¡ÑÑÁÌè¼½ÝÝÜ¹Ñ¡¥ÝÍÈ¹½´½¥¹Í¥¡Ð½ÁÉµ¥Õµ¥ÍÑ¥½¸µ¥ÌµÍ±½Ý¥¹µÕÐµÑ¡ÉÌµµ½Õ¹ÑÈµÑÉ¹¼ô°(ìÑáÐè9½¸µ±½¡½±¥ÈÍÑÍÐµÉ½Ý¥¹ÈÍµ¹ÐÝ¥Ñ ¬ÈÔÉ½ÝÑ Ìå½Õ¹È½¹ÍÕµÉÌ¹Í½ÈµÕÉ¥½ÕÌµ½Ùµ¹Ð¥¹Ìµ½µ¹ÑÕ´°Í½ÕÉè±½¡½°µÉ	ÙÉIÁ½ÉÐ°ÕÉ°è¡ÑÑÁÌè¼½ÝÝÜ¹Ñ¡¥ÝÍÈ¹½´½¥¹Í¥¡Ð½É½ÝÑ µ½´Ñ¸µáÁÑµÉ½´µ¹¼µ±½¡½°µÑ½Éäµä´ÈÀÈà¼ô°(ìÑáÐè5á¥¸È¥µÁ½ÉÑÌ½µÁÉ¥ÍÈÀ½Ñ½Ñ°ULµÉ­Ð½¹ÍÕµÁÑ¥½¸Ý¥Ñ 5½±¼¹
½É½¹½µ¥¹Ñ¥¹¥µÁ½ÉÐÉ½ÝÑ Ñ½É¥Ì°Í½ÕÉèUL	ÉÝÉÌÕ¥±°ÕÉ°è¡ÑÑÁÌè¼½ÝÝÜ¹Í¡¹­¹¹ÝÍ¥±ä¹½´¼ÈÀÈÐ¼ÀÈ¼ÄÌ¼ÌÐàÌÔ½Ñ¥Ñ½ÌµÍÌµÍµ±±Èµ½ÉµÑÌµÍÑ½­µÉ½ÝÑ µÌµÙ½±Õµµ±¥µÌµ½Ù´ÄÉ´µÍÌ¼ô°(ìÑáÐèÕ¥¹¹ÍÌQ¥­Q½¬É¹¥ÍÍ¹µÁ¥¸É¥ÙÌÕ¹áÁÑ¬ÈÐÉ½ÝÑ ¥¸å½Õ¹Èµ½ÉÁ¡¥½¹ÍÕµÁÑ¥½¸ÉÙÉÍ¥¹ÈÀµåÈ±¥¹°Í½ÕÉèM½¥°5¥¹±åÑ¥Ì°ÕÉ°è¡ÑÑÁÌè¼½ÝÝÜ¹ÙÉ¥±ä¹½´½ÉÑ¥±¼ÈÀÈÔ¼ÀÄ¼Èä½±½°µ±½Üµ¹µ¹¼µ±½¡½°µµÉ­ÐµÑµ½È´ÈÀÈÔ¼ô(t°(åÉ±åIÁ½ÉÑÌèl(ìåÈèÈÀÈÔ°µÉ­ÑM¥éèØÈÍ°É½ÝÑ è¬Ä¸Ð°Ù½±Õµ
ÍÌèÄàÔÙ4°­åÙ¹ÑÌèl5½±¼ÄUL°
ÉÐ´Ä°9È¬ÈÔt°Ñ½ÁAÉ½ÉµÈè5½±¼°½ÕÑ±½½¬è5á¥¸±ÉÌÍÕÍÑ¥¸É½ÝÑ Ý¡¥±ÉÐ½¹Í½±¥Ñ¥½¸½¹Ñ¥¹ÕÌ¸ô°(ìåÈèÈÀÈÐ°µÉ­ÑM¥éèØÄÑ°É½ÝÑ è¬È¸Ä°Ù½±Õµ
ÍÌèÄàÌÅ4°­åÙ¹ÑÌèl5½±¼ÍÕÉ¥¹Ì°
ÉÐÍÑ±±Ì°!ÉÍ±ÑéÈ±¥¹Ìt°Ñ½ÁAÉ½ÉµÈè
½É½¹°½ÕÑ±½½¬è
Ñ½ÉäÍÑ¥±¥é¥¹Ý¥Ñ 5á¥¸¥µÁ½ÉÑÌÉ¥Ù¥¹½ÙÉ±°É½ÝÑ ¸ô°(ìåÈèÈÀÈÌ°µÉ­ÑM¥éèØÀÉ°É½ÝÑ è¬Ì¸È°Ù½±Õµ
ÍÌèÄÜäÑ4°­åÙ¹ÑÌèl
ÉÐ½½´Á­Ì°9ÈµÉÌ°%µÁ½ÉÐ±ÉÑ¥½¸t°Ñ½ÁAÉ½ÉµÈè!¥¹­¸°½ÕÑ±½½¬è±½°ÈµÉ­ÐÉ½ÙÉ¥¹ÌÁ½ÍÐµÁ¹µ¥½¹ÍÕµÁÑ¥½¸¹½Éµ±¥éÌ¸ô°(ìåÈèÈÀÈÈ°µÉ­ÑM¥éèÔàÍ°É½ÝÑ è¬Ð¸à°Ù½±Õµ
ÍÌèÄÜÔá4°­åÙ¹ÑÌèlA¹µ¥É½ÙÉä°
ÉÐÁ¬°!ÉÍ±ÑéÈ½½´t°Ñ½ÁAÉ½ÉµÈè	ÕÝ¥ÍÈ°½ÕÑ±½½¬è	ÈÑ½Éä¹¥Ñ¥¹É½´±°µ½Í¥½¸É¥¹­¥¹¥¸Á¹µ¥É½ÙÉä¸ô(t(ô°(ì(­äè¹½±¼°(±°è9¼1½Ü±½¡½°°(¥½¸è90°(¥½¹
½±½ÈèÑáÐµÑ°´ÜÀÀ°(¥½¹	èµÑ°´ÔÀ°(µÉ­ÑM¥éèÄÍ°(É½ÝÑ è¬Ü¸Ô°(É½ÝÑ¡¥ÈèÕÀ°(ÑÉ©Ñ½ÉäèÍÑÍÐµÉ½Ý¥¹µÉ¼Ñ½ÉäÉ½ÍÌ±°ÙÉ±½¡½°¸9¼µ±½¡½°É½Ý¥¹ÍÑÈÑ¡¸±½Üµ±½¡½°¸	È½µ¥¹ÑÌÙ½±ÕµÕÐÍÁ¥É¥ÑÌ¹Ý¥¹Ñ¡¥¹ÕÀ¸MÑ¥±°É±ä¥¹¹¥¹ÌP9½1¼ÉÁÉÍ¹ÑÌ©ÕÍÐÄ¸Ô½Ñ½Ñ°ÙÉ±½¡½°¸°(Ñ½Á5É­ÑÌèl(ì¹µèUL°É½ÝÑ è¬ÄÐ¸Äô°(ì¹µèÉµ¹ä°É½ÝÑ è¬ÄÈ¸Ðô°(ì¹µèU,°É½ÝÑ è¬ä¸àô°(ì¹µèMÁ¥¸°É½ÝÑ è¬à¸Èô°(ì¹µè)Á¸°É½ÝÑ è¬Ø¸Ðô(t°(É¹ÌèlÑ¡±Ñ¥	ÉÝ¥¹°M±¥À°1åÉÌ°5½¹ä°!¥¹­¸À¸À°Õ¥¹¹ÍÌÀ¸À°Ét°(¡¹¹±Ìèì½¹QÉèÈÔ°½QÉèØÈ°
½µµÉèÄÌô°(ÑÉ¹Ìèl(ìÑáÐè9¼µ±½¡½°Ñ½ÉäÉ½Ý¥¹ÍàÍÑÈÑ¡¸±½Üµ±½¡½°Ì½¹ÍÕµÉÌÍ¬Õ±°±Ù½ÈÝ¥Ñ¡½ÕÐ¹äÑ¡¹½°°Í½ÕÉè9½1¼5É­ÐIÁ½ÉÐ°ÕÉ°è¡ÑÑÁÌè¼½ÝÝÜ¹Ñ¡¥ÝÍÈ¹½´½¥¹Í¥¡Ð½µ½ÉµÑ¡¸µµ½ÉÑ¥½¸µÑ¡µ±½¹µÑÉ´µÉ¥Íµ½µ¹¼µ¹µ±½Ü¼ô°(ìÑáÐè
Ñ½ÉäÙ±ÕÐÑ¬äÈÀÈàÝ¥Ñ ÁÉ½©Ñ¥½¹ÌÍ¡½Ý¥¹ÕàÉ½ÝÑ ½ÙÈÌµ¥¹ÍÑÉ´½ÁÑ¥½¸±ÉÑÌ°Í½ÕÉèÕÑÕÉ	ÙÉÌIÁ½ÉÐ°ÕÉ°è¡ÑÑÁÌè¼½ÝÝÜ¹Ñ¡¥ÝÍÈ¹½´½¥¹Í¥¡Ð½É½ÝÑ µ½´Ñ¸µáÁÑµÉ½´µ¹¼µ±½¡½°µÑ½Éäµä´ÈÀÈà¼ô°(ìÑáÐèÉä)¹ÕÉäÁÉÑ¥¥ÁÑ¥½¸É¡ÌÌÀ½½¹ÍÕµÉÌ±½±±äÝ¥Ñ 9½1¼É¥Ù¥¹ÉÑ¥°ÑÉ¥°¹½¹ÙÉÍ¥½¸µ½µ¹ÑÕ´°Í½ÕÉè
½¹ÍÕµÈ	¡Ù¥½ÈMÑÕä°ÕÉ°è¡ÑÑÁÌè¼½ÝÝÜ¹Ñ¡¥ÝÍÈ¹½´½¥¹Í¥¡Ð½¥¹Í¥µÑ¡µ¥ÝÍÈµ±½°µÑÉ¹ÌµÉÁ½ÉÐµ­äµÉ¥ÙÉÌµ½ÈµÙÉµ±½¡½°µ¥¸´ÈÀÈÔ¼ô°(ìÑáÐè9½¸µ±½¡½±¥ÈÁÉ½©ÑÑ¼ÍÕÉÁÍÌÑÉ¥Ñ¥½¹°±Ñ½ÉäÝ¥Ñ¡¥¸¹áÐÔåÉÌ¥Ù¸ÕÉÉ¹ÐÉ½ÝÑ ÑÉ©Ñ½É¥Ì°Í½ÕÉè
Ñ½Éä½ÉÍÑ¥¹5½°°ÕÉ°è¡ÑÑÁÌè¼½ÝÝÜ¹Ñ¡¥ÝÍÈ¹½´½¥¹Í¥¡Ð½É½ÝÑ µ½´Ñ¸µáÁÑµÉ½´µ¹¼µ±½¡½°µÑ½Éäµä´ÈÀÈà¼ô°(ìÑáÐè¸h¹5¥±±¹¹¥±ÌÉ¥Ù¥¹½ÁÑ¥½¸Ý¥Ñ ÐÔÁÉÉ¹½È9½1¼½ÁÑ¥½¹ÌÝ¡¸Ù¥±±Ð½¸µÁÉµ¥ÍÙ¹ÕÌ°Í½ÕÉèµ½ÉÁ¡¥¹±åÍ¥Ì°ÕÉ°è¡ÑÑÁÌè¼½ÝÝÜ¹Ñ¡¥ÝÍÈ¹½´½¥¹Í¥¡Ð½¥¹Í¥µÑ¡µ¥ÝÍÈµ±½°µÑÉ¹ÌµÉÁ½ÉÐµ­äµÉ¥ÙÉÌµ½ÈµÙÉµ±½¡½°µ¥¸´ÈÀÈÔ¼ô(t°(åÉ±åIÁ½ÉÑÌèl(ìå\KX\Ù]Ú^N	ÉLÐËÜÝÝ	ÊÍËIIËÛ[YPØ\Ù\Î	Ì
SIËÙ^Q][ÎÉÓËX[ÈÞ\Ý\Ë	ÑH[X\HÌ	IË	ÑÙ[YÜ[Û×KÜ\ÜY\	Ð]]XÈ]Ú[ÉËÝ]ÛÚÎ	ÓÓÈØ]YÛÜHXÛÛZ[ÈXZ[ÝX[HÚ]ÛÛ[YYXØÙ[\][ÛÈKÈYX\X\Ù]Ú^N	ÉLPËÜÝÝ	ÊÎIËÛ[YPØ\Ù\Î	ÌSIËÙ^Q][ÎÉÓXZ[ÝX[HYÜ[ÛË	ÓHY\ÛÛIË	ÔÜ\]ÈØ]Ú[È\	×KÜ\ÜY\\IÜÈÝ]ÛÚÎ	ÓÓÈØ]YÛÜHXXÚ[È[XÝ[ÛÚ[Ú]XZÜ[È[\Ý[ËÈKÈYX\ËX\Ù]Ú^N	ÉLKËÜÝÝ	ÊÎKIIËÛ[YPØ\Ù\Î	Ì
IËÙ^Q][ÎÉÑH[X\HÜÝÜÉË	ÓHÜ\]È[Y\ÙIË	ÔÛØ\Ý\[Ý\È[	×KÜ\ÜY\	ÒZ[ZÙ[	ËÝ]ÛÚÎ	ÐØ]YÛÜH^\Y[Ú[È^ÜÚ]HÜÝÝ\ÈXZ[ÝX[HXØÙ\[ÙH^[ËÈKÈYX\X\Ù]Ú^N	ÉLÐËÜÝÝ	ÊÍ	IËÛ[YPØ\Ù\Î	ÌIËÙ^Q][ÎÉÕÙ[\ÜÈ[XØÙ[\]\ÉË	ÑH[X\HYÚ[ÉË	Ñ\ÝXZÜ[][Ú\É×KÜ\ÜY\	ÔÙYY\	ËÝ]ÛÚÎ	ÓÓÈ[Y\Ú[È\È\Ý\ÝYÜÝÚ[È[ÛÚÛØ]YÛÜHÛØ[KÈBBKÂÙ^N	Ü	ËX[	ÔÈXYK]ËQ[ÉËXÛÛ	Ô	ËXÛÛÛÛÜ	Ý^XÞX[MÌ	ËXÛÛÎ	ØËXÞX[ML	ËX\Ù]Ú^N	É
ËÜÝÝ	ÊÎIËÜÝÝ\	Ý\	ËZXÝÜN	ÔÜXYK]ËY[ÈØ]YÛÜHÛÛ[Y\ÈÝÛÈÜÝÝ\ÈÛÛ[Y[ÙH[ÜX[]HÚ[ØØØ\Ú[ÛÈÛHY\[Ú[KÜ\]ËX\ÙYÈÝ]ÜÝÚ[ÈX[X\ÙY[Z][HÛØÚÝZ[\Ý[HÈ[Y\Ú[È\È^ÛY\ËÜX\Ù]ÎÂÈ[YN	ÕRÉËÜÝÝ	ÊÌLIIÈKÈ[YN	ÕTÉËÜÝÝ	ÊÌLIÈKÈ[YN	ÑÙ\X[IËÜÝÝ	ÊÎIIÈKÈ[YN	Ð]\Ý[XIËÜÝÝ	ÊÍË	IÈKÈ[YN	Ò\[ËÜÝÝ	ÊÍK	IÈBK[ÎÉÒYÚÛÛË	ÐÝ]Ø]\Ë	Ñ]\UYHÉË	ÕÚ]HÛ]ÉË	Õ[IË	ÓÛHØÚÜÉË	Õ\Ü	×KÚ[[ÎÈÛYNMKÙYN
ÌPÛÛ[Y\ÙNLÈK[ÎÂÈ^	ÔÜ\]ËX\ÙYÈÝ\ZÚ[ÈX[X\ÙY\ÈØ]YÛÜHXY\Ú]\]Z[H[Ú[ÈÚÝÚ[ÈÝÛÙ\ÝÜÝÝ[ÛY[[IËÛÝ\ÙN	ÔX\Ù][[YÙ[ÙIË\	ÚÎËÝÝÝËZ]ÜÜÛÛKÚ[ÚYÚÚ[ÚYK]KZ]ÜÜYÛØ[][Ë\\ÜZÙ^KY]\ËYÜX]\YÙKX[ÛÚÛZ[LKÉÈKÈ^	ÒYÚÛÛXÛÛY\ÈÌHTÈ[Ú]
ÌHÜÝÝ\ÈÛÛÝ[Y\Y\[ÙHÚYÈÝØ\Ü\]YÜØ\]X[]HÙXÝÉËÛÝ\ÙN	ÔXÚÚ[È\Ü	Ë\	ÚÎËÝÝÝËZ]ÜÜÛÛKÚ[ÚYÚÜ[Z][Z\Ø][ÛZ\Ë\ÛÝÚ[ËX]]\\ËXKXÛÝ[\][ÉÈKÈ^	Ô[Z][HÛØÚÝZ[\Ý[HÈÜÝÚ[È
ÌÍIH\ÈØ]YÛÜH[Ý\È\X\Ù]Ú]ÜYZ^ÛÙÞH]XÝ[ÈYY[ÛÛÝ[Y\ÉËÛÝ\ÙN	Ô[Z][HÜXØ\Ý	Ë\	ÚÎËÝÝÝË]\YÙYZ[KÛÛKÐ\XÛKÌKÌKÌKÙÛØ[[ÝËX[[ËX[ÛÚÛ[X\Ù]Y]KYÜLKÉÈKÈ^	Ò\Ù[\Ø]YÛÜHXÛ[[ÈN	HÚ[HÜ\]ÈÝ\ÙH[[ÛÝ][ÈXZÜÚY[ÛÛÝ[Y\Y\[Ù\ÈÝØ\]ÜËÛÝ\ÙN	ÔÙ[\	[Û]ÜË\	ÚÎËÝÝÝËZ]ÜÜÛÛKÚ[ÚYÚÛ[ÜK][[[Ù\][Û]K[ÛË]\K\\ÙK[Ù[ËX[[ÝËÉÈKÈ^	ÒXÚÈ[Y[	ÜÈ[ÛØØKPÛÛH][ÚÚYÛ[ÈXZÜÜ\]È[È[\[ÈØ]YÛÜHÚ]X\ÜÈX\Ù]\ÝX][ÛY[YÙIËÛÝ\ÙN	Ó][Ú[Ý[Ù[Y[\Ü	Ë\	ÚÎËÝÝÝËÚ[Ù[]ÜÙZ[KÛÛKÌÌÌLËÌÍÍKÝ]ÜË\ÙY\Ë\ÛX[\YÜX]Ë\ÝÚÙKYÜÝÝX\Ë]Û[YKXÛ[XËXXÝKLLKXØ\Ù\ËÉÈBKYX\T\ÜÎÂÈYX\KX\Ù]Ú^N	É
ËÜÝÝ	ÊÎIËÛ[YPØ\Ù\Î	ÌLIËÙ^Q][ÎÉÔÜ\]ËX\ÙYXY	Ë	ÒYÚÛÛÌIË	Ô[Z][HÛØÚÝZ[È
ÌÍII×KÜ\ÜY\	ÒYÚÛÛËÝ]ÛÚÎ	ÔØ]YÛÜHÝ\ÝZ[[ÈÝÛÈÜÝÝ\ÈÛÛ[Y[ÙHØØØ\Ú[ÛÚ[ËÈKÈYX\X\Ù]Ú^N	ÉÍPËÜÝÝ	ÊÎK	IËÛ[YPØ\Ù\Î	ÎM
IËÙ^Q][ÎÉÓXZÜ[][Ú\ÉË	ÐÛØÚÝZ[È[Y\ÙIË	ÔÙ[\XÛ[\É×KÜ\ÜY\	ÐÝ]Ø]\ËÝ]ÛÚÎ	ÔXÛÛZ[ÈXZ[ÝX[HÚ]XZÜÜ\]ÈÛÛ\[Y\È[\[ÈX\Ù]ÈKÈYX\ËX\Ù]Ú^N	ÉÌËËÜÝÝ	ÊÌLIËÛ[YPØ\Ù\Î	Î
ÓIËÙ^Q][ÎÉÔÜ\]ÈÈXØÙ[\]IË	ÐØ]YÛÜH[Z][Z^\ÉË	Ò\Ù[\XZÜÉ×KÜ\ÜY\	ÕÚ]HÛ]ÉËÝ]ÛÚÎ	ÔØ]YÛÜH^\Y[Ú[È^ÜÚ]HÜÝÝ\È[Ý][ÛXØÙ[\]\ËÈKÈYX\X\Ù]Ú^N	ÉÌÐËÜÝÝ	ÊÌLK	IËÛ[YPØ\Ù\Î	ÍÎLIËÙ^Q][ÎÉÔ[[ZXÈÛÛ[Y[ÙHÛÛIË	ÔÙ[\ÛZ[]\ÉË	ÔÜ\]][Ú\É×KÜ\ÜY\	Õ[IËÝ]ÛÚÎ	Ô\Ý\ÝYÜÝÚ[È]\YÙH[ÛÚÛØ]YÛÜHÛÛÛ[Y[ÙH[ÈBBBBÛÛÝÛÝ\ÙS[ÈH
ÈÛÝ\ÙK\JHO
HY^Ý\H\Ù]HØ[È[HÛÜ[\ÜY\\Û\ÜÓ[YOH[[KY^][\ËXÙ[\Ø\LH^XYKMÝ\^XYKMÌ^^ÈÛ[YY][HÜÛÝ\Ù_H^\[[ÈÚ^O^ÌLHÏØOBÛÛÝØ]YÛÜPØ\H
ÈØ]\ÐXÝ]KÛÛXÚÈJHO
]ÛÛÛXÚÏ^ÛÛÛXÚßHÛ\ÜÓ[YO^ØËY[^[YÝ[Y^Ü\LÈÝ\ÛÜ\Ú[\[Ú][ÛX[	Â\ÐXÝ]BÈ	ØË\Û]KN^]Ú]HÜ\\Û]KNÚYÝË[ÉÂ	ØË]Ú]HÜ\YÜ^KLLÝ\ÚYÝË[YÝ\Ü\XYKL	ÂXO]Û\ÜÓ[YOH^][\Ë\Ý\Ø\LÈ]Û\ÜÓ[YO^Ø^][\ËXÙ[\\ÝYKXÙ[\ËNNÝ[Y[È^^ÈÛXÛ	ÈZ\ÐXÝ]HÈ	ØØ]XÛÛßH	ØØ]XÛÛÛÛÜX	ØË\Û]KM^]Ú]IßXOØØ]XÛÛBÙ]]Û\ÜÓ[YOH^LHZ[]ËL]Û\ÜÓ[YO^Ø^\ÛHÛ\Ù[ZXÛ	Ú\ÐXÝ]HÈ	Ý^]Ú]IÈ	Ý^\Û]KN	ßXOØØ]X[OÙ]]Û\ÜÓ[YO^Ø^^È	Ú\ÐXÝ]HÈ	Ý^\Û]KL	È	Ý^YÜ^KML	ßXOØØ]X\Ù]Ú^_OÙ]]Û\ÜÓ[YO^Ø^^ÈÛ\Ù[ZXÛ]LH	ØØ]ÜÝÝ\OOH	ÙÝÛÈÈ	Ý^\YM	È	Ý^YÜY[M	ßXOØØ]ÜÝÝ\OOH	ÙÝÛÈÈ	ø¥¯	È	ø¥¬ßHØØ]ÜÝÝBÙ]Ù]Ù]Ø]ÛBÛÛÝÚ[QY\]HH
ÈØ]JHOÂÛÛÝÜÚÝÕ\Y][ËÙ]ÚÝÕ\Y][×HH\ÙTÝ]J[ÙJB]\
]Û\ÜÓ[YOHË]Ú]HÝ[Y^Ü\Ü\YÜ^KLLMH]ÛÛÛXÚÏ^Ê
HOÙ]ÚÝÕ\Y][Ê\ÚÝÕ\Y][Ê_BÛ\ÜÓ[YOHËY[^][\ËXÙ[\\ÝYKX]ÙY[Ý\ËYÜ^KMLLÈ[^LÈÝ[Y[È[Ú][ÛXÛÛÜÈÈÛ\ÜÓ[YOH^\ÛHÛXÛ^\Û]KN\\Ø\ÙHXÚÚ[Ë]ÚY\Ú[H\Y][È	ÜYÚ[ÏÚÏÚ]ÛÝÛÚ^O^ÌNHÛ\ÜÓ[YO^Ø^YÜ^KM[Ú][Û][ÙÜH	ÜÚÝÕ\Y][ÈÈ	ÜÝ]KLN	È	ÉßXHÏØ]ÛÜÚÝÕ\Y][È	
]Û\ÜÓ[YOH]MÜXÙK^KM]
Û\ÜÓ[YOH^^ÈÛXÛ^YÜ^KML\\Ø\ÙHXLÈÜ\Y][ÏÚ
]Û\ÜÓ[YOHÜXÙK^KLØØ]\Y][ÏËX\

JHO
]Ù^O^Ú_HÛ\ÜÓ[YOH^][\ËXÙ[\\ÝYKX]ÙY[Ü[Û\ÜÓ[YOH^\ÛH^YÜ^KMÌÝ[Y_OÜÜ[]Û\ÜÓ[YOH^][\ËXÙ[\Ø\L]Û\ÜÓ[YOHËLÌËYÜ^KLLÝ[YY[L]Û\ÜÓ[YOHËYÜYY[]Ë\ÛKYXÚÚXKMLËYXÚÚXKMLÝ[YY[Ý[O^ÞÝÚY[Y__OÙ]Ù]Ü[Û\ÜÓ[YOH^^È^YÜ^KMËLLÝ[Y_OÜÜ[Ü[Û\ÜÓ[YO^Ø^^ÈÛ\Ù[ZXÛËN	ÝÚ[ÙKÝ\ÕÚ]
	ÊÉÊHÈ	Ý^YÜY[M	È	Ý^\YM	ßXOÝÚ[Ù_OÜÜ[Ù]Ù]
J_BÙ]Ù]]
Û\ÜÓ[YOH^^ÈÛXÛ^YÜ^KML\\Ø\ÙHXLÈÜÜYÚ[ÏÚ
]Û\ÜÓ[YOHÜXÙK^KLØØ]ÛÝ[Y\ÏËX\

ËJHO
]Ù^O^Ú_HÛ\ÜÓ[YOH^][\ËXÙ[\\ÝYKX]ÙY[Ü[Û\ÜÓ[YOH^\ÛH^YÜ^KMÌØË[Y_OÜÜ[]Û\ÜÓ[YOH^][\ËXÙ[\Ø\L]Û\ÜÓ[YOHËLÌËYÜ^KLLÝ[YY[L]Û\ÜÓ[YOHËYÜYY[]Ë\ÛKYXÚÚXKMLËYXÚÚXKMLÝ[YY[Ý[O^ÞÝÚYË[Y__OÙ]Ù]Ü[Û\ÜÓ[YOH^^È^YÜ^KMËLLØË[Y_OÜÜ[Ü[Û\ÜÓ[YO^Ø^^ÈÛ\Ù[ZXÛËN	ØËÚ[ÙKÝ\ÕÚ]
	ÊÉÊHÈ	Ý^YÜY[M	È	Ý^\YM	ßXOØËÚ[Ù_OÜÜ[Ù]Ù]
J_BÙ]Ù]Ù]
_BÙ]
BBÛÛÝYX\T\ÜÈH
È\ÜÈJHOÂÛÛÝÛÜ[YX\Ù]Ü[YX\HH\ÙTÝ]JJBÛÛÝÝ\[\ÜH\ÜË[
OYX\OOHÜ[YX\B]\
]Û\ÜÓ[YOHË]Ú]HÝ[Y^Ü\Ü\YÜ^KLLMH]Û\ÜÓ[YOH^][\ËXÙ[\Ø\LÈXMØ[[\Ú^O^ÌNHÛ\ÜÓ[YOH^YÜ^KMÏÈÛ\ÜÓ[YOH^\ÛHÛXÛ^\Û]KN\\Ø\ÙHXÚÚ[Ë]ÚY\YX\H\ÜÏÚÏÙ]]Û\ÜÓ[YOH^Ø\LXMHÖÌKËKX\
YX\O
]ÛÙ^O^ÞYX\BÛÛXÚÏ^Ê
HOÙ]Ü[YX\YX\_BÛ\ÜÓ[YO^ØLÈKLHÝ[Y[È^^ÈÛ\Ù[ZXÛ[Ú][ÛXÛÛÜÈ	ÂÜ[YX\OOHYX\È	ØË\Û]KN^]Ú]IÂ	ØËYÜ^KLL^YÜ^KMÝ\ËYÜ^KL	ÂXBÞYX\BØ]Û
J_BÙ]ØÝ\[\Ü	
]Û\ÜÓ[YOHÜXÙK^KM]Û\ÜÓ[YOHÜYÜYXÛÛËLÈØ\LÈ]Û\ÜÓ[YOHËYÜ^KMLÝ[Y[ÈLÈ]Û\ÜÓ[YOH^^È^YÜ^KMLÛ\Ù[ZXÛXLHX\Ù]Ú^OÙ]]Û\ÜÓ[YOH^[ÈÛXÛ^\Û]KNØÝ\[\ÜX\Ù]Ú^_OÙ]Ù]]Û\ÜÓ[YOHËYÜ^KMLÝ[Y[ÈLÈ]Û\ÜÓ[YOH^^È^YÜ^KMLÛ\Ù[ZXÛXLHÜÝÝÙ]]Û\ÜÓ[YO^Ø^[ÈÛXÛ	ØÝ\[\ÜÜÝÝÝ\ÕÚ]
	ÊÉÊHÈ	Ý^YÜY[M	È	Ý^\YM	ßXOØÝ\[\ÜÜÝÝOÙ]Ù]]Û\ÜÓ[YOHËYÜ^KMLÝ[Y[ÈLÈ]Û\ÜÓ[YOH^^È^YÜ^KMLÛ\Ù[ZXÛXLHÛ[YOÙ]]Û\ÜÓ[YOH^[ÈÛXÛ^\Û]KNØÝ\[\ÜÛ[YPØ\Ù\ßOÙ]Ù]Ù]]
Û\ÜÓ[YOH^^ÈÛXÛ^YÜ^KML\\Ø\ÙHXLÙ^H][ÏÚ
ÛÛ\ÜÓ[YOHÜXÙK^KLH^\ÛH^YÜ^KMÌØÝ\[\ÜÙ^Q][ËX\

][JHO
HÙ^O^Ú_HÛ\ÜÓ[YOH^Ø\LÜ[Û\ÜÓ[YOHÛ\Ù[ZXÛ^YÜ^KMÚH
È_KÜÜ[Ü[Ù][OÜÜ[ÛO
J_BÛÛÙ]]Û\ÜÓ[YOH^][\ËXÙ[\Ø\LË^Y[ÝËMLÝ[Y[ÈLÈÝ\Ú^O^ÌMHÛ\ÜÓ[YOH^^Y[ÝËM^\Ú[ËLÏ]]Û\ÜÓ[YOH^^ÈÛXÛ^YÜ^KMLÜ\ÜY\Ù]]Û\ÜÓ[YOH^\ÛHÛ\Ù[ZXÛ^\Û]KNØÝ\[\ÜÜ\ÜY\OÙ]Ù]Ù]]
Û\ÜÓ[YOH^^ÈÛXÛ^YÜ^KML\\Ø\ÙHXLÝ]ÛÚÏÚ
Û\ÜÓ[YOH^\ÛH^YÜ^KMÌØÝ\[\ÜÝ]ÛÚßOÜÙ]Ù]
_BÙ]
BBÛÛÝØ]YÛÜQ]Z[H
ÈØ]JHO
]Û\ÜÓ[YOHÜXÙK^KMËÊXY\Ø\
ßB]Û\ÜÓ[YOHË]Ú]HÝ[Y^Ü\Ü\YÜ^KLLM]Û\ÜÓ[YOH^][\Ë\Ý\\ÝYKX]ÙY[XM]Û\ÜÓ[YOH^LÞÛXÛ^\Û]KNØØ]X[OÚÛ\ÜÓ[YOH^YÜ^KM]LØØ]ZXÝÜ_OÜÙ]]Û\ÜÓ[YOH^\YÚ]Û\ÜÓ[YOH^\ÛH^YÜ^KMLXLHX\Ù]Ú^OÙ]]Û\ÜÓ[YOH^LÞÛXÛ^\Û]KNØØ]X\Ù]Ú^_OÙ]Ù]Ù]]Û\ÜÓ[YOH^][\ËXÙ[\Ø\M]Û\ÜÓ[YO^Ø^][\ËXÙ[\Ø\L	ØØ]ÜÝÝ\OOH	ÙÝÛÈÈ	Ý^\YM	È	Ý^YÜY[M	ßXOØØ]ÜÝÝ\OOH	ÙÝÛÈÈ[[ÑÝÛÚ^O^ÌHÏ[[Õ\Ú^O^ÌHÏBÜ[Û\ÜÓ[YOH^[ÈÛXÛØØ]ÜÝÝOÜÜ[Ù]]Û\ÜÓ[YOH^\ÛH^YÜ^KMØØ]ÜÝÝ\OOH	ÙÝÛÈÈ	ÑXÛ[[ÉÈØ]ÜÝÝ\OOH	Ý\	ÈÈ	ÑÜÝÚ[ÉÈ	Ñ]	ßOÙ]Ù]Ù]ËÊÜÜÝÝX\Ù]È
ßB]Û\ÜÓ[YOHË]Ú]HÝ[Y^Ü\Ü\YÜ^KLLMHÈÛ\ÜÓ[YOH^\ÛHÛXÛ^\Û]KN\\Ø\ÙHXÚÚ[Ë]ÚY\XMÜÜÝÝX\Ù]ÏÚÏ]Û\ÜÓ[YOHÜXÙK^KLÈØØ]ÜX\Ù]ËX\

X\Ù]JHO
]Ù^O^Ú_HÛ\ÜÓ[YOH^][\ËXÙ[\\ÝYKX]ÙY[]Û\ÜÓ[YOH^][\ËXÙ[\Ø\LÛØHÚ^O^ÌMHÛ\ÜÓ[YOH^YÜ^KMÏÜ[Û\ÜÓ[YOH^\ÛH^YÜ^KMÌÛX\Ù][Y_OÜÜ[Ù]Ü[Û\ÜÓ[YO^Ø^\ÛHÛ\Ù[ZXÛ	ÛX\Ù]ÜÝÝÝ\ÕÚ]
	ÊÉÊHÈ	Ý^YÜY[MËYÜY[ML	È	Ý^\YMË\YML	ßHLKLHÝ[YOÛX\Ù]ÜÝÝBÜÜ[Ù]
J_BÙ]Ù]ËÊÚ[[Ü]
ßB]Û\ÜÓ[YOHË]Ú]HÝ[Y^Ü\Ü\YÜ^KLLMHÈÛ\ÜÓ[YOH^\ÛHÛXÛ^\Û]KN\\Ø\ÙHXÚÚ[Ë]ÚY\XMÚ[[Ü]ÚÏ]Û\ÜÓ[YOHÜXÙK^KLÈÖÂÈX[	ÓÛUYIË[YNØ]Ú[[ËÛYKÛÛÜ	ØËXYKML	ÈKÈX[	ÓÙUYIË[YNØ]Ú[[ËÙYKÛÛÜ	ØË\\KML	ÈKÈX[	ÑKPÛÛ[Y\ÙIË[YNØ]Ú[[ËPÛÛ[Y\ÙKÛÛÜ	ØËXÞX[ML	ÈBKX\

ÚJHO
]Ù^O^Ú_O]Û\ÜÓ[YOH^\ÝYKX]ÙY[XLHÜ[Û\ÜÓ[YOH^\ÛH^YÜ^KMÌØÚX[OÜÜ[Ü[Û\ÜÓ[YOH^\ÛHÛ\Ù[ZXÛ^\Û]KNØÚ[Y_IOÜÜ[Ù]]Û\ÜÓ[YOHËY[ËYÜ^KLLÝ[YY[L]Û\ÜÓ[YO^Ø	ØÚÛÛÜHLÝ[YY[HÝ[O^ÞÝÚY	ØÚ[Y_IX_OÙ]Ù]Ù]
J_BÙ]Ù]ËÊÙ^H[È
ßB]Û\ÜÓ[YOHË]Ú]HÝ[Y^Ü\Ü\YÜ^KLLMHÈÛ\ÜÓ[YOH^\ÛHÛXÛ^\Û]KN\\Ø\ÙHXÚÚ[Ë]ÚY\XMÙ^H[ÏÚÏ]Û\ÜÓ[YOH^^]Ü\Ø\LØØ][ËX\

[JHO
Ü[Ù^O^Ú_HÛ\ÜÓ[YOHË\Û]KLL^\Û]KN^^ÈÛ\Ù[ZXÛLÈKLHÝ[YY[Ø[BÜÜ[
J_BÙ]Ù]ËÊ[[ÚYÚÈ
ßB]Û\ÜÓ[YOHË]Ú]HÝ[Y^Ü\Ü\YÜ^KLLMHÈÛ\ÜÓ[YOH^\ÛHÛXÛ^\Û]KN\\Ø\ÙHXÚÚ[Ë]ÚY\XM[[ÚYÚÏÚÏÛÛ\ÜÓ[YOHÜXÙK^KLÈØØ][ËX\

[JHO
HÙ^O^Ú_HÛ\ÜÓ[YOH^Ø\LÈÜ[Û\ÜÓ[YOH^YÜ^KMÛ\Ù[ZXÛ^\Ú[ËL]LHÚH
È_OÜÜ[]Û\ÜÓ[YOH^\ÛH^YÜ^KMÌXLHÝ[^OÜÛÝ\ÙS[ÈÛÝ\ÙO^Ý[ÛÝ\Ù_H\^Ý[\HÏÙ]ÛO
J_BÛÛÙ]ËÊYX\H\ÜÈ
ßBYX\T\ÜÈ\ÜÏ^ØØ]YX\T\ÜßHÏËÊÚ[HY\]HHÛHÜÚ[HØ]YÛÜH
ßBØØ]Ú[QY\]H	Ú[QY\]HØ]^ØØ]HÏBÙ]B^ÜY][[Ý[ÛØ]YÛÜR[[YÙ[ÙJ
HÂÛÛÝØXÝ]PØ]Ù]XÝ]PØ]HH\ÙTÝ]JÐUQÓÔQTÖÌKÙ^JBÛÛÝXÝ]HHÐUQÓÔQTË[
ÈOËÙ^HOOHXÝ]PØ]
B]\
]Û\ÜÓ[YOHÜXÙK^KM]HÛ\ÜÓ[YOH^LÛXÛ^\Û]KNØ]YÛÜH[[YÙ[ÙOÚOÛ\ÜÓ[YOH^YÜ^KML]LHÛØ[Ü\]È	]\YÙHØ]YÛÜY\È8 %X\Ù]Ú^[Ë[È	Ý]ÛÚÏÜÙ]]Û\ÜÓ[YOHÜYÜYXÛÛËLLØ\MËÊÚYX\
ßB]Û\ÜÓ[YOHÛÛ\Ü[LÈÜXÙK^KLÜ[Û\ÜÓ[YOH^^ÈÛXÛ^YÜ^KM\\Ø\ÙHXÚÚ[Ë]ÚY\Ø]YÛÜY\ÏÜÜ[ÐÐUQÓÔQTËX\
Ø]O
Ø]YÛÜPØ\Ù^O^ØØ]Ù^_BØ]^ØØ]B\ÐXÝ]O^ØXÝ]PØ]OOHØ]Ù^_BÛÛXÚÏ^Ê
HOÙ]XÝ]PØ]
Ø]Ù^J_BÏ
J_BÙ]ËÊ]Z[[[
ßB]Û\ÜÓ[YOHÛÛ\Ü[NHØXÝ]H	Ø]YÛÜQ]Z[Ø]^ØXÝ]_HÏBÙ]Ù]Ù]
BB
