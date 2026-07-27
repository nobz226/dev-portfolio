import { NavLink } from 'react-router-dom'
import { NAV_LINKS, SOCIAL } from '@/data/config'
import { SOCIAL_ICONS } from '@/lib/helpers'

export default function Footer() {
  return (
    <footer className="border-t border-black/10 bg-warm-gray mt-auto">
      <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Brand */}
        <div className="flex items-center gap-3 mr-auto">
          <img src="/assets/images/logo.svg" alt="Eduard Rotaru" className="h-24 w-auto" />
          <div className="flex flex-col gap-0.5">
            <span className="font-sans font-bold text-3xl text-charcoal tracking-tight">Eduard Rotaru</span>
            <p className="font-mono text-sm font-medium text-muted-foreground">Full-Stack Developer</p>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex gap-6">
          {NAV_LINKS.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className="font-silom text-sm font-medium uppercase tracking-widest text-muted-foreground hover:text-cyber-cyan transition-colors duration-300"
            >
              {label}
            </NavLink>
          ))}
        </nav>

        {/* Socials */}
        <div className="flex items-center gap-4">
          {Object.values(SOCIAL).map((s) => {
            const Icon = SOCIAL_ICONS[s.label]
            return (
              <a
                key={s.label}
                href={s.href}
                target={s.href.startsWith('mailto') ? undefined : '_blank'}
                rel="noopener noreferrer"
                aria-label={s.label}
                className="w-8 h-8 flex items-center justify-center border border-black/10 text-muted-foreground hover:border-cyber-cyan hover:text-cyber-cyan transition-all duration-300"
              >
                <Icon size={16} />
              </a>
            )
          })}
        </div>
      </div>

      <div className="border-t border-black/5 py-4 text-center">
        <p className="font-mono text-sm text-muted-foreground">
          © {new Date().getFullYear()} Eduard Rotaru. Built with React + Vite.
        </p>
      </div>
    </footer>
  )
}
