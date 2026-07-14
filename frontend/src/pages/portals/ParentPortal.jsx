import { useEffect, useState } from 'react'
import { CalendarCheck, Award, Bell, Mail } from 'lucide-react'
import { getChildOverview, getNotices } from '../../services/api'
import { useAuth } from '../../context/AuthContext'
import PortalShell, { StatCard, Panel, OfflineNote } from './PortalShell'
import { ProfilePanel } from './cms/CmsKit'

const SAMPLE = {
  child: { name: 'K. Dilshan Perera', grade: '10-A', admission_no: 'AV2019/001' },
  attendance: { present: 168, total: 180 },
  marks: [
    { subject: 'Mathematics', marks: 88, grade: 'A' },
    { subject: 'Science', marks: 92, grade: 'A' },
    { subject: 'English', marks: 76, grade: 'B' },
    { subject: 'Sinhala', marks: 84, grade: 'A' }
  ],
  teacher: { name: 'Mr. R. Perera', subject: 'Class teacher — 10-A', email: 'r.perera@school.lk' }
}

export default function ParentPortal() {
  const { user } = useAuth()
  const [data, setData] = useState(SAMPLE)
  const [notices, setNotices] = useState([])
  const [offline, setOffline] = useState(false)

  useEffect(() => {
    getChildOverview().then(setData).catch(() => setOffline(true))
    getNotices().then(n => setNotices(n.slice(0, 5)))
  }, [])

  const attPct = Math.round((data.attendance.present / data.attendance.total) * 100)
  const avg = Math.round(data.marks.reduce((a, m) => a + Number(m.marks), 0) / (data.marks.length || 1))

  return (
    <PortalShell title={`Hello, ${user?.name || 'Parent'}`} subtitle={`Following ${data.child.name} · Grade ${data.child.grade} · ${data.child.admission_no}`}>
      <OfflineNote error={offline} />
      <div className="mb-8 grid gap-5 sm:grid-cols-3">
        <StatCard icon={CalendarCheck} label="Attendance this year" value={`${attPct}%`} />
        <StatCard icon={Award} label="Term average" value={`${avg}%`} />
        <StatCard icon={Bell} label="New announcements" value={notices.length} />
      </div>
      <div className="grid gap-7 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Panel title={`Results — ${data.child.name}`}>
            <table className="w-full text-sm">
              <thead><tr className="text-left text-gold"><th className="pb-3 font-semibold">Subject</th><th className="pb-3 font-semibold">Marks</th><th className="pb-3 font-semibold">Grade</th></tr></thead>
              <tbody>
                {data.marks.map(m => (
                  <tr key={m.subject} className="border-t border-gold/10">
                    <td className="py-3 font-semibold">{m.subject}</td><td className="py-3">{m.marks}</td>
                    <td className="py-3"><span className="rounded-full bg-gold/15 px-2.5 py-0.5 text-xs font-bold text-gold">{m.grade}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Panel>
        </div>
        <div className="space-y-7">
          <Panel title="Announcements">
            <ul className="space-y-3 text-sm">
              {notices.map(n => <li key={n.id} className="flex gap-2"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />{n.text}</li>)}
            </ul>
          </Panel>
          <Panel title="Contact the class teacher">
            <p className="font-bold">{data.teacher.name}</p>
            <p className="muted text-sm">{data.teacher.subject}</p>
            <a href={`mailto:${data.teacher.email}`} className="btn-gold mt-4 !py-2 text-sm"><Mail size={14} /> Write an email</a>
          </Panel>
        </div>
      </div>
      <div className="mt-7"><ProfilePanel /></div>
    </PortalShell>
  )
}
