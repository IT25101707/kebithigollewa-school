import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, CalendarDays, ClipboardList, Clock, Users } from 'lucide-react'
import { STREAMS, ACADEMIC_CALENDAR } from '../data/mockData'
import { getTeachers, fileUrl } from '../services/api'
import PageTransition from '../components/PageTransition'
import SectionHeading from '../components/SectionHeading'
import { PageHero } from './About'

const EXAMS = [
  { name: 'Term II Examination — Grades 6–9', dates: '27 July – 5 August 2026', note: 'Timetable in Downloads' },
  { name: 'Term II Examination — Grades 10–11', dates: '27 July – 7 August 2026', note: 'O/L model paper practice' },
  { name: 'A/L Mock Examination', dates: '17 – 28 August 2026', note: 'Full G.C.E. A/L simulation' },
  { name: 'Grade 5 Scholarship Practice Test', dates: '3 August 2026', note: 'Main Hall, 8.30 a.m.' }
]

const TIMETABLE = [
  ['7.30', 'Assembly', 'Assembly', 'Assembly', 'Assembly', 'Assembly'],
  ['8.00', 'Mathematics', 'Science', 'English', 'Sinhala', 'ICT'],
  ['9.20', 'Science', 'Mathematics', 'History', 'English', 'Mathematics'],
  ['10.40', 'Interval', 'Interval', 'Interval', 'Interval', 'Interval'],
  ['11.00', 'English', 'Religion', 'Geography', 'Science', 'Aesthetics'],
  ['12.20', 'Health & PE', 'ICT', 'Mathematics', 'Civics', 'Library']
]

export default function Academics() {
  const [TEACHERS, setTeachers] = useState([])
  useEffect(() => { getTeachers().then(setTeachers) }, [])
  const [open, setOpen] = useState(0)
  return (
    <PageTransition>
      <PageHero eyebrow="Academic section" title="Learning, from Grade 1 to A/L."
        subtitle="A curriculum that discovers strengths early and sharpens them into excellence — across five A/L streams and every national examination." />

      {/* Streams accordion */}
      <section className="mx-auto max-w-5xl px-6 py-16">
        <SectionHeading eyebrow="Grades & streams" title="What we teach" />
        <div className="space-y-4">
          {STREAMS.map((s, i) => (
            <div key={s.grade} className="glass overflow-hidden">
              <button onClick={() => setOpen(open === i ? -1 : i)} aria-expanded={open === i}
                className="flex w-full items-center justify-between px-7 py-5 text-left transition hover:bg-gold/5">
                <div>
                  <h3 className="font-display text-2xl font-semibold">{s.grade}</h3>
                  <p className="muted text-sm">{s.desc}</p>
                </div>
                <ChevronDown className={`shrink-0 text-gold transition-transform ${open === i ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.35 }}>
                    <div className="flex flex-wrap gap-2 border-t border-gold/10 px-7 py-5">
                      {s.subjects.map(sub => (
                        <span key={sub} className="rounded-full border border-gold/25 bg-gold/10 px-4 py-1.5 text-sm">{sub}</span>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </section>

      {/* Calendar */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <SectionHeading eyebrow="Academic calendar" title="The year at a glance" />
        <div className="grid gap-6 md:grid-cols-3">
          {ACADEMIC_CALENDAR.map((t, i) => (
            <motion.div key={t.term} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              className="glass card-hover p-8">
              <CalendarDays className="text-gold" size={26} />
              <h3 className="font-display mt-4 text-3xl font-bold">{t.term}</h3>
              <p className="text-sm font-semibold text-gold">{t.period}</p>
              <ul className="muted mt-4 space-y-2 text-sm">
                {t.highlights.map(h => <li key={h} className="flex gap-2"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />{h}</li>)}
              </ul>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Exams */}
      <section className="mx-auto max-w-5xl px-6 py-16">
        <SectionHeading eyebrow="Examinations" title="Upcoming examination schedules" />
        <div className="space-y-4">
          {EXAMS.map((e, i) => (
            <motion.div key={e.name} initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }}
              className="glass card-hover flex flex-wrap items-center gap-4 px-7 py-5">
              <ClipboardList className="text-gold" size={22} />
              <div className="min-w-0 flex-1">
                <p className="font-bold">{e.name}</p>
                <p className="muted text-sm">{e.note}</p>
              </div>
              <span className="rounded-full border border-gold/30 px-4 py-1.5 text-sm font-semibold text-gold">{e.dates}</span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Sample timetable */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <SectionHeading eyebrow="Timetables" title="A sample week — Grade 10"
          subtitle="Full timetables for every grade are available in the Downloads section and inside the Student Portal." />
        <div className="glass overflow-x-auto">
          <table className="w-full min-w-[640px] text-sm">
            <thead>
              <tr className="border-b border-gold/15 text-left text-gold">
                <th className="px-5 py-4 font-semibold"><Clock size={15} className="mb-1 inline" /> Time</th>
                {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].map(d => <th key={d} className="px-5 py-4 font-semibold">{d}</th>)}
              </tr>
            </thead>
            <tbody>
              {TIMETABLE.map((row, i) => (
                <tr key={i} className={`border-b border-gold/5 ${row[1] === 'Interval' ? 'bg-gold/5 text-gold' : ''}`}>
                  {row.map((cell, j) => <td key={j} className={`px-5 py-3.5 ${j === 0 ? 'font-bold text-gold-soft' : ''}`}>{cell}</td>)}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Teachers */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <SectionHeading eyebrow="Teachers directory" title="The people behind the lessons"
          subtitle="A few of the 165+ dedicated teachers guiding our students every day." />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {TEACHERS.map((t, i) => (
            <motion.div key={t.name} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}
              className="glass card-hover group flex items-center gap-5 p-5">
              <img src={fileUrl(t.photo)} alt="" className="h-16 w-16 rounded-full border-2 border-gold/30 object-cover transition group-hover:border-gold" />
              <div>
                <p className="font-bold">{t.name}</p>
                <p className="text-sm text-gold">{t.subject}</p>
                <p className="muted flex items-center gap-1 text-xs"><Users size={12} /> {t.grade}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </PageTransition>
  )
}
