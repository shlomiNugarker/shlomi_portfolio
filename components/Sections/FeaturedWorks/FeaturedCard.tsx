import { useState } from 'react'
import NextImage from 'next/image'
import { RiGithubFill } from 'react-icons/ri'
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
  // Optional public source repo + its localized label ("Code").
  repoUrl?: string
  repoLabel: string
  tags?: string[]
  // Localized badge text ("Client work" / "Personal project").
  badgeLabel: string
  // Paid client work gets a prominent accent badge; personal projects a muted one.
  isClient: boolean
}

const Tag = ({ label }: { label: string }) => (
  <span className="whitespace-nowrap rounded-full border border-kl-border-strong bg-kl-surface px-2.5 py-1 text-xs font-medium tracking-[0.02em] text-kl-description">
    {label}
  </span>
)

const Badge = ({ label, isClient }: { label: string; isClient: boolean }) => (
  <span
    className={`absolute start-3 top-3 z-[2] rounded-full px-2.5 py-1 text-xs font-bold uppercase tracking-[0.04em] text-kl-on-accent shadow-sm backdrop-blur-[6px] ${
      // Accent fill for client work (white label clears WCAG AA); neutral
      // overlay for personal projects.
      isClient ? 'bg-kl-accent-strong' : 'bg-black/70'
    }`}
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
    <div className="relative aspect-[16/8] w-full overflow-hidden bg-kl-surface-strong">
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
                    : 'w-2 bg-kl-muted'
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
  repoUrl,
  repoLabel,
  tags,
  badgeLabel,
  isClient,
}: FeaturedCardProps) => {
  return (
    <div
      className={`${styles.featureCard} group flex h-full flex-col overflow-hidden rounded-[1.25em] border border-kl-border bg-kl-surface transition-colors duration-200 hover:border-kl-accent-hover`}
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
          <hr className="border-kl-border" />
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

        <div className="mt-auto flex flex-wrap items-center gap-2">
          <a
            href={ctaUrl}
            rel="noreferrer"
            target="_blank"
            className="inline-flex h-8 items-center justify-center rounded-md border border-kl-muted px-3 text-sm font-medium transition-colors hover:border-kl-accent-hover hover:bg-kl-accent-soft md:text-base"
          >
            {ctaLabel}
          </a>
          {repoUrl && (
            <a
              href={repoUrl}
              rel="noreferrer"
              target="_blank"
              className="inline-flex h-8 items-center justify-center gap-1.5 rounded-md border border-kl-muted px-3 text-sm font-medium transition-colors hover:border-kl-accent-hover hover:bg-kl-accent-soft md:text-base"
            >
              <RiGithubFill aria-hidden />
              {repoLabel}
            </a>
          )}
        </div>
      </div>
    </div>
  )
}

export default FeaturedCard
