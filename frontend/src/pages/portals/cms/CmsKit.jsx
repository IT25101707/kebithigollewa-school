import { useEffect, useRef, useState } from 'react'
import { Plus, Pencil, Trash2, Upload, Check, X, Loader2, Eye, EyeOff } from 'lucide-react'
import { listItems, createItem, updateItem, deleteItem, uploadFile, fileUrl, updateMyProfile } from '../../../services/api'
import { Panel } from '../PortalShell'

// ── tiny toast ────────────────────────────────────────
export function useToast() {
  const [msg, setMsg] = useState(null)
  const show = (text, ok = true) => { setMsg({ text, ok }); setTimeout(() => setMsg(null), 3500) }
  const node = msg && (
    <div className={`fixed bottom-6 left-1/2 z-[90] -translate-x-1/2 rounded-full px-5 py-2.5 text-sm font-semibold shadow-xl ${msg.ok ? 'bg-gold text-ink' : 'bg-maroon-bright text-white'}`}>
      {msg.text}
    </div>
  )
  return [node, show]
}

// ── field inputs ──────────────────────────────────────
export function Field({ label, children }) {
  return (
    <label className="block">
      <span className="muted mb-1.5 block text-xs font-semibold uppercase tracking-widest">{label}</span>
      {children}
    </label>
  )
}

export function TextInput(props) { return <input {...props} className="input w-full" /> }

export function TextArea(props) { return <textarea rows={4} {...props} className="input w-full" /> }

export function Select({ options, ...props }) {
  return (
    <select {...props} className="input w-full">
      {options.map(o => <option key={o} value={o}>{o}</option>)}
    </select>
  )
}

/** URL box + Upload button. Works for photos AND documents. */
export function FileInput({ value, onChange, accept = 'image/*', preview = true, toast }) {
  const ref = useRef()
  const [busy, setBusy] = useState(false)
  const pick = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    setBusy(true)
    try {
      const { url, size } = await uploadFile(file)
      onChange(url, size)
      toast?.('Uploaded ✓')
    } catch (err) {
      toast?.(err?.response?.data?.message || 'Upload failed — is the backend running?', false)
    } finally { setBusy(false); e.target.value = '' }
  }
  return (
    <div>
      <div className="flex gap-2">
        <input className="input w-full" placeholder="Paste a link (https://…) or upload →"
          value={value || ''} onChange={e => onChange(e.target.value)} />
        <button type="button" onClick={() => ref.current.click()}
          className="btn-ghost shrink-0 !px-4 !py-2 text-xs">
          {busy ? <Loader2 size={14} className="animate-spin" /> : <Upload size={14} />} Upload
        </button>
        <input ref={ref} type="file" accept={accept} hidden onChange={pick} />
      </div>
      {preview && value && /\.(png|jpe?g|gif|webp|svg)($|\?)/i.test(value) && (
        <img src={fileUrl(value)} alt="" className="mt-2 h-20 rounded-lg border border-gold/20 object-cover" />
      )}
    </div>
  )
}

// ── generic list + form manager for any resource ─────
/**
 * fields: [{ name, label, type: 'text'|'textarea'|'date'|'select'|'image'|'file', options?, listWidth? }]
 * display: (item) => primary text in the list
 */
export function ResourceManager({ resource, title, fields, display, note }) {
  const [items, setItems] = useState(null)
  const [editing, setEditing] = useState(null) // null | {} (new) | item
  const [saving, setSaving] = useState(false)
  const [toastNode, toast] = useToast()

  const load = () => listItems(resource).then(setItems).catch(() => setItems([]))
  useEffect(() => { load() }, [resource])

  const blank = Object.fromEntries(fields.map(f => [f.name, f.type === 'select' ? f.options[0] : '']))

  const save = async () => {
    setSaving(true)
    try {
      if (editing.id) await updateItem(resource, editing.id, editing)
      else await createItem(resource, editing)
      toast('Saved ✓ — it is live on the website now')
      setEditing(null); load()
    } catch (err) {
      toast(err?.response?.data?.message || 'Could not save — is the backend running?', false)
    } finally { setSaving(false) }
  }

  const remove = async (item) => {
    if (!confirm('Delete this item? This cannot be undone.')) return
    try { await deleteItem(resource, item.id); toast('Deleted'); load() }
    catch { toast('Could not delete', false) }
  }

  return (
    <Panel title={title} right={
      <button onClick={() => setEditing({ ...blank })} className="btn-gold !px-4 !py-2 text-xs"><Plus size={14} /> Add new</button>
    }>
      {toastNode}
      {note && <p className="muted mb-4 text-xs">{note}</p>}

      {editing && (
        <div className="mb-6 rounded-2xl border border-gold/25 bg-gold/5 p-5">
          <p className="mb-4 text-sm font-bold text-gold">{editing.id ? 'Edit item' : 'New item'}</p>
          <div className="grid gap-4 sm:grid-cols-2">
            {fields.map(f => (
              <div key={f.name} className={f.type === 'textarea' || f.type === 'image' || f.type === 'file' ? 'sm:col-span-2' : ''}>
                <Field label={f.label}>
                  {f.type === 'textarea' ? <TextArea value={editing[f.name] || ''} onChange={e => setEditing({ ...editing, [f.name]: e.target.value })} />
                    : f.type === 'select' ? <Select options={f.options} value={editing[f.name] || f.options[0]} onChange={e => setEditing({ ...editing, [f.name]: e.target.value })} />
                    : f.type === 'image' ? <FileInput toast={toast} value={editing[f.name]} onChange={v => setEditing({ ...editing, [f.name]: v })} />
                    : f.type === 'file' ? <FileInput toast={toast} accept="*" preview={false} value={editing[f.name]}
                        onChange={(v, size) => setEditing({ ...editing, [f.name]: v, ...(size ? { size, type: (v.split('.').pop() || '').toUpperCase().slice(0, 6) } : {}) })} />
                    : <TextInput type={f.type} value={editing[f.name] || ''} onChange={e => setEditing({ ...editing, [f.name]: e.target.value })} />}
                </Field>
              </div>
            ))}
          </div>
          <div className="mt-4 flex gap-2">
            <button onClick={save} disabled={saving} className="btn-gold !px-5 !py-2 text-xs">
              {saving ? <Loader2 size={14} className="animate-spin" /> : <Check size={14} />} Save
            </button>
            <button onClick={() => setEditing(null)} className="btn-ghost !px-5 !py-2 text-xs"><X size={14} /> Cancel</button>
          </div>
        </div>
      )}

      {items === null ? <p className="muted text-sm">Loading…</p>
        : items.length === 0 ? <p className="muted text-sm">Nothing here yet — click “Add new”.</p>
        : (
          <ul className="divide-y divide-gold/10">
            {items.map(item => (
              <li key={item.id} className="flex items-center gap-3 py-3">
                <span className="min-w-0 flex-1 truncate text-sm">{display(item)}</span>
                <button onClick={() => setEditing({ ...item })} className="btn-ghost !px-3 !py-1.5 text-xs"><Pencil size={13} /> Edit</button>
                <button onClick={() => remove(item)} className="btn-ghost !px-3 !py-1.5 text-xs text-maroon-bright"><Trash2 size={13} /></button>
              </li>
            ))}
          </ul>
        )}
    </Panel>
  )
}

// ── change your own username / password (all portals) ─
export function ProfilePanel() {
  const [form, setForm] = useState({ currentPassword: '', newUsername: '', newPassword: '', fullName: '' })
  const [showPw, setShowPw] = useState(false)
  const [busy, setBusy] = useState(false)
  const [toastNode, toast] = useToast()

  const submit = async () => {
    if (!form.currentPassword) return toast('Enter your current password first', false)
    setBusy(true)
    try {
      await updateMyProfile(form)
      toast('Profile updated ✓')
      setForm({ currentPassword: '', newUsername: '', newPassword: '', fullName: '' })
      setTimeout(() => window.location.reload(), 1200)
    } catch (err) {
      toast(err?.response?.data?.message || 'Could not update profile', false)
    } finally { setBusy(false) }
  }

  return (
    <Panel title="My profile — change username & password">
      {toastNode}
      <div className="grid max-w-xl gap-4">
        <Field label="Current password (required to confirm)">
          <div className="relative">
            <TextInput type={showPw ? 'text' : 'password'} value={form.currentPassword}
              onChange={e => setForm({ ...form, currentPassword: e.target.value })} />
            <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 opacity-60">
              {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
            </button>
          </div>
        </Field>
        <Field label="New display name (optional)">
          <TextInput value={form.fullName} onChange={e => setForm({ ...form, fullName: e.target.value })} placeholder="Leave blank to keep current" />
        </Field>
        <Field label="New username (optional)">
          <TextInput value={form.newUsername} onChange={e => setForm({ ...form, newUsername: e.target.value })} placeholder="Leave blank to keep current" />
        </Field>
        <Field label="New password (optional, min 6 characters)">
          <TextInput type="password" value={form.newPassword} onChange={e => setForm({ ...form, newPassword: e.target.value })} placeholder="Leave blank to keep current" />
        </Field>
        <button onClick={submit} disabled={busy} className="btn-gold w-fit !px-6 !py-2.5 text-sm">
          {busy ? <Loader2 size={15} className="animate-spin" /> : <Check size={15} />} Update my profile
        </button>
      </div>
    </Panel>
  )
}
