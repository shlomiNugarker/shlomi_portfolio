import type { ReactNode } from 'react'
import Head from 'next/head'

// The SN monogram SVG works as the favicon in both color modes, so no
// color-mode switch is needed here.
const FavIconProvider = ({ children }: { children: ReactNode }) => (
  <>
    <Head>
      <meta charSet="utf-8" />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, shrink-to-fit=no"
      />

      {/* Icons */}
      <link rel="icon" type="image/svg+xml" href="/logo.svg" />
      <link rel="alternate icon" type="image/png" href="/favicon-48.png" />
      <link rel="apple-touch-icon" href="/apple-touch-icon-180.png" />
      <link rel="manifest" href="/manifest.json" />

      {/* Theming — kept in sync with the --kl-bg tokens (light #edf2f7 /
          dark #121212). Meta tags can't reference CSS vars, so the hex is
          mirrored here intentionally. */}
      <meta
        name="theme-color"
        media="(prefers-color-scheme: light)"
        content="#edf2f7"
      />
      <meta
        name="theme-color"
        media="(prefers-color-scheme: dark)"
        content="#121212"
      />
      <meta name="msapplication-TileColor" content="#121212" />
    </Head>
    {children}
  </>
)

export default FavIconProvider
