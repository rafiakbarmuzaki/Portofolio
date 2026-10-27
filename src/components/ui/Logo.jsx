export default function Logo({ initial = 'R', className = '' }) {
  return (
    <span
      className={`grid size-9 place-items-center rounded-xl bg-linear-to-br from-accent-400 to-brand2-400 font-black text-slate-950 shadow-[0_0_18px_-2px_var(--accent-500)] transition duration-300 group-hover:rotate-12 group-hover:scale-110 ${className}`}
    >
      {initial}
    </span>
  )
}
