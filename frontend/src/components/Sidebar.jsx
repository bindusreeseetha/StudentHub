import { NavLink, useNavigate } from 'react-router-dom'
import { Activity, BarChart3, BookOpenCheck, GraduationCap, LayoutDashboard, LogOut, Plus, Settings, Users, X } from 'lucide-react'
import { useApp } from '../context/AppContext.jsx'

const links = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/students', label: 'Students', icon: Users },
  { to: '/students/add', label: 'Add Student', icon: Plus },
  { to: '/analytics', label: 'Analytics', icon: BarChart3 },
  { to: '/reports', label: 'Reports', icon: Activity },
  { to: '/settings', label: 'Settings', icon: Settings },
]

export default function Sidebar({ open, onClose }) {
  const { logout } = useApp()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    onClose()
    navigate('/login')
  }

  return (
    <>
      {open && <button className="sidebar-scrim" aria-label="Close navigation" onClick={onClose} />}
      <aside className={`sidebar ${open ? 'sidebar-open' : ''}`}>
        <div className="brand-lockup">
          <div className="brand-mark"><GraduationCap size={23} strokeWidth={2.3} /></div>
          <div className="brand-words"><strong>Student<span>Hub</span></strong><small>College Management</small></div>
          <button className="icon-button sidebar-close" aria-label="Close navigation" onClick={onClose}><X size={19} /></button>
        </div>
        <div className="nav-section-label">WORKSPACE</div>
        <nav className="side-nav" aria-label="Main navigation">
          {links.map(({ to, label, icon: Icon }) => (
            <NavLink key={to} to={to} end={to === '/dashboard'} onClick={onClose} className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              <Icon size={18} strokeWidth={1.9} /><span>{label}</span>
            </NavLink>
          ))}
        </nav>
        <div className="sidebar-bottom">
          <div className="sidebar-note"><BookOpenCheck size={17} /><span>Academic year<br /><strong>2025 – 2026</strong></span></div>
          <button className="nav-link logout-link" onClick={handleLogout}><LogOut size={18} /><span>Logout</span></button>
        </div>
      </aside>
    </>
  )
}