import { memo } from 'react'
import { Box } from '@chakra-ui/react'
import Link from 'next/link'
import styles from './styles.module.css'

// Inline SVG monogram (not next/image) so `currentColor` resolves against the
// surrounding text color — letting the logo follow the color mode: teal.700 on
// the light background, cyan.200 in dark. A static <img> can't do that.
const Logo = () => (
  <Link href="/" passHref aria-label="SN — Home">
    <Box
      className={styles.logo}
      boxSize={{ base: '30px', lg: '50px' }}
      flexShrink={0}
      color={{ base: 'teal.700', _dark: 'cyan.200' }}
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
    </Box>
  </Link>
)

export default memo(Logo)
