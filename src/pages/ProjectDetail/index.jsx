import { useParams, useNavigate, Link } from 'react-router-dom'
import { useState, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import SectionLabel from '@/components/SectionLabel'
import SectionWrapper from '@/components/SectionWrapper'
import { usePageMeta } from '@/hooks/usePageMeta'
import { useFocusTrap } from '@/hooks/useFocusTrap'

import { allProjects } from '@/data/projects'
import { renderParagraphs } from '@/lib/helpers'
import ProjectNav from './components/ProjectNav'
import StickyActionBar from './components/StickyActionBar'
import TypedText from '@/components/TypedText'

export default function ProjectDetail() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [descDone, setDescDone] = useState(false)
  const [whyDone, setWhyDone] = useState(false)
  const [systemDone, setSystemDone] = useState(false)
  const [soulDone, setSoulDone] = useState(false)

  const project = allProjects.find((p) => p.slug === slug)

  // Set page meta dynamically based on project
  usePageMeta(
    project ? `${project.title} - Eduard Rotaru` : 'Project Not Found',
    project
      ? `${project.description} Built with ${project.tech.join(', ')}`
      : 'The project you are looking for does not exist.',
    project?.screenshot || '/og-image.png'
  )

  const currentIndex = allProjects.findIndex((p) => p.slug === slug)
  const prevProject = currentIndex > 0 ? allProjects[currentIndex - 1] : null
  const nextProject = currentIndex < allProjects.length - 1 ? allProjects[currentIndex + 1] : null

  const goBack = useCallback(() => navigate('/projects'), [navigate])
  const closeModal = useCallback(() => setIsModalOpen(false), [])

  // Focus trap + ESC for modal
  const modalRef = useRef(null)
  const triggerRef = useRef(null)

  useFocusTrap(modalRef, isModalOpen, closeModal, triggerRef)

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
                  className="group flex flex-col items-center gap-1 md:gap-2 transition-transform duration-300 hover:scale-[1.05] w-fit"
                >
                  <img src="/assets/images/backArrow.svg" alt="previous" className="w-8 h-8 md:w-12 md:h-12 shrink-0" />
                  <span className="font-silom text-xs md:text-sm text-muted-foreground group-hover:text-cyber-cyan transition-colors leading-tight truncate">
                    <span className="md:hidden">Previous</span>
                    <span className="hidden md:inline">Previous Project</span>
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
              <TypedText as="span" text={project.title} variant="terminal" />
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
                  className="group flex flex-col items-center gap-1 md:gap-2 transition-transform duration-300 hover:scale-[1.05] w-fit"
                >
                  <img src="/assets/images/backArrow.svg" alt="next" className="w-8 h-8 md:w-12 md:h-12 shrink-0 -scale-x-100" />
                  <span className="font-silom text-xs md:text-sm text-muted-foreground group-hover:text-cyber-cyan transition-colors leading-tight truncate text-right">
                    <span className="md:hidden">Next</span>
                    <span className="hidden md:inline">Next Project</span>
                  </span>
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
        <StickyActionBar
          project={project}
          prevProject={prevProject}
          nextProject={nextProject}
          goBack={goBack}
        />
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
          <TypedText as="span" text="Description" variant="terminal" startOnView onComplete={() => setDescDone(true)} />
        </h2>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={descDone ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <p className="font-mono text-lg leading-relaxed text-snow/80">
            {project.description}
          </p>
        </motion.div>
      </SectionWrapper>

      {/* The Why Section */}
        {project.why && (
        <SectionWrapper label="// the why" variant="cyan" labelVariant="soft-blue">
          <h2 className="font-sans font-bold text-4xl md:text-5xl text-snow mb-6 leading-tight">
            <TypedText as="span" text="The Why" variant="terminal" startOnView cursorColor="#f9f7f7" onComplete={() => setWhyDone(true)} />
          </h2>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={whyDone ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <div className="space-y-6 text-charcoal/80">
              {renderParagraphs(project.why, 'why', 'text-charcoal/80')}
            </div>
          </motion.div>
        </SectionWrapper>
      )}

      {/* The System Section */}
        {project.system && (
        <SectionWrapper label="// the system" variant="dark">
          <h2 className="font-sans font-bold text-4xl md:text-5xl text-snow mb-6 leading-tight">
            <TypedText as="span" text="The System" variant="terminal" startOnView onComplete={() => setSystemDone(true)} />
          </h2>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={systemDone ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
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
          </motion.div>
        </SectionWrapper>
      )}

      {/* The Soul Section */}
        {project.soul && (
        <SectionWrapper label="// the soul" variant="cyan" labelVariant="soft-blue">
          <h2 className="font-sans font-bold text-4xl md:text-5xl text-snow mb-6 leading-tight">
            <TypedText as="span" text="The Soul" variant="terminal" startOnView cursorColor="#f9f7f7" onComplete={() => setSoulDone(true)} />
          </h2>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={soulDone ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <div className="space-y-6 text-charcoal/80">
              {renderParagraphs(project.soul, 'soul', 'text-charcoal/80')}
            </div>
          </motion.div>
        </SectionWrapper>
      )}

      <ProjectNav project={project} prevProject={prevProject} nextProject={nextProject} goBack={goBack} />

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
