/**
 * profileChorusCocktails.js
 * Data file for Chorus Cocktail Intelligence Profile
 * Sources: 18 deep research reports in ~/Documents/Claude/research/chloe_chorus_cocktails/
 * Generated: April 2026 | Updated with Ralph-loop research data: April 2026
 *
 * CITATION KEY
 *   [R1]  = 00_internal_data_audit.md
 *   [R2]  = 01_top_cocktails_global.md (DI/Difford’s/IWSR deep research)
 *   [R3]  = 02_flavour_trends.md (Bacardi/TOTC/DI/W50B deep research)
 *   [R4]  = 03_luxury_events.md (Connaught/F1/Fashion Week deep research)
 *   [R5]  = 04_pricing_intelligence.md
 *   [R6]  = 05_middle_east.md
 *   [R7]  = 06_zero_proof_luxury.md (IWSR no/low data)
 *   [R8]  = 07_presentation_theatre.md
 *   [R9]  = 08_twenty_year_trend_arc.md
 *   [R10] = 08_apac_luxury.md (Asia-Pacific venue intelligence)
 *   [R11] = 09_wedding_intel.md (Vogue Weddings / Harper’s Bazaar / The Knot)
 *   [R12] = 10_brand_sponsorship.md (spirit brand partnership economics)
 *   [R13] = 11_competitor_agencies.md (competitive landscape)
 *   [R14] = spirits_01_whisky.md (IWSR/SWA/DISCUS)
 *   [R15] = spirits_02_agave.md (CRT/IWSR/Shanken’s)
 *   [R16] = spirits_03_gin.md (IWSR/WSTA)
 *   [R17] = spirits_04_rum_vodka_cognac.md (IWSR/BNIC)
 *   [R18] = spirits_05_liqueurs_aperitifs.md (IWSR/Campari/Pernod Ricard)
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
    rankMove: 'Climbed from outside top 50 to #3 Difford’s by 2025 [R2]'
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
    rankMove: 'Climbed steadily to #6 Difford’s by 2025 from outside top 50 in 2010 [R2]'
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
    rankMove: 'Consumer-driven climb; benefits from nostalgic indulgence wave [R2]'
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
    ultraPremiumPour: 'LOUIS XIII Rare Cask 42.1 exclusive Gulf pouring at Emirates Palace Broadway (single venue in Gulf region). [R6]',
    eventPackage: 'Happy Hour AED 35–39 at St. Trop (Waldorf DIFC)',
    notes: 'Dual-track: premium licensed bars (UAE) + zero-proof innovation (Saudi). [R6]'
  },
  {
    tier: 'Luxury event / private hire',
    venues: 'High-end weddings, corporate galas',
    standardRange: '$50–$90 per guest (open bar package)',
    signatureRange: 'Ultra top-shelf: $100+ per head',
    vintageRange: 'Clase Azul Día de Muertos: $150+ per pour (est. from $1,900 bottle, 10,000 decanters). Don Julio 1942 Chaparritos at Oscars, F1 Melbourne. [R4][R5]',
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
      suitabilityForChorus: 'Excellent — universally loved, high theatre, highly photographable',
      source: '[R8]'
    },
    {
      name: 'Smoking Dome Reveal',
      description: 'Applewood or hickory chips under glass cloche. Tableside lift creates visual plume + aroma hit.',
      brands: 'Don Julio 1942, Macallan, mezcal expressions',
      suitabilityForChorus: 'Excellent for intimate dinners and VIP tables',
      source: '[R8]'
    },
    {
      name: 'Aperol Spritz / Gin Cart (Mobile)',
      description: 'Branded vintage tricycle or cart. Mobile mixing, custom botanicals, Instagram focal point.',
      brands: 'Aperol, Hendrick’s, The Botanist',
      suitabilityForChorus: 'Strong for daytime / garden events',
      source: '[R8]'
    },
    {
      name: 'Tableside Martini Trolley (Guéridon)',
      description: 'Gold standard set by Connaught Bar. Bitters lineup, personalised build, tableside performance.',
      brands: 'Connaught Bar Gin, Tanqueray No.10',
      suitabilityForChorus: 'Premium — for seated dinner activations',
      source: '[R8]'
    },
    {
      name: 'Liquid Nitrogen Garnishes',
      description: 'Instant freeze on tableside. Dramatic smoke effect. Used for edible botanicals and fruit spheres.',
      brands: 'Venue-specific techniques',
      suitabilityForChorus: 'High impact but requires skilled operator',
      source: '[R8]'
    },
    {
      name: 'Edible Gold Garnish',
      description: '24-karat gold leaf (Slofoodgroup / Easy Leaf). Gold-dusted coffee beans, gold rim margaritas.',
      brands: 'Grey Goose Devil’s Roast (gold beans); Annabel’s The Judith (24k gold theme)',
      suitabilityForChorus: 'Scalable luxury signal — low cost, high perceived value',
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
  note: 'Chorus MENA presence referenced in research as a live communications agency operating across the Gulf region. [R6]'
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
// Hand-authored for v1, calibrated to Chorus luxury-events use case
// ---------------------------------------------------------------------------
export const opportunityRadar = [
  {
    id: 'spritz-fatigue',
    signal: 'Spritz Fatigue → Highball Intercept',
    signalDetail: 'Aperol Spritz collapsed from #9 Difford’s 2020 to #92 in 2025. Consumer search declining while DI ranking still holds (#8). Classic divergence pattern.',
    migration: 'Consumers migrating to Paloma (+5 DI ranks since 2022), Hugo Spritz (new top-50 entry), and gin-based highballs. Refreshment category is not dying — it’s being redistributed.',
    product: 'Bespoke spritz station anchored by premium gin highball (The Botanist / Monkey 47 / Hendrick’s) with house botanicals and exotic citrus. Offer a “Signature Chorus Spritz” as the arrival drink across events.',
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
    product: 'Chorus Zero-Proof Luxury Tier. Curated NA programme: French Bloom for toasts, Seedlip / Everleaf for cocktail hour, Three Spirit Nightcap for post-dinner. Presented in identical glassware with same theatre. Adaptogens (ashwagandha, lion’s mane) as optional “function” layer.',
    brief: 'Develop a standard Chorus ZP package that can be appended to any event proposal. Include tasting notes and menu card for each drink. Position as wellness-forward luxury, not abstinence.',
    reallocation: 'Zero-proof cocktails run 10–15% pour cost vs 18–22% for alcoholic — higher margin at near-equivalent pricing. Budget reallocation improves event P&L while raising guest satisfaction.',
    urgency: 'Competitive table-stakes within 12 months. Build now before it becomes a commodity expectation.',
    colour: '#6d28d9'
  },
  {
    id: 'caviar-tequila',
    signal: 'Caviar Garnish + Ultra-Premium Tequila Crossover',
    signalDetail: 'Don Julio 1942 Chaparritos at Oscars, Met Gala, F1 Melbourne. Clase Azul Dia de Muertos at $1,900/bottle. Caviar Martini at Silverleaf (London). The F1 Mischief “Podium” pairs Don Julio 1942 with caviar service. These activations are coalescing into a recognisable luxury gesture.',
    migration: 'The Margarita (DI #3) is being “elevated” out of casual dining into luxury territory through ultra-premium agave spirits + culinary garnish crossover. High-low pairing (caviar + tequila) is the most talked-about luxury drinks moment of 2024–2025.',
    product: 'The Chorus Caviar Margarita activation. Clase Azul Reposado or Don Julio 1942, fresh lime, agave — garnished with a quenelle of Golden Ossetra caviar on chip + crème fraîche alongside. Serves as the headline moment at premium events.',
    brief: 'Source Clase Azul / Don Julio 1942 via on-trade allocation. Partner with a premium caviar supplier (Caviar House, The Caviar Co, Petrossian). Build as a “signature activation” uplift that sits above standard bar package.',
    reallocation: 'Charge as a VIP activation uplift (£15–25 per serve premium). One activation moment (e.g., 7pm reveal) rather than full bar, concentrates spend for maximum impact.',
    urgency: 'Window is 12–18 months before mainstream saturation. Currently a differentiated luxury signal.',
    colour: '#b45309'
  }
]

// ---------------------------------------------------------------------------
// TWENTY-YEAR TREND ARC: 2006-2026
// Source: [R9] = ~/Documents/Claude/research/chloe_chorus_cocktails/08_twenty_year_trend_arc.md
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


// ---------------------------------------------------------------------------
// MODULE 9: APAC LUXURY VENUE INTELLIGENCE
// Source: [R10] Asia-Pacific luxury cocktail scene deep research (April 2026)
// Research agent: 772.7s (12.9 min); W50B / Asia’s 50 Best Bars / DI
// ---------------------------------------------------------------------------
export const apacVenueIntel = [
  {
    venue: 'Manhattan Bar (Conrad Singapore Orchard)',
    location: 'Singapore',
    tier: 'Asia premier',
    note: 'In-house rickhouse; barrel-aged Negroni and Manhattan. 220+ American whiskies. Solera-aged cocktail programme unique in Asia.',
    avgPricePerServe: 'SGD 25–27 (~$18–$20)',
    dominantFlavours: ['spirit-forward', 'oak', 'smoke'],
    dominantBrands: ['Michter’s Rye', 'Del Maguey Mezcal', 'Perrier-Jouët'],
    source: '[R10]'
  },
  {
    venue: 'Native (Amoy Street)',
    location: 'Singapore',
    tier: 'Hyper-local specialist',
    note: 'Vijay Mudaliar: avoids Western spirits. Forages regional distillates. Antz cocktail (Chalong Bay Rum + weaver ants + liquid nitrogen) is globally cited. Ketel One Sustainable Bar Award.',
    avgPricePerServe: 'SGD 23 (~$17)',
    dominantFlavours: ['Southeast Asian terroir', 'umami', 'botanical'],
    source: '[R10]'
  },
  {
    venue: 'Jigger & Pony (Amara Hotel)',
    location: 'Singapore',
    tier: 'Best Bar Singapore (multi-year)',
    note: '"Honest cocktails" ethos. Maker’s Mark, Roku Gin, Bombay Sapphire partnerships. Espresso Martini riffs and French 75 elevated versions.',
    avgPricePerServe: 'SGD 25 (~$18)',
    dominantFlavours: ['approachable', 'citrus', 'balanced'],
    source: '[R10]'
  },
  {
    venue: 'Virtú (Four Seasons Tokyo at Otemachi)',
    location: 'Tokyo',
    tier: 'Michter’s Art of Hospitality Award',
    note: 'French-Japanese fusion. Seven Virtues cocktail programme. Home-made tonics, small-batch blends. Rare cognacs + vintage French champagne.',
    avgPricePerServe: '¥2,500–¥5,000+ (~$17–$33)',
    dominantFlavours: ['shiso', 'yuzu', 'floral', 'citrus'],
    dominantBrands: ['Don Julio', 'Michter’s Whiskey'],
    source: '[R10]'
  },
  {
    venue: 'Bar Benfiddich (Shinjuku)',
    location: 'Tokyo',
    tier: 'Apothecary-style cult bar',
    note: 'Hiroyasu Kayama. 15 seats. No menu. Farm-to-glass: ingredients from family farm in Saitama. Precision ice-carving, seasonal Japanese botanicals.',
    avgPricePerServe: '¥3,000–¥7,000+ (est.)',
    dominantFlavours: ['Japanese botanical', 'sake', 'ferment'],
    source: '[R10]'
  }
]

export const apacFlavourProfiles = [
  { ingredient: 'Yuzu', region: 'Japan / Korea', use: 'Replaces lime/lemon in high-end sours and gimlets. Aromatic, floral citrus with depth. W50B bars use extensively.' },
  { ingredient: 'Shiso', region: 'Japan', use: 'Herbaceous, mint-adjacent leaf. Gin cocktail base at Virtú Tokyo. Also used as garnish.' },
  { ingredient: 'Pandan', region: 'Southeast Asia', use: 'Sweet, coconut-adjacent, green vanilla note. Aman Nai Lert Bangkok cocktail programme. [R7]' },
  { ingredient: 'Sake / Shochu', region: 'Japan', use: 'Base or modifier. SG Shochu (Singapore); The Hakka cocktail (Hakkasan Dubai) uses sake + lychee.' },
  { ingredient: 'Hallabong orange', region: 'Korea / Jeju', use: 'Premium Korean citrus used at Charles H Seoul for seasonal menus.' },
  { ingredient: 'Tonka / Asian spice', region: 'APAC', use: 'Cardamom crossover. Complex spice profiles in Singapore and Hong Kong luxury bars.' }
]

// ---------------------------------------------------------------------------
// MODULE 10: WEDDING INTELLIGENCE
// Source: [R11] Luxury wedding cocktail intelligence (Vogue Weddings, Harper’s Bazaar, The Knot)
// Research agent: 1050.7s (17.5 min)
// ---------------------------------------------------------------------------
export const weddingIntel = {
  budgetTiers: [
    {
      tier: 'Standard / Limited',
      costPerGuestGBP: '£15–£35',
      costPerGuestUSD: '$20–$45',
      inclusions: 'Beer, house wine, basic spirits. Simple mixers. Standard glassware.',
      source: '[R11]'
    },
    {
      tier: 'Premium / Enhanced',
      costPerGuestGBP: '£40–£70',
      costPerGuestUSD: '$50–$90',
      inclusions: 'Premium spirits (Grey Goose, Casamigos, Maker’s Mark). 1–2 signature cocktails with custom names. Fresh juices.',
      source: '[R11]'
    },
    {
      tier: 'Luxury / Artisanal',
      costPerGuestGBP: '£75–£100',
      costPerGuestUSD: '$95–$130',
      inclusions: 'Top-shelf and rare spirits. Trained mixologists. Complex signature cocktails. Premium glassware, custom ice. Zero-proof integrations.',
      source: '[R11]'
    },
    {
      tier: 'Ultra-Luxury / Bespoke',
      costPerGuestGBP: '£100+',
      costPerGuestUSD: '$130+',
      inclusions: 'Exclusive rare vintages. Interactive molecular mixology stations. Elaborate presentations (cocktail towers, dry ice). Dedicated sommelier. Multi-day event coverage.',
      source: '[R11]'
    }
  ],
  budgetShareOfTotal: '10–20% of total wedding budget allocated to bar and beverage services (industry benchmark). [R11]',
  consumptionMetric: '2 drinks in first hour, 1 drink/hour thereafter. Standard 5hr event = ~6 drinks per guest. [R11]',
  hiddenCosts: 'Service fees 20–22% + local taxes. Bartender gratuities 15–20%. Venue minimums can inflate per-guest spend significantly. [R11]',
  zeroproofDemand: '24–25% of adult wedding guests opt for alcohol-free drinks. Rises to 28% for 18–34 cohort. Search for "dry weddings" +85% YoY. [R11]',
  venueHighlights: [
    { name: 'Aman Venice', location: 'Venice, Italy', note: 'Bespoke cocktails for couple’s narrative; rare Italian amari; prosecco from boutique Veneto vineyards. [R11]' },
    { name: 'Chateau Challain', location: 'Loire Valley, France', note: 'French 75 classics; Champagne towers resurgent; herbs from estate gardens. [R11]' },
    { name: 'Nizuc Resort & Spa', location: 'Cancun, Mexico', note: '100% tailored programming. Premium tequila + mezcal focus. Mezcal Margarita with dried orange and smoky sea salt. [R11]' },
    { name: 'Grand Wailea', location: 'Maui, Hawaii', note: 'Polynesian mixology beyond standard Mai Tai; locally distilled organic rums; macadamia nut orgeat. [R11]' },
    { name: 'The Apurva Kempinski', location: 'Bali, Indonesia', note: 'Indonesian spices, rare teas, mangosteen and rambutan in cocktails. [R11]' }
  ],
  chronologicalProgramme: [
    { phase: 'Welcome drink / arrival', examples: 'Champagne or French Bloom (NA), prosecco-based spritz, bespoke gin highball. Single signature serve for operational simplicity + visual impact.' },
    { phase: 'Cocktail hour', examples: 'Mobile bar or two-station split: alcoholic and zero-proof parallel. Signature cocktail named for couple. Canape pairings.' },
    { phase: 'Reception open bar', examples: 'Full programme -- spirit-forward classics + lighter options. 1 bartender per 50 guests recommended.' },
    { phase: 'Late-night bar', examples: 'Espresso Martini Tower as centrepiece activation. Coffee cocktail programme.' }
  ],
  espressoMartiniTower: 'Replacing the traditional Champagne tower at high-end weddings. Stacked coupes, batched pour cascade. "A bold, sophisticated centrepiece for late-night receptions." (Harper’s Bazaar 2025). [R11]',
  trendsVogue2025: [
    'Zero-Proof Toast: French Bloom (LVMH-backed, $100–$119/bottle) replacing Champagne for inclusive toasts',
    'Custom stir sticks, branded ice cubes, monogrammed edible sugar sheets on foam cocktails',
    'Mobile bars: vintage horse trailers, Cantina Caravans -- interactive focal point not corner bar',
    'Garnishes: natural edible fresh flowers and green herbs reflecting venue landscape',
    '457% increase in non-alcoholic beverage sales reported at luxury Cedar Lakes Estate in one year'
  ],
  source: '[R11]'
}

// ---------------------------------------------------------------------------
// MODULE 11: SPIRIT BRAND PARTNERSHIP ECONOMICS
// Source: [R12] Spirit brand sponsorship economics deep research (April 2026)
// Research agent: 3292.5s (54.9 min)
// ---------------------------------------------------------------------------
export const brandPartnershipEconomics = {
  marketContext: 'Prestige white spirits category predicted to grow 79% over next 5 years. Global premium spirits market projected to reach $315.7B by 2029. [R12]',
  sponsorshipTiers: [
    {
      tier: 'Local / Regional (500–2,000 attendees)',
      feeRange: '$5,000–$25,000',
      drivers: 'Audience fit and first-party data access',
      source: '[R12]'
    },
    {
      tier: 'Industry Conferences / Galas (2,000–5,000 attendees)',
      feeRange: '$15,000–$75,000',
      drivers: 'Comprehensive packages: speaking role, data capture, primary pouring rights',
      source: '[R12]'
    },
    {
      tier: 'Premium / Luxury Events (curated UHNW)',
      feeRange: '$25,000–$250,000+',
      drivers: 'Strict exclusivity, VIP hospitality access, audience net worth (avg. $3.6M+ household at Polo Hamptons benchmark).',
      source: '[R12]'
    }
  ],
  benchmarkPoloHamptons: {
    description: 'Polo Hamptons provides a definitive UHNW luxury event benchmark. Audience average household net worth $3.6M+.',
    tiers: [
      { name: 'Platinum Plus', singleDate: '$85,000', dualDate: '$150,000', deliverables: '20x20 custom luxury tent, 18 VIP invites per event, category exclusivity, 6 two-page magazine spreads' },
      { name: 'Platinum', singleDate: '$35,000', dualDate: '$50,000', deliverables: '15x15 tent, 12 VIP invites, 5 two-page magazine spreads' },
      { name: 'Gold', singleDate: '$14,000', dualDate: '$22,000', deliverables: '9x9 tent, 6 VIP invites, 3 full-page magazine ads' },
      { name: 'Corporate Cabana', singleDate: '$6,500', dualDate: '$12,000', deliverables: 'Private cabana, 10 VIP guests, 1 full-page magazine ad' }
    ],
    source: '[R12]'
  },
  compedPoursModel: {
    description: 'Brand provides predetermined liquid volume at no cost in exchange for exclusive category pouring rights.',
    agencyBenefit: 'Reduces wholesale purchase cost; improves event P&L margin.',
    brandMotivation: 'Trial use and liquid-to-lips conversion at HNW occasions. Brand-switching intent among affluent demographics.',
    source: '[R12]'
  },
  sponsoredBarPricing: {
    formula: '40–60% of event costs + projected lead value + audience premium',
    example: 'If luxury event costs $100k to produce, primary beverage sponsor asked for $40k–$60k for full aesthetic bar control.',
    exclusivity: 'Category exclusivity fiercely protected -- no competitor brand visible, poured or mentioned.',
    source: '[R12]'
  },
  doubleMarginModel: 'Event agencies increasingly use "double-margin" model: charge clients premium experience fees while securing comped or subsidised liquid from spirit brands. [R12]',
  brandFlexibility: {
    mostFlexible: 'White spirits (vodka) -- volume-based generosity, RTD crossover opportunities.',
    mostPremium: 'Ultra-premium agave (Clase Azul, Don Julio 1942) and single-malt Scotch (Macallan Fine & Rare) -- demand higher fees and cultural exclusivity.',
    roiShift: 'Moving from logo exposure to first-party data collection, experiential media equivalent value (MEV), and long-term brand equity. [R12]'
  },
  source: '[R12]'
}

// ---------------------------------------------------------------------------
// MODULE 12: COMPETITOR AGENCY LANDSCAPE
// Source: [R13] Competitor luxury events agency intelligence (April 2026)
// Research agent: 3115.1s (51.9 min)
// ---------------------------------------------------------------------------
export const competitorLandscape = {
  overview: 'Market bifurcated between ultra-discreet heritage agencies (Fait Accompli, The Admirable Crichton) and commercialised global conglomerates (Rhubarb Hospitality Collection). Technological vacuum across sector -- no incumbent integrates predictive analytics.',
  sustainabilityNote: 'Zero-waste, plastic-free, food-redistribution partnerships are now baseline expectation for tier-1 agencies.',
  agencies: [
    {
      name: 'Quintessentially',
      positioning: 'Global lifestyle management + UHNW concierge. 25 years operating.',
      beverage: 'Quintessentially Cocktails sub-entity: pop-up mobile bars, signature classics, bespoke menus.',
      techAngle: 'Beginning to explore AI but sector remains ripe for disruption.',
      source: '[R13]'
    },
    {
      name: 'Banana Split',
      positioning: 'Founded 1976. 50-year heritage. Premier London luxury events. £1.5M in-house AV inventory.',
      beverage: 'High-impact theatrical corporate experiences.',
      source: '[R13]'
    },
    {
      name: 'Fait Accompli',
      positioning: 'Founded 1987. Most discreet globally. British Royal Family, Dior, YSL clients. No Instagram. 80% NDA-covered.',
      beverage: 'Classified. Black-book networking model.',
      source: '[R13]'
    },
    {
      name: 'The Admirable Crichton',
      positioning: 'Founded 1984. Royal Warrant. Titan of London luxury catering.',
      beverage: 'Theatrical flair + industry-leading sustainability (zero-waste, plastic-free front-of-house).',
      source: '[R13]'
    },
    {
      name: 'Rhubarb Hospitality Collection',
      positioning: 'Founded 1996. Acquired by Oak View Group 2023. 2,500+ staff, 5M people/year.',
      beverage: 'Venues: Sky Garden, Royal Albert Hall, Hudson Yards NYC, The Brewery London.',
      source: '[R13]'
    }
  ],
  chorusDifferentiation: 'Chorus opportunity: no incumbent agency integrates predictive analytics for beverage consumption, real-time ESG tracking, or hyper-personalised guest profiling. Data-driven architecture can outpace heritage black-book models. [R13]',
  pricingBenchmarks: {
    agencyFee: '15–20% of total event spend (standard across tier-1)',
    baselineCocktailService: 'Approximately £50 per guest for limited premium service',
    source: '[R13]'
  },
  source: '[R13]'
}

// ---------------------------------------------------------------------------
// MODULE 13: SPIRIT CATEGORY SNAPSHOTS
// Source: [R14–R18] Spirit category deep research (April 2026, IWSR-cited)
// Scope: Category-level data only. Not attributed to Chorus-specific performance.
// ---------------------------------------------------------------------------
export const spiritCategorySnapshots = [
  {
    category: 'Whisky (Global)',
    marketSize2025: '$69.8B–$77.9B (global whisky market)',
    cagr: '5.1–7.0% through 2030s',
    keyMetrics: [
      'Scotch exports: £5.4B value (2024), 3.7% value decline vs 3.9% volume growth (SWA)',
      'India overtook France as largest Scotch market by volume: 192M bottles (2024), +14.6% YoY (SWA)',
      'USA: largest Scotch market by value at £971M (2024)',
      'Blended Scotch +4.4% value 2024 (£3.2B / 59.4% of exports). Single malt -17.2% value.',
      'American whiskey exports: $1.3B in 2024 (54% of all US spirits exports). EU retaliatory tariffs cut 35% in 2025.',
      'Bourbon: 69–75% of American whiskey volume. 28.4M 9L cases US domestic 2024.',
      'Women now 36% of global whisky drinkers (IWSR 2024).',
      'Rare whisky auction values fell 18% late 2024 -- ultra-premium correction underway.'
    ],
    luxurySignal: 'Macallan Valerio Adami 1926 sold $2.7M at Sotheby’s 2023 ($107k/oz theoretical). Yamazaki 55: $60k MSRP, up to $795k at auction.',
    chorusRelevance: 'Penicillin (Scotch), Old Fashioned / Manhattan (bourbon/rye), Whiskey Sour -- all drawing on category resilience. Smoked Old Fashioned riff accelerating at luxury venues.',
    source: '[R14]'
  },
  {
    category: 'Agave (Tequila + Mezcal)',
    marketSize2025: '$25.7B (tequila global market)',
    cagr: '9.1% to 2033 (tequila)',
    keyMetrics: [
      'Don Julio: +28.2% volume growth to 4.4M cases. Jose Cuervo: -6.4% to 8.9M cases.',
      'Casamigos: -20.7% -- celebrity brand saturation impact (CRT data cited in spirits_02_agave.md)',
      'Cristalino: highest volume growth of all tequila segments (IWSR)',
      'Tequila US market now majority-female at 52% (CRT 2024)',
      '25–34 age bracket: 24.2% of US tequila consumption share',
      'Blue agave prices crashed from 32 MXP/kg (2022) to 5 MXP/kg (early 2024) -- overplanting',
      'Premium-plus agave: 68.2% of total tequila revenue'
    ],
    luxurySignal: 'Clase Azul Dia de Muertos "Recuerdos" $1,900/bottle (10,000 decanters). Don Julio 1942 Chaparritos at Oscars + F1. Caviar + tequila pairing the defining luxury moment of 2024–25.',
    chorusRelevance: 'Margarita (#3 DI), Paloma (#9 DI), Picante de la Casa (#9 Difford’s). Agave dominates luxury event activations. The Chorus Caviar Margarita opportunity.',
    source: '[R15]'
  },
  {
    category: 'Gin',
    marketSize2025: '$26.02B (global gin market)',
    cagr: '4.72% to 2031 (global); UK and Spain declining, India / Japan / Texas growing',
    keyMetrics: [
      'Global gin volumes: 107M 9L cases (2024), +2% growth (decelerating from +4% in 2023)',
      'UK craft gin closures accelerating: excise +10.1% (2023) and +3.65% (2024/25)',
      'Gin demographics: UK/Oceania 55% female; US younger male-skewed',
      'US gin drinkers earn ~$20k above national average HHI; Canadian gin drinkers $48k above',
      'Under-34 cohort: 42% of US gin drinkers',
      'Gin is most popular spirits category in World’s Best Bars (DI Brand Report 2025)'
    ],
    luxurySignal: 'Negroni, Dry Martini, Gin Basil Smash, The Last Word, French 75 -- all gin-led. Connaught Bar Gin distilled in-house (£95/bottle). Monkey 47 dominates ultra-premium gin occasions.',
    chorusRelevance: 'Gin underpins top-3 DI cocktails (Negroni #1, Dry Martini #7). Spritz fatigue creates opportunity: gin highball programme as Aperol replacement.',
    source: '[R16]'
  },
  {
    category: 'Rum',
    marketSize2025: '$19.84B (global rum market)',
    cagr: '5.2% value growth 2024–2028 (IWSR)',
    keyMetrics: [
      'Super-premium rum: +5.5% value globally vs prior year (2024)',
      'Premium-plus rum US forecast: 7% volume CAGR, 8% value CAGR (2021–2026)',
      'Dark rum in UK on-trade: +5% value (driving premiumisation)',
      'Spiced/flavoured rum: 56%+ of US sales; $7B market (2024)',
      'Rum market North America: 38.3% of global share',
      'Global rum projected: $27.93B by 2033'
    ],
    luxurySignal: 'Diplomatico, Zacapa, Plantation -- aged premium sipping rums competing with Scotch/cognac. Daiquiri (#5 DI) and Mai Tai driving premium rum on-trade.',
    chorusRelevance: 'Daiquiri (#5 DI), Mojito (yacht/resort staple), Mai Tai (tiki theatre). Aged rum "figuring out its premium journey" -- opportunity in narrative for luxury events.',
    source: '[R17]'
  },
  {
    category: 'Vodka',
    marketSize2025: 'Volume declining in traditional segments; RTD spirits-based growing +20% (US 2025, IWSR)',
    cagr: 'Overall volume pressure; value maintained via premiumisation',
    keyMetrics: [
      'Vodka captured 21.5% of global RTD bottled cocktail market (2025, IWSR)',
      'Average US on-trade cocktail price: $13.50 (CGA 2024); cocktails 35% of spirits value on-trade',
      'Grey Goose "The Devil’s Roast" espresso martini at NYFW 2026 with Heidi Klum',
      'Belvedere "Hot Child in the City" campaign at Raoul’s Soho, NYFW 2026',
      'Espresso Martini: +116% value velocity US on-trade (CGA Q3 2024)'
    ],
    luxurySignal: 'Grey Goose at Oscars, Met Gala, Fashion Weeks. Belvedere cultural storytelling model. Ketel One Sustainable Bar Award winner.',
    chorusRelevance: 'Espresso Martini (#4 DI) and Porn Star Martini (#1 Difford’s) are both vodka-based. Espresso Martini Tower at Chorus events = vodka + coffee liqueur activation.',
    source: '[R17]'
  },
  {
    category: 'Cognac',
    marketSize2025: '$22B+ global excess inventory; correction from pandemic boom',
    cagr: 'Negative near-term: China on-trade -4% (2024), US post-pandemic slump',
    keyMetrics: [
      'Hennessy: powers Annabel’s "The Judith" signature cocktail; Michelin pairing dinners',
      'Louis XIII: "THE DROP" 10ml portable vials. $2,300/set (LaQuan Smith collab at Super Bowl + F1 Las Vegas)',
      'Louis XIII at Ritz London Rivoli Bar: £350/50ml pour',
      'Pappy Van Winkle 23yo: £500/50ml at Ritz London',
      'Vieux Carré (#3 Difford’s): rye + cognac crossover cocktail gaining prestige bar traction'
    ],
    luxurySignal: 'Louis XIII is the ultra-prestige pour at F1, fashion events, and mega-hospitality. Hennessy Paradis at Annabel’s and Michelin pairing dinners.',
    chorusRelevance: 'Vieux Carré (#3 Difford’s) represents cognac in cocktail renaissance. Louis XIII as optional ultra-prestige add-on for Chorus VIP tables.',
    source: '[R17]'
  },
  {
    category: 'Aperitifs, Liqueurs & Vermouth',
    marketSize2025: 'Global aperitifs: $11.2B (2024) → $17.1B by 2033 (4.7% CAGR). Global liqueurs: $119.9B–$135.35B.',
    cagr: 'Aperitifs: 4.7–5.8% CAGR. Liqueurs: 1.1–3.3% CAGR.',
    keyMetrics: [
      'Aperitif market: 38.4% wine-based (vermouth), 29.7% spirit-based (Campari/Aperol), 21.4% bitter aperitifs',
      'Vermouth market: $20.1B (2024) → $29.65B by 2033 (4.4% CAGR -- Vermouth Renaissance well underway)',
      'Campari Group: Aperol 26% of group revenue; House of Aperitifs 43–46% of group sales',
      'Cointreau: essential in Margarita, Cosmopolitan -- "resilient growth driver" (Remy Cointreau annual report)',
      'Euromonitor: global liqueurs to reach 135.6M 9L cases (2026), +7.5% value to $61.3B',
      'Amari and aperitif bitters: outpacing traditional spirits in menu integration growth (DI)',
      'Non-alcoholic aperitifs (Others segment): 8.2% CAGR -- fastest niche growth'
    ],
    luxurySignal: 'Campari powers Negroni (#1 DI). Aperol Spritz (#8 DI but #92 Difford’s -- market divergence signal). Premium vermouth programs (Carpano Antica, Cocchi Torino) treated like premium spirit at top bars.',
    chorusRelevance: 'Spritz fatigue opens alternatives: Cynar Spritz, Hugo Spritz (elderflower), Campari Spritz. Vermouth renaissance supports Dry Martini (#7 DI) demand.',
    source: '[R18]'
  }
]

export const profileMeta = {
  clientName: 'Chorus',
  profileTitle: 'Cocktail Intelligence Profile',
  subtitle: 'Global ranking, flavour trends, luxury event intel — tailored for luxury events programming',
  lastUpdated: 'April 2026',
  dataFreshness: 'April 2026',
  sourcedFrom: 'DI World’s 50 Best Bars Brand Report, Difford’s Guide analytics, IWSR 2024–2026, Bacardi Cocktail Trends Report, World’s 50 Best Bars menu analysis, Tales of the Cocktail 2024–2025, Class Magazine, The Spirits Business, Imbibe',
  contactEmail: 'callingjhphoto@gmail.com'
}
