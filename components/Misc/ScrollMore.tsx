import { Box, Icon, Link, useBreakpointValue } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useColorModeValue } from 'components/ui/color-mode'
import { RiMouseLine } from 'react-icons/ri'
import { motion, Variants, AnimatePresence } from 'framer-motion'
import useScrollDirection, { ScrollDirection } from 'hooks/useScrollDirection'
import { mobileBreakpointsMap } from 'config/theme'
import { isRtl } from 'config/seo'

const scrollMoreVariants: Variants = {
  initial: {
    opacity: 0,
    y: 50,
  },
  hidden: {
    opacity: [0, 1],
    transition: {
      duration: 0.5,
      delay: 1,
      ease: 'easeIn',
    },
  },
  bounce: {
    y: [0, -18, 0],
    transition: {
      duration: 1.6,
      ease: 'easeInOut',
      repeat: Infinity,
    },
  },
}

const emailVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 250,
  },
  show: {
    opacity: 1,
    y: 0,
  },
  exit: {
    opacity: [1, 0],
    y: [0, 250],
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
}

const ScrollMore = () => {
  const { locale } = useRouter()
  const rtl = isRtl(locale)
  const isMobile = useBreakpointValue(mobileBreakpointsMap)
  const scrollDirection = useScrollDirection(false, isMobile)
  const emailColor = useColorModeValue('gray.800', 'gray.400')
  const emailLine = useColorModeValue('teal.700', 'cyan.200')

  return (
    <Box
      position="fixed"
      bottom="1em"
      insetEnd="3%"
      // Pure-CSS responsive hide (no hydration flash): the vertical email only
      // shows on the wide xl layout, never on mobile/tablet widths.
      display={{ base: 'none', xl: 'block' }}
    >
      <AnimatePresence>
        {[ScrollDirection.Initial, ScrollDirection.Up].includes(
          scrollDirection
        ) && (
          <motion.div
            initial="initial"
            animate={['hidden', 'bounce']}
            variants={scrollMoreVariants}
          >
            <Icon
              w={6}
              h={6}
              as={RiMouseLine}
              color="currentColor"
              opacity="0.75"
            />
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {scrollDirection === ScrollDirection.Down && (
          <motion.div
            initial="hidden"
            animate="show"
            exit="exit"
            variants={emailVariants}
            whileHover={{ y: -50 }}
            style={{
              writingMode: 'vertical-rl',
              insetInlineEnd: '8%',
              // In LTR the node is fixed-positioned to the viewport bottom. In
              // RTL we drop `position: fixed`/`bottom` so it stays inside the
              // parent Box (which already owns the fixed bottom/end anchor) and
              // mirrors correctly instead of escaping it.
              ...(rtl
                ? {}
                : { position: 'fixed', bottom: '-8%' }),
              // The node can be position:fixed (LTR), so it escapes the parent
              // Box's responsive `display:none`; hide it here too on mobile.
              // Show only once we positively know we're on the wide layout.
              display: isMobile === false ? undefined : 'none',
            }}
          >
            <Link
              paddingY={3}
              fontFamily="monospace"
              href="mailto:shlomin1231@gmail.com"
              target="_blank"
              rel="noreferrer"
              color={emailColor}
              _hover={{
                color: emailLine,
                _after: {
                  backgroundColor: emailLine,
                  opacity: 1,
                },
              }}
              position="relative"
              letterSpacing={3}
              display="flex"
              alignItems="center"
              justifyContent="center"
              _after={{
                backgroundColor: emailLine,
                width: '2px',
                opacity: 0.5,
                content: '""',
                // Fixed-length accent line under the email. In vertical writing
                // mode the block axis is horizontal, so the visible length is
                // the `width`-mapped value — set both to keep it short and equal
                // in LTR and RTL (a responsive object on ::after didn't apply).
                height: '8em',
                flexGrow: 0,
                flexShrink: 0,
                margin: 'auto',
                marginTop: '10px',
              }}
            >
              shlomin1231@gmail.com{' '}
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </Box>
  )
}

export default ScrollMore
