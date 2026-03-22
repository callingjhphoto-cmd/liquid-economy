import React, { useState, useEffect, useRef, useCallback } from 'react'

/**
 * BottomSheet — mobile-only overlay for Tier 2/3 progressive disclosure.
 * Hidden on desktop (lg:hidden). Slides up from bottom with snap points
 * at 50% and 85% viewport height. Supports drag-to-dismiss.
 * Animates both open (slide-up) and close (slide-down + backdrop fade-out).
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
  const triggerRef = useRef(null)
  const [visible, setVisible] = useState(false)
  const [animating, setAnimating] = useState(false)

  const FOCUSABLE = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'

  // Two-phase mount/unmount: visible controls DOM presence, animating controls CSS transitions
  useEffect(() => {
    if (open) {
      // Remember the element that triggered the sheet so we can restore focus later
      triggerRef.current = document.activeElement
      setVisible(true)
      // Small delay to ensure DOM is rendered before animation starts
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setAnimating(true))
      })
    } else if (visible) {
      // Phase 1: trigger exit animation
      setAnimating(false)
      // Phase 2: unmount after animation completes
      const timer = setTimeout(() => setVisible(false), 300)
      return () => clearTimeout(timer)
    }
  }, [open])

  // Focus trap: move focus into the sheet and cycle Tab within it
  useEffect(() => {
    if (!visible || !animating || !sheetRef.current) return

    // Small delay so the sheet DOM is fully rendered
    const raf = requestAnimationFrame(() => {
      if (!sheetRef.current) return
      const focusable = sheetRef.current.querySelectorAll(FOCUSABLE)
      if (focusable.length > 0) {
        focusable[0].focus()
      } else {
        // If nothing focusable, make the sheet itself focusable
        sheetRef.current.setAttribute('tabindex', '-1')
        sheetRef.current.focus()
      }
    })

    const handleKeyDown = (e) => {
      if (e.key !== 'Tab' || !sheetRef.current) return

      const focusable = Array.from(sheetRef.current.querySelectorAll(FOCUSABLE))
      if (focusable.length === 0) return

      const first = focusable[0]
      const last = focusable[focusable.length - 1]

      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault()
          last.focus()
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [visible, animating])

  // Lock body scroll when visible
  useEffect(() => {
    if (visible) {
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [visible])

  // Animate out then unmount, restoring focus to the trigger element
  const handleClose = useCallback(() => {
    if (!animating) return
    setAnimating(false)
    setTimeout(() => {
      setVisible(false)
      onClose()
      // Return focus to the element that opened the sheet
      if (triggerRef.current && typeof triggerRef.current.focus === 'function') {
        triggerRef.current.focus()
      }
    }, 300)
  }, [animating, onClose])

  // Escape key to dismiss
  useEffect(() => {
    if (!visible) return
    const handleKey = (e) => {
      if (e.key === 'Escape') handleClose()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [visible, handleClose])

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
      handleClose()
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
  }, [handleClose])

  if (!visible) return null

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      {/* Backdrop */}
      <div
        className={`absolute inset-0 bg-black transition-opacity duration-300 ${animating ? 'opacity-30' : 'opacity-0'}`}
        onClick={handleClose}
        aria-hidden="true"
      />

      {/* Sheet */}
      <div
        ref={sheetRef}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className={`absolute bottom-0 left-0 right-0 bg-white rounded-t-2xl max-h-[85vh] overflow-y-auto transition-transform duration-300 ease-out ${animating ? 'translate-y-0' : 'translate-y-full'}`}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Grab handle */}
        <div className="sticky top-0 bg-white rounded-t-2xl pt-3 pb-2 z-10">
          <div className="w-12 h-1 bg-gray-300 rounded-full mx-auto" />
        </div>

        {/* Content */}
        <div className="px-5 pb-6" style={{ paddingBottom: 'max(1.5rem, env(safe-area-inset-bottom, 1.5rem))' }}>
          {title && (
            <h2 className="text-section text-navy mb-4">{title}</h2>
          )}
          {children}
        </div>
      </div>
    </div>
  )
}
