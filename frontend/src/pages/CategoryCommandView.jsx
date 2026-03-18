import React, { useState, useMemo } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import {
  ArrowLeft, TrendingUp, TrendingDown, Package, DollarSign, Globe,
  CloudRain, MapPin, ShoppingBag, ChevronDown, ChevronUp, AlertTriangle,
  Target, Zap, BarChart3, ExternalLink, ArrowUpRight, ArrowDownRight
} from 'lucide-react'
import {
  AreaChart, Area, BarChart, Bar, LineChart, Line, ResponsiveContainer,
  XAxis, YAxis, Tooltip, CartesianGrid, Cell, PieChart, Pie
} from 'recharts'

// ══════════════════════════════════════════════════════════
// CATEGORY INTELLIGENCE DATA (curated cross-page composite)
// ══════════════════════════════════════════════════════════

const CATEGORY_DATA = {
  tequila: {
    name: 'Tequila & Mezcal',
    emoji: '\ud83c\uddf2\ud83c\uddfd',
    marketSize: '$4.8B', growth: '+7.8%', volume: '185M 9L cases', dir: 'up',
    fiveYear: [{ yr: '2021', v: 3.2 }, { yr: '2022', v: 3.6 }, { yr: '2023', v: 4.0 }, { yr: '2024', v: 4.4 }, { yr: '2025', v: 4.8 }],
    channels: { onTrade: 35, offTrade: 42, eCommerce: 12, travelRetail: 11 },
    supplyChain: [
      { input: 'Mexican Agave (SIAP)', value: '8.2 MXN/kg', change: '-18%', dir: 'down', trend: [10.0, 9.8, 9.5, 9.2, 8.8, 8.5, 8.4, 8.3, 8.2, 8.2, 8.2, 8.2], alert: 'green' },
      { input: 'Glass Bottles (PPI)', value: '216.4', change: '+2.1%', dir: 'up', trend: [210, 211, 212, 213, 213, 214, 214, 215, 215, 216, 216, 216], alert: 'amber' },
      { input: 'Drewry WCI Freight', value: '$3,421/box', change: '+110%', dir: 'up', trend: [1630, 1820, 2100, 2450, 2680, 2900, 3050, 3150, 3250, 3350, 3400, 3421], alert: 'red' },
      { input: 'Cardboard Packaging', value: '$850/t', change: '+4%', dir: 'up', trend: [815, 818, 822, 825, 830, 835, 838, 842, 845, 847, 849, 850], alert: 'amber' },
    ],
    cogsEstimate: { raw: 2.40, glass: 1.80, closure: 0.60, freight: 3.20, duty: 8.05, production: 2.10, overheads: 2.00, total: 20.15, margin: 42.4 },
    pricing: {
      highEnd: [
        { brand: 'Don Julio 1942', price: '\u00a3115.99', segment: 'Ultra Premium' },
        { brand: 'Clase Azul Reposado', price: '\u00a3119.99', segment: 'Ultra Premium' },
        { brand: 'Fortaleza A\u00f1ejo', price: '\u00a362.99', segment: 'Super Premium' },
        { brand: 'Patr\u00f3n A\u00f1ejo', price: '\u00a356.99', segment: 'Super Premium' },
      ],
      midTier: [
        { brand: 'Don Julio Blanco', price: '\u00a338.99', segment: 'Premium' },
        { brand: 'Casamigos Blanco', price: '\u00a341.99', segment: 'Premium' },
        { brand: 'Patr\u00f3n Silver', price: '\u00a347.99', segment: 'Premium' },
        { brand: 'Casa Noble Reposado', price: '\u00a335.99', segment: 'Premium' },
      ],
      value: [
        { brand: 'Jos\u00e9 Cuervo Especial', price: '\u00a322.99', segment: 'Standard' },
        { brand: 'Olmeca Altos Plata', price: '\u00a325.99', segment: 'Standard' },
        { brand: 'Espol\u00f3n Blanco', price: '\u00a324.99', segment: 'Standard' },
        { brand: 'El Jimador', price: '\u00a321.99', segment: 'Standard' },
      ],
      whiteSpace: '\u00a330-38 premium gap between value/mid-tier is underserved'
    },
    topMarkets: [
      { country: 'USA', growth: '+4.2%', share: '68%', note: 'Largest global market; premium segment accelerating' },
      { country: 'Spain', growth: '+12%', share: '4%', note: 'Fastest growth in Europe; cocktail culture driving' },
      { country: 'India', growth: '+18%', share: '1.2%', note: 'From low base; urban premiumization' },
      { country: 'UK', growth: '+6.5%', share: '3%', note: 'Mezcal awareness growing; on-trade led' },
      { country: 'Germany', growth: '+8%', share: '2.5%', note: 'Margarita boom; off-trade growth' },
    ],
    climate: {
      region: 'Jalisco (Tequila Valley & Highlands)',
      crop: 'Blue Weber Agave',
      currentTemp: '24\u00b0C', rainfall: '920mm', status: 'Normal',
      yieldForecast: '+3%', riskLevel: 'Low',
      historicalYield: [{ yr: '2021', v: 1.42 }, { yr: '2022', v: 1.45 }, { yr: '2023', v: 1.51 }, { yr: '2024', v: 1.55 }, { yr: '2025', v: 1.60 }],
      note: 'Oversupply conditions; 2.3M ton surplus. Favorable growing conditions.'
    },
    venueSignals: [
      { venue: 'Handshake Speakeasy (Mexico City)', rank: '#2 World 50 Best', signal: 'Mezcal-forward menu expanding' },
      { venue: 'Licorer\u00eda Limantour (Mexico City)', rank: '#7 World 50 Best', signal: 'Tequila cocktail innovation hub' },
      { venue: 'Dante (New York)', rank: '#15 World 50 Best', signal: 'Premium tequila flights on menu' },
      { venue: 'Tayēr + Elementary (London)', rank: '#3 World 50 Best', signal: 'Agave spirits featuring in seasonal menu' },
    ],
    posEstimate: { starterKit: '\u00a32,500', premiumKit: '\u00a35,800', factoryDirect: 'Shenzhen / Guadalajara', leadTime: '4-6 weeks' },
    keyInsight: 'The agave surplus creates a rare window: input costs are at 5-year lows while consumer demand for premium tequila continues to accelerate. The ideal entry point for a new premium tequila brand is NOW, before surplus contracts and prices rebound. Focus on the \u00a330-38 white space in UK pricing.',
  },

  vodka: {
    name: 'Vodka',
    emoji: '\ud83c\uddf7\ud83c\uddfa',
    marketSize: '$40.1B', growth: '-0.8%', volume: '530M 9L cases', dir: 'down',
    fiveYear: [{ yr: '2021', v: 42.0 }, { yr: '2022', v: 41.5 }, { yr: '2023', v: 41.2 }, { yr: '2024', v: 40.8 }, { yr: '2025', v: 40.1 }],
    channels: { onTrade: 30, offTrade: 52, eCommerce: 10, travelRetail: 8 },
    supplyChain: [
      { input: 'EU Wheat', value: '\u00a3210/t', change: '+3%', dir: 'up', trend: [200, 201, 203, 204, 205, 206, 207, 208, 209, 209, 210, 210], alert: 'green' },
      { input: 'EU Ethanol', value: '\u20ac0.68/L', change: '+4%', dir: 'up', trend: [0.64, 0.64, 0.65, 0.65, 0.66, 0.66, 0.67, 0.67, 0.67, 0.68, 0.68, 0.68], alert: 'amber' },
      { input: 'Glass Bottles (PPI)', value: '216.4', change: '+2.1%', dir: 'up', trend: [210, 211, 212, 213, 213, 214, 214, 215, 215, 216, 216, 216], alert: 'amber' },
      { input: 'Drewry WCI Freight', value: '$3,421/box', change: '+110%', dir: 'up', trend: [1630, 1820, 2100, 2450, 2680, 2900, 3050, 3150, 3250, 3350, 3400, 3421], alert: 'red' },
    ],
    cogsEstimate: { raw: 1.20, glass: 1.80, closure: 0.55, freight: 2.80, duty: 8.05, production: 1.50, overheads: 1.80, total: 17.70, margin: 36.8 },
    pricing: {
      highEnd: [
        { brand: 'Belvedere 10', price: '\u00a3145.00', segment: 'Ultra Premium' },
        { brand: 'Grey Goose Interpreted', price: '\u00a364.99', segment: 'Super Premium' },
        { brand: 'Chopin Family Reserve', price: '\u00a358.99', segment: 'Super Premium' },
      ],
      midTier: [
        { brand: 'Grey Goose', price: '\u00a335.99', segment: 'Premium' },
        { brand: 'Belvedere', price: '\u00a332.99', segment: 'Premium' },
        { brand: 'Ketel One', price: '\u00a328.99', segment: 'Premium' },
        { brand: 'Absolut Elyx', price: '\u00a334.99', segment: 'Premium' },
      ],
      value: [
        { brand: 'Absolut', price: '\u00a320.99', segment: 'Standard' },
        { brand: 'Smirnoff', price: '\u00a315.99', segment: 'Standard' },
        { brand: 'Stolichnaya', price: '\u00a319.99', segment: 'Standard' },
      ],
      whiteSpace: 'Flavored premium (\u00a325-30) and craft small-batch (\u00a340-50) segments growing'
    },
    topMarkets: [
      { country: 'USA', growth: '-1.2%', share: '32%', note: 'Volume decline; premium offsetting' },
      { country: 'Russia', growth: '-0.5%', share: '18%', note: 'Domestic consumption stable' },
      { country: 'Poland', growth: '+1.5%', share: '8%', note: 'Craft vodka movement' },
      { country: 'UK', growth: '-0.3%', share: '6%', note: 'Gin stealing share' },
      { country: 'India', growth: '+5.2%', share: '4%', note: 'Premium growth from low base' },
    ],
    climate: {
      region: 'Multiple (wheat/potato growing regions)',
      crop: 'Wheat, Rye, Potato',
      currentTemp: 'Various', rainfall: 'Various', status: 'Normal',
      yieldForecast: 'Stable', riskLevel: 'Low',
      historicalYield: [{ yr: '2021', v: 2.1 }, { yr: '2022', v: 2.0 }, { yr: '2023', v: 2.1 }, { yr: '2024', v: 2.1 }, { yr: '2025', v: 2.1 }],
      note: 'Grain supply abundant; no material supply risk for vodka production.'
    },
    venueSignals: [
      { venue: 'Bar Convent Berlin', rank: 'Trade Show', signal: 'Craft vodka tastings increasing' },
      { venue: 'Artesian (London)', rank: '#5 World 50 Best', signal: 'Vodka-based cocktails resurgence' },
    ],
    posEstimate: { starterKit: '\u00a32,200', premiumKit: '\u00a34,500', factoryDirect: 'Shenzhen / Warsaw', leadTime: '4-6 weeks' },
    keyInsight: 'Vodka is in structural volume decline but premiumization is creating margin opportunity. The category needs brand storytelling and provenance narratives (Polish heritage, small-batch, single-estate) to compete with gin and tequila for mindshare. Flavored vodka and RTD vodka cocktails are the growth vectors.',
  },

  gin: {
    name: 'Gin',
    emoji: '\ud83c\uddec\ud83c\udde7',
    marketSize: '$14.2B', growth: '+1.2%', volume: '95M 9L cases', dir: 'up',
    fiveYear: [{ yr: '2021', v: 12.8 }, { yr: '2022', v: 13.2 }, { yr: '2023', v: 13.5 }, { yr: '2024', v: 13.9 }, { yr: '2025', v: 14.2 }],
    channels: { onTrade: 38, offTrade: 40, eCommerce: 13, travelRetail: 9 },
    supplyChain: [
      { input: 'Juniper Berries', value: '\u20ac12/kg', change: '+5%', dir: 'up', trend: [11.0, 11.1, 11.2, 11.3, 11.5, 11.6, 11.7, 11.8, 11.9, 12.0, 12.0, 12.0], alert: 'amber' },
      { input: 'Neutral Grain Spirit', value: '\u20ac0.68/L', change: '+4%', dir: 'up', trend: [0.64, 0.64, 0.65, 0.65, 0.66, 0.66, 0.67, 0.67, 0.67, 0.68, 0.68, 0.68], alert: 'amber' },
      { input: 'Glass Bottles (PPI)', value: '216.4', change: '+2.1%', dir: 'up', trend: [210, 211, 212, 213, 213, 214, 214, 215, 215, 216, 216, 216], alert: 'amber' },
      { input: 'Drewry WCI Freight', value: '$3,421/box', change: '+110%', dir: 'up', trend: [1630, 1820, 2100, 2450, 2680, 2900, 3050, 3150, 3250, 3350, 3400, 3421], alert: 'red' },
    ],
    cogsEstimate: { raw: 1.80, glass: 1.80, closure: 0.60, freight: 2.80, duty: 8.05, production: 1.80, overheads: 1.90, total: 18.75, margin: 39.3 },
    pricing: {
      highEnd: [
        { brand: 'Monkey 47 Distiller\u2019s Cut', price: '\u00a389.99', segment: 'Ultra Premium' },
        { brand: 'Hendrick\u2019s Grand Cabaret', price: '\u00a345.99', segment: 'Super Premium' },
        { brand: 'Ki No Bi', price: '\u00a349.99', segment: 'Super Premium' },
      ],
      midTier: [
        { brand: 'Hendrick\u2019s', price: '\u00a331.99', segment: 'Premium' },
        { brand: 'Tanqueray No. Ten', price: '\u00a328.99', segment: 'Premium' },
        { brand: 'Sipsmith', price: '\u00a326.99', segment: 'Premium' },
        { brand: 'Roku', price: '\u00a327.99', segment: 'Premium' },
      ],
      value: [
        { brand: 'Gordon\u2019s', price: '\u00a314.99', segment: 'Standard' },
        { brand: 'Beefeater', price: '\u00a316.99', segment: 'Standard' },
        { brand: 'Tanqueray', price: '\u00a320.99', segment: 'Standard' },
      ],
      whiteSpace: 'Pink/flavored gin (\u00a320-28) is saturated; Japanese-style gin (\u00a335-50) is growing'
    },
    topMarkets: [
      { country: 'UK', growth: '+0.5%', share: '28%', note: 'Mature market; craft peaked' },
      { country: 'Spain', growth: '+2.8%', share: '15%', note: 'Gin & tonic culture strong' },
      { country: 'USA', growth: '+3.5%', share: '12%', note: 'Craft gin awareness growing' },
      { country: 'Philippines', growth: '+1.0%', share: '10%', note: 'Volume market; Ginebra San Miguel' },
      { country: 'Germany', growth: '+4.2%', share: '6%', note: 'Gin bars proliferating' },
    ],
    climate: {
      region: 'Southern Europe / Balkans (Juniper)',
      crop: 'Juniper Berries, Botanicals',
      currentTemp: '18\u00b0C', rainfall: '650mm', status: 'Normal',
      yieldForecast: 'Stable', riskLevel: 'Low',
      historicalYield: [{ yr: '2021', v: 0.85 }, { yr: '2022', v: 0.82 }, { yr: '2023', v: 0.88 }, { yr: '2024', v: 0.86 }, { yr: '2025', v: 0.87 }],
      note: 'Juniper supply stable but wild-harvested; climate change may affect availability long-term.'
    },
    venueSignals: [
      { venue: 'Atlas (Singapore)', rank: '#8 World 50 Best', signal: 'World\u2019s largest gin collection; craft gin flights' },
      { venue: 'Connaught Bar (London)', rank: '#1 World 50 Best', signal: 'Signature martini programme' },
    ],
    posEstimate: { starterKit: '\u00a32,200', premiumKit: '\u00a35,000', factoryDirect: 'Shenzhen / London', leadTime: '4-6 weeks' },
    keyInsight: 'Gin\u2019s explosive growth phase (2016-2021) has plateaued. The market is crowded with 6,000+ brands globally. Success now requires extreme differentiation: Japanese botanicals, provenance stories, or functional gin (adaptogens, CBD-adjacent). The \u00a335-50 Japanese-style segment offers the clearest growth opportunity.',
  },

  whisky: {
    name: 'Whisky (Global)',
    emoji: '\ud83c\uddf0\ud83c\uddec',
    marketSize: '$6.3B', growth: '+4.2%', volume: '140M 9L cases', dir: 'up',
    fiveYear: [{ yr: '2021', v: 5.1 }, { yr: '2022', v: 5.4 }, { yr: '2023', v: 5.7 }, { yr: '2024', v: 6.0 }, { yr: '2025', v: 6.3 }],
    channels: { onTrade: 33, offTrade: 40, eCommerce: 14, travelRetail: 13 },
    supplyChain: [
      { input: 'EU Malting Barley', value: '\u20ac224/t', change: '+12%', dir: 'up', trend: [195, 198, 202, 206, 210, 213, 216, 218, 220, 222, 223, 224], alert: 'amber' },
      { input: 'French Oak Barrels', value: '\u20ac900/barrel', change: '+1%', dir: 'up', trend: [890, 891, 892, 893, 894, 895, 896, 897, 898, 899, 900, 900], alert: 'green' },
      { input: 'Glass Bottles (PPI)', value: '216.4', change: '+2.1%', dir: 'up', trend: [210, 211, 212, 213, 213, 214, 214, 215, 215, 216, 216, 216], alert: 'amber' },
      { input: 'Drewry WCI Freight', value: '$3,421/box', change: '+110%', dir: 'up', trend: [1630, 1820, 2100, 2450, 2680, 2900, 3050, 3150, 3250, 3350, 3400, 3421], alert: 'red' },
    ],
    cogsEstimate: { raw: 3.50, glass: 2.20, closure: 0.65, freight: 3.20, duty: 8.05, production: 3.50, overheads: 2.40, total: 23.50, margin: 41.2 },
    pricing: {
      highEnd: [
        { brand: 'Yamazaki 18', price: '\u00a3350.00', segment: 'Ultra Premium' },
        { brand: 'Macallan 18 Sherry', price: '\u00a3245.00', segment: 'Ultra Premium' },
        { brand: 'Hibiki 21', price: '\u00a3450.00', segment: 'Ultra Premium' },
      ],
      midTier: [
        { brand: 'Glenlivet 15', price: '\u00a352.99', segment: 'Premium' },
        { brand: 'Monkey Shoulder', price: '\u00a326.99', segment: 'Premium' },
        { brand: 'Nikka From The Barrel', price: '\u00a334.99', segment: 'Premium' },
        { brand: 'Redbreast 12', price: '\u00a345.99', segment: 'Premium' },
      ],
      value: [
        { brand: 'Jameson', price: '\u00a322.99', segment: 'Standard' },
        { brand: 'Famous Grouse', price: '\u00a315.99', segment: 'Standard' },
        { brand: 'Jack Daniel\u2019s', price: '\u00a323.99', segment: 'Standard' },
      ],
      whiteSpace: 'Japanese whisky (\u00a350-100) and Irish single pot still (\u00a340-65) growing fastest'
    },
    topMarkets: [
      { country: 'USA', growth: '+3.8%', share: '35%', note: 'Bourbon + Japanese driving' },
      { country: 'India', growth: '+8%', share: '12%', note: 'Single malt boom from middle class' },
      { country: 'France', growth: '+2.1%', share: '8%', note: 'Scotch heritage market' },
      { country: 'Japan', growth: '+5%', share: '6%', note: 'Domestic premium resurgence' },
      { country: 'UK', growth: '+1.8%', share: '10%', note: 'Scotch stable; Irish growing' },
    ],
    climate: {
      region: 'Scotland / Japan / Ireland / Kentucky',
      crop: 'Malting Barley, Corn, Rye',
      currentTemp: '8\u00b0C (Scotland)', rainfall: '1,200mm', status: 'Normal',
      yieldForecast: 'Stable', riskLevel: 'Low',
      historicalYield: [{ yr: '2021', v: 5.8 }, { yr: '2022', v: 5.6 }, { yr: '2023', v: 5.9 }, { yr: '2024', v: 6.0 }, { yr: '2025', v: 6.1 }],
      note: 'Barley prices elevated but manageable. Scottish distillery capacity expansion ongoing.'
    },
    venueSignals: [
      { venue: 'Bar High Five (Tokyo)', rank: '#14 World 50 Best', signal: 'Japanese whisky highball culture' },
      { venue: 'The Clumsies (Athens)', rank: '#4 World 50 Best', signal: 'Whisky cocktail innovation' },
    ],
    posEstimate: { starterKit: '\u00a33,200', premiumKit: '\u00a37,500', factoryDirect: 'Edinburgh / Louisville', leadTime: '6-8 weeks' },
    keyInsight: 'Whisky is the most resilient spirits category with consistent growth across sub-categories. The opportunity is in Japanese whisky (supply-constrained, massive premiums), Irish single pot still (underexplored outside Ireland), and Indian single malt (Amrut, Paul John showing export potential). Barley cost pressure is manageable at current levels.',
  },

  rum: {
    name: 'Rum',
    emoji: '\ud83c\uddf1\ud83c\uddf0',
    marketSize: '$15.8B', growth: '+3.1%', volume: '180M 9L cases', dir: 'up',
    fiveYear: [{ yr: '2021', v: 13.8 }, { yr: '2022', v: 14.2 }, { yr: '2023', v: 14.8 }, { yr: '2024', v: 15.3 }, { yr: '2025', v: 15.8 }],
    channels: { onTrade: 34, offTrade: 44, eCommerce: 11, travelRetail: 11 },
    supplyChain: [
      { input: 'Raw Sugar (ICE #11)', value: '22.4\u00a2/lb', change: '+8%', dir: 'up', trend: [20.0, 20.2, 20.5, 20.8, 21.0, 21.3, 21.5, 21.8, 22.0, 22.2, 22.3, 22.4], alert: 'amber' },
      { input: 'French Oak Barrels', value: '\u20ac900/barrel', change: '+1%', dir: 'up', trend: [890, 891, 892, 893, 894, 895, 896, 897, 898, 899, 900, 900], alert: 'green' },
      { input: 'Glass Bottles (PPI)', value: '216.4', change: '+2.1%', dir: 'up', trend: [210, 211, 212, 213, 213, 214, 214, 215, 215, 216, 216, 216], alert: 'amber' },
      { input: 'Drewry WCI Freight', value: '$3,421/box', change: '+110%', dir: 'up', trend: [1630, 1820, 2100, 2450, 2680, 2900, 3050, 3150, 3250, 3350, 3400, 3421], alert: 'red' },
    ],
    cogsEstimate: { raw: 2.80, glass: 1.80, closure: 0.60, freight: 3.40, duty: 8.05, production: 2.50, overheads: 2.00, total: 21.15, margin: 39.6 },
    pricing: {
      highEnd: [
        { brand: 'Appleton Estate 21', price: '\u00a389.99', segment: 'Ultra Premium' },
        { brand: 'Diplomatico Ambassador', price: '\u00a3175.00', segment: 'Ultra Premium' },
        { brand: 'Foursquare Exceptional Cask', price: '\u00a365.99', segment: 'Super Premium' },
      ],
      midTier: [
        { brand: 'Diplomatico Reserva', price: '\u00a336.99', segment: 'Premium' },
        { brand: 'Ron Zacapa 23', price: '\u00a342.99', segment: 'Premium' },
        { brand: 'Mount Gay XO', price: '\u00a344.99', segment: 'Premium' },
      ],
      value: [
        { brand: 'Havana Club 3', price: '\u00a318.99', segment: 'Standard' },
        { brand: 'Bacardi Carta Blanca', price: '\u00a315.99', segment: 'Standard' },
        { brand: 'Captain Morgan', price: '\u00a317.99', segment: 'Standard' },
      ],
      whiteSpace: 'Premium aged dark rum (\u00a335-55) has the strongest growth trajectory'
    },
    topMarkets: [
      { country: 'USA', growth: '+2.5%', share: '22%', note: 'Premium dark rum trending' },
      { country: 'India', growth: '+4.8%', share: '15%', note: 'Largest volume market globally' },
      { country: 'UK', growth: '+3.2%', share: '8%', note: 'Spiced rum maturing; aged growing' },
      { country: 'France', growth: '+1.5%', share: '7%', note: 'Rh\u00f4ne\u00e9 heritage; Caribbean connection' },
      { country: 'Germany', growth: '+5.0%', share: '5%', note: 'Premium rum bars emerging' },
    ],
    climate: {
      region: 'Caribbean / Central America / Indian Ocean',
      crop: 'Sugarcane, Molasses',
      currentTemp: '28\u00b0C', rainfall: '1,500mm', status: 'Normal',
      yieldForecast: '+2%', riskLevel: 'Low',
      historicalYield: [{ yr: '2021', v: 78 }, { yr: '2022', v: 80 }, { yr: '2023', v: 79 }, { yr: '2024', v: 81 }, { yr: '2025', v: 82 }],
      note: 'Sugarcane supply stable. Sugar price increases driven by ethanol demand, not crop failure.'
    },
    venueSignals: [
      { venue: 'Licorer\u00eda Limantour', rank: '#7 World 50 Best', signal: 'Caribbean rum cocktails featured' },
      { venue: 'Maybe Sammy (Sydney)', rank: '#22 World 50 Best', signal: 'Tiki revival with premium rums' },
    ],
    posEstimate: { starterKit: '\u00a32,400', premiumKit: '\u00a35,500', factoryDirect: 'Shenzhen / Barbados', leadTime: '4-6 weeks' },
    keyInsight: 'Rum is having its whisky moment \u2014 consumers are discovering aged, sipping rums with provenance stories. The Foursquare effect (Barbados single-estate) proves that rum can command whisky-level premiums. The \u00a335-55 premium aged segment is where new brands should enter. Sugar cost pressure is manageable.',
  },

  cognac: {
    name: 'Cognac & Brandy',
    emoji: '\ud83c\uddeb\ud83c\uddf7',
    marketSize: '$4.1B', growth: '-2.4%', volume: '22M 9L cases', dir: 'down',
    fiveYear: [{ yr: '2021', v: 5.0 }, { yr: '2022', v: 4.8 }, { yr: '2023', v: 4.6 }, { yr: '2024', v: 4.3 }, { yr: '2025', v: 4.1 }],
    channels: { onTrade: 28, offTrade: 38, eCommerce: 12, travelRetail: 22 },
    supplyChain: [
      { input: 'Champagne Grapes (Ugni Blanc)', value: '\u20ac7.50/kg', change: '+9%', dir: 'up', trend: [6.5, 6.6, 6.8, 6.9, 7.0, 7.1, 7.2, 7.3, 7.3, 7.4, 7.5, 7.5], alert: 'amber' },
      { input: 'French Oak Barrels', value: '\u20ac900/barrel', change: '+1%', dir: 'up', trend: [890, 891, 892, 893, 894, 895, 896, 897, 898, 899, 900, 900], alert: 'green' },
      { input: 'Glass Bottles (PPI)', value: '216.4', change: '+2.1%', dir: 'up', trend: [210, 211, 212, 213, 213, 214, 214, 215, 215, 216, 216, 216], alert: 'amber' },
      { input: 'Drewry WCI Freight', value: '$3,421/box', change: '+110%', dir: 'up', trend: [1630, 1820, 2100, 2450, 2680, 2900, 3050, 3150, 3250, 3350, 3400, 3421], alert: 'red' },
    ],
    cogsEstimate: { raw: 4.50, glass: 2.50, closure: 0.70, freight: 3.20, duty: 8.05, production: 4.00, overheads: 2.80, total: 25.75, margin: 48.5 },
    pricing: {
      highEnd: [
        { brand: 'R\u00e9my Martin Louis XIII', price: '\u00a32,800', segment: 'Ultra Premium' },
        { brand: 'Hennessy Paradis', price: '\u00a3750', segment: 'Ultra Premium' },
        { brand: 'Courvoisier Initiale Extra', price: '\u00a3180', segment: 'Super Premium' },
      ],
      midTier: [
        { brand: 'R\u00e9my Martin VSOP', price: '\u00a338.99', segment: 'Premium' },
        { brand: 'Hennessy VS', price: '\u00a332.99', segment: 'Premium' },
        { brand: 'Martell VSOP', price: '\u00a336.99', segment: 'Premium' },
      ],
      value: [
        { brand: 'Courvoisier VS', price: '\u00a324.99', segment: 'Standard' },
        { brand: 'Hennessy VS (50ml)', price: '\u00a35.99', segment: 'Standard' },
      ],
      whiteSpace: 'Emerging brandy (Peruvian pisco, South African brandy) at \u00a325-40 challenging cognac'
    },
    topMarkets: [
      { country: 'USA', growth: '-1.5%', share: '48%', note: 'Hip-hop culture sustaining but softening' },
      { country: 'China', growth: '-15%', share: '18%', note: '30% import duty crushing demand' },
      { country: 'Singapore', growth: '+2%', share: '5%', note: 'Travel retail hub; stable' },
      { country: 'UK', growth: '+0.5%', share: '4%', note: 'Cocktail culture supporting VS/VSOP' },
      { country: 'Nigeria', growth: '+8%', share: '3%', note: 'Growing luxury market' },
    ],
    climate: {
      region: 'Cognac, France (Charente)',
      crop: 'Ugni Blanc grapes',
      currentTemp: '14\u00b0C', rainfall: '780mm', status: 'Stressed',
      yieldForecast: '-5%', riskLevel: 'Medium',
      historicalYield: [{ yr: '2021', v: 7.2 }, { yr: '2022', v: 6.8 }, { yr: '2023', v: 7.0 }, { yr: '2024', v: 6.5 }, { yr: '2025', v: 6.2 }],
      note: 'French wine production -16% vs 5yr avg. Heat and drought impacting yields. Grape costs rising.'
    },
    venueSignals: [
      { venue: 'Connaught Bar (London)', rank: '#1 World 50 Best', signal: 'Cognac cocktail programme expanding' },
    ],
    posEstimate: { starterKit: '\u00a34,000', premiumKit: '\u00a39,000', factoryDirect: 'Cognac / Paris', leadTime: '8-10 weeks' },
    keyInsight: 'Cognac faces a dual headwind: China tariffs (30%) have decimated the largest export market, and French grape yields are declining. R\u00e9my Cointreau is most exposed. However, the ultra-premium segment remains resilient \u2014 Louis XIII and XO bottles continue to sell. New entrants should consider emerging brandy (pisco, Armagnac, South African) rather than cognac itself.',
  },

  champagne: {
    name: 'Champagne & Sparkling',
    emoji: '\ud83c\uddeb\ud83c\uddf7',
    marketSize: '$7.2B', growth: '+2.8%', volume: '325M bottles', dir: 'up',
    fiveYear: [{ yr: '2021', v: 6.2 }, { yr: '2022', v: 6.5 }, { yr: '2023', v: 6.8 }, { yr: '2024', v: 7.0 }, { yr: '2025', v: 7.2 }],
    channels: { onTrade: 40, offTrade: 35, eCommerce: 10, travelRetail: 15 },
    supplyChain: [
      { input: 'Champagne Grapes', value: '\u20ac7.50/kg', change: '+9%', dir: 'up', trend: [6.5, 6.6, 6.8, 6.9, 7.0, 7.1, 7.2, 7.3, 7.3, 7.4, 7.5, 7.5], alert: 'amber' },
      { input: 'Glass Bottles (PPI)', value: '216.4', change: '+2.1%', dir: 'up', trend: [210, 211, 212, 213, 213, 214, 214, 215, 215, 216, 216, 216], alert: 'amber' },
      { input: 'Cork/Closures', value: '\u20ac0.45/unit', change: '+3%', dir: 'up', trend: [0.42, 0.42, 0.43, 0.43, 0.43, 0.44, 0.44, 0.44, 0.45, 0.45, 0.45, 0.45], alert: 'green' },
    ],
    cogsEstimate: { raw: 5.00, glass: 2.20, closure: 0.80, freight: 3.00, duty: 8.05, production: 3.50, overheads: 2.50, total: 25.05, margin: 45.2 },
    pricing: {
      highEnd: [
        { brand: 'Dom P\u00e9rignon', price: '\u00a3160', segment: 'Ultra Premium' },
        { brand: 'Krug Grande Cuv\u00e9e', price: '\u00a3165', segment: 'Ultra Premium' },
        { brand: 'Louis Roederer Cristal', price: '\u00a3220', segment: 'Ultra Premium' },
      ],
      midTier: [
        { brand: 'Mo\u00ebt & Chandon Imp\u00e9rial', price: '\u00a338.99', segment: 'Premium' },
        { brand: 'Veuve Clicquot Yellow Label', price: '\u00a342.99', segment: 'Premium' },
        { brand: 'Bollinger Special Cuv\u00e9e', price: '\u00a345.99', segment: 'Premium' },
      ],
      value: [
        { brand: 'Prosecco (avg)', price: '\u00a39.99', segment: 'Standard' },
        { brand: 'Cava (avg)', price: '\u00a37.99', segment: 'Standard' },
        { brand: 'Cr\u00e9mant (avg)', price: '\u00a312.99', segment: 'Standard' },
      ],
      whiteSpace: 'English sparkling (\u00a325-45) and Franciacorta (\u00a318-30) are premium alternatives'
    },
    topMarkets: [
      { country: 'France', growth: '+1.0%', share: '45%', note: 'Domestic; Prosecco competing' },
      { country: 'UK', growth: '+3.5%', share: '12%', note: 'English sparkling emerging' },
      { country: 'USA', growth: '+4.0%', share: '18%', note: 'Prosecco dominating volume' },
      { country: 'Japan', growth: '+2.5%', share: '5%', note: 'Celebration culture; stable' },
      { country: 'Australia', growth: '+3.0%', share: '4%', note: 'Premium sparkling growing' },
    ],
    climate: {
      region: 'Champagne, France / Veneto, Italy',
      crop: 'Chardonnay, Pinot Noir, Glera',
      currentTemp: '12\u00b0C', rainfall: '650mm', status: 'Variable',
      yieldForecast: '-3%', riskLevel: 'Medium',
      historicalYield: [{ yr: '2021', v: 10.2 }, { yr: '2022', v: 9.8 }, { yr: '2023', v: 10.1 }, { yr: '2024', v: 9.5 }, { yr: '2025', v: 9.2 }],
      note: 'Champagne yields declining due to climate. Prosecco production stable in Veneto.'
    },
    venueSignals: [
      { venue: 'Connaught Bar (London)', rank: '#1 World 50 Best', signal: 'Champagne by the glass programme' },
      { venue: 'Sips (Barcelona)', rank: '#6 World 50 Best', signal: 'Sparkling cocktail innovation' },
    ],
    posEstimate: { starterKit: '\u00a33,500', premiumKit: '\u00a38,000', factoryDirect: '\u00c9pernay / Treviso', leadTime: '6-8 weeks' },
    keyInsight: 'Champagne faces structural pressure from Prosecco (volume) and English sparkling (prestige). The growth is in sparkling wine broadly, not Champagne specifically. English sparkling is the investable opportunity \u2014 Sussex terroir producing competitive quality at \u00a325-45 vs \u00a340+ for equivalent Champagne. Climate change is actually benefiting English viticulture.',
  },

  wine: {
    name: 'Wine (Still)',
    emoji: '\ud83c\uddee\ud83c\uddf9',
    marketSize: '$38.2B', growth: '-1.2%', volume: '2.4B 9L cases', dir: 'down',
    fiveYear: [{ yr: '2021', v: 40.1 }, { yr: '2022', v: 39.8 }, { yr: '2023', v: 39.2 }, { yr: '2024', v: 38.6 }, { yr: '2025', v: 38.2 }],
    channels: { onTrade: 32, offTrade: 50, eCommerce: 12, travelRetail: 6 },
    supplyChain: [
      { input: 'Bordeaux Grapes', value: '\u20ac1.80/kg', change: '+2%', dir: 'up', trend: [1.72, 1.73, 1.74, 1.75, 1.76, 1.77, 1.78, 1.78, 1.79, 1.80, 1.80, 1.80], alert: 'green' },
      { input: 'Glass Bottles (PPI)', value: '216.4', change: '+2.1%', dir: 'up', trend: [210, 211, 212, 213, 213, 214, 214, 215, 215, 216, 216, 216], alert: 'amber' },
      { input: 'Cork/Closures', value: '\u20ac0.45/unit', change: '+3%', dir: 'up', trend: [0.42, 0.42, 0.43, 0.43, 0.43, 0.44, 0.44, 0.44, 0.45, 0.45, 0.45, 0.45], alert: 'green' },
    ],
    cogsEstimate: { raw: 2.50, glass: 1.50, closure: 0.45, freight: 2.20, duty: 2.67, production: 1.80, overheads: 1.50, total: 12.62, margin: 36.8 },
    pricing: {
      highEnd: [
        { brand: 'Ch\u00e2teau Margaux 2018', price: '\u00a3450+', segment: 'Ultra Premium' },
        { brand: 'Opus One', price: '\u00a3320', segment: 'Ultra Premium' },
      ],
      midTier: [
        { brand: 'Cloudy Bay Sauvignon Blanc', price: '\u00a316.99', segment: 'Premium' },
        { brand: 'Whispering Angel Ros\u00e9', price: '\u00a318.99', segment: 'Premium' },
      ],
      value: [
        { brand: 'Barefoot (avg)', price: '\u00a36.99', segment: 'Standard' },
        { brand: 'Yellow Tail (avg)', price: '\u00a37.49', segment: 'Standard' },
      ],
      whiteSpace: 'Natural/biodynamic wines (\u00a312-25) and wine-in-a-can (\u00a34-8) are growth vectors'
    },
    topMarkets: [
      { country: 'USA', growth: '-0.5%', share: '15%', note: 'Volume declining; premiumization' },
      { country: 'France', growth: '-2.0%', share: '14%', note: 'Structural decline continues' },
      { country: 'Italy', growth: '-1.5%', share: '12%', note: 'Domestic consumption falling' },
      { country: 'China', growth: '-8%', share: '6%', note: 'Australian tariffs + preferences shifting' },
      { country: 'UK', growth: '+0.5%', share: '8%', note: 'Ros\u00e9 and natural wine growing' },
    ],
    climate: {
      region: 'Global (Bordeaux, Napa, Barossa, Mendoza)',
      crop: 'Grapes (Cabernet, Chardonnay, Pinot Noir, etc.)',
      currentTemp: 'Various', rainfall: 'Various', status: 'Stressed',
      yieldForecast: '-5%', riskLevel: 'High',
      historicalYield: [{ yr: '2021', v: 260 }, { yr: '2022', v: 248 }, { yr: '2023', v: 255 }, { yr: '2024', v: 242 }, { yr: '2025', v: 238 }],
      note: 'Global wine production at lowest point in decades. Climate change reshaping traditional regions.'
    },
    venueSignals: [],
    posEstimate: { starterKit: '\u00a31,800', premiumKit: '\u00a34,000', factoryDirect: 'Bordeaux / Mendoza', leadTime: '4-6 weeks' },
    keyInsight: 'Still wine is in secular decline. The younger generation drinks less wine and more spirits/RTD. The investable niches are: natural/biodynamic (narrative-driven, premium pricing), wine-in-a-can (convenience, younger demographic), and English still wine (emerging quality). Avoid volume plays.',
  },

  beer: {
    name: 'Beer & Craft',
    emoji: '\ud83c\udde9\ud83c\uddea',
    marketSize: '$623B', growth: '+1.4%', volume: '1.86B hL', dir: 'up',
    fiveYear: [{ yr: '2021', v: 590 }, { yr: '2022', v: 600 }, { yr: '2023', v: 608 }, { yr: '2024', v: 615 }, { yr: '2025', v: 623 }],
    channels: { onTrade: 45, offTrade: 42, eCommerce: 8, travelRetail: 5 },
    supplyChain: [
      { input: 'EU Malting Barley', value: '\u20ac224/t', change: '+12%', dir: 'up', trend: [195, 198, 202, 206, 210, 213, 216, 218, 220, 222, 223, 224], alert: 'amber' },
      { input: 'LME Aluminum', value: '$2,350/t', change: '+8%', dir: 'up', trend: [2100, 2120, 2150, 2180, 2200, 2230, 2260, 2290, 2310, 2330, 2340, 2350], alert: 'amber' },
      { input: 'EU Natural Gas (TTF)', value: '\u20ac48.2/MWh', change: '+15%', dir: 'up', trend: [40, 41, 42, 43, 44, 45, 46, 46, 47, 47, 48, 48], alert: 'amber' },
    ],
    cogsEstimate: { raw: 0.80, glass: 0.50, closure: 0.15, freight: 0.60, duty: 0.52, production: 0.40, overheads: 0.30, total: 3.27, margin: 35.0 },
    pricing: {
      highEnd: [
        { brand: 'Westvleteren 12', price: '\u00a312/bottle', segment: 'Ultra Premium' },
        { brand: 'Cloudwater DIPA', price: '\u00a36.50/can', segment: 'Super Premium' },
      ],
      midTier: [
        { brand: 'BrewDog Punk IPA', price: '\u00a32.00/can', segment: 'Premium' },
        { brand: 'Camden Hells', price: '\u00a32.20/can', segment: 'Premium' },
      ],
      value: [
        { brand: 'Heineken', price: '\u00a31.20/can', segment: 'Standard' },
        { brand: 'Budweiser', price: '\u00a31.00/can', segment: 'Standard' },
      ],
      whiteSpace: 'Non-alc craft beer (\u00a31.50-3.00) and hard seltzer crossover'
    },
    topMarkets: [
      { country: 'China', growth: '-0.5%', share: '22%', note: 'Volume declining; craft emerging' },
      { country: 'USA', growth: '+0.8%', share: '18%', note: 'Craft consolidation; Mexican imports strong' },
      { country: 'Brazil', growth: '+3.0%', share: '8%', note: 'Premium craft boom' },
      { country: 'Germany', growth: '-1.0%', share: '6%', note: 'Purity law tradition; volume flat' },
      { country: 'UK', growth: '+1.2%', share: '5%', note: 'Craft maturing; lager dominating' },
    ],
    climate: {
      region: 'Global (barley/hops regions)',
      crop: 'Barley, Hops, Wheat',
      currentTemp: 'Various', rainfall: 'Various', status: 'Normal',
      yieldForecast: 'Stable', riskLevel: 'Low',
      historicalYield: [{ yr: '2021', v: 144 }, { yr: '2022', v: 142 }, { yr: '2023', v: 146 }, { yr: '2024', v: 145 }, { yr: '2025', v: 147 }],
      note: 'Barley supply adequate globally. Hops experiencing some varietal shortages but manageable.'
    },
    venueSignals: [],
    posEstimate: { starterKit: '\u00a31,500', premiumKit: '\u00a33,500', factoryDirect: 'Shenzhen / Local', leadTime: '3-4 weeks' },
    keyInsight: 'Beer is a volume game with thin margins. The craft segment is consolidating rapidly (47 acquisitions in Q4 alone). For new entrants, the opportunity is in non-alcoholic craft beer or hyper-local microbreweries with strong community narratives. Avoid competing at scale with AB InBev or Heineken.',
  },

  nolo: {
    name: 'No/Lo Alcohol',
    emoji: '\ud83c\udf3f',
    marketSize: '$13B', growth: '+7.5%', volume: '310M 9L cases', dir: 'up',
    fiveYear: [{ yr: '2021', v: 8.5 }, { yr: '2022', v: 9.8 }, { yr: '2023', v: 11.0 }, { yr: '2024', v: 12.2 }, { yr: '2025', v: 13.0 }],
    channels: { onTrade: 25, offTrade: 48, eCommerce: 22, travelRetail: 5 },
    supplyChain: [
      { input: 'Botanicals/Extracts', value: 'Various', change: '+3%', dir: 'up', trend: [100, 100, 101, 101, 102, 102, 103, 103, 103, 103, 103, 103], alert: 'green' },
      { input: 'Glass Bottles (PPI)', value: '216.4', change: '+2.1%', dir: 'up', trend: [210, 211, 212, 213, 213, 214, 214, 215, 215, 216, 216, 216], alert: 'amber' },
    ],
    cogsEstimate: { raw: 1.50, glass: 1.80, closure: 0.60, freight: 2.50, duty: 0.00, production: 2.00, overheads: 1.80, total: 10.20, margin: 57.6 },
    pricing: {
      highEnd: [
        { brand: 'Seedlip Grove', price: '\u00a326.99', segment: 'Super Premium' },
        { brand: 'Lyre\u2019s Italian Spritz', price: '\u00a324.99', segment: 'Super Premium' },
      ],
      midTier: [
        { brand: 'Monday Gin', price: '\u00a319.99', segment: 'Premium' },
        { brand: 'Ritual Zero Proof Tequila', price: '\u00a322.99', segment: 'Premium' },
      ],
      value: [
        { brand: 'Heineken 0.0', price: '\u00a34.50/4-pack', segment: 'Standard' },
        { brand: 'Gordon\u2019s 0.0', price: '\u00a312.99', segment: 'Standard' },
      ],
      whiteSpace: 'Functional spirits (adaptogens, nootropics) at \u00a318-28 is emerging fast'
    },
    topMarkets: [
      { country: 'Germany', growth: '+10%', share: '18%', note: 'Largest non-alc beer market' },
      { country: 'UK', growth: '+8%', share: '15%', note: 'Dry January driving trial' },
      { country: 'USA', growth: '+12%', share: '20%', note: 'Sober curious movement; DTC growth' },
      { country: 'Spain', growth: '+6%', share: '8%', note: 'Non-alc beer culture' },
      { country: 'Japan', growth: '+9%', share: '7%', note: 'Health consciousness driving' },
    ],
    climate: {
      region: 'N/A (mostly produced from extracts)',
      crop: 'Botanicals, Extracts',
      currentTemp: 'N/A', rainfall: 'N/A', status: 'Stable',
      yieldForecast: 'N/A', riskLevel: 'Very Low',
      historicalYield: [],
      note: 'No/Lo production largely independent of agricultural climate conditions.'
    },
    venueSignals: [
      { venue: 'Dandelyan successor (London)', rank: 'N/A', signal: 'Full non-alc cocktail menu' },
      { venue: 'Existing Conditions (New York)', rank: '#20 World 50 Best', signal: 'Zero-proof cocktail section' },
    ],
    posEstimate: { starterKit: '\u00a31,800', premiumKit: '\u00a34,000', factoryDirect: 'Shenzhen / UK', leadTime: '3-5 weeks' },
    keyInsight: 'No/Lo is the highest-margin opportunity in beverages. Zero duty, minimal agricultural input risk, and a consumer trend (sober curious, GLP-1 medication effects on alcohol consumption) that is accelerating. The category is fragmented \u2014 no clear winner has emerged. Speed to market matters more than brand heritage. Functional spirits (adaptogens, nootropics) could be the next wave.',
  },

  rtd: {
    name: 'RTD / Ready-to-Drink',
    emoji: '\ud83e\uddc3',
    marketSize: '$40B', growth: '+8.2%', volume: '680M 9L cases', dir: 'up',
    fiveYear: [{ yr: '2021', v: 25 }, { yr: '2022', v: 29 }, { yr: '2023', v: 33 }, { yr: '2024', v: 37 }, { yr: '2025', v: 40 }],
    channels: { onTrade: 20, offTrade: 55, eCommerce: 18, travelRetail: 7 },
    supplyChain: [
      { input: 'LME Aluminum', value: '$2,350/t', change: '+8%', dir: 'up', trend: [2100, 2120, 2150, 2180, 2200, 2230, 2260, 2290, 2310, 2330, 2340, 2350], alert: 'amber' },
      { input: 'Base Spirit (varies)', value: 'Various', change: '+3%', dir: 'up', trend: [100, 100, 101, 101, 102, 102, 103, 103, 103, 103, 103, 103], alert: 'green' },
      { input: 'Carbonation CO2', value: '\u20ac85/t', change: '+5%', dir: 'up', trend: [78, 79, 80, 81, 82, 82, 83, 84, 84, 85, 85, 85], alert: 'amber' },
    ],
    cogsEstimate: { raw: 0.60, glass: 0.00, closure: 0.30, freight: 1.80, duty: 1.50, production: 0.80, overheads: 0.60, total: 5.60, margin: 43.8 },
    pricing: {
      highEnd: [
        { brand: 'Whitebox Cocktails', price: '\u00a36.50/can', segment: 'Super Premium' },
        { brand: 'On The Rocks (Beam)', price: '\u00a35.99/bottle', segment: 'Super Premium' },
      ],
      midTier: [
        { brand: 'High Noon', price: '\u00a32.80/can', segment: 'Premium' },
        { brand: 'Cutwater', price: '\u00a33.50/can', segment: 'Premium' },
      ],
      value: [
        { brand: 'BuzzBallz', price: '\u00a32.50/unit', segment: 'Standard' },
        { brand: 'Jack & Coke (canned)', price: '\u00a32.20/can', segment: 'Standard' },
      ],
      whiteSpace: 'Premium cocktail-in-a-can (\u00a34-7) with spirit-brand credibility'
    },
    topMarkets: [
      { country: 'USA', growth: '+9%', share: '35%', note: 'Hard seltzer plateau; spirit-based RTD growing' },
      { country: 'Australia', growth: '+12%', share: '10%', note: 'RTD culture strongest globally' },
      { country: 'Japan', growth: '+6%', share: '15%', note: 'Chu-hi culture; Suntory dominating' },
      { country: 'UK', growth: '+15%', share: '5%', note: 'From low base; rapid adoption' },
      { country: 'Brazil', growth: '+18%', share: '3%', note: 'Emerging market; caipirinha RTDs' },
    ],
    climate: {
      region: 'N/A (produced from base spirits)',
      crop: 'Various base spirits',
      currentTemp: 'N/A', rainfall: 'N/A', status: 'Stable',
      yieldForecast: 'N/A', riskLevel: 'Very Low',
      historicalYield: [],
      note: 'RTD production is largely independent of agricultural conditions. Aluminum supply is the key input variable.'
    },
    venueSignals: [
      { venue: 'Multiple festival circuits', rank: 'N/A', signal: 'RTD sampling at scale; Bacardi + Coachella' },
    ],
    posEstimate: { starterKit: '\u00a31,200', premiumKit: '\u00a32,800', factoryDirect: 'Shenzhen / Local contract', leadTime: '3-4 weeks' },
    keyInsight: 'RTD growth is decelerating from +15% (2023) to +8.2% (2025) but is still the fastest-growing category. The market is maturing: hard seltzer peaked, spirit-based RTD cocktails are the next wave. The key to success is brand credibility (consumers trust spirit brands like Jack Daniel\u2019s making canned cocktails). Aluminum costs are the main COGS concern.',
  },
}

const CATEGORY_KEYS = ['tequila', 'vodka', 'gin', 'whisky', 'rum', 'cognac', 'champagne', 'wine', 'beer', 'nolo', 'rtd']

// ══════════════════════════════════════════════════════════
// MICRO COMPONENTS
// ══════════════════════════════════════════════════════════

function Sparkline({ data, color = '#22c55e', height = 40 }) {
  const chartData = data.map((v, i) => ({ i, v: typeof v === 'object' ? v.v : v }))
  return (
    <ResponsiveContainer width="100%" height={height}>
      <AreaChart data={chartData} margin={{ top: 2, right: 2, bottom: 0, left: 2 }}>
        <defs>
          <linearGradient id={`sg-${color.replace('#','')}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity={0.2} />
            <stop offset="100%" stopColor={color} stopOpacity={0.02} />
          </linearGradient>
        </defs>
        <Area type="monotone" dataKey="v" stroke={color} strokeWidth={1.5} fill={`url(#sg-${color.replace('#','')})`} dot={false} isAnimationActive={false} />
      </AreaChart>
    </ResponsiveContainer>
  )
}

function AlertDot({ level }) {
  const colors = { red: 'bg-red-500', amber: 'bg-amber-400', green: 'bg-green-500' }
  return <span className={`inline-block w-2 h-2 rounded-full ${colors[level] || 'bg-gray-300'}`} />
}

function ChannelBar({ channels }) {
  const items = [
    { key: 'onTrade', label: 'On-Trade', color: '#1e3a5f', pct: channels.onTrade },
    { key: 'offTrade', label: 'Off-Trade', color: '#C9A96E', pct: channels.offTrade },
    { key: 'eCommerce', label: 'E-Commerce', color: '#3b82f6', pct: channels.eCommerce },
    { key: 'travelRetail', label: 'Travel Retail', color: '#8b5cf6', pct: channels.travelRetail },
  ]
  return (
    <div>
      <div className="flex h-3 rounded-full overflow-hidden mb-1.5">
        {items.map(it => <div key={it.key} style={{ width: `${it.pct}%`, backgroundColor: it.color }} />)}
      </div>
      <div className="flex gap-3">
        {items.map(it => (
          <div key={it.key} className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: it.color }} />
            <span className="text-[9px] text-gray-500">{it.label} {it.pct}%</span>
          </div>
        ))}
      </div>
    </div>
  )
}

// ══════════════════════════════════════════════════════════
// SECTION COMPONENTS
// ══════════════════════════════════════════════════════════

function CategoryHealth({ cat }) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 p-4">
      <h3 className="text-sm font-semibold text-navy mb-3 flex items-center gap-2">
        <BarChart3 size={14} className="text-editorial" /> Category Health
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 mb-4">
        <div className="text-center p-2 bg-gray-50 rounded-lg">
          <div className="text-lg font-bold text-navy">{cat.marketSize}</div>
          <div className="text-[10px] text-gray-500">Market Size</div>
        </div>
        <div className="text-center p-2 bg-gray-50 rounded-lg">
          <div className={`text-lg font-bold ${cat.dir === 'up' ? 'text-green-600' : 'text-red-500'}`}>{cat.growth}</div>
          <div className="text-[10px] text-gray-500">Growth Rate</div>
        </div>
        <div className="text-center p-2 bg-gray-50 rounded-lg">
          <div className="text-lg font-bold text-navy">{cat.volume}</div>
          <div className="text-[10px] text-gray-500">Volume</div>
        </div>
        <div className="text-center p-2 bg-gray-50 rounded-lg">
          <div className="text-lg font-bold text-gold">{cat.cogsEstimate.margin}%</div>
          <div className="text-[10px] text-gray-500">Est. Gross Margin</div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <div className="text-[10px] font-semibold text-gray-500 mb-1">5-Year Market Size Trajectory</div>
          <div className="h-24">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={cat.fiveYear} margin={{ top: 5, right: 5, bottom: 0, left: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                <XAxis dataKey="yr" tick={{ fontSize: 9 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 9 }} axisLine={false} tickLine={false} width={30} />
                <Tooltip contentStyle={{ fontSize: 10 }} />
                <Area type="monotone" dataKey="v" stroke={cat.dir === 'up' ? '#22c55e' : '#ef4444'} fill={cat.dir === 'up' ? '#22c55e15' : '#ef444415'} strokeWidth={2} dot={{ r: 3 }} isAnimationActive={false} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div>
          <div className="text-[10px] font-semibold text-gray-500 mb-1">Channel Distribution</div>
          <ChannelBar channels={cat.channels} />
        </div>
      </div>
    </div>
  )
}

function SupplyChainPressure({ cat }) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 p-4">
      <h3 className="text-sm font-semibold text-navy mb-3 flex items-center gap-2">
        <Package size={14} className="text-red-500" /> Supply Chain Pressure
      </h3>
      <div className="space-y-2">
        {cat.supplyChain.map((item, i) => (
          <div key={i} className="flex items-center gap-3 p-2 bg-gray-50 rounded-lg">
            <AlertDot level={item.alert} />
            <div className="flex-1 min-w-0">
              <div className="text-xs font-medium text-navy">{item.input}</div>
              <div className="text-[10px] text-gray-500">{item.value}</div>
            </div>
            <div className="w-20 h-5 flex-shrink-0">
              <Sparkline data={item.trend} color={item.dir === 'up' ? '#ef4444' : '#22c55e'} height={20} />
            </div>
            <span className={`text-[10px] font-bold flex-shrink-0 w-12 text-right ${item.dir === 'up' ? 'text-red-500' : 'text-green-600'}`}>{item.change}</span>
          </div>
        ))}
      </div>
      <div className="mt-3 p-2 bg-navy/5 rounded-lg">
        <div className="text-[10px] font-bold text-navy">COGS Estimate (per bottle, UK off-trade)</div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-1 mt-1">
          {[
            { label: 'Raw', val: cat.cogsEstimate.raw },
            { label: 'Glass', val: cat.cogsEstimate.glass },
            { label: 'Freight', val: cat.cogsEstimate.freight },
            { label: 'Duty', val: cat.cogsEstimate.duty },
          ].map((c, i) => (
            <div key={i} className="text-center">
              <div className="text-xs font-bold text-navy">\u00a3{c.val.toFixed(2)}</div>
              <div className="text-[8px] text-gray-500">{c.label}</div>
            </div>
          ))}
        </div>
        <div className="text-center mt-1 pt-1 border-t border-gray-200">
          <span className="text-xs font-bold text-navy">Total COGS: \u00a3{cat.cogsEstimate.total.toFixed(2)}</span>
          <span className="text-[10px] text-gray-500 ml-2">Gross Margin: {cat.cogsEstimate.margin}%</span>
        </div>
      </div>
    </div>
  )
}

function CompetitivePricing({ cat }) {
  const tiers = [
    { label: 'High-End / Ultra-Premium', data: cat.pricing.highEnd, color: 'border-l-gold' },
    { label: 'Mid-Tier / Premium', data: cat.pricing.midTier, color: 'border-l-blue-400' },
    { label: 'Value / Standard', data: cat.pricing.value, color: 'border-l-gray-400' },
  ]
  return (
    <div className="bg-white rounded-xl border border-gray-100 p-4">
      <h3 className="text-sm font-semibold text-navy mb-3 flex items-center gap-2">
        <DollarSign size={14} className="text-gold" /> Competitive Pricing
      </h3>
      <div className="space-y-3">
        {tiers.map((tier, i) => (
          <div key={i}>
            <div className="text-[10px] font-bold text-gray-500 uppercase mb-1">{tier.label}</div>
            <div className="space-y-1">
              {tier.data.map((b, j) => (
                <div key={j} className={`flex items-center justify-between p-1.5 bg-gray-50 rounded border-l-2 ${tier.color}`}>
                  <div>
                    <span className="text-xs font-medium text-navy">{b.brand}</span>
                    <span className="text-[9px] text-gray-400 ml-2">{b.segment}</span>
                  </div>
                  <span className="text-xs font-bold text-navy">{b.price}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-3 p-2 bg-green-50 rounded-lg border border-green-100">
        <div className="text-[9px] font-bold text-green-700 uppercase">White Space Opportunity</div>
        <p className="text-[11px] text-green-800 mt-0.5">{cat.pricing.whiteSpace}</p>
      </div>
    </div>
  )
}

function GeographicOpportunity({ cat }) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 p-4">
      <h3 className="text-sm font-semibold text-navy mb-3 flex items-center gap-2">
        <Globe size={14} className="text-blue-500" /> Top Markets
      </h3>
      <div className="space-y-1.5">
        {cat.topMarkets.map((m, i) => (
          <div key={i} className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
            <div className="w-5 text-center text-[10px] font-bold text-gray-400">#{i+1}</div>
            <div className="flex-1 min-w-0">
              <div className="text-xs font-medium text-navy">{m.country}</div>
              <div className="text-[10px] text-gray-500 truncate">{m.note}</div>
            </div>
            <div className="text-right flex-shrink-0">
              <div className={`text-xs font-bold ${parseFloat(m.growth) > 0 ? 'text-green-600' : 'text-red-500'}`}>{m.growth}</div>
              <div className="text-[9px] text-gray-400">{m.share} share</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function ClimateRisk({ cat }) {
  if (!cat.climate.historicalYield.length) {
    return (
      <div className="bg-white rounded-xl border border-gray-100 p-4">
        <h3 className="text-sm font-semibold text-navy mb-2 flex items-center gap-2">
          <CloudRain size={14} className="text-sky-500" /> Climate & Yield Risk
        </h3>
        <p className="text-xs text-gray-500">{cat.climate.note}</p>
        <div className="mt-2 p-2 bg-green-50 rounded-lg">
          <span className="text-[10px] font-bold text-green-700">Risk Level: {cat.climate.riskLevel}</span>
        </div>
      </div>
    )
  }
  const riskColor = cat.climate.riskLevel === 'High' ? 'bg-red-50 text-red-700' : cat.climate.riskLevel === 'Medium' ? 'bg-amber-50 text-amber-700' : 'bg-green-50 text-green-700'
  return (
    <div className="bg-white rounded-xl border border-gray-100 p-4">
      <h3 className="text-sm font-semibold text-navy mb-3 flex items-center gap-2">
        <CloudRain size={14} className="text-sky-500" /> Climate & Yield Risk
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-3">
        <div className="p-2 bg-gray-50 rounded-lg">
          <div className="text-[9px] text-gray-500">Region</div>
          <div className="text-[11px] font-medium text-navy">{cat.climate.region}</div>
        </div>
        <div className="p-2 bg-gray-50 rounded-lg">
          <div className="text-[9px] text-gray-500">Crop</div>
          <div className="text-[11px] font-medium text-navy">{cat.climate.crop}</div>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 mb-3">
        <div className="text-center p-1.5 bg-gray-50 rounded">
          <div className="text-xs font-bold text-navy">{cat.climate.yieldForecast}</div>
          <div className="text-[8px] text-gray-500">Yield Forecast</div>
        </div>
        <div className={`text-center p-1.5 rounded ${riskColor}`}>
          <div className="text-xs font-bold">{cat.climate.riskLevel}</div>
          <div className="text-[8px]">Risk Level</div>
        </div>
        <div className="text-center p-1.5 bg-gray-50 rounded">
          <div className="text-xs font-bold text-navy">{cat.climate.status}</div>
          <div className="text-[8px] text-gray-500">Status</div>
        </div>
      </div>
      <div className="h-16">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={cat.climate.historicalYield} margin={{ top: 2, right: 5, bottom: 0, left: 5 }}>
            <XAxis dataKey="yr" tick={{ fontSize: 8 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 8 }} axisLine={false} tickLine={false} width={25} />
            <Tooltip contentStyle={{ fontSize: 10 }} />
            <Line type="monotone" dataKey="v" stroke="#0ea5e9" strokeWidth={2} dot={{ r: 2 }} isAnimationActive={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <p className="text-[10px] text-gray-500 mt-2">{cat.climate.note}</p>
    </div>
  )
}

function VenueSignals({ cat }) {
  if (!cat.venueSignals.length) return null
  return (
    <div className="bg-white rounded-xl border border-gray-100 p-4">
      <h3 className="text-sm font-semibold text-navy mb-3 flex items-center gap-2">
        <MapPin size={14} className="text-pink-500" /> Venue Signals
      </h3>
      <div className="space-y-1.5">
        {cat.venueSignals.map((v, i) => (
          <div key={i} className="p-2 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-navy">{v.venue}</span>
              <span className="text-[9px] font-bold text-gold">{v.rank}</span>
            </div>
            <p className="text-[10px] text-gray-500 mt-0.5">{v.signal}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

function POSQuickStart({ cat }) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 p-4">
      <h3 className="text-sm font-semibold text-navy mb-3 flex items-center gap-2">
        <ShoppingBag size={14} className="text-purple-500" /> POS Quick-Start
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        <div className="p-2 bg-gray-50 rounded-lg">
          <div className="text-[9px] text-gray-500">Starter Kit</div>
          <div className="text-sm font-bold text-navy">{cat.posEstimate.starterKit}</div>
        </div>
        <div className="p-2 bg-gray-50 rounded-lg">
          <div className="text-[9px] text-gray-500">Premium Kit</div>
          <div className="text-sm font-bold text-navy">{cat.posEstimate.premiumKit}</div>
        </div>
        <div className="p-2 bg-gray-50 rounded-lg">
          <div className="text-[9px] text-gray-500">Factory-Direct</div>
          <div className="text-[11px] font-medium text-navy">{cat.posEstimate.factoryDirect}</div>
        </div>
        <div className="p-2 bg-gray-50 rounded-lg">
          <div className="text-[9px] text-gray-500">Lead Time</div>
          <div className="text-[11px] font-medium text-navy">{cat.posEstimate.leadTime}</div>
        </div>
      </div>
    </div>
  )
}

// ══════════════════════════════════════════════════════════
// MAIN PAGE
// ══════════════════════════════════════════════════════════
export default function CategoryCommandView() {
  const { categoryId } = useParams()
  const navigate = useNavigate()
  const cat = CATEGORY_DATA[categoryId]

  if (!cat) {
    return (
      <div className="text-center py-20">
        <h2 className="text-xl font-bold text-navy mb-4">Category not found</h2>
        <p className="text-gray-500 mb-4">Select a category from the Command Centre</p>
        <Link to="/" className="text-editorial hover:underline">Back to Command Centre</Link>
      </div>
    )
  }

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button onClick={() => navigate(-1)} className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
          <ArrowLeft size={18} className="text-navy" />
        </button>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="text-xl">{cat.emoji}</span>
            <h1 className="font-display text-2xl text-navy">{cat.name}</h1>
            <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${cat.dir === 'up' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
              {cat.growth}
            </span>
          </div>
          <p className="text-xs text-gray-500 mt-0.5">Unified Intelligence View \u2014 Cross-page composite</p>
        </div>
        {/* Category quick-nav */}
        <div className="hidden lg:flex gap-1">
          {CATEGORY_KEYS.map(k => {
            const d = CATEGORY_DATA[k]
            return (
              <Link key={k} to={`/category/${k}`}
                className={`text-[9px] font-medium px-2 py-1 rounded-full transition-colors ${k === categoryId ? 'bg-navy text-white' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}>
                {d.emoji}
              </Link>
            )
          })}
        </div>
      </div>

      {/* Key Insight Banner */}
      <div className="bg-gradient-to-r from-navy/5 to-gold/5 rounded-xl border border-navy/10 p-4">
        <div className="text-[9px] font-bold text-gold uppercase tracking-wide mb-1">Strategic Insight</div>
        <p className="text-sm text-navy leading-relaxed">{cat.keyInsight}</p>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <CategoryHealth cat={cat} />
        <SupplyChainPressure cat={cat} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <CompetitivePricing cat={cat} />
        <GeographicOpportunity cat={cat} />
        <div className="space-y-4">
          <ClimateRisk cat={cat} />
          <VenueSignals cat={cat} />
          <POSQuickStart cat={cat} />
        </div>
      </div>
    </div>
  )
}
