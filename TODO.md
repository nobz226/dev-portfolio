# TODO — Code Optimizations & Refactoring

## High Priority

- [ ] **Delete orphaned `src/App.css`** — contains only a comment, not imported anywhere
- [ ] **Delete `src/components/ModelViewerCard.jsx`** — dead code, replaced by `ModelLodCard`
- [ ] **Replace hoveredArrow pattern with CSS `hover:`** (15 instances, 6 files)
  - `src/pages/Projects/components/ProjectCard.jsx` — 5 instances
  - `src/components/ProjectsAccordion.jsx` — 3 instances
  - `src/pages/ProjectDetail/index.jsx` — 3 instances
  - `src/pages/Contact/components/ContactForm.jsx` — 2 instances
  - `src/pages/Home/components/FeaturedProjects.jsx` — 1 instance
  - `src/pages/About/components/CareerInternship.jsx` — 1 instance
  - Eliminates 6 `useState` hooks, ~30 event handlers, and unnecessary re-renders
- [ ] **Replace hardcoded colors with semantic Tailwind classes** (~127 instances across all `.jsx` files)
  - `text-[#1e1e1e]` → `text-charcoal`
  - `text-[#2dd4bf]` → `text-cyber-cyan`
  - `text-[#f9f7f7]` → `text-snow`
  - `text-[#22b8c7]` → `text-soft-blue`
  - `text-[#555555]` → `text-muted-foreground`
  - `text-[#666666]` → `text-muted-foreground`
  - `bg-[#f10f7f7]` → `bg-snow`
  - `bg-[#1e1e1e]` → `bg-charcoal`
  - etc.
- [ ] **Extract `allProjects` to a shared data file**
  - Move from `src/pages/Projects/components/ProjectsGrid.jsx` to `src/data/projects.js`
  - Update imports in `ProjectsGrid.jsx`, `FeaturedProjects.jsx`, `ProjectDetail/index.jsx`
- [ ] **Move Formspree endpoint to environment variable**
  - `src/pages/Contact/components/ContactForm.jsx:31` — `'https://formspree.io/f/mqegjerp'` → `import.meta.env.VITE_FORMSPREE_ENDPOINT`
  - Add `.env.example` with the variable documented

## Medium Priority

- [ ] **Extract terminal top-bar pattern into shared component** (2 instances)
  - `src/pages/Contact/components/ContactForm.jsx:66-71`
  - `src/pages/Projects/components/ProjectCard.jsx:21-26`
  - Create reusable `TerminalTitleBar.jsx`
- [ ] **Move `renderParagraphs` outside component** (`src/pages/ProjectDetail/index.jsx:38-48`)
  - Avoids re-creation on every render
  - Replace fragile `key={paragraph}` with index-based key
- [ ] **Fix resize listener duplication in SectionWrapper**
  - `src/components/SectionWrapper.jsx:21-25` — each instance registers its own listener
  - Consider using `matchMedia` or a shared custom hook
- [ ] **Fix resize listener churn in ProjectsAccordion**
  - `src/components/ProjectsAccordion.jsx:34-37` — listener attached/detached on every `activeIndex` change
  - Separate into its own `useEffect` with empty deps
- [ ] **Deduplicate social link data**
  - `src/components/Footer.jsx:10-14` and `src/pages/Contact/components/ContactInfo.jsx:10-14`
  - Share a single source of truth (e.g., `src/data/social.js`)
- [ ] **Fix JS/CSS breakpoint mismatch**
  - `src/components/SectionWrapper.jsx:38` uses `1000px` in JS
  - `src/index.css:125` uses `768px` in media query
  - Pentagon clip is applied between 769-999px where mobile styles are inactive

## Low Priority

- [ ] **Switch relative imports to `@/` alias where applicable**
  - UI files already use `@/lib/utils`; non-UI files use relative paths like `../../../components/`
- [ ] **Merge ModelLodCard's three `useEffect` hooks**
  - `src/components/ModelLodCard.jsx:28-68` — load listener and auto-rotate pause can be merged
- [ ] **Remove empty cleanup functions in hooks**
  - `src/hooks/usePageMeta.js:50-52` — empty `return () => {}`
  - `src/hooks/useStructuredData.js:16-18` — empty `return () => {}`
- [ ] **Wrap event handlers in `useCallback` in ProjectsAccordion**
  - `src/components/ProjectsAccordion.jsx:11-27` — `handleSlideClick`, `handlePrevious`, `handleNext` recreated every render
- [ ] **Extract hardcoded personal URLs to constants**
  - `src/pages/Home/index.jsx` — `https://eduardrotaru.dev`, GitHub/LinkedIn URLs used in structured data
- [ ] **Use index-based keys for static arrays** (3 instances)
  - `src/pages/About/components/DifferentiationSection.jsx:53` — `key={item}` (string content)
  - `src/pages/About/components/CareerInternship.jsx:42` — `key={item}` (string content)
  - `src/pages/ProjectDetail/index.jsx:44` — `key={paragraph}` (full paragraph text)

## Accessibility

- [ ] **Make accordion slides keyboard-accessible**
  - `src/components/ProjectsAccordion.jsx:58` — add `role="button"`, `tabIndex`, keyboard handler
- [ ] **Fix form label-input association**
  - `src/pages/Contact/components/ContactForm.jsx` — add `htmlFor` on labels, `id` on inputs
- [ ] **Add proper ARIA to screenshot modal**
  - `src/pages/ProjectDetail/index.jsx:254-284` — add `role="dialog"`, `aria-modal`, focus trap
- [ ] **Limit global arrow-key listener scope**
  - `src/components/ProjectsAccordion.jsx:30-38` — accordion responds to arrow keys even when not focused
- [ ] **Add `aria-hidden` to decorative elements**
  - `src/pages/Home/components/HeroSection.jsx` — rotating text ring, scroll indicator
  - `src/components/SectionLabel.jsx` — decorative triangle and banner
  - `src/pages/Projects/components/ProjectCard.jsx` — terminal top-bar dots
  - `src/pages/Contact/components/ContactInfo.jsx` — social link icons
