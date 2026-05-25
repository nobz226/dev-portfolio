import { motion } from 'framer-motion'
import SectionWrapper from '../../../components/SectionWrapper'

export default function DifferentiationSection() {
  return (
    <SectionWrapper id="edge" label="// differentiation" variant="cyan" bannerBgColor="#22B8C7">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Text */}
        <div>
          <h2 className="font-sans font-bold text-4xl md:text-5xl text-charcoal mb-8 leading-tight">
            How I Stand <span className="text-snow">Apart</span>
          </h2>
          <p className="font-mono text-base font-medium text-charcoal/75 leading-relaxed mb-6">
            I bridge the gap between{' '}
            <span className="text-charcoal font-bold font-silom">technical rigor</span> and{' '}
            <span className="text-charcoal font-bold font-sans">creative expression</span>. My unique
            edge is my efficiency: I use{' '}
            <span className="text-snow font-bold">AI as a high-speed catalyst</span> to
            handle the repetitive, predictable manual labor — under my strict supervision and review.
          </p>
          <p className="font-mono text-base font-medium text-charcoal/75 leading-relaxed">
            This allows me to dedicate my cognitive energy to artistic details, custom animations,
            and strategic problem-solving that truly attract a client&apos;s audience. I offer the
            speed of modern technology paired with the soul and precision of a boutique craftsman.
          </p>
        </div>

        {/* Visual columns */}
        <div className="grid grid-cols-1 gap-px bg-black/5">
          {[
            {
              label: 'Technical Rigor',
              items: ['QA Discipline', '9yr Testing Exp.', 'Production-Ready', 'Performance-First'],
            },
            {
              label: 'Creative Soul',
              items: ['Custom Animations', 'Creative Design', 'Artistic Intent', 'Brand Identity'],
            },
          ].map((col, i) => (
            <motion.div
              key={col.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="bg-snow p-8"
            >
              <p className="font-silom text-base uppercase tracking-[0.25em] text-cyber-cyan mb-6">
                {col.label}
              </p>
              <ul className="flex flex-col gap-4">
                {col.items.map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <span className="w-1.5 h-1.5 bg-cyber-cyan shrink-0" />
                    <span className="font-sans text-lg text-charcoal/75">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  )
}
