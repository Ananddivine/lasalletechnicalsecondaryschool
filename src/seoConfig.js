import { matchPath } from 'react-router-dom'

const siteName = 'La Salle Technical Secondary School'
const defaultKeywords = [
  'La Salle Technical Secondary School',
  'La Salle Hohola',
  'Port Moresby school',
  'technical secondary school PNG',
  'Catholic school Papua New Guinea',
  'TVET school Port Moresby',
  'student admissions PNG',
].join(', ')

function buildOrganizationSchema(pathname) {
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'EducationalOrganization',
      name: siteName,
      alternateName: 'La Salle Hohola',
      url: pathname,
      logo: '/logo.jpeg',
      image: '/logo.jpeg',
      email: 'info@lasalletech.edu',
      telephone: '+67571689267',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'G5WF+2FG, Oak St',
        addressLocality: 'Port Moresby',
        addressRegion: 'National Capital District',
        addressCountry: 'PG',
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: siteName,
      url: pathname,
    },
  ]
}

export function getSeoConfig(pathname) {
  const base = {
    imagePath: '/logo.jpeg',
    keywords: defaultKeywords,
    type: 'website',
    canonicalPath: pathname,
    structuredData: buildOrganizationSchema(pathname),
  }

  if (pathname.startsWith('/portal')) {
    return {
      ...base,
      title: `Admissions Portal | ${siteName}`,
      description: 'Secure admissions management portal for La Salle Technical Secondary School staff.',
      robots: 'noindex,nofollow',
      structuredData: null,
    }
  }

  if (pathname === '/') {
    return {
      ...base,
      title: `${siteName} | Technical Education In Port Moresby`,
      description: 'Explore La Salle Technical Secondary School in Port Moresby, Papua New Guinea. Learn about admissions, programs, campus life, history, and student opportunities.',
      robots: 'index,follow',
    }
  }

  if (pathname === '/about') {
    return {
      ...base,
      title: `About ${siteName} | History, Mission, And Campus`,
      description: 'Learn about the history, mission, leadership, and Lasallian values of La Salle Technical Secondary School in Port Moresby.',
      robots: 'index,follow',
    }
  }

  if (pathname === '/programs') {
    return {
      ...base,
      title: `Programs | ${siteName}`,
      description: 'Browse academic and technical programs offered by La Salle Technical Secondary School for secondary students and vocational learners.',
      robots: 'index,follow',
    }
  }

  if (matchPath('/programs/:slug', pathname)) {
    return {
      ...base,
      title: `Program Details | ${siteName}`,
      description: 'Read more about a specific program offered at La Salle Technical Secondary School, including learning focus and student pathways.',
      robots: 'index,follow',
    }
  }

  if (pathname === '/admissions') {
    return {
      ...base,
      title: `Admissions | ${siteName}`,
      description: 'Start your application to La Salle Technical Secondary School and review admission pathways, requirements, and entry options.',
      robots: 'index,follow',
    }
  }

  if (matchPath('/admissions/:slug', pathname)) {
    return {
      ...base,
      title: `Admission Form | ${siteName}`,
      description: 'Complete the relevant admission form for La Salle Technical Secondary School and submit the required student details and documents.',
      robots: 'index,follow',
    }
  }

  if (pathname === '/history') {
    return {
      ...base,
      title: `School History | ${siteName}`,
      description: 'Discover the history and development of La Salle Technical Secondary School from its early years to its present role in Port Moresby.',
      robots: 'index,follow',
    }
  }

  if (pathname === '/handbook') {
    return {
      ...base,
      title: `Student Handbook | ${siteName}`,
      description: 'Read the student handbook for school expectations, conduct, academic guidance, and Lasallian values at La Salle Technical Secondary School.',
      robots: 'index,follow',
    }
  }

  if (pathname === '/contact') {
    return {
      ...base,
      title: `Contact ${siteName} | Port Moresby`,
      description: 'Contact La Salle Technical Secondary School in Port Moresby, Papua New Guinea, and find the school address, phone number, and map location.',
      robots: 'index,follow',
    }
  }

  return {
    ...base,
    title: `${siteName} | Port Moresby, Papua New Guinea`,
    description: 'La Salle Technical Secondary School provides academic, technical, and values-based education for students in Port Moresby, Papua New Guinea.',
    robots: 'index,follow',
  }
}