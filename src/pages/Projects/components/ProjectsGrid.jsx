import { useState } from 'react'
import ProjectCard from './ProjectCard'

export const allProjects = [
  {
    slug: 'nobz-beats',
    title: 'Nobz Beats',
    category: 'Music Platform',
    description:
      'A full-stack music streaming and content management platform featuring integrated audio player with dynamic visualizer, real-time database, responsive design, and admin dashboard for managing tracks and albums.',
    tech: ['React', 'Vite', 'Convex', 'Tailwind CSS'],
    liveUrl: 'https://nobz-beats-react.vercel.app/latest',
    repoUrl: 'https://github.com/nobz226/nobz-beats',
    screenshot: '/assets/images/nobzbeats.png',
    featured: true,
    tags: ['Full-Stack', 'Creative'],
  },
  {
    slug: 'md-murals',
    title: 'MD Murals',
    category: 'Art Portfolio',
    description:
      'An interactive gallery portfolio showcasing mural and canvas art with split-screen design, smooth GSAP animations, category-based filtering, UI sound effects, and an admin panel for content management. Deployed on Vercel.',
    tech: ['React', 'Vite', 'GSAP', 'Convex'],
    liveUrl: 'https://md-murals.vercel.app',
    repoUrl: 'https://github.com/nobz226/md-murals',
    screenshot: '/assets/images/mdmurals.gif',
    featured: true,
    tags: ['Frontend', 'Creative'],
  },
  {
    slug: 'ollie-north-skateshop',
    title: 'Ollie North Skateshop',
    category: 'E-Commerce Platform',
    description:
      'A full-featured skateboard e-commerce platform with 150+ products, advanced filtering, real-time cart management, user authentication via Clerk, Stripe payment integration, wishlist functionality, and admin dashboard. Built with Next.js and Convex.',
    tech: ['Next.js', 'React', 'Tailwind CSS', 'Convex', 'Clerk', 'Stripe'],
    liveUrl: 'https://ollie-north-skateshop.vercel.app/',
    repoUrl: 'https://github.com/nobz226/ollie-north-skateshop',
    screenshot: '/assets/images/skateshop.gif',
    featured: true,
    tags: ['Full-Stack', 'E-Commerce'],
  },
  {
    slug: 'audio-tools-api',
    title: 'Audio Tools API',
    category: 'Backend API',
    description:
      'A Flask-based audio processing API with three core capabilities: BPM/key detection for audio analysis, format conversion between MP3/WAV/FLAC using FFmpeg, and stem separation for isolating vocals, drums, bass, and melody via Demucs. Includes interactive web UI and RESTful endpoints.',
    tech: ['Flask', 'Python', 'FFmpeg', 'Demucs', 'PyTorch'],
    liveUrl: null,
    repoUrl: 'https://github.com/nobz226/audio-tools-API',
    featured: true,
    tags: ['API'],
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
            aria-pressed={active === tag}
            className={`font-mono text-sm uppercase tracking-widest px-4 py-2 transition-all duration-300 border ${
              active === tag
                ? 'border-[#2dd4bf] text-[#1e1e1e] bg-[#2dd4bf]'
                : 'border-black/10 text-[#555555] bg-transparent hover:border-[#2dd4bf]/50 hover:text-[#2dd4bf]'
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-[20px] bg-black/5">
        {filtered.map((project, i) => (
          <ProjectCard key={project.slug} project={project} index={i} />
        ))}
      </div>
    </div>
  )
}
