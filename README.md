# Portofolio Rafi Akbar Muzaki

Situs portofolio (IT & Musik) berbasis **React + Vite + Tailwind CSS**, di-hosting di GitHub Pages
(`rafiakbarmuzaki.my.id`). Konten proyek, skill, dan pengalaman diambil dari Google Sheets.

## Menjalankan di komputer

```bash
npm install
npm run dev        # buka http://localhost:5173
npm run build      # hasil build ada di folder dist/
npm run preview    # coba hasil build
```

Butuh Node.js 20.19 atau lebih baru.

## Halaman

| Alamat   | Isi                                   | Konfigurasi            |
| -------- | ------------------------------------- | ---------------------- |
| `/`      | Pilihan portofolio                    | `src/pages/Landing.jsx` |
| `/it`    | Portofolio IT                         | `src/config/it.js`     |
| `/musik` | Portofolio Musik                      | `src/config/music.js`  |

Link lama `it.html` dan `musik.html` otomatis diarahkan ke alamat baru.

## Mengubah isi

- **Kontak, WhatsApp, sosmed** → `src/config/site.js`. Isi `whatsapp` (format `6281234567890`) agar tombol
  WhatsApp muncul di hero, form kontak, dan tombol melayang.
- **Teks hero, tentang, layanan, alur kerja, form kontak** → `src/config/it.js` / `src/config/music.js`.
- **Proyek, skill, pengalaman** → Google Sheets (tidak perlu menyentuh kode). Struktur kolom setiap tab
  tertulis di komentar bagian atas file config. Kalau Sheets gagal diambil, situs memakai salinan data
  di `fallback` pada file config yang sama.
- **Foto & gambar** → taruh di `public/assets/`, lalu tulis di Sheets sebagai `./assets/nama-file.png`.
- **Warna** → variabel `--accent-*` di `src/index.css` (hijau untuk IT, oranye untuk Musik).

## Deploy (GitHub Pages)

Sekali saja, buka **Settings → Pages → Build and deployment → Source** lalu pilih **GitHub Actions**.
Setelah itu setiap `git push` ke `main` akan membangun dan menerbitkan situs otomatis
(lihat `.github/workflows/deploy.yml`).

> Jangan biarkan Source di "Deploy from a branch": situs React harus dibangun dulu, kalau tidak
> yang tampil hanya halaman kosong.

## Struktur

```
public/            file statis apa adanya (assets/, CNAME, favicon, og-image, robots, sitemap)
scripts/           postbuild.mjs → salinan HTML per rute untuk GitHub Pages
src/config/        isi & teks tiap halaman
src/components/    sections/ (bagian halaman), ui/, fx/ (efek), layout/
src/pages/         Landing, Portfolio (dipakai IT & Musik), NotFound
```
