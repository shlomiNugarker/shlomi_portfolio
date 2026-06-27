import { memo } from 'react'
import { Heading, Text, Stack, SimpleGrid, Box, Icon } from '@chakra-ui/react'
import { useColorModeValue } from 'components/ui/color-mode'
import { useTranslation } from 'next-i18next/pages'
import { Services as ServicesList } from 'config/services'

const ServicesSection = () => {
  const { t } = useTranslation('common')
  const emphasis = useColorModeValue('teal.700', 'cyan.200')
  const cardBg = useColorModeValue('blackAlpha.50', 'whiteAlpha.100')
  const borderColor = useColorModeValue('blackAlpha.200', 'whiteAlpha.100')
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
        {t('services.heading')}
      </Heading>
      <Text
        color="kl.description"
        fontSize={{ base: 'sm', md: 'md', '2xl': 'lg' }}
        lineHeight="tall"
      >
        {t('services.description')}
      </Text>

      <SimpleGrid
        columns={{ base: 1, md: 2 }}
        gap={{ base: 4, md: 6 }}
        textAlign="start"
      >
        {ServicesList.map((service) => (
          <Box
            key={service.key}
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
            <Heading
              as="h3"
              fontSize={{ base: 'lg', md: 'xl' }}
              marginBottom={2}
            >
              {t(`services.items.${service.key}.title`)}
            </Heading>
            <Text
              color="kl.description"
              fontSize={{ base: 'sm', md: 'md' }}
              lineHeight="tall"
            >
              {t(`services.items.${service.key}.description`)}
            </Text>
          </Box>
        ))}
      </SimpleGrid>
    </Stack>
  )
}

export default memo(ServicesSection)
