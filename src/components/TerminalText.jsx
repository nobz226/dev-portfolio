import { useEffect, useState } from 'react'

/**
 * TerminalText — types out text character by character like a terminal prompt.
 * Usage: <TerminalText text="Full-Stack Developer" delay={500} speed={50} />
 */
export default function TerminalText({ text, delay = 0, speed = 45, className = '' }) {
  const [displayed, setDisplayed] = useState('')
  const [started, setStarted] = useState(false)

  const done = started && displayed.length >= text.length

  useEffect(() => {
    const startTimer = setTimeout(() => setStarted(true), delay)
    return () => clearTimeout(startTimer)
  }, [delay])

  useEffect(() => {
    if (!started || displayed.length >= text.length) return
    const t = setTimeout(() => {
      setDisplayed(text.slice(0, displayed.length + 1))
    }, speed)
    return () => clearTimeout(t)
  }, [started, displayed, text, speed])

  return (
    <span className={`font-mono ${className}`}>
      {displayed}
      {!done && (
        <span className="inline-block w-0.5 h-[1em] bg-[#2dd4bf] animate-pulse align-middle ml-0.5" />
      )}
    </span>
  )
}
