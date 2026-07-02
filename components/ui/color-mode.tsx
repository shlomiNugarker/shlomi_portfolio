'use client'

// Color-mode utilities backed by next-themes. Thin wrappers exposing a simple
// useColorMode / useColorModeValue API (a holdover from the Chakra era that the
// rest of the app still consumes).
import { ThemeProvider, useTheme } from 'next-themes'
import type { ThemeProviderProps } from 'next-themes'
import { useIsMounted } from 'hooks/useIsMounted'

export type ColorMode = 'light' | 'dark'

export function ColorModeProvider(props: ThemeProviderProps) {
  return (
    <ThemeProvider attribute="class" disableTransitionOnChange {...props} />
  )
}

export function useColorMode() {
  const { resolvedTheme, setTheme } = useTheme()
  // next-themes resolves the theme only on the client, so fall back to the
  // SSR default until mounted to avoid a hydration mismatch.
  const mounted = useIsMounted()

  const colorMode = (mounted ? resolvedTheme : 'dark') as ColorMode
  const toggleColorMode = () => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')
  }
  return {
    colorMode,
    setColorMode: setTheme,
    toggleColorMode,
  }
}

export function useColorModeValue<T>(light: T, dark: T): T {
  const { colorMode } = useColorMode()
  return colorMode === 'dark' ? dark : light
}
