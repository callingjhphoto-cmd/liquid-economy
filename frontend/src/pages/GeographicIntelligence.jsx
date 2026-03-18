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
  Briefcase,
  DollarSign,
  Building2,
  Target,
  AlertTriangle,
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
  {
    key: 'india',
    name: 'India',
    flag: '\ud83c\uddee\ud83c\uddf3',
    source: 'Nielsen, Euromonitor India',
    summary: 'Fastest-growing spirits market with rising aspirational consumers and regulatory complexity.',
    trajectory: 'Double-digit growth driven by premiumization and first-time drinkers in urban centers.',
  },
  {
    key: 'japan',
    name: 'Japan',
    flag: '\ud83c\uddef\ud83c\uddf5',
    source: 'IWSR Japan, Drinks Business',
    summary: 'Mature market with strong heritage brands and growing craft spirits segment.',
    trajectory: 'Premiumization and experiential consumption driving category evolution.',
  },
  {
    key: 'brazil',
    name: 'Brazil',
    flag: '\ud83c\udde7\ud83c\uddf7',
    source: 'Euromonitor, ABDI Brasil',
    summary: 'Latin America\'s largest market with cachaca dominance and growing imported spirits.',
    trajectory: 'Rising middle class and e-commerce adoption accelerating premium category growth.',
  },
  {
    key: 'australia',
    name: 'Australia',
    flag: '\ud83c\udde6\ud83c\uddfa',
    source: 'IWSR, Australian Beverages Council',
    summary: 'Affluent market with strong on-premise culture and sustainability consciousness.',
    trajectory: 'Premium gin and whisky expansion driven by experiential consumption trends.',
  },
  {
    key: 'seasia',
    name: 'Southeast Asia',
    flag: '\ud83c\uddf8\ud83c\uddec',
    source: 'Euromonitor, ASEAN Spirits Federation',
    summary: 'High-growth emerging markets with diverse consumption patterns and travel retail significance.',
    trajectory: 'Rising incomes and tourism driving premium spirits and travel retail expansion.',
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
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
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


// MarketEntryAnalysis Component
const MarketEntryAnalysis = ({ entry }) => (
  <div className="bg-white rounded-lg border border-gray-100 p-6">
    <h2 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
      <Briefcase size={20} />
      Market Entry Analysis
    </h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      <div>
        <p className="text-xs font-semibold text-gray-600 uppercase mb-2">Barriers to Entry</p>
        <p className="text-sm text-gray-700 mb-4">{entry.barriers}</p>
        <p className="text-xs font-semibold text-gray-600 uppercase mb-2">Minimum Investment</p>
        <p className="text-sm font-semibold text-slate-800 mb-4">{entry.minInvestment}</p>
        <p className="text-xs font-semibold text-gray-600 uppercase mb-2">Time to Market</p>
        <p className="text-sm text-slate-800 font-medium">{entry.timeToMarket}</p>
      </div>
      <div>
        <p className="text-xs font-semibold text-gray-600 uppercase mb-3">Key Partners</p>
        <div className="space-y-2 mb-4">
          {entry.keyPartners.map((partner, idx) => (
            <div key={idx} className="flex items-start gap-2">
              <Users size={14} className="text-slate-600 mt-1 flex-shrink-0" />
              <span className="text-sm text-gray-700">{partner}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
    <div className="mt-4 p-4 bg-blue-50 border border-blue-100 rounded-lg">
      <p className="text-sm text-blue-900">{entry.advice}</p>
    </div>
  </div>
);

// DutyTariffTable Component
const DutyTariffTable = ({ duties }) => (
  <div className="bg-white rounded-lg border border-gray-100 p-6">
    <h2 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
      <AlertTriangle size={20} />
      Duty & Tariff Structure
    </h2>
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-200">
            <th className="text-left py-3 px-4 font-semibold text-gray-700">Category</th>
            <th className="text-left py-3 px-4 font-semibold text-gray-700">Duty Rate</th>
            <th className="text-left py-3 px-4 font-semibold text-gray-700">Notes</th>
          </tr>
        </thead>
        <tbody>
          {duties.map((duty, idx) => (
            <tr key={idx} className="border-b border-gray-50 hover:bg-gray-50">
              <td className="py-3 px-4 text-slate-800 font-medium">{duty.category}</td>
              <td className="py-3 px-4 text-slate-800 font-bold">{duty.rate}</td>
              <td className="py-3 px-4 text-gray-600">{duty.notes}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

// DistributorLandscape Component
const DistributorLandscape = ({ distributors }) => (
  <div className="bg-white rounded-lg border border-gray-100 p-6">
    <h2 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
      <Building2 size={20} />
      Distributor Landscape
    </h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {distributors.map((dist, idx) => (
        <div key={idx} className="border border-gray-200 rounded-lg p-4">
          <p className="font-semibold text-slate-800">{dist.name}</p>
          <p className="text-xs text-gray-600 mt-1">{dist.type}</p>
          <div className="mt-3 space-y-2 text-sm">
            <div>
              <p className="text-xs font-semibold text-gray-600">Categories</p>
              <p className="text-gray-700">{dist.categories}</p>
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-600">Min. Volume</p>
              <p className="text-gray-700">{dist.minimumVolume}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

// CompetitiveEntry Component
const CompetitiveEntry = ({ competitive }) => (
  <div className="bg-white rounded-lg border border-gray-100 p-6">
    <h2 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
      <Target size={20} />
      Competitive Landscape
    </h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
      <div>
        <p className="text-xs font-semibold text-gray-600 uppercase mb-3">Ease of Entry</p>
        <div className="flex items-center gap-3">
          <div className="flex-1">
            <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-500 to-blue-600"
                style={{ width: `${(competitive.easeOfEntry / 10) * 100}%` }}
              />
            </div>
          </div>
          <span className="text-lg font-bold text-slate-800">{competitive.easeOfEntry}/10</span>
        </div>
      </div>
      <div>
        <p className="text-xs font-semibold text-gray-600 uppercase mb-3">Premium Opportunity</p>
        <div className="flex items-center gap-3">
          <div className="flex-1">
            <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-green-500 to-green-600"
                style={{ width: `${(competitive.premiumOpportunity / 10) * 100}%` }}
              />
            </div>
          </div>
          <span className="text-lg font-bold text-slate-800">{competitive.premiumOpportunity}/10</span>
        </div>
      </div>
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
      <div className="bg-gray-50 rounded-lg p-4">
        <p className="text-xs font-semibold text-gray-600 uppercase mb-2">Consolidation</p>
        <p className="text-sm text-gray-700">{competitive.consolidation}</p>
      </div>
      <div className="bg-gray-50 rounded-lg p-4">
        <p className="text-xs font-semibold text-gray-600 uppercase mb-2">Market Whitespace</p>
        <p className="text-sm text-gray-700">{competitive.whitespace}</p>
      </div>
    </div>
    <div className="bg-amber-50 border border-amber-100 rounded-lg p-4">
      <p className="text-sm text-amber-900"><strong>Strategic Recommendation:</strong> {competitive.recommendation}</p>
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
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

  india: {
    kpis: [
      { label: 'Market Size (2025)', value: '$7.2B', change: 18.5, changeDir: 'up' },
      { label: 'Volume Growth', value: '15.2%', change: 3.2, changeDir: 'up' },
      { label: 'Premium Penetration', value: '12%', change: 4.8, changeDir: 'up' },
      { label: 'Urban Market Share', value: '68%', change: 5.1, changeDir: 'up' },
      { label: 'On-Premise Value', value: '$2.8B', change: 22.3, changeDir: 'up' },
      { label: 'E-commerce Growth', value: '28.6%', change: 8.2, changeDir: 'up' },
    ],
    topBrands: ['Johnnie Walker', 'Diageo Prestige', 'Royal Salute', 'McDowell\'s Premium', 'Pernod'],
    channels: { onPremise: 45, offPremise: 42, eCommerce: 8, travelRetail: 5 },
    trends: [
      { text: 'Premiumization accelerating among affluent urban consumers', source: 'Nielsen India', url: 'https://www.nielsen.com' },
      { text: 'E-commerce emerging as fastest-growing channel for spirits', source: 'Euromonitor', url: 'https://www.euromonitor.com' },
      { text: 'Craft spirits and single-malts gaining traction in metro cities', source: 'Drinks Business Asia', url: 'https://www.drinksbusiness.com' },
      { text: 'Travel retail accounting for significant portion of premium imports', source: 'IWSR', url: 'https://iwsr.com' },
      { text: 'Health-conscious consumers driving non-alcoholic premium category', source: 'Statista India', url: 'https://www.statista.com' },
    ],
    yearlyReports: [
      { year: 2022, marketSize: '$4.8B', growth: 12.4, volumeCases: '28M', keyEvents: ['Post-pandemic recovery accelerating', 'E-commerce platforms emerging'], topPerformer: 'Premium imported whisky', outlook: 'Strong premiumization trend with younger affluent consumers' },
      { year: 2023, marketSize: '$5.9B', growth: 16.2, volumeCases: '32M', keyEvents: ['Regulatory clarity improving', 'E-commerce penetration rising'], topPerformer: 'Single-malt whisky segment', outlook: 'Premium category outpacing overall spirits growth significantly' },
      { year: 2024, marketSize: '$6.8B', growth: 17.1, volumeCases: '35M', keyEvents: ['Travel retail recovery complete', 'International brand entries accelerating'], topPerformer: 'Craft spirits and premium non-alcoholic', outlook: 'Continued strong growth with consolidation among premium players' },
      { year: 2025, marketSize: '$7.2B', growth: 18.5, volumeCases: '37M', keyEvents: ['Regulatory framework stabilizing', 'E-commerce platforms dominant for premium'], topPerformer: 'Ultra-premium and heritage brands', outlook: 'Market poised for continued double-digit growth through end of decade' },
    ],
    regulatory: [
      { aspect: 'Import Licensing', description: 'Requires Indian Importer License and state-specific permits. Process varies by state; can take 4-8 weeks.' },
      { aspect: 'Labeling & Packaging', description: 'Mandatory Hindi labeling; alcohol content declaration required. Local standards compliance necessary.' },
      { aspect: 'Advertising Restrictions', description: 'Strict restrictions on spirits advertising (no TV/radio); digital and print heavily regulated. No celebrity endorsements allowed.' },
    ],
    importExport: {
      topImports: [
        { country: 'Scotland', value: '\u00a340M', share: '38%' },
        { country: 'France', value: '\u00a318M', share: '22%' },
        { country: 'United States', value: '\u00a312M', share: '15%' },
        { country: 'Ireland', value: '\u00a38M', share: '12%' },
      ],
      topExports: [
        { country: 'Nepal', value: '\u20b92.5B', share: '35%' },
        { country: 'Bangladesh', value: '\u20b91.8B', share: '28%' },
        { country: 'Sri Lanka', value: '\u20b91.2B', share: '22%' },
        { country: 'Mauritius', value: '\u20b90.8B', share: '15%' },
      ],
    },
    marketEntry: { barriers: 'High - complex state-by-state regulations; significant import duties; local partnerships essential; compliance requirements stringent', minInvestment: '$2M-$4M', timeToMarket: '12-18 months', keyPartners: ['United Spirits Limited', 'Diageo India', 'Pernod Ricard India'], advice: 'State regulations vary dramatically - focus on key states (Maharashtra, Delhi, Goa, Karnataka). Premium positioning essential due to high tariffs making mass market unviable. On-premise (restaurants, bars, hotels) critical for brand building. Direct engagement with mixologists and hospitality venue managers crucial.' },
    dutyTariff: [
      { category: 'Imported Spirits', rate: '150%', notes: 'Highest in world; includes basic customs duty, additional duty, VAT' },
      { category: 'Wine (11-15% ABV)', rate: '100%', notes: 'Duty structure similar to spirits' },
      { category: 'Beer', rate: '100%', notes: 'Plus state-specific excise duties (up to 50%)' },
    ],
    distributorLandscape: [
      { name: 'United Spirits Limited', type: 'Market leader', categories: 'All premium spirits', minimumVolume: '2,000+ cases annually' },
      { name: 'Diageo India', type: 'Major multinational', categories: 'Spirits, wine, beer', minimumVolume: '1,500+ cases annually' },
      { name: 'Pernod Ricard India', type: 'Regional distributor', categories: 'Premium spirits & wine', minimumVolume: '1,000+ cases annually' },
      { name: 'FMCG India (State-based)', type: 'Local distributors', categories: 'All categories', minimumVolume: '500+ cases per state' },
    ],
    competitiveEntry: { easeOfEntry: 3, premiumOpportunity: 9, consolidation: 'Medium - fragmented by state regulations; premium segment less consolidated than value', whitespace: 'Super-premium and luxury positioning, craft spirits, and premium non-alcoholic alternatives. Single-malt whisky and premium gin gaining momentum.', recommendation: 'Ultra-premium positioning only viable given high tariff structure. Focus on Tier-1 metro markets and aspirational drinkers in upscale establishments. Partnership with established Indian importer essential for regulatory navigation. Direct engagement with premium hospitality venues critical for market awareness.' },
  },
  japan: {
    kpis: [
      { label: 'Market Size (2025)', value: '$18.4B', change: 2.8, changeDir: 'up' },
      { label: 'Volume Growth', value: '0.6%', change: 0.3, changeDir: 'flat' },
      { label: 'Premium Share', value: '42%', change: 3.5, changeDir: 'up' },
      { label: 'Craft Spirits Growth', value: '9.2%', change: 2.1, changeDir: 'up' },
      { label: 'On-Premise Value', value: '$7.2B', change: 4.2, changeDir: 'up' },
      { label: 'Whisky Premiumization', value: '15.8%', change: 5.4, changeDir: 'up' },
    ],
    topBrands: ['Yamazaki', 'Hibiki', 'Suntory Chief', 'Kirin Ichiban', 'Asahi Super Dry'],
    channels: { onPremise: 44, offPremise: 38, eCommerce: 12, travelRetail: 6 },
    trends: [
      { text: 'Japanese single-malt whisky commanding global premiums', source: 'IWSR', url: 'https://iwsr.com' },
      { text: 'Craft gin and shochu innovation driving premiumization', source: 'Drinks Business Asia', url: 'https://www.drinksbusiness.com' },
      { text: 'E-commerce penetration accelerating in premium segment', source: 'Nielsen Japan', url: 'https://www.nielsen.com' },
      { text: 'Bartender-led recommendations shaping consumer preferences', source: 'The Spirits Business', url: 'https://www.thespirits.com' },
      { text: 'Non-alcoholic spirits gaining traction among younger consumers', source: 'Euromonitor', url: 'https://www.euromonitor.com' },
    ],
    yearlyReports: [
      { year: 2022, marketSize: '$17.3B', growth: 1.2, volumeCases: '42M', keyEvents: ['Whisky scarcity supporting premiums', 'On-premise recovery strong post-pandemic'], topPerformer: 'Single-malt whisky premium segment', outlook: 'Premiumization offsetting declining volume; mature market dynamics' },
      { year: 2023, marketSize: '$17.8B', growth: 2.5, volumeCases: '41M', keyEvents: ['Craft spirits innovation accelerating', 'E-commerce growth emerging'], topPerformer: 'Craft gin and premium non-alcoholic', outlook: 'Value growth from premiumization; volume stagnation continuing' },
      { year: 2024, marketSize: '$18.0B', growth: 2.6, volumeCases: '40M', keyEvents: ['International whisky competition increasing', 'Hospitality recovery plateauing'], topPerformer: 'Imported premium spirits', outlook: 'Moderate growth with shift toward experiential and craft categories' },
      { year: 2025, marketSize: '$18.4B', growth: 2.8, volumeCases: '40M', keyEvents: ['Premium positioning becoming essential', 'International brand penetration rising'], topPerformer: 'Ultra-premium and heritage brand positioning', outlook: 'Continued premiumization with selective innovation in craft segments' },
    ],
    regulatory: [
      { aspect: 'Import Licensing', description: 'Straightforward process through established importers. Standard tariff regime; no unusual restrictions.' },
      { aspect: 'Labeling Requirements', description: 'Bilingual labeling required (Japanese and English). Alcohol content and origin must be clearly stated.' },
      { aspect: 'Advertising Standards', description: 'Self-regulated through industry bodies; responsible drinking messaging expected. TV advertising regulated but not prohibited.' },
    ],
    importExport: {
      topImports: [
        { country: 'Scotland', value: '\u00a5\u0034\u0035\u0042', share: '42%' },
        { country: 'United States', value: '\u00a5\u0034\u0030\u0042', share: '28%' },
        { country: 'France', value: '\u00a5\u0032\u0035\u0042', share: '18%' },
        { country: 'Ireland', value: '\u00a5\u0031\u0030\u0042', share: '12%' },
      ],
      topExports: [
        { country: 'South Korea', value: 'KRW 9.2B', share: '34%' },
        { country: 'China', value: 'CNY 7.1B', share: '28%' },
        { country: 'Singapore', value: 'SGD 4.5B', share: '22%' },
        { country: 'United States', value: 'USD 3.2B', share: '16%' },
      ],
    },
    marketEntry: { barriers: 'Moderate - established relationships important; regulatory environment straightforward; complex distribution system; strong consumer brand loyalty', minInvestment: '$1.5M-$3M', timeToMarket: '10-15 months', keyPartners: ['Asahi Drink Placer', 'Kirin Company Ltd', 'Suntory Distribution Ltd'], advice: 'On-premise channel (bars, restaurants, izakayas) critical - Japanese consumers value bartender recommendations. Premium and craft positioning strong. E-commerce growing rapidly. Quality and craftsmanship messaging resonates with Japanese consumers. Limited brand awareness requires significant on-ground activation.' },
    dutyTariff: [
      { category: 'Imported Spirits (Over 15% ABV)', rate: '20%', notes: 'Plus 10% consumption tax' },
      { category: 'Wine (11-15% ABV)', rate: '15%', notes: 'Lower rate than spirits; consumption tax applies' },
      { category: 'Beer', rate: '15%', notes: 'Beer/happoshu rates vary by ABV' },
    ],
    distributorLandscape: [
      { name: 'Asahi Drink Placer', type: 'Kirin affiliate distributor', categories: 'All categories', minimumVolume: '1,200+ cases annually' },
      { name: 'Kirin Company Ltd', type: 'Market leader', categories: 'All categories', minimumVolume: '2,000+ cases annually' },
      { name: 'Suntory Distribution Ltd', type: 'Suntory affiliate', categories: 'All categories', minimumVolume: '1,500+ cases annually' },
      { name: 'Hinode Sake Corporation', type: 'Premium specialist', categories: 'Premium spirits & wine', minimumVolume: '500+ cases annually' },
    ],
    competitiveEntry: { easeOfEntry: 5, premiumOpportunity: 8, consolidation: 'Very High - Kirin and Suntory control ~70% of market; significant barriers to direct distribution', whitespace: 'Craft spirits, premium non-alcoholic beverages, and heritage/artisanal positioning. Western craft whisky and gin gaining traction.', recommendation: 'Partner with established distributor (Asahi, Kirin, or Suntory) essential - direct distribution difficult. Premium and craft positioning strongest entry points. Build presence through on-premise channel (bars, upscale restaurants) with bartender engagement. E-commerce growth offers complementary channel. Strong storytelling and heritage messaging critical.' },
  },
  brazil: {
    kpis: [
      { label: 'Market Size (2025)', value: '$11.5B', change: 8.3, changeDir: 'up' },
      { label: 'Volume Growth', value: '5.2%', change: 1.8, changeDir: 'up' },
      { label: 'Premium Penetration', value: '28%', change: 4.1, changeDir: 'up' },
      { label: 'Imported Spirits Share', value: '22%', change: 5.6, changeDir: 'up' },
      { label: 'On-Premise Value', value: '$4.2B', change: 12.4, changeDir: 'up' },
      { label: 'E-commerce Growth', value: '18.2%', change: 6.7, changeDir: 'up' },
    ],
    topBrands: ['Johnnie Walker', 'Hennessy', 'Grey Goose', 'Ypioca Cach\u00e9a', 'Pitu Cach\u00e9a'],
    channels: { onPremise: 42, offPremise: 40, eCommerce: 13, travelRetail: 5 },
    trends: [
      { text: 'Premium imported spirits gaining share vs. traditional cachaca', source: 'Euromonitor', url: 'https://www.euromonitor.com' },
      { text: 'E-commerce and digital channels accelerating for spirits category', source: 'Nielsen Brasil', url: 'https://www.nielsen.com' },
      { text: 'Craft cocktail culture emerging in major metropolitan areas', source: 'Drinks Business Latin America', url: 'https://www.drinksbusiness.com' },
      { text: 'Sustainability and ethical sourcing resonating with younger consumers', source: 'IWSR', url: 'https://iwsr.com' },
      { text: 'Travel retail expanding rapidly with airport privatization', source: 'Statista Brasil', url: 'https://www.statista.com' },
    ],
    yearlyReports: [
      { year: 2022, marketSize: '$10.1B', growth: 4.8, volumeCases: '126M', keyEvents: ['Economic recovery driving consumption', 'E-commerce adoption accelerating'], topPerformer: 'Premium imported whisky and vodka', outlook: 'Strong growth in premium segments offsetting value market pressure' },
      { year: 2023, marketSize: '$10.6B', growth: 6.2, volumeCases: '130M', keyEvents: ['Currency stabilization supporting imports', 'Nightlife and hospitality recovering'], topPerformer: 'Craft spirits and premium mixers', outlook: 'Accelerating premiumization trend with urban market leadership' },
      { year: 2024, marketSize: '$11.0B', growth: 7.8, volumeCases: '133M', keyEvents: ['International brand entries increasing', 'E-commerce platform consolidation'], topPerformer: 'Ultra-premium and heritage positioning', outlook: 'Continued strong growth driven by affluent consumer premiumization' },
      { year: 2025, marketSize: '$11.5B', growth: 8.3, volumeCases: '136M', keyEvents: ['Travel retail recovery complete', 'Sustainability messaging gaining traction'], topPerformer: 'Craft and sustainable positioning brands', outlook: 'Market poised for continued strong growth with premium category expansion' },
    ],
    regulatory: [
      { aspect: 'Import Licensing', description: 'Requires CISQ (Conselho Interministerial de Pre\u00e7os de Bebidas Alco\u00f3licas) approval. Standard 4-8 week process for most categories.' },
      { aspect: 'Labeling & Compliance', description: 'Portuguese language labeling mandatory. Content declaration, origin, and health warnings required. Local standards certification necessary.' },
      { aspect: 'Taxation Structure', description: 'ICMS tax varies by state (7-18%); IPI (Imposto sobre Produtos Industrializados) also applies. Complex structure requires local expertise.' },
    ],
    importExport: {
      topImports: [
        { country: 'United States', value: 'R$120M', share: '32%' },
        { country: 'France', value: 'R$95M', share: '28%' },
        { country: 'Scotland', value: 'R$68M', share: '22%' },
        { country: 'Mexico', value: 'R$45M', share: '18%' },
      ],
      topExports: [
        { country: 'Paraguay', value: 'R$85M', share: '30%' },
        { country: 'United States', value: 'R$72M', share: '28%' },
        { country: 'Japan', value: 'R$48M', share: '22%' },
        { country: 'Germany', value: 'R$35M', share: '20%' },
      ],
    },
    marketEntry: { barriers: 'Moderate - regulatory environment becoming clearer; established distribution networks strong in key regions; tax structures can be complex', minInvestment: '$1.8M-$3.5M', timeToMarket: '11-16 months', keyPartners: ['Inbra (Brazilian Spirits Association)', 'Diageo Brasil', 'Pernod Ricard Brasil'], advice: 'Cach aça dominance requires differentiation through imported premium positioning. São Paulo and Rio de Janeiro are critical markets. Travel retail and e-commerce growing rapidly. On-premise channel (bars, nightclubs) important for brand visibility. Social media and influencer marketing effective for reaching younger consumers.' },
    dutyTariff: [
      { category: 'Imported Spirits', rate: '20%', notes: 'Plus ICMS state tax (7-18% depending on state)' },
      { category: 'Wine', rate: '27%', notes: 'Higher rate reflects import policy; ICMS additional' },
      { category: 'Beer', rate: '15%', notes: 'Lower rate; ICMS also applies' },
    ],
    distributorLandscape: [
      { name: 'Diageo Brasil', type: 'Market leader', categories: 'Premium spirits & wine', minimumVolume: '2,000+ cases annually' },
      { name: 'Pernod Ricard Brasil', type: 'Major distributor', categories: 'All categories', minimumVolume: '1,500+ cases annually' },
      { name: 'Premium Trade Brasil', type: 'Premium specialist', categories: 'Imported spirits & wine', minimumVolume: '800+ cases annually' },
      { name: 'Regional distributors (São Paulo, Rio)', type: 'Local specialists', categories: 'All categories', minimumVolume: '500+ cases annually' },
    ],
    competitiveEntry: { easeOfEntry: 6, premiumOpportunity: 8, consolidation: 'High - Diageo and Pernod Ricard control ~50% of spirits market; cachaca market fragmented', whitespace: 'Premium imported spirits, craft cocktails, and non-alcoholic premium beverages. Sustainability and social responsibility positioning strong.', recommendation: 'Differentiate through premium imported positioning (compete with, not against, cachaca). Focus on São Paulo and Rio initially - largest market opportunity. On-premise channel (nightclubs, upscale restaurants, hotel bars) critical for brand building. E-commerce and travel retail growing rapidly. Partner with established distributor for market penetration.' },
  },
  australia: {
    kpis: [
      { label: 'Market Size (2025)', value: '$8.9B', change: 5.4, changeDir: 'up' },
      { label: 'Volume Growth', value: '2.1%', change: 0.8, changeDir: 'up' },
      { label: 'Premium Spirits Growth', value: '8.6%', change: 3.2, changeDir: 'up' },
      { label: 'Craft Gin Segment', value: '12.4%', change: 4.8, changeDir: 'up' },
      { label: 'On-Premise Value', value: '$3.5B', change: 7.2, changeDir: 'up' },
      { label: 'E-commerce Penetration', value: '11%', change: 3.5, changeDir: 'up' },
    ],
    topBrands: ['Johnnie Walker', 'Jack Daniel\'s', 'Bundaberg Rum', 'Tanqueray', 'Jim Beam'],
    channels: { onPremise: 46, offPremise: 37, eCommerce: 11, travelRetail: 6 },
    trends: [
      { text: 'Craft gin and premium whisky segment growing 10%+ annually', source: 'IWSR', url: 'https://iwsr.com' },
      { text: 'Sustainability and ethical production driving premiumization', source: 'Nielsen Australia', url: 'https://www.nielsen.com' },
      { text: 'Bartender-led innovation shaping on-premise category evolution', source: 'Drinks Business Australia', url: 'https://www.drinksbusiness.com' },
      { text: 'E-commerce and specialty retailers gaining significant market share', source: 'Euromonitor', url: 'https://www.euromonitor.com' },
      { text: 'Experiential consumption driving growth in premium venues and events', source: 'IWSR', url: 'https://iwsr.com' },
    ],
    yearlyReports: [
      { year: 2022, marketSize: '$7.9B', growth: 3.2, volumeCases: '72M', keyEvents: ['On-premise recovery post-lockdowns', 'E-commerce adoption accelerating'], topPerformer: 'Premium gin and craft spirits', outlook: 'Strong premiumization with on-premise driving value growth' },
      { year: 2023, marketSize: '$8.2B', growth: 4.1, volumeCases: '73M', keyEvents: ['Experiential venues gaining popularity', 'Craft spirits consolidation beginning'], topPerformer: 'Ultra-premium and limited-edition releases', outlook: 'Continued premiumization trend with sustainability messaging' },
      { year: 2024, marketSize: '$8.6B', growth: 5.0, volumeCases: '74M', keyEvents: ['E-commerce platform consolidation', 'Premium positioning becoming mainstream'], topPerformer: 'Sustainable and artisanal brand positioning', outlook: 'Strong growth in premium with craft segment maturation' },
      { year: 2025, marketSize: '$8.9B', growth: 5.4, volumeCases: '75M', keyEvents: ['International brand entries accelerating', 'Specialty retailers growing rapidly'], topPerformer: 'Heritage and craft-focused positioning brands', outlook: 'Market poised for sustained premium-led growth through 2030' },
    ],
    regulatory: [
      { aspect: 'Import & Customs', description: 'Straightforward process through Australian Customs. Standard tariffs apply; limited restrictions on spirits categories.' },
      { aspect: 'Labeling Requirements', description: 'English language labeling mandatory. Alcohol content, origin, and health warnings required. Local standards compliance necessary.' },
      { aspect: 'Marketing Regulations', description: 'Self-regulated industry codes; responsible drinking messaging expected. Television advertising restricted to late evening slots.' },
    ],
    importExport: {
      topImports: [
        { country: 'Scotland', value: 'A$85M', share: '38%' },
        { country: 'United States', value: 'A$62M', share: '28%' },
        { country: 'France', value: 'A$48M', share: '22%' },
        { country: 'Ireland', value: 'A$28M', share: '12%' },
      ],
      topExports: [
        { country: 'China', value: 'A$115M', share: '42%' },
        { country: 'United States', value: 'A$78M', share: '32%' },
        { country: 'Singapore', value: 'A$38M', share: '18%' },
        { country: 'Japan', value: 'A$22M', share: '8%' },
      ],
    },
    marketEntry: { barriers: 'Moderate - regulatory environment clear; strong on-premise culture; established retail networks; premium spirits growing category', minInvestment: '$1.2M-$2.5M', timeToMarket: '9-12 months', keyPartners: ['Pernod Ricard Australia', 'Diageo Australia', 'Allied Beverages Australia'], advice: 'Premium gin and whisky strong growth categories. On-premise channel (bars, restaurants, pubs) critical entry point - bartenders highly influential. Craft positioning resonates with affluent Australian consumers. Sustainability and ethical production messaging strong. Major cities (Sydney, Melbourne) drive 70%+ of volume.' },
    dutyTariff: [
      { category: 'Imported Spirits', rate: '37%', notes: 'Excise duty; GST 10% applied post-duty' },
      { category: 'Wine', rate: '29%', notes: 'Lower rate than spirits; GST additional' },
      { category: 'Beer', rate: 'AUD $41.18 per liter pure alcohol', notes: 'Volume-based; GST applies' },
    ],
    distributorLandscape: [
      { name: 'Pernod Ricard Australia', type: 'Market leader', categories: 'All categories', minimumVolume: '1,500+ cases annually' },
      { name: 'Diageo Australia', type: 'Major distributor', categories: 'Premium spirits & wine', minimumVolume: '1,200+ cases annually' },
      { name: 'Allied Beverages Australia', type: 'Premium specialist', categories: 'Craft & premium spirits', minimumVolume: '800+ cases annually' },
      { name: 'Craft Beverage Distributors', type: 'Independent distributors', categories: 'Craft spirits', minimumVolume: '300+ cases annually' },
    ],
    competitiveEntry: { easeOfEntry: 6, premiumOpportunity: 8, consolidation: 'High - major multinationals control ~60% of market; craft/independent segment growing', whitespace: 'Craft spirits, sustainable/organic positioning, premium non-alcoholic beverages. Single-origin and limited-edition offerings gaining momentum.', recommendation: 'Premium and craft positioning strongest entry points. Build relationships with bartenders and mixologists in Sydney and Melbourne - critical for brand awareness. On-premise channel (bars, upscale restaurants) essential for market entry. Sustainability messaging resonates strongly. E-commerce growing but less dominant than physical retail.' },
  },
  seasia: {
    kpis: [
      { label: 'Market Size (2025)', value: '$14.2B', change: 12.5, changeDir: 'up' },
      { label: 'Volume Growth', value: '8.9%', change: 2.4, changeDir: 'up' },
      { label: 'Premium Penetration', value: '18%', change: 4.6, changeDir: 'up' },
      { label: 'Travel Retail Share', value: '22%', change: 6.8, changeDir: 'up' },
      { label: 'On-Premise Value', value: '$5.8B', change: 15.3, changeDir: 'up' },
      { label: 'E-commerce Growth', value: '21.3%', change: 7.2, changeDir: 'up' },
    ],
    topBrands: ['Johnnie Walker', 'Hennessy', 'Jack Daniel\'s', 'Chivas Regal', 'Tanqueray'],
    channels: { onPremise: 43, offPremise: 25, eCommerce: 10, travelRetail: 22 },
    trends: [
      { text: 'Travel retail accounting for majority of premium spirits growth', source: 'IWSR', url: 'https://iwsr.com' },
      { text: 'Rising middle class in emerging SE Asian markets driving premiumization', source: 'Euromonitor', url: 'https://www.euromonitor.com' },
      { text: 'E-commerce platforms (Lazada, Shopee) transforming distribution landscape', source: 'Nielsen Southeast Asia', url: 'https://www.nielsen.com' },
      { text: 'Craft cocktail bars and premium nightlife emerging in tier-1 cities', source: 'Drinks Business Asia', url: 'https://www.drinksbusiness.com' },
      { text: 'Functional and low/no alcohol spirits gaining traction among younger drinkers', source: 'IWSR', url: 'https://iwsr.com' },
    ],
    yearlyReports: [
      { year: 2022, marketSize: '$11.8B', growth: 8.2, volumeCases: '156M', keyEvents: ['Travel retail recovery beginning', 'E-commerce adoption accelerating post-pandemic'], topPerformer: 'Premium imported spirits in travel retail', outlook: 'Strong growth led by premium positioning and travel retail expansion' },
      { year: 2023, marketSize: '$12.5B', growth: 10.1, volumeCases: '161M', keyEvents: ['E-commerce platforms consolidating', 'On-premise recovery strong in tier-1 cities'], topPerformer: 'Craft spirits and premium non-alcoholic', outlook: 'Accelerating premiumization with travel retail and digital dominance' },
      { year: 2024, marketSize: '$13.3B', growth: 11.8, volumeCases: '166M', keyEvents: ['International brand entries increasing', 'Regional consolidation beginning'], topPerformer: 'Ultra-premium and heritage brand positioning', outlook: 'Continued strong growth with market consolidation among multinationals' },
      { year: 2025, marketSize: '$14.2B', growth: 12.5, volumeCases: '171M', keyEvents: ['Premium category acceleration', 'Functional spirits emerging as growth driver'], topPerformer: 'Sustainable and artisanal brand positioning', outlook: 'Market poised for continued double-digit growth through end of decade' },
    ],
    regulatory: [
      { aspect: 'Import Regulations', description: 'Varies by country; Singapore most permissive, Indonesia most restrictive. Country-specific licensing required; 4-12 weeks typical.' },
      { aspect: 'Labeling & Compliance', description: 'Local language labeling varies by country. English accepted in Singapore/Thailand. Origin and content declaration mandatory.' },
      { aspect: 'Advertising & Marketing', description: 'Restrictions vary significantly; Thailand and Indonesia most regulated. Digital marketing and influencer partnerships increasingly used.' },
    ],
    importExport: {
      topImports: [
        { country: 'United Kingdom/Scotland', value: '$125M', share: '36%' },
        { country: 'United States', value: '$88M', share: '28%' },
        { country: 'France', value: '$68M', share: '22%' },
        { country: 'India', value: '$35M', share: '14%' },
      ],
      topExports: [
        { country: 'Australia', value: '$82M', share: '32%' },
        { country: 'United States', value: '$65M', share: '28%' },
        { country: 'Japan', value: '$48M', share: '22%' },
        { country: 'China', value: '$38M', share: '18%' },
      ],
    },
    marketEntry: { barriers: 'High - regulatory environment varies by country; import restrictions in some markets; complex tariff structures; travel retail critical', minInvestment: '$2M-$4M', timeToMarket: '14-18 months', keyPartners: ['Diageo Southeast Asia', 'Pernod Ricard Southeast Asia', 'National distributors (varies by country)'], advice: 'Market is highly fragmented across 6+ countries with different regulations. Travel retail (airports, duty-free) essential channel - significant revenue driver. Focus on Tier-1 markets (Singapore, Thailand, Vietnam, Philippines) initially. On-premise channel (hotels, nightclubs, premium restaurants) critical for brand building. Rising middle class driving premiumization.' },
    dutyTariff: [
      { category: 'Imported Spirits', rate: '30-100%', notes: 'Varies significantly by country; Singapore lowest, Indonesia highest' },
      { category: 'Wine', rate: '10-60%', notes: 'Some countries favor wine with lower rates' },
      { category: 'Beer', rate: '20-80%', notes: 'Highly variable; some countries restrict imports' },
    ],
    distributorLandscape: [
      { name: 'Diageo Southeast Asia', type: 'Regional leader', categories: 'All premium categories', minimumVolume: '2,000+ cases annually' },
      { name: 'Pernod Ricard Southeast Asia', type: 'Major distributor', categories: 'All categories', minimumVolume: '1,500+ cases annually' },
      { name: 'Country-specific distributors (SGP, THA, VN)', type: 'National market leaders', categories: 'All categories', minimumVolume: '1,000+ cases per country' },
      { name: 'Travel Retail Specialists', type: 'Duty-free focused', categories: 'Premium & luxury', minimumVolume: '500+ cases annually' },
    ],
    competitiveEntry: { easeOfEntry: 3, premiumOpportunity: 9, consolidation: 'Medium-High - varies by country; premium segment less consolidated than value. Rapid consolidation ongoing.', whitespace: 'Ultra-premium and luxury positioning, craft spirits, sustainable/ethical brands. Functional and non-alcoholic premium beverages gaining traction.', recommendation: 'Start with Singapore (clearest regulations, highest purchasing power) or Thailand (vibrant on-premise scene). Travel retail partnerships essential - major revenue driver. Premium/luxury positioning critical. Build relationships with hotel and hospitality chains in major cities. E-commerce platforms (Lazada, Shopee) offer complementary channel. Expand to adjacent markets after establishing strong presence.' },
  },

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

    {/* Market Entry Analysis */}
    {data.marketEntry && <MarketEntryAnalysis entry={data.marketEntry} />}

    {/* Duty & Tariff Structure */}
    {data.dutyTariff && <DutyTariffTable duties={data.dutyTariff} />}

    {/* Distributor Landscape */}
    {data.distributorLandscape && <DistributorLandscape distributors={data.distributorLandscape} />}

    {/* Competitive Entry */}
    {data.competitiveEntry && <CompetitiveEntry competitive={data.competitiveEntry} />}
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
