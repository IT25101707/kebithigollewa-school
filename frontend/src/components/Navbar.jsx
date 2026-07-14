import { useEffect, useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Sun, Moon, Search, LogIn, LogOut, LayoutDashboard } from 'lucide-react'
import { SCHOOL } from '../config/school'
import { useTheme } from '../context/ThemeContext'
import { useAuth } from '../context/AuthContext'
import SearchModal from './SearchModal'

const LINKS = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/academics', label: 'Academics' },
  { to: '/student-life', label: 'Student Life' },
  { to: '/news-events', label: 'News & Events' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/downloads', label: 'Downloads' },
  { to: '/contact', label: 'Contact' }
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const { theme, toggle } = useTheme()
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const portalPath = user ? `/portal/${user.role}` : '/login'

  return (
    <>
      <header className={`fixed inset-x-0 top-0 z-[80] transition-all duration-500 ${scrolled ? 'py-2' : 'py-4'}`}>
        <div className={`mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 transition-all duration-500 ${scrolled ? 'glass mx-3 md:mx-auto py-2 md:px-6' : ''}`}>
          <Link to="/" className="flex items-center gap-3">
            <img src={SCHOOL.logo} alt={`${SCHOOL.name} crest`} className="h-11 w-11 drop-shadow" />
            <div className="leading-tight">
              <p className="font-display text-lg font-bold tracking-wide">{SCHOOL.name}</p>
              <p className="text-[10px] uppercase tracking-[0.28em] text-gold">{SCHOOL.motto}</p>
            </div>
          </Link>

          <nav className="hidden items-center gap-1 lg:flex" aria-label="Main">
            {LINKS.map(l => (
              <NavLink
                key={l.to} to={l.to} end={l.to === '/'}
                className={({ isActive }) =>
                  `relative rounded-full px-3 py-2 text-[13px] font-semibold transition-colors ${isActive ? 'text-gold' : 'hover:text-gold-soft'}`}
              >
                {l.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-1.5">
            <button onClick={() => setSearchOpen(true)} aria-label="Search" className="rounded-full p-2.5 transition hover:bg-gold/10 hover:text-gold"><Search size={18} /></button>
            <button onClick={toggle} aria-label="Toggle dark or light mode" className="rounded-full p-2.5 transition hover:bg-gold/10 hover:text-gold">
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            {user ? (
              <div className="hidden items-center gap-1 md:flex">
                <Link to={portalPath} className="btn-gold !px-4 !py-2 text-xs"><LayoutDashboard size={15} /> My portal</Link>
                <button onClick={() => { logout(); navigate('/') }} aria-label="Sign out" className="rounded-full p-2.5 transition hover:bg-gold/10 hover:text-gold"><LogOut size={18} /></button>
              </div>
            ) : (
              <Link to="/login" className="btn-gold !px-4 !py-2 text-xs max-md:hidden"><LogIn size={15} /> Portal login</Link>
            )}
            <button onClick={() => setOpen(true)} aria-label="Open menu" className="rounded-full p-2.5 hover:bg-gold/10 lg:hidden"><Menu size={20} /></button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[85] bg-ink/95 backdrop-blur-xl"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          >
            <div className="flex items-center justify-between p-5">
              <img src={SCHOOL.logo} alt="" className="h-10 w-10" />
              <button onClick={() => setOpen(false)} aria-label="Close menu" className="rounded-full p-2 text-ivory hover:bg-gold/10"><X size={24} /></button>
            </div>
            <nav className="flex flex-col items-center gap-2 pt-6" aria-label="Mobile">
              {LINKS.map((l, i) => (
                <motion.div key={l.to} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                  <NavLink to={l.to} onClick={() => setOpen(false)} className="font-display text-3xl text-ivory hover:text-gold">{l.label}</NavLink>
                </motion.div>
              ))}
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="mt-6">
                <Link to={portalPath} onClick={() => setOpen(false)} className="btn-gold">{user ? 'My portal' : 'Portal login'}</Link>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  )
}
