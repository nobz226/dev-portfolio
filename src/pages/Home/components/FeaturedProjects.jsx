import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Badge } from '../../../components/ui/badge'
import { Button } from '../../../components/ui/button'
import SectionWrapper from '../../../components/SectionWrapper'

const featured = [
  {
    number: '01',
    slug: 'nobz-beats',
    title: 'Nobz Beats',
    description:
      'A full-stack music streaming platform with integrated audio player, dynamic visualizer, real-time database via Convex, responsive design, and admin dashboard for track/album management.',
    tech: ['React', 'Vite', 'Convex', 'Tailwind CSS'],
    href: '/projects',
  },
  {
    number: '02',
    slug: 'md-murals',
    title: 'MD Murals',
    description:
      'An interactive gallery portfolio for mural and canvas art with split-screen design, smooth GSAP animations, category filtering, UI sound effects, and admin content management.',
    tech: ['React', 'Vite', 'GSAP', 'Convex'],
    href: '/projects',
  },
  {
    number: '03',
    slug: 'ollie-north-skateshop',
    title: 'Ollie North Skateshop',
    description:
      'A full-featured skateboard e-commerce platform with 150+ products, advanced filtering, real-time cart management, Clerk authentication, Stripe payments, and admin dashboard.',
    tech: ['Next.js', 'React', 'Tailwind CSS', 'Convex'],
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
            className="bg-[#f9f7f7] group hover:bg-[#eeece9] transition-colors duration-300 flex flex-col gap-0 cursor-pointer"
          >
            {/* Screenshot */}
            <Link
              to={`/projects/${project.slug}`}
              className="w-full h-48 bg-black/5 border-b border-black/5 overflow-hidden flex items-center justify-center"
            >
              <div className="text-center">
                <span className="font-mono text-sm text-[#999999]">screenshot</span>
              </div>
            </Link>

            <div className="p-8 flex flex-col gap-6 flex-1">
              <Link to={`/projects/${project.slug}`} className="flex items-start justify-between group/header">
                <span className="font-mono text-4xl font-bold text-black/5 group-hover/header:text-[#2dd4bf]/20 transition-colors duration-300 select-none">
                  {project.number}
                </span>
                <span className="font-mono text-[#2dd4bf] text-lg opacity-0 group-hover/header:opacity-100 transition-all duration-300 translate-x-2 group-hover/header:translate-x-0">
                  →
                </span>
              </Link>

              <div className="flex-1">
                <Link to={`/projects/${project.slug}`} className="block">
                  <h3 className="font-sans font-bold text-xl text-[#1e1e1e] mb-3 hover:text-[#2dd4bf] transition-colors duration-300">
                    {project.title}
                  </h3>
                </Link>
                <p className="font-mono text-base font-medium text-[#555555] leading-relaxed">
                  {project.description}
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                {project.tech.map((t) => (
                  <Badge
                    key={`${project.number}-${t}`}
                    variant="outline"
                    className="font-mono text-sm border-black/10 text-[#555555] bg-transparent rounded-none group-hover:border-[#2dd4bf]/30 transition-colors duration-300"
                  >
                    {t}
                  </Badge>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  )
}
