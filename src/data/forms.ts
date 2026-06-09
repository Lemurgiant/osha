import type { ColDef, FormEntry, FormType } from '../types'

export const FORMS: FormEntry[] = [
  { id: 'daily', name: 'Daily Safety Inspection', type: 'daily' },
  { id: 'incident', name: 'Incident & Near-Miss Report', type: 'incident' },
  { id: 'toolbox', name: 'Toolbox Talk Log', type: 'toolbox' },
  { id: 'equipment', name: 'Equipment Inspection', type: 'equipment' },
  { id: 'hazard', name: 'Hazard Assessment', type: 'hazard' },
]

const DAILY_COLS: ColDef[] = [
  { k: 'id', l: 'ID', w: 70 },
  { k: 'date', l: 'Date', w: 100 },
  { k: 'site', l: 'Site', w: 160 },
  { k: 'inspector', l: 'Inspector', w: 150 },
  { k: 'area', l: 'Area Inspected', w: 160 },
  { k: 'score', l: 'Score', w: 90 },
  { k: 'status', l: 'Status', w: 110 },
]

const INCIDENT_COLS: ColDef[] = [
  { k: 'id', l: 'ID', w: 70 },
  { k: 'date', l: 'Date', w: 100 },
  { k: 'site', l: 'Site', w: 160 },
  { k: 'reporter', l: 'Reported By', w: 150 },
  { k: 'severity', l: 'Severity', w: 110 },
  { k: 'classification', l: 'Classification', w: 160 },
  { k: 'status', l: 'Status', w: 110 },
]

const TOOLBOX_COLS: ColDef[] = [
  { k: 'id', l: 'ID', w: 70 },
  { k: 'date', l: 'Date', w: 100 },
  { k: 'site', l: 'Site', w: 160 },
  { k: 'leader', l: 'Talk Leader', w: 150 },
  { k: 'topic', l: 'Topic', w: 200 },
  { k: 'attendees', l: 'Attendees', w: 100 },
  { k: 'status', l: 'Status', w: 110 },
]

const EQUIPMENT_COLS: ColDef[] = [
  { k: 'id', l: 'ID', w: 70 },
  { k: 'date', l: 'Date', w: 100 },
  { k: 'site', l: 'Site', w: 160 },
  { k: 'inspector', l: 'Inspector', w: 150 },
  { k: 'equipment', l: 'Equipment', w: 170 },
  { k: 'score', l: 'Score', w: 90 },
  { k: 'status', l: 'Status', w: 110 },
]

const HAZARD_COLS: ColDef[] = [
  { k: 'id', l: 'ID', w: 70 },
  { k: 'date', l: 'Date', w: 100 },
  { k: 'site', l: 'Site', w: 160 },
  { k: 'assessor', l: 'Assessor', w: 150 },
  { k: 'hazard', l: 'Hazard', w: 190 },
  { k: 'risk', l: 'Residual Risk', w: 120 },
  { k: 'status', l: 'Status', w: 110 },
]

export const COLS: Record<FormType, ColDef[]> = {
  daily: DAILY_COLS,
  incident: INCIDENT_COLS,
  toolbox: TOOLBOX_COLS,
  equipment: EQUIPMENT_COLS,
  hazard: HAZARD_COLS,
}

export const DEFAULT_COLS: ColDef[] = DAILY_COLS
