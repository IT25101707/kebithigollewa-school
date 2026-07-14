import { useEffect, useState } from 'react'
import { Check, Loader2 } from 'lucide-react'
import { getSettings, saveSettings } from '../../../services/api'
import { SCHOOL } from '../../../config/school'
import { Panel } from '../PortalShell'
import { Field, TextInput, TextArea, FileInput, useToast } from './CmsKit'

/** Edits every piece of school identity shown on the public site.
 *  Saved to the database → the whole website updates on next load. */
export default function SiteSettings() {
  const [s, setS] = useState(null)
  const [busy, setBusy] = useState(false)
  const [toastNode, toast] = useToast()

  useEffect(() => {
    getSettings().then(saved => {
      // start from current live values (defaults merged with anything saved before)
      const base = JSON.parse(JSON.stringify(SCHOOL))
      const merged = { ...base, ...saved, social: { ...base.social, ...(saved.social || {}) }, principal: { ...base.principal, ...(saved.principal || {}) } }
      merged.heroImages = [0, 1, 2, 3].map(i => ((saved.heroImages || base.heroImages || [])[i]) || '')
      merged.anthemText = (merged.anthem || []).join('\n')
      merged.timelineText = (merged.timeline || []).map(t => `${t.year} | ${t.title} | ${t.text}`).join('\n')
      merged.adminTeamText = (merged.adminTeam || []).map(a => `${a.name} | ${a.role}`).join('\n')
      merged.statsText = (merged.stats || []).map(x => `${x.label} | ${x.value} | ${x.suffix || ''}`).join('\n')
      setS(merged)
    })
  }, [])

  const set = (k, v) => setS({ ...s, [k]: v })
  const setNested = (obj, k, v) => setS({ ...s, [obj]: { ...s[obj], [k]: v } })

  const save = async () => {
    setBusy(true)
    try {
      const payload = { ...s }
      payload.anthem = s.anthemText.split('\n')
      payload.stats = s.statsText.split('\n').filter(Boolean).map(line => {
        const [label, value, suffix] = line.split('|').map(x => x.trim())
        return { label, value: Number(value) || 0, suffix: suffix || '' }
      })
      payload.established = Number(payload.established) || payload.established
      payload.heroImages = (s.heroImages || []).filter(Boolean)
      payload.timeline = s.timelineText.split('\n').filter(Boolean).map(line => {
        const [year, title, ...rest] = line.split('|').map(x => x.trim())
        return { year, title, text: rest.join(' | ') }
      })
      payload.adminTeam = s.adminTeamText.split('\n').filter(Boolean).map(line => {
        const [name, role] = line.split('|').map(x => x.trim())
        return { name, role: role || '' }
      })
      delete payload.anthemText; delete payload.statsText; delete payload.timelineText; delete payload.adminTeamText
      await saveSettings(payload)
      toast('Saved ✓ — refresh any page to see it live')
    } catch (err) {
      toast(err?.response?.data?.message || 'Could not save — are you signed in as admin & is the backend running?', false)
    } finally { setBusy(false) }
  }

  if (!s) return <Panel title="Site settings"><p className="muted text-sm">Loading…</p></Panel>

  return (
    <div className="grid gap-7">
      {toastNode}
      <Panel title="School identity">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="School name"><TextInput value={s.name} onChange={e => set('name', e.target.value)} /></Field>
          <Field label="Short name / initials"><TextInput value={s.shortName} onChange={e => set('shortName', e.target.value)} /></Field>
          <Field label="Motto"><TextInput value={s.motto} onChange={e => set('motto', e.target.value)} /></Field>
          <Field label="Motto (English)"><TextInput value={s.mottoEnglish} onChange={e => set('mottoEnglish', e.target.value)} /></Field>
          <Field label="Established (year)"><TextInput value={s.established} onChange={e => set('established', e.target.value)} /></Field>
          <div className="sm:col-span-2"><Field label="School logo / crest"><FileInput toast={toast} value={s.logo} onChange={v => set('logo', v)} /></Field></div>
        </div>
      </Panel>

      <Panel title="Homepage background photos (slideshow)">
        <p className="muted mb-4 text-xs">
          These 4 photos rotate behind the school name on the homepage. Upload wide (landscape) photos of the school —
          buildings, grounds, events. Leave a box empty to skip it.
        </p>
        <div className="grid gap-4 sm:grid-cols-2">
          {[0, 1, 2, 3].map(i => (
            <Field key={i} label={`Photo ${i + 1}`}>
              <FileInput toast={toast} value={s.heroImages[i]}
                onChange={v => { const arr = [...s.heroImages]; arr[i] = v; set('heroImages', arr) }} />
            </Field>
          ))}
        </div>
      </Panel>

      <Panel title="Contact details">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2"><Field label="Address"><TextInput value={s.address} onChange={e => set('address', e.target.value)} /></Field></div>
          <Field label="Phone"><TextInput value={s.phone} onChange={e => set('phone', e.target.value)} /></Field>
          <Field label="Email"><TextInput value={s.email} onChange={e => set('email', e.target.value)} /></Field>
          <div className="sm:col-span-2">
            <Field label="Google Maps embed URL (Maps → Share → Embed a map → copy the src=… link)">
              <TextInput value={s.mapEmbed} onChange={e => set('mapEmbed', e.target.value)} />
            </Field>
          </div>
          <Field label="Facebook"><TextInput value={s.social.facebook} onChange={e => setNested('social', 'facebook', e.target.value)} /></Field>
          <Field label="YouTube"><TextInput value={s.social.youtube} onChange={e => setNested('social', 'youtube', e.target.value)} /></Field>
          <Field label="Instagram"><TextInput value={s.social.instagram} onChange={e => setNested('social', 'instagram', e.target.value)} /></Field>
          <Field label="WhatsApp"><TextInput value={s.social.whatsapp} onChange={e => setNested('social', 'whatsapp', e.target.value)} /></Field>
        </div>
      </Panel>

      <Panel title="Principal">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Name"><TextInput value={s.principal.name} onChange={e => setNested('principal', 'name', e.target.value)} /></Field>
          <Field label="Title"><TextInput value={s.principal.title} onChange={e => setNested('principal', 'title', e.target.value)} /></Field>
          <div className="sm:col-span-2"><Field label="Photo"><FileInput toast={toast} value={s.principal.photo} onChange={v => setNested('principal', 'photo', v)} /></Field></div>
          <div className="sm:col-span-2"><Field label="Principal's message"><TextArea rows={6} value={s.principal.message} onChange={e => setNested('principal', 'message', e.target.value)} /></Field></div>
          <div className="sm:col-span-2"><Field label="Principal's message — second paragraph (About page, optional)"><TextArea rows={4} value={s.principal.message2 || ''} onChange={e => setNested('principal', 'message2', e.target.value)} /></Field></div>
        </div>
      </Panel>

      <Panel title="About page">
        <div className="grid gap-4">
          <Field label="About page heading"><TextInput value={s.aboutTitle || ''} onChange={e => set('aboutTitle', e.target.value)} /></Field>
          <Field label="Our Vision"><TextArea rows={3} value={s.vision || ''} onChange={e => set('vision', e.target.value)} /></Field>
          <Field label="Our Mission"><TextArea rows={3} value={s.mission || ''} onChange={e => set('mission', e.target.value)} /></Field>
          <Field label="History timeline — one per line, format:  Year | Title | Description">
            <TextArea rows={7} value={s.timelineText} onChange={e => set('timelineText', e.target.value)} />
          </Field>
          <Field label="Administration team — one per line, format:  Name | Position">
            <TextArea rows={7} value={s.adminTeamText} onChange={e => set('adminTeamText', e.target.value)} />
          </Field>
          <Field label="Virtual tour video — YouTube embed URL (YouTube video → Share → Embed → copy the src=… link)">
            <TextInput value={s.tourVideo || ''} onChange={e => set('tourVideo', e.target.value)} placeholder="https://www.youtube.com/embed/XXXXXXX" />
          </Field>
        </div>
      </Panel>

      <Panel title="Homepage statistics & anthem">
        <div className="grid gap-4">
          <Field label="Statistics — one per line, format:  Label | number | suffix   (e.g.  Students | 3200 | +)">
            <TextArea rows={4} value={s.statsText} onChange={e => set('statsText', e.target.value)} />
          </Field>
          <Field label="School anthem — one line per lyric line (leave an empty line between verses)">
            <TextArea rows={8} value={s.anthemText} onChange={e => set('anthemText', e.target.value)} />
          </Field>
        </div>
      </Panel>

      <button onClick={save} disabled={busy} className="btn-gold w-fit !px-8 !py-3">
        {busy ? <Loader2 size={16} className="animate-spin" /> : <Check size={16} />} Save all settings
      </button>
    </div>
  )
}
