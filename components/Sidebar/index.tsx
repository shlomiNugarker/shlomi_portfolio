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
import { useTranslation } from 'next-i18next/pages'
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
  const { t } = useTranslation('common')
  const { colorMode } = useColorMode()
  const display = useBreakpointValue({ base: 'none', lg: 'block' })
  const titleSize = useBreakpointValue({
    base: '4xl',
    md: '4xl',
    xl: '5xl',
  } as const)

  return (
    <MotionBox
      initial="initial"
      animate="animate"
      width="100%"
      position={{ xl: 'fixed' }}
      maxWidth={{ xl: '34%' }}
      top={{ xl: 0 }}
    >
      {/* The arc is mirrored for RTL via the wrapper (.circleWrap), because
          framer-motion writes transform:scale on the arc node itself. */}
      <div className={styles.circleWrap}>
        <motion.div
          id="sidebarCircle"
          className={`${styles.sidebar} ${
            colorMode === 'light' ? styles.dark : ''
          }`}
          variants={scaleUp}
          style={{ display: display }}
          animate={colorMode === 'dark' ? 'animate' : 'lightMode'}
        ></motion.div>
      </div>
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
          textAlign={{ base: 'center', xl: 'start' }}
          alignItems={{ base: 'center', xl: 'flex-start' }}
        >
          <MotionText
            variants={fadeInUp}
            color="kl.accent"
            fontWeight="light"
            fontSize={{ base: 'md', md: 'lg' }}
          >
            {t('sidebar.greeting')}
          </MotionText>
          <MotionHeading
            as="h1"
            size="xl"
            paddingEnd={{ xl: '20' }}
            textTransform="uppercase"
            variants={fadeInUp}
          >
            {t('sidebar.name')}
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
            {t('sidebar.headline_line1')}
            <br />
            {t('sidebar.headline_line2')}
          </MotionHeading>
          <MotionText
            colorScheme="gray"
            fontSize={{ base: 'sm', md: 'md' }}
            className={styles.marginTopForce}
            variants={fadeInUp}
          >
            {t('sidebar.location')}
          </MotionText>

          <MotionText
            color="kl.description"
            fontSize={{ base: 'sm', md: 'md' }}
            lineHeight="tall"
            paddingEnd={{ xl: '12' }}
            variants={fadeInUp}
            maxWidth={{ base: '100%', xl: '80%' }}
          >
            {t('sidebar.intro')}
            <Text color="kl.emphasis" as="span">
              {' '}
              {t('sidebar.welcome')}
            </Text>
            <br />
            {t('sidebar.description')}
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
            href="mailto:shlomin1231@gmail.com"
            target="_blank"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {t('sidebar.cta')}
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
                  aria-label={t(`social.${socMedia.label.toLowerCase()}`)}
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
