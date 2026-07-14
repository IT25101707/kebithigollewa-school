import { useState } from 'react'
import { motion } from 'framer-motion'
import { MapPin, Phone, Mail, Send, Facebook, Youtube, Instagram, CheckCircle2 } from 'lucide-react'
import { SCHOOL } from '../config/school'
import { sendContact } from '../services/api'
import PageTransition from '../components/PageTransition'
import { PageHero } from './About'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [sent, setSent] = useState(false)
  const set = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }))

  const submit = async (e) => {
    e.preventDefault()
    await sendContact(form)
    setSent(true)
  }

  return (
    <PageTransition>
      <PageHero eyebrow="Contact" title="We'd love to hear from you."
        subtitle="Questions about admissions, records or events — the school office replies within two working days." />

      <section className="mx-auto grid max-w-7xl gap-10 px-6 py-12 lg:grid-cols-2">
        <div className="space-y-5">
          {[
            [MapPin, 'Address', SCHOOL.address],
            [Phone, 'Telephone', SCHOOL.phone],
            [Mail, 'Email', SCHOOL.email]
          ].map(([Icon, label, value]) => (
            <div key={label} className="glass card-hover flex items-center gap-5 p-6">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-gold/20 to-maroon/20 text-gold"><Icon size={20} /></span>
              <div><p className="text-xs font-bold uppercase tracking-widest text-gold">{label}</p><p className="mt-1">{value}</p></div>
            </div>
          ))}
          <div className="glass flex items-center gap-4 p-6">
            <p className="text-xs font-bold uppercase tracking-widest text-gold">Follow us</p>
            {[[Facebook, SCHOOL.social.facebook, 'Facebook'], [Youtube, SCHOOL.social.youtube, 'YouTube'], [Instagram, SCHOOL.social.instagram, 'Instagram']].map(([Icon, href, label]) => (
              <a key={label} href={href} aria-label={label} target="_blank" rel="noreferrer"
                className="grid h-10 w-10 place-items-center rounded-full border border-gold/25 text-gold transition hover:scale-110 hover:border-gold">
                <Icon size={16} />
              </a>
            ))}
          </div>
          <div className="glass overflow-hidden">
            <iframe title="School location on Google Maps" src={SCHOOL.mapEmbed} className="h-72 w-full grayscale-[30%]" loading="lazy" allowFullScreen />
          </div>
        </div>

        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} className="glass h-fit p-8 md:p-10">
          {sent ? (
            <div className="grid place-items-center gap-4 py-16 text-center">
              <CheckCircle2 size={52} className="text-gold" />
              <h3 className="font-display text-3xl font-bold">Message sent</h3>
              <p className="muted max-w-sm">Thank you, {form.name || 'friend'}. The office will get back to you at {form.email || 'your email'} within two working days.</p>
            </div>
          ) : (
            <form onSubmit={submit} className="space-y-5">
              <h3 className="font-display text-3xl font-bold">Send a message</h3>
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="block text-sm"><span className="mb-1.5 block font-semibold">Your name</span>
                  <input required className="input" value={form.name} onChange={set('name')} placeholder="A. B. Perera" /></label>
                <label className="block text-sm"><span className="mb-1.5 block font-semibold">Email</span>
                  <input required type="email" className="input" value={form.email} onChange={set('email')} placeholder="you@example.com" /></label>
              </div>
              <label className="block text-sm"><span className="mb-1.5 block font-semibold">Subject</span>
                <input required className="input" value={form.subject} onChange={set('subject')} placeholder="Admission enquiry" /></label>
              <label className="block text-sm"><span className="mb-1.5 block font-semibold">Message</span>
                <textarea required rows={5} className="input resize-none" value={form.message} onChange={set('message')} placeholder="How can we help?" /></label>
              <button className="btn-gold w-full justify-center">Send message <Send size={15} /></button>
            </form>
          )}
        </motion.div>
      </section>
    </PageTransition>
  )
}
