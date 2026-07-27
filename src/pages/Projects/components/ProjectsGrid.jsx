import { useState, useRef } from 'react'
import ProjectListItem from './ProjectCard'
import { allProjects } from '@/data/projects'

const allTags = ['All', ...[...new Set(allProjects.flatMap((p) => p.tags))].sort()]

export default function ProjectsGrid() {
  const [active, setActive] = useState('All')
  const listRef = useRef(null)

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

      {/* Screen reader status */}
      <div role="status" aria-live="polite" className="sr-only">
        {filtered.length === 0
          ? 'No projects match this filter.'
          : `Showing ${filtered.length} project${filtered.length === 1 ? '' : 's'} with filter: ${active}.`}
      </div>

      {/* Stacked cards on mobile, scrollable list on desktop */}
      <div
        ref={listRef}
        className="flex flex-col gap-12 md:gap-8 md:max-h-[600px] md:overflow-y-auto md:overflow-x-hidden md:scroll-smooth"
      >
        {filtered.map((project, i) => (
          <ProjectListItem key={project.slug} project={project} index={i} />
        ))}
      </div>
    </div>
  )
}
