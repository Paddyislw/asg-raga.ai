import { useQuery } from '@tanstack/react-query'
import { QUERY_KEYS, STALE_TIME } from '@/constants/api'
import { fetchPatients, fetchPatientById } from '@/services/api/patients'

export function usePatientList(
  page: number,
  pageSize: number,
  search: string,
  status: string,
  department: string,
) {
  return useQuery({
    queryKey: [...QUERY_KEYS.patients, { page, pageSize, search, status, department }],
    queryFn: () => fetchPatients(page, pageSize, search, status, department),
    staleTime: STALE_TIME.SHORT,
    placeholderData: (prev) => prev,
  })
}

export function usePatientDetail(id: string) {
  return useQuery({
    queryKey: QUERY_KEYS.patientDetail(id),
    queryFn: () => fetchPatientById(id),
    staleTime: STALE_TIME.MEDIUM,
    enabled: !!id,
  })
}
