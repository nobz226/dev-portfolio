import { motion } from 'framer-motion'
import {
  SiReact, SiNextdotjs, SiTypescript, SiTailwindcss, SiFramer, SiThreedotjs,
  SiNodedotjs, SiGraphql,
  SiVite, SiGit, SiDocker, SiVercel, SiFigma,
  SiGithub, SiAnthropic, SiOpenai,
  SiMysql, SiPostman,
} from 'react-icons/si'
import { TbApi, TbBrain, TbDatabase } from 'react-icons/tb'
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
      { label: 'Convex',     Icon: TbDatabase },
      { label: 'MySQL',      Icon: SiMysql },
      { label: 'REST APIs',  Icon: TbApi },
      { label: 'GraphQL',    Icon: SiGraphql },
    ],
  },
  {
    category: 'Tooling',
    items: [
      { label: 'Vite',     Icon: SiVite },
      { label: 'Git',      Icon: SiGit },
      { label: 'Docker',   Icon: SiDocker },
      { label: 'Vercel',   Icon: SiVercel },
      { label: 'Figma',    Icon: SiFigma },
      { label: 'Postman',  Icon: SiPostman },
      { label: 'SoapUI',   Icon: TbApi },
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
            className="bg-black/10 p-8"
          >
            <p className="font-mono text-sm uppercase tracking-[0.25em] text-[#1e1e1e]/60 mb-8">
              {group.category}
            </p>
            <ul className="flex flex-col gap-4">
              {group.items.map(({ label, Icon }, ii) => (
                <motion.li
                  key={`${group.category}-${label}`}
                  custom={ii}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={itemVariants}
                  className="flex items-center gap-4 group cursor-default"
                >
                  <Icon
                    className="text-[#1e1e1e]/40 group-hover:text-[#1e1e1e] transition-colors duration-300 shrink-0"
                    size={24}
                  />
                  <span className="font-mono text-base text-[#1e1e1e]/70 group-hover:text-[#1e1e1e] transition-colors duration-300">
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
