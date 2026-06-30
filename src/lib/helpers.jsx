import { Github, Linkedin, Mail } from 'lucide-react'

export const SOCIAL_ICONS = {
  GitHub: Github,
  LinkedIn: Linkedin,
  Email: Mail,
}

export function renderParagraphs(content, keyPrefix = 'p') {
  const paragraphs = Array.isArray(content)
    ? content
    : String(content).split(/\n\n+/).filter(Boolean)

  return paragraphs.map((paragraph, i) => (
    <p key={`${keyPrefix}-${i}`} className="font-mono text-lg leading-relaxed text-snow/80">
      {paragraph}
    </p>
  ))
}
