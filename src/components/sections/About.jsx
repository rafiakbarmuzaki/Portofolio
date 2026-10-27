import { FaEnvelope, FaQuoteLeft } from 'react-icons/fa6'
import Reveal from '../ui/Reveal.jsx'
import SpotlightCard from '../ui/SpotlightCard.jsx'
import { tone } from '../ui/tones.js'
import { assetUrl } from '../../lib/sheets.js'
import { SITE } from '../../config/site.js'

// Tata letak bento: foto + misi, teks, dua keunggulan, lalu fakta singkat.
export default function About({ cfg }) {
  const { about, profile } = cfg
  const facts = [...about.facts, { icon: FaEnvelope, label: 'Email', value: SITE.email, href: `mailto:${SITE.email}` }]

  return (
    <section id="about" className="mx-auto w-full max-w-6xl px-6 py-24 md:py-28">
      <div className="grid gap-5 md:grid-cols-6">
        <Reveal className="md:col-span-2 md:row-span-2">
          <div className="group relative h-full min-h-[24rem] overflow-hidden rounded-3xl border border-white/10 bg-slate-900 shadow-2xl">
            <img
              src={assetUrl(profile.photo)}
              alt={`Foto ${profile.name}`}
              loading="lazy"
              decoding="async"
              style={{ objectPosition: profile.photoPosition }}
              className="absolute inset-0 size-full object-cover brightness-90 transition duration-700 group-hover:scale-105 group-hover:brightness-100"
            />
            <div className="absolute inset-0 bg-linear-to-t from-slate-950/85 via-transparent to-transparent" />
            <div className="glass absolute inset-x-4 bottom-4 flex items-center gap-4 rounded-2xl bg-slate-950/70 p-4">
              <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-accent-400 text-lg text-slate-950">
                <FaQuoteLeft />
              </span>
              <div className="text-left">
                <p className="text-xs font-bold tracking-wider text-accent-400 uppercase">{about.mission.label}</p>
                <p className="mt-0.5 text-sm text-slate-200">{about.mission.text}</p>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1} className="md:col-span-4">
          <SpotlightCard className="panel h-full rounded-3xl p-8 text-left md:p-10">
            <span className="inline-block rounded-full border border-accent-500/20 bg-accent-500/10 px-4 py-1.5 text-xs font-bold tracking-widest text-accent-400 uppercase">
              {about.kicker}
            </span>
            <h2 className="mt-5 text-3xl leading-tight font-bold text-balance text-white md:text-4xl">{about.title}</h2>
            <p className="mt-4 text-base leading-relaxed text-pretty text-slate-400">{profile.about}</p>
          </SpotlightCard>
        </Reveal>

        {about.features.map((f, i) => {
          const t = tone(f.tone)
          const Icon = f.icon
          return (
            <Reveal key={f.title} delay={0.18 + i * 0.08} className="md:col-span-2">
              <SpotlightCard className="panel group h-full rounded-3xl p-6 text-left">
                <span
                  className={`grid size-11 place-items-center rounded-xl border text-lg transition duration-300 group-hover:scale-110 ${t.soft} ${t.glow}`}
                >
                  <Icon />
                </span>
                <h3 className="mt-5 text-base font-semibold text-white">{f.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-slate-400">{f.text}</p>
              </SpotlightCard>
            </Reveal>
          )
        })}

        <Reveal delay={0.3} className="md:col-span-6">
          <ul className="panel grid gap-x-8 gap-y-5 rounded-3xl px-6 py-5 [grid-template-columns:repeat(auto-fit,minmax(14rem,1fr))] md:px-8">
            {facts.map(({ icon: Icon, label, value, href }) => (
              <li key={label} className="flex items-center gap-3.5 text-left">
                <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-white/5 text-accent-400">
                  <Icon />
                </span>
                <div className="min-w-0">
                  <p className="text-xs font-semibold tracking-wider text-slate-400 uppercase">{label}</p>
                  {href ? (
                    <a href={href} className="block truncate text-sm font-semibold text-slate-200 transition hover:text-accent-400">
                      {value}
                    </a>
                  ) : (
                    <p className="text-sm font-semibold text-slate-200">{value}</p>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  )
}
