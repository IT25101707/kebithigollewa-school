import { useEffect, useState } from 'react'
import { Users, ClipboardCheck, Megaphone, Save, Upload } from 'lucide-react'
import { getStudents, saveMark, saveAttendance, publishNotice } from '../../services/api'
import { useAuth } from '../../context/AuthContext'
import PortalShell, { StatCard, Panel, OfflineNote } from './PortalShell'
import { ProfilePanel } from './cms/CmsKit'

const SAMPLE_STUDENTS = [
  { id: 1, name: 'K. Dilshan Perera', admission_no: 'AV2019/001', grade: '10-A' },
  { id: 2, name: 'S. Amaya Fernando', admission_no: 'AV2019/014', grade: '10-A' },
  { id: 3, name: 'M. Ravindu Silva', admission_no: 'AV2019/027', grade: '10-A' },
  { id: 4, name: 'T. Sanduni Herath', admission_no: 'AV2019/033', grade: '10-A' },
  { id: 5, name: 'N. Kavindu Jayalath', admission_no: 'AV2019/041', grade: '10-A' }
]

export default function TeacherPortal() {
  const { user } = useAuth()
  const [students, setStudents] = useState(SAMPLE_STUDENTS)
  const [offline, setOffline] = useState(false)
  const [marks, setMarks] = useState({})
  const [attendance, setAttendance] = useState({})
  const [notice, setNotice] = useState('')
  const [msg, setMsg] = useState('')

  useEffect(() => {
    getStudents({ grade: '10-A' }).then(setStudents).catch(() => setOffline(true))
  }, [])

  const flash = (t) => { setMsg(t); setTimeout(() => setMsg(''), 3500) }

  const submitMarks = async () => {
    try {
      await Promise.all(Object.entries(marks).map(([studentId, m]) =>
        saveMark({ studentId: Number(studentId), subject: 'Mathematics', term: 'Term II', marks: Number(m) })))
      flash('Marks saved ✔')
    } catch { flash('Could not save — is the backend running?') }
  }
  const submitAttendance = async () => {
    try {
      const today = new Date().toISOString().slice(0, 10)
      await Promise.all(students.map(s =>
        saveAttendance({ studentId: s.id, date: today, status: attendance[s.id] === false ? 'absent' : 'present' })))
      flash('Attendance recorded ✔')
    } catch { flash('Could not save — is the backend running?') }
  }
  const submitNotice = async () => {
    if (!notice.trim()) return
    try { await publishNotice({ text: notice }); setNotice(''); flash('Notice published ✔') }
    catch { flash('Could not publish — is the backend running?') }
  }

  return (
    <PortalShell title={`Good morning, ${user?.name || 'Teacher'}`} subtitle="Class 10-A · Mathematics — manage students, marks, attendance and notices.">
      <OfflineNote error={offline} />
      {msg && <p className="glass mb-6 border-gold/40 px-5 py-3 text-sm font-semibold text-gold">{msg}</p>}
      <div className="mb-8 grid gap-5 sm:grid-cols-3">
        <StatCard icon={Users} label="Students in class" value={students.length} />
        <StatCard icon={ClipboardCheck} label="Attendance today" value={`${students.filter(s => attendance[s.id] !== false).length}/${students.length}`} />
        <StatCard icon={Megaphone} label="Term" value="II · 2026" />
      </div>

      <div className="grid gap-7 lg:grid-cols-2">
        <Panel title="Enter marks — Mathematics · Term II"
          right={<button onClick={submitMarks} className="btn-gold !px-4 !py-1.5 text-xs"><Save size={13} /> Save marks</button>}>
          <div className="space-y-3">
            {students.map(s => (
              <div key={s.id} className="flex items-center gap-3 text-sm">
                <span className="w-40 truncate font-semibold">{s.name}</span>
                <span className="muted flex-1 truncate text-xs">{s.admission_no}</span>
                <input type="number" min="0" max="100" placeholder="0–100" aria-label={`Marks for ${s.name}`}
                  value={marks[s.id] ?? ''} onChange={e => setMarks(m => ({ ...m, [s.id]: e.target.value }))}
                  className="input !w-24 !py-2 text-center" />
              </div>
            ))}
          </div>
        </Panel>

        <Panel title="Record today's attendance"
          right={<button onClick={submitAttendance} className="btn-gold !px-4 !py-1.5 text-xs"><Save size={13} /> Save</button>}>
          <div className="space-y-3">
            {students.map(s => {
              const present = attendance[s.id] !== false
              return (
                <div key={s.id} className="flex items-center gap-3 text-sm">
                  <span className="flex-1 truncate font-semibold">{s.name}</span>
                  <button onClick={() => setAttendance(a => ({ ...a, [s.id]: !present }))}
                    className={`rounded-full px-4 py-1.5 text-xs font-bold transition ${present ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40' : 'bg-maroon-deep/40 text-maroon-bright border border-maroon-bright/40'}`}>
                    {present ? 'Present' : 'Absent'}
                  </button>
                </div>
              )
            })}
          </div>
        </Panel>

        <Panel title="Publish a notice">
          <textarea rows={3} value={notice} onChange={e => setNotice(e.target.value)}
            placeholder="e.g. Grade 10-A: bring your practical books on Friday."
            className="input resize-none" />
          <button onClick={submitNotice} className="btn-gold mt-4 !py-2 text-sm"><Megaphone size={14} /> Publish to live ticker</button>
        </Panel>

        <Panel title="Upload study materials">
          <label className="grid cursor-pointer place-items-center gap-2 rounded-2xl border-2 border-dashed border-gold/25 p-8 text-center text-sm transition hover:border-gold/60">
            <Upload className="text-gold" />
            <span className="font-semibold">Drop a file or click to choose</span>
            <span className="muted text-xs">PDF, DOCX, PPTX up to 20 MB — wire this to POST /api/materials in the backend.</span>
            <input type="file" className="hidden" onChange={() => flash('File selected — connect the upload route to store it.')} />
          </label>
        </Panel>
      </div>
      <div className="mt-7"><ProfilePanel /></div>
    </PortalShell>
  )
}
