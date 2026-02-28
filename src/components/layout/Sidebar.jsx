import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'
import { ROLE_COLORS, ROLE_LABELS } from '../../utils/rolePermissions'

const NAV_ITEMS = {
  admin: [
    { to: '/admin', label: 'Dashboard', icon: '⬡', exact: true },
    { to: '/admin/users', label: 'User Management', icon: '👥' },
    { to: '/admin/reports', label: 'System Reports', icon: '📊' },
  ],
  student: [
    { to: '/student', label: 'Dashboard', icon: '⬡', exact: true },
    { to: '/student/jobs', label: 'Job Listings', icon: '💼' },
    { to: '/student/applications', label: 'My Applications', icon: '📋' },
    { to: '/student/profile', label: 'Profile', icon: '👤' },
  ],
  employer: [
    { to: '/employer', label: 'Dashboard', icon: '⬡', exact: true },
    { to: '/employer/post-job', label: 'Post a Job', icon: '➕' },
    { to: '/employer/applications', label: 'Review Applications', icon: '📋' },
  ],
  officer: [
    { to: '/officer', label: 'Dashboard', icon: '⬡', exact: true },
    { to: '/officer/tracking', label: 'Placement Tracking', icon: '📍' },
    { to: '/officer/reports', label: 'Reports', icon: '📊' },
  ]
}

export default function Sidebar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [collapsed, setCollapsed] = useState(false)
  const roleColor = ROLE_COLORS[user?.role] || 'var(--accent-cyan)'
  const navItems = NAV_ITEMS[user?.role] || []

  const handleLogout = () => { logout(); navigate('/login') }

  return (
    <aside style={{
      width: collapsed ? 68 : 240,
      background: 'var(--bg-secondary)',
      borderRight: '1px solid var(--border)',
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      position: 'sticky',
      top: 0,
      transition: 'width 0.3s cubic-bezier(0.4,0,0.2,1)',
      overflow: 'hidden',
      flexShrink: 0,
      zIndex: 100
    }}>
      {/* Logo */}
      <div style={{ padding: '20px 16px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{ width: 36, height: 36, borderRadius: 10, background: `linear-gradient(135deg, #00d4ff, #7c3aed)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, flexShrink: 0 }}>🎓</div>
        {!collapsed && <div>
          <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 16, color: 'var(--text-primary)' }}>CampusPlaced</div>
          <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>Placement Portal</div>
        </div>}
      </div>

      {/* User Info */}
      {!collapsed && (
        <div style={{ padding: '16px', margin: '12px', background: `${roleColor}12`, border: `1px solid ${roleColor}30`, borderRadius: 'var(--radius)', animation: 'fadeIn 0.3s ease' }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{user?.name}</div>
          <div style={{ fontSize: 11, color: roleColor, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{ROLE_LABELS[user?.role]}</div>
        </div>
      )}

      {/* Nav */}
      <nav style={{ flex: 1, padding: '8px 12px', display: 'flex', flexDirection: 'column', gap: 2 }}>
        {navItems.map(item => (
          <NavLink key={item.to} to={item.to} end={item.exact} style={({ isActive }) => ({
            display: 'flex', alignItems: 'center', gap: 12, padding: '10px 12px', borderRadius: 'var(--radius)',
            color: isActive ? roleColor : 'var(--text-secondary)',
            background: isActive ? `${roleColor}15` : 'transparent',
            border: isActive ? `1px solid ${roleColor}30` : '1px solid transparent',
            fontWeight: isActive ? 600 : 400, fontSize: 14, transition: 'var(--transition)',
            whiteSpace: 'nowrap'
          })}
            onMouseEnter={e => { if (!e.currentTarget.style.background.includes('15')) { e.currentTarget.style.background = 'var(--bg-elevated)'; e.currentTarget.style.color = 'var(--text-primary)' } }}
            onMouseLeave={e => { }}
          >
            <span style={{ fontSize: 16, flexShrink: 0, width: 20, textAlign: 'center' }}>{item.icon}</span>
            {!collapsed && item.label}
          </NavLink>
        ))}
      </nav>

      {/* Bottom */}
      <div style={{ padding: 12, borderTop: '1px solid var(--border)', display: 'flex', flexDirection: 'column', gap: 4 }}>
        <button onClick={() => setCollapsed(!collapsed)} style={{
          background: 'none', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: '8px 12px',
          color: 'var(--text-secondary)', cursor: 'pointer', fontSize: 13, display: 'flex', alignItems: 'center',
          gap: 8, transition: 'var(--transition)', width: '100%', justifyContent: collapsed ? 'center' : 'flex-start'
        }}>
          <span>{collapsed ? '→' : '←'}</span>
          {!collapsed && 'Collapse'}
        </button>
        <button onClick={handleLogout} style={{
          background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: 'var(--radius)',
          padding: '8px 12px', color: '#ef4444', cursor: 'pointer', fontSize: 13, display: 'flex', alignItems: 'center',
          gap: 8, transition: 'var(--transition)', width: '100%', justifyContent: collapsed ? 'center' : 'flex-start'
        }}>
          <span>⏻</span>
          {!collapsed && 'Logout'}
        </button>
      </div>
    </aside>
  )
}
