import { useRef } from 'react'
import { motion, useScroll, useSpring } from 'motion/react'
import SectionHeading from '../ui/SectionHeading.jsx'
import Reveal from '../ui/Reveal.jsx'
import SpotlightCard from '../ui/SpotlightCard.jsx'

// Timeline: garis di tengah "tergambar" mengikuti scroll.
export default function Experience({ cfg, state }) {
  const { experience } = cfg
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 70%', 'end 55%'] })
  const scaleY = useSpring(scrollYProgress, { stiffness: 90, damping: 24 })

  // garis harus tepat di tengah titik: (lebar kolom tahun + jarak) di layar sm ke atas
  const lineX = 'left-[0.375rem] sm:left-[8.875rem]'

  return (
    <section id={experience.id} className="mx-auto w-full max-w-6xl px-6 py-24 md:py-28">
      <SectionHeading center kicker={experience.kicker} title={experience.title} />

      {state.status === 'loading' ? (
        <div className="mx-auto mt-16 max-w-3xl space-y-6" aria-busy="true">
          {[1, 2, 3].map((i) => (
            <div key={i} className="skeleton h-32 rounded-2xl" />
          ))}
        </div>
      ) : (
        <div ref={ref} className="relative mx-auto mt-16 max-w-3xl">
          <div aria-hidden="true" className={`absolute top-3 bottom-3 w-px bg-white/10 ${lineX}`} />
          <motion.div
            aria-hidden="true"
            style={{ scaleY }}
            className={`absolute top-3 bottom-3 w-px origin-top bg-linear-to-b from-accent-400 to-brand3-400 ${lineX}`}
          />

          <ol className="space-y-6">
            {state.data.map((exp, i) => (
              <Reveal as="li" key={`${exp.role}-${exp.company}-${i}`} delay={i * 0.06} className="relative flex gap-6">
                <div className="hidden w-28 shrink-0 pt-6 text-right sm:block">
                  <span className="font-code text-xs font-bold text-accent-400">{exp.year}</span>
                </div>
                <div className="relative flex w-3 shrink-0 justify-center pt-7">
                  <span className="relative z-10 size-3 rounded-full bg-accent-400 shadow-[0_0_14px_var(--accent-500)] ring-4 ring-slate-950" />
                </div>
                <SpotlightCard className="panel flex-1 rounded-2xl p-6 text-left transition-colors duration-300 hover:bg-slate-900/50">
                  <span className="font-code mb-1.5 block text-xs font-bold text-accent-400 sm:hidden">{exp.year}</span>
                  <h3 className="text-lg font-bold text-white">{exp.role}</h3>
                  <p className="mt-0.5 text-sm font-medium text-accent-400/80">{exp.company}</p>
                  <p className="mt-2 text-sm leading-relaxed text-slate-400">{exp.desc}</p>
                </SpotlightCard>
              </Reveal>
            ))}
          </ol>
        </div>
      )}
    </section>
  )
}
