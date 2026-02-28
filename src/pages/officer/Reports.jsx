import React from 'react'
import PageWrapper from '../../components/layout/PageWrapper'
import PlacementChart from '../../components/charts/PlacementChart'
import TrendGraph from '../../components/charts/TrendGraph'
import Button from '../../components/common/Button'
import { exportCSV } from '../../utils/exportCSV'
import { useAppContext } from '../../context/AppContext'
import StatCard from '../../components/charts/StatCard'

const COMPANY_DATA = [
  { company: 'Google', hired: 12, avgCTC: '28 LPA', type: 'Product' },
  { company: 'Microsoft', hired: 8, avgCTC: '32 LPA', type: 'Product' },
  { company: 'Amazon', hired: 15, avgCTC: '24 LPA', type: 'Product' },
  { company: 'TCS', hired: 120, avgCTC: '7 LPA', type: 'Service' },
  { company: 'Infosys', hired: 95, avgCTC: '6.5 LPA', type: 'Service' },
  { company: 'Wipro', hired: 78, avgCTC: '6 LPA', type: 'Service' },
]

export default function Reports() {
  const { addNotification } = useAppContext()
  const handleExport = () => { exportCSV(COMPANY_DATA, 'placement_report_officer.csv'); addNotification('Exported!', 'success') }

  return (
    <PageWrapper title="Placement Reports">
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, marginBottom: 20 }}>
        <Button variant="ghost" onClick={handleExport}>📥 Export CSV</Button>
        <Button variant="secondary">📄 Generate PDF</Button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 24 }}>
        <StatCard label="Total Registered" value="1,248" icon="🎓" color="#00d4ff" delay={1} />
        <StatCard label="Total Placed" value="623" icon="✅" color="#10b981" delay={2} />
        <StatCard label="Placement Rate" value="72.3%" icon="📈" color="#f59e0b" delay={3} />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 24 }}>
        <PlacementChart />
        <TrendGraph />
      </div>

      <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: 24 }}>
        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 16, fontWeight: 700, marginBottom: 20 }}>Top Recruiters</h3>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
            <thead>
              <tr style={{ background: 'var(--bg-elevated)' }}>
                {['Company', 'Students Hired', 'Avg CTC', 'Type'].map(h => (
                  <th key={h} style={{ padding: '12px 16px', textAlign: 'left', color: 'var(--text-secondary)', fontSize: 12, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', borderBottom: '1px solid var(--border)' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {COMPANY_DATA.map((row, i) => (
                <tr key={i} style={{ borderBottom: '1px solid var(--border)' }}>
                  <td style={{ padding: '12px 16px', fontWeight: 700, color: 'var(--accent-cyan)' }}>{row.company}</td>
                  <td style={{ padding: '12px 16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div style={{ flex: 1, maxWidth: 100, height: 4, background: 'var(--bg-elevated)', borderRadius: 2 }}>
                        <div style={{ height: '100%', width: `${(row.hired / 120) * 100}%`, background: '#00d4ff', borderRadius: 2 }} />
                      </div>
                      <span style={{ fontWeight: 600 }}>{row.hired}</span>
                    </div>
                  </td>
                  <td style={{ padding: '12px 16px', color: '#10b981', fontWeight: 600 }}>{row.avgCTC}</td>
                  <td style={{ padding: '12px 16px' }}>
                    <span style={{ background: row.type === 'Product' ? 'rgba(124,58,237,0.12)' : 'rgba(0,212,255,0.12)', color: row.type === 'Product' ? '#7c3aed' : '#00d4ff', border: `1px solid ${row.type === 'Product' ? '#7c3aed33' : '#00d4ff33'}`, borderRadius: 20, padding: '3px 10px', fontSize: 11, fontWeight: 600 }}>
                      {row.type}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </PageWrapper>
  )
}
