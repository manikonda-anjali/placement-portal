import React from 'react'
import PageWrapper from '../../components/layout/PageWrapper'
import StatCard from '../../components/charts/StatCard'
import Badge from '../../components/common/Badge'
import { useNavigate } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'

const RECOMMENDED_JOBS = [
  { id: 1, title: 'Software Engineer', company: 'TCS', package: '7 LPA', type: 'full-time', deadline: '2024-02-15', match: 92 },
  { id: 2, title: 'Web Developer Intern', company: 'Infosys', package: '25k/mo', type: 'internship', deadline: '2024-02-20', match: 87 },
  { id: 3, title: 'Data Analyst', company: 'Wipro', package: '6.5 LPA', type: 'full-time', deadline: '2024-02-28', match: 78 },
]

export default function StudentDashboard() {
  const { user } = useAuth()
  const navigate = useNavigate()

  return (
    <PageWrapper title="Student Dashboard">
      <div style={{ background: 'linear-gradient(135deg, rgba(0,212,255,0.08), rgba(124,58,237,0.08))', border: '1px solid rgba(0,212,255,0.2)', borderRadius: 'var(--radius-lg)', padding: '24px 28px', marginBottom: 24, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <div style={{ fontSize: 13, color: 'var(--accent-cyan)', fontWeight: 600, marginBottom: 4 }}>Good morning 👋</div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 700, marginBottom: 6 }}>{user?.name}</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: 14 }}>{user?.branch || 'Computer Science'} · Batch {user?.batch || '2024'}</p>
        </div>
        <div style={{ background: 'rgba(0,212,255,0.1)', border: '1px solid rgba(0,212,255,0.2)', borderRadius: 'var(--radius)', padding: '12px 20px', textAlign: 'center' }}>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 800, color: 'var(--accent-cyan)' }}>72%</div>
          <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>Profile Complete</div>
          <div style={{ height: 4, background: 'var(--border)', borderRadius: 2, marginTop: 8, width: 100 }}>
            <div style={{ height: '100%', width: '72%', background: 'var(--accent-cyan)', borderRadius: 2 }} />
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 24 }}>
        <StatCard label="Applied" value="8" icon="📋" color="#00d4ff" delay={1} />
        <StatCard label="Shortlisted" value="3" icon="⭐" color="#f59e0b" delay={2} />
        <StatCard label="Interviewed" value="2" icon="🎙️" color="#7c3aed" delay={3} />
        <StatCard label="Offers" value="1" icon="🏆" color="#10b981" delay={4} />
      </div>

      <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: 24 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 16, fontWeight: 700 }}>Recommended for You</h3>
          <button onClick={() => navigate('/student/jobs')} style={{ background: 'none', border: 'none', color: 'var(--accent-cyan)', fontSize: 13, cursor: 'pointer', fontWeight: 600 }}>View all →</button>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {RECOMMENDED_JOBS.map(job => (
            <div key={job.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px', background: 'var(--bg-elevated)', borderRadius: 'var(--radius)', border: '1px solid var(--border)', transition: 'var(--transition)', cursor: 'pointer' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent-cyan)'; e.currentTarget.style.transform = 'translateX(4px)' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.transform = 'none' }}
              onClick={() => navigate('/student/jobs')}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                <div style={{ width: 42, height: 42, borderRadius: 10, background: 'linear-gradient(135deg, #00d4ff22, #7c3aed22)', border: '1px solid rgba(0,212,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>🏢</div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: 14, color: 'var(--text-primary)' }}>{job.title}</div>
                  <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 2 }}>{job.company} · {job.package}</div>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <Badge label={job.type} type={job.type} />
                <div style={{ background: '#10b98118', color: '#10b981', border: '1px solid #10b98133', borderRadius: 20, padding: '3px 10px', fontSize: 12, fontWeight: 700 }}>{job.match}% match</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </PageWrapper>
  )
}
