import { useEffect, useState } from 'react'

// Mengembalikan id section yang sedang berada di sekitar tengah layar.
export function useScrollSpy(ids) {
  const [active, setActive] = useState('')
  const key = ids.join('|')

  useEffect(() => {
    const els = key
      .split('|')
      .map((id) => document.getElementById(id))
      .filter(Boolean)
    if (!els.length) return
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) if (entry.isIntersecting) setActive(entry.target.id)
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 },
    )
    els.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [key])

  return active
}
