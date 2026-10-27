import { useEffect, useRef, useState } from 'react'
import { FaImage } from 'react-icons/fa6'
import { assetUrl } from '../../lib/sheets.js'

// Gambar yang memilih sendiri cara tampilnya:
//  - landscape biasa -> `cover` memenuhi bingkai
//  - potret / kotak / sangat lebar -> `contain` utuh di atas latar blur dari gambar itu sendiri
// Kalau gagal dimuat, tampil placeholder lokal (tanpa layanan eksternal).
export default function SmartImage({
  src,
  alt,
  fit = 'auto',
  position = '50% 50%',
  priority = false,
  className = '',
  imgClassName = '',
}) {
  const url = assetUrl(src)
  const imgRef = useRef(null)
  const [mode, setMode] = useState(fit === 'auto' ? 'cover' : fit)
  const [loaded, setLoaded] = useState('')
  const [failed, setFailed] = useState('')

  const handleLoad = (img) => {
    const { naturalWidth: w, naturalHeight: h } = img
    if (fit === 'auto' && w && h) {
      const ratio = w / h
      setMode(ratio >= 1.3 && ratio <= 2.3 ? 'cover' : 'contain')
    }
    setLoaded(url)
  }

  // gambar yang sudah ada di cache bisa selesai sebelum onLoad terpasang
  useEffect(() => {
    const img = imgRef.current
    if (img?.complete && img.naturalWidth) handleLoad(img)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url])

  if (!url || failed === url) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`grid place-items-center bg-linear-to-br from-slate-900 to-slate-950 ${className}`}
      >
        <div className="flex flex-col items-center gap-2 px-4 text-center">
          <FaImage className="size-8 text-accent-400/50" />
          <span className="text-xs font-semibold text-slate-400">{alt}</span>
        </div>
      </div>
    )
  }

  const isLoaded = loaded === url

  return (
    <div className={`relative overflow-hidden bg-slate-950 ${className}`}>
      {mode === 'contain' && isLoaded && (
        <img
          aria-hidden="true"
          src={url}
          alt=""
          className="absolute inset-0 size-full scale-125 object-cover opacity-45 blur-2xl"
        />
      )}
      <img
        ref={imgRef}
        src={url}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : undefined}
        decoding="async"
        onLoad={(e) => handleLoad(e.currentTarget)}
        onError={() => setFailed(url)}
        style={{ objectPosition: position }}
        className={`relative size-full transition duration-700 ${
          mode === 'contain' ? 'object-contain p-3' : 'object-cover'
        } ${isLoaded ? 'opacity-100' : 'opacity-0'} ${imgClassName}`}
      />
      {!isLoaded && <div className="skeleton absolute inset-0" />}
    </div>
  )
}
