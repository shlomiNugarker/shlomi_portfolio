// Whether a project was paid client work or a self-initiated build. Surfaced as
// a small badge on the card so prospective clients can see real commercial
// experience at a glance.
export type WorkType = 'client' | 'personal'

export type FeaturedWork = {
  // i18n key under works.items.* in common.json (title + description).
  key: string
  // One or more cover images. When more than one is given the card shows a
  // small gallery/carousel.
  images: string[]
  ctaUrl: string
  // Public source repo. Shown as a secondary "Code" link — a strong trust
  // signal for developers, since readable code is proof of competence. Omit
  // for private/client repos.
  repoUrl?: string
  objectPosition?: string
  tags?: string[]
  // 'client' = real paid client work, 'personal' = self-initiated project.
  type: WorkType
}

// Featured projects shown in the "Some of my works" section. The title and
// description copy lives in public/locales/*/common.json under
// `works.items.<key>`; images, link and tech tags stay here.
export const FeaturedWorksList: FeaturedWork[] = [
  {
    key: 'roga',
    images: ['/works/roga1.webp', '/works/roga2.webp'],
    ctaUrl: 'https://www.rogaevents.com/',
    objectPosition: 'left top',
    tags: ['Next.js 16', 'React 19', 'Tailwind CSS 4', 'i18n / RTL', 'Markdown', 'SEO'],
    type: 'client',
  },
  {
    key: 'makeble',
    images: ['/works/makeble.webp'],
    ctaUrl: 'https://makeble.vercel.app/',
    // TODO: set the real public repo URL (e.g. https://github.com/shlomiNugarker/makeble)
    // so the "Code" link appears. Remove this line if the repo is private.
    repoUrl: undefined,
    objectPosition: 'left top',
    tags: ['Next.js', 'AI', 'Monaco Editor', 'Vercel'],
    type: 'personal',
  },
  {
    key: 'wanderly',
    images: ['/works/wanderly.webp'],
    ctaUrl: 'https://wanderly-seven.vercel.app',
    // TODO: set the real public repo URL (e.g. https://github.com/shlomiNugarker/wanderly)
    // so the "Code" link appears. Remove this line if the repo is private.
    repoUrl: undefined,
    objectPosition: 'left top',
    tags: ['Next.js 16', 'React 19', 'Mapbox', 'Claude AI', 'Socket.IO'],
    type: 'personal',
  },
]

// Real, verifiable counts derived from the project list above — used by the
// About "proof strip". Nothing is asserted that isn't backed by an entry here,
// so the numbers update automatically as projects are added or changed.
export const workStats = {
  shipped: FeaturedWorksList.length,
  clients: FeaturedWorksList.filter((w) => w.type === 'client').length,
}
