import { createSystem, defaultConfig, defineConfig } from '@chakra-ui/react'

// Color-mode constants and the mobile breakpoint map, consumed across the app.
export const ThemeMode = {
  Light: 'light',
  Dark: 'dark',
} as const

export const mobileBreakpointsMap = {
  base: true,
  md: true,
  lg: true,
  xl: false,
}

// Chakra UI v3 theme. In v3 the runtime `mode()` helper is gone; color-mode
// aware values are expressed as semantic tokens with _light / _dark conditions.
// The token names below reproduce the v2 theme variants 1:1 (emphasis,
// description, accent, accentAlternative) so the rest of the app is unchanged.
const config = defineConfig({
  theme: {
    tokens: {
      fonts: {
        heading: { value: 'Poppins' },
        body: { value: 'Poppins' },
      },
      colors: {
        // Custom near-black used as the dark background (was `colors.black`).
        kl: {
          black: { value: '#121212' },
        },
        // Chakra v3 replaced its gray scale with a neutral one. The original
        // design (light bg, nav bar, descriptions, borders) was built against
        // v2's cooler grays, so pin the full v2 gray scale to preserve the exact
        // original appearance in both color modes.
        gray: {
          50: { value: '#F7FAFC' },
          100: { value: '#EDF2F7' },
          200: { value: '#E2E8F0' },
          300: { value: '#CBD5E0' },
          400: { value: '#A0AEC0' },
          500: { value: '#718096' },
          600: { value: '#4A5568' },
          700: { value: '#2D3748' },
          800: { value: '#1A202C' },
          900: { value: '#171923' },
        },
      },
    },
    semanticTokens: {
      colors: {
        // Page background and base text color (was the `styles.global` body rule).
        'kl.bg': {
          value: { _light: '{colors.gray.100}', _dark: '#121212' },
        },
        'kl.fg': {
          value: { _light: '{colors.gray.800}', _dark: '{colors.whiteAlpha.900}' },
        },
        // Text/Heading/Link variants from the v2 theme.
        'kl.emphasis': {
          value: { _light: '{colors.teal.500}', _dark: '{colors.cyan.200}' },
        },
        'kl.description': {
          value: { _light: '{colors.gray.800}', _dark: '{colors.gray.400}' },
        },
        'kl.accent': {
          value: { _light: '#000000', _dark: '{colors.cyan.200}' },
        },
        'kl.accentAlternative': {
          value: { _light: '#595959', _dark: '#A6A6A6' },
        },
      },
    },
    recipes: {
      // The original theme gave Link an emphasis-colored baseStyle
      // (teal.500 / cyan.200). Reproduce that so inline links keep their accent.
      link: {
        base: {
          color: 'kl.emphasis',
        },
      },
    },
  },
  globalCss: {
    body: {
      color: 'kl.fg',
      bg: 'kl.bg',
    },
  },
})

const system = createSystem(defaultConfig, config)

export default system
