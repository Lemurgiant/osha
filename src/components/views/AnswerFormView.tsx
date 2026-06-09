import { useState, type CSSProperties, type ReactNode } from 'react'
import { useTheme } from '../../context/ThemeContext'
import type { CheckDef, FieldDef, FormSchema, FormType, RowStatus, SubmittedRow } from '../../types'
import { PassFail } from '../ui/PassFail'
import { WarningBanner } from '../ui/WarningBanner'
import { SuccessView } from './SuccessView'

export interface AnswerFormViewProps {
  schema: FormSchema
  formType: FormType
  formName: string
  onAddRow: (row: SubmittedRow) => void
}

type PassFailValue = 'pass' | 'fail' | null

interface SubmittedInfo {
  rowId: string | number
  score: number | null
}

interface BannerInfo {
  level: 'critical' | 'high'
  message: string
}

const ID_PREFIX: Record<FormType, string> = {
  daily: 'DSI',
  incident: 'INC',
  toolbox: 'TBX',
  equipment: 'EQI',
  hazard: 'HZA',
}

function generateId(type: FormType): string {
  const suffix = Math.floor(1000 + Math.random() * 9000)
  return `${ID_PREFIX[type]}-${suffix}`
}

function todayIso(): string {
  return new Date().toISOString().slice(0, 10)
}

function emptyFieldValues(fields: FieldDef[]): Record<string, string> {
  const init: Record<string, string> = {}
  for (const field of fields) init[field.k] = ''
  return init
}

function emptyPassFailValues(checks: CheckDef[]): Record<string, PassFailValue> {
  const init: Record<string, PassFailValue> = {}
  for (const check of checks) init[check.k] = null
  return init
}

function emptyBoolValues(checks: CheckDef[]): Record<string, boolean> {
  const init: Record<string, boolean> = {}
  for (const check of checks) init[check.k] = false
  return init
}

function computePassFailScore(values: Record<string, PassFailValue>, checks: CheckDef[]): number {
  if (checks.length === 0) return 0
  const passCount = checks.filter((c) => values[c.k] === 'pass').length
  return Math.round((passCount / checks.length) * 100)
}

function computeBoolScore(values: Record<string, boolean>, checks: CheckDef[]): number {
  if (checks.length === 0) return 0
  const trueCount = checks.filter((c) => values[c.k]).length
  return Math.round((trueCount / checks.length) * 100)
}

function isFormComplete(schema: FormSchema, fieldValues: Record<string, string>, passFailValues: Record<string, PassFailValue>): boolean {
  const fieldsFilled = schema.fields.every((f) => !f.req || fieldValues[f.k].trim().length > 0)
  if (schema.checkType === 'passfail') {
    return fieldsFilled && schema.checks.every((c) => passFailValues[c.k] !== null)
  }
  return fieldsFilled
}

function getBanner(formType: FormType, fieldValues: Record<string, string>): BannerInfo | null {
  if (formType === 'incident') {
    if (fieldValues.severity === 'Critical' || fieldValues.classification === 'OSHA Recordable') {
      return {
        level: 'critical',
        message: 'This report will be classified as an OSHA Recordable incident. It will be flagged open and routed for formal investigation and sign-off.',
      }
    }
  }
  if (formType === 'hazard') {
    if (fieldValues.risk === 'High') {
      return {
        level: 'high',
        message: 'High residual risk identified. This assessment will be flagged open until additional controls are verified and the risk is reduced.',
      }
    }
  }
  return null
}

function deriveStatus(formType: FormType, fieldValues: Record<string, string>, score: number | null): RowStatus {
  if (formType === 'incident') {
    return fieldValues.severity === 'Critical' || fieldValues.classification === 'OSHA Recordable' ? 'open' : 'complete'
  }
  if (formType === 'hazard') {
    return fieldValues.risk === 'High' ? 'open' : 'complete'
  }
  if (score !== null && score < 80) return 'open'
  return 'complete'
}

function buildRow(formType: FormType, schema: FormSchema, fieldValues: Record<string, string>, score: number | null): SubmittedRow {
  const row: SubmittedRow = {
    id: generateId(formType),
    date: todayIso(),
    status: deriveStatus(formType, fieldValues, score),
    score,
  }
  for (const field of schema.fields) {
    const raw = fieldValues[field.k]
    row[field.k] = field.k === 'attendees' ? Number(raw) || 0 : raw
  }
  return row
}

export function AnswerFormView({ schema, formType, formName, onAddRow }: AnswerFormViewProps) {
  const C = useTheme()

  const [fieldValues, setFieldValues] = useState<Record<string, string>>(() => emptyFieldValues(schema.fields))
  const [passFailValues, setPassFailValues] = useState<Record<string, PassFailValue>>(() => emptyPassFailValues(schema.checks))
  const [boolValues, setBoolValues] = useState<Record<string, boolean>>(() => emptyBoolValues(schema.checks))
  const [submitted, setSubmitted] = useState<SubmittedInfo | null>(null)

  const updateField = (key: string, value: string) => {
    setFieldValues((prev) => ({ ...prev, [key]: value }))
  }

  const togglePassFail = (key: string, value: 'pass' | 'fail') => {
    setPassFailValues((prev) => ({ ...prev, [key]: value }))
  }

  const toggleBool = (key: string) => {
    setBoolValues((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  const resetForm = () => {
    setFieldValues(emptyFieldValues(schema.fields))
    setPassFailValues(emptyPassFailValues(schema.checks))
    setBoolValues(emptyBoolValues(schema.checks))
    setSubmitted(null)
  }

  const handleSubmit = () => {
    let score: number | null = null
    if (schema.checkType === 'passfail') score = computePassFailScore(passFailValues, schema.checks)
    else if (schema.checkType === 'boolean') score = computeBoolScore(boolValues, schema.checks)

    const row = buildRow(formType, schema, fieldValues, score)
    onAddRow(row)
    setSubmitted({ rowId: row.id, score: row.score })
  }

  if (submitted) {
    return (
      <SuccessView
        formName={formName}
        rowId={submitted.rowId}
        score={submitted.score}
        onSubmitAnother={resetForm}
      />
    )
  }

  const banner = getBanner(formType, fieldValues)
  const complete = isFormComplete(schema, fieldValues, passFailValues)
  const passFailScore = computePassFailScore(passFailValues, schema.checks)
  const passCount = schema.checks.filter((c) => passFailValues[c.k] === 'pass').length
  const boolCount = schema.checks.filter((c) => boolValues[c.k]).length

  return (
    <div style={{ padding: '20px 28px 40px', display: 'flex', justifyContent: 'center' }}>
      <div style={{ maxWidth: 720, width: '100%', display: 'flex', flexDirection: 'column', gap: 18 }}>
        <div style={{
          padding: '16px 20px',
          borderRadius: 12,
          border: `1px solid ${C.border}`,
          background: C.panelAlt,
        }}>
          <div style={{ fontSize: 16, fontWeight: 700, color: C.text, marginBottom: 6 }}>{formName}</div>
          <div style={{ fontSize: 13, color: C.textDim, lineHeight: 1.6 }}>{schema.info}</div>
        </div>

        {banner && <WarningBanner level={banner.level} message={banner.message} />}

        <FormSection title={schema.sectionA}>
          {schema.fields.map((field) => (
            <FieldInput
              key={field.k}
              field={field}
              value={fieldValues[field.k]}
              onChange={(value) => updateField(field.k, value)}
            />
          ))}
        </FormSection>

        {schema.checkType === 'passfail' && (
          <FormSection
            title={schema.sectionB ?? 'Checklist'}
            trailing={<LiveScore label="Pass Rate" value={`${passFailScore}% (${passCount}/${schema.checks.length})`} />}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {schema.checks.map((check) => (
                <PassFail
                  key={check.k}
                  label={check.l}
                  value={passFailValues[check.k]}
                  onChange={(value) => togglePassFail(check.k, value)}
                />
              ))}
            </div>
          </FormSection>
        )}

        {schema.checkType === 'boolean' && (
          <FormSection
            title={schema.sectionB ?? 'Requirements'}
            trailing={<LiveScore label="Completed" value={`${boolCount}/${schema.checks.length}`} />}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {schema.checks.map((check) => (
                <BoolCheck
                  key={check.k}
                  label={check.l}
                  checked={boolValues[check.k]}
                  onToggle={() => toggleBool(check.k)}
                />
              ))}
            </div>
          </FormSection>
        )}

        <button
          type="button"
          disabled={!complete}
          onClick={handleSubmit}
          style={{
            padding: '13px 20px',
            borderRadius: 10,
            border: 'none',
            background: complete ? C.accent : C.border,
            color: complete ? '#1a0f04' : C.textFaint,
            fontSize: 14.5,
            fontWeight: 700,
            cursor: complete ? 'pointer' : 'default',
          }}
        >
          Submit {formName}
        </button>
      </div>
    </div>
  )
}

interface FormSectionProps {
  title: string
  trailing?: ReactNode
  children: ReactNode
}

function FormSection({ title, trailing, children }: FormSectionProps) {
  const C = useTheme()
  return (
    <div style={{
      padding: '18px 20px',
      borderRadius: 12,
      border: `1px solid ${C.border}`,
      background: C.panel,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
        <span style={{ fontSize: 14, fontWeight: 700, color: C.text }}>{title}</span>
        {trailing}
      </div>
      {children}
    </div>
  )
}

interface LiveScoreProps {
  label: string
  value: string
}

function LiveScore({ label, value }: LiveScoreProps) {
  const C = useTheme()
  return (
    <span style={{
      fontSize: 12.5,
      fontWeight: 700,
      color: C.accent,
      background: C.accentBg,
      padding: '4px 12px',
      borderRadius: 999,
    }}>
      {label}: {value}
    </span>
  )
}

interface FieldInputProps {
  field: FieldDef
  value: string
  onChange: (value: string) => void
}

function FieldInput({ field, value, onChange }: FieldInputProps) {
  const C = useTheme()

  const baseStyle: CSSProperties = {
    width: '100%',
    padding: '10px 12px',
    borderRadius: 8,
    border: `1px solid ${C.border}`,
    background: C.bgAlt,
    color: C.text,
    fontSize: 13.5,
    fontFamily: 'inherit',
  }

  return (
    <label style={{ display: 'block', marginBottom: 14 }}>
      <span style={{ display: 'block', fontSize: 12.5, fontWeight: 600, color: C.textDim, marginBottom: 6 }}>
        {field.l}
        {field.req && <span style={{ color: C.danger }}> *</span>}
      </span>
      {field.type === 'select' ? (
        <select style={baseStyle} value={value} onChange={(e) => onChange(e.target.value)}>
          <option value="">Select…</option>
          {(field.opts ?? []).map((opt) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
      ) : field.type === 'textarea' ? (
        <textarea
          style={{ ...baseStyle, minHeight: 90, resize: 'vertical' }}
          value={value}
          placeholder={field.ph}
          onChange={(e) => onChange(e.target.value)}
        />
      ) : (
        <input
          type="text"
          style={baseStyle}
          value={value}
          placeholder={field.ph}
          onChange={(e) => onChange(e.target.value)}
        />
      )}
    </label>
  )
}

interface BoolCheckProps {
  label: string
  checked: boolean
  onToggle: () => void
}

function BoolCheck({ label, checked, onToggle }: BoolCheckProps) {
  const C = useTheme()
  return (
    <label style={{
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      padding: '12px 14px',
      borderRadius: 10,
      border: `1px solid ${checked ? C.accent : C.border}`,
      background: checked ? C.accentBg : C.panelAlt,
      cursor: 'pointer',
    }}>
      <input type="checkbox" checked={checked} onChange={onToggle} style={{ width: 16, height: 16, accentColor: C.accent }} />
      <span style={{ fontSize: 14, color: C.text }}>{label}</span>
    </label>
  )
}
