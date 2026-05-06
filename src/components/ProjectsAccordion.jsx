import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Badge } from './ui/badge'
import './ProjectsAccordion.css'

export default function ProjectsAccordion({ projects, onActiveChange }) {
  const [activeIndex, setActiveIndex] = useState(-1)
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)
  const [hoveredArrow, setHoveredArrow] = useState(null)

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
    if (onActiveChange) {
      onActiveChange(activeIndex !== -1)
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('resize', handleResize)
    }
  }, [activeIndex, onActiveChange])

  return (
    <div className="w-full overflow-visible relative flex items-center">
      {/* Accordion Container */}
      <div className="flex-1 relative md:overflow-hidden overflow-visible md:min-h-[500px] w-full">
        <div className="flex md:flex-row flex-col h-[500px] md:h-[500px] md:items-stretch relative gap-0 w-full min-w-0">
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
                  <div className={`text-5xl md:text-[64px] font-light text-[#2dd4bf] leading-none font-mono z-[3] mb-0 md:mb-0 ${isActive ? '' : 'md:absolute md:bottom-[30px] md:left-[30px] hidden md:block'}`}>
                    {project.number}
                  </div>

                  {/* Project info */}
                  <div className={`mb-5 transition-all duration-600 z-[3] relative ${isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[30px] md:opacity-0 md:translate-y-[30px]'}`} style={{ transitionDelay: isActive ? '300ms' : '0ms' }}>
                    <div className="text-xs md:text-sm font-semibold text-white/80 mb-2 font-mono uppercase tracking-wider">{project.title}</div>
                    <h3 className="text-2xl md:text-[28px] font-bold mb-2 text-[#2dd4bf] font-sans">{project.title}</h3>
                    <p className="text-sm md:text-base text-white/80 font-mono leading-relaxed">{project.description}</p>
                  </div>

                  {/* Tech badges */}
                  <div className={`flex flex-wrap gap-2 transition-all duration-600 z-[3] relative ${isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[30px] md:opacity-0 md:translate-y-[30px]'}`} style={{ transitionDelay: isActive ? '500ms' : '0ms' }}>
                    {project.tech.map((t, i) => (
                      <Badge
                        key={`${project.slug}-${t}`}
                        variant="outline"
                        className={`text-xs font-medium border-cyan-500/50 text-[#2dd4bf] bg-cyan-500/10 transition-all duration-300 ${isActive ? 'opacity-100 scale-100' : 'opacity-0 scale-75 md:opacity-0 md:scale-75'}`}
                        style={{ transitionDelay: isActive ? `${550 + i * 50}ms` : '0ms' }}
                      >
                        {t}
                      </Badge>
                    ))}
                  </div>

                  {/* Project links */}
                  <div className={`flex gap-4 mt-5 transition-all duration-600 z-[3] relative ${isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[30px] md:opacity-0 md:translate-y-[30px]'}`} style={{ transitionDelay: isActive ? '750ms' : '0ms' }}>
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
className="text-xs text-[#2dd4bf] font-silom uppercase tracking-wider flex items-center gap-1 md:gap-2 hover:text-[#2dd4bf] hover:bg-transparent"
                         onMouseEnter={() => setHoveredArrow(`live-${project.slug}`)}
                         onMouseLeave={() => setHoveredArrow(null)}
                         style={{ transform: hoveredArrow === `live-${project.slug}` ? 'scale(1.15)' : 'scale(1)', transition: 'transform 300ms', transformOrigin: 'left center' }}
                       >
                         Live Demo
                         <img src="/assets/images/arrow.svg" alt="arrow" className="w-12 h-12" />
                      </a>
                    )}
                    {project.repoUrl && (
                      <a
                        href={project.repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-[#2dd4bf] font-silom uppercase tracking-wider flex items-center gap-1 md:gap-2 hover:text-[#2dd4bf] hover:bg-transparent"
                        onMouseEnter={() => setHoveredArrow(`repo-${project.slug}`)}
                        onMouseLeave={() => setHoveredArrow(null)}
                        style={{ transform: hoveredArrow === `repo-${project.slug}` ? 'scale(1.15)' : 'scale(1)', transition: 'transform 300ms', transformOrigin: 'left center' }}
                      >
                        Source Code
                                                  <img src="/assets/images/codeIcon.svg" alt="code" className="w-12 h-12" />
                      </a>
                    )}
                    <Link
                      to={`/projects/${project.slug}`}
                      className="text-xs text-[#2dd4bf] font-silom uppercase tracking-wider flex items-center gap-1 md:gap-2 hover:text-[#2dd4bf] hover:bg-transparent"
                      onMouseEnter={() => setHoveredArrow(`details-${project.slug}`)}
                      onMouseLeave={() => setHoveredArrow(null)}
                      style={{ transform: hoveredArrow === `details-${project.slug}` ? 'scale(1.15)' : 'scale(1)', transition: 'transform 300ms', transformOrigin: 'left center' }}
                    >
                      Details
                      <img src="/assets/images/detailsIcon.svg" alt="details" className="w-12 h-12" />
                    </Link>
                  </div>

                  {/* Project screenshot - mobile only */}
                  {isActive && (project.screenshot || project.accordionScreenshot) && (
                    <img
                      src={project.screenshot || project.accordionScreenshot}
                      alt={`${project.title} screenshot`}
                      className="md:hidden w-full h-auto mt-6 rounded-sm object-cover"
                    />
                  )}
                </div>

                  {/* Expand/Close button */}
                  <div className="absolute bottom-0 right-0 w-12 h-12 z-[3]">
                    <img
                      src={isActive ? '/assets/images/close.svg' : '/assets/images/expand.svg'}
                      alt={isActive ? 'close' : 'expand'}
                      style={{ width: '100%', height: '100%' }}
                    />
                  </div>
              </div>
            )
          })}
        </div>
      </div>


       {/* Previous button - absolutely positioned */}
       <button
         className="hidden md:flex w-16 h-16 bg-transparent border-none text-[#2dd4bf] cursor-pointer transition-all duration-300 hover:scale-125 items-center justify-center font-mono font-semibold text-xl md:text-2xl"
         onClick={handlePrevious}
         aria-label="Previous project"
         style={{ position: 'absolute', left: '-64px', top: '50%', transform: 'translateY(-50%)', zIndex: 10 }}
       >
         <img src="/assets/images/accordionArrow.svg" alt="previous" style={{ width: '56px', height: '56px', maxWidth: 'none', maxHeight: 'none', transform: 'scaleX(-1) rotate(180deg)' }} />
       </button>

       {/* Next button - absolutely positioned */}
       <button
         className="hidden md:flex w-16 h-16 bg-transparent border-none text-[#2dd4bf] cursor-pointer transition-all duration-300 hover:scale-125 items-center justify-center font-mono font-semibold text-xl md:text-2xl"
         onClick={handleNext}
         aria-label="Next project"
         style={{ position: 'absolute', right: '-64px', top: '50%', transform: 'translateY(-50%)', zIndex: 10 }}
       >
         <img src="/assets/images/accordionArrow.svg" alt="next" style={{ width: '56px', height: '56px', maxWidth: 'none', maxHeight: 'none', transform: 'rotate(180deg)' }} />
       </button>
    </div>
  )
}
