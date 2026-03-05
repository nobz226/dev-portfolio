/**
 * GlitchText — renders text with a CSS glitch animation effect.
 * Usage: <GlitchText text="Eduard Rotaru" tag="h1" className="…" />
 */
export default function GlitchText({ text, tag: Tag = 'span', className = '' }) {
  return (
    <Tag
      className={`glitch-wrapper ${className}`}
      data-text={text}
    >
      {text}
    </Tag>
  )
}
