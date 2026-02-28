import React, { useState } from 'react'
import PageWrapper from '../../components/layout/PageWrapper'
import Table from '../../components/common/Table'
import Badge from '../../components/common/Badge'
import Button from '../../components/common/Button'
import Input, { Select } from '../../components/common/Input'
import { useAppContext } from '../../context/AppContext'
import { formatDate } from '../../utils/formatDate'

const PLACEMENTS = [
  { id: 1, student: 'Alice Johnson', branch: 'CSE', batch: '2024', company: 'Google', role: 'SWE', ctc: '28 LPA', date: '2024-02-01', status: 'verified' },
  { id: 2, student: 'Bob Kumar', branch: 'IT', batch: '2024', company: 'Microsoft', role: 'SDE', ctc: '32 LPA', date: '2024-02-03', status: 'pending' },
  { id: 3, student: 'Carol Das', branch: 'CSE', batch: '2024', company: 'Amazon', role: 'SDE-I', ctc: '24 LPA', date: '2024-02-05', status: 'pending' },
  { id: 4, student: 'David Raj', branch: 'ECE', batch: '2024', company: 'TCS', role: 'Assoc. Engineer', ctc: '7 LPA', date: '2024-01-28', status: 'verified' },
  { id: 5, student: 'Eva Sharma', branch: 'CSE', batch: '2024', company: 'Wipro', role: 'Data Analyst', ctc: '6.5 LPA', date: '2024-01-30', status: 'verified' },
]

export default function PlacementTracking() {
  const [data, setData] = useState(PLACEMENTS)
  const [search, setSearch] = useState('')
  const { addNotification } = useAppContext()

  const filtered = data.filter(p =>
    p.student.toLowerCase().includes(search.toLowerCase()) || p.company.toLowerCase().includes(search.toLowerCase())
  )

  const verify = (id) => {
    setData(p => p.map(r => r.id === id ? { ...r, status: 'verified' } : r))
    addNotification('Placement verified!', 'success')
  }

  const columns = [
    { header: 'Student', key: 'student', render: (v, row) => <div><div style={{ fontWeight: 600 }}>{v}</div><div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{row.branch} · {row.batch}</div></div> },
    { header: 'Company', key: 'company' },
    { header: 'Role', key: 'role', render: v => <span style={{ color: 'var(--text-secondary)' }}>{v}</span> },
    { header: 'CTC', key: 'ctc', render: v => <span style={{ color: '#10b981', fontWeight: 700, fontFamily: 'var(--font-display)' }}>{v}</span> },
    { header: 'Date', key: 'date', render: v => formatDate(v) },
    { header: 'Status', key: 'status', render: (v, row) => (
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <Badge label={v} type={v} />
        {v === 'pending' && <Button size="sm" variant="success" onClick={() => verify(row.id)}>Verify</Button>}
      </div>
    )}
  ]

  return (
    <PageWrapper title="Placement Tracking">
      <div style={{ display: 'flex', gap: 12, marginBottom: 20 }}>
        <Input placeholder="Search student or company..." value={search} onChange={e => setSearch(e.target.value)} icon="🔍" style={{ flex: 1 }} />
      </div>
      <div style={{ marginBottom: 12, display: 'flex', gap: 16, fontSize: 13 }}>
        <span style={{ color: '#10b981' }}>✓ {data.filter(d => d.status === 'verified').length} Verified</span>
        <span style={{ color: '#f59e0b' }}>⏳ {data.filter(d => d.status === 'pending').length} Pending</span>
      </div>
      <Table columns={columns} data={filtered} />
    </PageWrapper>
  )
}
