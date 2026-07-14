import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { GraduationCap, BookOpen, Users, ShieldCheck, LogIn, AlertTriangle } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { SCHOOL } from '../config/school'
import PageTransition from '../components/PageTransition'
import Particles from '../components/Particles'

const ROLES = [
  { id: 'student', label: 'Student', icon: GraduationCap, hint: 'View marks, report cards & attendance' },
  { id: 'teacher', label: 'Teacher', icon: BookOpen, hint: 'Enter marks, attendance & notices' },
  { id: 'parent', label: 'Parent', icon: Users, hint: 'Follow your child\'s progress' },
  { id: 'admin', label: 'Admin', icon: ShieldCheck, hint: 'School-wide dashboard' }
]

export default function Login() {
  const [role, setRole] = useState('student')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  const submit = async (e) => {
    e.preventDefault()
    setError(''); setBusy(true)
    try {
      const u = await login(username, password)
      navigate(`/portal/${u.role}`)
    } catch (err) {
      setError(err?.response?.data?.message ||
        'Sign-in failed. Check your username and password — and make sure the backend server is running (see README).')
    } finally { setBusy(false) }
  }

  return (
    <PageTransition>
      <section className="relative grid min-h-screen place-items-center overflow-hidden px-6 pt-24 pb-16">
        <Particles count={20} />
        <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} className="glass w-full max-w-lg p-8 md:p-10">
          <div className="mb-8 text-center">
            <img src={SCHOOL.logo} alt="" className="mx-auto h-16 w-16" />
            <h1 className="font-display mt-4 text-3xl font-bold">Portal sign in</h1>
            <p className="muted mt-1 text-sm">One login for students, teachers, parents and admin.</p>
          </div>

          <div className="mb-6 grid grid-cols-4 gap-2" role="tablist" aria-label="Portal type">
            {ROLES.map(r => (
              <button key={r.id} role="tab" aria-selected={role === r.id} onClick={() => setRole(r.id)}
                className={`flex flex-col items-center gap-1.5 rounded-xl border px-2 py-3 text-xs font-semibold transition ${role === r.id ? 'border-gold bg-gold/15 text-gold' : 'border-gold/15 hover:border-gold/40'}`}>
                <r.icon size={18} /> {r.label}
              </button>
            ))}
          </div>
          <p className="muted mb-6 text-center text-xs">{ROLES.find(r => r.id === role)?.hint}</p>

          <form onSubmit={submit} className="space-y-4">
            <label className="block text-sm"><span className="mb-1.5 block font-semibold">Username</span>
              <input className="input" value={username} onChange={e => setUsername(e.target.value)} placeholder={`e.g. ${role}1`} required /></label>
            <label className="block text-sm"><span className="mb-1.5 block font-semibold">Password</span>
              <input type="password" className="input" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" required /></label>
            {error && <p className="flex items-start gap-2 rounded-xl border border-maroon-bright/40 bg-maroon-deep/30 p-3 text-sm"><AlertTriangle size={16} className="mt-0.5 shrink-0 text-gold" /> {error}</p>}
            <button disabled={busy} className="btn-gold w-full justify-center disabled:opacity-60">
              <LogIn size={16} /> {busy ? 'Signing in…' : 'Sign in'}
            </button>
          </form>

          <div className="mt-6 rounded-xl border border-gold/15 bg-gold/5 p-4 text-xs leading-relaxed">
            <p className="font-bold text-gold">Demo accounts (after seeding the database):</p>
            <p className="muted mt-1">student1 / student123 · teacher1 / teacher123 · parent1 / parent123 · admin / admin123</p>
          </div>
        </motion.div>
      </section>
    </PageTransition>
  )
}
