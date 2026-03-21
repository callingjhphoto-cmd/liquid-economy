// ─── CAMPAIGN PLANNER DATA ─────────────────────────────────────────────────
// Extracted from CampaignPlanner.jsx for data/component separation

export const BRANDS_BY_CATEGORY = {
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
}

export const CATEGORIES = [
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
]

export const SEGMENTS = ['Value', 'Mid-Tier', 'Premium', 'Ultra-Premium', 'Luxury']
export const BASE_SPIRITS = ['Tequila', 'Vodka', 'Gin', 'Whisky', 'Rum', 'Cognac', 'Champagne', 'Wine', 'Beer', 'No/Low', 'Multiple']
export const COCKTAIL_OCCASIONS = ['Aperitif', 'Cocktail Hour', 'Dinner', 'After Dinner', 'Nightclub', 'Party', 'Brunch', 'Summer', 'Winter Warmers']
export const SERVES = ['Neat', 'Cocktail', 'Mixed', 'RTD']
export const MARKETS = [
  { code: 'UK', currency: '\u00a3' },
  { code: 'US', currency: '$' },
  { code: 'Spain', currency: '\u20ac' },
  { code: 'France', currency: '\u20ac' },
  { code: 'Germany', currency: '\u20ac' },
  { code: 'Italy', currency: '\u20ac' },
  { code: 'Netherlands', currency: '\u20ac' },
  { code: 'Middle East', currency: '$' },
]
export const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

export const OBJECTIVES = [
  { id: 'awareness', label: 'Brand Awareness', desc: 'Build visibility and recognition in market' },
  { id: 'volume', label: 'Volume Push', desc: 'Move X cases in market' },
  { id: 'trial', label: 'Trial Generation', desc: 'Reach new drinkers' },
  { id: 'premium', label: 'Premiumization', desc: 'Trade up from standard' },
  { id: 'cultural', label: 'Cultural Moment', desc: 'Attach to event/occasion' },
]

export const CAMPAIGN_TYPES = [
  { id: 'existing', label: 'Existing Brand', iconName: 'Wine' },
  { id: 'newProduct', label: 'New Product Launch', iconName: 'Package' },
  { id: 'cocktail', label: 'Cocktail/Serve Campaign', iconName: 'Zap' },
]

export const CATEGORY_COMPETITORS = {
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
}

export const SPIRIT_COMPETITORS = {
  Tequila: [{ name: 'Patr\u00f3n', position: 'Premium tequila leader', threat: 'high' }, { name: 'Casamigos', position: 'Fastest-growing premium tequila', threat: 'high' }],
  Vodka: [{ name: 'Grey Goose', position: 'Ultra-premium vodka benchmark', threat: 'high' }, { name: 'Belvedere', position: 'Luxury vodka, strong on-trade', threat: 'medium' }],
  Gin: [{ name: 'Tanqueray', position: 'On-trade gin leader', threat: 'high' }, { name: 'Hendrick\u2019s', position: 'Premium gin innovator', threat: 'high' }],
  Whisky: [{ name: 'Johnnie Walker', position: 'Global whisky leader', threat: 'high' }, { name: 'Jameson', position: 'Fastest-growing Irish whiskey', threat: 'high' }],
  Rum: [{ name: 'Bacardi', position: 'Volume rum leader globally', threat: 'high' }, { name: 'Havana Club', position: 'Strong in European on-trade', threat: 'medium' }],
  Cognac: [{ name: 'Hennessy', position: 'Category leader, 50%+ global share', threat: 'high' }, { name: 'R\u00e9my Martin', position: 'Premium-luxury cognac leader', threat: 'medium' }],
  Wine: [{ name: 'Whispering Angel', position: 'Ros\u00e9 category leader', threat: 'high' }, { name: 'Cloudy Bay', position: 'Premium NZ benchmark', threat: 'medium' }],
}

export const CULTURAL_CALENDARS = {
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
}

export const OCCASIONS = [
  { name: 'After Work Drinks', iconName: 'Clock', serve: 'Cocktail / Beer', channels: ['On-Trade'],
    campaignIdeas: [
      'Partner with 20-30 key bars in target city for \u201c5-7pm happy hour\u201d branded cocktail specials',
      'Create a \u201cFirst Round On Us\u201d digital coupon campaign via Instagram Stories targeting office postcodes',
      'Develop a signature 2-ingredient easy serve that bartenders can make in volume',
      'Sponsor after-work networking events through platforms like Eventbrite or Meetup',
    ]
  },
  { name: 'Celebration / Special Occasion', iconName: 'Zap', serve: 'Champagne / Premium Spirit', channels: ['On-Trade', 'Off-Trade'],
    campaignIdeas: [
      'Launch premium gift packaging exclusive to travel retail and department stores',
      'Create \u201ccelebration moments\u201d UGC campaign encouraging consumers to share their toasts',
      'Partner with high-end restaurants for \u201ccelebration menu\u201d pairings with your brand',
      'Develop limited-edition bottle designs for birthdays, anniversaries, milestones',
    ]
  },
  { name: 'Home Entertaining', iconName: 'Users', serve: 'Mixed / Cocktail Kits', channels: ['Off-Trade', 'E-commerce'],
    campaignIdeas: [
      'Create at-home cocktail kit bundles sold through supermarket and e-commerce partners',
      'Develop recipe card series with QR codes linking to video tutorials',
      'Partner with meal kit companies (HelloFresh, Gousto) for drink-food pairing promos',
      'Launch \u201cDinner Party Edit\u201d campaign with hosting tips, playlist, and cocktail recipes',
    ]
  },
  { name: 'Festival / Outdoor Events', iconName: 'MapPin', serve: 'RTD / Mixed / Beer', channels: ['Festival', 'Travel Retail'],
    campaignIdeas: [
      'Secure branded bar at 3-5 key festivals with experiential activation (photo booth, DJ set)',
      'Develop festival-exclusive SKU or limited-edition packaging with artist collaboration',
      'Create sampling programme targeting 50,000+ consumers across festival season',
      'Launch Instagram/TikTok geofilter campaign at festival sites',
    ]
  },
  { name: 'Date Night', iconName: 'Wine', serve: 'Cocktail / Wine', channels: ['On-Trade'],
    campaignIdeas: [
      'Partner with high-end cocktail bars for \u201cDate Night Menu\u201d featuring your brand in hero serves',
      'Create Hinge/Bumble partnership with drink-brand-sponsored date experiences',
      'Develop \u201cCocktail for Two\u201d sharing serves designed for intimate occasions',
      'Sponsor supper clubs and pop-up dining experiences in key urban markets',
    ]
  },
  { name: 'Brunch / Day Drinking', iconName: 'Sun', serve: 'Cocktail / Champagne / No-Lo', channels: ['On-Trade'],
    campaignIdeas: [
      'Partner with 20+ brunch venues for branded Bloody Mary / Mimosa / Bellini features',
      'Create a \u201cSunday Social\u201d series of ticketed brunch events with live music + cocktails',
      'Develop low-ABV or spritz-based serves for extended daytime occasions',
      'Launch bottomless brunch sponsorship packages at key restaurant groups',
    ]
  },
]

export const CATEGORY_SUPPLY_CHAIN = {
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
}
