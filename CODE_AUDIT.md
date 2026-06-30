# Code Audit & Refactor Plan — dev-portfolio

> **Date:** 2026-06-30  
> **Project:** Eduard Rotaru — Developer Portfolio  
> **Stack:** React 19, Vite 7, Tailwind CSS v4, Framer Motion 12, shadcn/ui, React Router v7

---

## Table of Contents

1. [Dead/Unused Code — Remove](#1-deadunused-code--remove)
2. [Bugs & Typos](#2-bugs--typos)
3. [Duplicate CSS](#3-duplicate-css)
4. [Performance Optimizations](#4-performance-optimizations)
5. [Code Simplification & Refactoring](#5-code-simplification--refactoring)
6. [Dependency Cleanup](#6-dependency-cleanup)
7. [Project Config Cleanup](#7-project-config-cleanup)
8. [Recommended Implementation Order](#8-recommended-implementation-order)

---

## 1. Dead/Unused Code — Remove

### 1.1 `src/components/GlitchText.jsx` — Unused Component

This component (`GlitchText`) provides a CSS pseudo-element glitch effect. It is **never imported anywhere** in the codebase. The glitch effect is handled by:

- The CSS classes `glitch-wrapper` / `glitch-1` / `glitch-2` defined in `index.css`
- The `TypedText` component with `variant="glitch"`

**Action:** Delete `src/components/GlitchText.jsx`.

### 1.2 `src/components/model-viewer.css` — Dead CSS (164 lines)

This CSS file is **never imported** in any JSX/JS file. It contains:

- Model viewer styling (keyframes, hotspots, loading states, hover effects)
- Partially duplicated from `src/index.css:163-169` (the `--progress-bar-*` and `[environment-image]` rules)

The hotspot styling (~120 lines) is never used by any component. The subtle-glow keyframe is duplicated in `index.css:171-174`.

**Action:** Delete `src/components/model-viewer.css`.

> **Note:** If hotspot/interaction styling is planned for future use, keep the file and import it in `ModelLodCard.jsx`.

### 1.3 `public/assets/images/accordionArrow.svg` — Unused Asset

Zero references in any source file.

**Action:** Delete `public/assets/images/accordionArrow.svg`.

### 1.4 `src/pages/Projects/components/ProjectsGrid.jsx:1` — Unused Import

```jsx
import { useState, useRef } from 'react'
//          ^^^^^^  never used
```

**Action:** Change to `import { useState } from 'react'`.

### 1.5 `src/data/config.js:18` — Stray Comment

```js
{ label: 'Contact', to: '/contact' }, //test comment
```

**Action:** Remove `//test comment`.

---

## 2. Bugs & Typos

### 2.1 `src/components/ModelLodCard.jsx:126` — Typo in Tailwind Class

```jsx
className={`... ${loadState === 'done' ? 'opacitiy-100' : 'opacity-0'}`}
```

`opacitiy-100` is not a valid Tailwind class. This means the `model-viewer` element **never reaches full opacity** after loading (it stays at `opacity-0`).

**Action:** Fix typo — `opacitiy-100` → `opacity-100`.

### 2.2 `public/sitemap.xml` — Broken Image URLs

The sitemap references `.png` screenshot paths:

```xml
<image:loc>https://eduardrotaru.dev/assets/images/nobzbeats.png</image:loc>
<image:loc>https://eduardrotaru.dev/assets/images/mdmurals.png</image:loc>
<image:loc>https://eduardrotaru.dev/assets/images/skateshop.png</image:loc>
```

The actual files on disk are:

- `nobzbeats.gif`
- `mdmurals.gif`
- `skateshop.gif`

No `.png` versions exist for these. The `api` project uses `.jpg`/`.gif`.

**Action:** Either:
- Generate `.png` versions of the screenshots and add them, **or**
- Update sitemap URLs to point to existing `.gif` files
- Additionally add the `api` project's image

---

## 3. Duplicate CSS

### 3.1 model-viewer styles split across two files

| Rule | `index.css:163-169` | `model-viewer.css` |
|------|---------------------|---------------------|
| `--progress-bar-height: 2px` | ✓ | ✓ |
| `--progress-bar-color: var(--color-cyber-cyan)` | ✓ | ✓ |
| `model-viewer[environment-image='legacy']` | ✓ | ✓ |
| `@keyframes subtle-glow` | ✓ | ✓ (different implementation) |
| Hotspot styling | ✗ | ✓ (120 lines, never loaded) |
| Gradient backgrounds | ✗ | ✓ |

The `@keyframes subtle-glow` in `index.css:171-174` works on `filter: brightness()`, while `model-viewer.css:146-153` defines the same animation name on different selectors. If both ever loaded together, the CSS cascade would use whichever comes last.

**Action:** After deleting `model-viewer.css` (see 1.2), no action needed. If keeping it, deduplicate the shared rules.

---

## 4. Performance Optimizations

### 4.1 Multiple resize listeners — `SectionWrapper.jsx` + `HexPattern.jsx`

**Problem:** Both `SectionWrapper.jsx:21-25` and `HexPattern.jsx:81-85` independently create `resize` event listeners and `useState` for window width.

- `SectionWrapper` checks `windowWidth < 1000` to toggle pentagon clip
- `HexPattern` checks `window.innerWidth < 768` to hide on mobile

If there are 4-5 `SectionWrapper` instances on a page, that's 4-5 duplicate resize listeners.

**Action:** Create a shared `useWindowWidth()` hook in `src/hooks/useWindowWidth.js`:

```jsx
import { useState, useEffect } from 'react'

export function useWindowWidth() {
  const [width, setWidth] = useState(() => window.innerWidth)

  useEffect(() => {
    let rafId
    const handleResize = () => {
      cancelAnimationFrame(rafId)
      rafId = requestAnimationFrame(() => setWidth(window.innerWidth))
    }
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
      cancelAnimationFrame(rafId)
    }
  }, [])

  return width
}
```

Then use it in both `SectionWrapper` and `HexPattern` instead of local logic.

**Savings:** Reduces N resize listeners to 1 (with RAF throttling).

### 4.2 Scroll listener in `Header.jsx:12-16` missing `passive`

```jsx
window.addEventListener('scroll', handleScroll)
// Should be:
window.addEventListener('scroll', handleScroll, { passive: true })
```

The `passive` flag tells the browser the handler won't call `preventDefault()`, enabling scroll optimizations (especially on mobile).

**Action:** Add `{ passive: true }` option.

### 4.3 Three separate `useEffect` hooks in `ModelLodCard.jsx`

The component has three effects that could be consolidated:

1. IntersectionObserver for in-view detection (lines 12-26)
2. Dynamic import of model-viewer library (lines 28-35)
3. Model load event listeners (lines 37-50)
4. Interaction pause/resume for auto-rotate (lines 52-68)

Effects 2, 3, and 4 are all dependent on `inView`/`libReady` and could be merged to reduce overhead. However, the current separation is reasonably clean — this is a minor optimization.

**Action:** Optional — merge effects 3+4 since both attach event listeners to the same `viewerRef` element.

### 4.4 Eager DOM nodes in `PortraitRing` (`HeroSection.jsx:40-58`)

The rotating text ring renders **140 `span` elements** eagerly on all screen sizes, including mobile where `PortraitRing` is visible (the component uses responsive scaling via `scale-[0.85] md:scale-100`).

**Action:** Consider wrapping the ring in a conditional or reducing character count on mobile. Minor improvement.

---

## 5. Code Simplification & Refactoring

### 5.1 Extract shared `useFocusTrap` hook

The focus trap logic is **duplicated** in two components:

| File | Lines | Purpose |
|------|-------|---------|
| `src/components/Header.jsx` | 19-49 | Mobile menu focus trap |
| `src/pages/ProjectDetail/index.jsx` | 63-90 | Screenshot modal focus trap |

Both implement: query focusable children, trap Tab/Shift+Tab, close on Escape, restore focus on close.

**Action:** Extract to `src/hooks/useFocusTrap.js`:

```jsx
import { useEffect } from 'react'

export function useFocusTrap(containerRef, isActive, onClose, returnFocusRef) {
  useEffect(() => {
    if (!isActive || !containerRef.current) return

    const container = containerRef.current
    const focusableEls = container.querySelectorAll(
      'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
    )
    const first = focusableEls[0]
    const last = focusableEls[focusableEls.length - 1]

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose?.()
        returnFocusRef?.current?.focus()
        return
      }
      if (e.key === 'Tab') {
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last?.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first?.focus()
        }
      }
    }

    first?.focus()
    container.addEventListener('keydown', handleKeyDown)
    return () => container.removeEventListener('keydown', handleKeyDown)
  }, [containerRef, isActive, onClose, returnFocusRef])
}
```

### 5.2 Extract `FormField` component in ContactForm

`ContactForm.jsx:110-198` repeats the same pattern 4 times (name, email, subject, message):

```jsx
<div className="flex flex-col gap-2">
  <Label>...</Label>
  <Input ... />
  {errors.field && <span role="alert">...</span>}
</div>
```

**Action:** Create a lightweight `FormField` component to reduce duplication by ~50%.

### 5.3 Extract `ProjectNav` in ProjectDetail

`ProjectDetail/index.jsx:289-441` has ~150 lines of bottom navigation with separate mobile and desktop markup for prev/next/action buttons. The structure is:

- Mobile: action buttons row + prev/next row
- Desktop: prev (left) + centered actions + next (right)

**Action:** Extract to `src/pages/ProjectDetail/components/ProjectNav.jsx`.

### 5.4 Deduplicate `iconMap` in Footer + ContactInfo

Both `Footer.jsx:5-9` and `ContactInfo.jsx:5-9` define the same mapping:

```jsx
const iconMap = {
  GitHub: Github,
  LinkedIn: Linkedin,
  Email: Mail,
}
```

**Action:** Move to `src/data/config.js` or `src/lib/utils.js`.

### 5.5 Remove unnecessary SSR guard in SectionWrapper

```jsx
const [windowWidth, setWindowWidth] = useState(
  typeof window !== 'undefined' ? window.innerWidth : 1200
)
```

This is a Vite SPA — there is no SSR. The guard is unnecessary.

**Action:** Simplify to:

```jsx
const [windowWidth, setWindowWidth] = useState(window.innerWidth)
```

### 5.6 Simplify `HeroSection.jsx` — extract `PortraitRing`

`PortraitRing` is a 40-line inner function component defined inside `HeroSection.jsx`. It's large enough to justify its own file.

**Action:** Extract to `src/pages/Home/components/PortraitRing.jsx`.

### 5.7 Extract `renderParagraphs` helper

`ProjectDetail/index.jsx:13-23` defines a module-level helper for rendering paragraph arrays. This is fine but could live in a shared utilities file.

**Action:** Move to `src/lib/helpers.js`.

---

## 6. Dependency Cleanup

### 6.1 Remove `@types/react` + `@types/react-dom`

| Package | Size (approx) | Reason |
|---------|---------------|--------|
| `@types/react` | ~3 MB | No TypeScript in project |
| `@types/react-dom` | ~0.5 MB | No TypeScript in project |

Per AGENTS.md: "No TypeScript — no `.ts`/`.tsx` files."

**Action:** Remove both from `devDependencies`.

### 6.2 Replace `radix-ui` meta-package with targeted packages

`radix-ui` is a meta-package that re-exports **all 40+ Radix UI packages**. The project only uses:

- `radix-ui` → `Slot` (in `badge.jsx` and `button.jsx`)
- `radix-ui` → `Label` (in `label.jsx`)

**Estimated savings:** The meta-package brings in transitive dependencies for Accordion, Dialog, DropdownMenu, Popover, Select, etc. — none of which are used. Replacing with `@radix-ui/react-slot` and `@radix-ui/react-label` could save ~1-2 MB in `node_modules` and reduce lockfile size.

**Action:**

```bash
npm uninstall radix-ui
npm install @radix-ui/react-slot @radix-ui/react-label
```

Then update imports:

```jsx
// Before:
import { Slot } from "radix-ui"
import { Label as LabelPrimitive } from "radix-ui"

// After:
import { Root as Slot } from "@radix-ui/react-slot"
import { Root as LabelPrimitive } from "@radix-ui/react-label"
```

### 6.3 Evaluate `tw-animate-css`

Tailwind CSS v4 ships built-in `animate-spin`, `animate-pulse`, etc. The `tw-animate-css` package provides additional keyframe animations. Check if `animate-subtle-glow` in `index.css:28` is provided by `tw-animate-css` or defined manually.

`index.css:171-174` manually defines `@keyframes subtle-glow`, which suggests `tw-animate-css` may not be needed for this project. However, it also provides general "animate" utilities that shadcn components might rely on.

**Action:** Keep for now — verify by removing and running `npm run build` to check for missing animations.

---

## 7. Project Config Cleanup

### 7.1 `.DS_Store` files in git

Four `.DS_Store` files are present in the working tree (not in `.gitignore`):

```
.DS_Store
src/.DS_Store
src/pages/.DS_Store
```

**Action:** Add `*.DS_Store` to `.gitignore` and run `git rm --cached` on existing ones.

### 7.2 `jsconfig.json:4` — legacy compatibility flag

```json
{
  "compilerOptions": {
    "ignoreDeprecations": "6.0"
  }
}
```

This flag was needed for TypeScript 5.0 compatibility with older config generators. It has no effect in a plain JS project with modern tooling.

**Action:** Remove the `ignoreDeprecations` line.

### 7.3 `.gitignore` review

Check if the following are covered:

- `node_modules/` — should be there
- `dist/` — should be there
- `.env` / `.env.local` — should be there
- `.DS_Store` — **missing**
- `*.heapsnapshot` — **missing** (Chrome DevTools heap snapshots)
- `trace.json` / `trace.json.gz` — **missing** (performance traces)

---

## 8. Recommended Implementation Order

```
Phase 1 — Bugs & Blockers
  └─ Fix opacitiy-100 typo in ModelLodCard.jsx
  └─ Fix sitemap.xml image URLs

Phase 2 — Dead Code Removal
  └─ Delete GlitchText.jsx
  └─ Delete model-viewer.css
  └─ Delete accordionArrow.svg
  └─ Remove unused useRef import in ProjectsGrid.jsx
  └─ Remove stray comment in config.js

Phase 3 — Dependencies
  └─ Remove @types/react + @types/react-dom
  └─ Replace radix-ui with @radix-ui/react-slot + @radix-ui/react-label
  └─ npm install + verify build

Phase 4 — Performance
  └─ Create useWindowWidth hook (with RAF)
  └─ Refactor SectionWrapper + HexPattern to use it
  └─ Add passive: true to scroll listener in Header

Phase 5 — Refactoring
  └─ Create useFocusTrap hook, refactor Header + ProjectDetail
  └─ Create FormField component, refactor ContactForm
  └─ Extract ProjectNav from ProjectDetail
  └─ Deduplicate iconMap
  └─ Extract PortraitRing, renderParagraphs helper

Phase 6 — Config Cleanup
  └─ Update .gitignore for .DS_Store, *.heapsnapshot, trace.json
  └─ Remove tracked .DS_Store files
  └─ Fix jsconfig.json

Phase 7 — Verification
  └─ npm run lint
  └─ npm run build
  └─ Manual smoke test of all 5 routes + mobile menu + accordion + contact form
```

---

## Summary Statistics

| Category | Count |
|----------|-------|
| Dead files to delete | 3 (1 component, 1 CSS, 1 asset) |
| Bugs to fix | 2 |
| Performance improvements | 4 |
| Refactoring opportunities | 7 |
| Dependencies to remove/replace | 3 packages |
| Config items to fix | 3 |
| Estimated lines of code removed | ~250 |
| Estimated lines of new code added | ~150 |
