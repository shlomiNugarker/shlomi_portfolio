import { useEffect, useState } from 'react'

export enum ScrollDirection {
  Initial,
  Down,
  Up,
}

const AVATAR_PADD_OFFSET = 100
const THRESHOLD = 10

// Tracks whether the user is scrolling up or down, used to hide/collapse the
// menu chrome. `isMobileOnly` skips the "below the avatar" gate so the mobile
// bar hides on any downward scroll; otherwise the Down state only kicks in once
// the user has scrolled past the avatar hero.
const useScrollDirection = (isMobileOnly = false) => {
  const [scrollDir, setScrollDir] = useState(ScrollDirection.Initial)

  useEffect(() => {
    const avatarContainer = document.querySelector(
      '#klAvatar'
    ) as HTMLElement | null
    // Under StrictMode the effect can run before #klAvatar mounts, so fall back
    // to 0 (gate open) rather than crashing.
    const avatarScrollY = avatarContainer
      ? avatarContainer.offsetTop +
        avatarContainer.clientHeight -
        AVATAR_PADD_OFFSET
      : 0

    let lastScrollY = window.scrollY || 0
    let ticking = false

    const updateScrollDir = () => {
      const scrollY = window.scrollY || 0

      if (Math.abs(scrollY - lastScrollY) >= THRESHOLD) {
        const scrollingDown = scrollY > lastScrollY
        // On mobile the bar hides on any downward scroll; on desktop the Down
        // state only applies once we're past the avatar hero.
        const belowAvatar = isMobileOnly ? true : scrollY > avatarScrollY
        const next =
          scrollingDown && belowAvatar
            ? ScrollDirection.Down
            : ScrollDirection.Up

        // Functional update avoids reading committed state during the handler,
        // so the listener can stay subscribed for the effect's whole lifetime.
        setScrollDir((prev) => (prev === next ? prev : next))
        lastScrollY = scrollY > 0 ? scrollY : 0
      }
      ticking = false
    }

    const onScroll = () => {
      if (!ticking) {
        ticking = true
        window.requestAnimationFrame(updateScrollDir)
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    // Run once so a deep-linked / refreshed-mid-page load reflects the real
    // scroll position instead of staying Initial.
    updateScrollDir()

    return () => window.removeEventListener('scroll', onScroll)
  }, [isMobileOnly])

  return scrollDir
}

export default useScrollDirection
