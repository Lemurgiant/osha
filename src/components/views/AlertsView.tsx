import { AlertTriangle, CheckCircle2, Info, ShieldAlert } from 'lucide-react'
import { useTheme } from '../../context/ThemeContext'
import type { AlertEntry, AlertType } from '../../types'

export interface AlertsViewProps {
  alerts: AlertEntry[]
  formName: string
}

const ICONS: Record<AlertType, typeof AlertTriangle> = {
  danger: ShieldAlert,
  warning: AlertTriangle,
  success: CheckCircle2,
  info: Info,
}

const LABELS: Record<AlertType, string> = {
  danger: 'Critical',
  warning: 'Warning',
  success: 'Resolved',
  info: 'Info',
}

export function AlertsView({ alerts, formName }: AlertsViewProps) {
  const C = useTheme()

  const colorFor = (type: AlertType): { color: string; bg: string } => {
    switch (type) {
      case 'danger': return { color: C.danger, bg: C.dangerBg }
      case 'warning': return { color: C.warning, bg: C.warningBg }
      case 'success': return { color: C.success, bg: C.successBg }
      case 'info': return { color: C.info, bg: C.infoBg }
    }
  }

  return (
    <div style={{ padding: '20px 28px 32px' }}>
      <div style={{
        borderRadius: 12,
        border: `1px solid ${C.border}`,
        background: C.panel,
        padding: '20px 22px',
      }}>
        <div style={{ fontSize: 15, fontWeight: 700, color: C.text, marginBottom: 4 }}>Alert Timeline</div>
        <div style={{ fontSize: 12.5, color: C.textFaint, marginBottom: 18 }}>{formName} — recent compliance activity</div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {alerts.map((alert, idx) => {
            const { color, bg } = colorFor(alert.type)
            const Icon = ICONS[alert.type]
            const isLast = idx === alerts.length - 1
            return (
              <div key={alert.id} style={{ display: 'flex', gap: 16 }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 36,
                    height: 36,
                    borderRadius: '50%',
                    background: bg,
                    color,
                  }}>
                    <Icon size={17} />
                  </div>
                  {!isLast && <div style={{ flex: 1, width: 2, background: C.border, minHeight: 28, marginTop: 4 }} />}
                </div>
                <div style={{ paddingBottom: isLast ? 0 : 22, paddingTop: 4, flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
                    <span style={{
                      fontSize: 11,
                      fontWeight: 700,
                      letterSpacing: 0.4,
                      textTransform: 'uppercase',
                      color,
                      background: bg,
                      padding: '2px 8px',
                      borderRadius: 999,
                    }}>
                      {LABELS[alert.type]}
                    </span>
                    <span style={{ fontSize: 12, color: C.textFaint }}>{alert.time}</span>
                  </div>
                  <div style={{ fontSize: 14, color: C.text, lineHeight: 1.55 }}>{alert.msg}</div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
