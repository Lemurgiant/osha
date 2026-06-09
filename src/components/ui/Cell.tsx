import { useTheme } from '../../context/ThemeContext'
import type { ColDef, RowData, RowStatus } from '../../types'
import { ScoreBadge } from './ScoreBadge'
import { StatusBadge } from './StatusBadge'

export interface CellProps {
  col: ColDef
  row: RowData
}

function isRowStatus(value: unknown): value is RowStatus {
  return value === 'complete' || value === 'open' || value === 'incomplete'
}

export function Cell({ col, row }: CellProps) {
  const C = useTheme()
  const value = row[col.k]

  if (col.k === 'status' && isRowStatus(value)) {
    return <StatusBadge status={value} />
  }

  if (col.k === 'score') {
    const score = typeof value === 'number' ? value : null
    return <ScoreBadge score={score} />
  }

  const display = value === null || value === undefined ? '—' : String(value)

  return <span style={{ color: C.text, fontSize: 13.5 }}>{display}</span>
}
