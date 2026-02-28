import React from 'react'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Area, AreaChart } from 'recharts'

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null
  return (
    <div style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-bright)', borderRadius: 10, padding: '10px 14px', fontSize: 13 }}>
      <div style={{ color: 'var(--text-secondary)', marginBottom: 4 }}>{label}</div>
      {payload.map((p, i) => (
        <div key={i} style={{ color: p.color, fontWeight: 700, fontFamily: 'var(--font-display)' }}>{p.name}: {p.value}</div>
      ))}
    </div>
  )
}

const defaultData = [
  { month: 'Aug', placements: 12, applications: 45 },
  { month: 'Sep', placements: 28, applications: 89 },
  { month: 'Oct', placements: 45, applications: 134 },
  { month: 'Nov', placements: 67, applications: 201 },
  { month: 'Dec', placements: 89, applications: 267 },
  { month: 'Jan', placements: 134, applications: 389 },
]

export default function TrendGraph({ data }) {
  const chartData = data || defaultData
  return (
    <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: 24 }}>
      <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 16, fontWeight: 700, marginBottom: 4 }}>Placement Trend</h3>
      <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 20 }}>Monthly applications vs placements</p>
      <ResponsiveContainer width="100%" height={220}>
        <AreaChart data={chartData}>
          <defs>
            <linearGradient id="colorPlaced" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#00d4ff" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#00d4ff" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorApps" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#7c3aed" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#7c3aed" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
          <XAxis dataKey="month" tick={{ fill: '#8b9cbf', fontSize: 12 }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fill: '#8b9cbf', fontSize: 12 }} axisLine={false} tickLine={false} />
          <Tooltip content={<CustomTooltip />} />
          <Area type="monotone" dataKey="applications" stroke="#7c3aed" strokeWidth={2} fill="url(#colorApps)" name="Applications" dot={false} />
          <Area type="monotone" dataKey="placements" stroke="#00d4ff" strokeWidth={2} fill="url(#colorPlaced)" name="Placements" dot={false} />
        </AreaChart>
      </ResponsiveContainer>
      <div style={{ display: 'flex', gap: 20, marginTop: 12 }}>
        {[{ color: '#00d4ff', label: 'Placements' }, { color: '#7c3aed', label: 'Applications' }].map(l => (
          <div key={l.label} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: 'var(--text-secondary)' }}>
            <span style={{ width: 12, height: 3, background: l.color, borderRadius: 2, display: 'inline-block' }} />
            {l.label}
          </div>
        ))}
      </div>
    </div>
  )
}
