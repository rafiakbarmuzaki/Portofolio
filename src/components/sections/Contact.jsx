import { useEffect, useState } from 'react'
import { FaCheck, FaCopy, FaEnvelope, FaLocationDot, FaPaperPlane, FaQrcode, FaWhatsapp } from 'react-icons/fa6'
import Reveal from '../ui/Reveal.jsx'
import { SITE } from '../../config/site.js'
import { useBrief } from '../../context/BriefContext.jsx'
import { buildBody, buildSubject, copyText, gmailUrl, mailtoUrl, whatsappUrl } from '../../lib/contact.js'

const field =
  'w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-slate-400/80 transition focus:border-accent-400/60 focus:bg-white/8 focus:outline-none focus:ring-2 focus:ring-accent-400/20 aria-[invalid=true]:border-rose-400/60'
const label = 'mb-1.5 block text-xs font-semibold tracking-wider text-slate-400 uppercase'
const linkBtn =
  'font-semibold text-slate-300 underline decoration-white/20 underline-offset-4 transition hover:text-accent-400 hover:decoration-accent-400/50'

// Form brief singkat -> membuka email / WhatsApp dengan pesan yang sudah tersusun (tanpa server).
export default function Contact({ cfg, onShare }) {
  const { contact, socials } = cfg
  const { brief } = useBrief()
  const [name, setName] = useState('')
  const [need, setNeed] = useState('')
  const [message, setMessage] = useState('')
  const [errors, setErrors] = useState({})
  const [copied, setCopied] = useState('')

  // terisi otomatis ketika tombol "Diskusikan" di bagian lain ditekan
  useEffect(() => {
    if (!brief.stamp) return
    if (brief.need) setNeed(brief.need)
    if (brief.note) setMessage((m) => (m.trim() ? m : brief.note))
  }, [brief])

  const flash = (what) => {
    setCopied(what)
    setTimeout(() => setCopied(''), 2200)
  }

  // validasi sederhana, lalu susun subjek + isi pesan
  const compose = () => {
    const next = {}
    if (!name.trim()) next.name = 'Mohon isi nama Anda.'
    if (!message.trim()) next.message = 'Ceritakan sedikit kebutuhan Anda.'
    setErrors(next)
    if (Object.keys(next).length) return null
    const data = { name: name.trim(), need, message: message.trim() }
    return { subject: buildSubject({ prefix: contact.subjectPrefix, ...data }), body: buildBody(data) }
  }

  const sendEmail = (e) => {
    e.preventDefault()
    const mail = compose()
    if (mail) window.location.href = mailtoUrl(mail.subject, mail.body)
  }
  const sendWhatsApp = () => {
    const mail = compose()
    if (mail) window.open(whatsappUrl(mail.body), '_blank', 'noopener')
  }
  const openGmail = () => {
    const mail = compose()
    if (mail) window.open(gmailUrl(mail.subject, mail.body), '_blank', 'noopener')
  }
  const copyMessage = async () => {
    const mail = compose()
    if (mail && (await copyText(`Kepada: ${SITE.email}\nSubjek: ${mail.subject}\n\n${mail.body}`))) flash('message')
  }
  const copyEmail = async () => {
    if (await copyText(SITE.email)) flash('email')
  }

  return (
    <section id={contact.id} className="mx-auto w-full max-w-6xl px-6 py-24 md:py-28">
      <Reveal>
        <div className="conic-border rounded-[2rem] p-[1.5px]">
          <div className="relative overflow-hidden rounded-[calc(2rem-1.5px)] bg-slate-950 p-6 sm:p-10 lg:p-14">
            <div aria-hidden="true" className="pointer-events-none absolute -top-32 -right-24 size-96 rounded-full bg-accent-500/15 blur-[110px]" />
            <div aria-hidden="true" className="pointer-events-none absolute -bottom-32 -left-24 size-96 rounded-full bg-brand3-500/10 blur-[110px]" />

            <div className="relative grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
              <div className="text-left">
                <span className="font-code inline-flex items-center gap-2 rounded-full border border-accent-500/20 bg-accent-500/10 px-3.5 py-1.5 text-xs font-semibold tracking-wider text-accent-400 uppercase">
                  <span className="relative flex size-2.5">
                    <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent-400 opacity-70" />
                    <span className="relative inline-flex size-2.5 rounded-full bg-accent-400" />
                  </span>
                  {contact.status}
                </span>
                <h2 className="mt-6 text-3xl leading-tight font-bold text-balance text-white md:text-5xl">{contact.title}</h2>
                <p className="mt-4 max-w-md text-base leading-relaxed text-pretty text-slate-400">{contact.text}</p>

                <ul className="mt-8 space-y-3">
                  <li className="flex items-center gap-3.5">
                    <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-white/5 text-accent-400">
                      <FaEnvelope />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-semibold tracking-wider text-slate-400 uppercase">Email</p>
                      <a href={`mailto:${SITE.email}`} className="block truncate text-sm font-semibold text-white transition hover:text-accent-400">
                        {SITE.email}
                      </a>
                    </div>
                    <button
                      type="button"
                      onClick={copyEmail}
                      aria-label="Salin alamat email"
                      title="Salin email"
                      className="grid size-9 shrink-0 place-items-center rounded-lg border border-white/10 text-slate-400 transition hover:border-accent-400/40 hover:text-accent-400"
                    >
                      {copied === 'email' ? <FaCheck className="text-accent-400" /> : <FaCopy />}
                    </button>
                  </li>
                  {SITE.whatsapp && (
                    <li className="flex items-center gap-3.5">
                      <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-white/5 text-[#25D366]">
                        <FaWhatsapp />
                      </span>
                      <div className="min-w-0">
                        <p className="text-xs font-semibold tracking-wider text-slate-400 uppercase">WhatsApp</p>
                        <a
                          href={whatsappUrl('Halo Rafi, saya melihat portofolio Anda.')}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block text-sm font-semibold text-white transition hover:text-accent-400"
                        >
                          Chat sekarang
                        </a>
                      </div>
                    </li>
                  )}
                  <li className="flex items-center gap-3.5">
                    <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-white/5 text-accent-400">
                      <FaLocationDot />
                    </span>
                    <div>
                      <p className="text-xs font-semibold tracking-wider text-slate-400 uppercase">Lokasi</p>
                      <p className="text-sm font-semibold text-white">{SITE.location}</p>
                    </div>
                  </li>
                </ul>

                <div className="mt-8 flex flex-wrap items-center gap-3">
                  {socials.map(({ label: name, href, icon: Icon }) => (
                    <a
                      key={name}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={name}
                      title={name}
                      className="grid size-11 place-items-center rounded-xl border border-white/10 bg-white/5 text-slate-300 transition hover:-translate-y-1 hover:border-accent-400/40 hover:text-accent-400"
                    >
                      <Icon className="text-lg" />
                    </a>
                  ))}
                  <button
                    type="button"
                    onClick={onShare}
                    className="flex h-11 items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 text-sm font-semibold text-slate-300 transition hover:-translate-y-1 hover:border-accent-400/40 hover:text-accent-400"
                  >
                    <FaQrcode /> Bagikan / QR
                  </button>
                </div>
              </div>

              <form onSubmit={sendEmail} noValidate className="glass rounded-3xl bg-slate-900/50 p-6 text-left sm:p-8">
                <h3 className="text-lg font-bold text-white">Ceritakan kebutuhan Anda</h3>
                <p className="mt-1 text-sm text-slate-400">Cukup beberapa baris. Detailnya kita bahas bersama.</p>

                <div className="mt-6 space-y-5">
                  <div>
                    <label htmlFor="contact-name" className={label}>
                      Nama
                    </label>
                    <input
                      id="contact-name"
                      name="name"
                      autoComplete="name"
                      placeholder="Nama Anda"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      aria-invalid={Boolean(errors.name)}
                      aria-describedby={errors.name ? 'contact-name-error' : undefined}
                      className={field}
                    />
                    {errors.name && (
                      <p id="contact-name-error" role="alert" className="mt-1.5 text-xs text-rose-400">
                        {errors.name}
                      </p>
                    )}
                  </div>

                  <fieldset>
                    <legend className={label}>Saya butuh</legend>
                    <div className="flex flex-wrap gap-2">
                      {contact.needs.map((n) => (
                        <button
                          key={n}
                          type="button"
                          aria-pressed={need === n}
                          onClick={() => setNeed(need === n ? '' : n)}
                          className={`rounded-full border px-4 py-2 text-sm font-semibold transition active:scale-95 ${
                            need === n
                              ? 'border-accent-400 bg-accent-400 text-slate-950'
                              : 'border-white/10 bg-white/5 text-slate-300 hover:border-white/25 hover:text-white'
                          }`}
                        >
                          {n}
                        </button>
                      ))}
                    </div>
                  </fieldset>

                  <div>
                    <label htmlFor="contact-message" className={label}>
                      Pesan
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      rows={4}
                      placeholder={contact.placeholder}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      aria-invalid={Boolean(errors.message)}
                      aria-describedby={errors.message ? 'contact-message-error' : undefined}
                      className={`${field} resize-y`}
                    />
                    {errors.message && (
                      <p id="contact-message-error" role="alert" className="mt-1.5 text-xs text-rose-400">
                        {errors.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <button
                    type="submit"
                    className="btn-shine group inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-accent-400 px-6 py-3.5 text-sm font-bold text-slate-950 shadow-lg shadow-accent-500/25 transition hover:-translate-y-0.5 hover:bg-accent-300 active:scale-95"
                  >
                    Kirim lewat Email
                    <FaPaperPlane className="transition group-hover:translate-x-1 group-hover:-translate-y-0.5" />
                  </button>
                  {SITE.whatsapp && (
                    <button
                      type="button"
                      onClick={sendWhatsApp}
                      className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-6 py-3.5 text-sm font-bold text-white transition hover:border-white/25 hover:bg-white/10 active:scale-95"
                    >
                      <FaWhatsapp className="size-5 text-[#25D366]" />
                      Chat WhatsApp
                    </button>
                  )}
                </div>

                <p className="mt-4 text-xs leading-relaxed text-slate-400" aria-live="polite">
                  Pesan akan terbuka di aplikasi email Anda, tinggal kirim. Tidak terbuka?{' '}
                  <button type="button" onClick={openGmail} className={linkBtn}>
                    Buka Gmail
                  </button>{' '}
                  atau{' '}
                  <button type="button" onClick={copyMessage} className={linkBtn}>
                    {copied === 'message' ? 'pesan tersalin ✓' : 'salin pesan'}
                  </button>
                  .
                </p>
              </form>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  )
}
