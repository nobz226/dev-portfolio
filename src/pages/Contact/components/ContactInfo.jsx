import { motion } from 'framer-motion'

const contactDetails = [
  { label: 'Email', value: 'hello@eduardrotaru.dev', href: 'mailto:hello@eduardrotaru.dev' },
  { label: 'LinkedIn', value: 'linkedin.com/in/eduardrotaru', href: 'https://linkedin.com' },
  { label: 'GitHub', value: 'github.com/eduardrotaru', href: 'https://github.com' },
]

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
        <h2 className="font-sans font-bold text-3xl md:text-4xl text-[#1e1e1e] mb-4 leading-tight">
          Let&apos;s Build <span className="text-[#2dd4bf]">Something</span>
        </h2>
        <p
          className="font-mono text-base font-medium text-[#555555] leading-relaxed"
        >
          Whether you have a project in mind, want to collaborate, or just want to talk
          shop — my inbox is always open.
        </p>
      </div>

      {/* Contact links */}
      <div className="flex flex-col gap-3">
        {contactDetails.map((c) => (
          <a
            key={c.label}
            href={c.href}
            target={c.href.startsWith('mailto') ? undefined : '_blank'}
            rel="noopener noreferrer"
            className="group flex items-center justify-between p-4 border border-black/5 hover:border-[#2dd4bf]/40 transition-all duration-300"
          >
            <span className="font-mono text-sm uppercase tracking-widest text-[#666666] group-hover:text-[#2dd4bf] transition-colors duration-300">
              {c.label}
            </span>
            <span className="font-mono text-base text-[#1e1e1e]/50 group-hover:text-[#1e1e1e] transition-colors duration-300">
              {c.value} ↗
            </span>
          </a>
        ))}
      </div>

      {/* Availability */}
      <div className="bg-[#eeece9] border border-black/5 p-6">
        <p className="font-mono text-sm uppercase tracking-[0.25em] text-[#2dd4bf] mb-4">
          Availability
        </p>
        <ul className="flex flex-col gap-3">
          {availability.map((item) => (
            <li key={item.label} className="flex items-center justify-between">
              <span className="font-mono text-base text-[#555555]">{item.label}</span>
              <span
                className={`flex items-center gap-1.5 font-mono text-sm ${
                  item.available ? 'text-[#2dd4bf]' : 'text-white/20'
                }`}
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full ${
                    item.available ? 'bg-[#2dd4bf]' : 'bg-white/20'
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
