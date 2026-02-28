import React, { useEffect } from 'react'

export default function Modal({ open, onClose, title, children, width = 540 }) {
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose?.() }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [onClose])

  if (!open) return null
  return (
    <div
      onClick={(e) => { if (e.target === e.currentTarget) onClose?.() }}
      style={{
        position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000,
        animation: 'fadeIn 0.2s ease'
      }}
    >
      <div style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border-bright)',
        borderRadius: 'var(--radius-lg)',
        width: '90%',
        maxWidth: width,
        maxHeight: '85vh',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        animation: 'fadeInUp 0.3s ease',
        boxShadow: '0 25px 60px rgba(0,0,0,0.5)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 24px', borderBottom: '1px solid var(--border)' }}>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 700 }}>{title}</h3>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', fontSize: 22, cursor: 'pointer', lineHeight: 1, padding: 4, borderRadius: 6, transition: 'var(--transition)' }}
            onMouseEnter={e => { e.currentTarget.style.color = 'var(--text-primary)'; e.currentTarget.style.background = 'var(--border)' }}
            onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-secondary)'; e.currentTarget.style.background = 'none' }}
          >×</button>
        </div>
        <div style={{ padding: 24, overflowY: 'auto' }}>{children}</div>
      </div>
    </div>
  )
}
