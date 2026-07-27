# Bug Reports — dev-portfolio

---

## Bug 1: Cal Sans font fails to load from Google Fonts

**Status:** Open

**Description:**
The index.html references `https://fonts.googleapis.com/css2?family=Cal+Sans&display=swap` to load Cal Sans, but this font is not available on Google Fonts. The browser downloads a CSS file with no valid @font-face rule, so font-sans silently falls back to system-ui. This causes inconsistent heading rendering across browsers and platforms.

**Steps to Reproduce:**
1. Open the site in Chrome/Firefox/Safari
2. Open DevTools > Network tab and filter by "fonts.googleapis.com"
3. Observe the CSS response from Google Fonts — it contains no @font-face for Cal Sans
4. Inspect any h1/h2 element — the computed font-family will be system-ui, not Cal Sans

**Expected Result:**
Headings should render consistently in Cal Sans across all browsers.

**Actual Result:**
Headings fall back to system-ui, varying by operating system (San Francisco on macOS, Segoe UI on Windows, etc.).

**Configuration:**
All browsers and operating systems. The font URL is hardcoded in index.html and fails identically everywhere.

**Severity:** Medium — visual inconsistency, brand typography not applied.

**Priority:** Medium — affects visual identity across the entire site.

**Assignee:** Unassigned

**Labels:** bug, font-loading, visual, css

---

## Bug 2: Color contrast failures on navigation and footer text

**Status:** Open

**Description:**
Lighthouse audit confirms multiple color contrast failures that fail WCAG AA standards. The header uses `text-cyber-cyan` (#2dd4bf) on `bg-snow/95 backdrop-blur-sm` background, and nav links use `text-muted-foreground` (#666666) on the same background. The footer copyright uses `text-muted-foreground/60` on `bg-warm-gray`. These all fall below the 4.5:1 contrast ratio required for normal text.

**Steps to Reproduce:**
1. Run Lighthouse desktop audit on any page
2. Navigate to the "Accessibility" section in the report
3. Observe the "Background and foreground colors do not have a sufficient contrast ratio" failure
4. Alternatively, use the DevTools color picker to check contrast ratios on header nav links and footer text

**Expected Result:**
All text elements should meet WCAG AA contrast ratio of 4.5:1 for normal text.

**Actual Result:**
Header logo "Rotaru" in cyan, header nav links, and footer copyright text all fail contrast checks.

**Configuration:**
All browsers. The colors are defined in index.css theme and used in Header.jsx and Footer.jsx.

**Severity:** High — accessibility barrier for users with low vision.

**Priority:** High — WCAG compliance requirement.

**Assignee:** Unassigned

**Labels:** bug, accessibility, contrast, a11y

---

## Bug 3: Contact form inputs missing autocomplete attributes

**Status:** Open

**Description:**
The browser console reports "An element doesn't have an autocomplete attribute" for 2 form fields on the contact page (Name, Email). The FormField component in FormField.jsx does not pass autocomplete attributes to the Input component. This prevents browsers from offering autofill suggestions, creating friction for returning users and those using assistive technologies.

**Steps to Reproduce:**
1. Navigate to /contact
2. Open DevTools > Console and enable "Issues" messages
3. Observe: "An element doesn't have an autocomplete attribute" for Name and Email fields
4. Attempt to autofill the form — no suggestions appear for Name or Email

**Expected Result:**
Name field should have `autocomplete="name"` and Email field should have `autocomplete="email"`.

**Actual Result:**
No autocomplete attributes present on any form fields.

**Configuration:**
All browsers. The FormField component in src/components/FormField.jsx controls the input rendering.

**Severity:** Medium — degrades UX and accessibility for form interactions.

**Priority:** Medium — affects all contact form submissions.

**Assignee:** Unassigned

**Labels:** bug, accessibility, forms, autocomplete

---

## Bug 4: Accordion uses pb-[800px] hack to contain expanded content

**Status:** Open

**Description:**
The FeaturedProjects section uses a hardcoded padding-bottom hack that switches between `pb-[800px]` and `pb-96` based on whether an accordion slide is active. This is necessary because the slide content uses `position: absolute` on desktop, so its height doesn't contribute to the container's natural dimensions. The AGENTS.md explicitly states: "Do avoid parent-level padding hacks like pb-[800px] to accommodate child overflow. Fix the child component to report its natural height."

**Steps to Reproduce:**
1. Navigate to the homepage
2. Scroll to the Featured Projects section
3. Click on any accordion slide to expand it
4. Inspect the parent div — it uses pb-[800px] class
5. Resize to mobile — the pb-[800px] is overridden by md:pb-0

**Expected Result:**
The accordion should self-contain its expanded content without relying on hardcoded padding values.

**Actual Result:**
The parent div uses 800px of padding-bottom to prevent expanded content from being clipped.

**Configuration:**
Desktop viewport only (768px+). The issue is in FeaturedProjects.jsx line 21 and ProjectsAccordion.css.

**Severity:** Medium — brittle workaround, not a scalable solution.

**Priority:** Medium — code quality issue violating project conventions.

**Assignee:** Unassigned

**Labels:** bug, code-quality, css, accordion

---

## Bug 5: OG image paths are relative instead of absolute

**Status:** Open

**Description:**
The usePageMeta hook sets og:image to relative paths like `/og-image.png` or `/assets/images/nobzbeats.gif`. Social media platforms (Facebook, Twitter, LinkedIn) require absolute URLs such as `https://eduardrotaru.dev/og-image.png` to properly render link previews. Without absolute URLs, link previews will show broken or missing images when the site URL is shared.

**Steps to Reproduce:**
1. Navigate to any page
2. Inspect the page source and find the `<meta property="og:image">` tag
3. Observe the content is a relative path starting with `/`
4. Use the Facebook Sharing Debugger or Twitter Card Validator to test the URL
5. Observe that the preview image fails to load or displays incorrectly

**Expected Result:**
og:image should be an absolute URL starting with `https://eduardrotaru.dev/...`.

**Actual Result:**
og:image is a relative path like `/og-image.png` or `/assets/images/nobzbeats.gif`.

**Configuration:**
All social media platforms. The hook is at src/hooks/usePageMeta.js line 39.

**Severity:** High — breaks social sharing previews entirely.

**Priority:** High — directly impacts how the site appears when shared.

**Assignee:** Unassigned

**Labels:** bug, seo, metadata, social-sharing

---

## Bug 6: renderParagraphs hardcodes text-snow/80 for all section variants

**Status:** Open

**Description:**
The renderParagraphs helper in lib/helpers.jsx always returns `<p className="... text-snow/80">` (light text) regardless of the section variant. In ProjectDetail pages, "The Why" and "The Soul" sections use `variant="cyan"` (bg-cyber-cyan background) and wrap content in a `text-charcoal/80` container, expecting dark text on the light background. The hardcoded text-snow/80 overrides this, rendering light-on-light text in the cyan sections.

**Steps to Reproduce:**
1. Navigate to any project detail page (e.g., /projects/nobz-beats)
2. Scroll to "The Why" section (cyan background)
3. Inspect the paragraph text — color is text-snow/80 (light text)
4. Compare with the intentional text-charcoal/80 declared on the parent container

**Expected Result:**
Paragraphs in cyan sections should use text-charcoal/80 for proper legibility against the cyan background.

**Actual Result:**
All rendered paragraphs use text-snow/80 regardless of section variant.

**Configuration:**
All project detail pages with cyan variant sections. The helper is in lib/helpers.jsx line 15.

**Severity:** Low — text remains legible but does not match the section's intended color scheme.

**Priority:** Low — visual inconsistency in project detail sections.

**Assignee:** Unassigned

**Labels:** bug, visual, content, project-detail

---

## Bug 7: Twitter/X handle doesn't correspond to any profile link on site

**Status:** Open

**Description:**
The index.html includes `<meta name="twitter:creator" content="@eduardrotaru" />`, but there is no Twitter/X account link in the SOCIAL config (config.js). The site offers links to GitHub, LinkedIn, and email only — no Twitter/X profile exists anywhere on the site. This makes the twitter:creator metadata misleading and disconnected from the actual social presence.

**Steps to Reproduce:**
1. View the page source or inspect the HTML head
2. Find the `<meta name="twitter:creator" content="@eduardrotaru">` tag
3. Scroll to the footer or contact page
4. Observe there is no Twitter/X icon or link anywhere on the site
5. Check config.js — no Twitter entry exists in SOCIAL

**Expected Result:**
Either add a Twitter/X link to the SOCIAL config, or remove the twitter:creator meta tag.

**Actual Result:**
Metadata claims a Twitter presence, but the site offers no way to connect to that profile.

**Configuration:**
All pages, as the tag is in the static index.html.

**Severity:** Medium — inaccurate metadata that may confuse users and crawlers.

**Priority:** Low — does not affect functionality.

**Assignee:** Unassigned

**Labels:** bug, metadata, content-accuracy, social

---

## Bug 8: Project filter tags not sorted alphabetically

**Status:** Open

**Description:**
The project tags in the /projects page filter bar appear in insertion order rather than alphabetical order. The code `const allTags = ['All', ...new Set(allProjects.flatMap((p) => p.tags))]` preserves the order tags appear in the data file. Currently the order is: All, Full-Stack, Creative, Frontend, E-Commerce, API — instead of the expected: All, API, Creative, E-Commerce, Frontend, Full-Stack.

**Steps to Reproduce:**
1. Navigate to /projects
2. Observe the filter tab order at the top of the page
3. Compare to the expected alphabetical order

**Expected Result:**
Filter tags should be sorted alphabetically (after "All") for predictable, scannable navigation.

**Actual Result:**
Tags appear in data insertion order: Full-Stack, Creative, Frontend, E-Commerce, API.

**Configuration:**
All browsers. The tag filtering is in src/pages/Projects/components/ProjectsGrid.jsx line 5.

**Severity:** Low — minor UX inconsistency.

**Priority:** Low — does not affect functionality.

**Assignee:** Unassigned

**Labels:** bug, ux, projects, sorting

---

## Bug 9: Duplicate description meta tags in the DOM

**Status:** Open

**Description:**
The static index.html includes `<meta name="description" content="...">` with a hardcoded value. Simultaneously, the usePageMeta hook dynamically creates another `<meta name="description">` tag on every page. This results in two competing description meta tags in the DOM at the same time. Search engines may ignore both or pick the wrong one.

**Steps to Reproduce:**
1. Open any page
2. Inspect the page source or use DevTools Elements panel
3. Search for `meta[name="description"]`
4. Observe two meta tags with different content values

**Expected Result:**
Only one description meta tag should exist in the DOM at any time.

**Actual Result:**
The static description from index.html and the dynamic description from usePageMeta coexist.

**Configuration:**
All pages. The static tag is in index.html line 8, the dynamic tag is created by usePageMeta.js line 33.

**Severity:** Low — search engines may handle duplicates gracefully, but it's non-standard.

**Priority:** Low — minor SEO housekeeping.

**Assignee:** Unassigned

**Labels:** bug, seo, metadata

---

## Bug 10: CoreValues renders invisible placeholder causing layout churn

**Status:** Open

**Description:**
The CoreValues section on the About page renders an invisible placeholder heading `<span className="invisible">What Drives My Work</span>` while waiting for the hero animation to complete. When `heroDone` becomes true, this placeholder is replaced by a TypedText component that builds the heading character by character. This replacement causes unnecessary DOM recreation and layout reflow. The invisible span still occupies layout space, so the visual effect is also jarring — the heading area goes from invisible to typing.

**Steps to Reproduce:**
1. Navigate to /about
2. Observe the "What Drives My Work" heading area while the hero animation plays
3. Note that the heading area is invisible but takes up space
4. After hero animation completes, the heading starts typing from scratch

**Expected Result:**
The heading should either be visible immediately or the transition should be smoother without full DOM replacement.

**Actual Result:**
An invisible placeholder occupies layout space, then is replaced by a typing animation from scratch.

**Configuration:**
All browsers. The logic is in src/pages/About/components/CoreValues.jsx lines 37-53.

**Severity:** Low — minor UX roughness.

**Priority:** Low — affects only the About page hero transition.

**Assignee:** Unassigned

**Labels:** bug, performance, animation, about

---

## Bug 11: Missing llms.txt file

**Status:** Open

**Description:**
Lighthouse audit flags the missing llms.txt file with a score of 0. The llms.txt standard provides guidance to large language models and AI crawlers about how the site should be indexed and used. This file should exist at the project root or at `/.well-known/llms.txt`. The audit reports: "File is missing a required H1 header" and "File does not appear to contain any links."

**Steps to Reproduce:**
1. Run Lighthouse audit on any page
2. In the Agentic Browsing section, observe the "llms.txt does not follow recommendations" failure
3. Attempt to access /llms.txt — returns 404

**Expected Result:**
A properly formatted llms.txt should exist at the project root with required headers and links.

**Actual Result:**
No llms.txt file exists.

**Configuration:**
All environments. The file would need to be placed in the public/ directory for static hosting.

**Severity:** Low — emerging web standard, not yet critical.

**Priority:** Low — proactive compliance for AI discovery.

**Assignee:** Unassigned

**Labels:** bug, seo, ai-discovery, lighthouse

---

## Bug 12: Model-viewer Lit dev mode warning in production

**Status:** Open

**Description:**
The @google/model-viewer library loads its development-mode bundle, producing console warnings: "Lit is in dev mode. Not recommended for production!" and "Element model-viewer scheduled an update (generally because a property was set) after an update completed." These warnings indicate the library is not optimized for production, adding unnecessary JavaScript overhead and potential performance impact when 3D models are loaded.

**Steps to Reproduce:**
1. Navigate to /about — the CoreValues section loads model-viewer via IntersectionObserver
2. Scroll to the CoreValues section to trigger model loading
3. Open the browser console
4. Observe warnings: "Lit is in dev mode" and "scheduled an update after an update completed"

**Expected Result:**
No console warnings from @google/model-viewer in production.

**Actual Result:**
Console shows Lit dev mode warnings and update scheduling warnings.

**Configuration:**
All browsers. The library is dynamically imported in src/components/ModelLodCard.jsx line 31.

**Severity:** Low — does not affect functionality, but indicates suboptimal production bundle.

**Priority:** Low — optimization issue for 3D model loading.

**Assignee:** Unassigned

**Labels:** bug, performance, 3d-models, console-warning
