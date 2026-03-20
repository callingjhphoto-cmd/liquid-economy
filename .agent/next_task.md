agent: Frontend UX Agent
task: Implement mobile responsive breakpoints across all 15 pages — usable at 375px width
priority: 1
files: frontend/src/pages/*.jsx, frontend/src/App.jsx
acceptance: All 15 pages render at 375px width without horizontal scroll. Grid layouts collapse to single column. Tables become scrollable or card-based. Font sizes adjust for mobile readability.
context: ux-001 through ux-005 DONE. This is the last Priority 1 UX task. Focus on the most-visited pages first: CommandCentre, CategoryIntelligence, VenueIntelligence, BrandPricing, Companies. Use Tailwind responsive prefixes (sm:, md:, lg:). Test mentally at 375px (iPhone SE).
steering: none
