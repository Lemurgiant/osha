import { AlertOctagon, BarChart3, FileText, ListChecks, PenSquare } from 'lucide-react'
import { useTheme } from '../../context/ThemeContext'
import type { ViewTab } from '../../types'

export interface ViewSwitcherProps {
  active: ViewTab
  onChange: (tab: ViewTab) => void
}

const TABS: Array<{ id: ViewTab; label: string; icon: typeof ListChecks }> = [
  { id: 'submissions', label: 'Submissions', icon: ListChecks },
  { id: 'analytics', label: 'Analytics', icon: BarChart3 },
  { id: 'reports', label: 'Reports', icon: FileText },
  { id: 'alerts', label: 'Alerts', icon: AlertOctagon },
  { id: 'answer', label: 'Answer Form', icon: PenSquare },
]

export function ViewSwitcher({ active, onChange }: ViewSwitcherProps) {
  const C = useTheme()

  return (
    <div style={{
      display: 'flex',
      gap: 6,
      padding: '16px 28px 0',
      borderBottom: `1px solid ${C.border}`,
    }}>
      {TABS.map(({ id, label, icon: Icon }) => {
        const isActive = id === active
        return (
          <button
            key={id}
            type="button"
            onClick={() => onChange(id)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              padding: '10px 18px',
              borderRadius: '10px 10px 0 0',
              border: 'none',
              borderBottom: `2px solid ${isActive ? C.accent : 'transparent'}`,
              background: isActive ? C.accentBg : 'transparent',
              color: isActive ? C.accent : C.textDim,
              fontSize: 13.5,
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            <Icon size={16} />
            {label}
          </button>
        )
      })}
    </div>
  )
}
