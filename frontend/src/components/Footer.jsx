import { Link } from 'react-router-dom'
import { Facebook, Youtube, Instagram, MessageCircle, MapPin, Phone, Mail } from 'lucide-react'
import { SCHOOL } from '../config/school'

export default function Footer() {
  return (
    <footer className="relative mt-24 border-t border-gold/15 bg-ink-soft/80">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="flex items-center gap-3">
            <img src={SCHOOL.logo} alt="" className="h-14 w-14" />
            <div>
              <p className="font-display text-2xl font-bold">{SCHOOL.name}</p>
              <p className="text-xs uppercase tracking-[0.3em] text-gold">{SCHOOL.motto}</p>
            </div>
          </div>
          <p className="muted mt-5 max-w-md text-sm leading-relaxed">
            A national school with a heritage of {new Date().getFullYear() - SCHOOL.established} years —
            nurturing knowledge, discipline and service in every child who walks through our gates.
          </p>
          <div className="mt-6 flex gap-3">
            {[
              [Facebook, SCHOOL.social.facebook, 'Facebook'],
              [Youtube, SCHOOL.social.youtube, 'YouTube'],
              [Instagram, SCHOOL.social.instagram, 'Instagram'],
              [MessageCircle, SCHOOL.social.whatsapp, 'WhatsApp']
            ].map(([Icon, href, label]) => (
              <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={label}
                className="glass grid h-10 w-10 place-items-center !rounded-full transition hover:scale-110 hover:!border-gold">
                <Icon size={16} className="text-gold" />
              </a>
            ))}
          </div>
        </div>
        <nav aria-label="Footer">
          <p className="eyebrow mb-4">Explore</p>
          <ul className="space-y-2.5 text-sm">
            {[['About the school', '/about'], ['Academics', '/academics'], ['Student life', '/student-life'], ['News & events', '/news-events'], ['Gallery', '/gallery'], ['Downloads', '/downloads'], ['Portal login', '/login']].map(([l, to]) => (
              <li key={to}><Link to={to} className="muted transition hover:text-gold">{l}</Link></li>
            ))}
          </ul>
        </nav>
        <div>
          <p className="eyebrow mb-4">Visit us</p>
          <ul className="muted space-y-3 text-sm">
            <li className="flex gap-2"><MapPin size={16} className="mt-0.5 shrink-0 text-gold" /> {SCHOOL.address}</li>
            <li className="flex gap-2"><Phone size={16} className="shrink-0 text-gold" /> {SCHOOL.phone}</li>
            <li className="flex gap-2"><Mail size={16} className="shrink-0 text-gold" /> {SCHOOL.email}</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-gold/10 py-5 text-center text-xs opacity-60">
        © {new Date().getFullYear()} {SCHOOL.name}. All rights reserved. · {SCHOOL.mottoEnglish}
      </div>
    </footer>
  )
}
