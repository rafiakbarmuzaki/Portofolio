import CountUp from '../ui/CountUp.jsx'
import Reveal from '../ui/Reveal.jsx'
import SpotlightCard from '../ui/SpotlightCard.jsx'

export default function Stats({ stats, itemCount }) {
  return (
    <section aria-label="Ringkasan" className="relative py-10">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-4 px-6 md:grid-cols-4">
        {stats.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.08}>
            <SpotlightCard className="panel group h-full rounded-3xl p-6 text-center transition-colors duration-300 hover:bg-slate-900/60">
              <div
                className={`text-4xl font-extrabold transition-colors duration-300 md:text-5xl ${
                  s.highlight ? 'text-accent-400' : 'text-white group-hover:text-accent-400'
                }`}
              >
                {s.text ?? <CountUp to={s.fromItems ? itemCount : s.value} suffix={s.suffix} />}
              </div>
              <p className="mt-2 text-sm font-medium text-slate-400">{s.label}</p>
            </SpotlightCard>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
