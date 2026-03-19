# Fix Plan — Liquid Economy Client-Demo Build

## Priority Order (20 iterations)

### Phase 1: Design System Foundation (Iterations 1-3)
- [x] **1. Global design system overhaul** — Tailwind config done (navy, gold, surface, bento radius, fonts). UI components created (Card, MetricCard, SectionHeader, Badge, TabGroup). Dark theme removed: sidebar → white, login → off-white, ChatPanel → white header, LivePulse → light. Pages adopt UI components as they're rebuilt in subsequent tasks.
- [x] **2. Navigation restructure** — Sidebar regrouped into 5 sections (Dashboard, Market, Operations, Retail, Intelligence). BottomTabBar updated with route matching for each group. Breadcrumb trail added for desktop drill-down. Smooth chevron transitions. Clean Apple aesthetic with frosted glass mobile bar.
- [x] **3. Typography + spacing system** — Verified: all 15 pages already use design system tokens (text-page, text-section, text-subsection, text-label, text-body, text-caption, text-micro). Georgia serif headings, Inter body text, spacing tokens all applied during tasks 1-2. Audit confirmed 100% compliance.

### Phase 2: CommandCentre Redesign (Iterations 4-5)
- [x] **4. CommandCentre hero section** — Replaced SummaryStrip with HeroPortals Bento Box grid. 4 portal cards: Intelligence Score (→ /reports), Active Categories (→ /categories), Tracked Companies (→ /companies), Data Freshness (→ /supply-chain). Each card has gradient bg, icon, change indicator, hover animation with gold chevron. Clean white/off-white aesthetic.
- [x] **5. CommandCentre data sections** — Added MarketPulseSection (6 category movements with expandable detail + cross-page links), PriceAlertsSection (8 price alerts with severity badges), RecentlyUpdatedFeed (data freshness across all sections). All progressive disclosure. Wired into all 6 persona views. CSS utility classes added (page-container, bento-card, metric-value, metric-label).

### Phase 3: Categories Page Rebuild (Iterations 6-9)
- [x] **6. Categories visual entry** — App Store "Today" style gallery with CategoryHeroCard components in 2-col Bento Box grid. Each card has category-specific gradient, hero typography, market size/growth/volume stats, metadata footer. Tap card → detail view with back navigation + horizontal category switcher. Gallery is default landing; no sidebar.
- [x] **7. Category detail — Tier 1 (Executive Summary)** — Overview tab redesigned as clean Bento Box: 4 primary metric cards (Market Size, YoY Growth, Volume, Market Leader) in 2x2/4-col grid. Category trajectory card. Quick glance panels for top 3 markets + channel split with cross-links to deeper tabs. Progressive disclosure achieved.
- [x] **8. Category detail — Tier 2 (Drill-down)** — Already implemented via tabs: Markets tab (MarketDrillDown with expandable brand/region/source panels), Brands tab (TieredBrands with High-End/Mid-Tier/Value), Trends tab (with source links), Channel Split (includes Travel Retail). All behind tabs = collapsed by default.
- [x] **9. Category detail — Tier 3 (Deep Analysis)** — Analysis tab with YearlyReport showing key events badges, top performer highlight, multi-paragraph analysis, and firm conclusion card. Source citations throughout via SourceLink components.

### Phase 4: Cross-Page Intelligence (Iterations 10-12)
- [x] **10. Companies page polish** — Applied surface bg, max-w-7xl container, responsive layout (mobile horizontal pill nav + desktop sidebar). CompanyCard redesigned with white cards, gold accent tip box. Search input with rounded-xl. Full mobile responsiveness.
- [x] **11. Venues page polish** — Applied surface bg, max-w-7xl container, proper spacing. Unicode escapes fixed. Already had comprehensive tab system, year filtering, brand mapping, and clean card layouts from previous build.
- [ ] **12. Global Search enhancement** — Full-screen modal search with faceted results: Companies, Categories, Venues, Brands. Predictive autocomplete. Cross-page navigation from results. Keyboard shortcut (Cmd+K)

### Phase 5: Operations Pages (Iterations 13-15)
- [ ] **13. Supply Chain page redesign** — Rename from "Upstream" language. Clean Bento Box layout. Shipping routes as clean infographic (not cluttered map). Chokepoint alerts as status cards. Commodity prices as clean line charts
- [ ] **14. Geographic Intelligence polish** — Clean map with white/minimal aesthetic. Region cards with key stats. Drill-down to country → brands → venues. Progressive disclosure throughout
- [ ] **15. POS + Pricing + Margin pages** — Consistent Bento Box treatment. Clean data tables. Charts with single-axis lines. White cards with gold accent on key metrics. Ensure all three pages feel cohesive

### Phase 6: Advanced Features (Iterations 16-18)
- [ ] **16. Scenario Modeling + Campaign Planner polish** — Clean form inputs, white cards, clear results display. Make these feel like premium tools, not prototypes. Add interpretation text ("Based on this scenario, we recommend...")
- [ ] **17. Climate + Valuations pages** — Clean data viz for weather/yield data. Valuations with clear P/E, M&A signals. Both pages using Bento Box grid with white bg
- [ ] **18. Report Builder enhancement** — Clean template selection. PDF-ready formatting. Include cross-page data compilation. Professional output quality

### Phase 7: Polish + Performance (Iterations 19-20)
- [ ] **19. Performance + mobile responsiveness** — Code-split CategoryIntelligence (largest file). Ensure all pages render cleanly on mobile. Test BottomTabBar works on all pages. Lazy-load heavy chart components. Fix any Vite build warnings
- [ ] **20. Final polish + deploy verification** — Consistent spacing across all 15 pages. Fix any broken cross-links. Verify build passes. Push to main. Verify Railway deployment. Screenshot key pages for client presentation

## Completed
- [x] Project initialization
- [x] Ralph setup

## Completion Criteria
- All 15 pages using white Bento Box design system
- Progressive disclosure on all data-heavy pages
- Mobile responsive with working tab bar
- Build passes with no errors
- Deployed live on Railway
- Ready to show to a drinks brand client
