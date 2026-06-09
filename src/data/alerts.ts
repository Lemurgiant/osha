import type { AlertEntry, FormType } from '../types'

const DAILY_ALERTS: AlertEntry[] = [
  { id: 1, type: 'danger', msg: 'Crane Staging Zone inspection at Site B - Riverside Plaza scored 74 — below the 80 compliance threshold and flagged for re-inspection.', time: '2026-06-04 09:14' },
  { id: 2, type: 'warning', msg: 'Mezzanine Storage inspection at Warehouse Unit 2 left incomplete — Priya Anand has not submitted a final score.', time: '2026-06-02 16:40' },
  { id: 3, type: 'success', msg: 'Site A - Tower 3 has logged 6 consecutive daily inspections above 90% compliance.', time: '2026-06-05 08:02' },
]

const INCIDENT_ALERTS: AlertEntry[] = [
  { id: 1, type: 'danger', msg: 'OSHA Recordable incident reported at Site B - Riverside Plaza (High severity) — case INC-308 remains open and requires investigation sign-off.', time: '2026-06-05 11:27' },
  { id: 2, type: 'warning', msg: 'Property damage report INC-303 at Warehouse Unit 2 is incomplete and overdue for closure.', time: '2026-05-19 14:05' },
  { id: 3, type: 'info', msg: 'Near-miss reporting volume is trending down for the third straight week — a positive leading indicator.', time: '2026-06-03 10:11' },
]

const TOOLBOX_ALERTS: AlertEntry[] = [
  { id: 1, type: 'danger', msg: 'Lockout/Tagout Procedures talk (TBX-215) at Site B - Riverside Plaza was marked incomplete — required topic for Q2 audit.', time: '2026-05-21 07:48' },
  { id: 2, type: 'warning', msg: 'Forklift Pedestrian Safety talk (TBX-220) at Warehouse Unit 2 is still open — attendance sheet not yet uploaded.', time: '2026-06-04 13:22' },
  { id: 3, type: 'success', msg: 'Toolbox talk attendance averaged 20 workers per session this month, up from 16 last quarter.', time: '2026-06-05 09:00' },
]

const EQUIPMENT_ALERTS: AlertEntry[] = [
  { id: 1, type: 'danger', msg: 'Forklift FL-12 at Warehouse Unit 2 scored 79 and remains open — hydraulic leak noted, recommend immediate lockout.', time: '2026-06-04 15:36' },
  { id: 2, type: 'warning', msg: 'Generator GEN-09 inspection at Site A - Tower 3 is incomplete — fuel system check pending sign-off from Marcus Reyes.', time: '2026-05-29 12:18' },
  { id: 3, type: 'success', msg: 'Pallet Jack PJ-03 passed inspection with a near-perfect score of 97 for the second month running.', time: '2026-05-27 08:55' },
]

const HAZARD_ALERTS: AlertEntry[] = [
  { id: 1, type: 'danger', msg: 'Unshored Trench Wall hazard (HZA-176) at Site C - North Annex rated High risk and remains open — excavation work suspended pending shoring.', time: '2026-06-05 07:30' },
  { id: 2, type: 'warning', msg: 'Overhead Power Line Proximity hazard (HZA-172) at Site A - Tower 3 rated High residual risk — verify exclusion zone signage.', time: '2026-05-26 11:02' },
  { id: 3, type: 'info', msg: 'Average residual risk rating across all sites has shifted from Medium to Low over the past 5 weeks.', time: '2026-06-01 09:45' },
]

export const FORM_ALERTS: Record<FormType, AlertEntry[]> = {
  daily: DAILY_ALERTS,
  incident: INCIDENT_ALERTS,
  toolbox: TOOLBOX_ALERTS,
  equipment: EQUIPMENT_ALERTS,
  hazard: HAZARD_ALERTS,
}

export const DEFAULT_ALERTS: AlertEntry[] = DAILY_ALERTS
