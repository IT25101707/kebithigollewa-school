import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  GraduationCap, BookOpen, Trophy, CalendarDays, ArrowRight, ChevronDown,
  Newspaper, Image as ImageIcon, Phone, Download, Quote, PartyPopper
} from 'lucide-react'
import { SCHOOL } from '../config/school'
import { getNews, getEvents, fileUrl } from '../services/api'
import PageTransition from '../components/PageTransition'
import Particles from '../components/Particles'
import NoticeTicker from '../components/NoticeTicker'
import AnimatedCounter from '../components/AnimatedCounter'
import SectionHeading from '../components/SectionHeading'
import WeatherWidget from '../components/WeatherWidget'
import Confetti from '../components/Confetti'

const DEFAULT_SLIDES = [
  'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=1920&q=80&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1920&q=80&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=1920&q=80&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=1920&q=80&auto=format&fit=crop'
]

const QUICK_LINKS = [
  { icon: BookOpen, label: 'Academics', to: '/academics', desc: 'Grades, streams & calendar' },
  { icon: Trophy, label: 'Student Life', to: '/student-life', desc: 'Sports, clubs & prefects' },
  { icon: Newspaper, label: 'News & Events', to: '/news-events', desc: 'What’s happening' },
  { icon: ImageIcon, label: 'Gallery', to: '/gallery', desc: 'Photos & videos' },
  { icon: Download, label: 'Downloads', to: '/downloads', desc: 'Forms & papers' },
  { icon: Phone, label: 'Contact', to: '/contact', desc: 'Reach the office' }
]

const STAT_ICONS = [GraduationCap, BookOpen, Trophy, CalendarDays]

export default function Home() {
  // Admin-uploaded hero photos (Site settings) — falls back to defaults
  const saved = (SCHOOL.heroImages || []).filter(Boolean)
  const HERO_SLIDES = (saved.length ? saved : DEFAULT_SLIDES).map(fileUrl)
  const [slide, setSlide] = useState(0)
  const [news, setNews] = useState([])
  const [events, setEvents] = useState([])
  const [confetti, setConfetti] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setSlide(s => (s + 1) % HERO_SLIDES.length), 6000)
    return () => clearInterval(t)
  }, [])
  useEffect(() => {
    getNews().then(d => setNews(d.slice(0, 3)))
    getEvents().then(d => setEvents(d.slice(0, 4)))
  }, [])

  return (
    <PageTransition>
      <Confetti fire={confetti} />

      {/* ── HERO ─────────────────────────────────────────── */}
      <section className="relative flex min-h-screen flex-col justify-end overflow-hidden">
        {HERO_SLIDES.map((src, i) => (
          <div key={src}
            className={`absolute inset-0 transition-opacity duration-[2000ms] ${i === slide ? 'opacity-100' : 'opacity-0'}`}>
            <img src={src} alt="" className="h-full w-full animate-kenburns object-cover" />
          </div>
        ))}
        <div className="absolute inset-0 bg-gradient-to-b from-ink/80 via-ink/60 to-ink" />
        <div className="absolute inset-0 bg-gradient-to-r from-maroon-deep/50 to-transparent" />
        <Particles count={30} />

        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-28 pt-40">
          <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.9 }}
            className="mb-8 flex items-center gap-5">
            <div className="relative grid place-items-center">
              <span className="absolute h-24 w-24 animate-spin-slow rounded-full border border-dashed border-gold/40" />
              <img src={SCHOOL.logo} alt={`${SCHOOL.name} crest`} className="h-16 w-16 drop-shadow-[0_0_24px_rgba(212,165,55,0.45)]" />
            </div>
            <div>
              <p className="eyebrow">Est. {SCHOOL.established} · National School</p>
              <p className="font-display text-xl italic text-gold-soft">“{SCHOOL.motto}”</p>
            </div>
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 36 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.15 }}
            className="h-display max-w-4xl text-5xl text-ivory md:text-7xl lg:text-8xl">
            {SCHOOL.name}
            <span className="mt-2 block bg-gradient-to-r from-gold-soft via-gold to-maroon-bright bg-clip-text text-transparent">
              Where Character Meets Excellence
            </span>
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.3 }}
            className="mt-6 max-w-2xl text-lg leading-relaxed text-ivory/75">
            For {new Date().getFullYear() - SCHOOL.established} years we have shaped scholars, athletes, artists and
            leaders — one child at a time. Welcome to our story.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.45 }}
            className="mt-10 flex flex-wrap items-center gap-4">
            <Link to="/about" className="btn-gold">Discover our story <ArrowRight size={16} /></Link>
            <Link to="/login" className="btn-ghost text-ivory">Results portal</Link>
            <div className="max-md:hidden"><WeatherWidget /></div>
          </motion.div>
        </div>

        <div className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 animate-bounce text-gold/70">
          <ChevronDown size={26} aria-hidden="true" />
        </div>
      </section>

      <NoticeTicker />

      {/* ── STATS ────────────────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {SCHOOL.stats.map((s, i) => {
            const Icon = STAT_ICONS[i % STAT_ICONS.length]
            return (
              <motion.button key={s.label} type="button"
                onClick={() => setConfetti(c => c + 1)}
                title="Tap to celebrate"
                initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.55, delay: i * 0.1 }}
                className="glass card-hover group relative overflow-hidden p-8 text-left">
                <span className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-gradient-to-br from-gold/15 to-transparent transition group-hover:scale-150" />
                <Icon className="text-gold" size={28} />
                <p className="h-display mt-5 text-5xl text-gold-soft">
                  <AnimatedCounter value={s.value} suffix={s.suffix} />
                </p>
                <p className="muted mt-2 text-sm font-semibold uppercase tracking-widest">{s.label}</p>
                <PartyPopper size={14} className="absolute bottom-4 right-4 opacity-0 transition group-hover:opacity-60" />
              </motion.button>
            )
          })}
        </div>
      </section>

      {/* ── PRINCIPAL'S WELCOME ──────────────────────────── */}
      <section className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid items-center gap-12 lg:grid-cols-5">
          <motion.div initial={{ opacity: 0, x: -32 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}
            className="relative lg:col-span-2">
            <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-gold/25 to-maroon/25 blur-2xl" aria-hidden="true" />
            <img src={SCHOOL.principal.photo} alt={`${SCHOOL.principal.name}, ${SCHOOL.principal.title}`}
              className="relative aspect-[4/5] w-full rounded-[2rem] border border-gold/20 object-cover shadow-2xl" />
            <div className="glass absolute -bottom-5 left-6 right-6 px-5 py-4 text-center">
              <p className="font-display text-xl font-bold">{SCHOOL.principal.name}</p>
              <p className="text-xs uppercase tracking-[0.3em] text-gold">{SCHOOL.principal.title}</p>
            </div>
          </motion.div>
          <div className="lg:col-span-3">
            <SectionHeading eyebrow="From the Principal's desk" title="A warm welcome to every visitor" />
            <motion.blockquote initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.15 }}
              className="relative text-lg leading-relaxed opacity-90">
              <Quote className="absolute -left-2 -top-6 text-gold/25" size={56} aria-hidden="true" />
              {SCHOOL.principal.message}
            </motion.blockquote>
            <Link to="/about" className="btn-ghost mt-8">Read the full message <ArrowRight size={15} /></Link>
          </div>
        </div>
      </section>

      {/* ── LATEST NEWS ──────────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading eyebrow="Announcements" title="The latest from campus" />
          <Link to="/news-events" className="btn-ghost mb-12">All news <ArrowRight size={15} /></Link>
        </div>
        <div className="grid gap-7 md:grid-cols-3">
          {news.map((n, i) => (
            <motion.article key={n.id}
              initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55, delay: i * 0.12 }}
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
        </div>
      </section>

      {/* ── UPCOMING EVENTS ──────────────────────────────── */}
      <section className="relative overflow-hidden py-24">
        <div className="absolute inset-0 bg-gradient-to-br from-maroon-deep/40 via-transparent to-gold/5" aria-hidden="true" />
        <div className="relative mx-auto max-w-7xl px-6">
          <SectionHeading center eyebrow="Mark your calendar" title="Upcoming events"
            subtitle="From examinations to the annual prize giving — everything happening on campus this term." />
          <div className="grid gap-5 md:grid-cols-2">
            {events.map((e, i) => {
              const d = new Date(e.date)
              return (
                <motion.div key={e.id}
                  initial={{ opacity: 0, x: i % 2 ? 32 : -32 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.55 }}
                  className="glass card-hover flex items-center gap-5 p-5">
                  <div className="grid h-20 w-20 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-maroon to-maroon-deep text-center shadow-lg">
                    <div>
                      <p className="font-display text-3xl font-bold leading-none text-gold-soft">{d.getDate()}</p>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-ivory/80">{d.toLocaleString('en', { month: 'short' })}</p>
                    </div>
                  </div>
                  <div className="min-w-0">
                    <span className="rounded-full border border-gold/30 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-gold">{e.tag}</span>
                    <h3 className="font-display mt-1.5 truncate text-xl font-semibold">{e.title}</h3>
                    <p className="muted text-sm">{e.time} · {e.location}</p>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── QUICK NAVIGATION ─────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <SectionHeading center eyebrow="Find your way" title="Explore the school" />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {QUICK_LINKS.map((q, i) => (
            <motion.div key={q.to} initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.08 }}>
              <Link to={q.to} className="glass card-hover group flex items-center gap-5 p-6">
                <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-gold/20 to-maroon/20 text-gold transition group-hover:from-gold group-hover:to-gold-dim group-hover:text-ink">
                  <q.icon size={24} />
                </span>
                <span>
                  <span className="font-display block text-xl font-semibold">{q.label}</span>
                  <span className="muted block text-sm">{q.desc}</span>
                </span>
                <ArrowRight size={18} className="ml-auto text-gold opacity-0 transition group-hover:translate-x-1 group-hover:opacity-100" />
              </Link>
            </motion.div>
          ))}
        </div>
      </section>
    </PageTransition>
  )
}
