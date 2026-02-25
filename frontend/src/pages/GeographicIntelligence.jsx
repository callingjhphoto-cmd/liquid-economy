import React, { useState } from 'react';
import {
  Globe,
  MapPin,
  TrendingUp,
  TrendingDown,
  BarChart3,
  ExternalLink,
  Calendar,
  ChevronRight,
  ChevronDown,
  Shield,
  Ship,
  Users,
} from 'lucide-react';

// Regions data
const REGIONS = [
  {
    key: 'us',
    name: 'United States',
    flag: '\ud83c\uddfa\ud83c\uddf8',
    source: 'IWSR, Nielsen',
    summary: 'World\'s largest spirits market with premiumization trend and growing RTD segment.',
    trajectory: 'Strong volume growth in super-premium and craft spirits categories.',
  },
  {
    key: 'uk',
    name: 'United Kingdom',
    flag: '\ud83c\uddec\ud83c\udde7',
    source: 'Euromonitor, Drinks International',
    summary: 'Mature market with robust on-premise recovery and premium gin renaissance.',
    trajectory: 'Post-pandemic hospitality rebound driving growth in premium segments.',
  },
  {
    key: 'eu27',
    name: 'Europe (EU27)',
    flag: '\ud83c\uddea\ud83c\uddfa',
    source: 'Euromonitor, The Spirits Business',
    summary: 'Diverse regional markets with strong tradition and sustainability focus.',
    trajectory: 'Health-conscious consumers driving low/no alcohol category expansion.',
  },
  {
    key: 'meafrica',
    name: 'Middle East & Africa',
    flag: '\ud83c\uddf8\ud83c\udde6',
    source: 'Statista, IWSR',
    summary: 'Growing markets with premium and non-alcoholic beverages driving expansion.',
    trajectory: 'Rising middle class and travel retail creating significant opportunities.',
  },
  {
    key: 'china',
    name: 'China',
    flag: '\ud83c\udde8\ud83c\uddf3',
    source: 'Nielsen, Drinks Business Asia',
    summary: 'Baijiu dominance with explosive growth in imported spirits and e-commerce.',
    trajectory: 'Young consumers adopting international spirits; e-commerce transformation ongoing.',
  },
];

const REGION_DATA = {
  us: {
    kpis: [
      { label: 'Market Size (2025)', value: '$52.3B', change: 4.2, changeDir: 'up' },
      { label: 'Volume Growth', value: '2.1%', change: 0.5, changeDir: 'up' },
      { label: 'Super-Premium Share', value: '34%', change: 2.3, changeDir: 'up' },
      { label: 'RTD Penetration', value: '18%', change: 5.1, changeDir: 'up' },
      { label: 'On-Premise Value', value: '$18.2B', change: 6.8, changeDir: 'up' },
      { label: 'E-commerce Growth', value: '12.4%', change: 1.9, changeDir: 'up' },
    ],
    topBrands: ['Jack Daniel\'s', 'Hennessy', 'Smirnoff', 'Jose Cuervo', 'Grey Goose'],
    channels: { onPremise: 38, offPremise: 45, eCommerce: 12, travelRetail: 5 },
    trends: [
      { text: 'Super-premium growth outpacing mass market by 3x', source: 'IWSR', url: 'https://iwsr.com' },
      { text: 'RTD cocktails seeing accelerated adoption among Gen Z consumers', source: 'Nielsen', url: 'https://www.nielsen.com' },
      { text: 'Sustainable packaging drives premiumization strategy', source: 'Drinks International', url: 'https://www.drinksinternational.com' },
      { text: 'Direct-to-consumer channels growing 15% annually', source: 'IWSR', url: 'https://iwsr.com' },
      { text: 'Non-alcoholic spirits market expanding at 18% CAGR', source: 'Statista', url: 'https://www.statista.com' },
    ],
    yearlyReports: [
      {
        year: 2022,
        marketSize: '$48.1B',
        growth: 3.2,
        volumeCases: '165M',
        keyEvents: ['Post-pandemic volume rebound', 'Inflation pressures emerge'],
        topPerformer: 'Super-premium whiskeys',
        outlook: 'Recovery phase with premiumization leading growth',
      },
      {
        year: 2023,
        marketSize: '$49.8B',
        growth: 3.5,
        volumeCases: '169M',
        keyEvents: ['Consolidation in craft spirits', 'RTD segment acceleration'],
        topPerformer: 'Tequila and agave spirits',
        outlook: 'Consumer premiumization trend solidifying',
      },
      {
        year: 2024,
        marketSize: '$50.9B',
        growth: 2.2,
        volumeCases: '172M',
        keyEvents: ['E-commerce regulations clarified', 'Sustainability initiatives expand'],
        topPerformer: 'Low/no alcohol alternatives',
        outlook: 'Volume moderation offset by value growth',
      },
      {
        year: 2025,
        marketSize: '$52.3B',
        growth: 2.7,
        volumeCases: '175M',
        keyEvents: ['Tariff impact assessment', 'Digital transformation accelerates'],
        topPerformer: 'Premium gin and vodka',
        outlook: 'Sustained premiumization with category diversification',
      },
    ],
    regulatory: [
      {
        title: 'TTB Label Compliance',
        description: 'Updated alcohol content labeling and health warnings requirements.',
        impact: 'neutral',
      },
      {
        title: 'E-commerce Shipping Regulations',
        description: 'State-level direct-to-consumer shipping restrictions and tax collection.',
        impact: 'negative',
      },
      {
        title: 'Sustainability Standards',
        description: 'Packaging reduction targets and carbon neutral shipping incentives.',
        impact: 'positive',
      },
    ],
    importExport: {
      topImports: [
        { country: 'Scotland', value: '$8.2B', share: '28%' },
        { country: 'Mexico', value: '$6.4B', share: '22%' },
        { country: 'Ireland', value: '$4.1B', share: '14%' },
        { country: 'France', value: '$3.8B', share: '13%' },
      ],
      topExports: [
        { country: 'Canada', value: '$2.3B', share: '35%' },
        { country: 'United Kingdom', value: '$1.8B', share: '27%' },
        { country: 'Australia', value: '$1.1B', share: '17%' },
        { country: 'Mexico', value: '$0.9B', share: '14%' },
      ],
    },
  },
  uk: {
    kpis: [
      { label: 'Market Size (2025)', value: 'GBP12.8B', change: 5.3, changeDir: 'up' },
      { label: 'On-Premise Growth', value: '7.2%', change: 2.1, changeDir: 'up' },
      { label: 'Gin Market Share', value: '28%', change: 1.8, changeDir: 'up' },
      { label: 'Premium Segment', value: '41%', change: 3.2, changeDir: 'up' },
      { label: 'Export Value', value: 'GBP3.2B', change: 4.1, changeDir: 'up' },
      { label: 'Off-Trade Volume', value: 'GBP6.1B', change: 2.7, changeDir: 'up' },
    ],
    topBrands: ['Gordon\'s', 'Diageo Portfolio', 'Bacardi', 'Absolut', 'The Glenmorangie'],
    channels: { onPremise: 42, offPremise: 48, eCommerce: 7, travelRetail: 3 },
    trends: [
      { text: 'Premium gin market growing faster than vodka segment', source: 'The Spirits Business', url: 'https://www.thewinebusiness.com' },
      { text: 'Hospitality venues reporting record footfall post-pandemic', source: 'Drinks International', url: 'https://www.drinksinternational.com' },
      { text: 'Craft spirits gaining shelf space in off-license retail', source: 'Euromonitor', url: 'https://www.euromonitor.com' },
      { text: 'Scotch whisky exports maintain premium positioning', source: 'Statista', url: 'https://www.statista.com' },
      { text: 'Low alcohol beverages expanding in high street venues', source: 'IWSR', url: 'https://iwsr.com' },
    ],
    yearlyReports: [
      {
        year: 2022,
        marketSize: 'GBP11.2B',
        growth: 2.8,
        volumeCases: '42M',
        keyEvents: ['On-premise reopening completion', 'Cost-of-living pressures begin'],
        topPerformer: 'Premium gin brands',
        outlook: 'Recovery with consumer trading up to premium',
      },
      {
        year: 2023,
        marketSize: 'GBP11.8B',
        growth: 5.4,
        volumeCases: '44M',
        keyEvents: ['Hospitality wages increase', 'Gin market consolidation'],
        topPerformer: 'Craft distillery products',
        outlook: 'Strong premiumization in on-premise channel',
      },
      {
        year: 2024,
        marketSize: 'GBP12.2B',
        growth: 3.4,
        volumeCases: '45M',
        keyEvents: ['Spring Budget tax impacts', 'Export growth to EU recovery'],
        topPerformer: 'Super-premium whisky',
        outlook: 'Steady growth with export stabilization',
      },
      {
        year: 2025,
        marketSize: 'GBP12.8B',
        growth: 4.9,
        volumeCases: '46M',
        keyEvents: ['Tourism recovery to peak levels', 'Premium positioning continues'],
        topPerformer: 'Gin and tonic culture expansion',
        outlook: 'On-premise-led growth with strong tourist spending',
      },
    ],
    regulatory: [
      {
        title: 'Alcohol Duty Reform',
        description: 'Progressive duty rates based on ABV affecting pricing strategy.',
        impact: 'negative',
      },
      {
        title: 'Age Verification Requirements',
        description: 'Mandatory digital age checks for online spirits purchases.',
        impact: 'neutral',
      },
      {
        title: 'Export Tariff Relief',
        description: 'Government support for Scotch whisky exports post-Brexit.',
        impact: 'positive',
      },
    ],
    importExport: {
      topImports: [
        { country: 'Ireland', value: 'GBP1.8B', share: '32%' },
        { country: 'France', value: 'GBP1.2B', share: '21%' },
        { country: 'Spain', value: 'GBP0.8B', share: '14%' },
        { country: 'Netherlands', value: 'GBP0.6B', share: '11%' },
      ],
      topExports: [
        { country: 'United States', value: 'GBP1.4B', share: '44%' },
        { country: 'France', value: 'GBP0.5B', share: '16%' },
        { country: 'Germany', value: 'GBP0.4B', share: '13%' },
        { country: 'Canada', value: 'GBP0.3B', share: '9%' },
      ],
    },
  },
  eu27: {
    kpis: [
      { label: 'Market Size (2025)', value: 'EUR31.2B', change: 2.1, changeDir: 'up' },
      { label: 'Volume Growth', value: '1.3%', change: -0.4, changeDir: 'down' },
      { label: 'Premium Positioning', value: '33%', change: 2.8, changeDir: 'up' },
      { label: 'Low/No Alcohol Share', value: '8%', change: 3.2, changeDir: 'up' },
      { label: 'Sustainability Focus', value: '67%', change: 8.1, changeDir: 'up' },
      { label: 'E-commerce Growth', value: '9.3%', change: 2.1, changeDir: 'up' },
    ],
    topBrands: ['Smirnoff', 'Bacardi', 'Martell', 'Moet & Chandon', 'Bombay Sapphire'],
    channels: { onPremise: 35, offPremise: 52, eCommerce: 9, travelRetail: 4 },
    trends: [
      { text: 'Health-conscious consumers driving low/no alcohol category', source: 'Euromonitor', url: 'https://www.euromonitor.com' },
      { text: 'Sustainability certifications becoming purchase criteria', source: 'The Spirits Business', url: 'https://www.thewinebusiness.com' },
      { text: 'Regional craft spirits gaining market share in off-trade', source: 'IWSR', url: 'https://iwsr.com' },
      { text: 'Wine-to-spirits trading down evident in mature markets', source: 'Statista', url: 'https://www.statista.com' },
      { text: 'E-commerce penetration varying significantly by country', source: 'Drinks International', url: 'https://www.drinksinternational.com' },
    ],
    yearlyReports: [
      {
        year: 2022,
        marketSize: 'EUR29.4B',
        growth: 1.2,
        volumeCases: '98M',
        keyEvents: ['Energy crisis impacts consumer spending', 'Premium segment resilience'],
        topPerformer: 'Fortified wines and vermouths',
        outlook: 'Volume pressure with value maintenance through premiumization',
      },
      {
        year: 2023,
        marketSize: 'EUR30.1B',
        growth: 2.4,
        volumeCases: '99M',
        keyEvents: ['Consumer confidence improving', 'Sustainability becomes mandatory'],
        topPerformer: 'Low alcohol spirits',
        outlook: 'Growth driven by innovation and sustainability',
      },
      {
        year: 2024,
        marketSize: 'EUR30.7B',
        growth: 2.0,
        volumeCases: '100M',
        keyEvents: ['Packaging waste regulations enforce', 'Regional market divergence'],
        topPerformer: 'Craft distillery experiences',
        outlook: 'Mature market consolidation with innovation focus',
      },
      {
        year: 2025,
        marketSize: 'EUR31.2B',
        growth: 1.6,
        volumeCases: '101M',
        keyEvents: ['EU Green Deal implementation', 'E-commerce regulations harmonize'],
        topPerformer: 'Premium and sustainable brands',
        outlook: 'Value growth offsetting volume decline through premiumization',
      },
    ],
    regulatory: [
      {
        title: 'EU Green Deal Compliance',
        description: 'Mandatory carbon footprint labeling and packaging reduction targets.',
        impact: 'positive',
      },
      {
        title: 'Marketing Restrictions',
        description: 'Stricter social media advertising and health claim prohibitions.',
        impact: 'negative',
      },
      {
        title: 'VAT Harmonization Discussions',
        description: 'Ongoing EU-wide VAT rate standardization debates.',
        impact: 'neutral',
      },
    ],
    importExport: {
      topImports: [
        { country: 'Scotland', value: 'EUR4.2B', share: '25%' },
        { country: 'Mexico', value: 'EUR3.1B', share: '19%' },
        { country: 'France', value: 'EUR2.8B', share: '17%' },
        { country: 'Brazil', value: 'EUR1.9B', share: '12%' },
      ],
      topExports: [
        { country: 'United States', value: 'EUR3.4B', share: '42%' },
        { country: 'China', value: 'EUR1.8B', share: '22%' },
        { country: 'Russia', value: 'EUR1.2B', share: '15%' },
        { country: 'India', value: 'EUR0.9B', share: '11%' },
      ],
    },
  },
  meafrica: {
    kpis: [
      { label: 'Market Size (2025)', value: '$8.7B', change: 9.2, changeDir: 'up' },
      { label: 'Travel Retail Growth', value: '11.3%', change: 4.2, changeDir: 'up' },
      { label: 'Premium Segment', value: '52%', change: 6.1, changeDir: 'up' },
      { label: 'Non-Alcoholic Share', value: '34%', change: 5.8, changeDir: 'up' },
      { label: 'E-commerce Penetration', value: '6%', change: 3.4, changeDir: 'up' },
      { label: 'Luxury Growth', value: '13.2%', change: 7.3, changeDir: 'up' },
    ],
    topBrands: ['Hennessy', 'Johnnie Walker', 'Remy Martin', 'Patron', 'Non-alc Beverages'],
    channels: { onPremise: 25, offPremise: 45, eCommerce: 6, travelRetail: 24 },
    trends: [
      { text: 'Premium cognac driving luxury hospitality segment expansion', source: 'IWSR', url: 'https://iwsr.com' },
      { text: 'Travel retail recovery accelerating with luxury consumer spending', source: 'Statista', url: 'https://www.statista.com' },
      { text: 'Non-alcoholic premium beverages gaining status in region', source: 'Euromonitor', url: 'https://www.euromonitor.com' },
      { text: 'Rising middle class adopting imported spirits as status symbol', source: 'Drinks International', url: 'https://www.drinksinternational.com' },
      { text: 'African market showing strongest growth trajectory globally', source: 'The Spirits Business', url: 'https://www.thewinebusiness.com' },
    ],
    yearlyReports: [
      {
        year: 2022,
        marketSize: '$7.1B',
        growth: 8.1,
        volumeCases: '28M',
        keyEvents: ['Travel retail recovery begins', 'Luxury consumer emergence'],
        topPerformer: 'Premium cognacs',
        outlook: 'Travel retail-driven growth with premiumization',
      },
      {
        year: 2023,
        marketSize: '$7.6B',
        growth: 7.0,
        volumeCases: '30M',
        keyEvents: ['Middle East luxury spending spike', 'Non-alc category launches'],
        topPerformer: 'Ultra-premium spirits',
        outlook: 'Strong travel retail momentum continuing',
      },
      {
        year: 2024,
        marketSize: '$8.1B',
        growth: 6.6,
        volumeCases: '32M',
        keyEvents: ['E-commerce platform launches', 'Duty-free expansion'],
        topPerformer: 'Imported vodka and whiskey',
        outlook: 'Diversified growth across channels',
      },
      {
        year: 2025,
        marketSize: '$8.7B',
        growth: 7.4,
        volumeCases: '34M',
        keyEvents: ['Luxury hospitality growth', 'Online retail regulations clarify'],
        topPerformer: 'Super-premium cognac and champagne',
        outlook: 'Sustained high growth with rising consumer affluence',
      },
    ],
    regulatory: [
      {
        title: 'Import Tariff Restructuring',
        description: 'Regional duty modifications on imported premium spirits.',
        impact: 'mixed',
      },
      {
        title: 'Advertising Restrictions',
        description: 'Stricter regulations on alcohol marketing in certain territories.',
        impact: 'negative',
      },
      {
        title: 'Travel Retail Incentives',
        description: 'Government support for duty-free zones and hospitality expansion.',
        impact: 'positive',
      },
    ],
    importExport: {
      topImports: [
        { country: 'France', value: '$2.8B', share: '38%' },
        { country: 'Scotland', value: '$1.9B', share: '26%' },
        { country: 'United States', value: '$1.4B', share: '19%' },
        { country: 'Mexico', value: '$0.8B', share: '11%' },
      ],
      topExports: [
        { country: 'UAE', value: '$0.6B', share: '55%' },
        { country: 'Saudi Arabia', value: '$0.3B', share: '27%' },
        { country: 'South Africa', value: '$0.1B', share: '9%' },
        { country: 'Nigeria', value: '$0.05B', share: '5%' },
      ],
    },
  },
  china: {
    kpis: [
      { label: 'Market Size (2025)', value: 'CNY342B', change: 6.8, changeDir: 'up' },
      { label: 'Baijiu Dominance', value: '73%', change: -1.2, changeDir: 'down' },
      { label: 'Imported Spirits Growth', value: '18.3%', change: 5.4, changeDir: 'up' },
      { label: 'E-commerce Share', value: '32%', change: 7.8, changeDir: 'up' },
      { label: 'Luxury Segment', value: '41%', change: 4.6, changeDir: 'up' },
      { label: 'Young Consumer Adoption', value: '28%', change: 8.2, changeDir: 'up' },
    ],
    topBrands: ['Moutai', 'Wuliangye', 'Johnnie Walker', 'Hennessy', 'Absolut'],
    channels: { onPremise: 20, offPremise: 28, eCommerce: 45, travelRetail: 7 },
    trends: [
      { text: 'Gen Z embracing imported spirits over traditional baijiu', source: 'Nielsen', url: 'https://www.nielsen.com' },
      { text: 'E-commerce transformation driving direct-to-consumer adoption', source: 'Drinks Business Asia', url: 'https://www.drinksbusiness.com' },
      { text: 'Live streaming commerce revolutionizing spirits retail', source: 'IWSR', url: 'https://iwsr.com' },
      { text: 'Luxury cognac and whisky gaining prestige status among affluent', source: 'Statista', url: 'https://www.statista.com' },
      { text: 'Health-conscious consumers driving baijiu alternatives growth', source: 'Euromonitor', url: 'https://www.euromonitor.com' },
    ],
    yearlyReports: [
      {
        year: 2022,
        marketSize: 'CNY298B',
        growth: 3.2,
        volumeCases: '118M',
        keyEvents: ['Zero-COVID restrictions impact', 'Imported spirits debut online'],
        topPerformer: 'Premium baijiu brands',
        outlook: 'Recovery phase with baijiu stabilizing',
      },
      {
        year: 2023,
        marketSize: 'CNY314B',
        growth: 5.4,
        volumeCases: '125M',
        keyEvents: ['Covid lockdowns end', 'E-commerce explosion begins'],
        topPerformer: 'Imported whisky and cognac',
        outlook: 'Consumer diversification accelerating with e-commerce',
      },
      {
        year: 2024,
        marketSize: 'CNY328B',
        growth: 4.5,
        volumeCases: '132M',
        keyEvents: ['Live streaming commerce takes off', 'Gen Z segment expansion'],
        topPerformer: 'E-commerce native brands',
        outlook: 'Digital-first strategy becoming essential',
      },
      {
        year: 2025,
        marketSize: 'CNY342B',
        growth: 4.3,
        volumeCases: '140M',
        keyEvents: ['Luxury market stabilization', 'Sustainability narratives emerge'],
        topPerformer: 'Imported spirits and premiumization',
        outlook: 'Sustained growth with category portfolio diversification',
      },
    ],
    regulatory: [
      {
        title: 'E-commerce Regulations',
        description: 'Cross-border e-commerce tariff modifications and compliance requirements.',
        impact: 'negative',
      },
      {
        title: 'Alcohol Sales Hour Restrictions',
        description: 'Regional limitations on online alcohol delivery hours and volumes.',
        impact: 'negative',
      },
      {
        title: 'Import Duty Reductions',
        description: 'Government initiative to reduce tariffs on premium imported spirits.',
        impact: 'positive',
      },
    ],
    importExport: {
      topImports: [
        { country: 'France', value: 'CNY54B', share: '42%' },
        { country: 'Scotland', value: 'CNY32B', share: '25%' },
        { country: 'United States', value: 'CNY26B', share: '20%' },
        { country: 'Australia', value: 'CNY17B', share: '13%' },
      ],
      topExports: [
        { country: 'Hong Kong', value: 'CNY12B', share: '48%' },
        { country: 'Singapore', value: 'CNY8B', share: '32%' },
        { country: 'Taiwan', value: 'CNY4B', share: '16%' },
        { country: 'Macau', value: 'CNY1B', share: '4%' },
      ],
    },
  },
};

// SourceLink Component
const SourceLink = ({ source, url }) => (
  <a
    href={url}
    target="_blank"
    rel="noopener noreferrer"
    className="inline-flex items-center gap-1 text-slate-800 hover:text-slate-600 transition-colors"
  >
    <span className="text-xs font-medium">{source}</span>
    <ExternalLink size={12} />
  </a>
);

// RegionCard Component (Sidebar)
const RegionCard = ({ region, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`w-full p-4 rounded-lg border transition-all text-left ${
      isActive
        ? 'bg-slate-800 text-white border-slate-800'
        : 'bg-white border-gray-100 text-slate-800 hover:bg-gray-50'
    }`}
  >
    <div className="flex items-start gap-3">
      <span className="w-10 h-10 rounded-lg flex items-center justify-center text-2xl">{region.flag}</span>
      <div className="flex-1 min-w-0">
        <div className="font-semibold text-sm">{region.name}</div>
        <p
          className={`text-xs mt-2 line-clamp-2 ${
            isActive ? 'text-white/80' : 'text-gray-600'
          }`}
        >
          {region.summary}
        </p>
      </div>
    </div>
  </button>
);

// YearlyReports Component
const YearlyReports = ({ reports }) => {
  const [selectedYear, setSelectedYear] = useState(reports[reports.length - 1].year);
  const report = reports.find((r) => r.year === selectedYear);

  return (
    <div className="bg-white rounded-lg border border-gray-100 p-6">
      <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
        <Calendar size={20} />
        Market Performance Timeline
      </h3>

      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {reports.map((r) => (
          <button
            key={r.year}
            onClick={() => setSelectedYear(r.year)}
            className={`px-4 py-2 rounded-lg border text-sm font-medium transition-all whitespace-nowrap ${
              selectedYear === r.year
                ? 'bg-slate-800 text-white border-slate-800'
                : 'bg-gray-50 text-slate-800 border-gray-100 hover:border-gray-200'
            }`}
          >
            {r.year}
          </button>
        ))}
      </div>

      {report && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
              <p className="text-xs text-gray-600 mb-1">Market Size</p>
              <p className="text-xl font-bold text-slate-800">{report.marketSize}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
              <p className="text-xs text-gray-600 mb-1">Growth Rate</p>
              <div className="flex items-center gap-2">
                <p className="text-xl font-bold text-slate-800">{report.growth}%</p>
                {report.growth > 0 ? (
                  <TrendingUp size={16} className="text-green-600" />
                ) : (
                  <TrendingDown size={16} className="text-red-600" />
                )}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
              <p className="text-xs text-gray-600 mb-1">Volume (Cases)</p>
              <p className="text-lg font-bold text-slate-800">{report.volumeCases}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
              <p className="text-xs text-gray-600 mb-1">Top Performer</p>
              <p className="text-sm font-semibold text-slate-800">{report.topPerformer}</p>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
            <p className="text-xs text-blue-700 font-semibold mb-2">OUTLOOK</p>
            <p className="text-sm text-blue-900">{report.outlook}</p>
          </div>

          <div>
            <p className="text-xs text-gray-600 font-semibold mb-3">KEY EVENTS</p>
            <ul className="space-y-2">
              {report.keyEvents.map((event, idx) => (
                <li key={idx} className="flex gap-3 text-sm text-gray-700">
                  <span className="text-slate-800 font-bold min-w-6">{idx + 1}.</span>
                  <span>{event}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

// RegulatoryLandscape Component
const RegulatoryLandscape = ({ regulatory }) => {
  const getImpactColor = (impact) => {
    switch (impact) {
      case 'positive':
        return 'bg-green-50 border-green-100 text-green-900';
      case 'negative':
        return 'bg-red-50 border-red-100 text-red-900';
      case 'neutral':
      default:
        return 'bg-amber-50 border-amber-100 text-amber-900';
    }
  };

  const getImpactBadge = (impact) => {
    switch (impact) {
      case 'positive':
        return 'bg-green-100 text-green-700';
      case 'negative':
        return 'bg-red-100 text-red-700';
      case 'neutral':
      default:
        return 'bg-amber-100 text-amber-700';
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-100 p-6">
      <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
        <Shield size={20} />
        Regulatory Landscape
      </h3>

      <div className="space-y-4">
        {regulatory.map((item, idx) => (
          <div key={idx} className={`rounded-lg border p-4 ${getImpactColor(item.impact)}`}>
            <div className="flex items-start justify-between gap-3 mb-2">
              <h4 className="font-semibold text-sm">{item.title}</h4>
              <span className={`text-xs font-bold px-3 py-1 rounded-full ${getImpactBadge(item.impact)}`}>
                {item.impact.charAt(0).toUpperCase() + item.impact.slice(1)}
              </span>
            </div>
            <p className="text-sm opacity-90">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

// TradeFlows Component
const TradeFlows = ({ importExport }) => (
  <div className="bg-white rounded-lg border border-gray-100 p-6">
    <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
      <Ship size={20} />
      Trade Flows
    </h3>

    <div className="grid grid-cols-2 gap-6">
      <div>
        <h4 className="text-sm font-semibold text-slate-800 mb-3">Top Imports</h4>
        <div className="space-y-3">
          {importExport.topImports.map((item, idx) => (
            <div key={idx} className="bg-gray-50 border border-gray-100 rounded-lg p-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-slate-800">{item.country}</span>
                <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                  {item.share}
                </span>
              </div>
              <p className="text-lg font-bold text-slate-800">{item.value}</p>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h4 className="text-sm font-semibold text-slate-800 mb-3">Top Exports</h4>
        <div className="space-y-3">
          {importExport.topExports.map((item, idx) => (
            <div key={idx} className="bg-gray-50 border border-gray-100 rounded-lg p-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-slate-800">{item.country}</span>
                <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                  {item.share}
                </span>
              </div>
              <p className="text-lg font-bold text-slate-800">{item.value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

// RegionDetail Component
const RegionDetail = ({ region, data }) => (
  <div className="space-y-6">
    {/* Header Card */}
    <div className="bg-white rounded-lg border border-gray-100 p-6">
      <div className="flex items-start gap-4 mb-4">
        <span className="w-14 h-14 rounded-xl flex items-center justify-center text-4xl">{region.flag}</span>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-slate-800">{region.name}</h1>
          <p className="text-gray-600 mt-2">{region.trajectory}</p>
        </div>
      </div>
      <div className="flex items-center gap-2 pt-4 border-t border-gray-100">
        <BarChart3 size={16} className="text-gray-600" />
        <span className="text-sm text-gray-600">
          <strong>Source:</strong> {region.source}
        </span>
      </div>
    </div>

    {/* KPIs Grid */}
    <div className="bg-white rounded-lg border border-gray-100 p-6">
      <h2 className="text-lg font-semibold text-slate-800 mb-4">Key Performance Indicators</h2>
      <div className="grid grid-cols-3 gap-4">
        {data.kpis.map((kpi, idx) => (
          <div key={idx} className="bg-gray-50 rounded-lg border border-gray-100 p-4">
            <p className="text-xs text-gray-600 font-medium mb-2">{kpi.label}</p>
            <div className="flex items-end justify-between">
              <div className="text-2xl font-bold text-slate-800">{kpi.value}</div>
              <div className="flex items-center gap-1">
                {kpi.changeDir === 'up' ? (
                  <TrendingUp size={16} className="text-green-600" />
                ) : kpi.changeDir === 'down' ? (
                  <TrendingDown size={16} className="text-red-600" />
                ) : (
                  <div className="text-gray-400 text-xs">-</div>
                )}
                <span
                  className={`text-sm font-semibold ${
                    kpi.changeDir === 'up'
                      ? 'text-green-600'
                      : kpi.changeDir === 'down'
                      ? 'text-red-600'
                      : 'text-gray-600'
                  }`}
                >
                  {kpi.change > 0 ? '+' : ''}{kpi.change}%
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* Channel Performance */}
    <div className="bg-white rounded-lg border border-gray-100 p-6">
      <h2 className="text-lg font-semibold text-slate-800 mb-4">Channel Performance</h2>
      <div className="space-y-4">
        {Object.entries(data.channels).map(([channel, percentage]) => {
          const channelNames = {
            onPremise: 'On-Premise',
            offPremise: 'Off-Premise',
            eCommerce: 'E-Commerce',
            travelRetail: 'Travel Retail',
          };
          return (
            <div key={channel}>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium text-slate-800">{channelNames[channel]}</span>
                <span className="text-sm font-bold text-slate-800">{percentage}%</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-slate-700 to-slate-600 rounded-full"
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>

    {/* Leading Brands */}
    <div className="bg-white rounded-lg border border-gray-100 p-6">
      <h2 className="text-lg font-semibold text-slate-800 mb-4">Leading Brands</h2>
      <div className="flex flex-wrap gap-2">
        {data.topBrands.map((brand, idx) => (
          <span
            key={idx}
            className="bg-slate-100 text-slate-800 px-4 py-2 rounded-full text-sm font-medium"
          >
            {brand}
          </span>
        ))}
      </div>
    </div>

    {/* Trend Insights */}
    <div className="bg-white rounded-lg border border-gray-100 p-6">
      <h2 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
        <TrendingUp size={20} />
        Trend Insights
      </h2>
      <ol className="space-y-4">
        {data.trends.map((trend, idx) => (
          <li key={idx} className="flex gap-4">
            <div className="flex-shrink-0 w-7 h-7 bg-slate-100 rounded-full flex items-center justify-center">
              <span className="text-xs font-bold text-slate-800">{idx + 1}</span>
            </div>
            <div className="flex-1 pt-0.5">
              <p className="text-sm text-gray-700 mb-2">{trend.text}</p>
              <SourceLink source={trend.source} url={trend.url} />
            </div>
          </li>
        ))}
      </ol>
    </div>

    {/* Yearly Reports */}
    <YearlyReports reports={data.yearlyReports} />

    {/* Regulatory Landscape */}
    <RegulatoryLandscape regulatory={data.regulatory} />

    {/* Trade Flows */}
    <TradeFlows importExport={data.importExport} />
  </div>
);

// Main Component
export default function GeographicIntelligence() {
  const [activeRegion, setActiveRegion] = useState('us');
  const currentRegion = REGIONS.find((r) => r.key === activeRegion);
  const currentData = REGION_DATA[activeRegion];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Globe size={32} className="text-slate-800" />
            <h1 className="text-4xl font-bold text-slate-800">Geographic Intelligence</h1>
          </div>
          <p className="text-gray-600">
            Liquid economy market insights across key regions worldwide
          </p>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-12 gap-6">
          {/* Sidebar */}
          <div className="col-span-3">
            <div className="sticky top-8 space-y-3">
              {REGIONS.map((region) => (
                <RegionCard
                  key={region.key}
                  region={region}
                  isActive={activeRegion === region.key}
                  onClick={() => setActiveRegion(region.key)}
                />
              ))}
            </div>
          </div>

          {/* Detail Panel */}
          <div className="col-span-9">
            <RegionDetail region={currentRegion} data={currentData} />
          </div>
        </div>
      </div>
    </div>
  );
}
