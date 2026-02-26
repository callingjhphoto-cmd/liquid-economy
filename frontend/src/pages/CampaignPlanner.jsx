import React, { useState, useCallback } from 'react';
import {
  Target,
  Calendar,
  Sliders,
  AlertTriangle,
  BarChart3,
  ChevronRight,
  ChevronLeft,
  DollarSign,
  TrendingUp,
  Globe,
  Package,
  Zap,
  Users,
  Megaphone,
  Wine,
  ShoppingCart,
  MapPin,
  Clock,
  CheckCircle,
  Download,
  ExternalLink,
} from 'lucide-react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';

const CampaignPlanner = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [campaignData, setCampaignData] = useState({
    campaignType: 'existing',
    brand: '',
    serve: '',
    customBrandName: '',
    category: '',
    segment: '',
    productDescription: '',
    cocktailName: '',
    baseSpirit: '',
    ingredients: '',
    targetOccasion: '',
    market: '',
    startMonth: 'January',
    endMonth: 'December',
    budget: '',
    objective: '',
    digital: 30,
    onTrade: 25,
    offTrade: 30,
    travelRetail: 15,
    metaInstagram: 50,
    tiktok: 30,
    youtube: 20,
    influencer: 0,
    barActivations: 50,
    restaurantPartnerships: 30,
    festivalSponsorship: 20,
    supermarketPromo: 40,
    specialistRetailer: 35,
    ecommerce: 25,
  });

  const brandsByCategory = {
    tequila: ['Don Julio Blanco', 'Don Julio 1942', 'Patr\u00f3n Silver', 'Jos\u00e9 Cuervo Especial', 'Altos Plata', 'Clase Azul Reposado', 'Casamigos Blanco', 'Olmeca Altos'],
    vodka: ['Absolut', 'Grey Goose', 'Belvedere', 'Ketel One', 'Smirnoff', 'Ciroc', 'Stolichnaya'],
    gin: ['Tanqueray London Dry', 'Hendrick\u2019s', 'Beefeater', 'Bombay Sapphire', 'Gordon\u2019s', 'Tanqueray No. Ten', 'Monkey 47', 'Sipsmith'],
    whisky: ['Johnnie Walker Black Label', 'Johnnie Walker Blue Label', 'Macallan 12', 'Glenfiddich 12', 'Jack Daniel\u2019s', 'Buffalo Trace', 'Woodford Reserve', 'Maker\u2019s Mark', 'Jameson'],
    rum: ['Bacardi Carta Blanca', 'Havana Club 7', 'Ron Zacapa 23', 'Diplom\u00e1tico Reserva', 'Mount Gay Eclipse', 'Appleton Estate'],
    cognac: ['Hennessy VS', 'Hennessy VSOP', 'Hennessy XO', 'R\u00e9my Martin VSOP', 'Martell VS', 'Courvoisier VS'],
    champagne: ['Mo\u00ebt Imp\u00e9rial', 'Veuve Clicquot', 'Dom P\u00e9rignon', 'Laurent-Perrier', 'Bollinger', 'Taittinger'],
    wine: ['Campo Viejo', 'Cloudy Bay', 'Ch\u00e2teau Margaux', 'Whispering Angel', 'Kim Crawford', 'Meiomi Pinot Noir'],
    beer: ['Stella Artois', 'Heineken', 'Peroni Nastro Azzurro', 'Corona Extra', 'Guinness', 'Brooklyn Lager'],
    nolo: ['Seedlip Garden 108', 'Celtic Soul', 'Lyre\u2019s', 'Pentire', 'CleanCo', 'Monday Gin'],
    rtd: ['Smirnoff Ice', 'White Claw', 'Fever-Tree G&T', 'Absolut Cocktails', 'Jack & Coke'],
  };

  const categories = [
    { id: 'tequila', label: 'Tequila & Mezcal' },
    { id: 'vodka', label: 'Vodka' },
    { id: 'gin', label: 'Gin' },
    { id: 'whisky', label: 'Whisky' },
    { id: 'rum', label: 'Rum' },
    { id: 'cognac', label: 'Cognac & Brandy' },
    { id: 'champagne', label: 'Champagne & Sparkling' },
    { id: 'wine', label: 'Wine' },
    { id: 'beer', label: 'Beer & Craft' },
    { id: 'nolo', label: 'No/Low Alcohol' },
    { id: 'rtd', label: 'RTD' },
  ];

  const segments = ['Value', 'Mid-Tier', 'Premium', 'Ultra-Premium', 'Luxury'];
  const baseSpirits = ['Tequila', 'Vodka', 'Gin', 'Whisky', 'Rum', 'Cognac', 'Champagne', 'Wine', 'Beer', 'No/Low', 'Multiple'];
  const cocktailOccasions = ['Aperitif', 'Cocktail Hour', 'Dinner', 'After Dinner', 'Nightclub', 'Party', 'Brunch', 'Summer', 'Winter Warmers'];

  const serves = ['Neat', 'Cocktail', 'Mixed', 'RTD'];
  const markets = [
    { code: 'UK', currency: '\u00a3' },
    { code: 'US', currency: '$' },
    { code: 'Spain', currency: '\u20ac' },
    { code: 'France', currency: '\u20ac' },
    { code: 'Germany', currency: '\u20ac' },
    { code: 'Italy', currency: '\u20ac' },
    { code: 'Netherlands', currency: '\u20ac' },
    { code: 'Middle East', currency: '$' },
  ];
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const objectives = [
    { id: 'volume', label: 'Volume Push', desc: 'Move X cases in market' },
    { id: 'trial', label: 'Trial Generation', desc: 'Reach new drinkers' },
    { id: 'premium', label: 'Premiumization', desc: 'Trade up from standard' },
    { id: 'cultural', label: 'Cultural Moment Hijack', desc: 'Attach to event/occasion' },
  ];

  // Mock data
  const baselineMetrics = {
    shareOfVoice: 8.5,
    brandAwareness: 34,
    topCompetitor: 'Tanqueray (UK) / Patron (US)',
    competitorActivity: 'Running major festival activation campaign',
  };

  const culturalCalendars = {
    UK: [
      { name: 'Wimbledon', date: 'June', serves: ['Cocktail', 'Mixed'], channels: ['On-Trade', 'Off-Trade'] },
      { name: 'Christmas Party Season', date: 'November-December', serves: ['Cocktail', 'Mixed'], channels: ['On-Trade'] },
      { name: 'Bank Holidays', date: 'May-August', serves: ['Mixed', 'RTD'], channels: ['Off-Trade', 'Travel Retail'] },
      { name: 'Summer Festivals', date: 'June-August', serves: ['Cocktail', 'Mixed'], channels: ['Festival', 'On-Trade'] },
    ],
    US: [
      { name: 'Super Bowl', date: 'February', serves: ['Cocktail', 'Mixed'], channels: ['On-Trade'] },
      { name: 'July 4th', date: 'July', serves: ['Mixed', 'RTD'], channels: ['Off-Trade', 'On-Trade'] },
      { name: 'Thanksgiving', date: 'November', serves: ['Neat', 'Cocktail'], channels: ['On-Trade', 'Off-Trade'] },
      { name: 'Spring Break', date: 'March-April', serves: ['Mixed', 'RTD'], channels: ['Travel Retail', 'On-Trade'] },
    ],
    Spain: [
      { name: 'La Tomatina', date: 'August', serves: ['Mixed', 'RTD'], channels: ['Festival', 'On-Trade'] },
      { name: 'Feria de Abril', date: 'April', serves: ['Cocktail', 'Mixed'], channels: ['Festival', 'On-Trade'] },
      { name: 'Christmas Markets', date: 'December', serves: ['Neat', 'Cocktail'], channels: ['On-Trade', 'Off-Trade'] },
      { name: 'Summer Holidays', date: 'July-August', serves: ['Mixed', 'RTD'], channels: ['Travel Retail', 'Off-Trade'] },
    ],
  };

  const occasions = [
    { name: 'After Work', icon: Clock, serve: 'Cocktail', channels: ['On-Trade'] },
    { name: 'Celebration', icon: Zap, serve: 'Neat / Cocktail', channels: ['On-Trade', 'Off-Trade'] },
    { name: 'Home Entertaining', icon: Users, serve: 'Mixed', channels: ['Off-Trade', 'E-commerce'] },
    { name: 'Festival/Outdoor', icon: MapPin, serve: 'RTD / Mixed', channels: ['Festival', 'Travel Retail'] },
    { name: 'Date Night', icon: Wine, serve: 'Cocktail', channels: ['On-Trade'] },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCampaignData(prev => ({ ...prev, [name]: value }));
  };

  const handleSliderChange = (channel, newValue) => {
    const adjustedValue = Math.max(0, Math.min(100, newValue));
    const otherChannels = ['digital', 'onTrade', 'offTrade', 'travelRetail'].filter(c => c !== channel);
    const sumOthers = otherChannels.reduce((sum, c) => sum + campaignData[c], 0);
    const available = 100 - adjustedValue;

    if (sumOthers === 0) {
      const equal = available / otherChannels.length;
      const updated = { [channel]: adjustedValue };
      otherChannels.forEach(c => { updated[c] = equal; });
      setCampaignData(prev => ({ ...prev, ...updated }));
    } else {
      const ratio = available / sumOthers;
      const updated = { [channel]: adjustedValue };
      otherChannels.forEach(c => { updated[c] = campaignData[c] * ratio; });
      setCampaignData(prev => ({ ...prev, ...updated }));
    }
  };

  const handleSubSliderChange = (group, subChannel, newValue) => {
    const adjValue = Math.max(0, Math.min(100, newValue));
    const prefix = group === 'digital' ? 'meta' : group === 'onTrade' ? 'bar' : 'supermarket';
    const subChannels = group === 'digital'
      ? ['metaInstagram', 'tiktok', 'youtube', 'influencer']
      : group === 'onTrade'
      ? ['barActivations', 'restaurantPartnerships', 'festivalSponsorship']
      : ['supermarketPromo', 'specialistRetailer', 'ecommerce'];

    const others = subChannels.filter(c => c !== subChannel);
    const sumOthers = others.reduce((sum, c) => sum + campaignData[c], 0);
    const available = 100 - adjValue;

    if (sumOthers === 0) {
      const equal = available / others.length;
      const updated = { [subChannel]: adjValue };
      others.forEach(c => { updated[c] = equal; });
      setCampaignData(prev => ({ ...prev, ...updated }));
    } else {
      const ratio = available / sumOthers;
      const updated = { [subChannel]: adjValue };
      others.forEach(c => { updated[c] = campaignData[c] * ratio; });
      setCampaignData(prev => ({ ...prev, ...updated }));
    }
  };

  const getCurrency = () => {
    const market = markets.find(m => m.code === campaignData.market);
    return market ? market.currency : '\u00a3';
  };

  const getSupplyChainStatus = () => {
    const budget = parseFloat(campaignData.budget) || 0;
    const digitalBudget = budget * (campaignData.digital / 100);
    const projectedVolume = (budget / 1000) * 2.5; // Mock: £1000 ~ 2.5 cases

    if (projectedVolume > 500) return { status: 'red', message: 'Supply chain may not support this volume spike' };
    if (projectedVolume > 300) return { status: 'amber', message: 'Moderate supply chain risk; confirm production capacity' };
    return { status: 'green', message: 'Supply chain capacity adequate for projected volume' };
  };

  const getROIData = () => {
    const budget = parseFloat(campaignData.budget) || 0;
    const avgCasePrice = 60;
    const projectedVolume = (budget / 1000) * 2.5;
    const baseROAS = (projectedVolume * avgCasePrice) / budget;
    return [
      { scenario: 'Conservative', volume: projectedVolume * 0.8, revenue: projectedVolume * 0.8 * avgCasePrice, roas: baseROAS * 0.8 },
      { scenario: 'Base Case', volume: projectedVolume, revenue: projectedVolume * avgCasePrice, roas: baseROAS },
      { scenario: 'Optimistic', volume: projectedVolume * 1.2, revenue: projectedVolume * 1.2 * avgCasePrice, roas: baseROAS * 1.2 },
    ];
  };

  const getChannelMetrics = () => {
    const budget = parseFloat(campaignData.budget) || 0;
    return [
      {
        channel: 'Digital/Social',
        allocation: campaignData.digital,
        spent: Math.round(budget * (campaignData.digital / 100)),
        cpm: 8,
        reach: Math.round((budget * (campaignData.digital / 100)) * 125),
        volumeImpact: Math.round((budget * (campaignData.digital / 100)) / 400),
      },
      {
        channel: 'On-Trade',
        allocation: campaignData.onTrade,
        spent: Math.round(budget * (campaignData.onTrade / 100)),
        cpm: 15,
        reach: Math.round((budget * (campaignData.onTrade / 100)) * 67),
        volumeImpact: Math.round((budget * (campaignData.onTrade / 100)) / 300),
      },
      {
        channel: 'Off-Trade',
        allocation: campaignData.offTrade,
        spent: Math.round(budget * (campaignData.offTrade / 100)),
        cpm: 5,
        reach: Math.round((budget * (campaignData.offTrade / 100)) * 200),
        volumeImpact: Math.round((budget * (campaignData.offTrade / 100)) / 500),
      },
      {
        channel: 'Travel Retail',
        allocation: campaignData.travelRetail,
        spent: Math.round(budget * (campaignData.travelRetail / 100)),
        cpm: 12,
        reach: Math.round((budget * (campaignData.travelRetail / 100)) * 85),
        volumeImpact: Math.round((budget * (campaignData.travelRetail / 100)) / 400),
      },
    ];
  };

  const allocationData = [
    { name: 'Digital/Social', value: campaignData.digital, color: '#1A1F36' },
    { name: 'On-Trade', value: campaignData.onTrade, color: '#C9A96E' },
    { name: 'Off-Trade', value: campaignData.offTrade, color: '#8B6F47' },
    { name: 'Travel Retail', value: campaignData.travelRetail, color: '#D4AF96' },
  ];

  const roiData = getROIData();
  const supplyChainStatus = getSupplyChainStatus();
  const channelMetrics = getChannelMetrics();

  const isStep1Complete = (() => {
    const base = campaignData.market && campaignData.budget && campaignData.objective;
    if (campaignData.campaignType === 'existing') return base && campaignData.brand && campaignData.serve;
    if (campaignData.campaignType === 'newProduct') return base && campaignData.customBrandName && campaignData.category && campaignData.segment && campaignData.serve;
    if (campaignData.campaignType === 'cocktail') return base && campaignData.cocktailName && campaignData.baseSpirit;
    return false;
  })();
  const isStep2Complete = isStep1Complete;
  const isStep3Complete = isStep2Complete;
  const isStep4Complete = isStep3Complete;
  const isStep5Complete = isStep4Complete;

  const handleExport = () => {
    const objective = objectives.find(o => o.id === campaignData.objective);
    const brandDisplay = campaignData.campaignType === 'existing' ? campaignData.brand
      : campaignData.campaignType === 'newProduct' ? `${campaignData.customBrandName} (New ${campaignData.category})`
      : `${campaignData.cocktailName} (Cocktail \u2014 ${campaignData.baseSpirit})`;
    const summary = `
Campaign Brief
==============
Brand: ${brandDisplay}
Market: ${campaignData.market}
Period: ${campaignData.startMonth} - ${campaignData.endMonth}
Budget: ${getCurrency()}${campaignData.budget}
Objective: ${objective?.label}

Channel Allocation:
- Digital/Social: ${campaignData.digital.toFixed(1)}%
- On-Trade: ${campaignData.onTrade.toFixed(1)}%
- Off-Trade: ${campaignData.offTrade.toFixed(1)}%
- Travel Retail: ${campaignData.travelRetail.toFixed(1)}%

Target Audience: ${campaignData.serve} drinkers in ${campaignData.market}
Key Metrics: ROI ${(roiData[1].roas).toFixed(2)}x, Volume ${roiData[1].volume.toFixed(0)} cases
    `;
    alert(summary);
  };

  const renderStep1 = () => (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100 p-6">
        <div className="flex items-start gap-3">
          <Target className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
          <div>
            <h3 className="font-display font-bold text-sm text-blue-900 mb-1">Campaign DNA & True Objective</h3>
            <p className="text-xs text-blue-700">Define your brand, market, budget, and primary goal. This becomes your north star.</p>
          </div>
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-gray-700 mb-3">Campaign Type</label>
        <div className="grid grid-cols-3 gap-3">
          {[
            { id: 'existing', label: 'Existing Brand', icon: Wine },
            { id: 'newProduct', label: 'New Product Launch', icon: Package },
            { id: 'cocktail', label: 'Cocktail/Serve Campaign', icon: Zap }
          ].map(type => {
            const IconComponent = type.icon;
            return (
              <div
                key={type.id}
                onClick={() => setCampaignData(prev => ({ ...prev, campaignType: type.id }))}
                className={`p-4 rounded-xl border-2 cursor-pointer transition flex flex-col items-center gap-2 ${
                  campaignData.campaignType === type.id
                    ? 'border-yellow-500 bg-yellow-50'
                    : 'border-gray-200 bg-white hover:border-yellow-300'
                }`}
              >
                <IconComponent className={`w-5 h-5 ${campaignData.campaignType === type.id ? 'text-yellow-600' : 'text-gray-600'}`} />
                <p className="font-semibold text-xs text-gray-900 text-center">{type.label}</p>
              </div>
            );
          })}
        </div>
      </div>

      {campaignData.campaignType === 'existing' && (
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-2">Category</label>
            <select
              name="category"
              value={campaignData.category}
              onChange={handleInputChange}
              className="w-full px-3 py-2 text-xs border border-gray-200 rounded-lg bg-white text-gray-900 focus:outline-none focus:border-yellow-500"
            >
              <option value="">Select Category</option>
              {categories.map(c => <option key={c.id} value={c.id}>{c.label}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-2">Brand</label>
            <select
              name="brand"
              value={campaignData.brand}
              onChange={handleInputChange}
              className="w-full px-3 py-2 text-xs border border-gray-200 rounded-lg bg-white text-gray-900 focus:outline-none focus:border-yellow-500"
            >
              <option value="">Select Brand</option>
              {campaignData.category && brandsByCategory[campaignData.category]?.map(b => <option key={b} value={b}>{b}</option>)}
            </select>
          </div>
        </div>
      )}

      {campaignData.campaignType === 'newProduct' && (
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-2">Brand Name</label>
            <input
              type="text"
              name="customBrandName"
              value={campaignData.customBrandName}
              onChange={handleInputChange}
              placeholder="e.g., Aurora Spirits"
              className="w-full px-3 py-2 text-xs border border-gray-200 rounded-lg bg-white text-gray-900 focus:outline-none focus:border-yellow-500"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-2">Category</label>
              <select
                name="category"
                value={campaignData.category}
                onChange={handleInputChange}
                className="w-full px-3 py-2 text-xs border border-gray-200 rounded-lg bg-white text-gray-900 focus:outline-none focus:border-yellow-500"
              >
                <option value="">Select Category</option>
                {categories.map(c => <option key={c.id} value={c.id}>{c.label}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-2">Segment</label>
              <select
                name="segment"
                value={campaignData.segment}
                onChange={handleInputChange}
                className="w-full px-3 py-2 text-xs border border-gray-200 rounded-lg bg-white text-gray-900 focus:outline-none focus:border-yellow-500"
              >
                <option value="">Select Segment</option>
                {segments.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-2">Product Description</label>
            <textarea
              name="productDescription"
              value={campaignData.productDescription}
              onChange={handleInputChange}
              placeholder="Describe the product, key features, and positioning..."
              className="w-full px-3 py-2 text-xs border border-gray-200 rounded-lg bg-white text-gray-900 focus:outline-none focus:border-yellow-500 h-20 resize-none"
            />
          </div>
        </div>
      )}

      {campaignData.campaignType === 'cocktail' && (
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-2">Cocktail Name</label>
            <input
              type="text"
              name="cocktailName"
              value={campaignData.cocktailName}
              onChange={handleInputChange}
              placeholder="e.g., Tropical Sunset"
              className="w-full px-3 py-2 text-xs border border-gray-200 rounded-lg bg-white text-gray-900 focus:outline-none focus:border-yellow-500"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-2">Base Spirit</label>
              <select
                name="baseSpirit"
                value={campaignData.baseSpirit}
                onChange={handleInputChange}
                className="w-full px-3 py-2 text-xs border border-gray-200 rounded-lg bg-white text-gray-900 focus:outline-none focus:border-yellow-500"
              >
                <option value="">Select Base Spirit</option>
                {baseSpirits.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-2">Target Occasion</label>
              <select
                name="targetOccasion"
                value={campaignData.targetOccasion}
                onChange={handleInputChange}
                className="w-full px-3 py-2 text-xs border border-gray-200 rounded-lg bg-white text-gray-900 focus:outline-none focus:border-yellow-500"
              >
                <option value="">Select Occasion</option>
                {cocktailOccasions.map(o => <option key={o} value={o}>{o}</option>)}
              </select>
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-2">Key Ingredients</label>
            <textarea
              name="ingredients"
              value={campaignData.ingredients}
              onChange={handleInputChange}
              placeholder="e.g., Tequila, Lime juice, Simple syrup, Jalapeño, Agave nectar..."
              className="w-full px-3 py-2 text-xs border border-gray-200 rounded-lg bg-white text-gray-900 focus:outline-none focus:border-yellow-500 h-16 resize-none"
            />
          </div>
        </div>
      )}

      {campaignData.campaignType !== 'cocktail' && (
        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-2">Serve Style</label>
          <select
            name="serve"
            value={campaignData.serve}
            onChange={handleInputChange}
            className="w-full px-3 py-2 text-xs border border-gray-200 rounded-lg bg-white text-gray-900 focus:outline-none focus:border-yellow-500"
          >
            <option value="">Select Serve</option>
            {serves.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
      )}

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-2">Market</label>
          <select
            name="market"
            value={campaignData.market}
            onChange={handleInputChange}
            className="w-full px-3 py-2 text-xs border border-gray-200 rounded-lg bg-white text-gray-900 focus:outline-none focus:border-yellow-500"
          >
            <option value="">Select Market</option>
            {markets.map(m => <option key={m.code} value={m.code}>{m.code}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-2">Budget ({getCurrency()})</label>
          <input
            type="number"
            name="budget"
            value={campaignData.budget}
            onChange={handleInputChange}
            placeholder="e.g., 50000"
            className="w-full px-3 py-2 text-xs border border-gray-200 rounded-lg bg-white text-gray-900 focus:outline-none focus:border-yellow-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-2">Campaign Start</label>
          <select
            name="startMonth"
            value={campaignData.startMonth}
            onChange={handleInputChange}
            className="w-full px-3 py-2 text-xs border border-gray-200 rounded-lg bg-white text-gray-900 focus:outline-none focus:border-yellow-500"
          >
            {months.map(m => <option key={m} value={m}>{m}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-2">Campaign End</label>
          <select
            name="endMonth"
            value={campaignData.endMonth}
            onChange={handleInputChange}
            className="w-full px-3 py-2 text-xs border border-gray-200 rounded-lg bg-white text-gray-900 focus:outline-none focus:border-yellow-500"
          >
            {months.map(m => <option key={m} value={m}>{m}</option>)}
          </select>
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-gray-700 mb-3">Primary Objective</label>
        <div className="grid grid-cols-2 gap-3">
          {objectives.map(obj => (
            <div
              key={obj.id}
              onClick={() => setCampaignData(prev => ({ ...prev, objective: obj.id }))}
              className={`p-3 rounded-lg border-2 cursor-pointer transition ${
                campaignData.objective === obj.id
                  ? 'border-yellow-500 bg-yellow-50'
                  : 'border-gray-200 bg-white hover:border-yellow-300'
              }`}
            >
              <p className="font-semibold text-xs text-gray-900">{obj.label}</p>
              <p className="text-xs text-gray-600">{obj.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => {
    const calendar = culturalCalendars[campaignData.market] || [];
    return (
      <div className="space-y-6">
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-100 p-6">
          <div className="flex items-start gap-3">
            <Calendar className="w-5 h-5 text-purple-600 mt-1 flex-shrink-0" />
            <div>
              <h3 className="font-display font-bold text-sm text-purple-900 mb-1">Occasion & Cultural Mapping</h3>
              <p className="text-xs text-purple-700">Align your campaign with cultural moments and drink occasions in {campaignData.market}.</p>
            </div>
          </div>
        </div>

        {/* Baseline Reality Check */}
        <div className="bg-white rounded-xl border border-gray-100 p-4 space-y-3">
          <h4 className="font-semibold text-xs text-gray-900 flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-gray-600" />
            Baseline Reality Check
          </h4>
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="bg-gray-50 rounded p-2">
              <p className="text-gray-600">Current Share of Voice</p>
              <p className="font-bold text-gray-900">{baselineMetrics.shareOfVoice}%</p>
            </div>
            <div className="bg-gray-50 rounded p-2">
              <p className="text-gray-600">Brand Awareness</p>
              <p className="font-bold text-gray-900">{baselineMetrics.brandAwareness}%</p>
            </div>
            <div className="col-span-2 bg-gray-50 rounded p-2">
              <p className="text-gray-600">Top Competitor</p>
              <p className="font-bold text-gray-900">{baselineMetrics.topCompetitor}</p>
            </div>
            <div className="col-span-2 bg-gray-50 rounded p-2">
              <p className="text-gray-600">Competitor Activity</p>
              <p className="font-bold text-gray-900">{baselineMetrics.competitorActivity}</p>
            </div>
          </div>
        </div>

        {/* Cultural Calendar */}
        <div className="bg-white rounded-xl border border-gray-100 p-4 space-y-3">
          <h4 className="font-semibold text-xs text-gray-900">Cultural Calendar ({campaignData.market})</h4>
          <div className="space-y-2">
            {calendar.length > 0 ? calendar.map((event, idx) => (
              <div key={idx} className="border border-gray-200 rounded p-2 text-xs">
                <div className="flex items-center justify-between">
                  <p className="font-semibold text-gray-900">{event.name}</p>
                  <span className="text-gray-600">{event.date}</span>
                </div>
                <div className="flex gap-2 mt-1">
                  <span className="inline-block bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs">{event.serves.join(', ')}</span>
                  <span className="inline-block bg-green-100 text-green-700 px-2 py-1 rounded text-xs">{event.channels.join(', ')}</span>
                </div>
              </div>
            )) : <p className="text-gray-500 text-xs">Select a market to see cultural events</p>}
          </div>
        </div>

        {/* Occasion Mapping */}
        <div className="bg-white rounded-xl border border-gray-100 p-4 space-y-3">
          <h4 className="font-semibold text-xs text-gray-900">Drink Occasions</h4>
          <div className="grid grid-cols-2 gap-3">
            {occasions.map((occ, idx) => {
              const Icon = occ.icon;
              return (
                <div key={idx} className="bg-gradient-to-br from-gray-50 to-gray-100 rounded p-3 border border-gray-200">
                  <div className="flex items-center gap-2 mb-2">
                    <Icon className="w-4 h-4 text-gray-700" />
                    <p className="font-semibold text-xs text-gray-900">{occ.name}</p>
                  </div>
                  <p className="text-xs text-gray-700 mb-1"><span className="font-semibold">Serve:</span> {occ.serve}</p>
                  <p className="text-xs text-gray-600"><span className="font-semibold">Channels:</span> {occ.channels.join(', ')}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  const renderStep3 = () => (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-100 p-6">
        <div className="flex items-start gap-3">
          <Sliders className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
          <div>
            <h3 className="font-display font-bold text-sm text-green-900 mb-1">Omnichannel Allocation Sandbox</h3>
            <p className="text-xs text-green-700">Drag sliders to allocate budget across channels. Watch reach and ROI update in real-time.</p>
          </div>
        </div>
      </div>

      {/* Main Channel Sliders */}
      <div className="bg-white rounded-xl border border-gray-100 p-4 space-y-4">
        <h4 className="font-semibold text-xs text-gray-900">Primary Channel Allocation</h4>
        {['digital', 'onTrade', 'offTrade', 'travelRetail'].map(channel => {
          const labels = { digital: 'Digital/Social', onTrade: 'On-Trade', offTrade: 'Off-Trade', travelRetail: 'Travel Retail' };
          const value = campaignData[channel];
          return (
            <div key={channel} className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-gray-900">{labels[channel]}</label>
                <span className="text-xs font-bold text-gray-900">{value.toFixed(1)}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                step="0.1"
                value={value}
                onChange={(e) => handleSliderChange(channel, parseFloat(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-yellow-500"
              />
            </div>
          );
        })}
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="flex justify-between text-xs">
            <span className="font-semibold text-gray-700">Total Allocation</span>
            <span className="font-bold text-gray-900">{(campaignData.digital + campaignData.onTrade + campaignData.offTrade + campaignData.travelRetail).toFixed(1)}%</span>
          </div>
        </div>
      </div>

      {/* Budget Allocation Pie Chart */}
      <div className="bg-white rounded-xl border border-gray-100 p-4">
        <h4 className="font-semibold text-xs text-gray-900 mb-4">Budget Allocation Breakdown</h4>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={allocationData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, value }) => `${name}: ${value.toFixed(1)}%`}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {allocationData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip formatter={(value) => `${value.toFixed(1)}%`} />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Channel Metrics Table */}
      <div className="bg-white rounded-xl border border-gray-100 p-4 space-y-3">
        <h4 className="font-semibold text-xs text-gray-900">Channel Metrics & Impact</h4>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-2 py-2 text-left font-semibold text-gray-700">Channel</th>
                <th className="px-2 py-2 text-right font-semibold text-gray-700">Budget</th>
                <th className="px-2 py-2 text-right font-semibold text-gray-700">Reach</th>
                <th className="px-2 py-2 text-right font-semibold text-gray-700">Vol. Cases</th>
              </tr>
            </thead>
            <tbody>
              {channelMetrics.map((metric, idx) => (
                <tr key={idx} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="px-2 py-2 font-semibold text-gray-900">{metric.channel}</td>
                  <td className="px-2 py-2 text-right text-gray-700">{getCurrency()}{metric.spent.toLocaleString()}</td>
                  <td className="px-2 py-2 text-right text-gray-700">{metric.reach.toLocaleString()}</td>
                  <td className="px-2 py-2 text-right text-gray-700">{metric.volumeImpact}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Digital Sub-allocation */}
      {campaignData.digital > 0 && (
        <div className="bg-white rounded-xl border border-gray-100 p-4 space-y-4">
          <h4 className="font-semibold text-xs text-gray-900">Digital/Social Sub-Allocation</h4>
          {[
            { key: 'metaInstagram', label: 'Meta/Instagram' },
            { key: 'tiktok', label: 'TikTok' },
            { key: 'youtube', label: 'YouTube' },
            { key: 'influencer', label: 'Influencer/KOL' },
          ].map(({ key, label }) => (
            <div key={key} className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-gray-900">{label}</label>
                <span className="text-xs font-bold text-gray-900">{campaignData[key].toFixed(1)}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                step="0.1"
                value={campaignData[key]}
                onChange={(e) => handleSubSliderChange('digital', key, parseFloat(e.target.value))}
                className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
            </div>
          ))}
        </div>
      )}

      {/* On-Trade Sub-allocation */}
      {campaignData.onTrade > 0 && (
        <div className="bg-white rounded-xl border border-gray-100 p-4 space-y-4">
          <h4 className="font-semibold text-xs text-gray-900">On-Trade Sub-Allocation</h4>
          {[
            { key: 'barActivations', label: 'Bar Activations' },
            { key: 'restaurantPartnerships', label: 'Restaurant Partnerships' },
            { key: 'festivalSponsorship', label: 'Festival Sponsorship' },
          ].map(({ key, label }) => (
            <div key={key} className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-gray-900">{label}</label>
                <span className="text-xs font-bold text-gray-900">{campaignData[key].toFixed(1)}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                step="0.1"
                value={campaignData[key]}
                onChange={(e) => handleSubSliderChange('onTrade', key, parseFloat(e.target.value))}
                className="w-full h-2 bg-yellow-200 rounded-lg appearance-none cursor-pointer accent-yellow-600"
              />
            </div>
          ))}
        </div>
      )}

      {/* Off-Trade Sub-allocation */}
      {campaignData.offTrade > 0 && (
        <div className="bg-white rounded-xl border border-gray-100 p-4 space-y-4">
          <h4 className="font-semibold text-xs text-gray-900">Off-Trade Sub-Allocation</h4>
          {[
            { key: 'supermarketPromo', label: 'Supermarket Promotions' },
            { key: 'specialistRetailer', label: 'Specialist Retailer Displays' },
            { key: 'ecommerce', label: 'E-commerce' },
          ].map(({ key, label }) => (
            <div key={key} className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-gray-900">{label}</label>
                <span className="text-xs font-bold text-gray-900">{campaignData[key].toFixed(1)}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                step="0.1"
                value={campaignData[key]}
                onChange={(e) => handleSubSliderChange('offTrade', key, parseFloat(e.target.value))}
                className="w-full h-2 bg-green-200 rounded-lg appearance-none cursor-pointer accent-green-600"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const renderStep4 = () => {
    const status = supplyChainStatus;
    const statusColors = { green: 'bg-green-50 border-green-200 text-green-900', amber: 'bg-amber-50 border-amber-200 text-amber-900', red: 'bg-red-50 border-red-200 text-red-900' };
    const statusIcons = { green: '\u2713', amber: '!', red: '\u00d7' };
    return (
      <div className="space-y-6">
        <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-xl border border-orange-100 p-6">
          <div className="flex items-start gap-3">
            <Package className="w-5 h-5 text-orange-600 mt-1 flex-shrink-0" />
            <div>
              <h3 className="font-display font-bold text-sm text-orange-900 mb-1">Supply Chain Reality Check</h3>
              <p className="text-xs text-orange-700">Ensure your campaign plan is operationally feasible.</p>
            </div>
          </div>
        </div>

        {/* Volume Feasibility */}
        <div className={`rounded-xl border p-4 ${statusColors[status.status]}`}>
          <div className="flex items-start gap-3">
            <span className="font-bold text-lg">{statusIcons[status.status]}</span>
            <div>
              <h4 className="font-semibold text-xs mb-1">Volume Feasibility</h4>
              <p className="text-xs">{status.message}</p>
            </div>
          </div>
        </div>

        {/* PPI/Freight Cost Alert */}
        <div className="bg-white rounded-xl border border-gray-100 p-4 space-y-3">
          <h4 className="font-semibold text-xs text-gray-900 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-600" />
            Raw Material & Logistics
          </h4>
          <div className="space-y-2">
            <div className="bg-amber-50 border border-amber-200 rounded p-2">
              <p className="text-xs font-semibold text-amber-900">Agave Price Index (Tequila)</p>
              <p className="text-xs text-amber-700">Up 12% YoY; recommend early procurement</p>
            </div>
            <div className="bg-amber-50 border border-amber-200 rounded p-2">
              <p className="text-xs font-semibold text-amber-900">Sea Freight Rates</p>
              <p className="text-xs text-amber-700">Stable; typical lead time 6-8 weeks from production</p>
            </div>
            <div className="bg-amber-50 border border-amber-200 rounded p-2">
              <p className="text-xs font-semibold text-amber-900">Glass Bottle Shortage Risk</p>
              <p className="text-xs text-amber-700">Moderate; confirm secondary packaging 12 weeks prior</p>
            </div>
          </div>
        </div>

        {/* Lead Time Check */}
        <div className="bg-white rounded-xl border border-gray-100 p-4 space-y-3">
          <h4 className="font-semibold text-xs text-gray-900 flex items-center gap-2">
            <Clock className="w-4 h-4 text-gray-600" />
            Lead Time Timeline
          </h4>
          <div className="space-y-2 text-xs">
            <div className="flex items-center justify-between pb-2 border-b border-gray-200">
              <span className="font-semibold text-gray-700">Production</span>
              <span className="text-gray-600">4 weeks</span>
            </div>
            <div className="flex items-center justify-between pb-2 border-b border-gray-200">
              <span className="font-semibold text-gray-700">Shipping</span>
              <span className="text-gray-600">6-8 weeks</span>
            </div>
            <div className="flex items-center justify-between pb-2 border-b border-gray-200">
              <span className="font-semibold text-gray-700">Retail Distribution</span>
              <span className="text-gray-600">2-3 weeks</span>
            </div>
            <div className="flex items-center justify-between bg-blue-50 p-2 rounded">
              <span className="font-semibold text-blue-900">Total Lead Time</span>
              <span className="font-bold text-blue-900">12-15 weeks</span>
            </div>
          </div>
          <p className="text-xs text-gray-600 mt-3 p-2 bg-gray-50 rounded">
            <span className="font-semibold">Recommendation:</span> {campaignData.startMonth} campaign requires production order by {campaignData.startMonth === 'January' ? 'October' : 'Previous month'}
          </p>
        </div>

        {/* Margin Impact */}
        <div className="bg-white rounded-xl border border-gray-100 p-4 space-y-3">
          <h4 className="font-semibold text-xs text-gray-900 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-green-600" />
            Margin Impact Analysis
          </h4>
          <div className="space-y-2 text-xs">
            <div className="flex items-center justify-between pb-2 border-b border-gray-200">
              <span className="text-gray-700">Standard Margin (Off-Trade)</span>
              <span className="font-semibold text-gray-900">38%</span>
            </div>
            <div className="flex items-center justify-between pb-2 border-b border-gray-200">
              <span className="text-gray-700">With 15% Promotional Discount</span>
              <span className="font-semibold text-red-600">28%</span>
            </div>
            <div className="flex items-center justify-between bg-yellow-50 p-2 rounded">
              <span className="font-semibold text-yellow-900">Volume Required to Offset</span>
              <span className="font-bold text-yellow-900">+38% incremental cases</span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderStep5 = () => {
    const roiData = getROIData();
    const budget = parseFloat(campaignData.budget) || 0;
    const objective = objectives.find(o => o.id === campaignData.objective);

    return (
      <div className="space-y-6">
        <div className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-xl border border-indigo-100 p-6">
          <div className="flex items-start gap-3">
            <BarChart3 className="w-5 h-5 text-indigo-600 mt-1 flex-shrink-0" />
            <div>
              <h3 className="font-display font-bold text-sm text-indigo-900 mb-1">Predictive ROI & Agency Handoff</h3>
              <p className="text-xs text-indigo-700">Your campaign summary ready for creative and media partners.</p>
            </div>
          </div>
        </div>

        {/* Forecasted Metrics */}
        <div className="bg-white rounded-xl border border-gray-100 p-4 space-y-3">
          <h4 className="font-semibold text-xs text-gray-900 mb-3">Forecasted Metrics (Base Case)</h4>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded p-3">
              <p className="text-xs text-blue-700 font-semibold">Incremental Volume</p>
              <p className="text-lg font-bold text-blue-900">{roiData[1].volume.toFixed(0)}</p>
              <p className="text-xs text-blue-600">cases</p>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded p-3">
              <p className="text-xs text-green-700 font-semibold">Revenue Uplift</p>
              <p className="text-lg font-bold text-green-900">{getCurrency()}{(roiData[1].revenue / 1000).toFixed(0)}k</p>
              <p className="text-xs text-green-600">incremental</p>
            </div>
            <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded p-3">
              <p className="text-xs text-yellow-700 font-semibold">ROAS</p>
              <p className="text-lg font-bold text-yellow-900">{roiData[1].roas.toFixed(2)}x</p>
              <p className="text-xs text-yellow-600">return on spend</p>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded p-3">
              <p className="text-xs text-purple-700 font-semibold">Brand Awareness Lift</p>
              <p className="text-lg font-bold text-purple-900">+8%</p>
              <p className="text-xs text-purple-600">estimated</p>
            </div>
          </div>
        </div>

        {/* ROI Projection Chart */}
        <div className="bg-white rounded-xl border border-gray-100 p-4">
          <h4 className="font-semibold text-xs text-gray-900 mb-4">ROI Projection by Scenario</h4>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={roiData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="scenario" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip formatter={(value) => value.toFixed(2)} />
              <Legend />
              <Bar dataKey="volume" fill="#3b82f6" name="Volume (cases)" radius={[4, 4, 0, 0]} />
              <Bar dataKey="roas" fill="#10b981" name="ROAS (x)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Scenario Comparison Table */}
        <div className="bg-white rounded-xl border border-gray-100 p-4 space-y-3">
          <h4 className="font-semibold text-xs text-gray-900">Scenario Comparison</h4>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-2 py-2 text-left font-semibold text-gray-700">Scenario</th>
                  <th className="px-2 py-2 text-right font-semibold text-gray-700">Volume</th>
                  <th className="px-2 py-2 text-right font-semibold text-gray-700">Revenue</th>
                  <th className="px-2 py-2 text-right font-semibold text-gray-700">ROAS</th>
                </tr>
              </thead>
              <tbody>
                {roiData.map((scenario, idx) => (
                  <tr key={idx} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="px-2 py-2 font-semibold text-gray-900">{scenario.scenario}</td>
                    <td className="px-2 py-2 text-right text-gray-700">{scenario.volume.toFixed(0)} cases</td>
                    <td className="px-2 py-2 text-right text-gray-700">{getCurrency()}{(scenario.revenue / 1000).toFixed(0)}k</td>
                    <td className="px-2 py-2 text-right text-gray-700 font-semibold">{scenario.roas.toFixed(2)}x</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Risk Factors */}
        <div className="bg-white rounded-xl border border-gray-100 p-4 space-y-3">
          <h4 className="font-semibold text-xs text-gray-900 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-red-500" />
            Top 3 Risk Factors
          </h4>
          <div className="space-y-2">
            <div className="bg-red-50 border border-red-200 rounded p-2">
              <p className="font-semibold text-xs text-red-900">Competitor Reaction</p>
              <p className="text-xs text-red-700">Rival brands may respond with aggressive promotional pricing</p>
            </div>
            <div className="bg-amber-50 border border-amber-200 rounded p-2">
              <p className="font-semibold text-xs text-amber-900">Demand Forecasting</p>
              <p className="text-xs text-amber-700">Cultural events may underperform or overperform expected engagement</p>
            </div>
            <div className="bg-yellow-50 border border-yellow-200 rounded p-2">
              <p className="font-semibold text-xs text-yellow-900">Supply Chain Volatility</p>
              <p className="text-xs text-yellow-700">Raw material costs or shipping delays may impact margin or timing</p>
            </div>
          </div>
        </div>

        {/* Agency Handoff Export */}
        <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl border-2 border-yellow-300 p-4 space-y-3">
          <h4 className="font-semibold text-xs text-yellow-900 flex items-center gap-2">
            <Megaphone className="w-4 h-4" />
            Agency Handoff Brief
          </h4>
          <div className="bg-white rounded p-3 space-y-2 text-xs">
            <div>
              <p className="font-semibold text-gray-700">Brand & Serve</p>
              <p className="text-gray-900">{campaignData.brand} — {campaignData.serve}</p>
            </div>
            <div>
              <p className="font-semibold text-gray-700">Market & Timeline</p>
              <p className="text-gray-900">{campaignData.market} | {campaignData.startMonth} – {campaignData.endMonth}</p>
            </div>
            <div>
              <p className="font-semibold text-gray-700">Total Budget</p>
              <p className="text-gray-900">{getCurrency()}{campaignData.budget}</p>
            </div>
            <div>
              <p className="font-semibold text-gray-700">Primary Objective</p>
              <p className="text-gray-900">{objective?.label}</p>
            </div>
            <div>
              <p className="font-semibold text-gray-700">Channel Allocation</p>
              <p className="text-gray-900">Digital {campaignData.digital.toFixed(0)}% | On-Trade {campaignData.onTrade.toFixed(0)}% | Off-Trade {campaignData.offTrade.toFixed(0)}% | Travel {campaignData.travelRetail.toFixed(0)}%</p>
            </div>
            <div>
              <p className="font-semibold text-gray-700">Key Metrics to Hit</p>
              <p className="text-gray-900">{roiData[1].volume.toFixed(0)} cases | {getCurrency()}{(roiData[1].revenue / 1000).toFixed(0)}k revenue | {roiData[1].roas.toFixed(2)}x ROAS</p>
            </div>
          </div>
          <button
            onClick={handleExport}
            className="w-full flex items-center justify-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold text-xs py-2 rounded-lg transition"
          >
            <Download className="w-4 h-4" />
            Export Brief
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-display font-bold text-gray-900 mb-2">Campaign Planner</h1>
          <p className="text-sm text-gray-600">5-step wizard to design your spirits campaign. Turn intelligence into action.</p>
        </div>

        {/* Stepper */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            {[1, 2, 3, 4, 5].map((step, idx) => (
              <React.Fragment key={step}>
                <button
                  onClick={() => setCurrentStep(step)}
                  className={`flex items-center justify-center w-10 h-10 rounded-full font-semibold text-xs transition ${
                    step === currentStep
                      ? 'bg-yellow-500 text-white'
                      : step < currentStep
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-300 text-gray-600'
                  }`}
                >
                  {step < currentStep ? <CheckCircle className="w-5 h-5" /> : step}
                </button>
                {idx < 4 && <div className={`flex-1 h-1 mx-2 ${step < currentStep ? 'bg-green-500' : 'bg-gray-300'}`} />}
              </React.Fragment>
            ))}
          </div>
          <div className="flex items-center justify-between text-xs text-gray-600">
            <span>Campaign DNA</span>
            <span>Occasion Map</span>
            <span>Budget Sandbox</span>
            <span>Supply Chain</span>
            <span>ROI & Handoff</span>
          </div>
        </div>

        {/* Content */}
        <div className="bg-white rounded-xl border border-gray-100 p-8 mb-8 min-h-[600px]">
          {currentStep === 1 && renderStep1()}
          {currentStep === 2 && renderStep2()}
          {currentStep === 3 && renderStep3()}
          {currentStep === 4 && renderStep4()}
          {currentStep === 5 && renderStep5()}
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between gap-4">
          <button
            onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
            disabled={currentStep === 1}
            className="flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-900 font-semibold text-sm rounded-lg hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            <ChevronLeft className="w-4 h-4" />
            Back
          </button>

          <div className="text-xs text-gray-600">
            Step {currentStep} of 5
          </div>

          <button
            onClick={() => setCurrentStep(Math.min(5, currentStep + 1))}
            disabled={currentStep === 5}
            className="flex items-center gap-2 px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold text-sm rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            Next
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Completion Message */}
        {currentStep === 5 && (
          <div className="mt-6 bg-green-50 border border-green-200 rounded-xl p-4 text-center">
            <p className="text-sm font-semibold text-green-900">Campaign plan complete. Ready for agency handoff.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CampaignPlanner;
