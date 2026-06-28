import type { JSX } from 'react'
import type { GetStaticProps } from 'next'
import dynamic from 'next/dynamic'
import { useTranslation } from 'next-i18next/pages'
import { serverSideTranslations } from 'next-i18next/pages/serverSideTranslations'
import nextI18NextConfig from '../next-i18next.config'
import OpenGraphHead from 'components/Misc/OpenGraphHead'
import StructuredData from 'components/Misc/StructuredData'
import Menu from 'components/Menu'
import Sidebar from 'components/Sidebar'
import Avatar from 'components/Avatar'
import About from 'components/Sections/About'
import ScrollMore from 'components/Misc/ScrollMore'

// Only the above-the-fold content (Menu, Sidebar, Avatar, About) is in the
// initial bundle. Every section below the hero is code-split so its weight
// isn't shipped on first load.
const Services = dynamic(() => import('components/Sections/Services'))
const FeaturedWorks = dynamic(() => import('components/Sections/FeaturedWorks'))
const GetInTouch = dynamic(() => import('components/Sections/GetInTouch'))

const Portfolio = (): JSX.Element => {
  const { t } = useTranslation('common')
  return (
    <>
      <OpenGraphHead />
      <StructuredData />
      {/* Skip-link: parked off-screen above the viewport, revealed only on focus
          (keyboard Tab), letting keyboard users jump past the nav. */}
      <a
        href="#main-content"
        className="fixed start-3 top-3 z-[1000] -translate-y-[200%] rounded-md bg-kl-bg px-4 py-2 font-semibold text-kl-emphasis transition-transform duration-200 focus:translate-y-0 focus-visible:translate-y-0"
      >
        {t('a11y.skip_to_content')}
      </a>
      <Menu />
      {/* Below xl the hero and main stack in normal flow; the two-column grid
          (with its 2-row track) only kicks in on the wide xl layout. */}
      <div
        id="mainGrid"
        className="block gap-4 xl:grid xl:grid-cols-5 xl:grid-rows-2"
      >
        <div className="flex flex-row content-center p-5 md:p-8 lg:p-14 mt-16 xl:mt-20 xl:col-span-2 xl:row-span-2">
          <Sidebar />
        </div>
        <main
          id="main-content"
          className="overflow-hidden p-5 md:p-14 xl:p-0 xl:col-span-3 xl:row-span-2"
        >
          <div className="flex w-full flex-col gap-16 xl:gap-24">
            <div
              id="aboutMe"
              className="contentRow flex flex-col items-center justify-center gap-10 py-4 xl:min-h-screen xl:flex-row xl:gap-0 xl:py-0"
            >
              <About />
              <Avatar />
            </div>
            <div
              id="services"
              className="contentRow pb-12 lg:pt-20 lg:pb-10 xl:pt-0"
            >
              <Services />
            </div>
            <div
              id="works"
              className="contentRow pb-12 lg:pt-20 lg:pb-10 xl:pt-20"
            >
              <FeaturedWorks />
            </div>
            <div id="contact" className="contentRow lg:pt-20 xl:pt-20">
              <GetInTouch />
            </div>
          </div>
        </main>
      </div>
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
