import type { JSX } from 'react'
import type { GetStaticProps } from 'next'
import {
  Grid,
  GridItem,
  Stack,
  Box,
  useBreakpointValue,
} from '@chakra-ui/react'
import dynamic from 'next/dynamic'
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
  const sideBarPadding = useBreakpointValue({ base: '5', md: '8', lg: '14' })
  const mainContent = useBreakpointValue({
    base: '5',
    md: '14',
    lg: '14',
    xl: '0',
  })
  const paddTop = useBreakpointValue({ base: '6', xl: '20' })
  return (
    <>
      <OpenGraphHead />
      <StructuredData />
      <Menu />
      <Grid
        id="mainGrid"
        templateColumns={{
          base: 'repeat(1, 1fr)',
          xl: 'repeat(5, 1fr)',
        }}
        templateRows={{
          base: 'auto',
          xl: 'repeat(2, 1fr)',
        }}
        gap={4}
      >
        <GridItem
          padding={sideBarPadding}
          marginTop={paddTop}
          rowSpan={2}
          colSpan={{ base: 1, sm: 1, md: 1, lg: 1, xl: 2 }}
          display="flex"
          alignContent="center"
          as="div"
          flexDirection={'row'}
        >
          <Sidebar />
        </GridItem>
        <GridItem
          as="main"
          padding={mainContent}
          rowSpan={2}
          colSpan={{ base: 1, sm: 2, md: 2, lg: 3, xl: 3 }}
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
