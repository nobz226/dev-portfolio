import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import TerminalText from '../../../components/TerminalText'
import { Button } from '../../../components/ui/button'

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Grid background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(45,212,191,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(45,212,191,0.04) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* Radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#2dd4bf]/10 blur-3xl pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-6 pt-32 pb-20 w-full">
        {/* Prompt line */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3 mb-6"
        >
          <span className="font-mono text-base text-[#2dd4bf]">~/portfolio</span>
          <span className="font-mono text-base text-[#666666]">$</span>
          <TerminalText
            text="whoami"
            delay={200}
            speed={80}
            className="text-base text-[#1e1e1e]"
          />
        </motion.div>

        {/* Name */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.9 }}
        >
          <h1 className="font-sans font-bold text-5xl md:text-7xl lg:text-8xl text-[#1e1e1e] leading-none tracking-tight">
            System & <span className="text-[#2dd4bf]">Soul</span>
          </h1>
        </motion.div>

        {/* Title */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.1 }}
          className="font-mono text-lg md:text-xl text-[#2dd4bf] mt-4 mb-6"
        >
          Full-Stack Web Developer
        </motion.p>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.3 }}
          className="font-mono text-[#555555] max-w-xl text-base md:text-lg font-medium leading-relaxed mb-10"
        >
          Transforming complex ideas into high-fidelity web experiences through{' '}
          <span className="text-[#1e1e1e] font-bold">technical honesty</span> and{' '}
          <span className="text-[#1e1e1e] font-bold">artistic intent</span>.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.5 }}
          className="flex flex-wrap gap-4"
        >
          <Button
            asChild
            className="font-mono uppercase tracking-widest text-sm bg-[#2dd4bf] text-[#1e1e1e] hover:bg-[#22b8c7] rounded-none px-8 py-5 transition-all duration-300"
          >
            <Link to="/projects">View Work</Link>
          </Button>
          <Button
            asChild
            variant="outline"
            className="font-mono uppercase tracking-widest text-sm border-black/20 text-[#555555] hover:border-[#2dd4bf] hover:text-[#2dd4bf] rounded-none px-8 py-5 bg-transparent transition-all duration-300"
          >
            <Link to="/contact">Get In Touch</Link>
          </Button>
        </motion.div>

      </div>
    </section>
  )
}
