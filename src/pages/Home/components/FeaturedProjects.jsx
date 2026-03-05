import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Badge } from '../../../components/ui/badge'
import { Button } from '../../../components/ui/button'
import SectionWrapper from '../../../components/SectionWrapper'

const featured = [
  {
    number: '01',
    title: 'Project Alpha',
    description:
      'A full-stack web application built for a local business, featuring custom animations, a headless CMS, and production-grade performance optimization.',
    tech: ['React', 'Node.js', 'Tailwind', 'MongoDB'],
    href: '/projects',
  },
  {
    number: '02',
    title: 'Project Beta',
    description:
      'An agency-grade e-commerce platform with AI-assisted product recommendations, real-time inventory sync, and a brutalist design language.',
    tech: ['Next.js', 'TypeScript', 'Stripe', 'PostgreSQL'],
    href: '/projects',
  },
  {
    number: '03',
    title: 'Project Gamma',
    description:
      'A bespoke creative portfolio for a musician/visual artist, featuring WebGL transitions, audio-reactive visuals, and a fully custom CMS.',
    tech: ['React', 'Three.js', 'GSAP', 'Sanity'],
    href: '/projects',
  },
]

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.15, ease: 'easeOut' },
  }),
}

export default function FeaturedProjects() {
  return (
    <SectionWrapper id="featured" label="// selected work">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
        <h2 className="font-sans font-bold text-4xl md:text-5xl text-[#f9f7f7] leading-tight">
          Featured <span className="text-[#2dd4bf]">Projects</span>
        </h2>
        <Button
          asChild
          variant="outline"
          className="font-mono uppercase tracking-widest text-sm border-white/20 text-[#aaaaaa] hover:border-[#2dd4bf] hover:text-[#2dd4bf] rounded-none px-6 py-4 bg-transparent w-fit transition-all duration-300"
        >
          <Link to="/projects">View All →</Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-black/5">
        {featured.map((project, i) => (
          <motion.div
            key={project.number}
            custom={i}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={cardVariants}
            className="bg-[#f9f7f7] p-8 group hover:bg-[#eeece9] transition-colors duration-300 flex flex-col gap-6"
          >
            <div className="flex items-start justify-between">
              <span className="font-mono text-4xl font-bold text-black/5 group-hover:text-[#2dd4bf]/20 transition-colors duration-300 select-none">
                {project.number}
              </span>
              <span className="font-mono text-[#2dd4bf] text-lg opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0">
                →
              </span>
            </div>

            <div className="flex-1">
              <h3 className="font-sans font-bold text-xl text-[#1e1e1e] mb-3">
                {project.title}
              </h3>
              <p className="font-mono text-base font-medium text-[#555555] leading-relaxed">
                {project.description}
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              {project.tech.map((t) => (
                <Badge
                  key={t}
                  variant="outline"
                  className="font-mono text-sm border-black/10 text-[#555555] bg-transparent rounded-none group-hover:border-[#2dd4bf]/30 transition-colors duration-300"
                >
                  {t}
                </Badge>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  )
}
