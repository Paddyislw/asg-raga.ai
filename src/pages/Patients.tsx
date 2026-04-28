import { useState, useMemo, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { LayoutGrid, List, Search, Users } from 'lucide-react'
import { Card, CardInner } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Toggle } from '@/components/ui/Toggle'
import { Dropdown } from '@/components/ui/Dropdown'
import { EmptyState } from '@/components/shared/EmptyState'
import { LoadingSpinner } from '@/components/shared/LoadingSpinner'
import { usePatientList } from '@/services/queries/usePatients'
import { usePatientViewStore } from '@/store'
import { PATIENT_STATUS, STATUS_LABELS, DEPARTMENTS, VIEW_MODES, PAGINATION } from '@/constants'
import type { PatientStatus, ViewMode } from '@/constants'
import type { Patient } from '@/types/patient'
import { getInitials, debounce } from '@/utils/helpers'
import { formatDate } from '@/utils/formatters'
import { cn } from '@/lib/utils'

const STATUS_BADGE_MAP: Record<PatientStatus, 'success' | 'error' | 'warning' | 'info'> = {
  [PATIENT_STATUS.ACTIVE]: 'success',
  [PATIENT_STATUS.DISCHARGED]: 'info',
  [PATIENT_STATUS.CRITICAL]: 'error',
  [PATIENT_STATUS.SCHEDULED]: 'warning',
}

const statusOptions = [
  { label: 'All Statuses', value: '' },
  ...Object.entries(STATUS_LABELS).map(([value, label]) => ({ label, value })),
]

const departmentOptions = [
  { label: 'All Departments', value: '' },
  ...DEPARTMENTS.map((d) => ({ label: d, value: d })),
]

const viewOptions = [
  { value: VIEW_MODES.GRID, label: 'Grid', icon: <LayoutGrid size={14} strokeWidth={2} /> },
  { value: VIEW_MODES.LIST, label: 'List', icon: <List size={14} strokeWidth={2} /> },
]

function PatientGridCard({ patient, onClick }: { patient: Patient; onClick: () => void }) {
  return (
    <div onClick={onClick} className="cursor-pointer">
      <Card className="hover:shadow-md transition-shadow duration-200">
        <CardInner>
          <div className="flex items-start gap-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-information-lighter flex items-center justify-center text-information-base text-xs font-semibold shrink-0">
              {getInitials(patient.name)}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-strong truncate">{patient.name}</p>
              <p className="text-xs text-soft">{patient.age}y &middot; {patient.gender}</p>
            </div>
            <Badge variant={STATUS_BADGE_MAP[patient.status]}>
              {STATUS_LABELS[patient.status]}
            </Badge>
          </div>
          <div className="h-px bg-background-soft mb-3" />
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div>
              <span className="text-soft">Department</span>
              <p className="text-sub font-medium mt-0.5">{patient.department}</p>
            </div>
            <div>
              <span className="text-soft">Doctor</span>
              <p className="text-sub font-medium mt-0.5 truncate">{patient.assignedDoctor}</p>
            </div>
            <div>
              <span className="text-soft">Diagnosis</span>
              <p className="text-sub font-medium mt-0.5 truncate">{patient.diagnosis}</p>
            </div>
            <div>
              <span className="text-soft">Last Visit</span>
              <p className="text-sub font-medium mt-0.5">{formatDate(patient.lastVisit)}</p>
            </div>
          </div>
        </CardInner>
      </Card>
    </div>
  )
}

function PatientListRow({ patient, onClick }: { patient: Patient; onClick: () => void }) {
  return (
    <div
      className="flex items-center gap-3 py-3 px-3 hover:bg-background-white rounded-3xl cursor-pointer transition-colors duration-100"
      onClick={onClick}
    >
      <div className="w-9 h-9 rounded-full bg-information-lighter flex items-center justify-center text-information-base text-xs font-semibold shrink-0">
        {getInitials(patient.name)}
      </div>
      <div className="flex-1 min-w-0 grid grid-cols-6 gap-2 items-center">
        <div className="col-span-1">
          <p className="text-sm font-medium text-strong truncate">{patient.name}</p>
          <p className="text-xs text-soft">{patient.age}y &middot; {patient.gender}</p>
        </div>
        <p className="text-xs text-sub col-span-1">{patient.department}</p>
        <p className="text-xs text-sub col-span-1 truncate">{patient.diagnosis}</p>
        <p className="text-xs text-sub col-span-1 truncate">{patient.assignedDoctor}</p>
        <p className="text-xs text-sub col-span-1">{formatDate(patient.lastVisit)}</p>
        <div className="col-span-1 flex justify-end">
          <Badge variant={STATUS_BADGE_MAP[patient.status]}>
            {STATUS_LABELS[patient.status]}
          </Badge>
        </div>
      </div>
    </div>
  )
}

function Patients() {
  const navigate = useNavigate()
  const {
    viewMode,
    searchQuery,
    statusFilter,
    departmentFilter,
    setViewMode,
    setSearchQuery,
    setStatusFilter,
    setDepartmentFilter,
    resetFilters,
  } = usePatientViewStore()

  const [localSearch, setLocalSearch] = useState(searchQuery)

  const debouncedSearch = useMemo(
    () => debounce((q: string) => setSearchQuery(q), 300),
    [setSearchQuery],
  )

  const handleSearchChange = useCallback(
    (value: string) => {
      setLocalSearch(value)
      debouncedSearch(value)
    },
    [debouncedSearch],
  )

  const { data, isLoading } = usePatientList(
    PAGINATION.DEFAULT_PAGE,
    PAGINATION.DEFAULT_PAGE_SIZE,
    searchQuery,
    statusFilter,
    departmentFilter,
  )

  const hasFilters = searchQuery || statusFilter || departmentFilter

  function handleViewChange(val: string) {
    setViewMode(val as ViewMode)
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h2 className="font-ibm-plex-serif text-lg font-semibold text-strong">Patients</h2>
          <p className="text-xs text-soft mt-0.5">
            {data ? `${data.total} patients found` : 'Loading...'}
          </p>
        </div>
        <Toggle options={viewOptions} value={viewMode} onChange={handleViewChange} />
      </div>

      <Card>
        <div className="flex items-center flex-wrap gap-2">
          <div className="bg-background-white border-2 border-background-weak rounded-full flex items-center h-10 px-3 flex-1 min-w-50 focus-within:border-background-sub transition-colors duration-200">
            <Search size={16} strokeWidth={2} className="text-soft mr-2 shrink-0" />
            <input
              type="text"
              placeholder="Search by name, diagnosis, or department..."
              value={localSearch}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="bg-transparent outline-none text-sm text-sub placeholder:text-soft w-full"
            />
          </div>
          <Dropdown
            items={statusOptions}
            value={statusFilter}
            onChange={(v) => setStatusFilter(v as PatientStatus | '')}
            placeholder="Status"
            className="w-40"
          />
          <Dropdown
            items={departmentOptions}
            value={departmentFilter}
            onChange={setDepartmentFilter}
            placeholder="Department"
            className="w-44"
          />
          {hasFilters && (
            <Button size="sm" variant="ghost" onClick={resetFilters}>
              Clear
            </Button>
          )}
        </div>
      </Card>

      {isLoading ? (
        <LoadingSpinner size="lg" className="py-12" />
      ) : !data?.data.length ? (
        <Card>
          <EmptyState
            icon={<Users size={18} strokeWidth={2} className="text-soft" />}
            message={hasFilters ? 'No patients match your filters' : 'No patients found'}
            action={
              hasFilters ? (
                <Button size="sm" variant="secondary" onClick={resetFilters}>
                  Reset filters
                </Button>
              ) : undefined
            }
          />
        </Card>
      ) : viewMode === VIEW_MODES.GRID ? (
        <div className={cn('grid gap-3', 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3')}>
          {data.data.map((patient) => (
            <PatientGridCard
              key={patient.id}
              patient={patient}
              onClick={() => navigate(`/patients/${patient.id}`)}
            />
          ))}
        </div>
      ) : (
        <Card>
          <CardInner className="p-0! overflow-hidden">
            <div className="hidden md:flex items-center gap-3 px-3 py-2 text-xs font-medium text-soft border-b border-background-soft">
              <div className="w-9 shrink-0" />
              <div className="flex-1 grid grid-cols-6 gap-2">
                <span>Patient</span>
                <span>Department</span>
                <span>Diagnosis</span>
                <span>Doctor</span>
                <span>Last Visit</span>
                <span className="text-right">Status</span>
              </div>
            </div>
            {data.data.map((patient) => (
              <PatientListRow
                key={patient.id}
                patient={patient}
                onClick={() => navigate(`/patients/${patient.id}`)}
              />
            ))}
          </CardInner>
        </Card>
      )}
    </div>
  )
}

export default Patients
