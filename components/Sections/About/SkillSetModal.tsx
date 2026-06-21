 
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
import { useColorModeValue } from 'components/ui/color-mode'
import styles from './styles.module.css'
import { Skill, Skills, splitSkills } from 'config/skills'

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
  const emphasis = useColorModeValue('teal.500', 'cyan.200')
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
              fontSize="small"
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
              fontSize="small"
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
          <Dialog.Content>
            <Dialog.Header>Full Skill Set List</Dialog.Header>
            <Dialog.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Dialog.CloseTrigger>
            <Dialog.Body className={styles.skillModal}>
              <SkillList title="Frontend" columns={frontendCols} />
              <SkillList title="Backend" columns={backendCols} />
              <SkillList title="Databases" columns={dataBaseCols} />
              <SkillList title="Tools & Platforms" columns={toolsCols} />
            </Dialog.Body>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  )
}

export default SkillSetModal
