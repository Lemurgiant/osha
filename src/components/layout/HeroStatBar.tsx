import { CalendarCheck, ClipboardList, ShieldCheck } from 'lucide-react'
import { useTheme } from '../../context/ThemeContext'
import type { RowData } from '../../types'

export interface HeroStatBarProps {
  rows: RowData[]
  baseRows: RowData[]
}

const LAST_INCIDENT_DATE = new Date('2026-03-15T00:00:00Z')

function daysSince(date: Date): number {
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  return Math.max(0, Math.floor(diffMs / (1000 * 60 * 60 * 24)))
}

function countOpen(rows: RowData[]): number {
  return rows.filter((row) => row.status === 'open').length
}

function averageScore(rows: RowData[]): number | null {
  const scored = rows.filter((row): row is RowData & { score: number } => typeof row.score === 'number')
  if (scored.length === 0) return null
  const total = scored.reduce((sum, row) => sum + row.score, 0)
  return Math.round(total / scored.length)
}

interface StatCardProps {
  icon: typeof CalendarCheck
  label: string
  value: string
  accentColor: string
  accentBg: string
}

function StatCard({ icon: Icon, label, value, accentColor, accentBg }: StatCardProps) {
  const C = useTheme()

  return (
    <div style={{
      flex: 1,
      display: 'flex',
      alignItems: 'center',
      gap: 14,
      padding: '18px 20px',
      borderRadius: 12,
      border: `1px solid ${C.border}`,
      background: C.panel,
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 44,
        height: 44,
        borderRadius: 10,
        background: accentBg,
        color: accentColor,
        flexShrink: 0,
      }}>
        <Icon size={22} />
      </div>
      <div>
        <div style={{ fontSize: 22, fontWeight: 700, color: C.text, letterSpacing: -0.4 }}>{value}</div>
        <div style={{ fontSize: 12.5, color: C.textFaint, marginTop: 2 }}>{label}</div>
      </div>
    </div>
  )
}

export function HeroStatBar({ rows, baseRows }: HeroStatBarProps) {
  const C = useTheme()

  const days = daysSince(LAST_INCIDENT_DATE)
  const openCount = countOpen(rows)
  const avgScore = averageScore(baseRows)

  return (
    <div style={{ display: 'flex', gap: 16, padding: '20px 28px 0' }}>
      <StatCard
        icon={CalendarCheck}
        label="Days Without Recordable Injury"
        value={String(days)}
        accentColor={C.success}
        accentBg={C.successBg}
      />
      <StatCard
        icon={ClipboardList}
        label="Open Incidents"
        value={String(openCount)}
        accentColor={openCount > 0 ? C.danger : C.success}
        accentBg={openCount > 0 ? C.dangerBg : C.successBg}
      />
      <StatCard
        icon={ShieldCheck}
        label="Inspection Compliance Rate"
        value={avgScore === null ? '—' : `${avgScore}%`}
        accentColor={C.accent}
        accentBg={C.accentBg}
      />
    </div>
  )
}
