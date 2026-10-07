import { useEffect, useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { Download, Eye, Pencil, Plus, Search, Trash2, Users, BookOpen, Star, CheckCircle2, ChevronLeft, ChevronRight, X } from 'lucide-react'
import Avatar from '../components/Avatar.jsx'
import StatCard from '../components/StatCard.jsx'
import { useApp } from '../context/AppContext.jsx'
import { academicYears, departments } from '../data/mockStudents.js'
import { exportCsv } from '../utils/exportCsv.js'

const pageSize = 8

function matchesCgpa(value, range) {
  if (range === '9.0+') return value >= 9
  if (range === '8.0–8.9') return value >= 8 && value < 9
  if (range === '7.0–7.9') return value >= 7 && value < 8
  if (range === 'Below 7.0') return value < 7
  return true
}

export default function Students() {
  const { students, deleteStudent, notify } = useApp()
  const [searchParams, setSearchParams] = useSearchParams()
  const [search, setSearch] = useState(searchParams.get('search') || '')
  const [department, setDepartment] = useState('')
  const [year, setYear] = useState('')
  const [cgpa, setCgpa] = useState('')
  const [page, setPage] = useState(1)

  useEffect(() => setSearch(searchParams.get('search') || ''), [searchParams])

  const filteredStudents = useMemo(() => students.filter((student) => {
    const term = search.trim().toLowerCase()
    return (!term || [student.name, student.id, student.email].some((value) => value.toLowerCase().includes(term)))
      && (!department || student.department === department)
      && (!year || student.year === year)
      && matchesCgpa(student.cgpa, cgpa)
  }), [students, search, department, year, cgpa])
  const pageCount = Math.max(1, Math.ceil(filteredStudents.length / pageSize))
  const visibleStudents = filteredStudents.slice((page - 1) * pageSize, page * pageSize)

  useEffect(() => setPage(1), [search, department, year, cgpa])

  const updateSearch = (value) => {
    setSearch(value)
    if (!value) searchParams.delete('search')
    else searchParams.set('search', value)
    setSearchParams(searchParams, { replace: true })
  }

  const clearFilters = () => {
    setDepartment('')
    setYear('')
    setCgpa('')
    updateSearch('')
  }

  const removeStudent = (student) => {
    if (!window.confirm(`Delete ${student.name}'s student record? This action cannot be undone.`)) return
    deleteStudent(student.id)
    notify(`${student.name}'s record was deleted`)
  }

  const downloadStudents = () => {
    exportCsv('studenthub-student-records.csv', filteredStudents.map(({ id, name, email, phone, department: course, year: academicYear, cgpa: score, active }) => ({
      'Student ID': id, 'Full Name': name, Email: email, Phone: phone, Department: course, 'Academic Year': academicYear, CGPA: score, Status: active ? 'Active' : 'Inactive',
    })))
    if (filteredStudents.length) notify('Student records exported')
    else notify('No student records to export')
  }

  return (
    <div className="page-stack">
      <div className="page-heading page-heading-students">
        <div><span className="eyebrow">ACADEMIC DIRECTORY</span><h1>Student Records</h1><p>Manage, search, and organize student information efficiently.</p></div>
        <Link className="button button-primary" to="/students/add"><Plus size={17} /> Add Student</Link>
      </div>

      <section className="stat-grid stat-grid-four" aria-label="Student statistics">
        <StatCard label="Total Students" value="1,250" icon={Users} tone="blue" />
        <StatCard label="Active Students" value="1,180" icon={CheckCircle2} tone="green" />
        <StatCard label="Departments" value="8" icon={BookOpen} tone="violet" />
        <StatCard label="Average CGPA" value="8.5" icon={Star} tone="cyan" />
      </section>

      <section className="filter-panel panel" aria-label="Student search and filters">
        <div className="filter-controls">
          <label className="filter-field search-filter"><span>Search students</span><div className="input-with-icon"><Search size={16} /><input value={search} onChange={(event) => updateSearch(event.target.value)} placeholder="Name, student ID or email" /></div></label>
          <label className="filter-field"><span>Department</span><select value={department} onChange={(event) => setDepartment(event.target.value)}><option value="">All Departments</option>{departments.map((item) => <option key={item}>{item}</option>)}</select></label>
          <label className="filter-field"><span>Academic Year</span><select value={year} onChange={(event) => setYear(event.target.value)}><option value="">All Years</option>{academicYears.map((item) => <option key={item}>{item}</option>)}</select></label>
          <label className="filter-field"><span>CGPA</span><select value={cgpa} onChange={(event) => setCgpa(event.target.value)}><option value="">All CGPA</option><option>9.0+</option><option>8.0–8.9</option><option>7.0–7.9</option><option>Below 7.0</option></select></label>
          <button className="button button-quiet clear-button" onClick={clearFilters}><X size={15} /> Clear</button>
          <button className="button button-secondary export-button" onClick={downloadStudents}><Download size={15} /> Export</button>
        </div>
      </section>

      <section className="panel table-panel">
        <div className="table-heading"><div><h2>All Students</h2><p>{filteredStudents.length} records in this view</p></div><span className="table-count"><Users size={15} /> {filteredStudents.length} shown</span></div>
        <div className="table-scroll">
          <table className="student-table">
            <thead><tr><th>Student ID</th><th>Profile</th><th>Name</th><th>Email</th><th>Phone</th><th>Department</th><th>Year</th><th>CGPA</th><th>Actions</th></tr></thead>
            <tbody>
              {visibleStudents.map((student) => (
                <tr key={student.id}>
                  <td className="student-id">{student.id}</td><td><Avatar name={student.name} photo={student.photo} size="table" /></td>
                  <td><Link className="student-name-link" to={`/students/${student.id}`}>{student.name}</Link><span className={`status-tag ${student.active ? 'status-active' : 'status-inactive'}`}>{student.active ? 'Active' : 'Inactive'}</span></td>
                  <td className="muted-cell">{student.email}</td><td className="nowrap-cell">{student.phone}</td><td>{student.department}</td><td>{student.year}</td><td><span className="cgpa-value">{Number(student.cgpa).toFixed(1)}</span></td>
                  <td><div className="row-actions"><Link className="icon-action" to={`/students/${student.id}`} title="View student" aria-label={`View ${student.name}`}><Eye size={16} /></Link><Link className="icon-action action-edit" to={`/students/${student.id}/edit`} title="Edit student" aria-label={`Edit ${student.name}`}><Pencil size={15} /></Link><button className="icon-action action-delete" onClick={() => removeStudent(student)} title="Delete student" aria-label={`Delete ${student.name}`}><Trash2 size={15} /></button></div></td>
                </tr>
              ))}
              {!visibleStudents.length && <tr><td colSpan="9"><div className="table-empty"><Search size={22} /><strong>No students found</strong><span>Try changing your search or filters.</span><button className="text-button" onClick={clearFilters}>Clear all filters</button></div></td></tr>}
            </tbody>
          </table>
        </div>
        <div className="table-footer"><span>Showing {filteredStudents.length ? (page - 1) * pageSize + 1 : 0}–{Math.min(page * pageSize, filteredStudents.length)} of {filteredStudents.length} students</span><div className="pagination"><button className="pagination-button" onClick={() => setPage(Math.max(1, page - 1))} disabled={page === 1} aria-label="Previous page"><ChevronLeft size={16} /> Previous</button><span className="page-number">{page} <span>of {pageCount}</span></span><button className="pagination-button" onClick={() => setPage(Math.min(pageCount, page + 1))} disabled={page === pageCount} aria-label="Next page">Next <ChevronRight size={16} /></button></div></div>
      </section>
    </div>
  )
}