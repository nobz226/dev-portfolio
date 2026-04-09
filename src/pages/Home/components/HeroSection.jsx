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
      <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Grid background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(45,212,191,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(45,212,191,0.04) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* Radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#2dd4bf]/10 blur-3xl pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-6 pt-32 pb-20 w-full">
        {/* Hero background image - behind text */}
        <img
          src="/assets/images/wipeout.png"
          alt="background"
          className="hero-bg-image absolute object-cover pointer-events-none"
          style={{ width: '900px', height: '700px', left: '65%', top: '50%', transform: 'translate(-50%, -50%)', zIndex: 0 }}
        />
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
              <span className="font-mono text-base text-[#2dd4bf]">~/portfolio</span>
              <span className="font-mono text-base text-[#666666]">$</span>
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
                System & <span className="text-[#2dd4bf]">Soul</span>
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
              <span className="text-[#1e1e1e] font-bold">technical honesty</span> and{' '}
              <span className="text-[#1e1e1e] font-bold">artistic intent</span>.
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
                className="font-mono uppercase tracking-widest text-xs md:text-sm bg-[#2dd4bf] text-[#1e1e1e] hover:bg-[#22b8c7] rounded-none px-4 md:px-8 py-3 md:py-5 transition-all duration-300"
              >
                <Link to="/projects">View Work</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="font-mono uppercase tracking-widest text-xs md:text-sm border-black/20 text-[#555555] hover:border-[#2dd4bf] hover:text-[#2dd4bf] hover:bg-transparent rounded-none px-4 md:px-8 py-3 md:py-5 bg-transparent transition-all duration-300"
              >
                <Link to="/contact">Get In Touch</Link>
              </Button>
            </motion.div>
          </div>

          {/* Right: animated blob portrait */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.7, ease: 'easeOut' }}
            className="hero-portrait w-[1100px] h-[700px] lg:w-[1100px] lg:h-[700px] md:-ml-[280px] lg:-ml-[280px] flex items-center justify-center relative overflow-visible"
          >
            <PortraitRing />
          </motion.div>

        </div>
      </div>
    </section>
    </>
  )
}
