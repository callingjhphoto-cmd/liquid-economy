agent: Data Quality Agent
task: Audit VenueIntelligence 250 entries — check 28 London profiles have complete data (name, area, type, capacity, covers_weekly, buyer_name, phone). Audit all venue categories and flag any missing fields or placeholder values.
priority: 1
files: frontend/src/data/venueData.js, frontend/src/pages/VenueIntelligence.jsx
acceptance: All 250 venue entries have required fields. All 28 London profiles complete with buyer contact info. Zero placeholder dash values in required fields.
context: ux-001 through ux-006 ALL DONE. Priority P1 UX complete. Next priority is data quality. BrandPricing (260 expressions) and CategoryIntelligence (11 categories × 5 years) audited clean. VenueIntelligence not yet audited at field level.
steering: none
