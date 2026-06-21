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
        <Link
          href="https://www.linkedin.com/in/shlomi-nugarker-b89777155/"
          target="_blank"
          rel="noreferrer"
        >
          {t('contact.linkedin')}
        </Link>{' '}
        {t('contact.or_email')}{' '}
        <Link
          href="mailto:shlomin.dev@gmail.com"
          target="_blank"
          rel="noreferrer"
        >
          {t('contact.email')}
        </Link>
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
            {t('sidebar.name')} <Icon as={RiCopyrightLine} /> 2026
          </Text>
        </Link>
      </Box>
    </Stack>
  )
}

export default memo(GetInTouch)
