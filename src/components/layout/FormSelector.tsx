import { useTheme } from '../../context/ThemeContext'
import type { FormEntry, FormType } from '../../types'

export interface FormSelectorProps {
  forms: FormEntry[]
  active: FormType
  onChange: (type: FormType) => void
}

export function FormSelector({ forms, active, onChange }: FormSelectorProps) {
  const C = useTheme()

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, padding: '20px 28px 0' }}>
      {forms.map((form) => {
        const isActive = form.type === active
        return (
          <button
            key={form.id}
            type="button"
            onClick={() => onChange(form.type)}
            style={{
              padding: '10px 16px',
              borderRadius: 10,
              border: `1px solid ${isActive ? C.accent : C.border}`,
              background: isActive ? C.accentBg : C.panel,
              color: isActive ? C.accent : C.textDim,
              fontSize: 13.5,
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            {form.name}
          </button>
        )
      })}
    </div>
  )
}
