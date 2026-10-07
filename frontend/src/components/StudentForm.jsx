import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Check, FileImage, Info, Upload } from 'lucide-react'
import Avatar from './Avatar.jsx'
import { useApp } from '../context/AppContext.jsx'
import { academicYears, departments } from '../data/mockStudents.js'

const emptyStudent = { id: '', name: '', email: '', phone: '', department: '', year: '', cgpa: '', photo: '' }

export default function StudentForm({ student, mode }) {
  const [form, setForm] = useState(student || emptyStudent)
  const [fileError, setFileError] = useState('')
  const fileInput = useRef(null)
  const { students, addStudent, updateStudent, notify } = useApp()
  const navigate = useNavigate()
  const editing = mode === 'edit'

  const setField = (event) => setForm({ ...form, [event.target.name]: event.target.value })
  const loadPhoto = (file) => {
    if (!file) return
    if (!file.type.startsWith('image/')) {
      setFileError('Choose a JPG or PNG image.')
      return
    }
    if (file.size > 2 * 1024 * 1024) {
      setFileError('Image must be 2 MB or smaller.')
      return
    }
    const reader = new FileReader()
    reader.onload = () => {
      setForm((current) => ({ ...current, photo: String(reader.result) }))
      setFileError('')
    }
    reader.readAsDataURL(file)
  }

  const submit = (event) => {
    event.preventDefault()
    const normalizedId = form.id.trim().toUpperCase()
    const duplicate = students.some((record) => record.id.toLowerCase() === normalizedId.toLowerCase() && record.id !== student?.id)
    if (duplicate) {
      event.currentTarget.elements.id.setCustomValidity('This student ID is already in use.')
      event.currentTarget.elements.id.reportValidity()
      return
    }
    event.currentTarget.elements.id.setCustomValidity('')
    const record = { ...form, id: normalizedId, name: form.name.trim(), email: form.email.trim(), phone: form.phone.trim(), cgpa: Number(form.cgpa), active: student?.active ?? true }
    if (editing) updateStudent(student.id, record)
    else addStudent(record)
    notify(editing ? 'Student record updated successfully' : 'Student added successfully')
    navigate('/students')
  }

  return (
    <form className="student-form-layout" onSubmit={submit}>
      <section className="panel form-panel">
        <div className="form-card-heading"><div className="form-heading-icon"><FileImage size={19} /></div><div><h2>Student Information</h2><p>Enter the student's academic and contact details.</p></div></div>
        <div className="form-fields-grid">
          <label className="form-field"><span>Student ID <b>*</b></span><input name="id" value={form.id} onChange={setField} placeholder="e.g. STU025" required maxLength={16} /></label>
          <label className="form-field"><span>Full Name <b>*</b></span><input name="name" value={form.name} onChange={setField} placeholder="Enter student's full name" required /></label>
          <label className="form-field"><span>Email Address <b>*</b></span><input name="email" type="email" value={form.email} onChange={setField} placeholder="name@college.edu.in" required /></label>
          <label className="form-field"><span>Phone Number <b>*</b></span><input name="phone" type="tel" value={form.phone} onChange={setField} placeholder="+91 98765 43210" required pattern="[+0-9 ()-]{10,18}" title="Enter a valid phone number" /></label>
          <label className="form-field"><span>Department <b>*</b></span><select name="department" value={form.department} onChange={setField} required><option value="" disabled>Select department</option>{departments.map((item) => <option key={item}>{item}</option>)}</select></label>
          <label className="form-field"><span>Academic Year <b>*</b></span><select name="year" value={form.year} onChange={setField} required><option value="" disabled>Select academic year</option>{academicYears.map((item) => <option key={item}>{item}</option>)}</select></label>
          <label className="form-field cgpa-input"><span>CGPA <b>*</b></span><input name="cgpa" type="number" min="0" max="10" step="0.1" value={form.cgpa} onChange={setField} placeholder="Enter CGPA" required /><small>Enter a value between 0 and 10</small></label>
        </div>
        <div className="form-actions"><button type="button" className="button button-secondary" onClick={() => navigate('/students')}>Cancel</button><button type="submit" className="button button-primary"><Check size={16} /> {editing ? 'Save Changes' : 'Save Student'}</button></div>
      </section>

      <aside className="form-aside">
        <section className="panel photo-panel">
          <div className="form-card-heading"><div><h2>Profile Photo</h2><p>Upload a clear student profile image.</p></div></div>
          <div className="photo-controls"><Avatar name={form.name} photo={form.photo} size="large" /><div><button type="button" className="button button-secondary button-small" onClick={() => fileInput.current?.click()}><Upload size={15} /> Upload Photo</button><input className="visually-hidden" ref={fileInput} type="file" accept="image/png,image/jpeg,image/webp" onChange={(event) => loadPhoto(event.target.files?.[0])} /><span className="photo-limit">JPG or PNG · Max 2 MB</span></div></div>
          <button type="button" className="drop-zone" onClick={() => fileInput.current?.click()} onDragOver={(event) => event.preventDefault()} onDrop={(event) => { event.preventDefault(); loadPhoto(event.dataTransfer.files?.[0]) }}><Upload size={17} /><span>Drag and drop a photo here</span><small>or click to browse files</small></button>
          {fileError && <p className="form-error" role="alert">{fileError}</p>}
        </section>
        <section className="panel guidance-panel"><h3><Info size={17} /> Before you continue</h3><ul><li><Check size={15} />Student ID must be unique</li><li><Check size={15} />Use the student's official email address</li><li><Check size={15} />Select the correct department and academic year</li><li><Check size={15} />CGPA must be between 0 and 10</li></ul></section>
      </aside>
    </form>
  )
}