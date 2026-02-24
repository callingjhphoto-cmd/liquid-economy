import React, { useState } from 'react'
import { Wine, Beer, Martini, Flame, Grape, Leaf, Zap, TrendingUp, TrendingDown, Minus, Globe, BarChart3, ShoppingCart, Users, Star, ChevronRight, ExternalLink } from 'lucide-react'

const CATEGORIES = [
  {
    key: 'tequila', label: 'Tequila & Mezcal', emoji: 'ð¸ Î¼',
    marketSize: '$4.8B', growth: '+7.8%', growthDir: 'up',
    trajectory: 'Fastest-growing spirits category globally. Premium and ultra-premium segments now represent 45% of volume, up from 28% five years ago. Mezcal emerging as artisanal subcategory with 18% CAGR.',
    topMarkets: [{ name: 'United States', growth: '+9.2%' }, { name: 'Mexico', growth: '+4.1%' }, { name: 'Spain', growth: '+12.8%' }, { name: 'Germany', growth: '+15.3%' }, { name: 'UK', growth: '+11.4%' }],
    brands: ['PatrÃ³n', 'Don Julio', 'Clase Azul', 'Casamigos', 'EspolÃ³n', 'Del Maguey', 'Fortaleza', 'Casa Noble'],
    channels: { onTrade: 42, offTrade: 48, ecommerce: 10 },
    trends: [
      { text: 'Agave oversupply has crashed prices 94% from $1.60/kg to $0.10/kg â 500M-liter surplus dubbed the "Tequila Lake" signals end of shortage cycle', source: 'Brunch God NY', url: 'https://www.brunchgodny.com/industry-news/tequilas-boom-meets-reality-celebrity-brands-agave-glut-and-the-500-million-surplus' },
      { text: 'Celebrity-backed tequilas grew 40% in 2022 vs 13% category average, but growth slowing to single digits as market saturates with 40+ celebrity brands', source: 'Felene Vodka Market Analysis', url: 'https://felenevodka.com/tequila-market-trends-2025-cycle-peak-operators/' },
      { text: 'Additive-free certification becoming table stakes for premium positioning â class-action lawsuits in 2025 accuse major brands of adulteration', source: 'Felene Vodka Market Analysis', url: 'https://felenevodka.com/tequila-market-trends-2025-cycle-peak-operators/' },
      { text: 'Mezcal denominations of origin expanding beyond Oaxaca to 9 Mexican states â mezcal CAGR forecast at 10% through 2027', source: 'The Spirits Business', url: 'https://www.thespiritsbusiness.com/2024/12/world-spirits-report-2024-tequila-mezcal/' },
      { text: 'Cristalino (filtered aÃ±ejo) fastest-growing sub-segment at +24% YoY â reposado remains volume leader at 38% share', source: 'OhBev Market Report', url: 'https://www.ohbev.com/blog/tequila-market-2025-forecasts-and-trends' }
    ]
  },
  {
    key: 'vodka', label: 'Vodka', emoji: 'ð¸ Â§',
    marketSize: '$40.1B', growth: '-0.8%', growthDir: 'down',
    trajectory: 'Mature category experiencing volume decline but value growth through premiumization. Flavored vodka declining while premium unflavored and craft vodka gaining share. RTD cocktails cannibalizing entry-level occasions.',
    topMarkets: [{ name: 'United States', growth: '-1.2%' }, { name: 'Russia', growth: '+0.4%' }, { name: 'Poland', growth: '+1.8%' }, { name: 'India', growth: '+6.2%' }, { name: 'UK', growth: '-2.1%' }],
    brands: ['Smirnoff', 'Absolut', 'Grey Goose', 'Tito\'s', 'Belvedere', 'Ketel One', 'Stolichnaya', 'New Amsterdam'],
    channels: { onTrade: 35, offTrade: 55, ecommerce: 10 },
    trends: [
      { text: 'Tito\'s remains #1 spirit brand in US at 12M+ cases ($2.6B retail) but posted first-ever volume decline of -1.5% in 2024', source: 'Market Watch Magazine', url: 'https://www.marketwatchmag.com/vodka-weathers-the-storm/' },
      { text: 'Premiumization driving value growth despite volume decline â average price per bottle up 4.7% as consumers trade up', source: 'IWSR', url: 'https://www.theiwsr.com/insight/premiumisation-is-slowing-but-theres-a-counter-trend/' },
      { text: 'Flavored variants declining at -6% while premium unflavored grows at +3% â craft positioning winning over novelty flavors', source: 'Market Watch Magazine', url: 'https://www.marketwatchmag.com/vodka-weathers-the-storm/' },
      { text: 'RTD cocktails cannibalizing entry-level vodka occasion â Moscow Mule kits especially impacted as canned versions proliferate', source: 'IWSR Global Trends', url: 'https://www.theiwsr.com/insight/inside-the-iwsr-global-trends-report-key-drivers-for-beverage-alcohol-in-2025/' },
      { text: 'Sustainability messaging becoming differentiator â carbon-neutral distilling and organic grain sourcing driving premium shelf space', source: 'Shanken News Daily', url: 'https://www.shankennewsdaily.com/2024/02/13/34835/titos-sees-smaller-formats-stoke-growth-as-volume-climbs-above-12m-cases/' }
    ]
  },
  {
    key: 'gin', label: 'Gin', emoji: 'ð¸ Â«',
    marketSize: '$14.2B', growth: '+1.2%', growthDir: 'up',
    trajectory: 'Post-boom normalization after explosive 2016-2021 growth. Category matured with premium craft segment stabilizing. Pink gin declining but contemporary botanicals maintaining interest. Spain remains largest gin market globally.',
    topMarkets: [{ name: 'Spain', growth: '+0.8%' }, { name: 'Philippines', growth: '+3.4%' }, { name: 'UK', growth: '-1.2%' }, { name: 'United States', growth: '+2.1%' }, { name: 'Germany', growth: '+4.5%' }],
    brands: ['Tanqueray', 'Hendrick\'s', 'Bombay Sapphire', 'Beefeater', 'Gordon\'s', 'The Botanist', 'Monkey 47'],
    channels: { onTrade: 48, offTrade: 44, ecommerce: 8 },
    trends: [
      { text: 'UK gin boom has peaked â volume flat after 5 years of double-digit growth, with over 900 UK distilleries creating oversupply', source: 'The Spirits Business', url: 'https://www.thespiritsbusiness.com/2024/12/world-spirits-report-2024-tequila-mezcal/' },
      { text: 'Pink gin in steep decline at -15% as novelty fades â classic London Dry and contemporary botanical styles holding share', source: 'IWSR', url: 'https://www.theiwsr.com/insight/iwsr-preliminary-data-release-beverage-alcohol-endures-another-tough-year-in-2024/' },
      { text: 'Non-alcoholic gin fastest-growing NoLo sub-category at +35% â Seedlip, Lyre\'s and Monday leading', source: 'IWSR No/Low Study', url: 'https://www.theiwsr.com/insight/more-than-moderation-the-long-term-rise-of-no-and-low/' },
      { text: 'Spain consumes more gin per capita than any other country â gin tonic culture deeply embedded in on-trade', source: 'IWSR', url: 'https://www.theiwsr.com/insight/inside-the-iwsr-global-trends-report-key-drivers-for-beverage-alcohol-in-2025/' },
      { text: 'Japanese gin emerging as premium sub-category â Roku now fastest-growing premium gin globally with +22% growth', source: 'The Spirits Business', url: 'https://www.thespiritsbusiness.com/2025/06/top-10-best-selling-brand-champions-in-2024/' }
    ]
  },
  {
    key: 'whisky', label: 'Whisky', emoji: 'ð¸ Â¥',
    marketSize: '$6.3B exports', growth: '+4.2%', growthDir: 'up',
    trajectory: 'Resilient global category with premiumization driving value growth. American whiskey and Irish whiskey outpacing Scotch in growth. Japanese whisky supply constraints continue to limit allocation. Indian whisky emerging as volume powerhouse.',
    topMarkets: [{ name: 'United States', growth: '+3.8%' }, { name: 'India', growth: '+8.2%' }, { name: 'France', growth: '+1.2%' }, { name: 'Japan', growth: '+5.1%' }, { name: 'Germany', growth: '+4.8%' }],
    brands: ['Jack Daniel\'s', 'Jameson', 'Johnnie Walker', 'Crown Royal', 'Maker\'s Mark', 'Glenfiddich', 'Yamazaki'],
    channels: { onTrade: 40, offTrade: 50, ecommerce: 10 },
    trends: [
      { text: 'Irish whiskey achieves 10M case milestone â Jameson now world\'s 3rd largest whiskey brand by volume with double-digit growth continuing', source: 'The Spirits Business', url: 'https://www.thespiritsbusiness.com/2025/06/top-10-best-selling-brand-champions-in-2024/' },
      { text: 'Japanese whisky allocation crisis intensifying â Suntory and Nikka limiting releases, secondary market prices 3-5x retail on allocated bottles', source: 'IWSR', url: 'https://www.theiwsr.com/insight/inside-the-iwsr-global-trends-report-key-drivers-for-beverage-alcohol-in-2025/' },
      { text: 'American single malt category officially recognized by TTB in 2025 â expected to grow at 15%+ CAGR as craft distillers compete with Scotch', source: 'IWSR', url: 'https://www.theiwsr.com/insight/iwsr-preliminary-data-release-beverage-alcohol-endures-another-tough-year-in-2024/' },
      { text: 'India overtakes France as largest whisky market by volume â domestic brands like Amrut and Paul John gaining international recognition', source: 'IWSR Global Trends', url: 'https://www.theiwsr.com/insight/inside-the-iwsr-global-trends-report-key-drivers-for-beverage-alcohol-in-2025/' },
      { text: 'Scotch exports recovered to Â£6.3B in 2024 after tariff disruption â single malt growing at +8% while blended Scotch flat', source: 'The Spirits Business', url: 'https://www.thespiritsbusiness.com/2024/12/world-spirits-report-2024-tequila-mezcal/' }
    ]
  },
  {
    key: 'rum', label: 'Rum', emoji: 'ð¸ ð´',
    marketSize: '$15.8B', growth: '+3.1%', growthDir: 'up',
    trajectory: 'Category renaissance driven by premium aged expressions and cocktail culture revival. Spiced rum dominant in volume but premium sipping rums gaining. Caribbean tourism recovery boosting brand awareness.',
    topMarkets: [{ name: 'India', growth: '+5.4%' }, { name: 'United States', growth: '+2.8%' }, { name: 'Philippines', growth: '+3.1%' }, { name: 'UK', growth: '+1.9%' }, { name: 'Germany', growth: '+6.2%' }],
    brands: ['Bacardi', 'Captain Morgan', 'Havana Club', 'DiplomÃ¡tico', 'Ron Zacapa', 'Mount Gay', 'Appleton Estate'],
    channels: { onTrade: 38, offTrade: 52, ecommerce: 10 },
    trends: [
      { text: 'Premium aged rum (+$30) growing at +12% â consumers discovering sipping-quality expressions from Jamaica, Barbados, and Guatemala', source: 'IWSR', url: 'https://www.theiwsr.com/insight/inside-the-iwsr-global-trends-report-key-drivers-for-beverage-alcohol-in-2025/' },
      { text: 'Rhum agricole gaining recognition outside French Caribbean â AOC Martinique designation driving premiumization similar to Cognac\'s appellation model', source: 'The Spirits Business', url: 'https://www.thespiritsbusiness.com/2024/12/world-spirits-report-2024-tequila-mezcal/' },
      { text: 'Spiced rum volume flat as Captain Morgan faces competition from flavored whiskeys and RTDs â innovation shifting to tropical flavors', source: 'IWSR', url: 'https://www.theiwsr.com/insight/iwsr-preliminary-data-release-beverage-alcohol-endures-another-tough-year-in-2024/' },
      { text: 'India remains world\'s largest rum market by volume â McDowell\'s No.1 and Old Monk dominate domestically while premium imports grow', source: 'IWSR Global Trends', url: 'https://www.theiwsr.com/insight/inside-the-iwsr-global-trends-report-key-drivers-for-beverage-alcohol-in-2025/' },
      { text: 'Rum-based RTDs emerging as growth driver â canned rum punch and tropical cocktails competing with hard seltzers for occasion share', source: 'IWSR', url: 'https://www.theiwsr.com/insight/inside-the-iwsr-global-trends-report-key-drivers-for-beverage-alcohol-in-2025/' }
    ]
  },
  {
    key: 'cognac', label: 'Cognac & Brandy', emoji: 'ð¸',
    marketSize: '$4.1B', growth: '-2.4%', growthDir: 'down',
    trajectory: 'Cognac facing significant headwinds from China tariff retaliation and US demand softening. VSOP and above segments more resilient. Brandy broadly declining except in specific African and Asian markets.',
    topMarkets: [{ name: 'United States', growth: '-3.2%' }, { name: 'China', growth: '-28%' }, { name: 'Nigeria', growth: '+4.1%' }, { name: 'UK', growth: '-1.8%' }, { name: 'Singapore', growth: '+2.4%' }],
    brands: ['Hennessy', 'RÃ©my Martin', 'Martell', 'Courvoisier', 'Camus', 'Hine', 'Torres'],
    channels: { onTrade: 35, offTrade: 52, ecommerce: 13 },
    trends: [
      { text: 'China cognac crisis: EU-China trade war triggered 35% provisional tariffs in Oct 2024 â Hennessy and RÃ©my Martin reporting -28% China revenue', source: 'IWSR', url: 'https://www.theiwsr.com/insight/iwsr-preliminary-data-release-beverage-alcohol-endures-another-tough-year-in-2024/' },
      { text: 'US cognac market cooling after pandemic-era surge â VS segment hit hardest while XO and above holding at +2%', source: 'IWSR', url: 'https://www.theiwsr.com/insight/global-beverage-alcohol-market-set-for-moderate-recovery-in-2025-while-challenges-persist-in-2024/' },
      { text: 'Status spirits segment lost nearly $1B in value in 2024 â cognac\'s $100+ tier particularly affected by consumer trade-down', source: 'IWSR', url: 'https://www.theiwsr.com/insight/status-spirits-decline-more-cyclical-than-structural/' },
      { text: 'African markets offering growth â Nigeria and South Africa showing +4-6% gains as middle class expands and brand awareness builds', source: 'IWSR Global Trends', url: 'https://www.theiwsr.com/insight/inside-the-iwsr-global-trends-report-key-drivers-for-beverage-alcohol-in-2025/' },
      { text: 'Cognac houses pivoting to cocktail culture to recruit younger drinkers â Hennessy investing heavily in US on-trade activations', source: 'The Spirits Business.com/2024/12/world-spirits-report-2024-tequila-mezcal/' }
    ]
  },
  {
    key: 'champagne', label: 'Champagne & Sparkling', emoji: 'ð¸ Â¥',
    marketSize: '$7.2B', growth: '+2.8%', growthDir: 'up',
    trajectory: 'Champagne volumes normalizing after record 2022. Prosecco continuing strong growth trajectory as everyday sparkling option. English sparkling wine gaining critical recognition. CrÃ©mant emerging as value alternative.',
    topMarkets: [{ name: 'France', growth: '+1.2%' }, { name: 'United States', growth: '+3.4%' }, { name: 'UK', growth: '+2.8%' }, { name: 'Japan', growth: '+5.1%' }, { name: 'Australia', growth: '+4.2%' }],
    brands: ['MoÃ«t & Chandon', 'Veuve Clicquot', 'Dom PÃ©rignon', 'La Marca', 'Freixenet', 'Nyetimber'],
    channels: { onTrade: 45, offTrade: 48, ecommerce: 7 },
    trends: [
      { text: 'Champagne shipments dropped to 271M bottles in 2024 from record 326M in 2022 â CIVC reports normalization after post-COVID exuberance', source: 'IWSR', url: 'https://www.theiwsr.com/insight/iwsr-preliminary-data-release-beverage-alcohol-endures-another-tough-year-in-2024/' },
      { text: 'Prosecco exports hit 630M bottles â now outsells Champagne 2:1 globally as accessible sparkling option for everyday occasions', source: 'IWSR Global Trends', url: 'https://www.theiwsr.com/insight/inside-the-iwsr-global-trends-report-key-drivers-for-beverage-alcohol-in-2025/' },
      { text: 'English sparkling wine production doubled in 5 years â Nyetimber, Chapel Down winning blind tastings against prestige Champagne', source: 'IWSR', url: 'https://www.theiwsr.com/insight/inside-the-iwsr-global-trends-report-key-drivers-for-beverage-alcohol-in-2025/' },
      { text: 'CrÃ©mant growth at +8% as value-conscious consumers discover Burgundy, Alsace, Loire alternatives at 1/3 Champagne price', source: 'IWSR', url: 'https://www.theiwsr.com/insight/global-beverage-alcohol-market-set-for-moderate-recovery-in-2025-while-challenges-persist-in-2024/' },
      { text: 'Prestige cuvÃ©e segment resilient â Dom PÃ©rignon, Krug, Cristal maintaining pricing power while entry-level NV faces pressure', source: 'IWSR', url: 'https://www.theiwsr.com/insight/premiumisation-is-slowing-but-theres-a-counter-trend/' }
    ]
  },
  {
    key: 'wine', label: 'Wine', emoji: 'ð¸',
    marketSize: '$38.2B', growth: '-1.2%', growthDir: 'down',
    trajectory: 'Wine faces long-term structural decline driven by generational shifts â younger consumers choosing spirits, cocktails, and NoLo alternatives. Premium segments holding while entry-level collapses. Climate change reshaping growing regions.',
    topMarkets: [{ name: 'United States', growth: '-2.1%' }, { name: 'France', growth: '-3.2%' }, { name: 'Italy', growth: '-1.8%' }, { name: 'UK', growth: '-0.5%' }, { name: 'China', growth: '-8.4%' }],
    brands: ['Yellow Tail', 'Barefoot', 'Josh Cellars', 'Kim Crawford', 'Meiomi', '19 Crimes', 'Whispering Angel'],
    channels: { onTrade: 30, offTrade: 60, ecommerce: 10 },
    trends: [
      { text: 'Wine faces "structural decline" per IWSR â global volumes down for third consecutive year, with Gen Z participation rate 20% below Boomers at same age', source: 'IWSR', url: 'https://www.theiwsr.com/insight/iwsr-preliminary-data-release-beverage-alcohol-endures-another-tough-year-in-2024/' },
      { text: 'RosÃ© plateauing after decade of growth â Provence AOC production flat as novelty fades and orange wine emerges as next trend', source: 'IWSR', url: 'https://www.theiwsr.com/insight/global-beverage-alcohol-market-set-for-moderate-recovery-in-2025-while-challenges-persist-in-2024/' },
      { text: 'Premium ($15+) wine growing at +3% while sub-$10 wine declining at -7% â bifurcation accelerating as casual drinkers leave category', source: 'IWSR', url: 'https://www.theiwsr.com/insight/premiumisation-is-slowing-but-theres-a-counter-trend/' },
      { text: 'Climate change forcing adaptation â English and Scandinavian vineyards expanding while traditional Mediterranean regions face heat stress', source: 'IWSR Global Trends', url: 'https://www.theiwsr.com/insight/inside-the-iwsr-global-trends-report-key-drivers-for-beverage-alcohol-in-2025/' },
      { text: 'China wine imports crashed -28% as economic slowdown and anti-corruption campaigns devastate luxury wine market', source: 'IWSR', url: 'https://www.theiwsr.com/insight/iwsr-preliminary-data-release-beverage-alcohol-endures-another-tough-year-in-2024/' }
    ]
  },
  {
    key: 'beer', label: 'Beer & Craft', emoji: 'ð¸',
    marketSize: '$623B', growth: '+1.4%', growthDir: 'up',
    trajectory: 'Global beer volume slightly declining but value growing through premiumization. Craft beer growth slowing in mature markets. Modelo Especial dethroned Bud Light as US #1 but now faces challenge from Michelob Ultra. Stout experiencing renaissance.',
    topMarkets: [{ name: 'China', growth: '-1.2%' }, { name: 'United States', growth: '+0.8%' }, { name: 'Brazil', growth: '+2.4%' }, { name: 'Mexico', growth: '+3.1%' }, { name: 'Germany', growth: '-0.5%' }],
    brands: ['Modelo Especial', 'Bud Light', 'Michelob Ultra', 'Corona', 'Heineken', 'Guinness', 'Stella Artois'],
    channels: { onTrade: 35, offTrade: 58, ecommerce: 7 },
    trends: [
      { text: 'Michelob Ultra overtook Modelo Especial as #1 US beer in late 2025 per Circana data â health-conscious positioning winning the calorie wars', source: 'CNBC', url: 'https://www.cnbc.com/2025/09/22/michelob-ultra-overtakes-modelo-especial-as-best-selling-us-beer.html' },
      { text: 'Constellation Brands (Modelo parent) lowered FY26 beer growth outlook to 0-3% as immigration policy impacts Hispanic consumer spending', source: 'Fortune', url: 'https://fortune.com/2025/06/21/modelo-especial-most-popular-beer-constellation-company-vulnerable-trump-immigration-policy-latino-spending/' },
      { text: 'Stout experiencing 15% volume growth in UK â Guinness leading renaissance with global volumes up +8% as younger drinkers embrace category', source: 'IWSR', url: 'https://www.theiwsr.com/insight/iwsr-preliminary-data-release-beverage-alcohol-endures-another-tough-year-in-2024/' },
      { text: 'Premium beer is premiumization bright spot â super-premium US beer up +2% while overall beer volume declined in 2024', source: 'IWSR', url: 'https://www.theiwsr.com/insight/premiumisation-is-slowing-but-theres-a-counter-trend/' },
      { text: 'Craft beer growth decelerating in US â now 13.3% dollar share, up from 12.4% but growth rate slowed from +8% to +2% annually', source: 'Beverage Daily', url: 'https://www.beveragedaily.com/Article/2025/01/29/global-low-and-no-alcohol-market-data-for-2025/' }
    ]
  },
  {
    key: 'nolo', label: 'No & Low Alcohol', emoji: 'ð¸',
    marketSize: '$13B', growth: '+7.5%', growthDir: 'up',
    trajectory: 'No/low alcohol volumes grew +13% in top 10 markets in 2024. No-alcohol beer forecast to surpass ale as second-largest beer category worldwide. US added 37M new no-alcohol consumers between 2022-2024. Category to deliver $4B+ incremental growth by 2028.',
    topMarkets: [{ name: 'Germany', growth: '+4.2%' }, { name: 'United States', growth: '+18%' }, { name: 'UK', growth: '+8.4%' }, { name: 'Spain', growth: '+5.1%' }, { name: 'Australia', growth: '+12.3%' }],
    brands: ['Athletic Brewing', 'Heineken 0.0', 'Guinness 0.0', 'Seedlip', 'Monday', 'Lyre\'s', 'Free AF'],
    channels: { onTrade: 25, offTrade: 60, ecommerce: 15 },
    trends: [
      { text: 'No-alcohol volumes grew +13% in top 10 global markets in 2024 â recruited 61M new buyers vs 38M for low-alcohol', source: 'IWSR No/Low Study 2025', url: 'https://www.theiwsr.com/insight/more-than-moderation-the-long-term-rise-of-no-and-low/' },
      { text: 'US no-alcohol market forecast to reach $5B by 2028 at +18% CAGR â added 37M new consumers between 2022-2024', source: 'IWSR US No-Alcohol', url: 'https://www.theiwsr.com/insight/key-statistics-and-trends-for-the-us-no-alcohol-market/' },
      { text: 'No-alcohol beer forecast to surpass ale as second-largest overall beer category worldwide by volume', source: 'IWSR', url: 'https://www.theiwsr.com/insight/iwsr-preliminary-data-release-beverage-alcohol-endures-another-tough-year-in-2024/' },
      { text: 'Gen Z and Millennials driving adoption â younger cohorts 2x more likely to practice "occasional moderation" than older demographics', source: 'Beverage Daily', url: 'https://www.beveragedaily.com/Article/2025/01/29/global-low-and-no-alcohol-market-data-for-2025/' },
      { text: 'No-alcohol RTDs forecast as fastest-growing NoLo sub-category at +10% CAGR through 2028 â category to add $4B+ in value', source: 'IWSR', url: 'https://www.theiwsr.com/insight/growth-of-4bn-expected-from-no-alcohol-category-by-2028/' }
    ]
  },
  {
    key: 'rtd', label: 'RTD / Ready-to-Drink', emoji: 'ð¸ Â¥Â«',
    marketSize: '$40B', growth: '+8.2%', growthDir: 'up',
    trajectory: 'RTD/ready-to-drink category continues strong growth as convenience and portability win occasions from beer and wine. Spirits-based RTDs outgrowing malt-based. Premium cocktail-style RTDs emerging as next frontier.',
    topMarkets: [{ name: 'United States', growth: '+10.2%' }, { name: 'Japan', growth: '+3.8%' }, { name: 'Australia', growth: '+7.4%' }, { name: 'UK', growth: '+12.1%' }, { name: 'Mexico', growth: '+15.3%' }],
    brands: ['High Noon', 'Cutwater', 'Truly', 'White Claw', 'Modelo Chelada', 'Nutrl', 'On The Rocks'],
    channels: { onTrade: 15, offTrade: 72, ecommerce: 13 },
    trends: [
      { text: 'Spirits-based RTDs outgrowing malt-based as regulatory barriers fall â spirits RTDs now 42% of US RTD market vs 28% two years ago', source: 'IWSR Global Trends', url: 'https://www.theiwsr.com/insight/inside-the-iwsr-global-trends-report-key-drivers-for-beverage-alcohol-in-2025/' },
      { text: 'Hard seltzer growth collapsed from +160% (2020) to single digits â White Claw and Truly losing share to spirits-based alternatives', source: 'IWSR', url: 'https://www.theiwsr.com/insight/iwsr-preliminary-data-release-beverage-alcohol-endures-another-tough-year-in-2024/' },
      { text: 'Premium cocktail RTDs ($6+ per can) fastest-growing sub-segment â On The Rocks, Cutwater capturing on-trade quality at off-trade occasions', source: 'IWSR', url: 'https://www.theiwsr.com/insight/inside-the-iwsr-global-trends-report-key-drivers-for-beverage-alcohol-in-2025/' },
      { text: 'Japan remains world\'s most mature RTD market â chuhai and highball culture decades ahead of Western adoption with 30%+ TBA share', source: 'IWSR Global Trends', url: 'https://www.theiwsr.com/insight/inside-the-iwsr-global-trends-report-key-drivers-for-beverage-alcohol-in-2025/' },
      { text: 'Tito\'s acquired majority stake in LALO Tequila in 2025 â signaling major brands diversifying into RTD-ready portfolios', source: 'Slate', url: 'https://slate.com/life/2025/11/titos-vodka-handmade-recipes-price-lalo-tequila.html' }
    ]
  }
]

// Wine deep dive data
const WINE_DEEP_DIVE = {
  varietals: [
    { name: 'Cabernet Sauvignon', share: '14.2%', trend: 'stable', avgPrice: '$18' },
    { name: 'Chardonnay', share: '13.8%', trend: 'declining', avgPrice: '$15' },
    { name: 'Pinot Noir', share: '11.2%', trend: 'growing', avgPrice: '$22' },
    { name: 'Pinot Grigio', share: '9.4%', trend: 'stable', avgPrice: '$12' },
    { name: 'Sauvignon Blanc', share: '8.1%', trend: 'growing', avgPrice: '$14' },
    { name: 'Red Blends', share: '7.8%', trend: 'declining', avgPrice: '$16' },
    { name: 'RosÃ©', share: '5.2%', trend: 'plateauing', avgPrice: '$15' },
    { name: 'Malbec', share: '3.4%', trend: 'stable', avgPrice: '$14' }
  ],
  regions: [
    { name: 'France', production: '46.6M hL', exportValue: '$12.1B', trend: 'Declining volumes, premiumizing' },
    { name: 'Italy', production: '43.9M hL', exportValue: '$8.4B', trend: 'Prosecco driving export growth' },
    { name: 'Spain', production: '35.7M hL', exportValue: '$3.8B', trend: 'Bulk exports under pressure' },
    { name: 'United States', production: '25.2M hL', exportValue: '$1.4B', trend: 'California drought impacts' },
    { name: 'Australia', production: '12.4M hL', exportValue: '$1.8B', trend: 'China ban recovery slow' },
    { name: 'Argentina', production: '11.5M hL', exportValue: '$0.8B', trend: 'Malbec export growth' },
    { name: 'Chile', production: '10.8M hL', exportValue: '$1.6B', trend: 'Value positioning challenges' }
  ]
}

const SourceLink = ({ source, url }) => (
  <a href={url} target="_blank" rel="noopener noreferrer"
     className="inline-flex items-center gap-1 text-xs text-blue-400 hover:text-blue-300 transition-colors mt-1 group">
    <ExternalLink className="w-3 h-3 opacity-60 group-hover:opacity-100" />
    <span className="border-b border-dotted border-blue-400/40 group-hover:border-blue-300">{source}</span>
  </a>
)

const CategoryCard = ({ cat, isActive, onClick }) => {
  const growthColor = cat.growthDir === 'up' ? 'text-green-400' : cat.growthDir === 'down' ? 'text-red-400' : 'text-gray-400'
  return (
    <button onClick={onClick}
      className={`w-full text-left p-3 rounded-lg border transition-all ${isActive ? 'bg-blue-600/20 border-blue-500 shadow-lg shadow-blue-500/10' : 'bg-slate-800/50 border-slate-700 hover:border-slate-600'}`}>
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-white">{cat.emoji} {cat.label}</span>
      </div>
      <div className="flex items-center gap-2 mt-1">
        <span className="text-xs text-slate-400">{cat.marketSize}</span>
        <span className={`text-xs font-medium ${growthColor}`}>{cat.growth}</span>
      </div>
    </button>
  )
}

const CategoryDetail = ({ cat }) => {
  const [showWineDeepDive, setShowWineDeepDive] = useState(false)
  const growthColor = cat.growthDir === 'up' ? 'text-green-400' : cat.growthDir === 'down' ? 'text-red-400' : 'text-gray-400'
  const GrowthIcon = cat.growthDir === 'up' ? TrendingUp : cat.growthDir === 'down' ? TrendingDown : Minus

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-3">
          <span className="text-3xl">{cat.emoji}</span>
          <div>
            <h2 className="text-2xl font-bold text-white">{cat.label}</h2>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-lg font-semibold text-white">{cat.marketSize}</span>
              <GrowthIcon className={`w-5 h-5 ${growthColor}`} />
              <span className={`text-lg font-medium ${growthColor}`}>{cat.growth} YoY</span>
            </div>
          </div>
        </div>
        <p className="text-slate-300 mt-3 leading-relaxed">{cat.trajectory}</p>
      </div>

      {/* Top Growth Markets & Channel Split */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-slate-800/50 rounded-lg border border-slate-700 p-4">
          <h3 className="text-sm font-semibold text-white flex items-center gap-2 mb-3">
            <Globe className="w-4 h-4 text-blue-400" /> TOP GROWTH MARKETS
          </h3>
          {cat.topMarkets.map((m, i) => (
            <div key={i} className="flex items-center justify-between py-2 border-b border-slate-700/50 last:border-0">
              <span className="text-sm text-slate-300">{m.name}</span>
              <span className={`text-sm font-medium ${m.growth.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>{m.growth}</span>
            </div>
          ))}
        </div>

        <div className="bg-slate-800/50 rounded-lg border border-slate-700 p-4">
          <h3 className="text-sm font-semibold text-white flex items-center gap-2 mb-3">
            <ShoppingCart className="w-4 h-4 text-blue-400" /> CHANNEL SPLIT
          </h3>
          <div className="flex h-4 rounded-full overflow-hidden bg-slate-700 mb-3">
            <div className="bg-blue-600" style={{ width: `${cat.channels.onTrade}%` }} />
            <div className="bg-green-600" style={{ width: `${cat.channels.offTrade}%` }} />
            <div className="bg-teal-500" style={{ width: `${cat.channels.ecommerce}%` }} />
          </div>
          <div className="flex justify-between text-xs text-slate-400">
            <span>On-trade {cat.channels.onTrade}%</span>
            <span>Off-trade {cat.channels.offTrade}%</span>
            <span>E-com {cat.channels.ecommerce}%</span>
          </div>

          <h3 className="text-sm font-semibold text-white flex items-center gap-2 mt-4 mb-2">
            <Star className="w-4 h-4 text-yellow-400" /> KEY BRANDS
          </h3>
          <div className="flex flex-wrap gap-2">
            {cat.brands.map((b, i) => (
              <span key={i} className="px-2 py-1 bg-slate-700/50 rounded text-xs text-slate-300 border border-slate-600">{b}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Trend Insights with Sources */}
      <div className="bg-slate-800/50 rounded-lg border border-slate-700 p-4">
        <h3 className="text-sm font-semibold text-white flex items-center gap-2 mb-4">
          <Zap className="w-4 h-4 text-yellow-400" /> TREND INSIGHTS
        </h3>
        <div className="space-y-4">
          {cat.trends.map((t, i) => (
            <div key={i} className="flex gap-3">
              <ChevronRight className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
              <div className="flex flex-col">
                <span className="text-sm text-slate-300 leading-relaxed">{t.text}</span>
                <SourceLink source={t.source} url={t.url} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Wine Deep Dive */}
      {cat.key === 'wine' && (
        <div>
          <button onClick={() => setShowWineDeepDive(!showWineDeepDive)}
            className="w-full flex items-center justify-between p-4 bg-purple-900/20 border border-purple-500/30 rounded-lg hover:bg-purple-900/30 transition-colors">
            <div className="flex items-center gap-2">
              <Wine className="w-5 h-5 text-purple-400" />
              <span className="text-sm font-semibold text-purple-300">WINE DEEP DIVE â Varietal & Country Breakdown</span>
            </div>
            <ChevronRight className={`w-5 h-5 text-purple-400 transition-transform ${showWineDeepDive ? 'rotate-90' : ''}`} />
          </button>
          {showWineDeepDive && (
            <div className="mt-4 grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="bg-slate-800/50 rounded-lg border border-slate-700 p-4">
                <h4 className="text-sm font-semibold text-white mb-3">TOP VARIETALS BY US MARKET SHARE</h4>
                {WINE_DEEP_DIVE.varietals.map((v, i) => (
                  <div key={i} className="flex items-center justify-between py-2 border-b border-slate-700/50 last:border-0">
                    <span className="text-sm text-slate-300">{v.name}</span>
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-slate-500">avg {v.avgPrice}</span>
                      <span className={`text-xs px-2 py-0.5 rounded ${v.trend === 'growing' ? 'bg-green-500/20 text-green-400' : v.trend === 'declining' ? 'bg-red-500/20 text-red-400' : v.trend === 'plateauing' ? 'bg-yellow-500/20 text-yellow-400' : 'bg-slate-600/50 text-slate-400'}`}>{v.trend}</span>
                      <span className="text-sm font-medium text-white w-12 text-right">{v.share}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="bg-slate-800/50 rounded-lg border border-slate-700 p-4">
                <h4 className="text-sm font-semibold text-white mb-3">TOP PRODUCING COUNTRIES</h4>
                {WINE_DEEP_DIVE.regions.map((r, i) => (
                  <div key={i} className="py-2 border-b border-slate-700/50 last:border-0">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-white">{r.name}</span>
                      <span className="text-sm text-slate-400">{r.production}</span>
                    </div>
                    <div className="flex items-center justify-between mt-0.5">
                      <span className="text-xs text-slate-500">{r.trend}</span>
                      <span className="text-xs text-green-400">Export: {r.exportValue}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default function CategoryIntelligence() {
  const [selected, setSelected] = useState(CATEGORIES[0])

  return (
    <div className="grid grid-cols-12 gap-6 h-full">
      {/* Sidebar */}
      <div className="col-span-3 space-y-1">
        <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3 px-1">CATEGORIES</h3>
        {CATEGORIES.map(cat => (
          <CategoryCard key={cat.key} cat={cat} isActive={selected.key === cat.key} onClick={() => setSelected(cat)} />
        ))}
      </div>

      {/* Detail Panel */}
      <div className="col-span-9 overflow-y-auto pr-2" style={{ maxHeight: 'calc(100vh - 100px)' }}>
        <CategoryDetail cat={selected} />
      </div>
    </div>
  )
}
