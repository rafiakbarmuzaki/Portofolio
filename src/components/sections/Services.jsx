import { FaArrowRight } from 'react-icons/fa6'
import SectionHeading from '../ui/SectionHeading.jsx'
import Reveal from '../ui/Reveal.jsx'
import SpotlightCard from '../ui/SpotlightCard.jsx'
import { tone } from '../ui/tones.js'
import { useBrief } from '../../context/BriefContext.jsx'

// Kartu layanan. Tombolnya mengisi form kontak dengan kebutuhan yang dipilih lalu menggulir ke sana.
export default function Services({ cfg }) {
  const { services } = cfg
  const { startBrief } = useBrief()

  return (
    <section id={services.id} className="mx-auto w-full max-w-6xl px-6 py-24 md:py-28">
      <SectionHeading center kicker={services.kicker} title={services.title} subtitle={services.subtitle} />

      <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {services.items.map((s, i) => {
          const t = tone(s.tone)
          const Icon = s.icon
          return (
            <Reveal key={s.title} delay={i * 0.08} className="h-full">
              <SpotlightCard className="panel group flex h-full flex-col rounded-3xl p-6 text-left transition-transform duration-500 hover:-translate-y-1.5">
                <span
                  className={`grid size-12 place-items-center rounded-2xl border text-xl transition duration-300 group-hover:scale-110 ${t.soft} ${t.glow}`}
                >
                  <Icon />
                </span>
                <h3 className="mt-6 text-lg font-bold text-white">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">{s.text}</p>
                {s.examples && (
                  <p className="mt-4 text-xs leading-relaxed text-slate-400">
                    <span className="font-semibold text-slate-300">Contoh: </span>
                    {s.examples}
                  </p>
                )}
                <button
                  type="button"
                  onClick={() => startBrief({ need: s.need })}
                  className={`mt-auto flex items-center gap-2 pt-6 text-sm font-bold transition-all duration-300 ${t.text} group-hover:gap-3`}
                >
                  {services.cta}
                  <FaArrowRight className="text-xs" />
                </button>
              </SpotlightCard>
            </Reveal>
          )
        })}
      </div>
    </section>
  )
}
