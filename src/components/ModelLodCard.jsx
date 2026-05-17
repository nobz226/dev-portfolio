import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import '@google/model-viewer'
import './model-viewer.css'

export default function ModelLodCard({
  modelSrc,
  title,
  index,
  body,
}) {
  const modelViewerRef = useRef(null)

  useEffect(() => {
    const viewer = modelViewerRef.current
    if (!viewer) return

    let interactionTimeout = null

    const handleInteraction = () => {
      viewer.autoRotate = false
      clearTimeout(interactionTimeout)
      interactionTimeout = setTimeout(() => {
        viewer.autoRotate = true
      }, 3000)
    }

    viewer.addEventListener('mousedown', handleInteraction)
    viewer.addEventListener('touchstart', handleInteraction)

    return () => {
      viewer.removeEventListener('mousedown', handleInteraction)
      viewer.removeEventListener('touchstart', handleInteraction)
      clearTimeout(interactionTimeout)
    }
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, x: -24 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6 }}
      className="bg-[#f9f7f7] group hover:bg-[#eeece9] transition-colors duration-300 overflow-hidden"
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
          <div className="absolute inset-0 bg-radial-gradient opacity-30 pointer-events-none" style={{
            background: 'radial-gradient(circle at 50% 50%, rgba(45,212,191,0.08) 0%, transparent 70%)'
          }} />

          <model-viewer
            ref={modelViewerRef}
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
            }}
          >
            <div slot="progress-bar" style={{
              height: '2px',
              background: 'linear-gradient(90deg, #2dd4bf, #22b8c7)',
              width: '100%',
            }} />
          </model-viewer>

          <div className="absolute inset-0 pointer-events-none group-hover:bg-[#2dd4bf]/5 transition-all duration-300" />
        </div>
      </div>
    </motion.div>
  )
}
