import { useEffect } from 'react'
import { motion, useMotionValue, useSpring } from 'motion/react'
import { useFinePointer } from '../../hooks/usePointerFine.js'

// Cahaya lembut yang mengikuti kursor (hanya di perangkat dengan mouse).
export default function CursorGlow() {
  const fine = useFinePointer()
  const x = useMotionValue(-600)
  const y = useMotionValue(-600)
  const sx = useSpring(x, { stiffness: 110, damping: 20, mass: 0.6 })
  const sy = useSpring(y, { stiffness: 110, damping: 20, mass: 0.6 })

  useEffect(() => {
    if (!fine) return
    const move = (e) => {
      x.set(e.clientX - 300)
      y.set(e.clientY - 300)
    }
    window.addEventListener('pointermove', move, { passive: true })
    return () => window.removeEventListener('pointermove', move)
  }, [fine, x, y])

  if (!fine) return null
  return (
    <motion.div
      aria-hidden="true"
      style={{ x: sx, y: sy }}
      className="cursor-glow pointer-events-none fixed top-0 left-0 -z-10 size-[600px] rounded-full"
    />
  )
}
