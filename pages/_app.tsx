import '../styles/globals.css'
import type { JSX } from 'react'
import { useEffect } from 'react'
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import { ChakraProvider } from '@chakra-ui/react'
import { appWithTranslation } from 'next-i18next/pages'
import nextI18NextConfig from '../next-i18next.config'
import system from 'config/theme'
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

  return (
    <ChakraProvider value={system}>
      <ColorModeProvider defaultTheme="dark" enableSystem={false}>
        <FavIconProvider>
          <Component {...pageProps} />
          <Analytics />
        </FavIconProvider>
      </ColorModeProvider>
    </ChakraProvider>
  )
}

export default appWithTranslation(KLSite, nextI18NextConfig)
