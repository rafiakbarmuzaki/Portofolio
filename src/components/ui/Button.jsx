const base =
  'group inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-sm font-bold transition-all duration-300 active:scale-95'

const variants = {
  primary:
    'btn-shine bg-accent-400 text-slate-950 shadow-lg shadow-accent-500/25 hover:-translate-y-0.5 hover:bg-accent-300 hover:shadow-accent-400/40',
  ghost: 'border border-white/10 bg-white/5 text-white backdrop-blur hover:border-white/25 hover:bg-white/10',
}

// `as` bisa 'a' (default), 'button', atau komponen Link.
export default function Button({ as: Tag = 'a', variant = 'primary', className = '', children, ...props }) {
  return (
    <Tag className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </Tag>
  )
}
