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
import SectionWrapper from '@/components/SectionWrapper'

const stack = [
  {
    category: 'Frontend',
    items: [
      { label: 'React',         Icon: SiReact,      url: 'https://react.dev' },
      { label: 'Next.js',       Icon: SiNextdotjs,  url: 'https://nextjs.org' },
      { label: 'TypeScript',    Icon: SiTypescript, url: 'https://www.typescriptlang.org' },
      { label: 'Tailwind CSS',  Icon: SiTailwindcss,url: 'https://tailwindcss.com' },
      { label: 'Framer Motion', Icon: SiFramer,     url: 'https://www.framer.com/motion' },
      { label: 'Three.js',      Icon: SiThreedotjs, url: 'https://threejs.org' },
    ],
  },
  {
    category: 'Backend',
    items: [
      { label: 'Node.js',    Icon: SiNodedotjs, url: 'https://nodejs.org' },
      { label: 'Convex',     Icon: TbDatabase,  url: 'https://convex.dev' },
      { label: 'MySQL',      Icon: SiMysql,     url: 'https://www.mysql.com' },
      { label: 'REST APIs',  Icon: TbApi },
      { label: 'GraphQL',    Icon: SiGraphql,   url: 'https://graphql.org' },
    ],
  },
  {
    category: 'Tooling',
    items: [
      { label: 'Vite',     Icon: SiVite,    url: 'https://vite.dev' },
      { label: 'Git',      Icon: SiGit,     url: 'https://git-scm.com' },
      { label: 'Docker',   Icon: SiDocker,  url: 'https://www.docker.com' },
      { label: 'Vercel',   Icon: SiVercel,  url: 'https://vercel.com' },
      { label: 'Figma',    Icon: SiFigma,   url: 'https://www.figma.com' },
      { label: 'Postman',  Icon: SiPostman, url: 'https://www.postman.com' },
      { label: 'SoapUI',   Icon: TbApi,     url: 'https://www.soapui.org' },
    ],
  },
  {
    category: 'AI Workflow',
    items: [
      { label: 'GitHub Copilot',     Icon: SiGithub,       url: 'https://github.com/features/copilot' },
      { label: 'Claude',             Icon: SiAnthropic,    url: 'https://claude.ai' },
      { label: 'ChatGPT',            Icon: SiOpenai,       url: 'https://chatgpt.com' },
      { label: 'Cursor',             Icon: VscTerminalCmd, url: 'https://cursor.com' },
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
    <SectionWrapper id="stack" label="// tech stack" variant="cyan" labelVariant="soft-blue">
      <h2 className="font-sans font-bold text-4xl md:text-5xl text-charcoal mb-12 leading-tight">
        Tools &amp; <span className="text-snow">Technologies</span>
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
            <p className="font-silom text-sm uppercase tracking-[0.25em] text-charcoal/60 mb-8">
              {group.category}
            </p>
            <ul className="flex flex-col gap-4">
              {group.items.map(({ label, Icon, url }, ii) => {
                const content = (
                  <>
                    <Icon
                      aria-hidden="true"
                      className="text-charcoal/40 group-hover:text-charcoal transition-colors duration-300 shrink-0"
                      size={24}
                      focusable="false"
                    />
                    <span className="font-sans text-base text-charcoal/70 group-hover:text-charcoal transition-colors duration-300">
                      {label}
                    </span>
                  </>
                )

                return (
                  <motion.li
                    key={`${group.category}-${label}`}
                    custom={ii}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={itemVariants}
                    className="flex items-center gap-4 group cursor-default"
                  >
                    {url ? (
                      <a
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-4 transition-transform duration-300 hover:scale-[1.05]"
                      >
                        {content}
                      </a>
                    ) : (
                      content
                    )}
                  </motion.li>
                )
              })}
            </ul>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  )
}
