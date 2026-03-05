import { motion } from 'framer-motion'
import {
  SiReact, SiNextdotjs, SiTypescript, SiTailwindcss, SiFramer, SiThreedotjs,
  SiNodedotjs, SiExpress, SiPostgresql, SiMongodb, SiGraphql,
  SiVite, SiGit, SiDocker, SiVercel, SiFigma, SiSanity,
  SiGithub, SiAnthropic, SiOpenai,
} from 'react-icons/si'
import { TbApi, TbBrain } from 'react-icons/tb'
import { VscTerminalCmd } from 'react-icons/vsc'
import SectionWrapper from '../../../components/SectionWrapper'

const stack = [
  {
    category: 'Frontend',
    items: [
      { label: 'React',         Icon: SiReact },
      { label: 'Next.js',       Icon: SiNextdotjs },
      { label: 'TypeScript',    Icon: SiTypescript },
      { label: 'Tailwind CSS',  Icon: SiTailwindcss },
      { label: 'Framer Motion', Icon: SiFramer },
      { label: 'Three.js',      Icon: SiThreedotjs },
    ],
  },
  {
    category: 'Backend',
    items: [
      { label: 'Node.js',    Icon: SiNodedotjs },
      { label: 'Express',    Icon: SiExpress },
      { label: 'PostgreSQL', Icon: SiPostgresql },
      { label: 'MongoDB',    Icon: SiMongodb },
      { label: 'REST APIs',  Icon: TbApi },
      { label: 'GraphQL',    Icon: SiGraphql },
    ],
  },
  {
    category: 'Tooling',
    items: [
      { label: 'Vite',       Icon: SiVite },
      { label: 'Git',        Icon: SiGit },
      { label: 'Docker',     Icon: SiDocker },
      { label: 'Vercel',     Icon: SiVercel },
      { label: 'Figma',      Icon: SiFigma },
      { label: 'Sanity CMS', Icon: SiSanity },
    ],
  },
  {
    category: 'AI Workflow',
    items: [
      { label: 'GitHub Copilot',     Icon: SiGithub },
      { label: 'Claude',             Icon: SiAnthropic },
      { label: 'ChatGPT',            Icon: SiOpenai },
      { label: 'Cursor',             Icon: VscTerminalCmd },
      { label: 'Prompt Engineering', Icon: TbBrain },
    ],
  },
]

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1, ease: 'easeOut' },
  }),
}

const itemVariants = {
  hidden: { opacity: 0, x: -8 },
  visible: (i) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.35, delay: i * 0.05, ease: 'easeOut' },
  }),
}

export default function TechStack() {
  return (
    <SectionWrapper id="stack" label="// tech stack" variant="cyan">
      <h2 className="font-sans font-bold text-4xl md:text-5xl text-[#1e1e1e] mb-12 leading-tight">
        Tools &amp; <span className="text-[#f9f7f7]">Technologies</span>
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-black/10">
        {stack.map((group, gi) => (
          <motion.div
            key={group.category}
            custom={gi}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={cardVariants}
            className="bg-black/10 p-6"
          >
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-[#1e1e1e]/60 mb-5">
              {group.category}
            </p>
            <ul className="flex flex-col gap-3">
              {group.items.map(({ label, Icon }, ii) => (
                <motion.li
                  key={`${group.category}-${label}`}
                  custom={ii}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={itemVariants}
                  className="flex items-center gap-3 group cursor-default"
                >
                  <Icon
                    className="text-[#1e1e1e]/40 group-hover:text-[#1e1e1e] transition-colors duration-300 shrink-0"
                    size={16}
                  />
                  <span className="font-mono text-sm text-[#1e1e1e]/70 group-hover:text-[#1e1e1e] transition-colors duration-300">
                    {label}
                  </span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  )
}
