import React, { useState } from 'react'

export default function Input({ label, error, icon, type = 'text', style, ...props }) {
  const [focused, setFocused] = useState(false)
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6, ...style }}>
      {label && <label style={{ fontSize: 13, color: 'var(--text-secondary)', fontWeight: 500, letterSpacing: '0.03em' }}>{label}</label>}
      <div style={{ position: 'relative' }}>
        {icon && <span style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: focused ? 'var(--accent-cyan)' : 'var(--text-muted)', transition: 'var(--transition)' }}>{icon}</span>}
        <input
          type={type}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={{
            width: '100%',
            background: 'var(--bg-elevated)',
            border: `1px solid ${error ? '#ef4444' : focused ? 'var(--accent-cyan)' : 'var(--border)'}`,
            borderRadius: 'var(--radius)',
            color: 'var(--text-primary)',
            padding: icon ? '10px 14px 10px 38px' : '10px 14px',
            fontSize: 14,
            transition: 'var(--transition)',
            boxShadow: focused ? '0 0 0 3px rgba(0,212,255,0.1)' : 'none'
          }}
          {...props}
        />
      </div>
      {error && <span style={{ fontSize: 12, color: '#ef4444' }}>{error}</span>}
    </div>
  )
}

export function Select({ label, error, children, style, ...props }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6, ...style }}>
      {label && <label style={{ fontSize: 13, color: 'var(--text-secondary)', fontWeight: 500 }}>{label}</label>}
      <select
        style={{
          background: 'var(--bg-elevated)',
          border: `1px solid ${error ? '#ef4444' : 'var(--border)'}`,
          borderRadius: 'var(--radius)',
          color: 'var(--text-primary)',
          padding: '10px 14px',
          fontSize: 14,
          width: '100%',
          cursor: 'pointer'
        }}
        {...props}
      >
        {children}
      </select>
      {error && <span style={{ fontSize: 12, color: '#ef4444' }}>{error}</span>}
    </div>
  )
}
