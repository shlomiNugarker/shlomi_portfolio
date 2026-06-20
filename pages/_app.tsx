import '../styles/globals.css'
import type { JSX } from 'react'
import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import { AnimatePresence } from 'framer-motion'
import system from 'config/theme'
import { ColorModeProvider } from 'components/ui/color-mode'
import FavIconProvider from 'components/Misc/FavIconProvider'

function KLSite({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <AnimatePresence mode="wait">
      <ChakraProvider value={system}>
        <ColorModeProvider defaultTheme="dark" enableSystem={false}>
          <FavIconProvider>
            <Component {...pageProps} />
          </FavIconProvider>
        </ColorModeProvider>
      </ChakraProvider>
    </AnimatePresence>
  )
}
export default KLSite
