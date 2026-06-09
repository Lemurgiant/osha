import { useTheme } from '../../context/ThemeContext'
import type { ColDef, RowData } from '../../types'
import { Cell } from '../ui/Cell'

export interface SubmissionsViewProps {
  rows: RowData[]
  cols: ColDef[]
  formName: string
}

export function SubmissionsView({ rows, cols, formName }: SubmissionsViewProps) {
  const C = useTheme()

  const completeCount = rows.filter((r) => r.status === 'complete').length
  const openCount = rows.filter((r) => r.status === 'open').length
  const incompleteCount = rows.filter((r) => r.status === 'incomplete').length

  return (
    <div style={{ padding: '20px 28px 32px', display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', gap: 12 }}>
        <StatPill label="Total Submissions" value={rows.length} color={C.accent} />
        <StatPill label="Complete" value={completeCount} color={C.success} />
        <StatPill label="Open" value={openCount} color={C.danger} />
        <StatPill label="Incomplete" value={incompleteCount} color={C.warning} />
      </div>

      <div style={{
        border: `1px solid ${C.border}`,
        borderRadius: 12,
        overflow: 'hidden',
        background: C.panel,
      }}>
        <div style={{ padding: '14px 18px', borderBottom: `1px solid ${C.border}` }}>
          <span style={{ fontSize: 14.5, fontWeight: 700, color: C.text }}>{formName} — Submissions</span>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                {cols.map((col) => (
                  <th
                    key={col.k}
                    style={{
                      textAlign: 'left',
                      padding: '10px 18px',
                      minWidth: col.w,
                      fontSize: 11.5,
                      fontWeight: 700,
                      letterSpacing: 0.4,
                      textTransform: 'uppercase',
                      color: C.textFaint,
                      borderBottom: `1px solid ${C.border}`,
                      background: C.panelAlt,
                    }}
                  >
                    {col.l}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={String(row.id)}>
                  {cols.map((col) => (
                    <td
                      key={col.k}
                      style={{
                        padding: '12px 18px',
                        borderBottom: `1px solid ${C.border}`,
                        whiteSpace: 'nowrap',
                      }}
                    >
                      <Cell col={col} row={row} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

interface StatPillProps {
  label: string
  value: number
  color: string
}

function StatPill({ label, value, color }: StatPillProps) {
  const C = useTheme()
  return (
    <div style={{
      flex: 1,
      padding: '14px 18px',
      borderRadius: 10,
      border: `1px solid ${C.border}`,
      background: C.panel,
    }}>
      <div style={{ fontSize: 20, fontWeight: 700, color }}>{value}</div>
      <div style={{ fontSize: 12, color: C.textFaint, marginTop: 2 }}>
        <span style={{
          display: 'inline-block',
          width: 6,
          height: 6,
          borderRadius: '50%',
          background: color,
          marginRight: 6,
        }} />
        {label}
      </div>
    </div>
  )
}
