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
export default function SectionWrapper({ id, label, children, className = '', variant = 'dark', customClipPath = null }) {
  const bgColor = variant === 'cyan' ? '#2dd4bf' : '#1e1e1e'

  const getClipPath = () => {
    if (customClipPath) return customClipPath
    if (typeof window === 'undefined') return 'polygon(0 0, calc(100% - 48px) 0, 100% 50%, calc(100% - 48px) 100%, 0 100%)'
    return window.innerWidth < 960 ? 'none' : 'polygon(0 0, calc(100% - 48px) 0, 100% 50%, calc(100% - 48px) 100%, 0 100%)'
  }

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
          clipPath: getClipPath(),
        }}
      />
      {/* Label sits above shape */}
      {label && (
        <div className="relative z-10">
          <SectionLabel label={label} variant={variant} />
        </div>
      )}
      {/* Content — right padding keeps text inside the arrow cutout on desktop only (1200px+) */}
      <div className="relative z-10 max-w-5xl mx-auto pl-6 pr-6 xl:pr-24 py-16">
        {children}
      </div>
    </motion.section>
  )
}
