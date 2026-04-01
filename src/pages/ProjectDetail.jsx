import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Badge } from '../components/ui/badge'
import { Button } from '../components/ui/button'
import SectionWrapper from '../components/SectionWrapper'
import { allProjects } from './Projects/components/ProjectsGrid'

export default function ProjectDetail() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const project = allProjects.find((p) => p.slug === slug)

  if (!project) {
    return (
      <SectionWrapper id="project-not-found">
        <div className="text-center py-16">
          <h1 className="font-sans font-bold text-4xl text-charcoal mb-4">Project Not Found</h1>
          <p className="font-mono text-[#555555] mb-8">The project you're looking for doesn't exist.</p>
          <Button
            onClick={() => navigate('/projects')}
            className="font-mono text-sm uppercase tracking-wider bg-cyber-cyan text-charcoal hover:bg-soft-blue rounded-none transition-colors duration-300"
          >
            Back to Projects →
          </Button>
        </div>
      </SectionWrapper>
    )
  }

  return (
    <SectionWrapper id="project-detail">
      {/* Back button */}
      <button
        onClick={() => navigate('/projects')}
        className="font-mono text-sm text-cyber-cyan mb-8 hover:text-soft-blue transition-colors duration-300 flex items-center gap-2"
      >
        ← Back to Projects
      </button>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl"
      >
        {/* Header */}
        <div className="mb-12">
          <span className="font-mono text-sm text-cyber-cyan block mb-2">{project.category}</span>
          <h1 className="font-sans font-bold text-5xl text-charcoal mb-4">{project.title}</h1>
          {project.featured && (
            <span className="font-mono text-[11px] uppercase tracking-widest px-3 py-1.5 border border-cyber-cyan/40 text-cyber-cyan inline-block">
              Featured Project
            </span>
          )}
        </div>

        {/* Screenshot */}
        <div className="w-full h-96 bg-black/5 border border-black/10 rounded-lg overflow-hidden flex items-center justify-center mb-12 group">
          {project.screenshot ? (
            <img
              src={project.screenshot}
              alt={`${project.title} screenshot`}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="text-center">
              <span className="font-mono text-sm text-[#999999]">screenshot</span>
            </div>
          )}
        </div>

        {/* Description */}
        <div className="mb-12 prose prose-sm max-w-none">
          <p className="font-mono text-lg text-[#555555] leading-relaxed mb-6">{project.description}</p>

          {/* Tech Stack */}
          <div className="mb-8">
            <h2 className="font-sans font-bold text-2xl text-charcoal mb-4">Tech Stack</h2>
            <div className="flex flex-wrap gap-3">
              {project.tech.map((t) => (
                <Badge
                  key={t}
                  variant="outline"
                  className="font-mono text-sm border-cyber-cyan/30 text-cyber-cyan bg-cyber-cyan/5 rounded-lg px-3 py-1.5"
                >
                  {t}
                </Badge>
              ))}
            </div>
          </div>

          {/* Tags */}
          <div className="mb-8">
            <h3 className="font-sans font-bold text-lg text-charcoal mb-3">Categories</h3>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="font-mono text-xs uppercase tracking-widest px-2.5 py-1 border border-black/10 text-[#666666] bg-transparent rounded-none"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Links */}
        <div className="flex gap-4 pt-8 border-t border-black/10">
          {project.liveUrl && (
            <Button
              asChild
              className="font-mono text-sm uppercase tracking-wider bg-cyber-cyan text-charcoal hover:bg-soft-blue rounded-none px-6 py-3 transition-colors duration-300"
            >
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                View Live ↗
              </a>
            </Button>
          )}
          {project.repoUrl && (
            <Button
              asChild
              variant="outline"
              className="font-mono text-sm uppercase tracking-wider border-black/10 text-[#555555] hover:border-cyber-cyan hover:text-cyber-cyan rounded-none px-6 py-3 bg-transparent transition-all duration-300"
            >
              <a href={project.repoUrl} target="_blank" rel="noopener noreferrer">
                View Repository ↗
              </a>
            </Button>
          )}
        </div>
      </motion.div>

      {/* Related Projects */}
      <div className="mt-20 pt-20 border-t border-black/10">
        <h2 className="font-sans font-bold text-3xl text-charcoal mb-8">Other Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {allProjects
            .filter((p) => p.slug !== slug)
            .slice(0, 2)
            .map((p) => (
              <motion.div
                key={p.slug}
                whileHover={{ y: -4 }}
                className="bg-white border border-black/5 p-6 rounded-lg cursor-pointer"
                onClick={() => navigate(`/projects/${p.slug}`)}
              >
                <span className="font-mono text-xs text-cyber-cyan uppercase tracking-widest">{p.category}</span>
                <h3 className="font-sans font-bold text-lg text-charcoal mt-2 mb-3">{p.title}</h3>
                <p className="font-mono text-sm text-[#666666] line-clamp-2 mb-4">{p.description}</p>
                <span className="font-mono text-sm text-cyber-cyan hover:text-soft-blue transition-colors">
                  View Details →
                </span>
              </motion.div>
            ))}
        </div>
      </div>
    </SectionWrapper>
  )
}
