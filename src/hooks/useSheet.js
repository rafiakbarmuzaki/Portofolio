import { useEffect, useState } from 'react'
import { fetchRows, readCache, writeCache } from '../lib/sheets.js'

// status: 'loading' (belum ada data, tampilkan skeleton) | 'ready' (data dari Sheets / cache) | 'fallback' (Sheets gagal)
// Kunjungan berikutnya langsung memakai cache lokal, lalu diam-diam diperbarui di belakang layar.
// `parse` dan `fallback` harus berupa referensi tetap (didefinisikan di level modul).
export function useSheet(url, parse, fallback) {
  const [state, setState] = useState(() => {
    const cached = readCache(url)
    const data = cached ? parse(cached) : null
    return data ? { data, status: 'ready' } : { data: fallback, status: 'loading' }
  })

  useEffect(() => {
    const ctrl = new AbortController()
    fetchRows(url, ctrl.signal)
      .then((rows) => {
        const data = parse(rows)
        if (!data) throw new Error('Sheet kosong atau formatnya tidak dikenali')
        writeCache(url, rows)
        setState({ data, status: 'ready' })
      })
      .catch((err) => {
        if (ctrl.signal.aborted) return
        console.warn('[sheet] memakai data cadangan:', err.message, url)
        setState((s) => (s.status === 'ready' ? s : { data: fallback, status: 'fallback' }))
      })
    return () => ctrl.abort()
  }, [url, parse, fallback])

  return state
}
