# Overnight Build Log — 27 August 2026

## Session summary

**Shipped:** YAxis `width` prop added to 9 axis elements across 6 chart files — prevents currency/percent axis labels from being clipped in Recharts. Build clean (0 errors, 17.27s). Pushed to main.

1. **Financials.jsx (×2)** — `YAxis` on the per-company Revenue Trend chart (`${company.currency}${v}B`) and the global Inventory Overhang chart (`$${v}B`) had no `width` prop. Without a set width, labels like "£12.5B" can clip against the chart boundary. Fixed with `width={42}` on both.

2. **Valuations.jsx (×2)** — EV/Revenue multiples chart (`${v}x`) and M&A transaction value chart (`$${v}M`) both lacked `width`. Labels like "25x" and "$2,000M" need room. Fixed with `width={36}` (multiples) and `width={48}` (dollar-millions axis).

3. **MarginCalculator.jsx (×2)** — Channel Margins chart (percentage axis) and Cost Waterfall chart (GBP axis) were missing `width`. Fixed with `width={36}` (`v + '%'`) and `width={42}` (`'£' + v`).

4. **ScenarioModeling.jsx** — Unit Economics waterfall chart `YAxis` using `gbp(v)` formatter had no `width`. Fixed with `width={42}`.

5. **ClimateYield.jsx (×2)** — Dual-axis weather chart was missing `width` on both the left temperature axis (`${v}°C`) and the right precipitation axis (`${v}mm`). Fixed with `width={36}` (°C) and `width={40}` (mm right axis).

6. **BrandPricing.jsx** — ScatterChart (Price vs Volume) `YAxis` using `${config.currency}${v}` formatter lacked `width`. Fixed with `width={42}`.

**Also confirmed:** All tooltip styles (white-on-dark contentStyle + labelStyle + itemStyle) are consistent across every chart page. Zero JSX text-node unicode violations remain. All 25 intelligence pages carry DataFreshness badges. All recharts charts have `accessibilityLayer`. YAxis width is now explicit on all formatters producing currency/percent labels.
