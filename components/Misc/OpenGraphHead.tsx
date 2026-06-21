import Head from 'next/head'

const SITE_URL = 'https://www.shlomi.dev'

const OpenGraphHead = () => (
  <Head>
    <title>Shlomi Nugarker | Full-Stack Developer</title>
    <meta
      name="description"
      content="Shlomi Nugarker — full-stack developer based in Israel, building web apps end-to-end from database to interface."
    />
    <link rel="canonical" href={SITE_URL} />
    <meta property="og:title" content="Shlomi Nugarker | Full-Stack Developer" />
    <meta property="og:site_name" content="Shlomi Nugarker" />
    <meta property="og:url" content={SITE_URL} />
    <meta
      property="og:description"
      content="Full-stack developer based in Israel. I build websites and web applications end-to-end — from the database and API to the interface."
    />
    <meta property="og:type" content="profile" />
    <meta property="og:image" content={`${SITE_URL}/KL_avatar.png`} />
    <meta name="twitter:card" content="summary" />
  </Head>
)
export default OpenGraphHead
