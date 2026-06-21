import {
  Stack,
  Heading,
  Text,
  Button,
  Container,
  Link,
  Box,
  Icon,
  useBreakpointValue,
} from '@chakra-ui/react'
import { useColorMode } from 'components/ui/color-mode'
import { motion } from 'framer-motion'
import styles from './styles.module.css'
import {
  fadeInUp,
  letterSpace,
  simpleOpacity,
  stagger,
  scaleUp,
} from 'config/animations'
import { SocialMedias } from 'config/sidebar'

const MotionHeading = motion.create(Heading)
const MotionText = motion.create(Text)
const MotionStack = motion.create(Stack)
// `as="a"` renders an anchor at runtime; Chakra 3 types don't infer the
// polymorphic anchor props (href/target) through motion.create(), so this is cast.
 
const MotionButton: any = motion.create(Button)
const MotionBox = motion.create(Box)

const Sidebar = () => {
  const { colorMode } = useColorMode()
  const display = useBreakpointValue({ base: 'none', lg: 'block' })
  const titleSize = useBreakpointValue({ base: '4xl', md: '5xl' } as const)

  return (
    <MotionBox
      initial="initial"
      animate="animate"
      position={{ xl: 'fixed' }}
      maxWidth={{ xl: '34%' }}
      top={{ lg: 0 }}
    >
      <motion.div
        id="sidebarCircle"
        className={`${styles.sidebar} ${
          colorMode === 'light' ? styles.dark : ''
        }`}
        variants={scaleUp}
        style={{ display: display }}
        animate={colorMode === 'dark' ? 'animate' : 'lightMode'}
      ></motion.div>
      <Container
        padding={0}
        margin={0}
        height={{ xl: '100vh' }}
        display={{ xl: 'flex' }}
        alignItems={{ xl: 'center' }}
      >
        <MotionStack
          variants={stagger}
          gap={3}
          w="100%"
          textAlign={{ base: 'center', xl: 'left' }}
          alignItems={{ base: 'center', xl: 'flex-start' }}
        >
          <MotionText
            variants={fadeInUp}
            color="kl.accent"
            fontWeight="light"
          >
            Hey there! I am
          </MotionText>
          <MotionHeading
            as="h1"
            size="xl"
            paddingRight={{ lg: '20' }}
            textTransform="uppercase"
            variants={fadeInUp}
          >
            Shlomi Nugarker
          </MotionHeading>
          <MotionHeading
            as="h2"
            size={titleSize}
            lineHeight={1}
            color="kl.emphasis"
            className={styles.marginTopForce}
            textTransform="uppercase"
            variants={letterSpace}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            Full-Stack
            <br />
            Developer.
          </MotionHeading>
          <MotionText
            colorScheme="gray"
            fontSize="smaller"
            className={styles.marginTopForce}
            variants={fadeInUp}
          >
            Based in Tel Aviv, Israel . . .
          </MotionText>

          <MotionText
            color="kl.description"
            fontSize="small"
            paddingRight={{ lg: '12' }}
            variants={fadeInUp}
            maxWidth={{ base: '100%', lg: '80%' }}
          >
            Thanks for stopping by!
            <Text color="kl.emphasis" as="span">
              {' '}
              Welcome.
            </Text>
            <br />I build websites and small-to-mid web applications end-to-end
            — from the database and API to the interface users actually touch.
          </MotionText>
          <MotionButton
            size="lg"
            variant="outline"
            borderWidth="1px"
            borderRadius="0"
            fontWeight="normal"
            fontSize="sm"
            width="120px"
            variants={simpleOpacity}
            as={'a'}
            href="mailto:shlomin.dev@gmail.com"
            target="_blank"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            Get in touch!
          </MotionButton>

          <MotionBox
            display="flex"
            justifyContent={{ base: 'center', xl: 'flex-start' }}
            variants={simpleOpacity}
          >
            {SocialMedias.map((socMedia) => {
              const isExternal = socMedia.href.startsWith('http')
              return (
                <Link
                  color="kl.description"
                  key={socMedia.label}
                  aria-label={socMedia.label}
                  rel={isExternal ? 'noreferrer' : undefined}
                  width={8}
                  href={socMedia.href}
                  target={isExternal ? '_blank' : undefined}
                  _focus={{ boxShadow: 'none' }}
                >
                  <Icon w={6} h={6} as={socMedia.icon} color="currentColor" />
                </Link>
              )
            })}
          </MotionBox>
        </MotionStack>
      </Container>
    </MotionBox>
  )
}

export default Sidebar
