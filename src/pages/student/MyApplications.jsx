import React, { useState } from 'react'
import PageWrapper from '../../components/layout/PageWrapper'
import Badge from '../../components/common/Badge'
import { formatDate } from '../../utils/formatDate'

const MY_APPS = [
  { id: 1, job: 'Software Engineer', company: 'TCS', type: 'full-time', package: '7 LPA', appliedAt: '2024-01-10', status: 'shortlisted', statusHistory: [{ s: 'applied', d: '2024-01-10' }, { s: 'shortlisted', d: '2024-01-15' }] },
  { id: 2, job: 'Web Developer Intern', company: 'Infosys', type: 'internship', package: '25k/mo', appliedAt: '2024-01-12', status: 'interviewed', statusHistory: [{ s: 'applied', d: '2024-01-12' }, { s: 'shortlisted', d: '2024-01-16' }, { s: 'interviewed', d: '2024-01-22' }] },
  { id: 3, job: 'Data Analyst', company: 'Wipro', type: 'full-time', package: '6.5 LPA', appliedAt: '2024-01-14', status: 'applied', statusHistory: [{ s: 'applied', d: '2024-01-14' }] },
  { id: 4, job: 'ML Intern', company: 'Google', type: 'internship', package: '50k/mo', appliedAt: '2024-01-08', status: 'rejected', statusHistory: [{ s: 'applied', d: '2024-01-08' }, { s: 'rejected', d: '2024-01-18' }] },
  { id: 5, job: 'DevOps Engineer', company: 'Amazon', type: 'full-time', package: '12 LPA', appliedAt: '2024-01-20', status: 'selected', statusHistory: [{ s: 'applied', d: '2024-01-20' }, { s: 'shortlisted', d: '2024-01-25' }, { s: 'interviewed', d: '2024-02-01' }, { s: 'selected', d: '2024-02-05' }] },
]

const PIPELINE = ['applied', 'shortlisted', 'interviewed', 'selected']
const STAGE_COLORS = { applied: '#00d4ff', shortlisted: '#f59e0b', interviewed: '#7c3aed', selected: '#10b981', rejected: '#ef4444' }

export default function MyApplications() {
  const [view, setView] = useState('list')
  return (
    <PageWrapper title="My Applications">
      <div style={{ display: 'flex', gap: 8, marginBottom: 24 }}>
        {['list', 'kanban'].map(v => (
          <button key={v} onClick={() => setView(v)} style={{ padding: '8px 18px', borderRadius: 'var(--radius)', background: view === v ? 'var(--accent-cyan)' : 'var(--bg-elevated)', color: view === v ? '#000' : 'var(--text-secondary)', border: '1px solid var(--border)', cursor: 'pointer', fontSize: 13, fontWeight: 600, textTransform: 'capitalize', transition: 'var(--transition)' }}>
            {v === 'list' ? '☰ List' : '⊞ Kanban'}
          </button>
        ))}
      </div>

      {view === 'list' ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {MY_APPS.map(app => (
            <div key={app.id} style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: 20, display: 'flex', alignItems: 'center', gap: 16, transition: 'var(--transition)' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = STAGE_COLORS[app.status] || 'var(--border)' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)' }}
            >
              <div style={{ width: 44, height: 44, borderRadius: 10, background: `${STAGE_COLORS[app.status]}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0 }}>🏢</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600, fontSize: 15 }}>{app.job}</div>
                <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginTop: 2 }}>{app.company} · {app.package}</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <Badge label={app.status} type={app.status} />
                <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 4 }}>Applied {formatDate(app.appliedAt)}</div>
              </div>
              {/* Progress pipeline */}
              {app.status !== 'rejected' && (
                <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginLeft: 16 }}>
                  {PIPELINE.map((stage, i) => {
                    const done = PIPELINE.indexOf(app.status) >= i
                    return (
                      <React.Fragment key={stage}>
                        <div style={{ width: 10, height: 10, borderRadius: '50%', background: done ? STAGE_COLORS[stage] : 'var(--border)', transition: 'var(--transition)' }} title={stage} />
                        {i < PIPELINE.length - 1 && <div style={{ width: 20, height: 2, background: done && PIPELINE.indexOf(app.status) > i ? STAGE_COLORS[PIPELINE[i + 1]] : 'var(--border)' }} />}
                      </React.Fragment>
                    )
                  })}
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
          {['applied', 'shortlisted', 'interviewed', 'selected'].map(stage => (
            <div key={stage} style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: 16 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14, paddingBottom: 10, borderBottom: '1px solid var(--border)' }}>
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: STAGE_COLORS[stage], display: 'inline-block' }} />
                <span style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 13, textTransform: 'capitalize' }}>{stage}</span>
                <span style={{ marginLeft: 'auto', background: 'var(--bg-elevated)', borderRadius: 10, padding: '1px 8px', fontSize: 11, color: 'var(--text-muted)' }}>
                  {MY_APPS.filter(a => a.status === stage).length}
                </span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {MY_APPS.filter(a => a.status === stage).map(app => (
                  <div key={app.id} style={{ background: 'var(--bg-elevated)', borderRadius: 10, padding: '12px 14px', border: `1px solid ${STAGE_COLORS[stage]}22` }}>
                    <div style={{ fontWeight: 600, fontSize: 13, marginBottom: 2 }}>{app.job}</div>
                    <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{app.company}</div>
                    <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 6 }}>{formatDate(app.appliedAt)}</div>
                  </div>
                ))}
                {MY_APPS.filter(a => a.status === stage).length === 0 && (
                  <div style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: 12, padding: '20px 0' }}>No applications</div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </PageWrapper>
  )
}
