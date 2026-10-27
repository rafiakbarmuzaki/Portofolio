import { useRef } from 'react'

// Kartu yang bersinar mengikuti posisi kursor (lihat .spotlight di index.css).
export default function SpotlightCard({ as: Tag = 'div', className = '', children, ...props }) {
  const ref = useRef(null)

  const onPointerMove = (e) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    el.style.setProperty('--mx', `${e.clientX - r.left}px`)
    el.style.setProperty('--my', `${e.clientY - r.top}px`)
  }

  return (
    <Tag ref={ref} onPointerMove={onPointerMove} className={`spotlight ${className}`} {...props}>
      {children}
    </Tag>
  )
}
