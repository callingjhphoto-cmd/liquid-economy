import React, { useState, useCallback } from 'react';
import {
  Target, Calendar, Sliders, AlertTriangle, BarChart3,
  ChevronRight, ChevronLeft, ChevronDown, ChevronUp,
  DollarSign, TrendingUp, Globe, Package, Zap, Users,
  Megaphone, Wine, ShoppingCart, MapPin, Clock, CheckCircle,
  Download, ExternalLink, Sparkles, Film, Camera, Image,
  FileText, Music, Mic, Star, Heart, Sun, Snowflake,
  PartyPopper, Beer, GlassWater, Utensils
} from 'lucide-react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const CampaignPlanner = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [expandedOccasion, setExpandedOccasion] = useState(null);
  const [expandedEvent, setExpandedEvent] = useState(null);
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
    { id: 'awareness', label: 'Brand Awareness', desc: 'Build visibility and recognition in market' },
    { id: 'volume', label: 'Volume Push', desc: 'Move X cases in market' },
    { id: 'trial', label: 'Trial Generation', desc: 'Reach new drinkers' },
    { id: 'premium', label: 'Premiumization', desc: 'Trade up from standard' },
    { id: 'cultural', label: 'Cultural Moment', desc: 'Attach to event/occasion' },
  ];


  // Smart competitor matching - matches like-for-like
  const getCompetitors = () => {
    const brand = campaignData.brand || campaignData.customBrandName || '';
    const cat = campaignData.category;
    const serve = campaignData.serve;
    const cocktailBase = campaignData.baseSpirit;
    const type = campaignData.campaignType;

    // Cocktail/serve campaigns: compete with similar serves
    if (type === 'cocktail') {
      const cocktailName = (campaignData.cocktailName || '').toLowerCase();
      if (cocktailName.includes('spritz')) {
        return [
          { name: 'Aperol Spritz', position: 'Market leader in spritz category, 62% share of UK spritz serves', threat: 'high' },
          { name: 'Lillet Spritz', position: 'Fast-growing premium alternative, +34% YoY in on-trade', threat: 'medium' },
          { name: 'Hugo Spritz', position: 'Elderflower-based spritz gaining traction in summer months', threat: 'medium' },
          { name: 'St-Germain Spritz', position: 'Ultra-premium positioning, strong in cocktail bars', threat: 'low' },
        ];
      }
      if (cocktailName.includes('margarita')) {
        return [
          { name: 'Tommy\u2019s Margarita (Patr\u00f3n)', position: 'Premium margarita benchmark, dominant in cocktail bars', threat: 'high' },
          { name: 'Classic Margarita (Cuervo)', position: 'Volume leader at value-mid tier, strong off-trade RTD', threat: 'high' },
          { name: 'Casamigos Margarita', position: 'Celebrity-backed, strong social media presence 25-35 demo', threat: 'medium' },
        ];
      }
      // Generic cocktail competitors by base spirit
      const spiritCompetitors = {
        Tequila: [{ name: 'Patr\u00f3n', position: 'Premium tequila leader', threat: 'high' }, { name: 'Casamigos', position: 'Fastest-growing premium tequila', threat: 'high' }],
        Vodka: [{ name: 'Grey Goose', position: 'Ultra-premium vodka benchmark', threat: 'high' }, { name: 'Belvedere', position: 'Luxury vodka, strong on-trade', threat: 'medium' }],
        Gin: [{ name: 'Tanqueray', position: 'On-trade gin leader', threat: 'high' }, { name: 'Hendrick\u2019s', position: 'Premium gin innovator', threat: 'high' }],
        Whisky: [{ name: 'Johnnie Walker', position: 'Global whisky leader', threat: 'high' }, { name: 'Jameson', position: 'Fastest-growing Irish whiskey', threat: 'high' }],
        Rum: [{ name: 'Bacardi', position: 'Volume rum leader globally', threat: 'high' }, { name: 'Havana Club', position: 'Strong in European on-trade', threat: 'medium' }],
        Cognac: [{ name: 'Hennessy', position: 'Category leader, 50%+ global share', threat: 'high' }, { name: 'R\u00e9my Martin', position: 'Premium-luxury cognac leader', threat: 'medium' }],
        Wine: [{ name: 'Whispering Angel', position: 'Ros\u00e9 category leader', threat: 'high' }, { name: 'Cloudy Bay', position: 'Premium NZ benchmark', threat: 'medium' }],
      };
      return spiritCompetitors[cocktailBase] || [{ name: 'Market leaders in category', position: 'Select a base spirit for specific competitors', threat: 'medium' }];
    }

    // Existing brand / new product: compete within same category
    const categoryCompetitors = {
      tequila: [
        { name: 'Patr\u00f3n Silver', position: 'Premium tequila #1 in UK on-trade, ~22% category share', threat: 'high' },
        { name: 'Casamigos Blanco', position: 'Fastest-growing tequila brand UK +45% YoY, strong 25-35 demo', threat: 'high' },
        { name: 'Don Julio Blanco', position: 'Ultra-premium positioning, #1 in US on-trade', threat: 'medium' },
      ],
      vodka: [
        { name: 'Grey Goose', position: 'Ultra-premium vodka leader, strong gifting & on-trade', threat: 'high' },
        { name: 'Absolut', position: 'Volume leader mid-tier, massive marketing spend', threat: 'high' },
        { name: 'Belvedere', position: 'Luxury vodka, strong in London on-trade', threat: 'medium' },
      ],
      gin: [
        { name: 'Tanqueray', position: 'UK on-trade gin #1, ~18% share, strong bartender loyalty', threat: 'high' },
        { name: 'Hendrick\u2019s', position: 'Premium gin pioneer, strong brand identity', threat: 'high' },
        { name: 'Bombay Sapphire', position: 'Global premium gin leader, ~15% UK share', threat: 'medium' },
      ],
      whisky: [
        { name: 'Johnnie Walker', position: 'Global Scotch #1, multi-tier portfolio from Red to Blue', threat: 'high' },
        { name: 'Glenfiddich', position: 'Single malt leader, strong off-trade gifting', threat: 'high' },
        { name: 'Jack Daniel\u2019s', position: 'US whiskey #1, dominant in mixed serves', threat: 'medium' },
      ],
      rum: [
        { name: 'Bacardi', position: 'Global rum leader by volume, massive marketing', threat: 'high' },
        { name: 'Havana Club', position: 'Strong European presence, authentic Cuban positioning', threat: 'medium' },
        { name: 'Diplom\u00e1tico', position: 'Premium dark rum leader, strong in sipping occasions', threat: 'medium' },
      ],
      cognac: [
        { name: 'Hennessy', position: 'Category leader globally, 50%+ share, VS through XO', threat: 'high' },
        { name: 'R\u00e9my Martin', position: 'VSOP/XO specialist, strong in Asian markets', threat: 'high' },
        { name: 'Courvoisier', position: 'Mid-tier cognac, strong UK off-trade presence', threat: 'medium' },
      ],
      champagne: [
        { name: 'Mo\u00ebt & Chandon', position: 'Global champagne #1, ~25% market share', threat: 'high' },
        { name: 'Veuve Clicquot', position: 'Premium champagne leader, strong gifting', threat: 'high' },
        { name: 'Laurent-Perrier', position: 'Ros\u00e9 champagne pioneer, UK favourite', threat: 'medium' },
      ],
      wine: [
        { name: 'Whispering Angel', position: 'Ros\u00e9 market leader, aspirational positioning', threat: 'high' },
        { name: 'Cloudy Bay', position: 'Premium Sauvignon Blanc benchmark', threat: 'medium' },
        { name: 'Campo Viejo', position: 'UK Rioja #1, strong off-trade distribution', threat: 'medium' },
      ],
      beer: [
        { name: 'Peroni Nastro Azzurro', position: 'Premium lager leader in UK on-trade', threat: 'high' },
        { name: 'Heineken', position: 'Global beer #2, massive distribution', threat: 'high' },
        { name: 'Corona', position: 'Summer/occasion beer leader, strong brand identity', threat: 'medium' },
      ],
      nolo: [
        { name: 'Seedlip', position: 'Pioneer of non-alcoholic spirits, premium positioning', threat: 'high' },
        { name: 'Lyre\u2019s', position: 'Widest no/lo range, strong cocktail positioning', threat: 'high' },
        { name: 'CleanCo', position: 'Spencer Matthews-backed, strong social media', threat: 'medium' },
      ],
      rtd: [
        { name: 'White Claw', position: 'Hard seltzer leader, dominant 21-30 demographic', threat: 'high' },
        { name: 'Fever-Tree G&T', position: 'Premium RTD benchmark, strong off-trade', threat: 'medium' },
        { name: 'Jack & Coke', position: 'Newly launched RTD, massive brand recognition', threat: 'medium' },
      ],
    };

    // Filter out the selected brand from competitors
    const comps = categoryCompetitors[cat] || [];
    return comps.filter(c => !brand || !c.name.toLowerCase().includes(brand.toLowerCase().split(' ')[0]));
  };


  const culturalCalendars = {
    UK: [
      { name: 'Dry January / Sober Curious Month', date: 'January', serves: ['No/Lo'], channels: ['Off-Trade', 'E-commerce'], campaign: 'Perfect for no/lo brand launches, mindful drinking messaging, Veganuary crossover. Partner with wellness influencers and gym chains.' },
      { name: 'Six Nations Rugby', date: 'February-March', serves: ['Beer', 'Mixed'], channels: ['On-Trade', 'Off-Trade'], campaign: 'Pub-centric activations, multi-screen viewing occasions. Ideal for beer, whisky, and RTD brands. Partner with sports pubs and fan zones.' },
      { name: 'Valentine\u2019s Day', date: 'February', serves: ['Cocktail', 'Champagne'], channels: ['On-Trade', 'Off-Trade'], campaign: 'Premium gifting and cocktail-for-two experiences. Champagne, ros\u00e9, and premium spirits gifting. Restaurant partnerships for set menus.' },
      { name: 'Mother\u2019s Day', date: 'March', serves: ['Cocktail', 'Champagne'], channels: ['Off-Trade', 'On-Trade'], campaign: 'Gifting-led: prosecco, gin, champagne gift sets. Afternoon tea partnerships, brunch activations with florals.' },
      { name: 'The Boat Race', date: 'March-April', serves: ['Champagne', 'Cocktail'], channels: ['On-Trade', 'Festival'], campaign: 'Premium outdoor occasion along Thames. Champagne, Pimm\u2019s, spritz serves. Pop-up bars at viewing points.' },
      { name: 'Easter Bank Holiday', date: 'April', serves: ['Mixed', 'RTD'], channels: ['Off-Trade', 'On-Trade'], campaign: 'Long weekend socialising, BBQ season kickoff. Off-trade multipacks, garden party positioning.' },
      { name: 'London Marathon', date: 'April', serves: ['No/Lo', 'Beer'], channels: ['On-Trade', 'Festival'], campaign: 'Post-race celebration. No/lo for runners, beer for supporters. Experiential activations along route.' },
      { name: 'Chelsea Flower Show', date: 'May', serves: ['Cocktail', 'Champagne'], channels: ['On-Trade', 'Festival'], campaign: 'Ultra-premium botanical positioning. Perfect for gin brands, floral cocktails. VIP hospitality packages.' },
      { name: 'May Bank Holidays', date: 'May', serves: ['Mixed', 'RTD', 'Beer'], channels: ['Off-Trade', 'On-Trade'], campaign: 'Double bank holiday = peak off-trade. BBQ multipacks, garden party serves, pub beer gardens.' },
      { name: 'FA Cup Final', date: 'May', serves: ['Beer', 'Mixed'], channels: ['On-Trade'], campaign: 'Major pub occasion. Beer brand activations, big screen viewing events, pub partnerships.' },
      { name: 'Royal Ascot', date: 'June', serves: ['Champagne', 'Cocktail'], channels: ['On-Trade', 'Festival'], campaign: 'Luxury occasion: champagne, premium cocktails, Pimm\u2019s. Dress code = aspirational lifestyle positioning.' },
      { name: 'Wimbledon', date: 'June-July', serves: ['Cocktail', 'Champagne', 'Mixed'], channels: ['On-Trade', 'Off-Trade', 'Festival'], campaign: 'Strawberries & cream = Pimm\u2019s, champagne, gin. 2-week activation window. Outdoor screenings, pub partnerships.' },
      { name: 'Glastonbury Festival', date: 'June', serves: ['RTD', 'Mixed', 'Beer'], channels: ['Festival'], campaign: 'UK\u2019s biggest festival. RTD dominance, branded bars, artist partnerships. Huge social media amplification.' },
      { name: 'Henley Royal Regatta', date: 'July', serves: ['Champagne', 'Cocktail'], channels: ['Festival', 'On-Trade'], campaign: 'Ultra-premium riverside occasion. Champagne, Pimm\u2019s, premium gin. Corporate hospitality packages.' },
      { name: 'British Grand Prix (Silverstone)', date: 'July', serves: ['Champagne', 'Beer', 'Mixed'], channels: ['Festival', 'On-Trade'], campaign: 'High-energy motorsport occasion. Champagne celebrations, premium beer, cocktail bars in hospitality.' },
      { name: 'Edinburgh Fringe Festival', date: 'August', serves: ['Cocktail', 'Beer', 'Mixed'], channels: ['On-Trade', 'Festival'], campaign: '3 weeks of late-night bar culture. Cocktail bar pop-ups, comedy sponsorships, venue partnerships. Strong arts crowd.' },
      { name: 'Notting Hill Carnival', date: 'August', serves: ['Rum', 'RTD', 'Beer'], channels: ['Festival', 'On-Trade'], campaign: 'Caribbean culture celebration. Rum brands\u2019 biggest UK moment. Sound system sponsorships, jerk food pairings.' },
      { name: 'Summer Festival Season', date: 'June-September', serves: ['RTD', 'Mixed', 'Beer'], channels: ['Festival'], campaign: 'Reading, Leeds, Isle of Wight, BST Hyde Park, All Points East. RTD dominance. Branded activations, sampling.' },
      { name: 'London Cocktail Week', date: 'October', serves: ['Cocktail'], channels: ['On-Trade'], campaign: 'THE cocktail industry moment. 200+ bars participate. Brand pop-ups, limited editions, bartender collaborations. Trade and consumer.' },
      { name: 'Halloween', date: 'October', serves: ['Cocktail', 'RTD'], channels: ['On-Trade', 'Off-Trade'], campaign: 'Themed cocktails, dark spirits positioning, party-focused RTDs. Strong social media content opportunity.' },
      { name: 'Bonfire Night / Guy Fawkes', date: 'November', serves: ['Whisky', 'Mixed', 'RTD'], channels: ['Off-Trade', 'On-Trade'], campaign: 'Outdoor winter warming occasions. Whisky, mulled wine, hot toddy serves. Fireworks event sponsorships.' },
      { name: 'Black Friday / Cyber Monday', date: 'November', serves: ['All'], channels: ['Off-Trade', 'E-commerce'], campaign: 'E-commerce and off-trade gifting peak. Premium spirits discounting, gift set launches. 40% of annual online spirit sales.' },
      { name: 'Christmas Party Season', date: 'November-December', serves: ['Cocktail', 'Champagne', 'Mixed'], channels: ['On-Trade'], campaign: '6 weeks of peak on-trade. Corporate and social parties. Champagne, premium cocktails, group serves. Key revenue period.' },
      { name: 'Christmas Gifting', date: 'December', serves: ['Neat', 'Cocktail'], channels: ['Off-Trade', 'E-commerce', 'Travel Retail'], campaign: 'Single biggest spirits sales period. Gift sets, limited editions, premium packaging. Travel retail duty-free peak.' },
      { name: 'New Year\u2019s Eve', date: 'December', serves: ['Champagne', 'Cocktail'], channels: ['On-Trade', 'Off-Trade'], campaign: 'Champagne\u2019s biggest night. Premium sparkling, cocktail kits for home. On-trade premium pricing opportunity.' },
      { name: 'Burns Night', date: 'January', serves: ['Whisky', 'Neat'], channels: ['On-Trade', 'Off-Trade'], campaign: 'Scottish whisky celebration. Tasting events, supper club partnerships, haggis pairing menus. Strong for single malts.' },
      { name: 'Pride Season', date: 'June-July', serves: ['Cocktail', 'RTD', 'Mixed'], channels: ['On-Trade', 'Festival'], campaign: 'London Pride + regional events. Rainbow branding, cocktail specials, festival sponsorships. Inclusive brand messaging.' },
      { name: 'The Open Championship (Golf)', date: 'July', serves: ['Whisky', 'Champagne', 'Beer'], channels: ['On-Trade', 'Festival'], campaign: 'Premium sports occasion. Whisky and champagne in hospitality. Corporate entertainment packages.' },
      { name: 'The Ashes (Cricket)', date: 'June-August (home years)', serves: ['Beer', 'Champagne', 'Mixed'], channels: ['On-Trade', 'Festival'], campaign: 'Long-form sporting occasion. Beer and Pimm\u2019s in stands. Hospitality box champagne. 5-match series = extended campaign.' },
    ],
    US: [
      { name: 'Super Bowl', date: 'February', serves: ['Beer', 'Mixed', 'RTD'], channels: ['On-Trade', 'Off-Trade'], campaign: 'Biggest single-day consumption event. TV ads, bar activations, party packs. 1.4B+ wings consumed.' },
      { name: 'St. Patrick\u2019s Day', date: 'March', serves: ['Beer', 'Whisky'], channels: ['On-Trade'], campaign: 'Irish whiskey and beer dominance. Green-themed activations, pub crawls. Jameson\u2019s biggest US moment.' },
      { name: 'March Madness', date: 'March-April', serves: ['Beer', 'Mixed'], channels: ['On-Trade'], campaign: '3-week basketball tournament. Sports bar activations, bracket promotions, beer brand partnerships.' },
      { name: 'Cinco de Mayo', date: 'May', serves: ['Tequila', 'Cocktail', 'Beer'], channels: ['On-Trade', 'Off-Trade'], campaign: 'Tequila and Mexican beer\u2019s peak. Margarita promotions, Corona/Modelo activations.' },
      { name: 'Memorial Day', date: 'May', serves: ['Mixed', 'RTD', 'Beer'], channels: ['Off-Trade'], campaign: 'Summer kickoff BBQ weekend. Off-trade multipacks, outdoor serving occasions.' },
      { name: 'July 4th', date: 'July', serves: ['Beer', 'RTD', 'Mixed'], channels: ['Off-Trade', 'On-Trade'], campaign: 'Peak outdoor occasion. American whiskey, domestic beer, RTD dominance. Red-white-blue branding.' },
      { name: 'Thanksgiving', date: 'November', serves: ['Wine', 'Whisky', 'Cocktail'], channels: ['Off-Trade', 'On-Trade'], campaign: 'Wine\u2019s biggest US moment. Beaujolais Nouveau, premium wine gifting. Whiskey for gathering occasions.' },
      { name: 'Holiday Season', date: 'November-December', serves: ['All'], channels: ['Off-Trade', 'E-commerce', 'Travel Retail'], campaign: 'Premium gifting peak. Limited editions, gift sets, luxury packaging. Key revenue period.' },
    ],
    Spain: [
      { name: 'Feria de Abril', date: 'April', serves: ['Sherry', 'Wine', 'Beer'], channels: ['Festival', 'On-Trade'], campaign: 'Seville\u2019s iconic fair. Fino and Manzanilla sherry, rebujito cocktails. 2-week cultural moment.' },
      { name: 'San Ferm\u00edn / Running of the Bulls', date: 'July', serves: ['Beer', 'Wine', 'Mixed'], channels: ['Festival', 'On-Trade'], campaign: 'Pamplona festival, global media coverage. Sangria, local beer, party atmosphere.' },
      { name: 'La Tomatina', date: 'August', serves: ['Beer', 'Mixed'], channels: ['Festival', 'On-Trade'], campaign: 'Bu\u00f1ol tomato festival, tourist-heavy. Beer and mixed drink activations.' },
      { name: 'Ibiza Season', date: 'May-October', serves: ['Cocktail', 'Champagne', 'Mixed'], channels: ['On-Trade', 'Festival'], campaign: 'Global nightlife capital. Premium spirits in clubs, beach club champagne, VIP bottle service.' },
    ],
    France: [
      { name: 'Cannes Film Festival', date: 'May', serves: ['Champagne', 'Cocktail'], channels: ['On-Trade', 'Festival'], campaign: 'Ultra-luxury positioning. Champagne dominance, VIP parties, celebrity endorsement opportunities.' },
      { name: 'Tour de France', date: 'July', serves: ['Beer', 'Wine'], channels: ['On-Trade', 'Festival'], campaign: '3-week sporting event. Roadside activations, regional wine pairings, beer sponsorships.' },
      { name: 'Beaujolais Nouveau', date: 'November', serves: ['Wine'], channels: ['On-Trade', 'Off-Trade'], campaign: 'Annual wine release event. Global media attention, restaurant partnerships, tasting events.' },
      { name: 'Paris Cocktail Week', date: 'January', serves: ['Cocktail'], channels: ['On-Trade'], campaign: 'Trade and consumer cocktail event. Brand pop-ups, bartender collaborations.' },
    ],
    Germany: [
      { name: 'Oktoberfest', date: 'September-October', serves: ['Beer'], channels: ['Festival', 'On-Trade'], campaign: 'World\u2019s largest beer festival. Brand activations in beer tents, limited editions. 6M+ visitors.' },
      { name: 'Christmas Markets', date: 'November-December', serves: ['Wine', 'Mixed'], channels: ['Festival', 'Off-Trade'], campaign: 'Gl\u00fchwein and winter warming serves. Branded stands, premium mulled wine, gift packaging.' },
      { name: 'Bar Convent Berlin', date: 'October', serves: ['Cocktail', 'All'], channels: ['On-Trade'], campaign: 'Europe\u2019s largest bar/spirits trade show. Product launches, bartender engagement.' },
    ],
    Italy: [
      { name: 'Venice Carnival', date: 'February', serves: ['Cocktail', 'Champagne'], channels: ['On-Trade'], campaign: 'Luxury cocktail culture. Bellini in Harry\u2019s Bar, prosecco dominance, masquerade events.' },
      { name: 'Milan Design Week', date: 'April', serves: ['Cocktail', 'Wine'], channels: ['On-Trade'], campaign: 'Design-meets-drinks. Premium cocktail pop-ups, artistic brand collaborations.' },
      { name: 'Aperitivo Hour Culture', date: 'Year-round', serves: ['Cocktail', 'Wine'], channels: ['On-Trade'], campaign: 'Daily 6-9pm ritual. Spritz, Negroni, vermouth serves. The heartland of aperitivo culture.' },
    ],
    Netherlands: [
      { name: 'King\u2019s Day', date: 'April', serves: ['Beer', 'Mixed', 'RTD'], channels: ['Festival', 'On-Trade'], campaign: 'National celebration, massive outdoor drinking occasion. Orange-branded everything.' },
      { name: 'Amsterdam Dance Event', date: 'October', serves: ['Mixed', 'RTD', 'Beer'], channels: ['On-Trade', 'Festival'], campaign: 'World\u2019s largest electronic music conference. Club activations, DJ partnerships.' },
    ],
    'Middle East': [
      { name: 'Dubai Shopping Festival', date: 'January', serves: ['All'], channels: ['Travel Retail', 'On-Trade'], campaign: 'Premium retail moment. Duty-free activations, hotel bar partnerships, luxury positioning.' },
      { name: 'Formula 1 Abu Dhabi', date: 'November', serves: ['Champagne', 'Cocktail'], channels: ['On-Trade'], campaign: 'Ultra-premium motorsport occasion. VIP hospitality, champagne celebrations.' },
      { name: 'Ramadan/Eid', date: 'Variable', serves: ['No/Lo'], channels: ['Off-Trade', 'On-Trade'], campaign: 'No/lo alcohol moment. Luxury non-alcoholic positioning, gifting occasions during Eid.' },
    ],
  };


  const occasions = [
    { name: 'After Work Drinks', icon: Clock, serve: 'Cocktail / Beer', channels: ['On-Trade'],
      campaignIdeas: [
        'Partner with 20-30 key bars in target city for \u201c5-7pm happy hour\u201d branded cocktail specials',
        'Create a \u201cFirst Round On Us\u201d digital coupon campaign via Instagram Stories targeting office postcodes',
        'Develop a signature 2-ingredient easy serve that bartenders can make in volume',
        'Sponsor after-work networking events through platforms like Eventbrite or Meetup',
      ]
    },
    { name: 'Celebration / Special Occasion', icon: Zap, serve: 'Champagne / Premium Spirit', channels: ['On-Trade', 'Off-Trade'],
      campaignIdeas: [
        'Launch premium gift packaging exclusive to travel retail and department stores',
        'Create \u201ccelebration moments\u201d UGC campaign encouraging consumers to share their toasts',
        'Partner with high-end restaurants for \u201ccelebration menu\u201d pairings with your brand',
        'Develop limited-edition bottle designs for birthdays, anniversaries, milestones',
      ]
    },
    { name: 'Home Entertaining', icon: Users, serve: 'Mixed / Cocktail Kits', channels: ['Off-Trade', 'E-commerce'],
      campaignIdeas: [
        'Create at-home cocktail kit bundles sold through supermarket and e-commerce partners',
        'Develop recipe card series with QR codes linking to video tutorials',
        'Partner with meal kit companies (HelloFresh, Gousto) for drink-food pairing promos',
        'Launch \u201cDinner Party Edit\u201d campaign with hosting tips, playlist, and cocktail recipes',
      ]
    },
    { name: 'Festival / Outdoor Events', icon: MapPin, serve: 'RTD / Mixed / Beer', channels: ['Festival', 'Travel Retail'],
      campaignIdeas: [
        'Secure branded bar at 3-5 key festivals with experiential activation (photo booth, DJ set)',
        'Develop festival-exclusive SKU or limited-edition packaging with artist collaboration',
        'Create sampling programme targeting 50,000+ consumers across festival season',
        'Launch Instagram/TikTok geofilter campaign at festival sites',
      ]
    },
    { name: 'Date Night', icon: Wine, serve: 'Cocktail / Wine', channels: ['On-Trade'],
      campaignIdeas: [
        'Partner with high-end cocktail bars for \u201cDate Night Menu\u201d featuring your brand in hero serves',
        'Create Hinge/Bumble partnership with drink-brand-sponsored date experiences',
        'Develop \u201cCocktail for Two\u201d sharing serves designed for intimate occasions',
        'Sponsor supper clubs and pop-up dining experiences in key urban markets',
      ]
    },
    { name: 'Brunch / Day Drinking', icon: Sun, serve: 'Cocktail / Champagne / No-Lo', channels: ['On-Trade'],
      campaignIdeas: [
        'Partner with 20+ brunch venues for branded Bloody Mary / Mimosa / Bellini features',
        'Create a \u201cSunday Social\u201d series of ticketed brunch events with live music + cocktails',
        'Develop low-ABV or spritz-based serves for extended daytime occasions',
        'Launch bottomless brunch sponsorship packages at key restaurant groups',
      ]
    },
  ];

  // Product-specific supply chain intelligence
  const getSupplyChainData = () => {
    const cat = campaignData.category;
    const budget = parseFloat(campaignData.budget) || 0;
    const projectedVolume = (budget / 1000) * 2.5;

    const categorySupplyChain = {
      tequila: {
        materials: [
          { name: 'Blue Weber Agave', status: 'amber', detail: 'Agave prices up 12% YoY from Jalisco. 6-8 year maturation cycle means limited supply flexibility.' },
          { name: 'Glass Bottles (Mexico)', status: 'green', detail: 'Stable supply from Mexican glass manufacturers. 8-week lead time.' },
        ],
        production: '4-6 weeks (including resting for Blanco)',
        shipping: '6-8 weeks sea freight from Mexico to UK',
        distribution: '2-3 weeks UK warehouse to retail',
      },
      vodka: {
        materials: [
          { name: 'Grain / Potato Base', status: 'green', detail: 'Wheat and potato commodity prices stable. Multiple sourcing options available.' },
          { name: 'Glass Bottles', status: 'green', detail: 'European glass supply chain operating normally. 6-week lead time.' },
        ],
        production: '2-3 weeks (distillation + filtration)',
        shipping: '2-4 weeks intra-European, 6-8 weeks from US/Russia',
        distribution: '2-3 weeks UK warehouse to retail',
      },
      gin: {
        materials: [
          { name: 'Juniper Berries', status: 'amber', detail: 'Wild juniper harvest varies annually. Tuscan/Macedonian supply slightly constrained.' },
          { name: 'Botanical Mix', status: 'green', detail: 'Coriander, angelica root, citrus peels readily available. Multiple suppliers.' },
          { name: 'Glass Bottles', status: 'green', detail: 'UK glass supply stable. 6-week lead time for standard bottles.' },
        ],
        production: '2-4 weeks (distillation + botanical infusion)',
        shipping: '1-2 weeks if UK-produced, 4-6 weeks if imported',
        distribution: '2-3 weeks UK warehouse to retail',
      },
      whisky: {
        materials: [
          { name: 'Malted Barley', status: 'green', detail: 'Scottish barley supply stable. Forward contracts in place for major distillers.' },
          { name: 'Oak Casks (Ex-Bourbon/Sherry)', status: 'amber', detail: 'Sherry cask prices up 18% due to demand. Ex-bourbon barrels more available.' },
        ],
        production: 'Already aged; bottling takes 2-3 weeks',
        shipping: '1-2 weeks if Scottish/Irish, 6-8 weeks from US/Japan',
        distribution: '2-3 weeks UK warehouse to retail',
      },
      rum: {
        materials: [
          { name: 'Sugarcane / Molasses', status: 'green', detail: 'Caribbean sugarcane harvest stable. Molasses pricing steady.' },
          { name: 'Oak Casks', status: 'green', detail: 'Aged rum uses ex-bourbon casks, readily available.' },
        ],
        production: 'Already aged; bottling takes 2-3 weeks',
        shipping: '6-8 weeks sea freight from Caribbean to UK',
        distribution: '2-3 weeks UK warehouse to retail',
      },
      cognac: {
        materials: [
          { name: 'Ugni Blanc Grapes', status: 'amber', detail: 'Cognac region harvest was moderate. VS stocks adequate, XO allocation may be limited.' },
          { name: 'French Oak Barrels', status: 'green', detail: 'Limousin and Tron\u00e7ais oak supply stable.' },
        ],
        production: 'Already aged; bottling takes 2-3 weeks',
        shipping: '2-4 weeks from Cognac, France to UK',
        distribution: '2-3 weeks UK warehouse to retail',
      },
      champagne: {
        materials: [
          { name: 'Champagne Grapes (Chardonnay/Pinot)', status: 'green', detail: '2024 harvest was good. NV stocks adequate across major houses.' },
          { name: 'Heavy Glass Bottles (Champagne-rated)', status: 'amber', detail: 'Specialist champagne bottles have 8-10 week lead time.' },
        ],
        production: 'Already aged; disgorgement + dressing 3-4 weeks',
        shipping: '2-4 weeks from Champagne to UK',
        distribution: '2-3 weeks UK warehouse to retail',
      },
      wine: {
        materials: [
          { name: 'Wine Grapes (varies by region)', status: 'green', detail: 'Global wine supply in slight surplus. Good availability across major regions.' },
          { name: 'Glass Bottles + Closures', status: 'green', detail: 'Standard wine bottle supply stable. 6-week lead time.' },
        ],
        production: 'Already produced; bottling/labelling 2-3 weeks',
        shipping: '2-4 weeks European, 6-8 weeks New World',
        distribution: '2-3 weeks UK warehouse to retail',
      },
      beer: {
        materials: [
          { name: 'Malted Barley + Hops', status: 'green', detail: 'Barley supply stable. Hop prices steady for standard varieties.' },
          { name: 'Cans / Bottles', status: 'green', detail: 'Aluminium can supply normalised post-COVID. 4-6 week lead time.' },
        ],
        production: '3-6 weeks (brewing + conditioning + packaging)',
        shipping: '1-2 weeks if UK-brewed, 4-6 weeks imported',
        distribution: '1-2 weeks (beer has shorter shelf life)',
      },
      nolo: {
        materials: [
          { name: 'Botanical / Flavour Compounds', status: 'green', detail: 'Natural extracts and distillates readily available from multiple suppliers.' },
          { name: 'Glass Bottles', status: 'green', detail: 'Standard spirit bottle supply stable.' },
        ],
        production: '2-3 weeks (blending + bottling)',
        shipping: '1-2 weeks if UK-produced, 4-6 weeks imported',
        distribution: '2-3 weeks UK warehouse to retail',
      },
      rtd: {
        materials: [
          { name: 'Base Spirit + Mixer Components', status: 'green', detail: 'Base spirit and flavouring supply stable.' },
          { name: 'Cans / PET Bottles', status: 'green', detail: 'Packaging supply normalised. 4-6 week lead time for custom prints.' },
        ],
        production: '2-4 weeks (mixing + canning/bottling)',
        shipping: '1-2 weeks if UK-produced',
        distribution: '1-2 weeks to retail',
      },
    };

    const data = categorySupplyChain[cat] || categorySupplyChain.gin;
    const totalWeeks = parseInt(data.production) + parseInt(data.shipping) + parseInt(data.distribution) || 14;

    let volumeStatus = 'green';
    let volumeMessage = 'Supply chain capacity adequate for projected volume';
    if (projectedVolume > 500) { volumeStatus = 'red'; volumeMessage = 'High volume campaign \u2014 confirm production allocation 16+ weeks in advance'; }
    else if (projectedVolume > 200) { volumeStatus = 'amber'; volumeMessage = 'Moderate volume \u2014 confirm stock allocation with distributor 12 weeks prior'; }

    return { ...data, volumeStatus, volumeMessage, projectedVolume };
  };

  // Content deliverables based on campaign type and channels
  const getContentDeliverables = () => {
    const budget = parseFloat(campaignData.budget) || 0;
    const digital = campaignData.digital;
    const onTrade = campaignData.onTrade;
    const offTrade = campaignData.offTrade;
    const deliverables = [];

    if (digital > 10) {
      deliverables.push({ type: 'Hero Campaign Video', quantity: '1x 30s + 1x 15s cutdown', format: 'MP4 16:9 + 9:16', purpose: 'YouTube pre-roll, Instagram Reels, TikTok', timeline: '4-6 weeks production' });
      deliverables.push({ type: 'Social Static Assets', quantity: `${Math.max(6, Math.round(budget / 5000))}x variants`, format: '1080x1080 + 1080x1920', purpose: 'Instagram feed, Stories, Facebook', timeline: '2-3 weeks design' });
      deliverables.push({ type: 'Short-Form Video Content', quantity: `${Math.max(4, Math.round(budget / 8000))}x pieces`, format: '9:16 vertical, 15-60s', purpose: 'TikTok, Reels, YouTube Shorts', timeline: '2-4 weeks production' });
    }
    if (digital > 20 && budget > 30000) {
      deliverables.push({ type: 'Influencer Content Briefs', quantity: `${Math.max(3, Math.round(budget / 15000))}x briefs`, format: 'Brief document + mood board', purpose: 'Influencer/KOL partnerships', timeline: '1-2 weeks briefing, 2-4 weeks creation' });
    }
    if (onTrade > 10) {
      deliverables.push({ type: 'Point of Sale Materials', quantity: '3-5 variants', format: 'A4 tent cards, A3 posters, bar runners', purpose: 'On-trade venue visibility', timeline: '2-3 weeks design + 2 weeks print' });
      deliverables.push({ type: 'Menu Inserts / Table Talkers', quantity: 'Per-venue (50-200 units)', format: 'A5/A6 printed cards', purpose: 'Serve recommendation at table', timeline: '2 weeks design + 2 weeks print' });
    }
    if (offTrade > 10) {
      deliverables.push({ type: 'Shelf Talkers / Wobblers', quantity: 'Per-store (100-500 units)', format: 'Standard retail POS sizes', purpose: 'Off-trade shelf visibility', timeline: '2 weeks design + 3 weeks print' });
      deliverables.push({ type: 'Promotional Neck Tags', quantity: 'Per-bottle (1000-5000 units)', format: 'Hang tag with recipe/offer', purpose: 'On-pack promotion', timeline: '2 weeks design + 3 weeks print' });
    }
    if (budget > 50000) {
      deliverables.push({ type: 'Brand Photography', quantity: '1x shoot day, 30-50 selects', format: 'Hi-res JPEG/TIFF', purpose: 'All channels, PR, website', timeline: '1 day shoot + 1 week post-production' });
    }

    return deliverables;
  };


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

  const getROIData = () => {
    const budget = parseFloat(campaignData.budget) || 0;
    const isAwareness = campaignData.objective === 'awareness';
    if (isAwareness) {
      const impressions = budget * 120;
      const reach = impressions * 0.6;
      return [
        { scenario: 'Conservative', impressions: impressions * 0.7, reach: reach * 0.7, cpm: (budget / (impressions * 0.7 / 1000)).toFixed(2), awarenessLift: '+4%' },
        { scenario: 'Base Case', impressions, reach, cpm: (budget / (impressions / 1000)).toFixed(2), awarenessLift: '+7%' },
        { scenario: 'Optimistic', impressions: impressions * 1.3, reach: reach * 1.3, cpm: (budget / (impressions * 1.3 / 1000)).toFixed(2), awarenessLift: '+11%' },
      ];
    }
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
      { channel: 'Digital/Social', allocation: campaignData.digital, spent: Math.round(budget * (campaignData.digital / 100)), cpm: 8, reach: Math.round((budget * (campaignData.digital / 100)) * 125), volumeImpact: Math.round((budget * (campaignData.digital / 100)) / 400) },
      { channel: 'On-Trade', allocation: campaignData.onTrade, spent: Math.round(budget * (campaignData.onTrade / 100)), cpm: 15, reach: Math.round((budget * (campaignData.onTrade / 100)) * 67), volumeImpact: Math.round((budget * (campaignData.onTrade / 100)) / 300) },
      { channel: 'Off-Trade', allocation: campaignData.offTrade, spent: Math.round(budget * (campaignData.offTrade / 100)), cpm: 5, reach: Math.round((budget * (campaignData.offTrade / 100)) * 200), volumeImpact: Math.round((budget * (campaignData.offTrade / 100)) / 500) },
      { channel: 'Travel Retail', allocation: campaignData.travelRetail, spent: Math.round(budget * (campaignData.travelRetail / 100)), cpm: 12, reach: Math.round((budget * (campaignData.travelRetail / 100)) * 85), volumeImpact: Math.round((budget * (campaignData.travelRetail / 100)) / 400) },
    ];
  };

  const allocationData = [
    { name: 'Digital/Social', value: campaignData.digital, color: '#1A1F36' },
    { name: 'On-Trade', value: campaignData.onTrade, color: '#C9A96E' },
    { name: 'Off-Trade', value: campaignData.offTrade, color: '#8B6F47' },
    { name: 'Travel Retail', value: campaignData.travelRetail, color: '#D4AF96' },
  ];

  const channelMetrics = getChannelMetrics();

  const isStep1Complete = (() => {
    const base = campaignData.market && campaignData.budget && campaignData.objective;
    if (campaignData.campaignType === 'existing') return base && campaignData.brand && campaignData.serve;
    if (campaignData.campaignType === 'newProduct') return base && campaignData.customBrandName && campaignData.category && campaignData.segment && campaignData.serve;
    if (campaignData.campaignType === 'cocktail') return base && campaignData.cocktailName && campaignData.baseSpirit;
    return false;
  })();

  const getBrandDisplay = () => {
    if (campaignData.campaignType === 'existing') return campaignData.brand;
    if (campaignData.campaignType === 'newProduct') return `${campaignData.customBrandName} (New ${categories.find(c => c.id === campaignData.category)?.label || ''})`;
    return `${campaignData.cocktailName} (${campaignData.baseSpirit}-based)`;
  };

  const handleExport = () => {
    const objective = objectives.find(o => o.id === campaignData.objective);
    const deliverables = getContentDeliverables();
    const competitors = getCompetitors();
    const summary = `CAMPAIGN BRIEF\n${'='.repeat(50)}\n\nBrand: ${getBrandDisplay()}\nMarket: ${campaignData.market}\nPeriod: ${campaignData.startMonth} \u2013 ${campaignData.endMonth}\nBudget: ${getCurrency()}${Number(campaignData.budget).toLocaleString()}\nObjective: ${objective?.label}\n\nCHANNEL ALLOCATION\n- Digital/Social: ${campaignData.digital.toFixed(0)}%\n- On-Trade: ${campaignData.onTrade.toFixed(0)}%\n- Off-Trade: ${campaignData.offTrade.toFixed(0)}%\n- Travel Retail: ${campaignData.travelRetail.toFixed(0)}%\n\nCOMPETITIVE LANDSCAPE\n${competitors.map(c => `- ${c.name}: ${c.position}`).join('\n')}\n\nCONTENT DELIVERABLES\n${deliverables.map(d => `- ${d.quantity} ${d.type} (${d.format})`).join('\n')}\n\nPLATFORM SPLIT (of Digital Budget)\n- Meta/Instagram: ${campaignData.metaInstagram.toFixed(0)}%\n- TikTok: ${campaignData.tiktok.toFixed(0)}%\n- YouTube: ${campaignData.youtube.toFixed(0)}%\n- Influencer/KOL: ${campaignData.influencer.toFixed(0)}%`;
    const blob = new Blob([summary], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = `campaign-brief-${getBrandDisplay().replace(/\s+/g, '-').toLowerCase()}.txt`;
    a.click(); URL.revokeObjectURL(url);
  };


  const renderStep1 = () => (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100 p-6">
        <div className="flex items-start gap-3">
          <Target className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
          <div>
            <h3 className="font-display font-bold text-sm text-blue-900 mb-1">Campaign DNA & True Objective</h3>
            <p className="text-xs text-blue-700">Define your brand, market, budget, and primary goal. This drives everything that follows.</p>
          </div>
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-gray-700 mb-3">Campaign Type</label>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {[
            { id: 'existing', label: 'Existing Brand', icon: Wine },
            { id: 'newProduct', label: 'New Product Launch', icon: Package },
            { id: 'cocktail', label: 'Cocktail/Serve Campaign', icon: Zap }
          ].map(type => {
            const IconComponent = type.icon;
            return (
              <div key={type.id} onClick={() => setCampaignData(prev => ({ ...prev, campaignType: type.id }))}
                className={`p-4 rounded-xl border-2 cursor-pointer transition flex flex-col items-center gap-2 ${
                  campaignData.campaignType === type.id ? 'border-yellow-500 bg-yellow-50' : 'border-gray-200 bg-white hover:border-yellow-300'
                }`}>
                <IconComponent className={`w-5 h-5 ${campaignData.campaignType === type.id ? 'text-yellow-600' : 'text-gray-600'}`} />
                <p className="font-semibold text-xs text-gray-900 text-center">{type.label}</p>
              </div>
            );
          })}
        </div>
      </div>

      {campaignData.campaignType === 'existing' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-2">Category</label>
            <select name="category" value={campaignData.category} onChange={handleInputChange}
              className="w-full px-3 py-2 text-xs border border-gray-200 rounded-lg bg-white text-gray-900 focus:outline-none focus:border-yellow-500">
              <option value="">Select Category</option>
              {categories.map(c => <option key={c.id} value={c.id}>{c.label}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-2">Brand</label>
            <select name="brand" value={campaignData.brand} onChange={handleInputChange}
              className="w-full px-3 py-2 text-xs border border-gray-200 rounded-lg bg-white text-gray-900 focus:outline-none focus:border-yellow-500">
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
            <input type="text" name="customBrandName" value={campaignData.customBrandName} onChange={handleInputChange}
              placeholder="e.g., Aurora Spirits" className="w-full px-3 py-2 text-xs border border-gray-200 rounded-lg bg-white text-gray-900 focus:outline-none focus:border-yellow-500" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-2">Category</label>
              <select name="category" value={campaignData.category} onChange={handleInputChange}
                className="w-full px-3 py-2 text-xs border border-gray-200 rounded-lg bg-white text-gray-900 focus:outline-none focus:border-yellow-500">
                <option value="">Select Category</option>
                {categories.map(c => <option key={c.id} value={c.id}>{c.label}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-2">Segment</label>
              <select name="segment" value={campaignData.segment} onChange={handleInputChange}
                className="w-full px-3 py-2 text-xs border border-gray-200 rounded-lg bg-white text-gray-900 focus:outline-none focus:border-yellow-500">
                <option value="">Select Segment</option>
                {segments.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-2">Product Description</label>
            <textarea name="productDescription" value={campaignData.productDescription} onChange={handleInputChange}
              placeholder="Describe the product, key features, and positioning..."
              className="w-full px-3 py-2 text-xs border border-gray-200 rounded-lg bg-white text-gray-900 focus:outline-none focus:border-yellow-500 h-20 resize-none" />
          </div>
        </div>
      )}

      {campaignData.campaignType === 'cocktail' && (
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-2">Cocktail Name</label>
            <input type="text" name="cocktailName" value={campaignData.cocktailName} onChange={handleInputChange}
              placeholder="e.g., Fino Spritz, Tropical Sunset" className="w-full px-3 py-2 text-xs border border-gray-200 rounded-lg bg-white text-gray-900 focus:outline-none focus:border-yellow-500" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-2">Base Spirit</label>
              <select name="baseSpirit" value={campaignData.baseSpirit} onChange={handleInputChange}
                className="w-full px-3 py-2 text-xs border border-gray-200 rounded-lg bg-white text-gray-900 focus:outline-none focus:border-yellow-500">
                <option value="">Select Base Spirit</option>
                {baseSpirits.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-2">Target Occasion</label>
              <select name="targetOccasion" value={campaignData.targetOccasion} onChange={handleInputChange}
                className="w-full px-3 py-2 text-xs border border-gray-200 rounded-lg bg-white text-gray-900 focus:outline-none focus:border-yellow-500">
                <option value="">Select Occasion</option>
                {cocktailOccasions.map(o => <option key={o} value={o}>{o}</option>)}
              </select>
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-2">Key Ingredients</label>
            <textarea name="ingredients" value={campaignData.ingredients} onChange={handleInputChange}
              placeholder="e.g., Fino sherry, tonic water, orange peel, olive..."
              className="w-full px-3 py-2 text-xs border border-gray-200 rounded-lg bg-white text-gray-900 focus:outline-none focus:border-yellow-500 h-16 resize-none" />
          </div>
        </div>
      )}

      {campaignData.campaignType !== 'cocktail' && (
        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-2">Serve Style</label>
          <select name="serve" value={campaignData.serve} onChange={handleInputChange}
            className="w-full px-3 py-2 text-xs border border-gray-200 rounded-lg bg-white text-gray-900 focus:outline-none focus:border-yellow-500">
            <option value="">Select Serve</option>
            {serves.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-2">Market</label>
          <select name="market" value={campaignData.market} onChange={handleInputChange}
            className="w-full px-3 py-2 text-xs border border-gray-200 rounded-lg bg-white text-gray-900 focus:outline-none focus:border-yellow-500">
            <option value="">Select Market</option>
            {markets.map(m => <option key={m.code} value={m.code}>{m.code}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-2">Budget ({getCurrency()})</label>
          <input type="number" name="budget" value={campaignData.budget} onChange={handleInputChange}
            placeholder="e.g., 50000" className="w-full px-3 py-2 text-xs border border-gray-200 rounded-lg bg-white text-gray-900 focus:outline-none focus:border-yellow-500" />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-2">Campaign Start</label>
          <select name="startMonth" value={campaignData.startMonth} onChange={handleInputChange}
            className="w-full px-3 py-2 text-xs border border-gray-200 rounded-lg bg-white text-gray-900 focus:outline-none focus:border-yellow-500">
            {months.map(m => <option key={m} value={m}>{m}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-2">Campaign End</label>
          <select name="endMonth" value={campaignData.endMonth} onChange={handleInputChange}
            className="w-full px-3 py-2 text-xs border border-gray-200 rounded-lg bg-white text-gray-900 focus:outline-none focus:border-yellow-500">
            {months.map(m => <option key={m} value={m}>{m}</option>)}
          </select>
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-gray-700 mb-3">Primary Objective</label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {objectives.map(obj => (
            <div key={obj.id} onClick={() => setCampaignData(prev => ({ ...prev, objective: obj.id }))}
              className={`p-3 rounded-lg border-2 cursor-pointer transition ${
                campaignData.objective === obj.id ? 'border-yellow-500 bg-yellow-50' : 'border-gray-200 bg-white hover:border-yellow-300'
              }`}>
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
    const competitors = getCompetitors();
    return (
      <div className="space-y-6">
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-100 p-6">
          <div className="flex items-start gap-3">
            <Calendar className="w-5 h-5 text-purple-600 mt-1 flex-shrink-0" />
            <div>
              <h3 className="font-display font-bold text-sm text-purple-900 mb-1">Occasion & Cultural Mapping</h3>
              <p className="text-xs text-purple-700">Align your campaign with cultural moments and drinking occasions in {campaignData.market || 'your market'}.</p>
            </div>
          </div>
        </div>

        {/* Competitive Landscape */}
        <div className="bg-white rounded-xl border border-gray-100 p-4 space-y-3">
          <h4 className="font-semibold text-xs text-gray-900 flex items-center gap-2">
            <Target className="w-4 h-4 text-red-500" />
            Competitive Landscape {campaignData.category ? `\u2014 ${categories.find(c => c.id === campaignData.category)?.label || ''}` : ''}
          </h4>
          {competitors.length > 0 ? (
            <div className="space-y-2">
              {competitors.map((comp, idx) => (
                <div key={idx} className={`border rounded p-3 ${
                  comp.threat === 'high' ? 'border-red-200 bg-red-50' : comp.threat === 'medium' ? 'border-amber-200 bg-amber-50' : 'border-green-200 bg-green-50'
                }`}>
                  <div className="flex items-center justify-between mb-1">
                    <p className="font-semibold text-xs text-gray-900">{comp.name}</p>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${
                      comp.threat === 'high' ? 'bg-red-200 text-red-800' : comp.threat === 'medium' ? 'bg-amber-200 text-amber-800' : 'bg-green-200 text-green-800'
                    }`}>{comp.threat} threat</span>
                  </div>
                  <p className="text-xs text-gray-700">{comp.position}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-xs text-gray-500">Select a category and brand to see competitive landscape</p>
          )}
        </div>

        {/* Cultural Calendar - Expandable */}
        <div className="bg-white rounded-xl border border-gray-100 p-4 space-y-3">
          <h4 className="font-semibold text-xs text-gray-900">Cultural Calendar ({campaignData.market || 'Select Market'})</h4>
          <div className="space-y-2">
            {calendar.length > 0 ? calendar.map((event, idx) => (
              <div key={idx} className="border border-gray-200 rounded-lg overflow-hidden">
                <div className="p-3 cursor-pointer hover:bg-gray-50 transition" onClick={() => setExpandedEvent(expandedEvent === idx ? null : idx)}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <p className="font-semibold text-xs text-gray-900">{event.name}</p>
                      <span className="text-xs text-gray-500">{event.date}</span>
                    </div>
                    {expandedEvent === idx ? <ChevronUp className="w-3 h-3 text-gray-400" /> : <ChevronDown className="w-3 h-3 text-gray-400" />}
                  </div>
                  <div className="flex gap-2 mt-1">
                    {event.serves.map((s, i) => <span key={i} className="inline-block bg-blue-100 text-blue-700 px-2 py-0.5 rounded text-xs">{s}</span>)}
                    {event.channels.map((c, i) => <span key={i} className="inline-block bg-green-100 text-green-700 px-2 py-0.5 rounded text-xs">{c}</span>)}
                  </div>
                </div>
                {expandedEvent === idx && (
                  <div className="px-3 pb-3 border-t border-gray-100 bg-yellow-50">
                    <p className="text-xs text-gray-800 mt-2 leading-relaxed">
                      <span className="font-semibold text-yellow-800">Campaign Opportunity: </span>
                      {event.campaign}
                    </p>
                  </div>
                )}
              </div>
            )) : <p className="text-gray-500 text-xs">Select a market to see cultural events</p>}
          </div>
        </div>

        {/* Clickable Drinking Occasions */}
        <div className="bg-white rounded-xl border border-gray-100 p-4 space-y-3">
          <h4 className="font-semibold text-xs text-gray-900">Drinking Occasions <span className="text-gray-500 font-normal">(click to see campaign ideas)</span></h4>
          <div className="space-y-2">
            {occasions.map((occ, idx) => {
              const Icon = occ.icon;
              const isExpanded = expandedOccasion === idx;
              return (
                <div key={idx} className="border border-gray-200 rounded-lg overflow-hidden">
                  <div className="p-3 cursor-pointer hover:bg-gray-50 transition flex items-center justify-between"
                    onClick={() => setExpandedOccasion(isExpanded ? null : idx)}>
                    <div className="flex items-center gap-3">
                      <Icon className="w-4 h-4 text-gray-700" />
                      <div>
                        <p className="font-semibold text-xs text-gray-900">{occ.name}</p>
                        <p className="text-xs text-gray-600">{occ.serve} | {occ.channels.join(', ')}</p>
                      </div>
                    </div>
                    {isExpanded ? <ChevronUp className="w-3 h-3 text-gray-400" /> : <ChevronDown className="w-3 h-3 text-gray-400" />}
                  </div>
                  {isExpanded && (
                    <div className="px-3 pb-3 border-t border-gray-100 bg-blue-50">
                      <p className="text-xs font-semibold text-blue-800 mt-2 mb-2">Actionable Campaign Ideas:</p>
                      <ul className="space-y-1.5">
                        {occ.campaignIdeas.map((idea, i) => (
                          <li key={i} className="text-xs text-gray-800 flex items-start gap-2">
                            <span className="text-blue-500 mt-0.5 flex-shrink-0">\u2022</span>
                            {idea}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
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
            <p className="text-xs text-green-700">Drag sliders to allocate budget across channels. All channels auto-balance to 100%.</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 p-4 space-y-4">
        <h4 className="font-semibold text-xs text-gray-900">Primary Channel Allocation</h4>
        {['digital', 'onTrade', 'offTrade', 'travelRetail'].map(channel => {
          const labels = { digital: 'Digital/Social', onTrade: 'On-Trade', offTrade: 'Off-Trade', travelRetail: 'Travel Retail' };
          const value = campaignData[channel];
          const budget = parseFloat(campaignData.budget) || 0;
          return (
            <div key={channel} className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-gray-900">{labels[channel]}</label>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-500">{getCurrency()}{Math.round(budget * (value / 100)).toLocaleString()}</span>
                  <span className="text-xs font-bold text-gray-900 w-12 text-right">{value.toFixed(1)}%</span>
                </div>
              </div>
              <input type="range" min="0" max="100" step="0.1" value={value}
                onChange={(e) => handleSliderChange(channel, parseFloat(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-yellow-500" />
            </div>
          );
        })}
      </div>

      <div className="bg-white rounded-xl border border-gray-100 p-4">
        <h4 className="font-semibold text-xs text-gray-900 mb-4">Budget Allocation Breakdown</h4>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie data={allocationData} cx="50%" cy="50%" labelLine={false}
              label={({ name, value }) => `${name}: ${value.toFixed(0)}%`} outerRadius={80} fill="#8884d8" dataKey="value">
              {allocationData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
            </Pie>
            <Tooltip formatter={(value) => `${value.toFixed(1)}%`} />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 p-4 space-y-3">
        <h4 className="font-semibold text-xs text-gray-900">Channel Metrics & Impact</h4>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-2 py-2 text-left font-semibold text-gray-700">Channel</th>
                <th className="px-2 py-2 text-right font-semibold text-gray-700">Budget</th>
                <th className="px-2 py-2 text-right font-semibold text-gray-700">Est. Reach</th>
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
              <input type="range" min="0" max="100" step="0.1" value={campaignData[key]}
                onChange={(e) => handleSubSliderChange('digital', key, parseFloat(e.target.value))}
                className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer accent-blue-600" />
            </div>
          ))}
        </div>
      )}

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
              <input type="range" min="0" max="100" step="0.1" value={campaignData[key]}
                onChange={(e) => handleSubSliderChange('onTrade', key, parseFloat(e.target.value))}
                className="w-full h-2 bg-yellow-200 rounded-lg appearance-none cursor-pointer accent-yellow-600" />
            </div>
          ))}
        </div>
      )}

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
              <input type="range" min="0" max="100" step="0.1" value={campaignData[key]}
                onChange={(e) => handleSubSliderChange('offTrade', key, parseFloat(e.target.value))}
                className="w-full h-2 bg-green-200 rounded-lg appearance-none cursor-pointer accent-green-600" />
            </div>
          ))}
        </div>
      )}
    </div>
  );


  const renderStep4 = () => {
    const supply = getSupplyChainData();
    const deliverables = getContentDeliverables();
    const statusColors = { green: 'bg-green-50 border-green-200 text-green-900', amber: 'bg-amber-50 border-amber-200 text-amber-900', red: 'bg-red-50 border-red-200 text-red-900' };
    const statusIcons = { green: '\u2713', amber: '!', red: '\u00d7' };

    return (
      <div className="space-y-6">
        <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-xl border border-orange-100 p-6">
          <div className="flex items-start gap-3">
            <Package className="w-5 h-5 text-orange-600 mt-1 flex-shrink-0" />
            <div>
              <h3 className="font-display font-bold text-sm text-orange-900 mb-1">Supply Chain & Content Production</h3>
              <p className="text-xs text-orange-700">Product-specific supply chain intelligence and content deliverables for {getBrandDisplay() || 'your brand'}.</p>
            </div>
          </div>
        </div>

        {/* Volume Feasibility */}
        <div className={`rounded-xl border p-4 ${statusColors[supply.volumeStatus]}`}>
          <div className="flex items-start gap-3">
            <span className="font-bold text-lg">{statusIcons[supply.volumeStatus]}</span>
            <div>
              <h4 className="font-semibold text-xs mb-1">Volume Feasibility ({supply.projectedVolume.toFixed(0)} projected cases)</h4>
              <p className="text-xs">{supply.volumeMessage}</p>
            </div>
          </div>
        </div>

        {/* Product-Specific Raw Materials */}
        <div className="bg-white rounded-xl border border-gray-100 p-4 space-y-3">
          <h4 className="font-semibold text-xs text-gray-900 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-600" />
            Raw Materials & Logistics {campaignData.category ? `\u2014 ${categories.find(c => c.id === campaignData.category)?.label || ''}` : ''}
          </h4>
          <div className="space-y-2">
            {supply.materials.map((mat, idx) => (
              <div key={idx} className={`border rounded p-3 ${statusColors[mat.status]}`}>
                <p className="text-xs font-semibold">{mat.name}</p>
                <p className="text-xs mt-1">{mat.detail}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Product Supply Timeline */}
        <div className="bg-white rounded-xl border border-gray-100 p-4 space-y-3">
          <h4 className="font-semibold text-xs text-gray-900 flex items-center gap-2">
            <Clock className="w-4 h-4 text-gray-600" />
            Product Supply Timeline
          </h4>
          <div className="space-y-2 text-xs">
            <div className="flex items-center justify-between pb-2 border-b border-gray-200">
              <span className="font-semibold text-gray-700">Production / Bottling</span>
              <span className="text-gray-600">{supply.production}</span>
            </div>
            <div className="flex items-center justify-between pb-2 border-b border-gray-200">
              <span className="font-semibold text-gray-700">Shipping to Market</span>
              <span className="text-gray-600">{supply.shipping}</span>
            </div>
            <div className="flex items-center justify-between pb-2 border-b border-gray-200">
              <span className="font-semibold text-gray-700">Distribution to Retail</span>
              <span className="text-gray-600">{supply.distribution}</span>
            </div>
          </div>
        </div>

        {/* Content Deliverables - what the agency actually needs to produce */}
        <div className="bg-white rounded-xl border border-gray-100 p-4 space-y-3">
          <h4 className="font-semibold text-xs text-gray-900 flex items-center gap-2">
            <Film className="w-4 h-4 text-purple-600" />
            Content Deliverables Required
          </h4>
          {deliverables.length > 0 ? (
            <div className="space-y-2">
              {deliverables.map((d, idx) => (
                <div key={idx} className="bg-gray-50 border border-gray-200 rounded p-3">
                  <div className="flex items-center justify-between mb-1">
                    <p className="font-semibold text-xs text-gray-900">{d.type}</p>
                    <span className="text-xs text-purple-700 font-semibold">{d.timeline}</span>
                  </div>
                  <p className="text-xs text-gray-700"><span className="font-semibold">Quantity:</span> {d.quantity}</p>
                  <p className="text-xs text-gray-600"><span className="font-semibold">Format:</span> {d.format}</p>
                  <p className="text-xs text-gray-500"><span className="font-semibold">Purpose:</span> {d.purpose}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-xs text-gray-500">Set budget and channel allocation to see required content deliverables</p>
          )}
        </div>

        {/* Margin Impact - awareness vs revenue distinction */}
        <div className="bg-white rounded-xl border border-gray-100 p-4 space-y-3">
          <h4 className="font-semibold text-xs text-gray-900 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-green-600" />
            {campaignData.objective === 'awareness' ? 'Investment Profile (Awareness Campaign)' : 'Margin Impact Analysis'}
          </h4>
          {campaignData.objective === 'awareness' ? (
            <div className="space-y-2 text-xs">
              <div className="bg-blue-50 border border-blue-200 rounded p-3">
                <p className="font-semibold text-blue-900">This is a brand-building investment, not a direct revenue campaign.</p>
                <p className="text-blue-700 mt-1">Awareness campaigns build long-term brand equity. ROI is measured in impressions, reach, and awareness lift rather than immediate case sales. Budget should be viewed as marketing investment with 12-18 month payback horizon.</p>
              </div>
              <div className="flex items-center justify-between pb-2 border-b border-gray-200">
                <span className="text-gray-700">Estimated Cost Per Thousand Impressions</span>
                <span className="font-semibold text-gray-900">{getCurrency()}6-12</span>
              </div>
              <div className="flex items-center justify-between pb-2 border-b border-gray-200">
                <span className="text-gray-700">Estimated Total Reach</span>
                <span className="font-semibold text-gray-900">{((parseFloat(campaignData.budget) || 0) * 72).toLocaleString()} people</span>
              </div>
            </div>
          ) : (
            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between pb-2 border-b border-gray-200">
                <span className="text-gray-700">Typical {categories.find(c => c.id === campaignData.category)?.label || 'category'} margin (Off-Trade)</span>
                <span className="font-semibold text-gray-900">{campaignData.category === 'champagne' ? '42%' : campaignData.category === 'whisky' ? '40%' : campaignData.category === 'nolo' ? '35%' : '38%'}</span>
              </div>
              <div className="flex items-center justify-between pb-2 border-b border-gray-200">
                <span className="text-gray-700">With 15% promotional discount</span>
                <span className="font-semibold text-red-600">{campaignData.category === 'champagne' ? '32%' : campaignData.category === 'whisky' ? '30%' : '28%'}</span>
              </div>
              <div className="flex items-center justify-between bg-yellow-50 p-2 rounded">
                <span className="font-semibold text-yellow-900">Volume required to offset promo</span>
                <span className="font-bold text-yellow-900">+36-42% incremental cases</span>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };


  const renderStep5 = () => {
    const roiData = getROIData();
    const budget = parseFloat(campaignData.budget) || 0;
    const objective = objectives.find(o => o.id === campaignData.objective);
    const isAwareness = campaignData.objective === 'awareness';
    const competitors = getCompetitors();
    const deliverables = getContentDeliverables();

    // Campaign-specific risk factors
    const getRisks = () => {
      const risks = [];
      const cat = campaignData.category;
      const market = campaignData.market;

      if (competitors.length > 0 && competitors[0].threat === 'high') {
        risks.push({ severity: 'high', title: `${competitors[0].name} Competitive Response`, detail: `${competitors[0].name} holds strong market position. Expect potential counter-activation within 2-4 weeks of your campaign launch. Monitor their social and on-trade activity closely.` });
      }
      if (budget < 20000) {
        risks.push({ severity: 'high', title: 'Budget Limitation', detail: `${getCurrency()}${budget.toLocaleString()} is below typical effective threshold for multi-channel campaigns. Consider concentrating on 1-2 channels rather than spreading thin across all four.` });
      }
      if (campaignData.startMonth === 'January' && cat !== 'nolo') {
        risks.push({ severity: 'medium', title: 'Dry January Headwind', detail: 'January sees reduced alcohol consumption due to Dry January movement. Consider delayed launch to February or pivoting messaging to moderation/premium occasions.' });
      }
      if (market === 'UK' && (campaignData.startMonth === 'June' || campaignData.startMonth === 'July')) {
        risks.push({ severity: 'medium', title: 'Summer Competition Peak', detail: 'June-July is peak activation season in UK (Wimbledon, festivals, bank holidays). Media costs rise 20-30%. Ensure creative stands out in crowded marketplace.' });
      }
      if (campaignData.travelRetail > 30) {
        risks.push({ severity: 'medium', title: 'Travel Retail Dependency', detail: 'Heavy travel retail allocation (>30%) exposes campaign to passenger volume fluctuations, airline route changes, and duty-free operator listing decisions.' });
      }
      if (campaignData.campaignType === 'newProduct') {
        risks.push({ severity: 'high', title: 'New Product Trial Barrier', detail: 'New brands face significant trial barriers. Allocate minimum 20% of budget to sampling and trial generation. First-purchase conversion typically takes 3-5 touchpoints.' });
      }
      if (risks.length < 2) {
        risks.push({ severity: 'low', title: 'Execution Timing', detail: `Ensure all content production is completed 4 weeks before campaign launch (${campaignData.startMonth}). Late creative delivery is the #1 cause of underperforming campaigns.` });
      }
      return risks;
    };

    const risks = getRisks();

    return (
      <div className="space-y-6">
        <div className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-xl border border-indigo-100 p-6">
          <div className="flex items-start gap-3">
            <BarChart3 className="w-5 h-5 text-indigo-600 mt-1 flex-shrink-0" />
            <div>
              <h3 className="font-display font-bold text-sm text-indigo-900 mb-1">Predictive ROI & Agency Handoff</h3>
              <p className="text-xs text-indigo-700">Campaign projections and complete agency brief for {getBrandDisplay() || 'your brand'}.</p>
            </div>
          </div>
        </div>

        {/* Forecasted Metrics */}
        <div className="bg-white rounded-xl border border-gray-100 p-4 space-y-3">
          <h4 className="font-semibold text-xs text-gray-900 mb-3">Forecasted Metrics (Base Case)</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {isAwareness ? (<>
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded p-3">
                <p className="text-xs text-blue-700 font-semibold">Total Impressions</p>
                <p className="text-lg font-bold text-blue-900">{(roiData[1].impressions / 1000000).toFixed(1)}M</p>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-green-100 rounded p-3">
                <p className="text-xs text-green-700 font-semibold">Unique Reach</p>
                <p className="text-lg font-bold text-green-900">{(roiData[1].reach / 1000000).toFixed(1)}M</p>
              </div>
              <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded p-3">
                <p className="text-xs text-yellow-700 font-semibold">Avg CPM</p>
                <p className="text-lg font-bold text-yellow-900">{getCurrency()}{roiData[1].cpm}</p>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded p-3">
                <p className="text-xs text-purple-700 font-semibold">Awareness Lift</p>
                <p className="text-lg font-bold text-purple-900">{roiData[1].awarenessLift}</p>
              </div>
            </>) : (<>
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded p-3">
                <p className="text-xs text-blue-700 font-semibold">Incremental Volume</p>
                <p className="text-lg font-bold text-blue-900">{roiData[1].volume.toFixed(0)} cases</p>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-green-100 rounded p-3">
                <p className="text-xs text-green-700 font-semibold">Revenue Uplift</p>
                <p className="text-lg font-bold text-green-900">{getCurrency()}{(roiData[1].revenue / 1000).toFixed(0)}k</p>
              </div>
              <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded p-3">
                <p className="text-xs text-yellow-700 font-semibold">ROAS</p>
                <p className="text-lg font-bold text-yellow-900">{roiData[1].roas.toFixed(2)}x</p>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded p-3">
                <p className="text-xs text-purple-700 font-semibold">Cost per Case</p>
                <p className="text-lg font-bold text-purple-900">{getCurrency()}{(budget / roiData[1].volume).toFixed(0)}</p>
              </div>
            </>)}
          </div>
        </div>

        {/* Campaign-Specific Risk Factors */}
        <div className="bg-white rounded-xl border border-gray-100 p-4 space-y-3">
          <h4 className="font-semibold text-xs text-gray-900 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-red-500" />
            Campaign-Specific Risk Factors
          </h4>
          <div className="space-y-2">
            {risks.map((risk, idx) => {
              const riskColors = { high: 'bg-red-50 border-red-200', medium: 'bg-amber-50 border-amber-200', low: 'bg-yellow-50 border-yellow-200' };
              const textColors = { high: 'text-red-900', medium: 'text-amber-900', low: 'text-yellow-900' };
              const subColors = { high: 'text-red-700', medium: 'text-amber-700', low: 'text-yellow-700' };
              return (
                <div key={idx} className={`border rounded p-3 ${riskColors[risk.severity]}`}>
                  <div className="flex items-center justify-between mb-1">
                    <p className={`font-semibold text-xs ${textColors[risk.severity]}`}>{risk.title}</p>
                    <span className={`text-xs font-semibold uppercase ${subColors[risk.severity]}`}>{risk.severity}</span>
                  </div>
                  <p className={`text-xs ${subColors[risk.severity]}`}>{risk.detail}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Agency Handoff Brief - Comprehensive */}
        <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl border-2 border-yellow-300 p-4 space-y-4">
          <h4 className="font-semibold text-sm text-yellow-900 flex items-center gap-2">
            <Megaphone className="w-5 h-5" />
            Agency Handoff Brief
          </h4>
          <div className="bg-white rounded-lg p-4 space-y-3 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <p className="font-semibold text-gray-500 uppercase text-[10px]">Brand</p>
                <p className="font-bold text-gray-900">{getBrandDisplay() || '\u2014'}</p>
              </div>
              <div>
                <p className="font-semibold text-gray-500 uppercase text-[10px]">Objective</p>
                <p className="font-bold text-gray-900">{objective?.label || '\u2014'}</p>
              </div>
              <div>
                <p className="font-semibold text-gray-500 uppercase text-[10px]">Market & Timeline</p>
                <p className="font-bold text-gray-900">{campaignData.market || '\u2014'} | {campaignData.startMonth} \u2013 {campaignData.endMonth}</p>
              </div>
              <div>
                <p className="font-semibold text-gray-500 uppercase text-[10px]">Total Budget</p>
                <p className="font-bold text-gray-900">{getCurrency()}{Number(campaignData.budget || 0).toLocaleString()}</p>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-3">
              <p className="font-semibold text-gray-500 uppercase text-[10px] mb-2">Channel Budget Allocation</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
                {[
                  { label: 'Digital', pct: campaignData.digital },
                  { label: 'On-Trade', pct: campaignData.onTrade },
                  { label: 'Off-Trade', pct: campaignData.offTrade },
                  { label: 'Travel Retail', pct: campaignData.travelRetail },
                ].map(ch => (
                  <div key={ch.label} className="bg-gray-50 rounded p-2 text-center">
                    <p className="font-bold text-gray-900">{ch.pct.toFixed(0)}%</p>
                    <p className="text-gray-600 text-[10px]">{ch.label}</p>
                    <p className="text-gray-500 text-[10px]">{getCurrency()}{Math.round((parseFloat(campaignData.budget) || 0) * (ch.pct / 100)).toLocaleString()}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t border-gray-200 pt-3">
              <p className="font-semibold text-gray-500 uppercase text-[10px] mb-2">Digital Platform Split (of Digital Budget)</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
                {[
                  { label: 'Meta/IG', pct: campaignData.metaInstagram },
                  { label: 'TikTok', pct: campaignData.tiktok },
                  { label: 'YouTube', pct: campaignData.youtube },
                  { label: 'Influencer', pct: campaignData.influencer },
                ].map(p => (
                  <div key={p.label} className="bg-blue-50 rounded p-2 text-center">
                    <p className="font-bold text-blue-900">{p.pct.toFixed(0)}%</p>
                    <p className="text-blue-700 text-[10px]">{p.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {deliverables.length > 0 && (
              <div className="border-t border-gray-200 pt-3">
                <p className="font-semibold text-gray-500 uppercase text-[10px] mb-2">Content Deliverables</p>
                <div className="space-y-1">
                  {deliverables.map((d, idx) => (
                    <div key={idx} className="flex items-center justify-between py-1 border-b border-gray-100 last:border-0">
                      <span className="text-gray-900">{d.quantity} {d.type}</span>
                      <span className="text-gray-500">{d.format}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {competitors.length > 0 && (
              <div className="border-t border-gray-200 pt-3">
                <p className="font-semibold text-gray-500 uppercase text-[10px] mb-2">Key Competitors to Monitor</p>
                <p className="text-gray-700">{competitors.map(c => c.name).join(', ')}</p>
              </div>
            )}

            <div className="border-t border-gray-200 pt-3">
              <p className="font-semibold text-gray-500 uppercase text-[10px] mb-2">Key Insight for Creative</p>
              <p className="text-gray-700 italic">
                {campaignData.objective === 'awareness'
                  ? `This is a brand-building campaign. Creative should prioritise memorability and brand association over direct response. Aim for high-impact visual storytelling that positions ${getBrandDisplay()} distinctively within ${categories.find(c => c.id === campaignData.category)?.label || 'the category'}.`
                  : campaignData.objective === 'trial'
                  ? `Focus creative on lowering the trial barrier. Show the serve, make it approachable, and include a clear call-to-action. Sampling and \u201cfirst drink free\u201d mechanics should be central.`
                  : campaignData.objective === 'premium'
                  ? `Creative should elevate the brand perception. Use premium production values, aspirational settings, and emphasise craftsmanship/heritage. Avoid price messaging.`
                  : `Drive urgency and volume. Promotional mechanics, limited-time offers, and clear value propositions should be front and centre in all creative.`
                }
              </p>
            </div>
          </div>

          <button onClick={handleExport}
            className="w-full flex items-center justify-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold text-xs py-3 rounded-lg transition">
            <Download className="w-4 h-4" />
            Export Campaign Brief (.txt)
          </button>
        </div>
      </div>
    );
  };


  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="font-display text-page text-navy mb-2">Campaign Planner</h1>
          <p className="text-caption text-gray-500">5-step wizard to turn market intelligence into actionable campaign plans.</p>
        </div>

        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            {[1, 2, 3, 4, 5].map((step, idx) => (
              <React.Fragment key={step}>
                <button onClick={() => setCurrentStep(step)}
                  className={`flex items-center justify-center w-10 h-10 rounded-full font-semibold text-xs transition ${
                    step === currentStep ? 'bg-yellow-500 text-white'
                    : step < currentStep ? 'bg-green-500 text-white'
                    : 'bg-gray-300 text-gray-600'
                  }`}>
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
            <span>Supply & Content</span>
            <span>ROI & Handoff</span>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-100 p-8 mb-8 min-h-[600px]">
          {currentStep === 1 && renderStep1()}
          {currentStep === 2 && renderStep2()}
          {currentStep === 3 && renderStep3()}
          {currentStep === 4 && renderStep4()}
          {currentStep === 5 && renderStep5()}
        </div>

        <div className="flex items-center justify-between gap-4">
          <button onClick={() => setCurrentStep(Math.max(1, currentStep - 1))} disabled={currentStep === 1}
            className="flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-900 font-semibold text-sm rounded-lg hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition">
            <ChevronLeft className="w-4 h-4" /> Back
          </button>
          <div className="text-xs text-gray-600">Step {currentStep} of 5</div>
          <button onClick={() => setCurrentStep(Math.min(5, currentStep + 1))} disabled={currentStep === 5}
            className="flex items-center gap-2 px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold text-sm rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition">
            Next <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CampaignPlanner;
