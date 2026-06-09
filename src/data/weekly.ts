import type { FormType, WeekPoint } from '../types'

const DAILY_WEEKLY: WeekPoint[] = [
  { wk: 'Wk of May 4', subs: 22, score: 79 },
  { wk: 'Wk of May 11', subs: 25, score: 83 },
  { wk: 'Wk of May 18', subs: 27, score: 86 },
  { wk: 'Wk of May 25', subs: 29, score: 90 },
  { wk: 'Wk of Jun 1', subs: 31, score: 93 },
]

const INCIDENT_WEEKLY: WeekPoint[] = [
  { wk: 'Wk of May 4', subs: 6, score: 71 },
  { wk: 'Wk of May 11', subs: 5, score: 76 },
  { wk: 'Wk of May 18', subs: 4, score: 81 },
  { wk: 'Wk of May 25', subs: 3, score: 87 },
  { wk: 'Wk of Jun 1', subs: 2, score: 92 },
]

const TOOLBOX_WEEKLY: WeekPoint[] = [
  { wk: 'Wk of May 4', subs: 9, score: 82 },
  { wk: 'Wk of May 11', subs: 10, score: 85 },
  { wk: 'Wk of May 18', subs: 11, score: 89 },
  { wk: 'Wk of May 25', subs: 12, score: 92 },
  { wk: 'Wk of Jun 1', subs: 13, score: 95 },
]

const EQUIPMENT_WEEKLY: WeekPoint[] = [
  { wk: 'Wk of May 4', subs: 14, score: 77 },
  { wk: 'Wk of May 11', subs: 15, score: 81 },
  { wk: 'Wk of May 18', subs: 16, score: 85 },
  { wk: 'Wk of May 25', subs: 18, score: 89 },
  { wk: 'Wk of Jun 1', subs: 19, score: 91 },
]

const HAZARD_WEEKLY: WeekPoint[] = [
  { wk: 'Wk of May 4', subs: 8, score: 74 },
  { wk: 'Wk of May 11', subs: 9, score: 79 },
  { wk: 'Wk of May 18', subs: 10, score: 84 },
  { wk: 'Wk of May 25', subs: 11, score: 88 },
  { wk: 'Wk of Jun 1', subs: 12, score: 94 },
]

export const WEEKLY: Record<FormType, WeekPoint[]> = {
  daily: DAILY_WEEKLY,
  incident: INCIDENT_WEEKLY,
  toolbox: TOOLBOX_WEEKLY,
  equipment: EQUIPMENT_WEEKLY,
  hazard: HAZARD_WEEKLY,
}

export const DEFAULT_WEEKLY: WeekPoint[] = DAILY_WEEKLY
