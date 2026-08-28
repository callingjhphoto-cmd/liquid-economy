# Overnight Build Log — 28 August 2026

## Session summary

**Shipped:** BrandPricing category data fix — 21 whisky expressions reclassified from catch-all `'Whisky'` to correct sub-categories. Build clean (0 errors, 14.63s). Pushed to main.

**Root cause found:** The Brand Pricing category filter was silently miscounting. Filtering by "Scotch Whisky" showed 7 brands when the correct count is 16; "Bourbon & American" showed 4 when the correct count is 12. All 21 under-counted expressions carried the generic `category: 'Whisky'` label from a batch data import that didn't distinguish sub-styles.

**Changes:**
1. **9 Scotch expressions** (Macallan 18yr Sherry Oak, Dalmore 12yr, Dalmore 18yr, Johnnie Walker Red Label, Chivas Regal 12yr, Famous Grouse Finest, Glenlivet 12yr, Glenmorangie Original 10yr, Monkey Shoulder) → `'Scotch Whisky'`
2. **8 Bourbon/American expressions** (Bulleit, Jim Beam White Label, Maker's Mark Original, Crown Royal Deluxe, Woodford Reserve Bourbon, Pappy Van Winkle 20yr, Seagram's 7 Crown, Barton Blend) → `'Bourbon & American'`
3. **1 Irish expression** (Jameson Original) → `'Irish Whiskey'` (new category)
4. **3 Japanese expressions** (Yamazaki 12yr, Hakushu 12yr, Hibiki 21yr) → `'Japanese Whisky'` (new category)
5. **BrandPricing.jsx** — added `'Irish Whiskey'` (`#78350F`) and `'Japanese Whisky'` (`#92400E`) to `CATEGORY_COLORS` so the new filter chips render with amber/brown tones rather than the gray fallback.

**Audit also confirmed (no action needed):**
- CategoryIntelligence: all 11 categories × 5 years (2021–2025) are fully populated, zero null values
- VenueIntelligence: 250 total W50B entries, 28 London profiles — all required fields present, guard clauses handle the 11 venues missing `founders` safely
- SupplyChain, GeographicIntelligence, Companies, ReportBuilder: no rendering issues found
- All chart pages confirmed with `accessibilityLayer` — CampaignPlanner and GeographicIntelligence have no Recharts charts at all (only Lucide icons)
- Zero JSX unicode violations — all special chars use `{'£'}` / `{'€'}` / `{'°C'}` pattern throughout

---

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
