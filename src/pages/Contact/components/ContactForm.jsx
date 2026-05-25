import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '../../../components/ui/button'
import { Input } from '../../../components/ui/input'
import { Textarea } from '../../../components/ui/textarea'
import { Label } from '../../../components/ui/label'

export default function ContactForm() {
  const [status, setStatus] = useState('idle') // idle | sending | sent
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
      const response = await fetch(import.meta.env.VITE_FORMSPREE_ENDPOINT, {
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
      className="bg-white border border-black/5 p-8"
    >
      {/* Terminal top bar */}
      <div className="flex items-center gap-2 mb-6 pb-4 border-b border-black/5">
        <span className="w-2.5 h-2.5 rounded-full bg-black/10" />
        <span className="w-2.5 h-2.5 rounded-full bg-black/10" />
        <span className="w-2.5 h-2.5 rounded-full bg-black/10" />
        <span className="font-silom text-sm text-muted-foreground ml-2">new_message.txt</span>
      </div>

      {status === 'sent' ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          role="alert"
          aria-live="polite"
          className="flex flex-col items-center gap-4 py-12 text-center"
        >
          <span className="font-mono text-3xl text-cyber-cyan">✓</span>
          <p className="font-sans font-bold text-xl text-charcoal">Message Sent</p>
          <p className="font-mono text-base font-medium text-muted-foreground">I&apos;ll get back to you within 24 hours.</p>
          <button
            onClick={() => setStatus('idle')}
            className="font-silom text-sm text-cyber-cyan mt-2 flex items-center gap-2 hover:text-cyber-cyan transition-transform duration-300 origin-left hover:scale-[1.15]"
          >
            Send another
            <img src="/assets/images/arrow.svg" alt="arrow" className="w-[72px] h-[72px]" />
          </button>
        </motion.div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <Label className="font-sans text-sm uppercase tracking-widest text-muted-foreground">
                Name
              </Label>
              <Input
                required
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your name"
                className="font-mono text-base bg-snow border-black/10 text-charcoal placeholder:text-black/25 rounded-none focus-visible:ring-cyber-cyan focus-visible:border-cyber-cyan"
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label className="font-sans text-sm uppercase tracking-widest text-muted-foreground">
                Email
              </Label>
              <Input
                required
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="your@email.com"
                className="font-mono text-base bg-snow border-black/10 text-charcoal placeholder:text-black/25 rounded-none focus-visible:ring-cyber-cyan focus-visible:border-cyber-cyan"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <Label className="font-sans text-sm uppercase tracking-widest text-muted-foreground">
              Subject
            </Label>
            <Input
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="What's this about?"
              className="font-mono text-base bg-snow border-black/10 text-charcoal placeholder:text-black/25 rounded-none focus-visible:ring-cyber-cyan focus-visible:border-cyber-cyan"
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label className="font-sans text-sm uppercase tracking-widest text-muted-foreground">
              Message
            </Label>
            <Textarea
              required
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={6}
              placeholder="Tell me about your project…"
              className="font-mono text-base bg-snow border-black/10 text-charcoal placeholder:text-black/25 rounded-none focus-visible:ring-cyber-cyan focus-visible:border-cyber-cyan resize-none"
            />
          </div>

          <Button
            type="submit"
            disabled={status === 'sending'}
            className="font-silom uppercase tracking-widest text-sm text-cyber-cyan disabled:opacity-60 flex items-center justify-center gap-2 bg-transparent hover:bg-transparent hover:text-cyber-cyan"
          >
            {status === 'sending' ? 'Sending…' : (
              <span className="flex items-center gap-2 transition-transform duration-300 origin-left hover:scale-[1.15]">
                Send Message
                <img src="/assets/images/arrow.svg" alt="arrow" className="w-[72px] h-[72px]" />
              </span>
            )}
          </Button>
        </form>
      )}
    </motion.div>
  )
}
