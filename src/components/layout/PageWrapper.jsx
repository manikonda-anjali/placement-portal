import React from 'react'
import Sidebar from './Sidebar'
import Navbar from './Navbar'

export default function PageWrapper({ title, children }) {
  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg-primary)' }}>
      <Sidebar />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        <Navbar title={title} />
        <main style={{ flex: 1, padding: '28px', overflowY: 'auto' }} className="page-enter">
          {children}
        </main>
      </div>
    </div>
  )
}
