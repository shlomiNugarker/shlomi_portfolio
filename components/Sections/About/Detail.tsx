import { memo } from 'react'
import {
  Heading,
  Text,
  List,
  Icon,
  SimpleGrid,
  Box,
  Stack,
} from '@chakra-ui/react'
import { Tooltip } from 'components/ui/tooltip'
import { useColorModeValue } from 'components/ui/color-mode'
import { useTranslation } from 'next-i18next/pages'
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiJavascript,
  SiNodedotjs,
  SiPostgresql,
  SiMongodb,
  SiTailwindcss,
} from 'react-icons/si'
import { GiCoffeePot } from 'react-icons/gi'
import { IoMdOpen } from 'react-icons/io'

type ISkillSetModal = {
  onOpen(): void
}

const Detail = ({ onOpen }: ISkillSetModal) => {
  const { t } = useTranslation('common')
  const emphasis = useColorModeValue('teal.500', 'cyan.200')

  return (
    <Stack
      width={{ base: '100%', xl: '70%' }}
      gap={{ base: 6, xl: 8 }}
      textAlign={{ base: 'center', xl: 'start' }}
      alignItems={{ base: 'center', xl: 'stretch' }}
      as="section"
    >
      <Heading
        as="h2"
        size={{ base: '4xl', xl: '5xl' }}
        style={{
          fontVariantCaps: 'small-caps',
        }}
      >
        {t('about.heading')}
      </Heading>
      <Text
        color="kl.description"
        fontSize={{ base: 'sm', md: 'md', '2xl': 'lg' }}
        lineHeight="tall"
      >
        {t('about.lead_1')}{' '}
        <Tooltip content={t('about.end_to_end_tip')}>
          <Text as="span" color="kl.emphasis">
            <b>{t('about.end_to_end')}</b>
          </Text>
        </Tooltip>{' '}
        {t('about.lead_2')}
        <br /> <br />
        {t('about.body')}{' '}
        <Tooltip content={t('about.coffee_tip')}>
          <Text as="span" color="kl.emphasis">
            {t('about.coffee')}
          </Text>
        </Tooltip>{' '}
        <Icon as={GiCoffeePot} color={emphasis} />.
      </Text>

      <SimpleGrid columns={2} gap={4}>
        <List.Root gap={3} listStyle="none">
          <List.Item fontSize={{ base: 'sm', md: 'md' }} display="flex" alignItems="center">
            <Icon as={SiReact} color={emphasis} fontSize="2em" marginEnd={2} />
            React
          </List.Item>
          <List.Item fontSize={{ base: 'sm', md: 'md' }} display="flex" alignItems="center">
            <Icon
              as={SiNextdotjs}
              color={emphasis}
              fontSize="2em"
              marginEnd={2}
            />
            Next.js
          </List.Item>
          <List.Item fontSize={{ base: 'sm', md: 'md' }} display="flex" alignItems="center">
            <Icon
              as={SiTypescript}
              color={emphasis}
              fontSize="2em"
              marginEnd={2}
            />
            TypeScript
          </List.Item>

          <List.Item fontSize={{ base: 'sm', md: 'md' }} display="flex" alignItems="center">
            <Icon
              as={SiJavascript}
              color={emphasis}
              fontSize="2em"
              marginEnd={2}
            />
            JavaScript
          </List.Item>
        </List.Root>
        <List.Root gap={3} listStyle="none">
          <List.Item fontSize={{ base: 'sm', md: 'md' }} display="flex" alignItems="center">
            <Icon
              as={SiNodedotjs}
              color={emphasis}
              fontSize="2em"
              marginEnd={2}
            />
            Node.js
          </List.Item>
          <List.Item fontSize={{ base: 'sm', md: 'md' }} display="flex" alignItems="center">
            <Icon
              as={SiPostgresql}
              color={emphasis}
              fontSize="2em"
              marginEnd={2}
            />
            PostgreSQL
          </List.Item>
          <List.Item fontSize={{ base: 'sm', md: 'md' }} display="flex" alignItems="center">
            <Icon as={SiMongodb} color={emphasis} fontSize="2em" marginEnd={2} />
            MongoDB
          </List.Item>
          <List.Item fontSize={{ base: 'sm', md: 'md' }} display="flex" alignItems="center">
            <Icon
              as={SiTailwindcss}
              color={emphasis}
              fontSize="2em"
              marginEnd={2}
            />
            Tailwind CSS
          </List.Item>
        </List.Root>
        <Box>
          <Text
            as="button"
            color="kl.emphasis"
            fontSize={{ base: 'sm', md: 'md' }}
            textAlign="start"
            onClick={onOpen}
          >
            {t('about.see_skills')} <Icon as={IoMdOpen} />
          </Text>
        </Box>
      </SimpleGrid>
    </Stack>
  )
}

export default memo(Detail)
