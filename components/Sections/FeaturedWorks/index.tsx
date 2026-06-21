import { memo } from 'react'
import { Heading, Text, Stack, SimpleGrid, Box } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { useTranslation } from 'next-i18next/pages'
import FeaturedCard from './FeaturedCard'
import { fadeInUpSlower, galleryStagger } from 'config/animations'
import { FeaturedWorksList } from 'config/works'

const MotionGrid = motion.create(SimpleGrid)
const MotionBox = motion.create(Box)

const FeaturedWorksSection = () => {
  const { t } = useTranslation('common')
  return (
    <Stack
      width={{ base: '99%', xl: '75%' }}
      height="100%"
      gap={{ base: 6, xl: 8 }}
      textAlign={{ base: 'center', xl: 'start' }}
    >
      <Heading
        size={{ base: '4xl', xl: '5xl' }}
        style={{
          fontVariantCaps: 'small-caps',
        }}
      >
        {t('works.heading')}
      </Heading>
      <Text
        color="kl.description"
        fontSize={{ base: 'sm', md: 'md', '2xl': 'lg' }}
        lineHeight="tall"
      >
        {t('works.description')}
      </Text>

      <MotionGrid
        columns={1}
        gap={{ base: 6, md: 8 }}
        variants={galleryStagger}
        marginTop={2}
      >
        {FeaturedWorksList.map((work, index) => (
          <MotionBox key={work.key} variants={fadeInUpSlower} height="100%">
            <FeaturedCard
              idx={index + 1}
              title={t(`works.items.${work.key}.title`)}
              images={work.images}
              description={t(`works.items.${work.key}.description`)}
              ctaUrl={work.ctaUrl}
              objectPosition={work.objectPosition}
              tags={work.tags}
              ctaLabel={t('works.view_project')}
            />
          </MotionBox>
        ))}
      </MotionGrid>
    </Stack>
  )
}

export default memo(FeaturedWorksSection)
