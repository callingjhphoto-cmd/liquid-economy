import React, { useState, useMemo, useEffect, useCallback } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts'
import {
  Search, ArrowUpDown, Filter, TrendingUp, TrendingDown, Minus,
  ChevronDown, ChevronUp, DollarSign, Globe, Info, Store,
  Clock, RefreshCw, MapPin, ShoppingCart, ExternalLink, AlertCircle,
  Eye, BarChart3, Columns, Package, Edit3
} from 'lucide-react'

// \u2500\u2500 Segment Definitions \u2500\u2500
const SEGMENT_INFO = {
  'Value': { color: 'bg-gray-100 text-gray-600', desc: 'Entry-level / economy pricing. High volume, lower margin.', range: '\u00a310\u2013\u00a318' },
  'Standard': { color: 'bg-slate-100 text-slate-600', desc: 'Mainstream brands at accessible price points. Core range for most consumers.', range: '\u00a318\u2013\u00a328' },
  'Premium': { color: 'bg-blue-50 text-blue-600', desc: 'Quality-driven brands with heritage or craft positioning. The growth engine of spirits.', range: '\u00a328\u2013\u00a345' },
  'Super Premium': { color: 'bg-amber-50 text-amber-600', desc: 'Aspirational brands targeting affluent consumers. Often aged/limited expressions.', range: '\u00a345\u2013\u00a380' },
  'Ultra Premium': { color: 'bg-purple-50 text-purple-600', desc: 'Luxury positioning. Rare, aged, or highly allocated. Gift and collection market.', range: '\u00a380\u2013\u00a3250' },
  'Prestige': { color: 'bg-rose-50 text-rose-600', desc: 'Pinnacle tier. Collector\u2019s items, auction-grade. Often investment-linked.', range: '\u00a3250+' },
}

// \u2500\u2500 Market Config \u2500\u2500
const MARKET_CONFIG = {
  uk: { flag: '\ud83c\uddec\ud83c\udde7', label: 'United Kingdom', currency: '\u00a3', bottleSize: '70cl', bottleMl: 700 },
  us: { flag: '\ud83c\uddfa\ud83c\uddf8', label: 'United States', currency: '$', bottleSize: '750ml', bottleMl: 750 },
  spain: { flag: '\ud83c\uddea\ud83c\uddf8', label: 'Spain', currency: '\u20ac', bottleSize: '70cl', bottleMl: 700 },
  france: { flag: '\ud83c\uddeb\ud83c\udddf', label: 'France', currency: '\u20ac', bottleSize: '70cl', bottleMl: 700 },
  germany: { flag: '\ud83c\udde9\ud83c\uddea', label: 'Germany', currency: '\u20ac', bottleSize: '70cl', bottleMl: 700 },
  italy: { flag: '\ud83c\uddee\ud83c\uddf9', label: 'Italy', currency: '\u20ac', bottleSize: '70cl', bottleMl: 700 },
  netherlands: { flag: '\ud83c\uddf3\ud83c\uddf1', label: 'Netherlands', currency: '\u20ac', bottleSize: '70cl', bottleMl: 700 },
  me: { flag: '\ud83c\udde6\ud83c\uddea', label: 'Middle East', currency: '$', bottleSize: '750ml', bottleMl: 750 },
}

// \u2500\u2500 Retailer Definitions \u2500\u2500
const RETAILERS = {
  uk: [
    { id: 'tesco', name: 'Tesco', logo: '\ud83d\udecd\ufe0f', type: 'Supermarket', url: 'https://www.tesco.com/groceries/en-GB/search?query=' },
    { id: 'sainsburys', name: 'Sainsbury\u2019s', logo: '\ud83d\udecd\ufe0f', type: 'Supermarket', url: 'https://www.sainsburys.co.uk/gol-ui/SearchResults/' },
    { id: 'waitrose', name: 'Waitrose', logo: '\ud83d\udecd\ufe0f', type: 'Premium Supermarket', url: 'https://www.waitrose.com/ecom/shop/search?searchTerm=' },
    { id: 'masterofmalt', name: 'Master of Malt', logo: '\ud83e\udd43', type: 'Specialist', url: 'https://www.masterofmalt.com/search/?q=' },
    { id: 'thewhiskyexchange', name: 'The Whisky Exchange', logo: '\ud83e\udd43', type: 'Specialist', url: 'https://www.thewhiskyexchange.com/search/' },
  ],
  us: [
    { id: 'totalwine', name: 'Total Wine', logo: '\ud83d\udecd\ufe0f', type: 'Supermarket', url: 'https://www.totalwine.com/search?query=' },
    { id: 'drizly', name: 'Drizly', logo: '\ud83d\udea6', type: 'Delivery', url: 'https://drizly.com/search?q=' },
    { id: 'bevmo', name: 'BevMo!', logo: '\ud83d\udecd\ufe0f', type: 'Supermarket', url: 'https://www.bevmo.com/search/' },
    { id: 'costco', name: 'Costco', logo: '\ud83c\udf4b', type: 'Wholesale', url: 'https://www.costco.com/CatalogSearch?dept=All&keyword=' },
    { id: 'reservebar', name: 'ReserveBar', logo: '\ud83e\udd43', type: 'Specialist', url: 'https://www.reservebar.com/search?query=' },
  ],
  spain: [
    { id: 'elcorteingles', name: 'El Corte Ingl\u00e9s', logo: '\ud83d\udecd\ufe0f', type: 'Department', url: 'https://www.elcorteingles.es/search/?q=' },
    { id: 'carrefour_es', name: 'Carrefour', logo: '\ud83d\udecd\ufe0f', type: 'Supermarket', url: 'https://www.carrefour.es/search/' },
    { id: 'lavinia_es', name: 'Lav\u00ednia', logo: '\ud83e\udd43', type: 'Specialist', url: 'https://www.lavinia.es/search/' },
    { id: 'bodeboca', name: 'Bodeboa', logo: '\ud83e\udd43', type: 'Specialist', url: 'https://www.bodeboca.com/search?q=' },
    { id: 'mercadona', name: 'Mercad\u00f3na', logo: '\ud83d\udecd\ufe0f', type: 'Supermarket', url: 'https://www.mercadona.es/search/' },
  ],
  france: [
    { id: 'carrefour_fr', name: 'Carrefour', logo: '\ud83d\udecd\ufe0f', type: 'Supermarket', url: 'https://www.carrefour.fr/search?q=' },
    { id: 'monoprix', name: 'Monoprix', logo: '\ud83d\udecd\ufe0f', type: 'Supermarket', url: 'https://www.monoprix.fr/search/' },
    { id: 'nicolas', name: 'Nicolas', logo: '\ud83e\udd43', type: 'Specialist', url: 'https://www.nicolas.eu/en/search?q=' },
    { id: 'lavinia_fr', name: 'Lav\u00ednia', logo: '\ud83e\udd43', type: 'Specialist', url: 'https://www.lavinia.fr/search/' },
    { id: 'auchan_fr', name: 'Auchan', logo: '\ud83d\udecd\ufe0f', type: 'Supermarket', url: 'https://www.auchan.fr/search/' },
  ],
  germany: [
    { id: 'edeka', name: 'EDEKA', logo: '\ud83d\udecd\ufe0f', type: 'Supermarket', url: 'https://www.edeka.de/search/' },
    { id: 'rewe', name: 'REWE', logo: '\ud83d\udecd\ufe0f', type: 'Supermarket', url: 'https://www.rewe.de/search/' },
    { id: 'kaufland', name: 'Kaufland', logo: '\ud83d\udecd\ufe0f', type: 'Supermarket', url: 'https://www.kaufland.de/search/' },
    { id: 'weinquelle', name: 'Weinquelle', logo: '\ud83e\udd43', type: 'Specialist', url: 'https://www.weinquelle.de/search/' },
    { id: 'amazon_de', name: 'Amazon.de', logo: '\ud83d\udee6', type: 'Online', url: 'https://www.amazon.de/s?k=' },
  ],
  italy: [
    { id: 'esselunga', name: 'Esselunga', logo: '\ud83d\udecd\ufe0f', type: 'Supermarket', url: 'https://www.esselunga.it/search/' },
    { id: 'tannico', name: 'Tannico', logo: '\ud83e\udd43', type: 'Specialist', url: 'https://www.tannico.it/search/' },
    { id: 'callmewine', name: 'CallMeWine', logo: '\ud83e\udd43', type: 'Specialist', url: 'https://www.callmewine.com/search/' },
    { id: 'conad', name: 'Conad', logo: '\ud83d\udecd\ufe0f', type: 'Supermarket', url: 'https://www.conad.it/search/' },
    { id: 'carrefour_it', name: 'Carrefour', logo: '\ud83d\udecd\ufe0f', type: 'Supermarket', url: 'https://www.carrefour.it/search/' },
  ],
  netherlands: [
    { id: 'gall', name: 'Gall & Gall', logo: '\ud83e\udd43', type: 'Specialist', url: 'https://www.gall.nl/search/' },
    { id: 'albert_heijn', name: 'Albert Heijn', logo: '\ud83d\udecd\ufe0f', type: 'Supermarket', url: 'https://www.ah.nl/zoeken/' },
    { id: 'drankdozijn', name: 'Drankdozijn', logo: '\ud83d\udee6', type: 'Online', url: 'https://www.drankdozijn.nl/search/' },
    { id: 'jumbo', name: 'Jumbo', logo: '\ud83d\udecd\ufe0f', type: 'Supermarket', url: 'https://www.jumbo.com/search/' },
    { id: 'sligro', name: 'Sligro', logo: '\ud83d\udecd\ufe0f', type: 'Wholesale', url: 'https://www.sligro.nl/en/search/' },
  ],
  me: [
    { id: 'mmidubai', name: 'MMI Dubai', logo: '\ud83d\udecd\ufe0f', type: 'Supermarket', url: 'https://mmidubai.com/search/' },
    { id: 'africaneastern', name: 'African & Eastern', logo: '\ud83d\udecd\ufe0f', type: 'Supermarket', url: 'https://www.africaneaste.com/search/' },
    { id: 'dutyfree_dxb', name: 'Duty Free DXB', logo: '\u270f\ufe0f', type: 'Duty-Free', url: 'https://www.dubaidutyfreeshop.com/search/' },
    { id: 'lfrr', name: 'LFRR', logo: '\ud83e\udd43', type: 'Specialist', url: 'https://www.lfrr.ae/search/' },
    { id: 'centaurus', name: 'Centaurus', logo: '\ud83d\udecd\ufe0f', type: 'Supermarket', url: 'https://www.centaurus.ae/search/' },
  ],
}

// \u2500\u2500 Comprehensive Brand Database (with retailer-level pricing) \u2500\u2500
const BRAND_DATABASE = [
  // === SCOTCH WHISKY ===
  { company: 'Diageo', brand: 'Johnnie Walker', expression: 'Black Label', category: 'Scotch Whisky', segment: 'Standard',
    prices: { uk: { tesco: 36, sainsburys: 35.50, waitrose: 37.50, masterofmalt: 34, thewhiskyexchange: 32.25 }, us: { totalwine: 30, drizly: 34, bevmo: 32, costco: 28, reservebar: 36 }, spain: { elcorteingles: 22, carrefour_es: 20, lavinia_es: 24, bodeboca: 23, mercadona: 19 }, france: { carrefour_fr: 24, monoprix: 26, nicolas: 28, lavinia_fr: 27, auchan_fr: 23 }, germany: { edeka: 22, rewe: 23, kaufland: 21, weinquelle: 25, amazon_de: 24 }, italy: { esselunga: 23, tannico: 26, callmewine: 25, conad: 22, carrefour_it: 23 }, netherlands: { gall: 25, albert_heijn: 23, drankdozijn: 24, jumbo: 22, sligro: 21 }, me: { mmidubai: 38, africaneastern: 36, dutyfree_dxb: 32, lfrr: 40, centaurus: 37 } },
    offers: { uk: { tesco: { price: 24, label: 'Clubcard' }, sainsburys: { price: 24, label: 'Nectar' } } } },
  { company: 'Diageo', brand: 'Johnnie Walker', expression: 'Blue Label', category: 'Scotch Whisky', segment: 'Ultra Premium',
    prices: { uk: { tesco: null, sainsburys: 170, waitrose: 195, masterofmalt: 150, thewhiskyexchange: 155 }, us: { totalwine: 180, drizly: 195, bevmo: 185, costco: 165, reservebar: 210 }, spain: { elcorteingles: 148, carrefour_es: 142, lavinia_es: 155, bodeboca: 150, mercadona: null }, france: { carrefour_fr: 155, monoprix: 160, nicolas: 165, lavinia_fr: 158, auchan_fr: 150 }, germany: { edeka: 145, rewe: 148, kaufland: 140, weinquelle: 155, amazon_de: 150 }, italy: { esselunga: 150, tannico: 158, callmewine: 155, conad: null, carrefour_it: 148 }, netherlands: { gall: 155, albert_heijn: 148, drankdozijn: 152, jumbo: 145, sligro: 140 }, me: { mmidubai: 210, africaneastern: 205, dutyfree_dxb: 185, lfrr: 225, centaurus: 208 } },
    offers: {} },
  { company: 'Diageo', brand: 'Johnnie Walker', expression: 'Green Label 15yr', category: 'Scotch Whisky', segment: 'Premium',
    prices: { uk: { tesco: 46, sainsburys: 47, waitrose: 49, masterofmalt: 45, thewhiskyexchange: 45.49 }, us: { totalwine: 55, drizly: 62, bevmo: 58, costco: 50, reservebar: 68 }, spain: { elcorteingles: 42, carrefour_es: 40, lavinia_es: 45, bodeboca: 43, mercadona: null }, france: { carrefour_fr: 44, monoprix: 46, nicolas: 48, lavinia_fr: 46, auchan_fr: 42 }, germany: { edeka: 40, rewe: 42, kaufland: 38, weinquelle: 45, amazon_de: 43 }, italy: { esselunga: 42, tannico: 46, callmewine: 44, conad: 40, carrefour_it: 42 }, netherlands: { gall: 45, albert_heijn: 42, drankdozijn: 43, jumbo: 40, sligro: 38 }, me: { mmidubai: 65, africaneastern: 62, dutyfree_dxb: 55, lfrr: 70, centaurus: 63 } },
    offers: {} },
  { company: 'Edrington', brand: 'The Macallan', expression: '12yr Double Cask', category: 'Scotch Whisky', segment: 'Super Premium',
    prices: { uk: { tesco: null, sainsburys: 82, waitrose: 87, masterofmalt: 74.99, thewhiskyexchange: 78.50 }, us: { totalwine: 70, drizly: 78, bevmo: 75, costco: 62, reservebar: 85 }, spain: { elcorteingles: 60, carrefour_es: 58, lavinia_es: 65, bodeboca: 62, mercadona: null }, france: { carrefour_fr: 62, monoprix: 65, nicolas: 68, lavinia_fr: 65, auchan_fr: 60 }, germany: { edeka: 58, rewe: 60, kaufland: 55, weinquelle: 65, amazon_de: 62 }, italy: { esselunga: 60, tannico: 65, callmewine: 63, conad: 58, carrefour_it: 60 }, netherlands: { gall: 62, albert_heijn: 58, drankdozijn: 60, jumbo: 56, sligro: 54 }, me: { mmidubai: 85, africaneastern: 82, dutyfree_dxb: 72, lfrr: 92, centaurus: 84 } },
    offers: {} },
  { company: 'Edrington', brand: 'The Macallan', expression: '18yr Double Cask', category: 'Scotch Whisky', segment: 'Ultra Premium',
    prices: { uk: { tesco: null, sainsburys: null, waitrose: null, masterofmalt: 295.50, thewhiskyexchange: 313 }, us: { totalwine: 340, drizly: 370, bevmo: 355, costco: 310, reservebar: 395 }, spain: { elcorteingles: 260, carrefour_es: 255, lavinia_es: 275, bodeboca: 268, mercadona: null }, france: { carrefour_fr: 268, monoprix: 275, nicolas: 285, lavinia_fr: 278, auchan_fr: 260 }, germany: { edeka: 255, rewe: 260, kaufland: 248, weinquelle: 275, amazon_de: 268 }, italy: { esselunga: 262, tannico: 275, callmewine: 270, conad: null, carrefour_it: 258 }, netherlands: { gall: 270, albert_heijn: 260, drankdozijn: 265, jumbo: 255, sligro: 248 }, me: { mmidubai: 395, africaneastern: 385, dutyfree_dxb: 340, lfrr: 420, centaurus: 390 } },
    offers: {} },
  { company: 'William Grant', brand: 'Glenfiddich', expression: '12 Year Old', category: 'Scotch Whisky', segment: 'Premium',
    prices: { uk: { tesco: 42.50, sainsburys: 40, waitrose: 43, masterofmalt: 38, thewhiskyexchange: 40.75 }, us: { totalwine: 40, drizly: 45, bevmo: 42, costco: 36, reservebar: 48 }, spain: { elcorteingles: 30, carrefour_es: 28, lavinia_es: 34, bodeboca: 32, mercadona: 27 }, france: { carrefour_fr: 32, monoprix: 34, nicolas: 36, lavinia_fr: 35, auchan_fr: 30 }, germany: { edeka: 28, rewe: 30, kaufland: 27, weinquelle: 34, amazon_de: 32 }, italy: { esselunga: 30, tannico: 34, callmewine: 33, conad: 28, carrefour_it: 30 }, netherlands: { gall: 32, albert_heijn: 30, drankdozijn: 31, jumbo: 28, sligro: 27 }, me: { mmidubai: 48, africaneastern: 45, dutyfree_dxb: 40, lfrr: 52, centaurus: 46 } },
    offers: { uk: { tesco: { price: 30, label: 'Clubcard' } } } },
  { company: 'William Grant', brand: 'Glenfiddich', expression: '18 Year Old', category: 'Scotch Whisky', segment: 'Super Premium',
    prices: { uk: { tesco: null, sainsburys: null, waitrose: null, masterofmalt: 95, thewhiskyexchange: 98.25 }, us: { totalwine: 90, drizly: 100, bevmo: 95, costco: 82, reservebar: 108 }, spain: { elcorteingles: 65, carrefour_es: 62, lavinia_es: 72, bodeboca: 68, mercadona: null }, france: { carrefour_fr: 68, monoprix: 72, nicolas: 75, lavinia_fr: 72, auchan_fr: 65 }, germany: { edeka: 62, rewe: 65, kaufland: 60, weinquelle: 72, amazon_de: 68 }, italy: { esselunga: 65, tannico: 72, callmewine: 70, conad: 62, carrefour_it: 65 }, netherlands: { gall: 70, albert_heijn: 65, drankdozijn: 68, jumbo: 62, sligro: 58 }, me: { mmidubai: 108, africaneastern: 105, dutyfree_dxb: 92, lfrr: 118, centaurus: 106 } },
    offers: {} },

  // === BOURBON & AMERICAN ===
  { company: 'Brown-Forman', brand: "Jack Daniel\u2019s", expression: 'Old No.7', category: 'Bourbon & American', segment: 'Standard',
    prices: { uk: { tesco: 24.50, sainsburys: 27, waitrose: 29, masterofmalt: 25, thewhiskyexchange: 26 }, us: { totalwine: 22, drizly: 26, bevmo: 24, costco: 20, reservebar: 28 }, spain: { elcorteingles: 20, carrefour_es: 18, lavinia_es: 22, bodeboca: 21, mercadona: 17 }, france: { carrefour_fr: 22, monoprix: 24, nicolas: 25, lavinia_fr: 24, auchan_fr: 20 }, germany: { edeka: 18, rewe: 20, kaufland: 17, weinquelle: 22, amazon_de: 20 }, italy: { esselunga: 20, tannico: 23, callmewine: 22, conad: 18, carrefour_it: 20 }, netherlands: { gall: 22, albert_heijn: 20, drankdozijn: 21, jumbo: 19, sligro: 18 }, me: { mmidubai: 35, africaneastern: 33, dutyfree_dxb: 28, lfrr: 38, centaurus: 34 } },
    offers: { uk: { tesco: { price: 19, label: 'Clubcard' } } } },
  { company: 'Sazerac', brand: 'Buffalo Trace', expression: 'Bourbon', category: 'Bourbon & American', segment: 'Standard',
    prices: { uk: { tesco: 27.50, sainsburys: 28, waitrose: 30, masterofmalt: 26.74, thewhiskyexchange: 25.25 }, us: { totalwine: 26, drizly: 30, bevmo: 28, costco: 24, reservebar: 32 }, spain: { elcorteingles: 25, carrefour_es: 24, lavinia_es: 28, bodeboca: 26, mercadona: null }, france: { carrefour_fr: 26, monoprix: 28, nicolas: 30, lavinia_fr: 28, auchan_fr: 25 }, germany: { edeka: 24, rewe: 25, kaufland: 22, weinquelle: 28, amazon_de: 26 }, italy: { esselunga: 25, tannico: 28, callmewine: 27, conad: 24, carrefour_it: 25 }, netherlands: { gall: 28, albert_heijn: 25, drankdozijn: 26, jumbo: 24, sligro: 22 }, me: { mmidubai: 38, africaneastern: 36, dutyfree_dxb: 32, lfrr: 42, centaurus: 37 } },
    offers: { uk: { tesco: { price: 19, label: 'Clubcard' } } } },
  { company: 'Brown-Forman', brand: 'Woodford Reserve', expression: "Distiller\u2019s Select", category: 'Bourbon & American', segment: 'Premium',
    prices: { uk: { tesco: 38, sainsburys: 36, waitrose: 38, masterofmalt: 30, thewhiskyexchange: 31 }, us: { totalwine: 36, drizly: 40, bevmo: 38, costco: 32, reservebar: 45 }, spain: { elcorteingles: 32, carrefour_es: 30, lavinia_es: 35, bodeboca: 33, mercadona: null }, france: { carrefour_fr: 34, monoprix: 36, nicolas: 38, lavinia_fr: 36, auchan_fr: 32 }, germany: { edeka: 30, rewe: 32, kaufland: 28, weinquelle: 35, amazon_de: 33 }, italy: { esselunga: 32, tannico: 36, callmewine: 34, conad: 30, carrefour_it: 32 }, netherlands: { gall: 35, albert_heijn: 32, drankdozijn: 33, jumbo: 30, sligro: 28 }, me: { mmidubai: 48, africaneastern: 45, dutyfree_dxb: 38, lfrr: 52, centaurus: 46 } },
    offers: { uk: { tesco: { price: 28, label: 'Clubcard' } } } },
  { company: 'Sazerac', brand: "Blanton\u2019s", expression: 'Original', category: 'Bourbon & American', segment: 'Super Premium',
    prices: { uk: { tesco: null, sainsburys: null, waitrose: null, masterofmalt: null, thewhiskyexchange: 79.95 }, us: { totalwine: 60, drizly: 72, bevmo: 68, costco: 55, reservebar: 80 }, spain: { elcorteingles: 55, carrefour_es: null, lavinia_es: 58, bodeboca: 56, mercadona: null }, france: { carrefour_fr: 56, monoprix: null, nicolas: 60, lavinia_fr: 58, auchan_fr: null }, germany: { edeka: null, rewe: null, kaufland: null, weinquelle: 58, amazon_de: 62 }, italy: { esselunga: null, tannico: 58, callmewine: 56, conad: null, carrefour_it: null }, netherlands: { gall: 58, albert_heijn: null, drankdozijn: 55, jumbo: null, sligro: null }, me: { mmidubai: 85, africaneastern: 82, dutyfree_dxb: 72, lfrr: 92, centaurus: 84 } },
    offers: {} },

  // === TEQUILA ===
  { company: 'Diageo', brand: 'Don Julio', expression: 'Blanco', category: 'Tequila', segment: 'Premium',
    prices: { uk: { tesco: null, sainsburys: 46, waitrose: 48.99, masterofmalt: 43.99, thewhiskyexchange: 51.95 }, us: { totalwine: 42, drizly: 48, bevmo: 45, costco: 38, reservebar: 52 }, spain: { elcorteingles: 38, carrefour_es: 36, lavinia_es: 42, bodeboca: 40, mercadona: null }, france: { carrefour_fr: 40, monoprix: 42, nicolas: 45, lavinia_fr: 43, auchan_fr: 38 }, germany: { edeka: 36, rewe: 38, kaufland: 34, weinquelle: 42, amazon_de: 40 }, italy: { esselunga: 38, tannico: 42, callmewine: 40, conad: 36, carrefour_it: 38 }, netherlands: { gall: 40, albert_heijn: 38, drankdozijn: 39, jumbo: 36, sligro: 34 }, me: { mmidubai: 52, africaneastern: 50, dutyfree_dxb: 42, lfrr: 58, centaurus: 51 } },
    offers: {} },
  { company: 'Diageo', brand: 'Don Julio', expression: '1942', category: 'Tequila', segment: 'Ultra Premium',
    prices: { uk: { tesco: null, sainsburys: null, waitrose: null, masterofmalt: 125, thewhiskyexchange: 205 }, us: { totalwine: 145, drizly: 165, bevmo: 155, costco: 130, reservebar: 180 }, spain: { elcorteingles: 135, carrefour_es: null, lavinia_es: 142, bodeboca: 138, mercadona: null }, france: { carrefour_fr: 140, monoprix: null, nicolas: 148, lavinia_fr: 145, auchan_fr: null }, germany: { edeka: null, rewe: null, kaufland: null, weinquelle: 142, amazon_de: 148 }, italy: { esselunga: null, tannico: 145, callmewine: 140, conad: null, carrefour_it: null }, netherlands: { gall: 145, albert_heijn: null, drankdozijn: 140, jumbo: null, sligro: null }, me: { mmidubai: 180, africaneastern: 175, dutyfree_dxb: 155, lfrr: 195, centaurus: 178 } },
    offers: {} },
  { company: 'Becle', brand: 'Jos\u00e9 Cuervo', expression: 'Especial Silver', category: 'Tequila', segment: 'Standard',
    prices: { uk: { tesco: 23, sainsburys: 20, waitrose: 22, masterofmalt: 21, thewhiskyexchange: 22 }, us: { totalwine: 18, drizly: 22, bevmo: 20, costco: 16, reservebar: 24 }, spain: { elcorteingles: 18, carrefour_es: 16, lavinia_es: 20, bodeboca: 18, mercadona: 15 }, france: { carrefour_fr: 18, monoprix: 20, nicolas: 22, lavinia_fr: 20, auchan_fr: 17 }, germany: { edeka: 16, rewe: 18, kaufland: 15, weinquelle: 20, amazon_de: 18 }, italy: { esselunga: 18, tannico: 20, callmewine: 19, conad: 16, carrefour_it: 18 }, netherlands: { gall: 20, albert_heijn: 18, drankdozijn: 19, jumbo: 17, sligro: 16 }, me: { mmidubai: 28, africaneastern: 26, dutyfree_dxb: 22, lfrr: 30, centaurus: 27 } },
    offers: { uk: { tesco: { price: 19.50, label: 'Clubcard' } } } },
  { company: 'Pernod Ricard', brand: 'Altos', expression: 'Plata', category: 'Tequila', segment: 'Premium',
    prices: { uk: { tesco: null, sainsburys: 26, waitrose: 28, masterofmalt: 25, thewhiskyexchange: 37.25 }, us: { totalwine: 25, drizly: 28, bevmo: 27, costco: 22, reservebar: 32 }, spain: { elcorteingles: 24, carrefour_es: 22, lavinia_es: 26, bodeboca: 25, mercadona: null }, france: { carrefour_fr: 25, monoprix: 27, nicolas: 28, lavinia_fr: 27, auchan_fr: 24 }, germany: { edeka: 22, rewe: 24, kaufland: 21, weinquelle: 26, amazon_de: 24 }, italy: { esselunga: 24, tannico: 27, callmewine: 26, conad: 22, carrefour_it: 24 }, netherlands: { gall: 26, albert_heijn: 24, drankdozijn: 25, jumbo: 22, sligro: 21 }, me: { mmidubai: 32, africaneastern: 30, dutyfree_dxb: 26, lfrr: 35, centaurus: 31 } },
    offers: { uk: { tesco: { price: 21, label: 'Clubcard' } } } },

  // === GIN ===
  { company: 'Diageo', brand: 'Tanqueray', expression: 'London Dry', category: 'Gin', segment: 'Premium',
    prices: { uk: { tesco: 23, sainsburys: 22, waitrose: 24, masterofmalt: 21, thewhiskyexchange: 22 }, us: { totalwine: 22, drizly: 26, bevmo: 24, costco: 20, reservebar: 28 }, spain: { elcorteingles: 18, carrefour_es: 16, lavinia_es: 20, bodeboca: 18, mercadona: 15 }, france: { carrefour_fr: 20, monoprix: 22, nicolas: 24, lavinia_fr: 22, auchan_fr: 18 }, germany: { edeka: 16, rewe: 18, kaufland: 15, weinquelle: 20, amazon_de: 18 }, italy: { esselunga: 18, tannico: 20, callmewine: 19, conad: 16, carrefour_it: 18 }, netherlands: { gall: 20, albert_heijn: 18, drankdozijn: 19, jumbo: 17, sligro: 16 }, me: { mmidubai: 30, africaneastern: 28, dutyfree_dxb: 24, lfrr: 33, centaurus: 29 } },
    offers: { uk: { tesco: { price: 18.50, label: 'Clubcard' } } } },
  { company: 'Pernod Ricard', brand: 'Beefeater', expression: 'London Dry', category: 'Gin', segment: 'Standard',
    prices: { uk: { tesco: 17.50, sainsburys: 16, waitrose: 18, masterofmalt: 18.51, thewhiskyexchange: 17 }, us: { totalwine: 18, drizly: 22, bevmo: 20, costco: 16, reservebar: 24 }, spain: { elcorteingles: 14, carrefour_es: 12, lavinia_es: 16, bodeboca: 14, mercadona: 11 }, france: { carrefour_fr: 15, monoprix: 17, nicolas: 18, lavinia_fr: 17, auchan_fr: 14 }, germany: { edeka: 12, rewe: 14, kaufland: 11, weinquelle: 16, amazon_de: 14 }, italy: { esselunga: 14, tannico: 16, callmewine: 15, conad: 12, carrefour_it: 14 }, netherlands: { gall: 16, albert_heijn: 14, drankdozijn: 15, jumbo: 13, sligro: 12 }, me: { mmidubai: 25, africaneastern: 23, dutyfree_dxb: 20, lfrr: 28, centaurus: 24 } },
    offers: {} },
  { company: 'William Grant', brand: 'Hendrick\u2019s', expression: 'Original', category: 'Gin', segment: 'Super Premium',
    prices: { uk: { tesco: 28, sainsburys: 26, waitrose: 26.50, masterofmalt: 32.20, thewhiskyexchange: 28 }, us: { totalwine: 32, drizly: 38, bevmo: 35, costco: 28, reservebar: 42 }, spain: { elcorteingles: 28, carrefour_es: 26, lavinia_es: 32, bodeboca: 30, mercadona: null }, france: { carrefour_fr: 30, monoprix: 32, nicolas: 35, lavinia_fr: 33, auchan_fr: 28 }, germany: { edeka: 26, rewe: 28, kaufland: 24, weinquelle: 32, amazon_de: 30 }, italy: { esselunga: 28, tannico: 32, callmewine: 30, conad: 26, carrefour_it: 28 }, netherlands: { gall: 32, albert_heijn: 28, drankdozijn: 30, jumbo: 27, sligro: 25 }, me: { mmidubai: 42, africaneastern: 40, dutyfree_dxb: 35, lfrr: 48, centaurus: 41 } },
    offers: {} },

  // === VODKA ===
  { company: 'Diageo', brand: 'Ketel One', expression: 'Original', category: 'Vodka', segment: 'Premium',
    prices: { uk: { tesco: null, sainsburys: 26, waitrose: 22.50, masterofmalt: 24.99, thewhiskyexchange: 27.25 }, us: { totalwine: 25, drizly: 30, bevmo: 28, costco: 22, reservebar: 32 }, spain: { elcorteingles: 22, carrefour_es: 20, lavinia_es: 24, bodeboca: 22, mercadona: null }, france: { carrefour_fr: 24, monoprix: 26, nicolas: 28, lavinia_fr: 26, auchan_fr: 22 }, germany: { edeka: 20, rewe: 22, kaufland: 18, weinquelle: 24, amazon_de: 22 }, italy: { esselunga: 22, tannico: 25, callmewine: 24, conad: 20, carrefour_it: 22 }, netherlands: { gall: 24, albert_heijn: 22, drankdozijn: 23, jumbo: 20, sligro: 19 }, me: { mmidubai: 32, africaneastern: 30, dutyfree_dxb: 26, lfrr: 36, centaurus: 31 } },
    offers: {} },
  { company: 'Pernod Ricard', brand: 'Absolut', expression: 'Original', category: 'Vodka', segment: 'Standard',
    prices: { uk: { tesco: 22.50, sainsburys: 22, waitrose: 23, masterofmalt: 20, thewhiskyexchange: 21 }, us: { totalwine: 18, drizly: 22, bevmo: 20, costco: 16, reservebar: 24 }, spain: { elcorteingles: 16, carrefour_es: 14, lavinia_es: 18, bodeboca: 16, mercadona: 13 }, france: { carrefour_fr: 18, monoprix: 20, nicolas: 22, lavinia_fr: 20, auchan_fr: 16 }, germany: { edeka: 14, rewe: 16, kaufland: 13, weinquelle: 18, amazon_de: 16 }, italy: { esselunga: 16, tannico: 18, callmewine: 17, conad: 14, carrefour_it: 16 }, netherlands: { gall: 18, albert_heijn: 16, drankdozijn: 17, jumbo: 15, sligro: 14 }, me: { mmidubai: 25, africaneastern: 23, dutyfree_dxb: 20, lfrr: 28, centaurus: 24 } },
    offers: { uk: { tesco: { price: 19, label: 'Clubcard' } } } },
  { company: 'LVMH', brand: 'Belvedere', expression: 'Pure', category: 'Vodka', segment: 'Super Premium',
    prices: { uk: { tesco: 38, sainsburys: 36, waitrose: 35, masterofmalt: null, thewhiskyexchange: 37.25 }, us: { totalwine: 30, drizly: 36, bevmo: 34, costco: 28, reservebar: 40 }, spain: { elcorteingles: 28, carrefour_es: 26, lavinia_es: 32, bodeboca: 30, mercadona: null }, france: { carrefour_fr: 30, monoprix: 32, nicolas: 35, lavinia_fr: 33, auchan_fr: 28 }, germany: { edeka: 26, rewe: 28, kaufland: 24, weinquelle: 32, amazon_de: 30 }, italy: { esselunga: 28, tannico: 32, callmewine: 30, conad: 26, carrefour_it: 28 }, netherlands: { gall: 32, albert_heijn: 28, drankdozijn: 30, jumbo: 27, sligro: 25 }, me: { mmidubai: 42, africaneastern: 40, dutyfree_dxb: 35, lfrr: 48, centaurus: 41 } },
    offers: { uk: { tesco: { price: 30, label: 'Clubcard' } } } },

  // === COGNAC ===
  { company: 'LVMH', brand: 'Hennessy', expression: 'VS', category: 'Cognac', segment: 'Standard',
    prices: { uk: { tesco: 38.50, sainsburys: 39, waitrose: 38, masterofmalt: 34, thewhiskyexchange: 41.95 }, us: { totalwine: 35, drizly: 40, bevmo: 38, costco: 32, reservebar: 44 }, spain: { elcorteingles: 28, carrefour_es: 26, lavinia_es: 32, bodeboca: 30, mercadona: 25 }, france: { carrefour_fr: 26, monoprix: 28, nicolas: 30, lavinia_fr: 28, auchan_fr: 24 }, germany: { edeka: 26, rewe: 28, kaufland: 24, weinquelle: 30, amazon_de: 28 }, italy: { esselunga: 28, tannico: 30, callmewine: 29, conad: 26, carrefour_it: 28 }, netherlands: { gall: 30, albert_heijn: 28, drankdozijn: 29, jumbo: 26, sligro: 24 }, me: { mmidubai: 42, africaneastern: 40, dutyfree_dxb: 35, lfrr: 48, centaurus: 41 } },
    offers: { uk: { tesco: { price: 31, label: 'Clubcard' } } } },
  { company: 'LVMH', brand: 'Hennessy', expression: 'VSOP', category: 'Cognac', segment: 'Premium',
    prices: { uk: { tesco: null, sainsburys: 46.50, waitrose: 48, masterofmalt: 42, thewhiskyexchange: 55.25 }, us: { totalwine: 48, drizly: 55, bevmo: 52, costco: 44, reservebar: 60 }, spain: { elcorteingles: 40, carrefour_es: 38, lavinia_es: 44, bodeboca: 42, mercadona: null }, france: { carrefour_fr: 38, monoprix: 40, nicolas: 44, lavinia_fr: 42, auchan_fr: 36 }, germany: { edeka: 38, rewe: 40, kaufland: 36, weinquelle: 44, amazon_de: 42 }, italy: { esselunga: 40, tannico: 44, callmewine: 42, conad: 38, carrefour_it: 40 }, netherlands: { gall: 42, albert_heijn: 40, drankdozijn: 41, jumbo: 38, sligro: 36 }, me: { mmidubai: 58, africaneastern: 55, dutyfree_dxb: 48, lfrr: 65, centaurus: 56 } },
    offers: { uk: { tesco: { price: 36, label: 'Clubcard' } } } },
  { company: 'LVMH', brand: 'Hennessy', expression: 'XO', category: 'Cognac', segment: 'Ultra Premium',
    prices: { uk: { tesco: null, sainsburys: null, waitrose: 195, masterofmalt: 170, thewhiskyexchange: 187.50 }, us: { totalwine: 180, drizly: 210, bevmo: 195, costco: 165, reservebar: 230 }, spain: { elcorteingles: 155, carrefour_es: null, lavinia_es: 165, bodeboca: 160, mercadona: null }, france: { carrefour_fr: 145, monoprix: 155, nicolas: 165, lavinia_fr: 158, auchan_fr: 142 }, germany: { edeka: null, rewe: null, kaufland: null, weinquelle: 160, amazon_de: 168 }, italy: { esselunga: null, tannico: 165, callmewine: 160, conad: null, carrefour_it: null }, netherlands: { gall: 162, albert_heijn: null, drankdozijn: 158, jumbo: null, sligro: null }, me: { mmidubai: 225, africaneastern: 220, dutyfree_dxb: 195, lfrr: 248, centaurus: 222 } },
    offers: {} },
  { company: 'Pernod Ricard', brand: 'Martell', expression: 'VS', category: 'Cognac', segment: 'Standard',
    prices: { uk: { tesco: 30, sainsburys: 28, waitrose: 32, masterofmalt: 31.95, thewhiskyexchange: 29 }, us: { totalwine: 30, drizly: 35, bevmo: 33, costco: 28, reservebar: 38 }, spain: { elcorteingles: 26, carrefour_es: 24, lavinia_es: 28, bodeboca: 27, mercadona: null }, france: { carrefour_fr: 24, monoprix: 26, nicolas: 28, lavinia_fr: 26, auchan_fr: 22 }, germany: { edeka: 24, rewe: 26, kaufland: 22, weinquelle: 28, amazon_de: 26 }, italy: { esselunga: 26, tannico: 28, callmewine: 27, conad: 24, carrefour_it: 26 }, netherlands: { gall: 28, albert_heijn: 26, drankdozijn: 27, jumbo: 24, sligro: 22 }, me: { mmidubai: 38, africaneastern: 36, dutyfree_dxb: 32, lfrr: 42, centaurus: 37 } },
    offers: {} },
  { company: 'R\u00e9my Cointreau', brand: 'R\u00e9my Martin', expression: 'VSOP', category: 'Cognac', segment: 'Premium',
    prices: { uk: { tesco: null, sainsburys: 46.50, waitrose: 48, masterofmalt: 41.51, thewhiskyexchange: 49.75 }, us: { totalwine: 45, drizly: 52, bevmo: 48, costco: 40, reservebar: 58 }, spain: { elcorteingles: 38, carrefour_es: 36, lavinia_es: 42, bodeboca: 40, mercadona: null }, france: { carrefour_fr: 35, monoprix: 38, nicolas: 42, lavinia_fr: 40, auchan_fr: 34 }, germany: { edeka: 36, rewe: 38, kaufland: 34, weinquelle: 42, amazon_de: 40 }, italy: { esselunga: 38, tannico: 42, callmewine: 40, conad: 36, carrefour_it: 38 }, netherlands: { gall: 40, albert_heijn: 38, drankdozijn: 39, jumbo: 36, sligro: 34 }, me: { mmidubai: 55, africaneastern: 52, dutyfree_dxb: 45, lfrr: 62, centaurus: 54 } },
    offers: { uk: { tesco: { price: 36, label: 'Clubcard' } } } },

  // === RUM ===
  { company: 'Bacardi', brand: 'Bacardi', expression: 'Carta Blanca', category: 'Rum', segment: 'Standard',
    prices: { uk: { tesco: 19, sainsburys: 16.50, waitrose: 18, masterofmalt: 17, thewhiskyexchange: 18 }, us: { totalwine: 14, drizly: 18, bevmo: 16, costco: 12, reservebar: 20 }, spain: { elcorteingles: 12, carrefour_es: 10, lavinia_es: 14, bodeboca: 12, mercadona: 9 }, france: { carrefour_fr: 14, monoprix: 16, nicolas: 17, lavinia_fr: 16, auchan_fr: 13 }, germany: { edeka: 12, rewe: 14, kaufland: 11, weinquelle: 15, amazon_de: 13 }, italy: { esselunga: 12, tannico: 14, callmewine: 13, conad: 11, carrefour_it: 12 }, netherlands: { gall: 14, albert_heijn: 12, drankdozijn: 13, jumbo: 11, sligro: 10 }, me: { mmidubai: 22, africaneastern: 20, dutyfree_dxb: 16, lfrr: 25, centaurus: 21 } },
    offers: {} },
  { company: 'Diageo', brand: 'Ron Zacapa', expression: '23 Centenario', category: 'Rum', segment: 'Super Premium',
    prices: { uk: { tesco: null, sainsburys: null, waitrose: 52, masterofmalt: 54.99, thewhiskyexchange: 56.95 }, us: { totalwine: 48, drizly: 55, bevmo: 52, costco: 44, reservebar: 62 }, spain: { elcorteingles: 42, carrefour_es: 40, lavinia_es: 48, bodeboca: 45, mercadona: null }, france: { carrefour_fr: 44, monoprix: 46, nicolas: 50, lavinia_fr: 48, auchan_fr: 42 }, germany: { edeka: 40, rewe: 42, kaufland: 38, weinquelle: 48, amazon_de: 45 }, italy: { esselunga: 42, tannico: 48, callmewine: 45, conad: 40, carrefour_it: 42 }, netherlands: { gall: 46, albert_heijn: 42, drankdozijn: 44, jumbo: 40, sligro: 38 }, me: { mmidubai: 62, africaneastern: 58, dutyfree_dxb: 50, lfrr: 68, centaurus: 60 } },
    offers: {} },
  { company: 'Pernod Ricard', brand: 'Havana Club', expression: '7 A\u00f1os', category: 'Rum', segment: 'Premium',
    prices: { uk: { tesco: 29.50, sainsburys: 22, waitrose: 24, masterofmalt: 22, thewhiskyexchange: 23 }, us: { totalwine: null, drizly: null, bevmo: null, costco: null, reservebar: null }, spain: { elcorteingles: 20, carrefour_es: 18, lavinia_es: 22, bodeboca: 20, mercadona: 17 }, france: { carrefour_fr: 20, monoprix: 22, nicolas: 24, lavinia_fr: 22, auchan_fr: 18 }, germany: { edeka: 18, rewe: 20, kaufland: 17, weinquelle: 22, amazon_de: 20 }, italy: { esselunga: 18, tannico: 22, callmewine: 20, conad: 17, carrefour_it: 18 }, netherlands: { gall: 22, albert_heijn: 20, drankdozijn: 21, jumbo: 18, sligro: 17 }, me: { mmidubai: 32, africaneastern: 30, dutyfree_dxb: 26, lfrr: 36, centaurus: 31 } },
    offers: {} },

  // === CHAMPAGNE ===
  { company: 'LVMH', brand: 'Mo\u00ebt & Chandon', expression: 'Imp\u00e9rial Brut', category: 'Champagne', segment: 'Premium',
    prices: { uk: { tesco: 45, sainsburys: 42, waitrose: 44, masterofmalt: 40, thewhiskyexchange: 42 }, us: { totalwine: 42, drizly: 48, bevmo: 45, costco: 38, reservebar: 55 }, spain: { elcorteingles: 32, carrefour_es: 30, lavinia_es: 36, bodeboca: 34, mercadona: null }, france: { carrefour_fr: 28, monoprix: 30, nicolas: 32, lavinia_fr: 30, auchan_fr: 26 }, germany: { edeka: 30, rewe: 32, kaufland: 28, weinquelle: 35, amazon_de: 33 }, italy: { esselunga: 30, tannico: 34, callmewine: 33, conad: 28, carrefour_it: 30 }, netherlands: { gall: 34, albert_heijn: 30, drankdozijn: 32, jumbo: 28, sligro: 26 }, me: { mmidubai: 55, africaneastern: 52, dutyfree_dxb: 42, lfrr: 60, centaurus: 54 } },
    offers: {} },
  { company: 'LVMH', brand: 'Veuve Clicquot', expression: 'Yellow Label', category: 'Champagne', segment: 'Super Premium',
    prices: { uk: { tesco: 50, sainsburys: 50, waitrose: 52, masterofmalt: 48, thewhiskyexchange: 55.25 }, us: { totalwine: 52, drizly: 58, bevmo: 55, costco: 48, reservebar: 65 }, spain: { elcorteingles: 40, carrefour_es: 38, lavinia_es: 45, bodeboca: 42, mercadona: null }, france: { carrefour_fr: 35, monoprix: 38, nicolas: 42, lavinia_fr: 40, auchan_fr: 34 }, germany: { edeka: 38, rewe: 40, kaufland: 36, weinquelle: 44, amazon_de: 42 }, italy: { esselunga: 38, tannico: 42, callmewine: 40, conad: 36, carrefour_it: 38 }, netherlands: { gall: 42, albert_heijn: 38, drankdozijn: 40, jumbo: 36, sligro: 34 }, me: { mmidubai: 65, africaneastern: 62, dutyfree_dxb: 52, lfrr: 72, centaurus: 64 } },
    offers: {} },
  { company: 'LVMH', brand: 'Dom P\u00e9rignon', expression: 'Vintage 2015', category: 'Champagne', segment: 'Ultra Premium',
    prices: { uk: { tesco: null, sainsburys: null, waitrose: 190, masterofmalt: 165, thewhiskyexchange: 204 }, us: { totalwine: 200, drizly: 230, bevmo: 220, costco: 185, reservebar: 260 }, spain: { elcorteingles: 170, carrefour_es: null, lavinia_es: 180, bodeboca: 175, mercadona: null }, france: { carrefour_fr: 155, monoprix: 165, nicolas: 175, lavinia_fr: 170, auchan_fr: 150 }, germany: { edeka: null, rewe: null, kaufland: null, weinquelle: 172, amazon_de: 178 }, italy: { esselunga: null, tannico: 175, callmewine: 170, conad: null, carrefour_it: null }, netherlands: { gall: 175, albert_heijn: null, drankdozijn: 168, jumbo: null, sligro: null }, me: { mmidubai: 260, africaneastern: 255, dutyfree_dxb: 220, lfrr: 285, centaurus: 258 } },
    offers: {} },

  // === WINE ===
  { company: 'Pernod Ricard', brand: 'Campo Viejo', expression: 'Rioja Tempranillo', category: 'Wine', segment: 'Standard',
    prices: { uk: { tesco: 9.25, sainsburys: 8.75, waitrose: 10, masterofmalt: null, thewhiskyexchange: null }, us: { totalwine: 12, drizly: 14, bevmo: 13, costco: 10, reservebar: null }, spain: { elcorteingles: 7, carrefour_es: 6, lavinia_es: 8, bodeboca: 7, mercadona: 5 }, france: { carrefour_fr: 8, monoprix: 9, nicolas: 10, lavinia_fr: 9, auchan_fr: 7 }, germany: { edeka: 8, rewe: 9, kaufland: 7, weinquelle: 10, amazon_de: 9 }, italy: { esselunga: 8, tannico: 10, callmewine: 9, conad: 7, carrefour_it: 8 }, netherlands: { gall: 9, albert_heijn: 8, drankdozijn: 8, jumbo: 7, sligro: 6 }, me: { mmidubai: 18, africaneastern: 16, dutyfree_dxb: 14, lfrr: 20, centaurus: 17 } },
    offers: { uk: { tesco: { price: 7, label: 'Clubcard' } } } },

  // === RTD ===
  { company: 'Diageo', brand: 'Smirnoff Ice', expression: 'Original 10x250ml', category: 'RTD', segment: 'Value',
    prices: { uk: { tesco: 12.25, sainsburys: 12, waitrose: 13, masterofmalt: null, thewhiskyexchange: null }, us: { totalwine: 8, drizly: 10, bevmo: 9, costco: 7, reservebar: null }, spain: { elcorteingles: 5, carrefour_es: 4.50, lavinia_es: null, bodeboca: null, mercadona: 4 }, france: { carrefour_fr: 5, monoprix: 5.50, nicolas: null, lavinia_fr: null, auchan_fr: 4.50 }, germany: { edeka: 4.50, rewe: 5, kaufland: 4, weinquelle: null, amazon_de: 5 }, italy: { esselunga: 5, tannico: null, callmewine: null, conad: 4.50, carrefour_it: 5 }, netherlands: { gall: 5.50, albert_heijn: 5, drankdozijn: 5, jumbo: 4.50, sligro: 4 }, me: { mmidubai: 12, africaneastern: 11, dutyfree_dxb: 9, lfrr: null, centaurus: 11 } },
    offers: {} },

  // === NO/LO ===
  { company: 'Diageo', brand: 'Seedlip', expression: 'Garden 108', category: 'No/Lo', segment: 'Premium',
    prices: { uk: { tesco: 27, sainsburys: 22, waitrose: 24, masterofmalt: null, thewhiskyexchange: null }, us: { totalwine: 28, drizly: 32, bevmo: 30, costco: null, reservebar: 35 }, spain: { elcorteingles: 22, carrefour_es: null, lavinia_es: 24, bodeboca: 22, mercadona: null }, france: { carrefour_fr: 22, monoprix: 24, nicolas: 26, lavinia_fr: 24, auchan_fr: null }, germany: { edeka: 20, rewe: 22, kaufland: null, weinquelle: 24, amazon_de: 22 }, italy: { esselunga: 22, tannico: 24, callmewine: 23, conad: null, carrefour_it: 22 }, netherlands: { gall: 24, albert_heijn: 22, drankdozijn: 23, jumbo: 20, sligro: null }, me: { mmidubai: 32, africaneastern: 30, dutyfree_dxb: 28, lfrr: 36, centaurus: 31 } },
    offers: {} },
  { company: 'Pernod Ricard', brand: 'Celtic Soul', expression: '0.0% Irish Spirit', category: 'No/Lo', segment: 'Premium',
    prices: { uk: { tesco: 18, sainsburys: 18, waitrose: 20, masterofmalt: null, thewhiskyexchange: null }, us: { totalwine: null, drizly: null, bevmo: null, costco: null, reservebar: null }, spain: { elcorteingles: null, carrefour_es: null, lavinia_es: null, bodeboca: null, mercadona: null }, france: { carrefour_fr: 16, monoprix: 18, nicolas: null, lavinia_fr: null, auchan_fr: null }, germany: { edeka: 14, rewe: 16, kaufland: null, weinquelle: 18, amazon_de: 16 }, italy: { esselunga: null, tannico: null, callmewine: null, conad: null, carrefour_it: null }, netherlands: { gall: 18, albert_heijn: 16, drankdozijn: 17, jumbo: null, sligro: null }, me: { mmidubai: null, africaneastern: null, dutyfree_dxb: null, lfrr: null, centaurus: null } },
    offers: {} },

  // === BEER ===
  { company: 'AB InBev', brand: 'Stella Artois', expression: '10x440ml Cans', category: 'Beer', segment: 'Standard',
    prices: { uk: { tesco: 9.95, sainsburys: 12, waitrose: 13, masterofmalt: null, thewhiskyexchange: null }, us: { totalwine: 16, drizly: 18, bevmo: 17, costco: 14, reservebar: null }, spain: { elcorteingles: 10, carrefour_es: 9, lavinia_es: null, bodeboca: null, mercadona: 8 }, france: { carrefour_fr: 10, monoprix: 11, nicolas: null, lavinia_fr: null, auchan_fr: 9 }, germany: { edeka: 9, rewe: 10, kaufland: 8, weinquelle: null, amazon_de: 10 }, italy: { esselunga: 10, tannico: null, callmewine: null, conad: 9, carrefour_it: 10 }, netherlands: { gall: 11, albert_heijn: 10, drankdozijn: 10, jumbo: 9, sligro: 8 }, me: { mmidubai: 22, africaneastern: 20, dutyfree_dxb: 16, lfrr: null, centaurus: 20 } },
    offers: {} },
]

// \u2500\u2500 Editable Prices Hook \u2500\u2500
function useEditablePrices() {
  const [editedPrices, setEditedPrices] = useState(() => {
    try {
      const saved = localStorage.getItem('le_edited_prices')
      return saved ? JSON.parse(saved) : {}
    } catch { return {} }
  })

  const updatePrice = useCallback((productIdx, market, retailerId, newPrice) => {
    setEditedPrices(prev => {
      const key = `${productIdx}-${market}-${retailerId}`
      const next = { ...prev, [key]: parseFloat(newPrice) || null }
      try { localStorage.setItem('le_edited_prices', JSON.stringify(next)) } catch {}
      return next
    })
  }, [])

  const clearEdits = useCallback(() => {
    setEditedPrices({})
    try { localStorage.removeItem('le_edited_prices') } catch {}
  }, [])

  const hasEdits = Object.keys(editedPrices).length > 0

  return { editedPrices, updatePrice, clearEdits, hasEdits }
}

// \u2500\u2500 Process data \u2500\u2500
const PRICING = BRAND_DATABASE.map(item => {
  const marketAvgs = {}
  const allMarketKeys = Object.keys(MARKET_CONFIG)
  allMarketKeys.forEach(mkt => {
    if (item.prices[mkt]) {
      const vals = Object.values(item.prices[mkt]).filter(v => v !== null && v !== undefined)
      marketAvgs[mkt] = vals.length > 0 ? Math.round(vals.reduce((a, b) => a + b, 0) / vals.length * 100) / 100 : null
    }
  })
  const euCountries = ['spain', 'france', 'germany', 'italy', 'netherlands']
  const euVals = euCountries.map(c => marketAvgs[c]).filter(v => v !== null && v !== undefined)
  const euAvg = euVals.length > 0 ? Math.round(euVals.reduce((a, b) => a + b, 0) / euVals.length) : null
  const allPrices = Object.values(marketAvgs).filter(v => v !== null && v !== undefined)
  const maxP = allPrices.length > 0 ? Math.max(...allPrices) : 0
  const minP = allPrices.length > 0 ? Math.min(...allPrices) : 0
  return { ...item, usa: marketAvgs.us, uk: marketAvgs.uk, eu: euAvg, me: marketAvgs.me, marketAvgs, differential: Math.round((maxP - minP) * 100) / 100, premium_index: minP > 0 ? (maxP - minP) / minP : 0 }
})

const CATEGORIES = ['all', ...new Set(PRICING.map(p => p.category))]
const SEGMENTS = ['all', ...new Set(PRICING.map(p => p.segment))]

// \u2500\u2500 Sub-Components \u2500\u2500

function SegmentInfoPanel() {
  const [open, setOpen] = useState(false)
  return (
    <div className="bg-white rounded-xl border border-gray-100 p-4">
      <button onClick={() => setOpen(!open)} className="flex items-center gap-2 text-sm font-medium text-navy hover:text-gold transition-colors w-full text-left">
        <Info size={14} />
        <span>What do the segments mean?</span>
        {open ? <ChevronUp size={14} className="ml-auto" /> : <ChevronDown size={14} className="ml-auto" />}
      </button>
      {open && (
        <div className="mt-3 grid grid-cols-2 lg:grid-cols-3 gap-2">
          {Object.entries(SEGMENT_INFO).map(([seg, info]) => (
            <div key={seg} className="p-3 rounded-lg bg-gray-50 border border-gray-100">
              <div className="flex items-center gap-2 mb-1">
                <span className={`text-[10px] px-2 py-0.5 rounded font-medium ${info.color}`}>{seg}</span>
                <span className="text-[10px] text-gray-400">{info.range}</span>
              </div>
              <p className="text-[11px] text-gray-500 leading-relaxed">{info.desc}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// --- RETAILER DIRECTORY: always-visible list of retailers per market ---
function RetailerDirectory({ selectedMarket }) {
  const retailers = RETAILERS[selectedMarket] || []
  const config = MARKET_CONFIG[selectedMarket]
  return (
    <div className="bg-white rounded-xl border border-gray-100 p-5">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Store size={16} className="text-navy" />
          <h2 className="font-display text-base text-navy">Tracked Retailers</h2>
        </div>
        <div className="flex items-center gap-1 text-[10px] text-gray-400">
          <Package size={10} />
          <span>Bottle size: <strong className="text-navy">{config.bottleSize}</strong> ({config.bottleMl}ml)</span>
        </div>
      </div>
      <div className="flex gap-1 flex-wrap mb-4">
        {Object.entries(MARKET_CONFIG).map(([key, cfg]) => (
          <span key={key} className={`px-2 py-1 rounded text-[10px] font-medium ${key === selectedMarket ? 'bg-navy text-white' : 'bg-gray-50 text-gray-500'}`}>
            {cfg.flag} {cfg.label}
          </span>
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-5 gap-2">
        {retailers.map(r => (
          <div key={r.id} className="flex items-center gap-2 p-2.5 rounded-lg bg-gray-50 border border-gray-100">
            <span className="text-lg">{r.logo}</span>
            <div className="min-w-0">
              <p className="text-xs font-medium text-navy truncate">{r.name}</p>
              <p className="text-[10px] text-gray-400">{r.type}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// Helper: build product URL for a retailer (search URL + product name)
// When scraper provides actual product page URLs, those override this default.
function buildProductUrl(retailer, product) {
  if (!retailer.url) return null
  const searchTerm = product.brand + ' ' + product.expression
  return retailer.url + encodeURIComponent(searchTerm)
}

// Price Comparison Links component
function PriceComparisonLinks({ market, product }) {
  const searchTerm = encodeURIComponent(product.brand + ' ' + product.expression)

  const links = {
    uk: [
      { name: 'Trolley', url: `https://www.trolley.co.uk/search/?q=${searchTerm}` },
      { name: 'Google Shopping', url: `https://www.google.co.uk/search?tbm=shop&q=${searchTerm}` }
    ],
    us: [
      { name: 'Google Shopping', url: `https://www.google.com/search?tbm=shop&q=${searchTerm}` },
      { name: 'Wine-Searcher', url: `https://www.wine-searcher.com/find/${searchTerm}` }
    ],
    spain: [
      { name: 'idealo', url: `https://www.idealo.es/` },
      { name: 'Google Shopping', url: `https://www.google.es/search?tbm=shop&q=${searchTerm}` }
    ],
    france: [
      { name: 'idealo', url: `https://www.idealo.fr/` },
      { name: 'Google Shopping', url: `https://www.google.fr/search?tbm=shop&q=${searchTerm}` }
    ],
    germany: [
      { name: 'idealo', url: `https://www.idealo.de/` },
      { name: 'Google Shopping', url: `https://www.google.de/search?tbm=shop&q=${searchTerm}` }
    ],
    italy: [
      { name: 'idealo', url: `https://www.idealo.it/` },
      { name: 'Google Shopping', url: `https://www.google.it/search?tbm=shop&q=${searchTerm}` }
    ],
    netherlands: [
      { name: 'idealo', url: `https://www.idealo.nl/` },
      { name: 'Google Shopping', url: `https://www.google.nl/search?tbm=shop&q=${searchTerm}` }
    ],
    me: [
      { name: 'Google Shopping', url: `https://www.google.com/search?tbm=shop&q=${searchTerm}` }
    ]
  }

  const marketLinks = links[market] || []

  return (
    <div className="flex items-center gap-2 text-[10px]">
      <span className="text-gray-500">Price comparison:</span>
      {marketLinks.map((link, i) => (
        <a key={i} href={link.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
          {link.name}
        </a>
      ))}
    </div>
  )
}

// --- RETAILER COMPARISON VIEW: primary feature for brand managers ---
function RetailerComparisonView({ productUrls }) {
  const [market, setMarket] = useState('uk')
  const [compareSearch, setCompareSearch] = useState('')
  const [editMode, setEditMode] = useState(false)
  const { editedPrices, updatePrice, clearEdits, hasEdits } = useEditablePrices()

  const config = MARKET_CONFIG[market]
  const retailers = RETAILERS[market] || []

  const filtered = useMemo(() => {
    if (!compareSearch) return BRAND_DATABASE
    const q = compareSearch.toLowerCase()
    return BRAND_DATABASE.filter(p =>
      p.brand.toLowerCase().includes(q) ||
      p.expression.toLowerCase().includes(q) ||
      p.company.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q)
    )
  }, [compareSearch])

  // Get product URL: first check scraped URLs from API, then fall back to search URL
  const getProductUrl = (product, retailer) => {
    // Scraped URLs keyed: productUrls[brand-expression][market][retailerId]
    const productKey = product.brand.toLowerCase().replace(/[^a-z0-9]/g, '-') + '-' + product.expression.toLowerCase().replace(/[^a-z0-9]/g, '-')
    if (productUrls && productUrls[productKey] && productUrls[productKey][market] && productUrls[productKey][market][retailer.id]) {
      return productUrls[productKey][market][retailer.id]
    }
    return buildProductUrl(retailer, product)
  }

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-xl border border-gray-100 p-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="font-display text-lg text-navy flex items-center gap-2"><Columns size={16} /> Retailer Price Comparison</h2>
            <p className="text-[11px] text-gray-500 mt-0.5">Compare prices across all retailers in a market. Click any price to view the product on that retailer\u2019s website.</p>
          </div>
          <div className="flex items-center gap-1 text-[10px] bg-amber-50 text-amber-700 px-2 py-1 rounded">
            <Package size={10} />
            <span>All prices per {config.bottleSize} ({config.bottleMl}ml)</span>
          </div>
        </div>

        {/* Market selector */}
        <div className="flex gap-1 flex-wrap mb-4">
          {Object.entries(MARKET_CONFIG).map(([key, cfg]) => (
            <button key={key} onClick={() => setMarket(key)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${market === key ? 'bg-navy text-white' : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'}`}>
              {cfg.flag} {cfg.label}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative mb-4">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input type="text" placeholder="Search product (e.g. Smirnoff Ice, Hennessy, Tanqueray)..." value={compareSearch} onChange={e => setCompareSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-navy/20" />
        </div>

        {/* Link indicator */}
        <div className="flex items-center gap-2 mb-3 text-[10px] text-gray-500">
          <ExternalLink size={10} className="text-blue-500" />
          <span>Click any price to visit the retailer\u2019s product page. URLs update automatically every 3 days via the price scraper.</span>
        </div>

        {/* Indicative Pricing banner */}
        <div className="bg-amber-50 border border-amber-200 rounded-lg px-4 py-3 mb-4 flex items-start gap-3">
          <AlertCircle size={14} className="text-amber-700 mt-0.5 flex-shrink-0" />
          <p className="text-[11px] text-amber-700 leading-relaxed">Prices shown are indicative and sourced Feb 2026. Click any price to verify on the retailer\u2019s website, or toggle Edit Mode to update prices manually. Your edits are saved locally.</p>
        </div>

        {/* Edit mode controls and comparison table */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <button onClick={() => setEditMode(!editMode)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${editMode ? 'bg-yellow-400 text-white' : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'}`}>
              <Edit3 size={12} />
              <span>{editMode ? 'Done Editing' : 'Edit Prices'}</span>
            </button>
            {hasEdits && !editMode && (
              <button onClick={clearEdits}
                className="flex items-center gap-1 px-2 py-1 rounded text-[10px] text-red-500 hover:bg-red-50 transition-colors">
                <span>Clear edits ({Object.keys(editedPrices).length})</span>
              </button>
            )}
          </div>
        </div>

        {/* Comparison table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-navy text-white">
              <tr>
                <th className="text-left px-3 py-2.5 font-medium text-xs">Brand</th>
                <th className="text-left px-3 py-2.5 font-medium text-xs">Expression</th>
                <th className="text-left px-3 py-2.5 font-medium text-xs">Segment</th>
                {retailers.map(r => (
                  <th key={r.id} className="text-right px-2 py-2.5 font-medium text-xs whitespace-nowrap">
                    <div className="flex flex-col items-end gap-0.5">
                      <span>{r.logo} {r.name}</span>
                      <span className="text-[9px] font-normal text-gray-300">{r.type}</span>
                    </div>
                  </th>
                ))}
                <th className="text-right px-3 py-2.5 font-medium text-xs">Avg</th>
                <th className="text-right px-3 py-2.5 font-medium text-xs">Spread</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((product, idx) => {
                const prices = product.prices[market] || {}
                const vals = retailers.map(r => prices[r.id]).filter(v => v !== null && v !== undefined)
                const avg = vals.length > 0 ? vals.reduce((a, b) => a + b, 0) / vals.length : null
                const min = vals.length > 0 ? Math.min(...vals) : null
                const max = vals.length > 0 ? Math.max(...vals) : null
                const spread = min !== null && max !== null ? max - min : null
                const segInfo = SEGMENT_INFO[product.segment] || { color: 'bg-gray-50 text-gray-500' }

                return (
                  <tr key={idx} className={`${idx % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'} hover:bg-blue-50/30 transition-colors`}>
                    <td className="px-3 py-2 font-medium text-navy text-xs">{product.brand}</td>
                    <td className="px-3 py-2 text-gray-600 text-xs">{product.expression}</td>
                    <td className="px-3 py-2"><span className={`text-[10px] px-1.5 py-0.5 rounded font-medium ${segInfo.color}`}>{product.segment}</span></td>
                    {retailers.map(r => {
                      const price = prices[r.id]
                      const editKey = `${idx}-${market}-${r.id}`
                      const editedPrice = editedPrices[editKey]
                      const displayPrice = editedPrice !== undefined && editedPrice !== null ? editedPrice : price
                      const isEdited = editedPrice !== undefined && editedPrice !== null
                      const isMin = displayPrice === min && displayPrice !== null && vals.length > 1
                      const isMax = displayPrice === max && displayPrice !== null && vals.length > 1
                      const productUrl = displayPrice != null && !editMode ? getProductUrl(product, r) : null
                      const offer = product.offers && product.offers[market] && product.offers[market][r.id]
                      return (
                        <td key={r.id} className="text-right px-2 py-2">
                          {displayPrice !== null && displayPrice !== undefined ? (
                            <div className="flex flex-col items-end">
                              {editMode ? (
                                <input
                                  type="number"
                                  step="0.01"
                                  defaultValue={displayPrice || ''}
                                  onBlur={(e) => updatePrice(idx, market, r.id, e.target.value)}
                                  className="w-16 text-right text-xs font-mono border border-gray-300 rounded px-1 py-0.5 focus:border-yellow-400 focus:outline-none focus:ring-1 focus:ring-yellow-400"
                                  placeholder="\u2014"
                                />
                              ) : (
                                <>
                                  {productUrl ? (
                                    <a href={productUrl} target="_blank" rel="noopener noreferrer"
                                      className="group flex flex-col items-end cursor-pointer hover:opacity-80 transition-opacity">
                                      <span className={`text-xs font-mono font-bold ${isMin ? 'text-green-600' : isMax ? 'text-red-600' : 'text-navy'} group-hover:underline ${isEdited ? 'underline decoration-dashed decoration-1' : ''}`}>
                                        {config.currency}{typeof displayPrice === 'number' ? displayPrice.toFixed(2) : displayPrice}
                                        <ExternalLink size={8} className="inline ml-0.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                                      </span>
                                    </a>
                                  ) : (
                                    <span className={`text-xs font-mono font-bold ${isMin ? 'text-green-600' : isMax ? 'text-red-600' : 'text-navy'} ${isEdited ? 'underline decoration-dashed decoration-1' : ''}`}>
                                      {config.currency}{typeof displayPrice === 'number' ? displayPrice.toFixed(2) : displayPrice}
                                    </span>
                                  )}
                                  {isEdited && (
                                    <Edit3 size={8} className="text-amber-600 mt-0.5" />
                                  )}
                                </>
                              )}
                              {!editMode && offer && (
                                <span className="text-[9px] text-green-600 font-medium mt-0.5">
                                  {config.currency}{offer.price.toFixed(2)} {offer.label}
                                </span>
                              )}
                              {!editMode && isMin && <span className="text-[8px] text-green-600 font-medium">BEST</span>}
                              {!editMode && isMax && <span className="text-[8px] text-red-500 font-medium">HIGH</span>}
                            </div>
                          ) : (
                            <span className="text-[10px] text-gray-300">\u2014</span>
                          )}
                        </td>
                      )
                    })}
                    <td className="text-right px-3 py-2">
                      {avg !== null ? <span className="text-xs font-mono font-bold text-navy">{config.currency}{avg.toFixed(2)}</span> : <span className="text-gray-300">\u2014</span>}
                    </td>
                    <td className="text-right px-3 py-2">
                      {spread !== null ? (
                        <span className={`text-xs font-mono font-medium ${spread > 5 ? 'text-red-500' : spread > 2 ? 'text-amber-500' : 'text-green-500'}`}>
                          {config.currency}{spread.toFixed(2)}
                        </span>
                      ) : <span className="text-gray-300">\u2014</span>}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && (
          <div className="text-center py-8 text-gray-400 text-sm">No products match your search.</div>
        )}
      </div>
    </div>
  )
}

// --- MARKET OVERVIEW TABLE (original compact view) ---
function MarketOverviewTable({ data, handleSort, sortBy, sortDir }) {
  const SortIcon = ({ col }) => {
    if (sortBy !== col) return <ArrowUpDown size={12} className="text-gray-300" />
    return sortDir === 'desc' ? <ChevronDown size={12} /> : <ChevronUp size={12} />
  }

  return (
    <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-navy text-white">
            <tr>
              <th className="text-left px-4 py-3 font-medium">Company</th>
              <th className="text-left px-4 py-3 font-medium">Brand</th>
              <th className="text-left px-4 py-3 font-medium">Expression</th>
              <th className="text-left px-4 py-3 font-medium">Category</th>
              <th className="text-left px-4 py-3 font-medium">Segment</th>
              <th className="text-right px-4 py-3 font-medium cursor-pointer hover:text-gold select-none" onClick={() => handleSort('usa')}>
                <span className="inline-flex items-center gap-1 text-blue-300">{'\ud83c\uddfa\ud83c\uddf8'} USA (750ml) <SortIcon col="usa" /></span>
              </th>
              <th className="text-right px-4 py-3 font-medium cursor-pointer hover:text-gold select-none" onClick={() => handleSort('uk')}>
                <span className="inline-flex items-center gap-1 text-red-300">{'\ud83c\uddec\ud83c\udde7'} UK (70cl) <SortIcon col="uk" /></span>
              </th>
              <th className="text-right px-4 py-3 font-medium cursor-pointer hover:text-gold select-none" onClick={() => handleSort('eu')}>
                <span className="inline-flex items-center gap-1 text-green-300">{'\ud83c\uddea\ud83c\uddfa'} EU (70cl) <SortIcon col="eu" /></span>
              </th>
              <th className="text-right px-4 py-3 font-medium cursor-pointer hover:text-gold select-none" onClick={() => handleSort('me')}>
                <span className="inline-flex items-center gap-1 text-yellow-300">{'\ud83c\udde6\ud83c\uddea'} ME (750ml) <SortIcon col="me" /></span>
              </th>
              <th className="text-right px-4 py-3 font-medium cursor-pointer hover:text-gold select-none" onClick={() => handleSort('differential')}>
                <span className="inline-flex items-center gap-1">Spread <SortIcon col="differential" /></span>
              </th>
              <th className="text-right px-4 py-3 font-medium cursor-pointer hover:text-gold select-none" onClick={() => handleSort('premium_index')}>
                <span className="inline-flex items-center gap-1">Premium % <SortIcon col="premium_index" /></span>
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, i) => {
              const segInfo = SEGMENT_INFO[row.segment] || { color: 'bg-gray-50 text-gray-500' }
              return (
                <tr key={i} className={`${i % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'} hover:bg-blue-50/30 transition-colors`}>
                  <td className="px-4 py-2.5 text-gray-500 text-xs">{row.company}</td>
                  <td className="px-4 py-2.5 font-medium text-navy">{row.brand}</td>
                  <td className="px-4 py-2.5 text-gray-600 text-xs">{row.expression}</td>
                  <td className="px-4 py-2.5"><span className="text-[10px] bg-gray-100 text-gray-600 px-2 py-0.5 rounded">{row.category}</span></td>
                  <td className="px-4 py-2.5"><span className={`text-[10px] px-2 py-0.5 rounded font-medium ${segInfo.color}`}>{row.segment}</span></td>
                  <td className="px-4 py-2.5 text-right text-sm font-mono">{row.usa ? `$${row.usa}` : '\u2014'}</td>
                  <td className="px-4 py-2.5 text-right text-sm font-mono">{row.uk ? `\u00a3${row.uk}` : '\u2014'}</td>
                  <td className="px-4 py-2.5 text-right text-sm font-mono">{row.eu ? `\u20ac${row.eu}` : '\u2014'}</td>
                  <td className="px-4 py-2.5 text-right text-sm font-mono">{row.me ? `$${row.me}` : '\u2014'}</td>
                  <td className="px-4 py-2.5 text-right">
                    <span className={`text-xs font-medium ${row.differential > 30 ? 'text-red-500' : row.differential > 15 ? 'text-amber-500' : 'text-green-500'}`}>
                      ${row.differential}
                    </span>
                  </td>
                  <td className="px-4 py-2.5 text-right">
                    <span className="text-xs font-medium text-navy">{Math.round((row.premium_index || 0) * 100)}%</span>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function CategoryOverview() {
  const categoryData = useMemo(() => {
    const cats = [...new Set(PRICING.map(p => p.category))]
    const colors = ['#DC2626', '#2563EB', '#059669', '#D97706', '#7C3AED', '#EC4899', '#14B8A6', '#F59E0B', '#6366F1', '#EF4444', '#8B5CF6', '#10B981']
    return cats.map((cat, i) => {
      const items = PRICING.filter(p => p.category === cat)
      const usPrices = items.map(p => p.usa).filter(Boolean)
      return { category: cat, count: items.length, minPrice: usPrices.length > 0 ? Math.min(...usPrices) : 0, maxPrice: usPrices.length > 0 ? Math.max(...usPrices) : 0, avgPrice: usPrices.length > 0 ? Math.round(usPrices.reduce((a, b) => a + b, 0) / usPrices.length) : 0, color: colors[i % colors.length] }
    })
  }, [])

  return (
    <div className="bg-white rounded-xl border border-gray-100 p-6">
      <h2 className="font-display text-lg text-navy mb-4">Category Price Ranges (US avg)</h2>
      <div className="space-y-3">
        {categoryData.map((d, i) => {
          const maxWidth = Math.max(...categoryData.map(x => x.maxPrice))
          return (
            <div key={i} className="flex items-center gap-3">
              <div className="text-xs font-medium text-gray-600 w-32 text-right">{d.category}</div>
              <div className="flex-1 relative h-6 bg-gray-50 rounded-full overflow-hidden">
                <div className="absolute h-full rounded-full opacity-20" style={{ width: `${(d.maxPrice / maxWidth) * 100}%`, backgroundColor: d.color }} />
                <div className="absolute h-full rounded-full opacity-60" style={{ width: `${(d.avgPrice / maxWidth) * 100}%`, backgroundColor: d.color }} />
                <div className="absolute h-full rounded-full" style={{ width: `${(d.minPrice / maxWidth) * 100}%`, backgroundColor: d.color, opacity: 0.9 }} />
                <div className="absolute inset-0 flex items-center px-2">
                  <span className="text-[10px] font-bold text-white drop-shadow">${d.minPrice}\u2013${d.avgPrice}\u2013${d.maxPrice}</span>
                </div>
              </div>
              <div className="text-xs text-gray-400 w-16 text-right">{d.count} items</div>
            </div>
          )
        })}
      </div>
      <div className="text-[10px] text-gray-400 mt-3">Range: entry \u2014 average \u2014 top expression. US 750ml prices shown.</div>
    </div>
  )
}

function PricingUpdateBanner({ lastUpdated }) {
  return (
    <div className="bg-gradient-to-r from-navy/5 to-gold/5 rounded-xl border border-gold/20 p-4 flex items-center justify-between flex-wrap gap-3">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-gold/10 flex items-center justify-center">
          <RefreshCw size={14} className="text-gold" />
        </div>
        <div>
          <p className="text-xs font-medium text-navy">Real-Time Pricing Monitor</p>
          <p className="text-[10px] text-gray-500">
            Prices sourced from {Object.values(RETAILERS).flat().length} retailers across {Object.keys(MARKET_CONFIG).length} markets.
            {lastUpdated ? ` Last updated: ${new Date(lastUpdated).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}` : ' Seed data \u2014 live scraping every 3 days.'}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-3 text-[10px]">
        <span className="flex items-center gap-1 text-green-600"><span className="w-1.5 h-1.5 rounded-full bg-green-500" /> {PRICING.length} expressions</span>
        <span className="text-gray-300">|</span>
        <span className="flex items-center gap-1 text-blue-600"><Store size={10} /> {Object.values(RETAILERS).flat().length} retailers</span>
        <span className="text-gray-300">|</span>
        <span className="flex items-center gap-1 text-gray-500"><Package size={10} /> Bottle sizes vary by market</span>
      </div>
    </div>
  )
}

// \u2500\u2500 Main Component \u2500\u2500
export default function BrandPricing() {
  const [viewMode, setViewMode] = useState('compare') // 'compare' = retailer comparison (default), 'overview' = market overview
  const [filter, setFilter] = useState('all')
  const [segmentFilter, setSegmentFilter] = useState('all')
  const [sortBy, setSortBy] = useState('premium_index')
  const [sortDir, setSortDir] = useState('desc')
  const [search, setSearch] = useState('')
  const [showCount, setShowCount] = useState(50)
  const [lastUpdated, setLastUpdated] = useState(null)
  const [retailerMarket, setRetailerMarket] = useState('uk')
  const [productUrls, setProductUrls] = useState({})

  useEffect(() => {
    fetch('/api/pricing/latest')
      .then(r => r.ok ? r.json() : null)
      .then(data => {
        if (data && data.lastUpdated) setLastUpdated(data.lastUpdated)
        if (data && data.productUrls) setProductUrls(data.productUrls)
      })
      .catch(() => {})
  }, [])

  const filtered = useMemo(() => {
    let data = PRICING
    if (filter !== 'all') data = data.filter(p => p.category === filter)
    if (segmentFilter !== 'all') data = data.filter(p => p.segment === segmentFilter)
    if (search) {
      const q = search.toLowerCase()
      data = data.filter(p => p.brand.toLowerCase().includes(q) || p.expression.toLowerCase().includes(q) || p.company.toLowerCase().includes(q))
    }
    data = [...data].sort((a, b) => { const av = a[sortBy] || 0; const bv = b[sortBy] || 0; return sortDir === 'desc' ? bv - av : av - bv })
    return data
  }, [filter, segmentFilter, search, sortBy, sortDir])

  const displayed = filtered.slice(0, showCount)

  const handleSort = (col) => {
    if (sortBy === col) setSortDir(d => d === 'desc' ? 'asc' : 'desc')
    else { setSortBy(col); setSortDir('desc') }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl text-navy">Brand Pricing Monitor</h1>
        <p className="text-gray-500 text-sm mt-1">
          Retailer-level RRP comparison across {Object.keys(MARKET_CONFIG).length} markets \u2014 {PRICING.length} expressions tracked across {Object.values(RETAILERS).flat().length} retailers
        </p>
      </div>

      <PricingUpdateBanner lastUpdated={lastUpdated} />

      {/* View Mode Tabs */}
      <div className="flex gap-2">
        <button onClick={() => setViewMode('compare')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${viewMode === 'compare' ? 'bg-navy text-white shadow-lg shadow-navy/20' : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'}`}>
          <Columns size={16} />
          <span>Retailer Comparison</span>
        </button>
        <button onClick={() => setViewMode('overview')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${viewMode === 'overview' ? 'bg-navy text-white shadow-lg shadow-navy/20' : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'}`}>
          <BarChart3 size={16} />
          <span>Market Overview</span>
        </button>
      </div>

      {/* Retailer Directory \u2014 always visible */}
      <RetailerDirectory selectedMarket={viewMode === 'compare' ? 'uk' : retailerMarket} />

      {viewMode === 'compare' ? (
        <RetailerComparisonView productUrls={productUrls} />
      ) : (
        <>
          <SegmentInfoPanel />
          <CategoryOverview />

          {/* Filters */}
          <div className="space-y-3">
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input type="text" placeholder="Search brand, expression, or company..." value={search} onChange={e => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy" />
            </div>
            <div className="flex gap-2 flex-wrap items-center">
              <Filter size={14} className="text-gray-400" />
              {CATEGORIES.map(cat => (
                <button key={cat} onClick={() => { setFilter(cat); setShowCount(50) }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors capitalize ${filter === cat ? 'bg-navy text-white' : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'}`}>
                  {cat}
                </button>
              ))}
            </div>
            <div className="flex gap-2 flex-wrap items-center">
              <span className="text-xs text-gray-400">Segment:</span>
              {SEGMENTS.map(seg => (
                <button key={seg} onClick={() => { setSegmentFilter(seg); setShowCount(50) }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors capitalize ${segmentFilter === seg ? 'bg-gold text-white' : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'}`}>
                  {seg}
                </button>
              ))}
            </div>
          </div>

          <div className="text-xs text-gray-400">
            Showing {displayed.length} of {filtered.length} expressions. Column headers show bottle sizes per market.
          </div>

          <MarketOverviewTable data={displayed} handleSort={handleSort} sortBy={sortBy} sortDir={sortDir} />

          {filtered.length > showCount && (
            <div className="text-center">
              <button onClick={() => setShowCount(c => c + 50)} className="px-6 py-2 rounded-lg bg-navy text-white text-sm font-medium hover:bg-navy-light transition-colors">
                Show More ({filtered.length - showCount} remaining)
              </button>
            </div>
          )}
        </>
      )}

      {/* Methodology */}
      <div className="bg-white rounded-xl border border-gray-100 p-4">
        <h3 className="text-xs font-semibold text-navy mb-2 flex items-center gap-2"><AlertCircle size={12} /> Pricing Methodology</h3>
        <p className="text-[11px] text-gray-500 leading-relaxed">
          Prices represent recommended retail prices (RRP). <strong>Bottle sizes vary by market:</strong> UK and EU markets use the standard 70cl (700ml) bottle; US and Middle East markets use 750ml (25.4 fl oz).
          UK prices in GBP (\u00a3), EU prices in EUR (\u20ac), US and Middle East in USD ($).
          Market averages are calculated from available retailer prices. EU average aggregates Spain, France, Germany, Italy, and Netherlands.
          Null values indicate the product is not stocked at that retailer. Prices updated via automated scraping every 3 days.
        </p>
        <div className="mt-3 grid grid-cols-2 sm:grid-cols-4 gap-2">
          {Object.entries(MARKET_CONFIG).map(([key, cfg]) => (
            <div key={key} className="flex items-center gap-2 text-[10px] bg-gray-50 text-gray-600 px-2.5 py-1.5 rounded-lg border border-gray-100">
              <span className="text-sm">{cfg.flag}</span>
              <div>
                <p className="font-medium">{cfg.label}</p>
                <p className="text-gray-400">{(RETAILERS[key] || []).length} retailers \u00b7 {cfg.bottleSize} bottle \u00b7 {cfg.currency}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
