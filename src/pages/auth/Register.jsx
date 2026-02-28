import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Input, { Select } from '../../components/common/Input'
import Button from '../../components/common/Button'
import useAuth from '../../hooks/useAuth'
import { useAppContext } from '../../context/AppContext'
import { ROLE_HOME } from '../../utils/rolePermissions'

export default function Register() {
  const navigate = useNavigate()
  const { login } = useAuth()
  const { addNotification } = useAppContext()
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'student', branch: '', batch: '' })
  const [loading, setLoading] = useState(false)

  const set = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }))

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.password) { addNotification('Please fill all required fields', 'error'); return }
    setLoading(true)
    setTimeout(() => {
      const user = { name: form.name, email: form.email, role: form.role, id: Date.now().toString(), branch: form.branch, batch: form.batch }
      login(user, 'demo-token-new-' + form.role)
      addNotification('Account created successfully!', 'success')
      navigate(ROLE_HOME[form.role])
    }, 800)
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-primary)', padding: 20 }}>
      <div style={{ width: '100%', maxWidth: 460, background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 24, padding: '44px 40px', boxShadow: '0 40px 100px rgba(0,0,0,0.4)', animation: 'fadeInUp 0.5s ease' }}>
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <div style={{ fontSize: 36, marginBottom: 12 }}>🎓</div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 26, fontWeight: 700 }}>Create Account</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: 14, marginTop: 6 }}>Join CampusPlaced today</p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <Input label="Full Name *" placeholder="John Doe" value={form.name} onChange={set('name')} />
          <Input label="Email *" type="email" placeholder="you@campus.edu" value={form.email} onChange={set('email')} />
          <Input label="Password *" type="password" placeholder="••••••••" value={form.password} onChange={set('password')} />
          <Select label="Role" value={form.role} onChange={set('role')}>
            <option value="student">Student</option>
            <option value="employer">Employer</option>
          </Select>
          {form.role === 'student' && <>
            <Input label="Branch" placeholder="e.g. Computer Science" value={form.branch} onChange={set('branch')} />
            <Input label="Batch Year" placeholder="e.g. 2024" value={form.batch} onChange={set('batch')} />
          </>}
          <Button type="submit" loading={loading} fullWidth size="lg" style={{ marginTop: 8 }}>Create Account</Button>
        </form>

        <p style={{ textAlign: 'center', marginTop: 24, color: 'var(--text-secondary)', fontSize: 14 }}>
          Already have an account?{' '}
          <Link to="/login" style={{ color: 'var(--accent-cyan)', fontWeight: 600 }}>Sign in</Link>
        </p>
      </div>
    </div>
  )
}
