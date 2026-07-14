import { useEffect, useState } from 'react'
import { ArrowUp, Phone, MapPin } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import { SCHOOL } from '../config/school'

export default function FloatingActions() {
  const [show, setShow] = useState(false)
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 480)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className="fixed bottom-6 left-6 z-[70] flex flex-col gap-3">
      <AnimatePresence>
        {show && (
          <motion.button
            key="top" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            aria-label="Back to top"
            className="grid h-11 w-11 place-items-center rounded-full bg-maroon text-ivory shadow-lg shadow-maroon/40 transition hover:bg-maroon-bright"
            initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.6 }}
          ><ArrowUp size={18} /></motion.button>
        )}
      </AnimatePresence>
      <a href={`tel:${SCHOOL.phone.replace(/ /g, '')}`} aria-label="Call the school"
        className="grid h-11 w-11 place-items-center rounded-full bg-gold text-ink shadow-lg shadow-gold/40 transition hover:scale-110"><Phone size={18} /></a>
      <a href="/contact" aria-label="Find us"
        className="glass grid h-11 w-11 place-items-center !rounded-full transition hover:scale-110"><MapPin size={18} className="text-gold" /></a>
    </div>
  )
}
