import { useParams, useNavigate, Link } from 'react-router-dom'
import { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import SectionLabel from '@/components/SectionLabel'
import SectionWrapper from '@/components/SectionWrapper'
import { usePageMeta } from '@/hooks/usePageMeta'

// Import all projects
import { allProjects } from '@/data/projects'

function renderParagraphs(content, keyPrefix = 'p') {
  const paragraphs = Array.isArray(content)
    ? content
    : String(content).split(/\n\n+/).filter(Boolean)

  return paragraphs.map((paragraph, i) => (
    <p key={`${keyPrefix}-${i}`} className="font-mono text-lg leading-relaxed text-snow/80">
      {paragraph}
    </p>
  ))
}

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

  const currentIndex = allProjects.findIndex((p) => p.slug === slug)
  const prevProject = currentIndex > 0 ? allProjects[currentIndex - 1] : null
  const nextProject = currentIndex < allProjects.length - 1 ? allProjects[currentIndex + 1] : null

  const goBack = useCallback(() => navigate('/projects'), [navigate])
  const closeModal = useCallback(() => setIsModalOpen(false), [])

  // Focus trap + ESC for modal
  const modalRef = useRef(null)
  const triggerRef = useRef(null)

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsModalOpen(false)
        triggerRef.current?.focus()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  // Focus trap when modal opens
  useEffect(() => {
    if (!isModalOpen) return
    const modal = modalRef.current
    if (!modal) return

    const focusableEls = modal.querySelectorAll(
      'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
    )
    const first = focusableEls[0]
    const last = focusableEls[focusableEls.length - 1]

    const handleTab = (e) => {
      if (e.key === 'Tab') {
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last?.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first?.focus()
        }
      }
    }

    first?.focus()
    modal.addEventListener('keydown', handleTab)
    return () => modal.removeEventListener('keydown', handleTab)
  }, [isModalOpen])

  if (!project) {
    return (
      <main className="min-h-screen pt-40 pb-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1 className="font-sans font-bold text-5xl text-charcoal mb-6">
            Project not found
          </h1>
          <p className="font-mono text-base text-muted-foreground mb-8">
            The project you're looking for doesn't exist or has been removed.
          </p>
          <Button
            onClick={goBack}
            className="font-mono uppercase tracking-widest text-sm bg-cyber-cyan text-charcoal hover:bg-soft-blue rounded-none px-8 py-5 transition-all duration-300"
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
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <SectionLabel label="// project details" variant="charcoal" />
        </motion.div>
        <div className="max-w-5xl mx-auto px-6 pt-10">
          <div className="flex items-center justify-between gap-3">
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="max-w-[120px] md:w-36 shrink-0"
            >
              {prevProject ? (
                <Link
                  to={`/projects/${prevProject.slug}`}
                  className="group flex items-center gap-1 md:gap-2 transition-transform duration-300 hover:scale-[1.05] w-fit"
                >
                  <img src="/assets/images/backArrow.svg" alt="previous" className="w-8 h-8 md:w-12 md:h-12 shrink-0" />
                  <span className="font-silom text-xs md:text-sm text-muted-foreground group-hover:text-cyber-cyan transition-colors leading-tight truncate">
                    <span className="md:hidden">Previous</span>
                    <span className="hidden md:inline">{prevProject.title}</span>
                  </span>
                </Link>
              ) : (
                <div />
              )}
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-sans font-bold text-3xl md:text-7xl text-charcoal leading-none opacity-100 relative z-20 text-center flex-1 min-w-0"
            >
              {project.title}
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="max-w-[120px] md:w-36 shrink-0 flex justify-end"
            >
              {nextProject ? (
                <Link
                  to={`/projects/${nextProject.slug}`}
                  className="group flex items-center gap-1 md:gap-2 transition-transform duration-300 hover:scale-[1.05] w-fit"
                >
                  <span className="font-silom text-xs md:text-sm text-muted-foreground group-hover:text-cyber-cyan transition-colors leading-tight truncate text-right">
                    <span className="md:hidden">Next</span>
                    <span className="hidden md:inline">{nextProject.title}</span>
                  </span>
                  <img src="/assets/images/backArrow.svg" alt="next" className="w-8 h-8 md:w-12 md:h-12 shrink-0 -scale-x-100" />
                </Link>
              ) : (
                <div />
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Screenshot Section */}
      <section className="relative py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="w-full bg-black/5 border border-black/5 rounded-none flex items-center justify-center overflow-hidden"
          >
            {project.screenshot ? (
              <img
                src={project.screenshot}
                alt={`${project.title} screenshot`}
                className="w-full h-auto cursor-pointer hover:opacity-80 transition-opacity"
                onClick={() => { triggerRef.current = document.activeElement; setIsModalOpen(true) }}
              />
            ) : (
              <span className="font-mono text-base text-muted-light py-20">screenshot</span>
            )}
          </motion.div>
        </div>
      </section>

      {/* Description Section */}
      <SectionWrapper label="// description" variant="dark">
        <div className="flex items-center gap-4 mb-8">
          <span className="font-silom text-sm text-snow uppercase tracking-widest">
            {project.category}
          </span>
          {project.featured && (
            <span className="font-silom text-[10px] uppercase tracking-widest px-3 py-1 border border-snow/40 text-snow">
              Featured
            </span>
          )}
        </div>
        <h2 className="font-sans font-bold text-4xl md:text-5xl text-snow mb-6 leading-tight">
          Description
        </h2>
        <p className="font-mono text-lg leading-relaxed text-snow/80">
          {project.description}
        </p>
      </SectionWrapper>

      {/* The Why Section */}
      {project.why && (
        <SectionWrapper label="// the why" variant="cyan" labelVariant="soft-blue">
          <h2 className="font-sans font-bold text-4xl md:text-5xl text-snow mb-6 leading-tight">
            The Why
          </h2>
          <div className="space-y-6 text-charcoal/80">
            {renderParagraphs(project.why, 'why')}
          </div>
        </SectionWrapper>
      )}

      {/* The System Section */}
      {project.system && (
        <SectionWrapper label="// the system" variant="dark">
          <h2 className="font-sans font-bold text-4xl md:text-5xl text-snow mb-6 leading-tight">
            The System
          </h2>
          <div className="space-y-6 text-snow/80 mb-8">
            {renderParagraphs(project.system, 'system')}
          </div>
          <div>
            <h3 className="font-silom font-bold text-2xl text-snow mb-6">
              Tech Stack
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((t) => (
                <Badge
                  key={t}
                  variant="outline"
                  className="font-sans text-sm border-snow/30 text-snow bg-transparent rounded-none"
                >
                  {t}
                </Badge>
              ))}
            </div>
          </div>
        </SectionWrapper>
      )}

      {/* The Soul Section */}
      {project.soul && (
        <SectionWrapper label="// the soul" variant="cyan" labelVariant="soft-blue">
          <h2 className="font-sans font-bold text-4xl md:text-5xl text-snow mb-6 leading-tight">
            The Soul
          </h2>
          <div className="space-y-6 text-charcoal/80">
            {renderParagraphs(project.soul, 'soul')}
          </div>
        </SectionWrapper>
      )}

      {/* Bottom Navigation — centered actions + flanking prev/next */}
      <section className="relative py-16 px-6 border-t border-black/5">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-3"
          >
            {/* Mobile: action buttons row */}
            <div className="flex md:hidden items-center justify-center gap-3 w-full">
              {project.liveUrl && (
                <Button
                  asChild
                  className="font-silom text-sm uppercase tracking-wider bg-transparent text-cyber-cyan hover:bg-transparent hover:text-cyber-cyan rounded-none px-0 py-0"
                >
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 transition-transform duration-300 hover:scale-[1.15]"
                  >
                    Live Demo
                    <img src="/assets/images/arrow.svg" alt="arrow" className="w-8 h-8" />
                  </a>
                </Button>
              )}
              {project.repoUrl && (
                <Button
                  asChild
                  className="font-silom text-sm uppercase tracking-wider bg-transparent text-muted-foreground hover:bg-transparent hover:text-muted-foreground rounded-none px-0 py-0"
                >
                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 transition-transform duration-300 hover:scale-[1.15]"
                  >
                    View Code
                    <img src="/assets/images/codeIcon.svg" alt="code" className="w-8 h-8" />
                  </a>
                </Button>
              )}
              <Button
                onClick={goBack}
                className="font-silom text-sm uppercase tracking-wider bg-transparent text-muted-foreground hover:bg-transparent hover:text-muted-foreground rounded-none px-0 py-0"
              >
                <div className="flex items-center gap-1 transition-transform duration-300 cursor-pointer hover:scale-[1.15]">
                  Back
                  <img src="/assets/images/backArrow.svg" alt="arrow" className="w-8 h-8" />
                </div>
              </Button>
            </div>

            {/* Mobile: prev / next row */}
            <div className="flex md:hidden items-center justify-between gap-3 w-full">
              <div className="max-w-[120px] shrink-0">
                {prevProject ? (
                  <Link
                    to={`/projects/${prevProject.slug}`}
                    className="group flex items-center gap-1 transition-transform duration-300 hover:scale-[1.05] w-fit"
                  >
                    <img src="/assets/images/backArrow.svg" alt="previous" className="w-8 h-8 shrink-0" />
                    <span className="font-silom text-xs text-muted-foreground group-hover:text-cyber-cyan transition-colors leading-tight truncate">
                      Previous
                    </span>
                  </Link>
                ) : <div />}
              </div>
              <div className="max-w-[120px] shrink-0 flex justify-end">
                {nextProject ? (
                  <Link
                    to={`/projects/${nextProject.slug}`}
                    className="group flex items-center gap-1 transition-transform duration-300 hover:scale-[1.05] w-fit"
                  >
                    <span className="font-silom text-xs text-muted-foreground group-hover:text-cyber-cyan transition-colors leading-tight truncate">
                      Next
                    </span>
                    <img src="/assets/images/backArrow.svg" alt="next" className="w-8 h-8 shrink-0 -scale-x-100" />
                  </Link>
                ) : <div />}
              </div>
            </div>

            {/* Desktop: Previous */}
            <div className="hidden md:block w-36 shrink-0">
              {prevProject ? (
                <Link
                  to={`/projects/${prevProject.slug}`}
                  className="group flex items-center gap-2 transition-transform duration-300 hover:scale-[1.05] w-fit"
                >
                  <img src="/assets/images/backArrow.svg" alt="previous" className="w-12 h-12 shrink-0" />
                  <span className="font-silom text-sm text-muted-foreground group-hover:text-cyber-cyan transition-colors leading-tight truncate">
                    {prevProject.title}
                  </span>
                </Link>
              ) : (
                <div />
              )}
            </div>

            {/* Desktop: Centered actions */}
            <div className="hidden md:flex items-center gap-6 justify-center">
              {project.liveUrl && (
                <Button
                  asChild
                  className="font-silom text-sm uppercase tracking-wider bg-transparent text-cyber-cyan hover:bg-transparent hover:text-cyber-cyan rounded-none px-0 py-0"
                >
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 transition-transform duration-300 origin-left hover:scale-[1.15]"
                  >
                    Live Demo
                    <img src="/assets/images/arrow.svg" alt="arrow" className="w-12 h-12" />
                  </a>
                </Button>
              )}
              {project.repoUrl && (
                <Button
                  asChild
                  className="font-silom text-sm uppercase tracking-wider bg-transparent text-muted-foreground hover:bg-transparent hover:text-muted-foreground rounded-none px-0 py-0"
                >
                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 transition-transform duration-300 origin-left hover:scale-[1.15]"
                  >
                    View Code
                    <img src="/assets/images/codeIcon.svg" alt="code" className="w-12 h-12" />
                  </a>
                </Button>
              )}
              <Button
                onClick={goBack}
                className="font-silom text-sm uppercase tracking-wider bg-transparent text-muted-foreground hover:bg-transparent hover:text-muted-foreground rounded-none px-0 py-0"
              >
                <div className="flex items-center gap-2 transition-transform duration-300 origin-left cursor-pointer hover:scale-[1.15]">
                  Back to Projects
                  <img src="/assets/images/backArrow.svg" alt="arrow" className="w-12 h-12" />
                </div>
              </Button>
            </div>

            {/* Desktop: Next */}
            <div className="hidden md:block w-36 shrink-0 flex justify-end">
              {nextProject ? (
                <Link
                  to={`/projects/${nextProject.slug}`}
                  className="group flex items-center gap-2 transition-transform duration-300 hover:scale-[1.05] w-fit"
                >
                  <span className="font-silom text-sm text-muted-foreground group-hover:text-cyber-cyan transition-colors leading-tight truncate text-right">
                    {nextProject.title}
                  </span>
                  <img src="/assets/images/backArrow.svg" alt="next" className="w-12 h-12 shrink-0 -scale-x-100" />
                </Link>
              ) : (
                <div />
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Screenshot Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            ref={modalRef}
            role="dialog"
            aria-modal="true"
            aria-label={`${project.title} screenshot fullscreen`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
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
                onClick={() => { closeModal(); triggerRef.current?.focus() }}
                className="absolute -top-12 right-0 text-white font-mono text-sm uppercase tracking-widest hover:text-cyber-cyan transition-colors"
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
