import { useEffect, useState } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import Loader from './components/Loader.jsx'
import ScrollProgress from './components/ScrollProgress.jsx'
import FloatingActions from './components/FloatingActions.jsx'
import ChatBot from './components/ChatBot.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import { getSettings, fileUrl } from './services/api'
import { SCHOOL } from './config/school'

function mergeDeep(target, src) {
  for (const k of Object.keys(src || {})) {
    if (src[k] && typeof src[k] === 'object' && !Array.isArray(src[k]) && typeof target[k] === 'object' && !Array.isArray(target[k])) {
      mergeDeep(target[k], src[k])
    } else if (src[k] !== undefined && src[k] !== null && src[k] !== '') {
      target[k] = src[k]
    }
  }
}

import Home from './pages/Home.jsx'
import About from './pages/About.jsx'
import Academics from './pages/Academics.jsx'
import StudentLife from './pages/StudentLife.jsx'
import NewsEvents from './pages/NewsEvents.jsx'
import Gallery from './pages/Gallery.jsx'
import Downloads from './pages/Downloads.jsx'
import Contact from './pages/Contact.jsx'
import Login from './pages/Login.jsx'
import NotFound from './pages/NotFound.jsx'
import StudentPortal from './pages/portals/StudentPortal.jsx'
import TeacherPortal from './pages/portals/TeacherPortal.jsx'
import ParentPortal from './pages/portals/ParentPortal.jsx'
import AdminPortal from './pages/portals/AdminPortal.jsx'

export default function App() {
  const [loading, setLoading] = useState(true)
  const location = useLocation()

  useEffect(() => {
    // Load admin-saved site content while the loader plays (min 1.2s, max 3s)
    const minWait = new Promise(r => setTimeout(r, 1200))
    const settings = Promise.race([
      getSettings().then(s => {
        mergeDeep(SCHOOL, s)
        SCHOOL.logo = fileUrl(SCHOOL.logo)
        if (SCHOOL.principal) SCHOOL.principal.photo = fileUrl(SCHOOL.principal.photo)
      }).catch(() => {}),
      new Promise(r => setTimeout(r, 3000))
    ])
    Promise.all([minWait, settings]).then(() => setLoading(false))
  }, [])

  useEffect(() => { window.scrollTo({ top: 0 }) }, [location.pathname])

  if (loading) return <Loader />

  return (
    <div className="min-h-screen flex flex-col">
      <ScrollProgress />
      <Navbar />
      <main className="flex-1">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/academics" element={<Academics />} />
            <Route path="/student-life" element={<StudentLife />} />
            <Route path="/news-events" element={<NewsEvents />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/downloads" element={<Downloads />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/portal/student" element={<ProtectedRoute role="student"><StudentPortal /></ProtectedRoute>} />
            <Route path="/portal/teacher" element={<ProtectedRoute role="teacher"><TeacherPortal /></ProtectedRoute>} />
            <Route path="/portal/parent" element={<ProtectedRoute role="parent"><ParentPortal /></ProtectedRoute>} />
            <Route path="/portal/admin" element={<ProtectedRoute role="admin"><AdminPortal /></ProtectedRoute>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AnimatePresence>
      </main>
      <Footer />
      <FloatingActions />
      <ChatBot />
    </div>
  )
}
