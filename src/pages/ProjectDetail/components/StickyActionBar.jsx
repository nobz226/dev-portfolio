import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

export default function StickyActionBar({ project, prevProject, nextProject, goBack }) {
  const [visible, setVisible] = useState(false)
  const [overCyan, setOverCyan] = useState(false)

  useEffect(() => {
    let ticking = false

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const hero = document.querySelector('main > section:first-child')
          const nav = document.getElementById('project-nav')
          if (!hero) { ticking = false; return }

          const heroBottom = hero.getBoundingClientRect().bottom
          const pastHero = heroBottom < 80

          let nearNav = false
          if (nav) {
            const navRect = nav.getBoundingClientRect()
            nearNav = navRect.top < window.innerHeight
          }

          setVisible(pastHero && !nearNav)

          if (pastHero && !nearNav) {
            let isOverCyan = false
            const asideCenterY = window.innerHeight / 2
            const sections = document.querySelectorAll('main > section')
            for (const section of sections) {
              const rect = section.getBoundingClientRect()
              if (rect.top <= asideCenterY && rect.bottom >= asideCenterY) {
                if (section.querySelector('.bg-cyber-cyan')) {
                  isOverCyan = true
                }
                break
              }
            }
            setOverCyan(isOverCyan)
          }

          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  if (!project) return null

  const iconFilter = overCyan ? 'brightness-0 invert' : ''
  const txtMuted = overCyan ? 'text-snow' : 'text-muted-foreground'
  const txtCyan = overCyan ? 'text-snow' : 'text-cyber-cyan'
  const hoverColor = overCyan ? 'group-hover:text-snow' : 'group-hover:text-cyber-cyan'

  return (
    <AnimatePresence>
      {visible && (
        <motion.aside
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="hidden md:block fixed right-24 top-1/2 -translate-y-1/2 z-40"
          aria-label="Project actions"
        >
          <div className="flex flex-col gap-4">
            {prevProject && (
              <Link
                to={`/projects/${prevProject.slug}`}
                className="flex flex-col items-center gap-1 group transition-transform duration-300 hover:scale-[1.15]"
                aria-label="Previous project"
              >
                <img src="/assets/images/backArrow.svg" alt="" className={`w-10 h-10 ${iconFilter}`} aria-hidden="true" />
                <span className={`font-silom text-sm ${txtMuted} ${hoverColor} transition-colors uppercase tracking-wider`}>Prev</span>
              </Link>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-1 group transition-transform duration-300 hover:scale-[1.15]"
                aria-label="Live demo"
              >
                <img src="/assets/images/arrow.svg" alt="" className={`w-10 h-10 ${iconFilter}`} aria-hidden="true" />
                <span className={`font-silom text-sm ${txtCyan} transition-colors uppercase tracking-wider`}>Live</span>
              </a>
            )}
            {project.repoUrl && (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-1 group transition-transform duration-300 hover:scale-[1.15]"
                aria-label="View source code"
              >
                <img src="/assets/images/codeIcon.svg" alt="" className={`w-10 h-10 ${iconFilter}`} aria-hidden="true" />
                <span className={`font-silom text-sm ${txtMuted} ${hoverColor} transition-colors uppercase tracking-wider`}>Code</span>
              </a>
            )}
            <button
              onClick={goBack}
              className="flex flex-col items-center gap-1 group transition-transform duration-300 hover:scale-[1.15]"
              aria-label="Back to projects"
            >
              <img src="/assets/images/backArrow.svg" alt="" className={`w-10 h-10 ${iconFilter}`} aria-hidden="true" />
              <span className={`font-silom text-sm ${txtMuted} ${hoverColor} transition-colors uppercase tracking-wider`}>Back</span>
            </button>
            {nextProject && (
              <Link
                to={`/projects/${nextProject.slug}`}
                className="flex flex-col items-center gap-1 group transition-transform duration-300 hover:scale-[1.15]"
                aria-label="Next project"
              >
                <img src="/assets/images/backArrow.svg" alt="" className={`w-10 h-10 -scale-x-100 ${iconFilter}`} aria-hidden="true" />
                <span className={`font-silom text-sm ${txtMuted} ${hoverColor} transition-colors uppercase tracking-wider`}>Next</span>
              </Link>
            )}
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  )
}
