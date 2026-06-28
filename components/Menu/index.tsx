import {
  Container,
  Box,
  useBreakpointValue,
} from '@chakra-ui/react'
import Logo from '../Logo'
import styles from './styles.module.css'
import Navigation from './Navigation'
import { mobileBreakpointsMap } from 'config/theme'
import useScrollDirection, { ScrollDirection } from 'hooks/useScrollDirection'

const Menu = () => {
  // Match the site background exactly so the mobile/tablet header blends in
  // (kl.bg is gray.100 in light, #121212 in dark — same as the page body).
  const bg = 'kl.bg'
  const isMobile = useBreakpointValue(mobileBreakpointsMap)
  const scrollDirection = useScrollDirection(true, isMobile)
  // Hide the mobile header on scroll-down (functional behavior, not an entrance
  // animation): translate it out of view instead of animating it.
  const hidden =
    isMobile && scrollDirection === ScrollDirection.Down
  return (
    <Box
      className={isMobile ? styles.mobileMenuContainer : ''}
      style={
        isMobile
          ? { transform: hidden ? 'translateY(-100%)' : 'translateY(0)' }
          : undefined
      }
    >
      <Container
        as="header"
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        padding={{ base: 5, lg: 0 }}
        paddingY={{ base: 5, lg: 0 }}
        backgroundColor={isMobile ? bg : 'transparent'}
        width="100vw"
        maxWidth="100vw"
        margin={0}
      >
        <Logo />
        <Navigation />
      </Container>
    </Box>
  )
}

export default Menu
