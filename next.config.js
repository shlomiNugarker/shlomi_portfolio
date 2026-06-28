const { i18n } = require('./next-i18next.config')

const isDev = process.env.NODE_ENV !== 'production'

// Content Security Policy. Chakra UI + emotion inject inline <style> tags and
// next-themes/Google Analytics run small inline scripts, so 'unsafe-inline' is
// required for style-src and script-src. In dev, Next's HMR needs eval + ws.
const csp = [
  "default-src 'self'",
  "img-src 'self' https://res.cloudinary.com data: blob:",
  `script-src 'self' 'unsafe-inline' https://www.googletagmanager.com${
    isDev ? " 'unsafe-eval'" : ''
  }`,
  "style-src 'self' 'unsafe-inline'",
  "font-src 'self' data:",
  `connect-src 'self' https://www.google-analytics.com https://region1.google-analytics.com${
    isDev ? ' ws: wss:' : ''
  }`,
  "frame-src 'none'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "manifest-src 'self'",
].join('; ')

const securityHeaders = [
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=31536000; includeSubDomains; preload',
  },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  {
    key: 'Permissions-Policy',
    value:
      'camera=(), microphone=(), geolocation=(), payment=(), usb=(), bluetooth=()',
  },
  { key: 'Cross-Origin-Opener-Policy', value: 'same-origin' },
  { key: 'Cross-Origin-Resource-Policy', value: 'cross-origin' },
  { key: 'Content-Security-Policy', value: csp },
]

module.exports = {
  i18n,
  reactStrictMode: true,
  compress: true,
  // Drop the X-Powered-By: Next.js header.
  poweredByHeader: false,
  // Strip console.* (except errors/warnings) from production bundles.
  compiler: {
    removeConsole: isDev ? false : { exclude: ['error', 'warn'] },
  },
  // Disable the dev-only static route indicator. With ISR enabled it emits a
  // noisy (harmless) HMR warning in Next 16's Pages Router dev overlay.
  devIndicators: false,
  // Serve next/image output as modern formats when supported.
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 31536000,
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
    remotePatterns: [
      { protocol: 'https', hostname: 'res.cloudinary.com', pathname: '/**' },
    ],
    // The logo + works placeholders are local, trusted SVGs.
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  // Tree-shake the barrel imports of these heavy packages so only the used
  // modules ship, cutting the initial JS bundle and main-thread bootup time.
  experimental: {
    optimizePackageImports: [
      '@chakra-ui/react',
      'react-icons',
    ],
  },
  async headers() {
    return [
      {
        // Apply security headers to every route.
        source: '/:path*',
        headers: securityHeaders,
      },
    ]
  },
}
