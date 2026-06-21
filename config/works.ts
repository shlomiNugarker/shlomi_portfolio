export type FeaturedWork = {
  title: string
  description: string
  src: string
  ctaUrl: string
  objectPosition?: string
}

// Featured projects shown in the "Some of my works" section. These are
// placeholders — swap in your real projects (title, description, link, and an
// image in /public/works) when ready.
export const FeaturedWorksList: FeaturedWork[] = [
  {
    title: 'Project One',
    description:
      'A short description of the project — what it does, your role, and the stack you used.',
    src: '/works/placeholder.svg',
    ctaUrl: '#',
  },
  {
    title: 'Project Two',
    description:
      'A short description of the project — what it does, your role, and the stack you used.',
    src: '/works/placeholder.svg',
    ctaUrl: '#',
  },
  {
    title: 'Project Three',
    description:
      'A short description of the project — what it does, your role, and the stack you used.',
    src: '/works/placeholder.svg',
    ctaUrl: '#',
  },
]
