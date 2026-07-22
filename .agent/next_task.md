agent: Data Quality Agent
task: Fix 2024 W50B rank 50 duplicate — '1930' (Milan) appears at both rank 42 and rank 50 in FIFTY_BEST_BARS[2024]. The correct rank 50 bar needs verification from the actual World's 50 Best Bars 2024 source. Replace the duplicate entry at rank 50 with the verified correct bar. Also scan for any remaining JSX unicode violations or null-guard issues.
priority: 1
files: frontend/src/data/venueData.js
acceptance: No duplicate entries in any year of FIFTY_BEST_BARS. 2024 rank 50 contains the correct bar with verified name, city, country, region.
context: VenueIntelligence audit complete. All 28 LONDON_VENUES profiles now have 7 required fields (name, area, type, capacity, covers_weekly, buyer_name, phone). CategoryIntelligence (11 cats × 5 yrs) and BrandPricing (260 expressions) both audited clean in prior sessions.
steering: none
