import { memo } from 'react'
import { Heading, Text, Stack, SimpleGrid, Box, Icon } from '@chakra-ui/react'
import { useColorModeValue } from 'components/ui/color-mode'
import { Services as ServicesList } from 'config/services'

const ServicesSection = () => {
  const emphasis = useColorModeValue('teal.500', 'cyan.200')
  const cardBg = useColorModeValue('blackAlpha.50', 'whiteAlpha.100')
  const borderColor = useColorModeValue('blackAlpha.200', 'whiteAlpha.100')
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
        What i do.
      </Heading>
      <Text color="kl.description">
        I work as a freelancer with companies and individuals, building and
        shipping web products. Here is how I can help.
      </Text>

      <SimpleGrid columns={{ base: 1, md: 2 }} gap={{ base: 4, md: 6 }}>
        {ServicesList.map((service) => (
          <Box
            key={service.title}
            bg={cardBg}
            borderWidth="1px"
            borderColor={borderColor}
            borderRadius="1em"
            padding={{ base: 5, xl: 6 }}
          >
            <Icon
              as={service.icon}
              color={emphasis}
              fontSize="2.25em"
              marginBottom={3}
            />
            <Heading as="h3" fontSize="larger" marginBottom={2}>
              {service.title}
            </Heading>
            <Text color="kl.description" fontSize="smaller">
              {service.description}
            </Text>
          </Box>
        ))}
      </SimpleGrid>
    </Stack>
  )
}

export default memo(ServicesSection)
