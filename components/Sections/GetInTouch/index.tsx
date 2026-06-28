import { memo } from 'react'
import { useTranslation } from 'next-i18next/pages'
import { RiCopyrightLine, RiGithubFill, RiMailLine } from 'react-icons/ri'
import { FaWhatsapp } from 'react-icons/fa'
import { whatsappUrl, PERSON } from 'config/seo'

// Inline links inside the body copy: explicit accent color, weight and a
// persistent underline so they're obviously clickable against muted body text.
const InlineLink = ({
  href,
  children,
}: {
  href: string
  children: React.ReactNode
}) => (
  <a
    href={href}
    target="_blank"
    rel="noreferrer"
    className="font-semibold text-kl-emphasis underline underline-offset-[3px] hover:no-underline"
  >
    {children}
  </a>
)

const GetInTouch = () => {
  const { t } = useTranslation('common')
  return (
    <footer className="flex h-full mx-auto w-[99%] max-w-2xl flex-col gap-6 text-center xl:mx-0 xl:max-w-none xl:w-3/4 xl:gap-8 xl:text-start">
      <h2
        className="text-4xl font-bold xl:text-5xl"
        style={{ fontVariantCaps: 'small-caps' }}
      >
        {t('contact.heading')}{' '}
        <span className="text-2xl text-kl-emphasis">(⁀ᗢ⁀)</span>
      </h2>
      <p className="text-sm leading-relaxed text-kl-description md:text-base 2xl:text-lg">
        {t('contact.body')}{' '}
        <InlineLink href={PERSON.linkedin}>
          {t('contact.linkedin')}
        </InlineLink>{' '}
        {t('contact.or_email')}{' '}
        <InlineLink href={`mailto:${PERSON.email}`}>
          {t('contact.email')}
        </InlineLink>
        .
      </p>

      {/* CTAs on the site's teal/cyan accent (tight palette). WhatsApp primary,
          email secondary; both outline to match the rest of the site. */}
      <div className="flex flex-wrap justify-center gap-3 xl:justify-start">
        <a
          href={whatsappUrl()}
          target="_blank"
          rel="noreferrer"
          className="inline-flex h-12 items-center justify-center gap-2 rounded-md border border-teal-600 px-6 text-base font-semibold text-kl-emphasis transition-colors hover:border-teal-400 hover:bg-[rgba(49,151,149,0.08)] dark:border-cyan-200 dark:hover:border-teal-300 dark:hover:bg-[rgba(157,236,249,0.08)]"
        >
          <FaWhatsapp aria-hidden />
          {t('contact.cta_whatsapp')}
        </a>
        <a
          href={`mailto:${PERSON.email}`}
          className="inline-flex h-12 items-center justify-center gap-2 rounded-md border border-[#595959] px-6 text-base font-medium transition-colors hover:border-teal-400 dark:border-white/50 dark:hover:border-teal-300"
        >
          <RiMailLine aria-hidden />
          {t('contact.cta_email')}
        </a>
      </div>

      <div className="pt-10 pb-5 text-center font-mono lg:pt-20 lg:pb-[4.5rem] xl:pt-20">
        <a
          href={PERSON.github}
          target="_blank"
          rel="noreferrer"
          className="text-kl-description no-underline"
        >
          <span>
            <RiGithubFill aria-hidden className="inline h-6 w-6" /> <br />
            {t('sidebar.name')} <RiCopyrightLine aria-hidden className="inline" />{' '}
            {new Date().getFullYear()}
          </span>
        </a>
      </div>
    </footer>
  )
}

export default memo(GetInTouch)
