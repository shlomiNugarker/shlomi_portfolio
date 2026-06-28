import { Box } from '@chakra-ui/react'
import NextImage from 'next/image'

const Avatar = () => (
  <Box
    id="klAvatar"
    boxSize={{ base: 56, md: 64, xl: 'sm' }}
    flexShrink={0}
    padding={{ base: 0, xl: 8 }}
  >
    <NextImage
      src="/avatar.jpg"
      alt="Shlomi Nugarker"
      width={463}
      height={486}
      priority
      style={{
        width: '100%',
        height: 'auto',
        margin: 'auto',
        borderRadius: '50%',
      }}
    />
  </Box>
)

export default Avatar
