import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'
import { useAppContext } from '../../context/AppContext'
import Input from '../../components/common/Input'
import Button from '../../components/common/Button'
import { ROLE_HOME } from '../../utils/rolePermissions'

const DEMO_ACCOUNTS = [
  { role: 'admin', email: 'admin@campus.edu', password: 'admin123', color: '#ec4899', icon: '🛡️' },
  { role: 'student', email: 'student@campus.edu', password: 'student123', color: '#00d4ff', icon: '🎓' },
  { role: 'employer', email: 'employer@tech.com', password: 'employer123', color: '#10b981', icon: '🏢' },
  { role: 'officer', email: 'officer@campus.edu', password: 'officer123', color: '#f59e0b', icon: '📋' },
]

export default function Login() {
  const navigate = useNavigate()
  const { login } = useAuth()
  const { addNotification } = useAppContext()
  const [form, setForm] = useState({ email: '', password: '' })
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})

  const handleDemoLogin = (account) => {
    const user = { name: account.role.charAt(0).toUpperCase() + account.role.slice(1) + ' User', email: account.email, role: account.role, id: Math.random().toString(36) }
    login(user, 'demo-token-' + account.role)
    addNotification(`Logged in as ${account.role}!`, 'success')
    navigate(ROLE_HOME[account.role])
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const errs = {}
    if (!form.email) errs.email = 'Email required'
    if (!form.password) errs.password = 'Password required'
    if (Object.keys(errs).length) { setErrors(errs); return }
    setLoading(true)
    setTimeout(() => {
      const account = DEMO_ACCOUNTS.find(a => a.email === form.email && a.password === form.password)
      if (account) {
        handleDemoLogin(account)
      } else {
        addNotification('Invalid credentials', 'error')
        setLoading(false)
      }
    }, 800)
  }

  return (
    <div style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: 'var(--bg-primary)', padding: 20, position: 'relative', overflow: 'hidden'
    }}>
      {/* Background decoration */}
      <div style={{ position: 'absolute', top: -100, right: -100, width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(0,212,255,0.06) 0%, transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: -100, left: -100, width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(124,58,237,0.06) 0%, transparent 70%)', pointerEvents: 'none' }} />

      <div style={{ width: '100%', maxWidth: 940, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 0, borderRadius: 24, overflow: 'hidden', border: '1px solid var(--border)', boxShadow: '0 40px 100px rgba(0,0,0,0.5)', animation: 'fadeInUp 0.5s ease' }}>
        {/* Left Panel */}
        <div style={{ background: 'linear-gradient(135deg, #0d1526 0%, #111827 100%)', padding: '50px 40px', display: 'flex', flexDirection: 'column', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: 20, right: 20, width: 200, height: 200, borderRadius: '50%', background: 'radial-gradient(circle, rgba(0,212,255,0.1) 0%, transparent 70%)' }} />
          <div style={{ position: 'absolute', bottom: 20, left: 20, width: 150, height: 150, borderRadius: '50%', background: 'radial-gradient(circle, rgba(124,58,237,0.1) 0%, transparent 70%)' }} />

          <div style={{ position: 'relative' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 40 }}>
              <div style={{ width: 44, height: 44, borderRadius: 12, background: 'linear-gradient(135deg,#00d4ff,#7c3aed)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 }}>🎓</div>
              <div>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 20, color: 'var(--text-primary)' }}>CampusPlaced</div>
                <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>Placement Portal</div>
              </div>
            </div>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 36, fontWeight: 800, lineHeight: 1.2, marginBottom: 16 }}>
              Your Career<br /><span style={{ background: 'linear-gradient(90deg, #00d4ff, #7c3aed)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Starts Here.</span>
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: 15, lineHeight: 1.7, marginBottom: 40 }}>
              Connecting students with top employers. Track applications, discover opportunities, and launch your career.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <div style={{ fontSize: 11, color: 'var(--text-muted)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 4 }}>Quick Demo Login</div>
              {DEMO_ACCOUNTS.map(acc => (
                <button key={acc.role} onClick={() => handleDemoLogin(acc)} style={{
                  background: `${acc.color}10`, border: `1px solid ${acc.color}30`, borderRadius: 10,
                  padding: '10px 14px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 10,
                  color: 'var(--text-primary)', fontSize: 13, transition: 'var(--transition)', textAlign: 'left'
                }}
                  onMouseEnter={e => { e.currentTarget.style.background = `${acc.color}20`; e.currentTarget.style.borderColor = acc.color }}
                  onMouseLeave={e => { e.currentTarget.style.background = `${acc.color}10`; e.currentTarget.style.borderColor = `${acc.color}30` }}
                >
                  <span>{acc.icon}</span>
                  <div>
                    <div style={{ fontWeight: 600, textTransform: 'capitalize', color: acc.color }}>{acc.role}</div>
                    <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{acc.email}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Panel */}
        <div style={{ background: 'var(--bg-card)', padding: '50px 40px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 700, marginBottom: 8 }}>Welcome back</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: 14, marginBottom: 36 }}>Sign in to your account to continue</p>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <Input label="Email address" type="email" placeholder="you@campus.edu" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} error={errors.email} icon="✉" />
            <Input label="Password" type="password" placeholder="••••••••" value={form.password} onChange={e => setForm(f => ({ ...f, password: e.target.value }))} error={errors.password} icon="🔒" />
            <Button type="submit" loading={loading} fullWidth size="lg">Sign In</Button>
          </form>

          <div style={{ textAlign: 'center', marginTop: 24, color: 'var(--text-secondary)', fontSize: 14 }}>
            Don't have an account?{' '}
            <Link to="/register" style={{ color: 'var(--accent-cyan)', fontWeight: 600 }}>Register here</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
