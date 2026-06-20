 
import {
  Text,
  Link,
  Stack,
  Tabs,
  List,
  Icon,
  Box,
  useBreakpointValue,
} from '@chakra-ui/react'
import NextImage from 'next/image'
import { useColorMode, useColorModeValue } from 'components/ui/color-mode'
import { BiRightArrow } from 'react-icons/bi'
import styles from './styles.module.css'
import { ExperiencesList } from 'config/experience'
import { mobileBreakpointsMap } from 'config/theme'

const ExperienceTab = () => {
  const { colorMode } = useColorMode()
  const emphasis = useColorModeValue('teal.500', 'cyan.200')
  const borderColor = useColorModeValue('gray.300', 'gray.600')
  const activeBordercolor = useColorModeValue('teal.500', '#97DFFC')
  const isMobile = useBreakpointValue(mobileBreakpointsMap)

  const tabOrientation =
    useBreakpointValue({
      base: 'horizontal',
      sm: 'horizontal',
      md: 'vertical',
      lg: 'vertical',
      xl: 'vertical',
    }) ?? ('vertical' as any)

  const tabMinWidth = useBreakpointValue({
    base: '160px',
    sm: '160px',
    md: 'auto',
    lg: 'auto',
    xl: 'auto',
  })
  return (
    <Tabs.Root
      id="experienceTabs"
      orientation={tabOrientation}
      defaultValue={ExperiencesList[0]?.name}
      lazyMount
      unmountOnExit={false}
      variant="plain"
      display="flex"
      flexDirection={tabOrientation === 'vertical' ? 'row' : 'column'}
      gap={{ base: 0, md: 6 }}
    >
      <Tabs.List
        flexShrink={0}
        flexDirection={tabOrientation === 'vertical' ? 'column' : 'row'}
        width="auto"
        borderColor="transparent"
        overflowX={tabOrientation === 'vertical' ? 'visible' : 'auto'}
        overflowY="hidden"
        className={styles.experienceTabs}
      >
        {ExperiencesList.map((company) => (
          <Tabs.Trigger
            value={company.name}
            key={`Tab-${company.name}`}
            fontSize="smaller"
            h="120px"
            width="auto"
            minWidth={tabMinWidth}
            justifyContent="center"
            paddingX={6}
            boxShadow="none"
            borderRadius={0}
            borderColor={borderColor}
            borderLeftWidth={tabOrientation === 'vertical' ? '4px' : '0'}
            borderBottomWidth={tabOrientation === 'horizontal' ? '4px' : '0'}
            _selected={{
              borderColor: activeBordercolor,
              boxShadow: 'none',
              borderLeftWidth: tabOrientation === 'vertical' ? '4px' : '0',
              borderBottomWidth: tabOrientation === 'horizontal' ? '4px' : '0',
              background: 'whiteAlpha.100',
            }}
          >
            <NextImage
              src={
                (colorMode === 'dark'
                  ? company.logo.dark
                  : company.logo.light) ?? company.logo.light
              }
              alt={company.longName}
              width={88}
              height={88}
              style={{ width: '88px', height: 'auto', objectFit: 'contain' }}
            />
          </Tabs.Trigger>
        ))}
      </Tabs.List>
      {ExperiencesList.map((company) => (
        <Tabs.Content value={company.name} key={`TabPanel-${company.name}`}>
          <Box>
            <Stack gap={0}>
              <Text
                as="span"
                fontSize="lg"
                fontWeight="bold"
                color="kl.description"
              >
                {company.position}
              </Text>
              <Text as="span">
                <Link
                  href={company.url}
                  aria-label="scentregroup"
                  rel="noreferrer"
                  target="_blank"
                  fontSize="lg"
                  fontWeight="bold"
                >
                  #{company.name}
                </Link>
                <Text
                  as="span"
                  textTransform="none"
                  fontSize="x-small"
                  color="kl.description"
                >
                  {' '}
                  {company.subDetail}
                </Text>
              </Text>
              <Text fontSize="smaller">{company.duration}</Text>
            </Stack>
            <List.Root gap={3} pt={5} listStyle="none">
              {company.roles?.map((roleDesc, idx) => (
                <List.Item
                  key={`${company.name}-desc-${idx}`}
                  fontSize="smaller"
                  display="flex"
                  alignItems="center"
                  justifyContent="flex-start"
                >
                  <Icon
                    as={BiRightArrow}
                    color={emphasis}
                    display="block"
                    marginEnd={2}
                  />
                  <Text as="span" display="block" color="kl.description">
                    {roleDesc}
                  </Text>
                </List.Item>
              ))}
            </List.Root>
          </Box>
        </Tabs.Content>
      ))}
    </Tabs.Root>
  )
}

export default ExperienceTab
