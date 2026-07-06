import { useState } from 'react'
import { motion } from 'framer-motion'
import SectionWrapper from '@/components/SectionWrapper'
import TypedText from '@/components/TypedText'

export default function MissionStatement() {
  const [titleDone, setTitleDone] = useState(false)

  return (
    <SectionWrapper id="mission" label="// mission statement" variant="cyan" labelVariant="soft-blue">
      <div className="max-w-3xl">
        <h2 className="font-sans font-bold text-4xl md:text-5xl text-charcoal mb-10 leading-tight">
          <TypedText
            as="span"
            variant="terminal"
            startOnView
            onComplete={() => setTitleDone(true)}
            cursorColor="#f9f7f7"
            text={[
              { text: "The Ongoing ", className: "" },
              { text: "\u201cWhy\u201d", className: "text-snow" },
            ]}
          />
        </h2>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={titleDone ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
        <motion.blockquote
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative pl-8 border-l-2 border-snow"
        >
          <p className="font-mono text-lg md:text-xl text-charcoal/90 leading-relaxed">
            To transform complex ideas into high-fidelity web experiences through{' '}
            <span className="text-snow font-bold font-silom">technical honesty</span> and{' '}
            <span className="text-snow font-bold font-sans">artistic intent</span>, leveraging
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
          {[
            { label: 'Soul', font: 'font-sans' },
            { label: 'Systems', font: 'font-silom' },
            { label: 'AI-Catalysis', font: 'font-mono' }
          ].map((tag) => (
            <span
              key={tag.label}
              className={`${tag.font} text-sm uppercase tracking-widest px-4 py-2 border border-snow text-snow`}
            >
              {tag.label}
            </span>
          ))}
        </motion.div>
      </motion.div>
      </div>
    </SectionWrapper>
  )
}
