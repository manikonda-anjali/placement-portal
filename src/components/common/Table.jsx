import React from 'react'

export default function Table({ columns, data, emptyMessage = 'No data found' }) {
  return (
    <div style={{ overflowX: 'auto', borderRadius: 'var(--radius)', border: '1px solid var(--border)' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
        <thead>
          <tr style={{ background: 'var(--bg-elevated)' }}>
            {columns.map((col, i) => (
              <th key={i} style={{
                padding: '12px 16px', textAlign: 'left', color: 'var(--text-secondary)',
                fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 12,
                letterSpacing: '0.08em', textTransform: 'uppercase',
                borderBottom: '1px solid var(--border)', whiteSpace: 'nowrap'
              }}>
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {!data?.length ? (
            <tr>
              <td colSpan={columns.length} style={{ padding: '40px 20px', textAlign: 'center', color: 'var(--text-muted)' }}>
                {emptyMessage}
              </td>
            </tr>
          ) : data.map((row, ri) => (
            <tr key={ri}
              style={{ borderBottom: '1px solid var(--border)', transition: 'var(--transition)' }}
              onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-elevated)'}
              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
            >
              {columns.map((col, ci) => (
                <td key={ci} style={{ padding: '12px 16px', color: 'var(--text-primary)' }}>
                  {col.render ? col.render(row[col.key], row) : row[col.key] ?? '—'}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
