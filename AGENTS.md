# AGENTS.md — dev-portfolio

A personal developer portfolio for **Eduard Rotaru** with a terminal/hacker aesthetic, pentagon-based visual identity, and 3D model integration.

---

## Quick Start

```bash
npm run dev      # Start Vite dev server
npm run build    # Production build → dist/
npm run preview  # Preview production build
npm run lint     # ESLint (flat config)
```

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 19 (JSX, **no TypeScript**) |
| Build | Vite 7 |
| Styling | Tailwind CSS v4 (`@import "tailwindcss"`) |
| Animation | Framer Motion 12 (only library allowed) |
| Routing | React Router DOM v7 (SPA, 5 routes) |
| UI Primitives | shadcn/ui (New York style), lucide-react icons |
| Brand Icons | react-icons (Simple Icons) |
| 3D Rendering | @google/model-viewer (lazy-loaded via IntersectionObserver) |
| Contacts | Formspree (via `VITE_FORMSPREE_ENDPOINT`) |
| Class Utility | `cn()` from `@/lib/utils` (clsx + tailwind-merge) |
| Path Alias | `@/` → `src/` |

---

## Project Structure

```
src/
├── main.jsx                         # Entry: renders <App> in StrictMode
├── App.jsx                          # BrowserRouter + Suspense + 5 lazy routes
├── index.css                        # Tailwind imports, custom theme, keyframes, utilities
├── components/                      # Shared/reusable components
│   ├── Header.jsx                  # Fixed nav, scroll-aware, mobile hamburger w/ focus trap
│   ├── Footer.jsx                  # Brand + nav + social icons
│   ├── SectionWrapper.jsx          # Pentagon clip bg + scroll fade-up (React.memo)
│   ├── SectionLabel.jsx            # Arrow-tip banner section header
│   ├── GlitchText.jsx              # CSS pseudo-element glitch effect
│   ├── TerminalText.jsx            # Char-by-char typewriter
│   ├── TerminalBar.jsx             # Terminal 3-dot bar + filename
│   ├── Loader.jsx                  # Spinner
│   ├── ProjectsAccordion.jsx       # Horizontal accordion carousel
│   ├── ModelLodCard.jsx            # Lazy 3D model (IntersectionObserver + @google/model-viewer)
│   ├── ProjectsAccordion.css       # Accordion-specific styles
│   ├── model-viewer.css            # Model viewer layout styles
│   └── ui/{badge,button,input,label,textarea}.jsx   # shadcn primitives
├── pages/                          # Route-based modules
│   ├── Home/   index.jsx + components/{HeroSection,FeaturedProjects,TechStack}.jsx
│   ├── About/  index.jsx + components/{AboutHero,CoreValues,DifferentiationSection,CareerInternship,MissionStatement}.jsx
│   ├── Projects/  index.jsx + components/{ProjectsGrid,ProjectCard}.jsx
│   ├── ProjectDetail/index.jsx     # /projects/:slug
│   └── Contact/  index.jsx + components/{ContactForm,ContactInfo}.jsx
├── hooks/
│   ├── usePageMeta.js              # Dynamic title, meta/OG/Twitter tags, canonical
│   └── useStructuredData.js         # JSON-LD structured data
├── data/
│   ├── config.js                   # PERSONAL, SOCIAL, NAV_LINKS constants
│   └── projects.js                 # allProjects array (4 projects)
└── lib/utils.js                    # cn() helper
```

Every page follows: `src/pages/[PageName]/index.jsx` + `components/` folder.

---

## Architecture & Routing

**SPA** with all routes lazy-loaded via `React.lazy()` + `<Suspense fallback={<Loader />}>`.

| Route | Page | Description |
|-------|------|-------------|
| `/` | Home | Hero + FeaturedProjects accordion + TechStack grid |
| `/about` | About | 5 sub-sections incl. 3D model cards |
| `/projects` | Projects | Tag-filterable grid of ProjectCards |
| `/projects/:slug` | ProjectDetail | Dynamic case study (Why/System/Soul) + screenshot modal |
| `/contact` | Contact | Formspree form + info/social column |

All pages call `usePageMeta(title, description)` at the top for SEO. Some pages also call `useStructuredData()` for JSON-LD.

---

## Design System

### Colors — defined in `src/index.css` `@theme inline` block

| Token | Hex | Usage |
|-------|-----|-------|
| `cyber-cyan` | `#2dd4bf` | Primary accent, links, highlights |
| `soft-blue` | `#22b8c7` | Secondary accent |
| `charcoal` | `#1e1e1e` | Dark text, dark backgrounds |
| `snow` | `#f9f7f7` | Page background (`bg-snow`) |
| `warm-gray` | `#eeece9` | Footer, alt backgrounds |
| `text-dark` | `#333333` | Body text |
| `muted-light` | `#999999` | Subtle text |
| `text-dim` | `#aaaaaa` | Dim text |
| `accordion-bg` | `#19535f` | Accordion active slide bg |
| `card-bg` | `#f5f3f0` | Card backgrounds |

**Do not introduce new colors.** Use `cn()` for conditional class merging. Hex inline values are OK for complex shapes where Tailwind won't work.

### Typography

| Class | Font | Use |
|-------|------|-----|
| `font-sans` | Cal Sans | Headings, display text |
| `font-mono` | Courier Prime | Code, terminal, badges |
| `.font-silom` | Silom (TTF) | Uppercase labels, branding |

Heading scale: `text-5xl md:text-7xl lg:text-8xl` (hero), `text-3xl md:text-4xl` (section), `text-xl` (cards).

### Signature Visual Patterns

1. **Pentagon clip** — `SectionWrapper` clips bg via `clip-path: polygon(0 0, calc(100% - 48px) 0, 100% 50%, calc(100% - 48px) 100%, 0 100%)` (disabled below 1000px)
2. **Arrow-tip banner** — `SectionLabel` clip `polygon(0 0, calc(100% - 20px) 0, 100% 50%, calc(100% - 20px) 100%, 0 100%)`
3. **Terminal card** — 3 muted dots + monospace filename in a top bar with bottom border (see `TerminalBar.jsx`)
4. **Glitch text** — CSS pseudo-element glitch on `.glitch-wrapper` via `data-text` attribute
5. **Hover scale** — `hover:scale-[1.15]` on interactive elements
6. **Scroll animation** — Framer Motion `whileInView` with `viewport={{ once: true, margin: '-80px' }}`

---

## Component Conventions

- **Default exports only** — never named exports
- **`React.memo`** on SectionWrapper, ModelLodCard, ProjectCard
- **JSDoc**: one-line `/** ComponentName — description */` for shared components
- **Props**: flat shapes, no deeply nested config objects
- **No PropTypes, no TypeScript**
- **Styles**: Tailwind utility classes only; no CSS modules, no styled-components

### Animation Patterns

**Scroll-triggered fade-up** (standard):
```jsx
<motion.div
  initial={{ opacity: 0, y: 32 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: '-80px' }}
  transition={{ duration: 0.6, ease: 'easeOut' }}
/>
```

**Staggered delays**: `transition={{ delay: index * 0.1 }}` (grids: `(index % 3) * 0.1`).

**Hero entrance**: `initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}`.

---

## Data Layer

**`src/data/config.js`** — exports `PERSONAL`, `SOCIAL`, `NAV_LINKS` constants.
**`src/data/projects.js`** — exports `allProjects` array. Each project has: `{ slug, title, category, description, why, system, soul, tech[], liveUrl, repoUrl, screenshot, featured, tags[] }`. `why`/`system`/`soul` can be string or string[].

---

## Environment

| Variable | Purpose |
|----------|---------|
| `VITE_FORMSPREE_ENDPOINT` | Formspree POST URL for ContactForm |

Contact form states: `idle → sending → sent | error`.

---

## Performance & Build

- **Vite manual chunks**: `vendor-react`, `vendor-motion`, `vendor-icons`, `vendor-lucide`
- **Sourcemaps disabled** in production
- **Lazy routes** — all 5 pages via `React.lazy()`
- **Lazy 3D models** — `IntersectionObserver` + dynamic `import('@google/model-viewer')` with `rootMargin: '300px'`
- **3D models** in `public/assets/3d/`: skateboard, macbook, midi keyboard (all .glb)

---

## Critical Rules (Do Not)

- **No TypeScript** — no `.ts`/`.tsx` files
- **No dark mode** — light-mode only (`--background: #f9f7f7`)
- **No extra animation libs** — Framer Motion only
- **No new colors** without updating `index.css` `@theme inline` block
- **No `React.FC`** or typing patterns
- **No named exports** for page/section components
- **Do not override `SectionWrapper` clip-path** — don't nest conflicting shapes inside it
- **Do not replace inline hex values with arbitrary Tailwind values** — stick to the palette
- **No inline CSS** — don't use the `style` prop; use Tailwind classes or `cn()` instead
- **No em dashes in copy text** — replace `—` with `—` or an alternative character in visible copy
- **No code duplication** — extract repeated markup/patterns into reusable components; prefer composition over copy-paste
- **No tests** configured in this project
