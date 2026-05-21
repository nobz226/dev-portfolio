import HeroSection from './components/HeroSection'
import FeaturedProjects from './components/FeaturedProjects'
import TechStack from './components/TechStack'
import { usePageMeta } from '../../hooks/usePageMeta'
import { useStructuredData } from '../../hooks/useStructuredData'

export default function Home() {
  usePageMeta(
    'Eduard Rotaru - Full-Stack Developer and Digital Creative',
    'Portfolio of Eduard Rotaru, a full-stack developer specializing in React, Next.js, and creative web experiences. Featuring music platforms, art galleries, and e-commerce solutions.'
  )

  useStructuredData({
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Eduard Rotaru',
    url: 'https://eduardrotaru.dev',
    image: 'https://eduardrotaru.dev/favicon.svg',
    jobTitle: 'Full-Stack Developer',
    worksFor: {
      '@type': 'Organization',
      name: 'Freelance',
    },
    sameAs: [
      'https://github.com/nobz226',
      'https://www.linkedin.com/in/eduard-rotaru-b63b11124/',
    ],
    email: 'eduard.rotaru89@gmail.com',
    description:
      'Full-stack developer specializing in React, Next.js, and creative web experiences with 9+ years of QA background.',
  })

  return (
    <main>
      <HeroSection />
      <FeaturedProjects />
      <TechStack />
    </main>
  )
}
