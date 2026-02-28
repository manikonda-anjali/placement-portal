import React, { useState } from 'react'
import PageWrapper from '../../components/layout/PageWrapper'
import Table from '../../components/common/Table'
import Badge from '../../components/common/Badge'
import Button from '../../components/common/Button'
import { useAppContext } from '../../context/AppContext'
import { formatDate } from '../../utils/formatDate'

const APPS = [
  { id: 1, name: 'Alice Johnson', email: 'alice@campus.edu', branch: 'CSE', cgpa: 8.9, job: 'Software Engineer', appliedAt: '2024-01-10', status: 'applied' },
  { id: 2, name: 'Bob Kumar', email: 'bob@campus.edu', branch: 'IT', cgpa: 7.8, job: 'Software Engineer', appliedAt: '2024-01-11', status: 'shortlisted' },
  { id: 3, name: 'Carol Das', email: 'carol@campus.edu', branch: 'CSE', cgpa: 9.1, job: 'Software Engineer', appliedAt: '2024-01-12', status: 'interviewed' },
  { id: 4, name: 'David Raj', email: 'david@campus.edu', branch: 'ECE', cgpa: 7.2, job: 'Data Analyst', appliedAt: '2024-01-14', status: 'applied' },
  { id: 5, name: 'Eva Sharma', email: 'eva@campus.edu', branch: 'CSE', cgpa: 8.5, job: 'Data Analyst', appliedAt: '2024-01-13', status: 'selected' },
]

const NEXT_STATUS = { applied: 'shortlisted', shortlisted: 'interviewed', interviewed: 'selected' }

export default function ApplicationReview() {
  const [apps, setApps] = useState(APPS)
  const { addNotification } = useAppContext()

  const updateStatus = (id, status) => {
    setApps(p => p.map(a => a.id === id ? { ...a, status } : a))
    addNotification(`Status updated to ${status}`, 'success')
  }

  const columns = [
    { header: 'Candidate', key: 'name', render: (v, row) => (
      <div><div style={{ fontWeight: 600 }}>{v}</div><div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{row.email}</div></div>
    )},
    { header: 'Branch / CGPA', key: 'branch', render: (v, row) => <span style={{ color: 'var(--text-secondary)' }}>{v} · {row.cgpa}</span> },
    { header: 'Job', key: 'job' },
    { header: 'Applied', key: 'appliedAt', render: v => formatDate(v) },
    { header: 'Status', key: 'status', render: v => <Badge label={v} type={v} /> },
    { header: 'Actions', key: 'id', render: (_, row) => (
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
        {NEXT_STATUS[row.status] && (
          <Button size="sm" variant="success" onClick={() => updateStatus(row.id, NEXT_STATUS[row.status])}>
            → {NEXT_STATUS[row.status]}
          </Button>
        )}
        {row.status !== 'rejected' && row.status !== 'selected' && (
          <Button size="sm" variant="danger" onClick={() => updateStatus(row.id, 'rejected')}>Reject</Button>
        )}
      </div>
    )}
  ]

  return (
    <PageWrapper title="Review Applications">
      <div style={{ display: 'flex', gap: 12, marginBottom: 20, flexWrap: 'wrap' }}>
        {['All', 'applied', 'shortlisted', 'interviewed', 'selected', 'rejected'].map(s => (
          <span key={s} style={{ padding: '5px 14px', borderRadius: 20, border: '1px solid var(--border)', fontSize: 12, cursor: 'pointer', background: 'var(--bg-elevated)', color: 'var(--text-secondary)' }}>{s === 'All' ? 'All' : s}</span>
        ))}
      </div>
      <Table columns={columns} data={apps} />
    </PageWrapper>
  )
}
