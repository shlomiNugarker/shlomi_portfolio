 
import { Box, Separator, Text, SimpleGrid, Container, Stack } from '@chakra-ui/react'
import NextImage from 'next/image'
import { LinkButton } from 'components/ui/link-button'
import { useColorModeValue } from 'components/ui/color-mode'
import { motion, TargetAndTransition } from 'framer-motion'
import styles from './styles.module.css'
import { easing, DURATIONS } from 'config/animations'

export type FeaturedCardProps = {
  // Responsive height value (string or Chakra responsive object).
   
  height: string | Record<string, any>
  src: string
  idx: number
  title: string
  description: string
  objectPosition?: string
  ctaUrl: string
  isMobile?: boolean
}

const variants: Record<'normal' | 'hover' | 'tap', TargetAndTransition> = {
  normal: {
    opacity: 0.85,
  },
  hover: {
    scale: 1.1,
    opacity: 1,
    transition: {
      duration: DURATIONS.Fast,
      ease: 'backOut',
    },
  },
  tap: {
    scale: 0.85,
    opacity: 1,
    transition: {
      duration: DURATIONS.Fast,
      ease: easing,
    },
  },
}

const MotionBox = motion.create(Box)

const ProjectDescription = ({
  idx,
  title,
  description,
  ctaUrl,
  isLeft,
}: {
  idx?: number
  title: string
  description: string
  ctaUrl: string
  isLeft: boolean
}) => (
  <Container
    paddingX={5}
    paddingY={1}
    display="flex"
    alignItems="center"
    justifyContent="space-around"
    flexDirection="column"
  >
    <Stack gap={1} width="100%">
      <Text
        fontSize={{ base: 'md', md: 'large', '2xl': 'xx-large' }}
        fontWeight="bold"
        letterSpacing={2}
        width="90%"
        alignSelf={isLeft ? 'flex-end' : 'flex-start'}
        textTransform="uppercase"
        as="span"
      >
        <Text color="kl.accentAlternative" fontSize="md" as="span">
          #0{idx}
          {'  '}
        </Text>
        {title}
      </Text>
      <Separator
        borderColor="#A6A6A6"
        width="90%"
        marginLeft={0}
        alignSelf={isLeft ? 'flex-end' : 'flex-start'}
      />
    </Stack>
    <Text
      fontSize="smaller"
      color="kl.accentAlternative"
      width="90%"
      alignSelf={isLeft ? 'flex-end' : 'flex-start'}
      wordBreak="break-word"
      paddingY={{ base: 3, md: 0 }}
    >
      {description}
    </Text>
    <LinkButton
      variant="outline"
      borderWidth="1px"
      borderRadius={0}
      borderColor={{ base: '#595959', _dark: 'whiteAlpha.500' }}
      _hover={{
        backgroundColor: {
          base: 'rgba(49, 151, 149, 0.06)',
          _dark: 'rgba(157, 236, 249, 0.06)',
        },
      }}
      fontWeight="light"
      fontSize={{ base: 'sm', '2xl': 'md' }}
      size="sm"
      href={ctaUrl}
      rel="noreferrer"
      target="_blank"
      marginY={{ base: 3, md: 0 }}
    >
      View Project
    </LinkButton>
  </Container>
)

const FeaturedCard = ({
  idx,
  height,
  src,
  title,
  description,
  objectPosition,
  ctaUrl,
  isMobile,
}: FeaturedCardProps) => {
  const isLeftImage = isMobile ? false : idx % 2 === 0
  const bg = useColorModeValue('blackAlpha.50', 'whiteAlpha.200')
  // A JSX element (not a nested component) so it isn't re-created each render.
  // next/image with `fill` needs a positioned parent that owns the responsive
  // height; the hover/tap scale lives on that parent box.
  const coverImage = (
    <MotionBox
      position="relative"
      height={height}
      width="100%"
      overflow="hidden"
      opacity={0.75}
      whileHover={variants.hover}
      whileTap={variants.tap}
    >
      <NextImage
        src={src}
        alt={title}
        fill
        loading="lazy"
        quality={70}
        sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 600px"
        style={{ objectFit: 'cover', objectPosition }}
      />
    </MotionBox>
  )

  return (
    <Box
      height="auto"
      bg={bg}
      borderRadius="1em"
      className={styles.featureCard}
      borderColor={bg}
      borderWidth="1px"
    >
      <SimpleGrid
        columns={{ base: 1, md: 2 }}
        gap={{ base: 3, md: 0 }}
        display={{ base: 'flex', md: 'grid' }}
        flexDirection={{ base: 'column-reverse', md: 'initial' }}
      >
        {isLeftImage && coverImage}
        <ProjectDescription
          idx={idx}
          title={title}
          description={description}
          ctaUrl={ctaUrl}
          isLeft={isLeftImage}
        />
        {!isLeftImage && coverImage}
      </SimpleGrid>
    </Box>
  )
}
export default FeaturedCard
