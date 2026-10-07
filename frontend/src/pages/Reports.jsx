import { useState } from 'react'
import { ArrowDownToLine, ArrowUpRight, BookOpen, BriefcaseBusiness, Building2, FileText, GraduationCap, Users, X } from 'lucide-react'
import { useApp } from '../context/AppContext.jsx'
import { exportCsv } from '../utils/exportCsv.js'

const reports = [
  { id: 'summary', title: 'Student Summary Report', description: 'A complete overview of student enrollment, status, and academic records.', icon: Users, color: 'blue', cadence: 'Updated today' },
  { id: 'department', title: 'Department Report', description: 'Enrollment and academic distribution across all departments.', icon: Building2, color: 'green', cadence: 'Updated today' },
  { id: 'performance', title: 'Academic Performance Report', description: 'CGPA ranges, semester trends, and academic standing.', icon: BookOpen, color: 'violet', cadence: 'Updated yesterday' },
  { id: 'placement', title: 'Placement Report', description: 'Placement eligibility, outcomes, and hiring progress.', icon: BriefcaseBusiness, color: 'amber', cadence: 'Updated this week' },
]

function rowsForReport(reportId, students) {
  if (reportId === 'department') return [...new Set(students.map((student) => student.department))].map((department) => ({ Department: department, 'Student Count': students.filter((student) => student.department === department).length, 'Average CGPA': (students.filter((student) => student.department === department).reduce((total, student) => total + Number(student.cgpa), 0) / students.filter((student) => student.department === department).length).toFixed(2) }))
  if (reportId === 'performance') return students.map(({ id, name, department, year, cgpa }) => ({ 'Student ID': id, Name: name, Department: department, Year: year, CGPA: cgpa, Standing: cgpa >= 8 ? 'Good standing' : 'Review' }))
  if (reportId === 'placement') return [{ Metric: 'Placement rate', Value: '82%' }, { Metric: 'Eligible students', Value: '860' }, { Metric: 'Placed', Value: '705' }, { Metric: 'In process', Value: '95' }, { Metric: 'Not placed', Value: '60' }]
  return students.map(({ id, name, email, phone, department, year, cgpa, active }) => ({ 'Student ID': id, Name: name, Email: email, Phone: phone, Department: department, 'Academic Year': year, CGPA: cgpa, Status: active ? 'Active' : 'Inactive' }))
}

export default function Reports() {
  const { students, notify } = useApp()
  const [preview, setPreview] = useState(null)

  const downloadReport = (report) => {
    exportCsv(`studenthub-${report.id}-report.csv`, rowsForReport(report.id, students))
    notify(`${report.title} exported`)
  }

  return (
    <div className="page-stack">
      <div className="page-heading"><div><span className="eyebrow">REPORTING CENTER</span><h1>Reports</h1><p>Review and export clear, up-to-date academic reports.</p></div><div className="report-period"><span className="report-period-dot" />Academic year 2025 – 2026</div></div>
      <section className="report-overview panel"><div className="report-overview-mark"><FileText size={23} /></div><div><span className="eyebrow">REPORT LIBRARY</span><h2>Your campus, at a glance.</h2><p>Four curated reports, ready to review or download.</p></div><div className="report-overview-count"><strong>04</strong><span>Available reports</span></div></section>
      <section className="report-grid" aria-label="Available reports">
        {reports.map((report) => {
          const Icon = report.icon
          return <article className="panel report-card" key={report.id}><div className={`report-icon report-${report.color}`}><Icon size={20} /></div><span className="report-updated">{report.cadence}</span><h2>{report.title}</h2><p>{report.description}</p><div className="report-card-footer"><button className="button button-secondary button-small" onClick={() => setPreview(report)}><ArrowUpRight size={15} /> View Report</button><button className="button button-quiet button-small" onClick={() => downloadReport(report)}><ArrowDownToLine size={15} /> Export</button></div></article>
        })}
      </section>
      {preview && <div className="modal-scrim" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setPreview(null) }}><section className="report-modal panel" role="dialog" aria-modal="true" aria-labelledby="report-modal-title"><div className="modal-heading"><div><span className="eyebrow">REPORT PREVIEW</span><h2 id="report-modal-title">{preview.title}</h2></div><button className="icon-button" aria-label="Close report preview" onClick={() => setPreview(null)}><X size={19} /></button></div><div className="modal-report-body"><div className="modal-report-stat"><GraduationCap size={18} /><span>Reporting period</span><strong>Academic year 2025 – 2026</strong></div><div className="modal-report-stat"><Users size={18} /><span>Student records</span><strong>{students.length} local records</strong></div><div className="modal-report-stat"><FileText size={18} /><span>Includes</span><strong>{preview.description}</strong></div></div><div className="modal-actions"><button className="button button-secondary" onClick={() => setPreview(null)}>Close</button><button className="button button-primary" onClick={() => { downloadReport(preview); setPreview(null) }}><ArrowDownToLine size={15} /> Export Report</button></div></section></div>}
    </div>
  )
}