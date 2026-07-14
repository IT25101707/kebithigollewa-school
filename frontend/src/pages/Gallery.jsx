import { useEffect, useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Search, PlayCircle } from 'lucide-react'
import { getGallery, fileUrl } from '../services/api'
import PageTransition from '../components/PageTransition'
import { PageHero } from './About'

export default function Gallery() {
  const [items, setItems] = useState([])
  const [album, setAlbum] = useState('All')
  const [q, setQ] = useState('')
  const [active, setActive] = useState(null)

  useEffect(() => { getGallery().then(setItems) }, [])

  const albums = useMemo(() => ['All', ...new Set(items.map(i => i.album))], [items])
  const filtered = items.filter(i =>
    (album === 'All' || i.album === album) &&
    (i.title.toLowerCase().includes(q.toLowerCase()) || i.album.toLowerCase().includes(q.toLowerCase()))
  )

  return (
    <PageTransition>
      <PageHero eyebrow="Gallery" title="Memories, framed in maroon & gold."
        subtitle="Browse albums from sports meets, prize givings, cultural nights and everyday campus life." />

      <section className="mx-auto max-w-7xl px-6 py-12">
        <div className="mb-8 flex flex-wrap items-center gap-3">
          {albums.map(a => (
            <button key={a} onClick={() => setAlbum(a)}
              className={`rounded-full border px-5 py-2 text-sm font-semibold transition ${album === a ? 'border-gold bg-gold text-ink' : 'border-gold/25 hover:border-gold/60'}`}>
              {a}
            </button>
          ))}
          <label className="glass ml-auto flex items-center gap-2 !rounded-full px-4 py-2">
            <Search size={15} className="text-gold" />
            <input value={q} onChange={e => setQ(e.target.value)} placeholder="Search photos & videos…"
              className="w-44 bg-transparent text-sm outline-none placeholder:opacity-50" aria-label="Search gallery" />
          </label>
        </div>

        <div className="columns-1 gap-5 sm:columns-2 lg:columns-3 [&>*]:mb-5">
          {filtered.map((g, i) => (
            <motion.button key={g.id} onClick={() => setActive(g)}
              initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
              className="glass card-hover group relative block w-full overflow-hidden text-left">
              {g.type === 'image' ? (
                <img src={fileUrl(g.src)} alt={g.title} loading="lazy" className="w-full object-cover transition duration-700 group-hover:scale-105" />
              ) : (
                <div className="grid aspect-video place-items-center bg-maroon-deep/60">
                  <PlayCircle size={52} className="text-gold transition group-hover:scale-110" />
                </div>
              )}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/90 to-transparent p-4 opacity-0 transition group-hover:opacity-100">
                <p className="font-bold text-ivory">{g.title}</p>
                <p className="text-xs text-gold">{g.album}</p>
              </div>
            </motion.button>
          ))}
        </div>
        {!filtered.length && <p className="muted py-16 text-center">Nothing matches — try another album or search term.</p>}
      </section>

      <AnimatePresence>
        {active && (
          <motion.div className="fixed inset-0 z-[95] grid place-items-center bg-ink/90 p-4 backdrop-blur"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setActive(null)}>
            <button onClick={() => setActive(null)} aria-label="Close viewer"
              className="absolute right-6 top-6 rounded-full bg-gold p-2 text-ink transition hover:scale-110"><X size={20} /></button>
            <motion.div initial={{ scale: 0.92 }} animate={{ scale: 1 }} exit={{ scale: 0.92 }}
              className="w-full max-w-4xl" onClick={e => e.stopPropagation()}>
              {active.type === 'image'
                ? <img src={fileUrl(active.src)} alt={active.title} className="max-h-[80vh] w-full rounded-2xl object-contain" />
                : <iframe title={active.title} src={fileUrl(active.src)} className="aspect-video w-full rounded-2xl" allowFullScreen />}
              <p className="mt-4 text-center font-display text-2xl text-ivory">{active.title} <span className="text-base text-gold">— {active.album}</span></p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </PageTransition>
  )
}
