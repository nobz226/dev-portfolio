import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Badge } from './ui/badge'
import './ProjectsAccordion.css'

export default function ProjectsAccordion({ projects }) {
  const [activeIndex, setActiveIndex] = useState(-1)

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
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [activeIndex])

  return (
    <div className="projects-accordion-wrapper">
      <button className="navigation-arrows nav-prev" onClick={handlePrevious} aria-label="Previous project">
        ‹
      </button>

      <div className="projects-accordion-container">
        <div className="accordion-slider">
          {projects.map((project, index) => (
            <div
              key={project.slug}
              className={`accordion-slide ${activeIndex === index ? 'active' : ''}`}
              onClick={() => handleSlideClick(index)}
            >
              <div className="slide-content">
                <div className="slide-number">{project.number}</div>

                <div className="slide-title-section">
                  <div className="project-brand">{project.title}</div>
                  <h3 className="project-name">{project.title}</h3>
                  <p className="project-subtitle">{project.description}</p>
                </div>

                <div className="project-tech-list">
                  {project.tech.map((t) => (
                    <Badge
                      key={`${project.slug}-${t}`}
                      variant="outline"
                      className="tech-badge"
                    >
                      {t}
                    </Badge>
                  ))}
                </div>

                <div className="project-links">
                  {project.liveUrl && (
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="project-link">
                      Live Demo →
                    </a>
                  )}
                  {project.repoUrl && (
                    <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className="project-link">
                      Source Code →
                    </a>
                  )}
                  <Link to={`/projects/${project.slug}`} className="project-link">
                    Details →
                  </Link>
                </div>
              </div>

              <div className="add-button"></div>
            </div>
          ))}
        </div>
      </div>

      <button className="navigation-arrows nav-next" onClick={handleNext} aria-label="Next project">
        ›
      </button>
    </div>
  )
}
