import { useMemo, useState } from 'react'
import { AnimatePresence, LayoutGroup, motion } from 'motion/react'
import { FaArrowUpRightFromSquare, FaGithub } from 'react-icons/fa6'
import SectionHeading from '../ui/SectionHeading.jsx'
import Reveal from '../ui/Reveal.jsx'
import SmartImage from '../ui/SmartImage.jsx'
import SpotlightCard from '../ui/SpotlightCard.jsx'
import ItemDialog from './ItemDialog.jsx'

const lower = (s) => s.toLowerCase()
const matches = (item, filter) =>
  lower(item.category).includes(lower(filter)) || item.tags.some((t) => lower(t).includes(lower(filter)))

function FilterChip({ label, active, onClick, groupId }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`relative rounded-xl px-5 py-2.5 text-sm font-semibold transition-colors duration-300 active:scale-95 ${
        active ? 'text-slate-950' : 'border border-white/10 bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white'
      }`}
    >
      {active && (
        <motion.span
          layoutId={`${groupId}-pill`}
          className="absolute inset-0 rounded-xl bg-accent-400 shadow-[0_0_20px_-4px_var(--accent-500)]"
          transition={{ type: 'spring', stiffness: 420, damping: 34 }}
        />
      )}
      <span className="relative font-bold">{label}</span>
    </button>
  )
}

function ItemCard({ item, showcase, onOpen }) {
  const hasLinkRow = Boolean(showcase.demoLabel)

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -60px 0px' }}
      exit={{ opacity: 0, scale: 0.92 }}
      transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
      className="h-full"
    >
      <SpotlightCard className="panel group flex h-full flex-col overflow-hidden rounded-3xl text-left transition-transform duration-500 hover:-translate-y-2 hover:shadow-[0_28px_50px_-14px_rgba(0,0,0,0.7)]">
        <button
          type="button"
          onClick={() => onOpen(item)}
          aria-label={`Lihat detail ${item.title}`}
          className="relative block aspect-[16/10] w-full overflow-hidden"
        >
          <SmartImage
            src={item.image}
            alt={item.title}
            className="size-full"
            imgClassName="transition duration-700 ease-out group-hover:scale-[1.06]"
          />
          <span className="pointer-events-none absolute inset-0 bg-linear-to-t from-slate-950/60 via-transparent to-transparent" />
          <span className="absolute top-4 left-4 rounded-xl border border-white/10 bg-slate-950/80 px-3.5 py-1.5 text-xs font-bold tracking-wide text-accent-400 uppercase backdrop-blur">
            {item.category}
          </span>
          {item.demoLink && (
            <span className="absolute top-4 right-4 flex items-center gap-2 rounded-xl border border-accent-500/30 bg-slate-950/80 px-3 py-1.5 text-xs font-bold text-accent-400 backdrop-blur">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent-400 opacity-70" />
                <span className="relative inline-flex size-2 rounded-full bg-accent-400" />
              </span>
              Live
            </span>
          )}
          <span className="absolute inset-x-0 bottom-4 flex justify-center opacity-0 transition duration-300 group-hover:opacity-100">
            <span className="glass rounded-full px-4 py-2 text-xs font-bold text-white">Lihat detail</span>
          </span>
        </button>

        <div className="flex flex-1 flex-col gap-5 p-6 md:p-7">
          <div>
            <h3 className="text-xl font-bold text-white transition-colors duration-300 group-hover:text-accent-400 md:text-2xl">
              {item.title}
            </h3>
            <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-slate-400">{item.description}</p>
          </div>

          {item.tags.length > 0 && (
            <ul className="flex flex-wrap gap-2">
              {item.tags.map((tag) => (
                <li
                  key={tag}
                  className="font-code rounded-lg border border-white/5 bg-slate-950/80 px-3 py-1.5 text-xs text-slate-300"
                >
                  {tag}
                </li>
              ))}
            </ul>
          )}

          {hasLinkRow && (
            <div className="mt-auto flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-white/5 pt-5">
              {item.demoLink ? (
                <a
                  href={item.demoLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/link flex items-center gap-1.5 text-sm font-bold text-accent-400 transition hover:text-accent-300"
                >
                  {showcase.demoLabel}
                  <FaArrowUpRightFromSquare className="text-xs transition-transform duration-300 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />
                </a>
              ) : (
                <span className="text-sm font-semibold text-slate-400">{showcase.privateLabel}</span>
              )}
              {item.codeLink && (
                <a
                  href={item.codeLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-sm font-bold text-slate-400 transition hover:text-white"
                >
                  {showcase.codeLabel}
                  <FaGithub className="text-base" />
                </a>
              )}
            </div>
          )}
        </div>
      </SpotlightCard>
    </motion.article>
  )
}

export default function Showcase({ cfg, state }) {
  const { showcase } = cfg
  const items = state.data
  const [filter, setFilter] = useState('All')
  const [selected, setSelected] = useState(null)

  // hanya tampilkan filter yang punya isi
  const filters = useMemo(
    () => ['All', ...showcase.filters.filter((f) => items.some((it) => matches(it, f)))],
    [items, showcase.filters],
  )
  const active = filters.includes(filter) ? filter : 'All'
  const visible = active === 'All' ? items : items.filter((it) => matches(it, active))

  return (
    <section id={showcase.id} className="mx-auto w-full max-w-6xl px-6 py-24 md:py-28">
      <div className="mb-12 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
        <SectionHeading kicker={showcase.kicker} title={showcase.title} />
        {filters.length > 1 && (
          <Reveal delay={0.1}>
            <LayoutGroup id={showcase.id}>
              <div role="group" aria-label="Filter kategori" className="flex flex-wrap gap-2.5">
                {filters.map((f) => (
                  <FilterChip key={f} label={f} active={active === f} groupId={showcase.id} onClick={() => setFilter(f)} />
                ))}
              </div>
            </LayoutGroup>
          </Reveal>
        )}
      </div>

      {state.status === 'loading' ? (
        <div className="grid gap-6 md:grid-cols-2" aria-busy="true">
          {[1, 2].map((i) => (
            <div key={i} className="skeleton h-[26rem] rounded-3xl" />
          ))}
        </div>
      ) : (
        <motion.div layout className="grid gap-6 md:grid-cols-2">
          <AnimatePresence mode="popLayout" initial={false}>
            {visible.map((item) => (
              <ItemCard key={item.id} item={item} showcase={showcase} onOpen={setSelected} />
            ))}
          </AnimatePresence>
        </motion.div>
      )}

      <ItemDialog item={selected} cfg={cfg} onClose={() => setSelected(null)} />
    </section>
  )
}
