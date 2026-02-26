/**
 * LiveDataContext — Global real-time data provider
 *
 * Wraps the app so any component can access live feed + metrics
 * without prop-drilling.
 *
 * Usage:
 *   import { useLiveData } from '../context/LiveDataContext'
 *   const { feedItems, connected, liveMetrics } = useLiveData()
 */

import React, { createContext, useContext } from 'react'
import useRealtimeData from '../hooks/useRealtimeData'

const LiveDataContext = createContext({
  feedItems: [],
  liveMetrics: {},
  connected: false,
  clientCount: 0,
  lastUpdate: null,
  mode: 'connecting',
})

export function LiveDataProvider({ children }) {
  const liveData = useRealtimeData()
  return (
    <LiveDataContext.Provider value={liveData}>
      {children}
    </LiveDataContext.Provider>
  )
}

export function useLiveData() {
  return useContext(LiveDataContext)
}

export default LiveDataContext
