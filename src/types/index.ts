// Shared types and interfaces for the SafeOps platform.

export type Theme = 'dark' | 'light'

export interface ColorTokens {
  bg: string
  bgAlt: string
  panel: string
  panelAlt: string
  border: string
  text: string
  textDim: string
  textFaint: string
  accent: string
  accentDim: string
  accentBg: string
  danger: string
  dangerBg: string
  warning: string
  warningBg: string
  success: string
  successBg: string
  info: string
  infoBg: string
}

export type FormType = 'daily' | 'incident' | 'toolbox' | 'equipment' | 'hazard'

export interface FormEntry {
  id: string
  name: string
  type: FormType
}

export type ViewTab = 'submissions' | 'analytics' | 'reports' | 'alerts' | 'answer'

export interface ColDef {
  k: string
  l: string
  w: number
}

export type RowStatus = 'complete' | 'open' | 'incomplete'

export interface RowData {
  [key: string]: unknown
  id: string | number
  status: RowStatus
  score: number | null
  date: string
}

export interface SubmittedRow extends RowData {
  [key: string]: unknown
}

export interface WeekPoint {
  wk: string
  subs: number
  score: number
}

export type AlertType = 'danger' | 'warning' | 'success' | 'info'

export interface AlertEntry {
  id: number
  type: AlertType
  msg: string
  time: string
}

export type FieldType = 'text' | 'select' | 'textarea'

export interface FieldDef {
  k: string
  l: string
  type: FieldType
  req: boolean
  ph?: string
  opts?: string[]
}

export interface CheckDef {
  k: string
  l: string
}

export type CheckType = 'passfail' | 'boolean' | null

export interface FormSchema {
  info: string
  sectionA: string
  sectionB: string | null
  fields: FieldDef[]
  checks: CheckDef[]
  checkType: CheckType
}

export interface ReportEntry {
  text: string
  timestamp: string
  formName: string
}
