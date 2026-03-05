import { motion } from 'framer-motion'
import ProjectsGrid from './components/ProjectsGrid'
import SectionWrapper from '../../components/SectionWrapper'
import SectionLabel from '../../components/SectionLabel'

export default function Projects() {
  return (
    <main>
      {/* Page Hero */}
      <section className="relative pt-40 pb-12">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(rgba(45,212,191,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(45,212,191,0.03) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <SectionLabel label="// selected work" />
        </motion.div>
        <div className="max-w-6xl mx-auto px-6 pt-10">
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-sans font-bold text-5xl md:text-7xl text-[#1e1e1e] leading-none mb-6"
          >
            Projects & <span className="text-[#2dd4bf]">Case Studies</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="font-mono text-base font-medium text-[#555555] max-w-xl leading-relaxed"
          >
            A curated selection of real-world work — engineered to be unbreakable
            and designed to make an impression.
          </motion.p>
        </div>
      </section>

      <SectionWrapper label={null}>
        <ProjectsGrid />
      </SectionWrapper>
    </main>
  )
}
