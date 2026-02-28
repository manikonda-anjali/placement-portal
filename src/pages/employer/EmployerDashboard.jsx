import React from 'react'
import PageWrapper from '../../components/layout/PageWrapper'
import StatCard from '../../components/charts/StatCard'
import Badge from '../../components/common/Badge'
import { useNavigate } from 'react-router-dom'
import { formatDate } from '../../utils/formatDate'

const MY_JOBS = [
  { id: 1, title: 'Software Engineer', status: 'active', applications: 45, shortlisted: 12, deadline: '2024-02-15' },
  { id: 2, title: 'Data Analyst', status: 'active', applications: 28, shortlisted: 6, deadline: '2024-02-20' },
  { id: 3, title: 'UI/UX Designer', status: 'closed', applications: 67, shortlisted: 15, deadline: '2024-01-30' },
]

export default function EmployerDashboard() {
  const navigate = useNavigate()
  return (
    <PageWrapper title="Employer Dashboard">
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 24 }}>
        <StatCard label="Active Jobs" value="2" icon="💼" color="#10b981" delay={1} />
        <StatCard label="Total Applicants" value="140" icon="👥" color="#00d4ff" delay={2} />
        <StatCard label="Shortlisted" value="33" icon="⭐" color="#f59e0b" delay={3} />
        <StatCard label="Hired" value="8" icon="🏆" color="#7c3aed" delay={4} />
      </div>

      <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: 24 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 16, fontWeight: 700 }}>My Job Postings</h3>
          <button onClick={() => navigate('/employer/post-job')} style={{ background: 'linear-gradient(135deg,#00d4ff,#7c3aed)', border: 'none', borderRadius: 'var(--radius)', padding: '8px 18px', color: '#fff', cursor: 'pointer', fontSize: 13, fontWeight: 700, fontFamily: 'var(--font-display)' }}>+ Post New Job</button>
        </div>
        {MY_JOBS.map(job => (
          <div key={job.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 16, background: 'var(--bg-elevated)', borderRadius: 'var(--radius)', border: '1px solid var(--border)', marginBottom: 10, transition: 'var(--transition)', cursor: 'pointer' }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = '#10b981' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)' }}
            onClick={() => navigate('/employer/applications')}
          >
            <div>
              <div style={{ fontWeight: 600, fontSize: 15 }}>{job.title}</div>
              <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 2 }}>Deadline: {formatDate(job.deadline)}</div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 700, color: '#00d4ff' }}>{job.applications}</div>
                <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>Applied</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 700, color: '#f59e0b' }}>{job.shortlisted}</div>
                <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>Shortlisted</div>
              </div>
              <Badge label={job.status} type={job.status} />
            </div>
          </div>
        ))}
      </div>
    </PageWrapper>
  )
}
