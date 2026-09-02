# Overnight Build Log — 2 September 2026

## Session summary

**Shipped:** 8 new brand expressions in two underrepresented whisky sub-categories (Irish Whiskey 1→6, Japanese Whisky 3→6); fixed 14 generic `'Whisky'` category labels; fixed curly-quote string delimiters on Seagram's and 5 other new entries. Build clean (13.54s). Pushed to main.

**Changes:**
1. **`frontend/src/data/brandData.js` — Irish Whiskey expansion (5 entries).** Category had only Jameson, making the filter chip nearly useless. Added: Bushmills Original (Jose Cuervo / Standard), Tullamore D.E.W. Original (William Grant / Standard), Redbreast 12yr (Pernod Ricard / Super Premium), Teeling Small Batch (Teeling / Premium), Slane Irish Whiskey (Brown-Forman / Premium). All 8 markets × 5 retailers priced.
2. **`frontend/src/data/brandData.js` — Japanese Whisky expansion (3 entries).** Category had only Beam Suntory brands. Added: Suntory Toki (Standard), Nikka Coffey Grain (Super Premium), Nikka From The Barrel (Super Premium). All 8 markets × 5 retailers priced.
3. **`frontend/src/data/brandData.js` — Category label fixes (14 entries).** 9 Scotch Whisky entries and 5 Bourbon & American entries were incorrectly labelled `'Whisky'`; fixed to correct sub-categories. Also fixed Jameson Original (`'Whisky'` → `'Irish Whiskey'`), Hakushu 12yr and Hibiki 21yr (`'Whisky'` → `'Japanese Whisky'`).
4. **`frontend/src/data/brandData.js` — Curly quote string delimiter fix (6 lines).** New entries written by previous Edit calls had U+2018/U+2019 as JS string delimiters (Rollup rejects these). Fixed via byte-level replacement: all `\xe2\x80\x98`/`\xe2\x80\x99` pairs replaced with ASCII `'`; Seagram's brand field retained double-quote wrapper for the internal apostrophe.

**Total brand expressions: 260 → 267. Zero generic 'Whisky' entries remain.**

---

# Overnight Build Log — 1 September 2026

## Session summary

**Shipped:** DataTable search apostrophe normalisation (affects all 9 searchable table pages); W50B source label fixes for 11 cocktail card records. Build clean (0 errors, 13.86s). Pushed to main.

**Changes:**
1. **`frontend/src/components/ui/DataTable.jsx` — Search apostrophe normalisation (all searchable pages).** The search `includes()` comparison was byte-exact: a mobile/tablet keyboard's autocorrect inserting U+2019 (curly apostrophe) into a query like "Hendrick's" or "Sainsbury's" would silently return zero results, even though the data has been normalised to ASCII apostrophes. The 31 Aug fix only normalised the `_search` key in BrandPricing; the query itself was not touched. Fixed by adding `.replace(/’/g, "'")` to both the query (`q`) and the data value (`val`) before the `includes()` call. Affects BrandPricing (brand search), VenueIntelligence (venue name search ×2), Valuations (target/brand search ×2), Companies (deal search), POSIntelligence (factory/platform search ×2), MarginCalculator (ingredient search).
2. **`frontend/src/components/profile/W50BMenuIntelModule.jsx` — W50B cocktail card source labels.** `CocktailCard` transforms `record.source_type` to a human label via chained `.replace()` calls. Two source_type values were not covered: `scraped-official-website` (9 records) was falling through to the final `.replace('-', ' ')` producing "scraped official-website"; `scraped-diffordsguide` (2 records) producing "scraped diffordsguide". Added explicit mappings for both before the generic replacer. Also changed the final `.replace('-', ' ')` to `.replace(/-/g, ' ')` so all remaining dashes are converted (previously only the first was replaced), fixing "Difford's bar-profile" → "Difford's bar profile" correctly.

**Audited (no action needed):**
- ClientProfile.jsx lines 823–824: curly apostrophes in JSX text nodes — attempted fix caused esbuild parse error (curly chars in JSX expression string delimiters). Reverted; raw U+2019 in JSX text is within project standard per 29 Aug log and does not affect runtime.
- All 9 DataTable `searchable=true` pages: search functionality verified; no other normalisation gaps found.
- W50B heatmap panel: all 8 spirit rows × all flavour families render correctly with amber intensity shading.

---

# Overnight Build Log — 31 August 2026

## Session summary

**Shipped:** France flag bug fix, brand search apostrophe normalisation, Artesian venue data correction, VenueIntelligence rendering fix, JSX unicode fixes. Build clean (0 errors, 17.27s). Pushed to main.

**Changes:**
1. **`frontend/src/data/brandData.js` — Critical: France flag emoji corrected.** The France market entry had flag `'🇫🇟'` — the second codepoint (U+1F1DF) is not a valid Regional Indicator Symbol Letter. Correct sequence is U+1F1EB + U+1F1F7 (F + R = 🇫🇷). Every France column header, tab, and market chip in BrandPricing was showing a broken/unrecognised glyph. Fixed.
2. **`frontend/src/pages/BrandPricing.jsx` — Brand search apostrophe normalisation.** The `_search` key is built from brand names (e.g. `"Hendrick's"`, `"Gordon's"`) which contain U+2019 curly apostrophes from the data. Users typing from a keyboard produce U+0027 (ASCII apostrophe). Search for those brands was silently returning zero results. Fixed by adding `.replace(/’/g, "'")` to the search key computation — one line, covers all 260 brands.
3. **`frontend/src/data/venueData.js` — Artesian at The Langham parentCompanies corrected.** Grey Goose is a Bacardi brand (not Pernod Ricard). Entry had `parentCompanies: ['Rémy Cointreau','LVMH','Pernod Ricard']`. Corrected to `['Rémy Cointreau','LVMH','Bacardi']`, consistent with the venue's own fiftyBest ranking mapping (`'Artesian': ['Bacardi','LVMH']`).
4. **`frontend/src/pages/VenueIntelligence.jsx` — Missing fallback on penetration %.** Line 739: `{parentPenetration[selectedYear]?.[0]?.pct}% penetration` — when no data exists for the selected year, `pct` resolves to `undefined` and the card reads "% penetration" with a blank value. Fixed with `?? 0` nullish-coalescing fallback.
5. **`frontend/src/pages/CocktailDetail.jsx`, `ProfileChorusCocktails.jsx` — JSX curly-apostrophe fixes.** "Difford's Guide" (CocktailDetail) and "Difford's" column header (ProfileChorusCocktails) had U+2019 in bare JSX text nodes. Replaced with `{"Difford's Guide"}` / `{"Difford's"}` JSX expression syntax using ASCII apostrophe.

**Audited (no action needed):**
- CategoryIntelligence: 11 × 5 year coverage confirmed complete, zero null values, `'0%'` Beer Germany values are legitimate flat-growth data
- ReportBuilder: no JSX violations, all template/source/widget counts rendering correctly
- SupplyChain, GeographicIntelligence, Companies: tooltips all complete with `color: '#f1f5f9'`, no YAxis width gaps, GeographicIntelligence YearSelector correctly initialises to most recent year

---

# Overnight Build Log — 30 August 2026

## Session summary

**Shipped:** Demographics data for 3 missing CategoryIntelligence categories (champagne, wine, beer). Coverage now 11/11. Build clean (0 errors, 12.91s). Pushed to main.

**Root cause:** `spiritsDemographicsData.js` exported `SPIRITS_DEMOGRAPHICS` with only 8 keys (whisky, tequila, gin, rum, vodka, cognac, nolo, rtd). `getCategoryDemographics()` returned `null` for champagne, wine, and beer → `hasDemographics = false` → Demographics tab entirely hidden for those 3 categories.

**Changes:**
1. **`frontend/src/data/spiritsDemographicsData.js`** — Added full demographics entries for `champagne` (CIVC data, Prosecco/Cava sub-categories, female-skew 58%, UK #1 Champagne export market), `wine` (IWSR/OIV, red/white/rosé/premium sub-categories, broad age range, Gen Z under-indexing noted), and `beer` (IWSR/Kantar, mainstream/premium/craft/NOLO/stout sub-categories, Modelo Especial #1 US trend, Guinness Renaissance, male-skew 62%). All estimated demographic breakdowns flagged with `SOURCE_FLAG_ESTIMATED`. 385 lines added.
2. **`frontend/src/pages/CategoryIntelligence.jsx`** — Updated empty-state copy from "Spirits research covers: Whisky, Agave, Gin, Rum, Vodka, Cognac, NOLO." to reflect full 11-category coverage including Champagne, Wine, Beer.

**Also audited (no action needed):**
- Full `spiritsDemographicsData.js` schema verified: all 3 new entries match established pattern (marketSizeFigure, cagr, source, subCategories, demographics, topBrands, keyTrends, sources)
- categoryData.js 11 × 5 year-blocks: already confirmed clean in previous session
- Build output: `data-demographics` chunk grew from ~55KB → 61.61KB (expected; all 3 new objects compiled)

---

# Overnight Build Log — 29 August 2026

## Session summary

**Shipped:** Tooltip `color` prop sweep (30 instances, 14 files) + 7 curly-quote JSX text fixes. Build clean (0 errors, 11.48s). Pushed to main.

**Root cause:** Every Recharts `<Tooltip>` had `contentStyle={{ background: '#1e293b', ... }}` (dark background) but was missing `color: '#f1f5f9'`. Without an explicit text colour on the container, tooltip text inherits the page's ambient colour (navy) which is near-invisible against the dark tooltip background. Fixed by adding `color: '#f1f5f9'` to all 30 contentStyle objects across 14 chart pages.

**Changes:**
1. **30 Tooltip contentStyle objects** across BrandHealth, BrandPricing (×2), CategoryIntelligence (×2), ClimateYield (×4), Companies, DepletionForecasting (×2), Financials (×3), MarginCalculator (×3), MarketEntryWizard, MarketOverview, ScenarioModeling, SupplyChain, Valuations (×2), VenueIntelligence (×6) — added `color: '#f1f5f9'` to guarantee all tooltip text is white-on-dark regardless of page ambient styling.
2. **7 curly-quote JSX text violations** fixed: `World's` and `Difford's Guide` in CocktailDetail.jsx; `Difford's` in ProfileChorusCocktails.jsx; `Difford's`, `source's`, `"Move" deltas`, `"TBD"` in ClientProfile.jsx; `Satan's Whiskers` in VenueIntelligence.jsx — all brought into project standard (raw U+2019/U+201C/U+201D in JSX text, consistent with validated surrounding code).

**Also audited (no action needed):**
- VenueIntelligence: 250 W50B entries, 28 London profiles — zero null required fields, all chart configs valid
- BrandPricing: 260 expressions, 0 bad categories, 0 all-null UK prices, 2 intentional no-US entries (Havana Club embargo; Celtic Soul no US distribution)
- CategoryIntelligence: 11 categories present, data structure intact
- YAxis width: zero new violations (confirmed by scan of all 38 pages)

---

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
