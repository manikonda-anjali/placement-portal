import React from 'react'

export default function StatCard({ label, value, icon, color = 'var(--accent-cyan)', trend, delay = 0 }) {
  return (
    <div className={`animate-fade-up animate-stagger-${delay}`} style={{
      background: 'var(--bg-card)',
      border: '1px solid var(--border)',
      borderRadius: 'var(--radius-lg)',
      padding: '22px 24px',
      position: 'relative',
      overflow: 'hidden',
      transition: 'var(--transition)'
    }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = color; e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = `0 12px 40px ${color}22` }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none' }}
    >
      <div style={{ position: 'absolute', top: 0, right: 0, width: 120, height: 120, background: `radial-gradient(circle at top right, ${color}18, transparent 70%)`, pointerEvents: 'none' }} />
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 16 }}>
        <span style={{ fontSize: 12, color: 'var(--text-secondary)', fontWeight: 500, letterSpacing: '0.05em', textTransform: 'uppercase' }}>{label}</span>
        <div style={{ width: 36, height: 36, borderRadius: 10, background: `${color}18`, border: `1px solid ${color}33`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, color }}>{icon}</div>
      </div>
      <div style={{ fontFamily: 'var(--font-display)', fontSize: 32, fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1 }}>{value}</div>
      {trend && <div style={{ marginTop: 8, fontSize: 12, color: trend > 0 ? '#10b981' : '#ef4444', display: 'flex', alignItems: 'center', gap: 4 }}>
        <span>{trend > 0 ? '▲' : '▼'}</span> {Math.abs(trend)}% from last month
      </div>}
    </div>
  )
}
