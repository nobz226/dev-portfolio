import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const HEX_SIZE = 52
const GAP = 4
const COLS = 8
const ROWS = 7


const DARK = '#1e1e1e'
const CYAN = '#2dd4bf'
const BLUE = '#22b8c7'


const ACTIVE_HEXES = [
  [5, 0, 1.00, BLUE,  0.0],
  [6, 0, 0.70, CYAN,  0.1],
  [7, 0, 0.40, CYAN,  0.2],
  [5, 1, 0.85, DARK,  0.15],
  [6, 1, 1.00, DARK,  0.05],
  [7, 1, 0.55, BLUE,  0.25],
  [4, 1, 0.30, DARK,  0.3],
  [3, 1, 0.18, CYAN,  0.4],
  [2, 1, 0.12, BLUE,  0.5],
  [4, 2, 0.60, CYAN,  0.2],
  [5, 2, 1.00, BLUE,  0.1],
  [6, 2, 0.80, DARK,  0.0],
  [7, 2, 1.00, CYAN,  0.35],
  [3, 2, 0.20, CYAN,  0.4],
  [2, 2, 0.15, DARK,  0.5],
  [1, 2, 0.10, BLUE,  0.6],
  [3, 3, 0.45, BLUE,  0.3],
  [4, 3, 0.90, DARK,  0.1],
  [5, 3, 0.70, DARK,  0.05],
  [6, 3, 1.00, BLUE,  0.2],
  [7, 3, 0.60, DARK,  0.15],
  [2, 3, 0.20, CYAN,  0.5],
  [1, 3, 0.12, DARK,  0.6],
  [0, 3, 0.08, CYAN,  0.7],
  [4, 4, 0.50, CYAN,  0.35],
  [5, 4, 1.00, DARK,  0.0],
  [6, 4, 0.75, BLUE,  0.25],
  [7, 4, 0.40, BLUE,  0.4],
  [3, 4, 0.25, BLUE,  0.45],
  [2, 4, 0.15, CYAN,  0.55],
  [1, 4, 0.10, DARK,  0.65],
  [5, 5, 0.65, BLUE,  0.15],
  [6, 5, 0.90, DARK,  0.05],
  [7, 5, 0.30, BLUE,  0.3],
  [4, 5, 0.22, CYAN,  0.45],
  [3, 5, 0.14, BLUE,  0.55],
  [2, 5, 0.08, DARK,  0.65],
  [6, 6, 0.50, CYAN,  0.2],
  [7, 6, 0.70, BLUE,  0.1],
  [5, 6, 0.20, CYAN,  0.4],
  [4, 6, 0.12, BLUE,  0.5],
  [7, 0, 0.25, CYAN,  0.45],
]

function hexPath(cx, cy, r) {
  const pts = Array.from({ length: 6 }, (_, i) => {
    const angle = (Math.PI / 180) * (60 * i)
    return `${cx + r * Math.cos(angle)},${cy + r * Math.sin(angle)}`
  })
  return `M ${pts.join(' L ')} Z`
}

function hexCenter(col, row, r, gap) {
  const w = r * 2 + gap
  const h = Math.sqrt(3) * r + gap
  const x = col * w * 0.75 + r
  const y = row * h + (col % 2 === 0 ? 0 : h / 2) + r
  return { x, y }
}

export default function HexPattern() {
  const [isMobile, setIsMobile] = useState(
    typeof window !== 'undefined' ? window.innerWidth < 768 : false
  )

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  if (isMobile) return null

  const r = HEX_SIZE
  const gap = GAP

  const activeMap = new Map(
    ACTIVE_HEXES.map(([c, row, opacity, color, delay]) => [
      `${c},${row}`,
      { opacity, color, delay },
    ])
  )

  const w = r * 2 + gap
  const h = Math.sqrt(3) * r + gap
  const svgW = COLS * w * 0.75 + r + 20
  const svgH = ROWS * h + h / 2 + 20

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 top-32 bottom-0 select-none"
    >
      <svg
        viewBox={`0 0 ${svgW} ${svgH}`}
        preserveAspectRatio="xMidYMid meet"
        className="ml-auto w-[55%] h-full opacity-90"
        xmlns="http://www.w3.org/2000/svg"
      >
        {Array.from({ length: COLS }, (_, col) =>
          Array.from({ length: ROWS }, (_, row) => {
            const key = `${col},${row}`
            const active = activeMap.get(key)
            if (!active) return null

            const { x, y } = hexCenter(col, row, r, gap)
            const d = hexPath(x, y, r - gap / 2)

            return (
              <motion.path
                key={key}
                d={d}
                fill={active.color}
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: active.opacity, scale: 1 }}
                transition={{
                  delay: active.delay,
                  duration: 0.55,
                  ease: 'easeOut',
                }}
                style={{ transformOrigin: `${x}px ${y}px` }}
              />
            )
          })
        )}
      </svg>

      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(to right, #f9f7f7 0%, #f9f7f7 30%, transparent 60%)',
        }}
      />
    </div>
  )
}
