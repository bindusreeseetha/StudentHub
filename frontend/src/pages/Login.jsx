import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowRight, Eye, EyeOff, GraduationCap, LockKeyhole, Mail } from 'lucide-react'
import { useApp } from '../context/AppContext.jsx'

export default function Login() {
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const { login } = useApp()
  const navigate = useNavigate()

  const submitLogin = (event) => {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    const email = String(form.get('email') || '').trim()
    const password = String(form.get('password') || '')
    if (!email || !password) {
      setError('Enter your email address and password to continue.')
      return
    }
    login()
    navigate('/dashboard')
  }

  return (
    <main className="login-page">
      <section className="login-panel">
        <div className="login-brand">
          <div className="brand-mark"><GraduationCap size={24} strokeWidth={2.3} /></div>
          <div className="brand-words"><strong>Student<span>Hub</span></strong><small>College Student Management System</small></div>
        </div>
        <div className="login-intro">
          <span className="eyebrow">ADMIN PORTAL</span>
          <h1>Welcome back</h1>
          <p>Sign in to manage your campus community.</p>
        </div>
        <form className="login-form" onSubmit={submitLogin}>
          <label className="field-label" htmlFor="login-email">Email address</label>
          <div className="input-with-icon"><Mail size={17} /><input id="login-email" name="email" type="email" autoComplete="username" placeholder="admin@college.edu.in" required /></div>
          <div className="label-row"><label className="field-label" htmlFor="login-password">Password</label><button type="button" className="text-button" onClick={() => setError('Password recovery is not connected in this demo.')}>Forgot password?</button></div>
          <div className="input-with-icon password-field"><LockKeyhole size={17} /><input id="login-password" name="password" type={showPassword ? 'text' : 'password'} autoComplete="current-password" placeholder="Enter your password" required /><button className="password-toggle" type="button" aria-label={showPassword ? 'Hide password' : 'Show password'} onClick={() => setShowPassword(!showPassword)}>{showPassword ? <EyeOff size={17} /> : <Eye size={17} />}</button></div>
          <div className="login-options"><label className="check-control"><input type="checkbox" name="remember" /><span>Remember me</span></label><span className="secure-note"><LockKeyhole size={13} /> Secure access</span></div>
          {error && <p className="form-error" role="alert">{error}</p>}
          <button className="button button-primary login-submit" type="submit">Sign in <ArrowRight size={17} /></button>
        </form>
        <div className="login-foot"><span>StudentHub</span><span>College Student Management System</span></div>
      </section>
      <aside className="login-aside">
        <div className="login-aside-content">
          <span className="aside-kicker">CAMPUS OPERATIONS, IN FOCUS</span>
          <h2>Every student.<br />Every possibility.</h2>
          <p>One clear view of the people, progress, and potential across your institution.</p>
          <div className="aside-stat-row"><div><strong>1,250</strong><span>Students</span></div><div><strong>8</strong><span>Departments</span></div><div><strong>82%</strong><span>Placement rate</span></div></div>
        </div>
        <div className="aside-mark" aria-hidden="true"><div className="orbit orbit-one" /><div className="orbit orbit-two" /><GraduationCap size={54} strokeWidth={1.2} /></div>
        <div className="login-aside-footer">ACADEMIC YEAR 2025 – 2026 <span>•</span> ADMINISTRATION PORTAL</div>
      </aside>
    </main>
  )
}