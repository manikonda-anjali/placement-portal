import React, { createContext, useContext, useState, useCallback } from 'react'

const AppContext = createContext(null)

export function AppProvider({ children }) {
  const [notifications, setNotifications] = useState([])
  const [globalLoading, setGlobalLoading] = useState(false)

  const addNotification = useCallback((message, type = 'info') => {
    const id = Date.now()
    setNotifications(prev => [...prev, { id, message, type }])
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id))
    }, 4000)
  }, [])

  const removeNotification = useCallback((id) => {
    setNotifications(prev => prev.filter(n => n.id !== id))
  }, [])

  return (
    <AppContext.Provider value={{ notifications, addNotification, removeNotification, globalLoading, setGlobalLoading }}>
      {children}
      <NotificationToaster notifications={notifications} onRemove={removeNotification} />
    </AppContext.Provider>
  )
}

function NotificationToaster({ notifications, onRemove }) {
  if (!notifications.length) return null
  const colors = { success: '#10b981', error: '#ef4444', warning: '#f59e0b', info: '#00d4ff' }
  return (
    <div style={{ position: 'fixed', top: 20, right: 20, zIndex: 9999, display: 'flex', flexDirection: 'column', gap: 10 }}>
      {notifications.map(n => (
        <div key={n.id} onClick={() => onRemove(n.id)} style={{
          background: 'var(--bg-elevated)',
          border: `1px solid ${colors[n.type]}`,
          borderLeft: `4px solid ${colors[n.type]}`,
          color: 'var(--text-primary)',
          padding: '12px 18px',
          borderRadius: 'var(--radius)',
          cursor: 'pointer',
          animation: 'fadeInUp 0.3s ease',
          minWidth: 280,
          fontFamily: 'var(--font-body)',
          boxShadow: `0 4px 20px rgba(0,0,0,0.4)`
        }}>
          {n.message}
        </div>
      ))}
    </div>
  )
}

export const useAppContext = () => useContext(AppContext)
