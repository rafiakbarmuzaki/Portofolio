// Ambil & olah data dari Google Sheets (File → Share → Publish to web → CSV).
import Papa from 'papaparse'

const TIMEOUT_MS = 8000
const CACHE_PREFIX = 'rafi-sheet:'

const clean = (v) => (typeof v === 'string' ? v.trim() : '')
const link = (v) => {
  const s = clean(v)
  return s && s !== '#' ? s : ''
}
const toLevel = (v) => {
  const n = parseFloat(String(v ?? '').replace('%', ''))
  return Number.isFinite(n) ? Math.min(100, Math.max(0, n)) : 0
}

// Link Google Drive (…/file/d/ID/view, open?id=ID) → link gambar langsung
export function driveImg(url) {
  if (typeof url !== 'string') return url
  const m = url.match(/drive\.google\.com\/(?:file\/d\/|open\?id=|uc\?(?:[^#]*&)?id=)([\w-]+)/)
  return m ? `https://lh3.googleusercontent.com/d/${m[1]}` : url
}

// Path lokal ("./assets/x.png", "assets\x.png") → URL dari root situs, supaya aman di halaman mana pun
export function assetUrl(src) {
  if (!src) return ''
  if (/^(https?:|data:|blob:)/i.test(src)) return src
  const path = src.replace(/\\/g, '/').replace(/^\.?\/+/, '')
  const full = `${import.meta.env.BASE_URL}${path}`
  try {
    return encodeURI(decodeURI(full))
  } catch {
    return full
  }
}

// --- Parser: baris CSV → data yang dipakai komponen. Return null kalau kosong / formatnya tidak dikenali ---

// [projects] / [gear]: title | description | category | tags | image | demoLink | codeLink
export function parseItems(rows) {
  const items = rows
    .map((r, i) => ({
      id: i + 1,
      title: clean(r.title),
      description: clean(r.description),
      category: clean(r.category),
      tags: clean(r.tags)
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean),
      image: driveImg(clean(r.image)),
      demoLink: link(r.demoLink),
      codeLink: link(r.codeLink),
    }))
    .filter((item) => item.title)
  return items.length ? items : null
}

// [skills] / [musikskills]: group | name | level   (level dalam persen, contoh: 85%)
export function parseSkills(groupKeys) {
  return (rows) => {
    const grouped = Object.fromEntries(groupKeys.map((k) => [k, []]))
    for (const r of rows) {
      const group = clean(r.group).toLowerCase()
      const name = clean(r.name)
      if (grouped[group] && name) grouped[group].push({ name, level: toLevel(r.level) })
    }
    return groupKeys.some((k) => grouped[k].length) ? grouped : null
  }
}

// [experience] / [pengalaman]: year | role | company | desc
export function parseExperience(rows) {
  const list = rows
    .map((r) => ({ year: clean(r.year), role: clean(r.role), company: clean(r.company), desc: clean(r.desc) }))
    .filter((e) => e.role)
  return list.length ? list : null
}

// --- Network + cache ---
export async function fetchRows(url, outerSignal) {
  const ctrl = new AbortController()
  const timer = setTimeout(() => ctrl.abort(), TIMEOUT_MS)
  outerSignal?.addEventListener('abort', () => ctrl.abort(), { once: true })
  try {
    const res = await fetch(url, { signal: ctrl.signal })
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const text = await res.text()
    const { data } = Papa.parse(text, {
      header: true,
      skipEmptyLines: 'greedy',
      transformHeader: (h) => h.trim(),
    })
    return data
  } finally {
    clearTimeout(timer)
  }
}

export function readCache(url) {
  try {
    const raw = localStorage.getItem(CACHE_PREFIX + url)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

export function writeCache(url, rows) {
  try {
    localStorage.setItem(CACHE_PREFIX + url, JSON.stringify(rows))
  } catch {
    // penyimpanan penuh / diblokir — abaikan saja
  }
}
