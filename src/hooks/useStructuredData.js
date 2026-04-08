import { useEffect } from 'react'

export function useStructuredData(structuredData) {
  useEffect(() => {
    if (!structuredData) return

    // Create or update script tag for JSON-LD
    let script = document.querySelector('script[type="application/ld+json"]')
    if (!script) {
      script = document.createElement('script')
      script.type = 'application/ld+json'
      document.head.appendChild(script)
    }
    script.textContent = JSON.stringify(structuredData)

    return () => {
      // Cleanup
    }
  }, [structuredData])
}
