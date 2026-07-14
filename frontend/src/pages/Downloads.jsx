import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { FileText, Download as DownloadIcon, Search } from 'lucide-react'
import { getDownloads, fileUrl } from '../services/api'
import PageTransition from '../components/PageTransition'
import { PageHero } from './About'

export default function Downloads() {
  const [files, setFiles] = useState([])
  const [cat, setCat] = useState('All')
  const [q, setQ] = useState('')

  useEffect(() => { getDownloads().then(setFiles) }, [])
  const cats = useMemo(() => ['All', ...new Set(files.map(f => f.category))], [files])
  const filtered = files.filter(f =>
    (cat === 'All' || f.category === cat) && f.name.toLowerCase().includes(q.toLowerCase()))

  return (
    <PageTransition>
      <PageHero eyebrow="Downloads" title="Forms, papers & timetables."
        subtitle="Admission forms, school letters, term-test papers and assignment sheets — everything in one place." />

      <section className="mx-auto max-w-5xl px-6 py-12">
        <div className="mb-8 flex flex-wrap items-center gap-3">
          {cats.map(c => (
            <button key={c} onClick={() => setCat(c)}
              className={`rounded-full border px-5 py-2 text-sm font-semibold transition ${cat === c ? 'border-gold bg-gold text-ink' : 'border-gold/25 hover:border-gold/60'}`}>
              {c}
            </button>
          ))}
          <label className="glass ml-auto flex items-center gap-2 !rounded-full px-4 py-2">
            <Search size={15} className="text-gold" />
            <input value={q} onChange={e => setQ(e.target.value)} placeholder="Search files…"
              className="w-40 bg-transparent text-sm outline-none placeholder:opacity-50" aria-label="Search downloads" />
          </label>
        </div>
        <div className="space-y-3">
          {filtered.map((f, i) => (
            <motion.div key={f.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
              className="glass card-hover flex items-center gap-4 px-6 py-4">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-maroon to-maroon-deep text-gold-soft"><FileText size={20} /></span>
              <div className="min-w-0 flex-1">
                <p className="truncate font-bold">{f.name}</p>
                <p className="muted text-xs">{f.category} · {f.type} · {f.size}</p>
              </div>
              {f.file_url ? (
                <a href={fileUrl(f.file_url)} target="_blank" rel="noreferrer" download
                  className="btn-gold !px-4 !py-2 text-xs"><DownloadIcon size={14} /> Download</a>
              ) : (
                <button onClick={() => alert('The admin has not attached a file to this item yet. Sign in to the Admin portal → Downloads to upload it.')}
                  className="btn-gold !px-4 !py-2 text-xs"><DownloadIcon size={14} /> Download</button>
              )}
            </motion.div>
          ))}
          {!filtered.length && <p className="muted py-14 text-center">No files match your search.</p>}
        </div>
      </section>
    </PageTransition>
  )
}
