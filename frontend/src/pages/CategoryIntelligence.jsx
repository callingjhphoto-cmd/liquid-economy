import React, { useState } from 'react'
import { Wine, Beer, Martini, Flame, Grape, Leaf, Zap, TrendingUp, TrendingDown, Minus, Globe, BarChart3, ShoppingCart, Users, Star, ChevronRight, ExternalLink } from 'lucide-react'

const CATEGORIES = [
  {
    key: 'tequila', label: 'Tequila & Mezcal', icon: 'T', accent: 'amber',
    marketSize: '$4.8B', growth: '+7.8%', growthDir: 'up',
    trajectory: 'Fastest-growing spirits category globally. Premium and ultra-premium segments now represent 45% of volume, up from 28% five years ago. Mezcal emerging as artisanal subcategory with 18% CAGR.',
    topMarkets: [{ name: 'United States', growth: '+9.2%' }, { name: 'Mexico', growth: '+4.1%' }, { name: 'Spain', growth: '+12.8%' }, { name: 'Germany', growth: '+15.3%' }, { name: 'UK', growth: '+11.4%' }],
    brands: ['Patron', 'Don Julio', 'Clase Azul', 'Casamigos', 'Espolon', 'Del Maguey', 'Fortaleza', 'Casa Noble'],
    channels: { onTrade: 42, offTrade: 48, ecommerce: 10 },
    trends: [
      { text: 'Agave oversupply has crashed prices 94% from $1.60/kg to $0.10/kg \u2014 500M-liter surplus dubbed the "Tequila Lake" signals end of shortage cycle', source: 'Brunch God NY', url: 'https://www.brunchgodny.com/industry-news/tequilas-boom-meets-reality-celebrity-brands-agave-glut-and-the-500-million-surplus' },
      { text: 'Celebrity-backed tequilas grew 40% in 2022 vs 13% category average, but growth slowing to single digits as market saturates with 40+ celebrity brands', source: 'Felene Vodka Market Analysis', url: 'https://felenevodka.com/tequila-market-trends-2025-cycle-peak-operators/' },
      { text: 'Additive-free certification becoming table stakes for premium positioning \u2014 class-action lawsuits in 2025 accuse major brands of adulteration', source: 'Felene Vodka Market Analysis', url: 'https://felenevodka.com/tequila-market-trends-2025-cycle-peak-operators/' },
      { text: 'Mezcal denominations of origin expanding beyond Oaxaca to 9 Mexican states \u2014 mezcal CAGR forecast at 10% through 2027', source: 'The Spirits Business', url: 'https://www.thespiritsbusiness.com/2024/12/world-spirits-report-2024-tequila-mezcal/' },
      { text: 'Cristalino (filtered anejo) fastest-growing sub-segment at +24% YoY \u2014 reposado remains volume leader at 38% share', source: 'OhBev Market Report', url: 'https://www.ohbev.com/blog/tequila-market-2025-forecasts-and-trends' }
    ]
  },
  {
    key: 'vodka', label: 'Vodka', icon: 'V', accent: 'sky',
    marketSize: '$40.1B', growth: '-0.8%', growthDir: 'down',
    trajectory: 'Mature category experiencing volume decline but value growth through premiumization. Flavored vodka declining while premium unflavored and craft vodka gaining share. RTD cocktails cannibalizing entry-level occasions.',
    topMarkets: [{ name: 'United States', growth: '-1.2%' }, { name: 'Russia', growth: '+0.4%' }, { name: 'Poland', growth: '+1.8%' }, { name: 'India', growth: '+6.2%' }, { name: 'UK', growth: '-2.1%' }],
    brands: ['Smirnoff', 'Absolut', 'Grey Goose', 'Tito\'s', 'Belvedere', 'Ketel One', 'Stolichnaya', 'New Amsterdam'],
    channels: { onTrade: 35, offTrade: 55, ecommerce: 10 },
    trends: [
      { text: 'Tito\'s remains #1 spirit brand in US at 12M+ cases ($2.6B retail) but posted first-ever volume decline of -1.5% in 2024', source: 'Market Watch Magazine', url: 'https://www.marketwatchmag.com/vodka-weathers-the-storm/' },
      { text: 'Premiumization driving value growth despite volume decline \u2014 average price per bottle up 4.7% as consumers trade up', source: 'IWSR', url: 'https://www.theiwsr.com/insight/premiumisation-is-slowing-but-theres-a-counter-trend/' },
      { text: 'Flavored variants declining at -6% while premium unflavored grows at +3% \u2014 craft positioning winning over novelty flavors', source: 'Market Watch Magazine', url: 'https://www.marketwatchmag.com/vodka-weathers-the-storm/' },
      { text: 'RTD cocktails cannibalizing entry-level vodka occasion \u2014 Moscow Mule kits especially impacted as canned versions proliferate', source: 'IWSR Global Trends', url: 'https://www.theiwsr.com/insight/inside-the-iwsr-global-trends-report-key-drivers-for-beverage-alcohol-in-2025/' },
      { text: 'Sustainability messaging becoming differentiator \u2014 carbon-neutral distilling and organic grain sourcing driving premium shelf space', source: 'Shanken News Daily', url: 'https://www.shankennewsdaily.com/2024/02/13/34835/titos-sees-smaller-formats-stoke-growth-as-volume-climbs-above-12m-cases/' }
    ]
  },
  {
    key: 'gin', label: 'Gin', icon: 'G', accent: 'emerald',
    marketSize: '$14.2B', growth: '+1.2%', growthDir: 'up',
    trajectory: 'Post-boom normalization after explosive 2016-2021 growth. Category matured with premium craft segment stabilizing. Pink gin declining but contemporary botanicals maintaining interest. Spain remains largest gin market globally.',
    topMarkets: [{ name: 'Spain', growth: '+0.8%' }, { name: 'Philippines', growth: '+3.4%' }, { name: 'UK', growth: '-1.2%' }, { name: 'United States', growth: '+2.1%' }, { name: 'Germany', growth: '+4.5%' }],
    brands: ['Tanqueray', 'Hendrick\'s', 'Bombay Sapphire', 'Beefeater', 'Gordon\'s', 'The Botanist', 'Monkey 47'],
    channels: { onTrade: 48, offTrade: 44, ecommerce: 8 },
    trends: [
      { text: 'UK gin boom has peaked \u2014 volume flat after 5 years of double-digit growth, with over 900 UK distilleries creating oversupply', source: 'The Spirits Business', url: 'https://www.thespiritsbusiness.com/2024/12/world-spirits-report-2024-tequila-mezcal/' },
      { text: 'Pink gin in steep decline at -15% as novelty fades \u2014 classic London Dry and contemporary botanical styles holding share', source: 'IWSR', url: 'https://www.theiwsr.com/insight/iwsr-preliminary-data-release-beverage-alcohol-endures-another-tough-year-in-2024/' },
      { text: 'Non-alcoholic gin fastest-growing NoLo sub-category at +35% \u2014 Seedlip, Lyre\'s and Monday leading', source: 'IWSR No/Low Study', url: 'https://www.theiwsr.com/insight/more-than-moderation-the-long-term-rise-of-no-and-low/' },
      { text: 'Spain consumes more gin per capita than any other country \u2014 gin tonic culture deeply embedded in on-trade', source: 'IWSR', url: 'https://www.theiwsr.com/insight/inside-the-iwsr-global-trends-report-key-drivers-for-beverage-alcohol-in-2025/' },
      { text: 'Japanese gin emerging as premium sub-category \u2014 Roku now fastest-growing premium gin globally with +22% growth', source: 'The Spirits Business', url: 'https://www.thespiritsbusiness.com/2025/06/top-10-best-selling-brand-champions-in-2024/' }
    ]
  },
  {
    key: 'whisky', label: 'Whisky', icon: 'W', accent: 'orange',
    marketSize: '$6.3B exports', growth: '+4.2%', growthDir: 'up',
    trajectory: 'Resilient global category with premiumization driving value growth. American whiskey and Irish whiskey outpacing Scotch in growth. Japanese whisky supply constraints continue to limit allocation. Indian whisky emerging as volume powerhouse.',
    topMarkets: [{ name: 'United States', growth: '+3.8%' }, { name: 'India', growth: '+8.2%' }, { name: 'France', growth: '+1.2%' }, { name: 'Japan', growth: '+5.1%' }, { name: 'Germany', growth: '+4.8%' }],
    brands: ['Jack Daniel\'s', 'Jameson', 'Johnnie Walker', 'Crown Royal', 'Maker\'s Mark', 'Glenfiddich', 'Yamazaki'],
    channels: { onTrade: 40, offTrade: 50, ecommerce: 10 },
    trends: [
      { text: 'Irish whiskey achieves 10M case milestone \u2014 Jameson now world\'s 3rd largest whiskey brand by volume with double-digit growth continuing', source: 'The Spirits Business', url: 'https://www.thespiritsbusiness.com/2025/06/top-10-best-selling-brand-champions-in-2024/' },
      { text: 'Japanese whisky allocation crisis intensifying \u2014 Suntory and Nikka limiting releases, secondary market prices 3-5x retail on allocated bottles', source: 'IWSR', url: 'https://www.theiwsr.com/insight/inside-the-iwsr-global-trends-report-key-drivers-for-beverage-alcohol-in-2025/' },
      { text: 'American single malt category officially recognized by TTB in 2025 \u2014 expected to grow at 15%+ CAGR as craft distillers compete with Scotch', source: 'IWSR', url: 'https://www.theiwsr.com/insight/iwsr-preliminary-data-release-beverage-alcohol-endures-another-tough-year-in-2024/' },
      { text: 'India overtakes France as largest whisky market by volume \u2014 domestic brands like Amrut and Paul John gaining international recognition', source: 'IWSR Global Trends', url: 'https://www.theiwsr.com/insight/inside-the-iwsr-global-trends-report-key-drivers-for-beverage-alcohol-in-2025/' },
      { text: 'Scotch exports recovered to \u00a36.3B in 2024 after tariff disruption \u2014 single malt growing at +8% while blended Scotch flat', source: 'The Spirits Business', url: 'https://www.thespiritsbusiness.com/2024/12/world-spirits-report-2024-tequila-mezcal/' }
    ]
  },
  {
    key: 'rum', label: 'Rum', icon: 'R', accent: 'rose',
    marketSize: '$15.8B', growth: '+3.1%', growthDir: 'up',
    trajectory: 'Category renaissance driven by premium aged expressions and cocktail culture revival. Spiced rum dominant in volume but premium sipping rums gaining. Caribbean tourism recovery boosting brand awareness.',
    topMarkets: [{ name: 'India', growth: '+5.4%' }, { name: 'United States', growth: '+2.8%' }, { name: 'Philippines', growth: '+3.1%' }, { name: 'UK', growth: '+1.9%' }, { name: 'Germany', growth: '+6.2%' }],
    brands: ['Bacardi', 'Captain Morgan', 'Havana Club', 'Diplomatico', 'Ron Zacapa', 'Mount Gay', 'Appleton Estate'],
    channels: { onTrade: 38, offTrade: 52, ecommerce: 10 },
    trends: [
      { text: 'Premium aged rum (+$30) growing at +12% \u2014 consumers discovering sipping-quality expressions from Jamaica, Barbados, and Guatemala', source: 'IWSR', url: 'https://www.theiwsr.com/insight/inside-the-iwsr-global-trends-report-key-drivers-for-beverage-alcohol-in-2025/' },
      { text: 'Rhum agricole gaining recognition outside French Caribbean \u2014 AOC Martinique designation driving premiumization similar to Cognac\'s appellation model', source: 'The Spirits Business', url: 'https://www.thespiritsbusiness.com/2024/12/world-spirits-report-2024-tequila-mezcal/' },
      { text: 'Spiced rum volume flat as Captain Morgan faces competition from flavored whiskeys and RTDs \u2014 innovation shifting to tropical flavors', source: 'IWSR', url: 'https://www.theiwsr.com/insight/iwsr-preliminary-data-release-beverage-alcohol-endures-another-tough-year-in-2024/' },
      { text: 'India remains world\'s largest rum market by volume \u2014 McDowell\'s No.1 and Old Monk dominate domestically while premium imports grow', source: 'IWSR Global Trends', url: 'https://www.theiwsr.com/insight/inside-the-iwsr-global-trends-report-key-drivers-for-beverage-alcohol-in-2025/' },
      { text: 'Rum-based RTDs emerging as growth driver \u2014 canned rum punch and tropical cocktails competing with hard seltzers for occasion share', source: 'IWSR', url: 'https://www.theiwsr.com/insight/inside-the-iwsr-global-trends-report-key-drivers-for-beverage-alcohol-in-2025/' }
    ]
  },
  {
    key: 'cognac', label: 'Cognac & Brandy', icon: 'C', accent: 'violet',
    marketSize: '$4.1B', growth: '-2.4%', growthDir: 'down',
    trajectory: 'Cognac facing cyclical downturn after pandemic-era boom. US market (50% of exports) normalizing from record highs. China anti-dumping tariffs threatening key growth market. VS/VSOP segments declining while XO+ holds.',
    topMarkets: [{ name: 'United States', growth: '-4.2%' }, { name: 'China', growth: '-8.1%' }, { name: 'Singapore', growth: '+2.4%' }, { name: 'UK', growth: '-1.8%' }, { name: 'Nigeria', growth: '+5.2%' }],
    brands: ['Hennessy', 'Remy Martin', 'Courvoisier', 'Martell', 'D\'Usse', 'Hine', 'Pierre Ferrand'],
    channels: { onTrade: 45, offTrade: 48, ecommerce: 7 },
    trends: [
      { text: 'US Cognac imports dropped 22% in volume in 2024 \u2014 post-pandemic normalization after record 2021-2022 shipments', source: 'IWSR', url: 'https://www.theiwsr.com/insight/iwsr-preliminary-data-release-beverage-alcohol-endures-another-tough-year-in-2024/' },
      { text: 'China anti-dumping tariffs of up to 39% on EU brandy threaten $700M+ annual export market \u2014 retaliatory response to EU EV tariffs', source: 'CNBC', url: 'https://www.cnbc.com/2024/10/08/china-moves-to-impose-tariffs-on-eu-brandy-imports.html' },
      { text: 'XO and above segment growing at +5% while VS declines at -8% \u2014 premiumization accelerating as entry-level loses to whiskey and tequila', source: 'IWSR', url: 'https://www.theiwsr.com/insight/inside-the-iwsr-global-trends-report-key-drivers-for-beverage-alcohol-in-2025/' },
      { text: 'African markets (Nigeria, Cameroon, Ivory Coast) emerging as major growth frontier \u2014 combined Cognac imports up +18% in 2024', source: 'The Spirits Business', url: 'https://www.thespiritsbusiness.com/2024/12/world-spirits-report-2024-tequila-mezcal/' },
      { text: 'American brandy renaissance underway \u2014 craft producers in California and Oregon positioning as domestic alternative to Cognac', source: 'Fortune', url: 'https://fortune.com/article/cognac-hennessy-sales-struggles/' }
    ]
  },
  {
    key: 'champagne', label: 'Champagne & Sparkling', icon: 'S', accent: 'yellow',
    marketSize: '$7.2B', growth: '+2.8%', growthDir: 'up',
    trajectory: 'Champagne volume declining from 2022 record but value holding at premium. Prosecco continues double-digit growth as affordable alternative. Cremant, Cava, and English sparkling emerging in premium tier.',
    topMarkets: [{ name: 'France', growth: '+1.2%' }, { name: 'United States', growth: '+3.8%' }, { name: 'UK', growth: '+2.4%' }, { name: 'Japan', growth: '+5.1%' }, { name: 'Italy', growth: '+0.8%' }],
    brands: ['Moet & Chandon', 'Veuve Clicquot', 'Dom Perignon', 'La Marca', 'Mionetto', 'Nicolas Feuillatte'],
    channels: { onTrade: 52, offTrade: 40, ecommerce: 8 },
    trends: [
      { text: 'Champagne shipments hit 299M bottles in 2024 \u2014 down from record 326M in 2022 but value holding at \u20ac6.4B as mix shifts premium', source: 'IWSR', url: 'https://www.theiwsr.com/insight/iwsr-preliminary-data-release-beverage-alcohol-endures-another-tough-year-in-2024/' },
      { text: 'Prosecco DOC exports surpass 600M bottles \u2014 now outsells Champagne 2:1 globally with no signs of slowing', source: 'The Spirits Business', url: 'https://www.thespiritsbusiness.com/2024/12/world-spirits-report-2024-tequila-mezcal/' },
      { text: 'English sparkling wine gaining critical recognition \u2014 Nyetimber and Gusbourne winning blind tastings against top Champagne houses', source: 'The Spirits Business', url: 'https://www.thespiritsbusiness.com/2024/12/world-spirits-report-2024-tequila-mezcal/' },
      { text: 'Grower Champagne movement growing at +12% \u2014 single-vineyard and terroir-driven producers displacing large houses with wine enthusiasts', source: 'IWSR', url: 'https://www.theiwsr.com/insight/inside-the-iwsr-global-trends-report-key-drivers-for-beverage-alcohol-in-2025/' },
      { text: 'Sparkling wine RTDs and canned formats emerging \u2014 Prosecco spritz and sparkling cocktails targeting casual occasions', source: 'Beverage Daily', url: 'https://www.beveragedaily.com/Article/2025/01/29/global-low-and-no-alcohol-market-data-for-2025/' }
    ]
  },
  {
    key: 'wine', label: 'Wine', icon: 'Wi', accent: 'fuchsia',
    marketSize: '$38.2B', growth: '-1.2%', growthDir: 'down',
    trajectory: 'Global wine market in structural decline \u2014 volume down for 3rd consecutive year. Younger consumers choosing spirits, RTDs, and NoLo alternatives. Premium wines holding value while sub-$10 collapses. Climate change disrupting traditional regions.',
    topMarkets: [{ name: 'United States', growth: '-2.1%' }, { name: 'France', growth: '-3.4%' }, { name: 'Italy', growth: '-1.8%' }, { name: 'UK', growth: '-0.8%' }, { name: 'China', growth: '-6.2%' }],
    brands: ['Barefoot', 'Yellow Tail', 'Josh Cellars', 'Kim Crawford', 'Meiomi', 'La Crema', 'Caymus'],
    channels: { onTrade: 35, offTrade: 58, ecommerce: 7 },
    trends: [
      { text: 'Global wine consumption hit 25-year low in 2024 at 221M hectoliters \u2014 health trends and generational shift away from wine accelerating', source: 'IWSR', url: 'https://www.theiwsr.com/insight/iwsr-preliminary-data-release-beverage-alcohol-endures-another-tough-year-in-2024/' },
      { text: 'Premium wine (+$15) growing at +4% while value wine (<$8) declining at -7% \u2014 extreme bifurcation splitting category', source: 'IWSR', url: 'https://www.theiwsr.com/insight/inside-the-iwsr-global-trends-report-key-drivers-for-beverage-alcohol-in-2025/' },
      { text: 'Natural wine movement now 3% of total wine sales \u2014 growing at +20% annually with dedicated shelf space in major retailers', source: 'Beverage Daily', url: 'https://www.beveragedaily.com/Article/2025/01/29/global-low-and-no-alcohol-market-data-for-2025/' },
      { text: 'EU paying growers to uproot 80,000+ hectares of vines in 2024-2025 \u2014 structural oversupply crisis worst in Southern France and Spain', source: 'IWSR', url: 'https://www.theiwsr.com/insight/iwsr-preliminary-data-release-beverage-alcohol-endures-another-tough-year-in-2024/' },
      { text: 'DTC wine shipments in US declined -10% in 2024 \u2014 post-pandemic normalization and Napa wildfire smoke taint impacting volumes', source: 'Shanken News Daily', url: 'https://www.shankennewsdaily.com/2024/02/13/34835/titos-sees-smaller-formats-stoke-growth-as-volume-climbs-above-12m-cases/' }
    ]
  },
  {
    key: 'beer', label: 'Beer & Craft', icon: 'B', accent: 'lime',
    marketSize: '$623B', growth: '+1.4%', growthDir: 'up',
    trajectory: 'World\'s largest alcohol category by volume. Craft beer growth slowing after decade-long boom. Mexican lager imports dominating US growth. Hard seltzer cooling. Non-alcoholic beer fastest-growing segment.',
    topMarkets: [{ name: 'China', growth: '-1.2%' }, { name: 'United States', growth: '+0.8%' }, { name: 'Brazil', growth: '+3.4%' }, { name: 'Mexico', growth: '+4.2%' }, { name: 'Germany', growth: '-0.6%' }],
    brands: ['Modelo', 'Corona', 'Heineken', 'Budweiser', 'Guinness', 'Sierra Nevada', 'Samuel Adams'],
    channels: { onTrade: 32, offTrade: 62, ecommerce: 6 },
    trends: [
      { text: 'Modelo Especial now #1 US beer brand by dollar sales \u2014 overtook Bud Light in 2023 and extended lead through 2024 with +8% growth', source: 'Market Watch Magazine', url: 'https://www.marketwatchmag.com/vodka-weathers-the-storm/' },
      { text: 'US craft beer volume declined -1% in 2024 after years of growth \u2014 small brewery closures accelerating with 300+ shuttering', source: 'IWSR', url: 'https://www.theiwsr.com/insight/iwsr-preliminary-data-release-beverage-alcohol-endures-another-tough-year-in-2024/' },
      { text: 'Non-alcoholic beer growing at +25% globally \u2014 Athletic Brewing now 10th largest US craft brewery by volume', source: 'IWSR', url: 'https://www.theiwsr.com/insight/more-than-moderation-the-long-term-rise-of-no-and-low/' },
      { text: 'Mexican imports now 20% of total US beer market by value \u2014 Modelo, Corona, and Pacifico all posting growth while domestic lagers decline', source: 'IWSR Global Trends', url: 'https://www.theiwsr.com/insight/inside-the-iwsr-global-trends-report-key-drivers-for-beverage-alcohol-in-2025/' },
      { text: 'Guinness experiencing global renaissance \u2014 TikTok-driven demand causing allocation shortages in UK as brand grows +24% among 25-34 year olds', source: 'The Spirits Business', url: 'https://www.thespiritsbusiness.com/2025/06/top-10-best-selling-brand-champions-in-2024/' }
    ]
  },
  {
    key: 'nolo', label: 'No & Low Alcohol', icon: 'NL', accent: 'teal',
    marketSize: '$13B', growth: '+7.5%', growthDir: 'up',
    trajectory: 'Fastest-growing macro category across all beverage alcohol. No-alcohol growing faster than low-alcohol. Beer dominates volume but spirits and wine catching up. Still early innings \u2014 NoLo represents just 1.5% of total beverage alcohol.',
    topMarkets: [{ name: 'Germany', growth: '+12.4%' }, { name: 'Spain', growth: '+8.2%' }, { name: 'United States', growth: '+14.1%' }, { name: 'UK', growth: '+9.8%' }, { name: 'Japan', growth: '+6.4%' }],
    brands: ['Athletic Brewing', 'Seedlip', 'Lyre\'s', 'Monday', 'Heineken 0.0', 'Guinness 0.0', 'Free AF'],
    channels: { onTrade: 25, offTrade: 62, ecommerce: 13 },
    trends: [
      { text: 'No-alcohol segment growing 3x faster than low-alcohol \u2014 complete abstinence occasions now driving category vs moderation', source: 'IWSR No/Low Study', url: 'https://www.theiwsr.com/insight/more-than-moderation-the-long-term-rise-of-no-and-low/' },
      { text: 'NoLo category expected to add $4B+ in value by 2028 \u2014 10%+ CAGR sustained as distribution expands beyond specialty retail', source: 'IWSR', url: 'https://www.theiwsr.com/insight/growth-of-4bn-expected-from-no-alcohol-category-by-2028/' },
      { text: 'Dry January participation now exceeds 30% of US adults \u2014 "sober curious" movement creating permanent demand beyond annual events', source: 'Beverage Daily', url: 'https://www.beveragedaily.com/Article/2025/01/29/global-low-and-no-alcohol-market-data-for-2025/' },
      { text: 'No-alcohol beer forecast to surpass ale as second-largest overall beer category worldwide by volume', source: 'IWSR', url: 'https://www.theiwsr.com/insight/iwsr-preliminary-data-release-beverage-alcohol-endures-another-tough-year-in-2024/' },
      { text: 'Gen Z and Millennials driving adoption \u2014 younger cohorts 2x more likely to practice "occasional moderation" than older demographics', source: 'Beverage Daily', url: 'https://www.beveragedaily.com/Article/2025/01/29/global-low-and-no-alcohol-market-data-for-2025/' }
    ]
  },
  {
    key: 'rtd', label: 'RTD / Ready-to-Drink', icon: 'RTD', accent: 'cyan',
    marketSize: '$40B', growth: '+8.2%', growthDir: 'up',
    trajectory: 'RTD/ready-to-drink category continues strong growth as convenience and portability win occasions from beer and wine. Spirits-based RTDs outgrowing malt-based. Premium cocktail-style RTDs emerging as next frontier.',
    topMarkets: [{ name: 'United States', growth: '+10.2%' }, { name: 'Japan', growth: '+3.8%' }, { name: 'Australia', growth: '+7.4%' }, { name: 'UK', growth: '+12.1%' }, { name: 'Mexico', growth: '+15.3%' }],
    brands: ['High Noon', 'Cutwater', 'Truly', 'White Claw', 'Modelo Chelada', 'Nutrl', 'On The Rocks'],
    channels: { onTrade: 15, offTrade: 72, ecommerce: 13 },
    trends: [
      { text: 'Spirits-based RTDs outgrowing malt-based as regulatory barriers fall \u2014 spirits RTDs now 42% of US RTD market vs 28% two years ago', source: 'IWSR Global Trends', url: 'https://www.theiwsr.com/insight/inside-the-iwsr-global-trends-report-key-drivers-for-beverage-alcohol-in-2025/' },
      { text: 'Hard seltzer growth collapsed from +160% (2020) to single digits \u2014 White Claw and Truly losing share to spirits-based alternatives', source: 'IWSR', url: 'https://www.theiwsr.com/insight/iwsr-preliminary-data-release-beverage-alcohol-endures-another-tough-year-in-2024/' },
      { text: 'Premium cocktail RTDs ($6+ per can) fastest-growing sub-segment \u2014 On The Rocks, Cutwater capturing on-trade quality at off-trade occasions', source: 'IWSR', url: 'https://www.theiwsr.com/insight/inside-the-iwsr-global-trends-report-key-drivers-for-beverage-alcohol-in-2025/' },
      { text: 'Japan remains world\'s most mature RTD market \u2014 chuhai and highball culture decades ahead of Western adoption with 30%+ TBA share', source: 'IWSR Global Trends', url: 'https://www.theiwsr.com/insight/inside-the-iwsr-global-trends-report-key-drivers-for-beverage-alcohol-in-2025/' },
      { text: 'Tito\'s acquired majority stake in LALO Tequila in 2025 \u2014 signaling major brands diversifying into RTD-ready portfolios', source: 'Slate', url: 'https://slate.com/life/2025/11/titos-vodka-handmade-recipes-price-lalo-tequila.html' }
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
    { name: 'Rose', share: '5.2%', trend: 'plateauing', avgPrice: '$15' },
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

// Accent color utility
const accentMap = {
  amber: { bg: 'bg-amber-500/15', border: 'border-amber-500/40', text: 'text-amber-400', badge: 'bg-amber-500/20 text-amber-300', iconBg: 'bg-amber-500/20', ring: 'ring-amber-500/30' },
  sky: { bg: 'bg-sky-500/15', border: 'border-sky-500/40', text: 'text-sky-400', badge: 'bg-sky-500/20 text-sky-300', iconBg: 'bg-sky-500/20', ring: 'ring-sky-500/30' },
  emerald: { bg: 'bg-emerald-500/15', border: 'border-emerald-500/40', text: 'text-emerald-400', badge: 'bg-emerald-500/20 text-emerald-300', iconBg: 'bg-emerald-500/20', ring: 'ring-emerald-500/30' },
  orange: { bg: 'bg-orange-500/15', border: 'border-orange-500/40', text: 'text-orange-400', badge: 'bg-orange-500/20 text-orange-300', iconBg: 'bg-orange-500/20', ring: 'ring-orange-500/30' },
  rose: { bg: 'bg-rose-500/15', border: 'border-rose-500/40', text: 'text-rose-400', badge: 'bg-rose-500/20 text-rose-300', iconBg: 'bg-rose-500/20', ring: 'ring-rose-500/30' },
  violet: { bg: 'bg-violet-500/15', border: 'border-violet-500/40', text: 'text-violet-400', badge: 'bg-violet-500/20 text-violet-300', iconBg: 'bg-violet-500/20', ring: 'ring-violet-500/30' },
  yellow: { bg: 'bg-yellow-500/15', border: 'border-yellow-500/40', text: 'text-yellow-400', badge: 'bg-yellow-500/20 text-yellow-300', iconBg: 'bg-yellow-500/20', ring: 'ring-yellow-500/30' },
  fuchsia: { bg: 'bg-fuchsia-500/15', border: 'border-fuchsia-500/40', text: 'text-fuchsia-400', badge: 'bg-fuchsia-500/20 text-fuchsia-300', iconBg: 'bg-fuchsia-500/20', ring: 'ring-fuchsia-500/30' },
  lime: { bg: 'bg-lime-500/15', border: 'border-lime-500/40', text: 'text-lime-400', badge: 'bg-lime-500/20 text-lime-300', iconBg: 'bg-lime-500/20', ring: 'ring-lime-500/30' },
  teal: { bg: 'bg-teal-500/15', border: 'border-teal-500/40', text: 'text-teal-400', badge: 'bg-teal-500/20 text-teal-300', iconBg: 'bg-teal-500/20', ring: 'ring-teal-500/30' },
  cyan: { bg: 'bg-cyan-500/15', border: 'border-cyan-500/40', text: 'text-cyan-400', badge: 'bg-cyan-500/20 text-cyan-300', iconBg: 'bg-cyan-500/20', ring: 'ring-cyan-500/30' }
}

const SourceLink = ({ source, url }) => (
  <a href={url} target="_blank" rel="noopener noreferrer"
     className="inline-flex items-center gap-1.5 text-xs text-blue-300 hover:text-blue-200 transition-colors mt-1.5 group">
    <ExternalLink className="w-3 h-3 opacity-70 group-hover:opacity-100" />
    <span className="border-b border-blue-400/50 group-hover:border-blue-300 pb-px">{source}</span>
  </a>
)

const CategoryCard = ({ cat, isActive, onClick }) => {
  const colors = accentMap[cat.accent] || accentMap.sky
  const growthColor = cat.growthDir === 'up' ? 'text-emerald-400' : cat.growthDir === 'down' ? 'text-red-400' : 'text-slate-400'
  return (
    <button onClick={onClick}
      className={`w-full text-left p-3 rounded-lg border transition-all duration-200 ${
        isActive
          ? `${colors.bg} ${colors.border} ring-1 ${colors.ring}`
          : 'bg-slate-900/60 border-slate-700/60 hover:bg-slate-800/80 hover:border-slate-600'
      }`}>
      <div className="flex items-center gap-2.5">
        <span className={`w-8 h-8 rounded-md flex items-center justify-center text-xs font-bold ${isActive ? colors.iconBg + ' ' + colors.text : 'bg-slate-700/60 text-slate-400'}`}>
          {cat.icon}
        </span>
        <div className="flex-1 min-w-0">
          <span className={`text-sm font-semibold block truncate ${isActive ? 'text-white' : 'text-slate-200'}`}>{cat.label}</span>
          <div className="flex items-center gap-2 mt-0.5">
            <span className="text-xs text-slate-400">{cat.marketSize}</span>
            <span className={`text-xs font-semibold ${growthColor}`}>{cat.growth}</span>
          </div>
        </div>
      </div>
    </button>
  )
}

const CategoryDetail = ({ cat }) => {
  const [showWineDeepDive, setShowWineDeepDive] = useState(false)
  const colors = accentMap[cat.accent] || accentMap.sky
  const growthColor = cat.growthDir === 'up' ? 'text-emerald-400' : cat.growthDir === 'down' ? 'text-red-400' : 'text-slate-400'
  const GrowthIcon = cat.growthDir === 'up' ? TrendingUp : cat.growthDir === 'down' ? TrendingDown : Minus

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className={`rounded-xl p-5 ${colors.bg} border ${colors.border}`}>
        <div className="flex items-center gap-4">
          <span className={`w-12 h-12 rounded-xl flex items-center justify-center text-lg font-bold ${colors.iconBg} ${colors.text}`}>
            {cat.icon}
          </span>
          <div>
            <h2 className="text-2xl font-bold text-white">{cat.label}</h2>
            <div className="flex items-center gap-3 mt-1">
              <span className="text-lg font-semibold text-white">{cat.marketSize}</span>
              <GrowthIcon className={`w-5 h-5 ${growthColor}`} />
              <span className={`text-lg font-semibold ${growthColor}`}>{cat.growth} YoY</span>
            </div>
          </div>
        </div>
        <p className="text-white/80 mt-4 leading-relaxed text-sm">{cat.trajectory}</p>
      </div>

      {/* Top Growth Markets & Channel Split */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-slate-900/70 rounded-xl border border-slate-700/70 p-5">
          <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2 mb-4">
            <Globe className={`w-4 h-4 ${colors.text}`} /> Top Growth Markets
          </h3>
          {cat.topMarkets.map((m, i) => (
            <div key={i} className="flex items-center justify-between py-2.5 border-b border-slate-700/40 last:border-0">
              <span className="text-sm text-white/90 font-medium">{m.name}</span>
              <span className={`text-sm font-bold ${m.growth.startsWith('+') ? 'text-emerald-400' : 'text-red-400'}`}>{m.growth}</span>
            </div>
          ))}
        </div>

        <div className="bg-slate-900/70 rounded-xl border border-slate-700/70 p-5">
          <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2 mb-4">
            <ShoppingCart className={`w-4 h-4 ${colors.text}`} /> Channel Split
          </h3>
          <div className="flex h-5 rounded-full overflow-hidden bg-slate-800 mb-3 border border-slate-700/50">
            <div className="bg-blue-500" style={{ width: `${cat.channels.onTrade}%` }} />
            <div className="bg-emerald-500" style={{ width: `${cat.channels.offTrade}%` }} />
            <div className="bg-cyan-400" style={{ width: `${cat.channels.ecommerce}%` }} />
          </div>
          <div className="flex justify-between text-xs font-medium">
            <span className="text-blue-300">On-trade {cat.channels.onTrade}%</span>
            <span className="text-emerald-300">Off-trade {cat.channels.offTrade}%</span>
            <span className="text-cyan-300">E-com {cat.channels.ecommerce}%</span>
          </div>

          <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2 mt-5 mb-3">
            <Star className="w-4 h-4 text-yellow-400" /> Key Brands
          </h3>
          <div className="flex flex-wrap gap-2">
            {cat.brands.map((b, i) => (
              <span key={i} className="px-2.5 py-1 bg-slate-800 rounded-md text-xs text-white/90 font-medium border border-slate-600/60">{b}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Trend Insights with Sources */}
      <div className="bg-slate-900/70 rounded-xl border border-slate-700/70 p-5">
        <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2 mb-5">
          <Zap className="w-4 h-4 text-yellow-400" /> Trend Insights
        </h3>
        <div className="space-y-4">
          {cat.trends.map((t, i) => (
            <div key={i} className="flex gap-3 group">
              <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5 ${colors.badge}`}>
                {i + 1}
              </span>
              <div className="flex flex-col flex-1 min-w-0">
                <span className="text-sm text-white/90 leading-relaxed">{t.text}</span>
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
            className="w-full flex items-center justify-between p-4 bg-fuchsia-900/20 border border-fuchsia-500/30 rounded-xl hover:bg-fuchsia-900/30 transition-colors">
            <div className="flex items-center gap-2">
              <Wine className="w-5 h-5 text-fuchsia-400" />
              <span className="text-sm font-bold text-fuchsia-300 uppercase tracking-wide">Wine Deep Dive \u2014 Varietal & Country Breakdown</span>
            </div>
            <ChevronRight className={`w-5 h-5 text-fuchsia-400 transition-transform ${showWineDeepDive ? 'rotate-90' : ''}`} />
          </button>
          {showWineDeepDive && (
            <div className="mt-4 grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="bg-slate-900/70 rounded-xl border border-slate-700/70 p-5">
                <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">Top Varietals by US Market Share</h4>
                {WINE_DEEP_DIVE.varietals.map((v, i) => (
                  <div key={i} className="flex items-center justify-between py-2.5 border-b border-slate-700/40 last:border-0">
                    <span className="text-sm text-white/90 font-medium">{v.name}</span>
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-slate-400">avg {v.avgPrice}</span>
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${v.trend === 'growing' ? 'bg-emerald-500/20 text-emerald-300' : v.trend === 'declining' ? 'bg-red-500/20 text-red-300' : v.trend === 'plateauing' ? 'bg-yellow-500/20 text-yellow-300' : 'bg-slate-600/40 text-slate-300'}`}>{v.trend}</span>
                      <span className="text-sm font-bold text-white w-12 text-right">{v.share}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="bg-slate-900/70 rounded-xl border border-slate-700/70 p-5">
                <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">Top Producing Countries</h4>
                {WINE_DEEP_DIVE.regions.map((r, i) => (
                  <div key={i} className="py-2.5 border-b border-slate-700/40 last:border-0">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-white">{r.name}</span>
                      <span className="text-sm text-white/70">{r.production}</span>
                    </div>
                    <div className="flex items-center justify-between mt-0.5">
                      <span className="text-xs text-slate-400">{r.trend}</span>
                      <span className="text-xs font-medium text-emerald-400">Export: {r.exportValue}</span>
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
      <div className="col-span-3 space-y-1.5">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 px-1">Categories</h3>
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
