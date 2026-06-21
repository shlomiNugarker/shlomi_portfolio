import { memo } from 'react'
import { Heading, Text, Stack, SimpleGrid, Box } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import FeaturedCard from './FeaturedCard'
import { fadeInUpSlower, galleryStagger } from 'config/animations'
import { FeaturedWorksList } from 'config/works'

const MotionGrid = motion.create(SimpleGrid)
const MotionBox = motion.create(Box)

const FeaturedWorksSection = () => {
  return (
    <Stack
      width={{ base: '99%', xl: '75%' }}
      height="100%"
      gap={{ base: 6, xl: 8 }}
      textAlign={{ base: 'center', xl: 'left' }}
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
        columns={1}
        gap={{ base: 6, md: 8 }}
        variants={galleryStagger}
        marginTop={2}
      >
        {FeaturedWorksList.map((work, index) => (
          <MotionBox key={work.title} variants={fadeInUpSlower} height="100%">
            <FeaturedCard
              idx={index + 1}
              title={work.title}
              src={work.src}
              description={work.description}
              ctaUrl={work.ctaUrl}
              objectPosition={work.objectPosition}
              tags={work.tags}
            />
          </MotionBox>
        ))}
      </MotionGrid>
    </Stack>
  )
}

export default memo(FeaturedWorksSection)
