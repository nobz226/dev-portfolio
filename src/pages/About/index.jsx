import AboutHero from './components/AboutHero'
import CoreValues from './components/CoreValues'
import DifferentiationSection from './components/DifferentiationSection'
import MissionStatement from './components/MissionStatement'
import CareerInternship from './components/CareerInternship'
import { usePageMeta } from '@/hooks/usePageMeta'

export default function About() {
  usePageMeta(
    'About Eduard Rotaru - Full-Stack Developer & Creative Technologist',
    'Learn about Eduard Rotaru, a full-stack developer with 9+ years of QA discipline, combining technical rigor with creative expression to build high-fidelity web experiences.'
  )

  return (
    <main>
      <AboutHero />
      <CoreValues />
      <DifferentiationSection />
      <CareerInternship />
      <MissionStatement />
    </main>
  )
}
