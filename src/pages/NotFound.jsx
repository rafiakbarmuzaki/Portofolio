import { Link } from 'react-router'
import PageShell from '../components/layout/PageShell.jsx'
import Button from '../components/ui/Button.jsx'
import { usePageMeta, useTheme } from '../hooks/usePageMeta.js'

export default function NotFound() {
  useTheme()
  usePageMeta({ title: 'Halaman tidak ditemukan — Rafi Akbar Muzaki' })

  return (
    <PageShell>
      <main id="main" className="mx-auto flex min-h-svh max-w-3xl flex-col items-center justify-center px-6 text-center">
        <p className="font-code text-sm font-bold tracking-widest text-accent-400">ERROR 404</p>
        <h1 className="text-gradient mt-4 text-8xl font-extrabold md:text-9xl">404</h1>
        <p className="mt-4 text-xl font-bold text-white">Halaman ini tidak ditemukan.</p>
        <p className="mt-2 max-w-md text-slate-400">
          Mungkin link-nya sudah berubah. Silakan pilih portofolio yang ingin Anda lihat:
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button as={Link} to="/it">
            Portofolio IT
          </Button>
          <Button as={Link} to="/musik" variant="ghost">
            Portofolio Musik
          </Button>
          <Button as={Link} to="/" variant="ghost">
            Beranda
          </Button>
        </div>
      </main>
    </PageShell>
  )
}
