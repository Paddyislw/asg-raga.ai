export const APP_NAME = 'MedBoard'

export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_PAGE_SIZE: 12,
  PAGE_SIZE_OPTIONS: [12, 24, 48],
} as const

export const VIEW_MODES = {
  GRID: 'grid',
  LIST: 'list',
} as const

export type ViewMode = (typeof VIEW_MODES)[keyof typeof VIEW_MODES]

export const PATIENT_STATUS = {
  ACTIVE: 'active',
  DISCHARGED: 'discharged',
  CRITICAL: 'critical',
  SCHEDULED: 'scheduled',
} as const

export type PatientStatus = (typeof PATIENT_STATUS)[keyof typeof PATIENT_STATUS]

export const STATUS_LABELS: Record<PatientStatus, string> = {
  [PATIENT_STATUS.ACTIVE]: 'Active',
  [PATIENT_STATUS.DISCHARGED]: 'Discharged',
  [PATIENT_STATUS.CRITICAL]: 'Critical',
  [PATIENT_STATUS.SCHEDULED]: 'Scheduled',
}

export const GENDER_OPTIONS = ['Male', 'Female', 'Other'] as const

export const BLOOD_GROUPS = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'] as const

export const DEPARTMENTS = [
  'Cardiology',
  'Neurology',
  'Orthopedics',
  'Pediatrics',
  'General Medicine',
  'Oncology',
  'Dermatology',
  'ENT',
] as const
