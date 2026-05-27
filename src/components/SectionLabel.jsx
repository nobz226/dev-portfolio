const variantConfig = {
  dark: { banner: 'bg-soft-blue', triangle: 'border-l-cyber-cyan' },
  cyan: { banner: 'bg-cyber-cyan', triangle: 'border-l-snow' },
  charcoal: { banner: 'bg-charcoal', triangle: 'border-l-cyber-cyan' },
  'soft-blue': { banner: 'bg-soft-blue', triangle: 'border-l-snow' },
}

export default function SectionLabel({ label, variant = 'dark', bannerBgColor = null }) {
  const config = variantConfig[variant] || variantConfig.dark
  const bannerBg = bannerBgColor || config.banner

  return (
    <div className="flex items-center mb-0" aria-hidden="true">
      <div
        className={`w-0 h-0 border-t-[24px] border-t-transparent border-b-[24px] border-b-transparent border-l-[28px] shrink-0 ${bannerBgColor ? '' : config.triangle}`}
      />
      <div
        className={`flex items-center h-12 pl-[18px] pr-10 section-label-banner ${bannerBgColor ? '' : bannerBg}`}
        style={bannerBgColor ? { backgroundColor: bannerBgColor } : undefined}
      >
        <span className="font-mono text-[13px] font-bold tracking-[0.25em] uppercase text-snow whitespace-nowrap">
          {label}
        </span>
      </div>
    </div>
  )
}
