import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { AppProvider, useApp } from './context/AppContext.jsx'
import AppShell from './components/AppShell.jsx'
import Login from './pages/Login.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Students from './pages/Students.jsx'
import StudentFormPage from './pages/StudentFormPage.jsx'
import StudentDetails from './pages/StudentDetails.jsx'
import Analytics from './pages/Analytics.jsx'
import Reports from './pages/Reports.jsx'
import Settings from './pages/Settings.jsx'

function ProtectedLayout() {
  const { authenticated } = useApp()
  if (!authenticated) return <Navigate to="/login" replace />
  return <AppShell />
}

function AppRoutes() {
  const { authenticated } = useApp()

  return (
    <Routes>
      <Route path="/login" element={authenticated ? <Navigate to="/dashboard" replace /> : <Login />} />
      <Route element={<ProtectedLayout />}>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/students" element={<Students />} />
        <Route path="/students/add" element={<StudentFormPage mode="add" />} />
        <Route path="/students/:studentId/edit" element={<StudentFormPage mode="edit" />} />
        <Route path="/students/:studentId" element={<StudentDetails />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/settings" element={<Settings />} />
      </Route>
      <Route path="*" element={<Navigate to={authenticated ? '/dashboard' : '/login'} replace />} />
    </Routes>
  )
}

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AppProvider>
  )
}
