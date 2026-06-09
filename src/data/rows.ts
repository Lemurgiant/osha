import type { FormType, RowData } from '../types'

const DAILY_ROWS: RowData[] = [
  { id: 'DSI-1042', date: '2026-06-05', site: 'Site A - Tower 3', inspector: 'Marcus Reyes', area: 'East Scaffold Bay', score: 96, status: 'complete' },
  { id: 'DSI-1041', date: '2026-06-04', site: 'Warehouse Unit 2', inspector: 'Dana Whitfield', area: 'Loading Dock 4', score: 88, status: 'complete' },
  { id: 'DSI-1040', date: '2026-06-04', site: 'Site B - Riverside Plaza', inspector: 'Carlos Nuñez', area: 'Crane Staging Zone', score: 74, status: 'open' },
  { id: 'DSI-1039', date: '2026-06-03', site: 'Site A - Tower 3', inspector: 'Marcus Reyes', area: 'Rebar Assembly Yard', score: 91, status: 'complete' },
  { id: 'DSI-1038', date: '2026-06-02', site: 'Warehouse Unit 2', inspector: 'Priya Anand', area: 'Mezzanine Storage', score: null, status: 'incomplete' },
  { id: 'DSI-1037', date: '2026-06-01', site: 'Site C - North Annex', inspector: 'Leon Brackett', area: 'Excavation Trench 2', score: 82, status: 'complete' },
  { id: 'DSI-1036', date: '2026-05-29', site: 'Site B - Riverside Plaza', inspector: 'Dana Whitfield', area: 'Concrete Pour Deck', score: 90, status: 'complete' },
  { id: 'DSI-1035', date: '2026-05-28', site: 'Site A - Tower 3', inspector: 'Carlos Nuñez', area: 'Tower Crane Base', score: 85, status: 'complete' },
]

const INCIDENT_ROWS: RowData[] = [
  { id: 'INC-308', date: '2026-06-05', site: 'Site B - Riverside Plaza', reporter: 'Carlos Nuñez', severity: 'High', classification: 'OSHA Recordable', status: 'open', score: null },
  { id: 'INC-307', date: '2026-06-03', site: 'Warehouse Unit 2', reporter: 'Priya Anand', severity: 'Low', classification: 'Near Miss', status: 'complete', score: null },
  { id: 'INC-306', date: '2026-05-30', site: 'Site A - Tower 3', reporter: 'Marcus Reyes', severity: 'Medium', classification: 'First Aid Only', status: 'complete', score: null },
  { id: 'INC-305', date: '2026-05-27', site: 'Site C - North Annex', reporter: 'Leon Brackett', severity: 'Critical', classification: 'OSHA Recordable', status: 'complete', score: null },
  { id: 'INC-304', date: '2026-05-22', site: 'Site B - Riverside Plaza', reporter: 'Dana Whitfield', severity: 'Low', classification: 'Near Miss', status: 'complete', score: null },
  { id: 'INC-303', date: '2026-05-18', site: 'Warehouse Unit 2', reporter: 'Priya Anand', severity: 'Medium', classification: 'Property Damage', status: 'incomplete', score: null },
  { id: 'INC-302', date: '2026-05-12', site: 'Site A - Tower 3', reporter: 'Marcus Reyes', severity: 'Low', classification: 'Near Miss', status: 'complete', score: null },
]

const TOOLBOX_ROWS: RowData[] = [
  { id: 'TBX-221', date: '2026-06-05', site: 'Site A - Tower 3', leader: 'Marcus Reyes', topic: 'Fall Protection at Heights', attendees: 24, status: 'complete', score: 100 },
  { id: 'TBX-220', date: '2026-06-04', site: 'Warehouse Unit 2', leader: 'Dana Whitfield', topic: 'Forklift Pedestrian Safety', attendees: 18, status: 'open', score: null },
  { id: 'TBX-219', date: '2026-06-02', site: 'Site B - Riverside Plaza', leader: 'Carlos Nuñez', topic: 'Crane Lift Hand Signals', attendees: 21, status: 'complete', score: 95 },
  { id: 'TBX-218', date: '2026-05-30', site: 'Site C - North Annex', leader: 'Leon Brackett', topic: 'Trenching & Excavation Hazards', attendees: 15, status: 'complete', score: 88 },
  { id: 'TBX-217', date: '2026-05-28', site: 'Site A - Tower 3', leader: 'Priya Anand', topic: 'Heat Stress Prevention', attendees: 27, status: 'complete', score: 92 },
  { id: 'TBX-216', date: '2026-05-26', site: 'Warehouse Unit 2', leader: 'Marcus Reyes', topic: 'PPE Inspection & Care', attendees: 19, status: 'complete', score: null },
  { id: 'TBX-215', date: '2026-05-21', site: 'Site B - Riverside Plaza', leader: 'Dana Whitfield', topic: 'Lockout/Tagout Procedures', attendees: 16, status: 'incomplete', score: null },
]

const EQUIPMENT_ROWS: RowData[] = [
  { id: 'EQI-559', date: '2026-06-05', site: 'Site A - Tower 3', inspector: 'Carlos Nuñez', equipment: 'Tower Crane TC-04', score: 94, status: 'complete' },
  { id: 'EQI-558', date: '2026-06-04', site: 'Warehouse Unit 2', inspector: 'Priya Anand', equipment: 'Forklift FL-12', score: 79, status: 'open' },
  { id: 'EQI-557', date: '2026-06-03', site: 'Site B - Riverside Plaza', inspector: 'Leon Brackett', equipment: 'Scissor Lift SL-07', score: 88, status: 'complete' },
  { id: 'EQI-556', date: '2026-06-01', site: 'Site C - North Annex', inspector: 'Dana Whitfield', equipment: 'Excavator EX-21', score: 91, status: 'complete' },
  { id: 'EQI-555', date: '2026-05-29', site: 'Site A - Tower 3', inspector: 'Marcus Reyes', equipment: 'Generator GEN-09', score: null, status: 'incomplete' },
  { id: 'EQI-554', date: '2026-05-27', site: 'Warehouse Unit 2', inspector: 'Priya Anand', equipment: 'Pallet Jack PJ-03', score: 97, status: 'complete' },
  { id: 'EQI-553', date: '2026-05-23', site: 'Site B - Riverside Plaza', inspector: 'Carlos Nuñez', equipment: 'Concrete Pump CP-02', score: 84, status: 'complete' },
]

const HAZARD_ROWS: RowData[] = [
  { id: 'HZA-176', date: '2026-06-05', site: 'Site C - North Annex', assessor: 'Leon Brackett', hazard: 'Unshored Trench Wall', risk: 'High', status: 'open', score: null },
  { id: 'HZA-175', date: '2026-06-03', site: 'Site A - Tower 3', assessor: 'Marcus Reyes', hazard: 'Suspended Load Path', risk: 'Medium', status: 'complete', score: null },
  { id: 'HZA-174', date: '2026-06-01', site: 'Warehouse Unit 2', assessor: 'Priya Anand', hazard: 'Blocked Fire Exit', risk: 'Low', status: 'complete', score: null },
  { id: 'HZA-173', date: '2026-05-29', site: 'Site B - Riverside Plaza', assessor: 'Carlos Nuñez', hazard: 'Exposed Rebar Dowels', risk: 'Medium', status: 'complete', score: null },
  { id: 'HZA-172', date: '2026-05-26', site: 'Site A - Tower 3', assessor: 'Dana Whitfield', hazard: 'Overhead Power Line Proximity', risk: 'High', status: 'complete', score: null },
  { id: 'HZA-171', date: '2026-05-20', site: 'Site C - North Annex', assessor: 'Leon Brackett', hazard: 'Slip Hazard - Wet Decking', risk: 'Low', status: 'incomplete', score: null },
]

export const BASE_ROWS: Record<FormType, RowData[]> = {
  daily: DAILY_ROWS,
  incident: INCIDENT_ROWS,
  toolbox: TOOLBOX_ROWS,
  equipment: EQUIPMENT_ROWS,
  hazard: HAZARD_ROWS,
}

export const DEFAULT_BASE_ROWS: RowData[] = DAILY_ROWS
