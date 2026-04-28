import { useNavigate } from 'react-router-dom'
import { TrendingUp, TrendingDown, Users, Activity, Stethoscope, BedDouble } from 'lucide-react'
import { Card, CardInner } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { PageLoader } from '@/components/shared/LoadingSpinner'
import { useAnalyticsOverview } from '@/services/queries/useAnalytics'
import { usePatientList } from '@/services/queries/usePatients'
import { ROUTES } from '@/constants/routes'
import { PATIENT_STATUS, STATUS_LABELS } from '@/constants'
import type { PatientStatus } from '@/constants'
import type { StatCard } from '@/types/analytics'
import type { LucideIcon } from 'lucide-react'
import { formatDate } from '@/utils/formatters'
import { getInitials } from '@/utils/helpers'
import { cn } from '@/lib/utils'

const STATUS_BADGE_MAP: Record<PatientStatus, 'success' | 'error' | 'warning' | 'info'> = {
  [PATIENT_STATUS.ACTIVE]: 'success',
  [PATIENT_STATUS.DISCHARGED]: 'info',
  [PATIENT_STATUS.CRITICAL]: 'error',
  [PATIENT_STATUS.SCHEDULED]: 'warning',
}

const STAT_ICONS: LucideIcon[] = [Users, Activity, Stethoscope, BedDouble, Activity, BedDouble]

function StatCardItem({ stat, index }: { stat: StatCard; index: number }) {
  const Icon = STAT_ICONS[index % STAT_ICONS.length]
  const isPositive = stat.trend === 'up'

  return (
    <CardInner>
      <div className="flex items-start justify-between mb-2">
        <div className="w-8 h-8 rounded-full bg-feature-lighter flex items-center justify-center">
          <Icon size={16} strokeWidth={2} className="text-feature-base" />
        </div>
        <div
          className={cn(
            'flex items-center gap-0.5 text-xs font-medium',
            isPositive ? 'text-success-base' : 'text-error-base',
          )}
        >
          {isPositive ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
          {Math.abs(stat.change)}%
        </div>
      </div>
      <p className="text-xl font-semibold text-strong">{stat.value}</p>
      <p className="text-xs text-soft mt-0.5">{stat.label}</p>
    </CardInner>
  )
}

function Dashboard() {
  const navigate = useNavigate()
  const { data: overview, isLoading: overviewLoading } = useAnalyticsOverview()
  const { data: recentPatients, isLoading: patientsLoading } = usePatientList(1, 5, '', '', '')

  if (overviewLoading || patientsLoading) return <PageLoader />

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-ibm-plex-serif text-lg font-semibold text-strong">Overview</h2>
          <p className="text-xs text-soft mt-0.5">Real-time hospital metrics</p>
        </div>
        <Button size="sm" onClick={() => navigate(ROUTES.ANALYTICS)}>
          View Analytics
        </Button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {overview?.stats.map((stat, i) => (
          <Card key={stat.label} padding={false} className="p-2">
            <StatCardItem stat={stat} index={i} />
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
        <Card className="lg:col-span-2">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-base font-semibold text-strong">Recent Patients</h3>
            <Button size="sm" variant="secondary" onClick={() => navigate(ROUTES.PATIENTS)}>
              View all
            </Button>
          </div>
          <CardInner>
            <div className="flex flex-col divide-y divide-background-soft">
              {recentPatients?.data.map((patient) => (
                <div
                  key={patient.id}
                  className="flex items-center gap-3 py-2.5 first:pt-0 last:pb-0 cursor-pointer hover:opacity-80 transition-opacity"
                  onClick={() => navigate(`/patients/${patient.id}`)}
                >
                  <div className="w-9 h-9 rounded-full bg-information-lighter flex items-center justify-center text-information-base text-xs font-semibold shrink-0">
                    {getInitials(patient.name)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-strong truncate">{patient.name}</p>
                    <p className="text-xs text-soft">{patient.department} &middot; {patient.diagnosis}</p>
                  </div>
                  <Badge variant={STATUS_BADGE_MAP[patient.status]}>
                    {STATUS_LABELS[patient.status]}
                  </Badge>
                </div>
              ))}
            </div>
          </CardInner>
        </Card>

        <Card>
          <h3 className="text-base font-semibold text-strong mb-3">Departments</h3>
          <CardInner>
            <div className="flex flex-col gap-3">
              {overview?.departmentBreakdown.slice(0, 5).map((dept) => (
                <div key={dept.department}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-medium text-sub">{dept.department}</span>
                    <span className="text-xs text-soft">{dept.patients}</span>
                  </div>
                  <div className="h-1.5 bg-background-soft rounded-full overflow-hidden">
                    <div
                      className="h-full bg-feature-base rounded-full transition-all duration-300"
                      style={{ width: `${dept.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardInner>
          <p className="text-xs text-soft text-center mt-2">
            Last updated: {formatDate(new Date().toISOString())}
          </p>
        </Card>
      </div>
    </div>
  )
}

export default Dashboard
