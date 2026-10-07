export default function StatCard({ label, value, icon: Icon, tone = 'blue', change }) {
  return (
    <article className="stat-card">
      <div className={`stat-icon stat-icon-${tone}`}><Icon size={20} strokeWidth={2} /></div>
      <div className="stat-copy">
        <span className="stat-label">{label}</span>
        <strong className="stat-value">{value}</strong>
      </div>
      {change && <span className="stat-change">{change}</span>}
    </article>
  )
}