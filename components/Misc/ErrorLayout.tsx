import { Box, Heading, Text, Stack } from '@chakra-ui/react'
import { LinkButton } from 'components/ui/link-button'
import Head from 'next/head'
import { useTranslation } from 'next-i18next/pages'

type ErrorLayoutProps = {
  code: string
  // i18n keys (resolved against the `common` namespace).
  titleKey: string
  messageKey: string
  // Literal English fallbacks for pages that can't load translations
  // (e.g. 500.tsx, which Pages Router renders without data fetching). Used
  // whenever the key fails to resolve.
  fallbackTitle: string
  fallbackMessage: string
}

// Shared layout for the custom 404 / 500 pages. Matches the site theme (dark
// background, cyan accent, Poppins) and stays lightweight — no animations.
const ErrorLayout = ({
  code,
  titleKey,
  messageKey,
  fallbackTitle,
  fallbackMessage,
}: ErrorLayoutProps) => {
  const { t } = useTranslation('common')
  // t() returns the key itself when no translation is loaded; fall back then.
  const resolved = (key: string, fallback: string) => {
    const value = t(key)
    return value === key ? fallback : value
  }
  const title = resolved(titleKey, fallbackTitle)
  const message = resolved(messageKey, fallbackMessage)
  const backHome = resolved('error.back_home', 'Back home')

  return (
    <>
      <Head>
        <title>{`${code} — ${title} | Shlomi Nugarker`}</title>
        <meta name="robots" content="noindex" />
      </Head>
      <Box
        as="main"
        minH="100vh"
        display="flex"
        alignItems="center"
        justifyContent="center"
        paddingX={6}
        textAlign="center"
      >
        <Stack gap={6} maxWidth="lg" alignItems="center">
          <Heading
            as="h1"
            size="7xl"
            color="kl.emphasis"
            lineHeight={1}
            style={{ fontVariantCaps: 'small-caps' }}
          >
            {code}
          </Heading>
          <Heading as="h2" size="xl">
            {title}
          </Heading>
          <Text color="kl.description" fontSize={{ base: 'sm', md: 'md' }}>
            {message}
          </Text>
          <LinkButton
            href="/"
            variant="outline"
            borderRadius={0}
            borderWidth="1px"
            fontWeight="light"
            size="lg"
          >
            {backHome}
          </LinkButton>
        </Stack>
      </Box>
    </>
  )
}

export default ErrorLayout
