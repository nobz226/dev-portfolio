import { useState } from 'react'
import AboutHero from './components/AboutHero'
import CoreValues from './components/CoreValues'
import DifferentiationSection from './components/DifferentiationSection'
import MissionStatement from './components/MissionStatement'
import CareerInternship from './components/CareerInternship'
import { usePageMeta } from '@/hooks/usePageMeta'

export default function About() {
  const [heroDone, setHeroDone] = useState(false)

  usePageMeta(
    'About Eduard Rotaru - Full-Stack Developer & Creative Technologist',
    'Learn about Eduard Rotaru, a full-stack developer with 9+ years of QA discipline, combining technical rigor with creative expression to build high-fidelity web experiences.'
  )

  return (
    <main>
      <AboutHero onHeroComplete={() => setHeroDone(true)} />
      <CoreValues heroDone={heroDone} />
      <DifferentiationSection />
      <CareerInternship />
      <MissionStatement />
    </main>
  )
}
