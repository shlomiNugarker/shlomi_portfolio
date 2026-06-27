import { useState } from 'react'
import {
  Box,
  Separator,
  Text,
  Stack,
  HStack,
  Heading,
} from '@chakra-ui/react'
import NextImage from 'next/image'
import { LinkButton } from 'components/ui/link-button'
import { useColorModeValue } from 'components/ui/color-mode'
import { motion, AnimatePresence, TargetAndTransition } from 'framer-motion'
import styles from './styles.module.css'
import { easing, DURATIONS } from 'config/animations'

export type FeaturedCardProps = {
  // One or more cover images; a gallery is shown when length > 1.
  images: string[]
  idx: number
  title: string
  description: string
  objectPosition?: string
  ctaUrl: string
  ctaLabel: string
  tags?: string[]
  // Localized badge text ("Client work" / "Personal project").
  badgeLabel: string
  // Paid client work gets a prominent accent badge; personal projects a muted one.
  isClient: boolean
  // Kept for API compatibility with the section; layout is now uniform.
  isMobile?: boolean
}

const imageVariants: Record<'hover', TargetAndTransition> = {
  hover: {
    scale: 1.06,
    transition: {
      duration: DURATIONS.Normal,
      ease: easing,
    },
  },
}

const MotionImageBox = motion.create(Box)

const Tag = ({ label }: { label: string }) => (
  <Box
    as="span"
    fontSize="xs"
    fontWeight="medium"
    letterSpacing="0.02em"
    paddingX={2.5}
    paddingY={1}
    borderRadius="full"
    borderWidth="1px"
    borderColor={{ base: 'blackAlpha.200', _dark: 'whiteAlpha.300' }}
    color="kl.accentAlternative"
    bg={{ base: 'blackAlpha.50', _dark: 'whiteAlpha.100' }}
    whiteSpace="nowrap"
  >
    {label}
  </Box>
)

const Badge = ({ label, isClient }: { label: string; isClient: boolean }) => (
  <Box
    as="span"
    position="absolute"
    top={3}
    insetStart={3}
    zIndex={2}
    fontSize="xs"
    fontWeight="bold"
    letterSpacing="0.04em"
    textTransform="uppercase"
    paddingX={2.5}
    paddingY={1}
    borderRadius="full"
    backdropFilter="blur(6px)"
    color={isClient ? 'white' : 'whiteAlpha.900'}
    bg={isClient ? 'teal.500' : 'blackAlpha.600'}
    boxShadow="sm"
  >
    {label}
  </Box>
)

const Cover = ({
  images,
  title,
  objectPosition,
  badgeLabel,
  isClient,
}: {
  images: string[]
  title: string
  objectPosition?: string
  badgeLabel: string
  isClient: boolean
}) => {
  const [active, setActive] = useState(0)
  const hasGallery = images.length > 1
  const dotBg = useColorModeValue('blackAlpha.400', 'whiteAlpha.500')
  const dotActive = useColorModeValue('teal.700', 'cyan.200')

  return (
    <Box
      position="relative"
      width="100%"
      aspectRatio={16 / 8}
      overflow="hidden"
      bg={{ base: 'blackAlpha.100', _dark: 'whiteAlpha.50' }}
    >
      <Badge label={badgeLabel} isClient={isClient} />
      <MotionImageBox
        position="absolute"
        inset={0}
        whileHover={imageVariants.hover}
      >
        <AnimatePresence initial={false} mode="wait">
          <motion.div
            key={images[active]}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: DURATIONS.Fast }}
            style={{ position: 'absolute', inset: 0 }}
          >
            <NextImage
              src={images[active]}
              alt={
                hasGallery ? `${title} — image ${active + 1}` : title
              }
              fill
              loading="lazy"
              quality={75}
              sizes="(max-width: 768px) 100vw, (max-width: 1280px) 90vw, 760px"
              style={{ objectFit: 'cover', objectPosition }}
            />
          </motion.div>
        </AnimatePresence>
      </MotionImageBox>

      {hasGallery && (
        <HStack
          position="absolute"
          bottom={3}
          insetStart="50%"
          transform="translateX(-50%)"
          gap={2}
          zIndex={1}
        >
          {images.map((img, i) => (
            <Box
              as="button"
              key={img}
              aria-label={`Show image ${i + 1}`}
              onClick={() => setActive(i)}
              width={i === active ? '18px' : '8px'}
              height="8px"
              borderRadius="full"
              bg={i === active ? dotActive : dotBg}
              transition="width 0.2s ease, background 0.2s ease"
              cursor="pointer"
            />
          ))}
        </HStack>
      )}
    </Box>
  )
}

const FeaturedCard = ({
  idx,
  images,
  title,
  description,
  objectPosition,
  ctaUrl,
  ctaLabel,
  tags,
  badgeLabel,
  isClient,
}: FeaturedCardProps) => {
  const bg = useColorModeValue('blackAlpha.50', 'whiteAlpha.100')
  const borderCol = useColorModeValue('blackAlpha.100', 'whiteAlpha.200')

  return (
    <Box
      role="group"
      bg={bg}
      borderRadius="1.25em"
      borderWidth="1px"
      borderColor={borderCol}
      overflow="hidden"
      height="100%"
      display="flex"
      flexDirection="column"
      className={styles.featureCard}
      transition="border-color 0.2s ease, transform 0.2s ease"
      _hover={{
        borderColor: { base: 'teal.400', _dark: 'teal.300' },
      }}
    >
      {/* Wide, full-bleed cover (single image or a small gallery). */}
      <Cover
        images={images}
        title={title}
        objectPosition={objectPosition}
        badgeLabel={badgeLabel}
        isClient={isClient}
      />

      {/* Content */}
      <Stack
        gap={4}
        flex="1"
        paddingX={{ base: 5, md: 7 }}
        paddingY={{ base: 5, md: 6 }}
        textAlign="start"
      >
        <Stack gap={2}>
          <HStack gap={3} align="baseline">
            <Text
              color="kl.accentAlternative"
              fontSize={{ base: 'sm', md: 'md' }}
              fontWeight="bold"
              fontVariantNumeric="tabular-nums"
            >
              #0{idx}
            </Text>
            <Heading
              as="h3"
              size={{ base: 'lg', md: 'xl' }}
              letterSpacing="wide"
              textTransform="uppercase"
            >
              {title}
            </Heading>
          </HStack>
          <Separator borderColor={borderCol} />
        </Stack>

        <Text
          fontSize={{ base: 'sm', md: 'md' }}
          color="kl.description"
          lineHeight="tall"
        >
          {description}
        </Text>

        {tags && tags.length > 0 && (
          <HStack gap={2} wrap="wrap">
            {tags.map((t) => (
              <Tag key={t} label={t} />
            ))}
          </HStack>
        )}

        <LinkButton
          variant="outline"
          borderWidth="1px"
          borderRadius="md"
          alignSelf="flex-start"
          borderColor={{ base: '#595959', _dark: 'whiteAlpha.500' }}
          _hover={{
            backgroundColor: {
              base: 'rgba(49, 151, 149, 0.08)',
              _dark: 'rgba(157, 236, 249, 0.08)',
            },
            borderColor: { base: 'teal.400', _dark: 'teal.300' },
          }}
          fontWeight="medium"
          fontSize={{ base: 'sm', md: 'md' }}
          size="sm"
          href={ctaUrl}
          rel="noreferrer"
          target="_blank"
          marginTop="auto"
        >
          {ctaLabel}
        </LinkButton>
      </Stack>
    </Box>
  )
}

export default FeaturedCard
