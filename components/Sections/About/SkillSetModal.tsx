/* eslint-disable react/no-multi-comp */
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
  const backendCols = splitSkills(Skills.backend)
  const frontendCols = splitSkills(Skills.frontend)
  const cicdCols = splitSkills(Skills.cicd)
  const dataBaseCols = splitSkills(Skills.database)
  const uiFrameWorkCols = splitSkills(Skills['ui frameworks'])
  const productivityCols = splitSkills(Skills['productivity boost'])
  const mobileCols = splitSkills(Skills.mobile)
  const gameCols = splitSkills(Skills.games)
  const desktopCols = splitSkills(Skills.desktop)
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
              <SkillList title="Backend Centric" columns={backendCols} />
              <SkillList title="Frontend Centric" columns={frontendCols} />
              <SkillList title="CICD centric" columns={cicdCols} />
              <SkillList title="Database and Streams" columns={dataBaseCols} />
              <SkillList title="Ui Frameworks" columns={uiFrameWorkCols} />
              <SkillList title="Mobile Development" columns={mobileCols} />
              <SkillList title="Game Development" columns={gameCols} />
              <SkillList title="Desktop App" columns={desktopCols} />
              <SkillList title="Productivity boosts" columns={productivityCols} />
            </Dialog.Body>
            <Dialog.Footer>
              <Text fontSize="x-small">
                *Some micro frameworks not included{' '}
              </Text>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  )
}

export default SkillSetModal
