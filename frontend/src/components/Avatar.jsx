export default function Avatar({ name, photo, size = 'regular' }) {
  const initials = name?.split(/\s+/).slice(0, 2).map((part) => part[0]).join('').toUpperCase() || 'SH'
  return (
    <span className={`avatar avatar-${size}`} aria-label={name || 'Student profile'}>
      {photo ? <img src={photo} alt="" /> : initials}
    </span>
  )
}