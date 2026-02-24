import React, { useState } from 'react'
import { Globe, MapPin, TrendingUp, TrendingDown, BarChart3, Wine, Beer, Martini } from 'lucide-react'

const REGIONS = {
  us: {
    name: 'United States',
    flag: '🇺🇸',
    source: 'USITC DataWeb / TTB Monthly Reports',
    summary: 'Spirits-led premiumization continues. RTD/seltzer category maturing after explosive growth. Tequila remains fastest-growing category.',
    metrics: [
      { label: 'Total Spirits Value', value: '$37.6B', change: '+3.2%' },
      { label: 'Tequila/Mezcal Growth', value: '+7.8%', change: 'vol.' },
      { label: 'RTD/Seltzer', value: '$11.2B', change: '+2.1%' },
      { label: 'Premium Wine (>$15)', value: '+4.1%', change: 'val.' },
      { label: 'Beer Volume', value: '-1.3%', change: 'YoY' },
      { label: 'No/Low Spirits', value: '+18%', change: 'vol.' },
    ],
    topBrands: ['Modelo Especial', "Tito's Vodka", 'Don Julio', 'Casamigos', 'Cutwater RTD'],
    channels: { 'On-premise': '+2.1%', 'Off-premise': '+1.4%', 'E-commerce': '+8.7%', 'Travel Retail': '+5.3%' },
  },
  uk: {
    name: 'United Kingdom',
    flag: '🇬🇧',
    source: 'HMRC Alcohol Bulletin / Companies House',
    summary: 'Gin category plateauing. Whisky resilient. No/low segment seeing massive recruitment. GLP-1 adoption impacting on-trade.',
    metrics: [
      { label: 'Total Duty Receipts', value: '£12.8B', change: '+1.8%' },
      { label: 'Gin Category', value: '£2.6B', change: '-0.4%' },
      { label: 'Scotch Whisky (domestic)', value: '+2.3%', change: 'vol.' },
      { label: 'No/Low Beer', value: '+22%', change: 'vol.' },
      { label: 'On-trade Recovery', value: '91%', change: 'of pre-COVID' },
      { label: 'GLP-1 Impact', value: '-23%', change: 'dining alcohol' },
    ],
    topBrands: ['Guinness', "Gordon's Gin", 'Johnnie Walker', "Hendrick's", 'Tanqueray 0.0'],
    channels: { 'On-premise': '-0.8%', 'Off-premise': '+2.2%', 'E-commerce': '+12.4%', 'Travel Retail': '+6.1%' },
  },
  eu: {
    name: 'Europe (EU27)',
    flag: '🇪🇺',
    source: 'Eurostat Comext Database',
    summary: 'Wine production severely impacted by climate. Aperitif/spritz culture driving Campari & Aperol growth. Eastern Europe spirits resilient.',
    metrics: [
      { label: 'Wine Production', value: '-16%', change: 'vs 5yr avg (France)' },
      { label: 'Aperitif Category', value: '+11.2%', change: 'val.' },
      { label: 'Champagne Market Share', value: '22%', change: 'stable' },
      { label: 'Carlsberg Premium Beer', value: '+5%', change: 'organic' },
      { label: 'Alcohol-Free Brews', value: '+4%', change: 'Carlsberg organic' },
      { label: 'EU PPWR Compliance', value: 'Aug 2026', change: 'deadline' },
    ],
    topBrands: ['Aperol', 'Moët & Chandon', 'Campari', 'Carlsberg', 'Heineken 0.0'],
    channels: { 'On-premise': '+1.4%', 'Off-premise': '+0.8%', 'E-commerce': '+15.2%', 'Travel Retail': '+4.7%' },
  },
  me: {
    name: 'Middle East & Africa',
    flag: '🇦🇪',
    source: 'Bayanat.ae / ZATCA Portal / Dubai Duty Free',
    summary: 'Rapidly expanding luxury hub. Dubai Duty Free shattered records. Saudi Vision 2030 creating massive new frontier for high-end hospitality.',
    metrics: [
      { label: 'Dubai Duty Free Sales', value: '$2.4B', change: '2025 record' },
      { label: 'Saudi Vision 2030 Zones', value: '~600', change: 'planned' },
      { label: 'Premium Spirits GTR', value: '+14.2%', change: 'val.' },
      { label: 'Champagne (GTR)', value: '+8.6%', change: 'vol.' },
      { label: 'Ultra-Premium Whisky', value: '+19%', change: 'val.' },
      { label: 'Luxury Hotel F&B', value: '+22%', change: 'spend per guest' },
    ],
    topBrands: ['Johnnie Walker Blue', 'Dom Pérignon', 'The Macallan', 'Hennessy XO', 'Moët Rosé'],
    channels: { 'Global Travel Retail': '+14.2%', 'Hotel & Resort': '+22%', 'Licensed Venues': '+8.4%', 'Private Members': '+18%' },
  },
  cn: {
    name: 'China',
    flag: '🇨🇳',
    source: 'GACC Portal / Corporate Filings',
    summary: 'Baijiu dominates domestically at $111B. Imported whisky surging. US/China tariff tensions impacting cognac severely.',
    metrics: [
      { label: 'Baijiu Market', value: '$111B', change: 'dominant' },
      { label: 'Imported Whisky', value: '+18%', change: 'vol.' },
      { label: 'Cognac Imports', value: '-22%', change: 'tariff impact' },
      { label: 'Domestic Wine', value: '-8%', change: 'vol.' },
      { label: 'RTD/Pre-mixed', value: '+31%', change: 'vol.' },
      { label: 'E-commerce Alcohol', value: '+24%', change: 'val.' },
    ],
    topBrands: ['Moutai (Kweichow)', 'Wuliangye', 'Hennessy', 'Macallan', 'Johnnie Walker'],
    channels: { 'On-premise': '-2.1%', 'Off-premise': '+1.8%', 'E-commerce': '+24%', 'Travel Retail': '+6.8%' },
  },
}

function RegionCard({ region, isActive, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left p-4 rounded-xl border transition-all ${isActive ? 'bg-navy text-white border-navy shadow-lg' : 'bg-white border-gray-100 hover:border-gray-200 hover:shadow-sm'}`}
    >
      <div className="flex items-center gap-3">
        <span className="text-2xl">{region.flag}</span>
        <div>
          <div className={`font-semibold text-sm ${isActive ? 'text-white' : 'text-navy'}`}>{region.name}</div>
          <div className={`text-xs ${isActive ? 'text-gray-300' : 'text-gray-400'}`}>{region.source}</div>
        </div>
      </div>
    </button>
  )
}

export default function GeographicIntelligence() {
  const [activeRegion, setActiveRegion] = useState('us')
  const region = REGIONS[activeRegion]

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-display font-bold text-navy">Geographic Intelligence</h1>
        <p className="text-gray-400 text-sm mt-1">Category performance, channel dynamics, and market intelligence by region</p>
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* Region Selector */}
        <div className="col-span-3 space-y-2">
          {Object.entries(REGIONS).map(([key, r]) => (
            <RegionCard key={key} region={r} isActive={activeRegion === key} onClick={() => setActiveRegion(key)} />
          ))}
        </div>

        {/* Region Detail */}
        <div className="col-span-9">
          <div className="bg-white rounded-xl border border-gray-100 p-6 mb-4">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-3xl">{region.flag}</span>
              <div>
                <h2 className="text-xl font-display font-bold text-navy">{region.name}</h2>
                <p className="text-xs text-gray-400">{region.source}</p>
              </div>
            </div>
            <p className="text-sm text-gray-600 mb-4">{region.summary}</p>

            {/* Key Metrics Grid */}
            <div className="grid grid-cols-3 gap-3 mb-6">
              {region.metrics.map((m, i) => (
                <div key={i} className="bg-gray-50 rounded-lg p-3">
                  <div className="text-xs text-gray-400 mb-1">{m.label}</div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-lg font-bold text-navy">{m.value}</span>
                    <span className={`text-xs font-medium ${m.change.startsWith('+') ? 'text-green-600' : m.change.startsWith('-') ? 'text-red-600' : 'text-gray-500'}`}>{m.change}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Channel Performance */}
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-navy uppercase tracking-wide mb-3">Channel Performance</h3>
              <div className="grid grid-cols-4 gap-3">
                {Object.entries(region.channels).map(([channel, change]) => (
                  <div key={channel} className="bg-gray-50 rounded-lg p-3 text-center">
                    <div className={`text-lg font-bold ${change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>{change}</div>
                    <div className="text-xs text-gray-400 mt-1">{channel}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Top Brands */}
            <div>
              <h3 className="text-sm font-semibold text-navy uppercase tracking-wide mb-3">Leading Brands</h3>
              <div className="flex flex-wrap gap-2">
                {region.topBrands.map((brand, i) => (
                  <span key={i} className="px-3 py-1.5 bg-navy/5 text-navy text-xs font-medium rounded-full">{brand}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
