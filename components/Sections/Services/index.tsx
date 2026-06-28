import { memo } from 'react'
import { useTranslation } from 'next-i18next/pages'
import { Services as ServicesList } from 'config/services'

const ServicesSection = () => {
  const { t } = useTranslation('common')
  return (
    <div className="flex h-full w-[99%] flex-col gap-6 text-center xl:w-3/4 xl:gap-8 xl:text-start">
      <h2
        className="text-4xl font-bold xl:text-5xl"
        style={{ fontVariantCaps: 'small-caps' }}
      >
        {t('services.heading')}
      </h2>
      <p className="text-sm leading-relaxed text-kl-description md:text-base 2xl:text-lg">
        {t('services.description')}
      </p>

      <div className="grid grid-cols-1 gap-4 text-start md:grid-cols-2 md:gap-6">
        {ServicesList.map((service) => {
          const Icon = service.icon
          return (
            <div
              key={service.key}
              className="rounded-2xl border border-black/20 bg-black/5 p-5 dark:border-white/10 dark:bg-white/10 xl:p-6"
            >
              <Icon className="mb-3 size-9 text-kl-emphasis" />
              <h3 className="mb-2 text-lg font-bold md:text-xl">
                {t(`services.items.${service.key}.title`)}
              </h3>
              <p className="text-sm leading-relaxed text-kl-description md:text-base">
                {t(`services.items.${service.key}.description`)}
              </p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default memo(ServicesSection)
