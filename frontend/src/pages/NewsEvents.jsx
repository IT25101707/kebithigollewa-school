import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { CalendarDays } from 'lucide-react'
import { getNews, getEvents, fileUrl } from '../services/api'
import PageTransition from '../components/PageTransition'
import SectionHeading from '../components/SectionHeading'
import { PageHero } from './About'

const CATS = ['All', 'Achievements', 'Academics', 'Events', 'Sports', 'Culture', 'Service']

export default function NewsEvents() {
  const [news, setNews] = useState([])
  const [events, setEvents] = useState([])
  const [cat, setCat] = useState('All')

  useEffect(() => {
    getNews().then(setNews)
    getEvents().then(setEvents)
  }, [])

  const filtered = cat === 'All' ? news : news.filter(n => n.category === cat)

  return (
    <PageTransition>
      <PageHero eyebrow="News & events" title="The campus, in headlines."
        subtitle="Achievements, ceremonies, sports meets, prize givings and everything in between." />

      <section className="mx-auto max-w-7xl px-6 py-12">
        <div className="mb-10 flex flex-wrap gap-2">
          {CATS.map(c => (
            <button key={c} onClick={() => setCat(c)}
              className={`rounded-full border px-5 py-2 text-sm font-semibold transition ${cat === c ? 'border-gold bg-gold text-ink' : 'border-gold/25 hover:border-gold/60'}`}>
              {c}
            </button>
          ))}
        </div>
        <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((n, i) => (
            <motion.article key={n.id} layout initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
              className="glass card-hover group overflow-hidden">
              <div className="relative h-52 overflow-hidden">
                <img src={fileUrl(n.image)} alt="" className="h-full w-full object-cover transition duration-700 group-hover:scale-110" />
                <span className="absolute left-4 top-4 rounded-full bg-gold px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-ink">{n.category}</span>
              </div>
              <div className="p-6">
                <p className="text-xs text-gold">{new Date(n.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                <h3 className="font-display mt-2 text-2xl font-semibold leading-snug">{n.title}</h3>
                <p className="muted mt-3 text-sm leading-relaxed">{n.excerpt}</p>
              </div>
            </motion.article>
          ))}
          {!filtered.length && <p className="muted col-span-full py-12 text-center">No stories in this category yet.</p>}
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-16">
        <SectionHeading eyebrow="Save the dates" title="Upcoming school events" />
        <div className="space-y-4">
          {events.map((e, i) => {
            const d = new Date(e.date)
            return (
              <motion.div key={e.id} initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}
                className="glass card-hover flex flex-wrap items-center gap-5 px-6 py-5">
                <div className="grid h-16 w-16 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-maroon to-maroon-deep text-center">
                  <div>
                    <p className="font-display text-2xl font-bold leading-none text-gold-soft">{d.getDate()}</p>
                    <p className="text-[9px] font-bold uppercase tracking-widest text-ivory/80">{d.toLocaleString('en', { month: 'short' })}</p>
                  </div>
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-display truncate text-xl font-semibold">{e.title}</h3>
                  <p className="muted flex items-center gap-1.5 text-sm"><CalendarDays size={13} /> {e.time} · {e.location}</p>
                </div>
                <span className="rounded-full border border-gold/30 px-3 py-1 text-xs font-bold uppercase tracking-wider text-gold">{e.tag}</span>
              </motion.div>
            )
          })}
        </div>
      </section>
    </PageTransition>
  )
}
