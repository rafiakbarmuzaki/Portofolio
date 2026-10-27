// Latar: tiga bola cahaya yang melayang pelan + grid halus + noise tipis.
export default function Aurora() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-20 overflow-hidden">
      <div className="absolute -top-24 -left-24 size-[28rem] animate-float-slow rounded-full bg-accent-500/15 blur-[120px]" />
      <div className="absolute top-1/3 -right-28 size-[34rem] animate-float-reverse rounded-full bg-brand3-500/10 blur-[140px]" />
      <div className="absolute -bottom-32 left-1/4 size-[30rem] animate-float-slow rounded-full bg-brand2-500/10 blur-[120px]" />
      <div className="bg-grid absolute inset-0" />
      <div className="bg-noise absolute inset-0 opacity-[0.05] mix-blend-overlay" />
    </div>
  )
}
