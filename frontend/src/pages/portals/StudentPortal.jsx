import { useEffect, useState } from 'react'
import { BookOpen, CalendarCheck, Award, Download, Bell } from 'lucide-react'
import { getMyResults, getMyAttendance, getNotices } from '../../services/api'
import { useAuth } from '../../context/AuthContext'
import PortalShell, { StatCard, Panel, OfflineNote } from './PortalShell'
import { ProfilePanel } from './cms/CmsKit'

const SAMPLE_MARKS = [
  { subject: 'Mathematics', term: 'Term I', marks: 88, grade: 'A' },
  { subject: 'Science', term: 'Term I', marks: 92, grade: 'A' },
  { subject: 'English', term: 'Term I', marks: 76, grade: 'B' },
  { subject: 'Sinhala', term: 'Term I', marks: 84, grade: 'A' },
  { subject: 'History', term: 'Term I', marks: 71, grade: 'B' },
  { subject: 'ICT', term: 'Term I', marks: 95, grade: 'A' }
]
const SAMPLE_ATT = { present: 168, total: 180 }

export default function StudentPortal() {
  const { user } = useAuth()
  const [marks, setMarks] = useState(SAMPLE_MARKS)
  const [att, setAtt] = useState(SAMPLE_ATT)
  const [notices, setNotices] = useState([])
  const [offline, setOffline] = useState(false)

  useEffect(() => {
    getMyResults().then(setMarks).catch(() => setOffline(true))
    getMyAttendance().then(setAtt).catch(() => {})
    getNotices().then(n => setNotices(n.slice(0, 4)))
  }, [])

  const avg = Math.round(marks.reduce((a, m) => a + Number(m.marks), 0) / (marks.length || 1))
  const attPct = Math.round((att.present / att.total) * 100)

  return (
    <PortalShell title={`Welcome back, ${user?.name || 'Student'}`} subtitle="Your marks, attendance and report cards — all in one place.">
      <OfflineNote error={offline} />
      <div className="mb-8 grid gap-5 sm:grid-cols-3">
        <StatCard icon={Award} label="Term average" value={`${avg}%`} />
        <StatCard icon={CalendarCheck} label={`Attendance (${att.present}/${att.total} days)`} value={`${attPct}%`} />
        <StatCard icon={BookOpen} label="Subjects" value={marks.length} />
      </div>
      <div className="grid gap-7 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Panel title="My marks — Term I"
            right={<button onClick={() => window.print()} className="btn-gold !px-4 !py-1.5 text-xs"><Download size={13} /> Report card (print/PDF)</button>}>
            <table className="w-full text-sm">
              <thead><tr className="text-left text-gold"><th className="pb-3 font-semibold">Subject</th><th className="pb-3 font-semibold">Marks</th><th className="pb-3 font-semibold">Grade</th><th className="pb-3 font-semibold">Progress</th></tr></thead>
              <tbody>
                {marks.map(m => (
                  <tr key={m.subject} className="border-t border-gold/10">
                    <td className="py-3 font-semibold">{m.subject}</td>
                    <td className="py-3">{m.marks}</td>
                    <td className="py-3"><span className="rounded-full bg-gold/15 px-2.5 py-0.5 text-xs font-bold text-gold">{m.grade}</span></td>
                    <td className="py-3 w-1/3"><div className="h-2 rounded-full bg-gold/10"><div className="h-2 rounded-full bg-gradient-to-r from-maroon-bright to-gold" style={{ width: `${m.marks}%` }} /></div></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Panel>
        </div>
        <Panel title="Notices for you" right={<Bell size={16} className="text-gold" />}>
          <ul className="space-y-4 text-sm">
            {notices.map(n => <li key={n.id} className="flex gap-2"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />{n.text}</li>)}
          </ul>
        </Panel>
      </div>
      <div className="mt-7"><ProfilePanel /></div>
    </PortalShell>
  )
}
