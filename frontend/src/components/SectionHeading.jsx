import { motion } from 'framer-motion'

export default function SectionHeading({ eyebrow, title, subtitle, center }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6 }}
      className={`mb-12 ${center ? 'text-center' : ''}`}
    >
      {eyebrow && (
        <p className="eyebrow mb-3">
          <span className="gold-line mr-3" />{eyebrow}{center && <span className="gold-line ml-3 rotate-180" />}
        </p>
      )}
      <h2 className="h-display text-4xl md:text-5xl">{title}</h2>
      {subtitle && <p className="muted mt-4 max-w-2xl text-lg leading-relaxed" style={center ? { marginInline: 'auto' } : {}}>{subtitle}</p>}
    </motion.div>
  )
}
