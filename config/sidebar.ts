import { IconType } from 'react-icons'
import { FaLinkedin, FaGithub, FaEnvelope } from 'react-icons/fa'

type SocialMedia = {
  label: string
  href: string
  icon: IconType
}

export const SocialMedias: SocialMedia[] = [
  {
    label: 'GitHub',
    href: 'https://github.com/shlomiNugarker',
    icon: FaGithub,
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/shlomi-nugarker/',
    icon: FaLinkedin,
  },
  {
    label: 'Email',
    href: 'mailto:shlomin1231@gmail.com',
    icon: FaEnvelope,
  },
]
