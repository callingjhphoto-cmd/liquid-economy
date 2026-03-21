/**
 * Report Builder data — template definitions, sections, widgets.
 */

export const REPORT_TEMPLATES = [
  {
    id: 'market-overview',
    label: 'Market Overview',
    description: 'Comprehensive snapshot of the global drinks market including category sizes, growth trends, and key movers.',
    icon: 'BarChart3',
    sections: ['Market Size & Growth', 'Category Breakdown', 'Regional Analysis', 'Key Trends'],
    estimatedPages: 8,
  },
  {
    id: 'category-deep-dive',
    label: 'Category Deep Dive',
    description: 'In-depth analysis of a single category covering brands, channels, markets, and competitive dynamics.',
    icon: 'Target',
    sections: ['Category Overview', 'Brand Landscape', 'Channel Split', 'Top Markets', 'Trends & Outlook'],
    estimatedPages: 12,
  },
  {
    id: 'competitive-analysis',
    label: 'Competitive Analysis',
    description: 'Competitor benchmarking with brand positioning, pricing strategy, market share, and SWOT analysis.',
    icon: 'Users',
    sections: ['Competitor Profiles', 'Market Share', 'Pricing Comparison', 'SWOT Analysis', 'Strategic Positioning'],
    estimatedPages: 10,
  },
  {
    id: 'market-entry-brief',
    label: 'Market Entry Brief',
    description: 'Go-to-market intelligence for a new brand entering a specific category and geography.',
    icon: 'Globe',
    sections: ['Market Sizing', 'Regulatory Requirements', 'Distribution Channels', 'Cost Analysis', 'Competitive Landscape', 'Recommendations'],
    estimatedPages: 15,
  },
]

export const AVAILABLE_CATEGORIES = [
  { key: 'tequila', label: 'Tequila & Mezcal' },
  { key: 'vodka', label: 'Vodka' },
  { key: 'gin', label: 'Gin' },
  { key: 'whisky', label: 'Whisky' },
  { key: 'rum', label: 'Rum' },
  { key: 'cognac', label: 'Cognac & Brandy' },
  { key: 'champagne', label: 'Champagne & Sparkling' },
  { key: 'wine', label: 'Wine (Still)' },
  { key: 'beer', label: 'Beer & Craft' },
  { key: 'nolo', label: 'No/Low Alcohol' },
  { key: 'rtd', label: 'RTD / Ready-to-Drink' },
]

export const AVAILABLE_MARKETS = [
  { key: 'us', label: 'United States' },
  { key: 'uk', label: 'United Kingdom' },
  { key: 'de', label: 'Germany' },
  { key: 'fr', label: 'France' },
  { key: 'es', label: 'Spain' },
  { key: 'jp', label: 'Japan' },
  { key: 'cn', label: 'China' },
  { key: 'in', label: 'India' },
  { key: 'mx', label: 'Mexico' },
  { key: 'br', label: 'Brazil' },
  { key: 'au', label: 'Australia' },
  { key: 'ae', label: 'UAE' },
  { key: 'sg', label: 'Singapore' },
  { key: 'ng', label: 'Nigeria' },
]

export const METRIC_OPTIONS = [
  { key: 'market-size', label: 'Market Size' },
  { key: 'growth-rate', label: 'Growth Rate' },
  { key: 'brand-share', label: 'Brand Market Share' },
  { key: 'channel-split', label: 'Channel Split' },
  { key: 'pricing-index', label: 'Pricing Index' },
  { key: 'volume-cases', label: 'Volume (Cases)' },
  { key: 'margin-analysis', label: 'Margin Analysis' },
  { key: 'trend-data', label: 'Trend Data' },
]

export const DATA_SOURCES = [
  { key: 'iwsr', label: 'IWSR', description: 'Global drinks market data' },
  { key: 'euromonitor', label: 'Euromonitor', description: 'Consumer market research' },
  { key: 'nielsen', label: 'NielsenIQ', description: 'Retail measurement data' },
  { key: 'cga', label: 'CGA by NIQ', description: 'On-trade measurement' },
  { key: 'statista', label: 'Statista', description: 'Statistics portal' },
  { key: 'drinks-intl', label: 'Drinks International', description: 'Industry publications' },
]

// Dashboard widgets available for 1-click export
export const DASHBOARD_WIDGETS = [
  { id: 'market-kpis', label: 'Market KPIs', icon: 'BarChart3', section: 'Market Overview', desc: '6 key performance indicators with sparklines' },
  { id: 'category-snapshot', label: 'Category Snapshot', icon: 'Globe', section: 'Market Overview', desc: '11 categories with channel splits' },
  { id: 'regional-pulse', label: 'Regional Pulse', icon: 'Globe', section: 'Market Overview', desc: '5 regions with growth trends' },
  { id: 'market-signals', label: 'Market Signals', icon: 'AlertTriangle', section: 'Arbitrage Signals', desc: 'M&A, regulation, trade alerts' },
  { id: 'ma-pipeline', label: 'M&A Pipeline', icon: 'Briefcase', section: 'Valuations', desc: 'Active deals & likelihood tracking' },
  { id: 'competitor-alerts', label: 'Competitor Alerts', icon: 'AlertTriangle', section: 'Arbitrage Signals', desc: 'Strategic competitive moves' },
  { id: 'opportunities', label: 'Strategic Opportunities', icon: 'Target', section: 'Valuations', desc: '6 investment opportunities' },
  { id: 'weekly-digest', label: 'Weekly Digest', icon: 'Calendar', section: 'Market Overview', desc: 'Top story + category moves + data points' },
  { id: 'benchmarks', label: 'Performance Benchmarks', icon: 'TrendingUp', section: 'Key Metrics', desc: '8 metrics vs industry quartiles' },
  { id: 'watchlist', label: 'Key Metrics Watchlist', icon: 'DollarSign', section: 'Key Metrics', desc: '4 pillars with 24 tracked metrics' },
  { id: 'live-feed', label: 'Live Intelligence Feed', icon: 'Package', section: 'Arbitrage Signals', desc: 'Real-time market intelligence items' },
]
