import { NavLink } from 'react-router-dom'
import { Github, Linkedin, Mail } from 'lucide-react'

const iconMap = {
  GitHub: Github,
  LinkedIn: Linkedin,
  Email: Mail,
}

const socialLinks = [
  { label: 'GitHub', href: 'https://github.com' },
  { label: 'LinkedIn', href: 'https://linkedin.com' },
  { label: 'Email', href: 'mailto:eduard.rotaru89@gmail.com' },
]

const navLinks = [
  { path: '/', label: 'Home' },
  { path: '/about', label: 'About' },
  { path: '/projects', label: 'Projects' },
  { path: '/contact', label: 'Contact' },
]

export default function Footer() {
  return (
    <footer className="border-t border-black/10 bg-[#eeece9] mt-auto">
      <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Brand */}
        <div className="flex items-center gap-3 mr-auto">
          <img src="/assets/images/logo.svg" alt="Eduard Rotaru" className="h-24 w-auto" />
          <div className="flex flex-col gap-0.5">
            <span className="font-sans font-bold text-3xl text-[#1e1e1e] tracking-tight">Eduard Rotaru</span>
            <p className="font-mono text-sm font-medium text-[#666666]">Full-Stack Developer</p>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex gap-6">
          {navLinks.map(({ path, label }) => (
            <NavLink
              key={path}
              to={path}
              end={path === '/'}
              className="font-mono text-sm font-medium uppercase tracking-widest text-[#666666] hover:text-[#2dd4bf] transition-colors duration-300"
            >
              {label}
            </NavLink>
          ))}
        </nav>

        {/* Socials */}
        <div className="flex items-center gap-4">
          {socialLinks.map((s) => {
            const Icon = iconMap[s.label]
            return (
              <a
                key={s.label}
                href={s.href}
                target={s.href.startsWith('mailto') ? undefined : '_blank'}
                rel="noopener noreferrer"
                aria-label={s.label}
                className="w-8 h-8 flex items-center justify-center border border-black/10 text-[#666666] hover:border-[#2dd4bf] hover:text-[#2dd4bf] transition-all duration-300"
              >
                <Icon size={16} />
              </a>
            )
          })}
        </div>
      </div>

      <div className="border-t border-black/5 py-4 text-center">
        <p className="font-mono text-sm text-[#666666]/60">
          © {new Date().getFullYear()} Eduard Rotaru. Built with React + Vite.
        </p>
      </div>
    </footer>
  )
}
