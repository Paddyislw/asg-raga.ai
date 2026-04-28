import { create } from 'zustand'
import type { ViewMode, PatientStatus } from '@/constants'
import { VIEW_MODES } from '@/constants'

interface UIState {
  sidebarCollapsed: boolean
  toggleSidebar: () => void
}

interface PatientViewState {
  viewMode: ViewMode
  searchQuery: string
  statusFilter: PatientStatus | ''
  departmentFilter: string
  setViewMode: (mode: ViewMode) => void
  setSearchQuery: (query: string) => void
  setStatusFilter: (status: PatientStatus | '') => void
  setDepartmentFilter: (dept: string) => void
  resetFilters: () => void
}

export const useUIStore = create<UIState>((set) => ({
  sidebarCollapsed: false,
  toggleSidebar: () => set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),
}))

export const usePatientViewStore = create<PatientViewState>((set) => ({
  viewMode: VIEW_MODES.GRID,
  searchQuery: '',
  statusFilter: '',
  departmentFilter: '',
  setViewMode: (viewMode) => set({ viewMode }),
  setSearchQuery: (searchQuery) => set({ searchQuery }),
  setStatusFilter: (statusFilter) => set({ statusFilter }),
  setDepartmentFilter: (departmentFilter) => set({ departmentFilter }),
  resetFilters: () => set({ searchQuery: '', statusFilter: '', departmentFilter: '' }),
}))
