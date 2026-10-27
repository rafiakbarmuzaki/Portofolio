import { Link } from 'react-router'
import { FaArrowUp, FaQrcode } from 'react-icons/fa6'
import { SITE } from '../../config/site.js'

const iconBtn =
  'grid size-11 place-items-center rounded-xl border border-white/10 bg-slate-900 text-slate-400 transition-all duration-300 hover:-translate-y-1 hover:border-accent-400/30 hover:text-accent-400'

export default function Footer({ cfg, onShare }) {
  const { switchTo, socials } = cfg
  const SwitchIcon = switchTo.icon

  return (
    <footer className="relative border-t border-white/5 bg-slate-950/70 py-12">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-8 px-6 md:flex-row">
        <div className="text-center md:text-left">
          <Link to="/" className="text-xl font-bold tracking-tight text-white transition hover:text-accent-400">
            RAFI<span className="text-accent-400">.</span>
          </Link>
          <p className="mt-1.5 text-xs text-slate-400">
            © {new Date().getFullYear()} {SITE.name}. All rights reserved.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link to={switchTo.to} className={iconBtn} title={switchTo.label} aria-label={switchTo.label}>
            <SwitchIcon className="text-lg" />
          </Link>
          {socials.map(({ label, href, icon: Icon }) => (
            <a key={label} href={href} target="_blank" rel="noopener noreferrer" className={iconBtn} title={label} aria-label={label}>
              <Icon className="text-lg" />
            </a>
          ))}
          <button type="button" onClick={onShare} className={iconBtn} title="Bagikan / kode QR" aria-label="Bagikan portofolio">
            <FaQrcode className="text-lg" />
          </button>
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className={iconBtn}
            title="Kembali ke atas"
            aria-label="Kembali ke atas"
          >
            <FaArrowUp className="text-lg" />
          </button>
        </div>
      </div>
    </footer>
  )
}
