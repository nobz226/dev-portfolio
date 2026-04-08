import { useParams, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '../../components/ui/button'
import { Badge } from '../../components/ui/badge'
import SectionLabel from '../../components/SectionLabel'
import { usePageMeta } from '../../hooks/usePageMeta'

// Import all projects
import { allProjects } from '../Projects/components/ProjectsGrid'

export default function ProjectDetail() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const [isModalOpen, setIsModalOpen] = useState(false)

  const project = allProjects.find((p) => p.slug === slug)

  // Set page meta dynamically based on project
  usePageMeta(
    project ? `${project.title} - Eduard Rotaru` : 'Project Not Found',
    project
      ? `${project.description} Built with ${project.tech.join(', ')}`
      : 'The project you are looking for does not exist.'
  )

  // Handle ESC key to close modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setIsModalOpen(false)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  if (!project) {
    return (
      <main className="min-h-screen pt-40 pb-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1 className="font-sans font-bold text-5xl text-[#1e1e1e] mb-6">
            Project not found
          </h1>
          <p className="font-mono text-base text-[#555555] mb-8">
            The project you're looking for doesn't exist or has been removed.
          </p>
          <Button
            onClick={() => navigate('/projects')}
            className="font-mono uppercase tracking-widest text-sm bg-[#2dd4bf] text-[#1e1e1e] hover:bg-[#22b8c7] rounded-none px-8 py-5 transition-all duration-300"
          >
            Back to Projects
          </Button>
        </div>
      </main>
    )
  }

  return (
    <main>
      {/* Hero Section */}
      <section className="relative pt-40 pb-12">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(rgba(45,212,191,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(45,212,191,0.03) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <SectionLabel label="// project details" />
        </motion.div>
        <div className="max-w-4xl mx-auto px-6 pt-10">
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-sans font-bold text-5xl md:text-7xl text-[#1e1e1e] leading-none mb-6"
          >
            {project.title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="font-mono text-base font-medium text-[#555555] max-w-2xl leading-relaxed"
          >
            {project.description}
          </motion.p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-[#f9f7f7] border border-black/5 p-12"
          >
            {/* Category & Featured Badge */}
            <div className="flex items-center gap-4 mb-8">
              <span className="font-mono text-sm text-[#2dd4bf] uppercase tracking-widest">
                {project.category}
              </span>
              {project.featured && (
                <span className="font-mono text-[10px] uppercase tracking-widest px-3 py-1 border border-[#2dd4bf]/40 text-[#2dd4bf]">
                  Featured
                </span>
              )}
            </div>

            {/* Screenshot Placeholder */}
            <div className="w-full bg-black/5 border border-black/5 rounded-none mb-8 flex items-center justify-center overflow-hidden">
              {project.screenshot ? (
                <img
                  src={project.screenshot}
                  alt={`${project.title} screenshot`}
                  className="w-full h-auto cursor-pointer hover:opacity-80 transition-opacity"
                  onClick={() => setIsModalOpen(true)}
                />
              ) : (
                <span className="font-mono text-base text-[#999999] py-20">screenshot</span>
              )}
            </div>

            {/* Tech Stack */}
            <div className="mb-8">
              <h2 className="font-sans font-bold text-2xl text-[#1e1e1e] mb-4">
                Tech Stack
              </h2>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((t) => (
                  <Badge
                    key={t}
                    variant="outline"
                    className="font-mono text-sm border-black/10 text-[#555555] bg-transparent rounded-none"
                  >
                    {t}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Tags */}
            <div className="mb-8 pb-8 border-b border-black/5">
              <h2 className="font-sans font-bold text-2xl text-[#1e1e1e] mb-4">
                Tags
              </h2>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="outline"
                    className="font-mono text-sm border-[#2dd4bf]/30 text-[#2dd4bf] bg-transparent rounded-none"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Links */}
            <div className="flex gap-3 flex-wrap">
              {project.liveUrl && (
                <Button
                  asChild
                  className="font-mono text-sm uppercase tracking-wider bg-[#2dd4bf] text-[#1e1e1e] hover:bg-[#22b8c7] rounded-none px-6 py-5 transition-colors duration-300"
                >
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                    Live Demo ↗
                  </a>
                </Button>
              )}
              {project.repoUrl && (
                <Button
                  asChild
                  variant="outline"
                  className="font-mono text-sm uppercase tracking-wider border-black/10 text-[#555555] hover:border-[#2dd4bf] hover:text-[#2dd4bf] hover:bg-black/5 rounded-none px-6 py-5 bg-transparent transition-all duration-300"
                >
                  <a href={project.repoUrl} target="_blank" rel="noopener noreferrer">
                    View Code ↗
                  </a>
                </Button>
              )}
              <Button
                onClick={() => navigate('/projects')}
                variant="outline"
                className="font-mono text-sm uppercase tracking-wider border-black/10 text-[#555555] hover:border-[#2dd4bf] hover:text-[#2dd4bf] hover:bg-black/5 rounded-none px-6 py-5 bg-transparent transition-all duration-300"
              >
                Back to Projects
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Screenshot Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsModalOpen(false)}
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-5xl w-full max-h-screen"
            >
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute -top-12 right-0 text-white font-mono text-sm uppercase tracking-widest hover:text-[#2dd4bf] transition-colors"
              >
                Close (ESC)
              </button>
              <img
                src={project.screenshot}
                alt={`${project.title} screenshot fullscreen`}
                className="w-full h-auto"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}
