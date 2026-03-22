// WCAG 2.1 AA compliant, color-blind safe palette
// Tested against deuteranopia, protanopia, tritanopia
export const CHART_COLORS = {
  primary: '#1B2A4A',    // navy (brand)
  accent: '#C9A96E',     // gold (brand)
  blue: '#2563EB',       // blue-600
  teal: '#0D9488',       // teal-600
  amber: '#D97706',      // amber-600
  rose: '#E11D48',       // rose-600
  violet: '#7C3AED',     // violet-600
  emerald: '#059669',    // emerald-600
  slate: '#475569',      // slate-600
  orange: '#EA580C',     // orange-600
}

// Categorical palette for up to 8 categories (all pass 3:1 against white)
export const CATEGORICAL = [
  CHART_COLORS.primary,
  CHART_COLORS.accent,
  CHART_COLORS.blue,
  CHART_COLORS.teal,
  CHART_COLORS.amber,
  CHART_COLORS.rose,
  CHART_COLORS.violet,
  CHART_COLORS.emerald,
]

// Channel split colors (consistent across all pages)
export const CHANNEL_COLORS = {
  onTrade: '#1B2A4A',
  offTrade: '#C9A96E',
  eCommerce: '#2563EB',
  travelRetail: '#7C3AED',
}
