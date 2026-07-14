import { motion } from 'framer-motion'
import { SCHOOL } from '../config/school'

export default function Loader() {
  return (
    <div className="fixed inset-0 z-[100] grid place-items-center bg-ink">
      <div className="relative grid place-items-center">
        <motion.span
          className="absolute h-40 w-40 rounded-full border border-gold/30"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 8, ease: 'linear' }}
          style={{ borderTopColor: '#D4A537' }}
        />
        <motion.span
          className="absolute h-28 w-28 rounded-full border border-maroon-bright/40"
          animate={{ rotate: -360 }}
          transition={{ repeat: Infinity, duration: 5, ease: 'linear' }}
          style={{ borderBottomColor: '#A63446' }}
        />
        <motion.img
          src={SCHOOL.logo} alt={SCHOOL.name} className="h-16 w-16"
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: [0.9, 1.05, 0.9], opacity: 1 }}
          transition={{ repeat: Infinity, duration: 2.4, ease: 'easeInOut' }}
        />
        <motion.p
          className="absolute top-full mt-8 font-display text-xl tracking-[0.3em] uppercase text-gold-soft"
          initial={{ opacity: 0 }} animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          {SCHOOL.name}
        </motion.p>
      </div>
    </div>
  )
}
