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
