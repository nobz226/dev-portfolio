import { memo } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import TerminalBar from '@/components/TerminalBar'

/**
 * ProjectCard — displays a single project with title, description, tech stack, and links.
 */
function ProjectCard({ project, index }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55, delay: (index % 2) * 0.1 }}
      className="bg-snow group flex flex-col hover:bg-warm-gray transition-colors duration-300 border border-black/5 hover:border-cyber-cyan/30"
    >
      <TerminalBar filename={`${project.slug}.jsx`} />

      {/* Screenshot */}
      <Link to={`/projects/${project.slug}`} className="block w-full h-64 bg-black/5 border-b border-black/5 overflow-hidden flex items-center justify-center">
        {project.screenshot ? (
          <img
            src={project.screenshot}
            alt={`${project.title} screenshot`}
            loading="lazy"
            className="w-full h-full object-cover object-top-left group-hover:scale-105 transition-transform duration-300 cursor-pointer"
          />
        ) : (
          <div className="text-center">
            <span className="font-mono text-sm text-muted-light">screenshot</span>
          </div>
        )}
      </Link>

      <div className="p-5 flex flex-col flex-1 gap-3">
        <div className="flex items-start justify-between gap-4">
          <div>
            <span className="font-silom text-sm text-cyber-cyan block mb-1">{project.category}</span>
            <h3 className="font-sans font-bold text-lg text-charcoal">{project.title}</h3>
          </div>
          {project.featured && (
            <span className="font-silom text-[10px] uppercase tracking-widest px-2 py-1 border border-cyber-cyan/40 text-cyber-cyan shrink-0">
              Featured
            </span>
          )}
        </div>

        <p className="font-mono text-sm font-medium text-muted-foreground leading-relaxed">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2">
          {project.tech.map((t) => (
            <Badge
              key={t}
              variant="outline"
              className="font-sans text-sm border-black/10 text-muted-foreground bg-transparent rounded-none"
            >
              {t}
            </Badge>
          ))}
        </div>

        <div className="flex gap-2 border-t border-black/5 pt-3">
          <Button
            asChild={!!project.liveUrl}
            size="sm"
            aria-disabled={!project.liveUrl}
            className={`font-silom text-xs uppercase tracking-wider text-cyber-cyan rounded-none flex-1 bg-transparent hover:bg-transparent hover:text-cyber-cyan ${!project.liveUrl ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {project.liveUrl ? (
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 md:gap-2 transition-transform duration-300 origin-left hover:scale-[1.15]">
                Live
                <img src="/assets/images/arrow.svg" alt="arrow" className="w-12 h-12" />
              </a>
            ) : (
              <span className="flex items-center gap-1 md:gap-2 transition-transform duration-300 origin-left hover:scale-[1.15]" tabIndex={-1}>
                Live
                <img src="/assets/images/arrow.svg" alt="" className="w-12 h-12" />
              </span>
            )}
          </Button>
          <Button
            asChild={!!project.repoUrl}
            size="sm"
            aria-disabled={!project.repoUrl}
            className={`font-silom text-sm uppercase tracking-wider text-text-dark rounded-none flex-1 bg-transparent hover:bg-transparent hover:text-text-dark ${!project.repoUrl ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {project.repoUrl ? (
              <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 md:gap-2 transition-transform duration-300 origin-left hover:scale-[1.15]">
                Code
                <img src="/assets/images/codeIcon.svg" alt="code" className="w-12 h-12" />
              </a>
            ) : (
              <span className="flex items-center gap-1 md:gap-2 transition-transform duration-300 origin-left hover:scale-[1.15]" tabIndex={-1}>
                Code
                <img src="/assets/images/codeIcon.svg" alt="" className="w-12 h-12" />
              </span>
            )}
          </Button>
          <Button
            asChild
            size="sm"
            className="font-silom text-sm uppercase tracking-wider text-text-dark rounded-none flex-1 bg-transparent hover:bg-transparent hover:text-text-dark"
          >
            <Link to={`/projects/${project.slug}`} className="flex items-center gap-1 md:gap-2 transition-transform duration-300 origin-left hover:scale-[1.15]">
              Details
              <img src="/assets/images/detailsIcon.svg" alt="details" className="w-12 h-12" />
            </Link>
          </Button>
        </div>
      </div>
    </motion.article>
  )
}

export default memo(ProjectCard)
