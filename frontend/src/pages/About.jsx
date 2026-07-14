import { motion } from 'framer-motion'
import { Eye, Target, Music, Users, Map, Video, Quote } from 'lucide-react'
import { SCHOOL } from '../config/school'
import PageTransition from '../components/PageTransition'
import SectionHeading from '../components/SectionHeading'

function PageHero({ eyebrow, title, subtitle }) {
  return (
    <section className="relative overflow-hidden pt-40 pb-20">
      <div className="absolute inset-0 bg-gradient-to-b from-maroon-deep/50 to-transparent" aria-hidden="true" />
      <div className="relative mx-auto max-w-7xl px-6">
        <p className="eyebrow mb-3"><span className="gold-line mr-3" />{eyebrow}</p>
        <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} className="h-display text-5xl md:text-7xl">{title}</motion.h1>
        {subtitle && <p className="muted mt-5 max-w-2xl text-lg">{subtitle}</p>}
      </div>
    </section>
  )
}
export { PageHero }

export default function About() {
  return (
    <PageTransition>
      <PageHero eyebrow="About the school" title={SCHOOL.aboutTitle}
        subtitle={`Since ${SCHOOL.established}, ${SCHOOL.name} has stood for one idea — that every child deserves an education of knowledge, discipline and service.`} />

      {/* History timeline */}
      <section className="mx-auto max-w-5xl px-6 py-16">
        <SectionHeading eyebrow="Our history" title="An interactive timeline" />
        <div className="relative ml-4 border-l-2 border-gold/25 pl-10">
          {SCHOOL.timeline.map((t, i) => (
            <motion.div key={t.year}
              initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.55, delay: 0.05 * i }}
              className="group relative pb-12 last:pb-0">
              <span className="absolute -left-[3.05rem] top-1 grid h-8 w-8 place-items-center rounded-full border-2 border-gold bg-ink transition group-hover:scale-125 group-hover:bg-gold">
                <span className="h-2 w-2 rounded-full bg-gold transition group-hover:bg-ink" />
              </span>
              <p className="font-display text-3xl font-bold text-gold-soft">{t.year}</p>
              <h3 className="mt-1 text-xl font-bold">{t.title}</h3>
              <p className="muted mt-2 max-w-xl leading-relaxed">{t.text}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-7 md:grid-cols-2">
          {[
            { icon: Eye, title: 'Our Vision', text: SCHOOL.vision },
            { icon: Target, title: 'Our Mission', text: SCHOOL.mission }
          ].map((v, i) => (
            <motion.div key={v.title} initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55, delay: i * 0.12 }}
              className="glass card-hover relative overflow-hidden p-10">
              <span className="absolute -right-8 -top-8 h-36 w-36 rounded-full bg-gradient-to-br from-gold/15 to-transparent" aria-hidden="true" />
              <v.icon size={34} className="text-gold" />
              <h3 className="font-display mt-5 text-3xl font-bold">{v.title}</h3>
              <p className="muted mt-4 leading-relaxed">{v.text}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Principal's full message */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="glass grid gap-10 overflow-hidden p-8 md:grid-cols-3 md:p-12">
          <img src={SCHOOL.principal.photo} alt={SCHOOL.principal.name} className="aspect-[4/5] w-full rounded-2xl border border-gold/20 object-cover" />
          <div className="md:col-span-2">
            <p className="eyebrow mb-3">Principal's message</p>
            <Quote className="text-gold/30" size={44} aria-hidden="true" />
            <p className="mt-3 text-lg leading-relaxed opacity-90">{SCHOOL.principal.message}</p>
            {SCHOOL.principal.message2 && <p className="mt-4 leading-relaxed opacity-90">{SCHOOL.principal.message2}</p>}
            <p className="font-display mt-8 text-2xl font-bold text-gold-soft">{SCHOOL.principal.name}</p>
            <p className="text-sm uppercase tracking-[0.3em] text-gold">{SCHOOL.principal.title}, {SCHOOL.name}</p>
          </div>
        </div>
      </section>

      {/* Anthem */}
      <section className="mx-auto max-w-4xl px-6 py-16 text-center">
        <SectionHeading center eyebrow="Sung with pride" title="The school anthem" />
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
          className="glass relative p-10 md:p-14">
          <Music className="mx-auto mb-6 text-gold" size={30} aria-hidden="true" />
          {SCHOOL.anthem.map((line, i) => (
            <p key={i} className={`font-display text-xl italic leading-loose ${line === '' ? 'h-6' : ''}`}>{line}</p>
          ))}
        </motion.div>
      </section>

      {/* Administration */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <SectionHeading eyebrow="Leadership" title="Administration" subtitle="The team that keeps the school running — academically and beyond." />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SCHOOL.adminTeam.map((a, i) => (
            <motion.div key={a.name} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45, delay: i * 0.07 }}
              className="glass card-hover flex items-center gap-4 p-6">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-gradient-to-br from-maroon to-maroon-deep font-display text-lg font-bold text-gold-soft">
                {a.name.split(' ').slice(-1)[0][0]}
              </span>
              <div>
                <p className="font-bold">{a.name}</p>
                <p className="muted text-sm">{a.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Map + Virtual tour */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-7 lg:grid-cols-2">
          <div className="glass overflow-hidden">
            <div className="flex items-center gap-2 border-b border-gold/15 px-6 py-4"><Map size={18} className="text-gold" /><h3 className="font-bold">School map & location</h3></div>
            <iframe title="School location map" src={SCHOOL.mapEmbed} className="h-80 w-full grayscale-[30%]" loading="lazy" allowFullScreen />
          </div>
          <div className="glass overflow-hidden">
            <div className="flex items-center gap-2 border-b border-gold/15 px-6 py-4"><Video size={18} className="text-gold" /><h3 className="font-bold">Virtual campus tour</h3></div>
            <div className="relative h-80">
              <iframe title="Virtual campus tour video" src={SCHOOL.tourVideo} className="h-full w-full" loading="lazy" allowFullScreen />
            </div>
          </div>
        </div>
        <p className="muted mt-4 flex items-center gap-2 text-sm"><Users size={15} /> Group visits are welcome — please write to {SCHOOL.email} a week in advance.</p>
      </section>
    </PageTransition>
  )
}
