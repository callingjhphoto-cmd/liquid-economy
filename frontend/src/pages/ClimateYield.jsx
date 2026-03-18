import React, { useState, useEffect, useMemo } from 'react'
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend, AreaChart, Area, ComposedChart, Cell, ReferenceLine } from 'recharts'
import { CloudRain, Sun, Thermometer, Snowflake, TrendingUp, TrendingDown, AlertTriangle, CheckCircle, ExternalLink, RefreshCw, Droplets, Wind, Sprout, ChevronDown, ChevronRight, BarChart3, Leaf, Globe, Calendar } from 'lucide-react'

/* ══════════════════════════════════════════════════════════════
   REGION DEFINITIONS — every key alcohol input
   ══════════════════════════════════════════════════════════════ */
const REGIONS = [
  {
    id: 'champagne',
    name: 'Champagne',
    crop: 'Chardonnay, Pinot Noir, Pinot Meunier',
    spirit: 'Champagne & Sparkling Wine',
    country: 'France',
    lat: 49.25,
    lon: 3.96,
    color: '#C9A96E',
    icon: '\u{1F347}',
    criticalFactors: ['Spring frost damage', 'Summer rainfall vs drought', 'Harvest-period sunshine', 'Winter chill hours for dormancy'],
    yieldUnit: 'hl/ha',
    avgYield: 10500,
    priceLink: 'Champagne grape prices set by CIVC; low yields = higher costs passed to houses within 12\u201318 months',
    historical: {
      2016: { yield: 9200, rainfall: 620, avgTemp: 11.2, frostDays: 42, sunHours: 1680, season: 'Devastating April frost destroyed 20\u201330% of buds across C\u00f4te des Blancs. Wet summer increased mildew pressure. Short vintage, concentrated quality. CIVC set maximum yield at 9,700 kg/ha.', outlook: 'bearish' },
      2017: { yield: 10800, rainfall: 580, avgTemp: 11.8, frostDays: 28, sunHours: 1790, season: 'Warm spring with minimal frost. Balanced summer. Generous harvest with good acidity. Strong volume recovery from 2016.', outlook: 'neutral' },
      2018: { yield: 13200, rainfall: 510, avgTemp: 12.4, frostDays: 22, sunHours: 1920, season: 'Exceptional year. Warm and dry conditions. Record-breaking yields. Ripe fruit with good sugar levels. Largest harvest since 2004.', outlook: 'bullish' },
      2019: { yield: 11600, rainfall: 545, avgTemp: 12.1, frostDays: 31, sunHours: 1850, season: 'Hot summer with heatwave in July (42\u00b0C recorded). Some sunburn on exposed grapes. Good volume, uneven ripeness across sub-regions.', outlook: 'neutral' },
      2020: { yield: 8500, rainfall: 490, avgTemp: 12.6, frostDays: 19, sunHours: 1960, season: 'COVID vintage. CIVC imposed historic low yield limit of 8,000 kg/ha to manage stock levels. Excellent grape quality despite restricted volume. Drought stress in August.', outlook: 'bearish' },
      2021: { yield: 7800, rainfall: 710, avgTemp: 10.9, frostDays: 48, sunHours: 1580, season: 'Catastrophic spring frost in April wiped out up to 80% in some parcels. Wettest summer in a decade; severe mildew. Smallest harvest since 1978. Prices surged.', outlook: 'bearish' },
      2022: { yield: 12000, rainfall: 440, avgTemp: 12.8, frostDays: 18, sunHours: 2050, season: 'Drought year. Exceptional heat and sunshine. Very early harvest (mid-August). High sugar, low acidity in some plots. Strong volume recovery from 2021 disaster.', outlook: 'bullish' },
      2023: { yield: 11200, rainfall: 560, avgTemp: 12.3, frostDays: 25, sunHours: 1870, season: 'Mixed vintage. Good spring, some hail damage in June across Aube. Warm August. CIVC maintained high yield ceiling. Balanced vintage overall.', outlook: 'neutral' },
      2024: { yield: 10400, rainfall: 640, avgTemp: 11.6, frostDays: 35, sunHours: 1720, season: 'Challenging year. Cool spring delayed budburst. June rains caused rot pressure. Selective harvest necessary. Below-average volume but decent quality for patient growers.', outlook: 'neutral' },
      2025: { yield: null, rainfall: null, avgTemp: null, frostDays: null, sunHours: null, season: 'Season in progress. Winter 2024/25 saw adequate chill hours. Monitoring spring frost risk \u2014 early February temperatures remained above critical thresholds. Key period: April bud-break.', outlook: 'monitoring' }
    }
  },
  {
    id: 'cognac',
    name: 'Cognac',
    crop: 'Ugni Blanc (Trebbiano)',
    spirit: 'Cognac & Brandy',
    country: 'France',
    lat: 45.69,
    lon: -0.33,
    color: '#800020',
    icon: '\u{1F347}',
    criticalFactors: ['Spring frost on early-budding Ugni Blanc', 'Summer heat stress', 'Botrytis risk from autumn rain', 'Acid retention (cool nights critical)'],
    yieldUnit: 'hl/ha (pure alcohol)',
    avgYield: 1280,
    priceLink: 'Cognac eaux-de-vie prices lag harvest by 2\u20133 years due to mandatory aging. Short vintages tighten VS/VSOP supply first.',
    historical: {
      2016: { yield: 1180, rainfall: 590, avgTemp: 13.1, frostDays: 22, sunHours: 2010, season: 'Spring frost reduced potential. Summer was warm with adequate rain. Compact but quality-focused vintage. Stocks were already tight from previous shorts.', outlook: 'bearish' },
      2017: { yield: 1350, rainfall: 520, avgTemp: 13.6, frostDays: 16, sunHours: 2150, season: 'Warm, dry spring. Excellent flowering. Good summer with brief rain relief. Strong yields and high sugar. Top vintage for aging potential.', outlook: 'bullish' },
      2018: { yield: 1420, rainfall: 600, avgTemp: 14.0, frostDays: 14, sunHours: 2080, season: 'Another generous vintage. Mildew pressure from wet June required vigilance. Hot July-August. Large crop with good concentration.', outlook: 'bullish' },
      2019: { yield: 1310, rainfall: 530, avgTemp: 13.8, frostDays: 18, sunHours: 2120, season: 'Heatwave stress in July. Some parcels showed sunburn. Harvest 10 days early. Good acidity despite heat. Balanced vintage.', outlook: 'neutral' },
      2020: { yield: 1290, rainfall: 470, avgTemp: 14.2, frostDays: 12, sunHours: 2200, season: 'Very dry year. Small berries with concentrated flavors. Early harvest. China demand drop from COVID reduced urgency. Quality over quantity.', outlook: 'neutral' },
      2021: { yield: 980, rainfall: 680, avgTemp: 12.8, frostDays: 38, sunHours: 1780, season: 'Devastating April frost \u2014 worst in Charentes since 1991. Up to 50% crop loss in Grande Champagne. Wet summer compounded problems. Emergency market tightening.', outlook: 'bearish' },
      2022: { yield: 1380, rainfall: 410, avgTemp: 14.5, frostDays: 10, sunHours: 2280, season: 'Record heat and drought. Earliest harvest on record. High alcohol potential. Volume recovery welcome but acid levels lower than ideal for long aging.', outlook: 'bullish' },
      2023: { yield: 1260, rainfall: 570, avgTemp: 13.7, frostDays: 20, sunHours: 2050, season: 'Return to more normal conditions. Mildew pressure managed. Good balance of sugar and acidity. Average-plus volume.', outlook: 'neutral' },
      2024: { yield: 1190, rainfall: 620, avgTemp: 13.2, frostDays: 28, sunHours: 1900, season: 'Cool, wet spring delayed cycle. Summer recovered but autumn rains pressured late harvest. Below-average yields. Some botrytis.', outlook: 'bearish' },
      2025: { yield: null, rainfall: null, avgTemp: null, frostDays: null, sunHours: null, season: 'Dormancy period. Mild winter so far \u2014 concern about insufficient chill hours. Chinese New Year demand for Hennessy/R\u00e9my strong. Stock levels adequate for VS but tight for XO.', outlook: 'monitoring' }
    }
  },
  {
    id: 'jalisco',
    name: 'Jalisco (Tequila Valley & Highlands)',
    crop: 'Blue Weber Agave',
    spirit: 'Tequila & Mezcal',
    country: 'Mexico',
    lat: 20.67,
    lon: -103.35,
    color: '#DAA520',
    icon: '\u{1F335}',
    criticalFactors: ['Agave takes 6\u20138 years to mature \u2014 supply decisions were made in 2017\u20132019', 'Drought stress reduces pi\u00f1a sugar content', 'Excessive rain causes root rot (Fusarium)', 'Frost rare but devastating at altitude'],
    yieldUnit: 'million tonnes (agave harvested)',
    avgYield: 1.8,
    priceLink: 'Agave prices have extreme cycles. 2020\u201321 shortage drove pi\u00f1a prices to \u003830/kg. Current oversupply pushing below \u00382/kg. 6\u20138 year lag between planting and harvest.',
    historical: {
      2016: { yield: 0.92, rainfall: 850, avgTemp: 22.1, frostDays: 2, sunHours: 2650, season: 'Peak of agave shortage. Plants from 2008\u201310 planting (post-previous shortage) maturing. Demand surging. Pi\u00f1a prices climbing fast. Drought in highlands reduced sugar content.', outlook: 'bearish' },
      2017: { yield: 1.05, rainfall: 920, avgTemp: 22.4, frostDays: 1, sunHours: 2580, season: 'Shortage intensifying. Hurricane season brought needed rain but also flooding in lowlands. Young plants from emergency replanting still years from harvest. Price per kilo hit \u003822.', outlook: 'bearish' },
      2018: { yield: 1.18, rainfall: 780, avgTemp: 22.8, frostDays: 0, sunHours: 2720, season: 'Continued shortage. Tequila producers increasingly desperate. Some harvesting immature plants (4\u20135 years) reducing quality. Dry conditions in valley but highlands got rain.', outlook: 'bearish' },
      2019: { yield: 1.35, rainfall: 870, avgTemp: 22.3, frostDays: 1, sunHours: 2640, season: 'Shortage peak. Pi\u00f1a prices hit all-time high of \u003830/kg. Massive replanting underway \u2014 over 40M new plants. Rain pattern favorable. Industry stress palpable.', outlook: 'bearish' },
      2020: { yield: 1.52, rainfall: 830, avgTemp: 22.6, frostDays: 0, sunHours: 2690, season: 'Early signs of relief. 2012\u201314 plantings coming online. COVID slowed on-premise demand but off-premise surged. Good growing conditions. Prices stabilizing around \u003820/kg.', outlook: 'neutral' },
      2021: { yield: 1.78, rainfall: 900, avgTemp: 22.2, frostDays: 1, sunHours: 2610, season: 'Supply catching up. Massive 2015\u201316 plantings reaching maturity. Good rainfall. Prices began declining. CRT registered record tequila production of 527M liters.', outlook: 'neutral' },
      2022: { yield: 2.15, rainfall: 760, avgTemp: 23.1, frostDays: 0, sunHours: 2750, season: 'Oversupply emerging. Drought in some areas but vast planted area compensated. Pi\u00f1a prices crashed to \u00385/kg. Small farmers suffering.', outlook: 'bullish' },
      2023: { yield: 2.48, rainfall: 810, avgTemp: 22.7, frostDays: 0, sunHours: 2680, season: 'Full oversupply. Millions of tonnes of agave available. Price below \u00383/kg. Farmers pulling up plants. Some converting to corn. Tequila cost-of-goods falling.', outlook: 'bullish' },
      2024: { yield: 2.60, rainfall: 780, avgTemp: 23.0, frostDays: 0, sunHours: 2710, season: 'Glut continues. CRT struggling to manage production caps. Price at \u00382/kg. Significant farmer exits. New planting near zero \u2014 setting up NEXT shortage cycle (2030\u201332).', outlook: 'bullish' },
      2025: { yield: null, rainfall: null, avgTemp: null, frostDays: null, sunHours: null, season: 'Oversupply persists but new planting has collapsed. Current-season weather: normal rainy season expected June\u2013Oct. The seeds of the next shortage are being planted now by NOT planting.', outlook: 'monitoring' }
    }
  },
  {
    id: 'caribbean',
    name: 'Caribbean Basin',
    crop: 'Sugarcane',
    spirit: 'Rum',
    country: 'Caribbean / Central America',
    lat: 17.97,
    lon: -76.79,
    color: '#CD853F',
    icon: '\u{1F33E}',
    criticalFactors: ['Hurricane damage (June\u2013Nov)', 'Drought reducing cane sugar content (Brix)', 'Flooding from tropical storms', 'Rising sea levels affecting coastal plantations'],
    yieldUnit: 'tonnes cane/ha',
    avgYield: 68,
    priceLink: 'Molasses and raw sugar prices drive rum COGS. Hurricane damage causes immediate supply shocks. ICE Sugar #11 futures are the benchmark.',
    historical: {
      2016: { yield: 62, rainfall: 1420, avgTemp: 27.1, frostDays: 0, sunHours: 2850, season: 'Hurricane Matthew devastated Haiti and eastern Caribbean. Cuba and Jamaica escaped major damage. Dry spring reduced early growth. Sugar prices elevated.', outlook: 'bearish' },
      2017: { yield: 55, rainfall: 1680, avgTemp: 27.4, frostDays: 0, sunHours: 2710, season: 'Catastrophic hurricane season \u2014 Irma and Maria. Puerto Rico, USVI, Barbuda devastated. Significant sugarcane destruction across eastern Caribbean. Multi-year recovery needed.', outlook: 'bearish' },
      2018: { yield: 64, rainfall: 1350, avgTemp: 27.2, frostDays: 0, sunHours: 2880, season: 'Recovery year. Quieter hurricane season. Good growing conditions in Jamaica and Cuba. Barbados and Trinidad rebuilding. Adequate rainfall distribution.', outlook: 'neutral' },
      2019: { yield: 67, rainfall: 1280, avgTemp: 27.5, frostDays: 0, sunHours: 2920, season: 'Hurricane Dorian hit Bahamas but missed major cane regions. Good yields across Jamaica, Guyana, Guatemala. Sugar prices soft. Molasses abundant.', outlook: 'neutral' },
      2020: { yield: 65, rainfall: 1510, avgTemp: 27.3, frostDays: 0, sunHours: 2780, season: 'Record-breaking hurricane season (30 named storms). Eta and Iota hit Central America hard. Caribbean islands mostly spared. COVID disrupted labor/harvest logistics.', outlook: 'neutral' },
      2021: { yield: 70, rainfall: 1380, avgTemp: 27.6, frostDays: 0, sunHours: 2860, season: 'Good growing year for most regions. Adequate rain. No major hurricane impacts on cane-producing islands. Strong molasses output. Rum demand recovering post-COVID.', outlook: 'bullish' },
      2022: { yield: 72, rainfall: 1220, avgTemp: 27.8, frostDays: 0, sunHours: 2950, season: 'Excellent year. Drier than average but sufficient irrigation. High Brix readings. Record output from Guatemala and Jamaica. Sugar prices rising globally due to India/Brazil issues.', outlook: 'bullish' },
      2023: { yield: 66, rainfall: 1450, avgTemp: 28.0, frostDays: 0, sunHours: 2800, season: 'El Ni\u00f1o year brought drier conditions to some regions, wetter to others. Hurricane season active but tracked away from major producers. Sugar #11 hit multi-year highs.', outlook: 'neutral' },
      2024: { yield: 63, rainfall: 1560, avgTemp: 27.7, frostDays: 0, sunHours: 2760, season: 'La Ni\u00f1a transition. Heavy rainfall in June-July caused waterlogging. Hurricane Beryl (Cat 5 in July) impacted Jamaica and Grenada. Below-average yields. Sugar prices volatile.', outlook: 'bearish' },
      2025: { yield: null, rainfall: null, avgTemp: null, frostDays: null, sunHours: null, season: 'Dry season underway. Early forecasts suggest active hurricane season (June\u2013Nov). La Ni\u00f1a weakening. Cane planting healthy so far. Sugar #11 futures above 20c/lb.', outlook: 'monitoring' }
    }
  },
  {
    id: 'speyside',
    name: 'Speyside & Highlands',
    crop: 'Malting Barley',
    spirit: 'Scotch Whisky',
    country: 'Scotland',
    lat: 57.48,
    lon: -3.22,
    color: '#1e3a5f',
    icon: '\u{1F33E}',
    criticalFactors: ['Spring barley drilling window (March\u2013April)', 'Summer rainfall during grain fill', 'Harvest weather (Aug\u2013Sept) \u2014 wet harvest = quality loss', 'Nitrogen levels affecting distilling quality'],
    yieldUnit: 'tonnes/ha',
    avgYield: 5.8,
    priceLink: 'UK malting barley prices set at harvest. Low quality = distillers switch to imported barley (Denmark, France) at premium. AHDB tracks UK barley markets.',
    historical: {
      2016: { yield: 5.5, rainfall: 820, avgTemp: 8.2, frostDays: 58, sunHours: 1220, season: 'Wet harvest period complicated quality. Nitrogen levels borderline for some lots. Adequate volume but high screening. Import barley filled gaps.', outlook: 'neutral' },
      2017: { yield: 5.9, rainfall: 760, avgTemp: 8.5, frostDays: 52, sunHours: 1280, season: 'Good spring drilling conditions. Warm summer by Scottish standards. Dry September harvest. Quality excellent \u2014 low nitrogen, high extract. Strong malting premiums.', outlook: 'bullish' },
      2018: { yield: 4.8, rainfall: 580, avgTemp: 9.1, frostDays: 44, sunHours: 1450, season: 'Beast from the East in Feb/March. Then exceptional summer heat and drought \u2014 unprecedented for Scotland. Low yields but very high quality. Water shortages at distilleries.', outlook: 'bearish' },
      2019: { yield: 5.7, rainfall: 810, avgTemp: 8.4, frostDays: 56, sunHours: 1250, season: 'Return to more typical conditions. Adequate rainfall. Normal harvest timing. Good yields and quality. Scotch production normalized.', outlook: 'neutral' },
      2020: { yield: 6.0, rainfall: 850, avgTemp: 8.6, frostDays: 50, sunHours: 1290, season: 'Wet spring delayed drilling in some areas. Summer improved. Harvest mostly dry. Good quality. COVID reduced whisky demand but barley supply was comfortable.', outlook: 'neutral' },
      2021: { yield: 5.4, rainfall: 780, avgTemp: 8.1, frostDays: 62, sunHours: 1200, season: 'Cool growing season. Late harvest. Some quality issues from damp September. Nitrogen levels higher than ideal. Adequate volume. Post-Brexit logistics added cost.', outlook: 'neutral' },
      2022: { yield: 6.2, rainfall: 640, avgTemp: 9.0, frostDays: 40, sunHours: 1380, season: 'Another warm, dry summer. Excellent grain fill. Early harvest with outstanding quality. Record low nitrogen. Distillers delighted. Best malting barley in years.', outlook: 'bullish' },
      2023: { yield: 5.6, rainfall: 890, avgTemp: 8.3, frostDays: 55, sunHours: 1210, season: 'Wet year overall. Spring drilling delayed in Highlands. Summer rain during grain fill diluted quality. Harvest prolonged into October. Mixed results across regions.', outlook: 'neutral' },
      2024: { yield: 5.3, rainfall: 920, avgTemp: 8.0, frostDays: 60, sunHours: 1170, season: 'Challenging year. Persistent rain from May onward. Disease pressure (ramularia, rhynchosporium). Late, difficult harvest. Quality below average \u2014 significant import supplement needed.', outlook: 'bearish' },
      2025: { yield: null, rainfall: null, avgTemp: null, frostDays: null, sunHours: null, season: 'Winter barley dormant. Spring drilling prep underway. Soil moisture levels high from wet 2024. Key risk: if spring stays wet, drilling window narrows. Scotch stocks adequate (3yr+ aging).', outlook: 'monitoring' }
    }
  },
  {
    id: 'kentucky',
    name: 'Kentucky & Indiana',
    crop: 'Corn (Maize)',
    spirit: 'Bourbon & American Whiskey',
    country: 'USA',
    lat: 38.05,
    lon: -84.50,
    color: '#8B4513',
    icon: '\u{1F33D}',
    criticalFactors: ['Spring planting window (April\u2013May)', 'Summer heat and drought during pollination', 'CBOT corn futures vs local basis', 'Grain quality (mycotoxins from wet harvest)'],
    yieldUnit: 'bushels/acre',
    avgYield: 178,
    priceLink: 'Bourbon producers contract corn 6\u201312 months ahead. CBOT corn futures drive pricing. KY/IN basis typically +$0.10\u20130.30/bushel. Drought = higher cost + quality risk.',
    historical: {
      2016: { yield: 182, rainfall: 1120, avgTemp: 14.2, frostDays: 95, sunHours: 2350, season: 'Good growing conditions. Adequate heat units. Timely rains during pollination. Strong yields. Corn futures depressed. Bourbon COGS favorable.', outlook: 'bullish' },
      2017: { yield: 178, rainfall: 1080, avgTemp: 14.0, frostDays: 100, sunHours: 2320, season: 'Average year. Brief dry spell in July caused some stress. Recovered with August rains. Normal harvest. Corn prices stable around $3.50/bu.', outlook: 'neutral' },
      2018: { yield: 185, rainfall: 1200, avgTemp: 14.4, frostDays: 88, sunHours: 2280, season: 'Excellent year. Warm spring, early planting. Perfect summer rainfall timing. Record state yields. Corn below $3.50/bu. Trade war with China added market uncertainty.', outlook: 'bullish' },
      2019: { yield: 162, rainfall: 1380, avgTemp: 13.6, frostDays: 108, sunHours: 2150, season: 'Terrible spring. Historic flooding delayed planting by 3\u20134 weeks. Millions of prevent-plant acres. Late-planted corn struggled. Wet harvest. Quality issues.', outlook: 'bearish' },
      2020: { yield: 180, rainfall: 1050, avgTemp: 14.1, frostDays: 96, sunHours: 2340, season: 'Derecho windstorm in Iowa impacted Midwest broadly. Kentucky less affected. Good local yields. COVID kept demand soft. Corn climbing to $4/bu by year end.', outlook: 'neutral' },
      2021: { yield: 174, rainfall: 980, avgTemp: 14.5, frostDays: 90, sunHours: 2390, season: 'Hot, dry July stress during pollination. Some tip-back on ears. Adequate yields but below trend. Corn surged to $6\u2013$7/bu on global demand + drought. Bourbon input costs rising.', outlook: 'bearish' },
      2022: { yield: 170, rainfall: 940, avgTemp: 14.8, frostDays: 85, sunHours: 2420, season: 'Drought year. July heat extreme. Kentucky corn stressed. Yields below average. Corn futures volatile ($6\u20138/bu range) on Ukraine war + drought. Bourbon COGS surging.', outlook: 'bearish' },
      2023: { yield: 176, rainfall: 1060, avgTemp: 14.3, frostDays: 94, sunHours: 2360, season: 'Recovery from 2022. Better rainfall. Corn prices retreating from highs ($4\u20135/bu). Good pollination conditions. Average-plus yields. Input cost pressure easing.', outlook: 'neutral' },
      2024: { yield: 183, rainfall: 1100, avgTemp: 14.1, frostDays: 97, sunHours: 2330, season: 'Excellent year. Near-ideal conditions. Early planting, good summer rain, warm grain fill. Strong yields. Corn back to $4/bu. Bourbon input costs normalizing.', outlook: 'bullish' },
      2025: { yield: null, rainfall: null, avgTemp: null, frostDays: null, sunHours: null, season: 'Pre-planting. Soil moisture adequate from winter precip. USDA planting intentions (March report) will set market direction. Early corn futures around $4.50/bu. Neutral outlook pending spring.', outlook: 'monitoring' }
    }
  },
  {
    id: 'bordeaux',
    name: 'Bordeaux & South-West France',
    crop: 'Cabernet Sauvignon, Merlot, Sauvignon Blanc',
    spirit: 'Wine (Still & Fortified)',
    country: 'France',
    lat: 44.84,
    lon: -0.58,
    color: '#722F37',
    icon: '\u{1F347}',
    criticalFactors: ['April frost on Merlot', 'Mildew/rot from summer rain', 'Heat stress and drought', 'Harvest rain diluting quality'],
    yieldUnit: 'hl/ha',
    avgYield: 4800,
    priceLink: 'En primeur pricing set in spring following vintage. Poor vintages = lower volume but potentially higher per-bottle pricing. Bulk wine market very sensitive to yields.',
    historical: {
      2016: { yield: 4200, rainfall: 650, avgTemp: 13.5, frostDays: 28, sunHours: 2050, season: 'Frost and hail reduced crop. Dry summer rescued quality. Late-ripening Cabernet excelled. Low volume, high quality. Merlot suffered more from spring frost.', outlook: 'neutral' },
      2017: { yield: 3800, rainfall: 580, avgTemp: 14.0, frostDays: 35, sunHours: 2180, season: 'Severe April frost \u2014 worst since 1991. Some ch\u00e2teaux lost 80\u2013100%. Warm summer and dry harvest for what survived. Tiny but excellent vintage.', outlook: 'bearish' },
      2018: { yield: 5200, rainfall: 720, avgTemp: 14.2, frostDays: 20, sunHours: 2100, season: 'Mildew epidemic from wet spring required extensive treatments. Hot, dry summer. Generous harvest with dark, concentrated wines. Volume recovery welcome.', outlook: 'bullish' },
      2019: { yield: 4600, rainfall: 550, avgTemp: 14.4, frostDays: 22, sunHours: 2220, season: 'Heatwave and drought. Some water stress in young vines. Harvest earlier than normal. Good volume. Right Bank Merlot particularly successful.', outlook: 'neutral' },
      2020: { yield: 4400, rainfall: 580, avgTemp: 14.6, frostDays: 18, sunHours: 2250, season: 'Warm and dry. Some hail in Graves. COVID vintage \u2014 harvest labor challenges. Quality very good but market uncertain. En primeur cautious.', outlook: 'neutral' },
      2021: { yield: 3200, rainfall: 700, avgTemp: 13.2, frostDays: 40, sunHours: 1920, season: 'Spring frost again (3 nights in April). Mildew from wet June. Uneven ripeness. Small crop. Many small growers in financial distress. Bulk market tightened.', outlook: 'bearish' },
      2022: { yield: 4100, rainfall: 420, avgTemp: 15.0, frostDays: 12, sunHours: 2350, season: 'Extreme heat and drought. Earliest harvest in Bordeaux history. Berry size tiny but concentrated. Some vineyards showed heat stress/leaf scorch. Good volume, rich wines.', outlook: 'neutral' },
      2023: { yield: 4500, rainfall: 610, avgTemp: 14.3, frostDays: 24, sunHours: 2080, season: 'Mildew pressure from wet spring. Hail in parts of Entre-Deux-Mers. Warm September saved the vintage. Average yields. Price pressure from overstocked market.', outlook: 'neutral' },
      2024: { yield: 3900, rainfall: 680, avgTemp: 13.8, frostDays: 30, sunHours: 1980, season: 'Challenging. Cool, wet conditions through June. Mildew rampant despite treatments. Organic/biodynamic producers hit hardest. Recovery in August. Small vintage again.', outlook: 'bearish' },
      2025: { yield: null, rainfall: null, avgTemp: null, frostDays: null, sunHours: null, season: 'Dormant season. Pruning underway. Bordeaux vineyard area shrinking (grubbing-up subsidies). 2024 en primeur pricing under pressure. Spring frost remains top risk.', outlook: 'monitoring' }
    }
  },
  {
    id: 'bavaria',
    name: 'Bavaria & Hallertau',
    crop: 'Malting Barley & Hops',
    spirit: 'Beer (Brewing Industry)',
    country: 'Germany',
    lat: 48.60,
    lon: 11.76,
    color: '#2E8B57',
    icon: '\u{1F33E}',
    criticalFactors: ['Hallertau produces 30% of world\u2019s hops', 'Summer drought reduces hop alpha-acid content', 'Hail damage to hop gardens', 'Barley protein levels (must be low for brewing)'],
    yieldUnit: 'tonnes/ha (barley) / kg/ha (hops)',
    avgYield: 6.2,
    priceLink: 'Hop contracts typically 3\u20135 years fixed price. Spot market volatile. German malting barley sets European benchmark. Short harvests = craft beer input inflation within 6 months.',
    historical: {
      2016: { yield: 6.0, rainfall: 740, avgTemp: 9.5, frostDays: 72, sunHours: 1650, season: 'Average barley year. Hop yields slightly below average from July storms. Hallertau experienced localized hail damage. Overall adequate supply.', outlook: 'neutral' },
      2017: { yield: 6.3, rainfall: 680, avgTemp: 9.8, frostDays: 66, sunHours: 1720, season: 'Good growing season. Warm summer benefited hops. Alpha acid content good. Barley quality excellent \u2014 low protein. Strong harvest.', outlook: 'bullish' },
      2018: { yield: 5.1, rainfall: 480, avgTemp: 10.6, frostDays: 55, sunHours: 1900, season: 'Severe drought across central Europe. Worst barley harvest in decades. Hop yields down 20%. Prices surged. German barley imports from France and Scandinavia.', outlook: 'bearish' },
      2019: { yield: 6.1, rainfall: 650, avgTemp: 10.2, frostDays: 62, sunHours: 1780, season: 'Partial recovery. Summer still drier than normal. Hop gardens recovering. Barley yields returned to average. Market still tight from 2018 shortfall.', outlook: 'neutral' },
      2020: { yield: 6.4, rainfall: 700, avgTemp: 10.0, frostDays: 68, sunHours: 1700, season: 'Good year. Balanced conditions. COVID devastated on-premise beer demand but supply side was comfortable. Hop prices stable on long-term contracts.', outlook: 'bullish' },
      2021: { yield: 5.8, rainfall: 750, avgTemp: 9.4, frostDays: 74, sunHours: 1600, season: 'Cool, wet summer. Hop downy mildew pressure. Barley quality variable. Late harvest. Some flooding in Bavaria in July. Below-average alpha acid content.', outlook: 'neutral' },
      2022: { yield: 5.5, rainfall: 520, avgTemp: 10.5, frostDays: 58, sunHours: 1850, season: 'Another drought year. Hop gardens on irrigated plots fared better. Dryland barley suffered. Energy costs (gas crisis) compounded brewing industry pain.', outlook: 'bearish' },
      2023: { yield: 6.0, rainfall: 670, avgTemp: 9.9, frostDays: 64, sunHours: 1730, season: 'Recovery year. Better rainfall distribution. Hops rebounded. Barley quality good. Brewing industry stabilizing after energy crisis. Contract renewals at higher bases.', outlook: 'neutral' },
      2024: { yield: 6.3, rainfall: 710, avgTemp: 9.7, frostDays: 70, sunHours: 1680, season: 'Good conditions for both barley and hops. Timely rain. Harvest weather dry. Strong yields. Alpha acid content above average. Positive for brewing COGS.', outlook: 'bullish' },
      2025: { yield: null, rainfall: null, avgTemp: null, frostDays: null, sunHours: null, season: 'Winter dormancy. Hop rhizomes resting. Spring barley drilling March\u2013April. Soil moisture levels adequate. German beer consumption declining but export demand stable.', outlook: 'monitoring' }
    }
  },
  {
    id: 'juniper',
    name: 'Mediterranean Basin',
    crop: 'Juniper Berries, Botanicals',
    spirit: 'Gin',
    country: 'Italy / North Macedonia / Turkey',
    lat: 41.12,
    lon: 16.87,
    color: '#2E8B57',
    icon: '\u{1FAB4}',
    criticalFactors: ['Wild juniper \u2014 not farmed, foraged from hillsides', 'Forest fires destroying wild juniper stands', 'Drought reduces berry size and oil content', 'Labor availability for hand-picking'],
    yieldUnit: 'tonnes (global harvest est.)',
    avgYield: 5200,
    priceLink: 'Juniper berry prices volatile and opaque. Mainly traded through specialist botanical houses. 2017\u201319 shortage doubled prices. Mediterranean wildfires a growing structural risk.',
    historical: {
      2016: { yield: 5000, rainfall: 580, avgTemp: 16.2, frostDays: 12, sunHours: 2500, season: 'Normal harvest year. Gin boom driving unprecedented demand. Prices stable but rising. North Macedonia and Albania primary suppliers.', outlook: 'neutral' },
      2017: { yield: 4200, rainfall: 420, avgTemp: 17.0, frostDays: 8, sunHours: 2700, season: 'Drought year. Mediterranean wildfires (Portugal, Greece, southern Italy). Juniper stands damaged. Poor berry development. Prices started climbing. Gin industry concerned.', outlook: 'bearish' },
      2018: { yield: 4500, rainfall: 510, avgTemp: 16.8, frostDays: 10, sunHours: 2620, season: 'Continued tight supply. Gin consumption at all-time highs globally. Berry prices doubled. Some distillers began exploring cultivated juniper but wild remains superior for quality.', outlook: 'bearish' },
      2019: { yield: 5100, rainfall: 600, avgTemp: 16.4, frostDays: 14, sunHours: 2480, season: 'Better rainfall revived Mediterranean vegetation. Good berry crop. Prices stabilizing. New foraging cooperatives established in Balkans. Supply chain more organized.', outlook: 'neutral' },
      2020: { yield: 4800, rainfall: 550, avgTemp: 16.6, frostDays: 11, sunHours: 2550, season: 'COVID disrupted foraging labor. Travel restrictions affected Balkan pickers. Adequate wild growth but less harvested. Price firm. Gin demand shifted to at-home cocktails.', outlook: 'neutral' },
      2021: { yield: 5400, rainfall: 620, avgTemp: 16.1, frostDays: 15, sunHours: 2420, season: 'Good recovery year. Cooler Mediterranean summer. Better berry size and oil content. Foraging labor normalized. Supply comfortable. Prices eased.', outlook: 'bullish' },
      2022: { yield: 4000, rainfall: 380, avgTemp: 17.4, frostDays: 6, sunHours: 2780, season: 'Extreme drought and heat across Mediterranean. Catastrophic wildfires in Italy, Greece, Turkey. Juniper habitat loss significant. Berry crop small and low-oil. Prices spiked.', outlook: 'bearish' },
      2023: { yield: 4600, rainfall: 530, avgTemp: 16.9, frostDays: 9, sunHours: 2640, season: 'Partial recovery. Some burned areas regenerating. Greek and Turkish harvest improved. Prices moderating but still above 2019 levels. Gin market growth slowing.', outlook: 'neutral' },
      2024: { yield: 5000, rainfall: 570, avgTemp: 16.5, frostDays: 12, sunHours: 2520, season: 'Near-normal harvest. Good rainfall timing for berry development. Wildfires less severe than 2022. Supply adequate. Long-term habitat concern remains.', outlook: 'neutral' },
      2025: { yield: null, rainfall: null, avgTemp: null, frostDays: null, sunHours: null, season: 'Winter dormancy. Juniper is evergreen so assessment ongoing. Mediterranean winter mild so far. Fire risk assessment for summer 2025 will be critical.', outlook: 'monitoring' }
    }
  },
  {
    id: 'poland',
    name: 'Poland & Northern Europe',
    crop: 'Wheat, Rye, Potatoes',
    spirit: 'Vodka',
    country: 'Poland / Sweden / Finland',
    lat: 52.23,
    lon: 21.01,
    color: '#4169E1',
    icon: '\u{1F33E}',
    criticalFactors: ['Winter wheat survival through freeze/thaw cycles', 'Spring drought during grain fill', 'Potato blight from wet conditions', 'Grain quality (starch content for vodka)'],
    yieldUnit: 'tonnes/ha (wheat)',
    avgYield: 5.0,
    priceLink: 'MATIF wheat futures drive pricing. Polish grain sets Eastern European benchmark. Vodka producers contract 3\u20136 months ahead. Quality premiums for high-starch grain.',
    historical: {
      2016: { yield: 4.8, rainfall: 560, avgTemp: 8.8, frostDays: 85, sunHours: 1550, season: 'Average year for Polish grain. Good potato yields. Adequate starch content. Vodka production costs stable. Export demand growing for Polish vodka.', outlook: 'neutral' },
      2017: { yield: 5.1, rainfall: 530, avgTemp: 9.1, frostDays: 80, sunHours: 1600, season: 'Good growing conditions. Warm summer. Strong wheat and rye yields. Potato quality excellent. Favorable COGS for vodka distillers.', outlook: 'bullish' },
      2018: { yield: 4.2, rainfall: 380, avgTemp: 9.8, frostDays: 70, sunHours: 1750, season: 'Pan-European drought hit Poland hard. Worst grain harvest since 2006. Potato yields down 25%. Import needs from Ukraine. Vodka input costs rose.', outlook: 'bearish' },
      2019: { yield: 4.9, rainfall: 510, avgTemp: 9.3, frostDays: 78, sunHours: 1620, season: 'Recovery but uneven. Spring drought in east. Better in west. Potato yields recovered. Overall adequate supply. MATIF wheat volatile.', outlook: 'neutral' },
      2020: { yield: 5.2, rainfall: 540, avgTemp: 9.0, frostDays: 82, sunHours: 1580, season: 'Good conditions across Poland. Strong yields. COVID reduced hospitality vodka demand but retail surged. Grain prices depressed. Low COGS year.', outlook: 'bullish' },
      2021: { yield: 5.0, rainfall: 570, avgTemp: 8.7, frostDays: 88, sunHours: 1520, season: 'Normal year. Cool summer limited yields slightly. Potato crop adequate. Global grain prices rising on post-COVID demand recovery and La Ni\u00f1a.', outlook: 'neutral' },
      2022: { yield: 4.6, rainfall: 450, avgTemp: 9.5, frostDays: 74, sunHours: 1680, season: 'Ukraine war disrupted grain markets catastrophically. Polish grain yields below average from dry conditions. MATIF wheat hit \u20ac400/t. Vodka COGS surged 40%.', outlook: 'bearish' },
      2023: { yield: 5.1, rainfall: 520, avgTemp: 9.2, frostDays: 80, sunHours: 1610, season: 'Market normalizing. Good Polish harvest. Ukraine grain corridor operational but volatile. MATIF retreated to \u20ac220\u2013250/t. Costs easing.', outlook: 'neutral' },
      2024: { yield: 5.3, rainfall: 550, avgTemp: 9.0, frostDays: 83, sunHours: 1570, season: 'Strong harvest across Poland and Baltics. Good wheat quality \u2014 high starch. Potato yields above average. Grain prices stable around \u20ac200/t. Favorable for vodka COGS.', outlook: 'bullish' },
      2025: { yield: null, rainfall: null, avgTemp: null, frostDays: null, sunHours: null, season: 'Winter crops in dormancy. Snow cover adequate for insulation. February thaw underway. Key risk: spring frost after thaw killing exposed wheat. MATIF wheat futures \u20ac210/t.', outlook: 'monitoring' }
    }
  },
  {
    id: 'napa',
    name: 'Napa Valley & California',
    crop: 'Cabernet Sauvignon, Chardonnay, Zinfandel',
    spirit: 'Wine (New World Premium)',
    country: 'USA',
    lat: 38.50,
    lon: -122.27,
    color: '#722F37',
    icon: '\u{1F347}',
    criticalFactors: ['Wildfire smoke taint (devastating in 2017, 2020)', 'Drought and water rights', 'Heat spikes during ripening', 'Frost in Russian River and Carneros'],
    yieldUnit: 'tonnes/acre',
    avgYield: 4.2,
    priceLink: 'Napa Cab grapes: $8,000\u201315,000/ton. Smoke taint makes fruit worthless. Drought = smaller berries, lower volume, higher concentration. CA drought directly = CA wine prices.',
    historical: {
      2016: { yield: 4.5, rainfall: 580, avgTemp: 16.8, frostDays: 8, sunHours: 2900, season: 'Good vintage. Drought easing slightly. No fire issues. Balanced conditions. Classic Napa Cabernet year. Strong yields. Market healthy.', outlook: 'bullish' },
      2017: { yield: 3.2, rainfall: 520, avgTemp: 17.2, frostDays: 6, sunHours: 2950, season: 'Devastating wildfire year \u2014 Tubbs, Atlas, Nuns fires during harvest. Smoke taint rendered thousands of tons unusable. Insurance claims massive. Traumatic for industry.', outlook: 'bearish' },
      2018: { yield: 4.8, rainfall: 490, avgTemp: 16.9, frostDays: 7, sunHours: 2920, season: 'Excellent recovery vintage. No significant fires near Napa/Sonoma. Ideal conditions. Generous yields with outstanding quality. Market relief.', outlook: 'bullish' },
      2019: { yield: 4.3, rainfall: 620, avgTemp: 16.5, frostDays: 10, sunHours: 2850, season: 'Good year. Some spring rain concerns but summer was textbook. Kincade Fire in Sonoma (Oct) caused anxiety but minimal taint. Strong harvest.', outlook: 'neutral' },
      2020: { yield: 2.8, rainfall: 350, avgTemp: 17.6, frostDays: 4, sunHours: 3050, season: 'Catastrophic. Glass Fire and LNU Lightning Complex during harvest. Widespread smoke taint. Drought severe. Many wineries declassified fruit. Billion-dollar losses. COVID compounded devastation.', outlook: 'bearish' },
      2021: { yield: 3.5, rainfall: 380, avgTemp: 17.4, frostDays: 5, sunHours: 3020, season: 'Continuing drought \u2014 driest year on record. Small berries, low yields. Dixie Fire (far north) created smoke concern. Yields down but quality of untainted fruit was exceptional.', outlook: 'bearish' },
      2022: { yield: 4.0, rainfall: 510, avgTemp: 16.8, frostDays: 8, sunHours: 2900, season: 'Better water year. Atmospheric rivers brought rain. Fire season quieter near wine country. Good yields. Market adjusting to oversupply of 2018\u201319 wines. Grape prices softening.', outlook: 'neutral' },
      2023: { yield: 4.4, rainfall: 680, avgTemp: 16.2, frostDays: 12, sunHours: 2780, season: 'Wettest year in decades. Flooding concerns in some vineyards. Cool growing season. Harvest delayed. Quality good but volumes variable. Grape surplus growing.', outlook: 'neutral' },
      2024: { yield: 4.1, rainfall: 540, avgTemp: 16.6, frostDays: 9, sunHours: 2870, season: 'Return to average. Balanced vintage. No significant fires. Market facing oversupply \u2014 grape prices declining. Some Napa growers not finding buyers. Wine industry structural shift.', outlook: 'neutral' },
      2025: { yield: null, rainfall: null, avgTemp: null, frostDays: null, sunHours: null, season: 'Dormant. Winter rains adequate. Reservoir levels good for irrigation. Fire outlook for summer unknown. Grape market remains oversupplied. Possible vineyard removal acceleration.', outlook: 'monitoring' }
    }
  }
]

/* ══════════════════════════════════════════════════════════════
   OPEN-METEO API INTEGRATION
   ══════════════════════════════════════════════════════════════ */
const fetchRecentWeather = async (lat, lon) => {
  try {
    const end = new Date()
    const start = new Date()
    start.setDate(start.getDate() - 30)
    const fmt = d => d.toISOString().split('T')[0]
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,sunshine_duration&past_days=30&timezone=auto`
    const resp = await fetch(url)
    if (!resp.ok) throw new Error('API error')
    const data = await resp.json()
    return {
      dates: data.daily.time,
      maxTemp: data.daily.temperature_2m_max,
      minTemp: data.daily.temperature_2m_min,
      precip: data.daily.precipitation_sum,
      sunshine: data.daily.sunshine_duration?.map(s => s ? (s / 3600).toFixed(1) : 0)
    }
  } catch (e) {
    console.error('Weather fetch failed:', e)
    return null
  }
}

const fetchHistoricalComparison = async (lat, lon) => {
  try {
    const now = new Date()
    const thisYear = now.getFullYear()
    const month = String(now.getMonth() + 1).padStart(2, '0')
    const day = String(now.getDate()).padStart(2, '0')
    const periods = []
    for (let y = thisYear - 3; y <= thisYear; y++) {
      const s = `${y}-01-01`
      const e = y === thisYear ? `${y}-${month}-${day}` : `${y}-12-31`
      periods.push({ year: y, start: s, end: e })
    }
    const results = {}
    for (const p of periods) {
      const url = `https://archive-api.open-meteo.com/v1/archive?latitude=${lat}&longitude=${lon}&start_date=${p.start}&end_date=${p.end}&daily=temperature_2m_mean,precipitation_sum&timezone=auto`
      const resp = await fetch(url)
      if (!resp.ok) continue
      const data = await resp.json()
      const temps = data.daily.temperature_2m_mean?.filter(t => t !== null) || []
      const precip = data.daily.precipitation_sum?.filter(p => p !== null) || []
      results[p.year] = {
        avgTemp: temps.length ? (temps.reduce((a,b) => a+b, 0) / temps.length).toFixed(1) : null,
        totalPrecip: precip.length ? precip.reduce((a,b) => a+b, 0).toFixed(0) : null,
        rainDays: precip.filter(p => p > 1).length,
        daysTracked: temps.length
      }
    }
    return results
  } catch (e) {
    console.error('Historical comparison failed:', e)
    return null
  }
}

/* ══════════════════════════════════════════════════════════════
   COMPONENTS
   ══════════════════════════════════════════════════════════════ */

const OutlookBadge = ({ outlook }) => {
  const styles = {
    bearish: { bg: 'bg-red-100', text: 'text-red-700', label: 'Bearish for Price', icon: TrendingUp },
    bullish: { bg: 'bg-green-100', text: 'text-green-700', label: 'Bullish Supply', icon: TrendingDown },
    neutral: { bg: 'bg-gray-100', text: 'text-gray-600', label: 'Neutral', icon: CheckCircle },
    monitoring: { bg: 'bg-amber-100', text: 'text-amber-700', label: 'Monitoring', icon: AlertTriangle }
  }
  const s = styles[outlook] || styles.neutral
  const Icon = s.icon
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold ${s.bg} ${s.text}`}>
      <Icon size={10} /> {s.label}
    </span>
  )
}

const StatBox = ({ icon: Icon, label, value, sub, color = 'text-navy' }) => (
  <div className="bg-white rounded-lg border border-gray-200 p-3 flex items-center gap-3">
    <div className={`w-9 h-9 rounded-lg bg-gray-50 flex items-center justify-center ${color}`}>
      <Icon size={16} />
    </div>
    <div>
      <p className="text-[10px] text-gray-400 uppercase tracking-wider">{label}</p>
      <p className="text-sm font-bold text-navy">{value}</p>
      {sub && <p className="text-[10px] text-gray-500">{sub}</p>}
    </div>
  </div>
)

const YearSelector = ({ selectedYear, setSelectedYear, years = [2016,2017,2018,2019,2020,2021,2022,2023,2024,2025] }) => (
  <div className="flex gap-1 flex-wrap">
    {years.map(y => (
      <button key={y} onClick={() => setSelectedYear(y)}
        className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
          selectedYear === y ? 'bg-navy text-white shadow-sm' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
        }`}>
        {y}
      </button>
    ))}
  </div>
)

/* --- Live Weather Panel --- */
const LiveWeatherPanel = ({ region }) => {
  const [weather, setWeather] = useState(null)
  const [loading, setLoading] = useState(true)
  const [comparison, setComparison] = useState(null)

  useEffect(() => {
    setLoading(true)
    Promise.all([
      fetchRecentWeather(region.lat, region.lon),
      fetchHistoricalComparison(region.lat, region.lon)
    ]).then(([w, c]) => {
      setWeather(w)
      setComparison(c)
      setLoading(false)
    })
  }, [region.id])

  if (loading) return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-200 p-5 animate-pulse">
      <div className="flex items-center gap-2 mb-3">
        <RefreshCw size={14} className="animate-spin text-blue-500" />
        <span className="text-xs text-blue-600 font-medium">Loading live weather data from Open-Meteo\u2026</span>
      </div>
      <div className="h-40 bg-blue-100 rounded-lg" />
    </div>
  )

  if (!weather) return (
    <div className="bg-red-50 rounded-xl border border-red-200 p-4">
      <p className="text-xs text-red-600">Unable to fetch live weather data. Open-Meteo API may be temporarily unavailable.</p>
    </div>
  )

  const last30Precip = weather.precip.reduce((a,b) => a + (b || 0), 0).toFixed(0)
  const avgMax = (weather.maxTemp.filter(t => t !== null).reduce((a,b) => a+b, 0) / weather.maxTemp.filter(t => t !== null).length).toFixed(1)
  const avgMin = (weather.minTemp.filter(t => t !== null).reduce((a,b) => a+b, 0) / weather.minTemp.filter(t => t !== null).length).toFixed(1)
  const frostDays30 = weather.minTemp.filter(t => t !== null && t < 0).length
  const chartData = weather.dates.map((d, i) => ({
    date: d.slice(5),
    precip: weather.precip[i] || 0,
    maxTemp: weather.maxTemp[i],
    minTemp: weather.minTemp[i]
  }))

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-200 p-5">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Globe size={14} className="text-blue-600" />
          <span className="text-xs font-semibold text-blue-800 uppercase tracking-wider">Live Weather \u2014 Last 30 Days</span>
          <span className="text-[10px] text-blue-500">{region.lat}\u00b0N, {region.lon}\u00b0E</span>
        </div>
        <span className="text-[10px] text-blue-400">Source: Open-Meteo API (real-time)</span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 mb-4">
        <StatBox icon={Droplets} label="30-Day Rainfall" value={`${last30Precip}mm`} color="text-blue-600" />
        <StatBox icon={Thermometer} label="Avg High" value={`${avgMax}\u00b0C`} color="text-red-500" />
        <StatBox icon={Thermometer} label="Avg Low" value={`${avgMin}\u00b0C`} color="text-blue-500" />
        <StatBox icon={Snowflake} label="Frost Days (30d)" value={frostDays30} color="text-cyan-600" />
      </div>

      <div className="h-48">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={chartData} margin={{ top: 5, right: 5, bottom: 5, left: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="date" tick={{ fontSize: 9 }} interval={4} />
            <YAxis yAxisId="temp" tick={{ fontSize: 9 }} domain={['auto', 'auto']} />
            <YAxis yAxisId="precip" orientation="right" tick={{ fontSize: 9 }} />
            <Tooltip contentStyle={{ fontSize: 11 }} />
            <Bar yAxisId="precip" dataKey="precip" fill="#93c5fd" opacity={0.6} name="Rainfall (mm)" />
            <Line yAxisId="temp" dataKey="maxTemp" stroke="#ef4444" dot={false} strokeWidth={1.5} name="Max Temp (\u00b0C)" />
            <Line yAxisId="temp" dataKey="minTemp" stroke="#3b82f6" dot={false} strokeWidth={1.5} name="Min Temp (\u00b0C)" />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      {comparison && (
        <div className="mt-4 pt-3 border-t border-blue-200">
          <p className="text-[10px] font-semibold text-blue-800 mb-2 uppercase tracking-wider">Year-to-Date Comparison</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
            {Object.entries(comparison).map(([yr, d]) => (
              <div key={yr} className={`rounded-lg p-2 text-center ${parseInt(yr) === new Date().getFullYear() ? 'bg-blue-200/50 ring-1 ring-blue-300' : 'bg-white/60'}`}>
                <p className="text-xs font-bold text-navy">{yr}</p>
                <p className="text-[10px] text-gray-600">{d.avgTemp}\u00b0C avg</p>
                <p className="text-[10px] text-blue-600">{d.totalPrecip}mm rain</p>
                <p className="text-[10px] text-gray-400">{d.daysTracked} days</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

/* --- Historical Yield Chart --- */
const YieldChart = ({ region }) => {
  const data = Object.entries(region.historical)
    .filter(([_, d]) => d.yield !== null)
    .map(([yr, d]) => ({ year: parseInt(yr), yield: d.yield, avg: region.avgYield }))

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5">
      <h3 className="text-sm font-semibold text-navy mb-1">10-Year Yield History</h3>
      <p className="text-[10px] text-gray-400 mb-3">{region.yieldUnit}</p>
      <div className="h-52">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={data} margin={{ top: 5, right: 5, bottom: 5, left: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="year" tick={{ fontSize: 10 }} />
            <YAxis tick={{ fontSize: 10 }} domain={['auto', 'auto']} />
            <Tooltip contentStyle={{ fontSize: 11 }} />
            <ReferenceLine y={region.avgYield} stroke="#C9A96E" strokeDasharray="5 5" label={{ value: '10yr Avg', position: 'right', fontSize: 9, fill: '#C9A96E' }} />
            <Bar dataKey="yield" name="Yield" radius={[4, 4, 0, 0]}>
              {data.map((entry, i) => (
                <Cell key={i} fill={entry.yield >= region.avgYield ? '#22c55e' : '#ef4444'} opacity={0.8} />
              ))}
            </Bar>
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

/* --- Climate Metrics Chart --- */
const ClimateChart = ({ region }) => {
  const data = Object.entries(region.historical)
    .filter(([_, d]) => d.rainfall !== null)
    .map(([yr, d]) => ({
      year: parseInt(yr),
      rainfall: d.rainfall,
      avgTemp: d.avgTemp,
      frostDays: d.frostDays,
      sunHours: d.sunHours
    }))

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5">
      <h3 className="text-sm font-semibold text-navy mb-3">Climate Metrics (10-Year)</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <p className="text-[10px] text-gray-400 uppercase tracking-wider mb-1">Annual Rainfall (mm)</p>
          <div className="h-36">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <XAxis dataKey="year" tick={{ fontSize: 9 }} />
                <YAxis tick={{ fontSize: 9 }} />
                <Tooltip contentStyle={{ fontSize: 10 }} />
                <Bar dataKey="rainfall" fill="#3b82f6" radius={[3,3,0,0]} opacity={0.7} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div>
          <p className="text-[10px] text-gray-400 uppercase tracking-wider mb-1">Avg Temperature (\u00b0C)</p>
          <div className="h-36">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <XAxis dataKey="year" tick={{ fontSize: 9 }} />
                <YAxis tick={{ fontSize: 9 }} domain={['auto', 'auto']} />
                <Tooltip contentStyle={{ fontSize: 10 }} />
                <Line dataKey="avgTemp" stroke="#ef4444" strokeWidth={2} dot={{ r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div>
          <p className="text-[10px] text-gray-400 uppercase tracking-wider mb-1">Frost Days</p>
          <div className="h-36">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <XAxis dataKey="year" tick={{ fontSize: 9 }} />
                <YAxis tick={{ fontSize: 9 }} />
                <Tooltip contentStyle={{ fontSize: 10 }} />
                <Bar dataKey="frostDays" fill="#06b6d4" radius={[3,3,0,0]} opacity={0.7} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div>
          <p className="text-[10px] text-gray-400 uppercase tracking-wider mb-1">Sunshine Hours</p>
          <div className="h-36">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <XAxis dataKey="year" tick={{ fontSize: 9 }} />
                <YAxis tick={{ fontSize: 9 }} />
                <Tooltip contentStyle={{ fontSize: 10 }} />
                <Bar dataKey="sunHours" fill="#eab308" radius={[3,3,0,0]} opacity={0.7} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  )
}

/* --- Season Detail --- */
const SeasonDetail = ({ region, year }) => {
  const d = region.historical[year]
  if (!d) return null
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-navy">{year} Season Report</h3>
        <OutlookBadge outlook={d.outlook} />
      </div>
      {d.yield !== null ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 mb-4">
          <StatBox icon={Sprout} label="Yield" value={typeof d.yield === 'number' && d.yield > 100 ? d.yield.toLocaleString() : d.yield} sub={region.yieldUnit} />
          <StatBox icon={CloudRain} label="Rainfall" value={`${d.rainfall}mm`} sub={d.rainfall > 700 ? 'Above avg' : d.rainfall < 500 ? 'Below avg' : 'Normal'} color="text-blue-600" />
          <StatBox icon={Thermometer} label="Avg Temp" value={`${d.avgTemp}\u00b0C`} color="text-red-500" />
          <StatBox icon={Sun} label="Sun Hours" value={d.sunHours.toLocaleString()} color="text-amber-500" />
        </div>
      ) : null}
      <div className="bg-gray-50 rounded-lg p-4">
        <p className="text-sm text-gray-700 leading-relaxed">{d.season}</p>
      </div>
      <div className="mt-3">
        <p className="text-[10px] text-gray-400"><strong>Price Link:</strong> {region.priceLink}</p>
      </div>
    </div>
  )
}

/* --- Region Deep Dive --- */
const RegionDeepDive = ({ region, onClose }) => {
  const [selectedYear, setSelectedYear] = useState(2025)

  return (
    <div className="space-y-4">
      <button onClick={onClose} className="text-xs text-gray-500 hover:text-navy flex items-center gap-1 mb-2">
        \u2190 Back to all regions
      </button>

      <div className="flex items-center gap-3">
        <span className="text-3xl">{region.icon}</span>
        <div>
          <h2 className="text-xl font-bold text-navy">{region.name}</h2>
          <p className="text-sm text-gray-500">{region.crop} \u2014 {region.spirit}</p>
        </div>
      </div>

      <div className="bg-amber-50 rounded-lg border border-amber-200 p-3">
        <p className="text-xs font-semibold text-amber-800 mb-1">Critical Yield Factors</p>
        <div className="flex flex-wrap gap-2">
          {region.criticalFactors.map((f, i) => (
            <span key={i} className="text-[10px] bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full">{f}</span>
          ))}
        </div>
      </div>

      {/* Live Weather */}
      <LiveWeatherPanel region={region} />

      {/* Charts */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <YieldChart region={region} />
        <ClimateChart region={region} />
      </div>

      {/* Year Selector + Season Detail */}
      <div>
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Detailed Season Reports</p>
        <YearSelector selectedYear={selectedYear} setSelectedYear={setSelectedYear} />
      </div>
      <SeasonDetail region={region} year={selectedYear} />
    </div>
  )
}

/* --- Forward-Looking Analysis --- */
const ForwardAnalysis = () => {
  const signals = [
    { region: 'Champagne', signal: 'Spring frost risk window approaching (April). 2021 frost destroyed 80% in some parcels. Current winter chill hours adequate but early warmth could trigger premature budburst.', risk: 'high', priceImpact: 'Champagne grape prices could surge 30\u201350% if April frost repeats. Houses would pass costs within 12\u201318 months. NV cuv\u00e9es affected first.', timeframe: 'Apr 2025 \u2192 Late 2026' },
    { region: 'Tequila / Agave', signal: 'Massive oversupply NOW but new planting has collapsed to near-zero. Current glut masks a FUTURE shortage. Pi\u00f1a prices at \u00382/kg (vs \u003830/kg in 2019).', risk: 'medium', priceImpact: 'Short-term: cheap agave = falling tequila COGS. Long-term (2030\u201332): another severe shortage cycle is being set up by today\u2019s farmer exits.', timeframe: 'Now \u2192 2030\u201332' },
    { region: 'Scotch / Barley', signal: 'Back-to-back difficult harvests (2023\u201324). Soil moisture high entering spring 2025. Late drilling = late harvest = quality risk. Import barley adds \u00a320\u201330/t premium.', risk: 'medium', priceImpact: 'Scotch production insulated by 3+ year aging requirement. Grain whisky costs more immediately sensitive. Blended Scotch COGS could rise 5\u201310%.', timeframe: 'Harvest 2025 \u2192 2026' },
    { region: 'California Wine', signal: 'Oversupply crisis. Grape prices falling. Vineyard removal accelerating. BUT: one bad fire season away from shortage in premium segments.', risk: 'low', priceImpact: 'Bulk wine prices depressed. Premium Napa still commands $8K\u201315K/ton but finding fewer buyers. Smoke taint event would flip market overnight.', timeframe: 'Ongoing' },
    { region: 'Caribbean Rum', signal: 'Active hurricane season forecast for 2025. La Ni\u00f1a weakening. Sugar #11 futures above 20c/lb. Beryl (2024) impact still being assessed.', risk: 'medium', priceImpact: 'Major hurricane hitting Jamaica or Guyana cane fields would spike molasses prices 20\u201340%. Rum COGS would follow within 3\u20136 months.', timeframe: 'Jun\u2013Nov 2025' },
    { region: 'Juniper / Gin', signal: 'Mediterranean wildfire risk structural and growing. 2022 was devastating. Wild juniper cannot be farmed at scale. Each fire year permanently reduces supply base.', risk: 'high', priceImpact: 'Another 2022-scale fire season would push juniper prices to all-time highs. Gin producers with 12\u201318 month supply buffers better positioned.', timeframe: 'Summer 2025' },
    { region: 'Cognac', signal: 'Chinese demand rebounding strongly. Stock levels tight for XO/aged eaux-de-vie. 2024 harvest below average. 2021 frost losses still reducing available aged stock.', risk: 'medium', priceImpact: 'XO cognac prices likely to rise 10\u201320% through 2025\u201326 as supply tightens. VS/VSOP more insulated. R\u00e9my and Hennessy will pass costs through.', timeframe: '2025\u20132027' },
    { region: 'Hops / Beer', signal: 'Climate volatility increasing in Hallertau. Irrigation becoming necessary. Long-term hop contracts (3\u20135yr) mask spot market volatility. Craft brewers most exposed.', risk: 'low', priceImpact: 'Large brewers locked in at contract prices. Craft/micro brewers buying spot may see 15\u201325% cost swings year-to-year.', timeframe: 'Contract renewals 2025\u201326' }
  ]

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5">
      <div className="flex items-center gap-2 mb-4">
        <AlertTriangle size={16} className="text-amber-500" />
        <h3 className="text-sm font-bold text-navy">Forward-Looking Yield \u0026 Price Signals</h3>
      </div>
      <p className="text-xs text-gray-500 mb-4">Intelligence brief: where climate and agricultural factors may impact spirits pricing over the next 12\u201336 months.</p>

      <div className="space-y-3">
        {signals.map((s, i) => (
          <div key={i} className={`rounded-lg border p-4 ${s.risk === 'high' ? 'border-red-200 bg-red-50/50' : s.risk === 'medium' ? 'border-amber-200 bg-amber-50/30' : 'border-gray-200 bg-gray-50/30'}`}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-navy">{s.region}</span>
              <div className="flex items-center gap-2">
                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${s.risk === 'high' ? 'bg-red-100 text-red-700' : s.risk === 'medium' ? 'bg-amber-100 text-amber-700' : 'bg-green-100 text-green-700'}`}>
                  {s.risk.toUpperCase()} RISK
                </span>
                <span className="text-[10px] text-gray-400">{s.timeframe}</span>
              </div>
            </div>
            <p className="text-xs text-gray-700 mb-2">{s.signal}</p>
            <p className="text-xs text-gray-500"><strong className="text-navy">Price Impact:</strong> {s.priceImpact}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

/* --- Region Overview Card --- */
const RegionCard = ({ region, onClick }) => {
  const years = Object.entries(region.historical).filter(([_, d]) => d.yield !== null)
  const latest = years[years.length - 1]
  const prev = years.length > 1 ? years[years.length - 2] : null
  const yieldChange = latest && prev ? (((latest[1].yield - prev[1].yield) / prev[1].yield) * 100).toFixed(1) : null

  const miniData = years.slice(-5).map(([yr, d]) => ({ year: yr, yield: d.yield }))

  return (
    <div onClick={onClick} className="bg-white rounded-xl border border-gray-200 p-4 hover:shadow-lg hover:border-gold/50 transition-all cursor-pointer group">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className="text-xl">{region.icon}</span>
          <div>
            <h3 className="text-sm font-bold text-navy group-hover:text-gold transition-colors">{region.name}</h3>
            <p className="text-[10px] text-gray-400">{region.spirit}</p>
          </div>
        </div>
        {latest && <OutlookBadge outlook={latest[1].outlook} />}
      </div>

      <p className="text-[10px] text-gray-500 mb-2">{region.crop} \u2014 {region.country}</p>

      <div className="h-16 mb-2">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={miniData}>
            <Area type="monotone" dataKey="yield" stroke={region.color} fill={region.color} fillOpacity={0.15} strokeWidth={2} dot={false} />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="flex items-center justify-between">
        <div>
          <p className="text-[10px] text-gray-400">Latest Yield ({latest?.[0]})</p>
          <p className="text-sm font-bold text-navy">{typeof latest?.[1]?.yield === 'number' && latest[1].yield > 100 ? latest[1].yield.toLocaleString() : latest?.[1]?.yield} <span className="text-[10px] font-normal text-gray-400">{region.yieldUnit}</span></p>
        </div>
        {yieldChange && (
          <span className={`text-xs font-semibold ${parseFloat(yieldChange) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {parseFloat(yieldChange) >= 0 ? '+' : ''}{yieldChange}% YoY
          </span>
        )}
      </div>
    </div>
  )
}

/* ══════════════════════════════════════════════════════════════
   MAIN PAGE
   ══════════════════════════════════════════════════════════════ */
export default function ClimateYield() {
  const [selectedRegion, setSelectedRegion] = useState(null)

  const region = REGIONS.find(r => r.id === selectedRegion)

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-navy">Climate \u0026 Yield Intelligence</h1>
        <p className="text-sm text-gray-500 mt-1">Agricultural inputs, weather patterns, and forward-looking yield analysis for every major spirits category</p>
      </div>

      {!selectedRegion ? (
        <>
          {/* Overview Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            <StatBox icon={Globe} label="Regions Tracked" value={REGIONS.length} sub="Across 8 countries" />
            <StatBox icon={Leaf} label="Crop Types" value="11" sub="Grapes to agave to grain" />
            <StatBox icon={Calendar} label="Data Depth" value="10 Years" sub="2016\u20132025 + live" />
            <StatBox icon={AlertTriangle} label="High-Risk Signals" value="2" sub="Champagne frost, Juniper fires" color="text-red-500" />
          </div>

          {/* Forward Analysis */}
          <ForwardAnalysis />

          {/* Region Grid */}
          <div>
            <h2 className="text-sm font-bold text-navy uppercase tracking-wider mb-3">Input Regions \u0026 Crops</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {REGIONS.map(r => (
                <RegionCard key={r.id} region={r} onClick={() => setSelectedRegion(r.id)} />
              ))}
            </div>
          </div>

          {/* Sources */}
          <div className="bg-gray-50 rounded-xl border border-gray-200 p-4">
            <p className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider mb-2">Data Sources \u0026 Methodology</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[10px] text-gray-500">
              <div>\u2022 <strong>Live Weather:</strong> Open-Meteo API (free, open-source weather data)</div>
              <div>\u2022 <strong>Historical Climate:</strong> ERA5 / Copernicus Climate Data Store via Open-Meteo Archive</div>
              <div>\u2022 <strong>Champagne:</strong> CIVC annual reports, Comit\u00e9 Champagne harvest data</div>
              <div>\u2022 <strong>Cognac:</strong> BNIC production statistics, Charentes agricultural chamber</div>
              <div>\u2022 <strong>Tequila:</strong> CRT (Consejo Regulador del Tequila) production data, USDA FAS Mexico</div>
              <div>\u2022 <strong>Rum/Sugar:</strong> ICE Sugar #11 futures, ISO Sugar Yearbook, USDA FAS Caribbean</div>
              <div>\u2022 <strong>Scotch Barley:</strong> AHDB Cereals \u0026 Oilseeds, SRUC crop reports, SWA annual review</div>
              <div>\u2022 <strong>Bourbon/Corn:</strong> USDA NASS crop production reports, CBOT corn futures</div>
              <div>\u2022 <strong>Wine:</strong> OIV World Wine Production estimates, regional interprofessional bodies</div>
              <div>\u2022 <strong>Hops:</strong> IHGC (International Hop Growers\u2019 Convention), Barth-Haas reports</div>
              <div>\u2022 <strong>Juniper:</strong> Botanical supply chain reports, Mediterranean forest fire databases (EFFIS)</div>
              <div>\u2022 <strong>Vodka/Grain:</strong> MATIF wheat futures, USDA FAS Poland, Eurostat agricultural data</div>
            </div>
            <p className="text-[10px] text-gray-400 mt-2 pt-2 border-t border-gray-200">Yield figures are regional estimates based on published data. Live weather data refreshes on page load. Historical comparison uses year-to-date figures. Last updated: February 2026.</p>
          </div>
        </>
      ) : (
        <RegionDeepDive region={region} onClose={() => setSelectedRegion(null)} />
      )}
    </div>
  )
}
