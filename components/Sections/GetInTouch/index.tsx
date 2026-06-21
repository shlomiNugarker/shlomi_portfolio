import { memo } from 'react'
import { Heading, Text, Stack, Link, Icon, Box } from '@chakra-ui/react'
import { motion, Variants } from 'framer-motion'
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
  const [ref, inView] = useInView()
  return (
    <Stack
      width={{ base: '99%', xl: '75%' }}
      height="100%"
      gap={{ base: 6, xl: 8 }}
      textAlign={{ base: 'center', xl: 'left' }}
      as="footer"
    >
      <Heading
        size="5xl"
        style={{
          fontVariantCaps: 'small-caps',
        }}
      >
        Say hi!{' '}
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
      <Text color="kl.description">
        Have a project in mind, or just want to talk shop? I&apos;m always happy
        to hear about new ideas and collaborations. Feel free to reach out on{' '}
        <Link
          href="https://www.linkedin.com/in/shlomi-nugarker-b89777155/"
          target="_blank"
          rel="noreferrer"
        >
          LinkedIn
        </Link>{' '}
        or shoot me an{' '}
        <Link
          href="mailto:shlomin.dev@gmail.com"
          target="_blank"
          rel="noreferrer"
        >
          email
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
            Shlomi Nugarker <Icon as={RiCopyrightLine} /> 2026
          </Text>
        </Link>
      </Box>
    </Stack>
  )
}

export default memo(GetInTouch)
