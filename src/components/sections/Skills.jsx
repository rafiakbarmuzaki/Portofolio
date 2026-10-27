import { useEffect, useRef, useState } from 'react'
import { animate, useInView, useReducedMotion } from 'motion/react'
import SectionHeading from '../ui/SectionHeading.jsx'
import Reveal from '../ui/Reveal.jsx'
import SpotlightCard from '../ui/SpotlightCard.jsx'
import { tone } from '../ui/tones.js'

function SkillBar({ name, level, t, delay }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -40px 0px' })
  const reduce = useReducedMotion()
  const [shown, setShown] = useState(0)

  useEffect(() => {
    if (!inView) return
    if (reduce) {
      setShown(level)
      return
    }
    const controls = animate(0, level, {
      duration: 1.4,
      delay,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setShown(Math.round(v)),
    })
    return () => controls.stop()
  }, [inView, level, delay, reduce])

  return (
    <div ref={ref} className="group/skill">
      <div className="mb-1.5 flex items-baseline justify-between gap-3 text-sm font-medium text-slate-300 transition-colors duration-300 group-hover/skill:text-white">
        <span>{name}</span>
        <span className="text-xs font-semibold text-slate-400 tabular-nums">{shown}%</span>
      </div>
      <div
        role="progressbar"
        aria-label={name}
        aria-valuenow={level}
        aria-valuemin={0}
        aria-valuemax={100}
        className="h-2 overflow-hidden rounded-full border border-white/5 bg-slate-950 p-[2px]"
      >
        <div className={`h-full rounded-full bg-linear-to-r ${t.bar} ${t.glow}`} style={{ width: `${shown}%` }} />
      </div>
    </div>
  )
}

export default function Skills({ cfg, state }) {
  const { skills } = cfg
  const groups = skills.groups.filter((g) => state.data[g.key]?.length)
  const cols = groups.length >= 4 ? 'lg:grid-cols-4' : groups.length === 3 ? 'lg:grid-cols-3' : 'lg:grid-cols-2'

  return (
    <section id={skills.id} className="relative border-y border-white/5 bg-slate-900/20 py-24 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading center kicker={skills.kicker} title={skills.title} subtitle={skills.subtitle} />

        {state.status === 'loading' ? (
          <div className={`mt-16 grid gap-6 md:grid-cols-2 ${cols}`} aria-busy="true">
            {skills.groups.map((g) => (
              <div key={g.key} className="skeleton h-72 rounded-3xl" />
            ))}
          </div>
        ) : (
          <div className={`mt-16 grid gap-6 md:grid-cols-2 ${cols}`}>
            {groups.map((group, i) => {
              const t = tone(group.tone)
              const Icon = group.icon
              const list = state.data[group.key]
              return (
                <Reveal key={group.key} delay={i * 0.1} className="h-full">
                  <SpotlightCard className="panel h-full rounded-3xl p-6 text-left md:p-8">
                    <div className="mb-8 flex items-center gap-3.5">
                      <span className={`grid size-11 place-items-center rounded-xl border text-xl ${t.soft} ${t.glow}`}>
                        <Icon />
                      </span>
                      <h3 className="text-xl font-bold text-white">{group.label}</h3>
                    </div>
                    <div className="space-y-6">
                      {list.map((skill, idx) => (
                        <SkillBar key={skill.name} name={skill.name} level={skill.level} t={t} delay={idx * 0.1} />
                      ))}
                    </div>
                  </SpotlightCard>
                </Reveal>
              )
            })}
          </div>
        )}
      </div>
    </section>
  )
}
