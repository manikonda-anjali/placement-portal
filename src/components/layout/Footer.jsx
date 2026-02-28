import React from 'react'

export default function Footer() {
  return (
    <footer style={{ textAlign: 'center', padding: '16px', borderTop: '1px solid var(--border)', fontSize: 12, color: 'var(--text-muted)' }}>
      © {new Date().getFullYear()} CampusPlaced — Campus Placement Portal
    </footer>
  )
}
