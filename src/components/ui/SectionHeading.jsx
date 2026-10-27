import Reveal from './Reveal.jsx'

export default function SectionHeading({ kicker, title, subtitle, center = false, className = '' }) {
  return (
    <Reveal className={`max-w-2xl ${center ? 'mx-auto text-center' : 'text-left'} ${className}`}>
      <span className="inline-block rounded-full border border-accent-500/20 bg-accent-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-accent-400">
        {kicker}
      </span>
      <h2 className="mt-4 text-3xl font-bold leading-tight text-balance text-white md:text-5xl">{title}</h2>
      {subtitle && <p className="mt-3 text-base text-pretty text-slate-400">{subtitle}</p>}
    </Reveal>
  )
}
