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

// Split a skill list into two balanced columns (first column gets the extra
// item when the count is odd), as consumed by SkillList's two-column grid.
export const splitSkills = (srcArray: Skill[]): Skill[][] => {
  const mid = Math.ceil(srcArray.length / 2)
  return [srcArray.slice(0, mid), srcArray.slice(mid)]
}
