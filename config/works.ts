export type FeaturedWork = {
  title: string
  description: string
  src: string
  ctaUrl: string
  objectPosition?: string
}

// Featured projects shown in the "Some of my works" section. Kept here as data
// (mirrors the config/experience.tsx pattern) so the component stays presentational.
export const FeaturedWorksList: FeaturedWork[] = [
  {
    title: 'Tobira!',
    description:
      'Japanese social media platform for travelers to show off their adventure to the world. I was incharge of Front end integration, made using React, Antd and Styled Components.',
    src: '/works/tobira/IphoneX-tobira.webp',
    ctaUrl: 'https://tobira-app-test.netlify.app/',
    objectPosition: 'right 20%',
  },
  {
    title: 'RSV',
    description:
      'RSV is a smart contract (ERC20) powered reservation system. I am incharge of backend using NET.Core 2.1.',
    src: '/works/rsv.webp',
    ctaUrl: 'https://solution.rsv.ltd/jp',
  },
  {
    title: 'Agora School',
    description:
      'A quizz - reviewer LMS, I made as a freelancer. Backend were powered by PHPSlim and VueJS for Front end.',
    src: '/works/agora.webp',
    ctaUrl: 'https://dev.agora-school.com',
    objectPosition: 'right 20%',
  },
  {
    title: 'TMH Layla EC',
    description:
      'A Japanese Semi-conductor e-commerce made at my old place at IVP. I was working with backend using ASP.NET MVC',
    src: '/works/tmh.webp',
    ctaUrl: 'https://www.layla-ec.com/',
  },
]
