import { Fragment, useState } from 'react'
import { Link } from 'react-router'
import { motion } from 'motion/react'
import { FaArrowRight, FaCode, FaEnvelope, FaGuitar, FaQrcode } from 'react-icons/fa6'
import PageShell from '../components/layout/PageShell.jsx'
import Logo from '../components/ui/Logo.jsx'
import SpotlightCard from '../components/ui/SpotlightCard.jsx'
import ShareDialog from '../components/share/ShareDialog.jsx'
import { SITE, SOCIALS } from '../config/site.js'
import { usePageMeta, useTheme } from '../hooks/usePageMeta.js'
import { loaders } from '../routes.js'

const ease = [0.16, 1, 0.3, 1]

// Judul: kata-kata naik satu per satu dari balik "topeng"
function RevealWords({ text, delay = 0 }) {
  const words = text.split(' ')
  return words.map((word, i) => (
    <Fragment key={i}>
      <span className="inline-block overflow-hidden pb-[0.18em] -mb-[0.18em] align-bottom">
        <motion.span
          className="inline-block"
          initial={{ y: '115%' }}
          animate={{ y: 0 }}
          transition={{ duration: 0.9, delay: delay + i * 0.08, ease }}
        >
          {word}
        </motion.span>
      </span>
      {/* spasi sungguhan, bukan margin: agar screen reader, mesin pencari, dan copy-paste membaca kata terpisah */}
      {i < words.length - 1 && ' '}
    </Fragment>
  ))
}

// Cuplikan kode — hiasan kartu "IT"
function CodePreview() {
  return (
    <div
      aria-hidden="true"
      className="font-code h-36 overflow-hidden rounded-2xl border border-white/5 bg-slate-950/70 p-4 text-[12.5px] leading-[1.7]"
    >
      <div className="mb-2.5 flex gap-1.5">
        <span className="size-2.5 rounded-full bg-rose-400/70" />
        <span className="size-2.5 rounded-full bg-amber-400/70" />
        <span className="size-2.5 rounded-full bg-emerald-400/70" />
      </div>
      <p>
        <span className="text-violet-400">const</span> <span className="text-sky-300">rafi</span>{' '}
        <span className="text-slate-500">=</span> {'{'}
      </p>
      <p className="pl-4">
        <span className="text-slate-400">role:</span> <span className="text-amber-300">"Fullstack Developer"</span>,
      </p>
      <p className="pl-4">
        <span className="text-slate-400">stack:</span> [<span className="text-accent-300">"Flutter"</span>,{' '}
        <span className="text-accent-300">"Node.js"</span>],
      </p>
      <p className="pl-4">
        <span className="text-slate-400">openToWork:</span> <span className="text-accent-400">true</span>
      </p>
      <p>
        {'}'}
        <span className="ml-0.5 inline-block h-[1em] w-[7px] translate-y-[2px] bg-accent-400 [animation:blink_1s_step-end_infinite]" />
      </p>
    </div>
  )
}

// Batang equalizer — hiasan kartu "Musik"
function Equalizer() {
  return (
    <div aria-hidden="true" className="flex h-36 items-end gap-[5px] rounded-2xl border border-white/5 bg-slate-950/70 p-4">
      {Array.from({ length: 30 }, (_, i) => (
        <span
          key={i}
          className="eq-bar w-full rounded-full bg-linear-to-t from-accent-500 via-brand2-400 to-brand3-400"
          style={{ '--i': i, '--d': `${0.85 + ((i * 37) % 8) / 10}s`, height: `${45 + ((i * 53) % 55)}%` }}
        />
      ))}
    </div>
  )
}

function PathCard({ theme, to, preload, icon: Icon, index, title, text, tags, cta, children }) {
  return (
    <motion.div
      data-theme={theme}
      initial={{ opacity: 0, y: 44 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.95, delay: 0.55 + index * 0.14, ease }}
    >
      <SpotlightCard
        as={Link}
        to={to}
        onPointerEnter={preload}
        onFocus={preload}
        className="panel group flex h-full flex-col gap-4 overflow-hidden rounded-3xl p-6 md:p-7 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_34px_60px_-22px_rgba(0,0,0,0.85)]"
      >
        <div className="flex items-start justify-between">
          <span className="grid size-14 place-items-center rounded-2xl border border-accent-500/25 bg-accent-400/10 text-2xl text-accent-400 shadow-[0_0_26px_-4px_var(--accent-500)] transition duration-300 group-hover:scale-110 group-hover:rotate-3">
            <Icon />
          </span>
          <span className="font-code text-xs font-bold text-slate-600">0{index + 1}</span>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-white transition-colors duration-300 group-hover:text-accent-400 md:text-3xl">
            {title}
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-slate-400">{text}</p>
        </div>

        {children}

        <ul className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <li key={tag} className="font-code rounded-lg border border-white/5 bg-slate-950/70 px-3 py-1.5 text-xs text-slate-300">
              {tag}
            </li>
          ))}
        </ul>

        <span className="mt-auto flex items-center gap-2 pt-1 text-sm font-bold text-accent-400">
          {cta}
          <FaArrowRight className="text-xs transition-transform duration-300 group-hover:translate-x-1.5" />
        </span>
      </SpotlightCard>
    </motion.div>
  )
}

const quickLink =
  'grid size-11 place-items-center rounded-xl border border-white/10 bg-white/5 text-slate-300 transition hover:-translate-y-1 hover:border-white/25 hover:text-white'

export default function Landing() {
  useTheme()
  usePageMeta({
    title: 'Rafi Akbar Muzaki: Portofolio Profesional',
    description: 'Portofolio resmi Rafi Akbar Muzaki. Menampilkan proyek IT & Software Development serta karya musik.',
  })
  const [shareOpen, setShareOpen] = useState(false)

  return (
    <PageShell>
      {/* bola cahaya hangat di sisi kanan: pasangan hijau di kiri (dari Aurora) */}
      <div aria-hidden="true" className="pointer-events-none fixed top-1/4 -right-32 -z-20 size-[34rem] animate-float-reverse rounded-full bg-orange-500/12 blur-[140px]" />
      <div aria-hidden="true" className="pointer-events-none fixed -bottom-24 right-1/4 -z-20 size-[26rem] animate-float-slow rounded-full bg-rose-500/8 blur-[120px]" />

      <div className="relative mx-auto flex min-h-svh w-full max-w-5xl flex-col px-6">
        <header className="flex items-center justify-between py-5">
          <Link to="/" aria-label="Rafi Akbar Muzaki" className="group flex items-center gap-2.5 text-xl font-bold tracking-tight text-white">
            <Logo />
            <span>
              RAFI<span className="text-accent-400">.</span>
            </span>
          </Link>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setShareOpen(true)}
              className="flex h-10 items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3.5 text-sm font-semibold text-slate-300 transition hover:border-white/25 hover:text-white"
            >
              <FaQrcode />
              <span className="hidden sm:inline">Bagikan</span>
            </button>
            <a
              href={`mailto:${SITE.email}`}
              className="flex h-10 items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3.5 text-sm font-semibold text-slate-300 transition hover:border-white/25 hover:text-white"
            >
              <FaEnvelope />
              <span className="hidden sm:inline">Hubungi</span>
            </a>
          </div>
        </header>

        <main id="main" className="flex flex-1 flex-col items-center justify-center py-6 text-center">
          <motion.span
            initial={{ opacity: 0, y: -14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease }}
            className="font-code inline-flex items-center gap-2.5 rounded-full border border-accent-500/20 bg-accent-500/10 px-4 py-1.5 text-xs font-semibold tracking-wider text-accent-400 shadow-[0_0_24px_-6px_var(--accent-500)] md:text-sm"
          >
            <span className="relative flex size-2.5">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent-400 opacity-70" />
              <span className="relative inline-flex size-2.5 rounded-full bg-accent-400" />
            </span>
            RAFI AKBAR MUZAKI
          </motion.span>

          <h1 className="mt-6 text-5xl leading-[1.12] font-extrabold tracking-tight text-white md:text-7xl">
            <RevealWords text="Mau lihat portofolio" delay={0.15} />{' '}
            <br className="hidden md:block" />
            <motion.span
              initial={{ opacity: 0, y: 24, filter: 'blur(12px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 1, delay: 0.55, ease }}
              className="text-gradient-duo inline-block"
            >
              yang mana?
            </motion.span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.7, ease }}
            className="mt-4 max-w-xl text-base text-balance text-slate-400 md:text-lg"
          >
            Developer yang juga gitaris. Pilih sisi mana yang ingin Anda kenal lebih dulu.
          </motion.p>

          <div className="mt-10 grid w-full gap-6 text-left md:grid-cols-2">
            <PathCard
              index={0}
              to="/it"
              preload={loaders.it}
              icon={FaCode}
              title="Portofolio IT"
              text="Proyek software & mobile development — Flutter, Node.js, dan sistem untuk bisnis kecil."
              tags={['Flutter', 'Node.js', 'Firebase']}
              cta="Lihat proyek IT"
            >
              <CodePreview />
            </PathCard>
            <PathCard
              index={1}
              theme="music"
              to="/musik"
              preload={loaders.music}
              icon={FaGuitar}
              title="Portofolio Musik"
              text="Sisi lain saya sebagai gitaris — gear, preset tone, skill, dan pengalaman panggung."
              tags={['Rock', 'Pop Rock', 'Lead']}
              cta="Lihat portofolio musik"
            >
              <Equalizer />
            </PathCard>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 1.1, ease }}
            className="mt-10 flex flex-col items-center gap-5"
          >
            <p className="font-code inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-slate-300">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent-400 opacity-70" />
                <span className="relative inline-flex size-2 rounded-full bg-accent-400" />
              </span>
              Terbuka untuk proyek baru & booking
            </p>
            <div className="flex items-center gap-3">
              {[SOCIALS.github, SOCIALS.linkedin, SOCIALS.instagram].map(({ label, href, icon: Icon }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label} title={label} className={quickLink}>
                  <Icon className="text-lg" />
                </a>
              ))}
              <a href={`mailto:${SITE.email}`} aria-label="Email" title="Email" className={quickLink}>
                <FaEnvelope className="text-lg" />
              </a>
            </div>
          </motion.div>
        </main>

        <footer className="font-code py-8 text-center text-xs text-slate-400">
          © {new Date().getFullYear()} {SITE.name}.
        </footer>
      </div>

      <ShareDialog open={shareOpen} onClose={() => setShareOpen(false)} url={`${SITE.url}/`} message="Portofolio Rafi Akbar Muzaki" />
    </PageShell>
  )
}
