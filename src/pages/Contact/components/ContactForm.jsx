import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '../../../components/ui/button'
import { Input } from '../../../components/ui/input'
import { Textarea } from '../../../components/ui/textarea'
import { Label } from '../../../components/ui/label'

export default function ContactForm() {
  const [status, setStatus] = useState('idle') // idle | sending | sent
  const [hoveredArrow, setHoveredArrow] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')

    try {
      // Send email using Formspree
      const response = await fetch('https://formspree.io/f/mqegjerp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
          _replyto: formData.email,
        }),
      })

      if (response.ok) {
        setStatus('sent')
        setFormData({ name: '', email: '', subject: '', message: '' })
      } else {
        setStatus('idle')
      }
    } catch (error) {
      console.error('Error sending email:', error)
      setStatus('idle')
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="bg-[#ffffff] border border-black/5 p-8"
    >
      {/* Terminal top bar */}
      <div className="flex items-center gap-2 mb-6 pb-4 border-b border-black/5">
        <span className="w-2.5 h-2.5 rounded-full bg-black/10" />
        <span className="w-2.5 h-2.5 rounded-full bg-black/10" />
        <span className="w-2.5 h-2.5 rounded-full bg-black/10" />
        <span className="font-mono text-sm text-[#666666] ml-2">new_message.txt</span>
      </div>

      {status === 'sent' ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          role="alert"
          aria-live="polite"
          className="flex flex-col items-center gap-4 py-12 text-center"
        >
          <span className="font-mono text-3xl text-[#2dd4bf]">✓</span>
          <p className="font-sans font-bold text-xl text-[#1e1e1e]">Message Sent</p>
          <p className="font-mono text-base font-medium text-[#555555]">I&apos;ll get back to you within 24 hours.</p>
          <button
            onClick={() => setStatus('idle')}
            className="font-silom text-sm text-[#2dd4bf] mt-2 flex items-center gap-2 hover:text-[#2dd4bf]"
            onMouseEnter={() => setHoveredArrow('sendAnother')}
            onMouseLeave={() => setHoveredArrow(null)}
            style={{ transform: hoveredArrow === 'sendAnother' ? 'scale(1.15)' : 'scale(1)', transition: 'transform 300ms', transformOrigin: 'left center' }}
          >
            Send another
            <img src="/assets/images/arrow.svg" alt="arrow" style={{ width: '72px', height: '72px' }} />
          </button>
        </motion.div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <Label className="font-mono text-sm uppercase tracking-widest text-[#666666]">
                Name
              </Label>
              <Input
                required
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your name"
                className="font-mono text-base bg-[#f9f7f7] border-black/10 text-[#1e1e1e] placeholder:text-black/25 rounded-none focus-visible:ring-[#2dd4bf] focus-visible:border-[#2dd4bf]"
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label className="font-mono text-sm uppercase tracking-widest text-[#666666]">
                Email
              </Label>
              <Input
                required
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="your@email.com"
                className="font-mono text-base bg-[#f9f7f7] border-black/10 text-[#1e1e1e] placeholder:text-black/25 rounded-none focus-visible:ring-[#2dd4bf] focus-visible:border-[#2dd4bf]"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <Label className="font-mono text-sm uppercase tracking-widest text-[#666666]">
              Subject
            </Label>
            <Input
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="What's this about?"
              className="font-mono text-base bg-[#f9f7f7] border-black/10 text-[#1e1e1e] placeholder:text-black/25 rounded-none focus-visible:ring-[#2dd4bf] focus-visible:border-[#2dd4bf]"
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label className="font-mono text-sm uppercase tracking-widest text-[#666666]">
              Message
            </Label>
            <Textarea
              required
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={6}
              placeholder="Tell me about your project…"
              className="font-mono text-base bg-[#f9f7f7] border-black/10 text-[#1e1e1e] placeholder:text-black/25 rounded-none focus-visible:ring-[#2dd4bf] focus-visible:border-[#2dd4bf] resize-none"
            />
          </div>

          <Button
            type="submit"
            disabled={status === 'sending'}
            className="font-silom uppercase tracking-widest text-sm text-[#2dd4bf] disabled:opacity-60 flex items-center justify-center gap-2 bg-transparent hover:bg-transparent hover:text-[#2dd4bf]"
          >
            {status === 'sending' ? 'Sending…' : (
              <span className="flex items-center gap-2" onMouseEnter={() => setHoveredArrow('sendMessage')} onMouseLeave={() => setHoveredArrow(null)} style={{ transform: hoveredArrow === 'sendMessage' ? 'scale(1.15)' : 'scale(1)', transition: 'transform 300ms', transformOrigin: 'left center' }}>
                Send Message
                <img src="/assets/images/arrow.svg" alt="arrow" style={{ width: '72px', height: '72px' }} />
              </span>
            )}
          </Button>
        </form>
      )}
    </motion.div>
  )
}
