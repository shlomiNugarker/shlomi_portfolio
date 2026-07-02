import { useEffect, useState } from 'react'
import { useTranslation } from 'next-i18next/pages'
import { FaWhatsapp } from 'react-icons/fa'
import { whatsappUrl } from 'config/seo'
import { trackEvent } from 'lib/analytics'

// Floating WhatsApp lead button. Only rendered below xl — on the wide layout
// the hero (with its contact CTA) is fixed on screen, so a floating button
// would be redundant. Appears once the visitor scrolls past the hero and hides
// again while the contact section (which has the full-size WhatsApp CTA) is on
// screen.
const FloatingWhatsApp = () => {
  const { t } = useTranslation('common')
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    let pastHero = false
    let contactInView = false
    const update = () => setVisible(pastHero && !contactInView)

    const onScroll = () => {
      pastHero = window.scrollY > window.innerHeight * 0.5
      update()
    }

    const contact = document.querySelector('#contact')
    const io = new IntersectionObserver(
      ([entry]) => {
        contactInView = entry.isIntersecting
        update()
      },
      { threshold: 0.15 }
    )
    if (contact) io.observe(contact)

    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => {
      window.removeEventListener('scroll', onScroll)
      io.disconnect()
    }
  }, [])

  return (
    <a
      href={whatsappUrl(t('contact.whatsapp_prefill'))}
      target="_blank"
      rel="noreferrer"
      aria-label={t('contact.cta_whatsapp')}
      aria-hidden={!visible}
      tabIndex={visible ? 0 : -1}
      onClick={() =>
        trackEvent('contact_click', { method: 'whatsapp', location: 'floating' })
      }
      className={`fixed end-4 z-[900] flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-[opacity,transform] duration-300 hover:scale-105 motion-reduce:transition-none xl:hidden ${
        visible
          ? 'translate-y-0 opacity-100'
          : 'pointer-events-none translate-y-4 opacity-0'
      }`}
      style={{ bottom: 'calc(env(safe-area-inset-bottom, 0px) + 1rem)' }}
    >
      {/* WhatsApp's own brand green (one deliberate exception to the site
          palette): instant recognition converts better than a themed button. */}
      <FaWhatsapp aria-hidden className="h-7 w-7" />
    </a>
  )
}

export default FloatingWhatsApp
