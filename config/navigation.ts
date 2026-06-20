// Top navigation links. The About link points to the top of the page on
// desktop (`#`) but to the about section on mobile, so its href is resolved at
// render time via the `mobileHref` flag.
export type NavLink = {
  label: string
  href: string
  mobileHref?: string
}

export const NavLinks: NavLink[] = [
  { label: 'About', href: '#', mobileHref: '#aboutMe' },
  { label: 'Experience', href: '#jobs' },
  { label: 'Works', href: '#works' },
  { label: 'Contact', href: '#contact' },
]
