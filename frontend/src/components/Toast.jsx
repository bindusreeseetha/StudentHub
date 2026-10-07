import { CheckCircle2, X } from 'lucide-react'

export default function Toast({ message, onClose }) {
  if (!message) return null
  return (
    <div className="toast" role="status">
      <CheckCircle2 size={19} aria-hidden="true" />
      <span>{message}</span>
      <button type="button" className="icon-button toast-close" aria-label="Dismiss notification" onClick={onClose}>
        <X size={16} />
      </button>
    </div>
  )
}