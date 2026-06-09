import type { CSSProperties } from 'react'
import { useTheme } from '../../context/ThemeContext'

export interface PassFailProps {
  label: string
  value: 'pass' | 'fail' | null
  onChange: (value: 'pass' | 'fail') => void
}

export function PassFail({ label, value, onChange }: PassFailProps) {
  const C = useTheme()

  const btnStyle = (active: boolean, color: string, bg: string): CSSProperties => ({
    padding: '6px 16px',
    borderRadius: 8,
    border: `1px solid ${active ? color : C.border}`,
    background: active ? bg : 'transparent',
    color: active ? color : C.textDim,
    fontSize: 13,
    fontWeight: 600,
    cursor: 'pointer',
  })

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 16,
      padding: '12px 14px',
      borderRadius: 10,
      border: `1px solid ${C.border}`,
      background: C.panelAlt,
    }}>
      <span style={{ color: C.text, fontSize: 14 }}>{label}</span>
      <div style={{ display: 'flex', gap: 8, flexShrink: 0 }}>
        <button type="button" style={btnStyle(value === 'pass', C.success, C.successBg)} onClick={() => onChange('pass')}>
          Pass
        </button>
        <button type="button" style={btnStyle(value === 'fail', C.danger, C.dangerBg)} onClick={() => onChange('fail')}>
          Fail
        </button>
      </div>
    </div>
  )
}
