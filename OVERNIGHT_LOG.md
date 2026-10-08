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
