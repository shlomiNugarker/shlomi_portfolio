import Head from 'next/head'
import Link from 'next/link'
import { useTranslation } from 'next-i18next/pages'

type ErrorLayoutProps = {
  code: string
  // i18n keys (resolved against the `common` namespace).
  titleKey: string
  messageKey: string
  // Literal English fallbacks for pages that can't load translations
  // (e.g. 500.tsx, which Pages Router renders without data fetching). Used
  // whenever the key fails to resolve.
  fallbackTitle: string
  fallbackMessage: string
}

// Shared layout for the custom 404 / 500 pages. Matches the site theme.
const ErrorLayout = ({
  code,
  titleKey,
  messageKey,
  fallbackTitle,
  fallbackMessage,
}: ErrorLayoutProps) => {
  const { t } = useTranslation('common')
  // t() returns the key itself when no translation is loaded; fall back then.
  const resolved = (key: string, fallback: string) => {
    const value = t(key)
    return value === key ? fallback : value
  }
  const title = resolved(titleKey, fallbackTitle)
  const message = resolved(messageKey, fallbackMessage)
  const backHome = resolved('error.back_home', 'Back home')

  return (
    <>
      <Head>
        <title>{`${code} — ${title} | Shlomi Nugarker`}</title>
        <meta name="robots" content="noindex" />
      </Head>
      <main className="flex min-h-screen items-center justify-center px-6 text-center">
        <div className="flex max-w-lg flex-col items-center gap-6">
          <h1
            className="text-7xl font-bold leading-none text-kl-emphasis"
            style={{ fontVariantCaps: 'small-caps' }}
          >
            {code}
          </h1>
          <h2 className="text-xl font-bold">{title}</h2>
          <p className="text-sm text-kl-description md:text-base">{message}</p>
          <Link
            href="/"
            className="inline-flex h-12 items-center justify-center border border-current px-6 text-base font-light transition-colors hover:bg-black/5 dark:hover:bg-white/5"
          >
            {backHome}
          </Link>
        </div>
      </main>
    </>
  )
}

export default ErrorLayout
