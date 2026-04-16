/**
 * profileKhorusCocktails.js
 * Data file for Khorus Cocktail Intelligence Profile
 * Sources: 7 deep research reports in ~/Documents/Claude/research/chloe_khorus_cocktails/
 * Generated: April 2026
 *
 * CITATION KEY
 *   [R1] = 00_internal_data_audit.md
 *   [R2] = 01_top_cocktails_global.md (DI/Difford\u2019s/IWSR deep research)
 *   [R3] = 02_flavour_trends.md (Bacardi/TOTC/DI/W50B deep research)
 *   [R4] = 03_luxury_events.md (Connaught/F1/Fashion Week deep research)
 *   [R5] = 04_pricing_intelligence.md
 *   [R6] = 05_middle_east.md
 *   [R7] = 06_zero_proof_luxury.md (IWSR no/low data)
 *   [R8] = 07_presentation_theatre.md
 */

// ---------------------------------------------------------------------------
// MODULE 1: TOP 20 COCKTAILS GLOBAL RANKING 2024-2026
// Source: [R2] - DI World's 50 Best Bars Brand Report, Difford's Guide analytics
// Methodology: DI surveys 100 elite bars; Difford\u2019s uses 700k+ monthly page-views
// ---------------------------------------------------------------------------
export const top20Cocktails = [
  {
    rank: 1,
    name: 'Negroni',
    spiritBase: 'Gin',
    type: 'Classic',
    diRank: '#1 (2022\u20132025)',
    diffordsRank: '#25',
    trend: 'stable-dominant',
    note: '26% of top bars list as #1; 53% place in top 3. [R2]',
    rankMove: '+8 since 2020' // was below Old Fashioned pre-2022
  },
  {
    rank: 2,
    name: 'Old Fashioned',
    spiritBase: 'Bourbon / Rye',
    type: 'Classic',
    diRank: '#2',
    diffordsRank: '#18',
    trend: 'stable',
    note: 'Benchmark for ice programme and spirit curation. [R2]',
    rankMove: '\u22121 since 2022'
  },
  {
    rank: 3,
    name: 'Margarita',
    spiritBase: 'Tequila',
    type: 'Classic',
    diRank: '#3',
    diffordsRank: '#4',
    trend: 'rising',
    note: 'Fragmented by variants (Tommy\u2019s, Mezcal, Picante). [R2]',
    rankMove: 'Stable top 3'
  },
  {
    rank: 4,
    name: 'Espresso Martini',
    spiritBase: 'Vodka',
    type: 'Modern Classic',
    diRank: '#4',
    diffordsRank: '#8',
    trend: 'rising',
    note: '+116% value velocity US (CGA). Created by Dick Bradsell, 1983. [R2]',
    rankMove: '+19 from #23 in 2022'
  },
  {
    rank: 5,
    name: 'Porn Star Martini',
    spiritBase: 'Vodka',
    type: 'Modern',
    diRank: 'Consumer chart',
    diffordsRank: '#1 (11 consecutive years)',
    trend: 'dominant-consumer',
    note: 'Absolute consumer search juggernaut. Passion fruit + vanilla vodka + Champagne sidecar. [R2]',
    rankMove: 'Consistent #1 Difford\u2019s'
  },
  {
    rank: 6,
    name: 'Daiquiri',
    spiritBase: 'Rum',
    type: 'Classic',
    diRank: '#5',
    diffordsRank: '#19',
    trend: 'stable',
    note: 'Undisputed king of rum cocktails in premium sphere. [R2]',
    rankMove: 'Stable top 5'
  },
  {
    rank: 7,
    name: 'Whiskey Sour',
    spiritBase: 'Bourbon',
    type: 'Classic',
    diRank: '#6',
    diffordsRank: '#12',
    trend: 'stable',
    note: 'Egg-white foam a key texture signal. [R2]',
    rankMove: 'Stable'
  },
  {
    rank: 8,
    name: 'Dry Martini',
    spiritBase: 'Gin / Vodka',
    type: 'Classic',
    diRank: '#7',
    diffordsRank: '#23',
    trend: 'rising',
    note: '\u20182025 was a good year for Martinis\u2019 \u2014 Difford\u2019s. Freezer-martini trend accelerating. [R2]',
    rankMove: '+1 since 2023'
  },
  {
    rank: 9,
    name: 'Aperol Spritz',
    spiritBase: 'Aperitivo / Prosecco',
    type: 'Classic',
    diRank: '#8',
    diffordsRank: '#92 (falling)',
    trend: 'fatigue',
    note: 'Peaked #6 DI 2022. Consumer search collapsing. Opportunity: intercept with gin highball. [R2]',
    rankMove: '\u22184 vs 2022 DI; \u221283 Difford\u2019s'
  },
  {
    rank: 10,
    name: 'Paloma',
    spiritBase: 'Tequila',
    type: 'Classic',
    diRank: '#9',
    diffordsRank: '#14',
    trend: 'rising',
    note: 'Replacing Spritz as the \u2018refresher\u2019 of choice at elite bars. [R2]',
    rankMove: '+5 since 2022'
  },
  {
    rank: 11,
    name: 'Moscow Mule / Gin Gin Mule',
    spiritBase: 'Vodka / Gin',
    type: 'Classic',
    diRank: '#10',
    diffordsRank: '\u2014',
    trend: 'stable',
    note: 'High RTD presence. Copper mug theatre remains a draw. [R2]',
    rankMove: 'Stable'
  },
  {
    rank: 12,
    name: 'Gin Basil Smash',
    spiritBase: 'Gin',
    type: 'Modern Classic',
    diRank: '\u2014',
    diffordsRank: '#2',
    trend: 'rising',
    note: 'Created by J\u00f6rg Meyer. Up from #33 in 2016. Vibrant green visual. [R2]',
    rankMove: '+31 since 2016'
  },
  {
    rank: 13,
    name: 'Manhattan',
    spiritBase: 'Rye / Bourbon',
    type: 'Classic',
    diRank: 'Staple',
    diffordsRank: '#10',
    trend: 'stable',
    note: 'Spirit-forward elegance benchmark. [R2]',
    rankMove: 'Stable'
  },
  {
    rank: 14,
    name: 'Vieux Carr\u00e9',
    spiritBase: 'Rye / Cognac',
    type: 'Classic',
    diRank: '\u2014',
    diffordsRank: '#3',
    trend: 'rising',
    note: 'New Orleans heritage. Cognac crossover appeal for luxury events. [R2]',
    rankMove: '+TBD'
  },
  {
    rank: 15,
    name: 'Mai Tai',
    spiritBase: 'Rum',
    type: 'Classic',
    diRank: '\u2014',
    diffordsRank: '#5',
    trend: 'stable',
    note: 'Tiki staple. High visual theatre. [R2]',
    rankMove: 'Stable'
  },
  {
    rank: 16,
    name: 'The Last Word',
    spiritBase: 'Gin',
    type: 'Classic',
    diRank: '\u2014',
    diffordsRank: '#6',
    trend: 'rising',
    note: 'Prohibition-era revival. Equal parts gin, Chartreuse, maraschino. [R2]',
    rankMove: '+TBD since revival'
  },
  {
    rank: 17,
    name: 'Amaretto Sour',
    spiritBase: 'Liqueur (Amaretto)',
    type: 'Classic',
    diRank: '\u2014',
    diffordsRank: '#7',
    trend: 'rising',
    note: 'Elevated by Morgenthaler method (overproof bourbon). [R2]',
    rankMove: '+TBD'
  },
  {
    rank: 18,
    name: 'Picante de la Casa (Spicy Margarita)',
    spiritBase: 'Tequila',
    type: 'Modern',
    diRank: '\u2014',
    diffordsRank: '#9 (was #20 in 2020)',
    trend: 'fast-rising',
    note: 'Largest rank gain in Difford\u2019s top 20. Jalape\u00f1o/agave. [R2]',
    rankMove: '+11 since 2020'
  },
  {
    rank: 19,
    name: 'Mojito',
    spiritBase: 'Rum',
    type: 'Classic',
    diRank: '\u2014',
    diffordsRank: '\u2014',
    trend: 'stable',
    note: 'High RTD/consumer volume. Yacht charter staple. [R2]',
    rankMove: 'Stable consumer'
  },
  {
    rank: 20,
    name: 'Penicillin',
    spiritBase: 'Scotch',
    type: 'Modern Classic',
    diRank: 'Top 20 staple',
    diffordsRank: '#21',
    trend: 'stable',
    note: 'Premier modern Scotch cocktail. Ginger, honey, lemon + peated float. [R2]',
    rankMove: 'Stable'
  }
]

// ---------------------------------------------------------------------------
// MODULE 2: FLAVOUR FAMILIES
// Source: [R3] - Bacardi Cocktail Trends Report, TOTC 2024-25, Difford's, W50B
// ---------------------------------------------------------------------------
export const flavourFamilies = [
  {
    id: 'savoury-umami',
    name: 'Savoury & Umami',
    icon: '\ud83c\udf71',
    growthSignal: '20% global consumer interest growth (Bacardi)',
    penetration: '30% of Asia Top 100 bar cocktails feature savoury elements; 96% list \u22651',
    trend: 'leading',
    colour: '#64748b',
    ingredients: ['Miso', 'Seaweed / Kombu', 'Tomato water', 'Fino sherry', 'Sesame oil (fat-wash)', 'Truffle oil', 'Fermented soy'],
    venueExamples: [
      'Handshake Speakeasy (Mexico City, W50B #1) \u2014 tom yum gimlet with coconut oil-washed tequila',
      'Bar Pompette \u2014 toasted kombu syrup + dill umami bitters',
      'Wagyu-washed Martini at top London venues'
    ],
    eventApplication: 'Bespoke Martini station: olive oil-washed vodka, premium vermouth, caviar or truffle garnish. Hits Martini-mania + savoury zeitgeist simultaneously.',
    source: '[R3]'
  },
  {
    id: 'bitter-amaro',
    name: 'Bitter & Amaro',
    icon: '\ud83c\udf4a',
    growthSignal: '41% of bartenders actively experimenting (Bacardi survey)',
    penetration: 'Mainstream \u2014 driven by Negroni dominance and aperitivo culture',
    trend: 'established-growing',
    colour: '#b45309',
    ingredients: ['Campari', 'Cynar', 'Fernet-Branca', 'Amaro Montenegro', 'Non-alcoholic amari (Lyre\u2019s Italian Orange)', 'Gentian bitters'],
    venueExamples: [
      'Negroni #1 globally (DI 2022\u20132025)',
      'Connaught Bar \u2014 Coffee Negroni on rotating menu',
      'Soho House NA Picante: Pentire Adrift swapped for tequila'
    ],
    eventApplication: 'Zero-proof Negroni programme using NA amaro. Same glassware, same theatre, no alcohol. ~24\u201330% of luxury event guests choose zero-proof. [R7]',
    source: '[R3]'
  },
  {
    id: 'smoky',
    name: 'Smoky',
    icon: '\ud83d\udd25',
    growthSignal: 'Agave boom driving mainstream acceptance; Oaxaca Old Fashioned debuted DI top 50',
    penetration: 'Significant \u2014 mezcal + peated Scotch crossover',
    trend: 'rising',
    colour: '#374151',
    ingredients: ['Mezcal', 'Peated Scotch (Laphroaig, Ardbeg)', 'Smoked sea salt', 'Hickory / applewood chips', 'Charred oak syrups'],
    venueExamples: [
      'Oaxacan Paloma \u2014 mezcal, yuzu, agave, salt rim',
      'Smoked Old Fashioned under glass cloche (tableside)',
      'Campari\u2019s Mads Negroni at Cannes 2025 \u2014 mezcal substituted for gin'
    ],
    eventApplication: 'Smoking dome reveal. Tableside applewood-smoked Old Fashioned or Negroni Mezcal. Multi-sensory theatre that photographs and films well.',
    source: '[R3]'
  },
  {
    id: 'low-sugar-sour',
    name: 'Low-Sugar Sour',
    icon: '\ud83c\udf4b',
    growthSignal: 'TOTC 2025 consensus: \u2018drinks were sour\u2019 \u2014 retreat from sweetness',
    penetration: 'Growing fast across Gen Z / Millennial premium segment',
    trend: 'rising',
    colour: '#ca8a04',
    ingredients: ['Calamansi', 'Yuzu', 'Meyer lemon', 'Blood orange', 'Verjus', 'Natural botanical sweetness only'],
    venueExamples: [
      'Crystal Gimlet \u2014 gin, yuzu, clarified basil & cucumber cordial',
      'Daiquiri variants with exotic citrus at W50B bars',
      'Sour-forward aperitif lists at Claridge\u2019s / Connaught'
    ],
    eventApplication: 'Pre-batched clarified milk punch. Batch days in advance, pours crystal-clear over stamped ice. Luxury appearance at bar speed. Perfect for high-volume corporate galas.',
    source: '[R3]'
  },
  {
    id: 'tropical',
    name: 'Tropical & Floral',
    icon: '\ud83c\udf34',
    growthSignal: 'Passion fruit + guava projected defining cocktail fruits of 2026',
    penetration: 'Porn Star Martini #1 Difford\u2019s 11 years; Hugo Spritz new top-50 entry',
    trend: 'resurgent',
    colour: '#059669',
    ingredients: ['Passion fruit', 'Guava', 'Lychee', 'Elderflower', 'Hibiscus', 'Butterfly pea flower', 'Lavender', 'Jasmine'],
    venueExamples: [
      'Atlantis The Palm, Hakkasan \u2014 The Hakka: vodka, sake, lychee, coconut',
      'Burj Al Arab Gilt bar \u2014 Sakura: Sakura tea, grapefruit zest',
      'Porn Star Martini: passion fruit + vanilla + Champagne sidecar'
    ],
    eventApplication: 'Tropical Milk Punch \u2014 batchable, clarified, stunning colour. Tequila, guava cordial, pasilla chilli. Hits tropical, heat, and luxury technique simultaneously.',
    source: '[R3]'
  },
  {
    id: 'spicy-heat',
    name: 'Spicy & Heat',
    icon: '\ud83c\udf36\ufe0f',
    growthSignal: '+20% average annual growth in beverage launches (spice/heat)',
    penetration: 'Picante de la Casa +11 Difford\u2019s ranks 2020\u20132025',
    trend: 'fast-rising',
    colour: '#dc2626',
    ingredients: ['Jalape\u00f1o', 'Habanero', 'Chipotle', 'Ancho Reyes', 'Tajin', 'Buzz-button flower', 'Gochugaru'],
    venueExamples: [
      'Picante de la Casa: tequila, jalape\u00f1o, coriander, lime',
      'Soho House Non-Alcoholic Picante \u2014 Pentire Adrift base',
      'Electric Passion Margarita at luxury yacht charters \u2014 buzz-button garnish'
    ],
    eventApplication: '"Sweet heat" positioning \u2014 tropical fruit + chilli tincture as an add-on to Margarita service. Low-commitment way to access the trend without full menu overhaul.',
    source: '[R3]'
  },
  {
    id: 'coffee-spiced',
    name: 'Coffee & Spiced',
    icon: '\u2615',
    growthSignal: '45% of bartenders experimenting with espresso / coffee (Bacardi)',
    penetration: 'Espresso Martini +116% value velocity US; Carajillo rising fast',
    trend: 'dominant',
    colour: '#4b2e0a',
    ingredients: ['Cold brew', 'Espresso', 'Licor 43', 'Mr Black', 'Kahlua', 'Cardamom', 'Vanilla', 'Cacao air'],
    venueExamples: [
      'Espresso Martini Tower \u2014 replacing Champagne tower at weddings and galas',
      'Grey Goose \u201cThe Devil\u2019s Roast\u201d at NYFW 2026: espresso martini + gold-dusted beans',
      'F1 Mischief superyacht: \u2018Podium\u2019 cocktail with cacao husk distillate'
    ],
    eventApplication: 'Espresso Martini Tower as centrepiece activation. Coupe glasses stacked, batched pour cascades down. Universally loved flavour + maximum visual theatre. [R8]',
    source: '[R3]'
  }
]

// ---------------------------------------------------------------------------
// MODULE 3: LUXURY VENUE INTEL
// Source: [R4] Luxury events deep research, [R5] Pricing intelligence
// ---------------------------------------------------------------------------
export const luxuryVenueIntel = [
  {
    venue: 'The Connaught Bar',
    location: 'Mayfair, London',
    tier: 'World-class',
    signatureCocktail: 'Connaught Martini (tableside trolley)',
    dominantBrand: 'Connaught Bar Gin / Tanqueray No.10',
    avgCostPerServe: '\u00a323\u2013\u00a325 (~$30)',
    vintageOption: '\u00a3100\u2013\u00a3120 (1970s Gordon\u2019s / Haig)',
    theatre: 'Martini trolley, handmade bitters lineup, tableside ritual',
    source: '[R4][R5]'
  },
  {
    venue: 'Annabel\u2019s',
    location: 'Berkeley Square, Mayfair',
    tier: 'Private members club',
    signatureCocktail: '\u201cThe Judith\u201d \u2014 Hennessy, Galliano, lemon foam, smoked paprika',
    dominantBrand: 'Hennessy Cognac / Suntory Toki',
    avgCostPerServe: 'Membership-gated (\u00a33,500 pa + \u00a31,250 join)',
    vintageOption: 'Yamazaki 55 available',
    theatre: 'Immersive themed interiors; seasonal art installations; Japanese restaurant with The Book of Five Rings cocktail menu',
    source: '[R4]'
  },
  {
    venue: 'Savoy Beaufort Bar',
    location: 'Strand, London',
    tier: 'Historic super-prime',
    signatureCocktail: '\u201cRed Carpet\u201d \u2014 whisky, amaro, honey, cold-brew coffee',
    dominantBrand: 'Pol Roger / Laurent-Perrier Grand Siecle',
    avgCostPerServe: '\u00a325+',
    vintageOption: 'Caviar Bumps alongside Champagne',
    theatre: 'Jet-black and burnished gold interior; Champagne focus; caviar pairings',
    source: '[R4]'
  },
  {
    venue: 'Aman NYC Jazz Club',
    location: 'West 56th Street, New York',
    tier: 'Ultra-exclusive hotel',
    signatureCocktail: 'Global botanicals menu (Indonesian pandan, Japanese shiso)',
    dominantBrand: 'Bespoke seasonal',
    avgCostPerServe: '$30+ plus base cover',
    vintageOption: 'Members only ($200k initiation)',
    theatre: 'Secret entrance, 1962 Steinway baby grand, acoustic engineering, A5 wagyu bar snacks',
    source: '[R4][R5]'
  },
  {
    venue: 'Gilt Bar, Burj Al Arab',
    location: 'Dubai',
    tier: 'Middle East flagship',
    signatureCocktail: '\u201cOseille\u201d \u2014 sorrel-infused vodka, dehydrated yoghurt, green cardamom',
    dominantBrand: 'LOUIS XIII Rare Cask 42.1 (exclusive Gulf pouring)',
    avgCostPerServe: 'AED 90\u2013150 (~$25\u2013$41)',
    vintageOption: 'LOUIS XIII by glass',
    theatre: 'In-house centrifuge, sous-vide, rotovap; white gold-threaded marble feature wall; Thibault Mequignon as mixologist',
    source: '[R6]'
  },
  {
    venue: 'F1 MISCHIEF Superyacht',
    location: 'Melbourne Grand Prix',
    tier: 'Ultra-premium event',
    signatureCocktail: '\u201cThe Podium\u201d \u2014 Don Julio 1942, white vermouth, lime cordial, cacao husk, single ice sphere',
    dominantBrand: 'Don Julio 1942',
    avgCostPerServe: 'Included in $6k\u2013$9k event access',
    vintageOption: 'Caviar service + salted lime cleanser',
    theatre: '69.5m superyacht; single ice sphere serve; tableside caviar pairing',
    source: '[R4]'
  },
  {
    venue: 'Tambourine Room by Tristan Brandt',
    location: 'Miami (Michelin-starred)',
    tier: 'Michelin pairing',
    signatureCocktail: '\u201cFive Spice Milk Punch\u201d paired with Kyushu Hamachi; \u201cLucky Cat Highball\u201d (Macallan 12, bergamot)',
    dominantBrand: 'Macallan / Brugal 1888',
    avgCostPerServe: '$80+ cocktail pairing flight (supplement to $185 menu)',
    vintageOption: 'Macallan experience $34\u2013$127',
    theatre: '10-course tasting menu; Art Deco pre-cocktails; cuisine-paired cocktail programme',
    source: '[R4]'
  }
]

// ---------------------------------------------------------------------------
// MODULE 4: PRICING BANDS BY VENUE TIER
// Source: [R5] Pricing intelligence deep research
// ---------------------------------------------------------------------------
export const pricingBands = [
  {
    tier: 'Super-prime London / NYC',
    venues: 'Connaught, Savoy Beaufort, Aman NYC',
    standardRange: '\u00a320\u2013\u00a330 ($25\u2013$38)',
    signatureRange: '\u00a337 (Connaught Martini)',
    vintageRange: '\u00a3100\u2013\u00a3120',
    ultraPremiumPour: 'Louis XIII: \u00a3350/50ml at Ritz; Pappy 23yo: \u00a3500/50ml at Ritz',
    eventPackage: 'N/A (a la carte)',
    notes: 'Theatrical service is the price driver, not COGS. Decoy pricing (\u00a3120 vintage) makes \u00a337 feel reasonable. [R5]'
  },
  {
    tier: 'Mayfair private members clubs',
    venues: 'Annabel\u2019s, 5 Hertford St, Oswald\u2019s',
    standardRange: 'Mayfair standard (\u00a320\u2013\u00a330)',
    signatureRange: 'Membership-gated',
    vintageRange: 'Oswald\u2019s: retail-price fine wine (loss leader for members)',
    ultraPremiumPour: 'Yamazaki 55 allocated selectively',
    eventPackage: '\u00a33,250 pa + \u00a31,250 join (Annabel\u2019s)',
    notes: 'Clubs use beverage as membership perk \u2014 subsidised pricing strategy. [R5]'
  },
  {
    tier: 'Middle East luxury hotel bars',
    venues: 'Burj Al Arab Gilt, Emirates Palace, Waldorf DIFC',
    standardRange: 'AED 75\u2013150 (~$20\u2013$41)',
    signatureRange: 'AED 90\u2013150',
    vintageRange: 'LOUIS XIII Rare Cask 42.1 at Emirates Palace (excl. Gulf)',
    ultraPremiumPour: 'TBD',
    eventPackage: 'Happy Hour AED 35\u201339 at St. Trop (Waldorf DIFC)',
    notes: 'Dual-track: premium licensed bars (UAE) + zero-proof innovation (Saudi). [R6]'
  },
  {
    tier: 'Luxury event / private hire',
    venues: 'High-end weddings, corporate galas',
    standardRange: '$50\u2013$90 per guest (open bar package)',
    signatureRange: 'Ultra top-shelf: $100+ per head',
    vintageRange: 'TBD by client spec',
    ultraPremiumPour: 'Clase Azul Dia de Muertos: $150+ per pour (est. from $1,900 bottle)',
    eventPackage: '2.4x\u20133x wholesale markup + 18\u201322% service charge',
    notes: 'Per-guest packaging preferred over consumption billing. Break-even: 2 drinks/hr1, 1 drink/hr thereafter. [R5]'
  },
  {
    tier: 'F1 / Art Basel VIP hospitality',
    venues: 'F1 Paddock Club, Art Basel VIP passes',
    standardRange: 'Included in access',
    signatureRange: 'Included',
    vintageRange: 'Louis XIII: $230 per 10ml (F1 Las Vegas)',
    ultraPremiumPour: 'Yamazaki 55: $2,000/0.5oz (Morimoto Asia); $7,000 event ticket (Portland)',
    eventPackage: 'F1 Paddock Club: $6k\u2013$9k pp ($15k secondary market Miami/Monaco)',
    notes: 'Beverages fully subsumed by access premium. Drink cost irrelevant. [R5]'
  }
]

// ---------------------------------------------------------------------------
// MODULE 5: PRESENTATION & THEATRE
// Source: [R8] Cocktail presentation deep research
// ---------------------------------------------------------------------------
export const presentationTheatre = {
  iceProgramme: [
    {
      format: 'Hand-carved sphere (2.5 inch)',
      specialist: 'Gl\u00e4ce Luxury Ice (US) \u2014 ~$325/50 pieces; Okamoto Studio (Tokyo)',
      why: 'Maximum volume-to-surface ratio; slowest dilution. 20\u201340 min melt time.',
      luxurySignal: 'Very high',
      source: '[R8]'
    },
    {
      format: 'Perfect cube (Kold-Draft machine)',
      specialist: 'Kold-Draft 1.25-inch cube \u2014 industry gold standard for volume venues',
      why: 'Crystal clarity, dense, preserves carbonation. Indicator of venue quality.',
      luxurySignal: 'High',
      source: '[R8]'
    },
    {
      format: 'Branded / inclusion ice',
      specialist: 'Mixology Ice / Celebration Iceworks \u2014 edible gold infusions, flower inclusions',
      why: 'Custom branding, edible flower suspension, gold-leaf inclusion.',
      luxurySignal: 'Very high (event-specific)',
      source: '[R8]'
    },
    {
      format: 'Caviar ice plates',
      specialist: 'Select luxury suppliers',
      why: 'Oceanic cocktail pairings; coastal cocktail trend.',
      luxurySignal: 'Exceptional / niche',
      source: '[R8]'
    }
  ],
  glassware: [
    { name: 'Nick & Nora', maker: 'Luigi Bormioli (2025 German Design Award Gold) / Orrefors', signalLevel: 'High', notes: 'Art Deco revival. Standard for Martini, Manhattan. 0.95mm laser rim.' },
    { name: 'Baccarat Harcourt', maker: 'Baccarat', signalLevel: 'Ultra-premium', notes: '$780+ per flute. Status object.' },
    { name: 'Lalique crystal', maker: 'Lalique', signalLevel: 'Ultra-premium', notes: 'Beluga Epicure II: \u20ac15,000 decanter. Four Seasons NYC Billionaire\u2019s Row cocktail served exclusively in Lalique.' },
    { name: 'Richard Brendon / Jancis Robinson', maker: 'Richard Brendon', signalLevel: 'High functional luxury', notes: 'Mouth-blown feel, Michelin favourite. Aromas maximised by calibrated bowl.' },
    { name: 'Zalto / Riedel Performance', maker: 'Zalto / Riedel', signalLevel: 'Professional high-end', notes: 'Sommelier standard. Less visual drama than Baccarat but supreme functionality.' }
  ],
  theatreFormats: [
    {
      name: 'Espresso Martini Tower',
      description: 'Stacked coupe glasses, batched pour cascades down tiers. Replaces Champagne tower at galas/weddings.',
      brands: 'Ketel One, Tito\u2019s, Mr Black coffee liqueur',
      suitabilityForKhorus: 'Excellent \u2014 universally loved, high theatre, highly photographable',
      source: '[R8]'
    },
    {
      name: 'Smoking Dome Reveal',
      description: 'Applewood or hickory chips under glass cloche. Tableside lift creates visual plume + aroma hit.',
      brands: 'Don Julio 1942, Macallan, mezcal expressions',
      suitabilityForKhorus: 'Excellent for intimate dinners and VIP tables',
      source: '[R8]'
    },
    {
      name: 'Aperol Spritz / Gin Cart (Mobile)',
      description: 'Branded vintage tricycle or cart. Mobile mixing, custom botanicals, Instagram focal point.',
      brands: 'Aperol, Hendrick\u2019s, The Botanist',
      suitabilityForKhorus: 'Strong for daytime / garden events',
      source: '[R8]'
    },
    {
      name: 'Tableside Martini Trolley (Gu\u00e9ridon)',
      description: 'Gold standard set by Connaught Bar. Bitters lineup, personalised build, tableside performance.',
      brands: 'Connaught Bar Gin, Tanqueray No.10',
      suitabilityForKhorus: 'Premium \u2014 for seated dinner activations',
      source: '[R8]'
    },
    {
      name: 'Liquid Nitrogen Garnishes',
      description: 'Instant freeze on tableside. Dramatic smoke effect. Used for edible botanicals and fruit spheres.',
      brands: 'Venue-specific techniques',
      suitabilityForKhorus: 'High impact but requires skilled operator',
      source: '[R8]'
    },
    {
      name: 'Edible Gold Garnish',
      description: '24-karat gold leaf (Slofoodgroup / Easy Leaf). Gold-dusted coffee beans, gold rim margaritas.',
      brands: 'Grey Goose Devil\u2019s Roast (gold beans); Annabel\u2019s The Judith (24k gold theme)',
      suitabilityForKhorus: 'Scalable luxury signal \u2014 low cost, high perceived value',
      source: '[R8]'
    }
  ]
}

// ---------------------------------------------------------------------------
// MODULE 6: MIDDLE EAST SPECIFICS
// Source: [R6] Middle East luxury cocktail scene deep research
// ---------------------------------------------------------------------------
export const middleEastIntel = {
  overview: 'Bifurcated market: licensed premium bars (UAE/Qatar/Bahrain) + sophisticated zero-proof innovation (Saudi Arabia). Both tracks converge on high-end experiential presentation.',
  licensedVenues: [
    { venue: 'Gilt, Burj Al Arab', city: 'Dubai', note: 'Centrifuge / rotovap techniques; LOUIS XIII Gulf exclusive; AED 90\u2013150 cocktails' },
    { venue: 'Skyview Bar, Burj Al Arab', city: 'Dubai', note: 'Passion Fruit Martini signature; classic luxury; AED 135\u2013150' },
    { venue: 'Broadway, Emirates Palace', city: 'Abu Dhabi', note: 'LOUIS XIII Rare Cask 42.1 exclusive Gulf pouring; international bar takeovers incl. DUKES London' },
    { venue: 'Hakkasan, Atlantis The Palm', city: 'Dubai', note: 'The Hakka: vodka, sake, lychee, coconut; AED packages from 538pp' }
  ],
  zeroproofLeaders: [
    { venue: 'Tonic Bar, Four Seasons Riyadh', city: 'Riyadh', note: 'All-female bar team. Imperial Sparkle (yuzu + Lyre\u2019s). Mediterranean Whisper (clarified cucumber + dill). SAR 55\u2013\u201369.' },
    { venue: 'Alieia by the Sea / The Good Butcher', city: 'Jeddah', note: 'Charbel Mallah: Wooden Smokey House mocktail under smoke cloche. Narrative-driven presentation.' }
  ],
  megaEvents: [
    { event: 'Abu Dhabi F1 Grand Prix', note: 'Shams Suite: 7hr open bar + gourmet. Harbour Club: Champagne on race day. Superyacht: from \u00a3455/day (Friday); \u00a33k+ full weekend.' },
    { event: 'Dubai World Cup', note: 'Royal Enclosure: Majlis banquet + free-flowing bubbly. Silks Restaurant private suites from AED 4,900. Oyster + caviar station.' },
    { event: 'Riyadh Season', note: 'All zero-proof. Sophisticated mocktail programming with Saudi staples.' }
  ],
  regionalFlavours: [
    { ingredient: 'Saffron', use: 'Floral aroma, golden hue. Saffron Lemonade, Saffron Golden Milk. Most expensive spice \u2014 instant luxury signal.' },
    { ingredient: 'Dates', use: 'Natural sweetness + cultural heritage. Date purees/syrups as base for zero-proof builds.' },
    { ingredient: 'Taif Rose', use: 'Prized Arabian rose from Ta\u2019if, Saudi Arabia. Rosewater pairings with cardamom.' },
    { ingredient: 'Cardamom', use: 'Warm spiced depth. Traditional Qahwa coffee translation into cocktails. Popular in both alcoholic and zero-proof.' }
  ],
  note: 'Khorus MENA presence referenced in research as a live communications agency operating across the Gulf region. [R6]'
}

// ---------------------------------------------------------------------------
// MODULE 7: ZERO-PROOF LUXURY
// Source: [R7] Zero-proof luxury cocktail trends deep research
// ---------------------------------------------------------------------------
export const zeroproofLuxury = {
  marketSize: '$13B+ global zero-proof market (2024). CAGR 7\u20138% to 2028. [R7]',
  iwsrCAGR: {
    overallNoLow: '+4% (2024\u20132028)',
    noAlcohol: '+7%',
    noAlcoholRTD: '+10% (fastest)',
    usSpecific: '+18% (US no-alcohol 2024\u20132028)'
  },
  eventDemand: '24\u201330% of luxury event guests now request zero-proof options. 68% of luxury events feature dedicated zero-proof menus. [R7]',
  demographics: '40%+ of Millennials / Gen Z actively reducing alcohol. 92% of NA buyers also purchase alcohol \u2014 \u201cflexitarian\u201d not fully sober. [R7]',
  pricingParity: 'Luxury ZP cocktails: $9\u2013$14. Alcoholic equivalent: $14\u2013$18. Near-parity justified by costly botanical extraction and short shelf life. [R7]',
  venues: [
    { venue: 'The Connaught Bar', offering: 'Flora \u2014 Aecorn dry, purple cordial, peach and jasmine soda. Same theatrical service as alcoholic.' },
    { venue: 'Soho House', offering: 'Non-Alcoholic Picante (Pentire Adrift). Banned the word \u201cmocktail\u201d \u2014 \u201cnon-alcoholic cocktails\u201d only.' },
    { venue: 'Aman Nai Lert Bangkok', offering: '0% Negroni and No Whiskey Sour on Godai-inspired menu.' },
    { venue: 'Rosewood properties', offering: 'Rosewood Reverie: chamomile, cherry, ashwagandha, rosewater. \u201cMood Enhancing Libations\u201d menu.' }
  ],
  premiumBrands: [
    { brand: 'Seedlip', notes: 'Pioneer. Grove 42 (blood orange, ginger, sansho pepper). Luxury spritz base.' },
    { brand: 'Lyre\u2019s', notes: 'Most comprehensive range. Italian Orange replicates aperitivo. Classico for toast moments.' },
    { brand: 'French Bloom', notes: 'LVMH-backed. Organic Chardonnay, oak-aged. $100\u2013$119/bottle. True champagne-class positioning.' },
    { brand: 'Everleaf', notes: 'Conservation biologist founder. Forest: saffron, vanilla, orange blossom. Premium spritz base.' },
    { brand: 'Pentire', notes: 'Cornish coastline. Adrift: rock samphire, sage, sea salt. Soho House NA Picante base.' },
    { brand: 'Three Spirit', notes: 'Mood-enhancing botanicals. Nightcap: woodsy, vanilla, soft bitterness. Digestif role.' },
    { brand: 'Feragaia', notes: "Scotland's first alcohol-free spirit. Kaffir lime, pink peppercorn, cayenne. Zero-proof Penicillin." }
  ],
  adaptogens: 'CBD, ashwagandha, lion\u2019s mane, rhodiola appearing on luxury event menus as \u201cbooze-free buzz\u201d. Rosewood leads. [R7]'
}

// ---------------------------------------------------------------------------
// MODULE 8: OPPORTUNITY RADAR (Signal \u2192 Migration \u2192 Product \u2192 Brief \u2192 Reallocation)
// Hand-authored for v1, calibrated to Khorus luxury-events use case
// ---------------------------------------------------------------------------
export const opportunityRadar = [
  {
    id: 'spritz-fatigue',
    signal: 'Spritz Fatigue \u2192 Highball Intercept',
    signalDetail: 'Aperol Spritz collapsed from #9 Difford\u2019s 2020 to #92 in 2025. Consumer search declining while DI ranking still holds (#8). Classic divergence pattern.',
    migration: 'Consumers migrating to Paloma (+5 DI ranks since 2022), Hugo Spritz (new top-50 entry), and gin-based highballs. Refreshment category is not dying \u2014 it\u2019s being redistributed.',
    product: 'Bespoke spritz station anchored by premium gin highball (The Botanist / Monkey 47 / Hendrick\u2019s) with house botanicals and exotic citrus. Offer a \u201cSignature Khorus Spritz\u201d as the arrival drink across events.',
    brief: 'Replace Aperol as the default arrival drink. Build a branded gin highball programme with 2\u20133 seasonal variants. Partners: Remy Cointreau (The Botanist), Hendrick\u2019s (William Grant).',
    reallocation: 'Shift arrival-drink budget from Aperol activation to gin highball programme. Higher perceived premium, lower commodity feel, stronger brand storytelling opportunity.',
    urgency: 'Act now \u2014 Spritz is still commercially strong but brand equity is eroding. First-mover advantage in repositioning arrival drinks at UK luxury events.',
    colour: '#0f766e'
  },
  {
    id: 'zero-proof-weddings',
    signal: 'Zero-Proof Wedding & Corporate Demand',
    signalDetail: '24\u201330% of luxury event guests now actively request zero-proof options (IWSR 2025). Search for \u201cdry weddings\u201d +85% YoY. 68% of luxury events already have dedicated ZP menus \u2014 but quality is highly variable.',
    migration: 'Market moving from \u201cjuice corner\u201d to full-parity non-alcoholic programmes. French Bloom ($100\u2013$119/bottle, LVMH-backed) is replacing Champagne for toasts. Soho House banning \u201cmocktail\u201d language.',
    product: 'Khorus Zero-Proof Luxury Tier. Curated NA programme: French Bloom for toasts, Seedlip / Everleaf for cocktail hour, Three Spirit Nightcap for post-dinner. Presented in identical glassware with same theatre. Adaptogens (ashwagandha, lion\u2019s mane) as optional \u201cfunction\u201d layer.',
    brief: 'Develop a standard Khorus ZP package that can be appended to any event proposal. Include tasting notes and menu card for each drink. Position as wellness-forward luxury, not abstinence.',
    reallocation: 'Zero-proof cocktails run 10\u201315% pour cost vs 18\u201322% for alcoholic \u2014 higher margin at near-equivalent pricing. Budget reallocation improves event P&L while raising guest satisfaction.',
    urgency: 'Competitive table-stakes within 12 months. Build now before it becomes a commodity expectation.',
    colour: '#6d28d9'
  },
  {
    id: 'caviar-tequila',
    signal: 'Caviar Garnish + Ultra-Premium Tequila Crossover',
    signalDetail: 'Don Julio 1942 Chaparritos at Oscars, Met Gala, F1 Melbourne. Clase Azul Dia de Muertos at $1,900/bottle. Caviar Martini at Silverleaf (London). The F1 Mischief \u201cPodium\u201d pairs Don Julio 1942 with caviar service. These activations are coalescing into a recognisable luxury gesture.',
    migration: 'The Margarita (DI #3) is being \u201celevated\u201d out of casual dining into luxury territory through ultra-premium agave spirits + culinary garnish crossover. High-low pairing (caviar + tequila) is the most talked-about luxury drinks moment of 2024\u20132025.',
    product: 'The Khorus Caviar Margarita activation. Clase Azul Reposado or Don Julio 1942, fresh lime, agave \u2014 garnished with a quenelle of Golden Ossetra caviar on chip + cr\u00e8me fra\u00eeche alongside. Serves as the headline moment at premium events.',
    brief: 'Source Clase Azul / Don Julio 1942 via on-trade allocation. Partner with a premium caviar supplier (Caviar House, The Caviar Co, Petrossian). Build as a \u201csignature activation\u201d uplift that sits above standard bar package.',
    reallocation: 'Charge as a VIP activation uplift (\u00a315\u201325 per serve premium). One activation moment (e.g., 7pm reveal) rather than full bar, concentrates spend for maximum impact.',
    urgency: 'Window is 12\u201318 months before mainstream saturation. Currently a differentiated luxury signal.',
    colour: '#b45309'
  }
]

export const profileMeta = {
  clientName: 'Khorus',
  profileTitle: 'Cocktail Intelligence Profile',
  subtitle: 'Global ranking, flavour trends, luxury event intel \u2014 tailored for luxury events programming',
  lastUpdated: 'April 2026',
  dataFreshness: 'April 2026',
  sourcedFrom: 'DI World\u2019s 50 Best Bars Brand Report, Difford\u2019s Guide analytics, IWSR 2024\u20132026, Bacardi Cocktail Trends Report, World\u2019s 50 Best Bars menu analysis, Tales of the Cocktail 2024\u20132025, Class Magazine, The Spirits Business, Imbibe',
  contactEmail: 'callingjhphoto@gmail.com'
}
