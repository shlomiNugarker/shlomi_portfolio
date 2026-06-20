'use client'

// Color-mode utilities for Chakra UI v3, backed by next-themes.
// Chakra v3 removed its built-in color mode, so these thin wrappers preserve the
// v2 API (useColorMode / useColorModeValue) that the rest of the app relies on.
import { ThemeProvider, useTheme } from 'next-themes'
import type { ThemeProviderProps } from 'next-themes'
import { useEffect, useState } from 'react'

export type ColorMode = 'light' | 'dark'

export function ColorModeProvider(props: ThemeProviderProps) {
  return (
    <ThemeProvider attribute="class" disableTransitionOnChange {...props} />
  )
}

export function useColorMode() {
  const { resolvedTheme, setTheme } = useTheme()
  // Avoid hydration mismatch: next-themes resolves the theme only on the client.
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

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
