import { CheckCircle2 } from 'lucide-react'
import { useTheme } from '../../context/ThemeContext'

export interface SuccessViewProps {
  formName: string
  rowId: string | number
  score: number | null
  onSubmitAnother: () => void
}

export function SuccessView({ formName, rowId, score, onSubmitAnother }: SuccessViewProps) {
  const C = useTheme()

  return (
    <div style={{ padding: '60px 28px', display: 'flex', justifyContent: 'center' }}>
      <div style={{
        maxWidth: 460,
        width: '100%',
        textAlign: 'center',
        padding: '40px 32px',
        borderRadius: 16,
        border: `1px solid ${C.border}`,
        background: C.panel,
      }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: 64,
          height: 64,
          borderRadius: '50%',
          background: C.successBg,
          color: C.success,
          marginBottom: 18,
        }}>
          <CheckCircle2 size={32} />
        </div>
        <div style={{ fontSize: 19, fontWeight: 700, color: C.text, marginBottom: 6 }}>Submission Received</div>
        <div style={{ fontSize: 14, color: C.textDim, lineHeight: 1.6, marginBottom: 18 }}>
          Your {formName.toLowerCase()} (<strong style={{ color: C.text }}>{String(rowId)}</strong>) has been recorded
          {score !== null ? <> with a score of <strong style={{ color: C.text }}>{score}%</strong></> : null} and now
          appears in the Submissions tab.
        </div>
        <button
          type="button"
          onClick={onSubmitAnother}
          style={{
            padding: '11px 22px',
            borderRadius: 8,
            border: 'none',
            background: C.accent,
            color: '#1a0f04',
            fontSize: 13.5,
            fontWeight: 700,
            cursor: 'pointer',
          }}
        >
          Submit Another
        </button>
      </div>
    </div>
  )
}
