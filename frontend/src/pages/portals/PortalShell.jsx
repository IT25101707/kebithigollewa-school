import { useNavigate } from 'react-router-dom'
import { LogOut } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import PageTransition from '../../components/PageTransition'

export default function PortalShell({ title, subtitle, children }) {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  return (
    <PageTransition>
      <section className="mx-auto max-w-7xl px-6 pb-16 pt-32">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow mb-2"><span className="gold-line mr-3" />{user?.role} portal</p>
            <h1 className="h-display text-4xl md:text-5xl">{title}</h1>
            <p className="muted mt-2">{subtitle}</p>
          </div>
          <button onClick={() => { logout(); navigate('/') }} className="btn-ghost !py-2 text-sm"><LogOut size={15} /> Sign out</button>
        </div>
        {children}
      </section>
    </PageTransition>
  )
}

export function StatCard({ icon: Icon, label, value, tone = 'gold' }) {
  return (
    <div className="glass card-hover p-6">
      <Icon size={22} className={tone === 'gold' ? 'text-gold' : 'text-maroon-bright'} />
      <p className="h-display mt-3 text-4xl">{value}</p>
      <p className="muted mt-1 text-xs font-semibold uppercase tracking-widest">{label}</p>
    </div>
  )
}

export function Panel({ title, children, right }) {
  return (
    <div className="glass overflow-hidden">
      <div className="flex items-center justify-between border-b border-gold/15 px-6 py-4">
        <h2 className="font-bold">{title}</h2>{right}
      </div>
      <div className="p-6">{children}</div>
    </div>
  )
}

export function OfflineNote({ error }) {
  if (!error) return null
  return (
    <div className="glass mb-8 border-maroon-bright/40 p-5 text-sm">
      <p className="font-bold text-gold">Backend not reachable</p>
      <p className="muted mt-1">Start the API server (<code>cd backend && npm run dev</code>) and make sure MySQL is running and seeded — see the README. Showing sample data meanwhile.</p>
    </div>
  )
}
