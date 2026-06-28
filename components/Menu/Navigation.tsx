import { memo, useCallback } from 'react'
import {
  Container,
  Flex,
  Box,
  IconButton,
  useBreakpointValue,
} from '@chakra-ui/react'
import { LinkButton } from 'components/ui/link-button'
import { NavLinks } from 'config/navigation'
import { useColorMode, useColorModeValue } from 'components/ui/color-mode'
import { useTranslation } from 'next-i18next/pages'
import { BsSun as SunIcon, BsMoon as MoonIcon } from 'react-icons/bs'
import { useState, useCallback as useCallbackToggle } from 'react'
import styles from './styles.module.css'
import MobileMenu from './toggle'
import LanguageSwitcher from './LanguageSwitcher'
import { ThemeMode, mobileBreakpointsMap } from 'config/theme'
import useScrollDirection, { ScrollDirection } from 'hooks/useScrollDirection'

const Navigation = () => {
  const { t } = useTranslation('common')
  const { toggleColorMode, colorMode } = useColorMode()
  const [isOpen, setIsOpen] = useState(false)
  const toggleOpen = useCallbackToggle(() => setIsOpen((v) => !v), [])
  const isMobile = useBreakpointValue(mobileBreakpointsMap)
  const menuButtonSize = useBreakpointValue({
    base: 'xl',
    md: 'sm',
  })

  const bg = useColorModeValue(
    'rgba(237, 242, 247, 0.95)',
    'rgba(18, 18, 18, 0.9)'
  )

  const borderColor = useColorModeValue('teal.700', 'cyan.200')

  const IsDark = colorMode === ThemeMode.Dark
  const btnClassName = `${styles.blogBtn} ${!IsDark && styles.dark}`
  const Icon = IsDark ? SunIcon : MoonIcon
  const onMenuItemClick = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation()
      if (isMobile) {
        toggleOpen()
      }
    },
    [isMobile, toggleOpen]
  )
  const scrollDirection = useScrollDirection()

  return (
    <>
      <Box
        display={{ base: 'flex', xl: 'none' }}
        alignItems="center"
        paddingTop={1}
        className={styles.menuBar}
        zIndex={100}
        top="3%"
      >
        <IconButton
          aria-label={t('a11y.color_mode')}
          variant="ghost"
          boxShadow="none"
          onClick={toggleColorMode}
          padding={0}
        >
          <Icon />
        </IconButton>
        <LanguageSwitcher />
        <MobileMenu isDarkMode={IsDark} toggle={toggleOpen} isOpen={isOpen} />
      </Box>

      <Container
        width="100%"
        // Transparent on desktop; the solid panel bg is only needed for the
        // full-screen mobile menu overlay.
        backgroundColor={isMobile && isOpen ? bg : 'transparent'}
        maxWidth={{ base: '100%', sm: '100%', lg: '50%', xl: '60%' }}
        className={styles.menu}
        insetEnd={{
          lg:
            !isMobile && scrollDirection === ScrollDirection.Down
              ? '2%'
              : '3.5%',
        }}
        style={{
          width:
            !isMobile && scrollDirection === ScrollDirection.Down
              ? '12%'
              : '100%',
          // Resolve to undefined (omitted) when false so server and client
          // render the same style string — avoids React hydration mismatches.
          top: !isOpen && isMobile ? '-100vh' : undefined,
          opacity: !isOpen && isMobile ? 0 : undefined,
          left: isOpen && isMobile ? 0 : undefined,
        }}
        borderColor={isOpen && isMobile ? borderColor : undefined}
        borderBottomWidth={isOpen && isMobile ? '1px' : undefined}
        paddingBottom={isOpen && isMobile ? '1px' : undefined}
        marginTop={0}
        paddingTop={1}
        as="nav"
      >
        <Flex
          justifyContent={{ base: 'center', lg: 'flex-end' }}
          direction={{
            base: 'column',
            lg: scrollDirection === ScrollDirection.Down ? 'column' : 'row',
          }}
          paddingX={{ base: '', sm: '10', lg: '0' }}
          paddingY={{
            base: '10',
            lg: scrollDirection === ScrollDirection.Down ? '10' : '3',
          }}
          height={{ base: '100vh', lg: 'auto' }}
          paddingRight="0"
          paddingBottom={isMobile ? 10 : '0'}
          onClick={() => isMobile && toggleOpen()}
        >
          {NavLinks.map((link, index) => (
            <Box
              key={link.key}
              width={{ base: '100%', lg: 'auto' }}
              textAlign={{ base: 'center', lg: 'start' }}
              marginY={index === 0 ? undefined : { base: 2, lg: 0 }}
            >
              <LinkButton
                fontWeight="light"
                variant="ghost"
                fontSize={menuButtonSize}
                letterSpacing={2}
                className={btnClassName}
                padding={2}
                marginX={2}
                href={isMobile && link.mobileHref ? link.mobileHref : link.href}
                rel="noreferrer"
                onClick={onMenuItemClick}
              >
                {t(`nav.${link.key}`)}
              </LinkButton>
            </Box>
          ))}
          {!isMobile && (
            <Box display="flex" alignItems="center">
              <IconButton
                marginX={1}
                aria-label={t('a11y.color_mode')}
                variant="ghost"
                boxShadow="none"
                onClick={toggleColorMode}
              >
                <Icon />
              </IconButton>
              <LanguageSwitcher />
            </Box>
          )}
        </Flex>
      </Container>
    </>
  )
}

export default memo(Navigation)
