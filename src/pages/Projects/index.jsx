import { motion } from 'framer-motion'
import ProjectsGrid from './components/ProjectsGrid'
import SectionWrapper from '@/components/SectionWrapper'
import SectionLabel from '@/components/SectionLabel'
import { usePageMeta } from '@/hooks/usePageMeta'
import { useStructuredData } from '@/hooks/useStructuredData'

export default function Projects() {
  usePageMeta(
    'Projects - Eduard Rotaru | Full-Stack Development & Design',
    'Case studies and portfolio projects including music platforms, art galleries, e-commerce, and APIs. Featuring React, Next.js, Tailwind CSS, and modern web technologies.'
  )

  useStructuredData({
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Projects',
    description: 'Portfolio projects showcasing full-stack development and creative web experiences',
    creator: {
      '@type': 'Person',
      name: 'Eduard Rotaru',
    },
  })

  return (
    <>
      <main>
      {/* Page Hero */}
      <section className="relative pt-40 pb-12 overflow-visible">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <SectionLabel label="// selected work" variant="charcoal" />
        </motion.div>
        <div className="max-w-6xl mx-auto px-6 pt-10 relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-sans font-bold text-5xl md:text-7xl text-charcoal leading-none mb-6"
          >
            Projects & <span className="text-cyber-cyan">Case Studies</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="font-mono text-base font-medium text-charcoal max-w-xl leading-relaxed"
          >
            A curated selection of real-world work — engineered to be unbreakable
            and designed to make an impression.
          </motion.p>
        </div>
      </section>

      <SectionWrapper label={null} contentClassName="max-w-7xl">
        <ProjectsGrid />
      </SectionWrapper>
    </main>
    </>
  )
}
