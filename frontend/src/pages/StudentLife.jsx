import { motion } from 'framer-motion'
import { Trophy, Medal, Crown, FlaskConical, Mic, HeartHandshake, Camera, Cpu, Music, Compass, Palette, Star } from 'lucide-react'

const CLUB_ICONS = { FlaskConical, Mic, HeartHandshake, Camera, Cpu, Music, Compass, Palette }
import { CLUBS, SPORTS, PREFECTS } from '../data/mockData'
import PageTransition from '../components/PageTransition'
import SectionHeading from '../components/SectionHeading'
import { PageHero } from './About'

const ACHIEVEMENTS = [
  { title: 'All-Island Chess Champions', year: 2026, by: 'Senior Chess Team' },
  { title: '11 District Ranks — G.C.E. A/L', year: 2025, by: 'Physical Science stream' },
  { title: 'National Robotics Competition — 1st Runner-up', year: 2025, by: 'Robotics & ICT Club' },
  { title: 'State Music Festival — Best School Orchestra', year: 2026, by: 'Oriental Orchestra' },
  { title: '14 National Colours in Athletics', year: 2026, by: 'Athletics Squad' },
  { title: 'Inter-School Drama Festival — Best Production', year: 2025, by: 'Art & Drama Circle' }
]

export default function StudentLife() {
  return (
    <PageTransition>
      <PageHero eyebrow="Student life" title="More than a classroom."
        subtitle="Six competitive sports, fifteen-plus clubs and societies, a proud prefect tradition — school life here is a full life." />

      {/* Sports */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <SectionHeading eyebrow="Sports" title="Play hard, play fair" />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SPORTS.map((s, i) => (
            <motion.div key={s.name} initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
              className="glass card-hover group relative h-64 overflow-hidden">
              <img src={s.img} alt={s.name} className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent" />
              <div className="absolute bottom-0 p-6">
                <h3 className="font-display text-3xl font-bold text-ivory">{s.name}</h3>
                <p className="flex items-center gap-1.5 text-sm text-gold"><Trophy size={14} /> {s.honours}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Clubs */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <SectionHeading eyebrow="Clubs & societies" title="Find your people" />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {CLUBS.map((c, i) => {
            const Icon = CLUB_ICONS[c.icon] || Star
            return (
              <motion.div key={c.name} initial={{ opacity: 0, scale: 0.94 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
                className="glass card-hover p-6">
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br from-gold/20 to-maroon/25 text-gold"><Icon size={22} /></span>
                <h3 className="mt-4 font-bold">{c.name}</h3>
                <p className="muted mt-1.5 text-sm leading-relaxed">{c.desc}</p>
                <p className="mt-3 text-xs font-bold uppercase tracking-wider text-gold">{c.members}+ members</p>
              </motion.div>
            )
          })}
        </div>
      </section>

      {/* Prefects */}
      <section className="relative overflow-hidden py-20">
        <div className="absolute inset-0 bg-gradient-to-br from-maroon-deep/40 to-transparent" aria-hidden="true" />
        <div className="relative mx-auto max-w-7xl px-6">
          <SectionHeading center eyebrow="The Prefects' Guild" title="Leadership, worn with honour"
            subtitle="Chosen for character as much as capability, the Board of Prefects upholds discipline and represents the student body." />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {PREFECTS.map((p, i) => (
              <motion.div key={p.name} initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="glass card-hover p-7 text-center">
                <Crown className="mx-auto text-gold" size={26} />
                <p className="font-display mt-4 text-xl font-bold">{p.name}</p>
                <p className="text-sm text-gold">{p.role}</p>
                <p className="muted mt-1 text-xs uppercase tracking-widest">{p.house} House</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements & competitions */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <SectionHeading eyebrow="Achievements & competitions" title="The trophy cabinet, lately" />
        <div className="grid gap-5 md:grid-cols-2">
          {ACHIEVEMENTS.map((a, i) => (
            <motion.div key={a.title} initial={{ opacity: 0, x: i % 2 ? 24 : -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}
              className="glass card-hover flex items-center gap-5 p-6">
              <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-gradient-to-br from-gold to-gold-dim text-ink"><Medal size={24} /></span>
              <div>
                <p className="font-bold leading-snug">{a.title}</p>
                <p className="muted text-sm">{a.by} · {a.year}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </PageTransition>
  )
}
