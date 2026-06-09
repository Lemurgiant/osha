import { useTheme } from '../../context/ThemeContext'

export interface ScoreBadgeProps {
  score: number | null
}

export function ScoreBadge({ score }: ScoreBadgeProps) {
  const C = useTheme()

  if (score === null) {
    return (
      <span style={{ color: C.textFaint, fontSize: 13 }}>—</span>
    )
  }

  const color = score >= 90 ? C.success : score >= 80 ? C.accent : C.danger
  const bg = score >= 90 ? C.successBg : score >= 80 ? C.accentBg : C.dangerBg

  return (
    <span style={{
      display: 'inline-block',
      padding: '3px 10px',
      borderRadius: 999,
      fontSize: 13,
      fontWeight: 600,
      color,
      background: bg,
    }}>
      {score}%
    </span>
  )
}
