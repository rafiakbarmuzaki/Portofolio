// Palet nada untuk ikon, lencana, dan bar. Kelas Tailwind sengaja ditulis utuh
// (bukan disusun dari string) supaya ikut terdeteksi saat build.
export const TONES = {
  accent: {
    text: 'text-accent-400',
    soft: 'bg-accent-400/10 border-accent-500/20 text-accent-400',
    glow: 'shadow-[0_0_18px_-4px_var(--accent-500)]',
    bar: 'from-accent-500 to-accent-300',
  },
  brand2: {
    text: 'text-brand2-400',
    soft: 'bg-brand2-400/10 border-brand2-500/20 text-brand2-400',
    glow: 'shadow-[0_0_18px_-4px_var(--brand2-500)]',
    bar: 'from-brand2-500 to-brand2-400',
  },
  brand3: {
    text: 'text-brand3-400',
    soft: 'bg-brand3-400/10 border-brand3-500/20 text-brand3-400',
    glow: 'shadow-[0_0_18px_-4px_var(--brand3-500)]',
    bar: 'from-brand3-500 to-brand3-400',
  },
  violet: {
    text: 'text-violet-400',
    soft: 'bg-violet-400/10 border-violet-500/20 text-violet-400',
    glow: 'shadow-[0_0_18px_-4px_#8b5cf6]',
    bar: 'from-violet-500 to-violet-400',
  },
}

export const tone = (key) => TONES[key] ?? TONES.accent
