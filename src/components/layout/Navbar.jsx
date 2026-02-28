import React from 'react'
import useAuth from '../../hooks/useAuth'
import { ROLE_COLORS, ROLE_LABELS } from '../../utils/rolePermissions'

export default function Navbar({ title }) {
  const { user } = useAuth()
  const roleColor = ROLE_COLORS[user?.role] || 'var(--accent-cyan)'

  return (
    <header style={{
      background: 'rgba(8,12,20,0.9)',
      backdropFilter: 'blur(20px)',
      borderBottom: '1px solid var(--border)',
      padding: '14px 28px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      position: 'sticky',
      top: 0,
      zIndex: 50
    }}>
      <div>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 700, color: 'var(--text-primary)' }}>{title}</h2>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <button style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: '6px 12px', color: 'var(--text-secondary)', fontSize: 13, cursor: 'pointer', position: 'relative' }}>
          🔔
          <span style={{ position: 'absolute', top: 4, right: 4, width: 7, height: 7, background: '#ef4444', borderRadius: '50%', border: '1.5px solid var(--bg-primary)' }} />
        </button>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '6px 14px', background: 'var(--bg-elevated)', border: '1px solid var(--border)', borderRadius: 30 }}>
          <div style={{ width: 28, height: 28, borderRadius: '50%', background: `linear-gradient(135deg, ${roleColor}, ${roleColor}88)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, color: '#fff', fontFamily: 'var(--font-display)' }}>
            {user?.name?.[0]?.toUpperCase()}
          </div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)', lineHeight: 1.2 }}>{user?.name}</div>
            <div style={{ fontSize: 10, color: roleColor, textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600 }}>{ROLE_LABELS[user?.role]}</div>
          </div>
        </div>
      </div>
    </header>
  )
}
