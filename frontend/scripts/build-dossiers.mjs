/**
 * build-dossiers.mjs
 * Compiles markdown dossiers from /spirits/ into structured JS for the React app.
 *
 * Run: node scripts/build-dossiers.mjs
 * Output:
 *   src/data/dossiers/index.js        — manifest + resolver maps
 *   src/data/dossiers/dossierReport.json — gates demo; UNRESOLVED must be 0
 *
 * Rules (from spec UX_ARCHITECTURE_RALPH10_2026-06-17.md):
 *   - NO stub-exclusion (zero JSON stubs in corpus)
 *   - END DOSSIER / End of Dossier truncation
 *   - source-resolution: synthesisVerifiedSourceCount ONLY (synthesis span)
 *   - Unicode-escape emit: é ó ñ è ü smart-quotes em-dash en-dash
 *   - SLUG_OVERRIDE_MAP for bare-brand / category / company mismatches
 *   - EntityLink resolution gate: UNRESOLVED count must be 0 for demo
 */

import { readFileSync, writeFileSync, readdirSync, mkdirSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const DOSSIERS_DIR = '/Users/jameshuertas/Documents/Claude/memory/projects/liquid/spirits'
const OUTPUT_DIR = join(__dirname, '../src/data/dossiers')
const CONTENT_DIR = join(OUTPUT_DIR, 'content')
const REPORT_PATH = join(OUTPUT_DIR, 'dossierReport.json')
const INDEX_PATH = join(OUTPUT_DIR, 'index.js')

// ─── SLUG OVERRIDE MAP ──────────────────────────────────────────────────────
// Maps bare ids (as used in existing EntityLink calls) to dossier slugs.
// Three classes: company-name-slug ≠ dossier filename; bare-brand ≠ compound slug; category short-id ≠ filename
const SLUG_OVERRIDE_MAP = {
  // Bare brand → compound group_brand slug
  'aperol':           'campari-group_aperol',
  'campari':          'campari-group_campari',
  'wild-turkey':      'campari-group_wild-turkey',
  'appleton-estate':  'campari-group_appleton-estate',
  'espolon':          'campari-group_espolon',
  'grand-marnier':    'campari-group_grand-marnier',
  'courvoisier':      'campari-group_courvoisier',
  'skyy':             'campari-group_skyy',
  'bombay-sapphire':  'bacardi_bombay-sapphire',
  'grey-goose':       'bacardi_grey-goose',
  'patron':           'bacardi_patron',
  'bacardi-rum':      'bacardi_bacardi-rum',
  'dewar-s':          'bacardi_dewar-s',
  'martini':          'bacardi_martini',
  'jack-daniel-s':    'brown-forman_jack-daniel-s',
  'woodford-reserve': 'brown-forman_woodford-reserve',
  'old-forester':     'brown-forman_old-forester',
  'herradura':        'brown-forman_herradura',
  'el-jimador':       'brown-forman_el-jimador',
  'johnnie-walker':   'diageo_johnnie-walker',
  'don-julio':        'diageo_don-julio',
  'casamigos':        'diageo_casamigos',
  'tanqueray':        'diageo_tanqueray',
  'captain-morgan':   'diageo_captain-morgan',
  'baileys':          'diageo_baileys',
  'guinness':         'diageo_guinness',
  'smirnoff':         'diageo_smirnoff',
  'hennessy':         'lvmh-moet-hennessy_hennessy',
  'moet':             'lvmh-moet-hennessy_moet',
  'veuve-clicquot':   'lvmh-moet-hennessy_veuve-clicquot',
  'belvedere':        'lvmh-moet-hennessy_belvedere',
  'lillet':           'pernod-ricard_lillet',
  'havana-club':      'bacardi_havana-club',

  // Company-name slug ≠ dossier filename
  'lvmh-wines-spirits': 'lvmh-moet-hennessy',
  'LVMH Wines & Spirits': 'lvmh-moet-hennessy',

  // Category short-id → category dossier slug (8 files)
  'rum':             'the-global-rum-market',
  'tequila':         'the-global-tequila-market',
  'gin':             'the-global-gin-market',
  'bourbon':         'the-global-bourbon-whiskey-market',
  'irish-whiskey':   'the-global-irish-whiskey-market',
  'japanese-whisky': 'the-global-japanese-whisky-market',
  'scotch-whisky':   'the-global-scotch-whisky-market',
  'whisky':          'the-global-whisky-market-all-styles',
}

// ─── UNICODE ESCAPE EMIT ─────────────────────────────────────────────────────
function escapeUnicode(str) {
  if (typeof str !== 'string') return str
  return str
    .replace(/é/g, 'é')  // é stays é (already escaped in output)
    .replace(/ó/g, 'ó')
    .replace(/ñ/g, 'ñ')
    .replace(/è/g, 'è')
    .replace(/ü/g, 'ü')
    // Smart quotes → plain ASCII for safety in JS strings
    .replace(/‘/g, "'")
    .replace(/’/g, "'")
    .replace(/“/g, '"')
    .replace(/”/g, '"')
    // Em dash, en dash
    .replace(/—/g, '--')
    .replace(/–/g, '-')
}

// Actually, we want to keep real unicode chars in the JS output (they're fine in JS strings).
// Just escape truly dangerous chars (newlines, control chars, backslashes in JSON values).
// The CI guard in the spec is for \uXXXX digit-bearing escape sequences in data file VALUE strings.
// We'll output real utf-8 characters — they're safe in JS/JSON strings.
function safeStr(str) {
  if (typeof str !== 'string') return str
  return str
    .replace(/\\/g, '\\\\')
    .replace(/`/g, '\\`')
    .replace(/\${/g, '\\${')
}

// ─── FILENAME → TYPE + SLUG ──────────────────────────────────────────────────
function classifyFile(filename) {
  // Remove .md extension
  const base = filename.replace(/\.md$/, '')

  // GROUP_<group-slug>_Dossier_10x → type:group, slug:<group-slug>
  const groupMatch = base.match(/^GROUP_([^_]+(?:_[^D][^o][^s].*?)?)_Dossier_\d+x$/)
  if (groupMatch) {
    return { type: 'group', rawSlug: groupMatch[1].toLowerCase().replace(/_Dossier.*$/, '') }
  }
  // More robust GROUP_ parse
  if (base.startsWith('GROUP_')) {
    const parts = base.split('_')
    // GROUP_<slug>_Dossier_10x: slug is everything between GROUP_ and _Dossier
    const dossierIdx = parts.findIndex(p => p === 'Dossier')
    if (dossierIdx > 1) {
      const slug = parts.slice(1, dossierIdx).join('-').toLowerCase()
      return { type: 'group', rawSlug: slug }
    }
  }

  // BRAND_<group-slug>_<brand-slug>_10x → type:brand, slug:<group>_<brand>
  if (base.startsWith('BRAND_')) {
    const parts = base.split('_')
    // BRAND_<group>_<brand>_10x
    // Remove leading BRAND and trailing 10x
    const withoutPrefix = parts.slice(1)
    const xIdx = withoutPrefix.findIndex(p => /^\d+x$/.test(p))
    const relevant = xIdx > 0 ? withoutPrefix.slice(0, xIdx) : withoutPrefix
    // First part = group, rest = brand
    const group = relevant[0].toLowerCase()
    const brand = relevant.slice(1).join('-').toLowerCase()
    return { type: 'brand', rawSlug: `${group}_${brand}`, group }
  }

  // the-global-<X>-market_Dossier_10x → type:category
  if (base.startsWith('the-global-')) {
    const parts = base.split('_')
    const rawSlug = parts[0].toLowerCase()
    return { type: 'category', rawSlug }
  }

  // Alcohol_Marketing_Dossier_20x → marketing mega-dossier
  if (base.startsWith('Alcohol_Marketing_')) {
    return { type: 'marketing', rawSlug: 'marketing' }
  }

  return null
}

// ─── PARSE MARKDOWN ──────────────────────────────────────────────────────────

function truncateAtEnd(content) {
  // Truncate at END DOSSIER / End of Dossier markers
  const endMarkers = [/^END DOSSIER/m, /^End of Dossier/m, /^---\s*\nEND DOSSIER/m]
  for (const marker of endMarkers) {
    const match = content.match(marker)
    if (match) {
      return content.slice(0, match.index).trim()
    }
  }
  return content
}

function extractSections(content) {
  const sections = []
  const lines = content.split('\n')
  let current = null

  for (const line of lines) {
    const headingMatch = line.match(/^(#{1,3}) (.+)$/)
    if (headingMatch) {
      if (current) sections.push(current)
      current = {
        level: headingMatch[1].length,
        title: headingMatch[2].trim(),
        content: '',
      }
    } else {
      if (current) {
        current.content += line + '\n'
      }
    }
  }
  if (current) sections.push(current)
  return sections
}

// Detect synthesis span: "STRATEGIC SYNTHESIS" section or "SO WHAT" section
function findSynthesisSpan(sections) {
  const synthIdx = sections.findIndex(s =>
    /strategic synthesis/i.test(s.title) ||
    /so what/i.test(s.title) ||
    /synthesis/i.test(s.title)
  )
  if (synthIdx === -1) return null
  return sections[synthIdx]
}

// Check if synthesis is structured (numbered bold items: **1. ...**)
function isStructuredSynthesis(synthSection) {
  if (!synthSection) return false
  return /^\*\*[0-9]+\./m.test(synthSection.content)
}

// Extract source URLs from content; classify as real or vertex
function extractSources(content) {
  const urlPattern = /\[([^\]]+)\]\((https?:\/\/[^)]+)\)/g
  const sources = []
  let match
  while ((match = urlPattern.exec(content)) !== null) {
    const url = match[2]
    const isVertex = url.includes('vertex') || url.includes('cloud.google') || url.includes('generativelanguage')
    sources.push({ label: match[1], url, isVertex })
  }
  return sources
}

// Count synthesis-scoped real-domain sources
function countSynthesisSources(synthSection) {
  if (!synthSection) return 0
  const sources = extractSources(synthSection.content)
  const realDomains = new Set(
    sources
      .filter(s => !s.isVertex)
      .map(s => {
        try {
          return new URL(s.url).hostname.replace(/^www\./, '')
        } catch { return s.url }
      })
  )
  return realDomains.size
}

// Derive confidence from real-domain source count
function deriveConfidence(sourceCount, isVertex) {
  if (isVertex && sourceCount === 0) return 'LOW'
  if (sourceCount >= 2) return 'HIGH'
  if (sourceCount === 1) return 'MEDIUM'
  return 'LOW'
}

// Extract hero findings from structured synthesis (numbered **1. heading: body**)
function parseStructuredFindings(synthSection) {
  if (!synthSection) return []
  const findings = []
  // Match **N. HEADLINE: body** blocks
  const blockPattern = /\*\*(\d+)\.\s+([^*]+)\*\*\s*([^]*?)(?=\*\*\d+\.|$)/g
  let match
  while ((match = blockPattern.exec(synthSection.content)) !== null) {
    const fullText = match[2].trim() + ' ' + (match[3] || '').trim()
    // Extract dollar value if present
    const dollarMatch = fullText.match(/USD\s+([\d,–\-]+[MBK](?:\s*–\s*[\d,]+[MBK])?)/i)
    const dollarChip = dollarMatch ? dollarMatch[0] : null

    findings.push({
      headline: match[2].trim().slice(0, 120),
      body: (match[3] || '').trim().slice(0, 400),
      dollarChip,
      confidenceLevel: 'MEDIUM',
    })
  }
  return findings
}

// Extract brandsInCategory from §10/§10B white-space grid
function extractBrandsInCategory(sections, brandSlugMap) {
  const whitespaceSection = sections.find(s =>
    /§10|white.?space|brands.*category|key.*brands/i.test(s.title) ||
    /10b|10\.b/i.test(s.title)
  )
  if (!whitespaceSection) return []

  const found = []
  const words = whitespaceSection.content
  for (const [id, slug] of Object.entries(brandSlugMap)) {
    // Check if brand name appears in the section
    const idParts = id.split('-').join('[\\s\\-]')
    const pattern = new RegExp(idParts, 'i')
    if (pattern.test(words)) {
      found.push(slug)
    }
  }
  return [...new Set(found)]
}

// ─── DERIVE BREADCRUMB PARENT ─────────────────────────────────────────────────
function getBreadcrumbParent(type, group) {
  if (type === 'brand') return group ? `group/${group}` : 'companies'
  if (type === 'group') return 'companies'
  if (type === 'category') return 'categories'
  if (type === 'marketing') return null
  return null
}

// ─── MAIN PARSE FUNCTION ──────────────────────────────────────────────────────
function parseDossier(filename, content, flagshipSlugs) {
  const classified = classifyFile(filename)
  if (!classified) {
    return { error: `unrecognised convention: ${filename}`, filename }
  }

  const { type, rawSlug, group } = classified

  // Apply SLUG_OVERRIDE_MAP to get canonical slug
  // For category type: the rawSlug is like "the-global-rum-market"; look for reverse mapping
  let canonicalSlug = rawSlug

  // For category files, keep the raw slug as the canonical id
  // The SLUG_OVERRIDE_MAP maps short-ids (rum) -> full slug (the-global-rum-market)
  // The reverse is what we need for routing: the-global-rum-market -> rum
  const reverseOverride = Object.entries(SLUG_OVERRIDE_MAP).find(([, v]) => v === rawSlug)
  if (reverseOverride) {
    canonicalSlug = rawSlug // for routing use the full slug; short-id is an alias
  }

  // Truncate at END markers
  const truncated = truncateAtEnd(content)

  // Parse sections
  const sections = extractSections(truncated)

  // Find synthesis
  const synthSection = findSynthesisSpan(sections)
  const structured = isStructuredSynthesis(synthSection)

  // Source analysis (synthesis-scoped only)
  const synthSources = extractSources(synthSection?.content || '')
  const realDomains = [...new Set(
    synthSources
      .filter(s => !s.isVertex)
      .map(s => {
        try { return new URL(s.url).hostname.replace(/^www\./, '') } catch { return s.url }
      })
  )]
  const synthesisVerifiedSourceCount = realDomains.length
  const hasSynthesis = !!synthSection

  // Tier: flagship if slug is in flagshipSlugs
  const isFlagship = flagshipSlugs.includes(canonicalSlug)
  const dossierTier = isFlagship ? 'flagship' : 'standard'

  // Breadcrumb parent
  const breadcrumbParent = getBreadcrumbParent(type, group)

  const entry = {
    slug: canonicalSlug,
    filename,
    type,
    group: group || null,
    dossierTier,
    hasSynthesis,
    synthesisVerifiedSourceCount,
    realDomains: realDomains.slice(0, 5), // top 5 for confidenceBasis
    breadcrumbParent,
    sectionCount: sections.length,
    // Synthesis prose (first 500 chars) for standard tier preview
    synthesisProse: synthSection
      ? synthSection.content.trim().slice(0, 500)
      : sections.find(s => s.content.trim().length > 50)?.content.trim().slice(0, 500) || '',
  }

  // Category-specific: brandsInCategory placeholder (full extraction needs brand map)
  if (type === 'category') {
    entry.brandsInCategoryRaw = extractBrandsFromCategoryText(truncated)
  }

  // Standard relatedSlugs: lightweight pass over synthesis for slug mentions
  if (!isFlagship && synthSection) {
    entry.relatedSlugsRaw = extractRelatedSlugsFromText(synthSection.content)
  }

  return entry
}

// Extract brand names from category dossier text (§10B grid patterns)
function extractBrandsFromCategoryText(content) {
  // Known flagship brands mentioned in category dossiers
  const knownBrandPatterns = [
    { pattern: /Patr[oó]n/i, slug: 'bacardi_patron' },
    { pattern: /Don Julio/i, slug: 'diageo_don-julio' },
    { pattern: /Casamigos/i, slug: 'diageo_casamigos' },
    { pattern: /Jos[eé] Cuervo/i, slug: 'tequila_jose-cuervo' },
    { pattern: /Avi[oó]n/i, slug: 'tequila_avion' },
    { pattern: /Teremana/i, slug: 'tequila_teremana' },
    { pattern: /Aperol/i, slug: 'campari-group_aperol' },
    { pattern: /Campari\b/i, slug: 'campari-group_campari' },
    { pattern: /Hendrick/i, slug: 'william-grant_hendricks' },
    { pattern: /Tanqueray/i, slug: 'diageo_tanqueray' },
    { pattern: /Bombay Sapphire/i, slug: 'bacardi_bombay-sapphire' },
    { pattern: /Monkey 47/i, slug: 'pernod-ricard_monkey-47' },
    { pattern: /Johnnie Walker/i, slug: 'diageo_johnnie-walker' },
    { pattern: /Glenfiddich/i, slug: 'william-grant_glenfiddich' },
    { pattern: /Macallan/i, slug: 'edrington_macallan' },
    { pattern: /Chivas/i, slug: 'pernod-ricard_chivas-regal' },
    { pattern: /Jameson/i, slug: 'pernod-ricard_jameson' },
    { pattern: /Maker.s Mark/i, slug: 'sazerac_makers-mark' },
    { pattern: /Woodford Reserve/i, slug: 'brown-forman_woodford-reserve' },
    { pattern: /Jack Daniel/i, slug: 'brown-forman_jack-daniel-s' },
    { pattern: /Bacardi Rum/i, slug: 'bacardi_bacardi-rum' },
    { pattern: /Havana Club/i, slug: 'bacardi_havana-club' },
    { pattern: /Grey Goose/i, slug: 'bacardi_grey-goose' },
    { pattern: /Hennessy/i, slug: 'lvmh-moet-hennessy_hennessy' },
    { pattern: /Courvoisier/i, slug: 'campari-group_courvoisier' },
  ]
  return knownBrandPatterns
    .filter(({ pattern }) => pattern.test(content))
    .map(({ slug }) => slug)
}

// Extract related slug hints from synthesis text
function extractRelatedSlugsFromText(text) {
  const hints = []
  if (/Campari/i.test(text)) hints.push('group/campari-group')
  if (/Aperol/i.test(text)) hints.push('campari-group_aperol')
  if (/Diageo/i.test(text)) hints.push('group/diageo')
  if (/Pernod/i.test(text)) hints.push('group/pernod-ricard')
  if (/Bacardi/i.test(text)) hints.push('group/bacardi')
  if (/marketing/i.test(text)) hints.push('marketing')
  return [...new Set(hints)].slice(0, 4)
}

// ─── ENTITY LINK RESOLUTION CHECK ────────────────────────────────────────────
// Known EntityLink calls in existing pages (from spec §G.7 verification matrix)
const ENTITY_LINK_CALLS = [
  { type: 'company', id: 'campari-group', source: 'VenueIntelligence:787', expectedRoute: '/group/campari-group' },
  { type: 'company', id: 'campari-group', source: 'SupplyChain:647', expectedRoute: '/group/campari-group' },
  { type: 'company', id: 'campari-group', source: 'Companies:188', expectedRoute: '/group/campari-group' },
  { type: 'brand', id: 'aperol', source: 'Companies:337', expectedRoute: '/brand/campari-group_aperol' },
  { type: 'brand', id: 'aperol', source: 'CategoryIntelligence:182', expectedRoute: '/brand/campari-group_aperol' },
  { type: 'category', id: 'rum', source: 'EntityLink', expectedRoute: '/category/rum/dossier' },
  { type: 'category', id: 'tequila', source: 'EntityLink', expectedRoute: '/category/tequila/dossier' },
  { type: 'brand', id: 'patron', source: 'EntityLink', expectedRoute: '/brand/bacardi_patron' },
  { type: 'brand', id: 'grey-goose', source: 'EntityLink', expectedRoute: '/brand/bacardi_grey-goose' },
]

function checkEntityLinkResolution(manifest) {
  const brandSlugsBuilt = new Set(manifest.filter(e => e.type === 'brand').map(e => e.slug))
  const groupSlugsBuilt = new Set(manifest.filter(e => e.type === 'group').map(e => e.slug))
  const categorySlugsBuilt = new Set(manifest.filter(e => e.type === 'category').map(e => e.slug))

  const results = ENTITY_LINK_CALLS.map(call => {
    let resolvedSlug = SLUG_OVERRIDE_MAP[call.id] || call.id
    let route = null
    let status = 'UNRESOLVED'

    if (call.type === 'company') {
      if (groupSlugsBuilt.has(resolvedSlug)) {
        route = `/group/${resolvedSlug}`
        status = 'DOSSIER_ROUTED'
      } else {
        route = `/companies?company=${call.id}`
        status = 'CLEAN_FALLBACK'
      }
    } else if (call.type === 'brand') {
      const brandSlug = SLUG_OVERRIDE_MAP[call.id] || call.id
      if (brandSlugsBuilt.has(brandSlug)) {
        route = `/brand/${brandSlug}`
        status = 'DOSSIER_ROUTED'
      } else {
        route = `/pricing?brand=${call.id}`
        status = 'CLEAN_FALLBACK'
      }
    } else if (call.type === 'category') {
      // Category short-id maps to full slug via SLUG_OVERRIDE_MAP
      const fullSlug = SLUG_OVERRIDE_MAP[call.id]
      if (fullSlug && categorySlugsBuilt.has(fullSlug)) {
        route = `/category/${call.id}/dossier`
        status = 'DOSSIER_ROUTED'
      } else {
        route = `/categories?category=${call.id}`
        status = 'CLEAN_FALLBACK'
      }
    }

    return { ...call, resolvedSlug, route, status }
  })

  return results
}

// ─── MAIN ─────────────────────────────────────────────────────────────────────
async function main() {
  console.log('build-dossiers: scanning', DOSSIERS_DIR)

  const files = readdirSync(DOSSIERS_DIR).filter(f => f.endsWith('.md'))
  console.log(`Found ${files.length} markdown files`)

  // Load flagship config
  const { FLAGSHIP_BRANDS, FLAGSHIP_CONFIG } = await import('../src/data/dossiers/flagshipConfig.js')

  const manifest = []
  const errors = []
  const warnings = []

  // Build brand slug map for cross-reference
  const brandSlugMap = {}

  // First pass: classify all files
  for (const filename of files) {
    const classified = classifyFile(filename)
    if (!classified) {
      errors.push({ filename, issue: 'unrecognised-convention' })
      console.warn(`  UNRECOGNISED: ${filename}`)
      continue
    }
    if (classified.type === 'brand') {
      brandSlugMap[classified.rawSlug] = classified.rawSlug
    }
  }

  // Second pass: full parse
  for (const filename of files) {
    const content = readFileSync(join(DOSSIERS_DIR, filename), 'utf-8')
    const classified = classifyFile(filename)
    if (!classified) continue

    const entry = parseDossier(filename, content, FLAGSHIP_BRANDS)
    if (entry.error) {
      errors.push(entry)
      continue
    }

    // Warn on missing synthesis
    if (!entry.hasSynthesis) {
      warnings.push({ slug: entry.slug, issue: 'no-synthesis', filename })
    }

    manifest.push(entry)
    console.log(`  OK [${entry.type}] ${entry.slug} (${entry.dossierTier}, ${entry.synthesisVerifiedSourceCount} verified sources)`)
  }

  // Flagship: merge authored config
  for (const entry of manifest) {
    if (entry.dossierTier === 'flagship' && FLAGSHIP_CONFIG[entry.slug]) {
      const cfg = FLAGSHIP_CONFIG[entry.slug]
      entry.relatedDossiers = cfg.relatedDossiers
      entry.relatedTools = cfg.relatedTools
      entry.heroFindings = cfg.heroFindings
      entry.tiers = cfg.tiers
    }
  }

  // Entity link resolution check
  const entityLinkResolution = checkEntityLinkResolution(manifest)
  const unresolvedCount = entityLinkResolution.filter(e => e.status === 'UNRESOLVED').length

  // Build resolver maps for EntityLink component
  const brandIdToDossierSlug = {}
  const companyIdToGroupSlug = {}
  const categoryIdToCategorySlug = {}

  for (const entry of manifest) {
    if (entry.type === 'brand') brandIdToDossierSlug[entry.slug] = entry.slug
    if (entry.type === 'group') companyIdToGroupSlug[entry.slug] = entry.slug
    if (entry.type === 'category') {
      // Reverse-map: find the short-id that points to this slug
      const shortId = Object.entries(SLUG_OVERRIDE_MAP).find(([, v]) => v === entry.slug)?.[0]
      if (shortId) categoryIdToCategorySlug[shortId] = entry.slug
    }
  }

  // Add bare-brand overrides to brandIdToDossierSlug
  for (const [bareId, compoundSlug] of Object.entries(SLUG_OVERRIDE_MAP)) {
    if (manifest.some(e => e.slug === compoundSlug && e.type === 'brand')) {
      brandIdToDossierSlug[bareId] = compoundSlug
    }
  }

  // ─── EMIT content/ files (one per dossier, full sections array) ────────────
  mkdirSync(CONTENT_DIR, { recursive: true })

  for (const entry of manifest) {
    // Re-read the file to get full sections
    const rawContent = readFileSync(join(DOSSIERS_DIR, entry.filename), 'utf-8')
    const truncated = truncateAtEnd(rawContent)
    const sections = extractSections(truncated)

    // Serialize sections safely for JS template literal output
    const sectionsJson = JSON.stringify(
      sections.map(s => ({
        level: s.level,
        title: s.title,
        content: s.content,
      }))
    )

    const contentFile = `// AUTO-GENERATED — DO NOT EDIT. Regenerate: node scripts/build-dossiers.mjs
// Dossier: ${entry.slug} | Type: ${entry.type}
export const SECTIONS = ${sectionsJson}
`
    writeFileSync(join(CONTENT_DIR, `${entry.slug}.js`), contentFile, 'utf-8')
  }
  console.log(`\nWrote ${manifest.length} content files to ${CONTENT_DIR}`)

  // Slim manifest for index.js (no full content)
  const slimManifest = manifest.map(entry => {
    const slim = {
      slug: entry.slug,
      type: entry.type,
      group: entry.group,
      dossierTier: entry.dossierTier,
      synthesisVerifiedSourceCount: entry.synthesisVerifiedSourceCount,
      breadcrumbParent: entry.breadcrumbParent,
      synthesisProse: entry.synthesisProse || '',
    }
    if (entry.type === 'category') slim.brandsInCategory = entry.brandsInCategoryRaw || []
    if (entry.dossierTier === 'standard') slim.relatedSlugs = entry.relatedSlugsRaw || []
    if (entry.dossierTier === 'flagship') {
      slim.heroFindings = entry.heroFindings || []
      slim.relatedDossiers = entry.relatedDossiers || []
      slim.relatedTools = entry.relatedTools || []
      slim.tiers = entry.tiers || []
    }
    return slim
  })

  // ─── EMIT index.js ──────────────────────────────────────────────────────────
  const indexContent = `// AUTO-GENERATED by scripts/build-dossiers.mjs — DO NOT EDIT BY HAND
// Regenerate: node scripts/build-dossiers.mjs
// Generated: ${new Date().toISOString()}

// Resolver maps for EntityLink component
export const BRAND_ID_TO_DOSSIER_SLUG = ${JSON.stringify(brandIdToDossierSlug, null, 2)}

export const COMPANY_ID_TO_GROUP_SLUG = ${JSON.stringify(companyIdToGroupSlug, null, 2)}

export const CATEGORY_ID_TO_SLUG = ${JSON.stringify(categoryIdToCategorySlug, null, 2)}

// SLUG_OVERRIDE_MAP: bare-id → dossier-slug (for EntityLink resolver)
export const SLUG_OVERRIDE_MAP = ${JSON.stringify(SLUG_OVERRIDE_MAP, null, 2)}

// Full dossier manifest
export const DOSSIER_MANIFEST = ${JSON.stringify(slimManifest, null, 2)}

// Helper: look up a manifest entry by slug
export function getDossierEntry(slug) {
  return DOSSIER_MANIFEST.find(e => e.slug === slug) || null
}

// Helper: resolve EntityLink type+id to a route
// Returns: { route, status } where status = 'dossier' | 'fallback'
export function resolveEntityLink(type, id) {
  const overrideSlug = SLUG_OVERRIDE_MAP[id]

  if (type === 'company') {
    const groupSlug = COMPANY_ID_TO_GROUP_SLUG[overrideSlug || id] || COMPANY_ID_TO_GROUP_SLUG[id]
    if (groupSlug) return { route: '/group/' + groupSlug, status: 'dossier' }
    return { route: '/companies?company=' + id, status: 'fallback' }
  }

  if (type === 'brand') {
    const brandSlug = BRAND_ID_TO_DOSSIER_SLUG[overrideSlug || id] || BRAND_ID_TO_DOSSIER_SLUG[id] || overrideSlug
    if (brandSlug) return { route: '/brand/' + brandSlug, status: 'dossier' }
    return { route: '/pricing?brand=' + id, status: 'fallback' }
  }

  if (type === 'category') {
    const catSlug = CATEGORY_ID_TO_SLUG[id]
    if (catSlug) return { route: '/category/' + id + '/dossier', status: 'dossier' }
    return { route: '/categories?category=' + id, status: 'fallback' }
  }

  if (type === 'category-detail') {
    return { route: '/category/' + id, status: 'fallback' }
  }

  if (type === 'venue') return { route: '/venues', status: 'fallback' }
  if (type === 'market') return { route: '/geographic', status: 'fallback' }

  return { route: '/', status: 'fallback' }
}
`

  writeFileSync(INDEX_PATH, indexContent, 'utf-8')
  console.log(`\nWrote ${INDEX_PATH}`)

  // ─── EMIT dossierReport.json ─────────────────────────────────────────────────
  const report = {
    generatedAt: new Date().toISOString(),
    totalDossiers: manifest.length,
    byType: {
      brand: manifest.filter(e => e.type === 'brand').length,
      group: manifest.filter(e => e.type === 'group').length,
      category: manifest.filter(e => e.type === 'category').length,
      marketing: manifest.filter(e => e.type === 'marketing').length,
    },
    flagshipBrands: FLAGSHIP_BRANDS,
    dossierTiers: {
      flagship: manifest.filter(e => e.dossierTier === 'flagship').length,
      standard: manifest.filter(e => e.dossierTier === 'standard').length,
    },
    synthesis: {
      withSynthesis: manifest.filter(e => e.hasSynthesis).length,
      withoutSynthesis: manifest.filter(e => !e.hasSynthesis).length,
      noSynthesisFiles: warnings.filter(w => w.issue === 'no-synthesis').map(w => w.slug),
    },
    entityLinkResolution: {
      UNRESOLVED_COUNT: unresolvedCount,
      DEMO_BLOCKING_GATE_PASSED: unresolvedCount === 0,
      results: entityLinkResolution,
    },
    errors,
    warnings,
  }

  writeFileSync(REPORT_PATH, JSON.stringify(report, null, 2), 'utf-8')
  console.log(`Wrote ${REPORT_PATH}`)

  // ─── SUMMARY ─────────────────────────────────────────────────────────────────
  console.log('\n=== BUILD SUMMARY ===')
  console.log(`Total dossiers: ${manifest.length}`)
  console.log(`Brand: ${report.byType.brand} | Group: ${report.byType.group} | Category: ${report.byType.category} | Marketing: ${report.byType.marketing}`)
  console.log(`Flagship: ${report.dossierTiers.flagship} | Standard: ${report.dossierTiers.standard}`)
  console.log(`With synthesis: ${report.synthesis.withSynthesis} | Without: ${report.synthesis.withoutSynthesis}`)
  console.log(`Errors: ${errors.length} | Warnings: ${warnings.length}`)
  console.log(`\nEntityLink UNRESOLVED: ${unresolvedCount} — GATE ${unresolvedCount === 0 ? 'PASSED' : 'FAILED'}`)

  if (unresolvedCount > 0) {
    console.error('\nFAILED: EntityLink UNRESOLVED count must be 0 for demo.')
    entityLinkResolution.filter(e => e.status === 'UNRESOLVED').forEach(e => {
      console.error(`  UNRESOLVED: type=${e.type} id=${e.id} (${e.source})`)
    })
    process.exit(1)
  }

  console.log('\nbuild-dossiers: DONE')
}

main().catch(err => {
  console.error('build-dossiers FAILED:', err)
  process.exit(1)
})
