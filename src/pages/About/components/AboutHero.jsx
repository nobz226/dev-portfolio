import { motion } from 'framer-motion'
import SectionLabel from '../../../components/SectionLabel'

export default function AboutHero() {
  return (
    <section className="relative pt-40 pb-20 overflow-visible">
      {/* Wipeout background image */}
      <img
        src="/assets/images/wipeout2.png"
        alt="background"
        className="absolute left-0 top-1/2 transform -translate-y-1/2 object-contain pointer-events-none z-10"
        style={{ width: '1200px', height: '1300px', marginLeft: '-300px', opacity: 1 }}
      />
      {/* Grid bg */}
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
        className="relative z-20"
      >
        <SectionLabel label="// about me" />
      </motion.div>
      <div className="max-w-6xl mx-auto px-6 pt-10 relative z-10">
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-sans font-bold text-5xl md:text-7xl text-[#1e1e1e] leading-none mb-6"
        >
          The Developer <span className="text-[#2dd4bf]">Behind the Code</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="font-mono text-base font-medium text-[#555555] max-w-xl leading-relaxed"
        >
          Skateboarder. Music producer. Full-stack developer. Every passion feeds the same obsession —
          relentless pursuit of quality and an eye for the invisible detail.
        </motion.p>
      </div>
    </section>
  )
}
