import { useEffect, useState } from 'react'
import { useLocation } from 'react-router'
import PageShell from '../components/layout/PageShell.jsx'
import Navbar from '../components/layout/Navbar.jsx'
import Footer from '../components/layout/Footer.jsx'
import FloatingCTA from '../components/layout/FloatingCTA.jsx'
import ShareDialog from '../components/share/ShareDialog.jsx'
import Marquee from '../components/ui/Marquee.jsx'
import Hero from '../components/sections/Hero.jsx'
import Stats from '../components/sections/Stats.jsx'
import About from '../components/sections/About.jsx'
import Showcase from '../components/sections/Showcase.jsx'
import Skills from '../components/sections/Skills.jsx'
import Services from '../components/sections/Services.jsx'
import Process from '../components/sections/Process.jsx'
import Experience from '../components/sections/Experience.jsx'
import Contact from '../components/sections/Contact.jsx'
import { BriefProvider } from '../context/BriefContext.jsx'
import { useSheet } from '../hooks/useSheet.js'
import { usePageMeta, useTheme } from '../hooks/usePageMeta.js'
import { parseExperience, parseItems } from '../lib/sheets.js'
import { SITE } from '../config/site.js'

// Satu halaman portofolio lengkap. Isi (IT atau Musik) ditentukan sepenuhnya oleh `cfg`.
export default function Portfolio({ cfg }) {
  useTheme(cfg.theme)
  usePageMeta(cfg.seo)

  const items = useSheet(cfg.sheets.items, parseItems, cfg.fallback.items)
  const skills = useSheet(cfg.sheets.skills, cfg.parseSkills, cfg.fallback.skills)
  const experience = useSheet(cfg.sheets.experience, parseExperience, cfg.fallback.experience)
  const [shareOpen, setShareOpen] = useState(false)
  const openShare = () => setShareOpen(true)

  // URL seperti /it#projects langsung menggulir ke section tujuan setelah halaman tampil
  const { hash } = useLocation()
  useEffect(() => {
    if (!hash) return
    const t = setTimeout(() => document.getElementById(hash.slice(1))?.scrollIntoView(), 450)
    return () => clearTimeout(t)
    // hanya saat halaman pertama kali dibuka
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const usingFallback = [items, skills, experience].some((s) => s.status === 'fallback')

  return (
    <PageShell>
      <BriefProvider>
        {import.meta.env.DEV && usingFallback && (
          <div className="font-code relative z-50 border-b border-amber-500/20 bg-amber-500/10 px-4 py-2 text-center text-xs text-amber-300">
            [dev] Sebagian data memakai cadangan: link Google Sheets gagal diambil atau kosong.
          </div>
        )}
        <Navbar nav={cfg.nav} switchTo={cfg.switchTo} onShare={openShare} />
        <main id="main">
          <Hero cfg={cfg} count={items.data.length} />
          <div className="py-4">
            <Marquee items={cfg.marquee} />
          </div>
          {cfg.stats && <Stats stats={cfg.stats} itemCount={items.data.length} />}
          <About cfg={cfg} />
          <Showcase cfg={cfg} state={items} />
          <Skills cfg={cfg} state={skills} />
          <Services cfg={cfg} />
          {cfg.process && <Process cfg={cfg} />}
          <Experience cfg={cfg} state={experience} />
          <Contact cfg={cfg} onShare={openShare} />
        </main>
        <Footer cfg={cfg} onShare={openShare} />
        <FloatingCTA label={cfg.floatingCta} />
        <ShareDialog
          open={shareOpen}
          onClose={() => setShareOpen(false)}
          url={`${SITE.url}${cfg.path}/`}
          message={`${cfg.seo.title}`}
        />
      </BriefProvider>
    </PageShell>
  )
}
