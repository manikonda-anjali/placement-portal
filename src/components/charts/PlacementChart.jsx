import React from 'react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts'

const COLORS = ['#00d4ff', '#7c3aed', '#10b981', '#f59e0b', '#ec4899', '#f97316']

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null
  return (
    <div style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-bright)', borderRadius: 10, padding: '10px 14px', fontSize: 13 }}>
      <div style={{ color: 'var(--text-secondary)', marginBottom: 4 }}>{label}</div>
      <div style={{ color: '#00d4ff', fontWeight: 700, fontFamily: 'var(--font-display)' }}>{payload[0].value} students</div>
    </div>
  )
}

export default function PlacementChart({ data = [] }) {
  const chartData = data.length ? data : [
    { branch: 'CSE', placed: 87 }, { branch: 'ECE', placed: 65 }, { branch: 'MECH', placed: 42 },
    { branch: 'EEE', placed: 58 }, { branch: 'CIVIL', placed: 31 }, { branch: 'IT', placed: 79 }
  ]
  return (
    <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: 24 }}>
      <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 16, fontWeight: 700, marginBottom: 20, color: 'var(--text-primary)' }}>
        Branch-wise Placements
      </h3>
      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={chartData} barCategoryGap="30%">
          <XAxis dataKey="branch" tick={{ fill: '#8b9cbf', fontSize: 12 }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fill: '#8b9cbf', fontSize: 12 }} axisLine={false} tickLine={false} />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.03)' }} />
          <Bar dataKey="placed" radius={[6, 6, 0, 0]}>
            {chartData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
