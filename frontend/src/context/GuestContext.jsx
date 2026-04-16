/**
 * GuestContext
 *
 * Reads the ?s= query param on mount.
 * If it matches a valid, non-expired token in shareTokens.js,
 * sets isGuest=true and guestProfile=<slug>.
 *
 * Any component can call useGuest() to read these values.
 * Layout uses them to lock down the sidebar and route guard.
 */

import React, { createContext, useContext, useMemo } from 'react'
import { useLocation } from 'react-router-dom'
import shareTokens from '../data/shareTokens'

const GuestContext = createContext({
  isGuest: false,
  guestProfile: null,
  guestLabel: null,
})

export function GuestProvider({ children }) {
  const location = useLocation()

  const value = useMemo(() => {
    const params = new URLSearchParams(location.search)
    const token = params.get('s')
    if (!token) return { isGuest: false, guestProfile: null, guestLabel: null }

    const entry = shareTokens[token]
    if (!entry) return { isGuest: false, guestProfile: null, guestLabel: null }

    // Check expiry
    const today = new Date().toISOString().slice(0, 10)
    if (entry.expiresAt < today) return { isGuest: false, guestProfile: null, guestLabel: null }

    return {
      isGuest: true,
      guestProfile: entry.profile,
      guestLabel: entry.label,
      guestToken: token,
    }
  }, [location.search])

  return <GuestContext.Provider value={value}>{children}</GuestContext.Provider>
}

export function useGuest() {
  return useContext(GuestContext)
}
