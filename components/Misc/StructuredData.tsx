import Head from 'next/head'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next/pages'
import { SITE_URL, PERSON, META, DEFAULT_LOCALE, localeUrl, type Locale } from 'config/seo'
import { FeaturedWorksList } from 'config/works'

// Emits the five schema.org graphs from the SEO handoff (§6) as JSON-LD.
// The ItemList is derived from FeaturedWorksList so it stays in sync with the
// real projects rendered on the page.

const KNOWS_ABOUT = [
  'React',
  'Next.js',
  'TypeScript',
  'Node.js',
  'Express',
  'PostgreSQL',
  'MongoDB',
  'Tailwind CSS',
  'REST APIs',
  'Accessibility',
  'SEO',
]

const sameAs = [PERSON.github, PERSON.linkedin]

const StructuredData = () => {
  const router = useRouter()
  const { t } = useTranslation('common')
  const locale = (router.locale as Locale) || DEFAULT_LOCALE
  const meta = META[locale] ?? META[DEFAULT_LOCALE]
  const pageUrl = localeUrl(locale)

  const person = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: PERSON.name,
    alternateName: PERSON.firstName,
    url: SITE_URL,
    sameAs,
    jobTitle: PERSON.jobTitle,
    description: meta.description,
    knowsAbout: KNOWS_ABOUT,
    email: PERSON.email,
    telephone: PERSON.telephone,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Tel Aviv',
      addressCountry: 'IL',
    },
  }

  const professionalService = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'Shlomi Nugarker — Freelance Web Development',
    url: SITE_URL,
    description:
      'Freelance web development services in React, Next.js, and Node.js.',
    provider: {
      '@type': 'Person',
      name: PERSON.name,
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Tel Aviv',
        addressCountry: 'IL',
      },
    },
    telephone: PERSON.telephone,
    email: PERSON.email,
    areaServed: ['Tel Aviv', 'Israel', 'Worldwide'],
    serviceType: [
      'Full Stack Development',
      'React Development',
      'Next.js Development',
      'Node.js Development',
    ],
  }

  const webSite = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Shlomi Nugarker Portfolio',
    url: SITE_URL,
    description: meta.description,
    author: { '@type': 'Person', name: PERSON.name },
    inLanguage: ['en', 'he', 'ar'],
  }

  const organization = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: PERSON.name,
    url: SITE_URL,
    sameAs,
    contactPoint: {
      '@type': 'ContactPoint',
      email: PERSON.email,
      telephone: PERSON.telephone,
      contactType: 'customer service',
    },
  }

  const itemList = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Portfolio Projects',
    numberOfItems: FeaturedWorksList.length,
    itemListElement: FeaturedWorksList.map((work, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'CreativeWork',
        '@id': `${pageUrl}/#project-${i + 1}`,
        name: t(`works.items.${work.key}.title`),
        description: t(`works.items.${work.key}.description`),
        image: work.images.map((img) => `${SITE_URL}${img}`),
        url: work.ctaUrl,
        author: { '@type': 'Person', name: PERSON.name, url: SITE_URL },
        ...(work.tags ? { keywords: work.tags.join(', ') } : {}),
        inLanguage: locale,
      },
    })),
  }

  const graphs = [
    person,
    professionalService,
    webSite,
    organization,
    itemList,
  ]

  return (
    <Head>
      {graphs.map((graph, i) => (
        <script
          key={i}
          type="application/ld+json"
          // JSON.stringify output is safe to inline; no user input involved.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
        />
      ))}
    </Head>
  )
}

export default StructuredData
