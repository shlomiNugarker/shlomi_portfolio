export type FeaturedWork = {
  title: string
  description: string
  src: string
  ctaUrl: string
  objectPosition?: string
  tags?: string[]
}

// Featured projects shown in the "Some of my works" section. Add real projects
// here (title, description, link, and an image in /public/works).
export const FeaturedWorksList: FeaturedWork[] = [
  {
    title: 'Makeble',
    description:
      'An AI-powered website builder — describe what you want in plain English or Hebrew and it generates, previews and deploys a Next.js app live. Built with a Monaco editor and one-click deploy. "Describe it. Ship it."',
    src: '/works/makeble.webp',
    ctaUrl: 'https://makeble.vercel.app/',
    objectPosition: 'left top',
    tags: ['Next.js', 'AI', 'Monaco Editor', 'Vercel'],
  },
  {
    title: 'Wanderly',
    description:
      'A social network for travelers — plan multi-stop trips, share them as posts, and layer community routes onto an interactive map. Integrates Claude AI for itinerary generation and real-time Socket.IO for a live feed.',
    src: '/works/wanderly.webp',
    ctaUrl: 'https://wanderly-seven.vercel.app',
    objectPosition: 'left top',
    tags: ['Next.js 16', 'React 19', 'Mapbox', 'Claude AI', 'Socket.IO'],
  },
]
