import { Link, useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, GraduationCap } from 'lucide-react'
import StudentForm from '../components/StudentForm.jsx'
import { useApp } from '../context/AppContext.jsx'

export default function StudentFormPage({ mode }) {
  const { studentId } = useParams()
  const { students } = useApp()
  const navigate = useNavigate()
  const student = mode === 'edit' ? students.find((record) => record.id === studentId) : null

  if (mode === 'edit' && !student) {
    return <section className="panel not-found"><GraduationCap size={27} /><h1>Student not found</h1><p>This record may have been removed.</p><button className="button button-primary" onClick={() => navigate('/students')}>Back to Students</button></section>
  }

  const title = mode === 'edit' ? 'Edit Student' : 'Add New Student'
  const subtitle = mode === 'edit' ? 'Update this student record and keep academic details current.' : 'Create a new student record and add it to the database.'

  return (
    <div className="page-stack">
      <div className="page-heading form-page-heading"><div><Link className="back-link" to="/students"><ArrowLeft size={15} /> Students</Link><span className="eyebrow">STUDENT DIRECTORY</span><h1>{title}</h1><p>{subtitle}</p></div></div>
      <StudentForm key={student?.id || 'new-student'} student={student} mode={mode} />
    </div>
  )
}