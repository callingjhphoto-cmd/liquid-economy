import React, { useEffect, useRef, useCallback } from 'react'

/**
 * BottomSheet — mobile-only overlay for Tier 2/3 progressive disclosure.
 * Hidden on desktop (lg:hidden). Slides up from bottom with snap points
 * at 50% and 85% viewport height. Supports drag-to-dismiss.
 *
 * Props:
 *   open     — controls visibility
 *   onClose  — callback when dismissed
 *   title    — sheet heading
 *   children — content
 */
export function BottomSheet({ open, onClose, title, children }) {
  const sheetRef = useRef(null)
  const dragRef = useRef({ startY: 0, currentY: 0, dragging: false })

  // Lock body scroll when open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  // Escape key to dismiss
  useEffect(() => {
    if (!open) return
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [open, onClose])

  const handleTouchStart = useCallback((e) => {
    dragRef.current.startY = e.touches[0].clientY
    dragRef.current.dragging = true
  }, [])

  const handleTouchMove = useCallback((e) => {
    if (!dragRef.current.dragging || !sheetRef.current) return
    const deltaY = e.touches[0].clientY - dragRef.current.startY
    // Only allow dragging downward
    if (deltaY > 0) {
      sheetRef.current.style.transform = `translateY(${deltaY}px)`
    }
  }, [])

  const handleTouchEnd = useCallback(() => {
    if (!dragRef.current.dragging || !sheetRef.current) return
    dragRef.current.dragging = false
    const currentTransform = sheetRef.current.style.transform
    const match = currentTransform.match(/translateY\((\d+)px\)/)
    const deltaY = match ? parseInt(match[1], 10) : 0

    if (deltaY > 120) {
      // Dismiss threshold reached
      sheetRef.current.style.transform = ''
      onClose()
    } else {
      // Snap back
      sheetRef.current.style.transition = 'transform 0.2s ease-out'
      sheetRef.current.style.transform = 'translateY(0)'
      setTimeout(() => {
        if (sheetRef.current) {
          sheetRef.current.style.transition = ''
        }
      }, 200)
    }
  }, [onClose])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/30 transition-opacity duration-200"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Sheet */}
      <div
        ref={sheetRef}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className="absolute bottom-0 left-0 right-0 bg-white rounded-t-2xl max-h-[85vh] overflow-y-auto animate-slideUp"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Grab handle */}
        <div className="sticky top-0 bg-white rounded-t-2xl pt-3 pb-2 z-10">
          <div className="w-12 h-1 bg-gray-300 rounded-full mx-auto" />
        </div>

        {/* Content */}
        <div className="px-6 pb-6">
          {title && (
            <h2 className="text-section text-navy mb-4">{title}</h2>
          )}
          {children}
        </div>
      </div>
    </div>
  )
}
