import { useState } from 'react'
import ProjectCard from './ProjectCard'

const allProjects = [
  {
    slug: 'project-alpha',
    title: 'Project Alpha',
    category: 'Full-Stack App',
    description:
      'A full-stack web application built for a local business, featuring custom animations, a headless CMS, and production-grade performance optimization.',
    tech: ['React', 'Node.js', 'Tailwind', 'MongoDB'],
    liveUrl: 'https://example.com',
    repoUrl: 'https://github.com',
    featured: true,
    tags: ['Full-Stack', 'Business'],
  },
  {
    slug: 'project-beta',
    title: 'Project Beta',
    category: 'E-Commerce',
    description:
      'An agency-grade e-commerce platform with AI-assisted product recommendations, real-time inventory sync, and a brutalist design language.',
    tech: ['Next.js', 'TypeScript', 'Stripe', 'PostgreSQL'],
    liveUrl: 'https://example.com',
    repoUrl: 'https://github.com',
    featured: true,
    tags: ['Full-Stack', 'E-Commerce'],
  },
  {
    slug: 'project-gamma',
    title: 'Project Gamma',
    category: 'Creative Portfolio',
    description:
      'A bespoke creative portfolio for a musician/visual artist featuring WebGL transitions, audio-reactive visuals, and a fully custom CMS.',
    tech: ['React', 'Three.js', 'GSAP', 'Sanity'],
    liveUrl: 'https://example.com',
    repoUrl: 'https://github.com',
    featured: true,
    tags: ['Frontend', 'Creative'],
  },
  {
    slug: 'project-delta',
    title: 'Project Delta',
    category: 'SaaS Dashboard',
    description:
      'An analytics dashboard for a SaaS product, with real-time data visualization, role-based access control, and AI-generated insights.',
    tech: ['React', 'TypeScript', 'Recharts', 'Supabase'],
    liveUrl: 'https://example.com',
    repoUrl: 'https://github.com',
    featured: false,
    tags: ['Full-Stack', 'SaaS'],
  },
  {
    slug: 'project-epsilon',
    title: 'Project Epsilon',
    category: 'Landing Page',
    description:
      'A high-conversion landing page with scroll-driven animations, micro-interactions, and a CMS-powered blog. PageSpeed score: 99.',
    tech: ['Next.js', 'Framer Motion', 'Tailwind', 'Sanity'],
    liveUrl: 'https://example.com',
    repoUrl: 'https://github.com',
    featured: false,
    tags: ['Frontend', 'Performance'],
  },
  {
    slug: 'project-zeta',
    title: 'Project Zeta',
    category: 'API Integration',
    description:
      'A developer tool that aggregates data from multiple third-party APIs, normalizes it, and serves a clean unified REST endpoint.',
    tech: ['Node.js', 'Express', 'Redis', 'Docker'],
    liveUrl: null,
    repoUrl: 'https://github.com',
    featured: false,
    tags: ['Backend', 'API'],
  },
]

const allTags = ['All', ...new Set(allProjects.flatMap((p) => p.tags))]

export default function ProjectsGrid() {
  const [active, setActive] = useState('All')

  const filtered =
    active === 'All' ? allProjects : allProjects.filter((p) => p.tags.includes(active))

  return (
    <div>
      {/* Filter tabs */}
      <div className="flex flex-wrap gap-2 mb-10">
        {allTags.map((tag) => (
          <button
            key={tag}
            onClick={() => setActive(tag)}
            className={`font-mono text-sm uppercase tracking-widest px-4 py-2 transition-all duration-300 border ${
              active === tag
                ? 'border-[#2dd4bf] text-[#1e1e1e] bg-[#2dd4bf]'
                : 'border-black/10 text-[#555555] bg-transparent hover:border-[#2dd4bf]/50 hover:text-[#1e1e1e]'
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-black/5">
        {filtered.map((project, i) => (
          <ProjectCard key={project.slug} project={project} index={i} />
        ))}
      </div>
    </div>
  )
}
