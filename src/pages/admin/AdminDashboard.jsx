import React from 'react'
import PageWrapper from '../../components/layout/PageWrapper'
import StatCard from '../../components/charts/StatCard'
import PlacementChart from '../../components/charts/PlacementChart'
import TrendGraph from '../../components/charts/TrendGraph'
import Badge from '../../components/common/Badge'

const recentActivity = [
  { action: 'New employer registered', time: '2 min ago', icon: '🏢', color: '#10b981' },
  { action: '15 students applied to TCS', time: '18 min ago', icon: '📋', color: '#00d4ff' },
  { action: 'Infosys job posting approved', time: '1 hr ago', icon: '✅', color: '#7c3aed' },
  { action: 'Placement report generated', time: '3 hr ago', icon: '📊', color: '#f59e0b' },
  { action: 'New batch 2024 registered', time: '1 day ago', icon: '🎓', color: '#ec4899' },
]

export default function AdminDashboard() {
  return (
    <PageWrapper title="Admin Dashboard">
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 24 }}>
        <StatCard label="Total Students" value="1,248" icon="🎓" color="#00d4ff" trend={12} delay={1} />
        <StatCard label="Active Jobs" value="84" icon="💼" color="#10b981" trend={8} delay={2} />
        <StatCard label="Employers" value="67" icon="🏢" color="#7c3aed" trend={5} delay={3} />
        <StatCard label="Placements" value="623" icon="🏆" color="#f59e0b" trend={18} delay={4} />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>
        <PlacementChart />
        <TrendGraph />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
        {/* Recent Activity */}
        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: 24 }}>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 16, fontWeight: 700, marginBottom: 20 }}>Recent Activity</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {recentActivity.map((a, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 12px', background: 'var(--bg-elevated)', borderRadius: 10 }}>
                <div style={{ width: 32, height: 32, borderRadius: 8, background: `${a.color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{a.icon}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 13, color: 'var(--text-primary)', fontWeight: 500 }}>{a.action}</div>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 2 }}>{a.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* System Health */}
        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: 24 }}>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 16, fontWeight: 700, marginBottom: 20 }}>System Overview</h3>
          {[
            { label: 'Total Applications', value: 2847, max: 3000, color: '#00d4ff' },
            { label: 'Placement Rate', value: 72, max: 100, color: '#10b981' },
            { label: 'Active Job Posts', value: 84, max: 150, color: '#7c3aed' },
            { label: 'Avg CTC (LPA)', value: 8.4, max: 20, color: '#f59e0b' },
          ].map((m, i) => (
            <div key={i} style={{ marginBottom: 16 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6, fontSize: 13 }}>
                <span style={{ color: 'var(--text-secondary)' }}>{m.label}</span>
                <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, color: m.color }}>{m.value}{m.label.includes('Rate') ? '%' : m.label.includes('CTC') ? 'L' : ''}</span>
              </div>
              <div style={{ height: 6, background: 'var(--bg-elevated)', borderRadius: 3, overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${(m.value / m.max) * 100}%`, background: m.color, borderRadius: 3, transition: 'width 1s ease' }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </PageWrapper>
  )
}
