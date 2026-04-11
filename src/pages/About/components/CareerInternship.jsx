import { useState } from 'react'
import { motion } from 'framer-motion'
import SectionWrapper from '../../../components/SectionWrapper'

export default function CareerInternship() {
  const [hoveredArrow, setHoveredArrow] = useState(null)
  return (
    <SectionWrapper id="career" label="// internship goals">
      <div className="max-w-3xl">
        <h2 className="font-sans font-bold text-4xl md:text-5xl text-[#f9f7f7] mb-8 leading-tight">
          Seeking <span className="text-[#2dd4bf]">Internship Opportunities</span>
        </h2>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="space-y-6"
        >
          <p className="font-mono text-lg md:text-xl text-[#f9f7f7]/90 leading-relaxed">
            I'm actively pursuing internship opportunities with creative agencies, digital studios, and media companies in the new media field. My goal is to collaborate with teams that value both{' '}
            <span className="text-[#2dd4bf] font-silom">technical excellence</span> and{' '}
            <span className="text-[#2dd4bf] font-sans">creative innovation</span>.
          </p>

          <p className="font-silom text-base text-[#f9f7f7]/80 leading-relaxed">
            I'm particularly interested in roles where I can:
          </p>

          <ul className="space-y-3 pl-6">
            {[
              'Build high-performance, aesthetically refined web experiences',
              'Collaborate with designers, creative directors, and product teams',
              'Work on real-world projects with measurable impact',
              'Learn industry best practices and emerging technologies',
              'Contribute to client projects for agencies and creative studios',
            ].map((item, i) => (
              <motion.li
                key={item}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="flex items-start gap-3 font-silom text-base text-[#f9f7f7]/80 hover:text-[#f9f7f7]/80"
                onMouseEnter={() => setHoveredArrow(i)}
                onMouseLeave={() => setHoveredArrow(null)}
                style={{ transform: hoveredArrow === i ? 'scale(1.15)' : 'scale(1)', transition: 'transform 300ms', transformOrigin: 'left center' }}
              >
                <img src="/assets/images/arrow2.svg" alt="arrow" style={{ width: '72px', height: '72px', marginTop: '2px', flexShrink: 0 }} />
                <span>{item}</span>
              </motion.li>
            ))}
          </ul>

          <p className="font-mono text-base text-[#f9f7f7]/80 leading-relaxed pt-4">
            If you're looking for an internship candidate with strong technical foundations, a passion for design excellence, and the drive to deliver polished digital products, I'd love to discuss opportunities.
          </p>
        </motion.div>
      </div>
    </SectionWrapper>
  )
}
