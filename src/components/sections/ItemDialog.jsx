import { FaArrowUpRightFromSquare, FaGithub, FaXmark } from 'react-icons/fa6'
import Dialog from '../ui/Dialog.jsx'
import SmartImage from '../ui/SmartImage.jsx'
import { useBrief } from '../../context/BriefContext.jsx'

// Detail proyek / gear: gambar penuh + deskripsi + ajakan untuk berdiskusi.
export default function ItemDialog({ item, cfg, onClose }) {
  const { showcase } = cfg
  const { startBrief } = useBrief()

  const invite = () => {
    onClose()
    // beri waktu dialog menutup (scroll halaman dikunci selama dialog terbuka)
    setTimeout(() => startBrief({ note: `Saya tertarik membuat sesuatu seperti "${item.title}".` }), 180)
  }

  return (
    <Dialog open={Boolean(item)} onClose={onClose} label={item?.title ?? 'Detail'} className="w-[min(94vw,60rem)]">
      {item && (
        <div className="glass max-h-[90svh] overflow-y-auto rounded-3xl bg-slate-950/90">
          <div className="relative">
            <SmartImage src={item.image} alt={item.title} fit="contain" className="h-[min(42vh,24rem)] w-full" />
            <button
              type="button"
              onClick={onClose}
              aria-label="Tutup"
              className="absolute top-4 right-4 grid size-10 place-items-center rounded-full border border-white/10 bg-slate-950/80 text-slate-200 backdrop-blur transition hover:bg-white/15 hover:text-white"
            >
              <FaXmark />
            </button>
          </div>

          <div className="space-y-5 p-6 text-left md:p-8">
            <div>
              <span className="rounded-lg border border-accent-500/20 bg-accent-500/10 px-3 py-1 text-xs font-bold tracking-wide text-accent-400 uppercase">
                {item.category}
              </span>
              <h3 className="mt-3 text-2xl font-bold text-white md:text-3xl">{item.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-300 md:text-base">{item.description}</p>
            </div>

            {item.tags.length > 0 && (
              <ul className="flex flex-wrap gap-2">
                {item.tags.map((tag) => (
                  <li key={tag} className="font-code rounded-lg border border-white/5 bg-white/5 px-3 py-1.5 text-xs text-slate-300">
                    {tag}
                  </li>
                ))}
              </ul>
            )}

            <div className="flex flex-wrap items-center gap-3 border-t border-white/5 pt-5">
              {item.demoLink && (
                <a
                  href={item.demoLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-shine inline-flex items-center gap-2 rounded-xl bg-accent-400 px-5 py-3 text-sm font-bold text-slate-950 transition hover:bg-accent-300 active:scale-95"
                >
                  {showcase.demoLabel ?? 'Buka'} <FaArrowUpRightFromSquare className="text-xs" />
                </a>
              )}
              {item.codeLink && (
                <a
                  href={item.codeLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-bold text-white transition hover:border-white/25 hover:bg-white/10"
                >
                  {showcase.codeLabel ?? 'Kode'} <FaGithub />
                </a>
              )}
              {showcase.inviteLabel && (
                <button
                  type="button"
                  onClick={invite}
                  className="inline-flex items-center gap-2 rounded-xl px-3 py-3 text-sm font-bold text-accent-400 transition hover:text-accent-300 sm:ml-auto"
                >
                  {showcase.inviteLabel} →
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </Dialog>
  )
}
