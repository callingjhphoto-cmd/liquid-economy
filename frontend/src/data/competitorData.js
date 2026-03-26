// Competitor Monitor — tracking data for competitor analysis

export const COMPETITOR_SETS = {
  tequila: {
    brands: [
      { name: 'Patr\u00f3n', parent: 'Bacardi', segment: 'Super-Premium', avgPrice: '\u00a345', marketShare: '18%' },
      { name: 'Don Julio', parent: 'Diageo', segment: 'Super-Premium', avgPrice: '\u00a342', marketShare: '15%' },
      { name: 'Casamigos', parent: 'Diageo', segment: 'Premium', avgPrice: '\u00a338', marketShare: '12%' },
      { name: '1800', parent: 'Proximo', segment: 'Premium', avgPrice: '\u00a328', marketShare: '8%' },
      { name: 'Olmeca', parent: 'Pernod Ricard', segment: 'Standard', avgPrice: '\u00a322', marketShare: '6%' },
    ],
    recentMoves: [
      { date: '2025-11', brand: 'Don Julio', type: 'New Launch', detail: 'Don Julio Alma Miel \u2014 honey-infused expression targeting cocktail bars. RRP \u00a348.', impact: 'high' },
      { date: '2025-09', brand: 'Patr\u00f3n', type: 'Distribution', detail: 'Expanded into 500 additional UK on-trade accounts via new distributor agreement.', impact: 'high' },
      { date: '2025-08', brand: 'Casamigos', type: 'Pricing', detail: 'Price reduced from \u00a342 to \u00a338 in UK off-trade. Aggressive positioning against Patr\u00f3n Silver.', impact: 'medium' },
      { date: '2025-06', brand: '1800', type: 'Marketing', detail: 'Launched UK bartender advocacy programme. 200 bar visits planned in H2 2025.', impact: 'medium' },
      { date: '2025-04', brand: 'Olmeca', type: 'New Launch', detail: 'Olmeca Altos Cristalino launched. Targeting premium casual dining.', impact: 'low' },
    ],
  },
  gin: {
    brands: [
      { name: 'Hendrick\u2019s', parent: 'William Grant', segment: 'Super-Premium', avgPrice: '\u00a330', marketShare: '12%' },
      { name: 'Tanqueray', parent: 'Diageo', segment: 'Premium', avgPrice: '\u00a322', marketShare: '15%' },
      { name: 'Beefeater', parent: 'Pernod Ricard', segment: 'Premium', avgPrice: '\u00a318', marketShare: '10%' },
      { name: 'Bombay Sapphire', parent: 'Bacardi', segment: 'Premium', avgPrice: '\u00a320', marketShare: '11%' },
      { name: 'Gordon\u2019s', parent: 'Diageo', segment: 'Standard', avgPrice: '\u00a314', marketShare: '22%' },
    ],
    recentMoves: [
      { date: '2025-10', brand: 'Hendrick\u2019s', type: 'New Launch', detail: 'Flora Adora limited edition. Floral gin targeting summer G&T occasions.', impact: 'medium' },
      { date: '2025-08', brand: 'Tanqueray', type: 'Marketing', detail: '\u00a35M UK marketing campaign. Charles Tanqueray heritage storytelling.', impact: 'high' },
      { date: '2025-07', brand: 'Bombay Sapphire', type: 'Distribution', detail: 'Premier Cru range expanded to 2,000 additional off-trade outlets.', impact: 'medium' },
      { date: '2025-05', brand: 'Gordon\u2019s', type: 'Pricing', detail: 'Promoted to \u00a312 in major supermarkets. Volume strategy maintained.', impact: 'high' },
      { date: '2025-03', brand: 'Beefeater', type: 'New Launch', detail: 'Beefeater Blood Orange permanent line extension. Targeting younger demographic.', impact: 'medium' },
    ],
  },
  whisky: {
    brands: [
      { name: 'Johnnie Walker', parent: 'Diageo', segment: 'Multi-tier', avgPrice: '\u00a325\u2013\u00a3200+', marketShare: '20%' },
      { name: 'Jameson', parent: 'Pernod Ricard', segment: 'Premium', avgPrice: '\u00a325', marketShare: '12%' },
      { name: 'Glenfiddich', parent: 'William Grant', segment: 'Super-Premium', avgPrice: '\u00a335', marketShare: '8%' },
      { name: 'Jack Daniel\u2019s', parent: 'Brown-Forman', segment: 'Premium', avgPrice: '\u00a325', marketShare: '10%' },
      { name: 'Monkey Shoulder', parent: 'William Grant', segment: 'Premium', avgPrice: '\u00a328', marketShare: '5%' },
    ],
    recentMoves: [
      { date: '2025-11', brand: 'Johnnie Walker', type: 'Marketing', detail: 'F1 partnership activation at Abu Dhabi GP. Global media value estimated at \u00a315M.', impact: 'high' },
      { date: '2025-09', brand: 'Jameson', type: 'Distribution', detail: 'Entered Indian market with dedicated brand ambassador team. 5 key cities.', impact: 'high' },
      { date: '2025-07', brand: 'Glenfiddich', type: 'New Launch', detail: 'Glenfiddich Perpetual Collection \u2014 vat-finished series. NTR exclusive first.', impact: 'medium' },
      { date: '2025-05', brand: 'Jack Daniel\u2019s', type: 'Pricing', detail: 'Gentleman Jack price repositioned from \u00a335 to \u00a332 in UK off-trade.', impact: 'medium' },
      { date: '2025-03', brand: 'Monkey Shoulder', type: 'Marketing', detail: 'Bartender competition series launched across 10 European markets.', impact: 'medium' },
    ],
  },
  rum: {
    brands: [
      { name: 'Bacardi', parent: 'Bacardi', segment: 'Standard-Premium', avgPrice: '\u00a318', marketShare: '25%' },
      { name: 'Captain Morgan', parent: 'Diageo', segment: 'Standard', avgPrice: '\u00a316', marketShare: '22%' },
      { name: 'Havana Club', parent: 'Pernod Ricard', segment: 'Premium', avgPrice: '\u00a320', marketShare: '8%' },
      { name: 'Kraken', parent: 'Proximo', segment: 'Premium', avgPrice: '\u00a325', marketShare: '7%' },
      { name: 'Diplomatico', parent: 'DUSA', segment: 'Super-Premium', avgPrice: '\u00a338', marketShare: '3%' },
    ],
    recentMoves: [
      { date: '2025-10', brand: 'Bacardi', type: 'New Launch', detail: 'Bacardi Reserva Ocho Sherry Cask Finish. Premium aged rum range expansion.', impact: 'medium' },
      { date: '2025-08', brand: 'Captain Morgan', type: 'Marketing', detail: '\u00a38M summer campaign. RTD cross-promotion with pre-mixed range.', impact: 'high' },
      { date: '2025-06', brand: 'Havana Club', type: 'Distribution', detail: 'UK on-trade push with 100 new bar listings. Cuban cocktail menu programme.', impact: 'medium' },
      { date: '2025-04', brand: 'Kraken', type: 'New Launch', detail: 'Kraken Gold Spiced Rum. Lighter profile targeting summer occasions.', impact: 'medium' },
      { date: '2025-02', brand: 'Diplomatico', type: 'Pricing', detail: 'Reserva Exclusiva price maintained at \u00a338 despite category pressure. Premium hold strategy.', impact: 'low' },
    ],
  },
  vodka: {
    brands: [
      { name: 'Smirnoff', parent: 'Diageo', segment: 'Standard', avgPrice: '\u00a315', marketShare: '25%' },
      { name: 'Absolut', parent: 'Pernod Ricard', segment: 'Premium', avgPrice: '\u00a320', marketShare: '15%' },
      { name: 'Grey Goose', parent: 'Bacardi', segment: 'Super-Premium', avgPrice: '\u00a335', marketShare: '8%' },
      { name: 'Belvedere', parent: 'LVMH', segment: 'Super-Premium', avgPrice: '\u00a332', marketShare: '5%' },
      { name: 'Tito\u2019s', parent: 'Fifth Generation', segment: 'Premium', avgPrice: '\u00a325', marketShare: '12%' },
    ],
    recentMoves: [
      { date: '2025-10', brand: 'Grey Goose', type: 'Marketing', detail: 'Luxury hotel partnership programme launched. 50 5-star properties globally.', impact: 'medium' },
      { date: '2025-08', brand: 'Absolut', type: 'New Launch', detail: 'Absolut Sensations range. Lower ABV (20%) targeting health-conscious consumers.', impact: 'high' },
      { date: '2025-06', brand: 'Smirnoff', type: 'Pricing', detail: 'Price held at \u00a315 despite cost increases. Volume protection strategy.', impact: 'medium' },
      { date: '2025-04', brand: 'Belvedere', type: 'Marketing', detail: 'Organic certification marketing push. Sustainability messaging.', impact: 'medium' },
      { date: '2025-02', brand: 'Tito\u2019s', type: 'Distribution', detail: 'UK distribution expanded via new off-trade agreement. 2,000 new listings.', impact: 'high' },
    ],
  },
}

// Alert types
export const ALERT_TYPES = {
  'New Launch': { color: '#2563EB', icon: 'Rocket' },
  'Pricing': { color: '#D97706', icon: 'DollarSign' },
  'Distribution': { color: '#059669', icon: 'Globe' },
  'Marketing': { color: '#7C3AED', icon: 'Megaphone' },
  'Acquisition': { color: '#E11D48', icon: 'Building2' },
}
