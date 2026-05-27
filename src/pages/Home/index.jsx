import HeroSection from './components/HeroSection'
import FeaturedProjects from './components/FeaturedProjects'
import TechStack from './components/TechStack'
import { usePageMeta } from '@/hooks/usePageMeta'
import { useStructuredData } from '@/hooks/useStructuredData'
import { PERSONAL, SOCIAL } from '@/data/config'

export default function Home() {
  usePageMeta(
    'Eduard Rotaru - Full-Stack Developer and Digital Creative',
    'Portfolio of Eduard Rotaru, a full-stack developer specializing in React, Next.js, and creative web experiences. Featuring music platforms, art galleries, and e-commerce solutions.'
  )

  useStructuredData({
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: PERSONAL.name,
    url: `https://${PERSONAL.domain}`,
    image: `https://${PERSONAL.domain}/favicon.svg`,
    jobTitle: PERSONAL.title,
    worksFor: {
      '@type': 'Organization',
      name: 'Freelance',
    },
    sameAs: [
      SOCIAL.GitHub.href,
      SOCIAL.LinkedIn.href,
    ],
    email: PERSONAL.email,
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
