import { memo } from 'react'
import { Tooltip } from 'components/ui/tooltip'
import { useTranslation } from 'next-i18next/pages'
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiJavascript,
  SiNodedotjs,
  SiPostgresql,
  SiMongodb,
  SiTailwindcss,
} from 'react-icons/si'
import { GiCoffeePot } from 'react-icons/gi'
import { IoMdOpen } from 'react-icons/io'

type ISkillSetModal = {
  onOpen(): void
}

const leftSkills = [
  { name: 'React', icon: SiReact },
  { name: 'Next.js', icon: SiNextdotjs },
  { name: 'TypeScript', icon: SiTypescript },
  { name: 'JavaScript', icon: SiJavascript },
]
const rightSkills = [
  { name: 'Node.js', icon: SiNodedotjs },
  { name: 'PostgreSQL', icon: SiPostgresql },
  { name: 'MongoDB', icon: SiMongodb },
  { name: 'Tailwind CSS', icon: SiTailwindcss },
]

const SkillItem = ({
  name,
  icon: Icon,
}: {
  name: string
  icon: typeof SiReact
}) => (
  <li className="flex items-center text-sm md:text-base">
    <Icon aria-hidden className="me-2 text-[2em] text-kl-emphasis" />
    {name}
  </li>
)

const Detail = ({ onOpen }: ISkillSetModal) => {
  const { t } = useTranslation('common')

  return (
    <section className="mx-auto flex w-full max-w-2xl flex-col items-center gap-6 text-center xl:mx-0 xl:w-[70%] xl:max-w-none xl:items-stretch xl:gap-8 xl:text-start">
      <h2
        className="text-4xl font-bold xl:text-5xl"
        style={{ fontVariantCaps: 'small-caps' }}
      >
        {t('about.heading')}
      </h2>
      <p className="text-sm leading-relaxed text-kl-description md:text-base 2xl:text-lg">
        {t('about.lead_1')}{' '}
        <Tooltip content={t('about.end_to_end_tip')}>
          <span className="text-kl-emphasis">
            <b>{t('about.end_to_end')}</b>
          </span>
        </Tooltip>{' '}
        {t('about.lead_2')}
        <br />
        <br />
        {t('about.body')}{' '}
        <Tooltip content={t('about.coffee_tip')}>
          <span className="text-kl-emphasis">{t('about.coffee')}</span>
        </Tooltip>{' '}
        <GiCoffeePot aria-hidden className="inline text-kl-emphasis" />.
      </p>

      {/* Skills grid: kept narrow and centered below xl so the two columns sit
          close together (no big mid gap); left-aligned full width at xl. */}
      <div className="mx-auto grid w-fit grid-cols-2 gap-x-10 gap-y-3 xl:mx-0 xl:w-auto xl:gap-x-4">
        <ul className="flex list-none flex-col gap-3">
          {leftSkills.map((s) => (
            <SkillItem key={s.name} name={s.name} icon={s.icon} />
          ))}
        </ul>
        <ul className="flex list-none flex-col gap-3">
          {rightSkills.map((s) => (
            <SkillItem key={s.name} name={s.name} icon={s.icon} />
          ))}
        </ul>
        <div className="col-span-2 flex justify-center xl:col-span-1 xl:justify-start">
          <button
            onClick={onOpen}
            className="inline-flex items-center gap-1 text-sm text-kl-emphasis md:text-base"
          >
            {t('about.see_skills')} <IoMdOpen aria-hidden />
          </button>
        </div>
      </div>
    </section>
  )
}

export default memo(Detail)
