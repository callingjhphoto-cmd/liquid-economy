# Overnight Build Log — 25 August 2026

## Session summary

**Shipped:** 5 bug fixes across 4 files — `&amp;` HTML entity in JSX prop strings, TypeError guard on `revenueGrowth.startsWith`, null-safe `categoryPresence` sort, and missing `YAxis width` on VenueIntelligence chart. Build clean (0 errors, 14.56s). Pushed to main.

1. **ProfileChorusCocktails.jsx** — Two `SectionHeader` props (`sub="...pricing bands &amp; theatre..."` and `title="Presentation &amp; Theatre Library"`) used `&amp;` as an HTML entity. In JSX attribute strings, HTML entities are *not* decoded — the literal string `&amp;` is passed to the component and rendered as text via `{sub}` / `{title}`, displaying `&amp;` on screen instead of `&`. Fixed by using plain `&` in both prop strings.

2. **Valuations.jsx** — Same `&amp;` bug in `DataFreshness source="...IWSR M&amp;A database"`. The `DataFreshness` component renders `{source}` as a JSX expression; the undecoded `&amp;` appeared literally in the footer. Fixed to `M&A`.

3. **Companies.jsx (×3 call sites)** — `company.revenueGrowth.startsWith('+')` throws `TypeError: .startsWith is not a function` if any company record has a numeric `revenueGrowth` value (the data model doesn't enforce string type here). Fixed by wrapping in `String(...)` at `CompanyCardTier1` (line 174), `CompanyTier2` (line 261), and the mobile BottomSheet (line 1109).

4. **Companies.jsx** — `categoryPresence` sort comparator `b[1].share - a[1].share` produced `NaN` and non-deterministic ordering when `share` was missing from any entry. Added `?. ?? 0` nullish fallback to both sides of the subtraction.

5. **VenueIntelligence.jsx** — `YAxis` on the "Top 5 Penetration Trend (%)" `LineChart` lacked a `width` prop. Without it, percentage tick labels like `40%` can be clipped by the default narrow width. Added `width={42}` to match other chart axes in the file.
