import { AlertTriangle, ShieldAlert } from 'lucide-react'
import { useTheme } from '../../context/ThemeContext'

export interface WarningBannerProps {
  level: 'critical' | 'high'
  message: string
}

export function WarningBanner({ level, message }: WarningBannerProps) {
  const C = useTheme()
  const color = level === 'critical' ? C.danger : C.warning
  const bg = level === 'critical' ? C.dangerBg : C.warningBg
  const Icon = level === 'critical' ? ShieldAlert : AlertTriangle

  return (
    <div style={{
      display: 'flex',
      alignItems: 'flex-start',
      gap: 12,
      padding: '14px 16px',
      borderRadius: 10,
      border: `1px solid ${color}`,
      background: bg,
      color,
    }}>
      <Icon size={20} style={{ flexShrink: 0, marginTop: 1 }} />
      <span style={{ fontSize: 14, lineHeight: 1.5, fontWeight: 500 }}>{message}</span>
    </div>
  )
}
