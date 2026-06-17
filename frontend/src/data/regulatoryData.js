// Regulatory Compliance Checker — market-specific requirements
// Re-exports and extends marketEntryData for standalone compliance view

export { MARKET_REGULATIONS, TARGET_MARKETS_WIZARD } from './marketEntryData'

export const LABELLING_REQUIREMENTS = {
  uk: {
    mandatory: ['Product name', 'ABV (% vol)', 'Volume (ml/cl/l)', 'Country of origin', 'Name and address of UK importer', 'Allergens (sulphites, gluten)', 'Lot number/batch code'],
    upcoming: ['Calorie/nutritional information (voluntary but expected)', 'Ingredient listing (EU regulation alignment)', 'QR code to digital label (industry push)'],
    format: 'English language. Minimum font size 1.2mm for mandatory info.',
    deadline: 'Current requirements in force. EU-alignment labelling TBC 2027.',
  },
  us: {
    mandatory: ['Brand name', 'Class/type designation', 'ABV (% alcohol by volume)', 'Net contents', 'Name and address of bottler/importer', 'Country of origin', 'Government health warning (Surgeon General’s)', 'FD&C colour additives (if used)'],
    upcoming: ['Serving facts panel (TTB proposed rule)', 'Allergen declarations (TTB proposed)', 'Digital/QR label options under review'],
    format: 'English required. TTB-specific format. COLA approval needed for every label.',
    deadline: 'Serving facts rule expected 2027. COLA processing: 4–6 months.',
  },
  spain: {
    mandatory: ['Product denomination', 'ABV', 'Volume', 'Country of origin', 'Importer name and address', 'Lot number', 'Allergens', 'Denominación de Origen (where applicable)'],
    upcoming: ['Full ingredient listing (EU Regulation, from June 2026)', 'Calorie/nutritional information (June 2026)', 'Digital labelling via QR code (accepted from 2026)'],
    format: 'Spanish language mandatory. EU regulation 1169/2011 format.',
    deadline: 'June 2026 for ingredient/calorie labelling.',
  },
  france: {
    mandatory: ['Product name', 'ABV', 'Volume', 'Country of origin', 'Bottler/importer details', 'Allergens', 'Pregnancy pictogram ("Femme enceinte")', 'CRD fiscal capsule', 'Lot number'],
    upcoming: ['Full ingredient listing (June 2026)', 'Calorie/nutritional information (June 2026)', 'Recycling/Triman logo'],
    format: 'French language mandatory. Loi Évin health messaging compliance.',
    deadline: 'June 2026 for EU-wide ingredient/calorie labelling.',
  },
  germany: {
    mandatory: ['Product name', 'ABV', 'Volume', 'Country of origin', 'Importer details', 'Allergens', 'Lot number', 'Pfand (deposit) marking for applicable bottles'],
    upcoming: ['Ingredient listing (June 2026)', 'Calorie information (June 2026)', 'Extended producer responsibility markings'],
    format: 'German language required. EU + German-specific additions.',
    deadline: 'June 2026 for ingredient/calorie. Pfand rules already in force.',
  },
  japan: {
    mandatory: ['Product name (Japanese)', 'Ingredients list (JAS format)', 'ABV', 'Volume', 'Country of origin', 'Importer name and address', 'Recycling marks (PET/glass/aluminum)', 'Best-before date (some categories)'],
    upcoming: ['Enhanced allergen declarations', 'Calorie information (voluntary but increasing)'],
    format: 'Japanese language mandatory. JAS and Food Labelling Act standards.',
    deadline: 'Current requirements in force. Enhanced allergens TBC.',
  },
  australia: {
    mandatory: ['Product name', 'ABV', 'Standard drinks statement', 'Volume', 'Country of origin', 'Allergens', 'Pregnancy warning label (from July 2024)', 'Recycling marks', 'Lot number'],
    upcoming: ['Enhanced pregnancy warning (updated pictogram)', 'Potential calorie labelling', 'QR code digital label pilot'],
    format: 'English. FSANZ (Food Standards Australia New Zealand) format.',
    deadline: 'Pregnancy warning label mandatory from July 2024 (3-year transition).',
  },
  uae: {
    mandatory: ['Product name (Arabic + English)', 'ABV', 'Volume', 'Country of origin', 'Importer details', 'Batch/lot number', 'Ingredients', 'Barcode'],
    upcoming: ['Enhanced labelling requirements under review', 'ESMA compliance updates'],
    format: 'Arabic and English bilingual. Dubai Municipality / ESMA standards.',
    deadline: 'Current requirements in force.',
  },
  india: {
    mandatory: ['Product name', 'ABV', 'Volume', 'MRP (Maximum Retail Price) on label', 'Country of origin', 'FSSAI licence number', 'Batch/lot number', 'BIS mark (where applicable)', 'Ingredients', 'Date of manufacture/packaging'],
    upcoming: ['State-specific QR code tracking', 'Enhanced anti-counterfeiting measures'],
    format: 'English + Hindi (or relevant local language). FSSAI format.',
    deadline: 'MRP and FSSAI requirements already mandatory.',
  },
  brazil: {
    mandatory: ['Product name (Portuguese)', 'ABV', 'Volume', 'Country of origin', 'Importer details (CNPJ number)', 'ANVISA registration number', 'Ingredients', 'Pregnancy warning', 'Recycling symbols', 'Lot number', 'Expiry date (for some categories)'],
    upcoming: ['Front-of-pack nutritional warnings', 'Enhanced recycling markings'],
    format: 'Portuguese mandatory. ANVISA + MAPA compliance.',
    deadline: 'Current requirements in force. Front-of-pack TBC 2027.',
  },
}

export const IMPORT_PROCESS_STEPS = {
  uk: [
    { step: 1, title: 'AWRS Registration', duration: '45 days', cost: '£free (HMRC)', detail: 'Register with HMRC under Alcohol Wholesaler Registration Scheme.' },
    { step: 2, title: 'Excise Warehouse Approval', duration: '30–60 days', cost: '£5,000–£10,000 (bond)', detail: 'Approve bonded warehouse or use existing approved facility.' },
    { step: 3, title: 'Label Compliance', duration: '2–4 weeks', cost: '£1,000–£3,000', detail: 'Review labels against UK requirements. Engage compliance consultant.' },
    { step: 4, title: 'Customs Registration', duration: '5–10 days', cost: 'Free', detail: 'Register for EORI number and customs declarations.' },
    { step: 5, title: 'First Shipment', duration: '2–6 weeks (EU) / 6–12 weeks (non-EU)', cost: 'Variable', detail: 'Ship to bonded warehouse. Clear customs. Pay duty on release.' },
  ],
  us: [
    { step: 1, title: 'TTB Basic Permit', duration: '2–4 months', cost: '$0 (application free)', detail: 'Apply for Importer’s Basic Permit from TTB.' },
    { step: 2, title: 'COLA Application', duration: '4–6 months', cost: '$0 (but label redesign may cost $2,000+)', detail: 'Certificate of Label Approval for each product expression.' },
    { step: 3, title: 'State Licences', duration: '1–3 months per state', cost: '$500–$5,000 per state', detail: 'Apply for distribution licence in each target state.' },
    { step: 4, title: 'Distributor Agreement', duration: '1–2 months', cost: 'N/A (terms negotiation)', detail: 'Secure distribution partnership. Three-tier system mandatory.' },
    { step: 5, title: 'FDA Registration', duration: '1–2 weeks', cost: 'Free', detail: 'Register foreign facility with FDA if producing outside US.' },
  ],
  spain: [
    { step: 1, title: 'Excise Registration', duration: '2–4 weeks', cost: '€500–€1,000 (admin)', detail: 'Register with Agencia Tributaria for excise obligations.' },
    { step: 2, title: 'Label Review', duration: '1–2 weeks', cost: '€500–€1,500', detail: 'Ensure EU Reg 1169/2011 compliance. Spanish language check.' },
    { step: 3, title: 'Distributor Selection', duration: '2–8 weeks', cost: 'N/A', detail: 'Select and agree terms with Spanish distributor.' },
    { step: 4, title: 'Customs Clearance', duration: '1–2 weeks (EU) / 3–4 weeks (non-EU)', cost: 'Variable', detail: 'Clear goods through Spanish customs. Pay applicable duties.' },
  ],
  france: [
    { step: 1, title: 'Déclaration Préalable', duration: '2–4 weeks', cost: '€500 (admin)', detail: 'Professional declaration for alcohol wholesale/distribution.' },
    { step: 2, title: 'CRD Fiscal Capsule', duration: '3–6 weeks', cost: '€0.02–0.05/bottle', detail: 'Order Capsule Représentative de Droit from approved supplier.' },
    { step: 3, title: 'Label Compliance', duration: '2–4 weeks', cost: '€1,000–€3,000', detail: 'French language, pregnancy pictogram, Loi Évin compliance.' },
    { step: 4, title: 'Customs & Excise', duration: '1–2 weeks', cost: 'Variable (excise rates apply)', detail: 'Clear customs. Pay excise duty. EMCS documentation.' },
  ],
}
