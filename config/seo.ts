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
    title: 'Hire a Full-Stack Developer in Tel Aviv — Shlomi Nugarker',
    description:
      'Freelance full-stack developer in Tel Aviv. I build and ship complete web apps end-to-end — React, Next.js & Node.js — one person owning the database, API and interface. Available for new projects.',
    keywords:
      'hire full-stack developer, freelance web developer Tel Aviv, React developer for hire, Next.js developer, Node.js developer, build a web app, freelance developer Israel',
    siteName: 'Shlomi Nugarker — Freelance Full-Stack Developer',
    ogImageAlt: 'Shlomi Nugarker — freelance full-stack developer in Tel Aviv',
  },
  he: {
    title: 'מפתח פולסטאק לפרויקטים — שלומי נוגרקר, תל אביב',
    description:
      'מפתח פולסטאק פרילנס מתל אביב. בונה ומשיק אפליקציות ואתרים שלמים מקצה לקצה — React, Next.js ו-Node.js. בן אדם אחד אחראי על השרת, ה-API והממשק. זמין לפרויקטים חדשים.',
    keywords:
      'מפתח פולסטאק, מפתח לפרויקט, פיתוח אפליקציות, בניית אפליקציה, מפתח React, מפתח פרילנס, פיתוח אתרים, מפתח תל אביב',
    siteName: 'שלומי נוגרקר — מפתח פולסטאק פרילנס',
    ogImageAlt: 'שלומי נוגרקר — מפתח פולסטאק פרילנס מתל אביב',
  },
  ar: {
    title: 'مطور Full-Stack للمشاريع — شلومي نوجاركر',
    description:
      'مطور Full-Stack مستقل. أبني وأطلق تطبيقات ومواقع ويب كاملة من البداية إلى النهاية — React وNext.js وNode.js. شخص واحد مسؤول عن الخادم وواجهة البرمجة والواجهة. متاح لمشاريع جديدة.',
    keywords:
      'مطور Full-Stack، مطور للمشاريع، تطوير تطبيقات، بناء تطبيق ويب، مطور React، مطور مستقل، تطوير مواقع',
    siteName: 'شلومي نوجاركر — مطور Full-Stack مستقل',
    ogImageAlt: 'شلومي نوجاركر — مطور Full-Stack مستقل',
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
