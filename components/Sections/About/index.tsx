import { memo, useState, useCallback } from 'react'
import dynamic from 'next/dynamic'
import Detail from './Detail'

const SkillSetModal = dynamic(() => import('./SkillSetModal'))

const AboutSection = () => {
  const [open, setOpen] = useState(false)
  const onOpen = useCallback(() => setOpen(true), [])
  const onClose = useCallback(() => setOpen(false), [])
  return (
    <>
      <Detail onOpen={onOpen} />
      <SkillSetModal isOpen={open} onClose={onClose} />
    </>
  )
}
export default memo(AboutSection)
