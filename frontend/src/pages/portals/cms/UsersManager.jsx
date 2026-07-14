import { useEffect, useState } from 'react'
import { Plus, Trash2, KeyRound, Check, X, Loader2 } from 'lucide-react'
import { getUsers, createUser, resetUserPassword, deleteUser } from '../../../services/api'
import { useAuth } from '../../../context/AuthContext'
import { Panel } from '../PortalShell'
import { Field, TextInput, Select, useToast } from './CmsKit'

const ROLE_BADGE = {
  admin: 'bg-gold/20 text-gold', teacher: 'bg-maroon/30 text-maroon-bright',
  student: 'bg-white/10', parent: 'bg-white/10'
}

/** Admin creates a unique username & password for every student, teacher and parent. */
export default function UsersManager() {
  const { user: me } = useAuth()
  const [users, setUsers] = useState(null)
  const [form, setForm] = useState(null)
  const [busy, setBusy] = useState(false)
  const [toastNode, toast] = useToast()

  const load = () => getUsers().then(setUsers).catch(() => setUsers([]))
  useEffect(() => { load() }, [])

  const blank = { role: 'student', username: '', password: '', fullName: '', email: '', grade: '', admissionNo: '', childAdmissionNo: '' }

  const save = async () => {
    setBusy(true)
    try {
      await createUser(form)
      toast(`Account created ✓ — give “${form.username}” their password privately`)
      setForm(null); load()
    } catch (err) {
      toast(err?.response?.data?.message || 'Could not create the account', false)
    } finally { setBusy(false) }
  }

  const reset = async (u) => {
    const pw = prompt(`New password for ${u.username} (min 6 characters):`)
    if (!pw) return
    try { await resetUserPassword(u.id, pw); toast(`Password reset ✓ for ${u.username}`) }
    catch (err) { toast(err?.response?.data?.message || 'Could not reset password', false) }
  }

  const remove = async (u) => {
    if (!confirm(`Delete the account “${u.username}” (${u.role})? This cannot be undone.`)) return
    try { await deleteUser(u.id); toast('Account deleted'); load() }
    catch (err) { toast(err?.response?.data?.message || 'Could not delete', false) }
  }

  return (
    <Panel title="User accounts" right={
      <button onClick={() => setForm({ ...blank })} className="btn-gold !px-4 !py-2 text-xs"><Plus size={14} /> New account</button>
    }>
      {toastNode}
      <p className="muted mb-4 text-xs">
        Every student, teacher and parent gets their own username & password here. Passwords are stored encrypted —
        if someone forgets theirs, use <b>Reset</b> to set a new one.
      </p>

      {form && (
        <div className="mb-6 rounded-2xl border border-gold/25 bg-gold/5 p-5">
          <p className="mb-4 text-sm font-bold text-gold">Create account</p>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Role"><Select options={['student', 'teacher', 'parent', 'admin']} value={form.role} onChange={e => setForm({ ...form, role: e.target.value })} /></Field>
            <Field label="Full name"><TextInput value={form.fullName} onChange={e => setForm({ ...form, fullName: e.target.value })} /></Field>
            <Field label="Username (unique)"><TextInput value={form.username} onChange={e => setForm({ ...form, username: e.target.value })} placeholder="e.g. dilshan2019" /></Field>
            <Field label="Password (min 6 chars)"><TextInput value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} /></Field>
            <Field label="Email (optional)"><TextInput value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} /></Field>
            {form.role === 'student' && <>
              <Field label="Grade / class (e.g. 10-A)"><TextInput value={form.grade} onChange={e => setForm({ ...form, grade: e.target.value })} /></Field>
              <Field label="Admission number (unique)"><TextInput value={form.admissionNo} onChange={e => setForm({ ...form, admissionNo: e.target.value })} placeholder="e.g. AV2026/052" /></Field>
            </>}
            {form.role === 'parent' &&
              <Field label="Child's admission number (links parent → child)"><TextInput value={form.childAdmissionNo} onChange={e => setForm({ ...form, childAdmissionNo: e.target.value })} placeholder="e.g. AV2026/052" /></Field>}
          </div>
          <div className="mt-4 flex gap-2">
            <button onClick={save} disabled={busy} className="btn-gold !px-5 !py-2 text-xs">
              {busy ? <Loader2 size={14} className="animate-spin" /> : <Check size={14} />} Create
            </button>
            <button onClick={() => setForm(null)} className="btn-ghost !px-5 !py-2 text-xs"><X size={14} /> Cancel</button>
          </div>
        </div>
      )}

      {users === null ? <p className="muted text-sm">Loading…</p>
        : users.length === 0 ? <p className="muted text-sm">No accounts found — is the backend running?</p>
        : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead><tr className="muted text-left text-xs uppercase tracking-widest">
                <th className="py-2 pr-4">User</th><th className="py-2 pr-4">Role</th><th className="py-2 pr-4">Class / Adm. No.</th><th className="py-2" /></tr></thead>
              <tbody className="divide-y divide-gold/10">
                {users.map(u => (
                  <tr key={u.id}>
                    <td className="py-2.5 pr-4"><b>{u.username}</b><span className="muted"> — {u.full_name}</span></td>
                    <td className="py-2.5 pr-4"><span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold capitalize ${ROLE_BADGE[u.role]}`}>{u.role}</span></td>
                    <td className="muted py-2.5 pr-4 text-xs">{u.grade || ''} {u.admission_no ? `· ${u.admission_no}` : ''}</td>
                    <td className="py-2.5 text-right">
                      <button onClick={() => reset(u)} className="btn-ghost mr-1 !px-3 !py-1.5 text-xs"><KeyRound size={13} /> Reset</button>
                      {u.id !== me?.id &&
                        <button onClick={() => remove(u)} className="btn-ghost !px-3 !py-1.5 text-xs text-maroon-bright"><Trash2 size={13} /></button>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
    </Panel>
  )
}
