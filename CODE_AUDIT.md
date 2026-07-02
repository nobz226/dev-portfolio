# Code Audit & Refactor Plan — dev-portfolio

> **Date:** 2026-07-01  
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
8. [Post-Audit Findings (v2)](#8-post-audit-findings-v2)
9. [Recommended Implementation Order](#9-recommended-implementation-order)

---

## 1. Dead/Unused Code — Remove

### 1.1 `src/components/GlitchText.jsx` — Unused Component

This component (`GlitchText`) provides a CSS pseudo-element glitch effect. It is **never imported anywhere** in the codebase. The glitch effect is handled by:

- The CSS classes `glitch-wrapper` / `glitch-1` / `glitch-2` defined in `index.css`
- The `TypedText` component with `variant="glitch"`

**Action:** Delete `src/components/GlitchText.jsx`. ✓ **Done**

### 1.2 `src/components/model-viewer.css` — Dead CSS (164 lines)

This CSS file is **never imported** in any JSX/JS file. It contains:

- Model viewer styling (keyframes, hotspots, loading states, hover effects)
- Partially duplicated from `src/index.css:163-169` (the `--progress-bar-*` and `[environment-image]` rules)

The hotspot styling (~120 lines) is never used by any component. The subtle-glow keyframe is duplicated in `index.css:171-174`.

**Action:** Delete `src/components/model-viewer.css`. ✓ **Done**

### 1.3 `public/assets/images/accordionArrow.svg` — Unused Asset

Zero references in any source file.

**Action:** Delete `public/assets/images/accordionArrow.svg`. ✓ **Done**

### 1.4 `src/pages/Projects/components/ProjectsGrid.jsx:1` — Unused Import

```jsx
import { useState, useRef } from 'react'
//          ^^^^^^  never used
```

**Action:** Change to `import { useState } from 'react'`. ✓ **Done** (both imports now used)

### 1.5 `src/data/config.js:18` — Stray Comment

```js
{ label: 'Contact', to: '/contact' }, //test comment
```

**Action:** Remove `//test comment`. ✓ **Done**

### 1.6 `index.html` — Dead Google Fonts Link for Cal Sans

Line 21 loads `Cal+Sans` from Google Fonts, but **Cal Sans is not available on Google Fonts**. This URL fails silently. The `--font-sans` theme token relies on a system fallback.

**Action:** Remove the dead `<link>` for Cal Sans. Self-host the font or use a CDN that actually serves it (e.g. jsDelivr, cdnjs).

### 1.7 `index.css` — `.glitch-wrapper` CSS Classes (lines 113-135)

The glitch CSS (`.glitch-wrapper`, `@keyframes glitch-1/2`) is **never applied to any element**. The `TypedText` component with `variant="glitch"` uses imperative DOM manipulation (createElement + setInterval), not these CSS classes.

These 23 lines of CSS are dead. The `@keyframes` themselves are only referenced by the `.glitch-wrapper::before/after` selectors (also dead).

**Action:** Consider removing; minor — no functional impact.

---

## 2. Bugs & Typos

### 2.1 `src/components/ModelLodCard.jsx:126` — Typo in Tailwind Class ✓ Done

Original: `opacitiy-100` — invalid class. Fixed to `opacity-100`.

### 2.2 `public/sitemap.xml` — Broken Image URLs ✓ Done

Updated `.png` references to `.gif`.

### 2.3 `src/pages/Contact/components/ContactInfo.jsx:64-74` — Invisible "Closed" Labels

The "Closed" availability indicators use `text-white/20` and `bg-white/20`, but the parent card has a `bg-warm-gray` (#eeece9) background. White at 20% opacity on a light warm-gray surface results in **near-invisible text**.

```jsx
// Current — nearly invisible on warm-gray:
className={`text-white/20 ...`}
className={`bg-white/20 ...`}
// Should be:
className={`text-black/20 ...`}
className={`bg-black/20 ...`}
```

**Action:** Change `text-white/20` → `text-black/20` and `bg-white/20` → `bg-black/20`.

### 2.4 `index.html` — Cal Sans Font Loading (Dead Link)

See 1.6. The font family `--font-sans: "Cal Sans", system-ui, sans-serif` in `@theme inline` will always fall back to `system-ui` because Cal Sans is never successfully loaded. This means the actual rendered font on user systems may differ from the intended design.

**Action:** Either self-host Cal Sans in `public/assets/fonts/` (add `@font-face` entry) or remove the dead `<link>` and use a CDN that serves it.

### 2.5 `src/pages/Home/components/HeroSection.jsx:73-83` — Chaotic Scramble Overlap

The tagline uses **5 separate `<TypedText>` components** with `variant="scramble"`:

```jsx
<TypedText as="span" text="Transforming complex ideas into..." variant="scramble" />
{' '}
<TypedText as="span" text="technical honesty" ... variant="scramble" />
{' '}
<TypedText as="span" text="and" variant="scramble" />
{' '}
<TypedText as="span" text="artistic intent" ... variant="scramble" />
<TypedText as="span" text="." variant="scramble" />
```

Each independently starts its scramble animation when it enters view, creating **visual noise and chaotic overlap** — words scramble simultaneously rather than sequentially. Additionally, a single-character `.` component is wasteful.

**Action:** Merge into 1-2 `<TypedText>` components. Wrap styled words in `<span>` elements with manual styling rather than separate components.

---

## 3. Duplicate CSS

### 3.1 model-viewer styles split across two files ✓ Done

After deleting `model-viewer.css`, no action needed.

### 3.2 `index.css` — Glitch CSS vs TypedText Component (See 1.7)

The CSS-based glitch effect (`.glitch-wrapper`, `@keyframes glitch-1/2`) and the JavaScript-based glitch effect in `TypedText.jsx` are two implementations of the same concept. One is dead code.

**Action:** See 1.7.

---

## 4. Performance Optimizations

### 4.1 Multiple resize listeners — `SectionWrapper.jsx` + `HexPattern.jsx` ✓ Done

Replaced with shared `useWindowWidth()` hook.

### 4.2 Scroll listener in `Header.jsx:12-16` missing `passive` ✓ Done

Added `{ passive: true }`.

### 4.3 Three separate `useEffect` hooks in `ModelLodCard.jsx`

The component has 4 effects:
1. IntersectionObserver for in-view detection (lines 12-26)
2. Dynamic import of model-viewer library (lines 28-35)
3. Model load event listeners (lines 37-50)
4. Interaction pause/resume for auto-rotate (lines 52-68)

Effects 3 and 4 are both dependent on `libReady` and attach listeners to the `viewerRef` element. These can be merged.

**Action:** Merge effects 3 and 4 into a single effect.

### 4.4 Eager DOM nodes in `PortraitRing` (`HeroSection.jsx:40-58`) ✓ Done

Extracted to own component.

### 4.5 `HexPattern.jsx` — 57 Individual `motion.path` Elements

Each of the 57 active hexagons is a `<motion.path>` with per-element Framer Motion animation (opacity, scale). This creates 57 individual animation instances on mount.

**Alternative:** Use CSS animations (`@keyframes`) on a shared class instead of individual Framer Motion animations. The staggered delays can be achieved with `animation-delay` inline styles or CSS custom properties.

**Savings:** Reduces 57 Framer Motion animation instances to 1 CSS keyframe + 57 inline `animation-delay` values.

**Action:** Optional — convert to CSS-driven animation for reduced JS animation overhead.

### 4.6 `PortraitRing.jsx` — 140 `<span>` Elements in Continuous Rotation

The ring component renders 140 `<span>` elements inside a `<motion.div>` with `animate={{ rotate: 360 }}` (continuous 20-second rotation). All 140 elements are rendered on all screen sizes. On mobile, the ring is scaled to 85% but still fully rendered.

**Action:** Wrap in a conditional to skip rendering on small viewports if acceptable. Minor improvement.

### 4.7 `SectionLabel.jsx:14-18` — `useState` + `useCallback` for Hover Replay

The `hoverKey` counter forces `TypedText` to re-render and restart the scramble animation on hover. This creates a new render cycle and triggers the `useLayoutEffect` cleanup/re-init cycle just to replay an animation.

**Action:** Replace with a CSS-based approach — use `animation: none;` on hover removal or toggle a CSS class that restarts the animation via `animation-play-state`. Simpler and avoids React re-render.

---

## 5. Code Simplification & Refactoring

### 5.1 Extract shared `useFocusTrap` hook ✓ Done

### 5.2 Extract `FormField` component in ContactForm ✓ Done

### 5.3 Extract `ProjectNav` in ProjectDetail ✓ Done

### 5.4 Deduplicate `iconMap` in Footer + ContactInfo ✓ Done

### 5.5 Remove unnecessary SSR guard in SectionWrapper ✓ Done

### 5.6 Simplify `HeroSection.jsx` — extract `PortraitRing` ✓ Done

### 5.7 Extract `renderParagraphs` helper ✓ Done

### 5.8 `TypedText.jsx` — Reduce Imperative DOM Complexity

`TypedText.jsx` (263 lines) is the most complex component in the project. It uses:
- `useLayoutEffect` with manual DOM creation (`createElement`, `appendChild`, `classList.add`)
- `setInterval` for glitch effects
- `setTimeout` chains for typewriter effect
- Manual cleanup of all timers and observers

The same results could be achieved with Framer Motion variants and state-driven rendering, reducing complexity by ~60%.

However, this is a **high-risk refactor** — the visual effect must be pixel-identical. The current implementation works correctly. If refactoring, do it in isolation with visual regression testing.

**Action:** Low priority. Consider a rewrite using Framer Motion `useAnimate` or CSS-driven keyframes.

### 5.9 `ProjectsAccordion.jsx` — Layout Overflow Fix

`FeaturedProjects.jsx:19` uses a hack to accommodate accordion content:
```jsx
<div className={`${isCardActive ? 'pb-[800px]' : 'pb-96'} md:pb-0`}>
```

The accordion overflows its parent container on mobile when active, requiring 800px of phantom padding. This should be fixed at the accordion level so it self-contains.

**Action:** Investigate why the accordion overflows on mobile (likely the `.slide-content` transitioning from `position: absolute` to `position: relative` at 768px) and fix the CSS to avoid external padding hacks.

### 5.10 `SectionLabel.jsx:27` — Inline `style` Prop

```jsx
style={bannerBgColor ? { backgroundColor: bannerBgColor } : undefined}
```

The project rules say "No inline CSS — don't use the style prop." This is a legitimate dynamic color case, but it could use `cn()` with a dynamic class or CSS variable instead.

**Action:** Consider using `style={{ '--banner-bg': bannerBgColor }}` at the parent level with a CSS variable and `background: var(--banner-bg)` in the classes. Or simply add an exemption comment.

### 5.11 `HeroSection.jsx:101` — Redundant `bg-transparent`

```jsx
<Button
  variant="outline"
  className="... bg-transparent ..."
>
```

The `outline` variant already applies transparent background styling. `bg-transparent` is redundant.

**Action:** Remove `bg-transparent`.

### 5.12 `eslint.config.js` — Duplicate `ecmaVersion`

```js
languageOptions: {
  ecmaVersion: 2020,       // This one wins — sets parser target
  globals: globals.browser,
  parserOptions: {
    ecmaVersion: 'latest',  // This is ignored — parserOptions is nested inside
  },
},
```

The `ecmaVersion: 'latest'` in `parserOptions` is overridden by `ecmaVersion: 2020` in the parent. These should be a single, correct value.

**Action:** Remove `parserOptions.ecmaVersion: 'latest'` and keep `ecmaVersion: 'latest'` at the `languageOptions` level, or vice versa.

### 5.13 Missing `.env.example`

The app requires `VITE_FORMSPREE_ENDPOINT` to function, but there's no `.env.example` documenting this.

**Action:** Create `.env.example` with:
```
# Required: Formspree endpoint for the contact form
VITE_FORMSPREE_ENDPOINT=
```

### 5.14 `renderParagraphs` — Dual-format Handling

`src/lib/helpers.jsx:9-12` handles both `Array` and string input. In practice, it's always called with an array (from `projects.js`). The string-splitting logic is never exercised.

**Action:** Narrow the function to accept only arrays, or keep as-is for forward-compatibility. Minor.

### 5.15 `CareerInternship.jsx:52` — `hover:scale-[1.15]` on `<li>` Element

The hover scale transform is applied to a `<li>` element containing both an `<img>` and text span. Scaling list items can cause visual overflow or clipping.

**Action:** Apply the hover scale to the inner content wrapper instead of the `<li>` itself.

### 5.16 `DifferentiationSection.jsx` — Missing `aria-hidden` on Decorative Bullets

The `<span className="w-1.5 h-1.5 bg-cyber-cyan" />` decorative dots are semantic elements read by screen readers.

**Action:** Add `aria-hidden="true"`.

---

## 6. Dependency Cleanup

### 6.1 Remove `@types/react` + `@types/react-dom` ✓ Done

### 6.2 Replace `radix-ui` meta-package with targeted packages ✓ Done

### 6.3 Evaluate `tw-animate-css` ✓ Kept (used by shadcn components)

---

## 7. Project Config Cleanup

### 7.1 `.DS_Store` files in git

`.DS_Store` is already in `.gitignore`. ✓ **Done**

### 7.2 `jsconfig.json:4` — legacy compatibility flag ✓ Done

### 7.3 `.gitignore` review ✓ Done (all covered)

### 7.4 `vercel.json` — Confirm SPA Rewrites Exist

The project needs `vercel.json` for SPA routing but it wasn't found in the source tree. If deploying to Vercel without it, direct URL access to `/projects/nobz-beats` will 404.

**Action:** Verify `vercel.json` exists in the project root or deployment config.

---

## 8. Post-Audit Findings (v2)

*The following findings are new since the initial code audit. They reflect post-audit animation additions (TypedText, HexPattern, Header animations) and deeper analysis of existing code.*

### 8.1 Summary

| Category | Count | Priority |
|----------|-------|----------|
| Dead/broken links | 2 | High |
| Visual bugs (invisible text) | 1 | High |
| Animation overlap/chaos | 1 | Medium |
| Layout hacks | 1 | Medium |
| Overengineered animation logic | 2 | Medium |
| CSS dead code | 1 | Low |
| Performance (JS animation overhead) | 2 | Low |
| Accessibility | 2 | Low |
| Config quality | 2 | Low |

### 8.2 Dead/Broken Assets (High)

| Item | File | Issue | Action |
|------|------|-------|--------|
| Cal Sans Google Fonts link | `index.html:21` | Cal Sans not on Google Fonts — dead URL | Remove link; self-host or use proper CDN |
| Cal Sans never actually loaded | `index.css:26` | `--font-sans` always falls back to system-ui | Add `@font-face` for Cal Sans |

### 8.3 Bugs (High)

| Item | File | Issue | Action |
|------|------|-------|--------|
| Invisible "Closed" labels | `ContactInfo.jsx:67-71` | `text-white/20` on warm-gray | Change to `text-black/20` |
| Chaotic scramble overlap | `HeroSection.jsx:73-83` | 5 independent scramble TypedTexts | Merge into fewer components |

### 8.4 Layout & Overengineering (Medium)

| Item | File | Issue | Action |
|------|------|-------|--------|
| Accordion padding hack | `FeaturedProjects.jsx:19` | `pb-[800px]` to accommodate overflow | Fix accordion self-containment |
| Hover animation re-trigger | `SectionLabel.jsx:14-18` | `useState` counter for replay | Use CSS animation restart |
| 4 useEffect hooks | `ModelLodCard.jsx` | Effects 3+4 can merge | Merge load + interaction listener effects |

### 8.5 Accessibility (Low)

| Item | File | Issue | Action |
|------|------|-------|--------|
| Decorative bullets | `DifferentiationSection.jsx:64` | Missing `aria-hidden="true"` | Add attribute |
| Hover scale on `<li>` | `CareerInternship.jsx:52` | Scale transform on semantic list item | Move to inner wrapper |

### 8.6 Code Quality (Low)

| Item | File | Issue | Action |
|------|------|-------|--------|
| Duplicate ecmaVersion | `eslint.config.js:19,22` | Both `2020` and `'latest'` set | Normalize to one value |
| Missing `.env.example` | root | No env var documentation | Create `.env.example` |
| Redundant `bg-transparent` | `HeroSection.jsx:101` | Button variant already transparent | Remove redundant class |

---

## 9. Recommended Implementation Order

```
Phase 1 — Bugs & Blockers (v1 + v2)
  ├─ Fix opacitiy-100 typo in ModelLodCard ................... ✓ Done
  ├─ Fix sitemap.xml image URLs ............................. ✓ Done
  └─ Fix ContactInfo invisible "Closed" labels ............. NEW
  └─ Remove dead Cal Sans Google Fonts link ................ NEW

Phase 2 — Dead Code Removal (v1 + v2)
  ├─ Delete GlitchText.jsx ................................. ✓ Done
  ├─ Delete model-viewer.css ............................... ✓ Done
  ├─ Delete accordionArrow.svg ............................. ✓ Done
  └─ Remove dead glitch-wrapper CSS from index.css ......... NEW

Phase 3 — Dependencies (v1)
  ├─ Remove @types/react + @types/react-dom ................ ✓ Done
  └─ Replace radix-ui with @radix-ui/react-slot + @radix-ui/react-label ✓ Done

Phase 4 — Performance (v1 + v2)
  ├─ Create useWindowWidth hook ............................ ✓ Done
  ├─ Refactor SectionWrapper + HexPattern to use it ........ ✓ Done
  ├─ Add passive: true to scroll listener in Header ........ ✓ Done
  ├─ Merge ModelLodCard effects 3+4 ....................... PENDING (v1)
  ├─ Optional: Convert HexPattern to CSS animations ........ NEW
  └─ Optional: Conditional PortraitRing on mobile .......... NEW

Phase 5 — Refactoring (v1 + v2)
  ├─ Create useFocusTrap hook .............................. ✓ Done
  ├─ Create FormField component ............................ ✓ Done
  ├─ Extract ProjectNav .................................... ✓ Done
  ├─ Deduplicate iconMap ................................... ✓ Done
  ├─ Extract PortraitRing .................................. ✓ Done
  ├─ Extract renderParagraphs .............................. ✓ Done
  ├─ Fix HeroSection tagline scramble overlap .............. NEW (Design-preserving)
  ├─ Fix accordion padding hack in FeaturedProjects ........ NEW
  ├─ Fix SectionLabel hoverKey with CSS .................... NEW
  ├─ Add aria-hidden to decorative bullets ................. NEW
  └─ Fix CareerInternship hover scale placement ............ NEW

Phase 6 — Config Cleanup (v1 + v2)
  ├─ Update .gitignore .................................... ✓ Done
  ├─ Remove tracked .DS_Store .............................. ✓ Done
  ├─ Fix jsconfig.json .................................... ✓ Done
  ├─ Fix duplicate ecmaVersion in eslint.config.js ......... NEW
  ├─ Create .env.example ................................... NEW
  ├─ Remove redundant bg-transparent class ................. NEW
  └─ Verify/restore vercel.json ............................ NEW

Phase 7 — Verification
  ├─ npm run lint
  ├─ npm run build
  ├─ Manual smoke test: all 5 routes + mobile menu + accordion + contact form
  └─ Visual check: About page 3D models, tagline animation, "Closed" labels
```

---

## Summary Statistics

| Category | Count | Status |
|----------|-------|--------|
| Dead files deleted | 3 | ✓ Done |
| Dead code removed | 3 instances | ✓ Done |
| Bugs fixed (v1) | 2 | ✓ Done |
| Bugs found (v2, new) | 4 | Pending |
| Performance improvements (v1) | 3 | ✓ Done |
| Performance improvements (v2, new) | 3 | Pending |
| Components/hooks extracted (v1) | 6 | ✓ Done |
| Refactoring opportunities (v2, new) | 6 | Pending |
| Dependencies removed/replaced | 3 packages | ✓ Done |
| Config items to fix | 4 | Pending |
| Accessibility items | 2 | Pending |
| **Estimated lines of code removed (v2)** | **~50** | |
| **Estimated lines of new code added (v2)** | **~30** | |
