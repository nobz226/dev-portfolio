import { Link } from 'react-router-dom'
import { Button } from '../../../components/ui/button'
import ProjectsAccordion from '../../../components/ProjectsAccordion'
import SectionWrapper from '../../../components/SectionWrapper'
import mdMuralsScreenshot from '../../../assets/mdmurals.png'
import nobzBeatsScreenshot from '../../../assets/nobzbeats.png'
import skateshopScreenshot from '../../../assets/skateshop.png'

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
    screenshot: nobzBeatsScreenshot,
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
    screenshot: mdMuralsScreenshot,
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
    screenshot: skateshopScreenshot,
  },
]

export default function FeaturedProjects() {
  return (
    <SectionWrapper id="featured" label="// selected work">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
        <h2 className="font-sans font-bold text-4xl md:text-5xl text-[#f9f7f7] leading-tight">
          Featured <span className="text-[#2dd4bf]">Projects</span>
        </h2>
        <Button
          asChild
          variant="outline"
          className="font-mono uppercase tracking-widest text-sm border-white/20 text-[#aaaaaa] hover:border-[#2dd4bf] hover:text-[#2dd4bf] hover:bg-transparent rounded-none px-6 py-4 bg-transparent w-fit transition-all duration-300"
        >
          <Link to="/projects">View All →</Link>
        </Button>
      </div>

      <ProjectsAccordion projects={featured} />
    </SectionWrapper>
  )
}
