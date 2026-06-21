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
  const emphasis = useColorModeValue('teal.500', 'cyan.200')

  return (
    <Stack
      width={{ base: '100%', xl: '70%' }}
      gap={{ base: 6, xl: 8 }}
      textAlign={{ base: 'center', xl: 'left' }}
      alignItems={{ base: 'center', xl: 'stretch' }}
      as="section"
    >
      <Heading
        as="h4"
        size="5xl"
        letterSpacing={1.8}
        style={{
          fontVariantCaps: 'small-caps',
        }}
      >
        About me.
      </Heading>
      <Text color="kl.description">
        I&apos;m a <b>full-stack developer</b> based in Israel, working as a{' '}
        <b>freelancer</b>. I build websites and small-to-mid web applications{' '}
        <Tooltip content="Database, API and UI — the whole thing.">
          <Text as="span" color="kl.emphasis">
            <b>end-to-end</b>
          </Text>
        </Tooltip>{' '}
        — from the database and API to the interface users actually touch.
        <br /> <br />
        I try to keep the code simple enough that the next person to open it can
        pick it up quickly. Here are a few technologies I reach for, fueled by{' '}
        <Tooltip content="Lots of it.">
          <Text as="span" color="kl.emphasis">
            coffee
          </Text>
        </Tooltip>{' '}
        <Icon as={GiCoffeePot} color={emphasis} />.
      </Text>

      <SimpleGrid columns={2} gap={4}>
        <List.Root gap={3} listStyle="none">
          <List.Item fontSize="small" display="flex" alignItems="center">
            <Icon as={SiReact} color={emphasis} fontSize="2em" marginEnd={2} />
            React
          </List.Item>
          <List.Item fontSize="small" display="flex" alignItems="center">
            <Icon
              as={SiNextdotjs}
              color={emphasis}
              fontSize="2em"
              marginEnd={2}
            />
            Next.js
          </List.Item>
          <List.Item fontSize="small" display="flex" alignItems="center">
            <Icon
              as={SiTypescript}
              color={emphasis}
              fontSize="2em"
              marginEnd={2}
            />
            TypeScript
          </List.Item>

          <List.Item fontSize="small" display="flex" alignItems="center">
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
          <List.Item fontSize="small" display="flex" alignItems="center">
            <Icon
              as={SiNodedotjs}
              color={emphasis}
              fontSize="2em"
              marginEnd={2}
            />
            Node.js
          </List.Item>
          <List.Item fontSize="small" display="flex" alignItems="center">
            <Icon
              as={SiPostgresql}
              color={emphasis}
              fontSize="2em"
              marginEnd={2}
            />
            PostgreSQL
          </List.Item>
          <List.Item fontSize="small" display="flex" alignItems="center">
            <Icon as={SiMongodb} color={emphasis} fontSize="2em" marginEnd={2} />
            MongoDB
          </List.Item>
          <List.Item fontSize="small" display="flex" alignItems="center">
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
            fontSize="smaller"
            textAlign="left"
            onClick={onOpen}
          >
            See my full arsenal <Icon as={IoMdOpen} />
          </Text>
        </Box>
      </SimpleGrid>
    </Stack>
  )
}

export default memo(Detail)
