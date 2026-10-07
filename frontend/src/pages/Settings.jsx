import { useState } from 'react'
import { Bell, Check, Globe2, Languages, LockKeyhole, Save, SlidersHorizontal, UserRound } from 'lucide-react'
import Avatar from '../components/Avatar.jsx'
import { useApp } from '../context/AppContext.jsx'

const defaultSettings = { name: 'Admin', email: 'admin@studenthub.edu.in', emailUpdates: true, weeklyDigest: false, loginAlerts: true, language: 'English', dateFormat: 'DD MMM YYYY', timezone: 'Asia/Kolkata' }
function readSettings() {
  try { return { ...defaultSettings, ...JSON.parse(localStorage.getItem('studenthub.settings') || '{}') } } catch { return defaultSettings }
}

export default function Settings() {
  const [settings, setSettings] = useState(readSettings)
  const { notify } = useApp()
  const update = (key, value) => setSettings((current) => ({ ...current, [key]: value }))
  const toggle = (key) => update(key, !settings[key])
  const save = (event) => {
    event.preventDefault()
    localStorage.setItem('studenthub.settings', JSON.stringify(settings))
    notify('Settings saved successfully')
  }

  return (
    <div className="page-stack">
      <div className="page-heading"><div><span className="eyebrow">ADMINISTRATION</span><h1>Settings</h1><p>Manage your profile, notifications, and application preferences.</p></div></div>
      <form className="settings-layout" onSubmit={save}>
        <div className="settings-main">
          <section className="panel settings-section"><div className="settings-section-heading"><div className="settings-section-icon"><UserRound size={18} /></div><div><h2>Profile Settings</h2><p>Update the administrator account details.</p></div></div><div className="settings-profile"><Avatar name={settings.name} size="profile-small" /><div><strong>{settings.name}</strong><span>System administrator</span></div><span className="verified-tag"><Check size={13} /> Verified</span></div><div className="settings-fields"><label className="form-field"><span>Full name</span><input value={settings.name} onChange={(event) => update('name', event.target.value)} required /></label><label className="form-field"><span>Email address</span><input type="email" value={settings.email} onChange={(event) => update('email', event.target.value)} required /></label></div><div className="settings-security-note"><LockKeyhole size={16} /><span>Authentication is in demo mode. Password management will be available when backend services are connected.</span></div></section>

          <section className="panel settings-section"><div className="settings-section-heading"><div className="settings-section-icon"><Bell size={18} /></div><div><h2>Notification Settings</h2><p>Choose which updates you want to receive.</p></div></div><div className="toggle-list"><label className="toggle-row"><span><strong>Student record updates</strong><small>Receive alerts when student details are added or changed.</small></span><input type="checkbox" checked={settings.emailUpdates} onChange={() => toggle('emailUpdates')} /><span className="toggle-ui" /></label><label className="toggle-row"><span><strong>Weekly summary</strong><small>A short digest of enrollment and academic activity.</small></span><input type="checkbox" checked={settings.weeklyDigest} onChange={() => toggle('weeklyDigest')} /><span className="toggle-ui" /></label><label className="toggle-row"><span><strong>Security notifications</strong><small>Alerts for sign-in and account activity.</small></span><input type="checkbox" checked={settings.loginAlerts} onChange={() => toggle('loginAlerts')} /><span className="toggle-ui" /></label></div></section>

          <section className="panel settings-section"><div className="settings-section-heading"><div className="settings-section-icon"><SlidersHorizontal size={18} /></div><div><h2>Application Preferences</h2><p>Set your preferred regional and display options.</p></div></div><div className="settings-fields settings-preferences"><label className="form-field"><span><Languages size={14} /> Language</span><select value={settings.language} onChange={(event) => update('language', event.target.value)}><option>English</option><option>Hindi</option></select></label><label className="form-field"><span><Globe2 size={14} /> Date format</span><select value={settings.dateFormat} onChange={(event) => update('dateFormat', event.target.value)}><option>DD MMM YYYY</option><option>MM/DD/YYYY</option><option>YYYY-MM-DD</option></select></label><label className="form-field"><span><Globe2 size={14} /> Time zone</span><select value={settings.timezone} onChange={(event) => update('timezone', event.target.value)}><option value="Asia/Kolkata">India Standard Time (UTC+5:30)</option><option value="UTC">Coordinated Universal Time (UTC)</option></select></label></div></section>
        </div>
        <aside className="settings-aside"><section className="panel settings-summary"><span className="eyebrow">ACCOUNT</span><Avatar name={settings.name} size="profile" /><h2>{settings.name}</h2><p>{settings.email}</p><span className="status-tag status-active">Administrator</span><div className="settings-summary-divider" /><div><span>Academic year</span><strong>2025 – 2026</strong></div><div><span>Institution</span><strong>StudentHub College</strong></div></section><button type="submit" className="button button-primary settings-save"><Save size={16} /> Save Settings</button></aside>
      </form>
    </div>
  )
}