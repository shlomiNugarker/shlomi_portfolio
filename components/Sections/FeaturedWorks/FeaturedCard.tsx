import { useState } from 'react'
import NextImage from 'next/image'
import styles from './styles.module.css'

export type FeaturedCardProps = {
  // One or more cover images; a gallery is shown when length > 1.
  images: string[]
  idx: number
  title: string
  description: string
  objectPosition?: string
  ctaUrl: string
  ctaLabel: string
  tags?: string[]
  // Localized badge text ("Client work" / "Personal project").
  badgeLabel: string
  // Paid client work gets a prominent accent badge; personal projects a muted one.
  isClient: boolean
}

const Tag = ({ label }: { label: string }) => (
  <span className="whitespace-nowrap rounded-full border border-black/20 bg-black/5 px-2.5 py-1 text-xs font-medium tracking-[0.02em] text-kl-accent-alt dark:border-white/30 dark:bg-white/10">
    {label}
  </span>
)

const Badge = ({ label, isClient }: { label: string; isClient: boolean }) => (
  <span
    className={`absolute start-3 top-3 z-[2] rounded-full px-2.5 py-1 text-xs font-bold uppercase tracking-[0.04em] text-white shadow-sm backdrop-blur-[6px] ${
      // teal.700 so the white label clears WCAG AA; personal badge is dark.
      isClient ? 'bg-teal-700' : 'bg-black/70'
    }`}
    style={isClient ? { backgroundColor: '#0f766e' } : undefined}
  >
    {label}
  </span>
)

const Cover = ({
  images,
  title,
  objectPosition,
  badgeLabel,
  isClient,
}: {
  images: string[]
  title: string
  objectPosition?: string
  badgeLabel: string
  isClient: boolean
}) => {
  const [active, setActive] = useState(0)
  const hasGallery = images.length > 1

  return (
    <div className="relative aspect-[16/8] w-full overflow-hidden bg-black/10 dark:bg-white/5">
      <Badge label={badgeLabel} isClient={isClient} />
      <div className="absolute inset-0">
        <NextImage
          key={images[active]}
          src={images[active]}
          alt={hasGallery ? `${title} — image ${active + 1}` : title}
          fill
          loading="lazy"
          quality={75}
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 90vw, 760px"
          style={{ objectFit: 'cover', objectPosition }}
        />
      </div>

      {hasGallery && (
        <div className="absolute bottom-1 start-1/2 z-[1] flex -translate-x-1/2 gap-0 rtl:translate-x-1/2">
          {images.map((img, i) => (
            // 24x24 transparent hit area (WCAG target size) with a small visible
            // dot centered inside.
            <button
              key={img}
              aria-label={`Show image ${i + 1}`}
              onClick={() => setActive(i)}
              className="flex h-6 w-6 cursor-pointer items-center justify-center bg-transparent"
            >
              <span
                className={`h-2 rounded-full transition-all duration-200 ${
                  i === active
                    ? 'w-[18px] bg-kl-emphasis'
                    : 'w-2 bg-black/40 dark:bg-white/50'
                }`}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

const FeaturedCard = ({
  idx,
  images,
  title,
  description,
  objectPosition,
  ctaUrl,
  ctaLabel,
  tags,
  badgeLabel,
  isClient,
}: FeaturedCardProps) => {
  return (
    <div
      className={`${styles.featureCard} group flex h-full flex-col overflow-hidden rounded-[1.25em] border border-black/10 bg-black/5 transition-colors duration-200 hover:border-teal-400 dark:border-white/20 dark:bg-white/10 dark:hover:border-teal-300`}
    >
      {/* Wide, full-bleed cover (single image or a small gallery). */}
      <Cover
        images={images}
        title={title}
        objectPosition={objectPosition}
        badgeLabel={badgeLabel}
        isClient={isClient}
      />

      {/* Content */}
      <div className="flex flex-1 flex-col gap-4 px-5 py-5 text-start md:px-7 md:py-6">
        <div className="flex flex-col gap-2">
          <div className="flex items-baseline gap-3">
            <span className="text-sm font-bold tabular-nums text-kl-accent-alt md:text-base">
              #0{idx}
            </span>
            <h3 className="text-lg font-bold uppercase tracking-wide md:text-xl">
              {title}
            </h3>
          </div>
          <hr className="border-black/10 dark:border-white/20" />
        </div>

        <p className="text-sm leading-relaxed text-kl-description md:text-base">
          {description}
        </p>

        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <Tag key={tag} label={tag} />
            ))}
          </div>
        )}

        <a
          href={ctaUrl}
          rel="noreferrer"
          target="_blank"
          className="mt-auto inline-flex h-8 items-center justify-center self-start rounded-md border border-[#595959] px-3 text-sm font-medium transition-colors hover:border-teal-400 hover:bg-[rgba(49,151,149,0.08)] dark:border-white/50 dark:hover:border-teal-300 dark:hover:bg-[rgba(157,236,249,0.08)] md:text-base"
        >
          {ctaLabel}
        </a>
      </div>
    </div>
  )
}

export default FeaturedCard
