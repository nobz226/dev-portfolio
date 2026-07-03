import { lazy, Suspense, useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Loader from '@/components/Loader'

const Home = lazy(() => import('@/pages/Home'))
const About = lazy(() => import('@/pages/About'))
const Projects = lazy(() => import('@/pages/Projects'))
const ProjectDetail = lazy(() => import('@/pages/ProjectDetail'))
const Contact = lazy(() => import('@/pages/Contact'))

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col bg-snow">
        <Header />
        <div className="flex-1">
          <Suspense fallback={<Loader />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/projects/:slug" element={<ProjectDetail />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </Suspense>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App
