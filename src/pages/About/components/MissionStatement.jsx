import { motion } from 'framer-motion'
import SectionWrapper from '../../../components/SectionWrapper'

export default function MissionStatement() {
  return (
    <SectionWrapper id="mission" label="// mission statement" variant="cyan" bannerBgColor="#22B8C7">
      <div className="max-w-3xl">
        <h2 className="font-sans font-bold text-4xl md:text-5xl text-charcoal mb-10 leading-tight">
          The Ongoing <span className="text-snow">&ldquo;Why&rdquo;</span>
        </h2>

        <motion.blockquote
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative pl-8 border-l-2 border-snow"
        >
          <p className="font-mono text-lg md:text-xl text-charcoal/90 leading-relaxed">
            To transform complex ideas into high-fidelity web experiences through{' '}
            <span className="text-snow font-bold">technical honesty</span> and{' '}
            <span className="text-snow font-bold">artistic intent</span>, leveraging
            AI-accelerated workflows to deliver polished, resilient, and soul-driven
            digital products for clients and agencies alike.
          </p>
        </motion.blockquote>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-8 flex flex-wrap gap-4"
        >
          {['Soul', 'Systems', 'AI-Catalysis'].map((tag) => (
            <span
              key={tag}
              className="font-mono text-sm uppercase tracking-widest px-4 py-2 border border-snow text-snow"
            >
              {tag}
            </span>
          ))}
        </motion.div>
      </div>
    </SectionWrapper>
  )
}
