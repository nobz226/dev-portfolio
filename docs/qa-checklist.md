# QA Checklist — dev-portfolio

## 1. Functional Testing

### 1.1 Navigation & Routing
- [ ] All 5 routes load successfully: `/`, `/about`, `/projects`, `/projects/:slug`, `/contact`
- [ ] Header nav links navigate to correct pages
- [ ] Active nav link is highlighted with cyber-cyan color
- [ ] Mobile hamburger menu opens and closes
- [ ] Focus trap works in mobile menu (Tab cycles through links, Escape closes)
- [ ] Browser back/forward buttons navigate correctly
- [ ] Direct URL entry loads correct page
- [ ] Invalid project slug shows "Project not found" state
- [ ] FeaturedProjects "View All" links to /projects
- [ ] ProjectCard "Details" links to correct /projects/:slug
- [ ] Footer nav links navigate to correct pages
- [ ] Scroll-to-top happens on route change (ScrollToTop component)

### 1.2 Form Functionality (Contact)
- [ ] Form renders with Name, Email, Subject, Message fields
- [ ] Client-side validation catches empty required fields
- [ ] Client-side validation catches invalid email format
- [ ] Error messages display below corresponding fields
- [ ] Submit button shows "Sending..." state during submission
- [ ] Successful submission shows "Message Sent" confirmation
- [ ] "Send another" button resets form to idle state
- [ ] Network error shows error message with fallback instruction
- [ ] Form fields clear after successful submission
- [ ] Formspree endpoint is configurable via VITE_FORMSPREE_ENDPOINT

### 1.3 Project Detail Page
- [ ] Project title renders correctly for each slug
- [ ] Description section renders project description
- [ ] "The Why" section renders when project.why exists
- [ ] "The System" section renders when project.system exists
- [ ] Tech Stack badges display in System section
- [ ] "The Soul" section renders when project.soul exists
- [ ] Screenshot image displays with click-to-expand modal
- [ ] Modal opens/closes with click and Escape key
- [ ] Focus trap works in screenshot modal
- [ ] Previous/Next project navigation exists and works
- [ ] Sticky action bar appears on scroll (desktop)
- [ ] Sticky action bar disappears at bottom nav
- [ ] Live Demo / View Code / Back buttons function

### 1.4 Projects Grid
- [ ] All projects render in the grid
- [ ] Tag filter buttons filter projects correctly
- [ ] "All" filter shows all projects
- [ ] Filtered results update screen reader status (aria-live)
- [ ] No results state shows appropriate message
- [ ] Live button is disabled for projects without liveUrl
- [ ] Code button is disabled for projects without repoUrl
- [ ] Featured badge appears on featured projects

### 1.5 Homepage Sections
- [ ] Hero section renders with TerminalText heading
- [ ] TypedText animations play on load
- [ ] Portrait ring rotates with circular text
- [ ] Hex pattern renders on desktop
- [ ] CTAs "View Work" and "Get In Touch" function
- [ ] Scroll indicator arrow bounces
- [ ] Featured Projects accordion is interactive
- [ ] Accordion slides expand/collapse on click
- [ ] Tech Stack grid renders all categories

### 1.6 About Page
- [ ] AboutHero renders with typed heading
- [ ] CoreValues sections render with 3D model cards
- [ ] 3D models load when scrolled into view (IntersectionObserver)
- [ ] Loading spinner shows while model loads
- [ ] Error state shows for failed model loads
- [ ] Differentiation section renders correctly
- [ ] CareerInternship section renders with bullet list
- [ ] MissionStatement section renders with blockquote

## 2. Metadata & SEO

### 2.1 Page Titles
- [ ] Home: "Eduard Rotaru - Full-Stack Developer and Digital Creative"
- [ ] About: "About Eduard Rotaru - Full-Stack Developer & Creative Technologist"
- [ ] Projects: "Projects - Eduard Rotaru | Full-Stack Development & Design"
- [ ] Project Detail: "{Project Title} - Eduard Rotaru"
- [ ] Contact: "Contact Eduard Rotaru - Get In Touch"
- [ ] Document.title updates on route change

### 2.2 Meta Tags
- [ ] Each page has exactly one `<meta name="description">`
- [ ] Open Graph meta tags exist: og:title, og:description, og:image, og:url, og:type
- [ ] Twitter Card meta tags exist: twitter:card, twitter:title, twitter:description, twitter:image
- [ ] og:image uses absolute URLs (https://eduardrotaru.dev/...)
- [ ] Canonical link tag is present and correct
- [ ] Structured data JSON-LD is present (Person on Home, CollectionPage on Projects)

### 2.3 Structured Data
- [ ] Home page has Person schema with name, url, jobTitle, sameAs
- [ ] Projects page has CollectionPage schema
- [ ] JSON-LD is valid and parseable
- [ ] Script tag updates on route change (not cumulative)

## 3. Visual Design & Layout

### 3.1 Typography
- [ ] Headings render in Cal Sans (or reasonable fallback)
- [ ] Body text renders in Courier Prime
- [ ] Labels/badges render in Silom font
- [ ] Font files load without errors
- [ ] No FOUT/FOUT with font-display: swap
- [ ] TerminalBar dots render correctly (3 circles)
- [ ] TypedText animations play correctly

### 3.2 Color Palette
- [ ] Cyber-cyan (#2dd4bf) used for accents, links, highlights
- [ ] Soft-blue (#22b8c7) used for secondary accents
- [ ] Charcoal (#1e1e1e) used for dark backgrounds and dark text
- [ ] Snow (#f9f7f7) used as page background
- [ ] Warm-gray (#eeece9) used for footer and alt backgrounds
- [ ] All text has sufficient color contrast (WCAG AA 4.5:1)

### 3.3 Signature Visual Elements
- [ ] Pentagon clip-path on SectionWrapper (desktop only)
- [ ] SectionLabel arrow-tip banner clip-path
- [ ] Terminal card style (3 dots + monospace filename)
- [ ] Glitch text effect on glitch-wrapper elements
- [ ] Hover scale effect (hover:scale-[1.15]) on interactive elements
- [ ] Scroll-triggered fade-up animations via Framer Motion

### 3.4 Responsive Design
- [ ] Layout works on mobile (375px+)
- [ ] Layout works on tablet (768px+)
- [ ] Layout works on desktop (1024px+)
- [ ] Layout works on wide desktop (1440px+)
- [ ] Header collapses to hamburger menu on mobile
- [ ] Accordion switches to vertical layout on mobile
- [ ] Pentagon clip-path disabled below 1000px
- [ ] Projects grid stacks vertically on mobile
- [ ] Contact form switches to single column on mobile
- [ ] Tech stack grid switches to single column on mobile
- [ ] All images are responsive (max-width: 100%)

## 4. Performance

### 4.1 Loading Performance
- [ ] Routes are lazy-loaded (React.lazy + Suspense)
- [ ] Loader component shows during route transitions
- [ ] 3D models are lazy-loaded via IntersectionObserver
- [ ] @google/model-viewer is dynamically imported
- [ ] Images have loading="lazy" where appropriate
- [ ] model-viewer has reveal="auto" for progressive rendering
- [ ] No unused JavaScript bundles are loaded

### 4.2 Build Optimization
- [ ] Vite manual chunks configured (vendor-react, vendor-motion, vendor-icons, vendor-lucide)
- [ ] Sourcemaps disabled in production
- [ ] Build completes without errors (`npm run build`)
- [ ] Preview build serves correctly (`npm run preview`)

## 5. Accessibility

### 5.1 Screen Reader Support
- [ ] All images have alt text
- [ ] Decorative icons have aria-hidden="true"
- [ ] Form fields have associated labels with htmlFor
- [ ] Error messages use role="alert" or are announced
- [ ] Status messages use aria-live="polite"
- [ ] Navigation is semantic (<nav>, <main>, <header>, <footer>)
- [ ] Headings are hierarchical (h1 -> h2 -> h3)
- [ ] Modal has role="dialog" and aria-modal="true"
- [ ] Mobile menu has aria-expanded and aria-controls
- [ ] Skip navigation link (if present) functions correctly

### 5.2 Keyboard Navigation
- [ ] All interactive elements are keyboard-reachable
- [ ] Tab order follows logical reading order
- [ ] Escape closes mobile menu
- [ ] Escape closes screenshot modal
- [ ] Focus trap prevents focus from leaving modal/menu
- [ ] Focus returns to trigger element after modal closes
- [ ] Accordion slides are keyboard-accessible (Enter/Space)

### 5.3 Color & Contrast
- [ ] All text passes WCAG AA contrast ratio (4.5:1)
- [ ] No information conveyed by color alone
- [ ] Focus indicators are visible (focus-visible styles)

## 6. Code Quality

### 6.1 Linting & Conventions
- [ ] No ESLint errors (`npm run lint`)
- [ ] No React-specific lint warnings
- [ ] No console.log statements in production code
- [ ] No unused imports or variables
- [ ] No excessive padding hacks (e.g., pb-[800px])
- [ ] Consistent import pattern (@/ alias used)
- [ ] Components use default exports for pages/sections
- [ ] React.memo used on shared view components

### 6.2 Error Handling
- [ ] Invalid project slug shows error state
- [ ] Missing VITE_FORMSPREE_ENDPOINT doesn't crash the app
- [ ] Model load failure shows error state
- [ ] Form submission failure shows user-friendly message
- [ ] Network errors are caught gracefully

## 7. Content Accuracy

### 7.1 Personal Information
- [ ] Name "Eduard Rotaru" is consistent across site
- [ ] Title "Full-Stack Developer" is consistent
- [ ] Email is correct (eduard.rotaru89@gmail.com)
- [ ] GitHub link points to correct profile (nobz226)
- [ ] LinkedIn link points to correct profile
- [ ] Domain name is consistent (eduardrotaru.dev)

### 7.2 Project Data
- [ ] Nobz Beats details are accurate (title, category, tech, links)
- [ ] MD Murals details are accurate
- [ ] Ollie North Skateshop details are accurate
- [ ] Audio Tools API details are accurate
- [ ] All project external links resolve (liveUrl, repoUrl)
- [ ] Screenshots display correctly for all projects

### 7.3 About Page Content
- [ ] Career Internship section is current
- [ ] Mission statement reflects current goals
- [ ] Core values are accurate and up to date
- [ ] Contact availability status is current

## 8. Cross-Browser Testing

### 8.1 Desktop Browsers
- [ ] Google Chrome (latest) — all pages render correctly
- [ ] Mozilla Firefox (latest) — all pages render correctly
- [ ] Apple Safari (latest) — all pages render correctly
- [ ] Microsoft Edge (latest) — all pages render correctly

### 8.2 Mobile Browsers
- [ ] Mobile Safari (iOS) — all pages render correctly
- [ ] Chrome for Android — all pages render correctly
- [ ] Samsung Internet — all pages render correctly

### 8.3 Feature Compatibility Matrix
- [ ] CSS clip-path (polygon shapes) — pentagon clip, arrow-tip banner
- [ ] Framer Motion animations — all fade-up, stagger, entrance effects
- [ ] @google/model-viewer — 3D models render and auto-rotate
- [ ] IntersectionObserver — lazy loading for models and scroll animations
- [ ] CSS @font-face — Silom TTF loads correctly
- [ ] ES module imports — Vite dev server and production build
- [ ] History API routing — SPA navigation works, no 404 on refresh
- [ ] CSS backdrop-filter — header blur effect on scroll
- [ ] CSS grid/flexbox — all responsive layouts
- [ ] CSS custom properties — theme colors and spacing
- [ ] CSS animations (@keyframes) — glitch, scanline, subtle-glow
- [ ] SVG rendering — icons, logo, HexPattern
- [ ] Form validation — client-side validation messages display
- [ ] Focus management — focus trap, keyboard navigation

### 8.4 Viewport Breakpoints
- [ ] 375px (mobile) — single column layouts, hamburger menu
- [ ] 768px (tablet) — accordion switches to vertical, 2-col grids
- [ ] 1024px (desktop) — full layouts, pentagon clip enabled
- [ ] 1440px (wide) — max-width containers centered
- [ ] Text remains readable at all breakpoints
- [ ] Touch targets meet 44x44px minimum on mobile

### 8.5 Regression Testing
- [ ] Navigate all routes in each browser
- [ ] Test contact form submission in each browser
- [ ] Verify 3D models load in each browser
- [ ] Check console for browser-specific errors/warnings
- [ ] Test print stylesheet (if applicable)
- [ ] Test with JavaScript disabled (graceful degradation)

## 9. 3D Model Integration

- [ ] Skateboard model loads on CoreValues card 01
- [ ] MacBook model loads on CoreValues card 02
- [ ] MIDI keyboard model loads on CoreValues card 03
- [ ] Models auto-rotate when loaded
- [ ] Models pause rotation on user interaction (mouse/touch)
- [ ] Loading spinner shows while model downloads
- [ ] Error message shows if model fails to load
- [ ] Model viewer has keyboard focus styling
- [ ] Models are lazy-loaded when scrolled into view (300px margin)

## 10. Build & Deployment

- [ ] `npm run dev` starts without errors
- [ ] `npm run build` completes without errors
- [ ] `npm run preview` serves the build correctly
- [ ] `npm run lint` passes without errors
- [ ] Environment variable VITE_FORMSPREE_ENDPOINT is documented
- [ ] Dist folder contains production build output
- [ ] All assets (images, fonts, 3D models) are included in build
- [ ] Manual chunks are generated in build output
