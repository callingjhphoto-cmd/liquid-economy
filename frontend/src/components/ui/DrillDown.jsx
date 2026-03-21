import React, { useState, useId } from 'react'
import { ChevronDown } from 'lucide-react'
import { Card } from './Card'

/**
 * DrillDown — expandable panel for Tier 1 \u2192 Tier 2 progressive disclosure.
 * Uses CSS grid-rows trick for smooth height animation (0fr \u2192 1fr).
 *
 * Props:
 *   title       — section heading
 *   summary     — short description shown when collapsed
 *   children    — expanded content (Tier 2)
 *   defaultOpen — start expanded (default: false)
 */
export function DrillDown({ title, summary, children, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen)
  const panelId = useId()

  return (
    <Card className="col-span-full" hover={!open} onClick={() => !open && setOpen(true)}>
      {/* Header row */}
      <div
        className="flex items-center justify-between cursor-pointer min-h-[44px] touch-manipulation"
        onClick={(e) => {
          e.stopPropagation()
          setOpen((prev) => !prev)
        }}
        role="button"
        tabIndex={0}
        aria-expanded={open}
        aria-controls={panelId}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            setOpen((prev) => !prev)
          }
        }}
      >
        <div>
          <h3 className="text-section text-navy">{title}</h3>
          {!open && summary && (
            <p className="text-gray-500 text-sm mt-1">{summary}</p>
          )}
        </div>
        <ChevronDown
          size={20}
          className={`text-navy shrink-0 ml-3 transition-transform duration-300 ${
            open ? 'rotate-180' : 'rotate-0'
          }`}
        />
      </div>

      {/* Expandable content — grid-rows trick for smooth animation */}
      <div
        id={panelId}
        role="region"
        className={`grid transition-[grid-template-rows] duration-300 ease-out ${
          open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
        }`}
      >
        <div className="overflow-hidden">
          <div className="pt-4">{children}</div>
        </div>
      </div>
    </Card>
  )
}
