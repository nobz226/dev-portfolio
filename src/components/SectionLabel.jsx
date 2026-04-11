/**
 * SectionLabel — branding guide section header:
 * a solid cyan right-pointing triangle + a banner with a right-arrow tip.
 * variant controls whether the banner is dark (on dark sections) or light (on cyan sections).
 */
export default function SectionLabel({ label, variant = 'dark', bannerBgColor = null }) {
  const bannerBg = bannerBgColor || (variant === 'cyan' ? '#2dd4bf' : '#22B8C7')
  const textColor = '#f9f7f7'
  const triangleColor = variant === 'cyan' ? '#f9f7f7' : '#2dd4bf'

  return (
    <div className="flex items-center mb-0">
      {/* Right-pointing triangle */}
      <div
        style={{
          width: 0,
          height: 0,
          borderTop: '24px solid transparent',
          borderBottom: '24px solid transparent',
          borderLeft: `28px solid ${triangleColor}`,
          flexShrink: 0,
        }}
      />
      {/* Banner with arrow tip */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          backgroundColor: bannerBg,
          height: '48px',
          paddingLeft: '18px',
          paddingRight: '40px',
          clipPath: 'polygon(0 0, calc(100% - 20px) 0, 100% 50%, calc(100% - 20px) 100%, 0 100%)',
        }}
      >
        <span
          style={{ fontFamily: 'monospace', fontSize: '13px', fontWeight: 700, letterSpacing: '0.25em', textTransform: 'uppercase', color: textColor, whiteSpace: 'nowrap' }}
        >
          {label}
        </span>
      </div>
    </div>
  )
}
