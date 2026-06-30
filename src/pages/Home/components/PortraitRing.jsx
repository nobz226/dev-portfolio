import { motion } from 'framer-motion'

// "<there is a ghost in the machine/> " = 35 chars
// Dark positions: 0 (<), 32 (/), 33 (>)
const PHRASE = '<there is a ghost in the machine/> '
const PHRASE_LEN = PHRASE.length
const REPEAT = 4
const ALL_CHARS = Array.from(PHRASE.repeat(REPEAT))
const TOTAL = ALL_CHARS.length
const CONTAINER = 520
const TEXT_RADIUS = 225

function isDark(i) {
  const p = i % PHRASE_LEN
  return p === 0 || p === 32 || p === 33
}

export default function PortraitRing() {
  const angleStep = (2 * Math.PI) / TOTAL

  return (
    <div className="relative w-[520px] h-[520px] shrink-0" aria-hidden="true">
      <img
        src="/assets/images/eduardrotaru.jpg"
        alt="Eduard Rotaru"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[420px] h-[420px] rounded-full object-cover"
      />
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
