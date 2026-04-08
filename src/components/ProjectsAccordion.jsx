import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Badge } from './ui/badge'
import './ProjectsAccordion.css'

export default function ProjectsAccordion({ projects }) {
  const [activeIndex, setActiveIndex] = useState(-1)
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)

  const handleSlideClick = (index) => {
    if (activeIndex === index) {
      setActiveIndex(-1)
    } else {
      setActiveIndex(index)
    }
  }

  const handlePrevious = () => {
    const prevIndex = activeIndex === -1 ? projects.length - 1 : (activeIndex - 1 + projects.length) % projects.length
    setActiveIndex(prevIndex)
  }

  const handleNext = () => {
    const nextIndex = activeIndex === -1 ? 0 : (activeIndex + 1) % projects.length
    setActiveIndex(nextIndex)
  }

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') handlePrevious()
      if (e.key === 'ArrowRight') handleNext()
    }
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }
    document.addEventListener('keydown', handleKeyDown)
    window.addEventListener('resize', handleResize)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('resize', handleResize)
    }
  }, [activeIndex])

  return (
    <div className="flex items-center gap-5 w-full">
      {/* Previous button */}
      <button
        className="w-10 h-10 md:w-[50px] md:h-[50px] bg-cyan-500/10 border border-cyan-500/30 rounded-full text-[#2dd4bf] cursor-pointer transition-all duration-300 hover:bg-cyan-500/20 hover:border-cyan-500/60 backdrop-blur-[10px] flex-shrink-0 flex items-center justify-center font-mono font-semibold text-xl md:text-2xl"
        onClick={handlePrevious}
        aria-label="Previous project"
      >
        ‹
      </button>

      {/* Accordion Container */}
      <div className="flex-1 relative overflow-hidden min-h-[500px] md:min-h-[500px]">
        <div className="flex md:flex-row flex-col h-[500px] md:h-[500px] md:items-stretch relative gap-0">
          {projects.map((project, index) => {
            const isActive = activeIndex === index
            return (
              <div
                key={project.slug}
                className={`accordion-slide relative cursor-pointer bg-gradient-to-br from-[#1e1e1e] to-[#2d2d2d] transition-all duration-800 overflow-hidden ${
                  isActive
                    ? 'active md:flex-[2.5] grayscale-0'
                    : 'flex-1 grayscale-[80%] brightness-70 hover:grayscale-[30%] hover:brightness-[0.85]'
                }`}
                onClick={() => handleSlideClick(index)}
              >
                {/* Background screenshot */}
                {(project.accordionScreenshot || project.screenshot) && !isActive && (
                  <img
                    src={project.accordionScreenshot || project.screenshot}
                    alt={`${project.title} preview`}
                    className="collapsed-screenshot"
                  />
                )}

                {/* Rotated title (collapsed state) */}
                <div className="accordion-slide-title">
                  {project.title}
                </div>

                {/* Content area */}
                <div className="slide-content">
                  {/* Slide number */}
                  <div className={`text-5xl md:text-[64px] font-light text-[#2dd4bf] leading-none font-mono z-[3] mb-0 md:mb-0 ${isActive ? '' : 'md:absolute md:bottom-[30px] md:left-[30px]'}`}>
                    {project.number}
                  </div>

                  {/* Project info */}
                  <div className={`mb-5 transition-all duration-600 z-[3] relative ${isActive ? 'opacity-100 translate-y-0' : 'md:opacity-0 md:translate-y-[30px]'}`} style={{ transitionDelay: isActive ? '300ms' : '0ms' }}>
                    <div className="text-xs md:text-sm font-semibold text-white/80 mb-2 font-mono uppercase tracking-wider">{project.title}</div>
                    <h3 className="text-2xl md:text-[28px] font-bold mb-2 text-[#2dd4bf] font-sans">{project.title}</h3>
                    <p className="text-sm md:text-base text-white/80 font-mono leading-relaxed">{project.description}</p>
                  </div>

                  {/* Tech badges */}
                  <div className={`flex flex-wrap gap-2 transition-all duration-600 z-[3] relative ${isActive ? 'opacity-100 translate-y-0' : 'md:opacity-0 md:translate-y-[30px]'}`} style={{ transitionDelay: isActive ? '500ms' : '0ms' }}>
                    {project.tech.map((t, i) => (
                      <Badge
                        key={`${project.slug}-${t}`}
                        variant="outline"
                        className={`text-xs font-medium border-cyan-500/50 text-[#2dd4bf] bg-cyan-500/10 transition-all duration-300 ${isActive ? 'opacity-100 scale-100' : 'md:opacity-0 md:scale-75'}`}
                        style={{ transitionDelay: isActive ? `${550 + i * 50}ms` : '0ms' }}
                      >
                        {t}
                      </Badge>
                    ))}
                  </div>

                  {/* Project links */}
                  <div className={`flex gap-4 mt-5 transition-all duration-600 z-[3] relative ${isActive ? 'opacity-100 translate-y-0' : 'md:opacity-0 md:translate-y-[30px]'}`} style={{ transitionDelay: isActive ? '750ms' : '0ms' }}>
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-semibold text-[#2dd4bf] font-mono uppercase tracking-wider pb-1 border-b-2 border-transparent transition-all duration-300 hover:border-b-[#2dd4bf]"
                      >
                        Live Demo →
                      </a>
                    )}
                    {project.repoUrl && (
                      <a
                        href={project.repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-semibold text-[#2dd4bf] font-mono uppercase tracking-wider pb-1 border-b-2 border-transparent transition-all duration-300 hover:border-b-[#2dd4bf]"
                      >
                        Source Code →
                      </a>
                    )}
                    <Link
                      to={`/projects/${project.slug}`}
                      className="text-sm font-semibold text-[#2dd4bf] font-mono uppercase tracking-wider pb-1 border-b-2 border-transparent transition-all duration-300 hover:border-b-[#2dd4bf]"
                    >
                      Details →
                    </Link>
                  </div>
                </div>

                {/* Plus button */}
                <div className="add-button absolute bottom-[30px] md:bottom-[30px] right-[30px] md:right-[30px] w-8 h-8 bg-transparent border-2 border-[#2dd4bf] rounded-full flex items-center justify-center z-[3]"></div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Next button */}
      <button
        className="w-10 h-10 md:w-[50px] md:h-[50px] bg-cyan-500/10 border border-cyan-500/30 rounded-full text-[#2dd4bf] cursor-pointer transition-all duration-300 hover:bg-cyan-500/20 hover:border-cyan-500/60 backdrop-blur-[10px] flex-shrink-0 flex items-center justify-center font-mono font-semibold text-xl md:text-2xl"
        onClick={handleNext}
        aria-label="Next project"
      >
        ›
      </button>
    </div>
  )
}
