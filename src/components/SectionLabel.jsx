/**
 * SectionLabel — branding guide section header:
 * a solid cyan right-pointing triangle + a banner with a right-arrow tip.
 * variant controls whether the banner is dark (on dark sections) or light (on cyan sections).
 */
export default function SectionLabel({ label, variant = 'dark', bannerBgColor = null }) {
  const bannerBg = bannerBgColor || (variant === 'cyan' ? '#2dd4bf' : '#22B8C7')
  const triangleColor = variant === 'cyan' ? '#f9f7f7' : '#2dd4bf'

  return (
    <div className="flex items-center mb-0">
      {/* Right-pointing triangle */}
      <div
        className={`w-0 h-0 border-t-[24px] border-t-transparent border-b-[24px] border-b-transparent border-l-[28px] shrink-0 ${triangleColor === '#f9f7f7' ? 'border-l-snow' : 'border-l-cyber-cyan'}`}
      />
      {/* Banner with arrow tip */}
      <div
        className="flex items-center h-12 pl-[18px] pr-10 section-label-banner"
        style={{ backgroundColor: bannerBg }}
      >
        <span className="font-mono text-[13px] font-bold tracking-[0.25em] uppercase text-snow whitespace-nowrap">
          {label}
        </span>
      </div>
    </div>
  )
}
