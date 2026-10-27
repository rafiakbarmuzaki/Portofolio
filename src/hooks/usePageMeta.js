import { useEffect } from 'react'

// Judul & deskripsi tab mengikuti halaman yang sedang dibuka.
export function usePageMeta({ title, description }) {
  useEffect(() => {
    document.title = title
    if (description) document.querySelector('meta[name="description"]')?.setAttribute('content', description)
  }, [title, description])
}

// Warna aksen halaman (lihat [data-theme] di index.css). Tanpa argumen = tema bawaan (hijau).
export function useTheme(theme) {
  useEffect(() => {
    const root = document.documentElement
    if (theme) root.dataset.theme = theme
    else delete root.dataset.theme
    return () => {
      delete root.dataset.theme
    }
  }, [theme])
}
