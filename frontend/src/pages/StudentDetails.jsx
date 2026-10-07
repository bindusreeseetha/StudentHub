import { Link, useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, Mail, Pencil, Phone, GraduationCap, BookOpen, CalendarDays, Star } from 'lucide-react'
import Avatar from '../components/Avatar.jsx'
import { useApp } from '../context/AppContext.jsx'

export default function StudentDetails() {
  const { studentId } = useParams()
  const { students } = useApp()
  const navigate = useNavigate()
  const student = students.find((record) => record.id === studentId)

  if (!student) return <section className="panel not-found"><GraduationCap size={27} /><h1>Student not found</h1><p>This record may have been removed.</p><button className="button button-primary" onClick={() => navigate('/students')}>Back to Students</button></section>

  return (
    <div className="page-stack">
      <div className="page-heading detail-page-heading"><div><Link className="back-link" to="/students"><ArrowLeft size={15} /> Back to Students</Link><span className="eyebrow">STUDENT PROFILE</span><h1>Student Details</h1><p>Academic and contact information for this student.</p></div><Link className="button button-primary" to={`/students/${student.id}/edit`}><Pencil size={16} /> Edit Student</Link></div>
      <section className="detail-hero panel"><Avatar name={student.name} photo={student.photo} size="profile" /><div className="detail-identity"><span className="eyebrow">{student.id}</span><h2>{student.name}</h2><p>{student.department} <span>·</span> {student.year}</p></div><span className={`status-tag detail-status ${student.active ? 'status-active' : 'status-inactive'}`}>{student.active ? 'Active student' : 'Inactive student'}</span></section>
      <section className="detail-grid">
        <article className="panel detail-info-panel"><div className="panel-heading"><div><h2>Personal Information</h2><p>Student contact details</p></div></div><dl className="detail-list"><div><dt><Mail size={16} />Email Address</dt><dd>{student.email}</dd></div><div><dt><Phone size={16} />Phone Number</dt><dd>{student.phone}</dd></div></dl></article>
        <article className="panel detail-info-panel"><div className="panel-heading"><div><h2>Academic Information</h2><p>Current academic standing</p></div></div><dl className="detail-list"><div><dt><BookOpen size={16} />Department</dt><dd>{student.department}</dd></div><div><dt><CalendarDays size={16} />Academic Year</dt><dd>{student.year}</dd></div><div><dt><Star size={16} />CGPA</dt><dd><strong className="detail-cgpa">{Number(student.cgpa).toFixed(1)} <span>/ 10.0</span></strong></dd></div></dl></article>
      </section>
    </div>
  )
}