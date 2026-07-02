import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import ProjectsAccordion from '@/components/ProjectsAccordion'
import SectionWrapper from '@/components/SectionWrapper'
import TypedText from '@/components/TypedText'
import { allProjects } from '@/data/projects'

const featured = allProjects
  .filter((p) => p.featured)
  .slice(0, 3)
  .map((p, i) => ({ ...p, number: String(i + 1).padStart(2, '0') }))

export default function FeaturedProjects() {
  const [isCardActive, setIsCardActive] = useState(false)

  return (
    <SectionWrapper id="featured" label="// selected work">
      <div className={`${isCardActive ? 'pb-[800px]' : 'pb-96'} md:pb-0`}>
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <h2 className="font-sans font-bold text-4xl md:text-5xl text-snow leading-tight">
            <TypedText
              as="span"
              variant="terminal"
              startOnView
              text={[
                { text: "Featured ", className: "" },
                { text: "Projects", className: "text-cyber-cyan" },
              ]}
            />
          </h2>
          <Button
            asChild
            className="font-silom uppercase tracking-widest text-sm text-text-dim bg-transparent w-fit hover:bg-transparent hover:text-text-dim"
          >
            <Link to="/projects" className="flex items-center gap-2 transition-transform duration-300 origin-left hover:scale-[1.15]">
              View All
              <img src="/assets/images/arrow2.svg" alt="arrow" className="w-[84px] h-[84px]" />
            </Link>
          </Button>
        </div>

        <ProjectsAccordion projects={featured} onActiveChange={setIsCardActive} />
      </div>
    </SectionWrapper>
  )
}
