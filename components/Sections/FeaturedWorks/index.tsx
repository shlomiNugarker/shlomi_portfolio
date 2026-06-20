import { memo } from 'react'
import {
  Heading,
  Text,
  Stack,
  Grid,
  GridItem,
  useBreakpointValue,
} from '@chakra-ui/react'
import { motion } from 'framer-motion'
import FeaturedCard from './FeaturedCard'
import { fadeInUpSlower, galleryStagger } from 'config/animations'
import { mobileBreakpointsMap } from 'config/theme'
import { FeaturedWorksList } from 'config/works'

const MotionGrid = motion.create(Grid)
const MotionGridItem = motion.create(GridItem)

const CARD_HEIGHT = { base: '130px', md: '225px', '2xl': '300px' }

const FeaturedWorksSection = () => {
  const isMobile = useBreakpointValue(mobileBreakpointsMap)
  return (
    <Stack
      width={{ base: '99%', lg: '60%', xl: '75%' }}
      height="100%"
      gap={{ base: 6, xl: 8 }}
    >
      <Heading
        size="5xl"
        style={{
          fontVariantCaps: 'small-caps',
        }}
      >
        Some of my works.
      </Heading>
      <Text color="kl.description">
        Check out some of the works I made at freelancing, company projects and
        even case studies.
      </Text>

      <MotionGrid
        templateRows="repeat(1, 1fr)"
        templateColumns="repeat(6, 1fr)"
        gap={{ base: 5, md: 6 }}
        variants={galleryStagger}
      >
        {FeaturedWorksList.map((work, index) => (
          <MotionGridItem key={work.title} colSpan={6} variants={fadeInUpSlower}>
            <FeaturedCard
              idx={index + 1}
              title={work.title}
              src={work.src}
              description={work.description}
              height={CARD_HEIGHT}
              ctaUrl={work.ctaUrl}
              objectPosition={work.objectPosition}
              isMobile={isMobile}
            />
          </MotionGridItem>
        ))}
      </MotionGrid>
    </Stack>
  )
}

export default memo(FeaturedWorksSection)
