// Market Entry Wizard — comprehensive playbook data for 10 key markets x 11 categories

export const TARGET_MARKETS_WIZARD = [
  { id: 'uk', name: 'United Kingdom', flag: '🇬🇧', region: 'Europe' },
  { id: 'us', name: 'United States', flag: '🇺🇸', region: 'North America' },
  { id: 'spain', name: 'Spain', flag: '🇪🇸', region: 'Europe' },
  { id: 'france', name: 'France', flag: '🇫🇷', region: 'Europe' },
  { id: 'germany', name: 'Germany', flag: '🇩🇪', region: 'Europe' },
  { id: 'japan', name: 'Japan', flag: '🇯🇵', region: 'Asia-Pacific' },
  { id: 'australia', name: 'Australia', flag: '🇦🇺', region: 'Asia-Pacific' },
  { id: 'uae', name: 'United Arab Emirates', flag: '🇦🇪', region: 'Middle East' },
  { id: 'india', name: 'India', flag: '🇮🇳', region: 'Asia-Pacific' },
  { id: 'brazil', name: 'Brazil', flag: '🇧🇷', region: 'Latin America' },
]

export const SPIRIT_CATEGORIES_WIZARD = [
  { id: 'tequila', label: 'Tequila & Mezcal' },
  { id: 'vodka', label: 'Vodka' },
  { id: 'gin', label: 'Gin' },
  { id: 'whisky', label: 'Whisky' },
  { id: 'rum', label: 'Rum' },
  { id: 'cognac', label: 'Cognac & Brandy' },
  { id: 'champagne', label: 'Champagne & Sparkling' },
  { id: 'wine', label: 'Wine' },
  { id: 'beer', label: 'Beer & Craft' },
  { id: 'nolo', label: 'No/Lo Alcohol' },
  { id: 'rtd', label: 'RTD' },
]

// Regulations by market
export const MARKET_REGULATIONS = {
  uk: {
    importLicence: 'AWRS registration required (Alcohol Wholesaler Registration Scheme). HMRC approval typically 45 days.',
    labelling: 'UK food labelling regulations apply. ABV must be displayed. Allergen info required. "UK Responsible Person" must be named on label from 2025.',
    taxStamps: 'Not required for spirits. Duty paid at point of release from bond.',
    dutyRates: { spirits: '£28.74/litre of pure alcohol', wine: '£2.67/bottle (still, 11.5-14.5%)', beer: '£19.08/hectolitre per % ABV' },
    ageRestriction: '18+. Challenge 25 policy widely adopted.',
    advertisingRules: 'ASA/CAP Code. No appeal to under-18s. No health claims. No encouragement of excess. Portman Group voluntary code.',
    timeline: '3–6 months from application to first sale',
    estimatedCost: '£15,000–£40,000 setup (excluding stock)',
  },
  us: {
    importLicence: 'TTB Federal Basic Permit + COLA (Certificate of Label Approval). State-by-state distribution licences required.',
    labelling: 'TTB-specific requirements. Health warning mandatory. Net contents, ABV, country of origin. No health benefit claims.',
    taxStamps: 'Federal strip stamps on all distilled spirits entering US market.',
    dutyRates: { spirits: '$13.50/proof gallon (federal) + state taxes vary widely', wine: '$1.07–$3.40/gallon depending on ABV', beer: '$3.50–$16.00/barrel' },
    ageRestriction: '21+. Strict enforcement varies by state.',
    advertisingRules: 'TTB regulates. No TV/radio advertising of spirits (voluntary). FTC oversight. State-specific rules apply.',
    timeline: '6–12 months (TTB COLA alone can take 4–6 months)',
    estimatedCost: '$50,000–$150,000 (three-tier system adds cost)',
  },
  spain: {
    importLicence: 'EU single market access. Excise registration with Agencia Tributaria. No separate import licence for EU-origin goods.',
    labelling: 'EU Regulation 1169/2011. Spanish language mandatory. Ingredient/calorie labelling from June 2026. Denominación de Origen labels regulated.',
    taxStamps: 'Not required. Tax paid via excise registration.',
    dutyRates: { spirits: '€958.94/hectolitre pure alcohol', wine: '€0 (wine exempt from excise in Spain)', beer: '€2.75–€13.56/hectolitre depending on gravity' },
    ageRestriction: '18+ nationally. Some regions have local variations.',
    advertisingRules: 'Ley 34/1988. No advertising near schools. TV restrictions 6am–8:30pm. Regional autonomy on enforcement.',
    timeline: '2–4 months for EU-origin; 4–8 months for non-EU',
    estimatedCost: '€10,000–€30,000 setup',
  },
  france: {
    importLicence: 'EU market. Customs registration. Déclaration Préalable de Profession required for wholesale.',
    labelling: 'EU Regulation 1169/2011. French language mandatory. Loi Évin restricts health messaging. "Femme enceinte" pregnancy pictogram required.',
    taxStamps: 'Capsule Représentative de Droit (CRD) — fiscal stamp on all spirits/wine bottles.',
    dutyRates: { spirits: '€1,806.28/hectolitre pure alcohol', wine: '€3.91/hectolitre (still)', beer: '€3.84–€7.68/hectolitre' },
    ageRestriction: '18+. Strict enforcement. No sale to intoxicated persons.',
    advertisingRules: 'Loi Évin (1991) — strictest in Europe. No TV/cinema advertising. Print ads must include health warning. No sponsorship of sports events. Social media in grey area.',
    timeline: '3–6 months',
    estimatedCost: '€15,000–€45,000 (CRD adds €0.02–0.05/bottle)',
  },
  germany: {
    importLicence: 'EU market. EORI number required. Zollamt (customs office) registration.',
    labelling: 'EU regs + German additions. Pfand (deposit) marking for bottles. Nutrition info from 2026. German language required.',
    taxStamps: 'Not required. Electronic excise system (EMCS).',
    dutyRates: { spirits: '€1,303/hectolitre pure alcohol', wine: '€0 (exempt)', beer: '€0.787/hectolitre per degree Plato' },
    ageRestriction: '16+ for beer/wine, 18+ for spirits. Strictly enforced.',
    advertisingRules: 'Jugendschutzgesetz. No advertising targeting minors. Self-regulation through Deutscher Werberat. TV watershed rules apply.',
    timeline: '2–4 months for EU-origin',
    estimatedCost: '€12,000–€35,000',
  },
  japan: {
    importLicence: 'Liquor Tax Law licence from National Tax Agency. Importer must be Japanese entity or have local partner.',
    labelling: 'Japanese language mandatory. Ingredients list (JAS standards). Recycling marks (PET, glass, aluminum). Country of origin.',
    taxStamps: 'Not required. Tax collected at wholesale level.',
    dutyRates: { spirits: '¥37,800/kilolitre for whisky/brandy; ¥20,000/kl for shochu', wine: '¥80,000/kilolitre', beer: '¥220,000/kilolitre' },
    ageRestriction: '20+. Age verification at point of sale.',
    advertisingRules: 'Self-regulated by Brewers Association. No targeting under-20s. TV ads after 18:00 only. Health warnings voluntary but increasingly expected.',
    timeline: '4–8 months (NTA licence can take 2–4 months)',
    estimatedCost: '¥3,000,000–¥10,000,000 (£20,000–£65,000)',
  },
  australia: {
    importLicence: 'Import permit from ABARES. Customs broker required. State liquor licences for distribution.',
    labelling: 'FSANZ standards. Mandatory pregnancy warning label (from 2024). Standard drinks labelling. Allergens.',
    taxStamps: 'Not required. WET (Wine Equalisation Tax) or excise applies.',
    dutyRates: { spirits: 'A$94.41/litre of pure alcohol', wine: '29% WET (Wine Equalisation Tax)', beer: 'A$55.73/litre of pure alcohol' },
    ageRestriction: '18+. RSA (Responsible Service of Alcohol) certification required for servers.',
    advertisingRules: 'ABAC (Alcohol Beverages Advertising Code). No appeal to minors. No depiction of excess consumption. Digital/social media included.',
    timeline: '3–6 months',
    estimatedCost: 'A$30,000–A$80,000',
  },
  uae: {
    importLicence: 'Trade licence from DED. Alcohol trading licence from Dubai Municipality (or relevant emirate). Free zone vs mainland decision critical.',
    labelling: 'Arabic + English mandatory. Halal-adjacent — no Halal certification possible but packaging must not offend. Country of origin.',
    taxStamps: 'Required. 50% excise tax on alcohol (2018). 5% VAT.',
    dutyRates: { spirits: '50% excise + 5% customs duty', wine: '50% excise + 5% customs', beer: '50% excise + 5% customs' },
    ageRestriction: '21+. Non-Muslim residents only (relaxed from 2023). Tourist sales via licensed venues.',
    advertisingRules: 'No public advertising of alcohol permitted. No social media promotion. In-venue marketing only. No visible alcohol branding in public spaces.',
    timeline: '4–8 months (licence processing)',
    estimatedCost: 'AED 150,000–AED 500,000 (£30,000–£100,000)',
  },
  india: {
    importLicence: 'State-by-state excise licence required. FSSAI registration. BIS certification for some categories. No national alcohol licence.',
    labelling: 'FSSAI standards. English + Hindi (or local language). MRP (Maximum Retail Price) must be printed on label. BIS mark where applicable.',
    taxStamps: 'Required in most states. Excise stickers/holograms vary by state.',
    dutyRates: { spirits: '150% customs duty + state excise (varies 20–200%)', wine: '150% customs + state excise', beer: '100% customs + state excise' },
    ageRestriction: '21–25+ (varies by state: Gujarat is dry, Kerala 23+, Delhi 25+).',
    advertisingRules: 'No direct advertising of alcohol permitted. Surrogate advertising (brand extensions) is common workaround. ASCI guidelines. Cable TV Network Rules restrict.',
    timeline: '6–18 months (state-by-state complexity)',
    estimatedCost: '₹50,00,000–₹2,00,00,000 (£50,000–£200,000) depending on states',
  },
  brazil: {
    importLicence: 'ANVISA registration. MAPA import licence. Cadastro de Importador. Importer of Record required (Brazilian entity).',
    labelling: 'Portuguese mandatory. ANVISA-compliant. Nutritional information. Pregnancy warning. Recycling symbols.',
    taxStamps: 'Selo fiscal (fiscal seal) required on all imported spirits.',
    dutyRates: { spirits: '20% import duty + IPI (up to 30%) + ICMS (25–30% varies by state) + PIS/COFINS (9.25%)', wine: '27% import duty + state taxes', beer: '15% import + state taxes' },
    ageRestriction: '18+. Estatuto da Criança e do Adolescente enforcement.',
    advertisingRules: 'CONAR self-regulation. No TV advertising of spirits (beer only). No association with sports success. Social media guidelines evolving.',
    timeline: '4–8 months (ANVISA can take 2–4 months alone)',
    estimatedCost: 'R$150,000–R$500,000 (£25,000–£80,000)',
  },
}

// Key distributors by market
export const KEY_DISTRIBUTORS = {
  uk: [
    { name: 'Bibendum', categories: ['wine', 'champagne', 'spirits'], terms: 'Net 60–90 days. Listing fee £2,000–£5,000.', minOrder: '50 cases', keyBrands: 'Chapel Down, Gusbourne, Nyetimber', contact: 'info@bibendum-wine.co.uk', notes: 'PLB subsidiary. Strong on-trade presence.' },
    { name: 'Mangrove Global', categories: ['tequila', 'gin', 'rum', 'vodka'], terms: 'Net 30–60 days. Exclusivity expected.', minOrder: '100 cases', keyBrands: 'Bumbu, Teeling, Brockmans', contact: 'hello@mangroveglobal.com', notes: 'Award-winning spirits distributor. Strong brand-building focus.' },
    { name: 'Enotria&Coe', categories: ['wine', 'champagne', 'spirits'], terms: 'Net 60 days. Annual marketing contribution.', minOrder: '25 cases', keyBrands: 'Cloudy Bay, Perrier-Jouët, Havana Club', contact: 'info@enotriacoe.com', notes: 'C&C Group subsidiary. Largest independent UK distributor.' },
    { name: 'Ten Locks', categories: ['gin', 'rum', 'tequila', 'whisky'], terms: 'Net 45 days. Performance-based agreements.', minOrder: '75 cases', keyBrands: 'KAH Tequila, Discarded Spirits', contact: 'info@tenlocks.com', notes: 'Premium craft spirits focus. Strong bartender relationships.' },
    { name: 'Proof Drinks', categories: ['gin', 'vodka', 'rum', 'whisky', 'tequila'], terms: 'Net 30–60 days. Brand plan required.', minOrder: '50 cases', keyBrands: 'Four Pillars, Roku, Plantation', contact: 'hello@proofdrinks.com', notes: 'Part of Zamora Company. Growing portfolio.' },
  ],
  us: [
    { name: 'Southern Glazer’s', categories: ['all'], terms: 'Net 30 days. Franchise-state dependent.', minOrder: '500 cases', keyBrands: 'Bacardi, Brown-Forman, Beam Suntory', contact: 'Through broker network', notes: 'Largest US distributor. 44 states. Required for national reach.' },
    { name: 'Republic National Distributing Co (RNDC)', categories: ['all'], terms: 'Net 30 days. State-specific.', minOrder: '300 cases', keyBrands: 'Diageo, Pernod Ricard', contact: 'Through broker network', notes: '2nd largest. Strong in Southeast and West.' },
    { name: 'Breakthru Beverage', categories: ['all'], terms: 'Net 30 days. Portfolio review required.', minOrder: '200 cases', keyBrands: 'Remy Cointreau, Campari', contact: 'Through broker network', notes: '3rd largest. Growing rapidly through acquisitions.' },
    { name: 'Park Street', categories: ['spirits', 'wine'], terms: 'Back-office + distribution. Revenue share model.', minOrder: '100 cases', keyBrands: 'Various emerging brands', contact: 'info@parkstreet.com', notes: 'Ideal for new-to-market brands. Handles compliance, logistics.' },
    { name: 'LibDib', categories: ['spirits', 'wine'], terms: 'Direct-to-retailer platform. 15–18% commission.', minOrder: '1 case', keyBrands: 'Craft brands', contact: 'info@libdib.com', notes: 'Digital platform. Low barrier to entry. Currently in CA, NY, WI, CT, FL, CO.' },
  ],
  spain: [
    { name: 'Varma', categories: ['spirits', 'wine'], terms: 'Net 60 days. Regional exclusivity.', minOrder: '100 cases', keyBrands: 'Hendrick’s, Monkey 47, Glenfiddich', contact: 'info@varma.es', notes: 'Largest independent spirits distributor in Spain.' },
    { name: 'Maxxium España', categories: ['spirits'], terms: 'Net 45–60 days.', minOrder: '200 cases', keyBrands: 'Beam Suntory portfolio', contact: 'info@maxxium.es', notes: 'Part of Beam Suntory distribution arm.' },
    { name: 'Zamora Company', categories: ['spirits', 'wine'], terms: 'Net 60 days. Long-term partnerships.', minOrder: '150 cases', keyBrands: 'Lic. 43, Ramón Bilbao, Villa Massa', contact: 'info@zamoracompany.com', notes: 'Spanish-owned. Strong in on-trade and travel retail.' },
  ],
  france: [
    { name: 'La Maison du Whisky', categories: ['whisky', 'spirits'], terms: 'Net 60 days. Curated portfolio.', minOrder: '50 cases', keyBrands: 'Compass Box, Nikka, Kavalan', contact: 'info@lmdw.com', notes: 'Premium spirits specialist. Strong retail + on-trade.' },
    { name: 'Dugas', categories: ['spirits'], terms: 'Net 60 days. Brand-building focus.', minOrder: '100 cases', keyBrands: 'Various craft spirits', contact: 'contact@dugas.fr', notes: 'Family-owned. Strong cocktail bar relationships.' },
    { name: 'Marie Brizard Wine & Spirits', categories: ['spirits', 'wine'], terms: 'Net 45–90 days.', minOrder: '200 cases', keyBrands: 'Marie Brizard, Gautier Cognac', contact: 'info@mbws.com', notes: 'Listed company. National distribution network.' },
  ],
  germany: [
    { name: 'Borco', categories: ['spirits'], terms: 'Net 60 days. Market-entry support.', minOrder: '100 cases', keyBrands: 'Sierra Tequila, Fernet Branca, Linie Aquavit', contact: 'info@borco.com', notes: 'Hamburg-based. Strong national reach. Focus on spirits.' },
    { name: 'Schlumberger', categories: ['spirits', 'wine', 'champagne'], terms: 'Net 45–60 days.', minOrder: '150 cases', keyBrands: 'Various premium spirits', contact: 'info@schlumberger.de', notes: 'Part of Underberg group. Premium positioning.' },
    { name: 'Sierra Madre', categories: ['tequila', 'rum', 'gin'], terms: 'Net 60 days. Craft focus.', minOrder: '75 cases', keyBrands: 'Various artisanal spirits', contact: 'info@sierramadre.de', notes: 'Specialist in Central/South American spirits.' },
  ],
  japan: [
    { name: 'Suntory', categories: ['whisky', 'spirits', 'beer'], terms: 'JV partnership model.', minOrder: 'Negotiable', keyBrands: 'Own portfolio + select imports', contact: 'Through agent', notes: 'Market dominant. Partnership = instant credibility.' },
    { name: 'CT Spirits Japan', categories: ['spirits'], terms: 'Net 60 days. Japanese entity required.', minOrder: '100 cases', keyBrands: 'Various craft imports', contact: 'info@ctspirits.jp', notes: 'Growing importer. Focus on craft and artisanal.' },
    { name: 'Whisk-e Ltd', categories: ['whisky', 'spirits'], terms: 'Net 30–60 days.', minOrder: '50 cases', keyBrands: 'Compass Box, English Whisky Co', contact: 'info@whisk-e.co.jp', notes: 'Specialist whisky importer. Strong bar network.' },
  ],
  australia: [
    { name: 'Vanguard Luxury Brands', categories: ['spirits', 'champagne'], terms: 'Net 30 days. Annual marketing contribution.', minOrder: '100 cases', keyBrands: 'Perrier-Jouët, Ardbeg, Glenmorangie', contact: 'info@vlb.com.au', notes: 'Premium and luxury focus. National reach.' },
    { name: 'Think Spirits', categories: ['spirits'], terms: 'Net 30 days. Brand plan required.', minOrder: '75 cases', keyBrands: 'Monkey Shoulder, Johnnie Walker variants', contact: 'info@thinkspirits.com.au', notes: 'Strong on-trade relationships. Growing portfolio.' },
    { name: 'Spirits Platform', categories: ['spirits'], terms: 'Net 30 days. Distribution + brand building.', minOrder: '100 cases', keyBrands: 'Jagermeister, Flor de Caña, Lillet', contact: 'info@spiritsplatform.com.au', notes: 'Full-service distributor. Marketing support included.' },
  ],
  uae: [
    { name: 'MMI (Maritime & Mercantile International)', categories: ['all'], terms: 'Net 60–90 days. Exclusivity expected.', minOrder: '200 cases', keyBrands: 'Diageo portfolio, Treasury Wine Estates', contact: 'Through broker', notes: 'Largest alcohol distributor in Middle East. Al Habtoor group.' },
    { name: 'African + Eastern', categories: ['all'], terms: 'Net 60 days. Long-term agreements.', minOrder: '150 cases', keyBrands: 'Various premium brands', contact: 'info@africaneastern.com', notes: '2nd largest in region. Strong hotel/resort channel.' },
    { name: 'Ghantoot Group', categories: ['spirits', 'wine'], terms: 'Net 45–60 days.', minOrder: '100 cases', keyBrands: 'Growing craft portfolio', contact: 'info@ghantootgroup.ae', notes: 'Emerging distributor. More flexible terms for new brands.' },
  ],
  india: [
    { name: 'Aspri Spirits', categories: ['spirits', 'wine'], terms: 'State-by-state agreements. Complex terms.', minOrder: '500 cases (per state)', keyBrands: 'Various imported spirits', contact: 'info@aspri.in', notes: 'Pan-India presence. Handles state excise compliance.' },
    { name: 'Brindco', categories: ['wine', 'spirits', 'champagne'], terms: 'Net 90–120 days. State licences required.', minOrder: '200 cases', keyBrands: 'Moët Hennessy, Torres, Antinori', contact: 'info@brindco.com', notes: 'Oldest wine importer in India. Delhi-based. Strong in North.' },
    { name: 'Sula Selections', categories: ['wine', 'spirits'], terms: 'Distribution arm of Sula Vineyards.', minOrder: '100 cases', keyBrands: 'Sula wines + imported portfolio', contact: 'info@sulawines.com', notes: 'Largest Indian wine producer. Import arm growing.' },
  ],
  brazil: [
    { name: 'Interfood', categories: ['spirits', 'wine'], terms: 'Net 60–90 days. Exclusivity preferred.', minOrder: '300 cases', keyBrands: 'Various premium imports', contact: 'info@interfood.com.br', notes: 'Leading premium spirits importer. São Paulo based.' },
    { name: 'Grand Cru', categories: ['wine', 'champagne'], terms: 'Net 45–60 days. Wine focus.', minOrder: '200 cases', keyBrands: 'Premium wine portfolio', contact: 'info@grandcru.com.br', notes: 'Largest wine importer. Retail + distribution.' },
    { name: 'World Wine', categories: ['wine', 'spirits'], terms: 'Net 60 days. Growing spirits division.', minOrder: '150 cases', keyBrands: 'Various international brands', contact: 'info@worldwine.com.br', notes: 'Strong e-commerce presence. DTC capabilities.' },
  ],
}

// Competitor landscape by market x category
export const COMPETITOR_LANDSCAPE = {
  uk: {
    tequila: { leader: 'Patrón (Bacardi)', challengers: ['Don Julio (Diageo)', 'Casamigos (Diageo)', 'Olmeca (Pernod Ricard)'], emerging: ['El Rayo', 'LALO', 'Mijenta'], insight: 'Super-premium segment growing fastest. Celebrity brands dominate awareness but craft is gaining.' },
    vodka: { leader: 'Smirnoff (Diageo)', challengers: ['Absolut (Pernod)', 'Grey Goose (Bacardi)', 'Belvedere (LVMH)'], emerging: ['Chase', 'Black Cow', 'Nc’nean'], insight: 'Volume declining but premiumisation driving value growth. British provenance gaining traction.' },
    gin: { leader: 'Gordon’s (Diageo)', challengers: ['Hendrick’s (Grant’s)', 'Tanqueray (Diageo)', 'Beefeater (Pernod)'], emerging: ['Whitley Neill', 'Malfy', 'KI NO BI'], insight: 'Mature market. Over 900 brands. Differentiation through serves and provenance essential.' },
    whisky: { leader: 'Johnnie Walker (Diageo)', challengers: ['Jameson (Pernod)', 'Jack Daniel’s (Brown-Forman)', 'Glenfiddich (Grant’s)'], emerging: ['Nc’nean', 'Holyrood', 'Raasay'], insight: 'Scotch dominates but Irish and Japanese growing. English whisky emerging niche.' },
    rum: { leader: 'Captain Morgan (Diageo)', challengers: ['Bacardi', 'Havana Club (Pernod)', 'Kraken'], emerging: ['Equiano', 'Renegade', 'Spirited Union'], insight: 'Spiced dominates volume. Premium dark/aged rum fastest growth. Caribbean provenance valued.' },
    cognac: { leader: 'Hennessy (LVMH)', challengers: ['Rémy Martin', 'Courvoisier (Beam Suntory)', 'Martell (Pernod)'], emerging: ['Hardy', 'Frapin', 'De Luze'], insight: 'Big four dominate 85%+ market. Niche grower/estate cognacs have bartender appeal.' },
    champagne: { leader: 'Moët & Chandon (LVMH)', challengers: ['Veuve Clicquot (LVMH)', 'Laurent-Perrier', 'Pol Roger'], emerging: ['Palmer & Co', 'Lallier', 'Billecart-Salmon'], insight: 'UK is largest Champagne export market. Grower Champagnes trending in top bars.' },
    wine: { leader: 'Casillero del Diablo (Concha y Toro)', challengers: ['Barefoot (Gallo)', 'Yellow Tail (Casella)', 'Jacob’s Creek (Pernod)'], emerging: ['English sparkling (Chapel Down, Nyetimber)', 'Orange wines', 'Natural wines'], insight: 'Duty increase hit margins. English sparkling booming. Bag-in-box gaining share.' },
    beer: { leader: 'Madri (Molson Coors)', challengers: ['Peroni (Asahi)', 'Estrella Damm', 'Heineken'], emerging: ['Lucky Saint (no/lo)', 'Beavertown', 'Deya'], insight: 'World lager dominant trend. Craft consolidation. No/lo beer fastest-growing sub-segment.' },
    nolo: { leader: 'Seedlip (Diageo)', challengers: ['Lyre’s', 'Caleno', 'Lucky Saint'], emerging: ['Three Spirit', 'Days Brewing', 'IMPOSSIBREW'], insight: 'Category grew 31% in 2025. First-taste trial is key. Health/wellness positioning wins.' },
    rtd: { leader: 'White Claw (Mark Anthony)', challengers: ['Smirnoff Ice (Diageo)', 'Gordon’s G&T (Diageo)', 'Jack Daniel’s & Cola'], emerging: ['Served', 'NIO Cocktails', 'Moth'], insight: 'Premium cocktail RTDs growing faster than hard seltzers. Can format preferred.' },
  },
  // Other markets share similar structure — abbreviated for bundle size
  us: {
    tequila: { leader: 'Patrón (Bacardi)', challengers: ['Don Julio (Diageo)', 'Casamigos (Diageo)', '1800 (Proximo)'], emerging: ['Clase Azul', 'Lobos 1707', 'Cincoro'], insight: 'Tequila surpassed vodka in US revenue (2025). Celebrity brands drive growth. 100% agave is baseline expectation.' },
    vodka: { leader: 'Tito’s', challengers: ['Smirnoff (Diageo)', 'New Amsterdam', 'Grey Goose (Bacardi)'], emerging: ['Hanson of Sonoma', 'Deep Eddy (acquired)'], insight: 'Volume declining. Tito’s dominates value-premium. Flavoured vodka via RTD crossover.' },
    gin: { leader: 'Aviation (Diageo)', challengers: ['Hendrick’s', 'Tanqueray', 'Bombay Sapphire'], emerging: ['Empress 1908', 'Drumshanbo'], insight: 'Gin renaissance driven by cocktail culture. London Dry and contemporary styles.' },
    whisky: { leader: 'Jack Daniel’s (Brown-Forman)', challengers: ['Crown Royal (Diageo)', 'Maker’s Mark (Beam Suntory)', 'Bulleit (Diageo)'], emerging: ['Uncle Nearest', 'Westland', 'Rabbit Hole'], insight: 'American whiskey dominates domestically. Japanese whisky premium niche. Scotch steady.' },
    rum: { leader: 'Bacardi', challengers: ['Captain Morgan (Diageo)', 'Malibu (Pernod)', 'Don Q'], emerging: ['Diplomático', 'Foursquare', 'Plantation'], insight: 'Premium dark rum growing. Spiced/flavoured still volume leader. Latin influence driving category.' },
    cognac: { leader: 'Hennessy (LVMH)', challengers: ['Rémy Martin', 'Courvoisier', 'D’USSÉ (Bacardi)'], emerging: ['Pierre Ferrand', 'Hardy'], insight: 'US is largest cognac market. Hip-hop/culture connection drives awareness. VS/VSOP dominate.' },
    champagne: { leader: 'Moët & Chandon (LVMH)', challengers: ['Veuve Clicquot', 'Dom Pérignon', 'Perrier-Jouët'], emerging: ['Grower Champagnes', 'Krug'], insight: 'US is #2 Champagne market. Prestige cuvées outperforming standard brut.' },
    wine: { leader: 'Barefoot (Gallo)', challengers: ['Josh Cellars (Deutsch)', 'Meiomi (Constellation)', 'Kim Crawford'], emerging: ['Natural wine movement', 'Canned wines'], insight: 'DTC booming post-COVID. Premium $15-25 segment growing fastest.' },
    beer: { leader: 'Modelo Especial (Constellation)', challengers: ['Bud Light (AB InBev)', 'Michelob Ultra', 'Coors Light (Molson Coors)'], emerging: ['Athletic Brewing (no/lo)', 'Various craft'], insight: 'Mexican imports #1 growth driver. No/lo beer segment exploding. Craft consolidation.' },
    nolo: { leader: 'Athletic Brewing', challengers: ['Heineken 0.0', 'Lyre’s', 'Seedlip'], emerging: ['Ghia', 'Kin Euphorics', 'Curious Elixirs'], insight: 'US no/lo market growing 35%+ annually. Beer leads spirits alternatives. Wellness positioning key.' },
    rtd: { leader: 'High Noon (Constellation)', challengers: ['White Claw', 'Truly (Boston Beer)', 'Cutwater (AB InBev)'], emerging: ['On The Rocks', 'Tip Top'], insight: 'Spirits-based RTDs outpacing seltzers. Premium cocktail cans trending. Shot-format emerging.' },
  },
}

// Pricing strategy by market
export const PRICING_STRATEGY = {
  uk: { valueRange: '£15–£22', premiumRange: '£25–£40', superPremiumRange: '£42–£65', ultraPremiumRange: '£70+', avgOnTradePour: '£8–£14', avgMarkup: '2.5–3.5x on-trade, 30–45% off-trade', keyChannels: 'Supermarkets (60% off-trade), independent retailers, on-trade (pubs, bars, restaurants)', tip: 'Supermarket listing fees £5,000–£25,000. Prioritise on-trade first for brand building.' },
  us: { valueRange: '$15–$25', premiumRange: '$30–$50', superPremiumRange: '$55–$80', ultraPremiumRange: '$100+', avgOnTradePour: '$12–$18', avgMarkup: '3–5x on-trade, 25–40% off-trade (varies by state)', keyChannels: 'Liquor stores, grocery (where permitted), on-trade, DTC (where permitted)', tip: 'Three-tier system adds 30–40% to cost. Price backwards from shelf to ensure margin.' },
  spain: { valueRange: '€8–€15', premiumRange: '€18–€35', superPremiumRange: '€40–€60', ultraPremiumRange: '€75+', avgOnTradePour: '€6–€12', avgMarkup: '2–3x on-trade, 25–35% off-trade', keyChannels: 'Horeca (bars/restaurants dominant), supermarkets (Mercadona, Carrefour)', tip: 'Spain is price-sensitive. On-trade drives premiumisation. Gin-tonic culture creates opportunities.' },
  france: { valueRange: '€10–€18', premiumRange: '€22–€40', superPremiumRange: '€45–€70', ultraPremiumRange: '€80+', avgOnTradePour: '€8–€15', avgMarkup: '3–4x on-trade, 30–40% off-trade', keyChannels: 'Cavistes (specialist retailers), CHR (cafés-hôtels-restaurants), grande distribution', tip: 'Loi Évin severely limits marketing. Product quality and trade relationships are paramount.' },
  germany: { valueRange: '€10–€18', premiumRange: '€20–€35', superPremiumRange: '€40–€60', ultraPremiumRange: '€70+', avgOnTradePour: '€7–€12', avgMarkup: '2.5–3.5x on-trade, 25–35% off-trade', keyChannels: 'Getränkemärkte, discount retail (Aldi, Lidl), on-trade, online', tip: 'Germany is price-conscious. Discount retail is massive. Premium positioning requires strong story.' },
  japan: { valueRange: '¥2,000–¥3,500', premiumRange: '¥4,000–¥8,000', superPremiumRange: '¥10,000–¥20,000', ultraPremiumRange: '¥25,000+', avgOnTradePour: '¥1,200–¥2,500', avgMarkup: '3–5x on-trade, 30–40% off-trade', keyChannels: 'Convenience stores (massive), department stores, on-trade (bars, izakaya), online', tip: 'Convenience stores (7-Eleven, Lawson) are the biggest off-trade channel. Premium packaging essential.' },
  australia: { valueRange: 'A$35–A$50', premiumRange: 'A$55–A$80', superPremiumRange: 'A$90–A$130', ultraPremiumRange: 'A$150+', avgOnTradePour: 'A$14–A$22', avgMarkup: '3–4x on-trade, 30–40% off-trade', keyChannels: 'Dan Murphy’s (dominant), BWS, independent bottle shops, on-trade', tip: 'Dan Murphy’s listing is essential for off-trade reach. WET (Wine Equalisation Tax) affects wine pricing.' },
  uae: { valueRange: 'AED 80–AED 150', premiumRange: 'AED 180–AED 350', superPremiumRange: 'AED 400–AED 700', ultraPremiumRange: 'AED 800+', avgOnTradePour: 'AED 50–AED 100', avgMarkup: '4–6x on-trade, 40–60% off-trade', keyChannels: 'Hotel bars/restaurants, duty-free, MMI/A&E retail shops', tip: '50% excise tax inflates prices. Duty-free channel offers better margin. Tourism drives consumption.' },
  india: { valueRange: '₹1,500–₹2,500', premiumRange: '₹3,000–₹5,000', superPremiumRange: '₹6,000–₹15,000', ultraPremiumRange: '₹20,000+', avgOnTradePour: '₹500–₹2,000', avgMarkup: '3–5x on-trade, 25–40% off-trade (state-dependent)', keyChannels: 'State-run liquor stores (many states), bars/restaurants, duty-free, e-commerce (limited)', tip: '150% customs duty means pricing strategy is critical. Each state is essentially a separate market.' },
  brazil: { valueRange: 'R$80–R$150', premiumRange: 'R$180–R$350', superPremiumRange: 'R$400–R$700', ultraPremiumRange: 'R$800+', avgOnTradePour: 'R$30–R$80', avgMarkup: '3–5x on-trade, 30–45% off-trade', keyChannels: 'Supermarkets (Pão de Açúcar, Carrefour), bars/restaurants, e-commerce (growing fast)', tip: 'Tax cascade makes imported spirits expensive. Cachaça dominates volume. Premium imports = status symbol.' },
}

// Timeline milestones (generic, augmented by market-specific extras)
export const ENTRY_TIMELINE = [
  { month: -12, label: 'Market Research & Strategy', tasks: ['Market sizing and segmentation', 'Competitor mapping and positioning', 'Price point analysis', 'Distribution channel strategy', 'Budget allocation'] },
  { month: -10, label: 'Regulatory & Compliance', tasks: ['Import licence application', 'Label compliance review', 'Tax registration', 'Legal entity setup (if required)', 'Insurance arrangements'] },
  { month: -8, label: 'Distributor Selection', tasks: ['Distributor shortlisting', 'Terms negotiation', 'Trial shipment planning', 'Marketing plan alignment', 'Contract finalisation'] },
  { month: -6, label: 'Production & Logistics', tasks: ['Market-specific label production', 'Compliance label review', 'Shipping/logistics booking', 'Customs broker appointment', 'Warehouse/bonded storage'] },
  { month: -4, label: 'Pre-Launch Marketing', tasks: ['Trade sampling programme', 'Key account presentations', 'PR/media outreach', 'Social media setup', 'Trade show participation'] },
  { month: -2, label: 'Soft Launch', tasks: ['First shipment arrival', 'Key account seeding', 'Staff training sessions', 'Sampling events', 'Initial order processing'] },
  { month: 0, label: 'Market Launch', tasks: ['Full distribution activation', 'Consumer-facing marketing', 'Launch events', 'Performance tracking setup', 'Reorder planning'] },
  { month: 3, label: 'Review & Optimise', tasks: ['Sales velocity analysis', 'Distribution gap assessment', 'Marketing ROI review', 'Pricing adjustment', 'Depletion forecasting'] },
]

// Estimated costs breakdown
export const COST_BREAKDOWN_WIZARD = {
  categories: ['Regulatory & Compliance', 'Label Design & Production', 'Initial Stock (200 cases)', 'Shipping & Logistics', 'Distributor Setup', 'Marketing & Sampling', 'Legal & Insurance', 'Contingency (15%)'],
  estimates: {
    uk: [5000, 3000, 15000, 2000, 2000, 8000, 3000, 5700],
    us: [15000, 5000, 25000, 8000, 10000, 20000, 8000, 13650],
    spain: [3000, 2500, 12000, 3000, 2000, 6000, 2000, 4575],
    france: [5000, 3000, 14000, 3000, 3000, 8000, 3000, 5850],
    germany: [3000, 2500, 13000, 2500, 2500, 7000, 2500, 4875],
    japan: [8000, 4000, 18000, 6000, 5000, 12000, 5000, 8700],
    australia: [5000, 3000, 16000, 5000, 3000, 10000, 4000, 6900],
    uae: [10000, 3000, 20000, 4000, 5000, 8000, 5000, 8250],
    india: [12000, 3000, 18000, 5000, 8000, 15000, 6000, 10050],
    brazil: [8000, 3000, 16000, 5000, 5000, 10000, 5000, 7800],
  },
  currency: { uk: '£', us: '$', spain: '€', france: '€', germany: '€', japan: '¥', australia: 'A$', uae: 'AED', india: '₹', brazil: 'R$' },
}
