import { useEffect, useState } from 'react'
import { Link } from 'react-router'
import { AnimatePresence, motion } from 'motion/react'
import { FaBars, FaShareNodes, FaXmark } from 'react-icons/fa6'
import Logo from '../ui/Logo.jsx'
import ScrollProgress from '../fx/ScrollProgress.jsx'
import { useScrollSpy } from '../../hooks/useScrollSpy.js'

export default function Navbar({ nav, switchTo, onShare }) {
  const [open, setOpen] = useState(false)
  const active = useScrollSpy(nav.map((n) => n.id))
  const SwitchIcon = switchTo.icon
  const close = () => setOpen(false)

  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <header className="sticky top-0 z-40">
      <nav aria-label="Navigasi utama" className="relative border-b border-white/5 bg-slate-950/70 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-3">
          <Link
            to="/"
            aria-label="Rafi Akbar Muzaki, ke halaman utama"
            className="group flex items-center gap-2.5 text-xl font-bold tracking-tight text-white"
          >
            <Logo />
            <span className="transition duration-300 group-hover:text-accent-400">
              RAFI<span className="text-accent-400">.</span>
            </span>
          </Link>

          <ul className="hidden items-center gap-1 lg:flex">
            {nav.map(({ id, label }) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  className={`relative block rounded-lg px-3.5 py-2 text-sm font-medium transition-colors ${
                    active === id ? 'text-white' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {active === id && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-0 rounded-lg bg-white/8"
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    />
                  )}
                  <span className="relative">{label}</span>
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <Link
              to={switchTo.to}
              className="hidden items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3.5 py-2 text-sm font-semibold text-slate-200 transition hover:border-accent-400/40 hover:text-accent-400 md:inline-flex"
            >
              <SwitchIcon className="size-4" />
              {switchTo.label}
            </Link>
            <button
              type="button"
              onClick={onShare}
              aria-label="Bagikan portofolio"
              title="Bagikan / kode QR"
              className="grid size-10 place-items-center rounded-xl border border-white/10 bg-white/5 text-slate-300 transition hover:border-accent-400/40 hover:text-accent-400"
            >
              <FaShareNodes />
            </button>
            <a
              href="#contact"
              className="btn-shine hidden rounded-xl bg-accent-400 px-5 py-2.5 text-sm font-bold text-slate-950 shadow-[0_0_20px_-4px_var(--accent-500)] transition hover:bg-accent-300 active:scale-95 sm:inline-flex"
            >
              Hubungi Saya
            </a>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? 'Tutup menu' : 'Buka menu'}
              className="grid size-10 place-items-center rounded-xl text-slate-300 transition hover:text-white lg:hidden"
            >
              {open ? <FaXmark className="size-5" /> : <FaBars className="size-5" />}
            </button>
          </div>
        </div>

        {/* Panel melayang di atas konten (bukan mendorongnya): perubahan tinggi layout saat menutup
            akan membatalkan smooth-scroll ke section yang baru dipilih. */}
        <AnimatePresence>
          {open && (
            <motion.div
              id="mobile-menu"
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-x-0 top-full border-b border-white/5 bg-slate-950 shadow-2xl shadow-black/50 lg:hidden"
            >
              <div className="mx-auto flex max-w-6xl flex-col gap-1 px-6 pt-2 pb-5">
                {nav.map(({ id, label }) => (
                  <a
                    key={id}
                    href={`#${id}`}
                    onClick={close}
                    className="rounded-xl px-3 py-3 text-base font-medium text-slate-300 transition hover:bg-white/5 hover:text-accent-400"
                  >
                    {label}
                  </a>
                ))}
                <Link
                  to={switchTo.to}
                  onClick={close}
                  className="mt-1 flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-3 text-base font-semibold text-slate-200"
                >
                  <SwitchIcon className="size-4" />
                  {switchTo.label}
                </Link>
                <a
                  href="#contact"
                  onClick={close}
                  className="mt-2 rounded-xl bg-accent-400 px-4 py-3 text-center font-bold text-slate-950"
                >
                  Hubungi Saya
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <ScrollProgress />
      </nav>
    </header>
  )
}
