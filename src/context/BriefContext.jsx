import { createContext, useCallback, useContext, useMemo, useState } from 'react'

// Menghubungkan tombol di bagian lain (kartu layanan, detail proyek) dengan form kontak:
// klik "Diskusikan" -> form terisi kebutuhan yang dipilih, lalu halaman menggulir ke form.
const BriefContext = createContext({ brief: { need: '', note: '', stamp: 0 }, startBrief: () => {} })

export function BriefProvider({ children }) {
  const [brief, setBrief] = useState({ need: '', note: '', stamp: 0 })

  const startBrief = useCallback((next = {}) => {
    setBrief({ need: '', note: '', ...next, stamp: Date.now() })
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }, [])

  const value = useMemo(() => ({ brief, startBrief }), [brief, startBrief])
  return <BriefContext value={value}>{children}</BriefContext>
}

export const useBrief = () => useContext(BriefContext)
