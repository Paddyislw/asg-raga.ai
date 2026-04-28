import type { Patient, PatientListResponse } from '@/types/patient'
import { MOCK_PATIENTS } from './mockData'
import { sleep } from '@/utils/helpers'

export async function fetchPatients(
  page = 1,
  pageSize = 12,
  search = '',
  status = '',
  department = '',
): Promise<PatientListResponse> {
  // simulating network latency
  await sleep(600)

  let filtered = [...MOCK_PATIENTS]

  if (search) {
    const q = search.toLowerCase()
    filtered = filtered.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.diagnosis.toLowerCase().includes(q) ||
        p.department.toLowerCase().includes(q),
    )
  }

  if (status) {
    filtered = filtered.filter((p) => p.status === status)
  }

  if (department) {
    filtered = filtered.filter((p) => p.department === department)
  }

  const total = filtered.length
  const start = (page - 1) * pageSize
  const data = filtered.slice(start, start + pageSize)

  return { data, total, page, pageSize }
}

export async function fetchPatientById(id: string): Promise<Patient | null> {
  await sleep(400)
  return MOCK_PATIENTS.find((p) => p.id === id) || null
}
