/**
 * profileKhorusCocktails.js
 * Data file for Khorus Cocktail Intelligence Profile
 * Sources: 7 deep research reports in ~/Documents/Claude/research/chloe_khorus_cocktails/
 * Generated: April 2026
 *
 * CITATION KEY
 *   [R1] = 00_internal_data_audit.md
 *   [R2] = 01_top_cocktails_global.md (DI/Difford’s/IWSR deep research)
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
// Methodology: DI surveys 100 elite bars; Difford’s uses 700k+ monthly page-views
// ---------------------------------------------------------------------------
export const top20Cocktails = [
  {
    rank: 1,
    name: 'Negroni',
    spiritBase: 'Gin',
    type: 'Classic',
    diRank: '#1 (2022–2025)',
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
    rankMove: '−1 since 2022'
  },
  {
    rank: 3,
    name: 'Margarita',
    spiritBase: 'Tequila',
    type: 'Classic',
    diRank: '#3',
    diffordsRank: '#4',
    trend: 'rising',
    note: 'Fragmented by variants (Tommy’s, Mezcal, Picante). [R2]',
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
    rankMove: 'Consistent #1 Difford’s'
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
    note: '‘2025 was a good year for Martinis’ — Difford’s. Freezer-martini trend accelerating. [R2]',
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
    rankMove: '∘4 vs 2022 DI; −83 Difford’s'
  },
  {
    rank: 10,
    name: 'Paloma',
    spiritBase: 'Tequila',
    type: 'Classic',
    diRank: '#9',
    diffordsRank: '#14',
    trend: 'rising',
    note: 'Replacing Spritz as the ‘refresher’ of choice at elite bars. [R2]',
    rankMove: '+5 since 2022'
  },
  {
    rank: 11,
    name: 'Moscow Mule / Gin Gin Mule',
    spiritBase: 'Vodka / Gin',
    type: 'Classic',
    diRank: '#10',
    diffordsRank: '—',
    trend: 'stable',
    note: 'High RTD presence. Copper mug theatre remains a draw. [R2]',
    rankMove: 'Stable'
  },
  {
    rank: 12,
    name: 'Gin Basil Smash',
    spiritBase: 'Gin',
    type: 'Modern Classic',
    diRank: '—',
    diffordsRank: '#2',
    trend: 'rising',
    note: 'Created by Jörg Meyer. Up from #33 in 2016. Vibrant green visual. [R2]',
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
    name: 'Vieux Carré',
    spiritBase: 'Rye / Cognac',
    type: 'Classic',
    diRank: '—',
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
    diRank: '—',
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
    diRank: '—',
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
    diRank: '—',
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
    diRank: '—',
    diffordsRank: '#9 (was #20 in 2020)',
    trend: 'fast-rising',
    note: 'Largest rank gain in Difford’s top 20. Jalapeño/agave. [R2]',
    rankMove: '+11 since 2020'
  },
  {
    rank: 19,
    name: 'Mojito',
    spiritBase: 'Rum',
    type: 'Classic',
    diRank: '—',
    diffordsRank: '—',
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
    penetration: '30% of Asia Top 100 bar cocktails feature savoury elements; 96% list ≥1',
    trend: 'leading',
    colour: '#64748b',
    ingredients: ['Miso', 'Seaweed / Kombu', 'Tomato water', 'Fino sherry', 'Sesame oil (fat-wash)', 'Truffle oil', 'Fermented soy'],
    venueExamples: [
      'Handshake Speakeasy (Mexico City, W50B #1) — tom yum gimlet with coconut oil-washed tequila',
      'Bar Pompette — toasted kombu syrup + dill umami bitters',
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
    penetration: 'Mainstream — driven by Negroni dominance and aperitivo culture',
    trend: 'established-growing',
    colour: '#b45309',
    ingredients: ['Campari', 'Cynar', 'Fernet-Branca', 'Amaro Montenegro', 'Non-alcoholic amari (Lyre’s Italian Orange)', 'Gentian bitters'],
    venueExamples: [
      'Negroni #1 globally (DI 2022–2025)',
      'Connaught Bar — Coffee Negroni on rotating menu',
      'Soho House NA Picante: Pentire Adrift swapped for tequila'
    ],
    eventApplication: 'Zero-proof Negroni programme using NA amaro. Same glassware, same theatre, no alcohol. ~24–30% of luxury event guests choose zero-proof. [R7]',
    source: '[R3]'
  },
  {
    id: 'smoky',
    name: 'Smoky',
    icon: '\ud83d\udd25',
    growthSignal: 'Agave boom driving mainstream acceptance; Oaxaca Old Fashioned debuted DI top 50',
    penetration: 'Significant — mezcal + peated Scotch crossover',
    trend: 'rising',
    colour: '#374151',
    ingredients: ['Mezcal', 'Peated Scotch (Laphroaig, Ardbeg)', 'Smoked sea salt', 'Hickory / applewood chips', 'Charred oak syrups'],
    venueExamples: [
      'Oaxacan Paloma — mezcal, yuzu, agave, salt rim',
      'Smoked Old Fashioned under glass cloche (tableside)',
      'Campari’s Mads Negroni at Cannes 2025 — mezcal substituted for gin'
    ],
    eventApplication: 'Smoking dome reveal. Tableside applewood-smoked Old Fashioned or Negroni Mezcal. Multi-sensory theatre that photographs and films well.',
    source: '[R3]'
  },
  {
    id: 'low-sugar-sour',
    name: 'Low-Sugar Sour',
    icon: '\ud83c\udf4b',
    growthSignal: 'TOTC 2025 consensus: ‘drinks were sour’ — retreat from sweetness',
    penetration: 'Growing fast across Gen Z / Millennial premium segment',
    trend: 'rising',
    colour: '#ca8a04',
    ingredients: ['Calamansi', 'Yuzu', 'Meyer lemon', 'Blood orange', 'Verjus', 'Natural botanical sweetness only'],
    venueExamples: [
      'Crystal Gimlet — gin, yuzu, clarified basil & cucumber cordial',
      'Daiquiri variants with exotic citrus at W50B bars',
      'Sour-forward aperitif lists at Claridge’s / Connaught'
    ],
    eventApplication: 'Pre-batched clarified milk punch. Batch days in advance, pours crystal-clear over stamped ice. Luxury appearance at bar speed. Perfect for high-volume corporate galas.',
    source: '[R3]'
  },
  {
    id: 'tropical',
    name: 'Tropical & Floral',
    icon: '\ud83c\udf34',
    growthSignal: 'Passion fruit + guava projected defining cocktail fruits of 2026',
    penetration: 'Porn Star Martini #1 Difford’s 11 years; Hugo Spritz new top-50 entry',
    trend: 'resurgent',
    colour: '#059669',
    ingredients: ['Passion fruit', 'Guava', 'Lychee', 'Elderflower', 'Hibiscus', 'Butterfly pea flower', 'Lavender', 'Jasmine'],
    venueExamples: [
      'Atlantis The Palm, Hakkasan — The Hakka: vodka, sake, lychee, coconut',
      'Burj Al Arab Gilt bar — Sakura: Sakura tea, grapefruit zest',
      'Porn Star Martini: passion fruit + vanilla + Champagne sidecar'
    ],
    eventApplication: 'Tropical Milk Punch — batchable, clarified, stunning colour. Tequila, guava cordial, pasilla chilli. Hits tropical, heat, and luxury technique simultaneously.',
    source: '[R3]'
  },
  {
    id: 'spicy-heat',
    name: 'Spicy & Heat',
    icon: '\ud83c\udf36\ufe0f',
    growthSignal: '+20% average annual growth in beverage launches (spice/heat)',
    penetration: 'Picante de la Casa +11 Difford’s ranks 2020–2025',
    trend: 'fast-rising',
    colour: '#dc2626',
    ingredients: ['Jalapeño', 'Habanero', 'Chipotle', 'Ancho Reyes', 'Tajin', 'Buzz-button flower', 'Gochugaru'],
    venueExamples: [
      'Picante de la Casa: tequila, jalapeño, coriander, lime',
      'Soho House Non-Alcoholic Picante — Pentire Adrift base',
      'Electric Passion Margarita at luxury yacht charters — buzz-button garnish'
    ],
    eventApplication: '"Sweet heat" positioning — tropical fruit + chilli tincture as an add-on to Margarita service. Low-commitment way to access the trend without full menu overhaul.',
    source: '[R3]'
  },
  {
    id: 'coffee-spiced',
    name: 'Coffee & Spiced',
    icon: '☕',
    growthSignal: '45% of bartenders experimenting with espresso / coffee (Bacardi)',
    penetration: 'Espresso Martini +116% value velocity US; Carajillo rising fast',
    trend: 'dominant',
    colour: '#4b2e0a',
    ingredients: ['Cold brew', 'Espresso', 'Licor 43', 'Mr Black', 'Kahlua', 'Cardamom', 'Vanilla', 'Cacao air'],
    venueExamples: [
      'Espresso Martini Tower — replacing Champagne tower at weddings and galas',
      'Grey Goose “The Devil’s Roast” at NYFW 2026: espresso martini + gold-dusted beans',
      'F1 Mischief superyacht: ‘Podium’ cocktail with cacao husk distillate'
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
    avgCostPerServe: '£23–£25 (~$30)',
    vintageOption: '£100–£120 (1970s Gordon’s / Haig)',
    theatre: 'Martini trolley, handmade bitters lineup, tableside ritual',
    source: '[R4][R5]'
  },
  {
    venue: 'Annabel’s',
    location: 'Berkeley Square, Mayfair',
    tier: 'Private members club',
    signatureCocktail: '“The Judith” — Hennessy, Galliano, lemon foam, smoked paprika',
    dominantBrand: 'Hennessy Cognac / Suntory Toki',
    avgCostPerServe: 'Membership-gated (£3,500 pa + £1,250 join)',
    vintageOption: 'Yamazaki 55 available',
    theatre: 'Immersive themed interiors; seasonal art installations; Japanese restaurant with The Book of Five Rings cocktail menu',
    source: '[R4]'
  },
  {
    venue: 'Savoy Beaufort Bar',
    location: 'Strand, London',
    tier: 'Historic super-prime',
    signatureCocktail: '“Red Carpet” — whisky, amaro, honey, cold-brew coffee',
    dominantBrand: 'Pol Roger / Laurent-Perrier Grand Siecle',
    avgCostPerServe: '£25+',
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
    signatureCocktail: '“Oseille” — sorrel-infused vodka, dehydrated yoghurt, green cardamom',
    dominantBrand: 'LOUIS XIII Rare Cask 42.1 (exclusive Gulf pouring)',
    avgCostPerServe: 'AED 90–150 (~$25–$41)',
    vintageOption: 'LOUIS XIII by glass',
    theatre: 'In-house centrifuge, sous-vide, rotovap; white gold-threaded marble feature wall; Thibault Mequignon as mixologist',
    source: '[R6]'
  },
  {
    venue: 'F1 MISCHIEF Superyacht',
    location: 'Melbourne Grand Prix',
    tier: 'Ultra-premium event',
    signatureCocktail: '“The Podium” — Don Julio 1942, white vermouth, lime cordial, cacao husk, single ice sphere',
    dominantBrand: 'Don Julio 1942',
    avgCostPerServe: 'Included in $6k–$9k event access',
    vintageOption: 'Caviar service + salted lime cleanser',
    theatre: '69.5m superyacht; single ice sphere serve; tableside caviar pairing',
    source: '[R4]'
  },
  {
    venue: 'Tambourine Room by Tristan Brandt',
    location: 'Miami (Michelin-starred)',
    tier: 'Michelin pairing',
    signatureCocktail: '“Five Spice Milk Punch” paired with Kyushu Hamachi; “Lucky Cat Highball” (Macallan 12, bergamot)',
    dominantBrand: 'Macallan / Brugal 1888',
    avgCostPerServe: '$80+ cocktail pairing flight (supplement to $185 menu)',
    vintageOption: 'Macallan experience $34–$127',
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
    standardRange: '£20–£30 ($25–$38)',
    signatureRange: '£37 (Connaught Martini)',
    vintageRange: '£100–£120',
    ultraPremiumPour: 'Louis XIII: £350/50ml at Ritz; Pappy 23yo: £500/50ml at Ritz',
    eventPackage: 'N/A (a la carte)',
    notes: 'Theatrical service is the price driver, not COGS. Decoy pricing (£120 vintage) makes £37 feel reasonable. [R5]'
  },
  {
    tier: 'Mayfair private members clubs',
    venues: 'Annabel’s, 5 Hertford St, Oswald’s',
    standardRange: 'Mayfair standard (£20–£30)',
    signatureRange: 'Membership-gated',
    vintageRange: 'Oswald’s: retail-price fine wine (loss leader for members)',
    ultraPremiumPour: 'Yamazaki 55 allocated selectively',
    eventPackage: '£3,250 pa + £1,250 join (Annabel’s)',
    notes: 'Clubs use beverage as membership perk — subsidised pricing strategy. [R5]'
  },
  {
    tier: 'Middle East luxury hotel bars',
    venues: 'Burj Al Arab Gilt, Emirates Palace, Waldorf DIFC',
    standardRange: 'AED 75–150 (~$20–$41)',
    signatureRange: 'AED 90–150',
    vintageRange: 'LOUIS XIII Rare Cask 42.1 at Emirates Palace (excl. Gulf)',
    ultraPremiumPour: 'TBD',
    eventPackage: 'Happy Hour AED 35–39 at St. Trop (Waldorf DIFC)',
    notes: 'Dual-track: premium licensed bars (UAE) + zero-proof innovation (Saudi). [R6]'
  },
  {
    tier: 'Luxury event / private hire',
    venues: 'High-end weddings, corporate galas',
    standardRange: '$50–$90 per guest (open bar package)',
    signatureRange: 'Ultra top-shelf: $100+ per head',
    vintageRange: 'TBD by client spec',
    ultraPremiumPour: 'Clase Azul Dia de Muertos: $150+ per pour (est. from $1,900 bottle)',
    eventPackage: '2.4x–3x wholesale markup + 18–22% service charge',
    notes: 'Per-guest packaging preferred over consumption billing. Break-even: 2 drinks/hr1, 1 drink/hr thereafter. [R5]'
  },
  {
    tier: 'F1 / Art Basel VIP hospitality',
    venues: 'F1 Paddock Club, Art Basel VIP passes',
    standardRange: 'Included in access',
    signatureRange: 'Included',
    vintageRange: 'Louis XIII: $230 per 10ml (F1 Las Vegas)',
    ultraPremiumPour: 'Yamazaki 55: $2,000/0.5oz (Morimoto Asia); $7,000 event ticket (Portland)',
    eventPackage: 'F1 Paddock Club: $6k–$9k pp ($15k secondary market Miami/Monaco)',
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
      specialist: 'Gläce Luxury Ice (US) — ~$325/50 pieces; Okamoto Studio (Tokyo)',
      why: 'Maximum volume-to-surface ratio; slowest dilution. 20–40 min melt time.',
      luxurySignal: 'Very high',
      source: '[R8]'
    },
    {
      format: 'Perfect cube (Kold-Draft machine)',
      specialist: 'Kold-Draft 1.25-inch cube — industry gold standard for volume venues',
      why: 'Crystal clarity, dense, preserves carbonation. Indicator of venue quality.',
      luxurySignal: 'High',
      source: '[R8]'
    },
    {
      format: 'Branded / inclusion ice',
      specialist: 'Mixology Ice / Celebration Iceworks — edible gold infusions, flower inclusions',
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
    { name: 'Lalique crystal', maker: 'Lalique', signalLevel: 'Ultra-premium', notes: 'Beluga Epicure II: €15,000 decanter. Four Seasons NYC Billionaire’s Row cocktail served exclusively in Lalique.' },
    { name: 'Richard Brendon / Jancis Robinson', maker: 'Richard Brendon', signalLevel: 'High functional luxury', notes: 'Mouth-blown feel, Michelin favourite. Aromas maximised by calibrated bowl.' },
    { name: 'Zalto / Riedel Performance', maker: 'Zalto / Riedel', signalLevel: 'Professional high-end', notes: 'Sommelier standard. Less visual drama than Baccarat but supreme functionality.' }
  ],
  theatreFormats: [
    {
      name: 'Espresso Martini Tower',
      description: 'Stacked coupe glasses, batched pour cascades down tiers. Replaces Champagne tower at galas/weddings.',
      brands: 'Ketel One, Tito’s, Mr Black coffee liqueur',
      suitabilityForKhorus: 'Excellent — universally loved, high theatre, highly photographable',
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
      brands: 'Aperol, Hendrick’s, The Botanist',
      suitabilityForKhorus: 'Strong for daytime / garden events',
      source: '[R8]'
    },
    {
      name: 'Tableside Martini Trolley (Guéridon)',
      description: 'Gold standard set by Connaught Bar. Bitters lineup, personalised build, tableside performance.',
      brands: 'Connaught Bar Gin, Tanqueray No.10',
      suitabilityForKhorus: 'Premium — for seated dinner activations',
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
      brands: 'Grey Goose Devil’s Roast (gold beans); Annabel’s The Judith (24k gold theme)',
      suitabilityForKhorus: 'Scalable luxury signal — low cost, high perceived value',
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
    { venue: 'Gilt, Burj Al Arab', city: 'Dubai', note: 'Centrifuge / rotovap techniques; LOUIS XIII Gulf exclusive; AED 90–150 cocktails' },
    { venue: 'Skyview Bar, Burj Al Arab', city: 'Dubai', note: 'Passion Fruit Martini signature; classic luxury; AED 135–150' },
    { venue: 'Broadway, Emirates Palace', city: 'Abu Dhabi', note: 'LOUIS XIII Rare Cask 42.1 exclusive Gulf pouring; international bar takeovers incl. DUKES London' },
    { venue: 'Hakkasan, Atlantis The Palm', city: 'Dubai', note: 'The Hakka: vodka, sake, lychee, coconut; AED packages from 538pp' }
  ],
  zeroproofLeaders: [
    { venue: 'Tonic Bar, Four Seasons Riyadh', city: 'Riyadh', note: 'All-female bar team. Imperial Sparkle (yuzu + Lyre’s). Mediterranean Whisper (clarified cucumber + dill). SAR 55––69.' },
    { venue: 'Alieia by the Sea / The Good Butcher', city: 'Jeddah', note: 'Charbel Mallah: Wooden Smokey House mocktail under smoke cloche. Narrative-driven presentation.' }
  ],
  megaEvents: [
    { event: 'Abu Dhabi F1 Grand Prix', note: 'Shams Suite: 7hr open bar + gourmet. Harbour Club: Champagne on race day. Superyacht: from £455/day (Friday); £3k+ full weekend.' },
    { event: 'Dubai World Cup', note: 'Royal Enclosure: Majlis banquet + free-flowing bubbly. Silks Restaurant private suites from AED 4,900. Oyster + caviar station.' },
    { event: 'Riyadh Season', note: 'All zero-proof. Sophisticated mocktail programming with Saudi staples.' }
  ],
  regionalFlavours: [
    { ingredient: 'Saffron', use: 'Floral aroma, golden hue. Saffron Lemonade, Saffron Golden Milk. Most expensive spice — instant luxury signal.' },
    { ingredient: 'Dates', use: 'Natural sweetness + cultural heritage. Date purees/syrups as base for zero-proof builds.' },
    { ingredient: 'Taif Rose', use: 'Prized Arabian rose from Ta’if, Saudi Arabia. Rosewater pairings with cardamom.' },
    { ingredient: 'Cardamom', use: 'Warm spiced depth. Traditional Qahwa coffee translation into cocktails. Popular in both alcoholic and zero-proof.' }
  ],
  note: 'Khorus MENA presence referenced in research as a live communications agency operating across the Gulf region. [R6]'
}

// ---------------------------------------------------------------------------
// MODULE 7: ZERO-PROOF LUXURY
// Source: [R7] Zero-proof luxury cocktail trends deep research
// ---------------------------------------------------------------------------
export const zeroproofLuxury = {
  marketSize: '$13B+ global zero-proof market (2024). CAGR 7–8% to 2028. [R7]',
  iwsrCAGR: {
    overallNoLow: '+4% (2024–2028)',
    noAlcohol: '+7%',
    noAlcoholRTD: '+10% (fastest)',
    usSpecific: '+18% (US no-alcohol 2024–2028)'
  },
  eventDemand: '24–30% of luxury event guests now request zero-proof options. 68% of luxury events feature dedicated zero-proof menus. [R7]',
  demographics: '40%+ of Millennials / Gen Z actively reducing alcohol. 92% of NA buyers also purchase alcohol — “flexitarian” not fully sober. [R7]',
  pricingParity: 'Luxury ZP cocktails: $9–$14. Alcoholic equivalent: $14–$18. Near-parity justified by costly botanical extraction and short shelf life. [R7]',
  venues: [
    { venue: 'The Connaught Bar', offering: 'Flora — Aecorn dry, purple cordial, peach and jasmine soda. Same theatrical service as alcoholic.' },
    { venue: 'Soho House', offering: 'Non-Alcoholic Picante (Pentire Adrift). Banned the word “mocktail” — “non-alcoholic cocktails” only.' },
    { venue: 'Aman Nai Lert Bangkok', offering: '0% Negroni and No Whiskey Sour on Godai-inspired menu.' },
    { venue: 'Rosewood properties', offering: 'Rosewood Reverie: chamomile, cherry, ashwagandha, rosewater. “Mood Enhancing Libations” menu.' }
  ],
  premiumBrands: [
    { brand: 'Seedlip', notes: 'Pioneer. Grove 42 (blood orange, ginger, sansho pepper). Luxury spritz base.' },
    { brand: 'Lyre’s', notes: 'Most comprehensive range. Italian Orange replicates aperitivo. Classico for toast moments.' },
    { brand: 'French Bloom', notes: 'LVMH-backed. Organic Chardonnay, oak-aged. $100–$119/bottle. True champagne-class positioning.' },
    { brand: 'Everleaf', notes: 'Conservation biologist founder. Forest: saffron, vanilla, orange blossom. Premium spritz base.' },
    { brand: 'Pentire', notes: 'Cornish coastline. Adrift: rock samphire, sage, sea salt. Soho House NA Picante base.' },
    { brand: 'Three Spirit', notes: 'Mood-enhancing botanicals. Nightcap: woodsy, vanilla, soft bitterness. Digestif role.' },
    { brand: 'Feragaia', notes: "Scotland's first alcohol-free spirit. Kaffir lime, pink peppercorn, cayenne. Zero-proof Penicillin." }
  ],
  adaptogens: 'CBD, ashwagandha, lion’s mane, rhodiola appearing on luxury event menus as “booze-free buzz”. Rosewood leads. [R7]'
}

// ---------------------------------------------------------------------------
// MODULE 8: OPPORTUNITY RADAR (Signal → Migration → Product → Brief → Reallocation)
// Hand-authored for v1, calibrated to Khorus luxury-events use case
// ---------------------------------------------------------------------------
export const opportunityRadar = [
  {
    id: 'spritz-fatigue',
    signal: 'Spritz Fatigue → Highball Intercept',
    signalDetail: 'Aperol Spritz collapsed from #9 Difford’s 2020 to #92 in 2025. Consumer search declining while DI ranking still holds (#8). Classic divergence pattern.',
    migration: 'Consumers migrating to Paloma (+5 DI ranks since 2022), Hugo Spritz (new top-50 entry), and gin-based highballs. Refreshment category is not dying — it’s being redistributed.',
    product: 'Bespoke spritz station anchored by premium gin highball (The Botanist / Monkey 47 / Hendrick’s) with house botanicals and exotic citrus. Offer a “Signature Khorus Spritz” as the arrival drink across events.',
    brief: 'Replace Aperol as the default arrival drink. Build a branded gin highball programme with 2–3 seasonal variants. Partners: Remy Cointreau (The Botanist), Hendrick’s (William Grant).',
    reallocation: 'Shift arrival-drink budget from Aperol activation to gin highball programme. Higher perceived premium, lower commodity feel, stronger brand storytelling opportunity.',
    urgency: 'Act now — Spritz is still commercially strong but brand equity is eroding. First-mover advantage in repositioning arrival drinks at UK luxury events.',
    colour: '#0f766e'
  },
  {
    id: 'zero-proof-weddings',
    signal: 'Zero-Proof Wedding & Corporate Demand',
    signalDetail: '24–30% of luxury event guests now actively request zero-proof options (IWSR 2025). Search for “dry weddings” +85% YoY. 68% of luxury events already have dedicated ZP menus — but quality is highly variable.',
    migration: 'Market moving from “juice corner” to full-parity non-alcoholic programmes. French Bloom ($100–$119/bottle, LVMH-backed) is replacing Champagne for toasts. Soho House banning “mocktail” language.',
    product: 'Khorus Zero-Proof Luxury Tier. Curated NA programme: French Bloom for toasts, Seedlip / Everleaf for cocktail hour, Three Spirit Nightcap for post-dinner. Presented in identical glassware with same theatre. Adaptogens (ashwagandha, lion’s mane) as optional “function” layer.',
    brief: 'Develop a standard Khorus ZP package that can be appended to any event proposal. Include tasting notes and menu card for each drink. Position as wellness-forward luxury, not abstinence.',
    reallocation: 'Zero-proof cocktails run 10–15% pour cost vs 18–22% for alcoholic — higher margin at near-equivalent pricing. Budget reallocation improves event P&L while raising guest satisfaction.',
    urgency: 'Competitive table-stakes within 12 months. Build now before it becomes a commodity expectation.',
    colour: '#6d28d9'
  },
  {
    id: 'caviar-tequila',
    signal: 'Caviar Garnish + Ultra-Premium Tequila Crossover',
    signalDetail: 'Don Julio 1942 Chaparritos at Oscars, Met Gala, F1 Melbourne. Clase Azul Dia de Muertos at $1,900/bottle. Caviar Martini at Silverleaf (London). The F1 Mischief “Podium” pairs Don Julio 1942 with caviar service. These activations are coalescing into a recognisable luxury gesture.',
    migration: 'The Margarita (DI #3) is being “elevated” out of casual dining into luxury territory through ultra-premium agave spirits + culinary garnish crossover. High-low pairing (caviar + tequila) is the most talked-about luxury drinks moment of 2024–2025.',
    product: 'The Khorus Caviar Margarita activation. Clase Azul Reposado or Don Julio 1942, fresh lime, agave — garnished with a quenelle of Golden Ossetra caviar on chip + crème fraîche alongside. Serves as the headline moment at premium events.',
    brief: 'Source Clase Azul / Don Julio 1942 via on-trade allocation. Partner with a premium caviar supplier (Caviar House, The Caviar Co, Petrossian). Build as a “signature activation” uplift that sits above standard bar package.',
    reallocation: 'Charge as a VIP activation uplift (£15–25 per serve premium). One activation moment (e.g., 7pm reveal) rather than full bar, concentrates spend for maximum impact.',
    urgency: 'Window is 12–18 months before mainstream saturation. Currently a differentiated luxury signal.',
    colour: '#b45309'
  }
]

// ---------------------------------------------------------------------------
// TWENTY-YEAR TREND ARC: 2006-2026
// Source: [R9] = ~/Documents/Claude/research/chloe_khorus_cocktails/08_twenty_year_trend_arc.md
// Generated: April 2026
// All figures from Drinks International, Difford’s Guide, IWSR, Tales of the Cocktail,
// World’s 50 Best Bars, CGA by NIQ, Bacardi Cocktail Trends Report, Synthesis Research
// ---------------------------------------------------------------------------
export const twentyYearArc = {
  eras: [
    {
      id: 'era1',
      label: '2006–2009',
      subtitle: 'Cosmo Tail-End & Speakeasy Emergence',
      dominantCocktails: ['Cosmopolitan', 'Classic Martini', 'Mojito', 'Flavoured Martinis', 'Appletini'],
      flavourProfile: 'Sweet, feminine, approachable — luxury segment moving toward dry & bitter',
      culturalMoment: 'Sex & the City cultural dominance; Milk & Honey (2003) and PDT (2007) define early speakeasy template',
      luxuryBehaviour: 'Ultra-premium venues (Dukes Bar, The Connaught) quietly rejecting neon-coloured excess; gin reclaiming prestige bars',
      keyIngredient: 'Flavoured vodka (mass); gin (prestige)',
      accentColour: '#818cf8',
      // [R9] Era 1: Milk & Honey and PDT origin point per Tales of the Cocktail historical records
    },
    {
      id: 'era2',
      label: '2010–2014',
      subtitle: 'Craft Explosion & Bitters Renaissance',
      dominantCocktails: ['Old Fashioned', 'Negroni', 'Daiquiri', 'Sazerac', 'Mai Tai', 'Last Word'],
      flavourProfile: 'Bitter, spirit-forward, complex — sweetness was anathema',
      culturalMoment: 'Craft bourbon booms; farm-to-table influences bars; World’s 50 Best Bars launches (2013)',
      luxuryBehaviour: 'Artisanal minimalism (Death & Co template) vs molecular maximalism; bartending elevated to competitive sport via brand sponsorships',
      keyIngredient: 'Artisanal bitters, hand-cracked ice, heritage rye & bourbon',
      accentColour: '#f59e0b',
      // [R9] Era 2: DI 2013-2014 bartender surveys; W50B inaugural 2013 list
    },
    {
      id: 'era3',
      label: '2015–2018',
      subtitle: 'Instagram Era & Aperol Spritz Explosion',
      dominantCocktails: ['Negroni', 'Old Fashioned', 'Aperol Spritz', 'Mezcal Margarita', 'Gin & Tonic', 'Espresso Martini'],
      flavourProfile: 'Bittersweet, botanical, fresh — visual shareability as important as taste',
      culturalMoment: 'Instagram reshapes hospitality; Aperol Spritz transforms from regional Italian aperitif to global luxury signifier; Japanese whisky investment peaks',
      luxuryBehaviour: 'Spritz Bars become de facto requirement at premium weddings & galas; mezcal breaks through as ultra-premium agave; W50B decentralises globally',
      keyIngredient: 'Aperol, premium tonics (Fever-Tree), small-batch mezcal, Japanese whisky',
      accentColour: '#f97316',
      // [R9] Era 3: DI 2015-2018 reports on Aperol Spritz rise; IWSR mezcal data 2015-2018
    },
    {
      id: 'era4',
      label: '2019–2021',
      subtitle: 'Pre-Pandemic Peak & Pandemic Pivot',
      dominantCocktails: ['Negroni', 'Espresso Martini', 'Old Fashioned', 'Aperol Spritz', 'Negroni Sbagliato', 'At-Home RTD'],
      flavourProfile: 'Bifurcated — simultaneously maximalist (Spritz) and minimalist (zero-proof bitter amari)',
      culturalMoment: '2019 zenith of on-premise luxury; March 2020 global shutdown; RTD growth outpaces bottled spirits by 2021',
      luxuryBehaviour: 'Premium at-home kit delivery; RTD cocktails move from sacrilege to growth engine; zero-proof discovery via Seedlip & Wilfred’s; pre-batched cocktails become event-acceptable',
      keyIngredient: 'Prosecco (Sbagliato), premium RTD base spirits, Seedlip, cold-brew coffee',
      accentColour: '#06b6d4',
      // [R9] Era 4: DI 2022 confirming Negroni #1; IWSR RTD data 2020-2021
    },
    {
      id: 'era5',
      label: '2022–2024',
      subtitle: 'Gastronomic Maturation & Savoury Turn',
      dominantCocktails: ['Negroni (#1 DI 2022–2025)', 'Old Fashioned (#2)', 'Margarita (#3)', 'Espresso Martini (#4, +116% US)', 'Daiquiri (#5)', 'Whiskey Sour (#6)'],
      flavourProfile: 'Bitter-forward maturation; savoury/umami emergence; coffee ascendant; clarified clarity meets garnish complexity',
      culturalMoment: 'Post-pandemic revenge socialising; Espresso Martini Tower replaces Champagne tower at galas; 30% of top Asian bars feature savoury elements by 2024',
      luxuryBehaviour: 'Clarified milk punches become luxury batch standard; zero-proof sheds teetotaler stigma — dual menus with equivalent pricing; Handshake Speakeasy Mexico City #1 W50B 2024',
      keyIngredient: 'Campari, cold-brew espresso, miso, clarified cream, premium vermouth, edible gold',
      accentColour: '#34d399',
      // [R9] Era 5: DI 2022-2025 reports; CGA 116% YoY Espresso Martini US Q3 2024; Synthesis Research 30% savoury Asia
    },
    {
      id: 'era6',
      label: '2025–2026',
      subtitle: 'Smoky Peak, Spritz Fatigue & Zero-Proof Parity',
      dominantCocktails: ['Negroni (#1)', 'Oaxaca Old Fashioned (DI top 50 entry)', 'Margarita (#3)', 'Espresso Martini (#4)', 'Savoury Gimlets', 'Botanical Gimlets'],
      flavourProfile: 'Smoky, savoury, umami-rich, herbaceous, bitter — low-sugar refinement; multi-sensory activation',
      culturalMoment: 'Aperol Spritz drops #9 → #92 Difford’s 2020–2025; agave smoke mainstream; AI-assisted cocktail ideation emerges',
      luxuryBehaviour: 'Zero-proof = equal-status menu items with equivalent craft & pricing; smoke activation under glass cloches; savoury/umami as luxury expectation not avant-garde',
      keyIngredient: 'Mezcal, umami bitters, NA amari, aromatic woods, clarified cream (dairy-free variants), fat-washed spirits',
      accentColour: '#f87171',
      // [R9] Era 6: Difford’s Aperol Spritz #92 (2025); DI Oaxaca Old Fashioned top 50; Synthesis 30% savoury global
    }
  ],
  surprisingFindings: [
    {
      id: 'aperol-fade',
      headline: 'Aperol Spritz: #9 → #92',
      detail: 'Difford’s Guide consumer search data shows the Aperol Spritz collapsed from #9 (2020) to #92 (2025) — the sharpest single-drink decline in the data. Still #8 on Drinks International’s prestige-bar survey, but consumer appetite is evaporating. The drink has become a tourist marker, not a luxury signal.',
      colour: '#f87171',
      // [R9] Difford’s Guide consumer search data 2025
    },
    {
      id: 'smoke-mainstream',
      headline: 'Smoke Crossed Into Mainstream',
      detail: 'The Oaxaca Old Fashioned (mezcal + tequila) entered the Drinks International top 50 in 2025 — confirming that smoky profiles are no longer a niche bartender trick. Luxury bars now carry 3–5 mezcals on rotation and treat smoke as a core flavour dimension with terroir narrative.',
      colour: '#fb923c',
      // [R9] DI 2024-2025 reports; W50B 2025 lists
    },
    {
      id: 'zerop-inverted',
      headline: 'Zero-Proof: Compromise → Premium',
      detail: 'Non-alcoholic options completed a full category inversion. In 2019 they were an afterthought. By 2025, 68% of luxury events feature dedicated zero-proof menus, 24–30% of guests actively request them, and pricing has reached near-parity with alcoholic equivalents. French Bloom (LVMH-backed) at $100–$119/bottle has replaced Champagne for some luxury toasts. Soho House banned the word “mocktail.”',
      colour: '#a78bfa',
      // [R9] IWSR 2025; R7 zero-proof luxury deep research
    }
  ]
}

export const profileMeta = {
  clientName: 'Khorus',
  profileTitle: 'Cocktail Intelligence Profile',
  subtitle: 'Global ranking, flavour trends, luxury event intel — tailored for luxury events programming',
  lastUpdated: 'April 2026',
  dataFreshness: 'April 2026',
  sourcedFrom: 'DI World’s 50 Best Bars Brand Report, Difford’s Guide analytics, IWSR 2024–2026, Bacardi Cocktail Trends Report, World’s 50 Best Bars menu analysis, Tales of the Cocktail 2024–2025, Class Magazine, The Spirits Business, Imbibe',
  contactEmail: 'callingjhphoto@gmail.com'
}
