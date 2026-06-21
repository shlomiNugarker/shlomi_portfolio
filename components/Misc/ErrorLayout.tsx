import type { ReactNode } from 'react'
import { Box, Heading, Text, Stack } from '@chakra-ui/react'
import { LinkButton } from 'components/ui/link-button'
import Head from 'next/head'

type ErrorLayoutProps = {
  code: string
  title: string
  message: ReactNode
}

// Shared layout for the custom 404 / 500 pages. Matches the site theme (dark
// background, cyan accent, Poppins) and stays lightweight — no animations.
const ErrorLayout = ({ code, title, message }: ErrorLayoutProps) => (
  <>
    <Head>
      <title>{`${code} — ${title} | KL Lawingco`}</title>
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
        <Text color="kl.description" fontSize="md">
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
          Back home
        </LinkButton>
      </Stack>
    </Box>
  </>
)

export default ErrorLayout
