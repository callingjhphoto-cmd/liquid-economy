// Market Entry Wizard \u2014 comprehensive playbook data for 10 key markets x 11 categories

export const TARGET_MARKETS_WIZARD = [
  { id: 'uk', name: 'United Kingdom', flag: '\ud83c\uddec\ud83c\udde7', region: 'Europe' },
  { id: 'us', name: 'United States', flag: '\ud83c\uddfa\ud83c\uddf8', region: 'North America' },
  { id: 'spain', name: 'Spain', flag: '\ud83c\uddea\ud83c\uddf8', region: 'Europe' },
  { id: 'france', name: 'France', flag: '\ud83c\uddeb\ud83c\uddf7', region: 'Europe' },
  { id: 'germany', name: 'Germany', flag: '\ud83c\udde9\ud83c\uddea', region: 'Europe' },
  { id: 'japan', name: 'Japan', flag: '\ud83c\uddef\ud83c\uddf5', region: 'Asia-Pacific' },
  { id: 'australia', name: 'Australia', flag: '\ud83c\udde6\ud83c\uddfa', region: 'Asia-Pacific' },
  { id: 'uae', name: 'United Arab Emirates', flag: '\ud83c\udde6\ud83c\uddea', region: 'Middle East' },
  { id: 'india', name: 'India', flag: '\ud83c\uddee\ud83c\uddf3', region: 'Asia-Pacific' },
  { id: 'brazil', name: 'Brazil', flag: '\ud83c\udde7\ud83c\uddf7', region: 'Latin America' },
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
    dutyRates: { spirits: '\u00a328.74/litre of pure alcohol', wine: '\u00a32.67/bottle (still, 11.5-14.5%)', beer: '\u00a319.08/hectolitre per % ABV' },
    ageRestriction: '18+. Challenge 25 policy widely adopted.',
    advertisingRules: 'ASA/CAP Code. No appeal to under-18s. No health claims. No encouragement of excess. Portman Group voluntary code.',
    timeline: '3\u20136 months from application to first sale',
    estimatedCost: '\u00a315,000\u2013\u00a340,000 setup (excluding stock)',
  },
  us: {
    importLicence: 'TTB Federal Basic Permit + COLA (Certificate of Label Approval). State-by-state distribution licences required.',
    labelling: 'TTB-specific requirements. Health warning mandatory. Net contents, ABV, country of origin. No health benefit claims.',
    taxStamps: 'Federal strip stamps on all distilled spirits entering US market.',
    dutyRates: { spirits: '$13.50/proof gallon (federal) + state taxes vary widely', wine: '$1.07\u2013$3.40/gallon depending on ABV', beer: '$3.50\u2013$16.00/barrel' },
    ageRestriction: '21+. Strict enforcement varies by state.',
    advertisingRules: 'TTB regulates. No TV/radio advertising of spirits (voluntary). FTC oversight. State-specific rules apply.',
    timeline: '6\u201312 months (TTB COLA alone can take 4\u20136 months)',
    estimatedCost: '$50,000\u2013$150,000 (three-tier system adds cost)',
  },
  spain: {
    importLicence: 'EU single market access. Excise registration with Agencia Tributaria. No separate import licence for EU-origin goods.',
    labelling: 'EU Regulation 1169/2011. Spanish language mandatory. Ingredient/calorie labelling from June 2026. Denominaci\u00f3n de Origen labels regulated.',
    taxStamps: 'Not required. Tax paid via excise registration.',
    dutyRates: { spirits: '\u20ac958.94/hectolitre pure alcohol', wine: '\u20ac0 (wine exempt from excise in Spain)', beer: '\u20ac2.75\u2013\u20ac13.56/hectolitre depending on gravity' },
    ageRestriction: '18+ nationally. Some regions have local variations.',
    advertisingRules: 'Ley 34/1988. No advertising near schools. TV restrictions 6am\u20138:30pm. Regional autonomy on enforcement.',
    timeline: '2\u20134 months for EU-origin; 4\u20138 months for non-EU',
    estimatedCost: '\u20ac10,000\u2013\u20ac30,000 setup',
  },
  france: {
    importLicence: 'EU market. Customs registration. D\u00e9claration Pr\u00e9alable de Profession required for wholesale.',
    labelling: 'EU Regulation 1169/2011. French language mandatory. Loi \u00c9vin restricts health messaging. "Femme enceinte" pregnancy pictogram required.',
    taxStamps: 'Capsule Repr\u00e9sentative de Droit (CRD) \u2014 fiscal stamp on all spirits/wine bottles.',
    dutyRates: { spirits: '\u20ac1,806.28/hectolitre pure alcohol', wine: '\u20ac3.91/hectolitre (still)', beer: '\u20ac3.84\u2013\u20ac7.68/hectolitre' },
    ageRestriction: '18+. Strict enforcement. No sale to intoxicated persons.',
    advertisingRules: 'Loi \u00c9vin (1991) \u2014 strictest in Europe. No TV/cinema advertising. Print ads must include health warning. No sponsorship of sports events. Social media in grey area.',
    timeline: '3\u20136 months',
    estimatedCost: '\u20ac15,000\u2013\u20ac45,000 (CRD adds \u20ac0.02\u20130.05/bottle)',
  },
  germany: {
    importLicence: 'EU market. EORI number required. Zollamt (customs office) registration.',
    labelling: 'EU regs + German additions. Pfand (deposit) marking for bottles. Nutrition info from 2026. German language required.',
    taxStamps: 'Not required. Electronic excise system (EMCS).',
    dutyRates: { spirits: '\u20ac1,303/hectolitre pure alcohol', wine: '\u20ac0 (exempt)', beer: '\u20ac0.787/hectolitre per degree Plato' },
    ageRestriction: '16+ for beer/wine, 18+ for spirits. Strictly enforced.',
    advertisingRules: 'Jugendschutzgesetz. No advertising targeting minors. Self-regulation through Deutscher Werberat. TV watershed rules apply.',
    timeline: '2\u20134 months for EU-origin',
    estimatedCost: '\u20ac12,000\u2013\u20ac35,000',
  },
  japan: {
    importLicence: 'Liquor Tax Law licence from National Tax Agency. Importer must be Japanese entity or have local partner.',
    labelling: 'Japanese language mandatory. Ingredients list (JAS standards). Recycling marks (PET, glass, aluminum). Country of origin.',
    taxStamps: 'Not required. Tax collected at wholesale level.',
    dutyRates: { spirits: '\u00a537,800/kilolitre for whisky/brandy; \u00a520,000/kl for shochu', wine: '\u00a580,000/kilolitre', beer: '\u00a5220,000/kilolitre' },
    ageRestriction: '20+. Age verification at point of sale.',
    advertisingRules: 'Self-regulated by Brewers Association. No targeting under-20s. TV ads after 18:00 only. Health warnings voluntary but increasingly expected.',
    timeline: '4\u20138 months (NTA licence can take 2\u20134 months)',
    estimatedCost: '\u00a53,000,000\u2013\u00a510,000,000 (\u00a320,000\u2013\u00a365,000)',
  },
  australia: {
    importLicence: 'Import permit from ABARES. Customs broker required. State liquor licences for distribution.',
    labelling: 'FSANZ standards. Mandatory pregnancy warning label (from 2024). Standard drinks labelling. Allergens.',
    taxStamps: 'Not required. WET (Wine Equalisation Tax) or excise applies.',
    dutyRates: { spirits: 'A$94.41/litre of pure alcohol', wine: '29% WET (Wine Equalisation Tax)', beer: 'A$55.73/litre of pure alcohol' },
    ageRestriction: '18+. RSA (Responsible Service of Alcohol) certification required for servers.',
    advertisingRules: 'ABAC (Alcohol Beverages Advertising Code). No appeal to minors. No depiction of excess consumption. Digital/social media included.',
    timeline: '3\u20136 months',
    estimatedCost: 'A$30,000\u2013A$80,000',
  },
  uae: {
    importLicence: 'Trade licence from DED. Alcohol trading licence from Dubai Municipality (or relevant emirate). Free zone vs mainland decision critical.',
    labelling: 'Arabic + English mandatory. Halal-adjacent \u2014 no Halal certification possible but packaging must not offend. Country of origin.',
    taxStamps: 'Required. 50% excise tax on alcohol (2018). 5% VAT.',
    dutyRates: { spirits: '50% excise + 5% customs duty', wine: '50% excise + 5% customs', beer: '50% excise + 5% customs' },
    ageRestriction: '21+. Non-Muslim residents only (relaxed from 2023). Tourist sales via licensed venues.',
    advertisingRules: 'No public advertising of alcohol permitted. No social media promotion. In-venue marketing only. No visible alcohol branding in public spaces.',
    timeline: '4\u20138 months (licence processing)',
    estimatedCost: 'AED 150,000\u2013AED 500,000 (\u00a330,000\u2013\u00a3100,000)',
  },
  india: {
    importLicence: 'State-by-state excise licence required. FSSAI registration. BIS certification for some categories. No national alcohol licence.',
    labelling: 'FSSAI standards. English + Hindi (or local language). MRP (Maximum Retail Price) must be printed on label. BIS mark where applicable.',
    taxStamps: 'Required in most states. Excise stickers/holograms vary by state.',
    dutyRates: { spirits: '150% customs duty + state excise (varies 20\u2013200%)', wine: '150% customs + state excise', beer: '100% customs + state excise' },
    ageRestriction: '21\u201325+ (varies by state: Gujarat is dry, Kerala 23+, Delhi 25+).',
    advertisingRules: 'No direct advertising of alcohol permitted. Surrogate advertising (brand extensions) is common workaround. ASCI guidelines. Cable TV Network Rules restrict.',
    timeline: '6\u201318 months (state-by-state complexity)',
    estimatedCost: '\u20b950,00,000\u2013\u20b92,00,00,000 (\u00a350,000\u2013\u00a3200,000) depending on states',
  },
  brazil: {
    importLicence: 'ANVISA registration. MAPA import licence. Cadastro de Importador. Importer of Record required (Brazilian entity).',
    labelling: 'Portuguese mandatory. ANVISA-compliant. Nutritional information. Pregnancy warning. Recycling symbols.',
    taxStamps: 'Selo fiscal (fiscal seal) required on all imported spirits.',
    dutyRates: { spirits: '20% import duty + IPI (up to 30%) + ICMS (25\u201330% varies by state) + PIS/COFINS (9.25%)', wine: '27% import duty + state taxes', beer: '15% import + state taxes' },
    ageRestriction: '18+. Estatuto da Crian\u00e7a e do Adolescente enforcement.',
    advertisingRules: 'CONAR self-regulation. No TV advertising of spirits (beer only). No association with sports success. Social media guidelines evolving.',
    timeline: '4\u20138 months (ANVISA can take 2\u20134 months alone)',
    estimatedCost: 'R$150,000\u2013R$500,000 (\u00a325,000\u2013\u00a380,000)',
  },
}

// Key distributors by market
export const KEY_DISTRIBUTORS = {
  uk: [
    { name: 'Bibendum', categories: ['wine', 'champagne', 'spirits'], terms: 'Net 60\u201390 days. Listing fee \u00a32,000\u2013\u00a35,000.', minOrder: '50 cases', keyBrands: 'Chapel Down, Gusbourne, Nyetimber', contact: 'info@bibendum-wine.co.uk', notes: 'PLB subsidiary. Strong on-trade presence.' },
    { name: 'Mangrove Global', categories: ['tequila', 'gin', 'rum', 'vodka'], terms: 'Net 30\u201360 days. Exclusivity expected.', minOrder: '100 cases', keyBrands: 'Bumbu, Teeling, Brockmans', contact: 'hello@mangroveglobal.com', notes: 'Award-winning spirits distributor. Strong brand-building focus.' },
    { name: 'Enotria&Coe', categories: ['wine', 'champagne', 'spirits'], terms: 'Net 60 days. Annual marketing contribution.', minOrder: '25 cases', keyBrands: 'Cloudy Bay, Perrier-Jou\u00ebt, Havana Club', contact: 'info@enotriacoe.com', notes: 'C&C Group subsidiary. Largest independent UK distributor.' },
    { name: 'Ten Locks', categories: ['gin', 'rum', 'tequila', 'whisky'], terms: 'Net 45 days. Performance-based agreements.', minOrder: '75 cases', keyBrands: 'KAH Tequila, Discarded Spirits', contact: 'info@tenlocks.com', notes: 'Premium craft spirits focus. Strong bartender relationships.' },
    { name: 'Proof Drinks', categories: ['gin', 'vodka', 'rum', 'whisky', 'tequila'], terms: 'Net 30\u201360 days. Brand plan required.', minOrder: '50 cases', keyBrands: 'Four Pillars, Roku, Plantation', contact: 'hello@proofdrinks.com', notes: 'Part of Zamora Company. Growing portfolio.' },
  ],
  us: [
    { name: 'Southern Glazer\u2019s', categories: ['all'], terms: 'Net 30 days. Franchise-state dependent.', minOrder: '500 cases', keyBrands: 'Bacardi, Brown-Forman, Beam Suntory', contact: 'Through broker network', notes: 'Largest US distributor. 44 states. Required for national reach.' },
    { name: 'Republic National Distributing Co (RNDC)', categories: ['all'], terms: 'Net 30 days. State-specific.', minOrder: '300 cases', keyBrands: 'Diageo, Pernod Ricard', contact: 'Through broker network', notes: '2nd largest. Strong in Southeast and West.' },
    { name: 'Breakthru Beverage', categories: ['all'], terms: 'Net 30 days. Portfolio review required.', minOrder: '200 cases', keyBrands: 'Remy Cointreau, Campari', contact: 'Through broker network', notes: '3rd largest. Growing rapidly through acquisitions.' },
    { name: 'Park Street', categories: ['spirits', 'wine'], terms: 'Back-office + distribution. Revenue share model.', minOrder: '100 cases', keyBrands: 'Various emerging brands', contact: 'info@parkstreet.com', notes: 'Ideal for new-to-market brands. Handles compliance, logistics.' },
    { name: 'LibDib', categories: ['spirits', 'wine'], terms: 'Direct-to-retailer platform. 15\u201318% commission.', minOrder: '1 case', keyBrands: 'Craft brands', contact: 'info@libdib.com', notes: 'Digital platform. Low barrier to entry. Currently in CA, NY, WI, CT, FL, CO.' },
  ],
  spain: [
    { name: 'Varma', categories: ['spirits', 'wine'], terms: 'Net 60 days. Regional exclusivity.', minOrder: '100 cases', keyBrands: 'Hendrick\u2019s, Monkey 47, Glenfiddich', contact: 'info@varma.es', notes: 'Largest independent spirits distributor in Spain.' },
    { name: 'Maxxium Espa\u00f1a', categories: ['spirits'], terms: 'Net 45\u201360 days.', minOrder: '200 cases', keyBrands: 'Beam Suntory portfolio', contact: 'info@maxxium.es', notes: 'Part of Beam Suntory distribution arm.' },
    { name: 'Zamora Company', categories: ['spirits', 'wine'], terms: 'Net 60 days. Long-term partnerships.', minOrder: '150 cases', keyBrands: 'Lic. 43, Ram\u00f3n Bilbao, Villa Massa', contact: 'info@zamoracompany.com', notes: 'Spanish-owned. Strong in on-trade and travel retail.' },
  ],
  france: [
    { name: 'La Maison du Whisky', categories: ['whisky', 'spirits'], terms: 'Net 60 days. Curated portfolio.', minOrder: '50 cases', keyBrands: 'Compass Box, Nikka, Kavalan', contact: 'info@lmdw.com', notes: 'Premium spirits specialist. Strong retail + on-trade.' },
    { name: 'Dugas', categories: ['spirits'], terms: 'Net 60 days. Brand-building focus.', minOrder: '100 cases', keyBrands: 'Various craft spirits', contact: 'contact@dugas.fr', notes: 'Family-owned. Strong cocktail bar relationships.' },
    { name: 'Marie Brizard Wine & Spirits', categories: ['spirits', 'wine'], terms: 'Net 45\u201390 days.', minOrder: '200 cases', keyBrands: 'Marie Brizard, Gautier Cognac', contact: 'info@mbws.com', notes: 'Listed company. National distribution network.' },
  ],
  germany: [
    { name: 'Borco', categories: ['spirits'], terms: 'Net 60 days. Market-entry support.', minOrder: '100 cases', keyBrands: 'Sierra Tequila, Fernet Branca, Linie Aquavit', contact: 'info@borco.com', notes: 'Hamburg-based. Strong national reach. Focus on spirits.' },
    { name: 'Schlumberger', categories: ['spirits', 'wine', 'champagne'], terms: 'Net 45\u201360 days.', minOrder: '150 cases', keyBrands: 'Various premium spirits', contact: 'info@schlumberger.de', notes: 'Part of Underberg group. Premium positioning.' },
    { name: 'Sierra Madre', categories: ['tequila', 'rum', 'gin'], terms: 'Net 60 days. Craft focus.', minOrder: '75 cases', keyBrands: 'Various artisanal spirits', contact: 'info@sierramadre.de', notes: 'Specialist in Central/South American spirits.' },
  ],
  japan: [
    { name: 'Suntory', categories: ['whisky', 'spirits', 'beer'], terms: 'JV partnership model.', minOrder: 'Negotiable', keyBrands: 'Own portfolio + select imports', contact: 'Through agent', notes: 'Market dominant. Partnership = instant credibility.' },
    { name: 'CT Spirits Japan', categories: ['spirits'], terms: 'Net 60 days. Japanese entity required.', minOrder: '100 cases', keyBrands: 'Various craft imports', contact: 'info@ctspirits.jp', notes: 'Growing importer. Focus on craft and artisanal.' },
    { name: 'Whisk-e Ltd', categories: ['whisky', 'spirits'], terms: 'Net 30\u201360 days.', minOrder: '50 cases', keyBrands: 'Compass Box, English Whisky Co', contact: 'info@whisk-e.co.jp', notes: 'Specialist whisky importer. Strong bar network.' },
  ],
  australia: [
    { name: 'Vanguard Luxury Brands', categories: ['spirits', 'champagne'], terms: 'Net 30 days. Annual marketing contribution.', minOrder: '100 cases', keyBrands: 'Perrier-Jou\u00ebt, Ardbeg, Glenmorangie', contact: 'info@vlb.com.au', notes: 'Premium and luxury focus. National reach.' },
    { name: 'Think Spirits', categories: ['spirits'], terms: 'Net 30 days. Brand plan required.', minOrder: '75 cases', keyBrands: 'Monkey Shoulder, Johnnie Walker variants', contact: 'info@thinkspirits.com.au', notes: 'Strong on-trade relationships. Growing portfolio.' },
    { name: 'Spirits Platform', categories: ['spirits'], terms: 'Net 30 days. Distribution + brand building.', minOrder: '100 cases', keyBrands: 'Jagermeister, Flor de Ca\u00f1a, Lillet', contact: 'info@spiritsplatform.com.au', notes: 'Full-service distributor. Marketing support included.' },
  ],
  uae: [
    { name: 'MMI (Maritime & Mercantile International)', categories: ['all'], terms: 'Net 60\u201390 days. Exclusivity expected.', minOrder: '200 cases', keyBrands: 'Diageo portfolio, Treasury Wine Estates', contact: 'Through broker', notes: 'Largest alcohol distributor in Middle East. Al Habtoor group.' },
    { name: 'African + Eastern', categories: ['all'], terms: 'Net 60 days. Long-term agreements.', minOrder: '150 cases', keyBrands: 'Various premium brands', contact: 'info@africaneastern.com', notes: '2nd largest in region. Strong hotel/resort channel.' },
    { name: 'Ghantoot Group', categories: ['spirits', 'wine'], terms: 'Net 45\u201360 days.', minOrder: '100 cases', keyBrands: 'Growing craft portfolio', contact: 'info@ghantootgroup.ae', notes: 'Emerging distributor. More flexible terms for new brands.' },
  ],
  india: [
    { name: 'Aspri Spirits', categories: ['spirits', 'wine'], terms: 'State-by-state agreements. Complex terms.', minOrder: '500 cases (per state)', keyBrands: 'Various imported spirits', contact: 'info@aspri.in', notes: 'Pan-India presence. Handles state excise compliance.' },
    { name: 'Brindco', categories: ['wine', 'spirits', 'champagne'], terms: 'Net 90\u2013120 days. State licences required.', minOrder: '200 cases', keyBrands: 'Mo\u00ebt Hennessy, Torres, Antinori', contact: 'info@brindco.com', notes: 'Oldest wine importer in India. Delhi-based. Strong in North.' },
    { name: 'Sula Selections', categories: ['wine', 'spirits'], terms: 'Distribution arm of Sula Vineyards.', minOrder: '100 cases', keyBrands: 'Sula wines + imported portfolio', contact: 'info@sulawines.com', notes: 'Largest Indian wine producer. Import arm growing.' },
  ],
  brazil: [
    { name: 'Interfood', categories: ['spirits', 'wine'], terms: 'Net 60\u201390 days. Exclusivity preferred.', minOrder: '300 cases', keyBrands: 'Various premium imports', contact: 'info@interfood.com.br', notes: 'Leading premium spirits importer. S\u00e3o Paulo based.' },
    { name: 'Grand Cru', categories: ['wine', 'champagne'], terms: 'Net 45\u201360 days. Wine focus.', minOrder: '200 cases', keyBrands: 'Premium wine portfolio', contact: 'info@grandcru.com.br', notes: 'Largest wine importer. Retail + distribution.' },
    { name: 'World Wine', categories: ['wine', 'spirits'], terms: 'Net 60 days. Growing spirits division.', minOrder: '150 cases', keyBrands: 'Various international brands', contact: 'info@worldwine.com.br', notes: 'Strong e-commerce presence. DTC capabilities.' },
  ],
}

// Competitor landscape by market x category
export const COMPETITOR_LANDSCAPE = {
  uk: {
    tequila: { leader: 'Patr\u00f3n (Bacardi)', challengers: ['Don Julio (Diageo)', 'Casamigos (Diageo)', 'Olmeca (Pernod Ricard)'], emerging: ['El Rayo', 'LALO', 'Mijenta'], insight: 'Super-premium segment growing fastest. Celebrity brands dominate awareness but craft is gaining.' },
    vodka: { leader: 'Smirnoff (Diageo)', challengers: ['Absolut (Pernod)', 'Grey Goose (Bacardi)', 'Belvedere (LVMH)'], emerging: ['Chase', 'Black Cow', 'Nc\u2019nean'], insight: 'Volume declining but premiumisation driving value growth. British provenance gaining traction.' },
    gin: { leader: 'Gordon\u2019s (Diageo)', challengers: ['Hendrick\u2019s (Grant\u2019s)', 'Tanqueray (Diageo)', 'Beefeater (Pernod)'], emerging: ['Whitley Neill', 'Malfy', 'KI NO BI'], insight: 'Mature market. Over 900 brands. Differentiation through serves and provenance essential.' },
    whisky: { leader: 'Johnnie Walker (Diageo)', challengers: ['Jameson (Pernod)', 'Jack Daniel\u2019s (Brown-Forman)', 'Glenfiddich (Grant\u2019s)'], emerging: ['Nc\u2019nean', 'Holyrood', 'Raasay'], insight: 'Scotch dominates but Irish and Japanese growing. English whisky emerging niche.' },
    rum: { leader: 'Captain Morgan (Diageo)', challengers: ['Bacardi', 'Havana Club (Pernod)', 'Kraken'], emerging: ['Equiano', 'Renegade', 'Spirited Union'], insight: 'Spiced dominates volume. Premium dark/aged rum fastest growth. Caribbean provenance valued.' },
    cognac: { leader: 'Hennessy (LVMH)', challengers: ['R\u00e9my Martin', 'Courvoisier (Beam Suntory)', 'Martell (Pernod)'], emerging: ['Hardy', 'Frapin', 'De Luze'], insight: 'Big four dominate 85%+ market. Niche grower/estate cognacs have bartender appeal.' },
    champagne: { leader: 'Mo\u00ebt & Chandon (LVMH)', challengers: ['Veuve Clicquot (LVMH)', 'Laurent-Perrier', 'Pol Roger'], emerging: ['Palmer & Co', 'Lallier', 'Billecart-Salmon'], insight: 'UK is largest Champagne export market. Grower Champagnes trending in top bars.' },
    wine: { leader: 'Casillero del Diablo (Concha y Toro)', challengers: ['Barefoot (Gallo)', 'Yellow Tail (Casella)', 'Jacob\u2019s Creek (Pernod)'], emerging: ['English sparkling (Chapel Down, Nyetimber)', 'Orange wines', 'Natural wines'], insight: 'Duty increase hit margins. English sparkling booming. Bag-in-box gaining share.' },
    beer: { leader: 'Madri (Molson Coors)', challengers: ['Peroni (Asahi)', 'Estrella Damm', 'Heineken'], emerging: ['Lucky Saint (no/lo)', 'Beavertown', 'Deya'], insight: 'World lager dominant trend. Craft consolidation. No/lo beer fastest-growing sub-segment.' },
    nolo: { leader: 'Seedlip (Diageo)', challengers: ['Lyre\u2019s', 'Caleno', 'Lucky Saint'], emerging: ['Three Spirit', 'Days Brewing', 'IMPOSSIBREW'], insight: 'Category grew 31% in 2025. First-taste trial is key. Health/wellness positioning wins.' },
    rtd: { leader: 'White Claw (Mark Anthony)', challengers: ['Smirnoff Ice (Diageo)', 'Gordon\u2019s G&T (Diageo)', 'Jack Daniel\u2019s & Cola'], emerging: ['Served', 'NIO Cocktails', 'Moth'], insight: 'Premium cocktail RTDs growing faster than hard seltzers. Can format preferred.' },
  },
  // Other markets share similar structure \u2014 abbreviated for bundle size
  us: {
    tequila: { leader: 'Patr\u00f3n (Bacardi)', challengers: ['Don Julio (Diageo)', 'Casamigos (Diageo)', '1800 (Proximo)'], emerging: ['Clase Azul', 'Lobos 1707', 'Cincoro'], insight: 'Tequila surpassed vodka in US revenue (2025). Celebrity brands drive growth. 100% agave is baseline expectation.' },
    vodka: { leader: 'Tito\u2019s', challengers: ['Smirnoff (Diageo)', 'New Amsterdam', 'Grey Goose (Bacardi)'], emerging: ['Hanson of Sonoma', 'Deep Eddy (acquired)'], insight: 'Volume declining. Tito\u2019s dominates value-premium. Flavoured vodka via RTD crossover.' },
    gin: { leader: 'Aviation (Diageo)', challengers: ['Hendrick\u2019s', 'Tanqueray', 'Bombay Sapphire'], emerging: ['Empress 1908', 'Drumshanbo'], insight: 'Gin renaissance driven by cocktail culture. London Dry and contemporary styles.' },
    whisky: { leader: 'Jack Daniel\u2019s (Brown-Forman)', challengers: ['Crown Royal (Diageo)', 'Maker\u2019s Mark (Beam Suntory)', 'Bulleit (Diageo)'], emerging: ['Uncle Nearest', 'Westland', 'Rabbit Hole'], insight: 'American whiskey dominates domestically. Japanese whisky premium niche. Scotch steady.' },
    rum: { leader: 'Bacardi', challengers: ['Captain Morgan (Diageo)', 'Malibu (Pernod)', 'Don Q'], emerging: ['Diplom\u00e1tico', 'Foursquare', 'Plantation'], insight: 'Premium dark rum growing. Spiced/flavoured still volume leader. Latin influence driving category.' },
    cognac: { leader: 'Hennessy (LVMH)', challengers: ['R\u00e9my Martin', 'Courvoisier', 'D\u2019USS\u00c9 (Bacardi)'], emerging: ['Pierre Ferrand', 'Hardy'], insight: 'US is largest cognac market. Hip-hop/culture connection drives awareness. VS/VSOP dominate.' },
    champagne: { leader: 'Mo\u00ebt & Chandon (LVMH)', challengers: ['Veuve Clicquot', 'Dom P\u00e9rignon', 'Perrier-Jou\u00ebt'], emerging: ['Grower Champagnes', 'Krug'], insight: 'US is #2 Champagne market. Prestige cuv\u00e9es outperforming standard brut.' },
    wine: { leader: 'Barefoot (Gallo)', challengers: ['Josh Cellars (Deutsch)', 'Meiomi (Constellation)', 'Kim Crawford'], emerging: ['Natural wine movement', 'Canned wines'], insight: 'DTC booming post-COVID. Premium $15-25 segment growing fastest.' },
    beer: { leader: 'Modelo Especial (Constellation)', challengers: ['Bud Light (AB InBev)', 'Michelob Ultra', 'Coors Light (Molson Coors)'], emerging: ['Athletic Brewing (no/lo)', 'Various craft'], insight: 'Mexican imports #1 growth driver. No/lo beer segment exploding. Craft consolidation.' },
    nolo: { leader: 'Athletic Brewing', challengers: ['Heineken 0.0', 'Lyre\u2019s', 'Seedlip'], emerging: ['Ghia', 'Kin Euphorics', 'Curious Elixirs'], insight: 'US no/lo market growing 35%+ annually. Beer leads spirits alternatives. Wellness positioning key.' },
    rtd: { leader: 'High Noon (Constellation)', challengers: ['White Claw', 'Truly (Boston Beer)', 'Cutwater (AB InBev)'], emerging: ['On The Rocks', 'Tip Top'], insight: 'Spirits-based RTDs outpacing seltzers. Premium cocktail cans trending. Shot-format emerging.' },
  },
}

// Pricing strategy by market
export const PRICING_STRATEGY = {
  uk: { valueRange: '\u00a315\u2013\u00a322', premiumRange: '\u00a325\u2013\u00a340', superPremiumRange: '\u00a342\u2013\u00a365', ultraPremiumRange: '\u00a370+', avgOnTradePour: '\u00a38\u2013\u00a314', avgMarkup: '2.5\u20133.5x on-trade, 30\u201345% off-trade', keyChannels: 'Supermarkets (60% off-trade), independent retailers, on-trade (pubs, bars, restaurants)', tip: 'Supermarket listing fees \u00a35,000\u2013\u00a325,000. Prioritise on-trade first for brand building.' },
  us: { valueRange: '$15\u2013$25', premiumRange: '$30\u2013$50', superPremiumRange: '$55\u2013$80', ultraPremiumRange: '$100+', avgOnTradePour: '$12\u2013$18', avgMarkup: '3\u20135x on-trade, 25\u201340% off-trade (varies by state)', keyChannels: 'Liquor stores, grocery (where permitted), on-trade, DTC (where permitted)', tip: 'Three-tier system adds 30\u201340% to cost. Price backwards from shelf to ensure margin.' },
  spain: { valueRange: '\u20ac8\u2013\u20ac15', premiumRange: '\u20ac18\u2013\u20ac35', superPremiumRange: '\u20ac40\u2013\u20ac60', ultraPremiumRange: '\u20ac75+', avgOnTradePour: '\u20ac6\u2013\u20ac12', avgMarkup: '2\u20133x on-trade, 25\u201335% off-trade', keyChannels: 'Horeca (bars/restaurants dominant), supermarkets (Mercadona, Carrefour)', tip: 'Spain is price-sensitive. On-trade drives premiumisation. Gin-tonic culture creates opportunities.' },
  france: { valueRange: '\u20ac10\u2013\u20ac18', premiumRange: '\u20ac22\u2013\u20ac40', superPremiumRange: '\u20ac45\u2013\u20ac70', ultraPremiumRange: '\u20ac80+', avgOnTradePour: '\u20ac8\u2013\u20ac15', avgMarkup: '3\u20134x on-trade, 30\u201340% off-trade', keyChannels: 'Cavistes (specialist retailers), CHR (caf\u00e9s-h\u00f4tels-restaurants), grande distribution', tip: 'Loi \u00c9vin severely limits marketing. Product quality and trade relationships are paramount.' },
  germany: { valueRange: '\u20ac10\u2013\u20ac18', premiumRange: '\u20ac20\u2013\u20ac35', superPremiumRange: '\u20ac40\u2013\u20ac60', ultraPremiumRange: '\u20ac70+', avgOnTradePour: '\u20ac7\u2013\u20ac12', avgMarkup: '2.5\u20133.5x on-trade, 25\u201335% off-trade', keyChannels: 'Getr\u00e4nkem\u00e4rkte, discount retail (Aldi, Lidl), on-trade, online', tip: 'Germany is price-conscious. Discount retail is massive. Premium positioning requires strong story.' },
  japan: { valueRange: '\u00a52,000\u2013\u00a53,500', premiumRange: '\u00a54,000\u2013\u00a58,000', superPremiumRange: '\u00a510,000\u2013\u00a520,000', ultraPremiumRange: '\u00a525,000+', avgOnTradePour: '\u00a51,200\u2013\u00a52,500', avgMarkup: '3\u20135x on-trade, 30\u201340% off-trade', keyChannels: 'Convenience stores (massive), department stores, on-trade (bars, izakaya), online', tip: 'Convenience stores (7-Eleven, Lawson) are the biggest off-trade channel. Premium packaging essential.' },
  australia: { valueRange: 'A$35\u2013A$50', premiumRange: 'A$55\u2013A$80', superPremiumRange: 'A$90\u2013A$130', ultraPremiumRange: 'A$150+', avgOnTradePour: 'A$14\u2013A$22', avgMarkup: '3\u20134x on-trade, 30\u201340% off-trade', keyChannels: 'Dan Murphy\u2019s (dominant), BWS, independent bottle shops, on-trade', tip: 'Dan Murphy\u2019s listing is essential for off-trade reach. WET (Wine Equalisation Tax) affects wine pricing.' },
  uae: { valueRange: 'AED 80\u2013AED 150', premiumRange: 'AED 180\u2013AED 350', superPremiumRange: 'AED 400\u2013AED 700', ultraPremiumRange: 'AED 800+', avgOnTradePour: 'AED 50\u2013AED 100', avgMarkup: '4\u20136x on-trade, 40\u201360% off-trade', keyChannels: 'Hotel bars/restaurants, duty-free, MMI/A&E retail shops', tip: '50% excise tax inflates prices. Duty-free channel offers better margin. Tourism drives consumption.' },
  india: { valueRange: '\u20b91,500\u2013\u20b92,500', premiumRange: '\u20b93,000\u2013\u20b95,000', superPremiumRange: '\u20b96,000\u2013\u20b915,000', ultraPremiumRange: '\u20b920,000+', avgOnTradePour: '\u20b9500\u2013\u20b92,000', avgMarkup: '3\u20135x on-trade, 25\u201340% off-trade (state-dependent)', keyChannels: 'State-run liquor stores (many states), bars/restaurants, duty-free, e-commerce (limited)', tip: '150% customs duty means pricing strategy is critical. Each state is essentially a separate market.' },
  brazil: { valueRange: 'R$80\u2013R$150', premiumRange: 'R$180\u2013R$350', superPremiumRange: 'R$400\u2013R$700', ultraPremiumRange: 'R$800+', avgOnTradePour: 'R$30\u2013R$80', avgMarkup: '3\u20135x on-trade, 30\u201345% off-trade', keyChannels: 'Supermarkets (P\u00e3o de A\u00e7\u00facar, Carrefour), bars/restaurants, e-commerce (growing fast)', tip: 'Tax cascade makes imported spirits expensive. Cacha\u00e7a dominates volume. Premium imports = status symbol.' },
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
  currency: { uk: '\u00a3', us: '$', spain: '\u20ac', france: '\u20ac', germany: '\u20ac', japan: '\u00a5', australia: 'A$', uae: 'AED', india: '\u20b9', brazil: 'R$' },
}
