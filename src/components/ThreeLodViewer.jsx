import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

/**
 * ThreeLodViewer — simple React wrapper that loads multiple glTFs
 * and composes a THREE.LOD object. Props:
 * - levels: Array<{ src: string, distance?: number }>
 * - width/height: CSS size strings
 * - autoRotate: boolean
 */
export default function ThreeLodViewer({ levels = [], width = '100%', height = '100%', autoRotate = true, className = '' }) {
  const containerRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 1000)
    camera.position.set(0, 1.6, 3)

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(container.clientWidth, container.clientHeight, false)
    renderer.outputColorSpace = THREE.SRGBColorSpace || renderer.outputColorSpace
    container.appendChild(renderer.domElement)

    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
    controls.autoRotate = !!autoRotate
    controls.autoRotateSpeed = 0.6

    const hemi = new THREE.HemisphereLight(0xffffff, 0x444444, 0.6)
    scene.add(hemi)
    const dir = new THREE.DirectionalLight(0xffffff, 0.8)
    dir.position.set(5, 10, 7)
    scene.add(dir)

    const loader = new GLTFLoader()
    const lod = new THREE.LOD()

    let mounted = true
    let loaded = 0

    if (Array.isArray(levels) && levels.length > 0) {
      levels.forEach(({ src, distance = 0 }) => {
        loader.load(
          src,
          (gltf) => {
            if (!mounted) return
            const object = gltf.scene || gltf.scenes?.[0] || new THREE.Group()
            object.traverse((n) => {
              if (n.isMesh) {
                n.castShadow = true
                n.receiveShadow = true
              }
            })
            // Add the loaded object as a level
            lod.addLevel(object, distance)
            loaded += 1
            if (loaded === levels.length) {
              scene.add(lod)
            }
          },
          undefined,
          (err) => {
            // eslint-disable-next-line no-console
            console.warn('Failed to load glTF for LOD:', src, err)
            loaded += 1
            if (loaded === levels.length && mounted) scene.add(lod)
          }
        )
      })
    }

    let rafId
    const animate = () => {
      rafId = requestAnimationFrame(animate)
      controls.update()
      // update LOD selection relative to camera
      lod.update(camera)
      renderer.render(scene, camera)
    }
    animate()

    const handleResize = () => {
      if (!container) return
      const w = container.clientWidth
      const h = container.clientHeight
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h, false)
    }
    window.addEventListener('resize', handleResize)

    return () => {
      mounted = false
      window.removeEventListener('resize', handleResize)
      if (rafId) cancelAnimationFrame(rafId)
      controls.dispose()
      // dispose renderer and remove canvas
      renderer.dispose()
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement)
      }
    }
  }, [levels, autoRotate])

  return (
    <div ref={containerRef} className={className} style={{ width, height }} />
  )
}
