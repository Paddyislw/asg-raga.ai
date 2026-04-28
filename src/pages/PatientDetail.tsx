import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, Mail, Phone, HeartPulse } from 'lucide-react'
import { Card, CardInner } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { PageLoader } from '@/components/shared/LoadingSpinner'
import { usePatientDetail } from '@/services/queries/usePatients'
import { PATIENT_STATUS, STATUS_LABELS } from '@/constants'
import type { PatientStatus } from '@/constants'
import { getInitials } from '@/utils/helpers'
import { formatDate, formatPhone } from '@/utils/formatters'
import { useNotification } from '@/hooks/useNotification'

const STATUS_BADGE_MAP: Record<PatientStatus, 'success' | 'error' | 'warning' | 'info'> = {
  [PATIENT_STATUS.ACTIVE]: 'success',
  [PATIENT_STATUS.DISCHARGED]: 'info',
  [PATIENT_STATUS.CRITICAL]: 'error',
  [PATIENT_STATUS.SCHEDULED]: 'warning',
}

function InfoRow({ label, value }: { label: string; value: string | null }) {
  return (
    <div className="flex items-start justify-between py-2">
      <span className="text-xs text-soft">{label}</span>
      <span className="text-sm text-sub font-medium text-right">{value || '—'}</span>
    </div>
  )
}

function PatientDetail() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { sendNotification } = useNotification()
  const { data: patient, isLoading } = usePatientDetail(id || '')

  if (isLoading) return <PageLoader />
  if (!patient) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 py-16">
        <p className="text-sm text-soft">Patient not found</p>
        <Button size="sm" variant="secondary" onClick={() => navigate(-1)}>
          Go back
        </Button>
      </div>
    )
  }

  function handleSendAlert() {
    sendNotification('Patient Update', {
      body: `${patient!.name} - ${patient!.diagnosis} status has been reviewed.`,
      tag: `patient-${patient!.id}`,
    })
  }

  return (
    <div className="flex flex-col gap-4 max-w-4xl">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-sm text-sub hover:text-strong transition-colors w-fit"
      >
        <ArrowLeft size={16} strokeWidth={2} />
        Back to patients
      </button>

      <Card>
        <CardInner>
          <div className="flex items-start gap-4 flex-wrap">
            <div className="w-16 h-16 rounded-full bg-information-lighter flex items-center justify-center text-information-base text-lg font-semibold shrink-0">
              {getInitials(patient.name)}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-lg font-semibold text-strong">{patient.name}</h2>
                <Badge variant={STATUS_BADGE_MAP[patient.status]}>
                  {STATUS_LABELS[patient.status]}
                </Badge>
              </div>
              <p className="text-xs text-soft mt-1">
                {patient.age} years &middot; {patient.gender} &middot; {patient.bloodGroup}
              </p>
              <div className="flex items-center gap-4 mt-2">
                <span className="flex items-center gap-1.5 text-xs text-sub">
                  <Mail size={14} strokeWidth={2} className="text-soft" />
                  {patient.email}
                </span>
                <span className="flex items-center gap-1.5 text-xs text-sub">
                  <Phone size={14} strokeWidth={2} className="text-soft" />
                  {formatPhone(patient.phone)}
                </span>
              </div>
            </div>
            <Button size="sm" variant="secondary" onClick={handleSendAlert}>
              Send Alert
            </Button>
          </div>
        </CardInner>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <Card>
          <h3 className="text-base font-semibold text-strong mb-2">Medical Info</h3>
          <CardInner>
            <div className="flex flex-col divide-y divide-background-soft">
              <InfoRow label="Diagnosis" value={patient.diagnosis} />
              <InfoRow label="Department" value={patient.department} />
              <InfoRow label="Assigned Doctor" value={patient.assignedDoctor} />
              <InfoRow label="Room Number" value={patient.roomNumber} />
              <InfoRow label="Blood Group" value={patient.bloodGroup} />
            </div>
          </CardInner>
        </Card>

        <Card>
          <h3 className="text-base font-semibold text-strong mb-2">Visit History</h3>
          <CardInner>
            <div className="flex flex-col divide-y divide-background-soft">
              <InfoRow label="Admitted" value={formatDate(patient.admittedDate)} />
              <InfoRow label="Last Visit" value={formatDate(patient.lastVisit)} />
              <InfoRow label="Status" value={STATUS_LABELS[patient.status]} />
            </div>
            <div className="mt-4 p-3 bg-background-weak rounded-[20px] flex items-center gap-3">
              <HeartPulse size={18} strokeWidth={2} className="text-feature-base shrink-0" />
              <div>
                <p className="text-xs font-medium text-sub">Care Summary</p>
                <p className="text-xs text-soft mt-0.5">
                  Patient is currently {patient.status === 'critical' ? 'under intensive observation' : 'receiving standard care'} in the {patient.department} department.
                </p>
              </div>
            </div>
          </CardInner>
        </Card>
      </div>
    </div>
  )
}

export default PatientDetail
