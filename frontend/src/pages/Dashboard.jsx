import { Activity, ArrowUpRight, BookOpen, CheckCircle2, GraduationCap, Star, Users } from 'lucide-react'
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import Avatar from '../components/Avatar.jsx'
import ChartCard from '../components/ChartCard.jsx'
import StatCard from '../components/StatCard.jsx'
import { useApp } from '../context/AppContext.jsx'

const enrollment = [
  { month: 'Jan', students: 420, active: 380 }, { month: 'Feb', students: 510, active: 450 },
  { month: 'Mar', students: 475, active: 460 }, { month: 'Apr', students: 650, active: 530 },
  { month: 'May', students: 570, active: 550 }, { month: 'Jun', students: 780, active: 575 },
  { month: 'Jul', students: 680, active: 580 }, { month: 'Aug', students: 890, active: 610 },
]
const departments = [
  { name: 'CSE', value: 320 }, { name: 'ECE', value: 210 }, { name: 'IT', value: 185 },
  { name: 'AI & DS', value: 160 }, { name: 'EEE', value: 145 }, { name: 'Mechanical', value: 110 },
]
const departmentColors = ['#5569d8', '#55a2d0', '#4eaf9d', '#8b79d8', '#e2b35c', '#de7b70']
const cgpa = [
  { range: '< 6.0', count: 42 }, { range: '6.0–6.9', count: 110 }, { range: '7.0–7.9', count: 275 },
  { range: '8.0–8.9', count: 510 }, { range: '9.0+', count: 320 },
]
const activities = [
  { type: 'added', name: 'Saanvi Kapoor', detail: 'New student record', time: '12 min ago', id: 'STU025' },
  { type: 'updated', name: 'Ananya Singh', detail: 'Academic details updated', time: '1 hour ago', id: 'STU003' },
  { type: 'updated', name: 'Arjun Reddy', detail: 'Contact information changed', time: 'Yesterday', id: 'STU009' },
]

export default function Dashboard() {
  const { students } = useApp()
  const recentlyAdded = students.slice(0, 3)

  return (
    <div className="page-stack">
      <div className="welcome-heading">
        <div><span className="eyebrow">TUESDAY, OCTOBER 6, 2026</span><p className="greeting">Good Morning, Admin</p><h1>Manage your students efficiently</h1></div>
        <div className="welcome-meta"><span className="live-indicator" /> Academic year 2025 – 2026</div>
      </div>

      <section className="stat-grid stat-grid-four" aria-label="Student overview">
        <StatCard label="Total Students" value="1,250" icon={Users} tone="blue" change="+8.4%" />
        <StatCard label="Departments" value="8" icon={BookOpen} tone="violet" change="+1" />
        <StatCard label="Average CGPA" value="8.5" icon={Star} tone="cyan" change="+0.3" />
        <StatCard label="Active Students" value="1,180" icon={CheckCircle2} tone="green" change="94.4%" />
      </section>

      <section className="chart-grid dashboard-charts" aria-label="Student analytics">
        <ChartCard title="Student Enrollment" description="Enrollment and active student growth">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={enrollment} margin={{ top: 8, right: 8, left: -18, bottom: 0 }}>
              <defs><linearGradient id="enrollFill" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#586edb" stopOpacity={0.2} /><stop offset="100%" stopColor="#586edb" stopOpacity={0} /></linearGradient></defs>
              <CartesianGrid stroke="#edf0f5" vertical={false} /><XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#8490a3', fontSize: 11 }} /><YAxis axisLine={false} tickLine={false} tick={{ fill: '#8490a3', fontSize: 11 }} />
              <Tooltip /><Legend iconType="circle" wrapperStyle={{ fontSize: 11, paddingTop: 8 }} />
              <Area type="monotone" dataKey="students" name="Enrollment" stroke="#566bd4" strokeWidth={2.5} fill="url(#enrollFill)" />
              <Area type="monotone" dataKey="active" name="Active" stroke="#4fae9c" strokeWidth={2} fill="transparent" />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>
        <ChartCard title="Department Distribution" description="Students across departments">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart><Pie data={departments} dataKey="value" nameKey="name" innerRadius={54} outerRadius={88} paddingAngle={2} stroke="none">{departments.map((entry, index) => <Cell key={entry.name} fill={departmentColors[index % departmentColors.length]} />)}</Pie><Tooltip /><Legend layout="vertical" verticalAlign="middle" align="right" iconType="circle" wrapperStyle={{ fontSize: 11, lineHeight: '24px' }} /></PieChart>
          </ResponsiveContainer>
        </ChartCard>
        <ChartCard title="CGPA Performance" description="Distribution by grade band">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={cgpa} margin={{ top: 12, right: 2, left: -20, bottom: 0 }}><CartesianGrid stroke="#edf0f5" vertical={false} /><XAxis dataKey="range" axisLine={false} tickLine={false} tick={{ fill: '#8490a3', fontSize: 10 }} /><YAxis axisLine={false} tickLine={false} tick={{ fill: '#8490a3', fontSize: 10 }} /><Tooltip cursor={{ fill: '#f3f5fa' }} /><Bar dataKey="count" name="Students" radius={[5, 5, 0, 0]}>{cgpa.map((entry, index) => <Cell key={entry.range} fill={['#b9c5e9', '#93a6e4', '#748add', '#596fd5', '#47a5c1'][index]} />)}</Bar></BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </section>

      <section className="activity-section">
        <div className="section-heading"><div><span className="eyebrow">CAMPUS PULSE</span><h2>Recent Activity</h2></div><button className="button button-secondary button-small" onClick={() => window.location.assign('/students')}>View student records <ArrowUpRight size={15} /></button></div>
        <div className="activity-grid">
          <article className="panel activity-column"><h3><span className="activity-dot dot-added" />Recently added students</h3>{recentlyAdded.map((student) => <div className="activity-row" key={student.id}><Avatar name={student.name} photo={student.photo} size="small" /><div className="activity-person"><strong>{student.name}</strong><span>{student.department} · {student.id}</span></div><span className="activity-time">Today</span></div>)}</article>
          <article className="panel activity-column"><h3><span className="activity-dot dot-updated" />Recent updates</h3>{activities.filter((activity) => activity.type === 'updated').map((activity) => <div className="activity-row" key={activity.id}><span className="activity-icon"><Activity size={16} /></span><div className="activity-person"><strong>{activity.name}</strong><span>{activity.detail}</span></div><span className="activity-time">{activity.time}</span></div>)}</article>
          <article className="panel activity-column"><h3><span className="activity-dot dot-removed" />Recent deletions</h3><div className="empty-activity"><GraduationCap size={21} /><span>No recent deletions</span><small>Removed records will appear here.</small></div></article>
        </div>
      </section>
    </div>
  )
}