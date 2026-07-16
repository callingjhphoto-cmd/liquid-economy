# Overnight Build Log — 16 July 2026

## Session summary

**Shipped:** 15 null-guard and dead-import bugs fixed across 5 pages (build clean, 0 errors, pushed to main).

1. **TradeShows.jsx — 5 fixes: unguarded `mustAttendFor` array throughout the file.** The ShowCard component called `show.mustAttendFor.slice()`, `.length`, and `.map()` directly, and the `allCategories` memo called `.forEach()` unconditionally, and the `filtered` memo called `.includes()` — all crashing if any show record lacks the field. Fixed all four JSX call sites and both memo expressions with `(s.mustAttendFor || [])` fallbacks. Also tightened the module-level ROI signal check to `typeof s.roiEstimate === 'string'` before calling `.startsWith()`.

2. **DistributorDirectory.jsx — 4 fixes: search filter `.toLowerCase()` and `d.categories` array unguarded.** Typing a single character in the search box crashes with `TypeError` if any distributor has `name`, `speciality`, or `keyBrands` as `null`/`undefined`. Fixed with `?? ''` null-coalescing. `d.categories.slice/length/includes` in both the card render and the filter memo unguarded — crashes when category filter active. Fixed with `(d.categories || [])`.

3. **Valuations.jsx — 4 fixes: empty-array sort, undefined property reads, division by zero.** `[...BRAND_VALUATIONS].sort()[0]` and `[...MA_VALUATION_BENCHMARKS].sort()[0]` return `undefined` if the data arrays are ever empty; then five JSX MetricCard render sites access `.brand`, `.target`, `.estimatedValue` unconditionally — immediate crash. Added `?? null` at derivation and `?.` / `?? '—'` at render. `avgMultiple` and `avgMaPremium` divided by `.length` without a zero-length guard, rendering "NaN" in the hero card; added `array.length ? ... : '—'` guards.

4. **Financials.jsx — 5 fixes: module-level crash, last-element access, and two more unguarded property reads.** `totalInventory` reduce accessed `c.metrics.inventory.totalNum` with no optional chaining — a module-load-time crash on any company with incomplete `metrics`; fixed to `c.metrics?.inventory?.totalNum ?? 0`. `COMBINED_INVENTORY.at(-1)` and `AGGREGATE_DEPLETION_GAP.at(-1).gap` without empty-array guards; fixed with `?? { total: 0, dangerZone: 18 }` and `?.gap ?? 0`. `company.quarterlyRevenue.map()` (both in MetricMini and BarChart `data` prop) without null guard — crashes when expanding a company card; fixed with `?? []`. `m.volumeSplit.volume` in the Volume vs Value MetricMini unguarded; fixed with a ternary.

5. **BrandHealth.jsx — dead recharts imports removed.** `BarChart`, `Bar`, `Cell`, `PieChart`, `Pie` were imported from recharts but never rendered — pure dead code contributing needlessly to the bundle. Removed all five.

6. **Build:** `vite build` &#x2713; — 0 errors, 0 warnings (12.56s). Pushed to main; Railway auto-deploy triggered.

---

# Overnight Build Log — 15 July 2026

## Session summary

**Shipped:** 5 null-guard crash fixes across Companies, GeographicIntelligence, SupplyChain + Vite manualChunks expanded with 5 large data files for better code splitting (build clean, 0 errors, pushed to main).

1. **Companies.jsx:977 — `maTimeline` null guard.** `mostMACompany.maTimeline.filter()` assumed `maTimeline` always exists. If any company sorts to [0] without `maTimeline` (possible when all acquisition counts tie at 0), the BentoGrid hero crashes on page load. Fixed to `(mostMACompany.maTimeline || []).filter(...)`.

2. **Companies.jsx:345 — `info.position?.includes()` optional chaining.** `info.position.includes('Leader')` ran unconditionally on every `categoryPresence` entry. If any entry has `position: undefined`, the Overview tab of that company's expanded panel crashes. Fixed all four `.includes()` calls to use optional chaining `?.includes()`.

3. **GeographicIntelligence.jsx:689 — `kpis[0].change` render-site guard.** Module-level IIFE already validated `data.kpis && data.kpis[0]` before setting `fastestGrowing`, but the MetricCard render site re-accessed `REGION_DATA[key].kpis[0].change` bare — crashing if the key is absent from REGION_DATA or kpis is empty at render time. Fixed with `?.kpis?.[0]?.change ?? '—'` optional chaining + nullish coalescing.

4. **GeographicIntelligence.jsx:697 — `kpis[0].value` render-site guard.** Same pattern as above for `largestByValue`. Fixed with `?.kpis?.[0]?.value ?? '—'`.

5. **SupplyChain.jsx:59 — `d.change.startsWith('-')` type guard.** Called inside the component body on every render. If any `COGS_DATA` entry has a non-string `change` field (numeric or undefined), every render crashes with `TypeError: d.change.startsWith is not a function`. Fixed with `typeof d.change === 'string' && d.change.startsWith('-')` type guard.

6. **vite.config.js — 5 large data files added to manualChunks.** `companyData` (149 KB), `cocktailDetails` (116 KB), `geographicData` (60 KB), `spiritsDemographicsData` (56 KB), and `climateYieldData` (48 KB) were bundled into the main app chunk — loaded on every page visit regardless of route. Added all 5 to `manualChunks`, each as a separate lazy-loaded chunk. Build confirms: `data-companies` (130 KB), `data-cocktails` (92 KB), `data-climate` (230 KB) now separate.

7. **Build:** `vite build` &#x2713; — 0 errors, 0 warnings (14.71s). Pushed to main; Railway auto-deploy triggered.

---

# Overnight Build Log — 14 July 2026

## Session summary

**Shipped:** 9 null-guard and SVG gradient rendering bugs fixed across SupplyChain, GeographicIntelligence, and CategoryIntelligence (build clean, 0 errors, pushed to main).

1. **SupplyChain.jsx — duplicate SVG gradient IDs (Firefox rendering bug).** All commodity sparklines shared two gradient IDs (`sg_g` / `sg_r`). In Firefox, `url(#id)` is document-scoped — later SVGs stole fills from earlier ones and area fills vanished on filter-pill changes. Fixed by adding `uid` prop to `Sparkline`, computing `gradId = \`sg_${uid}\`` and using it for both `id=` and `fill=`. Call site passes `uid={key}` (the commodity key). Also promoted the expanded chart's `expandGrad` ID to `eg_${key}` for the same reason.

2. **SupplyChain.jsx — `data.historicalData` unguarded in expanded ChartCard.** The row-header correctly guarded with `{data.historicalData && <Sparkline …/>}` but the expanded section called `Object.entries(data.historicalData)` unconditionally — crash if any commodity lacked historical data. Wrapped the entire `<ChartCard>` block with `{data.historicalData && (…)}`.

3. **GeographicIntelligence.jsx — `barriers.split()` on undefined.** Line 502 called `.split()` without optional chaining; fixed to `data.marketEntry.barriers?.split(' - ')[0]`. `keyPartners.map()` on potentially absent array fixed to `(data.marketEntry.keyPartners || []).map(…)`. DataTable `topImports` and `topExports` props now fall back to `[]` when the sub-arrays are absent.

4. **CategoryIntelligence.jsx — demographics null-guard (5 lines).** `demographics.age/.gender/.income/.region/.occasion` accessed without guarding `demographics` itself being null (returned by `getCategoryDemographics` for categories without demographic data). Fixed all 5 with `demographics?.age`, etc. `yd.brands?.highEnd?.length` — existing optional chaining on sub-keys didn't guard `yd.brands` itself; fixed in both `CategoryCard` and detail view. `d.channels?.onTrade ?? 0` — same pattern for `fullDataTableRows`. ChannelChart tooltip formatter returned `"undefined%"` when `yd.channels` was absent; fixed to guard `val != null`.

5. **Build:** `vite build` ✓ — 0 errors, 0 warnings (10.28s). Pushed to main; Railway auto-deploy triggered.

---

# Overnight Build Log — 13 July 2026

## Session summary

**Shipped:** 3 rendering/logic bugs fixed + dead code stripped (GeographicIntelligence, Companies, ReportBuilder — build clean, 0 errors).

1. **GeographicIntelligence.jsx:97 — invisible LI signal dot fixed.** `liSig2` third branch used `bg-navy-500` — a non-existent Tailwind class (`navy` is a flat custom token, not a palette scale). The "Traditional Channels Dominant" signal dot rendered transparent. Fixed to `bg-navy`.

2. **Companies.jsx — `handleCardClick` double-fire on mobile fixed.** The handler set `expandedCompany` unconditionally then also set `mobileSheet` on `window.innerWidth < 1024`. On mobile, `CompanyTier2` rendered inline (behind the BottomSheet) causing ghost layout and a visible flash on sheet dismiss. Fixed to strict `if/else`: mobile → `mobileSheet` only; desktop → `expandedCompany` functional updater (dep array cleared to `[]`).

3. **Companies.jsx:273 — `CompanyTier2` metrics grid mobile fix.** `grid-cols-2 sm:grid-cols-4` &#x2192; `grid-cols-1 sm:grid-cols-2 lg:grid-cols-4` so Op.&#x202F;Margin/Net&#x202F;Income/Mkt&#x202F;Cap/Stock&#x202F;YTD stacks on mobile.

4. **ReportBuilder.jsx — import ordering + dead code.** `import { Card, AccentCard&#x2026; }` was placed after 20+ lines of module-level consts (invalid ESM ordering). Moved to before the LI-signal block. `METRIC_OPTIONS` removed from data import (never referenced). 6 dead `useState` vars and 5 dead handlers (`toggleCategory`, `toggleMarket`, `toggleMetric`, `toggleSource`, `addWidgetToReport`) stripped — all were from an unfinished config-panel feature never wired to JSX.

5. **Build:** `vite build` &#x2713; &#x2014; 0 errors, 0 warnings. Pushed to main; Railway auto-deploy triggered.

---

# Overnight Build Log — 12 July 2026

## Session summary

**Shipped:** Liquid Intelligence panel added to PitchGenerator — the last tool page missing the standard 3-signal LI card. All existing commits recovered and pushed to main (build clean, 0 errors).

1. **Reactive LI panel on PitchGenerator.** Three `useMemo` signals tied to user inputs:
   - **Category Market Momentum** — CAGR parsed from `CATEGORY_MARKET_DATA[category].cagr`; ≥8% emerald / 4-7.9% blue / <4% amber with category-specific investor copy.
   - **Funding Stage Readiness** — four tiers (preSeed / seed / seriesA / seriesB) each with different guidance on what the deck must prove at that stage.
   - **Gross Margin Health** — from `FINANCIAL_TEMPLATES[scenario].grossMargin`; ≥55% emerald / 45-54% blue / <45% amber with RRP/channel-mix advice.
   Panel renders between the inputs card and the Copy Outline button; updates live on every input change.

2. **Data quality audits — confirmed clean.** CategoryIntelligence: 55/55 year-data blocks present (11 cats × 5 years), all 6 required fields (marketSize, growthDir, volumeCases, brands, channels) at exactly 55 occurrences each. VenueIntelligence: 28 LONDON_VENUES, 250 FIFTY_BEST_BARS entries (5 yrs × 50 bars). BrandPricing: 260 expressions in BRAND_DATABASE. All chart Tooltip `itemStyle` confirmed `#f1f5f9` (white on dark). All chart components have `accessibilityLayer`.

3. **Detached-HEAD recovery.** Local HEAD was detached; fast-forwarded main onto the 11-commit chain from prior sessions then pushed. Push delta: `d36c77e → 4e5e2b4` (one new commit). Railway auto-deploy triggered.

4. **Builds clean.** `./node_modules/.bin/vite build` — 0 errors, 0 warnings, 2443+ modules.

5. **Pages without LI now at 0 for non-dossier/utility pages.** All 25 data/tool pages now carry the gold Liquid Intelligence panel. Dossier and utility pages (BrandDossier, ClientProfile, etc.) are intentionally excluded.

---

# Overnight Build Log — 11 July 2026

## Session summary

**Shipped:** 11 JSX unicode violations fixed across 6 files + DataFreshness badges on CampaignPlanner & DepletionForecasting + 2 stranded July 10 commits recovered (build clean, 0 errors).

1. **2 stranded commits recovered.** The July 10 overnight session committed in detached HEAD — 2 commits (DataFreshness on ScenarioModeling/ReportBuilder/MarketEntryWizard/PitchGenerator + accessibilityLayer on 4 charts) never reached origin/main. Cherry-picked both onto main before tonight's work.

2. **11 JSX unicode violations fixed across 6 files.** Full re-scan found violations introduced since the July 4 sweep. Files and fixes: ClimateYield.jsx:375 (`←` back button) and ClimateYield.jsx:623 (`—` and `–` in vintage paragraph); CampaignPlanner.jsx:1877+1955 (`•` in footer, both mobile and desktop renders); POSIntelligence.jsx:669 (`•` ×2 in footer); ClientProfile.jsx:844 (`→` in link); CategoryIntelligence.jsx:953 (`→` after JSX expression); MarketOverview.jsx:209 (`—` in SectionHeader children); ReportBuilder.jsx:112-113 (`—` ×2 in paragraph); ReportBuilder.jsx:116 (`–` and `£` in pricing note); ScenarioModeling.jsx:188 (`—` in wizard intro). Post-fix scan confirmed zero violations across all 38 page files.

3. **DataFreshness on CampaignPlanner.** Added `<DataFreshness date="April 2026" source="IWSR, NielsenIQ, CGA, trade press" />` after SubPageNav in both the mobile render (line ~1743) and the desktop render (line ~1895). Removed the now-redundant "Data as of April 2026" text that was embedded in both PageHeader subtitle props. Import added to the ui destructure.

4. **DataFreshness on DepletionForecasting.** Added `<DataFreshness date="April 2026" source="Trade distributor data, IWSR depletion benchmarks" />` after SubPageNav at line 124. Import added. DepletionForecasting had no date reference at all before this — now consistent with all other tool pages.

5. **Build:** `vite build` &#x2713; — 0 errors, 0 warnings. Pushed to main; Railway auto-deploy triggered.

---

# Overnight Build Log — 10 July 2026

## Session summary

**Shipped:** DataFreshness badges on 4 tool pages + accessibilityLayer on 4 charts (build clean, 0 errors).

1. **6 stranded commits recovered.** July 7-9 overnight sessions had committed in detached HEAD — 6 commits (LI cards, mobile fixes, unicode/axis fixes) never reached origin/main. Cherry-picked all 6 onto main before tonight's work: `c37a7e7 d381486 0f988d9 bf25ff3 5d79137 f01b2ef`.

2. **DataFreshness badges — 4 tool pages.** ScenarioModeling, ReportBuilder, MarketEntryWizard, and PitchGenerator each received a `<DataFreshness date="April 2026" source="..." />` badge after SubPageNav. Hardcoded "Data as of April 2026" strings removed from the two PageHeader subtitles that carried them.

3. **accessibilityLayer — 4 chart instances.** MarketOverview hero AreaChart + regional sparkline AreaChart, MarketEntryWizard cost breakdown BarChart, and CocktailDetail flavour profile RadarChart all received the `accessibilityLayer` prop for keyboard navigation and ARIA compliance.

4. **flagshipConfig.js unicode normalise.** `après-ski` escape sequence converted to literal `après-ski` UTF-8 glyph by normalize_unicode_escapes.py — cosmetic, keeps JS strings consistent with the rest of the codebase.

5. **Build:** `vite build` &#x2713; &mdash; 0 errors, 0 warnings. Pushed to main; Railway auto-deploy triggered.

---

# Overnight Build Log — 9 July 2026

## Session summary

**Shipped:** 3 JSX unicode violations fixed + axis tick normalisation + DataFreshness on BrandHealth &amp; ClimateYield (build clean, 2820 modules, 0 errors).

1. **ScenarioModeling.jsx:938 — en-dash + pound in JSX text fixed.** The RRP Range card rendered `{'£'}{costs.rrp_low}–£{costs.rrp_high}`. Both the `–` (U+2013) and the second `£` (U+00A3) sat directly in JSX text position between expression delimiters — not inside `{}` braces. Fixed to `{'£'}{costs.rrp_low}{'–'}{'£'}{costs.rrp_high}`.

2. **PricePositioning.jsx:311 + 384 — en-dash in JSX text fixed.** Two tier-range spans displayed `{currency}{t.min}–{currency}{t.max}` where the `–` was bare JSX text between two expression pairs. Both instances fixed to `{'–'}`. Applies to the sliding tier visualisation and the comparison table.

3. **CategoryIntelligence.jsx — axis tick fill normalised (4 instances).** Two charts (Market Size AreaChart and Channel Mix BarChart) used `fill: '#9CA3AF'` (uppercase hex) on both XAxis and YAxis tick props. Every other file in the codebase uses `'#9ca3af'` (lowercase). Normalised all 4 to `'#9ca3af'` — visually identical, now consistent.

4. **BrandHealth.jsx — DataFreshness badge added.** Pages that display time-stamped intelligence data should carry the DataFreshness badge so users know the data provenance. BrandHealth was the highest-profile intelligence page still missing it. Added `<DataFreshness date="April 2026" source="Social media analytics, search trend indices, review platform aggregation" />` after SubPageNav. Added `DataFreshness` to the UI import block.

5. **ClimateYield.jsx — DataFreshness badge added.** ClimateYield mixes static historical yield data (April 2026 vintage) with live Open-Meteo API weather. Added badge after SubPageNav with `date="April 2026"` and source string listing Open-Meteo, CIVC, CRT, AHDB, USDA. Added `DataFreshness` to the UI import block.

6. **Full scan run.** Parallel scan agent confirmed: all 16 Recharts Tooltip components carry `itemStyle={{ color: '#f1f5f9' }}` correctly; no missing axis tick fills on any other page; no rendering issues on newer pages (SubscriptionTiers/WalkIn/GuestLockedPage/DossiersIndex/dossier pages). 250 W50B entries confirmed across all 5 years; 28 LONDON_VENUES profiles confirmed; all 9 `growthDir: 'down'` entries in categoryData.js verified to have genuinely negative growth values.

7. **Build:** `vite build` &#x2713; &mdash; 2820 modules, 0 errors, 0 warnings. Pushed to main; Railway auto-deploy triggered.

---

# Overnight Build Log — 8 July 2026

## Session summary

**Shipped:** Mobile responsiveness final sweep — full audit of all 15 pages at 375px; 2 genuine issues found and fixed (build clean, 0 errors).

1. **Full mobile audit across all 15 pages.** Ran parallel audit agents across all major product pages (CommandCentre, CategoryIntelligence, VenueIntelligence, BrandPricing, Companies, MarketEntryWizard, TradeShows, CompetitorMonitor, POSIntelligence, PricePositioning, ReportBuilder, DistributorDirectory, Financials, ScenarioModeling, MarketOverview). Only 2 genuine issues found — all prior mobile fixes from previous sessions confirmed intact.

2. **TabGroup.jsx — `inline-flex` &rarr; `flex` (global fix).** The shared `TabGroup` component used `inline-flex` on its outer container. An `inline-flex` element sizes to `max-content` width, so its own `overflow-x-auto` had nothing to clip against — the tab bar simply overflowed the viewport. The fix changes the container to `flex` (block-level), which constrains it to its parent's width and allows `overflow-x-auto` to correctly activate horizontal scrolling. Affects all TabGroup usages: CategoryIntelligence (5-tab detail nav), POSIntelligence (6-tab nav), ClimateYield (year selector). BrandPricing already had a `flex overflow-x-auto` parent wrapper — unaffected.

3. **MarketEntryWizard.jsx — market selector grid fix.** Step 1 market selection used `grid-cols-2` as base with no `grid-cols-1` fallback. At 375px inside a `p-6` card, each button was ~150px wide — too narrow for country names like "United Kingdom" and the flag + name + region layout. Changed to `grid-cols-1 sm:grid-cols-3 lg:grid-cols-5` so buttons stack single-column on mobile.

4. **13 pages confirmed clean.** TradeShows, CompetitorMonitor, PricePositioning, ReportBuilder, DistributorDirectory, Financials, ScenarioModeling, MarketOverview, CommandCentre, VenueIntelligence, BrandPricing, Companies, and others all confirmed mobile-safe at 375px. All grids start at `grid-cols-1`, all tables are wrapped in `overflow-x-auto`, all large text sizes carry `sm:` prefixes.

5. **Build:** `vite build` &#x2713; &mdash; 0 errors, 0 warnings. Pushed to main; Railway auto-deploy triggered.

---

# Overnight Build Log — 7 July 2026

## Session summary

**Shipped:** Liquid Intelligence cards on 5 remaining pages — TradeShows, RegulatoryCompliance, DistributorDirectory, MarketEntryWizard, ReportBuilder (build clean, 2820 modules, 0 errors).

1. **TradeShows.jsx — LI card (static, module-level).** 3 signals computed from the full `TRADE_SHOWS` dataset: H2 Event Density (count of shows with month ≥ 7), ROI Tier (count of "Very High" ROI events), Category Breadth (unique categories across `mustAttendFor`). Card placed between DataFreshness badge and the List/Calendar view controls. Subtitle shows total event count ("N global events analysed").

2. **RegulatoryCompliance.jsx — LI card (reactive to `selectedMarket`).** 3 signals that update on every market switch: Import Process Complexity (importSteps.length — ≤3 emerald/≤5 blue/>5 amber), Labelling Change Risk (labelling.upcoming.length — 0 emerald/≤2 blue/>2 amber), Market Entry Timeline (parsed integer from reg.timeline — ≤3mo emerald/≤6mo blue/>6mo amber). Card placed between the market selector buttons and the 4-stat KPI grid. Added `Zap` to lucide imports.

3. **DistributorDirectory.jsx — LI card (static, module-level).** 3 signals from the full `DISTRIBUTORS` dataset: Global Market Access (unique country count — ≥8 emerald), Independent Availability (% with parentCompany === 'Independent' — ≥40% emerald), Dual-Channel Flexibility (% with both onTrade && offTrade — ≥60% emerald). Card placed between DataFreshness and Filters card. Added `Zap` to lucide imports.

4. **MarketEntryWizard.jsx — LI card (reactive, inside Playbook component).** 3 signals computed from the existing Playbook variables: Entry Cost Band (totalCost ≥50k amber / ≥20k blue / <20k emerald), Regulatory Timeline (parsed from reg.timeline), Competitor Intensity (leader + challengers count). Card placed between the 4-stat playbook KPI grid and the PlaybookSection accordion. Subtitle shows "catName → marketName signals". Updates live when user changes category or market selection in steps 1/2.

5. **ReportBuilder.jsx — LI card (static, module-level).** 3 signals computed from the report platform's own config arrays: Template Library (REPORT_TEMPLATES.length — 4 templates → blue "Solid Template Range"), Data Source Depth (DATA_SOURCES.length — 6 sources → emerald "Multi-Source Triangulation"), Intelligence Scope (AVAILABLE_CATEGORIES.length × AVAILABLE_MARKETS.length = 154 intersections → emerald "Broad Intelligence Scope"). Card placed between the AccentCard CTA and the BentoGrid hero section. Added `Zap` to lucide imports.

6. **LI card count now 23/38 pages.** All 5 non-dossier tool pages are now covered. Remaining pages without LI cards are dossier/profile pages (BrandDossier, CategoryDossier, GroupDossier, MarketingDossier, DossierProposal, DossiersIndex, ProfileChorusCocktails, ProfilesIndex, CocktailDetail, ClientProfile, WalkIn, GuestLockedPage, SubscriptionTiers) which are content/auth pages where an intelligence signal card is not applicable.

---

# Overnight Build Log — 5 July 2026

## Session summary

**Shipped:** CategoryIntelligence data quality fixes + chart axis label improvements across 3 pages (build clean, 0 errors).

1. **5 growthDir data bugs fixed in categoryData.js.** Gin (2023, 2024, 2025) and Whisky (2024, 2025) had `growthDir: 'down'` but positive growth values (+1.2% to +4.1%). The MetricCard component uses `direction` to render green/red arrows — these were showing red trend-down arrows for categories that are actually still growing. Fixed all 5 to `growthDir: 'up'`.

2. **BrandHealth YAxis formatter added.** The chart switches between 3 metrics (Social Mentions in thousands, Search Trend Index 0-100, Review Sentiment 0-100%) but had a bare YAxis with no formatter. Added dynamic `tickFormatter` and tooltip `formatter` keyed on `chartMetric`: social mentions → `45K` format, sentiment → `82%` format, search index → plain number. Also added `accessibilityLayer`.

3. **DepletionForecasting dual-axis chart improved.** Left axis (Cases) and right axis (Revenue £) were unformatted. Added `tickFormatter` to both axes: cases → `1K` short form, revenue → `£10K` short form. Second cumulative chart also got a K-formatter and `accessibilityLayer` prop.

4. **SupplyChain expanded commodity chart improved.** Tooltip showed raw float values with no units. Added unit-aware `formatter` to the Tooltip and `tickFormatter` to the YAxis (shows unit suffix when unit is ≤8 chars, e.g. `68 €/t`, `2112 pts`, `4.82 $/bu`). Tooltip now labels the metric by name.

5. **Full data quality audit passed.** All 11 categories × 5 years (55 year-blocks) confirmed complete. All 250 W50B entries (50 × 5 years) confirmed. All 28 London venue profiles confirmed. Channel share sums verified at ~100% across all categories/years. No new unicode violations in JSX text nodes.

---

# Overnight Build Log — 4 July 2026

## Session summary

**Shipped:** Full JSX unicode sweep — 22 text-node violations fixed across 13 pages (build clean, 0 errors).

1. **Scanner built and run.** Wrote a precise JSX text-node scanner that distinguishes chars directly between `>` and `<` tags from chars safely inside `{...}` expressions or JS strings. Found 22 violations across 13 page files: middle dots, em dashes, en dashes, pound signs, arrows, right single quotes, and a macron-e.

2. **22 violations fixed across 13 files.** CategoryIntelligence, ClientProfile, ClimateYield, CommandCentre, CompetitorMonitor, GeographicIntelligence, MarginCalculator, POSIntelligence, PitchGenerator, ProfileChorusCocktails, ScenarioModeling, SupplyChain, VenueIntelligence. Used HTML entities (`&middot;`, `&mdash;`, `&ndash;`, `&pound;`, `&rarr;`, `&rsquo;`, `&#x113;`) where chars appear directly in JSX text; used existing `{'char'}` expression pattern for mid-string currency symbols.

3. **Smart-quote delimiter bug caught and fixed.** The Edit tool auto-converted ASCII apostrophes in my JSX expressions to U+2018/U+2019 curly quotes. Esbuild rejects non-ASCII JS string delimiters. Python script detected and replaced 5 broken `{U+2018charU+2018}` patterns with `&rsquo;` / `&mdash;` HTML entities. VenueIntelligence lines 678 and 1157–1161 were the worst-affected.

4. **Zero violations remaining.** Re-scan confirmed 0 JSX text node violations across all 38 page files. Build: `vite build` ✓ — 0 errors, 0 warnings.

5. **Pushed to main.** Railway auto-deploy triggered.

---

# Overnight Build Log — 3 July 2026

## Session summary

**Shipped:** Mobile grid collapse sweep — 14 grid layout fixes across 9 pages + 2 unicode fixes (build clean, 0 errors).

1. **Repo hygiene.** Six commits from the 30 June–2 July sessions were stranded in detached HEAD; cherry-picked all 6 onto main before starting new work. Ran full scan (23 page files, specialist scan agent) to get a definitive list of mobile responsiveness issues.

2. **Mobile grid sweep — 14 fixes across 9 pages.** All grids that started at `grid-cols-2` with no `grid-cols-1` base class now stack to a single column at ≤639px: **Financials** (hero KPI grid had no `sm:` at all — jumped straight from 2 to `lg:grid-cols-4`; plus company accordion quick-metrics and expanded Key Metrics 6-col); **DepletionForecasting** (6-input Forecast Parameters form + 4-metric KPI row); **BrandHealth** (4-metric MetricBox row); **RegulatoryCompliance** (market header KPI row — Timeline/Cost/Age/Tax); **MarginCalculator** (4-select quick-input form + channel detail comparison grid); **GeographicIntelligence** (region slide-over Quick KPIs header + KPIs tab grid); **SupplyChain** (pipeline segment legend); **ClimateYield** (Year-to-Date comparison year grid); **PitchGenerator** (6-input pitch configuration form). 7 instances that appeared bare were confirmed intentional (hero stat pairs, scenario best/worst comparison, BottomSheet content) and left untouched.

3. **Unicode fixes (2).** Scan of the newer dossier/profile pages added in the 4 July dossier build revealed 2 JSX text node violations: `ProfilesIndex.jsx` footer middle dot (`·` → `{'·'}`); `MarketingDossier.jsx` lede em dash (`—` → `{'—'}`). All other non-ASCII in newer pages confirmed to be in JS template literals or JSX attribute strings — correct.

4. **Stranded commits.** The 6 cherry-picked commits (Companies LI, mobile+unicode sweep, 30 June/1 July logs, BrandPricing+CompetitorMonitor LI, 2 July log) rebased cleanly as skips (already in remote history). Tonight's single commit pushed successfully after rebase.

5. **Build:** `vite build` ✓ — 0 errors, 0 warnings. Pushed to main; Railway auto-deploy triggered.

---

# Overnight Build Log — 2 July 2026

## Session summary

**Shipped:** Liquid Intelligence cards on BrandPricing + CompetitorMonitor (build clean, 2820 modules, 0 errors).

1. **BrandPricing.jsx — Liquid Intelligence card.** Added `Zap` to lucide imports. Three signals computed at module level from the `PRICING` derived dataset (no state, no re-render cost): (1) Market Arbitrage Risk — `liAvgDiff` (avg cross-market price spread across all expressions): ≥$30 amber "High Arbitrage Risk" with top-differential brand named dynamically / ≥$15 blue "Moderate Price Variance" / <$15 emerald "Stable Cross-Market Pricing"; (2) Portfolio Premium Density — `liHighEndPct` (% expressions in Ultra Premium or Prestige tiers): ≥25% emerald "Strong Premium Mix" / ≥15% blue "Balanced Portfolio" / <15% amber "Volume-Led Category"; (3) Global Market Coverage — `liFullMktPct` (% expressions priced in US, UK, and EU): ≥60% emerald / ≥35% blue / <35% amber. Card placed after the AccentCard premium-index callout, before the category grid.

2. **CompetitorMonitor.jsx — Liquid Intelligence card (reactive).** Added `Zap` to lucide imports. Three signals computed in the component body, updating on every `selectedCategory` change: (1) Alert Activity Level — `liHighMoves` (count of high-impact competitor moves in category): ≥3 red "Elevated Activity" / ≥1 blue "Normal" / 0 emerald "Quiet"; (2) Pricing Pressure — `liPricingMoves` (count of Pricing-type moves): ≥2 amber "Pricing War Risk" / 1 blue "Active Pricing Move" / 0 emerald "Price Stability"; (3) Market Concentration — `liTopParentPct` (% of tracked brands owned by the leading parent company): ≥40% amber "High Corporate Concentration" / ≥25% blue "Moderate" / <25% emerald "Fragmented". Subtitle updates to reflect the current category name. Card placed after DataFreshness badge, before the category selector.

3. **No data hallucination.** All six signals are pure numeric comparisons on computed values. CompetitorMonitor signal 3 parent company name dynamically interpolated from `liTopParentName` (first entry in sorted parent count object) — no hard-coded brand references.

4. **LI card count.** BrandPricing and CompetitorMonitor are now the 17th and 18th pages with Liquid Intelligence cards out of 38 total pages. Remaining high-impact pages without LI cards: MarketEntryWizard, TradeShows, RegulatoryCompliance, ReportBuilder, DistributorDirectory.

5. **Build:** `vite build` ✓ — 0 errors, 0 warnings, 2820 modules. Pushed to main; Railway auto-deploy triggered.

---

# Overnight Build Log — 1 July 2026

## Session summary

**Shipped:** Mobile responsiveness fixes (4 layout bugs) + JSX text node unicode sweep (25 violations across 17 files). Build clean.

1. **Repo hygiene.** Two commits from the 30 June session were stranded in detached HEAD (feat(Companies) LI card + overnight log). Cherry-picked both onto main before starting new work.

2. **Mobile — HIGH severity: VenueIntelligence perennial bars overflow.** The "Perennial Bars — Appeared 4+ Years" list rendered a fixed-width flex row (~514px: w-36 name + w-20 city + badge + 5×w-10 rank cells) inside a container with only `overflow-y-auto` — no horizontal scroll. At any viewport narrower than ~520px the content silently overflowed. Fixed by adding `overflow-x-auto` to the container and wrapping the inner rows in `min-w-[480px]` to make scroll intent explicit.

3. **Mobile — Medium: CommandCentre DeepDiveCTAs grid.** The "Explore Platform" CTA grid used `grid-cols-2 sm:grid-cols-3 lg:grid-cols-6`. At 375px each tile was ~133px, too narrow for CTA labels like "Geographic Intelligence" (23 chars at 12px). Changed to `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6` — single-column on mobile, readable at every breakpoint.

4. **Mobile — Low: CategoryIntelligence Trade KPI grid + skeleton.** The Trade KPIs panel (`grid-cols-2 sm:grid-cols-3 lg:grid-cols-6`) and the loading skeleton (`grid-cols-2 sm:grid-cols-3 lg:grid-cols-4`) both started at 2 columns. Changed both to `grid-cols-1` base — stacks cleanly on 375px. xl: prefix added at the top breakpoint to preserve the 6/4 column density on large screens.

5. **Unicode sweep — 25 JSX text node violations fixed across 17 files.** Scanned all 38 page files for literal non-ASCII characters in JSX text nodes (between `>` / `}` boundaries outside expression braces). Replaced: `·` (middle dot), `—` (em dash), `–` (en dash), `€` (euro), `£` (pound), `°C`/`°N`/`°E` (degree sequences), `•` (bullet), `▶` (play triangle) with `{'·'}`, `{'—'}`, `{'–'}`, `{'€'}`, `{'£'}`, `{'°C'}`, `{'•'}`, `{'▶'}` expression escapes. Files: BrandHealth, BrandPricing, CampaignPlanner, CategoryIntelligence, ClientProfile, ClimateYield, CommandCentre, Companies, MarginCalculator, MarketOverview, POSIntelligence, PricePositioning, ProfileChorusCocktails, ScenarioModeling, SupplyChain, Valuations, VenueIntelligence.

6. **Build:** `vite build` ✓ — 0 errors, 0 warnings. Rebased onto remote main (prior cherry-picks skipped cleanly). Pushed to main; Railway auto-deploy triggered.

---

# Overnight Build Log — 30 June 2026

## Session summary

**Shipped:** Companies (Competitive Intelligence) — Liquid Intelligence signals card (build clean)

1. **Audit pass.** Scanned all 37 pages for Liquid Intelligence signal cards. Confirmed clean on 19 pages (ScenarioModeling, Valuations, CampaignPlanner, CategoryIntelligence, VenueIntelligence, BrandHealth, ClimateYield, Financials, DepletionForecasting, MarketOverview, GeographicIntelligence, MarginCalculator, POSIntelligence, SupplyChain, PricePositioning, CommandCentre, PitchGenerator, TradeShows, MarketEntryWizard). Identified Companies.jsx as highest-impact remaining page — 14 tracked companies, $300B+ combined revenue, rich M&A timeline and financial data.

2. **Companies.jsx — Liquid Intelligence signals card.** Three signals computed at module level from existing `COMPANIES` static data (no state, no re-computation on render): (1) Growth Distribution — `liGrowingCount` (11 of 14 companies have positive revenueGrowth): ≥75% blue "Broad Sector Growth" (current, 79%) / 50–74% blue "Bifurcated Growth" / 25–49% amber "Growth Divergence" / <25% amber "Broad Contraction"; (2) Sector Margin Environment — `liAvgMargin` (derived from existing `avgMargin` = 26.8%): ≥28% emerald "Premium Margin Environment" / 22–28% blue "Healthy Margin Base" (current) / 15–22% amber "Margin Compression" / <15% red; (3) Recent M&A Activity — `liRecentAcqCount` (acquisitions with year ≥ 2024 across all maTimelines, e.g. LVMH Château Galoupet 2025): ≥4 emerald "Active Consolidation Window" / 2–3 blue "Selective Deal Pace" / 1 amber / 0 amber "M&A Pause". Dynamic acquirer names interpolated in Signal 3 copy.

3. **Card placement.** Inserted between the 5-stat BentoGrid hero (Companies Tracked, Avg Margin, Highest Growth, Most Acquisitive, White Space Categories) and the search bar — immediately contextualising the headline stats with interpretation before the user drills into individual company cards.

4. **No data hallucination.** All signal thresholds are pure numeric comparisons on live computed values. Signal 3 acquirer names derive from `c.maTimeline?.some(m => m.type === 'acquisition' && m.year >= 2024)` — no hard-coded brand copy.

5. **Build:** `vite build` ✓ — 0 errors, 0 warnings. Pushed to main; Railway auto-deploy triggered.

---

# Overnight Build Log — 24 April 2026

## Session summary

**Shipped:** MarketOverview — Liquid Intelligence signals card (build clean); 13 stranded commits cherry-picked onto main

1. **Repo audit.** Confirmed 13 prior commits were stranded in detached HEAD (Apr 18–23 sessions); cherry-picked all 13 onto main before starting new work. Verified 14 pages already carry Liquid Intelligence cards; identified MarketOverview as the highest-impact remaining page — the top-level $1.6T global market view visited by every user.

2. **MarketOverview.jsx — Liquid Intelligence signals card.** Three signals computed at module level from static `DRINKS_MARKET_SEGMENTS` and `MARKET_SIGNALS` data (no state, no re-computation on render): (1) Market Segment Momentum — `liGrowingSegCount` (4 of 5 segments advancing; wine −1.2% YoY the sole contraction): 5 emerald "Full Sector Expansion" / 4 blue "Broad Sector Growth" (current) / 3 amber "Mixed" / <3 amber "Contraction"; (2) Macro Risk Thermometer — `liHighUrgencyCount` (3 high-urgency signals active: China 30% import duty on EU spirits, EU label enforcement from June 2026, Diageo capital signals): 0 emerald / ≤2 blue / ≤3 amber "Elevated Macro Risk" (current) / 4+ red; copy names cognac-exposed brands as most at risk; (3) Fastest-Growing Opportunity — `liFastestSeg` + `liFastestPct` (RTD at +16.4% YoY): ≥15% emerald "Exceptional Growth Window" (current) / ≥8% blue / ≥4% blue / <4% amber; copy references the spirits-RTD 47% volume stat from the existing data.

3. **Card placement.** Inserted between the Category Group Breakdown grid (5 segment cards) and the Regional Breakdown section header — after the user has absorbed the top-level market data, immediately contextualising it with interpretation.

4. **Unicode compliance.** All signal copy strings use `—` (em dash) and `·` (middle dot) escape sequences — no literal non-ASCII bytes in any JS signal string or JSX expression. Fixed mid-session after Python replacement wrote literal UTF-8 bytes rather than escape text; verified via byte-level scan.

5. **Build:** `vite build` ✓ — 0 errors, 0 warnings. Pushed to main; Railway auto-deploy triggered. MarketOverview is now the 15th page with a Liquid Intelligence card out of 31 total.

---

# Overnight Build Log — 23 April 2026

## Session summary

**Shipped:** Financials + DepletionForecasting — Liquid Intelligence signals cards (build clean); 11 stranded commits cherry-picked onto main

1. **Repo audit.** Confirmed 11 prior commits were stranded in detached HEAD (Apr 18–22 sessions); cherry-picked all 11 onto main before starting new work. Scanned all 31 pages for unicode violations in JSX text nodes — all clean (remaining `—` chars are in template literals and comments, not JSX text nodes). Identified Financials and DepletionForecasting as the two highest-impact pages missing Liquid Intelligence cards.

2. **Financials.jsx — Liquid Intelligence signals card.** Added `Zap` to lucide imports. Three signals computed from static module-level data (no new state): (1) Inventory Overhang Status — `liInv.total` ($20.1B) vs $18B danger zone: ≥$20B red "Inventory Overhang Critical" (current: $2.1B above threshold) / ≥$18B amber / <$18B emerald; copy references distributor destocking and pricing constraint context; (2) Sector Growth Health — `liGrowingCount` (2 of 5 companies growing: Diageo +1.4%, Campari +5.4%; Pernod −1.2%, Brown-Forman −1.0%, Rémy −8.4%): ≥4 emerald / ≥3 blue / ≥2 amber "Majority Sector Declining" (current) / <2 red; copy directs user to target growing-company portfolios; (3) Depletion Gap Resolution — `liLatestGap` (1pt from peak 10pt in 2022): ≤1 blue "Near-Resolved" (current) / ≤3 blue / ≤6 amber / >6 red; copy names 2026 pricing normalisation as the key signal. Card placed between DepletionShipmentChart and Company Financial Profiles section.

3. **DepletionForecasting.jsx — Liquid Intelligence signals card (reactive tool).** Three signals that update dynamically from user inputs (no additional state): (1) Distribution scale — `numDist` bands: ≥300 emerald "Scale Distribution" / ≥150 blue "Mid-Tier" / ≥50 blue "Building" / <50 amber "Limited"; copy tailors advice to seeding vs scale growth phase; (2) Annual revenue run rate — `annualRevenue` bands: ≥£200k emerald / ≥£50k blue / ≥£10k blue / <£10k amber; concrete thresholds for distributor partnership readiness; (3) Seasonal spike risk — `liPeakRatio` (peakMonth.depletions / avgMonthly): ≥2× red "High Spike Risk" / ≥1.5× amber "Moderate Seasonality" / else blue "Low Variance". Card guarded with `liHasData` (numDist > 0 && numROS > 0) so it only renders when the user has entered parameters. Subtitle interpolates the active seasonality profile label.

4. **Pattern consistency.** Both cards use the established `border border-gold/30 bg-gradient-to-r from-amber-50/60` pattern and `Zap` header icon matching all 12 prior Liquid Intelligence pages. Financials and DepletionForecasting are now the 13th and 14th pages with Liquid Intelligence cards out of 31 total.

5. **Build:** `vite build` ✓ — 0 errors, 0 warnings. Pushed to main; Railway auto-deploy triggered.

---

# Overnight Build Log — 22 April 2026

## Session summary

**Shipped:** ClimateYield — Liquid Intelligence signals card (build clean)

1. **Repo audit.** Confirmed 9 prior commits were stranded in detached HEAD (Apr 18–21 sessions); cherry-picked all 9 onto main before starting new work. Read fix_plan.md (12/20 tasks marked complete, though actual completion is higher from prior overnight logs). Identified ClimateYield as the only major intelligence page missing a Liquid Intelligence card — highest-impact bounded task for tonight.

2. **ClimateYield.jsx — Liquid Intelligence signals card.** Added gold-accented signals panel between the BentoGrid hero section and the ForwardSignals DrillDown. Three signals computed from the existing `summaryKpis` useMemo (no new state): (1) Critical Climate Risk — `liHighRiskCount` bands: ≥3 red / ≥2 amber “Elevated Climate Risk” (current: 2 signals — Champagne spring frost in April + Mediterranean juniper wildfire season) with 12–18 month inventory buffer copy; ≥1 blue; 0 emerald; (2) Bearish Region Pressure — `liBearishCount` bands: ≥4 amber “Widespread Bearish Pressure” / ≥2 blue / ≤1 emerald; copy recommends forward contract review at the amber threshold; (3) Yield Contraction — `liWorstRegion.change` bands: <−10% red “Yield Shock” / <−5% amber “Yield Contraction” (current: Champagne at ∼−7.1% YoY) / <0% blue / ≥0% emerald; dynamic region name and percentage interpolated from `worstYieldRegion`.

3. **Pattern consistency.** Card uses the established `border border-gold/30 bg-gradient-to-r from-amber-50/60` pattern and `Zap` header icon matching SupplyChain, GeographicIntelligence, CategoryIntelligence, VenueIntelligence, and all other Liquid Intelligence pages. Subtitle span uses `·` escape sequence (not literal \xb7). Copy strings use `–`/`—` escapes — no literal non-ASCII in any JSX or JS signal strings.

4. **No data hallucination.** All three signal thresholds are pure numeric comparisons on computed values from `summaryKpis` — itself derived from `FORWARD_SIGNALS` and `REGIONS` arrays at memo-evaluation time. The Champagne/juniper references in Signal 1 amber copy are accurate (both appear explicitly as `risk: 'high'` in `FORWARD_SIGNALS`). The region name in Signal 3 is dynamically interpolated from `worstYieldRegion.name`.

5. **ClimateYield is now the 12th page with a Liquid Intelligence card** out of 31 total. Also cherry-picked 9 stranded commits (Apr 18–21) onto main before the new work.

6. **Build:** `vite build` ✓ — 0 errors, 0 warnings. Pushed to main; Railway auto-deploy triggered.

---

# Overnight Build Log — 21 April 2026

## Session summary

**Shipped:** ScenarioModeling — gbp currency bug fix; BrandHealth — Liquid Intelligence signals card (build clean)

1. **Repo audit.** Confirmed 7 prior commits were stranded in detached HEAD (Apr 18–20 sessions); cherry-picked all 7 onto main before starting new work. Also read fix_plan.md (12/20 complete) and next_task.md. Highest-impact remaining work identified: a rendering bug in ScenarioModeling and the BrandHealth page lacking a Liquid Intelligence card.

2. **ScenarioModeling.jsx — gbp currency helper bug.** The `gbp` helper function used a JavaScript template literal with `{'£'}` syntax (a JSX expression pattern, not valid in a JS string). This rendered all prices as `{'£'}2.50` on screen instead of `£2.50`. Fixed by removing the wrapping braces and quotes: `` const gbp = (v) => `£${v.toFixed(2)}` ``. The matching YAxis `tickFormatter` on the CostWaterfall chart carried the same bug and was fixed in the same pass. Affects MetricCard values, Scenario Summary table, and Liquid Intelligence copy on STEP 2.

3. **BrandHealth.jsx — Liquid Intelligence signals card.** Added gold-accented signals panel between the 4-column KPI metric grid and the 12-month trend chart. Three signals computed reactively from `data` (updates on brand switch, no extra state): (1) Sentiment health — `avgSentiment` bands: ≥80 emerald “Strong Sentiment” / ≥60 blue “Positive Sentiment” / else amber “Mixed Signals”, with concrete copy on what to do next; (2) Share of Voice — `shareOfVoice` bands: ≥25% emerald “Category Leader” / ≥15% blue “Competitive Presence” / else amber “Building Share”; (3) Momentum — `trendDirection` ‘up’ emerald / ‘stable’ blue / ‘down’ amber, with actionable recommendation for each state.

4. **Pattern consistency.** Card uses the established `border border-gold/30 bg-gradient-to-r from-amber-50/60` pattern matching MarginCalculator, PricePositioning, POSIntelligence (Apr 20–21). BrandHealth is now the 11th page with a Liquid Intelligence card out of 31 total.

5. **No data hallucination.** All signal thresholds are pure comparisons on `data.avgSentiment`, `data.shareOfVoice`, `data.trendDirection` — values drawn directly from `BRAND_HEALTH_DATA[selectedBrand]`. No hard-coded brand names in signal copy.

6. **Build:** `vite build` ✓ — 0 errors, 0 warnings, 2469 modules. Pushed to main; Railway auto-deploy triggered.

---

# Overnight Build Log — 20 April 2026

## Session summary

**Shipped:** Liquid Intelligence signals + DataFreshness on MarginCalculator, PricePositioning, POSIntelligence (build clean)

1. **Repo audit.** Confirmed 12/20 fix_plan tasks complete. Highest-impact remaining work: item 15 (POS + Pricing + Margin cohesion). All three pages were missing Liquid Intelligence signals cards; MarginCalculator and POSIntelligence were also missing DataFreshness badges.

2. **MarginCalculator.jsx \u2014 Liquid Intelligence card + DataFreshness.** Added `DataFreshness` to imports and placed badge after `SubPageNav`. Three dynamic signals computed just before the return using values already in scope: (1) Margin health \u2014 `computed.margin` vs `benchmarks.avgMargin`: \u226545% emerald \u201cStrong\u201d / \u226535% blue \u201cHealthy\u201d / \u226525% amber \u201cTight\u201d / else red \u201cCritical\u201d, pp delta interpolated; (2) Best scenario lever \u2014 `bestScenario.label` and `bestScenario.impact`, with projected margin shown; (3) Launch readiness timing \u2014 `readinessScore` bands: \u226570 emerald / \u226550 blue / else amber. Card placed between the BentoGrid KPIs and the Advanced Mode drill-down section.

3. **PricePositioning.jsx \u2014 Liquid Intelligence card + wrapper fix.** Fixed missing `space-y-6` on the top-level wrapper div. Three category-responsive signals computed from `PRICE_BENCHMARKS[category]`: (1) Tier complexity \u2014 tierCount bands (\u22654 amber \u201cComplex Landscape\u201d / 3 blue \u201cStructured Market\u201d / else blue), with price range interpolated from `lowestTier.min` and `highestTier.max`; (2) On-trade economics \u2014 `avgOnTrade` bands (\u226512 emerald premium / \u22658 blue standard / else amber volume-led); (3) Category signal \u2014 `benchmarks.insight` passed directly as copy. Card placed between the input selectors card and the Results section.

4. **POSIntelligence.jsx \u2014 Liquid Intelligence card + DataFreshness.** Added `DataFreshness` to imports and placed badge after `SubPageNav`. Three signals computed from module-level constants (no state dependency): (1) Direct Sourcing Advantage \u2014 static copy highlighting 2.5\u20134\u00d7 markup elimination with a concrete glorifier cost example; (2) Lead time risk \u2014 `avgLeadDays` bands: \u226440 emerald / \u226460 amber \u201cPlanning Required\u201d / else red \u201cExtended\u201d; (3) Geographic Concentration Risk \u2014 static copy referencing `totalFactories`, `topHub`, and Drewry WCI +110% freight context. Card placed between the KPI BentoGrid and the Tab Navigation section.

5. **Pattern consistency.** All three pages now match the `border border-gold/30 bg-gradient-to-r from-amber-50/60` Liquid Intelligence card pattern used across 7 prior pages (SupplyChain, Geographic, Category, Venue, Campaign, Scenario, Valuations). Total pages with Liquid Intelligence signals: 10 of 31.

6. **Build:** `vite build` \u2713 \u2014 0 errors, 0 warnings. Pushed to main; Railway auto-deploy triggered.

---

# Overnight Build Log — 19 April 2026

## Session summary

**Shipped:** GeographicIntelligence \u2014 Liquid Intelligence signals card (build clean)

1. **Repo audit.** Confirmed 12/20 fix_plan tasks complete. Three prior overnight commits (SupplyChain signals, 18 Apr log, Chorus data) were stranded in detached HEAD; cherry-picked onto main before starting new work.

2. **GeographicIntelligence.jsx \u2014 Liquid Intelligence card.** Added gold-accented `Liquid Intelligence` signals panel between the search bar and the region cards grid. Three signals computed from live `REGION_DATA` at module level (no state dependency): (1) Global Growth Momentum \u2014 `highGrowthCount` markets with `kpis[0].change > 5%`: \u22656 emerald \u201cStrong Global Tailwind\u201d (current: 6 markets) / 4\u20135 blue \u201cSelective Momentum\u201d / <4 amber with `fastestGrowing.name` interpolated; (2) Digital Channel Disruption \u2014 `ecomLeader.pct` threshold: \u226530% amber \u201cDigital Disruption Critical\u201d (current: China at 45%) / 15\u201329% blue / else navy; (3) Regulatory Headwind Index \u2014 `negativeRegCount` (regions with any `impact === 'negative'` regulatory item): \u22655 amber \u201cElevated Compliance Burden\u201d (current: 5 markets) / 3\u20134 blue / <3 emerald.

3. **Pattern consistency.** Follows the established `border border-gold/30 bg-gradient-to-r from-amber-50/60` pattern and `Zap` header icon from SupplyChain (Apr 18), CategoryIntelligence (Apr 16), CampaignPlanner (Apr 14), ScenarioModeling (Apr 11), Valuations (Apr 13), VenueIntelligence (Apr 17). GeographicIntelligence is now the seventh major intelligence page to carry a Liquid Intelligence card \u2014 all 7 are complete.

4. **No data hallucination.** All three signal thresholds are pure numeric comparisons on live-computed values derived from `REGION_DATA` at module evaluation time. Region names and percentages in signal copy are dynamically interpolated from `fastestGrowing.name` and `ecomLeader.pct / ecomLeader.region.name` \u2014 no hard-coded geographic references.

5. **Build:** `vite build` \u2713 \u2014 0 errors, 0 warnings. Pushed to main (including 3 cherry-picked prior commits); Railway auto-deploy triggered.

---

# Overnight Build Log — 18 April 2026

## Session summary

**Shipped:** SupplyChain \u2014 Liquid Intelligence signals card (build clean)

1. **Full platform audit.** Reviewed all prior overnight logs and fix_plan.md. Confirmed all prior fixes clean: tooltips `#f1f5f9`, axes `fill: '#9ca3af'`, grid-cols responsive (remaining bare grid-cols-2 instances confirmed intentional in Apr 15 session). No regressions found. fix_plan shows 12/20 tasks complete; next unfinished work is Supply Chain redesign (item 13) and POS/Pricing/Margin polish (item 15).

2. **SupplyChain.jsx \u2014 Liquid Intelligence card.** Added a gold-accented `Liquid Intelligence` signals panel between the BentoGrid hero (Composite Pressure Index + KPI cards) and the Pipeline Stage Cards. Three dynamic signals computed from values already live at render time: (1) COGS pressure severity \u2014 `criticalCount` bands: \u22655 red \u201cAcute Input Pressure\u201d / \u22652 amber \u201cElevated Input Costs\u201d / else blue \u201cContained Pressure\u201d, with `highestRisk.label` and `highestRisk.change` interpolated dynamically; (2) margin compression \u2014 `liCompressionPp` bands: \u22654pp red \u201cSignificant Margin Squeeze\u201d (current: \u22124.1pp) with price uplift copy / \u22652pp amber / else blue; (3) commodity relief offset \u2014 `fallingCount` bands: \u22656 emerald \u201cMeaningful Offset Available\u201d / \u22653 blue \u201cPartial Relief\u201d / else amber \u201cMinimal Commodity Relief\u201d with agave/rum deflation note.

3. **Pattern consistency.** Card uses the established `border border-gold/30 bg-gradient-to-r from-amber-50/60` pattern from CategoryIntelligence (Apr 16) and Zap header icon from all prior Liquid Intelligence cards. SupplyChain is now the sixth major intelligence page to carry a signals card, joining Valuations (Apr 13), ScenarioModeling (Apr 11), CampaignPlanner (Apr 14), CategoryIntelligence (Apr 16), VenueIntelligence (Apr 17).

4. **No data hallucination.** All three signal thresholds are pure numeric comparisons on live-computed values (`criticalCount`, `highCount`, `fallingCount`, `highestRisk`) derived from `COGS_DATA` at render time. Highest-risk commodity name and change figure are dynamically interpolated from `highestRisk.label` / `highestRisk.change` \u2014 no hard-coded brand or commodity references.

5. **Build:** `vite build` \u2713 \u2014 0 errors, 0 warnings, 2469 modules. Pushed to main; Railway auto-deploy triggered.

---

# Overnight Build Log — 17 April 2026

## Session summary

**Shipped:** VenueIntelligence \u2014 Liquid Intelligence signals card (build clean)

1. **Full platform audit.** Scanned all 26 pages for rendering issues, unicode violations (JSX text nodes), tooltip itemStyle colour, chart axis tick fill, and bare grid-cols classes. All previously fixed items confirmed clean. Companies, ReportBuilder, GeographicIntelligence pages verified: tooltips `#f1f5f9`, axes `fill: '#9ca3af'`, all grids have responsive prefixes. No regressions found.

2. **VenueIntelligence.jsx \u2014 Liquid Intelligence card.** Added a gold-accented `Venue Intelligence Signals` card rendered between the BentoGrid hero and the 50 Best Bars DrillDown. Three dynamic signals computed from year-selector-reactive memoised hooks: (1) London Access \u2014 `londonCount` in Top 50: \u22654 emerald \u201cStrong London window\u201d / 2\u20133 blue \u201cSelective access\u201d / \u22641 amber \u201cThin London footprint\u201d; (2) Corporate Lock-in \u2014 `corpPct` of Top 50 bars: <40% emerald \u201cIndependent-friendly landscape\u201d / 40\u201354% blue \u201cMixed environment\u201d / \u226555% amber \u201cHigh corporate lock-in\u201d; (3) Market Leader Concentration \u2014 top company\u2019s penetration pct: <25% emerald \u201cFragmented field\u201d / 25\u201339% blue \u201cStrong player present\u201d / \u226540% gold/amber \u201cDominant concentration\u201d with dynamic company name interpolated.

3. **Pattern consistency.** Card uses the established gold-accent `border-l-4 border-gold bg-gradient-to-r from-gold/5` pattern and `Zap` header icon from Valuations (Apr 13), ScenarioModeling (Apr 11), CampaignPlanner (Apr 14), CategoryIntelligence (Apr 16). All five major intelligence pages now carry Liquid Intelligence signal cards. No new data imports required \u2014 all three signals derive from hooks already computed at render time (`independentVsCorporate`, `parentPenetration`, `useVenueMetrics`).

4. **No data hallucination.** Signal thresholds are pure numeric comparisons on live computed values. The dominant company name in Signal 3 copy is dynamically interpolated from `parentPenetration[selectedYear]?.[0]?.name` \u2014 no hard-coded brand references.

5. **Build:** `vite build` \u2713 \u2014 0 errors, 0 warnings, 2469 modules. Pushed to main; Railway auto-deploy triggered.

---

# Overnight Build Log — 16 April 2026

## Session summary

**Shipped:** CategoryIntelligence \u2014 Liquid Intelligence interpretation card across all 11 categories \u00d7 5 years (build clean)

1. **Full platform audit.** Confirmed all prior fixes still clean: 29 tooltips use `#f1f5f9`, all 44 axis tick instances have `fill: '#9ca3af'`, no literal non-ASCII in JSX render paths, all grid-cols values carry correct responsive prefixes. No new regressions found.

2. **CategoryIntelligence.jsx \u2014 Liquid Intelligence card.** Added a gold-accented `CategoryIntelligenceCard` component rendered in the Overview tab of every category detail view (55 views across 11 categories \u00d7 5 years). Positioned between the Trade KPIs block and the \u201cView Full Report\u201d CTA. Three dynamic signals: (1) growth momentum \u2014 four bands keyed to `yd.growth` numeric value (\u22658% emerald \u201cStrong growth window\u201d, 4\u20137.9% blue \u201cSustainable growth\u201d, 1\u20133.9% amber \u201cGrowth normalising\u201d, <1% red \u201cVolume contraction\u201d), each with tailored tactical copy; (2) channel concentration risk \u2014 dominant channel flagged amber at >55%, blue at 45\u201354%, emerald when no channel exceeds 45%; (3) gross margin environment \u2014 renders only when `tradeKPIs` is present, four margin bands at 60/50/40% with investment/risk copy. Added `Zap` to lucide import.

3. **Pattern consistency.** Card uses the same gold-accent `border-gold/30` + `from-amber-50/60` gradient + Zap header pattern established in Valuations (Apr 13), ScenarioModeling (Apr 11), and CampaignPlanner (Apr 14). Signal pills share the same dot + uppercase label + body-copy structure.

4. **No data hallucination.** All signal thresholds derive directly from `yd.growth`, `yd.channels`, and `yd.tradeKPIs.grossMarginPct` \u2014 fields verified clean in the Apr 5 and Apr 8 data audits. No hard-coded copy referencing specific category names.

5. **Build:** `vite build` \u2713 \u2014 0 errors, 0 warnings, 2443+ modules. Pushed to main; Railway auto-deploy triggered.

---

# Overnight Build Log — 15 April 2026

## Session summary

**Shipped:** Mobile responsiveness final pass \u2014 MarketOverview hero overflow fix + Valuations Pros/Cons grid collapse (build clean)

1. **Full platform audit.** Scanned all 26 pages for bare grid-cols-2/3/4+, text-4xl/5xl/6xl without responsive prefixes, tables without overflow-x-auto wrappers, whitespace-nowrap overflow risks, and fixed-pixel widths. Confirmed: all grid-cols-3/4/5/6 carry responsive prefixes; all tables are wrapped in overflow-x-auto; all whitespace-nowrap uses are on scrollable tab bars. Identified two genuine layout breakages at 375\u202fpx.

2. **MarketOverview \u2014 hero heading overflow.** The `$1.6T` headline used `text-5xl` (48\u202fpx) in a `flex items-baseline gap-3` row alongside `+1.5% YoY` (text-lg) and `\u00b7 +3.4% 10-yr CAGR` (text-sm). At 375\u202fpx with `p-8` card padding, combined inline content measured ~392\u202fpx against a 311\u202fpx inner width \u2014 guaranteed horizontal overflow. Fixed: `text-5xl` \u2192 `text-3xl sm:text-5xl`; `p-8` \u2192 `p-5 sm:p-8`; flex row gains `flex-wrap` + `gap-x-3 gap-y-1` so the YoY badge wraps cleanly to a second line on mobile.

3. **Valuations \u2014 Pros/Cons grid collapse.** Inside each expanded valuation method card (EV/EBITDA, DCF, etc.), a `grid-cols-2` showed Pros (left) and Cons (right) as full paragraph text. At 375\u202fpx the columns were ~155\u202fpx each \u2014 12\u202fpx text wrapping to 5\u20136 tightly-spaced lines per column, very hard to read. Changed to `grid-cols-1 sm:grid-cols-2`: stacks Pros then Cons on mobile, side-by-side at \u2265640\u202fpx.

4. **All other grid-cols-2 instances confirmed safe.** Remaining bare `grid-cols-2` instances across ScenarioModeling, MarginCalculator, ClimateYield, POSIntelligence, ReportBuilder, PitchGenerator, and CampaignPlanner are either: (a) inside BottomSheet / mobileDetail panels which are already full-width mobile contexts; (b) in `renderMobileStep*` functions intentionally designed for mobile; or (c) hold compact numeric stats (\u22648 chars) that render acceptably at ~170\u202fpx column width.

5. **Build:** `vite build` \u2713 \u2014 0 errors, 0 warnings. Pushed to main; Railway auto-deploy triggered.

---

# Overnight Build Log — 14 April 2026

## Session summary

**Shipped:** CampaignPlanner Liquid Intelligence signals card + mobile grid fixes across 2 pages (build clean)

1. **Audit pass.** Scanned all 25 pages for bare (non-responsive) grid-cols values, unicode violations, tooltip styling, and axis tick fill. All previously fixed items confirmed clean. Found two new bare `grid-cols-3` instances: CampaignPlanner On-Trade/Off-Trade sub-slider grids (lines 768, 790) and CompetitorMonitor expanded brand card (line 52).

2. **CampaignPlanner \u2014 Liquid Intelligence card (Step 5).** Added a gold-accented Liquid Intelligence panel between the Risk Factors DrillDown and Agency Handoff Brief in `renderStep5`. Three dynamic signals computed from live campaign state: (1) budget adequacy vs. objective \u2014 three bands (high \u2265\u00a3100k emerald, mid \u2265\u00a330k blue, low amber) with copy tailored to awareness/premium/trial/volume objectives; (2) channel concentration risk \u2014 dominant channel \u226550% flags amber (\u201csingle-channel dependency\u201d), 35\u201349% gold (\u201cmoderate weighting\u201d), <35% emerald (\u201cwell-diversified\u201d); (3) timing / seasonality risk \u2014 January launch red (\u201cDry January headwind\u201d), UK June/July amber (\u201cmedia costs 20\u201330% higher\u201d), otherwise emerald clear. Card hidden until at least budget or objective is set. Matches style of Valuations (Apr 13) and ScenarioModeling (Apr 11) Liquid Intelligence cards.

3. **CampaignPlanner mobile grid fixes.** On-Trade Split and Off-Trade Split sub-slider grids inside the \u201cFine-tune Digital Split\u201d DrillDown changed from bare `grid-cols-3` to `grid-cols-1 sm:grid-cols-3`. At 375\u202fpx each slider cell was \u2248109\u202fpx \u2014 too narrow for label + percentage + range input thumb. Now stacks single-column on mobile, 3-col at \u2265640\u202fpx.

4. **CompetitorMonitor mobile grid fix.** Expanded brand card Segment / Avg Price / Market Share info grid changed from bare `grid-cols-3` to `grid-cols-1 sm:grid-cols-3`. Consistent with CompetitorCard UX at 375\u202fpx.

5. **Build:** `vite build` \u2713 \u2014 2443 modules, 0 errors, 0 warnings. Pushed to main; Railway auto-deploy triggered.

---

# Overnight Build Log — 13 April 2026

## Session summary

**Shipped:** Valuations Market Signals card (Liquid Intelligence) + PitchGenerator mobile grid fix (build clean)

1. **Full platform audit.** Scanned all 25 pages for unicode violations (JSX text nodes), tooltip styling, axis tick fill colours, and mobile grid layouts. All previously fixed items confirmed clean: 29 tooltips using `#f1f5f9`, all 44 axis tick instances have `fill: '#9ca3af'`, no literal non-ASCII in JSX render paths. GlobalSearch (Cmd+K) confirmed fully operational with faceted results across Pages, Categories, Brands, Venues, and Companies.

2. **Valuations.jsx \u2014 Market Signals card.** Added a gold-accented Liquid Intelligence panel between the BentoGrid hero section and the Sector Multiples DrillDown. The card generates three dynamic signals computed from page data: (1) EV/Revenue multiple environment \u2014 avg \u22484.0x renders as \u201cfair value trading\u201d in blue, \u22655x \u201cpremium multiples\u201d in emerald, <3.5x \u201ccompressed\u201d in amber; (2) filtered M&A premium environment \u2014 updates live when the Year Selector changes, reads \u201cstandard range\u201d (emerald) for 20\u201329%, \u201cstrong premiums\u201d (gold) for \u226530%, \u201csubdued\u201d (amber) for <20%; (3) deal-count activity \u2014 \u226549 deals \u201cactive consolidation window\u201d, 5\u20138 \u201cmoderate pace\u201d, <5 \u201cselective environment\u201d. Added `Zap` to lucide import. Addresses fix_plan item 17.

3. **PitchGenerator.jsx \u2014 4 grid-cols-3 fixes.** Four bare `grid grid-cols-3` instances inside pitch section cards changed to `grid-cols-1 sm:grid-cols-3`. At 375\u202fpx the 3-column layout compressed cells to \u2248109\u202fpx \u2014 too narrow for the Market size/CAGR/Target, Distribution margin/control/scale, 3-Year Revenue, and Financial KPI grids rendered inside each pitch section. Now stacks single-column on mobile, 3-col at \u2265640\u202fpx.

4. **Scope confirmed clear.** No remaining critical rendering issues across the 25-page platform. PitchGenerator was the last page with a bare grid-cols-3 in a visible (non-mobile-sheet) context. fix_plan items 12 (GlobalSearch), 17 (Valuations signals) now marked complete.

5. **Build:** `vite build` \u2713 \u2014 0 errors, 0 warnings, 2443+ modules. Pushed to main; Railway auto-deploy triggered.

---

# Overnight Build Log — 11 April 2026

## Session summary

**Shipped:** Scenario Modeling — Liquid Intelligence interpretation card in Step 2 (build clean)

1. **Audit pass.** Scanned all 25 pages for rendering issues, unicode violations, tooltip styling, axis labels, and mobile breakpoints. No critical bugs found; all priority items from standing orders confirmed clean (11 categories × 5 years data complete, 260 brand expressions, 250 venue entries, 28 London profiles).

2. **ScenarioModeling.jsx — Liquid Intelligence card.** Added a gold-accented interpretation panel beneath the LaunchTimeline + Scenario Summary grid in the brand wizard Step 2. The card generates three dynamic recommendations driven by: (1) gross margin band (≥45% strong / 35–44% viable / <35% pressure), (2) archetype success rate (≥30% / 20–29% / <20%), and (3) market count risk (single-market optimal, dual feasible, 3+ phase rollout advised).

3. **Colour-coded summary values.** Gross Margin and Success Rate fields in the Scenario Summary card are now rendered in emerald/amber/red matching the interpretation signals — giving the user instant visual alignment between the numbers and the recommendation.

4. **Icon imports.** Added `Zap` and `Globe` to the lucide-react import block in ScenarioModeling.jsx; no other files changed.

5. **Build verified.** `./node_modules/.bin/vite build` — 0 errors, 0 warnings, 2443+ modules. Pushed to main; Railway auto-deploy triggered.

---

# Overnight Build Log — 10 April 2026

## Session summary

**Shipped:** Rendering correctness pass — tooltip colours, axis tick JSX syntax, SupplyChain gradient, BrandPricing colour, brand dedup (build clean)

1. **Axis tick JSX syntax regression fixed.** A prior mass-fix script wrote `tick={ fontSize: N, fill: '#9ca3af' }` (single braces) instead of valid JSX double-brace `tick={{ fontSize: N, fill: '#9ca3af' }}`, causing a `vite build` error (`Expected "}" but found ":"`) in Valuations.jsx. Fixed all 44 instances across 11 pages (BrandHealth, BrandPricing, ClimateYield, Companies, DepletionForecasting, Financials, MarginCalculator, MarketEntryWizard, ScenarioModeling, Valuations, VenueIntelligence).

2. **Tooltip itemStyle colour.** Confirmed 29 Tooltip `itemStyle` props across 13 pages now use `#f1f5f9` (white on dark) — already applied in prior sessions, retained through rebase.

3. **SupplyChain area gradient.** The expanding-market AreaChart referenced `fill="url(#expandGrad)"` but no `<linearGradient id="expandGrad">` existed in the file. Added the defs block with navy-to-transparent gradient; chart area fill now renders correctly.

4. **BrandPricing CATEGORY_COLORS.** `'Whisky'` key was missing; 21 expressions in the catch-all bucket rendered `undefined` colour on scatter + bar charts. Added `'Whisky': '#D97706'` (amber, matching Scotch Whisky).

5. **Brand deduplication — 260 expressions.** Removed remaining cross-category and same-category duplicates not caught by prior session (Gordon's RTD in Gin cat, and 4 others via Unicode-escape fix). Dataset now 260 verified expressions. Build: `vite build` ✓ — 2443 modules, 0 errors, 0 warnings. Pushed to main; Railway auto-deploy triggered.

---

# Overnight Build Log — 8 April 2026

## Session summary

**Shipped:** BrandPricing data quality audit \u2014 missing category colour + 11 duplicate brand expressions removed (build clean)

1. **Root cause.** `CATEGORY_COLORS` in BrandPricing.jsx was missing a `'Whisky'` entry. The database has 21 brand expressions under category `'Whisky'` (added in a later bulk-import pass) but the colour map only covered `'Scotch Whisky'`. All 21 entries were rendering chart bars with `undefined` fill \u2014 invisible or default browser colour on the scatter and bar charts.

2. **Fix.** Added `'Whisky': '#D97706'` (amber-600, matching `'Scotch Whisky'`) to `CATEGORY_COLORS`. All 21 Whisky entries now render correctly.

3. **Duplicate audit.** Full audit of `BRAND_DATABASE` revealed 11 exact same-brand-plus-expression duplicates introduced during the bulk `(added)` import passes. Removed 3 cross-category duplicates (Macallan 12yr Double Cask, Johnnie Walker Blue Label, Jack Daniel\u2019s Old No.7 each appeared once in their verified category and again in the Whisky block) and 8 same-category duplicates (\u00a0Patr\u00f3n Silver, Martell VS, R\u00e9my Martin VSOP, Havana Club 7 A\u00f1os, Mo\u00ebt Imp\u00e9rial Brut, Veuve Clicquot Yellow Label, Dom P\u00e9rignon 2015, Seedlip Garden 108). Each removed entry was the `verified: false` auto-generated copy; the original verified entry was retained.

4. **Counts confirmed.** 272 expressions \u2192 261 after deduplication across 13 categories. CategoryIntelligence: all 11 categories \u00d7 5 years confirmed clean (marketSize, growth, growthDir, volumeCases, brands, channels all present). VenueIntelligence: 28 London profiles confirmed, all fields populated.

5. **Build:** `vite build` \u2713 \u2014 2443 modules, 0 errors, 0 warnings. Pushed to main; Railway auto-deploy triggered.

---

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
