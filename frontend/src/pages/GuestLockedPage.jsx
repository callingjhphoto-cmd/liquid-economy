import React from 'react'
import { Lock } from 'lucide-react'

export default function GuestLockedPage({ profile }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-6">
      <div className="w-14 h-14 bg-navy/5 rounded-2xl flex items-center justify-center mb-5">
        <Lock size={24} className="text-navy/40" />
      </div>
      <h2 className="font-display text-xl text-navy font-bold mb-2">
        Outside your preview access
      </h2>
      <p className="text-sm text-gray-500 max-w-sm mb-6 leading-relaxed">
        This section is part of the full Liquid Economy platform. Your guest
        preview is scoped to the {profile ? profile.replace(/-/g, ' ') : 'client'} profile.
        Contact Liquid Creative to unlock the full product.
      </p>
      <a
        href="mailto:james@huertas.co.uk?subject=Liquid Economy — Full Access Request"
        className="inline-flex items-center gap-2 bg-navy text-white text-sm font-medium px-5 py-2.5 rounded-xl hover:bg-navy/90 transition-colors"
      >
        Request full access from Liquid Creative
      </a>
      <p className="text-xs text-gray-400 mt-8">
        Generated for Chorus &middot; April 2026 &middot; Liquid Creative
      </p>
    </div>
  )
}
