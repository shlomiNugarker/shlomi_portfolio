import type { JSX } from 'react'
import type { GetStaticProps } from 'next'
import {
  Grid,
  GridItem,
  Stack,
  Box,
  Link,
  useBreakpointValue,
} from '@chakra-ui/react'
import dynamic from 'next/dynamic'
import { useTranslation } from 'next-i18next/pages'
import { serverSideTranslations } from 'next-i18next/pages/serverSideTranslations'
import nextI18NextConfig from '../next-i18next.config'
import OpenGraphHead from 'components/Misc/OpenGraphHead'
import StructuredData from 'components/Misc/StructuredData'
import FadeInLayout from 'components/Layout/FadeWhenVisible'
import Menu from 'components/Menu'
import Sidebar from 'components/Sidebar'
import Avatar from 'components/Avatar'
import About from 'components/Sections/About'
import ScrollMore from 'components/Misc/ScrollMore'

// Only the above-the-fold content (Menu, Sidebar, Avatar, About) is in the
// initial bundle. Every section below the hero is code-split so its
// framer-motion / Chakra weight isn't shipped on first load.
const Services = dynamic(() => import('components/Sections/Services'))
const FeaturedWorks = dynamic(
  () => import('components/Sections/FeaturedWorks')
)
const GetInTouch = dynamic(() => import('components/Sections/GetInTouch'))

const Portfolio = (): JSX.Element => {
  const { t } = useTranslation('common')
  const sideBarPadding = useBreakpointValue({ base: '5', md: '8', lg: '14' })
  const mainContent = useBreakpointValue({
    base: '5',
    md: '14',
    lg: '14',
    xl: '0',
  })
  // Below xl the header is a fixed ~68px bar; 4rem (64px) top space tucks the
  // hero just under it. At xl the header is transparent and non-blocking.
  const paddTop = useBreakpointValue({ base: '4rem', xl: '20' })
  return (
    <>
      <OpenGraphHead />
      <StructuredData />
      {/* Skip-link: parked fully off-screen above the viewport and revealed only
          when focused (keyboard Tab), letting keyboard users jump past the nav. */}
      <Link
        href="#main-content"
        position="fixed"
        insetStart={3}
        top={3}
        zIndex={1000}
        paddingX={4}
        paddingY={2}
        borderRadius="md"
        bg="kl.bg"
        color="kl.emphasis"
        fontWeight="semibold"
        transform="translateY(-200%)"
        transition="transform 0.2s ease"
        _focusVisible={{ transform: 'translateY(0)' }}
        _focus={{ transform: 'translateY(0)' }}
      >
        {t('a11y.skip_to_content')}
      </Link>
      <Menu />
      <Grid
        id="mainGrid"
        // Below xl the hero and main simply stack in normal flow; the two-column
        // grid (with its 2-row track) only kicks in on the wide xl layout. This
        // avoids the collapsed first row that overlapped the hero on tablet.
        display={{ base: 'block', xl: 'grid' }}
        templateColumns={{
          xl: 'repeat(5, 1fr)',
        }}
        templateRows={{
          xl: 'repeat(2, 1fr)',
        }}
        gap={4}
      >
        <GridItem
          padding={sideBarPadding}
          marginTop={paddTop}
          rowSpan={{ base: 1, xl: 2 }}
          colSpan={{ base: 1, xl: 2 }}
          display="flex"
          alignContent="center"
          as="div"
          flexDirection={'row'}
        >
          <Sidebar />
        </GridItem>
        <GridItem
          as="main"
          id="main-content"
          padding={mainContent}
          rowSpan={{ base: 1, xl: 2 }}
          colSpan={{ base: 1, xl: 3 }}
          overflow="hidden"
        >
          <Stack w="100%" gap={{ base: 16, xl: 24 }}>
            <FadeInLayout>
              <Box
                id="aboutMe"
                className="contentRow"
                minH={{ xl: '100vh' }}
                display="flex"
                alignItems="center"
                justifyContent="center"
                gap={{ base: 10, xl: 0 }}
                paddingTop={{ base: 4, xl: 0 }}
                paddingBottom={{ base: 4, xl: 0 }}
                flexDirection={{
                  base: 'column',
                  xl: 'row',
                }}
              >
                <About />
                <Avatar />
              </Box>
            </FadeInLayout>
            <FadeInLayout>
              <Box
                id="services"
                className="contentRow"
                paddingTop={{ base: 0, lg: 20, xl: 0 }}
                paddingBottom={{ base: 12, lg: 10 }}
                paddingX={0}
                flexDirection={'row'}
              >
                <Services />
              </Box>
            </FadeInLayout>
            <FadeInLayout>
              <Box
                id="works"
                className="contentRow"
                paddingTop={{ base: 0, lg: 20, xl: 20 }}
                paddingBottom={{ base: 12, lg: 10 }}
                paddingX={0}
                flexDirection={'row'}
              >
                <FeaturedWorks />
              </Box>
            </FadeInLayout>
            <FadeInLayout>
              <Box
                id="contact"
                className="contentRow"
                paddingTop={{ base: 0, lg: 20, xl: 20 }}
                paddingX={0}
                flexDirection={'row'}
              >
                <GetInTouch />
              </Box>
            </FadeInLayout>
          </Stack>
        </GridItem>
      </Grid>
      <ScrollMore />
    </>
  )
}

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(
      locale ?? 'en',
      ['common'],
      nextI18NextConfig
    )),
  },
})

export default Portfolio
