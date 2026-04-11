import { useState } from 'react'
import ProjectCard from './ProjectCard'

export const allProjects = [
  {
    slug: 'nobz-beats',
    title: 'Nobz Beats',
    category: 'Music Platform',
    description:
      'A full-stack music streaming and content management platform featuring integrated audio player with dynamic visualizer, real-time database, responsive design, and admin dashboard for managing tracks and albums.',
    why:
      'I wanted a more customized and curated way of showcasing personal music projects other than the corporate platforms like YouTube or Soundcloud. I wanted it to be possible to completely choose how to display your personal music and artwork and also being a music producer myself I took upon the challenge of building a custom music streaming/showcase website.',
    system:
      'Built as a single-page React application with Vite, it leverages Convex for backend data storage and serverless HTTP actions. The architecture separates client-side routing (history API for routes like /latest, /singles, /albums) from the backend which manages two main tables: tracks (with metadata, artwork, audio source, and album associations) and albums. Client queries use Convex React hooks to fetch data, while mutations and file uploads (artwork/audio) are handled through HTTP actions. A global event bus coordinates playback state between the player and UI components, creating a seamless listening experience.',
    soul:
      'I used single page application format to make navigation and music playback seamless and I added an industrial/punk aesthetic overall with digital motifs here and there to make the experience visually appealing. Also users can interact with the artwork and spinning disc to play, pause or stop playback.',
    tech: ['React', 'Vite', 'Convex', 'Tailwind CSS'],
    liveUrl: 'https://nobz-beats-react.vercel.app/latest',
    repoUrl: 'https://github.com/nobz226/nobz-beats',
    screenshot: '/assets/images/nobzbeats.gif',
    featured: true,
    tags: ['Full-Stack', 'Creative'],
  },
  {
    slug: 'md-murals',
    title: 'MD Murals',
    category: 'Art Portfolio',
    description:
      'An interactive gallery portfolio showcasing mural and canvas art with split-screen design, smooth GSAP animations, category-based filtering, UI sound effects, and an admin panel for content management. Deployed on Vercel.',
    why: [
      'I wanted to build a visual arts portfolio with focus on images and how the user interacts with them rather than have the traditional hero-section-section-footer template. The goal was to let the viewer explore the artist\'s work through imagery first, keeping the experience elegant and seamless instead of text-heavy or overly structured.',
      'That led to a layout where the gallery itself becomes the main entry point to the site, with the categories and artwork doing the storytelling. It was designed to feel more like moving through a curated art space than browsing a conventional portfolio page.',
    ],
    system: [
      'The app is organized as a React 19 + Vite frontend that is wrapped in a Convex-backed data layer and routed with React Router. App-level routing exposes the main gallery plus category-specific views for /interior, /exterior, and /canvas, along with a dedicated /admin route for content management. The Home page queries Convex for all projects or category-filtered projects, toggles a one-time preloader on first visit, and uses a reusable gallery component to render the visual experience.',
      'The gallery itself is the core implementation: it uses GSAP with Draggable, InertiaPlugin, CustomEase, and Flip to build a movable canvas of project tiles with zoom states, drag boundaries, auto-fit behavior, and animated transitions into project detail overlays. The project cards are populated from Convex data and each tile uses a featured image, while the detail overlay can open an individual project, close via Escape, and coordinate with the site-wide sound system. Sound effects are preloaded from Convex, played through a small context provider, and triggered on interactions such as open, close, click, drag, zoom, and autoplay-style UI events. A Vercel rewrite keeps the single-page routing working on refresh, and the admin/seed tooling supports project and sound data population during development.',
    ],
    soul: [
      'This project was built to offer a clean and elegant visual experience with minimal clutter and an artistic edge. Because murals are visual works of art, I made the image gallery the main character of the website and made it draggable and resizable by the user.',
      'The aesthetic leans industrial and urban, but still aims to feel polished and professional. I kept the palette restrained, used blur effects and image focus to guide attention, and relied on motion and spatial arrangement instead of heavy copy to achieve the atmosphere I wanted.',
    ],
    tech: ['React', 'Vite', 'GSAP', 'Convex', 'React Router'],
    liveUrl: 'https://md-murals.vercel.app',
    repoUrl: 'https://github.com/nobz226/md-murals',
    screenshot: '/assets/images/mdmurals.gif',
    featured: true,
    tags: ['Frontend', 'Creative'],
  },
  {
    slug: 'ollie-north-skateshop',
    title: 'Ollie North Skateshop',
    category: 'E-Commerce Platform',
    description:
      'A full-featured skateboard e-commerce platform with 150+ products, advanced filtering, real-time cart management, user authentication via Clerk, Stripe payment integration, wishlist functionality, and admin dashboard. Built with Next.js and Convex.',
    why: [
      'As a skateboarder, I was frustrated with how most skateshop websites felt to use. The UI was often cluttered, links were unreliable, the flow was confusing, information was out of date, and the overall experience felt janky instead of useful. I wanted to use newer technologies to simplify that experience and make it pleasant and easy for a user to find what they need and complete a purchase without friction.',
      'The goal was not just to build another storefront, but to create a skateshop that felt modern, trustworthy, and easy to move through. I wanted the site to reduce noise, respect the user\'s time, and make the shopping path feel straightforward from browsing to cart to checkout-ready state.',
    ],
    system: [
      'This repository is a Next.js 15 App Router application built with React 19, TypeScript, Tailwind CSS v4, Convex, and Clerk. The app structure is organized around route groups for the homepage, product listings, dynamic product detail pages, category pages, cart, profile, and authentication screens, while middleware protects the private routes and allows public access only to sign-in and sign-up. A Convex client provider and a SyncUser component keep authenticated Clerk users synchronized into the database so cart and profile data can be resolved against a stable user record.',
      'The product data model is intentionally rich: products are stored in Convex with hierarchical category, subcategory, productType, size, stock, featured, price, and image fields, while cartItems track quantity and timestamps against a user and product relation. The system exposes queries for listing products, fetching by ID, filtering by category and subcategory, and pulling featured items for the homepage, plus mutations for adding to cart, updating quantities, removing items, clearing items, and seeding 150+ products.',
      'The `/products` experience supports search, cascading category and subcategory filters, product-type and size filtering, price range filtering, URL-state persistence, pagination, and automatic reset behavior when filters change. Cart totals are computed from live product data with subtotal, tax, and shipping logic, and deployment is configured for Vercel with Next.js rewrites plus documented environment variables for Convex and Clerk. The current documentation also calls out known gaps such as no full checkout/payment pipeline, no persisted orders table, and no wishlist or stock enforcement yet, which makes the roadmap for future work very clear.',
    ],
    soul: [
      'The design of the shop is intentionally more traditional than the other projects, but it still had to feel clean and appealing. I used color to add life and a sense of joy while browsing, aiming for something youthful without becoming loud or gimmicky.',
      'Shadcn UI components helped keep the interface intuitive and consistent so the site feels reliable rather than improvised. The overall goal was to make the shop feel like a hobby experience instead of a business transaction, with the product browsing flow doing the work and the design staying out of the way.',
    ],
    tech: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Convex', 'Clerk', 'Stripe'],
    liveUrl: 'https://ollie-north-skateshop.vercel.app/',
    repoUrl: 'https://github.com/nobz226/ollie-north-skateshop',
    screenshot: '/assets/images/skateshop.gif',
    featured: true,
    tags: ['Full-Stack', 'E-Commerce'],
  },
  {
    slug: 'audio-tools-api',
    title: 'Audio Tools API',
    category: 'Backend API',
    description:
      'A Flask-based audio processing API with three core capabilities: BPM/key detection for audio analysis, format conversion between MP3/WAV/FLAC using FFmpeg, and stem separation for isolating vocals, drums, bass, and melody via Demucs. Includes interactive web UI and RESTful endpoints.',
    why:
      'As a music producer I needed tools to analyze music and extract sounds or samples I was interested in. I kept ending up on strange websites full of ads and broken utilities, so once AI made it practical to move faster as a coding sidekick, I decided to build the tools I actually needed and release them as an open-source API for anyone who wants audio analysis, file conversion, or stem separation inside their own app or website.',
    system: [
      'This repo is a small Flask application with a clear split between layers. app.py boots the app, loads config from config.py, enforces upload limits, creates the upload and converted directories, and registers the /audio blueprint plus a /api/health endpoint. The audio routes accept multipart uploads and validate file types before handing work off to the service layer.',
      '/audio/analyze uses librosa-based analysis to estimate tempo and musical key, /audio/convert shells out to FFmpeg for MP3, WAV, and FLAC conversion, and /audio/separate runs Demucs with the htdemucs model to generate stems and package the results. Uploaded files are saved with UUID-prefixed names under static/uploads, derived files land in static/converted, and temporary outputs are cleaned up after a short expiry window. The app also exposes a simple root page and a /tools page with the interactive forms that originally made the project usable as a testing surface rather than just a raw API.',
    ],
    soul: [
      'This project started as my music showcase and portfolio, built around these three tools before they were exposed as an API. When hosting the tools in a reliable way became the real challenge, I stripped the frontend back to a minimal tools and testing page and let the API itself become the product.',
      'The result is a developer-focused utility that still carries the original music-first intent, but is now easier to reuse, extend, and embed anywhere.',
    ],
    tech: ['Flask', 'Python', 'FFmpeg', 'Demucs', 'PyTorch'],
    liveUrl: null,
    repoUrl: 'https://github.com/nobz226/audio-tools-API',
    screenshot: '/assets/images/api.gif',
    accordionScreenshot: '/assets/images/api.jpg',
    featured: true,
    tags: ['API'],
  },
]

const allTags = ['All', ...new Set(allProjects.flatMap((p) => p.tags))]

export default function ProjectsGrid() {
  const [active, setActive] = useState('All')

  const filtered =
    active === 'All' ? allProjects : allProjects.filter((p) => p.tags.includes(active))

  return (
    <div>
      {/* Filter tabs */}
      <div className="flex flex-wrap gap-2 mb-10">
        {allTags.map((tag) => (
          <button
            key={tag}
            onClick={() => setActive(tag)}
            aria-pressed={active === tag}
            className={`font-silom text-sm uppercase tracking-widest px-4 py-2 transition-all duration-300 border ${
              active === tag
                ? 'border-[#2dd4bf] text-[#1e1e1e] bg-[#2dd4bf]'
                : 'border-black/10 text-[#555555] bg-transparent hover:border-[#2dd4bf]/50 hover:text-[#2dd4bf]'
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-[20px] bg-black/5">
        {filtered.map((project, i) => (
          <ProjectCard key={project.slug} project={project} index={i} />
        ))}
      </div>
    </div>
  )
}
