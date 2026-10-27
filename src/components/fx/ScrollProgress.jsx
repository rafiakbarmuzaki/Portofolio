import { motion, useScroll, useSpring } from 'motion/react'

// Garis tipis di bawah navbar yang memanjang sesuai progres scroll.
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 })
  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX }}
      className="absolute inset-x-0 bottom-0 h-[2px] origin-left bg-linear-to-r from-accent-400 via-brand2-400 to-brand3-400"
    />
  )
}
