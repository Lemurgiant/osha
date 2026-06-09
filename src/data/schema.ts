import type { FormSchema, FormType } from '../types'

const SITE_OPTS = ['Site A - Tower 3', 'Site B - Riverside Plaza', 'Site C - North Annex', 'Warehouse Unit 2']

const DAILY_SCHEMA: FormSchema = {
  info: 'Complete a walkthrough of the assigned work area and mark each checklist item as Pass or Fail. The compliance score is calculated live from your responses.',
  sectionA: 'Inspection Details',
  sectionB: 'Checklist',
  fields: [
    { k: 'site', l: 'Site', type: 'select', req: true, opts: SITE_OPTS },
    { k: 'inspector', l: 'Inspector Name', type: 'text', req: true, ph: 'e.g. Marcus Reyes' },
    { k: 'area', l: 'Area Inspected', type: 'text', req: true, ph: 'e.g. East Scaffold Bay' },
  ],
  checks: [
    { k: 'ppe', l: 'Workers wearing required PPE (hard hats, vests, gloves)' },
    { k: 'fall', l: 'Fall protection anchored and inspected' },
    { k: 'housekeeping', l: 'Walkways and work areas free of debris' },
    { k: 'signage', l: 'Hazard signage posted and visible' },
    { k: 'electrical', l: 'Electrical cords and panels in safe condition' },
    { k: 'egress', l: 'Emergency egress routes clear and marked' },
  ],
  checkType: 'passfail',
}

const INCIDENT_SCHEMA: FormSchema = {
  info: 'Document the incident or near-miss with as much detail as possible. Reports involving Critical severity or an OSHA Recordable classification trigger an immediate compliance alert.',
  sectionA: 'Incident Details',
  sectionB: null,
  fields: [
    { k: 'site', l: 'Site', type: 'select', req: true, opts: SITE_OPTS },
    { k: 'reporter', l: 'Reported By', type: 'text', req: true, ph: 'e.g. Carlos Nuñez' },
    { k: 'severity', l: 'Severity', type: 'select', req: true, opts: ['Low', 'Medium', 'High', 'Critical'] },
    { k: 'classification', l: 'Classification', type: 'select', req: true, opts: ['Near Miss', 'First Aid Only', 'Property Damage', 'OSHA Recordable'] },
    { k: 'description', l: 'Description', type: 'textarea', req: true, ph: 'Describe what happened, where, and any immediate actions taken...' },
  ],
  checks: [],
  checkType: null,
}

const TOOLBOX_SCHEMA: FormSchema = {
  info: 'Log the toolbox talk and confirm which session requirements were completed. The completion rate is calculated live from your responses.',
  sectionA: 'Session Details',
  sectionB: 'Session Requirements',
  fields: [
    { k: 'site', l: 'Site', type: 'select', req: true, opts: SITE_OPTS },
    { k: 'leader', l: 'Talk Leader', type: 'text', req: true, ph: 'e.g. Dana Whitfield' },
    { k: 'topic', l: 'Topic Covered', type: 'text', req: true, ph: 'e.g. Fall Protection at Heights' },
    { k: 'attendees', l: 'Number of Attendees', type: 'text', req: true, ph: 'e.g. 22' },
  ],
  checks: [
    { k: 'sheet', l: 'Attendance sheet collected and signed' },
    { k: 'taskHazards', l: 'Task-specific hazards discussed' },
    { k: 'questions', l: 'Worker questions and concerns addressed' },
    { k: 'handout', l: 'Reference handout or poster distributed' },
  ],
  checkType: 'boolean',
}

const EQUIPMENT_SCHEMA: FormSchema = {
  info: 'Inspect the equipment and mark each safety item as Pass or Fail. The compliance score is calculated live from your responses.',
  sectionA: 'Equipment Details',
  sectionB: 'Inspection Checklist',
  fields: [
    { k: 'site', l: 'Site', type: 'select', req: true, opts: SITE_OPTS },
    { k: 'inspector', l: 'Inspector Name', type: 'text', req: true, ph: 'e.g. Priya Anand' },
    { k: 'equipment', l: 'Equipment', type: 'text', req: true, ph: 'e.g. Forklift FL-12' },
  ],
  checks: [
    { k: 'visual', l: 'Visual condition free of damage or corrosion' },
    { k: 'guards', l: 'Safety guards and shields in place' },
    { k: 'fluids', l: 'Fluid levels and hoses in safe condition' },
    { k: 'controls', l: 'Controls and emergency stops functional' },
    { k: 'tags', l: 'Inspection tag current and visible' },
  ],
  checkType: 'passfail',
}

const HAZARD_SCHEMA: FormSchema = {
  info: 'Assess the hazard, rate the residual risk after controls are applied, and describe the mitigation plan. High residual risk ratings trigger an immediate compliance alert.',
  sectionA: 'Hazard Assessment Details',
  sectionB: null,
  fields: [
    { k: 'site', l: 'Site', type: 'select', req: true, opts: SITE_OPTS },
    { k: 'assessor', l: 'Assessor Name', type: 'text', req: true, ph: 'e.g. Leon Brackett' },
    { k: 'hazard', l: 'Hazard Identified', type: 'text', req: true, ph: 'e.g. Unshored Trench Wall' },
    { k: 'risk', l: 'Residual Risk', type: 'select', req: true, opts: ['Low', 'Medium', 'High'] },
    { k: 'controls', l: 'Controls & Mitigation Plan', type: 'textarea', req: true, ph: 'Describe the controls in place and any further action required...' },
  ],
  checks: [],
  checkType: null,
}

export const FORM_SCHEMA: Record<FormType, FormSchema> = {
  daily: DAILY_SCHEMA,
  incident: INCIDENT_SCHEMA,
  toolbox: TOOLBOX_SCHEMA,
  equipment: EQUIPMENT_SCHEMA,
  hazard: HAZARD_SCHEMA,
}

export const DEFAULT_SCHEMA: FormSchema = DAILY_SCHEMA
