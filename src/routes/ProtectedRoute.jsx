import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import { ROLE_HOME } from '../utils/rolePermissions'

export default function ProtectedRoute({ children, allowedRoles }) {
  const { user, loading } = useAuth()
  const location = useLocation()

  if (loading) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-primary)' }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ width: 48, height: 48, border: '3px solid var(--border)', borderTopColor: 'var(--accent-cyan)', borderRadius: '50%', animation: 'spin 0.8s linear infinite', margin: '0 auto 16px' }} />
        <div style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-display)' }}>Loading...</div>
      </div>
    </div>
  )

  if (!user) return <Navigate to="/login" state={{ from: location }} replace />

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to={ROLE_HOME[user.role] || '/login'} replace />
  }

  return children
}
