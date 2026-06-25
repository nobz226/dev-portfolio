import { useEffect } from 'react'

export function usePageMeta(title, description, ogImage = '/og-image.png', canonical = '') {
  useEffect(() => {
    document.title = title || 'Eduard Rotaru - Full-Stack Developer'

    const upsertMeta = (attr, key, content) => {
      const selector = attr === 'property'
        ? `meta[property="${key}"]`
        : `meta[name="${key}"]`
      let el = document.querySelector(selector)
      if (!el) {
        el = document.createElement('meta')
        el.setAttribute(attr, key)
        document.head.appendChild(el)
      }
      el.content = content
    }

    const upsertLink = (rel, href) => {
      let el = document.querySelector(`link[rel="${rel}"]`)
      if (!el) {
        el = document.createElement('link')
        el.rel = rel
        document.head.appendChild(el)
      }
      el.href = href
    }

    const url = canonical || window.location.href

    // Description
    upsertMeta('name', 'description',
      description || 'Full-stack developer portfolio showcasing projects in web development, design, and creative technology.')

    // Open Graph
    upsertMeta('property', 'og:title', title || 'Eduard Rotaru')
    upsertMeta('property', 'og:description', description || 'Full-stack developer portfolio')
    upsertMeta('property', 'og:image', ogImage)
    upsertMeta('property', 'og:image:width', '1200')
    upsertMeta('property', 'og:image:height', '630')
    upsertMeta('property', 'og:url', url)
    upsertMeta('property', 'og:type', 'website')
    upsertMeta('property', 'og:locale', 'en_US')
    upsertMeta('property', 'og:site_name', 'Eduard Rotaru')

    // Twitter Card
    upsertMeta('name', 'twitter:card', 'summary_large_image')
    upsertMeta('name', 'twitter:title', title || 'Eduard Rotaru')
    upsertMeta('name', 'twitter:description', description || 'Full-stack developer portfolio')
    upsertMeta('name', 'twitter:image', ogImage)

    // Canonical
    upsertLink('canonical', url)
  }, [title, description, ogImage, canonical])
}
