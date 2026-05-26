# Code Optimizations & Refactoring

## High Priority

- [ ] **Replace hardcoded colors with semantic Tailwind tokens** (24 instances)
  - `bg-[#eeece9]` — Footer:25, ModelLodCard:76,96, ContactInfo:67, ProjectCard:16
  - `from-[#1e1e1e] to-[#2d2d2d]` — ProjectsAccordion:50
  - `from-[#f5f3f0] via-[#f1eeeb] to-[#eeece9]` — ModelLodCard:96
  - `text-[#999999]` — ProjectCard:36, ProjectDetail:111
  - `text-[#333333]` — ProjectCard:93,110
  - `text-[#aaaaaa]` — FeaturedProjects:55
  - `bannerBgColor="#..."` hex strings — SectionLabel:7-8, TechStack:79, MissionStatement:6, DifferentiationSection:6, AboutHero:14, Projects:35, Contact:24, ProjectDetail:79,139,179
  - `rgba(45,212,191,0.08)` — ModelLodCard:97
  - `#19535f` — ProjectsAccordion.css:8
  - Colors in model-viewer.css:7,30,35,60,138,157

- [ ] **Fix Footer social links** — uses generic URLs (`github.com`, `linkedin.com`) instead of actual profiles like ContactInfo

- [ ] **Consolidate featured project data** — `FeaturedProjects.jsx:7-41` duplicates subset of `data/projects.js`; use `.filter(p => p.featured)` instead

## Medium Priority

- [ ] **Move `renderParagraphs` outside component** (`ProjectDetail/index.jsx:37-47`)
  - Recreated every render; still uses fragile `key={paragraph}`

- [ ] **Remove empty cleanup functions in hooks**
  - `usePageMeta.js:50-52` — empty `return () => {}`
  - `useStructuredData.js:16-18` — empty `return () => {}`

- [ ] **Fix ProjectsAccordion missing dep** — `useEffect` (line 26) closes over `handlePrevious`/`handleNext` which depend on `projects.length`, but `projects` is not in deps `[activeIndex, onActiveChange]`

- [ ] **Centralize personal config** — email, GitHub/LinkedIn URLs, domain name hardcoded in 3+ places (Footer, ContactInfo, Home structured data)

- [ ] **Deduplicate nav link data** — Header:5-10 and Footer:16-21 define the same `navLinks` array

- [ ] **Deduplicate social link data** — Footer:10-14 and ContactInfo:10-14 define similar contact arrays with different URLs

- [ ] **Extract terminal top-bar into shared component** — ProjectCard:19-23 and ContactForm:65-69 have identical three-dot + filename pattern

## Low Priority

- [ ] **Switch relative imports to `@/` alias** — ~38 relative imports across 19 files outside `components/ui/`
- [ ] **Delete unused shadcn components** — `src/components/ui/card.jsx` and `separator.jsx` are imported nowhere
- [ ] **Wrap stable callbacks in `useCallback`** — ProjectsAccordion:8-24, ContactForm:17-54, ProjectDetail:37-47
- [ ] **Create shared `src/data/config.js`** — centralize email, URLs, domain for all consumers

## Accessibility

- [ ] **Add ARIA to screenshot modal** (`ProjectDetail/index.jsx:248-275`) — missing `role="dialog"`, `aria-modal`, `aria-label`
- [ ] **Make accordion slides keyboard-accessible** (`ProjectsAccordion.jsx:48-150`) — missing `role="button"`, `tabindex`, Enter/Space handler
- [ ] **Add `aria-hidden` to decorative elements** — terminal dots (ProjectCard, ContactForm), SectionLabel triangle/banner
- [ ] **Limit global arrow-key listener** — ProjectsAccordion:31 responds to arrow keys globally even when not focused
- [ ] **Add `aria-live="polite"` to ModelLodCard states** — loading/error indicators for screen readers
