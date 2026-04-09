import { motion } from 'framer-motion'
import ContactForm from './components/ContactForm'
import ContactInfo from './components/ContactInfo'
import SectionLabel from '../../components/SectionLabel'
import { usePageMeta } from '../../hooks/usePageMeta'

export default function Contact() {
  usePageMeta(
    'Contact Eduard Rotaru - Get In Touch',
    'Ready to discuss your next project? Contact Eduard Rotaru, a full-stack developer specializing in creative web experiences.'
  )

  return (
    <>
      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        .contact-bg-image {
          animation: fadeIn 1.2s ease-in 0.3s both;
        }
        @media (max-width: 768px) {
          .contact-bg-image {
            display: none !important;
          }
        }
      `}</style>
      <main style={{ overflow: 'visible' }}>
      {/* Hero */}
      <section className="relative pt-40 pb-12 overflow-visible">
        {/* Wipeout2 background image */}
        <img
          src="/assets/images/wipeout2.png"
          alt="background"
          className="contact-bg-image absolute left-0 top-2/3 pointer-events-none z-0"
          style={{ width: '1200px', height: '1300px', marginLeft: '-500px', objectFit: 'contain', transform: 'translateY(-50%)', opacity: 1 }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(rgba(45,212,191,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(45,212,191,0.03) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="relative z-10"
        >
          <SectionLabel label="// contact" />
        </motion.div>
        <div className="max-w-6xl mx-auto px-6 pt-10 relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-sans font-bold text-5xl md:text-7xl text-[#1e1e1e] leading-none mb-6"
          >
            Start a <span className="text-[#2dd4bf]">Conversation</span>
          </motion.h1>
        </div>
      </section>

      {/* Form + Info */}
      <section className="py-16 relative z-20">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-5 gap-12">
          <div className="lg:col-span-2">
            <ContactInfo />
          </div>
          <div className="lg:col-span-3">
            <ContactForm />
          </div>
        </div>
      </section>
    </main>
    </>
  )
}
