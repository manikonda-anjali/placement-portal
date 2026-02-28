import React from 'react'

const variants = {
  primary: { background: 'linear-gradient(135deg, #00d4ff, #7c3aed)', color: '#fff', border: 'none' },
  secondary: { background: 'transparent', color: 'var(--accent-cyan)', border: '1px solid var(--accent-cyan)' },
  danger: { background: 'linear-gradient(135deg, #ef4444, #dc2626)', color: '#fff', border: 'none' },
  ghost: { background: 'rgba(255,255,255,0.05)', color: 'var(--text-primary)', border: '1px solid var(--border)' },
  success: { background: 'linear-gradient(135deg, #10b981, #059669)', color: '#fff', border: 'none' },
}

export default function Button({ children, variant = 'primary', size = 'md', loading, disabled, onClick, style, type = 'button', fullWidth }) {
  const sizes = { sm: { padding: '6px 14px', fontSize: 13 }, md: { padding: '10px 22px', fontSize: 14 }, lg: { padding: '14px 30px', fontSize: 16 } }
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      style={{
        ...variants[variant],
        ...sizes[size],
        borderRadius: 'var(--radius)',
        fontFamily: 'var(--font-display)',
        fontWeight: 600,
        cursor: disabled || loading ? 'not-allowed' : 'pointer',
        opacity: disabled || loading ? 0.6 : 1,
        transition: 'var(--transition)',
        display: 'inline-flex',
        alignItems: 'center',
        gap: 8,
        width: fullWidth ? '100%' : 'auto',
        justifyContent: 'center',
        ...style
      }}
      onMouseEnter={e => { if (!disabled && !loading) e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.filter = 'brightness(1.1)' }}
      onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.filter = 'none' }}
    >
      {loading && <span style={{ width: 14, height: 14, border: '2px solid rgba(255,255,255,0.3)', borderTopColor: '#fff', borderRadius: '50%', animation: 'spin 0.7s linear infinite', display: 'inline-block' }} />}
      {children}
    </button>
  )
}
