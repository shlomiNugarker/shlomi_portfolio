import { memo } from 'react'
import { useTranslation } from 'next-i18next/pages'
import FeaturedCard from './FeaturedCard'
import { FeaturedWorksList } from 'config/works'

const FeaturedWorksSection = () => {
  const { t } = useTranslation('common')
  return (
    <div className="flex h-full w-[99%] flex-col gap-6 text-center xl:w-3/4 xl:gap-8 xl:text-start">
      <h2
        className="text-4xl font-bold xl:text-5xl"
        style={{ fontVariantCaps: 'small-caps' }}
      >
        {t('works.heading')}
      </h2>
      <p className="text-sm leading-relaxed text-kl-description md:text-base 2xl:text-lg">
        {t('works.description')}
      </p>

      <div className="mt-2 grid grid-cols-1 gap-6 md:gap-8">
        {FeaturedWorksList.map((work, index) => (
          <div key={work.key} className="h-full">
            <FeaturedCard
              idx={index + 1}
              title={t(`works.items.${work.key}.title`)}
              images={work.images}
              description={t(`works.items.${work.key}.description`)}
              ctaUrl={work.ctaUrl}
              objectPosition={work.objectPosition}
              tags={work.tags}
              ctaLabel={t('works.view_project')}
              badgeLabel={t(
                work.type === 'client'
                  ? 'works.badge_client'
                  : 'works.badge_personal'
              )}
              isClient={work.type === 'client'}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default memo(FeaturedWorksSection)
