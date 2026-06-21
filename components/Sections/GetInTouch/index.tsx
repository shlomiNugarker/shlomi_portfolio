import { memo } from 'react'
import { Heading, Text, Stack, Link, Icon, Box } from '@chakra-ui/react'
import { motion, Variants } from 'framer-motion'
import { useTranslation } from 'next-i18next/pages'
import { useInView } from 'hooks/useInView'
import { RiCopyrightLine, RiGithubFill } from 'react-icons/ri'
const rimuruVariant: Variants = {
  shake: {
    rotate: [0, 15, 0, -15, 0],
    transition: {
      delay: 1.2,
      duration: 0.5,
      repeat: 2,
      ease: 'easeInOut',
    },
  },
  jump: {
    y: [0, -35, 0],
    transition: {
      delay: 1.8,
      duration: 0.5,
      repeat: 3,
      ease: 'easeInOut',
    },
  },
}

// Inline links inside the body copy. The body Text sets a muted color, so a
// bare <Link> blends in and reads as plain text — give these an explicit accent
// color, weight and a persistent underline so it's obvious they're clickable.
const InlineLink = ({
  href,
  children,
}: {
  href: string
  children: React.ReactNode
}) => (
  <Link
    href={href}
    target="_blank"
    rel="noreferrer"
    color="kl.emphasis"
    fontWeight="semibold"
    textDecoration="underline"
    textUnderlineOffset="3px"
    _hover={{ textDecoration: 'none' }}
  >
    {children}
  </Link>
)

const GetInTouch = () => {
  const { t } = useTranslation('common')
  const [ref, inView] = useInView()
  return (
    <Stack
      width={{ base: '99%', xl: '75%' }}
      height="100%"
      gap={{ base: 6, xl: 8 }}
      textAlign={{ base: 'center', xl: 'start' }}
      as="footer"
    >
      <Heading
        size={{ base: '4xl', xl: '5xl' }}
        style={{
          fontVariantCaps: 'small-caps',
        }}
      >
        {t('contact.heading')}{' '}
        <Text as="span" fontSize="2xl" color="kl.emphasis">
          <motion.div
            style={{ display: 'inline-block' }}
            variants={rimuruVariant}
            ref={ref}
            animate={inView ? ['shake', 'jump'] : false}
          >
            (⁀ᗢ⁀)
          </motion.div>
        </Text>
      </Heading>
      <Text
        color="kl.description"
        fontSize={{ base: 'sm', md: 'md', '2xl': 'lg' }}
        lineHeight="tall"
      >
        {t('contact.body')}{' '}
        <InlineLink href="https://www.linkedin.com/in/shlomi-nugarker-b89777155/">
          {t('contact.linkedin')}
        </InlineLink>{' '}
        {t('contact.or_email')}{' '}
        <InlineLink href="mailto:shlomin1231@gmail.com">
          {t('contact.email')}
        </InlineLink>
        .
      </Text>

      <Box
        textAlign="center"
        fontFamily="monospace"
        paddingTop={{ base: 10, lg: 20, xl: 20 }}
        paddingBottom={{ base: 5, lg: 18 }}
      >
        <Link
          color="kl.description"
          textDecoration="none"
          rel="noreferrer"
          href="https://github.com/shlomiNugarker"
          target="_blank"
          _focus={{ boxShadow: 'none' }}
        >
          <Text as="span">
            <Icon as={RiGithubFill} h={6} w={6} /> <br />
            {t('sidebar.name')} <Icon as={RiCopyrightLine} />{' '}
            {new Date().getFullYear()}
          </Text>
        </Link>
      </Box>
    </Stack>
  )
}

export default memo(GetInTouch)
