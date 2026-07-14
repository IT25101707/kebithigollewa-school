import { useEffect, useState } from 'react'
import {
  GraduationCap, BookOpen, Banknote, Bus, Library, TrendingUp,
  LayoutDashboard, Settings, Newspaper, CalendarDays, Megaphone,
  Images, FileDown, Users, UserCog, UserCircle
} from 'lucide-react'
import { getAdminStats } from '../../services/api'
import PortalShell, { StatCard, Panel, OfflineNote } from './PortalShell'
import { ResourceManager, ProfilePanel } from './cms/CmsKit'
import SiteSettings from './cms/SiteSettings'
import UsersManager from './cms/UsersManager'

const SAMPLE = {
  students: 3200, teachers: 165, feesCollectedPct: 82, busRoutes: 12, libraryBooks: 18450,
  enrolment: [2850, 2920, 2980, 3040, 3120, 3200],
  attendanceByGrade: [['Primary', 96], ['Grades 6–9', 93], ['O/L', 91], ['A/L', 89]]
}
const YEARS = [2021, 2022, 2023, 2024, 2025, 2026]

const TABS = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'settings', label: 'Site settings', icon: Settings },
  { id: 'news', label: 'News', icon: Newspaper },
  { id: 'events', label: 'Events', icon: CalendarDays },
  { id: 'notices', label: 'Notices', icon: Megaphone },
  { id: 'gallery', label: 'Gallery', icon: Images },
  { id: 'downloads', label: 'Downloads', icon: FileDown },
  { id: 'teachers', label: 'Teachers', icon: Users },
  { id: 'users', label: 'Accounts', icon: UserCog },
  { id: 'profile', label: 'My profile', icon: UserCircle }
]

export default function AdminPortal() {
  const [tab, setTab] = useState('dashboard')

  return (
    <PortalShell title="School command centre"
      subtitle="Manage the whole website from here — no coding needed. Changes go live instantly.">
      <div className="mb-8 flex flex-wrap gap-2">
        {TABS.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)}
            className={`flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-bold uppercase tracking-wider transition
              ${tab === t.id ? 'bg-gold text-ink' : 'glass hover:!border-gold'}`}>
            <t.icon size={13} /> {t.label}
          </button>
        ))}
      </div>

      {tab === 'dashboard' && <Dashboard />}
      {tab === 'settings' && <SiteSettings />}

      {tab === 'news' && (
        <ResourceManager resource="news" title="News articles"
          note="These appear on the homepage (latest 3) and the News & Events page."
          display={i => <><b>{i.title}</b> <span className="muted">· {i.category} · {String(i.date).slice(0, 10)}</span></>}
          fields={[
            { name: 'title', label: 'Headline', type: 'text' },
            { name: 'category', label: 'Category', type: 'select', options: ['Academics', 'Sports', 'Achievements', 'Events', 'General'] },
            { name: 'date', label: 'Date', type: 'date' },
            { name: 'excerpt', label: 'Short summary', type: 'textarea' },
            { name: 'image', label: 'Photo', type: 'image' }
          ]} />
      )}

      {tab === 'events' && (
        <ResourceManager resource="events" title="Upcoming events"
          note="Only events from today onwards are shown to visitors."
          display={i => <><b>{i.title}</b> <span className="muted">· {String(i.date).slice(0, 10)} · {i.location}</span></>}
          fields={[
            { name: 'title', label: 'Event name', type: 'text' },
            { name: 'date', label: 'Date', type: 'date' },
            { name: 'time', label: 'Time (e.g. 9.00 a.m.)', type: 'text' },
            { name: 'location', label: 'Location', type: 'text' },
            { name: 'tag', label: 'Tag', type: 'select', options: ['Academic', 'Sports', 'Ceremony', 'Cultural', 'Other'] }
          ]} />
      )}

      {tab === 'notices' && (
        <ResourceManager resource="notices" title="Notice ticker"
          note="These scroll across the top of the homepage. Newest first, latest 12 shown."
          display={i => i.text}
          fields={[{ name: 'text', label: 'Notice text', type: 'textarea' }]} />
      )}

      {tab === 'gallery' && (
        <ResourceManager resource="gallery" title="Photo & video gallery"
          note="Group items into albums by giving them the same album name. For videos, paste a YouTube embed URL (https://www.youtube.com/embed/…)."
          display={i => <><b>{i.title || '(untitled)'}</b> <span className="muted">· {i.album} · {i.type}</span></>}
          fields={[
            { name: 'album', label: 'Album name (e.g. Sports Meet 2026)', type: 'text' },
            { name: 'title', label: 'Caption', type: 'text' },
            { name: 'type', label: 'Type', type: 'select', options: ['image', 'video'] },
            { name: 'src', label: 'Photo (upload) or video embed URL', type: 'image' }
          ]} />
      )}

      {tab === 'downloads' && (
        <ResourceManager resource="downloads" title="Downloads (forms, papers, timetables)"
          note="Upload the actual PDF/DOCX here — visitors get a real Download button. Size & type fill in automatically when you upload."
          display={i => <><b>{i.name}</b> <span className="muted">· {i.category} · {i.size || ''} {i.type || ''}</span></>}
          fields={[
            { name: 'name', label: 'Document name', type: 'text' },
            { name: 'category', label: 'Category', type: 'select', options: ['Admissions', 'Timetables', 'Term Test Papers', 'School Letters', 'Other'] },
            { name: 'file_url', label: 'File (PDF, DOCX…)', type: 'file' }
          ]} />
      )}

      {tab === 'teachers' && (
        <ResourceManager resource="teachers" title="Teachers directory"
          note="Shown on the Academics page."
          display={i => <><b>{i.name}</b> <span className="muted">· {i.subject} · {i.grade}</span></>}
          fields={[
            { name: 'name', label: 'Name', type: 'text' },
            { name: 'subject', label: 'Subject', type: 'text' },
            { name: 'grade', label: 'Section (e.g. A/L, O/L, Primary)', type: 'text' },
            { name: 'photo', label: 'Photo', type: 'image' }
          ]} />
      )}

      {tab === 'users' && <UsersManager />}
      {tab === 'profile' && <ProfilePanel />}
    </PortalShell>
  )
}

function Dashboard() {
  const [s, setS] = useState(SAMPLE)
  const [offline, setOffline] = useState(false)
  useEffect(() => { getAdminStats().then(d => setS({ ...SAMPLE, ...d })).catch(() => setOffline(true)) }, [])
  const max = Math.max(...s.enrolment)

  return (
    <>
      <OfflineNote error={offline} />
      <div className="mb-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
        <StatCard icon={GraduationCap} label="Students" value={s.students.toLocaleString()} />
        <StatCard icon={BookOpen} label="Teachers" value={s.teachers} />
        <StatCard icon={Banknote} label="Facility fees collected" value={`${s.feesCollectedPct}%`} />
        <StatCard icon={Bus} label="Bus routes" value={s.busRoutes} />
        <StatCard icon={Library} label="Library books" value={s.libraryBooks.toLocaleString()} />
      </div>

      <div className="grid gap-7 lg:grid-cols-2">
        <Panel title="Enrolment growth" right={<TrendingUp size={16} className="text-gold" />}>
          <div className="flex h-52 items-end gap-3">
            {s.enrolment.map((v, i) => (
              <div key={i} className="group flex flex-1 flex-col items-center gap-2">
                <span className="text-xs font-bold text-gold opacity-0 transition group-hover:opacity-100">{v}</span>
                <div className="w-full rounded-t-xl bg-gradient-to-t from-maroon to-gold transition group-hover:from-maroon-bright"
                  style={{ height: `${(v / max) * 100}%` }} />
                <span className="muted text-xs">{YEARS[i]}</span>
              </div>
            ))}
          </div>
        </Panel>
        <Panel title="Attendance by section (this month)">
          <div className="space-y-5 pt-2">
            {s.attendanceByGrade.map(([label, pct]) => (
              <div key={label}>
                <div className="mb-1.5 flex justify-between text-sm"><span className="font-semibold">{label}</span><span className="text-gold">{pct}%</span></div>
                <div className="h-2.5 rounded-full bg-gold/10"><div className="h-2.5 rounded-full bg-gradient-to-r from-maroon-bright to-gold" style={{ width: `${pct}%` }} /></div>
              </div>
            ))}
          </div>
        </Panel>
        <Panel title="How to edit the website">
          <ul className="muted space-y-2 text-sm">
            <li>• <b className="text-gold">Site settings</b> — school name, motto, logo, principal, contacts, anthem, homepage numbers</li>
            <li>• <b className="text-gold">News / Events / Notices</b> — what visitors see on the homepage & News page</li>
            <li>• <b className="text-gold">Gallery</b> — upload photos straight from your computer, grouped into albums</li>
            <li>• <b className="text-gold">Downloads</b> — upload real PDFs so parents can download forms</li>
            <li>• <b className="text-gold">Accounts</b> — create a unique username & password for every student, teacher and parent</li>
            <li>• <b className="text-gold">My profile</b> — change your own admin username & password</li>
          </ul>
        </Panel>
        <Panel title="System status">
          <ul className="space-y-3 text-sm">
            <li className="flex items-center gap-2"><span className={`h-2 w-2 rounded-full ${offline ? 'bg-maroon-bright' : 'bg-emerald-400'}`} /> API server {offline ? 'offline — content editing needs the backend' : 'connected — editing enabled'}</li>
            <li className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-emerald-400" /> Website: live</li>
            <li className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-emerald-400" /> Notice ticker: publishing</li>
          </ul>
        </Panel>
      </div>
    </>
  )
}
