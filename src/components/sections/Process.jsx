import SectionHeading from '../ui/SectionHeading.jsx'
import Reveal from '../ui/Reveal.jsx'

export default function Process({ cfg }) {
  const { process } = cfg

  return (
    <section id={process.id} className="relative border-y border-white/5 bg-slate-900/20 py-24 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading center kicker={process.kicker} title={process.title} />

        <ol className="relative mt-16 grid gap-10 md:grid-cols-4 md:gap-6">
          <div
            aria-hidden="true"
            className="absolute top-8 right-[12.5%] left-[12.5%] hidden h-px bg-linear-to-r from-transparent via-accent-400/40 to-transparent md:block"
          />
          {process.steps.map((step, i) => {
            const Icon = step.icon
            return (
              <Reveal as="li" key={step.title} delay={i * 0.1} className="relative text-center">
                <span className="relative mx-auto grid size-16 place-items-center rounded-2xl border border-accent-500/25 bg-slate-950 text-2xl text-accent-400 shadow-[0_0_34px_-8px_var(--accent-500)]">
                  <Icon />
                  <span className="font-code absolute -top-2 -right-2 grid size-6 place-items-center rounded-full bg-accent-400 text-[11px] font-bold text-slate-950">
                    {i + 1}
                  </span>
                </span>
                <h3 className="mt-5 text-lg font-bold text-white">{step.title}</h3>
                <p className="mx-auto mt-2 max-w-[17rem] text-sm leading-relaxed text-slate-400">{step.text}</p>
              </Reveal>
            )
          })}
        </ol>
      </div>
    </section>
  )
}
