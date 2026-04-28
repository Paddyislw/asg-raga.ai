export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api'

export const ENDPOINTS = {
  PATIENTS: '/patients',
  PATIENT_BY_ID: (id: string) => `/patients/${id}`,
  ANALYTICS_OVERVIEW: '/analytics/overview',
  ANALYTICS_TRENDS: '/analytics/trends',
  NOTIFICATIONS: '/notifications',
} as const

export const QUERY_KEYS = {
  patients: ['patients'] as const,
  patientDetail: (id: string) => ['patients', id] as const,
  analyticsOverview: ['analytics', 'overview'] as const,
  analyticsTrends: ['analytics', 'trends'] as const,
} as const

export const STALE_TIME = {
  SHORT: 1000 * 60,
  MEDIUM: 1000 * 60 * 5,
  LONG: 1000 * 60 * 15,
} as const
