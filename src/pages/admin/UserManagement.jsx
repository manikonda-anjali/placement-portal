import React, { useState } from 'react'
import PageWrapper from '../../components/layout/PageWrapper'
import Table from '../../components/common/Table'
import Badge from '../../components/common/Badge'
import Button from '../../components/common/Button'
import Modal from '../../components/common/Modal'
import Input, { Select } from '../../components/common/Input'
import { useAppContext } from '../../context/AppContext'
import { formatDate } from '../../utils/formatDate'

const MOCK_USERS = [
  { id: 1, name: 'Alice Johnson', email: 'alice@campus.edu', role: 'student', branch: 'CSE', createdAt: '2024-08-01', isActive: true },
  { id: 2, name: 'Bob Smith', email: 'bob@tech.com', role: 'employer', branch: '—', createdAt: '2024-07-20', isActive: true },
  { id: 3, name: 'Charlie Ray', email: 'charlie@campus.edu', role: 'officer', branch: '—', createdAt: '2024-06-15', isActive: true },
  { id: 4, name: 'Diana Prince', email: 'diana@campus.edu', role: 'student', branch: 'ECE', createdAt: '2024-08-03', isActive: false },
  { id: 5, name: 'Ethan Hunt', email: 'ethan@startup.com', role: 'employer', branch: '—', createdAt: '2024-07-28', isActive: true },
]

export default function UserManagement() {
  const [users, setUsers] = useState(MOCK_USERS)
  const [search, setSearch] = useState('')
  const [filterRole, setFilterRole] = useState('')
  const [showAdd, setShowAdd] = useState(false)
  const [newUser, setNewUser] = useState({ name: '', email: '', role: 'student' })
  const { addNotification } = useAppContext()

  const filtered = users.filter(u =>
    (u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase())) &&
    (!filterRole || u.role === filterRole)
  )

  const toggleActive = (id) => {
    setUsers(prev => prev.map(u => u.id === id ? { ...u, isActive: !u.isActive } : u))
    addNotification('User status updated', 'success')
  }

  const handleAdd = () => {
    if (!newUser.name || !newUser.email) { addNotification('Fill all fields', 'error'); return }
    setUsers(prev => [...prev, { ...newUser, id: Date.now(), createdAt: new Date().toISOString(), isActive: true, branch: '—' }])
    addNotification('User added successfully', 'success')
    setShowAdd(false)
    setNewUser({ name: '', email: '', role: 'student' })
  }

  const columns = [
    { header: 'Name', key: 'name' },
    { header: 'Email', key: 'email', render: v => <span style={{ color: 'var(--text-secondary)' }}>{v}</span> },
    { header: 'Role', key: 'role', render: v => <Badge label={v} type={v} /> },
    { header: 'Branch', key: 'branch' },
    { header: 'Joined', key: 'createdAt', render: v => formatDate(v) },
    { header: 'Status', key: 'isActive', render: (v, row) => (
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <Badge label={v ? 'Active' : 'Inactive'} type={v ? 'active' : 'closed'} />
        <button onClick={() => toggleActive(row.id)} style={{ background: 'none', border: '1px solid var(--border)', borderRadius: 6, padding: '3px 8px', cursor: 'pointer', fontSize: 11, color: 'var(--text-secondary)', transition: 'var(--transition)' }}>
          Toggle
        </button>
      </div>
    )}
  ]

  return (
    <PageWrapper title="User Management">
      <div style={{ display: 'flex', gap: 12, marginBottom: 20, alignItems: 'center', flexWrap: 'wrap' }}>
        <Input placeholder="Search users..." value={search} onChange={e => setSearch(e.target.value)} icon="🔍" style={{ flex: 1, minWidth: 200 }} />
        <Select value={filterRole} onChange={e => setFilterRole(e.target.value)} style={{ width: 160 }}>
          <option value="">All Roles</option>
          <option value="admin">Admin</option>
          <option value="student">Student</option>
          <option value="employer">Employer</option>
          <option value="officer">Officer</option>
        </Select>
        <Button onClick={() => setShowAdd(true)} variant="primary" size="md">+ Add User</Button>
      </div>

      <div style={{ marginBottom: 12, fontSize: 13, color: 'var(--text-secondary)' }}>{filtered.length} users found</div>
      <Table columns={columns} data={filtered} emptyMessage="No users match your search" />

      <Modal open={showAdd} onClose={() => setShowAdd(false)} title="Add New User">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <Input label="Full Name" value={newUser.name} onChange={e => setNewUser(p => ({ ...p, name: e.target.value }))} />
          <Input label="Email" type="email" value={newUser.email} onChange={e => setNewUser(p => ({ ...p, email: e.target.value }))} />
          <Select label="Role" value={newUser.role} onChange={e => setNewUser(p => ({ ...p, role: e.target.value }))}>
            <option value="student">Student</option>
            <option value="employer">Employer</option>
            <option value="officer">Officer</option>
            <option value="admin">Admin</option>
          </Select>
          <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
            <Button variant="ghost" onClick={() => setShowAdd(false)}>Cancel</Button>
            <Button onClick={handleAdd}>Add User</Button>
          </div>
        </div>
      </Modal>
    </PageWrapper>
  )
}
