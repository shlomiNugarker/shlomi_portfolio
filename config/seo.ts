// Central SEO configuration. Per-locale meta copy lives here (and is mirrored
// in the i18n `common.json` files for in-page UI copy). Keeping it in one typed
// module lets OpenGraphHead, StructuredData and the sitemap stay in sync.

export const SITE_URL = 'https://www.shlomi.dev'

export const PERSON = {
  name: 'Shlomi Nugarker',
  firstName: 'Shlomi',
  lastName: 'Nugarker',
  username: 'shlomi_nugarker',
  jobTitle: 'Full-Stack Developer',
  email: 'shlomin1231@gmail.com',
  telephone: '+972 52-952-6762',
  github: 'https://github.com/shlomiNugarker',
  linkedin: 'https://www.linkedin.com/in/shlomi-nugarker/',
  twitter: '@shlomi_nugarker',
} as const

export const LOCALES = ['en', 'he', 'ar'] as const
export type Locale = (typeof LOCALES)[number]
export const DEFAULT_LOCALE: Locale = 'en'
export const RTL_LOCALES: readonly Locale[] = ['he', 'ar']

export const isRtl = (locale?: string): boolean =>
  RTL_LOCALES.includes((locale ?? DEFAULT_LOCALE) as Locale)

// Per-locale meta strings (handoff §3). Used as a fallback / SSR-safe source so
// the head is correct even before the i18n client bundle hydrates.
type Meta = {
  title: string
  description: string
  keywords: string
  siteName: string
  ogImageAlt: string
}

export const META: Record<Locale, Meta> = {
  en: {
    title: 'Shlomi Nugarker — Full-Stack Developer',
    description:
      'Full-Stack developer working with React, Next.js, and Node.js. Available for full-time roles or freelance work.',
    keywords:
      'Full-Stack Developer, React Developer, Next.js, Node.js, TypeScript, Israel, Freelance Developer',
    siteName: 'Shlomi Nugarker — Full-Stack Developer',
    ogImageAlt: 'Shlomi Nugarker',
  },
  he: {
    title: 'שלומי נוגרקר — מפתח Full-Stack',
    description:
      'מפתח Full-Stack שעובד עם React, Next.js ו-Node.js. זמין למשרה מלאה או לפרילנס.',
    keywords:
      'מפתח Full-Stack, מפתח React, Next.js, Node.js, TypeScript, פרילנסר, ישראל',
    siteName: 'שלומי נוגרקר — מפתח Full-Stack',
    ogImageAlt: 'שלומי נוגרקר',
  },
  ar: {
    title: 'شلومي نوجاركر — مطور Full-Stack',
    description:
      'مطور Full-Stack يعمل مع React وNext.js وNode.js. متاح لوظيفة بدوام كامل أو لعمل مستقل.',
    keywords:
      'مطور Full-Stack، مطور React، Next.js، Node.js، TypeScript، مطور مستقل، إسرائيل',
    siteName: 'شلومي نوجاركر — مطور Full-Stack',
    ogImageAlt: 'شلومي نوجاركر',
  },
}

// Canonical/alternate URL for a locale. Default locale is served unprefixed.
export const localeUrl = (locale: Locale, path = ''): string => {
  const prefix = locale === DEFAULT_LOCALE ? '' : `/${locale}`
  return `${SITE_URL}${prefix}${path}`
}

// wa.me link built from PERSON.telephone (digits only, no leading +). An
// optional prefilled message can be passed and is URL-encoded.
export const whatsappUrl = (message?: string): string => {
  const digits = PERSON.telephone.replace(/[^\d]/g, '')
  const query = message ? `?text=${encodeURIComponent(message)}` : ''
  return `https://wa.me/${digits}${query}`
}
