import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '../../../components/ui/button'
import ProjectsAccordion from '../../../components/ProjectsAccordion'
import SectionWrapper from '../../../components/SectionWrapper'

const featured = [
  {
    number: '01',
    slug: 'nobz-beats',
    title: 'Nobz Beats',
    description:
      'A full-stack music streaming platform with integrated audio player, dynamic visualizer, real-time database via Convex, responsive design, and admin dashboard for track/album management.',
    tech: ['React', 'Vite', 'Convex', 'Tailwind CSS'],
    liveUrl: 'https://nobz-beats-react.vercel.app/latest',
    repoUrl: 'https://github.com/nobz226/nobz-beats',
    screenshot: '/assets/images/nobzbeats.jpg',
  },
  {
    number: '02',
    slug: 'md-murals',
    title: 'MD Murals',
    description:
      'An interactive gallery portfolio for mural and canvas art with split-screen design, smooth GSAP animations, category filtering, UI sound effects, and admin content management.',
    tech: ['React', 'Vite', 'GSAP', 'Convex'],
    liveUrl: 'https://md-murals.vercel.app',
    repoUrl: 'https://github.com/nobz226/md-murals',
    screenshot: '/assets/images/mdmurals.jpg',
  },
  {
    number: '03',
    slug: 'ollie-north-skateshop',
    title: 'Ollie North Skateshop',
    description:
      'A full-featured skateboard e-commerce platform with 150+ products, advanced filtering, real-time cart management, Clerk authentication, Stripe payments, and admin dashboard.',
    tech: ['Next.js', 'React', 'Tailwind CSS', 'Convex'],
    liveUrl: 'https://ollie-north-skateshop.vercel.app/',
    repoUrl: 'https://github.com/nobz226/ollie-north-skateshop',
    screenshot: '/assets/images/skateshop.jpg',
  },
]

export default function FeaturedProjects() {
  const [isCardActive, setIsCardActive] = useState(false)
  const [hoveredArrow, setHoveredArrow] = useState(null)

  return (
    <SectionWrapper id="featured" label="// selected work">
      <div className={`${isCardActive ? 'pb-[800px]' : 'pb-96'} md:pb-0`}>
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <h2 className="font-sans font-bold text-4xl md:text-5xl text-[#f9f7f7] leading-tight">
            Featured <span className="text-[#2dd4bf]">Projects</span>
          </h2>
          <Button
            asChild
            className="font-silom uppercase tracking-widest text-sm text-[#aaaaaa] bg-transparent w-fit hover:bg-transparent hover:text-[#aaaaaa]"
          >
            <Link to="/projects" className="flex items-center gap-2" onMouseEnter={() => setHoveredArrow('viewAll')} onMouseLeave={() => setHoveredArrow(null)} style={{ transform: hoveredArrow === 'viewAll' ? 'scale(1.15)' : 'scale(1)', transition: 'transform 300ms', transformOrigin: 'left center' }}>
              View All
              <img src="/assets/images/arrow2.svg" alt="arrow" style={{ width: '84px', height: '84px' }} />
            </Link>
          </Button>
        </div>

        <ProjectsAccordion projects={featured} onActiveChange={setIsCardActive} />
      </div>
    </SectionWrapper>
  )
}
