import { useState } from 'react'
import ProjectCard from './ProjectCard'
import { allProjects } from '../../../data/projects'

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
            className={`font-silom text-sm uppercase tracking-widest px-4 py-2 transition-all duration-300 border ${
              active === tag
                ? 'border-cyber-cyan text-charcoal bg-cyber-cyan'
                : 'border-black/10 text-muted-foreground bg-transparent hover:border-cyber-cyan/50 hover:text-cyber-cyan'
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
