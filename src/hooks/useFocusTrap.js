import { useEffect } from 'react'

export function useFocusTrap(containerRef, isActive, onClose, returnFocusRef) {
  useEffect(() => {
    if (!isActive || !containerRef.current) return

    const container = containerRef.current
    const focusableEls = container.querySelectorAll(
      'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
    )
    const first = focusableEls[0]
    const last = focusableEls[focusableEls.length - 1]

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose?.()
        returnFocusRef?.current?.focus()
        return
      }
      if (e.key === 'Tab') {
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last?.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first?.focus()
        }
      }
    }

    first?.focus()
    container.addEventListener('keydown', handleKeyDown)
    return () => container.removeEventListener('keydown', handleKeyDown)
  }, [containerRef, isActive, onClose, returnFocusRef])
}
