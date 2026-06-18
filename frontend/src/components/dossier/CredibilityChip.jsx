import React, { useState } from 'react'

/**
 * CredibilityChip
 * Muted-monochrome confidence chip. Reveals confidenceBasis domains on TAP (details element).
 * HIGH = filled navy | MED = outlined navy/grey | LOW = muted grey
 * Per spec: tap-to-reveal (works on iPad); hover is desktop enhancement only.
 */
export function CredibilityChip({ level = 'MEDIUM', count = 0, domains = [], className = '' }) {
  const [open, setOpen] = useState(false)

  const baseStyle = 'inline-flex items-center gap-1.5 text-[11px] font-semibold tracking-wide rounded-full px-2.5 py-1 cursor-pointer select-none transition-all'

  const levelStyles = {
    HIGH: 'bg-navy text-white',
    MEDIUM: 'border border-navy/40 text-navy/70 bg-white',
    LOW: 'border border-gray-300 text-gray-400 bg-white',
  }

  const style = levelStyles[level] || levelStyles['MEDIUM']

  return (
    <span className={`relative inline-flex flex-col ${className}`}>
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        className={`${baseStyle} ${style}`}
        aria-expanded={open}
        aria-label={`${level} confidence. ${count} verified sources. Tap for details.`}
      >
        <span className="font-bold">{level}</span>
        {count > 0 && (
          <span className={`opacity-70 font-normal`}>{count} verified</span>
        )}
        <span className={`text-[9px] transition-transform ${open ? 'rotate-180' : ''} ${level === 'HIGH' ? 'text-white/70' : 'text-gray-400'}`}>
          &#9660;
        </span>
      </button>
      {open && domains.length > 0 && (
        <div className="absolute top-full left-0 mt-1 z-30 bg-navy text-white text-[11px] rounded-lg shadow-lg p-3 min-w-[200px] max-w-[280px]">
          <p className="font-semibold mb-1.5 text-white/80 uppercase tracking-wider text-[10px]">
            Source domains ({domains.length})
          </p>
          <ul className="space-y-0.5">
            {domains.map((d, i) => (
              <li key={i} className="text-white/90 font-mono text-[10px]">{d}</li>
            ))}
          </ul>
        </div>
      )}
    </span>
  )
}
