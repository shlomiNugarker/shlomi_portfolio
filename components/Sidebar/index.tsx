import { useTranslation } from 'next-i18next/pages'
import { useColorMode } from 'components/ui/color-mode'
import styles from './styles.module.css'
import { SocialMedias } from 'config/sidebar'

const Sidebar = () => {
  const { t } = useTranslation('common')
  const { colorMode } = useColorMode()

  return (
    <div className="w-full xl:fixed xl:top-0 xl:max-w-[34%]">
      {/* Decorative arc, mirrored for RTL via the wrapper (.circleWrap). Shown
          only on lg+; light mode swaps the stroke to black via .dark. */}
      <div className={styles.circleWrap}>
        <div
          id="sidebarCircle"
          className={`${styles.sidebar} hidden lg:block ${
            colorMode === 'light' ? styles.dark : ''
          }`}
          style={{ opacity: 1 }}
        ></div>
      </div>
      <div className="mx-auto flex w-full max-w-[60ch] flex-col items-center gap-3 p-0 text-center xl:mx-0 xl:h-screen xl:max-w-none xl:items-start xl:justify-center xl:text-start">
        <div className="flex w-full flex-col items-center gap-3 xl:items-start">
          <p className="font-light text-base text-kl-accent md:text-lg">
            {t('sidebar.greeting')}
          </p>
          <h1 className="text-xl font-bold uppercase xl:pe-20">
            {t('sidebar.name')}
          </h1>
          <h2 className="text-4xl font-bold uppercase leading-none text-kl-emphasis xl:text-5xl">
            {t('sidebar.headline_line1')} <br />
            {t('sidebar.headline_line2')}
          </h2>
          <p className="text-sm md:text-base">{t('sidebar.location')}</p>

          <p className="max-w-full text-sm leading-relaxed text-kl-description md:text-base xl:max-w-[80%] xl:pe-12">
            {t('sidebar.intro')}
            <span className="text-kl-emphasis"> {t('sidebar.welcome')}</span>
            <br />
            {t('sidebar.description')}
          </p>

          <a
            href="mailto:shlomin1231@gmail.com"
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-12 w-[120px] items-center justify-center border border-current text-sm font-normal transition-colors hover:bg-black/5 dark:hover:bg-white/5"
          >
            {t('sidebar.cta')}
          </a>

          <div className="flex justify-center xl:justify-start">
            {SocialMedias.map((socMedia) => {
              const isExternal = socMedia.href.startsWith('http')
              const SocialIcon = socMedia.icon
              return (
                <a
                  key={socMedia.label}
                  aria-label={t(`social.${socMedia.label.toLowerCase()}`)}
                  rel={isExternal ? 'noreferrer' : undefined}
                  href={socMedia.href}
                  target={isExternal ? '_blank' : undefined}
                  className="flex w-8 text-kl-description outline-none"
                >
                  <SocialIcon aria-hidden className="h-6 w-6" />
                </a>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
