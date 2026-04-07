import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Badge } from '../../../components/ui/badge'
import { Button } from '../../../components/ui/button'

/**
 * ProjectCard — displays a single project with title, description, tech stack, and links.
 */
export default function ProjectCard({ project, index }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55, delay: (index % 2) * 0.1 }}
      className="bg-snow group flex flex-col hover:bg-[#eeece9] transition-colors duration-300 border border-black/5 hover:border-cyber-cyan/30"
    >
      {/* Top bar */}
      <div className="flex items-center gap-1.5 px-4 py-3 border-b border-black/5">
        <span className="w-2.5 h-2.5 rounded-full bg-black/10" />
        <span className="w-2.5 h-2.5 rounded-full bg-black/10" />
        <span className="w-2.5 h-2.5 rounded-full bg-black/10" />
        <span className="font-mono text-sm text-[#666666] ml-2">{project.slug}.jsx</span>
      </div>

      {/* Screenshot */}
      <Link to={`/projects/${project.slug}`} className="block w-full h-64 bg-black/5 border-b border-black/5 overflow-hidden flex items-center justify-center">
        {project.screenshot ? (
          <img
            src={project.screenshot}
            alt={`${project.title} screenshot`}
            className="w-full h-full object-cover object-top-left group-hover:scale-105 transition-transform duration-300 cursor-pointer"
          />
        ) : (
          <div className="text-center">
            <span className="font-mono text-sm text-[#999999]">screenshot</span>
          </div>
        )}
      </Link>

      <div className="p-5 flex flex-col flex-1 gap-3">
        <div className="flex items-start justify-between gap-4">
          <div>
            <span className="font-mono text-sm text-cyber-cyan block mb-1">{project.category}</span>
            <h3 className="font-sans font-bold text-lg text-charcoal">{project.title}</h3>
          </div>
          {project.featured && (
            <span className="font-mono text-[10px] uppercase tracking-widest px-2 py-1 border border-cyber-cyan/40 text-cyber-cyan shrink-0">
              Featured
            </span>
          )}
        </div>

        <p className="font-mono text-sm font-medium text-[#555555] leading-relaxed">
          {project.description}
        </p>

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

        <div className="flex gap-2 border-t border-black/5 pt-3">
          <Button
            asChild={!!project.liveUrl}
            size="sm"
            disabled={!project.liveUrl}
            className="font-mono text-sm uppercase tracking-wider bg-cyber-cyan text-charcoal hover:bg-soft-blue rounded-none flex-1 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {project.liveUrl ? (
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                Live ↗
              </a>
            ) : (
              <span>Live ↗</span>
            )}
          </Button>
          <Button
            asChild={!!project.repoUrl}
            size="sm"
            variant="outline"
            disabled={!project.repoUrl}
            className="font-mono text-sm uppercase tracking-wider border-black/10 text-[#555555] hover:border-cyber-cyan hover:text-cyber-cyan rounded-none flex-1 bg-transparent transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {project.repoUrl ? (
              <a href={project.repoUrl} target="_blank" rel="noopener noreferrer">
                Code ↗
              </a>
            ) : (
              <span>Code ↗</span>
            )}
          </Button>
          <Button
            asChild
            size="sm"
            variant="outline"
            className="font-mono text-sm uppercase tracking-wider border-black/10 text-[#555555] hover:border-cyber-cyan hover:text-cyber-cyan rounded-none flex-1 bg-transparent transition-all duration-300"
          >
            <Link to={`/projects/${project.slug}`}>
              Details ↗
            </Link>
          </Button>
        </div>
      </div>
    </motion.article>
  )
}
