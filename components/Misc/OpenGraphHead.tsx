import Head from 'next/head'
import { useRouter } from 'next/router'
import {
  SITE_URL,
  PERSON,
  LOCALES,
  DEFAULT_LOCALE,
  META,
  localeUrl,
  type Locale,
} from 'config/seo'

const OG_IMAGE = `${SITE_URL}/og-image.png`

const ogLocale: Record<Locale, string> = {
  en: 'en_US',
  he: 'he_IL',
  ar: 'ar_AE',
}

const OpenGraphHead = () => {
  const router = useRouter()
  const locale = (router.locale as Locale) || DEFAULT_LOCALE
  const meta = META[locale] ?? META[DEFAULT_LOCALE]
  const canonical = localeUrl(locale)

  return (
    <Head>
      <title>{meta.title}</title>
      <meta name="description" content={meta.description} />
      <meta name="keywords" content={meta.keywords} />
      <meta name="author" content={PERSON.name} />
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href={canonical} />

      {/* hreflang alternates are emitted from _document.tsx — the Pages Router
          next/head de-duplicates repeated <link rel="alternate"> tags, so they
          must live in the document <Head> to all survive. */}

      {/* Open Graph */}
      <meta property="og:type" content="profile" />
      <meta property="og:site_name" content={meta.siteName} />
      <meta property="og:title" content={meta.title} />
      <meta property="og:description" content={meta.description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:locale" content={ogLocale[locale]} />
      {/* Advertise the other locales so crawlers know the page is multilingual. */}
      {LOCALES.filter((l) => l !== locale).map((l) => (
        <meta key={l} property="og:locale:alternate" content={ogLocale[l]} />
      ))}
      <meta property="og:image" content={OG_IMAGE} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={meta.ogImageAlt} />
      <meta property="profile:first_name" content={PERSON.firstName} />
      <meta property="profile:last_name" content={PERSON.lastName} />
      <meta property="profile:username" content={PERSON.username} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={meta.title} />
      <meta name="twitter:description" content={meta.description} />
      <meta name="twitter:image" content={OG_IMAGE} />
      <meta name="twitter:image:width" content="1200" />
      <meta name="twitter:image:height" content="630" />
      <meta name="twitter:image:alt" content={meta.ogImageAlt} />
      <meta name="twitter:creator" content={PERSON.twitter} />
      <meta name="twitter:site" content={PERSON.twitter} />
    </Head>
  )
}

export default OpenGraphHead
