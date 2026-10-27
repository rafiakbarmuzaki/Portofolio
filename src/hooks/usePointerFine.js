import { useSyncExternalStore } from 'react'

const QUERY = '(hover: hover) and (pointer: fine)'

const subscribe = (callback) => {
  const mq = window.matchMedia(QUERY)
  mq.addEventListener('change', callback)
  return () => mq.removeEventListener('change', callback)
}

// true di perangkat dengan mouse / trackpad (bukan layar sentuh)
export const useFinePointer = () =>
  useSyncExternalStore(
    subscribe,
    () => window.matchMedia(QUERY).matches,
    () => false,
  )
