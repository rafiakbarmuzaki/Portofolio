import { useEffect, useState } from 'react'
import { QRCodeSVG } from 'qrcode.react'
import { FaCheck, FaCopy, FaShareNodes, FaWhatsapp, FaXmark } from 'react-icons/fa6'
import Dialog from '../ui/Dialog.jsx'
import { copyText, whatsappShareUrl } from '../../lib/contact.js'

// Kode QR + tombol bagikan: dipakai untuk mengundang orang lain membuka portofolio ini.
export default function ShareDialog({ open, onClose, url, message }) {
  const [copied, setCopied] = useState(false)
  const canShare = typeof navigator !== 'undefined' && typeof navigator.share === 'function'

  useEffect(() => {
    if (!open) setCopied(false)
  }, [open])

  const copy = async () => {
    if (await copyText(url)) {
      setCopied(true)
      setTimeout(() => setCopied(false), 2200)
    }
  }

  const share = () => navigator.share({ title: message, url }).catch(() => {})

  return (
    <Dialog open={open} onClose={onClose} label="Bagikan portofolio" className="w-[min(92vw,26rem)]">
      <div className="glass relative rounded-3xl bg-slate-950/90 p-6 text-center md:p-8">
        <button
          type="button"
          onClick={onClose}
          aria-label="Tutup"
          className="absolute top-4 right-4 grid size-9 place-items-center rounded-full text-slate-400 transition hover:bg-white/10 hover:text-white"
        >
          <FaXmark />
        </button>

        <h2 className="text-xl font-bold text-white">Bagikan portofolio ini</h2>
        <p className="mx-auto mt-1.5 max-w-xs text-sm text-slate-400">
          Scan dengan kamera HP, atau kirim link-nya ke calon client dan rekan Anda.
        </p>

        <div className="mx-auto mt-6 w-fit rounded-2xl bg-white p-4 shadow-[0_0_60px_-10px_var(--accent-500)]">
          <QRCodeSVG value={url} size={176} level="M" marginSize={0} fgColor="#020617" bgColor="#ffffff" title={`Kode QR untuk ${url}`} />
        </div>

        <p className="font-code mt-5 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs break-all text-slate-300">
          {url}
        </p>

        <div className="mt-5 grid gap-2.5">
          <button
            type="button"
            onClick={copy}
            className="flex items-center justify-center gap-2 rounded-xl bg-accent-400 px-5 py-3 text-sm font-bold text-slate-950 transition hover:bg-accent-300 active:scale-95"
          >
            {copied ? <FaCheck /> : <FaCopy />}
            <span aria-live="polite">{copied ? 'Link tersalin!' : 'Salin link'}</span>
          </button>
          <div className={`grid gap-2.5 ${canShare ? 'grid-cols-2' : 'grid-cols-1'}`}>
            <a
              href={whatsappShareUrl(`${message}\n${url}`)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-white transition hover:border-white/25 hover:bg-white/10"
            >
              <FaWhatsapp className="size-4 text-[#25D366]" /> WhatsApp
            </a>
            {canShare && (
              <button
                type="button"
                onClick={share}
                className="flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-white transition hover:border-white/25 hover:bg-white/10"
              >
                <FaShareNodes className="size-4" /> Lainnya
              </button>
            )}
          </div>
        </div>
      </div>
    </Dialog>
  )
}
