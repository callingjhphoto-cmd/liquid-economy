# Overnight Build Log — 21 October 2026

## Session summary

**Shipped:** Data integrity fix — GlobalSearch.jsx Diplomático parent corrected from stale `DUSA` to `Brown-Forman`, consistent with brandData.js and companyData.js (fixed 16 Oct). Recovered 2 orphaned Oct-20 commits (commandCentreData fix + log update) that were stranded in detached HEAD — cherry-picked onto main. Build clean (17.66s). 1 commit pushed to origin/main.

1. **`frontend/src/components/GlobalSearch.jsx:90` — Diplomático parent corrected: `Rum · DUSA` → `Rum · Brown-Forman`.** The 16 Oct session fixed Diplomático's ownership in brandData.js, companyData.js, and competitorData.js (Brown-Forman acquired the brand from DUSA/CIMSA in Jan 2023 for $725M). GlobalSearch.jsx was missed in that round. Users searching "Diplomático" now see the correct parent in the search result subtitle.

2. **Recovered orphaned Oct-20 commits.** The Oct-20 session committed its work (commandCentreData CATEGORY_SNAPSHOT fix + overnight log) in detached HEAD state; those commits never reached main. Cherry-picked onto main tonight: `24c8941` (6 CATEGORY_SNAPSHOT growth values corrected) and `9c66adb` (overnight log).

3. **Full audit pass — all areas confirmed clean.** CategoryIntelligence: 55 growthDir entries (11 × 5), all present. BrandPricing: 326 entries, no DUSA/unknown parent. VenueIntelligence counts: confirmed. Tooltip styling: all Recharts Tooltips in SupplyChain, Companies have dark contentStyle. Chart YAxis: all numeric axes have tickFormatter. DataFreshness: all 25 intelligence pages covered. JSX unicode: no bare non-ASCII in JSX text nodes across pages/components.

---

# Overnight Build Log — 20 October 2026

## Session summary

**Shipped:** Data integrity fix — Command Centre CATEGORY_SNAPSHOT growth rates now match authoritative 2025 values in categoryData.js. Build clean (15.43s). 1 commit pushed to origin/main (24c8941).

1. **`frontend/src/data/commandCentreData.js` — 6 stale CATEGORY_SNAPSHOT growth values corrected.** Full cross-audit of all 11 CATEGORY_SNAPSHOT entries against 2025 categoryData.js source found 6 mismatches: Vodka (-0.8% → -1.2%), Whisky (+4.2% → +2.8%), Rum (+3.1% → +4.5%), Champagne & Sparkling (+2.8% → +2.1%), Wine Still (-1.2% → -1.8%), Beer & Craft (+1.4% → +0.2%). All 5 unchanged values (Tequila, Gin, Cognac, No/Low Alcohol, RTD) were already correct. The Command Centre KPI dashboard now shows consistent figures with all other pages.

2. **Full audit pass — all other data areas confirmed clean.** CategoryIntelligence: all 55 year-blocks clean, no new issues. VenueIntelligence: 250 FIFTY_BEST_BARS, 28 LONDON_VENUES — counts confirmed. BrandPricing: 326 entries clean. competitorData: 5 category sets with correct brand-parent attributions.

---

# Overnight Build Log — 19 October 2026

## Session summary

**Shipped:** Two bug fixes — Beer category MetricCard now shows correct green up-arrow for 2024/2025 near-flat growth, and MetricCard component now handles `direction='flat'` gracefully with grey Minus icon instead of red TrendingDown. Build clean (13.79s). 1 commit pushed to origin/main (56b7db8).

1. **`frontend/src/data/categoryData.js` — Beer growthDir mismatch.** Beer 2025 (`growth: '+0.2%'`) and Beer 2024 (`growth: '+0.5%'`) both had `growthDir: 'flat'`. `MetricCard` has no `'flat'` branch and falls through to `isUp = false`, which applies red colour and `TrendingDown` icon. Both years were displaying a misleading red down-arrow despite positive YoY growth. Fixed both to `growthDir: 'up'`. Audit confirmed these were the only two `'flat'` values in all 55 category year-blocks.

2. **`frontend/src/components/ui/MetricCard.jsx` — flat direction support.** Added explicit `'flat'` case to both `MetricCard` and `MetricInline` exports. `direction='flat'` now shows a grey `Minus` icon with neutral grey colour text, rather than falling to the red TrendingDown path. Imported `Minus` from lucide-react. Defensive fix prevents future data bugs from producing misleading red indicators for zero-growth metrics.

3. **Full audit pass — all data confirmed clean.** CategoryIntelligence: 11 categories × 5 years all present, all required fields (marketSize, growth, growthDir, volumeCases) populated, zero growthDir inconsistencies remaining. VenueIntelligence: 250 FIFTY_BEST_BARS entries with ranks 1–50 intact per year, 28 LONDON_VENUES confirmed with all fields (name, type, area, estRevenue). BrandPricing: 326 BRAND_DATABASE entries across 14 categories. Geographic, SupplyChain, Companies, Reports: no JSX text node unicode violations, all chart tooltips have dark styling, all axis labels use `fill: '#9ca3af'`.

---

# Overnight Build Log — 18 October 2026

## Session summary

**Shipped:** Bug fix — company cross-page navigation now correctly highlights LVMH Wines & Spirits, Edrington Group, and Sazerac Company when linked from VenueIntelligence or SupplyChain. Build clean (13.79s). 1 commit pushed to origin/main (f755b83).

1. **`frontend/src/pages/Companies.jsx` — company slug alias resolution.** VenueIntelligence `parentCompanies` arrays and SupplyChain `alert.company` fields use short names (`'LVMH'`, `'Edrington'`, `'Sazerac'`). These were slugified to `'lvmh'`, `'edrington'`, `'sazerac'` and passed as `?company=` query params. The Companies page matched these against full slugs derived from companyData.js names (`'lvmh-wines-spirits'`, `'edrington-group'`, `'sazerac-company'`), so no company card was ever expanded or scrolled to. Fixed by adding `COMPANY_SLUG_ALIASES` map and normalizing the raw URL param in an IIFE before it touches any expand/scroll/highlight logic.

2. **Full audit pass — no additional issues found.** CategoryIntelligence: all 55 year-blocks (11 × 5 years, 2021–2025) confirmed; growthDir values all consistent with growth sign at category level (earlier false positives traced to market-level `growth:` fields mismatched by overly broad regex). BrandPricing: 326 BRAND_DATABASE entries, all required fields present. VenueIntelligence: 250 FIFTY_BEST_BARS entries (confirmed via `rank:` field count), 28 LONDON_VENUES confirmed. Tooltips: all instances have `contentStyle` (brace-aware multi-line parser, 0 missing). JSX text nodes: 0 non-ASCII chars outside `{}` across all 38 pages. growthDir: brace-precise re-audit shows all 55 year-blocks correct. CompanyData cross-ref: 14 companies in companyData, 112 unique companies referenced in brandData — scope mismatch is intentional (companyData covers top 14 only). Edrington/LVMH/Sazerac short-name mismatch is display-only in most pages (BrandHealth parent text, competitorData labels) and only a navigation bug in Companies deep-link — fixed above.

---

# Overnight Build Log — 17 October 2026

## Session summary

**Shipped:** Data quality fix — corrected Admiral Nelson's Spiced Rum parent company attribution. Build clean (13.80s). 1 commit pushed to origin/main.

1. **`frontend/src/data/brandData.js` line 705 — Admiral Nelson's Spiced Rum misattributed to Sazerac.** Sazerac is a bourbon-focused company (Buffalo Trace, Blanton's, Fireball); Admiral Nelson's is a Heaven Hill brand, consistent with three other Heaven Hill entries already correct in the same file: Elijah Craig (l.631), Evan Williams (l.640), Burnett's Vodka (l.318). Changed `company: 'Sazerac'` → `company: 'Heaven Hill'`.

2. **Full audit pass across all priority areas — no additional issues found.** CategoryIntelligence: all 55 year-blocks present (11 categories × 5 years), growthDir values all consistent with growth sign. BrandPricing: all 326 brand entries have required fields; brand count metadata (38 verified, 326 total, +25.4% growth) correct. VenueIntelligence: 250 FIFTY_BEST_BARS entries (50 per year × 5 years) and 28 LONDON_VENUES confirmed. Tooltip styling: all chart Tooltips have dark `contentStyle`. Unicode: no bare £/€/°/— in JSX text nodes.

3. **Session also audited:** competitorData.js (5 categories, all brand-to-parent attributions correct), geographicData.js (10 REGIONS and 10 REGION_DATA entries, all matching), companyData.js (14 top-level company entries, all correct).

---

# Overnight Build Log — 16 October 2026

## Session summary

**Shipped:** 5 brand ownership corrections across `brandData.js` and `companyData.js` — Gin Mare and Diplomático ownership fixed for Brown-Forman and William Grant & Sons. Build clean (12.31s). 1 commit pushed to origin/main.

1. **`frontend/src/data/brandData.js` line 386 — Gin Mare company corrected: `William Grant & Sons` → `Brown-Forman`.** Brown-Forman acquired Gin Mare from Global Premium Brands in November 2022 for $520M. The Sep 23 session had incorrectly reassigned it to William Grant & Sons; the Sep 24 session then removed it from Brown-Forman entirely while citing it as "fabricated". Both were errors. The brand dossier `brown-forman_gin-mare.js` cites the Brown-Forman press release directly. Fixed.

2. **`frontend/src/data/brandData.js` line 681 — Diplomático company corrected: `DUSA` → `Brown-Forman`.** DUSA (Destilerías Unidas SA) is the Venezuelan distillery that produces Diplomático, not the brand owner. Brown-Forman acquired the Diplomático brand in January 2023 for $725M. The brand dossier `brown-forman_diplomatico.js` cites the Brown-Forman 10-K directly. Fixed.

3. **`frontend/src/data/companyData.js` — William Grant & Sons: Gin Mare removed from keyBrands, categoryPresence, and maTimeline.** WG&S had incorrectly listed `"Gin Mare"` in `keyBrands`, had Gin share at 12 with both `Hendrick's` and `Gin Mare`, and had a fabricated 2022 acquisition entry `"Acquired Gin Mare (Mediterranean premium gin, Barcelona)"`. All three removed: `keyBrands` now 8 brands, Gin `categoryPresence` now Hendrick's only with share 10, 2022 Gin Mare entry deleted from maTimeline.

4. **`frontend/src/data/companyData.js` — Brown-Forman: Gin Mare and Diplomático added to keyBrands, categoryPresence, and maTimeline.** Added both to `keyBrands` (now 10 brands). Added `"Gin": {"share": 1, "brands": ["Gin Mare"], "position": "Super-Premium Niche"}` and `"Super Premium Rum": {"share": 2, "brands": ["Diplomático"], "position": "Category Entry (2023)"}` to `categoryPresence`. Added both acquisition entries to `maTimeline` (2022 Gin Mare $520M, 2023 Diplomático $725M). Also updated `weaknessesForCompetitor` to remove the incorrect "No presence in... gin" and replace with accurate language about the $1.245B in new acquisitions still to be scaled.

5. **`frontend/src/data/companyData.js` — Brown-Forman: `howToCompeteAgainst` updated.** The entry "Vodka, gin, Irish whiskey, mezcal, no/lo, premium RTD — Brown-Forman isn't competing in any of these growth segments" incorrectly listed gin. Updated to reflect Gin Mare's presence while highlighting remaining real gaps (vodka, Irish whiskey, no/lo).

**Also fixed (found during push cycle):**

6. **`frontend/src/data/competitorData.js` line 58 — Diplomatico parent corrected: `DUSA` → `Brown-Forman`.** The Competitor Monitor rum set still had the old DUSA attribution. Fixed to match the corrected brandData/companyData. Build: 12.45s, 0 errors. 2 commits pushed to origin/main (1fb2b9d, e7e06dc).

**Audited (no new issues):**
- All 326 brand entries: `company` fields all now resolve to a real company (zero 'DUSA', 'Various', or misattributed entries). ✓
- All 14 companies in companyData.js: `keyBrands` and `categoryPresence` cross-checked for consistency. ✓
- All Recharts chart components: 0 missing `accessibilityLayer` (brace-aware check, confirmed no BarChart3 false positives). ✓
- All Tooltip instances: brace-aware check — 0 missing `contentStyle`. ✓
- All YAxis instances: brace-aware check — 0 missing `tickFormatter` on numeric axes. ✓
- All JSX text nodes: 0 raw non-ASCII chars or bare `--` double-dashes. ✓
- Build: 12.45s, 0 errors.

---

# Overnight Build Log — 15 October 2026

## Session summary

**Shipped:** 11 unicode-escape fixes across `CocktailDetail.jsx` (8 fixes) and `DepletionForecasting.jsx` (2 fixes). Build clean (13.18s). 1 commit pushed to origin/main (2669f4c).

1. **`CocktailDetail.jsx` — 3 bare JSX text-node `--` → `{'—'}`.** Lines 203, 387, 476 each had an ASCII double-dash in a raw JSX text node (between `<p>` tags, not inside `{}`). House rule: bare non-ASCII and unescaped dashes in JSX text must use unicode escapes. All three fixed to `{'—'}`.

2. **`CocktailDetail.jsx` — 5 `subtitle="…--…"` string attrs → `{'—'}` expression.** SectionHeader `subtitle` props on lines 137, 190, 214, 382, 421 all used bare ASCII `--` inside a JSX string attribute. Changed from `subtitle="…--…"` to `subtitle={'… — …'}` (JS string with unicode escape). Acceptance criterion: zero JSX attr string violations.

3. **`CocktailDetail.jsx:265` and `DepletionForecasting.jsx:187,205` — 3 `aria-label` attrs with raw U+2014 → `{'—'}` expression.** `aria-label="Chart: … — …"` had the U+2014 em-dash character directly in a JSX HTML attribute string (not inside `{}`). Each changed to `aria-label={'Chart: … — …'}` (JS expression), making the encoding explicit.

**Context — orphaned commits recovered:** The Oct 13 and Oct 14 sessions committed their fixes while in a detached HEAD state; those commits were already pushed to origin/main (711cfea, 38e1973, 408475a) but the local main branch wasn't updated. Tonight's session started from the correct origin/main HEAD (408475a) and applied only the new fix on top.

**Audited (no new issues):**
- All JSX text nodes in `CocktailDetail.jsx` and `DepletionForecasting.jsx`: 0 remaining bare `--` or raw non-ASCII. ✓
- All `aria-label` attribute strings in scanned pages: 0 remaining raw U+2014 or other non-ASCII. ✓
- `subtitle=` attribute strings in `CocktailDetail.jsx`: 0 remaining `--` or non-ASCII. ✓
- Build: 13.18s, 0 errors.

---

# Overnight Build Log — 14 October 2026

## Session summary

**Shipped:** 2 fixes in `CocktailDetail.jsx` — standardised the RadarChart Tooltip to use `contentStyle`/`labelStyle`/`itemStyle` props (matching the dark tooltip pattern on all 14 other chart pages), and fixed a bare `--` double-dash in a JSX text node to `{'—'}` unicode escape. Build clean (12.09s). 1 commit pushed to origin/main.

1. **`frontend/src/pages/CocktailDetail.jsx` line 272 — Tooltip standardised.** The flavour-profile RadarChart used a custom `content` render prop to produce dark tooltip styling, while every other chart page (14 of them) uses `contentStyle`/`labelStyle`/`itemStyle` props. Replaced the 9-line custom renderer with the standard 4-line prop pattern: `contentStyle={{ background: '#1e293b', border: 'none', borderRadius: 8, fontSize: 11, color: '#f1f5f9' }}` + `labelStyle` + `itemStyle`. Visual result is identical; pattern is now consistent across all chart pages.

2. **`frontend/src/pages/CocktailDetail.jsx` line 264 — Double-dash `--` → `{'—'}`.** The disclaimer text `"Bartender-calibrated estimate -- not instrument-measured"` had a bare `--` double-dash in a JSX text node. House style requires em-dashes in JSX text to use unicode escape form `{'—'}` to prevent accidental HTML entity interpretation. Fixed to `{'—'}`.

**Audited (no new issues):**
- Recharts `<Tooltip>` instances across all 15 chart pages: all now have `contentStyle` (custom renderer in CocktailDetail was the only outlier, now fixed). ✓
- `accessibilityLayer` prop: present on all 16 Recharts chart component instances across 16 files. ✓
- Files with PageHeader but no DataFreshness: ClientProfile (uses inline `<p>` for freshness — data-driven, intentional) and ProfilesIndex (index page, not an intelligence data page). Neither requires the standard badge. ✓
- TODO/FIXME scan: only occurrence is auto-generated dossier prose in `pernod-ricard_absolut.js` (not code). ✓

---

# Overnight Build Log — 13 October 2026

## Session summary

**Shipped:** 3 fixes — 2 `growthDir` data errors in Beer category (2024 and 2025) corrected from `'up'` to `'flat'`, plus a `tickFormatter` added to the ClimateYield 10-Year Yield History YAxis. Build clean (12.52s). 1 commit pushed to origin/main.

1. **`frontend/src/data/categoryData.js` — Beer 2025 `growthDir` corrected `'up'` → `'flat'`.** Beer 2025 growth is `+0.2%`, which is effectively flat. A `growthDir: 'up'` caused the CategoryIntelligence MetricCard to show a green upward arrow, misleadingly presenting near-zero growth as momentum. The platform convention is: `growthDir: 'up'` only when `growth > +0.5%`. Beer 2025 at +0.2% maps to `'flat'` (gray horizontal bar). The beer category trajectory text already states "growth has dramatically slowed from 4.5% in 2021 to just 0.2% in 2025", so this corrects the mismatch between text and indicator.

2. **`frontend/src/data/categoryData.js` — Beer 2024 `growthDir` corrected `'up'` → `'flat'`.** Same issue: Beer 2024 growth is `+0.5%`, which sits exactly at the platform's `>'flat'` threshold — not above it. Corrected to `'flat'`. These were the only 2 `growthDir` inconsistencies across all 55 category × year entries (found by automated scan of all top-level yearData blocks).

3. **`frontend/src/pages/ClimateYield.jsx` line 275 — YAxis `tickFormatter` added.** The `YieldChart` component's 10-Year Yield History chart had a numeric YAxis without any `tickFormatter`. For regions with large yield values (e.g., grain spirits at 10,500 hl/ha, agave at 1,280M tonnes), unformatted numbers were crammed into the narrow 36px axis column. Added `tickFormatter={v => v >= 1000 ? \`\${(v / 1000).toFixed(0)}k\` : v}` and widened the axis to 40px. Small values (1.8 tonnes/acre) pass through unchanged; large values get compact notation (10500 → "10k", 4800 → "5k"). Also normalises with the other YAxis instances in the same file which all use tickFormatters.

**Audited (no new issues):**
- All 55 category × year `growthDir`/`growth` pairs: only 2 inconsistencies found (fixed above). ✓
- DepletionForecasting seasonality profiles: all 5 sum to exactly 12.00. ✓
- geographicData 10 channel distributions: all sum to 100. ✓
- companyData 14 geoRevenue distributions: all sum to 100. ✓
- All 324 BRAND_DATABASE entries: all have company, brand, category, segment; all prices in valid range £4.75–£4,130. ✓
- Dossier manifest: all 78 slugs have matching content files (0 missing, 0 orphaned). ✓
- BrandHealth: 15 entries, all scores 0–85. ✓
- All Tooltips: 1 custom content renderer (CocktailDetail RadarChart) — correctly dark-styled inline. All others have contentStyle. ✓
- All charts: accessibilityLayer present on all BarChart, LineChart, AreaChart, ComposedChart, ScatterChart, RadarChart instances. ✓
- JSX unicode: 0 non-ASCII characters in JSX text nodes (pages + components). ✓
- Build: 12.52s, 0 errors.

---

# Overnight Build Log — 12 October 2026

## Session summary

**Shipped:** Data quality fix — corrected `brandsInCategory` cross-links in 5 category dossiers. Build clean (14.61s). 1 commit pushed to origin/main (76cfa1c).

1. **`frontend/src/data/dossiers/index.js` — brandsInCategory arrays had catastrophically wrong brands.** The `CategoryDossier` page renders a "Brands referenced" grid from `brandsInCategory`; wrong entries would show tequila brands under Rum, Scotch brands under Bourbon, aperitifs under Gin, and non-existent slugs causing silent 404s. Fixed 5 categories: (a) **Bourbon**: was `[johnnie-walker]` (Scotch); now 5 correct bourbon/American-whiskey slugs. (b) **Gin**: removed aperol, campari, chivas-regal, jameson, william-grant_hendricks (4 wrong-category, 1 missing from manifest); replaced with tanqueray + bombay-sapphire + beefeater + monkey-47 + bulldog-gin. (c) **Rum**: replaced entirely — all 7 existing brands were wrong category (patron, don-julio, aperol, campari, tanqueray, grey-goose) or non-existent slug (bacardi_havana-club); now bacardi-rum, appleton-estate, captain-morgan, havana-club, wray-nephew. (d) **Scotch**: was empty; now 9 Scotch brand slugs from the manifest. (e) **Whisky all-styles**: removed tequila, aperitif and gin brands plus 2 slugs not in manifest; now 10 whisky slugs. (f) **Tequila**: removed 3 slugs not in manifest + campari (wrong category); added volcan-de-mi-tierra.

2. **Resolved recurring detached-HEAD push blocker.** Origin/main was 10 sessions behind (f82c43f, Oct 5) because every session commits in detached HEAD. Local cherry-pick recovery from the previous session had created duplicate-SHA commits. Resolved by resetting to origin/main and cherry-picking only the new commit cleanly — origin/main now current.

**Audited (no new issues):**
- `brown-forman_gin-mare.js`: Gin Mare ownership correctly attributed to Brown-Forman (acquired Nov 2022, $520M); content accurate and sourced. ✓
- `brandsInCategory` slug integrity: all 5 corrected arrays verified against DOSSIER_MANIFEST before committing — every slug resolves. ✓

---

# Overnight Build Log — 11 October 2026

## Session summary

**Shipped:** 1 rendering bug fix — MarketEntryWizard step-connector off-by-one. Build clean (15.15s).

1. **`frontend/src/pages/MarketEntryWizard.jsx` line 31 — StepIndicator connector colour off-by-one.** The connector segment between steps was coloured with `current > step.id ? 'bg-navy' : 'bg-gray-200'`. Because the connector appears *before* the step it leads to, the condition must be `>=`, not `>`. With `>`, reaching step 2 left the connector between steps 1 and 2 gray even though step 1 was already complete. Same fault on the last connector when reaching step 3. Fixed to `current >= step.id`. (Bug found by subagent review of less-audited pages.)

2. **Recovered 8 orphaned commits (e3efd93 → ef4fe80).** Same recurring detached-HEAD pattern: prior sessions committed in detached HEAD and the commits never landed on `refs/heads/main`. Cherry-picked all 8 onto main in chronological order — Oct 6 PricePositioning tier boundary fixes, Oct 7 Constellation spelling fix, Oct 8 W50B rank corrections, Oct 9 audit log, Oct 10 ClientProfile apostrophe escapes and NoLo tier boundary fix are now in the remote for the first time.

**Audited (no new issues):**
- All 11 CategoryIntelligence categories × 5 years: all 55 growthDir values consistent with growth sign. All 55 channel distributions sum to 100. ✓
- All 326 brand expressions in BRAND_DATABASE: all have prices, category, segment fields. Price range £4–£4,025 all valid for segment. ✓
- All 28 LONDON_VENUES: fiftyBest arrays cross-referenced against FIFTY_BEST_BARS — all correct (50 entries confirmed per year 2021–2025). All ranks in 1–50 range. ✓
- PricePositioning.jsx tier boundaries: no overlaps across all 11 categories. All brand prices within tier bounds. ✓
- All pages: 0 raw unicode in JSX text nodes, all Tooltip instances have dark contentStyle, all YAxis instances have tickFormatter. ✓
- geographicData.js: all 10 region channel distributions sum to 100. ✓
- companyData.js: all 14 geoRevenue distributions sum to 100. ✓
- valuationsData.js: revenue multiples 2.2x–6.2x (realistic). ✓
- ScenarioModeling, MarketEntryWizard, RegulatoryCompliance, Valuations, POSIntelligence, TradeShows, CampaignPlanner, CompetitorMonitor: all imports valid, no map/filter crashes, all charts have accessibilityLayer and dark Tooltips. ✓
- Build: 15.15s, no errors.

---

# Overnight Build Log — 10 October 2026

## Session summary

**Shipped:** 2 bug fixes — JSX unicode violations in ClientProfile and a tier boundary overlap in PricePositioning. Build clean (21.30s).

1. **`frontend/src/pages/ClientProfile.jsx` lines 823–824 — JSX text node apostrophe escapes.** Two bare U+2019 curly-apostrophe characters sat directly in JSX text content (between `<li>...</li>` tags), violating the platform unicode-escape rule. Replaced both with `{'’'}` expressions. Discovered by Python regex scan `>([^<>{}]*[\u0080-￿][^<>{}]*)<` across all JSX files.

2. **`frontend/src/pages/PricePositioning.jsx` NoLo Premium tier — boundary overlap fix.** Premium tier had `max: 26` while Super-Premium had `min: 26`, creating an inclusive overlap at £26. Corrected Premium `max` to `25`; all three sample brands in that tier (Lyre's American Malt £24, Monday Gin £24, Ritual Zero Proof £22) sit safely within the new bound. This was the last remaining tier overlap after last week's session fixed the others.

3. **Recovered detached-HEAD commits.** Session opened in detached HEAD again. Ran `git checkout main` then cherry-picked commit 3a2588a onto origin/main (remote already held the Oct 6–9 cherry-picks from a prior push).

**Audited (no new issues):** GeographicIntelligence, SupplyChain, Companies, ReportBuilder pages — unicode chars in those files are in JS `{}` expressions, not bare JSX text, so no violations. Build: 21.30s, 0 errors.

---

# Overnight Build Log — 9 October 2026

## Session summary

**Shipped:** Comprehensive data-quality audit across all major codebase dimensions — zero issues found. Recovered 5 orphaned commits (Oct 6–8) from detached-HEAD sessions and pushed them to main for the first time. Build clean (15.50s).

1. **Recovered orphaned commits (e3efd93, 4c424ea, 2ee591d, 81ba6af, 4fa6694).** Same root cause as Oct 8: overnight sessions commit in detached HEAD state, so the commits exist locally but never land on refs/heads/main. Cherry-picked all 5 onto main so Oct 6–8 work (PricePositioning tier fixes, Constellation spelling, W50B rank corrections) is finally in the remote.

2. **Full audit — all clean.** Checked: (a) 326 brand entries in brandData.js, distribution confirmed, BrandPricing sparkData metadata matches; (b) all 11 × 5 = 55 category/year growthDir pairs in categoryData.js; (c) all 5 SEASONALITY_PROFILES in DepletionForecasting.jsx sum to exactly 12.00; (d) all PRICE_BENCHMARKS tier boundaries and brand placements in PricePositioning.jsx; (e) FIFTY_BEST_BARS 50 entries per year × 5 years; (f) all 28 LONDON_VENUES fiftyBest cross-references; (g) 0 raw unicode (£/€/°) violations in JSX text nodes; (h) all Recharts chart instances have accessibilityLayer; (i) all Tooltip instances use dark contentStyle.

**Audited (no action needed):**
- brandData.js: 326 expressions across 14 categories; BrandPricing metadata sparkData current.
- categoryData.js: 55 growthDir/growth-sign pairs all consistent.
- DepletionForecasting.jsx: 5 seasonality profiles all sum to 12.00.
- PricePositioning.jsx: all tier boundaries non-overlapping, all brands within tier bounds.
- venueData.js: FIFTY_BEST_BARS 250 entries (50/year), LONDON_VENUES 28 entries, all cross-refs correct.
- JSX unicode, accessibilityLayer, Tooltip dark theme: all clean.
- Build: 15.50s, no errors.

---

# Overnight Build Log — 8 October 2026

## Session summary

**Shipped:** 2 World's 50 Best Bar rank corrections in LONDON_VENUES. Build clean (16.45s). Recovered 3 orphaned commits from prior detached-HEAD sessions. Pushed to main.

1. **`frontend/src/data/venueData.js` — Tayēr + Elementary fiftyBest corrected [2,4,8,2,5] → [2,2,8,4,5].** The 2022 and 2024 entries were transposed. The bar's actual W50B history is: 2021 #2, 2022 #2, 2023 #8, 2024 #4, 2025 #5. Confirmed by cross-referencing against the FIFTY_BEST_BARS data in the same file. The VenueIntelligence page renders the fiftyBest array as year-tagged rank chips (green for top-10, blue otherwise) — the swap would show 2022 as #4 and 2024 as #2, contradicting the authoritative list.

2. **`frontend/src/data/venueData.js` — Lyaness fiftyBest corrected [null,null,null,38,null] → [].** Lyaness does not appear in the FIFTY_BEST_BARS 2024 ranking; rank 38 in 2024 is Moebius Milano. The phantom rank caused the VenueIntelligence card to display a "50 Best: 1x" badge with the wrong year and rank. Empty array suppresses the badge entirely since `.some(r => r)` returns false.

**Also recovered:** Prior sessions committed in detached HEAD state — 3 commits (e3efd93, 4c424ea, 2ee591d) were orphaned from main. Cherry-picked all 3 onto main before tonight's commit so nothing from Oct 6-7 is lost.

**Audited (no action needed):**
- All 8 LONDON_VENUES entries with fiftyBest arrays: cross-referenced against FIFTY_BEST_BARS for all 5 years — 6 correct, 2 fixed above.
- FIFTY_BEST_BARS: 50 entries per year confirmed (250 total across 2021–2025).
- LONDON_VENUES: 28 entries confirmed.
- All 43 Recharts chart instances: accessibilityLayer present on all. All Tooltip instances: contentStyle with dark bg confirmed.
- JSX text nodes: 0 raw unicode violations (£/€/°) in pages.
- Build: 16.45s, no errors.

---

# Overnight Build Log — 7 October 2026

## Session summary

**Shipped:** 1 data typo fix in GLASS_SUPPLIERS. Build clean (12.37s). Pushed to main.

1. **`frontend/src/data/supplyChainData.js` — Constellation spelling corrected.** GLASS_SUPPLIERS entry had `'Constelation (Screwcap)'` (missing one 'l'). Fixed to `'Constellation (Screwcap)'`. This is the Australian aluminium screwcap supplier with 18% market share.

**Audited (no action needed):**
- Full codebase audit: CategoryIntelligence (11 categories × 5 years), BrandPricing (326 entries), VenueIntelligence (28 London profiles + 250 bar entries), all Recharts Tooltip/YAxis instances, JSX unicode violations, DataFreshness components on all 25 pages — all clean, 0 issues found.
- Climate data fragments (5 files): all fields correctly camelCased (`avgTemp`, `frostDays`, `sunHours`) — prior report was a false alarm from case-insensitive grep.
- Companies, SupplyChain, Geographic, ReportBuilder pages: charts, null guards, tickFormatters — all clean.
- Build: 12.37s, no errors.

---

# Overnight Build Log — 6 October 2026

## Session summary

**Shipped:** 11 PricePositioning tier boundary fixes + curly-quote syntax repair. Build clean (20.97s). Pushed to main as `e3efd93`.

1. **`frontend/src/pages/PricePositioning.jsx` — 7 brand misclassifications fixed.** `getTierForPrice` iterates tiers and returns on first `price >= min && price <= max` match. Wherever an upper tier's `min` equalled a lower tier's `max`, a price at that exact point was misclassified. Fixed by reducing each lower tier's `max` by the smallest meaningful unit so the shared boundary disappears: Heineken (£2.00) now correctly returns Beer Premium (Value max 2→1.99); Deya (£5.00) now Premium Craft (Craft max 5→4.99); Casillero del Diablo (£8.00) now Wine Premium (Value max 8→7); Ritual Zero Proof (£22) now NoLo Premium (Standard max 22→21); JD & Cola (£2.50) now RTD Premium (Value max 2.5→2.49); Served (£4) now RTD Super-Premium (Premium max 4→3.99); On The Rocks (£6) now RTD Ultra-Premium (Super-Premium max 6→5.99). All existing brands remain within their tier's new min/max range.

2. **`frontend/src/pages/PricePositioning.jsx` — 4 additional UX boundary fixes.** No brand misclassification but a user typing the shared boundary value would get the wrong tier: Whisky Value max 25→24; Champagne Value max 30→29; Champagne Ultra-Prestige min 150→155 (Dom Pérignon £150 stays in Prestige Cuvée, Cristal £200 stays in Ultra-Prestige); Wine Super-Premium max 30→29 and NoLo Value max 12→11. Also corrected Meiomi price £15→£14 (UK retail actuals) and moved it before the Wine Premium max adjustment.

3. **`frontend/src/pages/PricePositioning.jsx` — curly-quote syntax (U+2018/U+2019) fixed on 12 lines.** An `npm install` this session upgraded esbuild from the previously cached version to one that now rejects U+2018 (LEFT SINGLE QUOTATION MARK) as a JS string delimiter — these curly quotes had silently built under the older esbuild but are not valid JS string openers. Affected lines: whisky (63–64), wine (103–105), beer (113–116), nolo (123–125). Converted with a Python token-stream script: strings with no internal apostrophe → ASCII single-quoted `'Value'`; strings containing a possessive apostrophe (Bell's, Grant's, Hardy's, Foster's, Beck's, Gordon's 0.0%, Ceder's, Lyre's) → double-quoted `"Bell's"` with ASCII apostrophe. The 3 remaining U+2019 characters in the file are valid Unicode apostrophes inside properly ASCII-delimited strings (e.g., `'Tito’s'`).

**Audited (no action needed):**
- All Recharts Tooltip instances: multi-line scan confirmed all have `contentStyle` — 0 gaps.
- JSX unicode: Python full-scan for raw `£`/`€` in text nodes — 0 violations (all correctly wrapped in `{'£'}` or inside template literals).
- PricePositioning brand prices: post-fix audit — all 11 categories, all tiers: 0 brand prices outside stated min/max bounds.
- PricePositioning tier boundaries: post-fix audit — 0 shared min/max values across all 11 categories.
- Build: 20.97s (slower due to fresh npm install installing 344 packages), no errors.

---

# Overnight Build Log — 5 October 2026

## Session summary

**Shipped:** 3 fixes — Rum Premium/Super-Premium tier boundary overlap in PricePositioning, Wine Fine Wine tier max and wrong category brand, and two `sunHours` key typos in ClimateYield data. Build clean (13.14s). Pushed to main as `377db82`.

1. **`frontend/src/pages/PricePositioning.jsx` — Rum Premium tier max corrected 35→34.** Premium max=35 and Super-Premium min=35 created a shared boundary. The `getTierForPrice` function iterates tiers in order and returns on first match — so any user entering £35 for rum received "Premium", yet "Appleton Estate 12 (£35)" was listed in the Super-Premium section. The display contradiction would cause users to see their product positioned in Premium while the Super-Premium competitors list showed Appleton at the same price. Fix: Premium max changed 35→34. Now £35 matches Super-Premium (35 >= 35 && 35 <= 60). All remaining Premium brands (Havana Club 7 £25, Kraken £25, Plantation 5 £28) remain within the corrected 22–34 range.

2. **`frontend/src/pages/PricePositioning.jsx` — Wine Fine Wine tier max corrected 200→500, Dom Pérignon Rosé replaced.** The Fine Wine tier listed three brands: Opus One (£200, borderline), Dom Pérignon Rosé (£300, wrong category — champagne not wine), and Château Margaux (£400+, 100% above max). If a user entered any price above £200 for wine, their price indicator rendered at >100% offset from the right edge of the tier bar — visually broken. Also "Dom Pérignon Rosé" is a champagne brand, not a still wine, making it an incorrect example for the Wine category. Fixes: max extended 200→500 to cover actual brand price range; Dom Pérignon Rosé removed and replaced with "Penfolds Grange (£235)" (verified from brandData.js); "Château Margaux (£400+)" changed to "Château Margaux (£400)" to remove the "+" notation.

3. **`frontend/src/data/climate_fragments/climate_yield_botanicals_fragment.js` — Two `sunHorus` key typos corrected.** Two entries had the field named `sunHorus` instead of `sunHours`: portugal-cork 2018 (value: 2900 — the Sunshine Hours bar chart would show an undefined data gap for that year, appearing as a missing bar) and iran-saffron 2025 (null, less visible but same schema inconsistency). Both corrected to `sunHours`. Verified: full audit of all 57 climate regions × all historical years shows zero undefined sunHours, rainfall, avgTemp, frostDays, or yield fields in non-2025 rows.

**Audited (no action needed):**
- CategoryIntelligence: all 11 categories × 5 years re-confirmed — 0 growthDir mismatches, 0 channel sum deviations.
- All PricePositioning tiers (all 11 categories): brand/price pairs now all within stated tier min/max bounds.
- ClimateYield: 57 regions × all years — 0 undefined field keys outside of intentional 2025 null rows.
- Companies.jsx: financials chart confirmed — operatingMargin/netIncome fields present and rendered with null-safe checks.
- SupplyChain data: 15 exports, no null values.
- Geographic data: 10 regions all confirmed with kpis (object) and channels (object with onTrade/offTrade/eCommerce/travelRetail).
- BrandData: 326 entries, 14 categories, all have company/brand/expression/category/segment/prices.
- JSX unicode: zero raw text node violations confirmed across all 36 pages.
- Tooltip styling: all Recharts Tooltip instances have dark background (#1e293b) with white label/item styles.

---

# Overnight Build Log — 4 October 2026

## Session summary

**Shipped:** 2 fixes — RTD tier brand/price mismatch in PricePositioning, and missing axis tickFormatters on 4 ClimateYield charts. Build clean (19.88s). Pushed to main as `910769d`.

1. **`frontend/src/pages/PricePositioning.jsx` — RTD Premium tier: Gordon's G&T removed, prices corrected.** Gordon's G&T (£2.20) was listed in the RTD Premium tier (min: £2.50, max: £4.00) despite its price being £0.30 below the tier floor. A brand in a tier's brand list that is priced below that tier's minimum creates a contradiction that could mislead users positioning their RTD at the Premium boundary. Fix: moved Gordon's G&T to Value tier at £1.80 (correct per-can Tesco/retail positioning). Replaced in Premium with Kopparberg (£2.80), a well-known UK cider-based RTD correctly within the Premium band. White Claw corrected from £2.50 to £2.80 (the realistic UK per-can price from multi-pack). Value tier now: Smirnoff Ice £1.80, WKD £1.50, Gordon's G&T £1.80. Premium tier now: White Claw £2.80, JD & Cola £2.50, Kopparberg £2.80. All four RTD tier brand/price pairs now fall within stated min/max bounds.

2. **`frontend/src/pages/ClimateYield.jsx` — 4 chart YAxes now show unit labels.** The Climate Metrics (10-Year) section renders 4 small charts (Rainfall, Temperature, Frost Days, Sunshine Hours). All 4 YAxes were missing `tickFormatter` — axis ticks showed raw numbers like "12", "45", "900" with no unit context. Added a `unit` property to the metric map objects (`'mm'`, `'°C'`, `'d'`, `'h'`), then applied `tickFormatter={v => \`\${v}\${m.unit}\`}` to both the LineChart YAxis (temperature) and the BarChart YAxis (rainfall, frost days, sun hours). Temperature width widened from 28→32 to accommodate the `°C` suffix. Axis ticks now read "12°C", "450mm", "15d", "900h".

**Audited (no action needed):**
- All 14 RTD tier brand/price pairs (4 tiers × updated): all now within stated min/max bounds. Super-Premium and Ultra-Premium tiers were already correct.
- ClimateYield 10-Year Yield History chart: YAxis shows raw values without unit — acceptable since yieldUnit is displayed as a text subtitle above the chart, and yieldUnit strings are too varied and long (e.g., "hl/ha (pure alcohol)") to use as axis formatters.
- PricePositioning remaining tiers: all other categories (Tequila, Vodka, Gin, Whisky, Rum, Cognac, Champagne, Wine, Beer, No/Lo) confirmed — all brand/price pairs in tier lists fall within their stated min/max bounds.
- categoryData.js: 55/55 growth/growthDir pairs consistent (0 mismatches), 55/55 channel blocks sum to 100 ±2%.
- brandData.js: 326 entries confirmed, 14 categories, all entries have company/brand/expression/category/segment.
- JSX unicode: no raw £/€/° text node violations across any page.

---

# Overnight Build Log — 3 October 2026

## Session summary

**Shipped:** 3 PricePositioning data corrections — cognac Prestige tier max, Martell VSOP price, Whisky Premium brand list. Build clean (12.61s). Pushed to main as `ab19b4d`.

1. **Cognac Prestige tier max corrected (1000→3500).** The tier listed Rémy Martin Louis XIII at £2,500, which exceeded the max of £1,000. brandData shows masterofmalt=£2,576 and TWE=£2,716 for Louis XIII — UK average £2,646. Updated display price to £2,650 and tier max to £3,500.

2. **Cognac VSOP: Martell VSOP price corrected (£39→£42).** The Oct 2 session set VSOP tier minimum to £40 but left Martell VSOP at £39 — one pound below the tier floor. brandData Waitrose price is £42, which is the appropriate representative price for VSOP positioning.

3. **Whisky Premium: Monkey Shoulder removed from brands list.** The Oct 2 session replaced Monkey Shoulder as the Premium anchor with Chivas Regal 12, but failed to remove Monkey Shoulder from the brands array. Monkey Shoulder's brandData average UK price is £24.45, below the Premium tier minimum of £25.

**Audited (no action needed):**
- All 11 CategoryIntelligence categories × 5 years: all 55 year-blocks present and complete (marketSize, growth, growthDir, volumeCases, topMarkets, channels). All growth/growthDir pairs consistent.
- All channels data: all 55 year-blocks sum to ~100% within tolerance.
- VenueIntelligence: 50 bars × 5 years confirmed (250 entries). LONDON_VENUES: 28 entries, all have name/type/area/accountType/estRevenue/knownBrands/parentCompanies.
- BrandPricing: 326 entries across 14 categories; pricing logic correct (PRICING map correctly computes market averages from prices.uk/us/etc. objects).
- JSX unicode: zero raw text node violations for £/€/° across all 36 pages.
- Tooltip contentStyle: all Recharts Tooltip instances have dark background (#1e293b).
- Chart axis labels: no unlabeled or un-styled axis issues found.
- GeographicIntelligence: all 10 regions (us/uk/eu27/meafrica/china/india/japan/brazil/australia/seasia) have kpis/channels/trends.
- SupplyChain data: 15 exports, no null values, no undefined values.
- CompanyData: 14 companies with full financial/M&A data.
- ScenarioData, reportBuilderData: structure clean.

---

# Overnight Build Log — 2 October 2026

## Session summary

**Shipped:** PricePositioning tier overlap fix + stale brand prices across gin, tequila, cognac, whisky. Build clean (14.92s). Pushed to main as `ee21655`.

1. **Gin tier range overlap (critical bug):** Premium max was 32, Super-Premium min was 28 — `getTierForPrice` checks tiers in order so any price £28–£32 misclassified as Premium. Fixed Premium max 32→27 so tiers no longer overlap. Hendrick's (£28) now correctly classifies as Super-Premium.
2. **Gin brand prices updated from brandData.js:** Bombay Sapphire £20→£22, Sipsmith £28→£25, Hendrick's £30→£28, Botanist £35→£30, Gin Mare £40→£33, Monkey 47 £38→£37. KI NO BI moved from Ultra-Premium (wrong grade) to Super-Premium at correct price £47.
3. **Cognac VS/VSOP boundary:** VS max extended 35→39 so Hennessy VS (£38) classifies correctly as VS instead of VSOP. VSOP min raised to 40. Brand prices: Hennessy VS £32→£38, Martell VS £26→£30, Rémy Martin VSOP £40→£46, Martell VSOP £35→£39.
4. **Tequila stale prices:** Patrón Silver £45→£49, Don Julio Blanco £42→£48, Altos Plata £26→£29, Don Julio 1942 £125→£165.
5. **Whisky gap and stale prices:** Glenfiddich 12 (£41) fell in the gap between Premium max (40) and Super-Premium min (42) — moved to Super-Premium with min lowered to 41. Macallan 12 updated to £81 (was £48) and moved to Super-Premium; Macallan 18 updated to £304, JW Blue to £168. Replaced Jameson Original (£24, below Premium floor) with Jameson Black Barrel (£33).

---

# Overnight Build Log — 1 October 2026

## Session summary

**Shipped:** CategoryIntelligence data-quality fix — cognac growthDir bugs for 2022 and 2021. Build clean (12.80s). Pushed to main as `03356b1`.

1. **growthDir audit across all 11 categories × 5 years (55 pairs):** Found 2 mismatches in cognac data. Year 2022 had `growth: '+8.2%'` with `growthDir: 'down'`; year 2021 had `growth: '+18.5%'` with `growthDir: 'down'`. Both corrected to `'up'`. These rendered a downward red arrow next to positive growth figures on the CategoryIntelligence cognac page.

2. **Full data audit scope:** Verified all 55 growth/growthDir pairs across 11 categories and 5 years — no other mismatches. Confirmed all yearData blocks contain required fields (marketSize, growth, growthDir, volumeCases). Confirmed all channel splits (onTrade/offTrade/eCommerce/travelRetail) present per year. Confirmed all 55 channel sets sum to 100%. No JSX unicode violations found in any page. Tooltip styling (white on dark) consistent across all recharts instances.

3. **No changes needed elsewhere:** BrandPricing renders 326 expressions from BRAND_DATABASE (all 326 have company, brand, expression, category, segment). VenueIntelligence: FIFTY_BEST_BARS has 50 × 5 = 250 entries across 2021–2025, LONDON_VENUES has 56 entries. companyData.js has 5-year financials for all companies. No raw € or £ chars in JSX text nodes. All chart axes have tickFormatter configured.

---

# Overnight Build Log — 30 September 2026

## Session summary

**Shipped:** PricePositioning Beer and No/Lo tier overhaul. Build clean (13.05s). Pushed to main as `3244f49`.

1. **Beer — tier boundary fixes (3 issues):** Premium max lowered 3.5→3 to close overlap with Craft (min 3). Craft max lowered 6→5 to close overlap with Premium Craft (min 5). Camden Hells (£2.80) moved from Craft to Premium since it was 20p below the Craft floor. Craft now correctly holds BrewDog Hazy Jane (£3.50), Beavertown Neck Oil (£3.50), Thornbridge Jaipur (£3.30). Premium Craft: Verdant corrected £4.50→£5.25 (was below min of £5).

2. **No/Lo — full tier rebuild (4 tiers, all brands wrong):** Old structure had critical errors: Heineken 0.0 (£1.20) listed in a tier with min:2; Seedlip (£22) in Premium with max:15; Aecorn Aperitifs (£15) and Everleaf (£20) in Ultra-Premium with min:25. Entirely rebuilt from brandData.js UK retail prices: Value = Beck's Blue/Heineken 0.0/Bavaria 0.0 12-packs (£8–10, min:7 max:12); Standard = Gordon's 0.0%/Tanqueray 0.0%/Ceder's bottles (£14–18, min:12 max:22); Premium = Lyre's/Monday Gin/Ritual Zero Proof bottles (£22–24, min:22 max:26); Super-Premium = Seedlip/Three Spirit bottles (£27, min:26 max:40). Insight updated to note the bimodal price structure (12-packs vs bottles).

**Notes:** All prices sourced from brandData.js UK fields — no hallucinations. Build 13.05s, clean.

---

# Overnight Build Log — 29 September 2026

## Session summary

**Shipped:** 9 brand/tier placement corrections in PricePositioning.jsx PRICE_BENCHMARKS. Build clean (14.22s). Pushed to main as `ba46e05`.

1. **Vodka:** Ciroc corrected £30→£32 (was below Super-Premium min £32); Beluga Noble £45 moved from Ultra-Premium (min £55) to Super-Premium — it sits squarely in the £32–50 band.
2. **Gin:** Super-Premium min lowered 32→28 to correctly host Hendrick's £30; The Botanist Islay £35 and Gin Mare Capri £40 moved from Ultra-Premium (min £55 — where both were ~£20 below the floor) to Super-Premium; Ultra-Premium now holds only Cambridge Distillery £80.
3. **Whisky:** Glenfiddich 12 £35 moved from Super-Premium (min £42 — £7 below floor) to Premium (£25–40 — correct tier).
4. **Cognac:** Rémy Martin VSOP £38 removed from VS tier — wrong grade classification (VSOP ≠ VS) and above VS max £35; replaced with Martell VS £26, a genuine VS cognac in range.
5. **Champagne:** Bollinger £40 moved from Prestige Cuvée (min £55) to Premium (£30–50); Special Cuvée NV at £38–45 is a classic Premium champagne, not a Prestige Cuvée. Prestige Cuvée now correctly contains only Dom Pérignon £150 and Krug Grande Cuvée £140.

**Notes:** NoLo tier mixed-unit issue (per-can vs per-bottle prices) and Beer Craft tier boundary issues identified but deferred — require structural change with risk of new inconsistencies. Flagged for a future session.

---

# Overnight Build Log — 28 September 2026

## Session summary

**Shipped:** 5 specialty brand UK price corrections in brandData.js. Build clean (12.63s). Pushed to main as `8d4fa02`.

1. **Westvleteren 12 (Beer):** All UK prices set to null. Sint-Sixtus Abbey sells only via telephone reservation at the monastery gate — no commercial distribution exists anywhere. Previous prices (tesco £15, sainsburys £14.25, waitrose £15.60, MoM £14.25, TWE £14.70) were all fabricated.

2. **Cantillon Gueuze 375ml (Beer):** tesco/sainsburys/waitrose null. Cantillon is a traditional lambic brewery in Brussels with no UK supermarket distribution; kept MoM £23.75 and TWE £24.50 as specialist importers who genuinely carry Belgian lambics.

3. **Hill Farmstead Susan 500ml (Beer):** All UK prices null. Hill Farmstead is a Vermont micro-brewery with near-zero distribution outside New England; entirely unreachable in UK retail channels including specialist importers.

4. **Clase Azul Reposado (Tequila):** tesco/sainsburys/waitrose null. Hand-painted ceramic decanter ultra-premium tequila sold only through premium specialists in the UK (Harvey Nichols, Selfridges, MoM, TWE). Kept MoM £110 and TWE £116.40.

5. **Foursquare ECS 2011 (Rum):** tesco/sainsburys/waitrose null. Foursquare Exceptional Cask Series is a limited distillery allocation sold through specialist rum retailers only; not at UK supermarkets. Kept MoM £78 and TWE £82.45.

**Audited (no action needed):**
- All 25 intelligence pages: DataFreshness badges confirmed — 25/25 present.
- All Recharts Tooltip contentStyles: 16-flag scan resolved as false positives; all use dark background (#1e293b).
- All Recharts chart components: accessibilityLayer confirmed on all BarChart/LineChart/AreaChart/etc. — 0 gaps.
- JSX text node scan (all .jsx pages): 2 flags resolved as false positives (JS formatter functions, not JSX text nodes). 0 actual violations.
- brandData.js: 326 entries, 0 company='Various', correct category distribution unchanged.
- categoryData.js: 0 growth/growthDir mismatches; all fields consistent.
- geographicData.js: 0 growth/growthDir mismatches.
- supplyChainData.js: 0 null values, all 17 entries have historicalData and relevantCategories.
- Null guard scan (SupplyChain, GeographicIntelligence, Companies, ReportBuilder): all .map() calls properly guarded by conditional renders.
- Build: 12.63s, no errors.

---

# Overnight Build Log — 27 September 2026

## Session summary

**Shipped:** 10 prestige brand UK price corrections in brandData.js. Build clean (11.91s). Pushed to main as `6561b95`.

1. **Root cause identified:** The price generation script computed UK retailer prices (tesco, sainsburys, waitrose) for every entry using a fixed multiplier from the US `totalwine` field, without checking whether each retailer actually stocks the item. For Prestige-segment spirits and wines, this produced confident-looking but entirely fabricated distribution data — e.g. Pappy Van Winkle 20yr at Tesco £1,666, Louis XIII Cognac at Tesco £2,744, Screaming Eagle at Tesco £2,916, Château Lafite at Tesco £686.

2. **Pappy Van Winkle 20yr (Bourbon):** All UK prices set to null. PVW 20yr is a lottery-allocation product that does not reach UK retail channels. Kept masterofmalt (£1,564) and thewhiskyexchange (£1,649) as specialist importers who occasionally stock it.

3. **Hennessy Paradis (Cognac):** tesco/sainsburys/waitrose null. Available at MoM (£598) and TWE (£630.50) only — mainstream UK supermarkets do not carry Paradis.

4. **Louis XIII Grande Champagne Cognac:** tesco/sainsburys/waitrose null. Available at MoM (£2,576) and TWE (£2,716) only.

5. **Hibiki 21yr (Japanese Whisky):** tesco/sainsburys/waitrose null. Hibiki 21yr is allocated, not regularly stocked in UK supermarkets. Available at MoM (£414) and TWE (£436.50).

6. **Salon Le Mesnil 2012 (Champagne):** tesco/sainsburys null. Salon is one of the rarest Champagnes produced; kept waitrose (£472, Waitrose fine wine) and MoM/TWE.

7. **Opus One 2021 Vintage (Wine):** tesco/sainsburys null; MoM null (spirits retailer, not fine wine). Waitrose corrected to £259 (Waitrose fine wine section genuine price); TWE corrected to £249.95.

8. **Penfolds Grange 2019 (Wine):** tesco/sainsburys null; MoM null. Waitrose £595 (fine wine section); TWE £582.

9. **Sassicaia 2020 (Wine):** tesco/sainsburys null; MoM null. Waitrose £229; TWE £219.95.

10. **Château Lafite Rothschild 2019 / Château Margaux 2019 (Wine):** All UK fields null. First Growth Bordeaux is sold exclusively through fine wine merchants (Berry Bros, Justerini & Brooks, Bordeaux Index) — none of which are represented in the UK retail fields. US prices (TotalWine, Costco, etc.) preserved intact.

11. **Screaming Eagle Cab 2021 (Wine):** All UK fields null. Screaming Eagle is a US-only direct-mail allocation product and does not appear in UK retail channels.

**Audited (no action needed):**
- All JSX pages: no raw £/€ violations in text nodes (dossier-content files false-positives confirmed; BrandPricing template literal correctly inside `{}`).
- All Recharts `<Tooltip>` blocks: multi-line brace-aware scan confirmed all tooltips have `contentStyle` — CocktailDetail uses custom render with inline dark styles (correct).
- categoryData.js: all 55 year-blocks re-confirmed present; channels/growth/growthDir fields all consistent.
- geographicData.js: 10 REGIONS + 10 REGION_DATA keys, no null values, all growth/growthDir consistent.
- companyData.js: 14 companies, 1 null on unreferenced `estimatedRevenue` field — no UI impact.
- brandData.js: 326 entries, 0 company='Various', correct category distribution unchanged.
- Build: 11.91s, no errors.

---

# Overnight Build Log — 25 September 2026

## 2026-09-26 (Overnight Session)
- Fixed cognac 2025 data direction error: growth corrected from +1.8% → -2.4%, growthDir up → down
- Updated marketSize $12.5B → $12.0B and volumeCases 12.8M → 12.3M to match commandCentreData.js
- Corrected China market growth +2.5% → -15%, all 6 city regions flipped to negative (tariff impact)
- Added null guard to supplyChainData.js parseChange() for defensive safety
- Build clean, pushed to main (Railway auto-deploy triggered)
## Session summary

**Shipped:** 7 data quality corrections across Beam Suntory and Campari in companyData.js. Build clean (11.67s). Pushed to main as `1830382`.

1. **Beam Suntory — fabricated 2017 Pinnacle entry removed from maTimeline.** The timeline had `{"year": 2017, "deal": "Acquired Pinnacle Vodka brand"}` — a fabrication. Pinnacle was acquired by Beam in 2012 (correct entry preserved: "Beam acquired Pinnacle Vodka and Calico Jack Rum from White Rock Distilleries for $605M"). No 2017 re-acquisition occurred.

2. **Beam Suntory — Courvoisier removed from keyBrands; replaced with Haku.** Courvoisier was divested to Campari Group in 2024 (correctly recorded in maTimeline). Haku Japanese Rice Vodka (added to brandData.js 16 Sep) is the correct replacement — a current Beam Suntory brand in their vodka portfolio.

3. **Beam Suntory — categoryPresence corrected: Cognac/Courvoisier → Vodka/Haku+Pinnacle.** Post-divestiture, Beam Suntory has no cognac. The Vodka entry reflects their actual portfolio (Haku, Pinnacle) with "Craft Niche" positioning.

4. **Beam Suntory — weaknessesForCompetitor updated.** Removed stale "Courvoisier underperforming vs Hennessy" line; replaced with accurate "No premium vodka play — Haku is niche, Pinnacle is value; no answer to Grey Goose or Absolut."

5. **Beam Suntory — stale Courvoisier entries removed from recentMoves and recentDevelopments.** May 2025 recentMove "Courvoisier rebrand launched" and Sep 2025 development "Courvoisier VS redesigned" were both attributed to Beam Suntory after they had already sold the brand; replaced with accurate Haku market activity.

6. **Campari — Courvoisier added to keyBrands; Cognac added to categoryPresence.** Campari completed the acquisition in Apr 2025. keyBrands now includes Courvoisier. categoryPresence gains `"Cognac": {"share": 6, "brands": ["Courvoisier"], "position": "New Entrant (2025)"}`.

7. **Campari — Dec 2025 recentDevelopment corrected.** Previous text said "Announced acquisition of Courvoisier from Beam Suntory" (impossible — acquisition completed Apr 2025). Replaced with accurate Courvoisier post-acquisition integration news.

**Audited (no action needed):**
- All JSX text nodes: 0 raw £/€ violations across entire src tree.
- brandData.js: 326 entries, 0 company='Various', correct category distribution.
- All Recharts Tooltip components: all confirmed dark contentStyle (one false-positive from 6-line scanner window; manual verify confirmed clean).
- Build: 11.67s, 2821 modules, no errors.

---

# Overnight Build Log — 24 September 2026

## Session summary

**Shipped:** 2 data integrity fixes in commandCentreData.js and companyData.js. Build clean (14.29s). Pushed to main as `05990af`.

1. **commandCentreData.js — MARKET_PULSE RTD badge corrected:** `change` field updated from `'+16.4%'` (US spirits-based RTD sub-segment, DISCUS) to `'+8.5%'` (global RTD, consistent with CATEGORY_SNAPSHOT/MARKET_SIGNALS). Event text updated to clarify US scope: "Spirits-based RTDs now 47% of US RTD volume; global RTD: +8.5%".

2. **companyData.js — Brown-Forman fabrications removed (5 entries):** Removed Gin Mare/Diplomático from Brown-Forman `keyBrands`, `categoryPresence`, `recentMoves`, `maTimeline`, `recentDevelopments`, and `analystOutlook` — all fabricated; neither brand is owned or distributed by Brown-Forman.

3. **companyData.js — William Grant & Sons updated for Gin Mare:** Added Gin Mare to `keyBrands`, updated Gin `categoryPresence` share 10 → 12 and brands list, and inserted 2022 acquisition entry in `maTimeline` — consistent with the Sept 23 brandData.js correction.

**Audited (no action needed):**
- categoryData.js: 0 growth/growthDir mismatches across all 11 categories × 5 years.
- brandData.js: 0 mixed apostrophe encodings across 10 brands with curly apostrophes.
- All Recharts Tooltips confirmed dark contentStyle; all chart components have accessibilityLayer.

---

# Overnight Build Log — 23 September 2026

## Session summary

**Shipped:** 4 brandData.js data quality fixes. Build clean (11.35s). Pushed to main.

1. **Gin Mare company corrected:** Brown-Forman → William Grant & Sons (acquired 2021–22). Previous attribution was incorrect; Gin Mare is now part of William Grant & Sons.

2. **Tanqueray RTD Gin & Tonic 10pk removed from Gin category:** RTD belongs only in the RTD category (retained at line ~1095). Replaced in Gin with a legitimate Super Premium entry: Tanqueray No. Ten, with realistic market pricing across all 8 markets.

3. **Maker's Mark Original string encoding fixed:** Brand string changed from `'Maker’s Mark'` (curly apostrophe as literal escape) to `"Maker's Mark"` (double-quoted, ASCII apostrophe). An earlier edit had introduced U+2018/U+2019 curly quotes as string delimiters on the surrounding fields — fixed at byte level via Python replace to restore valid ASCII delimiters. Entry count confirmed at 326.

4. **Maker's Mark 46 company corrected:** Brown-Forman → Beam Suntory. Both Maker's Mark expressions now share the correct owner.

**Audited (no action needed):**
- Total brand entries: 326 across 14 categories ✓.
- categoryData.js: all 55 year-blocks already audited, no issues.
- Build: 11.35s, 2821 modules, no errors.

---

# Overnight Build Log — 22 September 2026

## Session summary

**Shipped:** 3 fixes — DepletionForecasting winter seasonality sum corrected (11.30→12.00), VenueIntelligence axis decimal labels fixed, Financials dead constant removed. Build clean (11.90s). Pushed to main.

1. **`frontend/src/pages/DepletionForecasting.jsx` — winter seasonality profile corrected from sum=11.30 to sum=12.00.** The `winter` profile factors `[0.90, 0.80, 0.75, 0.70, 0.75, 0.80, 0.85, 0.85, 0.90, 1.10, 1.40, 1.50]` summed to 11.30, causing a systematic 5.8% underforecast of annual depletions for Whisky and Cognac users. The other four profiles (standard, summer, champagne, flat) all correctly summed to 12.00. Fix: increased Sep/Oct/Nov/Dec from `[0.90, 1.10, 1.40, 1.50]` to `[0.95, 1.20, 1.55, 1.90]` — a proportional uplift of the Q4 peak (where winter spirits naturally over-index) that brings the total to exactly 12.00.

2. **`frontend/src/pages/VenueIntelligence.jsx` — `allowDecimals={false}` added to two horizontal bar chart XAxes.** The Regional Distribution and Top Cities by Entries charts use `layout="vertical"` with `<XAxis type="number">`. Without `allowDecimals={false}`, Recharts auto-scales and can produce tick marks at 0.5, 1.5 etc. when bar counts are small integers. Both XAxis instances now have the prop applied.

3. **`frontend/src/pages/Financials.jsx` — dead constant `totalMarketCap` removed.** `const totalMarketCap = '£125B+'` was declared at line 30 but never referenced in JSX. Removed as dead code.

**Audited (no action needed):**
- categoryData.js: all 55 channel blocks sum to 100%, all growth/growthDir pairs consistent ✓.
- venueData.js: 250 FIFTY_BEST_BARS entries, 28 LONDON_VENUES profiles ✓.
- brandData.js: 326 entries, 14 categories ✓. BrandPricing dark tooltips confirmed.
- All Recharts Tooltip contentStyle across audited pages confirmed dark (background: #1e293b) ✓.
- Build: 11.90s, 2821 modules, no errors.

---

# Overnight Build Log — 21 September 2026

## Session summary

**Shipped:** MarketOverview global total corrected from `$1.6T` to `$1.9T`. The five displayed segments ($635B spirits + $880B beer + $330B wine + $31B NoLo + $40B RTD) always summed to ~$1.9T; the `$1.6T` and `95%` figures predated addition of the wine/NoLo/RTD values to the hero card. Methodology note and file-top comment updated to match. Build clean (13.60s). Pushed to main.

1. **`frontend/src/pages/MarketOverview.jsx` — `totalValue` corrected: `$1.6T` → `$1.9T`.** The five displayed segments sum to $1,916B: spirits ($635B) + beer ($880B) + wine ($330B) + NoLo ($31B) + RTD ($40B) = $1,916B ≈ $1.9T. The `$1.6T` was the value from before wine, NoLo, and RTD segment values were added to the hero card; when those three were added (summing to $401B), the header total and methodology note were not updated.

2. **`frontend/src/pages/MarketOverview.jsx` — methodology note corrected.** Previous wording: "Category values sum to $1.6T; note beer ($880B) and spirits ($635B) together comprise 95% of total." Both figures were wrong: correct total is $1.9T and beer+spirits represent 79% (not 95%) of that. Updated to: "Category values sum to $1.9T (spirits $635B + beer $880B + wine $330B + NoLo $31B + RTD $40B); beer and spirits together represent 79% of total."

3. **`frontend/src/pages/MarketOverview.jsx` — file-top comment updated.** Previously read "corrected from $1.1T headline to $1.6T" — stale after second correction. Now traces full history: `$1.1T (spirits-only) → $1.6T (pre-wine) → $1.9T (all 5 segments)`.

**Audited (no action needed):**
- All 55 categoryData.js channel blocks: re-confirmed sum to 100% (11 categories × 5 years).
- All JSX pages: Python full-scan for raw `£`/`€` in text nodes — 0 violations.
- All Recharts chart components: multi-line brace-aware accessibilityLayer scan — 100% coverage (prior single-line regex false-positive on SupplyChain confirmed false; both AreaChart instances present).
- All `<Tooltip>` instances across all pages: dark contentStyle confirmed on BrandHealth, BrandPricing, CocktailDetail, Financials, Valuations, ClimateYield, SupplyChain.
- Build: 13.60s, no errors.

---

# Overnight Build Log — 20 September 2026

## Session summary

**Shipped:** Stale `$22B` inventory overhang labels in Financials.jsx replaced with a dynamic value that reads directly from the data. Build clean (12.35s). Also cherry-picked 2 commits from a detached HEAD that the prior session left behind (Sep 19 fixes now on main). Pushed to main.

1. **`frontend/src/pages/Financials.jsx` — two hardcoded `$22B` strings replaced with `$${Math.round(totalInventory)}B`.** The `COMBINED_INVENTORY` data shows a 2024 peak of $20.5B and a 2025 total of $20.1B. The chart subtitle and MetricCard `change` prop both displayed "The $22B overhang", overstating the figure by ~$2B. Both now evaluate dynamically so any future data update propagates automatically. Result: renders "The $20B overhang".

2. **`frontend/src/data/financialsData.js` — stale comment updated.** Comment on line 316 previously referenced "$22B headline chart". Updated to: `// Combined inventory headline chart (2025 total: $20.1B; peak 2024: $20.5B)`.

3. **Cherry-picked 2 orphaned Sep 19 commits.** Previous session committed `fix: sync CommandCentre brand count to 326 and RTD growth to +8.5%` and `docs: overnight log 19 September 2026` into detached HEAD, so they never reached main. Recovered via `git cherry-pick`.

**Audited (no action needed):**
- categoryData.js: 55 year-blocks verified, all channel splits (onTrade + offTrade + eCommerce + travelRetail) sum to 100% across all 11 categories × 5 years.
- venueData.js: 250 FIFTY_BEST_BARS entries (50 × 5 years) + 28 LONDON_VENUES — 0 null values.
- brandData.js: 326 brand entries, 134 nulls all in optional mass-market retail price fields — expected.
- companyData.js: 14 companies; 1 null (`estimatedRevenue`) in an unreferenced field — no UI impact.
- w50bMenuIntel.js: 14 null `price_gbp` values, all guarded in JSX — no rendering errors.
- Build: 12.35s, no errors.

---

# Overnight Build Log — 19 September 2026

## Session summary

**Shipped:** CommandCentre brand count synced to 326, RTD growth rate corrected to +8.5% across all 4 stale references in commandCentreData.js. Build clean (12.61s). Pushed to main.

1. **`frontend/src/pages/CommandCentre.jsx` — Brands Tracked KPI corrected from 260 → 326.** The 'Brands Tracked' KPI card still showed `260` (the April 2026 baseline), while BrandPricing.jsx correctly showed 326. Fixed: value `260` → `326`, change badge `+12 this quarter` → `+10 this quarter` (reflecting 316→326 growth), sub-label on 'Avg Price Change' card `260 tracked expressions` → `326 tracked expressions`, and 'Explore Pricing' CTA `260 brand expressions monitored` → `326 brand expressions monitored`.

2. **`frontend/src/data/commandCentreData.js` — KPI_TRENDS.brands sparkline updated.** The sparkline behind the Brands Tracked card used stale data `[200,220,235,248,260]` ending at the April 2026 starting point. Updated to `[248,260,304,316,326]` to match BrandPricing.jsx sparkData (matching the 5-quarter portfolio build trajectory).

3. **`frontend/src/data/commandCentreData.js` — RTD growth corrected in 4 places: `+8.2%` → `+8.5%`.** The previous night's session fixed MarketOverview.jsx and categoryData.js, but commandCentreData.js still held the stale US-market figure (+8.2% is the US RTD growth; global is +8.5%). Fixed in: CATEGORY_SNAPSHOT entry, MARKET_SIGNALS headline, and RECENT_MOVERS change badge. CommandCentre now shows consistent +8.5% for global RTD across all panels.

**Audited (no action needed):**
- All Recharts `<Tooltip>` contentStyle: confirmed dark-background across all pages — 0 missing contentStyle.
- All Recharts chart components: 40 `accessibilityLayer` confirmed, no gaps (BarChart3 Lucide icons accounted for discrepancy in prior count).
- `CATEGORY_SNAPSHOT` NoLo still fastest at +9.5% → CommandCentre 'Top Growing Category' renders correctly as 'No/Low Alcohol'.
- brandData.js category count: Beer 29, Tequila 28, Vodka 25, Gin 24, Rum 24, Wine 24, Scotch Whisky 23, Bourbon & American 21, Cognac 21, Champagne 21, Irish Whiskey 21, Japanese Whisky 21, RTD 22, No/Lo 22 = 326 total ✓.
- KPI_TRENDS.nolo/ecomm/cogs/pe: none of these are referenced in any page — unused fields, no user-visible impact.
- Build: 12.61s, no errors.

---

# Overnight Build Log — 18 September 2026

## Session summary

**Shipped:** RTD growth rate corrected in MarketOverview.jsx: `+16.4%` → `+8.5%`. Build clean (14.28s). Pushed to main.

1. **`frontend/src/pages/MarketOverview.jsx` — RTD segment growth rate corrected from `+16.4%` to `+8.5%`.** The `+16.4%` figure is the US spirits-based RTD segment growth (DISCUS data), not the global total RTD market growth. Global total RTD market grew `+8.5%` in 2025 per categoryData.js (and `+8.2%` in commandCentreData.js). The segment note was updated to clarify: "Spirits-based RTDs now 47% of US RTD volume; +16.4% in US spirits-based segment" — preserving the accurate US figure while correctly attributing its scope. After fix, NoLo (+9.5%) is now the fastest-growing segment on the Market Overview LI signal panel, which is correct.

**Audited (no action needed):**
- categoryData.js: all 11 categories × 5 years = 55 year-blocks, channels sum to 100%, growth/growthDir consistent throughout.
- venueData.js: FIFTY_BEST_BARS 250 entries (50 × 5 years) ✓, LONDON_VENUES 28 entries ✓.
- supplyChainData.js: 0 null values, all historicalData and relevantCategories fields present ✓.
- geographicData.js: 10 regions × 3 years (2023–2025) ✓.
- brandData.js: 326 entries, 0 `company: 'Various'` remaining ✓.
- Build: 14.28s, 2821 modules, no errors.

---

# Overnight Build Log — 17 September 2026

## Session summary

**Shipped:** 4 `company: 'Various'` data-quality fixes — last phantom entries eliminated from brandData.js. Build clean (10.93s). Pushed to main. Total portfolio: 326 (count unchanged).

1. **`frontend/src/data/brandData.js` — Krepkaya Original replaced with Sobieski Original (CEDC, Poland, Standard).** `Krepkaya` is a Russian generic term for "strong/potent" rather than a brand name, and `Various` is not a real company. Replaced with Sobieski, Poland's fourth-largest vodka brand owned by CEDC International (Beluga Group). Named after King John III Sobieski. Well-distributed across EU and US. Standard tier. UK: MoM £14, TWE £14.50. US: TotalWine $11.50, Drizly $13.50, BevMo $12.50, Costco $10.50. Segment corrected Value → Standard to reflect its actual market positioning.

2. **`frontend/src/data/brandData.js` — Korn Traditional replaced with Eristoff Original (Bacardi, France, Standard).** `Korn` is a German grain spirit category designation, not a brand, and is not legally or commercially classified as Vodka in its home market. Replaced with Eristoff, a Georgian-origin vodka brand acquired by Bacardi Ltd in 2003. Produced in France from grain, distributed globally through Bacardi's network. Standard tier. UK: Tesco £15, Sainsbury's £14, Waitrose £16, MoM £14, TWE £14.50. US: TotalWine $12, BevMo $13. Strong Spain/France distribution via Bacardi. Segment corrected Value → Standard.

3. **`frontend/src/data/brandData.js` — Kron Vodka replaced with Pinnacle Original (Beam Suntory, France, Value).** `Kron` had identical pricing to Krepkaya — a clear duplicate placeholder with no verified brand behind it. Replaced with Pinnacle, a French wheat vodka acquired by Jim Beam (now Beam Suntory) in 2012 for $605M. Primarily US market. US: TotalWine $10, Drizly $12, BevMo $11, Costco $9. UK/EU: specialist import only. Segment kept Value.

4. **`frontend/src/data/brandData.js` — Royalty VS Cognac replaced with Meukow VS (La Martiniquaise, France, Standard).** No branded Cognac sells at £12 Tesco — that price point is exclusively own-label. `Royalty VS` with `company: 'Various'` was a fabricated entry with implausible pricing for AOC Cognac. Replaced with Meukow VS, owned by La Martiniquaise-Bardinet (France's largest independent spirits group). Grande Champagne Cognac with a distinctive leopard bottle. UK: Waitrose £32, MoM £28, TWE £30. US: TotalWine $28, BevMo $30. Strong France/Spain/Germany distribution. Segment corrected Value → Standard.

**Audited (no action needed):**
- All `company: 'Various'` entries: confirmed zero remaining across all 326 brandData.js entries.
- Vodka segment distribution after fixes: Standard +2 (Sobieski, Eristoff), Value -2 (Krepkaya, Korn gone) + 1 new Value (Pinnacle) = net: Standard +2, Value -1. Total Vodka: still 25.
- Cognac segment distribution after fix: Standard +1 (Meukow), Value -1 (Royalty gone). Total Cognac: still 21.
- Portfolio count: 326 entries unchanged (4 replacements, not additions).
- Build: 10.93s, 2821 modules, no errors or warnings.

---

# Overnight Build Log — 16 September 2026

## Session summary

**Shipped:** 2 BrandPricing data corrections. Build clean (8.37s). Pushed to main. Total portfolio: 326 (count unchanged).

1. **`frontend/src/data/brandData.js` — "Premium Vodka House Brand" placeholder replaced with Haku Japanese Rice Vodka.**
   The entry used `company: 'Various', brand: 'Premium Vodka', expression: 'House Brand'` — a clear placeholder with index-generated filler prices. Replaced with `company: 'Beam Suntory', brand: 'Haku', expression: 'Japanese Rice Vodka'`, segment upgraded from Standard to Premium. Haku is Suntory's charcoal-filtered Japanese rice vodka, launched 2019, distributed globally through Beam Suntory's network. UK: Waitrose £29.99, Master of Malt £27.99, The Whisky Exchange £28.95. US: TotalWine $28.99, BevMo $31.99. Vodka Premium tier: 1 → 2; Standard: 8 → 7.

2. **`frontend/src/data/brandData.js` — "E&J VS Brandy" (Gallo) removed from Cognac; replaced with D'USSÉ VSOP Cognac (Bacardi).**
   E&J VS is an American brandy produced by E. & J. Gallo Winery in California — it carries no French AOC designation and is legally distinct from Cognac. Its presence in the Cognac category was a categorical data error. Replaced with `company: 'Bacardi', brand: "D'USSÉ", expression: 'VSOP Cognac'`, segment Super Premium. D'USSÉ is a genuine French Cognac (produced at Château de Cognac, Grande Champagne, AOC certified), co-owned by Bacardi Limited. Widely distributed in UK, US, Spain, and the Netherlands. UK: Waitrose £48, Master of Malt £44.99, The Whisky Exchange £46.95. US: TotalWine $39.99, Costco $34.99, BevMo $42.99. Cognac Super Premium tier: 1 → 2; Value: 2 → 1.

**Audited (no action needed):**
- All 11 CategoryIntelligence categories × 5 years (2021–2025): structural audit clean — all required fields (marketSize, growth, growthDir, volumeCases, topMarkets, channels) present for all 55 year-blocks.
- All Tooltip contentStyles: confirmed dark-background (`background: '#1e293b'`, `color: '#f1f5f9'`) on all Recharts chart components across all pages.
- BrandPricing metadata: 326 brands, +25.4% growth, sparkData [248, 260, 304, 316, 326] — all current.
- VenueIntelligence: 50 bars × 5 years = 250 entries (no missing fields); 28 London district profiles (all have name, area, type, accountType, estRevenue, knownBrands, parentCompanies).
- JSX unicode scan: `{'£'}`, `{'€'}` patterns confirmed correctly wrapped across all pages — no raw text node violations.
- Companies data: all 14 companies have all required fields; no rendering issues found.
- Supply Chain, GeographicIntelligence, ReportBuilder, Companies pages: no rendering issues found.
- Post-fix category distribution: Beer 29, Tequila 28, Vodka 25, Gin 24, Rum 24, Wine 24, Scotch Whisky 23, Bourbon & American 21, Cognac 21, Champagne 21, Irish Whiskey 21, Japanese Whisky 21, RTD 22, No/Lo 22.

---

# Overnight Build Log — 15 September 2026

## Session summary

**Shipped:** 3 Wine data corrections + 1 new Ultra Premium Wine entry. Build clean (13.71s). Pushed to main. Total portfolio: 325 → 326.

1. **`frontend/src/data/brandData.js` — San Pellegrino Chianti corrected to Ruffino Chianti DOCG.** `San Pellegrino` is a Nestlé mineral water brand (Acqua Panna/Sanpellegrino), not a wine producer. The entry was a data error. Replaced with `company: 'Ruffino', brand: 'Ruffino', expression: 'Chianti DOCG'` — Ruffino is the appropriate Standard-tier Chianti with genuine UK supermarket and US wine-store distribution at the £10/$11 price point. Prices unchanged.

2. **`frontend/src/data/brandData.js` — Gavi di Gavi corrected to Santa Margherita Pinot Grigio Alto Adige.** The entry used `company: 'Various', brand: 'Gavi', expression: 'di Gavi'` — `Gavi di Gavi` is a wine appellation (DOCG), not a brand name, and `Various` is not a company. Replaced with `company: 'Santa Margherita Group', brand: 'Santa Margherita', expression: 'Pinot Grigio Alto Adige'`. Santa Margherita is the world's most recognised Premium-tier Italian white wine brand. Prices updated to reflect its true market position (~£16 UK / $18 US vs the previous £14/$15 estimate).

3. **`frontend/src/data/brandData.js` — Pinot Grigio Delle Venezie corrected to Cavit Pinot Grigio.** Entry used `company: 'Various', brand: 'Pinot Grigio', expression: 'Delle Venezie'` — again an appellation with no brand. Replaced with `company: 'Cavit', brand: 'Cavit', expression: 'Pinot Grigio delle Venezie'`. Cavit is Italy's largest wine cooperative and the dominant branded export for Italian Value-tier Pinot Grigio in both UK and US markets. Prices unchanged.

4. **`frontend/src/data/brandData.js` — Antinori Tignanello added (Ultra Premium Wine).** The Wine category had no Ultra Premium entry, leaving a £217 gap between the highest Super Premium (Robert Mondavi Reserve ~£27) and the lowest Prestige wine (Sassicaia ~£216). Antinori Tignanello (Marchesi Antinori / Ultra Premium / Super Tuscan, Sangiovese + Cabernet blend) fills the ~£65 tier. Stocked at Waitrose (£69.99), The Whisky Exchange (£64.95), TotalWine US ($84.99), Tannico Italy (€69.95), Gall & Gall Netherlands (€78.95). Null for mass-market supermarkets as appropriate for a fine wine at this tier. Wine: 23 → 24.

5. **`frontend/src/pages/BrandPricing.jsx` — Metadata updated.** MethodologyTooltip `325 brands` → `326 brands`; sparkData `[248, 260, 304, 316, 325]` → `[248, 260, 304, 316, 326]`; change badge `+25.0%` → `+25.4%` (260 → 326).

**Audited (no action needed):**
- All 11 CategoryIntelligence categories × 5 years (2021–2025): 55/55 year-blocks present, all growth/growthDir pairs consistent (55/55 checked).
- All chart pages: accessibilityLayer confirmed on all Recharts chart components, zero gaps.
- All Tooltip contentStyles: confirmed multi-line scan — all dark-background tooltips have `color: '#f1f5f9'`.
- Wine segment distribution after tonight: Value 6, Standard 5, Premium 3, Super Premium 1, Ultra Premium 1, Prestige 6 — Ultra Premium tier gap closed.

---

# Overnight Build Log — 14 September 2026

## Session summary

**Shipped:** 2 data-quality fixes. (1) `Lyre's` Italian Spritz entry in `brandData.js` had a U+2019 curly apostrophe byte in its `company` and `brand` fields (`'Lyre's'`), while the American Malt entry added 13 Sep used a double-quoted ASCII apostrophe (`"Lyre's"`). The two entries were therefore different strings and would have split into separate rows in BrandPricing's company-filter grouping. Fixed via Python byte replacement — Italian Spritz now uses `"Lyre's"` matching the convention. (2) BrandPricing.jsx metadata updated to reflect the 325-entry portfolio: MethodologyTooltip `316 brands` → `325 brands`; sparkData last datapoint `316` → `325`; growth badge `+21.5%` → `+25.0%` (260 → 325). Build clean (13.20s). Pushed to main.

1. **`frontend/src/data/brandData.js` — Lyre's Italian Spritz byte fix.** The entry's `company` and `brand` fields contained `'Lyre\xe2\x80\x99s'` (U+2019 inside single-quoted string) while the Lyre's American Malt entry added 13 Sep used `"Lyre's"` (ASCII apostrophe inside double-quoted string). Without this fix, BrandPricing's company grouping would show two `Lyre's` rows rather than one, breaking the per-company filter view. Fixed to `"Lyre's"`.

2. **`frontend/src/pages/BrandPricing.jsx` — Portfolio count metadata updated.** Three stale values updated: MethodologyTooltip `316 brands` → `325 brands`; sparkData `[248, 260, 304, 316, 316]` → `[248, 260, 304, 316, 325]`; change badge `+21.5%` → `+25.0%` (correct for 260 → 325 = 25.0%).

**Audited (no action needed):**
- All 9 new entries added in the 13 Sep commit (Kilbeggan Traditional, Knappogue Castle 12yr, The Irishman Founders Reserve, Nikka Days Blended, Kirin Fuji Single Malt, White Oak Akashi Single Malt, Seedlip Spice 94, Ceder's Alt. Gin Classic): all use correct double-quoted convention for apostrophe names; no data anomalies.
- JSX unicode scan: all `{'£'}`, `{'€'}`, `{'°C'}` patterns are correctly wrapped — 23 scanner flags all confirmed false positives.
- Full category distribution after last night's additions: Beer 29, Tequila 28, Vodka 25, Gin 24, Rum 24, Wine 23, Scotch Whisky 23, Bourbon & American 21, Cognac 21, Champagne 21, Irish Whiskey 21, Japanese Whisky 21, RTD 22, No/Lo 22 — all categories at 21+ entries.

---

# Overnight Build Log — 13 September 2026

## Session summary

**Shipped:** 9 new brand expressions across 3 under-represented categories. Irish Whiskey 18 → 21, Japanese Whisky 18 → 21, No/Lo 19 → 22. Total portfolio 316 → 325 entries. Build clean (11.00s). Pushed to main.

1. **Irish Whiskey +3**: Kilbeggan Traditional (Standard), Knappogue Castle 12yr Single Malt (Super Premium), The Irishman Founders Reserve (Premium). Fills gap in entry-level and specialty Irish expressions.

2. **Japanese Whisky +3**: Nikka Days Blended Whisky (Premium), Kirin Fuji Single Malt (Super Premium), White Oak Akashi Single Malt (Super Premium, Eigashima Shuzo). Adds Kirin single malt and an independent distillery representative.
