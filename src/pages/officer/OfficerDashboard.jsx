import React from 'react'
import PageWrapper from '../../components/layout/PageWrapper'
import StatCard from '../../components/charts/StatCard'
import PlacementChart from '../../components/charts/PlacementChart'
import TrendGraph from '../../components/charts/TrendGraph'
import Badge from '../../components/common/Badge'

const PENDING_VERIFICATIONS = [
  { student: 'Alice Johnson', company: 'Google', role: 'SWE', ctc: '28 LPA', date: '2024-02-01' },
  { student: 'Bob Kumar', company: 'Microsoft', role: 'SDE', ctc: '32 LPA', date: '2024-02-03' },
  { student: 'Carol Das', company: 'Amazon', role: 'SDE-I', ctc: '24 LPA', date: '2024-02-05' },
]

export default function OfficerDashboard() {
  return (
    <PageWrapper title="Placement Officer Dashboard">
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 24 }}>
        <StatCard label="Total Students" value="1,248" icon="🎓" color="#f59e0b" trend={4} delay={1} />
        <StatCard label="Placed" value="623" icon="✅" color="#10b981" trend={18} delay={2} />
        <StatCard label="Placement Rate" value="72%" icon="📈" color="#00d4ff" trend={6} delay={3} />
        <StatCard label="Avg CTC" value="8.4L" icon="💰" color="#7c3aed" trend={12} delay={4} />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>
        <PlacementChart />
        <TrendGraph />
      </div>

      <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: 24 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 16, fontWeight: 700 }}>Pending Verifications</h3>
          <Badge label={`${PENDING_VERIFICATIONS.length} pending`} type="pending" />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {PENDING_VERIFICATIONS.map((p, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 16, background: 'var(--bg-elevated)', borderRadius: 'var(--radius)', border: '1px solid rgba(245,158,11,0.2)' }}>
              <div>
                <div style={{ fontWeight: 600, fontSize: 14 }}>{p.student}</div>
                <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 2 }}>{p.role} at {p.company}</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, color: '#10b981' }}>{p.ctc}</div>
                <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{p.date}</div>
              </div>
              <Badge label="pending" type="pending" />
            </div>
          ))}
        </div>
      </div>
    </PageWrapper>
  )
}
