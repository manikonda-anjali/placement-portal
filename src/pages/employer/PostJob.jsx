import React, { useState } from 'react'
import PageWrapper from '../../components/layout/PageWrapper'
import Input, { Select } from '../../components/common/Input'
import Button from '../../components/common/Button'
import { useAppContext } from '../../context/AppContext'
import { useNavigate } from 'react-router-dom'

export default function PostJob() {
  const { addNotification } = useAppContext()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({ title: '', location: '', type: 'full-time', package: '', openings: '', deadline: '', skills: '', description: '', eligibility: '' })
  const set = k => e => setForm(f => ({ ...f, [k]: e.target.value }))

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.title || !form.description) { addNotification('Fill required fields', 'error'); return }
    setLoading(true)
    setTimeout(() => { setLoading(false); addNotification('Job posted successfully!', 'success'); navigate('/employer') }, 900)
  }

  return (
    <PageWrapper title="Post a Job">
      <div style={{ maxWidth: 720 }}>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: 28 }}>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 15, fontWeight: 700, marginBottom: 20, color: 'var(--accent-cyan)' }}>📋 Basic Information</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <Input label="Job Title *" placeholder="Software Engineer" value={form.title} onChange={set('title')} style={{ gridColumn: '1 / -1' }} />
              <Input label="Location" placeholder="Chennai, Tamil Nadu" value={form.location} onChange={set('location')} />
              <Select label="Job Type" value={form.type} onChange={set('type')}>
                <option value="full-time">Full Time</option>
                <option value="internship">Internship</option>
              </Select>
              <Input label="Package / Stipend" placeholder="7 LPA or 25,000/mo" value={form.package} onChange={set('package')} />
              <Input label="No. of Openings" type="number" placeholder="10" value={form.openings} onChange={set('openings')} />
              <Input label="Application Deadline" type="date" value={form.deadline} onChange={set('deadline')} />
            </div>
          </div>

          <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: 28 }}>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 15, fontWeight: 700, marginBottom: 20, color: '#7c3aed' }}>🎯 Job Details</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <Input label="Required Skills" placeholder="React, Node.js, MongoDB (comma separated)" value={form.skills} onChange={set('skills')} />
              <div>
                <label style={{ fontSize: 13, color: 'var(--text-secondary)', fontWeight: 500, display: 'block', marginBottom: 6 }}>Job Description *</label>
                <textarea value={form.description} onChange={set('description')} placeholder="Describe the role, responsibilities, and what you're looking for..." rows={5} style={{ width: '100%', background: 'var(--bg-elevated)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', color: 'var(--text-primary)', padding: '10px 14px', fontSize: 14, resize: 'vertical', fontFamily: 'var(--font-body)' }} />
              </div>
              <div>
                <label style={{ fontSize: 13, color: 'var(--text-secondary)', fontWeight: 500, display: 'block', marginBottom: 6 }}>Eligibility Criteria</label>
                <textarea value={form.eligibility} onChange={set('eligibility')} placeholder="e.g. CGPA > 7.0, CSE/IT branches, 2024 batch..." rows={3} style={{ width: '100%', background: 'var(--bg-elevated)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', color: 'var(--text-primary)', padding: '10px 14px', fontSize: 14, resize: 'vertical', fontFamily: 'var(--font-body)' }} />
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: 12 }}>
            <Button type="button" variant="ghost" onClick={() => navigate('/employer')}>Cancel</Button>
            <Button type="submit" loading={loading} size="lg">Publish Job</Button>
          </div>
        </form>
      </div>
    </PageWrapper>
  )
}
