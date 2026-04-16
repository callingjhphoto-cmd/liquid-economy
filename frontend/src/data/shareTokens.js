/**
 * shareTokens.js
 * Client-side token registry for guest share links.
 *
 * Add entries via: ~/Documents/Claude/scripts/generate_share_token.py
 * Format: { [token]: { profile: slug, expiresAt: 'YYYY-MM-DD', label: 'human name' } }
 *
 * DO NOT commit real credentials alongside this file.
 */

const shareTokens = {
  'CH-2026-XQRP7W': {
    profile: 'chorus-cocktails',
    expiresAt: '2026-07-31',
    label: 'Chorus Cocktails \u2014 guest preview',
  },
}

export default shareTokens
