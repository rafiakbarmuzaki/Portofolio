import { useRef } from 'react'
import { motion, useMotionValue, useReducedMotion, useSpring } from 'motion/react'

// Miring 3D mengikuti mouse. Tidak aktif di layar sentuh / reduced motion.
export default function Tilt({ max = 9, className = '', children }) {
  const reduce = useReducedMotion()
  const ref = useRef(null)
  const rx = useMotionValue(0)
  const ry = useMotionValue(0)
  const rotateX = useSpring(rx, { stiffness: 160, damping: 18 })
  const rotateY = useSpring(ry, { stiffness: 160, damping: 18 })

  const onMove = (e) => {
    if (reduce || e.pointerType !== 'mouse') return
    const r = ref.current.getBoundingClientRect()
    ry.set(((e.clientX - r.left) / r.width - 0.5) * max * 2)
    rx.set(-((e.clientY - r.top) / r.height - 0.5) * max * 2)
  }
  const reset = () => {
    rx.set(0)
    ry.set(0)
  }

  return (
    <motion.div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={reset}
      style={{ rotateX, rotateY, transformPerspective: 900 }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
