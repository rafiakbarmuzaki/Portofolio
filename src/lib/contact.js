import { SITE } from '../config/site.js'

const enc = encodeURIComponent

export function buildSubject({ prefix, name, need }) {
  return `${prefix}${need ? ` · ${need}` : ''}${name ? ` — ${name}` : ''}`
}

export function buildBody({ name, need, message }) {
  const lines = [`Halo Rafi,`, '', `Saya ${name || '(nama)'}${need ? ` dan saya butuh: ${need}.` : '.'}`, '']
  if (message) lines.push(message, '')
  lines.push('Terima kasih!')
  return lines.join('\n')
}

export const mailtoUrl = (subject, body) => `mailto:${SITE.email}?subject=${enc(subject)}&body=${enc(body)}`

export const gmailUrl = (subject, body) =>
  `https://mail.google.com/mail/?view=cm&fs=1&to=${enc(SITE.email)}&su=${enc(subject)}&body=${enc(body)}`

export const whatsappUrl = (text = '') =>
  SITE.whatsapp ? `https://wa.me/${SITE.whatsapp}${text ? `?text=${enc(text)}` : ''}` : ''

export const whatsappShareUrl = (text) => `https://wa.me/?text=${enc(text)}`

export async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch {
    // fallback untuk browser / konteks yang memblokir Clipboard API
    try {
      const ta = document.createElement('textarea')
      ta.value = text
      ta.setAttribute('readonly', '')
      ta.style.cssText = 'position:fixed;opacity:0;pointer-events:none'
      document.body.appendChild(ta)
      ta.select()
      const ok = document.execCommand('copy')
      ta.remove()
      return ok
    } catch {
      return false
    }
  }
}
