import { useMemo } from 'react'

// Lightweight floating gold particles (pure CSS, no canvas)
export default function Particles({ count = 26 }) {
  const dots = useMemo(() =>
    Array.from({ length: count }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: 2 + Math.random() * 4,
      delay: Math.random() * 7,
      duration: 6 + Math.random() * 8,
      opacity: 0.15 + Math.random() * 0.4
    })), [count])

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {dots.map(d => (
        <span
          key={d.id}
          className="absolute rounded-full bg-gold animate-float"
          style={{
            left: `${d.left}%`, top: `${d.top}%`,
            width: d.size, height: d.size, opacity: d.opacity,
            animationDelay: `${d.delay}s`, animationDuration: `${d.duration}s`,
            boxShadow: '0 0 8px rgba(212,165,55,0.6)'
          }}
        />
      ))}
    </div>
  )
}
