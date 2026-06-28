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
import styles from './styles.module.css'
import { SocialMedias } from 'config/sidebar'

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
    <Box
      width="100%"
      position={{ xl: 'fixed' }}
      maxWidth={{ xl: '34%' }}
      top={{ xl: 0 }}
    >
      {/* The arc is mirrored for RTL via the wrapper (.circleWrap). */}
      <div className={styles.circleWrap}>
        <div
          id="sidebarCircle"
          className={`${styles.sidebar} ${
            colorMode === 'light' ? styles.dark : ''
          }`}
          style={{ display: display, opacity: 1 }}
        ></div>
      </div>
      <Container
        padding={0}
        margin={0}
        height={{ xl: '100vh' }}
        display={{ xl: 'flex' }}
        alignItems={{ xl: 'center' }}
      >
        <Stack
          gap={3}
          w="100%"
          textAlign={{ base: 'center', xl: 'start' }}
          alignItems={{ base: 'center', xl: 'flex-start' }}
        >
          <Text
            color="kl.accent"
            fontWeight="light"
            fontSize={{ base: 'md', md: 'lg' }}
          >
            {t('sidebar.greeting')}
          </Text>
          <Heading
            as="h1"
            size="xl"
            paddingEnd={{ xl: '20' }}
            textTransform="uppercase"
          >
            {t('sidebar.name')}
          </Heading>
          <Heading
            as="h2"
            size={titleSize}
            lineHeight={1}
            color="kl.emphasis"
            className={styles.marginTopForce}
            textTransform="uppercase"
          >
            {t('sidebar.headline_line1')}{' '}
            <br />
            {t('sidebar.headline_line2')}
          </Heading>
          <Text
            colorScheme="gray"
            fontSize={{ base: 'sm', md: 'md' }}
            className={styles.marginTopForce}
          >
            {t('sidebar.location')}
          </Text>

          <Text
            color="kl.description"
            fontSize={{ base: 'sm', md: 'md' }}
            lineHeight="tall"
            paddingEnd={{ xl: '12' }}
            maxWidth={{ base: '100%', xl: '80%' }}
          >
            {t('sidebar.intro')}
            <Text color="kl.emphasis" as="span">
              {' '}
              {t('sidebar.welcome')}
            </Text>
            <br />
            {t('sidebar.description')}
          </Text>
          <Button
            size="lg"
            variant="outline"
            borderWidth="1px"
            borderRadius="0"
            fontWeight="normal"
            fontSize="sm"
            width="120px"
            as={'a'}
            {...{ href: 'mailto:shlomin1231@gmail.com', target: '_blank' }}
          >
            {t('sidebar.cta')}
          </Button>

          <Box
            display="flex"
            justifyContent={{ base: 'center', xl: 'flex-start' }}
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
          </Box>
        </Stack>
      </Container>
    </Box>
  )
}

export default Sidebar
