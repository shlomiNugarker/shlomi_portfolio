import { useRouter } from 'next/router'
import { RiMouseLine } from 'react-icons/ri'
import useScrollDirection, { ScrollDirection } from 'hooks/useScrollDirection'
import { isRtl, PERSON } from 'config/seo'

const ScrollMore = () => {
  const { locale } = useRouter()
  const rtl = isRtl(locale)
  const scrollDirection = useScrollDirection(false)

  return (
    // Pure-CSS responsive hide: the vertical email only shows on xl+.
    <div className="fixed bottom-4 z-10 hidden xl:block" style={{ insetInlineEnd: '3%' }}>
      {[ScrollDirection.Initial, ScrollDirection.Up].includes(
        scrollDirection
      ) && (
        <div>
          <RiMouseLine aria-hidden className="h-6 w-6 opacity-75" />
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
          }}
        >
          <a
            href={`mailto:${PERSON.email}`}
            className="relative flex items-center justify-center py-3 font-mono tracking-[3px] text-kl-description transition-colors hover:text-kl-emphasis after:mx-auto after:mt-2.5 after:h-[8em] after:w-0.5 after:shrink-0 after:bg-kl-emphasis after:opacity-50 after:content-[''] hover:after:opacity-100"
          >
            {PERSON.email}{' '}
          </a>
        </div>
      )}
    </div>
  )
}

export default ScrollMore
