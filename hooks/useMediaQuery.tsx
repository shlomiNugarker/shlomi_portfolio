import { useEffect, useState } from 'react'

// SSR-safe matchMedia hook. Returns `false` until mounted to keep the server
// and first client render identical (avoids hydration mismatch), then reflects
// the real match.
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    const mql = window.matchMedia(query)
    // Sync once on mount with the real match, then subscribe. This is the
    // standard external-store subscription pattern matchMedia requires.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMatches(mql.matches)
    const onChange = (e: MediaQueryListEvent) => setMatches(e.matches)
    mql.addEventListener('change', onChange)
    return () => mql.removeEventListener('change', onChange)
  }, [query])

  return matches
}

// "Mobile/tablet" = below the xl breakpoint (1280px / 80em), matching the
// former Chakra mobileBreakpointsMap ({ base, md, lg: true, xl: false }).
export function useIsMobile(): boolean {
  return useMediaQuery('(max-width: 79.99em)')
}
