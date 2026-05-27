import { useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import TerminalBar from '@/components/TerminalBar'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function validate(data) {
  const errors = {}
  if (!data.name.trim()) errors.name = 'Name is required.'
  if (!data.email.trim()) {
    errors.email = 'Email is required.'
  } else if (!EMAIL_RE.test(data.email)) {
    errors.email = 'Please enter a valid email address.'
  }
  if (!data.message.trim()) errors.message = 'Message is required.'
  return errors
}

export default function ContactForm() {
  const [status, setStatus] = useState('idle') // idle | sending | sent | error
  const [errors, setErrors] = useState({})
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })

  const handleChange = useCallback((e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
    setErrors((prev) => ({ ...prev, [e.target.name]: undefined }))
  }, [])

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault()
    const validationErrors = validate(formData)
    setErrors(validationErrors)
    if (Object.keys(validationErrors).length > 0) return

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
        setStatus('error')
      }
    } catch (error) {
      console.error('Error sending email:', error)
      setStatus('error')
    }
  }, [formData])

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="bg-white border border-black/5 p-8"
    >
      <TerminalBar filename="new_message.txt" />

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
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? 'name-error' : undefined}
                className="font-mono text-base bg-snow border-black/10 text-charcoal placeholder:text-black/25 rounded-none focus-visible:ring-cyber-cyan focus-visible:border-cyber-cyan"
              />
              {errors.name && (
                <span id="name-error" role="alert" className="font-mono text-xs text-red-500">{errors.name}</span>
              )}
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
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? 'email-error' : undefined}
                className="font-mono text-base bg-snow border-black/10 text-charcoal placeholder:text-black/25 rounded-none focus-visible:ring-cyber-cyan focus-visible:border-cyber-cyan"
              />
              {errors.email && (
                <span id="email-error" role="alert" className="font-mono text-xs text-red-500">{errors.email}</span>
              )}
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
              aria-invalid={!!errors.message}
              aria-describedby={errors.message ? 'message-error' : undefined}
              className="font-mono text-base bg-snow border-black/10 text-charcoal placeholder:text-black/25 rounded-none focus-visible:ring-cyber-cyan focus-visible:border-cyber-cyan resize-none"
            />
            {errors.message && (
              <span id="message-error" role="alert" className="font-mono text-xs text-red-500">{errors.message}</span>
            )}
          </div>

          {status === 'error' && (
            <div role="alert" aria-live="polite" className="font-mono text-sm text-red-500 -mt-2">
              Failed to send message. Please try again or email me directly.
            </div>
          )}

          <Button
            type="submit"
            disabled={status === 'sending'}
            className="font-silom uppercase tracking-widest text-sm text-cyber-cyan disabled:opacity-60 flex items-center justify-center gap-2 bg-transparent hover:bg-transparent hover:text-cyber-cyan"
          >
            {status === 'sending' ? 'Sending…' : (
              <span className="flex items-center gap-2 transition-transform duration-300 origin-left hover:scale-[1.15]">
                Send Message
                <img src="/assets/images/arrow.svg" alt="" className="w-[72px] h-[72px]" />
              </span>
            )}
          </Button>
        </form>
      )}
    </motion.div>
  )
}
