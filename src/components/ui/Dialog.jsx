import { useEffect, useRef } from 'react'

// Modal memakai elemen <dialog> bawaan browser: focus trap, tombol Esc, dan backdrop sudah ditangani.
export default function Dialog({ open, onClose, label, className = '', children }) {
  const ref = useRef(null)

  useEffect(() => {
    const dialog = ref.current
    if (!dialog) return
    if (open && !dialog.open) dialog.showModal()
    else if (!open && dialog.open) dialog.close()
  }, [open])

  return (
    <dialog
      ref={ref}
      aria-label={label}
      onClose={onClose}
      onClick={(e) => {
        if (e.target === ref.current) onClose()
      }}
      className={`overflow-visible bg-transparent p-0 ${className}`}
    >
      {open ? children : null}
    </dialog>
  )
}
