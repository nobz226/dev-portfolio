# Improvement Log 1 - Project Card Redesign & Subpage Navigation

## Description

This improvement touches two main parts of the portfolio:

1. **Project List Redesign (Projects Page):** I took the old grid of project cards and turned it into a scrollable vertical list with a terminal look. Each row has a TerminalBar header with the project slug, a GIF screenshot on the left, and the project info on the right (category, title, description capped at 3 lines, tech badges, and the Live/Code/Details buttons). The list sits inside the existing SectionWrapper with the charcoal pentagon background and scrolls within a max-height container. I later made the container wider to match the page hero width.

2. **Subpage Navigation (Project Detail Page):** I added Previous and Next buttons on both sides of the project title in the hero section, with matching buttons at the bottom of the page. These use index mapping against the project array to jump between consecutive projects, so users don't have to use the browser back button anymore. The bottom section brings everything together: the action buttons (Live Demo, View Code, Back) are centered, with the Previous and Next buttons on the sides. All the icons use the same arrow asset at the same size for consistency.

## Priority & Rationale

**Priority: High**

A portfolio site is basically a live code test during recruiting. Two things made this fix critical:

- **Visual inconsistency:** The old card grid had uneven alignment when descriptions were different lengths. That kind of thing stands out to engineering managers reviewing the site.
- **Navigation dead-ends:** On project detail pages, there was no way to move to the next project without going back to the projects page first. That friction hurts engagement during a review.

Fixing both issues gives a much smoother browsing experience that feels more professional.

## Total Time Spent

**8 hours 15 minutes** (initial quote: 8 hours)

## Time Breakdown

| Activity | Time |
|---|---|
| Requirements review and architecture analysis | 0.5h |
| Scrollable list layout refactoring (ProjectsGrid.jsx) | 1.5h |
| ProjectCard redesign to list-item layout (ProjectCard.jsx) | 2.0h |
| Responsive styling, mobile stacking, image sizing, line clamping | 1.0h |
| Subpage navigation implementation (ProjectDetail prev/next) | 1.0h |
| Edge case handling (first/last project, null projects, disabled buttons) | 0.5h |
| Build verification, lint pass, viewport testing | 0.5h |
| Hero section restructure (prev/next into title row) | 0.5h |
| Bottom nav restructure (unified action buttons + flanking nav) | 0.5h |
| Icon sizing parity (matched prev/next to action buttons) | 0.25h |
| Next icon swap (flipped backArrow with CSS transform) | 0.25h |
| List width adjustment (wider container + SectionWrapper contentClassName prop) | 0.25h |
| Mobile layout refinement (stacked cards instead of list) | 0.25h |
| Report updates | 0.25h |

## Reflection

The implementation went pretty smoothly because the codebase was already well organized. The data layer, shared components, and page composition were separated cleanly, so I could make targeted changes without breaking anything else.

The best call was keeping the same filenames for ProjectsGrid and ProjectCard while completely rewriting what's inside. The import graph stayed the same, so nothing else in the project needed updating.

The subpage navigation was easier than I expected. Using findIndex on the project array and conditionally rendering Link components handled all the edge cases without needing any state management or URL tricks.

The polish rounds (hero restructure, bottom nav, icon changes, width adjustment, mobile stacking) came from testing the flow and noticing what felt off. Each one was small and isolated, which made them easy to knock out without risk.

One thing that saved time: the SectionWrapper already had the right layout for the scrollable list with its pentagon clip and animation. I just added a contentClassName prop so different pages could use different widths.

**Quote accuracy:** 8.25h vs 8.0h estimate, within 3%. The small overrun came from the polish iterations that weren't in the original scope but made the final result much more cohesive.
