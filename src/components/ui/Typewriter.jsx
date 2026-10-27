import { useEffect, useState } from 'react'
import { useReducedMotion } from 'motion/react'

// Mengetik lalu menghapus daftar kata secara bergantian.
export default function Typewriter({ words, typeSpeed = 80, eraseSpeed = 40, hold = 1600 }) {
  const reduce = useReducedMotion()
  const [index, setIndex] = useState(0)
  const [text, setText] = useState('')
  const [erasing, setErasing] = useState(false)
  const word = words[index % words.length]

  useEffect(() => {
    if (reduce) return
    let timer
    if (!erasing && text === word) {
      timer = setTimeout(() => setErasing(true), hold)
    } else if (erasing && text === '') {
      setErasing(false)
      setIndex((i) => i + 1)
    } else {
      timer = setTimeout(
        () => setText(word.slice(0, text.length + (erasing ? -1 : 1))),
        erasing ? eraseSpeed : typeSpeed,
      )
    }
    return () => clearTimeout(timer)
  }, [text, erasing, word, reduce, typeSpeed, eraseSpeed, hold])

  if (reduce) return <span className="text-accent-400">{words[0]}</span>

  return (
    <>
      <span className="sr-only">{words.join(', ')}</span>
      <span aria-hidden="true" className="text-accent-400">
        {text}
        <span className="ml-0.5 inline-block h-[0.85em] w-[3px] translate-y-[0.1em] bg-accent-400 [animation:blink_0.75s_step-end_infinite]" />
      </span>
    </>
  )
}
