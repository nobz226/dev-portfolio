# dev-portfolio

Personal portfolio website for **Eduard Rotaru** — a full-stack developer and creative technologist. Designed with a deliberate terminal/hacker aesthetic, featuring 3D model integration, interactive project case studies, and a cohesive pentagon-based visual identity.

**Live site:** [eduardrotaru.ca](https://eduardrotaru.ca)

---

## Tech Stack

| Category | Tools |
|---|---|
| **Framework** | React 19 (JSX, no TypeScript) |
| **Build** | Vite 7 |
| **Styling** | Tailwind CSS 4 + `tw-animate-css` + shadcn/tailwind |
| **UI Primitives** | shadcn/ui (New York style) |
| **Animation** | Framer Motion 12 |
| **3D Rendering** | @google/model-viewer 4 |
| **Icons** | lucide-react, react-icons (Simple Icons) |
| **Routing** | React Router DOM 7 |
| **Deploy** | Vercel (SPA rewrites) |
| **Linting** | ESLint 9 |

---

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Production build
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint
```

### Prerequisites

- Node.js 18+
- npm (or pnpm / yarn)

---

## Project Structure

```
src/
├── App.jsx                          # Root — BrowserRouter with 5 routes
├── main.jsx                         # Entry point (ReactDOM.createRoot)
├── index.css                        # Tailwind imports, theme variables, keyframe animations
├── components/
│   ├── Header.jsx                   # Fixed nav, scroll-aware backdrop, mobile hamburger
│   ├── Footer.jsx                   # Brand, nav links, social icons (GitHub/LinkedIn/Email)
│   ├── SectionWrapper.jsx           # Reusable section shell with pentagon clip + scroll animation
│   ├── SectionLabel.jsx             # Branded header: cyan triangle + arrow-tip banner
│   ├── GlitchText.jsx               # CSS glitch effect via pseudoelements
│   ├── TerminalText.jsx             # Typewriter character-by-character effect
│   ├── ProjectsAccordion.jsx        # Horizontal accordion carousel with arrow-key nav
│   ├── ModelViewerCard.jsx          # 3D model viewer (text + <model-viewer> side by side)
│   ├── ModelLodCard.jsx             # Lazy-loaded 3D model viewer (IntersectionObserver)
│   ├── ProjectsAccordion.css        # Accordion slide styles
│   ├── model-viewer.css             # Model viewer layout styles
│   └── ui/                          # shadcn/ui primitives (7 components)
│       ├── badge.jsx
│       ├── button.jsx
│       ├── card.jsx
│       ├── input.jsx
│       ├── label.jsx
│       ├── separator.jsx
│       └── textarea.jsx
├── pages/
│   ├── Home/
│   │   ├── index.jsx                # Composes hero, featured projects, tech stack
│   │   └── components/
│   │       ├── HeroSection.jsx      # Spinning portrait ring, terminal prompt, CTAs
│   │       ├── FeaturedProjects.jsx  # Accordion wrapper for 3 featured projects
│   │       └── TechStack.jsx        # 4-column skill grid (Frontend/Backend/Tooling/AI)
│   ├── About/
│   │   ├── index.jsx                # Composes all about sections
│   │   └── components/
│   │       ├── AboutHero.jsx
│   │       ├── CoreValues.jsx        # 3D model cards (skateboard, MacBook, MIDI keyboard)
│   │       ├── DifferentiationSection.jsx  # Technical Rigor vs Creative Soul
│   │       ├── CareerInternship.jsx  # Internship goals
│   │       └── MissionStatement.jsx
│   ├── Projects/
│   │   ├── index.jsx                # Page hero + filtered project grid
│   │   └── components/
│   │       ├── ProjectsGrid.jsx      # Tag-filterable grid + all project data (single source of truth)
│   │       └── ProjectCard.jsx       # Terminal-style card with screenshot, badges, links
│   ├── ProjectDetail/
│   │   └── index.jsx                # Dynamic /projects/:slug with Why/System/Soul sections
│   └── Contact/
│       ├── index.jsx                # Page hero + form/info layout
│       └── components/
│           ├── ContactForm.jsx       # Formspree-powered contact form
│           └── ContactInfo.jsx       # Availability badges + social contact links
├── hooks/
│   ├── usePageMeta.js               # Dynamic document title, meta description, OG/Twitter tags, canonical
│   └── useStructuredData.js         # JSON-LD structured data injection (Person, CollectionPage)
└── lib/
    └── utils.js                     # cn() helper combining clsx + tailwind-merge
```

---

## Routes

| Path | Page | Sections |
|---|---|---|
| `/` | Home | Hero with animated portrait ring, featured projects accordion, tech stack grid |
| `/about` | About | Bio hero, 3D core values, differentiation, internship goals, mission statement |
| `/projects` | Projects | Tag-filtered project grid (All / Full-Stack / Creative / E-Commerce / API) |
| `/projects/:slug` | Project Detail | Deep-dive with The Why, The System, The Soul + screenshot modal |
| `/contact` | Contact | Contact form (Formspree), availability status, social links |

---

## Design System

### Colors

| Token | Hex | Usage |
|---|---|---|
| Cyber Cyan | `#2dd4bf` | Primary accent, highlights, active nav |
| Soft Blue | `#22b8c7` | Secondary accent, alternate section banners |
| Charcoal | `#1e1e1e` | Primary text, dark backgrounds (section wrappers) |
| Snow | `#f9f7f7` | Page background, light surfaces, text on dark sections |
| Muted | `#666666` | Secondary text, captions |

### Typography

- **font-sans** — Cal Sans (headings, display text)
- **font-mono** — Courier Prime (code, terminal output, badges)
- **font-silom** — Silom (uppercase labels, branding accents)

### Signature Visual Patterns

- **Section backgrounds** clipped to a pentagon shape (`polygon(0 0, calc(100% - 48px) 0, 100% 50%, calc(100% - 48px) 100%, 0 100%)`)
- **Section headers** use `SectionLabel`: a cyan right-arrow triangle followed by a banner with an arrow-tip `clipPath`
- **Terminal card motif**: three muted dot circles + monospace filename in a top bar with bottom border
- **Hover interactions** on links scale via `transform: scale(1.15)` with React state tracking
- **Scroll-triggered animations** via Framer Motion `whileInView` with staggered delays

---

## 3D Models

Three interactive `.glb` 3D models displayed via the `<model-viewer>` web component:

| Model | File | Associated Value |
|---|---|---|
| Skateboard | `public/assets/3d/skateboard_-_used.glb` | The Art of Resilience |
| MacBook | `public/assets/3d/macbook_air_notebook_pbr.glb` | Uncompromising Detail |
| MIDI Keyboard | `public/assets/3d/midi_keyboard__piano__instrument.glb` | Intentional Craftsmanship |

All models auto-rotate, support click-and-drag orbit controls, and pause rotation 3 seconds after the last user interaction. The `ModelLodCard` component lazy-loads both the model library and the 3D asset using `IntersectionObserver` with a 300px root margin.

---

## Projects (Case Studies)

| Project | Category | Stack | Links |
|---|---|---|---|
| Nobz Beats | Music Platform | React, Vite, Convex, Tailwind | [Live](https://nobz-beats-react.vercel.app/latest) · [Repo](https://github.com/nobz226/nobz-beats) |
| MD Murals | Art Portfolio | React, Vite, GSAP, Convex | [Live](https://md-murals.vercel.app) · [Repo](https://github.com/nobz226/md-murals) |
| Ollie North Skateshop | E-Commerce | Next.js 15, React 19, Convex, Clerk, Stripe | [Live](https://ollie-north-skateshop.vercel.app) · [Repo](https://github.com/nobz226/ollie-north-skateshop) |
| Audio Tools API | Backend API | Flask, Python, FFmpeg, Demucs, PyTorch | [Repo](https://github.com/nobz226/audio-tools-API) |

Each project detail page follows a three-part narrative:
- **The Why** — motivation and problem being solved
- **The System** — technical architecture and implementation details
- **The Soul** — design decisions, aesthetic choices, and philosophical approach

---

## Scripts

```bash
npm run dev       # Start Vite dev server (default: http://localhost:5173)
npm run build     # Production build → dist/
npm run preview   # Preview production build locally
npm run lint      # Run ESLint on the project
```

---

## Configuration

### Vite (`vite.config.js`)

- Plugins: `@vitejs/plugin-react` + `@tailwindcss/vite`
- Path alias: `@` → `src/`

### shadcn/ui (`components.json`)

- Style: New York, JSX only (`tsx: false`)
- CSS variables enabled, neutral base color
- Icon library: lucide

### Vercel (`vercel.json`)

SPA rewrites — all paths redirect to `index.html` for client-side routing:

```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

### Contact Form

The contact form submits to a Formspree endpoint (`https://formspree.io/f/mqegjerp`). To use your own endpoint, update the URL in `src/pages/Contact/components/ContactForm.jsx:31`.

---

## Credits & Acknowledgments

- **Fonts**: Cal Sans by [@tonsky](https://github.com/tonsky), Courier Prime by [Alan Greene](https://fontlibrary.org/en/font/courier-prime), Silom (pixel/arcade style)
- **3D Models**: Sourced from [Sketchfab](https://sketchfab.com) and similar open 3D repositories
- **Icons**: [Lucide](https://lucide.dev) for UI icons, [Simple Icons](https://simpleicons.org) for brand/tech icons via `react-icons`
- **shadcn/ui**: UI primitives from [shadcn](https://ui.shadcn.com)
- **Formspree**: Contact form backend

---

## Contact

- **Email**: eduard.rotaru89@gmail.com
- **GitHub**: [nobz226](https://github.com/nobz226)
- **LinkedIn**: [Eduard Rotaru](https://www.linkedin.com/in/eduard-rotaru-b63b11124/)

---

## License

All rights reserved. This project is a personal portfolio and is not licensed for reuse or redistribution. Feel free to reference the architecture and patterns for inspiration.
