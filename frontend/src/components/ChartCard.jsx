export default function ChartCard({ title, description, className = '', children }) {
  return (
    <section className={`panel chart-card ${className}`}>
      <div className="panel-heading">
        <div>
          <h2>{title}</h2>
          {description && <p>{description}</p>}
        </div>
      </div>
      <div className="chart-area">{children}</div>
    </section>
  )
}