import { useState, useCallback } from 'react'
import { NavLinks } from 'config/navigation'
import { useColorMode } from 'components/ui/color-mode'
import { useTranslation } from 'next-i18next/pages'
import { BsSun as SunIcon, BsMoon as MoonIcon } from 'react-icons/bs'
import styles from './styles.module.css'
import MobileMenu from './toggle'
import LanguageSwitcher from './LanguageSwitcher'
import { useIsMobile } from 'hooks/useMediaQuery'
import useScrollDirection, { ScrollDirection } from 'hooks/useScrollDirection'

const Navigation = () => {
  const { t } = useTranslation('common')
  const { toggleColorMode, colorMode } = useColorMode()
  const [isOpen, setIsOpen] = useState(false)
  const toggleOpen = useCallback(() => setIsOpen((v) => !v), [])
  const isMobile = useIsMobile()
  const scrollDirection = useScrollDirection()

  const isDark = colorMode === 'dark'
  const Icon = isDark ? SunIcon : MoonIcon
  const collapsed = !isMobile && scrollDirection === ScrollDirection.Down

  const onMenuItemClick = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation()
      if (isMobile) toggleOpen()
    },
    [isMobile, toggleOpen]
  )

  return (
    <>
      {/* Mobile control bar (toggle + language + hamburger) */}
      <div
        className="z-[100] flex items-center pt-1 top-[3%]"
        style={{ display: isMobile ? 'flex' : 'none' }}
      >
        <button
          aria-label={t('a11y.color_mode')}
          onClick={toggleColorMode}
          className="flex h-10 w-10 items-center justify-center rounded-md bg-transparent hover:bg-black/5 dark:hover:bg-white/10"
        >
          <Icon aria-hidden />
        </button>
        <LanguageSwitcher />
        <MobileMenu isDarkMode={isDark} toggle={toggleOpen} isOpen={isOpen} />
      </div>

      {/* Nav panel: fixed top-end bar on desktop; full-screen overlay on mobile */}
      <nav
        className={`${styles.menu} w-full max-w-full pt-1 lg:max-w-[50%] xl:max-w-[60%] ${
          isMobile && isOpen ? 'bg-kl-bg' : 'bg-transparent'
        }`}
        style={
          isMobile
            ? // Mobile: a full-screen opaque overlay when open; parked fully
              // off-screen (and non-interactive) when closed.
              {
                position: 'fixed',
                inset: 0,
                width: '100vw',
                height: '100vh',
                zIndex: 50,
                top: isOpen ? 0 : '-100vh',
                opacity: isOpen ? 1 : 0,
                pointerEvents: isOpen ? 'auto' : 'none',
              }
            : {
                // Desktop: fixed bar at the top inline-end edge; collapses on
                // scroll-down.
                width: collapsed ? '12%' : '100%',
                insetInlineEnd: collapsed ? '2%' : '3.5%',
              }
        }
      >
        <div
          className={`flex justify-center pe-0 lg:justify-end ${
            collapsed ? 'lg:flex-col lg:py-10' : 'lg:flex-row lg:py-3'
          } flex-col py-10 sm:px-10 lg:px-0`}
          style={{
            height: isMobile ? '100vh' : 'auto',
            paddingBottom: isMobile ? '2.5rem' : '0',
          }}
          onClick={() => isMobile && toggleOpen()}
        >
          {NavLinks.map((link, index) => (
            <div
              key={link.key}
              className={`w-full text-center lg:w-auto lg:text-start ${
                index === 0 ? '' : 'my-2 lg:my-0'
              }`}
            >
              <a
                href={
                  isMobile && link.mobileHref ? link.mobileHref : link.href
                }
                rel="noreferrer"
                onClick={onMenuItemClick}
                className={`${styles.blogBtn} ${!isDark ? styles.dark : ''} mx-2 inline-block p-2 font-light tracking-[2px] ${
                  isMobile ? 'text-xl' : 'text-sm'
                }`}
              >
                {t(`nav.${link.key}`)}
              </a>
            </div>
          ))}
          {!isMobile && (
            <div className="flex items-center">
              <button
                aria-label={t('a11y.color_mode')}
                onClick={toggleColorMode}
                className="mx-1 flex h-10 w-10 items-center justify-center rounded-md bg-transparent hover:bg-black/5 dark:hover:bg-white/10"
              >
                <Icon aria-hidden />
              </button>
              <LanguageSwitcher />
            </div>
          )}
        </div>
      </nav>
    </>
  )
}

export default Navigation
