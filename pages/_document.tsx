import Document, {
  Html,
  Head,
  Main,
  NextScript,
  type DocumentContext,
  type DocumentInitialProps,
} from 'next/document'
import { isRtl, DEFAULT_LOCALE, LOCALES, localeUrl } from 'config/seo'

type DocProps = DocumentInitialProps & { locale: string }

class MyDocument extends Document<DocProps> {
  static async getInitialProps(
    ctx: DocumentContext
  ): Promise<DocProps> {
    const initialProps = await Document.getInitialProps(ctx)
    // Next populates ctx.locale from the i18n routing layer.
    const locale = ctx.locale || ctx.defaultLocale || DEFAULT_LOCALE
    return { ...initialProps, locale }
  }

  render() {
    const { locale } = this.props
    // Poppins is self-hosted via next/font and wired up in _app.tsx, so the
    // render-blocking Google Fonts <link> tags are no longer needed.
    return (
      <Html lang={locale} dir={isRtl(locale) ? 'rtl' : 'ltr'}>
        <Head>
          {/* hreflang alternates live here, not in next/head: the Pages Router
              <Head> de-duplicates multiple <link rel="alternate"> tags and drops
              all but one locale. They're identical on every page (fixed URLs),
              so emitting them once from _document is correct and reliable. */}
          {LOCALES.map((l) => (
            <link
              key={l}
              rel="alternate"
              hrefLang={l}
              href={localeUrl(l)}
            />
          ))}
          <link
            rel="alternate"
            hrefLang="x-default"
            href={localeUrl(DEFAULT_LOCALE)}
          />
          {/* Progressive enhancement: framer-motion writes the entrance
              `opacity:0` into the SSR HTML. If JS never runs the content would
              stay invisible, so force everything visible when JS is disabled. */}
          <noscript>
            <style>{`[style*="opacity:0"],[style*="opacity: 0"]{opacity:1!important}`}</style>
          </noscript>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
