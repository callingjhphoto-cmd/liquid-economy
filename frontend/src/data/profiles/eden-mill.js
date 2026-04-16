/**
 * eden-mill.js
 * Eden Mill / Edinburgh Distilling Co. \u2014 brand-owner archetype
 * Generated: April 2026
 *
 * DATA PROVENANCE
 * All figures from Liquid Economy Gin Category Intelligence page + Eden Mill fitness review
 * (~/Documents/Claude/projects/liquid/eden_mill_fitness_review.md, 16 April 2026)
 * Demographics from src/data/spiritsDemographicsData.js (gin section)
 * Market sizing: $26B, 4.72% CAGR to 2031 (Gin Category Intelligence page)
 */

// ---------------------------------------------------------------------------
// CATEGORY SNAPSHOT DATA
// Sub-category shares + CAGR from Gin Category Intelligence, Liquid Economy
// ---------------------------------------------------------------------------
const categorySnapshot = {
  category: 'Gin',
  marketSize: '$26B global (2025)',
  cagr: '4.72% CAGR to 2031',
  source: 'Liquid Economy Gin Category Intelligence \u2014 IWSR, Drinks International',
  linkTo: '/categories?category=gin',
  subCategories: [
    {
      name: 'London Dry',
      share: '52%',
      trend: 'Mature / saturated',
      notes: 'Category anchor but growth stalled. Premium sub-segment -5% CAGR 2023\u20132028 in UK.',
    },
    {
      name: 'Flavoured / Pink',
      share: '~20% (declining)',
      trend: 'Declining \u2212 50% from 2020 peak',
      notes: 'Love Gin directly exposed. Demographic skews younger, lower-income. Saturation confirmed.',
    },
    {
      name: 'Old Tom',
      share: 'Small but growing',
      trend: '+5.12% CAGR',
      notes: 'Adjacent escape route from flavoured decline. Botanical complexity, premium craft positioning.',
    },
    {
      name: 'Contemporary / Craft',
      share: 'Growing',
      trend: 'Rising',
      notes: 'Small-batch, provenance-led. Eden Mill Original fits here. Gifting + on-trade premium.',
    },
  ],
  regionalSignals: [
    { market: 'UK', signal: '\u221213% volume YoY 2023\u20132024. Excise 70% of bottle cost. Premium off-trade resilient.', direction: 'caution' },
    { market: 'Japan', signal: '+14% CAGR. Scottish provenance premium. Golf + academia narrative strong.', direction: 'opportunity' },
    { market: 'Spain', signal: '\u221216% premium volume 2023. On-trade weakness.', direction: 'caution' },
    { market: 'Germany', signal: 'Craft gin growth. Independent retail channel open. St Andrews provenance translates.', direction: 'watch' },
  ],
}

// ---------------------------------------------------------------------------
// COMPETITOR WATCH DATA
// Source: fitness review Q10 + public brand knowledge. No volume data available
// (RED gap in fitness review \u2014 TTB/HMRC import data would fill this)
// ---------------------------------------------------------------------------
const competitorWatch = {
  note: 'Brand-level volume data not yet available. Gap flagged in Eden Mill fitness review (Q10). TTB/HMRC import data ingestion is Priority 2 (Q3 2026).',
  competitors: [
    {
      name: 'Hendrick\u2019s',
      owner: 'William Grant & Sons',
      positioning: 'Eccentric British luxury. Cucumber + rose botanicals. £28\u2013£32 RRP.',
      threat: 'Direct competitor in UK premium off-trade + on-trade. Strong gifting presence.',
      signal: 'Watch: potential Scotland regional push; existing golf adjacency (St Andrews overlap risk).',
      colour: '#6d28d9',
    },
    {
      name: 'Monkey 47',
      owner: 'Pernod Ricard',
      positioning: 'Black Forest provenance. 47 botanicals, 47% ABV. £40+ RRP.',
      threat: 'Competes in complexity-seeking segment Eden Mill targets with botanical pivot.',
      signal: 'Defines the botanical complexity ceiling. Pricing benchmark for NPD.',
      colour: '#374151',
    },
    {
      name: 'Sipsmith',
      owner: 'Beam Suntory',
      positioning: 'London provenance, artisanal. VJOP (Very Junipery Over Proof). £28\u2013£35.',
      threat: 'Overlaps 35\u201350 affluent urban UK drinker. Strong gifting + on-trade.',
      signal: 'Beam Suntory distribution gives UK on-trade scale Eden Mill lacks.',
      colour: '#b45309',
    },
    {
      name: 'Silent Pool',
      owner: 'Independent (Surrey)',
      positioning: 'Surrey provenance. Lavender + chamomile. £35\u2013£40 RRP.',
      threat: 'Similar provenance-led craft positioning. Female-skewed marketing.',
      signal: 'Watch botanical narrative \u2014 similar NPD approach to proposed Eden Mill pivot.',
      colour: '#0f766e',
    },
    {
      name: 'Edinburgh Gin',
      owner: 'Ian Macleod Distillers',
      positioning: 'Scottish provenance, city heritage. £26\u2013£30 RRP.',
      threat: 'Closest Scottish competitor. Direct substitute for Eden Mill Original in off-trade.',
      signal: 'Higher distribution breadth in UK supermarkets. Watch pricing moves.',
      colour: '#1e40af',
    },
    {
      name: 'The Botanist',
      owner: 'R\u00e9my Cointreau',
      positioning: 'Islay provenance. 22 hand-foraged Islay botanicals. £35\u2013£40.',
      threat: 'Premium Scottish gin benchmark. R\u00e9my Cointreau distribution = global scale.',
      signal: 'Strongest comparator for Japan entry \u2014 R\u00e9my already active in Japanese market.',
      colour: '#065f46',
    },
  ],
}

// ---------------------------------------------------------------------------
// MARKET INTEL DATA
// Source: Gin Category Intelligence page + fitness review
// ---------------------------------------------------------------------------
const marketIntel = {
  markets: [
    {
      name: 'UK',
      signal: 'Home market under pressure',
      metrics: [
        { label: 'Volume trend', value: '\u221213% YoY 2023\u20132024' },
        { label: 'Premium CAGR', value: '\u22125% (2023\u20132028)' },
        { label: 'Excise burden', value: '70% of bottle cost' },
        { label: 'Channel', value: 'Off-trade resilient; on-trade declining' },
      ],
      recommendation: 'Defend off-trade premium shelf. Gift-set strategy for 55+ home occasion. Reduce on-trade over-dependency.',
      linkTo: '/geographic',
      colour: '#1e40af',
    },
    {
      name: 'Japan',
      signal: 'Highest growth opportunity',
      metrics: [
        { label: 'Gin CAGR', value: '+14% (strongest global region)' },
        { label: 'Consumer', value: '35\u201355, HHI \u00a57M+, golf + whisky affinity' },
        { label: 'Provenance premium', value: 'Scottish authenticity commands +30% RRP vs generic craft' },
        { label: 'Entry route', value: 'Travel retail + whisky importer distribution' },
      ],
      recommendation: 'Prioritise travel retail (duty-free). Partner with Scotch whisky importers. St Andrews Golf Edition limited release.',
      linkTo: '/geographic',
      colour: '#0f766e',
    },
    {
      name: 'Germany',
      signal: 'Craft gin white space',
      metrics: [
        { label: 'Market', value: 'Independent retail + bars open to UK craft' },
        { label: 'Consumer', value: '30\u201345, craft-spirits literate, heritage-brand affinity' },
        { label: 'Provenance', value: 'Scottish/Scottish-adjacent performs well (Monkey 47 precedent)' },
        { label: 'Barrier', value: 'Distribution network needed' },
      ],
      recommendation: 'Low-cost test market via specialist retailers and on-trade. No major investment until UK stabilised.',
      linkTo: '/geographic',
      colour: '#6d28d9',
    },
  ],
}

// ---------------------------------------------------------------------------
// DEMOGRAPHICS LENS
// Source: spiritsDemographicsData.js (gin section) + fitness review Q2
// ---------------------------------------------------------------------------
const demographicsLens = {
  category: 'Gin',
  source: 'Liquid Economy Spirits Demographics \u2014 IWSR, WSTA, Drinks International, YouGov',
  linkTo: '/categories?category=gin',
  highlights: [
    {
      segment: 'UK 55+ at home',
      signal: 'Highest volume gin occasion',
      detail: 'Premium home entertaining, gifting, evening serve. HHI >£50K. Heritage-brand affinity. Post-pandemic home permanence.',
      relevance: 'Eden Mill Original sweet spot. Underserved by current marketing skewed to younger cohort.',
      colour: '#0f766e',
    },
    {
      segment: 'UK on-trade: 70% female',
      signal: 'Gender split skews female in bars',
      detail: 'UK gin on-trade skews 70% female (YouGov/IWSR). US skews 68% male. Italian market 50/50.',
      relevance: 'Love Gin female skew aligned. But flavoured decline means demographic is migrating \u2014 not lost, just moving to premium adjacent.',
      colour: '#6d28d9',
    },
    {
      segment: 'Under-34 (US): 42%',
      signal: 'Younger cohort strong in US, declining in UK',
      detail: 'US under-34 gin = 42% of volume. UK under-34 declining as flavoured segment collapses. Gen X Canada = 62%.',
      relevance: 'US expansion: younger consumer opportunity. UK: shift focus to Gen X + Boomer home occasion.',
      colour: '#b45309',
    },
    {
      segment: 'Income: above average',
      signal: 'Gin HHI ~$20K above US average',
      detail: 'US gin buyers earn ~$20K above national average. Premium positioning defensible. Price elasticity moderate.',
      relevance: 'Premium NPD (Old Tom, barrel-aged) viable if correctly positioned. Avoid race-to-bottom on RRP.',
      colour: '#1e40af',
    },
  ],
}

// ---------------------------------------------------------------------------
// OPPORTUNITY RADAR (3 narratives)
// Source: fitness review Section 6 (Three Commercial Narratives)
// eden_mill_fitness_review.md, 16 April 2026
// ---------------------------------------------------------------------------
const opportunityRadar = [
  {
    id: 'reclaim-55plus',
    signal: 'Reclaim 55+ at Home',
    urgency: 'Act now \u2014 window is open, under-addressed by all UK gin brands',
    signalDetail: 'UK gin volume \u221213% YoY, but 55+ demographic holds highest volume at home \u2014 premium, gifting, and entertaining occasions. London Dry premium mature, but home occasion expanding in affluent demographics. Excise 70% of bottle cost makes off-trade the margin channel.',
    adjacency: 'Premium home entertaining (Aperol adjacent, but gin). Gifting (heirloom bottle narrative). Post-pandemic permanent home entertaining culture.',
    demographic: '55+, UK, HHI >£50K, entertaining hosts, premium gifting intent, heritage-brand affinity, golf + academia interest.',
    product: 'Eden Mill Original (existing, repositioned): St Andrews heritage, premium entertaining narrative, gift-ready packaging. Secondary: limited-edition barrel-aged Old Tom expression.',
    brief: '"St Andrews Entertaining" campaign: reposition Eden Mill Original from craft curiosity to essential for the entertaining host. Visual: elegant home, garden entertaining, peers approving. Social proof: golf, academia, heritage. Tagline: "The gin guests remember." Liquid Creative executes.',
    reallocation: '60% off-trade (supermarket premium shelf, gift sets, online grocery) \u2022 20% social (Instagram/Pinterest, home entertaining/garden) \u2022 20% on-trade premium (hotels, private clubs, golf clubs)',
    colour: '#0f766e',
  },
  {
    id: 'japan-entry',
    signal: 'Japan Entry \u2014 St Andrews Provenance',
    urgency: 'High urgency \u2014 Japanese gin white space closing 2026\u20132028 as Scotch brands pivot',
    signalDetail: 'Japan gin market +14% CAGR (strongest global region). Scottish whisky dominates Japan via heritage narrative and collectibility. Gin white space exists: Japanese consumers prize Scottish authenticity, golf, and academia. St Andrews = global golf pilgrimage site, highest brand recognition in Japan after Royal & Ancient.',
    adjacency: 'Scottish authenticity (whisky entry point), golf tourism (St Andrews pilgrimage), academic heritage (university town narrative). All three resonate with target Japanese consumer.',
    demographic: 'Japan 35\u201355, HHI \u00a57M+, golf enthusiasts, single-malt Scotch buyers, premium gifting culture, heritage brand collectors.',
    product: 'Eden Mill Original or new expression: St Andrews Golf Edition, limited release. Premium positioning \u00a56,000\u20138,000 RRP (~£40\u201350). Travel retail SKU with course-specific provenance story.',
    brief: '"Gateway to St Andrews" campaign: position Eden Mill as the gin of St Andrews provenance. Visual: golf, historic college buildings, Scottish mist. Partner with golf tourism operators, Scotch whisky importers, and premium Japanese retailers. Liquid Creative executes brand identity and collateral for Japan market.',
    reallocation: '50% travel retail (duty-free, airport, Japanese airport lounges) \u2022 30% on-trade premium (hotels, golf clubs, whisky bars) \u2022 20% social + influencer (golf lifestyle, travel, heritage)',
    colour: '#1e40af',
  },
  {
    id: 'post-flavoured-pivot',
    signal: 'Post-Flavoured Pivot \u2014 Love Gin Repositioning',
    urgency: 'Act within 12 months \u2014 Love Gin in declining segment; Old Tom window open now',
    signalDetail: 'Flavoured gin \u221250% from 2020 peak. Love Gin caught in collapsing segment. Old Tom +5.12% CAGR signals adjacent escape route: botanical complexity, herbal intrigue, premium craft (not "fun pink gin" but "craft botanist\u2019s expression"). Competitor NPD pipeline confirming same direction (Hendrick\u2019s, Edinburgh Gin both launching botanical complexity expressions).',
    adjacency: 'Craft spirits (Monkey 47, Hendrick\u2019s botanical complexity), herbal aperitifs (Aperol/Campari adjacent), botanical wellness (herbal tea crossover), mixology-forward culture.',
    demographic: '35\u201350, affluent, Instagram-native, wellness-curious, craft-spirits buyer, adventurous drinker. Occasion: cocktail base, experimental mixology, dinner aperitif.',
    product: 'Love Gin repositioned: rename or rebrand as "Eden Mill Botanicals" or "St Andrews Apothecary Edition." Upgrade to 42% ABV, emphasise 20+ botanicals, premium packaging (dark glass, apothecary aesthetic). RRP £35\u201340.',
    brief: '"Craft Botanist" campaign: shift narrative from fun pink gin to complex herbal gin for curious drinkers. Visual: botanical apothecary, craft/artisanal language, mixology focus. Partner with craft cocktail bars, botanical wellness influencers, and craft-spirit communities. Liquid Creative leads naming, packaging, and launch campaign.',
    reallocation: '40% on-trade (craft cocktail bars, premium venues, bartender education) \u2022 30% social (TikTok/Instagram: mixology, botanical wellness) \u2022 20% off-trade (independent retailers, premium online) \u2022 10% influencer + brand partnerships',
    colour: '#6d28d9',
  },
]

// ---------------------------------------------------------------------------
// PROFILE EXPORT
// ---------------------------------------------------------------------------
const edenMillProfile = {
  slug: 'eden-mill',
  name: 'Eden Mill \u2014 Gin & Whisky Intelligence',
  archetype: 'brand-owner',
  client: {
    name: 'Eden Mill / Edinburgh Distilling Co.',
    website: 'https://edenmill.com',
    primaryContact: null,
  },
  scope: {
    categories: ['gin', 'scotch-whisky'],
    skus: ['Eden Mill Original', 'Love Gin', 'Eden Mill Whisky'],
    markets: ['UK', 'Japan', 'Germany'],
    competitorSet: ['Hendrick\u2019s', 'Monkey 47', 'Sipsmith', 'Silent Pool', 'Edinburgh Gin', 'The Botanist'],
  },
  meta: {
    profileTitle: 'Gin & Whisky Intelligence Profile',
    subtitle: 'Category snapshot, competitor watch, market entry signals, and three commercial narratives for media reallocation',
    lastUpdated: 'April 2026',
    dataFreshness: 'April 2026',
    sourcedFrom: 'Liquid Economy Gin Category Intelligence, IWSR, SWA, WSTA, Drinks International, YouGov, Eden Mill fitness review (16 April 2026)',
    contactEmail: 'callingjhphoto@gmail.com',
  },
  modules: [
    { type: 'CategorySnapshot', data: categorySnapshot },
    { type: 'CompetitorWatch', data: competitorWatch },
    { type: 'MarketIntel', data: marketIntel },
    { type: 'DemographicsLens', data: demographicsLens },
    { type: 'OpportunityRadar', data: { narratives: opportunityRadar } },
  ],
  narratives: opportunityRadar,
}

export default edenMillProfile
