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
  SiDotNet,
  SiJavascript,
  SiTypescript,
  SiGraphql,
  SiReact,
  SiNextDotJs,
  SiNodeDotJs,
  SiDocker,
} from 'react-icons/si'
import { GiCoffeePot } from 'react-icons/gi'
import { IoMdOpen } from 'react-icons/io'

type ISkillSetModal = {
  onOpen(): void
}

const Detail = ({ onOpen }: ISkillSetModal) => {
  const emphasis = useColorModeValue('teal.500', 'cyan.200')
  const currentYear = new Date().getFullYear()
  const professionalYears = currentYear - 2016

  return (
    <Stack
      width={{ base: '100%', lg: '70%' }}
      gap={{ base: 6, xl: 8 }}
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
        What i do.
      </Heading>
      <Text color="kl.description">
        I`ve been coding professionally for {professionalYears} years now and
        currently working as a <b>Software Engineer</b> that focuses on{' '}
        <b>architecture</b>, <b>APIs</b>,{' '}
        <Tooltip content="Ha!. Or more accurately TECH DEBT">
          <Text as="span" color="kl.emphasis">
            <b>nitty-gritty business logics</b>
          </Text>
        </Tooltip>{' '}
        and even <b>front end integration</b> stuff now, how time flies!
        <br /> <br />
        Here are few technologies that are cup of my{' '}
        <Tooltip content="I only drink tea if I needed too!">
          <Text as="span" color="kl.emphasis" textDecorationLine="line-through">
            tea
          </Text>
        </Tooltip>{' '}
        coffee <Icon as={GiCoffeePot} color={emphasis} />.
      </Text>

      <SimpleGrid columns={2} gap={4}>
        <List.Root gap={3} listStyle="none">
          <List.Item fontSize="small" display="flex" alignItems="center">
            <Icon as={SiDotNet} color={emphasis} fontSize="2em" marginEnd={2} />
            C# - .NET.Core
          </List.Item>
          <List.Item fontSize="small" display="flex" alignItems="center">
            <Icon
              as={SiJavascript}
              color={emphasis}
              fontSize="2em"
              marginEnd={2}
            />
            Javascript (ES6+)
          </List.Item>
          <List.Item fontSize="small" display="flex" alignItems="center">
            <Icon
              as={SiTypescript}
              color={emphasis}
              fontSize="2em"
              marginEnd={2}
            />
            Typescript
          </List.Item>

          <List.Item fontSize="small" display="flex" alignItems="center">
            <Icon
              as={SiNodeDotJs}
              color={emphasis}
              fontSize="2em"
              marginEnd={2}
            />
            Node
          </List.Item>
        </List.Root>
        <List.Root gap={3} listStyle="none">
          <List.Item fontSize="small" display="flex" alignItems="center">
            <Icon as={SiGraphql} color={emphasis} fontSize="2em" marginEnd={2} />
            Graphql
          </List.Item>
          <List.Item fontSize="small" display="flex" alignItems="center">
            <Icon as={SiReact} color={emphasis} fontSize="2em" marginEnd={2} />
            React
          </List.Item>
          <List.Item fontSize="small" display="flex" alignItems="center">
            <Icon
              as={SiNextDotJs}
              color={emphasis}
              fontSize="2em"
              marginEnd={2}
            />
            NextJS
          </List.Item>
          <List.Item fontSize="small" display="flex" alignItems="center">
            <Icon as={SiDocker} color={emphasis} fontSize="2em" marginEnd={2} />
            Docker
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
