import { memo } from 'react'
import { useTranslation } from 'next-i18next/pages'
import { Services as ServicesList } from 'config/services'

const ServicesSection = () => {
  const { t } = useTranslation('common')
  return (
    <div className="flex h-full mx-auto w-[99%] max-w-2xl flex-col gap-6 text-center xl:mx-0 xl:max-w-none xl:w-3/4 xl:gap-8 xl:text-start">
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
              className="rounded-2xl border border-kl-border-strong bg-kl-surface p-5 xl:p-6"
            >
              <Icon aria-hidden className="mb-3 size-9 text-kl-emphasis" />
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
