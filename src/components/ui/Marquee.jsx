// Pita yang bergulir terus. Baris kedua hanya salinan visual, disembunyikan dari screen reader.
export default function Marquee({ items, speed = 50 }) {
  const row = (hidden) => (
    <ul className="marquee-track" aria-hidden={hidden || undefined}>
      {items.map(({ icon: Icon, label }, i) => (
        <li
          key={`${label}-${i}`}
          className="glass flex shrink-0 items-center gap-2.5 rounded-full px-5 py-2.5 text-sm font-semibold text-slate-300"
        >
          <Icon className="size-4 text-accent-400" />
          {label}
        </li>
      ))}
    </ul>
  )

  return (
    <div className="marquee" style={{ '--marquee-speed': `${speed}s` }}>
      {row(false)}
      {row(true)}
    </div>
  )
}
