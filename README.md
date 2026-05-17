# dev-portfolio

Personal portfolio website for **Eduard Rotaru** — a full-stack developer and creative technologist. Built with React 19, Vite, Tailwind CSS v4, shadcn/ui, and Framer Motion. Features a deliberate terminal/hacker aesthetic with 3D model integration.

**Live:** [eduardrotaru.dev](https://eduardrotaru.dev)

---

## Tech Stack

| Category | Tools |
|---|---|
| **Framework** | React 19 (JSX, no TypeScript) |
| **Build** | Vite 7 |
| **Styling** | Tailwind CSS 4 + tw-animate-css |
| **UI Primitives** | shadcn/ui (New York style) |
| **Animation** | Framer Motion 12 |
| **3D** | @google/model-viewer 4 |
| **Icons** | lucide-react, react-icons (Simple Icons) |
| **Routing** | React Router DOM 7 |
| **Deploy** | Vercel (SPA rewrites) |
| **Linting** | ESLint 9 |

---

## Project Structure

```
src/
├── App.jsx                          # Root — BrowserRouter with 5 routes
├── main.jsx                         # Entry point
├── index.css                        # Tailwind imports, theme vars, animations
├── components/
│   ├── Header.jsx                   # Fixed nav, scroll-aware, mobile hamburger
│   ├── Footer.jsx                   # Logo, nav links, social icons
│   ├── SectionWrapper.jsx           # Reusable section shell with pentagon bg + scroll animation
│   ├── SectionLabel.jsx             # Branded section header (triangle + banner)
│   ├── GlitchText.jsx               # CSS glitch animation wrapper
│   ├── TerminalText.jsx             # Typewriter character-by-character effect
│   ├── ModelViewerCard.jsx          # 3D model viewer (text + <model-viewer>)
│   ├── ModelLodCard.jsx             # Lower-detail variant of ModelViewerCard
│   ├── ProjectsAccordion.jsx        # Horizontal accordion carousel for featured projects
│   └── ui/                          # shadcn/ui primitives (7 components)
├── pages/
│   ├── Home/
│   │   ├── index.jsx
│   │   └── components/
│   │       ├── HeroSection.jsx      # Portrait ring + terminal prompt + CTAs
│   │       ├── FeaturedProjects.jsx  # Accordion wrapper
│   │       └── TechStack.jsx         # Categorized grid of skills
│   ├── About/
│   │   ├── index.jsx
│   │   └── components/
│   │       ├── AboutHero.jsx
│   │       ├── CoreValues.jsx        # 3 model cards (skateboard, laptop, MIDI keyboard)
│   │       ├── DifferentiationSection.jsx
│   │       ├── CareerInternship.jsx
│   │       └── MissionStatement.jsx
│   ├── Projects/
│   │   ├── index.jsx
│   │   └── components/
│   │       ├── ProjectsGrid.jsx      # Tag-filterable grid + all project data
│   │       └── ProjectCard.jsx
│   ├── ProjectDetail/
│   │   └── index.jsx                 # Dynamic /projects/:slug with Why/System/Soul
│   └── Contact/
│       ├── index.jsx
│       └── components/
│           ├── ContactForm.jsx       # Formspree-powered contact form
│           └── ContactInfo.jsx       # Availability + social links
├── hooks/
│   ├── usePageMeta.js               # Dynamic title, meta, OG tags, canonical
│   └── useStructuredData.js         # JSON-LD structured data
└── lib/
    └── utils.js                     # cn() helper (clsx + tailwind-merge)
```

---

## Routes

| Path | Page | Description |
|---|---|---|
| `/` | Home | Hero with rotating portrait ring, featured projects accordion, tech stack grid |
| `/about` | About | Bio, 3D core values, differentiation, internship goals, mission statement |
| `/projects` | Projects | Filterable project grid (All / Full-Stack / Creative / E-Commerce / API) |
| `/projects/:slug` | Project Detail | Deep dive: The Why, The System, The Soul for each project |
| `/contact` | Contact | Contact form (Formspree) + availability status + social links |

---

## Design System

### Colors

| Token | Hex | Usage |
|---|---|---|
| Cyber Cyan | `#2dd4bf` | Primary accent, highlights, links |
| Soft Blue | `#22b8c7` | Secondary accent |
| Charcoal | `#1e1e1e` | Text, dark backgrounds |
| Snow | `#f9f7f7` | Page background, light surfaces |
| Muted | `#666666` | Secondary text |

### Typography

- **font-sans** — Cal Sans (headings, display text)
- **font-mono** — Courier Prime (code, terminal, badges)
- **font-silom** — Silom (uppercase labels, branding)

### Key Patterns

- All sections use `SectionWrapper` for consistent pentagon-shaped backgrounds and scroll-triggered fade-up animation
- All section headers use `SectionLabel` (cyan right-arrow triangle + banner)
- Terminal card motif: three dot circles + monospace filename in a top bar
- Hover interactions on links scale the element via `transform: scale(1.15)` with state-based `hoveredArrow`

---

## 3D Models

Three interactive 3D models (`.glb`) displayed via `<model-viewer>` web component:

| Model | File | Used In |
|---|---|---|
| Skateboard | `skateboard_-_used.glb` | Core Values — "The Art of Resilience" |
| MacBook | `macbook_air_notebook_pbr.glb` | Core Values — "Uncompromising Detail" |
| MIDI Keyboard | `midi_keyboard__piano__instrument.glb` | Core Values — "Intentional Craftsmanship" |

All models auto-rotate, support orbit controls, and pause rotation 3 seconds after user interaction.

---

## Projects

4 case studies documented in the portfolio:

| Project | Category | Stack |
|---|---|---|
| Nobz Beats | Music Platform | React, Vite, Convex, Tailwind |
| MD Murals | Art Portfolio | React, Vite, GSAP, Convex |
| Ollie North Skateshop | E-Commerce | Next.js 15, React 19, Convex, Clerk, Stripe |
| Audio Tools API | Backend API | Flask, Python, FFmpeg, Demucs, PyTorch |

Each project detail page has three narrative sections:
- **The Why** — motivation and problem being solved
- **The System** — technical architecture and implementation
- **The Soul** — design decisions and aesthetic choices

---

## Scripts

```bash
npm run dev       # Start Vite dev server
npm run build     # Production build
npm run preview   # Preview production build
npm run lint      # ESLint check
```

---

## Deployment

Deployed on Vercel. `vercel.json` rewrites all paths to `index.html` for SPA routing.

---

## Key Decisions

- **No TypeScript** — plain JSX throughout (`tsx: false` in shadcn config)
- **No dark mode** — light-mode only (background: `#f9f7f7`)
- **No additional animation libraries** — Framer Motion handles all motion
- **Client-side contact form** — Formspree for form submission (no backend)
- **Shared project data** — `allProjects` array in `ProjectsGrid.jsx` is the single source of truth, imported by `ProjectDetail`
