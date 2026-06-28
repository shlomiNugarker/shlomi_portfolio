import * as React from 'react'
import type { ComponentProps } from 'react'

type PathProps = ComponentProps<'path'> & { isDarkMode?: boolean }

const Path = ({ isDarkMode, ...props }: PathProps) => (
  // isDarkMode is destructured out so it is not spread onto the DOM <path>
  // element (React warns about unknown DOM attributes otherwise).
  <path
    fill="transparent"
    strokeWidth="3"
    stroke={isDarkMode ? 'hsl(240, 100%, 94%)' : 'hsl(0, 0%, 7%)'}
    strokeLinecap="round"
    {...props}
  />
)

export const MenuToggle = ({
  toggle,
  isDarkMode = false,
}: {
  toggle(): void
  isDarkMode?: boolean
}) => (
  <button
    onClick={toggle}
    aria-label="Toggle navigation menu"
    type="button"
    style={{
      width: '40px',
      height: '40px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    <svg width="23" height="23" viewBox="0 0 23 18">
      <Path isDarkMode={isDarkMode} d="M 2 2.5 L 20 2.5" />
      <Path isDarkMode={isDarkMode} d="M 2 9.423 L 20 9.423" />
      <Path isDarkMode={isDarkMode} d="M 2 16.346 L 20 16.346" />
    </svg>
  </button>
)

const MobileMenu = ({
  isOpen,
  toggle,
  isDarkMode = false,
}: {
  isOpen: boolean
  isDarkMode: boolean
  toggle(): void
}) => (
  <nav
    style={{
      display: 'flex',
      alignItems: 'center',
    }}
  >
    <MenuToggle toggle={() => toggle()} isDarkMode={isDarkMode} />
  </nav>
)

export default MobileMenu
