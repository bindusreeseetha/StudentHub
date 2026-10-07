import { createContext, useContext, useMemo, useState } from 'react'
import { mockStudents } from '../data/mockStudents.js'

const AppContext = createContext(null)
const STUDENTS_KEY = 'studenthub.students'
const AUTH_KEY = 'studenthub.authenticated'

function readStudents() {
  try {
    const stored = localStorage.getItem(STUDENTS_KEY)
    return stored ? JSON.parse(stored) : mockStudents
  } catch {
    return mockStudents
  }
}

export function AppProvider({ children }) {
  const [students, setStudents] = useState(readStudents)
  const [authenticated, setAuthenticated] = useState(() => localStorage.getItem(AUTH_KEY) === 'true')
  const [toast, setToast] = useState('')

  const persistStudents = (nextStudents) => {
    setStudents(nextStudents)
    localStorage.setItem(STUDENTS_KEY, JSON.stringify(nextStudents))
  }

  const addStudent = (student) => persistStudents([student, ...students])
  const updateStudent = (studentId, updates) =>
    persistStudents(students.map((student) => student.id === studentId ? { ...student, ...updates } : student))
  const deleteStudent = (studentId) => persistStudents(students.filter((student) => student.id !== studentId))
  const login = () => {
    localStorage.setItem(AUTH_KEY, 'true')
    setAuthenticated(true)
  }
  const logout = () => {
    localStorage.removeItem(AUTH_KEY)
    setAuthenticated(false)
  }
  const notify = (message) => {
    setToast(message)
    window.setTimeout(() => setToast(''), 3200)
  }

  const value = useMemo(() => ({
    students, addStudent, updateStudent, deleteStudent,
    authenticated, login, logout, toast, notify,
  }), [students, authenticated, toast])

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useApp() {
  const context = useContext(AppContext)
  if (!context) throw new Error('useApp must be used inside AppProvider')
  return context
}