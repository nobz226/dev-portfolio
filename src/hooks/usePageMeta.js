import { useEffect } from 'react'

export function usePageMeta(title, description, ogImage = '/favicon.svg', canonical = '') {
  useEffect(() => {
    // Set page title
    document.title = title || 'Eduard Rotaru - Full-Stack Developer'

    // Set meta description
    let metaDescription = document.querySelector('meta[name="description"]')
    if (!metaDescription) {
      metaDescription = document.createElement('meta')
      metaDescription.name = 'description'
      document.head.appendChild(metaDescription)
    }
    metaDescription.content =
      description ||
      'Full-stack developer portfolio showcasing projects in web development, design, and creative technology.'

    // Set Open Graph tags
    const ogTags = [
      { property: 'og:title', content: title || 'Eduard Rotaru' },
      { property: 'og:description', content: description || 'Full-stack developer portfolio' },
      { property: 'og:image', content: ogImage },
      { property: 'og:type', content: 'website' },
      { property: 'twitter:card', content: 'summary_large_image' },
      { property: 'twitter:title', content: title || 'Eduard Rotaru' },
      { property: 'twitter:description', content: description || 'Full-stack developer portfolio' },
      { property: 'twitter:image', content: ogImage },
    ]

    ogTags.forEach(({ property, content }) => {
      let meta = document.querySelector(`meta[property="${property}"], meta[name="${property}"]`)
      if (!meta) {
        meta = document.createElement('meta')
        meta.setAttribute(property.startsWith('twitter') ? 'name' : 'property', property)
        document.head.appendChild(meta)
      }
      meta.content = content
    })

    // Set canonical URL
    let canonical_tag = document.querySelector("link[rel='canonical']")
    if (!canonical_tag) {
      canonical_tag = document.createElement('link')
      canonical_tag.rel = 'canonical'
      document.head.appendChild(canonical_tag)
    }
    canonical_tag.href = canonical || window.location.href

    return () => {
      // Cleanup can be added here if needed
    }
  }, [title, description, ogImage, canonical])
}

