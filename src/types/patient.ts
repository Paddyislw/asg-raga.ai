import type { PatientStatus } from '@/constants'

export interface Patient {
  id: string
  name: string
  age: number
  gender: string
  email: string
  phone: string
  bloodGroup: string
  department: string
  status: PatientStatus
  admittedDate: string
  lastVisit: string
  diagnosis: string
  assignedDoctor: string
  roomNumber: string | null
  avatar: string | null
}

export interface PatientListResponse {
  data: Patient[]
  total: number
  page: number
  pageSize: number
}

export interface PatientFilters {
  search: string
  status: PatientStatus | ''
  department: string
}
