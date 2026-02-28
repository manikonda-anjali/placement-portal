import React, { useState } from 'react'
import PageWrapper from '../../components/layout/PageWrapper'
import Badge from '../../components/common/Badge'
import Button from '../../components/common/Button'
import Input, { Select } from '../../components/common/Input'
import Modal from '../../components/common/Modal'
import { useAppContext } from '../../context/AppContext'
import { formatDate } from '../../utils/formatDate'

const JOBS = [
  { id: 1, title: 'Software Engineer', company: 'TCS', location: 'Chennai', package: '7 LPA', type: 'full-time', skills: ['React', 'Node.js', 'MongoDB'], deadline: '2024-02-15', openings: 50, description: 'Build scalable enterprise applications.' },
  { id: 2, title: 'Web Developer Intern', company: 'Infosys', location: 'Bangalore', package: '25,000/mo', type: 'internship', skills: ['HTML', 'CSS', 'JavaScript'], deadline: '2024-02-20', openings: 20, description: 'Work on real client projects.' },
  { id: 3, title: 'Data Analyst', company: 'Wipro', location: 'Hyderabad', package: '6.5 LPA', type: 'full-time', skills: ['Python', 'SQL', 'Tableau'], deadline: '2024-02-28', openings: 30, description: 'Analyze large datasets for insights.' },
  { id: 4, title: 'DevOps Engineer', company: 'Cognizant', location: 'Pune', package: '8.5 LPA', type: 'full-time', skills: ['AWS', 'Docker', 'Kubernetes'], deadline: '2024-03-05', openings: 15, description: 'Manage CI/CD pipelines and cloud infra.' },
  { id: 5, title: 'ML Intern', company: 'Google', location: 'Hyderabad', package: '50,000/mo', type: 'internship', skills: ['Python', 'TensorFlow', 'NumPy'], deadline: '2024-03-10', openings: 5, description: 'Research and develop ML models.' },
]

export default function JobListings() {
  const [search, setSearch] = useState('')
  const [typeFilter, setTypeFilter] = useState('')
  const [selected, setSelected] = useState(null)
  const [applied, setApplied] = useState([])
  const { addNotification } = useAppContext()

  const filtered = JOBS.filter(j =>
    (j.title.toLowerCase().includes(search.toLowerCase()) || j.company.toLowerCase().includes(search.toLowerCase())) &&
    (!typeFilter || j.type === typeFilter)
  )

  const handleApply = (job) => {
    if (applied.includes(job.id)) { addNotification('Already applied!', 'warning'); return }
    setApplied(p => [...p, job.id])
    addNotification(`Applied to ${job.title} at ${job.company}!`, 'success')
    setSelected(null)
  }

  return (
    <PageWrapper title="Job Listings">
      <div style={{ display: 'flex', gap: 12, marginBottom: 20, flexWrap: 'wrap' }}>
        <Input placeholder="Search jobs or companies..." value={search} onChange={e => setSearch(e.target.value)} icon="🔍" style={{ flex: 1, minWidth: 200 }} />
        <Select value={typeFilter} onChange={e => setTypeFilter(e.target.value)} style={{ width: 160 }}>
          <option value="">All Types</option>
          <option value="full-time">Full Time</option>
          <option value="internship">Internship</option>
        </Select>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 16 }}>
        {filtered.map(job => {
          const isApplied = applied.includes(job.id)
          return (
            <div key={job.id} style={{ background: 'var(--bg-card)', border: `1px solid ${isApplied ? '#10b98133' : 'var(--border)'}`, borderRadius: 'var(--radius-lg)', padding: 22, transition: 'var(--transition)', cursor: 'pointer' }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 12px 40px rgba(0,0,0,0.3)'; e.currentTarget.style.borderColor = 'var(--accent-cyan)' }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.borderColor = isApplied ? '#10b98133' : 'var(--border)' }}
              onClick={() => setSelected(job)}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14 }}>
                <div style={{ width: 44, height: 44, borderRadius: 10, background: 'linear-gradient(135deg,#00d4ff22,#7c3aed22)', border: '1px solid rgba(0,212,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>🏢</div>
                <Badge label={job.type} type={job.type} />
              </div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 16, fontWeight: 700, marginBottom: 4 }}>{job.title}</h3>
              <div style={{ color: 'var(--text-secondary)', fontSize: 13, marginBottom: 12 }}>{job.company} · {job.location}</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 14 }}>
                {job.skills.map(s => <span key={s} style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border)', borderRadius: 6, padding: '3px 8px', fontSize: 11, color: 'var(--text-secondary)' }}>{s}</span>)}
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: '#10b981', fontFamily: 'var(--font-display)' }}>{job.package}</div>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>Deadline: {formatDate(job.deadline)}</div>
                </div>
                {isApplied && <span style={{ color: '#10b981', fontSize: 12, fontWeight: 600 }}>✓ Applied</span>}
              </div>
            </div>
          )
        })}
      </div>

      <Modal open={!!selected} onClose={() => setSelected(null)} title={selected?.title}>
        {selected && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              <Badge label={selected.type} type={selected.type} />
              <Badge label="Active" type="active" />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              {[['Company', selected.company], ['Location', selected.location], ['Package', selected.package], ['Openings', selected.openings], ['Deadline', formatDate(selected.deadline)]].map(([k, v]) => (
                <div key={k} style={{ background: 'var(--bg-elevated)', borderRadius: 10, padding: '12px 14px' }}>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 4 }}>{k}</div>
                  <div style={{ fontWeight: 600, fontSize: 14 }}>{v}</div>
                </div>
              ))}
            </div>
            <div style={{ background: 'var(--bg-elevated)', borderRadius: 10, padding: 14 }}>
              <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 8 }}>Description</div>
              <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7 }}>{selected.description}</p>
            </div>
            <div>
              <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 8 }}>Required Skills</div>
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                {selected.skills.map(s => <span key={s} style={{ background: 'rgba(0,212,255,0.1)', border: '1px solid rgba(0,212,255,0.2)', borderRadius: 6, padding: '4px 10px', fontSize: 12, color: 'var(--accent-cyan)' }}>{s}</span>)}
              </div>
            </div>
            <Button onClick={() => handleApply(selected)} variant={applied.includes(selected.id) ? 'ghost' : 'primary'} disabled={applied.includes(selected.id)} fullWidth size="lg">
              {applied.includes(selected.id) ? '✓ Already Applied' : 'Apply Now'}
            </Button>
          </div>
        )}
      </Modal>
    </PageWrapper>
  )
}
