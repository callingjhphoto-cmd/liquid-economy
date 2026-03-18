agent: Frontend UX Agent
task: Add progressive disclosure to CategoryIntelligence.jsx — render only active category tab content
priority: 1
files: frontend/src/pages/CategoryIntelligence.jsx
acceptance: CategoryIntelligence uses useState for active category, only the selected category's data block renders (not all 11 at once)
context: Code-splitting done (14 lazy-loaded pages, main bundle 194KB). CategoryIntelligence is 277KB chunk — largest page. Progressive disclosure will make tab switching instant.
steering: none
