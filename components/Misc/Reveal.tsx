import { useEffect, useRef, type ReactNode } from 'react'

// One-time slide-up/fade reveal when the element scrolls into view.
// The hidden state is applied via JS *after* hydration, so content is never
// hidden from crawlers, no-JS visitors, or (via the matchMedia check)
// prefers-reduced-motion users. The .reveal styles live in globals.css.
const Reveal = ({
  children,
  className = '',
  delay = 0,
}: {
  children: ReactNode
  className?: string
  // Stagger offset in ms, for lists of sibling reveals.
  delay?: number
}) => {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (!('IntersectionObserver' in window)) return

    el.classList.add('reveal')
    if (delay) el.style.transitionDelay = `${delay}ms`

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('reveal-visible')
          io.disconnect()
        }
      },
      // Fire slightly before the element fully enters, so the motion is
      // already underway as it becomes visible.
      { threshold: 0.1, rootMargin: '0px 0px -10% 0px' }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [delay])

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}

export default Reveal
