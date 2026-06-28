import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next/pages'
import { LuGlobe } from 'react-icons/lu'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from 'components/ui/dropdown-menu'
import { isRtl } from 'config/seo'

const LOCALE_LABELS: Record<string, string> = {
  en: 'English',
  he: 'עברית',
  ar: 'العربية',
}

// Compact language picker. Persists the choice in the NEXT_LOCALE cookie so the
// site remembers it on the next visit, and preserves the current route/query.
const LanguageSwitcher = () => {
  const router = useRouter()
  const { t } = useTranslation('common')
  const { locale, locales, pathname, query, asPath } = router
  const dir = isRtl(locale) ? 'rtl' : 'ltr'

  const change = (next: string) => {
    if (typeof document !== 'undefined') {
      const maxAge = 60 * 60 * 24 * 365
      // eslint-disable-next-line react-hooks/immutability -- setting a cookie is a deliberate DOM side-effect in an event handler
      document.cookie = `NEXT_LOCALE=${next}; path=/; max-age=${maxAge}; samesite=lax`
    }
    router.push({ pathname, query }, asPath, { locale: next })
  }

  return (
    <DropdownMenu dir={dir}>
      <DropdownMenuTrigger
        aria-label={`${(locale ?? '').toUpperCase()} — ${t('a11y.language')}`}
        className="flex h-8 items-center gap-1 rounded-md bg-transparent px-2 text-sm hover:bg-black/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-kl-emphasis dark:hover:bg-white/10"
      >
        <LuGlobe />
        <span className="text-sm uppercase">{locale}</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {(locales ?? []).map((l) => (
          <DropdownMenuItem
            key={l}
            onClick={() => change(l)}
            className={l === locale ? 'font-bold' : 'font-normal'}
          >
            {LOCALE_LABELS[l] ?? l}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default LanguageSwitcher
