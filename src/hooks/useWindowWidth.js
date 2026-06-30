import { useState, useEffect } from 'react'

export function useWindowWidth() {
  const [width, setWidth] = useState(() => window.innerWidth)

  useEffect(() => {
    let rafId
    const handleResize = () => {
      cancelAnimationFrame(rafId)
      rafId = requestAnimationFrame(() => setWidth(window.innerWidth))
    }
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
      cancelAnimationFrame(rafId)
    }
  }, [])

  return width
}
