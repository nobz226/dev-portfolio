import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import TerminalText from '@/components/TerminalText'
import TypedText from '@/components/TypedText'
import { Button } from '@/components/ui/button'
import HexPattern from '@/components/ui/HexPattern'

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
    <div className="relative w-[520px] h-[520px] shrink-0" aria-hidden="true">
      {/* Circular portrait */}
      <img
        src="/assets/images/eduardrotaru.jpg"
        alt="Eduard Rotaru"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[420px] h-[420px] rounded-full object-cover"
      />
      {/* Rotating text ring */}
      <motion.div
        aria-hidden="true"
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        className="absolute inset-0"
      >
        {ALL_CHARS.map((char, i) => {
          const angle = angleStep * i
          const x = CONTAINER / 2 + TEXT_RADIUS * Math.sin(angle)
          const y = CONTAINER / 2 - TEXT_RADIUS * Math.cos(angle)
          const deg = (angle * 180) / Math.PI
          return (
            <span
              key={i}
              className={`absolute text-sm font-mono font-bold leading-none select-none ${isDark(i) ? 'text-charcoal' : 'text-cyber-cyan'}`}
              style={{
                left: x,
                top: y,
                transform: `translate(-50%, -50%) rotate(${deg}deg)`,
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
              <span className="font-mono text-base text-charcoal">~/portfolio</span>
              <span className="font-mono text-base text-charcoal">$</span>
              <TerminalText
                text="whoami"
                delay={200}
                speed={80}
                className="text-base text-charcoal"
              />
            </motion.div>

            {/* Name */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.9 }}
            >
              <h1 className="font-sans font-bold text-5xl md:text-7xl lg:text-8xl text-charcoal leading-none tracking-tight">
                <TypedText as="span" text="System" className="font-silom" variant="glitch" typingSpeed={80} glitchInterval={120} />
                {' '}
                <TypedText as="span" text="&" className="font-mono text-soft-blue" variant="glitch" typingSpeed={80} glitchInterval={120} />
                {' '}
                <TypedText as="span" text="Soul" className="text-cyber-cyan" variant="glitch" typingSpeed={80} glitchInterval={120} />
              </h1>
            </motion.div>

            {/* Title */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.1 }}
              className="font-mono text-lg md:text-xl text-cyber-cyan mt-4 mb-6"
            >
              <TypedText
                as="span"
                text="Full-Stack Web Developer"
                variant="scramble"
              />
            </motion.p>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.3 }}
              className="font-mono text-muted-foreground max-w-xl text-base md:text-lg font-medium leading-relaxed mb-10"
            >
              <TypedText as="span" text="Transforming complex ideas into high-fidelity web experiences through" variant="scramble" />
              {' '}
              <TypedText as="span" text="technical honesty" className="text-charcoal font-bold font-silom" variant="scramble" />
              {' '}
              <TypedText as="span" text="and" variant="scramble" />
              {' '}
              <TypedText as="span" text="artistic intent" className="text-charcoal font-bold font-sans text-nowrap" variant="scramble" />
              <TypedText as="span" text="." variant="scramble" />
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.5 }}
              className="flex flex-nowrap gap-3 md:gap-4 flex-wrap md:flex-nowrap justify-center md:justify-start"
            >
              <Button
                asChild
                className="font-silom uppercase tracking-widest text-xs md:text-sm bg-cyber-cyan text-charcoal hover:bg-soft-blue rounded-none px-4 md:px-8 py-3 md:py-5 transition-all duration-300"
              >
                <Link to="/projects">View Work</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="font-silom uppercase tracking-widest text-xs md:text-sm border-black/20 text-muted-foreground hover:border-cyber-cyan hover:text-cyber-cyan hover:bg-transparent rounded-none px-4 md:px-8 py-3 md:py-5 bg-transparent transition-all duration-300"
              >
                <Link to="/contact">Get In Touch</Link>
              </Button>
            </motion.div>

            {/* Scroll indicator arrow */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.5 }}
              className="absolute -bottom-24 left-1/2 transform -translate-x-1/2 flex flex-col items-center z-20"
            >
              <motion.img
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                src="/assets/images/homeArrow.svg"
                alt="scroll down"
                className="w-40 h-40 md:w-60 md:h-60 -mt-2"
              />
            </motion.div>
          </div>

          {/* Right: animated blob portrait */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.7, ease: 'easeOut' }}
            className="hero-portrait w-fit h-fit md:w-[1100px] md:h-[700px] md:-ml-[250px] lg:w-[1100px] lg:h-[700px] lg:-ml-[300px] flex items-center justify-center relative overflow-visible scale-[0.85] md:scale-100 origin-center mx-auto md:mx-0"
          >
            <div
              aria-hidden="true"
              className="absolute pointer-events-none select-none z-0"
              style={{ right: '208px', top: '50%', translate: '0 -50%', width: '720px', aspectRatio: '720 / 726' }}
            >
              <HexPattern embedded />
            </div>
            <div className="relative z-10">
              <PortraitRing />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
    </>
  )
}
