# Copilot Instructions — dev-portfolio

## Project Overview
A personal developer portfolio built with React 19, Vite, Tailwind CSS v4, shadcn/ui, and Framer Motion. It has a deliberate **terminal / hacker aesthetic** with a tight, purpose-built design system.

---

## Tech Stack
- **Framework**: React 19 (JSX, no TypeScript)
- **Build tool**: Vite
- **Styling**: Tailwind CSS v4 (imported via `@import "tailwindcss"`)
- **UI primitives**: shadcn/ui components in `src/components/ui/`
- **Animation**: Framer Motion — use it for all motion; do not use CSS keyframes or other animation libraries
- **Icons**: `lucide-react` for UI icons, `react-icons` for brand/tech icons
- **Routing**: React Router DOM v7
- **Class utility**: `cn()` from `src/lib/utils.js` (clsx + tailwind-merge)
- **Path alias**: `@/` maps to `src/`

---

## Design System

### Color Palette
Always use these named values — never introduce new colors without reason:

| Token             | Hex         | Tailwind / CSS var          | Usage                          |
|-------------------|-------------|-----------------------------|--------------------------------|
| Cyber Cyan        | `#2dd4bf`   | `--color-cyber-cyan`        | Primary accent, highlights     |
| Soft Blue         | `#22b8c7`   | `--color-soft-blue`         | Secondary accent               |
| Charcoal          | `#1e1e1e`   | `--color-charcoal`          | Primary text, dark backgrounds |
| Snow              | `#f9f7f7`   | `--color-snow`              | Page background, light surfaces|
| Muted             | `#666666`   | —                           | Secondary text, captions       |
| Muted surface     | `#e8e6e3`   | —                           | Dividers, subtle backgrounds   |

Inline style hex values are acceptable for complex shapes where Tailwind classes are insufficient.

### Typography
- **`font-sans`** → Cal Sans — headings, display text
- **`font-mono`** → Courier Prime — code labels, terminal text, badge-style UI text
- Heading scale: `text-5xl md:text-7xl lg:text-8xl` for hero; `text-3xl md:text-4xl` for section headings; `text-xl` for card headings
- Letter spacing on mono labels: `tracking-widest` or `letter-spacing: 0.25em`

---

## File & Component Structure

### Page structure
Each page follows this layout:
```
src/pages/[PageName]/
  index.jsx            ← page root, composes section components
  components/
    SectionComponent.jsx
```

Page `index.jsx` files are lean: they import and compose section components inside a `<main>` wrapper — no logic or styling there.

### Shared components
```
src/components/
  Header.jsx
  Footer.jsx
  GlitchText.jsx       ← CSS glitch animation on text
  SectionLabel.jsx     ← styled pentagon banner header
  SectionWrapper.jsx   ← scroll-animated section layout shell
  TerminalText.jsx     ← typewriter character-by-character effect
  ui/                  ← shadcn primitives (button, badge, card, etc.)
```

Always prefer `SectionWrapper` for new page sections before writing a custom section shell.

---

## Component Conventions

- **Default exports only** — no named component exports
- **Props**: simple, flat prop shapes; avoid deeply nested config objects
- **JSDoc comments**: keep the one-line `/** ComponentName — brief description */` pattern for shared components
- **Class merging**: use `cn()` when combining conditional classes
- **No PropTypes or TypeScript** — this is plain JSX

---

## Animation Patterns (Framer Motion)

### Standard fade-up (scroll-triggered)
```jsx
<motion.div
  initial={{ opacity: 0, y: 32 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: '-80px' }}
  transition={{ duration: 0.6, ease: 'easeOut' }}
>
```

### Staggered list items
Use `delay: index * 0.1` (or `(index % 3) * 0.1` for grids) on children.

### Hero entrance (page load)
```jsx
initial={{ opacity: 0, x: -20 }}
animate={{ opacity: 1, x: 0 }}
transition={{ duration: 0.5 }}
```

Use `whileInView` + `viewport={{ once: true }}` for everything below the fold. Use `animate` for above-the-fold hero content.

---

## Terminal / Hacker Aesthetic

This portfolio deliberately mimics a developer terminal. Maintain this throughout:

- Use `<TerminalText>` for any typewriter reveal of text
- Use `<GlitchText>` for dramatic glitch effects on key text (e.g., name display)
- Use `<SectionLabel label="..." />` for all section headers — the pentagon shape is a core visual identity element
- File path labels (e.g., `~/portfolio $`, `project.jsx`) should use `font-mono text-[#2dd4bf]`
- "Terminal window" card style: three muted dot circles + a monospace filename in a top bar with a bottom border

### Terminal card top bar pattern
```jsx
<div className="flex items-center gap-1.5 px-4 py-3 border-b border-black/5">
  <span className="w-2.5 h-2.5 rounded-full bg-black/10" />
  <span className="w-2.5 h-2.5 rounded-full bg-black/10" />
  <span className="w-2.5 h-2.5 rounded-full bg-black/10" />
  <span className="font-mono text-sm text-[#666666] ml-2">filename.jsx</span>
</div>
```

---

## Background Decoration Patterns

Subtle background textures used for visual depth — keep them lightweight:

### Grid background
```jsx
<div
  className="absolute inset-0 pointer-events-none"
  style={{
    backgroundImage:
      'linear-gradient(rgba(45,212,191,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(45,212,191,0.04) 1px, transparent 1px)',
    backgroundSize: '60px 60px',
  }}
/>
```

### Radial glow
```jsx
<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#2dd4bf]/10 blur-3xl pointer-events-none" />
```

---

## Layout Rules

- **Max content width**: `max-w-6xl mx-auto px-6` for full-width sections; `max-w-5xl` inside `SectionWrapper`
- **Section padding**: `py-16` to `py-24`
- **SectionWrapper** clips its background to a pentagon shape via `clipPath` — don't override or nest conflicting shapes inside it
- Responsive breakpoints: `md:` and `lg:` only — no `sm:` or `xl:` unless clearly needed

---

## Do Not
- Do not use TypeScript or add `.ts`/`.tsx` files
- Do not install new animation libraries — Framer Motion is the only one
- Do not introduce new color values without updating the design system above
- Do not use named exports for page or section components
- Do not add dark mode variants — this site is light-mode only (`--background: #f9f7f7`)
- Do not use `React.FC` or similar typing patterns
- Do not replace inline hex values with arbitrary Tailwind values (e.g., `bg-teal-400`) — use the established palette
