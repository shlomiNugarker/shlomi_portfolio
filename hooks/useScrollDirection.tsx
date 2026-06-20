import { useEffect, useState } from 'react'

export enum ScrollDirection {
  Initial,
  Down,
  Up,
}

const AVATAR_PADD_OFFSET = 100

const useScrollDirection = (
  isMobileOnly = false,
  isMobile = false,
  belowAvatar = true
) => {
  const [scrollDir, setScrollDir] = useState(ScrollDirection.Initial)
  const [isInitialized, setIsInitialized] = useState(false)

  useEffect(() => {
    const avatarContainer = document.querySelector('#klAvatar') as HTMLElement | null
    // Guard: under React 18 StrictMode the effect can run before #klAvatar is
    // mounted (or after it unmounts on the double-invoke), so fall back to 0.
    const avatarScrollY = avatarContainer
      ? avatarContainer.offsetTop +
        avatarContainer.clientHeight -
        AVATAR_PADD_OFFSET
      : 0
    const threshold = 10
    let lastScrollY = window.scrollY || 0

    let ticking = false
    const updateScrollDir = () => {
      const scrollY = window.scrollY || 0

      if (Math.abs(scrollY - lastScrollY) < threshold) {
        ticking = false
        return
      }
      const scrollingDown = scrollY > lastScrollY
      const isBelowAvatar =
        !isMobileOnly && belowAvatar ? scrollY > avatarScrollY : true

      // Whether the menu should be in its "Down" (collapsed) state: below the
      // avatar and either actively scrolling down or on desktop.
      const wantsDown = isBelowAvatar && (scrollingDown || !isMobile)
      const gateDirection = wantsDown
        ? ScrollDirection.Down
        : ScrollDirection.Up

      // Only commit when the gate flips; the committed value tracks the actual
      // scroll delta so a quick up-scroll still reveals the menu.
      if (gateDirection !== scrollDir) {
        setScrollDir(scrollingDown ? ScrollDirection.Down : ScrollDirection.Up)
      }
      lastScrollY = scrollY > 0 ? scrollY : 0
      ticking = false
    }

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScrollDir)
        ticking = true
      }
    }

    if ((isMobileOnly && isMobile) || !isMobileOnly) {
      window?.addEventListener('scroll', onScroll)
    }

    // Fallback for initial load — a one-shot guarded by isInitialized, so it
    // does not cause the cascading re-renders the rule warns about.
    if (!isMobile && !isInitialized && lastScrollY > avatarScrollY) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setScrollDir(ScrollDirection.Down)
      setIsInitialized(true)
    }

    return () => {
      window?.removeEventListener('scroll', onScroll)
    }
  }, [scrollDir, isMobileOnly, isMobile, isInitialized, belowAvatar])
  return scrollDir
}

export default useScrollDirection
