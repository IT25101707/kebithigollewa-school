import { useRef, useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { MessageCircle, X, Send, Sparkles } from 'lucide-react'
import { SCHOOL } from '../config/school'

const FAQ = [
  { k: ['admission', 'apply', 'enrol'], a: `Grade 1 admissions for 2027 open on 1 August. Download the form from the Downloads page or visit the school office on weekdays 8.30 a.m.–2.00 p.m.` },
  { k: ['time', 'hours', 'open'], a: 'School hours are 7.30 a.m. – 1.30 p.m., Monday to Friday. The office is open until 3.30 p.m.' },
  { k: ['contact', 'phone', 'email'], a: `You can reach us on ${SCHOOL.phone} or ${SCHOOL.email}. The Contact page has a map and a message form.` },
  { k: ['exam', 'test', 'result'], a: 'Term II examinations begin on 27 July. Students and parents can view marks through the Results Portal after signing in.' },
  { k: ['uniform'], a: 'Boys: white short-sleeved shirt and navy shorts/white trousers. Girls: white frock with the school tie. Full details are in the student handbook (Downloads).' },
  { k: ['sport', 'club'], a: 'We offer cricket, athletics, chess, basketball, swimming, volleyball and 15+ clubs and societies — see the Student Life page.' },
  { k: ['fee', 'payment'], a: 'As a government school there are no tuition fees. Facility and society fees are announced each term via student notices.' },
  { k: ['history', 'founded'], a: `The school was founded in ${SCHOOL.established} — over ${new Date().getFullYear() - SCHOOL.established} years of excellence. Read the full story on our About page.` }
]

const answer = (q) => {
  const s = q.toLowerCase()
  const hit = FAQ.find(f => f.k.some(k => s.includes(k)))
  return hit ? hit.a : `I can help with admissions, school hours, exams, uniforms, sports, clubs and contact details. For anything else, please call ${SCHOOL.phone}.`
}

export default function ChatBot() {
  const [open, setOpen] = useState(false)
  const [msgs, setMsgs] = useState([{ from: 'bot', text: `Ayubowan! I’m the ${SCHOOL.shortName} assistant. Ask me about admissions, exams, sports or school hours.` }])
  const [text, setText] = useState('')
  const endRef = useRef(null)

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [msgs, open])

  const send = () => {
    const t = text.trim()
    if (!t) return
    setMsgs(m => [...m, { from: 'me', text: t }])
    setText('')
    setTimeout(() => setMsgs(m => [...m, { from: 'bot', text: answer(t) }]), 500)
  }

  return (
    <>
      <button onClick={() => setOpen(o => !o)} aria-label="School assistant chat"
        className="fixed bottom-6 right-6 z-[70] grid h-14 w-14 place-items-center rounded-full bg-gradient-to-br from-gold-soft to-gold-dim text-ink shadow-xl shadow-gold/40 transition hover:scale-110">
        {open ? <X size={22} /> : <MessageCircle size={22} />}
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            className="glass fixed bottom-24 right-6 z-[70] flex h-[26rem] w-[min(22rem,calc(100vw-3rem))] flex-col overflow-hidden !rounded-3xl"
            initial={{ opacity: 0, y: 24, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 24, scale: 0.95 }}
          >
            <div className="flex items-center gap-2 border-b border-gold/15 bg-maroon-deep/60 px-4 py-3">
              <Sparkles size={16} className="text-gold" />
              <p className="text-sm font-bold">{SCHOOL.shortName} Assistant</p>
              <span className="ml-auto flex items-center gap-1 text-[10px] text-emerald-400"><span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> online</span>
            </div>
            <div className="flex-1 space-y-3 overflow-y-auto p-4">
              {msgs.map((m, i) => (
                <div key={i} className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-[13px] leading-relaxed ${m.from === 'me' ? 'ml-auto bg-maroon text-ivory' : 'bg-gold/10 border border-gold/15'}`}>{m.text}</div>
              ))}
              <div ref={endRef} />
            </div>
            <div className="flex items-center gap-2 border-t border-gold/15 p-3">
              <input value={text} onChange={e => setText(e.target.value)} onKeyDown={e => e.key === 'Enter' && send()}
                placeholder="Ask about admissions, exams…" className="input !py-2.5 text-sm" />
              <button onClick={send} aria-label="Send message" className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gold text-ink transition hover:scale-105"><Send size={16} /></button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
