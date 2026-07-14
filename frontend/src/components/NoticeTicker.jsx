import { useEffect, useState } from 'react'
import { Megaphone } from 'lucide-react'
import { getNotices } from '../services/api'

export default function NoticeTicker() {
  const [notices, setNotices] = useState([])
  useEffect(() => { getNotices().then(setNotices) }, [])
  if (!notices.length) return null
  const items = [...notices, ...notices] // duplicate for seamless loop

  return (
    <div className="relative z-20 flex items-center gap-0 overflow-hidden border-y border-gold/20 bg-maroon-deep/80 backdrop-blur">
      <div className="flex shrink-0 items-center gap-2 bg-gold px-4 py-2 text-xs font-extrabold uppercase tracking-widest text-ink">
        <Megaphone size={14} /> Live notices
      </div>
      <div className="relative flex-1 overflow-hidden py-2">
        <div className="flex w-max animate-ticker gap-12 whitespace-nowrap px-6 text-sm text-ivory/90">
          {items.map((n, i) => (
            <span key={i} className="inline-flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-gold" /> {n.text}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
