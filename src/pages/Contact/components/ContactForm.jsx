import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '../../../components/ui/button'
import { Input } from '../../../components/ui/input'
import { Textarea } from '../../../components/ui/textarea'
import { Label } from '../../../components/ui/label'

export default function ContactForm() {
  const [status, setStatus] = useState('idle') // idle | sending | sent

  const handleSubmit = (e) => {
    e.preventDefault()
    setStatus('sending')
    // Simulated send — replace with real email service
    setTimeout(() => setStatus('sent'), 1800)
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
            className="font-mono text-sm text-[#2dd4bf] underline underline-offset-4 mt-2"
          >
            Send another →
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
              rows={6}
              placeholder="Tell me about your project…"
              className="font-mono text-base bg-[#f9f7f7] border-black/10 text-[#1e1e1e] placeholder:text-black/25 rounded-none focus-visible:ring-[#2dd4bf] focus-visible:border-[#2dd4bf] resize-none"
            />
          </div>

          <Button
            type="submit"
            disabled={status === 'sending'}
            className="font-mono uppercase tracking-widest text-sm bg-[#2dd4bf] text-[#1e1e1e] hover:bg-[#22b8c7] rounded-none py-5 w-full sm:w-auto transition-all duration-300 disabled:opacity-60"
          >
            {status === 'sending' ? 'Sending…' : 'Send Message →'}
          </Button>
        </form>
      )}
    </motion.div>
  )
}
