import { motion } from 'framer-motion'
import SectionLabel from '@/components/SectionLabel'
import TypedText from '@/components/TypedText'

export default function AboutHero() {
  return (
    <>
      <section className="relative pt-40 pb-20 overflow-visible">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-20"
      >
        <SectionLabel label="// about me" variant="charcoal" />
      </motion.div>
      <div className="max-w-6xl mx-auto px-6 pt-10 relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-sans font-bold text-5xl md:text-7xl text-charcoal leading-none mb-6"
          >
            <TypedText as="span" text="The Developer " variant="glitch" />
            <TypedText as="span" text="Behind the Code" className="text-cyber-cyan" variant="glitch" />
          </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="font-mono text-base font-medium text-charcoal max-w-xl leading-relaxed"
        >
          <TypedText
            as="span"
            text="Skateboarder. Music producer. Full-stack developer. Every passion feeds the same obsession — relentless pursuit of quality and an eye for the invisible detail."
            variant="scramble"
          />
        </motion.p>
      </div>
    </section>
    </>
  )
}
