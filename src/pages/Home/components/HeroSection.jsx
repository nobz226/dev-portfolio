import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import TerminalText from '../../../components/TerminalText'
import { Button } from '../../../components/ui/button'

// "<there is a ghost in the machine/> " = 35 chars
// Dark positions: 0 (<), 32 (/), 33 (>)
const PHRASE = '<there is a ghost in the machine/> '
const PHRASE_LEN = PHRASE.length // 35
const REPEAT = 4
const ALL_CHARS = Array.from(PHRASE.repeat(REPEAT)) // 140 chars
const TOTAL = ALL_CHARS.length
const CONTAINER = 520  // px, total div size
const TEXT_RADIUS = 225 // px from center to char center

function isDark(i) {
  const p = i % PHRASE_LEN
  return p === 0 || p === 32 || p === 33
}

function PortraitRing() {
  const angleStep = (2 * Math.PI) / TOTAL
  return (
    <div style={{ position: 'relative', width: CONTAINER, height: CONTAINER, flexShrink: 0 }}>
      {/* Circular portrait */}
      <img
        src="/assets/images/eduardrotaru.jpg"
        alt="Eduard Rotaru"
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 420,
          height: 420,
          borderRadius: '50%',
          objectFit: 'cover',
        }}
      />
      {/* Rotating text ring */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        style={{ position: 'absolute', inset: 0 }}
      >
        {ALL_CHARS.map((char, i) => {
          const angle = angleStep * i
          const x = CONTAINER / 2 + TEXT_RADIUS * Math.sin(angle)
          const y = CONTAINER / 2 - TEXT_RADIUS * Math.cos(angle)
          const deg = (angle * 180) / Math.PI
          return (
            <span
              key={i}
              style={{
                position: 'absolute',
                left: x,
                top: y,
                transform: `translate(-50%, -50%) rotate(${deg}deg)`,
                fontSize: '14px',
                fontFamily: '"Courier Prime", "Courier New", monospace',
                fontWeight: 700,
                color: isDark(i) ? '#1e1e1e' : '#2dd4bf',
                lineHeight: 1,
                userSelect: 'none',
              }}
            >
              {char === ' ' ? '\u00a0' : char}
            </span>
          )
        })}
      </motion.div>
    </div>
  )
}

export default function HeroSection() {
  return (
    <>
      <section className="relative min-h-screen flex items-center">
      <div className="relative max-w-6xl mx-auto px-6 pt-32 pb-20 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">

          {/* Left: text content */}
          <div>
            {/* Prompt line */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-3 mb-6"
            >
              <span className="font-mono text-base text-[#1e1e1e]">~/portfolio</span>
              <span className="font-mono text-base text-[#1e1e1e]">$</span>
              <TerminalText
                text="whoami"
                delay={200}
                speed={80}
                className="text-base text-[#1e1e1e]"
              />
            </motion.div>

            {/* Name */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.9 }}
            >
              <h1 className="font-sans font-bold text-5xl md:text-7xl lg:text-8xl text-[#1e1e1e] leading-none tracking-tight">
                <span className="font-silom">System</span> <span className="font-mono text-[#22b8c7]">&</span> <span className="text-[#2dd4bf]">Soul</span>
              </h1>
            </motion.div>

            {/* Title */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.1 }}
              className="font-mono text-lg md:text-xl text-[#2dd4bf] mt-4 mb-6"
            >
              Full-Stack Web Developer
            </motion.p>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.3 }}
              className="font-mono text-[#555555] max-w-xl text-base md:text-lg font-medium leading-relaxed mb-10"
            >
              Transforming complex ideas into high-fidelity web experiences through{' '}
              <span className="text-[#1e1e1e] font-bold font-silom">technical honesty</span> and{' '}
              <span className="text-[#1e1e1e] font-bold font-sans">artistic intent</span>.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.5 }}
              className="flex flex-nowrap gap-3 md:gap-4 flex-wrap md:flex-nowrap"
            >
              <Button
                asChild
                className="font-silom uppercase tracking-widest text-xs md:text-sm bg-[#2dd4bf] text-[#1e1e1e] hover:bg-[#22b8c7] rounded-none px-4 md:px-8 py-3 md:py-5 transition-all duration-300"
              >
                <Link to="/projects">View Work</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="font-silom uppercase tracking-widest text-xs md:text-sm border-black/20 text-[#555555] hover:border-[#2dd4bf] hover:text-[#2dd4bf] hover:bg-transparent rounded-none px-4 md:px-8 py-3 md:py-5 bg-transparent transition-all duration-300"
              >
                <Link to="/contact">Get In Touch</Link>
              </Button>
            </motion.div>

            {/* Scroll indicator arrow */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.5 }}
              className="absolute -bottom-32 left-6 flex flex-col items-center"
            >
              <motion.img
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                src="/assets/images/homeArrow.svg"
                alt="scroll down"
                className="w-60 h-60 -mt-2"
              />
            </motion.div>
          </div>

          {/* Right: animated blob portrait */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.7, ease: 'easeOut' }}
            className="hero-portrait w-[1100px] h-[700px] lg:w-[1100px] lg:h-[700px] md:-ml-[200px] lg:-ml-[200px] flex items-center justify-center relative overflow-visible"
          >
            <PortraitRing />
          </motion.div>

        </div>
      </div>
    </section>
    </>
  )
}
