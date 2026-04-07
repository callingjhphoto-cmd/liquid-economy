# Overnight Build Log — 7 April 2026

## Session summary

**Shipped:** Chart axis tick label visibility — 45 axes fixed across 10 pages (build clean)

1. **Root cause.** Recharts renders axis ticks as SVG `<text>` elements. Without an explicit `fill` attribute, browsers inherit the document default — which on white chart backgrounds is effectively invisible. All `tick={{ fontSize: N }}` props were missing `fill: '#9ca3af'` (gray-400).

2. **Pages fixed (10).** BrandHealth (2 axes), DepletionForecasting (5 axes across 2 charts), Financials (6 axes across 3 charts), ClimateYield (9 axes across 4 charts), MarginCalculator (6 axes across 3 charts), MarketEntryWizard (2 axes), ScenarioModeling (2 axes), Valuations (4 axes across 2 charts), VenueIntelligence (10 axes — 6 bare `<XAxis/>`/`<YAxis/>` with no tick prop at all), BrandPricing (4 axes across 2 charts incl. ScatterChart axis label).

3. **Not touched.** CategoryIntelligence, Companies, SupplyChain were already correct with `fill: '#9ca3af'` or `fill: '#9CA3AF'` set from prior sessions.

4. **Pattern enforced.** All tick objects now follow `tick={{ fontSize: N, fill: '#9ca3af' }}`. Secondary axis labels (e.g. ScatterChart `label` prop) also received `fill`.

5. **Build:** `vite build` &#x2713; &#x2014; 0 errors, 0 warnings. Pushed to main; Railway auto-deploy triggered.

---

# Overnight Build Log — 6 April 2026

## Session summary

**Shipped:** Mobile responsiveness pass — 375px safe across 7 pages (17 class fixes, build clean)

1. **CategoryIntelligence — 2 grid fixes.** Both the 4-KPI overview card grid and the aggregate tier grid used bare `grid-cols-2 lg:grid-cols-4`. Changed to `grid-cols-1 sm:grid-cols-2 lg:grid-cols-4` so they stack single-column on iPhone SE instead of squeezing two 160px-wide cards side by side.

2. **VenueIntelligence, BrandPricing, Companies — modal/card detail grids.** Each had `grid-cols-2` in bottom-sheet or expanded-card detail panels (venue stats, brand category modal, company mobile sheet). All changed to `grid-cols-1 sm:grid-cols-2`. At 375px these were producing ~167px columns with no breathing room.

3. **CommandCentre hero stat.** The $635B headline was `text-4xl` (36px) with no mobile qualifier. Changed to `text-2xl sm:text-4xl` — still bold at 24px on small screens, full size at &#x2265;640px.

4. **SupplyChain — 8 fixes.** Three metric card values (`text-2xl`) and the pressure index (`text-3xl`) now scale down via `text-xl sm:text-2xl` / `text-xl sm:text-3xl`. The commodity detail panel grid (`grid-cols-2`) and the segment-legend grid (`grid-cols-4`) both gained responsive prefixes so they don't squeeze at 375px.

5. **GeographicIntelligence — 2 grid fixes.** Region drill-down KPI grid and mobile-sheet KPI grid both changed from bare `grid-cols-2` to `grid-cols-1 sm:grid-cols-2`. Build: `vite build` &#x2713; &#x2014; 0 errors, 0 warnings. Pushed to main; Railway auto-deploy triggered.

---

# Overnight Build Log — 5 April 2026

## Session summary

**Shipped:** Polish pass — white-on-dark tooltip fix + mobile layout repair (13 files, build clean)

1. **Tooltip text colour — 13 pages fixed.** All recharts `<Tooltip>` components had `itemStyle: { color: '#94a3b8' }` (slate-400, mid-grey) — mismatched against the dark `#1e293b` background. Changed to `#f1f5f9` (slate-100, near-white) across BrandPricing, BrandHealth, CategoryIntelligence, ClimateYield, Companies, DepletionForecasting, Financials, MarginCalculator, MarketEntryWizard, ScenarioModeling, SupplyChain, Valuations, VenueIntelligence. 29 instances corrected in one pass.

2. **Companies 5-year chart axis labels — invisible tick fix.** XAxis and YAxis tick elements were missing `fill: '#9ca3af'`; in most browsers this left tick labels invisible against the white chart background. Added fill colour and explicit YAxis width (45px).

3. **SupplyChain expanded commodity panel — mobile layout.** The chart + metadata side-by-side `flex` row would squeeze to unusable width at 375 px. Changed to `flex-col sm:flex-row` so it stacks vertically on mobile and goes side-by-side at ≥640 px.

4. **Data quality audits — confirmed clean.** CategoryIntelligence: all 11 categories × 5 years have complete marketSize, growth, channels, brands, volumeCases data. VenueIntelligence: all 28 London profiles have required fields. BrandPricing: 272 expressions across 13 categories — counts, channel sums, and market coverage are consistent.

5. **Build:** `vite build` ✓ — 2443 modules, 0 errors, 0 warnings. Pushed to main; Railway auto-deploy triggered.
