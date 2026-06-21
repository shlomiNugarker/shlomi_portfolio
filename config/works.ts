export type FeaturedWork = {
  // i18n key under works.items.* in common.json (title + description).
  key: string
  // One or more cover images. When more than one is given the card shows a
  // small gallery/carousel.
  images: string[]
  ctaUrl: string
  objectPosition?: string
  tags?: string[]
}

// Featured projects shown in the "Some of my works" section. The title and
// description copy lives in public/locales/*/common.json under
// `works.items.<key>`; images, link and tech tags stay here.
export const FeaturedWorksList: FeaturedWork[] = [
  {
    key: 'makeble',
    images: ['/works/makeble.webp'],
    ctaUrl: 'https://makeble.vercel.app/',
    objectPosition: 'left top',
    tags: ['Next.js', 'AI', 'Monaco Editor', 'Vercel'],
  },
  {
    key: 'wanderly',
    images: ['/works/wanderly.webp'],
    ctaUrl: 'https://wanderly-seven.vercel.app',
    objectPosition: 'left top',
    tags: ['Next.js 16', 'React 19', 'Mapbox', 'Claude AI', 'Socket.IO'],
  },
  {
    key: 'roga',
    images: ['/works/roga1.webp', '/works/roga2.webp'],
    ctaUrl: 'https://www.rogaevents.com/',
    objectPosition: 'left top',
    tags: ['Next.js 16', 'React 19', 'Tailwind CSS 4', 'i18n / RTL', 'Markdown', 'SEO'],
  },
]
