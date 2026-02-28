import React from 'react'
import PageWrapper from '../../components/layout/PageWrapper'
import PlacementChart from '../../components/charts/PlacementChart'
import TrendGraph from '../../components/charts/TrendGraph'
import Button from '../../components/common/Button'
import { exportCSV } from '../../utils/exportCSV'
import { useAppContext } from '../../context/AppContext'

const REPORT_DATA = [
  { branch: 'CSE', registered: 120, applied: 108, placed: 87, rate: '72.5%', avgCTC: '9.2 LPA' },
  { branch: 'ECE', registered: 98, applied: 80, placed: 65, rate: '66.3%', avgCTC: '7.8 LPA' },
  { branch: 'MECH', registered: 85, applied: 55, placed: 42, rate: '49.4%', avgCTC: '6.2 LPA' },
  { branch: 'EEE', registered: 76, applied: 68, placed: 58, rate: '76.3%', avgCTC: '7.5 LPA' },
  { branch: 'IT', registered: 110, applied: 98, placed: 79, rate: '71.8%', avgCTC: '8.9 LPA' },
]

export default function SystemReports() {
  const { addNotification } = useAppContext()
  const handleExport = () => { exportCSV(REPORT_DATA, 'placement_report.csv'); addNotification('Report exported!', 'success') }

  return (
    <PageWrapper title="System Reports">
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 20, gap: 10 }}>
        <Button variant="ghost" onClick={handleExport}>📥 Export CSV</Button>
        <Button variant="secondary" onClick={() => window.print()}>🖨️ Print Report</Button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 24 }}>
        <PlacementChart />
        <TrendGraph />
      </div>

      <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: 24 }}>
        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 16, fontWeight: 700, marginBottom: 20 }}>Branch-wise Summary</h3>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
            <thead>
              <tr style={{ background: 'var(--bg-elevated)' }}>
                {['Branch','Registered','Applied','Placed','Rate','Avg CTC'].map(h => (
                  <th key={h} style={{ padding: '12px 16px', textAlign: 'left', color: 'var(--text-secondary)', fontSize: 12, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', borderBottom: '1px solid var(--border)' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {REPORT_DATA.map((row, i) => (
                <tr key={i} style={{ borderBottom: '1px solid var(--border)' }}>
                  <td style={{ padding: '12px 16px', fontWeight: 700, color: 'var(--accent-cyan)' }}>{row.branch}</td>
                  <td style={{ padding: '12px 16px' }}>{row.registered}</td>
                  <td style={{ padding: '12px 16px' }}>{row.applied}</td>
                  <td style={{ padding: '12px 16px', color: '#10b981', fontWeight: 600 }}>{row.placed}</td>
                  <td style={{ padding: '12px 16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <div style={{ flex: 1, height: 4, background: 'var(--bg-elevated)', borderRadius: 2, maxWidth: 80 }}>
                        <div style={{ height: '100%', width: row.rate, background: '#10b981', borderRadius: 2 }} />
                      </div>
                      <span style={{ fontSize: 12, color: '#10b981', fontWeight: 600 }}>{row.rate}</span>
                    </div>
                  </td>
                  <td style={{ padding: '12px 16px', color: '#f59e0b', fontWeight: 600 }}>{row.avgCTC}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </PageWrapper>
  )
}
