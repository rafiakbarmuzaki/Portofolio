import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { FaCommentDots, FaWhatsapp } from 'react-icons/fa6'
import { whatsappUrl } from '../../lib/contact.js'

// Label lengkap hanya ditampilkan sekali per kunjungan; setelah itu tombol mengecil jadi ikon
// (membesar lagi saat disentuh kursor) supaya tidak menutupi konten.
let announced = false

function Bubble({ label }) {
  const [expanded, setExpanded] = useState(!announced)
  const [hovered, setHovered] = useState(false)
  const open = expanded || hovered
  const wa = whatsappUrl('Halo Rafi, saya melihat portofolio Anda dan ingin berdiskusi.')

  useEffect(() => {
    if (!expanded) return
    announced = true
    const t = setTimeout(() => setExpanded(false), 5500)
    return () => clearTimeout(t)
  }, [expanded])

  return (
    <motion.div
      initial={{ opacity: 0, y: 28, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 28, scale: 0.9 }}
      transition={{ type: 'spring', stiffness: 320, damping: 26 }}
      className="fixed right-4 bottom-4 z-40 flex flex-col items-end gap-3 sm:right-6 sm:bottom-6"
    >
      {wa && (
        <a
          href={wa}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat via WhatsApp"
          className="grid size-12 place-items-center rounded-full bg-[#25D366] text-2xl text-white shadow-[0_10px_30px_-8px_#25D366] transition hover:scale-110 active:scale-95"
        >
          <FaWhatsapp />
        </a>
      )}
      <a
        href="#contact"
        aria-label={label}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onFocus={() => setHovered(true)}
        onBlur={() => setHovered(false)}
        className={`flex items-center rounded-full bg-accent-400 py-2 pr-2 pl-2 text-sm font-bold text-slate-950 shadow-[0_12px_40px_-8px_var(--accent-500)] transition-all duration-500 hover:bg-accent-300 active:scale-95 sm:py-2.5 sm:pr-3 ${
          open ? 'sm:pl-5' : 'sm:pl-2.5'
        }`}
      >
        <span
          className={`hidden overflow-hidden whitespace-nowrap transition-all duration-500 sm:inline-block ${
            open ? 'mr-3 max-w-[16rem] opacity-100' : 'mr-0 max-w-0 opacity-0'
          }`}
        >
          {label}
        </span>
        <span className="relative grid size-10 shrink-0 place-items-center rounded-full bg-slate-950 text-accent-400">
          <span className="absolute inset-0 animate-pulse-ring rounded-full bg-accent-400/60" />
          <FaCommentDots className="relative" />
        </span>
      </a>
    </motion.div>
  )
}

// Tombol kontak yang menemani pengunjung saat menggulir. Menghilang ketika form kontak sudah terlihat.
export default function FloatingCTA({ label }) {
  const [pastHero, setPastHero] = useState(false)
  const [contactVisible, setContactVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setPastHero(window.scrollY > 700)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const el = document.getElementById('contact')
    if (!el) return
    const io = new IntersectionObserver(([entry]) => setContactVisible(entry.isIntersecting), { threshold: 0.2 })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return <AnimatePresence>{pastHero && !contactVisible && <Bubble label={label} />}</AnimatePresence>
}
