import { IconType } from 'react-icons'
import {
  SiReact,
  SiNodedotjs,
  SiNextdotjs,
  SiPostgresql,
} from 'react-icons/si'

export type Service = {
  title: string
  description: string
  icon: IconType
}

// What I offer as a freelancer. Edit freely — this drives the "What I do"
// services section.
export const Services: Service[] = [
  {
    title: 'Web Applications',
    description:
      'Small-to-mid web apps built end-to-end — from data model and API to the interface users actually touch.',
    icon: SiReact,
  },
  {
    title: 'Frontend Development',
    description:
      'Responsive, accessible interfaces with React, Next.js and TypeScript that stay fast and easy to maintain.',
    icon: SiNextdotjs,
  },
  {
    title: 'Backend & APIs',
    description:
      'REST APIs and server-side logic with Node.js and Express, wired to the right database for the job.',
    icon: SiNodedotjs,
  },
  {
    title: 'Databases & Integration',
    description:
      'Data modeling and integrations across PostgreSQL, MongoDB, Supabase and Firebase.',
    icon: SiPostgresql,
  },
]
