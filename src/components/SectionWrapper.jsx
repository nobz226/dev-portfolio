import { motion } from 'framer-motion'
import { memo } from 'react'
import SectionLabel from './SectionLabel'
import { useWindowWidth } from '@/hooks/useWindowWidth'

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
function SectionWrapper({ id, label, children, className = '', variant = 'dark', labelVariant, bannerBgColor = null, contentClassName = '' }) {
  const windowWidth = useWindowWidth()

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
        className={`absolute inset-0 pointer-events-none ${variant === 'cyan' ? 'bg-cyber-cyan' : 'bg-charcoal'} ${windowWidth < 1000 ? 'section-wrapper-no-clip' : 'section-wrapper-clip'}`}
      />
      {/* Label sits above shape */}
      {label && (
        <div className="relative z-10">
          <SectionLabel label={label} variant={labelVariant || variant} bannerBgColor={bannerBgColor} />
        </div>
      )}
      {/* Content — right padding keeps text inside the arrow cutout on desktop only (1200px+) */}
      <div className={`relative z-10 max-w-5xl mx-auto pl-6 pr-6 xl:pr-24 py-16 ${contentClassName}`}>
        {children}
      </div>
    </motion.section>
  )
}

export default memo(SectionWrapper)
