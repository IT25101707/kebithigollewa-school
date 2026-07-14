import { motion, useScroll, useSpring } from 'framer-motion'

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 28 })
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-[90] h-[3px] origin-left bg-gradient-to-r from-maroon-bright via-gold to-gold-soft"
      style={{ scaleX }}
    />
  )
}
