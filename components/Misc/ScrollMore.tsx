import { useRouter } from 'next/router'
import { RiMouseLine } from 'react-icons/ri'
import useScrollDirection, { ScrollDirection } from 'hooks/useScrollDirection'
import { useIsMobile } from 'hooks/useMediaQuery'
import { isRtl } from 'config/seo'

const ScrollMore = () => {
  const { locale } = useRouter()
  const rtl = isRtl(locale)
  const isMobile = useIsMobile()
  const scrollDirection = useScrollDirection(false, isMobile)

  return (
    // Pure-CSS responsive hide: the vertical email only shows on xl+.
    <div className="fixed bottom-4 z-10 hidden xl:block" style={{ insetInlineEnd: '3%' }}>
      {[ScrollDirection.Initial, ScrollDirection.Up].includes(
        scrollDirection
      ) && (
        <div>
          <RiMouseLine className="h-6 w-6 opacity-75" />
        </div>
      )}
      {scrollDirection === ScrollDirection.Down && (
        <div
          style={{
            writingMode: 'vertical-rl',
            insetInlineEnd: '8%',
            // LTR: fixed to the viewport bottom. RTL: stay inside the parent
            // (which owns the fixed bottom/end anchor) so it mirrors correctly.
            ...(rtl ? {} : { position: 'fixed', bottom: '-8%' }),
            display: isMobile === false ? undefined : 'none',
          }}
        >
          <a
            href="mailto:shlomin1231@gmail.com"
            target="_blank"
            rel="noreferrer"
            className="relative flex items-center justify-center py-3 font-mono tracking-[3px] text-gray-700 transition-colors hover:text-kl-emphasis dark:text-gray-400 after:mx-auto after:mt-2.5 after:h-[8em] after:w-0.5 after:shrink-0 after:bg-kl-emphasis after:opacity-50 after:content-[''] hover:after:opacity-100"
          >
            shlomin1231@gmail.com{' '}
          </a>
        </div>
      )}
    </div>
  )
}

export default ScrollMore
