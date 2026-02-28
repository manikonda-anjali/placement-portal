import React, { useState } from 'react'
import PageWrapper from '../../components/layout/PageWrapper'
import Input, { Select } from '../../components/common/Input'
import Button from '../../components/common/Button'
import useAuth from '../../hooks/useAuth'
import { useAppContext } from '../../context/AppContext'

export default function Profile() {
  const { user } = useAuth()
  const { addNotification } = useAppContext()
  const [form, setForm] = useState({ name: user?.name || '', email: user?.email || '', branch: user?.branch || 'CSE', batch: user?.batch || '2024', cgpa: '8.5', skills: 'React, Node.js, Python, SQL', phone: '', linkedin: '', github: '' })
  const [loading, setLoading] = useState(false)
  const set = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }))

  const completionScore = () => {
    const fields = [form.name, form.email, form.branch, form.batch, form.cgpa, form.skills, form.phone]
    return Math.round((fields.filter(Boolean).length / fields.length) * 100)
  }

  const handleSave = () => {
    setLoading(true)
    setTimeout(() => { setLoading(false); addNotification('Profile updated successfully!', 'success') }, 700)
  }

  const score = completionScore()

  return (
    <PageWrapper title="My Profile">
      <div style={{ maxWidth: 760 }}>
        {/* Header Card */}
        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: 28, marginBottom: 20, display: 'flex', alignItems: 'center', gap: 24 }}>
          <div style={{ width: 72, height: 72, borderRadius: '50%', background: 'linear-gradient(135deg,#00d4ff,#7c3aed)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28, fontFamily: 'var(--font-display)', fontWeight: 800, color: '#fff', flexShrink: 0 }}>
            {form.name?.[0]?.toUpperCase()}
          </div>
          <div style={{ flex: 1 }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 700, marginBottom: 4 }}>{form.name}</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: 14 }}>{form.email} · {form.branch} · Batch {form.batch}</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 12 }}>
              <div style={{ flex: 1, maxWidth: 200, height: 6, background: 'var(--bg-elevated)', borderRadius: 3, overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${score}%`, background: score > 80 ? '#10b981' : score > 50 ? '#f59e0b' : '#ef4444', borderRadius: 3, transition: 'width 1s ease' }} />
              </div>
              <span style={{ fontSize: 13, fontWeight: 600, color: score > 80 ? '#10b981' : '#f59e0b' }}>{score}% Complete</span>
            </div>
          </div>
        </div>

        {/* Form */}
        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: 28 }}>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 16, fontWeight: 700, marginBottom: 24, paddingBottom: 12, borderBottom: '1px solid var(--border)' }}>Personal Information</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 24 }}>
            <Input label="Full Name" value={form.name} onChange={set('name')} />
            <Input label="Email" type="email" value={form.email} onChange={set('email')} />
            <Select label="Branch" value={form.branch} onChange={set('branch')}>
              {['CSE', 'ECE', 'MECH', 'EEE', 'CIVIL', 'IT'].map(b => <option key={b} value={b}>{b}</option>)}
            </Select>
            <Input label="Batch Year" value={form.batch} onChange={set('batch')} />
            <Input label="CGPA" value={form.cgpa} onChange={set('cgpa')} placeholder="e.g. 8.5" />
            <Input label="Phone" value={form.phone} onChange={set('phone')} placeholder="+91 99999 99999" />
            <Input label="LinkedIn URL" value={form.linkedin} onChange={set('linkedin')} placeholder="linkedin.com/in/..." />
            <Input label="GitHub URL" value={form.github} onChange={set('github')} placeholder="github.com/..." />
          </div>
          <Input label="Skills (comma separated)" value={form.skills} onChange={set('skills')} placeholder="React, Python, SQL..." style={{ marginBottom: 24 }} />
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 20 }}>
            {form.skills.split(',').map(s => s.trim()).filter(Boolean).map(s => (
              <span key={s} style={{ background: 'rgba(0,212,255,0.1)', border: '1px solid rgba(0,212,255,0.2)', borderRadius: 6, padding: '4px 12px', fontSize: 12, color: 'var(--accent-cyan)' }}>{s}</span>
            ))}
          </div>
          <Button onClick={handleSave} loading={loading} size="lg">Save Changes</Button>
        </div>
      </div>
    </PageWrapper>
  )
}
