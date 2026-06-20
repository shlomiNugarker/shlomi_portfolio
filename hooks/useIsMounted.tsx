import { useEffect, useState } from 'react'

// Returns false on the server and on the first client render, then true after
// mount. Used to defer client-only values (e.g. resolved color mode, portalled
// widgets) until after hydration to avoid SSR/client mismatches.
export const useIsMounted = (): boolean => {
  const [mounted, setMounted] = useState(false)
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setMounted(true), [])
  return mounted
}
