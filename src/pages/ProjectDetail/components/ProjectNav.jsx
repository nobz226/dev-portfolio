import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'

function NavArrow({ project, label, labelShort, flip }) {
  if (!project) return <div />
  return (
    <Link
      to={`/projects/${project.slug}`}
      className="group flex flex-col items-center gap-1 md:gap-2 transition-transform duration-300 hover:scale-[1.05] w-fit"
    >
      <img src="/assets/images/backArrow.svg" alt={label} className={`w-8 h-8 md:w-12 md:h-12 shrink-0 ${flip ? '-scale-x-100' : ''}`} />
      <span className="font-silom text-xs md:text-sm text-muted-foreground group-hover:text-cyber-cyan transition-colors leading-tight truncate text-right">
        <span className="md:hidden">{labelShort}</span>
        <span className="hidden md:inline">{label}</span>
      </span>
    </Link>
  )
}

function ActionButton({ href, onClick, label, icon, color = 'muted-foreground' }) {
  const textColor = color === 'cyber-cyan' ? 'text-cyber-cyan' : 'text-muted-foreground'
  const hoverTextColor = color === 'cyber-cyan' ? 'hover:text-cyber-cyan' : 'hover:text-muted-foreground'
  const iconSize = href ? 'md:w-12 md:h-12' : ''

  const content = (
    <div className={`flex items-center gap-1 md:gap-2 transition-transform duration-300 ${href ? 'origin-left hover:scale-[1.15]' : 'origin-left cursor-pointer hover:scale-[1.15]'}`}>
      {label}
      <img src={icon} alt="" className={`w-8 h-8 ${iconSize}`} />
    </div>
  )

  return (
    <Button
      asChild={!!href}
      onClick={href ? undefined : onClick}
      className={`font-silom text-sm uppercase tracking-wider bg-transparent ${textColor} ${hoverTextColor} rounded-none px-0 py-0`}
    >
      {href ? (
        <a href={href} target="_blank" rel="noopener noreferrer">
          {content}
        </a>
      ) : (
        content
      )}
    </Button>
  )
}

export default function ProjectNav({ project, prevProject, nextProject, goBack }) {
  return (
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
              <ActionButton href={project.liveUrl} label="Live Demo" icon="/assets/images/arrow.svg" color="cyber-cyan" />
            )}
            {project.repoUrl && (
              <ActionButton href={project.repoUrl} label="View Code" icon="/assets/images/codeIcon.svg" />
            )}
            <ActionButton onClick={goBack} label="Back" icon="/assets/images/backArrow.svg" />
          </div>

          {/* Mobile: prev / next row */}
          <div className="flex md:hidden items-center justify-between gap-3 w-full">
            <div className="max-w-[120px] shrink-0">
              <NavArrow project={prevProject} label="Previous" labelShort="Previous" />
            </div>
            <div className="max-w-[120px] shrink-0 flex justify-end">
              <NavArrow project={nextProject} label="Next" labelShort="Next" flip />
            </div>
          </div>

          {/* Desktop: Previous */}
          <div className="hidden md:block w-36 shrink-0">
            <NavArrow project={prevProject} label="Previous Project" labelShort="Previous" />
          </div>

          {/* Desktop: Centered actions */}
          <div className="hidden md:flex items-center gap-6 justify-center">
            {project.liveUrl && (
              <ActionButton href={project.liveUrl} label="Live Demo" icon="/assets/images/arrow.svg" color="cyber-cyan" />
            )}
            {project.repoUrl && (
              <ActionButton href={project.repoUrl} label="View Code" icon="/assets/images/codeIcon.svg" />
            )}
            <ActionButton onClick={goBack} label="Back to Projects" icon="/assets/images/backArrow.svg" />
          </div>

          {/* Desktop: Next */}
          <div className="hidden md:block w-36 shrink-0 flex justify-end">
            <NavArrow project={nextProject} label="Next Project" labelShort="Next" flip />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
