import type { ComponentProps } from 'react'

// Strokes inherit the current text color so the icon follows the theme via the
// surrounding `text-kl-*` / `dark:` utilities — no isDarkMode prop threading.
const Path = (props: ComponentProps<'path'>) => (
  <path
    fill="transparent"
    stroke="currentColor"
    strokeWidth="3"
    strokeLinecap="round"
    {...props}
  />
)

export const MenuToggle = ({
  toggle,
  isOpen = false,
}: {
  toggle(): void
  isOpen?: boolean
}) => (
  <button
    onClick={toggle}
    aria-label="Toggle navigation menu"
    aria-expanded={isOpen}
    type="button"
    className="flex h-10 w-10 items-center justify-center text-kl-emphasis"
  >
    {/* Three bars when closed, an X when open. */}
    <svg width="23" height="23" viewBox="0 0 23 18" aria-hidden>
      {isOpen ? (
        <>
          <Path d="M 3 3 L 20 16" />
          <Path d="M 3 16 L 20 3" />
        </>
      ) : (
        <>
          <Path d="M 2 2.5 L 20 2.5" />
          <Path d="M 2 9.423 L 20 9.423" />
          <Path d="M 2 16.346 L 20 16.346" />
        </>
      )}
    </svg>
  </button>
)

export default MenuToggle
