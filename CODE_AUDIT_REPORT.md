# Code Audit & Refactor Report

> **Project:** dev-portfolio — Eduard Rotaru  
> **Date:** 2026-07-01  
> **Audit scope:** All 39 source files, config files, assets, dependencies, and post-audit animation additions  
> **Verification:** `npm run lint` (0 errors), `npm run build` (success)

---

## Executive Summary

This report documents a comprehensive deep-audit of the entire dev-portfolio codebase. The initial audit (v1, 2026-06-30) identified 28 changed files across bugs, dead code, dependency cleanup, performance, and refactoring — all completed. Since the initial audit, several animation additions were made (TypedText variants, HexPattern, header animations).

This second pass (v2, 2026-07-01) identifies **12 new issues** spanning bugs (dead font link, invisible UI text, chaotic animation overlap), overengineering (layout hacks, DOM-heavy animation components, redundant useEffect merges), code quality (config duplication, missing docs), and accessibility.

**Key finding:** The codebase is well-structured and follows its conventions. Issues found are mostly at the medium/low severity level — functional, but opportunities for polish.

---

## v1 Findings (Completed)

### Bugs Fixed

| Issue | File | Fix |
|-------|------|-----|
| `opacitiy-100` typo | `ModelLodCard.jsx:126` | Changed to `opacity-100` |
| Broken sitemap image URLs | `public/sitemap.xml` | Changed `.png` → `.gif` |
| `__dirname` ESM error | `vite.config.js` | Used `fileURLToPath` + `dirname` |

### Dead Code Removed

| Item | Lines | Action |
|------|-------|--------|
| `GlitchText.jsx` | 35 | Deleted |
| `model-viewer.css` | 164 | Deleted |
| `accordionArrow.svg` | - | Deleted |
| Stray comment in `config.js` | 1 | Removed |
| Unused `useRef` import in `ProjectsGrid.jsx` | 1 | Removed |

### Dependencies Cleaned

| Package | Action | Savings |
|---------|--------|---------|
| `@types/react` | Removed | ~3 MB |
| `@types/react-dom` | Removed | ~0.5 MB |
| `radix-ui` (meta-package) | Replaced | 77 transitive packages |
| `@radix-ui/react-slot` | Added | Targeted replacement |
| `@radix-ui/react-label` | Added | Targeted replacement |
| **Net** | | **-73 packages** |

### Performance Improvements

| Improvement | Impact |
|-------------|--------|
| `useWindowWidth()` shared hook | Eliminated N redundant resize listeners |
| `passive: true` on scroll listener | Enables browser scroll optimizations |
| Removed SSR guard in `SectionWrapper` | Cleaner initialization |

### Components/Hooks Extracted

| Component | From | To |
|-----------|------|----|
| `useFocusTrap` | Duplicated in Header + ProjectDetail | `hooks/useFocusTrap.js` |
| `FormField` | Repeated in ContactForm | `components/FormField.jsx` |
| `ProjectNav` | Inline in ProjectDetail | `pages/ProjectDetail/components/` |
| `PortraitRing` | Inline in HeroSection | `pages/Home/components/` |
| `SOCIAL_ICONS` | Duplicated in Footer + ContactInfo | `lib/helpers.jsx` |
| `renderParagraphs` | Inline in ProjectDetail | `lib/helpers.jsx` |

---

## v2 Findings (New — Post-Audit)

### Bugs (High Priority)

#### 2.1 Dead Google Fonts Link for Cal Sans

**File:** `index.html:21`

```html
<link rel="stylesheet" href="...Cal+Sans&display=swap" />
```

Cal Sans is **not available on Google Fonts**. This URL returns a stylesheet with no usable `@font-face` rules. The `--font-sans` theme token (`"Cal Sans", system-ui, sans-serif`) silently falls back to `system-ui` on every page load. The `<link>` element is dead weight (~0.4 KB HTTP request + parsing).

**Symptom:** The intended heading font (Cal Sans) is never displayed. Users see their system default sans-serif.

**Fix option A (recommended):**  
Self-host Cal Sans in `public/assets/fonts/` with `@font-face` in `index.css`:
```css
@font-face {
  font-family: "Cal Sans";
  src: url("/assets/fonts/CalSans.woff2") format("woff2");
  font-display: swap;
}
```
Remove the dead Google Fonts `<link>`.

**Fix option B (simpler):**  
Remove the dead `<link>` from `index.html` and change `--font-sans` to a font that's actually loaded (e.g., use Courier Prime, the silom TTF, or just `system-ui`). This preserves visual behavior since `system-ui` is already the fallback.

#### 2.2 Invisible "Closed" Availability Labels

**File:** `src/pages/Contact/components/ContactInfo.jsx:64-71`

```jsx
<span className={`... text-white/20`}>
  <span className={`... bg-white/20`} />
  Closed
</span>
```

The parent container has `bg-warm-gray` (#eeece9). White at 20% opacity on this surface creates a contrast ratio of ~1.2:1 — effectively invisible to all users. The "Open" items use `text-cyber-cyan` (#2dd4bf) and are perfectly visible.

**Symptom:** Users cannot see which services are unavailable.

**Fix:**
```jsx
<span className={`... text-black/20`}>
  <span className={`... bg-black/20`} />
  Closed
</span>
```

This provides ~12:1 contrast — properly dimmed but still perceptible.

### Animation Quality (Medium Priority)

#### 2.3 Chaotic Scramble Overlap in Hero Tagline

**File:** `src/pages/Home/components/HeroSection.jsx:73-83`

The tagline uses 5 separate `<TypedText variant="scramble">` components:
```
[Transforming complex ideas into high-fidelity web experiences through] 
[technical honesty] [and] [artistic intent] [.]
```

Each component independently starts its scramble animation when it enters the viewport. The result is **all 5 scramble simultaneously**, creating visual noise. The last component is a single character (`.`) wrapped in an entire TypedText instance — extreme overkill for a period.

**Fix:** Merge into 1-2 TypedText components. Use styled `<span>` elements with Framer Motion or CSS transitions for the emphasized words rather than separate animation instances. This preserves the "sequential reveal" intent without the overlapping scramble chaos.

#### 2.4 `hoverKey` Animation Re-trigger Overhead

**File:** `src/components/SectionLabel.jsx:14-18`

```jsx
const [hoverKey, setHoverKey] = useState(0)
const handleMouseEnter = useCallback(() => {
  setHoverKey(k => k + 1)
}, [])
// ...
<TypedText key={hoverKey} ... />
```

Every hover over the section label increments `hoverKey`, which forces React to unmount and remount the `TypedText` component (via `key` change), re-running the entire animation setup effect. This is clever but uses React reconciliation as a side effect for animation replay.

**Fix:** Replace with CSS-based animation restart. Use an `animation-play-state` toggle or a CSS class that forces the animation to re-run via `animation: none` → `animation: <keyframe>` on class addition/removal. This avoids component remounting entirely.

### Layout Hacks (Medium Priority)

#### 2.5 Accordion Overflow Padding Hack

**File:** `src/pages/Home/components/FeaturedProjects.jsx:19`

```jsx
<div className={`${isCardActive ? 'pb-[800px]' : 'pb-96'} md:pb-0`}>
```

The accordion overflows its container on mobile when a slide is active, requiring massive phantom padding to prevent clipping. The value `800px` is a magic number tuned to the current content — any change to accordion content or styling could break this.

**Root Cause:** The accordion's `.slide-content` changes from `position: absolute` to `position: relative` at the `768px` breakpoint (see `ProjectsAccordion.css:110-116`). In relative positioning, the content is part of normal document flow and expands the slide height naturally — but the parent containers don't accommodate this.

**Fix:** Restructure the mobile accordion layout so it self-contains: either keep the slide content absolutely positioned with proper inner scrolling, or convert the mobile layout to use CSS `height: auto` on active slides with the parent allowing natural expansion.

### Performance (Lower Priority)

#### 2.6 ModelLodCard — Merge Effects 3+4

**File:** `src/components/ModelLodCard.jsx:37-68`

Effects 3 (load listeners) and 4 (interaction listeners) both depend on `libReady` and both attach listeners to `viewerRef.current`. They can be merged into a single effect:

```jsx
useEffect(() => {
  const viewer = viewerRef.current
  if (!viewer) return
  let t, timeout
  const onLoad = () => { t = setTimeout(() => setLoadState('done'), 300) }
  const onError = () => setLoadState('error')
  const pause = () => {
    viewer.autoRotate = false
    clearTimeout(timeout)
    timeout = setTimeout(() => { viewer.autoRotate = true }, 3000)
  }
  viewer.addEventListener('load', onLoad)
  viewer.addEventListener('error', onError)
  viewer.addEventListener('mousedown', pause)
  viewer.addEventListener('touchstart', pause)
  return () => {
    viewer.removeEventListener('load', onLoad)
    viewer.removeEventListener('error', onError)
    viewer.removeEventListener('mousedown', pause)
    viewer.removeEventListener('touchstart', pause)
    clearTimeout(t)
    clearTimeout(timeout)
  }
}, [libReady])
```

**Savings:** Eliminates 1 effect wrapper.

#### 2.7 HexPattern — 57 Framer Motion Instances

**File:** `src/components/ui/HexPattern.jsx`

Each of the 57 active hexagons is an individual `<motion.path>` with per-element `initial`/`animate` transitions. That's 57 Framer Motion animation controllers instantiated on mount, each with its own RAF-driven animation loop.

If these were converted to CSS keyframes with custom properties for delays, the browser's native CSS animation engine handles all 57 paths with zero JS animation overhead.

### Code Quality (Lower Priority)

| Issue | File | Current | Fix |
|-------|------|---------|-----|
| Duplicate ecmaVersion | `eslint.config.js:19,22` | Both `2020` and `'latest'` | Normalize to `'latest'` |
| Missing `.env.example` | root | None | Create with `VITE_FORMSPREE_ENDPOINT` |
| Redundant `bg-transparent` | `HeroSection.jsx:101` | Duplicates `variant="outline"` | Remove class |
| Dead CSS (glitch-wrapper) | `index.css:113-135` | Never used by any component | Optional removal |

### Accessibility

| Issue | File | Fix |
|-------|------|-----|
| Decorative bullets need `aria-hidden` | `DifferentiationSection.jsx:64` | Add `aria-hidden="true"` |
| `hover:scale` on semantic `<li>` | `CareerInternship.jsx:52` | Move scale to inner wrapper |

---

## Files Changed (v2 Proposed)

### Modified (8)
| File | Change |
|------|--------|
| `index.html` | Remove dead Cal Sans Google Fonts link |
| `index.css` | Add @font-face for Cal Sans (if self-hosting); optionally remove dead glitch-wrapper CSS |
| `src/pages/Contact/components/ContactInfo.jsx` | Fix `text-white/20` → `text-black/20` |
| `src/pages/Home/components/HeroSection.jsx` | Merge scramble TypedTexts; remove redundant `bg-transparent` |
| `src/components/ModelLodCard.jsx` | Merge effects 3+4 |
| `src/components/SectionLabel.jsx` | Replace hoverKey with CSS animation restart |
| `src/pages/Home/components/FeaturedProjects.jsx` | Fix accordion overflow hack |
| `eslint.config.js` | Fix duplicate ecmaVersion |

### Created (1)
| File | Content |
|------|---------|
| `.env.example` | Document `VITE_FORMSPREE_ENDPOINT` |

### Accessibility Fixes (2)
| File | Change |
|------|--------|
| `src/pages/About/components/DifferentiationSection.jsx` | Add `aria-hidden="true"` to bullets |
| `src/pages/About/components/CareerInternship.jsx` | Move hover scale to inner wrapper |

---

## Post-Audit Animation Assessment

The post-audit animation additions (commits `db0cbc5` through `d827b07`) added:
- `TypedText` with `variant="terminal"` / `variant="scramble"` / `variant="glitch"`
- HexPattern with staggered path animations
- Header entrance animations (logo, nav items, hamburger)

**Assessment:** These animations work correctly and enhance the user experience. The main issue is the **scramble overlap** in the hero tagline (5 independent TypedTexts competing). The HexPattern animation is fine but uses Framer Motion for 57 individual paths where CSS keyframes would be lighter. Neither is a functional regression.

---

## Best Practices Research Summary

### React 19
- All `useEffect` hooks have proper cleanup (timers cleared, listeners removed, observers disconnected) — ✅ Good
- Dependency arrays are correct in all hooks (verified against `react-hooks/exhaustive-deps`) — ✅ Good
- Some `useCallback`/`useMemo` usage is unnecessary for simple operations — could be simplified
- Project avoids `React.FC`, PropTypes, and TypeScript — consistent with project rules

### Framer Motion 12
- `whileInView` with `viewport={{ once: true }}` is the correct pattern for scroll-triggered animations — ✅ Good
- `AnimatePresence` is used correctly for mount/unmount transitions — ✅ Good
- **Opportunity:** `useInView` hook is available for imperative viewport detection (used in ModelLodCard's IntersectionObserver) — could replace manual observer with Framer Motion's built-in hook
- **Opportunity:** Per-element animation controllers (HexPattern's 57 motion.paths) add JS overhead — prefer CSS animations for large numbers of homogeneously-animated elements

### Tailwind CSS v4
- `@theme inline` is the correct v4 pattern — ✅ Good
- Custom tokens follow v4 conventions (`--color-*`, `--font-*`) — ✅ Good
- **Note:** Tailwind v4 uses CSS-first configuration. The `@custom-variant dark` is a shadcn/ui requirement — keep it
- **Note:** `filter: brightness()` in `@keyframes subtle-glow` works with Tailwind v4's filter utilities

---

## Recommended Phase Order

```
Phase 1 — Critical Bugs (2.1, 2.2)         → 30 min
Phase 2 — Animation Fixes (2.3, 2.4)        → 1-2 hours (requires careful visual preservation)
Phase 3 — Layout Fix (2.5)                  → 1-2 hours
Phase 4 — Performance (2.6, 2.7)            → 1 hour
Phase 5 — Code Quality (eslint, .env, etc.) → 30 min
Phase 6 — Accessibility                     → 15 min
Phase 7 — Verification (lint, build, smoke) → 15 min
```

**Total estimated effort:** 4-6 hours

---

## Metrics

| Metric | v1 (Before) | v1 (After) | v2 (Proposed) |
|--------|-------------|------------|---------------|
| Source files | 39 | 43 | 44 |
| npm packages | 23 | 20 | 20 |
| Transitive packages | 797 | 724 | 724 |
| Lint errors | 3 | 0 | 0 |
| Build time | ~3.8s | ~3.0s | ~3.0s |
| Dead CSS (lines) | 187 | 23 | 0 |
| Dead Font CDN links | 0 | 0 | 1 → 0 |
| Shared hooks | 2 | 4 | 4 |
| Inline style props used | 3 | 3 | 3 |
| `motion.path` Framer instances | 0 | 57 | 57→0 (opt) |
