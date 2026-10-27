import { useState } from 'react'
import { motion } from 'motion/react'
import { FaArrowRight, FaWhatsapp } from 'react-icons/fa6'
import Button from '../ui/Button.jsx'
import Tilt from '../ui/Tilt.jsx'
import Typewriter from '../ui/Typewriter.jsx'
import { assetUrl } from '../../lib/sheets.js'
import { whatsappUrl } from '../../lib/contact.js'

const container = { hidden: {}, show: { transition: { staggerChildren: 0.09, delayChildren: 0.15 } } }
const item = {
  hidden: { opacity: 0, y: 26, filter: 'blur(10px)' },
  show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } },
}

function OrbitRing({ icons, duration, reverse = false, inset, iconClass }) {
  return (
    <div
      className={`orbit absolute rounded-full border border-dashed border-white/10 ${inset}`}
      style={{ '--dur': duration }}
      data-reverse={reverse ? '' : undefined}
    >
      {icons.map((Icon, i) => (
        <div key={i} className="orbit-item" style={{ '--angle': `${(360 / icons.length) * i}deg` }}>
          <span className={`orbit-icon glass grid place-items-center rounded-xl text-accent-400 shadow-lg ${iconClass}`}>
            <Icon />
          </span>
        </div>
      ))}
    </div>
  )
}

function Avatar({ profile, hero, count }) {
  const [failed, setFailed] = useState(false)
  const [inner, outer] = hero.orbit
  const bottom = hero.chipBottom

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.1, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
      className="relative mx-auto w-full max-w-[30rem]"
    >
      <Tilt className="relative aspect-square w-full">
        <div className="absolute inset-[14%] rounded-full bg-accent-500/25 blur-3xl" />
        <div className="absolute inset-0 animate-rotate-slow rounded-full border-[3px] border-dashed border-accent-400/20" />
        <div className="absolute inset-[6%] animate-rotate-slow rounded-full border border-dashed border-brand2-400/20 [animation-direction:reverse]" />

        <OrbitRing icons={outer} duration="46s" reverse inset="inset-[1%]" iconClass="size-11 text-xl sm:size-14 sm:text-2xl" />
        <OrbitRing icons={inner} duration="32s" inset="inset-[11%]" iconClass="size-10 text-lg sm:size-12 sm:text-xl" />

        <div className="conic-border absolute inset-[21%] rounded-full p-[3px] shadow-[0_0_80px_-10px_var(--accent-500)]">
          <div className="relative size-full overflow-hidden rounded-full bg-slate-900">
            {failed ? (
              <span className="grid size-full place-items-center text-7xl font-black text-accent-400">
                {profile.name.charAt(0)}
              </span>
            ) : (
              <img
                src={assetUrl(profile.photo)}
                alt={profile.name}
                fetchPriority="high"
                decoding="async"
                onError={() => setFailed(true)}
                style={{ objectPosition: profile.photoPosition }}
                className="size-full object-cover transition duration-700 hover:scale-105"
              />
            )}
          </div>
        </div>
      </Tilt>

      <div className="glass animate-bob absolute top-[7%] right-0 flex items-center gap-2 rounded-2xl px-3.5 py-2.5 text-xs font-semibold text-slate-100 shadow-xl sm:-right-3">
        <span className="relative flex size-2.5">
          <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent-400 opacity-70" />
          <span className="relative inline-flex size-2.5 rounded-full bg-accent-400" />
        </span>
        {hero.chipTop}
      </div>
      {bottom && (
        <div className="glass animate-bob absolute bottom-[9%] left-0 rounded-2xl px-3.5 py-2.5 text-xs font-semibold text-slate-100 shadow-xl [animation-delay:-3s] sm:-left-3">
          {bottom.count ? (
            <>
              <span className="text-base font-extrabold text-accent-400">{count}+</span> {bottom.label}
            </>
          ) : (
            bottom.text
          )}
        </div>
      )}
    </motion.div>
  )
}

export default function Hero({ cfg, count }) {
  const { profile, hero } = cfg
  const wa = whatsappUrl(`Halo Rafi, saya melihat portofolio ${cfg.key === 'music' ? 'musik' : 'IT'} Anda.`)

  return (
    <section
      id="hero"
      className="relative mx-auto grid w-full max-w-6xl items-center gap-14 px-6 pt-12 pb-24 md:grid-cols-[1.08fr_0.92fr] md:pt-20 md:pb-32"
    >
      <motion.div variants={container} initial="hidden" animate="show" className="flex flex-col gap-6 text-left">
        <motion.span
          variants={item}
          className="font-code inline-flex w-fit items-center gap-2 rounded-full border border-accent-500/20 bg-accent-500/10 px-3.5 py-1.5 text-xs font-semibold tracking-wider text-accent-400 shadow-[0_0_20px_-6px_var(--accent-500)] md:text-sm"
        >
          <span className="relative flex size-2.5">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent-400 opacity-70" />
            <span className="relative inline-flex size-2.5 rounded-full bg-accent-400" />
          </span>
          {hero.badge}
        </motion.span>

        <motion.h1 variants={item} className="tracking-tight text-white">
          <span className="block text-2xl font-semibold text-slate-300 md:text-3xl">Halo, Saya</span>
          <span className="text-gradient mt-2 block text-5xl leading-[1.06] font-extrabold md:text-7xl">
            {profile.name}.
          </span>
        </motion.h1>

        <motion.h2 variants={item} className="flex flex-wrap items-center text-xl font-bold text-slate-300 md:text-3xl">
          {profile.rolePrefix}&nbsp;
          <Typewriter words={profile.roles} />
        </motion.h2>

        <motion.p variants={item} className="max-w-xl text-lg leading-relaxed text-pretty text-slate-400">
          {profile.about}
        </motion.p>

        <motion.div variants={item} className="mt-2 flex flex-wrap items-center gap-3 sm:gap-4">
          <Button href={hero.primary.href}>
            {hero.primary.label}
            <FaArrowRight className="transition group-hover:translate-x-1.5" />
          </Button>
          <Button variant="ghost" href={hero.secondary.href}>
            {hero.secondary.label}
          </Button>
          {wa && (
            <Button variant="ghost" href={wa} target="_blank" rel="noopener noreferrer">
              <FaWhatsapp className="size-5 text-[#25D366]" />
              WhatsApp
            </Button>
          )}
        </motion.div>

        {hero.collabs?.length > 0 && (
          <motion.div variants={item} className="mt-4 border-t border-white/5 pt-6">
            <p className="text-xs font-semibold tracking-widest text-slate-400 uppercase">{hero.collabLabel}</p>
            <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm font-semibold text-slate-300">
              {hero.collabs.map((name) => (
                <li key={name} className="flex items-center gap-2">
                  <span className="size-1.5 rounded-full bg-accent-400" />
                  {name}
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </motion.div>

      <Avatar profile={profile} hero={hero} count={count} />

      <a
        href="#about"
        aria-label="Gulir ke bawah"
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-slate-500 transition duration-300 hover:text-accent-400 md:flex"
      >
        <span className="font-code text-[10px] font-bold tracking-widest uppercase">Scroll</span>
        <span className="flex h-8 w-5 justify-center rounded-full border-2 border-current p-1">
          <span className="size-1.5 animate-scroll-down rounded-full bg-accent-400" />
        </span>
      </a>
    </section>
  )
}
