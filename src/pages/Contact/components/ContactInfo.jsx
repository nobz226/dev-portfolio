import { motion } from 'framer-motion'
import { SOCIAL } from '@/data/config'
import { SOCIAL_ICONS } from '@/lib/helpers'

const availability = [
  { label: 'Freelance Projects', available: true },
  { label: 'Agency Collaboration', available: true },
  { label: 'Full-Time Roles', available: true },
  { label: 'Open Source', available: false },
]

export default function ContactInfo() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.1 }}
      className="flex flex-col gap-8"
    >
      {/* Intro text */}
      <div>
        <h2 className="font-sans font-bold text-3xl md:text-4xl text-charcoal mb-4 leading-tight">
          Let&apos;s Build <span className="text-cyber-cyan">Something</span>
        </h2>
        <p
          className="font-mono text-base font-medium text-muted-foreground leading-relaxed"
        >
          Whether you have a project in mind, want to collaborate, or just want to talk
          shop — my inbox is always open.
        </p>
      </div>

      {/* Contact links */}
      <div className="flex flex-col gap-3">
        {Object.values(SOCIAL).map((c) => {
          const Icon = SOCIAL_ICONS[c.label]
          return (
            <a
              key={c.label}
              href={c.href}
              target={c.href.startsWith('mailto') ? undefined : '_blank'}
              rel="noopener noreferrer"
              className="group flex items-center justify-between p-4 border border-black/5 hover:border-cyber-cyan/40 transition-all duration-300"
            >
              <span className="font-silom text-sm uppercase tracking-widest text-muted-foreground group-hover:text-cyber-cyan transition-colors duration-300">
                {c.label}
              </span>
              <Icon className="w-5 h-5 text-charcoal/50 group-hover:text-charcoal transition-colors duration-300" />
            </a>
          )
        })}
      </div>

      {/* Availability */}
      <div className="bg-warm-gray border border-black/5 p-6">
        <p className="font-sans text-sm uppercase tracking-[0.25em] text-cyber-cyan mb-4">
          Availability
        </p>
        <ul className="flex flex-col gap-3">
          {availability.map((item) => (
            <li key={item.label} className="flex items-center justify-between">
              <span className="font-mono text-base text-muted-foreground">{item.label}</span>
              <span
                className={`flex items-center gap-1.5 font-silom text-sm ${
                  item.available ? 'text-cyber-cyan' : 'text-white/20'
                }`}
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full ${
                    item.available ? 'bg-cyber-cyan' : 'bg-white/20'
                  }`}
                />
                {item.available ? 'Open' : 'Closed'}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  )
}
