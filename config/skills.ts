import { IconType } from 'react-icons'
import {
  SiJavascript,
  SiTypescript,
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiNodedotjs,
  SiExpress,
  SiPostgresql,
  SiMongodb,
  SiSupabase,
  SiFirebase,
  SiGit,
  SiVercel,
} from 'react-icons/si'
import { VscVscode } from 'react-icons/vsc'

export type SkillCategory = 'frontend' | 'backend' | 'database' | 'tools'

export type Skill = {
  name: string
  icon: IconType
}

export const Skills: {
  [key in SkillCategory]: Skill[]
} = {
  frontend: [
    { name: 'React, RecoilJS', icon: SiReact },
    { name: 'Next.js', icon: SiNextdotjs },
    { name: 'TypeScript', icon: SiTypescript },
    { name: 'Javascript (ES6+)', icon: SiJavascript },
    { name: 'Tailwind CSS', icon: SiTailwindcss },
  ],
  backend: [
    { name: 'Node', icon: SiNodedotjs },
    { name: 'Express', icon: SiExpress },
    { name: 'REST APIs', icon: SiNodedotjs },
  ],
  database: [
    { name: 'PostgreSQL', icon: SiPostgresql },
    { name: 'MongoDB', icon: SiMongodb },
    { name: 'Supabase', icon: SiSupabase },
    { name: 'Firebase', icon: SiFirebase },
  ],
  tools: [
    { name: 'Git', icon: SiGit },
    { name: 'Vercel', icon: SiVercel },
    { name: 'VSCode', icon: VscVscode },
  ],
}

export const splitSkills = (srcArray: Skill[]) => {
  const arrLength = srcArray.length
  const isEvenChunk = arrLength % 2 === 0

  let chunk = 4
  if (isEvenChunk) {
    chunk = arrLength / 2
  } else if (arrLength <= 5 && arrLength > 2) {
    chunk = 3
  }

  let i = 0
  let j = 0
  const temporary = []
  for (i = 0, j = srcArray.length; i < j; i += chunk) {
    temporary.push(srcArray.slice(i, i + chunk))
  }
  return temporary
}
