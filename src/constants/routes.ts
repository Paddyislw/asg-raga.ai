export const ROUTES = {
  LOGIN: '/login',
  SIGNUP: '/signup',
  DASHBOARD: '/',
  ANALYTICS: '/analytics',
  PATIENTS: '/patients',
  PATIENT_DETAIL: '/patients/:id',
} as const

export const NAV_ITEMS = [
  { label: 'Dashboard', path: ROUTES.DASHBOARD, icon: 'Home09Icon' },
  { label: 'Patients', path: ROUTES.PATIENTS, icon: 'UserGroupIcon' },
  { label: 'Analytics', path: ROUTES.ANALYTICS, icon: 'BarChart01Icon' },
] as const
