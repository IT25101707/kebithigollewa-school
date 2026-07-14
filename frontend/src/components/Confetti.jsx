import { useEffect, useState } from 'react'

// Small dependency-free confetti burst
export default function Confetti({ fire = 0 }) {
  const [pieces, setPieces] = useState([])
  useEffect(() => {
    if (!fire) return
    const colors = ['#D4A537', '#E8C877', '#A63446', '#F7F3EA', '#7A1F2B']
    const p = Array.from({ length: 90 }, (_, i) => ({
      id: `${fire}-${i}`,
      left: 50 + (Math.random() - 0.5) * 30,
      dx: (Math.random() - 0.5) * 70,
      rot: Math.random() * 720 - 360,
      color: colors[i % colors.length],
      dur: 1.6 + Math.random() * 1.4,
      size: 6 + Math.random() * 6
    }))
    setPieces(p)
    const t = setTimeout(() => setPieces([]), 3200)
    return () => clearTimeout(t)
  }, [fire])

  if (!pieces.length) return null
  return (
    <div className="pointer-events-none fixed inset-0 z-[95] overflow-hidden" aria-hidden="true">
      {pieces.map(p => (
        <span key={p.id} style={{
          position: 'absolute', left: `${p.left}%`, top: '-2%',
          width: p.size, height: p.size * 0.6, background: p.color, borderRadius: 2,
          animation: `confetti-fall ${p.dur}s cubic-bezier(.2,.6,.4,1) forwards`,
          '--dx': `${p.dx}vw`, '--rot': `${p.rot}deg`
        }} />
      ))}
      <style>{`@keyframes confetti-fall { to { transform: translate(var(--dx), 105vh) rotate(var(--rot)); opacity: .9; } }`}</style>
    </div>
  )
}
