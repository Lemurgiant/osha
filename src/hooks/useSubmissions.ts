import { useCallback, useState } from 'react'
import type { FormType, RowData, SubmittedRow } from '../types'
import { BASE_ROWS } from '../data/rows'

type ExtraRowsState = Record<FormType, SubmittedRow[]>

const EMPTY_EXTRA_ROWS: ExtraRowsState = {
  daily: [],
  incident: [],
  toolbox: [],
  equipment: [],
  hazard: [],
}

export interface UseSubmissionsResult {
  addRow: (type: FormType, row: SubmittedRow) => void
  getRows: (type: FormType) => RowData[]
}

export function useSubmissions(): UseSubmissionsResult {
  const [extraRows, setExtraRows] = useState<ExtraRowsState>(EMPTY_EXTRA_ROWS)

  const addRow = useCallback((type: FormType, row: SubmittedRow) => {
    setExtraRows((prev) => ({
      ...prev,
      [type]: [row, ...prev[type]],
    }))
  }, [])

  const getRows = useCallback((type: FormType): RowData[] => {
    return [...extraRows[type], ...BASE_ROWS[type]]
  }, [extraRows])

  return { addRow, getRows }
}
