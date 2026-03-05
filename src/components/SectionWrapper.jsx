import { motion } from 'framer-motion'
import SectionLabel from './SectionLabel'

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
}

/**
 * SectionWrapper — wraps page sections with a consistent layout,
 * optional section label, and a scroll-triggered fade-up animation.
 */
export default function SectionWrapper({ id, label, children, className = '', variant = 'dark' }) {
  const bgColor = variant === 'cyan' ? '#2dd4bf' : '#1e1e1e'
  return (
    <motion.section
      id={id}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      variants={fadeUp}
      className={`relative ${className}`}
    >
      {/* Pentagon background shape */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundColor: bgColor,
          clipPath: 'polygon(0 0, calc(100% - 48px) 0, 100% 50%, calc(100% - 48px) 100%, 0 100%)',
        }}
      />
      {/* Label sits above shape */}
      {label && (
        <div className="relative z-10">
          <SectionLabel label={label} variant={variant} />
        </div>
      )}
      {/* Content — right padding keeps text inside the arrow cutout */}
      <div className="relative z-10 max-w-5xl mx-auto pl-6 pr-24 py-16">
        {children}
      </div>
    </motion.section>
  )
}
