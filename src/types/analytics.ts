export interface StatCard {
  label: string
  value: number | string
  change: number
  trend: 'up' | 'down' | 'flat'
}

export interface DepartmentBreakdown {
  department: string
  patients: number
  percentage: number
}

export interface MonthlyTrend {
  month: string
  admissions: number
  discharges: number
  revenue: number
}

export interface AnalyticsOverview {
  totalPatients: number
  activePatients: number
  dischargedToday: number
  criticalCases: number
  occupancyRate: number
  avgStayDuration: number
  stats: StatCard[]
  departmentBreakdown: DepartmentBreakdown[]
}

export interface AnalyticsTrends {
  monthly: MonthlyTrend[]
}
