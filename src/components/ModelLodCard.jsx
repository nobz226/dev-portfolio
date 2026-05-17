import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import './model-viewer.css'

export default function ModelLodCard({ modelSrc, title, index, body }) {
  const [inView, setInView] = useState(false)
  const [libReady, setLibReady] = useState(false)
  const [loadState, setLoadState] = useState('pending')
  const containerRef = useRef(null)
  const viewerRef = useRef(null)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.disconnect()
        }
      },
      { rootMargin: '300px' }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!inView) return
    let mounted = true
    import('@google/model-viewer').then(() => {
      if (mounted) setLibReady(true)
    })
    return () => { mounted = false }
  }, [inView])

  useEffect(() => {
    const viewer = viewerRef.current
    if (!viewer) return
    let t
    const onLoad = () => { t = setTimeout(() => setLoadState('done'), 300) }
    const onError = () => setLoadState('error')
    viewer.addEventListener('load', onLoad)
    viewer.addEventListener('error', onError)
    return () => {
      viewer.removeEventListener('load', onLoad)
      viewer.removeEventListener('error', onError)
      clearTimeout(t)
    }
  }, [libReady])

  useEffect(() => {
    const viewer = viewerRef.current
    if (!viewer) return
    let timeout
    const pause = () => {
      viewer.autoRotate = false
      clearTimeout(timeout)
      timeout = setTimeout(() => { viewer.autoRotate = true }, 3000)
    }
    viewer.addEventListener('mousedown', pause)
    viewer.addEventListener('touchstart', pause)
    return () => {
      viewer.removeEventListener('mousedown', pause)
      viewer.removeEventListener('touchstart', pause)
      clearTimeout(timeout)
    }
  }, [libReady])

  return (
    <motion.div
      initial={{ opacity: 0, x: -24 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6 }}
      className="bg-[#f9f7f7] group hover:bg-[#eeece9] transition-colors duration-300 overflow-hidden"
      ref={containerRef}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 min-h-[300px] lg:min-h-[400px]">
        <div className="p-8 md:p-10 flex flex-col justify-between">
          <div>
            <div className="flex items-start gap-4 mb-4">
              <span className="font-silom text-6xl font-bold text-black group-hover:text-[#2dd4bf] transition-colors duration-500 select-none leading-none">
                {index}
              </span>
            </div>
            <h3 className="font-sans font-bold text-2xl text-[#1e1e1e] mb-3 leading-tight">
              {title}
            </h3>
            <p className="font-mono text-base font-medium text-[#555555] leading-relaxed">
              {body}
            </p>
          </div>
        </div>

        <div className="relative bg-gradient-to-br from-[#f5f3f0] via-[#f1eeeb] to-[#eeece9] flex items-center justify-center overflow-hidden border-l border-black/5">
          <div className="absolute inset-0 pointer-events-none" style={{
            background: 'radial-gradient(circle at 50% 50%, rgba(45,212,191,0.08) 0%, transparent 70%)'
          }} />

          {loadState === 'pending' && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex flex-col items-center gap-3">
                <div className="w-6 h-6 border-2 border-[#2dd4bf] border-t-transparent rounded-full animate-spin" />
                <span className="font-mono text-xs text-black/30 uppercase tracking-widest">Loading</span>
              </div>
            </div>
          )}

          {loadState === 'error' && (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="font-mono text-xs text-black/20">Failed to load</span>
            </div>
          )}

          {libReady && (
            <model-viewer
              ref={viewerRef}
              src={modelSrc}
              alt={title}
              auto-rotate
              orbit-controls
              camera-controls
              exposure="1"
              environment-image="legacy"
              shadow-intensity="1"
              camera-orbit="0deg 75deg 105%"
              class="w-full h-full"
              style={{
                width: '100%',
                height: '100%',
                minHeight: '300px',
                opacity: loadState === 'done' ? 1 : 0,
                transition: 'opacity 0.4s',
              }}
              reveal="auto"
            >
              <div slot="progress-bar" style={{
                height: '2px',
                background: 'linear-gradient(90deg, #2dd4bf, #22b8c7)',
                width: '100%',
              }} />
            </model-viewer>
          )}

          <div className="absolute inset-0 pointer-events-none group-hover:bg-[#2dd4bf]/5 transition-all duration-300" />
        </div>
      </div>
    </motion.div>
  )
}
