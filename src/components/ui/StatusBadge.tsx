import { useTheme } from '../../context/ThemeContext'
import type { RowStatus } from '../../types'

export interface StatusBadgeProps {
  status: RowStatus
}

const LABELS: Record<RowStatus, string> = {
  complete: 'Complete',
  open: 'Open',
  incomplete: 'Incomplete',
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const C = useTheme()

  const color = status === 'complete' ? C.success : status === 'open' ? C.danger : C.warning
  const bg = status === 'complete' ? C.successBg : status === 'open' ? C.dangerBg : C.warningBg

  return (
    <span style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      padding: '3px 10px',
      borderRadius: 999,
      fontSize: 12,
      fontWeight: 600,
      color,
      background: bg,
    }}>
      <span style={{ width: 6, height: 6, borderRadius: '50%', background: color }} />
      {LABELS[status]}
    </span>
  )
}
