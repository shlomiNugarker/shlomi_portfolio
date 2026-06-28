import '../styles/globals.css'
import type { JSX } from 'react'
import { useEffect } from 'react'
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import { appWithTranslation } from 'next-i18next/pages'
import nextI18NextConfig from '../next-i18next.config'
import { poppins } from 'config/fonts'
import { isRtl } from 'config/seo'
import { ColorModeProvider } from 'components/ui/color-mode'
import FavIconProvider from 'components/Misc/FavIconProvider'
import Analytics from 'components/Misc/Analytics'

function KLSite({ Component, pageProps }: AppProps): JSX.Element {
  const { locale } = useRouter()

  // Keep the document direction in sync with the active locale on client-side
  // locale changes (SSR sets it in _document; this covers the language switch).
  useEffect(() => {
    document.documentElement.dir = isRtl(locale) ? 'rtl' : 'ltr'
    if (locale) document.documentElement.lang = locale
  }, [locale])

  // Expose the Poppins CSS variable to the whole tree (Tailwind's --font-sans
  // references it). next-themes drives the .dark class for the dark: variant.
  useEffect(() => {
    document.documentElement.classList.add(poppins.variable)
  }, [])

  return (
    <ColorModeProvider defaultTheme="dark" enableSystem={false}>
      <FavIconProvider>
        <div className={poppins.variable}>
          <Component {...pageProps} />
        </div>
        <Analytics />
      </FavIconProvider>
    </ColorModeProvider>
  )
}

export default appWithTranslation(KLSite, nextI18NextConfig)
