# Fix Plan — Liquid Economy Client-Demo Build

## Priority Order (20 iterations)

### Phase 1: Design System Foundation (Iterations 1-3)
- [x] **1. Global design system overhaul** — Tailwind config done (navy, gold, surface, bento radius, fonts). UI components created (Card, MetricCard, SectionHeader, Badge, TabGroup). Dark theme removed: sidebar → white, login → off-white, ChatPanel → white header, LivePulse → light. Pages adopt UI components as they're rebuilt in subsequent tasks.
- [x] **2. Navigation restructure** — Sidebar regrouped into 5 sections (Dashboard, Market, Operations, Retail, Intelligence). BottomTabBar updated with route matching for each group. Breadcrumb trail added for desktop drill-down. Smooth chevron transitions. Clean Apple aesthetic with frosted glass mobile bar.
- [x] **3. Typography + spacing system** — Verified: all 15 pages already use design system tokens (text-page, text-section, text-subsection, text-label, text-body, text-caption, text-micro). Georgia serif headings, Inter body text, spacing tokens all applied during tasks 1-2. Audit confirmed 100% compliance.

### Phase 2: CommandCentre Redesign (Iterations 4-5)
- [x] **4. CommandCentre hero section** — Replaced SummaryStrip with HeroPortals Bento Box grid. 4 portal cards: Intelligence Score (→ /reports), Active Categories (→ /categories), Tracked Companies (→ /companies), Data Freshness (→ /supply-chain). Each card has gradient bg, icon, change indicator, hover animation with gold chevron. Clean white/off-white aesthetic.
- [ ] **5. CommandCentre data sections** — Add "Market Pulse" section (latest category movements), "Price Alerts" section, "Recently Updated" feed. All using progressive disclosure — summary first, expand for detail. Cross-page links throughout

### Phase 3: Categories Page Rebuild (Iterations 6-9)
- [ ] **6. Categories visual entry** — Replace data dump with App Store "Today" style. Large-format category cards (Tequila, Vodka, Gin, etc.) with hero typography and subtle gradient or icon. Tap card → smooth transition to category detail view
- [ ] **7. Category detail — Tier 1 (Executive Summary)** — When category selected, show ONLY: Market Size, YoY Growth, Volume (Cases), Market Leader. Year selector tabs (2021-2025). Clean, spacious, 4-metric Bento Box layout
- [ ] **8. Category detail — Tier 2 (Drill-down)** — Accordion sections below Tier 1: Top Markets (with drill-down to brands + regions), Channel Split (with Travel Retail), Tiered Brands (High-End / Mid-Tier / Value), Trends. All collapsed by default
- [ ] **9. Category detail — Tier 3 (Deep Analysis)** — "View Full Report" button → expands multi-paragraph yearly analysis. Key events, top performer, detailed analysis, firm conclusion. Source citations throughout. Data table with virtualization for raw numbers

### Phase 4: Cross-Page Intelligence (Iterations 10-12)
- [ ] **10. Companies page polish** — White Bento Box cards per company. Key metrics visible, drill-down for financials. Cross-links to categories they operate in. Clean table with sorting/filtering
- [ ] **11. Venues page polish** — Clean card-based layout for 50 Best Bars data. Filter by year, city, category. Cross-links to brands stocked. Map view if feasible. White/clean aesthetic
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
