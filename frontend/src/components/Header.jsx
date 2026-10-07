import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Bell, ChevronDown, Menu, Search } from 'lucide-react'
import Avatar from './Avatar.jsx'
import { useApp } from '../context/AppContext.jsx'

export default function Header({ onMenuClick }) {
  const [search, setSearch] = useState('')
  const [profileOpen, setProfileOpen] = useState(false)
  const [notificationsOpen, setNotificationsOpen] = useState(false)
  const { logout, notify } = useApp()
  const navigate = useNavigate()
  const location = useLocation()

  const submitSearch = (event) => {
    event.preventDefault()
    navigate(`/students?search=${encodeURIComponent(search.trim())}`)
    setSearch('')
  }

  const signOut = () => {
    logout()
    navigate('/login')
  }

  return (
    <header className="topbar">
      <button className="icon-button menu-toggle" aria-label="Open navigation" onClick={onMenuClick}><Menu size={21} /></button>
      <form className="global-search" role="search" onSubmit={submitSearch}>
        <Search size={17} />
        <input aria-label="Search students" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search students by name, ID or email..." />
        <kbd>↵</kbd>
      </form>
      <div className="topbar-actions">
        <div className="popover-anchor">
          <button className={`icon-button notification-button ${notificationsOpen ? 'selected' : ''}`} aria-label="Notifications" onClick={() => { setNotificationsOpen(!notificationsOpen); setProfileOpen(false) }}>
            <Bell size={19} /><span className="notification-dot" />
          </button>
          {notificationsOpen && <div className="popover notification-popover"><strong>Notifications</strong><p><span className="notice-dot" />New student record was added this week.</p><p><span className="notice-dot notice-muted" />Semester 2 reports are ready to review.</p><button className="text-button" onClick={() => { setNotificationsOpen(false); notify('You are all caught up') }}>Mark all as read</button></div>}
        </div>
        <div className="popover-anchor">
          <button className={`profile-trigger ${profileOpen ? 'selected' : ''}`} onClick={() => { setProfileOpen(!profileOpen); setNotificationsOpen(false) }} aria-expanded={profileOpen}>
            <Avatar name="Admin" size="small" /><span className="profile-name">Admin</span><ChevronDown size={15} />
          </button>
          {profileOpen && <div className="popover profile-popover"><div className="profile-popover-title"><Avatar name="Admin" /><div><strong>Admin</strong><span>Administrator</span></div></div><button className="profile-menu-item" onClick={() => { setProfileOpen(false); navigate('/settings') }}>Account settings</button><button className="profile-menu-item" onClick={signOut}>Sign out</button></div>}
        </div>
      </div>
      <span className="sr-only">Current page: {location.pathname}</span>
    </header>
  )
}