import { useMemo, useState } from 'react'
import { Building2, BriefcaseBusiness, Download, GraduationCap, Star, Users, Check, Sparkles } from 'lucide-react'
import { Bar, BarChart, CartesianGrid, Cell, Line, LineChart, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import ChartCard from '../components/ChartCard.jsx'
import StatCard from '../components/StatCard.jsx'
import { useApp } from '../context/AppContext.jsx'
import { academicYears, departments } from '../data/mockStudents.js'
import { exportCsv } from '../utils/exportCsv.js'

const semesters = ['All Semesters', 'Semester 1', 'Semester 2', 'Semester 3', 'Semester 4', 'Semester 5', 'Semester 6']
const terms = [
  { semester: 'Semester 1', score: 8.1 }, { semester: 'Semester 2', score: 8.2 },
  { semester: 'Semester 3', score: 8.3 }, { semester: 'Semester 4', score: 8.4 },
  { semester: 'Semester 5', score: 8.5 }, { semester: 'Semester 6', score: 8.6 },
]

export default function Analytics() {
  const { students, notify } = useApp()
  const [department, setDepartment] = useState('')
  const [year, setYear] = useState('')
  const [semester, setSemester] = useState('All Semesters')
  const [dateRange, setDateRange] = useState('This Academic Year')
  const filtered = useMemo(() => students.filter((student) => (!department || student.department === department) && (!year || student.year === year)), [students, department, year])
  const departmentData = departments.map((name) => ({ name, count: filtered.filter((student) => student.department === name).length })).filter((item) => item.count)
  const cgpaData = [
    { band: 'Below 6.0', count: filtered.filter((student) => student.cgpa < 6).length },
    { band: '6.0–6.9', count: filtered.filter((student) => student.cgpa >= 6 && student.cgpa < 7).length },
    { band: '7.0–7.9', count: filtered.filter((student) => student.cgpa >= 7 && student.cgpa < 8).length },
    { band: '8.0–8.9', count: filtered.filter((student) => student.cgpa >= 8 && student.cgpa < 9).length },
    { band: '9.0+', count: filtered.filter((student) => student.cgpa >= 9).length },
  ]
  const trendData = semester === 'All Semesters' ? terms : terms.filter((term) => term.semester === semester)
  const colors = ['#536bd4', '#54a6c4', '#4aab91', '#9080d8', '#d8a857', '#d3766a', '#637caa', '#8994a5']

  const exportReport = () => {
    exportCsv('studenthub-analytics-report.csv', filtered.map(({ id, name, department: course, year: academicYear, cgpa }) => ({ 'Student ID': id, Name: name, Department: course, 'Academic Year': academicYear, CGPA: cgpa })))
    if (filtered.length) notify('Analytics report exported')
    else notify('No student data to export for these filters')
  }

  return (
    <div className="page-stack">
      <div className="page-heading analytics-heading"><div><span className="eyebrow">INSIGHTS & PERFORMANCE</span><h1>Analytics Overview</h1><p>Understand student performance and enrollment trends at a glance.</p></div><button className="button button-primary" onClick={exportReport}><Download size={16} /> Export Report</button></div>
      <div className="analytics-filters panel">
        <label className="filter-field"><span>Department</span><select value={department} onChange={(event) => setDepartment(event.target.value)}><option value="">All Departments</option>{departments.map((item) => <option key={item}>{item}</option>)}</select></label>
        <label className="filter-field"><span>Academic Year</span><select value={year} onChange={(event) => setYear(event.target.value)}><option value="">All Years</option>{academicYears.map((item) => <option key={item}>{item}</option>)}</select></label>
        <label className="filter-field"><span>Semester</span><select value={semester} onChange={(event) => setSemester(event.target.value)}>{semesters.map((item) => <option key={item}>{item}</option>)}</select></label>
        <label className="filter-field"><span>Date Range</span><select value={dateRange} onChange={(event) => setDateRange(event.target.value)}><option>This Academic Year</option><option>Last 30 Days</option><option>Last 90 Days</option><option>Previous Academic Year</option></select></label>
      </div>

      <section className="stat-grid stat-grid-four" aria-label="Analytics key performance indicators">
        <StatCard label="Total Students" value="1,250" icon={Users} tone="blue" change="+8.4%" />
        <StatCard label="Average CGPA" value="8.5" icon={Star} tone="violet" change="+0.3" />
        <StatCard label="Departments" value="8" icon={Building2} tone="cyan" change="+1" />
        <StatCard label="Placement Rate" value="82%" icon={BriefcaseBusiness} tone="green" change="+6.5%" />
      </section>

      <section className="chart-grid analytics-chart-grid">
        <ChartCard title="Students by Department" description={`Enrollment distribution · ${filtered.length} local records`}>
          {departmentData.length ? <ResponsiveContainer width="100%" height="100%"><BarChart data={departmentData} layout="vertical" margin={{ top: 4, right: 12, left: 5, bottom: 2 }}><CartesianGrid stroke="#edf0f5" horizontal={false} /><XAxis type="number" axisLine={false} tickLine={false} tick={{ fill: '#8490a3', fontSize: 10 }} /><YAxis type="category" dataKey="name" width={80} axisLine={false} tickLine={false} tick={{ fill: '#657186', fontSize: 10 }} /><Tooltip /><Bar dataKey="count" name="Students" radius={[0, 5, 5, 0]}>{departmentData.map((entry, index) => <Cell key={entry.name} fill={colors[index % colors.length]} />)}</Bar></BarChart></ResponsiveContainer> : <div className="chart-empty">No matching student records</div>}
        </ChartCard>
        <ChartCard title="CGPA Distribution" description="Student performance by grade band">
          <ResponsiveContainer width="100%" height="100%"><BarChart data={cgpaData} margin={{ top: 12, right: 4, left: -22, bottom: 0 }}><CartesianGrid stroke="#edf0f5" vertical={false} /><XAxis dataKey="band" axisLine={false} tickLine={false} tick={{ fill: '#8490a3', fontSize: 9 }} /><YAxis axisLine={false} tickLine={false} tick={{ fill: '#8490a3', fontSize: 10 }} /><Tooltip /><Bar dataKey="count" name="Students" radius={[5, 5, 0, 0]} fill="#586edb" /></BarChart></ResponsiveContainer>
        </ChartCard>
        <ChartCard title="Placement Overview" description="Current graduating cohort">
          <div className="placement-overview"><div className="placement-chart"><ResponsiveContainer width="100%" height="100%"><PieChart><Pie data={[{ name: 'Placed', value: 82 }, { name: 'Seeking', value: 18 }]} dataKey="value" innerRadius={54} outerRadius={70} startAngle={90} endAngle={-270} stroke="none"><Cell fill="#5b70d6" /><Cell fill="#e9edf5" /></Pie><Tooltip /></PieChart></ResponsiveContainer><div className="placement-center"><strong>82%</strong><span>Placed</span></div></div><div className="placement-stats"><div><span>Eligible students</span><strong>860</strong></div><div><span>Placed</span><strong className="positive-text">705</strong></div><div><span>In process</span><strong>95</strong></div><div><span>Not placed</span><strong className="negative-text">60</strong></div></div></div>
        </ChartCard>
      </section>

      <section className="analytics-bottom-grid">
        <ChartCard title="Academic Performance Trends" description={`${dateRange} · semester average CGPA`}>
          <ResponsiveContainer width="100%" height="100%"><LineChart data={trendData} margin={{ top: 12, right: 12, left: -15, bottom: 0 }}><CartesianGrid stroke="#edf0f5" vertical={false} /><XAxis dataKey="semester" axisLine={false} tickLine={false} tick={{ fill: '#8490a3', fontSize: 10 }} /><YAxis domain={[7.8, 8.8]} axisLine={false} tickLine={false} tick={{ fill: '#8490a3', fontSize: 10 }} /><Tooltip /><Line type="monotone" dataKey="score" name="Average CGPA" stroke="#586edb" strokeWidth={2.5} dot={{ r: 4, fill: '#586edb', stroke: '#fff', strokeWidth: 2 }} /></LineChart></ResponsiveContainer>
        </ChartCard>
        <section className="panel insights-panel"><div className="panel-heading"><div><h2><Sparkles size={17} /> Key Insights</h2><p>Highlights from this academic year</p></div></div><ul className="insight-list"><li><Check size={16} />CSE has the highest student enrollment.</li><li><Check size={16} />66% of students have a CGPA above 8.0.</li><li><Check size={16} />Placement rate improved this year.</li><li><Check size={16} />Average CGPA increased compared with the previous semester.</li></ul><div className="insight-foot"><GraduationCap size={15} />Based on {filtered.length} local student records</div></section>
      </section>
    </div>
  )
}