// Dijalankan otomatis setelah `vite build` (lihat "build" di package.json).
//
// GitHub Pages hanya menyajikan file statis. Supaya alamat seperti /it, /musik, dan link lama
// (it.html, musik.html) tetap bisa dibuka langsung, skrip ini membuat salinan index.html untuk
// tiap rute — masing-masing dengan judul, deskripsi, dan preview link (WhatsApp, LinkedIn, dst.)
// yang sesuai. Aplikasi React lalu mengambil alih di browser.
//
// Judul & deskripsi diambil dari src/config/*.js, jadi cukup diedit di satu tempat.
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import it from '../src/config/it.js'
import music from '../src/config/music.js'
import { SITE } from '../src/config/site.js'

const dist = fileURLToPath(new URL('../dist/', import.meta.url))
const base = await readFile(`${dist}index.html`, 'utf8')

const esc = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;')

function rewrite(html, { title, description, url }) {
  const meta = (key) => new RegExp(`(<meta\\s+(?:name|property)="${key}"\\s+content=")[^"]*(")`)
  const rules = [
    [/<title>[^<]*<\/title>/, `<title>${esc(title)}</title>`],
    [/(<link rel="canonical" href=")[^"]*(")/, `$1${url}$2`],
    [meta('description'), `$1${esc(description)}$2`],
    [meta('og:title'), `$1${esc(title)}$2`],
    [meta('og:description'), `$1${esc(description)}$2`],
    [meta('og:url'), `$1${url}$2`],
    [meta('twitter:title'), `$1${esc(title)}$2`],
    [meta('twitter:description'), `$1${esc(description)}$2`],
    [meta('twitter:url'), `$1${url}$2`],
  ]
  return rules.reduce((out, [pattern, replacement]) => {
    if (!pattern.test(out)) throw new Error(`Tag tidak ditemukan di index.html: ${pattern}`)
    return out.replace(pattern, replacement)
  }, html)
}

const pages = [
  { dir: 'it', cfg: it },
  { dir: 'musik', cfg: music },
]

for (const { dir, cfg } of pages) {
  const html = rewrite(base, { ...cfg.seo, url: `${SITE.url}/${dir}/` })
  await mkdir(`${dist}${dir}`, { recursive: true })
  await writeFile(`${dist}${dir}/index.html`, html) // /it/
  await writeFile(`${dist}${dir}.html`, html) // link lama: /it.html (router mengarahkannya ke /it)
}

// alamat yang tidak dikenal -> halaman 404 buatan sendiri (ditangani React)
await writeFile(`${dist}404.html`, base)

console.log(`✓ postbuild: ${pages.length} rute + 404.html dibuat di dist/`)
