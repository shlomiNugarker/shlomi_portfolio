 
import {
  Heading,
  Dialog,
  Portal,
  CloseButton,
  List,
  Icon,
  SimpleGrid,
  Separator,
  Text,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useColorModeValue } from 'components/ui/color-mode'
import { useTranslation } from 'next-i18next/pages'
import styles from './styles.module.css'
import { Skill, Skills, splitSkills } from 'config/skills'
import { isRtl } from 'config/seo'

type ISkillSetModal = {
  isOpen: boolean
  onClose(): void
}

const SkillList = ({
  title,
  columns,
}: {
  title: string
  columns: Skill[][]
}) => {
  const emphasis = useColorModeValue('teal.700', 'cyan.200')
  const [colOne, colTwo = []] = columns
  return (
    <>
      <Heading as="div" size="sm" paddingBottom={1} color="kl.description">
        {title}
      </Heading>
      <Separator marginBottom={4} />
      <SimpleGrid columns={2} gap={4} paddingBottom={6}>
        <List.Root gap={3} listStyle="none">
          {colOne.map((item) => (
            <List.Item
              key={item.name}
              fontSize={{ base: 'sm', md: 'md' }}
              display="flex"
              alignItems="center"
            >
              <Icon as={item.icon} color={emphasis} fontSize="2em" marginEnd={2} />
              {item.name}
            </List.Item>
          ))}
        </List.Root>
        <List.Root gap={3} listStyle="none">
          {colTwo.map((item) => (
            <List.Item
              key={item.name}
              fontSize={{ base: 'sm', md: 'md' }}
              display="flex"
              alignItems="center"
            >
              <Icon as={item.icon} color={emphasis} fontSize="2em" marginEnd={2} />
              {item.name}
            </List.Item>
          ))}
        </List.Root>
      </SimpleGrid>
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
    <Dialog.Root
      open={isOpen}
      onOpenChange={(e: { open: boolean }) => !e.open && onClose()}
      motionPreset="slide-in-bottom"
      scrollBehavior="inside"
    >
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          {/* Portaled content escapes the page's RTL context, so set the
              direction explicitly to keep the modal aligned in he/ar. */}
          <Dialog.Content dir={dir}>
            {/* The close button sits at the inline-end edge (right in LTR, left
                in RTL). Reserve space there so the title never sits under it. */}
            <Dialog.Header paddingInlineEnd={10}>
              {t('skills.modal_title')}
            </Dialog.Header>
            {/* The portaled close trigger doesn't inherit the Content's dir, so
                its inset-inline-end resolves as LTR (right) even in RTL. Set dir
                explicitly so it lands on the correct (start/left) corner. */}
            <Dialog.CloseTrigger asChild dir={dir}>
              <CloseButton size="sm" />
            </Dialog.CloseTrigger>
            <Dialog.Body className={styles.skillModal}>
              <SkillList title={t('skills.frontend')} columns={frontendCols} />
              <SkillList title={t('skills.backend')} columns={backendCols} />
              <SkillList title={t('skills.databases')} columns={dataBaseCols} />
              <SkillList title={t('skills.tools')} columns={toolsCols} />
            </Dialog.Body>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  )
}

export default SkillSetModal
