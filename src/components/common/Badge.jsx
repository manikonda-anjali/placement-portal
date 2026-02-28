import React from 'react'

const statusConfig = {
  applied:     { color: '#00d4ff', bg: 'rgba(0,212,255,0.12)' },
  shortlisted: { color: '#f59e0b', bg: 'rgba(245,158,11,0.12)' },
  interviewed: { color: '#7c3aed', bg: 'rgba(124,58,237,0.12)' },
  selected:    { color: '#10b981', bg: 'rgba(16,185,129,0.12)' },
  rejected:    { color: '#ef4444', bg: 'rgba(239,68,68,0.12)' },
  active:      { color: '#10b981', bg: 'rgba(16,185,129,0.12)' },
  closed:      { color: '#6b7280', bg: 'rgba(107,114,128,0.12)' },
  draft:       { color: '#f59e0b', bg: 'rgba(245,158,11,0.12)' },
  verified:    { color: '#10b981', bg: 'rgba(16,185,129,0.12)' },
  pending:     { color: '#f59e0b', bg: 'rgba(245,158,11,0.12)' },
  admin:       { color: '#ec4899', bg: 'rgba(236,72,153,0.12)' },
  student:     { color: '#00d4ff', bg: 'rgba(0,212,255,0.12)' },
  employer:    { color: '#10b981', bg: 'rgba(16,185,129,0.12)' },
  officer:     { color: '#f59e0b', bg: 'rgba(245,158,11,0.12)' },
  'full-time': { color: '#7c3aed', bg: 'rgba(124,58,237,0.12)' },
  internship:  { color: '#f97316', bg: 'rgba(249,115,22,0.12)' },
}

export default function Badge({ label, type }) {
  const cfg = statusConfig[type] || statusConfig[label?.toLowerCase()] || { color: '#8b9cbf', bg: 'rgba(139,156,191,0.12)' }
  return (
    <span style={{
      background: cfg.bg,
      color: cfg.color,
      border: `1px solid ${cfg.color}33`,
      padding: '3px 10px',
      borderRadius: 20,
      fontSize: 11,
      fontWeight: 600,
      letterSpacing: '0.05em',
      textTransform: 'uppercase',
      display: 'inline-flex',
      alignItems: 'center',
      gap: 4
    }}>
      <span style={{ width: 5, height: 5, borderRadius: '50%', background: cfg.color, display: 'inline-block' }} />
      {label}
    </span>
  )
}
