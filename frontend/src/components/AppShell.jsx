import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar.jsx'
import Header from './Header.jsx'
import Toast from './Toast.jsx'
import { useApp } from '../context/AppContext.jsx'

export default function AppShell() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { toast, notify } = useApp()

  return (
    <div className="app-frame">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="app-main">
        <Header onMenuClick={() => setSidebarOpen(true)} />
        <main className="page-content"><Outlet /></main>
      </div>
      <Toast message={toast} onClose={() => notify('')} />
    </div>
  )
}