import { lazy, Suspense, useEffect } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router'
import { AnimatePresence, motion } from 'motion/react'
import Logo from './components/ui/Logo.jsx'
import { loaders } from './routes.js'

const Landing = lazy(loaders.landing)
const ItPage = lazy(loaders.it)
const MusicPage = lazy(loaders.music)
const NotFound = lazy(loaders.notFound)

// Halaman muncul dengan fade; posisi scroll direset ke atas setiap pindah halaman
function PageTransition({ children }) {
  useEffect(() => {
    if (!window.location.hash) window.scrollTo({ top: 0, behavior: 'instant' })
  }, [])

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
      {children}
    </motion.div>
  )
}

function PageLoader() {
  return (
    <div className="grid min-h-svh place-items-center" role="status" aria-label="Memuat halaman">
      <div className="animate-pulse">
        <Logo className="size-12 text-xl" />
      </div>
    </div>
  )
}

// Link lama (it.html, musik.html) tetap berfungsi: diarahkan ke alamat baru, hash (#projects) ikut dibawa
function Redirect({ to }) {
  const { hash, search } = useLocation()
  return <Navigate to={{ pathname: to, hash, search }} replace />
}

export default function App() {
  const location = useLocation()
  const pageKey = location.pathname.replace(/\/+$/, '') || '/'

  return (
    <AnimatePresence mode="wait">
      <PageTransition key={pageKey}>
        <Suspense fallback={<PageLoader />}>
          <Routes location={location}>
            <Route path="/" element={<Landing />} />
            <Route path="/it" element={<ItPage />} />
            <Route path="/musik" element={<MusicPage />} />
            <Route path="/it.html" element={<Redirect to="/it" />} />
            <Route path="/musik.html" element={<Redirect to="/musik" />} />
            <Route path="/index.html" element={<Redirect to="/" />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </PageTransition>
    </AnimatePresence>
  )
}
