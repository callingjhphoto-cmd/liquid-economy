// Brand Health Monitor — mock tracking data for demonstration

export const TRACKABLE_BRANDS = [
  { id: 'patron', name: 'Patr\u00f3n', category: 'tequila', parent: 'Bacardi' },
  { id: 'hendricks', name: 'Hendrick\u2019s', category: 'gin', parent: 'William Grant & Sons' },
  { id: 'johnnie-walker', name: 'Johnnie Walker', category: 'whisky', parent: 'Diageo' },
  { id: 'bacardi', name: 'Bacardi', category: 'rum', parent: 'Bacardi Limited' },
  { id: 'grey-goose', name: 'Grey Goose', category: 'vodka', parent: 'Bacardi' },
  { id: 'hennessy', name: 'Hennessy', category: 'cognac', parent: 'LVMH' },
  { id: 'moet', name: 'Mo\u00ebt & Chandon', category: 'champagne', parent: 'LVMH' },
  { id: 'seedlip', name: 'Seedlip', category: 'nolo', parent: 'Diageo' },
  { id: 'white-claw', name: 'White Claw', category: 'rtd', parent: 'Mark Anthony Brands' },
  { id: 'barefoot', name: 'Barefoot', category: 'wine', parent: 'E. & J. Gallo' },
  { id: 'heineken', name: 'Heineken', category: 'beer', parent: 'Heineken N.V.' },
  { id: 'don-julio', name: 'Don Julio', category: 'tequila', parent: 'Diageo' },
  { id: 'tanqueray', name: 'Tanqueray', category: 'gin', parent: 'Diageo' },
  { id: 'absolut', name: 'Absolut', category: 'vodka', parent: 'Pernod Ricard' },
  { id: 'jack-daniels', name: 'Jack Daniel\u2019s', category: 'whisky', parent: 'Brown-Forman' },
]

// Generate 12-month mock data for each brand
function generateMonthlyData(baseValue, volatility, trend) {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  return months.map((month, i) => {
    const trendFactor = 1 + (trend * i / 12)
    const noise = 1 + (Math.sin(i * 1.5) * volatility)
    const seasonal = 1 + (i >= 9 ? 0.15 : i >= 5 && i <= 7 ? 0.08 : 0)
    return {
      month,
      value: Math.round(baseValue * trendFactor * noise * seasonal),
    }
  })
}

export const BRAND_HEALTH_DATA = {
  'patron': {
    socialMentions: generateMonthlyData(45000, 0.12, 0.18),
    searchTrend: generateMonthlyData(78, 0.08, 0.12),
    reviewSentiment: generateMonthlyData(82, 0.03, 0.02),
    shareOfVoice: 28,
    avgSentiment: 82,
    totalMentions: '540K',
    trendDirection: 'up',
    topMentionSources: [
      { source: 'Instagram', share: 38, trend: '+5%' },
      { source: 'X (Twitter)', share: 24, trend: '+2%' },
      { source: 'TikTok', share: 22, trend: '+15%' },
      { source: 'Reddit', share: 10, trend: '+8%' },
      { source: 'YouTube', share: 6, trend: '+3%' },
    ],
    recentHighlights: [
      'Featured in 3 Michelin-star cocktail menus (+12% mention spike)',
      'Celebrity endorsement campaign drove 45% TikTok increase',
      'New expression launch generated 8,000+ reviews in first month',
    ],
  },
  'hendricks': {
    socialMentions: generateMonthlyData(32000, 0.10, 0.08),
    searchTrend: generateMonthlyData(65, 0.07, 0.05),
    reviewSentiment: generateMonthlyData(85, 0.02, 0.01),
    shareOfVoice: 18,
    avgSentiment: 85,
    totalMentions: '384K',
    trendDirection: 'stable',
    topMentionSources: [
      { source: 'Instagram', share: 42, trend: '+3%' },
      { source: 'X (Twitter)', share: 22, trend: '-1%' },
      { source: 'TikTok', share: 18, trend: '+12%' },
      { source: 'Reddit', share: 12, trend: '+5%' },
      { source: 'YouTube', share: 6, trend: '+2%' },
    ],
    recentHighlights: [
      'Cucumber & Rose narrative remains strong in premium on-trade',
      'Orbium expression gaining traction in cocktail bars',
      'Garden-party seasonal campaigns driving summer mentions',
    ],
  },
  'johnnie-walker': {
    socialMentions: generateMonthlyData(120000, 0.15, 0.06),
    searchTrend: generateMonthlyData(92, 0.05, 0.03),
    reviewSentiment: generateMonthlyData(78, 0.04, 0.01),
    shareOfVoice: 35,
    avgSentiment: 78,
    totalMentions: '1.44M',
    trendDirection: 'up',
    topMentionSources: [
      { source: 'Instagram', share: 30, trend: '+4%' },
      { source: 'X (Twitter)', share: 28, trend: '+1%' },
      { source: 'TikTok', share: 20, trend: '+18%' },
      { source: 'YouTube', share: 15, trend: '+6%' },
      { source: 'Reddit', share: 7, trend: '+3%' },
    ],
    recentHighlights: [
      'Blue Label remains top gifting choice globally',
      'F1 sponsorship driving massive brand awareness',
      'High Ball serves trending in Asian markets',
    ],
  },
  'bacardi': {
    socialMentions: generateMonthlyData(85000, 0.13, 0.04),
    searchTrend: generateMonthlyData(70, 0.06, 0.02),
    reviewSentiment: generateMonthlyData(74, 0.04, -0.01),
    shareOfVoice: 30,
    avgSentiment: 74,
    totalMentions: '1.02M',
    trendDirection: 'stable',
    topMentionSources: [
      { source: 'Instagram', share: 32, trend: '+2%' },
      { source: 'X (Twitter)', share: 26, trend: '-2%' },
      { source: 'TikTok', share: 24, trend: '+14%' },
      { source: 'YouTube', share: 12, trend: '+4%' },
      { source: 'Reddit', share: 6, trend: '+1%' },
    ],
    recentHighlights: [
      'RTD launches driving brand mentions in new demographics',
      'Summer campaign "Do What Moves You" generating engagement',
      'Music festival sponsorships maintaining awareness',
    ],
  },
  'grey-goose': {
    socialMentions: generateMonthlyData(38000, 0.11, 0.10),
    searchTrend: generateMonthlyData(60, 0.07, 0.06),
    reviewSentiment: generateMonthlyData(80, 0.03, 0.02),
    shareOfVoice: 22,
    avgSentiment: 80,
    totalMentions: '456K',
    trendDirection: 'up',
    topMentionSources: [
      { source: 'Instagram', share: 40, trend: '+6%' },
      { source: 'X (Twitter)', share: 20, trend: '+1%' },
      { source: 'TikTok', share: 22, trend: '+16%' },
      { source: 'YouTube', share: 12, trend: '+5%' },
      { source: 'Reddit', share: 6, trend: '+2%' },
    ],
    recentHighlights: [
      'Luxury repositioning gaining traction on social media',
      'Espresso Martini trend driving brand visibility',
      'Hotel partnerships boosting travel retail presence',
    ],
  },
}

// Default data for brands not in detailed mock set
export const DEFAULT_BRAND_DATA = {
  socialMentions: generateMonthlyData(20000, 0.10, 0.05),
  searchTrend: generateMonthlyData(50, 0.08, 0.03),
  reviewSentiment: generateMonthlyData(75, 0.03, 0.01),
  shareOfVoice: 10,
  avgSentiment: 75,
  totalMentions: '240K',
  trendDirection: 'stable',
  topMentionSources: [
    { source: 'Instagram', share: 35, trend: '+3%' },
    { source: 'X (Twitter)', share: 25, trend: '+1%' },
    { source: 'TikTok', share: 20, trend: '+10%' },
    { source: 'YouTube', share: 12, trend: '+4%' },
    { source: 'Reddit', share: 8, trend: '+2%' },
  ],
  recentHighlights: [
    'Steady brand awareness in core markets',
    'Social media engagement growing year-over-year',
    'Category trends supporting brand visibility',
  ],
}
