import { memo } from 'react'
import { Heading, Text, Stack, Link, Icon, Box, HStack } from '@chakra-ui/react'
import { useTranslation } from 'next-i18next/pages'
import { RiCopyrightLine, RiGithubFill, RiMailLine } from 'react-icons/ri'
import { FaWhatsapp } from 'react-icons/fa'
import { LinkButton } from 'components/ui/link-button'
import { whatsappUrl, PERSON } from 'config/seo'

// Inline links inside the body copy. The body Text sets a muted color, so a
// bare <Link> blends in and reads as plain text — give these an explicit accent
// color, weight and a persistent underline so it's obvious they're clickable.
const InlineLink = ({
  href,
  children,
}: {
  href: string
  children: React.ReactNode
}) => (
  <Link
    href={href}
    target="_blank"
    rel="noreferrer"
    color="kl.emphasis"
    fontWeight="semibold"
    textDecoration="underline"
    textUnderlineOffset="3px"
    _hover={{ textDecoration: 'none' }}
  >
    {children}
  </Link>
)

const GetInTouch = () => {
  const { t } = useTranslation('common')
  return (
    <Stack
      width={{ base: '99%', xl: '75%' }}
      height="100%"
      gap={{ base: 6, xl: 8 }}
      textAlign={{ base: 'center', xl: 'start' }}
      as="footer"
    >
      <Heading
        size={{ base: '4xl', xl: '5xl' }}
        style={{
          fontVariantCaps: 'small-caps',
        }}
      >
        {t('contact.heading')}{' '}
        <Text as="span" fontSize="2xl" color="kl.emphasis">
          (⁀ᗢ⁀)
        </Text>
      </Heading>
      <Text
        color="kl.description"
        fontSize={{ base: 'sm', md: 'md', '2xl': 'lg' }}
        lineHeight="tall"
      >
        {t('contact.body')}{' '}
        <InlineLink href="https://www.linkedin.com/in/shlomi-nugarker-b89777155/">
          {t('contact.linkedin')}
        </InlineLink>{' '}
        {t('contact.or_email')}{' '}
        <InlineLink href="mailto:shlomin1231@gmail.com">
          {t('contact.email')}
        </InlineLink>
        .
      </Text>

      {/* Primary CTAs, kept on the site's teal/cyan accent so the palette stays
          tight. WhatsApp is the primary (filled accent) action; email the
          secondary outline action. */}
      <HStack
        gap={3}
        flexWrap="wrap"
        justify={{ base: 'center', xl: 'flex-start' }}
      >
        <LinkButton
          href={whatsappUrl()}
          target="_blank"
          rel="noreferrer"
          variant="outline"
          borderWidth="1px"
          borderColor={{ base: 'teal.500', _dark: 'cyan.200' }}
          color="kl.emphasis"
          _hover={{
            bg: {
              base: 'rgba(49, 151, 149, 0.08)',
              _dark: 'rgba(157, 236, 249, 0.08)',
            },
            borderColor: { base: 'teal.400', _dark: 'teal.300' },
          }}
          borderRadius="md"
          fontWeight="semibold"
          size="lg"
        >
          <Icon as={FaWhatsapp} marginEnd={2} />
          {t('contact.cta_whatsapp')}
        </LinkButton>
        <LinkButton
          href={`mailto:${PERSON.email}`}
          variant="outline"
          borderWidth="1px"
          borderColor={{ base: '#595959', _dark: 'whiteAlpha.500' }}
          _hover={{ borderColor: { base: 'teal.400', _dark: 'teal.300' } }}
          borderRadius="md"
          fontWeight="medium"
          size="lg"
        >
          <Icon as={RiMailLine} marginEnd={2} />
          {t('contact.cta_email')}
        </LinkButton>
      </HStack>

      <Box
        textAlign="center"
        fontFamily="monospace"
        paddingTop={{ base: 10, lg: 20, xl: 20 }}
        paddingBottom={{ base: 5, lg: 18 }}
      >
        <Link
          color="kl.description"
          textDecoration="none"
          rel="noreferrer"
          href="https://github.com/shlomiNugarker"
          target="_blank"
          _focus={{ boxShadow: 'none' }}
        >
          <Text as="span">
            <Icon as={RiGithubFill} h={6} w={6} /> <br />
            {t('sidebar.name')} <Icon as={RiCopyrightLine} />{' '}
            {new Date().getFullYear()}
          </Text>
        </Link>
      </Box>
    </Stack>
  )
}

export default memo(GetInTouch)
