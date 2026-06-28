import { useState, useCallback } from 'react'
import { NavLinks } from 'config/navigation'
import { useColorMode } from 'components/ui/color-mode'
import { useTranslation } from 'next-i18next/pages'
import { BsSun as SunIcon, BsMoon as MoonIcon } from 'react-icons/bs'
import styles from './styles.module.css'
import { MenuToggle } from './toggle'
import LanguageSwitcher from './LanguageSwitcher'
import useScrollDirection, { ScrollDirection } from 'hooks/useScrollDirection'

const Navigation = () => {
  const { t } = useTranslation('common')
  const { toggleColorMode, colorMode } = useColorMode()
  const [isOpen, setIsOpen] = useState(false)
  const toggleOpen = useCallback(() => setIsOpen((v) => !v), [])
  const scrollDirection = useScrollDirection()

  const isDark = colorMode === 'dark'
  const Icon = isDark ? SunIcon : MoonIcon
  // Desktop-only, post-mount interaction — never affects first paint.
  const collapsed = scrollDirection === ScrollDirection.Down

  return (
    <>
      {/* Mobile/tablet control bar — shown via CSS below xl (flex xl:hidden),
          so it's correct on first paint with no isMobile hydration jump. */}
      <div className="z-[100] flex items-center pt-1 xl:hidden">
        <button
          aria-label={t('a11y.color_mode')}
          onClick={toggleColorMode}
          className="flex h-10 w-10 items-center justify-center rounded-md bg-transparent hover:bg-black/5 dark:hover:bg-white/10"
        >
          <Icon aria-hidden />
        </button>
        <LanguageSwitcher />
        <MenuToggle toggle={toggleOpen} isOpen={isOpen} />
      </div>

      {/* Nav panel: full-screen overlay below xl (toggled by data-open via CSS),
          floating top-end bar at xl. All breakpoint behavior is in CSS. */}
      <nav
        data-open={isOpen ? 'true' : 'false'}
        data-collapsed={collapsed ? 'true' : 'false'}
        className={`${styles.menu} ${styles.navPanel}`}
      >
        <div className={styles.navInner} onClick={() => toggleOpen()}>
          {NavLinks.map((link, index) => (
            <div
              key={link.key}
              className={`w-full text-center lg:w-auto lg:text-start ${
                index === 0 ? '' : 'my-2 lg:my-0'
              }`}
            >
              <a
                href={link.mobileHref ?? link.href}
                rel="noreferrer"
                onClick={(e) => e.stopPropagation()}
                className={`${styles.blogBtn} ${!isDark ? styles.dark : ''} mx-2 inline-block p-2 font-light tracking-[2px] text-xl lg:text-sm`}
              >
                {t(`nav.${link.key}`)}
              </a>
            </div>
          ))}
          {/* Desktop-only color toggle + language (hidden below xl via CSS) */}
          <div className="hidden items-center xl:flex">
            <button
              aria-label={t('a11y.color_mode')}
              onClick={toggleColorMode}
              className="mx-1 flex h-10 w-10 items-center justify-center rounded-md bg-transparent hover:bg-black/5 dark:hover:bg-white/10"
            >
              <Icon aria-hidden />
            </button>
            <LanguageSwitcher />
          </div>
        </div>
      </nav>
    </>
  )
}

export default Navigation
