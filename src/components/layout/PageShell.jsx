import Aurora from '../fx/Aurora.jsx'
import CursorGlow from '../fx/CursorGlow.jsx'

// Pembungkus setiap halaman: latar aurora + cahaya kursor.
// `isolate` membuat lapisan z-index tersendiri; `overflow-x-clip` mencegah geser horizontal
// tanpa merusak elemen sticky (berbeda dengan overflow-hidden).
export default function PageShell({ children }) {
  return (
    <div className="relative isolate min-h-svh overflow-x-clip">
      <a
        href="#main"
        className="sr-only z-50 rounded-xl bg-accent-400 px-4 py-2.5 text-sm font-bold text-slate-950 focus:not-sr-only focus:fixed focus:top-4 focus:left-4"
      >
        Lewati ke konten
      </a>
      <Aurora />
      <CursorGlow />
      {children}
    </div>
  )
}
