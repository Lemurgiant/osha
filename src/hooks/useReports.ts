import { useCallback, useEffect, useState } from 'react'
import type { FormType, ReportEntry, RowData, WeekPoint } from '../types'
import { BASE_ROWS } from '../data/rows'
import { WEEKLY } from '../data/weekly'
import { FORMS } from '../data/forms'

const STORAGE_KEY = 'safeops.reports'

type ReportsState = Record<FormType, ReportEntry[]>

const EMPTY_REPORTS: ReportsState = {
  daily: [],
  incident: [],
  toolbox: [],
  equipment: [],
  hazard: [],
}

const FORM_TYPES: FormType[] = ['daily', 'incident', 'toolbox', 'equipment', 'hazard']

function isFormType(value: unknown): value is FormType {
  return typeof value === 'string' && (FORM_TYPES as string[]).includes(value)
}

function isReportEntry(value: unknown): value is ReportEntry {
  if (typeof value !== 'object' || value === null) return false
  const v = value as Record<string, unknown>
  return typeof v.text === 'string' && typeof v.timestamp === 'string' && typeof v.formName === 'string'
}

function parseStoredReports(raw: unknown): ReportsState {
  const next: ReportsState = { daily: [], incident: [], toolbox: [], equipment: [], hazard: [] }
  if (typeof raw !== 'object' || raw === null) return next

  for (const [key, value] of Object.entries(raw as Record<string, unknown>)) {
    if (!isFormType(key) || !Array.isArray(value)) continue
    next[key] = value.filter(isReportEntry)
  }
  return next
}

function buildPrompt(formName: string, rows: RowData[], weekly: WeekPoint[]): string {
  const recent = rows.slice(0, 6)
  const rowSummary = recent
    .map((row) => `- ${String(row.id)} | ${row.date} | status: ${row.status} | score: ${row.score ?? 'n/a'}`)
    .join('\n')
  const trendSummary = weekly
    .map((wk) => `- ${wk.wk}: ${wk.subs} submissions, ${wk.score}% compliance`)
    .join('\n')

  return [
    `You are an OSHA compliance analyst writing a Safety Performance Summary for the "${formName}" program.`,
    'Recent submissions:',
    rowSummary,
    '',
    'Weekly compliance trend (target: 90%):',
    trendSummary,
    '',
    'Write a concise Safety Performance Summary (3-5 short paragraphs) covering: overall trend, notable risks or open items, and one or two recommended actions.',
  ].join('\n')
}

export interface UseReportsResult {
  getReports: (type: FormType) => ReportEntry[]
  generateReport: (type: FormType) => Promise<void>
  isLoading: (type: FormType) => boolean
  getError: (type: FormType) => string | null
}

export function useReports(): UseReportsResult {
  const [reports, setReports] = useState<ReportsState>(EMPTY_REPORTS)
  const [loading, setLoading] = useState<Record<FormType, boolean>>({
    daily: false, incident: false, toolbox: false, equipment: false, hazard: false,
  })
  const [errors, setErrors] = useState<Record<FormType, string | null>>({
    daily: null, incident: null, toolbox: null, equipment: null, hazard: null,
  })

  useEffect(() => {
    let cancelled = false
    window.storage.get(STORAGE_KEY).then((raw) => {
      if (cancelled) return
      setReports(parseStoredReports(raw))
    }).catch(() => {
      // No persisted reports yet — start empty.
    })
    return () => { cancelled = true }
  }, [])

  const persist = useCallback((next: ReportsState) => {
    window.storage.set(STORAGE_KEY, next).catch(() => {
      // Persistence is best-effort; keep working from in-memory state.
    })
  }, [])

  const generateReport = useCallback(async (type: FormType): Promise<void> => {
    const formEntry = FORMS.find((f) => f.type === type)
    const formName = formEntry?.name ?? type

    setLoading((prev) => ({ ...prev, [type]: true }))
    setErrors((prev) => ({ ...prev, [type]: null }))

    try {
      const prompt = buildPrompt(formName, BASE_ROWS[type], WEEKLY[type])

      const res = await fetch('/api/openai/v1/chat/completions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'gpt-4.1',
          messages: [
            { role: 'system', content: 'You are an expert workplace safety and OSHA compliance analyst.' },
            { role: 'user', content: prompt },
          ],
          temperature: 0.4,
        }),
      })

      if (!res.ok) {
        throw new Error(`Report generation failed (${res.status})`)
      }

      const data: unknown = await res.json()
      const text = extractReportText(data)
      if (text === null) {
        throw new Error('Report response was empty or malformed')
      }

      const entry: ReportEntry = { text, timestamp: new Date().toISOString(), formName }

      setReports((prev) => {
        const next: ReportsState = { ...prev, [type]: [entry, ...prev[type]] }
        persist(next)
        return next
      })
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to generate report'
      setErrors((prev) => ({ ...prev, [type]: message }))
    } finally {
      setLoading((prev) => ({ ...prev, [type]: false }))
    }
  }, [persist])

  const getReports = useCallback((type: FormType) => reports[type], [reports])
  const isLoading = useCallback((type: FormType) => loading[type], [loading])
  const getError = useCallback((type: FormType) => errors[type], [errors])

  return { getReports, generateReport, isLoading, getError }
}

function extractReportText(data: unknown): string | null {
  if (typeof data !== 'object' || data === null) return null
  const choices = (data as Record<string, unknown>).choices
  if (!Array.isArray(choices) || choices.length === 0) return null
  const first = choices[0]
  if (typeof first !== 'object' || first === null) return null
  const message = (first as Record<string, unknown>).message
  if (typeof message !== 'object' || message === null) return null
  const content = (message as Record<string, unknown>).content
  return typeof content === 'string' ? content : null
}
