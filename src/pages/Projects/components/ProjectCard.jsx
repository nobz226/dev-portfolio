import { memo } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

function ProjectListItem({ project }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: 0.05 }}
      className="group"
    >
      <div className="flex flex-col md:flex-row gap-0">
        {/* Screenshot thumbnail */}
        <Link
          to={`/projects/${project.slug}`}
          className="md:w-64 shrink-0 overflow-hidden flex items-center justify-center"
        >
          {project.screenshot ? (
            <img
              src={project.screenshot}
              alt={`${project.title} screenshot`}
              loading="lazy"
              className="w-full h-64 md:h-full object-cover object-top-left group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="flex items-center justify-center h-64 md:h-full w-full">
              <span className="font-mono text-sm text-snow/50">screenshot</span>
            </div>
          )}
        </Link>

        {/* Content */}
        <div className="p-6 md:p-5 flex flex-col gap-3 flex-1 min-w-0">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <span className="font-silom text-sm text-cyber-cyan block mb-1">{project.category}</span>
              <h3 className="font-sans font-bold text-xl text-snow truncate">{project.title}</h3>
            </div>
            {project.featured && (
              <span className="font-silom text-[10px] uppercase tracking-widest px-2 py-1 border border-cyber-cyan/40 text-cyber-cyan shrink-0">
                Featured
              </span>
            )}
          </div>

          <p className="font-mono text-sm font-medium text-snow/70 leading-relaxed line-clamp-3">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-2">
            {project.tech.map((t) => (
              <Badge
                key={t}
                variant="outline"
                className="font-sans text-sm border-snow/20 text-snow/70 bg-transparent rounded-none"
              >
                {t}
              </Badge>
            ))}
          </div>

          <div className="flex gap-2 pt-2">
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
                <span className="flex items-center gap-1 md:gap-2" tabIndex={-1}>
                  Live
                  <img src="/assets/images/arrow.svg" alt="" className="w-12 h-12" />
                </span>
              )}
            </Button>
            <Button
              asChild={!!project.repoUrl}
              size="sm"
              aria-disabled={!project.repoUrl}
              className={`font-silom text-sm uppercase tracking-wider text-snow/80 rounded-none flex-1 bg-transparent hover:bg-transparent hover:text-snow ${!project.repoUrl ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {project.repoUrl ? (
                <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 md:gap-2 transition-transform duration-300 origin-left hover:scale-[1.15]">
                  Code
                  <img src="/assets/images/codeIcon.svg" alt="code" className="w-12 h-12" />
                </a>
              ) : (
                <span className="flex items-center gap-1 md:gap-2" tabIndex={-1}>
                  Code
                  <img src="/assets/images/codeIcon.svg" alt="" className="w-12 h-12" />
                </span>
              )}
            </Button>
            <Button
              asChild
              size="sm"
              className="font-silom text-sm uppercase tracking-wider text-snow/80 rounded-none flex-1 bg-transparent hover:bg-transparent hover:text-snow"
            >
              <Link to={`/projects/${project.slug}`} className="flex items-center gap-1 md:gap-2 transition-transform duration-300 origin-left hover:scale-[1.15]">
                Details
                <img src="/assets/images/detailsIcon.svg" alt="details" className="w-12 h-12" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default memo(ProjectListItem)
