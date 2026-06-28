import { Poppins } from 'next/font/google'

// Self-hosted Poppins via next/font — no render-blocking Google Fonts request
// and no layout shift. The `variable` exposes it as the CSS var --font-poppins,
// which Tailwind's --font-sans references (styles/globals.css @theme).
export const poppins = Poppins({
  weight: ['100', '300', '400', '500', '600'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-poppins',
})
