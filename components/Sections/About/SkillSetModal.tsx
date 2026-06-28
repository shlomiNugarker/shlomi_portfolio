import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next/pages'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogBody,
} from 'components/ui/dialog'
import { Separator } from 'components/ui/separator'
import styles from './styles.module.css'
import { Skill, Skills, splitSkills } from 'config/skills'
import { isRtl } from 'config/seo'

type ISkillSetModal = {
  isOpen: boolean
  onClose(): void
}

const SkillColumn = ({ items }: { items: Skill[] }) => (
  <ul className="flex list-none flex-col gap-3">
    {items.map((item) => {
      const Icon = item.icon
      return (
        <li
          key={item.name}
          className="flex items-center text-sm md:text-base"
        >
          <Icon aria-hidden className="me-2 text-[2em] text-kl-emphasis" />
          {item.name}
        </li>
      )
    })}
  </ul>
)

const SkillList = ({
  title,
  columns,
}: {
  title: string
  columns: Skill[][]
}) => {
  const [colOne, colTwo = []] = columns
  return (
    <>
      <div className="pb-1 text-sm font-bold text-kl-description">{title}</div>
      <Separator className="mb-4" />
      <div className="grid grid-cols-2 gap-4 pb-6">
        <SkillColumn items={colOne} />
        <SkillColumn items={colTwo} />
      </div>
    </>
  )
}

const SkillSetModal = ({ isOpen, onClose }: ISkillSetModal) => {
  const { t } = useTranslation('common')
  const { locale } = useRouter()
  const dir = isRtl(locale) ? 'rtl' : 'ltr'
  const frontendCols = splitSkills(Skills.frontend)
  const backendCols = splitSkills(Skills.backend)
  const dataBaseCols = splitSkills(Skills.database)
  const toolsCols = splitSkills(Skills.tools)
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      {/* dir set explicitly: portaled content escapes the page RTL context. */}
      <DialogContent dir={dir}>
        <DialogHeader>
          <DialogTitle>{t('skills.modal_title')}</DialogTitle>
        </DialogHeader>
        <DialogBody className={styles.skillModal}>
          <SkillList title={t('skills.frontend')} columns={frontendCols} />
          <SkillList title={t('skills.backend')} columns={backendCols} />
          <SkillList title={t('skills.databases')} columns={dataBaseCols} />
          <SkillList title={t('skills.tools')} columns={toolsCols} />
        </DialogBody>
      </DialogContent>
    </Dialog>
  )
}

export default SkillSetModal
