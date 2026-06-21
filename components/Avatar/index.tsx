import { Box } from '@chakra-ui/react'
import NextImage from 'next/image'
import { useColorModeValue } from 'components/ui/color-mode'
import { motion, AnimatePresence } from 'framer-motion'
import { avatarAnimation } from 'config/animations'

const AvatarImages = {
  DarkMode: '/KL_avatar.png',
  LightMode: '/KL_avatar_light.png',
}

const MotionBox = motion.create(Box)

const Avatar = () => {
  const imgAvatar = useColorModeValue(
    AvatarImages.LightMode,
    AvatarImages.DarkMode
  )
  return (
    <AnimatePresence>
      <MotionBox
        id="klAvatar"
        boxSize={{ base: 64, lg: 'sm' }}
        padding={{ base: 8 }}
        marginBottom={{ base: 10, md: 0, lg: 0 }}
        initial="initial"
        animate={'animate'}
        variants={avatarAnimation}
        exit={{ opacity: 0 }}
      >
        <NextImage
          src={imgAvatar}
          alt="Shlomi Nugarker"
          width={250}
          height={250}
          priority
          style={{ width: '100%', height: 'auto', margin: 'auto' }}
        />
      </MotionBox>
    </AnimatePresence>
  )
}

export default Avatar
