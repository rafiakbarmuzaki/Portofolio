import { motion } from 'motion/react'

// Muncul pelan saat masuk layar. `delay` dalam detik.
export default function Reveal({ as = 'div', delay = 0, y = 28, className = '', children, ...rest }) {
  const Tag = motion[as]
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -60px 0px' }}
      transition={{ duration: 0.85, delay, ease: [0.16, 1, 0.3, 1] }}
      {...rest}
    >
      {children}
    </Tag>
  )
}
