import { trackEvent } from 'lib/analytics'

// End-of-section conversion anchor: a quiet accent link to #contact so a
// visitor who just finished reading a section doesn't have to scroll around to
// act on it. `location` tags the GA event with which section converted.
const SectionCta = ({
  label,
  location,
}: {
  label: string
  location: string
}) => (
  <a
    href="#contact"
    onClick={() => trackEvent('cta_click', { location })}
    className="group inline-flex items-center gap-1.5 self-center font-semibold text-kl-emphasis underline-offset-[3px] hover:underline xl:self-start"
  >
    {label}
    <span
      aria-hidden
      className="transition-transform duration-200 group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0 motion-reduce:rtl:group-hover:translate-x-0"
    >
      →
    </span>
  </a>
)

export default SectionCta
