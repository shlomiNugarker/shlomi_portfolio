import { memo } from 'react'
import Link from 'next/link'
import styles from './styles.module.css'

// Inline SVG monogram using currentColor so the logo follows the color mode:
// teal.700 on the light background, cyan.200 in dark.
const Logo = () => (
  <Link href="/" passHref aria-label="SN — Home">
    <div
      className={`${styles.logo} size-[30px] shrink-0 text-kl-emphasis lg:size-[50px]`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 50 50"
        width="100%"
        height="100%"
        role="img"
        aria-label="Shlomi Nugarker logo"
        style={{ display: 'block', aspectRatio: '1 / 1' }}
      >
        <rect
          x="2"
          y="2"
          width="46"
          height="46"
          rx="12"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
        />
        <text
          x="50%"
          y="52%"
          dy="0.35em"
          textAnchor="middle"
          fontFamily="'Poppins', 'Segoe UI', sans-serif"
          fontSize="22"
          fontWeight="600"
          letterSpacing="-1"
          fill="currentColor"
        >
          SN
        </text>
      </svg>
    </div>
  </Link>
)

export default memo(Logo)
