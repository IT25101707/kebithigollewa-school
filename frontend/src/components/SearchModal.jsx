import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, CornerDownLeft } from 'lucide-react'
import { NEWS, EVENTS, DOWNLOADS, CLUBS, GALLERY } from '../data/mockData'

const INDEX = [
  ...NEWS.map(n => ({ label: n.title, hint: 'News', to: '/news-events' })),
  ...EVENTS.map(e => ({ label: e.title, hint: 'Event', to: '/news-events' })),
  ...DOWNLOADS.map(d => ({ label: d.name, hint: 'Download', to: '/downloads' })),
  ...CLUBS.map(c => ({ label: c.name, hint: 'Club', to: '/student-life' })),
  ...GALLERY.map(g => ({ label: g.title, hint: 'Gallery', to: '/gallery' })),
  { label: 'Admissions', hint: 'Page', to: '/about' },
  { label: 'Academic calendar', hint: 'Page', to: '/academics' },
  { label: 'Contact the school', hint: 'Page', to: '/contact' },
  { label: 'Results portal', hint: 'Portal', to: '/login' }
]

export default function SearchModal({ open, onClose }) {
  const [q, setQ] = useState('')
  const navigate = useNavigate()
  const results = useMemo(() => {
    if (!q.trim()) return INDEX.slice(0, 6)
    return INDEX.filter(i => i.label.toLowerCase().includes(q.toLowerCase())).slice(0, 8)
  }, [q])

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  const go = (to) => { onClose(); setQ(''); navigate(to) }

  return (
    <AnimatePresence>
      {open && (
        <motion.div className="fixed inset-0 z-[95] grid place-items-start justify-center bg-ink/70 p-4 pt-[12vh] backdrop-blur-sm"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}>
          <motion.div className="glass w-full max-w-xl overflow-hidden !rounded-3xl" onClick={e => e.stopPropagation()}
            initial={{ y: -24, scale: 0.97 }} animate={{ y: 0, scale: 1 }} exit={{ y: -24, opacity: 0 }}>
            <div className="flex items-center gap-3 border-b border-gold/15 px-5 py-4">
              <Search size={18} className="text-gold" />
              <input autoFocus value={q} onChange={e => setQ(e.target.value)}
                placeholder="Search news, events, downloads, clubs…"
                className="w-full bg-transparent outline-none placeholder:opacity-50" />
              <kbd className="rounded border border-gold/20 px-1.5 py-0.5 text-[10px] opacity-60">ESC</kbd>
            </div>
            <ul className="max-h-72 overflow-y-auto p-2">
              {results.map((r, i) => (
                <li key={i}>
                  <button onClick={() => go(r.to)} className="flex w-full items-center justify-between rounded-xl px-4 py-3 text-left text-sm transition hover:bg-gold/10">
                    <span>{r.label}</span>
                    <span className="flex items-center gap-2 text-xs text-gold"><span className="opacity-70">{r.hint}</span><CornerDownLeft size={13} /></span>
                  </button>
                </li>
              ))}
              {!results.length && <li className="px-4 py-6 text-center text-sm opacity-60">No matches — try “sports”, “timetable” or “admission”.</li>}
            </ul>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
