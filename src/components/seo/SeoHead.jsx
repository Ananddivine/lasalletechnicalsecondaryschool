import { useEffect } from 'react'

function upsertMeta({ name, property, content }) {
  if (typeof document === 'undefined') {
    return
  }

  const selector = name ? `meta[name="${name}"]` : `meta[property="${property}"]`
  let element = document.head.querySelector(selector)

  if (!element) {
    element = document.createElement('meta')

    if (name) {
      element.setAttribute('name', name)
    }

    if (property) {
      element.setAttribute('property', property)
    }

    document.head.appendChild(element)
  }

  element.setAttribute('content', content)
}

function upsertLink(rel, href) {
  if (typeof document === 'undefined') {
    return
  }

  let element = document.head.querySelector(`link[rel="${rel}"]`)

  if (!element) {
    element = document.createElement('link')
    element.setAttribute('rel', rel)
    document.head.appendChild(element)
  }

  element.setAttribute('href', href)
}

export default function SeoHead({
  title,
  description,
  keywords,
  canonicalPath = '/',
  imagePath = '/logo.jpeg',
  robots = 'index,follow',
  type = 'website',
  structuredData = null,
}) {
  useEffect(() => {
    if (typeof document === 'undefined' || typeof window === 'undefined') {
      return
    }

    const origin = window.location.origin
    const canonicalUrl = new URL(canonicalPath, origin).toString()
    const imageUrl = new URL(imagePath, origin).toString()

    document.title = title

    upsertMeta({ name: 'description', content: description })
    upsertMeta({ name: 'keywords', content: keywords })
    upsertMeta({ name: 'robots', content: robots })
    upsertMeta({ property: 'og:title', content: title })
    upsertMeta({ property: 'og:description', content: description })
    upsertMeta({ property: 'og:type', content: type })
    upsertMeta({ property: 'og:url', content: canonicalUrl })
    upsertMeta({ property: 'og:image', content: imageUrl })
    upsertMeta({ property: 'og:site_name', content: 'La Salle Technical Secondary School' })
    upsertMeta({ name: 'twitter:card', content: 'summary_large_image' })
    upsertMeta({ name: 'twitter:title', content: title })
    upsertMeta({ name: 'twitter:description', content: description })
    upsertMeta({ name: 'twitter:image', content: imageUrl })
    upsertLink('canonical', canonicalUrl)

    const existingStructuredData = document.head.querySelector('#app-seo-structured-data')

    if (structuredData) {
      const script = existingStructuredData ?? document.createElement('script')
      script.id = 'app-seo-structured-data'
      script.setAttribute('type', 'application/ld+json')
      script.textContent = JSON.stringify(structuredData)

      if (!existingStructuredData) {
        document.head.appendChild(script)
      }
    } else if (existingStructuredData) {
      existingStructuredData.remove()
    }
  }, [canonicalPath, description, imagePath, keywords, robots, structuredData, title, type])

  return null
}